# ReviewPost — Phase 4 Database Plan

> Schema changes on top of Phase 3. No new tables — only column additions and constraint updates.
> All changes are backwards-compatible and applied via Supabase migrations.

---

## Changes Overview

| Table | Change | Reason |
| --- | --- | --- |
| `reviews` | Add `source` column | Track review origin (google, yelp, trustpilot, etc.) |
| `reviews` | Add `external_review_id` column | Cross-source unique ID (replaces `google_review_id` unique constraint) |
| `reviews` | Drop `google_review_id` unique constraint | `google_review_id` becomes `external_review_id` for google source |
| `reviews` | Add composite unique constraint | `(source, external_review_id)` |
| `posts` | Update `platform` CHECK constraint | Add `linkedin`, `google_business`, `tiktok` |
| `businesses` | Add `yelp_business_id` column | Yelp Fusion API business identifier |
| `businesses` | Add `trustpilot_business_unit_id` column | Trustpilot business unit identifier |
| `businesses` | Add `linkedin_organization_id` column | LinkedIn company page ID |
| `businesses` | Add `niche` column | Business niche for optimal posting time + hashtag generation |

---

## Migrations

### Migration 1 — Review source tracking

```sql
-- supabase/migrations/20260701_phase4_review_sources.sql

-- Add source column (default 'google' preserves existing data)
ALTER TABLE reviews
  ADD COLUMN source TEXT NOT NULL DEFAULT 'google'
    CHECK (source IN ('google', 'yelp', 'trustpilot', 'tripadvisor'));

-- Add external_review_id (maps from existing google_review_id)
ALTER TABLE reviews
  ADD COLUMN external_review_id TEXT;

-- Backfill external_review_id from google_review_id
UPDATE reviews
  SET external_review_id = google_review_id
  WHERE google_review_id IS NOT NULL;

-- Replace the single-column unique constraint with composite unique
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_google_review_id_key;
ALTER TABLE reviews ADD CONSTRAINT reviews_source_external_id_unique
  UNIQUE (source, external_review_id);

-- google_review_id is now redundant — keep for one release then drop in next migration
-- ALTER TABLE reviews DROP COLUMN google_review_id;  -- run in next migration after backfill confirmed
```

### Migration 2 — New social platforms

```sql
-- supabase/migrations/20260701_phase4_post_platforms.sql

ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_platform_check;

ALTER TABLE posts ADD CONSTRAINT posts_platform_check
  CHECK (platform IN ('instagram', 'facebook', 'linkedin', 'google_business', 'tiktok'));
```

### Migration 3 — Business integration fields

```sql
-- supabase/migrations/20260701_phase4_business_integrations.sql

ALTER TABLE businesses
  ADD COLUMN yelp_business_id          TEXT,
  ADD COLUMN trustpilot_business_unit_id TEXT,
  ADD COLUMN linkedin_organization_id  TEXT,
  ADD COLUMN linkedin_access_token     TEXT,   -- encrypted at app layer
  ADD COLUMN niche                     TEXT
    CHECK (niche IN ('salon', 'dental', 'gym', 'restaurant', 'hvac', 'real_estate', 'other'));
```

---

## Updated Full Schema (Phase 4 state)

### `businesses`

```sql
CREATE TABLE businesses (
  id                           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                      UUID REFERENCES auth.users NOT NULL,
  name                         TEXT NOT NULL,
  niche                        TEXT CHECK (niche IN ('salon', 'dental', 'gym', 'restaurant', 'hvac', 'real_estate', 'other')),
  google_place_id              TEXT,
  google_access_token          TEXT,                    -- encrypted
  meta_access_token            TEXT,                    -- encrypted
  yelp_business_id             TEXT,
  trustpilot_business_unit_id  TEXT,
  linkedin_organization_id     TEXT,
  linkedin_access_token        TEXT,                    -- encrypted
  logo_url                     TEXT,
  brand_color                  TEXT DEFAULT '#1a1a2e',
  posting_schedule             TEXT DEFAULT 'mon,wed,fri',
  created_at                   TIMESTAMPTZ DEFAULT NOW()
);
```

### `reviews`

```sql
CREATE TABLE reviews (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id          UUID REFERENCES businesses ON DELETE CASCADE NOT NULL,
  source               TEXT NOT NULL DEFAULT 'google'
                         CHECK (source IN ('google', 'yelp', 'trustpilot', 'tripadvisor')),
  external_review_id   TEXT,
  author_name          TEXT,
  rating               INT CHECK (rating BETWEEN 1 AND 5),
  text                 TEXT,
  ai_score             FLOAT,            -- 0.0–1.0
  published_at         TIMESTAMPTZ,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (source, external_review_id)
);
```

### `posts`

```sql
CREATE TABLE posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID REFERENCES businesses ON DELETE CASCADE NOT NULL,
  review_id       UUID REFERENCES reviews ON DELETE SET NULL,
  caption         TEXT,
  hashtags        TEXT[],               -- Phase 4: array of hashtag strings (no # prefix)
  card_image_url  TEXT,
  platform        TEXT CHECK (platform IN ('instagram', 'facebook', 'linkedin', 'google_business', 'tiktok')),
  status          TEXT DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'scheduled', 'published', 'failed')),
  scheduled_for   TIMESTAMPTZ,
  published_at    TIMESTAMPTZ,
  meta_post_id    TEXT,
  linkedin_post_id TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

## RLS Policies (unchanged from Phase 3)

All new columns fall under existing RLS policies on `businesses`, `reviews`, and `posts`.
No new policies needed — `auth.uid() = user_id` on `businesses` covers all joined tables.

---

## Supabase Storage (unchanged)

```
Bucket: card-images (private)
  └── {business_id}/
      └── {post_id}.png
```

LinkedIn image publishing requires a publicly accessible URL.
Generate a short-lived signed URL from Supabase Storage before calling the LinkedIn Asset Upload API.

---

## Migration Execution

```bash
# Apply Phase 4 migrations
npx supabase migration new phase4_review_sources
npx supabase migration new phase4_post_platforms
npx supabase migration new phase4_business_integrations
npx supabase db push
```

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 4 section + [INTEGRATIONS.md](./INTEGRATIONS.md) — Database Changes section*
