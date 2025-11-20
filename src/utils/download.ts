import { saveAs } from 'file-saver'
import { toJpeg, toPng, toSvg } from 'html-to-image'
import JSZip from 'jszip'

type BaseOptions = {
  pixelRatio?: number
  backgroundColor?: string
}

type JpegOptions = BaseOptions & {
  quality?: number
}

export type DownloadFormat = 'png' | 'jpeg' | 'svg'

export type DownloadOptions = {
  baseName?: string
  options?: JpegOptions
}

const dataUrlToArrayBuffer = async (dataUrl: string) => {
  const response = await fetch(dataUrl)
  return response.arrayBuffer()
}

/**
 * Download a single element snapshot as PNG / JPG / SVG.
 */
export const downloadImage = async (
  element: HTMLElement,
  format: DownloadFormat,
  {
    baseName = 'logoly',
    options = { pixelRatio: 2, backgroundColor: '#000000', quality: 0.92 },
  }: DownloadOptions = {},
) => {
  const snapshotOptions = {
    pixelRatio: options.pixelRatio ?? 2,
    backgroundColor: options.backgroundColor ?? '#000000',
  }

  const dataUrl =
    format === 'png'
      ? await toPng(element, snapshotOptions)
      : format === 'jpeg'
        ? await toJpeg(element, { ...snapshotOptions, quality: options.quality ?? 0.92 })
        : await toSvg(element, snapshotOptions)

  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `${baseName}.${format === 'jpeg' ? 'jpg' : format}`
  link.click()
}

/**
 * Download multiple element snapshots and bundle them into a ZIP.
 */
export const downloadAsZip = async (
  element: HTMLElement,
  formats: DownloadFormat[] = ['png', 'jpeg', 'svg'],
  {
    baseName = 'logoly',
    options = { pixelRatio: 2, backgroundColor: '#000000', quality: 0.92 },
  }: DownloadOptions = {},
) => {
  const snapshotOptions = {
    pixelRatio: options.pixelRatio ?? 2,
    backgroundColor: options.backgroundColor ?? '#000000',
  }

  const zip = new JSZip()

  for (const format of formats) {
    const dataUrl =
      format === 'png'
        ? await toPng(element, snapshotOptions)
        : format === 'jpeg'
          ? await toJpeg(element, { ...snapshotOptions, quality: options.quality ?? 0.92 })
          : await toSvg(element, snapshotOptions)

    if (format === 'svg') {
      zip.file(`${baseName}.svg`, dataUrl)
    } else {
      zip.file(
        `${baseName}.${format === 'jpeg' ? 'jpg' : format}`,
        await dataUrlToArrayBuffer(dataUrl),
      )
    }
  }

  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })

  saveAs(zipBlob, `${baseName}-assets.zip`)
}
