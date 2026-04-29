---
schema_version: ai4av-public-spec-v1
device_id: lumens/lc300
entity_id: lumens_lc300_media_processor_v2_0
spec_id: admin/lumens-lc300-media-processor-v2-0
revision: 1
author: admin
title: "Lumens LC300 Media Processor v2.0 Control Spec"
status: published
manufacturer: Lumens
manufacturer_key: lumens
model_family: LC300
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - LC300
    - LC300S
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lumens_lc300_media_processor_v2_0.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:07:31.358Z
retrieved_at: 2026-04-25T21:07:31.358Z
last_checked_at: 2026-04-25T21:07:31.358Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:07:31.358Z
  matched_actions: 43
  action_count: 43
  confidence: high
  summary: "All 43 spec actions matched verbatim command codes in source; transport port 5080 and baud 9600 verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Lumens LC300 Media Processor v2.0 Control Spec

## Summary
The Lumens LC300/LC300S is a media processor (media station) supporting both RS-232 serial and TCP/IP control. It provides recording, streaming, scene/layout management, audio routing, camera PTZ control, and event notification capabilities. The binary protocol uses a header/length/action/command framing with ACK/NAK responses.

<!-- UNRESOLVED: maximum number of concurrent TCP connections not stated -->
<!-- UNRESOLVED: command timing/latency constraints not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5080
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
# inferred from power standby/wake commands
- powerable
# inferred from multiple query commands returning state
- queryable
# inferred from channel source routing commands
- routable
# inferred from audio volume control (0-125 range)
- levelable
```

## Actions
```yaml
# --- Binary protocol framing ---
# Header: 0x55 | ExtHeader: 0xF0 | Length: 1 byte | Address: 1 byte (0x01-0xFF)
# Action: 0x73 (Set) or 0x67 (Get) | Command: 2 bytes | Params: n bytes | End: 0x0D
# Response Action: 0x06 (ACK) or 0x15 (NAK)

- id: power_off
  label: Power Off
  kind: action
  command_code: "0x50 0x57"
  params:
    - name: state
      type: integer
      values: [0]
      description: "0 = Power off (Power on NOT supported due to hardware limitation)"

- id: set_standby
  label: Set Standby
  kind: action
  command_code: "0x53 0x52"
  params:
    - name: mode
      type: integer
      values: [1, 2]
      description: "1 = Standby, 2 = Wake up (only when in Standby)"

- id: record_start
  label: Start Recording
  kind: action
  command_code: "0x52 0x43"
  params: []

- id: record_pause
  label: Pause Recording
  kind: action
  command_code: "0x50 0x53"
  params: []

- id: record_resume
  label: Resume Recording
  kind: action
  command_code: "0x52 0x50"
  params: []

- id: record_stop
  label: Stop Recording
  kind: action
  command_code: "0x53 0x50"
  params: []

- id: set_layout
  label: Set Layout
  kind: action
  command_code: "0x4C 0x4F"
  params:
    - name: layout_id
      type: integer
      range: "0x01-0x12"
      description: "Layout ID (1-18)"

- id: set_background
  label: Set Background
  kind: action
  command_code: "0x42 0x47"
  params:
    - name: background_id
      type: integer
      range: "0x00-0x09"
      description: "Background ID (0 = off, 1-9 = backgrounds)"

- id: set_overlay
  label: Set Overlay
  kind: action
  command_code: "0x4F 0x4C"
  params:
    - name: overlay_id
      type: integer
      range: "0x00-0x1E"
      description: "Overlay ID (0 = off, 1-30 = overlays)"

- id: set_scene
  label: Set Scene
  kind: action
  command_code: "0x54 0x45"
  params:
    - name: scene_id
      type: integer
      range: "0x01-0x1E"
      description: "Scene ID (1-30)"

- id: set_video_source
  label: Set Video Source
  kind: action
  command_code: "0x43 0x48"
  params:
    - name: channel
      type: integer
      values: [1, 2, 3, 4]
      description: "Channel number (1-4)"
    - name: source_id
      type: integer
      range: "0x01-0xFF"
      description: "ID of channel source"

- id: set_macro
  label: Set Macro
  kind: action
  command_code: "0x4D 0x43"
  params:
    - name: macro_id
      type: integer
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      description: "Macro number (1-9) - scene and camera preset control"

- id: set_intermission_live
  label: Set Intermission/Live
  kind: action
  command_code: "0x49 0x4C"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: "0 = Live mode, 1 = Intermission mode"

- id: set_audio_vol_input
  label: Set Audio Input Volume
  kind: action
  command_code: "0x41 0x56"
  params:
    - name: direction
      type: string
      values: ["I"]
      description: "Input direction"
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5, 6, 7, 8]
      description: "Input number (1-8)"
    - name: volume
      type: integer
      range: "0x00-0x7D"
      description: "Audio volume (0-125)"

