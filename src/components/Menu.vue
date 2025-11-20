<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in template
import { RouterLink, useRoute, useRouter } from 'vue-router'

// biome-ignore lint/correctness/noUnusedVariables: used in template
const route = useRoute()
const router = useRouter()

// biome-ignore lint/correctness/noUnusedVariables: used in template
const menuItems = [
  { name: 'PornHub', path: '/', routeName: 'home' },
  { name: 'Vertical PH', path: '/vertical-ph', routeName: 'vertical-ph' },
  { name: 'OnlyFans', path: '/onlyfans', routeName: 'onlyfans' },
  { name: '关于', path: '/about', routeName: 'about' },
  { name: 'FAQ', path: '/FAQ', routeName: 'faq' },
]

// biome-ignore lint/correctness/noUnusedVariables: used in template
const navigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <nav class="w-full bg-background border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <RouterLink
            to="/"
            class="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Logoly
          </RouterLink>
        </div>
        <div class="flex items-center space-x-1">
          <button
            v-for="item in menuItems"
            :key="item.routeName"
            type="button"
            @click="navigate(item.path)"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
            :class="
              route.name === item.routeName
                ? 'bg-primary/20 text-primary'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            "
          >
            {{ item.name }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
