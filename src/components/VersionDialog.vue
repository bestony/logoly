<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: components are used in template
import { Dialog, DialogDescription, DialogPanel, DialogTitle } from '@headlessui/vue'
import { computed, ref } from 'vue'

/**
 * App semantic version string shown in the footer button and copied in debug info.
 */
const props = defineProps<{ version: string }>()

const isOpen = ref(false)

const platform = computed(
  () =>
    (typeof navigator !== 'undefined' && (navigator.platform || 'unknown-platform')) ||
    'unknown-platform',
)
const userAgent = computed(
  () =>
    (typeof navigator !== 'undefined' && (navigator.userAgent || 'unknown-user-agent')) ||
    'unknown-user-agent',
)

const debugInfo = computed(
  () => `OS: ${platform.value}\nBrowser: ${userAgent.value}\nVersion: ${props.version}`,
)

// biome-ignore lint/correctness/noUnusedVariables: used in template
const openDialog = () => {
  isOpen.value = true
}

const setIsOpen = (value: boolean) => {
  isOpen.value = value
}

// biome-ignore lint/correctness/noUnusedVariables: used in template
const copyDebugInfo = async () => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(debugInfo.value)
    }
  } catch {
    // ignore clipboard errors
  } finally {
    setIsOpen(false)
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <button
      type="button"
      class="text-center text-gray-500 font-mono hover:text-primary transition-colors"
      @click="openDialog"
    >
      {{ version }}
    </button>

    <Dialog :open="isOpen" @close="setIsOpen">
      <div class="fixed inset-0 bg-black/30" aria-hidden="true"></div>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="w-full max-w-md rounded-lg bg-gray-900 border border-gray-700 p-6 shadow-xl">
          <DialogTitle class="text-lg font-semibold text-white mb-2">诊断信息</DialogTitle>
          <DialogDescription class="text-sm text-gray-400 mb-4">
            Click to Copy Debug Info
          </DialogDescription>
          <pre class="bg-gray-950 border border-gray-800 rounded-md p-3 text-xs text-gray-200 whitespace-pre-wrap">
OS: {{ platform }}
Browser: {{ userAgent }}
Version: {{ version }}
          </pre>
          <div class="mt-4 flex justify-end gap-2">
            <button
              type="button"
              class="rounded-md border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
              @click="setIsOpen(false)"
            >
              关闭
            </button>
            <button
              type="button"
              data-testid="copy-debug"
              class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-black hover:brightness-110"
              @click="copyDebugInfo"
            >
              Copy
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
