---
spec_id: admin/lg-49uj6050-smarttv
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 49UJ6050 SmartTV Control Spec"
manufacturer: LG
model_family: 49UJ6050
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49UJ6050
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - justaddpower.com
  - manualslib.com
  - scribd.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://www.manualslib.com/products/Lg-49uj6050-Uc-12883580.html
  - https://www.scribd.com/document/649294226/RS232-forLGTV
retrieved_at: 2026-06-02T17:22:54.379Z
last_checked_at: 2026-06-02T17:22:54.379Z
generated_at: 2026-06-02T17:22:54.379Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document is a generic LG RS-232 protocol manual; it does not explicitly name the 49UJ6050 model. Compatibility is asserted from the document context."
  - "Source uses RS-232/serial despite input prompt describing protocol as \"TCP/IP\". Spec follows source."
  - "All adjustable parameters in this device are exposed as parameterized Actions"
  - "source does not document unsolicited notifications from the device."
  - "source does not document multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "Firmware version compatibility not stated in source."
  - "Specific 49UJ6050 model identification not stated in source; spec covers the protocol class."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:54.379Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched literally against source command table; all transport parameters verified verbatim; full bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 49UJ6050 SmartTV Control Spec

## Summary
LG 49UJ6050 SmartTV serial (RS-232C) control protocol. Covers power, input select, picture/sound adjustments, OSD/lock, tiling, and diagnostic reads over UART at 9600 baud using ASCII command strings terminated by carriage return.

<!-- UNRESOLVED: Source document is a generic LG RS-232 protocol manual; it does not explicitly name the 49UJ6050 model. Compatibility is asserted from the document context. -->
<!-- UNRESOLVED: Source uses RS-232/serial despite input prompt describing protocol as "TCP/IP". Spec follows source. -->

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
- powerable    # inferred from power command examples
- routable     # inferred from input select command examples
- queryable    # inferred from FF status-read pattern on every command
- levelable    # inferred from volume/contrast/brightness/color/tint/sharpness/balance ranges
```

## Actions
```yaml
# Universal command frame: <cmd1><cmd2><SP><set_id><SP><data><CR>
# <SP> = ASCII 0x20, <CR> = ASCII 0x0D
# set_id: 1-99; 0 broadcasts to all sets (no ack check with broadcast).
# Pass data=FF to read current status; otherwise data is the value to set.

- id: power
  label: Power
  kind: action
  command: "ka {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: enum
      values: ["00", "01", "FF"]
      description: "00=Power Off, 01=Power On, FF=Read status"

- id: input_select
  label: Input Select (Main Picture)
  kind: action
  command: "kb {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: enum
      values: ["02", "04", "05", "06", "07", "08", "09", "FF"]
      description: "02=AV, 04=Component1, 05=Component2, 06=RGB(DTV), 07=RGB(PC), 08=HDMI(DTV), 09=HDMI(PC), FF=Read status"

- id: aspect_ratio
  label: Aspect Ratio (Main Picture)
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: enum
      values: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "FF"]
      description: "01=4:3, 02=16:9, 03=Horizon(Spectacle), 04=Zoom1, 05=Zoom2, 06=Original, 07=14:9, 08=Full (Europe only), 09=1:1(PC), FF=Read status"

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: enum
      values: ["00", "01", "FF"]
      description: "00=Mute off (picture on), 01=Mute on (picture off), FF=Read status"

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: enum
      values: ["00", "01", "FF"]
      description: "00=Mute on (volume off), 01=Mute off (volume on), FF=Read status"

- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00H-64H (0=Step 0, 64=Step 100); FF=Read status"

- id: contrast
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00H-64H (0=Step 0, 64=Step 100); FF=Read status"

- id: brightness
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00H-64H (0=Step 0, 64=Step 100); FF=Read status"

- id: color
  label: Color (Video only)
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00H-64H (0=Step 0, 64=Step 100); FF=Read status"

- id: tint
  label: Tint (Video only)
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00H-64H (00H=Red -50, 64H=Green +50); FF=Read status"

