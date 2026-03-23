# ReviewPost — Phase 3 Auth Plan

> Supabase Auth. Email/password sign-up + optional Google OAuth.
> Server-side session handling via `@supabase/ssr`.

---

## Auth Providers

| Provider | Phase 3 | Notes |
| --- | --- | --- |
| Email/password | ✅ | Default, enable in Supabase Dashboard |
| Google OAuth | ✅ | Requires Google Cloud OAuth app |
| Magic link | Optional | Easy to add, no password needed |

---

## Setup

### Supabase Dashboard

1. Go to **Authentication → Providers**
2. Enable **Email** (on by default)
3. Enable **Google**:
   - Create OAuth credentials at [console.cloud.google.com](https://console.cloud.google.com/)
   - Authorized redirect URI: `https://xxx.supabase.co/auth/v1/callback`
   - Copy Client ID + Secret into Supabase

### Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # server-only, never expose to client
```

---

## Client Setup (`@supabase/ssr`)

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### Server Client (API Routes / Server Components)

```ts
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => cookieStore.set({ name, value, ...options }),
        remove: (name, options) => cookieStore.set({ name, value: '', ...options }),
      },
    }
  )
}
```

### Browser Client (Client Components)

```ts
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

---

## Auth Callback Route

```ts
// app/api/auth/callback/route.ts
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createSupabaseServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL('/dashboard', origin))
}
```

---

## Middleware — Protect Dashboard Routes

```ts
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { /* same as server client */ } }
  )

  const { data: { session } } = await supabase.auth.getSession()

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
```

---

## Auth Pages

```
/login       → Email/password form + "Continue with Google" button
/signup      → Email/password registration
/dashboard   → Protected, requires session
```

---

## Sign-Up / Login Flow

```ts
// Email/password sign-up
await supabase.auth.signUp({ email, password })

// Email/password sign-in
await supabase.auth.signInWithPassword({ email, password })

// Google OAuth
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: { redirectTo: `${origin}/api/auth/callback` },
})

// Sign out
await supabase.auth.signOut()
```

---

*Source: [MVP by Calculon.md](../MVP%20by%20Calculon.md) — Phase 3 Tech Stack + Supabase Auth*
