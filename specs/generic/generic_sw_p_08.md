---
spec_id: admin/generic-sw-p-08
schema_version: ai4av-public-spec-v1
revision: 1
title: "Generic SW-P-08 Control Spec"
manufacturer: Generic
model_family: "Generic SW-P-08"
aliases: []
compatible_with:
  manufacturers:
    - Generic
  models:
    - "Generic SW-P-08"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.dataminer.services
  - calrec.com
  - github.com
  - support.rascular.com
source_urls:
  - https://docs.dataminer.services/connector/doc/Pro-Bel_SW-P-08.html
  - https://calrec.com/wp-content/uploads/2014/05/SW-P-08.pdf
  - https://github.com/bitfocus/companion-module-generic-swp08/blob/main/companion/HELP.md
  - https://support.rascular.com/pro-bel-sw-p-08-implementation-notes/
retrieved_at: 2026-04-29T23:48:35.677Z
last_checked_at: 2026-06-03T07:03:24.249Z
generated_at: 2026-06-03T07:03:24.249Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "original ProBel SW-P-08 Issue 4 specification document not available; spec derived from Rascular implementation notes, Bitfocus Companion module, and open-source JS implementation"
  - "salvo encoding details not in source"
  - "no settable parameters described as Variables in source"
  - "full event taxonomy for unsolicited device-originated messages not fully enumerated in source"
  - "salvo definition format, salvo number encoding, and salvo execution byte structure not in source"
  - "no safety warnings or interlock procedures in source"
  - "original ProBel SW-P-08 Issue 4 PDF not retrieved; byte-level encoding derived from open-source JS implementations and Rascular notes"
  - "salvo group byte encoding, salvo execution command number not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:03:24.249Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "12/12 actions matched (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Generic SW-P-08 Control Spec

## Summary
Generic SW-P-08 is a broadcast router/gpio control protocol supporting both TCP (port 2008) and RS-232 serial (9600 8N1). Controls crosspoint routing, protect, tallies, source/destination names, and salvos. Supports standard (16-level, 1024-source) and extended (256-level, 65535-source/destination) operation.

<!-- UNRESOLVED: original ProBel SW-P-08 Issue 4 specification document not available; spec derived from Rascular implementation notes, Bitfocus Companion module, and open-source JS implementation -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 2008  # default; configurable
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable       # crosspoint connect/disconnect commands present
- queryable      # interrogate commands returning tally/state present
```

## Actions
```yaml
- id: crosspoint_interrogate
  label: Crosspoint Interrogate
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15 standard, 0-255 extended)
    - name: level
      type: integer
      description: Level number (0-15 standard, 0-255 extended)
    - name: destination
      type: integer
      description: Destination number

- id: crosspoint_connect
  label: Crosspoint Connect
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15 standard, 0-255 extended)
    - name: level
      type: integer
      description: Level number (0-15 standard, 0-255 extended)
    - name: destination
      type: integer
      description: Destination number (≥128 uses multiplier byte in standard protocol)
    - name: source
      type: integer
      description: Source number

- id: protect_interrogate
  label: Protect Interrogate
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15)
    - name: level
      type: integer
      description: Level number (0-15)
    - name: destination
      type: integer
      description: Destination number

- id: protect_connect
  label: Protect Connect
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15)
    - name: level
      type: integer
      description: Level number (0-15)
    - name: destination
      type: integer
      description: Destination number

- id: protect_disconnect
  label: Protect Disconnect
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15)
    - name: level
      type: integer
      description: Level number (0-15)
    - name: destination
      type: integer
      description: Destination number

- id: source_names_request
  label: Source Names Request
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15)
    - name: level
      type: integer
      description: Level number (0-15)
    - name: char_length
      type: integer
      description: Name length index (0=4, 1=8, 2=12, 3=16, 4=32 chars)

- id: destination_names_request
  label: Destination Names Request
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15)
    - name: char_length
      type: integer
      description: Name length index (0=4, 1=8, 2=12, 3=16, 4=32 chars)

- id: umd_label_request
  label: UMD Label Request
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15)
    - name: level
      type: integer
      description: Level number (0-15)
    - name: destination
      type: integer
      description: Destination number

- id: tally_state_request
  label: Tally State Request
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15 standard, 0-255 extended)
    - name: level
      type: integer
      description: Level number (0-15 standard, 0-255 extended)

- id: crosspoint_tally_dump
  label: Crosspoint Tally Dump
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15 standard, 0-255 extended)
    - name: level
      type: integer
      description: Level number (0-15 standard, 0-255 extended)

