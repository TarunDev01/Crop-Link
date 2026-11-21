# Engine 2 — Core Logic & Algorithms

## Current project logic
The frontend currently performs scheme search using array filtering, category filtering, and quiz matching. The quiz's landholding and irrigation answers are collected but do not currently influence its results. The matching behavior is therefore a simple interest-to-scheme mapping, not an official eligibility calculation.

## Added reusable core functions
`src/schemeEngine.js` includes:
- text normalization: trim, lowercase, collapse whitespace
- linear search over scheme fields: O(n × k × m) in the simple model (n records, k fields, m average text length)
- category filtering: O(n)
- interest matching/ranking: O(n)
- inquiry validation: constant number of checks, O(1) with respect to record count

## Data structures
- Array of scheme objects: ordered collection for rendering/filtering
- Object maps: interest-to-scheme IDs and validation errors
- String arrays: eligibility criteria and document lists

## Limitations
This matching engine is a prototype. It does not verify government eligibility, identity, land records, or application status.
