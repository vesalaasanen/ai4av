---
spec_id: admin/lumens-digital-optics-inc-lc200
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens Digital Optics Inc LC200 Control Spec"
manufacturer: Lumens
model_family: LC200
aliases: []
compatible_with:
  manufacturers:
    - Lumens
    - "Lumens Digital Optics Inc"
  models:
    - LC200
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-04-30T04:36:36.133Z
last_checked_at: 2026-06-02T17:23:17.259Z
generated_at: 2026-06-02T17:23:17.259Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source."
  - "firmware version compatibility not stated in source. UNRESOLVED: voltage, current, and power draw specifications not stated in source. UNRESOLVED: fault/recovery behavior beyond the documented ACK/NAK scheme not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:17.259Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions matched literally against source command catalogue; transport values verified; no fabrication, drift, or coverage gaps. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Lumens Digital Optics Inc LC200 Control Spec

## Summary
The Lumens LC200 is a media station supporting RS-232, RS-485, and TCP/IP control via a binary frame protocol (header `0x55`, extended header `0xF0`, terminator `0x0D`). This spec covers the full set of Set and Get commands for power, recording, layout, audio, streaming, camera PTZ, video source routing, macros, standby, USB backup, and intermission/live mode.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

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
- powerable       # inferred from PW power command examples (set_power_off only; set_power_on is hardware-unsupported)
- routable        # inferred from CH video source routing command examples
- queryable       # inferred from Get (0x67) command examples
- levelable       # inferred from AV audio volume command examples
```

## Actions
```yaml
# Protocol frame (verbatim per source §2.2):
#   Header(1)  ExtHeader(1)  Length(1)  Address(1)  Action(1)  Command(2)  Parameters(n)  End(1)
#   0x55       0xF0          {len}      0x01        0x73       {cmd}       {params}       0x0D
#
# Length byte counts from Address through Parameters (Address+Action+Command+Params).
# Set uses Action=0x73. Get/Query uses Action=0x67. ACK=0x06, NAK=0x15.
# Address 0x01..0xFF (0x00 reserved; "Don't care" per source).

- id: set_power_off
  label: Set Power Off
  kind: action
  command: "55 F0 05 01 73 50 57 30 0D"
  params: []
  notes: "Command code PW (0x50 0x57). Power on parameter 0x31 is documented but source states it is NOT supported due to hardware limitation."

- id: set_record_start
  label: Set Record Start
  kind: action
  command: "55 F0 04 01 73 52 43 0D"
  params: []

- id: set_record_stop
  label: Set Stop Record
  kind: action
  command: "55 F0 04 01 73 53 50 0D"
  params: []

- id: set_snapshot
  label: Set Snapshot
  kind: action
  command: "55 F0 04 01 73 53 53 0D"
  params: []

- id: set_layout
  label: Set Layout
  kind: action
  command: "55 F0 05 01 73 4C 4F {layout_id} 0D"
  params:
    - name: layout_id
      type: integer
      description: Layout ID, 0x01..0x12 (1..18)

- id: set_background
  label: Set Background
  kind: action
  command: "55 F0 05 01 73 42 47 {background_id} 0D"
  params:
    - name: background_id
      type: integer
      description: Background ID, 0x00..0x09 (0x00 = Background off)

- id: set_overlay
  label: Set Overlay
  kind: action
  command: "55 F0 05 01 73 4F 4C {overlay_id} 0D"
  params:
    - name: overlay_id
      type: integer
      description: Overlay ID, 0x00..0x1E (0x00 = Overlay off)

- id: set_scene
  label: Set Scene
  kind: action
  command: "55 F0 05 01 73 54 45 {scene_id} 0D"
  params:
    - name: scene_id
      type: integer
      description: Scene ID, 0x01..0x1E (1..30)

- id: set_audio_volume_input
  label: Set Audio Volume (Input)
  kind: action
  command: "55 F0 07 01 73 41 56 49 {channel} {volume} 0D"
  params:
    - name: channel
      type: integer
      description: Audio input channel 1..4 (0x31..0x34)
    - name: volume
      type: integer
      description: Audio volume 0..125 (0x00..0x7D)

- id: set_audio_volume_output
  label: Set Audio Volume (Output)
  kind: action
  command: "55 F0 07 01 73 41 56 4F {output} {volume} 0D"
  params:
    - name: output
      type: integer
      description: Output 1 = Line & HDMI, 2 = PGM (0x31 or 0x32)
    - name: volume
      type: integer
      description: Audio volume 0..125 (0x00..0x7D)

