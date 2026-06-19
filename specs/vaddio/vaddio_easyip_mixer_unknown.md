---
spec_id: admin/vaddio-easyip-mixer
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio EasyIP Mixer Control Spec"
manufacturer: Vaddio
model_family: "EasyIP Mixer"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "EasyIP Mixer"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - files.avprosupply.com
  - manua.ls
  - manuals.ca
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v134258868/Resources/Vaddio/Cameras/Operation/411-0041-35_Rev_D_EasyIP_System_Complete_Manual.pdf
  - https://files.avprosupply.com/files/attachments/473597/vaddio-999-60210-000-manual.pdf
  - https://res.cloudinary.com/avd/image/upload/v134231220/Resources/Vaddio/Cameras/Operation/411-0041-35_Rev_D_EasyIP_System_Complete_Manual.pdf
  - https://www.manua.ls/vaddio/easyip-10/manual
  - https://www.manuals.ca/vaddio/easyip-10/manual
retrieved_at: 2026-06-18T10:11:20.380Z
last_checked_at: 2026-06-19T07:55:48.679Z
generated_at: 2026-06-19T07:55:48.679Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "VISCA RS-232 command tables in source apply to EasyIP 20 cameras only, not the Mixer host; excluded from this spec."
  - "EasyIP 10-only (camera recalibrate) and EasyIP Decoder-only (video type) commands excluded."
  - "Telnet access is disabled by default and must be enabled via web Security page."
  - "admin password value/format not documented in source."
  - "admin password / auth credential format not stated in source"
  - "firmware version compatibility not stated in source"
  - "audio volume set range not explicitly bounded in source"
  - "audio route set <inputs> token format not fully specified"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:55:48.679Z
  matched_actions: 73
  action_count: 73
  confidence: medium
  summary: "All 73 actions matched exactly; transport parameters verified; full command coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-18
---

# Vaddio EasyIP Mixer Control Spec

## Summary
The Vaddio EasyIP Mixer is an AV-over-IP host device that mixes audio/video from EasyIP cameras, HDMI, Dante, USB, and line I/O for unified conferencing. This spec covers the Vaddio serial command API accessible via Telnet (TCP port 23) and via direct RS-232 serial connection. Camera PTZ, video routing/PIP, audio mute/volume/route/crosspoint-gain, trigger, standby, and maintenance commands are documented.

<!-- UNRESOLVED: VISCA RS-232 command tables in source apply to EasyIP 20 cameras only, not the Mixer host; excluded from this spec. -->
<!-- UNRESOLVED: EasyIP 10-only (camera recalibrate) and EasyIP Decoder-only (video type) commands excluded. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # stated: "Telnet port 23 is used"
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # source: "you must log in using the admin account"; credential format not stated
```

<!-- UNRESOLVED: Telnet access is disabled by default and must be enabled via web Security page. -->
<!-- UNRESOLVED: admin password value/format not documented in source. -->

## Traits
```yaml
traits:
  - powerable      # inferred: system standby on/off/toggle + camera standby
  - queryable      # inferred: numerous get/status queries
  - routable       # inferred: audio route, video source set
  - levelable      # inferred: audio volume, audio crosspoint-gain
