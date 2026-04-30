---
schema_version: ai4av-public-spec-v1
device_id: lumens-digital-optics-inc/cl510
entity_id: lumens_digital_optics_inc_cl510
spec_id: admin/lumens-digital-optics-inc-cl510
revision: 1
author: admin
title: "Lumens Digital Optics Inc CL510 Control Spec"
status: published
manufacturer: "Lumens Digital Optics Inc"
manufacturer_key: lumens-digital-optics-inc
model_family: CL510
aliases: []
compatible_with:
  manufacturers:
    - "Lumens Digital Optics Inc"
  models:
    - CL510
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
  - "https://mylumens.com/Download/CL510,V01%20RS-232%20command%20set_1_2.pdf"
source_documents:
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T18:06:09.396Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/CL510,V01%20RS-232%20command%20set_1_2.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T18:06:10.067Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T18:06:31.392Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T18:08:49.991Z
retrieved_at: 2026-04-26T18:08:49.991Z
last_checked_at: 2026-04-27T09:04:43.502Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:04:43.502Z
  matched_actions: 64
  action_count: 64
  confidence: high
  summary: "All 64 spec actions matched 1:1 to source commands; transport fully verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Lumens Digital Optics Inc CL510 Control Spec

## Summary
Lumens CL510 document camera with RS-232 half-duplex serial control at 9600bps 8N1. Supports 64 hex-encoded commands for zoom, focus, iris, white balance, image mode, capture, playback, and system state queries. No authentication required.

<!-- UNRESOLVED: Ethernet command set referenced in prior attempts but not recovered in this source -->

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
- powerable       # Power command (CMD B1: Off/On)
- queryable       # Multiple Call-* commands return state
- levelable       # Zoom, focus, iris, brightness support positional control
```

## Actions
```yaml
- id: preset_factory_reset
  label: Preset / Factory Reset
  kind: action
  params:
    - name: p1
      type: integer
      description: "0=Preset, 1=Factory Reset"
    - name: p2
      type: integer
      description: "00/01=Load/Save (Preset), ignored for Factory Reset"
    - name: p3
      type: integer
      description: "1~8=Preset index"

- id: slideshow_on_off
  label: Slide Show On/Off
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=Off, 01=On"

- id: slideshow_delay
  label: Slide Show Delay
  kind: action
  params:
    - name: p1
      type: integer
      description: "0~5=0.5/sec/1sec/3sec/5sec/10sec/Manual"

- id: image_record_quality
  label: Image/Record Quality
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01/02=High/Medium/Low"

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
      description: "00/01=Tele/Wide"

