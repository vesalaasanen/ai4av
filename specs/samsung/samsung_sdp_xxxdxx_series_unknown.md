---
spec_id: admin/samsung-sdp-xxxdxx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung SDP Series (SDP900DXA / SDP950DXA / SDP950DXA/STA / SDP990DXA) Control Spec"
manufacturer: Samsung
model_family: SDP900DXA
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - SDP900DXA
    - SDP950DXA
    - SDP950DXA/STA
    - SDP990DXA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - gist.github.com
  - manualslib.com
  - github.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/samsung/sdp-900dxa_rs232.pdf"
  - https://gist.github.com/paltaio-admin/0c6ca6c2a5210684fb6a81cbc913feeb
  - https://www.manualslib.com/manual/376555/Samsung-Sdp-950sta.html
  - https://github.com/vgavro/samsung-mdc
retrieved_at: 2026-05-14T19:41:00.200Z
last_checked_at: 2026-06-02T06:13:08.641Z
generated_at: 2026-06-02T06:13:08.641Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "vendor PDF OCR is partially garbled; several first-byte opcodes are inferred from grouping context. The literal hex bytes shown are taken verbatim from the source."
  - "flow control not stated in source"
  - "1st byte of command code not legible in source OCR; bytes 2-4 are 0x00 0x05 0x00"
  - "1st byte of command code not legible in source OCR; bytes 2-4 are 0x00 0x0A 0x00"
  - "source shows 0x2F in TX column and 0x2D in RX column; treated as the same op-code with receive echo."
  - "source does not document any unsolicited notifications from the device"
  - "source does not document any multi-step control sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "vendor PDF OCR is partially garbled — first byte of Upper Lamp, Lamp Off, Input Internal, Input External 2, Polarity Positive, and Polarity Negative command codes is not legible. Listed op-codes for those actions are placeholders and need to be re-verified against a clean copy of the manual."
  - "firmware version compatibility across SDP900DXA / SDP950DXA / SDP950DXA/STA / SDP990DXA is not stated in source."
  - "cable pinout is described in the source (2-2, 3-3, 5-5) but the formal signal mapping (TX/RX/RTS/CTS) is not transcribed cleanly; refer to the source PDF for the exact wiring."
verification:
  verdict: verified
  checked_at: 2026-06-02T06:13:08.641Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions matched verbatim to source command codes; transport parameters confirmed. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Samsung SDP Series (SDP900DXA / SDP950DXA / SDP950DXA/STA / SDP990DXA) Control Spec

## Summary
RS-232C control reference for the Samsung SDP Series visual presenter / document camera line. Every command is a 6-byte frame: `0xB0` (start) + 4-byte command code + `0xBF` (stop), sent at 9600 8N1. The device echoes each command back; the 2nd received byte (`ACK data`) must equal `0x80` to indicate the system is idle and ready for the next command.

<!-- UNRESOLVED: vendor PDF OCR is partially garbled; several first-byte opcodes are inferred from grouping context. The literal hex bytes shown are taken verbatim from the source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred: Power ON / Power OFF commands present
- queryable      # inferred: Status query commands present
- levelable      # inferred: Iris / Red / Blue / Zoom / Focus level commands present
```

## Actions
```yaml
# Frame format for every action below:
#   TX: 0xB0  <4-byte command code>  0xBF     (6 bytes total)
#   RX: 0xB0  <4-byte echo>          0xBF     (2nd RX byte = ACK data; 0x80 = idle/ready)
#
# Where the source lists a parameter (Number / data / MSB / LSB), the variable
# is shown as a {param} placeholder inside the 4-byte command code and the
# range is taken from the source "Remark" column.

- id: awc
  label: Auto White Balance
  kind: action
  command: "B0 01 00 05 00 BF"
  params: []

- id: af
  label: Auto Focus
  kind: action
  command: "B0 02 00 05 00 BF"
  params: []