```

## Actions
```yaml
# Camera input range for EasyIP Mixer: 2 to 5 (input 1 = HDMI). Unless noted,
# commands take form `camera <input> <sub>` when sent to the Mixer host.
actions:
  - id: camera_home
    label: Camera Home
    kind: action
    command: "camera {input} home"
    params:
      - name: input
        type: integer
        description: "Camera input (EasyIP Mixer: 2 to 5)"
  - id: camera_pan_left
    label: Camera Pan Left
    kind: action
    command: "camera {input} pan left [{speed}]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: speed
        type: integer
        description: "Optional pan speed, 1 to 24 (default 12)"
  - id: camera_pan_right
    label: Camera Pan Right
    kind: action
    command: "camera {input} pan right [{speed}]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: speed
        type: integer
        description: "Optional pan speed, 1 to 24 (default 12)"
  - id: camera_pan_stop
    label: Camera Pan Stop
    kind: action
    command: "camera {input} pan stop"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: camera_pan_set
    label: Camera Pan Set
    kind: action
    command: "camera {input} pan set {position} [{speed}]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: position
        type: float
        description: "Absolute pan degrees (EasyIP 20: -150 to 150)"
      - name: speed
        type: integer
        description: "Optional pan speed, 1 to 24"
  - id: camera_tilt_up
    label: Camera Tilt Up
    kind: action
    command: "camera {input} tilt up [{speed}]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: speed
        type: integer
        description: "Optional tilt speed, 1 to 20 (default 10)"
  - id: camera_tilt_down
    label: Camera Tilt Down
    kind: action
    command: "camera {input} tilt down [{speed}]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: speed
        type: integer
        description: "Optional tilt speed, 1 to 20 (default 10)"
  - id: camera_tilt_stop
    label: Camera Tilt Stop
    kind: action
    command: "camera {input} tilt stop"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: camera_tilt_set
    label: Camera Tilt Set
    kind: action
    command: "camera {input} tilt set {position} [{speed}]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: position
        type: float
        description: "Absolute tilt degrees (EasyIP 20: -30 to 90)"
      - name: speed
        type: integer
        description: "Optional tilt speed, 1 to 20"
  - id: camera_zoom_in
    label: Camera Zoom In
    kind: action
    command: "camera {input} zoom in [{speed}]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: speed
        type: integer
        description: "Optional zoom speed, 1 to 7"
  - id: camera_zoom_out
    label: Camera Zoom Out
    kind: action
    command: "camera {input} zoom out [{speed}]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: speed
        type: integer
        description: "Optional zoom speed, 1 to 7"
  - id: camera_zoom_stop
    label: Camera Zoom Stop
    kind: action
    command: "camera {input} zoom stop"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: camera_zoom_set
    label: Camera Zoom Set
    kind: action
    command: "camera {input} zoom set {position}"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: position
        type: float
        description: "Zoom level (EasyIP 20: 1.00 to 20.00)"
  - id: camera_focus_near
    label: Camera Focus Near
    kind: action
    command: "camera {input} focus near [{speed}]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: speed
        type: integer
        description: "Optional focus speed, 1 to 8"
  - id: camera_focus_far
    label: Camera Focus Far
    kind: action
    command: "camera {input} focus far [{speed}]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: speed
        type: integer
        description: "Optional focus speed, 1 to 8"
  - id: camera_focus_stop
    label: Camera Focus Stop
    kind: action
    command: "camera {input} focus stop"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: camera_focus_mode_set
    label: Camera Focus Mode Set
    kind: action
    command: "camera {input} focus mode {auto|manual}"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: camera_preset_recall
    label: Camera Preset Recall
    kind: action
    command: "camera {input} preset recall {slot} [save-ccu]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: slot
        type: integer
        description: "Preset number, 1 to 16"
  - id: camera_preset_store
    label: Camera Preset Store
    kind: action
    command: "camera {input} preset store {slot} [save-ccu]"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: slot
        type: integer
        description: "Preset number, 1 to 16"
  - id: camera_ccu_get
    label: Camera CCU Get
    kind: query
    command: "camera {input} ccu get {param}"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: param
        type: enum
        description: "auto_white_balance|red_gain|blue_gain|backlight_compensation|auto_iris|iris|gain|detail|chroma|gamma|wide_dynamic_range|all"
  - id: camera_ccu_set
    label: Camera CCU Set
    kind: action
    command: "camera {input} ccu set {param} {value}"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: param
        type: enum
        description: "auto_iris|auto_white_balance|backlight_compensation|blue_gain|chroma|detail|gain|gamma|iris|red_gain|wide_dynamic_range"
  - id: camera_ccu_scene_recall_factory
    label: Camera CCU Scene Recall Factory
    kind: action
    command: "camera {input} ccu scene recall factory {slot}"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: slot
        type: integer
        description: "Factory scene, 1 to 6"
  - id: camera_ccu_scene_recall_custom
    label: Camera CCU Scene Recall Custom
    kind: action
    command: "camera {input} ccu scene recall custom {slot}"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: slot
        type: integer
        description: "Custom scene, 1 to 3"
  - id: camera_ccu_scene_store_custom
    label: Camera CCU Scene Store Custom
    kind: action
    command: "camera {input} ccu scene store custom {slot}"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: slot
        type: integer
        description: "Custom scene, 1 to 3"
  - id: camera_standby_off
    label: Camera Standby Off
    kind: action
    command: "camera {input} standby off"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: camera_standby_on
    label: Camera Standby On
    kind: action
    command: "camera {input} standby on"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: camera_standby_toggle
    label: Camera Standby Toggle
    kind: action
    command: "camera {input} standby toggle"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: camera_standby_get
    label: Camera Standby Get
    kind: query
    command: "camera {input} standby get"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: video_mute_off
    label: Video Mute Off
    kind: action
    command: "video mute off"
    params: []
  - id: video_mute_on
    label: Video Mute On
    kind: action
    command: "video mute on"
    params: []
  - id: video_mute_toggle
    label: Video Mute Toggle
    kind: action
    command: "video mute toggle"
    params: []
  - id: video_mute_get
    label: Video Mute Get
    kind: query
    command: "video mute get"
    params: []
  - id: video_pip_on
    label: Video PIP On
    kind: action
    command: "video pip on"
    params: []
  - id: video_pip_off
    label: Video PIP Off
    kind: action
    command: "video pip off"
    params: []
  - id: video_pip_toggle
    label: Video PIP Toggle
    kind: action
    command: "video pip toggle"
    params: []
  - id: video_pip_get
    label: Video PIP Get
    kind: query
    command: "video pip get"
    params: []
  - id: video_pip_layout_set
    label: Video PIP Layout Set
    kind: action
    command: "video pip layout {layout}"
    params:
      - name: layout
        type: enum
        description: "upper_right|lower_right|lower_left|upper_left|top_bottom|left_right"
  - id: video_pip_layout_get
    label: Video PIP Layout Get
    kind: query
    command: "video pip layout get"
    params: []
  - id: video_source_set
    label: Video Source Set
    kind: action
    command: "video source set input{input}"
    params:
      - name: input
        type: integer
        description: "Video input (EasyIP Mixer: 1 HDMI to 5)"
  - id: video_source_get
    label: Video Source Get
    kind: query
    command: "video source get"
    params: []
  - id: audio_mute_on
    label: Audio Mute On
    kind: action
    command: "audio {channel} mute on"
    params:
      - name: channel
        type: enum
        description: "master|line_in_1|line_in_2|usb3_playback_left|usb3_playback_right|hdmi_in_left|hdmi_in_right|dante_in_1|dante_in_2|dante_in_3|dante_in_4|line_out_1|line_out_2|usb3_record_left|usb3_record_right|hdmi_out_left|hdmi_out_right|dante_out_1|dante_out_2|dante_out_3|dante_out_4"
  - id: audio_mute_off
    label: Audio Mute Off
    kind: action
    command: "audio {channel} mute off"
    params:
      - name: channel
        type: enum
        description: "see audio_mute_on"
  - id: audio_mute_toggle
    label: Audio Mute Toggle
    kind: action
    command: "audio {channel} mute toggle"
    params:
      - name: channel
        type: enum
        description: "see audio_mute_on"
  - id: audio_mute_get
    label: Audio Mute Get
    kind: query
    command: "audio {channel} mute get"
    params:
      - name: channel
        type: enum
        description: "see audio_mute_on"
  - id: audio_volume_up
    label: Audio Volume Up
    kind: action
    command: "audio {channel} volume up"
    params:
      - name: channel
        type: enum
        description: "see audio_mute_on"
  - id: audio_volume_down
    label: Audio Volume Down
    kind: action
    command: "audio {channel} volume down"
    params:
      - name: channel
        type: enum
        description: "see audio_mute_on"
  - id: audio_volume_set
    label: Audio Volume Set
    kind: action
    command: "audio {channel} volume set {level}"
    params:
      - name: channel
        type: enum
        description: "see audio_mute_on"
      - name: level
        type: float
        description: "Volume in dB (range not explicitly stated in source)"
  - id: audio_volume_get
    label: Audio Volume Get
    kind: query
    command: "audio {channel} volume get"
    params:
      - name: channel
        type: enum
        description: "see audio_mute_on"
  - id: audio_route_set
    label: Audio Route Set
    kind: action
    command: "audio {channel} route set {inputs}"
    params:
      - name: channel
        type: enum
        description: "Output channel (line_out_1/2, usb3_record_left/right, hdmi_out_left/right, dante_out_1-4)"
      - name: inputs
        type: string
        description: "Input list to route to the output (format not fully specified in source)"
  - id: audio_route_get
    label: Audio Route Get
    kind: query
    command: "audio {channel} route get"
    params:
      - name: channel
        type: enum
        description: "Output channel"
  - id: audio_crosspoint_gain_set
    label: Audio Crosspoint Gain Set
    kind: action
    command: "audio {output} crosspoint-gain {input} set {level}"
    params:
      - name: output
        type: enum
        description: "Output channel"
      - name: input
        type: enum
        description: "Input channel"
      - name: level
        type: float
        description: "Crosspoint gain, -12.00 dB to 12.00 dB"
  - id: audio_crosspoint_gain_get
    label: Audio Crosspoint Gain Get
    kind: query
    command: "audio {output} crosspoint-gain {input} get"
    params:
      - name: output
        type: enum
        description: "Output channel"
      - name: input
        type: enum
        description: "Input channel"
  - id: camera_authenticate
    label: Camera Authenticate
    kind: action
    command: "camera {input} authenticate {password}"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: password
        type: string
        description: "Camera admin password"
  - id: camera_comm_host_get
    label: Camera Comm Host Get
    kind: query
    command: "camera {input} comm host get"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: camera_comm_host_set
    label: Camera Comm Host Set
    kind: action
    command: "camera {input} comm host set {host}"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
      - name: host
        type: string
        description: "IP address of input device"
  - id: camera_comm_host_unset
    label: Camera Comm Host Unset
    kind: action
    command: "camera {input} comm host unset"
    params:
      - name: input
        type: integer
        description: "Camera input (2 to 5)"
  - id: streaming_settings_get
    label: Streaming Settings Get
    kind: query
    command: "streaming settings get"
    params: []
  - id: network_settings_get
    label: Network Settings Get
    kind: query
    command: "network settings get"
    params: []
  - id: trigger_on
    label: Trigger On
    kind: action
    command: "trigger {index} on"
    params:
      - name: index
        type: integer
        description: "Trigger index, 1 to 50"
  - id: trigger_off
    label: Trigger Off
    kind: action
    command: "trigger {index} off"
    params:
      - name: index
        type: integer
        description: "Trigger index, 1 to 50"
  - id: system_standby_on
    label: System Standby On
    kind: action
    command: "system standby on"
    params: []
  - id: system_standby_off
    label: System Standby Off
    kind: action
    command: "system standby off"
    params: []
  - id: system_standby_toggle
    label: System Standby Toggle
    kind: action
    command: "system standby toggle"
    params: []
  - id: system_standby_get
    label: System Standby Get
    kind: query
    command: "system standby get"
    params: []
  - id: network_ping
    label: Network Ping
    kind: action
    command: "network ping [count {count}] [size {size}] {host}"
    params:
      - name: count
        type: integer
        description: "Optional packet count (default 5)"
      - name: size
        type: integer
        description: "Optional packet size bytes (default 56)"
      - name: host
        type: string
        description: "Hostname or IP"
  - id: system_reboot
    label: System Reboot
    kind: action
    command: "system reboot [{seconds}]"
    params:
      - name: seconds
        type: integer
        description: "Optional reboot delay seconds"
  - id: system_factory_reset_on
    label: System Factory-Reset Arm On
    kind: action
    command: "system factory-reset on"
    params: []
  - id: system_factory_reset_off
    label: System Factory-Reset Arm Off
    kind: action
    command: "system factory-reset off"
    params: []
  - id: system_factory_reset_get
    label: System Factory-Reset Status Get
    kind: query
    command: "system factory-reset get"
    params: []
  - id: version
    label: Version
    kind: query
    command: "version"
    params: []
  - id: history
    label: History
    kind: query
    command: "history [{limit}]"
    params:
      - name: limit
        type: integer
        description: "Optional max commands to return"
  - id: help
    label: Help
    kind: query
    command: "help"
    params: []
  - id: exit
    label: Exit Session
    kind: action
    command: "exit"
    params: []
