---
spec_id: admin/lg-55qned85ura-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55QNED85URA Control Spec"
manufacturer: LG
model_family: 55QNED85URA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55QNED85URA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:04:54.769Z
generated_at: 2026-04-25T21:04:54.769Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "m c"
verification:
  verdict: verified
  checked_at: 2026-04-25T21:04:54.769Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions match literals in source; transport parameters verified; one extra IR key command not in spec."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 55QNED85URA Control Spec

## Summary
LG 55QNED85URA is a 55-inch QNED smart TV supporting RS-232C serial control for integration into commercial or automated AV setups. The serial interface operates at 9600 baud with 8-N-1 framing, using ASCII command encoding with carriage-return termination. Supports power, input selection, picture/sound adjustment, tiling modes for video wall applications, and diagnostic queries.

<!-- UNRESOLVED: IR remote section present but not part of serial control protocol -->

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
- powerable       # power on/off commands present (k a)
- routable        # input selection commands present (k b)
- levelable       # volume, contrast, brightness, color, tint, sharpness, balance, color temp present
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
      description: "0: Power Off, 1: Power On"
  command: k a
  data_format: "[Command1][Command2][ ][Set ID][ ][Data][Cr]"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: enum
      values: [2, 4, 5, 6, 7, 8, 9]
      description: "2: AV, 4: Component 1, 5: Component 2, 6: RGB (DTV), 7: RGB (PC), 8: HDMI (DTV), 9: HDMI (PC)"
  command: k b

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      description: "1: Normal (4:3), 2: Wide (16:9), 3: Horizon, 4: Zoom1, 5: Zoom2, 6: Original, 7: 14:9, 8: Full, 9: 1:1 (PC)"
  command: k c

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0: Off (Picture on), 1: On (Picture off)"
  command: k d

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0: Mute On, 1: Mute Off"
  command: k e

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "00H-64H (hex). Real mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: k f

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "00H-64H (hex). Real mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: k g

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "00H-64H (hex). Real mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: k h

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "00H-64H (hex). Real mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: k i

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      min: -50
      max: 50
      description: "Red: 00H ~ Green: 64H. Real mapping: 0=Step-50, 64=Step50"
  command: k j

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "00H-64H (hex). Real mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: k k

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0: OSD Off, 1: OSD On"
  command: k l

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0: Off, 1: On"
  command: k m

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      min: -50
      max: 50
      description: "00H-64H (hex). L50~R50. Real mapping: 0=Step-50, 64=Step50"
  command: k t

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: "0: Normal, 1: Cool, 2: Warm, 3: User"
  command: k u

- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [1, 2, 4, 8]
      description: "1: Inversion, 2: Orbiter, 4: White Wash, 8: Normal"
  command: j p

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: execute
      type: enum
      values: [1]
      description: "1: Execute auto configuration (works only in RGB PC mode)"
  command: j u

- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44]
      description: "00: Tile mode off, 12-44: column x row mode (e.g. 12=1x2, 44=4x4). Cannot be set to 0X or X0 except 00."
  command: d d

- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      min: 0
      max: 100
      description: "00H-64H"
  command: d g

- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      min: 0
      max: 100
      description: "00H-64H"
  command: d h

- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      min: 0
      max: 16
      description: "00H-10H (hex)"
  command: d i
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [0, 1]
  query_command: k a
  query_data: FF
  description: "0: Power Off, 1: Power On"

- id: input_state
  label: Input State
  type: enum
  values: [2, 4, 5, 6, 7, 8, 9]
  query_command: k b
  query_data: FF
  description: "2: AV, 4: Component 1, 5: Component 2, 6: RGB (DTV), 7: RGB (PC), 8: HDMI (DTV), 9: HDMI (PC)"

- id: abnormal_state
  label: Abnormal State
  type: enum
  values: [0, 1, 2, 3, 4, 6, 8, 9]
  query_command: k z
  query_data: FF
  description: "0: Normal, 1: No signal, 2: Off by remote, 3: Off by sleep, 4: Off by RS-232C, 6: AC down, 8: Off by off time, 9: Off by auto off"

- id: elapsed_time
  label: Elapsed Time
  type: integer
  query_command: d l
  query_data: FF
  description: "Returns used hours in hexadecimal"

- id: temperature_value
  label: Temperature Value
  type: integer
  query_command: d n
  query_data: FF
  description: "Internal temperature in hex (1 byte)"

- id: lamp_fault
  label: Lamp Fault
  type: enum
  values: [0, 1]
  query_command: d p
  query_data: FF
  description: "0: Lamp Fault, 1: Lamp OK"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameter commands found; all settable parameters are exposed as Actions above
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D, Space = 0x20.

Set ID range: 1-99. Set ID 0 enables broadcast mode (all devices respond, but ACK cannot be reliably checked).

Read mode: transmit `FF` as data value to query current status.

OK Acknowledgement format: `[Command2][ ][Set ID][ ][OK][Data][x]`
Error Acknowledgement format: `[Command2][ ][Set ID][ ][NG][Data][x]`

Hex value mapping for 0-100 range: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100.

<!-- UNRESOLVED: IR remote codes section present but not applicable to RS-232C control -->
<!-- UNRESOLVED: discrete IR power codes (C4, C5) documented but not part of serial protocol -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:04:54.769Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:04:54.769Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions match literals in source; transport parameters verified; one extra IR key command not in spec."
```

## Known Gaps

```yaml
- "m c"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
