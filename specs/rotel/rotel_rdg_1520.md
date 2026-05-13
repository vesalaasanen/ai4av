---
spec_id: admin/rotel-rdg-1520
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RDG-1520 Control Spec"
manufacturer: Rotel
model_family: RDG-1520
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RDG-1520
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
retrieved_at: 2026-05-04T16:41:32.014Z
last_checked_at: 2026-05-04T16:08:48.073Z
generated_at: 2026-05-04T16:08:48.073Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T16:08:48.073Z
  matched_actions: 52
  action_count: 52
  confidence: high
  summary: "All 52 spec actions matched source commands verbatim; transport parameters confirmed in connection settings table."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Rotel RDG-1520 Control Spec

## Summary
The Rotel RDG-1520 is a digital audio receiver/tuner with RS-232 ASCII-based control protocol. The protocol uses plain text commands terminated by `!`, replacing an earlier HEX-based protocol. No authentication is required. Software version V1.1.5 or later is required.

<!-- UNRESOLVED: applicable firmware version range not stated in source -->

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
- powerable
- routable
- queryable
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
- id: source_iradio
  label: Source iRadio
  kind: action
  params: []
- id: source_network
  label: Source Network
  kind: action
  params: []
- id: source_aux1_coax
  label: Source Aux 1 Coax
  kind: action
  params: []
- id: source_aux1_opt
  label: Source Aux 1 Optical
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
- id: source_usb
  label: Source USB
  kind: action
  params: []
- id: source_aux1_toggle
  label: Source Aux 1 Coax/Opt Toggle
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
  label: Pause
  kind: action
  params: []
- id: track_fwd
  label: Track Forward/Tune Up
  kind: action
  params: []
- id: track_back
  label: Track Backward/Tune Down
  kind: action
  params: []
- id: fast_fwd
  label: Fast Forward/Search Forward
  kind: action
  params: []
- id: fast_back
  label: Fast Backward/Search Backward
  kind: action
  params: []
- id: random
  label: Random PlayMode Toggle
  kind: action
  params: []
- id: repeat
  label: Repeat PlayMode Toggle
  kind: action
  params: []
- id: menu
  label: Display Menu
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
- id: enter_long
  label: Long Press Enter Key
  kind: action
  params: []
- id: digit_0
  label: Number Key 0
  kind: action
  params: []
- id: digit_1
  label: Number Key 1
  kind: action
  params: []
- id: digit_2
  label: Number Key 2
  kind: action
  params: []
- id: digit_3
  label: Number Key 3
  kind: action
  params: []
- id: digit_4
  label: Number Key 4
  kind: action
  params: []
- id: digit_5
  label: Number Key 5
  kind: action
  params: []
- id: digit_6
  label: Number Key 6
  kind: action
  params: []
- id: digit_7
  label: Number Key 7
  kind: action
  params: []
- id: digit_8
  label: Number Key 8
  kind: action
  params: []
- id: digit_9
  label: Number Key 9
  kind: action
  params: []
- id: digit_10_plus
  label: Number Key 10+
  kind: action
  params: []
- id: memory
  label: Select Memory for Saving Presets
  kind: action
  params: []
- id: call_iradio_preset
  label: Recall iRadio Preset n
  kind: action
  params:
    - name: n
      type: integer
      description: Preset number (01-30)
- id: call_fm_preset
  label: Recall FM Preset n
  kind: action
  params:
    - name: n
      type: integer
      description: Preset number (01-30)
- id: call_dab_preset
  label: Recall DAB Preset n
  kind: action
  params:
    - name: n
      type: integer
      description: Preset number (01-30)
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
- id: get_display3
  label: Request Display Line 3
  kind: query
  params: []
- id: get_display4
  label: Request Display Line 4
  kind: query
  params: []
- id: get_product_type
  label: Request Product Type
  kind: query
  params: []
- id: get_product_version
  label: Request Product Version
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
- id: get_current_preset
  label: Request Current Preset
  kind: query
  params: []
