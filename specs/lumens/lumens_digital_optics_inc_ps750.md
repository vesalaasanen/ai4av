---
spec_id: admin/lumens-digital-optics-inc-ps750
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens PS750 Control Spec"
manufacturer: Lumens
model_family: PS750
aliases: []
compatible_with:
  manufacturers:
    - Lumens
    - "Lumens Digital Optics Inc"
  models:
    - PS750
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/Lumens/PS750/ps750_doc_6.pdf"
retrieved_at: 2026-04-30T04:36:37.918Z
last_checked_at: 2026-06-02T04:56:24.310Z
generated_at: 2026-06-02T04:56:24.310Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility, error-recovery sequence, and any safety interlocks are not documented in the source."
  - "flow control not stated in source"
  - "P2 range 0x00-0xff is documented but the value mapping is not specified in source"
  - "DIP switch bit-to-value mapping not specified in source"
  - "firmware version compatibility, electrical specs (voltage/current), and any safety interlocks are not documented in the source."
verification:
  verdict: verified
  checked_at: 2026-06-02T04:56:24.310Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 spec actions matched literally to source rows with correct opcodes and parameters; transport fully verified; one-to-one coverage achieved. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Lumens PS750 Control Spec

## Summary
The Lumens PS750 is a document camera / visualizer controllable over RS-232 using a fixed 6-byte binary packet format. This spec covers the complete 79-command set for image capture, optics (zoom/focus/iris), slide show, playback, white balance, source routing, and system control.

<!-- UNRESOLVED: firmware compatibility, error-recovery sequence, and any safety interlocks are not documented in the source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  # UNRESOLVED: flow control not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from System ON/OFF and Power commands
- queryable       # inferred from Call X status query commands
- routable        # inferred from Source live/PC and Source Monitor commands
- levelable       # inferred from Audio Volume, Brightness, Iris, Zoom, Focus commands
```

## Actions
```yaml
# Packet format: A0h STX | CMDh | P1 | P2 | P3 | AFh ETX
# All payloads are literal 6-byte hex sequences from the source.

- id: preset_factory_reset
  label: Preset / Factory Reset
  kind: action
  command: "A0 03 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: 0=Preset, 1=Factory Reset
    - name: p2
      type: integer
      description: When p1=0: 00=Load, 01=Save. Ignored when p1=1.

- id: slide_show
  label: Slide show On/Off
  kind: action
  command: "A0 04 {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: slide_show_effect
  label: Slide show Effect
  kind: action
  command: "A0 05 {effect} 00 00 AF"
  params:
    - name: effect
      type: integer
      description: 0=Off, 1=Shutter, 2=Right, 3=Down, 4=Side, 5=Open

- id: slide_show_delay
  label: Slide show Delay
  kind: action
  command: "A0 06 {delay} 00 00 AF"
  params:
    - name: delay
      type: integer
      description: 0=1s, 1=3s, 2=5s, 3=10s, 4=Manual

- id: image_record_quality
  label: Image / Record Quality
  kind: action
  command: "A0 07 {quality} 00 00 AF"
  params:
    - name: quality
      type: integer
      description: 0=High, 1=Medium, 2=Low

- id: copy_to_sd_card
  label: Copy To SD Card
  kind: action
  command: "A0 08 00 00 00 AF"
  params: []

- id: zoom_stop
  label: Zoom Stop
  kind: action
  command: "A0 10 00 00 00 AF"
  params: []

- id: zoom_start_no_af
  label: Zoom Start (No AF)
  kind: action
  command: "A0 11 {direction} 00 00 AF"
  params:
    - name: direction
      type: integer
      description: 0=Tele, 1=Wide

- id: zoom_direct_no_af
  label: Zoom Direct (No AF)
  kind: action
  command: "A0 13 {pos_lo} {pos_hi} 00 AF"
  params:
    - name: pos_lo
      type: integer
      description: Zoom position low byte (SXGA:0-33, WXGA:0-35, XGA:0-43)
    - name: pos_hi
      type: integer
      description: Zoom position high byte

