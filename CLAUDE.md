# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (Next.js + TypeScript flat config)
```

No test runner is configured yet (deferred to a later phase).

## Architecture

ReviewPost is a **Next.js 15 App Router** SaaS that converts Google Maps business reviews into branded PNG social cards. Currently Phase 1: stateless demo tool — no auth, no database, no user accounts.

### Core Data Flow

```
POST /api/reviews  → Google Places API v1 → extract reviews
POST /api/score    → Groq (llama-3.3-70b-versatile) → pick best review + generate caption
POST /api/generate-card → Satori (React→SVG) + @resvg (SVG→PNG) → 1080×1080 PNG blob
```

The demo page (`src/app/demo/page.tsx`) orchestrates this 3-step pipeline client-side using TanStack Query mutations and queries.

### Key Constraints

- **`/api/generate-card` must use Node.js runtime** — `@resvg/resvg-js` has native bindings that don't work in the Edge runtime.
- **Satori requires `.ttf` fonts** — `public/fonts/Inter-Regular.ttf` and `Inter-Bold.ttf` are loaded at server render time. `next.config.ts` uses `outputFileTracingIncludes` to bundle them with the serverless function.
- **`/result` page is deferred** — card generation result is handled entirely client-side in the demo page; there is no dedicated `/result` route.

### State Management

- **TanStack Query v5** for server state (reviews fetch, card generation mutation). Config in `src/lib/queryClient.ts` (5-min stale time, 1 retry).
- **TanStack Form v0 + Zod** for the demo URL input form. Schemas live in `src/lib/validators.ts`.
- No global client state store — all state flows through the demo page component.

### API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/reviews` | POST | Fetch reviews via Google Places API v1 (handles short URLs + standard Maps URLs) |
| `/api/score` | POST | AI-score reviews, select best, write caption (Groq) |
| `/api/generate-card` | POST | Render PNG card (Satori + @resvg, Node.js runtime) |

### Card Themes

Three themes are defined in `/api/generate-card`:
- `dark` — `#1a1a2e` bg / white text / gold stars
- `light` — white bg / `#1a1a2e` text / gold stars
- `brand` — `#0f172a` bg / `#f8fafc` text / sky-blue stars

### Auth & Database

Login/signup/forgot-password pages exist as **UI stubs only** — no backend logic. Authentication (Supabase) and billing (Stripe) are deferred to Phase 3.

### Design Files

The `pencil/review-post.pen` file is an **encrypted Pencil design file** — it cannot be read with standard file tools. Use only the Pencil MCP tools (`batch_get`, `batch_design`, `get_screenshot`, etc.) to read or modify it.

### Path Aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`).

### Environment Variables

Required in `.env.local`:
- `GOOGLE_PLACES_API_KEY` — Google Places API v1
- `GROQ_API_KEY` — Groq inference API
- `OPENAI_API_KEY` — present but not actively used in Phase 1
