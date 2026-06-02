---
spec_id: admin/lumens-lc300-media-processor-v2-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens LC300/LC300S Media Processor Control Spec"
manufacturer: Lumens
model_family: LC300
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - LC300
    - LC300S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS182%20-%20LC300_LC300S%20command%20set%20-%20LCB103.pdf"
retrieved_at: 2026-04-30T04:33:16.764Z
last_checked_at: 2026-06-02T17:23:18.797Z
generated_at: 2026-06-02T17:23:18.797Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range; source does not state it."
  - "source models all settable parameters as discrete actions (e.g. AV set volume per input), not as named variables"
  - "source exposes 9 macro slots via MC command but does not document macro definition, sequence, or content"
  - "source does not state firmware compatibility range, voltage/current/power specs, fault-recovery sequences, protocol version, default credentials, or NAK retry/recovery procedure."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:18.797Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec actions matched literal source commands with correct shapes; transport fully verified; source command set fully represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Lumens LC300/LC300S Media Processor Control Spec

## Summary
RS-232 + TCP control for Lumens LC300/LC300S media processor. RS-232 at 9600/8/N/1, TCP on port 5080. Binary frame protocol with header 0x55, extended header 0xF0 (no checksum), 1-byte length, 1-byte address, 1-byte action (Get 0x67 / Set 0x73 / ACK 0x06 / NAK 0x15), 2-byte ASCII command, parameters, 0x0D terminator. Covers power, standby, recording, layout/scene/background/overlay, macros, audio vol/mute/type, XLR, stream, camera PTZ + presets + tracking, snapshot, bookmark, USB backup.

<!-- UNRESOLVED: firmware compatibility range; source does not state it. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5080
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from PW and SR commands
- queryable       # inferred from Get-state commands (ST, LO, BG, OL, CH, CU, AV, AM, AT, XC, XP, SC)
- levelable       # inferred from AV audio-volume set commands
- routable        # inferred from CH (video source per channel) and MC (macro) commands
```

## Actions
```yaml
# Frame format: 0x55 0xF0 LEN ADDR ACTION CMD(nx2) PARAMS 0x0D
# ACTION: 0x67=Get, 0x73=Set, 0x06=ACK, 0x15=NAK
# Default ADDR 0x01 used in source examples. Address range 0x01-0xFF (0 reserved).
# All lengths in source examples use address 0x01; LEN = ADDR+ACTION+CMD+PARAMS bytes.

# --- 2.3.1 Power ---
- id: set_power
  label: Set Power
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x50 0x57 {value} 0x0D"
  params:
    - name: value
      type: enum
      values: ["off:0x30", "on:0x31"]
      description: 0x30=Power off; 0x31=Power on (source: "NOT supported. Hardware limitation")

- id: set_standby_wake
  label: Set Standby / Wake
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x53 0x52 {mode} 0x0D"
  params:
    - name: mode
      type: enum
      values: ["standby:0x31", "wake:0x32"]
      description: 0x31=Set power mode to Standby; 0x32=Wake up (active only when power mode was Standby)

# --- 2.3.2 Record ---
- id: set_record_start
  label: Set Record Start
  kind: action
  command: "0x55 0xF0 0x04 0x01 0x73 0x52 0x43 0x0D"
  params: []

- id: set_record_pause
  label: Set Record Pause
  kind: action
  command: "0x55 0xF0 0x04 0x01 0x73 0x50 0x53 0x0D"
  params: []

- id: set_record_resume
  label: Set Record Resume Pause
  kind: action
  command: "0x55 0xF0 0x04 0x01 0x73 0x52 0x50 0x0D"
  params: []

- id: set_record_stop
  label: Set Record Stop
  kind: action
  command: "0x55 0xF0 0x04 0x01 0x73 0x53 0x50 0x0D"
  params: []

- id: get_record_state
  label: Get Record State
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x53 0x54 0x0D"
  params: []

# --- 2.3.3 Theme / Scene ---
- id: set_layout
  label: Set Layout
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x4C 0x4F {layout_id} 0x0D"
  params:
    - name: layout_id
      type: integer
      description: Layout ID (0x01-0x12)

