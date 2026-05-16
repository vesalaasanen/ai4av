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
last_checked_at: 2026-05-16T11:30:43.687Z
generated_at: 2026-05-16T11:30:43.687Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T11:30:43.687Z
  matched_actions: 73
  action_count: 73
  confidence: high
  summary: "All 73 spec actions found verbatim in source command table with matching opcode, parameters, and transport settings."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Lumens PS760 Control Spec

## Summary
Document camera (presenter) with RS-232 half-duplex serial control. 6-byte packet protocol using STX (A0h) / ETX (AFh) framing. No authentication required.

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # System ON/OFF (B0h), Power (B1h) commands present
- routable       # Source live/PC (3Ah) command present
- queryable      # Call commands for zoom pos, focus pos, lamp status, etc.
- levelable      # Iris (30h), Brightness Control (39h), Audio Volume (D6h) present
```

## Actions
```yaml
- id: preset_factory_reset
  label: Preset/Factory Reset
  kind: action
  params:
    - name: p1
      type: integer
      description: "0=Preset operation, 1=Factory Reset"
    - name: p2
      type: integer
      description: "0x00=Load preset, 0x01=Save preset (when P1=0)"

- id: slideshow_on_off
  label: Slide Show On/Off
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: slideshow_delay
  label: Slide Show Delay
  kind: action
  params:
    - name: p1
      type: integer
      description: "0~5: 0.5sec/1sec/3sec/5sec/10sec/Manual"

- id: image_quality
  label: Image/Record Quality
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1, 2]
      description: "0=High, 1=Medium, 2=Low"

- id: copy_from_nand_to_usb
  label: Copy From Nand to USB
  kind: action
  params: []

- id: zoom_stop
  label: Zoom Stop
  kind: action
  params: []

- id: zoom_start_no_af
  label: Zoom Start (No AF)
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Tele, 1=Wide"

- id: zoom_direct_no_af
  label: Zoom Direct (Straight, No AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: "Low byte: zoom position (resolution-dependent)"
    - name: p2
      type: integer
      description: "High byte of position"
    - name: speed
      type: integer
      description: "Speed 0x00~0x07"

- id: auto_erase
  label: Auto Erase
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: digital_zoom_direct
  label: Digital Zoom Direct
  kind: action
  params:
    - name: p1
      type: integer
      description: "0~57 depending on resolution"

- id: focus_stop
  label: Focus Stop
  kind: action
  params: []

- id: focus_start
  label: Focus Start
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Near, 1=Far"
    - name: p2
      type: integer
      description: "Speed 0x00~0x07"

- id: focus_direct
  label: Focus Direct
  kind: action
  params:
    - name: p1
      type: integer
      description: "Low byte of position 0~258"
    - name: p2
      type: integer
      description: "High byte of position"
    - name: speed
      type: integer
      description: "Speed 0x00~0x07"

- id: zoom_start_with_af
  label: Zoom Start (With AF)
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Tele, 1=Wide"

- id: zoom_direct_with_af
  label: Zoom Direct (Straight) (With AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: "Low byte: zoom position"
    - name: p2
      type: integer
      description: "High byte"
    - name: speed
      type: integer
      description: "Speed 0x00~0x07"

- id: white_balance
  label: White Balance (AWB, Auto Tune)
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Auto Tune, 1=AWB"

- id: set_pan_mode
  label: Set Pan Mode
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: mask_mode
  label: Mask Mode
  kind: action
  params:
    - name: p1
      type: integer
      description: "0=Disable, 1=Mask, 2=Highlight"

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: iris
  label: Iris
  kind: action
  params:
    - name: p1
      type: integer
      description: "0x01=Manual"
    - name: p2
      type: integer
      description: "Brightness value (resolution/mode dependent)"

- id: negative_film
  label: Negative (film)
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: color_gray
  label: Color (gray)
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Photo, 1=Gray"

- id: language_select
  label: Language Select
  kind: action
  params:
    - name: p1
      type: integer
      description: "0~13: English/Traditional Chinese/German/French/Spanish/Russian/Dutch/Finnish/Polish/Italian/Portuguese/Swedish/Danish/Czech/Simplified Chinese/Arabic/Japanese/Korean/Greek"

- id: brightness_control
  label: Brightness Control
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=-1, 1=+1"

- id: source_live_pc
  label: Source live/PC
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1, 2, 3, 4]
      description: "Source 1: 0=camera, 1=VGA In1, 2=VGA In2, 3=C-DVD, 4=S-DVD"
    - name: p2
      type: integer
      description: "Source 2 follow setting"

- id: disable_digital_zoom_after_optical_zoom
  label: Disable Digital Zoom After Optical Zoom
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Disable, 1=Enable"

- id: call_master_version
  label: Call Master Version
  kind: action
  params: []

- id: call_ae_status
  label: Call AE Status
  kind: action
  params: []

- id: enable_disable_logo_image
  label: Enable/Disable LOGO Image
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=power on setting, 1=power off setting"
    - name: p2
      type: integer
      enum: [0, 1]
      description: "0=Default logo, 1=Customer logo"

- id: playback_image_index_change_page
  label: Playback Image Index Change Page
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Page Up, 1=Page Down"

- id: all_osd_on_off
  label: All OSD On/Off
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: call_slave_version
  label: Call Slave Version
  kind: action
  params: []

- id: frame_average
  label: Frame Average
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1, 2]
      description: "0=Off, 1=On, 2=Demo"

