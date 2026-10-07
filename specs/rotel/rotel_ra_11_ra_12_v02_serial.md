---
spec_id: admin/rotel-ra-11-ra-12-v02
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RA-11 / RA-12 V02 Control Spec"
manufacturer: Rotel
model_family: RA-11
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RA-11
    - "RA-12 V02"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RA12%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-05-21T20:43:11.258Z
last_checked_at: 2026-10-07T12:37:00.996Z
generated_at: 2026-10-07T12:37:00.996Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated"
  - "earlier models with mini USB rear panel do not support this protocol — version boundary unclear"
  - "no continuously settable variables beyond discrete actions above"
  - "exact event format for unsolicited updates not fully documented"
  - "no multi-step sequences described in source"
  - "no safety interlock procedures documented in source"
  - "exact firmware version range for V02 units not stated"
  - "response timing / inter-command delay not specified"
  - "max command queue depth not specified"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:37:00.996Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 74 action units (54 actions, 20 query feedbacks) match source commands with correct shapes; serial parameters match; source catalogue fully represented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Rotel RA-11 / RA-12 V02 Control Spec

## Summary
RS-232 ASCII control protocol for Rotel RA-11 and RA-12 V02 stereo integrated amplifiers. Commands terminated with "!". Supports power, volume, source selection, tone/balance controls, menu navigation, and front USB playback control. No flow control on RS-232 hardware.

<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: earlier models with mini USB rear panel do not support this protocol — version boundary unclear -->

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
  type: UNRESOLVED  # Source does not specify authentication