- id: set_background
  label: Set Background
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x42 0x47 {bg_id} 0x0D"
  params:
    - name: bg_id
      type: integer
      description: Background ID (0x00-0x09; 0x00=Background off)

- id: set_overlay
  label: Set Overlay
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x4F 0x4C {ov_id} 0x0D"
  params:
    - name: ov_id
      type: integer
      description: Overlay ID (0x00-0x1E; 0x00=Overlay off)

- id: set_scene
  label: Set Scene
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x54 0x45 {scene_id} 0x0D"
  params:
    - name: scene_id
      type: integer
      description: Scene ID (0x01-0x1E)

- id: set_video_source
  label: Set Video Source ID
  kind: action
  command: "0x55 0xF0 0x06 0x01 0x73 0x43 0x48 {channel} {source_id} 0x0D"
  params:
    - name: channel
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34"]
      description: Channel number 1-4
    - name: source_id
      type: integer
      description: ID of channel source (0x01-0xFF). If > max stream source, returns ACK but no GUI action.

- id: set_macro
  label: Set Macro
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x4D 0x43 {macro_id} 0x0D"
  params:
    - name: macro_id
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34", "5:0x35", "6:0x36", "7:0x37", "8:0x38", "9:0x39"]
      description: Macro number 1-9 (scene and camera preset control)

- id: set_intermission_live
  label: Set Intermission / Live
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x49 0x4C {mode} 0x0D"
  params:
    - name: mode
      type: enum
      values: ["live:0x30", "intermission:0x31"]
      description: 0x30=Live mode; 0x31=Intermission mode

- id: get_layout
  label: Get Layout
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x4C 0x4F 0x0D"
  params: []

- id: get_background
  label: Get Background
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x42 0x47 0x0D"
  params: []

- id: get_overlay
  label: Get Overlay
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x4F 0x4C 0x0D"
  params: []

- id: get_video_source_total
  label: Get Video Source Total Number
  kind: query
  command: "0x55 0xF0 0x05 0x01 0x67 0x43 0x48 {channel} 0x0D"
  params:
    - name: channel
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34"]
      description: Channel number 1-4

- id: get_current_video_source
  label: Get Current Video Source ID
  kind: query
  command: "0x55 0xF0 0x05 0x01 0x67 0x43 0x55 {channel} 0x0D"
  params:
    - name: channel
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34"]
      description: Channel number 1-4

# --- 2.3.4 Audio Volume ---
- id: set_audio_vol_input
  label: Set Audio Volume Input
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x56 0x49 {input} {volume} 0x0D"
  params:
    - name: input
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34", "5:0x35", "6:0x36", "7:0x37", "8:0x38"]
      description: Input number 1-8
    - name: volume
      type: integer
      description: Audio volume 0-125 (0x00-0x7D)

- id: set_audio_vol_output
  label: Set Audio Volume Output
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x56 0x4F {output} {volume} 0x0D"
  params:
    - name: output
      type: enum
      values: ["pgm:0x31", "pgm_hdmi:0x32", "multiview_hdmi:0x33", "lineout_xlr:0x34"]
      description: 1=PGM Level; 2=Audio Output PGM HDMI; 3=Audio Output Multiview HDMI; 4=Audio Output Line Out & XLR
    - name: volume
      type: integer
      description: Audio volume 0-125 (0x00-0x7D)

- id: get_audio_vol_input
  label: Get Audio Volume Input
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x56 0x49 {input} 0x0D"
  params:
    - name: input
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34", "5:0x35", "6:0x36", "7:0x37", "8:0x38"]
      description: Input number 1-8

- id: get_audio_vol_output
  label: Get Audio Volume Output
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x56 0x4F {output} 0x0D"
  params:
    - name: output
      type: enum
      values: ["pgm:0x31", "pgm_hdmi:0x32", "multiview_hdmi:0x33", "lineout_xlr:0x34"]
      description: 1=PGM Level; 2=Audio Output PGM HDMI; 3=Audio Output Multiview HDMI; 4=Audio Output Line Out & XLR

