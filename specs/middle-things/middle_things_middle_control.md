---
spec_id: admin/middle-things-middle-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "Middle Things Middle Control Control Spec"
manufacturer: "Middle Things"
model_family: "Middle Control"
aliases: []
compatible_with:
  manufacturers:
    - "Middle Things"
  models:
    - "Middle Control"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - middlethings.co
source_urls:
  - https://middlethings.co/api
retrieved_at: 2026-04-30T04:41:37.784Z
last_checked_at: 2026-06-03T07:23:04.419Z
generated_at: 2026-06-03T07:23:04.419Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no settable persistent variables described in source beyond action params"
  - "no multi-step macro sequences described in source"
  - "no power-on sequencing or hardware interlock requirements stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:23:04.419Z
  matched_actions: 72
  action_count: 72
  confidence: medium
  summary: "Spec completely consistent with source (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Middle Things Middle Control Control Spec

## Summary
Middle Control is a software application that manages APC-R gimbal units and connected cameras. It exposes a plain-text TCP API on port 11581, allowing external devices or software to send commands for gimbal movement (pan, tilt, roll, zoom), camera control (focus, iris, white balance, ISO, recording), preset recall, and to read back live gimbal and camera state over the same connection.

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 11581
  base_url: null
auth:
  type: none  # inferred: no auth procedure in source
framing:
  terminator: "\n"
```

## Traits
```yaml
- powerable       # inferred from GIMBALSLEEP / GIMBALWAKE commands
- queryable       # inferred from live TCP feedback frame with state values
- levelable       # inferred from continuous-axis commands (P, T, R, Z, aF, aI, aWB, aISO, aTINT)
- routable        # inferred from CAM1-CAM99 camera selection commands
```

## Actions
```yaml
# Camera selection (scoped)
- id: cam_select
  label: Select Camera
  kind: action
  params:
    - name: id
      type: integer
      min: 1
      max: 99
      description: Camera/gimbal ID to select as current target
  command: CAM{id}

# Gimbal variable-axis commands
- id: pan_speed
  label: Pan Speed
  kind: action
  params:
    - name: speed
      type: integer
      min: -2048
      max: 2048
      description: Pan speed (INT16, negative=left, positive=right)
  command: P{speed}

- id: tilt_speed
  label: Tilt Speed
  kind: action
  params:
    - name: speed
      type: integer
      min: -2048
      max: 2048
      description: Tilt speed (INT16, negative=down, positive=up)
  command: T{speed}

- id: roll_speed
  label: Roll Speed
  kind: action
  params:
    - name: speed
      type: integer
      min: -2048
      max: 2048
      description: Roll speed (INT16)
  command: R{speed}

- id: zoom
  label: Zoom
  kind: action
  params:
    - name: value
      type: integer
      min: -2048
      max: 2048
      description: Zoom command (INT16)
  command: Z{value}

- id: zoom_speed
  label: Zoom Speed
  kind: action
  params:
    - name: speed
      type: integer
      min: 1
      max: 100
      description: Zoom speed (INT8, 1-100)
  command: ZS{speed}

- id: pan_tilt_speed
  label: Pan/Tilt Speed
  kind: action
  params:
    - name: speed
      type: integer
      min: 1
      max: 100
      description: Pan/Tilt combined speed (INT8, 1-100)
  command: PTS{speed}

- id: focus
  label: Focus
  kind: action
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0
      description: Focus position (FLOAT, 0.0-1.0)
  command: aF{value}

- id: iris
  label: Iris
  kind: action
  params:
    - name: value
      type: number
      min: 1.5
      max: 9.0
      description: Iris f-stop (FLOAT)
  command: aI{value}

- id: white_balance
  label: White Balance
  kind: action
  params:
    - name: kelvin
      type: integer
      min: 2500
      max: 10000
      description: White balance in Kelvin (INT16)
  command: aWB{kelvin}

- id: tint
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      min: -50
      max: 50
      description: Tint value (INT8, -50 to +50)
  command: aTINT{value}

- id: iso
  label: ISO
  kind: action
  params:
    - name: value
      type: integer
      min: -12
      max: 36
      description: ISO value (INT8, -12 to +36)
  command: aISO{value}

