---
spec_id: admin/tivo-virgin-media-roamio-series-3
schema_version: ai4av-public-spec-v1
revision: 1
title: "TiVo Virgin Media Roamio Series 3 Control Spec"
manufacturer: TiVo
model_family: "TiVo Virgin Media Roamio Series 3"
aliases: []
compatible_with:
  manufacturers:
    - TiVo
  models:
    - "TiVo Virgin Media Roamio Series 3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - openhab.org
source_urls:
  - https://raw.githubusercontent.com/RogueProeliator/IndigoPlugin-TiVo-Network-Remote/master/Documentation/TiVo_TCP_Network_Remote_Control_Protocol.pdf
  - https://www.openhab.org/addons/bindings/tivo/
  - https://raw.githubusercontent.com/blantz/homebridge-tivo-control/main/doc/TiVo_TCP_Network_Remote_Control_Protocol.pdf
retrieved_at: 2026-06-01T23:22:58.942Z
last_checked_at: 2026-06-04T06:32:24.958Z
generated_at: 2026-06-04T06:32:24.958Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source beyond \"v9.4 or later for network remote control toggle\"."
  - "source documents no settable, persisted variables exposed over the protocol."
  - "source documents no multi-step macro sequences."
  - "source describes no power-on sequencing, voltage, or hardware interlocks."
  - "source does not document — TCP keepalive behavior, idle timeout, maximum concurrent client count, response latency / minimum inter-command gap, behavior when network remote control is disabled mid-session, byte limit on a single command line, or behavior of malformed commands beyond the CH_FAILED reason codes documented for SETCH/FORCECH."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:32:24.958Z
  matched_actions: 120
  action_count: 120
  confidence: medium
  summary: "All 120 spec actions matched to source command literals; transport parameters verified; full coverage of source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# TiVo Virgin Media Roamio Series 3 Control Spec

## Summary
TiVo DVR controlled over TCP using TiVo TCP Remote Protocol v1.1. ASCII command packets, single-line uppercase, carriage-return terminated, sent to port 31339. Covers channel tuning (SETCH, FORCECH), remote-button injection (IRCODE), keyboard input (KEYBOARD), and UI navigation (TELEPORT).

<!-- UNRESOLVED: firmware version compatibility range not stated in source beyond "v9.4 or later for network remote control toggle". -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 31339
  framing: line  # ASCII commands, carriage-return terminated, per "single line of uppercase text, terminated by a carriage return"
  encoding: ascii
auth:
  type: none  # inferred: no auth procedure in source. Source requires user to enable "Network Remote Control" on device via on-screen settings menu; no password/login over TCP.
```

## Traits
```yaml
- routable  # inferred from channel selection commands (SETCH/FORCECH)
```

## Actions
```yaml
# === Channel tuning ===
- id: setch
  label: Set Channel
  kind: action
  command: "SETCH {channel}"
  params:
    - name: channel
      type: integer
      description: Primary channel number (1 to max in lineup). Leading zeros allowed.
  notes: Tunes DVR to channel; fails if recording in progress or not in Live TV. Returns CH_STATUS on success, CH_FAILED on failure.

- id: setch_subchannel
  label: Set Channel (with Sub-channel)
  kind: action
  command: "SETCH {channel} {sub_channel}"
  params:
    - name: channel
      type: integer
      description: Primary channel number (1 to max in lineup).
    - name: sub_channel
      type: integer
      description: ATSC digital sub-channel number (1 to max in lineup).
  notes: Tunes to primary.sub channel pair. Fails if recording in progress.

- id: forcech
  label: Force Channel
  kind: action
  command: "FORCECH {channel}"
  params:
    - name: channel
      type: integer
      description: Primary channel number (1 to max in lineup). Leading zeros allowed.
  notes: Tunes DVR, canceling recording in progress if necessary. Requires Live TV mode.

- id: forcech_subchannel
  label: Force Channel (with Sub-channel)
  kind: action
  command: "FORCECH {channel} {sub_channel}"
  params:
    - name: channel
      type: integer
    - name: sub_channel
      type: integer
  notes: Force-tunes to primary.sub channel pair, canceling recording if necessary.

# === TELEPORT (UI navigation) - enumerated, one per screen ===
- id: teleport_tivo
  label: Teleport to TiVo Central
  kind: action
  command: "TELEPORT TIVO"
  params: []

