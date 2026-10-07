---
spec_id: admin/lumens-lc100-media-processor
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens LC100 Media Processor Control Spec"
manufacturer: Lumens
model_family: LC100
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - LC100
    - LC100N
    - LC100A
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS165%20-%20LC100_LC100N_LC100A%20RS-232%20command%20set_1_5.pdf"
  - "https://www.mylumens.com/en/Downloads/4?id2=8&keyword=LC100"
retrieved_at: 2026-07-14T06:32:28.586Z
last_checked_at: 2026-10-07T13:25:03.890Z
generated_at: 2026-10-07T13:25:03.890Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "no settable continuous parameters distinct from Actions above;"
  - "no multi-step sequences described explicitly in source"
  - "no power-on sequencing requirements beyond boot-up note stated"
  - "RS-485-specific electrical specs (beyond pinout T/R+/T/R-) not detailed"
  - "address field usage \"reserved for future use\" — no multi-device addressing scheme or default address documented"
  - "Set Audio Type Input example uses channel 0x31 with type 0x31, contradicting the channel availability table; the definitions preserve the table restrictions without treating the example as a default."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:25:03.890Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 action units match source frames and opcodes; transport matches; spec covers all 46 documented commands (6 aliases duplicate documented ones). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Lumens LC100 Media Processor Control Spec

## Summary
Lumens LC100/LC100N/LC100A media processor (record/stream/scene device). Controlled via RS-232, RS-485, or TCP. Binary frame protocol: header `0x55`, ext header `0xF0`, length, address, action (`0x67` Get / `0x73` Set / `0x06` ACK / `0x15` NAK), 2-byte command, params, end `0x0D`. Covers power, record, layout/scene, audio vol/mute/type, XLR, stream, camera PTZ/preset/tracking, snapshot/bookmark/backup. Authentication requirements are UNRESOLVED; the source does not specify an authentication procedure.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
  type: UNRESOLVED  # authentication requirements not specified in source
```

Notes: Serial covers both RS-232 (upper port: GND/RX/TX) and RS-485 (lower port: GND/T/R+/T/R-). TCP connects via WAN/LAN RJ-45. Address field range `0x01`~`0xFF` (reserved for future use; examples use `0x01`). Length byte counts address→params. The absence of a documented authentication procedure does not establish that authentication is unnecessary.

## Traits
```yaml
traits:
  - powerable       # inferred: Set Power / Standby-Wakeup commands
  - queryable       # inferred: many Get (0x67) query commands
  - levelable       # inferred: audio volume set/get (0x00~0x7D)
  - routable        # inferred: video source select / audio routing
```

## Actions
```yaml
# These preserved IDs originally contained parameter-table cells rather than frames.
# Their corrected definitions are aliases of documented commands below.

- id: 1_2_3_4_audio_channel_1_audio_channel_2_audio_xlr_audio_line_in_&_usb
  label: Set Audio Vol Input
  kind: action
  command: "55 F0 07 01 73 41 56 49 {p2} {p3} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Audio ch1; 0x32=Audio ch2; 0x33=Audio XLR; 0x34=Audio Line in & USB"
    - name: p3
      type: integer
      description: "Audio volume 0x00~0x7D (0~125)"

- id: command_response_parameter_2_1_2_3_4_audio_channel_1_audio_channel_2_audio_xlr_audio_line_in_&_usb
  label: Get Audio Vol Input
  kind: query
  command: "55 F0 06 01 67 41 56 49 {p2} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Audio ch1; 0x32=Audio ch2; 0x33=Audio XLR; 0x34=Audio Line in & USB"

- id: parameter_2_1_2_3_4_audio_channel_1_audio_channel_2_audio_xlr_audio_line_in_&_usb
  label: Set Audio Mute Input
  kind: action
  command: "55 F0 07 01 73 41 4D 49 {p2} {p3} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Audio ch1; 0x32=Audio ch2; 0x33=Audio XLR; 0x34=Audio Line in & USB"
    - name: p3
      type: enum
      description: "0x30=unmute; 0x31=mute"

