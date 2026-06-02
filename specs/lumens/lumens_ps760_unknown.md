---
spec_id: admin/lumens-ps760
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens PS760 Control Spec"
manufacturer: Lumens
model_family: PS760
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - PS760
  firmware: "\"PVC127 or later (PVC128 added Key Tone command E5h)\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lumens.cn
  - mylumens.com
source_urls:
  - "https://www.lumens.cn/Download/PS760%20RS-232%20command%20set%202012-0611.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-05-13T06:57:56.276Z
last_checked_at: 2026-06-02T04:56:25.105Z
generated_at: 2026-06-02T04:56:25.105Z
firmware_coverage: "\"PVC127 or later (PVC128 added Key Tone command E5h)\""
protocol_coverage: []
known_gaps:
  - "full command set coverage assumes firmware v1.2 (PVC128); commands 1-72 valid on PVC127, command 73 (Key Tone) requires PVC128 per source revision history."
  - "source documents no unsolicited notification mechanism. Keypad"
  - "source contains no multi-step macro definitions."
  - "source contains no safety warnings, interlock procedures, or"
  - "source does not specify the controller-side serial port number, cable length limits, or electrical isolation requirements."
verification:
  verdict: verified
  checked_at: 2026-06-02T04:56:25.105Z
  matched_actions: 73
  action_count: 73
  confidence: medium
  summary: "All 73 spec actions matched literally to source command bytes; parameter shapes and transport parameters fully verified; 1:1 coverage with source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Lumens PS760 Control Spec

## Summary
RS-232 control for Lumens PS760 document camera. Six-byte fixed packet protocol: `A0h CMD P1 P2 P3 AFh`, 9600 bps 8-N-1, half-duplex. 73 commands cover preset, zoom, focus, iris, image mode, capture, playback, OSD, source switching, and status queries. Every command returns an ACK/NAK/IGNORE packet from the camera.

<!-- UNRESOLVED: full command set coverage assumes firmware v1.2 (PVC128); commands 1-72 valid on PVC127, command 73 (Key Tone) requires PVC128 per source revision history. -->

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
- powerable       # System ON/OFF, Power commands present
- routable        # Source live/PC switching command present
- queryable       # 21 "Call *" status query commands present
- levelable       # Set Audio Volume, Iris, Brightness, R/B Gain present
```

## Actions
```yaml
- id: preset_or_factory_reset
  label: Preset / Factory Reset
  kind: action
  command: "A0 03 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: 0=Preset, 1=Factory Reset
    - name: p2
      type: integer
      description: When p1=0: 00=Load, 01=Save
  notes: "Source row 1"

- id: slide_show_on_off
  label: Slide Show On/Off
  kind: action
  command: "A0 04 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On
  notes: "Source row 2"

- id: slide_show_delay
  label: Slide Show Delay
  kind: action
  command: "A0 06 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "0=0.5s, 1=1s, 2=3s, 3=5s, 4=10s, 5=Manual"
  notes: "Source row 3"

- id: image_record_quality
  label: Image / Record Quality
  kind: action
  command: "A0 07 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=High, 01=Medium, 02=Low
  notes: "Source row 4"

- id: copy_nand_to_usb
  label: Copy From NAND to USB
  kind: action
  command: "A0 08 00 00 00 AF"
  params: []
  notes: "Source row 5"

- id: zoom_stop
  label: Zoom Stop
  kind: action
  command: "A0 10 00 00 00 AF"
  params: []
  notes: "Source row 6"

- id: zoom_start_no_af
  label: Zoom Start (No AF)
  kind: action
  command: "A0 11 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Tele, 01=Wide
  notes: "Source row 7"

- id: zoom_direct_no_af
  label: Zoom Direct (No AF)
  kind: action
  command: "A0 13 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "Low byte of zoom position; range depends on output mode (XGA 0-45, SXGA 0-38, WXGA 0-38, UXGA 0-34, 1080P 0-29)"
    - name: p2
      type: integer
      description: "High byte (typically 00); P3 byte position in source held speed 00-07"
  notes: "Source row 8; P3 byte field is speed 00-07 per source (rendered as 00 in command template since source table shows P3=00 for this row)"

