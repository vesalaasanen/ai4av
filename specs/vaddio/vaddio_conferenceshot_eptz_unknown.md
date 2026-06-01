---
spec_id: admin/vaddio-conferenceshot-eptz
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio ConferenceSHOT ePTZ Control Spec"
manufacturer: Vaddio
model_family: "ConferenceSHOT ePTZ"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "ConferenceSHOT ePTZ"
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
last_checked_at: 2026-05-19T17:11:22.436Z
generated_at: 2026-05-19T17:11:22.436Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-19T17:11:22.436Z
  matched_actions: 40
  action_count: 40
  confidence: high
  summary: "All 40 spec actions matched cleanly in source with correct transport parameters; spec fully represents source command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Vaddio ConferenceSHOT ePTZ Control Spec

## Summary
PTZ camera with Telnet serial command API over TCP/IP. Supports pan/tilt/zoom, auto-framing, preset recall/store, CCU color controls, audio channel management, video mute, IP streaming, and system maintenance. Auth via admin account on port 23.

<!-- UNRESOLVED: serial RS-232 not supported; only Telnet/TCP -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: login
  username: admin
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: camera_home
  label: Camera Home
  kind: action
  params: []

- id: camera_pan_left
  label: Pan Left
  kind: action
  params:
    - name: speed
      type: integer
      description: Optional pan speed (integer)
      required: false
    - name: no_wait
      type: flag
      description: Return prompt immediately
      required: false

- id: camera_pan_right
  label: Pan Right
  kind: action
  params:
    - name: speed
      type: integer
      description: Optional pan speed (integer)
      required: false
    - name: no_wait
      type: flag
      description: Return prompt immediately
      required: false

- id: camera_pan_stop
  label: Pan Stop
  kind: action
  params: []

- id: camera_pan_set
  label: Pan Set Position
  kind: action
  params:
    - name: position
      type: integer
      description: Pixel column to center on

- id: camera_tilt_up
  label: Tilt Up
  kind: action
  params:
    - name: speed
      type: integer
      description: Optional tilt speed (integer)
      required: false
    - name: no_wait
      type: flag
      description: Return prompt immediately
      required: false

- id: camera_tilt_down
  label: Tilt Down
  kind: action
  params:
    - name: speed
      type: integer
      description: Optional tilt speed (integer)
      required: false
    - name: no_wait
      type: flag
      description: Return prompt immediately
      required: false

- id: camera_tilt_stop
  label: Tilt Stop
  kind: action
  params: []

- id: camera_tilt_set
  label: Tilt Set Position
  kind: action
  params:
    - name: position
      type: integer
      description: Pixel row to center on

- id: camera_zoom_in
  label: Zoom In
  kind: action
  params:
    - name: speed
      type: integer
      description: Optional zoom speed (1-7)
      required: false
    - name: no_wait
      type: flag
      description: Return prompt immediately
      required: false

- id: camera_zoom_out
  label: Zoom Out
  kind: action
  params:
    - name: speed
      type: integer
      description: Optional zoom speed (1-7)
      required: false
    - name: no_wait
      type: flag
      description: Return prompt immediately
      required: false

- id: camera_zoom_stop
  label: Zoom Stop
  kind: action
  params: []

- id: camera_zoom_set
  label: Zoom Set Position
  kind: action
  params:
    - name: position
      type: number
      description: Zoom level (floating-point)
    - name: speed
      type: integer
      description: Optional speed (integer)
      required: false
    - name: no_wait
      type: flag
      description: Return prompt immediately
      required: false

- id: camera_ptz_position
  label: PTZ Position
  kind: action
  params:
    - name: pan
      type: integer
      description: Pixel column to center on
    - name: tilt
      type: integer
      description: Pixel row to center on
    - name: zoom
      type: number
      description: Zoom level (floating-point)
    - name: speed
      type: integer
      description: Optional speed (integer)
      required: false
    - name: no_wait
      type: flag
      description: Return prompt immediately
      required: false

- id: camera_preset_recall
  label: Preset Recall
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-16)

- id: camera_preset_store
  label: Preset Store
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-16)
    - name: tri_sync
      type: integer
      description: Optional Tri-Sync speed (1-24)
      required: false
    - name: save_ccu
      type: flag
      description: Save CCU color settings with preset
      required: false

