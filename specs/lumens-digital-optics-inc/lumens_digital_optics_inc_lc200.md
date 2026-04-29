---
schema_version: ai4av-public-spec-v1
device_id: lumens-digital-optics-inc/lc200
entity_id: lumens_digital_optics_inc_lc200
spec_id: admin/lumens_digital_optics_inc_lc200
revision: 1
author: admin
title: "Lumens LC200 Control Spec"
status: published
manufacturer: "Lumens Digital Optics Inc"
manufacturer_key: lumens-digital-optics-inc
model_family: LC200
aliases: []
compatible_with:
  manufacturers:
    - "Lumens Digital Optics Inc"
  models:
    - LC200
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
  - "https://mylumens.com/Download/CL510,V01%20RS-232%20command%20set_1_2.pdf"
source_documents:
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T18:06:09.396Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/CL510,V01%20RS-232%20command%20set_1_2.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T18:06:10.067Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T18:06:31.392Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T18:08:49.991Z
retrieved_at: 2026-04-26T18:08:49.991Z
last_checked_at: 2026-04-26T19:43:03.893Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T19:43:03.893Z
  matched_actions: 38
  action_count: 38
  confidence: high
  summary: "All 38 spec actions matched source command references; all transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Lumens LC200 Control Spec

## Summary
Lumens LC200 Media Station. Supports RS-232, RS-485, and TCP/IP control. Media capture device with recording, streaming, camera control, audio mixing, and layout management. Protocol: binary with 0x55 header, 0xf0 extended header, 0x0d end byte.

<!-- UNRESOLVED: power-on sequencing, interlock procedures not documented -->

