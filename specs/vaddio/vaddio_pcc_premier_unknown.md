---
spec_id: admin/vaddio-pcc-premier
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio PCC Premier Control Spec"
manufacturer: Vaddio
model_family: "PCC Premier"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "PCC Premier"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - fullcompass.com
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v1524000805/Resources/Vaddio/Control/Operation/342-1135-revc-pcc-premier-integrators-complete-guide.pdf
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - https://res.cloudinary.com/avd/image/upload/v134213940/Resources/Vaddio/Control/Operation/342-1135-revc-pcc-premier-integrators-complete-guide.pdf
retrieved_at: 2026-05-18T23:10:34.011Z
last_checked_at: 2026-06-02T07:06:48.554Z
generated_at: 2026-06-02T07:06:48.554Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Telnet auth credentials, prompt sequence, and admin account format are mentioned in source but not specified"
  - "source states \"Telnet sessions require the administrator account"
  - "source documents no independent settable variables outside"
  - "source describes no unsolicited notifications. Device is"
  - "source does not document any multi-step sequences or macro"
  - "Telnet auth — source states \"Telnet sessions require the administrator account login\" but does not document credential format, prompt sequence, or token mechanism. RS-232 session auth procedure not addressed."
  - "firmware compatibility range — `version` example shows \"PCC Premier 1.0.0\" as a return value, not a stated minimum required version."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:48.554Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions match literal commands in source with correct syntax, parameters, and ranges. Transport parameters verbatim. Full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Vaddio PCC Premier Control Spec

## Summary
Camera controller for production conferencing rooms, supporting up to 16 PTZ cameras across two buses (Control A: cameras 1-8, Control B: 9-16). Controlled via RS-232 (RJ-45, 9600 8N1, no flow control) or Telnet (TCP port 23), both speaking a high-level text command API with VT100-style terminal echo.

<!-- UNRESOLVED: Telnet auth credentials, prompt sequence, and admin account format are mentioned in source but not specified -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  # UNRESOLVED: source states "Telnet sessions require the administrator account
  # login" but does not document credential format, login prompt sequence, or
  # token mechanism. RS-232 auth procedure not addressed in source.
  type: null
```

## Traits
```yaml
- powerable       # inferred from system standby / system reboot / system factory-reset commands
- routable        # inferred from per-camera selection across two buses
- queryable       # inferred from .get variants across camera, network, streaming, standby, factory-reset
```

## Actions
```yaml
- id: camera_focus_near
  label: Camera Focus Near
  kind: action
  command: "camera {camera} focus near {speed}"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16 (1-8 Control A bus, 9-16 Control B bus)
    - name: speed
      type: integer
      description: Optional speed 1-8
      required: false

- id: camera_focus_far
  label: Camera Focus Far
  kind: action
  command: "camera {camera} focus far {speed}"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16
    - name: speed
      type: integer
      description: Optional speed 1-8
      required: false

- id: camera_focus_stop
  label: Camera Focus Stop
  kind: action
  command: "camera {camera} focus stop"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16

- id: camera_focus_mode_set
  label: Camera Focus Mode Set
  kind: action
  command: "camera {camera} focus mode {mode}"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16
    - name: mode
      type: enum
      values: [auto, manual]

- id: camera_focus_mode_get
  label: Camera Focus Mode Get
  kind: query
  command: "camera {camera} focus mode get"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16

- id: camera_home
  label: Camera Home
  kind: action
  command: "camera {camera} home"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16

- id: camera_pan_left
  label: Camera Pan Left
  kind: action
  command: "camera {camera} pan left {speed}"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16
    - name: speed
      type: integer
      description: Optional speed 1-24 (default 12)
      required: false

- id: camera_pan_right
  label: Camera Pan Right
  kind: action
  command: "camera {camera} pan right {speed}"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16
    - name: speed
      type: integer
      description: Optional speed 1-24 (default 12)
      required: false

