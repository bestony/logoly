<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in template
import Menu from './components/Menu.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <Menu />
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style scoped></style>