# Gimbal absolute position
- id: goto_absolute
  label: Go To Absolute Position
  kind: action
  params:
    - name: pan
      type: integer
      description: Absolute Pan position in 1/10th degree
    - name: tilt
      type: integer
      description: Absolute Tilt position in 1/10th degree
    - name: roll
      type: integer
      description: Absolute Roll position in 1/10th degree
    - name: zoom
      type: integer
      min: 0
      max: 4096
      description: Absolute Zoom position (0-4096)
    - name: duration
      type: number
      description: Transition duration in seconds
  command: "aGLOB;aP{pan};aT{tilt};aR{roll};aZ{zoom};{duration}"

# Gimbal button-style movement
- id: pan_left
  label: Pan Left
  kind: action
  params: []
  command: PAN_L
  note: Send PAN_IDLE after ≥70ms to stop

- id: pan_right
  label: Pan Right
  kind: action
  params: []
  command: PAN_R
  note: Send PAN_IDLE after ≥70ms to stop

- id: pan_idle
  label: Pan Stop
  kind: action
  params: []
  command: PAN_IDLE

- id: tilt_up
  label: Tilt Up
  kind: action
  params: []
  command: TILT_U
  note: Send TILT_IDLE after ≥70ms to stop

- id: tilt_down
  label: Tilt Down
  kind: action
  params: []
  command: TILT_D
  note: Send TILT_IDLE after ≥70ms to stop

- id: tilt_idle
  label: Tilt Stop
  kind: action
  params: []
  command: TILT_IDLE

- id: roll_left
  label: Roll Left
  kind: action
  params: []
  command: ROLL_L
  note: Send ROLL_IDLE after ≥70ms to stop

- id: roll_right
  label: Roll Right
  kind: action
  params: []
  command: ROLL_R
  note: Send ROLL_IDLE after ≥70ms to stop

- id: roll_idle
  label: Roll Stop
  kind: action
  params: []
  command: ROLL_IDLE

- id: zoom_in
  label: Zoom In
  kind: action
  params: []
  command: ZOOM+

- id: zoom_out
  label: Zoom Out
  kind: action
  params: []
  command: ZOOM-

- id: speed_up
  label: Speed Up Pan/Tilt
  kind: action
  params: []
  command: SPEED+

- id: speed_down
  label: Speed Down Pan/Tilt
  kind: action
  params: []
  command: SPEED-

- id: zoom_speed_up
  label: Zoom Speed Up
  kind: action
  params: []
  command: ZSPEED+

- id: zoom_speed_down
  label: Zoom Speed Down
  kind: action
  params: []
  command: ZSPEED-

- id: gimbal_autocalib
  label: Gimbal Autocalibration
  kind: action
  params: []
  command: GIMBALAUTOCALIB

- id: motor_autocalib
  label: Focus Motor Autocalibration
  kind: action
  params: []
  command: MOTORAUTOCALIB

- id: gimbal_sleep
  label: Gimbal Sleep
  kind: action
  params: []
  command: GIMBALSLEEP

- id: gimbal_wake
  label: Gimbal Wake
  kind: action
  params: []
  command: GIMBALWAKE

- id: active_track
  label: Active Track Toggle
  kind: action
  params: []
  command: ACTIVETRACK

- id: recenter
  label: Recenter Gimbal
  kind: action
  params: []
  command: RECENTER

# Camera actions
- id: autofocus
  label: Trigger Autofocus
  kind: action
  params: []
  command: AUTOFOCUS

- id: autoiris
  label: Trigger Auto Iris
  kind: action
  params: []
  command: AUTOIRIS

- id: colorbars
  label: Show Color Bars
  kind: action
  params: []
  command: COLORBARS

- id: zebra
  label: Show Zebra Guide
  kind: action
  params: []
  command: ZEBRA

- id: false_colors
  label: Show False Color Guide
  kind: action
  params: []
  command: FALSECOLORS

- id: status_view
  label: Show Status View
  kind: action
  params: []
  command: STATUSVIEW

- id: digital_zoom
  label: Toggle Digital Zoom
  kind: action
  params: []
  command: DIGITAL_ZOOM
  note: Sony cameras only

