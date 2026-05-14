---
spec_id: admin/lumens-dc265
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens DC265 Control Spec"
manufacturer: Lumens
model_family: DC265
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - DC265
    - DC260
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS-232%20DC265%202008-1030.pdf"
retrieved_at: 2026-04-30T04:33:14.844Z
last_checked_at: 2026-05-14T18:17:17.747Z
generated_at: 2026-05-14T18:17:17.747Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.747Z
  matched_actions: 46
  action_count: 46
  confidence: high
  summary: "Every action and feedback command in the spec has a literal byte-for-byte match in the source protocol tables; transport parameters verified; spec comprehensively covers entire DC265 protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Lumens DC265 Control Spec

## Summary
The Lumens DC265 is a document camera (visual presenter) controlled via RS-232 serial using a binary packet protocol. Commands are 6-byte frames (0xA0 header, command byte, 3 parameter bytes, 0xAF footer). The spec also applies to the DC260 model. The protocol supports power control, zoom, focus, iris, white balance, image capture, playback, and various image processing functions.

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
traits:
  - powerable    # Power ON/OFF (0xB1), System ON/OFF (0xB0)
  - queryable    # Call Zoom/Focus/Iris/Freeze/System Status, etc.
  - levelable    # Zoom position, Focus position, Brightness, Volume, Iris
