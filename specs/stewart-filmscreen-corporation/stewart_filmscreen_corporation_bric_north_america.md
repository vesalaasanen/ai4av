---
spec_id: admin/stewart-filmscreen-corporation-bric
schema_version: ai4av-public-spec-v1
revision: 1
title: "Stewart Filmscreen BRIC Control Spec"
manufacturer: "Stewart Filmscreen Corporation"
model_family: "BRIC Masking Controller"
aliases: []
compatible_with:
  manufacturers:
    - "Stewart Filmscreen Corporation"
  models:
    - "BRIC Masking Controller"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
  - applicationmarket.crestron.com
retrieved_at: 2026-05-04T12:21:35.188Z
last_checked_at: 2026-05-04T16:17:49.759Z
generated_at: 2026-05-04T16:17:49.759Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - P0
verification:
  verdict: verified
  checked_at: 2026-05-04T16:17:49.759Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 spec actions match source commands; P0 is explicitly marked Not Implemented; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# Stewart Filmscreen BRIC Control Spec

## Summary
Stewart Filmscreen BRIC (Binary Reciprocal Intelligent Controller) is a masking controller for projection screens. Supports serial RS-232 control from AMX, Crestron, or other home automation systems. Control via dot-delimited command syntax (`#XXYY↵`) with 4addressable unit addresses (factory default 01). Channel C maps to the door and closes automatically when screen and mask are retracted.

<!-- UNRESOLVED: no HTTP/TCP/IP/REST protocol documented — serial only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# UNRESOLVED: power commands not documented
# routable: Channel A (screen), B (mask), C (door) - movement commands present
# levelable: UNRESOLVED - no level/position value commands in source
# queryable: UNRESOLVED - no query/status response commands in source
```

## Actions
```yaml
- id: channel_a_up
  label: Channel A Up
  kind: action
  params: []
- id: channel_a_down
  label: Channel A Down
  kind: action
  params: []
- id: channel_b_up
  label: Channel B Up
  kind: action
  params: []
- id: channel_b_down
  label: Channel B Down
  kind: action
  params: []
- id: channel_c_up
  label: Channel C Up / Door Open
  kind: action
  params: []
- id: channel_c_down
  label: Channel C Down / Door Close
  kind: action
  params: []
- id: stop_motor_a
  label: Stop Motor Channel A
  kind: action
  params: []
- id: stop_motor_b
  label: Stop Motor Channel B
  kind: action
  params: []
- id: stop_motor_c
  label: Stop Motor Channel C
  kind: action
  params: []
- id: move_to_preset_0
  label: Move to Preset 0 (Home)
  kind: action
  params: []
- id: move_to_preset_1
  label: Move to Preset 1
  kind: action
  params: []
- id: move_to_preset_2
  label: Move to Preset 2
  kind: action
  params: []
- id: move_to_preset_3
  label: Move to Preset 3
  kind: action
  params: []
- id: move_to_preset_4
  label: Move to Preset 4
  kind: action
  params: []
- id: move_to_preset_5
  label: Move to Preset 5
  kind: action
  params: []
- id: move_to_preset_6
  label: Move to Preset 6
  kind: action
  params: []
- id: move_to_preset_7
  label: Move to Preset 7
  kind: action
  params: []
- id: move_to_preset_8
  label: Move to Preset 8
  kind: action
  params: []
- id: move_to_preset_9
  label: Move to Preset 9
  kind: action
  params: []
- id: store_preset_1
  label: Store Preset 1
  kind: action
  params: []
- id: store_preset_2
  label: Store Preset 2
  kind: action
  params: []
- id: store_preset_3
  label: Store Preset 3
  kind: action
  params: []
- id: store_preset_4
  label: Store Preset 4
  kind: action
  params: []
- id: store_preset_5
  label: Store Preset 5
  kind: action
  params: []
- id: store_preset_6
  label: Store Preset 6
  kind: action
  params: []
- id: store_preset_7
  label: Store Preset 7
  kind: action
  params: []
- id: store_preset_8
  label: Store Preset 8
  kind: action
  params: []
- id: store_preset_9
  label: Store Preset 9
  kind: action
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no response/acknowledgement strings documented
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Channel C (door) closes automatically when both Channel A (screen) and Channel B (mask) are thoroughly retracted.
# UNRESOLVED: no other safety warnings or interlock procedures in source
```

## Notes
Command syntax: `#XXYY↵` where `XX` = unit address (01–04, factory default 01) and `YY` = command key. Carriage return only — not line feed. Serial parameters are fixed at 19200/N/8/1/None and cannot be changed within the BRIC. Pinout uses standard RJ45 (connector J6): TX=pin4, RX=pin6, GND=pin3/pin5, RTS=pin1, CTS=pin2, +485=pin7, -485=pin8.
<!-- UNRESOLVED: P0 (Not Implemented) command present but omitted from actions -->
<!-- UNRESOLVED: no query commands, no response format, no status reporting documented -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
  - applicationmarket.crestron.com
retrieved_at: 2026-05-04T12:21:35.188Z
last_checked_at: 2026-05-04T16:17:49.759Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T16:17:49.759Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 spec actions match source commands; P0 is explicitly marked Not Implemented; transport parameters verified."
```

## Known Gaps

```yaml
- P0
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
