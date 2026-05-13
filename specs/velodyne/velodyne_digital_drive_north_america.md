---
spec_id: admin/velodyne-digital-drive-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Velodyne Digital Drive (North America) Control Spec"
manufacturer: Velodyne
model_family: "Digital Drive (DD)"
aliases: []
compatible_with:
  manufacturers:
    - Velodyne
  models:
    - "Digital Drive (DD)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - velodyneacoustics.com
  - applicationmarket.crestron.com
retrieved_at: 2026-04-29T20:06:51.898Z
last_checked_at: 2026-04-27T10:13:18.285Z
generated_at: 2026-04-27T10:13:18.285Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:18.285Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 14 spec actions match source commands; transport parameters verified; command reference is complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Velodyne Digital Drive (North America) Control Spec

## Summary
Velodyne Digital Drive (DD) subwoofer with RS-232 serial control interface. Supports volume, preset, logo light, night mode, mute, and power commands via ASCII command strings. Serial config: 9600 baud, 7 data bits, no parity, 1 stop bit.

<!-- UNRESOLVED: no firmware version stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 7
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not mentioned in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- levelable
```

## Actions
```yaml
- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 00-99
      range: 0-99

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: volume_query
  label: Query Volume
  kind: action
  params: []

- id: preset_activate
  label: Activate Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-6
      range: 1-6

- id: preset_query
  label: Query Preset
  kind: action
  params: []

- id: logo_light_set
  label: Set Logo Light
  kind: action
  params:
    - name: state
      type: integer
      description: "0: Off, 1: On"
      enum:
        - 0
        - 1

- id: logo_light_query
  label: Query Logo Light
  kind: action
  params: []

- id: night_mode_set
  label: Set Night Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0: Off, 1: On"
      enum:
        - 0
        - 1

- id: night_mode_query
  label: Query Night Mode
  kind: action
  params: []

- id: mute_set
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0: Off, 1: On"
      enum:
        - 0
        - 1

- id: mute_query
  label: Query Mute
  kind: action
  params: []

- id: power_set
  label: Set Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0: Off, 1: On"
      enum:
        - 0
        - 1

- id: power_query
  label: Query Power
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: volume_response
  type: range
  values:
    min: 0
    max: 99
  description: Returns current volume level (00-99)

- id: preset_response
  type: integer
  description: Returns current preset number (1-6)

- id: logo_light_response
  type: enum
  values:
    - 0
    - 1
  description: "0: Light Off, 1: Light On"

- id: night_mode_response
  type: enum
  values:
    - 0
    - 1
  description: "0: Night Mode Off, 1: Night Mode On"

- id: mute_response
  type: enum
  values:
    - 0
    - 1
  description: "0: Mute Off, 1: Mute On"

- id: power_response
  type: enum
  values:
    - 0
    - 1
  description: "0: Power Off, 1: Power On"
```

## Variables
```yaml
# UNRESOLVED: no additional settable parameters found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `#` header, 3-4 ASCII chars command + params, `$` terminator. All commands case-sensitive, CAPS ONLY.
<!-- UNRESOLVED: response format for query commands not explicitly documented -->

## Provenance

```yaml
source_domains:
  - velodyneacoustics.com
  - applicationmarket.crestron.com
retrieved_at: 2026-04-29T20:06:51.898Z
last_checked_at: 2026-04-27T10:13:18.285Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:18.285Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 14 spec actions match source commands; transport parameters verified; command reference is complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
