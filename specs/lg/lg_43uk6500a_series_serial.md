---
spec_id: admin/lg-43uk6500a-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 43UK6500A Series Control Spec"
manufacturer: LG
model_family: "43UK6500A Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "43UK6500A Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - justaddpower.com
  - scribd.com
  - files.remotecentral.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://www.scribd.com/document/649294226/RS232-forLGTV
  - https://files.remotecentral.com/library/22-1/lg/television/index.html
retrieved_at: 2026-06-02T22:08:59.243Z
last_checked_at: 2026-06-02T22:08:59.243Z
generated_at: 2026-06-02T22:08:59.243Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IR remote control codes section present but not machine-protocol control"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "Auto Configure works only in RGB(PC) mode — boundary conditions not fully documented"
  - "Tile Mode data values (12-44 pattern) partially documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:08:59.243Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-17
---

# LG 43UK6500A Series Control Spec

## Summary
LG 43UK6500A Series 4K UHD television with RS-232C serial control interface. Supports power control, input selection, picture adjustment, audio control, and display configuration via ASCII command protocol at 9600 baud.

<!-- UNRESOLVED: IR remote control codes section present but not machine-protocol control -->

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
- powerable       # Power on/off commands present
- routable        # Input selection commands present
- queryable       # Read commands for power state, elapsed time, temperature, lamp fault
- levelable       # Volume, contrast, brightness, color, tint, sharpness, balance control
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Power Off, 1 = Power On
  command: k a
  format: "[k][a][ ][Set ID][ ][Data][Cr]"

- id: select_input
  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: 2=AV, 4=Component1, 5=Component2, 6=RGB(DTV), 7=RGB(PC), 8=HDMI(DTV), 9=HDMI(PC)
  command: k b
  format: "[k][b][ ][Set ID][ ][Data][Cr]"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Normal(4:3), 2=Wide(16:9), 3=Hornizon, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full, 9=1:1(PC)
  command: k c
  format: "[k][c][ ][Set ID][ ][Data][Cr]"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off (Picture on), 1=On (Picture off)
  command: k d
  format: "[k][d][ ][Set ID][ ][Data][Cr]"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Mute On, 1=Mute Off
  command: k e
  format: "[k][e][ ][Set ID][ ][Data][Cr]"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100
  command: k f
  format: "[k][f][ ][Set ID][ ][Data][Cr]"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100)
  command: k g
  format: "[k][g][ ][Set ID][ ][Data][Cr]"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100)
  command: k h
  format: "[k][h][ ][Set ID][ ][Data][Cr]"

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100, video only)
  command: k i
  format: "[k][i][ ][Set ID][ ][Data][Cr]"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: 00H=Red50, 64H=Green50 (video only)
  command: k j
  format: "[k][j][ ][Set ID][ ][Data][Cr]"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100, video only)
  command: k k
  format: "[k][k][ ][Set ID][ ][Data][Cr]"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OSD Off, 1=OSD On
  command: k l
  format: "[k][l][ ][Set ID][ ][Data][Cr]"

- id: remote_lock
  label: Remote/Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
  command: k m
  format: "[k][m][ ][Set ID][ ][Data][Cr]"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: 00H=L50, 64H=R50
  command: k t
  format: "[k][t][ ][Set ID][ ][Data][Cr]"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Normal, 1=Cool, 2=Warm, 3=User
  command: k u
  format: "[k][u][ ][Set ID][ ][Data][Cr]"

- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Inversion, 2=Orbiter, 4=White Wash, 8=Normal
  command: j p
  format: "[j][p][ ][Set ID][ ][Data][Cr]"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      description: 1=Execute (RGB PC mode only)
  command: j u
  format: "[j][u][ ][Set ID][ ][Data][Cr]"

- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 00=Off, 12=1x2, 13=1x3, 14=1x4, ... 44=4x4
  command: d d
  format: "[d][d][ ][Set ID][ ][Data][x]"

- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      description: 00H-64H
  command: d g
  format: "[d][g][ ][Set ID][ ][Data][x]"

- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      description: 00H-64H
  command: d h
  format: "[d][h][ ][Set ID][ ][Data][x]"

- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      description: 00H-10H
  command: d i
  format: "[d][i][ ][Set ID][ ][Data][x]"

- id: send_key
  label: Send IR Key Code
  kind: action
  params:
    - name: keycode
      type: string
      description: Hex key code (see IR code table)
  command: m c
  format: "[m][c][ ][Set ID][ ][Data][Cr]"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - 0  # Power Off
    - 1  # Power On
  query_command: k a FF
  ack_format: "[Command2][ ][Set ID][ ][OK][Data][x]"

- id: input_state
  label: Input Selection
  type: enum
  values:
    - 2   # AV
    - 4   # Component 1
    - 5   # Component 2
    - 6   # RGB (DTV)
    - 7   # RGB (PC)
    - 8   # HDMI (DTV)
    - 9   # HDMI (PC)

- id: abnormal_state
  label: Abnormal State
  type: enum
  values:
    - 0   # Normal (Power on and signal exist)
    - 1   # No signal (Power on)
    - 2   # Turn the monitor off by remote control
    - 3   # Turn the monitor off by sleep time function
    - 4   # Turn the monitor off by RS-232C function
    - 6   # AC down
    - 8   # Turn the monitor off by off time function
    - 9   # Turn the monitor off by auto off function
  query_command: k z FF

- id: elapsed_time
  label: Elapsed Time
  type: integer
  unit: hours
  query_command: d l FF

- id: temperature_value
  label: Temperature Value
  type: integer
  unit: unknown
  query_command: d n FF

- id: lamp_fault
  label: Lamp Fault Status
  type: enum
  values:
    - 0   # Lamp Fault
    - 1   # Lamp OK
  query_command: d p FF
```

## Variables
```yaml
# All adjustable parameters are controlled via Actions with range parameters.
# No separate Variables section needed.
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
- Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D, Space = 0x20
- Set ID range: 1-99 (0 = broadcast to all devices, but ACK cannot be checked in broadcast mode)
- To read status, send `FF` in the data field
- OK Acknowledgement: `[Command2][ ][Set ID][ ][OK][Data][x]`
- NG Acknowledgement: `[Command2][ ][Set ID][ ][NG][Data][x]`
- Data ranges use hexadecimal notation (e.g., 00H-64H = 0-100 decimal)
- Volume/Contrast/Brightness/Color/Sharpness: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100
- Tint: 0=Red(-50), 64=Green(+50)
- Balance: 00H=L50, 64H=R50
- Tile Mode data format uses `[d][d][ ][Set ID][ ][Data][x]` without Cr
- IR codes section present but represents wired remote protocol, not serial control
<!-- UNRESOLVED: Auto Configure works only in RGB(PC) mode — boundary conditions not fully documented -->
<!-- UNRESOLVED: Tile Mode data values (12-44 pattern) partially documented -->

## Provenance

```yaml
source_domains:
  - justaddpower.com
  - scribd.com
  - files.remotecentral.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://www.scribd.com/document/649294226/RS232-forLGTV
  - https://files.remotecentral.com/library/22-1/lg/television/index.html
retrieved_at: 2026-06-02T22:08:59.243Z
last_checked_at: 2026-06-02T22:08:59.243Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:08:59.243Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IR remote control codes section present but not machine-protocol control"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "Auto Configure works only in RGB(PC) mode — boundary conditions not fully documented"
- "Tile Mode data values (12-44 pattern) partially documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