- id: camera_pan_stop
  label: Camera Pan Stop
  kind: action
  command: "camera {camera} pan stop"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16

- id: camera_tilt_up
  label: Camera Tilt Up
  kind: action
  command: "camera {camera} tilt up {speed}"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16
    - name: speed
      type: integer
      description: Optional speed 1-20 (default 10)
      required: false

- id: camera_tilt_down
  label: Camera Tilt Down
  kind: action
  command: "camera {camera} tilt down {speed}"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16
    - name: speed
      type: integer
      description: Optional speed 1-20 (default 10)
      required: false

- id: camera_tilt_stop
  label: Camera Tilt Stop
  kind: action
  command: "camera {camera} tilt stop"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16

- id: camera_zoom_in
  label: Camera Zoom In
  kind: action
  command: "camera {camera} zoom in {speed}"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16
    - name: speed
      type: integer
      description: Optional speed 1-7 (default 3)
      required: false

- id: camera_zoom_out
  label: Camera Zoom Out
  kind: action
  command: "camera {camera} zoom out {speed}"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16
    - name: speed
      type: integer
      description: Optional speed 1-7 (default 3)
      required: false

- id: camera_zoom_stop
  label: Camera Zoom Stop
  kind: action
  command: "camera {camera} zoom stop"
  params:
    - name: camera
      type: integer
      description: Camera number 1-16

- id: video_mute_pattern_set
  label: Video Mute Pattern Set
  kind: action
  command: "video mute pattern set {pattern}"
  params:
    - name: pattern
      type: enum
      values: [color_bars, black_screen]

- id: video_mute_pattern_get
  label: Video Mute Pattern Get
  kind: query
  command: "video mute pattern get"

- id: network_ping
  label: Network Ping
  kind: action
  command: "network ping {destination_ip}"
  params:
    - name: destination_ip
      type: string
      description: IPv4 address of target host
    - name: count
      type: integer
      description: Optional keyword arg `count <n>`; default 5 packets
      required: false
    - name: size
      type: integer
      description: Optional keyword arg `size <n>`; default 56 bytes
      required: false

- id: network_settings_get
  label: Network Settings Get
  kind: query
  command: "network settings get"

- id: streaming_info_dump
  label: Streaming Info Dump
  kind: query
  command: "streaming info dump"

- id: system_standby_get
  label: System Standby Get
  kind: query
  command: "system standby get"

- id: system_standby_on
  label: System Standby On
  kind: action
  command: "system standby on"

- id: system_standby_off
  label: System Standby Off
  kind: action
  command: "system standby off"

- id: system_standby_toggle
  label: System Standby Toggle
  kind: action
  command: "system standby toggle"

- id: system_reboot
  label: System Reboot
  kind: action
  command: "system reboot {seconds}"
  params:
    - name: seconds
      type: integer
      description: Optional delay in seconds before reboot
      required: false

- id: system_factory_reset_get
  label: System Factory Reset Get
  kind: query
  command: "system factory-reset get"

- id: system_factory_reset_on
  label: System Factory Reset On
  kind: action
  command: "system factory-reset on"

- id: system_factory_reset_off
  label: System Factory Reset Off
  kind: action
  command: "system factory-reset off"

- id: sleep
  label: Sleep
  kind: action
  command: "sleep {milliseconds}"
  params:
    - name: milliseconds
      type: integer
      description: Pause duration 1-10000 ms

- id: help
  label: Help
  kind: query
  command: "help"

- id: history
  label: History
  kind: query
  command: "history {limit}"
  params:
    - name: limit
      type: integer
      description: Optional max commands to return; also sets history buffer size
      required: false

- id: version
  label: Version
  kind: query
  command: "version"

- id: exit
  label: Exit
  kind: action
  command: "exit"
```

## Feedbacks
```yaml
- id: focus_mode
  type: enum
  values: [auto, manual]
  description: Current focus mode of a camera. Returned by `camera <n> focus mode get`.

