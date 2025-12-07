<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SimpleTextEditor from '@/components/LogoEditor/SimpleText.vue'
import { useDownloadTask } from '@/composables/useDownloadTask'
import { type DownloadFormat, downloadAsZip, downloadImage } from '@/utils/download'

type DownloadOptions = { pixelRatio?: number; backgroundColor?: string; quality?: number }

type SimpleTextRef = {
  captureEl: Ref<HTMLElement | null> | HTMLElement | null
  getDownloadOptions: (format?: DownloadFormat) => DownloadOptions
  getFileBaseName: () => string
} | null

const editorRef = ref<SimpleTextRef>(null)
const isDownloading = ref(false)
const errorMessage = ref<string | null>(null)
const { runDownload } = useDownloadTask(isDownloading, errorMessage)
const { t } = useI18n()

const DEFAULT_OPTIONS = { pixelRatio: 2, backgroundColor: '#050505', quality: 0.94 } as const

const resolveCaptureEl = (
  captureEl: Ref<HTMLElement | null> | HTMLElement | null | undefined,
) => {
  if (!captureEl) return null
  if (!(captureEl instanceof HTMLElement) && 'value' in (captureEl as Ref<HTMLElement | null>)) {
    return (captureEl as Ref<HTMLElement | null>).value
  }
  return captureEl as HTMLElement | null
}

const getTarget = () => resolveCaptureEl(editorRef.value?.captureEl)
const isCanvasReady = computed(() => Boolean(getTarget()))
const getOptions = (format?: DownloadFormat) =>
  editorRef.value?.getDownloadOptions(format) ?? DEFAULT_OPTIONS
const getBaseName = () => editorRef.value?.getFileBaseName() ?? 'simple-text'

// biome-ignore lint/correctness/noUnusedVariables: used in template
const handleSingleDownload = (format: DownloadFormat) =>
  runDownload(
    () => Boolean(getTarget()),
    () => {
      const target = getTarget()
      if (!target) {
        return Promise.resolve()
      }

      return downloadImage(target, format, {
        baseName: getBaseName(),
        options: { ...getOptions(format) },
      })
    },
    t('page.home.errors.downloadFail'),
    t('page.home.errors.canvasNotReady'),
  )

// biome-ignore lint/correctness/noUnusedVariables: used in template
const handleZipDownload = () =>
  runDownload(
    () => Boolean(getTarget()),
    () => {
      const target = getTarget()
      if (!target) {
        return Promise.resolve()
      }

      return downloadAsZip(target, ['png', 'jpeg', 'svg'], {
        baseName: getBaseName(),
        options: { ...getOptions('png') },
      })
    },
    t('page.home.errors.zipFail'),
    t('page.home.errors.canvasNotReady'),
  )
</script>

<template>
  <div class="container mx-auto px-4 py-2 rounded-2xl bg-black/70">
    <header class="mb-6">
      <h1 class="text-4xl font-bold mb-2 text-white">{{ t('page.simpleText.title') }}</h1>
      <p class="text-lg text-gray-300 max-w-3xl">
        {{ t('page.simpleText.description') }}
      </p>
    </header>

    <SimpleTextEditor ref="editorRef" />

    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold
          text-black transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
        :disabled="isDownloading || !isCanvasReady"
        @click="handleSingleDownload('png')"
      >
        <span>
          {{
            isDownloading ? t('page.home.state.processing') : t('page.home.actions.downloadPng')
          }}
        </span>
      </button>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg border border-orange-400 px-4 py-2
          font-semibold text-orange-200 transition hover:bg-orange-500/10
          disabled:cursor-not-allowed disabled:opacity-70"
        :disabled="isDownloading || !isCanvasReady"
        @click="handleSingleDownload('jpeg')"
      >
        <span>
          {{
            isDownloading ? t('page.home.state.processing') : t('page.home.actions.downloadJpg')
          }}
        </span>
      </button>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg border border-gray-500 px-4 py-2
          font-semibold text-gray-100 transition hover:bg-white/5
          disabled:cursor-not-allowed disabled:opacity-70"
        :disabled="isDownloading || !isCanvasReady"
        @click="handleSingleDownload('svg')"
      >
        <span>
          {{
            isDownloading ? t('page.home.state.processing') : t('page.home.actions.downloadSvg')
          }}
        </span>
      </button>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold
          text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed
          disabled:opacity-70"
        :disabled="isDownloading || !isCanvasReady"
        @click="handleZipDownload"
      >
        <span>
          {{
            isDownloading ? t('page.home.state.packaging') : t('page.home.actions.downloadZip')
          }}
        </span>
      </button>
      <span v-if="errorMessage" class="text-sm text-red-400">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped></style>
