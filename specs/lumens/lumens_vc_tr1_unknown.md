---
spec_id: admin/lumens-vc-tr1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens VC-TR1 Control Spec"
manufacturer: Lumens
model_family: VC-TR1
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - VC-TR1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS143%20-%20VC-TR1%20RS-232%20command%20set_1_4.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-05-13T06:46:11.615Z
last_checked_at: 2026-06-09T12:23:26.239Z
generated_at: 2026-06-09T12:23:26.239Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "VISCA over IP port number not stated in source; network configuration limited to DHCP mention only"
  - "remove section if not applicable"
  - "no safety warnings or interlock procedures in source"
  - "VISCA over IP port number not stated in source"
  - "VISCA over IP exact payload format not reproducible from omitted diagrams"
  - "IP address configuration limited to DHCP on/off, actual port/address not documented for IP mode"
verification:
  verdict: verified
  checked_at: 2026-06-09T12:23:26.239Z
  matched_actions: 118
  action_count: 118
  confidence: medium
  summary: "All 118 action ids matched to source commands; 26 inquiry response types represented in Feedbacks; transport parameters (9600 8N1, no flow control) verified verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Lumens VC-TR1 Control Spec

## Summary
PTZ camera supporting VISCA over RS-232 and VISCA over IP (UDP). Commands for pan-tilt drive, zoom, focus, exposure, white balance, and auto-tracking. No auth required.

<!-- UNRESOLVED: VISCA over IP port number not stated in source; network configuration limited to DHCP mention only -->

## Transport
```yaml
protocols:
  - serial
  - udp  # VISCA over IP, UDP transport
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # XON/XOFF and RTS/CTS not supported
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # power on/off commands present
- routable   # pan-tilt drive with position commands present
- queryable  # inquiry commands returning state present
- levelable  # zoom, focus, brightness, contrast, saturation, hue, sharpness control present
```