- id: teleport_livetv
  label: Teleport to Live TV
  kind: action
  command: "TELEPORT LIVETV"
  params: []
  notes: Returns LIVETV_READY response. Clients must wait for LIVETV_READY before issuing SETCH/FORCECH.

- id: teleport_guide
  label: Teleport to Program Guide
  kind: action
  command: "TELEPORT GUIDE"
  params: []

- id: teleport_nowplaying
  label: Teleport to Now Playing
  kind: action
  command: "TELEPORT NOWPLAYING"
  params: []

# === IRCODE - Navigation buttons ===
- id: ircode_up
  label: Up
  kind: action
  command: "IRCODE UP"
  params: []

- id: ircode_down
  label: Down
  kind: action
  command: "IRCODE DOWN"
  params: []

- id: ircode_left
  label: Left
  kind: action
  command: "IRCODE LEFT"
  params: []

- id: ircode_right
  label: Right
  kind: action
  command: "IRCODE RIGHT"
  params: []

- id: ircode_select
  label: Select
  kind: action
  command: "IRCODE SELECT"
  params: []

- id: ircode_tivo
  label: TiVo (Button)
  kind: action
  command: "IRCODE TIVO"
  params: []

- id: ircode_livetv
  label: Live TV (Button)
  kind: action
  command: "IRCODE LIVETV"
  params: []

- id: ircode_guide
  label: Guide (Button)
  kind: action
  command: "IRCODE GUIDE"
  params: []

- id: ircode_info
  label: Info
  kind: action
  command: "IRCODE INFO"
  params: []

- id: ircode_exit
  label: Exit
  kind: action
  command: "IRCODE EXIT"
  params: []

# === IRCODE - Control buttons ===
- id: ircode_thumbsup
  label: Thumbs Up
  kind: action
  command: "IRCODE THUMBSUP"
  params: []

- id: ircode_thumbsdown
  label: Thumbs Down
  kind: action
  command: "IRCODE THUMBSDOWN"
  params: []

- id: ircode_channelup
  label: Channel Up
  kind: action
  command: "IRCODE CHANNELUP"
  params: []

- id: ircode_channeldown
  label: Channel Down
  kind: action
  command: "IRCODE CHANNELDOWN"
  params: []

- id: ircode_mute
  label: Mute
  kind: action
  command: "IRCODE MUTE"
  params: []

- id: ircode_volumeup
  label: Volume Up
  kind: action
  command: "IRCODE VOLUMEUP"
  params: []

- id: ircode_volumedown
  label: Volume Down
  kind: action
  command: "IRCODE VOLUMEDOWN"
  params: []

- id: ircode_tvinput
  label: TV Input
  kind: action
  command: "IRCODE TVINPUT"
  params: []

# === IRCODE - Video mode ===
- id: ircode_video_mode_fixed_480i
  label: Video Mode Fixed 480i
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_480i"
  params: []

- id: ircode_video_mode_fixed_480p
  label: Video Mode Fixed 480p
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_480p"
  params: []

- id: ircode_video_mode_fixed_720p
  label: Video Mode Fixed 720p
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_720p"
  params: []

- id: ircode_video_mode_fixed_1080i
  label: Video Mode Fixed 1080i
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_1080i"
  params: []

- id: ircode_video_mode_hybrid
  label: Video Mode Hybrid
  kind: action
  command: "IRCODE VIDEO_MODE_HYBRID"
  params: []

- id: ircode_video_mode_hybrid_720p
  label: Video Mode Hybrid 720p
  kind: action
  command: "IRCODE VIDEO_MODE_HYBRID_720p"
  params: []

- id: ircode_video_mode_hybrid_1080i
  label: Video Mode Hybrid 1080i
  kind: action
  command: "IRCODE VIDEO_MODE_HYBRID_1080i"
  params: []

- id: ircode_video_mode_native
  label: Video Mode Native
  kind: action
  command: "IRCODE VIDEO_MODE_NATIVE"
  params: []

# === IRCODE - Closed captioning ===
- id: ircode_cc_on
  label: Closed Captioning On
  kind: action
  command: "IRCODE CC_ON"
  params: []

- id: ircode_cc_off
  label: Closed Captioning Off
  kind: action
  command: "IRCODE CC_OFF"
  params: []

