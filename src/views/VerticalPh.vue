<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// biome-ignore lint/correctness/noUnusedVariables: t is consumed in the template
const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4 text-white">{{ t('page.verticalPh.title') }}</h1>
    <p class="text-lg text-gray-300">{{ t('page.verticalPh.description') }}</p>
  </div>
</template>

<style scoped></style>
