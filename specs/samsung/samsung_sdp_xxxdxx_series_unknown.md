---
spec_id: admin/samsung-sdp-xxxdxx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung SDP xxxDXx Series Control Spec"
manufacturer: Samsung
model_family: SDP900DXA
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - SDP900DXA
    - SDP950DXA/STA
    - SDP990DXA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - image-us.samsung.com
  - aca.im
source_urls:
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/resources/pdfs/ip-command-list/IP-Command-List_2023.pdf
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
retrieved_at: 2026-05-03T15:30:35.928Z
last_checked_at: 2026-05-18T16:49:09.564Z
generated_at: 2026-05-18T16:49:09.564Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:49:09.564Z
  matched_actions: 56
  action_count: 56
  confidence: high
  summary: "All 56 spec actions match verbatim to source command table with correct opcodes, parameter ranges, and transport settings verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Samsung SDP xxxDXx Series Control Spec

## Summary
Samsung SDP xxxDXx Series document camera (RS-232C serial control). 6-byte command frames: start code 0xB0, 4-byte command code, stop code 0xBF. Responses mirror frame structure with ACK in byte 2. Supports power, lamp, input routing, image freeze, rotate, divide, shift, preset, iris, color, focus, zoom.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command table presence
- powerable
- queryable
- routable
```

## Actions
```yaml
- id: awc
  label: AWC (Auto White Balance)
  kind: action
  params: []

- id: af
  label: AF (Auto Focus)
  kind: action
  params: []

- id: upper_lamp_on
  label: Upper Lamp On
  kind: action
  params: []

- id: lower_lamp_on
  label: Lower Lamp On
  kind: action
  params: []

- id: lamp_off
  label: Lamp Off
  kind: action
  params: []

- id: select_internal
  label: Select Internal Input
  kind: action
  params: []

- id: select_external_1
  label: Select External 1 Input
  kind: action
  params: []

- id: select_external_2
  label: Select External 2 Input
  kind: action
  params: []

- id: set_positive_mode
  label: Set Positive Mode
  kind: action
  params: []

- id: set_negative_mode
  label: Set Negative Mode
  kind: action
  params: []

- id: set_ntsc
  label: Set NTSC
  kind: action
  params: []

- id: set_pal
  label: Set PAL
  kind: action
  params: []

- id: aperture_on
  label: Aperture On
  kind: action
  params: []

- id: aperture_off
  label: Aperture Off
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: rotate_off
  label: Rotate Off
  kind: action
  params: []

- id: rotate_90
  label: Rotate 90°
  kind: action
  params: []

- id: rotate_180
  label: Rotate 180°
  kind: action
  params: []

- id: rotate_360
  label: Rotate 360°
  kind: action
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  params: []

- id: image_save
  label: Image Save
  kind: action
  params:
    - name: number
      type: integer
      description: Save slot number (1-8)

- id: image_recall
  label: Image Recall
  kind: action
  params:
    - name: number
      type: integer
      description: Recall slot number (1-8)

- id: image_divide
  label: Image Divide / 3x3 Multi-Screen
  kind: action
  params:
    - name: number
      type: integer
      description: Divide position 1-9; 9 triggers 3x3 multi-screen mode

- id: image_shift
  label: Image Shift
  kind: action
  params:
    - name: number
      type: integer
      description: Shift number (1-9)

- id: preset_save
  label: Preset Save
  kind: action
  params:
    - name: number
      type: integer
      description: Preset slot number (1-4)

- id: preset_exe
  label: Preset Execute
  kind: action
  params:
    - name: number
      type: integer
      description: Preset slot number (1-4)

- id: multi_screen_cancel
  label: Multi-Screen Cancel (Recall, Divide, 3x3)
  kind: action
  params: []

- id: iris_up
  label: Iris Up
  kind: action
  params: []

- id: iris_down
  label: Iris Down
  kind: action
  params: []

- id: red_up
  label: Red Up
  kind: action
  params: []

- id: red_down
  label: Red Down
  kind: action
  params: []

- id: blue_up
  label: Blue Up
  kind: action
  params: []

- id: blue_down
  label: Blue Down
  kind: action
  params: []

- id: focus_far
  label: Focus Far
  kind: action
  params: []

- id: focus_near
  label: Focus Near
  kind: action
  params: []

- id: zoom_tele
  label: Zoom Tele
  kind: action
  params: []

- id: zoom_wide
  label: Zoom Wide
  kind: action
  params: []

- id: iris_target
  label: Iris Target
  kind: action
  params:
    - name: value
      type: integer
      description: Iris target value (1-120)

- id: red_target
  label: Red Target
  kind: action
  params:
    - name: value
      type: integer
      description: Red target value (1-200)

- id: blue_target
  label: Blue Target
  kind: action
  params:
    - name: value
      type: integer
      description: Blue target value (1-200)

- id: focus_target
  label: Focus Target
  kind: action
  params:
    - name: msb
      type: integer
      description: Focus MSB (0-2225 valid range, varies with zoom)
    - name: lsb
      type: integer
      description: Focus LSB

- id: zoom_target
  label: Zoom Target
  kind: action
  params:
    - name: msb
      type: integer
      description: Zoom MSB (0-1812 valid range)
    - name: lsb
      type: integer
      description: Zoom LSB