```

## Traits
```yaml
traits:
  - powerable    # power on/off/toggle commands
  - queryable    # feedback request commands return state
  - levelable    # volume, bass, treble, balance level control
  - routable     # source selection commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: power_on!
    response: power=on!
    params: []

  - id: power_off
    label: Power Off (Standby)
    kind: action
    command: power_off!
    response: power=standby!
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: power_toggle!
    response: power=on! / power=standby!
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    command: volume_up!
    response: volume=##!
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: volume_down!
    response: volume=##!
    params: []

  - id: volume_max
    label: Set Volume Max
    kind: action
    command: volume_max!
    response: volume=max!
    params: []

  - id: volume_min
    label: Set Volume Min
    kind: action
    command: volume_min!
    response: volume=min!
    params: []

  - id: volume_set
    label: Set Volume Level
    kind: action
    command: volume_{n}!
    response: volume=##!
    params:
      - name: n
        type: integer
        min: 1
        max: 96
        description: Volume level (1-96)

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: mute!
    response: mute=on! / mute=off!
    params: []

  - id: mute_on
    label: Mute On
    kind: action
    command: mute_on!
    response: mute=on!
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: mute_off!
    response: mute=off!
    params: []

  - id: source_rcd
    label: Source Rotel CD
    kind: action
    command: rcd!
    response: source=analog_cd! / source=coax1_cd! / source=coax2_cd!
    params: []

  - id: source_cd
    label: Source CD
    kind: action
    command: cd!
    response: source=cd! / source=analog_cd!
    params: []

  - id: source_coax1
    label: Source Coax 1
    kind: action
    command: coax1!
    response: source=coax1! / source=coax1_cd!
    params: []

  - id: source_coax2
    label: Source Coax 2
    kind: action
    command: coax2!
    response: source=coax2! / source=coax2_cd!
    params: []

  - id: source_opt1
    label: Source Optical 1
    kind: action
    command: opt1!
    response: source=opt1!
    params: []

  - id: source_opt2
    label: Source Optical 2
    kind: action
    command: opt2!
    response: source=opt2!
    params: []

  - id: source_aux1
    label: Source Aux 1
    kind: action
    command: aux1!
    response: source=aux1!
    params: []

  - id: source_aux2
    label: Source Aux 2
    kind: action
    command: aux2!
    response: source=aux2!
    params: []

  - id: source_tuner
    label: Source Tuner
    kind: action
    command: tuner!
    response: source=tuner!
    params: []

  - id: source_phono
    label: Source Phono
    kind: action
    command: phono!
    response: source=phono!
    params: []

  - id: source_usb
    label: Source Front USB
    kind: action
    command: usb!
    response: source=usb!
    params: []

  - id: play
    label: Play
    kind: action
    command: play!
    response: play_status=play!
    params: []

  - id: stop
    label: Stop
    kind: action
    command: stop!
    params: []

  - id: pause
    label: Pause
    kind: action
    command: pause!
    params: []

  - id: track_fwd
    label: Track Forward / Tune Up
    kind: action
    command: track_fwd!
    params: []

  - id: track_back
    label: Track Back / Tune Down
    kind: action
    command: track_back!
    params: []

  - id: fast_fwd
    label: Fast Forward
    kind: action
    command: fast_fwd!
    params: []

  - id: fast_back
    label: Fast Backward
    kind: action
    command: fast_back!
    params: []

  - id: random_toggle
    label: Random Play Mode Toggle
    kind: action
    command: random!
    params: []

  - id: repeat_toggle
    label: Repeat Play Mode Toggle
    kind: action
    command: repeat!
    params: []

  - id: menu
    label: Display Menu
    kind: action
    command: menu!
    params: []

  - id: exit
    label: Exit Key
    kind: action
    command: exit!
    params: []

  - id: cursor_up
    label: Cursor Up
    kind: action
    command: up!
    params: []

  - id: cursor_down
    label: Cursor Down
    kind: action
    command: down!
    params: []

  - id: cursor_left
    label: Cursor Left
    kind: action
    command: left!
    params: []

  - id: cursor_right
    label: Cursor Right
    kind: action
    command: right!
    params: []

  - id: enter
    label: Enter Key
    kind: action
    command: enter!
    params: []

  - id: num_key
    label: Numeric Key
    kind: action
    command: "{n}!"
    params:
      - name: n
        type: integer
        min: 0
        max: 9
        description: Numeric key 0-9

  - id: tone_on
    label: Tone Controls On
    kind: action
    command: tone_on!
    response: tone=on!
    params: []

  - id: tone_off
    label: Tone Controls Off
    kind: action
    command: tone_off!
    response: tone=off!
    params: []

  - id: bass_up
    label: Bass Up
    kind: action
    command: bass_up!
    response: bass=000/+##/-##!
    params: []

  - id: bass_down
    label: Bass Down
    kind: action
    command: bass_down!
    response: bass=000/+##/-##!
    params: []

  - id: bass_set
    label: Set Bass Level
    kind: action
    command: ["bass_-10!", "bass_000!", "bass_+10!"]
    response: bass=##!
    params: []

  - id: treble_up
    label: Treble Up
    kind: action
    command: treble_up!
    response: treble=000/+##/-##!
    params: []

  - id: treble_down
    label: Treble Down
    kind: action
    command: treble_down!
    response: treble=000/+##/-##!
    params: []

  - id: treble_set
    label: Set Treble Level
    kind: action
    command: ["treble_-10!", "treble_000!", "treble_+10!"]
    response: treble=##!
    params: []

  - id: balance_right
    label: Balance Right
    kind: action
    command: balance_right!
    response: balance=000/L##/R##!
    params: []

  - id: balance_left
    label: Balance Left
    kind: action
    command: balance_left!
    response: balance=000/L##/R##!
    params: []

  - id: balance_set
    label: Set Balance
    kind: action
    command: ["balance_L15!", "balance_000!", "balance_R15!"]
    response: balance=##!
    params: []

  - id: dimmer_toggle
    label: Toggle Display Dimmer
    kind: action
    command: dimmer!
    response: dimmer_#!
    params: []

  - id: dimmer_set
    label: Set Display Dimmer Level
    kind: action
    command: ["dimmer_0!", "dimmer_1!", "dimmer_2!", "dimmer_3!", "dimmer_4!", "dimmer_5!", "dimmer_6!"]
    params: []

  - id: display_update_auto
    label: Set Display Update Auto
    kind: action
    command: display_update_auto!
    response: display_update=auto!
    params: []

  - id: display_update_manual
    label: Set Display Update Manual
    kind: action
    command: display_update_manual!
    response: display_update=manual!
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: display_full
    label: Full Display
    query_command: get_display!
    command: get_display!
    response: display=###,text
    description: "Entire display data; 3-digit byte count, comma, text (no terminating !)"
    type: string

  - id: display_line1
    label: Display Line 1
    query_command: get_display1!
    command: get_display1!
    response: display1=##,text
    description: "Display line 1; 2-digit byte count, comma, text"
    type: string

  - id: display_line2
    label: Display Line 2
    query_command: get_display2!
    command: get_display2!
    response: display2=##,text
    description: "Display line 2; 2-digit byte count, comma, text"
    type: string

  - id: product_type
    label: Product Type
    query_command: get_product_type!
    command: get_product_type!
    response: product_type=##,text
    description: "Product model name (e.g. RA-12)"
    type: string

  - id: product_version
    label: Product Version
    query_command: get_product_version!
    command: get_product_version!
    response: product_version=##,text
    description: "Main CPU software version (e.g. V2.1.0)"
    type: string

  - id: tc_version
    label: Front USB Software Version
    query_command: get_tc_version!
    command: get_tc_version!
    response: tc_version=##,text
    description: "Front USB software version"
    type: string

  - id: display_size
    label: Display Size
    query_command: get_display_size!
    command: get_display_size!
    response: display_size=##,##!
    description: "Display columns and rows (e.g. 20,02)"
    type: string

  - id: display_update_status
    label: Display Update Mode
    query_command: get_display_update!
    command: get_display_update!
    response: display_update=auto! / display_update=manual!
    type: enum
    values: [auto, manual]

  - id: power_state
    label: Power State
    query_command: get_current_power!
    command: get_current_power!
    response: power=on! / power=standby!
    type: enum
    values: [on, standby]

  - id: current_source
    label: Current Source
    query_command: get_current_source!
    command: get_current_source!
    response: "source=analog_cd! / source=cd! / source=coax1! / source=coax1_cd! / source=coax2! / source=coax2_cd! / source=opt1! / source=opt2! / source=tuner! / source=phono! / source=usb! / source=aux1! / source=aux2!"
    type: enum
    values: [analog_cd, cd, coax1, coax1_cd, coax2, coax2_cd, opt1, opt2, tuner, phono, usb, aux1, aux2]

  - id: tone_state
    label: Tone Control State
    query_command: get_tone!
    command: get_tone!
    response: tone=on! / tone=off!
    type: enum
    values: [on, off]

  - id: bass_level
    label: Bass Level
    query_command: get_bass!
    command: get_bass!
    response: bass=###! (+01-10, -01-10, 000)
    type: string

  - id: treble_level
    label: Treble Level
    query_command: get_treble!
    command: get_treble!
    response: treble=###! (+01-10, -01-10, 000)
    type: string

  - id: balance_level
    label: Balance Level
    query_command: get_balance!
    command: get_balance!
    response: balance=###! (L01-15, R01-15, 000)
    type: string

  - id: current_freq
    label: Digital Input Frequency
    query_command: get_current_freq!
    command: get_current_freq!
    response: freq=off! / freq=32! / freq=44.1! / freq=48! / freq=88.2! / freq=96! / freq=176.4! / freq=192!
    type: enum
    values: [off, "32", "44.1", "48", "88.2", "96", "176.4", "192"]

  - id: play_status
    label: Play Status
    query_command: get_play_status!
    command: get_play_status!
    response: play_status=play! / play_status=stop! / play_status=pause!
    type: enum
    values: [play, stop, pause]

  - id: volume_max
    label: Max Volume
    query_command: get_volume_max!
    command: get_volume_max!
    response: volume_max=##!
    type: integer

  - id: volume_min
    label: Min Volume
    query_command: get_volume_min!
    command: get_volume_min!
    response: volume_min=##!
    type: integer

  - id: volume_level
    label: Current Volume
    query_command: get_volume!
    command: get_volume!
    response: volume=##!
    type: integer

  - id: tone_max
    label: Max Tone Value
    query_command: get_tone_max!
    command: get_tone_max!
    response: tone_max=10!
    type: integer
