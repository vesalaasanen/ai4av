---
spec_id: admin/vaddio-av-bridge-2x1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio AV Bridge 2x1 Control Spec"
manufacturer: Vaddio
model_family: "AV Bridge 2x1"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "AV Bridge 2x1"
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
last_checked_at: 2026-05-19T17:11:21.700Z
generated_at: 2026-05-19T17:11:21.700Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-19T17:11:21.700Z
  matched_actions: 34
  action_count: 34
  confidence: high
  summary: "All 34 spec actions found in source with matching documentation; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Vaddio AV Bridge 2x1 Control Spec

## Summary
The AV Bridge 2x1 is an AV-to-USB bridge device enabling integration of professional AV equipment with software conferencing platforms. Control is available via RS-232 serial and TCP/IP (Telnet/VT100). The serial API supports audio management, camera control, video routing, streaming configuration, and system maintenance.

<!-- UNRESOLVED: Dante control commands not documented in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # Telnet port stated in source
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: null  # UNRESOLVED: source mentions "admin account" login but does not specify password
```

## Traits
```yaml
- powerable       # inferred: system standby, camera standby commands present
- routable        # inferred: audio route, video program source commands present
- queryable       # inferred: get variants for volume, mute, route, standby, streaming settings present
- levelable       # inferred: volume set, crosspoint-gain set, CCU parameter commands present
```

## Actions
```yaml
- id: audio_volume
  label: Audio Volume
  kind: action
  params:
    - name: channel
      type: enum
      values:
        - master
        - line_in_1
        - line_in_2
        - usb3_playback_left
        - usb3_playback_right
        - hdmi_in_<1..2>_left
        - hdmi_in_<1..2>_right
        - dante_in_<1..4>
        - line_out_1
        - line_out_2
        - usb3_record_left
        - usb3_record_right
        - ip_out_left
        - ip_out_right
        - hdmi_out_left
        - hdmi_out_right
        - dante_out_<1..4>
    - name: operation
      type: enum
      values: [get, up, down, set]
    - name: level
      type: number
      description: Volume level in dB (required for set operation)

- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: channel
      type: enum
      values:
        - master
        - line_in_1
        - line_in_2
        - usb3_playback_left
        - usb3_playback_right
        - hdmi_in_<1..2>_left
        - hdmi_in_<1..2>_right
        - dante_in_<1..4>
        - line_out_1
        - line_out_2
        - usb3_record_left
        - usb3_record_right
        - ip_out_left
        - ip_out_right
        - hdmi_out_left
        - hdmi_out_right
        - dante_out_<1..4>
    - name: operation
      type: enum
      values: [get, on, off, toggle]

- id: audio_route
  label: Audio Route
  kind: action
  params:
    - name: output
      type: enum
      values:
        - line_out_1
        - line_out_2
        - usb3_record_left
        - usb3_record_right
        - ip_out_left
        - ip_out_right
        - hdmi_out_left
        - hdmi_out_right
        - dante_out_<1..4>
    - name: operation
      type: enum
      values: [get, set]
    - name: inputs
      type: string
      description: Input source(s) to route (for set operation)

- id: audio_crosspoint_gain
  label: Audio Crosspoint Gain
  kind: action
  params:
    - name: output
      type: enum
      values:
        - line_out_1
        - line_out_2
        - usb3_record_left
        - usb3_record_right
        - ip_out_left
        - ip_out_right
        - hdmi_out_left
        - hdmi_out_right
        - dante_out_<1..4>
    - name: input
      type: enum
      values:
        - line_in_1
        - line_in_2
        - usb3_playback_left
        - usb3_playback_right
        - hdmi_in_<1..2>_left
        - hdmi_in_<1..2>_right
        - dante_in_<1..4>
    - name: operation
      type: enum
      values: [get, set]
    - name: level
      type: number
      description: Gain in dB (-12.00 to 12.00)

- id: camera_home
  label: Camera Home
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1 or 2)

- id: camera_pan
  label: Camera Pan
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1 or 2)
    - name: direction
      type: enum
      values: [left, right, stop]
    - name: speed
      type: integer
      description: Optional pan speed

