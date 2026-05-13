---
spec_id: admin/lg_electronics-m4210c_north_america
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG Electronics M4210C (North America) Control Spec"
manufacturer: "LG Electronics"
model_family: "M4210C (North America)"
aliases: []
compatible_with:
  manufacturers:
    - "LG Electronics"
  models:
    - "M4210C (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - gscs-b2c.lge.com
  - lg.com
retrieved_at: 2026-05-04T23:49:31.345Z
last_checked_at: 2026-05-05T05:41:27.583Z
generated_at: 2026-05-05T05:41:27.583Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - elapsed_time_return
  - temperature_value
  - lamp_fault_check
verification:
  verdict: verified
  checked_at: 2026-05-05T05:41:27.583Z
  matched_actions: 23
  action_count: 23
  confidence: high
  summary: "All 23 spec actions matched source commands; transport parameters verified; 3 read-only query commands are documented in source but listed in spec Feedbacks."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-05
---

# LG Electronics M4210C (North America) Control Spec

## Summary
LG M4210C commercial LCD display (42-inch class). Controlled via RS-232C serial protocol using ASCII command strings. Supports power, input selection, picture adjustment, audio adjustment, tile mode for multi-display wall setups, and query commands returning device status. No IP, HTTP, or network control documented.

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
  type: none
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
      description: "0 = Off, 1 = On"
- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: "2=AV, 4=Component1, 5=Component2, 6=RGB(DTV), 7=RGB(PC), 8=HDMI(DTV), 9=HDMI(PC)"
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=Normal(4:3), 2=Wide(16:9), 3=Horizon, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full, 9=1:1(PC)"
- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Mute On, 1=Mute Off"
- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H-64H (0-100)"
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H-64H (0-100)"
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H-64H (0-100)"
- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H-64H (0-100) (Video only)"
- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: "00H=Red50 to 64H=Green50 (Video only)"
- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "Range 00H-64H (0-100) (Video only)"
- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
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
      description: "00H=L50 to 64H=R50"
- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=Cool, 2=Warm, 3=User"
- id: abnormal_state
  label: Abnormal State
  kind: action
  params:
    - name: data
      type: integer
      description: "FF=Read status. Returns: 0=Normal, 1=No signal, 2=Off by RC, 3=Off by sleep, 4=Off by RS-232C, 6=AC down, 8=Off by off time, 9=Off by auto off"
- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=Inversion, 2=Orbiter, 3=Orb.+Inv., 4=White Wash, 8=Normal"
- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: state
      type: integer
      description: "1=Set (works only in RGB(PC) mode)"
- id: key
  label: Key
  kind: action
  params:
    - name: keycode
      type: string
      description: "IR remote key code (hex). See IR code table."
- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Off, 12=1x2, 13=1x3, 14=1x4 ... 44=4x4. Cannot be 0X or X0 except 00."
- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      description: "00H-64H horizontal tile size"
- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      description: "00H-64H vertical tile size"
- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      description: "00H-10H tile ID assignment"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - "0"
    - "1"
  description: "Power state. Read by transmitting FF as data."
- id: input_state
  type: enum
  values:
    - "2"
    - "4"
    - "5"
    - "6"
    - "7"
    - "8"
    - "9"
  description: "Current input. Read by transmitting FF as data."
- id: volume_mute_state
  type: enum
  values:
    - "0"
    - "1"
  description: "Volume mute state. Read by transmitting FF as data."
- id: aspect_ratio_state
  type: enum
  values:
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
    - "7"
    - "8"
    - "9"
  description: "Current aspect ratio. Read by transmitting FF as data."
- id: abnormal_state
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "6"
    - "8"
    - "9"
  description: "Abnormal state read. 0=Normal, 1=No signal, 2=Off by RC, 3=Off by sleep, 4=Off by RS-232C, 6=AC down, 8=Off by off time, 9=Off by auto off"
- id: elapsed_time
  type: hex
  description: "Elapsed operating hours. Read via elapsed time return command."
- id: temperature_value
  type: hex
  description: "Internal temperature in Celsius. 1-byte hex value."
- id: lamp_fault
  type: enum
  values:
    - "0"
    - "1"
  description: "Lamp status. 0=Lamp Fault, 1=Lamp OK"
- id: ack_ok
  type: string
  description: "OK acknowledgement format: [Command2][ ][Set ID][ ][OK][Data][x]"
- id: ack_ng
  type: string
  description: "NG acknowledgement format: [Command2][ ][Set ID][ ][NG][Data][x]"
```

## Variables
```yaml
- id: contrast_var
  label: Contrast
  type: range
  min: 0
  max: 100
- id: brightness_var
  label: Brightness
  type: range
  min: 0
  max: 100
- id: color_var
  label: Color
  type: range
  min: 0
  max: 100
- id: tint_var
  label: Tint
  type: range
  min: -50
  max: 50
- id: sharpness_var
  label: Sharpness
  type: range
  min: 0
  max: 100
- id: volume_var
  label: Volume
  type: range
  min: 0
  max: 100
- id: balance_var
  label: Balance
  type: range
  min: -50
  max: 50
- id: tile_mode_var
  label: Tile Mode
  type: integer
- id: tile_h_size_var
  label: Tile H Size
  type: integer
- id: tile_v_size_var
  label: Tile V Size
  type: integer
- id: tile_id_var
  label: Tile ID
  type: integer
```

## Events
```yaml
```

## Macros
```yaml
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: tile_id_constraint
    description: "Tile mode data cannot be set to 0X or X0 except 00. This prevents invalid tile configurations."
  - id: multi_product_ack_caveat
    description: "When controlling multiple products simultaneously using Set ID 0, do not check ACK messages because all sets will respond, making it impossible to verify individual acknowledgements."
  - id: auto_config_rgb_only
    description: "Auto Configure command works only in RGB(PC) input mode."
```

## Notes
Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Command1 is j, k, m, or d. Set ID range 1-99. Transmit FF to read current status. Cr = 0x0D carriage return. Space = 0x20. All data in hexadecimal ASCII. Real data mapping for level commands: 00H=Step0, 0AH=Step10, 0FH=Step15, 64H=Step100. Lamp fault check returns 0 for fault, 1 for OK. IR codes table included for completeness but IR remote control is out of scope for serial control protocol.
<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: no TCP/IP, HTTP, or network control documented — serial only -->
<!-- UNRESOLVED: no authentication mechanism documented — none stated or implied -->
<!-- UNRESOLVED: Tile H/V size ranges beyond 00H-64H not specified in source -->
<!-- UNRESOLVED: IR key code table (page A18 reference) not included — only partial table present in source -->

## Provenance

```yaml
source_domains:
  - gscs-b2c.lge.com
  - lg.com
retrieved_at: 2026-05-04T23:49:31.345Z
last_checked_at: 2026-05-05T05:41:27.583Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-05T05:41:27.583Z
matched_actions: 23
action_count: 23
confidence: high
summary: "All 23 spec actions matched source commands; transport parameters verified; 3 read-only query commands are documented in source but listed in spec Feedbacks."
```

## Known Gaps

```yaml
- elapsed_time_return
- temperature_value
- lamp_fault_check
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
