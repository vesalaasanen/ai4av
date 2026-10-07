---
spec_id: admin/vaddio-productionview-hd-mv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio ProductionVIEW HD MV Control Spec"
manufacturer: Vaddio
model_family: "ProductionVIEW HD MV"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "ProductionVIEW HD MV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - fullcompass.com
  - manualslib.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/14968-Manual.pdf
  - https://www.manualslib.com/manual/821620/Vaddio/Productionview-Hd-Mv.html
  - https://res.cloudinary.com/avd/image/upload/v134228628/Resources/Vaddio/Control/Operation/342-0318-revb-productionview-hd-sdi-mv-manual.pdf
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - https://www.manualslib.com/manual/821620/Vaddio-Productionview-Hd-Mv.html
retrieved_at: 2026-06-12T20:03:06.540Z
last_checked_at: 2026-10-01T07:28:14.148Z
generated_at: 2026-10-01T07:28:14.148Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source."
  - "source states range 0-11 but enumerates effects only 0-8 (0=UL>LR, 1=Top>Bot, 2=UR>LL, 3=L>R, 4=Cnt>Out, 5=R>L, 6=LL>UR, 7=Bot>Top, 8=LR>UL); values 9-11 are not defined in source"
  - "source does not document any user-defined macro language on the"
  - "no explicit interlock or power-on sequencing procedure is"
  - "protocol version / firmware version compatibility range not stated in source."
  - "response framing for query commands (e.g. `Version`, `Config`, `DspCams`) not explicitly described — assumed ASCII text terminated by CR/LF, but exact format not documented."
verification:
  verdict: verified
  checked_at: 2026-10-01T07:28:14.148Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action ids have literal matches in the Appendix 3 command table and the API block; transport parameters are all explicitly documented in the source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Vaddio ProductionVIEW HD MV Control Spec

## Summary
Vaddio ProductionVIEW HD MV is a multi-camera video production switcher / camera controller with six RS-232 camera ports and a single RS-232 control port on DB-9F. This spec covers the ASCII API exposed on the rear-panel Control Port: power, switching, presets, joystick-relative pan/tilt/zoom, iris/focus, system setup, and touch-screen configuration. All commands are ASCII terminated by carriage return (CR, 0x0D).

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->

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
  type: UNRESOLVED  # source does not document any auth method; no "none" claim can be sourced
```

Control port: DB-9F (DE-9 female). Pin 2 = TXD, Pin 3 = RXD, Pin 5 = GND; all other pins unused. Each command must be followed by a carriage return (cr). No flow control. Device also exposes six RJ-45 RS-232 ports for downstream cameras (pin 7 = TXD-to-camera-RXD, pin 8 = RXD-from-camera-TXD, pin 6 = GND); this spec addresses only the host control port API.

## Traits
```yaml
- powerable  # inferred from Power command
- routable   # inferred from Camera / ProgIn / PrevIn / Take / Cut / Wipe / Mix commands
- queryable  # inferred from Version / Config / DspCams query commands
- levelable  # inferred from Iris / Focus / lsgDen / lsgSize / FTB / Panel Lights commands
```

## Actions
```yaml
# System access
- id: power
  label: Power On/Off
  kind: action
  command: "Power On(cr)"  # or "Power Off(cr)"
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: sysmode
  label: System Mode (Auto/Manual)
  kind: action
  command: "SysMode Auto(cr)"  # or "SysMode Manual(cr)"
  params:
    - name: mode
      type: enum
      values: [Auto, Manual]

- id: progin
  label: Select Program Input
  kind: action
  command: "ProgIn {input}(cr)"
  params:
    - name: input
      type: integer
      description: Input number (1-6, 7=LSG, 8=PIP)

- id: previn
  label: Select Preview Input
  kind: action
  command: "PrevIn {input}(cr)"
  params:
    - name: input
      type: integer
      description: Input number (1-6, 7=LSG, 8=PIP)

- id: camera
  label: Switch to Camera
  kind: action
  command: "Camera {cam}(cr)"
  params:
    - name: cam
      type: integer
      description: Camera number 1-6

- id: preset
  label: Go to Preset
  kind: action
  command: "Preset {preset}(cr)"
  params:
    - name: preset
      type: integer
      description: Preset number 1-12

- id: store
  label: Store Preset
  kind: action
  command: "Store {preset}(cr)"
  params:
    - name: preset
      type: integer
      description: Preset number 1-12

- id: wipesel
  label: Wipe Effect Select
  kind: action
  command: "WipeSel {effect}(cr)"
  params:
    - name: effect
      type: integer
      description: UNRESOLVED: source states range 0-11 but enumerates effects only 0-8 (0=UL>LR, 1=Top>Bot, 2=UR>LL, 3=L>R, 4=Cnt>Out, 5=R>L, 6=LL>UR, 7=Bot>Top, 8=LR>UL); values 9-11 are not defined in source

