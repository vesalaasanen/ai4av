---
spec_id: admin/cisco-precisionhd-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cisco PrecisionHD Series Control Spec"
manufacturer: Cisco
model_family: "PrecisionHD Camera 1080p12x"
aliases: []
compatible_with:
  manufacturers:
    - Cisco
  models:
    - "PrecisionHD Camera 1080p12x"
    - "PrecisionHD Camera 1080p4x"
    - "Precision 40 Camera"
    - "PrecisionHD Camera 1080p2.5x"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cisco.com
  - developer.webex.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/sx-series/tc7/api-reference-guide/sx80-api-reference-guide-tc72.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/sx-series/tc7/api-reference-guide/sx80-api-reference-guide-tc73.pdf
  - https://developer.webex.com/docs/devices
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/camera/precisionhd/user_guide/precisionhd_1080p-720p_camera_user_guide.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-2602/api-reference-guide-roomos-2602.pdf
retrieved_at: 2026-05-14T22:56:18.279Z
last_checked_at: 2026-05-15T21:25:38.186Z
generated_at: 2026-05-15T21:25:38.186Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-15T21:25:38.186Z
  matched_actions: 57
  action_count: 57
  confidence: high
  summary: "All 57 spec actions matched to source VISCA command table entries; transport parameters fully verified in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Cisco PrecisionHD Series Control Spec

## Summary

RS-232 VISCA protocol camera control for Cisco PrecisionHD series cameras (1080p12x, 1080p4x, 1080p2.5x, Precision 40). Controls pan/tilt/zoom/focus, white balance, exposure, image flip/mirror, backlight compensation, gamma, and LED indicators. Serial-only; no IP or network control. Camera is queryable via inquiry commands. **Power commands do not toggle power — they only reset motors.** DIP switches are read at boot only.

<!-- UNRESOLVED: Some commands marked * do not apply to 1080p4x, 1080p2.5x, Precision 40 cameras — per-model capability matrix not stated -->

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
- powerable      # Power_Off / Power_On commands present (motor reset only)
- routable       # Video_Format command present
- queryable      # Multiple inquiry commands present
- levelable      # Zoom_Direct, Focus_Direct, Iris_Direct, Gain_Direct present
```

## Actions
```yaml
- id: Power_On
  label: Power On (Motor Reset)
  kind: action
  params: []
  comment: Stores zoom/focus value, resets motors. Does not toggle power.

- id: Power_Off
  label: Power Off (Motor Reset)
  kind: action
  params: []
  comment: PrecisionHD 720p only if camera on long time. Motor reset only.

- id: Video_Format
  label: Select Video Format
  kind: action
  params:
    - name: video_mode
      type: integer
      description: Video mode selection (0x0000-0x0009 per DIP switch table)
    - name: reserved
      type: integer
      description: Reserved parameter (set to 0)

- id: WB_Auto
  label: White Balance Auto
  kind: action
  params: []

- id: WB_Table_Manual
  label: White Balance Table Manual
  kind: action
  params: []

- id: WB_Table_Direct
  label: White Balance Table Direct
  kind: action
  params:
    - name: table_index
      type: integer
      description: WB table index (4 bytes)

- id: AE_Auto
  label: Auto Exposure
  kind: action
  params: []

- id: AE_Manual
  label: Manual Exposure
  kind: action
  params: []

- id: Iris_Direct
  label: Iris Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Iris position 0-50

- id: Gain_Direct
  label: Gain Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Gain position 12-21 dB

- id: Backlight_On
  label: Backlight Compensation On
  kind: action
  params: []

- id: Backlight_Off
  label: Backlight Compensation Off
  kind: action
  params: []

- id: Mirror_On
  label: Mirror On
  kind: action
  params: []

- id: Mirror_Off
  label: Mirror Off
  kind: action
  params: []

- id: Flip_On
  label: Flip On
  kind: action
  params: []

- id: Flip_Off
  label: Flip Off
  kind: action
  params: []

- id: Gamma_Auto
  label: Gamma Auto
  kind: action
  params: []

- id: Gamma_Manual
  label: Gamma Manual
  kind: action
  params: []

- id: Gamma_Direct
  label: Gamma Direct
  kind: action
  params:
    - name: table
      type: integer
      description: Gamma table 0-7