- id: set_audio_mute_input
  label: Set Audio Mute (Input)
  kind: action
  command: "55 F0 07 01 73 41 4D 49 {channel} {mute} 0D"
  params:
    - name: channel
      type: integer
      description: Audio input channel 1..4 (0x31..0x34)
    - name: mute
      type: integer
      description: 0 = unmute (0x30), 1 = mute (0x31)

- id: set_audio_mute_output
  label: Set Audio Mute (Output)
  kind: action
  command: "55 F0 07 01 73 41 4D 4F {output} {mute} 0D"
  params:
    - name: output
      type: integer
      description: Output 1 = Line & HDMI, 2 = PGM (0x31 or 0x32)
    - name: mute
      type: integer
      description: 0 = unmute (0x30), 1 = mute (0x31)

- id: set_audio_type_input
  label: Set Audio Type (Input)
  kind: action
  command: "55 F0 07 01 73 41 54 49 {channel} {audio_type} 0D"
  params:
    - name: channel
      type: integer
      description: Audio input channel 1..4 (0x31..0x34)
    - name: audio_type
      type: integer
      description: "1 = Line in, 2 = Mic in, 3 = HDMI in, 6 = IP Audio (0x31/0x32/0x33/0x36)"

- id: set_audio_type_output
  label: Set Audio Type (Output)
  kind: action
  command: "55 F0 07 01 73 41 54 4F 31 {audio_type} 0D"
  params:
    - name: audio_type
      type: integer
      description: "Output 1 (Line & HDMI). Values: 1 = ALL, 2 = Line out + PGM, 3 = MultiView (0x31/0x32/0x33)"

- id: set_stream
  label: Set Stream Start/Stop
  kind: action
  command: "55 F0 06 01 73 53 43 {stream_id} {action} 0D"
  params:
    - name: stream_id
      type: integer
      description: Stream 1, 2, or 3 (0x31/0x32/0x33)
    - name: action
      type: integer
      description: 0x01 = Stop stream, 0x02 = Start stream

- id: set_camera_preset
  label: Camera Goto Preset
  kind: action
  command: "55 F0 06 01 73 43 50 {channel} {preset_id} 0D"
  params:
    - name: channel
      type: integer
      description: Camera channel 1..4 (0x31..0x34)
    - name: preset_id
      type: integer
      description: Preset ID 0x01..0x09 (1..9)

- id: set_camera_save_preset
  label: Camera Save Preset
  kind: action
  command: "55 F0 06 01 73 43 53 {channel} {preset_id} 0D"
  params:
    - name: channel
      type: integer
      description: Camera channel 1..4 (0x31..0x34)
    - name: preset_id
      type: integer
      description: Preset ID 0x01..0x09 (1..9)

- id: set_camera_move
  label: Camera Move
  kind: action
  command: "55 F0 07 01 73 43 4D {direction} {channel} {speed} 0D"
  params:
    - name: direction
      type: string
      description: "S = stop, U = up, D = down, L = left, R = right (0x53/0x55/0x44/0x4C/0x52)"
    - name: channel
      type: integer
      description: Camera channel 1..4 (0x31..0x34)
    - name: speed
      type: integer
      description: Speed percentage 0x01..0x18 (1..24). Dispensable in stop (S) command.

- id: set_camera_zoom
  label: Camera Zoom
  kind: action
  command: "55 F0 07 01 73 43 5A {direction} {channel} {speed} 0D"
  params:
    - name: direction
      type: string
      description: "S = stop, I = zoom in, O = zoom out (0x53/0x49/0x4F)"
    - name: channel
      type: integer
      description: Camera channel 1..4 (0x31..0x34)
    - name: speed
      type: integer
      description: Speed percentage 0x01..0x07 (1..7). Dispensable in stop (S) command.

- id: set_camera_tracking
  label: Camera Tracking On/Off
  kind: action
  command: "55 F0 06 01 73 43 52 {channel} {state} 0D"
  params:
    - name: channel
      type: integer
      description: Camera channel 1..4 (0x31..0x34)
    - name: state
      type: integer
      description: 0 = ON (0x30), 1 = OFF (0x31)