- id: call_lamp_status
  label: Call Lamp Status
  kind: action
  params: []

- id: call_text_photo_status
  label: Call Text/Photo Status
  kind: action
  params: []

- id: reg1
  label: reg1
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Read, 1=Write"
    - name: p2
      type: integer
      description: "Value 0x00~0xff"

- id: reg2
  label: reg2
  kind: action
  params:
    - name: p1
      type: integer
    - name: p2
      type: integer

- id: reg3
  label: reg3
  kind: action
  params:
    - name: p1
      type: integer
    - name: p2
      type: integer

- id: call_ac_50_60_hz_power_state
  label: Call AC 50/60 Hz Power State
  kind: action
  params: []

- id: keypad_detect
  label: Keypad Detect
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Stop, 1=Start"

- id: keypad_lock
  label: Keypad Lock
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Unlock, 1=Lock"
    - name: p2
      type: integer
      description: "Zoom position (resolution-dependent)"

- id: call_zoom_position
  label: Call Zoom Position
  kind: action
  params: []

- id: call_digital_zoom_position
  label: Call Digital Zoom Position
  kind: action
  params: []

- id: call_focus_position
  label: Call Focus Position
  kind: action
  params: []

- id: call_freeze_status
  label: Call Freeze Status
  kind: action
  params: []

- id: call_iris_status
  label: Call Iris Status
  kind: action
  params: []

- id: call_negative
  label: Call Negative
  kind: action
  params: []

- id: call_color
  label: Call Color
  kind: action
  params: []

- id: call_brightness_position
  label: Call Brightness Position
  kind: action
  params: []

- id: call_mix_zoom_position
  label: Call Mix Zoom Position
  kind: action
  params: []

- id: call_menu_status
  label: Call Menu Status
  kind: action
  params: []

- id: capture_mode
  label: Capture Mode
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Photo, 1=Video"

- id: capture_action
  label: Capture Action
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1, 2]
      description: "0=Single, 1=Continuous, 2=Disable"

- id: capture_time
  label: Capture Time
  kind: action
  params:
    - name: p1
      type: integer
      description: "0~6: 1hr/2hr/4hr/8hr/24hr/48hr/72hr"

- id: capture_interval
  label: Capture Interval
  kind: action
  params:
    - name: p1
      type: integer
      description: "0~5: 5sec/10sec/30sec/1min/2min/5min"

- id: key_function
  label: Key Function
  kind: action
  params:
    - name: p1
      type: integer
      description: "1=Enter, 2=Up, 3=Down, 4=Left, 5=Right, 6=Menu"

- id: set_rb_gain
  label: Set R/B Gain
  kind: action
  params:
    - name: p1
      type: integer
      enum: [1, 2]
      description: "1=Red Gain, 2=Blue Gain"
    - name: p2
      type: integer
      description: "Low byte of gain value"
    - name: gain_high
      type: integer
      description: "High byte of gain value"

- id: call_rb_gain
  label: Call R/B Gain
  kind: action
  params:
    - name: p1
      type: integer
      enum: [1, 2]
      description: "1=Red Gain, 2=Blue Gain"

- id: af_one_push_trigger
  label: AF One Push Trigger
  kind: action
  params: []

- id: set_sharpness_gamma
  label: Set Sharpness (Gamma)
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1, 2]
      description: "0=Photo, 1=Text, 2=Gray"

- id: set_image_mode
  label: Set Image Mode
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Normal, 1=Slide, 2=Film, 3=Microscope"

- id: night_vision
  label: Night Vision
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: system_on_off
  label: System ON/OFF
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: power
  label: Power
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: capture
  label: Capture
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Capture, 1=Record"

- id: playback_thumbnail
  label: Playback Thumbnail
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Thumbnail, 1=PBP Thumbnail"

