import type { VercelRequest, VercelResponse } from '@vercel/node'

const TTL_MS = 24 * 60 * 60 * 1000

let cachedFonts: { items: unknown[] } | null = null
let cachedAt = 0

const buildUrl = (apiKey: string, sort?: string | string[]) => {
  const url = new URL('https://www.googleapis.com/webfonts/v1/webfonts')
  url.searchParams.set('key', apiKey)
  url.searchParams.set('sort', Array.isArray(sort) ? sort[0] : (sort ?? 'popularity'))
  return url.toString()
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Method Not Allowed' })
  }

  const apiKey = process.env.GOOGLE_FONT_KEY || process.env.GOOGLE_FONTS_KEY

  if (!apiKey) {
    return response.status(500).json({ error: 'Font API key is not configured on the server.' })
  }

  const now = Date.now()
  if (cachedFonts && now - cachedAt < TTL_MS) {
    response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600')
    return response.status(200).json({ items: cachedFonts.items, source: 'cache' })
  }

  const url = buildUrl(apiKey, request.query.sort)

  try {
    const upstream = await fetch(url)

    if (!upstream.ok) {
      return response
        .status(upstream.status)
        .json({ error: 'Failed to fetch fonts from Google Fonts API.' })
    }

    const payload = (await upstream.json()) as { items?: unknown[] }
    const items = payload.items ?? []

    cachedFonts = { items }
    cachedAt = now

    response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600')
    return response.status(200).json({ items, source: 'fresh' })
  } catch (error) {
    console.error('[api/fonts] unexpected error', error)
    return response.status(500).json({ error: 'Unexpected error while fetching fonts.' })
  }
}
