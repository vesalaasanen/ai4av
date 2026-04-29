# AI4AV Open Catalog

AI4AV publishes AI-friendly control specifications for AV, lighting, camera, mechanical, and installation systems.

The open parts are the catalog in `specs/` and the public skill/tooling shape; the private maintenance pipeline keeps the catalog fresh from published manufacturer documentation. The scraper, maintenance infrastructure, source cache, and host details are not part of this repository.

## What Is Here

- `specs/` contains ODbL-licensed structured Markdown control specs.
- `docs/spec-format-v1.md` defines the public Markdown contract.
- `site/` contains the minimal static catalog browser for GitHub Pages.
- `.github/ISSUE_TEMPLATE/` contains closed-test issue queues for suggestions, corrections, and verification reports.

## Licenses

- Catalog data under `specs/` is licensed under the Open Data Commons Open Database License 1.0. See `LICENSES/ODbL-1.0.txt`.
- Public tooling, examples, docs outside `specs/`, and the static site are licensed under MIT. See `LICENSES/MIT.txt`.

Every exported spec repeats `license: ODbL-1.0` in front matter so copied single files keep their catalog license clear.

## ai4av.net And GitHub

`ai4av.net` is the product surface. This repository is the cloneable catalog and closed-test contribution queue. GitHub Pages may serve the static fallback at `catalog.ai4av.net` after DNS is configured and the repository is public or the GitHub plan supports Pages for private repositories.

## Contributions

Use GitHub issues to suggest a device, report a wrong spec, or submit a verified-working report. Public issues only queue maintainer review; they do not trigger scraper runs.

We do not accept copied driver databases, raw command dumps, private manuals, or user-scraped catalogs. Link to published manufacturer documentation or describe field verification instead.

## Local Catalog

After an export, open `site/index.html` directly in a browser. The site reads `site/catalog-index.json`, which is generated from the canonical Markdown specs.

For closed testing while the repo is private, clone the repository and open `site/index.html` locally. Pages may not be available for private repositories on every GitHub plan.
