---
spec_id: admin/rotel-rc-1570
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RC-1570 Stereo Preamplifier Control Spec"
manufacturer: Rotel
model_family: RC-1570
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RC-1570
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1570%20Protocol.pdf"
retrieved_at: 2026-05-22T17:37:31.875Z
last_checked_at: 2026-06-10T00:08:46.536Z
generated_at: 2026-06-10T00:08:46.536Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source"
  - "no explicit safety warnings, interlock procedures, or"
  - "unsolicited event names/formats not explicitly documented"
  - "Rotel Link RCD behavior adds suffix to response strings but no complete enumeration of all affected inputs"
  - "display dimmer level granularity beyond 0-6 not specified"
  - "fast_fwd/fast_back/stop/pause behavior for non-USB sources not documented"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:08:46.536Z
  matched_actions: 95
  action_count: 95
  confidence: medium
  summary: "All 95 spec actions (73 control commands + 22 queries) matched exactly to source tokens at identical granularity; bass/treble/balance enumerated variants correctly collapsed to parameterized spec actions; transport all verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Rotel RC-1570 Stereo Preamplifier Control Spec

## Summary
Rotel RC-1570 stereo preamplifier controlled via RS-232 ASCII protocol at 115200 baud, 8N1. Commands terminate with `!`. No flow control. Supports power, volume, source selection, tone/balance adjustment, and display queries. No authentication procedure described.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->

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
- levelable
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
  label: Set Volume to Level N
  kind: action
  params:
    - name: n
      type: integer
      description: Volume level 1-96
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
- id: source_coax1
  label: Source Coax 1
  kind: action
  params: []
- id: source_coax2
  label: Source Coax 2
  kind: action
  params: []
- id: source_opt1
  label: Source Optical 1
  kind: action
  params: []
- id: source_opt2
  label: Source Optical 2
  kind: action
  params: []
- id: source_aux1
  label: Source Aux 1
  kind: action
  params: []
- id: source_aux2
  label: Source Aux 2
  kind: action
  params: []
- id: source_tuner
  label: Source Tuner
  kind: action
  params: []
- id: source_phono
  label: Source Phono
  kind: action
  params: []
- id: source_usb
  label: Source Front USB
  kind: action
  params: []
- id: source_pc_usb
  label: Source PC-USB
  kind: action
  params: []
- id: source_bal_xlr
  label: Source XLR
  kind: action
  params: []
- id: source_rcd
  label: Source Rotel CD
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
- id: num_0
  label: Number Key 0
  kind: action
  params: []
- id: num_1
  label: Number Key 1
  kind: action
  params: []
- id: num_2
  label: Number Key 2
  kind: action
  params: []
- id: num_3
  label: Number Key 3
  kind: action
  params: []
- id: num_4
  label: Number Key 4
  kind: action
  params: []
- id: num_5
  label: Number Key 5
  kind: action
  params: []
- id: num_6
  label: Number Key 6
  kind: action
  params: []
- id: num_7
  label: Number Key 7
  kind: action
  params: []
- id: num_8
  label: Number Key 8
  kind: action
  params: []
- id: num_9
  label: Number Key 9
  kind: action
  params: []
- id: tone_on
  label: Tone Controls On
  kind: action
  params: []
- id: tone_off
  label: Tone Controls Off
  kind: action
  params: []
- id: bass_up
  label: Bass Up
  kind: action
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  params: []
- id: bass_set
  label: Set Bass Level
  kind: action
  params:
    - name: level
      type: integer
      description: Bass level -10 to +10, or 000 for flat
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []
- id: treble_set
  label: Set Treble Level
  kind: action
  params:
    - name: level
      type: integer
      description: Treble level -10 to +10, or 000 for flat
- id: balance_right
  label: Balance Right
  kind: action
  params: []
- id: balance_left
  label: Balance Left
  kind: action
  params: []
- id: balance_set
  label: Set Balance
  kind: action
  params:
    - name: position
      type: string
      description: L01-L15 (left), 000 (center), R01-R15 (right)
- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  params: []
- id: dimmer_0
  label: Set Display to Brightest
  kind: action
  params: []
- id: dimmer_1
  label: Set Display Dimmer Level 1
  kind: action
  params: []
- id: dimmer_2
  label: Set Display Dimmer Level 2
  kind: action
  params: []
- id: dimmer_3
  label: Set Display Dimmer Level 3
  kind: action
  params: []
- id: dimmer_4
  label: Set Display Dimmer Level 4
  kind: action
  params: []
- id: dimmer_5
  label: Set Display Dimmer Level 5
  kind: action
  params: []
- id: dimmer_6
  label: Set Display to Dimmest
  kind: action
  params: []
- id: pcusb_class_1
  label: Set PC-USB Audio Class 1.0
  kind: action
  params: []
- id: pcusb_class_2
  label: Set PC-USB Audio Class 2.0
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
- id: get_current_power
  label: Request Current Power Status
  kind: query
  params: []
- id: get_current_source
  label: Request Current Source
  kind: query
  params: []
