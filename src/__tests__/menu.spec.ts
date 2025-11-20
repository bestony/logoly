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
    expect(labels).toEqual(['PornHub', 'Vertical PH', 'OnlyFans', '关于', 'FAQ'])
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
})