- id: auto_erase
  label: Auto Erase
  kind: action
  command: "A0 14 {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Auto Erase Off, 1=Auto Erase On

- id: digital_zoom_limit
  label: Digital Zoom Limit
  kind: action
  command: "A0 15 {limit} 00 00 AF"
  params:
    - name: limit
      type: integer
      description: 1=1x, 2=2x, 3=3x, 4=4x

- id: digital_zoom_direct
  label: Digital Zoom Direct
  kind: action
  command: "A0 18 {pos} 00 00 AF"
  params:
    - name: pos
      type: integer
      description: "Digital zoom position. Rotate 0/180: XGA 0-63, WXGA 0-71, SXGA 0-73. Rotate 90/270 (SXGA/WXGA/XGA): 0-78"

- id: focus_stop
  label: Focus Stop
  kind: action
  command: "A0 19 00 00 00 AF"
  params: []

- id: focus_start
  label: Focus Start
  kind: action
  command: "A0 1A {direction} {speed} 00 AF"
  params:
    - name: direction
      type: integer
      description: 0=Near, 1=Far
    - name: speed
      type: integer
      description: 1-5 (speed level)

- id: focus_direct
  label: Focus Direct (No Limit)
  kind: action
  command: "A0 1B {pos_lo} {pos_hi} {speed} AF"
  params:
    - name: pos_lo
      type: integer
      description: Focus position low byte
    - name: pos_hi
      type: integer
      description: Focus position high byte (combined 0-258 decimal)
    - name: speed
      type: integer
      description: 1-5 (speed level)

- id: zoom_start_with_af
  label: Zoom Start (with AF)
  kind: action
  command: "A0 1D {direction} 00 00 AF"
  params:
    - name: direction
      type: integer
      description: 0=Tele, 1=Wide

- id: zoom_direct_with_af
  label: Zoom Direct (with AF)
  kind: action
  command: "A0 1F {pos_lo} {pos_hi} {speed} AF"
  params:
    - name: pos_lo
      type: integer
      description: Zoom position low byte (SXGA:0-33, WXGA:0-35, XGA:0-43)
    - name: pos_hi
      type: integer
      description: Zoom position high byte
    - name: speed
      type: integer
      description: AF speed (range not stated in source)

- id: white_balance_auto
  label: White Balance (Auto Tune / AWB)
  kind: action
  command: "A0 22 {mode} 00 00 AF"
  params:
    - name: mode
      type: integer
      description: 0=Auto Tune, 1=AWB

- id: white_balance_manual
  label: White Balance Manual
  kind: action
  command: "A0 23 {red_gain} {blue_gain} 00 AF"
  params:
    - name: red_gain
      type: integer
      description: 1=+1 Red, 2=-1 Red
    - name: blue_gain
      type: integer
      description: 1=+1 Blue, 2=-1 Blue

- id: pan_pbp
  label: Pan PBP
  kind: action
  command: "A0 25 {step} {mode} 00 AF"
  params:
    - name: step
      type: integer
      description: XGA: 0-32 step, SXGA/WXGA: 0-40 step
    - name: mode
      type: integer
      description: 0=Still, 1=Preview

- id: set_pan_mode
  label: Set Pan Mode
  kind: action
  command: "A0 26 {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: call_dip_switch_value
  label: Call DIP Switch Value
  kind: query
  command: "A0 29 00 00 00 AF"
  params: []

- id: freeze
  label: Freeze
  kind: action
  command: "A0 2C {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: iris
  label: Iris
  kind: action
  command: "A0 30 {mode} {brightness} 00 AF"
  params:
    - name: mode
      type: integer
      description: 0=Auto, 1=Manual, 2=Stop (Normal AC 50/60Hz)
    - name: brightness
      type: integer
      description: "Brightness level. Normal AC: 00-75, Microscope AC 50Hz: 00-86, Microscope AC 60Hz: 00-69"

