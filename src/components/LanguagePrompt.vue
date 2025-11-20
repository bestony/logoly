<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in template
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '../stores/locale'

const localeStore = useLocaleStore()
localeStore.init()
// biome-ignore lint/correctness/noUnusedVariables: used in template
const { promptVisible, promptLocale, locale } = storeToRefs(localeStore)
const { t } = useI18n()

// biome-ignore lint/correctness/noUnusedVariables: used in template
const suggestedLabel = computed(() => {
  const code = promptLocale.value ?? locale.value
  return t(`component.menu.lang.${code}`)
})

// biome-ignore lint/correctness/noUnusedVariables: used in template
const switchToSuggested = () => {
  if (promptLocale.value) {
    localeStore.setLocale(promptLocale.value)
  } else {
    localeStore.keepCurrent()
  }
}

// biome-ignore lint/correctness/noUnusedVariables: used in template
const stayCurrent = () => {
  localeStore.keepCurrent()
}
</script>

<template>
  <TransitionRoot :show="promptVisible" as="template">
    <Dialog :open="promptVisible" @close="stayCurrent" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/40" />
      </TransitionChild>

      <div class="fixed inset-0 flex items-center justify-center p-4">
        <TransitionChild
          as="template"
          enter="ease-out duration-200"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-150"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="w-full max-w-md rounded-lg bg-gray-900 border border-gray-700 p-6 shadow-xl"
          >
            <DialogTitle class="text-lg font-semibold text-white mb-2">
              {{ t('component.languagePrompt.title') }}
            </DialogTitle>
            <DialogDescription class="text-sm text-gray-400 mb-4">
              {{ t('component.languagePrompt.description', { locale: suggestedLabel }) }}
            </DialogDescription>

            <p class="text-gray-300 text-sm leading-relaxed mb-4">
              {{ t('component.languagePrompt.hint') }}
            </p>

            <div class="mt-4 flex justify-end gap-2">
              <button
                type="button"
                class="rounded-md border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                @click="stayCurrent"
              >
                {{ t('component.languagePrompt.stay') }}
              </button>
              <button
                type="button"
                class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-black hover:brightness-110"
                @click="switchToSuggested"
              >
                {{ t('component.languagePrompt.switch', { locale: suggestedLabel }) }}
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
