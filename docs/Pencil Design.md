# ReviewPost — Complete Design Guide for Pencil.dev

> Full specification for the ReviewPost design system, component library, and all application pages.
> Use this document as the single source of truth when creating frames in Pencil.dev.
> Every page, block, modal, form, state, and connection is described below.

---

## 1. Design System Tokens

### 1.1 Color Palette

| Token | Hex | Usage |
| --- | --- | --- |
| `bg-base` | `#0d0d1a` | Page background |
| `bg-surface` | `#1a1a2e` | Cards, sidebar, modals |
| `bg-elevated` | `#222240` | Hover on cards, dropdown menus |
| `bg-input` | `#12122a` | Input fields background |
| `border` | `#2a2a4a` | Borders on cards, inputs, dividers |
| `border-focus` | `#4f46e5` | Input focus ring |
| `text-primary` | `#ffffff` | Headings, body text |
| `text-secondary` | `#94a3b8` | Subtext, labels, metadata |
| `text-muted` | `#4a5568` | Placeholders, disabled text |
| `accent-gold` | `#FFD700` | Stars, highlight accents |
| `accent-indigo` | `#4f46e5` | Primary buttons, active nav items |
| `accent-indigo-hover` | `#4338ca` | Primary button hover |
| `accent-indigo-light` | `#eef2ff` | Indigo badge background (light contexts) |
| `success` | `#22c55e` | Success toasts, connected badges |
| `success-bg` | `#052e16` | Success alert background |
| `warning` | `#f59e0b` | Warning toasts, usage near limit |
| `warning-bg` | `#422006` | Warning alert background |
| `error` | `#ef4444` | Error toasts, validation errors, destructive buttons |
| `error-bg` | `#450a0a` | Error alert background |
| `info` | `#38bdf8` | Info toasts, neutral highlights |
| `overlay` | `rgba(0,0,0,0.7)` | Modal backdrop |
| `white-10` | `rgba(255,255,255,0.1)` | Subtle dividers, watermarks |
| `white-5` | `rgba(255,255,255,0.05)` | Very subtle surface variation |

### 1.2 Typography Scale

Font family: **Inter** (loaded from `public/fonts/Inter-*.ttf`)

| Token | Size | Weight | Line height | Usage |
| --- | --- | --- | --- | --- |
| `display-xl` | 56px | 700 | 1.1 | Hero headline |
| `display-lg` | 40px | 700 | 1.15 | Page headlines |
| `display-md` | 32px | 700 | 1.2 | Section headlines |
| `display-sm` | 24px | 700 | 1.3 | Card titles, modal titles |
| `heading-lg` | 20px | 600 | 1.4 | Sub-section titles |
| `heading-md` | 16px | 600 | 1.5 | Component headers |
| `body-lg` | 16px | 400 | 1.6 | Main body copy |
| `body-md` | 14px | 400 | 1.5 | Default UI text |
| `body-sm` | 13px | 400 | 1.5 | Labels, metadata |
| `caption` | 12px | 400 | 1.4 | Helper text, timestamps |
| `caption-bold` | 12px | 600 | 1.4 | Badges, tags |
| `mono` | 13px | 400 | 1.6 | Code blocks, Place IDs |

### 1.3 Spacing Scale

| Token | Value | Usage |
| --- | --- | --- |
| `space-1` | 4px | Tight gaps within components |
| `space-2` | 8px | Icon-to-text gaps |
| `space-3` | 12px | Input padding, badge padding |
| `space-4` | 16px | Default component padding |
| `space-5` | 20px | Card inner padding |
| `space-6` | 24px | Section inner padding |
| `space-8` | 32px | Between components on a page |
| `space-10` | 40px | Between sections |
| `space-12` | 48px | Large section spacing |
| `space-16` | 64px | Hero / CTA spacing |
| `space-20` | 80px | Card padding (generated post card) |
| `space-24` | 96px | Section vertical padding |

### 1.4 Border Radius

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | 4px | Badges, small tags |
| `radius-md` | 8px | Inputs, buttons |
| `radius-lg` | 12px | Cards, panels |
| `radius-xl` | 16px | Modals |
| `radius-2xl` | 24px | Large featured cards |
| `radius-full` | 9999px | Pill badges, avatars, toggles |

### 1.5 Shadows

| Token | Value | Usage |
| --- | --- | --- |
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.4)` | Inputs on focus |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.5)` | Cards, dropdowns |
| `shadow-lg` | `0 8px 32px rgba(0,0,0,0.6)` | Modals |
| `shadow-glow` | `0 0 20px rgba(79,70,229,0.3)` | Active/focused primary button |

### 1.6 Z-Index Stack

| Token | Value | Usage |
| --- | --- | --- |
| `z-base` | 0 | Normal content |
| `z-sticky` | 10 | Navbar, sidebar |
| `z-dropdown` | 20 | Dropdown menus, tooltips |
| `z-overlay` | 30 | Modal backdrop |
| `z-modal` | 40 | Modal dialog |
| `z-toast` | 50 | Toast notifications |

### 1.7 Breakpoints

| Name | Min width | Usage |
| --- | --- | --- |
| `sm` | 640px | Large phone |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

---

## 2. Icon System

Use **Lucide Icons** (lucide-react). All icons at 20px default, 16px in dense contexts, 24px for feature icons.

**Icons used:**
| Area | Icon names |
| --- | --- |
| Navigation | `LayoutDashboard`, `Star`, `FileText`, `Calendar`, `BarChart2`, `Settings`, `Zap` |
| Auth | `Mail`, `Lock`, `Eye`, `EyeOff`, `LogIn`, `UserPlus` |
| Actions | `Download`, `Copy`, `Check`, `Trash2`, `Edit2`, `Plus`, `RefreshCw`, `ChevronRight`, `ChevronLeft`, `ChevronDown`, `ChevronUp`, `X` |
| Status | `CheckCircle`, `XCircle`, `AlertTriangle`, `Info`, `Clock`, `ArrowUpRight` |
| Platforms | `Instagram`, `Facebook`, `Linkedin` (custom SVG if not in Lucide) |
| Business | `MapPin`, `Building2`, `Image`, `Palette`, `Link`, `Unlink` |
| Content | `Quote`, `Hash`, `FileImage`, `Sparkles` |
| Menu | `Menu`, `PanelLeft`, `PanelLeftClose` |
| Upload | `Upload`, `ImagePlus`, `Paperclip` |

---

## 3. Base Component Library

### 3.1 Button

**Variants:**

| Variant | Background | Text | Border |
| --- | --- | --- | --- |
| `primary` | `#4f46e5` | `#ffffff` | none |
| `secondary` | `#1a1a2e` | `#ffffff` | `1px solid #2a2a4a` |
| `ghost` | transparent | `#94a3b8` | none |
| `destructive` | `#ef4444` | `#ffffff` | none |
| `outline-indigo` | transparent | `#4f46e5` | `1px solid #4f46e5` |
| `gold` | `#FFD700` | `#0d0d1a` | none |

**Sizes:**

| Size | Height | Padding H | Font | Icon |
| --- | --- | --- | --- | --- |
| `sm` | 32px | 12px | 13px/600 | 16px |
| `md` | 40px | 16px | 14px/600 | 20px |
| `lg` | 48px | 24px | 16px/600 | 20px |
| `xl` | 56px | 32px | 18px/700 | 24px |

**States:**
- **Default:** base colors above
- **Hover:** darken background 8%, box-shadow glow for `primary`
- **Active/pressed:** scale 0.97, darken 15%
- **Disabled:** opacity 0.4, cursor-not-allowed
- **Loading:** spinner (16px) replaces or prefixes label, button is disabled, label changes ("Saving…", "Uploading…")
- **Icon-only:** width = height, square aspect ratio, `radius-md`
- **Icon + label:** icon left of label, 8px gap

### 3.2 Input

**Anatomy:** Label (top) → Input field → Helper text / Error text (bottom)

| State | Border | Background | Text |
| --- | --- | --- | --- |
| Default | `#2a2a4a` | `#12122a` | `#ffffff` |
| Focus | `#4f46e5`, box-shadow sm | `#12122a` | `#ffffff` |
| Error | `#ef4444` | `#12122a` | `#ffffff` |
| Disabled | `#2a2a4a` | `#0d0d1a` | `#4a5568` |
| Filled (valid) | `#2a2a4a` | `#12122a` | `#ffffff` |

**Variants:**
- `text` — standard text input, height 44px, radius-md, padding 12px 16px
- `with-icon-left` — icon (20px) at 12px left, text padding-left 44px
- `with-icon-right` — icon at 12px right (e.g., eye toggle for password)
- `textarea` — same styles, min-height 120px, resize-y
- `search` — SearchIcon left, optional clear-X right, radius-full

**Password field:** right-side Eye / EyeOff toggle button (ghost, icon-only, sm)

**Label:** `body-sm`, `text-secondary`, margin-bottom 6px
**Helper text:** `caption`, `text-muted`, margin-top 4px
**Error text:** `caption`, `error`, margin-top 4px, ErrorCircle icon 14px left

### 3.3 Select / Dropdown Field

Styled like input but with ChevronDown icon on right. Opens a dropdown panel (`bg-surface`, `border`, `shadow-md`, `radius-md`) with option items (height 36px, hover `bg-elevated`, active `text-primary`).

### 3.4 Checkbox

24×24px. States: unchecked (`border`, transparent bg), checked (filled `accent-indigo`, Check icon 14px white), indeterminate (dash). Always has a label to its right, 8px gap.

### 3.5 Toggle / Switch