- id: MM_Detect_On
  label: Motor Moved Detection On
  kind: action
  params: []

- id: MM_Detect_Off
  label: Motor Moved Detection Off
  kind: action
  params: []

- id: Call_LED_On
  label: Call LED On
  kind: action
  params: []

- id: Call_LED_Off
  label: Call LED Off
  kind: action
  params: []

- id: Call_LED_Blink
  label: Call LED Blink
  kind: action
  params: []

- id: Power_LED_On
  label: Power LED On
  kind: action
  params: []

- id: Power_LED_Off
  label: Power LED Off
  kind: action
  params: []

- id: IR_Output_On
  label: IR Output On
  kind: action
  params: []

- id: IR_Output_Off
  label: IR Output Off
  kind: action
  params: []

- id: IR_CameraControl_On
  label: IR Camera Control On
  kind: action
  params: []

- id: IR_CameraControl_Off
  label: IR Camera Control Off
  kind: action
  params: []

- id: Zoom_Stop
  label: Zoom Stop
  kind: action
  params: []

- id: Zoom_Tele
  label: Zoom Tele ( telephoto)
  kind: action
  params:
    - name: speed
      type: integer
      description: Zoom speed parameter

- id: Zoom_Wide
  label: Zoom Wide
  kind: action
  params:
    - name: speed
      type: integer
      description: Zoom speed parameter

- id: Zoom_Direct
  label: Zoom Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Zoom position (4 bytes)

- id: ZoomFocus_Direct
  label: Zoom Focus Direct
  kind: action
  params:
    - name: zoom_position
      type: integer
      description: Zoom position (4 bytes)
    - name: focus_position
      type: integer
      description: Focus position (4 bytes)

- id: Focus_Stop
  label: Focus Stop
  kind: action
  params: []

- id: Focus_Far
  label: Focus Far
  kind: action
  params:
    - name: speed
      type: integer
      description: Focus speed parameter

- id: Focus_Near
  label: Focus Near
  kind: action
  params:
    - name: speed
      type: integer
      description: Focus speed parameter

- id: Focus_Direct
  label: Focus Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Focus position (4 bytes)

- id: Focus_Auto
  label: Focus Auto (Autofocus)
  kind: action
  params: []

- id: Focus_Manual
  label: Focus Manual
  kind: action
  params: []

- id: PT_Stop
  label: Pan/Tilt Stop
  kind: action
  params: []

- id: PT_Reset
  label: Pan/Tilt Reset
  kind: action
  params: []

- id: PT_Up
  label: Pan/Tilt Up
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer

- id: PT_Down
  label: Pan/Tilt Down
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer

- id: PT_Left
  label: Pan/Tilt Left
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer

- id: PT_Right
  label: Pan/Tilt Right
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer

- id: PT_UpLeft
  label: Pan/Tilt Up Left
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer

- id: PT_DownLeft
  label: Pan/Tilt Down Left
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer

- id: PT_DownRight
  label: Pan/Tilt Down Right
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer

- id: PT_UpRight
  label: Pan/Tilt Up Right
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer

- id: PT_Direct
  label: Pan/Tilt Direct
  kind: action
  params:
    - name: max_pan_speed
      type: integer
    - name: max_tilt_speed
      type: integer
    - name: pan_position
      type: integer
    - name: tilt_position
      type: integer

- id: PTZF_Direct
  label: Pan/Tilt/Zoom/Focus Direct
  kind: action
  params:
    - name: pan
      type: integer
    - name: tilt
      type: integer
    - name: zoom
      type: integer
    - name: focus
      type: integer
  comment: Do not route through Sony cameras.

- id: PT_Limit_Set
  label: Pan/Tilt Limit Set
  kind: action
  params:
    - name: direction
      type: integer
      description: 1=Up/Right, 0=Down/Left
    - name: pan_limit
      type: integer
    - name: tilt_limit
      type: integer
  comment: Does not apply to 1080p4x, 1080p2.5x, Precision 40.

- id: PT_Limit_Clear
  label: Pan/Tilt Limit Clear
  kind: action
  params:
    - name: direction
      type: integer
      description: 1=Up/Right, 0=Down/Left
  comment: Does not apply to 1080p4x, 1080p2.5x, Precision 40.

- id: CAM_Speed
  label: Set Serial Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: 0=9600, 1=115200
  comment: Wait 20 seconds after ok before sending new commands.

