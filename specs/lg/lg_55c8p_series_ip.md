---
spec_id: admin/lg-55c8p-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55C8P Series Control Spec"
manufacturer: LG
model_family: "55C8P Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "55C8P Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:03:54.453Z
generated_at: 2026-04-25T21:03:54.453Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:03:54.453Z
  matched_actions: 22
  action_count: 22
  confidence: high
  summary: "All 22 spec actions matched verbatim to source commands; transport parameters confirmed; callable command set fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 55C8P Series Control Spec

## Summary
LG consumer TV supporting RS-232 (UART) control at 9600 baud, 8N1. ASCII command protocol with two-character command codes (Command1 + Command2), Set ID targeting (1-99 or broadcast 0), and hex data payloads. Supports power, input routing, picture adjustment, audio, tiling/wall display, and diagnostic queries.

<!-- UNRESOLVED: TCP/IP transport not confirmed in source despite file path reference; source documents RS-232 only. No IP port stated. -->

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
    - name: mode
      type: integer
      description: 1=Normal(4:3), 2=Wide(16:9), 3=Horizon, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full, 9=1:1(PC)
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
      description: 0x00-0x64 (0-100 decimal)
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: 0x00-0x64 (0-100 decimal)
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 0x00-0x64 (0-100 decimal)
- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: 0x00-0x64 (0-100 decimal)
- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: 0x00-0x64 (Red=-50 to Green=+50)
- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: 0x00-0x64 (0-100 decimal)
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
      description: 0x00-0x64 (L50-R50)
- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Normal, 1=Cool, 2=Warm, 3=User
- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Inversion, 2=Orbiter, 4=White Wash, 8=Normal
- id: auto_config
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      description: 1=Set (RGB PC mode only)
- id: key
  label: Key (IR Remote Code)
  kind: action
  params:
    - name: keycode
      type: string
      description: Hex key code from IR code table
- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 00=Off, 12-44=ColumnxRow modes (e.g., 12=1x2, 44=4x4)
- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      description: 0x00-0x64 horizontal size
- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      description: 0x00-0x64 vertical size
- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      description: 0x00-0x10 tile ID
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - 0
    - 1
  description: 0=Off, 1=On
- id: input_state
  label: Input State
  type: enum
  values:
    - 2
    - 4
    - 5
    - 6
    - 7
    - 8
    - 9
  description: 2=AV, 4=Component1, 5=Component2, 6=RGB(DTV), 7=RGB(PC), 8=HDMI(DTV), 9=HDMI(PC)
- id: abnormal_state
  label: Abnormal State
  type: enum
  values:
    - 0
    - 1
    - 2
    - 3
    - 4
    - 6
    - 8
    - 9
  description: 0=Normal, 1=No signal, 2=Off by remote, 3=Off by sleep, 4=Off by RS-232C, 6=AC down, 8=Off by off timer, 9=Off by auto off
- id: elapsed_time
  label: Elapsed Time
  type: integer
  description: Used hours (hex, read with FF)
- id: temperature_value
  label: Temperature Value
  type: integer
  description: Internal temperature in hex (1 byte)
- id: lamp_fault
  label: Lamp Fault
  type: enum
  values:
    - 0
    - 1
  description: 0=Lamp Fault, 1=Lamp OK
- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values:
    - 0
    - 1
  description: 0=Mute On, 1=Mute Off
```

## Variables
```yaml
# No standalone settable variables separate from Actions; all parameters are action-based.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Tile mode data cannot be set to 0X or X0 except 00
  - Auto Configure works only in RGB(PC) mode
  - Broadcast (Set ID 0) disables ACK checking since all devices reply
```

## Notes

Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D, Space = 0x20.

Read mode: send `FF` in data field to query current value. ACK returns `[Command2][ ][Set ID][ ][OK/NG][Data][x]`.

Set ID range: 1-99; use 0 for broadcast (all devices) — ACK checking disabled in broadcast mode.

<!-- UNRESOLVED: TCP/IP port number not stated in source despite "ip" filename marker -->
<!-- UNRESOLVED: IR remote control codes table (page A18 reference) not included in full -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:03:54.453Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:03:54.453Z
matched_actions: 22
action_count: 22
confidence: high
summary: "All 22 spec actions matched verbatim to source commands; transport parameters confirmed; callable command set fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