- id: set_video_source
  label: Set Video Source ID
  kind: action
  command: "55 F0 06 01 73 43 48 {channel} {source_id} 0D"
  params:
    - name: channel
      type: integer
      description: Channel 1..4 (0x31..0x34)
    - name: source_id
      type: integer
      description: Channel source ID 0x01..0xFF. If > maximum stream source ID, returns success but no GUI action.

- id: set_macro
  label: Set Macro
  kind: action
  command: "55 F0 05 01 73 4D 43 {macro_id} 0D"
  params:
    - name: macro_id
      type: integer
      description: Macro 1, 2, or 3 (0x31/0x32/0x33). Source notes this performs scene and camera preset control.

- id: set_standby_wake
  label: Set Standby / Wake
  kind: action
  command: "55 F0 05 01 73 53 52 {mode} 0D"
  params:
    - name: mode
      type: integer
      description: 1 = Set power mode to Standby (0x31); 2 = Wake up, active only if power mode was Standby (0x32)
  notes: "When in Standby mode, only 'Get state' and 'Set Standby/Wakeup' commands are accepted."

- id: set_backup_to_usb
  label: Set Backup to USB
  kind: action
  command: "55 F0 05 01 73 42 55 {action} 0D"
  params:
    - name: action
      type: integer
      description: 0x30 = Start backup to USB, 0x31 = Stop backup to USB

- id: set_intermission_live
  label: Set Intermission / Live
  kind: action
  command: "55 F0 05 01 73 49 4C {mode} 0D"
  params:
    - name: mode
      type: integer
      description: 0x30 = Live mode, 0x31 = Intermission mode

- id: get_state
  label: Get System State
  kind: query
  command: "55 F0 04 01 67 53 54 0D"
  params: []

- id: get_layout
  label: Get Layout ID
  kind: query
  command: "55 F0 04 01 67 4C 4F 0D"
  params: []

- id: get_background
  label: Get Background ID
  kind: query
  command: "55 F0 04 01 67 42 47 0D"
  params: []

- id: get_overlay
  label: Get Overlay ID
  kind: query
  command: "55 F0 04 01 67 4F 4C 0D"
  params: []

- id: get_audio_volume_input
  label: Get Audio Volume (Input)
  kind: query
  command: "55 F0 06 01 67 41 56 49 {channel} 0D"
  params:
    - name: channel
      type: integer
      description: Audio input channel 1..4 (0x31..0x34)

- id: get_audio_volume_output
  label: Get Audio Volume (Output)
  kind: query
  command: "55 F0 06 01 67 41 56 4F {output} 0D"
  params:
    - name: output
      type: integer
      description: Output 1 = Line & HDMI, 2 = PGM (0x31 or 0x32)

- id: get_audio_mute_input
  label: Get Audio Mute (Input)
  kind: query
  command: "55 F0 06 01 67 41 4D 49 {channel} 0D"
  params:
    - name: channel
      type: integer
      description: Audio input channel 1..4 (0x31..0x34)

- id: get_audio_mute_output
  label: Get Audio Mute (Output)
  kind: query
  command: "55 F0 06 01 67 41 4D 4F {output} 0D"
  params:
    - name: output
      type: integer
      description: Output 1 = Line & HDMI, 2 = PGM (0x31 or 0x32)

- id: get_audio_type_input
  label: Get Audio Input Type
  kind: query
  command: "55 F0 06 01 67 41 54 49 {channel} 0D"
  params:
    - name: channel
      type: integer
      description: Audio input channel 1..4 (0x31..0x34)

- id: get_audio_type_output
  label: Get Audio Output Type
  kind: query
  command: "55 F0 06 01 67 41 54 4F 31 0D"
  params: []

- id: get_stream
  label: Get Stream State
  kind: query
  command: "55 F0 05 01 67 53 43 {stream_id} 0D"
  params:
    - name: stream_id
      type: integer
      description: Stream 1, 2, or 3 (0x31/0x32/0x33)

- id: get_video_source_total
  label: Get Video Source Total Number
  kind: query
  command: "55 F0 05 01 67 43 48 {channel} 0D"
  params:
    - name: channel
      type: integer
      description: Channel 1..4 (0x31..0x34)

