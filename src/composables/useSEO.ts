import { getCurrentInstance, onMounted } from 'vue'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { routerKey, useRoute, useRouter } from 'vue-router'

interface SEOMeta {
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

const seoContent: Record<string, SEOMeta> = {
  en: {
    title: 'Logoly - PornHub Style Logo Generator | Free PNG & SVG Download',
    description:
      'Free online PornHub style logo generator. Create professional logos instantly, no registration required.',
    keywords: 'logo, generator, pornhub, logo generator, online generator, free logo maker',
    ogTitle: 'Logoly - PornHub Style Logo Generator | Free PNG & SVG Download',
    ogDescription:
      'Free online PornHub style logo generator. Create professional logos instantly, no registration required.',
    twitterTitle: 'Logoly - PornHub Style Logo Generator | Free PNG & SVG Download',
    twitterDescription:
      'Free online PornHub style logo generator. Create professional logos instantly, no registration required.',
    language: 'en',
    htmlLang: 'en',
    ogLocale: 'en_US',
  },
  'zh-CN': {
    title: 'Logoly - PornHub 风格 Logo 生成器 | 在线免费制作支持 PNG/SVG 导出',
    description: '免费在线生成 PornHub 风格 Logo，支持 PNG/SVG 导出，无需注册，秒级生成。',
    keywords: 'logo, 生成器, pornhub, logo生成器, 在线生成, 免费logo制作',
    ogTitle: 'Logoly - PornHub 风格 Logo 生成器 | 在线免费制作支持 PNG/SVG 导出',
    ogDescription: '免费在线生成 PornHub 风格 Logo，支持 PNG/SVG 导出，无需注册，秒级生成。',
    twitterTitle: 'Logoly - PornHub 风格 Logo 生成器 | 在线免费制作支持 PNG/SVG 导出',
    twitterDescription: '免费在线生成 PornHub 风格 Logo，支持 PNG/SVG 导出，无需注册，秒级生成。',
    language: 'zh-CN',
    htmlLang: 'zh-CN',
    ogLocale: 'zh_CN',
  },
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

  const detectLanguage = (): string => {
    // Check browser language
    const browserLang =
      navigator.language || (navigator as { userLanguage?: string }).userLanguage || 'en'

    // Check if it's Chinese (simplified or traditional)
    if (browserLang.startsWith('zh')) {
      return 'zh-CN'
    }

    // Default to English
    return 'en'
  }

  const updateSEO = (lang?: string, fullPathOverride?: string) => {
    const language = lang || detectLanguage()
    const content = seoContent[language] || seoContent.en

    // Update HTML lang attribute
    updateHtmlLang(content.htmlLang)

    // Update title
    updateTitle(content.title)

    // Update meta tags
    updateMetaTag('description', content.description)
    updateMetaTag('keywords', content.keywords)
    updateMetaTag('language', content.language)

    // Update Open Graph tags
    updateMetaTag('og:title', content.ogTitle, true)
    updateMetaTag('og:description', content.ogDescription, true)
    updateMetaTag('og:locale', content.ogLocale, true)

    // Update Twitter tags
    updateMetaTag('twitter:title', content.twitterTitle, true)
    updateMetaTag('twitter:description', content.twitterDescription, true)

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

  return {
    updateSEO,
    detectLanguage,
  }
}
