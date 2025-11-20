import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { useSEO } from '../composables/useSEO'

const clearHead = () => {
  document.head.innerHTML = ''
  document.documentElement.lang = 'en'
}

describe('useSEO', () => {
  beforeEach(() => {
    clearHead()
  })

  afterEach(() => {
    clearHead()
    vi.restoreAllMocks()
    ;(navigator as { userLanguage?: string }).userLanguage = undefined
  })

  it('detects Chinese browsers and applies zh-CN metadata on mount', async () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('zh-CN')

    const Component = defineComponent({
      setup() {
        useSEO()
        return () => null
      },
    })

    mount(Component)
    await nextTick()

    expect(document.documentElement.lang).toBe('zh-CN')
    expect(document.title).toContain(
      'Logoly - PornHub 风格 Logo 生成器 | 在线免费制作支持 PNG/SVG 导出',
    )
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'zh_CN',
    )
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${window.location.origin}/`,
    )
  })

  it('allows manual language override', async () => {
    const Component = defineComponent({
      setup() {
        const { detectLanguage, updateSEO } = useSEO()
        return { detectLanguage, updateSEO }
      },
      template: '<div />',
    })

    const wrapper = mount(Component)
    expect(wrapper.vm.detectLanguage()).toBe('en')

    wrapper.vm.updateSEO('en')
    await nextTick()

    expect(document.documentElement.lang).toBe('en')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'Free online PornHub style logo generator',
    )
    expect(document.querySelector('meta[property="twitter:title"]')?.getAttribute('content')).toBe(
      'Logoly - PornHub Style Logo Generator | Free PNG & SVG Download',
    )
  })

  it('falls back to English content for unsupported languages', async () => {
    const existingDescription = document.createElement('meta')
    existingDescription.setAttribute('name', 'description')
    existingDescription.setAttribute('content', 'stale')
    document.head.appendChild(existingDescription)

    const Component = defineComponent({
      setup() {
        const { updateSEO } = useSEO()
        return { updateSEO }
      },
      template: '<div />',
    })

    const wrapper = mount(Component)
    wrapper.vm.updateSEO('fr')
    await nextTick()

    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'Générateur de logos en ligne gratuit façon PornHub',
    )
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'fr_FR',
    )
  })

  it('applies Spanish SEO metadata when requested', async () => {
    const Component = defineComponent({
      setup() {
        const { updateSEO } = useSEO()
        return { updateSEO }
      },
      template: '<div />',
    })

    const wrapper = mount(Component)
    wrapper.vm.updateSEO('es')
    await nextTick()

    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'Generador online gratuito de logos estilo PornHub',
    )
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'es_ES',
    )
    expect(document.documentElement.lang).toBe('es')
  })

  it('applies Japanese SEO metadata when requested', async () => {
    const Component = defineComponent({
      setup() {
        const { updateSEO } = useSEO()
        return { updateSEO }
      },
      template: '<div />',
    })

    const wrapper = mount(Component)
    wrapper.vm.updateSEO('ja')
    await nextTick()

    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      '無料の PornHub 風オンラインロゴジェネレーター',
    )
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'ja_JP',
    )
    expect(document.documentElement.lang).toBe('ja')
  })

  it('falls back to English when language input is empty', async () => {
    const Component = defineComponent({
      setup() {
        const { updateSEO } = useSEO()
        return { updateSEO }
      },
      template: '<div />',
    })

    const wrapper = mount(Component)
    wrapper.vm.updateSEO('')
    await nextTick()

    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'en_US',
    )
    expect(document.documentElement.lang).toBe('en')
  })

  it('defaults to English when language code is unknown', async () => {
    const Component = defineComponent({
      setup() {
        const { updateSEO } = useSEO()
        return { updateSEO }
      },
      template: '<div />',
    })

    const wrapper = mount(Component)
    wrapper.vm.updateSEO('de')
    await nextTick()

    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'Free online PornHub style logo generator',
    )
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'en_US',
    )
    expect(document.documentElement.lang).toBe('en')
  })

  it('respects navigator.userLanguage when navigator.language is missing', async () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue(undefined as unknown as string)
    Object.defineProperty(navigator, 'userLanguage', {
      value: 'zh-TW',
      configurable: true,
    })

    const Component = defineComponent({
      setup() {
        const { detectLanguage } = useSEO()
        return { detectLanguage }
      },
      template: '<div />',
    })

    const wrapper = mount(Component)
    expect(wrapper.vm.detectLanguage()).toBe('zh-CN')
  })

  it('defaults to en when no navigator language data is available', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue(undefined as unknown as string)
    ;(navigator as { userLanguage?: string }).userLanguage = undefined

    const Component = defineComponent({
      setup() {
        const { detectLanguage } = useSEO()
        return { detectLanguage }
      },
      template: '<div />',
    })

    const wrapper = mount(Component)
    expect(wrapper.vm.detectLanguage()).toBe('en')
  })

  it('updates canonical when route changes with router present', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div>home</div>' } },
        { path: '/about', component: { template: '<div>about</div>' } },
      ],
    })

    const Component = defineComponent({
      setup() {
        useSEO()
        return {}
      },
      template: '<RouterView />',
    })

    await router.push('/')
    await router.isReady()
    mount(Component, { global: { plugins: [router] } })

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${window.location.origin}/`,
    )

    await router.push('/about')
    await flushPromises()

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      `${window.location.origin}/about`,
    )
  })
})