- id: camera_ccu_set
  label: CCU Set
  kind: action
  params:
    - name: param
      type: string
      description: CCU parameter name
    - name: value
      type: integer
      description: CCU value (integer)

- id: camera_led
  label: Camera LED
  kind: action
  params:
    - name: state
      type: string
      enum: [off, on]

- id: video_mute
  label: Video Mute
  kind: action
  params:
    - name: state
      type: string
      enum: [off, on, toggle]

- id: camera_standby
  label: Camera Standby
  kind: action
  params:
    - name: state
      type: string
      enum: [off, on, toggle]

- id: audio_volume_up
  label: Audio Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: Audio channel name
    - name: amount
      type: integer
      description: Volume step (optional, default 1)
      required: false

- id: audio_volume_down
  label: Audio Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: Audio channel name
    - name: amount
      type: integer
      description: Volume step (optional, default 1)
      required: false

- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: channel
      type: string
      description: Audio channel name (or master for all)
    - name: state
      type: string
      enum: [on, off, toggle]

- id: audio_echo_cancel
  label: Audio Echo Cancel
  kind: action
  params:
    - name: channel
      type: string
      description: Audio channel name
    - name: state
      type: string
      enum: [on, off, toggle]

- id: autoframer_enabled
  label: Autoframer Enabled
  kind: action
  params:
    - name: state
      type: string
      enum: [off, on, toggle]

- id: autoframer_paused
  label: Autoframer Paused
  kind: action
  params:
    - name: state
      type: string
      enum: [off, on, toggle]

- id: autoframer_default_wide
  label: Autoframer Default Wide
  kind: action
  params:
    - name: state
      type: string
      enum: [off, on]

- id: autoframer_buffer_zone
  label: Autoframer Buffer Zone
  kind: action
  params:
    - name: value
      type: integer
      description: Buffer zone size

- id: autoframer_shot_margin
  label: Autoframer Shot Margin
  kind: action
  params:
    - name: value
      type: integer
      description: Shot margin size

- id: autoframer_sensitivity
  label: Autoframer Sensitivity
  kind: action
  params:
    - name: value
      type: integer
      description: Sensitivity value (0-100)

- id: autoframer_responsiveness
  label: Autoframer Responsiveness
  kind: action
  params:
    - name: value
      type: integer
      description: Responsiveness value (0-100)

- id: autoframer_initial_persistence
  label: Autoframer Initial Persistence
  kind: action
  params:
    - name: value
      type: integer
      description: Initial persistence value

- id: autoframer_persistence
  label: Autoframer Persistence
  kind: action
  params:
    - name: value
      type: integer
      description: Persistence value

- id: autoframer_max_electronic_zoom
  label: Autoframer Max Electronic Zoom
  kind: action
  params:
    - name: value
      type: number
      description: Maximum electronic zoom value

- id: autoframer_noise_threshold
  label: Autoframer Noise Threshold
  kind: action
  params:
    - name: value
      type: integer
      description: Noise threshold value

- id: autoframer_tri_sync_motion
  label: Autoframer Tri-Sync Motion
  kind: action
  params:
    - name: state
      type: string
      enum: [off, on, toggle]

- id: autoframer_forced_wait_time
  label: Autoframer Forced Wait Time
  kind: action
  params:
    - name: value
      type: integer
      description: Forced wait time value

- id: streaming_ip_enable
  label: Streaming IP Enable
  kind: action
  params:
    - name: state
      type: string
      enum: [on, off, toggle]

- id: system_reboot
  label: System Reboot
  kind: action
  params:
    - name: delay
      type: integer
      description: Optional delay in seconds
      required: false

- id: system_factory_reset
  label: System Factory Reset
  kind: action
  params:
    - name: state
      type: string
      enum: [on, off]
```

## Feedbacks
```yaml
- id: camera_pan_position
  label: Pan Position
  type: integer
  description: Current pan pixel column

- id: camera_tilt_position
  label: Tilt Position
  type: integer
  description: Current tilt pixel row

- id: camera_zoom_position
  label: Zoom Position
  type: number
  description: Current zoom level

- id: camera_led_state
  label: Camera LED State
  type: enum
  values: [on, off]

- id: video_mute_state
  label: Video Mute State
  type: enum
  values: [on, off]

- id: camera_standby_state
  label: Camera Standby State
  type: enum
  values: [on, off]

- id: audio_volume_state
  label: Audio Volume
  type: number
  description: Current volume in dB

