<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import UnderConstruction from '@/components/UnderConstruction.vue'

const route = useRoute()

const baseKey = computed(
  () => (route.meta.placeholderKey as string | undefined) ?? `page.${route.name ?? 'home'}`,
)
const brandLabel = computed(
  () => (route.meta.brandLabel as string | undefined) ?? (route.meta.title as string) ?? 'Logoly',
)
const progressHref = computed(() => route.meta.progressHref as string | undefined)
</script>

<template>
  <UnderConstruction :base-key="baseKey" :brand-label="brandLabel" :progress-href="progressHref" />
</template>

<style scoped></style>
