import { createI18n } from 'vue-i18n'
import en from './locales/en'
import es from './locales/es'
import fr from './locales/fr'
import ja from './locales/ja'
import zhCN from './locales/zh-CN'

export const DEFAULT_LOCALE = 'en'
export const FALLBACK_LOCALE = 'en'

const messages = {
  en,
  es,
  fr,
  ja,
  'zh-CN': zhCN,
}

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages,
})

export type Locale = keyof typeof messages