Width 44px, height 24px, `radius-full`. Off: `bg-elevated`. On: `accent-indigo`. Knob is white circle 20px, transitions 150ms. Used in Settings → Notifications.

### 3.6 Radio Button

20px circle. Unchecked: `border` ring. Checked: `border` ring + filled inner dot (10px, `accent-indigo`). Label 8px right.

### 3.7 Badge

Height 22px, `radius-sm`, `caption-bold` text, horizontal padding 8px.

| Variant | Background | Text |
| --- | --- | --- |
| `success` | `#052e16` | `#22c55e` |
| `error` | `#450a0a` | `#ef4444` |
| `warning` | `#422006` | `#f59e0b` |
| `info` | `#0c2a3b` | `#38bdf8` |
| `neutral` | `#1e1e3a` | `#94a3b8` |
| `indigo` | `#1e1b4b` | `#818cf8` |
| `gold` | `#2a2400` | `#FFD700` |

**Status badges used:**
- Pending → `warning`
- Approved → `indigo`
- Scheduled → `info`
- Published → `success`
- Failed → `error`
- Skipped → `neutral`
- Used → `success`

**Platform badges:**
- Instagram → gradient pill `#e1306c` / `#f77737`, white "IG" or logo
- Facebook → `#1877f2` bg, white "FB" or logo
- LinkedIn → `#0a66c2` bg, white "in" or logo

### 3.8 Avatar

Circles only, `radius-full`. Sizes: sm=24px, md=32px, lg=40px.
Content: one or two initials, `body-sm/600`, centered. Background: deterministic color based on initials (7 preset colors from the palette). Fallback: `bg-elevated` + UserIcon.

### 3.9 Spinner

SVG circle with stroke dash animation, 360° rotation, 1s linear infinite.
Sizes: sm=16px, md=20px, lg=32px. Color: current text color (inherits).

### 3.10 Skeleton / Loading Placeholder

`bg-elevated` blocks with shimmer animation (gradient from `bg-elevated` → `bg-surface` → `bg-elevated`, 1.5s ease infinite).
Use `radius-md` to match the real element shape. Sizes match the real content.

### 3.11 Divider

Horizontal: 1px solid `border`, full width, margin 16px 0.
Vertical: 1px solid `border`, height 100% of parent.
With label: centered text in `caption`, `text-muted`, flanked by divider lines. Used in auth forms ("or").

### 3.12 Tooltip

Trigger: hover or focus. Delay: 300ms show, 100ms hide.
Panel: `bg-surface`, `border`, `shadow-md`, `radius-sm`, padding 6px 10px, `caption`, `text-primary`.
Arrow: 6px triangle pointing toward trigger.
Position: auto, prefer top. Z: `z-dropdown`.

---

## 4. Composite Components

### 4.1 Card

Base card shell:
- Background: `bg-surface`
- Border: `1px solid border`
- Border-radius: `radius-lg`
- Padding: `space-5` (20px)
- Shadow: `shadow-md` on hover
- Transition: 150ms

Variants:
- `flat` — no shadow, no hover effect (stat cards)
- `interactive` — hover lifts (shadow-md), border color lightens slightly
- `featured` — gradient border (`accent-indigo` to `#7c3aed`), used for highlighted plan tiers

### 4.2 Modal

**Structure:**
```
┌─── Backdrop (overlay, z-overlay) ────────────────────────────┐
│                                                               │
│  ┌─── Dialog (bg-surface, radius-xl, shadow-lg, z-modal) ──┐ │
│  │  Header: Title (display-sm) + X button (ghost, icon-only)│ │
│  │  ─────────────────── divider ──────────────────────────── │ │
│  │  Body: scrollable content (max-height 70vh)               │ │
│  │  ─────────────────── divider ──────────────────────────── │ │
│  │  Footer: [Cancel (secondary)] [Confirm (primary/destruct)]│ │
│  └───────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

Widths: sm=400px, md=560px, lg=720px, fullscreen on mobile.
Open/close: fade-in backdrop + scale-up dialog (0.95 → 1.0), 200ms ease-out.
Close on: X button, backdrop click, Escape key.

### 4.3 Toast

Position: bottom-right, 16px margin. Stack vertically (newest on top). Max 3 visible.
Width: 360px. Auto-dismiss: 4s. Hover pauses timer.

**Anatomy:**
```
┌──────────────────────────────────────────────┐
│ [Icon 20px]  Message text              [X]   │
└──────────────────────────────────────────────┘
```

| Type | Icon | Border-left 3px | Background |
| --- | --- | --- | --- |
| success | CheckCircle (`success`) | `success` | `success-bg` |
| error | XCircle (`error`) | `error` | `error-bg` |
| warning | AlertTriangle (`warning`) | `warning` | `warning-bg` |
| info | Info (`info`) | `info` | `bg-surface` |

Animation: slide-in from right (translateX 100% → 0), fade out on dismiss.

### 4.4 Inline Alert / Banner

Full-width inside a container. Shows above forms or at top of page sections.

```
┌── [Icon] [Title]  [Description text]  ─────────────────── [X or CTA] ──┐
```

Heights: auto. Padding: 12px 16px. Border-left 4px. Same color coding as Toast.

**Used for:**
- "Your free plan allows 5 posts/month. You've used 4." (warning, billing)
- "Connect Google Business to start pulling reviews." (info, dashboard empty)
- "Meta API access is pending review. Posting is paused." (warning)

### 4.5 Tab Group

**Anatomy:**
```
[Tab 1]  [Tab 2 (active)]  [Tab 3]
──────────────────────────────────   ← full-width underline border
Content area
```

Active tab: `text-primary`, bottom border 2px `accent-indigo`.
Inactive tab: `text-secondary`, no border. Hover: `text-primary`.
Tab height: 44px. Font: `body-md/600`.

Variants:
- `underline` — described above (used in Settings, Posts)
- `pill` — pill-shaped tabs with `bg-elevated` active background (used in smaller contexts)

### 4.6 Step Indicator

Used in `/demo` (3 steps) and `/onboarding` (4 steps).

```
  ●───────●───────○───────○
  1       2       3       4
Done    Active  Upcoming  Upcoming
```

Circle 32px. Done: filled `success`, Check icon. Active: filled `accent-indigo`, number white. Upcoming: `bg-elevated`, number `text-muted`. Connector line: 2px. Done connector: `success`. Upcoming connector: `border`.

### 4.7 Progress Bar

Height 6px, `radius-full`. Track: `border`. Fill: `accent-indigo`. Animated fill on mount.

Labeled variant:
```
Posts this month: 14 / 30
[████████████░░░░░░░░]  47%
```

Warning color at >80%: fill turns `warning`.
Critical at >95%: fill turns `error`.

### 4.8 Empty State

Used on every data-driven page. Centered within its container.

```
       ┌──────────────────────┐
       │                      │
       │    [Icon 48px]       │
       │                      │
       │  Title (heading-lg)  │
       │                      │
       │  Description         │
       │  (body-sm, muted)    │
       │                      │
       │  [Primary CTA btn]   │
       │                      │
       └──────────────────────┘
```

Icon: 48px Lucide icon, `text-muted`, inside 80px circle `bg-elevated`.

### 4.9 Dropdown Menu

Triggered by button (3-dot icon or ChevronDown). Panel: `bg-surface`, `border`, `shadow-md`, `radius-md`, min-width 160px.

Item: height 36px, padding 8px 12px, `body-md`, `text-secondary`. Hover: `bg-elevated`, `text-primary`.
Destructive item: `error` text, ErrorIcon left.
Separator: 1px `border`, margin 4px 0.

### 4.10 Popover / Color Picker

Used in Brand Setup (onboarding) and Settings → Business.

Trigger: color swatch + hex input. Click opens popover panel below.
Panel: HEX input + Hue slider + Saturation/Lightness square picker. Footer: [Cancel] [Apply].

---

## 5. Layout Shells

### 5.1 Public Navbar

Height: 64px. Position: sticky top. Background: `bg-base` with `border-bottom`. Z: `z-sticky`.
Max-content-width: 1200px, centered.

```
┌─────────────────────────────────────────────────────────────────────┐
│  [ReviewPost logo]   Product  Pricing  Blog          [Sign In] [Try Free →] │
└─────────────────────────────────────────────────────────────────────┘
```

- **Logo:** SVG wordmark + star icon, links to `/`
- **Nav links:** Product (scroll to features on `/`), Pricing (`/pricing`), Blog (`/blog`). `body-md`, `text-secondary`, hover `text-primary`.
- **Sign In:** ghost button, md → `/login`
- **Try Free →:** primary button, md → `/demo`
- **Mobile (<768px):** hide nav links and CTA buttons, show hamburger (Menu icon). Hamburger opens a full-height right-side drawer with all links stacked.

**Mobile drawer:**
```
┌──────────────────────────┐
│  [X close]               │
│                          │
│  Product                 │
│  Pricing                 │
│  Blog                    │
│  ──────────────          │
│  Sign In                 │
│  Try Free →              │
└──────────────────────────┘
```

### 5.2 Dashboard Sidebar

Width: 240px expanded, 64px collapsed. Position: fixed left. Height: 100vh. Background: `bg-surface`. Border-right: `1px solid border`. Z: `z-sticky`.

```
┌────────────────────────────┐
│  [ReviewPost logo]   [←]   │  ← collapse toggle
│                            │
│  ○ Dashboard               │  ← nav item
│  ○ Reviews                 │
│  ○ Posts                 3 │  ← badge (pending count)
│  ○ Calendar                │
│  ○ Analytics               │
│  ○ Settings                │
│                            │
│  ─────────────────────     │
│                            │
│  [⚡ Upgrade to Solo]      │  ← only on Free plan (gold, pill)
│                            │
│  ─────────────────────     │
│                            │
│  [A] Alex Johnson     [↓]  │  ← user menu trigger (avatar + name + chevron)
└────────────────────────────┘
```

**Nav item anatomy:** icon (20px) + label (`body-md`) + optional badge.
**Active item:** `bg-elevated`, `text-primary`, `accent-indigo` left border (3px). Inactive: `text-secondary`, hover `text-primary` + `bg-elevated`.

**User menu dropdown (opens above trigger):**
- Account Settings → `/settings`
- —
- Sign Out (destructive icon)

**Collapsed state (64px):** only icons visible, no labels. Tooltip on hover shows label.
**Mobile (<1024px):** sidebar hidden by default, opens as overlay drawer on hamburger click. Backdrop darkens content.

### 5.3 Public Footer

Background: `bg-surface`. Border-top: `1px solid border`. Padding: 48px 0 32px.

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [ReviewPost logo]                                                   │
│  Turn your Google reviews into social posts. Automatically.          │
│                                                                      │
│  Product          Company        Resources       Legal               │
│  ─────────        ───────        ─────────       ─────               │
│  Demo             About          Blog            Terms               │
│  Pricing          Contact        Help Center     Privacy             │
│  Integrations                    API Docs        Cookies             │
│                                                                      │
│  ─────────────────────────────────────────────────────────────────── │
│  © 2026 ReviewPost. All rights reserved.         [IG] [Twitter] [LI] │
└──────────────────────────────────────────────────────────────────────┘
```

