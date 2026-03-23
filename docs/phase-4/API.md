# ReviewPost — Phase 4 API Plan

> Extends Phase 3 API routes. New routes for: sentiment clustering, review reply drafts,
> Yelp/Trustpilot review fetching, and LinkedIn/Google Business post publishing.
> All routes remain Next.js App Router API Routes (`app/api/*/route.ts`). Auth required on all new routes.

---

## New Routes Overview

```
app/
└── api/
    ├── analyze/
    │   └── route.ts          POST  { businessId } → { themes[] }          Sentiment clustering
    ├── reply-draft/
    │   └── route.ts          POST  { reviewId } → { draft }                AI reply draft
    ├── score/
    │   └── route.ts          POST  { reviews[] } → { review, caption, hashtags }  Extended with hashtags
    ├── yelp/
    │   └── reviews/
    │       └── route.ts      GET   ?businessId=  → reviews[]               Yelp Fusion API
    ├── trustpilot/
    │   └── reviews/
    │       └── route.ts      GET   ?businessId=  → reviews[]               Trustpilot API
    └── linkedin/
        └── publish/
            └── route.ts      POST  { postId } → { linkedinPostId }         LinkedIn publish
```

---

## 1. `POST /api/analyze`

Analyzes all reviews for a business and returns top recurring themes (sentiment clustering).

### Request

```ts
{
  businessId: string
}
```

### Response

```ts
{
  themes: Array<{
    label: string       // e.g. "Friendly staff"
    count: number       // approximate review mentions
    sentiment: 'positive' | 'neutral' | 'negative'
    example: string     // short quote, max 60 chars
  }>
}
```

### Implementation

```ts
// app/api/analyze/route.ts
import OpenAI from 'openai'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { businessId } = await req.json()
  const supabase = createSupabaseServerClient()

  const { data: reviews } = await supabase
    .from('reviews')
    .select('text, rating')
    .eq('business_id', businessId)
    .gte('rating', 3)
    .order('created_at', { ascending: false })
    .limit(50)

  if (!reviews?.length) {
    return Response.json({ themes: [] })
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    max_tokens: 500,
    temperature: 0.3,
    messages: [
      { role: 'system', content: CLUSTER_PROMPT },
      { role: 'user', content: `Reviews:\n${JSON.stringify(reviews, null, 2)}` },
    ],
  })

  const parsed = JSON.parse(completion.choices[0].message.content ?? '{}')
  return Response.json(parsed)
}
```

See `../phase-4/AI.md` for the full prompt.

### Error Cases

| Scenario | HTTP Status | Response |
| --- | --- | --- |
| Missing `businessId` | 400 | `{ error: "businessId required" }` |
| No reviews in DB | 200 | `{ themes: [] }` |
| OpenAI error | 500 | `{ error: "analysis failed" }` |

---

## 2. `POST /api/reply-draft`

Generates an AI-drafted reply to a specific Google review.

**Plan restriction:** Agency plan (included) + Business plan add-on (+$10/mo).

### Request

```ts
{
  reviewId: string
}
```

### Response

```ts
{
  draft: string   // reply text, max ~100 words
}
```

### Implementation

```ts
// app/api/reply-draft/route.ts
export async function POST(req: Request) {
  const { reviewId } = await req.json()
  const supabase = createSupabaseServerClient()

  // Check plan eligibility
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
    .single()

  if (!sub || !['business', 'agency'].includes(sub.plan)) {
    return Response.json({ error: 'Reply drafts require Business or Agency plan' }, { status: 403 })
  }

  const { data: review } = await supabase
    .from('reviews')
    .select('text, rating, author_name, business_id')
    .eq('id', reviewId)
    .single()

  const { data: business } = await supabase
    .from('businesses')
    .select('name')
    .eq('id', review?.business_id)
    .single()

  // ... OpenAI call using REPLY_PROMPT from AI.md ...

  return Response.json({ draft: parsed.reply })
}
```

See `../phase-4/AI.md` for the full prompt.

### Publishing the Reply

After the owner approves the draft, publish via:

```ts
// app/api/reply-draft/publish/route.ts
// POST { reviewId, replyText }
// → Google Business Profile API
POST https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews/{reviewId}/reply
{
  "comment": "{replyText}"
}
```

---