## Actions
```yaml
# Pan-Tilt Drive
- id: pan_tilt_up
  label: Pan-Tilt Up
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed 0x00 (low) to 0x18 (high)
    - name: tilt_speed
      type: integer
      description: Tilt speed 0x00 (low) to 0x14 (high)
- id: pan_tilt_down
  label: Pan-Tilt Down
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pan_tilt_left
  label: Pan-Tilt Left
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pan_tilt_right
  label: Pan-Tilt Right
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pan_tilt_stop
  label: Pan-Tilt Stop
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pan_tilt_home
  label: Pan-Tilt Home
  kind: action
  params: []
- id: pan_tilt_absolute_position
  label: Pan-Tilt Absolute Position
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
    - name: pan_position
      type: integer
      description: Pan position (0xFAE8 = -90° to 0x0518 = +90°)
    - name: tilt_position
      type: integer
      description: Tilt position (0xFE4D = -30° to 0x0518 = +90°)

# Zoom
- id: zoom_stop
  label: Zoom Stop
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)
- id: zoom_tele_standard
  label: Zoom Tele Standard
  kind: action
  params: []
- id: zoom_wide_standard
  label: Zoom Wide Standard
  kind: action
  params: []
- id: zoom_tele_variable
  label: Zoom Tele Variable
  kind: action
  params:
    - name: speed
      type: integer
      description: Variable speed 0x20 to 0x2F
- id: zoom_wide_variable
  label: Zoom Wide Variable
  kind: action
  params:
    - name: speed
      type: integer
      description: Variable speed 0x30 to 0x3F
- id: zoom_direct
  label: Zoom Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Zoom position 0 to 0x4000

# Focus
- id: focus_stop
  label: Focus Stop
  kind: action
  params:
    - name: speed
      type: integer
- id: focus_far_standard
  label: Focus Far Standard
  kind: action
  params: []
- id: focus_near_standard
  label: Focus Near Standard
  kind: action
  params: []
- id: focus_far_variable
  label: Focus Far Variable
  kind: action
  params:
    - name: speed
      type: integer
- id: focus_near_variable
  label: Focus Near Variable
  kind: action
  params:
    - name: speed
      type: integer
- id: focus_auto
  label: Auto Focus On
  kind: action
  params: []
- id: focus_manual
  label: Manual Focus Off
  kind: action
  params: []
- id: focus_one_push_trigger
  label: One Push AF Trigger
  kind: action
  params: []
- id: focus_direct
  label: Focus Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Focus position 0x36a0 to 0x4758

# ZoomFocus Combined
- id: zoom_focus_direct
  label: Zoom Focus Direct
  kind: action
  params:
    - name: zoom_position
      type: integer
    - name: focus_position
      type: integer

# Video Adjustments
- id: sharpness_direct
  label: Sharpness Direct
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness value 0 to 15
- id: brightness_direct
  label: Brightness Direct
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness value 0 to 14
- id: contrast_direct
  label: Contrast Direct
  kind: action
  params:
    - name: value
      type: integer
      description: Contrast value 0 to 14
- id: saturation_direct
  label: Saturation Direct
  kind: action
  params:
    - name: value
      type: integer
      description: Saturation value 0 to 14
- id: hue_direct
  label: Hue Direct
  kind: action
  params:
    - name: value
      type: integer
      description: Hue value 0 to 14

# Exposure
- id: shutter_up
  label: Shutter Up
  kind: action
  params: []
- id: shutter_down
  label: Shutter Down
  kind: action
  params: []
- id: shutter_direct
  label: Shutter Direct
  kind: action
  params:
    - name: speed
      type: integer
      description: Shutter speed 0 to 21
- id: iris_reset
  label: Iris Reset
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
- id: iris_direct
  label: Iris Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Iris position 0 to 13
- id: bright_reset
  label: Bright Reset
  kind: action
  params: []
- id: bright_up
  label: Bright Up
  kind: action
  params: []
- id: bright_down
  label: Bright Down
  kind: action
  params: []
- id: bright_direct
  label: Bright Direct
  kind: action
  params:
    - name: value
      type: integer
      description: Bright value 1 to 7
- id: exposure_full_auto
  label: Exposure Full Auto
  kind: action
  params: []
- id: exposure_manual
  label: Exposure Manual
  kind: action
  params: []
- id: exposure_shutter_priority
  label: Exposure Shutter Priority
  kind: action
  params: []
- id: exposure_iris_priority
  label: Exposure Iris Priority
  kind: action
  params: []
- id: exposure_bright
  label: Exposure Bright Mode
  kind: action
  params: []
- id: exposure_comp_reset
  label: Exposure Compensation Reset
  kind: action
  params: []
- id: exposure_comp_up
  label: Exposure Compensation Up
  kind: action
  params: []
- id: exposure_comp_down
  label: Exposure Compensation Down
  kind: action
  params: []
- id: exposure_comp_direct
  label: Exposure Compensation Direct
  kind: action
  params:
    - name: level
      type: integer
      description: ExpComp level 0 to 14

# White Balance
- id: wb_auto
  label: White Balance Auto
  kind: action
  params: []
- id: wb_indoor
  label: White Balance Indoor
  kind: action
  params: []
- id: wb_outdoor
  label: White Balance Outdoor
  kind: action
  params: []
- id: wb_one_push
  label: White Balance One Push
  kind: action
  params: []
- id: wb_atw
  label: White Balance ATW
  kind: action
  params: []
- id: wb_manual
  label: White Balance Manual
  kind: action
  params: []
- id: wb_sodium_lamp
  label: White Balance Sodium Lamp
  kind: action
  params: []
- id: wb_fluoro_lamp
  label: White Balance Fluorescent Lamp
  kind: action
  params: []
- id: wb_color_temp
  label: White Balance Color Temp
  kind: action
  params: []
- id: wb_one_push_trigger
  label: One Push WB Trigger
  kind: action
  params: []

# RGain / BGain
- id: rgain_reset
  label: R Gain Reset
  kind: action
  params: []
- id: rgain_up
  label: R Gain Up
  kind: action
  params: []
- id: rgain_down
  label: R Gain Down
  kind: action
  params: []
- id: rgain_direct
  label: R Gain Direct
  kind: action
  params:
    - name: value
      type: integer
      description: R Gain 0 to 128
- id: bgain_reset
  label: B Gain Reset
  kind: action
  params: []
- id: bgain_up
  label: B Gain Up
  kind: action
  params: []
- id: bgain_down
  label: B Gain Down
  kind: action
  params: []
- id: bgain_direct
  label: B Gain Direct
  kind: action
  params:
    - name: value
      type: integer
      description: B Gain 0 to 128

# Power
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []

# Tracking
- id: tracking_on
  label: Auto Tracking On
  kind: action
  params: []
- id: tracking_off
  label: Auto Tracking Off
  kind: action
  params: []
- id: tracking_screen_retention
  label: Set Tracking Screen Retention Time
  kind: action
  params:
    - name: time
      type: integer
      description: Retention time 3 to 10

# BLC
- id: blc_on
  label: BLC On
  kind: action
  params: []
- id: blc_off
  label: BLC Off
  kind: action
  params: []

# Video System
- id: video_system_set
  label: Video System Set
  kind: action
  params:
    - name: mode
      type: integer
      description: |
        0x01 = 1920x1080P30
        0x02 = 1280x720P60
        0x07 = 1920x1080P60
        0x09 = 1920x1080P25
        0x0A = 1280x720P50
        0x0F = 1920x1080P50

# Menu
- id: menu_on
  label: Menu On
  kind: action
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  params: []
- id: menu_enter
  label: Menu Enter
  kind: action
  params: []
- id: menu_back
  label: Menu Back
  kind: action
  params: []
- id: menu_up
  label: Menu Up
  kind: action
  params: []
- id: menu_down
  label: Menu Down
  kind: action
  params: []
- id: menu_left
  label: Menu Left
  kind: action
  params: []
- id: menu_right
  label: Menu Right
  kind: action
  params: []
- id: menu_stop
  label: Menu Stop
  kind: action
  params: []

# Presets
- id: preset_set
  label: Set Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-254)
- id: preset_get
  label: Get Preset
  kind: action
  params:
    - name: preset
      type: integer
- id: preset_clear
  label: Clear Preset
  kind: action
  params:
    - name: preset
      type: integer

# Auto-Framing / Tracking Modes (address 0x0B)
- id: everywhere_tracking_on
  label: Everywhere Tracking On
  kind: action
  params: []
- id: everywhere_tracking_off
  label: Everywhere Tracking Off
  kind: action
  params: []
- id: multi_people_detection_off
  label: Multi-people Detection Off
  kind: action
  params: []
- id: multi_people_frame
  label: Multi-People Frame
  kind: action
  params: []
- id: stage_frame
  label: Stage Frame
  kind: action
  params: []
- id: panoramic_stream
  label: Panoramic Stream
  kind: action
  params: []
- id: auto_framing_sensitivity
  label: Auto-Framing Sensitivity
  kind: action
  params:
    - name: value
      type: integer
- id: auto_framing_zoom_sensitivity
  label: Auto-Framing Zoom Sensitivity
  kind: action
  params:
    - name: value
      type: integer
- id: auto_tracking_sensitivity
  label: Auto-Tracking Sensitivity
  kind: action
  params:
    - name: value
      type: integer
- id: auto_tracking_pan_speed
  label: Auto-Tracking Pan Speed
  kind: action
  params:
    - name: value
      type: integer
- id: auto_tracking_tilt_speed
  label: Auto-Tracking Tilt Speed
  kind: action
  params:
    - name: value
      type: integer
- id: auto_tracking_lost_time
  label: Auto-Tracking Lost Time
  kind: action
  params:
    - name: value
      type: integer
- id: expert_mode_on
  label: Expert Mode On
  kind: action
  params: []
- id: expert_mode_off
  label: Expert Mode Off
  kind: action
  params: []
- id: partition_a_on
  label: Partition A On
  kind: action
  params: []
- id: partition_a_off
  label: Partition A Off
  kind: action
  params: []
- id: partition_b_on
  label: Partition B On
  kind: action
  params: []
- id: partition_b_off
  label: Partition B Off
  kind: action
  params: []
- id: partition_c_on
  label: Partition C On
  kind: action
  params: []
- id: partition_c_off
  label: Partition C Off
  kind: action
  params: []
- id: partition_d_on
  label: Partition D On
  kind: action
  params: []
- id: partition_d_off
  label: Partition D Off
  kind: action
  params: []

# Network / IP Settings
- id: set_ip_addr
  label: Set IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: IP address (ASCII)
    - name: mask
      type: string
      description: Subnet mask (ASCII)
    - name: gateway
      type: string
      description: Gateway (ASCII)
- id: set_dhcp
  label: Set DHCP
  kind: action
  params:
    - name: enable
      type: integer
      description: 2 = ON, 3 = OFF

# Device Commands
- id: address_set
  label: Address Set
  kind: action
  params: []
- id: if_clear
  label: I/F Clear
  kind: action
  params: []
- id: shutter_reset
  label: Shutter Reset
  kind: action
  params: []
- id: serial_upgrade_start
  label: Start Serial Port Upgrade
  kind: action
  params: []
- id: set_frame_preset
  label: Set Frame Preset
  kind: action
  params:
    - name: frame
      type: enum
      values: [presenter, stage, multi_people]
- id: get_frame_preset
  label: Get Frame Preset
  kind: action
  params:
    - name: frame
      type: enum
      values: [presenter, stage, multi_people]
- id: set_partition_preset
  label: Set Partition Preset
  kind: action
  params:
    - name: partition
      type: enum
      values: [A, B, C, D]
- id: get_partition_preset
  label: Get Partition Preset
  kind: action
  params:
    - name: partition
      type: enum
      values: [A, B, C, D]
```

