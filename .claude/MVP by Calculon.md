# MVP by Calculon

# ReviewPost — From Zero to SaaS

### Reviews → Branded Social Posts, Automated

---

## The Idea in One Sentence

Pull Google reviews from any local business, filter the best ones with AI, generate branded visual posts, and publish them to social media — automatically.

---

## Why This Works

Local businesses (salons, dentists, gyms, lawyers, HVAC companies) collect Google reviews and do nothing with them. They know they should post on social media. They never have time. They don’t know how to design. They don’t know what to write.

Their reviews are already written — by happy customers, in their own words, with zero effort from the business owner.

**The gap:** Every tool that does this is either:
- Part of a $300+/mo enterprise platform (Birdeye, Podium)
- Built for e-commerce, not local services (WiserReview)
- A widget that embeds on websites, not a posting tool

Nobody has built a dead-simple, affordable, local-business-first version.

---

## Target Customer

**Primary:** Local service businesses with 10+ Google reviews and a Facebook/Instagram page they rarely post to.

**Best niches to start:**
1. Salons & barbershops — post-driven, visual, review-heavy
2. Dental clinics — trust-critical, lots of detailed reviews
3. Personal trainers & gyms — transformation stories, emotional reviews
4. HVAC / plumbers / electricians — high review volume, zero social presence
5. Real estate agents — each deal = a glowing review going to waste
6. Restaurants — obvious fit, but competitive and price-sensitive (harder)

**Ideal customer profile:**
- 1-5 employees
- 20-500 Google reviews
- Has Instagram or Facebook page
- Posts fewer than 4 times per month
- Has no marketing budget or staff

---

## Phase 1 — Demo MVP (Week 1-2)

### Goal

Build a single-page app that proves the concept in 30 seconds. No login. No database. Just input → output. This is your sales tool, not your product.

### User Flow

```
1. User pastes Google Maps business URL
   ↓
2. App fetches reviews via Google Places API
   ↓
3. AI scores and picks the best review
   (high stars + specific language, filters out "great place!")
   ↓
4. AI rewrites it into a short social caption
   ↓
5. App generates a visual card (quote + business name + stars)
   ↓
6. User downloads image + copies caption
```

### Tech Stack

| Component | Tool | Cost |
| --- | --- | --- |
| Frontend | Next.js (App Router) | Free |
| Review fetch | Google Places API | Free ($0 up to ~2,500 calls/day) |
| AI filter + caption | OpenAI GPT-4o-mini | ~$0.01 per generation |
| Image generation | `html2canvas` or `satori` (Next.js) | Free |
| Hosting | Vercel | Free |
| Domain | Any registrar | ~$10/yr |

### Google Places API — How to Get Reviews

```
GET https://maps.googleapis.com/maps/api/place/details/json
  ?place_id={PLACE_ID}
  &fields=name,rating,reviews
  &key={API_KEY}
```

To get `place_id` from a Maps URL — use the Places Text Search API:

```
GET https://maps.googleapis.com/maps/api/place/findplacefromtext/json
  ?input={BUSINESS_NAME_OR_URL}
  &inputtype=textquery
  &fields=place_id
  &key={API_KEY}
```

Note: Google Places API returns max 5 most recent reviews on the free endpoint. For more, you’ll need to scrape or use a third-party service (Outscraper, DataForSEO) later.

### AI Review Scoring Prompt

```
You are a social media manager for local businesses.
Given these reviews, pick the single best one to turn into a social media post.

Scoring criteria:
- Specific details beat vague praise ("Dr. Smith fixed my tooth painlessly in 20 mins" > "Great place!")
- Emotional language scores higher
- Story-driven reviews score higher
- Minimum 3 stars

Return only the chosen review text and a caption for Instagram/Facebook (max 150 chars, no hashtags).

Reviews:
{reviews_json}
```

### Image Card Generation with Satori

