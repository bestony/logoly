import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Menu from '../components/Menu.vue'
import { trackEvent } from '../utils/analytics'
import { createTestRouter } from './test-utils'

vi.mock('../utils/analytics', () => ({ trackEvent: vi.fn() }))

describe('Menu analytics', () => {
  it('fires dropdown_click event when other menu item is selected', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(Menu, {
      global: { plugins: [router] },
    })

    const dropdownButton = wrapper.findAll('button').find((button) => button.text() === '其他')
    expect(dropdownButton).toBeTruthy()
    await dropdownButton?.trigger('click')
    await flushPromises()

    const segaButton = wrapper.findAll('button').find((button) => button.text() === 'SEGA')
    expect(segaButton).toBeTruthy()
    await segaButton?.trigger('click')
    await flushPromises()

    expect(trackEvent).toHaveBeenCalledWith('dropdown_click', {
      menu: '其他',
      label: 'SEGA',
      path: '/sega',
    })
  })
})