- id: protect_tally_dump
  label: Protect Tally Dump
  kind: action
  params:
    - name: matrix
      type: integer
      description: Matrix number (0-15)
    - name: level
      type: integer
      description: Level number (0-15)

- id: salvo
  label: Crosspoint Go Group Salvo
  kind: action
  params:
    - name: salvo_id
      type: integer
      description: Salvo group identifier  # UNRESOLVED: salvo encoding details not in source
```

## Feedbacks
```yaml
- id: crosspoint_tally
  label: Crosspoint Tally
  type: object
  fields:
    matrix: integer
    level: integer
    destination: integer
    source: integer

- id: crosspoint_tally_dump
  label: Crosspoint Tally Dump
  type: object
  fields:
    matrix: integer
    level: integer
    tally_count: integer
    start_destination: integer
    sources: integer[]

- id: connected
  label: Connected
  type: event
  description: Async notification when route is established

- id: protect_connected
  label: Protect Connected
  type: event
  description: Async notification when protect is set

- id: protect_disconnected
  label: Protect Disconnected
  type: event
  description: Async notification when protect is removed

- id: source_names_response
  label: Source Names Response
  type: object
  fields:
    matrix: integer
    level: integer
    char_length: integer
    start_index: integer
    name_count: integer
    names: string[]

- id: destination_names_response
  label: Destination Names Response
  type: object
  fields:
    matrix: integer
    char_length: integer
    start_index: integer
    name_count: integer
    names: string[]

- id: umd_label_response
  label: UMD Label Response
  type: object
  fields:
    destination: integer
    label: string

- id: ack
  label: ACK
  type: event
  description: Message acknowledged (DLE ACK = 0x10 0x06)

- id: nak
  label: NAK
  type: event
  description: Message not acknowledged (DLE NAK = 0x10 0x15)
```

## Variables
```yaml
# UNRESOLVED: no settable parameters described as Variables in source
```

## Events
```yaml
# Async notifications (CONNECTED, PROTECT_CONNECTED, PROTECT_DISCONNECTED) listed in Feedbacks.
# UNRESOLVED: full event taxonomy for unsolicited device-originated messages not fully enumerated in source
```

## Macros
```yaml
# Salvo support confirmed (CROSSPOINT GO GROUP SALVO command exists).
# UNRESOLVED: salvo definition format, salvo number encoding, and salvo execution byte structure not in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Protocol uses DLE byte-stuffing (0x10 escape) for all data bytes equal to 0x10. Checksum is 2's complement of preceding byte sum. Standard commands limited to 16 levels / 1024 sources / 1024 destinations; extended commands (+128) support 256 levels / 65535 sources / 65535 destinations. Destination numbers ≥128 in standard protocol require a multiplier byte encoding. TCP port 2008 default; serial 9600 8N1. Name length 16 and 32 require RouteMaster 2.3.1+ or Helm 4.8.2+.
<!-- UNRESOLVED: original ProBel SW-P-08 Issue 4 PDF not retrieved; byte-level encoding derived from open-source JS implementations and Rascular notes -->
<!-- UNRESOLVED: salvo group byte encoding, salvo execution command number not stated in source -->

## Provenance

```yaml
source_domains:
  - docs.dataminer.services
  - calrec.com
  - github.com
  - support.rascular.com
source_urls:
  - https://docs.dataminer.services/connector/doc/Pro-Bel_SW-P-08.html
  - https://calrec.com/wp-content/uploads/2014/05/SW-P-08.pdf
  - https://github.com/bitfocus/companion-module-generic-swp08/blob/main/companion/HELP.md
  - https://support.rascular.com/pro-bel-sw-p-08-implementation-notes/
retrieved_at: 2026-04-29T23:48:35.677Z
last_checked_at: 2026-06-03T07:03:24.249Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:03:24.249Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "12/12 actions matched (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "original ProBel SW-P-08 Issue 4 specification document not available; spec derived from Rascular implementation notes, Bitfocus Companion module, and open-source JS implementation"
- "salvo encoding details not in source"
- "no settable parameters described as Variables in source"
- "full event taxonomy for unsolicited device-originated messages not fully enumerated in source"
- "salvo definition format, salvo number encoding, and salvo execution byte structure not in source"
- "no safety warnings or interlock procedures in source"
- "original ProBel SW-P-08 Issue 4 PDF not retrieved; byte-level encoding derived from open-source JS implementations and Rascular notes"
- "salvo group byte encoding, salvo execution command number not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
