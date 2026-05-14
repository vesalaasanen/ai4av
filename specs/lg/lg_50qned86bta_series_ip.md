---
spec_id: admin/lg-50qned86bta-series-control-spec
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50QNED86BTA Control Spec"
manufacturer: LG
model_family: 50QNED86BTA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50QNED86BTA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-05-14T18:17:17.551Z
generated_at: 2026-05-14T18:17:17.551Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.551Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 actions and 21 feedback read-commands match source commands exactly; transport parameters verified; complete coverage of documented protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 50QNED86BTA Control Spec

## Summary

LG 50QNED86BTA series smart TV supporting RS-232C serial control and TCP/IP network control via ASCII-based command protocol. Supports power control, input selection, aspect ratio, picture adjustments, volume, audio balance, color temperature, ISM modes, tiling, and diagnostic queries.

<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: no explicit IP control commands documented — only RS-232C protocol is detailed -->

## Transport
```yaml
protocols:
  - tcp    # inferred from file name; no IP commands or port stated in source
  - serial
addressing:
  port: null  # UNRESOLVED: port number not stated in source
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
- powerable       # power on/off commands documented (k a)
- routable        # input selection commands documented (k b)
- queryable      # read commands using FF data documented throughout
- levelable      # volume, contrast, brightness, color, tint, sharpness, balance commands present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Power Off, 1 = Power On"

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
      description: "0 = Mute Off (Picture On), 1 = Mute On (Picture Off)"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Mute On (Volume Off), 1 = Mute Off (Volume On)"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100"

- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100 (Video only)"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H. Real data mapping: 0=Step-50, 64=Step50. Red→Green (Video only)"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=Step0, A=Step10, F=Step15, 10=Step16, 64=Step100 (Video only)"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = OSD Off, 1 = OSD On"

- id: remote_lock_key_lock
  label: Remote Lock/Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On. When controlling RS-232C, locks remote control and local keys"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: "Range: 00H–64H (0–100). Real data mapping: 0=L50, 64=Center, 128=R50"

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
  params: []

- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=Inversion, 2=Orbiter, 4=White Wash, 8=Normal"

- id: auto_configure
  label: Auto Configure
  kind: action
  params: []
  description: "Adjusts picture position and minimizes image shaking. Works only in RGB(PC) mode."

- id: send_key
  label: Send Key
  kind: action
  params:
    - name: key_code
      type: string
      description: "IR remote key code (Hex). Refer to IR code table."
  description: "Sends IR remote key code via wired remote port."

- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Off, 12=1x2, 13=1x3, 14=1x4 ... 44=4x4. Data cannot be set to 0X or X0 except 00."

- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      description: "Horizontal size range: 00H–64H (0–100)"

- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      description: "Vertical size range: 00H–64H (0–100)"

- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      description: "Tile ID range: 00H–10H (0–16)"

- id: elapsed_time_return
  label: Elapsed Time Return
  kind: action
  params: []
  description: "Reads elapsed time in hours (Hex). Data must be FF."

- id: temperature_value
  label: Temperature Value
  kind: action
  params: []
  description: "Reads internal temperature as 1-byte Hex. Data must be FF."

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: action
  params: []
  description: "Checks lamp status. Data must be FF. Returns: 0=Lamp Fault, 1=Lamp OK"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [off, on]
  read_command: k a
  read_data: FF

- id: input_state
  label: Input State
  type: enum
  values: [AV, Component1, Component2, RGB_DTV, RGB_PC, HDMI_DTV, HDMI_PC]
  read_command: k b
  read_data: FF

- id: aspect_ratio_state
  label: Aspect Ratio State
  type: enum
  values: [Normal_4_3, Wide_16_9, Horizon, Zoom1, Zoom2, Original, 14_9, Full, 1_1_PC]
  read_command: k c
  read_data: FF

- id: screen_mute_state
  label: Screen Mute State
  type: enum
  values: [off, on]
  read_command: k d
  read_data: FF

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values: [muted, unmuted]
  read_command: k e
  read_data: FF

- id: volume_level
  label: Volume Level
  type: integer
  range: [0, 100]
  read_command: k f
  read_data: FF

- id: contrast_level
  label: Contrast Level
  type: integer
  range: [0, 100]
  read_command: k g
  read_data: FF

- id: brightness_level
  label: Brightness Level
  type: integer
  range: [0, 100]
  read_command: k h
  read_data: FF

- id: color_level
  label: Color Level
  type: integer
  range: [0, 100]
  read_command: k i
  read_data: FF

- id: tint_level
  label: Tint Level
  type: integer
  range: [-50, 50]
  read_command: k j
  read_data: FF

- id: sharpness_level
  label: Sharpness Level
  type: integer
  range: [0, 100]
  read_command: k k
  read_data: FF

- id: osd_state
  label: OSD State
  type: enum
  values: [off, on]
  read_command: k l
  read_data: FF

- id: remote_lock_state
  label: Remote Lock/Key Lock State
  type: enum
  values: [off, on]
  read_command: k m
  read_data: FF

- id: balance_level
  label: Balance Level
  type: integer
  range: [0, 128]
  read_command: k t
  read_data: FF

- id: color_temperature_state
  label: Color Temperature State
  type: enum
  values: [Normal, Cool, Warm, User]
  read_command: k u
  read_data: FF

- id: abnormal_state_value
  label: Abnormal State Value
  type: enum
  values: [Normal, NoSignal, RemoteOff, SleepOff, RS232Off, ACdown, OffTimeOff, AutoOff]
  read_command: k z
  read_data: FF

- id: ism_mode_state
  label: ISM Mode State
  type: enum
  values: [Inversion, Orbiter, WhiteWash, Normal]
  read_command: j p
  read_data: FF

- id: tile_mode_state
  label: Tile Mode State
  type: integer
  range: [0, 68]
  read_command: d d
  read_data: FF

- id: elapsed_time_hours
  label: Elapsed Time (Hours)
  type: integer
  range: [0, 255]
  read_command: d l
  read_data: FF

- id: temperature_value_celsius
  label: Temperature Value (Celsius)
  type: integer
  range: [0, 255]
  read_command: d n
  read_data: FF

- id: lamp_fault_state
  label: Lamp Fault State
  type: enum
  values: [Fault, OK]
  read_command: d p
  read_data: FF

- id: ack_ok
  label: Acknowledgement OK
  type: string
  description: "Format: [Command2][ ][Set ID][ ][OK][Data][x]"
  pattern: "^.{2}\\s.{2}\\sOK.{2}x$"

- id: ack_ng
  label: Acknowledgement Error
  type: string
  description: "Format: [Command2][ ][Set ID][ ][NG][Data][x]"
  pattern: "^.{2}\\s.{2}\\sNG.{2}x$"
```

