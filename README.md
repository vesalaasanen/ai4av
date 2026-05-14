# AI4AV Open Catalog

AI4AV publishes AI-friendly control specifications for AV, lighting, camera, mechanical, and installation systems.

The open parts are the catalog in `specs/` and the public skill/tooling shape; the private maintenance pipeline keeps the catalog fresh from published manufacturer documentation. The scraper, maintenance infrastructure, source cache, and host details are not part of this repository.

## What Is Here

- `specs/` contains ODbL-licensed structured Markdown control specs.
- `docs/spec-format-v1.md` defines the public Markdown contract.
- `.github/ISSUE_TEMPLATE/` contains issue queues for device suggestions and spec corrections.

## Funding model

AI4AV is sponsorware: open data, free to query, funded by sponsors whose work depends on broad and current AV device coverage. Sponsorship pays for ingestion, schema, and verification. There is no enterprise license and no paywall on the data.

## Sponsors

AI4AV is funded by individuals and companies who rely on the dataset. Sponsorship pays for spec ingestion, schema work, and verification, and keeps the data open.

[Become a sponsor on GitHub Sponsors.](https://github.com/sponsors/vesalaasanen)

<!--
Sponsor tier subsections appear below in this order once there is at least one sponsor in that tier. Until a tier has a sponsor, omit the heading.

### Manufacturer Partners
Top placement, larger logos. AV equipment manufacturers whose products are covered in the database.
[![Manufacturer Name](path/to/manufacturer-logo.png)](https://manufacturer-site.example)

### Companies
Standard logo size, below Partners.
[![Company Name](path/to/company-logo.png)](https://company-site.example)

### Power users
Names (or company names), no logos.
- Sponsor Name
- Another Sponsor

### Patrons (one-time, listed for one year)
Names with listing expiration date for annual cleanup.
- Sponsor Name (expires 2027-05-13)
- Another Sponsor (expires 2027-06-01)
-->

## Licenses

- Catalog data under `specs/` is licensed under the Open Data Commons Open Database License 1.0. See `LICENSES/ODbL-1.0.txt`.
- Public tooling, examples, and docs outside `specs/` are licensed under MIT. See `LICENSES/MIT.txt`.

Every exported spec repeats `license: ODbL-1.0` in front matter so copied single files keep their catalog license clear.

## ai4av.net And GitHub

`ai4av.net` is the product surface for browsing and searching the catalog. This repository is the cloneable source-of-truth for the catalog and the issue queue.

## Contributions

Use GitHub issues to suggest a device or report a spec error. Public issues only queue maintainer review; they do not trigger scraper runs.

This repository does not accept pull requests — the catalog is generated from a private maintenance pipeline. Any PR is closed automatically. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

We do not accept copied driver databases, raw command dumps, private manuals, or user-scraped catalogs. Link to published manufacturer documentation instead.

### Finding the Spec ID

The spec-error issue form asks for a Spec ID. It looks like `admin/<slug>` (e.g. `admin/magewell-pro-convert-series`). You can find it in:

- The first line of any spec's YAML frontmatter (`spec_id: admin/...`).
- The spec's URL on the published catalog.
- The `specId=` line printed by the `ai4av-lookup` Claude Code skill when it returns a candidate match.