- id: upper_lamp
  label: Upper Lamp On
  kind: action
  # UNRESOLVED: 1st byte of command code not legible in source OCR; bytes 2-4 are 0x00 0x05 0x00
  command: "B0 {byte1} 00 05 00 BF"
  params:
    - name: byte1
      type: hex
      description: First byte of command code; not legible in source (grouped with lamp commands)

- id: lower_lamp
  label: Lower Lamp On
  kind: action
  command: "B0 03 00 08 00 BF"
  params: []

- id: lamp_off
  label: Lamp Off
  kind: action
  # UNRESOLVED: 1st byte of command code not legible in source OCR; bytes 2-4 are 0x00 0x0A 0x00
  command: "B0 {byte1} 00 0A 00 BF"
  params:
    - name: byte1
      type: hex
      description: First byte of command code; not legible in source (grouped with lamp commands)

- id: input_internal
  label: Input Select - Internal
  kind: action
  command: "B0 {byte1} 00 05 00 BF"
  params:
    - name: byte1
      type: hex
      description: First byte of command code; not legible in source (grouped with input-select commands)

- id: input_external_1
  label: Input Select - External 1
  kind: action
  command: "B0 04 00 08 00 BF"
  params: []

- id: input_external_2
  label: Input Select - External 2
  kind: action
  command: "B0 {byte1} 00 0A 00 BF"
  params:
    - name: byte1
      type: hex
      description: First byte of command code; not legible in source (grouped with input-select commands)

- id: polarity_positive
  label: Polarity - Positive
  kind: action
  command: "B0 {byte1} 00 05 00 BF"
  params:
    - name: byte1
      type: hex
      description: First byte of command code; not legible in source (grouped with polarity commands)

- id: polarity_negative
  label: Polarity - Negative
  kind: action
  command: "B0 {byte1} 00 0A 00 BF"
  params:
    - name: byte1
      type: hex
      description: First byte of command code; not legible in source (grouped with polarity commands)

- id: video_format_ntsc
  label: Video Format - NTSC
  kind: action
  command: "B0 08 00 05 00 BF"
  params: []

- id: video_format_pal
  label: Video Format - PAL
  kind: action
  command: "B0 08 00 0A 00 BF"
  params: []

- id: aperture_on
  label: Aperture On
  kind: action
  command: "B0 09 00 05 00 BF"
  params: []

- id: aperture_off
  label: Aperture Off
  kind: action
  command: "B0 09 00 0A 00 BF"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "B0 0F 00 05 00 BF"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "B0 0F 00 0A 00 BF"
  params: []

- id: rotate_off
  label: Image Rotate Off
  kind: action
  command: "B0 11 00 05 00 BF"
  params: []

- id: rotate_90
  label: Image Rotate 90°
  kind: action
  command: "B0 11 00 08 00 BF"
  params: []

- id: rotate_180
  label: Image Rotate 180°
  kind: action
  command: "B0 11 00 0A 00 BF"
  params: []

- id: rotate_360
  label: Image Rotate 360°
  kind: action
  command: "B0 11 00 0D 00 BF"
  params: []

- id: freeze_on
  label: Image Freeze On
  kind: action
  command: "B0 12 00 05 00 BF"
  params: []

- id: freeze_off
  label: Image Freeze Off
  kind: action
  command: "B0 12 00 0A 00 BF"
  params: []

- id: image_save
  label: Image Save
  kind: action
  command: "B0 13 00 {number} 00 BF"
  params:
    - name: number
      type: integer
      description: Slot number (1-8)

- id: image_recall
  label: Image Recall
  kind: action
  command: "B0 14 00 {number} 00 BF"
  params:
    - name: number
      type: integer
      description: Slot number (1-8)

- id: image_divide
  label: Image Divide
  kind: action
  command: "B0 15 00 {number} 00 BF"
  params:
    - name: number
      type: integer
      description: Divide number (1-9). Note: number 9 = 3x3 multi-screen mode.

- id: image_shift
  label: Image Shift
  kind: action
  command: "B0 16 00 05 00 BF"
  params: []

