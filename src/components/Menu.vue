<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in template
import { MenuButton, MenuItem, MenuItems, Menu as UiMenu } from '@headlessui/vue'
// biome-ignore lint/correctness/noUnusedImports: used in template
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { trackEvent } from '../utils/analytics'

// biome-ignore lint/correctness/noUnusedVariables: used in template
const route = useRoute()
const router = useRouter()

// biome-ignore lint/correctness/noUnusedVariables: used in template
const primaryItems = [
  { name: 'PornHub', path: '/', routeName: 'home' },
  { name: 'Vertical PH', path: '/vertical-ph', routeName: 'vertical-ph' },
  { name: 'OnlyFans', path: '/onlyfans', routeName: 'onlyfans' },
]

// biome-ignore lint/correctness/noUnusedVariables: used in template
const trailingItems = [
  { name: '关于', path: '/about', routeName: 'about' },
  { name: 'FAQ', path: '/FAQ', routeName: 'faq' },
]

// biome-ignore lint/correctness/noUnusedVariables: used in template
const otherItems = [
  { name: 'Simpletext', path: '/simpletext', routeName: 'simpletext' },
  { name: 'FedEx', path: '/fedex', routeName: 'fedex' },
  { name: 'Mastercard', path: '/mastercard', routeName: 'mastercard' },
  { name: 'Bluesnap', path: '/bluesnap', routeName: 'bluesnap' },
  { name: 'SEGA', path: '/sega', routeName: 'sega' },
  { name: 'Nintendo', path: '/nintendo', routeName: 'nintendo' },
  { name: 'Lego', path: '/lego', routeName: 'lego' },
  { name: 'Marvel', path: '/marvel', routeName: 'marvel' },
  { name: 'Bravo', path: '/bravo', routeName: 'bravo' },
  { name: 'AMC', path: '/amc', routeName: 'amc' },
]

const navigate = (path: string) => {
  router.push(path)
}

// biome-ignore lint/correctness/noUnusedVariables: used in template
const handleOtherItemClick = (item: { name: string; path: string }) => {
  trackEvent('dropdown_click', {
    menu: '其他',
    label: item.name,
    path: item.path,
  })
  navigate(item.path)
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
            v-for="item in primaryItems"
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

          <UiMenu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800"
              >
                其他
              </MenuButton>
            </div>

            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-900 border border-gray-700 shadow-lg focus:outline-none z-10"
              >
                <div class="py-1">
                  <MenuItem v-for="item in otherItems" :key="item.routeName" v-slot="{ active }">
                    <button
                      type="button"
                      :class="[
                        active ? 'bg-primary/20 text-primary' : 'text-gray-200',
                        'block w-full text-left px-4 py-2 text-sm',
                      ]"
                      @click="handleOtherItemClick(item)"
                    >
                      {{ item.name }}
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </UiMenu>

          <button
            v-for="item in trailingItems"
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