# === IRCODE - Options ===
- id: ircode_options
  label: Options
  kind: action
  command: "IRCODE OPTIONS"
  params: []

# === IRCODE - Aspect correction ===
- id: ircode_aspect_correction_full
  label: Aspect Correction Full
  kind: action
  command: "IRCODE ASPECT_CORRECTION_FULL"
  params: []

- id: ircode_aspect_correction_panel
  label: Aspect Correction Panel
  kind: action
  command: "IRCODE ASPECT_CORRECTION_PANEL"
  params: []

- id: ircode_aspect_correction_zoom
  label: Aspect Correction Zoom
  kind: action
  command: "IRCODE ASPECT_CORRECTION_ZOOM"
  params: []

- id: ircode_aspect_correction_wide_zoom
  label: Aspect Correction Wide Zoom
  kind: action
  command: "IRCODE ASPECT_CORRECTION_WIDE_ZOOM"
  params: []

# === IRCODE - TrickPlay buttons ===
- id: ircode_play
  label: Play
  kind: action
  command: "IRCODE PLAY"
  params: []

- id: ircode_forward
  label: Forward
  kind: action
  command: "IRCODE FORWARD"
  params: []

- id: ircode_reverse
  label: Reverse
  kind: action
  command: "IRCODE REVERSE"
  params: []

- id: ircode_pause
  label: Pause
  kind: action
  command: "IRCODE PAUSE"
  params: []

- id: ircode_slow
  label: Slow
  kind: action
  command: "IRCODE SLOW"
  params: []

- id: ircode_replay
  label: Replay
  kind: action
  command: "IRCODE REPLAY"
  params: []

- id: ircode_advance
  label: Advance
  kind: action
  command: "IRCODE ADVANCE"
  params: []

- id: ircode_record
  label: Record
  kind: action
  command: "IRCODE RECORD"
  params: []

# === IRCODE - Numeric buttons ===
- id: ircode_num0
  label: Number 0
  kind: action
  command: "IRCODE NUM0"
  params: []

- id: ircode_num1
  label: Number 1
  kind: action
  command: "IRCODE NUM1"
  params: []

- id: ircode_num2
  label: Number 2
  kind: action
  command: "IRCODE NUM2"
  params: []

- id: ircode_num3
  label: Number 3
  kind: action
  command: "IRCODE NUM3"
  params: []

- id: ircode_num4
  label: Number 4
  kind: action
  command: "IRCODE NUM4"
  params: []

- id: ircode_num5
  label: Number 5
  kind: action
  command: "IRCODE NUM5"
  params: []

- id: ircode_num6
  label: Number 6
  kind: action
  command: "IRCODE NUM6"
  params: []

- id: ircode_num7
  label: Number 7
  kind: action
  command: "IRCODE NUM7"
  params: []

- id: ircode_num8
  label: Number 8
  kind: action
  command: "IRCODE NUM8"
  params: []

- id: ircode_num9
  label: Number 9
  kind: action
  command: "IRCODE NUM9"
  params: []

- id: ircode_enter
  label: Enter
  kind: action
  command: "IRCODE ENTER"
  params: []

- id: ircode_clear
  label: Clear
  kind: action
  command: "IRCODE CLEAR"
  params: []

# === IRCODE - Shortcut buttons ===
- id: ircode_action_a
  label: Action A
  kind: action
  command: "IRCODE ACTION_A"
  params: []

- id: ircode_action_b
  label: Action B
  kind: action
  command: "IRCODE ACTION_B"
  params: []

- id: ircode_action_c
  label: Action C
  kind: action
  command: "IRCODE ACTION_C"
  params: []

- id: ircode_action_d
  label: Action D
  kind: action
  command: "IRCODE ACTION_D"
  params: []

# === KEYBOARD - Alphabet (A-Z) ===
- id: keyboard_a
  label: Keyboard A
  kind: action
  command: "KEYBOARD A"
  params: []

- id: keyboard_b
  label: Keyboard B
  kind: action
  command: "KEYBOARD B"
  params: []

- id: keyboard_c
  label: Keyboard C
  kind: action
  command: "KEYBOARD C"
  params: []

- id: keyboard_d
  label: Keyboard D
  kind: action
  command: "KEYBOARD D"
  params: []