- id: parameter_2_1_2_3_4_audio_channel_1,_only_available_0x33_&_0x36_&_0x3a_audio_channel_2,_only_available_0x33_&_0x36_&_0x3a_audio_channel_3,_only_available_0x37_&_0x38_audio_channel_4,_only_available_0x31_&_0x32_&_0x39
  label: Set Audio Type Input
  kind: action
  command: "55 F0 07 01 73 41 54 49 {p2} {p3} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Audio ch1 (only 0x33/0x36/0x3a); 0x32=Audio ch2 (only 0x33/0x36/0x3a); 0x33=Audio ch3 (only 0x37/0x38); 0x34=Audio ch4 (only 0x31/0x32/0x39)"
    - name: p3
      type: enum
      description: "0x31=Line in; 0x32=Mic in; 0x33=HDMI/SDI; 0x36=IP Audio; 0x37=XLR-Line; 0x38=XLR-Mic; 0x39=USB Audio; 0x3a=Follow"

- id: parameter_1_s_u_d_l_r_camera_stop_move_camera_move_up_camera_move_down_camera_move_left_camera_move_right
  label: Set Camera Move
  kind: action
  command: "55 F0 07 01 73 43 4D {p1} {p2} {p3} 0D"
  params:
    - name: p1
      type: enum
      description: "0x53=Stop; 0x55=Up; 0x44=Down; 0x4C=Left; 0x52=Right"
    - name: p2
      type: enum
      description: "0x31=Channel 1; 0x32=Channel 2"
    - name: p3
      type: integer
      description: "Speed percent 0x01~0x18 (dispensable in stop command)"

- id: parameter_1_s_i_o_camera_stop_zoom_camera_zoom_in_camera_zoom_out
  label: Set Camera Zoom
  kind: action
  command: "55 F0 07 01 73 43 5A {p1} {p2} {p3} 0D"
  params:
    - name: p1
      type: enum
      description: "0x53=Stop zoom; 0x49=Zoom in; 0x4F=Zoom out"
    - name: p2
      type: enum
      description: "0x31=Channel 1; 0x32=Channel 2"
    - name: p3
      type: integer
      description: "Speed percent 0x01~0x07 (dispensable in stop command)"

# Frames are parameterized from source command definitions and examples.
# Set action=0x73, Get action=0x67 unless noted.
# Address 0x01 is the source example value, not a documented default.

# --- 2.3.1 Power ---

- id: set_power
  label: Set Power
  kind: action
  command: "55 F0 05 01 73 50 57 {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x30=Power off; 0x31=Power on (NOT supported, hardware limitation)"


- id: set_standby_wakeup
  label: Set Standby / Wake up
  kind: action
  command: "55 F0 05 01 73 53 52 {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x31=Standby (only accepts Get state + Set Standby/Wakeup); 0x32=Wake up (active only if was Standby)"

# --- 2.3.2 Record ---

- id: set_record_start
  label: Set Record Start
  kind: action
  command: "55 F0 04 01 73 52 43 0D"
  params: []


- id: set_record_pause
  label: Set Record Pause
  kind: action
  command: "55 F0 04 01 73 50 53 0D"
  params: []


- id: set_record_resume
  label: Set Record Resume Pause
  kind: action
  command: "55 F0 04 01 73 52 50 0D"
  params: []


- id: set_record_stop
  label: Set Record Stop
  kind: action
  command: "55 F0 04 01 73 53 50 0D"
  params: []


- id: get_record_state
  label: Get Record State
  kind: query
  command: "55 F0 04 01 67 53 54 0D"
  params: []

# --- 2.3.3 Theme / Scene ---

- id: set_layout
  label: Set Layout
  kind: action
  command: "55 F0 05 01 73 4C 4F {p1} 0D"
  params:
    - name: p1
      type: integer
      description: "Layout ID 0x01~0x12"


- id: set_background
  label: Set Background
  kind: action
  command: "55 F0 05 01 73 42 47 {p1} 0D"
  params:
    - name: p1
      type: integer
      description: "Background ID 0x00~0x09 (0x00=off)"


- id: set_overlay
  label: Set Overlay
  kind: action
  command: "55 F0 05 01 73 4F 4C {p1} 0D"
  params:
    - name: p1
      type: integer
      description: "Overlay ID 0x00~0x1E (0x00=off)"


- id: set_scene
  label: Set Scene
  kind: action
  command: "55 F0 05 01 73 54 45 {p1} 0D"
  params:
    - name: p1
      type: integer
      description: "Scene ID 0x01~0x1E"


- id: set_video_source
  label: Set Video Source ID
  kind: action
  command: "55 F0 06 01 73 43 48 {p1} {p2} 0D"
  params:
    - name: p1
      type: enum
      description: "0x31=Channel 1; 0x32=Channel 2"
    - name: p2
      type: integer
      description: "Source ID 0x01~0xFF (HDMI=01, SDI=02, USB=03, IP=04 onward). If > max stream source, returns success but no GUI action."


