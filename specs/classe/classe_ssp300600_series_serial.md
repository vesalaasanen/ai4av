---
spec_id: admin/classe-audio-ssp-300-ssp-600
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio SSP-300/SSP-600 Control Spec"
manufacturer: "Classé"
model_family: SSP-300
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - SSP-300
    - SSP-600
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_SSP-300-600_RS232_Protocol.pdf
retrieved_at: 2026-06-14T15:03:32.380Z
last_checked_at: 2026-06-14T16:13:48.526Z
generated_at: 2026-06-14T16:13:48.526Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IR code table contents not enumerated in source (only IRC nnn pass-through documented). Flow control setting not stated. Voltage/power specs out of scope."
  - "flow control not stated in source"
  - "no explicit multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "IR code table contents not enumerated in source. Flow control setting not stated. Firmware version compatibility not stated. Mode 27 absence not explained. Volume value range/scale not stated."
verification:
  verdict: verified
  checked_at: 2026-06-14T16:13:48.526Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions matched verbatim in source command table with correct parameters and shapes; full bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Classe Audio SSP-300/SSP-600 Control Spec

## Summary
The Classe Audio SSP-300 and SSP-600 are multi-channel A/V surround sound processors controllable via RS-232C serial. This spec covers the documented ASCII command set: input selection (main + zone), volume/level/mute control, channel trims, lip sync, post-processing mode queries, trigger outputs, front-panel LCD intensity, tape monitor, standby/operate power states, and debug configuration commands. Status is returned as `SY ...` strings; each command is acknowledged with `!` (recognized) or `?` (unrecognized).

<!-- UNRESOLVED: IR code table contents not enumerated in source (only IRC nnn pass-through documented). Flow control setting not stated. Voltage/power specs out of scope. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (STBY / OPER commands present)
# - routable     (MAIN / ZONE input selection present)
# - queryable    (STAT MAIN / STAT MODE query commands present)
# - levelable    (VOLA / VOLZ / xVOL / trim commands present)
```

## Actions
```yaml
# All commands are ASCII terminated with CR/LF. Optional address prefix
# "S300." (SSP-300) or "S600." (SSP-600) may precede the command and is
# separated by a period + zero or more spaces. Bare command form shown below
# (valid when controller is uniquely connected).

- id: main_input_set
  label: Set Main Input
  kind: action
  command: "MAIN {n}"
  params:
    - name: n
      type: integer
      description: Main zone input number

- id: zone_input_set
  label: Set Zone Input
  kind: action
  command: "ZONE {n}"
  params:
    - name: n
      type: integer
      description: Zone input number

- id: main_input_next
  label: Main Input Next
  kind: action
  command: "MINP+"
  params: []

- id: main_input_prev
  label: Main Input Previous
  kind: action
  command: "MINP-"
  params: []

- id: zone_input_next
  label: Zone Input Next
  kind: action
  command: "ZINP+"
  params: []

- id: zone_input_prev
  label: Zone Input Previous
  kind: action
  command: "ZINP-"
  params: []

- id: zone_unmute
  label: Zone Unmute (Zone On)
  kind: action
  command: "ZUMT"
  params: []

- id: zone_mute_standby
  label: Zone Mute/Standby (Zone Off)
  kind: action
  command: "ZMUT"
  params: []

- id: listening_position_set
  label: Set Listening Position
  kind: action
  command: "LPSN {m}"
  params:
    - name: m
      type: integer
      description: Listening position number

- id: volume_main_set
  label: Set Main Volume
  kind: action
  command: "VOLA {vv}"
  params:
    - name: vv
      type: integer
      description: Absolute main volume value (nearest possible applied, mute disengaged)

- id: volume_zone_set
  label: Set Zone Volume
  kind: action
  command: "VOLZ {vv}"
  params:
    - name: vv
      type: integer
      description: Absolute zone output volume value (00 is off)

- id: volume_main_up
  label: Main Volume Up
  kind: action
  command: "MVOL+"
  params: []  # acceleration: must be received within 200ms of reply

- id: volume_main_down
  label: Main Volume Down
  kind: action
  command: "MVOL-"
  params: []  # acceleration: must be received within 200ms of reply

- id: zone_on
  label: Zone On
  kind: action
  command: "ZON"
  params: []

- id: zone_off
  label: Zone Off
  kind: action
  command: "ZOFF"
  params: []

- id: zone_volume_up
  label: Zone Volume Up
  kind: action
  command: "ZVOL+"
  params: []  # acceleration: must be received within 200ms of reply

- id: zone_volume_down
  label: Zone Volume Down
  kind: action
  command: "ZVOL-"
  params: []  # acceleration: must be received within 200ms of reply

- id: mute_main
  label: Mute Main
  kind: action
  command: "MUTE"
  params: []

