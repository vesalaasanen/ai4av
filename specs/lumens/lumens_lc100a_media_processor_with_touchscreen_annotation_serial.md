---
spec_id: admin/lumens-lc100a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens LC100 / LC100N / LC100A RS-232 Command Set"
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
retrieved_at: 2026-07-14T06:28:28.252Z
last_checked_at: 2026-10-07T13:06:42.445Z
generated_at: 2026-10-07T13:06:42.445Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source does not describe an authentication procedure or establish that authentication is absent."
  - "firmware version compatibility ranges not fully stated; revision 4.0 corresponds to v1.1.0.29 but per-feature FW requirements not enumerated."
  - "the source example selects channel 1 with type 0x31, contradicting its channel-availability table. No default channel/type pair is established.\""
  - "the source does not explain the difference.\""
  - "the Set Audio Type Input example specifies channel 1 with type 0x31, while the same section restricts channel 1 to 0x33, 0x36 and 0x3A. The parameter restrictions are preserved, and the contradictory example is not assigned as a command value or default."
  - "firmware version compatibility for individual commands not stated; per-feature FW gates not documented."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:06:42.445Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 action units match source frames and parameters; transport 9600/8/N/1 and port 5080 confirmed; spec covers essentially all 46 source commands. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Lumens LC100 / LC100N / LC100A RS-232 Command Set

## Summary
RS-232 / RS-485 / TCP control protocol for the Lumens LC100, LC100N and LC100A media processors (revision 4.0, 2025/06/30). Frame format: `0x55 0xF0 Length Address Action Command Parameters 0x0D` with Action byte 0x67=Get, 0x73=Set, 0x06=ACK, 0x15=NAK. TCP port 5080; serial 9600/8/N/1, no flow control. Authentication is UNRESOLVED: the source does not describe an authentication procedure or establish that authentication is absent.

<!-- UNRESOLVED: firmware version compatibility ranges not fully stated; revision 4.0 corresponds to v1.1.0.29 but per-feature FW requirements not enumerated. -->

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
  type: UNRESOLVED  # Source does not establish authentication requirements.
```

## Traits
```yaml
- powerable       # inferred from PW, SR (standby/wakeup) command examples
- routable        # inferred from input channel / stream / macro / intermission switching commands
- queryable       # inferred from extensive Get-state commands
- levelable       # inferred from AV (audio volume) commands
```

## Actions
```yaml
# Repaired table-fragment entries retain their existing, non-exempted IDs.
# Two-letter command values are vendor mnemonics; see Notes for frame encoding.

- id: 1_2_3_4_audio_channel_1_audio_channel_2_audio_xlr_audio_line_in_&_usb
  label: Set Audio Vol Input
  kind: action
  command: "AV"
  params:
    - name: direction
      type: enum
      description: "Required input selector byte: 0x49 (ASCII I)."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Audio channel 1, 0x32=Audio channel 2, 0x33=Audio XLR, 0x34=Audio Line in & USB."
    - name: volume
      type: integer
      description: "Raw volume byte, 0x00~0x7D (0..125)."

- id: command_response_parameter_2_1_2_3_4_audio_channel_1_audio_channel_2_audio_xlr_audio_line_in_&_usb
  label: Get Audio Vol Input
  kind: query
  command: "AV"
  params:
    - name: direction
      type: enum
      description: "Required input selector byte: 0x49 (ASCII I)."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Audio channel 1, 0x32=Audio channel 2, 0x33=Audio XLR, 0x34=Audio Line in & USB."
  notes: "ACK parameters are direction, channel, volume; volume is 0x00~0x7D. NAK parameters echo direction and channel."

- id: parameter_2_1_2_3_4_audio_channel_1_audio_channel_2_audio_xlr_audio_line_in_&_usb
  label: Set Audio Mute Input
  kind: action
  command: "AM"
  params:
    - name: direction
      type: enum
      description: "Required input selector byte: 0x49 (ASCII I)."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Audio channel 1, 0x32=Audio channel 2, 0x33=Audio XLR, 0x34=Audio Line in & USB."
    - name: mute
      type: enum
      description: "Encoded byte: 0x30=Audio unmute, 0x31=Audio mute."