- id: camera_tilt
  label: Camera Tilt
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1 or 2)
    - name: direction
      type: enum
      values: [up, down, stop]
    - name: speed
      type: integer
      description: Optional tilt speed

- id: camera_zoom
  label: Camera Zoom
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1 or 2)
    - name: direction
      type: enum
      values: [in, out, stop]
    - name: speed
      type: integer
      description: Optional zoom speed

- id: camera_focus
  label: Camera Focus
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1 or 2)
    - name: operation
      type: enum
      values: [mode, near, far, stop]
    - name: mode_value
      type: enum
      values: [get, auto, manual]
      description: For mode operation
    - name: speed
      type: integer
      description: For near/far operations

- id: camera_preset
  label: Camera Preset
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1 or 2)
    - name: operation
      type: enum
      values: [recall, store]
    - name: preset
      type: integer
      description: Preset number (1 to 16)
    - name: tri_sync
      type: integer
      description: Optional tri-sync speed (1 to 24)
    - name: save_ccu
      type: boolean
      description: Optional, save CCU settings with preset

- id: camera_ccu_get
  label: Camera CCU Get
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1 or 2)
    - name: param
      type: enum
      values:
        - auto_iris
        - iris
        - gain
        - backlight_compensation
        - wide_dynamic_range
        - detail
        - auto_white_balance
        - red_gain
        - blue_gain
        - chroma
        - gamma
        - all

- id: camera_ccu_set
  label: Camera CCU Set
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1 or 2)
    - name: param
      type: enum
      values:
        - auto_iris
        - iris
        - gain
        - backlight_compensation
        - wide_dynamic_range
        - detail
        - auto_white_balance
        - red_gain
        - blue_gain
        - chroma
        - gamma
    - name: value
      type: mixed
      description: Value to set (boolean or integer depending on param)

- id: camera_ccu_scene
  label: Camera CCU Scene
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1 or 2)
    - name: operation
      type: enum
      values: [recall, store]
    - name: scene_type
      type: enum
      values: [factory, custom]
    - name: scene_num
      type: integer
      description: Scene number (factory 1-6, custom 1-3)

- id: camera_standby
  label: Camera Standby
  kind: action
  params:
    - name: camera
      type: integer
      description: Camera number (1 or 2)
    - name: operation
      type: enum
      values: [get, on, off, toggle]

- id: video_mute
  label: Video Mute
  kind: action
  params:
    - name: channel
      type: enum
      values: [master, input1, input2]
    - name: operation
      type: enum
      values: [get, on, off, toggle]

- id: video_program_source
  label: Video Program Source
  kind: action
  params:
    - name: operation
      type: enum
      values: [get, set]
    - name: source
      type: enum
      values: [input1, input2]
      description: For set operation

- id: video_program_pip
  label: Video Program PIP
  kind: action
  params:
    - name: operation
      type: enum
      values: [get, on, off, toggle, layout]
    - name: layout
      type: enum
      values:
        - upper_right
        - lower_right
        - lower_left
        - upper_left
        - top_bottom
        - left_right
      description: For layout operation

- id: video_type
  label: Video Type
  kind: action
  params:
    - name: channel
      type: enum
      values: [input1, input2]
    - name: operation
      type: enum
      values: [get, set]
    - name: type
      type: enum
      values: [camera, video]
      description: For set operation

- id: graphics_enable
  label: Graphics Enable
  kind: action
  params:
    - name: channel
      type: enum
      values: [program, preview]
    - name: layer
      type: enum
      values: [layer1, layer2]
    - name: operation
      type: enum
      values: [get, on, off, toggle]

- id: graphics_source
  label: Graphics Source
  kind: action
  params:
    - name: channel
      type: enum
      values: [program, preview]
    - name: layer
      type: enum
      values: [layer1, layer2]
    - name: operation
      type: enum
      values: [get, set]
    - name: selection
      type: mixed
      description: Source for set (input7, input8, or filename)

- id: camera_comm_host
  label: Camera Comm Host
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1 to 4)
    - name: operation
      type: enum
      values: [get, set, unset]
    - name: host
      type: string
      description: IP address or hostname (for set operation)

- id: streaming_ip_enable
  label: Streaming IP Enable
  kind: action
  params:
    - name: operation
      type: enum
      values: [get, on, off, toggle]

