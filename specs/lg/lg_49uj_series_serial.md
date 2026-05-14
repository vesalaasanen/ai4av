---
spec_id: admin/lg-49uj-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49UJ Series Control Spec"
manufacturer: LG
model_family: "49UJ Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "49UJ Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:01:18.729Z
generated_at: 2026-04-25T21:01:18.729Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - kz
  - dl
  - dn
  - dp
verification:
  verdict: verified
  checked_at: 2026-04-25T21:01:18.729Z
  matched_actions: 22
  action_count: 22
  confidence: high
  summary: "All 22 spec actions matched source commands literally; transport parameters verified; extra query-command variants are feedback mechanisms already represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49UJ Series Control Spec

## Summary
LG commercial TV display supporting RS-232C serial control. Protocol uses ASCII command format with two-character command codes, Set ID targeting (1-99 or broadcast), and hexadecimal data values. Includes power, input routing, picture adjustment, audio control, and tile-mode video wall support.

<!-- UNRESOLVED: IR remote control codes section present but not machine-protocol control; not modeled -->

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
- powerable       # power on/off commands present
- routable        # input selection commands present
- queryable       # read/query commands present (FF data)
- levelable       # volume, brightness, contrast, etc.
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

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: "2: AV, 4: Component1, 5: Component2, 6: RGB (DTV), 7: RGB (PC), 8: HDMI (DTV), 9: HDMI (PC)"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: "1: Normal (4:3), 2: Wide (16:9), 3: Horizon, 4: Zoom1, 5: Zoom2, 6: Original, 7: 14:9, 8: Full, 9: 1:1 (PC)"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0: Off (Picture on), 1: On (Picture off)"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0: Mute On, 1: Mute Off"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "00H-64H, 0=Step0, 64=Step100"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "00H-64H"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "00H-64H"

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "00H-64H (Video only)"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      min: -50
      max: 50
      description: "00H=Red(-50) to 64H=Green(+50) (Video only)"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "00H-64H (Video only)"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0: OSD Off, 1: OSD On"

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0: Off, 1: On"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      min: -50
      max: 50
      description: "00H=L50 to 64H=R50"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: "0: Normal, 1: Cool, 2: Warm, 3: User"

- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1: Inversion, 2: Orbiter, 4: White Wash, 8: Normal"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: set
      type: integer
      description: "1: Execute (RGB(PC) mode only)"

- id: key
  label: Send IR Key Code
  kind: action
  params:
    - name: keycode
      type: string
      description: "Hex key code from IR code table"

- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "00: Off, 12-44: column x row modes (1x2 to 4x4)"

- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      min: 0
      max: 100

- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      min: 0
      max: 100

- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      min: 0
      max: 16
      description: "00H-10H"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [0, 1]
  description: "0: Off, 1: On"

- id: abnormal_state
  label: Abnormal State
  type: integer
  description: "0: Normal, 1: No signal, 2: Remote off, 3: Sleep off, 4: RS-232C off, 6: AC down, 8: Off time, 9: Auto off"

- id: elapsed_time
  label: Elapsed Time
  type: integer
  description: "Hours used (hexadecimal)"

- id: temperature_value
  label: Temperature Value
  type: integer
  description: "Internal temperature (hexadecimal)"

- id: lamp_fault
  label: Lamp Fault
  type: enum
  values: [0, 1]
  description: "0: Lamp Fault, 1: Lamp OK"
```

## Variables
```yaml
# All settable levelable parameters (contrast, brightness, volume, etc.)
# are modeled as Actions above. No additional Variables section required.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D.

Query mode: send `FF` as data to read current value.

Broadcast mode: Set ID `0` controls all devices simultaneously but ACK responses cannot be reliably checked.

<!-- UNRESOLVED: Tile H/V size ranges not explicitly stated in source, min/max inferred from 00H-64H -->
<!-- UNRESOLVED: Tile ID Set range stated as 00H-10H (0-16 decimal) -->
<!-- UNRESOLVED: Firmware version compatibility not stated -->
<!-- UNRESOLVED: Error codes beyond NG not detailed -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:01:18.729Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:01:18.729Z
matched_actions: 22
action_count: 22
confidence: high
summary: "All 22 spec actions matched source commands literally; transport parameters verified; extra query-command variants are feedback mechanisms already represented."
```

## Known Gaps

```yaml
- kz
- dl
- dn
- dp
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
