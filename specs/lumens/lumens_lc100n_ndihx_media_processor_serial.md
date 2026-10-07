---
spec_id: admin/lumens-lc100n
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens LC100/LC100N Media Station Control Spec"
manufacturer: Lumens
model_family: LC100
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - LC100
    - LC100N
  firmware: "VLW102 (initial release per doc history v1.0; full compatibility range not stated)"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS165%20-%20LC100_LC100N%20RS-232%20command%20set.pdf"
retrieved_at: 2026-07-15T06:19:16.176Z
last_checked_at: 2026-10-07T12:50:30.927Z
generated_at: 2026-10-07T12:50:30.927Z
firmware_coverage: "VLW102 (initial release per doc history v1.0; full compatibility range not stated)"
protocol_coverage: []
known_gaps:
  - "document only provides command set; no electrical ratings, no firmware-version compatibility matrix beyond the v1.0 note."
  - "no HTTP/REST base URL in source"
  - "source defines no parameters outside the command set."
  - "source documents no multi-step host macro sequences."
  - "source does not specify authentication requirements or a password procedure."
  - "electrical/power ratings, fault/error recovery sequences, and firmware-version compatibility matrix are not stated in the source."
  - "exact meaning of \"Ndihx\" in the device name not present in the source document (doc title is \"LC100_LC100N\")."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:50:30.927Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 action units (45 documented commands plus 7 legacy-id aliases) match source codes and shapes, transport values are supported, and the spec covers the full catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-15
---

# Lumens LC100/LC100N Media Station Control Spec

## Summary
The Lumens LC100/LC100N is a media station (capture / streaming processor) controllable over RS-232, RS-485, and TCP. This spec documents the binary control protocol from the "LC100_LC100N RS-232 Command Set" revision 3.0 (2022/10/25), covering power, record, scene/theme, audio, stream, camera, and system commands plus event notifications. The frame format uses header `0x55`, extended header `0xF0` (no checksum), an action byte (`0x67` Get / `0x73` Set / `0x06` ACK / `0x15` NAK), a two-byte command code, parameters, and an end code `0x0D`.

<!-- UNRESOLVED: document only provides command set; no electrical ratings, no firmware-version compatibility matrix beyond the v1.0 note. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
# Source §1.1/1.3: RS-232 (upper port) and RS-485 (lower port) share the same
# serial configuration. TCP uses the Media Station WAN/LAN port.
addressing:
  port: 5080  # TCP control port (source §1.3)
  base_url: null  # UNRESOLVED: no HTTP/REST base URL in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # Source does not specify authentication requirements.
# Note: RS-485 uses the same frame format and serial config; differential
# pins T/R+ (D+) and T/R- (D-). TCP connection stays open and receives event
# notifications until a new connection is established (source §2.1).
```

## Traits
```yaml
traits:
  - powerable   # inferred: Set Power (PW) + Set Standby/Wakeup (SR)
  - queryable   # inferred: Get (action 0x67) commands for state/volume/type/etc.
  - routable    # inferred: Set/Get Video Source ID (CH/CU) select channel sources
  - levelable   # inferred: Set/Get Audio Volume (AV) 0-125
```

## Actions
```yaml
# Retained legacy ids below are aliases of documented commands, not additional
# vendor commands. Parameter-table rows are not standalone wire commands.

- id: 1_2_3_4_audio_channel_1_audio_channel_2_audio_xlr_audio_line_in_&_usb
  label: Set Audio Volume Input
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x56 0x49 {channel} {volume} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Audio channel 1", "0x32": "Audio channel 2", "0x33": "Audio XLR", "0x34": "Audio Line in & USB" }
    - name: volume
      type: integer
      range: "0x00-0x7D (0-125)"
      description: "Audio volume"
  notes: "Retained legacy id; alias of set_audio_volume_input (source §2.3.4.1)."

