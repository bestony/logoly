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
  es: {
    title: `${APP_NAME} - Generador estilo PornHub | Descarga PNG y SVG gratis`,
    description:
      'Generador online gratuito de logos estilo PornHub. Crea logos profesionales al instante, sin registro.',
    keywords:
      'logo, generador, pornhub, generador de logo, generador online, creador de logos gratis',
    ogTitle: `${APP_NAME} - Generador estilo PornHub | Descarga PNG y SVG gratis`,
    ogDescription:
      'Generador online gratuito de logos estilo PornHub. Crea logos profesionales al instante, sin registro.',
    twitterTitle: `${APP_NAME} - Generador estilo PornHub | Descarga PNG y SVG gratis`,
    twitterDescription:
      'Generador online gratuito de logos estilo PornHub. Crea logos profesionales al instante, sin registro.',
    language: 'es',
    htmlLang: 'es',
    ogLocale: 'es_ES',
  },
  fr: {
    title: `${APP_NAME} - Générateur de logo style PornHub | PNG et SVG gratuits`,
    description:
      'Générateur de logos en ligne gratuit façon PornHub. Créez des logos pros en un instant, sans inscription.',
    keywords:
      'logo, générateur, pornhub, générateur de logo, générateur en ligne, créateur de logo gratuit',
    ogTitle: `${APP_NAME} - Générateur de logo style PornHub | PNG et SVG gratuits`,
    ogDescription:
      'Générateur de logos en ligne gratuit façon PornHub. Créez des logos pros en un instant, sans inscription.',
    twitterTitle: `${APP_NAME} - Générateur de logo style PornHub | PNG et SVG gratuits`,
    twitterDescription:
      'Générateur de logos en ligne gratuit façon PornHub. Créez des logos pros en un instant, sans inscription.',
    language: 'fr',
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
  },
  ja: {
    title: `${APP_NAME} - PornHub 風ロゴジェネレーター | 無料で PNG・SVG をダウンロード`,
    description:
      '無料の PornHub 風オンラインロゴジェネレーター。登録不要ですぐにプロ風ロゴを作成できます。',
    keywords: 'ロゴ, ジェネレーター, pornhub, ロゴジェネレーター, オンライン生成, ロゴ無料作成',
    ogTitle: `${APP_NAME} - PornHub 風ロゴジェネレーター | 無料で PNG・SVG をダウンロード`,
    ogDescription:
      '無料の PornHub 風オンラインロゴジェネレーター。登録不要ですぐにプロ風ロゴを作成できます。',
    twitterTitle: `${APP_NAME} - PornHub 風ロゴジェネレーター | 無料で PNG・SVG をダウンロード`,
    twitterDescription:
      '無料の PornHub 風オンラインロゴジェネレーター。登録不要ですぐにプロ風ロゴを作成できます。',
    language: 'ja',
    htmlLang: 'ja',
    ogLocale: 'ja_JP',
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
