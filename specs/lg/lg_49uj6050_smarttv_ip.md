---
schema_version: ai4av-public-spec-v1
device_id: lg/49uj6050
entity_id: lg_49uj6050_smarttv
spec_id: admin/lg-49uj6050
revision: 1
author: admin
title: "LG 49UJ6050 Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 49UJ6050
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49UJ6050
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_49uj6050_smarttv_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:59:49.779Z
retrieved_at: 2026-04-25T20:59:49.779Z
last_checked_at: 2026-04-25T20:59:49.779Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:59:49.779Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec actions matched literally in source; all transport parameters verified against LG 49UJ6050 programmer guide."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49UJ6050 Control Spec

## Summary
LG 49UJ6050 Smart TV. Control via RS-232C serial (UART) protocol using ASCII command strings. No authentication required.

<!-- UNRESOLVED: IP/TCP control path not described in source — only RS-232C documented -->

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
- powerable  # inferred: power on/off command (k a) documented
- routable    # inferred: input select command (k b) documented
- levelable   # inferred: volume, contrast, brightness, color, tint, sharpness, balance commands documented
- queryable   # inferred: read commands using FF data value documented
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 1 = On, FF = Read
  protocol_hints:
    command: "k a"
    format: "[k][a][ ][Set ID][ ][Data][Cr]"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: integer
      description: 2=AV, 4=Component1, 5=Component2, 6=RGB-DTV, 7=RGB-PC, 8=HDMI-DTV, 9=HDMI-PC
  protocol_hints:
    command: "k b"
    format: "[k][b][ ][Set ID][ ][Data][Cr]"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=4:3, 2=16:9, 3=Horizon, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full, 9=1:1(PC)
  protocol_hints:
    command: "k c"
    format: "[k][c][ ][Set ID][ ][Data][Cr]"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
  protocol_hints:
    command: "k d"
    format: "[k][d][ ][Set ID][ ][Data][Cr]"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Mute On, 1=Mute Off
  protocol_hints:
    command: "k e"
    format: "[k][e][ ][Set ID][ ][Data][Cr]"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100)
  protocol_hints:
    command: "k f"
    format: "[k][f][ ][Set ID][ ][Data][Cr]"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100)
  protocol_hints:
    command: "k g"
    format: "[k][g][ ][Set ID][ ][Data][Cr]"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100)
  protocol_hints:
    command: "k h"
    format: "[k][h][ ][Set ID][ ][Data][Cr]"

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100)
  protocol_hints:
    command: "k i"
    format: "[k][i][ ][Set ID][ ][Data][Cr]"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: 00H=Red50, 64H=Green50
  protocol_hints:
    command: "k j"
    format: "[k][j][ ][Set ID][ ][Data][Cr]"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100)
  protocol_hints:
    command: "k k"
    format: "[k][k][ ][Set ID][ ][Data][Cr]"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
  protocol_hints:
    command: "k l"
    format: "[k][l][ ][Set ID][ ][Data][Cr]"

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
  protocol_hints:
    command: "k m"
    format: "[k][m][ ][Set ID][ ][Data][Cr]"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: 00H=L50, 64H=R50
  protocol_hints:
    command: "k t"
    format: "[k][t][ ][Set ID][ ][Data][Cr]"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Normal, 1=Cool, 2=Warm, 3=User
  protocol_hints:
    command: "k u"
    format: "[k][u][ ][Set ID][ ][Data][Cr]"

- id: abnormal_state
  label: Abnormal State Read
  kind: action
  params: []
  protocol_hints:
    command: "k z"
    format: "[k][z][ ][Set ID][ ][FF][Cr]"
    description: Read power off status. Returns: 0=Normal, 1=No signal, 2=Off-RC, 3=Off-Sleep, 4=Off-RS232C, 6=AC down, 8=Off-Timer, 9=Off-Auto

- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Inversion, 2=Orbiter, 4=White Wash, 8=Normal
  protocol_hints:
    command: "j p"
    format: "[j][p][ ][Set ID][ ][Data][Cr]"