- id: parameter_2_1_2_3_4_audio_channel_1_audio_channel_2_audio_xlr_audio_line_in_&_usb
  label: Set Audio Mute Input
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x4D 0x49 {channel} {mute} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Audio channel 1", "0x32": "Audio channel 2", "0x33": "Audio XLR", "0x34": "Audio Line in & USB" }
    - name: mute
      type: enum
      values: { "0x30": "Audio unmute", "0x31": "Audio mute" }
  notes: "Retained legacy id; alias of set_audio_mute_input (source §2.3.5.1)."

- id: command_response_parameter_2_1_2_3_4_audio_channel_1_audio_channel_2_audio_xlr_audio_line_in_&_usb
  label: Get Audio Mute Input
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x4D 0x49 {channel} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Audio channel 1", "0x32": "Audio channel 2", "0x33": "Audio XLR", "0x34": "Audio Line in & USB" }
  response: "ACK 0x06 with params 0x49 {channel} {mute 0x30 unmute|0x31 mute}; NAK 0x15 on error."
  notes: "Retained legacy id; alias of get_audio_mute_input (source §2.3.5.3)."

- id: parameter_2_1_2_3_4_audio_channel_1,_only_available_0x33_&_0x36_&_0x3a_audio_channel_2,_only_available_0x33_&_0x36_&_0x3a_audio_channel_3,_only_available_0x37_&_0x38_audio_channel_4,_only_available_0x31_&_0x32_&_0x39
  label: Set Audio Type Input
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x54 0x49 {channel} {type} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Audio channel 1 (only 0x33/0x36/0x3a)", "0x32": "Audio channel 2 (only 0x33/0x36/0x3a)", "0x33": "Audio channel 3 / XLR (only 0x37/0x38)", "0x34": "Audio channel 4 / Line in & USB (only 0x31/0x32/0x39)" }
    - name: type
      type: enum
      values: { "0x31": "Line in", "0x32": "Mic in", "0x33": "HDMI / SDI", "0x36": "IP Audio", "0x37": "XLR-Line", "0x38": "XLR-Mic", "0x39": "USB Audio", "0x3a": "Follow" }
  notes: "Retained legacy id; alias of set_audio_type_input (source §2.3.6.1)."

- id: 0_1_2_3_xlr_power_off_xlr_power_left_xlr_power_right_xlr_power_left_right
  label: Set Audio XLR Power
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x58 0x50 {power} 0x0D"
  params:
    - name: power
      type: enum
      values: { "0x30": "XLR power off", "0x31": "XLR power left", "0x32": "XLR power right", "0x33": "XLR power left right" }
  notes: "Retained legacy id; alias of set_audio_xlr_power (source §2.3.7.2)."

- id: parameter_1_s_u_d_l_r_camera_stop_move_camera_move_up_camera_move_down_camera_move_left_camera_move_right
  label: Set Camera Move
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x43 0x4D {direction} {channel} {speed} 0x0D"
  params:
    - name: direction
      type: enum
      values: { "0x53": "Stop move", "0x55": "Move up", "0x44": "Move down", "0x4C": "Move left", "0x52": "Move right" }
    - name: channel
      type: enum
      values: { "0x31": "Channel 1", "0x32": "Channel 2" }
    - name: speed
      type: integer
      range: "0x01-0x18 (1-24)"
      description: "Speed percentage; dispensable for stop command (length becomes 0x06)"
  notes: "Retained legacy id; alias of set_camera_move (source §2.3.9.3)."

- id: parameter_1_s_i_o_camera_stop_zoom_camera_zoom_in_camera_zoom_out
  label: Set Camera Zoom
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x43 0x5A {zoom} {channel} {speed} 0x0D"
  params:
    - name: zoom
      type: enum
      values: { "0x53": "Stop zoom", "0x49": "Zoom in", "0x4F": "Zoom out" }
    - name: channel
      type: enum
      values: { "0x31": "Channel 1", "0x32": "Channel 2" }
    - name: speed
      type: integer
      range: "0x01-0x07 (1-7)"
      description: "Speed percentage; dispensable for stop command (length becomes 0x06)"
  notes: "Retained legacy id; alias of set_camera_zoom (source §2.3.9.4)."

