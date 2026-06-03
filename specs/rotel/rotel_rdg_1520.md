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
    - RT-09
  firmware: "\"V1.1.5\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RDG1520%20Protocol_0.pdf"
retrieved_at: 2026-06-02T05:28:09.211Z
last_checked_at: 2026-06-02T17:23:56.604Z
generated_at: 2026-06-02T17:23:56.604Z
firmware_coverage: "\"V1.1.5\""
protocol_coverage: []
known_gaps:
  - "source does not document volume-level commands even though section header reads \"POWER & VOLUME COMMANDS\"; only power commands listed"
  - "source does not document any volume, gain, brightness, or level-setting variables."
  - "source does not document multi-step sequences"
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:56.604Z
  matched_actions: 64
  action_count: 64
  confidence: medium
  summary: "All 64 spec actions matched literally in source; transport parameters (115200 baud, 8 data bits, no parity, 1 stop bit, no flow control) verified; complete bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Rotel RDG-1520 Control Spec

## Summary
Covers RS-232 ASCII control protocol for Rotel RDG-1520 (and RT-09) network radio / tuner. Protocol is plain ASCII, 115200 baud, terminated with "!" (no CR/LF, no checksum, no device ID). Source documents power, source selection, transport, menu, numeric, preset, display, and feedback request commands.

<!-- UNRESOLVED: source does not document volume-level commands even though section header reads "POWER & VOLUME COMMANDS"; only power commands listed -->

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
- powerable       # inferred: power_on / power_off / power_toggle commands present
- routable        # inferred: source selection commands present
- queryable       # inferred: get_* feedback request commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "power_on!"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "power_off!"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "power_toggle!"
  params: []

- id: select_iradio
  label: Source iRadio
  kind: action
  command: "iradio!"
  params: []

- id: select_network
  label: Source Network
  kind: action
  command: "network!"
  params: []

- id: select_aux1_coax
  label: Source Aux 1 Coax
  kind: action
  command: "aux1_coax!"
  params: []

- id: select_aux1_opt
  label: Source Aux 1 Optical
  kind: action
  command: "aux1_opt!"
  params: []

- id: select_fm
  label: Source FM
  kind: action
  command: "fm!"
  params: []

- id: select_dab
  label: Source DAB
  kind: action
  command: "dab!"
  params: []

- id: select_usb
  label: Source USB
  kind: action
  command: "usb!"
  params: []

- id: select_aux1_toggle
  label: Source Aux 1 Coax/Opt Toggle
  kind: action
  command: "aux1!"
  params: []

- id: play
  label: Play Source
  kind: action
  command: "play!"
  params: []

- id: stop
  label: Stop Source
  kind: action
  command: "stop!"
  params: []

- id: pause
  label: Pause Source
  kind: action
  command: "pause!"
  params: []

- id: track_forward
  label: Track Forward / Tune Up
  kind: action
  command: "track_fwd!"
  params: []

- id: track_back
  label: Track Backward / Tune Down
  kind: action
  command: "track_back!"
  params: []

- id: fast_forward
  label: Fast Forward / Search Forward
  kind: action
  command: "fast_fwd!"
  params: []

- id: fast_back
  label: Fast Backward / Search Backward
  kind: action
  command: "fast_back!"
  params: []

- id: random_toggle
  label: Random PlayMode Toggle
  kind: action
  command: "random!"
  params: []

- id: repeat_toggle
  label: Repeat PlayMode Toggle
  kind: action
  command: "repeat!"
  params: []

- id: menu
  label: Display the Menu
  kind: action
  command: "menu!"
  params: []

- id: exit
  label: Exit Key
  kind: action
  command: "exit!"
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  command: "up!"
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  command: "down!"
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  command: "left!"
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  command: "right!"
  params: []

- id: enter
  label: Enter Key
  kind: action
  command: "enter!"
  params: []

- id: enter_long
  label: Long Press for Enter Key
  kind: action
  command: "enter_long!"
  params: []

- id: num_1
  label: Number Key 1
  kind: action
  command: "1!"
  params: []

- id: num_2
  label: Number Key 2
  kind: action
  command: "2!"
  params: []

- id: num_3
  label: Number Key 3
  kind: action
  command: "3!"
  params: []

- id: num_4
  label: Number Key 4
  kind: action
  command: "4!"
  params: []