```

## Feedbacks
```yaml
# Query responses observed in source examples (each value carries OK terminator).
feedbacks:
  - id: camera_pan_position
    type: float
    values: []  # returned by `camera {input} pan get`; degrees, float
  - id: camera_tilt_position
    type: float
    values: []
  - id: camera_zoom_position
    type: float
    values: []
  - id: camera_focus_mode
    type: enum
    values: [auto, manual]
  - id: camera_standby_state
    type: enum
    values: [on, off]
  - id: camera_comm_host
    type: string
    values: []  # "<ip> (connected|disconnected)"
  - id: video_mute_state
    type: enum
    values: [on, off]
  - id: video_pip_state
    type: enum
    values: [on, off]
  - id: video_pip_layout
    type: enum
    values: [upper_right, lower_right, lower_left, upper_left, top_bottom, left_right]
  - id: video_source
    type: string
    values: []  # e.g. "input2"
  - id: audio_mute_state
    type: enum
    values: [on, off]
  - id: audio_volume
    type: float
    values: []  # dB
  - id: audio_route
    type: string
    values: []
  - id: audio_crosspoint_gain
    type: float
    values: []
  - id: streaming_settings
    type: object
    values: []
  - id: network_settings
    type: object
    values: []
  - id: system_standby_state
    type: enum
    values: [on, off]
  - id: factory_reset_status
    type: object
    values: []
  - id: version_info
    type: object
    values: []
