# ReviewPost — Full Frontend Prompt (Next.js 15, App Router, TypeScript, Tailwind CSS)

## Project Overview

**ReviewPost** is a SaaS tool that pulls Google reviews from local businesses, uses AI to select and rewrite the best ones, generates branded visual cards, and publishes them to social media (Instagram, Facebook) — automatically.

**Tagline:** "Turn your Google reviews into social posts. Automatically."

**Tech Stack:**
- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict)
- Styling: Tailwind CSS
- Auth + DB: Supabase
- Payments: Stripe
- Image Generation: Satori + @resvg/resvg-js (server-side)
- AI: OpenAI GPT-4o-mini
- Social posting: Meta Graph API (Instagram + Facebook)

---

## Pages to Create

Create **all pages listed below** with full layout, components, and realistic placeholder data (no lorem ipsum — use domain-specific copy). Use a dark, modern SaaS design language. Primary color: `#1a1a2e` (dark navy), accent: `#FFD700` (gold for stars), white text on dark backgrounds.

---

### 1. `/` — Landing Page (Public)

**Purpose:** Convert visitors into demo users or sign-ups.

**Sections:**
1. **Hero** — Headline: "Turn your best Google reviews into branded social posts. Automatically." CTA: "Try it free — paste your Google Maps link" (input field). Sub-CTA: "No account needed for demo"
2. **How it works** — 3-step visual flow: (1) Paste Google Maps URL → (2) AI picks the best review + writes caption → (3) Download your branded post card
3. **Social proof** — Example generated cards (3 mock cards: a dental clinic, a barbershop, a gym). Include star ratings and styled quotes.
4. **Pricing table** — 4 tiers:
   - Free: $0 / 5 posts/mo / 1 platform / watermark
   - Solo: $19/mo / 30 posts/mo / 2 platforms / no watermark
   - Business: $49/mo / Unlimited posts / 3 locations / all platforms
   - Agency: $149/mo / Unlimited locations / white-label / team access
5. **Feature comparison table** — ReviewPost vs Birdeye vs NiceJob vs WiserReview (columns: Price, Auto-post social, AI review selection, Simple onboarding, No design skills needed, Local service focus)
6. **FAQ** — 5 common questions (e.g., "What if I don't have many reviews?", "Do I need to connect my social accounts?", "Is my data safe?")
7. **Footer** — Links: Product, Pricing, Blog, Support, Terms, Privacy

---

### 2. `/demo` — Demo Tool (Public, No Auth Required)

**Purpose:** The interactive sales tool. User pastes a Google Maps URL, gets a result in ~10 seconds.

**Layout:**
- Centered single-column layout, max-width 640px
- Step indicator showing current step (1 of 3, 2 of 3, 3 of 3)

**Step 1 — Input:**
- Large text input: "Paste your Google Maps business URL"
- Placeholder: `https://maps.google.com/?cid=...`
- "Generate Post" button (loading state: spinner + "Fetching reviews…")
- Below input: small text "We'll fetch up to 5 recent reviews and pick the best one"

**Step 2 — Loading (intermediate state):**
- Animated steps showing: "Fetching reviews from Google…" → "AI scoring reviews…" → "Generating caption…" → "Building your card…"

**Step 3 — Result preview (inline, no page redirect):**
- Preview of generated card (1080x1080 mock, shown at 400px wide)
- Business name, star rating, quote, card style
- Caption text block (copyable)
- "Download Image" button
- "Copy Caption" button
- Divider: "Want this done automatically every week?"
- CTA: "Start Free Trial" button → `/signup`

---

### 3. `/result` — Result Page (After Demo)

**Purpose:** Shareable/bookmarkable result page after demo generation.

**Layout:**
- Two-column on desktop (card preview left, details right)
- Single column on mobile

**Left column:**
- Generated card image at 1:1 ratio
- Card style badge (e.g., "Dark Quote Card")

**Right column:**
- Business name (large)
- Star rating with numeric score (e.g., ★★★★★ 4.8)
- AI-selected review quote (full text)
- Caption block with "Copy" button
- Platform tags: Instagram / Facebook
- "Download PNG" button
- "Generate Another" → back to `/demo`
- "Automate This" CTA → `/signup`

