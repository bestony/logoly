import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.resetModules()
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('routes loader', () => {
  it('throws helpful error when a view is missing in dev', async () => {
    vi.stubEnv('DEV', true)
    vi.doMock('../router/modules/pages', () => ({
      pageRoutes: [{ path: '/ghost', name: 'ghost', view: 'Ghost', meta: { title: 'Ghost' } }],
    }))
    vi.doMock('../router/modules/brands', () => ({ brandRoutes: [] }))

    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    await expect(import('../router/routes')).rejects.toThrow(
      '[router] View component "Ghost.vue" is missing in src/views (path: /ghost, name: ghost)',
    )

    expect(consoleError).toHaveBeenCalledWith(
      '[router] View component "Ghost.vue" is missing in src/views (path: /ghost, name: ghost)',
    )

    vi.doUnmock('../router/modules/pages')
    vi.doUnmock('../router/modules/brands')
  })

  it('maps view loaders when files exist', async () => {
    vi.doUnmock('../router/modules/pages')
    vi.doUnmock('../router/modules/brands')
    vi.resetModules()

    const { routes } = await import('../router/routes')
    expect(routes.length).toBeGreaterThan(0)
    expect(routes.find((route) => route.name === 'home')).toBeTruthy()
  })
})