- id: parameter_2_1_2_3_4_audio_channel_1,_only_available_0x33_&_0x36_&_0x3a_audio_channel_2,_only_available_0x33_&_0x36_&_0x3a_audio_channel_3,_only_available_0x37_&_0x38_audio_channel_4,_only_available_0x31_&_0x32_&_0x39
  label: Set Audio Type Input
  kind: action
  command: "AT"
  params:
    - name: direction
      type: enum
      description: "Required input selector byte: 0x49 (ASCII I)."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Audio channel 1, 0x32=Audio channel 2, 0x33=Audio channel 3 (XLR), 0x34=Audio channel 4 (Line in & USB)."
    - name: audio_type
      type: enum
      description: "Encoded byte: 0x31=Line in, 0x32=Mic in, 0x33=HDMI / SDI, 0x36=IP Audio, 0x37=XLR-Line, 0x38=XLR-Mic, 0x39=USB Audio, 0x3A=Follow. Channels 1 and 2 allow only 0x33, 0x36, 0x3A; channel 3 allows only 0x37, 0x38; channel 4 allows only 0x31, 0x32, 0x39."
  notes: "UNRESOLVED: the source example selects channel 1 with type 0x31, contradicting its channel-availability table. No default channel/type pair is established."

- id: parameter_1_s_u_d_l_r_camera_stop_move_camera_move_up_camera_move_down_camera_move_left_camera_move_right
  label: Set Camera Move
  kind: action
  command: "CM"
  params:
    - name: direction
      type: enum
      description: "Encoded byte: 0x53=S=Stop, 0x55=U=Up, 0x44=D=Down, 0x4C=L=Left, 0x52=R=Right."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Channel 1, 0x32=Channel 2."
    - name: speed
      type: integer
      description: "Raw speed byte, 0x01~0x18. The source calls this the percentage of speed without defining a further conversion. May be omitted only for Stop."
  notes: "Length is 0x07 with speed and 0x06 when speed is omitted for Stop."

- id: parameter_1_s_i_o_camera_stop_zoom_camera_zoom_in_camera_zoom_out
  label: Set Camera Zoom
  kind: action
  command: "CZ"
  params:
    - name: direction
      type: enum
      description: "Encoded byte: 0x53=S=Stop, 0x49=I=Zoom in, 0x4F=O=Zoom out."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Channel 1, 0x32=Channel 2."
    - name: speed
      type: integer
      description: "Raw speed byte, 0x01~0x07. The source calls this the percentage of speed without defining a further conversion. May be omitted only for Stop."
  notes: "Length is 0x07 with speed and 0x06 when speed is omitted for Stop."

# 2.3.1 Cmd Power

- id: set_power_off
  label: Set Power Off
  kind: action
  command: "55 F0 05 01 73 50 57 30 0D"
  params: []
  notes: "Hardware limitation: Power-on (PW 0x31) is documented but NOT supported."


- id: set_standby
  label: Set Standby Mode
  kind: action
  command: "55 F0 05 01 73 53 52 31 0D"
  params: []
  notes: "In Standby mode only 'Get State' and 'Set Standby/Wake up' are accepted."


- id: set_wakeup
  label: Wake Up
  kind: action
  command: "55 F0 05 01 73 53 52 32 0D"
  params: []
  notes: "Active only if power mode was Standby."

# 2.3.2 Cmd Record

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


- id: set_record_resume_pause
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

# 2.3.3 Cmd Theme (Scene)

- id: set_layout
  label: Set Layout
  kind: action
  command: "55 F0 05 01 73 4C 4F {layout_id} 0D"
  params:
    - name: layout_id
      type: integer
      description: Layout ID, 0x01~0x12 (1..18)


- id: set_background
  label: Set Background
  kind: action
  command: "55 F0 05 01 73 42 47 {bg_id} 0D"
  params:
    - name: bg_id
      type: integer
      description: Background ID, 0x00~0x09; 0x00 = Background off


- id: set_overlay
  label: Set Overlay
  kind: action
  command: "55 F0 05 01 73 4F 4C {overlay_id} 0D"
  params:
    - name: overlay_id
      type: integer
      description: Overlay ID, 0x00~0x1e; 0x00 = Overlay off


- id: set_scene
  label: Set Scene
  kind: action
  command: "55 F0 05 01 73 54 45 {scene_id} 0D"
  params:
    - name: scene_id
      type: integer
      description: Scene ID, 0x01~0x1e (1..30)


- id: set_video_source_id
  label: Set Video Source ID
  kind: action
  command: "55 F0 06 01 73 43 48 {channel} {source_id} 0D"
  params:
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Channel 1, 0x32=Channel 2."
    - name: source_id
      type: integer
      description: "Raw source ID byte, 0x01~0xFF: 0x01=HDMI, 0x02=SDI, 0x03=USB, 0x04 onward=IP streams."
  notes: "A source ID greater than the maximum stream-source ID returns success but causes no action on the GUI."


