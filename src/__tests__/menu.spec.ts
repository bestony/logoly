import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Menu from '../components/Menu.vue'
import { createTestRouter } from './test-utils'

describe('Menu', () => {
  it('renders all navigation buttons', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(Menu, {
      global: { plugins: [router] },
    })

    const labels = wrapper.findAll('button').map((button) => button.text())
    expect(labels).toEqual(['PornHub', 'Vertical PH', 'OnlyFans', '其他', '关于', 'FAQ'])
  })

  it('navigates using router.push when a button is clicked', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const pushSpy = vi.spyOn(router, 'push')

    const wrapper = mount(Menu, {
      global: { plugins: [router] },
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
      global: { plugins: [router] },
    })

    const dropdownButton = wrapper.findAll('button').find((button) => button.text() === '其他')
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
      global: { plugins: [router] },
    })

    const dropdownButton = wrapper.findAll('button').find((button) => button.text() === '其他')
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
