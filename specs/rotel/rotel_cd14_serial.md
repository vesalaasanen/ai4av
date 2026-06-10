---
spec_id: admin/rotel-cd14
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel CD14 Control Spec"
manufacturer: Rotel
model_family: CD14
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - CD14
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/CD14%20Protocol.pdf"
  - https://rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-05-21T20:42:19.920Z
last_checked_at: 2026-06-10T01:08:21.050Z
generated_at: 2026-06-10T01:08:21.050Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "No voltage, power consumption, or amplifier integration details in source"
  - "no standalone settable parameters outside discrete actions"
  - "no unsolicited event documentation beyond rs232_update mode"
  - "no explicit multi-step macros in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility, voltage/power specs, amplifier integration details not in source"
verification:
  verdict: verified
  checked_at: 2026-06-10T01:08:21.050Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions matched source commands at same granularity; numeric_key and dimmer_set correctly parameterized; transport parameters verified; source fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Rotel CD14 Control Spec

## Summary
Rotel CD14 RS-232C CD player. ASCII protocol over serial, 57600 baud, 8N1, no flow control. Commands terminated with "!". Responses terminated with "$" (fixed) or "$$" (variable). Supports auto-feedback mode for unsolicited status updates.

<!-- UNRESOLVED: No voltage, power consumption, or amplifier integration details in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  parity: none
  data_bits: 8
  stop_bits: 1
  flow_control: none
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
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_toggle
  label: Power Toggle
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
  label: Pause Toggle
  kind: action
  params: []
- id: track_forward
  label: Track Forward
  kind: action
  params: []
- id: track_backward
  label: Track Backward
  kind: action
  params: []
- id: fast_forward
  label: Fast Forward
  kind: action
  params: []
- id: fast_backward
  label: Fast Backward
  kind: action
  params: []
- id: random_toggle
  label: Random Play Mode Toggle
  kind: action
  params: []
- id: repeat_toggle
  label: Repeat Play Mode Toggle
  kind: action
  params: []
- id: numeric_key
  label: Numeric Key
  kind: action
  params:
    - name: key
      type: integer
      description: Number key 0-9
- id: eject
  label: Eject CD
  kind: action
  params: []
- id: time_toggle
  label: Toggle CD Time Display
  kind: action
  params: []
- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  params: []
- id: dimmer_set
  label: Set Display Dimmer
  kind: action
  params:
    - name: level
      type: integer
      description: Dimmer level 0-6 (0=brightest, 6=dimmest)
- id: rs232_update_on
  label: Set RS232 Update to Auto
  kind: action
  params: []
- id: rs232_update_off
  label: Set RS232 Update to Manual
  kind: action
  params: []
- id: power_query
  label: Query Power Status
  kind: query
  params: []
- id: status_query
  label: Query Play Status
  kind: query
  params: []
- id: track_query
  label: Query Track Number
  kind: query
  params: []
- id: track_name_query
  label: Query Track Name
  kind: query
  params: []
- id: tray_status_query
  label: Query Tray Status
  kind: query
  params: []
- id: random_query
  label: Query Random Mode
  kind: query
  params: []
- id: repeat_query
  label: Query Repeat Mode
  kind: query
  params: []
- id: time_query
  label: Query CD Time
  kind: query
  params: []
- id: disc_name_query
  label: Query Disc Name
  kind: query
  params: []
- id: disc_type_query
  label: Query Disc Type
  kind: query
  params: []
- id: dimmer_query
  label: Query Dimmer Level
  kind: query
  params: []
- id: version_query
  label: Query Firmware Version
  kind: query
  params: []
- id: model_query
  label: Query Model Number
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, standby]
- id: play_status
  label: Play Status
  type: enum
  values: [play, stop, pause]
- id: track_number
  label: Current Track
  type: integer
  description: 3-digit track number
- id: track_name
  label: Track Name
  type: string
  description: UTF-8 encoded track name, double-terminated
- id: tray_status
  label: Tray Status
  type: enum
  values: [open, close, load]
- id: random_mode
  label: Random Mode
  type: enum
  values: [on, off]
- id: repeat_mode
  label: Repeat Mode
  type: enum
  values: [track, disc, off]
- id: disc_time
  label: Disc Time
  type: string
  description: Track/disc elapsed or remaining time (#:##:##)
- id: disc_name
  label: Disc Name
  type: string
  description: UTF-8 encoded CD name, double-terminated
- id: disc_type
  label: Disc Type
  type: enum
  values: [None, CD-DA, HDCD, MP3, WMA]
- id: dimmer_level
  label: Dimmer Level
  type: integer
  description: 0-6
- id: update_mode
  label: RS232 Update Mode
  type: enum
  values: [auto, manual]
- id: version
  label: Firmware Version
  type: string
  description: Main CPU software version
- id: model
  label: Model Number
  type: string
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation beyond rs232_update mode
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands: ASCII strings ending with "!". No spaces, no CR/LF.
- Responses: fixed-length fields end with "$", variable-length strings (track_name, disc_name, time, disc_type) end with "$$".
- rs232_update_on: unit transmits status changes automatically.
- rs232_update_off: unit only responds to poll commands.
- No flow control hardware; application must avoid packet loss by not overwhelming the buffer.
<!-- UNRESOLVED: firmware version compatibility, voltage/power specs, amplifier integration details not in source -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/CD14%20Protocol.pdf"
  - https://rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-05-21T20:42:19.920Z
last_checked_at: 2026-06-10T01:08:21.050Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T01:08:21.050Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions matched source commands at same granularity; numeric_key and dimmer_set correctly parameterized; transport parameters verified; source fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "No voltage, power consumption, or amplifier integration details in source"
- "no standalone settable parameters outside discrete actions"
- "no unsolicited event documentation beyond rs232_update mode"
- "no explicit multi-step macros in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility, voltage/power specs, amplifier integration details not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
