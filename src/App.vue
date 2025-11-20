<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in template
import FooterMenu from './components/FooterMenu.vue'
// biome-ignore lint/correctness/noUnusedImports: used in template
import Menu from './components/Menu.vue'
// biome-ignore lint/correctness/noUnusedImports: used in template
import SiteFooter from './components/SiteFooter.vue'
import { useSEO } from './composables/useSEO'

// Initialize SEO based on browser language
useSEO()
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col">
    <Menu />
    <main class="flex-1">
      <RouterView :key="$route.fullPath" />
    </main>
    <FooterMenu />
    <SiteFooter />
  </div>
</template>

<style scoped></style>