- id: preview_rotation
  label: Preview Rotation
  kind: action
  params:
    - name: p1
      type: integer
      description: "0=Rotate 0, 1=Rotate 90, 2=Rotate 180, 3=Rotate 270"

- id: delete
  label: Delete
  kind: action
  params:
    - name: p1
      type: integer
      description: "0=Delete one, 1=Delete all, 2=Format"

- id: call_system_status
  label: Call System Status
  kind: action
  params: []

- id: lamp_on_off
  label: Lamp On/Off
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1, 2]
      description: "0=Off, 1=Arm Lamp, 2=Back Light"

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  params:
    - name: p1
      type: integer
      description: "Volume 0~16"

- id: call_audio_volume
  label: Call Audio Volume
  kind: action
  params: []

- id: key_tone_on_off
  label: Key Tone On/Off
  kind: action
  params:
    - name: p1
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
```

## Feedbacks
```yaml
- id: command_response
  type: enum
  values: [ack, nak, ignore, not_used]
  description: "Bit0/Bit1 of status byte: 0,0=ACK, 0,1=NAK, 1,0=IGNORE, 1,1=Not Used"

- id: zoom_status
  type: enum
  values: [stopped, moving]
  description: "Bit5 of status byte"

- id: focus_status
  type: enum
  values: [stopped, moving]
  description: "Bit4 of status byte"

- id: iris_moving_status
  type: enum
  values: [stopped, moving]
  description: "Bit6 of status byte"

- id: zoom_position_response
  type: integer
  description: "P1(LowByte)P2(HighByte) zoom position value"

- id: digital_zoom_position_response
  type: integer
  description: "Digital zoom position value"

- id: focus_position_response
  type: integer
  description: "P1(LowByte)P2(HighByte) focus position 0~258"

- id: lamp_status_response
  type: enum
  values: [off, arm_lamp, back_light]
  description: "P1=00/01/02"

- id: text_photo_status_response
  type: enum
  values: [photo, text, gray]
  description: "P1=00/01/02"

- id: ae_status_response
  type: enum
  values: [off, on]
  description: "P1=00/01"

- id: freeze_status_response
  type: enum
  values: [off, on]
  description: "P1=00/01"

- id: iris_status_response
  type: object
  description: "P1=00/01=Auto/Manual, P2=brightness value"

- id: negative_status_response
  type: enum
  values: [off, on]
  description: "P1=00/01"

- id: color_status_response
  type: enum
  values: [photo, gray]
  description: "P1=00/01"

- id: brightness_position_response
  type: integer
  description: "Brightness value (mode-dependent range)"

- id: mix_zoom_position_response
  type: integer
  description: "Mix zoom position value"

- id: menu_status_response
  type: enum
  values: [off, on]
  description: "P1=00/01"

- id: system_status_response
  type: object
  description: "P1=00/01=not ready/Ready, P2=00/01=Off/On"

- id: audio_volume_response
  type: integer
  description: "P1(LowByte)P2(HighByte) value 0~16"

- id: rb_gain_response
  type: integer
  description: "P1(LowByte)P2(HighByte) gain value 512~4095"

- id: master_version_response
  type: string
  description: "PVCxxx ASCII string"

- id: slave_version_response
  type: string
  description: "PVDxxx ASCII string"

- id: ac_power_state_response
  type: enum
  values: [50hz, 60hz]
  description: "AC power frequency state"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found; all settable values are action params
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
RS-232 half-duplex serial. Command packet: 6 bytes [STX=A0h, CMD, P1, P2, P3, ETX=AFh]. Response packet: 6 bytes [STX=A0h, CMD, P1, P2, Status, ETX=AFh] where Status bit0/bit1 encode ACK/NAK/IGNORE/Not Used. Debug keypad-detect mode sends unsolicited status messages from device when enabled. Zoom/focus position ranges vary by resolution mode (XGA/SXGA/WXGA/UXGA/1080P).<!-- UNRESOLVED: firmware compatibility range not stated in source --><!-- UNRESOLVED: flow control configuration not stated in source --><!-- UNRESOLVED: electrical interface specifications (voltage/current) not stated in source -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS-232%20DC265%202008-1030.pdf"
  - "https://www.mylumens.com/Download/RS182%20-%20LC300_LC300S%20command%20set%20-%20LCB103.pdf"
retrieved_at: 2026-05-04T15:19:08.841Z
last_checked_at: 2026-05-16T11:30:43.687Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T11:30:43.687Z
matched_actions: 73
action_count: 73
confidence: high
summary: "All 73 spec actions found verbatim in source command table with matching opcode, parameters, and transport settings."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