- id: set_macro
  label: Set Macro
  kind: action
  command: "55 F0 05 01 73 4D 43 {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x31=Macro 1; 0x32=Macro 2; 0x33=Macro 3 (scene and camera preset control)"


- id: set_intermission_live
  label: Set Intermission and Live
  kind: action
  command: "55 F0 05 01 73 49 4C {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x30=Live mode; 0x31=Intermission mode"


- id: set_layout_swap
  label: Set Layout Swap
  kind: action
  command: "55 F0 04 01 73 4C 53 0D"
  params: []


- id: get_layout
  label: Get Layout
  kind: query
  command: "55 F0 04 01 67 4C 4F 0D"
  params: []


- id: get_background
  label: Get Background
  kind: query
  command: "55 F0 04 01 67 42 47 0D"
  params: []


- id: get_overlay
  label: Get Overlay
  kind: query
  command: "55 F0 04 01 67 4F 4C 0D"
  params: []


- id: get_video_source_total
  label: Get Video Source Total Number
  kind: query
  command: "55 F0 05 01 67 43 48 {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x31=Channel 1; 0x32=Channel 2"


- id: get_current_video_source
  label: Get Current Video Source ID
  kind: query
  command: "55 F0 05 01 67 43 55 {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x31=Channel 1; 0x32=Channel 2"

# --- 2.3.4 Audio Volume ---

- id: set_audio_vol_input
  label: Set Audio Vol Input
  kind: action
  command: "55 F0 07 01 73 41 56 49 {p2} {p3} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Audio ch1; 0x32=Audio ch2; 0x33=Audio XLR; 0x34=Audio Line in & USB"
    - name: p3
      type: integer
      description: "Audio volume 0x00~0x7D (0~125)"


- id: set_audio_vol_output
  label: Set Audio Vol Output
  kind: action
  command: "55 F0 07 01 73 41 56 4F {p2} {p3} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Line & HDMI output; 0x32=PGM output"
    - name: p3
      type: integer
      description: "Audio volume 0x00~0x7D (0~125)"


- id: get_audio_vol_input
  label: Get Audio Vol Input
  kind: query
  command: "55 F0 06 01 67 41 56 49 {p2} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Audio ch1; 0x32=Audio ch2; 0x33=Audio XLR; 0x34=Audio Line in & USB"


- id: get_audio_vol_output
  label: Get Audio Vol Output
  kind: query
  command: "55 F0 06 01 67 41 56 4F {p2} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Line & HDMI output; 0x32=PGM output"

# --- 2.3.5 Audio Mute ---

- id: set_audio_mute_input
  label: Set Audio Mute Input
  kind: action
  command: "55 F0 07 01 73 41 4D 49 {p2} {p3} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Audio ch1; 0x32=Audio ch2; 0x33=Audio XLR; 0x34=Audio Line in & USB"
    - name: p3
      type: enum
      description: "0x30=unmute; 0x31=mute"


- id: set_audio_mute_output
  label: Set Audio Mute Output
  kind: action
  command: "55 F0 07 01 73 41 4D 4F {p2} {p3} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Line & HDMI output; 0x32=PGM output"
    - name: p3
      type: enum
      description: "0x30=unmute; 0x31=mute"


- id: get_audio_mute_input
  label: Get Audio Mute Input
  kind: query
  command: "55 F0 06 01 67 41 4D 49 {p2} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Audio ch1; 0x32=Audio ch2; 0x33=Audio XLR; 0x34=Audio Line in & USB"


- id: get_audio_mute_output
  label: Get Audio Mute Output
  kind: query
  command: "55 F0 06 01 67 41 4D 4F {p2} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Line & HDMI output; 0x32=PGM output"

# --- 2.3.6 Audio Type ---

- id: set_audio_type_input
  label: Set Audio Type Input
  kind: action
  command: "55 F0 07 01 73 41 54 49 {p2} {p3} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Audio ch1 (only 0x33/0x36/0x3a); 0x32=Audio ch2 (only 0x33/0x36/0x3a); 0x33=Audio ch3 (only 0x37/0x38); 0x34=Audio ch4 (only 0x31/0x32/0x39)"
    - name: p3
      type: enum
      description: "0x31=Line in; 0x32=Mic in; 0x33=HDMI/SDI; 0x36=IP Audio; 0x37=XLR-Line; 0x38=XLR-Mic; 0x39=USB Audio; 0x3a=Follow"