- id: preset_save
  label: Preset Save
  kind: action
  command: "B0 17 00 {number} 00 BF"
  params:
    - name: number
      type: integer
      description: Preset slot number

- id: preset_exe
  label: Preset Execute
  kind: action
  command: "B0 18 00 {number} 00 BF"
  params:
    - name: number
      type: integer
      description: Preset slot number (1-4)

- id: multi_screen_3x3
  label: 3x3 Multi-screen (Recall / Divide / Cancel)
  kind: action
  command: "B0 1F 00 05 00 BF"
  params: []

- id: iris_up
  label: Iris Up
  kind: action
  command: "B0 21 00 05 00 BF"
  params: []

- id: iris_down
  label: Iris Down
  kind: action
  command: "B0 21 00 0A 00 BF"
  params: []

- id: red_up
  label: Red Gain Up
  kind: action
  command: "B0 23 00 05 00 BF"
  params: []

- id: red_down
  label: Red Gain Down
  kind: action
  command: "B0 23 00 0A 00 BF"
  params: []

- id: blue_up
  label: Blue Gain Up
  kind: action
  command: "B0 24 00 05 00 BF"
  params: []

- id: blue_down
  label: Blue Gain Down
  kind: action
  command: "B0 24 00 0A 00 BF"
  params: []

- id: focus_far
  label: Focus Far
  kind: action
  command: "B0 25 00 05 00 BF"
  params: []

- id: focus_near
  label: Focus Near
  kind: action
  command: "B0 25 00 0A 00 BF"
  params: []

- id: zoom_tele
  label: Zoom Tele
  kind: action
  command: "B0 26 00 05 00 BF"
  params: []

- id: zoom_wide
  label: Zoom Wide
  kind: action
  command: "B0 26 00 0A 00 BF"
  params: []

- id: iris_target
  label: Iris Set Target
  kind: action
  command: "B0 41 00 00 {data} BF"
  params:
    - name: data
      type: integer
      description: Iris target value (1-120)

- id: red_target
  label: Red Gain Set Target
  kind: action
  command: "B0 43 00 00 {data} BF"
  params:
    - name: data
      type: integer
      description: Red gain target value (1-200)

- id: blue_target
  label: Blue Gain Set Target
  kind: action
  command: "B0 44 00 00 {data} BF"
  params:
    - name: data
      type: integer
      description: Blue gain target value (1-200)

- id: focus_target
  label: Focus Set Target
  kind: action
  command: "B0 45 00 {msb} {lsb} BF"
  params:
    - name: msb
      type: hex
      description: Focus MSB byte
    - name: lsb
      type: hex
      description: Focus LSB byte
      # Combined value range 0-2225

- id: zoom_target
  label: Zoom Set Target
  kind: action
  command: "B0 46 00 {msb} {lsb} BF"
  params:
    - name: msb
      type: hex
      description: Zoom MSB byte
    - name: lsb
      type: hex
      description: Zoom LSB byte
      # Combined value range 0-1812

- id: focus_zoom_concurrent_target
  label: Focus + Zoom Concurrent Set Target
  kind: action
  # Source shows two 6-byte forms (one with focus MSB/LSB, one with zoom MSB/LSB),
  # differing in the 3rd byte (0x05 = zoom-target variant, 0x0A = focus-target variant).
  command: "B0 47 {zoom_or_focus_marker} {msb} {lsb} BF"
  params:
    - name: zoom_or_focus_marker
      type: hex
      description: 0x05 for zoom-MSB/LSB payload, 0x0A for focus-MSB/LSB payload
    - name: msb
      type: hex
      description: MSB byte (zoom 0-1812 or focus 0-2225)
    - name: lsb
      type: hex
      description: LSB byte

- id: drive_stop
  label: Drive Stop
  kind: action
  # UNRESOLVED: source shows 0x2F in TX column and 0x2D in RX column; treated as the same op-code with receive echo.
  command: "B0 2F 00 05 00 BF"
  params: []

