---
spec_id: admin/classe-cp-800
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CP-800 Control Spec"
manufacturer: "Classé"
model_family: CP-800
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CP-800
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
  - web.archive.org
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CP-800_RS232_Protocol.pdf
  - https://web.archive.org/web/20190615092657/https://classeaudio.com/cp-800/
retrieved_at: 2026-06-10T18:28:29.469Z
last_checked_at: 2026-06-11T13:39:57.684Z
generated_at: 2026-06-11T13:39:57.684Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no information on TCP/IP control, network addressing, or firmware version constraints in source"
  - "no continuous settable parameter range documented in source;"
  - "the SY PWRUP / SY STBY / SY OPER / SY VOLM / SY MAIN / SY OUTP /"
  - "no multi-step sequences documented in source."
  - "no safety warnings, interlocks, or power-on sequencing requirements in source."
  - "firmware version constraints not stated in source."
  - "input number range and output configuration number range not stated in source."
  - "CP-800 IR code table referenced by IRC command not included in this source."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:39:57.684Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec actions have exact literal matches in source command table; complete one-to-one coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Classe Audio CP-800 Control Spec

## Summary
The Classe Audio CP-800 is a stereo preamplifier/processor controllable via RS-232. This spec covers the ASCII command set documented in the manufacturer RS-232 specification Rev 1.03 (5 February 2013), including input selection, volume, mute, balance, standby, triggers, LCD brightness, tone control, and status reporting.

<!-- UNRESOLVED: no information on TCP/IP control, network addressing, or firmware version constraints in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: standby/operate commands present
- routable        # inferred: MAIN n and OUTP n input/output routing commands present
- queryable       # inferred: STAT MAIN / STAT OUTP / STAT PWR query commands present
- levelable       # inferred: VOLM, VOL+, VOL-, BALL, BALC, BALR, TCB+/-, TCT+/- level commands present
```

## Actions
```yaml
- id: main_select
  label: Select Main Input
  kind: action
  command: "MAIN {n}"
  params:
    - name: n
      type: integer
      description: Input number

- id: input_next
  label: Step to Next Input
  kind: action
  command: "INP+"
  params: []

- id: input_previous
  label: Step to Previous Input
  kind: action
  command: "INP-"
  params: []

- id: output_config
  label: Set Output Configuration
  kind: action
  command: "OUTP {n}"
  params:
    - name: n
      type: integer
      description: Output configuration number

- id: volume_set
  label: Set Volume
  kind: action
  command: "VOLM {vv.v}"
  params:
    - name: vv.v
      type: number
      description: Volume value, mute disengaged

- id: volume_up
  label: Volume Step Up
  kind: action
  command: "VOL+"
  params: []

- id: volume_down
  label: Volume Step Down
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
  label: Shift Balance 0.5 dB Left
  kind: action
  command: "BALL"
  params: []

- id: balance_center
  label: Recenter Balance
  kind: action
  command: "BALC"
  params: []

- id: balance_right
  label: Shift Balance 0.5 dB Right
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
  label: LCD Low Power / Screen Saver
  kind: action
  command: "LCD0"
  params: []

- id: lcd_high
  label: LCD High Intensity
  kind: action
  command: "LCD1"
  params: []

- id: lcd_medium
  label: LCD Medium Intensity
  kind: action
  command: "LCD2"
  params: []

- id: lcd_low
  label: LCD Low Intensity
  kind: action
  command: "LCD3"
  params: []

- id: ir_pass_through
  label: IR Code Pass-Through
  kind: action
  command: "IRC {nnn}"
  params:
    - name: nnn
      type: integer
      description: IR code from CP-800 IR code table

- id: stat_main
  label: Request Main Volume and Input Selection
  kind: query
  command: "STAT MAIN"
  params: []

- id: stat_auto
  label: Enable Auto Status Updates (Relative Volume)
  kind: action
  command: "STAT AUTO"
  params: []

- id: stat_auta
  label: Enable Auto Status Updates (Absolute Volume)
  kind: action
  command: "STAT AUTA"
  params: []

- id: stat_outp
  label: Request Output Status
  kind: query
  command: "STAT OUTP"
  params: []

- id: stat_off
  label: Disable Auto Status Updates
  kind: action
  command: "STAT OFF"
  params: []

- id: stat_pwr
  label: Request Standby Status
  kind: query
  command: "STAT PWR"
  params: []

- id: amx_beacon
  label: Request AMX Beacon
  kind: action
  command: "AMX"
  params: []

- id: stereo_mono_toggle
  label: Toggle Stereo/Mono Mode
  kind: action
  command: "STMO"
  params: []