- id: sharpness
  label: Sharpness (Video only)
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00H-64H (0=Step 0, 64=Step 100); FF=Read status"

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: enum
      values: ["00", "01", "FF"]
      description: "00=OSD Off, 01=OSD On, FF=Read status"

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: enum
      values: ["00", "01", "FF"]
      description: "00=Off, 01=On, FF=Read status"

- id: balance
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00H-64H (00H=L50, 64H=R50); FF=Read status"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "ku {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "FF"]
      description: "00=Normal, 01=Cool, 02=Warm, 03=User, FF=Read status"

- id: abnormal_state
  label: Abnormal State (Read power-off reason in Standby)
  kind: query
  command: "kz {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
  response_meanings:
    "00": "Normal (Power on and signal exist)"
    "01": "No signal (Power on)"
    "02": "Turned off by remote control"
    "03": "Turned off by sleep timer"
    "04": "Turned off by RS-232C function"
    "06": "AC down"
    "08": "Turned off by off-timer"
    "09": "Turned off by auto-off"

- id: ism_mode
  label: ISM Mode (afterimage prevention)
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: enum
      values: ["01", "02", "04", "08"]
      description: "01=Inversion, 02=Orbiter, 04=White Wash, 08=Normal"

- id: auto_configure
  label: Auto Configure (RGB/PC only)
  kind: action
  command: "ju {set_id} 01\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
  notes: Adjusts picture position and minimizes image shaking; works only in RGB(PC) mode.

- id: key
  label: Send IR Remote Key Code
  kind: action
  command: "mc {set_id} {key_code}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: key_code
      type: hex_byte
      description: IR key code (see IR Codes table in source; e.g. 08=Power, C4=Power On, C5=Power Off)

- id: tile_mode
  label: Tile Mode
  kind: action
  command: "dd {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00=Off, otherwise column*10+row (e.g. 12=1x2, 13=1x3, 14=1x4, 44=4x4). 0X and X0 are invalid except 00."

- id: tile_h_size
  label: Tile Horizontal Size
  kind: action
  command: "dg {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00H-64H"

- id: tile_v_size
  label: Tile Vertical Size
  kind: action
  command: "dh {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00H-64H"

- id: tile_id_set
  label: Tile ID Set
  kind: action
  command: "di {set_id} {data}\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99; 0 broadcasts)
    - name: data
      type: hex_byte
      description: "00H-10H (Tile ID assignment)"

- id: elapsed_time_return
  label: Elapsed Time Return
  kind: query
  command: "dl {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
  notes: Response data is used hours in hex.

- id: temperature_value
  label: Temperature Value (inside)
  kind: query
  command: "dn {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
  notes: Response data is 1 byte in hex.

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: query
  command: "dp {set_id} FF\r"
  params:
    - name: set_id
      type: integer
      description: Set ID (1-99)
  response_meanings:
    "00": "Lamp Fault"
    "01": "Lamp OK"
```

## Feedbacks
```yaml
# OK ack frame: <cmd2><SP><set_id><SP>OK<SP><data>x
# Error ack frame: <cmd2><SP><set_id><SP>NG<SP><data>x
# x is a literal character per source (terminator).

- id: power_state
  type: enum
  values: [off, on]
  response_pattern: "a {set_id} OK {data}x"
  data_map:
    "00": off
    "01": on

- id: input_source
  type: enum
  values: [av, component1, component2, rgb_dtv, rgb_pc, hdmi_dtv, hdmi_pc]
  response_pattern: "b {set_id} OK {data}x"
  data_map:
    "02": av
    "04": component1
    "05": component2
    "06": rgb_dtv
    "07": rgb_pc
    "08": hdmi_dtv
    "09": hdmi_pc

- id: aspect_ratio_state
  type: enum
  values: [normal_4_3, wide_16_9, horizon, zoom1, zoom2, original, mode_14_9, full_eu, pc_1_1]
  response_pattern: "c {set_id} OK {data}x"

- id: screen_mute_state
  type: enum
  values: [picture_on, picture_off]

- id: volume_mute_state
  type: enum
  values: [mute_on, mute_off]

- id: volume
  type: integer
  range: "0-100"
  response_pattern: "f {set_id} OK {data}x"

- id: contrast
  type: integer
  range: "0-100"

