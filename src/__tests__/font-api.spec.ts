import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildFontApiUrl } from '../utils/font-api'

const originalEnvPrefix = import.meta.env.FONT_PREFIX
const originalGlobalPrefix = globalThis.FONT_PREFIX
const originalLocation = globalThis.location
const defaultOrigin = globalThis.location?.origin ?? 'http://localhost'

const setEnvPrefix = (value?: string) => {
  const env = import.meta.env as Record<string, string | undefined>

  if (typeof value === 'undefined') {
    Reflect.deleteProperty(env, 'FONT_PREFIX')
  } else {
    env.FONT_PREFIX = value
  }
}

const setGlobalPrefix = (value?: string) => {
  if (typeof value === 'undefined') {
    Reflect.deleteProperty(globalThis, 'FONT_PREFIX')
  } else {
    globalThis.FONT_PREFIX = value
  }
}

afterEach(() => {
  setEnvPrefix(originalEnvPrefix)
  setGlobalPrefix(originalGlobalPrefix)
  vi.stubGlobal('location', originalLocation)
})

describe('buildFontApiUrl', () => {
  it('defaults to /api/fonts when no prefix is set', () => {
    setEnvPrefix()
    setGlobalPrefix()

    expect(buildFontApiUrl()).toBe(`${defaultOrigin}/api/fonts?sort=popularity`)
  })

  it('uses FONT_PREFIX from environment when provided', () => {
    setEnvPrefix('https://cdn.example.com/base/')
    setGlobalPrefix()

    expect(buildFontApiUrl('alpha')).toBe('https://cdn.example.com/base/api/fonts?sort=alpha')
  })

  it('falls back to global FONT_PREFIX when env is absent', () => {
    setEnvPrefix()
    setGlobalPrefix('/mirror')

    expect(buildFontApiUrl()).toBe(`${defaultOrigin}/mirror/api/fonts?sort=popularity`)
  })

  it('handles array sort values and trims trailing slashes', () => {
    setEnvPrefix('/prefixed/')
    setGlobalPrefix('/ignored')

    expect(buildFontApiUrl(['style', 'popularity'])).toBe(
      `${defaultOrigin}/prefixed/api/fonts?sort=style`,
    )
  })

  it('falls back to global prefix when env is empty and trims trailing slashes', () => {
    setEnvPrefix()
    setGlobalPrefix('https://cdn.example.com///')

    expect(buildFontApiUrl()).toBe('https://cdn.example.com/api/fonts?sort=popularity')
  })

  it('ignores non-string global prefixes', () => {
    setEnvPrefix()
    // @ts-expect-error intentional bad type
    setGlobalPrefix(1234)

    expect(buildFontApiUrl()).toBe(`${defaultOrigin}/api/fonts?sort=popularity`)
  })

  it('treats empty env prefix as opt-out even when a global prefix exists', () => {
    setEnvPrefix('')
    setGlobalPrefix('/fallback')

    expect(buildFontApiUrl()).toBe(`${defaultOrigin}/api/fonts?sort=popularity`)
  })

  it('falls back to global prefix when env prefix is explicitly null', () => {
    setEnvPrefix(null as unknown as string)
    setGlobalPrefix('/null')

    expect(buildFontApiUrl()).toBe(`${defaultOrigin}/null/api/fonts?sort=popularity`)
  })

  it('treats empty global prefix as empty when env is unset', () => {
    setEnvPrefix()
    setGlobalPrefix('')

    expect(buildFontApiUrl()).toBe(`${defaultOrigin}/api/fonts?sort=popularity`)
  })

  it('falls back to localhost origin when window location is unavailable', () => {
    vi.stubGlobal('location', undefined as unknown as Location)
    setEnvPrefix()
    setGlobalPrefix()

    expect(buildFontApiUrl()).toBe('http://localhost/api/fonts?sort=popularity')
  })

  it('normalizes sort param when provided as empty array or null', () => {
    setEnvPrefix()
    setGlobalPrefix()

    expect(buildFontApiUrl([])).toBe(`${defaultOrigin}/api/fonts?sort=popularity`)
    expect(buildFontApiUrl(null as unknown as string)).toBe(
      `${defaultOrigin}/api/fonts?sort=popularity`,
    )
  })
})
