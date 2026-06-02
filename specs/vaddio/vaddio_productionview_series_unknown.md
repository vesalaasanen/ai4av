---
spec_id: admin/vaddio-autopresenter
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio AutoPresenter RS-232 Control Spec"
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
  - res.cloudinary.com
  - fullcompass.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-06-02T10:14:12.498Z
generated_at: 2026-06-02T10:14:12.498Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "confirm whether AutoPresenter == ProductionView Series, or if these are separate SKUs sharing the protocol. Source does not cross-reference ProductionView."
  - "source does not document response/acknowledgement strings"
  - "source lists parameter ranges inline with each command"
  - "source does not document unsolicited notifications."
  - "source does not document multi-step sequences."
  - "source contains no safety warnings, interlocks, or"
  - "Source does not state firmware version compatibility, response syntax for Version/Config/DspCams queries, baud rate negotiation behavior, or whether ProductionView Series shares this exact command set."
verification:
  verdict: verified
  checked_at: 2026-06-02T10:14:12.498Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec actions confirmed verbatim in source command table with correct shapes; reset has no arg, pip is PipOn/PipOff, tally is TallyHigh/TallyLow; transport fully supported. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Vaddio AutoPresenter RS-232 Control Spec

## Summary
RS-232 control protocol for Vaddio AutoPresenter production switcher. Source document covers serial command set for camera switching (1-6), preset store/recall (1-138), picture-in-picture, wipe transitions, camera PTZ, and system configuration over a DB-9F control port at 9600 bps 8N1. The user identified this document under the ProductionView Series family; the source itself names the device "AutoPresenter" and is treated as authoritative for command strings.

<!-- UNRESOLVED: confirm whether AutoPresenter == ProductionView Series, or if these are separate SKUs sharing the protocol. Source does not cross-reference ProductionView. -->

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
- powerable       # inferred from Power On/Off command
- routable        # inferred from Camera select (1-6) and input routing commands
- queryable       # inferred from Version, Config, DspCams queries
- levelable       # inferred from PanSpeed, TiltSpeed, ZoomSpeed
```

## Actions
```yaml
- id: power
  label: Power On/Off
  kind: action
  command: "Power On"  # or "Power Off"
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: camera_select
  label: Switch to Camera
  kind: action
  command: "Camera {n}"
  params:
    - name: n
      type: integer
      description: Camera number (1-6)

- id: store_preset
  label: Store Preset
  kind: action
  command: "Store {n}"
  params:
    - name: n
      type: integer
      description: Preset number (1-138)

- id: preset
  label: Enable/Disable/Go to Preset
  kind: action
  command: "Preset {n}"
  params:
    - name: n
      type: integer
      description: Preset number (1-138)

- id: wipe_sel
  label: Wipe Effect Select
  kind: action
  command: "WipeSel {n}"
  params:
    - name: n
      type: integer
      description: Wipe effect 0-10 (0:Wipe R>L, 1:Wipe L>R, 2:Wipe Top>Bot, 3:Wipe Bot>Top, 4:Wipe LR>UL, 5:Wipe LL>UR, 6:Wipe UR>LL, 7:Wipe UL>LR, 8:Wipe Out>Cnt, 9:Wipe L>Cnt<R, 10:Wipe T>Cnt<B)

- id: pip
  label: Picture in Picture On/Off
  kind: action
  command: "Pip{state}"  # source command table: PipOn/PipOff (no space before value)
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: pip_location
  label: PIP Location
  kind: action
  command: "PLoc {n}"
  params:
    - name: n
      type: integer
      description: PIP location 1-5 (1:UR, 2:LR, 3:LM, 4:LL, 5:UL)

- id: pip_size
  label: PIP Size
  kind: action
  command: "PSize {size}"
  params:
    - name: size
      type: enum
      values: [S, M, L]

- id: pan_speed
  label: Preset Pan Speed
  kind: action
  command: "PanSpeed {n}"
  params:
    - name: n
      type: integer
      description: Pan speed 1-24

- id: tilt_speed
  label: Preset Tilt Speed
  kind: action
  command: "TiltSpeed {n}"
  params:
    - name: n
      type: integer
      description: Tilt speed 1-20

- id: zoom_speed
  label: Preset Zoom Speed
  kind: action
  command: "ZoomSpeed {n}"
  params:
    - name: n
      type: integer
      description: Zoom speed 1-7

- id: move
  label: Move Camera
  kind: action
  command: "Move {direction}"
  params:
    - name: direction
      type: enum
      values: [Up, Down, Stop, Left, Right]

- id: move_with_speed
  label: Move Camera With Speed
  kind: action
  command: "Move {direction},{speed}"
  params:
    - name: direction
      type: enum
      values: [Up, Down, Stop, Left, Right]
    - name: speed
      type: integer
      description: Speed 1-24 pan, 1-20 tilt (per source)

- id: zoom
  label: Zoom Camera
  kind: action
  command: "Zoom {direction}"
  params:
    - name: direction
      type: enum
      values: [in, Out, Stop]

