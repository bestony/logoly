import { ref } from 'vue'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useSnapshotDownload, type DownloadSource } from '../composables/useSnapshotDownload'
import { downloadAsZip, downloadImage } from '../utils/download'

vi.mock('../utils/download', () => ({
  downloadImage: vi.fn().mockResolvedValue(undefined),
  downloadAsZip: vi.fn().mockResolvedValue(undefined),
}))

const defaultOptions = { pixelRatio: 2, backgroundColor: '#000000', quality: 0.92 }

describe('useSnapshotDownload', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('marks canvas readiness based on resolved capture element', () => {
    const captureEl = ref<HTMLElement | null>(null)
    const sourceRef = ref<DownloadSource>({
      captureEl,
      getDownloadOptions: vi.fn().mockReturnValue(defaultOptions),
      getFileBaseName: vi.fn().mockReturnValue('ready'),
    })

    const { isCanvasReady } = useSnapshotDownload({
      sourceRef,
      runDownload: vi.fn(),
      defaultOptions,
      baseNameFallback: 'fallback',
      t: (key: string) => key,
    })

    expect(isCanvasReady.value).toBe(false)
    captureEl.value = document.createElement('div')
    expect(isCanvasReady.value).toBe(true)
    sourceRef.value = null
    expect(isCanvasReady.value).toBe(false)
  })

  it('delegates single downloads with computed options and basename', async () => {
    const element = document.createElement('div')
    const getDownloadOptions = vi.fn().mockReturnValue({ pixelRatio: 1, backgroundColor: '#ffffff' })
    const getFileBaseName = vi.fn().mockReturnValue('custom-name')

    const sourceRef = ref<DownloadSource>({
      captureEl: element,
      getDownloadOptions,
      getFileBaseName,
    })

    const runDownload = vi.fn(
      async (
        guard: () => boolean,
        task: () => Promise<void>,
        _fail?: string,
        _guardFail?: string,
      ) => {
        if (!guard()) return
        await task()
      },
    )

    const { handleSingleDownload } = useSnapshotDownload({
      sourceRef,
      runDownload,
      defaultOptions,
      baseNameFallback: 'fallback',
      t: (key: string) => key,
    })

    await handleSingleDownload('svg')

    expect(runDownload).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'page.home.errors.downloadFail',
      'page.home.errors.canvasNotReady',
    )
    expect(downloadImage).toHaveBeenCalledWith(element, 'svg', {
      baseName: 'custom-name',
      options: { pixelRatio: 1, backgroundColor: '#ffffff' },
    })
  })

  it('resolves capture elements from ref-like objects without HTMLElement prototypes', async () => {
    const capture = { value: document.createElement('div') }
    const sourceRef = ref<DownloadSource>({
      captureEl: capture as unknown as HTMLElement,
      getDownloadOptions: vi.fn().mockReturnValue(defaultOptions),
      getFileBaseName: vi.fn().mockReturnValue('ref-like'),
    })

    const runDownload = vi.fn(
      async (
        guard: () => boolean,
        task: () => Promise<void>,
        _fail?: string,
        _guardFail?: string,
      ) => {
        if (!guard()) return
        await task()
      },
    )

    const { handleSingleDownload } = useSnapshotDownload({
      sourceRef,
      runDownload,
      defaultOptions,
      baseNameFallback: 'fallback',
      t: (key: string) => key,
    })

    await handleSingleDownload('png')

    expect(downloadImage).toHaveBeenCalledWith(capture.value, 'png', {
      baseName: 'ref-like',
      options: defaultOptions,
    })
  })

  it('guards zip download when canvas is missing and reuses png options when available', async () => {
    const sourceRef = ref<DownloadSource>(null)
    const runDownload = vi.fn(
      async (
        guard: () => boolean,
        task: () => Promise<void>,
        _fail?: string,
        _guardFail?: string,
      ) => {
        if (!guard()) return
        await task()
      },
    )

    const { handleZipDownload } = useSnapshotDownload({
      sourceRef,
      runDownload,
      defaultOptions,
      baseNameFallback: 'bundle',
      t: (key: string) => key,
    })

    await handleZipDownload()
    expect(downloadAsZip).not.toHaveBeenCalled()
    expect(runDownload).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      'page.home.errors.zipFail',
      'page.home.errors.canvasNotReady',
    )

    const element = document.createElement('div')
    sourceRef.value = {
      captureEl: element,
      getDownloadOptions: vi.fn().mockReturnValue({ pixelRatio: 3 }),
      getFileBaseName: vi.fn().mockReturnValue('bundle-name'),
    }

    await handleZipDownload()

    expect(downloadAsZip).toHaveBeenCalledWith(element, ['png', 'jpeg', 'svg'], {
      baseName: 'bundle-name',
      options: { pixelRatio: 3 },
    })
  })

  it('resolves gracefully when tasks run without a resolved target element', async () => {
    const sourceRef = ref<DownloadSource>({
      captureEl: ref<HTMLElement | null>(null),
      getDownloadOptions: vi.fn().mockReturnValue(defaultOptions),
      getFileBaseName: vi.fn().mockReturnValue('defensive'),
    })

    const runDownload = vi.fn(async (_guard, task) => {
      await task()
    })

    const { handleSingleDownload, handleZipDownload } = useSnapshotDownload({
      sourceRef,
      runDownload,
      defaultOptions,
      baseNameFallback: 'fallback',
      t: (key: string) => key,
    })

    await handleSingleDownload('png')
    await handleZipDownload()

    expect(downloadImage).not.toHaveBeenCalled()
    expect(downloadAsZip).not.toHaveBeenCalled()
  })

  it('falls back to default options and basename when provided source returns undefined values', async () => {
    const element = document.createElement('div')
    const sourceRef = ref<DownloadSource>({
      captureEl: element,
      // intentionally returning undefined to exercise fallback
      getDownloadOptions: () => undefined,
      getFileBaseName: () => undefined as unknown as string,
    })

    const runDownload = vi.fn(
      async (
        guard: () => boolean,
        task: () => Promise<void>,
        _fail?: string,
        _guardFail?: string,
      ) => {
        if (!guard()) return
        await task()
      },
    )

    const { handleSingleDownload } = useSnapshotDownload({
      sourceRef,
      runDownload,
      defaultOptions,
      baseNameFallback: 'fallback-name',
      t: (key: string) => key,
    })

    await handleSingleDownload('png')

    expect(downloadImage).toHaveBeenCalledWith(element, 'png', {
      baseName: 'fallback-name',
      options: defaultOptions,
    })
  })
})