# Frame: Header(0x55) ExtHdr(0xF0) Length Address Action Cmd(2) Params(n) End(0x0D)
# Length = byte count from Address through Parameters. Address 0x01-0xFF (reserved
# for future use; "don't care", examples use 0x01). No checksum (ExtHdr 0xF0).

# --- 2.3.1 Power ---

- id: set_power
  label: Set Power
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x50 0x57 {power} 0x0D"
  params:
    - name: power
      type: enum
      values: { "0x30": "Power off", "0x31": "Power on (NOT supported, hardware limitation)" }


- id: set_standby_wakeup
  label: Set Standby / Wake Up
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x53 0x52 {mode} 0x0D"
  params:
    - name: mode
      type: enum
      values: { "0x31": "Standby", "0x32": "Wake up (active only if in Standby)" }
  notes: "In Standby the station only accepts Get state and Set Standby/Wakeup."

# --- 2.3.2 Record ---

- id: record_start
  label: Set Record Start
  kind: action
  command: "0x55 0xF0 0x04 0x01 0x73 0x52 0x43 0x0D"
  params: []


- id: record_pause
  label: Set Record Pause
  kind: action
  command: "0x55 0xF0 0x04 0x01 0x73 0x50 0x53 0x0D"
  params: []


- id: record_resume
  label: Set Record Resume Pause
  kind: action
  command: "0x55 0xF0 0x04 0x01 0x73 0x52 0x50 0x0D"
  params: []


- id: record_stop
  label: Set Record Stop
  kind: action
  command: "0x55 0xF0 0x04 0x01 0x73 0x53 0x50 0x0D"
  params: []


- id: get_record_state
  label: Get Record State
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x53 0x54 0x0D"
  params: []
  response: "ACK 0x06 frame with param1 in {0x30 Uninitialize,0x31 Ready,0x32 Stopped,0x33 Recording,0x34 Paused,0x35 Waiting,0x36 Stopping,0x37 Standby}; NAK 0x15 on error."

# --- 2.3.3 Theme / Scene ---

- id: set_layout
  label: Set Layout
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x4C 0x4F {layout_id} 0x0D"
  params:
    - name: layout_id
      type: integer
      range: "0x01-0x12 (1-18)"
      description: "Layout ID"


- id: set_background
  label: Set Background
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x42 0x47 {background_id} 0x0D"
  params:
    - name: background_id
      type: integer
      range: "0x00-0x09 (0-9)"
      description: "Background ID; 0x00 = Background off"


- id: set_overlay
  label: Set Overlay
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x4F 0x4C {overlay_id} 0x0D"
  params:
    - name: overlay_id
      type: integer
      range: "0x00-0x1E (0-30)"
      description: "Overlay ID; 0x00 = Overlay off"


- id: set_scene
  label: Set Scene
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x54 0x45 {scene_id} 0x0D"
  params:
    - name: scene_id
      type: integer
      range: "0x01-0x1E (1-30)"
      description: "Scene ID"


- id: set_video_source_id
  label: Set Video Source ID
  kind: action
  command: "0x55 0xF0 0x06 0x01 0x73 0x43 0x48 {channel} {source_id} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Channel 1", "0x32": "Channel 2" }
    - name: source_id
      type: integer
      range: "0x01-0xFF (1-255)"
      description: "ID of channel source. If greater than max available, returns success but no GUI action."


- id: set_macro
  label: Set Macro
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x4D 0x43 {macro} 0x0D"
  params:
    - name: macro
      type: enum
      values: { "0x31": "Macro 1", "0x32": "Macro 2", "0x33": "Macro 3" }