- id: custom_button
  label: Custom Button
  kind: action
  params:
    - name: button
      type: integer
      min: 1
      max: 6
      description: Custom button number (C1-C6)
  command: CUSTOM_C{button}
  note: Sony cameras only

- id: menu_button
  label: Press Menu Button
  kind: action
  params: []
  command: BTN_MENU
  note: Sony cameras only

- id: ok_button
  label: Press OK Button
  kind: action
  params: []
  command: BTN_OK
  note: Sony cameras only

- id: nav_left
  label: Press Left Button
  kind: action
  params: []
  command: BTN_LEFT
  note: Sony cameras only

- id: nav_right
  label: Press Right Button
  kind: action
  params: []
  command: BTN_RIGHT
  note: Sony cameras only

- id: nav_down
  label: Press Down Button
  kind: action
  params: []
  command: BTN_DOWN
  note: Sony cameras only

- id: nav_up
  label: Press Up Button
  kind: action
  params: []
  command: BTN_UP
  note: Sony cameras only

- id: multisel_left
  label: MultiSelector Left
  kind: action
  params: []
  command: MULTISEL_LEFT
  note: Sony cameras only

- id: multisel_right
  label: MultiSelector Right
  kind: action
  params: []
  command: MULTISEL_RIGHT
  note: Sony cameras only

- id: multisel_down
  label: MultiSelector Down
  kind: action
  params: []
  command: MULTISEL_DOWN
  note: Sony cameras only

- id: multisel_up
  label: MultiSelector Up
  kind: action
  params: []
  command: MULTISEL_UP
  note: Sony cameras only

- id: focus_in
  label: Focus In
  kind: action
  params: []
  command: FOCUS+

- id: focus_out
  label: Focus Out
  kind: action
  params: []
  command: FOCUS-

- id: iris_increase
  label: Iris Increase
  kind: action
  params: []
  command: IRIS+

- id: iris_decrease
  label: Iris Decrease
  kind: action
  params: []
  command: IRIS-

- id: wb_increase
  label: White Balance Increase
  kind: action
  params: []
  command: WB+

- id: wb_decrease
  label: White Balance Decrease
  kind: action
  params: []
  command: WB-

- id: iso_increase
  label: ISO Increase
  kind: action
  params: []
  command: ISO+

- id: iso_decrease
  label: ISO Decrease
  kind: action
  params: []
  command: ISO-

- id: tint_increase
  label: Tint Increase
  kind: action
  params: []
  command: TINT+

- id: tint_decrease
  label: Tint Decrease
  kind: action
  params: []
  command: TINT-

- id: shutter_increase
  label: Shutter Increase
  kind: action
  params: []
  command: SHUTTER+

- id: shutter_decrease
  label: Shutter Decrease
  kind: action
  params: []
  command: SHUTTER-

- id: nd_increase
  label: ND Filter Increase
  kind: action
  params: []
  command: ND+

- id: nd_decrease
  label: ND Filter Decrease
  kind: action
  params: []
  command: ND-

- id: rec_start
  label: Start Recording
  kind: action
  params: []
  command: REC_START

- id: rec_stop
  label: Stop Recording
  kind: action
  params: []
  command: REC_STOP

- id: rec_start_all
  label: Start Recording All Cameras
  kind: action
  params: []
  command: REC_START_ALL

- id: rec_stop_all
  label: Stop Recording All Cameras
  kind: action
  params: []
  command: REC_STOP_ALL

# Preset actions
- id: preset_trigger
  label: Trigger Preset
  kind: action
  params:
    - name: preset
      type: integer
      min: 1
      max: 12
      description: Preset number (1-12)
  command: PRESET{preset}

- id: preset_save
  label: Save Preset
  kind: action
  params:
    - name: preset
      type: integer
      min: 1
      max: 12
      description: Preset number (1-12)
    - name: camera
      type: integer
      min: 1
      max: 99
      description: Camera ID to save preset for
  command: SPRESET{preset}@C{camera}
