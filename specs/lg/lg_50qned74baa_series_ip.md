---
spec_id: admin/lg-50qned74baa-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50QNED74BAA Series Control Spec"
manufacturer: LG
model_family: 50QNED74BAA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50QNED74BAA
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
  - https://webostv.developer.lge.com/develop/references/tv-device-information
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
retrieved_at: 2026-06-02T17:22:58.572Z
last_checked_at: 2026-06-02T17:22:58.572Z
generated_at: 2026-06-02T17:22:58.572Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic LG RS-232 protocol reference; explicit applicability to the 50QNED74BAA model is not stated in the source."
  - "no discrete settable parameters beyond the per-action data fields are documented in the source."
  - "no unsolicited notification mechanism is described in the source."
  - "no multi-step sequences are described in the source."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements are documented in the source."
  - "source is a generic LG RS-232 protocol reference; explicit mapping to the 50QNED74BAA model is not stated in the source."
  - "firmware version compatibility not stated in source."
  - "voltage, current, or power-consumption specifications not stated in source."
  - "fault behavior / error-recovery sequences not stated in source."
  - "tile-mode value `11` (1×1) is not explicitly listed in the source table; only 00 and the 12-44 grid are documented."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:58.572Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched literally to source reference list with correct data ranges; transport parameters verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 50QNED74BAA Series Control Spec

## Summary
The LG 50QNED74BAA Series is a commercial flat-panel display controllable over an RS-232 (UART) serial interface at 9600 baud, 8N1, ASCII. This spec enumerates the 26 ASCII command mnemonics the source documents for power, input selection, picture/sound/tile configuration, and device-state queries.

<!-- UNRESOLVED: source is a generic LG RS-232 protocol reference; explicit applicability to the 50QNED74BAA model is not stated in the source. -->

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
  communication_code: ASCII
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from k a (power) command examples
- routable    # inferred from k b (input select) command examples
- queryable   # inferred from FF-read status queries (k a, k z, d l, d n, d p)
- levelable   # inferred from k f/k g/k h/k i/k j/k k/k t (volume, contrast, brightness, color, tint, sharpness, balance) command examples
```

## Actions
```yaml
- id: power_set
  label: Power Set
  kind: action
  command: "ka {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0 = broadcast to all products, 1-99 = specific product)
    - name: data
      type: integer
      enum: [0, 1]
      description: Power state (0 = Power Off, 1 = Power On)

- id: power_query
  label: Power Status Query
  kind: query
  command: "ka {id} FF\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)

- id: input_select
  label: Input Select (Main Picture)
  kind: action
  command: "kb {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      enum: [2, 4, 5, 6, 7, 8, 9]
      description: Input source (2=AV, 4=Component 1, 5=Component 2, 6=RGB DTV, 7=RGB PC, 8=HDMI DTV, 9=HDMI PC)

- id: aspect_ratio
  label: Aspect Ratio (Main Picture Format)
  kind: action
  command: "kc {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      description: Aspect ratio (1=Normal 4:3, 2=Wide 16:9, 3=Horizon/Spectacle, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full/Europe, 9=1:1 PC)

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      enum: [0, 1]
      description: Screen mute (0 = picture on, 1 = picture off)

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      enum: [0, 1]
      description: Volume mute (0 = mute on / volume off, 1 = mute off / volume on)

- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      min: 0
      max: 100
      description: Volume step 0-100; transmitted as 2-char hex byte 00H-64H. Real-data mapping: 0x00=Step 0, 0x0A=Step 10, 0x0F=Step 15, 0x10=Step 16, 0x64=Step 100.

- id: contrast
  label: Contrast
  kind: action
  command: "kg {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      min: 0
      max: 100
      description: Contrast step 0-100; transmitted as 2-char hex byte 00H-64H (mapping 0/0x0A/0x0F/0x10/0x64 = Step 0/10/15/16/100)

- id: brightness
  label: Brightness
  kind: action
  command: "kh {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      min: 0
      max: 100
      description: Brightness step 0-100; transmitted as 2-char hex byte 00H-64H (mapping 0/0x0A/0x0F/0x10/0x64 = Step 0/10/15/16/100)

- id: color
  label: Color (Video only)
  kind: action
  command: "ki {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      min: 0
      max: 100
      description: Color step 0-100; transmitted as 2-char hex byte 00H-64H (mapping 0/0x0A/0x0F/0x10/0x64 = Step 0/10/15/16/100; video input only)

- id: tint
  label: Tint (Video only)
  kind: action
  command: "kj {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      min: 0
      max: 100
      description: Tint 0-100; transmitted as 2-char hex byte 00H-64H (0x00=Red -50, 0x64=Green +50; video input only)