- id: set_intermission_live
  label: Set Intermission / Live
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x49 0x4C {mode} 0x0D"
  params:
    - name: mode
      type: enum
      values: { "0x30": "Live mode", "0x31": "Intermission mode" }


- id: get_layout
  label: Get Layout
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x4C 0x4F 0x0D"
  params: []
  response: "ACK 0x06 with param1 layout ID (0x01-0x12); NAK 0x15 on error."


- id: get_background
  label: Get Background
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x42 0x47 0x0D"
  params: []
  response: "ACK 0x06 with param1 background ID (0x00-0x09; 0x00=off); NAK 0x15 on error."


- id: get_overlay
  label: Get Overlay
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x4F 0x4C 0x0D"
  params: []
  response: "ACK 0x06 with param1 overlay ID (source states 0x00-0x09 here; note set_overlay uses 0x00-0x1E); NAK 0x15 on error."


- id: get_video_source_total
  label: Get Video Source Total Number
  kind: query
  command: "0x55 0xF0 0x05 0x01 0x67 0x43 0x48 {channel} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Channel 1", "0x32": "Channel 2" }
  response: "ACK 0x06 with two params {channel} {total 0x01-0xFF}; NAK 0x15 on error."


- id: get_current_video_source
  label: Get Current Video Source ID
  kind: query
  command: "0x55 0xF0 0x05 0x01 0x67 0x43 0x55 {channel} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Channel 1", "0x32": "Channel 2" }
  response: "ACK 0x06 with two params {channel} {current_index 0x01-0xFF}; NAK 0x15 on error."

# --- 2.3.4 Audio Volume (AV = 0x41 0x56) ---

- id: set_audio_volume_input
  label: Set Audio Volume Input
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x56 0x49 {channel} {volume} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Audio channel 1", "0x32": "Audio channel 2", "0x33": "Audio XLR", "0x34": "Audio Line in & USB" }
    - name: volume
      type: integer
      range: "0x00-0x7D (0-125)"
      description: "Audio volume"


- id: set_audio_volume_output
  label: Set Audio Volume Output
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x56 0x4F {output} {volume} 0x0D"
  params:
    - name: output
      type: enum
      values: { "0x31": "Line & HDMI output", "0x32": "PGM output" }
    - name: volume
      type: integer
      range: "0x00-0x7D (0-125)"
      description: "Audio volume"


- id: get_audio_volume_input
  label: Get Audio Volume Input
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x56 0x49 {channel} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Audio channel 1", "0x32": "Audio channel 2", "0x33": "Audio XLR", "0x34": "Audio Line in & USB" }
  response: "ACK 0x06 with params 0x49 {channel} {volume 0x00-0x7D}; NAK 0x15 on error."


- id: get_audio_volume_output
  label: Get Audio Volume Output
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x56 0x4F {output} 0x0D"
  params:
    - name: output
      type: enum
      values: { "0x31": "Line & HDMI output", "0x32": "PGM output" }
  response: "ACK 0x06 with params 0x4F {output} {volume 0x00-0x7D}; NAK 0x15 on error."

# --- 2.3.5 Audio Mute (AM = 0x41 0x4D) ---

- id: set_audio_mute_input
  label: Set Audio Mute Input
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x4D 0x49 {channel} {mute} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Audio channel 1", "0x32": "Audio channel 2", "0x33": "Audio XLR", "0x34": "Audio Line in & USB" }
    - name: mute
      type: enum
      values: { "0x30": "Audio unmute", "0x31": "Audio mute" }


- id: set_audio_mute_output
  label: Set Audio Mute Output
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x4D 0x4F {output} {mute} 0x0D"
  params:
    - name: output
      type: enum
      values: { "0x31": "Line & HDMI output", "0x32": "PGM output" }
    - name: mute
      type: enum
      values: { "0x30": "Audio unmute", "0x31": "Audio mute" }


