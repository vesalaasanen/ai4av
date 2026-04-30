---
schema_version: ai4av-public-spec-v1
device_id: crestron-1-beyond/iv-cama3-20-series
entity_id: crestron_1_beyond_iv_cama3_20_series
spec_id: admin/crestron_1_beyond-iv-cama3-20-series
revision: 1
author: admin
title: "Crestron 1 Beyond IV-CAMA3-20 Series Control Spec"
status: published
manufacturer: "Crestron 1 Beyond"
manufacturer_key: crestron-1-beyond
model_family: "IV-CAMA3-20 Series"
aliases: []
compatible_with:
  manufacturers:
    - "Crestron 1 Beyond"
  models:
    - "IV-CAMA3-20 Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: crestron_1_beyond_iv_cama3_20_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:31:32.043Z
retrieved_at: 2026-04-23T15:31:32.043Z
last_checked_at: 2026-04-23T15:31:32.043Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:31:32.043Z
  matched_actions: 80
  action_count: 80
  confidence: high
  summary: "All 80 spec actions matched verbatim in source; transport parameters confirmed; bidirectional coverage verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Crestron 1 Beyond IV-CAMA3-20 Series Control Spec

## Summary
Crestron 1 Beyond IV-CAMA3-20 Series PTZ camera controlled via VISCA protocol over TCP (port 5500) or serial RS-232/RS-485 (9600 bps). Supports power, pan-tilt-zoom, focus, white balance, exposure, and preset management. No authentication required.

<!-- UNRESOLVED: mount mode restriction — CAM_MountMode applies only to IV-CAM-P12 and IV-CAM-P20 models, not confirmed for IV-CAMA3-20 Series -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5500  # TCP default; verify per model
serial:
  baud_rate: 9600  # stated for serial control
  data_bits: 8  # UNRESOLVED: data bits not stated — VISCA default
  parity: none  # UNRESOLVED: parity not stated — VISCA default
  stop_bits: 1  # UNRESOLVED: stop bits not stated — VISCA default
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # CAM_Power On/Off command present
- routable  # CAM_Memory preset Save/Recall present
- queryable  # inquiry commands returning state present (CAM_PowerInq, CAM_ZoomPosInq, etc.)
- levelable  # zoom, focus, iris, shutter, gain, bright, expcomp all have variable positioning
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command: 8x 01 04 00 02 FF

- id: power_off
  label: Power Off
  kind: action
  params: []
  command: 8x 01 04 00 03 FF

- id: zoom_stop
  label: Zoom Stop
  kind: action
  params: []
  command: 8x 01 04 07 00 FF

- id: zoom_tele_standard
  label: Zoom Tele (Standard)
  kind: action
  params: []
  command: 8x 01 04 07 02 FF

- id: zoom_wide_standard
  label: Zoom Wide (Standard)
  kind: action
  params: []
  command: 8x 01 04 07 03 FF

- id: zoom_tele_variable
  label: Zoom Tele (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)
      range: [0, 7]
  command: 8x 01 04 07 2p FF  # p: speed

- id: zoom_wide_variable
  label: Zoom Wide (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)
      range: [0, 7]
  command: 8x 01 04 07 3p FF  # p: speed

- id: zoom_direct
  label: Zoom Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Zoom position (0000–4000 hex)
      range: [0, 16384]
  command: 8x 01 04 47 0p 0q 0r 0s FF  # p,q,r,s: zoom position hex

- id: zoom_absolute
  label: Zoom Absolute Position
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0–7
      range: [0, 7]
    - name: position
      type: integer
      description: Zoom position (0000–4000 hex)
      range: [0, 16384]
  command: 8x 01 04 47 0t 0p 01 04 0s FF  # t: speed; p,q,r,s: zoom position

- id: focus_stop
  label: Focus Stop
  kind: action
  params: []
  command: 8x 01 04 08 00 FF

- id: focus_far_standard
  label: Focus Far (Standard)
  kind: action
  params: []
  command: 8x 01 04 08 02 FF

- id: focus_near_standard
  label: Focus Near (Standard)
  kind: action
  params: []
  command: 8x 01 04 08 03 FF

- id: focus_far_variable
  label: Focus Far (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)
      range: [0, 7]
  command: 8x 01 04 08 2p FF  # p: speed

- id: focus_near_variable
  label: Focus Near (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)
      range: [0, 7]
  command: 8x 01 04 08 3p FF  # p: speed

- id: focus_direct
  label: Focus Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Focus position
      range: [0, 16384]
  command: 8x 01 04 48 0p 0q 0r 0s FF  # p,q,r,s: focus position

