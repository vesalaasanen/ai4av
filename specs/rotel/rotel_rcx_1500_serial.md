---
spec_id: admin/rotel-rcx-1500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RCX-1500 Control Spec"
manufacturer: Rotel
model_family: RCX-1500
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RCX-1500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1576%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
  - "https://rotel.com/sites/default/files/product/rs232/RT1080%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:04.962Z
last_checked_at: 2026-05-31T20:58:11.537Z
generated_at: 2026-05-31T20:58:11.537Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T20:58:11.537Z
  matched_actions: 59
  action_count: 59
  confidence: high
  summary: "All 59 spec actions matched to source control commands with correct semantic mapping; transport parameters verified; feedback queries represented in Feedbacks section."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Rotel RCX-1500 Control Spec

## Summary
Rotel RCX-1500 stereo receiver with RS-232C ASCII protocol. Control via text commands terminated by `!`. No flow control. Supports power, volume, source selection, playback, tuner presets, and display queries. Protocol effective starting Main software V1.1.5.

<!-- UNRESOLVED: no safety warnings or interlock procedures in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  parity: none
  data_bits: 8
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # power_on/off/toggle commands present
- routable   # source selection commands present
- queryable  # get_* feedback commands present
- levelable  # volume control commands present
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
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: volume_max
  label: Set Volume to Max
  kind: action
  params: []
- id: volume_min
  label: Set Volume to Min
  kind: action
  params: []
- id: volume_n
  label: Set Volume to Level n
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 1-86
- id: mute
  label: Mute Toggle
  kind: action
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: source_cd
  label: Source CD
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
- id: source_aux2
  label: Source Aux 2
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
- id: source_aux1
  label: Source Aux 1 Coax/Opt Toggle
  kind: action
  params: []
- id: play
  label: Play Source
  kind: action
  params: []
- id: stop
  label: Stop Source
  kind: action
  params: []
- id: pause
  label: Pause Source
  kind: action
  params: []
- id: track_fwd
  label: Track Forward / Tune Up
  kind: action
  params: []
- id: track_back
  label: Track Backward / Tune Down
  kind: action
  params: []
- id: fast_fwd
  label: Fast Forward / Search Forward
  kind: action
  params: []
- id: fast_back
  label: Fast Backward / Search Backward
  kind: action
  params: []
- id: eject
  label: Eject CD
  kind: action
  params: []
- id: random
  label: Random Play Mode Toggle
  kind: action
  params: []
- id: repeat
  label: Repeat Play Mode Toggle
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
- id: key_0
  label: Numeric Key 0
  kind: action
  params: []
- id: key_1
  label: Numeric Key 1
  kind: action
  params: []
- id: key_2
  label: Numeric Key 2
  kind: action
  params: []
- id: key_3
  label: Numeric Key 3
  kind: action
  params: []
- id: key_4
  label: Numeric Key 4
  kind: action
  params: []
- id: key_5
  label: Numeric Key 5
  kind: action
  params: []
- id: key_6
  label: Numeric Key 6
  kind: action
  params: []
- id: key_7
  label: Numeric Key 7
  kind: action
  params: []
- id: key_8
  label: Numeric Key 8
  kind: action
  params: []
- id: key_9
  label: Numeric Key 9
  kind: action
  params: []
- id: key_10_plus
  label: Numeric Key 10+
  kind: action
  params: []
- id: memory
  label: Select Memory for Saving Presets
  kind: action
  params: []
- id: call_iradio_preset_n
  label: Recall iRadio Preset n
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-30
- id: call_fm_preset_n
  label: Recall FM Preset n
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-30
- id: call_dab_preset_n
  label: Recall DAB Preset n
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-30
- id: scan
  label: CD Title Scan
  kind: action
  params: []
- id: time
  label: Toggle CD Time Display
  kind: action
  params: []
- id: dimmer
  label: Toggle Display Dimmer
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
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
- id: volume_state
  type: integer
  description: 2-digit volume level
- id: mute_state
  type: enum
  values: [on, off]
- id: current_source
  type: enum
  values: [cd, iradio, network, aux1_coax, aux1_opt, aux2, usb, fm, dab]
- id: play_status
  type: enum
  values: [play, stop, pause]
- id: eject_status
  type: enum
  values: [open, close, loading]
- id: display
  type: string
  description: Full display with 3-digit length prefix
- id: display1
  type: string
  description: Display line 1 with 2-digit length prefix
- id: display2
  type: string
  description: Display line 2 with 2-digit length prefix
- id: display3
  type: string
  description: Display line 3 with 2-digit length prefix
- id: display4
  type: string
  description: Display line 4 with 2-digit length prefix
- id: display_size
  type: string
  description: Columns and rows, format "##,##!"
- id: display_update_mode
  type: enum
  values: [auto, manual]
- id: product_type
  type: string
  description: Rotel product type name
- id: product_version
  type: string
  description: Main CPU software version string
- id: current_preset
  type: object
  properties:
    iradio: integer
    fm: integer
    dab: integer
- id: iradio_preset_n
  type: string
  description: iRadio preset n with 2-digit length prefix
- id: fm_preset_n
  type: string
  description: FM preset n with 2-digit length prefix
- id: dab_preset_n
  type: string
  description: DAB preset n with 2-digit length prefix
- id: volume_max
  type: integer
  description: Maximum volume level (80)
- id: volume_min
  type: integer
  description: Minimum volume level (0)
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside discrete actions in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification descriptions in source
# (display_update_auto mode sends display changes automatically, but event schema not defined)
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes

Command termination: all commands end with `!`. Responses end with `!` or byte count for variable-length text.

No CR/LF after commands. RS-232 hardware has no flow control — sender must avoid packet loss.

Volume range: 1-86 (min=1 per `volume_min!` response, max=80 per `volume_max!` response; `volume_n!` accepts n=1-86).

Display responses use length-prefixed format: `display=###,text` (3-digit) or `display1=##,text` (2-digit). Length does not include length byte or comma.

Special characters in display strings use multi-byte hex sequences (see Special Character Mapping section).

<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: RS-232 port number (COM1, etc.) not stated -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1576%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
  - "https://rotel.com/sites/default/files/product/rs232/RT1080%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:04.962Z
last_checked_at: 2026-05-31T20:58:11.537Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T20:58:11.537Z
matched_actions: 59
action_count: 59
confidence: high
summary: "All 59 spec actions matched to source control commands with correct semantic mapping; transport parameters verified; feedback queries represented in Feedbacks section."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