### 5.4 Auth Layout

Centered card layout. Full viewport height, background `bg-base`.

Desktop: two-column — left brand panel (40%) + right form panel (60%).
Mobile: single column, form only (brand panel hidden).

**Left brand panel (desktop only):**
```
┌───────────────────────────────────┐
│  Background: bg-surface           │
│                                   │
│  [ReviewPost logo large]          │
│                                   │
│  "Join 500+ local businesses      │
│   turning reviews into reach."    │
│                                   │
│  ┌────────────────────────────┐   │
│  │  Example generated card   │   │
│  │  ★★★★★                    │   │
│  │  "Dr. Kim was amazing..."  │   │
│  │  — Sunshine Dental         │   │
│  └────────────────────────────┘   │
│                                   │
│  [3 avatar circles] +120 this week│
└───────────────────────────────────┘
```

**Right form panel:**
Centered vertically. Max-width 400px.

---

## 6. Navigation Flow Map

```
[ / Landing ]
    │
    ├──→ [/demo] ──→ inline result ──→ [/signup]
    │                                      │
    ├──→ [/pricing]                         │
    │                                      │
    ├──→ [/blog] ──→ [/blog/[slug]]        │
    │                                      │
    ├──→ [/login] ──────────────────────────┤
    │       │                              │
    │       └──→ [/forgot-password]        │
    │                                      │
    └──→ [/signup] ◀────────────────────────┘
             │
             ▼ (first login)
        [/onboarding]
             │
             ▼
        [/dashboard] ←──────────── all sidebar links return here
             │
             ├──→ [/reviews] ──→ [Create Post Modal] ──→ [/posts]
             │
             ├──→ [/posts]
             │       ├──→ [Edit Post Modal]
             │       └──→ [Delete Confirm Modal]
             │
             ├──→ [/calendar]
             │       └──→ [Post Preview Modal]
             │
             ├──→ [/analytics]
             │
             └──→ [/settings]
                     └──→ Stripe Customer Portal (external)
```

**Auth redirect rules:**
- Not logged in + visits `/(dashboard)/*` → redirect to `/login`
- Logged in + visits `/(auth)/*` → redirect to `/dashboard`
- First login (`onboarding_complete = false`) → redirect to `/onboarding` before `/dashboard`

---

## 7. Pages — Detailed Specifications

---

### Page 1: `/` — Landing Page

**Layout:** Full-width, public layout (Navbar + Footer). Max content width 1200px.

---

#### Section 1.1 — Hero

Height: min 100vh on desktop, auto on mobile.
Background: `bg-base` with subtle radial gradient (`bg-surface` center at top).

```
┌──────────────────────────────────────────────────────────────────────┐
│  [Navbar]                                                            │
│                                                                      │
│                         [Pill badge]                                 │
│                   "Now with AI caption writing"                      │
│                                                                      │
│              Turn your best Google reviews                           │
│              into branded social posts.                              │
│              Automatically.                                          │
│                                                                      │
│           Pull reviews → AI picks the best one →                    │
│              Post to Instagram. Zero effort.                         │
│                                                                      │
│  ┌─────────────────────────────────────────────┐                    │
│  │  https://maps.google.com/?cid=...           │  [Generate →]      │
│  └─────────────────────────────────────────────┘                    │
│        No account needed for demo                                    │
│                                                                      │
│  [★★★★★ Trusted by 500+ local businesses]                           │
│                                                                      │
│       ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│       │  Card      │  │  Card      │  │  Card      │                │
│       │  preview   │  │  preview   │  │  preview   │                │
│       │  mock      │  │  mock      │  │  mock      │                │
│       └────────────┘  └────────────┘  └────────────┘                │
└──────────────────────────────────────────────────────────────────────┘
```

**Pill badge:** `bg-elevated`, `border`, `radius-full`, 10px 16px padding, Sparkles icon 14px gold left, `caption-bold` text `text-secondary`.

**Headline:** `display-xl` (56px/700), `text-primary`, centered, max-width 700px.

**Subheadline:** `body-lg`, `text-secondary`, centered, max-width 560px, 16px below headline.

**URL Input + Button:** side by side row on desktop, stacked on mobile. Input: full width, lg size. Button: primary lg "Generate Post →". Below: `caption` `text-muted` "No account needed for demo".

**Social proof line:** avatars (3 overlapping circles, 32px, sm) + "Trusted by 500+ local businesses" `body-sm` `text-secondary`.

**Card preview row:** 3 generated post card mocks at reduced size (280px width each), slight rotation (±3°), drop shadow. Show truncated content: business name, stars, quote excerpt. Horizontal scroll on mobile.

---

#### Section 1.2 — How It Works

Background: `bg-surface` (alternates from hero). Padding: 96px 0.

```
How it works
──────────────────────────────────────────────────────────────
Step 1              Step 2                Step 3
Paste your URL      AI picks the best     Download your card
                    review + writes       ready to post

[MapPin icon]       [Sparkles icon]       [Download icon]

Paste any Google    Our AI scores all 5   Get a 1080×1080
Maps business URL.  reviews and selects   PNG card + caption.
We handle the rest. the most compelling.  Post it anywhere.
```

Each step: card (`bg-elevated`, radius-lg, padding 28px), feature icon in 56px circle (`bg-surface`), step number (`caption-bold`, `text-muted`, top-left), heading (`heading-lg`), body (`body-sm`, `text-secondary`).

Connector: dashed horizontal line between cards (desktop), hidden mobile. Arrow icon at each connector end.

---

#### Section 1.3 — Social Proof / Example Cards

Background: `bg-base`. Padding: 96px 0.

Headline: "See it in action" (`display-md`, centered).
Sub: "Real-style generated cards. Paste your URL to create your own." (`body-lg`, `text-secondary`, centered).

3 example card mocks, side by side (desktop) / scrollable (mobile):

| Card | Business | Theme | Quote excerpt |
| --- | --- | --- | --- |
| Dental clinic | Sunshine Dental | Dark | "Dr. Kim fixed my tooth painlessly…" |
| Barbershop | The Sharp Edge | Light | "Best haircut I've had in years…" |
| Gym | FitCore Studio | Brand | "Changed my life in 6 weeks…" |

Each card mock:
- Aspect ratio 1:1
- Max width 320px on desktop
- Shows full card layout: quote, stars, business name, watermark

Below cards: "Want your business's real reviews here?" + [Try it free →] (primary, md) centered.

---

#### Section 1.4 — Pricing Table

Background: `bg-surface`. Padding: 96px 0.

Headline: "Simple, transparent pricing" (`display-md`, centered).
Sub: "Start free. Upgrade when you're ready." (`body-lg`, `text-secondary`, centered).

4 plan cards in a row (desktop) / 2×2 grid (tablet) / 1 column (mobile).

**Each plan card structure:**
```
┌──────────────────────────────────────┐
│  [Popular badge — Business only]     │
│  Plan name (display-sm)              │
│  Description (body-sm, muted)        │
│                                      │
│  $XX    /month                       │
│  (display-lg, primary)               │
│                                      │
│  [Get Started (primary/secondary)]   │
│                                      │
│  ─────────────────────────────────   │
│                                      │
│  ✓ Feature line (body-sm)            │
│  ✓ Feature line                      │
│  ✓ Feature line                      │
│  ✗ Feature line (muted, strikeout)   │
└──────────────────────────────────────┘
```

| Plan | Price | Features |
| --- | --- | --- |
| **Free** | $0/mo | 5 posts/month, 1 platform, ReviewPost watermark, Basic card themes |
| **Solo** | $19/mo | 30 posts/month, 2 platforms, No watermark, 3 card themes, Caption copy |
| **Business** ★ | $49/mo | Unlimited posts, 3 locations, All platforms, Brand colors + logo, Priority support |
| **Agency** | $149/mo | Unlimited locations, White-label, Team access (5 seats), Custom domain, API access |

★ Business plan: `featured` card variant (gradient border), "Most Popular" badge (`gold`).

