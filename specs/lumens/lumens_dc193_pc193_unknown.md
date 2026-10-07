---
spec_id: admin/lumens-dc193-pc193
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens DC193 PC193 Control Spec"
manufacturer: Lumens
model_family: DC193
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - DC193
    - PC193
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/DC193,V01_PS752,V01%20RS-232%20command%20set_1_0.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-05-13T06:50:56.016Z
last_checked_at: 2026-10-01T07:57:18.818Z
generated_at: 2026-10-01T07:57:18.818Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow control not stated in source"
  - "source does not document unsolicited event notifications"
  - "source does not document multi-step macro sequences"
  - "source contains no explicit safety warnings or interlock procedures"
  - "flow control not specified"
  - "no firmware version compatibility range stated"
  - "no unsolicited event/notification protocol documented"
  - "response timing / inter-command delay not specified"
verification:
  verdict: verified
  checked_at: 2026-10-01T07:57:18.818Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions and 17 feedback query opcodes match the source's command packet table verbatim; transport parameters (9600,8,N,1) are present. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Lumens DC193 PC193 Control Spec

## Summary
The Lumens DC193 and PC193 are document cameras / visual presenters controlled via RS-232 serial using a binary packet protocol (6-byte frames: STX A0h + command + 3 parameter bytes + ETX AFh). This spec covers 64 commands including power control, zoom, focus, brightness, capture, source switching, audio volume, and multiple query/status commands. The protocol also applies to the PS752 variant with minor parameter differences noted per command.

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
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable    # power on/off commands (B0h, B1h)
- queryable    # multiple "Call" query commands return state
- levelable    # brightness (0-105), mic volume (0-16), audio out volume (0-31)
```

## Actions
```yaml
- id: preset_factory_reset
  label: Preset / Factory Reset
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=preset load/save, 1=factory reset"
    - name: preset_op
      type: integer
      description: "When operation=0: 0=preset load, 1=preset save"
  command_bytes: [0xA0, 0x03]

- id: slideshow_on_off
  label: Slideshow On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0=off, 1=on"
  command_bytes: [0xA0, 0x04]

- id: slideshow_delay
  label: Slideshow Delay
  kind: action
  params:
    - name: delay
      type: integer
      description: "0=0.5s, 1=1s, 2=3s, 3=5s, 4=10s, 5=manual"
  command_bytes: [0xA0, 0x06]

- id: image_record_quality
  label: Image/Record Quality
  kind: action
  params:
    - name: quality
      type: integer
      description: "0=high, 1=medium, 2=low"
  command_bytes: [0xA0, 0x07]

- id: copy_nand_to_usb
  label: Copy from NAND to USB Disk
  kind: action
  params: []
  command_bytes: [0xA0, 0x08]

- id: zoom_stop
  label: Zoom Stop
  kind: action
  params: []
  command_bytes: [0xA0, 0x10]

- id: zoom_start_no_af
  label: Zoom Start (No AF)
  kind: action
  params:
    - name: direction
      type: integer
      description: "0=tele, 1=wide"
  command_bytes: [0xA0, 0x11]

- id: zoom_direct_no_af
  label: Zoom Direct (No AF)
  kind: action
  params:
    - name: value_low
      type: integer
      description: "Low byte of zoom value (0-255)"
    - name: value_high
      type: integer
      description: "High byte of zoom value (0-255)"
  command_bytes: [0xA0, 0x13]

- id: auto_erase
  label: Auto Erase
  kind: action
  params:
    - name: state
      type: integer
      description: "0=off, 1=on"
  command_bytes: [0xA0, 0x14]

- id: focus_stop
  label: Focus Stop
  kind: action
  params: []
  command_bytes: [0xA0, 0x19]

- id: focus_start
  label: Focus Start
  kind: action
  params:
    - name: direction
      type: integer
      description: "0=near, 1=far"
    - name: speed
      type: integer
      description: "Speed (0-6)"
  command_bytes: [0xA0, 0x1A]

- id: focus_direct
  label: Focus Direct
  kind: action
  params:
    - name: position_low
      type: integer
      description: "Low byte of focus position (0-536)"
    - name: position_high
      type: integer
      description: "High byte of focus position (0-536)"
    - name: speed
      type: integer
      description: "Speed (0-6)"
  command_bytes: [0xA0, 0x1B]

