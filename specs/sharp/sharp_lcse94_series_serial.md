---
spec_id: admin/sharp-lcse94-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCSE94 Series Control Spec"
manufacturer: Sharp
model_family: "LCSE94 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCSE94 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.sharpusa.com
source_urls:
  - http://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC46_52_65SE94U.pdf
retrieved_at: 2026-05-26T01:57:34.704Z
last_checked_at: 2026-06-02T05:46:13.171Z
generated_at: 2026-06-02T05:46:13.171Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range not stated."
  - "no continuous variable pool defined separately from action parameters in source."
  - "source does not document unsolicited notifications."
  - "source does not document multi-step sequences."
  - "source contains no safety warnings or interlock procedures."
  - "power-on-accepted behavior — `RSPW1` must be sent before `POWR1` is honored when TV is in standby rejection mode; exact timing not documented."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:13.171Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions matched verbatim in source command table; transport parameters verified; full opcode coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sharp LCSE94 Series Control Spec

## Summary
RS-232C control spec for Sharp LCSE94 Series LCD TVs. PC sends 8-ASCII-code command frames over a cross-type RS-232C cable; TV replies with `OK` or `ERR` + CR. Covers power, input selection, AV mode, picture/sound adjustments, tuner channels, and PC-mode geometry.

<!-- UNRESOLVED: firmware compatibility range not stated. -->

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
- powerable   # inferred from POWR command
- routable    # inferred from input-selection commands
- queryable   # inferred from "?" parameter support on most commands
- levelable   # inferred from VOLM, CONT, BRIT, BASS, TREB, etc.
```

## Actions
```yaml
- id: power_on_command_accepted
  label: Power On Command Accepted
  kind: action
  command: "RSPW1___"
  params: []

- id: power_on_command_rejected
  label: Power On Command Rejected
  kind: action
  command: "RSPW0___"
  params: []

- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "POWR0___"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "POWR1___"
  params: []

- id: power_on_query
  label: Power On Query
  kind: query
  command: "POWR____"
  params: []

- id: input_toggle
  label: Input Toggle
  kind: action
  command: "ITGD____"
  params: []

- id: input_tv
  label: Select TV Tuner
  kind: action
  command: "ITVD0___"
  params: []

- id: input_select_av
  label: Select Input 1-7
  kind: action
  command: "IAVD{n}__"
  params:
    - name: n
      type: integer
      description: Input terminal number (1-7)

- id: input1_mode
  label: INPUT1 Signal Mode
  kind: action
  command: "INP1{m}__"
  params:
    - name: m
      type: integer
      description: 0=AUTO, 1=VIDEO, 2=COMPONENT

- id: input3_mode
  label: INPUT3 Signal Mode
  kind: action
  command: "INP3{m}__"
  params:
    - name: m
      type: integer
      description: 0=AUTO, 1=VIDEO, 2=COMPONENT

- id: av_mode
  label: AV Mode
  kind: action
  command: "AVMD{m}__"
  params:
    - name: m
      type: integer
      description: 0=Toggle, 1=STANDARD, 2=MOVIE, 3=GAME, 4=USER, 5=DYNAMIC(Fixed), 6=DYNAMIC, 7=PC, 8=xvYCC

- id: volume
  label: Volume
  kind: action
  command: "VOLM{level}__"
  params:
    - name: level
      type: integer
      description: 0-60

- id: volume_query
  label: Volume Query
  kind: query
  command: "VOLM____"
  params: []

- id: h_position
  label: H-Position
  kind: action
  command: "HPOS{val}__"
  params:
    - name: val
      type: integer
      description: Position value (range depends on View Mode / signal)

- id: v_position
  label: V-Position
  kind: action
  command: "VPOS{val}__"
  params:
    - name: val
      type: integer
      description: Position value (range depends on View Mode / signal)

- id: clock_pc
  label: Clock (PC mode)
  kind: action
  command: "CLCK{val}__"
  params:
    - name: val
      type: integer
      description: 0-180, PC mode only

- id: phase_pc
  label: Phase (PC mode)
  kind: action
  command: "PHSE{val}__"
  params:
    - name: val
      type: integer
      description: 0-40, PC mode only

- id: view_mode
  label: View Mode (Wide)
  kind: action
  command: "WIDE{m}___"
  params:
    - name: m
      type: integer
      description: 0=Toggle[AV], 1=Side Bar[AV], 2=S.Stretch[AV], 3=Zoom[AV], 4=Stretch[AV], 5=Normal[PC], 6=Zoom[PC], 7=Stretch[PC], 8=Dot by Dot[PC/AV], 9=Full Screen[AV]

- id: mute
  label: Mute
  kind: action
  command: "MUTE{m}___"
  params:
    - name: m
      type: integer
      description: 0=Toggle, 1=On, 2=Off

- id: mute_query
  label: Mute Query
  kind: query
  command: "MUTE____"
  params: []

- id: surround
  label: Surround
  kind: action
  command: "ACSU{m}___"
  params:
    - name: m
      type: integer
      description: 0=Toggle, 1=On, 3=Off

- id: audio_selection
  label: Audio Selection (Toggle)
  kind: action
  command: "ACHA____"
  params: []

- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: "OFTM{m}___"
  params:
    - name: m
      type: integer
      description: 0=Off, 1=30min, 2=60min, 3=90min, 4=120min

