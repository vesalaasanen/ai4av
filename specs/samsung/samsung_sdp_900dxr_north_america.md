---
spec_id: admin/samsung-sdp-900dxr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung SDP-900DXR (North America) Control Spec"
manufacturer: Samsung
model_family: SDP-900DXR
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - SDP-900DXR
    - SDP-900DXA
    - SDP-950DXA
    - SDP-990DXA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - manualslib.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/samsung/sdp-900dxa_rs232.pdf"
  - https://www.manualslib.com/manual/376555/Samsung-Sdp-950sta.html
retrieved_at: 2026-05-07T07:50:24.062Z
last_checked_at: 2026-06-10T00:58:19.855Z
generated_at: 2026-06-10T00:58:19.855Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SDP-900DXR North America-specific variant not confirmed in source; protocol derived from SDP-900DXA sheet covering same RS-232 command set."
  - "flow control not stated in source"
  - "port number not stated in source"
  - "Image Rotate concurrent with divide/recall not fully documented in source"
  - "no explicit NACK/error response codes stated in source"
  - "no unsolicited event documentation in source."
  - "no multi-step macro sequences documented in source."
  - "no safety warnings or interlock procedures in source."
  - "whether SDP-900DXR North America uses same protocol as SDP-900DXA sheet not confirmed by DXR-specific documentation"
  - "flow control (RTS/CTS, XON/XOFF) not stated in source"
  - "actual serial port connector type not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:58:19.855Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions matched literally to source commands; transport parameters verified; 1:1 coverage (56/56). (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# Samsung SDP-900DXR (North America) Control Spec

## Summary
Digital presenter (document camera) with RS-232C control interface. 6-byte command/response frames with 0xB0 start code and 0xBF stop code. Supports power, freeze, zoom, focus, iris, color correction, image storage, preset recall, and rotation. Target model SDP-900DXR North America; source document covers SDP-900DXA/950DXA/990DXA same series — protocol identical.

<!-- UNRESOLVED: SDP-900DXR North America-specific variant not confirmed in source; protocol derived from SDP-900DXA sheet covering same RS-232 command set. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # Power ON/OFF commands present
- routable        # Input selection (Internal/External 1/External 2) commands present
- queryable       # Status query commands present (Message-Status, Set-Status, Iris-Status, etc.)
- levelable       # Iris, Red, Blue, Zoom, Focus target/set commands present
```

## Actions
```yaml
- id: awc
  label: Auto White Balance (AWC)
  kind: action
  params: []

- id: af
  label: Auto Focus
  kind: action
  params: []

- id: lamp_upper_on
  label: Upper Lamp On
  kind: action
  params: []

- id: lamp_lower_on
  label: Lower Lamp On
  kind: action
  params: []

- id: lamp_off
  label: Lamps Off
  kind: action
  params: []

- id: input_internal
  label: Input Internal
  kind: action
  params: []

- id: input_external1
  label: Input External 1
  kind: action
  params: []

- id: input_external2
  label: Input External 2
  kind: action
  params: []

- id: image_mode_positive
  label: Positive Image Mode
  kind: action
  params: []

- id: image_mode_negative
  label: Negative Image Mode
  kind: action
  params: []

- id: video_standard_ntsc
  label: NTSC Video Standard
  kind: action
  params: []

- id: video_standard_pal
  label: PAL Video Standard
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
      description: Slot number (range 1-8)

- id: image_recall
  label: Image Recall
  kind: action
  params:
    - name: number
      type: integer
      description: Slot number (range 1-8)

- id: image_divide
  label: Image Divide
  kind: action
  params:
    - name: number
      type: integer
      description: Division mode (1-9; number 9 triggers 3×3 multi-screen)

- id: image_shift
  label: Image Shift
  kind: action
  params: []

- id: preset_save
  label: Preset Save
  kind: action
  params:
    - name: number
      type: integer
      description: Preset number (1-4)

- id: preset_exe
  label: Preset Execute
  kind: action
  params:
    - name: number
      type: integer
      description: Preset number (1-4)