- id: CAM_Boot
  label: Reboot Camera
  kind: action
  params: []
  comment: Resets serial speed to 9600.
```

## Feedbacks
```yaml
- id: CAM_ID
  label: Camera ID
  type: integer
  values: [80]
  response: "90 50 zz xx 00 yy ff"
  comment: zz=0x50 identifies this camera.

- id: CAM_SWID
  label: Software ID
  type: string
  response: "y0 50 [1-125 bytes ASCII] ff"
  comment: Do not route through Sony cameras.

- id: CAM_HWID
  label: Hardware ID (Serial Number)
  type: string
  response: "y0 50 [12 bytes ASCII] ff"

- id: Zoom_Pos
  label: Zoom Position
  type: integer
  response: "y0 50 0p 0q 0r 0s ff"

- id: Focus_Pos
  label: Focus Position
  type: integer
  response: "y0 50 0p 0q 0r 0s ff"

- id: Focus_Mode
  label: Focus Mode
  type: enum
  values:
    - 2  # Auto
    - 3  # Manual
  response: "y0 50 0p ff"

- id: PanTilt_Pos
  label: Pan/Tilt Position
  type: integer
  response: "y0 50 0p 0q 0r 0s 0t 0u 0v 0w ff"

- id: Power_State
  label: Power State
  type: enum
  values:
    - 2  # On
    - 3  # Off
  response: "y0 50 0p ff"

- id: WB_Mode
  label: White Balance Mode
  type: enum
  values:
    - 0  # Auto
    - 6  # Table manual
  response: "y0 50 0p ff"

- id: WB_Table
  label: White Balance Table
  type: integer
  response: "y0 50 0p 0q 0r 0s ff"

- id: AE_Mode
  label: Auto Exposure Mode
  type: enum
  values:
    - 0  # Auto
    - 3  # Manual
  response: "y0 50 0p ff"

- id: Backlight_Mode
  label: Backlight Mode
  type: enum
  values:
    - 2  # On
    - 3  # Off
    - 4  # Auto
  response: "y0 50 0p ff"

- id: Mirror_State
  label: Mirror State
  type: enum
  values:
    - 2  # On
    - 3  # Off
  response: "y0 50 0p ff"

- id: Flip_State
  label: Flip State
  type: enum
  values:
    - 2  # On
    - 3  # Off
  response: "y0 50 0p ff"

- id: Gamma_Mode
  label: Gamma Mode
  type: enum
  values:
    - 2  # Auto
    - 3  # Manual
  response: "y0 50 0p ff"

- id: Gamma_Table
  label: Gamma Table
  type: integer
  response: "y0 50 0p 0q 0r 0s ff"

- id: Call_LED_State
  label: Call LED State
  type: enum
  values:
    - 2  # On
    - 3  # Off
    - 4  # Blink
  response: "y0 50 0p ff"

- id: Power_LED_State
  label: Power LED State
  type: enum
  values:
    - 2  # On
    - 3  # Off
  response: "y0 50 0p ff"

- id: Video_System
  label: Video System
  type: enum
  values:
    - 0x0000  # Auto
    - 0x0001  # 1920x1080p30
    - 0x0002  # 1920x1080p50
    - 0x0003  # 1920x1080p60
    - 0x0004  # 1280x720p25
    - 0x0005  # 1280x720p30
    - 0x0006  # 1280x720p50
    - 0x0007  # 1280x720p60
    - 0x0009  # SW control
  response: "y0 50 0p 0q 0r 0s ff"

- id: DIP_Switch
  label: DIP Switch
  type: integer
  response: "y0 50 0p 0q 0r 0s ff"
  comment: Does not apply to 1080p4x, 1080p2.5x, Precision 40.

- id: IR_Output_State
  label: IR Output State
  type: enum
  values:
    - 2  # On
    - 3  # Off
  response: "y0 50 0p ff"

- id: ALS_RGain
  label: Ambient Light Sensor Red Gain
  type: integer
  response: "y0 50 0p 0q 0r 0s 0t 0u 0v 0w ff"
  comment: Does not apply to 1080p4x, 1080p2.5x, Precision 40.

- id: ALS_BGain
  label: Ambient Light Sensor Blue Gain
  type: integer
  comment: Does not apply to 1080p4x, 1080p2.5x, Precision 40.