---

### 4. `/signup` — Sign Up Page (Auth)

**Purpose:** New user registration.

**Fields:**
- Email
- Password
- "Create Account" button
- Google OAuth button ("Continue with Google")
- Link: "Already have an account? Sign in"
- Terms of service checkbox

---

### 5. `/login` — Login Page (Auth)

**Purpose:** Returning user login.

**Fields:**
- Email
- Password
- "Sign In" button
- Google OAuth button
- "Forgot password?" link
- Link: "No account? Create one free"

---

### 6. `/onboarding` — Onboarding Wizard (Auth Required)

**Purpose:** 4-step setup wizard after first login.

**Step 1 — Connect Google Business:**
- "Connect Google Business Profile" OAuth button
- Explanation: "We'll pull your reviews automatically"
- Skip option

**Step 2 — Connect Social Accounts:**
- "Connect Instagram" button (Meta OAuth)
- "Connect Facebook" button (Meta OAuth)
- Checkboxes to select where to post
- Skip option

**Step 3 — Brand Setup:**
- Logo upload (drag-and-drop + file picker)
- Brand color picker (color input + hex field)
- Live preview of card with uploaded brand
- "Use default theme" option

**Step 4 — Posting Schedule:**
- Day picker: checkboxes for Mon–Sun
- Time picker (dropdown: 8am, 9am, ..., 8pm)
- Timezone selector
- "Finish Setup" button → `/dashboard`

---

### 7. `/dashboard` — Main Dashboard (Auth Required)

**Purpose:** Overview of recent activity, pending posts, and quick stats.

**Layout:**
- Left sidebar with navigation (collapsible on mobile)
- Main content area

**Sidebar navigation items:**
- Dashboard (home icon)
- Reviews
- Posts
- Calendar
- Analytics
- Settings
- Upgrade (highlighted if on Free plan)

**Main content:**
- Welcome message: "Good morning, [Name]. Here's what's ready to post."
- **Stats row (4 cards):** Reviews pulled this month | Posts published | Avg. review score | Scheduled posts
- **Pending Approval section:** 2-3 cards each showing: review excerpt, AI caption, card thumbnail, platform badges, "Approve" + "Edit" + "Reject" buttons
- **Recent Posts section:** List/grid of last 5 published posts with date, platform, and engagement placeholder (likes, reach)
- **Next Scheduled Post:** countdown + post thumbnail

---

### 8. `/reviews` — Review Inbox (Auth Required)

**Purpose:** Browse all pulled reviews with AI scores.

**Layout:**
- Table or card list with filters at top

**Filters:**
- Date range
- Star rating (1–5 filter)
- Status: All / Used / Pending / Skipped
- Sort: AI Score (default) / Date / Rating

**Each review card shows:**
- Author name + avatar initial
- Star rating
- Review text (truncated, expand on click)
- AI score badge (e.g., 0.91 — color coded green/yellow/red)
- Status badge
- "Create Post" button
- Date pulled

**Empty state:** "No reviews yet. Connect your Google Business Profile to start pulling reviews." + CTA button

---

### 9. `/posts` — Post Queue (Auth Required)

**Purpose:** Manage all generated posts (pending, scheduled, published).

**Tabs:**
- Pending Approval
- Scheduled
- Published
- Drafts

**Each post card shows:**
- Card thumbnail (small)
- Caption excerpt
- Platform icon (Instagram / Facebook)
- Status badge
- Scheduled date/time (if applicable)
- Action buttons: Edit / Approve / Delete (context-dependent per tab)

**Bulk actions toolbar:** Select all, Approve selected, Delete selected

---

### 10. `/calendar` — Posting Calendar (Auth Required)

**Purpose:** Visual month/week view of scheduled posts.

**Layout:**
- Month view by default, toggle to Week view
- Each day cell shows scheduled post thumbnails (small squares)
- Click on a post to see preview modal

**Sidebar:**
- Upcoming posts list
- "Schedule a Post" quick-action button

---

### 11. `/analytics` — Analytics (Auth Required)

**Purpose:** Basic performance stats.