- id: multi_screen_cancel
  label: Multi-Screen Cancel
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
  label: Red Gain Up
  kind: action
  params: []

- id: red_down
  label: Red Gain Down
  kind: action
  params: []

- id: blue_up
  label: Blue Gain Up
  kind: action
  params: []

- id: blue_down
  label: Blue Gain Down
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

- id: drive_stop
  label: Drive Stop
  description: Stops iris, color, focus, zoom drive commands in progress
  kind: action
  params: []

- id: iris_target
  label: Iris Target Set
  kind: action
  params:
    - name: value
      type: integer
      description: Target value (range 1-120)

- id: red_target
  label: Red Target Set
  kind: action
  params:
    - name: value
      type: integer
      description: Target value (range 1-200)

- id: blue_target
  label: Blue Target Set
  kind: action
  params:
    - name: value
      type: integer
      description: Target value (range 1-200)

- id: focus_target
  label: Focus Target Set
  kind: action
  params:
    - name: msb
      type: integer
      description: MSB of focus value (range 0-2225)
    - name: lsb
      type: integer
      description: LSB of focus value

- id: zoom_target
  label: Zoom Target Set
  kind: action
  params:
    - name: msb
      type: integer
      description: MSB of zoom value (range 0-1812)
    - name: lsb
      type: integer
      description: LSB of zoom value

- id: focus_zoom_concurrent_target
  label: Focus/Zoom Concurrent Target Set
  kind: action
  params:
    - name: zoom_msb
      type: integer
      description: Zoom MSB (range 0-1812)
    - name: zoom_lsb
      type: integer
      description: Zoom LSB
    - name: focus_msb
      type: integer
      description: Focus MSB (range 0-2225)
    - name: focus_lsb
      type: integer
      description: Focus LSB

# UNRESOLVED: Image Rotate concurrent with divide/recall not fully documented in source
- id: set_status_normal_query
  label: Set-Status Normal Query
  kind: query
  params: []

- id: set_status_digital_query
  label: Set-Status Digital Query
  kind: query
  params: []

- id: message_status_query
  label: Message Status Query
  kind: query
  params: []

- id: iris_status_query
  label: Iris Status Query
  kind: query
  params: []

- id: red_status_query
  label: Red Gain Status Query
  kind: query
  params: []

- id: blue_status_query
  label: Blue Gain Status Query
  kind: query
  params: []

- id: zoom_status_query
  label: Zoom Status Query
  kind: query
  params: []

- id: focus_status_query
  label: Focus Status Query
  kind: query
  params: []

- id: focus_status_max_query
  label: Focus Status Max Query
  kind: query
  params: []

- id: focus_status_min_query
  label: Focus Status Min Query
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: message_status
  label: Message Status
  type: object
  description: |
    6-byte response to Message-Status command (0x64). Returns system status bits.
    LSB: command source (panel/remocon/RS232C/USB/mouse).
    Bit 3: AF executing. Bit 4-5: preset-exe/rotate/image-save executing.
    Device echoes command code in 1st response byte, 0x80 in 2nd byte if idle.
  fields:
    - name: status_msb
      type: integer
      description: MSB status byte
    - name: status_lsb
      type: integer
      description: LSB status byte

- id: set_status_normal
  label: Set-Status (Normal)
  type: object
  description: 6-byte response. LSB: lamp state, input sync, image mode. MSB: video standard, power, aperture, ST/DX model flag.

- id: set_status_digital
  label: Set-Status (Digital)
  type: object
  description: 6-byte response. LSB: divide position, recall number. MSB: divide on/off, multi-screen, rotate, freeze, recall states.

- id: iris_status
  label: Iris Status
  type: integer
  description: Current iris value (range 1-120)

- id: red_status
  label: Red Gain Status
  type: integer
  description: Current red gain value (range 1-200)

- id: blue_status
  label: Blue Gain Status
  type: integer
  description: Current blue gain value (range 1-200)

- id: zoom_status
  label: Zoom Status
  type: object
  description: Current zoom value (range 0-1904) as MSB/LSB.