- id: ALS_GGain
  label: Ambient Light Sensor Green Gain
  type: integer
  comment: Does not apply to 1080p4x, 1080p2.5x, Precision 40.

- id: ALS_WGain
  label: Ambient Light Sensor White Gain
  type: integer
  comment: Does not apply to 1080p4x, 1080p2.5x, Precision 40.

- id: UpsideDown_State
  label: Upside Down State
  type: enum
  values:
    - 0  # Upright
    - 1  # Upside down
  response: "y0 50 0p ff"
  comment: Does not apply to 1080p4x, 1080p2.5x, Precision 40.

- id: Command_Completion
  label: Command Completion
  type: enum
  values:
    - 90-5Y-FF  # Completion OK
    - 90-6Y-..-FF  # Error (see error codes)
  response: "90-5Y-FF"

- id: Network_Change
  label: Network Change Notification
  type: event
  response: "y0 38 ff"
  comment: Cameras added/removed from chain. Wait 9 seconds before reconfiguring.

- id: IR_Push
  label: IR Push Event
  type: event
  response: "y0 07 7d 02 gg hh ff"
  comment: IR code received when IR mode is on.
```

## Variables
```yaml
# No standalone settable parameters - all are action parameters or inquiry responses.
```

## Events
```yaml
- id: Network_Change
  label: Network Change
  description: Camera detects cameras added/removed from chain.
  payload:
    - name: cameras_changed
      type: boolean
      description: Always true when this event fires.

- id: IR_Push
  label: IR Push
  description: IR code received by camera when IR mode is enabled.
  payload:
    - name: ir_id
      type: integer
    - name: keycode
      type: integer
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Do not route messages longer than 16 bytes through Sony cameras. Put Cisco cameras first in the chain.
  - After Network_Change event, wait 9 seconds before issuing a full reconfigure command.
  - After CAM_Speed command, wait 20 seconds before sending new commands.
  - DIP switches are read at startup only; reboot camera after changing DIP switches.
  - Power_On/Power_Off commands only reset motors - they do not toggle camera power.
  - Do not route debug commands or SW upload commands through Sony cameras.
  - SW end command may take up to 30 seconds to complete.
  # UNRESOLVED: safety interlock for SW verification failure - recovery procedure not stated
```

## Notes

**VISCA packet format (3-16 bytes):** `[AddressByte] [MessageBytes 1..14] [Terminator FF]`
- Address byte from host: `0x81` (camera address 1). From camera: `0x90`.
- Broadcast address: `0x88`.
- PrecisionHD 1080p supports single socket only (Y=0).

**Error codes:** `90-6Y-XX-FF` where Y=socket, XX=error type:
- `01`: Message length error (>14 bytes)
- `02`: Syntax error
- `03`: Command buffer full
- `04`: Command cancelled
- `05`: No socket (to be cancelled)
- `41`: Command not executable

**Serial speed:** Default 9600 baud. Changeable via CAM_Speed command to 115200. CAM_Boot resets to 9600.

**Commands marked * do not apply to:** PrecisionHD 1080p4x, PrecisionHD 1080p2.5x, Precision 40.

**Debug/SW upload commands:** Do not conform to VISCA length requirements. Never route through Sony cameras.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/current/power specifications not stated -->
<!-- UNRESOLVED: per-model command applicability matrix not explicitly enumerated -->
<!-- UNRESOLVED: error recovery sequences not described -->

## Provenance

```yaml
source_domains:
  - cisco.com
  - developer.webex.com
source_urls:
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/sx-series/tc7/api-reference-guide/sx80-api-reference-guide-tc72.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/sx-series/tc7/api-reference-guide/sx80-api-reference-guide-tc73.pdf
  - https://developer.webex.com/docs/devices
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/camera/precisionhd/user_guide/precisionhd_1080p-720p_camera_user_guide.pdf
  - https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/roomos-2602/api-reference-guide-roomos-2602.pdf
retrieved_at: 2026-05-14T22:56:18.279Z
last_checked_at: 2026-05-15T21:25:38.186Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-15T21:25:38.186Z
matched_actions: 57
action_count: 57
confidence: high
summary: "All 57 spec actions matched to source VISCA command table entries; transport parameters fully verified in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