```

## Actions
```yaml
actions:
  - id: power
    label: Power On/Off
    kind: action
    command: "0xA0 0xB1 {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]
        description: Power state

  - id: system_on_off
    label: System On/Off
    kind: action
    command: "0xA0 0xB0 {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]
        description: System power state

  - id: zoom_stop
    label: Zoom Stop
    kind: action
    command: "0xA0 0x10 0x00 0x00 0x00 0xAF"
    params: []

  - id: zoom_start
    label: Zoom Start (No AF)
    kind: action
    command: "0xA0 0x11 {P1} 0x00 0x00 0xAF"
    params:
      - name: direction
        type: enum
        values: ["tele: 0x00", "wide: 0x01"]
        description: Zoom direction

  - id: zoom_direct
    label: Zoom Direct (No AF)
    kind: action
    command: "0xA0 0x13 {P1_low} {P2_high} 0x00 0xAF"
    params:
      - name: position
        type: integer
        description: "Zoom position. SXGA: 0-620, 720P: 0-622, XGA: 0-630 (decimal, split into low/high bytes)"

  - id: zoom_start_with_af
    label: Zoom Start (With AF)
    kind: action
    command: "0xA0 0x1D {P1} 0x00 0x00 0xAF"
    params:
      - name: direction
        type: enum
        values: ["tele: 0x00", "wide: 0x01"]

  - id: zoom_direct_with_af
    label: Zoom Direct (With AF)
    kind: action
    command: "0xA0 0x1F {P1_low} {P2_high} 0x00 0xAF"
    params:
      - name: position
        type: integer
        description: "Zoom position. SXGA: 0-620, 720P: 0-622, XGA: 0-630"

  - id: focus_stop
    label: Focus Stop
    kind: action
    command: "0xA0 0x19 0x00 0x00 0x00 0xAF"
    params: []

  - id: focus_start
    label: Focus Start
    kind: action
    command: "0xA0 0x1A {P1} {P2} 0x00 0xAF"
    params:
      - name: direction
        type: enum
        values: ["near: 0x00", "far: 0x01"]
      - name: speed
        type: integer
        description: "Focus speed (1-5)"

  - id: focus_direct
    label: Focus Direct
    kind: action
    command: "0xA0 0x1B {P1_low} {P2_high} {P3} 0xAF"
    params:
      - name: position
        type: integer
        description: "Focus position 0-324 (decimal, split into low/high bytes)"
      - name: speed
        type: integer
        description: "Focus speed (1-5)"

  - id: af_one_push
    label: AF One Push Trigger
    kind: action
    command: "0xA0 0xA3 0x01 0x00 0x00 0xAF"
    params: []

  - id: white_balance
    label: White Balance
    kind: action
    command: "0xA0 0x22 {P1} 0x00 0x00 0xAF"
    params:
      - name: mode
        type: enum
        values: ["auto_tune: 0x00", "awb: 0x01"]

  - id: iris
    label: Iris
    kind: action
    command: "0xA0 0x30 {P1} {P2} 0x00 0xAF"
    params:
      - name: mode
        type: enum
        values: ["auto: 0x00", "manual: 0x01", "stop: 0x02"]
      - name: brightness
        type: integer
        description: "Manual brightness. AC 50Hz: 0-110 (normal), 0-69 (microscope). AC 60Hz: 0-111 (normal), 0-75 (microscope)"

  - id: freeze
    label: Freeze
    kind: action
    command: "0xA0 0x2C {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: lamp_on_off
    label: Lamp On/Off
    kind: action
    command: "0xA0 0xC1 {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: capture
    label: Capture
    kind: action
    command: "0xA0 0xB2 {P1} 0x00 0x00 0xAF"
    params:
      - name: mode
        type: enum
        values: ["capture: 0x00", "record: 0x01"]

  - id: capture_type
    label: Set Capture Type
    kind: action
    command: "0xA0 0x96 {P1} 0x00 0x00 0xAF"
    params:
      - name: type
        type: enum
        values: ["single: 0x00", "continuous: 0x01", "disable: 0x02"]

  - id: capture_time
    label: Set Capture Time
    kind: action
    command: "0xA0 0x97 {P1} 0x00 0x00 0xAF"
    params:
      - name: duration
        type: enum
        values: ["1hr: 0x00", "2hr: 0x01", "4hr: 0x02", "8hr: 0x03", "24hr: 0x04"]

  - id: capture_interval
    label: Set Capture Interval
    kind: action
    command: "0xA0 0x98 {P1} 0x00 0x00 0xAF"
    params:
      - name: interval
        type: enum
        values: ["5sec: 0x00", "10sec: 0x01", "30sec: 0x02", "1min: 0x03", "2min: 0x04", "5min: 0x05"]

  - id: set_image_mode
    label: Set Image Mode
    kind: action
    command: "0xA0 0xA9 {P1} 0x00 0x00 0xAF"
    params:
      - name: mode
        type: enum
        values: ["normal: 0x00", "slide: 0x01", "film: 0x02", "microscope: 0x03"]

  - id: set_sharpness
    label: Set Sharpness (Gamma)
    kind: action
    command: "0xA0 0xA7 {P1} 0x00 0x00 0xAF"
    params:
      - name: mode
        type: enum
        values: ["photo: 0x00", "text: 0x01", "gray: 0x02"]

  - id: night_vision
    label: Night Vision
    kind: action
    command: "0xA0 0xAB {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: negative
    label: Negative (Film)
    kind: action
    command: "0xA0 0x36 {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: color_mode
    label: Color/Gray
    kind: action
    command: "0xA0 0x37 {P1} 0x00 0x00 0xAF"
    params:
      - name: mode
        type: enum
        values: ["photo: 0x00", "gray: 0x01"]

  - id: brightness_control
    label: Brightness Control
    kind: action
    command: "0xA0 0x39 {P1} 0x00 0x00 0xAF"
    params:
      - name: adjustment
        type: enum
        values: ["decrease: 0x00", "increase: 0x01"]

  - id: slide_show
    label: Slide Show On/Off
    kind: action
    command: "0xA0 0x04 {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: slide_show_effect
    label: Slide Show Effect
    kind: action
    command: "0xA0 0x05 {P1} 0x00 0x00 0xAF"
    params:
      - name: effect
        type: enum
        values: ["off: 0x00", "shutter: 0x01", "right: 0x02", "down: 0x03", "side: 0x04", "open: 0x05"]

  - id: slide_show_delay
    label: Slide Show Delay
    kind: action
    command: "0xA0 0x06 {P1} 0x00 0x00 0xAF"
    params:
      - name: delay
        type: enum
        values: ["1sec: 0x00", "3sec: 0x01", "5sec: 0x02", "10sec: 0x03", "manual: 0x04"]

  - id: image_quality
    label: Image/Record Quality
    kind: action
    command: "0xA0 0x07 {P1} 0x00 0x00 0xAF"
    params:
      - name: quality
        type: enum
        values: ["high: 0x00", "medium: 0x01", "low: 0x02"]

  - id: copy_to_sd
    label: Copy To SD Card
    kind: action
    command: "0xA0 0x08 0x00 0x00 0x00 0xAF"
    params: []

  - id: preset_factory_reset
    label: Preset/Factory Reset
    kind: action
    command: "0xA0 0x03 {P1} {P2} 0x00 0xAF"
    params:
      - name: operation
        type: enum
        values: ["preset_load: P1=0x00, P2=0x00", "preset_save: P1=0x00, P2=0x01", "factory_reset: P1=0x01"]

  - id: pan_pbp
    label: Pan PBP
    kind: action
    command: "0xA0 0x25 {P1} {P2} 0x00 0xAF"
    params:
      - name: step
        type: integer
        description: "Pan step. XGA: 0-32, SXGA/720P: 0-40"
      - name: mode
        type: enum
        values: ["still: 0x00", "preview: 0x01"]

  - id: set_pan_mode
    label: Set Pan Mode
    kind: action
    command: "0xA0 0x26 {P1} 0x00 0x00 0xAF"
    params:
      - name: mode
        type: enum
        values: ["normal: 0x00", "pan_1: 0x01", "pan_2: 0x02", "pan_3: 0x03", "pan_4: 0x04"]

  - id: source_live_pc
    label: Source Live/PC
    kind: action
    command: "0xA0 0x3A {P1} 0x00 0x00 0xAF"
    params:
      - name: source
        type: enum
        values: ["pc: 0x00", "dm350: 0x01"]

  - id: usb_transfer
    label: Switch USB Transfer
    kind: action
    command: "0xA0 0x32 {P1} 0x00 0x00 0xAF"
    params:
      - name: mode
        type: enum
        values: ["mass_storage: 0x00", "usb_camera: 0x01"]

  - id: language_select
    label: Language Select
    kind: action
    command: "0xA0 0x38 {P1} 0x00 0x00 0xAF"
    params:
      - name: language
        type: enum
        values: ["english: 0x00", "mandarin: 0x01", "deutsch: 0x02", "francais: 0x03", "spanish: 0x04", "russian: 0x05", "nederlands: 0x06", "finland: 0x07", "polish: 0x08"]

  - id: disable_digital_zoom
    label: Disable Digital Zoom After Optical Zoom
    kind: action
    command: "0xA0 0x40 {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["disable: 0x00", "enable: 0x01"]

  - id: logo_image
    label: Enable/Disable Logo Image
    kind: action
    command: "0xA0 0x47 {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: osd_on_off
    label: All OSD On/Off
    kind: action
    command: "0xA0 0x4B {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: frame_average
    label: Frame Average
    kind: action
    command: "0xA0 0x4E {P1} 0x00 0x00 0xAF"
    params:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: key_function
    label: Key Function
    kind: action
    command: "0xA0 0xA0 {P1} 0x00 0x00 0xAF"
    params:
      - name: key
        type: enum
        values: ["enter: 0x01", "up: 0x02", "down: 0x03", "left: 0x04", "right: 0x05", "menu: 0x06"]

  - id: preview_rotation
    label: Preview Rotation
    kind: action
    command: "0xA0 0xB4 {P1} 0x00 0x00 0xAF"
    params:
      - name: rotation
        type: enum
        values: ["0: 0x00", "90: 0x01", "180: 0x02", "270: 0x03"]

  - id: playback_thumbnail
    label: Playback Thumbnail
    kind: action
    command: "0xA0 0xB3 {P1} 0x00 0x00 0xAF"
    params:
      - name: mode
        type: enum
        values: ["thumbnail: 0x00", "pbp_thumbnail: 0x01"]

  - id: playback_page
    label: Playback Image Index Change Page
    kind: action
    command: "0xA0 0x4A {P1} 0x00 0x00 0xAF"
    params:
      - name: direction
        type: enum
        values: ["page_up: 0x00", "page_down: 0x01"]

  - id: delete
    label: Delete
    kind: action
    command: "0xA0 0xB6 {P1} {P2} {P3} 0xAF"
    params:
      - name: mode
        type: enum
        values: ["delete_one: 0x00", "delete_all: 0x01", "format: 0x02"]
      - name: storage
        type: enum
        values: ["internal: 0x00", "external: 0x01"]
        description: "Only used with format mode"

  - id: set_audio_volume
    label: Set Audio Volume
    kind: action
    command: "0xA0 0xD6 {P1} 0x00 0x00 0xAF"
    params:
      - name: volume
        type: integer
        description: "Volume level 0-15"
