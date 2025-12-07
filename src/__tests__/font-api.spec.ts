import { afterEach, describe, expect, it } from 'vitest'
import { buildFontApiUrl } from '../utils/font-api'

const originalEnvPrefix = import.meta.env.FONT_PREFIX
const originalGlobalPrefix = globalThis.FONT_PREFIX
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
})
