<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in template
import FooterMenu from './components/FooterMenu.vue'
// biome-ignore lint/correctness/noUnusedImports: used in template
import Menu from './components/Menu.vue'
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
  </div>
</template>

<style scoped></style>