- id: zoom_with_speed
  label: Zoom Camera With Speed
  kind: action
  command: "Zoom {direction},{speed}"
  params:
    - name: direction
      type: enum
      values: [in, Out, Stop]
    - name: speed
      type: integer
      description: Zoom speed 1-7

- id: set_default_preset
  label: Set Default Preset
  kind: action
  command: "SetDefault {n}"
  params:
    - name: n
      type: integer
      description: Preset number 1-72

- id: dsp_cams
  label: List Connected Cameras
  kind: query
  command: "DspCams"
  params: []

- id: idle_rtn
  label: Default Idle Timer
  kind: action
  command: "IdleRtn {seconds}"
  params:
    - name: seconds
      type: integer
      description: Idle return 0-60 seconds

- id: reset
  label: CPU Reset
  kind: action
  command: "Reset"  # source command table: Reset(cr) takes no argument; "CPU" is only the menu label
  params: []

- id: serial_echo
  label: Serial Echo
  kind: action
  command: "SerialEcho {state}"
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: clear_all
  label: Clear All Presets
  kind: action
  command: "ClearAll"
  params: []

- id: serial_info
  label: Serial Info Mode
  kind: action
  command: "SerialInfo {state}"
  params:
    - name: state
      type: enum
      values: [On, Off]

- id: save_config
  label: Save Config
  kind: action
  command: "SaveConfig"
  params: []

- id: version
  label: Firmware Version
  kind: query
  command: "Version"
  params: []

- id: rescan
  label: Rescan Cameras
  kind: action
  command: "Rescan"
  params: []

- id: config
  label: List Config Settings
  kind: query
  command: "Config"
  params: []

- id: init_trig
  label: Initialize Idle Trigger State
  kind: action
  command: "InitTrig"
  params: []

- id: reset_video
  label: Re-Load Video Config
  kind: action
  command: "ResetVideo"
  params: []

- id: triggers
  label: Enable/Disable Triggers
  kind: action
  command: "Triggers {state}"
  params:
    - name: state
      type: enum
      values: [Enable, Disable]

- id: jsd70
  label: Sony D70 Joystick Processing
  kind: action
  command: "JSD70 {param}"
  params:
    - name: param
      type: string
      description: "On, Off, or timer value 0-255"

- id: mix
  label: Mix/FTB Transition
  kind: action
  command: "Mix"
  params: []

- id: cut
  label: Cut Transition
  kind: action
  command: "Cut"
  params: []

- id: wipe
  label: Wipe Transition
  kind: action
  command: "Wipe"
  params: []

- id: home
  label: Home Camera
  kind: action
  command: "Home"
  params: []

- id: tally
  label: Idle Tally Level
  kind: action
  command: "Tally{level}"  # source command table: TallyHigh/TallyLow (no space before value)
  params:
    - name: level
      type: enum
      values: [High, Low]
```

## Feedbacks
```yaml
# UNRESOLVED: source does not document response/acknowledgement strings
# for individual commands. Version, Config, and DspCams queries display
# multi-line information, but the exact format is not captured here.
```

## Variables
```yaml
# UNRESOLVED: source lists parameter ranges inline with each command
# (e.g. Preset 1-138, Camera 1-6, WipeSel 0-10). These are already
# represented in the action params; no separate long-lived variables
# are documented in source.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or
# power-on sequencing requirements.
```

## Notes
All commands terminate with carriage return (CR, `0x0D`). Source uses literal `[9]` notation in parameter placeholders to indicate a single ASCII digit/character; commands documented with `[,9]` accept an optional secondary parameter. Pin 5 (GND) is the only required control-port ground reference; pins 1, 4, 6-9 on the DB-9F control port are unused. Camera ports 1-6 use RJ-45 with TXD on pin 7, RXD on pin 8, GND on pin 6 (all other pins unused). Trigger inputs 25-48 and 49-72 are wired to two DB-25 connectors. Input/output resolutions include YPbPr up to 1080p, RGBHV up to 1920x1200 (output only), and SD 480i/576i. The source documents commands for the AutoPresenter specifically; applicability to the broader ProductionView Series family has not been confirmed by this source.

<!-- UNRESOLVED: Source does not state firmware version compatibility, response syntax for Version/Config/DspCams queries, baud rate negotiation behavior, or whether ProductionView Series shares this exact command set. -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - fullcompass.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-06-02T10:14:12.498Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T10:14:12.498Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec actions confirmed verbatim in source command table with correct shapes; reset has no arg, pip is PipOn/PipOff, tally is TallyHigh/TallyLow; transport fully supported. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "confirm whether AutoPresenter == ProductionView Series, or if these are separate SKUs sharing the protocol. Source does not cross-reference ProductionView."
- "source does not document response/acknowledgement strings"
- "source lists parameter ranges inline with each command"
- "source does not document unsolicited notifications."
- "source does not document multi-step sequences."
- "source contains no safety warnings, interlocks, or"
- "Source does not state firmware version compatibility, response syntax for Version/Config/DspCams queries, baud rate negotiation behavior, or whether ProductionView Series shares this exact command set."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
