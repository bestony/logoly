const resolveFontPrefix = () => {
  const envPrefix = import.meta.env.FONT_PREFIX
  const globalPrefix = typeof globalThis.FONT_PREFIX === 'string' ? globalThis.FONT_PREFIX : ''

  const prefix = envPrefix ?? globalPrefix ?? ''
  if (!prefix) {
    return ''
  }

  return prefix.replace(/\/+$/, '')
}

export const buildFontApiUrl = (sort: string | string[] = 'popularity') => {
  const prefix = resolveFontPrefix()
  const base = prefix ? `${prefix}/api/fonts` : '/api/fonts'
  const origin = globalThis.location?.origin ?? 'http://localhost'

  const url = new URL(base, origin)
  url.searchParams.set('sort', Array.isArray(sort) ? sort[0] ?? 'popularity' : sort ?? 'popularity')

  return url.toString()
}
