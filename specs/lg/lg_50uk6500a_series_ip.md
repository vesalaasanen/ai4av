---
spec_id: admin/lg-50uk6500a-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50UK6500A Series Control Spec"
manufacturer: LG
model_family: "50UK6500A Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "50UK6500A Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:02:38.345Z
generated_at: 2026-04-25T21:02:38.345Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:02:38.345Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec actions matched to source commands; all transport parameters verified verbatim; complete bidirectional command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 50UK6500A Series Control Spec

## Summary
LG commercial display in the UK6500A series. Control via RS-232C serial (ASCII protocol). Supports power on/off, input selection, picture adjustment, audio adjustment, tile mode for video wall configurations, and query commands for status, elapsed time, temperature, and lamp fault.

<!-- UNRESOLVED: source document filename references "IP" but content describes RS-232C/UART protocol only. TCP/IP control not documented in this source. -->

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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 1 = On
- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: 2=AV, 4=Component1, 5=Component2, 6=RGB(DTV), 7=RGB(PC), 8=HDMI(DTV), 9=HDMI(PC)
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 1=4:3, 2=16:9, 3=Horizon, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full(EU), 9=1:1(PC)
- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Mute On, 1=Mute Off
- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 step)
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 step)
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 step)
- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 step, video only)
- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: 00H=Red50, 64H=Green50 (video only)
- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 step, video only)
- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (L50-R50)
- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Normal, 1=Cool, 2=Warm, 3=User
- id: abnormal_state
  label: Abnormal State Read
  kind: action
  params:
    - name: data
      type: string
      description: FF to read status
- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Inversion, 2=Orbiter, 4=White Wash, 8=Normal
- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: set
      type: integer
      description: 1=To set (RGB PC mode only)
- id: key
  label: Key (IR Remote Code)
  kind: action
  params:
    - name: keycode
      type: string
      description: Hex key code (e.g. 08=Power, 02=Vol-, 03=Vol+)
- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 00=Off, 12=1x2, 13=1x3, 14=1x4, ...44=4x4
- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      description: 00H-64H
- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      description: 00H-64H
- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      description: 00H-10H
- id: elapsed_time_return
  label: Elapsed Time Return
  kind: action
  params:
    - name: data
      type: string
      description: FF to read (returns hours used)
- id: temperature_value
  label: Temperature Value Return
  kind: action
  params:
    - name: data
      type: string
      description: FF to read (returns 1-byte hex temperature)
- id: lamp_fault_check
  label: Lamp Fault Check
  kind: action
  params:
    - name: data
      type: string
      description: FF to read (0=Lamp Fault, 1=Lamp OK)
```

## Feedbacks
```yaml
- id: ack_ok
  label: OK Acknowledgement
  type: string
  description: "[Command2][SetID][OK][Data][x]"
- id: ack_ng
  label: NG Acknowledgement
  type: string
  description: "[Command2][SetID][NG][Data][x]"
- id: power_state
  label: Power State
  type: enum
  values: [off, on]
- id: input_state
  label: Input State
  type: enum
  values: [av, component1, component2, rgb_dtv, rgb_pc, hdmi_dtv, hdmi_pc]
- id: abnormal_state_value
  label: Abnormal State Value
  type: enum
  values: [normal, no_signal, power_off_rc, power_off_sleep, power_off_rs232c, ac_down, power_off_timer, auto_off]
- id: elapsed_hours
  label: Elapsed Hours
  type: integer
  description: Hours used (hex to integer)
- id: temperature
  label: Temperature
  type: integer
  description: Internal temperature in hex
- id: lamp_status
  label: Lamp Status
  type: enum
  values: [fault, ok]
```

## Variables
```yaml
# No standalone settable parameters — all are action params
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `[Command1][Command2][ ][SetID][ ][Data][Cr]` where Command1 is j/k/m/d, SetID is 1-99 (0=broadcast all), Data is hex, Cr is 0x0D.

Read mode: send `FF` as data to query current value.

Broadcast mode (SetID=0): ACK messages from multiple units may conflict; ACK checking not reliable.

Tile mode data cannot be set to 0X or X0 except 00.

Auto Configure works only in RGB(PC) mode.

<!-- UNRESOLVED: TCP/IP control protocol not documented — source describes only RS-232C serial communication. -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:02:38.345Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:02:38.345Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec actions matched to source commands; all transport parameters verified verbatim; complete bidirectional command coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