- id: lsgsize
  label: LSG Size
  kind: action
  command: "lsgSize {size}(cr)"
  params:
    - name: size
      type: integer
      description: LSG size 0-3

- id: lsgden
  label: LSG Density
  kind: action
  command: "lsgDen {density}(cr)"
  params:
    - name: density
      type: integer
      description: LSG density 0-9

- id: blc
  label: Backlight Compensation
  kind: action
  command: "BLC {state}(cr)"
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: awb
  label: Auto White Balance
  kind: action
  command: "AWB {state}(cr)"
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: piploc
  label: PIP Location and Size
  kind: action
  command: "PipLoc {loc},{size}(cr)"
  params:
    - name: loc
      type: integer
      description: PIP location 0-3 (0=UL, 1=UR, 2=LL, 3=LR)
    - name: size
      type: integer
      description: PIP size 0-2

# Joystick direction/speed (per port 0-6, where 0 = all ports)
- id: jpandir
  label: Joystick Pan Direction
  kind: action
  command: "JPanDir {port},{dir}(cr)"
  params:
    - name: port
      type: integer
      description: Port 0 (all) or 1-6
    - name: dir
      type: enum
      values: [Normal, Invert]

- id: jpanspd
  label: Joystick Pan Speed
  kind: action
  command: "JPanSpd {port},{spd}(cr)"
  params:
    - name: port
      type: integer
      description: Port 0 (all) or 1-6
    - name: spd
      type: integer
      description: Pan speed 1-24

- id: jtiltdir
  label: Joystick Tilt Direction
  kind: action
  command: "JTiltDir {port},{dir}(cr)"
  params:
    - name: port
      type: integer
      description: Port 0 (all) or 1-6
    - name: dir
      type: enum
      values: [Normal, Invert]

- id: jtiltspd
  label: Joystick Tilt Speed
  kind: action
  command: "JTiltSpd {port},{spd}(cr)"
  params:
    - name: port
      type: integer
      description: Port 0 (all) or 1-6
    - name: spd
      type: integer
      description: Tilt speed 1-20

- id: jzoomdir
  label: Joystick Zoom Direction
  kind: action
  command: "JZoomDir {port},{dir}(cr)"
  params:
    - name: port
      type: integer
      description: Port 0 (all) or 1-6
    - name: dir
      type: enum
      values: [Normal, Invert]

- id: jzoomspd
  label: Joystick Zoom Speed
  kind: action
  command: "JZoomSpd {port},{spd}(cr)"
  params:
    - name: port
      type: integer
      description: Port 0 (all) or 1-6
    - name: spd
      type: integer
      description: Zoom speed 0-7

# Preset motion
- id: panspeed
  label: Preset Pan Speed
  kind: action
  command: "PanSpeed {spd}(cr)"
  params:
    - name: spd
      type: integer
      description: Preset pan speed 1-24

- id: tiltspeed
  label: Preset Tilt Speed
  kind: action
  command: "TiltSpeed {spd}(cr)"
  params:
    - name: spd
      type: integer
      description: Preset tilt speed 1-20

- id: zoomspeed
  label: Preset Zoom Speed
  kind: action
  command: "ZoomSpeed {spd}(cr)"
  params:
    - name: spd
      type: integer
      description: Preset zoom speed 0-7

- id: home
  label: Home Camera
  kind: action
  command: "Home(cr)"
  params: []

- id: presetloc
  label: Preset Storage Location
  kind: action
  command: "PresetLoc {loc}(cr)"
  params:
    - name: loc
      type: enum
      values: [Local, InCam]
      description: "Local = all 12 in system; InCam = 6 in cam 6 in system"

- id: oncaminit
  label: On-Camera Initialization
  kind: action
  command: "OnCamInit {preset}(cr)"
  params:
    - name: preset
      type: enum
      values: [Home, Preset12]

# Camera motion / lens
- id: move
  label: Move Camera
  kind: action
  command: "Move {dir}(cr)"
  params:
    - name: dir
      type: enum
      values: [Up, Down, Stop, Left, Right]

- id: zoom
  label: Zoom Camera
  kind: action
  command: "Zoom {dir}(cr)"
  params:
    - name: dir
      type: enum
      values: [In, Out, Stop]

- id: iris
  label: Iris
  kind: action
  command: "Iris {mode},{value}(cr)"
  params:
    - name: mode
      type: enum
      values: [Up, Down, Auto, Manual]
    - name: value
      type: integer
      description: Iris value (per source)

- id: focus
  label: Focus
  kind: action
  command: "Focus {mode},{value}(cr)"
  params:
    - name: mode
      type: enum
      values: [Up, Dn, Auto, Manual]
    - name: value
      type: integer
      description: Focus value (per source)

