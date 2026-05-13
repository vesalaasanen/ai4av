# AI4AV Open Catalog

AI4AV publishes AI-friendly control specifications for AV, lighting, camera, mechanical, and installation systems.

The open parts are the catalog in `specs/` and the public skill/tooling shape; the private maintenance pipeline keeps the catalog fresh from published manufacturer documentation. The scraper, maintenance infrastructure, source cache, and host details are not part of this repository.

## What Is Here

- `specs/` contains ODbL-licensed structured Markdown control specs.
- `docs/spec-format-v1.md` defines the public Markdown contract.
- `.github/ISSUE_TEMPLATE/` contains issue queues for device suggestions and spec corrections.

## Licenses

- Catalog data under `specs/` is licensed under the Open Data Commons Open Database License 1.0. See `LICENSES/ODbL-1.0.txt`.
- Public tooling, examples, and docs outside `specs/` are licensed under MIT. See `LICENSES/MIT.txt`.

Every exported spec repeats `license: ODbL-1.0` in front matter so copied single files keep their catalog license clear.

## ai4av.net And GitHub

`ai4av.net` is the product surface for browsing and searching the catalog. This repository is the cloneable source-of-truth for the catalog and the issue queue.

## Contributions

Use GitHub issues to suggest a device or report a spec error. Public issues only queue maintainer review; they do not trigger scraper runs.

We do not accept copied driver databases, raw command dumps, private manuals, or user-scraped catalogs. Link to published manufacturer documentation instead.

### Finding the Spec ID

The spec-error issue form asks for a Spec ID. It looks like `admin/<slug>` (e.g. `admin/magewell-pro-convert-series`). You can find it in:

- The first line of any spec's YAML frontmatter (`spec_id: admin/...`).
- The spec's URL on the published catalog.
- The `specId=` line printed by the `ai4av-lookup` Claude Code skill when it returns a candidate match.
