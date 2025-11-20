<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
// biome-ignore lint/correctness/noUnusedImports: used in template
import VersionDialog from './VersionDialog.vue'

const mode = import.meta.env.MODE
const versionSuffix =
  mode === 'development'
    ? 'development'
    : mode === 'test'
      ? 'test'
      : // biome-ignore lint/correctness/noUndeclaredVariables: injected via Vite define
        __GIT_SHA__ || 'unknown'
// biome-ignore lint/correctness/noUnusedVariables: used in template
const versionLabel = `v1.0.0-${versionSuffix}`
const currentYear = new Date().getFullYear()
const { t, te } = useI18n()
const COPYRIGHT_KEY = 'component.siteFooter.copyright'
// biome-ignore lint/correctness/noUnusedVariables: used in template
const copyright = computed(() => {
  if (te(COPYRIGHT_KEY)) {
    return t(COPYRIGHT_KEY, { year: currentYear.toString() })
  }
  return `© ${currentYear} Logoly`
})
</script>

<template>
  <div class="bg-gray-950 border-t border-gray-800 py-6">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-400"
    >
      <p>{{ copyright }}</p>
      <VersionDialog :version="versionLabel" />
      <div class="flex flex-wrap items-center gap-3 text-gray-400">
        <a
          class="hover:text-primary transition-colors"
          href="https://github.com/bestony/logoly"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('component.siteFooter.github') }}
        </a>
        <span class="text-gray-700">|</span>
        <a
          class="hover:text-primary transition-colors"
          href="https://x.com/xiqingongzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('component.siteFooter.x') }}
        </a>
        <span class="text-gray-700">|</span>
        <a
          class="hover:text-primary transition-colors"
          href="https://www.ixiqin.com/to-contact-me/"
          target="_blank"
        >
          {{ t('component.siteFooter.contact') }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
