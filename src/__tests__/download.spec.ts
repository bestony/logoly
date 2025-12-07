import { beforeEach, describe, expect, it, vi } from 'vitest'
import { downloadAsZip, downloadImage } from '../utils/download'

const { saveAs } = vi.hoisted(() => ({ saveAs: vi.fn() }))
const { toPng, toJpeg, toSvg, getFontEmbedCSS } = vi.hoisted(() => ({
  toPng: vi.fn(),
  toJpeg: vi.fn(),
  toSvg: vi.fn(),
  getFontEmbedCSS: vi.fn(),
}))

vi.mock('file-saver', () => ({ saveAs }))
vi.mock('html-to-image', () => ({
  getFontEmbedCSS,
  toPng,
  toJpeg,
  toSvg,
}))

let lastZip: { files: Record<string, unknown>; file: ReturnType<typeof vi.fn>; generateAsync: ReturnType<typeof vi.fn> }

vi.mock('jszip', () => {
  return {
    __esModule: true,
    default: vi.fn().mockImplementation(() => {
      lastZip = {
        files: {},
        file: vi.fn(function (name: string, contents: unknown) {
          this.files[name] = contents
          return this
        }),
        generateAsync: vi.fn(async () => new Blob(['zip'])),
      }
      return lastZip
    }),
    getLastZip: () => lastZip,
  }
})

const arrayBuffer = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  getFontEmbedCSS.mockResolvedValue('font-css')
  toPng.mockResolvedValue('data:image/png;base64,AAA')
  toJpeg.mockResolvedValue('data:image/jpeg;base64,BBB')
  toSvg.mockResolvedValue('<svg></svg>')
  arrayBuffer.mockResolvedValue(new ArrayBuffer(8))
  ;(global.fetch as typeof fetch) = vi.fn().mockResolvedValue({ arrayBuffer } as unknown as Response)
})

describe('download utilities', () => {
  it('downloads a single PNG and triggers anchor click with provided options', async () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    const element = document.createElement('div')

    await downloadImage(element, 'png', {
      baseName: 'test-logo',
      options: { pixelRatio: 3, backgroundColor: '#123456', quality: 0.8 },
    })

    expect(getFontEmbedCSS).toHaveBeenCalledWith(element)
    expect(toPng).toHaveBeenCalledWith(
      element,
      expect.objectContaining({
        pixelRatio: 3,
        backgroundColor: '#123456',
        skipAutoScale: true,
        fontEmbedCSS: 'font-css',
      }),
    )
    expect(clickSpy).toHaveBeenCalled()
    clickSpy.mockRestore()
  })

  it('selects format-specific branches for jpeg and svg', async () => {
    const element = document.createElement('div')

    await downloadImage(element, 'jpeg', { baseName: 'photo', options: { quality: 0.5 } })
    expect(toJpeg).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ quality: 0.5, fontEmbedCSS: 'font-css' }),
    )

    await downloadImage(element, 'svg', { baseName: 'vector' })
    expect(toSvg).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ backgroundColor: '#000000', pixelRatio: 2, fontEmbedCSS: 'font-css' }),
    )
  })

  it('bundles multiple formats into a zip and saves the archive', async () => {
    const element = document.createElement('div')

    await downloadAsZip(element, ['png', 'jpeg', 'svg'], {
      baseName: 'bundle',
      options: { backgroundColor: '#000000', pixelRatio: 2, quality: 0.9 },
    })

    expect(toPng).toHaveBeenCalled()
    expect(toJpeg).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ quality: 0.9, fontEmbedCSS: 'font-css' }),
    )
    expect(toSvg).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ backgroundColor: '#000000', pixelRatio: 2, fontEmbedCSS: 'font-css' }),
    )
    expect(arrayBuffer).toHaveBeenCalledTimes(2)

    const { getLastZip } = await import('jszip')
    const zipInstance = getLastZip()
    expect(zipInstance.files['bundle.png']).toBeInstanceOf(ArrayBuffer)
    expect(zipInstance.files['bundle.jpg']).toBeInstanceOf(ArrayBuffer)
    expect(zipInstance.files['bundle.svg']).toBe('<svg></svg>')
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'bundle-assets.zip')
  })

  it('falls back to default jpeg quality and snapshot settings when omitted', async () => {
    const element = document.createElement('div')

    await downloadImage(element, 'jpeg')

    expect(toJpeg).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ quality: 0.92, backgroundColor: '#000000', pixelRatio: 2 }),
    )
  })

  it('applies default options and filenames when zipping without overrides', async () => {
    const element = document.createElement('div')

    await downloadAsZip(element, ['jpeg'])

    expect(toJpeg).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ quality: 0.92, backgroundColor: '#000000', pixelRatio: 2 }),
    )

    const { getLastZip } = await import('jszip')
    const zipInstance = getLastZip()
    expect(zipInstance.files['logoly.jpg']).toBeInstanceOf(ArrayBuffer)
  })

  it('falls back to default jpeg quality when option is omitted', async () => {
    const element = document.createElement('div')

    await downloadImage(element, 'jpeg', { options: { pixelRatio: 1, backgroundColor: '#ffffff' } })

    expect(toJpeg).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ quality: 0.92, backgroundColor: '#ffffff', pixelRatio: 1 }),
    )
  })

  it('fills missing zip options with defaults', async () => {
    const element = document.createElement('div')

    await downloadAsZip(element, ['jpeg'], { baseName: 'mixed', options: {} })

    expect(toJpeg).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ quality: 0.92, backgroundColor: '#000000', pixelRatio: 2 }),
    )
  })

  it('applies defaults when options object is provided without overrides', async () => {
    const element = document.createElement('div')

    await downloadImage(element, 'png', { baseName: 'empty', options: {} })

    expect(toPng).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ backgroundColor: '#000000', pixelRatio: 2 }),
    )
  })

  it('zips only svg assets without fetching array buffers', async () => {
    const element = document.createElement('div')

    await downloadAsZip(element, ['svg'])

    const { getLastZip } = await import('jszip')
    const zipInstance = getLastZip()
    expect(zipInstance.files['logoly.svg']).toBe('<svg></svg>')
    expect(arrayBuffer).not.toHaveBeenCalled()
    expect(toSvg).toHaveBeenCalledWith(
      element,
      expect.objectContaining({ backgroundColor: '#000000', pixelRatio: 2 }),
    )
  })
})