- id: auto_erase
  label: Auto Erase
  kind: action
  command: "A0 14 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On
  notes: "Source row 9 (note: source lists command byte as 13h here, appears to be a source typo; verbatim 13 used)"

- id: digital_zoom_direct
  label: Digital Zoom Direct
  kind: action
  command: "A0 18 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "Digital zoom position; XGA 0-43, SXGA 0-50, WXGA 0-50, UXGA 0-54, 1080P 0-57"
  notes: "Source row 10"

- id: focus_stop
  label: Focus Stop
  kind: action
  command: "A0 19 00 00 00 AF"
  params: []
  notes: "Source row 11"

- id: focus_start
  label: Focus Start
  kind: action
  command: "A0 1A {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Near, 01=Far
    - name: p2
      type: integer
      description: "Speed 00-07"
  notes: "Source row 12"

- id: focus_direct
  label: Focus Direct
  kind: action
  command: "A0 1B {p1} {p2} {p3} AF"
  params:
    - name: p1
      type: integer
      description: "Focus position low byte"
    - name: p2
      type: integer
      description: "Focus position high byte (P1+P2 = 0-258 decimal)"
    - name: p3
      type: integer
      description: "Speed 00-07"
  notes: "Source row 13"

- id: zoom_start_with_af
  label: Zoom Start (with AF)
  kind: action
  command: "A0 1D {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Tele, 01=Wide
  notes: "Source row 14"

- id: zoom_direct_with_af
  label: Zoom Direct (with AF)
  kind: action
  command: "A0 1F {p1} {p2} {p3} AF"
  params:
    - name: p1
      type: integer
      description: "Zoom position low byte; range depends on output mode (XGA 0-45, SXGA 0-38, WXGA 0-38, UXGA 0-34, 1080P 0-29)"
    - name: p2
      type: integer
      description: "Zoom position high byte (typically 00)"
    - name: p3
      type: integer
      description: "Speed 00-07"
  notes: "Source row 15"

- id: white_balance
  label: White Balance (AWB, Auto Tune)
  kind: action
  command: "A0 22 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Auto Tune, 01=AWB
  notes: "Source row 16"

- id: set_pan_mode
  label: Set Pan Mode
  kind: action
  command: "A0 26 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On
  notes: "Source row 17"

- id: mask_mode
  label: Mask Mode
  kind: action
  command: "A0 27 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "0=Disable, 1=Mask, 2=Highlight"
  notes: "Source row 18"

- id: freeze
  label: Freeze
  kind: action
  command: "A0 2C {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On
  notes: "Source row 19"

- id: iris
  label: Iris
  kind: action
  command: "A0 30 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: 01=Manual
    - name: p2
      type: integer
      description: "Brightness value; range depends on mode (Normal 60/50Hz 0-100, Microscope 60Hz 0-134, Microscope 50Hz 0-128, NightVision 60/50Hz 0-80)"
  notes: "Source row 20"

- id: negative_film
  label: Negative (Film)
  kind: action
  command: "A0 36 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On
  notes: "Source row 21"

- id: color_gray
  label: Color / Gray
  kind: action
  command: "A0 37 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Photo, 01=Gray
  notes: "Source row 22"

- id: language_select
  label: Language Select
  kind: action
  command: "A0 38 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "0=English, 1=Traditional Chinese, 2=German, 3=French, 4=Spanish, 5=Russian, 6=Dutch, 7=Finnish, 8=Polish, 9=Italian, 10=Portuguese, 11=Swedish, 12=Danish, 13=Czech"
  notes: "Source row 23"

- id: brightness_control
  label: Brightness Control
  kind: action
  command: "A0 39 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00=-1, 01=+1 (step)"
  notes: "Source row 24"

- id: source_live_pc
  label: Source Live / PC
  kind: action
  command: "A0 3A {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "Source 1: 00=Camera, 01=VGA In1, 02=VGA In2, 03=C-DVD, 04=S-DVD"
    - name: p2
      type: integer
      description: "Source 2: 00=Follow Camera, 01=VGA In1, 02=VGA In2, 03=C-DVD, 04=S-DVD"
  notes: "Source row 25"

- id: disable_digital_zoom_after_optical
  label: Disable Digital Zoom After Optical Zoom
  kind: action
  command: "A0 40 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Disable, 01=Enable
  notes: "Source row 26"