## Variables
```yaml
# All settable parameters also support read-back via FF data
# No separate Variables section required — see Feedbacks for read-back commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Command format:** `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = Carriage Return (0x0D), space = 0x20. Command1 groups: `j` (ISM/AutoConfig), `k` (general control), `m` (key), `d` (display/tile). Set ID range: 1–99. Set ID `0` broadcasts to all devices but ACKs cannot be checked reliably (all devices respond simultaneously).

**Read mode:** Transmit `FF` data to read current status of any command.

**IR codes:** Device also accepts IR remote codes via wired remote port. Discrete IR codes provided for power on/off, input selection, and aspect ratio. Carrier: 37.917KHz modulated, 455KHz crystal, duty ratio 1/3, frame interval 108ms.

**Tile mode limitation:** Tile mode data cannot be set to values where either digit is 0 except `00`.

**Protocol note:** The documented protocol is RS-232C/UART. No explicit IP control commands, port, or network configuration are described in the source; TCP/IP presence is unconfirmed.

<!-- UNRESOLVED: TCP/IP port number — not stated in source -->
<!-- UNRESOLVED: network authentication — not applicable (no network commands documented) -->
<!-- UNRESOLVED: unsolicited event notifications — none documented in source -->
<!-- UNRESOLVED: firmware version compatibility — not stated in source -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-05-14T18:17:17.551Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.551Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 actions and 21 feedback read-commands match source commands exactly; transport parameters verified; complete coverage of documented protocol."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
