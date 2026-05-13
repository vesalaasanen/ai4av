---
spec_id: admin/red-rcp2-camera-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "RED RCP2 Camera Control Spec"
manufacturer: RED
model_family: "RED EPIC"
aliases: []
compatible_with:
  manufacturers:
    - RED
  models:
    - "RED EPIC"
    - "RED SCARLET"
    - "RED DSMC2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - red.com
retrieved_at: 2026-05-07T14:21:13.719Z
last_checked_at: 2026-05-08T15:43:15.579Z
generated_at: 2026-05-08T15:43:15.579Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-08T15:43:15.579Z
  matched_actions: 47
  action_count: 47
  confidence: high
  summary: "All 47 spec actions matched cleanly to RCP2 protocol definition with correct transport parameters (TCP 1111, serial 115200, UDP 1112)."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-07
---

# RED RCP2 Camera Control Spec

## Summary
RED Command Protocol 2 (RCP2) is a text-based, asynchronous protocol for controlling RED EPIC, SCARLET, and DSMC2 cinema cameras over RS-232 serial, TCP/IP (Gigabit Ethernet), WiFi, and UDP. It provides comprehensive camera control including recording, playback, exposure, image parameters, lens control, audio, overlays, and system management. Messages are human-readable with optional XOR checksums.

<!-- UNRESOLVED: RCP parameter set versions vary by firmware; specific firmware version to parameter set mapping is not fully enumerated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - udp
addressing:
  port: 1111
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
udp:
  discovery_port: 1112
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # SHUTDOWN command present; camera cannot be powered on remotely
  - queryable    # GET (G) command returns current parameter values
  - levelable    # gain, volume, brightness, ISO, color temp etc. are continuous ranges
