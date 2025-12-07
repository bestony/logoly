import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  document.head.innerHTML = ''
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

describe('initAnalytics', () => {
  const GA_SRC = 'https://www.googletagmanager.com/gtag/js?id='

  it('skips script injection when measurement id is missing', async () => {
    vi.stubEnv('PROD', true)
    const { initAnalytics } = await import('../utils/analytics')

    initAnalytics(undefined, true)

    expect(document.querySelector(`script[src^="${GA_SRC}"]`)).toBeNull()
  })

  it('injects GA tag once and wires gtag', async () => {
    vi.stubEnv('PROD', true)
    const { initAnalytics } = await import('../utils/analytics')

    initAnalytics('G-TEST', true)

    const script = document.querySelector(`script[src="${GA_SRC}G-TEST"]`)
    expect(script).not.toBeNull()
    expect(typeof window.gtag).toBe('function')

    initAnalytics('G-TEST', true)

    expect(document.querySelectorAll(`script[src="${GA_SRC}G-TEST"]`).length).toBe(1)
  })

  it('skips GA initialization when prod flag is false even with an id', async () => {
    vi.stubEnv('PROD', false)
    const { initAnalytics } = await import('../utils/analytics')

    initAnalytics('G-DEV', false)

    expect(document.querySelector(`script[src^="${GA_SRC}"]`)).toBeNull()
  })
})
