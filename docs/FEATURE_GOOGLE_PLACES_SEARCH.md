# Feature: Google Places Search

## Purpose

This feature lets an operator search for candidate Google listings that may be duplicates, suspicious copies, or impersonators of a verified original business listing.

## Important rule

Use official Google Maps Platform APIs only. Do not scrape Google Maps pages.

## User flow

1. Operator opens an audit.
2. Operator enters or confirms the official business name and location.
3. Operator runs a search.
4. System queries Google Places Text Search or Nearby Search server-side.
5. System displays candidate listings for manual review.
6. Operator saves relevant candidates to the audit.

## API design

### POST /api/places/search

Request body:

```json
{
  "auditId": "uuid",
  "query": "Flicks and Licks",
  "location": "Accra, Ghana",
  "radiusMeters": 10000
}
```

Response body:

```json
{
  "results": [
    {
      "placeId": "google-place-id",
      "displayName": "Business Name",
      "formattedAddress": "Address",
      "phone": null,
      "website": null,
      "rating": 4.5,
      "userRatingCount": 120
    }
  ]
}
```

## Data handling

- Keep API key server-side.
- Store Place IDs and internal audit/classification data.
- Avoid storing unnecessary full Google Places payloads.
- Refresh details when needed through server-side API calls.

## Error handling

Handle:

- Missing query
- Invalid audit ID
- Google API quota exceeded
- Google API key missing
- Empty results
- Network/API failure

## Testing notes

- Test search with a known business name.
- Test search with no results.
- Test missing API key.
- Test rate limit behavior.
- Test that API key never appears in browser network responses.

## Security notes

- Add per-user and per-IP rate limiting.
- Validate `query`, `auditId`, and `radiusMeters`.
- Do not expose raw Google API errors to users.