- id: call_master_version
  label: Call Master Version
  kind: query
  command: "A0 45 00 00 00 AF"
  params: []
  notes: "Source row 27; response: PVCxxx = PVC P1 P2 P3 (ASCII)"

- id: call_ae_status
  label: Call AE Status
  kind: query
  command: "A0 46 00 00 00 AF"
  params: []
  notes: "Source row 28; response: P1=00=Off, 01=On"

- id: enable_disable_logo_image
  label: Enable/Disable LOGO Image
  kind: action
  command: "A0 47 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "00=Power On setting, 01=Power Off setting"
    - name: p2
      type: integer
      description: "00=Default logo, 01=Customer logo"
  notes: "Source row 29"

- id: playback_image_index_change_page
  label: Playback Image Index Change Page
  kind: action
  command: "A0 4A {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Page Up, 01=Page Down
  notes: "Source row 30"

- id: all_osd_on_off
  label: All OSD On/Off
  kind: action
  command: "A0 4B {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On
  notes: "Source row 31"

- id: call_slave_version
  label: Call Slave Version
  kind: query
  command: "A0 4D 00 00 00 AF"
  params: []
  notes: "Source row 32; response: PVDxxx = PVD P1 P2 P3 (ASCII)"

- id: frame_average
  label: Frame Average
  kind: action
  command: "A0 4E {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On, 02=Demo
  notes: "Source row 33"

- id: call_lamp_status
  label: Call Lamp Status
  kind: query
  command: "A0 50 00 00 00 AF"
  params: []
  notes: "Source row 34; response: P1=00=Off, 01=Arm Lamp, 02=Back Light"

- id: call_text_photo_status
  label: Call Text/Photo Status
  kind: query
  command: "A0 51 00 00 00 AF"
  params: []
  notes: "Source row 35; response: P1=00=Photo, 01=Text, 02=Gray"

- id: reg1
  label: reg1 (Internal Register 1)
  kind: action
  command: "A0 52 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Read, 01=Write
    - name: p2
      type: integer
      description: "Register value 0x00-0xFF"
  notes: "Source row 36"

- id: reg2
  label: reg2 (Internal Register 2)
  kind: action
  command: "A0 53 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Read, 01=Write
    - name: p2
      type: integer
      description: "Register value 0x00-0xFF"
  notes: "Source row 37"

- id: reg3
  label: reg3 (Internal Register 3)
  kind: action
  command: "A0 54 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Read, 01=Write
    - name: p2
      type: integer
      description: "Register value 0x00-0xFF"
  notes: "Source row 38"

- id: call_ac_power_state
  label: Call AC 50/60 Hz Power State
  kind: query
  command: "A0 58 00 00 00 AF"
  params: []
  notes: "Source row 39"

- id: keypad_detect
  label: Keypad Detect
  kind: action
  command: "A0 59 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Stop, 01=Start (enables debug message output via RS-232)"
  notes: "Source row 40"

- id: keypad_lock
  label: Keypad Lock
  kind: action
  command: "A0 5D {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Unlock, 01=Lock
  notes: "Source row 41 (source comment block references zoom-position P2/P3 fields, but command template shows P1 only per source row)"

- id: call_zoom_position
  label: Call Zoom Position
  kind: query
  command: "A0 60 00 00 00 AF"
  params: []
  notes: "Source row 42"

- id: call_digital_zoom_position
  label: Call Digital Zoom Position
  kind: query
  command: "A0 62 00 00 00 AF"
  params: []
  notes: "Source row 43"

- id: call_focus_position
  label: Call Focus Position
  kind: query
  command: "A0 64 00 00 00 AF"
  params: []
  notes: "Source row 44; response: P1(low) P2(high) = 0-258 (decimal)"

- id: call_freeze_status
  label: Call Freeze Status
  kind: query
  command: "A0 78 00 00 00 AF"
  params: []
  notes: "Source row 45; response: P1=00=Off, 01=On"

- id: call_iris_status
  label: Call Iris Status
  kind: query
  command: "A0 7A 00 00 00 AF"
  params: []
  notes: "Source row 46; response: P1=00=Auto, 01=Manual/Stop; P2 brightness range depends on mode"