# Transitions
- id: take
  label: Take (Initiate Transition)
  kind: action
  command: "Take(cr)"
  params: []

- id: cut
  label: Cut Transition
  kind: action
  command: "Cut(cr)"
  params: []

- id: wipe
  label: Wipe Transition
  kind: action
  command: "Wipe(cr)"
  params: []

- id: mix
  label: Mix/FTB Mode
  kind: action
  command: "Mix(cr)"
  params: []

- id: ftb
  label: Fade to Black
  kind: action
  command: "FTB {dir}(cr)"  # U / D / 10-40 (time in 0.1s units)
  params:
    - name: dir
      type: string
      description: "U (up/fade to black), D (down/from black), or integer 10-40 (FTB time, 10=1.0s)"

# System setup / utilities
- id: setdefault
  label: Set Default Preset
  kind: action
  command: "SetDefault {preset}(cr)"
  params:
    - name: preset
      type: integer
      description: Default preset 1-12

- id: defaultcam
  label: Set Default Camera
  kind: action
  command: "DefaultCam {cam}(cr)"
  params:
    - name: cam
      type: integer
      description: Default camera 1-6

- id: idlertn
  label: Default Idle Return Timer
  kind: action
  command: "IdleRtn {seconds}(cr)"
  params:
    - name: seconds
      type: integer
      description: Idle return seconds 0-60 (0 = disabled)

- id: exttrigger
  label: External Trigger Mode
  kind: action
  command: "ExtTrigger {mode}(cr)"
  params:
    - name: mode
      type: enum
      values: [AllCam1, Cam1_2]
      description: "AllCam1 = 12 triggers on camera 1; Cam1_2 = 6 on cam 1, 6 on cam 2"

- id: tally
  label: Idle Tally Level
  kind: action
  command: "Tally {level}(cr)"
  params:
    - name: level
      type: enum
      values: [High, Low]

- id: serialecho
  label: Serial Echo
  kind: action
  command: "SerialEcho {state}(cr)"
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: serialinfo
  label: Serial Info (button-push reporting)
  kind: action
  command: "SerialInfo {state}(cr)"
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: reset
  label: Soft CPU Reset
  kind: action
  command: "Reset(cr)"
  params: []

- id: swmode
  label: Switcher Mode (Single/Dual)
  kind: action
  command: "SwMode {mode}(cr)"
  params:
    - name: mode
      type: enum
      values: [Single, Dual]

- id: dspcams
  label: List Connected Cameras
  kind: action
  command: "DspCams(cr)"
  params: []

- id: version
  label: Display Firmware Version
  kind: action
  command: "Version(cr)"
  params: []

- id: clearall
  label: Clear All Presets
  kind: action
  command: "ClearAll(cr)"
  params: []

- id: config
  label: List Configuration Settings
  kind: action
  command: "Config(cr)"
  params: []

- id: saveconfig
  label: Save Configuration
  kind: action
  command: "SaveConfig(cr)"
  params: []

- id: resetvideo
  label: Re-Load Video Configuration
  kind: action
  command: "ResetVideo(cr)"
  params: []

- id: rescan
  label: Rescan Cameras
  kind: action
  command: "Rescan(cr)"
  params: []

- id: camfolprv
  label: Select Follows Preview
  kind: action
  command: "CamFolPrv {state}(cr)"
  params:
    - name: state
      type: enum
      values: [On, Off]

# Touch screen configuration
- id: wbtn
  label: Set Button Touch-Screen Limits
  kind: action
  command: "WBtn {xx}{dd}{vvvv}{hhhh}{VVVV}{HHHH}(cr)"
  params:
    - name: xx
      type: string
      description: Button index 0x00-0x2f
    - name: dd
      type: string
      description: "Button ID: 0x3c=take, 0x16-0x1b=preview 1-6, 0x24-0x2f=preset 1-12, 0x39=wipe, 0x3a=cut, 0x3b=fade"
    - name: vvvv
      type: string
      description: Vertical lower limit (hex)
    - name: hhhh
      type: string
      description: Horizontal lower limit (hex)
    - name: VVVV
      type: string
      description: Vertical upper limit (hex)
    - name: HHHH
      type: string
      description: Horizontal upper limit (hex)

- id: rbtn
  label: Read Button Touch-Screen Limits
  kind: action
  command: "RBtn {xx}(cr)"
  params:
    - name: xx
      type: string
      description: Button index 0x00-0x2f
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
- id: sysmode_state
  type: enum
  values: [Auto, Manual]
- id: camera_selected
  type: integer
  description: Currently selected camera 1-6 (reported by Config)
- id: progin_state
  type: integer
  description: Program bus input 1-6 (7=LSG, 8=PIP)
- id: previn_state
  type: integer
  description: Preview bus input 1-6 (7=LSG, 8=PIP)