- id: tone_disable
  label: Disable Tone Control
  kind: action
  command: "TCDIS"
  params: []

- id: tone_enable
  label: Enable Tone Control
  kind: action
  command: "TCEN"
  params: []

- id: tone_tilt_cw
  label: Tone Tilt Clockwise (Bass Cut, Treble Boost)
  kind: action
  command: "TTCW"
  params: []

- id: tone_tilt_ccw
  label: Tone Tilt Counter-Clockwise (Bass Boost, Treble Cut)
  kind: action
  command: "TTCCW"
  params: []

- id: tone_bass_boost
  label: Tone Control Bass Boost (Discrete Mode)
  kind: action
  command: "TCB+"
  params: []

- id: tone_bass_cut
  label: Tone Control Bass Cut (Discrete Mode)
  kind: action
  command: "TCB-"
  params: []

- id: tone_treble_boost
  label: Tone Control Treble Boost (Discrete Mode)
  kind: action
  command: "TCT+"
  params: []

- id: tone_treble_cut
  label: Tone Control Treble Cut (Discrete Mode)
  kind: action
  command: "TCT-"
  params: []
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values: [ok, error]
  description: |
    3-character reply sent within 100ms of command termination.
    "!\r\n" = command recognized; "?\r\n" = command not recognized.

- id: power_up
  type: enum
  values: [completed]
  description: Emitted on `SY PWRUP` when CP-800 completes power up.

- id: standby_state
  type: enum
  values: [standby, operate]
  description: Emitted on `SY STBY` or `SY OPER`.

- id: volume_state
  type: number
  description: |
    Emitted on `SY VOLM vv.v`. When mute engaged, the literal string
    "muted" is appended.

- id: main_input_state
  type: integer
  description: Emitted on `SY MAIN n` with selected source number.

- id: output_state
  type: integer
  description: Emitted on `SY OUTP n` with selected output number.

- id: stereo_mono_mode
  type: enum
  values: [STEREO, MONO]
  description: Emitted on `SY MODE x`.

- id: tone_state
  type: string
  description: |
    Emitted on `SY TONE a B:x.x T:y.y` where a is EN or DIS, B is bass
    cut/boost, T is treble cut/boost.

- id: power_state
  type: enum
  values: [ON, OFF]
  description: Emitted on `SY PWR x`; ON = operational, OFF = standby.
```

## Variables
```yaml
# UNRESOLVED: no continuous settable parameter range documented in source;
# all parameters are part of discrete commands above.
```

## Events
```yaml
# UNRESOLVED: the SY PWRUP / SY STBY / SY OPER / SY VOLM / SY MAIN / SY OUTP /
# SY MODE / SY TONE / SY PWR strings are documented as the device's status
# replies; they are modeled as Feedbacks above rather than unsolicited events
# since the protocol does not distinguish push vs. polled notification.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements in source.
```

## Notes
- UART: 19200 baud, 8-N-1. All command/status data are ASCII bytes.
- 16-byte FIFO on CP-800. No minimum delay required between bytes.
- Commands terminated with ASCII carriage return (CR, 0x0D).
- Status strings terminated with CR+LF (0x0D 0x0A).
- 3-char ack `!\r\n` (recognized) or `?\r\n` (unrecognized) issued within 100ms of last command termination character. Reissue command if no reply within 100ms.
- TTCW/TTCCW require unit to be in tilt tone mode; TCB+/TCB-/TCT+/TCT- require discrete tone control mode.
- VOL+/VOL- disengage mute.
- Source: RS232 Specification for Classe Audio CP-800, Rev 1.03, 5 February 2013.

<!-- UNRESOLVED: firmware version constraints not stated in source. -->
<!-- UNRESOLVED: input number range and output configuration number range not stated in source. -->
<!-- UNRESOLVED: CP-800 IR code table referenced by IRC command not included in this source. -->

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
  - web.archive.org
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CP-800_RS232_Protocol.pdf
  - https://web.archive.org/web/20190615092657/https://classeaudio.com/cp-800/
retrieved_at: 2026-06-10T18:28:29.469Z
last_checked_at: 2026-06-11T13:39:57.684Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:39:57.684Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec actions have exact literal matches in source command table; complete one-to-one coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no information on TCP/IP control, network addressing, or firmware version constraints in source"
- "no continuous settable parameter range documented in source;"
- "the SY PWRUP / SY STBY / SY OPER / SY VOLM / SY MAIN / SY OUTP /"
- "no multi-step sequences documented in source."
- "no safety warnings, interlocks, or power-on sequencing requirements in source."
- "firmware version constraints not stated in source."
- "input number range and output configuration number range not stated in source."
- "CP-800 IR code table referenced by IRC command not included in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
