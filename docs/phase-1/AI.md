# ReviewPost — AI Plan

> Phase 1 only. Two AI responsibilities:
> 1. **Review scoring + caption** — OpenAI GPT-4o-mini
> 2. **Card image generation** — Satori (JSX → SVG) + `@resvg/resvg-js` (SVG → PNG)

---

## 1. Review Scoring & Caption — OpenAI GPT-4o-mini

### Goal

Given up to 5 reviews from the Google Places API, pick the best one for a social media post and generate a short caption.

### API Route

`POST /api/score` → `app/api/score/route.ts`

### Implementation

```ts
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `
You are a social media manager for local businesses.
Given a list of customer reviews, pick the single best one to turn into a social media post.

Scoring criteria:
- Specific details beat vague praise ("Dr. Smith fixed my tooth painlessly in 20 mins" > "Great place!")
- Emotional language scores higher
- Story-driven reviews score higher
- Minimum 3 stars — discard anything below 3 stars

Return a valid JSON object with exactly two fields:
- "review": the full text of the chosen review (do not truncate or paraphrase)
- "caption": an Instagram/Facebook caption (max 150 chars, no hashtags, no emojis unless natural)
`.trim()

export async function POST(req: Request) {
  const { reviews } = await req.json()

  if (!reviews?.length) {
    return Response.json({ error: 'no reviews provided' }, { status: 400 })
  }

  const qualifying = reviews.filter((r: { rating: number }) => r.rating >= 3)
  if (!qualifying.length) {
    return Response.json({ error: 'no qualifying reviews' }, { status: 200 })
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    max_tokens: 300,
    temperature: 0.4,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Reviews:\n${JSON.stringify(qualifying, null, 2)}`,
      },
    ],
  })

  const parsed = JSON.parse(completion.choices[0].message.content ?? '{}')

  return Response.json({
    selectedReview: qualifying.find((r: { text: string }) => r.text === parsed.review) ?? qualifying[0],
    caption: parsed.caption,
  })
}
```

### Cost

| Model | Input tokens (est.) | Output tokens (est.) | Cost/call |
| --- | --- | --- | --- |
| GPT-4o-mini | ~400 | ~100 | ~$0.00008 |

At 1,000 generations/month → **~$0.08/month**.

---

## 2. Card Image Generation — Satori + Resvg

### Goal

Generate a 1080×1080 PNG image server-side. No browser, no puppeteer. Pure Node.

### API Route

`POST /api/generate-card` → `app/api/generate-card/route.ts`

### Dependencies

```bash
npm install satori @resvg/resvg-js
```

`satori` converts a React-like JSX element tree (as plain objects) to SVG.
`@resvg/resvg-js` converts the SVG to a PNG Buffer.

### Font Loading

Satori requires fonts. Two options:

**Option A — Bundle locally (recommended for Vercel):**
```
public/fonts/Inter-Regular.ttf
public/fonts/Inter-Bold.ttf
```

```ts
import { readFileSync } from 'fs'
import { join } from 'path'

const interRegular = readFileSync(join(process.cwd(), 'public/fonts/Inter-Regular.ttf'))
const interBold    = readFileSync(join(process.cwd(), 'public/fonts/Inter-Bold.ttf'))
```

**Option B — Fetch from Google Fonts at request time** (unreliable on cold starts, adds ~200ms latency, avoid for Vercel).

**Vercel bundling note:** `readFileSync` from `public/fonts/` works locally but font files are not automatically included in Vercel serverless function bundles. Add to `next.config.ts` (see `INFRA.md`):
```ts
experimental: {
  outputFileTracingIncludes: {
    '/api/generate-card': ['./public/fonts/**/*'],
  },
}
```
Without this, the function will crash in production with a "file not found" error that does not appear locally.

### Implementation

```ts
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const interRegular = readFileSync(join(process.cwd(), 'public/fonts/Inter-Regular.ttf'))
const interBold    = readFileSync(join(process.cwd(), 'public/fonts/Inter-Bold.ttf'))

const THEMES = {
  dark:  { bg: '#1a1a2e', text: '#ffffff', stars: '#FFD700', meta: '#aaaaaa' },
  light: { bg: '#ffffff', text: '#1a1a2e', stars: '#FFD700', meta: '#555555' },
  brand: { bg: '#0f172a', text: '#f8fafc', stars: '#38bdf8', meta: '#94a3b8' },
}

export async function POST(req: Request) {
  const { quote, businessName, rating, theme = 'dark' } = await req.json()

  if (!quote || !businessName) {
    return Response.json({ error: 'quote and businessName required' }, { status: 400 })
  }

  const colors = THEMES[theme as keyof typeof THEMES] ?? THEMES.dark
  const stars = '★'.repeat(Math.min(5, Math.max(1, rating)))

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: 1080,
          height: 1080,
          background: colors.bg,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          fontFamily: 'Inter',
          position: 'relative',   // required for absolute-positioned children
        },
        children: [
          {
            type: 'div',
            props: {
              style: { fontSize: 48, color: colors.text, lineHeight: 1.4, fontWeight: 700 },
              children: `"${quote}"`,
            },
          },
          {
            type: 'div',
            props: {
              style: { marginTop: 40, fontSize: 36, color: colors.stars },
              children: stars,
            },
          },
          {
            type: 'div',
            props: {
              style: { marginTop: 16, fontSize: 24, color: colors.meta },
              children: `— ${businessName}`,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 40,
                right: 60,
                fontSize: 18,
                color: colors.text,
                opacity: 0.1,
              },
              children: 'ReviewPost',
            },
          },
        ],
      },
    },
    {
      width: 1080,
      height: 1080,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold,    weight: 700, style: 'normal' },
      ],
    }
  )

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } })
  const png = resvg.render().asPng()

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="reviewpost-${Date.now()}.png"`,
    },
  })
}
```

### Card Layout Spec (1080×1080)

```
┌──────────────────────────────────────────────────────┐  1080px
│                                                      │
│  80px padding                                        │
│                                                      │
│  "Dr. Smith fixed my tooth painlessly in 20 mins.   │  48px bold
│   I was in and out in under an hour.                 │
│   Couldn't recommend more."                          │
│                                                      │
│  ★★★★★                                              │  36px stars
│                                                      │
│  — Sunshine Dental                                   │  24px meta
│                                                      │
│                                         ReviewPost   │  18px watermark
└──────────────────────────────────────────────────────┘  1080px
```

### Story Format (9:16 — 1080×1920)

For Phase 1, add an optional `format` param:

```ts
{ quote, businessName, rating, theme, format?: 'square' | 'story' }
```

If `format === 'story'` → use `width: 1080, height: 1920` and adjust padding.

---

## Text Truncation

Satori doesn't auto-truncate. Truncate the quote before passing to the renderer:

```ts
function truncateQuote(text: string, maxChars = 220): string {
  if (text.length <= maxChars) return text
  return text.slice(0, maxChars).trimEnd() + '…'
}
```

---

## Vercel Edge Runtime Note

`@resvg/resvg-js` uses a WebAssembly binary. It is **not compatible with the Edge Runtime**.
Use **Node.js Runtime** for `/api/generate-card`:

```ts
export const runtime = 'nodejs'
```

Satori itself is edge-compatible; the limitation is `@resvg/resvg-js`.

---

## Phase 2 AI Upgrades (not in scope for Phase 1)

- Sentiment clustering: "Most of your reviews mention your staff — we highlight that"
- Optimal posting time based on follower activity
- Hashtag generation (niche-relevant)
- AI-drafted replies to new reviews (separate upsell feature)
