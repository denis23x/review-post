# ReviewPost — Phase 3 UI Plan

> Month 3–6. Next.js 15 App Router. Full product UI: auth pages, onboarding wizard, dashboard, and all feature pages.
> Extends the Phase 1 demo UI. Dark theme throughout. TanStack Query for server state.

---

## Route Groups & File Structure

```
app/
├── layout.tsx                              Root layout (Providers, fonts)
│
├── (public)/                               Public pages — no auth required
│   ├── layout.tsx                          Public layout: Navbar + Footer
│   ├── page.tsx                            / — Landing page
│   ├── demo/
│   │   └── page.tsx                        /demo — Demo tool (Phase 1, unchanged)
│   ├── pricing/
│   │   └── page.tsx                        /pricing — Standalone pricing page
│   └── blog/
│       └── page.tsx                        /blog — Blog index (SEO content hub)
│
├── (auth)/                                 Auth pages — redirect to /dashboard if logged in
│   ├── layout.tsx                          Centered card layout
│   ├── login/
│   │   └── page.tsx                        /login
│   └── signup/
│       └── page.tsx                        /signup
│
└── (dashboard)/                            Protected pages — redirect to /login if not authed
    ├── layout.tsx                          Dashboard layout: Sidebar + main area
    ├── onboarding/
    │   └── page.tsx                        /onboarding — 4-step wizard (first login only)
    ├── dashboard/
    │   └── page.tsx                        /dashboard — Main overview
    ├── reviews/
    │   └── page.tsx                        /reviews — Review inbox
    ├── posts/
    │   └── page.tsx                        /posts — Post queue (tabbed)
    ├── calendar/
    │   └── page.tsx                        /calendar — Scheduling calendar
    ├── analytics/
    │   └── page.tsx                        /analytics — Performance stats
    └── settings/
        └── page.tsx                        /settings — Account + integrations

components/
├── ui/                                     Generic primitives (extend Phase 1)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Spinner.tsx
│   ├── StarRating.tsx
│   ├── Badge.tsx                           Status, platform, score badges
│   ├── Toast.tsx                           Success/error toasts
│   ├── Modal.tsx                           Shared modal shell
│   ├── Tabs.tsx                            Tab group (Posts page)
│   └── Avatar.tsx                          Reviewer initials avatar
│
├── layout/
│   ├── Navbar.tsx                          Public top navigation
│   ├── Sidebar.tsx                         Dashboard sidebar (collapsible)
│   └── Footer.tsx                          Public footer
│
└── features/
    ├── ReviewCard.tsx                      Review inbox card
    ├── PostCard.tsx                        Post queue card
    ├── CardPreview.tsx                     Generated card image preview (Phase 1)
    ├── StepIndicator.tsx                   Onboarding step progress
    ├── ApprovalCard.tsx                    Pending post approval card on dashboard
    ├── StatCard.tsx                        Dashboard stat overview card
    ├── CalendarGrid.tsx                    Month/week calendar view
    └── SentimentSummary.tsx               AI review theme display (Phase 4 prep)

hooks/
├── useReviews.ts                           TanStack Query — /api/reviews (Phase 1)
├── useGenerateCard.ts                      TanStack Query mutation — /api/generate-card (Phase 1)
├── usePosts.ts                             TanStack Query — GET /api/posts (Supabase)
├── useBusinessReviews.ts                   TanStack Query — GET /api/google/reviews
└── useSession.ts                           Supabase auth session (client-side)

lib/
├── queryClient.ts                          TanStack Query client (Phase 1, unchanged)
├── validators.ts                           Zod schemas (Phase 1 + new schemas)
├── supabase/
│   ├── server.ts                           createSupabaseServerClient (see AUTH.md)
│   └── client.ts                           createSupabaseBrowserClient (see AUTH.md)
└── plans.ts                                Plan limits + enforcement helpers
```

---

## Design System

```
Background:        #0d0d1a   (page background)
Card surface:      #1a1a2e   (dashboard cards, modals)
Border:            #2a2a4a
Text primary:      #ffffff
Text muted:        #94a3b8
Accent (stars):    #FFD700
Action (buttons):  #4f46e5   (indigo — primary CTA)
Destructive:       #ef4444
Success:           #22c55e
Font:              Inter (same as Phase 1 card font — already in public/fonts/)
```

---

## Pages

### `/login` & `/signup` (auth layout)