- id: set_macro
  label: Set Macro
  kind: action
  command: "55 F0 05 01 73 4D 43 {macro} 0D"
  params:
    - name: macro
      type: integer
      description: "Encoded byte: 0x31=Macro 1, 0x32=Macro 2, 0x33=Macro 3."


- id: set_intermission_live
  label: Set Intermission / Live Mode
  kind: action
  command: "55 F0 05 01 73 49 4C {mode} 0D"
  params:
    - name: mode
      type: enum
      description: "0x30=Live, 0x31=Intermission"


- id: set_layout_swap
  label: Set Layout Swap
  kind: action
  command: "55 F0 04 01 73 4C 53 0D"
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
  notes: "Source lists response range as 0x00~0x09 (note: Set supports 0x00~0x1e). UNRESOLVED: the source does not explain the difference."


- id: get_video_source_total_number
  label: Get Video Source Total Number
  kind: query
  command: "55 F0 05 01 67 43 48 {channel} 0D"
  params:
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Channel 1, 0x32=Channel 2."


- id: get_current_video_source_id
  label: Get Current Video Source ID
  kind: query
  command: "55 F0 05 01 67 43 55 {channel} 0D"
  params:
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Channel 1, 0x32=Channel 2."

# 2.3.4 Cmd Audio Vol
# Input definitions retain their existing IDs above.

- id: set_audio_vol_output
  label: Set Audio Vol Output
  kind: action
  command: "AV"
  params:
    - name: direction
      type: enum
      description: "Required output selector byte: 0x4F (ASCII O)."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Line & HDMI output, 0x32=PGM output."
    - name: volume
      type: integer
      description: "Raw volume byte, 0x00~0x7D (0..125)."

- id: get_audio_vol_output
  label: Get Audio Vol Output
  kind: query
  command: "AV"
  params:
    - name: direction
      type: enum
      description: "Required output selector byte: 0x4F (ASCII O)."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Line & HDMI output, 0x32=PGM output."
  notes: "ACK parameters are direction, channel, volume; volume is 0x00~0x7D. NAK parameters echo direction and channel."

# 2.3.5 Cmd Audio Mute
# Set Audio Mute Input retains its existing ID above.

- id: set_audio_mute_output
  label: Set Audio Mute Output
  kind: action
  command: "AM"
  params:
    - name: direction
      type: enum
      description: "Required output selector byte: 0x4F (ASCII O)."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Line & HDMI output, 0x32=PGM output."
    - name: mute
      type: enum
      description: "Encoded byte: 0x30=Audio unmute, 0x31=Audio mute."

- id: get_audio_mute_input
  label: Get Audio Mute Input
  kind: query
  command: "AM"
  params:
    - name: direction
      type: enum
      description: "Required input selector byte: 0x49 (ASCII I)."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Audio channel 1, 0x32=Audio channel 2, 0x33=Audio XLR, 0x34=Audio Line in & USB."
  notes: "ACK parameters are direction, channel, mute; 0x30=Unmute, 0x31=Mute. NAK parameters echo direction and channel."

- id: get_audio_mute_output
  label: Get Audio Mute Output
  kind: query
  command: "AM"
  params:
    - name: direction
      type: enum
      description: "Required output selector byte: 0x4F (ASCII O)."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Line & HDMI output, 0x32=PGM output."
  notes: "ACK parameters are direction, channel, mute; 0x30=Unmute, 0x31=Mute. NAK parameters echo direction and channel."

# 2.3.6 Cmd Audio Type
# Set Audio Type Input retains its existing ID above.

- id: set_audio_type_output
  label: Set Audio Type Output
  kind: action
  command: "AT"
  params:
    - name: direction
      type: enum
      description: "Required output selector byte: 0x4F (ASCII O)."
    - name: channel
      type: integer
      description: "Required encoded channel byte: 0x31=Line & HDMI output."
    - name: audio_type
      type: enum
      description: "Encoded byte: 0x31=ALL, 0x32=Line out + PGM, 0x33=MultiView."

- id: get_audio_type_input
  label: Get Audio Type Input
  kind: query
  command: "AT"
  params:
    - name: direction
      type: enum
      description: "Required input selector byte: 0x49 (ASCII I)."
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Audio channel 1, 0x32=Audio channel 2, 0x33=Audio XLR, 0x34=Audio Line in & USB."
  notes: "ACK parameters are direction, channel, audio type: 0x31=Line in, 0x32=Mic in, 0x33=HDMI / SDI, 0x36=IP Audio, 0x37=XLR-Line, 0x38=XLR-Mic, 0x39=USB Audio, 0x3A=Follow. NAK parameters echo direction and channel."

