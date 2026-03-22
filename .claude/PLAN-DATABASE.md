# ReviewPost — Database Plan

> **Phase 1 has no database.** The demo tool is fully stateless (input → output).
> This file documents Supabase setup so it's ready to activate at the start of Phase 2 (Month 2).

---

## Phase 1 — No Database Needed

All data in Phase 1 is ephemeral:
- Google Places API response → held in TanStack Query cache
- Generated card → served as a binary response, downloaded immediately
- No user accounts, no saved posts, no history

Do **not** add Supabase to Phase 1 — it adds complexity with zero benefit.

---

## Supabase — Project Setup (do before Phase 2)

1. Create a Supabase project at [supabase.com](https://supabase.com/): name `review-post`
2. Note the **Project URL** and **anon/service_role keys**
3. Install CLI: `npm install supabase --save-dev`
4. Init locally: `npx supabase init`
5. Link to project: `npx supabase link --project-ref YOUR_PROJECT_REF`

### MCP Server Configuration

Add to `.cursor/mcp.json` (Supabase MCP server uses access token):

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest", "--access-token", "${SUPABASE_ACCESS_TOKEN}"]
    }
  }
}
```

Set environment variable:
```bash
export SUPABASE_ACCESS_TOKEN=your_supabase_personal_access_token
```

---

## Phase 2 Schema

### `businesses`

Stores one row per connected business. One user can have multiple businesses.

```sql
CREATE TABLE businesses (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES auth.users NOT NULL,
  name                TEXT NOT NULL,
  google_place_id     TEXT,
  google_access_token TEXT,           -- OAuth token for Google Business Profile
  meta_access_token   TEXT,           -- OAuth token for Instagram + Facebook
  logo_url            TEXT,
  brand_color         TEXT DEFAULT '#1a1a2e',
  posting_schedule    TEXT DEFAULT 'mon,wed,fri',
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users see own businesses"
  ON businesses FOR ALL
  USING (auth.uid() = user_id);
```

### `reviews`

Reviews pulled from Google Places API (or Google Business Profile in Phase 2).

```sql
CREATE TABLE reviews (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id       UUID REFERENCES businesses ON DELETE CASCADE NOT NULL,
  google_review_id  TEXT UNIQUE,
  author_name       TEXT,
  rating            INT CHECK (rating BETWEEN 1 AND 5),
  text              TEXT,
  ai_score          FLOAT,          -- 0.0–1.0, higher = better for posting
  published_at      TIMESTAMPTZ,    -- when the review was posted on Google
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users see own reviews"
  ON reviews FOR ALL
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );
```

### `posts`

Generated social media posts (pending → approved → scheduled → published).

```sql
CREATE TABLE posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID REFERENCES businesses ON DELETE CASCADE NOT NULL,
  review_id       UUID REFERENCES reviews ON DELETE SET NULL,
  caption         TEXT,
  card_image_url  TEXT,             -- URL in Supabase Storage
  platform        TEXT CHECK (platform IN ('instagram', 'facebook')),
  status          TEXT DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'scheduled', 'published', 'failed')),
  scheduled_for   TIMESTAMPTZ,
  published_at    TIMESTAMPTZ,
  meta_post_id    TEXT,             -- ID returned by Meta Graph API after publishing
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users see own posts"
  ON posts FOR ALL
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE user_id = auth.uid()
    )
  );
```

---

## Supabase Storage

Card images are generated server-side and stored in Supabase Storage for sharing and re-downloading.

```
Bucket: card-images
  ├── {business_id}/
  │   └── {post_id}.png
```

Bucket policy: private, authenticated access only (served via signed URLs).

---

## Supabase Auth (Phase 2)

Use **Supabase Auth** with email/password + optional Google OAuth.

```ts
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Environment Variables (Phase 2)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # server-only, never expose to client
```

---

## Supabase Edge Functions (Phase 2)

Used for scheduled review fetching (cron job). Runs on Deno.

```
supabase/functions/
└── fetch-reviews/
    └── index.ts    -- fetches reviews for all businesses, scores with OpenAI, creates post rows
```

Trigger: `supabase cron` (via pg_cron in Supabase dashboard) — runs every Monday at 09:00 UTC.

---

## Migration Strategy

All schema changes via Supabase migrations:

```bash
npx supabase migration new create_businesses
npx supabase migration new create_reviews
npx supabase migration new create_posts
npx supabase db push
```

Migrations live in `supabase/migrations/` and are committed to git.