- id: zoom_start_with_af
  label: Zoom Start (with AF)
  kind: action
  params:
    - name: direction
      type: integer
      description: "0=tele, 1=wide"
  command_bytes: [0xA0, 0x1D]

- id: zoom_direct_with_af
  label: Zoom Direct (with AF)
  kind: action
  params:
    - name: value_low
      type: integer
      description: "Low byte of zoom value (0-255)"
    - name: value_high
      type: integer
      description: "High byte of zoom value (0-255)"
  command_bytes: [0xA0, 0x1F]

- id: white_balance
  label: White Balance (AWB / Auto Tune)
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=auto tune, 1=AWB"
  command_bytes: [0xA0, 0x22]

- id: set_pan_mode
  label: Set Pan Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0=off, 1=on"
  command_bytes: [0xA0, 0x26]

- id: mask_mode
  label: Mask Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=disable, 1=mask, 2=spotlight"
  command_bytes: [0xA0, 0x27]

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: state
      type: integer
      description: "0=off, 1=on"
  command_bytes: [0xA0, 0x2C]

- id: brightness_control
  label: Brightness Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=auto, 1=manual"
    - name: value
      type: integer
      description: "Brightness level 0-105"
  command_bytes: [0xA0, 0x30]

- id: logo_delay
  label: Logo Delay
  kind: action
  params:
    - name: seconds
      type: integer
      description: "Delay in seconds (4-30)"
  command_bytes: [0xA0, 0x34]

- id: language_select
  label: Language Select
  kind: action
  params:
    - name: language
      type: integer
      description: "0=English, 1=TradChinese, 2=SimpChinese, 3=German, 4=French, 5=Spanish, 6=Russian, 7=Dutch, 8=Finnish, 9=Polish, 10=Italian, 11=Portuguese, 12=Swedish, 13=Danish, 14=Czech, 15=Arabic, 16=Japanese, 17=Korean, 18=Greek, 20=Latvian"
  command_bytes: [0xA0, 0x38]

- id: brightness_step
  label: Brightness Step
  kind: action
  params:
    - name: direction
      type: integer
      description: "0=decrease by 1, 1=increase by 1"
  command_bytes: [0xA0, 0x39]

- id: source_live_pc
  label: Source Live/PC
  kind: action
  params:
    - name: source_out1
      type: integer
      description: "DC193: 0=camera, 1=PC, 2=source off. PS752 VGAOUT1: 0=camera, 1=PC, 2=source off"
    - name: source_out2
      type: integer
      description: "DC193: unused (00h). PS752 VGAOUT2: 0=VGAOUT1, 1=PC, 2=source off"
  command_bytes: [0xA0, 0x3A]

- id: disable_digital_zoom_after_optical
  label: Disable Digital Zoom After Optical Zoom
  kind: action
  params:
    - name: state
      type: integer
      description: "0=disable, 1=enable"
  command_bytes: [0xA0, 0x40]

- id: enable_disable_logo_image
  label: Enable/Disable Logo Image
  kind: action
  params:
    - name: logo_type
      type: integer
      description: "0=default logo, 1=user logo"
  command_bytes: [0xA0, 0x47]

- id: playback_image_index_change_page
  label: Playback Image Index Change Page
  kind: action
  params:
    - name: direction
      type: integer
      description: "0=page down, 1=page up"
  command_bytes: [0xA0, 0x4A]

- id: all_osd_on_off
  label: All OSD On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0=off, 1=on"
  command_bytes: [0xA0, 0x4B]

- id: frame_average
  label: Frame Average
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=LCD, 1=DLP"
  command_bytes: [0xA0, 0x4E]

- id: awb_correction
  label: AWB Correction
  kind: action
  params: []
  command_bytes: [0xA0, 0x56]

- id: capture_action
  label: Capture Action
  kind: action
  params:
    - name: action
      type: integer
      description: "0=single capture, 1=time lapse, 2=record, 3=disabled"
  command_bytes: [0xA0, 0x96]

