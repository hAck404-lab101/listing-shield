# Feature: Suspicion Scoring

## Purpose

Suspicion scoring helps operators quickly prioritize candidate listings that may be duplicates, misleading copies, or impersonators.

The score is not a legal conclusion. It is only an internal triage signal.

## Inputs

Compare the candidate listing against the verified original listing:

- Name similarity
- Category similarity
- City/location similarity
- Phone number match or mismatch
- Website match or mismatch
- Address similarity
- Whether the candidate Place ID equals the official Place ID
- Whether the operator already marked it as an approved branch

## Suggested scoring logic

Start with 0 points.

- +30 same or very similar business name
- +20 same or related business category
- +20 same city or operating area
- +25 different phone number from the official listing
- +20 different website or social link from the official listing
- +15 missing contact details
- +15 suspicious duplicate-looking address
- -100 exact official Place ID match
- -50 approved official branch

## Score bands

- 0-30: low risk
- 31-60: needs review
- 61-80: suspicious duplicate
- 81+: likely impersonator

## Manual override

Operators must be able to override the system classification.

Valid classifications:

- original
- official_branch
- suspicious_duplicate
- likely_impersonator
- needs_review

## Database fields

Candidate listings should store:

- suspicion_score
- classification
- classification_reason
- operator_notes
- last_checked_at

## Testing notes

- Exact official Place ID should always score as original/low risk.
- Approved branch should not be marked as impersonator.
- Same name with different phone and website should score high.
- Missing phone/website should require manual review, not automatic accusation.

## Security/legal notes

Use careful wording in reports:

- Prefer "suspected duplicate" or "possible impersonator" unless confirmed.
- Do not claim fraud without evidence.
- Do not auto-submit reports based only on score.