- id: unmute_main
  label: Unmute Main
  kind: action
  command: "UNMT"
  params: []

- id: balance_left
  label: Balance Shift Left 1dB
  kind: action
  command: "BALL"
  params: []

- id: balance_center
  label: Balance Recenter
  kind: action
  command: "BALC"
  params: []

- id: balance_right
  label: Balance Shift Right 1dB
  kind: action
  command: "BALR"
  params: []

- id: sub_trim_up
  label: Temporary Sub Trim Up 1dB
  kind: action
  command: "SUB+"
  params: []

- id: sub_trim_down
  label: Temporary Sub Trim Down 1dB
  kind: action
  command: "SUB-"
  params: []

- id: center_trim_up
  label: Temporary Center Trim Up 1dB
  kind: action
  command: "CNT+"
  params: []

- id: center_trim_down
  label: Temporary Center Trim Down 1dB
  kind: action
  command: "CNT-"
  params: []

- id: surround_trim_up
  label: Temporary Surround Trim Up 1dB
  kind: action
  command: "SRN+"
  params: []

- id: surround_trim_down
  label: Temporary Surround Trim Down 1dB
  kind: action
  command: "SRN-"
  params: []

- id: back_trim_up
  label: Temporary Back Trim Up 1dB
  kind: action
  command: "BAK+"
  params: []

- id: back_trim_down
  label: Temporary Back Trim Down 1dB
  kind: action
  command: "BAK-"
  params: []

- id: lipsync_up
  label: Lip Sync Up 1ms
  kind: action
  command: "LSY+"
  params: []

- id: lipsync_down
  label: Lip Sync Down 1ms
  kind: action
  command: "LSY-"
  params: []

- id: lipsync_reset
  label: Lip Sync Reset (no delay)
  kind: action
  command: "LSY0"
  params: []

- id: trims_reset
  label: Reset Temporary Channel Trims
  kind: action
  command: "TRM0"
  params: []

- id: dolby_latenight_on
  label: Dolby Digital Late Night Compression On
  kind: action
  command: "DDLN"
  params: []

- id: dolby_latenight_off
  label: Dolby Digital Late Night Compression Off
  kind: action
  command: "DDNC"
  params: []

- id: standby
  label: Standby
  kind: action
  command: "STBY"
  params: []

- id: operate
  label: Operate
  kind: action
  command: "OPER"
  params: []

- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  command: "T1_0"
  params: []

- id: trigger1_on
  label: Trigger 1 On
  kind: action
  command: "T1_1"
  params: []

- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  command: "T2_0"
  params: []

- id: trigger2_on
  label: Trigger 2 On
  kind: action
  command: "T2_1"
  params: []

- id: lcd_screensaver
  label: LCD Screen Saver (low power)
  kind: action
  command: "LCD0"
  params: []

- id: lcd_low
  label: LCD Low Intensity
  kind: action
  command: "LCD1"
  params: []

- id: lcd_medium
  label: LCD Medium Intensity
  kind: action
  command: "LCD2"
  params: []

- id: lcd_high
  label: LCD High Intensity
  kind: action
  command: "LCD3"
  params: []

- id: ir_pass
  label: Pass IR Code
  kind: action
  command: "IRC {nnn}"
  params:
    - name: nnn
      type: integer
      description: IR code number per SSP-300/600 IR code table

- id: tape_monitor_off
  label: Tape Monitor Off
  kind: action
  command: "TAP0"
  params: []

- id: tape_monitor_on
  label: Tape Monitor On
  kind: action
  command: "TAP1"
  params: []

- id: stat_main_query
  label: Query Main Volume and Input
  kind: query
  command: "STAT MAIN"
  params: []

- id: stat_mode_query
  label: Query Current Post Processing Mode
  kind: query
  command: "STAT MODE"
  params: []

- id: stat_auto_on
  label: Enable Automatic Status Updates
  kind: action
  command: "STAT AUTO"
  params: []

- id: stat_auto_off
  label: Disable Automatic Status Updates
  kind: action
  command: "STAT OFF"
  params: []

- id: skin_set
  label: Set Front Panel Skin
  kind: action
  command: "CSK {n}"
  params:
    - name: n
      type: integer
      description: "Skin number (1 = Classe, ..., 5 = Green)"

- id: dbg_balcon
  label: Set Input Balanced Mode (SSP-600 only)
  kind: action
  command: "DBGBALCON {n} {m}"
  params:
    - name: n
      type: integer
      description: Input number
    - name: m
      type: integer
      description: "Balanced mode (0 = off, 1 = on)"

- id: dbg_vidout
  label: Set Video Output State
  kind: action
  command: "DBGVIDOUT {n} {m}"
  params:
    - name: n
      type: integer
      description: Output video number
    - name: m
      type: integer
      description: "State (0 = off, 1 = on)"