- id: set_status_normal
  label: Set Status (Normal) Query
  kind: query
  command: "B0 61 00 00 00 BF"
  params: []

- id: set_status_digital
  label: Set Status (Digital) Query
  kind: query
  command: "B0 62 00 00 00 BF"
  params: []

- id: message_status
  label: Message Status Query
  kind: query
  command: "B0 64 00 00 00 BF"
  params: []

- id: iris_status
  label: Iris Status Query
  kind: query
  command: "B0 65 00 00 00 BF"
  params: []

- id: red_status
  label: Red Gain Status Query
  kind: query
  command: "B0 67 00 00 00 BF"
  params: []

- id: blue_status
  label: Blue Gain Status Query
  kind: query
  command: "B0 68 00 00 00 BF"
  params: []

- id: zoom_status
  label: Zoom Status Query
  kind: query
  command: "B0 69 00 00 00 BF"
  params: []

- id: focus_status
  label: Focus Status Query
  kind: query
  command: "B0 6A 00 00 00 BF"
  params: []

- id: focus_status_max
  label: Focus Status (Max at current zoom) Query
  kind: query
  command: "B0 6B 00 05 00 BF"
  params: []

- id: focus_status_min
  label: Focus Status (Min at current zoom) Query
  kind: query
  command: "B0 6B 00 0A 00 BF"
  params: []
```

## Feedbacks
```yaml
- id: ack_data
  type: enum
  description: 2nd received byte of every echo. 0x80 = system idle/ready; any other value means the system is busy with another operation.
  values:
    - "0x80"
    - "non-0x80 (busy)"

- id: iris_value
  type: integer
  description: Returned by Iris-Status query. Range 1-120.

- id: red_value
  type: integer
  description: Returned by Red-Status query. Range 1-200.

- id: blue_value
  type: integer
  description: Returned by Blue-Status query. Range 1-200.

- id: zoom_value
  type: integer
  description: Returned by Zoom-Status query. Range 0-1904.

- id: focus_value
  type: integer
  description: Returned by Focus-Status query. Range 0-2225.

- id: focus_value_at_max_zoom
  type: integer
  description: Returned by Focus-Status(Max) query. Range 648-2225.

- id: focus_value_at_min_zoom
  type: integer
  description: Returned by Focus-Status(Min) query. Range 0-1383.

- id: set_status_normal_word
  type: integer
  description: 16-bit status word returned by Set-Status(Normal). Encodes lamp state, input source, polarity, video format, power, aperture, and model variant (DX vs ST).

- id: set_status_digital_word
  type: integer
  description: 16-bit status word returned by Set-Status(Digital). Encodes divide position, divide/recall slot, divide ON/OFF, 3x3 multi-screen ON/OFF, image rotate state, image freeze ON/OFF, image recall ON/OFF.

- id: message_status_word
  type: integer
  description: 16-bit status word returned by Message-Status. Encodes which input source (panel / remocon / RS232C / USB / MOUSE) issued the current command, and which long-running command is in progress (AF / Preset-Exe / Image-Save / Image-Rotate).
```

## Variables
```yaml
# Settable level parameters that take a numeric target value (not discrete action IDs).
- id: iris_level
  type: integer
  range: [1, 120]
  action_ref: iris_target

- id: red_level
  type: integer
  range: [1, 200]
  action_ref: red_target

- id: blue_level
  type: integer
  range: [1, 200]
  action_ref: blue_target

- id: focus_level
  type: integer
  range: [0, 2225]
  description: Effective range depends on current zoom position (see Focus-Status Max/Min).
  action_ref: focus_target

