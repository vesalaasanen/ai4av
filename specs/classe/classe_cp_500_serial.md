---
spec_id: admin/classe-audio-cp-500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CP-500 Control Spec"
manufacturer: "Classé"
model_family: CP-500
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CP-500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - "https://web.archive.org/web/20101103050101if_/http://classeaudio.com/downloads/Download.htm?Path=RS_232_CODES/Class%E9_RS232&File=CP500%20RS232%20v1-41%20%2820041123%29.pdf"
retrieved_at: 2026-06-09T18:34:00.504Z
last_checked_at: 2026-06-10T07:33:46.288Z
generated_at: 2026-06-10T07:33:46.288Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility not stated in source"
  - "source documents no settable parameters distinct from discrete actions"
  - "no multi-step sequences described in source"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "alternate baud rates selectable in system setup not enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-06-10T07:33:46.288Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched exactly in source; transport parameters verified; complete coverage of command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Classe Audio CP-500 Control Spec

## Summary
Spec covers RS-232C control of Classe Audio CP-500 stereo preamp. Covers input select, volume/mute, balance, standby, triggers, LCD intensity, tape monitor, IR pass-through, and status reporting.

<!-- UNRESOLVED: firmware compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from STBY / OPER commands
- routable  # inferred from MAIN n / INP+ / INP- commands
- queryable  # inferred from STAT commands and SY status strings
- levelable  # inferred from VOLM / VOL+ / VOL- commands
```

## Actions
```yaml
# Source document lists command strings. Address prefix "P500." may be omitted
# when controller uniquely addresses the CP-500. Commands terminated by CR/LF.
- id: main_select
  label: Select Main Input
  kind: action
  command: "MAIN {n}"
  params:
    - name: n
      type: integer
      description: Input number
- id: input_step_next
  label: Step To Next Input
  kind: action
  command: "INP+"
  params: []
- id: input_step_previous
  label: Step To Previous Input
  kind: action
  command: "INP-"
  params: []
- id: volume_set
  label: Set Volume
  kind: action
  command: "VOLM {vv.v}"
  params:
    - name: vv.v
      type: number
      description: Volume level in dB (nearest possible value applied)
- id: volume_up
  label: Step Volume Up
  kind: action
  command: "VOL+"
  params: []
- id: volume_down
  label: Step Volume Down
  kind: action
  command: "VOL-"
  params: []
- id: mute
  label: Engage Mute
  kind: action
  command: "MUTE"
  params: []
- id: unmute
  label: Disengage Mute
  kind: action
  command: "UNMT"
  params: []
- id: balance_left
  label: Shift Balance Left 0.5 dB
  kind: action
  command: "BALL"
  params: []
- id: balance_center
  label: Recenter Balance
  kind: action
  command: "BALC"
  params: []
- id: balance_right
  label: Shift Balance Right 0.5 dB
  kind: action
  command: "BALR"
  params: []
- id: standby
  label: Enter Standby
  kind: action
  command: "STBY"
  params: []
- id: operate
  label: Enter Operate Mode
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
- id: lcd_screen_saver
  label: LCD Low Power Screen Saver
  kind: action
  command: "LCD0"
  params: []
- id: lcd_low_intensity
  label: LCD Low Intensity
  kind: action
  command: "LCD1"
  params: []
- id: lcd_medium_intensity
  label: LCD Medium Intensity
  kind: action
  command: "LCD2"
  params: []
- id: lcd_high_intensity
  label: LCD High Intensity
  kind: action
  command: "LCD3"
  params: []
- id: ir_pass_through
  label: Pass IR Code
  kind: action
  command: "IRC {nnn}"
  params:
    - name: nnn
      type: integer
      description: 3-digit IR code from CP-500 IR code table
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
- id: display_ac_params
  label: Display AC Module Parameters
  kind: action
  command: "SDP"
  params: []
- id: stat_main
  label: Request Main Volume And Input
  kind: query
  command: "STAT MAIN"
  params: []
- id: stat_auto
  label: Enable Automatic Status Updates
  kind: action
  command: "STAT AUTO"
  params: []
- id: stat_off
  label: Disable Automatic Status Updates
  kind: action
  command: "STAT OFF"
  params: []
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values: [ok, error]
  description: "3-char reply: '!' + CR + LF = ok, '?' + CR + LF = unrecognized command"
- id: power_state
  type: enum
  values: [powerup, standby, operate]
  description: "SY PWRUP / SY STBY / SY OPER status strings"
- id: volume
  type: number
  description: "SY VOLM vv.v status string. Appended 'muted' if mute engaged"
- id: main_input
  type: object
  description: "SY MAIN n NN - input number n and input name NN"
```

## Variables
```yaml
# UNRESOLVED: source documents no settable parameters distinct from discrete actions
```

## Events
```yaml
# Source describes unsolicited SY PWRUP / SY STBY / SY OPER notifications,
# and SY VOLM / SY MAIN updates when STAT AUTO is enabled.
- id: sy_pwrup
  payload: "SY PWRUP"
  description: CP-500 completed power-up
- id: sy_stby
  payload: "SY STBY"
  description: CP-500 entered standby
- id: sy_oper
  payload: "SY OPER"
  description: CP-500 entered operate mode
- id: sy_volm
  payload: "SY VOLM {vv.v}"
  description: Volume level update
- id: sy_main
  payload: "SY MAIN {n} {NN}"
  description: Main input selection update
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
Commands terminated by CR/LF. Address prefix "P500." precedes command (separated by period + optional spaces) when bus-shared; may be omitted for point-to-point links. CP-500 replies within 100 ms of LF; if no reply, reissue. No minimum byte timing (16-byte FIFO). VOL+/VOL- acceleration requires repeat within 200 ms of system reply. All command/status data are ASCII. Source baud is 9600 8N1; system setup menu allows other baud rates but exact set not documented.
<!-- UNRESOLVED: alternate baud rates selectable in system setup not enumerated in source -->

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - "https://web.archive.org/web/20101103050101if_/http://classeaudio.com/downloads/Download.htm?Path=RS_232_CODES/Class%E9_RS232&File=CP500%20RS232%20v1-41%20%2820041123%29.pdf"
retrieved_at: 2026-06-09T18:34:00.504Z
last_checked_at: 2026-06-10T07:33:46.288Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:33:46.288Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched exactly in source; transport parameters verified; complete coverage of command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility not stated in source"
- "source documents no settable parameters distinct from discrete actions"
- "no multi-step sequences described in source"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "alternate baud rates selectable in system setup not enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