- id: get_audio_mute_input
  label: Get Audio Mute Input
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x4D 0x49 {channel} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Audio channel 1", "0x32": "Audio channel 2", "0x33": "Audio XLR", "0x34": "Audio Line in & USB" }
  response: "ACK 0x06 with params 0x49 {channel} {mute 0x30 unmute|0x31 mute}; NAK 0x15 on error."


- id: get_audio_mute_output
  label: Get Audio Mute Output
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x4D 0x4F {output} 0x0D"
  params:
    - name: output
      type: enum
      values: { "0x31": "Line & HDMI output", "0x32": "PGM output" }
  response: "ACK 0x06 with params 0x4F {output} {mute 0x30 unmute|0x31 mute}; NAK 0x15 on error."

# --- 2.3.6 Audio Type (AT = 0x41 0x54) ---

- id: set_audio_type_input
  label: Set Audio Type Input
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x54 0x49 {channel} {type} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Audio channel 1 (only 0x33/0x36/0x3a)", "0x32": "Audio channel 2 (only 0x33/0x36/0x3a)", "0x33": "Audio channel 3 / XLR (only 0x37/0x38)", "0x34": "Audio channel 4 / Line in & USB (only 0x31/0x32/0x39)" }
    - name: type
      type: enum
      values: { "0x31": "Line in", "0x32": "Mic in", "0x33": "HDMI / SDI", "0x36": "IP Audio", "0x37": "XLR-Line", "0x38": "XLR-Mic", "0x39": "USB Audio", "0x3a": "Follow" }


- id: set_audio_type_output
  label: Set Audio Type Output
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x41 0x54 0x4F 0x31 {type} 0x0D"
  params:
    - name: type
      type: enum
      values: { "0x31": "ALL", "0x32": "Line out + PGM", "0x33": "MultiView" }


- id: get_audio_type_input
  label: Get Audio Type Input
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x54 0x49 {channel} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Audio channel 1", "0x32": "Audio channel 2", "0x33": "Audio XLR", "0x34": "Audio Line in & USB" }
  response: "ACK 0x06 with params 0x49 {channel} {type 0x31/0x32/0x33/0x36/0x37/0x38/0x39/0x3a}; NAK 0x15 on error."


- id: get_audio_type_output
  label: Get Audio Type Output
  kind: query
  command: "0x55 0xF0 0x06 0x01 0x67 0x41 0x54 0x4F 0x31 0x0D"
  params: []
  response: "ACK 0x06 with params 0x4F 0x31 {type 0x31 ALL|0x32 Line out+PGM|0x33 MultiView}; NAK 0x15 on error."

# --- 2.3.7 Audio XLR (XC = 0x58 0x43, XP = 0x58 0x50) ---

- id: set_audio_xlr_channel
  label: Set Audio XLR Channel Mode
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x58 0x43 {mode} 0x0D"
  params:
    - name: mode
      type: enum
      values: { "0x30": "Stereo", "0x31": "Mono" }


- id: set_audio_xlr_power
  label: Set Audio XLR Power
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x58 0x50 {power} 0x0D"
  params:
    - name: power
      type: enum
      values: { "0x30": "XLR power off", "0x31": "XLR power left", "0x32": "XLR power right", "0x33": "XLR power left right" }


- id: get_audio_xlr_channel
  label: Get Audio XLR Channel Mode
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x58 0x43 0x0D"
  params: []
  response: "ACK 0x06 with param1 {0x30 Stereo|0x31 Mono}; NAK 0x15 on error."


- id: get_audio_xlr_power
  label: Get Audio XLR Power
  kind: query
  command: "0x55 0xF0 0x04 0x01 0x67 0x58 0x50 0x0D"
  params: []
  response: "ACK 0x06 with param1 {0x30 off|0x31 left|0x32 right|0x33 left right}; NAK 0x15 on error."

# --- 2.3.8 Stream (SC = 0x53 0x43) ---