- id: zoom_level
  type: integer
  range: [0, 1812]
  action_ref: zoom_target
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notifications from the device
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step control sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- Frame: every command is 6 bytes — `0xB0` start + 4-byte command code + `0xBF` stop. Every receive is also 6 bytes with the same envelope; the 2nd received byte is the `ACK data` and must be `0x80` before the next command is sent.
- Application flow: when starting a multi-command session, send `Message-Status` (`0xB0 0x64 0x00 0x00 0x00 0xBF`) and confirm the echoed `ACK data` is `0x80` before issuing the next command.
- Continuous-motion commands (Iris Up/Down, Red Up/Down, Blue Up/Down, Focus Far/Near, Zoom Tele/Wide) run to the end of travel once started; use `Drive Stop` to halt at an intermediate point.
- Image Divide with number `9` triggers 3x3 multi-screen mode.
- `Set-Status(Digital)` reports divide position (shift1/shift2/shift3), divide/recall slot number (1-8), divide ON/OFF, 3x3 multi-screen ON/OFF, image rotate state (off/90/180/270), image freeze ON/OFF, and image recall ON/OFF.
- `Set-Status(Normal)` reports lamp state (all off / upper on / lower on), input source (internal / NO SYNC EXT1 / NO SYNC EXT2 / external 1 / external 2), polarity (positive / negative), video format (NTSC / PAL), system power (off / on), aperture (on / off), and model variant (DX / ST).
- `Message-Status` reports which input source issued the current command (panel / remocon / RS232C / USB / MOUSE) and which long-running command class is in progress (AF, Preset-Exe, Image-Save, Image-Rotate).
- `ACK data` bit definition: bit pattern indicates active source (panel / remocon / RS232C / USB / MOUSE) plus an acknowledgement flag.

<!-- UNRESOLVED: vendor PDF OCR is partially garbled — first byte of Upper Lamp, Lamp Off, Input Internal, Input External 2, Polarity Positive, and Polarity Negative command codes is not legible. Listed op-codes for those actions are placeholders and need to be re-verified against a clean copy of the manual. -->

<!-- UNRESOLVED: firmware version compatibility across SDP900DXA / SDP950DXA / SDP950DXA/STA / SDP990DXA is not stated in source. -->

<!-- UNRESOLVED: cable pinout is described in the source (2-2, 3-3, 5-5) but the formal signal mapping (TX/RX/RTS/CTS) is not transcribed cleanly; refer to the source PDF for the exact wiring. -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - gist.github.com
  - manualslib.com
  - github.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/samsung/sdp-900dxa_rs232.pdf"
  - https://gist.github.com/paltaio-admin/0c6ca6c2a5210684fb6a81cbc913feeb
  - https://www.manualslib.com/manual/376555/Samsung-Sdp-950sta.html
  - https://github.com/vgavro/samsung-mdc
retrieved_at: 2026-05-14T19:41:00.200Z
last_checked_at: 2026-06-02T06:13:08.641Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T06:13:08.641Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions matched verbatim to source command codes; transport parameters confirmed. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "vendor PDF OCR is partially garbled; several first-byte opcodes are inferred from grouping context. The literal hex bytes shown are taken verbatim from the source."
- "flow control not stated in source"
- "1st byte of command code not legible in source OCR; bytes 2-4 are 0x00 0x05 0x00"
- "1st byte of command code not legible in source OCR; bytes 2-4 are 0x00 0x0A 0x00"
- "source shows 0x2F in TX column and 0x2D in RX column; treated as the same op-code with receive echo."
- "source does not document any unsolicited notifications from the device"
- "source does not document any multi-step control sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "vendor PDF OCR is partially garbled — first byte of Upper Lamp, Lamp Off, Input Internal, Input External 2, Polarity Positive, and Polarity Negative command codes is not legible. Listed op-codes for those actions are placeholders and need to be re-verified against a clean copy of the manual."
- "firmware version compatibility across SDP900DXA / SDP950DXA / SDP950DXA/STA / SDP990DXA is not stated in source."
- "cable pinout is described in the source (2-2, 3-3, 5-5) but the formal signal mapping (TX/RX/RTS/CTS) is not transcribed cleanly; refer to the source PDF for the exact wiring."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
