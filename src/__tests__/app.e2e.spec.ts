import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'
import App from '../App.vue'
import { i18n } from '../i18n'
import { createTestRouter } from './test-utils'

describe('App navigation (e2e-like)', () => {
  it('renders the current route view and updates after navigation', async () => {
    const router = createTestRouter()
    const pushSpy = vi.spyOn(router, 'push')
    await router.push('/')
    await router.isReady()

    const resizeObserverMock: typeof ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
    ;(globalThis as typeof globalThis & { resizeObserver: typeof ResizeObserver }).ResizeObserver =
      resizeObserverMock

    // prefer Chinese locale to match snapshot text
    i18n.global.locale.value = 'zh-CN'

    const wrapper = mount(App, {
      global: {
        plugins: [router, i18n, createPinia()],
      },
    })

    expect(wrapper.text()).toContain('首页')

    const aboutButton = wrapper
      .findAll('button')
      .find((button) => button.text().includes('关于') || button.text().includes('About'))
    expect(aboutButton).toBeTruthy()
    await aboutButton?.trigger('click')
    await flushPromises()
    await pushSpy.mock.results.at(-1)?.value
    await flushPromises()

    expect(pushSpy).toHaveBeenLastCalledWith('/about')

    expect(router.currentRoute.value.name).toBe('about')
    expect(wrapper.text()).toContain('关于我们')
  })
})
