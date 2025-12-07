<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
// biome-ignore lint/correctness/noUnusedImports: used in template
import PornHub from '@/components/LogoEditor/PornHub.vue'
import { useDownloadTask } from '@/composables/useDownloadTask'
import { useSnapshotDownload, type DownloadSource } from '@/composables/useSnapshotDownload'
import { DEFAULT_DOWNLOAD_OPTIONS } from '@/constants/download'

const pornHubRef = ref<DownloadSource>(null)
const isDownloading = ref(false)
const errorMessage = ref<string | null>(null)
const { runDownload } = useDownloadTask(isDownloading, errorMessage)
const { t } = useI18n()

const { isCanvasReady, handleSingleDownload, handleZipDownload } = useSnapshotDownload({
  sourceRef: pornHubRef,
  runDownload,
  defaultOptions: DEFAULT_DOWNLOAD_OPTIONS,
  baseNameFallback: 'logoly',
  t,
})
</script>

<template>
  <div class="container mx-auto px-4 py-2 rounded-2xl bg-black/70">
    <header>
      <h1 class="text-4xl font-bold mb-4 text-white">{{ t('page.home.title') }}</h1>

      <PornHub ref="pornHubRef" class="mt-4" />

      <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-black transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading || !isCanvasReady"
          @click="handleSingleDownload('png')"
        >
          <span>
            {{
              isDownloading
                ? t('page.home.state.processing')
                : t('page.home.actions.downloadPng')
            }}
          </span>
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-orange-400 px-4 py-2 font-semibold text-orange-200 transition hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading || !isCanvasReady"
          @click="handleSingleDownload('jpeg')"
        >
          <span>
            {{
              isDownloading
                ? t('page.home.state.processing')
                : t('page.home.actions.downloadJpg')
            }}
          </span>
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 font-semibold text-gray-100 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading || !isCanvasReady"
          @click="handleSingleDownload('svg')"
        >
          <span>
            {{
              isDownloading
                ? t('page.home.state.processing')
                : t('page.home.actions.downloadSvg')
            }}
          </span>
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading || !isCanvasReady"
          @click="handleZipDownload"
        >
          <span>
            {{
              isDownloading
                ? t('page.home.state.packaging')
                : t('page.home.actions.downloadZip')
            }}
          </span>
        </button>
        <span v-if="errorMessage" class="text-sm text-red-400">{{ errorMessage }}</span>
      </div>
    </header>
  </div>
</template>

<style scoped></style>
