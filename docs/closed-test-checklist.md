# Closed-Test Checklist

## Before Inviting Testers

- Fresh clone works.
- `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, and license files are present.
- `specs/` validates.
- Every exported spec has `license: ODbL-1.0`.
- Static catalog builds locally.
- Static catalog can browse/search exported specs.
- If GitHub Pages is unavailable for the private repo plan, testers can clone and open `site/index.html` locally.
- Issue forms render correctly.
- Suggest / Correct / Verify issue submissions are understandable.
- No private scraper internals, provider details, local host details, raw cache, credentials, or customer data are present.
- Export was produced from a quiet snapshot, not actively changing ledgers.

## Public-Release Gate

- Closed testers can use the catalog without handholding.
- At least one suggestion/correction/verification loop has been completed.
- Public docs clearly explain what is open and what is maintained privately.
- Domain plan is ready: `ai4av.net` app and `catalog.ai4av.net` static catalog.
- Every closed-test failure has either a fix or an explicit Sprint 31 defer note.

## Loop Evidence

Recorded exercises of the Suggest / Correct / Verify loop:

- Issue #1 — Suggest: Roku Streaming Device (ECP). Form rendered correctly, source URL validated as live, labels triaged to `needs-review` + `approved-scrape`, parked behind the private scraper run per `manual-maintainer-flow.md`.