- id: switch_usb_transfer
  label: Switch USB Transfer
  kind: action
  command: "A0 32 {mode} 00 00 AF"
  params:
    - name: mode
      type: integer
      description: 0=Mass Storage, 1=USB Camera

- id: logo_delay
  label: LogoDelay
  kind: action
  command: "A0 34 {seconds} 00 00 AF"
  params:
    - name: seconds
      type: integer
      description: 0-30 seconds

- id: negative
  label: Negative (film)
  kind: action
  command: "A0 36 {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: color
  label: Color (gray)
  kind: action
  command: "A0 37 {mode} 00 00 AF"
  params:
    - name: mode
      type: integer
      description: 0=Photo, 1=Gray

- id: language_select
  label: Language Select
  kind: action
  command: "A0 38 {language} 00 00 AF"
  params:
    - name: language
      type: integer
      description: "0=English, 1=Traditional Chinese, 2=German, 3=French, 4=Spanish, 5=Russian, 6=Dutch, 7=Finnish, 8=Polish, 9=Italian, 10=Portuguese, 11=Swedish, 12=Czech"

- id: brightness_control
  label: Brightness Control
  kind: action
  command: "A0 39 {direction} 00 00 AF"
  params:
    - name: direction
      type: integer
      description: 0=-1, 1=+1

- id: source_live_pc
  label: Source live/PC
  kind: action
  command: "A0 3A 00 00 00 AF"
  params: []

- id: source_monitor
  label: Source Monitor
  kind: action
  command: "A0 3C 00 00 00 AF"
  params: []

- id: disable_digital_zoom_after_optical
  label: Disable Digital Zoom After Optical Zoom
  kind: action
  command: "A0 40 {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Disable, 1=Enable

- id: call_master_version
  label: Call Master Version
  kind: query
  command: "A0 45 00 00 00 AF"
  params: []

- id: call_ae_status
  label: Call AE Status
  kind: query
  command: "A0 46 00 00 00 AF"
  params: []

- id: enable_disable_logo
  label: Enable/Disable LOGO Image
  kind: action
  command: "A0 47 {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: playback_image_index_change_page
  label: Playback Image Index Change Page
  kind: action
  command: "A0 4A {direction} 00 00 AF"
  params:
    - name: direction
      type: integer
      description: 0=Page Up, 1=Page Down

- id: call_slave_version
  label: Call Slave Version
  kind: query
  command: "A0 4D 00 00 00 AF"
  params: []

- id: frame_average
  label: Frame Average
  kind: action
  command: "A0 4E {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: call_lamp_status
  label: Call Lamp Status
  kind: query
  command: "A0 50 00 00 00 AF"
  params: []

- id: call_text_photo_status
  label: Call Text/Photo Status
  kind: query
  command: "A0 51 {mode} {op} 00 AF"
  params:
    - name: mode
      type: integer
      description: 0=Photo, 1=Text, 2=Gray
    - name: op
      type: integer
      description: 0=Read, 1=Write
  # UNRESOLVED: P2 range 0x00-0xff is documented but the value mapping is not specified in source

- id: reg1
  label: reg1
  kind: action
  command: "A0 52 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: Register 1 parameter 1 (range/meaning not stated in source)
    - name: p2
      type: integer
      description: Register 1 parameter 2 (range/meaning not stated in source)

- id: reg2
  label: reg2
  kind: action
  command: "A0 53 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: Register 2 parameter 1 (range/meaning not stated in source)
    - name: p2
      type: integer
      description: Register 2 parameter 2 (range/meaning not stated in source)

- id: reg3
  label: reg3
  kind: action
  command: "A0 54 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: Register 3 parameter 1 (range/meaning not stated in source)
    - name: p2
      type: integer
      description: Register 3 parameter 2 (range/meaning not stated in source)

