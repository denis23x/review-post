# ReviewPost — API Plan

> Phase 1 only. All routes are Next.js App Router API Routes (`app/api/*/route.ts`).
> No auth, no database. Stateless request → response.

---

## API Routes Overview

```
app/
└── api/
    ├── reviews/
    │   └── route.ts        POST  { url } → { placeId, name, reviews[] }
    ├── score/
    │   └── route.ts        POST  { reviews[] } → { review, caption }
    └── generate-card/
        └── route.ts        POST  { quote, businessName, rating, theme } → PNG (binary)
```

---

## 1. `POST /api/reviews`

Resolves a Google Maps URL to a Place ID, then fetches the business's reviews.

### Request

```ts
{
  url: string  // Google Maps URL, e.g. "https://maps.google.com/?cid=..."
}
```

### Response

```ts
{
  placeId: string
  name: string
  rating: number
  reviews: Array<{
    authorName: string
    rating: number
    text: string
    time: number
  }>
}
```

### Step 1 — Resolve Place ID

```
GET https://maps.googleapis.com/maps/api/place/findplacefromtext/json
  ?input={encoded business name or URL query}
  &inputtype=textquery
  &fields=place_id,name
  &key={GOOGLE_PLACES_API_KEY}
```

**Notes:**
- Extract a search query from the Maps URL (business name if present, otherwise the URL itself)
- Returns max 1 candidate — use `candidates[0].place_id`

### Step 2 — Fetch Reviews

```
GET https://maps.googleapis.com/maps/api/place/details/json
  ?place_id={PLACE_ID}
  &fields=name,rating,reviews
  &key={GOOGLE_PLACES_API_KEY}
```

**Notes:**
- Free endpoint returns **max 5 most recent reviews**
- For more reviews: Phase 2 uses Outscraper ($15/mo) or DataForSEO
- Reviews sorted by `time` descending by default

### Error Cases

| Scenario | HTTP Status | Response |
| --- | --- | --- |
| Missing `url` param | 400 | `{ error: "url is required" }` |
| Invalid Maps URL | 400 | `{ error: "could not resolve place" }` |
| No reviews found | 200 | `{ reviews: [] }` |
| Google API quota exceeded | 429 | `{ error: "rate limit exceeded" }` |
| Google API key invalid | 500 | `{ error: "google api error" }` |

---

## 2. `POST /api/score`

Sends reviews to OpenAI GPT-4o-mini. AI picks the best review and generates a social caption.

### Request

```ts
{
  reviews: Array<{
    authorName: string
    rating: number
    text: string
  }>
}
```

### Response

```ts
{
  selectedReview: {
    authorName: string
    rating: number
    text: string
  }
  caption: string  // max 150 chars, no hashtags
}
```

### OpenAI Prompt

```
You are a social media manager for local businesses.
Given these reviews, pick the single best one to turn into a social media post.

Scoring criteria:
- Specific details beat vague praise ("Dr. Smith fixed my tooth painlessly in 20 mins" > "Great place!")
- Emotional language scores higher
- Story-driven reviews score higher
- Minimum 3 stars — discard anything below

Return a JSON object with two fields:
- "review": the full text of the chosen review
- "caption": a social media caption for Instagram/Facebook (max 150 chars, no hashtags)

Reviews:
{reviews_json}
```

### OpenAI Config

```ts
model: "gpt-4o-mini"
response_format: { type: "json_object" }
max_tokens: 300
temperature: 0.4
```

### Error Cases

| Scenario | HTTP Status | Response |
| --- | --- | --- |
| Empty reviews array | 400 | `{ error: "no reviews provided" }` |
| All reviews below 3 stars | 200 | `{ error: "no qualifying reviews" }` |
| OpenAI API error | 500 | `{ error: "ai scoring failed" }` |

---

## 3. `POST /api/generate-card`

Renders a 1080×1080 PNG card using Satori + `@resvg/resvg-js`. Returns raw PNG binary.

### Request

```ts
{
  quote: string        // the review text (trimmed to fit)
  businessName: string
  rating: number       // 1-5
  theme?: "dark" | "light" | "brand"  // default: "dark"
}
```

### Response

```
Content-Type: image/png
Body: raw PNG binary (1080×1080)
```

### Themes

| Theme | Background | Text | Stars |
| --- | --- | --- | --- |
| `dark` | `#1a1a2e` | `#ffffff` | `#FFD700` |
| `light` | `#ffffff` | `#1a1a2e` | `#FFD700` |
| `brand` | `#0f172a` | `#f8fafc` | `#38bdf8` |

### Font Loading

Satori requires fonts in `.ttf` or `.otf` format — `.woff2` is not supported. Bundle locally in `public/fonts/`:

```ts
import { readFileSync } from 'fs'
import { join } from 'path'

const fontData = readFileSync(join(process.cwd(), 'public/fonts/Inter-Regular.ttf'))
```

See `AI.md` for the full font setup.

### Error Cases

| Scenario | HTTP Status | Response |
| --- | --- | --- |
| Missing required fields | 400 | `{ error: "quote and businessName required" }` |
| Satori render error | 500 | `{ error: "card generation failed" }` |

---

## Google Places API — Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: `review-post`
3. Enable **Places API (New)** and **Places API**
4. Create an API key → restrict to these APIs only
5. Add to `.env.local`: `GOOGLE_PLACES_API_KEY=your_key`

**Billing note:** Google gives $200/mo free credit. Phase 1 volume is well within the free tier.

---

## OpenAI API — Setup

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Create an API key
3. Add to `.env.local`: `OPENAI_API_KEY=your_key`
4. Set a monthly spend limit ($5 for Phase 1)

**Cost:** GPT-4o-mini costs ~$0.00015/1K input tokens. Each generation ≈ 500 tokens = **~$0.0001 per call**.

---

## Dependencies to Install

```bash
npm install openai
npm install satori @resvg/resvg-js
# No SDK needed for Google Places API — all calls use native fetch
```

---

## Rate Limiting (Phase 1)

No rate limiting needed for Phase 1 (demo tool, no auth).
Add [Upstash Rate Limit](https://upstash.com/docs/redis/sdks/ratelimit/overview) in Phase 2 when the app goes public.
