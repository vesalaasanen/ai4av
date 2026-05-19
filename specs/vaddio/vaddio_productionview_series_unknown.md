---
spec_id: admin/vaddio-autopresenter
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio AutoPresenter Control Spec"
manufacturer: Vaddio
model_family: AutoPresenter
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - AutoPresenter
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/21194-VaddioClearVIEWHDUSBPTZincl9986990000Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-05-18T17:08:15.647Z
generated_at: 2026-05-18T17:08:15.647Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T17:08:15.647Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec actions matched verbatim in the source command table; transport parameters verified; full coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Vaddio AutoPresenter Control Spec

## Summary
Vaddio AutoPresenter video production switcher supporting RS-232 control. Serial communication at 9600 baud, 8N1, no flow control. All commands terminated by carriage return. Supports camera switching (1-6), preset storage/recall (1-138), transitions (cut/mix/wipe), picture-in-picture, and camera pan/tilt/zoom.

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
- powerable  # Power On/Off command present
- routable   # Camera switching (1-6) present
- queryable  # Config, Version, DspCams, SerialInfo queries present
- levelable  # Zoom, Move, PanSpeed, TiltSpeed, ZoomSpeed present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]
      description: Power state

- id: camera
  label: Select Camera
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number 1-6

- id: cut
  label: Cut
  kind: action

- id: mix
  label: Mix/FTB
  kind: action

- id: wipe
  label: Wipe Transition
  kind: action

- id: wipe_sel
  label: Wipe Style Select
  kind: action
  params:
    - name: style
      type: integer
      description: Wipe style 0-10
      # 0:Wipe R>L, 1:Wipe L>R, 2:Wipe Top>Bot, 3:Wipe Bot>Top,
      # 4:Wipe LR>UL, 5:Wipe LL>UR, 6:Wipe UR>LL, 7:Wipe UL>LR,
      # 8:Wipe Out>Cnt, 9:Wipe L>Cnt<R, 10:Wipe T>Cnt<B

- id: pip
  label: Picture in Picture
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: p_size
  label: PIP Size
  kind: action
  params:
    - name: size
      type: enum
      values: [S, M, L]

- id: p_loc
  label: PIP Location
  kind: action
  params:
    - name: location
      type: integer
      description: Location 1-5 (1:UR, 2:LR, 3:LM, 4:LL, 5:UL)

- id: preset
  label: Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-138

- id: store
  label: Store Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-138

- id: set_default
  label: Set Default Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Default preset number 1-72

- id: home
  label: Home Camera
  kind: action

- id: move
  label: Move Camera
  kind: action
  params:
    - name: direction
      type: enum
      values: [Up, Down, Left, Right, Stop]
    - name: speed
      type: integer
      description: Optional speed 1-24 pan, 1-20 tilt

- id: zoom
  label: Zoom Camera
  kind: action
  params:
    - name: direction
      type: enum
      values: [In, Out, Stop]
    - name: speed
      type: integer
      description: Optional speed 1-7

- id: pan_speed
  label: Preset Pan Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 1-24

- id: tilt_speed
  label: Preset Tilt Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 1-20

- id: zoom_speed
  label: Preset Zoom Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 1-7

- id: idle_rtn
  label: Idle Return Timer
  kind: action
  params:
    - name: seconds
      type: integer
      description: Idle return time 0-60 seconds

- id: triggers
  label: Enable/Disable Triggers
  kind: action
  params:
    - name: state
      type: enum
      values: [Enable, Disable]

- id: serial_echo
  label: Serial Echo
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: serial_info
  label: Serial Info Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: tally
  label: Tally
  kind: action
  params:
    - name: level
      type: enum
      values: [High, Low]

- id: jsd70
  label: Sony D70 Joystick Processing
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off, Timer]
    - name: value
      type: integer
      description: Timer value 0-255 when state is Timer

- id: init_trig
  label: Initialize Idle Trigger State
  kind: action

- id: reset
  label: Soft System Reset
  kind: action

- id: reset_video
  label: Re-Load Video Configuration
  kind: action

- id: rescan
  label: Rescan Cameras
  kind: action

- id: save_config
  label: Save Configuration
  kind: action

- id: clear_all
  label: Clear All Presets
  kind: action
```

## Feedbacks
```yaml
- id: config
  label: System Configuration
  type: string
  description: Returns system configuration string

- id: version
  label: Firmware Version
  type: string
  description: Returns firmware version information

- id: dsp_cams
  label: Connected Cameras
  type: string
  description: Returns list of connected cameras and port

- id: serial_info_status
  label: Serial Info Status
  type: enum
  values: [On, Off]
```

## Variables
```yaml
# No independent settable parameters - all are action params
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
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
Commands end with carriage return (cr) per source. Camera control ports 1-6 use RJ-45 connectors (RS-232). Trigger inputs on DB-25 connectors (ports 25-72). PIP location values: 1=UR, 2=LR, 3=LM, 4=LL, 5=UL. Wipe styles 0-10 documented in source. Preset range 1-138 for store/recall; default presets 1-72. JSD70 command enables special joystick processing for Sony D70 camera.
<!-- UNRESOLVED: trigger input electrical spec not stated in source -->
<!-- UNRESOLVED: video format framerate alternatives not enumerated for all output types -->

## Provenance

```yaml
source_domains:
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/21194-VaddioClearVIEWHDUSBPTZincl9986990000Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-05-18T17:08:15.647Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T17:08:15.647Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec actions matched verbatim in the source command table; transport parameters verified; full coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
