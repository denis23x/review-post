# ReviewPost — Infrastructure Plan

> Phase 1: Vercel Hobby (free tier). Zero-config Next.js deploy. GitHub → Vercel auto-deploy.

---

## Stack

| Service | Plan | Cost |
| --- | --- | --- |
| Vercel | Hobby (free) | $0 |
| GitHub | Free | $0 |
| Domain | Any registrar | ~$10/yr |
| Supabase | Free (not used in Phase 1) | $0 |

---

## Vercel — Project Setup

### 1. CLI Setup

```bash
npm install -g vercel
vercel login
vercel link   # link to existing project or create new
```

### 2. Deploy

```bash
vercel          # preview deploy
vercel --prod   # production deploy
```

Or use GitHub integration for automatic deploys (recommended).

### 3. Vercel MCP Server

The official Vercel MCP server allows Cursor AI to deploy, inspect, and manage Vercel projects directly.

**Add to `.cursor/mcp.json`:**

```json
{
  "mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "vercel-mcp-adapter", "--token", "${VERCEL_TOKEN}"]
    }
  }
}
```

**Generate a Vercel token:**
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create a token with **Full Account** scope
3. Add to shell: `export VERCEL_TOKEN=your_token`

**Available MCP capabilities:**
- List, create, and inspect deployments
- Manage environment variables
- Check deployment status and logs
- Manage domains and projects

---

## GitHub Integration

### Repository Setup

```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/review-post.git
git branch -M main
git push -u origin main
```

### Vercel + GitHub Auto-Deploy

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repository `review-post`
3. Vercel auto-detects Next.js — no config needed
4. Every push to `main` → production deploy
5. Every PR → preview deploy (unique URL)

---

## Environment Variables

### Local Development

```bash
# .env.local  (never commit this file)
GOOGLE_PLACES_API_KEY=AIza...
OPENAI_API_KEY=sk-proj-...
```

### Vercel Production

Add via Vercel dashboard or CLI:

```bash
vercel env add GOOGLE_PLACES_API_KEY production
vercel env add OPENAI_API_KEY production
```

Or using the Vercel MCP server tool `add_env_var` in Cursor.

### Phase 2 Additional Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
META_APP_ID=
META_APP_SECRET=
```

---

## Next.js Build Config

### `next.config.ts`

The `outputFileTracingIncludes` option ensures font files in `public/fonts/` are bundled into the Vercel serverless function for `/api/generate-card`. Without it, `readFileSync` will throw in production even though it works locally.

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/generate-card': ['./public/fonts/**/*'],
    },
  },
}

export default nextConfig
```

### Node.js Runtime for Card Generation

The `/api/generate-card` route uses `@resvg/resvg-js` (WASM) which requires Node.js runtime:

```ts
// app/api/generate-card/route.ts
export const runtime = 'nodejs'
```

All other API routes can use the Edge Runtime (faster cold starts).

---

## Domain Setup

1. Buy domain (e.g. `reviewpost.io`) from Namecheap, Cloudflare Registrar, etc.
2. In Vercel dashboard → Project → Domains → Add domain
3. Vercel provides DNS records to add at your registrar
4. SSL is automatic via Let's Encrypt

---

## `.gitignore`

```
# dependencies
node_modules/

# Next.js
.next/
out/

# env
.env
.env.local
.env.*.local

# Vercel
.vercel

# OS
.DS_Store
```

---

## Deployment Checklist (Phase 1 Go-Live)

- [ ] All env vars added to Vercel production
- [ ] `npm run build` succeeds locally with no errors
- [ ] `/api/reviews` tested with 3 real Google Maps URLs
- [ ] `/api/score` tested with sample reviews
- [ ] `/api/generate-card` returns valid PNG for all 3 themes
- [ ] Card downloads correctly in Chrome, Safari, Firefox
- [ ] Caption copy button works on mobile
- [ ] Vercel deployment URL accessible (no 500s in logs)
- [ ] Custom domain pointing to Vercel

---

## Monitoring (Phase 1)

No monitoring needed for Phase 1 (demo tool, personal use).

For Phase 2+:
- **Vercel Analytics** — free with Vercel Hobby
- **Sentry** — error tracking (free tier: 5K errors/month)
- **Upstash** — rate limiting + Redis (free tier available)