- id: get_audio_type_output
  label: Get Audio Type Output
  kind: query
  command: "AT"
  params:
    - name: direction
      type: enum
      description: "Required output selector byte: 0x4F (ASCII O)."
    - name: channel
      type: integer
      description: "Required encoded channel byte: 0x31=Line & HDMI output."
  notes: "ACK parameters are direction, channel, audio type: 0x31=ALL, 0x32=Line out + PGM, 0x33=MultiView. NAK parameters echo direction and channel."

# 2.3.7 Cmd Audio XLR

- id: set_audio_xlr_channel
  label: Set Audio XLR Channel Mode
  kind: action
  command: "55 F0 05 01 73 58 43 {mode} 0D"
  params:
    - name: mode
      type: enum
      description: "0x30=Stereo, 0x31=Mono"


- id: set_audio_xlr_power
  label: Set Audio XLR Power Mode
  kind: action
  command: "55 F0 05 01 73 58 50 {mode} 0D"
  params:
    - name: mode
      type: enum
      description: "0x30=XLR power off, 0x31=XLR power on"


- id: get_audio_xlr_channel
  label: Get Audio XLR Channel Mode
  kind: query
  command: "55 F0 04 01 67 58 43 0D"
  params: []


- id: get_audio_xlr_power
  label: Get Audio XLR Power Mode
  kind: query
  command: "55 F0 04 01 67 58 50 0D"
  params: []

# 2.3.8 Cmd Stream

- id: set_stream
  label: Set Stream
  kind: action
  command: "SC"
  params:
    - name: stream
      type: integer
      description: "Encoded byte: 0x31=Stream 1, 0x32=Stream 2, 0x33=Stream 3."
    - name: mode
      type: enum
      description: "Raw byte: 0x01=Stop Stream, 0x02=Start Stream."

- id: get_stream
  label: Get Stream
  kind: query
  command: "SC"
  params:
    - name: stream
      type: integer
      description: "Encoded byte: 0x31=Stream 1, 0x32=Stream 2, 0x33=Stream 3."
  notes: "ACK parameters are stream and state: 0x00=Sync, 0x01=Ready (enable), 0x02=Streaming (enable), 0x04=Off. NAK parameters echo the stream selector. These state bytes are response values, not commands."

# 2.3.9 Cmd Camera
# Set Camera Move and Set Camera Zoom retain their existing IDs above.

- id: set_camera_preset
  label: Set Camera Preset
  kind: action
  command: "55 F0 06 01 73 43 50 {channel} {preset_id} 0D"
  params:
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Channel 1, 0x32=Channel 2."
    - name: preset_id
      type: integer
      description: "Preset ID, 0x01~0x09"


- id: set_camera_save_preset
  label: Set Camera Save Preset
  kind: action
  command: "55 F0 06 01 73 43 53 {channel} {preset_id} 0D"
  params:
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Channel 1, 0x32=Channel 2."
    - name: preset_id
      type: integer
      description: "Preset ID, 0x01~0x09"


- id: set_camera_tracking
  label: Set Camera Tracking On/Off
  kind: action
  command: "55 F0 06 01 73 43 52 {channel} {mode} 0D"
  params:
    - name: channel
      type: integer
      description: "Encoded byte: 0x31=Channel 1, 0x32=Channel 2."
    - name: mode
      type: enum
      description: "0x30=ON, 0x31=OFF"

# 2.3.10 Cmd Others

- id: set_snapshot
  label: Insert Snapshot
  kind: action
  command: "55 F0 04 01 73 53 53 0D"
  params: []


- id: set_bookmark
  label: Insert Bookmark
  kind: action
  command: "55 F0 04 01 73 42 4D 0D"
  params: []


- id: set_backup_to_usb
  label: Set Backup to USB
  kind: action
  command: "55 F0 05 01 73 42 55 {mode} 0D"
  params:
    - name: mode
      type: enum
      description: "0x30=Start backup to USB, 0x31=Stop backup to USB"
```

## Feedbacks
```yaml

```

## Variables
```yaml
# No additional settable scalar parameters beyond the commands above.
```

## Events
```yaml
- id: ntfy_media_state
  header: "0x23"
  end: "0x0D"
  event_code: "ST (0x53 0x54)"
  params:
    type: enum
    values:
      - uninitialize   # 0x30
      - ready          # 0x31
      - stopped        # 0x32
      - recording      # 0x33
      - paused         # 0x34
      - waiting        # 0x35
      - stopping       # 0x36
      - standby        # 0x37
      - reboot         # 0x38 - only valid when prior state was standby
  example: "23 53 54 31 0D"
  notes: "Event frame format: Header(1) + Event Code(2) + Parameters(n) + End(1=0x0D). Sent unsolicited by device on TCP connection until disconnected or a new connection is established."
