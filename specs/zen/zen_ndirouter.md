---
schema_version: ai4av-public-spec-v1
device_id: zen/zen-ndirouter
entity_id: zen_ndirouter
spec_id: admin/zen-ndirouter
revision: 1
author: admin
title: "ZEN NDIRouter Control Spec"
status: published
manufacturer: ZEN
manufacturer_key: zen
model_family: "ZEN NDIRouter"
aliases: []
compatible_with:
  manufacturers:
    - ZEN
  models:
    - "ZEN NDIRouter"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: zen_ndirouter_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:23.539Z
retrieved_at: 2026-04-27T10:13:23.539Z
last_checked_at: 2026-04-27T10:13:23.539Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:23.539Z
  matched_actions: 25
  action_count: 25
  confidence: high
  summary: "All 25 spec actions matched literally in source; transport verified; complete command catalogue coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# ZEN NDIRouter Control Spec

## Summary
NDI routing software running on PC. Controls input-to-output source routing via TCP text commands on port 9779. Supports presets, multi-router instances, and queryable routing state.

<!-- UNRESOLVED: power control commands not present; voltage/power specs not applicable to software router -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9779
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: multiple query commands (OR, IN, IV, ON, CR, RN, etc.)
- routable   # inferred: routing commands present (OS, AB, PS)
```

## Actions
```yaml
- id: AB
  label: Switch Outputs
  kind: action
  params:
    - name: output_x
      type: integer
      description: "Output number (1=A, 2=B, etc.)"
    - name: output_y
      type: integer
      description: "Output number (1=A, 2=B, etc.)"

- id: BR
  label: Request Base Name
  kind: action
  params: []

- id: CR
  label: Request I/O Config
  kind: action
  params: []

- id: DD
  label: Data Dump
  kind: action
  params: []

- id: IN
  label: Get Input Names
  kind: action
  params:
    - name: input_number
      type: integer
      description: "Input number (0 = all inputs)"
    - name: option_code
      type: integer
      description: "0=full name, 1=network name, 2=device name"

- id: IV
  label: Validate Input Channels
  kind: action
  params:
    - name: input_number
      type: integer
      description: "Input number (0 = all inputs)"

- id: ON
  label: Get Output Names
  kind: action
  params:
    - name: output_number
      type: integer
      description: "Output number (0 = all outputs)"

- id: OR
  label: Get Output Status
  kind: action
  params:
    - name: output_number
      type: integer
      description: "Output number (0 = all outputs)"

- id: OS
  label: Set Output Routing
  kind: action
  params:
    - name: output_number
      type: integer
      description: "Output number (1 to max)"
    - name: input_number
      type: integer
      description: "Input number (1 to max inputs)"

- id: PC
  label: Create/Change Preset
  kind: action
  params:
    - name: preset_number
      type: integer

- id: PN
  label: Get Preset Name
  kind: action
  params:
    - name: preset_number
      type: integer

- id: PS
  label: Select Preset Routing
  kind: action
  params:
    - name: preset_number
      type: integer

- id: PR
  label: Request Active Preset
  kind: action
  params: []

- id: PV
  label: Validate Presets
  kind: action
  params:
    - name: preset_number
      type: integer
      description: "0 = all presets"

- id: RN
  label: Request Router Number
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: BN
  label: Base Name Response
  params:
    - name: router_number
      type: integer
    - name: text_length
      type: integer
    - name: text
      type: string

- id: CR
  label: Config Response
  params:
    - name: total_inputs
      type: integer
    - name: total_outputs
      type: integer

- id: IN
  label: Input Name Response
  params:
    - name: input_number
      type: integer
    - name: text_length
      type: integer
    - name: text
      type: string

- id: IV
  label: Input Validate Response
  params:
    - name: input_number
      type: integer
    - name: status
      type: integer
      description: "1 = NDI source connected, 0 = no source"

- id: ON
  label: Output Name Response
  params:
    - name: output_number
      type: integer
    - name: text_length
      type: integer
    - name: text
      type: string

- id: OS
  label: Output Status Response
  params:
    - name: output_number
      type: integer
    - name: input_number
      type: integer
      description: "0 = no input routed"

- id: PC
  label: Preset Change Response
  params:
    - name: preset_number
      type: integer
    - name: success
      type: integer
      description: "1 = successful, 0 = no valid routing data"

- id: PN
  label: Preset Name Response
  params:
    - name: preset_number
      type: integer
    - name: text_length
      type: integer
    - name: text
      type: string

- id: PS
  label: Preset Status Response
  params:
    - name: preset_number
      type: integer
      description: "00 = no preset active"
    - name: match_status
      type: integer
      description: "1 = routing matches stored preset, 0 = changed"

- id: PV
  label: Preset Validate Response
  params:
    - name: preset_number
      type: integer
    - name: valid
      type: integer
      description: "1+ = valid data, 0 = no data"

- id: RN
  label: Router Number Response
  params:
    - name: router_number
      type: integer
```

## Macros
```yaml
- id: DD
  label: Data Dump
  description: "Equivalent to sending CR, RN, IV, IN, OR, PV, PR, ON requests sequentially"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes

Command format: 8+2 ASCII characters **ABxNNxNN↵** where AB = text command, NN = decimal with leading zero, x = don't care, ↵ = CR+LF (0x0d 0x0a).

Router outputs displayed as letters (A=1, B=2, etc.) in GUI but addressed as decimal numbers in commands.

Some commands tagged `<v1.4>` or `<v1.41>` or `<v1.52>` — minimum version requirements not fully documented.
<!-- UNRESOLVED: complete version compatibility matrix not provided in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: zen_ndirouter_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:23.539Z
retrieved_at: 2026-04-27T10:13:23.539Z
last_checked_at: 2026-04-27T10:13:23.539Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:23.539Z
matched_actions: 25
action_count: 25
confidence: high
summary: "All 25 spec actions matched literally in source; transport verified; complete command catalogue coverage."
```

## Known Gaps

```yaml
[]
```
