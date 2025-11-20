import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { i18n } from '../i18n'
import { useLocaleStore } from '../stores/locale'

const STORAGE_KEY = 'logoly.locale'

beforeEach(() => {
  setActivePinia(createPinia())
  i18n.global.locale.value = 'en'
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  localStorage.clear()
})

describe('locale store', () => {
  it('exits early when already initialized', () => {
    const store = useLocaleStore()
    store.initialized = true
    const spy = vi.spyOn(store, 'applyLocale')

    store.init()

    expect(spy).not.toHaveBeenCalled()
  })

  it('applies saved locale from storage', () => {
    localStorage.setItem(STORAGE_KEY, 'zh-CN')
    const store = useLocaleStore()
    const spy = vi.spyOn(store, 'applyLocale')

    store.init()

    expect(spy).toHaveBeenCalledWith('zh-CN')
    expect(store.initialized).toBe(true)
    expect(store.promptVisible).toBe(false)
  })

  it('prompts when browser locale differs from initial', () => {
    const store = useLocaleStore()
    vi.stubGlobal('navigator', { language: 'zh-CN', languages: ['zh-CN', 'en-US'] })

    store.init()

    expect(store.promptLocale).toBe('zh-CN')
    expect(store.promptVisible).toBe(true)
    expect(store.initialized).toBe(true)
  })

  it('detects partial language match from navigator', () => {
    const store = useLocaleStore()
    vi.stubGlobal('navigator', { language: 'zh-TW', languages: ['zh-TW', 'en-US'] })

    store.init()

    expect(store.promptLocale).toBe('zh-CN')
    expect(store.promptVisible).toBe(true)
  })

  it('falls back to default locale when navigator is unavailable', () => {
    const store = useLocaleStore()
    vi.stubGlobal('navigator', undefined as unknown as Navigator)

    store.init()

    expect(store.locale).toBe('en')
    expect(store.promptVisible).toBe(false)
  })

  it('ignores empty language codes safely', () => {
    const store = useLocaleStore()
    vi.stubGlobal('navigator', { language: '-', languages: ['-'] })

    store.init()

    expect(store.locale).toBe('en')
    expect(store.promptVisible).toBe(false)
  })

  it('applies default locale when initial value is empty', () => {
    vi.stubGlobal('navigator', undefined as unknown as Navigator)
    i18n.global.locale.value = '' as never
    const store = useLocaleStore()
    const spy = vi.spyOn(store, 'applyLocale')

    store.init()

    expect(spy).toHaveBeenCalledWith('en')
    expect(store.locale).toBe('en')
    expect(store.promptVisible).toBe(false)
  })

  it('sets locale and persists selection', () => {
    const store = useLocaleStore()
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem')

    store.setLocale('zh-CN')

    expect(store.locale).toBe('zh-CN')
    expect(i18n.global.locale.value).toBe('zh-CN')
    expect(store.promptVisible).toBe(false)
    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEY, 'zh-CN')
  })

  it('keeps current locale and hides prompt', () => {
    const store = useLocaleStore()
    store.locale = 'en'
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem')

    store.keepCurrent()

    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEY, 'en')
    expect(store.promptVisible).toBe(false)
  })
})
