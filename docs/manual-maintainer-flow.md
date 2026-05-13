# Manual Maintainer Flow

Public GitHub issues queue work only. Maintainers decide whether any private scraper or export action is appropriate.

## Suggest Device

1. Confirm manufacturer, model/family, and official source URL.
2. Label `needs-review`.
3. If the source is public and useful, label `approved-scrape`.
4. Run the private scraper manually from the private maintenance repo.
5. Export the changed Markdown spec into `specs/`.
6. Open a PR and close the issue with links to the PR and spec.

## Report Wrong Spec

1. Confirm the affected spec ID and firmware/protocol version.
2. Check whether the report includes enough reproduction detail.
3. If source evidence is missing, label `source-needed`.
4. If accepted, update the private source/spec workflow manually and open a catalog PR.

## Canned Comments

Accepted:

> Thanks. This is in the maintainer queue and has been marked for manual review.

Source needed:

> Please add a public manufacturer source URL or enough detail for maintainers to identify the source. Private manuals and copied driver data cannot be accepted.

Blocked/private docs:

> We cannot use private, NDA, credentialed, or copied source material. Closing unless a public manufacturer source is available.

Duplicate:

> This appears to duplicate an existing issue/spec. Closing in favor of the linked item.

Scraper failed:

> Maintainer review approved this source, but the private scrape/export did not produce a publishable catalog entry yet. Keeping this queued for follow-up.