```

## Macros
```yaml
# Source documents Macro 1/2/3 invocation via MC command; no internal macro definition
# commands (record/play macro) are exposed in this revision.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains no explicit safety warnings or interlocks.
# Commands are not accepted during media station boot-up.
# In Standby, only Get State and Set Standby/Wake up are accepted.
# Wake up is active only when the previous power mode was Standby.
```

## Notes
Protocol frame layout: `0x55 0xF0 Length Address Action CmdH CmdL Parameters… 0x0D`. Length counts Address through Parameters (inclusive). Address reserved (any 0x01–0xFF, 0 reserved). Action: 0x67 Get, 0x73 Set, 0x06 ACK, 0x15 NAK. ACK = command executed successfully; NAK = command understood but execution failed OR protocol invalid (NAK + End only in latter case). No checksum. On TCP, if client does not close, connection persists and receives event notifications until a new connection is established.

Complete hexadecimal command strings describe binary frames; transmit their bytes, not the textual hexadecimal notation. Each placeholder represents one encoded byte as specified by its parameter description. Channel, macro and other ASCII selectors must use their documented ASCII byte values; a selector labelled 1 is not the raw byte 0x01 unless explicitly specified.

For entries with a two-letter vendor mnemonic in `command`, encode the mnemonic as two ASCII command bytes: AV = 0x41 0x56, AM = 0x41 0x4D, AT = 0x41 0x54, SC = 0x53 0x43, CM = 0x43 0x4D, CZ = 0x43 0x5A. Construct the same protocol frame with Header 0x55, Extended Header 0xF0, the supplied Address, Action 0x73 for `kind: action` or 0x67 for `kind: query`, those two command bytes, the encoded parameters in their listed order, and End 0x0D. Length is 4 plus the number of transmitted parameter bytes. Source examples use Address 0x01; the source does not establish an address default. No parameter defaults are assigned. A selector restricted to a single documented value is a required protocol field.

For AV, AM and AT, Set requests carry direction, channel and value (Length 0x07); Get requests carry direction and channel (Length 0x06). Successful Get responses carry direction, channel and value (Length 0x07). For SC, Set requests carry stream and mode (Length 0x06); Get requests carry stream (Length 0x05), and successful Get responses carry stream and state (Length 0x06). CM and CZ carry direction, channel and speed (Length 0x07); speed may be omitted for Stop, reducing Length to 0x06.

UNRESOLVED: the Set Audio Type Input example specifies channel 1 with type 0x31, while the same section restricts channel 1 to 0x33, 0x36 and 0x3A. The parameter restrictions are preserved, and the contradictory example is not assigned as a command value or default.

Authentication is UNRESOLVED. Omission of an authentication procedure from this source does not establish that authentication is absent.

Set Power On (PW 0x31) is documented but explicitly NOT supported due to hardware limitation; use Standby/Wake Up (SR) instead. In Standby mode only "Get State" and "Set Standby/Wake Up" are accepted. Commands are not accepted during media-station boot-up.

Revision 4.0 (2025/06/30) added Set Layout Swap and revised Audio XLR Power (0x32/0x33 removed; 0x31 = on). Per-version feature availability not enumerated beyond history log.

<!-- UNRESOLVED: firmware version compatibility for individual commands not stated; per-feature FW gates not documented. -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS165%20-%20LC100_LC100N_LC100A%20RS-232%20command%20set_1_5.pdf"
  - "https://www.mylumens.com/en/Downloads/4?id2=8&keyword=LC100"
retrieved_at: 2026-07-14T06:28:28.252Z
last_checked_at: 2026-10-07T13:06:42.445Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:06:42.445Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 action units match source frames and parameters; transport 9600/8/N/1 and port 5080 confirmed; spec covers essentially all 46 source commands. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source does not describe an authentication procedure or establish that authentication is absent."
- "firmware version compatibility ranges not fully stated; revision 4.0 corresponds to v1.1.0.29 but per-feature FW requirements not enumerated."
- "the source example selects channel 1 with type 0x31, contradicting its channel-availability table. No default channel/type pair is established.\""
- "the source does not explain the difference.\""
- "the Set Audio Type Input example specifies channel 1 with type 0x31, while the same section restricts channel 1 to 0x33, 0x36 and 0x3A. The parameter restrictions are preserved, and the contradictory example is not assigned as a command value or default."
- "firmware version compatibility for individual commands not stated; per-feature FW gates not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