```

## Feedbacks
```yaml
# Live status frame sent over the TCP connection.
# Available when Middle Control is connected to an ATEM Switcher or camera over Wired LAN.
# Frame format: {CAMid;PTSval;ZSval;PRESDval;aWBval;aFval;aIval;aUIval;aTINTval;aISOval;aSATval;aCONTval;aBLACKLEVval;aMIDLEVval;aWHITELEVval;aSHUTval;aPANval;aTILTval;aROLLval;aZOOMval;}
- id: selected_camera
  type: integer
  description: Currently selected camera ID (CAM field)

- id: pan_tilt_speed
  type: integer
  description: Current pan/tilt speed setting (PTS field, 1-100)

- id: zoom_speed
  type: integer
  description: Current zoom speed setting (ZS field, 1-100)

- id: preset_transition_duration
  type: number
  description: Preset transition duration in seconds (PRESD field)

- id: white_balance
  type: integer
  description: White balance in Kelvin (aWB field, 2500-10000)

- id: focus_position
  type: number
  description: Focus position (aF field, 0.0-1.0)

- id: iris_value
  type: number
  description: Iris f-stop (aI field)

- id: iris_ui
  type: number
  description: Iris UI display value (aUI field)

- id: tint_value
  type: integer
  description: Tint value (aTINT field, -50 to +50)

- id: iso_value
  type: integer
  description: ISO value (aISO field)

- id: saturation
  type: integer
  description: Saturation percentage (aSAT field)

- id: contrast
  type: integer
  description: Contrast percentage (aCONT field)

- id: black_level
  type: number
  description: Black level (aBLACKLEV field)

- id: mid_level
  type: number
  description: Mid level (aMIDLEV field)

- id: white_level
  type: number
  description: White level (aWHITELEV field)

- id: shutter
  type: string
  description: Shutter speed as fraction string e.g. "1/50" (aSHUT field)

- id: pan_angle
  type: number
  description: Pan angle in 1/10th degree (aPAN field)

- id: tilt_angle
  type: number
  description: Tilt angle in 1/10th degree (aTILT field)

- id: roll_angle
  type: number
  description: Roll angle in 1/10th degree (aROLL field)

- id: zoom_position
  type: integer
  description: Zoom motor position (aZOOM field, 0-4096)
```

## Variables
```yaml
# UNRESOLVED: no settable persistent variables described in source beyond action params
```

## Events
```yaml
# The feedback frame is sent continuously over the TCP connection when connected
# to an ATEM Switcher or camera over Wired LAN. It is an unsolicited status push,
# not a query-response model. See Feedbacks section for frame field details.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "PAN_L/PAN_R, TILT_U/TILT_D, ROLL_L/ROLL_R require matching stop command (PAN_IDLE, TILT_IDLE, ROLL_IDLE) after ≥70ms"
# UNRESOLVED: no power-on sequencing or hardware interlock requirements stated in source
```

## Notes
- Commands can target a specific camera by appending `@Cx` (where x is the camera ID), e.g. `REC_START@C2`. This overrides the currently selected camera for that command only.
- Multiple cameras can be controlled simultaneously by sending targeted commands in rapid succession.
- Button-style movement commands (PAN_L, PAN_R, TILT_U, TILT_D, ROLL_L, ROLL_R) require a matching stop command after a minimum delay of 70ms.
- The absolute position frame uses semicolon-delimited format: `aGLOB;aP{pan};aT{tilt};aR{roll};aZ{zoom};{duration}`.
- Some camera actions are vendor-specific (Digital Zoom, Custom Buttons, Menu navigation) and apply only to Sony cameras.
- Camera actions (AUTOFOCUS, AUTOIRIS, etc.) work with Blackmagic cameras controlled by ATEM or paired via Bluetooth, and Sony cameras.
- Feedback is only available when Middle Control is connected to an ATEM Switcher or a camera over Wired LAN.

## Provenance

```yaml
source_domains:
  - middlethings.co
source_urls:
  - https://middlethings.co/api
retrieved_at: 2026-04-30T04:41:37.784Z
last_checked_at: 2026-06-03T07:23:04.419Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:23:04.419Z
matched_actions: 72
action_count: 72
confidence: medium
summary: "Spec completely consistent with source (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no settable persistent variables described in source beyond action params"
- "no multi-step macro sequences described in source"
- "no power-on sequencing or hardware interlock requirements stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