- id: keyboard_e
  label: Keyboard E
  kind: action
  command: "KEYBOARD E"
  params: []

- id: keyboard_f
  label: Keyboard F
  kind: action
  command: "KEYBOARD F"
  params: []

- id: keyboard_g
  label: Keyboard G
  kind: action
  command: "KEYBOARD G"
  params: []

- id: keyboard_h
  label: Keyboard H
  kind: action
  command: "KEYBOARD H"
  params: []

- id: keyboard_i
  label: Keyboard I
  kind: action
  command: "KEYBOARD I"
  params: []

- id: keyboard_j
  label: Keyboard J
  kind: action
  command: "KEYBOARD J"
  params: []

- id: keyboard_k
  label: Keyboard K
  kind: action
  command: "KEYBOARD K"
  params: []

- id: keyboard_l
  label: Keyboard L
  kind: action
  command: "KEYBOARD L"
  params: []

- id: keyboard_m
  label: Keyboard M
  kind: action
  command: "KEYBOARD M"
  params: []

- id: keyboard_n
  label: Keyboard N
  kind: action
  command: "KEYBOARD N"
  params: []

- id: keyboard_o
  label: Keyboard O
  kind: action
  command: "KEYBOARD O"
  params: []

- id: keyboard_p
  label: Keyboard P
  kind: action
  command: "KEYBOARD P"
  params: []

- id: keyboard_q
  label: Keyboard Q
  kind: action
  command: "KEYBOARD Q"
  params: []

- id: keyboard_r
  label: Keyboard R
  kind: action
  command: "KEYBOARD R"
  params: []

- id: keyboard_s
  label: Keyboard S
  kind: action
  command: "KEYBOARD S"
  params: []

- id: keyboard_t
  label: Keyboard T
  kind: action
  command: "KEYBOARD T"
  params: []

- id: keyboard_u
  label: Keyboard U
  kind: action
  command: "KEYBOARD U"
  params: []

- id: keyboard_v
  label: Keyboard V
  kind: action
  command: "KEYBOARD V"
  params: []

- id: keyboard_w
  label: Keyboard W
  kind: action
  command: "KEYBOARD W"
  params: []

- id: keyboard_x
  label: Keyboard X
  kind: action
  command: "KEYBOARD X"
  params: []

- id: keyboard_y
  label: Keyboard Y
  kind: action
  command: "KEYBOARD Y"
  params: []

- id: keyboard_z
  label: Keyboard Z
  kind: action
  command: "KEYBOARD Z"
  params: []

# === KEYBOARD - Special characters ===
- id: keyboard_minus
  label: Keyboard Minus
  kind: action
  command: "KEYBOARD MINUS"
  params: []

- id: keyboard_equals
  label: Keyboard Equals
  kind: action
  command: "KEYBOARD EQUALS"
  params: []

- id: keyboard_lbracket
  label: Keyboard Left Bracket
  kind: action
  command: "KEYBOARD LBRACKET"
  params: []

- id: keyboard_rbracket
  label: Keyboard Right Bracket
  kind: action
  command: "KEYBOARD RBRACKET"
  params: []

- id: keyboard_backslash
  label: Keyboard Backslash
  kind: action
  command: "KEYBOARD BACKSLASH"
  params: []

- id: keyboard_semicolon
  label: Keyboard Semicolon
  kind: action
  command: "KEYBOARD SEMICOLON"
  params: []

- id: keyboard_quote
  label: Keyboard Quote
  kind: action
  command: "KEYBOARD QUOTE"
  params: []

- id: keyboard_comma
  label: Keyboard Comma
  kind: action
  command: "KEYBOARD COMMA"
  params: []

- id: keyboard_period
  label: Keyboard Period
  kind: action
  command: "KEYBOARD PERIOD"
  params: []

- id: keyboard_slash
  label: Keyboard Slash
  kind: action
  command: "KEYBOARD SLASH"
  params: []

- id: keyboard_backquote
  label: Keyboard Backquote
  kind: action
  command: "KEYBOARD BACKQUOTE"
  params: []

- id: keyboard_space
  label: Keyboard Space
  kind: action
  command: "KEYBOARD SPACE"
  params: []

# === KEYBOARD - Cursor navigation ===
- id: keyboard_kbdup
  label: Keyboard Cursor Up
  kind: action
  command: "KEYBOARD KBDUP"
  params: []