- id: zoom_direct_no_af
  label: Zoom Direct (Straight, No AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: "XGA:0~56, SXGA:0~48, WXGA:0~50, UXGA:0~44, 1080P:0~40"

- id: auto_erase
  label: Auto Erase
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Auto Erase off/on"

- id: digital_zoom_limit
  label: Digital Zoom Limit
  kind: action
  params:
    - name: p1
      type: integer
      description: "0x01~0x0A=1x~10x"

- id: digital_zoom_direct
  label: Digital Zoom Direct
  kind: action
  params:
    - name: p1
      type: integer
      description: "XGA:0~44, SXGA:0~52, WXGA:0~50, UXGA:0~56, 1080P:0~60"

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
      description: "00/01=Near/Far"
    - name: p2
      type: integer
      description: "00~06=Speed"

- id: focus_direct
  label: Focus Direct
  kind: action
  params:
    - name: p1
      type: integer
      description: "LowByte of position 0~478"
    - name: p2
      type: integer
      description: "HighByte of position 0~478"
    - name: p3
      type: integer
      description: "00~06=Speed"

- id: zoom_start_with_af
  label: Zoom Start (with AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Tele/Wide"

- id: zoom_direct_with_af
  label: Zoom Direct (Straight) (with AF)
  kind: action
  params:
    - name: p1
      type: integer
      description: "XGA:0~56, SXGA:0~48, WXGA:0~50, UXGA:0~44, 1080P:0~40"

- id: white_balance
  label: White Balance (AWB, Auto Tune)
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Auto Tune/AWB"

- id: set_pan_mode
  label: Set Pan Mode
  kind: action
  params:
    - name: p1
      type: integer
      description: "00=off, 01=on"

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
      description: "00/01=Off/On"

- id: iris
  label: Iris
  kind: action
  params:
    - name: p1
      type: integer
      description: "01=Manual AE OFF, 03=Manual (Normal 60Hz), 0=AE ON NightVision OFF, 2=AE OFF"
    - name: p2
      type: integer
      description: "Brightness: Normal 60Hz 0~100, NightVision 60Hz 0~80, Normal 50Hz 0~100"

- id: negative_film
  label: Negative (film)
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Off/On"

- id: color_gray
  label: Color (gray)
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Photo/Gray"

- id: language_select
  label: Language Select
  kind: action
  params:
    - name: p1
      type: integer
      description: "0~13=English/Traditional Chinese/German/French/Spanish/Russian/Dutch/Finnish/Polish/Italian/Portuguese/Swedish/Czech/Simplified Chinese"

- id: brightness_control
  label: Brightness Control
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=-1/+1"

- id: disable_digital_zoom_after_optical_zoom
  label: Disable Digital Zoom After Optical Zoom
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Disable/Enable"

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
      description: "00/01=power on setting/power off setting"
    - name: p2
      type: integer
      description: "00/01=Default logo/Customer logo"

- id: playback_image_index_change_page
  label: Playback Image Index Change Page
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Page Up/Page Down"

- id: all_osd_on_off
  label: All OSD On/Off
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Off/On"

- id: call_slave_version
  label: Call Slave Version
  kind: action
  params: []

- id: call_laser_status
  label: Call Laser Status
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
      description: "00/01=Read/Write"
    - name: p2
      type: integer
      description: "0x00~0xff"

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

- id: call_ac_50_60hz_power_state
  label: Call AC 50/60 Hz Power State
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
      description: "00/01/02=Single/Continuous/Disable"

- id: capture_time
  label: Capture Time
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01/02/03/04/05/06=1hr/2hr/4hr/8hr/24hr/48hr/72hr"

- id: capture_interval
  label: Capture Interval
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01/02/03/04/05=5sec/10sec/30sec/1min/2min/5min"

- id: key_function
  label: Key Function
  kind: action
  params:
    - name: p1
      type: integer
      description: "01/02/03/04/05/06=Enter/Up/Down/Left/Right/Menu"

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
      description: "00/01/02=Photo/Text/Gray"

- id: set_image_mode
  label: Set Image Mode
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01/02=Normal/Slide/Film"

- id: night_vision
  label: Night Vision
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Off/On"

- id: system_on_off
  label: System ON/OFF (All Lamp On)
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Off/On"

- id: power
  label: Power
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Off/On"

- id: capture
  label: Capture
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Capture/Record"

- id: playback_thumbnail
  label: Playback Thumbnail
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Thumbnail/PBP Thumbnail"

- id: preview_rotation
  label: Preview Rotation
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01/02/03=Rotate 0/90/180/270"

- id: delete
  label: Delete
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01/02=Delete one/Delete all/Format"

- id: call_system_status
  label: Call System Status
  kind: action
  params: []

- id: laser_on_off
  label: Laser On/Off
  kind: action
  params:
    - name: p1
      type: integer
      description: "00/01=Off/On"
```

## Feedbacks
```yaml
- id: command_status
  label: Command Status
  type: enum
  values:
    - 0
    - 1
    - 2
  description: "0=Action Succeed, 1=NAK (No Action), 2=Ignore (Command not in list)"

- id: system_status
  label: System Status
  type: enum
  values:
    - "00"
    - "01"
  description: "00=not ready, 01=Ready to receive command"

- id: power_status
  label: Power Status
  type: enum
  values:
    - "00"
    - "01"
  description: "00=Off, 01=On"

- id: zoom_position_response
  label: Zoom Position Response
  type: integer
  description: "XGA:0~56, SXGA:0~48, WXGA:0~50, UXGA:0~44, 1080P:0~40"

- id: digital_zoom_position_response
  label: Digital Zoom Position Response
  type: integer
  description: "XGA:0~44, SXGA:0~52, WXGA:0~50, UXGA:0~56, 1080P:0~60"

- id: focus_position_response
  label: Focus Position Response
  type: integer
  description: "0~956 (LowByte P1, HighByte P2)"

- id: master_version_response
  label: Master Version Response
  type: string
  description: "PVLxxx in ASCII (P1 P2 P3)"

- id: slave_version_response
  label: Slave Version Response
  type: string
  description: "PVMxxx in ASCII (P1 P2 P3)"
```

## Variables
```yaml
# No persistent settable parameters separate from actions in this spec
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented - device is half-duplex
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
Command packet format: `STX(A0h) + CMD(00~FFh) + P1 + P2 + P3 + ETX(AFh)`.
Return packet format: `STX(A0h) + CMD + P1 + P2 + P3 + Status + ETX(AFh)`.
Status bit field: Bit7=Iris Moving, Bit6=Zoom Moving, Bit5=Focus Moving, Bit1=Comm Response (0=ACK/1=NAK/2=IGNORE), Bit0=Comm Response LSB.
ACK=00, NAK=01, IGNORE=02 per command response table.
<!-- UNRESOLVED: Ethernet command set exists per prior attempts but source not recovered -->

## Provenance

```yaml
source_urls:
  - "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
  - "https://mylumens.com/Download/CL510,V01%20RS-232%20command%20set_1_2.pdf"
source_documents:
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T18:06:09.396Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/CL510,V01%20RS-232%20command%20set_1_2.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T18:06:10.067Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T18:06:31.392Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T18:08:49.991Z
retrieved_at: 2026-04-26T18:08:49.991Z
last_checked_at: 2026-04-27T09:04:43.502Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:04:43.502Z
matched_actions: 64
action_count: 64
confidence: high
summary: "All 64 spec actions matched 1:1 to source commands; transport fully verified."
```

## Known Gaps

```yaml
[]
```
