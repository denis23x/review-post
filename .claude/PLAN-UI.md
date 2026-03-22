# ReviewPost — UI Plan

> Phase 1 only. Next.js 15 App Router. TanStack Query v5 + TanStack Form. Tailwind CSS v4.
> Design source files live in `/design/*.fig` — created and edited with Pencil.dev via MCP.

---

## File Structure

```
app/
├── layout.tsx                  Root layout (providers, fonts)
├── page.tsx                    Landing page  →  /
├── demo/
│   └── page.tsx                Demo tool     →  /demo
├── result/
│   └── page.tsx                Result view   →  /result
└── api/                        (see PLAN-API.md)

components/
├── ui/                         Generic, reusable primitives
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Spinner.tsx
│   └── StarRating.tsx
├── UrlForm.tsx                 TanStack Form — Google Maps URL input
├── ReviewList.tsx              Shows fetched reviews (read-only)
├── CardPreview.tsx             Shows generated PNG card <img>
├── ThemeSelector.tsx           Pick card theme: dark / light / brand
└── DownloadButton.tsx          Triggers PNG download

hooks/
├── useReviews.ts               TanStack Query — fetch /api/reviews
└── useGenerateCard.ts          TanStack Query (mutation) — POST /api/generate-card

lib/
├── queryClient.ts              TanStack Query client singleton
└── validators.ts               Zod schemas for form + API responses

design/
├── card-dark.fig               Pencil.dev source — dark theme card
├── card-light.fig              Pencil.dev source — light theme card
└── card-brand.fig              Pencil.dev source — brand theme card
```

---

## Pages

### `/` — Landing Page (`app/page.tsx`)

**Purpose:** Explain the product in one sentence. Drive to `/demo`.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Logo / wordmark                        │
│                                         │
│  "Turn your Google reviews into         │
│   social posts. Automatically."         │
│                                         │
│  [ Try it free — paste your link ]      │  ← CTA button → /demo
│                                         │
│  3 example cards (static images)        │
└─────────────────────────────────────────┘
```

**Component:** Server Component (no interactivity needed).

---

### `/demo` — The Tool (`app/demo/page.tsx`)

**Purpose:** Accept a Google Maps URL, fetch reviews, let user pick a theme, generate card.

**Layout:**
```
┌─────────────────────────────────────────┐
│  Step 1: Paste your Google Maps link    │
│  ┌───────────────────────────────────┐  │
│  │ https://maps.google.com/...       │  │  ← UrlForm (TanStack Form)
│  └───────────────────────────────────┘  │
│  [ Get reviews ]                        │
│                                         │
│  Step 2: Pick theme    ○ Dark  ○ Light  │  ← ThemeSelector
│                                         │
│  [ Generate post ]                      │  ← triggers /api/score + /api/generate-card
└─────────────────────────────────────────┘
```

**State flow:**
1. User submits URL → `useReviews` query fires → displays review count
2. User picks theme → local state
3. User clicks "Generate post" → `useGenerateCard` mutation fires → redirect to `/result?...`

---

### `/result` — Result View (`app/result/page.tsx`)

**Purpose:** Show the generated card image + caption. Let user download.

**Layout:**
```
┌─────────────────────────────────────────┐
│  [← Back to demo]                       │
│                                         │
│  ┌────────────────────┐                 │
│  │   1080×1080 card   │                 │
│  │   (scaled to fit)  │                 │
│  └────────────────────┘                 │
│                                         │
│  Caption:                               │
│  "Dr. Smith fixed my tooth in 20 mins!  │
│   Couldn't be happier. ⭐⭐⭐⭐⭐"      │
│  [ Copy caption ]                       │
│                                         │
│  [ ↓ Download image ]                   │
└─────────────────────────────────────────┘
```

**Data source:** URL search params (`?cardUrl=...&caption=...&businessName=...`).
Card image is loaded as a `<img src={cardUrl}>` from the API.

---

## TanStack Query — Setup

### `lib/queryClient.ts`

```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5 min
      retry: 1,
    },
  },
})
```

### `app/layout.tsx` — Provider

```tsx
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

---

## `hooks/useReviews.ts`

```ts
import { useQuery } from '@tanstack/react-query'

export function useReviews(url: string | null) {
  return useQuery({
    queryKey: ['reviews', url],
    queryFn: async () => {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!res.ok) throw new Error(await res.text())
      return res.json()
    },
    enabled: !!url,
  })
}
```

---

## `hooks/useGenerateCard.ts`

```ts
import { useMutation } from '@tanstack/react-query'

export function useGenerateCard() {
  return useMutation({
    mutationFn: async (payload: {
      quote: string
      businessName: string
      rating: number
      theme: 'dark' | 'light' | 'brand'
    }) => {
      const res = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Card generation failed')
      const blob = await res.blob()
      return URL.createObjectURL(blob)
    },
  })
}
```

---

## TanStack Form — `components/UrlForm.tsx`

```tsx
'use client'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

const schema = z.object({
  url: z.string().url('Enter a valid Google Maps URL').min(1),
})

export function UrlForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const form = useForm({
    defaultValues: { url: '' },
    onSubmit: ({ value }) => onSubmit(value.url),
  })

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}>
      <form.Field name="url">
        {(field) => (
          <>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="https://maps.google.com/..."
              className="w-full rounded-lg border px-4 py-3 text-sm"
            />
            {field.state.meta.errors.length > 0 && (
              <p className="mt-1 text-xs text-red-500">
                {field.state.meta.errors[0]}
              </p>
            )}
          </>
        )}
      </form.Field>
      <button type="submit" disabled={form.state.isSubmitting}>
        Get reviews
      </button>
    </form>
  )
}
```

---

## Design Workflow — Pencil.dev (OpenPencil)

Pencil.dev is used to design card templates as `.fig` files. The MCP server lets Cursor AI create and modify designs directly.

### MCP Server Setup

Install globally:
```bash
bun add -g @open-pencil/mcp
```

Add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "open-pencil": {
      "command": "openpencil-mcp"
    }
  }
}
```

Install the AI Skill:
```bash
npx skills add open-pencil/skills@open-pencil
```

### Card Design Spec (for AI / Pencil.dev)

Each card is a 1080×1080 frame:

| Element | Dark theme | Notes |
| --- | --- | --- |
| Background | `#1a1a2e` | Full bleed |
| Quote text | `#ffffff`, Inter 48px, bold | Max 3 lines; overflow ellipsis |
| Star row | `#FFD700`, 36px | Repeat ★ × rating |
| Business name | `#aaaaaa`, Inter 24px | Bottom-left, `— Business Name` |
| Subtle watermark | `#ffffff` 10% opacity | Bottom-right, `ReviewPost` |
| Padding | 80px all sides | |

The Satori implementation in `/api/generate-card` mirrors this spec exactly so the exported PNG matches the Pencil.dev design.

### Workflow

1. Open Pencil.dev app on your machine
2. Open `design/card-dark.fig` via `open_file` MCP tool
3. Use `render` (JSX) to prototype layouts
4. Export final frame with `export_image` → PNG reference
5. Match measurements and colors in `PLAN-AI.md` Satori template

---

## Dependencies to Install

```bash
npm install @tanstack/react-query @tanstack/react-form
npm install zod
npm install tailwindcss @tailwindcss/vite   # or postcss, depending on Next config
```

---

## Accessibility Notes

- All interactive elements have visible focus rings (Tailwind `focus-visible:ring-2`)
- Buttons have `aria-label` where icon-only
- `CardPreview` renders with `alt` describing the business name and rating
- Copy and download actions show a brief success toast (no external lib needed — local state)