- id: get_iradio_preset_n
  label: Request Saved iRadio Preset n
  kind: query
  params:
    - name: n
      type: integer
      description: Preset number (1-30)
- id: get_allpreset_iradio
  label: Request All Saved iRadio Presets
  kind: query
  params: []
- id: get_fm_preset_n
  label: Request Saved FM Preset n
  kind: query
  params:
    - name: n
      type: integer
      description: Preset number (1-30)
- id: get_allpreset_fm
  label: Request All Saved FM Presets
  kind: query
  params: []
- id: get_dab_preset_n
  label: Request Saved DAB Preset n
  kind: query
  params:
    - name: n
      type: integer
      description: Preset number (1-30)
- id: get_allpreset_dab
  label: Request All Saved DAB Presets
  kind: query
  params: []
- id: get_play_status
  label: Request Play Status
  kind: query
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
- id: source_state
  label: Source State
  type: enum
  values:
    - iradio
    - network
    - aux1_coax
    - aux1_opt
    - aux1
    - fm
    - dab
    - usb
- id: play_status
  label: Play Status
  type: enum
  values:
    - play
    - stop
    - pause
- id: track_info
  label: Track/Tune Info
  type: string
  description: Current track number or tuner frequency
- id: time_info
  label: Time Info
  type: string
  description: Playback time in HH:MM:SS format
- id: display
  label: Full Display
  type: string
  description: Entire display content with 3-digit length prefix
- id: display1
  label: Display Line 1
  type: string
  description: Display line 1 with 2-digit length prefix
- id: display2
  label: Display Line 2
  type: string
  description: Display line 2 with 2-digit length prefix
- id: display3
  label: Display Line 3
  type: string
  description: Display line 3 with 2-digit length prefix
- id: display4
  label: Display Line 4
  type: string
  description: Display line 4 with 2-digit length prefix
- id: display_update_mode
  label: Display Update Mode
  type: enum
  values:
    - auto
    - manual
- id: current_preset
  label: Current Preset
  type: object
  properties:
    - name: iradio
      type: integer
    - name: fm
      type: integer
    - name: dab
      type: integer
- id: iradio_preset_n
  label: iRadio Preset n
  type: object
  properties:
    - name: n
      type: integer
    - name: text
      type: string
- id: fm_preset_n
  label: FM Preset n
  type: object
  properties:
    - name: n
      type: integer
    - name: text
      type: string
- id: dab_preset_n
  label: DAB Preset n
  type: object
  properties:
    - name: n
      type: integer
    - name: text
      type: string
- id: allpreset_iradio
  label: All iRadio Presets
  type: array
- id: allpreset_fm
  label: All FM Presets
  type: array
- id: allpreset_dab
  label: All DAB Presets
  type: array
- id: product_type
  label: Product Type
  type: string
  description: Rotel product type name with 2-digit length prefix
- id: product_version
  label: Product Version
  type: string
  description: Main CPU software version with 2-digit length prefix
- id: display_size
  label: Display Size
  type: string
  description: Columns and rows (e.g., "20,04")
```

## Variables
```yaml
# UNRESOLVED: no settable parameters found in source beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented; device sends
# display updates only when display_update_auto is enabled and display changes
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All commands terminated by `!` character. No carriage return or line feed.
- Response terminators: `!` for fixed responses, or 2-3 digit byte count followed by `,` for variable-length text.
- RS-232 hardware does not support flow control; application must handle packet pacing.
- Display auto-update mode sends new display lines each time display changes; manual mode requires explicit refresh requests.
- Special multi-byte hex characters (EE 82 XX) used for certain display symbols.
<!-- UNRESOLVED: device power-on sequencing requirements not documented -->

## Provenance

```yaml
source_domains:
  - rotel.com
retrieved_at: 2026-05-04T16:41:32.014Z
last_checked_at: 2026-05-04T16:08:48.073Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T16:08:48.073Z
matched_actions: 52
action_count: 52
confidence: high
summary: "All 52 spec actions matched source commands verbatim; transport parameters confirmed in connection settings table."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
