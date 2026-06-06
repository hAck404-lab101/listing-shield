# Security Checklist

Use this checklist before merging features and before deploying Listing Shield.

## Secrets and environment variables

- Do not commit `.env`, `.env.local`, private keys, or service role keys.
- Keep `GOOGLE_MAPS_API_KEY` server-side only.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.
- Rotate any exposed key immediately.
- Confirm frontend bundles do not contain private keys.

## Google Maps Platform usage

- Use official Google Maps Platform APIs only.
- Do not scrape Google Maps pages.
- Do not automate abusive bulk reporting.
- Store only allowed data.
- Prefer storing Place IDs and internal classifications.
- Respect usage limits and billing alerts.

## API security

- Validate all request bodies.
- Rate-limit search and details endpoints.
- Add authentication before production.
- Return safe error messages to users.
- Log operational errors without leaking secrets.

## Supabase/database

- Enable Row Level Security on all production tables.
- Add policies so users only access their authorized audits.
- Use UUID primary keys.
- Add indexes only to useful high-traffic query fields.
- Avoid storing unnecessary client-sensitive documents.

## Prompt/data safety for AI features

If AI summaries are added later:

- Treat listing data and user notes as untrusted input.
- Do not place user content inside system prompts.
- Wrap user-provided data in clear delimiters.
- Validate generated reports before sending to clients.

## Deployment checklist

- `.env` is not committed.
- Required keys are set in hosting provider.
- API routes are server-only where needed.
- CORS is limited to trusted app domains.
- Rate limiting is active.
- Error pages exist.
- Backups/rollback plan exists.