- id: audio_mute_state
  label: Audio Mute State
  type: enum
  values: [on, off]

- id: audio_echo_cancel_state
  label: Audio Echo Cancel State
  type: enum
  values: [on, off]

- id: autoframer_enabled_state
  label: Autoframer Enabled State
  type: boolean

- id: autoframer_paused_state
  label: Autoframer Paused State
  type: boolean

- id: autoframer_default_wide_state
  label: Autoframer Default Wide State
  type: boolean

- id: autoframer_buffer_zone_value
  label: Autoframer Buffer Zone
  type: integer

- id: autoframer_shot_margin_value
  label: Autoframer Shot Margin
  type: integer

- id: autoframer_sensitivity_value
  label: Autoframer Sensitivity
  type: integer

- id: autoframer_responsiveness_value
  label: Autoframer Responsiveness
  type: integer

- id: autoframer_initial_persistence_value
  label: Autoframer Initial Persistence
  type: integer

- id: autoframer_persistence_value
  label: Autoframer Persistence
  type: integer

- id: autoframer_max_electronic_zoom_value
  label: Autoframer Max Electronic Zoom
  type: number

- id: autoframer_noise_threshold_value
  label: Autoframer Noise Threshold
  type: integer

- id: autoframer_tri_sync_motion_state
  label: Autoframer Tri-Sync Motion State
  type: enum
  values: [on, off]

- id: autoframer_forced_wait_time_value
  label: Autoframer Forced Wait Time
  type: integer

- id: network_settings
  label: Network Settings
  type: object
  properties:
    - name: mac_address
      type: string
    - name: ip_address
      type: string
    - name: netmask
      type: string
    - name: gateway
      type: string
    - name: hostname
      type: string

- id: streaming_settings
  label: Streaming Settings
  type: object
  properties:
    - name: ip_streaming_enabled
      type: boolean
    - name: ip_protocol
      type: string
    - name: ip_rtsp_port
      type: integer
    - name: ip_rtmp_port
      type: integer
    - name: ip_video_quality
      type: string
    - name: ip_resolution
      type: string
    - name: ip_rtsp_url
      type: string

- id: system_version
  label: System Version
  type: object
  properties:
    - name: system
      type: string
    - name: sensor
      type: string
    - name: audio
      type: string

- id: factory_reset_state
  label: Factory Reset State
  type: enum
  values: [on, off]
```

## Variables
```yaml
# All settable CCU parameters are Variables
- id: ccu_auto_white_balance
  label: CCU Auto White Balance
  type: boolean

- id: ccu_red_gain
  label: CCU Red Gain
  type: integer

- id: ccu_blue_gain
  label: CCU Blue Gain
  type: integer

- id: ccu_auto_iris
  label: CCU Auto Iris
  type: boolean

- id: ccu_iris
  label: CCU Iris
  type: integer

- id: ccu_gain
  label: CCU Gain
  type: integer

- id: ccu_detail
  label: CCU Detail
  type: integer

- id: ccu_chroma
  label: CCU Chroma
  type: integer

- id: ccu_gamma
  label: CCU Gamma
  type: integer

- id: streaming_ip_enabled
  label: IP Streaming Enabled
  type: boolean
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Auto-framing pauses automatically when camera receives pan, tilt, zoom, or preset recall command from any source
  - Factory reset takes effect on next reboot; does not occur immediately
```

## Notes
Telnet session: use `?` to discover available commands and valid parameter ranges. `CTRL-5` clears the serial buffer. Command prompt is `>`. Session management commands: `help`, `history`, `exit`. Login required with admin account. Pan/tilt range varies by zoom level. Zoom position is floating-point, range varies by model. Query out-of-range values to discover valid ranges — firmware updates may add commands or change ranges.
<!-- UNRESOLVED: serial RS-232 config not supported; TCP only -->
<!-- UNRESOLVED: baud rate, data bits, parity, stop bits not applicable (Telnet only) -->
<!-- UNRESOLVED: HTTP/REST API not documented in source -->

## Provenance

```yaml
source_domains:
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/21194-VaddioClearVIEWHDUSBPTZincl9986990000Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-05-19T17:11:22.436Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-19T17:11:22.436Z
matched_actions: 40
action_count: 40
confidence: high
summary: "All 40 spec actions matched cleanly in source with correct transport parameters; spec fully represents source command catalogue."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