```

## Variables
```yaml
# Settable CCU parameters per camera (input 2-5). Ranges from source.
variables:
  - name: auto_white_balance
    type: enum
    range: [on, off]
  - name: red_gain
    type: integer
    range: "0-255"
  - name: blue_gain
    type: integer
    range: "0-255"
  - name: backlight_compensation
    type: enum
    range: [on, off]
  - name: auto_iris
    type: enum
    range: [on, off]
  - name: iris
    type: integer
    range: "0-11"
  - name: gain
    type: integer
    range: "1-11"
  - name: detail
    type: integer
    range: "0-15"
  - name: chroma
    type: integer
    range: "0-14"
  - name: gamma
    type: integer
    range: "-16..64"
  - name: wide_dynamic_range
    type: enum
    range: [on, off]
```

## Events
```yaml
# No unsolicited device-to-host notifications described in source.
events: []
```

## Macros
```yaml
# Source states API supports writing macros, but no specific multi-step
# sequences are documented in this excerpt.
macros: []
```

## Safety
```yaml
confirmation_required_for:
  - system_reboot
  - system_factory_reset_on
interlocks:
  - "auto_iris on disables manual iris and gain"
  - "auto_white_balance on overrides red_gain and blue_gain manual settings"
  - "backlight_compensation only usable when wide_dynamic_range is off"
  - "wide_dynamic_range only usable when backlight_compensation is off"
  - "gain only usable when auto_iris is off"
  - "red_gain/blue_gain only usable when auto_white_balance is off"
  - "camera pan/tilt set commands block subsequent commands until motion completes"