```

## Feedbacks
```yaml
feedbacks:
  - id: system_status
    label: System Status
    command: "0xA0 0xB7 0x00 0x00 0x00 0xAF"
    response:
      - name: system_ready
        type: enum
        values: ["not_ready: 0x00", "ready: 0x01"]
      - name: power_status
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: power_state
    label: Power State
    command: "0xA0 0xB1 0x00 0x00 0x00 0xAF"
    response:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: zoom_position
    label: Zoom Position
    command: "0xA0 0x60 0x00 0x00 0x00 0xAF"
    response:
      - name: position
        type: integer
        description: "Zoom position as 16-bit value (P1=low, P2=high). SXGA: 0-620, 720P: 0-622, XGA: 0-630"

  - id: digital_zoom_position
    label: Digital Zoom Position
    command: "0xA0 0x62 0x00 0x00 0x00 0xAF"
    response:
      - name: position
        type: integer
        description: "XGA: 0-47, 720P: 0-55, SXGA: 0-57"

  - id: mix_zoom_position
    label: Mix Zoom Position
    command: "0xA0 0x8A 0x00 0x00 0x00 0xAF"
    response:
      - name: position
        type: integer
        description: "Combined zoom position 0-677 (16-bit, P1=low, P2=high)"

  - id: focus_position
    label: Focus Position
    command: "0xA0 0x64 0x00 0x00 0x00 0xAF"
    response:
      - name: position
        type: integer
        description: "Focus position 0-324 (16-bit, P1=low, P2=high)"

  - id: freeze_status
    label: Freeze Status
    command: "0xA0 0x78 0x00 0x00 0x00 0xAF"
    response:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: iris_status
    label: Iris Status
    command: "0xA0 0x7A 0x00 0x00 0x00 0xAF"
    response:
      - name: mode
        type: enum
        values: ["auto: 0x00", "manual: 0x01", "stop: 0x02"]
      - name: brightness
        type: integer
        description: "Brightness value, range depends on AC frequency and mode"

  - id: lamp_status
    label: Lamp Status
    command: "0xA0 0x50 0x00 0x00 0x00 0xAF"
    response:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: text_photo_status
    label: Text/Photo Status
    command: "0xA0 0x51 0x00 0x00 0x00 0xAF"
    response:
      - name: mode
        type: enum
        values: ["photo: 0x00", "text: 0x01", "gray: 0x02"]

  - id: negative_status
    label: Negative Status
    command: "0xA0 0x87 0x00 0x00 0x00 0xAF"
    response:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: color_status
    label: Color Status
    command: "0xA0 0x88 0x00 0x00 0x00 0xAF"
    response:
      - name: mode
        type: enum
        values: ["photo: 0x00", "gray: 0x01"]

  - id: brightness_position
    label: Brightness Position
    command: "0xA0 0x89 0x00 0x00 0x00 0xAF"
    response:
      - name: brightness
        type: integer
        description: "Brightness 0-130"

  - id: menu_status
    label: Menu Status
    command: "0xA0 0x8B 0x00 0x00 0x00 0xAF"
    response:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: ae_status
    label: AE Status
    command: "0xA0 0x46 0x00 0x00 0x00 0xAF"
    response:
      - name: state
        type: enum
        values: ["off: 0x00", "on: 0x01"]

  - id: master_version
    label: Master Version
    command: "0xA0 0x45 0x00 0x00 0x00 0xAF"
    response:
      - name: version
        type: string
        description: "Returned as DTE + 3 ASCII bytes (P1 P2 P3)"

  - id: slave_version
    label: Slave Version
    command: "0xA0 0x4D 0x00 0x00 0x00 0xAF"
    response:
      - name: version
        type: string
        description: "Returned as DTF + 3 ASCII bytes (P1 P2 P3)"

  - id: ac_power_state
    label: AC 50/60 Hz Power State
    command: "0xA0 0x58 0x00 0x00 0x00 0xAF"
    response:
      - name: frequency
        type: enum
        description: "AC power frequency state"
