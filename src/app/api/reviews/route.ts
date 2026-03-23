const PLACES_BASE = 'https://maps.googleapis.com/maps/api/place'

const GOOGLE_ERROR_STATUSES = new Set([
  'NOT_FOUND',
  'ZERO_RESULTS',
  'MAX_WHEELCHAIR_ACCESSIBLE_JOURNEY_NOT_FOUND',
  'REQUEST_DENIED',
  'INVALID_REQUEST',
  'UNKNOWN_ERROR',
])

/**
 * Extracts the best search query from a Google Maps URL.
 *
 * Handles the common URL formats:
 *  - https://maps.google.com/maps/place/NAME/@lat,lng,zoom/...
 *  - https://www.google.com/maps/place/NAME/@lat,lng,zoom/...
 *  - https://maps.google.com/?q=NAME
 *  - https://maps.google.com/?cid=12345  (returns empty — caller uses url directly)
 *  - https://maps.app.goo.gl/xyz          (short link — use full url as query)
 */
function extractSearchQuery(url: string): string {
  try {
    const parsed = new URL(url)

    // Explicit query params take priority
    const q = parsed.searchParams.get('q') ?? parsed.searchParams.get('query')
    if (q) return q

    // /maps/place/BUSINESS+NAME/@lat,lng,...  →  extract segment after 'place'
    const parts = parsed.pathname.split('/').filter(Boolean)
    const placeIdx = parts.indexOf('place')
    if (placeIdx !== -1 && parts[placeIdx + 1]) {
      return decodeURIComponent(parts[placeIdx + 1].replace(/\+/g, ' '))
    }
  } catch {
    // malformed URL — fall through and use as-is
  }

  return url
}

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return Response.json({ error: 'google api not configured' }, { status: 500 })
  }

  const body = await req.json().catch(() => null)
  if (!body?.url) {
    return Response.json({ error: 'url is required' }, { status: 400 })
  }

  const searchQuery = extractSearchQuery(body.url as string)

  // ── Step 1: resolve Place ID ────────────────────────────────────────────────
  let placeId: string

  try {
    const findUrl = new URL(`${PLACES_BASE}/findplacefromtext/json`)
    findUrl.searchParams.set('input', searchQuery)
    findUrl.searchParams.set('inputtype', 'textquery')
    findUrl.searchParams.set('fields', 'place_id,name')
    findUrl.searchParams.set('key', apiKey)

    const findRes = await fetch(findUrl.toString())
    if (!findRes.ok) {
      return Response.json({ error: 'google api error' }, { status: 500 })
    }

    const findData = await findRes.json()

    if (GOOGLE_ERROR_STATUSES.has(findData.status)) {
      return Response.json({ error: 'could not resolve place' }, { status: 400 })
    }

    if (findData.status === 'OVER_QUERY_LIMIT') {
      return Response.json({ error: 'rate limit exceeded' }, { status: 429 })
    }

    if (!findData.candidates?.length) {
      return Response.json({ error: 'could not resolve place' }, { status: 400 })
    }

    placeId = findData.candidates[0].place_id as string
  } catch {
    return Response.json({ error: 'google api error' }, { status: 500 })
  }

  // ── Step 2: fetch reviews ────────────────────────────────────────────────────
  try {
    const detailsUrl = new URL(`${PLACES_BASE}/details/json`)
    detailsUrl.searchParams.set('place_id', placeId)
    detailsUrl.searchParams.set('fields', 'name,rating,reviews')
    detailsUrl.searchParams.set('key', apiKey)

    const detailsRes = await fetch(detailsUrl.toString())
    if (!detailsRes.ok) {
      return Response.json({ error: 'google api error' }, { status: 500 })
    }

    const detailsData = await detailsRes.json()

    if (detailsData.status === 'OVER_QUERY_LIMIT') {
      return Response.json({ error: 'rate limit exceeded' }, { status: 429 })
    }

    if (GOOGLE_ERROR_STATUSES.has(detailsData.status)) {
      return Response.json({ error: 'could not find this business' }, { status: 400 })
    }

    const result = detailsData.result ?? {}
    const reviews = (result.reviews ?? []).map((r: {
      author_name: string
      rating: number
      text: string
      time: number
    }) => ({
      authorName: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.time,
    }))

    return Response.json({
      placeId,
      name: result.name ?? 'Unknown Business',
      rating: result.rating ?? 0,
      reviews,
    })
  } catch {
    return Response.json({ error: 'google api error' }, { status: 500 })
  }
}
