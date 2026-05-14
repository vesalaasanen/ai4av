# Contributing

AI4AV accepts public contributions through a manual maintainer queue. The only input from external contributors is GitHub issues.

## What To Submit

- Suggest a missing device with manufacturer, model/family, and an official source URL.
- Report a wrong spec with the spec ID, firmware/protocol version, and the observed mismatch.

## What Not To Submit

Do not paste copied driver files, private protocol manuals, NDA material, raw scraped catalogs, credentials, customer site details, or large command dumps from another database. Link to public manufacturer material where possible.

## No Pull Requests

This repository does not accept pull requests. The catalog is generated from a private maintenance pipeline; external changes cannot be merged here. Any PR opened against this repo is closed automatically by `.github/workflows/close-prs.yml` with a pointer back to the issue templates above.

If you spotted something wrong, please file an issue instead.

## What Happens After You File An Issue

1. A maintainer triages the issue and applies labels.
2. If the source is public and appropriate, the maintainer runs the private scraper/export outside GitHub.
3. The maintainer commits the resulting spec change directly to `main` and closes the issue with a link to the commit.

Public issue bodies are untrusted input. No public issue directly starts scraper execution.