Free plan card: `secondary` button "Get Started Free".
Solo/Business/Agency: `primary` button "Start Free Trial".

---

#### Section 1.5 — Feature Comparison Table

Background: `bg-base`. Padding: 96px 0.

Headline: "How we compare" (`display-md`, centered).

Full-width scrollable table on mobile:

| Feature | ReviewPost | Birdeye | NiceJob | WiserReview |
| --- | --- | --- | --- | --- |
| Starting price | $0 | $300+/mo | $75/mo | $19/mo |
| Auto-post to social | ✅ | ✅ | ❌ | ✅ |
| AI review selection | ✅ | ❌ | ❌ | ❌ |
| Branded post cards | ✅ | Partial | ❌ | Partial |
| Simple onboarding | ✅ | ❌ | Partial | ✅ |
| No design skills needed | ✅ | Partial | ❌ | Partial |
| Built for local services | ✅ | ✅ | ✅ | ❌ |
| Free plan available | ✅ | ❌ | ❌ | ❌ |

ReviewPost column: header `accent-indigo` background, ✅ icons `success`.
Other columns: standard. ❌ icons `text-muted`.

---

#### Section 1.6 — FAQ

Background: `bg-surface`. Padding: 96px 0. Max-width 720px centered.

Headline: "Frequently asked questions" (`display-md`, centered).

Accordion: each item is a row with question + ChevronDown. Expanded shows answer. One open at a time.

| # | Question | Answer |
| --- | --- | --- |
| 1 | What if I don't have many reviews? | Google Places API returns up to 5 recent reviews. That's enough — we pick the single best one. Even 3 reviews is plenty to get started. |
| 2 | Do I need to connect my Instagram? | No — for the demo, just download the image and post manually. Auto-posting to Instagram requires connecting your account in Settings. |
| 3 | Is my Google Business data safe? | We only read reviews — we never write, respond, or modify your Google Business Profile without your explicit action. |
| 4 | Can I cancel anytime? | Yes. Cancel from your billing settings. You keep access until the end of your billing period. No hidden fees. |
| 5 | What types of businesses work best? | Any local service business with Google reviews: salons, dental clinics, gyms, HVAC, restaurants, real estate agents. |

Accordion item: `border-bottom`, question `body-md/600` `text-primary`, answer `body-md` `text-secondary`, 16px padding. ChevronDown rotates 180° when open.

---

#### Section 1.7 — Final CTA Banner

Background: `bg-elevated` with `accent-indigo` subtle glow. Padding: 80px 0.

```
         Ready to turn your reviews into reach?
      Try ReviewPost free — no credit card required.
      ────────────────────────────────────────────
               [Try it free →]   [See demo]
```

Headline: `display-md`. Sub: `body-lg` `text-secondary`. Two buttons: primary xl + secondary md.

---

### Page 2: `/demo` — Demo Tool

**Layout:** Public layout (Navbar, no Footer — remove clutter). Content: single column, max-width 640px, centered, padding 80px 24px.

**Step Indicator:** at top of content area. 3 steps: "Paste URL" → "Processing" → "Your Post". Uses Step Indicator component.

---

#### Step 1 — URL Input

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  Paste your Google Maps business URL               │
│  ─────────────────────────────────────────────     │
│  ┌─────────────────────────────────────────────┐   │
│  │  https://maps.google.com/?cid=...           │   │
│  └─────────────────────────────────────────────┘   │
│                                                    │
│  Select card theme:                                │
│  ● Dark   ○ Light   ○ Brand                       │
│                                                    │
│  [Generate Post  →]          (primary, lg, full-w) │
│                                                    │
│  We'll fetch up to 5 recent reviews and pick       │
│  the best one using AI.                            │
│                                                    │
└────────────────────────────────────────────────────┘
```

**URL input:** lg text input, MapPin icon left, clear-X icon right when filled.
**Theme selector:** 3 radio-like pill buttons in a row. Selected: `bg-elevated` + `accent-indigo` border. Unselected: `bg-input` + `border`. Each shows a small color swatch (12px circle) before the label.
**Button:** primary, lg, full-width. Loading state: Spinner + "Fetching reviews…".
**Error inline alert** (shows on API error): `error` variant, below the form. Example: "Could not find this business. Try a different URL."

---

#### Step 2 — Loading Animation

Replaces form content (same container, slide transition).

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  [Spinner 32px]                                    │
│                                                    │
│  Building your post...                             │
│                                                    │
│  ✓ Fetching reviews from Google                   │
│  ✓ AI scoring 5 reviews...                        │
│  ◌ Generating caption...                           │
│  ○ Building your card...                           │
│                                                    │
└────────────────────────────────────────────────────┘
```

Steps animate sequentially. Done: CheckCircle `success`. Active: Spinner small `accent-indigo`. Pending: circle outline `text-muted`. Each step text: `body-md`.

---

#### Step 3 — Result (inline)

Slides in after generation completes.

```
┌────────────────────────────────────────────────────┐
│  [← Try another URL]                               │
│                                                    │
│  ┌────────────────────────────────────────────┐    │
│  │                                            │    │
│  │      Generated card (400×400 preview)      │    │
│  │      theme badge top-right corner          │    │
│  │                                            │    │
│  └────────────────────────────────────────────┘    │
│                                                    │
│  Sunshine Dental              ★★★★★ 4.8            │
│                                                    │
│  Caption                                           │
│  ┌─────────────────────────────────────────────┐   │
│  │  Dr. Kim transformed my dental anxiety       │   │
│  │  into confidence. Best care in the city!     │   │
│  └─────────────────────────────────────────────┘   │
│  [Copy Caption ✓]                                  │
│                                                    │
│  [↓ Download Image]         [Change Theme ↺]       │
│                                                    │
│  ──────────────────────────────────────────────    │
│                                                    │
│  Want this done automatically every week?          │
│  [Start Free Trial →]                              │
│  No credit card required                           │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Card preview:** `radius-xl`, 400px × 400px, img element (actual PNG from API). Theme badge: absolute top-right, `neutral` badge.
**Caption block:** `bg-input`, `border`, `radius-md`, padding 12px, `body-md` `text-primary`, `mono` font-family.
**Copy Caption button:** ghost sm. After click: turns green, Check icon, label "Copied!". Resets after 2s.
**Download Image button:** secondary md. Loading state: Spinner + "Preparing…".
**Change Theme:** ghost sm, RefreshCw icon. Clicking re-generates with next theme without new URL fetch.
**Divider + CTA:** full-width divider, then "Want this done automatically every week?" in `heading-md` centered. Primary button xl full-width "Start Free Trial →". Below: `caption` `text-muted` centered.

---

### Page 3: `/result` — Shareable Result Page

**Layout:** Public layout (Navbar + Footer). Two-column on desktop (lg+), single column mobile.
Content max-width: 1100px.

```
Desktop layout:
┌───────────────────────────────┬──────────────────────────────────────┐
│  Left col (50%)               │  Right col (50%)                     │
│                               │                                      │
│  ┌───────────────────────┐    │  Sunshine Dental                     │
│  │                       │    │  (display-sm)                        │
│  │  Generated card       │    │                                      │
│  │  1:1 ratio            │    │  ★★★★★  4.8 · 128 reviews           │
│  │  (max 480px)          │    │  (body-md, gold stars)               │
│  │                       │    │                                      │
│  └───────────────────────┘    │  Selected review:                    │
│                               │  ┌────────────────────────────────┐  │
│  [Dark Quote Card] badge      │  │ "Dr. Kim transformed my dental  │  │
│                               │  │  anxiety into confidence. Best  │  │
│                               │  │  care in the city!"             │  │
│                               │  └────────────────────────────────┘  │
│                               │  — Maria G.                          │
│                               │                                      │
│                               │  Caption:                            │
│                               │  ┌────────────────────────────────┐  │
│                               │  │ Dr. Kim transformed my dental   │  │
│                               │  │ anxiety into confidence!        │  │
│                               │  └────────────────────────────────┘  │
│                               │  [Copy Caption]                      │
│                               │                                      │
│                               │  Share to:  [IG badge] [FB badge]    │
│                               │                                      │
│                               │  [↓ Download PNG]  (primary, lg)     │
│                               │                                      │
│                               │  [← Generate Another]  [Automate This →] │
└───────────────────────────────┴──────────────────────────────────────┘
```

**Right column details:**
- Business name: `display-sm`, `text-primary`
- Star row: yellow `★` × rating, `body-md` `text-secondary` "· 128 reviews"
- Selected review block: quote-styled, left border 3px `accent-indigo`, `body-lg` italic, author below in `body-sm` `text-muted`
- Caption block: same style as `/demo` step 3
- Platform badges: `Instagram` + `Facebook` badges (see Badge spec)
- "Generate Another" → ghost md → `/demo`
- "Automate This →" → primary md → `/signup`

---

### Page 4: `/signup` — Sign Up

**Layout:** Auth layout (brand panel left, form panel right).

**Form:**
```
                  Create your account
         ─────────────────────────────────────

         [G  Continue with Google]
                  (outline-indigo, lg, full-w)

         ──────────── or ────────────

         Email
         [_______________________________]

         Password
         [_______________________________] [👁]

         [✓] I agree to the Terms of Service and Privacy Policy

         [Create Account]   (primary, lg, full-w)

         Already have an account?  Sign in →
