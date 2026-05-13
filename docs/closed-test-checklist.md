# Closed-Test Checklist

## Before Inviting Testers

- Fresh clone works.
- `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, and license files are present.
- `specs/` validates.
- Every exported spec has `license: ODbL-1.0`.
- Issue forms (`suggest-device`, `report-wrong-spec`) render correctly.
- Suggest / Correct issue submissions are understandable.
- No private scraper internals, provider details, local host details, raw cache, credentials, or customer data are present.
- Export was produced from a quiet snapshot, not actively changing ledgers.

## Public-Release Gate

- Closed testers can use the catalog without handholding.
- At least one Suggest and one Correct loop has been completed.
- Public docs clearly explain what is open and what is maintained privately.
- `ai4av.net` is live and not gated by the coming-soon redirect.
- Every closed-test failure has either a fix or an explicit defer note.

## Loop Evidence

Recorded exercises of the Suggest / Correct loop:

- Issue #1 — Suggest: Roku Streaming Device (ECP). Form rendered correctly, source URL validated as live, labels triaged to `needs-review` + `approved-scrape`, parked behind the private scraper run per `manual-maintainer-flow.md`.
- Issue #3 — Correct: malformed `firmware` / `firmware_coverage` front-matter quoting across 377 specs. Mechanically swept by PR #4 (378 files, 756 lines); generator-side defensive sanitizer added in `scripts/export-public-catalog.ts` to prevent regression on next export.
