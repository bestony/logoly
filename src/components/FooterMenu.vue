<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// biome-ignore lint/correctness/noUnusedVariables: used in template
const categories = [
  {
    title: '网站',
    items: [
      { name: 'PornHub', path: '/' },
      { name: 'Vertical PH', path: '/vertical-ph' },
      { name: 'OnlyFans', path: '/onlyfans' },
      { name: 'Simpletext', path: '/simpletext' },
    ],
  },
  {
    title: '品牌',
    items: [
      { name: 'FedEx', path: '/fedex' },
      { name: 'Mastercard', path: '/mastercard' },
      { name: 'Bluesnap', path: '/bluesnap' },
      { name: 'SEGA', path: '/sega' },
      { name: 'Nintendo', path: '/nintendo' },
      { name: 'Lego', path: '/lego' },
      { name: 'Marvel', path: '/marvel' },
      { name: 'Bravo', path: '/bravo' },
      { name: 'AMC', path: '/amc' },
    ],
  },
]

// biome-ignore lint/correctness/noUnusedVariables: used in template
const go = (path: string) => {
  router.push(path)
}
</script>

<template>
  <footer class="mt-10 bg-gray-900/80 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 class="text-lg font-semibold text-white">快速切换 Logo 模板</h2>
        <p class="text-sm text-gray-400">按大类分组，便于在底部快速切换</p>
      </div>
      <div class="grid grid-cols-1 gap-6">
        <div
          v-for="category in categories"
          :key="category.title"
          class="bg-gray-800/70 rounded-lg p-4 shadow-inner border border-gray-700"
        >
          <h3 class="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            {{ category.title }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="item in category.items"
              :key="item.path"
              type="button"
              class="px-3 py-2 text-sm rounded-md bg-gray-900 text-gray-200 hover:bg-primary/20 hover:text-primary transition-colors border border-gray-700"
              @click="go(item.path)"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>
      <p class="text-xs text-gray-500 text-center">底部菜单：按站点 / 品牌分类快速跳转</p>
    </div>
  </footer>
</template>

<style scoped></style>