- id: video_mute_pattern
  type: enum
  values: [color_bars, black_screen]
  description: Current HDMI mute pattern. Returned by `video mute pattern get`.

- id: network_settings
  type: object
  description: |
    Returned by `network settings get`. Fields:
    MAC Address, IP Address, Netmask, VLAN, Gateway.

- id: streaming_info
  type: object
  description: |
    Per-camera streaming metadata returned by `streaming info dump`.
    Outer key is camera IP. Inner fields: full_url, resolution, protocol,
    url, supported, port, dev_enabled, frame_rate, active, vid_input_ids.

- id: system_standby
  type: enum
  values: [on, off]
  description: Camera controller standby status. Returned by `system standby get`.

- id: factory_reset_status
  type: object
  description: |
    Returned by `system factory-reset get`. Two booleans:
    factory-reset (software), factory-reset (hardware).

- id: firmware_version
  type: object
  description: |
    Returned by `version`. Fields: Commit (git SHA), System Version
    (e.g. "PCC Premier 1.0.0").

- id: command_history
  type: array
  description: |
    Recent commands from the current Telnet session. Returned by `history`.
    Supports history expansion tokens !!, !<n>, !-<n>.
```

## Variables
```yaml
# UNRESOLVED: source documents no independent settable variables outside
# the parameterized action surface. No separate variable namespace.
[]
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. Device is
# polled/query-based over Telnet and RS-232.
[]
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences or macro
# definition mechanism on the device.
[]
```

## Safety
```yaml
[]
```

## Notes
Commands are line-terminated with carriage return (`\r`). The device echoes the trailing VT100 sequence `ESC[J` (hex `1B 5B 4A`) after each line; most terminal programs strip this. The `>` prefix in source examples is the terminal prompt, not part of the command payload. Responses end with `OK` (success) or `ERROR` (e.g. wrong argument order: `camera right pan` triggers a syntax error).

Use `[CTRL] 5` to clear the device's serial buffer. RS-232 cable run may be up to 500 ft (152.4 m) on Cat-5e or better with 568B termination. RJ-45 pinout uses pins 6 (GND), 7 (TXD to camera RXD), 8 (RXD from camera TXD); pins 1-5 are unused.

Question mark as a parameter (`camera 1 focus ?`) returns a help list for the current command context.

<!-- UNRESOLVED: Telnet auth — source states "Telnet sessions require the administrator account login" but does not document credential format, prompt sequence, or token mechanism. RS-232 session auth procedure not addressed. -->

<!-- UNRESOLVED: firmware compatibility range — `version` example shows "PCC Premier 1.0.0" as a return value, not a stated minimum required version. -->
```

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - fullcompass.com
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v1524000805/Resources/Vaddio/Control/Operation/342-1135-revc-pcc-premier-integrators-complete-guide.pdf
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - https://res.cloudinary.com/avd/image/upload/v134213940/Resources/Vaddio/Control/Operation/342-1135-revc-pcc-premier-integrators-complete-guide.pdf
retrieved_at: 2026-05-18T23:10:34.011Z
last_checked_at: 2026-06-02T07:06:48.554Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:48.554Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions match literal commands in source with correct syntax, parameters, and ranges. Transport parameters verbatim. Full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Telnet auth credentials, prompt sequence, and admin account format are mentioned in source but not specified"
- "source states \"Telnet sessions require the administrator account"
- "source documents no independent settable variables outside"
- "source describes no unsolicited notifications. Device is"
- "source does not document any multi-step sequences or macro"
- "Telnet auth — source states \"Telnet sessions require the administrator account login\" but does not document credential format, prompt sequence, or token mechanism. RS-232 session auth procedure not addressed."
- "firmware compatibility range — `version` example shows \"PCC Premier 1.0.0\" as a return value, not a stated minimum required version."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