```tsx
// /app/api/generate-card/route.ts
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

export async function POST(req: Request) {
  const { quote, businessName, rating } = await req.json()

  const svg = await satori(
    <div style={{
      width: 1080, height: 1080,
      background: '#1a1a2e',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 80,
    }}>
      <div style={{ fontSize: 48, color: '#fff', lineHeight: 1.4 }}>
        "{quote}"
      </div>
      <div style={{ marginTop: 40, fontSize: 28, color: '#FFD700' }}>
        {'★'.repeat(rating)}
      </div>
      <div style={{ marginTop: 16, fontSize: 24, color: '#aaa' }}>
        — {businessName}
      </div>
    </div>,
    { width: 1080, height: 1080, fonts: [...] }
  )

  const resvg = new Resvg(svg)
  const png = resvg.render().asPng()

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' }
  })
}
```

### MVP Demo Page

```
/                     → Landing: "Paste your Google Maps link"
/demo                 → The tool itself
/result               → Generated card + caption + download button
```

### What Success Looks Like at This Stage

- You can demo it to a business owner in 60 seconds
- They see their own reviews turned into a real post
- They say “how much?” — that’s your signal to keep going

---

## Phase 2 — Agency Model (Month 1-3)

### Goal

Get 5-10 paying clients manually before automating anything.

### The Agency Pitch

> “I manage your social media reviews for you. Every week, I take your best Google reviews and turn them into 3 professional posts for Instagram and Facebook. You do nothing. $150-300/month.”
> 

This is 100% doable manually using your MVP + Canva/Buffer.

### Cold Outreach Script

**Target:** Local businesses with 50+ Google reviews and few social posts.

**How to find them:**
1. Google Maps search: “dentist [city]”, “salon [city]”, etc.
2. Filter by 4+ stars with 50+ reviews
3. Check their Instagram — last post 3 weeks ago? That’s a lead.

**Cold DM / Email:**

```
Subject: I turned your Google reviews into posts (example inside)

Hi [Name],

I noticed [Business Name] has some great Google reviews — people
really love you. But I also noticed your Instagram hasn't been
updated in a while.

I built a tool that automatically turns your best reviews into
ready-to-post content. Here's what it would look like for you:

[attach generated card with their actual review]

I can do this for you every week — 3 posts, fully branded,
fully automatic. $200/month, cancel anytime.

Interested in a free week to try it?

— Denis
```

### Pricing at Agency Stage

| Tier | Price | What you deliver |
| --- | --- | --- |
| Starter | $150/mo | 8 posts/month, IG + FB |
| Standard | $250/mo | 16 posts/month, IG + FB + caption |
| Premium | $400/mo | 20 posts/month, all platforms + reply to reviews |

### Operations (Manual Phase)

1. **Monday:** Pull new reviews from Google (manual or via your demo tool)
2. **Tuesday:** Generate cards (your tool + light Canva customization)
3. **Wednesday:** Schedule via Buffer or Later (free plans cover this)
4. Done.

Time per client: ~1 hour/week. At $200/mo, that’s $200/hr effective rate.

### Goal: 10 clients = $2,000/mo before building anything more.

---

## Phase 3 — Product v1 (Month 3-6)

### Goal

Automate what you’re doing manually. Replace your own time with software.

### Core Features

**Onboarding**
- [ ] Connect Google Business Profile (OAuth)
- [ ] Connect Instagram + Facebook (Meta Graph API)
- [ ] Upload logo + pick brand colors
- [ ] Set posting schedule (e.g., Mon/Wed/Fri)

**Review Engine**
- [ ] Auto-fetch new reviews weekly
- [ ] AI scoring — filter out vague reviews
- [ ] AI caption generation
- [ ] Manual approval queue (owner reviews before posting)

**Post Generation**
- [ ] 3-5 card templates (quote card, star card, photo card)
- [ ] Brand colors + logo applied automatically
- [ ] Square (1:1) + Story (9:16) formats

**Publishing**
- [ ] Auto-post to Instagram + Facebook
- [ ] Post history + analytics (impressions, likes)

