---
spec_id: admin/lumens-ps752
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens PS752 Control Spec"
manufacturer: Lumens
model_family: PS752
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - PS752
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS-232%20DC265%202008-1030.pdf"
  - "https://www.mylumens.com/Download/RS182%20-%20LC300_LC300S%20command%20set%20-%20LCB103.pdf"
retrieved_at: 2026-05-04T15:19:08.841Z
last_checked_at: 2026-05-16T11:30:42.826Z
generated_at: 2026-05-16T11:30:42.826Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T11:30:42.826Z
  matched_actions: 77
  action_count: 77
  confidence: high
  summary: "All 77 spec actions matched verbatim to source; 64 unique source commands fully represented; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Lumens PS752 Control Spec

## Summary

Lumens PS752 visual presenter / document camera controlled via RS-232 serial using a binary packet protocol (6-byte frames: STX A0h, command, 3 parameter bytes, ETX AFh). Covers power, zoom, focus, brightness, lamp, freeze, capture, white balance, audio volume, and source switching.

<!-- UNRESOLVED: no TCP/IP control documented; serial-only per source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: flow control not stated (defaulting to none) -->

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
traits:
  - powerable    # power on/off commands (B0h, B1h)
  - queryable    # multiple call/status query commands
  - levelable    # brightness, volume, zoom, focus position controls