- id: set_audio_type_output
  label: Set Audio Type Output
  kind: action
  command: "55 F0 07 01 73 41 54 4F 31 {p3} 0D"
  params:
    - name: p3
      type: enum
      description: "0x31=ALL; 0x32=Line out + PGM; 0x33=MultiView"


- id: get_audio_type_input
  label: Get Audio Type Input
  kind: query
  command: "55 F0 06 01 67 41 54 49 {p2} 0D"
  params:
    - name: p2
      type: enum
      description: "0x31=Audio ch1; 0x32=Audio ch2; 0x33=Audio XLR; 0x34=Audio Line in & USB"


- id: get_audio_type_output
  label: Get Audio Type Output
  kind: query
  command: "55 F0 06 01 67 41 54 4F 31 0D"
  params: []

# --- 2.3.7 Audio XLR ---

- id: set_audio_xlr_channel
  label: Set Audio XLR Channel
  kind: action
  command: "55 F0 05 01 73 58 43 {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x30=Stereo; 0x31=Mono"


- id: set_audio_xlr_power
  label: Set Audio XLR Power
  kind: action
  command: "55 F0 05 01 73 58 50 {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x30=XLR power off; 0x31=XLR power on"


- id: get_audio_xlr_channel
  label: Get Audio XLR Channel
  kind: query
  command: "55 F0 04 01 67 58 43 0D"
  params: []


- id: get_audio_xlr_power
  label: Get Audio XLR Power
  kind: query
  command: "55 F0 04 01 67 58 50 0D"
  params: []

# --- 2.3.8 Stream ---

- id: set_stream
  label: Set Stream
  kind: action
  command: "55 F0 06 01 73 53 43 {p1} {p2} 0D"
  params:
    - name: p1
      type: enum
      description: "0x31=Stream 1; 0x32=Stream 2; 0x33=Stream 3"
    - name: p2
      type: enum
      description: "0x01=Stop Stream; 0x02=Start Stream"


- id: get_stream
  label: Get Stream
  kind: query
  command: "55 F0 05 01 67 53 43 {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x31=Stream 1; 0x32=Stream 2; 0x33=Stream 3"

# --- 2.3.9 Camera ---

- id: set_camera_preset
  label: Set Camera Preset
  kind: action
  command: "55 F0 06 01 73 43 50 {p1} {p2} 0D"
  params:
    - name: p1
      type: enum
      description: "0x31=Channel 1; 0x32=Channel 2"
    - name: p2
      type: integer
      description: "Preset ID 0x01~0x09"


- id: set_camera_save_preset
  label: Set Camera Save Preset
  kind: action
  command: "55 F0 06 01 73 43 53 {p1} {p2} 0D"
  params:
    - name: p1
      type: enum
      description: "0x31=Channel 1; 0x32=Channel 2"
    - name: p2
      type: integer
      description: "Preset ID 0x01~0x09"


- id: set_camera_move
  label: Set Camera Move
  kind: action
  command: "55 F0 07 01 73 43 4D {p1} {p2} {p3} 0D"
  params:
    - name: p1
      type: enum
      description: "0x53=Stop; 0x55=Up; 0x44=Down; 0x4C=Left; 0x52=Right"
    - name: p2
      type: enum
      description: "0x31=Channel 1; 0x32=Channel 2"
    - name: p3
      type: integer
      description: "Speed percent 0x01~0x18 (dispensable in stop command)"


- id: set_camera_zoom
  label: Set Camera Zoom
  kind: action
  command: "55 F0 07 01 73 43 5A {p1} {p2} {p3} 0D"
  params:
    - name: p1
      type: enum
      description: "0x53=Stop zoom; 0x49=Zoom in; 0x4F=Zoom out"
    - name: p2
      type: enum
      description: "0x31=Channel 1; 0x32=Channel 2"
    - name: p3
      type: integer
      description: "Speed percent 0x01~0x07 (dispensable in stop command)"


- id: set_camera_tracking
  label: Set Camera Tracking On/Off
  kind: action
  command: "55 F0 06 01 73 43 52 {p1} {p2} 0D"
  params:
    - name: p1
      type: enum
      description: "0x31=Channel 1; 0x32=Channel 2"
    - name: p2
      type: enum
      description: "0x30=ON; 0x31=OFF"

