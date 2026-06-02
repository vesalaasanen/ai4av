---
spec_id: admin/lg-50qned75ura
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
  - justaddpower.com
  - justaddpower.happyfox.com
  - gscs-b2c.lge.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
  - "https://gscs-b2c.lge.com/downloadFile?fileId=9zWKGeMAX3TQzc4LFccwg"
retrieved_at: 2026-06-02T22:09:08.457Z
last_checked_at: 2026-06-02T22:09:08.457Z
generated_at: 2026-06-02T22:09:08.457Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IR remote control codes are documented but out of scope for serial control spec"
  - "no standalone settable parameters beyond discrete actions"
  - "no unsolicited event notifications documented"
  - "no explicit multi-step sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "port number (RS-232C DB-9 or 3.5mm jack) not specified in source"
  - "command timing requirements not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:09:08.457Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 50QNED75URA Control Spec

## Summary
LG 50QNED75URA quantum dot LED TV supporting RS-232C serial control. All commands are ASCII-formatted with carriage-delimited protocol. Supports power, input routing, picture adjustment, audio control, and diagnostic queries via a Set ID (1–99) targeting mechanism.

<!-- UNRESOLVED: IR remote control codes are documented but out of scope for serial control spec -->

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
- routable        # inferred: input select command present (k b)
- queryable       # inferred: read commands present (power status, elapsed time, temperature, lamp fault)
- levelable       # inferred: volume, brightness, contrast, color, tint, sharpness, balance controls present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0: Power Off, 1: Power On"
  command: "k a"
  command_format: "[k][a][ ][Set ID][ ][Data][Cr]"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: "2: AV, 4: Component 1, 5: Component 2, 6: RGB (DTV), 7: RGB (PC), 8: HDMI (DTV), 9: HDMI (PC)"
  command: "k b"
  command_format: "[k][b][ ][Set ID][ ][Data][Cr]"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "1: 4:3, 2: 16:9, 3: Horizon, 4: Zoom1, 5: Zoom2, 6: Original, 7: 14:9, 8: Full (Europe), 9: 1:1 (PC)"
  command: "k c"
  command_format: "[k][c][ ][Set ID][ ][Data][Cr]"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0: Off (Picture on), 1: On (Picture off)"
  command: "k d"
  command_format: "[k][d][ ][Set ID][ ][Data][Cr]"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0: Mute On, 1: Mute Off"
  command: "k e"
  command_format: "[k][e][ ][Set ID][ ][Data][Cr]"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: "k f"
  command_format: "[k][f][ ][Set ID][ ][Data][Cr]"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: "k g"
  command_format: "[k][g][ ][Set ID][ ][Data][Cr]"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: "k h"
  command_format: "[k][h][ ][Set ID][ ][Data][Cr]"

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: "k i"
  command_format: "[k][i][ ][Set ID][ ][Data][Cr]"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (Red–Green, 0=Step-50, 64=Step50)"
  command: "k j"
  command_format: "[k][j][ ][Set ID][ ][Data][Cr]"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"
  command: "k k"
  command_format: "[k][k][ ][Set ID][ ][Data][Cr]"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: "0: OSD Off, 1: OSD On"
  command: "k l"
  command_format: "[k][l][ ][Set ID][ ][Data][Cr]"

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0: Off, 1: On"
  command: "k m"
  command_format: "[k][m][ ][Set ID][ ][Data][Cr]"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (L50–R50)"
  command: "k t"
  command_format: "[k][t][ ][Set ID][ ][Data][Cr]"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: Normal, 1: Cool, 2: Warm, 3: User"
  command: "k u"
  command_format: "[k][u][ ][Set ID][ ][Data][Cr]"

- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1: Inversion, 2: Orbiter, 4: White Wash, 8: Normal"
  command: "j p"
  command_format: "[j][p][ ][Set ID][ ][Data][Cr]"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: setting
      type: integer
      description: "1: To set (works only in RGB(PC) mode)"
  command: "j u"
  command_format: "[j][u][ ][Set ID][ ][Data][Cr]"

- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "00: Off, 12: 1x2, 13: 1x3, 14: 1x4, ... 44: 4x4. Data cannot be 0X or X0 except 00."
  command: "d d"
  command_format: "[d][d][ ][Set ID][ ][Data][x]"

- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      description: "Range: 00H–64H"
  command: "d g"
  command_format: "[d][g][ ][Set ID][ ][Data][x]"

- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      description: "Range: 00H–64H"
  command: "d h"
  command_format: "[d][h][ ][Set ID][ ][Data][x]"

- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      description: "Range: 00H–10H"
  command: "d i"
  command_format: "[d][i][ ][Set ID][ ][Data][x]"

- id: key
  label: Key (IR Remote Code)
  kind: action
  params:
    - name: keycode
      type: integer
      description: "IR key code (Hex). See IR code table for values."
  command: "m c"
  command_format: "[m][c][ ][Set ID][ ][Data][Cr]"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  query_command: "k a"
  query_format: "[k][a][ ][Set ID][ ][FF][Cr]"
  response_format: "[k][a][ ][Set ID][ ][OK][Data][x]"

- id: abnormal_state
  type: enum
  values:
    - 0: Normal (Power on and signal exist)
    - 1: No signal (Power on)
    - 2: Turned off by remote control
    - 3: Turned off by sleep time function
    - 4: Turned off by RS-232C function
    - 6: AC down
    - 8: Turned off by off time function
    - 9: Turned off by auto off function
  query_command: "k z"
  response_format: "[k][z][ ][Set ID][ ][OK][Data][x]"

- id: elapsed_time
  type: integer
  description: "Elapsed operating hours (hexadecimal)"
  query_command: "d l"
  query_format: "[d][l][ ][Set ID][ ][FF][x]"
  response_format: "[d][l][ ][Set ID][ ][OK][Data][x]"

- id: temperature_value
  type: integer
  description: "Internal temperature in hexadecimal (1 byte)"
  query_command: "d n"
  query_format: "[d][n][ ][Set ID][ ][FF][x]"
  response_format: "[d][n][ ][Set ID][ ][OK][Data][x]"

- id: lamp_fault
  type: enum
  values:
    - 0: Lamp Fault
    - 1: Lamp OK
  query_command: "d p"
  query_format: "[d][p][ ][Set ID][ ][FF][x]"
  response_format: "[d][p][ ][Set ID][ ][OK][Data][x]"

- id: ack_ok
  type: string
  description: "OK Acknowledgement"
  response_format: "[Command2][ ][Set ID][ ][OK][Data][x]"

- id: ack_ng
  type: string
  description: "Error Acknowledgement"
  response_format: "[Command2][ ][Set ID][ ][NG][Data][x]"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command protocol format: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = ASCII carriage return (0x0D).

Set ID range: 1–99. Set ID 0 broadcasts to all devices but ACK responses are not checkable (all devices respond simultaneously).

Read mode: transmit `FF` in data field to query current value.

OK Acknowledgement: `[Command2][ ][Set ID][ ][OK][Data][x]` — returned on successful command.
NG Acknowledgement: `[Command2][ ][Set ID][ ][NG][Data][x]` — returned on error.

The Tile Mode data format uses `x` terminator instead of `Cr` (no carriage return).

IR codes are documented for wired remote control but are out of scope for the RS-232C serial control protocol.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: port number (RS-232C DB-9 or 3.5mm jack) not specified in source -->
<!-- UNRESOLVED: command timing requirements not stated in source -->

## Provenance

```yaml
source_domains:
  - justaddpower.com
  - justaddpower.happyfox.com
  - gscs-b2c.lge.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
  - "https://gscs-b2c.lge.com/downloadFile?fileId=9zWKGeMAX3TQzc4LFccwg"
retrieved_at: 2026-06-02T22:09:08.457Z
last_checked_at: 2026-06-02T22:09:08.457Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:09:08.457Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IR remote control codes are documented but out of scope for serial control spec"
- "no standalone settable parameters beyond discrete actions"
- "no unsolicited event notifications documented"
- "no explicit multi-step sequences documented"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "port number (RS-232C DB-9 or 3.5mm jack) not specified in source"
- "command timing requirements not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
