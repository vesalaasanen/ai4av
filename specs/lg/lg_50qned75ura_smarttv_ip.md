---
spec_id: admin/lg-50qned75ura-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50QNED75URA Control Spec"
manufacturer: LG
model_family: 50QNED75URA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50QNED75URA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-26T14:29:48.591Z
generated_at: 2026-04-26T14:29:48.591Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T14:29:48.591Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec actions match source commands with correct wire mnemonics, data ranges, and transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 50QNED75URA Control Spec

## Summary
LG commercial TV supporting RS-232C serial control at 9600 baud, 8N1. Commands are ASCII-formatted with Set ID addressing (range 1–99, or 0 for broadcast). No authentication required.

<!-- UNRESOLVED: tile mode and IR code sections apply to video wall deployments; consumer TV use is limited to commands 01–16 -->

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
- powerable      # inferred: power on/off commands documented
- routable       # inferred: input select commands documented
- levelable      # inferred: volume, contrast, brightness, color, tint, sharpness support
- queryable      # inferred: read commands (FF data) present for multiple parameters
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: "2=AV, 4=Component1, 5=Component2, 6=RGB-DTV, 7=RGB-PC, 8=HDMI-DTV, 9=HDMI-PC"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "1=4:3, 2=16:9, 3=Horizon, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full, 9=1:1"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off (picture on), 1=On (picture off)"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Mute on, 1=Mute off"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H–64H (0–100), hex; 0=Step0, 64=Step100"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H–64H (0–100)"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H–64H (0–100)"

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H–64H (0–100)"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H–64H; 00=Red-50, 64=Green+50"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H–64H (0–100)"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OSD Off, 1=OSD On"

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H–64H; L50 at 00, R50 at 64"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=Cool, 2=Warm, 3=User"

- id: abnormal_state
  label: Abnormal State Read
  kind: action
  params:
    - name: read
      type: integer
      const: 255
      description: "Send FF to read; returns 0=Normal, 1=No signal, 2=Off-RC, 3=Off-sleep, 4=Off-RS232C, 6=AC-down, 8=Off-timer, 9=Off-auto"

- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=Inversion, 2=Orbiter, 4=White Wash, 8=Normal"

- id: auto_config
  label: Auto Configure
  kind: action
  params:
    - name: execute
      type: integer
      const: 1
      description: "Send 01 to execute; works in RGB(PC) mode only"

- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Off; 12–44 for column x row configurations (e.g., 12=1x2, 44=4x4)"

- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      description: "Range 00H–64H"

- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      description: "Range 00H–64H"

- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      description: "Range 00H–10H"

- id: key
  label: Send IR Key Code
  kind: action
  params:
    - name: keycode
      type: integer
      description: "Key code value (decimal); see IR code table"
- id: elapsed_time_return
  label: Elapsed Time Return
  kind: query
  params:
    - name: read
      type: integer
      const: 255
      description: "Send FF to read; returns used hours in hexadecimal"

- id: temperature_value_read
  label: Temperature Value Read
  kind: query
  params:
    - name: read
      type: integer
      const: 255
      description: "Send FF to read; returns internal temperature, 1 byte hexadecimal"

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: query
  params:
    - name: read
      type: integer
      const: 255
      description: "Send FF to read; returns 0=Lamp Fault, 1=Lamp OK"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - 0  # Off
    - 1  # On

- id: input_state
  label: Input State
  type: enum
  values:
    - 2   # AV
    - 4   # Component1
    - 5   # Component2
    - 6   # RGB-DTV
    - 7   # RGB-PC
    - 8   # HDMI-DTV
    - 9   # HDMI-PC

- id: abnormal_state_response
  label: Abnormal State
  type: enum
  values:
    - 0   # Normal (power on, signal exists)
    - 1   # No signal (power on)
    - 2   # Turned off by remote control
    - 3   # Turned off by sleep timer
    - 4   # Turned off by RS-232C
    - 6   # AC down
    - 8   # Turned off by off timer
    - 9   # Turned off by auto off function

- id: elapsed_time
  label: Elapsed Time
  type: integer
  description: "Used hours in hexadecimal"

- id: temperature_value
  label: Temperature Value
  type: integer
  description: "Internal temperature, 1 byte hex"

- id: lamp_fault
  label: Lamp Fault
  type: enum
  values:
    - 0   # Lamp fault
    - 1   # Lamp OK
```

## Variables
```yaml
# Level parameters (contrast, brightness, color, tint, sharpness, volume, balance)
# use same 00H–64H range; no separate variables needed — actions cover them.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Tile mode data cannot be set to 0X or X0 except 00
  - Auto configure works only in RGB(PC) mode
  # UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D, space = 0x20
- Set ID range 1–99; 0 = broadcast (no ACK returned)
- Read mode: send `FF` as data value
- ACK format: `[Command2][ ][Set ID][ ][OK/NG][Data][x]`
- Tile mode examples: 12=1x2, 13=1x3, 14=1x4, ... 44=4x4

<!-- UNRESOLVED: TCP/IP protocol not documented in source — serial RS-232C only -->
<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: port number for TCP/IP control not applicable (serial-only protocol documented) -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-26T14:29:48.591Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T14:29:48.591Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec actions match source commands with correct wire mnemonics, data ranges, and transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
