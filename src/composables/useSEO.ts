import { getCurrentInstance, onMounted } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { routerKey, useRoute, useRouter } from 'vue-router'
import { APP_NAME } from '../constants/app'
import { SEO_CONTENT } from '../constants/seo'
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

  const detectLanguage = (): SupportedLanguage => {
    // Check browser language
    const browserLang =
      navigator.language || (navigator as { userLanguage?: string }).userLanguage || 'en'

    return resolveLanguage(browserLang)
  }

  const updateSEO = (lang?: SupportedLanguage | string, fullPathOverride?: string) => {
    const language = lang ?? detectLanguage()
    const content = getSeoContent(language)
    const routeMeta = (route?.meta as RouteMeta | undefined) || undefined

    const finalTitle = routeMeta?.title ? `${content.title} | ${routeMeta.title}` : content.title
    const finalDescription = routeMeta?.description || content.description
    const finalKeywords =
      (Array.isArray(routeMeta?.keywords) && routeMeta?.keywords?.join(', ')) || content.keywords

    // Update HTML lang attribute
    updateHtmlLang(content.htmlLang)

    // Update title
    updateTitle(finalTitle)

    // Update meta tags
    updateMetaTag('description', finalDescription)
    updateMetaTag('keywords', finalKeywords)
    updateMetaTag('language', content.language)

    // Update Open Graph tags
    updateMetaTag(
      'og:title',
      routeMeta?.title ? `${APP_NAME} | ${routeMeta.title}` : content.ogTitle,
      true,
    )
    updateMetaTag('og:description', finalDescription, true)
    updateMetaTag('og:locale', content.ogLocale, true)

    // Update Twitter tags
    updateMetaTag(
      'twitter:title',
      routeMeta?.title ? `${APP_NAME} | ${routeMeta.title}` : content.twitterTitle,
      true,
    )
    updateMetaTag('twitter:description', finalDescription, true)

    // Update canonical URL
    const { origin, pathname } = window.location
    const path = fullPathOverride || route?.fullPath || pathname
    updateCanonical(`${origin}${path}`)
  }

  onMounted(() => {
    updateSEO()
  })

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