```

## Actions

```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "A0 B1 01 00 00 AF"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "A0 B1 00 00 00 AF"
    params: []

  - id: system_on
    label: System On
    kind: action
    command: "A0 B0 01 00 00 AF"
    params: []

  - id: system_off
    label: System Off
    kind: action
    command: "A0 B0 00 00 00 AF"
    params: []

  - id: zoom_stop
    label: Zoom Stop
    kind: action
    command: "A0 10 00 00 00 AF"
    params: []

  - id: zoom_start
    label: Zoom Start (No AF)
    kind: action
    command: "A0 11 P1 00 00 AF"
    params:
      - name: direction
        type: enum
        values: ["tele", "wide"]
        description: "P1=00: Tele, P1=01: Wide"

  - id: zoom_direct
    label: Zoom Direct (No AF)
    kind: action
    command: "A0 13 P1 P2 00 AF"
    params:
      - name: position
        type: integer
        min: 0
        max: 255
        description: "P1=low byte, P2=high byte"

  - id: zoom_start_af
    label: Zoom Start (With AF)
    kind: action
    command: "A0 1D P1 00 00 AF"
    params:
      - name: direction
        type: enum
        values: ["tele", "wide"]
        description: "P1=00: Tele, P1=01: Wide"

  - id: zoom_direct_af
    label: Zoom Direct (With AF)
    kind: action
    command: "A0 1F P1 P2 00 AF"
    params:
      - name: position
        type: integer
        min: 0
        max: 255
        description: "P1=low byte, P2=high byte"

  - id: focus_stop
    label: Focus Stop
    kind: action
    command: "A0 19 00 00 00 AF"
    params: []

  - id: focus_start
    label: Focus Start
    kind: action
    command: "A0 1A P1 P2 00 AF"
    params:
      - name: direction
        type: enum
        values: ["near", "far"]
        description: "P1=00: Near, P1=01: Far"
      - name: speed
        type: integer
        min: 0
        max: 6
        description: "P2=00~06"

  - id: focus_direct
    label: Focus Direct
    kind: action
    command: "A0 1B P1 P2 P3 AF"
    params:
      - name: position
        type: integer
        min: 0
        max: 536
        description: "P1=low byte, P2=high byte"
      - name: speed
        type: integer
        min: 0
        max: 6
        description: "P3=00~06"

  - id: af_one_push
    label: AF One Push Trigger
    kind: action
    command: "A0 A3 01 00 00 AF"
    params: []

  - id: freeze_on
    label: Freeze On
    kind: action
    command: "A0 2C 01 00 00 AF"
    params: []

  - id: freeze_off
    label: Freeze Off
    kind: action
    command: "A0 2C 00 00 00 AF"
    params: []

  - id: brightness_control
    label: Brightness Control
    kind: action
    command: "A0 30 P1 P2 00 AF"
    params:
      - name: mode
        type: enum
        values: ["auto", "manual"]
        description: "P1=00: Auto, P1=01: Manual"
      - name: level
        type: integer
        min: 0
        max: 105
        description: "P2=00~105 (manual mode)"

  - id: brightness_step_down
    label: Brightness Step Down
    kind: action
    command: "A0 39 00 00 00 AF"
    params: []

  - id: brightness_step_up
    label: Brightness Step Up
    kind: action
    command: "A0 39 01 00 00 AF"
    params: []

  - id: white_balance
    label: White Balance
    kind: action
    command: "A0 22 P1 00 00 AF"
    params:
      - name: mode
        type: enum
        values: ["auto_tune", "awb"]
        description: "P1=00: Auto Tune, P1=01: AWB"

  - id: awb_correction
    label: AWB Correction
    kind: action
    command: "A0 56 00 00 00 AF"
    params: []

  - id: set_rb_gain
    label: Set R/B Gain
    kind: action
    command: "A0 A1 P1 P2 P3 AF"
    params:
      - name: channel
        type: enum
        values: ["red", "blue"]
        description: "P1=01: Red Gain, P1=02: Blue Gain"
      - name: gain
        type: integer
        min: 256
        max: 4095
        description: "P2(low byte) P3(high byte), hex 0x100~0xFFF"

  - id: lamp_control
    label: Lamp On/Off
    kind: action
    command: "A0 C1 P1 00 00 AF"
    params:
      - name: mode
        type: enum
        values: ["lamp_backlight_off", "lamp_on", "backlight_on"]
        description: "PS752: 00=Lamp+Backlight OFF, 01=Lamp ON, 02=Backlight ON"

  - id: source_select
    label: Source Live/PC Select
    kind: action
    command: "A0 3A P1 P2 00 AF"
    params:
      - name: vga_out_1
        type: enum
        values: ["camera", "pc", "source_off"]
        description: "P1=00: Camera, 01: PC, 02: Source OFF (VGA OUT 1)"
      - name: vga_out_2
        type: enum
        values: ["vgaout1", "pc", "source_off"]
        description: "P2=00: VGAOUT1, 01: PC, 02: Source OFF (VGA OUT 2)"

  - id: slideshow_on
    label: Slideshow On
    kind: action
    command: "A0 04 01 00 00 AF"
    params: []

  - id: slideshow_off
    label: Slideshow Off
    kind: action
    command: "A0 04 00 00 00 AF"
    params: []

  - id: slideshow_delay
    label: Slideshow Delay
    kind: action
    command: "A0 06 P1 00 00 AF"
    params:
      - name: delay
        type: enum
        values: ["0.5s", "1s", "3s", "5s", "10s", "manual"]
        description: "P1=0~5"

  - id: image_quality
    label: Image/Record Quality
    kind: action
    command: "A0 07 P1 00 00 AF"
    params:
      - name: quality
        type: enum
        values: ["high", "medium", "low"]
        description: "P1=00/01/02"

  - id: copy_nand_to_usb
    label: Copy Nand to USB Disk
    kind: action
    command: "A0 08 00 00 00 AF"
    params: []

  - id: auto_erase
    label: Auto Erase
    kind: action
    command: "A0 14 P1 00 00 AF"
    params:
      - name: state
        type: enum
        values: ["off", "on"]
        description: "P1=00/01"

  - id: pan_mode
    label: Set Pan Mode
    kind: action
    command: "A0 26 P1 00 00 AF"
    params:
      - name: state
        type: enum
        values: ["off", "on"]
        description: "P1=00/01"

  - id: mask_mode
    label: Mask Mode
    kind: action
    command: "A0 27 P1 00 00 AF"
    params:
      - name: mode
        type: enum
        values: ["disable", "mask", "spotlight"]
        description: "P1=0: Disable, 1: Mask, 2: Spotlight"

  - id: logo_delay
    label: Logo Delay
    kind: action
    command: "A0 34 P1 00 00 AF"
    params:
      - name: seconds
        type: integer
        min: 4
        max: 30
        description: "P1=4~30 seconds"

  - id: language_select
    label: Language Select
    kind: action
    command: "A0 38 P1 00 00 AF"
    params:
      - name: language
        type: integer
        min: 0
        max: 18
        description: "0=English, 1=TradChinese, 2=SimpChinese, 3=German, 4=French, 5=Spanish, 6=Russian, 7=Dutch, 8=Finnish, 9=Polish, 10=Italian, 11=Portuguese, 12=Swedish, 13=Danish, 14=Czech, 15=Arabic, 16=Japanese, 17=Korean, 18=Greek"

  - id: disable_digital_zoom
    label: Disable Digital Zoom After Optical
    kind: action
    command: "A0 40 P1 00 00 AF"
    params:
      - name: state
        type: enum
        values: ["disable", "enable"]
        description: "P1=00: Disable, 01: Enable"

  - id: enable_logo
    label: Enable/Disable Logo Image
    kind: action
    command: "A0 47 P1 00 00 AF"
    params:
      - name: type
        type: enum
        values: ["default_logo", "user_logo"]
        description: "P1=00: Default logo, 01: User logo"

  - id: playback_page_down
    label: Playback Page Down
    kind: action
    command: "A0 4A 00 00 00 AF"
    params: []

  - id: playback_page_up
    label: Playback Page Up
    kind: action
    command: "A0 4A 01 00 00 AF"
    params: []

  - id: osd_on
    label: All OSD On
    kind: action
    command: "A0 4B 01 00 00 AF"
    params: []

  - id: osd_off
    label: All OSD Off
    kind: action
    command: "A0 4B 00 00 00 AF"
    params: []

  - id: frame_average
    label: Frame Average
    kind: action
    command: "A0 4E P1 00 00 AF"
    params:
      - name: mode
        type: enum
        values: ["lcd", "dlp"]
        description: "P1=00: LCD, 01: DLP"

  - id: capture_action
    label: Capture Action
    kind: action
    command: "A0 96 P1 00 00 AF"
    params:
      - name: action
        type: enum
        values: ["single_capture", "time_lapse", "record", "disabled"]
        description: "P1=00~03"

  - id: capture_time
    label: Capture Duration
    kind: action
    command: "A0 97 P1 00 00 AF"
    params:
      - name: duration
        type: enum
        values: ["1hr", "2hr", "4hr", "8hr", "24hr", "48hr", "72hr"]
        description: "P1=00~06"

  - id: capture_interval
    label: Capture Interval
    kind: action
    command: "A0 98 P1 00 00 AF"
    params:
      - name: interval
        type: enum
        values: ["3s", "5s", "10s", "30s", "1min", "2min", "5min"]
        description: "P1=00~06"

  - id: key_function
    label: Key Function (Remote Emulation)
    kind: action
    command: "A0 A0 P1 00 00 AF"
    params:
      - name: key
        type: enum
        values: ["enter", "up", "down", "left", "right", "menu"]
        description: "P1=01~06"

  - id: set_gamma_mode
    label: Set Gamma Mode
    kind: action
    command: "A0 A7 P1 00 00 AF"
    params:
      - name: mode
        type: enum
        values: ["photo", "text", "gray"]
        description: "P1=00/01/02"

  - id: set_image_mode
    label: Set Image Mode
    kind: action
    command: "A0 A9 P1 00 00 AF"
    params:
      - name: mode
        type: enum
        values: ["normal", "slide", "film", "microscope"]
        description: "P1=00~03"

  - id: preset_load
    label: Preset Load
    kind: action
    command: "A0 03 00 00 00 AF"
    params: []

  - id: preset_save
    label: Preset Save
    kind: action
    command: "A0 03 00 01 00 AF"
    params: []

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "A0 03 01 00 00 AF"
    params: []

  - id: capture_photo
    label: Capture Photo
    kind: action
    command: "A0 B2 00 00 00 AF"
    params: []

  - id: start_recording
    label: Start Recording
    kind: action
    command: "A0 B2 01 00 00 AF"
    params: []

  - id: playback_thumbnail
    label: Playback Thumbnail
    kind: action
    command: "A0 B3 00 00 00 AF"
    params: []

  - id: preview_rotation
    label: Preview Rotation
    kind: action
    command: "A0 B4 P1 00 00 AF"
    params:
      - name: rotation
        type: enum
        values: ["rotate_0", "rotate_180", "flip", "mirror"]
        description: "P1=00~03"

  - id: delete_one
    label: Delete One
    kind: action
    command: "A0 B6 00 00 00 AF"
    params: []

  - id: delete_all
    label: Delete All
    kind: action
    command: "A0 B6 01 00 00 AF"
    params: []

  - id: format_storage
    label: Format Storage
    kind: action
    command: "A0 B6 02 00 00 AF"
    params: []

  - id: firmware_upgrade
    label: Firmware Upgrade
    kind: action
    command: "A0 CB P1 00 00 AF"
    params:
      - name: display_mode
        type: enum
        values: ["osd", "no_osd"]
        description: "P1=00: OSD, 01: No OSD"

  - id: set_mic_volume
    label: Set Microphone Volume
    kind: action
    command: "A0 D4 P1 00 00 AF"
    params:
      - name: volume
        type: integer
        min: 0
        max: 16
        description: "P1=0~16"

  - id: set_audio_out_volume
    label: Set Audio Out Volume
    kind: action
    command: "A0 D6 P1 00 00 AF"
    params:
      - name: volume
        type: integer
        min: 0
        max: 31
        description: "P1=0~31"
