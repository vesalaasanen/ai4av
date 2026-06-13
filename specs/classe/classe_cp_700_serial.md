---
spec_id: admin/classe-audio-cp-700
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CP-700 Control Spec"
manufacturer: "Classé"
model_family: CP-700
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CP-700
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CP-700_RS232_Protocol.pdf
retrieved_at: 2026-06-12T02:05:03.516Z
last_checked_at: 2026-06-12T19:14:40.221Z
generated_at: 2026-06-12T19:14:40.221Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow control not stated; source says 16-byte FIFO, no minimum inter-byte delay"
  - "no settable parameters beyond discrete actions identified in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "number of inputs and their names not stated in source"
  - "number of outputs not stated in source"
  - "volume range not stated in source"
  - "IR code table not provided in source"
  - "other baud rate selections not specified beyond 9600"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:14:40.221Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched verbatim in source; transport parameters verified; one-to-one coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Classe Audio CP-700 Control Spec

## Summary

RS-232C serial control spec for the Classe Audio CP-700 stereo preamplifier. Covers input selection, volume, balance, mute, standby/operate, trigger outputs, LCD brightness, tape monitor, IR pass-through, and status queries. All commands and responses are ASCII over serial.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source says 16-byte FIFO, no minimum inter-byte delay
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # STBY / OPER commands
  - levelable    # VOLM / VOL+ / VOL- / BALL / BALC / BALR
  - queryable    # STAT MAIN / STAT OUTP queries
  - routable     # MAIN n / INP+ / INP- input selection
```

## Actions
```yaml
actions:
  - id: main_input
    label: Select Main Input
    kind: action
    command: "MAIN{n}"
    params:
      - name: n
        type: integer
        description: Input number
    notes: "Address prefix P700. may be omitted if uniquely connected."

  - id: input_next
    label: Step to Next Input
    kind: action
    command: "INP+"
    params: []

  - id: input_prev
    label: Step to Previous Input
    kind: action
    command: "INP-"
    params: []

  - id: output_enable
    label: Enable/Disable Output
    kind: action
    command: "OUTP{n} {x}"
    params:
      - name: n
        type: integer
        description: Output number
      - name: x
        type: integer
        description: "1 = enable, 0 = disable"
    notes: "Enable (x=1) or disable (x=0) output n."

  - id: set_volume
    label: Set Volume
    kind: action
    command: "VOLM{vv.v}"
    params:
      - name: vv.v
        type: string
        description: Volume level (e.g. 45.0)
    notes: "Sets volume to nearest possible value, mute disengaged."

  - id: volume_up
    label: Volume Step Up
    kind: action
    command: "VOL+"
    params: []
    notes: "Steps volume up, mute disengaged. For acceleration mode, must receive next VOL+/VOL- within 200ms of reply."

  - id: volume_down
    label: Volume Step Down
    kind: action
    command: "VOL-"
    params: []
    notes: "Steps volume down, mute disengaged. Same acceleration timing as VOL+."

  - id: mute
    label: Mute
    kind: action
    command: "MUTE"
    params: []
    notes: "Engages mute and adjusts volume."

  - id: unmute
    label: Unmute
    kind: action
    command: "UNMT"
    params: []
    notes: "Disengages mute, returns to pre-mute volume level."

  - id: balance_left
    label: Balance Shift Left
    kind: action
    command: "BALL"
    params: []
    notes: "Shifts balance 0.5 dB to the left."

  - id: balance_center
    label: Balance Center
    kind: action
    command: "BALC"
    params: []
    notes: "Recenters to even balance."

  - id: balance_right
    label: Balance Shift Right
    kind: action
    command: "BALR"
    params: []
    notes: "Shifts balance 0.5 dB to the right."

  - id: standby
    label: Standby
    kind: action
    command: "STBY"
    params: []
    notes: "Puts CP-700 into standby."

  - id: operate
    label: Operate
    kind: action
    command: "OPER"
    params: []
    notes: "Puts CP-700 into operate mode."

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

  - id: lcd_saver
    label: LCD Screen Saver
    kind: action
    command: "LCD0"
    params: []
    notes: "Sets front panel LCD to low power screen saver mode."

  - id: lcd_low
    label: LCD Low Intensity
    kind: action
    command: "LCD1"
    params: []
    notes: "Sets front panel LCD to low intensity."

  - id: lcd_medium
    label: LCD Medium Intensity
    kind: action
    command: "LCD2"
    params: []
    notes: "Sets front panel LCD to medium intensity."

  - id: lcd_high
    label: LCD High Intensity
    kind: action
    command: "LCD3"
    params: []
    notes: "Sets front panel LCD to high intensity."

  - id: ir_pass
    label: Pass IR Code
    kind: action
    command: "IRC{nnn}"
    params:
      - name: nnn
        type: integer
        description: IR code from CP-700 IR code table

  - id: tape_off
    label: Tape Monitor Off
    kind: action
    command: "TAP0"
    params: []
    notes: "Turns off tape monitor output."

  - id: tape_on
    label: Tape Monitor On
    kind: action
    command: "TAP1"
    params: []
    notes: "Turns on tape monitor output."

  - id: sdp
    label: Display AC Module Parameters
    kind: action
    command: "SDP"
    params: []
    notes: "Displays AC module parameters."

  - id: stat_main
    label: Query Main Status
    kind: query
    command: "STAT MAIN"
    params: []
    notes: "Requests main volume and input selection."

  - id: stat_auto
    label: Enable Auto Status Updates
    kind: action
    command: "STAT AUTO"
    params: []
    notes: "Enables automatic status updates."

  - id: stat_outp
    label: Query Output Status
    kind: query
    command: "STAT OUTP"
    params: []
    notes: "Requests output status."

  - id: stat_off
    label: Disable Auto Status Updates
    kind: action
    command: "STAT OFF"
    params: []
    notes: "Disables automatic status updates."
