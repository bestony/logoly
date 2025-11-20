import { defineStore } from 'pinia'
import { DEFAULT_LOCALE, i18n, type Locale } from '../i18n'

const STORAGE_KEY = 'logoly.locale'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: DEFAULT_LOCALE as Locale,
    initialized: false,
  }),
  actions: {
    init() {
      if (this.initialized) {
        return
      }
      let initial = i18n.global.locale.value as Locale
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
        if (saved && saved in i18n.global.messages.value) {
          initial = saved
        }
      } else {
        initial = initial || DEFAULT_LOCALE
      }
      this.applyLocale(initial || DEFAULT_LOCALE)
      this.initialized = true
    },
    setLocale(locale: Locale) {
      this.applyLocale(locale)
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, locale)
      }
    },
    applyLocale(locale: Locale) {
      this.locale = locale
      i18n.global.locale.value = locale
    },
  },
})
