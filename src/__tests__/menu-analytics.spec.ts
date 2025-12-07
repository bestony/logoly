import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import Menu from '../components/Menu.vue'
import { i18n } from '../i18n'
import { trackEvent } from '../utils/analytics'
import { createTestRouter } from './test-utils'

vi.mock('../utils/analytics', () => ({ trackEvent: vi.fn() }))

describe('Menu analytics', () => {
  it('fires dropdown_click event when other menu item is selected', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    vi.spyOn(router, 'push').mockResolvedValue('/sega' as never)

    expect(vi.isMockFunction(trackEvent)).toBe(true)

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })

    const dropdownButton = wrapper.findAll('button').find((button) => button.text() === 'More')
    expect(dropdownButton).toBeTruthy()
    await dropdownButton?.trigger('click')
    await flushPromises()

    const segaLink = wrapper.findAll('a').find((link) => link.text().includes('SEGA'))
    expect(segaLink).toBeTruthy()
    await segaLink?.trigger('click')
    await flushPromises()

    expect(router.push).toHaveBeenCalledWith('/sega')
    expect(trackEvent).toHaveBeenCalledWith('dropdown_click', {
      menu: 'component.menu.other',
      label: 'component.menu.sega',
      path: '/sega',
    })
  })
})