## Transport
```yaml
protocols:
  - serial
  - tcp
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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []

- id: record_start
  label: Start Record
  kind: action
  params: []

- id: record_stop
  label: Stop Record
  kind: action
  params: []

- id: snapshot
  label: Snapshot
  kind: action
  params: []

- id: set_layout
  label: Set Layout
  kind: action
  params:
    - name: layout_id
      type: integer
      range: [1, 18]
      description: Layout ID 0x01-0x12

- id: set_background
  label: Set Background
  kind: action
  params:
    - name: background_id
      type: integer
      range: [0, 9]
      description: Background ID 0x00-0x09 (0x00=off)

- id: set_overlay
  label: Set Overlay
  kind: action
  params:
    - name: overlay_id
      type: integer
      range: [0, 30]
      description: Overlay ID 0x00-0x1e (0x00=off)

- id: set_scene
  label: Set Scene
  kind: action
  params:
    - name: scene_id
      type: integer
      range: [1, 30]
      description: Scene ID 0x01-0x1e

- id: set_audio_volume_input
  label: Set Audio Volume Input
  kind: action
  params:
    - name: channel
      type: integer
      range: [1, 4]
      description: Audio channel 1-4
    - name: volume
      type: integer
      range: [0, 125]
      description: Volume level 0x00-0x7d

- id: set_audio_volume_output
  label: Set Audio Volume Output
  kind: action
  params:
    - name: output
      type: integer
      enum: [1, 2]
      description: "1=Line & HDMI, 2=PGM"
    - name: volume
      type: integer
      range: [0, 125]
      description: Volume level 0x00-0x7d

- id: set_audio_mute_input
  label: Set Audio Mute Input
  kind: action
  params:
    - name: channel
      type: integer
      range: [1, 4]
      description: Audio channel 1-4
    - name: mute
      type: boolean
      description: "false=unmute, true=mute"

- id: set_audio_mute_output
  label: Set Audio Mute Output
  kind: action
  params:
    - name: output
      type: integer
      enum: [1, 2]
      description: "1=Line & HDMI, 2=PGM"
    - name: mute
      type: boolean
      description: "false=unmute, true=mute"

- id: set_audio_type_input
  label: Set Audio Type Input
  kind: action
  params:
    - name: channel
      type: integer
      range: [1, 4]
      description: Audio channel 1-4
    - name: type
      type: integer
      enum: [1, 2, 3, 6]
      description: "1=Line in, 2=Mic in, 3=HDMI in, 6=IP Audio"

- id: set_audio_type_output
  label: Set Audio Type Output
  kind: action
  params:
    - name: type
      type: integer
      enum: [1, 2, 3]
      description: "1=ALL, 2=Line out + PGM, 3=MultiView"

- id: set_stream
  label: Set Stream
  kind: action
  params:
    - name: stream
      type: integer
      enum: [1, 2, 3]
      description: Stream 1-3
    - name: action
      type: integer
      enum: [1, 2]
      description: "1=Stop, 2=Start"

- id: set_camera_preset
  label: Set Camera Preset
  kind: action
  params:
    - name: channel
      type: integer
      range: [1, 4]
      description: Camera channel 1-4
    - name: preset_id
      type: integer
      range: [1, 9]
      description: Preset ID 0x01-0x09

- id: set_camera_save_preset
  label: Save Camera Preset
  kind: action
  params:
    - name: channel
      type: integer
      range: [1, 4]
      description: Camera channel 1-4
    - name: preset_id
      type: integer
      range: [1, 9]
      description: Preset ID 0x01-0x09

- id: set_camera_move
  label: Camera Move
  kind: action
  params:
    - name: direction
      type: string
      enum: [S, U, D, L, R]
      description: "S=Stop, U=Up, D=Down, L=Left, R=Right"
    - name: channel
      type: integer
      range: [1, 4]
      description: Camera channel 1-4
    - name: speed
      type: integer
      range: [1, 24]
      description: Speed percentage 0x01-0x18

- id: set_camera_zoom
  label: Camera Zoom
  kind: action
  params:
    - name: zoom
      type: string
      enum: [S, I, O]
      description: "S=Stop, I=In, O=Out"
    - name: channel
      type: integer
      range: [1, 4]
      description: Camera channel 1-4
    - name: speed
      type: integer
      range: [1, 7]
      description: Speed percentage 0x01-0x07

- id: set_camera_tracking
  label: Set Camera Tracking
  kind: action
  params:
    - name: channel
      type: integer
      range: [1, 4]
      description: Camera channel 1-4
    - name: enabled
      type: boolean
      description: "false=ON, true=OFF"

- id: set_video_source
  label: Set Video Source
  kind: action
  params:
    - name: channel
      type: integer
      range: [1, 4]
      description: Channel 1-4
    - name: source_id
      type: integer
      range: [1, 255]
      description: Source ID 0x01-0xFF

- id: set_macro
  label: Trigger Macro
  kind: action
  params:
    - name: macro
      type: integer
      enum: [1, 2, 3]
      description: Macro 1-3

- id: set_standby
  label: Set Standby / Wake
  kind: action
  params:
    - name: mode
      type: integer
      enum: [1, 2]
      description: "1=Standby, 2=Wakeup"

- id: backup_to_usb
  label: Backup to USB
  kind: action
  params:
    - name: action
      type: integer
      enum: [1, 2]
      description: "1=Start backup, 2=Stop backup"

- id: set_intermission_live
  label: Set Intermission / Live Mode
  kind: action
  params:
    - name: mode
      type: integer
      enum: [1, 2]
      description: "1=Live, 2=Intermission"
- id: get_state
  label: Get State
  kind: query
  params: []

- id: get_layout
  label: Get Layout
  kind: query
  params: []

- id: get_background
  label: Get Background
  kind: query
  params: []

- id: get_overlay
  label: Get Overlay
  kind: query
  params: []

- id: get_audio_volume_input
  label: Get Audio Volume Input
  kind: query
  params:
    - name: channel
      type: integer
      range: [1, 4]

- id: get_audio_volume_output
  label: Get Audio Volume Output
  kind: query
  params:
    - name: output
      type: integer
      enum: [1, 2]
      description: "1=Line and HDMI, 2=PGM"

- id: get_audio_mute_input
  label: Get Audio Mute Input
  kind: query
  params:
    - name: channel
      type: integer
      range: [1, 4]

- id: get_audio_mute_output
  label: Get Audio Mute Output
  kind: query
  params:
    - name: output
      type: integer
      enum: [1, 2]
      description: "1=Line and HDMI, 2=PGM"

- id: get_audio_type_input
  label: Get Audio Type Input
  kind: query
  params:
    - name: channel
      type: integer
      range: [1, 4]

- id: get_audio_type_output
  label: Get Audio Type Output
  kind: query
  params: []

- id: get_stream
  label: Get Stream
  kind: query
  params:
    - name: stream
      type: integer
      enum: [1, 2, 3]

- id: get_video_source_total
  label: Get Video Source Total Number
  kind: query
  params:
    - name: channel
      type: integer
      range: [1, 4]

- id: get_current_video_source
  label: Get Current Video Source ID
  kind: query
  params:
    - name: channel
      type: integer
      range: [1, 4]
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: Power state (hardware limitation: power on NOT supported)

- id: system_state
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  description: "0=Uninitialize, 1=Ready, 2=Stopped, 3=Recording, 4=Paused, 5=Waiting, 6=Stopping, 7=Standby, 8=Reboot"

- id: layout_id
  type: integer
  range: [1, 18]

- id: background_id
  type: integer
  range: [0, 9]

- id: overlay_id
  type: integer
  range: [0, 30]

- id: audio_volume_input
  type: integer
  range: [0, 125]
  params:
    - name: channel
      type: integer
      range: [1, 4]

- id: audio_volume_output
  type: integer
  range: [0, 125]
  params:
    - name: output
      type: integer
      enum: [1, 2]

- id: audio_mute_input
  type: boolean
  params:
    - name: channel
      type: integer
      range: [1, 4]

- id: audio_mute_output
  type: boolean
  params:
    - name: output
      type: integer
      enum: [1, 2]

- id: audio_type_input
  type: integer
  enum: [1, 2, 3, 6]
  params:
    - name: channel
      type: integer
      range: [1, 4]

- id: audio_type_output
  type: integer
  enum: [1, 2, 3]
  params:
    - name: output
      type: integer
      enum: [1, 2]

- id: stream_status
  type: integer
  enum: [0, 1, 2, 4]
  params:
    - name: stream
      type: integer
      enum: [1, 2, 3]
  description: "0=Sync, 1=Ready, 2=Streaming, 4=Off"

- id: video_source_total
  type: integer
  range: [1, 255]
  params:
    - name: channel
      type: integer
      range: [1, 4]

- id: video_source_current
  type: integer
  range: [1, 255]
  params:
    - name: channel
      type: integer
      range: [1, 4]
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside action context
```

