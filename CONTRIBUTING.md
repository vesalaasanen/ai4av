# Contributing

AI4AV accepts public contributions through a manual maintainer queue.

## What To Submit

- Suggest a missing device with manufacturer, model/family, and an official source URL.
- Report a wrong spec with the spec ID, firmware/protocol version, and the observed mismatch.

## What Not To Submit

Do not paste copied driver files, private protocol manuals, NDA material, raw scraped catalogs, credentials, customer site details, or large command dumps from another database. Link to public manufacturer material where possible.

## Manual Maintainer Flow

1. Maintainer triages the issue and applies `needs-review`.
2. If the source is public and appropriate, maintainer applies `approved-scrape`.
3. Maintainer runs the private scraper/export manually outside GitHub issue automation.
4. Maintainer opens a catalog PR with the changed Markdown spec and generated static index.
5. Maintainer closes the issue with links to the PR and exported spec.

Public issue bodies are untrusted input. No public issue directly starts scraper execution.

## DCO

By contributing, you certify that you have the right to submit the contribution under this repository's licenses. Add a Developer Certificate of Origin sign-off to commits:

```text
Signed-off-by: Your Name <you@example.com>
```