```

**Validation errors (shown below each field on blur/submit):**
- Email empty: "Email is required"
- Email invalid format: "Enter a valid email address"
- Password empty: "Password is required"
- Password < 8 chars: "Password must be at least 8 characters"
- Terms unchecked: inline `error` alert "You must agree to the terms to continue"

**After submit — loading state:** button shows Spinner + "Creating account…"

**After success — email verification screen (replaces form):**
```
         [MailIcon 48px, accent-indigo]

         Check your email

         We sent a confirmation link to
         denis@example.com

         [Resend email]  (ghost, sm)
         [← Back to sign in]  (ghost, sm)
```

**Google OAuth button:** white background, Google logo SVG left, `text-primary` `body-md/600` "Continue with Google".

---

### Page 5: `/login` — Log In

**Layout:** Auth layout (brand panel left, form panel right).

**Form:**
```
                  Welcome back
         ─────────────────────────────────────

         [G  Continue with Google]

         ──────────── or ────────────

         Email
         [_______________________________]

         Password                  Forgot password?
         [_______________________________] [👁]

         [Sign In]   (primary, lg, full-w)

         No account?  Create one free →
```

**Validation errors:** same as signup (email, password required).

**Wrong credentials error:** `error` inline alert above the form: "Incorrect email or password. Try again."

**Loading state:** Spinner + "Signing in…"

---

### Page 6: `/forgot-password` — Password Reset

**Layout:** Auth layout (brand panel shows same content, form panel different).

**Step 1 — Enter email:**
```
         [LockIcon 48px, accent-indigo]

         Reset your password

         Enter your email and we'll send you
         a link to reset your password.

         Email
         [_______________________________]

         [Send Reset Link]  (primary, lg, full-w)

         [← Back to sign in]  (ghost, sm)
```

**After submit:**
```
         [CheckCircle 48px, success]

         Check your email

         If an account exists for denis@example.com
         you'll receive a reset link shortly.

         [← Back to sign in]  (ghost, sm)
```

---

### Page 7: `/onboarding` — Setup Wizard

**Layout:** Full-screen, no navbar/footer. Background `bg-base`. Centered card (`bg-surface`, `radius-xl`, `shadow-lg`), max-width 560px.

Top of card: Step Indicator (4 steps), ReviewPost logo above card.

---

#### Step 1 — Connect Google Business

```
┌────────────────────────────────────────────────────────┐
│  Step 1 of 4                                           │
│                                                        │
│  [Building2 icon 40px, accent-indigo, in circle]       │
│                                                        │
│  Connect Google Business Profile                       │
│  (display-sm)                                          │
│                                                        │
│  We'll automatically pull your latest reviews          │
│  every week and pick the best ones to post.            │
│  (body-md, text-secondary)                             │
│                                                        │
│  [G  Connect Google Business]                          │
│     (outline-indigo, lg, full-w)                       │
│                                                        │
│  ── after connect success ──────────────────────────   │
│  [CheckCircle, success]  Connected: Sunshine Dental    │
│                                                        │
│  [Skip for now →]  (ghost, sm, right-aligned)          │
│                                                        │
│  ─────────────────────────────────────────────────     │
│                        [Continue →]  (primary, md)     │
└────────────────────────────────────────────────────────┘
```

**Connect button states:**
- Default: outline-indigo, Google logo left
- Loading: Spinner + "Connecting…" (disabled)
- Connected: full-width success row: CheckCircle `success` + business name `body-md` + [Disconnect] `ghost sm`

---

#### Step 2 — Connect Social Accounts

```
┌────────────────────────────────────────────────────────┐
│  Step 2 of 4                                           │
│                                                        │
│  [Share icon 40px]                                     │
│                                                        │
│  Connect your social accounts                          │
│                                                        │
│  Where should we publish your posts?                   │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  [IG gradient icon]  Instagram                   │  │
│  │  "Connect your business Instagram account"        │  │
│  │  [Connect Instagram]  (secondary, full-w)         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  [FB blue icon]  Facebook                        │  │
│  │  "Connect your Facebook Page"                     │  │
│  │  [Connect Facebook]  (secondary, full-w)          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  [Skip for now →]  (ghost, sm)                         │
│                                                        │
│  [← Back]  (ghost, sm)           [Continue →] (primary)│
└────────────────────────────────────────────────────────┘
```

**Connected state** (same as Step 1): checkmark + account name + [Disconnect].

---

#### Step 3 — Brand Setup

```
┌────────────────────────────────────────────────────────┐
│  Step 3 of 4                                           │
│                                                        │
│  [Palette icon 40px]                                   │
│                                                        │
│  Make it yours                                         │
│                                                        │
│  Logo                                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │                                                  │  │
│  │   [ImagePlus 32px]  Drag & drop or click         │  │
│  │   PNG, JPG, SVG — max 2MB                        │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│  (border-dashed, bg-input, radius-lg)                  │
│                                                        │
│  Brand color                                           │
│  [████] #1a1a2e  ← color swatch + hex input           │
│                                                        │
│  Preview                                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Mini card preview (200px × 200px)              │  │
│  │   updates live as color/logo changes             │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  [Use default theme]  (ghost, sm)                      │
│                                                        │
│  [← Back]  (ghost, sm)           [Continue →] (primary)│
└────────────────────────────────────────────────────────┘
```

**Dropzone states:**
- Default: dashed border, `bg-input`, center content with icon + text
- Drag over: `border-focus` solid, `bg-elevated`
- File uploaded: shows image thumbnail (64px), filename, filesize, X to remove

**Color picker:** clicking the swatch opens a Popover (see component 4.10). Hex input accepts 6-char hex, live updates swatch and card preview.

---

#### Step 4 — Posting Schedule

```
┌────────────────────────────────────────────────────────┐
│  Step 4 of 4                                           │
│                                                        │
│  [Calendar icon 40px]                                  │
│                                                        │
│  Set your posting schedule                             │
│                                                        │
│  Post on these days:                                   │
│  [Mon] [Tue] [Wed] [Thu] [Fri] [Sat] [Sun]             │
│  (pill checkboxes, Mon+Wed+Fri pre-selected)           │
│                                                        │
│  Preferred time:                                       │
│  [10:00 AM  ▾]  (select dropdown)                      │
│  Options: 8am, 9am, 10am, 11am, 12pm, 1pm...8pm       │
│                                                        │
│  Timezone:                                             │
│  [America/New_York  ▾]  (select with search)           │
│                                                        │
│  [← Back]  (ghost, sm)    [Finish Setup →]  (primary, lg)│
└────────────────────────────────────────────────────────┘
```

**Day picker pills:** row of 7 pill buttons (Mon–Sun). Selected: `bg-elevated`, `accent-indigo` border, `text-primary`. Unselected: `bg-input`, `border`, `text-muted`.

**After "Finish Setup":** loading state, then redirect to `/dashboard` with success toast "You're all set! First reviews will be pulled shortly."

---

### Page 8: `/dashboard` — Main Dashboard

**Layout:** Dashboard layout (Sidebar + main content). Main area padding: 32px.

---

#### 8.1 Page Header

```
Good morning, Alex.
Here's what's ready to post.
(display-sm + body-md text-secondary)
          [+ Generate Post]  (primary, md, right-aligned)
```

"Generate Post" opens the **Create Post Modal** (see Modals Catalog).

---

#### 8.2 Stats Row — 4 Stat Cards

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Reviews     │ │ Published   │ │ Avg. Score  │ │ Scheduled   │
│ This Month  │ │ Posts       │ │             │ │ Posts       │
│             │ │             │ │             │ │             │
│     14      │ │      8      │ │   4.6 ★    │ │      3      │
│             │ │             │ │             │ │             │
│ ↑ +3 vs    │ │ ↑ +2 vs    │ │ → same as  │ │ next: Fri  │
│ last month │ │ last month │ │ last month │ │ 10am       │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

**Stat card anatomy:** `bg-surface`, `border`, `radius-lg`, padding 20px. Label (`caption`, `text-muted`). Value (`display-md`, `text-primary`). Trend line (`caption`, `success`/`error`/`text-muted` + ArrowUpRight / ArrowDownRight / minus icon).

---

#### 8.3 Pending Approval Section

Shown only if there are posts with status `pending`. If 0 pending: hide section entirely.

```
Pending Approval  (heading-lg)  [View all →]  (ghost, sm, right)

┌──────────────────────────────────────────────────────────────────┐
│  [80px thumbnail]  Sunshine Dental                  [IG] [FB]   │
│                    ★★★★★                                        │
│                    "Dr. Kim transformed my dental anxiety…"      │
│                    Caption: Dr. Kim transformed my dental anxiety │
│                    into confidence! Best care in the city!       │
│                                                                  │
│  Mar 12, 2026                [Reject] [Edit] [Approve ✓]        │
└──────────────────────────────────────────────────────────────────┘
```

**Approval card anatomy:**
- Left: 80×80 card thumbnail (`radius-md`, `bg-input` if loading)
- Right: business name (`body-md/600`) + platform badges + star rating + review excerpt (2 lines, truncated) + caption excerpt (2 lines, italicized, `text-secondary`)
- Bottom-right: date `caption text-muted` + 3 action buttons

**Action buttons on approval card:**
- "Reject" → ghost sm, destructive: opens Delete Confirm Modal (or inline confirm tooltip)
- "Edit" → ghost sm → opens Edit Post Modal
- "Approve ✓" → primary sm → inline loading → success toast "Post approved" → card disappears with fade-out

Show max 3 cards. Horizontal scroll on mobile. "View all →" links to `/posts?tab=pending`.

---

#### 8.4 Recent Posts Section

```
Recent Posts  (heading-lg)  [View all →]  (ghost, sm, right)

