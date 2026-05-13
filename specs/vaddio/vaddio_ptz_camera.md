---
spec_id: admin/vaddio-ptz-camera
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio PTZ Camera Control Spec"
manufacturer: Vaddio
model_family: "RoboSHOT 12 HDBT"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "RoboSHOT 12 HDBT"
    - "RoboSHOT 30 HDBT"
    - "RoboSHOT 12E HDBT"
    - "RoboSHOT 30E HDBT"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - fullcompass.com
  - manualslib.com
retrieved_at: 2026-05-05T03:11:30.078Z
last_checked_at: 2026-05-05T06:10:49.023Z
generated_at: 2026-05-05T06:10:49.023Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-05T06:10:49.023Z
  matched_actions: 31
  action_count: 31
  confidence: high
  summary: "All 31 spec actions matched source commands; transport parameters (port 23, baud 9600/38400, 8N1) verified verbatim in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Vaddio PTZ Camera Control Spec

## Summary
PTZ (pan-tilt-zoom) camera controllable via RS-232 serial and Telnet/TCP. Supports pan, tilt, zoom, focus, preset storage/recall, and CCU color/lighting management. Serial uses 9600 or 38400 baud 8N1; Telnet uses port 23 with admin login.

<!-- UNRESOLVED: specific model variant differences not enumerated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet port; source explicitly states "Telnet port 23 is used"
serial:
  baud_rate: 9600  # default; 38400 also supported per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # source states "Telnet sessions require the administrator account login"
  username: ""  # UNRESOLVED: username not stated in source
  password: ""  # UNRESOLVED: password not stated in source
```

## Traits
```yaml
# Source evidence: camera standby on/off, CAM_Power on/off commands present
- powerable
# Source evidence: camera pan/tilt/zoom/focus query and set commands present
- levelable
# Source evidence: camera ccu get/set commands return numeric values
- queryable
# Source evidence: camera preset recall/store commands; pan-tilt absolute position set
- routable
```

## Actions
```yaml
- id: camera_home
  label: Camera Home
  kind: action
  params: []
  description: Moves camera to home position. RS-232: 8x 01 06 04 FF

- id: camera_pan
  label: Camera Pan
  kind: action
  params:
    - name: direction
      type: enum
      values: [left, right, stop, get, set]
    - name: speed
      type: integer
      description: Pan speed 1-24 (left/right); position in degrees (set), -150.00 to 150.00
    - name: position
      type: float
      description: Absolute pan position in degrees (set), -150.00 to 150.00

- id: camera_tilt
  label: Camera Tilt
  kind: action
  params:
    - name: direction
      type: enum
      values: [up, down, stop, get, set]
    - name: speed
      type: integer
      description: Tilt speed 1-20 (up/down); position in degrees (set)
    - name: position
      type: float
      description: Absolute tilt position in degrees (set), -30.00 to 90.00

- id: camera_zoom
  label: Camera Zoom
  kind: action
  params:
    - name: direction
      type: enum
      values: [in, out, stop, get, set]
    - name: speed
      type: integer
      description: Zoom speed 1-7 (in/out)
    - name: level
      type: float
      description: Zoom level (set); e.g. 1.00 to 12.00 for 12x camera

- id: camera_focus
  label: Camera Focus
  kind: action
  params:
    - name: direction
      type: enum
      values: [near, far, stop, mode]
    - name: speed
      type: integer
      description: Focus speed 1-8 (near/far)
    - name: focus_mode
      type: enum
      values: [get, auto, manual]
      description: Focus mode (mode subcommand)

- id: camera_preset
  label: Camera Preset
  kind: action
  params:
    - name: operation
      type: enum
      values: [recall, store]
    - name: preset_number
      type: integer
      description: Preset number 1-16
    - name: tri_sync
      type: integer
      description: Optional tri-sync speed 1-24
    - name: save_ccu
      type: boolean
      description: Optional; save CCU settings with preset

- id: camera_ccu_set
  label: Camera CCU Set
  kind: action
  params:
    - name: param
      type: enum
      values:
        - auto_white_balance
        - red_gain
        - blue_gain
        - backlight_compensation
        - auto_iris
        - iris
        - gain
        - detail
        - chroma
        - gamma
        - wide_dynamic_range
    - name: value
      type: union
      description: Value for param (on/off for boolean, integer for numeric)

- id: camera_ccu_scene
  label: Camera CCU Scene
  kind: action
  params:
    - name: operation
      type: enum
      values: [recall, store]
    - name: scene_type
      type: enum
      values: [factory, custom]
    - name: scene_number
      type: integer
      description: Factory 1-6 or custom 1-3

- id: camera_led
  label: Camera LED
  kind: action
  params:
    - name: state
      type: enum
      values: [get, off, on]

- id: camera_standby
  label: Camera Standby
  kind: action
  params:
    - name: state
      type: enum
      values: [get, off, on, toggle]

