<script setup lang="ts">
// biome-ignore lint/correctness/noUnusedImports: used in template
import { MenuButton, MenuItem, MenuItems, Menu as UiMenu } from '@headlessui/vue'
import { useI18n } from 'vue-i18n'
// biome-ignore lint/correctness/noUnusedImports: used in template
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { trackEvent } from '../utils/analytics'

// biome-ignore lint/correctness/noUnusedVariables: used in template
const route = useRoute()
const router = useRouter()
// biome-ignore lint/correctness/noUnusedVariables: used in template
const { t, locale } = useI18n()

// biome-ignore lint/correctness/noUnusedVariables: used in template
const primaryItems = [
  { name: 'component.menu.home', path: '/', routeName: 'home' },
  { name: 'component.menu.verticalPh', path: '/vertical-ph', routeName: 'vertical-ph' },
  { name: 'component.menu.onlyfans', path: '/onlyfans', routeName: 'onlyfans' },
]

// biome-ignore lint/correctness/noUnusedVariables: used in template
const trailingItems = [
  { name: 'component.menu.about', path: '/about', routeName: 'about' },
  { name: 'component.menu.faq', path: '/faq', routeName: 'faq' },
]

// biome-ignore lint/correctness/noUnusedVariables: used in template
const languageOptions = [
  { code: 'en', label: 'component.menu.lang.en' },
  { code: 'zh-CN', label: 'component.menu.lang.zh-CN' },
]

// biome-ignore lint/correctness/noUnusedVariables: used in template
const otherItems = [
  { name: 'component.menu.simpleText', path: '/simpletext', routeName: 'simpletext' },
  { name: 'component.menu.fedex', path: '/fedex', routeName: 'fedex' },
  { name: 'component.menu.mastercard', path: '/mastercard', routeName: 'mastercard' },
  { name: 'component.menu.bluesnap', path: '/bluesnap', routeName: 'bluesnap' },
  { name: 'component.menu.sega', path: '/sega', routeName: 'sega' },
  { name: 'component.menu.nintendo', path: '/nintendo', routeName: 'nintendo' },
  { name: 'component.menu.lego', path: '/lego', routeName: 'lego' },
  { name: 'component.menu.marvel', path: '/marvel', routeName: 'marvel' },
  { name: 'component.menu.bravo', path: '/bravo', routeName: 'bravo' },
  { name: 'component.menu.amc', path: '/amc', routeName: 'amc' },
]

const navigate = async (path: string) => {
  await router.push(path)
}

// biome-ignore lint/correctness/noUnusedVariables: used in template
const handleOtherItemClick = (item: { name: string; path: string }) => {
  trackEvent('dropdown_click', {
    menu: 'component.menu.other',
    label: item.name,
    path: item.path,
  })
  navigate(item.path)
}

// biome-ignore lint/correctness/noUnusedVariables: used in template
const handleLocaleChange = (code: string) => {
  locale.value = code
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
            {{ t(item.name) }}
          </button>

          <UiMenu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800"
              >
                {{ t('component.menu.other') }}
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
                      {{ t(item.name) }}
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
            {{ t(item.name) }}
          </button>

          <UiMenu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800"
              >
              <div class="i-mingcute-translate-line"/> {{ t('component.menu.language') }}
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
                class="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-gray-900 border border-gray-700 shadow-lg focus:outline-none z-10"
              >
                <div class="py-1">
                  <MenuItem
                    v-for="option in languageOptions"
                    :key="option.code"
                    v-slot="{ active }"
                  >
                    <button
                      type="button"
                      :class="[
                        active ? 'bg-primary/20 text-primary' : 'text-gray-200',
                        'block w-full text-left px-4 py-2 text-sm',
                      ]"
                      @click="handleLocaleChange(option.code)"
                    >
                      {{ t(option.label) }}
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </UiMenu>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
