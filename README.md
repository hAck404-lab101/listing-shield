# Listing Shield

Listing Shield is a digital brand protection and Google Maps listing audit tool for restaurants, hotels, shops, and local businesses.

The goal is to help business owners identify possible duplicate, suspicious, or impersonating Google Maps listings, organize evidence, and track reporting progress.

## What this project does

- Stores official business listing details.
- Searches for similar listings through Google Maps Platform Places API.
- Compares possible matches against the verified original listing.
- Scores listings based on suspicion indicators.
- Lets an operator classify listings as original, official branch, suspicious duplicate, likely impersonator, or needs review.
- Tracks reporting status.
- Prepares CSV/PDF-style evidence reports for client work.

## What this project does not do

- It does not scrape Google Maps.
- It does not automatically remove listings.
- It does not promise takedown success.
- It does not store unrestricted Google Places data outside allowed usage rules.

Google makes final decisions on listing edits, reports, and removals. Listing Shield is an audit and workflow support system.

## MVP stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase/PostgreSQL
- Google Maps Platform Places API

## Development workflow

Every feature should be built on a separate branch from `main`.

Each feature must include a Markdown reference file inside `docs/` covering:

- Purpose
- Files changed
- Database/API changes
- Setup/config
- Testing notes
- Security notes
- Known issues

## Initial MVP modules

1. Business profile creation
2. Official listing verification
3. Google Places search
4. Candidate listing scoring
5. Manual classification
6. Evidence/status tracking
7. Report export

## Security reminders

- Never commit `.env`, `.env.local`, or API keys.
- Keep Google API keys server-side only.
- Add rate limiting to API routes.
- Validate all user input.
- Use Supabase Row Level Security before production.