- id: auto_configure
  label: Auto Configure
  kind: action
  params: []
  protocol_hints:
    command: "j u"
    format: "[j][u][ ][Set ID][ ][01][Cr]"
    description: Adjust picture position automatically. Works only in RGB(PC) mode.

- id: key
  label: Send IR Key Code
  kind: action
  params:
    - name: key_code
      type: hex
      description: Hex key code from IR code table
  protocol_hints:
    command: "m c"
    format: "[m][c][ ][Set ID][ ][Data][Cr]"

- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: hex
      description: "00=Off, 12=1x2, 13=1x3, 14=1x4 ... 44=4x4"
  protocol_hints:
    command: "d d"
    format: "[d][d][ ][Set ID][ ][Data][x]"

- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      description: 00H-64H
  protocol_hints:
    command: "d g"
    format: "[d][g][ ][Set ID][ ][Data][x]"

- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      description: 00H-64H
  protocol_hints:
    command: "d h"
    format: "[d][h][ ][Set ID][ ][Data][x]"

- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: hex
      description: 00H-10H
  protocol_hints:
    command: "d i"
    format: "[d][i][ ][Set ID][ ][Data][x]"

- id: elapsed_time_return
  label: Elapsed Time Return
  kind: action
  params: []
  protocol_hints:
    command: "d l"
    format: "[d][l][ ][Set ID][ ][FF][x]"
    description: Read used hours (hex)

- id: temperature_value
  label: Temperature Value
  kind: action
  params: []
  protocol_hints:
    command: "d n"
    format: "[d][n][ ][Set ID][ ][FF][x]"
    description: Read internal temperature (1 byte hex)

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: action
  params: []
  protocol_hints:
    command: "d p"
    format: "[d][p][ ][Set ID][ ][FF][x]"
    description: Returns 0=Lamp Fault, 1=Lamp OK
```

## Feedbacks
```yaml
- id: ok_ack
  label: OK Acknowledgement
  type: pattern
  pattern: "[Command2][ ][Set ID][ ][OK][Data][x]"
  description: Returned on successful command

- id: ng_ack
  label: Error Acknowledgement
  type: pattern
  pattern: "[Command2][ ][Set ID][ ][NG][Data][x]"
  description: Returned on error

- id: power_state
  label: Power State
  type: enum
  values: [off, on]
  query_command: "k a FF"
  query_pattern: "[k][a][ ][Set ID][ ][OK][Data][x]"

- id: abnormal_state_value
  label: Abnormal State Value
  type: enum
  values: [0_normal, 1_no_signal, 2_off_rc, 3_off_sleep, 4_off_rs232c, 6_ac_down, 8_off_timer, 9_off_auto]

- id: elapsed_time_value
  label: Elapsed Time
  type: integer
  query_command: "d l FF"
  unit: hours

- id: temperature_value_read
  label: Temperature Value
  type: integer
  query_command: "d n FF"
  unit: unspecified

- id: lamp_fault_value
  label: Lamp Fault
  type: enum
  values: [fault, ok]
  query_command: "d p FF"
```

## Variables
```yaml
# UNRESOLVED: no discrete variable parameters documented separately from actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D, Space = 0x20.

Set ID range: 1-99. Set ID 0 broadcasts to all devices (ACK handling not reliable for broadcast).

Read mode: transmit `FF` as Data to read current value.

ACK format: `[Command2][ ][Set ID][ ][OK/NG][Data][x]`

Tile mode data format uses `[x]` terminator instead of `[Cr]`.

IR codes included for reference (wired remote control interface). Discrete IR codes (C4=Power On, C5=Power Off, etc.) available for one-way control.
<!-- UNRESOLVED: TCP/IP control path not present in source — this spec covers RS-232C only -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: port number (COM1, etc.) not specified in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_49uj6050_smarttv_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:59:49.779Z
retrieved_at: 2026-04-25T20:59:49.779Z
last_checked_at: 2026-04-25T20:59:49.779Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:59:49.779Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec actions matched literally in source; all transport parameters verified against LG 49UJ6050 programmer guide."
```

## Known Gaps

```yaml
[]
```
