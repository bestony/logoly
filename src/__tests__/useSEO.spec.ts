import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'
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
    expect(document.title).toContain('Logoly - PornHub 风格 Logo 生成器')
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'zh_CN',
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
      'Logoly - PornHub Style Logo Generator',
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
      'Free online PornHub style logo generator',
    )
    expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe(
      'en_US',
    )
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
})