- id: set_stream
  label: Set Stream
  kind: action
  command: "0x55 0xF0 0x06 0x01 0x73 0x53 0x43 {stream} {control} 0x0D"
  params:
    - name: stream
      type: enum
      values: { "0x31": "Stream 1", "0x32": "Stream 2", "0x33": "Stream 3" }
    - name: control
      type: enum
      values: { "0x01": "Stop Stream", "0x02": "Start Stream" }


- id: get_stream
  label: Get Stream
  kind: query
  command: "0x55 0xF0 0x05 0x01 0x67 0x53 0x43 {stream} 0x0D"
  params:
    - name: stream
      type: enum
      values: { "0x31": "Stream 1", "0x32": "Stream 2", "0x33": "Stream 3" }
  response: "ACK 0x06 with two params {stream} {state 0x00 Sync|0x01 Ready(enable)|0x02 Streaming(enable)|0x04 Off}; NAK 0x15 on error."

# --- 2.3.9 Camera ---

- id: set_camera_preset
  label: Set Camera Preset (Recall)
  kind: action
  command: "0x55 0xF0 0x06 0x01 0x73 0x43 0x50 {channel} {preset} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Channel 1", "0x32": "Channel 2" }
    - name: preset
      type: integer
      range: "0x01-0x09 (1-9)"
      description: "Preset ID; sends channel camera to preset"


- id: set_camera_save_preset
  label: Set Camera Save Preset
  kind: action
  command: "0x55 0xF0 0x06 0x01 0x73 0x43 0x53 {channel} {preset} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Channel 1", "0x32": "Channel 2" }
    - name: preset
      type: integer
      range: "0x01-0x09 (1-9)"
      description: "Preset ID to save"


- id: set_camera_move
  label: Set Camera Move
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x43 0x4D {direction} {channel} {speed} 0x0D"
  params:
    - name: direction
      type: enum
      values: { "0x53": "Stop move", "0x55": "Move up", "0x44": "Move down", "0x4C": "Move left", "0x52": "Move right" }
    - name: channel
      type: enum
      values: { "0x31": "Channel 1", "0x32": "Channel 2" }
    - name: speed
      type: integer
      range: "0x01-0x18 (1-24)"
      description: "Speed percentage; dispensable for stop command (length becomes 0x06)"


- id: set_camera_zoom
  label: Set Camera Zoom
  kind: action
  command: "0x55 0xF0 0x07 0x01 0x73 0x43 0x5A {zoom} {channel} {speed} 0x0D"
  params:
    - name: zoom
      type: enum
      values: { "0x53": "Stop zoom", "0x49": "Zoom in", "0x4F": "Zoom out" }
    - name: channel
      type: enum
      values: { "0x31": "Channel 1", "0x32": "Channel 2" }
    - name: speed
      type: integer
      range: "0x01-0x07 (1-7)"
      description: "Speed percentage; dispensable for stop command (length becomes 0x06)"


- id: set_camera_tracking
  label: Set Camera Tracking On/Off
  kind: action
  command: "0x55 0xF0 0x06 0x01 0x73 0x43 0x52 {channel} {tracking} 0x0D"
  params:
    - name: channel
      type: enum
      values: { "0x31": "Channel 1", "0x32": "Channel 2" }
    - name: tracking
      type: enum
      values: { "0x30": "ON", "0x31": "OFF" }

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


- id: set_backup_to_usb
  label: Set Backup to USB
  kind: action
  command: "0x55 0xF0 0x05 0x01 0x73 0x42 0x55 {control} 0x0D"
  params:
    - name: control
      type: enum
      values: { "0x30": "Start backup to USB", "0x31": "Stop backup to USB" }
```

## Feedbacks
```yaml