- id: sharpness
  label: Sharpness (Video only)
  kind: action
  command: "kk {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      min: 0
      max: 100
      description: Sharpness step 0-100; transmitted as 2-char hex byte 00H-64H (mapping 0/0x0A/0x0F/0x10/0x64 = Step 0/10/15/16/100; video input only)

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      enum: [0, 1]
      description: OSD (0 = OSD Off, 1 = OSD On)

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  command: "km {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      enum: [0, 1]
      description: Lock state (0 = Off, 1 = On; when controlling via RS-232C, also locks the remote control and the local keys)

- id: balance
  label: Balance
  kind: action
  command: "kt {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      min: 0
      max: 100
      description: Balance 0-100; transmitted as 2-char hex byte 00H-64H (0x00=L50, 0x64=R50)

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "ku {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      enum: [0, 1, 2, 3]
      description: Color temperature preset (0 = Normal, 1 = Cool, 2 = Warm, 3 = User)

- id: abnormal_state
  label: Abnormal State Query
  kind: query
  command: "kz {id} FF\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)

- id: ism_mode
  label: ISM Mode (Afterimage Prevention)
  kind: action
  command: "jp {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      enum: [0, 1, 2, 4, 8]
      description: ISM mode (1=Inversion, 2=Orbiter, 4=White Wash, 8=Normal; command reference table lists data range 00H-08H)

- id: auto_config
  label: Auto Configuration
  kind: action
  command: "ju {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      enum: [1]
      description: Trigger (1 = to set; auto-adjusts picture position and minimizes image shaking; works only in RGB(PC) mode)

- id: send_ir_key
  label: Send IR Remote Key Code
  kind: action
  command: "mc {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: string
      description: IR key code as 2-character uppercase hex string (see IR Codes table in Notes)

- id: tile_mode
  label: Tile Mode
  kind: action
  command: "dd {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: string
      enum: ["00", "12", "13", "14", "21", "22", "23", "24", "31", "32", "33", "34", "41", "42", "43", "44"]
      description: Tile mode (00=Tile mode off; otherwise column-row, e.g. 12=1col×2row, 13=1×3, 14=1×4, 21=2×1, 22=2×2, 23=2×3, 24=2×4, 31=3×1, 32=3×2, 33=3×3, 34=3×4, 41=4×1, 42=4×2, 43=4×3, 44=4×4; data of the form 0X or X0 is rejected except 00)

- id: tile_h_size
  label: Tile Horizontal Size
  kind: action
  command: "dg {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      min: 0
      max: 100
      description: Tile H size 0-100; transmitted as 2-char hex byte 00H-64H

- id: tile_v_size
  label: Tile Vertical Size
  kind: action
  command: "dh {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      min: 0
      max: 100
      description: Tile V size 0-100; transmitted as 2-char hex byte 00H-64H

- id: tile_id_set
  label: Tile ID Set
  kind: action
  command: "di {id} {data}\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
    - name: data
      type: integer
      min: 0
      max: 16
      description: Tile ID 0-16; transmitted as 2-char hex byte 00H-10H

- id: elapsed_time
  label: Elapsed Time Return
  kind: query
  command: "dl {id} FF\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)

- id: temperature
  label: Temperature Value
  kind: query
  command: "dn {id} FF\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)

- id: lamp_fault
  label: Lamp Fault Check
  kind: query
  command: "dp {id} FF\r"
  params:
    - name: id
      type: integer
      description: Set ID (0-99)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: Returned by power_query (ka ... FF). Data 0 = Power Off, 1 = Power On.

- id: abnormal_state
  type: enum
  values: [normal, no_signal_power_on, off_by_remote, off_by_sleep_timer, off_by_rs232, ac_down, off_by_off_timer, off_by_auto_off]
  description: Returned by abnormal_state query (kz ... FF). Data 0=Normal (power on and signal exist), 1=No signal (power on), 2=Off by remote control, 3=Off by sleep time function, 4=Off by RS-232C function, 6=AC down, 8=Off by off time function, 9=Off by auto off function.

- id: elapsed_time_hours
  type: integer
  description: Returned by elapsed_time query (dl ... FF). Hex value; represents used hours.

- id: temperature_value
  type: integer
  description: Returned by temperature query (dn ... FF). 1-byte hex inside-temperature reading.