# --- 2.3.5 Audio Mute ---
- id: set_audio_mute_input
  label: Set Audio Mute Input
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x4D 0x49 {input} {state} 0x0D"
  params:
    - name: input
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34", "5:0x35", "6:0x36", "7:0x37", "8:0x38"]
      description: Input number 1-8
    - name: state
      type: enum
      values: ["unmute:0x30", "mute:0x31"]
      description: 0x30=Audio unmute; 0x31=Audio mute

- id: set_audio_mute_output
  label: Set Audio Mute Output
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x4D 0x4F {output} {state} 0x0D"
  params:
    - name: output
      type: enum
      values: ["pgm:0x31", "pgm_hdmi:0x32", "multiview_hdmi:0x33", "lineout_xlr:0x34"]
      description: 1=PGM Level; 2=Audio Output PGM HDMI; 3=Audio Output Multiview HDMI; 4=Audio Output Line Out & XLR
    - name: state
      type: enum
      values: ["unmute:0x30", "mute:0x31"]
      description: 0x30=Audio unmute; 0x31=Audio mute

- id: get_audio_mute_input
  label: Get Audio Mute Input
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x4D 0x49 {input} 0x0D"
  params:
    - name: input
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34", "5:0x35", "6:0x36", "7:0x37", "8:0x38"]
      description: Input number 1-8

- id: get_audio_mute_output
  label: Get Audio Mute Output
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x4D 0x4F {output} 0x0D"
  params:
    - name: output
      type: enum
      values: ["pgm:0x31", "pgm_hdmi:0x32", "multiview_hdmi:0x33", "lineout_xlr:0x34"]
      description: 1=PGM Level; 2=Audio Output PGM HDMI; 3=Audio Output Multiview HDMI; 4=Audio Output Line Out & XLR

# --- 2.3.6 Audio Type ---
- id: set_audio_type_input
  label: Set Audio Type Input
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x54 0x49 {input} {type} 0x0D"
  params:
    - name: input
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34", "5:0x35", "6:0x36", "7:0x37", "8:0x38"]
      description: Input number 1-8 (7 and 8 not yet supported per source)
    - name: type
      type: enum
      values: ["line_in_1:0x31", "xlr_line:0x37", "xlr_mic:0x38", "follow:0x3A", "line_in_2:0x41"]
      description: Per source: inputs 1-4 accept only 0x3A (Follow); input 5 accepts 0x37/0x38; input 6 accepts 0x31/0x41

- id: get_audio_type_input
  label: Get Audio Type Input
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x54 0x49 {input} 0x0D"
  params:
    - name: input
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34", "5:0x35", "6:0x36", "7:0x37", "8:0x38"]
      description: Input number 1-8 (7 and 8 not yet supported per source)

# --- 2.3.7 Audio XLR ---
- id: set_audio_xlr_channel
  label: Set Audio XLR Channel Mode
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x58 0x43 {mode} 0x0D"
  params:
    - name: mode
      type: enum
      values: ["stereo:0x30", "mono:0x31"]
      description: 0x30=Stereo; 0x31=Mono

- id: set_audio_xlr_power
  label: Set Audio XLR Power Mode
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x58 0x50 {power} 0x0D"
  params:
    - name: power
      type: enum
      values: ["off:0x30", "on:0x31"]
      description: 0x30=XLR power off; 0x31=XLR power on

- id: get_audio_xlr_channel
  label: Get Audio XLR Channel Mode
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x58 0x43 0x0D"
  params: []

- id: get_audio_xlr_power
  label: Get Audio XLR Power Mode
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x58 0x50 0x0D"
  params: []

# --- 2.3.8 Stream ---
- id: set_stream
  label: Set Stream Start/Stop
  kind: action
  command: "0x55 0xF0 0x06 0x01 0x73 0x53 0x43 {stream_id} {action} 0x0D"
  params:
    - name: stream_id
      type: string
      description: Stream number (ASCII "1", "2", ...). Range per web setting.
    - name: action
      type: enum
      values: ["stop:0x01", "start:0x02"]
      description: 0x01=Stop Stream; 0x02=Start Stream