```

## Variables
```yaml
# UNRESOLVED: no continuously settable variables beyond discrete actions above
```

## Events
```yaml
# Automatic display updates sent when display_update=auto:
# - display line changes pushed on change
# - Basic status (volume, power, source) sent automatically regardless of mode
# Front USB metadata requires manual mode request
# UNRESOLVED: exact event format for unsolicited updates not fully documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: RS-232 hardware does not support flow control - care needed to avoid packet loss
# UNRESOLVED: no safety interlock procedures documented in source
```

## Notes
- All commands must terminate with `!`. No spaces, no CR/LF after command.
- Responses use `!` terminator OR byte-count prefix for variable-length data (byte count excludes length digits and comma).
- RS-232 hardware has **no flow control** — sender must manage pacing to prevent packet loss.
- Rotel Link RCD feature changes source response strings for the configured input (e.g. `source=coax1_cd!` vs `source=coax1!`).
- V02 units with rear panel RS-232 only. Earlier models with mini USB rear panel do not support this protocol.
- Volume range corrected in spec v1.01: 1–96 (not 1–86).
- Special display characters map to multi-byte hex sequences (see Section 3 of source).

<!-- UNRESOLVED: exact firmware version range for V02 units not stated -->
<!-- UNRESOLVED: response timing / inter-command delay not specified -->
<!-- UNRESOLVED: max command queue depth not specified -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RA12%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-05-21T20:43:11.258Z
last_checked_at: 2026-10-07T12:37:00.996Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:37:00.996Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 74 action units (54 actions, 20 query feedbacks) match source commands with correct shapes; serial parameters match; source catalogue fully represented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated"
- "earlier models with mini USB rear panel do not support this protocol — version boundary unclear"
- "no continuously settable variables beyond discrete actions above"
- "exact event format for unsolicited updates not fully documented"
- "no multi-step sequences described in source"
- "no safety interlock procedures documented in source"
- "exact firmware version range for V02 units not stated"
- "response timing / inter-command delay not specified"
- "max command queue depth not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
