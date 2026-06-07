# Feature: Google Places Search Workflow

## Purpose

This feature makes Listing Shield search-first instead of manual-first.

The operator enters a business name and optional official details. The app searches Google Places API server-side, returns candidate listings, applies a suspicion score, and lets the operator review/change classifications.

## User flow

1. Operator enters the business/search name.
2. Operator optionally enters official details:
   - Official phone number
   - Official website
   - Official location/address
   - Official Google Maps URL
3. Operator clicks search.
4. The server calls Google Places Text Search.
5. The app returns matching listings.
6. The system auto-scores listings using official details.
7. Operator reviews and changes the classification manually.

## API design

### POST `/api/places/search`

Request body:

```json
{
  "query": "Flicks and Licks",
  "location": "Accra, Ghana",
  "officialPhone": "+233...",
  "officialWebsite": "https://example.com",
  "officialAddress": "East Legon, Accra"
}
```

Response body:

```json
{
  "results": [
    {
      "placeId": "abc123",
      "name": "Flicks and Licks",
      "address": "Accra, Ghana",
      "phone": "+233...",
      "website": "https://example.com",
      "mapsUrl": "https://maps.google.com/...",
      "rating": 4.4,
      "userRatingCount": 120,
      "score": 10,
      "classification": "likely_original_or_branch",
      "reasons": ["Website matches official website"]
    }
  ]
}
```

## Google API rules

- Use official Google Maps Platform Places API only.
- Keep `GOOGLE_MAPS_API_KEY` server-side.
- Use field masks to limit returned data.
- Do not scrape Google Maps.
- Do not auto-accuse businesses based only on score.

## Files changed

- `lib/scoring.ts`
- `app/api/places/search/route.ts`
- `components/PlacesSearch.tsx`
- `app/page.tsx`
- `app/globals.css`
- `docs/FEATURE_GOOGLE_SEARCH_WORKFLOW.md`

## Setup/config

Add this to `.env.local`:

```bash
GOOGLE_MAPS_API_KEY=your_google_maps_platform_key
```

Then run:

```bash
npm install
npm run dev
```

## Testing notes

- Test with no API key: app should return a safe configuration error.
- Test with a business name and location.
- Test official phone/website filters.
- Confirm the API key is not visible in browser network responses.
- Confirm manual classification dropdowns change the on-screen summary.

## Known issues

- Google API billing must be enabled for live results.
- Search result counts depend on Google Places ranking and available data.
- Phone/website may not always be returned for every place.
- Manual classification changes are not persisted yet.
- Supabase storage will be added in a later feature.
