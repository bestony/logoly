<script setup lang="ts">
import { computed, onErrorCaptured, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDebugInfo } from '../composables/useDebugInfo'

const props = defineProps<{
  message?: string
}>()

const error = ref<unknown>(null)
const { t } = useI18n()

// biome-ignore lint/correctness/noUnusedVariables: used in template
const { debugInfo, copyDebugInfo, setErrorRoute } = useDebugInfo({ error })

// biome-ignore lint/correctness/noUnusedVariables: used in template
const resetError = () => {
  error.value = null
}

onErrorCaptured((err) => {
  error.value = err
  setErrorRoute()
  // prevent further propagation to keep UI visible
  return false
})

// biome-ignore lint/correctness/noUnusedVariables: used in template
const displayMessage = computed(() => props.message ?? t('component.errorBoundary.defaultMessage'))
</script>

<template>
  <div v-if="error" class="p-4 bg-red-900/30 border border-red-700 rounded space-y-3">
    <div>
      <p class="text-red-200 font-semibold mb-1">{{ displayMessage }}</p>
      <p class="text-sm text-gray-300">
        {{ t('component.errorBoundary.help') }}
        <a
          class="text-primary underline"
          href="https://github.com/bestony/logoly/issues"
          target="_blank"
          rel="noreferrer"
        >
          {{ t('component.errorBoundary.githubLink') }}
        </a>
      </p>
    </div>
    <pre class="text-xs text-red-200 whitespace-pre-wrap bg-gray-950 border border-red-700 rounded p-3">
{{ debugInfo }}
    </pre>
    <div class="flex gap-2">
      <button
        type="button"
        class="rounded bg-primary px-3 py-1 text-sm font-semibold text-black hover:brightness-110"
        @click="copyDebugInfo"
      >
        {{ t('component.errorBoundary.copy') }}
      </button>
      <button
        type="button"
        class="rounded border border-red-600 px-3 py-1 text-sm font-semibold text-red-100 hover:bg-red-800/60"
        @click="resetError"
      >
        {{ t('component.errorBoundary.retry') }}
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<style scoped></style>