- id: keyboard_kbddown
  label: Keyboard Cursor Down
  kind: action
  command: "KEYBOARD KBDDOWN"
  params: []

- id: keyboard_kbdleft
  label: Keyboard Cursor Left
  kind: action
  command: "KEYBOARD KBDLEFT"
  params: []

- id: keyboard_kbdright
  label: Keyboard Cursor Right
  kind: action
  command: "KEYBOARD KBDRIGHT"
  params: []

- id: keyboard_pageup
  label: Keyboard Page Up
  kind: action
  command: "KEYBOARD PAGEUP"
  params: []

- id: keyboard_pagedown
  label: Keyboard Page Down
  kind: action
  command: "KEYBOARD PAGEDOWN"
  params: []

- id: keyboard_home
  label: Keyboard Home
  kind: action
  command: "KEYBOARD HOME"
  params: []

- id: keyboard_end
  label: Keyboard End
  kind: action
  command: "KEYBOARD END"
  params: []

# === KEYBOARD - Edit ===
- id: keyboard_caps
  label: Keyboard Caps Lock
  kind: action
  command: "KEYBOARD CAPS"
  params: []
  notes: Toggles caps mode. If already in CAPS mode, turns it off.

- id: keyboard_lshift
  label: Keyboard Left Shift
  kind: action
  command: "KEYBOARD LSHIFT"
  params: []
  notes: Modifier - capitalizes the next character. Applied to the immediately following KEYBOARD command.

- id: keyboard_rshift
  label: Keyboard Right Shift
  kind: action
  command: "KEYBOARD RSHIFT"
  params: []
  notes: Modifier - capitalizes the next character.

- id: keyboard_insert
  label: Keyboard Insert
  kind: action
  command: "KEYBOARD INSERT"
  params: []

- id: keyboard_backspace
  label: Keyboard Backspace
  kind: action
  command: "KEYBOARD BACKSPACE"
  params: []

- id: keyboard_delete
  label: Keyboard Delete
  kind: action
  command: "KEYBOARD DELETE"
  params: []

- id: keyboard_kbdenter
  label: Keyboard Enter
  kind: action
  command: "KEYBOARD KBDENTER"
  params: []

# === KEYBOARD - Control ===
- id: keyboard_stop
  label: Keyboard Stop
  kind: action
  command: "KEYBOARD STOP"
  params: []

- id: keyboard_video_on_demand
  label: Keyboard Video On Demand
  kind: action
  command: "KEYBOARD VIDEO_ON_DEMAND"
  params: []
```

## Feedbacks
```yaml
- id: ch_status
  label: Channel Status (success)
  type: response
  format: "CH_STATUS {channel} {reason}"
  alt_format: "CH_STATUS {channel} {sub_channel} {reason}"
  fields:
    - name: channel
      type: string
      description: Fixed 4-digit primary channel number.
    - name: sub_channel
      type: string
      description: Fixed 4-digit sub-channel number (when present).
    - name: reason
      type: enum
      values:
        - REMOTE   # external client made the channel change request
        - LOCAL    # the physical remote was used to change channels
        - RECORDING  # internal process (e.g. recording start) changed channel
  notes: Broadcast to all open clients after a successful channel change (SETCH or FORCECH).

- id: ch_failed
  label: Channel Change Failed
  type: response
  format: "CH_FAILED {reason}"
  fields:
    - name: reason
      type: enum
      values:
        - NO_LIVE           # DVR was not in Live TV at time of command
        - RECORDING         # recording was in progress (SETCH only)
        - MISSING_CHANNEL   # missing at least one channel parameter
        - MALFORMED_CHANNEL # channel was not a valid integer
        - INVALID_CHANNEL   # channel not found in TCD channel lineup
  notes: Sent only to the client that issued the failing SETCH or FORCECH.

- id: livetv_ready
  label: Live TV Ready
  type: response
  format: "LIVETV_READY"
  notes: Returned only by TELEPORT LIVETV on success. Clients must wait for LIVETV_READY before issuing SETCH or FORCECH.

- id: missing_teleport_name
  label: Missing Teleport Screen Name
  type: response
  format: "MISSING_TELEPORT_NAME"
  notes: Returned when TELEPORT is issued without the required screen parameter.
