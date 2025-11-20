<script setup lang="ts">
import { ref } from 'vue'
// biome-ignore lint/correctness/noUnusedImports: used in template
import PornHub from '@/components/LogoEditor/PornHub.vue'
import { useDownloadTask } from '@/composables/useDownloadTask'
import { type DownloadFormat, downloadAsZip, downloadImage } from '@/utils/download'

const captureRef = ref<HTMLDivElement | null>(null)
const isDownloading = ref(false)
const errorMessage = ref<string | null>(null)
const { runDownload } = useDownloadTask(isDownloading, errorMessage)

const DEFAULT_OPTIONS = { pixelRatio: 2, backgroundColor: '#000000', quality: 0.92 } as const
const BASE_NAME = 'logoly-home'

// biome-ignore lint/correctness/noUnusedVariables: used in template
const handleSingleDownload = (format: DownloadFormat) =>
  runDownload(
    () => Boolean(captureRef.value),
    () => {
      const target = captureRef.value
      if (!target) {
        return Promise.resolve()
      }

      return downloadImage(target, format, {
        baseName: BASE_NAME,
        options: { ...DEFAULT_OPTIONS },
      })
    },
    '下载失败，请稍后重试。',
  )

// biome-ignore lint/correctness/noUnusedVariables: used in template
const handleZipDownload = () =>
  runDownload(
    () => Boolean(captureRef.value),
    () => {
      const target = captureRef.value
      if (!target) {
        return Promise.resolve()
      }

      return downloadAsZip(target, ['png', 'jpeg', 'svg'], {
        baseName: BASE_NAME,
        options: { ...DEFAULT_OPTIONS },
      })
    },
    '打包失败，请稍后重试。',
  )
</script>

<template>
  <div class="container mx-auto px-4 py-2 rounded-2xl bg-black/70">
    <header>
      <h1 class="text-4xl font-bold mb-4 text-white">PornHub Style Logo Generator</h1>

      <div ref="captureRef">
        <PornHub />
      </div>

      <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-black transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading"
          @click="handleSingleDownload('png')"
        >
          <span>{{ isDownloading ? "生成中…" : "下载 PNG" }}</span>
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-orange-400 px-4 py-2 font-semibold text-orange-200 transition hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading"
          @click="handleSingleDownload('jpeg')"
        >
          <span>{{ isDownloading ? "生成中…" : "下载 JPG" }}</span>
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 font-semibold text-gray-100 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading"
          @click="handleSingleDownload('svg')"
        >
          <span>{{ isDownloading ? "生成中…" : "下载 SVG" }}</span>
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading"
          @click="handleZipDownload"
        >
          <span>{{ isDownloading ? "打包中…" : "打包下载 ZIP" }}</span>
        </button>
        <span v-if="errorMessage" class="text-sm text-red-400">{{ errorMessage }}</span>
      </div>
    </header>
  </div>
</template>

<style scoped></style>
