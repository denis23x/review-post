const PLACES_BASE = 'https://places.googleapis.com/v1/places'

const SHORT_LINK_HOSTS = new Set(['maps.app.goo.gl', 'goo.gl'])

/**
 * Follows redirects for short Google Maps links (e.g. maps.app.goo.gl)
 * and returns the final expanded URL.
 */
async function expandUrl(url: string): Promise<string> {
  try {
    const host = new URL(url).hostname
    if (!SHORT_LINK_HOSTS.has(host)) return url

    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    return res.url || url
  } catch {
    return url
  }
}

/**
 * Extracts the best search query from a Google Maps URL.
 *
 * Handles the common URL formats:
 *  - https://maps.google.com/maps/place/NAME/@lat,lng,zoom/...
 *  - https://www.google.com/maps/place/NAME/@lat,lng,zoom/...
 *  - https://maps.google.com/?q=NAME
 *  - https://maps.google.com/?cid=12345  (returns empty — caller uses url directly)
 *  - https://maps.app.goo.gl/xyz          (short link — expanded before extraction)
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

/**
 * Extracts lat/lng coordinates from a Google Maps URL.
 * Matches the `@lat,lng` anchor present in standard place URLs.
 */
function extractCoordinates(url: string): { lat: number; lng: number } | null {
  try {
    const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
    if (match) {
      return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) }
    }
  } catch {
    // ignore
  }
  return null
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

  const resolvedUrl = await expandUrl(body.url as string)
  const searchQuery = extractSearchQuery(resolvedUrl)
  const coords = extractCoordinates(resolvedUrl)
  console.log('👉 ~ searchQuery:', searchQuery, 'coords:', coords)

  // ── Step 1: resolve Place ID ────────────────────────────────────────────────
  let placeId: string

  try {
    const searchBody: Record<string, unknown> = { textQuery: searchQuery }

    if (coords) {
      searchBody.locationBias = {
        circle: {
          center: { latitude: coords.lat, longitude: coords.lng },
          radius: 500.0,
        },
      }
    }

    const findRes = await fetch(`${PLACES_BASE}:searchText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'places.id,places.displayName',
      },
      body: JSON.stringify(searchBody),
    })

    if (findRes.status === 429) {
      return Response.json({ error: 'rate limit exceeded' }, { status: 429 })
    }

    if (!findRes.ok) {
      const errBody = await findRes.json().catch(() => null)
      console.error('👉 ~ searchText error:', findRes.status, errBody)
      return Response.json({ error: 'could not resolve place' }, { status: 400 })
    }

    const findData = await findRes.json()
    console.log('👉 ~ searchText result:', JSON.stringify(findData))

    if (!findData.places?.length) {
      return Response.json({ error: 'could not resolve place' }, { status: 400 })
    }

    placeId = findData.places[0].id as string
  } catch {
    return Response.json({ error: 'google api error' }, { status: 500 })
  }

  // ── Step 2: fetch reviews ────────────────────────────────────────────────────
  try {
    const detailsRes = await fetch(`${PLACES_BASE}/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,displayName,rating,reviews',
      },
    })

    if (detailsRes.status === 429) {
      return Response.json({ error: 'rate limit exceeded' }, { status: 429 })
    }

    if (!detailsRes.ok) {
      return Response.json({ error: 'could not find this business' }, { status: 400 })
    }

    const detailsData = await detailsRes.json()

    const reviews = (detailsData.reviews ?? []).map((r: {
      authorAttribution: { displayName: string }
      rating: number
      text: { text: string }
      publishTime: string
    }) => ({
      authorName: r.authorAttribution?.displayName,
      rating: r.rating,
      text: r.text?.text,
      time: Math.floor(new Date(r.publishTime).getTime() / 1000),
    }))

    return Response.json({
      placeId,
      name: detailsData.displayName?.text ?? 'Unknown Business',
      rating: detailsData.rating ?? 0,
      reviews,
    })
  } catch {
    return Response.json({ error: 'google api error' }, { status: 500 })
  }
}