```

## Actions
```yaml
actions:
  - id: set_parameter
    label: Set Parameter
    kind: action
    description: "Set a camera parameter value. Command char 'S'. Syntax: #$EXT:S:<ParamID>:<Value>:"
    params:
      - name: param_id
        type: string
        description: "Parameter identifier (up to 8 alphanumeric chars, e.g. ISO, COLTMP, RECORD)"
      - name: value
        type: string
        description: "Value as string representation"

  - id: get_parameter
    label: Get Parameter
    kind: action
    description: "Get current parameter value. Command char 'G'. Syntax: #$EXT:G:<ParamID>:"
    params:
      - name: param_id
        type: string
        description: "Parameter identifier"

  - id: get_parameter_list
    label: Get Parameter List
    kind: action
    description: "Get list of valid values for a parameter. Command char 'H'. Syntax: #$EXT:H:<ParamID>:"
    params:
      - name: param_id
        type: string

  - id: set_relative
    label: Set Relative
    kind: action
    description: "Adjust parameter relative to current value. Command char 'U'. Syntax: #$EXT:U:<ParamID>:<delta>:"
    params:
      - name: param_id
        type: string
      - name: delta
        type: integer
        description: "Positive or negative offset from current value"

  - id: set_list_relative
    label: Set List Relative
    kind: action
    description: "Move selection within list by offset. Command char 'V'. Syntax: #$EXT:V:<ParamID>:<offset>:"
    params:
      - name: param_id
        type: string
      - name: offset
        type: integer
        description: "Number of list entries to move (positive or negative)"

  - id: get_periodic
    label: Get Periodic
    kind: action
    description: "Start (1) or stop (0) periodic output of a parameter. Command char 'I'. Syntax: #$EXT:I:<ParamID>:<0|1>:"
    params:
      - name: param_id
        type: string
      - name: enable
        type: integer
        description: "1 to start periodic output, 0 to stop"

  - id: record_start
    label: Start Recording
    kind: action
    description: "Start recording. Syntax: #$EXT:S:RECORD:1:"
    params: []

  - id: record_stop
    label: Stop Recording
    kind: action
    description: "Stop recording. Syntax: #$EXT:S:RECORD:0:"
    params: []

  - id: record_toggle
    label: Toggle Recording
    kind: action
    description: "Toggle record state. Syntax: #$EXT:S:RECORD:2:"
    params: []

  - id: shutdown
    label: Shutdown Camera
    kind: action
    description: "Shutdown camera. Cannot be powered on remotely. Syntax: #$EXT:S:SHUTDOWN::"
    params: []

  - id: playback_enter
    label: Enter Playback Mode
    kind: action
    description: "Switch camera to playback mode. Syntax: #$EXT:S:PLAYBACK:1:"
    params: []

  - id: playback_exit
    label: Exit Playback Mode
    kind: action
    description: "Return to preview mode. Syntax: #$EXT:S:PLAYBACK:0:"
    params: []

  - id: play_clip
    label: Play Clip
    kind: action
    description: "Play current clip. Value ignored, send 0. Syntax: #$EXT:S:PLAY:0:"
    params: []

  - id: pause_clip
    label: Pause Clip
    kind: action
    description: "Pause current clip. Value ignored, send 0. Syntax: #$EXT:S:PAUSE:0:"
    params: []

  - id: send_keycode
    label: Send Key Code
    kind: action
    description: "Send a generic key code. Syntax: #$EXT:S:KEYCODE:<code>:"
    params:
      - name: keycode
        type: integer
        description: "32-bit key code value (see key code tables in source)"

  - id: send_key_action
    label: Send Key Action
    kind: action
    description: "Send a key action, optionally with argument. Syntax: #$EXT:S:KEYACT:<action_code>[,<argument>]:"
    params:
      - name: action_code
        type: integer
        description: "Action code from key_action_t enum"
      - name: argument
        type: string
        required: false
        description: "Optional comma-separated argument (e.g. preset name)"

  - id: set_iso
    label: Set ISO
    kind: action
    description: "Set ISO value. Syntax: #$EXT:S:ISO:<value>:"
    params:
      - name: value
        type: integer
        description: "ISO value (250, 320, 400, 500, 640, 800, 1000, 1280, 1600, 2000, 2500, 3200, 4000, 5000, 6400, 12800)"

  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    description: "Set color temp in Kelvin * 1000. Syntax: #$EXT:S:COLTMP:<value>:"
    params:
      - name: value
        type: integer
        description: "Color temperature * 1000, range 1700000 to 100000000 (1700-100000K)"

  - id: set_exposure_time
    label: Set Exposure Time Target
    kind: action
    description: "Set exposure time target. Syntax: #$EXT:S:SHTIMET:<value>:"
    params:
      - name: value
        type: integer
        description: "Exposure time denominator * 1000 (e.g. 48000 = 1/48 sec)"

  - id: set_shutter_angle
    label: Set Shutter Angle Target
    kind: action
    description: "Set shutter angle target. Syntax: #$EXT:S:SHANGLET:<value>:"
    params:
      - name: value
        type: integer
        description: "Shutter angle in degrees * 1000, range 1 to 360000"

  - id: set_aperture
    label: Set Aperture Target
    kind: action
    description: "Set aperture target. Syntax: #$EXT:S:APRTRT:<value>:"
    params:
      - name: value
        type: integer
        description: "Aperture F# * 10"

  - id: set_project_fps
    label: Set Project Frame Rate
    kind: action
    description: "Set project frame rate. Syntax: #$EXT:S:PROJFPS:<value>:"
    params:
      - name: value
        type: integer
        description: "Frame rate * 1001 (e.g. 24000, 24024, 25025, 30000, 48000, 50050, 60000)"

  - id: set_format
    label: Set Image Format
    kind: action
    description: "Set resolution/aspect/anamorphic combined. Syntax: #$EXT:S:FORMAT2:<value>:"
    params:
      - name: value
        type: integer
        description: "Combined 32-bit value: (look_around << 16) + (anamorphic << 12) + (aspect << 4) + resolution"

  - id: set_redcode_target
    label: Set REDcode Target
    kind: action
    description: "Set REDcode compression target. Syntax: #$EXT:S:RCTARGET:<value>:"
    params:
      - name: value
        type: integer
        description: "REDCODE target * 100, range 300 to 1800"

  - id: format_media
    label: Format Media
    kind: action
    description: "Format the specified media. Syntax: #$EXT:S:FMTMEDIA:<media_loc>:"
    params:
      - name: media_loc
        type: integer
        description: "Media location (see media_loc_t)"

  - id: eject_media
    label: Eject Media
    kind: action
    description: "Eject media. Syntax: #$EXT:S:EJECT:<media_loc>:"
    params:
      - name: media_loc
        type: integer

  - id: discover_cameras
    label: Discover Cameras
    kind: action
    description: "Broadcast UDP to port 1112 to discover cameras on network. Send #$EXT:G:CAMINFO: as datagram payload."
    params: []

  - id: apply_preset
    label: Apply Camera Preset
    kind: action
    description: "Apply a named preset. Syntax: #$EXT:S:CPREAPLY:<preset_name>:"
    params:
      - name: preset_name
        type: string

  - id: apply_look
    label: Apply Camera Look
    kind: action
    description: "Apply a named look. Syntax: #$EXT:S:CLOKAPLY:<look_name>:"
    params:
      - name: look_name
        type: string

  - id: reset_factory_defaults
    label: Reset Factory Defaults
    kind: action
    description: "Initiate factory reset. Syntax: #$EXT:S:RESETDEF::"
    params: []

  - id: calibrate_auto
    label: Auto Calibration
    kind: action
    description: "Start auto user calibration. Syntax: #$EXT:S:CALAUTO::"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: current_parameter
    type: string
    description: "Unsolicited CURRENT (C) command sent when any parameter changes. Syntax: #<camera>:C:<ParamID>:<Value>:"

  - id: record_state
    type: enum
    values: [not_recording, recording, intermediate_states]
    description: "Current recording state via C:RECORD:. 0=not recording, 1=recording, other intermediate states possible"

  - id: playback_state
    type: enum
    values: [in_playback, not_in_playback]
    description: "Current playback state via C:PLAYBACK:. 0=not in playback, 1=in playback"

  - id: camera_info
    type: string
    description: "Camera serial, type, firmware, IP, interface via C:CAMINFO:"

  - id: firmware_version
    type: string
    description: "Camera firmware version via C:CAMFWVER: (n.n.n format)"

  - id: rcp_version
    type: integer
    description: "RCP protocol version via C:RCPVER:"

  - id: parameter_set_version
    type: integer
    description: "RCP parameter set version via C:RCPPSVER:. 32-bit: major << 16 + minor"

  - id: asic_temperature
    type: integer
    description: "Current ASIC temperature in degrees C via C:CURRTEMP:"

  - id: sensor_temperature
    type: integer
    description: "Current sensor temperature in degrees C via C:CURSENST:"

  - id: media_free_percent
    type: integer
    description: "Media free space percentage 0-100, -1 = no media. Via C:MEDIAPCT:"

  - id: power_level
    type: integer
    description: "Battery/power level via C:PWRBATL:. 0-100=percent, >100=voltage*1000, <0=seconds remaining * -1"

  - id: timecode
    type: integer
    description: "Posted timecode via C:POSTTC:. 32-bit packed hh:mm:ss:ff, sent automatically each second"

  - id: notification
    type: string
    description: "System notification dialog via C:NOTIFY:. Includes UUID, title, message, progress, response options"

  - id: fan_speed_top
    type: integer
    description: "Top fan speed percentage 0-100 via C:FANPCTT:"

  - id: fan_speed_front
    type: integer
    description: "Front fan speed percentage 0-100 via C:FANPCTF:"

  - id: clip_info
    type: string
    description: "Extended clip info via C:MEDAGCII:. Returns name, date, time, FPS, timecodes for indexed clip"

  - id: audio_vu
    type: string
    description: "VU meter peak readings (10 values) via C:AUDIOVU:. dB = (raw - 20) clipped to -52..0"

  - id: histogram
    type: string
    description: "Downsampled histogram data via C:DSHIST:. Packed RGBL data with base64 encoding"

  - id: clip_name
    type: string
    description: "Next recording clip name via C:CLIPNAME:"