Centered card (max-width 400px) on a dark background.

```
┌──────────────────────────────────────┐
│         ReviewPost logo              │
│                                      │
│   [Continue with Google]             │  ← Supabase Google OAuth
│   ─────── or ──────                  │
│   Email     [___________________]    │
│   Password  [___________________]    │
│   [Sign In / Create Account]         │
│                                      │
│   Forgot password? | Create account  │
└──────────────────────────────────────┘
```

- Google OAuth button calls `supabase.auth.signInWithOAuth({ provider: 'google' })`
- Email/password form uses TanStack Form + Zod validation
- On success → redirect to `/dashboard` (or `/onboarding` if `onboarding_complete = false`)
- Show toast on error ("Invalid credentials", "Email already in use")

---

### `/onboarding` — 4-Step Wizard

`StepIndicator` shows current step (1 of 4, breadcrumb style).
State managed with `useState` — no page navigation between steps.

**Step 1 — Connect Google Business**
```
"Connect Google Business Profile"
[Connect Google Business]  ← OAuth initiation → /api/google/connect
  "We'll pull your best reviews automatically"
[Skip for now →]
```

**Step 2 — Connect Social Accounts**
```
[Connect Instagram]   (Meta OAuth)
[Connect Facebook]    (Meta OAuth)
[Skip for now →]
```
Show connected status with a green checkmark once OAuth completes.

**Step 3 — Brand Setup**
```
Logo:  [drag & drop / file picker]  ← uploads to Supabase Storage
Brand color: [#______] [color swatch]
─── Live card preview (CardPreview component, 400px) ───
[Use default theme]
```
Live preview re-renders the `CardPreview` component as color/logo change.

**Step 4 — Posting Schedule**
```
Post on: [Mon] [Wed] [Fri]  (checkboxes)
Time:    [10:00 AM]  (dropdown)
Timezone:[America/New_York] (select)
[Finish Setup →] → saves to businesses table, redirects to /dashboard
```

---

### `/dashboard` — Main Overview

Left sidebar + main content area. Sidebar collapses to hamburger on mobile.

**Sidebar links:** Dashboard | Reviews | Posts | Calendar | Analytics | Settings | [Upgrade] (if Free plan)

**Main content:**
```
"Good morning, [Name]. Here's what's ready to post."

┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Reviews │ │ Posts   │ │ Avg.    │ │ Sched.  │
│ pulled  │ │ pub'd   │ │ score   │ │ posts   │
│   14    │ │    8    │ │  4.6★   │ │    3    │
└─────────┘ └─────────┘ └─────────┘ └─────────┘

── Pending Approval ──
[ApprovalCard] [ApprovalCard] [ApprovalCard]
  Each: thumbnail | caption excerpt | platform badges | [Approve] [Edit] [Reject]

── Recent Posts ──
List of last 5 published posts (date, platform icon, engagement placeholder)

── Next Scheduled Post ──
Post thumbnail + "Publishing in 2 days, 4 hours"
```

**Data:** Fetched from Supabase via TanStack Query on mount. Use `usePosts` and `useBusinessReviews` hooks.

---

### `/reviews` — Review Inbox

**Filters bar:** Date range | Star rating | Status (All / Used / Pending / Skipped) | Sort (AI Score / Date / Rating)

**Review card:**
```
[M]  Maria G. — ★★★★★                               AI Score: 0.91 [green]
     "Dr. Smith fixed my tooth painlessly in 20 mins.        [Used]
      I was in and out in under an hour..."  [Read more]
     Pulled: Mar 12                          [Create Post]
```

**Empty state:**
```
[icon]
No reviews yet.
Connect your Google Business Profile to start pulling reviews.
[Connect Google Business]
```

---

### `/posts` — Post Queue

**Tabs:** Pending Approval | Scheduled | Published | Drafts

**Post card (per tab):**
```
[thumbnail]  Caption excerpt...                IG  FB
             Status badge  |  Mar 14 at 10am
             [Edit]  [Approve]  [Delete]
```

**Bulk action toolbar** (appears when 1+ selected):
```
[x] 3 selected   [Approve all]  [Delete all]
```

---

### `/calendar` — Posting Calendar

Month view default, toggle to week view. Uses a simple CSS grid calendar — no external calendar library.

