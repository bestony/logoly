<script setup lang="ts">
import { computed, onErrorCaptured, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// biome-ignore lint/correctness/noUnusedVariables: used in template
const props = defineProps<{
  message?: string
}>()

const error = ref<unknown>(null)
const errorRoute = ref<string | null>(null)
const route = useRoute()
const routeHistory = ref<string[]>([route.fullPath])

watch(
  () => route.fullPath,
  (fullPath) => {
    routeHistory.value.push(fullPath)
    if (routeHistory.value.length > 10) {
      routeHistory.value.shift()
    }
  },
)

const platform = computed(() => navigator?.platform || 'unknown-platform')
const userAgent = computed(() => navigator?.userAgent || 'unknown-user-agent')
const browserBrand = computed(() => {
  const brands = (
    navigator as { userAgentData?: { brands?: { brand: string; version: string }[] } }
  )?.userAgentData?.brands
  return brands?.map((b) => `${b.brand} ${b.version}`).join(', ') || 'unknown-browser'
})

const debugInfo = computed(
  () => `OS: ${platform.value}
Browser: ${browserBrand.value}
User Agent: ${userAgent.value}
Error Route: ${errorRoute.value ?? route.fullPath}
History: ${routeHistory.value.join(' -> ')}
Error: ${String(error.value)}`,
)

// biome-ignore lint/correctness/noUnusedVariables: used in template
const copyDebugInfo = async () => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(debugInfo.value)
    }
  } catch {
    // ignore clipboard errors
  }
}

// biome-ignore lint/correctness/noUnusedVariables: used in template
const resetError = () => {
  error.value = null
}

onErrorCaptured((err) => {
  error.value = err
  errorRoute.value = route.fullPath
  // prevent further propagation to keep UI visible
  return false
})
</script>

<template>
  <div v-if="error" class="p-4 bg-red-900/30 border border-red-700 rounded space-y-3">
    <div>
      <p class="text-red-200 font-semibold mb-1">{{ props.message ?? '出现意外错误' }}</p>
      <p class="text-sm text-gray-300">
        请将下方调试信息附上并前往
        <a
          class="text-primary underline"
          href="https://github.com/bestony/logoly/issues"
          target="_blank"
          rel="noreferrer"
        >
          GitHub 提交 Issue
        </a>
        ，方便我们排查。
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
        复制调试信息
      </button>
      <button
        type="button"
        class="rounded border border-red-600 px-3 py-1 text-sm font-semibold text-red-100 hover:bg-red-800/60"
        @click="resetError"
      >
        重试
      </button>
    </div>
  </div>
  <slot v-else />
</template>

<style scoped></style>