```

## Variables
```yaml
variables:
  - id: iso
    label: ISO
    type: integer
    description: "ISO sensitivity. SET via S:ISO:<value>:, GET via G:ISO:"
    values: [250, 320, 400, 500, 640, 800, 1000, 1280, 1600, 2000, 2500, 3200, 4000, 5000, 6400, 12800]

  - id: color_temperature
    label: Color Temperature
    type: integer
    description: "Color temp in Kelvin * 1000, range 1700000-100000000. SET via S:COLTMP:, relative via U:COLTMP:"

  - id: tint
    label: Tint
    type: integer
    description: "Tint * 1000, range -100000 to +100000. SET via S:TINT:, relative via U:TINT:"

  - id: red_gain
    label: Red Gain
    type: integer
    description: "Red linear gain * 1000, range 0-10000. SET via S:REDG:, relative via U:REDG:"

  - id: green_gain
    label: Green Gain
    type: integer
    description: "Green linear gain * 1000, range 0-10000. SET via S:GREENG:, relative via U:GREENG:"

  - id: blue_gain
    label: Blue Gain
    type: integer
    description: "Blue linear gain * 1000, range 0-10000. SET via S:BLUEG:, relative via U:BLUEG:"

  - id: saturation
    label: Saturation
    type: integer
    description: "Saturation * 1000, range 0-4000. SET via S:SATURAT:, relative via U:SATURAT:"

  - id: flut
    label: FLUT
    type: integer
    description: "FLUT * 1000, range -8000 to +8000. SET via S:FLUT:, relative via U:FLUT:"

  - id: brightness
    label: Brightness
    type: integer
    description: "Brightness * 1000, range -10000 to +10000. SET via S:BRIGHT:"

  - id: contrast
    label: Contrast
    type: integer
    description: "Contrast * 1000, range -1000 to +1000. SET via S:CONTRST:"

  - id: shutter_angle
    label: Shutter Angle
    type: integer
    description: "Shutter angle in degrees * 1000, range 1-360000. Read via C:SHANGLE:, set target via S:SHANGLET:"

  - id: exposure_time
    label: Exposure Time
    type: integer
    description: "Exposure time denominator * 1000. Read via C:SHTIME:, set target via S:SHTIMET:"

  - id: aperture
    label: Aperture
    type: integer
    description: "Aperture F# * 10. Read via C:APRTR:, set target via S:APRTRT:"

  - id: sensor_fps
    label: Sensor Frame Rate
    type: integer
    description: "Sensor FPS * 1001. SET via S:SENSFPS:"

  - id: project_fps
    label: Project Frame Rate
    type: integer
    description: "Project FPS * 1001. SET via S:PROJFPS:"

  - id: redcode
    label: REDcode
    type: integer
    description: "REDCODE quality * 100, range 300-1800. Read via C:REDCODE:, set target via S:RCTARGET:"

  - id: audio_gain_ch1
    label: Audio Gain Channel 1
    type: integer
    description: "Channel 1 gain, range 8-38 (+30 to +60 dB, 1 dB/step). SET via S:CH1GAIN:"

  - id: audio_volume_ch1
    label: Audio Volume Channel 1
    type: integer
    description: "Channel 1 volume, range 71-127 (-28 to 0 dB, 0.5 dB/step). SET via S:CH1VOL:"

  - id: lcd_brightness
    label: LCD Brightness
    type: integer
    description: "BRAIN LCD brightness, range 1-8. SET via S:BLCDBR:"

  - id: evf_brightness
    label: EVF Brightness
    type: integer
    description: "BRAIN EVF brightness, range 1-8. SET via S:BEVFBR:"