- id: call_ac_power_state
  label: Call AC Power State
  kind: query
  command: "A0 58 00 00 00 AF"
  params: []

- id: call_zoom_position
  label: Call Zoom Position
  kind: query
  command: "A0 60 00 00 00 AF"
  params: []

- id: call_digital_zoom_position
  label: Call Digital Zoom Position
  kind: query
  command: "A0 62 00 00 00 AF"
  params: []

- id: call_focus_position
  label: Call Focus Position
  kind: query
  command: "A0 64 00 00 00 AF"
  params: []

- id: call_freeze_status
  label: Call Freeze Status
  kind: query
  command: "A0 78 00 00 00 AF"
  params: []

- id: call_iris_status
  label: Call Iris Status
  kind: query
  command: "A0 7A 00 00 00 AF"
  params: []

- id: call_negative
  label: Call Negative
  kind: query
  command: "A0 87 00 00 00 AF"
  params: []

- id: call_color
  label: Call Color
  kind: query
  command: "A0 88 00 00 00 AF"
  params: []

- id: call_brightness_position
  label: Call Brightness Position
  kind: query
  command: "A0 89 00 00 00 AF"
  params: []

- id: call_mix_zoom_position
  label: Call Mix Zoom Position
  kind: query
  command: "A0 8A 00 00 00 AF"
  params: []

- id: call_menu_status
  label: Call Menu Status
  kind: query
  command: "A0 8B 00 00 00 AF"
  params: []

- id: capture_type
  label: Capture Type
  kind: action
  command: "A0 96 {mode} 00 00 AF"
  params:
    - name: mode
      type: integer
      description: 0=Single, 1=Continuous, 2=Disable

- id: capture_time
  label: Capture Time
  kind: action
  command: "A0 97 {duration} 00 00 AF"
  params:
    - name: duration
      type: integer
      description: 0=1hr, 1=2hr, 2=4hr, 3=8hr, 4=24hr

- id: capture_interval
  label: Capture Interval
  kind: action
  command: "A0 98 {interval} 00 00 AF"
  params:
    - name: interval
      type: integer
      description: 0=5sec, 1=10sec, 2=30sec, 3=1min, 4=2min, 5=5min

- id: key_function
  label: Key Function
  kind: action
  command: "A0 A0 {key} 00 00 AF"
  params:
    - name: key
      type: integer
      description: 1=Enter, 2=Up, 3=Down, 4=Left, 5=Right, 6=Menu

- id: set_rb_gain
  label: Set R/B Gain
  kind: action
  command: "A0 A1 {channel} {gain_lo} {gain_hi} AF"
  params:
    - name: channel
      type: integer
      description: 1=Red Gain, 2=Blue Gain
    - name: gain_lo
      type: integer
      description: Gain low byte (0-1023 decimal)
    - name: gain_hi
      type: integer
      description: Gain high byte (0-1023 decimal)

- id: call_rb_gain
  label: Call R/B Gain
  kind: query
  command: "A0 A2 {channel} 00 00 AF"
  params:
    - name: channel
      type: integer
      description: 1=Red Gain, 2=Blue Gain

- id: af_one_push_trigger
  label: AF One Push Trigger
  kind: action
  command: "A0 A3 01 00 00 AF"
  params: []

- id: set_sharpness
  label: Set Sharpness (Gamma)
  kind: action
  command: "A0 A7 {mode} 00 00 AF"
  params:
    - name: mode
      type: integer
      description: 0=Photo, 1=Text, 2=Gray

- id: set_image_mode
  label: Set Image Mode
  kind: action
  command: "A0 A9 {mode} 00 00 AF"
  params:
    - name: mode
      type: integer
      description: 0=Normal, 1=Slide, 2=Film, 3=Microscope

- id: night_vision
  label: Night Vision
  kind: action
  command: "A0 AB {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: system_on_off
  label: System ON/OFF
  kind: action
  command: "A0 B0 {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: power
  label: Power
  kind: action
  command: "A0 B1 {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: capture
  label: Capture
  kind: action
  command: "A0 B2 {mode} 00 00 AF"
  params:
    - name: mode
      type: integer
      description: 0=Capture, 1=Record

