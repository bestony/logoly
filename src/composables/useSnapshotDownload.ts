import { computed, type Ref } from 'vue'
import {
  downloadAsZip,
  downloadImage,
  type DownloadFormat,
  type DownloadOptions,
} from '@/utils/download'
import type { useDownloadTask } from './useDownloadTask'

type CaptureEl = Ref<HTMLElement | null> | HTMLElement | null | undefined

type DownloadableSource = {
  captureEl: CaptureEl
  getDownloadOptions: (format?: DownloadFormat) => DownloadOptions['options']
  getFileBaseName: () => string
} | null

type UseSnapshotDownloadOptions = {
  sourceRef: Ref<DownloadableSource>
  runDownload: ReturnType<typeof useDownloadTask>['runDownload']
  defaultOptions: DownloadOptions['options']
  baseNameFallback: string
  t: (key: string) => string
}

const resolveCaptureEl = (captureEl: CaptureEl) => {
  if (!captureEl) return null
  if (!(captureEl instanceof HTMLElement) && 'value' in (captureEl as Ref<HTMLElement | null>)) {
    return (captureEl as Ref<HTMLElement | null>).value
  }
  return captureEl as HTMLElement | null
}

export const useSnapshotDownload = ({
  sourceRef,
  runDownload,
  defaultOptions,
  baseNameFallback,
  t,
}: UseSnapshotDownloadOptions) => {
  const getTarget = () => resolveCaptureEl(sourceRef.value?.captureEl)
  const isCanvasReady = computed(() => Boolean(getTarget()))
  const getOptions = (format?: DownloadFormat) =>
    sourceRef.value?.getDownloadOptions(format) ?? defaultOptions
  const getBaseName = () => sourceRef.value?.getFileBaseName() ?? baseNameFallback

  const handleSingleDownload = (format: DownloadFormat) =>
    runDownload(
      () => Boolean(getTarget()),
      () => {
        const target = getTarget()
        if (!target) return Promise.resolve()

        return downloadImage(target, format, {
          baseName: getBaseName(),
          options: { ...getOptions(format) },
        })
      },
      t('page.home.errors.downloadFail'),
      t('page.home.errors.canvasNotReady'),
    )

  const handleZipDownload = () =>
    runDownload(
      () => Boolean(getTarget()),
      () => {
        const target = getTarget()
        if (!target) return Promise.resolve()

        return downloadAsZip(target, ['png', 'jpeg', 'svg'], {
          baseName: getBaseName(),
          options: { ...getOptions('png') },
        })
      },
      t('page.home.errors.zipFail'),
      t('page.home.errors.canvasNotReady'),
    )

  return { isCanvasReady, handleSingleDownload, handleZipDownload }
}
