<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
// biome-ignore lint/correctness/noUnusedVariables: used in template
const { t } = useI18n()

// biome-ignore lint/correctness/noUnusedVariables: used in template
const categories = [
  {
    title: 'component.footerMenu.categories.websites',
    items: [
      { label: 'component.menu.home', path: '/' },
      { label: 'component.menu.verticalPh', path: '/vertical-ph' },
      { label: 'component.menu.onlyfans', path: '/onlyfans' },
      { label: 'component.menu.simpleText', path: '/simpletext' },
    ],
  },
  {
    title: 'component.footerMenu.categories.brands',
    items: [
      { label: 'component.menu.fedex', path: '/fedex' },
      { label: 'component.menu.mastercard', path: '/mastercard' },
      { label: 'component.menu.bluesnap', path: '/bluesnap' },
      { label: 'component.menu.sega', path: '/sega' },
      { label: 'component.menu.nintendo', path: '/nintendo' },
      { label: 'component.menu.lego', path: '/lego' },
      { label: 'component.menu.marvel', path: '/marvel' },
      { label: 'component.menu.bravo', path: '/bravo' },
      { label: 'component.menu.amc', path: '/amc' },
    ],
  },
]

// biome-ignore lint/correctness/noUnusedVariables: used in template
const go = (path: string) => {
  router.push(path)
}
</script>

<template>
  <footer class="mt-10 bg-gray-900/40 border-t ">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 class="text-lg font-semibold text-white">
          {{ t('component.footerMenu.heading') }}
        </h2>
      </div>
      <div class="grid grid-cols-1 gap-6">
        <div
          v-for="category in categories"
          :key="category.title"
        
        >
          <h3 class="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            {{ t(category.title) }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="item in category.items"
              :key="item.path"
              type="button"
              class="px-3 py-2 text-sm rounded-md bg-gray-900 text-gray-200 hover:bg-primary/20 hover:text-primary transition-colors border border-gray-700"
              @click="go(item.path)"
            >
              {{ t(item.label) }}
            </button>
          </div>
        </div>
      </div>
      <p class="text-xs text-gray-500 text-center">
        {{ t('component.footerMenu.note') }}
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