- id: set_audio_vol_output
  label: Set Audio Output Volume
  kind: action
  command_code: "0x41 0x56"
  params:
    - name: direction
      type: string
      values: ["O"]
      description: "Output direction"
    - name: output
      type: integer
      values: [1, 2, 3, 4]
      description: "1 = PGM Level, 2 = PGM HDMI, 3 = Multiview HDMI, 4 = Line Out & XLR"
    - name: volume
      type: integer
      range: "0x00-0x7D"
      description: "Audio volume (0-125)"

- id: set_audio_mute_input
  label: Set Audio Input Mute
  kind: action
  command_code: "0x41 0x4D"
  params:
    - name: direction
      type: string
      values: ["I"]
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5, 6, 7, 8]
    - name: mute
      type: integer
      values: [0, 1]
      description: "0 = Unmute, 1 = Mute"

- id: set_audio_mute_output
  label: Set Audio Output Mute
  kind: action
  command_code: "0x41 0x4D"
  params:
    - name: direction
      type: string
      values: ["O"]
    - name: output
      type: integer
      values: [1, 2, 3, 4]
      description: "1 = PGM Level, 2 = PGM HDMI, 3 = Multiview HDMI, 4 = Line Out & XLR"
    - name: mute
      type: integer
      values: [0, 1]
      description: "0 = Unmute, 1 = Mute"

- id: set_audio_type_input
  label: Set Audio Input Type
  kind: action
  command_code: "0x41 0x54"
  params:
    - name: direction
      type: string
      values: ["I"]
    - name: input
      type: integer
      values: [1, 2, 3, 4, 5, 6, 7, 8]
    - name: audio_type
      type: integer
      values: [1, 7, 8, 58, 65]
      description: "1=Line in 1, 7=XLR-Line, 8=XLR-Mic, 58=Follow, 65=Line in 2"

- id: set_xlr_channel
  label: Set XLR Channel Mode
  kind: action
  command_code: "0x58 0x43"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: "0 = Stereo, 1 = Mono"

- id: set_xlr_power
  label: Set XLR Power
  kind: action
  command_code: "0x58 0x50"
  params:
    - name: power
      type: integer
      values: [0, 1]
      description: "0 = XLR power off, 1 = XLR power on"

- id: set_stream
  label: Set Stream Start/Stop
  kind: action
  command_code: "0x53 0x43"
  params:
    - name: stream_id
      type: integer
      description: "Stream number (1-based, range based on web setting)"
    - name: action_type
      type: integer
      values: [1, 2]
      description: "1 = Stop stream, 2 = Start stream"

- id: set_camera_preset
  label: Set Camera Preset
  kind: action
  command_code: "0x43 0x50"
  params:
    - name: channel
      type: integer
      values: [1, 2, 3, 4]
    - name: preset_id
      type: integer
      range: "0x01-0x09"
      description: "Preset ID (1-9)"

- id: set_camera_save_preset
  label: Save Camera Preset
  kind: action
  command_code: "0x43 0x53"
  params:
    - name: channel
      type: integer
      values: [1, 2, 3, 4]
    - name: preset_id
      type: integer
      range: "0x01-0x09"
      description: "Preset ID (1-9)"

- id: set_camera_move
  label: Set Camera Move
  kind: action
  command_code: "0x43 0x4D"
  params:
    - name: direction
      type: string
      values: ["S", "U", "D", "L", "R"]
      description: "S=Stop, U=Up, D=Down, L=Left, R=Right"
    - name: channel
      type: integer
      values: [1, 2, 3, 4]
    - name: speed
      type: integer
      range: "0x01-0x18"
      description: "Speed percentage (1-24). Dispensable for stop command."

- id: set_camera_zoom
  label: Set Camera Zoom
  kind: action
  command_code: "0x43 0x5A"
  params:
    - name: direction
      type: string
      values: ["S", "I", "O"]
      description: "S=Stop, I=Zoom In, O=Zoom Out"
    - name: channel
      type: integer
      values: [1, 2, 3, 4]
    - name: speed
      type: integer
      range: "0x01-0x07"
      description: "Speed percentage (1-7). Dispensable for stop command."

- id: set_camera_tracking
  label: Set Camera Tracking
  kind: action
  command_code: "0x43 0x52"
  params:
    - name: channel
      type: integer
      values: [1, 2, 3, 4]
    - name: state
      type: integer
      values: [0, 1]
      description: "0 = ON, 1 = OFF"

- id: snapshot
  label: Insert Snapshot
  kind: action
  command_code: "0x53 0x53"
  params: []

- id: bookmark
  label: Insert Bookmark
  kind: action
  command_code: "0x42 0x4D"
  params: []

- id: backup_usb
  label: Backup to USB
  kind: action
  command_code: "0x42 0x55"
  params:
    - name: action_type
      type: integer
      values: [0, 1]
      description: "0 = Start backup, 1 = Stop backup"