- id: focus_auto
  label: Auto Focus On/Off
  kind: action
  params:
    - name: enable
      type: boolean
      description: true = Auto Focus On, false = Manual Focus
  command: 8x 01 04 38 02 FF  # AF on
  # Off: 8x 01 04 38 03 FF

- id: focus_one_push
  label: One Push AF Trigger
  kind: action
  params: []
  command: 8x 01 04 18 01 FF

- id: zoom_focus_direct
  label: Zoom Focus Direct
  kind: action
  params:
    - name: zoom_position
      type: integer
      description: Zoom position
    - name: focus_position
      type: integer
      description: Focus position
  command: 8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w FF

- id: wb_auto
  label: White Balance Auto
  kind: action
  params: []
  command: 8x 01 04 35 00 FF

- id: wb_indoor
  label: White Balance Indoor
  kind: action
  params: []
  command: 8x 01 04 35 01 FF

- id: wb_outdoor
  label: White Balance Outdoor
  kind: action
  params: []
  command: 8x 01 04 35 02 FF

- id: wb_one_push
  label: White Balance One Push
  kind: action
  params: []
  command: 8x 01 04 35 03 FF

- id: wb_manual
  label: White Balance Manual
  kind: action
  params: []
  command: 8x 01 04 35 05 FF

- id: wb_one_push_trigger
  label: White Balance One Push Trigger
  kind: action
  params: []
  command: 8x 01 04 10 05 FF

- id: rgain_reset
  label: R Gain Reset
  kind: action
  params: []
  command: 8x 01 04 03 00 FF

- id: rgain_up
  label: R Gain Up
  kind: action
  params: []
  command: 8x 01 04 03 02 FF

- id: rgain_down
  label: R Gain Down
  kind: action
  params: []
  command: 8x 01 04 03 03 FF

- id: rgain_direct
  label: R Gain Direct
  kind: action
  params:
    - name: position
      type: integer
      description: R Gain position
  command: 8x 01 04 43 00 00 0p 0q FF  # p,q: R Gain

- id: bgain_reset
  label: B Gain Reset
  kind: action
  params: []
  command: 8x 01 04 04 00 FF

- id: bgain_up
  label: B Gain Up
  kind: action
  params: []
  command: 8x 01 04 04 02 FF

- id: bgain_down
  label: B Gain Down
  kind: action
  params: []
  command: 8x 01 04 04 03 FF

- id: bgain_direct
  label: B Gain Direct
  kind: action
  params:
    - name: position
      type: integer
      description: B Gain position
  command: 8x 01 04 44 00 00 0p 0q FF  # p,q: B Gain

- id: ae_full_auto
  label: Auto Exposure Full Auto
  kind: action
  params: []
  command: 8x 01 04 39 00 FF

- id: ae_manual
  label: Auto Exposure Manual
  kind: action
  params: []
  command: 8x 01 04 39 03 FF

- id: ae_shutter_priority
  label: Auto Exposure Shutter Priority
  kind: action
  params: []
  command: 8x 01 04 39 0A FF

- id: ae_iris_priority
  label: Auto Exposure Iris Priority
  kind: action
  params: []
  command: 8x 01 04 39 0B FF

- id: ae_bright
  label: Auto Exposure Bright Mode
  kind: action
  params: []
  command: 8x 01 04 39 0D FF

- id: shutter_reset
  label: Shutter Reset
  kind: action
  params: []
  command: 8x 01 04 0A 00 FF

- id: shutter_up
  label: Shutter Up
  kind: action
  params: []
  command: 8x 01 04 0A 02 FF

- id: shutter_down
  label: Shutter Down
  kind: action
  params: []
  command: 8x 01 04 0A 03 FF

- id: shutter_direct
  label: Shutter Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Shutter position
  command: 8x 01 04 4A 00 00 0p 0q FF  # p,q: shutter position

- id: iris_reset
  label: Iris Reset
  kind: action
  params: []
  command: 8x 01 04 0B 00 FF

- id: iris_up
  label: Iris Up
  kind: action
  params: []
  command: 8x 01 04 0B 02 FF

- id: iris_down
  label: Iris Down
  kind: action
  params: []
  command: 8x 01 04 0B 03 FF

- id: iris_direct
  label: Iris Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Iris position
  command: 8x 01 04 4B 00 00 0p 0q FF  # p,q: iris position

- id: gain_reset
  label: Gain Reset
  kind: action
  params: []
  command: 8x 01 04 0C 00 FF

