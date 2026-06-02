---
spec_id: admin/shinybow-sb-5544
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-5544 Control Spec"
manufacturer: Shinybow
model_family: SB-5544
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-5544
    - SB-5544BNC
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_Protocol_SB-5544BNC_SB-5548BNC.pdf
retrieved_at: 2026-06-01T22:35:44.731Z
last_checked_at: 2026-06-02T08:29:40.701Z
generated_at: 2026-06-02T08:29:40.701Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "number of inputs and outputs for SB-5544 not stated in this protocol sheet (assumed 4x4 from model designation; confirmed 4 outputs max). Channel ranges below use 01..04."
  - "source documents no unsolicited notification mechanism"
  - "source does not document multi-step macro sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "per-channel maximum for SB-5544 not explicitly stated; the source uses 8-output examples. The spec assumes 4 outputs (4x4 matrix) consistent with the SB-5544 model designation."
verification:
  verdict: verified
  checked_at: 2026-06-02T08:29:40.701Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions map exactly to source commands; transport parameters (9600 8N1, no flow control) confirmed verbatim; source catalogue fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Shinybow SB-5544 Control Spec

## Summary
The Shinybow SB-5544 (also sold as SB-5544BNC) is a serial-controllable matrix routing switcher. This spec covers its RS-232 ASCII command protocol for power, output routing, presets, lock, volume, and balance. The same protocol also drives the related SB-5548BNC; the source manual is shared.

<!-- UNRESOLVED: number of inputs and outputs for SB-5544 not stated in this protocol sheet (assumed 4x4 from model designation; confirmed 4 outputs max). Channel ranges below use 01..04. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "Flowing Control: None"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from POWER command examples
- routable   # inferred from OUTPUT / OUTPUTALL routing command examples
- queryable  # inferred from `?` query command examples
- levelable  # inferred from VOLUME and BALANCE command examples
```

## Actions
```yaml
- id: power_off
  label: Power OFF
  kind: action
  command: "POWER 000;"
  params: []
- id: power_on
  label: Power ON
  kind: action
  command: "POWER 001;"
  params: []
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "POWER ?;"
  params: []

- id: output_set
  label: Set Output to Input
  kind: action
  command: "OUTPUT{output} {input};"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits, e.g. 01, 02, 03, 04)
    - name: input
      type: integer
      description: Input channel (1-4, zero-padded to 2 digits, e.g. 01, 02, 03, 04)
- id: output_off
  label: Off Output
  kind: action
  command: "OUTPUT{output} 00;"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits)
- id: output_status_query
  label: Output Status Query
  kind: query
  command: "OUTPUT{output} ?;"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits)

- id: outputall_off
  label: Off All Outputs
  kind: action
  command: "OUTPUTALL 00;"
  params: []
- id: outputall_set
  label: Set All Outputs to One Source
  kind: action
  command: "OUTPUTALL {source};"
  params:
    - name: source
      type: integer
      description: Source/input number (1-4, zero-padded to 2 digits)
- id: outputall_status_query
  label: All Outputs Status Query
  kind: query
  command: "OUTPUTALL ?;"
  params: []

- id: memory_save
  label: Save Current Matrix to Memory
  kind: action
  command: "MEMORY {address};"
  params:
    - name: address
      type: string
      description: Memory address, two-digit hex (00..0F, where 00=preset 1, 0F=preset 16)

- id: memory_recall
  label: Recall Saved Matrix from Memory
  kind: action
  command: "RECALL {location};"
  params:
    - name: location
      type: string
      description: Memory location, two-digit hex (00..0F, where 00=preset 1, 0F=preset 16)

- id: memory_data_query
  label: Memory Data Query
  kind: query
  command: "RECALL{address} ?;"
  params:
    - name: address
      type: string
      description: Memory address, two-digit hex (00..0F)

- id: lock_unlock
  label: Unlock
  kind: action
  command: "LOCK 00;"
  params: []
- id: lock_lock
  label: Lock
  kind: action
  command: "LOCK 01;"
  params: []
- id: lock_status_query
  label: Lock Status Query
  kind: query
  command: "LOCK ?;"
  params: []

- id: volume_set
  label: Set Volume Value
  kind: action
  command: "VOLUME{output} {level};"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits)
    - name: level
      type: integer
      description: Volume value (0-100, 0 = mute, 100 = max). Zero-pad to 3 digits per source example.
- id: volume_status_query
  label: Volume Status Query
  kind: query
  command: "VOLUME{output} ?;"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits)
- id: volume_increment
  label: Volume +1
  kind: action
  command: "VOL+{output};"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits)
