# ReviewPost — Phase 3 API Plan

> Extends Phase 1 API routes. Adds Google Business Profile OAuth and Meta Graph API.
> All routes remain Next.js App Router (`app/api/*/route.ts`). Auth required on all new routes.

---

## New Routes Overview

```
app/
└── api/
    ├── reviews/
    │   └── route.ts          POST  { url } → reviews[]         (Phase 1, unchanged)
    ├── score/
    │   └── route.ts          POST  { reviews[] } → { review, caption }  (Phase 1, unchanged)
    ├── generate-card/
    │   └── route.ts          POST  { quote, businessName, ... } → PNG   (Phase 1, extend with brand colors)
    ├── auth/
    │   └── callback/
    │       └── route.ts      GET   Supabase Auth OAuth callback
    ├── businesses/
    │   └── route.ts          GET/POST  list/create businesses (Supabase)
    ├── google/
    │   ├── connect/
    │   │   └── route.ts      GET   Initiate Google Business Profile OAuth
    │   └── reviews/
    │       └── route.ts      GET   Fetch reviews for a connected business
    ├── meta/
    │   ├── connect/
    │   │   └── route.ts      GET   Initiate Meta (FB/IG) OAuth
    │   └── publish/
    │       └── route.ts      POST  Publish a post to Instagram/Facebook
    └── posts/
        └── route.ts          GET/POST/PATCH  manage posts (Supabase)
```

---

## Google Business Profile API

### OAuth Setup

```
Scope: https://www.googleapis.com/auth/business.manage
Auth URL: https://accounts.google.com/o/oauth2/v2/auth
Token URL: https://oauth2.googleapis.com/token
```

**Flow:**
1. User clicks "Connect Google Business" → `/api/google/connect`
2. Redirect to Google OAuth consent screen
3. Callback to `/api/auth/callback?provider=google` with `code`
4. Exchange `code` for `access_token` + `refresh_token`
5. Store encrypted tokens in `businesses.google_access_token` (Supabase Vault)

### Fetch Reviews

```
GET https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews
  Authorization: Bearer {access_token}
```

**Response fields used:**
- `reviewId` → `google_review_id`
- `reviewer.displayName` → `author_name`
- `starRating` → `rating` (convert: ONE=1, TWO=2, THREE=3, FOUR=4, FIVE=5)
- `comment` → `text`
- `createTime` → `published_at`

**Scheduled fetch:** Supabase Edge Function + pg_cron runs every Monday 09:00 UTC.
See `INFRA.md` for cron setup.

---

## Meta Graph API (Instagram + Facebook)

### OAuth Setup

```
App: Facebook Developer App (create at developers.facebook.com)
Permissions needed:
  - instagram_basic
  - instagram_content_publish
  - pages_read_engagement
  - pages_manage_posts
```

**Flow:**
1. User clicks "Connect Instagram/Facebook" → `/api/meta/connect`
2. Redirect to Facebook Login OAuth
3. Callback with `code` → exchange for long-lived token (60 days)
4. Store encrypted token in `businesses.meta_access_token`

**Important:** Apply for `instagram_content_publish` permission on Day 1.
Review by Meta can take 1–4 weeks.

### Publishing Flow

**Step 1 — Create media container:**

```
POST https://graph.facebook.com/v19.0/{ig-user-id}/media
  ?image_url=https://your-cdn.com/card.png
  &caption=Your caption text
  &access_token={token}
```

Response: `{ "id": "creation_id" }`

**Step 2 — Publish container:**

```
POST https://graph.facebook.com/v19.0/{ig-user-id}/media_publish
  ?creation_id={creation_id}
  &access_token={token}
```

Response: `{ "id": "ig_post_id" }` → store in `posts.meta_post_id`

**Note:** `image_url` must be publicly accessible. Cards are stored in Supabase Storage
and served via signed URLs. Use the public URL for Meta API calls.

### Facebook Page Posts

```
POST https://graph.facebook.com/v19.0/{page-id}/photos
  ?url=https://your-cdn.com/card.png
  &message=Your caption text
  &access_token={page_access_token}
```

---

## Supabase Auth Callback

```ts
// app/api/auth/callback/route.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createServerClient(...)
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
}
```

---

## Environment Variables (Phase 3 additions)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Meta
META_APP_ID=
META_APP_SECRET=
META_REDIRECT_URI=https://reviewpost.io/api/auth/callback?provider=meta
```

---

## New Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install stripe
```

---

## Rate Limiting (Phase 3)

Add Upstash Rate Limit on public-facing routes:

```bash
npm install @upstash/ratelimit @upstash/redis
```

Limit per IP: 10 requests/minute on `/api/reviews`, `/api/score`, `/api/generate-card`.

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 3 API Integrations section*