- id: capture_time
  label: Capture Time
  kind: action
  params:
    - name: duration
      type: integer
      description: "0=1hr, 1=2hr, 2=4hr, 3=8hr, 4=24hr, 5=48hr, 6=72hr"
  command_bytes: [0xA0, 0x97]

- id: capture_interval
  label: Capture Interval
  kind: action
  params:
    - name: interval
      type: integer
      description: "0=3s, 1=5s, 2=10s, 3=30s, 4=1min, 5=2min, 6=5min"
  command_bytes: [0xA0, 0x98]

- id: key_function
  label: Key Function
  kind: action
  params:
    - name: key
      type: integer
      description: "1=enter, 2=up, 3=down, 4=left, 5=right, 6=menu"
  command_bytes: [0xA0, 0xA0]

- id: set_rb_gain
  label: Set R/B Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: "1=red gain, 2=blue gain"
    - name: gain_low
      type: integer
      description: "Low byte of gain (0x100-0xFFF)"
    - name: gain_high
      type: integer
      description: "High byte of gain (0x100-0xFFF)"
  command_bytes: [0xA0, 0xA1]

- id: af_one_push_trigger
  label: AF One Push Trigger
  kind: action
  params: []
  command_bytes: [0xA0, 0xA3]

- id: set_gamma_mode
  label: Set Gamma Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=photo, 1=text, 2=gray"
  command_bytes: [0xA0, 0xA7]

- id: set_image_mode
  label: Set Image Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=normal, 1=slide, 2=film, 3=microscope"
  command_bytes: [0xA0, 0xA9]

- id: system_on_off
  label: System On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0=off, 1=on"
  command_bytes: [0xA0, 0xB0]

- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0=off, 1=on"
  command_bytes: [0xA0, 0xB1]

- id: capture
  label: Capture
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=capture, 1=record"
  command_bytes: [0xA0, 0xB2]

- id: playback_thumbnail
  label: Playback Thumbnail
  kind: action
  params:
    - name: action
      type: integer
      description: "0=thumbnail"
  command_bytes: [0xA0, 0xB3]

- id: preview_rotation
  label: Preview Rotation
  kind: action
  params:
    - name: rotation
      type: integer
      description: "0=rotate 0, 1=rotate 180, 2=flip, 3=mirror"
  command_bytes: [0xA0, 0xB4]

- id: delete
  label: Delete
  kind: action
  params:
    - name: scope
      type: integer
      description: "0=delete one, 1=delete all, 2=format"
  command_bytes: [0xA0, 0xB6]

- id: lamp_on_off
  label: Lamp On/Off
  kind: action
  params:
    - name: lamp_state
      type: integer
      description: "DC193: 0=lamp+head led off, 1=lamp+head led on, 2=lamp on, 3=head led on. PS752: 0=lamp+backlight off, 1=lamp on, 2=backlight on"
  command_bytes: [0xA0, 0xC1]

- id: firmware_upgrade
  label: Firmware Upgrade
  kind: action
  params:
    - name: display_mode
      type: integer
      description: "0=with OSD, 1=no OSD"
  command_bytes: [0xA0, 0xCB]

- id: set_audio_mic_volume
  label: Set Audio Microphone Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: "Volume level (0-16)"
  command_bytes: [0xA0, 0xD4]

- id: set_audio_out_volume
  label: Set Audio Out Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: "Volume level (0-31)"
  command_bytes: [0xA0, 0xD6]
```

## Feedbacks
```yaml
- id: master_version
  label: Call Master Version
  type: string
  query_command_bytes: [0xA0, 0x45]
  response: "P1 P2 P3 returned as ASCII version number"

- id: slave_version
  label: Call Slave Version
  type: string
  query_command_bytes: [0xA0, 0x4D]
  response: "P1 P2 P3 returned as ASCII version number"

- id: ae_status
  label: Call AE Status
  type: enum
  values: [off, on]
  query_command_bytes: [0xA0, 0x46]

- id: lamp_status
  label: Call Lamp Status
  type: enum
  values: [off, lamp_and_led_on, lamp_on, led_on]
  query_command_bytes: [0xA0, 0x50]
  notes: "DC193: 0=lamp+head led off, 1=lamp+head led on, 2=lamp on, 3=head led on. PS752: 0=lamp+backlight off, 1=lamp on, 2=backlight on"