```
◀ February 2026         [Month | Week]    [+ Schedule Post]

 Mon   Tue   Wed   Thu   Fri   Sat   Sun
  1     2     3     4     5     6     7
              [▪]
  8     9    10    11    12    13    14
       [▪]         [▪]
```

Each `[▪]` is a small post thumbnail. Click opens a modal with post details.

Sidebar: "Upcoming posts" list (next 7 days).

---

### `/analytics` — Performance Stats

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Posts   │ │Impressions│ │  Avg.    │ │ Reviews  │
│  pub'd   │ │(est.)     │ │ Engage.  │ │  used    │
│   24     │ │  1,840    │ │  3.2%    │ │   18     │
└──────────┘ └──────────┘ └──────────┘ └──────────┘

── Posts over time (last 30 days) ──
[Bar chart — recharts BarChart]

── Top performing posts ──
[thumbnail] Caption excerpt...  142 likes  Mar 8
[thumbnail] Caption excerpt...   98 likes  Mar 3

── Review Sentiment Summary ──
"78% of your reviews mention your staff positively."
(placeholder — Phase 4 AI Upgrade populates this with real data)
```

Use `recharts` for charts. All data is placeholder for Phase 3; Phase 4 connects real engagement data.

```bash
npm install recharts
```

---

### `/settings` — Account & Integrations

Six tabs: Profile | Business | Connections | Schedule | Billing | Notifications

**Profile tab:**
- Name, email (read-only if Google OAuth), change password form

**Business tab:**
- Business name, Google Place ID (read-only once connected), logo upload, brand color

**Connections tab:**
```
Google Business Profile   [Connected ✓]  [Disconnect]
Instagram                 [Not connected] [Connect]
Facebook                  [Not connected] [Connect]
```

**Schedule tab:** Same as onboarding Step 4, editable.

**Billing tab:**
```
Current plan: Solo ($19/mo)
Posts this month: 14 / 30
[Upgrade to Business]
─────────────────────
Billing history: Mar 1, 2026 — $19.00  [Receipt]
[Cancel subscription]  (opens Stripe Customer Portal)
```

**Notifications tab:**
```
[x] New reviews available
[x] Post published
[ ] Weekly summary email
```

---

## TanStack Query Hooks

### `hooks/usePosts.ts`

```ts
import { useQuery } from '@tanstack/react-query'

export function usePosts(status?: string) {
  return useQuery({
    queryKey: ['posts', status],
    queryFn: async () => {
      const url = status ? `/api/posts?status=${status}` : '/api/posts'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch posts')
      return res.json()
    },
  })
}
```

### `hooks/useSession.ts`

```ts
'use client'
import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import type { Session } from '@supabase/supabase-js'

export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  return session
}
```

---

## Middleware (Auth Protection)

See `AUTH.md`. Middleware runs on all `/(dashboard)` routes and redirects unauthenticated users to `/login`.

---

## Public Pages (Phase 3 additions)

### `/pricing`

Same 4-tier table as landing page, expanded:
- Annual/monthly toggle (annual = 2 months free, 17% discount)
- Full feature checklist per plan
- FAQ: cancel anytime, free trial, refund policy
- CTA: "Start free, no credit card required"

### `/blog`

Static grid of blog post cards (6 per page). Placeholder content:
1. "5 Ways Local Businesses Waste Their Google Reviews"
2. "Why Your Dental Practice Needs to Repost Reviews on Instagram"
3. "How to Get More Google Reviews Without Asking Awkwardly"

Each card: cover image placeholder, title, date, read time, category tag.

Niche landing pages (`/for/salons`, `/for/dentists`, etc.) are planned for Phase 4 SEO strategy — see `../phase-4/DISTRIBUTION.md`.

---

## New Dependencies

```bash
npm install recharts
# Supabase + auth (see AUTH.md)
npm install @supabase/supabase-js @supabase/ssr
# Stripe (see PAYMENTS.md)
npm install stripe
```

---

## Accessibility

All Phase 1 rules apply. Additionally:
- Sidebar navigation uses `<nav>` + `aria-current="page"` on active link
- Tab panels use `role="tabpanel"` + `aria-labelledby`
- Calendar cells have `aria-label="March 10, 1 post scheduled"`
- Approval actions (`Approve`, `Reject`) confirm destructive actions with a dialog

---

*Source: [AI Prompt — Build All Pages.md](../AI%20Prompt%20%E2%80%94%20Build%20All%20Pages.md) + [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 3 Dashboard section*