```

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    values: ["off", "on"]
    query_command: "A0 B7 00 00 00 AF"
    description: "Return P2=00: Off, P2=01: On"

  - id: system_status
    label: System Status
    type: enum
    values: ["standby", "ready"]
    query_command: "A0 B7 00 00 00 AF"
    description: "Return P1=00: Standby, P1=01: Ready"

  - id: lamp_status
    label: Lamp Status
    type: enum
    values: ["lamp_backlight_off", "lamp_on", "backlight_on"]
    query_command: "A0 50 00 00 00 AF"
    description: "PS752: 00=Lamp+Backlight OFF, 01=Lamp ON, 02=Backlight ON"

  - id: zoom_position
    label: Zoom Position
    type: integer
    query_command: "A0 60 00 00 00 AF"
    description: "Return P1(low byte) P2(high byte), 0~255"

  - id: digital_zoom_position
    label: Digital Zoom Position
    type: integer
    query_command: "A0 62 00 00 00 AF"
    description: "Return P1(low byte) P2(high byte)"

  - id: focus_position
    label: Focus Position
    type: integer
    query_command: "A0 64 00 00 00 AF"
    description: "Return P1(low byte) P2(high byte), 0~536"

  - id: freeze_status
    label: Freeze Status
    type: enum
    values: ["off", "on"]
    query_command: "A0 78 00 00 00 AF"

  - id: brightness_position
    label: Brightness Position
    type: integer
    query_command: "A0 89 00 00 00 AF"
    description: "Return P1=0~105"

  - id: mix_zoom_position
    label: Mix Zoom Position
    type: integer
    query_command: "A0 8A 00 00 00 AF"
    description: "Return P1(low byte) P2(high byte), 0~255; Mix Zoom 0~924"

  - id: menu_status
    label: Menu Status
    type: enum
    values: ["off", "on"]
    query_command: "A0 8B 00 00 00 AF"

  - id: master_version
    label: Master Version
    type: string
    query_command: "A0 45 00 00 00 AF"
    description: "Return P1 P2 P3 (ASCII)"

  - id: slave_version
    label: Slave Version
    type: string
    query_command: "A0 4D 00 00 00 AF"
    description: "Return P1 P2 P3 (ASCII)"

  - id: ae_status
    label: AE Status
    type: enum
    values: ["off", "on"]
    query_command: "A0 46 00 00 00 AF"

  - id: text_photo_status
    label: Text/Photo Status
    type: enum
    values: ["photo", "text", "gray"]
    query_command: "A0 51 00 00 00 AF"

  - id: ac_power_frequency
    label: AC Power Frequency
    type: string
    query_command: "A0 58 00 00 00 AF"
    description: "PS752: N/A (HW has no power frequency detection)"

  - id: rb_gain
    label: R/B Gain
    type: integer
    query_command: "A0 A2 P1 00 00 AF"
    description: "Send P1=01: Red, P1=02: Blue. Return P1(low) P2(high), 0x100~0xFFF"

  - id: mic_volume
    label: Microphone Volume
    type: integer
    query_command: "A0 D5 00 00 00 AF"
    description: "Return P1=0~16"

  - id: audio_out_volume
    label: Audio Out Volume
    type: integer
    query_command: "A0 D7 00 00 00 AF"
    description: "Return P1=0~31"

  - id: communication_response
    label: Communication Response
    type: enum
    values: ["ack", "nak", "ignore", "not_used"]
    description: "Byte 5 Status field bits 1:0. ACK=normal, NAK=error in command packet, IGNORE=cannot execute"
```

