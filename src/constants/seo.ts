import type { SEOMeta, SupportedLanguage } from '../types/composables'
import { APP_NAME } from './app'

type SEOContentMap = Record<SupportedLanguage, SEOMeta>

export const SEO_CONTENT: SEOContentMap = {
  en: {
    title: `${APP_NAME} - PornHub Style Logo Generator | Free PNG & SVG Download`,
    description:
      'Free online PornHub style logo generator. Create professional logos instantly, no registration required.',
    keywords: 'logo, generator, pornhub, logo generator, online generator, free logo maker',
    ogTitle: `${APP_NAME} - PornHub Style Logo Generator | Free PNG & SVG Download`,
    ogDescription:
      'Free online PornHub style logo generator. Create professional logos instantly, no registration required.',
    twitterTitle: `${APP_NAME} - PornHub Style Logo Generator | Free PNG & SVG Download`,
    twitterDescription:
      'Free online PornHub style logo generator. Create professional logos instantly, no registration required.',
    language: 'en',
    htmlLang: 'en',
    ogLocale: 'en_US',
  },
  'zh-CN': {
    title: `${APP_NAME} - PornHub 风格 Logo 生成器 | 在线免费制作支持 PNG/SVG 导出`,
    description: '免费在线生成 PornHub 风格 Logo，支持 PNG/SVG 导出，无需注册，秒级生成。',
    keywords: 'logo, 生成器, pornhub, logo生成器, 在线生成, 免费logo制作',
    ogTitle: `${APP_NAME} - PornHub 风格 Logo 生成器 | 在线免费制作支持 PNG/SVG 导出`,
    ogDescription: '免费在线生成 PornHub 风格 Logo，支持 PNG/SVG 导出，无需注册，秒级生成。',
    twitterTitle: `${APP_NAME} - PornHub 风格 Logo 生成器 | 在线免费制作支持 PNG/SVG 导出`,
    twitterDescription: '免费在线生成 PornHub 风格 Logo，支持 PNG/SVG 导出，无需注册，秒级生成。',
    language: 'zh-CN',
    htmlLang: 'zh-CN',
    ogLocale: 'zh_CN',
  },
}
