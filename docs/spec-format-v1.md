# Public Spec Format V1

The canonical public catalog artifact is one structured Markdown file per device or family:

```text
specs/<manufacturer-key>/<device-or-family-key>.md
```

Generated JSON is allowed only for indexes and static-site search. Per-spec JSON is not the Sprint 30 source of truth.

## Required Front Matter

Public specs keep the existing AI4AV structured Markdown fields and add public catalog metadata:

- `schema_version: ai4av-public-spec-v1`
- `device_id`
- `entity_id`
- `spec_id`
- `revision`
- `author`
- `title`
- `status`
- `manufacturer`
- `manufacturer_key`
- `model_family`
- `aliases`
- `compatible_with`
- `source_urls`
- `source_documents`
- `retrieved_at`
- `last_checked_at`
- `generator`
- `generated_at`
- `firmware_coverage`
- `protocol_coverage`
- `known_gaps`
- `declared_confidence`
- `verification`
- `license: ODbL-1.0`
- `created_at`

## Required Sections

- `Summary`
- `Transport`
- `Traits`
- `Actions`
- `Feedbacks` when available
- `Variables` when available
- `Events` when available
- `Macros` when available
- `Safety`
- `Notes`
- `Provenance`
- `Verification Summary`
- `Known Gaps`

The parser may ignore unknown public front matter while older internal tooling catches up, but the public validation command enforces the public fields.

## Migration

The schema is versioned by `schema_version`. Breaking changes require a new schema version and a migration note. Internal Convex or scraper schemas may evolve independently as long as the exported Markdown contract remains stable.
