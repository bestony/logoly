import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.resetModules()
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('trackEvent', () => {
  it('bails out when not in production', async () => {
    vi.stubEnv('PROD', false)
    const gtag = vi.fn()
    vi.stubGlobal('gtag', gtag)
    const { trackEvent } = await import('../utils/analytics')

    trackEvent('test_event', { foo: 'bar' })

    expect(gtag).not.toHaveBeenCalled()
  })

  it('bails out when gtag is missing', async () => {
    vi.stubEnv('PROD', true)
    const { trackEvent } = await import('../utils/analytics')

    expect(() => trackEvent('missing_gtag')).not.toThrow()
  })

  it('calls gtag with event payload in production', async () => {
    vi.stubEnv('PROD', true)
    const gtag = vi.fn()
    vi.stubGlobal('gtag', gtag)
    const { trackEvent } = await import('../utils/analytics')

    trackEvent('dropdown_click', { label: 'SEGA', path: '/sega' })

    expect(gtag).toHaveBeenCalledWith('event', 'dropdown_click', {
      label: 'SEGA',
      path: '/sega',
    })
  })

  it('passes empty params object when omitted', async () => {
    vi.stubEnv('PROD', true)
    const gtag = vi.fn()
    vi.stubGlobal('gtag', gtag)
    const { trackEvent } = await import('../utils/analytics')

    trackEvent('noop_event')

    expect(gtag).toHaveBeenCalledWith('event', 'noop_event', {})
  })
})