- id: brightness
  type: integer
  range: "0-100"

- id: color
  type: integer
  range: "0-100"

- id: tint
  type: integer
  range: "-50 to 50"

- id: sharpness
  type: integer
  range: "0-100"

- id: osd_state
  type: enum
  values: [off, on]

- id: remote_lock_state
  type: enum
  values: [off, on]

- id: balance
  type: integer
  range: "-50 to 50"

- id: color_temperature_state
  type: enum
  values: [normal, cool, warm, user]

- id: abnormal_state_reason
  type: enum
  values: [normal, no_signal, off_by_remote, off_by_sleep, off_by_rs232, ac_down, off_by_off_timer, off_by_auto_off]
  response_pattern: "z {set_id} OK {data}x"

- id: ism_mode_state
  type: enum
  values: [inversion, orbiter, white_wash, normal]

- id: tile_mode_state
  type: integer
  description: Hex byte; 00=off, else column*10+row

- id: tile_h_size_state
  type: integer
  range: "0-100"

- id: tile_v_size_state
  type: integer
  range: "0-100"

- id: tile_id_state
  type: integer
  range: "0-16"

- id: elapsed_time_hours
  type: integer
  description: Hex-encoded hours
  response_pattern: "l {set_id} OK {data}x"

- id: internal_temperature
  type: integer
  description: 1-byte hex value
  response_pattern: "n {set_id} OK {data}x"

- id: lamp_fault
  type: enum
  values: [fault, ok]
  response_pattern: "p {set_id} OK {data}x"
```

## Variables
```yaml
# UNRESOLVED: All adjustable parameters in this device are exposed as parameterized Actions
# (volume, contrast, brightness, color, tint, sharpness, balance, color_temperature).
# No standalone settable variables are documented in the source.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the device.
# All feedback is delivered as solicited responses to command frames.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- All commands use the frame `<cmd1><cmd2><SP><set_id><SP><data><CR>` where `<SP>=0x20` and `<CR>=0x0D`.
- `set_id` is 1-99; `0` broadcasts to all connected sets. When broadcasting, ack messages are not checkable.
- Every command supports a read form by sending `data=FF`; the device replies with the current value in an OK ack.
- OK ack frame: `<cmd2><SP><set_id><SP>OK<SP><data>x`; Error ack frame: `<cmd2><SP><set_id><SP>NG<SP><data>x`. The trailing `x` is a literal character per the source.
- Tiling sub-commands (tile_mode, tile_h_size, tile_v_size, tile_id_set, elapsed_time, temperature, lamp_fault) use `d` as cmd1 and acknowledge with `OK/NG` rather than just `OK`.
- ISM Mode and Abnormal State are documented as hex-coded enums with gaps (e.g. ISM data 1/2/4/8 only; 0/3/5/6/7 undefined).
- The source is a generic LG RS-232 protocol manual; explicit mention of the 49UJ6050 model number is not present in the supplied text. Compatibility is asserted from device-class context, not from model-specific evidence.
- Source describes RS-232C/serial exclusively; the input prompt's "TCP/IP" label does not match the source content.

<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Specific 49UJ6050 model identification not stated in source; spec covers the protocol class. -->

## Provenance

```yaml
source_domains:
  - justaddpower.com
  - manualslib.com
  - scribd.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
  - https://www.manualslib.com/products/Lg-49uj6050-Uc-12883580.html
  - https://www.scribd.com/document/649294226/RS232-forLGTV
retrieved_at: 2026-06-02T17:22:54.379Z
last_checked_at: 2026-06-02T17:22:54.379Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:54.379Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched literally against source command table; all transport parameters verified verbatim; full bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document is a generic LG RS-232 protocol manual; it does not explicitly name the 49UJ6050 model. Compatibility is asserted from the document context."
- "Source uses RS-232/serial despite input prompt describing protocol as \"TCP/IP\". Spec follows source."
- "All adjustable parameters in this device are exposed as parameterized Actions"
- "source does not document unsolicited notifications from the device."
- "source does not document multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "Firmware version compatibility not stated in source."
- "Specific 49UJ6050 model identification not stated in source; spec covers the protocol class."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
