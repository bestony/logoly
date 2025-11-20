import { describe, expect, it } from 'vitest'
import type { RouteRecordRaw } from 'vue-router'
import router, { routes } from '../router'

describe('router configuration', () => {
  it('exposes a unique name for every route', () => {
    const names = routes.map((route: RouteRecordRaw) => route.name)
    const uniqueNames = new Set(names)
    expect(uniqueNames.size).toBe(names.length)
  })

  it('includes the expected key paths', () => {
    const paths = routes.map((route: RouteRecordRaw) => route.path)
    expect(paths).toContain('/')
    expect(paths).toContain('/vertical-ph')
    expect(paths).toContain('/onlyfans')
    expect(paths).toContain('/faq')
  })

  it('matches router instance options', () => {
    expect(router.options.routes.length).toBe(routes.length)
    expect(router.options.routes[0]?.path).toBe('/')
  })

  it('loads every lazy route component without throwing', async () => {
    const loaders = routes
      .map((route: RouteRecordRaw) => route.component)
      .filter((component): component is () => Promise<unknown> => typeof component === 'function')

    const modules = await Promise.all(loaders.map((loader) => loader()))

    modules.forEach((mod) => {
      const hasDefaultExport =
        typeof mod === 'object' && mod !== null && 'default' in (mod as Record<string, unknown>)
      expect(hasDefaultExport).toBe(true)
    })
  })
})