## Feedbacks
```yaml
# Acknowledgements (socket-based)
- id: acknowledge
  label: Acknowledge
  type: object
  fields:
    - name: socket
      type: integer
      description: Socket number
# Completion
- id: completion
  label: Completion
  type: object
  fields:
    - name: socket
      type: integer
      description: Socket number
# Errors
- id: syntax_error
  label: Syntax Error
  type: enum
  values:
    - z0 60 02 FF
- id: command_buffer_full
  label: Command Buffer Full
  type: enum
  values:
    - z0 60 03 FF
- id: command_canceled
  label: Command Canceled
  type: enum
  values:
    - z0 6y 04 FF
- id: no_socket
  label: No Socket
  type: enum
  values:
    - z0 6y 05 FF
- id: command_not_executable
  label: Command Not Executable
  type: enum
  values:
    - z0 6y 41 FF

# Inquiry Responses
- id: pan_tilt_position_inq
  label: Pan-Tilt Position
  type: object
  fields:
    - name: pan
      type: integer
      description: Pan position (0xFAE8 to 0x0518)
    - name: tilt
      type: integer
      description: Tilt position (0xFE4D to 0x0518)
- id: zoom_position_inq
  label: Zoom Position
  type: integer
  description: Zoom position 0 to 0x4000
- id: focus_position_inq
  label: Focus Position
  type: integer
  description: Focus position 0x36a0 to 0x4758
- id: focus_mode_inq
  label: Focus Mode
  type: enum
  values:
    - "02": Auto Focus
    - "03": Manual Focus
- id: iris_position_inq
  label: Iris Position
  type: integer
- id: shutter_position_inq
  label: Shutter Position
  type: integer
- id: bright_position_inq
  label: Bright Position
  type: integer
- id: rgain_inq
  label: R Gain
  type: integer
- id: bgain_inq
  label: B Gain
  type: integer
- id: ae_mode_inq
  label: AE Mode
  type: enum
  values:
    - "00": Full Auto
    - "03": Manual
    - "0A": Shutter Priority
    - "0B": Iris Priority
    - "0D": Bright
- id: camera_version_inq
  label: Camera Version
  type: object
  fields:
    - name: manufacturer_id
      type: string
    - name: device_id
      type: string
    - name: version
      type: string
- id: video_system_inq
  label: Video System
  type: enum
  values:
    - "01": 1920x1080P30
    - "02": 1280x720P60
    - "07": 1920x1080P60
    - "09": 1920x1080P25
    - "0A": 1280x720P50
    - "0F": 1920x1080P50
- id: blc_status_inq
  label: BLC Status
  type: enum
  values:
    - "02": BLC ON
    - "03": BLC OFF
- id: tracking_status_inq
  label: Tracking Status
  type: enum
  values:
    - "02": Tracking
    - "03": Stop Track
- id: tracking_screen_retention_inq
  label: Tracking Screen Retention Time
  type: integer
- id: power_status_inq
  label: Power Status
  type: enum
  values:
    - "02": Power ON
    - "03": Power OFF
- id: sharpness_inq
  label: Sharpness
  type: integer
- id: brightness_inq
  label: Brightness
  type: integer
- id: contrast_inq
  label: Contrast
  type: integer
- id: saturation_inq
  label: Saturation
  type: integer
- id: hue_inq
  label: Hue
  type: integer
- id: firmware_inq
  label: Firmware Version
  type: string
  description: ASCII firmware version string
- id: net_info_inq
  label: Network Info
  type: string
  description: ASCII network info string (Track:Panom:Audio versions)
- id: dhcp_info_inq
  label: DHCP Info
  type: enum
  values:
    - "02": DHCP ON
    - "03": DHCP OFF
- id: track_version_inq
  label: Tracking Version
  type: object
  fields:
    - name: version
      type: string
- id: panom_version_inq
  label: Panoramic Version
  type: object
  fields:
    - name: version
      type: string
```