## 3. `POST /api/score` (Extended)

Phase 4 extends the existing route to also return hashtags. No breaking change — `hashtags` is additive.

### Updated Response

```ts
{
  selectedReview: { authorName: string; rating: number; text: string }
  caption: string       // max 150 chars
  hashtags: string[]    // 5-8 items, no # prefix — Phase 4 addition
}
```

The prompt extension is documented in `../phase-4/AI.md` (Hashtag Generation section).

Requires `businessType` and `city` in the request body (optional — falls back to generic hashtags if not provided):

```ts
// Extended request
{
  reviews: Array<{ authorName: string; rating: number; text: string }>
  businessType?: string   // e.g. "dental", "salon", "gym"
  city?: string           // e.g. "Chicago"
}
```

---

## 4. `GET /api/yelp/reviews`

Fetches reviews from the Yelp Fusion API for a connected business.

### Query Params

```
?businessId={supabase-business-uuid}
```

### Response

Same shape as Google reviews (normalized):

```ts
{
  reviews: Array<{
    authorName: string
    rating: number
    text: string
    source: 'yelp'
    externalReviewId: string
    publishedAt: string
  }>
}
```

### Implementation

```ts
// app/api/yelp/reviews/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const businessId = searchParams.get('businessId')
  // ... fetch businesses.yelp_business_id from Supabase
  // ... call Yelp Fusion API
  // GET https://api.yelp.com/v3/businesses/{id}/reviews
  //   Authorization: Bearer {YELP_API_KEY}
}
```

**Limitation:** Yelp Fusion free tier returns max 3 reviews. Use Outscraper ($15/mo) for full history — same approach as Google Places in Phase 1.

### Error Cases

| Scenario | HTTP Status | Response |
| --- | --- | --- |
| Missing `businessId` | 400 | `{ error: "businessId required" }` |
| Yelp business not connected | 400 | `{ error: "yelp not connected" }` |
| Yelp API error | 500 | `{ error: "yelp api error" }` |

---

## 5. `GET /api/trustpilot/reviews`

Fetches reviews from the Trustpilot official API.

### Query Params

```
?businessId={supabase-business-uuid}
```

### Response

Same normalized shape as Yelp above, with `source: 'trustpilot'`.

### Implementation

```ts
// app/api/trustpilot/reviews/route.ts
// GET https://api.trustpilot.com/v1/business-units/{id}/reviews
//   Headers: { apikey: TRUSTPILOT_API_KEY }
```

Trustpilot returns paginated results — handle `nextPage` cursor.

---

## 6. `POST /api/linkedin/publish`

Publishes a post card to a LinkedIn company page.

### Request

```ts
{
  postId: string   // references posts table
}
```

### Response

```ts
{
  linkedinPostId: string
}
```

### Implementation

LinkedIn requires a two-step process: upload image asset first, then post.

**Step 1 — Register upload:**
```
POST https://api.linkedin.com/v2/assets?action=registerUpload
```

**Step 2 — Upload image binary:**
```
PUT {uploadUrl from step 1}
```

**Step 3 — Create post:**
```
POST https://api.linkedin.com/v2/ugcPosts
Authorization: Bearer {linkedin_access_token}
```

See `../phase-4/INTEGRATIONS.md` for the full request body structure.

---

## Route: `GET /api/google/business-posts` (Phase 4 addition)

Posts the review card back to the business's Google Business Profile.

```ts
// POST /{locationId}/localPosts via Google My Business API
// Requires google_access_token already stored from Phase 3 OAuth
```

Full spec in `../phase-4/INTEGRATIONS.md` (Google Business Posts section).

---

## Environment Variables (Phase 4 additions)

```bash
YELP_API_KEY=
TRUSTPILOT_API_KEY=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
```

---

## New Dependencies

```bash
# No new npm packages required for Phase 4 API routes.
# All integrations use native fetch with Bearer token auth.
```

---

## Rate Limiting (Phase 4)

Apply Upstash rate limits on new routes (same 10 req/min per IP pattern from Phase 3):

```ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
})
```

Routes to limit: `/api/analyze`, `/api/reply-draft`, `/api/yelp/reviews`, `/api/trustpilot/reviews`.

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 4 section + [AI.md](./AI.md) + [INTEGRATIONS.md](./INTEGRATIONS.md)*
