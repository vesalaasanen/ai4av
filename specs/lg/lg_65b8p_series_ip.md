---
schema_version: ai4av-public-spec-v1
device_id: lg/65b8p-series
entity_id: lg_65b8p_series
spec_id: admin/lg-65b8p-series
revision: 1
author: admin
title: "LG 65B8P Series Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: "65B8P Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "65B8P Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_65b8p_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:06:23.313Z
retrieved_at: 2026-04-25T21:06:23.313Z
last_checked_at: 2026-04-25T21:06:23.313Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps:
  - "abnormal_state (k z)"
  - "elapsed_time (d l)"
  - "temperature_value (d n)"
  - "lamp_fault (d p)"
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:06:23.313Z
  matched_actions: 22
  action_count: 22
  confidence: high
  summary: "All 22 spec actions match source commands; transport parameters confirmed verbatim; 4 query commands represented as Feedbacks not Actions."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 65B8P Series Control Spec

## Summary
LG consumer television supporting RS-232 serial control at 9600 baud. Supports power control, input selection, video/audio adjustments, query commands for elapsed time, temperature, and lamp status, and tiled display configuration. Communication uses ASCII command format with carriage-return terminator and OK/NG acknowledgement protocol.

<!-- UNRESOLVED: TCP/IP control path not confirmed in source; source shows only RS-232/UART parameters -->

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
# inferred from command examples
- powerable
- routable
- levelable
- queryable
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
  feedback:
    type: enum
    values: [0, 1]

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: 2 = AV, 4 = Component 1, 5 = Component 2, 6 = RGB (DTV), 7 = RGB (PC), 8 = HDMI (DTV), 9 = HDMI (PC)

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: 1 = Normal (4:3), 2 = Wide (16:9), 3 = Horizon, 4 = Zoom1, 5 = Zoom2, 6 = Original, 7 = 14:9, 8 = Full, 9 = 1:1 (PC)

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off (Picture on), 1 = On (Picture off)

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Mute On, 1 = Mute Off

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 decimal); real mapping 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 decimal); real mapping same as volume

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 decimal)

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 decimal)

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (Red=-50 to Green=+50); real mapping 0=Step-50, 64=Step50

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 decimal)

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = OSD Off, 1 = OSD On

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 1 = On

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (L50 to R50)

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: 0 = Normal, 1 = Cool, 2 = Warm, 3 = User

- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1 = Inversion, 2 = Orbiter, 4 = White Wash, 8 = Normal

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      description: 1 = Set (works only in RGB(PC) mode)

- id: key
  label: Key
  kind: action
  params:
    - name: key_code
      type: string
      description: IR key code from Remote Control IR Code table

- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 00 = Off, 12 = 1x2, 13 = 1x3, 14 = 1x4 ... 44 = 4x4

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
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [0, 1]
  description: 0 = Power Off, 1 = Power On

- id: abnormal_state
  type: enum
  values: [0, 1, 2, 3, 4, 6, 8, 9]
  description: 0 = Normal, 1 = No signal, 2 = Remote off, 3 = Sleep off, 4 = RS-232C off, 6 = AC down, 8 = Timer off, 9 = Auto off

- id: elapsed_time
  type: integer
  description: Elapsed time in hours (Hex)

- id: temperature_value
  type: integer
  description: Internal temperature (1 byte Hex)

- id: lamp_fault
  type: enum
  values: [0, 1]
  description: 0 = Lamp Fault, 1 = Lamp OK

- id: ack_ok
  type: string
  description: OK acknowledgement format: [Command2][Set ID][OK][Data][x]

- id: ack_ng
  type: string
  description: NG acknowledgement format: [Command2][Set ID][NG][Data][x]
```

## Variables
```yaml
# All parameters above are settable via Actions.
# No separate Variables section required for this device.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Command1 = j/k/m/d, Cr = 0x0D carriage return. Set ID range 1-99; use 0 to broadcast to all devices (but ACK will conflict). Read mode: send FF as data. Tile commands use `[x]` terminator instead of `[Cr]`. Volume/Contrast/Brightness/Color/Sharpness use hex mapping where 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100. Tint uses offset mapping where 0=Step-50, 64=Step+50.
<!-- UNRESOLVED: TCP/IP control path not present in source material -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_65b8p_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:06:23.313Z
retrieved_at: 2026-04-25T21:06:23.313Z
last_checked_at: 2026-04-25T21:06:23.313Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:06:23.313Z
matched_actions: 22
action_count: 22
confidence: high
summary: "All 22 spec actions match source commands; transport parameters confirmed verbatim; 4 query commands represented as Feedbacks not Actions."
```

## Known Gaps

```yaml
- "abnormal_state (k z)"
- "elapsed_time (d l)"
- "temperature_value (d n)"
- "lamp_fault (d p)"
```