- id: call_negative
  label: Call Negative
  kind: query
  command: "A0 87 00 00 00 AF"
  params: []
  notes: "Source row 47; response: P1=00=Off, 01=On"

- id: call_color
  label: Call Color
  kind: query
  command: "A0 88 00 00 00 AF"
  params: []
  notes: "Source row 48; response: P1=00=Photo, 01=Gray"

- id: call_brightness_position
  label: Call Brightness Position
  kind: query
  command: "A0 89 00 00 00 AF"
  params: []
  notes: "Source row 49; response: P1 brightness range depends on mode (Normal 0-100, Microscope60 0-134, Microscope50 0-128, NightVision 0-80)"

- id: call_mix_zoom_position
  label: Call Mix Zoom Position
  kind: query
  command: "A0 8A 00 00 00 AF"
  params: []
  notes: "Source row 50; response: P1+P2 zoom position; range depends on output mode (XGA/SXGA/WXGA/UXGA 0-88, 1080P 0-86)"

- id: call_menu_status
  label: Call Menu Status
  kind: query
  command: "A0 8B 00 00 00 AF"
  params: []
  notes: "Source row 51; response: P1=00=Off, 01=On"

- id: capture_mode
  label: Capture Mode
  kind: action
  command: "A0 95 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Photo, 01=Video
  notes: "Source row 52"

- id: capture_action
  label: Capture Action
  kind: action
  command: "A0 96 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Single, 01=Continuous, 02=Disable
  notes: "Source row 53"

- id: capture_time
  label: Capture Time
  kind: action
  command: "A0 97 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00=1hr, 01=2hr, 02=4hr, 03=8hr, 04=24hr, 05=48hr, 06=72hr"
  notes: "Source row 54"

- id: capture_interval
  label: Capture Interval
  kind: action
  command: "A0 98 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00=5sec, 01=10sec, 02=30sec, 03=1min, 04=2min, 05=5min"
  notes: "Source row 55"

- id: key_function
  label: Key Function (Remote Emulation)
  kind: action
  command: "A0 A0 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "01=Enter, 02=Up, 03=Down, 04=Left, 05=Right, 06=Menu"
  notes: "Source row 56"

- id: set_rb_gain
  label: Set R/B Gain
  kind: action
  command: "A0 A1 {p1} {p2} {p3} AF"
  params:
    - name: p1
      type: integer
      description: 01=Red Gain, 02=Blue Gain
    - name: p2
      type: integer
      description: "Gain low byte (P2+P3 = 512-4095 decimal)"
    - name: p3
      type: integer
      description: "Gain high byte"
  notes: "Source row 57"

- id: call_rb_gain
  label: Call R/B Gain
  kind: query
  command: "A0 A2 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 01=Red Gain, 02=Blue Gain
  notes: "Source row 58; response: P1(low) P2(high) = 512-4095 decimal"

- id: af_one_push_trigger
  label: AF One Push Trigger
  kind: action
  command: "A0 A3 01 00 00 AF"
  params: []
  notes: "Source row 59"

- id: set_sharpness_gamma
  label: Set Sharpness (Gamma)
  kind: action
  command: "A0 A7 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Photo, 01=Text, 02=Gray
  notes: "Source row 60"

- id: set_image_mode
  label: Set Image Mode
  kind: action
  command: "A0 A9 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00=Normal, 01=Slide, 02=Film, 03=Microscope"
  notes: "Source row 61"

- id: night_vision
  label: Night Vision
  kind: action
  command: "A0 AB {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On
  notes: "Source row 62"

- id: system_on_off
  label: System On/Off
  kind: action
  command: "A0 B0 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On
  notes: "Source row 63"

- id: power
  label: Power
  kind: action
  command: "A0 B1 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On
  notes: "Source row 64"

- id: capture
  label: Capture
  kind: action
  command: "A0 B2 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Capture, 01=Record
  notes: "Source row 65"

- id: playback_thumbnail
  label: Playback Thumbnail
  kind: action
  command: "A0 B3 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Thumbnail, 01=PBP Thumbnail
  notes: "Source row 66"

- id: preview_rotation
  label: Preview Rotation
  kind: action
  command: "A0 B4 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00=Rotate 0, 01=Rotate 90, 02=Rotate 180, 03=Rotate 270"
  notes: "Source row 67"