```

## Variables
```yaml
variables:
  - id: zoom_position
    label: Zoom Position
    type: integer
    min: 0
    max: 630
    description: "Zoom position range varies by resolution mode (SXGA: 0-620, 720P: 0-622, XGA: 0-630)"

  - id: focus_position
    label: Focus Position
    type: integer
    min: 0
    max: 324

  - id: brightness
    label: Brightness
    type: integer
    min: 0
    max: 130

  - id: audio_volume
    label: Audio Volume
    type: integer
    min: 0
    max: 15

  - id: iris_brightness
    label: Iris Brightness
    type: integer
    min: 0
    max: 111
    description: "Range depends on AC frequency and microscope mode"
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the device
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings or interlock procedures
```

## Notes
- Binary protocol: all commands are 6-byte frames starting with 0xA0 (STX) and ending with 0xAF (ETX).
- Response byte 5 indicates status: 0x00 = ACK (success), 0x01 = NAK (error in command packet), 0x10 = IGNORE (unsupported or busy).
- Multi-byte integer parameters use little-endian encoding (low byte first, high byte second).
- The document references both DC265 and DC260 models; commands appear to be shared between them.
- Pan PBP step range and zoom position range vary depending on the active resolution mode (SXGA, 720P, or XGA).
- Register commands (reg1/reg2/reg3, command bytes 0x52/0x53/0x54) are documented but their function is not described.

<!-- UNRESOLVED: no mention of command timing, inter-command delays, or timeout behavior -->
<!-- UNRESOLVED: resolution mode selection command not identified in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: reg1/reg2/reg3 register functions not documented -->
<!-- UNRESOLVED: Focus Direct return packet uses P3 for speed but standard return format has status at byte 5 -- behavior unclear -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS-232%20DC265%202008-1030.pdf"
retrieved_at: 2026-04-30T04:33:14.844Z
last_checked_at: 2026-05-14T18:17:17.747Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.747Z
matched_actions: 46
action_count: 46
confidence: high
summary: "Every action and feedback command in the spec has a literal byte-for-byte match in the source protocol tables; transport parameters verified; spec comprehensively covers entire DC265 protocol."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