# Source warning: connecting wrong cable to RS-232 port can damage equipment
# and void warranty. Pin 6 = GND, Pin 7 = TXD, Pin 8 = RXD on Mixer.
```

## Notes
- Telnet access disabled by default; must be enabled on web Security page. HTTP access and Telnet access both default off; device discovery defaults on.
- Login required using admin account; credential format not specified in source.
- `>` is the command prompt. CTRL-5 clears the serial buffer. `?` lists commands/subcommands/params.
- EasyIP Mixer camera inputs are 2 to 5 (HDMI input is input 1). Routing nomenclature: input1..input5 for `video source`.
- Camera-direct commands not reachable via Mixer host: `camera ptz-position`, `camera led`, `camera icr` (documented CAMERA ONLY). Excluded from this Mixer spec.
- VISCA hex command tables (CAM_Zoom, CAM_Focus, Pan-TiltDrive, CAM_Memory, CAM_WB, CAM_AE, CAM_Power, etc.) apply to EasyIP 20 cameras via direct RS-232 and are out of scope for the Mixer host. The Mixer host API maps to these via Telnet/serial command names listed above.
- Source documents firmware updates may add parameters not reflected in manuals.

<!-- UNRESOLVED: admin password / auth credential format not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: audio volume set range not explicitly bounded in source -->
<!-- UNRESOLVED: audio route set <inputs> token format not fully specified -->
````

Spec done. Mixer-scope. 60 actions enumerated, all Mixer-valid commands. VISCA hex + camera-only/Decoder-only/EasyIP-10-only excluded with UNRESOLVED notes. Transport TCP 23 + RS-232 38400 8N1, auth=password (admin login required but credential format UNRESOLVED).

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - files.avprosupply.com
  - manua.ls
  - manuals.ca
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v134258868/Resources/Vaddio/Cameras/Operation/411-0041-35_Rev_D_EasyIP_System_Complete_Manual.pdf
  - https://files.avprosupply.com/files/attachments/473597/vaddio-999-60210-000-manual.pdf
  - https://res.cloudinary.com/avd/image/upload/v134231220/Resources/Vaddio/Cameras/Operation/411-0041-35_Rev_D_EasyIP_System_Complete_Manual.pdf
  - https://www.manua.ls/vaddio/easyip-10/manual
  - https://www.manuals.ca/vaddio/easyip-10/manual
retrieved_at: 2026-06-18T10:11:20.380Z
last_checked_at: 2026-06-19T07:55:48.679Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:55:48.679Z
matched_actions: 73
action_count: 73
confidence: medium
summary: "All 73 actions matched exactly; transport parameters verified; full command coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "VISCA RS-232 command tables in source apply to EasyIP 20 cameras only, not the Mixer host; excluded from this spec."
- "EasyIP 10-only (camera recalibrate) and EasyIP Decoder-only (video type) commands excluded."
- "Telnet access is disabled by default and must be enabled via web Security page."
- "admin password value/format not documented in source."
- "admin password / auth credential format not stated in source"
- "firmware version compatibility not stated in source"
- "audio volume set range not explicitly bounded in source"
- "audio route set <inputs> token format not fully specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
