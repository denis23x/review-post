# ReviewPost — Phase 3 Database Plan

> Full Supabase setup for Product v1. Extends the prep done in Phase 2 (`../phase-2/DATABASE.md`).
> Schema: `businesses`, `reviews`, `posts`. Auth via Supabase. Storage for card images.

---

## Schema

### `businesses`

One row per connected business. One user can have multiple businesses (Business/Agency plans).

```sql
CREATE TABLE businesses (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES auth.users NOT NULL,
  name                TEXT NOT NULL,
  google_place_id     TEXT,
  google_access_token TEXT,           -- encrypted at app layer before storing
  meta_access_token   TEXT,           -- encrypted at app layer before storing
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

**Token security note:** `google_access_token` and `meta_access_token` must be encrypted
at the application layer before INSERT/UPDATE, and decrypted after SELECT.
Use Supabase Vault (recommended) or application-level AES-256-GCM.

### `reviews`

Reviews fetched from Google Business Profile API.

```sql
CREATE TABLE reviews (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id       UUID REFERENCES businesses ON DELETE CASCADE NOT NULL,
  google_review_id  TEXT UNIQUE,
  author_name       TEXT,
  rating            INT CHECK (rating BETWEEN 1 AND 5),
  text              TEXT,
  ai_score          FLOAT,            -- 0.0–1.0, higher = better for posting
  published_at      TIMESTAMPTZ,      -- when the review was posted on Google
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

Generated social media posts with lifecycle: pending → approved → scheduled → published.

```sql
CREATE TABLE posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID REFERENCES businesses ON DELETE CASCADE NOT NULL,
  review_id       UUID REFERENCES reviews ON DELETE SET NULL,
  caption         TEXT,
  card_image_url  TEXT,               -- URL in Supabase Storage
  platform        TEXT CHECK (platform IN ('instagram', 'facebook')),
  status          TEXT DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'scheduled', 'published', 'failed')),
  scheduled_for   TIMESTAMPTZ,
  published_at    TIMESTAMPTZ,
  meta_post_id    TEXT,               -- ID returned by Meta Graph API after publishing
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

Card images are generated server-side and stored for re-downloading and Meta API publishing.

```
Bucket: card-images  (private, authenticated access)
  └── {business_id}/
      └── {post_id}.png
```

**Access:** Served via Supabase signed URLs (expire after 1 hour).
Public URL passed to Meta Graph API `image_url` field.

---

## Migrations

```bash
npx supabase migration new create_businesses
npx supabase migration new create_reviews
npx supabase migration new create_posts
npx supabase db push
```

Migrations live in `supabase/migrations/` and are committed to git.

---

## Supabase Auth

Email/password + Google OAuth.

```ts
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

Enable in Supabase Dashboard → Auth → Providers:
- Email (enabled by default)
- Google (requires Google Cloud OAuth credentials)

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 3 Database Schema + [../phase-2/DATABASE.md](../phase-2/DATABASE.md)*