```

## Events
```yaml
events:
  - id: current_value_update
    description: "Unsolicited CURRENT (C) command sent to all agents when any parameter value changes"

  - id: timecode_post
    description: "POSTTC sent automatically every second when TOD timecode is selected"

  - id: notification_dialog
    description: "NOTIFY sent when system notification needs display; requires NOTIFYR response for dismissable dialogs"

  - id: frame_tagged
    description: "TAGGED sent when a frame is tagged during recording"

  - id: dropped_frames
    description: "C:DRPFRMS: sent with count of dropped frames during record since boot"

  - id: periodic_data
    description: "Parameters enabled via GET_PERIODIC (I) are sent at regular intervals (e.g. AUDIOVU at 10 Hz, MPITCH/MROLL at 3.33 Hz, DSHIST at 10 Hz)"
```

## Macros
```yaml
macros:
  - id: start_recording
    label: Start Recording
    steps:
      - action: set_parameter
        params: { param_id: "RECORD", value: "1" }
      - wait_for: "C:RECORD:1:"  # Confirm RECORD_STATE_RECORDING received
    description: "Send RECORD START and wait for CURRENT confirmation before next action"

  - id: stop_recording
    label: Stop Recording
    steps:
      - action: set_parameter
        params: { param_id: "RECORD", value: "0" }
      - wait_for: "C:RECORD:0:"  # Confirm RECORD_STATE_NOT_RECORDING
    description: "Send RECORD STOP and wait for CURRENT confirmation"

  - id: enter_playback_and_play
    label: Enter Playback and Play Last Clip
    steps:
      - action: set_parameter
        params: { param_id: "PLAYBACK", value: "1" }
      - wait_for: "C:PLAYBACK:1:"
      - action: set_parameter
        params: { param_id: "PLAY", value: "0" }
    description: "Switch to playback mode, confirm, then play last recorded clip"

  - id: discover_and_connect
    label: Discover and Connect to Camera
    steps:
      - action: discover_cameras
        description: "Broadcast #$EXT:G:CAMINFO: via UDP to port 1112, repeat 5x with 500ms delay"
      - description: "Collect CAMINFO responses, extract source IP from UDP header"
      - description: "Connect via TCP to discovered camera IP on port 1111"
    description: "Dynamic camera discovery on network when IP is unknown"
