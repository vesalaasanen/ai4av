---
spec_id: admin/rotel-t14
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel T14 Control Spec"
manufacturer: Rotel
model_family: T14
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - T14
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/T14%20Protocol.pdf"
retrieved_at: 2026-05-21T20:52:29.845Z
last_checked_at: 2026-06-10T01:14:59.372Z
generated_at: 2026-06-10T01:14:59.372Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Play-Fi feedback limited to source only per source text"
  - "no discrete settable parameters beyond dimmer and presets"
  - "no unsolicited event format documented besides rs232_update mode"
  - "no multi-step macros documented"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "Play-Fi stop/FF/FB may be in later firmware per source"
verification:
  verdict: verified
  checked_at: 2026-06-10T01:14:59.372Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions matched one-to-one in source; transport parameters verified; coverage ratio 47/47 = 1.0. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Rotel T14 Control Spec

## Summary
Rotel T14 tuner with RS-232 ASCII protocol. 115200 baud, 8N1, no flow control. Commands terminate with "!". Responses terminate with "$" (fixed length) or "$$" (variable length). Supports FM, DAB, Play-Fi sources. RS-232 updates can be enabled/disabled.

<!-- UNRESOLVED: Play-Fi feedback limited to source only per source text -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # power_on/off/toggle commands present
- routable   # source selection commands present
- queryable  # feedback request commands present
- levelable  # dimmer level commands present
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
- id: source_fm
  label: Select FM Source
  kind: action
  params: []
- id: source_dab
  label: Select DAB Source
  kind: action
  params: []
- id: source_playfi
  label: Select Play-Fi Source
  kind: action
  params: []
- id: tune_up
  label: Tune Up
  kind: action
  params: []
- id: tune_down
  label: Tune Down
  kind: action
  params: []
- id: preset_up
  label: Preset Up
  kind: action
  params: []
- id: preset_down
  label: Preset Down
  kind: action
  params: []
- id: enter
  label: Enter Key
  kind: action
  params: []
- id: fm_mono
  label: Set FM Mono Mode
  kind: action
  params: []
- id: fm_stereo
  label: Set FM Stereo Mode
  kind: action
  params: []
- id: fm_rds
  label: Toggle FM RDS / DAB Station Info
  kind: action
  params: []
- id: set_fm_preset
  label: Save FM Station to Preset
  kind: action
  params:
    - name: preset
      type: integer
      range: [1, 30]
      description: Preset number (01-30)
- id: set_dab_preset
  label: Save DAB Station to Preset
  kind: action
  params:
    - name: preset
      type: integer
      range: [1, 30]
      description: Preset number (01-30)
- id: load_fm_preset
  label: Load FM Preset
  kind: action
  params:
    - name: preset
      type: integer
      range: [1, 30]
      description: Preset number (01-30)
- id: load_dab_preset
  label: Load DAB Preset
  kind: action
  params:
    - name: preset
      type: integer
      range: [1, 30]
      description: Preset number (01-30)
- id: play
  label: Play (Play-Fi)
  kind: action
  params: []
- id: stop
  label: Stop (Play-Fi)
  kind: action
  params: []
- id: pause
  label: Pause (Play-Fi)
  kind: action
  params: []
- id: trkf
  label: Track Forward (Play-Fi)
  kind: action
  params: []
- id: trkb
  label: Track Backward (Play-Fi)
  kind: action
  params: []
- id: ff
  label: Fast Forward (Play-Fi)
  kind: action
  params: []
- id: fb
  label: Fast Backward (Play-Fi)
  kind: action
  params: []
- id: dimmer
  label: Toggle Dimmer
  kind: action
  params: []
- id: dimmer_0
  label: Set Dimmer Brightest
  kind: action
  params: []
- id: dimmer_1
  label: Set Dimmer Level 1
  kind: action
  params: []
- id: dimmer_2
  label: Set Dimmer Level 2
  kind: action
  params: []
- id: dimmer_3
  label: Set Dimmer Level 3
  kind: action
  params: []
- id: dimmer_4
  label: Set Dimmer Level 4
  kind: action
  params: []
- id: dimmer_5
  label: Set Dimmer Level 5
  kind: action
  params: []
- id: dimmer_6
  label: Set Dimmer Dimmest
  kind: action
  params: []
- id: rs232_update_on
  label: Enable RS-232 Auto Updates
  kind: action
  params: []
- id: rs232_update_off
  label: Disable RS-232 Auto Updates
  kind: action
  params: []
- id: power_query
  label: Query Power Status
  kind: query
  params: []
- id: source_query
  label: Query Current Source
  kind: query
  params: []
- id: fm_preset_query
  label: Query FM Preset Number
  kind: query
  params: []
- id: dab_preset_query
  label: Query DAB Preset Number
  kind: query
  params: []
- id: fm_mono_query
  label: Query FM Mono Status
  kind: query
  params: []
- id: fm_freq_query
  label: Query FM Frequency
  kind: query
  params: []
- id: fm_rds_query
  label: Query FM RDS Station Text
  kind: query
  params: []
- id: dab_station_query
  label: Query DAB Station Information
  kind: query
  params: []
- id: dimmer_query
  label: Query Dimmer Level
  kind: query
  params: []
- id: version_query
  label: Query Software Version
  kind: query
  params: []
- id: mac_query
  label: Query MAC Address
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
  label: Power Status
  type: enum
  values: [on, off]
- id: source_state
  label: Source Status
  type: enum
  values: [fm, dab, playfi]
- id: fm_preset
  label: FM Preset Number
  type: integer
  range: [0, 30]
- id: dab_preset
  label: DAB Preset Number
  type: integer
  range: [0, 30]
- id: fm_mono_state
  label: FM Mono/Stereo Status
  type: enum
  values: [mono, stereo]
- id: fm_freq
  label: FM Frequency
  type: string
  pattern: "fm_freq= ###.##$"
- id: fm_rds_text
  label: FM RDS / DAB Station Text
  type: string
  terminator: "$$"
- id: dab_station_text
  label: DAB Station Text
  type: string
  terminator: "$$"
- id: dimmer_level
  label: Dimmer Level
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
- id: version
  label: Main CPU Software Version
  type: string
  pattern: "version=#.##$"
- id: mac_address
  label: MAC Address
  type: string
  pattern: "mac=[0-9A-F]{12}$"
- id: model_number
  label: Model Number
  type: string
  pattern: "model=text$"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond dimmer and presets
```

## Events
```yaml
# UNRESOLVED: no unsolicited event format documented besides rs232_update mode
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
RS-232 hardware does not support flow control. Avoid packet loss by not overwhelming the device. Commands: no spaces, no carriage return/line feed after "!". Responses: "$" for fixed length, "$$" for variable length (station metadata). Play-Fi provides source feedback only — transport status not reported.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: Play-Fi stop/FF/FB may be in later firmware per source -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/T14%20Protocol.pdf"
retrieved_at: 2026-05-21T20:52:29.845Z
last_checked_at: 2026-06-10T01:14:59.372Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T01:14:59.372Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions matched one-to-one in source; transport parameters verified; coverage ratio 47/47 = 1.0. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Play-Fi feedback limited to source only per source text"
- "no discrete settable parameters beyond dimmer and presets"
- "no unsolicited event format documented besides rs232_update mode"
- "no multi-step macros documented"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "Play-Fi stop/FF/FB may be in later firmware per source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
