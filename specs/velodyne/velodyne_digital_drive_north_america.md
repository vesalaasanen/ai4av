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
source_urls:
  - https://velodyneacoustics.com/pdf/digitaldrive/DDManual.pdf
  - https://applicationmarket.crestron.com/velodyne-digital-drive-north-america/
retrieved_at: 2026-04-29T20:06:51.898Z
last_checked_at: 2026-09-27T15:05:17.301Z
generated_at: 2026-09-27T15:05:17.301Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no firmware version stated"
  - "flow control not mentioned in source"
  - "no additional settable parameters found in source"
  - "no unsolicited notifications described in source"
  - "response format for query commands not explicitly documented"
verification:
  verdict: verified
  checked_at: 2026-09-27T15:05:17.301Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 RS-232 requests match; physical remote-key procedures are separately scoped and not invented as serial commands. (5 unresolved item(s) noted in Known Gaps.)"
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
  type: UNRESOLVED  # Authentication requirements are not stated in the source
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
  command: "#VO{level}$"
  params:
    - name: level
      type: string
      description: "Exactly two decimal ASCII digits, zero-padded, 00 through 99 (for example 05)."
      pattern: "^[0-9]{2}$"

- id: volume_up
  label: Volume Up
  kind: action
  command: "#VO+$"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "#VO-$"
  params: []

- id: volume_query
  label: Query Volume
  kind: action
  command: "#VO?$"
  params: []

- id: preset_activate
  label: Activate Preset
  kind: action
  command: "#PS{preset}$"
  params:
    - name: preset
      type: integer
      description: Preset number 1-6
      range: [1, 6]

- id: preset_query
  label: Query Preset
  kind: action
  command: "#PS?$"
  params: []

- id: logo_light_set
  label: Set Logo Light
  kind: action
  command: "#LT{state}$"
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
  command: "#LT?$"
  params: []

- id: night_mode_set
  label: Set Night Mode
  kind: action
  command: "#NM{state}$"
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
  command: "#NM?$"
  params: []

- id: mute_set
  label: Set Mute
  kind: action
  command: "#MU{state}$"
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
  command: "#MU?$"
  params: []

- id: power_set
  label: Set Power
  kind: action
  command: "#JU{state}$"
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
  command: "#JU?$"
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
# No RS-232 macro sequence is documented. Appendix B describes physical remote-key sequences, not serial wire commands.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No RS-232 command interlocks are documented. Appendix B warns to connect the microphone before remote Self-EQ; that physical remote procedure is outside this serial command set.
```

## Notes
This spec covers Appendix A RS-232 commands. Appendix B physical remote sequences (Self-EQ, restore defaults, video mode, serial-number display, saved-volume reset and test display) are not documented as serial wire commands and are not translated into invented RS-232 Actions.
Command format: `#` header, 3-4 ASCII chars command + params, `$` terminator. All commands case-sensitive, CAPS ONLY.
<!-- UNRESOLVED: response format for query commands not explicitly documented -->

## Provenance

```yaml
source_domains:
  - velodyneacoustics.com
  - applicationmarket.crestron.com
source_urls:
  - https://velodyneacoustics.com/pdf/digitaldrive/DDManual.pdf
  - https://applicationmarket.crestron.com/velodyne-digital-drive-north-america/
retrieved_at: 2026-04-29T20:06:51.898Z
last_checked_at: 2026-09-27T15:05:17.301Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-27T15:05:17.301Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 RS-232 requests match; physical remote-key procedures are separately scoped and not invented as serial commands. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no firmware version stated"
- "flow control not mentioned in source"
- "no additional settable parameters found in source"
- "no unsolicited notifications described in source"
- "response format for query commands not explicitly documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
