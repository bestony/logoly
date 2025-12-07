import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { routes } from '../router'
import { useNavigationItems } from '../composables/useNavigationItems'

const runComposable = async (router = createRouter({ history: createMemoryHistory(), routes })) => {
  let api: ReturnType<typeof useNavigationItems>

  const Harness = defineComponent({
    setup() {
      api = useNavigationItems()
      return () => null
    },
  })

  mount(Harness, {
    global: {
      plugins: [router],
    },
  })

  await router.push('/')
  await router.isReady()

  return api!
}

describe('useNavigationItems', () => {
  it('groups navigation items by meta and sorts by provided order', async () => {
    const api = await runComposable()

    expect(api.primaryItems.value.map((item) => item.routeName)).toEqual([
      'home',
      'vertical-ph',
      'simpletext',
    ])
    expect(api.trailingItems.value.map((item) => item.routeName)).toEqual(['about', 'faq'])
    expect(api.otherItems.value.length).toBeGreaterThan(0)
    expect(api.otherItems.value[0].order).toBe(1)
  })

  it('ignores routes without nav meta or with unsupported groups', async () => {
    const router = createRouter({ history: createMemoryHistory(), routes })
    router.addRoute({ path: '/ghost', name: 'ghost', component: { render: () => null } })
    router.addRoute({
      path: '/invalid',
      name: 'invalid',
      component: { render: () => null },
      meta: { nav: { group: 'unknown', labelKey: 'invalid', order: 1 } },
    })
    router.addRoute({
      path: '/nameless',
      component: { render: () => null },
      meta: { nav: { group: 'other', labelKey: 'component.menu.faq' } },
    })

    const api = await runComposable(router)

    expect(api.otherItems.value.find((item) => item.routeName === 'invalid')).toBeUndefined()
    expect(api.otherItems.value.find((item) => item.routeName === 'ghost')).toBeUndefined()
    expect(api.otherItems.value.find((item) => item.path === '/nameless')).toBeUndefined()
  })

  it('assigns a default order when nav meta omits the value', async () => {
    const router = createRouter({ history: createMemoryHistory(), routes })
    router.addRoute({
      path: '/no-order',
      name: 'no-order',
      component: { render: () => null },
      meta: { nav: { group: 'other', labelKey: 'no.order.label' } },
    })

    const api = await runComposable(router)
    const appended = api.otherItems.value.find((item) => item.routeName === 'no-order')

    expect(appended?.order).toBe(99)
  })
})