- id: dspcams_list
  type: string
  description: List of detected cameras and their assigned port
- id: version_info
  type: string
  description: Firmware version string (from Version command)
- id: config_dump
  type: string
  description: Full system configuration (from Config command)
```

## Variables
```yaml
# Settable, non-discrete parameters exposed via the API
- id: lsgsize
  type: integer
  range: [0, 3]
- id: lsgden
  type: integer
  range: [0, 9]
- id: panspeed_preset
  type: integer
  range: [1, 24]
- id: tiltspeed_preset
  type: integer
  range: [1, 20]
- id: zoomspeed_preset
  type: integer
  range: [0, 7]
- id: idlertn_seconds
  type: integer
  range: [0, 60]
- id: ftb_time
  type: integer
  range: [10, 40]
  description: Fade-to-black time in 0.1s units (10 = 1.0s)
- id: settle_time
  type: integer
  range: [1, 90]
  description: Delay between Take and next selectable button (system menu)
- id: panel_lights
  type: integer
  range: [0, 50]
  description: Panel brightness 0-50 (system menu)
- id: default_cam
  type: integer
  range: [0, 6]
  description: 00-06 per source; default 01
- id: default_preset
  type: integer
  range: [1, 12]
  description: Default preset 1-12; default 01
```

## Events
```yaml
# The device can report front-panel button pushes out the serial port when
# SerialInfo is On. Joystick position is NOT reported.
- id: button_push
  description: Front-panel button push notification (when SerialInfo=On)
  direction: device-to-host
```

## Macros
```yaml
# UNRESOLVED: source does not document any user-defined macro language on the
# RS-232 control port. The device does not expose a multi-step command sequencer
# over the API; macros are out of scope for this spec.
```

## Safety
```yaml
confirmation_required_for:
  - Reset     # CPU soft-reset; affects live program
  - ClearAll  # Wipes all camera presets
  - FTB       # Fade program to black; visible on Program output
interlocks: []
# UNRESOLVED: no explicit interlock or power-on sequencing procedure is
# documented in the source beyond the standard "settle time" and "program
# lockout" timing behaviors described in the System Menu section.
```

## Notes
All commands require a trailing carriage return (`\r`, 0x0D). Communication spec is 9600 bps, 8N1, no flow control on the DB-9F Control Port. Each camera input has its own RJ-45 RS-232 port; the source notes these auto-configure per attached camera. The protocol is a Vaddio-proprietary simple ASCII API, not VISCA, not Pelco, not AMX/Crestron module — integrators writing AMX/Crestron modules translate these ASCII strings.

Source also documents a system menu (LCD) exposing parameters not surfaced as discrete RS-232 commands: Video Output mode, DVI Input Mode, SD Video Format, Ext Triggers routing, Multiviewer On/Off, Cam Search method (Auto/Sony/Canon/Panasonic), CCU Mode, Switching Mode (Single/Dual), Transition Swap, Settle Time, Program Lockout, Tally Level, Save Config, Touch Screen size, Home Button, Init Triggers, Lock Program. `SaveConfig` persists any pending changes. When Vaddio Quick-Connect CCUs are used, CCU mode disables Iris/AWB/BLC on the ProductionVIEW console.

<!-- UNRESOLVED: protocol version / firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: response framing for query commands (e.g. `Version`, `Config`, `DspCams`) not explicitly described — assumed ASCII text terminated by CR/LF, but exact format not documented. -->

## Provenance

```yaml
source_domains:
  - fullcompass.com
  - manualslib.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/14968-Manual.pdf
  - https://www.manualslib.com/manual/821620/Vaddio/Productionview-Hd-Mv.html
  - https://res.cloudinary.com/avd/image/upload/v134228628/Resources/Vaddio/Control/Operation/342-0318-revb-productionview-hd-sdi-mv-manual.pdf
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - https://www.manualslib.com/manual/821620/Vaddio-Productionview-Hd-Mv.html
retrieved_at: 2026-06-12T20:03:06.540Z
last_checked_at: 2026-10-01T07:28:14.148Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T07:28:14.148Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action ids have literal matches in the Appendix 3 command table and the API block; transport parameters are all explicitly documented in the source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source."
- "source states range 0-11 but enumerates effects only 0-8 (0=UL>LR, 1=Top>Bot, 2=UR>LL, 3=L>R, 4=Cnt>Out, 5=R>L, 6=LL>UR, 7=Bot>Top, 8=LR>UL); values 9-11 are not defined in source"
- "source does not document any user-defined macro language on the"
- "no explicit interlock or power-on sequencing procedure is"
- "protocol version / firmware version compatibility range not stated in source."
- "response framing for query commands (e.g. `Version`, `Config`, `DspCams`) not explicitly described — assumed ASCII text terminated by CR/LF, but exact format not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
