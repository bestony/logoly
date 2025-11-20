<script setup lang="ts">
const mode = import.meta.env.MODE
const versionSuffix =
  mode === 'development'
    ? 'development'
    : mode === 'test'
      ? 'test'
      : // biome-ignore lint/correctness/noUndeclaredVariables: injected via Vite define
        __GIT_SHA__ || 'unknown'
// biome-ignore lint/correctness/noUnusedVariables: referenced in template
const versionLabel = `v1.0.0-${versionSuffix}`
</script>

<template>
  <div class="bg-gray-950 border-t border-gray-800 py-6">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-400"
    >
      <p>© 2025 Logoly · 由社区维护，欢迎贡献新模板</p>
      <p class="text-center text-gray-500 font-mono">{{ versionLabel }}</p>
      <div class="flex flex-wrap items-center gap-3 text-gray-400">
        <a class="hover:text-primary transition-colors" href="https://github.com/bestony/logoly" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span class="text-gray-700">|</span>
        <a class="hover:text-primary transition-colors" href="https://x.com/xiqingongzi" target="_blank" rel="noopener noreferrer">X.com</a>
        <span class="text-gray-700">|</span>
        <a class="hover:text-primary transition-colors" href="https://www.ixiqin.com/to-contact-me/" target="_blank">联系作者</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
