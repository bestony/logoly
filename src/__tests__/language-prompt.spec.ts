import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import LanguagePrompt from '../components/LanguagePrompt.vue'
import { i18n } from '../i18n'
import { useLocaleStore } from '../stores/locale'

const setup = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  const store = useLocaleStore()
  const wrapper = mount(LanguagePrompt, {
    global: { plugins: [pinia, i18n] },
  })
  return { wrapper, store }
}

beforeEach(() => {
  const resizeObserverMock: typeof ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
  // biome-ignore lint/style/useNamingConvention: DOM global name
  ;(globalThis as typeof globalThis & { ResizeObserver: typeof ResizeObserver }).ResizeObserver =
    resizeObserverMock
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  localStorage.clear()
  document.body.innerHTML = ''
})

describe('LanguagePrompt', () => {
  it('switches to suggested locale when provided', async () => {
    const { wrapper, store } = setup()
    store.promptVisible = true
    store.promptLocale = 'zh-CN'
    await flushPromises()
    await nextTick()

    expect(document.body.textContent).toContain('Switch to 简体中文')

    const vm = wrapper.vm as unknown as { switchToSuggested: () => void }
    vm.switchToSuggested()
    await flushPromises()
    await nextTick()

    expect(store.locale).toBe('zh-CN')
    expect(store.promptVisible).toBe(false)
  })

  it('keeps current locale when user declines suggestion', async () => {
    const { wrapper, store } = setup()
    store.locale = 'en'
    store.promptVisible = true
    store.promptLocale = null
    await flushPromises()
    await nextTick()

    const vm = wrapper.vm as unknown as { stayCurrent: () => void }
    vm.stayCurrent()
    await flushPromises()
    await nextTick()

    expect(store.locale).toBe('en')
    expect(store.promptVisible).toBe(false)
  })
})