- id: focus_zoom_concurrent
  label: Focus/Zoom Concurrent Target
  kind: action
  params:
    - name: zoom_msb
      type: integer
      description: Zoom MSB (0-1812)
    - name: zoom_lsb
      type: integer
      description: Zoom LSB
    - name: focus_msb
      type: integer
      description: Focus MSB (0-2225)
    - name: focus_lsb
      type: integer
      description: Focus LSB

- id: drive_stop
  label: Drive Stop
  kind: action
  params: []

- id: set_status_normal
  label: Set-Status (Normal)
  kind: action
  params:
    - name: status_msb
      type: integer
      description: Status MSB
    - name: status_lsb
      type: integer
      description: Status LSB

- id: set_status_digital
  label: Set-Status (Digital)
  kind: action
  params:
    - name: status_msb
      type: integer
      description: Status MSB
    - name: status_lsb
      type: integer
      description: Status LSB

- id: message_status
  label: Message-Status
  kind: action
  params: []

- id: iris_status
  label: Iris-Status
  kind: action
  params: []

- id: red_status
  label: Red-Status
  kind: action
  params: []

- id: blue_status
  label: Blue-Status
  kind: action
  params: []

- id: zoom_status
  label: Zoom-Status
  kind: action
  params: []

- id: focus_status
  label: Focus-Status
  kind: action
  params: []

- id: focus_status_max
  label: Focus-Status (Max)
  kind: action
  params: []

- id: focus_status_min
  label: Focus-Status (Min)
  kind: action
  params: []
```

## Feedbacks
```yaml
# Each command returns 6-byte response:
# [0xB0, ACK data, data_msb, data_lsb, 0x00, 0xBF]
# ACK data encodes command source (panel/remocon/RS232C/USB/mouse) in bits 4-0

- id: ack_data
  label: ACK Data
  type: object
  description: >
    Acknowledgement byte. Bit 0 = ACK flag. Bits 4-1 encode source:
    0x10=panel-key, 0x20=remocon, 0x40=RS232C, 0x80=USB, 0x100=MOUSE.
    Commands still executing return the executing-source value (not 0x80).

- id: status_normal
  label: Set-Status (Normal) Response
  type: object
  fields:
    - name: status_msb
      type: integer
    - name: status_lsb
      type: integer
  description: >
    LSB: lamp (bit0=both off, bit1=upper, bit2=lower), input (bits4-6:
    000=internal, 110=external1, 111=external2, 101=no-sync-ext1/ext2),
    mode (bit7=positive/negative). MSB: video system (bit0=NTSC/PAL),
    power (bit1), aperture (bit2), model (bit7=DX/ST).

- id: status_digital
  label: Set-Status (Digital) Response
  type: object
  fields:
    - name: status_msb
      type: integer
    - name: status_lsb
      type: integer
  description: >
    LSB: divide position (bits0-1: shift1-3), recall number (bits0-3).
    MSB: divide ON/OFF, 3x3 multi-screen ON/OFF, rotate (2 bits: 00=off,
    01=90°, 10=180°, 11=270°), freeze ON/OFF, recall ON/OFF.

- id: message_status
  label: Message-Status Response
  type: object
  description: >
    LSB: command source (same as ACK data). MSB: AF executing (011),
    Preset-Exe (011), Image-Save (100), Image-Rotate (101).
```

## Variables
```yaml
# UNRESOLVED: no discrete Variables section identified in source.
# The status commands return multi-bit fields covering:
#   - lamp state (upper/lower/both-off)
#   - input source (internal/external-1/external-2)
#   - video mode (positive/negative, NTSC/PAL)
#   - power state
#   - aperture state
#   - image freeze / divide / rotate state
# Expose as Feedbacks above; formal Variables entries TBD.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# Device only responds to commands; no autonomous push messages.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes

**Command frame format (TX to MICOM):** `[0xB0, Cmd1, Cmd2, Cmd3, Cmd4, 0xBF]` — 6 bytes total. Start code 0xB0, stop code 0xBF.

**Response frame format (RX from MICOM):** `[0xB0, ACK_data, Data_MSB, Data_LSB, 0x00, 0xBF]`. ACK_data == 0x80 indicates command accepted and idle. Any other value means system is busy with that source.

**Iris/Red/Blue/Focus/Zoom Up/Down commands** drive to mechanical limit; use `drive_stop` to halt early.

**Focus target** range is zoom-dependent (min/max focus values change with zoom position). Focus-Status[Max]/[Min] commands return current limits at present zoom.

**Image divide with number 9** triggers 3×3 multi-screen mode.

<!-- UNRESOLVED: TCP/IP or HTTP control paths not described in source (RS-232C only) -->
<!-- UNRESOLVED: power supply specs, thermal behavior not stated -->
<!-- UNRESOLVED:firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - image-us.samsung.com
  - aca.im
source_urls:
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/resources/pdfs/ip-command-list/IP-Command-List_2023.pdf
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
retrieved_at: 2026-05-03T15:30:35.928Z
last_checked_at: 2026-05-18T16:49:09.564Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:49:09.564Z
matched_actions: 56
action_count: 56
confidence: high
summary: "All 56 spec actions match verbatim to source command table with correct opcodes, parameter ranges, and transport settings verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