- id: playback_thumbnail
  label: Playback Thumbnail
  kind: action
  command: "A0 B3 {mode} 00 00 AF"
  params:
    - name: mode
      type: integer
      description: 0=Thumbnail, 1=PBP Thumbnail

- id: preview_rotation
  label: Preview Rotation
  kind: action
  command: "A0 B4 {rotation} 00 00 AF"
  params:
    - name: rotation
      type: integer
      description: 0=Rotate 0, 1=Rotate 90, 2=Rotate 180, 3=Rotate 270

- id: delete
  label: Delete
  kind: action
  command: "A0 B6 {op} {format_target} 00 AF"
  params:
    - name: op
      type: integer
      description: 0=Delete one, 1=Delete all, 2=Format
    - name: format_target
      type: integer
      description: Only used when op=2 (Format): 0=Format NAND B, 1=Format External

- id: call_system_status
  label: Call System Status
  kind: query
  command: "A0 B7 00 00 00 AF"
  params: []

- id: ac_frequency_select
  label: AC Frequency Select
  kind: action
  command: "A0 B8 {frequency} 00 00 AF"
  params:
    - name: frequency
      type: integer
      description: 0=50Hz, 1=60Hz

- id: lamp_on_off
  label: Lamp On/Off
  kind: action
  command: "A0 C1 {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Disable, 1=Arm Light, 2=Back Light

- id: usb_camera
  label: USB Camera
  kind: action
  command: "A0 C9 {state} 00 00 AF"
  params:
    - name: state
      type: integer
      description: 0=Disable, 1=Enable

- id: firmware_upgrade
  label: Firmware Upgrade
  kind: action
  command: "A0 CB {target} 00 00 AF"
  params:
    - name: target
      type: integer
      description: 0=External, 1=Internal

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "A0 D6 {volume} 00 00 AF"
  params:
    - name: volume
      type: integer
      description: 0-15 (volume level)

- id: call_audio_volume
  label: Call Audio Volume
  kind: query
  command: "A0 D7 00 00 00 AF"
  params: []

- id: service_menu
  label: Service Menu
  kind: action
  command: "A0 DC {menu} 00 00 AF"
  params:
    - name: menu
      type: integer
      description: 0=ServiceMenu1, 1=ServiceMenu2
```

## Feedbacks
```yaml
# Return packet format: A0h | CMDh | P1 | P2 | Status | AFh
# Status byte bits 0-1 encode ACK/NAK/IGNORE/NotUsed for every command.
# Below: distinct query responses documented as source rows.

- id: power_state
  type: enum
  values: [off, on]
  source: "Call System Status (B7h) P2"

- id: system_ready
  type: enum
  values: [not_ready, ready]
  source: "Call System Status (B7h) P1"

- id: zoom_position
  type: integer
  range: "0-33 (SXGA), 0-35 (WXGA), 0-43 (XGA)"
  source: "Call Zoom Position (60h) P1(low)P2(high)"

- id: digital_zoom_position
  type: integer
  range: "0-63 (XGA r0/180), 0-71 (WXGA r0/180), 0-73 (SXGA r0/180), 0-78 (r90/270)"
  source: "Call Digital Zoom Position (62h) P1"

- id: focus_position
  type: integer
  range: "0-258"
  source: "Call Focus Position (64h) P1(low)P2(high)"

- id: mix_zoom_position
  type: integer
  range: "0-90"
  source: "Call Mix Zoom Position (8Ah) P1(low)P2(high)"

- id: freeze_state
  type: enum
  values: [off, on]
  source: "Call Freeze Status (78h) P1"

- id: iris_mode
  type: enum
  values: [auto, manual, stop]
  source: "Call Iris Status (7Ah) P1"

