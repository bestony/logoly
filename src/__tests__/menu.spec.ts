import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import Menu from '../components/Menu.vue'
import { i18n } from '../i18n'
import { useLocaleStore } from '../stores/locale'
import { createTestRouter } from './test-utils'

describe('Menu', () => {
  it('renders all navigation links from route meta', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })

    const links = getLinksByText(wrapper, navLabels)
    expect(links.map((link) => link.text())).toEqual(['PornHub', 'Vertical PH', 'Simple Text', 'About', 'FAQ'])

    const buttons = wrapper.findAll('button').map((button) => button.text())
    expect(buttons.find((text) => text.includes('More'))).toBeTruthy()
    expect(buttons.find((text) => text.includes('Language'))).toBeTruthy()
  })

  it('navigates using router.push when a primary link is clicked', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pushSpy = vi.spyOn(router, 'push').mockResolvedValue('/vertical-ph' as never)

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })

    await getLinkByText(wrapper, 'Vertical PH')?.trigger('click')
    await flushPromises()

    expect(pushSpy).toHaveBeenCalledWith('/vertical-ph')
  })

  it('shows other items in dropdown and navigates', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pushSpy = vi.spyOn(router, 'push').mockResolvedValue('/sega' as never)

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })

    const dropdownButton = wrapper.findAll('button').find((button) => button.text() === 'More')
    expect(dropdownButton).toBeTruthy()
    await dropdownButton?.trigger('click')
    await flushPromises()

    const badgeLabel = i18n.global.t('component.menu.badge.building')
    expect(wrapper.findAll('span').some((span) => span.text().includes(badgeLabel))).toBe(true)

    const otherItem = getLinkByText(wrapper, 'SEGA')
    expect(otherItem?.text()).toContain('SEGA')
    await otherItem?.trigger('click')
    await flushPromises()

    expect(pushSpy).toHaveBeenCalledWith('/sega')
  })

  it('lists all secondary routes inside the dropdown', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })

    const dropdownButton = wrapper.findAll('button').find((button) => button.text() === 'More')
    await dropdownButton?.trigger('click')
    await flushPromises()

    const buildingLabel = i18n.global.t('component.menu.badge.building')
    const dropdownItems = wrapper
      .findAll('a')
      .map((button) => button.text().replace(buildingLabel, '').trim())
      .filter((text) => otherLabels.includes(text))

    expect(dropdownItems).toEqual(otherLabels)
  })

  it('omits badges for other items without badge metadata', async () => {
    const originalWidth = window.innerWidth
    const router = createTestRouter()
    router.addRoute({
      path: '/extra',
      name: 'extra',
      component: { template: '<div />' },
      meta: { nav: { labelKey: 'component.menu.about', group: 'other', order: 20 } },
    })
    await router.push('/')
    await router.isReady()

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })

    const dropdownButton = wrapper.findAll('button').find((button) => button.text() === 'More')
    await dropdownButton?.trigger('click')
    await flushPromises()

    const extraLink = wrapper.find('a[href="/extra"]')
    expect(extraLink.exists()).toBe(true)
    expect(extraLink.text()).toBe(i18n.global.t('component.menu.about'))
    expect(extraLink.text()).not.toContain(i18n.global.t('component.menu.badge.building'))

    setWindowWidth(480)
    await flushPromises()
    await wrapper.find('[data-testid="mobile-menu-toggle"]').trigger('click')
    await flushPromises()

    const mobileExtraLink = wrapper.findAll('a[href="/extra"]').at(-1)
    expect(mobileExtraLink?.findAll('span').length).toBe(1)

    setWindowWidth(originalWidth)
  })

  it('changes locale via the language dropdown', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pinia = createPinia()
    const localeStore = useLocaleStore(pinia)
    const setLocaleSpy = vi.spyOn(localeStore, 'setLocale')

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, pinia] },
    })

    const languageButton = wrapper
      .findAll('button')
      .find((button) => button.text().includes('Language'))
    expect(languageButton).toBeTruthy()
    await languageButton?.trigger('click')
    await flushPromises()

    const zhOption = wrapper.findAll('button').find((button) => button.text().includes('简体中文'))
    expect(zhOption).toBeTruthy()
    await zhOption?.trigger('click')
    await flushPromises()

    expect(setLocaleSpy).toHaveBeenCalledWith('zh-CN')
  })

  it('collapses menu on mobile and toggles items', async () => {
    const originalWidth = window.innerWidth
    setWindowWidth(480)

    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pushSpy = vi.spyOn(router, 'push').mockResolvedValue('/vertical-ph' as never)

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })
    await flushPromises()

    const toggle = wrapper.find('[data-testid="mobile-menu-toggle"]')
    expect(toggle.exists()).toBe(true)

    const hasPrimaryLinks = getLinkByText(wrapper, 'PornHub')
    expect(hasPrimaryLinks).toBeUndefined()

    await toggle.trigger('click')
    await flushPromises()

    const verticalLink = getLinkByText(wrapper, 'Vertical PH')
    expect(verticalLink).toBeTruthy()
    await verticalLink?.trigger('click')
    await flushPromises()

    expect(pushSpy).toHaveBeenCalledWith('/vertical-ph')
    expect(wrapper.find('[data-testid="mobile-menu-toggle"]').attributes('aria-expanded')).toBe(
      'false',
    )

    setWindowWidth(originalWidth)
  })

  it('closes the mobile menu when resizing to desktop and cleans up listeners', async () => {
    const originalWidth = window.innerWidth
    setWindowWidth(480)
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })
    await flushPromises()

    const toggle = wrapper.find('[data-testid="mobile-menu-toggle"]')
    await toggle.trigger('click')
    expect((wrapper.vm as { isMobileMenuOpen: boolean }).isMobileMenuOpen).toBe(true)

    setWindowWidth(1280)
    await flushPromises()

    expect((wrapper.vm as { isMobileMenuOpen: boolean }).isMobileMenuOpen).toBe(false)

    wrapper.unmount()
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function))

    addSpy.mockRestore()
    removeSpy.mockRestore()
    setWindowWidth(originalWidth)
  })

  it('supports mobile other/trailing navigation and locale change buttons', async () => {
    const originalWidth = window.innerWidth
    setWindowWidth(480)

    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pushSpy = vi.spyOn(router, 'push').mockResolvedValue('/sega' as never)
    const pinia = createPinia()
    const localeStore = useLocaleStore(pinia)
    const setLocaleSpy = vi.spyOn(localeStore, 'setLocale')

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, pinia] },
    })
    await flushPromises()

    const toggle = wrapper.find('[data-testid="mobile-menu-toggle"]')
    await toggle.trigger('click')
    await flushPromises()

    const segaLink = getLinkByText(wrapper, 'SEGA')
    expect(segaLink).toBeTruthy()
    expect(wrapper.text()).toContain(i18n.global.t('component.menu.badge.building'))
    await segaLink?.trigger('click')
    await flushPromises()
    expect(pushSpy).toHaveBeenNthCalledWith(1, '/sega')

    await toggle.trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="mobile-menu-toggle"]').attributes('aria-expanded')).toBe(
      'true',
    )
    const aboutLink = wrapper.find('[href="/about"]')
    expect(aboutLink.exists()).toBe(true)
    await aboutLink.trigger('click')
    await flushPromises()
    expect(pushSpy).toHaveBeenNthCalledWith(2, '/about')
    expect(wrapper.find('[data-testid="mobile-menu-toggle"]').attributes('aria-expanded')).toBe(
      'false',
    )

    await toggle.trigger('click')
    await flushPromises()
    const zhOption = wrapper.findAll('button').find((button) => button.text().includes('简体中文'))
    expect(zhOption).toBeTruthy()
    await zhOption?.trigger('click')
    expect(setLocaleSpy).toHaveBeenCalledWith('zh-CN')

    setWindowWidth(originalWidth)
  })

  it('highlights trailing items on mobile when the route is active', async () => {
    const originalWidth = window.innerWidth
    setWindowWidth(480)

    const router = createTestRouter()
    await router.push('/faq')
    await router.isReady()

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })
    await flushPromises()

    await wrapper.find('[data-testid="mobile-menu-toggle"]').trigger('click')
    await flushPromises()

    const faqLink = getLinkByText(wrapper, 'FAQ')
    expect(faqLink?.classes().join(' ')).toContain('border-primary')
    expect(wrapper.text()).toContain(i18n.global.t('component.menu.badge.building'))

    setWindowWidth(originalWidth)
  })

  it('handles updateIsMobile gracefully when window is unavailable', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })

    const vm = wrapper.vm as { updateIsMobile: () => void }
    const realWindow = global.window
    // @ts-expect-error simulate non-browser environment
    delete (global as Record<string, unknown>).window

    expect(() => vm.updateIsMobile()).not.toThrow()

    // @ts-expect-error restore
    global.window = realWindow
  })
})

const otherLabels = [
  'OnlyFans',
  'FedEx',
  'Mastercard',
  'Bluesnap',
  'SEGA',
  'Nintendo',
  'Lego',
  'Marvel',
  'Bravo',
  'AMC',
]

const navLabels = ['PornHub', 'Vertical PH', 'Simple Text', 'About', 'FAQ']

const setWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })
  window.dispatchEvent(new Event('resize'))
}

const getLinksByText = (wrapper: VueWrapper, texts: string[]) =>
  wrapper.findAll('a').filter((link) => texts.includes(link.text()))

const getLinkByText = (wrapper: VueWrapper, text: string) =>
  wrapper.findAll('a').find((link) => link.text().includes(text))
