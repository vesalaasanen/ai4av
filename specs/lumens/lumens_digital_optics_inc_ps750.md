---
spec_id: admin/lumens-digital-optics-inc-ps750
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens Digital Optics Inc PS750 Control Spec"
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
last_checked_at: 2026-04-25T21:07:30.503Z
generated_at: 2026-04-25T21:07:30.503Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:07:30.503Z
  matched_actions: 79
  action_count: 79
  confidence: high
  summary: "All 79 spec actions match source command table row-for-row; transport parameters verified; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Lumens Digital Optics Inc PS750 Control Spec

## Summary
Lumens PS750 document camera with half-duplex RS-232 control. 9600 baud, 8N1. 6-byte command packets (STX A0h...ETX AFh) with ACK/NAK/IGNORE responses. Supports camera positioning (zoom, focus, pan), image quality, source routing, capture, and power control.

<!-- UNRESOLVED: firmware version compatibility not stated -->

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
  type: none
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: preset_factory_reset
  label: Preset/Factory Reset
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Preset Load/Save, 1=Factory Reset
    - name: p2
      type: integer
      description: 0=Load, 1=Save

- id: slideshow_onoff
  label: Slide Show On/Off
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Off, 1=On

- id: slideshow_effect
  label: Slide Show Effect
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Off, 1=Shutter, 2=Right, 3=Down, 4=Side, 5=Open

- id: slideshow_delay
  label: Slide Show Delay
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=1sec, 1=3sec, 2=5sec, 3=10sec, 4=Manual

- id: image_quality
  label: Image/Record Quality
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=High, 1=Medium, 2=Low

- id: copy_to_sd_card
  label: Copy To SD Card
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
      description: 0=Tele, 1=Wide