```

## Variables
```yaml
# Settable parameters are represented as discrete Set actions (see Actions).
# No additional free-standing variables documented.
# UNRESOLVED: source defines no parameters outside the command set.
```

## Events
```yaml
# Unsolicited notifications from the Media Station (header 0x23 = ASCII '#').
# Frame: Header(0x23) EventCode(2) Params(n) End(0x0D).
- id: notify_media_state
  label: Ntfy Media State
  command: "0x23 0x53 0x54 {state} 0x0D"
  params:
    - name: state
      type: enum
      values: ["0x30 Uninitialize", "0x31 Ready", "0x32 Stopped", "0x33 Recording", "0x34 Paused", "0x35 Waiting", "0x36 Stopping", "0x37 Standby", "0x38 Reboot (only when previous state was Standby)"]
  notes: "Sent on system state change (e.g. entering recording). State codes mirror Get Record State plus 0x38 Reboot."
```

## Macros
```yaml
# "Macro 1/2/3" here is a device feature recalled via set_macro (see Actions),
# not a host-side command sequence.
# UNRESOLVED: source documents no multi-step host macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "In Standby mode the station only accepts 'Get state' (ST) and 'Set Standby/Wakeup' (SR) commands (source §2.3.1.2)."
  - "Commands are NOT accepted during media station boot-up (source §4 Note)."
  - "Power On (param 0x31) is NOT supported due to hardware limitation; only Power Off (0x30) works (source §2.3.1.1)."
  - "Set Video Source ID greater than max available returns success but performs no GUI action (source §2.3.3.5)."
# UNRESOLVED: source does not specify authentication requirements or a password procedure.
```

## Notes
- **No checksum:** extended header `0xF0` means the frame carries no checksum byte (source §2.2). `0xF0` appears in *every* frame's Extended Header field — it is not itself a command or a "Get Status" opcode.
- **Address field** (`0x01`–`0xFF`, 0 reserved) is reserved for future use ("don't care"); examples use `0x01`.
- **Shared command codes:** `AV` (0x41 0x56), `AM` (0x41 0x4D), and `AT` (0x41 0x54) are each shared by Input/Output variants distinguished by the I/O byte (`0x49` input / `0x4F` output). `CH` (0x43 0x48) is shared by Set Video Source ID and Get Video Source Total Number. `ST` (0x53 0x54) is shared by Get Record State (action 0x67) and the Ntfy Media State event (header 0x23).
- **RS-485** uses the same serial config and frame format on the lower port (differential T/R+ / T/R-); RS-232 uses the upper port (GND/RX/TX).
- **TCP** connection persists and delivers event notifications until a new connection is established.
- **Authentication:** UNRESOLVED; omission of a login procedure from the command set does not establish that authentication is absent.
- **Doc inconsistency:** Set Overlay range is 0x00–0x1E but Get Overlay response is documented as 0x00–0x09 — captured verbatim per command.
- **Firmware:** history table associates FW `VLW102` with the v1.0 (LC100) release; no full compatibility range stated.

<!-- UNRESOLVED: electrical/power ratings, fault/error recovery sequences, and firmware-version compatibility matrix are not stated in the source. -->
<!-- UNRESOLVED: exact meaning of "Ndihx" in the device name not present in the source document (doc title is "LC100_LC100N"). -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS165%20-%20LC100_LC100N%20RS-232%20command%20set.pdf"
retrieved_at: 2026-07-15T06:19:16.176Z
last_checked_at: 2026-10-07T12:50:30.927Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:50:30.927Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 action units (45 documented commands plus 7 legacy-id aliases) match source codes and shapes, transport values are supported, and the spec covers the full catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "document only provides command set; no electrical ratings, no firmware-version compatibility matrix beyond the v1.0 note."
- "no HTTP/REST base URL in source"
- "source defines no parameters outside the command set."
- "source documents no multi-step host macro sequences."
- "source does not specify authentication requirements or a password procedure."
- "electrical/power ratings, fault/error recovery sequences, and firmware-version compatibility matrix are not stated in the source."
- "exact meaning of \"Ndihx\" in the device name not present in the source document (doc title is \"LC100_LC100N\")."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