- id: get_current_video_source
  label: Get Current Video Source ID
  kind: query
  command: "55 F0 05 01 67 43 55 {channel} 0D"
  params:
    - name: channel
      type: integer
      description: Channel 1..4 (0x31..0x34)
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [uninitialize, ready, stopped, recording, paused, waiting, stopping, standby]
  notes: "Returned by Get State (ST, 0x53 0x54) as parameter byte 0x30..0x37."

- id: layout_id
  type: integer
  range: 1..18
  notes: "0x01..0x12. Get Layout (LO, 0x4C 0x4F)."

- id: background_id
  type: integer
  range: 0..9
  notes: "0x00..0x09 (0x00 = Background off). Get Background (BG, 0x42 0x47)."

- id: overlay_id
  type: integer
  range: 0..30
  notes: "0x00..0x1E (0x00 = Overlay off). Get Overlay (OL, 0x4F 0x4C)."

- id: audio_volume
  type: integer
  range: 0..125
  notes: "0x00..0x7D. Returned by Get Audio Volume Input/Output."

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  notes: "0x30 = unmute, 0x31 = mute. Get Audio Mute Input/Output."

- id: audio_type_input
  type: enum
  values: [line_in, mic_in, hdmi_in, ip_audio]
  notes: "0x31=Line in, 0x32=Mic in, 0x33=HDMI in, 0x36=IP Audio. Get Audio Type Input."

- id: audio_type_output
  type: enum
  values: [all, line_out_plus_pgm, multiview]
  notes: "0x31=ALL, 0x32=Line out + PGM, 0x33=MultiView. Get Audio Type Output."

- id: stream_state
  type: enum
  values: [sync, ready, streaming, off]
  notes: "0x00=Sync, 0x01=Ready (enable), 0x02=Streaming (enable), 0x04=Off. Get Stream."

- id: video_source_total
  type: integer
  range: 1..255
  notes: "0x01..0xFF. Get Video Source Total Number (CH query)."

- id: current_video_source
  type: integer
  range: 1..255
  notes: "0x01..0xFF. Get Current Video Source ID (CU, 0x43 0x55)."
```

## Events
```yaml
- id: ntfy_media_state
  header: "0x23"
  terminator: "0x0D"
  event_code: "0x53 0x54"
  description: "Unsolicited system state change notification. Format: Header(1) + EventCode(2) + Parameters(n) + End(1)."
  parameters:
    - id: state
      type: enum
      values: [uninitialize, ready, stopped, recording, paused, waiting, stopping, standby, reboot]
      notes: "0x30..0x38. 0x38 (Reboot) is only available when prior state was standby."
```

## Macros
```yaml
- id: macro_run
  description: "Trigger a saved macro (scene + camera preset sequence)."
  action_ref: set_macro
  notes: "Source documents three macro slots (1..3) but does not detail their composed steps."
```

## Safety
```yaml
[]
```

## Notes
- Protocol frame per source §2.2: Header `0x55` + Extended Header `0xF0` + Length + Address (`0x01..0xFF`, `0x00` reserved) + Action (`0x67` Get, `0x73` Set, `0x06` ACK, `0x15` NAK) + Command (2 bytes) + Parameters + End `0x0D`. No checksum ("no checksum in format" per source).
- Length byte counts Address + Action + Command + Parameters bytes (excludes Header, Extended Header, Length, and End).
- Set Power On (`PW` with parameter `0x31`) is documented but **NOT supported** per source §2.3.1 ("Hardware limitation").
- When in Standby mode, only "Get state" and "Set Standby/Wakeup" commands are accepted (§2.3.23).
- Commands are not accepted during media station boot-up (§4 Note 1).
- Address field is reserved for future use; source says "Don't care". Spec uses `0x01` per documented examples.
- RS-232 and RS-485 share the same protocol frame and command set; only physical layer differs.
- TCP connection remains open for event notification until closed by the client.

<!-- UNRESOLVED: firmware version compatibility not stated in source. UNRESOLVED: voltage, current, and power draw specifications not stated in source. UNRESOLVED: fault/recovery behavior beyond the documented ACK/NAK scheme not stated in source. -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-04-30T04:36:36.133Z
last_checked_at: 2026-06-02T17:23:17.259Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:17.259Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions matched literally against source command catalogue; transport values verified; no fabrication, drift, or coverage gaps. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source."
- "firmware version compatibility not stated in source. UNRESOLVED: voltage, current, and power draw specifications not stated in source. UNRESOLVED: fault/recovery behavior beyond the documented ACK/NAK scheme not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