```

## Feedbacks
```yaml
- id: record_state
  type: enum
  command_code: "0x53 0x54"
  values: [uninitialized, ready, stopped, recording, paused, waiting, stopping, standby]
  description: "System/recording state query"

- id: layout
  type: integer
  command_code: "0x4C 0x4F"
  range: "0x01-0x12"
  description: "Current layout ID"

- id: background
  type: integer
  command_code: "0x42 0x47"
  range: "0x00-0x09"
  description: "Current background ID (0 = off)"

- id: overlay
  type: integer
  command_code: "0x4F 0x4C"
  range: "0x00-0x09"
  description: "Current overlay ID (0 = off)"

- id: video_source_count
  type: integer
  command_code: "0x43 0x48"
  description: "Total number of sources available for a channel (param: channel 1-4)"

- id: current_video_source
  type: integer
  command_code: "0x43 0x55"
  description: "Current source index for a channel (param: channel 1-4)"

- id: audio_vol_input
  type: integer
  command_code: "0x41 0x56"
  range: "0x00-0x7D"
  description: "Audio input volume (0-125). Params: I + input number (1-8)"

- id: audio_vol_output
  type: integer
  command_code: "0x41 0x56"
  range: "0x00-0x7D"
  description: "Audio output volume (0-125). Params: O + output number (1-4)"

- id: audio_mute_input
  type: enum
  command_code: "0x41 0x4D"
  values: [unmuted, muted]
  description: "Audio input mute state. Params: I + input number (1-8)"

- id: audio_mute_output
  type: enum
  command_code: "0x41 0x4D"
  values: [unmuted, muted]
  description: "Audio output mute state. Params: O + output number (1-4)"

- id: audio_type_input
  type: enum
  command_code: "0x41 0x54"
  values: [line_in_1, xlr_line, xlr_mic, follow, line_in_2]
  description: "Audio input type. Params: I + input number (1-6, 7-8 not yet supported)"

- id: xlr_channel_mode
  type: enum
  command_code: "0x58 0x43"
  values: [stereo, mono]

- id: xlr_power_state
  type: enum
  command_code: "0x58 0x50"
  values: [off, on]

- id: stream_state
  type: enum
  command_code: "0x53 0x43"
  values: [sync, ready, streaming]
  description: "Stream state for a given stream ID (param: stream number)"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable variables distinct from actions found in source
```

## Events
```yaml
- id: media_state_notification
  type: unsolicited
  header: "0x23"
  event_code: "0x53 0x54"
  params:
    - name: state
      type: enum
      values: [uninitialized, ready, stopped, recording, paused, waiting, stopping, standby, reboot]
      description: "System state change notification. Reboot only available when state was standby."
  note: "Sent over TCP when connection is kept alive. Only one TCP connection at a time - new connection replaces old."
```

## Macros
```yaml
# UNRESOLVED: macro definitions (MC command triggers macro 1-9 but contents are user-defined, not documented)
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Commands are not accepted during media station boot-up"
  - "In Standby mode, only 'Get state' and 'Set Standby/Wake up' commands are accepted"
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source beyond boot-up and standby restrictions
```

## Notes
- Binary protocol: all commands use framing `[0x55][0xF0][length][address][action][cmd_hi cmd_lo][params][0x0D]`. Action `0x73` = Set, `0x67` = Get. ACK = `0x06`, NAK = `0x15`.
- Address field range is `0x01`–`0xFF` (0 reserved), but source notes "reserved for future use, don't care."
- Power ON is NOT supported via protocol (hardware limitation) — only Power Off via command `PW` param 0.
- TCP event notifications: if the TCP connection is not closed by the client, the connection persists and event notifications are sent until a new connection is established (only one client at a time).
- Event notifications use a different framing: `[0x23][event_code][params][0x0D]`.
- Audio input types per channel vary: inputs 1-4 support only "Follow" (0x3A), input 5 supports "XLR-Line" and "XLR-Mic", input 6 supports "Line in 1" and "Line in 2". Inputs 7-8 not yet supported.
- Camera tracking command parameter is inverted: value 0 = ON, 1 = OFF.

<!-- UNRESOLVED: maximum number of TCP connections not stated (source implies 1) -->
<!-- UNRESOLVED: command execution timing/latency constraints not stated -->
<!-- UNRESOLVED: stream count upper bound not stated (web setting dependent) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lumens_lc300_media_processor_v2_0.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:07:31.358Z
retrieved_at: 2026-04-25T21:07:31.358Z
last_checked_at: 2026-04-25T21:07:31.358Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:07:31.358Z
matched_actions: 43
action_count: 43
confidence: high
summary: "All 43 spec actions matched verbatim command codes in source; transport port 5080 and baud 9600 verified."
```

## Known Gaps

```yaml
[]
```