┌──────┬──────────────────────────────┬──────┬─────────────┬────────┐
│Thumb │Caption                       │IG ↑  │ Mar 8       │  ···   │
│48px  │Dr. Kim transformed my...     │      │ 142 likes   │        │
├──────┼──────────────────────────────┼──────┼─────────────┼────────┤
│Thumb │Best haircut in years! Sharp  │FB    │ Mar 5       │  ···   │
│      │Edge always delivers...       │      │  89 likes   │        │
└──────┴──────────────────────────────┴──────┴─────────────┴────────┘
```

Table rows. 3-dot icon opens row context menu: [View post] [Re-schedule] [Delete].

---

#### 8.5 Next Scheduled Post

```
┌────────────────────────────────────────────────────────────────┐
│  Next Scheduled Post                                           │
│                                                                │
│  [80px thumb]  Publishing in 2 days, 4 hours                  │
│                Friday, March 14 at 10:00 AM                   │
│                Instagram · Facebook                            │
│                                                                │
│                [Edit]  [Cancel post]                           │
└────────────────────────────────────────────────────────────────┘
```

**Empty state (no scheduled posts):**
```
[CalendarIcon 48px, text-muted]
Nothing scheduled yet.
Approve a pending post to schedule your first one.
[View Pending Posts →]  (primary, sm)
```

---

#### 8.6 Dashboard — Info Banner (Free plan only)

Shown at top of main content if user is on Free plan:

```
[Zap icon]  You're on the Free plan.  3 of 5 posts used this month.
[Upgrade to Solo →]  (text-link, accent-indigo)    [Dismiss ×]
```

Warning variant (`warning-bg`, `warning` left border). Dismissible (localStorage).

---

### Page 9: `/reviews` — Review Inbox

**Layout:** Dashboard layout. Main area: filter bar at top, review list below.

---

#### 9.1 Filter Bar

```
[Date range picker ▾]  [Rating: All ▾]  [Status: All ▾]  [Sort: AI Score ▾]
                                                          [14 reviews found]
```

All: select components. Horizontal row, wraps on mobile. "X reviews found" right-aligned, `caption` `text-muted`.

---

#### 9.2 Review Card

```
┌──────────────────────────────────────────────────────────────────────┐
│  [M]  Maria G.                        ★★★★★     AI Score: 0.91 [green]│
│  32px  (body-md/600)                  (gold)    [Used] badge          │
│                                                                       │
│  "Dr. Smith fixed my tooth painlessly in 20 minutes. I was in and    │
│   out in under an hour. Couldn't recommend more highly."              │
│  [Read more ▾]                                                        │
│                                                                       │
│  Pulled Mar 12, 2026                             [Create Post]        │
└──────────────────────────────────────────────────────────────────────┘
```

**AI Score color coding:**
- ≥ 0.7: `success` badge + green score text
- 0.4–0.69: `warning` badge + amber score text
- < 0.4: `error` badge + red score text

**Status badge:** Used / Pending / Skipped (see Badge spec).

**"Read more":** ChevronDown, expands card to show full text. Label changes to "Read less" + ChevronUp.

**"Create Post" button:** primary sm. Opens **Create Post from Review Modal**.

---

#### 9.3 Pagination

Bottom of list:
```
[← Prev]  1  2  3  ...  7  [Next →]
```
Pills: active `bg-elevated` `text-primary`. Others: ghost. On mobile: "Page 2 of 7" text + Prev/Next only.

---

#### 9.4 Empty State — Reviews

```
[Star icon 48px, in circle]
No reviews yet.
Connect your Google Business Profile to start
pulling reviews automatically every week.
[Connect Google Business →]  (primary, md)
```

---

### Page 10: `/posts` — Post Queue

**Layout:** Dashboard layout. Tabs below page heading.

**Page heading:** "Posts" (`display-sm`) + [+ New Post] (primary, md, right).

---

#### Tabs

`Pending Approval (3)` | `Scheduled (5)` | `Published` | `Drafts`
Count badge on tab only if > 0. Active tab: underline variant.

---

#### Post Card (per tab)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [✓]  [64px thumb]  Dr. Kim transformed my dental anxiety...  [IG]  │
│                     Sunshine Dental · ★★★★★                [FB]  │
│                                                                     │
│                     [Pending] badge            Mar 14 at 10am       │
│                                                                     │
│                     [Edit]  [Approve]  [Delete]                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Checkbox (✓):** left of thumbnail. For bulk selection.

**Per-tab action buttons:**
- Pending: [Edit] [Approve] [Delete]
- Scheduled: [Edit] [Reschedule] [Cancel]
- Published: [View] [Re-use]
- Drafts: [Edit] [Delete]

---

#### Bulk Action Toolbar

Appears at top of list when ≥1 post selected. Replaces filter bar.

```
┌─────────────────────────────────────────────────────────────────────┐
│  [x] 3 selected    [Select all]   [Approve all] [Delete all]        │
└─────────────────────────────────────────────────────────────────────┘
```

`bg-elevated`, `border`, `radius-md`, padding 12px 16px. "3 selected" `body-md/600`. Buttons: secondary sm and destructive sm.

---

#### Empty States per Tab

- Pending: "No posts waiting for approval. Reviewed posts appear here."
- Scheduled: "No posts scheduled. Approve a post to schedule it."
- Published: "No posts published yet. Your first published posts will appear here."
- Drafts: "No drafts. Create a post and save it as a draft."

Each: standard Empty State component with relevant icon.

---

### Page 11: `/calendar` — Posting Calendar

**Layout:** Dashboard layout. Main area split: calendar (left, ~75%) + sidebar (right, ~25%).

---

#### 11.1 Calendar Header

```
◀  March 2026  ▶          [Month ▾]  [Week]   [+ Schedule Post]
```

◀ ▶: ghost icon-only sm. Month/Week: pill toggle. "+ Schedule Post": primary sm.

---

#### 11.2 Month Grid

7-column grid. Column headers: Mon Tue Wed Wed Thu Fri Sat Sun (`caption/600`, `text-muted`).

**Day cell:**
- Height: 120px (desktop), 80px (tablet), auto (mobile)
- Top: day number (`caption/600`). Today: number in `accent-indigo` circle.
- Post thumbnail squares: 36×36px each, `radius-sm`, max 3 visible per cell, then "+2 more" label
- Empty cells: `bg-base`
- Out-of-month cells: `opacity: 0.3`
- Hover: `bg-elevated`

**Week view:** 7-column grid with 24 time slots visible. Each post occupies a time slot row, full width of day column. Click to see Post Preview Modal.

---

#### 11.3 Calendar Sidebar

```
┌─────────────────────────┐
│  Upcoming Posts         │
│  (heading-md)           │
│                         │
│  [48px thumb]           │
│  Mar 14 · Fri · 10am   │
│  Instagram              │
│  "Dr. Kim transformed…" │
│  ────────────────────── │
│  [48px thumb]           │
│  Mar 17 · Mon · 10am   │
│  Facebook               │
│  "Best haircut in…"     │
│  ────────────────────── │
│  [+ Schedule Post]      │
│  (primary, sm, full-w)  │
└─────────────────────────┘
```

---

#### 11.4 Empty Calendar State

All day cells empty. Show centered overlay on calendar grid:

```
[Calendar icon 48px]
No posts scheduled.
Start by approving a pending post
or generating one from your reviews.
[View Pending Posts →]  (primary, md)
```

---

### Page 12: `/analytics` — Analytics

**Layout:** Dashboard layout. No tabs. Content in single column.

---

#### 12.1 Stat Cards Row (4 cards)

Same stat card component as Dashboard.

| Card | Value | Trend |
| --- | --- | --- |
| Posts Published | 24 | ↑ +8 vs last month |
| Est. Impressions | 4,820 | ↑ +1,200 vs last month |
| Avg. Engagement | 3.2% | → same as last month |
| Reviews Used | 18 | ↑ +5 vs last month |

---

#### 12.2 Posts Over Time Chart

```
Posts published — last 30 days
─────────────────────────────
  4 │          ██
  3 │    ██   ████  ██
  2 │  ██████████████████
  1 │
  0 └─────────────────────→
    Feb 21              Mar 21
```

BarChart from `recharts`. Bars: `accent-indigo` fill. Tooltip on hover: "3 posts on Mar 8". X-axis: date labels every 5 days. Y-axis: integer count. Responsive container.

---

#### 12.3 Top Performing Posts

```
Top Performing Posts  (heading-lg)  [Last 30 days ▾]

┌───────────────────────────────────────────────────────────────────────┐
│  1  [48px]  "Dr. Kim transformed my dental anxiety…"   142 likes  IG  │
│  2  [48px]  "Best haircut in years! Sharp Edge…"        98 likes  FB  │
│  3  [48px]  "FitCore changed my life in 6 weeks…"       87 likes  IG  │
└───────────────────────────────────────────────────────────────────────┘
```

Rank number `display-sm` `text-muted`. Thumbnail 48px. Caption excerpt `body-sm`. Likes `body-md/600`. Platform badge.

---

#### 12.4 Review Sentiment Summary

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Sparkles icon 20px]  Review Themes                                │
│                                                                     │
│  ● Friendly staff       ████████████████░░░░  18 reviews  positive  │
│  ● Fast service         ████████████░░░░░░░░  12 reviews  positive  │
│  ● Fair pricing         ████████░░░░░░░░░░░░   8 reviews  positive  │
│                                                                     │
│  "AI-generated from your 47 reviews. Updated weekly."               │
└─────────────────────────────────────────────────────────────────────┘
```

Progress bars per theme (colored). Caption at bottom `caption` `text-muted`.

---

### Page 13: `/settings` — Settings