```

## Variables
```yaml
# UNRESOLVED: source documents no settable, persisted variables exposed over the protocol.
# Channel state is observable via CH_STATUS feedback but not addressed as a variable.
```

## Events
```yaml
- id: ch_status_broadcast
  label: Channel Status Broadcast
  source: ch_status
  trigger: Any successful channel change (network client, physical remote, or internal recording start).
  notes: Per source, all open clients receive a CH_STATUS message on any channel change, not only as a direct response to a client's own SETCH/FORCECH.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
# It does describe an ordering constraint - clients must wait for LIVETV_READY
# before issuing SETCH/FORCECH after TELEPORT LIVETV - see Notes.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: network_remote_control_enable
    description: |
      Networked control is disabled by default from TiVo software v9.4 onward.
      User must manually enable it on the DVR before any TCP command will be accepted:
      TiVo Central > Messages & Settings > Settings > Remote, CableCARD & Devices > Network Remote Control > Enabled.
    enforced_by: device_ui
  - id: forcech_cancels_recording
    description: |
      FORCECH will cancel a recording in progress to honor the channel change.
      Operator should treat FORCECH as destructive to active recordings, unlike SETCH
      which fails with CH_FAILED RECORDING when a recording is in progress.
    enforced_by: protocol
# UNRESOLVED: source describes no power-on sequencing, voltage, or hardware interlocks.
```

## Notes

- Connect via TCP to port **31339**. Send single-line uppercase ASCII commands terminated by a carriage return (`\r`).
- All commands and parameters are space-separated. Example: `IRCODE SELECT\r`.
- The DVR queues IRCODE and KEYBOARD requests and processes them in arrival order; clients may pipeline them freely.
- `LSHIFT` / `RSHIFT` are modifier keys applied to the *immediately following* KEYBOARD command. Capital letters and symbols are produced by sending the modifier first, then the base key (e.g. `KEYBOARD LSHIFT` followed by `KEYBOARD A` produces uppercase A).
- After `TELEPORT LIVETV`, clients must wait for `LIVETV_READY` before issuing any `SETCH` or `FORCECH` command.
- `TELEPORT` returns no success response except for the `LIVETV` variant.
- `SETCH` and `FORCECH` differ only in behavior during recording: `SETCH` fails (`CH_FAILED RECORDING`), `FORCECH` cancels the recording and proceeds.
- The CH_STATUS message is broadcast to *all* connected clients on any channel change, regardless of which client initiated it. The `reason` field (`REMOTE` / `LOCAL` / `RECORDING`) lets clients distinguish the originator.
- Some IRCODE button names (e.g. `TIVO`, `LIVETV`, `GUIDE`) collide lexically with TELEPORT screen names but are distinct commands with different payloads.

<!-- UNRESOLVED: source does not document — TCP keepalive behavior, idle timeout, maximum concurrent client count, response latency / minimum inter-command gap, behavior when network remote control is disabled mid-session, byte limit on a single command line, or behavior of malformed commands beyond the CH_FAILED reason codes documented for SETCH/FORCECH. -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - openhab.org
source_urls:
  - https://raw.githubusercontent.com/RogueProeliator/IndigoPlugin-TiVo-Network-Remote/master/Documentation/TiVo_TCP_Network_Remote_Control_Protocol.pdf
  - https://www.openhab.org/addons/bindings/tivo/
  - https://raw.githubusercontent.com/blantz/homebridge-tivo-control/main/doc/TiVo_TCP_Network_Remote_Control_Protocol.pdf
retrieved_at: 2026-06-01T23:22:58.942Z
last_checked_at: 2026-06-04T06:32:24.958Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:32:24.958Z
matched_actions: 120
action_count: 120
confidence: medium
summary: "All 120 spec actions matched to source command literals; transport parameters verified; full coverage of source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source beyond \"v9.4 or later for network remote control toggle\"."
- "source documents no settable, persisted variables exposed over the protocol."
- "source documents no multi-step macro sequences."
- "source describes no power-on sequencing, voltage, or hardware interlocks."
- "source does not document — TCP keepalive behavior, idle timeout, maximum concurrent client count, response latency / minimum inter-command gap, behavior when network remote control is disabled mid-session, byte limit on a single command line, or behavior of malformed commands beyond the CH_FAILED reason codes documented for SETCH/FORCECH."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
