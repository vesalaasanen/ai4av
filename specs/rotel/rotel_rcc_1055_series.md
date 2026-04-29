---
schema_version: ai4av-public-spec-v1
device_id: rotel/rcc-1055-series
entity_id: rotel_rcc_1055_series
spec_id: admin/rotel-rcc-1055-series
revision: 1
author: admin
title: "Rotel RCC-1055 Series Control Spec"
status: published
manufacturer: Rotel
manufacturer_key: rotel
model_family: "RCC-1055 Series"
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - "RCC-1055 Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: rotel_rcc_1055_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:23:34.612Z
retrieved_at: 2026-04-23T08:23:34.612Z
last_checked_at: 2026-04-23T08:23:34.612Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:23:34.612Z
  matched_actions: 37
  action_count: 37
  confidence: high
  summary: "All 37 spec actions matched verbatim in source; bidirectional command coverage; transport parameters verified against connection settings table."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Rotel RCC-1055 Series Control Spec

## Summary
Rotel RCC-1055 is a multi-disc CD changer controlled via RS-232 HEX protocol. Communication is half-duplex; the device sends unsolicited feedback strings reflecting front panel display changes. Two serial configurations exist based on unit serial number.

<!-- UNRESOLVED: unit serial number ranges not stated in source — cannot determine which config applies to a given unit -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 2400  # units BEFORE serial 077-7121001 (Black) / 977-7121001 (Silver)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # UNRESOLVED: units AFTER serial 077-7121001 (Black) / 977-7121001 (Silver) use 9600 baud — spec ambiguous on how to detect config
addressing:
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command examples:
traits:
  - powerable
  - queryable  # unit sends feedback strings on display change
  - routable   # disc select commands present
```

## Actions
```yaml
actions:
  - id: power_toggle
    label: Power Toggle
    kind: action
    params: []
  - id: power_on
    label: Power On
    kind: action
    params: []
  - id: power_off
    label: Power Off
    kind: action
    params: []
  - id: play
    label: Play
    kind: action
    params: []
  - id: stop
    label: Stop
    kind: action
    params: []
  - id: pause
    label: Pause
    kind: action
    params: []
  - id: track_next
    label: Track >>
    kind: action
    params: []
  - id: track_prev
    label: Track <<
    kind: action
    params: []
  - id: search_forward
    label: Search >>
    kind: action
    params: []
  - id: search_backward
    label: Search <<
    kind: action
    params: []
  - id: number_1
    label: Number 1
    kind: action
    params: []
  - id: number_2
    label: Number 2
    kind: action
    params: []
  - id: number_3
    label: Number 3
    kind: action
    params: []
  - id: number_4
    label: Number 4
    kind: action
    params: []
  - id: number_5
    label: Number 5
    kind: action
    params: []
  - id: number_6
    label: Number 6
    kind: action
    params: []
  - id: number_7
    label: Number 7
    kind: action
    params: []
  - id: number_8
    label: Number 8
    kind: action
    params: []
  - id: number_9
    label: Number 9
    kind: action
    params: []
  - id: number_10
    label: Number 10
    kind: action
    params: []
  - id: number_plus10
    label: Number +10
    kind: action
    params: []
  - id: next_disc
    label: Next Disc
    kind: action
    params: []
  - id: disc_1
    label: Disc 1
    kind: action
    params: []
  - id: disc_2
    label: Disc 2
    kind: action
    params: []
  - id: disc_3
    label: Disc 3
    kind: action
    params: []
  - id: disc_4
    label: Disc 4
    kind: action
    params: []
  - id: disc_5
    label: Disc 5
    kind: action
    params: []
  - id: drawer_open_close
    label: Drawer Open/Close
    kind: action
    params: []
  - id: random
    label: Random
    kind: action
    params: []
  - id: repeat
    label: Repeat
    kind: action
    params: []
  - id: time
    label: Time
    kind: action
    params: []
  - id: program
    label: Program
    kind: action
    params: []
  - id: scan
    label: Scan
    kind: action
    params: []
  - id: review
    label: Review
    kind: action
    params: []
  - id: release_key
    label: Release Key
    kind: action
    params: []
  - id: front_display_on
    label: Front Display On
    kind: action
    params: []
  - id: front_display_off
    label: Front Display Off
    kind: action
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: display_feedback_flags_old
    label: Display Flag Feedback (pre-serial units)
    description: |
      5 flag bytes (F1–F5) + 7 ASCII chars (C1–C7).
      Response format: FE 0E B0 20 F1 F2 F3 F4 F5 C1 C2 C3 C4 C5 C6 C7 <chk>
    kind: feedback
    params:
      - name: flags
        type: object
        description: F1–F5 flag bit masks
      - name: disc
        type: string
        description: ASCII disc number (C1)
      - name: track
        type: string
        description: ASCII track number (C2–C3)
      - name: minutes
        type: string
        description: ASCII minutes (C4–C5)
      - name: seconds
        type: string
        description: ASCII seconds (C6–C7)
    # UNRESOLVED: flag bit definitions use non-standard bit labels — cannot map unambiguously
  - id: display_feedback_flags_new
    label: Display Flag Feedback (post-serial units)
    description: |
      6 flag bytes (F1–F6) + 8 ASCII chars (C1–C8).
      Response format: FE 0E B0 20 F1 F2 F3 F4 F5 F6 C1 C2 C3 C4 C5 C6 C7 C8 <chk>
    kind: feedback
    params:
      - name: flags
        type: object
        description: F1–F6 flag bit masks
      - name: disc
        type: string
        description: ASCII disc number (C1)
      - name: track
        type: string
        description: ASCII track number (C2–C4)
      - name: minutes
        type: string
        description: ASCII minutes (C5–C6)
      - name: seconds
        type: string
        description: ASCII seconds (C7–C8)
    # UNRESOLVED: flag bit definitions use non-standard bit labels — cannot map unambiguously
```

## Variables
```yaml
# No discrete settable parameters beyond actions listed above.
```

## Events
```yaml
# The device sends unsolicited feedback strings on front panel display changes.
# No separate event taxonomy — feedback strings serve as events.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
**Meta Encoding:** Any occurrence of bytes `FD` or `FE` in command data must be replaced with `FD 00` (for `FD`) or `FD 01` (for `FE`) to avoid confusion with the start byte `FE`. Commands using meta encoding are highlighted in source.

**Checksum:** Count byte includes only ID, Type, and Key bytes — excludes Start and Checksum bytes. Checksum algorithm not specified in source.

**Command Structure:** All commands are 6 bytes: `FE 03 B0 10 <key> <chk>`. No spaces or delimiters in actual transmission. No carriage returns or line feeds after commands.

**Two Hardware Revisions:** Units before serial `077-7121001` (Black) / `977-7121001` (Silver) use 2400 baud and 5 flag bytes in feedback. Units after use 9600 baud and 6 flag bytes. No autodetection mechanism described — operator must determine unit version manually.

<!-- UNRESOLVED: checksum algorithm not stated in source -->
<!-- UNRESOLVED: meta encoding full algorithm details not fully elaborated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: rotel_rcc_1055_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:23:34.612Z
retrieved_at: 2026-04-23T08:23:34.612Z
last_checked_at: 2026-04-23T08:23:34.612Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:23:34.612Z
matched_actions: 37
action_count: 37
confidence: high
summary: "All 37 spec actions matched verbatim in source; bidirectional command coverage; transport parameters verified against connection settings table."
```

## Known Gaps

```yaml
[]
```
