import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import ErrorBoundary from '../components/ErrorBoundary.vue'
import { i18n } from '../i18n'

const createTestRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
      { path: '/:slug(.*)*', name: 'wildcard', component: { template: '<div>Any</div>' } },
    ],
  })

const FaultyComponent = defineComponent({
  name: 'FaultyOnce',
  data: () => ({ threw: false }),
  render() {
    if (!this.threw) {
      this.threw = true
      throw new Error('render failed')
    }
    return h('div', 'Recovered content')
  },
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('ErrorBoundary', () => {
  it('captures errors, copies debug info, trims history, and allows retry', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()
    const showHealthy = ref(false)

    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    const wrapper = mount(ErrorBoundary, {
      global: { plugins: [router, i18n, createPinia()] },
      slots: {
        default: () => (showHealthy.value ? h('div', 'Recovered content') : h(FaultyComponent)),
      },
    })

    await flushPromises()
    expect(wrapper.text()).toContain('Something went wrong')
    expect(wrapper.text()).toContain('render failed')

    // navigate multiple times to trigger history pruning
    for (let i = 0; i < 11; i += 1) {
      await router.push(`/page-${i}`)
    }
    await flushPromises()

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    const copyButton = buttons[0]!
    const retryButton = buttons[1]!
    await copyButton.trigger('click')
    await flushPromises()

    expect(writeText).toHaveBeenCalledTimes(1)
    const copied = writeText.mock.calls[0]?.[0] as string
    expect(copied).toContain('Error Route: /')
    const historyMatch = copied.match(/History: (.*)\nError:/)
    const historyParts = historyMatch?.[1]?.split('->') ?? []
    expect(historyParts.length).toBeLessThanOrEqual(10)

    showHealthy.value = true
    await retryButton.trigger('click')
    await flushPromises()
    await nextTick()

    expect(wrapper.text()).toContain('Recovered content')
    expect(wrapper.text()).not.toContain('Something went wrong')
  })
})