- id: get_stream
  label: Get Stream State
  kind: query
  command: "0x55 0xF0 0x05 0x01 0x67 0x53 0x43 {stream_id} 0x0D"
  params:
    - name: stream_id
      type: string
      description: Stream number (ASCII "1", "2", ...). Range per web setting.

# --- 2.3.9 Camera ---
- id: set_camera_preset
  label: Set Camera Preset
  kind: action
  command: "0x55 0xF0 0x06 0x01 0x73 0x43 0x50 {channel} {preset_id} 0x0D"
  params:
    - name: channel
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34"]
      description: Channel number 1-4
    - name: preset_id
      type: integer
      description: Preset ID (0x01-0x09)

- id: set_camera_save_preset
  label: Set Camera Save Preset
  kind: action
  command: "0x55 0xF0 0x06 0x01 0x73 0x43 0x53 {channel} {preset_id} 0x0D"
  params:
    - name: channel
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34"]
      description: Channel number 1-4
    - name: preset_id
      type: integer
      description: Preset ID (0x01-0x09)

- id: set_camera_move
  label: Set Camera Move
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x43 0x4D {dir} {channel} {speed} 0x0D"
  params:
    - name: dir
      type: enum
      values: ["stop:0x53", "up:0x55", "down:0x44", "left:0x4C", "right:0x52"]
      description: Move direction
    - name: channel
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34"]
      description: Channel number 1-4
    - name: speed
      type: integer
      description: Speed percentage 0x01-0x18 (dispensable in stop command)

- id: set_camera_zoom
  label: Set Camera Zoom
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x43 0x5A {dir} {channel} {speed} 0x0D"
  params:
    - name: dir
      type: enum
      values: ["stop:0x53", "in:0x49", "out:0x4F"]
      description: Zoom direction
    - name: channel
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34"]
      description: Channel number 1-4
    - name: speed
      type: integer
      description: Speed percentage 0x01-0x07 (dispensable in stop command)

- id: set_camera_tracking
  label: Set Camera Tracking
  kind: action
  command: "0x55 0xF0 0x06 0x01 0x73 0x43 0x52 {channel} {state} 0x0D"
  params:
    - name: channel
      type: enum
      values: ["1:0x31", "2:0x32", "3:0x33", "4:0x34"]
      description: Channel number 1-4
    - name: state
      type: enum
      values: ["on:0x30", "off:0x31"]
      description: 0x30=ON; 0x31=OFF

# --- 2.3.10 Others ---
- id: set_snapshot
  label: Set Snapshot
  kind: action
  command: "0x55 0xF0 0x04 0x01 0x73 0x53 0x53 0x0D"
  params: []

- id: set_bookmark
  label: Set Bookmark
  kind: action
  command: "0x55 0xF0 0x04 0x01 0x73 0x42 0x4D 0x0D"
  params: []

- id: set_backup_usb
  label: Set Backup to USB
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x42 0x55 {action} 0x0D"
  params:
    - name: action
      type: enum
      values: ["start:0x30", "stop:0x31"]
      description: 0x30=Start backup to USB; 0x31=Stop backup to USB
```

## Feedbacks
```yaml
- id: record_state
  type: enum
  values: [uninitialize, ready, stopped, recording, paused, waiting, stopping, standby]
  description: Response to get_record_state; values 0x30-0x37

- id: layout_id
  type: integer
  description: Response to get_layout (0x01-0x12)

- id: background_id
  type: integer
  description: Response to get_background (0x00-0x09; 0x00=off)

- id: overlay_id
  type: integer
  description: Response to get_overlay (0x00-0x09 per source Get table)

- id: video_source_count
  type: integer
  description: Response to get_video_source_total; number of usable sources per channel (0x01-0xFF)

- id: current_video_source_id
  type: integer
  description: Response to get_current_video_source; current source index per channel (0x01-0xFF)

- id: audio_volume
  type: integer
  description: Response to get_audio_vol_input/output (0x00-0x7D, 0-125)