# --- 2.3.10 Others ---

- id: set_snapshot
  label: Set Snapshot
  kind: action
  command: "55 F0 04 01 73 53 53 0D"
  params: []


- id: set_bookmark
  label: Set Bookmark
  kind: action
  command: "55 F0 04 01 73 42 4D 0D"
  params: []


- id: set_backup_usb
  label: Set Backup to USB
  kind: action
  command: "55 F0 05 01 73 42 55 {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x30=Start backup to USB; 0x31=Stop backup to USB"
```

## Feedbacks
```yaml

```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters distinct from Actions above;
# audio volume is represented as set_audio_vol_input/output actions.
```

## Events
```yaml
# Unsolicited notifications from media station. Format: 0x23 | EventCode(2) | Params | 0x0D
- id: ntfy_media_state
  label: Ntfy Media State
  type: event
  command: "23 53 54 {p1} 0D"
  params:
    - name: p1
      type: enum
      description: "0x30=Uninitialize; 0x31=Ready; 0x32=Stopped; 0x33=Recording; 0x34=Paused; 0x35=Waiting; 0x36=Stopping; 0x37=Standby; 0x38=Reboot (only available when state was Standby)"
  description: "System state change notification (e.g. entering recording state). Codes 0x30 through 0x37 match Get Record State; the event table additionally documents 0x38=Reboot."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Commands are not accepted during media station boot-up."
  - "In Standby mode, only 'Get state' and 'Set Standby/Wakeup' commands are accepted."
# UNRESOLVED: no power-on sequencing requirements beyond boot-up note stated
```

## Notes
- Document revision: 4.0 (2025/06/30). Covers LC100, LC100N, LC100A models.
- Set Power on (`0x31`) is NOT supported due to hardware limitation; only Power off (`0x30`) works.
- Wake up (`SR 0x32`) active only if power mode was Standby.
- Set Video Source: if param2 (source ID) exceeds max stream source ID, device returns success but takes no GUI action.
- For TCP: "If connection is not closed by client, connection will keep and get event notification until new connection established."
- Length byte = byte count from Address through Parameters field.
- ACK/NAK are returned by replacing the Action byte in the echoed received frame; invalid protocol data returns NAK code + End code only.
- Authentication requirements are UNRESOLVED; the source does not specify them.
- The retained parameter-table IDs are aliases of documented audio and camera operations, not additional vendor commands.
- The removed `1_2_3` entry was a macro parameter list, not a command; its values remain in `set_macro`.
- The removed output-routing parameter entries describe `0x31=ALL`, `0x32=Line out + PGM`, and `0x33=MultiView`; these values remain in `set_audio_type_output`.
- The removed stream selector entry describes `0x31=Stream 1`, `0x32=Stream 2`, and `0x33=Stream 3`; these values remain in `set_stream` and `get_stream`.
- The removed stream status entry contains response values, not commands. `get_stream` response parameter 2 is `0x00=Sync`, `0x01=Ready (enable)`, `0x02=Streaming (enable)`, or `0x04=Off`.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RS-485-specific electrical specs (beyond pinout T/R+/T/R-) not detailed -->
<!-- UNRESOLVED: address field usage "reserved for future use" — no multi-device addressing scheme or default address documented -->
<!-- UNRESOLVED: Set Audio Type Input example uses channel 0x31 with type 0x31, contradicting the channel availability table; the definitions preserve the table restrictions without treating the example as a default. -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS165%20-%20LC100_LC100N_LC100A%20RS-232%20command%20set_1_5.pdf"
  - "https://www.mylumens.com/en/Downloads/4?id2=8&keyword=LC100"
retrieved_at: 2026-07-14T06:32:28.586Z
last_checked_at: 2026-10-07T13:25:03.890Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:25:03.890Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 action units match source frames and opcodes; transport matches; spec covers all 46 documented commands (6 aliases duplicate documented ones). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "no settable continuous parameters distinct from Actions above;"
- "no multi-step sequences described explicitly in source"
- "no power-on sequencing requirements beyond boot-up note stated"
- "RS-485-specific electrical specs (beyond pinout T/R+/T/R-) not detailed"
- "address field usage \"reserved for future use\" — no multi-device addressing scheme or default address documented"
- "Set Audio Type Input example uses channel 0x31 with type 0x31, contradicting the channel availability table; the definitions preserve the table restrictions without treating the example as a default."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
