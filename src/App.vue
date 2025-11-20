<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// biome-ignore lint/correctness/noUnusedImports: used in template
import ErrorBoundary from './components/ErrorBoundary.vue'
// biome-ignore lint/correctness/noUnusedImports: used in template
import FooterMenu from './components/FooterMenu.vue'
// biome-ignore lint/correctness/noUnusedImports: used in template
import Menu from './components/Menu.vue'
// biome-ignore lint/correctness/noUnusedImports: used in template
import SiteFooter from './components/SiteFooter.vue'
import { useSEO } from './composables/useSEO'

// Initialize SEO based on browser language
useSEO()

// biome-ignore lint/correctness/noUnusedVariables: used in template
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <Menu />
    <main class="flex-1">
      <ErrorBoundary :message="t('page.app.renderError')">
        <RouterView :key="$route.fullPath" />
      </ErrorBoundary>
    </main>
    <FooterMenu />
    <SiteFooter />
  </div>
</template>

<style scoped></style>
