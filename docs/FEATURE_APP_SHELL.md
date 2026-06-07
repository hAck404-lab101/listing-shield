# Feature: App Shell and Test Dashboard

## Purpose

This feature adds the first runnable Listing Shield web app shell using Next.js.

The goal is to make the repository testable locally before adding Supabase, Google Places API, authentication, or real audit CRUD.

## Files changed

- `package.json`
- `tsconfig.json`
- `next-env.d.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`

## What it includes

- Landing/dashboard hybrid page
- Mock audit statistics
- Mock candidate listing table
- Suspicion scoring preview
- Manual audit positioning text
- Responsive layout using plain CSS

## What it does not include yet

- Supabase connection
- Google Places API search
- Authentication
- Real audit forms
- Real database reads/writes
- Report export

## Setup/config

Run locally:

```bash
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

## Testing notes

Run:

```bash
npm run typecheck
npm run build
```

Expected result:

- TypeScript should pass.
- Next.js build should complete.
- The homepage should load without API keys.

## Security notes

- This feature does not call external APIs.
- No secrets are required.
- API keys must remain server-side when Google Places integration is added later.

## Known issues

- Dashboard data is static/mock data.
- No backend yet.
- No automated tests yet.
