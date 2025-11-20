<script setup lang="ts">
import { toJpeg, toPng, toSvg } from 'html-to-image'
import { ref } from 'vue'

const captureRef = ref<HTMLDivElement | null>(null)
const isDownloading = ref(false)
const errorMessage = ref<string | null>(null)

type DownloadFormat = 'png' | 'jpeg' | 'svg'

// biome-ignore lint/correctness/noUnusedVariables: used in template
const downloadImage = async (format: DownloadFormat) => {
  if (!captureRef.value || isDownloading.value) {
    return
  }

  isDownloading.value = true
  errorMessage.value = null

  try {
    const options = { pixelRatio: 2, backgroundColor: '#000000' }
    const dataUrl =
      format === 'png'
        ? await toPng(captureRef.value, options)
        : format === 'jpeg'
          ? await toJpeg(captureRef.value, { ...options, quality: 0.92 })
          : await toSvg(captureRef.value, options)

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `logoly-home.${format === 'jpeg' ? 'jpg' : format}`
    link.click()
  } catch (error) {
    console.error('Failed to download image', error)
    errorMessage.value = '下载失败，请稍后重试。'
  } finally {
    isDownloading.value = false
  }
}
</script>

<template>
  <div ref="captureRef" class="container mx-auto px-4 py-8 space-y-8 rounded-2xl bg-black/70">
    <header>
      <h1 class="text-4xl font-bold mb-4 text-white">首页</h1>
      <p class="text-lg text-gray-300 leading-relaxed">
        欢迎来到 Logoly，几秒生成 PornHub/OnlyFans 风格 Logo，支持 PNG 与 SVG 下载。
      </p>
      <div class="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-black transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading"
          @click="downloadImage('png')"
        >
          <span>{{ isDownloading ? "生成中…" : "下载 PNG" }}</span>
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-orange-400 px-4 py-2 font-semibold text-orange-200 transition hover:bg-orange-500/10 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading"
          @click="downloadImage('jpeg')"
        >
          <span>{{ isDownloading ? "生成中…" : "下载 JPG" }}</span>
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-500 px-4 py-2 font-semibold text-gray-100 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isDownloading"
          @click="downloadImage('svg')"
        >
          <span>{{ isDownloading ? "生成中…" : "下载 SVG" }}</span>
        </button>
        <span v-if="errorMessage" class="text-sm text-red-400">{{ errorMessage }}</span>
      </div>
    </header>

    <section class="space-y-3">
      <h2 class="text-2xl font-semibold text-primary">Logoly 是什么？</h2>
      <p class="text-gray-300 leading-relaxed">
        这是一个开源、纯前端的在线 Logo 生成器，无需注册登录即可使用，不会收集或存储你的输入和图片。
      </p>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-semibold text-primary">快速开始</h2>
      <ol class="list-decimal list-inside space-y-2 text-gray-300">
        <li>选择左上角的模板（如 PornHub、OnlyFans）。</li>
        <li>输入想要的文字，实时预览效果。</li>
        <li>点击下载，获得 PNG 或 SVG 文件。</li>
      </ol>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-semibold text-primary">常用模板</h2>
      <p class="text-gray-300">
        已内置多种流行品牌风格模板，并支持社区贡献更多样式，满足你的创意需求。
      </p>
    </section>
  </div>
</template>

<style scoped></style>
