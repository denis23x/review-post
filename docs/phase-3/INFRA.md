# ReviewPost — Phase 3 Infrastructure Plan

> Upgrade from Vercel Hobby (Phase 1) to Vercel Pro.
> Supabase Free → Supabase Pro. Add Edge Functions + cron for scheduled review fetching.

---

## Stack

| Service | Plan | Cost/mo |
| --- | --- | --- |
| Vercel | Pro | $20 |
| Supabase | Pro | $25 |
| OpenAI (1,000 generations) | Pay-as-you-go | ~$15 |
| Google Maps API | Free (under limits) | $0 |
| Meta API | Free | $0 |
| Stripe | 2.9% + 30¢ per transaction | Variable |
| Domain | Already set up in Phase 1 | ~$0 |
| **Total fixed costs** | | **~$65/mo** |

---

## Vercel Pro

Needed for:
- Longer serverless function execution time (card generation + AI scoring)
- More bandwidth for PNG card downloads
- Team access (Agency plan feature)

### Upgrade

```bash
vercel upgrade
```

Or upgrade via [vercel.com/account](https://vercel.com/account).

### `next.config.ts` (unchanged from Phase 1)

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/generate-card': ['./public/fonts/**/*'],
    },
  },
}

export default nextConfig
```

---

## Supabase Pro

Needed for:
- pg_cron (scheduled functions) — requires Pro plan
- More database storage for reviews + card image URLs
- Supabase Storage for card images

### Upgrade

Upgrade in Supabase Dashboard → Settings → Billing.

---

## Supabase Edge Functions + Cron

Scheduled review fetching runs as a Supabase Edge Function triggered by pg_cron.

### Function

```
supabase/functions/
└── fetch-reviews/
    └── index.ts    -- fetches reviews for all businesses, scores with OpenAI, creates post rows
```

```ts
// supabase/functions/fetch-reviews/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { data: businesses } = await supabase.from('businesses').select('*')

  for (const business of businesses ?? []) {
    // 1. Fetch reviews from Google Business Profile API
    // 2. Score with OpenAI (same prompt as Phase 1)
    // 3. Insert new reviews into `reviews` table
    // 4. Create pending `posts` rows for top-scored reviews
  }

  return new Response('done', { status: 200 })
})
```

### Deploy

```bash
npx supabase functions deploy fetch-reviews
```

### Cron Schedule

Add via Supabase Dashboard → Database → Extensions → pg_cron:

```sql
-- Run every Monday at 09:00 UTC
SELECT cron.schedule(
  'fetch-reviews-weekly',
  '0 9 * * 1',
  $$
    SELECT net.http_post(
      url := 'https://xxx.supabase.co/functions/v1/fetch-reviews',
      headers := '{"Authorization": "Bearer SERVICE_ROLE_KEY"}'::jsonb
    );
  $$
);
```

---

## Environment Variables (Phase 3 full list)

```bash
# Phase 1 (unchanged)
GOOGLE_PLACES_API_KEY=AIza...
OPENAI_API_KEY=sk-proj-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_SOLO=price_...
STRIPE_PRICE_BUSINESS=price_...
STRIPE_PRICE_AGENCY=price_...

# Meta
META_APP_ID=
META_APP_SECRET=
META_REDIRECT_URI=https://reviewpost.io/api/auth/callback?provider=meta

# App
NEXT_PUBLIC_APP_URL=https://reviewpost.io
```

---

## Monitoring (Phase 3)

| Tool | Purpose | Cost |
| --- | --- | --- |
| Vercel Analytics | Page views, web vitals | Free with Pro |
| Sentry | Error tracking | Free tier (5K errors/mo) |
| Upstash | Rate limiting + Redis | Free tier |

### Sentry Setup

```bash
npx @sentry/wizard@latest -i nextjs
```

### Upstash Rate Limiting

```bash
npm install @upstash/ratelimit @upstash/redis
```

Apply on `/api/reviews`, `/api/score`, `/api/generate-card` — 10 req/min per IP.

---

## Deployment Checklist (Phase 3 Go-Live)

- [ ] Vercel upgraded to Pro
- [ ] Supabase upgraded to Pro
- [ ] All Phase 3 env vars added to Vercel production
- [ ] Supabase migrations pushed (`npx supabase db push`)
- [ ] Edge Function deployed + cron scheduled
- [ ] Stripe webhook registered and tested
- [ ] Meta API app submitted for review
- [ ] Google Business Profile OAuth tested end-to-end
- [ ] `npm run build` passes with no errors

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 3 Tech Stack + Financial Model*