## Events
```yaml
- id: media_state_change
  description: Notifies external controller of system state changes
  params:
    - name: state
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      description: "0=Uninitialize, 1=Ready, 2=Stopped, 3=Recording, 4=Paused, 5=Waiting, 6=Stopping, 7=Standby, 8=Reboot"
  format:
    header: 0x23 (#)
    event_code: 0x53 0x54 (ST)
    end: 0x0d
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented beyond trigger commands
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Protocol format: Header 0x55 + Extended Header 0xf0 + Length (1 byte) + Address (0x01-0xff) + Action (Get=0x67, Set=0x73, ACK=0x06, NAK=0x15) + Command (2 bytes) + Parameters (n bytes) + End 0x0d
- In Standby mode, only "Get State" and "Set Standby/Wakeup" commands accepted
- Commands not accepted during boot-up
- TCP connections persist until new connection established; event notifications sent to connected client
- Power on via command NOT supported due to hardware limitation
<!-- UNRESOLVED: firmware version compatibility, voltage/power specs, error recovery sequences, protocol version -->

## Provenance

```yaml
source_urls:
  - "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
  - "https://mylumens.com/Download/CL510,V01%20RS-232%20command%20set_1_2.pdf"
source_documents:
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T18:06:09.396Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/CL510,V01%20RS-232%20command%20set_1_2.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T18:06:10.067Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T18:06:31.392Z
  - title: "Lumens Digital Optics Inc public source"
    url: "https://mylumens.com/Download/RS132%20-%20CL510,V02%20RS-232%20command%20set_1_0.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T18:08:49.991Z
retrieved_at: 2026-04-26T18:08:49.991Z
last_checked_at: 2026-04-26T19:43:03.893Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T19:43:03.893Z
matched_actions: 38
action_count: 38
confidence: high
summary: "All 38 spec actions matched source command references; all transport parameters verified."
```

## Known Gaps

```yaml
[]
```