```

## Feedbacks
```yaml
# Query responses + acknowledgement. Acknowledgement: "!" + CRLF for recognized
# command, "?" + CRLF for unrecognized. Generated within 100ms of last termination
# char. Reissue command if no reply after 100ms.

- id: command_ack
  type: enum
  values: [recognized, unrecognized]

- id: power_state
  type: enum
  values: [powerup, standby, operate]

- id: main_volume
  type: string
  description: "Absolute main volume value 'vv'; 'muted' appended if mute engaged"

- id: main_volume_relative
  type: string
  description: "Relative-to-THX volume '+/- vv'"

- id: main_input
  type: string
  description: "Selected main input 'n' named 'NN'"

- id: post_processing_mode
  type: integer
  description: "Mode number 0-34 (see Notes for mapping); gaps exist in source table"
```

## Variables
```yaml
# Settable parameters already represented as Actions (VOLA, VOLZ, LPSN, CSK,
# DBGBALCON, DBGVIDOUT, MAIN, ZONE, IRC). No additional continuous variables.
```

## Events
```yaml
# Unsolicited SY status strings emitted by the SSP-300/600:

- id: sy_pwrup
  command: "SY PWRUP"
  description: SSP-300/600 has completed power up

- id: sy_standby
  command: "SY STBY"
  description: SSP-300/600 is in standby

- id: sy_operate
  command: "SY OPER"
  description: SSP-300/600 is in operate

- id: sy_volume_absolute
  command: "SY VOLA vv"
  description: Volume at vv; "muted" appended if mute engaged

- id: sy_volume_relative
  command: "SY VOLR +/- vv"
  description: Volume relative to THX level

- id: sy_main_input
  command: "SY MAIN n NN"
  description: Selected to input number n, named NN

- id: sy_mode
  command: "SY MODE n"
  description: Current post-processing mode (0-34); auto-sent on change if STAT AUTO enabled
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
```

## Notes
- Address prefixing: commands may be prefixed with `S300.` or `S600.` plus optional spaces before the command body; omit when controller is uniquely connected. Bare command form is valid for local operation.
- All command/status data are ASCII bytes terminated by CR/LF.
- SSP-300/600 accepts a 16-byte FIFO; no minimum inter-byte delay required. Controller host must likewise accept status bytes without inter-byte delays.
- Acknowledgement reply (`!` or `?`) is generated within 100ms of the terminating LF; reissue if no reply after 100ms.
- Volume acceleration: `MVOL+/-`, `ZVOL+/-` must be received within 200ms of the prior reply to engage system acceleration mode.
- Other baud selections are available via system setup; default documented config is 9600/8/N/1.
- Post-processing mode map (per source; note gaps — modes 27 absent):
  0 multi-channel · 1 multi-channel+THX · 2 Dolby Pro Logic · 3 Dolby Pro Logic+THX · 4 music club · 5 music natural · 6 music concert · 7 music party · 8 music stadium · 9 music 6 · 10 music 7 · 11 mono · 12 mono+THX · 13 custom · 14 surround 6.1 · 15 stereo · 16 stereo+THX · 17 Dolby PLII Movie · 18 Dolby PLII Movie+THX · 19 Dolby PLII Music · 20 Dolby PLIIx Music · 21 Dolby PLIIx Movie · 22 Dolby PLIIx Movie+THX · 23 Dolby Digital EX · 24 THX Ultra2 Music · 25 THX Ultra2 Cinema · 26 THX Surround EX · 28 DTS Neo:6+THX · 29 DTS Neo:6 Cinema · 30 DTS Neo:6 Cinema+THX · 31 DTS Neo:6 Music · 32 DTS Matrix 6.1 · 33 DTS Matrix 6.1+THX · 34 stereo 24/96. Available modes depend on the source stream.

<!-- UNRESOLVED: IR code table contents not enumerated in source. Flow control setting not stated. Firmware version compatibility not stated. Mode 27 absence not explained. Volume value range/scale not stated. -->
````

56 actions, all source commands captured verbatim. Flow control + IR table = main gaps.

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_SSP-300-600_RS232_Protocol.pdf
retrieved_at: 2026-06-14T15:03:32.380Z
last_checked_at: 2026-06-14T16:13:48.526Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T16:13:48.526Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions matched verbatim in source command table with correct parameters and shapes; full bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IR code table contents not enumerated in source (only IRC nnn pass-through documented). Flow control setting not stated. Voltage/power specs out of scope."
- "flow control not stated in source"
- "no explicit multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "IR code table contents not enumerated in source. Flow control setting not stated. Firmware version compatibility not stated. Mode 27 absence not explained. Volume value range/scale not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