- id: num_5
  label: Number Key 5
  kind: action
  command: "5!"
  params: []

- id: num_6
  label: Number Key 6
  kind: action
  command: "6!"
  params: []

- id: num_7
  label: Number Key 7
  kind: action
  command: "7!"
  params: []

- id: num_8
  label: Number Key 8
  kind: action
  command: "8!"
  params: []

- id: num_9
  label: Number Key 9
  kind: action
  command: "9!"
  params: []

- id: num_0
  label: Number Key 0
  kind: action
  command: "0!"
  params: []

- id: num_10_plus
  label: Number Key 10+
  kind: action
  command: "10_plus!"
  params: []

- id: memory
  label: Select Memory for Saving Presets
  kind: action
  command: "memory!"
  params: []

- id: call_iradio_preset_n
  label: Recall iRadio Preset n
  kind: action
  command: "call_iradio_preset_n"
  params:
    - name: n
      type: integer
      description: Preset number (01-30)

- id: call_fm_preset_n
  label: Recall FM Preset n
  kind: action
  command: "call_fm_preset_n"
  params:
    - name: n
      type: integer
      description: Preset number (01-30)

- id: call_dab_preset_n
  label: Recall DAB Preset n
  kind: action
  command: "call_dab_preset_n"
  params:
    - name: n
      type: integer
      description: Preset number (01-30)

- id: display_update_auto
  label: Set Display Update to Auto
  kind: action
  command: "display_update_auto!"
  params: []

- id: display_update_manual
  label: Set Display Update to Manual
  kind: action
  command: "display_update_manual!"
  params: []

- id: get_display
  label: Request Entire Display
  kind: query
  command: "get_display!"
  params: []

- id: get_display1
  label: Request Display Line #1
  kind: query
  command: "get_display1!"
  params: []

- id: get_display2
  label: Request Display Line #2
  kind: query
  command: "get_display2!"
  params: []

- id: get_display3
  label: Request Display Line #3
  kind: query
  command: "get_display3!"
  params: []

- id: get_display4
  label: Request Display Line #4
  kind: query
  command: "get_display4!"
  params: []

- id: get_product_type
  label: Request Product Type
  kind: query
  command: "get_product_type!"
  params: []

- id: get_product_version
  label: Request Main CPU Software Version
  kind: query
  command: "get_product_version!"
  params: []

- id: get_display_size
  label: Request Display Size
  kind: query
  command: "get_display_size!"
  params: []

- id: get_display_update
  label: Request Display Update Mode
  kind: query
  command: "get_display_update!"
  params: []

- id: get_current_power
  label: Request Current Power Status
  kind: query
  command: "get_current_power!"
  params: []

- id: get_current_source
  label: Request Current Source
  kind: query
  command: "get_current_source!"
  params: []

- id: get_current_preset
  label: Request Current Preset
  kind: query
  command: "get_current_preset!"
  params: []

- id: get_iradio_preset_n
  label: Request Saved iRadio Preset n
  kind: query
  command: "get_iradio_preset_n!"
  params:
    - name: n
      type: integer
      description: Preset number (1-30)

- id: get_allpreset_iradio
  label: Request All Saved iRadio Presets
  kind: query
  command: "get_allpreset_iradio!"
  params: []

- id: get_fm_preset_n
  label: Request Saved FM Preset n
  kind: query
  command: "get_fm_preset_n!"
  params:
    - name: n
      type: integer
      description: Preset number (1-30)

- id: get_allpreset_fm
  label: Request All Saved FM Presets
  kind: query
  command: "get_allpreset_fm!"
  params: []

- id: get_dab_preset_n
  label: Request Saved DAB Preset n
  kind: query
  command: "get_dab_preset_n!"
  params:
    - name: n
      type: integer
      description: Preset number (1-30)

- id: get_allpreset_dab
  label: Request All Saved DAB Presets
  kind: query
  command: "get_allpreset_dab!"
  params: []

- id: get_play_status
  label: Request Play Status
  kind: query
  command: "get_play_status!"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  # source: "power=on!" / "power=standby!" / "power=on/standby!" (toggle)

- id: current_source
  type: enum
  values: [cd, iradio, network, aux1, aux2, usb, fm, dab]
  # source: get_current_source return list (note: cd and aux2 listed in feedback return but no source_select action for them in RDG-1520 list)

- id: play_status
  type: enum
  values: [play, stop, pause]
  # source: get_play_status return