- id: iris_brightness
  type: integer
  range: "0-86 (Microscope 50Hz), 0-69 (Microscope 60Hz), 0-75 (Normal)"
  source: "Call Iris Status (7Ah) P2"

- id: brightness_position
  type: integer
  range: "0-86 (Microscope 50Hz), 0-88 (Microscope 60Hz), 0-94 (Normal)"
  source: "Call Brightness Position (89h) P1"

- id: negative_state
  type: enum
  values: [off, on]
  source: "Call Negative (87h) P1"

- id: color_mode
  type: enum
  values: [photo, gray]
  source: "Call Color (88h) P1"

- id: menu_state
  type: enum
  values: [off, on]
  source: "Call Menu Status (8Bh) P1"

- id: lamp_state
  type: enum
  values: [off, arm_light, back_light]
  source: "Call Lamp Status (50h) P1"

- id: text_photo_mode
  type: enum
  values: [photo, text, gray]
  source: "Call Text/Photo Status (51h) P1"

- id: ac_power_state
  type: enum
  values: [50hz, 60hz, no_signal, signal_incorrect]
  source: "Call AC Power State (58h) P1 (0/1/99/77)"

- id: ae_status
  type: enum
  values: [off, on]
  source: "Call AE Status (46h) P1"

- id: master_version
  type: string
  source: "Call Master Version (45h) returns PVE P1 P2 P3 ASCII"

- id: slave_version
  type: string
  source: "Call Slave Version (4Dh) returns PVG P1 P2 P3 ASCII"

- id: rb_gain
  type: integer
  range: "0-1023"
  source: "Call R/B Gain (A2h) P1(low)P2(high)"

- id: audio_volume
  type: integer
  range: "0-15"
  source: "Call Audio Volume (D7h) P1(low)P2(high)"

- id: dip_switch_value
  type: integer
  source: "Call DIP Switch Value (29h) P1"
  # UNRESOLVED: DIP switch bit-to-value mapping not specified in source

- id: comm_response
  type: enum
  values: [ack, nak, ignore, not_used]
  source: "Return packet Status byte bits 0-1"
```

## Notes
- Packet format is fixed 6 bytes: `A0 CMD P1 P2 P3 AF`. All parameter bytes not relevant to a given command are 00h in the source rows.
- Two distinct power controls exist: `System ON/OFF (B0h)` and `Power (B1h)`. The source does not document the distinction; treated as separate actions per the source rows.
- The "reg1/reg2/reg3" commands (52h/53h/54h) have no parameter description in the source; their payload structure is preserved but meanings are UNRESOLVED.
- `reg1` is also referenced as item 42 in the source table; the duplicate numbering in the source (items 34 and 34 again) is preserved as-is.
- Pan PBP step range is resolution-dependent (XGA: 0-32; SXGA/WXGA: 0-40).
- `Source live/PC (3Ah)` is a stepper command that cycles: Live → VGA1 → VGA2 → CVideo → SVideo → Live.
- `Source Monitor (3Ch)` toggles between VGA1 and VGA2.
- Communication is half-duplex; the host sends a command and the device returns a 6-byte packet echoing the command with a Status byte.
<!-- UNRESOLVED: firmware version compatibility, electrical specs (voltage/current), and any safety interlocks are not documented in the source. -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/Lumens/PS750/ps750_doc_6.pdf"
retrieved_at: 2026-04-30T04:36:37.918Z
last_checked_at: 2026-06-02T04:56:24.310Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:56:24.310Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 spec actions matched literally to source rows with correct opcodes and parameters; transport fully verified; one-to-one coverage achieved. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility, error-recovery sequence, and any safety interlocks are not documented in the source."
- "flow control not stated in source"
- "P2 range 0x00-0xff is documented but the value mapping is not specified in source"
- "DIP switch bit-to-value mapping not specified in source"
- "firmware version compatibility, electrical specs (voltage/current), and any safety interlocks are not documented in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
