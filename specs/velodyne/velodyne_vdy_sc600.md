---
spec_id: admin/velodyne-vdy-sc600
schema_version: ai4av-public-spec-v1
revision: 1
title: "Velodyne VDY SC600 Control Spec"
manufacturer: Velodyne
model_family: "VDY SC600"
aliases: []
compatible_with:
  manufacturers:
    - Velodyne
  models:
    - "VDY SC600"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - velodyneacoustics.com
source_urls:
  - http://velodyneacoustics.com/pdf/sc-600/SC-600AmpManual.pdf
  - https://www.velodyneacoustics.com/pdf/sc-600/SC-602AmpManual.pdf
retrieved_at: 2026-04-30T19:30:46.975Z
last_checked_at: 2026-06-02T22:16:03.630Z
generated_at: 2026-06-02T22:16:03.630Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no firmware version compatibility stated"
  - "flow control not stated"
  - "COM port number not stated"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures stated in source"
  - "response format/echo behavior not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:16:03.630Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Velodyne VDY SC600 Control Spec

## Summary
RS-232 serial subwoofer controller. 9600 baud, 8N1. Commands: volume, preset, logo light, night mode, mute, power. All commands ASCII-formatted with `#` header and `$` terminator.

<!-- UNRESOLVED: no firmware version compatibility stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # stated: "Baud Rate: 9600"
  data_bits: 8    # stated: "Data Bits: 8"
  parity: none     # stated: "Parity: None"
  stop_bits: 1    # stated: "Stop Bits: 1"
  flow_control: null  # UNRESOLVED: flow control not stated
addressing:
  port: null  # UNRESOLVED: COM port number not stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: power on/off commands present
- levelable    # inferred: volume control commands present
- queryable    # inferred: query commands (e.g. #VO?$, #JU?$) present
```

## Actions
```yaml
- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 80]
      description: Volume level 0-80
  command: "#VO{level}$"
  example: "#VO25$"

- id: volume_up
  label: Volume Up
  kind: action
  params: []
  command: "#VO+$"
  example: "#VO+$"

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  command: "#VO-$"
  example: "#VO-$"

- id: volume_query
  label: Query Volume
  kind: action
  params: []
  command: "#VO?$"
  example: "#VO?$"

- id: preset_activate
  label: Activate Preset
  kind: action
  params:
    - name: preset
      type: integer
      range: [1, 4]
      description: Preset number 1-4
  command: "#PS{preset}$"
  example: "#PS1$"

- id: preset_query
  label: Query Preset
  kind: action
  params: []
  command: "#PS?$"
  example: "#PS?$"

- id: logo_light_set
  label: Set Logo Light
  kind: action
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0: Off, 1: On"
  command: "#LT{state}$"
  example: "#LT0$"

- id: logo_light_query
  label: Query Logo Light
  kind: action
  params: []
  command: "#LT?$"
  example: "#LT?$"

- id: night_mode_set
  label: Set Night Mode
  kind: action
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0: Off, 1: On"
  command: "#NM{state}$"
  example: "#NM0$"

- id: night_mode_query
  label: Query Night Mode
  kind: action
  params: []
  command: "#NM?$"
  example: "#NM?$"

- id: mute_set
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0: Unmute, 1: Mute"
  command: "#MU{state}$"
  example: "#MU1$"

- id: mute_query
  label: Query Mute
  kind: action
  params: []
  command: "#MU?$"
  example: "#MU?$"

- id: power_set
  label: Set Power
  kind: action
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0: Off, 1: On"
  command: "#JU{state}$"
  example: "#JU0$"

- id: power_query
  label: Query Power
  kind: action
  params: []
  command: "#JU?$"
  example: "#JU?$"
```

## Feedbacks
```yaml
- id: volume_response
  type: integer
  range: [0, 80]
  description: Current volume level returned in response to #VO?$

- id: preset_response
  type: integer
  range: [1, 4]
  description: Current preset number returned in response to #PS?$

- id: logo_light_response
  type: enum
  values: [0, 1]
  description: "Logo light state returned in response to #LT?$"

- id: night_mode_response
  type: enum
  values: [0, 1]
  description: "Night mode state returned in response to #NM?$"

- id: mute_response
  type: enum
  values: [0, 1]
  description: "Mute state returned in response to #MU?$"

- id: power_response
  type: enum
  values: [0, 1]
  description: "Power state returned in response to #JU?$"
```

## Variables
```yaml
# All settable parameters are discrete actions; no variables section applicable.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Serial port: FEMALE DB-9 connector. IN port: Pin 2=TX, Pin 3=RX, Pin 5=GND. OUT port: Pin 2=RX, Pin 3=TX, Pin 5=GND. Direct PC connection via female-to-male serial cable requires only 3 pins (TX, RX, GND). Commands are ASCII, case-sensitive, CAPS ONLY. Header `#`, terminator `$` (required or command ignored).
<!-- UNRESOLVED: response format/echo behavior not documented -->

## Provenance

```yaml
source_domains:
  - velodyneacoustics.com
source_urls:
  - http://velodyneacoustics.com/pdf/sc-600/SC-600AmpManual.pdf
  - https://www.velodyneacoustics.com/pdf/sc-600/SC-602AmpManual.pdf
retrieved_at: 2026-04-30T19:30:46.975Z
last_checked_at: 2026-06-02T22:16:03.630Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:16:03.630Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no firmware version compatibility stated"
- "flow control not stated"
- "COM port number not stated"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures stated in source"
- "response format/echo behavior not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