**Dashboard**
- [ ] Review inbox
- [ ] Scheduled posts calendar
- [ ] Basic stats

### Tech Stack — Product v1

| Layer | Tool | Why |
| --- | --- | --- |
| Frontend | Next.js 15 + Tailwind | You know it |
| Backend | Next.js API Routes | Keep it simple |
| Database | Supabase (Postgres) | Auth + DB in one |
| Auth | Supabase Auth |  |
| Queue | Supabase Edge Functions + cron | Scheduled review fetching |
| Image gen | Satori + Resvg | Server-side, no browser needed |
| AI | OpenAI GPT-4o-mini | Cheap, fast |
| Social posting | Meta Graph API | IG + FB in one API |
| Payments | Stripe |  |
| Hosting | Vercel |  |

### Database Schema

```sql
-- Users / businesses
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  name TEXT,
  google_place_id TEXT,
  google_access_token TEXT,
  meta_access_token TEXT,
  logo_url TEXT,
  brand_color TEXT DEFAULT '#1a1a2e',
  posting_schedule TEXT DEFAULT 'mon,wed,fri',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews pulled from Google
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses,
  google_review_id TEXT UNIQUE,
  author_name TEXT,
  rating INT,
  text TEXT,
  ai_score FLOAT, -- 0-1, higher = better for posting
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses,
  review_id UUID REFERENCES reviews,
  caption TEXT,
  card_image_url TEXT,
  platform TEXT, -- 'instagram', 'facebook'
  status TEXT DEFAULT 'pending', -- pending, approved, scheduled, published
  scheduled_for TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  meta_post_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### API Integrations

**Google Business Profile API**

```
Scope: https://www.googleapis.com/auth/business.manage
Endpoint: https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews
```

**Meta Graph API (Instagram + Facebook)**

```
POST /{ig-user-id}/media
  caption: "Your caption text"
  image_url: "https://your-cdn.com/card.png"

POST /{ig-user-id}/media_publish
  creation_id: {from above}
