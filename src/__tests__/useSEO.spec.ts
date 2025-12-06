import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { i18n } from '../i18n'
import { useSEO } from '../composables/useSEO'

const clearHead = () => {
  document.head.innerHTML = ''
  document.documentElement.lang = 'en'
}

describe('useSEO', () => {
  beforeEach(() => {
    clearHead()
    i18n.global.locale.value = 'en'
  })

  afterEach(() => {
    clearHead()
    i18n.global.locale.value = 'en'
    vi.restoreAllMocks()
    ;(navigator as { userLanguage?: string }).userLanguage = undefined
  })

  it('applies current i18n locale on mount and updates when locale changes', async () => {
    i18n.global.locale.value = 'en'

    const Component = defineComponent({
      setup() {
        useSEO()
        return () => null
      },
    })

    mount(Component)
    await nextTick()

    expect(document.documentElement.lang).toBe('en')
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'en_US',
    )

    i18n.global.locale.value = 'zh-CN'
    await flushPromises()

    expect(document.documentElement.lang).toBe('zh-CN')
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'zh_CN',
    )
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      '免费在线生成 PornHub 风格 Logo',
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

  it('prefers localized route SEO text over static route meta', async () => {
    i18n.global.locale.value = 'es'

    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/about',
          name: 'about',
          component: { template: '<div>about</div>' },
          meta: { title: 'About', description: 'English only description' },
        },
      ],
    })

    const Component = defineComponent({
      setup() {
        useSEO()
        return {}
      },
      template: '<RouterView />',
    })

    await router.push('/about')
    await router.isReady()

    mount(Component, { global: { plugins: [router] } })
    await flushPromises()

    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'Descubre cómo Logoly renderiza wordmarks',
    )
    expect(document.title).toContain('Sobre Logoly')
    expect(document.querySelector('meta[name="keywords"]')?.getAttribute('content')).toContain(
      'creador de logos gratis',
    )
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

  it('falls back to English when language code is unknown', async () => {
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

  it('detects the current i18n locale before checking browser language', () => {
    i18n.global.locale.value = 'fr'

    const Component = defineComponent({
      setup() {
        const { detectLanguage } = useSEO()
        return { detectLanguage }
      },
      template: '<div />',
    })

    const wrapper = mount(Component)
    expect(wrapper.vm.detectLanguage()).toBe('fr')
  })

  it('falls back to browser locale when i18n locale is empty', () => {
    i18n.global.locale.value = '' as unknown as typeof i18n.global.locale.value
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('zh-TW')
    ;(navigator as { userLanguage?: string }).userLanguage = 'zh-TW'

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
