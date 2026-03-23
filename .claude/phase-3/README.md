# ReviewPost — Phase 3: Product v1

> Month 3–6. Goal: automate what Phase 2 delivers manually.
> Replace your own time with software. Convert agency clients to self-serve subscribers.

---

## Overview

Phase 3 turns the manual agency workflow into a self-serve SaaS product.
Everything Phase 2 delivers by hand (fetch reviews, score, generate card, post to social)
becomes automated and owner-controlled via a dashboard.

**Target milestone:** 10+ paying product users, agency winding down by Month 6.

---

## Plan Files

| File | Area |
| --- | --- |
| [UI.md](./UI.md) | Next.js pages, route groups, components, dark design system |
| [API.md](./API.md) | Google Business Profile OAuth, Meta Graph API |
| [DATABASE.md](./DATABASE.md) | Supabase schema for businesses, reviews, posts |
| [AUTH.md](./AUTH.md) | Supabase Auth — email/password + Google OAuth |
| [PAYMENTS.md](./PAYMENTS.md) | Stripe billing, plans, webhooks |
| [INFRA.md](./INFRA.md) | Vercel Pro, Supabase Pro, edge functions, cron |

---

## Core Features

### Onboarding
- [ ] Connect Google Business Profile (OAuth)
- [ ] Connect Instagram + Facebook (Meta Graph API)
- [ ] Upload logo + pick brand colors
- [ ] Set posting schedule (e.g., Mon/Wed/Fri)

### Review Engine
- [ ] Auto-fetch new reviews weekly (Supabase Edge Function + cron)
- [ ] AI scoring — filter out vague reviews (GPT-4o-mini, same as Phase 1)
- [ ] AI caption generation
- [ ] Manual approval queue (owner reviews post before it publishes)

### Post Generation
- [ ] 3–5 card templates (quote card, star card, photo card)
- [ ] Brand colors + logo applied automatically
- [ ] Square (1:1) + Story (9:16) formats

### Publishing
- [ ] Auto-post to Instagram + Facebook via Meta Graph API
- [ ] Post history + basic analytics (impressions, likes)

### Dashboard
- [ ] Review inbox
- [ ] Scheduled posts calendar
- [ ] Basic stats (posts published, engagement)

---

## Tech Stack

| Layer | Tool | Notes |
| --- | --- | --- |
| Frontend | Next.js 15 + Tailwind CSS v4 | App Router, same as Phase 1 |
| Backend | Next.js API Routes | Extend Phase 1 routes |
| Database | Supabase (Postgres) | Auth + DB in one |
| Auth | Supabase Auth | Email + Google OAuth |
| Queue | Supabase Edge Functions + pg_cron | Scheduled review fetching |
| Image gen | Satori + `@resvg/resvg-js` | Same as Phase 1, add brand colors |
| AI | OpenAI GPT-4o-mini | Same as Phase 1 |
| Social | Meta Graph API | IG + FB in one API |
| Payments | Stripe | Subscriptions + webhooks |
| Storage | Supabase Storage | Card images (`card-images` bucket) |
| Hosting | Vercel Pro | Needed for more serverless function time |

---

## Pricing Plans

| Plan | Price | Limits |
| --- | --- | --- |
| Free | $0 | 5 posts/mo, watermark, 1 platform |
| Solo | $19/mo | 30 posts/mo, 2 platforms, no watermark |
| Business | $49/mo | Unlimited posts, 3 locations, all platforms |
| Agency | $149/mo | Unlimited locations, white-label, team access |

Break-even: **4 Solo plan customers** (~$65/mo infra costs).

---

## Month-by-Month Execution

### Month 3
- [ ] Supabase Auth — email/password sign-up/login
- [ ] Google Business Profile OAuth (replace Phase 1 manual Places API key)
- [ ] Auto-fetch reviews on schedule
- [ ] Basic dashboard: review inbox + post queue

### Month 4
- [ ] Meta Graph API integration
- [ ] Auto-posting to Instagram + Facebook
- [ ] Approval queue UI

### Month 5
- [ ] Stripe billing integration
- [ ] Plan enforcement (post limits, watermarks)
- [ ] First product users — convert Phase 2 agency clients

### Month 6
- [ ] Polish onboarding flow
- [ ] Post history + basic analytics
- [ ] Agency wind-down: all clients self-serve on product

---

## API Integrations

### Google Business Profile API

```
Scope: https://www.googleapis.com/auth/business.manage
Endpoint: https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews
```

### Meta Graph API (Instagram + Facebook)

```
POST /{ig-user-id}/media
  caption: "Your caption text"
  image_url: "https://your-cdn.com/card.png"

POST /{ig-user-id}/media_publish
  creation_id: {from above}
```

Note: Instagram only allows posting via Business accounts connected to a Facebook Page.
Apply for Meta API access on Day 1 of Phase 3 — approval can take weeks.

---

## Risks

| Risk | Mitigation |
| --- | --- |
| Meta API approval takes weeks | Apply on Day 1; use manual download as fallback |
| Business owners won't connect Meta | Offer manual download + posting fallback |
| Google Places returns only 5 reviews | Use Outscraper ($15/mo) for high-volume clients |

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 3 section*