- id: gain_up
  label: Gain Up
  kind: action
  params: []
  command: 8x 01 04 0C 02 FF

- id: gain_down
  label: Gain Down
  kind: action
  params: []
  command: 8x 01 04 0C 03 FF

- id: gain_direct
  label: Gain Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Gain position
  command: 8x 01 04 4C 00 00 0p 0q FF  # p,q: gain position

- id: bright_reset
  label: Bright Reset
  kind: action
  params: []
  command: 8x 01 04 0D 00 FF

- id: bright_up
  label: Bright Up
  kind: action
  params: []
  command: 8x 01 04 0D 02 FF

- id: bright_down
  label: Bright Down
  kind: action
  params: []
  command: 8x 01 04 0D 03 FF

- id: bright_direct
  label: Bright Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Bright position
  command: 8x 01 04 4D 00 00 0p 0q FF  # p,q: bright position

- id: expcomp_on
  label: Exposure Compensation On
  kind: action
  params: []
  command: 8x 01 04 3E 02 FF

- id: expcomp_off
  label: Exposure Compensation Off
  kind: action
  params: []
  command: 8x 01 04 3E 03 FF

- id: expcomp_reset
  label: Exposure Compensation Reset
  kind: action
  params: []
  command: 8x 01 04 0E 00 FF

- id: expcomp_up
  label: Exposure Compensation Up
  kind: action
  params: []
  command: 8x 01 04 0E 02 FF

- id: expcomp_down
  label: Exposure Compensation Down
  kind: action
  params: []
  command: 8x 01 04 0E 03 FF

- id: expcomp_direct
  label: Exposure Compensation Direct
  kind: action
  params:
    - name: position
      type: integer
      description: ExpComp position
  command: 8x 01 04 4E 00 00 0p 0q FF  # p,q: ExpComp position

- id: backlight_on
  label: Back Light Compensation On
  kind: action
  params: []
  command: 8x 01 04 33 02 FF

- id: backlight_off
  label: Back Light Compensation Off
  kind: action
  params: []
  command: 8x 01 04 33 03 FF

- id: preset_save
  label: Save Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0–255)
      range: [0, 255]
  command: 8x 01 04 3F 01 pp FF  # pp: preset number

- id: preset_recall
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0–255)
      range: [0, 255]
  command: 8x 01 04 3F 02 pp FF  # pp: preset number; yy in source doc

- id: freeze_on
  label: Freeze On
  kind: action
  params: []
  command: 8x 01 04 62 02 FF

- id: freeze_off
  label: Freeze Off
  kind: action
  params: []
  command: 8x 01 04 62 03 FF

- id: freeze_on_preset
  label: Freeze On When Running Preset
  kind: action
  params: []
  command: 8x 01 04 62 22 FF

- id: freeze_off_preset
  label: Freeze Off When Running Preset
  kind: action
  params: []
  command: 8x 01 04 62 23 FF

- id: ir_receive_on
  label: IR Receive On
  kind: action
  params: []
  command: 8x 01 06 08 02 FF

- id: ir_receive_off
  label: IR Receive Off
  kind: action
  params: []
  command: 8x 01 06 08 03 FF

- id: pantilt_up
  label: Pan-Tilt Up
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed 0x01 (low) to 0x18 (high)
      range: [1, 24]
    - name: tilt_speed
      type: integer
      description: Tilt speed 0x01 (low) to 0x14 (high)
      range: [1, 20]
  command: 8x 01 06 01 VV WW 03 01 FF

- id: pantilt_down
  label: Pan-Tilt Down
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed 0x01 to 0x18
      range: [1, 24]
    - name: tilt_speed
      type: integer
      description: Tilt speed 0x01 to 0x14
      range: [1, 20]
  command: 8x 01 06 01 VV WW 03 02 FF

- id: pantilt_left
  label: Pan-Tilt Left
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed 0x01 to 0x18
      range: [1, 24]
    - name: tilt_speed
      type: integer
      description: Tilt speed 0x01 to 0x14
      range: [1, 20]
  command: 8x 01 06 01 VV WW 01 03 FF

- id: pantilt_right
  label: Pan-Tilt Right
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed 0x01 to 0x18
      range: [1, 24]
    - name: tilt_speed
      type: integer
      description: Tilt speed 0x01 to 0x14
      range: [1, 20]
  command: 8x 01 06 01 VV WW 02 03 FF

- id: pantilt_up_left
  label: Pan-Tilt Up Left
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed 0x01 to 0x18
      range: [1, 24]
    - name: tilt_speed
      type: integer
      description: Tilt speed 0x01 to 0x14
      range: [1, 20]
  command: 8x 01 06 01 VV WW 01 01 FF

