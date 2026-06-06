# Listing Shield Project Plan

## Product summary

Listing Shield is an operator-focused audit tool for finding and organizing suspected duplicate, misleading, or impersonating Google Maps listings for legitimate business owners.

It is designed for service providers who help restaurants, hotels, shops, and local businesses protect their online presence.

## Core principle

Listing Shield is an evidence and workflow tool. It must not scrape Google Maps, spam reports, or promise that Google will remove any listing.

## MVP objective

Build a simple dashboard where an operator can:

1. Create a business audit.
2. Save the verified original listing details.
3. Search similar listings using official Google Maps Platform APIs.
4. Review candidate listings.
5. Classify each candidate.
6. Track reporting status.
7. Export an evidence report.

## Suggested stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase/PostgreSQL
- Google Maps Platform Places API

## MVP screens

### Dashboard
- Total audits
- Active audits
- Suspected listings
- Reported listings
- Removed/resolved listings

### Audits list
- Business name
- City/country
- Audit status
- Candidate count
- Last checked date

### Create audit
- Business name
- Owner/client name
- Official Google Maps URL
- Official Place ID
- Official phone
- Official website
- City/country
- Notes

### Audit detail
- Official listing card
- Search controls
- Candidate listings table
- Suspicion score
- Classification dropdown
- Reporting status dropdown
- Evidence notes

### Report export
- Summary
- Original listing
- Candidate listings
- Evidence notes
- Status

## Classifications

- original
- official_branch
- suspicious_duplicate
- likely_impersonator
- needs_review

## Reporting statuses

- not_reported
- prepared
- reported
- pending_review
- removed
- rejected
- monitoring

## Build phases

### Phase 1: Foundation
- Repo docs
- Database schema
- Environment setup
- UI shell

### Phase 2: Audit CRUD
- Create/read/update audits
- Store official listing details
- Candidate listing table

### Phase 3: Google Places integration
- Server-side search endpoint
- Place details endpoint
- Rate limiting
- Error handling

### Phase 4: Scoring and classification
- Suspicion scoring function
- Manual override
- Notes and evidence fields

### Phase 5: Reports
- CSV export
- PDF export
- Client-friendly summary

## Non-goals for MVP

- Automated takedown submissions
- Google Maps scraping
- Browser automation
- Public client portal
- Billing system