- id: text_photo_status
  label: Call Text/Photo Status
  type: enum
  values: [photo, text, gray]
  query_command_bytes: [0xA0, 0x51]

- id: ac_power_frequency
  label: Call AC 50/60 Hz Power State
  type: enum
  values: ["50Hz", "60Hz"]
  query_command_bytes: [0xA0, 0x58]
  notes: "PS752: N/A (HW has no power frequency detection)"

- id: zoom_position
  label: Call Zoom Position
  type: integer
  query_command_bytes: [0xA0, 0x60]
  response: "Low byte + high byte value. Max varies by resolution (XGA:874, SXGA:871, WXGA:871, 1080P:864, NTSC:879, PAL:879)"

- id: digital_zoom_position
  label: Call Digital Zoom Position
  type: integer
  query_command_bytes: [0xA0, 0x62]
  response: "Low byte + high byte. XGA:50, SXGA:53, WXGA:53, 1080P:60, NTSC:45, PAL:45"

- id: focus_position
  label: Call Focus Position
  type: integer
  query_command_bytes: [0xA0, 0x64]
  response: "Low byte + high byte (0-536 decimal)"

- id: freeze_status
  label: Call Freeze Status
  type: enum
  values: [off, on]
  query_command_bytes: [0xA0, 0x78]

- id: brightness_position
  label: Call Brightness Position
  type: integer
  query_command_bytes: [0xA0, 0x89]
  response: "Value 0-105 decimal"

- id: mix_zoom_position
  label: Call Mix Zoom Position
  type: integer
  query_command_bytes: [0xA0, 0x8A]
  response: "Low byte + high byte (0-255). Mix zoom: 0-924"

- id: menu_status
  label: Call Menu Status
  type: enum
  values: [off, on]
  query_command_bytes: [0xA0, 0x8B]

- id: system_status
  label: Call System Status
  type: composite
  query_command_bytes: [0xA0, 0xB7]
  response: "P1=system status (0=standby, 1=ready). P2=power status (0=off, 1=on)"

- id: call_rb_gain
  label: Call R/B Gain
  type: integer
  query_command_bytes: [0xA0, 0xA2]
  params:
    - name: channel
      type: integer
      description: "1=red gain, 2=blue gain"
  response: "Low byte + high byte (0x100-0xFFF decimal)"

- id: call_audio_mic_volume
  label: Call Audio Microphone Volume
  type: integer
  query_command_bytes: [0xA0, 0xD5]
  response: "Volume level (0-16)"

- id: call_audio_out_volume
  label: Call Audio Out Volume
  type: integer
  query_command_bytes: [0xA0, 0xD7]
  response: "Volume level (0-31)"
```

## Variables
```yaml
# No continuous settable variables beyond those represented as actions with parameters.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures
```

## Notes
- Binary protocol: 6-byte fixed-length packets. STX = A0h, ETX = AFh. Command byte + 3 parameter bytes in between.
- Return packets mirror command structure with byte 5 replaced by status byte (0=ACK/success, 1=NAK, 2=IGNORE).
- Status byte bits 6/5/4 report motor movement status for iris, zoom, and focus respectively.
- Some commands behave differently between DC193 and PS752 hardware (noted per command where source documents differences).
- RS-232 wiring: straight 2-3, 3-2, 5-5 (null modem) per DB9F pinout in source.

<!-- UNRESOLVED: flow control not specified -->
<!-- UNRESOLVED: no firmware version compatibility range stated -->
<!-- UNRESOLVED: no unsolicited event/notification protocol documented -->
<!-- UNRESOLVED: response timing / inter-command delay not specified -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/DC193,V01_PS752,V01%20RS-232%20command%20set_1_0.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-05-13T06:50:56.016Z
last_checked_at: 2026-10-01T07:57:18.818Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T07:57:18.818Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions and 17 feedback query opcodes match the source's command packet table verbatim; transport parameters (9600,8,N,1) are present. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not stated in source"
- "source does not document unsolicited event notifications"
- "source does not document multi-step macro sequences"
- "source contains no explicit safety warnings or interlock procedures"
- "flow control not specified"
- "no firmware version compatibility range stated"
- "no unsolicited event/notification protocol documented"
- "response timing / inter-command delay not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
