# ReviewPost — Development Plan

> Phase 1: Demo MVP (Weeks 1–2)
> Goal: a sales tool, not a product. Input → output in 30 seconds. No login. No database.

---

## Project Summary

**ReviewPost** turns Google reviews from local businesses into branded social media post cards, automatically.

- Paste a Google Maps URL
- AI picks the best review and writes a caption
- App generates a 1080×1080 visual card (Satori)
- User downloads the image and copies the caption

---

## Plan Files

| File | Area |
| --- | --- |
| [PLAN-API.md](./PLAN-API.md) | Google Places API + OpenAI API routes |
| [PLAN-UI.md](./PLAN-UI.md) | Next.js pages, components, TanStack Query/Form, Pencil.dev design |
| [PLAN-AI.md](./PLAN-AI.md) | OpenAI review scoring, caption generation, Satori card rendering |
| [PLAN-DATABASE.md](./PLAN-DATABASE.md) | Supabase setup (Phase 2 prep, not needed for Phase 1) |
| [PLAN-INFRA.md](./PLAN-INFRA.md) | Vercel deployment, env vars, CI/CD |
| [SKILLS.md](./SKILLS.md) | Cursor Agent Skills to install |

---

## Tech Stack

| Layer | Tool | Notes |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | `app/` directory, Server + Client components |
| Language | TypeScript | strict mode |
| Styling | Tailwind CSS v4 | utility-first |
| Data fetching | TanStack Query v5 | async state, caching, loading/error states |
| Forms | TanStack Form v0 | type-safe form state, validation |
| Image generation | Satori + `@resvg/resvg-js` | server-side SVG → PNG, no browser needed |
| Review source | Google Places API | `findplacefromtext` + `place/details` |
| AI | OpenAI GPT-4o-mini | review scoring + caption (~$0.01/generation) |
| Design | Pencil.dev (OpenPencil) | `.fig` files via MCP server — 90+ AI tools |
| Database | Supabase | not used in Phase 1; setup for Phase 2 |
| Hosting | Vercel | zero-config Next.js deploy |
| Domain | Any registrar | ~$10/yr |

---

## Page Routes

```
/           → Landing page: "Paste your Google Maps link"
/demo       → The tool: URL input → reviews → card generation
/result     → Generated card + caption + download button
```

---

## Week-by-Week Execution

### Week 1

- [ ] Bootstrap Next.js 15 project (`create-next-app`)
- [ ] Configure Tailwind CSS v4, TypeScript strict
- [ ] Install TanStack Query v5 + TanStack Form
- [ ] Set up Google Places API key (`.env.local`)
- [ ] Set up OpenAI API key (`.env.local`)
- [ ] Build `/api/reviews` route — fetch reviews from Google Places
- [ ] Build `/api/score` route — AI scoring + caption generation
- [ ] Build `/api/generate-card` route — Satori PNG generation
- [ ] Build `/demo` page with `UrlForm` (TanStack Form)
- [ ] Build `/result` page with card preview + download
- [ ] Deploy to Vercel

### Week 2

- [ ] Design card templates in Pencil.dev (`/design/*.fig`)
- [ ] Polish typography, spacing, brand colors on card
- [ ] Add 2–3 card themes (dark, light, branded)
- [ ] Add Story format (9:16) alongside Square (1:1)
- [ ] Test with 10 real local business Google Maps URLs
- [ ] Get feedback from 3 real business owners
- [ ] Fix edge cases (no reviews, API quota, long text)

---

## Environment Variables

```bash
# .env.local
GOOGLE_PLACES_API_KEY=
OPENAI_API_KEY=
```

---

## Cost Estimate (Phase 1)

| Service | Cost |
| --- | --- |
| Vercel Hobby | Free |
| Google Places API | Free (≤ 2,500 calls/day) |
| OpenAI GPT-4o-mini | ~$0.01 per generation |
| Supabase Free | Free |
| Domain | ~$10/yr |
| **Total/month** | **< $5** |

---

## Success Criteria

- Demo runs in < 30 seconds end-to-end
- A business owner sees their own review as a real post
- They ask "how much?" — signal to move to Phase 2

---

*Phase 2 (Agency Model) and beyond are documented in [MVP by Calculon.md](./MVP%20by%20Calculon.md)*
