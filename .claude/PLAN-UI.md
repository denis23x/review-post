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
├── CardPreview.tsx             Shows generated PNG card <img>
├── ThemeSelector.tsx           Pick card theme: dark / light / brand
└── DownloadButton.tsx          Triggers PNG download
# ReviewList.tsx is Phase 2 — Phase 1 shows only review count + author name

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

**Purpose:** Accept a Google Maps URL, fetch reviews, pick a theme, generate and display the card inline.

**Layout — before generation:**
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

**Layout — after generation (inline result, same page):**
```
┌─────────────────────────────────────────┐
│  [← Try another]                        │
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

**State flow:**
1. User submits URL → `useReviews` query fires → displays review count + best match author
2. User picks theme → local `useState`
3. User clicks "Generate post" → `useGenerateCard` mutation fires → on success, store `blobUrl` in local state → show inline result panel
4. Download: `<a href={blobUrl} download="reviewpost.png">` — blob URL is valid for the lifetime of the current tab session

**Why not redirect to `/result`?**
`useGenerateCard` returns a `URL.createObjectURL(blob)` — a `blob:http://...` URL valid only in the current browser tab. Passing it as a URL search param to `/result` would break on navigation. Showing the result inline on `/demo` keeps it simple and reliable for Phase 1.

**`/result` route:** Remove from Phase 1 scope. The page routes in `PLAN.md` list it for completeness — it can be added in Phase 2 once cards are stored in Supabase Storage and accessible via a real URL.

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

### `app/layout.tsx` — Root Layout (Server Component)

The root layout must remain a Server Component. Wrap providers in a separate client component:

```tsx
// app/layout.tsx  ← Server Component, no 'use client'
import { Providers } from '@/components/Providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

```tsx
// components/Providers.tsx
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
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

TanStack Form v0 wires Zod via the `validators` config on `useForm` and per-field. The schema must be connected explicitly — defining it without passing it to `validators` has no effect.

```tsx
'use client'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'

const urlSchema = z.string().url('Enter a valid Google Maps URL')

export function UrlForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const form = useForm({
    defaultValues: { url: '' },
    validatorAdapter: zodValidator(),
    onSubmit: ({ value }) => onSubmit(value.url),
  })

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}>
      <form.Field
        name="url"
        validators={{ onChange: urlSchema }}
      >
        {(field) => (
          <>
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
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

**Additional dependency:**
```bash
npm install @tanstack/zod-form-adapter
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
npm install @tanstack/react-query @tanstack/react-form @tanstack/zod-form-adapter
npm install zod
npm install tailwindcss @tailwindcss/vite   # or postcss, depending on Next config
```

---

## Accessibility Notes

- All interactive elements have visible focus rings (Tailwind `focus-visible:ring-2`)
- Buttons have `aria-label` where icon-only
- `CardPreview` renders with `alt` describing the business name and rating
- Copy and download actions show a brief success toast (no external lib needed — local state)