**Sections:**
- **Overview cards:** Total posts published | Total impressions (placeholder) | Avg. engagement rate | Reviews used
- **Posts over time chart** — line or bar chart (last 30 days)
- **Top performing posts** — sorted by engagement, with thumbnail + caption excerpt
- **Review sentiment summary** — "78% of your reviews mention your staff positively" (AI-generated insight placeholder)

*Note: Use recharts or similar for charts. Use placeholder data.*

---

### 12. `/settings` — Settings (Auth Required)

**Purpose:** Account and integration management.

**Tabs:**
- **Profile** — Name, email, password change
- **Business** — Business name, Google Place ID, logo, brand color
- **Connections** — Google Business (connected/disconnect), Instagram (connected/disconnect), Facebook (connected/disconnect)
- **Schedule** — Posting days/times (same as onboarding step 4, editable)
- **Billing** — Current plan, usage meter, "Upgrade" CTA, billing history, cancel subscription
- **Notifications** — Email toggle: new reviews available, post published, weekly summary

---

### 13. `/pricing` — Pricing Page (Public)

**Purpose:** Standalone pricing page for SEO and direct traffic.

**Content:**
- Same 4-tier pricing table as landing page, expanded with full feature list per tier
- Annual/monthly toggle (annual = 2 months free)
- FAQ section specific to billing (cancel anytime, free trial, refund policy)
- CTA at bottom: "Start free, no credit card required"

---

### 14. `/blog` — Blog Index (Public)

**Purpose:** SEO content hub.

**Layout:**
- Grid of blog post cards (6 per page)
- Each card: cover image placeholder, title, date, read time, category tag
- Categories: Social Media Tips, Review Management, Local Business

**Placeholder titles (3 posts minimum):**
1. "5 Ways Local Businesses Waste Their Google Reviews"
2. "Why Your Dental Practice Needs to Repost Reviews on Instagram"
3. "How to Get More Google Reviews Without Asking Awkwardly"

---

### 15. `/404` — Not Found Page

- Minimal, on-brand
- Message: "This page doesn't exist."
- CTA back to home

---

## Global Requirements

1. **Navigation:** Public pages have a top navbar (logo left, links center, Sign In + Try Free right). Authenticated pages use the sidebar layout from `/dashboard`.
2. **Responsive:** All pages must be fully responsive (mobile-first). Sidebar collapses to hamburger menu on mobile.
3. **Loading states:** All async interactions (buttons, form submits) must have a loading spinner/disabled state.
4. **Empty states:** Every data list (reviews, posts, calendar) must have a proper empty state with icon + message + CTA.
5. **Toasts/notifications:** Use a toast system for success/error feedback (e.g., "Post approved", "Caption copied").
6. **Dark theme:** Default to dark theme. Background: `#0d0d1a`, cards: `#1a1a2e`, borders: `#2a2a4a`, accent: `#FFD700`, primary action buttons: `#4f46e5` (indigo).
7. **Fonts:** Use Inter for UI text, or a clean sans-serif Google Font.
8. **TypeScript:** All components fully typed. No `any`. Props interfaces defined for all components.
9. **File structure:**
   ```
   /app
     /(public)/page.tsx                  → /
     /(public)/demo/page.tsx             → /demo
     /(public)/result/page.tsx           → /result
     /(public)/pricing/page.tsx          → /pricing
     /(public)/blog/page.tsx             → /blog
     /(auth)/login/page.tsx              → /login
     /(auth)/signup/page.tsx             → /signup
     /(dashboard)/onboarding/page.tsx    → /onboarding
     /(dashboard)/dashboard/page.tsx     → /dashboard
     /(dashboard)/reviews/page.tsx       → /reviews
     /(dashboard)/posts/page.tsx         → /posts
     /(dashboard)/calendar/page.tsx      → /calendar
     /(dashboard)/analytics/page.tsx     → /analytics
     /(dashboard)/settings/page.tsx      → /settings
   /components
     /ui        → buttons, inputs, badges, cards, modals, toasts
     /layout    → Navbar, Sidebar, Footer
     /features  → ReviewCard, PostCard, CardPreview, StepIndicator, etc.
   ```
10. **No backend needed:** Use hardcoded mock data (typed TypeScript objects) for all data-driven pages. Backend integration is out of scope for this task.
