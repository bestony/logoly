import { getCurrentInstance, onMounted, watch } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { routerKey, useRoute, useRouter } from 'vue-router'
import { APP_NAME } from '../constants/app'
import { SEO_CONTENT } from '../constants/seo'
import { i18n } from '../i18n'
import type { RouteMeta, SEOMeta, SupportedLanguage, UseSEOResult } from '../types/composables'

const resolveLanguage = (language?: string): SupportedLanguage => {
  if (!language) {
    return 'en'
  }

  const lower = language.toLowerCase()

  if (lower.startsWith('zh')) {
    return 'zh-CN'
  }
  if (lower.startsWith('es')) {
    return 'es'
  }
  if (lower.startsWith('fr')) {
    return 'fr'
  }
  if (lower.startsWith('ja')) {
    return 'ja'
  }

  return 'en'
}

const getSeoContent = (language?: string): SEOMeta => {
  const key = resolveLanguage(language)
  return SEO_CONTENT[key]
}

const normalizeKeywords = (keywords?: string | string[]): string | undefined => {
  if (!keywords) {
    return undefined
  }

  if (Array.isArray(keywords)) {
    return keywords.join(', ')
  }

  return keywords
}

function updateMetaTag(name: string, content: string, isProperty = false) {
  const attribute = isProperty ? 'property' : 'name'
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }

  meta.setAttribute('content', content)
}

function updateTitle(title: string) {
  document.title = title
  updateMetaTag('title', title)
}

function updateCanonical(url: string) {
  let link = document.querySelector(`link[rel="canonical"]`) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

function updateHtmlLang(lang: string) {
  document.documentElement.lang = lang
}

export function useSEO() {
  let route: RouteLocationNormalizedLoaded | null = null
  let routerInstance: Router | undefined

  const appInstance = getCurrentInstance()
  const hasRouter = !!appInstance?.appContext.provides[routerKey as symbol]

  if (hasRouter) {
    route = useRoute()
    routerInstance = useRouter()
  }

  const detectBrowserLanguage = (): SupportedLanguage => {
    const browserLang =
      navigator.language || (navigator as { userLanguage?: string }).userLanguage || 'en'

    return resolveLanguage(browserLang)
  }

  const detectLanguage = (): SupportedLanguage => {
    const currentLocale = i18n.global.locale.value
    if (currentLocale) {
      return resolveLanguage(currentLocale)
    }

    return detectBrowserLanguage()
  }

  const getLocalizedRouteMeta = (): { title?: string; description?: string; keywords?: string } => {
    const routeName = route?.name?.toString()
    if (!routeName) {
      return {}
    }

    const baseKey = `seo.${routeName}`
    const { te, t } = i18n.global

    const title = te(`${baseKey}.title`) ? (t(`${baseKey}.title`) as string) : undefined
    const description = te(`${baseKey}.description`)
      ? (t(`${baseKey}.description`) as string)
      : undefined
    const keywordsValue = te(`${baseKey}.keywords`)
      ? (t(`${baseKey}.keywords`) as string | string[])
      : undefined

    return {
      title,
      description,
      keywords: normalizeKeywords(keywordsValue),
    }
  }

  const updateSEO = (lang?: SupportedLanguage | string, fullPathOverride?: string) => {
    const language = lang ?? detectLanguage()
    const content = getSeoContent(language)
    const routeMeta = (route?.meta as RouteMeta | undefined) || undefined
    const localizedRouteMeta = getLocalizedRouteMeta()

    const routeTitle = localizedRouteMeta.title ?? routeMeta?.title
    const routeDescription = localizedRouteMeta.description ?? routeMeta?.description
    const routeKeywords = localizedRouteMeta.keywords ?? normalizeKeywords(routeMeta?.keywords)

    const finalTitle = routeTitle ? `${content.title} | ${routeTitle}` : content.title
    const finalDescription = routeDescription || content.description
    const finalKeywords = routeKeywords || content.keywords

    updateHtmlLang(content.htmlLang)
    updateTitle(finalTitle)

    updateMetaTag('description', finalDescription)
    updateMetaTag('keywords', finalKeywords)
    updateMetaTag('language', content.language)

    updateMetaTag(
      'og:title',
      routeTitle ? `${APP_NAME} | ${routeTitle}` : content.ogTitle,
      true,
    )
    updateMetaTag('og:description', finalDescription, true)
    updateMetaTag('og:locale', content.ogLocale, true)

    updateMetaTag(
      'twitter:title',
      routeTitle ? `${APP_NAME} | ${routeTitle}` : content.twitterTitle,
      true,
    )
    updateMetaTag('twitter:description', finalDescription, true)

    const { origin, pathname } = window.location
    const path = fullPathOverride || route?.fullPath || pathname
    updateCanonical(`${origin}${path}`)
  }

  onMounted(() => {
    updateSEO()
  })

  watch(
    () => i18n.global.locale.value,
    (locale) => {
      updateSEO(locale as SupportedLanguage)
    },
  )

  if (routerInstance) {
    routerInstance.afterEach((to) => {
      updateSEO(undefined, to.fullPath)
    })
  }

  const composableApi: UseSEOResult = {
    updateSEO,
    detectLanguage,
  }

  return composableApi
}