- id: analog_air_channel
  label: Analog Air Channel
  kind: action
  command: "ACCH{val}__"
  params:
    - name: val
      type: integer
      description: Channel 2-69 (Air Analog)

- id: analog_cable_channel
  label: Analog Cable Channel
  kind: action
  command: "ACCC{val}__"
  params:
    - name: val
      type: integer
      description: Channel 1-135 (Cable Analog)

- id: digital_air_channel
  label: Digital Air Channel
  kind: action
  command: "DCCH{val}__"
  params:
    - name: val
      type: integer
      description: Major channel 2-69 (Air Digital)

- id: digital_cable_channel
  label: Digital Cable Channel
  kind: action
  command: "DCCC{val}__"
  params:
    - name: val
      type: integer
      description: Major channel 1-135 (Cable Digital)

- id: channel_up_down
  label: Channel Up/Down
  kind: action
  command: "CHUP{d}___"
  params:
    - name: d
      type: integer
      description: 0=Channel Down, 1=Channel Up

- id: opc
  label: OPC (Backlight Sensor)
  kind: action
  command: "OPC_{m}___"
  params:
    - name: m
      type: integer
      description: 0=Off, 1=On, 2=On:Display

- id: backlight
  label: Backlight
  kind: action
  command: "RCBC{val}__"
  params:
    - name: val
      type: integer
      description: 0-16

- id: contrast
  label: Contrast
  kind: action
  command: "CONT{val}__"
  params:
    - name: val
      type: integer
      description: 0-40

- id: brightness
  label: Brightness
  kind: action
  command: "BRIT{val}__"
  params:
    - name: val
      type: integer
      description: 0-30

- id: color
  label: Color
  kind: action
  command: "COLR{val}__"
  params:
    - name: val
      type: integer
      description: 0-30

- id: tint
  label: Tint
  kind: action
  command: "TINT{val}__"
  params:
    - name: val
      type: integer
      description: 0-30

- id: sharpness
  label: Sharpness
  kind: action
  command: "SHRP{val}__"
  params:
    - name: val
      type: integer
      description: 0-10

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "CTMP{m}___"
  params:
    - name: m
      type: integer
      description: 0=High, 1=Mid-High, 2=Middle, 3=Mid-Low, 4=Low

- id: fine_motion_advanced
  label: Fine Motion Advanced
  kind: action
  command: "FMOD{m}___"
  params:
    - name: m
      type: integer
      description: 0=Off, 1=On

- id: digital_noise_reduction
  label: Digital Noise Reduction
  kind: action
  command: "DNRE{m}___"
  params:
    - name: m
      type: integer
      description: 0=Off, 1=Low, 2=High

- id: treble
  label: Treble
  kind: action
  command: "TREB{val}__"
  params:
    - name: val
      type: integer
      description: -15 to +15

- id: bass
  label: Bass
  kind: action
  command: "BASS{val}__"
  params:
    - name: val
      type: integer
      description: -15 to +15

- id: balance
  label: Balance
  kind: action
  command: "BALC{val}__"
  params:
    - name: val
      type: integer
      description: L30 (-30) to R30 (+30)
```

## Feedbacks
```yaml
- id: ack_ok
  type: enum
  values: [ok]
  description: Normal response `OK\r`

- id: ack_err
  type: enum
  values: [err]
  description: Problem response `ERR\r` (communication error, incorrect command, or out-of-range parameter)
```

## Variables
```yaml
# UNRESOLVED: no continuous variable pool defined separately from action parameters in source.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes
- Command frame: 8 ASCII codes + CR (0x0D). Layout `C1 C2 C3 C4 P1 P2 P3 P4 \r`.
- `_` in parameter column = space; pad parameter left-aligned, fill remainder with blanks.
- `*` in parameter column = enter a value from the range in CONTROL CONTENTS.
- `x` in parameter column = any numerical value (used as a placeholder slot).
- `?` for parameter = query; device returns current setting value.
- Out-of-range parameter returns `ERR`.
- Send one command at a time; wait for `OK` before sending next.
- Connector: RS-232C 9-pin D-sub male (use cross-type cable to PC).
- H-POSITION / V-POSITION / CLOCK / PHASE valid ranges depend on current View Mode and input signal; see on-screen position-setting menu for actual range.
- Source lists HPOS/VPOS/CLCK/PHSE once in AV section and again labeled "(PC)"; they are the same 4-letter opcodes with PC-mode value-range note. Listed here once each.
<!-- UNRESOLVED: power-on-accepted behavior — `RSPW1` must be sent before `POWR1` is honored when TV is in standby rejection mode; exact timing not documented. -->

## Provenance

```yaml
source_domains:
  - files.sharpusa.com
source_urls:
  - http://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC46_52_65SE94U.pdf
retrieved_at: 2026-05-26T01:57:34.704Z
last_checked_at: 2026-06-02T05:46:13.171Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:13.171Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions matched verbatim in source command table; transport parameters verified; full opcode coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range not stated."
- "no continuous variable pool defined separately from action parameters in source."
- "source does not document unsolicited notifications."
- "source does not document multi-step sequences."
- "source contains no safety warnings or interlock procedures."
- "power-on-accepted behavior — `RSPW1` must be sent before `POWR1` is honored when TV is in standby rejection mode; exact timing not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