- id: get_volume
  label: Request Current Volume
  kind: query
  params: []
- id: get_volume_max
  label: Request Volume Maximum
  kind: query
  params: []
- id: get_volume_min
  label: Request Volume Minimum
  kind: query
  params: []
- id: get_mute_status
  label: Request Mute Status
  kind: query
  params: []
- id: get_tone
  label: Request Tone Control State
  kind: query
  params: []
- id: get_bass
  label: Request Bass Level
  kind: query
  params: []
- id: get_treble
  label: Request Treble Level
  kind: query
  params: []
- id: get_tone_max
  label: Request Tone Maximum
  kind: query
  params: []
- id: get_balance
  label: Request Balance Setting
  kind: query
  params: []
- id: get_play_status
  label: Request Play Status
  kind: query
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
- id: get_display_size
  label: Request Display Size
  kind: query
  params: []
- id: get_display_update
  label: Request Display Update Mode
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
- id: get_tc_version
  label: Request Front USB Software Version
  kind: query
  params: []
- id: get_pcusb_class
  label: Request PC-USB Class
  kind: query
  params: []
- id: get_current_freq
  label: Request Current Frequency
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
- id: current_power
  type: enum
  values: [on, standby]
- id: volume_level
  type: integer
  range: [0, 96]
- id: mute_state
  type: enum
  values: [on, off]
- id: current_source
  type: enum
  values: [cd, analog_cd, coax1, coax1_cd, coax2, coax2_cd, opt1, opt2, tuner, phono, usb, pc_usb, aux1, aux2, bal_xlr, bal_xlr_cd]
- id: play_status
  type: enum
  values: [play, stop, pause]
- id: tone_state
  type: enum
  values: [on, off]
- id: bass_level
  type: string
  description: Format: +01 to +10, -01 to -10, or 000
- id: treble_level
  type: string
  description: Format: +01 to +10, -01 to -10, or 000
- id: balance_setting
  type: string
  description: Format: L01-L15, R01-R15, or 000
- id: display_text
  type: string
  description: Variable-length display text with byte-count prefix
- id: display_line1
  type: string
  description: Display line 1 with 2-digit byte-count prefix
- id: display_line2
  type: string
  description: Display line 2 with 2-digit byte-count prefix
- id: display_size
  type: string
  description: Format: ##,## (columns, rows)
- id: display_update_mode
  type: enum
  values: [auto, manual]
- id: product_type
  type: string
  description: Rotel product type name
- id: product_version
  type: string
  description: Main CPU software version string
- id: tc_version
  type: string
  description: Front USB software version string
- id: tone_max
  type: integer
  description: Maximum tone control level (10)
- id: volume_max
  type: integer
  description: Maximum volume level
- id: volume_min
  type: integer
  description: Minimum volume level (0)
- id: pcusb_class
  type: enum
  values: [1, 2]
- id: current_freq
  type: enum
  values: [off, 32, 44.1, 48, 88.2, 96, 176.4, 192]
```

## Variables
```yaml
# No standalone settable parameters outside of discrete actions.
# All adjustable parameters (volume, bass, treble, balance) exposed via Actions.
```

## Events
```yaml
# No unsolicited event descriptions in source. Device sends responses only
# in reply to commands or queries. Display auto-update feature sends display
# changes when enabled (display_update_auto command) but no explicit event
# names or formats given.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Hardware does not support flow control. Sending/receiving data too quickly
    may cause packet loss. Control application must pace traffic appropriately.
# UNRESOLVED: no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements in source beyond flow control note.
```

## Notes
Commands terminate with `!`. Do not send spaces or carriage return/line feed after command. Responses terminate with `!` or byte-count for variable-length text. Rotel Link RCD input setting affects response strings for that input. Volume scale 1-96. Tone range -10 to +10 with 000 as center. Balance range L15 to R15 with 000 as center. Special characters may be encoded as 2-3 hex byte sequences in display feedback strings.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: unsolicited event names/formats not explicitly documented -->
<!-- UNRESOLVED: Rotel Link RCD behavior adds suffix to response strings but no complete enumeration of all affected inputs -->
<!-- UNRESOLVED: display dimmer level granularity beyond 0-6 not specified -->
<!-- UNRESOLVED: fast_fwd/fast_back/stop/pause behavior for non-USB sources not documented -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1570%20Protocol.pdf"
retrieved_at: 2026-05-22T17:37:31.875Z
last_checked_at: 2026-06-10T00:08:46.536Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:08:46.536Z
matched_actions: 95
action_count: 95
confidence: medium
summary: "All 95 spec actions (73 control commands + 22 queries) matched exactly to source tokens at identical granularity; bass/treble/balance enumerated variants correctly collapsed to parameterized spec actions; transport all verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source"
- "no explicit safety warnings, interlock procedures, or"
- "unsolicited event names/formats not explicitly documented"
- "Rotel Link RCD behavior adds suffix to response strings but no complete enumeration of all affected inputs"
- "display dimmer level granularity beyond 0-6 not specified"
- "fast_fwd/fast_back/stop/pause behavior for non-USB sources not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
