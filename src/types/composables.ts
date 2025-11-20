/* c8 ignore file */

export type SupportedLanguage = 'en' | 'zh-CN'

export interface SEOMeta {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  twitterTitle: string
  twitterDescription: string
  language: string
  htmlLang: string
  ogLocale: string
}

export interface UseSEOResult {
  updateSEO: (lang?: SupportedLanguage | string, fullPathOverride?: string) => void
  detectLanguage: () => SupportedLanguage
}

export type RouteMeta = {
  title: string
  description?: string
  keywords?: string[]
}