- id: lamp_fault_state
  type: enum
  values: [fault, ok]
  description: Returned by lamp_fault query (dp ... FF). Data 0 = Lamp Fault, 1 = Lamp OK.
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond the per-action data fields are documented in the source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism is described in the source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences are described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements are documented in the source.
```

## Notes

### Command Format

All commands follow this ASCII frame:

```
[Command1][Command2][ ][Set ID][ ][Data][Cr]
```

- `Command1`: first command character — one of `j`, `k`, `m`, `d`.
- `Command2`: second command character (defines the operation).
- `Set ID`: device address. Range `1`–`99`; set `0` to broadcast to all products. When broadcasting to more than one device, do not check the ACK — every device replies and the messages collide.
- `Data`: command data. Transmit `FF` to read current status of any command.
- `Cr`: carriage return, ASCII `0x0D`.
- Inter-field space is ASCII `0x20`.

### OK Acknowledgement

```
[Command2][ ][Set ID][ ][OK][Data][x]
```

In read mode (`Data = FF`), `Data` carries the present status. In write mode, `Data` echoes the value sent by the controller.

### Error Acknowledgement

```
[Command2][ ][Set ID][ ][NG][Data][x]
```

Returned when the command cannot be processed.

### IR Codes (data values for `send_ir_key`)

| Code (Hex) | Function | Note |
|---|---|---|
| 00 | L | R/C Button |
| 01 | M | R/C Button |
| 02 | VOL (−) | R/C Button |
| 03 | VOL (+) | R/C Button |
| 08 | POWER ON/OFF | R/C Button (Power On/Off) |
| C4 | POWER ON | Discrete IR Code (only Power On) |
| C5 | POWER OFF | Discrete IR Code (only Power Off) |
| 09 | MUTE | R/C Button |
| 98 | AV | R/C Button |
| 0B | INPUT | R/C Button |
| 0E | SLEEP | R/C Button |
| 43 | MENU | R/C Button |
| 5B | EXIT | R/C Button |
| 6E | PSM | R/C Button |
| 44 | SET | R/C Button |
| 10 | Number Key 0 | R/C Button |
| 11 | Number Key 1 | R/C Button |
| 12 | Number Key 2 | R/C Button |
| 13 | Number Key 3 | R/C Button |
| 14 | Number Key 4 | R/C Button |
| 15 | Number Key 5 | R/C Button |
| 16 | Number Key 6 | R/C Button |
| 17 | Number Key 7 | R/C Button |
| 18 | Number Key 8 | R/C Button |
| 19 | Number Key 9 | R/C Button |
| 5A | AV | Discrete IR Code (Input AV selection) |
| BF | COMPONENT1 | Discrete IR Code (Input COMPONENT1 selection) |
| D4 | COMPONENT2 | Discrete IR Code (Input COMPONENT2 selection) |
| D5 | RGB PC | Discrete IR Code (Input RGB PC selection) |
| D7 | RGB DTV | Discrete IR Code (Input RGB DTV selection) |
| C6 | HDMI/DVI | Discrete IR Code (Input HDMI/DVI selection) |
| 79 | ARC | R/C Button |
| 76 | ARC (4:3) | Discrete IR Code (only 4:3 mode) |
| 77 | ARC (16:9) | Discrete IR Code (only 16:9 mode) |
| AF | ARC (ZOOM) | Discrete IR Code (only ZOOM1/ZOOM2 mode) |
| 99 | AUTO CONFIG | Discrete IR Code |

### Data byte encoding

For commands with 2-byte data (e.g. `kf` volume, `kg` contrast, `ku`-style 2-byte values), the data is sent as a 2-character uppercase hex string. The "Real data mapping" examples in the source confirm the value is interpreted as a hex byte (e.g. `0x32` = decimal 50). Implementations should convert decimal step values to 2-char uppercase hex before transmission.

### Source / hint observation

The input hint specified "TCP/IP", but the source document exclusively describes an RS-232 (UART) protocol. The Transport section above reflects the source. If the 50QNED74BAA also exposes a separate IP-based control protocol, that protocol would require its own source document.

<!-- UNRESOLVED: source is a generic LG RS-232 protocol reference; explicit mapping to the 50QNED74BAA model is not stated in the source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: voltage, current, or power-consumption specifications not stated in source. -->
<!-- UNRESOLVED: fault behavior / error-recovery sequences not stated in source. -->
<!-- UNRESOLVED: tile-mode value `11` (1×1) is not explicitly listed in the source table; only 00 and the 12-44 grid are documented. -->

## Provenance

```yaml
source_domains:
  - webostv.developer.lge.com
  - justaddpower.com
  - justaddpower.happyfox.com
source_urls:
  - https://webostv.developer.lge.com/develop/references/luna-service-introduction
  - https://webostv.developer.lge.com/develop/references/audio
  - https://webostv.developer.lge.com/develop/references/tv-device-information
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-control/
retrieved_at: 2026-06-02T17:22:58.572Z
last_checked_at: 2026-06-02T17:22:58.572Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:58.572Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched literally to source reference list with correct data ranges; transport parameters verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic LG RS-232 protocol reference; explicit applicability to the 50QNED74BAA model is not stated in the source."
- "no discrete settable parameters beyond the per-action data fields are documented in the source."
- "no unsolicited notification mechanism is described in the source."
- "no multi-step sequences are described in the source."
- "no safety warnings, interlock procedures, or power-on sequencing requirements are documented in the source."
- "source is a generic LG RS-232 protocol reference; explicit mapping to the 50QNED74BAA model is not stated in the source."
- "firmware version compatibility not stated in source."
- "voltage, current, or power-consumption specifications not stated in source."
- "fault behavior / error-recovery sequences not stated in source."
- "tile-mode value `11` (1×1) is not explicitly listed in the source table; only 00 and the 12-44 grid are documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