- id: streaming_settings_get
  label: Streaming Settings Get
  kind: action
  params: []

- id: network_settings_get
  label: Network Settings Get
  kind: action
  params: []

- id: network_ping
  label: Network Ping
  kind: action
  params:
    - name: destination_ip
      type: string
      description: Target IP address or hostname
    - name: count
      type: integer
      description: Optional packet count
    - name: size
      type: integer
      description: Optional packet size

- id: trigger
  label: Trigger
  kind: action
  params:
    - name: trigger_num
      type: integer
      description: Trigger index (1 to 50)
    - name: operation
      type: enum
      values: [on, off, block]
    - name: seconds
      type: integer
      description: Block duration in seconds (for block operation)

- id: sleep
  label: Sleep
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: Milliseconds to pause (1 to 10000)

- id: system_standby
  label: System Standby
  kind: action
  params:
    - name: operation
      type: enum
      values: [get, on, off, toggle]

- id: system_reboot
  label: System Reboot
  kind: action
  params:
    - name: seconds
      type: integer
      description: Optional delay in seconds

- id: system_factory_reset
  label: System Factory Reset
  kind: action
  params:
    - name: operation
      type: enum
      values: [get, on, off]

- id: version
  label: Version
  kind: action
  params: []

- id: history
  label: History
  kind: action
  params:
    - name: limit
      type: integer
      description: Optional maximum number of commands to return

- id: help
  label: Help
  kind: action
  params: []

- id: exit
  label: Exit
  kind: action
  params: []
```

## Feedbacks
```yaml
# Responses are returned as ASCII text blocks terminated with "OK" and ">" prompt
# UNRESOLVED: structured response schemas not explicitly defined in source
```

## Variables
```yaml
# CCU parameters (read/write via camera ccu get/set):
#   - auto_iris: boolean
#   - iris: integer (range varies by camera)
#   - gain: integer (range varies by camera)
#   - backlight_compensation: boolean
#   - wide_dynamic_range: boolean
#   - detail: integer (range varies by camera)
#   - auto_white_balance: boolean
#   - red_gain: integer (range varies by camera)
#   - blue_gain: integer (range varies by camera)
#   - chroma: integer (range varies by camera)
#   - gamma: integer (range varies by camera)

# Streaming settings (read via streaming settings get):
#   - IP Custom_Frame_Rate: integer
#   - IP Custom_Resolution: string
#   - IP Enabled: boolean
#   - IP MTU: integer
#   - IP Port: integer
#   - IP Preset_Quality: string
#   - IP Preset_Resolution: string
#   - IP Protocol: string (RTSP or RTMP)
#   - IP URL: string
#   - IP Video_Mode: string
#   - USB Active: boolean
#   - USB Device: string
#   - USB Frame_Rate: integer
#   - USB Resolution: string
#   - USB Version: string

# Network settings (read via network settings get):
#   - Name: string
#   - MAC Address: string
#   - IP Address: string
#   - Netmask: string
#   - VLAN: string
#   - Gateway: string
#   - Hostname: string
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented in source
```

## Macros
```yaml
# Multi-step sequences via trigger command (triggers 1-50)
# Triggers are defined via web interface, executed via trigger command
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings and interlock procedures not found in source
```

## Notes
- Command prompt is `>` character
- `CTRL-5` clears the serial buffer
- `?` as command/parameter displays available subcommands
- Telnet requires VT100 terminal emulation and admin login
- Audio route and audio crosspoint-gain commands do not support master channel
- Camera pan/tilt/zoom/focus require PTZ-capable cameras
- Tri-sync motion only available on cameras with that feature
- Factory reset does not affect Dante Controller settings
- Firmware updates may add command parameters not in manual — use `?` to discover
<!-- UNRESOLVED: Dante control commands not covered in source -->
<!-- UNRESOLVED: telnet session encryption (SSH vs plain Telnet) not specified -->

## Provenance

```yaml
source_domains:
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/21194-VaddioClearVIEWHDUSBPTZincl9986990000Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-05-19T17:11:21.700Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-19T17:11:21.700Z
matched_actions: 34
action_count: 34
confidence: high
summary: "All 34 spec actions found in source with matching documentation; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