- id: zoom_direct_no_af
  label: Zoom Direct (Straight, No AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: Low byte, SXGA 0-33, WXGA 0-35, XGA 0-43
    - name: p2
      type: integer
      description: High byte

- id: auto_erase
  label: Auto Erase
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Off, 1=On

- id: digital_zoom_limit
  label: Digital Zoom Limit
  kind: action
  params:
    - name: p1
      type: integer
      description: 1-4 (1x to 4x)

- id: digital_zoom_direct
  label: Digital Zoom Direct
  kind: action
  params:
    - name: p1
      type: integer
      description: Rotate 0/180 XGA 0-63, WXGA 0-71, SXGA 0-73; Rotate 90/270 all 0-78

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
      description: 0=Near, 1=Far
    - name: p2
      type: integer
      description: Speed 1-5

- id: focus_direct
  label: Focus Direct (No Limit)
  kind: action
  params:
    - name: p1
      type: integer
      description: Low byte, 0-258
    - name: p2
      type: integer
      description: High byte
    - name: p3
      type: integer
      description: Speed 1-5

- id: zoom_start_with_af
  label: Zoom Start (With AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Tele, 1=Wide

- id: zoom_direct_with_af
  label: Zoom Direct (Straight) (With AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: Low byte, SXGA 0-33, WXGA 0-35, XGA 0-43
    - name: p2
      type: integer
      description: High byte

- id: white_balance_auto
  label: White Balance (AWB, Auto Tune)
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Auto Tune, 1=AWB

- id: white_balance_manual
  label: White Balance Manual
  kind: action
  params:
    - name: p1
      type: integer
      description: 01=+1 Red Gain, 02=-1 Red Gain
    - name: p2
      type: integer
      description: 01=+1 Blue Gain, 02=-1 Blue Gain

- id: pan_pbp
  label: Pan PBP
  kind: action
  params:
    - name: p1
      type: integer
      description: XGA 0-32 steps, SXGA/WXGA 0-40 steps
    - name: p2
      type: integer
      description: 0=Still, 1=Preview

- id: pan_mode
  label: Set Pan Mode
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Off, 1=On

- id: call_dip_switch_value
  label: Call DIP Switch Value
  kind: action
  params: []

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Off, 1=On

- id: iris
  label: Iris
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Auto, 1=Manual, 2=Stop (AC 50/60Hz)
    - name: p2
      type: integer
      description: Brightness 0-86 AC 50Hz, 0-69 AC 60Hz, 0-75 Normal

- id: switch_usb_transfer
  label: Switch USB Transfer
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Mass Storage, 1=USB Camera

- id: logo_delay
  label: Logo Delay
  kind: action
  params:
    - name: p1
      type: integer
      description: 0-30 seconds

- id: negative_film
  label: Negative (film)
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Off, 1=On

- id: color_gray
  label: Color (gray)
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Photo, 1=Gray

- id: language_select
  label: Language Select
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=English, 1=Traditional Chinese, 2=German, 3=French, 4=Spanish, 5=Russian, 6=Dutch, 7=Finnish, 8=Polish, 9=Italian, 10=Portuguese, 11=Swedish, 12=Czech

- id: brightness_control
  label: Brightness Control
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=-1, 1=+1

- id: source_live_pc
  label: Source live/PC
  kind: action
  params: []

- id: source_monitor
  label: Source Monitor
  kind: action
  params: []

- id: disable_digital_zoom_after_optical_zoom
  label: Disable Digital Zoom After Optical Zoom
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Disable, 1=Enable

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
      description: 0=Off, 1=On

- id: playback_image_index_change_page
  label: Playback Image Index Change Page
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Page Up, 1=Page Down

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
      description: 0=Off, 1=On

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
    - name: p2
      type: integer

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

- id: call_ac_power_state
  label: Call AC Power State
  kind: action
  params: []

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

- id: capture_type
  label: Capture Type
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Single, 1=Continuous, 2=Disable

- id: capture_time
  label: Capture Time
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=1hr, 1=2hr, 2=4hr, 3=8hr, 4=24hr

- id: capture_interval
  label: Capture Interval
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=5sec, 1=10sec, 2=30sec, 3=1min, 4=2min, 5=5min

- id: key_function
  label: Key Function
  kind: action
  params:
    - name: p1
      type: integer
      description: 1=Enter, 2=Up, 3=Down, 4=Left, 5=Right, 6=Menu

- id: set_rb_gain
  label: Set R/B Gain
  kind: action
  params:
    - name: p1
      type: integer
      description: 01=Red Gain, 02=Blue Gain
    - name: p2
      type: integer
      description: Low byte 0-1023
    - name: p3
      type: integer
      description: High byte

- id: call_rb_gain
  label: Call R/B Gain
  kind: action
  params:
    - name: p1
      type: integer
      description: 01=Red Gain, 02=Blue Gain

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
      description: 0=Photo, 1=Text, 2=Gray

- id: set_image_mode
  label: Set Image Mode
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Normal, 1=Slide, 2=Film, 3=Microscope

- id: night_vision
  label: Night Vision
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Off, 1=On

- id: system_on_off
  label: System ON/OFF
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Off, 1=On

- id: power
  label: Power
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Off, 1=On

- id: capture
  label: Capture
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Capture, 1=Record

- id: playback_thumbnail
  label: Playback Thumbnail
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Thumbnail, 1=PBP Thumbnail

- id: preview_rotation
  label: Preview Rotation
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Rotate 0, 1=Rotate 90, 2=Rotate 180, 3=Rotate 270

- id: delete
  label: Delete
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Delete one, 1=Delete all, 2=Format
    - name: p2
      type: integer
      description: 0=Format Nan B, 1=Format External

- id: call_system_status
  label: Call System Status
  kind: action
  params: []

- id: ac_frequency_select
  label: AC Frequency Select
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=50Hz, 1=60Hz

- id: lamp_on_off
  label: Lamp On/Off
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Disable, 1=Arm Light, 2=Back Light

- id: usb_camera
  label: USB Camera
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=Disable, 1=Enable

- id: firmware_upgrade
  label: Firmware Upgrade
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=External, 1=Internal

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  params:
    - name: p1
      type: integer
      description: 0-15

- id: call_audio_volume
  label: Call Audio Volume
  kind: action
  params: []

- id: service_menu
  label: Service Menu
  kind: action
  params:
    - name: p1
      type: integer
      description: 0=ServiceMenu1, 1=ServiceMenu2
```

## Feedbacks
```yaml
- id: communication_response
  type: enum
  values:
    - ACK
    - NAK
    - IGNORE
    - Not Used
  description: Status byte bit 1-0 in return packet

- id: system_status
  type: enum
  values:
    - not_ready
    - ready_to_receive_command
  description: P1 from call_system_status

- id: power_state
  type: enum
  values:
    - off
    - on
  description: P2 from call_system_status

- id: zoom_position
  type: integer
  description: SXGA 0-33, WXGA 0-35, XGA 0-43

- id: digital_zoom_position
  type: integer
  description: Rotate 0/180 XGA 0-63, WXGA 0-71, SXGA 0-73; Rotate 90/270 all 0-78

- id: focus_position
  type: integer
  description: 0-258

- id: freeze_status
  type: enum
  values:
    - off
    - on

- id: lamp_status
  type: enum
  values:
    - off
    - arm_light
    - back_light

- id: audio_volume
  type: integer
  description: 0-15
```

## Variables
```yaml
- id: brightness
  type: integer
  description: Iris brightness, range varies by AC frequency mode

- id: digital_zoom_limit
  type: integer
  description: 1-4 (1x to 4x)

- id: audio_volume
  type: integer
  description: 0-15
```

## Events
```yaml
```

## Macros
```yaml
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/Lumens/PS750/ps750_doc_6.pdf"
retrieved_at: 2026-04-30T04:36:37.918Z
last_checked_at: 2026-04-25T21:07:30.503Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:07:30.503Z
matched_actions: 79
action_count: 79
confidence: high
summary: "All 79 spec actions match source command table row-for-row; transport parameters verified; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