- id: display_update_mode
  type: enum
  values: [auto, manual]
  # source: get_display_update return

- id: display_full
  type: string
  # source: get_display! return: "display=###,text" (3-digit length, comma, text, no terminator)
- id: display_line_1
  type: string
  # source: get_display1! return: "display1=##,text" (2-digit length, comma, text, no terminator)
- id: display_line_2
  type: string
  # source: get_display2! return: "display2=##,text"
- id: display_line_3
  type: string
  # source: get_display3! return: "display3=##,text"
- id: display_line_4
  type: string
  # source: get_display4! return: "display4=##,text"

- id: product_type
  type: string
  # source: get_product_type! return: "product_type=##,text"
- id: product_version
  type: string
  # source: get_product_version! return: "product_version=##,text" e.g. "product_version=13,v1.1.2-110316"
- id: display_size
  type: string
  # source: get_display_size! return: "display_size=##,##!" e.g. "display_size=20,04!"

- id: current_preset
  type: string
  # source: get_current_preset! return: "preset_iradio=##!" / "preset_fm=##!" / "preset_dab=##!" e.g. "preset_iradio=13!"

- id: iradio_preset
  type: string
  # source: get_iradio_preset_n! / get_allpreset_iradio! return: "iradio_preset_n=##,text"
- id: fm_preset
  type: string
  # source: get_fm_preset_n! / get_allpreset_fm! return: "fm_preset_n=##,text"
- id: dab_preset
  type: string
  # source: get_dab_preset_n! / get_allpreset_dab! return: "dab_preset_n=##,text"

- id: track_info
  type: string
  # source: track_fwd!/track_back! return: "track=##, T##"
- id: time_info
  type: string
  # source: fast_fwd!/fast_back! return: "time=##:##:##!"
```

## Variables
```yaml
# No explicit settable numeric/level parameters documented in source.
# UNRESOLVED: source does not document any volume, gain, brightness, or level-setting variables.
```

## Events
```yaml
# In auto mode, the device sends display updates on every change.
# Format mirrors the get_display1!..get_display4! returns: display1=##,text / display2..4
# toggle mode: display_update=auto! to enable, display_update=manual! to disable
display_update:
  description: Unsolicited display line updates (1-4) emitted in auto mode when the on-device display changes.
  payload_format: "display{N}=##,text"   # no terminating "!" per source; byte count is 2-digit length then "," then text
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements
```

## Notes
- Protocol is plain ASCII terminated with "!" — no CR/LF, no checksum, no device ID.
- RS-232 hardware does not support flow control; sender must pace writes to avoid packet loss.
- Variable-length text fields use a leading length prefix (e.g. `display=###,text` is 3-digit byte count, `display1=##,text` is 2-digit byte count, `iradio_preset_n=##,text` is 2-digit). Length covers the text only, not the prefix or comma.
- `aux1!` toggles between coax and optical; device returns whichever is now active.
- `random!` and `repeat!` are toggles with no unit response.
- Special character mapping (Section 3): certain display glyphs are encoded as 2-3 byte EE 82 xx sequences in feedback strings; "END" marker = `EE 80 80 EE 80 81 EE 80 82`.
- Effective from main software V1.1.5; `aux1_coax!`, `aux1_opt!`, and `get_current_power!` were added in V1.1.7.

<!-- UNRESOLVED: -->
<!-- - Volume commands implied by section header "POWER & VOLUME COMMANDS" but not enumerated -->
<!-- - No documentation of any DAB-specific commands beyond source select and preset recall -->
<!-- - No networking, IP, or REST interface documented; serial RS-232 only -->
<!-- - No explicit error/fault feedback format documented -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RDG1520%20Protocol_0.pdf"
retrieved_at: 2026-06-02T05:28:09.211Z
last_checked_at: 2026-06-02T17:23:56.604Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:56.604Z
matched_actions: 64
action_count: 64
confidence: medium
summary: "All 64 spec actions matched literally in source; transport parameters (115200 baud, 8 data bits, no parity, 1 stop bit, no flow control) verified; complete bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not document volume-level commands even though section header reads \"POWER & VOLUME COMMANDS\"; only power commands listed"
- "source does not document any volume, gain, brightness, or level-setting variables."
- "source does not document multi-step sequences"
- "source contains no safety warnings, interlocks, or power-on sequencing requirements"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
