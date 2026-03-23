# ReviewPost — Phase 4 AI Plan

> AI upgrades on top of Phase 3 GPT-4o-mini foundation.
> Four new capabilities: sentiment clustering, optimal posting time, hashtag generation, review reply drafts.

---

## Overview

Phase 3 uses AI for two tasks:
1. Pick the best review
2. Generate a caption

Phase 4 adds:
1. **Sentiment clustering** — identify themes across all reviews
2. **Optimal posting time** — when to publish for maximum reach
3. **Hashtag generation** — niche-relevant tags, not generic spam
4. **Review reply drafts** — AI drafts responses to new reviews (separate upsell feature)

---

## 1. Sentiment Clustering

### Goal

Analyze all reviews for a business and surface recurring themes.
Show in dashboard: "Most of your reviews mention your **staff** and **speed**."

### API Route

`POST /api/analyze` → `app/api/analyze/route.ts`

### Prompt

```ts
const CLUSTER_PROMPT = `
You are analyzing customer reviews for a local business.
Identify the top 3 recurring themes or topics mentioned across these reviews.

Return a JSON object with:
- "themes": array of 3 objects, each with:
  - "label": short theme name (2-4 words, e.g. "Friendly staff", "Fast service")
  - "count": approximate number of reviews mentioning this theme
  - "sentiment": "positive" | "neutral" | "negative"
  - "example": a short quote (max 60 chars) illustrating this theme

Reviews:
{reviews_json}
`.trim()
```

### Usage in Dashboard

```
📊 Your Review Themes
─────────────────────
⭐ Friendly staff    (mentioned in 18 reviews)
⚡ Fast service      (mentioned in 12 reviews)
💰 Fair pricing      (mentioned in 8 reviews)
```

Display on the dashboard home page. Refresh weekly with new reviews.

---

## 2. Optimal Posting Time

### Goal

Suggest the best day/time to publish posts for maximum engagement, based on the
business's niche and general platform best practices.

**Phase 4 approach (no follower data access):**
Use niche-based heuristics + industry benchmarks since Meta API doesn't expose
individual follower activity data without Business Suite approval.

### Implementation

```ts
// lib/postingTime.ts
const NICHE_OPTIMAL_TIMES: Record<string, { day: string; hour: number }[]> = {
  salon: [
    { day: 'tuesday', hour: 10 },
    { day: 'thursday', hour: 11 },
    { day: 'saturday', hour: 9 },
  ],
  dental: [
    { day: 'monday', hour: 9 },
    { day: 'wednesday', hour: 11 },
  ],
  gym: [
    { day: 'monday', hour: 7 },
    { day: 'wednesday', hour: 6 },
    { day: 'friday', hour: 7 },
  ],
  restaurant: [
    { day: 'thursday', hour: 11 },
    { day: 'friday', hour: 12 },
    { day: 'sunday', hour: 12 },
  ],
  default: [
    { day: 'tuesday', hour: 10 },
    { day: 'thursday', hour: 11 },
  ],
}

export function getOptimalPostingTimes(niche: string) {
  return NICHE_OPTIMAL_TIMES[niche] ?? NICHE_OPTIMAL_TIMES.default
}
```

**Future upgrade:** When Meta Business Suite grants Insights access, replace heuristics
with real follower activity data from `GET /{page-id}/insights?metric=page_fans_online`.

---

## 3. Hashtag Generation

### Goal

Generate 5–10 niche-relevant hashtags for each post. Avoid generic spam like `#love #instagood`.

### API Route

Extend `POST /api/score` response to include `hashtags` field.

### Prompt Addition

```ts
const HASHTAG_PROMPT = `
Also generate 5-8 relevant hashtags for this post.
Rules:
- Specific to the business niche, not generic
- Mix of: location-based (#ChicagoDentist), niche (#DentalCare), benefit (#PainFreeDentist)
- No more than 2 broad hashtags (e.g. #SmallBusiness, #LocalBusiness)
- Return as a JSON array of strings, without the # symbol

Business type: {businessType}
Location: {city}
`.trim()
```

### Updated `/api/score` response

```ts
{
  selectedReview: { authorName, rating, text },
  caption: string,          // max 150 chars
  hashtags: string[],       // 5-8 items, no # prefix — client adds # when rendering
}
```

---

## 4. Review Reply Drafts (Upsell Feature)

### Goal

AI drafts a professional, personalized reply to each new Google review.
Owner reviews and edits before publishing. Upsell: add-on to Business/Agency plan.

### API Route

`POST /api/reply-draft` → `app/api/reply-draft/route.ts`

### Prompt

```ts
const REPLY_PROMPT = `
You are a professional customer relations manager.
Write a short, warm, professional reply to this customer review.

Rules:
- Thank the reviewer by first name if available
- Acknowledge the specific detail they mentioned (do not be generic)
- Keep it under 100 words
- Do not offer discounts or coupons unprompted
- End with an invitation to return
- Tone: warm and professional, not corporate

Business name: {businessName}
Review: {reviewText}
Rating: {rating}/5
`.trim()
```

### Pricing

Reply drafts are an add-on feature:
- Included in **Agency** plan
- Add-on for **Business** plan: +$10/mo
- Not available on Free/Solo

### Publishing

Replies are posted via Google Business Profile API:

```
POST https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews/{reviewId}/reply
{
  "comment": "{reply_text}"
}
```

---

## Cost Estimates

| Feature | Tokens/call (est.) | Cost/call | At 1,000 calls/mo |
| --- | --- | --- | --- |
| Review scoring + caption (Phase 3) | ~500 | ~$0.00008 | ~$0.08 |
| Sentiment clustering | ~2,000 | ~$0.0003 | ~$0.30 |
| Hashtag generation (added to scoring) | ~600 | ~$0.00010 | ~$0.10 |
| Reply drafts | ~400 | ~$0.00006 | ~$0.06 |
| **Total (all features)** | | | **~$0.54/mo** |

Cost is negligible even at 10,000 calls/month (~$5).

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 4 AI Upgrades section*