- id: streaming_ip_enable
  label: Streaming IP Enable
  kind: action
  params:
    - name: state
      type: enum
      values: [get, on, off, toggle]

- id: streaming_settings_get
  label: Streaming Settings Get
  kind: action
  params:
    - name: param
      type: enum
      values:
        - IP_Custom_Frame_Rate
        - IP_Custom_Resolution
        - IP_Enabled
        - IP_MTU
        - IP_Port
        - IP_Preset_Quality
        - IP_Preset_Resolution
        - IP_Protocol
        - IP_URL
        - IP_Video_Mode

- id: network_settings_get
  label: Network Settings Get
  kind: action
  params: []

- id: network_ping
  label: Network Ping
  kind: action
  params:
    - name: host
      type: string
      description: IP address or hostname
    - name: count
      type: integer
      description: Number of packets (default 5)
    - name: size
      type: integer
      description: Packet size (default 56)

- id: system_reboot
  label: System Reboot
  kind: action
  params:
    - name: delay
      type: integer
      description: Delay in seconds (optional)

- id: system_factory_reset
  label: System Factory Reset
  kind: action
  params:
    - name: state
      type: enum
      values: [get, on, off]

- id: version
  label: Version
  kind: action
  params: []

- id: cam_power
  label: CAM Power
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: cam_mute
  label: CAM Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, toggle]

- id: cam_nr
  label: CAM Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: Noise reduction level 0-5

# RS-232-only binary commands (from hex command tables)
- id: rs232_pan_tilt_drive
  label: RS-232 Pan-Tilt Drive
  kind: action
  params:
    - name: direction
      type: enum
      values: [up, down, left, right, upleft, upright, downleft, downright, stop, home]
    - name: pan_speed
      type: integer
      description: Pan speed 01h-18h (hex)
    - name: tilt_speed
      type: integer
      description: Tilt speed 01h-14h (hex)

- id: rs232_pan_tilt_zoom_drive
  label: RS-232 Pan-Tilt-Zoom Drive
  kind: action
  params:
    - name: direction
      type: enum
      values: [up, down, left, right, in, out, stop, home]
    - name: pan_speed
      type: integer
      description: Pan speed 01h-18h (hex)
    - name: tilt_speed
      type: integer
      description: Tilt speed 01h-14h (hex)
    - name: zoom_speed
      type: integer
      description: Zoom speed 00h-07h (hex)

- id: rs232_cam_memory
  label: RS-232 CAM Memory
  kind: action
  params:
    - name: operation
      type: enum
      values: [reset, set_standard, set_standard_scene, set_trisync, set_trisync_scene, recall]
    - name: preset
      type: integer
      description: Preset number 0h-0Fh (hex)
    - name: speed
      type: integer
      description: Speed 01h-18h (hex, tri-sync variants only)
- id: camera_ccu_get
  label: Camera CCU Get
  kind: query
  params:
    - name: param
      type: enum
      values:
        - all
        - auto_white_balance
        - red_gain
        - blue_gain
        - backlight_compensation
        - auto_iris
        - iris
        - gain
        - detail
        - chroma
        - gamma
        - wide_dynamic_range
  description: Returns CCU (lighting and color) information for the specified parameter.

- id: help
  label: Help
  kind: action
  params: []
  description: Displays an overview of the CLI syntax.

- id: history
  label: History
  kind: action
  params:
    - name: limit
      type: integer
      description: Maximum number of commands to return (optional)
  description: Returns the most recently issued commands from the current Telnet session.

- id: exit
  label: Exit
  kind: action
  params: []
  description: Ends the command session and then closes the socket.

- id: rs232_cam_ip_address_inq
  label: RS-232 CAM IP Address Inquiry
  kind: query
  params: []
  description: Returns the camera IP address as ppp.qqq.rrr.sss. Command: 8x 09 08 4E 00 00 FF

- id: rs232_cam_wb_mode_inq
  label: RS-232 CAM WB Mode Inquiry
  kind: query
  params: []
  description: Returns white balance mode (Auto or Manual). Command: 8x 09 04 35 FF

- id: rs232_cam_ae_mode_inq
  label: RS-232 CAM AE Mode Inquiry
  kind: query
  params: []
  description: Returns auto exposure mode (Auto or Manual). Command: 8x 09 04 39 FF

- id: rs232_cam_memory_inq
  label: RS-232 CAM Memory Inquiry
  kind: query
  params: []
  description: Returns the preset number recalled last (00h-0Fh). Command: 8x 09 04 3F FF

- id: rs232_cam_focus_mode_inq
  label: RS-232 CAM Focus Mode Inquiry
  kind: query
  params: []
  description: Returns focus mode (Auto or Manual). Command: 8x 09 04 38 FF
```

## Feedbacks
```yaml
- id: pan_position
  type: float
  description: Absolute pan position in degrees, -150.00 to 150.00