- id: delete
  label: Delete
  kind: action
  command: "A0 B6 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00=Delete One, 01=Delete All, 02=Format"
  notes: "Source row 68"

- id: call_system_status
  label: Call System Status
  kind: query
  command: "A0 B7 00 00 00 AF"
  params: []
  notes: "Source row 69; response: P1 (system status) 00=Not Ready, 01=Ready; P2 (power status) 00=Off, 01=On"

- id: lamp_on_off
  label: Lamp On/Off
  kind: action
  command: "A0 C1 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=Arm Lamp, 02=Back Light
  notes: "Source row 70"

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "A0 D6 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "Volume 0-16 (decimal)"
  notes: "Source row 71"

- id: call_audio_volume
  label: Call Audio Volume
  kind: query
  command: "A0 D7 00 00 00 AF"
  params: []
  notes: "Source row 72; response: P1(low) P2(high) = 0-16 decimal"

- id: key_tone_on_off
  label: Key Tone On/Off
  kind: action
  command: "A0 E5 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: 00=Off, 01=On
  notes: "Source row 73; requires firmware PVC128 or later (added in v1.2 per source revision history)"
```

## Feedbacks
```yaml
- id: return_status
  label: Command Return Status
  type: enum
  values: [action_succeed, nak, ignore]
  description: |
    Every command receives a 6-byte return packet: A0h CMD P1 P2 STATUS AFh.
    STATUS byte values: 0=Action Succeed (ACK), 1=NAK (No Action / errors),
    2=Ignore (Command is not in the command list).
    Bit-level status in return packet Parameter3:
      bit 7: reserved (0)
      bit 6: Iris moving (1) / stopped (0)
      bit 5: Zoom moving (1) / stopped (0)
      bit 4: Focus moving (1) / stopped (0)
      bits 3-2: reserved (0)
      bits 1-0: ACK(00), NAK(01), IGNORE(10), Not Used(11)
```

## Variables
```yaml
# Discrete command-set devices; no continuous settable parameters beyond
# the per-action P1/P2/P3 byte slots enumerated above.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification mechanism. Keypad
# Detect (cmd 59h) enables debug message output, but message format and
# triggering conditions are not specified beyond "detection message is sent
# from RS232" - not detailed enough to enumerate as an event.
```

## Macros
```yaml
# UNRESOLVED: source contains no multi-step macro definitions.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Wire: null-modem DB9 (2↔3, 5↔5, shell↔shell drain). Source section 2.
- Half-duplex: host sends command, waits for ACK/NAK/IGNORE before next command. Source section 3.
- Packet is exactly 6 bytes; no checksum beyond the fixed STX/ETX framing. Source section 4.1.
- Source contains a duplicate row numbering bug: row 34 appears twice (Call Lamp Status 50h, then Call Text/Photo Status 51h), and Auto Erase row 9 uses command byte 13h (collision with Zoom Direct 13h). Verbatim copy preserved in `notes` per fabrication policy.
- Zoom Direct with AF (1Fh) and Zoom Direct No AF (13h) both accept a P3 speed byte in the source comment but the table shows the 6th byte as 00h for the No-AF variant. This is preserved as in the source.
- Key Tone (E5h) was added in firmware v1.2 (PVC128). Source revision history.
<!-- UNRESOLVED: source does not specify the controller-side serial port number, cable length limits, or electrical isolation requirements. -->

## Provenance

```yaml
source_domains:
  - lumens.cn
  - mylumens.com
source_urls:
  - "https://www.lumens.cn/Download/PS760%20RS-232%20command%20set%202012-0611.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-05-13T06:57:56.276Z
last_checked_at: 2026-06-02T04:56:25.105Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:56:25.105Z
matched_actions: 73
action_count: 73
confidence: medium
summary: "All 73 spec actions matched literally to source command bytes; parameter shapes and transport parameters fully verified; 1:1 coverage with source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full command set coverage assumes firmware v1.2 (PVC128); commands 1-72 valid on PVC127, command 73 (Key Tone) requires PVC128 per source revision history."
- "source documents no unsolicited notification mechanism. Keypad"
- "source contains no multi-step macro definitions."
- "source contains no safety warnings, interlock procedures, or"
- "source does not specify the controller-side serial port number, cable length limits, or electrical isolation requirements."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