## Variables
```yaml
# No standalone Variables section - all parameters are action params or inquiry responses.
# UNRESOLVED: remove section if not applicable
```

## Events
```yaml
# Device does not send unsolicited notifications.
# All responses are reply-based (socket/polling).
# UNRESOLVED: remove section if not applicable
```

## Macros
```yaml
# No explicit multi-step macros documented.
# UNRESOLVED: remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All set commands fail during tracking state (except stop tracking, address set).
- All commands do not take effect during menu mode (except menu operation commands).
- VISCA over IP uses UDP; delivery not guaranteed, timeout/retry required on application layer.
- VISCA packet format: header byte (sender/receiver address) + payload + terminator FFh.
- Pan position range: 0xFAE8 (-90°) to 0x0518 (+90°). Tilt range: 0xFE4D (-30°) to 0x0518 (+90°).
<!-- UNRESOLVED: VISCA over IP port number not stated in source -->
<!-- UNRESOLVED: VISCA over IP exact payload format not reproducible from omitted diagrams -->
<!-- UNRESOLVED: IP address configuration limited to DHCP on/off, actual port/address not documented for IP mode -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS143%20-%20VC-TR1%20RS-232%20command%20set_1_4.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-05-13T06:46:11.615Z
last_checked_at: 2026-06-09T12:23:26.239Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T12:23:26.239Z
matched_actions: 118
action_count: 118
confidence: medium
summary: "All 118 action ids matched to source commands; 26 inquiry response types represented in Feedbacks; transport parameters (9600 8N1, no flow control) verified verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "VISCA over IP port number not stated in source; network configuration limited to DHCP mention only"
- "remove section if not applicable"
- "no safety warnings or interlock procedures in source"
- "VISCA over IP port number not stated in source"
- "VISCA over IP exact payload format not reproducible from omitted diagrams"
- "IP address configuration limited to DHCP on/off, actual port/address not documented for IP mode"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
