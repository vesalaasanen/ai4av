---
spec_id: admin/rotel-rt_11_v02
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RT-11 V02 Control Spec"
manufacturer: Rotel
model_family: "RT-11 V02"
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - "RT-11 V02"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RT11%20Protocol.pdf"
retrieved_at: 2026-05-21T20:52:15.149Z
last_checked_at: 2026-06-12T19:35:22.388Z
generated_at: 2026-06-12T19:35:22.388Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "rear-panel mini USB models (pre-V02) do not support this protocol"
  - "no standalone settable parameters separate from discrete actions"
  - "unsolicited notifications not described in source"
  - "no multi-step macros described in source"
  - "no safety warnings or interlock procedures in source"
  - "rear-panel mini USB models do not support this protocol (earlier models)"
  - "unsolicited event emissions not confirmed in source (display update is requestable)"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:35:22.388Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched verbatim in source; transport parameters (115200 baud, 8 data bits, no parity, 1 stop bit, no flow control) confirmed; source coverage is complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Rotel RT-11 V02 Control Spec

## Summary
Rotel RT-11 V02 tuner with RS-232 ASCII control protocol. All commands terminated by `!`. Responses terminate with `!` or byte-count prefix for variable-length text. No flow control on RS-232 hardware.

<!-- UNRESOLVED: rear-panel mini USB models (pre-V02) do not support this protocol -->

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
- powerable       # power_on!, power_off!, power_toggle!
- queryable       # get_current_power!, get_current_source!, etc.
- routable        # fm!, dab! source selection
- levelable       # dimmer_0! through dimmer_6!
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
  label: Toggle FM RDS / DAB Station Information
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

- id: numeric_key
  label: Numeric Key
  kind: action
  params:
    - name: digit
      type: integer
      description: Digit 0-9

- id: memory
  label: Select Memory for Saving Presets
  kind: action
  params: []

- id: recall_fm_preset
  label: Recall FM Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-30

- id: recall_dab_preset
  label: Recall DAB Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-30

- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  params: []

- id: dimmer_level
  label: Set Display Dimmer Level
  kind: action
  params:
    - name: level
      type: integer
      description: Dimmer level 0-6 (0=brightest, 6=dimmest)

- id: display_update_auto
  label: Set Display Update to Auto
  kind: action
  params: []

- id: display_update_manual
  label: Set Display Update to Manual
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - on
    - standby

- id: current_source
  label: Current Source
  type: enum
  values:
    - fm
    - dab

- id: display_update_mode
  label: Display Update Mode
  type: enum
  values:
    - auto
    - manual

- id: dimmer_state
  label: Dimmer State
  type: integer
  description: 0 (brightest) to 6 (dimmest)

- id: display
  label: Full Display
  type: string
  description: "3-digit byte count + comma + text, e.g. display=020,Sample Text"

- id: display_line1
  label: Display Line 1
  type: string
  description: "2-digit byte count + comma + text"

- id: display_line2
  label: Display Line 2
  type: string
  description: "2-digit byte count + comma + text"

- id: product_type
  label: Product Type
  type: string
  description: "2-digit byte count + comma + product name, e.g. product_type=05,RT-11"

- id: product_version
  label: Product Version
  type: string
  description: "2-digit byte count + comma + version string, e.g. product_version=06,V2.1.6"

- id: display_size
  label: Display Size
  type: string
  description: "Columns and rows, e.g. display_size=20,02!"

- id: current_station
  label: Current Station
  type: string
  description: "FM: 9-char frequency + !; DAB: 16-char station name + !"

- id: current_preset
  label: Current Preset
  type: string
  description: "preset_fm=##! or preset_dab=##!"

- id: fm_preset
  label: FM Preset
  type: string
  description: "fm_preset_n=##,text"

- id: dab_preset
  label: DAB Preset
  type: string
  description: "dab_preset_n=##,text"

- id: all_fm_presets
  label: All FM Presets
  type: string
  description: "fm_allpreset_01 through fm_allpreset_30"

- id: all_dab_presets
  label: All DAB Presets
  type: string
  description: "dab_allpreset_01 through dab_allpreset_30"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters separate from discrete actions
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not described in source
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
All commands require `!` terminator. No spaces in commands. No carriage return or line feed after command. Responses terminate with `!` or variable-length byte-count prefix. RS-232 hardware does not support flow control — packet loss possible without proper timing.

<!-- UNRESOLVED: rear-panel mini USB models do not support this protocol (earlier models) -->
<!-- UNRESOLVED: unsolicited event emissions not confirmed in source (display update is requestable) -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RT11%20Protocol.pdf"
retrieved_at: 2026-05-21T20:52:15.149Z
last_checked_at: 2026-06-12T19:35:22.388Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:35:22.388Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched verbatim in source; transport parameters (115200 baud, 8 data bits, no parity, 1 stop bit, no flow control) confirmed; source coverage is complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "rear-panel mini USB models (pre-V02) do not support this protocol"
- "no standalone settable parameters separate from discrete actions"
- "unsolicited notifications not described in source"
- "no multi-step macros described in source"
- "no safety warnings or interlock procedures in source"
- "rear-panel mini USB models do not support this protocol (earlier models)"
- "unsolicited event emissions not confirmed in source (display update is requestable)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
