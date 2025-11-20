<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

// biome-ignore lint/correctness/noUnusedVariables: used in template
const props = defineProps<{
  message?: string
}>()

const error = ref<unknown>(null)

onErrorCaptured((err) => {
  error.value = err
  // prevent further propagation to keep UI visible
  return false
})

// biome-ignore lint/correctness/noUnusedVariables: used in template
const resetError = () => {
  error.value = null
}
</script>

<template>
  <div v-if="error" class="p-4 bg-red-900/30 border border-red-700 rounded">
    <p class="text-red-200 font-semibold mb-2">{{ props.message ?? '出现意外错误' }}</p>
    <pre class="text-xs text-red-200 whitespace-pre-wrap mb-3">{{ String(error) }}</pre>
    <button
      type="button"
      class="rounded bg-primary px-3 py-1 text-sm font-semibold text-black hover:brightness-110"
      @click="resetError"
    >
      重试
    </button>
  </div>
  <slot v-else />
</template>

<style scoped></style>
