import { defineStore } from 'pinia'
import { DEFAULT_LOCALE, i18n, type Locale } from '../i18n'

const STORAGE_KEY = 'logoly.locale'

const resolveBrowserLocale = (): Locale | null => {
  const supported = Object.keys(i18n.global.messages.value) as Locale[]
  const candidates = [
    typeof navigator !== 'undefined' ? navigator.language : null,
    typeof navigator !== 'undefined' && navigator.languages ? navigator.languages[0] : null,
  ]

  for (const raw of candidates) {
    if (!raw) {
      continue
    }
    const exact = supported.find((code) => code.toLowerCase() === raw.toLowerCase())
    if (exact) {
      return exact
    }
    const lang = raw.split('-')[0]
    if (!lang) {
      continue
    }
    const partial = supported.find((code) => code.toLowerCase().startsWith(lang.toLowerCase()))
    if (partial) {
      return partial
    }
  }
  return null
}

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: DEFAULT_LOCALE as Locale,
    initialized: false,
    promptLocale: null as Locale | null,
    promptVisible: false,
  }),
  actions: {
    init() {
      if (this.initialized) {
        return
      }

      const initial = i18n.global.locale.value as Locale
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
        if (saved && saved in i18n.global.messages.value) {
          this.applyLocale(saved)
          this.initialized = true
          return
        }
      }

      const browserLocale = resolveBrowserLocale()
      if (browserLocale && browserLocale !== initial) {
        this.promptLocale = browserLocale
        this.promptVisible = true
        this.initialized = true
        return
      }

      this.applyLocale(initial || DEFAULT_LOCALE)
      this.initialized = true
    },
    setLocale(locale: Locale) {
      this.applyLocale(locale)
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, locale)
      }
      this.promptVisible = false
    },
    keepCurrent() {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, this.locale)
      }
      this.promptVisible = false
    },
    applyLocale(locale: Locale) {
      this.locale = locale
      i18n.global.locale.value = locale
    },
  },
})