- id: volume_decrement
  label: Volume -1
  kind: action
  command: "VOL-{output};"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits)

- id: balance_set
  label: Set Balance Value
  kind: action
  command: "BALANCE{output} {level};"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits)
    - name: level
      type: integer
      description: Balance value (0-100, default 50 = center). 0 = 100% Left, 100 = 100% Right. Zero-pad to 3 digits per source example.
- id: balance_status_query
  label: Balance Status Query
  kind: query
  command: "BALANCE{output} ?;"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits)
- id: balance_increment
  label: Balance +1
  kind: action
  command: "BAL+{output};"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits)
- id: balance_decrement
  label: Balance -1
  kind: action
  command: "BAL-{output};"
  params:
    - name: output
      type: integer
      description: Output channel (1-4, zero-padded to 2 digits)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  query: power_status_query
- id: output_routing
  type: integer
  description: Per-output input mapping (1-4)
  query: output_status_query
- id: all_output_routing
  type: string
  description: Concatenated 8-digit hex string of 4 two-digit input selections (e.g. "0307050502010804" from source). Note: source example shows 16 hex chars suggesting 8 outputs; for SB-5544 expect 8 chars (4 outputs × 2 hex digits).
  query: outputall_status_query
- id: lock_state
  type: enum
  values: [unlocked, locked]
  query: lock_status_query
- id: memory_data
  type: string
  description: Concatenated hex string of stored routing (source example: "0102030405060708" - 16 chars for 8 outputs; SB-5544 will return 8 chars for 4 outputs)
  query: memory_data_query
- id: volume_level
  type: integer
  description: Volume 0-100
  query: volume_status_query
- id: balance_level
  type: integer
  description: Balance 0-100 (50 = center)
  query: balance_status_query
```

## Variables
```yaml
- id: volume
  type: integer
  description: Per-output volume level 0-100 (0 = mute, 100 = max)
  per_output: true
  range: [0, 100]
- id: balance
  type: integer
  description: Per-output balance 0-100 (default 50 = center, 0 = full left, 100 = full right)
  per_output: true
  range: [0, 100]
  default: 50
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification mechanism
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- All text is full ASCII, capital letters only. The command format is `COMMAND DATA;` with a single space between command and data, terminating with `;`.
- The source manual is shared between SB-5544 and SB-5548BNC. Response strings in the source are `SB5548BNC 00;` even when the operator is on a 5544 — this is the device's literal response string. Preserved verbatim in action responses.
- The source uses inconsistent capitalization in `OUTPUTALL ?;` response (mixed `OUTPUTALL` lower / `OUTPUT` upper). The query response format from the source is: status commands return `Command Data;` (e.g. `Power 00;`, `OUTPUT04 01;`); set commands return `SB5548BNC 00;`.
- Channel arguments (XX/YY) are zero-padded to 2 ASCII digits per source examples (`01`, `02`, `04`).
- Volume and balance level arguments are zero-padded to 3 digits per source examples (`080`, `050`).
- Memory preset mapping: hex `00` = preset 1, hex `0F` = preset 16 (16 presets total).
- Source `VOL+YY?;` / `VOL-YY?;` and `BAL+YY?;` / `BAL-YY?;` "check" entries appear to be a manual formatting artifact rather than documented query commands; they are not modeled as separate query actions.
- The `OUTPUTALL ?;` response example `0307050502010804` is 16 hex chars — this is 8 outputs × 2 hex digits, consistent with SB-5548. For SB-5544, expect an 8-char response (4 outputs × 2 hex digits).
<!-- UNRESOLVED: per-channel maximum for SB-5544 not explicitly stated; the source uses 8-output examples. The spec assumes 4 outputs (4x4 matrix) consistent with the SB-5544 model designation. -->
```

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_Protocol_SB-5544BNC_SB-5548BNC.pdf
retrieved_at: 2026-06-01T22:35:44.731Z
last_checked_at: 2026-06-02T08:29:40.701Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:29:40.701Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions map exactly to source commands; transport parameters (9600 8N1, no flow control) confirmed verbatim; source catalogue fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "number of inputs and outputs for SB-5544 not stated in this protocol sheet (assumed 4x4 from model designation; confirmed 4 outputs max). Channel ranges below use 01..04."
- "source documents no unsolicited notification mechanism"
- "source does not document multi-step macro sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "per-channel maximum for SB-5544 not explicitly stated; the source uses 8-output examples. The spec assumes 4 outputs (4x4 matrix) consistent with the SB-5544 model designation."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