**Layout:** Dashboard layout. Full-width tab group below heading.

**Heading:** "Settings" (`display-sm`)

**Tabs:** Profile | Business | Connections | Schedule | Billing | Notifications

---

#### Settings Tab: Profile

```
Profile Photo
[Avatar 64px]  [Upload new photo]  [Remove]

Full Name
[Alex Johnson_________________________]

Email
[alex@sunshinedental.com_____________] (disabled — tooltip: "Log in with Google")

Change Password
[Current password____________________] [👁]
[New password________________________] [👁]
[Confirm new password________________] [👁]

[Save Changes]  (primary, md)
```

Save Changes: loading → success toast "Profile updated." / error inline alert.

---

#### Settings Tab: Business

```
Business Name
[Sunshine Dental_____________________]

Google Place ID
[ChIJN1t_tDeuEmsRUsoyG83frY4________] (monospace, read-only after connect)
[Copy] icon button right

Logo
[Current logo 64px]  [Change]  [Remove]

Brand Color
[████] #1a1a2e  → opens color picker popover

[Live Card Preview — 200px mini card]

[Save Changes]  (primary, md)
```

---

#### Settings Tab: Connections

3 integration rows:

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Google icon]  Google Business Profile                              │
│                 Sunshine Dental · Last synced Mar 21                │
│                 [Connected ✓]  badge                  [Disconnect]  │
├─────────────────────────────────────────────────────────────────────┤
│  [IG gradient]  Instagram                                            │
│                 @sunshinedental                                     │
│                 [Connected ✓]  badge                  [Disconnect]  │
├─────────────────────────────────────────────────────────────────────┤
│  [FB blue]      Facebook                                             │
│                 Not connected                                       │
│                                                         [Connect]  │
└─────────────────────────────────────────────────────────────────────┘
```

"Disconnect" button → ghost sm destructive → triggers **Disconnect Confirm Modal**.

---

#### Settings Tab: Schedule

Same form as Onboarding Step 4 (day pills, time select, timezone select) + [Save Schedule] primary.

---

#### Settings Tab: Billing

```
Current Plan
┌─────────────────────────────────────────────────────────────────────┐
│  Solo Plan  ·  $19/month                     [Upgrade to Business]  │
│                                                                     │
│  Posts this month                                                   │
│  [████████████░░░░░░░░]  14 / 30  (47%)                             │
│                                                                     │
│  Next billing date: April 1, 2026                                   │
└─────────────────────────────────────────────────────────────────────┘

Billing History
┌─────────────────────────────────────────────────────────────────────┐
│  Mar 1, 2026   Solo Plan    $19.00    [Receipt ↗]                   │
│  Feb 1, 2026   Solo Plan    $19.00    [Receipt ↗]                   │
│  Jan 1, 2026   Solo Plan    $19.00    [Receipt ↗]                   │
└─────────────────────────────────────────────────────────────────────┘

[Manage billing ↗]  (ghost, sm) → Stripe Customer Portal (new tab)

────────────────────────────────────────────────────────────

Danger Zone
[Cancel Subscription]  (destructive, sm)
```

"Cancel Subscription" → **Cancel Subscription Confirm Modal**.

Free plan: no billing history, no usage bar. Show: "[⚡ Upgrade your plan] to remove limits." full-width `info` banner.

---

#### Settings Tab: Notifications

```
Email Notifications

[Toggle]  New reviews available
          "Get notified when new reviews are pulled from Google"

[Toggle]  Post published
          "Confirmation when a post goes live on Instagram or Facebook"

[Toggle]  Weekly summary
          "A digest of your posting activity every Monday"

[Toggle]  Plan limit warning
          "Alert when you're at 80% of your monthly post limit"

[Save Preferences]  (primary, sm)
```

---

### Page 14: `/pricing` — Pricing Page

**Layout:** Public layout (Navbar + Footer). Max content width 960px.

---

#### 14.1 Heading

```
Simple, transparent pricing
─────────────────────────────────────────────────────
No contracts. Cancel anytime. Start free.

[Monthly ▾]  [Annual (save 17%)]  ← billing toggle
(pill toggle, Annual shows green "Save 17%" badge)
```

Annual prices: Solo $15.83/mo (billed $190/yr), Business $40.83/mo (billed $490/yr), Agency $124.17/mo (billed $1,490/yr).

---

#### 14.2 Plan Cards (same as landing, expanded)

4 columns on desktop, 2×2 tablet, 1 column mobile. Full feature checklist per plan:

| Feature | Free | Solo | Business | Agency |
| --- | --- | --- | --- | --- |
| Posts / month | 5 | 30 | Unlimited | Unlimited |
| Locations | 1 | 1 | 3 | Unlimited |
| Platforms | 1 | 2 | All | All |
| Card themes | 1 (dark only) | 3 | 5 | 5 |
| ReviewPost watermark | Yes | No | No | No |
| Brand colors + logo | ✗ | ✗ | ✓ | ✓ |
| Auto-posting | ✗ | ✓ | ✓ | ✓ |
| AI review scoring | ✓ | ✓ | ✓ | ✓ |
| Caption generation | ✓ | ✓ | ✓ | ✓ |
| Approval queue | ✗ | ✓ | ✓ | ✓ |
| Analytics | ✗ | Basic | Full | Full |
| Team seats | 1 | 1 | 2 | 5 |
| White-label | ✗ | ✗ | ✗ | ✓ |
| Custom domain | ✗ | ✗ | ✗ | ✓ |
| Priority support | ✗ | ✗ | ✓ | ✓ |

✓ = CheckCircle `success`. ✗ = `text-muted`, strikethrough text.

---

#### 14.3 FAQ

Same FAQ accordion as landing page, billing-specific questions added:
- "Is there a free trial?" — All paid plans include a 7-day free trial.
- "Can I switch plans?" — Yes, upgrade or downgrade any time. Prorated billing.
- "Do you offer refunds?" — 7-day money-back guarantee on first payment.

---

#### 14.4 Bottom CTA

```
Start free today. No credit card required.
[Get started for free →]  (primary, xl)
Questions? [Talk to us]  (ghost, md)
```

---

### Page 15: `/blog` — Blog Index

**Layout:** Public layout (Navbar + Footer). Max content width 1100px.

---

#### 15.1 Header

```
The ReviewPost Blog
Guides, tips, and strategies for local businesses.
──────────────────────────────────────────────────
[All ●]  [Social Media Tips]  [Review Management]  [Local Business]
```

Category filter: pill tabs, underline variant.

---

#### 15.2 Blog Card Grid

3 columns desktop, 2 tablet, 1 mobile. 6 cards per page.

**Blog card:**
```
┌──────────────────────────────────────────┐
│                                          │
│  [Cover image placeholder 16:9]         │
│  [Category tag badge]                    │
│                                          │
│  5 Ways Local Businesses Waste Their     │
│  Google Reviews                          │
│  (heading-lg, 2 lines max)               │
│                                          │
│  A step-by-step guide to repurposing     │
│  customer feedback into social content.  │
│  (body-sm, text-secondary, 3 lines)      │
│                                          │
│  Mar 15, 2026  ·  5 min read            │
│  (caption, text-muted)                   │
└──────────────────────────────────────────┘
```

**3 placeholder posts:**
1. "5 Ways Local Businesses Waste Their Google Reviews" — Social Media Tips — Mar 15
2. "Why Your Dental Practice Needs to Repost Reviews on Instagram" — Review Management — Mar 10
3. "How to Get More Google Reviews Without Asking Awkwardly" — Local Business — Mar 5

---

#### 15.3 Pagination

Same pagination component as Reviews page.

---

### Page 16: `/blog/[slug]` — Blog Article

**Layout:** Public layout. Content max-width 720px, centered.

```
[Category tag]  ·  5 min read  ·  Mar 15, 2026

5 Ways Local Businesses Waste Their Google Reviews
(display-lg)

By Alex Johnson                     [Share IG] [Share Twitter] [Copy link]

[Cover image, 16:9, radius-lg, full-width]

─── Article body ───────────────────────────────────────────────────────

  h2 headings (display-sm)
  body-lg paragraphs (1.7 line-height)
  blockquotes: left-border 4px accent-indigo, bg-elevated, italic

── End of article ──────────────────────────────────────────────────────

About ReviewPost
┌────────────────────────────────────────────────────────────────────┐
│  Turn your Google reviews into social posts. Automatically.        │
│  [Try it free →]  (primary, md)                                    │
└────────────────────────────────────────────────────────────────────┘

Related Posts  (heading-lg)
[2 blog cards in a row]
```

---

### Page 17: `/404` — Not Found

**Layout:** Public layout (Navbar, no Footer). Content centered, full height.

```
        404
        (display-xl, text-muted, font-mono)

        This page doesn't exist.
        (heading-lg, text-primary)

        The page you're looking for may have been
        moved, renamed, or doesn't exist.
        (body-md, text-secondary)

        [← Back to Home]   [Try the Demo →]
        (secondary, lg)    (primary, lg)
```

---

## 8. Modal Catalog

### Modal 1: Edit Post

Trigger: "Edit" button on any post card. Size: lg (720px).

```
Header: Edit Post

Body (two columns):
  Left col (320px):
    Card preview (live update)

  Right col:
    Caption
    [Textarea, 4 rows, current caption]
    (max 150 chars, character counter bottom-right)

    Theme
    [Dark ●] [Light ○] [Brand ○]
    (pill radio group, clicking updates left preview)

    Format
    [Square (1:1) ●] [Story (9:16) ○]

    Platforms
    [☑ Instagram] [☑ Facebook]

    Schedule
    [Date picker] [Time select]

