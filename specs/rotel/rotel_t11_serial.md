---
spec_id: admin/rotel-t11
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel T11 Control Spec"
manufacturer: Rotel
model_family: T11
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - T11
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/T11%20Protocol.pdf"
retrieved_at: 2026-05-27T13:37:50.069Z
last_checked_at: 2026-05-31T21:00:14.670Z
generated_at: 2026-05-31T21:00:14.670Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no standalone settable parameters beyond discrete actions"
  - "unsolicited event notifications not documented"
  - "multi-step macro sequences not documented"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-31T21:00:14.670Z
  matched_actions: 60
  action_count: 60
  confidence: medium
  summary: "All 60 spec actions matched verbatim to source commands; transport parameters verified in connection settings table. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Rotel T11 Control Spec

## Summary
Rotel T11 DAB/FM tuner with RS-232 ASCII control protocol. All commands terminate with "!". No login/auth required. Source specifies 115200/8/N/1.

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
- powerable       # power_on/power_off/power_toggle present
- routable        # source selection commands present (fm, dab)
- queryable       # get_* query commands present
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
  label: Source FM
  kind: action
  params: []

- id: source_dab
  label: Source DAB
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

- id: queue
  label: Access Preset List
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

- id: fm_mono
  label: Toggle FM Mono/Stereo Mode
  kind: action
  params: []

- id: fm_rds_disp
  label: Toggle FM RDS or DAB Station Information
  kind: action
  params: []

- id: menu
  label: Display System Menu
  kind: action
  params: []

- id: module_setup
  label: Display FM/DAB Setup Menu
  kind: action
  params: []

- id: exit
  label: Exit Key
  kind: action
  params: []

- id: up
  label: Cursor Up
  kind: action
  params: []

- id: down
  label: Cursor Down
  kind: action
  params: []

- id: left
  label: Cursor Left
  kind: action
  params: []

- id: right
  label: Cursor Right
  kind: action
  params: []

- id: enter
  label: Enter Key
  kind: action
  params: []

- id: key_1
  label: Number Key 1
  kind: action
  params: []

- id: key_2
  label: Number Key 2
  kind: action
  params: []

- id: key_3
  label: Number Key 3
  kind: action
  params: []

- id: key_4
  label: Number Key 4
  kind: action
  params: []

- id: key_5
  label: Number Key 5
  kind: action
  params: []

- id: key_6
  label: Number Key 6
  kind: action
  params: []

- id: key_7
  label: Number Key 7
  kind: action
  params: []

- id: key_8
  label: Number Key 8
  kind: action
  params: []

- id: key_9
  label: Number Key 9
  kind: action
  params: []

- id: key_0
  label: Number Key 0
  kind: action
  params: []

- id: memory
  label: Select Memory for Saving Presets
  kind: action
  params: []

- id: call_fm_preset_n
  label: Recall FM Preset n
  kind: action
  params:
    - name: n
      type: integer
      description: Preset number (01 - 30)

- id: call_dab_preset_n
  label: Recall DAB Preset n
  kind: action
  params:
    - name: n
      type: integer
      description: Preset number (01 - 30)

- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  params: []

- id: dimmer_0
  label: Set Display Brightest
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
  label: Set Display Dimmest
  kind: action
  params: []

- id: display_update_auto
  label: Set Display Update to Auto
  kind: action
  params: []

- id: display_update_manual
  label: Set Display Update to Manual
  kind: action
  params: []

- id: get_display
  label: Request Entire Display
  kind: query
  params: []

- id: get_display1
  label: Request Display Line 1
  kind: query
  params: []

- id: get_display2
  label: Request Display Line 2
  kind: query
  params: []

- id: get_product_type
  label: Request Product Type
  kind: query
  params: []

- id: get_product_version
  label: Request Main CPU Software Version
  kind: query
  params: []

- id: get_display_size
  label: Request Display Size
  kind: query
  params: []

- id: get_display_update
  label: Request Display Update Mode
  kind: query
  params: []

- id: get_current_power
  label: Request Current Power Status
  kind: query
  params: []

- id: get_current_source
  label: Request Current Source
  kind: query
  params: []

- id: get_current_station
  label: Request Current Station
  kind: query
  params: []

- id: get_current_preset
  label: Request Current Preset
  kind: query
  params: []

- id: get_signal_strength
  label: Request FM Signal Strength
  kind: query
  params: []

- id: get_current_dimmer
  label: Request Current Dimmer Status
  kind: query
  params: []

- id: get_fm_preset_n
  label: Request FM Preset n Info
  kind: query
  params:
    - name: n
      type: integer
      description: Preset number (1 - 30)

- id: get_dab_preset_n
  label: Request DAB Preset n Info
  kind: query
  params:
    - name: n
      type: integer
      description: Preset number (1 - 30)

- id: get_allpreset_fm
  label: Request All FM Presets
  kind: query
  params: []

- id: get_allpreset_dab
  label: Request All DAB Presets
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  description: Power status feedback

- id: source_state
  type: enum
  values: [fm, dab]
  description: Source selection feedback

- id: display_text
  type: string
  description: Display data with byte count prefix (e.g. display=020,Sample Text)

- id: display_line1
  type: string
  description: Display line 1 with byte count prefix

- id: display_line2
  type: string
  description: Display line 2 with byte count prefix

- id: product_type
  type: string
  description: Rotel product type name

- id: product_version
  type: string
  description: Main CPU software version

- id: display_size
  type: string
  description: Display columns and rows (e.g. display_size=20,02!)

- id: display_update_mode
  type: enum
  values: [auto, manual]
  description: Display refresh mode status

- id: current_station
  type: string
  description: FM frequency or DAB station name

- id: current_preset
  type: string
  description: Current FM or DAB preset number

- id: signal_strength
  type: integer
  description: FM signal strength 0-5

- id: dimmer_state
  type: integer
  description: Dimmer level 0-6

- id: fm_preset_info
  type: string
  description: FM preset info with byte count prefix

- id: dab_preset_info
  type: string
  description: DAB preset info with byte count prefix
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented
```

## Macros
```yaml
# UNRESOLVED: multi-step macro sequences not documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
All commands terminated by "!". No spaces in commands. No CR/LF after terminator. Variable-length responses use byte count encoding before text (e.g. "display=020,text"). 115200 baud stated explicitly.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/T11%20Protocol.pdf"
retrieved_at: 2026-05-27T13:37:50.069Z
last_checked_at: 2026-05-31T21:00:14.670Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:00:14.670Z
matched_actions: 60
action_count: 60
confidence: medium
summary: "All 60 spec actions matched verbatim to source commands; transport parameters verified in connection settings table. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no standalone settable parameters beyond discrete actions"
- "unsolicited event notifications not documented"
- "multi-step macro sequences not documented"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