```

Note: Instagram only allows posting via Business accounts connected to a Facebook Page.

### Pricing — Product v1

| Plan | Price | Limits |
| --- | --- | --- |
| Free | $0 | 5 posts/mo, watermark, 1 platform |
| Solo | $19/mo | 30 posts/mo, 2 platforms, no watermark |
| Business | $49/mo | Unlimited posts, 3 locations, all platforms |
| Agency | $149/mo | Unlimited locations, white-label, team access |

---

## Phase 4 — Growth (Month 6-12)

### Review Sources Beyond Google

Once Google works, add:
- **Yelp** (unofficial API or scraping)
- **TripAdvisor** (scraping, no official API)
- **Trustpilot** (official API)
- **Booking.com** (for hotels)
- **G2 / Capterra** (for SaaS products — different niche)
- **App Store / Google Play** (for app developers)

### Social Platforms to Add

- **LinkedIn** — for B2B service providers (lawyers, accountants, consultants)
- **TikTok** — video cards with review quotes over stock footage (later)
- **Google Business posts** — post the review back to Google itself (weird but effective)

### AI Upgrades

- **Review sentiment clustering** — “Most of your reviews mention your staff. We highlight that.”
- **Optimal posting time** — analyze when their followers are active
- **Hashtag generation** — niche-relevant, not generic
- **Response suggestions** — AI drafts replies to new reviews (separate feature, upsell)

### Distribution Strategy

**Agency channel:** Create a white-label version. Charge agencies $149/mo, they resell at $200-400/mo per client. You get recurring revenue without customer support per client.

**Directories:** List on:
- ProductHunt
- AppSumo (lifetime deal — good for initial user burst)
- G2, Capterra, GetApp (get reviews)
- Shopify App Store (if you add e-commerce support)

**SEO:** Target:
- “google reviews social media posts”
- “auto post reviews instagram”
- “[niche] review management tool”

**Partnerships:** Integrate with tools local businesses already use:
- Square, Mindbody (fitness/salons)
- Vagaro (salons/spas)
- Housecall Pro (home services)

---

## Competitive Positioning

|  | ReviewPost | Birdeye | NiceJob | WiserReview |
| --- | --- | --- | --- | --- |
| Price | $19-49/mo | $300+/mo | $75/mo | $19/mo |
| Focus | Posting | Everything | Review collection | E-commerce |
| For local services | ✅ | ✅ | ✅ | ❌ |
| Auto-post social | ✅ | ✅ | ❌ | ✅ |
| No design skills needed | ✅ | Partial | ❌ | Partial |
| AI review selection | ✅ | ❌ | ❌ | ❌ |
| Simple onboarding | ✅ | ❌ | Partial | ✅ |

**Your tagline:** *“Turn your Google reviews into social posts. Automatically.”*

**Your positioning:** The affordable, no-design-skills-needed alternative for solo local business owners who aren’t using Birdeye because it costs more than their electric bill.

---

## Financial Model

### Break-Even

| Monthly | Amount |
| --- | --- |
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| OpenAI (1000 generations) | ~$15 |
| Google Maps API | Free (under limits) |
| Meta API | Free |
| Domain + misc | $5 |
| **Total costs** | **~$65/mo** |

You break even at **4 Solo plan customers.**

### Growth Milestones

| Month | Milestone | MRR |
| --- | --- | --- |
| 1-2 | Demo MVP live, 5 agency clients manually | $1,000 |
| 3 | Product v1 live, 10 paying users | $250 (product) + $2,000 (agency) |
| 6 | 50 paying users, agency winding down | $1,500 |
| 9 | 150 paying users | $4,500 |
| 12 | 300 paying users + 5 agency accounts | $10,000+ |

---

## Risks & Mitigations

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| Meta API approval takes weeks | High | Apply on day 1, use Buffer API as fallback |
| Google Places returns only 5 reviews | Medium | Use Outscraper ($15/mo) or focus on businesses with recent reviews |
| Competitor copies the idea | Medium | Distribution moat > feature moat. Win on relationships first |
| Business owners don’t want to connect Meta account | Medium | Offer manual download + posting as fallback |
| X (Twitter) API costs $100/mo | Low | Skip X for v1, add later |

---

## Week-by-Week Execution Plan

### Week 1

- [ ]  Set up Google Places API key
- [ ]  Set up OpenAI API key
- [ ]  Build review fetcher (paste Maps URL → get reviews)
- [ ]  Build AI review scorer
- [ ]  Build basic card generator (Satori)
- [ ]  Deploy to Vercel

### Week 2

- [ ]  Polish the demo page
- [ ]  Make card look actually good (typography, spacing)
- [ ]  Add 2-3 card themes
- [ ]  Test with 10 real local businesses’ URLs
- [ ]  Get feedback from 3 real business owners

### Week 3-4 (Agency Phase Begins)

- [ ]  Build list of 50 local businesses to cold outreach
- [ ]  Send personalized demos (generate their card, attach to email)
- [ ]  Close first paying client
- [ ]  Manually deliver for client using demo tool + Canva + Buffer

### Month 2

- [ ]  Build auth (Supabase)
- [ ]  Build Google Business OAuth
- [ ]  Auto-fetch reviews on schedule
- [ ]  Basic dashboard

### Month 3

- [ ]  Meta Graph API integration
- [ ]  Auto-posting live
- [ ]  Stripe billing
- [ ]  First product users (convert agency clients)

---

## Name Ideas

- **ReviewPost** — direct, clear, SEO-friendly
- **Starpost** — star ratings → posts
- **Glowpost** — positive reviews → posts
- **Voicepost** — customer voice → posts
- **Proofly** — social proof, automatically

---

## The One Thing to Remember

The MVP is a sales tool, not a product. Build it fast, make it look good enough to impress, and spend 80% of your time talking to potential customers. The product gets built once you have signal that people will pay.

Don’t build a dashboard nobody asked for. Build a demo that closes deals.

---

*Document created: 2026-03-19*

*Author: Calculon ⚙️*