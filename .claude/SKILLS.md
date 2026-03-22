# ReviewPost — Cursor Agent Skills

> These are Agent Skills to install for this project's development workflow.
> Skills extend Cursor's AI with domain-specific tool knowledge and MCP server capabilities.
> All skills listed here have been verified as safe (open source, local-only or token-scoped).

---

## 1. OpenPencil — Pencil.dev Design MCP

**Purpose:** Lets Cursor AI create, read, and modify `.fig` design files directly.
Covers the full design workflow: card templates, color tokens, layout, export.

**Install:**
```bash
npx skills add open-pencil/skills@open-pencil
```

**MCP config** — add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "open-pencil": {
      "command": "openpencil-mcp"
    }
  }
}
```

**Requires:**
```bash
bun add -g @open-pencil/mcp
```

**Safety:** Local-only. No cloud dependency. File access limited to the working directory.
Stdio transport: no network exposure. `eval` tool available only over stdio (disabled in HTTP mode).

**Use for:**
- Creating `design/card-dark.fig`, `design/card-light.fig`, `design/card-brand.fig`
- Iterating on card layouts without leaving Cursor
- Exporting reference PNGs to cross-check Satori output

---

## 2. Context7 — Library Documentation MCP

**Purpose:** Fetches up-to-date documentation for any library directly into Cursor context.
Critical for TanStack Query v5, TanStack Form, Next.js 15 App Router, Satori, and Supabase — all of which have breaking changes between major versions.

**MCP config** — already in your user rules. Verify it's active:
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": { "CONTEXT7_API_KEY": "${CONTEXT7_API_KEY}" }
    }
  }
}
```

**Usage:** Ask Cursor to "use context7" when working with:
- `@tanstack/react-query` v5 (breaking API vs v4)
- `@tanstack/react-form` v0 (new API)
- `next` v15 App Router
- `satori` latest
- `supabase-js` v2

**Safety:** Read-only API. Token-scoped. No local file access.

---

## 3. Supabase MCP

**Purpose:** Run database queries, inspect schema, manage tables, and push migrations directly from Cursor AI.

**MCP config** — add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest", "--access-token", "${SUPABASE_ACCESS_TOKEN}"]
    }
  }
}
```

**Requires:**
```bash
export SUPABASE_ACCESS_TOKEN=your_supabase_personal_access_token
# Get from: supabase.com/dashboard/account/tokens
```

**Safety:** Scoped to your Supabase account via personal access token. Use a token with minimum required permissions (read + write to `review-post` project only).

**Use for:**
- Creating and running migrations (`businesses`, `reviews`, `posts` tables)
- Inspecting query results during Phase 2 development
- Setting up RLS policies

---

## 4. Vercel MCP

**Purpose:** Deploy, inspect, and manage Vercel projects from Cursor AI. Add env vars, check deployment logs, trigger redeploys.

**MCP config** — add to `.cursor/mcp.json`:
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

**Requires:**
```bash
export VERCEL_TOKEN=your_vercel_token
# Get from: vercel.com/account/tokens  (Full Account scope)
```

**Safety:** Token-scoped. Use a token with read+deploy scope only (not delete).
Vercel tokens do not expire unless manually revoked.

**Use for:**
- Adding environment variables to production without leaving Cursor
- Checking deployment status and build logs
- Managing domains

---

## 5. SequentialThinking MCP

**Purpose:** Step-by-step reasoning for complex problems — API integration debugging, prompt engineering, architecture decisions.

**MCP config** — already in your user rules. Verify:
```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

**Safety:** Local-only. No network access. No file access.

**Use for:**
- Debugging Google Places API URL parsing edge cases
- Reasoning through OpenAI prompt improvements
- Planning the Phase 1 → Phase 2 migration

---

## Full `.cursor/mcp.json` Template

Combine all MCP servers into one file:

```json
{
  "mcpServers": {
    "open-pencil": {
      "command": "openpencil-mcp"
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": "${CONTEXT7_API_KEY}"
      }
    },
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest", "--access-token", "${SUPABASE_ACCESS_TOKEN}"]
    },
    "vercel": {
      "command": "npx",
      "args": ["-y", "vercel-mcp-adapter", "--token", "${VERCEL_TOKEN}"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

---

## Required Environment Variables (for MCP servers)

```bash
# Add to ~/.zshrc or ~/.zshenv
export CONTEXT7_API_KEY=your_context7_key
export SUPABASE_ACCESS_TOKEN=your_supabase_pat
export VERCEL_TOKEN=your_vercel_token
```

---

## Installation Order

1. Install `bun` if not already: `curl -fsSL https://bun.sh/install | bash`
2. Install OpenPencil MCP globally: `bun add -g @open-pencil/mcp`
3. Install OpenPencil Cursor skill: `npx skills add open-pencil/skills@open-pencil`
4. Add all tokens to shell environment
5. Add `.cursor/mcp.json` to the project root
6. Restart Cursor to pick up MCP server changes
7. Verify each server in Cursor Settings → MCP