- id: pantilt_up_right
  label: Pan-Tilt Up Right
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed 0x01 to 0x18
      range: [1, 24]
    - name: tilt_speed
      type: integer
      description: Tilt speed 0x01 to 0x14
      range: [1, 20]
  command: 8x 01 06 01 VV WW 02 01 FF

- id: pantilt_down_left
  label: Pan-Tilt Down Left
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed 0x01 to 0x18
      range: [1, 24]
    - name: tilt_speed
      type: integer
      description: Tilt speed 0x01 to 0x14
      range: [1, 20]
  command: 8x 01 06 01 VV WW 01 02 FF

- id: pantilt_down_right
  label: Pan-Tilt Down Right
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed 0x01 to 0x18
      range: [1, 24]
    - name: tilt_speed
      type: integer
      description: Tilt speed 0x01 to 0x14
      range: [1, 20]
  command: 8x 01 06 01 VV WW 02 02 FF

- id: pantilt_stop
  label: Pan-Tilt Stop
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed 0x01 to 0x18
      range: [1, 24]
    - name: tilt_speed
      type: integer
      description: Tilt speed 0x01 to 0x14
      range: [1, 20]
  command: 8x 01 06 01 VV WW 03 03 FF

- id: pantilt_absolute
  label: Pan-Tilt Absolute Position
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed
    - name: tilt_speed
      type: integer
      description: Tilt speed
    - name: pan_position
      type: integer
      description: Pan position (0–0xFFFF)
    - name: tilt_position
      type: integer
      description: Tilt position (0–0xFFFF)
  command: 8x 01 06 02 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF

- id: pantilt_relative
  label: Pan-Tilt Relative Position
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed
    - name: tilt_speed
      type: integer
      description: Tilt speed
    - name: pan_position
      type: integer
      description: Pan position delta
    - name: tilt_position
      type: integer
      description: Tilt position delta
  command: 8x 01 06 03 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF

- id: pantilt_home
  label: Pan-Tilt Home
  kind: action
  params: []
  command: 8x 01 06 04 FF

- id: pantilt_reset
  label: Pan-Tilt Reset
  kind: action
  params: []
  command: 8x 01 06 05 FF

- id: pantilt_limit_set
  label: Pan-Tilt Limit Set
  kind: action
  params:
    - name: limit_type
      type: integer
      description: "1 = Up Right limit, 0 = Down Left limit"
      range: [0, 1]
    - name: pan_limit
      type: integer
      description: Pan limit position
    - name: tilt_limit
      type: integer
      description: Tilt limit position
  command: 8x 01 06 07 00 0W 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF
```

## Feedbacks
```yaml
- id: ack
  type: string
  values:
    - "z0 4y FF"
  description: ACK returned when command is accepted. y = Socket No.

- id: completion
  type: string
  values:
    - "z0 5y FF"
  description: Completion returned when command has been executed. y = Socket No.

- id: syntax_error
  type: string
  values:
    - "z0 60 02 FF"
  description: Returned when command format is illegal or parameters invalid.

- id: command_buffer_full
  type: string
  values:
    - "z0 60 03 FF"
  description: Returned when two sockets are already executing commands.

- id: command_canceled
  type: string
  values:
    - "z0 6y 04 FF"
  description: Returned when command in specified socket is canceled.

- id: no_socket
  type: string
  values:
    - "z0 6y 05 FF"
  description: Returned when no command in specified socket, or invalid socket number.

- id: command_not_executable
  type: string
  values:
    - "z0 6y 41 FF"
  description: Returned when command cannot be executed due to current conditions.

- id: power_state
  type: enum
  values:
    - on
    - off
    - internal_power_error  # y0 50 04 FF
  description: Power state query response. Inquiry CAM_PowerInq.

- id: zoom_position
  type: integer
  description: Zoom position (0–16384). Inquiry CAM_ZoomPosInq.

- id: focus_mode
  type: enum
  values:
    - auto_focus
    - manual_focus
  description: Focus mode query. Inquiry CAM_FocusModeInq.

- id: focus_position
  type: integer
  description: Focus position (0–16384). Inquiry CAM_FocusPosInq.

- id: wb_mode
  type: enum
  values:
    - auto
    - indoor
    - outdoor
    - one_push_wb
    - manual
  description: White balance mode query. Inquiry CAM_WBModeInq.

- id: rgain_position
  type: integer
  description: R Gain position. Inquiry CAM_RGainInq.