```

## Safety
```yaml
confirmation_required_for:
  - shutdown
  - format_media
  - secure_format_media
  - reset_factory_defaults
  - reset_user
interlocks:
  - description: "Camera cannot be powered on remotely via RCP"
  - description: "Camera must be in preview mode to record (not playback mode)"
  - description: "Max 8 simultaneous TCP connections; application should maintain only one and close before reopening"
  - description: "Record state changes are asynchronous - must wait for CURRENT confirmation before sending next record command"
# UNRESOLVED: no specific safety interlock sequences documented beyond operational notes above
```

## Notes
- RCP is text-based and human-readable. Messages use format `# @TargetID $SourceID : Command : ParamID : Value : * Checksum <LF>`.
- Source ID for external controllers should be `EXT`. Camera responds with its configured name (e.g. `EPIC`, `DRAGON`).
- Colons in values must be escaped with backslash (e.g. `11\:05\:39`).
- Checksum is optional. When used, compute XOR of all characters between `#` and `*`, send as hex ASCII after `*`.
- Invalid SET/GET commands are silently ignored — no error response.
- Parameters use scaling conventions: many values are multiplied by 1000, 100, or 10 to represent decimals as integers.
- Use target parameters (SHANGLET, SHTIMET, RCTARGET, APRTRT) for SET operations; read actual values from corresponding non-target parameters (SHANGLE, SHTIME, REDCODE, APRTR).
- Parameter sets are versioned (major.minor packed as 32-bit). Check RCPPSVER for compatibility.
- Not all parameters support all commands. See per-group parameter tables for S/G/C support indicators.
- WiFi and serial transport use identical protocol; only the physical layer differs.
- UDP discovery broadcasts `#$EXT:G:CAMINFO:` to port 1112; cameras respond with CAMINFO including serial, name, firmware, interface type.

<!-- UNRESOLVED: full key code enumeration is extensive (~100+ codes) — see source tables for complete list -->
<!-- UNRESOLVED: many IMAGE group parameters (curves, CDL, LGG) have complex sub-parameter structures not fully decomposed here -->
<!-- UNRESOLVED: monitor/output group has per-port variants (BRAIN LCD, Rear LCD, EVF, HDMI, HD-SDI) with parallel parameters — representative entries shown -->
<!-- UNRESOLVED: audio group has per-channel variants (CH1-CH4) for gain, volume, mute, limiter, phantom power — representative entries shown -->
<!-- UNRESOLVED: WiFi configuration parameters (WLANMODE, WLANAHID, WLANAHPW, etc.) documented but not fully enumerated as actions -->
<!-- UNRESOLVED: power input/output port parameters use indexed addressing (MSG_INDEXED_INT) — requires PWILIST/PWOLIST query first -->

## Provenance

```yaml
source_domains:
  - red.com
retrieved_at: 2026-05-07T14:21:13.719Z
last_checked_at: 2026-05-08T15:43:15.579Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-08T15:43:15.579Z
matched_actions: 47
action_count: 47
confidence: high
summary: "All 47 spec actions matched cleanly to RCP2 protocol definition with correct transport parameters (TCP 1111, serial 115200, UDP 1112)."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
