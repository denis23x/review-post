# ReviewPost — Phase 4 Integrations Plan

> New review sources and new social publishing platforms.
> All integrations extend the Phase 3 Review Engine and Publishing pipeline.

---

## Review Sources

### Currently Supported (Phase 1–3)
- Google Places API (Phase 1) → Google Business Profile API (Phase 3)

### Phase 4 Additions

| Source | API Type | Effort | Priority |
| --- | --- | --- | --- |
| Yelp | Unofficial API or Fusion API | Medium | High |
| Trustpilot | Official API | Low | High |
| TripAdvisor | Scraping (no official API) | High | Medium |
| Booking.com | For hotels — no public API | High | Low |
| G2 / Capterra | For SaaS products | Medium | Low |
| App Store / Google Play | Apple Search API + Google Play API | Medium | Low |

---

## Yelp Integration

### Yelp Fusion API

```
Base URL: https://api.yelp.com/v3
Auth: Bearer token (API key)

GET /businesses/search?term={name}&location={city}   → find business
GET /businesses/{id}/reviews                         → get reviews (max 3 on free tier)
```

**Limitations:**
- Free Fusion API returns only 3 reviews
- Full access requires Yelp partnership (contact Yelp Data Science team)
- Alternative: Outscraper ($15/mo) for full review history

### Database Changes

```sql
-- Add source column to reviews table
ALTER TABLE reviews ADD COLUMN source TEXT DEFAULT 'google'
  CHECK (source IN ('google', 'yelp', 'trustpilot', 'tripadvisor'));
ALTER TABLE reviews ADD COLUMN external_review_id TEXT;
-- Replace UNIQUE on google_review_id with composite unique
ALTER TABLE reviews DROP CONSTRAINT reviews_google_review_id_key;
ALTER TABLE reviews ADD CONSTRAINT reviews_source_external_id_unique UNIQUE (source, external_review_id);
```

---

## Trustpilot Integration

### Official API

```
Base URL: https://api.trustpilot.com/v1
Auth: API key (free, register at developers.trustpilot.com)

GET /business-units/find?name={name}           → find business unit
GET /business-units/{id}/reviews               → get reviews (paginated)
```

**Cost:** Free API tier for basic review access.

```ts
const response = await fetch(
  `https://api.trustpilot.com/v1/business-units/${businessUnitId}/reviews`,
  { headers: { 'apikey': process.env.TRUSTPILOT_API_KEY! } }
)
```

---

## Social Platforms

### Currently Supported (Phase 3)
- Instagram (Meta Graph API)
- Facebook (Meta Graph API)

### Phase 4 Additions

| Platform | API | Effort | Priority |
| --- | --- | --- | --- |
| LinkedIn | LinkedIn Marketing API | Medium | High |
| Google Business posts | Google My Business API | Low | Medium |
| TikTok | TikTok Content Posting API | High | Low |

---

## LinkedIn Integration

**Target audience:** B2B service providers — lawyers, accountants, consultants.

### API

```
Scope: w_member_social, r_liteprofile (personal) or w_organization_social (company pages)
POST https://api.linkedin.com/v2/ugcPosts
```

```ts
const post = {
  author: `urn:li:organization:{org_id}`,
  lifecycleState: 'PUBLISHED',
  specificContent: {
    'com.linkedin.ugc.ShareContent': {
      shareCommentary: { text: caption },
      shareMediaCategory: 'IMAGE',
      media: [{
        status: 'READY',
        description: { text: caption },
        media: uploadedImageUrn,
      }],
    },
  },
  visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
}
```

**Note:** Image must be uploaded first via LinkedIn's Asset Upload API before posting.

---

## Google Business Posts

Post the review card back to the business's Google Business Profile.

```
POST https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/localPosts
{
  "topicType": "STANDARD",
  "summary": "{caption}",
  "media": [{
    "mediaFormat": "PHOTO",
    "sourceUrl": "{card_image_url}"
  }]
}
```

Requires existing Google Business Profile OAuth from Phase 3.

---

## TikTok Video Cards

Generate short video clips from review quotes over stock footage.

**Approach:**
1. Use stock video API (Pexels Video API — free) as background
2. Overlay review text with `ffmpeg` server-side
3. Post via TikTok Content Posting API

**Effort:** High. Requires `ffmpeg` on server, video processing time, TikTok app review.
Defer to Phase 4 later milestone.

---

## Database Changes Summary

```sql
-- Reviews: add source tracking
ALTER TABLE reviews ADD COLUMN source TEXT DEFAULT 'google';

-- Posts: add new platforms
ALTER TABLE posts DROP CONSTRAINT posts_platform_check;
ALTER TABLE posts ADD CONSTRAINT posts_platform_check
  CHECK (platform IN ('instagram', 'facebook', 'linkedin', 'google_business', 'tiktok'));
```

---

## New Environment Variables

```bash
TRUSTPILOT_API_KEY=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
# Yelp (if using official API)
YELP_API_KEY=
```

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 4 Review Sources + Social Platforms sections*
