# ReviewPost — Phase 2: Agency Model

> Month 1–3. Goal: 5–10 paying clients manually before automating anything.
> No new product features — use the Phase 1 demo tool + Canva + Buffer manually.

---

## Overview

Phase 2 is a manual agency operation. The Phase 1 demo tool is the production tool.
Automate nothing yet. Validate pricing and demand with real paying customers first.

**Target milestone:** 10 clients × $200/mo = $2,000 MRR before writing any Phase 3 code.

---

## The Agency Pitch

> "I manage your social media reviews for you. Every week, I take your best Google reviews
> and turn them into 3 professional posts for Instagram and Facebook. You do nothing.
> $150–300/month."

---

## Target Leads

**Profile:**
- Local service businesses with 50+ Google reviews
- Facebook or Instagram page with few / old posts (last post 3+ weeks ago)
- 1–5 employees, no marketing staff

**Best niches:**
1. Salons & barbershops
2. Dental clinics
3. Personal trainers & gyms
4. HVAC / plumbers / electricians
5. Real estate agents

**How to find them:**
1. Google Maps: search "dentist [city]", "salon [city]", etc.
2. Filter by 4+ stars with 50+ reviews
3. Check their Instagram — last post > 3 weeks ago? That's a lead.

---

## Cold Outreach

### Email / DM Template

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

**Key tactic:** Generate a real card using their actual Google review before sending.
Attach it to the outreach. Proof > promises.

---

## Pricing

| Tier | Price | Deliverables |
| --- | --- | --- |
| Starter | $150/mo | 8 posts/month, IG + FB |
| Standard | $250/mo | 16 posts/month, IG + FB + caption |
| Premium | $400/mo | 20 posts/month, all platforms + review reply drafts |

---

## Weekly Operations (Manual)

| Day | Task |
| --- | --- |
| Monday | Pull new Google reviews (via Phase 1 demo tool) |
| Tuesday | Generate cards (demo tool + Canva for branding) |
| Wednesday | Schedule posts via Buffer or Later (free plan) |

**Time per client:** ~1 hour/week. At $200/mo → effective rate $200/hr.

---

## Tools Used (No New Code)

| Tool | Purpose | Cost |
| --- | --- | --- |
| reviewpost.io (Phase 1 demo) | Fetch reviews + generate cards | Free (self-hosted) |
| Canva | Light brand customization on cards | Free |
| Buffer / Later | Schedule posts to IG + FB | Free tier |
| Google Sheets | Track clients, posts, billing | Free |

---

## Success Criteria

- [ ] First paying client by end of Week 4
- [ ] 5 clients by end of Month 2
- [ ] 10 clients by end of Month 3 → trigger Phase 3 build

---

## Phase 2 Infra Additions

No new code. Only Supabase setup (documented in `DATABASE.md`) so it's ready
to activate at the start of Phase 3 without blocking Phase 2 operations.

---

## Week-by-Week Execution

### Week 3–4
- [ ] Build list of 50 local businesses to cold outreach
- [ ] Generate personalized demo cards for each lead
- [ ] Send outreach with attached card
- [ ] Close first paying client

### Month 2
- [ ] Onboard 3–5 clients on manual delivery
- [ ] Collect feedback: what do they want more of?
- [ ] Set up Supabase project (prep for Phase 3, see `DATABASE.md`)
- [ ] Begin planning Phase 3 features based on feedback

### Month 3
- [ ] Scale to 10 clients
- [ ] Document pain points that Phase 3 automation will solve
- [ ] Begin Phase 3 development (auth, Google Business OAuth, dashboard)

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 2 section*
