import { onMounted } from 'vue'

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
    title: 'Logoly - PornHub Style Logo Generator',
    description:
      'Free online PornHub style logo generator. Create professional logos instantly, no registration required.',
    keywords: 'logo, generator, pornhub, logo generator, online generator, free logo maker',
    ogTitle: 'Logoly - PornHub Style Logo Generator',
    ogDescription:
      'Free online PornHub style logo generator. Create professional logos instantly, no registration required.',
    twitterTitle: 'Logoly - PornHub Style Logo Generator',
    twitterDescription:
      'Free online PornHub style logo generator. Create professional logos instantly, no registration required.',
    language: 'en',
    htmlLang: 'en',
    ogLocale: 'en_US',
  },
  'zh-CN': {
    title: 'Logoly - PornHub 风格 Logo 生成器',
    description: '免费在线生成 PornHub 风格的 Logo，简单易用，无需注册。',
    keywords: 'logo, 生成器, pornhub, logo生成器, 在线生成, 免费logo制作',
    ogTitle: 'Logoly - PornHub 风格 Logo 生成器',
    ogDescription: '免费在线生成 PornHub 风格的 Logo，简单易用，无需注册。',
    twitterTitle: 'Logoly - PornHub 风格 Logo 生成器',
    twitterDescription: '免费在线生成 PornHub 风格的 Logo，简单易用，无需注册。',
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

function updateHtmlLang(lang: string) {
  document.documentElement.lang = lang
}

export function useSEO() {
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

  const updateSEO = (lang?: string) => {
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
  }

  onMounted(() => {
    updateSEO()
  })

  return {
    updateSEO,
    detectLanguage,
  }
}
