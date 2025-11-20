import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from '../App.vue'
import { createTestRouter } from './test-utils'

describe('App navigation (e2e-like)', () => {
  it('renders the current route view and updates after navigation', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('首页')

    const aboutButton = wrapper.findAll('button').find((button) => button.text() === '关于')
    expect(aboutButton).toBeTruthy()
    await aboutButton?.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.name).toBe('about')
    expect(wrapper.text()).toContain('关于我们')
  })
})