- id: focus_status
  label: Focus Status
  type: object
  description: Current focus value (range 0-2225) as MSB/LSB.

- id: focus_status_max
  label: Focus Status Max
  type: object
  description: Maximum focus value at current zoom position (range 648-2225) as MSB/LSB.

- id: focus_status_min
  label: Focus Status Min
  type: object
  description: Minimum focus value at current zoom position (range 0-1383) as MSB/LSB.

- id: command_ack
  label: Command Acknowledgement
  type: object
  description: |
    ACK data embedded in all responses. Bit 0: ACK flag. Bits 1-4: command source (panel/RS232C/remocon/USB/mouse).
    2nd byte 0x80 indicates idle; any other value indicates system busy.

# UNRESOLVED: no explicit NACK/error response codes stated in source
```

## Variables
```yaml
# No standalone settable parameters - all params are action arguments.
# Status query commands return current state but do not have independent set-methods.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation in source.
# Device does not appear to emit unprompted responses.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Command Encoding Reference
```yaml
# Frame format: 6 bytes total
# [0xB0, CMD1, CMD2, CMD3, CMD4, 0xBF]
#
# CMD1 = command category (e.g. 0x00=system, 0x0F=power, 0x12=freeze)
# CMD2-CMD4 = command arguments or sub-command
#
# Response: [0xB0, ACK, CMD1, DATA_MSB, DATA_LSB, 0xBF]
# ACK byte: bit 0=ACK flag, bits 1-4=source
# If device busy: 2nd byte != 0x80
#
# Range notes from source:
#   Iris: 1-120
#   Red/Blue: 1-200
#   Zoom: 0-1812 (0-1904 reported by status)
#   Focus: 0-2225
#   Focus-Max: 648-2225 (varies with zoom)
#   Focus-Min: 0-1383 (varies with zoom)
#   Image save/preset slots: 1-8 (presets: 1-4)
#   Image divide: 1-9 (9 = 3×3 multi-screen)
```

## Notes
- Device uses MICOM (microcontroller) communication; RS-232 connects to MICOM side.
- "Drive Stop" (0x2F) halts iris, color, focus, and zoom drive commands mid-travel.
- Focus range is zoom-dependent; use Focus-Status(Max) and Focus-Status(Min) queries to determine valid range at current zoom.
- Image divide with number 9 triggers 3×3 multi-screen mode.
- Source document covers SDP900DXA/950DXA/990DXA; target SDP-900DXR North America uses same RS-232 protocol.
- No authentication, no login, no network/TCP/IP protocol documented.
- Serial cable: SDP-side pin 2 to PC-side pin 3 (cross-over), SDP pins 2+3 to PC pin 5 (ground).
<!-- UNRESOLVED: whether SDP-900DXR North America uses same protocol as SDP-900DXA sheet not confirmed by DXR-specific documentation -->
<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF) not stated in source -->
<!-- UNRESOLVED: actual serial port connector type not stated in source -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - manualslib.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/samsung/sdp-900dxa_rs232.pdf"
  - https://www.manualslib.com/manual/376555/Samsung-Sdp-950sta.html
retrieved_at: 2026-05-07T07:50:24.062Z
last_checked_at: 2026-06-10T00:58:19.855Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:58:19.855Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions matched literally to source commands; transport parameters verified; 1:1 coverage (56/56). (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SDP-900DXR North America-specific variant not confirmed in source; protocol derived from SDP-900DXA sheet covering same RS-232 command set."
- "flow control not stated in source"
- "port number not stated in source"
- "Image Rotate concurrent with divide/recall not fully documented in source"
- "no explicit NACK/error response codes stated in source"
- "no unsolicited event documentation in source."
- "no multi-step macro sequences documented in source."
- "no safety warnings or interlock procedures in source."
- "whether SDP-900DXR North America uses same protocol as SDP-900DXA sheet not confirmed by DXR-specific documentation"
- "flow control (RTS/CTS, XON/XOFF) not stated in source"
- "actual serial port connector type not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
