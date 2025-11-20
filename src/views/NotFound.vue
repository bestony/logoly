<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDebugInfo } from '../composables/useDebugInfo'

// biome-ignore lint/correctness/noUnusedVariables: used in template
const { t } = useI18n()
// biome-ignore lint/correctness/noUnusedVariables: used in template
const issueUrl = 'https://github.com/bestony/logoly/issues/new/choose'
// biome-ignore lint/correctness/noUnusedVariables: used in template
const { debugInfo, copyDebugInfo } = useDebugInfo()
</script>

<template>
  <section class="min-h-[60vh] flex items-center justify-center px-4 py-14">
    <div class="w-full max-w-3xl rounded-2xl border border-gray-800 bg-gray-900/60 p-8 shadow-lg">
      <p class="text-sm font-semibold uppercase tracking-[0.35em] text-gray-500">404</p>
      <h1 class="mt-2 text-4xl font-bold text-white">{{ t('page.notFound.title') }}</h1>
      <p class="mt-3 text-lg leading-relaxed text-gray-300">{{ t('page.notFound.lead') }}</p>

      <div class="mt-5 rounded-xl border border-gray-700 bg-gray-800/60 p-4 text-gray-200">
        <p class="leading-relaxed">{{ t('page.notFound.issuePrompt') }}</p>
      </div>

      <div class="mt-6 flex flex-wrap gap-3">
        <a
          :href="issueUrl"
          class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-black transition hover:bg-primary/90"
          rel="noopener"
          target="_blank"
        >
          <span>{{ t('page.notFound.actions.issue') }}</span>
          <span class="i-carbon-arrow-up-right text-lg"></span>
        </a>
        <RouterLink
          class="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 font-semibold text-gray-100 transition hover:border-primary hover:text-primary"
          to="/"
        >
          <span class="i-carbon-home text-lg"></span>
          <span>{{ t('page.notFound.actions.home') }}</span>
        </RouterLink>
      </div>

      <div class="mt-8 rounded-2xl border border-gray-800 bg-gray-950/70 p-5 shadow-inner">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
              {{ t('component.versionDialog.title') }}
            </p>
            <p class="mt-1 text-sm text-gray-400">{{ t('component.errorBoundary.help') }}</p>
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-black hover:brightness-110"
            @click="copyDebugInfo"
          >
            <span class="i-carbon-copy text-base"></span>
            <span>{{ t('component.errorBoundary.copy') }}</span>
          </button>
        </div>
        <pre class="mt-3 max-h-60 overflow-auto rounded-lg border border-gray-800 bg-black/60 p-3 text-xs text-gray-200 whitespace-pre-wrap">
{{ debugInfo }}
        </pre>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