Footer: [Cancel] [Save as Draft] [Save + Approve]
```

"Save + Approve" = primary, saves and sets status to `approved`.

---

### Modal 2: Post Preview (from Calendar)

Trigger: click a post thumbnail in calendar. Size: md (560px).

```
Header: Scheduled Post  [Open in Posts →] (ghost, sm, right)

Body:
  [Card image, centered, 300px]

  Platform: [IG badge] [FB badge]
  Scheduled: Friday, Mar 14 at 10:00 AM

  Caption:
  "Dr. Kim transformed my dental anxiety into confidence!"

  Review:
  "Dr. Smith fixed my tooth painlessly in 20 minutes…"
  — Maria G. ★★★★★

Footer: [Close] [Edit] [Cancel Post]
```

---

### Modal 3: Create Post from Review

Trigger: "Create Post" button on a review card. Size: lg (720px).

```
Header: Create Post from Review

Body:
  Review:
  [Review text, bg-input block, read-only]
  — Maria G. ★★★★★

  Generated Caption:
  [Textarea — pre-filled by AI, editable]
  (max 150 chars, counter)

  Theme:  [Dark ●] [Light ○] [Brand ○]
  Format: [Square ●] [Story ○]

  [Card preview, 240px, right side or below]

  Platforms: [☑ IG] [☑ FB]

  Schedule:
  ○ Add to queue (post at next scheduled time)
  ● Pick a date: [Date picker] [Time select]

Footer: [Cancel] [Save as Draft] [Approve + Schedule]
```

---

### Modal 4: Delete Confirmation

Trigger: any Delete/Reject button. Size: sm (400px).

```
Header: Delete post?

Body:
  [Trash2 icon 32px, error, centered]
  Are you sure you want to delete this post?
  This action cannot be undone.

Footer: [Cancel] [Delete] (destructive primary)
```

---

### Modal 5: Disconnect Account Confirmation

Trigger: "Disconnect" in Settings → Connections. Size: sm (400px).

```
Header: Disconnect Google Business?

Body:
  [Unlink icon 32px, warning, centered]
  Disconnecting Google Business will stop
  automatic review syncing.
  You can reconnect at any time.

Footer: [Cancel] [Disconnect] (destructive primary)
```

---

### Modal 6: Upgrade Plan Prompt

Trigger: exceeding plan limits (5 posts/mo on Free) or clicking "Upgrade". Size: md (560px).

```
Header: Upgrade your plan

Body:
  [Zap icon 40px, gold, centered]
  You've reached your limit of 5 posts this month.
  Upgrade to keep posting without limits.

  [Solo plan card — compact]   [Business plan card — featured]

Footer: [Maybe later] [Compare plans →] [Upgrade to Solo $19/mo]
```

"Compare plans →" ghost → `/pricing`. "Upgrade" → primary → Stripe checkout.

---

### Modal 7: Cancel Subscription Confirmation

Trigger: "Cancel Subscription" in Settings → Billing. Size: sm (400px).

```
Header: Cancel subscription?

Body:
  You'll lose access to:
  ✗ Auto-posting to Instagram & Facebook
  ✗ More than 5 posts per month
  ✗ No watermark on cards

  Access continues until April 1, 2026.

Footer: [Keep my plan] [Cancel subscription] (destructive, outlined)
```

---

## 9. Toast Catalog

All toasts use bottom-right position, 4s auto-dismiss.

| Event | Type | Message |
| --- | --- | --- |
| Post approved | success | "Post approved and added to queue." |
| Post rejected | info | "Post removed from queue." |
| Caption copied | success | "Caption copied to clipboard." |
| Image downloaded | success | "Image downloaded successfully." |
| Post deleted | success | "Post deleted." |
| Post scheduled | success | "Post scheduled for Friday, Mar 14 at 10am." |
| Settings saved | success | "Settings saved." |
| Password changed | success | "Password updated." |
| Account disconnected | info | "Google Business disconnected." |
| Card generation failed | error | "Card generation failed. Try again." |
| API quota exceeded | error | "Google API limit reached. Try again in a few hours." |
| File too large | error | "File too large. Maximum size is 2MB." |
| Network error | error | "Something went wrong. Check your connection." |
| Session expired | warning | "Your session expired. Please sign in again." |

---

## 10. Inline Alert Catalog

Appear inside pages, not floating.

| Location | Type | Message |
| --- | --- | --- |
| Dashboard top (Free plan) | warning | "You've used 4 of 5 posts this month. [Upgrade →]" |
| Reviews (not connected) | info | "Connect Google Business to start pulling reviews. [Connect →]" |
| Posts (Meta not connected) | warning | "Instagram not connected. Posts will download-only. [Connect →]" |
| Settings → Connections | info | "Meta API approval pending. Auto-posting paused." |
| Settings → Billing (at limit) | error | "You've reached your monthly post limit. [Upgrade]" |
| Login form | error | "Incorrect email or password. Try again." |
| Signup form | error | "An account with this email already exists. [Sign in →]" |

---

## 11. Empty States Catalog

| Page / Section | Icon | Title | Body | CTA |
| --- | --- | --- | --- | --- |
| Reviews | Star | No reviews yet | Connect Google Business to start pulling reviews | Connect Google Business |
| Posts — Pending | FileText | No pending posts | Reviews go here after AI processing | View Reviews |
| Posts — Scheduled | Calendar | Nothing scheduled | Approve a post to schedule it | View Pending |
| Posts — Published | CheckCircle | No posts published yet | Published posts appear here | View Pending |
| Posts — Drafts | FileText | No drafts | Save a post as draft to find it here | + New Post |
| Calendar | Calendar | No posts scheduled | Approve posts to schedule them | View Pending |
| Analytics | BarChart2 | Not enough data | Publish a few posts to see analytics | View Posts |
| Dashboard — Next Scheduled | Clock | Nothing scheduled | Approve a pending post | View Pending |

---

## 12. Form Validation States Reference

All forms use same pattern: blur-on-field or submit-triggered validation.

| Field | Empty error | Format error | Server error |
| --- | --- | --- | --- |
| Email | "Email is required" | "Enter a valid email address" | "Email already in use" |
| Password | "Password is required" | "Min 8 characters" | — |
| New password | "New password is required" | "Min 8 characters" | — |
| Confirm password | "Please confirm your password" | "Passwords do not match" | — |
| Business name | "Business name is required" | — | — |
| Brand color hex | — | "Enter a valid hex color (e.g. #1a1a2e)" | — |
| Google Maps URL | "Please paste a Google Maps URL" | "This doesn't look like a Google Maps link" | "Could not find this business" |
| Caption | — | "Max 150 characters" | — |

---

## 13. Responsive Behavior Summary

| Element | Mobile (<768px) | Tablet (768–1024px) | Desktop (1024px+) |
| --- | --- | --- | --- |
| Navbar | Logo + hamburger → drawer | Logo + nav links + CTA | Full navbar |
| Dashboard sidebar | Hidden, hamburger toggle, overlay | Hidden, hamburger toggle | Always visible, 240px |
| Landing hero | Stacked, full-width input | Two columns | Two columns + card mocks row |
| Stats row | 2×2 grid | 4-col row | 4-col row |
| Plan cards | 1 column | 2×2 | 4 columns |
| Comparison table | Horizontal scroll | Horizontal scroll | Full table |
| Post queue | Single column cards | Grid 2 cols | Grid 2 cols |
| Calendar | List of upcoming posts (no grid) | Simplified month grid | Full month grid + sidebar |
| Analytics chart | Bar chart full-width | Same | Same + top posts table |
| Blog grid | 1 column | 2 columns | 3 columns |
| Auth layout | Form only, centered | Form only, centered | Brand panel left + form right |
| Modal | Full-screen | Centered 90vw | Fixed max-width (400–720px) |

---

## 14. Page Connection Reference

| From | Trigger | To |
| --- | --- | --- |
| Navbar "Try Free →" | click | `/demo` |
| Navbar "Sign In" | click | `/login` |
| Landing hero input | submit | `/demo` |
| Landing pricing CTA | click | `/signup` |
| Demo result "Start Free Trial" | click | `/signup` |
| Result "Generate Another" | click | `/demo` |
| Result "Automate This" | click | `/signup` |
| Login "No account?" | click | `/signup` |
| Login "Forgot password?" | click | `/forgot-password` |
| Signup "Already have account?" | click | `/login` |
| Signup success (first login) | auto-redirect | `/onboarding` |
| Signup success (returning) | auto-redirect | `/dashboard` |
| Onboarding "Finish Setup" | submit | `/dashboard` |
| Dashboard "View all →" (pending) | click | `/posts?tab=pending` |
| Dashboard sidebar: Reviews | click | `/reviews` |
| Dashboard sidebar: Posts | click | `/posts` |
| Dashboard sidebar: Calendar | click | `/calendar` |
| Dashboard sidebar: Analytics | click | `/analytics` |
| Dashboard sidebar: Settings | click | `/settings` |
| Reviews "Create Post" | click | Create Post Modal → `/posts` |
| Posts "Edit" | click | Edit Post Modal |
| Calendar post thumbnail | click | Post Preview Modal |
| Settings "Manage billing" | click | Stripe Customer Portal (new tab) |
| Settings "Upgrade" banner | click | Upgrade Plan Modal |
| Footer "Pricing" | click | `/pricing` |
| Footer "Blog" | click | `/blog` |
| Blog card | click | `/blog/[slug]` |
| 404 "Back to Home" | click | `/` |
| User menu "Sign Out" | click | `/login` (session cleared) |
