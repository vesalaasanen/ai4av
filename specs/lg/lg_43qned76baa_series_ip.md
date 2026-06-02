---
spec_id: admin/lg-43qned76baa-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 43QNED76BAA Series Control Spec"
manufacturer: LG
model_family: "43QNED76BAA Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "43QNED76BAA Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - webostv.developer.lge.com
  - justaddpower.com
  - justaddpower.happyfox.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://webostv.developer.lge.com/develop/references/audio
  - https://webostv.developer.lge.com/develop/references/system-service
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
retrieved_at: 2026-06-02T22:08:54.563Z
last_checked_at: 2026-06-02T22:08:54.563Z
generated_at: 2026-06-02T22:08:54.563Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP protocol not confirmed in source; document describes RS-232C only"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "TCP/IP control protocol not found in source; RS-232C confirmed"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:08:54.563Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 43QNED76BAA Series Control Spec

## Summary
LG commercial display in the QNED76BAA series. Control via RS-232C (UART) using LG's standard ASCII command protocol. Supports power control, input selection, picture adjustment, audio control, and diagnostic queries.

<!-- UNRESOLVED: TCP/IP protocol not confirmed in source; document describes RS-232C only -->

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
- powerable       # inferred: power on/off commands present (k a)
- routable        # inferred: input selection commands present (k b)
- queryable       # inferred: status read commands present (FF data)
- levelable       # inferred: volume, brightness, contrast, etc. present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: 0=Off, 1=On

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: enum
      values: [2, 4, 5, 6, 7, 8, 9]
      description: 2=AV, 4=Component1, 5=Component2, 6=RGB-DTV, 7=RGB-PC, 8=HDMI-DTV, 9=HDMI-PC

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      description: 1=Normal-4:3, 2=Wide-16:9, 3=Horizon, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full, 9=1:1-PC

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: 0=Off, 1=On

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: 0=Mute-On, 1=Mute-Off

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: 00H=Step0 to 64H=Step100

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: 00H to 64H

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: 00H to 64H

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: 00H to 64H

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [-50, 50]
      description: 00H=Red-50 to 64H=Green+50

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: 00H to 64H

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: 0=Off, 1=On

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: 0=Off, 1=On

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: [-50, 50]
      description: 00H=L50 to 64H=R50

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: 0=Normal, 1=Cool, 2=Warm, 3=User

- id: abnormal_state
  label: Abnormal State Read
  kind: query
  params: []

- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [1, 2, 4, 8]
      description: 1=Inversion, 2=Orbiter, 4=WhiteWash, 8=Normal

- id: auto_config
  label: Auto Configure
  kind: action
  params:
    - name: set
      type: enum
      values: [1]
      description: 1=Execute (RGB-PC mode only)

- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 12, 13, 14, 44]
      description: 0=Off, 12=1x2, 13=1x3, 14=1x4, 44=4x4

- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      range: [0, 100]
      description: 00H to 64H

- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      range: [0, 100]
      description: 00H to 64H

- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      range: [0, 16]
      description: 00H to 10H

- id: elapsed_time_return
  label: Elapsed Time Return
  kind: query
  params: []

- id: temperature_value
  label: Temperature Value
  kind: query
  params: []

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [0, 1]
  description: 0=Off, 1=On

- id: input_state
  label: Input State
  type: enum
  values: [2, 4, 5, 6, 7, 8, 9]

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values: [0, 1]

- id: abnormal_state
  label: Abnormal State
  type: enum
  values: [0, 1, 2, 3, 4, 6, 8, 9]
  description: 0=Normal, 1=NoSignal, 2=RC-Off, 3=Sleep-Off, 4=RS232C-Off, 6=AC-Down, 8=Timer-Off, 9=AutoOff

- id: elapsed_time
  label: Elapsed Time
  type: integer
  description: Hours used (hexadecimal)

- id: temperature
  label: Temperature
  type: integer
  description: Internal temperature in hex

- id: lamp_status
  label: Lamp Status
  type: enum
  values: [0, 1]
  description: 0=Fault, 1=OK
```

## Variables
```yaml
# All settable parameters are handled via Actions; no separate Variables section required.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D
- Set ID range: 1-99 (0 = broadcast to all devices)
- Reading status: transmit `FF` data value
- ACK format: `[Command2][ ][Set ID][ ][OK][Data][x]`
- Error ACK format: `[Command2][ ][Set ID][ ][NG][Data][x]`
- Real data mapping for 0-100 range: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100
- IR codes section included for reference only (wired remote control)
<!-- UNRESOLVED: TCP/IP control protocol not found in source; RS-232C confirmed -->

## Provenance

```yaml
source_domains:
  - webostv.developer.lge.com
  - justaddpower.com
  - justaddpower.happyfox.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://webostv.developer.lge.com/develop/references/audio
  - https://webostv.developer.lge.com/develop/references/system-service
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
retrieved_at: 2026-06-02T22:08:54.563Z
last_checked_at: 2026-06-02T22:08:54.563Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:08:54.563Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP protocol not confirmed in source; document describes RS-232C only"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "TCP/IP control protocol not found in source; RS-232C confirmed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
