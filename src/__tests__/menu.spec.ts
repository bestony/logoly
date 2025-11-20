import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import Menu from '../components/Menu.vue'
import { i18n } from '../i18n'
import { createTestRouter } from './test-utils'

describe('Menu', () => {
  it('renders all navigation buttons', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })

    const labels = wrapper.findAll('button').map((button) => button.text())
    expect(labels).toEqual([
      'PornHub',
      'Vertical PH',
      'OnlyFans',
      'More',
      'About',
      'FAQ',
      'Language: 🇺🇸 English',
    ])
  })

  it('navigates using router.push when a button is clicked', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pushSpy = vi.spyOn(router, 'push')

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })

    await wrapper.find('button:nth-child(2)').trigger('click')
    await flushPromises()

    expect(pushSpy).toHaveBeenCalledWith('/vertical-ph')
  })

  it('shows other items in dropdown and navigates', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pushSpy = vi.spyOn(router, 'push')

    const wrapper = mount(Menu, {
      global: { plugins: [router, i18n, createPinia()] },
    })

    const dropdownButton = wrapper.findAll('button').find((button) => button.text() === 'More')
    expect(dropdownButton).toBeTruthy()
    await dropdownButton?.trigger('click')
    await flushPromises()

    const otherItem = wrapper.findAll('button').find((button) => button.text() === 'SEGA')
    expect(otherItem).toBeTruthy()
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

    const dropdownItems = wrapper
      .findAll('button')
      .filter((button) => otherLabels.includes(button.text()))
      .map((button) => button.text())

    expect(dropdownItems).toEqual(otherLabels)
  })
})

const otherLabels = [
  'Simple Text',
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
