# CemCal — Migration from Base44 to Next.js 15 + PostgreSQL

This directory contains the complete migrated codebase. Everything below describes how to get it running.

---

## Stack

| Layer       | Technology                               |
|-------------|------------------------------------------|
| Framework   | **Next.js 15** (App Router, React 19)    |
| Language    | **TypeScript strict**                    |
| Styling     | **Tailwind CSS** + shadcn/ui components  |
| Database    | **PostgreSQL** (Railway / Supabase)      |
| ORM         | **Prisma 5**                             |
| Auth        | **Auth.js v5** (next-auth beta)          |
| Forms       | **React Hook Form** + **Zod** resolvers  |
| Client data | **TanStack Query v5**                    |
| Testing     | **Vitest** (unit) + **Playwright** (e2e) |
| Package mgr | **pnpm**                                 |
| Deploy      | **Vercel** (app) + **Railway** (Postgres)|

---

## Quick Start

### 1. Prerequisites

```bash
node --version   # ≥20
pnpm --version   # ≥9
```

### 2. Clone & install

```bash
# Copy this migration/ folder out of Base44 (or clone your exported repo)
cd cemcal
pnpm install
```

### 3. Environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

- `DATABASE_URL` — your Postgres connection string
- `AUTH_SECRET` — run `openssl rand -base64 32`
- `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` — create a GitHub OAuth App at https://github.com/settings/developers  
  - Homepage URL: `http://localhost:3000`
  - Callback URL: `http://localhost:3000/api/auth/callback/github`
- `AUTH_RESEND_KEY` — Resend API key for magic-link emails (optional; comment out the provider if unused)

### 4. Database setup

```bash
pnpm db:generate    # generate Prisma client
pnpm db:push        # push schema to DB (dev only)
# or for production:
pnpm db:migrate     # create and run named migration

pnpm db:seed        # seed admin user + sample well (optional)
```

### 5. Fix the auth route (platform path limitation)

The file at `src/app/api/auth/nextauth/route.ts` needs to be renamed:

```bash
mv src/app/api/auth/nextauth src/app/api/auth/\[...nextauth\]
```

Then replace the file content with:

```ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

### 6. Run dev server

```bash
pnpm dev
# → http://localhost:3000
```

### 7. Run tests

```bash
pnpm test              # Vitest unit tests
pnpm test:e2e          # Playwright end-to-end (requires running dev server)
pnpm typecheck         # tsc --noEmit
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout + providers
│   ├── globals.css              # Tailwind + design tokens
│   ├── page.tsx                 # Public landing page (Server Component)
│   ├── auth/
│   │   ├── signin/page.tsx      # Sign-in page
│   │   └── verify/page.tsx      # Magic-link verification
│   ├── api/
│   │   ├── auth/[...nextauth]/  # Auth.js handlers
│   │   ├── wells/               # RESTful well CRUD + sections + tally
│   │   └── well-reports/        # Well report upsert endpoint
│   └── dashboard/
│       ├── layout.tsx           # Auth gate + DashboardShell
│       ├── page.tsx             # Calculator modules (tab-driven)
│       ├── wells/page.tsx       # Wells data management
│       └── access-control/     # Admin user list
├── auth.ts                      # Auth.js config (full, with Prisma adapter)
├── auth.config.ts               # Edge-safe auth config (for middleware)
├── middleware.ts                # Route protection via Auth.js
├── components/
│   ├── providers.tsx            # SessionProvider + QueryClient + ThemeProvider
│   ├── dashboard/               # Shell, sidebar, module header, dashboards
│   ├── cemcal/                  # All 5 calculator modules (TypeScript)
│   ├── wells/                   # Wells CRUD client component
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── prisma.ts                # Singleton Prisma client
│   ├── cemcal-engine.ts         # Calculation engine (TS strict)
│   ├── utils.ts                 # cn(), formatDate()
│   └── validations/             # Zod schemas (well, section, auth)
├── types/
│   └── next-auth.d.ts           # Session type augmentation
└── tests/
    ├── setup.ts                 # Vitest + testing-library setup
    ├── unit/
    │   └── cemcal-engine.test.ts  # 20+ unit tests for the engine
    └── e2e/
        └── homepage.spec.ts       # Playwright homepage + auth flow tests
prisma/
├── schema.prisma                # Full Postgres schema
└── seed.ts                      # Seed script
```

---

## Key Architecture Decisions

### Server Components by default
All pages are Server Components. Data is fetched on the server with `auth()` + `prisma.*`. Client components (`"use client"`) are used only for interactivity (forms, calculators, TanStack Query subscriptions).

### TanStack Query for client state
Used in `WellsClient` for mutations and `BaseOfficePlanning` for polling well reports. Server-fetched initial data is passed as `initialData` to avoid waterfalls.

### Auth.js v5 pattern
- `src/auth.ts` — full config with Prisma adapter (Node.js runtime only)
- `src/auth.config.ts` — providers-free config for Edge middleware
- `src/middleware.ts` — protects all non-public routes

### Zod everywhere
All API routes validate request bodies with Zod schemas in `src/lib/validations/`. React Hook Form uses `zodResolver` on every form.

---

## Deployment (Vercel + Railway)

### Database (Railway)
1. Create a Postgres service on Railway
2. Copy the `DATABASE_URL` from Railway → Vercel environment variables
3. Run `pnpm db:migrate --name init` to create the production migration

### Vercel
1. Import the repo
2. Set all env vars from `.env.example`
3. Add the `[...nextauth]` route (see step 5 in Quick Start)
4. Deploy — Vercel auto-detects Next.js

### GitHub OAuth callback URL for production
Update your GitHub OAuth app to add:  
`https://your-domain.vercel.app/api/auth/callback/github`

---

## From Base44 entities → Prisma models

| Base44 Entity   | Prisma Model     | Notes                          |
|-----------------|------------------|--------------------------------|
| `WellReport`    | `WellReport`     | camelCase fields; enums strict |
| `Well`          | `Well`           | `createdById` FK to User       |
| `WellSection`   | `WellSection`    | cascades on well delete        |
| `CasingTally`   | `CasingTally`    | cascades on section delete     |
| `User` (built-in)| `User`          | Auth.js adapter tables added   |

---

## Extending the App

**Add a new calculator module:**
1. Create `src/components/cemcal/my-calc.tsx`
2. Add it to the `MODULES` array in `src/app/dashboard/page.tsx`
3. Add it to the sidebar in `src/components/dashboard/dashboard-shell.tsx`

**Add a new entity:**
1. Add the model to `prisma/schema.prisma`
2. Run `pnpm db:migrate --name add-my-entity`
3. Add Zod validation in `src/lib/validations/`
4. Add API routes in `src/app/api/my-entity/