## Variables

```yaml
variables:
  - id: zoom_position
    label: Zoom Position
    type: integer
    min: 0
    max: 255
    set_command: "A0 13 P1 P2 00 AF"
    description: "P1=low byte, P2=high byte"

  - id: focus_position
    label: Focus Position
    type: integer
    min: 0
    max: 536
    set_command: "A0 1B P1 P2 P3 AF"
    description: "P1(low) P2(high), P3=speed 0~6"

  - id: brightness
    label: Brightness
    type: integer
    min: 0
    max: 105
    set_command: "A0 30 01 P2 00 AF"
    description: "Manual mode: P2=00~105"

  - id: mic_volume
    label: Microphone Volume
    type: integer
    min: 0
    max: 16
    set_command: "A0 D4 P1 00 00 AF"

  - id: audio_out_volume
    label: Audio Out Volume
    type: integer
    min: 0
    max: 31
    set_command: "A0 D6 P1 00 00 AF"
```

## Events

```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes

- Binary protocol: 6-byte fixed-length packets. STX=A0h, ETX=AFh. Byte 2=command, bytes 3-5=parameters (P1, P2, P3).
- Return packets use same format; byte 5 is Status byte encoding movement states (iris, zoom, focus) and communication response bits.
- Communication response: ACK (0,0)=success, NAK (0,1)=packet error/out-of-range, IGNORE (1,0)=cannot execute/unsupported.
- Some commands differ between DC193 and PS752 (e.g., source select has dual VGA outputs on PS752; lamp modes differ).
- RS-232 pinout: DB9F pin 2↔3, pin 3↔2, pin 5↔5 (null modem).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no flow control setting stated in source -->
<!-- UNRESOLVED: response timing / latency not specified -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS-232%20DC265%202008-1030.pdf"
  - "https://www.mylumens.com/Download/RS182%20-%20LC300_LC300S%20command%20set%20-%20LCB103.pdf"
retrieved_at: 2026-05-04T15:19:08.841Z
last_checked_at: 2026-05-16T11:30:42.826Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T11:30:42.826Z
matched_actions: 77
action_count: 77
confidence: high
summary: "All 77 spec actions matched verbatim to source; 64 unique source commands fully represented; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