- id: tilt_position
  type: float
  description: Absolute tilt position in degrees, -30.00 to 90.00

- id: zoom_level
  type: float
  description: Current zoom level

- id: focus_mode
  type: enum
  values: [auto, manual]

- id: focus_position
  type: integer
  description: Focus position (hex value)

- id: standby_state
  type: boolean
  description: Camera standby state (on/off)

- id: led_state
  type: boolean
  description: Indicator LED state (on/off)

- id: streaming_state
  type: boolean
  description: IP streaming enabled state

- id: streaming_settings
  type: object
  description: Streaming settings object (port, protocol, resolution, etc.)

- id: network_info
  type: object
  description: Network info (MAC, IP, netmask, gateway)

- id: factory_reset_status
  type: object
  description: Factory reset software/hardware status

- id: power_state
  type: enum
  values: [on, off]

- id: mute_state
  type: boolean
  description: Video mute state

- id: ccu_all
  type: object
  description: All CCU settings (auto_iris, auto_white_balance, backlight_compensation, blue_gain, chroma, detail, gain, iris, red_gain, wide_dynamic_range)

- id: ccu_auto_white_balance
  type: boolean

- id: ccu_red_gain
  type: integer
  description: Red gain 0-255

- id: ccu_blue_gain
  type: integer
  description: Blue gain 0-255

- id: ccu_backlight_compensation
  type: boolean

- id: ccu_auto_iris
  type: boolean

- id: ccu_iris
  type: integer
  description: Iris value 0-11

- id: ccu_gain
  type: integer
  description: Gain value 0-11

- id: ccu_detail
  type: integer
  description: Detail value 0-15

- id: ccu_chroma
  type: integer
  description: Chroma value 0-14

- id: ccu_gamma
  type: integer
  description: Gamma value -64 to 64

- id: ccu_wide_dynamic_range
  type: boolean

- id: wb_mode
  type: enum
  values: [auto, manual]

- id: shutter_position
  type: integer
  description: Shutter position (see shutter speed table)

- id: aperture_value
  type: integer
  description: Aperture value

- id: noise_reduction_level
  type: integer
  description: Noise reduction 0-5

- id: tally_state
  type: boolean

- id: model_info
  type: string
  description: Camera model identification

- id: firmware_version
  type: object
  description: Firmware version info (Commit, HDLink, Pan/Tilt Motor, Sensor, System Version)
```

## Variables
```yaml
# CCU parameters exposed as settable variables
- id: auto_white_balance
  type: boolean
- id: red_gain
  type: integer
  min: 0
  max: 255
- id: blue_gain
  type: integer
  min: 0
  max: 255
- id: backlight_compensation
  type: boolean
- id: auto_iris
  type: boolean
- id: iris
  type: integer
  min: 0
  max: 11
- id: gain
  type: integer
  min: 0
  max: 11
- id: detail
  type: integer
  min: 0
  max: 15
- id: chroma
  type: integer
  min: 0
  max: 14
- id: gamma
  type: integer
  min: -64
  max: 64
- id: wide_dynamic_range
  type: boolean
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Auto white balance overrides manual red gain and blue gain settings when enabled"
  - "Auto-iris disables manual iris and gain when enabled"
  - "Wide dynamic range requires backlight compensation to be off"
  - "Factory reset occurs on next reboot after system factory-reset on command"
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond CCU dependency notes
```

## Notes
Serial and Telnet share command semantics; Telnet provides human-readable command syntax while RS-232 uses binary VISCA-compatible packet format. Camera models: RoboSHOT 12 HDBT (12x zoom), RoboSHOT 30 HDBT (30x zoom). Default baud 9600; 38400 optional if device supports it. Telnet requires admin login — credentials not documented in source.
<!-- UNRESOLVED: admin username/password not stated in source -->
<!-- UNRESOLVED: RTSP/RTMP streaming protocol details beyond port defaults (554/1935) not fully documented -->
<!-- UNRESOLVED: shutter speed values are enumerated for 60/59.94/30/29.97 and 50/25 fps but source does not specify which framerate is active -->
<!-- UNRESOLVED: CAM_Tally command hex documented but purpose/context not explained in source -->
<!-- UNRESOLVED: CAM_NR (noise reduction) documented but no corresponding Telnet command found in source -->
<!-- UNRESOLVED: CAM_PTZ_PresetSpeed RS-232 command documented but no corresponding Telnet API command found -->

## Provenance

```yaml
source_domains:
  - fullcompass.com
  - manualslib.com
retrieved_at: 2026-05-05T03:11:30.078Z
last_checked_at: 2026-05-05T06:10:49.023Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-05T06:10:49.023Z
matched_actions: 31
action_count: 31
confidence: high
summary: "All 31 spec actions matched source commands; transport parameters (port 23, baud 9600/38400, 8N1) verified verbatim in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