- id: audio_mute
  type: enum
  values: [unmute, mute]
  description: Response to get_audio_mute_input/output (0x30=unmute, 0x31=mute)

- id: audio_type
  type: enum
  values: [line_in_1, xlr_line, xlr_mic, follow, line_in_2]
  description: Response to get_audio_type_input (0x31/0x37/0x38/0x3A/0x41)

- id: xlr_channel_mode
  type: enum
  values: [stereo, mono]
  description: Response to get_audio_xlr_channel (0x30/0x31)

- id: xlr_power_mode
  type: enum
  values: [off, on]
  description: Response to get_audio_xlr_power (0x30/0x31)

- id: stream_state
  type: enum
  values: [sync, ready, streaming]
  description: Response to get_stream (0x00=sync, 0x01=ready, 0x02=streaming)

- id: ack_nak
  type: enum
  values: [ack, nak]
  description: Protocol-level response to every Set/Get (0x06=ACK, 0x15=NAK)
```

## Variables
```yaml
[]  # UNRESOLVED: source models all settable parameters as discrete actions (e.g. AV set volume per input), not as named variables
```

## Events
```yaml
- id: ntfy_media_state
  header: 0x23
  event_code: "0x53 0x54"
  format: "0x23 0x53 0x54 {state} 0x0D"
  description: System state event sent by media station on state change (TCP only; connection stays open)
  params:
    - name: state
      type: enum
      values: ["uninitialize:0x30", "ready:0x31", "stopped:0x32", "recording:0x33", "paused:0x34", "waiting:0x35", "stopping:0x36", "standby:0x37", "reboot:0x38"]
      description: 0x38 (Reboot) only available when state was Standby
```

## Macros
```yaml
[]  # UNRESOLVED: source exposes 9 macro slots via MC command but does not document macro definition, sequence, or content
```

## Safety
```yaml
[]
```

## Notes
- Frame: 0x55 0xF0 LEN ADDR ACTION CMD(nx2) PARAMS 0x0D. Extended header 0xF0 explicitly noted as "no checksum in format".
- Action byte: 0x67=Get, 0x73=Set, 0x06=ACK, 0x15=NAK. Address 0x01-0xFF; 0 reserved. Source flags address as "reserved for future use. Don't care".
- NAK returned both for "command failed" and "received invalid protocol data" (with End only).
- Source title explicitly covers both LC300 and LC300S; protocol identical for both.
- Standby mode (SR 0x31): source states "only accept command including 'Get state' and 'Set Standby/Wakeup'". All other commands are rejected until wake.
- Boot-up: source notes "Commands are not accepted during media station boot-up."
- TCP connection: per source, "If connection is not closed by client, connection will keep and get event notification until new connection established."
- Stream and Video Source ID parameter ranges are described in source as "based on web setting" (dynamic), not fixed maximums.
- Audio Type source quirk: inputs 1-4 only accept 0x3A (Follow); input 5 only 0x37/0x38; input 6 only 0x31/0x41; inputs 7-8 unsupported.
- Set Power (PW 0x31) is documented but flagged "NOT supported. Hardware limitation".
- Get Overlay source shows range 0x00-0x09 in the response table (likely source-side typo vs. Set Overlay's 0x00-0x1E range); recorded as-stated.

<!-- UNRESOLVED: source does not state firmware compatibility range, voltage/current/power specs, fault-recovery sequences, protocol version, default credentials, or NAK retry/recovery procedure. -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS182%20-%20LC300_LC300S%20command%20set%20-%20LCB103.pdf"
retrieved_at: 2026-04-30T04:33:16.764Z
last_checked_at: 2026-06-02T17:23:18.797Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:18.797Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec actions matched literal source commands with correct shapes; transport fully verified; source command set fully represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range; source does not state it."
- "source models all settable parameters as discrete actions (e.g. AV set volume per input), not as named variables"
- "source exposes 9 macro slots via MC command but does not document macro definition, sequence, or content"
- "source does not state firmware compatibility range, voltage/current/power specs, fault-recovery sequences, protocol version, default credentials, or NAK retry/recovery procedure."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