- id: bgain_position
  type: integer
  description: B Gain position. Inquiry CAM_BGainInq.

- id: ae_mode
  type: enum
  values:
    - full_auto
    - manual
    - shutter_priority
    - iris_priority
    - bright
  description: Auto exposure mode query. Inquiry CAM_AEModeInq.

- id: shutter_position
  type: integer
  description: Shutter position. Inquiry CAM_ShutterPosInq.

- id: iris_position
  type: integer
  description: Iris position. Inquiry CAM_IrisPosInq.

- id: gain_position
  type: integer
  description: Gain position. Inquiry CAM_GainPosInq.

- id: bright_position
  type: integer
  description: Bright position. Inquiry CAM_BrightPosInq.

- id: expcomp_mode
  type: enum
  values:
    - on
    - off
  description: Exposure compensation mode. Inquiry CAM_ExpCompModeInq.

- id: expcomp_position
  type: integer
  description: Exposure compensation position. Inquiry CAM_ExpCompPosInq.

- id: backlight_mode
  type: enum
  values:
    - on
    - off
  description: Back light compensation mode. Inquiry CAM_BacklightModeInq.

- id: memory_preset
  type: integer
  description: Last operated memory number (0–255). Inquiry CAM_MemoryInq.

- id: ir_receive
  type: enum
  values:
    - on
    - off
  description: IR receiver state. Inquiry IR_Receive.

- id: pantilt_max_speed
  type: object
  description: Pan and tilt maximum speeds. Inquiry Pan-tiltMaxSpeedI.
  properties:
    pan_max_speed: integer
    tilt_max_speed: integer

- id: pantilt_position
  type: object
  description: Pan and tilt current positions. Inquiry Pan-tiltPosInq.
  properties:
    pan_position: integer
    tilt_position: integer

- id: pantilt_mode
  type: object
  description: Pan/tilt status. Inquiry Pan-tiltModeInq.

- id: video_system
  type: enum
  values:
    - "1920x1080i/60"
    - "1920x1080p/30"
    - "1280x720p/60"
    - "1280x720p/30"
    - "1920x1080p/60"
    - "1920x1080i/50"
    - "1920x1080p/25"
    - "1280x720p/50"
    - "1280x720p/25"
    - "1920x1080p/50"
  description: Video system. Inquiry VideoSystemInq.

- id: camera_tracking
  type: enum
  values:
    - active
    - paused
  description: Camera tracking state. Inquiry CAM_TrackingInq.

- id: camera_version
  type: object
  description: Model code and ROM version. Inquiry CAM_VersionInq.
  properties:
    model_code: string
    rom_version: string
```

## Variables
```yaml
# UNRESOLVED: Variables are settable parameters not covered by discrete actions.
# The source documents all controllable parameters as VISCA command packets.
# No separate Variables section needed — all parameters are covered in Actions.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# VISCA does not define autonomous device-initiated messages — all
# responses are replies to commands or inquiry commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
```

## Notes
VISCA protocol uses device address byte `x` (socket address) in command packets. Socket number `y` in response packets equals device address + 8. `z` in error/ACK/completion messages equals device address + 8.

Zoom position table: 12x zoom range 0000–4000 hex (1x–12x optical). 20x zoom range 0000–4000 hex (1x–20x optical). Both maps use the same hex range; actual optical ratio depends on lens model.

Exposure compensation position range: 0E+7 (0000) to 00-7 (4000), centered at 07 (3549).

Pan speed range: 0x01 (low) to 0x18 (high, 24). Tilt speed range: 0x01 (low) to 0x14 (high, 20).

<!-- UNRESOLVED: CAM_MountMode commands (Stand/Ceiling) are documented for IV-CAM-P12 and IV-CAM-P20 only — applicability to IV-CAMA3-20 Series not confirmed -->
<!-- UNRESOLVED: data_bits, parity, stop_bits for serial — VISCA default 8/N/1 inferred but not stated -->
<!-- UNRESOLVED: flow_control settings for serial not stated -->
<!-- UNRESOLVED: TCP connection persistence / keepalive behavior not documented -->
<!-- UNRESOLVED: command timing and retry behavior not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: crestron_1_beyond_iv_cama3_20_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:31:32.043Z
retrieved_at: 2026-04-23T15:31:32.043Z
last_checked_at: 2026-04-23T15:31:32.043Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:31:32.043Z
matched_actions: 80
action_count: 80
confidence: high
summary: "All 80 spec actions matched verbatim in source; transport parameters confirmed; bidirectional coverage verified."
```

## Known Gaps

```yaml
[]
```