```

## Feedbacks
```yaml
feedbacks:
  - id: cmd_ack
    type: enum
    values: ["!", "?"]
    description: "3-byte reply: !\\r\\n = command recognized, ?\\r\\n = command not recognized. Generated within 100ms of receipt."

  - id: sy_pwrup
    type: string
    description: "SY PWRUP - CP-700 has completed power up."

  - id: sy_stby
    type: string
    description: "SY STBY - CP-700 is in standby."

  - id: sy_oper
    type: string
    description: "SY OPER - CP-700 is in operate mode."

  - id: sy_volm
    type: string
    description: "SY VOLM vv.v - Volume level. Appends 'muted' if mute engaged."

  - id: sy_main
    type: string
    description: "SY MAIN n NN - Selected input number n, named NN."

  - id: sy_outp
    type: string
    description: "SY OUTP n x - Output n enabled (x=1) or disabled (x=0)."
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions identified in source
```

## Events
```yaml
events:
  - id: power_up_notification
    description: "SY PWRUP - sent when CP-700 completes power up."
    payload: "SY PWRUP"

  - id: standby_notification
    description: "SY STBY - sent when CP-700 enters standby."
    payload: "SY STBY"

  - id: operate_notification
    description: "SY OPER - sent when CP-700 enters operate mode."
    payload: "SY OPER"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

- All commands use ASCII. Command line terminated with CR/LF.
- Address prefix `P700.` may be omitted if controller is uniquely connected to the CP-700.
- Leading blanks in command strings are ignored.
- Reply generated within 100ms of line feed receipt. If no reply after 100ms, reissue command.
- Volume acceleration mode: VOL+/VOL- must receive next command within 200ms of system reply for acceleration.
- 16-byte FIFO on CP-700; no minimum inter-byte delay required.
<!-- UNRESOLVED: number of inputs and their names not stated in source -->
<!-- UNRESOLVED: number of outputs not stated in source -->
<!-- UNRESOLVED: volume range not stated in source -->
<!-- UNRESOLVED: IR code table not provided in source -->
<!-- UNRESOLVED: other baud rate selections not specified beyond 9600 -->

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CP-700_RS232_Protocol.pdf
retrieved_at: 2026-06-12T02:05:03.516Z
last_checked_at: 2026-06-12T19:14:40.221Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:14:40.221Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched verbatim in source; transport parameters verified; one-to-one coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not stated; source says 16-byte FIFO, no minimum inter-byte delay"
- "no settable parameters beyond discrete actions identified in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "number of inputs and their names not stated in source"
- "number of outputs not stated in source"
- "volume range not stated in source"
- "IR code table not provided in source"
- "other baud rate selections not specified beyond 9600"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
