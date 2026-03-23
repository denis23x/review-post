const PLACES_BASE = 'https://maps.googleapis.com/maps/api/place'

function extractSearchQuery(url: string): string {
  try {
    const parsed = new URL(url)
    const q = parsed.searchParams.get('q')
    if (q) return q
    const query = parsed.searchParams.get('query')
    if (query) return query
    const pathParts = parsed.pathname.split('/')
    const placePart = pathParts.find((p) => p.startsWith('place/'))
    if (placePart) return decodeURIComponent(placePart.replace('place/', ''))
  } catch {
    // fallback
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

  if (!findData.candidates?.length) {
    return Response.json({ error: 'could not resolve place' }, { status: 400 })
  }

  const placeId = findData.candidates[0].place_id as string

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
}
