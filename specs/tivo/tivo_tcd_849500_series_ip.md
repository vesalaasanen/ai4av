---
spec_id: admin/tivo-tcd-849500-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "TiVo TCD 849500 Series Control Spec"
manufacturer: TiVo
model_family: "TCD 849500 Series"
aliases: []
compatible_with:
  manufacturers:
    - TiVo
  models:
    - "TCD 849500 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
  - yumpu.com
  - silo.tips
source_urls:
  - https://github.com/wcbonner/WimTiVoServer/raw/master/TiVoDocs/TiVo_TCP_Network_Remote_Control_Protocol.pdf
  - https://www.yumpu.com/en/document/view/42026982/tcp-remote-protocol-version-1-1-tivo
  - https://silo.tips/download/tcp-remote-protocol-version-11
retrieved_at: 2026-04-30T11:11:11.325Z
last_checked_at: 2026-09-22T11:47:59.820Z
generated_at: 2026-09-22T11:47:59.820Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "No model-specific electrical, power, or fault-recovery data is documented in this protocol reference; this spec covers only the TCP remote-control command surface."
  - "source does not document multi-step sequences the device itself"
  - "Firmware version compatibility for the TCD 849500 Series is not stated; source refers generically to \"TiVo software v9.4\" as the version that introduced the off-by-default flag, but no per-model firmware string is documented."
verification:
  verdict: verified
  checked_at: 2026-09-22T11:47:59.820Z
  matched_actions: 117
  action_count: 117
  confidence: medium
  summary: "All 117 spec action units (5 opcodes + 112 IRCODE/KEYBOARD codes from Appendix A) appear verbatim in source; transport port 31339 documented; coverage is complete. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-05
---

# TiVo TCD 849500 Series Control Spec

## Summary

The TiVo TCD 849500 Series is a TiVo DVR that exposes an ASCII TCP control protocol on port 31339. This spec covers the v1.1 TCP remote protocol used to send simulated remote control button presses, keyboard input, and channel-change/teleport commands to the DVR over the network.

<!-- UNRESOLVED: No model-specific electrical, power, or fault-recovery data is documented in this protocol reference; this spec covers only the TCP remote-control command surface. -->

## Transport

```yaml
protocols:
  - tcp
addressing:
  port: 31339
auth:
  type: none  # inferred: no auth procedure in source; protocol is plaintext ASCII on TCP
```

## Traits

```yaml
- routable  # inferred: SETCH / FORCECH / TELEPORT change DVR's current channel and UI screen
- queryable  # inferred: SETCH and FORCECH return CH_STATUS / CH_FAILED responses; TELEPORT returns LIVETV_READY / MISSING_TELEPORT_NAME
```

## Actions

```yaml
# Channel-change commands
- id: setch
  label: Set Channel
  kind: action
  command: "SETCH {channel} {sub_channel}"
  params:
    - name: channel
      type: integer
      description: Primary channel number (1 to maximum channel in lineup). Leading zeros optional.
    - name: sub_channel
      type: integer
      description: Optional sub-channel / ATSC minor number. Omit if not applicable.

- id: forcech
  label: Force Channel (cancel recording)
  kind: action
  command: "FORCECH {channel} {sub_channel}"
  params:
    - name: channel
      type: integer
      description: Primary channel number (1 to maximum channel in lineup).
    - name: sub_channel
      type: integer
      description: Optional sub-channel. Omit if not applicable.

# UI teleport
- id: teleport
  label: Teleport to UI Screen
  kind: action
  command: "TELEPORT {screen}"
  params:
    - name: screen
      type: enum
      values: "TIVO, LIVETV, GUIDE, NOWPLAYING"

# IRCODE command - single literal opcode dispatching to the button named in `code`
- id: ircode
  label: Send IR Remote Code
  kind: action
  command: "IRCODE {code}"
  params:
    - name: code
      type: string
      description: Remote control button name. See Feedbacks/Notes for the enumerated code list.

# KEYBOARD command - single literal opcode dispatching to the key named in `code`
- id: keyboard
  label: Send Keyboard Code
  kind: action
  command: "KEYBOARD {code}"
  params:
    - name: code
      type: string
      description: Keyboard key name. See Feedbacks/Notes for the enumerated code list.

# ---- IRCODE / KEYBOARD code enumerations (each documented as a distinct source row) ----

# Navigation cluster
- id: ircode_up
  label: IRCODE UP
  kind: action
  command: "IRCODE UP"
  params: []

- id: ircode_down
  label: IRCODE DOWN
  kind: action
  command: "IRCODE DOWN"
  params: []

- id: ircode_left
  label: IRCODE LEFT
  kind: action
  command: "IRCODE LEFT"
  params: []

- id: ircode_right
  label: IRCODE RIGHT
  kind: action
  command: "IRCODE RIGHT"
  params: []

- id: ircode_select
  label: IRCODE SELECT
  kind: action
  command: "IRCODE SELECT"
  params: []

- id: ircode_tivo
  label: IRCODE TIVO
  kind: action
  command: "IRCODE TIVO"
  params: []

- id: ircode_livetv
  label: IRCODE LIVETV
  kind: action
  command: "IRCODE LIVETV"
  params: []

- id: ircode_guide
  label: IRCODE GUIDE
  kind: action
  command: "IRCODE GUIDE"
  params: []

- id: ircode_info
  label: IRCODE INFO
  kind: action
  command: "IRCODE INFO"
  params: []

- id: ircode_exit
  label: IRCODE EXIT
  kind: action
  command: "IRCODE EXIT"
  params: []

# Control cluster
- id: ircode_thumbsup
  label: IRCODE THUMBSUP
  kind: action
  command: "IRCODE THUMBSUP"
  params: []

- id: ircode_thumbsdown
  label: IRCODE THUMBSDOWN
  kind: action
  command: "IRCODE THUMBSDOWN"
  params: []

- id: ircode_channelup
  label: IRCODE CHANNELUP
  kind: action
  command: "IRCODE CHANNELUP"
  params: []

- id: ircode_channeldown
  label: IRCODE CHANNELDOWN
  kind: action
  command: "IRCODE CHANNELDOWN"
  params: []

- id: ircode_mute
  label: IRCODE MUTE
  kind: action
  command: "IRCODE MUTE"
  params: []

- id: ircode_volumedown
  label: IRCODE VOLUMEDOWN
  kind: action
  command: "IRCODE VOLUMEDOWN"
  params: []

- id: ircode_volumeup
  label: IRCODE VOLUMEUP
  kind: action
  command: "IRCODE VOLUMEUP"
  params: []

- id: ircode_tvinput
  label: IRCODE TVINPUT
  kind: action
  command: "IRCODE TVINPUT"
  params: []

- id: ircode_video_mode_fixed_480i
  label: IRCODE VIDEO_MODE_FIXED_480i
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_480i"
  params: []

- id: ircode_video_mode_fixed_480p
  label: IRCODE VIDEO_MODE_FIXED_480p
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_480p"
  params: []

- id: ircode_video_mode_fixed_720p
  label: IRCODE VIDEO_MODE_FIXED_720p
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_720p"
  params: []

- id: ircode_video_mode_fixed_1080i
  label: IRCODE VIDEO_MODE_FIXED_1080i
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_1080i"
  params: []

- id: ircode_video_mode_hybrid
  label: IRCODE VIDEO_MODE_HYBRID
  kind: action
  command: "IRCODE VIDEO_MODE_HYBRID"
  params: []

- id: ircode_video_mode_hybrid_720p
  label: IRCODE VIDEO_MODE_HYBRID_720p
  kind: action
  command: "IRCODE VIDEO_MODE_HYBRID_720p"
  params: []

- id: ircode_video_mode_hybrid_1080i
  label: IRCODE VIDEO_MODE_HYBRID_1080i
  kind: action
  command: "IRCODE VIDEO_MODE_HYBRID_1080i"
  params: []

- id: ircode_video_mode_native
  label: IRCODE VIDEO_MODE_NATIVE
  kind: action
  command: "IRCODE VIDEO_MODE_NATIVE"
  params: []

- id: ircode_cc_on
  label: IRCODE CC_ON
  kind: action
  command: "IRCODE CC_ON"
  params: []

- id: ircode_cc_off
  label: IRCODE CC_OFF
  kind: action
  command: "IRCODE CC_OFF"
  params: []

- id: ircode_options
  label: IRCODE OPTIONS
  kind: action
  command: "IRCODE OPTIONS"
  params: []

- id: ircode_aspect_correction_full
  label: IRCODE ASPECT_CORRECTION_FULL
  kind: action
  command: "IRCODE ASPECT_CORRECTION_FULL"
  params: []

- id: ircode_aspect_correction_panel
  label: IRCODE ASPECT_CORRECTION_PANEL
  kind: action
  command: "IRCODE ASPECT_CORRECTION_PANEL"
  params: []

- id: ircode_aspect_correction_zoom
  label: IRCODE ASPECT_CORRECTION_ZOOM
  kind: action
  command: "IRCODE ASPECT_CORRECTION_ZOOM"
  params: []

- id: ircode_aspect_correction_wide_zoom
  label: IRCODE ASPECT_CORRECTION_WIDE_ZOOM
  kind: action
  command: "IRCODE ASPECT_CORRECTION_WIDE_ZOOM"
  params: []

# TrickPlay cluster
- id: ircode_play
  label: IRCODE PLAY
  kind: action
  command: "IRCODE PLAY"
  params: []

- id: ircode_forward
  label: IRCODE FORWARD
  kind: action
  command: "IRCODE FORWARD"
  params: []

- id: ircode_reverse
  label: IRCODE REVERSE
  kind: action
  command: "IRCODE REVERSE"
  params: []

- id: ircode_pause
  label: IRCODE PAUSE
  kind: action
  command: "IRCODE PAUSE"
  params: []

- id: ircode_slow
  label: IRCODE SLOW
  kind: action
  command: "IRCODE SLOW"
  params: []

- id: ircode_replay
  label: IRCODE REPLAY
  kind: action
  command: "IRCODE REPLAY"
  params: []

- id: ircode_advance
  label: IRCODE ADVANCE
  kind: action
  command: "IRCODE ADVANCE"
  params: []

- id: ircode_record
  label: IRCODE RECORD
  kind: action
  command: "IRCODE RECORD"
  params: []

# Numeric cluster
- id: ircode_num0
  label: IRCODE NUM0
  kind: action
  command: "IRCODE NUM0"
  params: []

- id: ircode_num1
  label: IRCODE NUM1
  kind: action
  command: "IRCODE NUM1"
  params: []

- id: ircode_num2
  label: IRCODE NUM2
  kind: action
  command: "IRCODE NUM2"
  params: []

- id: ircode_num3
  label: IRCODE NUM3
  kind: action
  command: "IRCODE NUM3"
  params: []

- id: ircode_num4
  label: IRCODE NUM4
  kind: action
  command: "IRCODE NUM4"
  params: []

- id: ircode_num5
  label: IRCODE NUM5
  kind: action
  command: "IRCODE NUM5"
  params: []

- id: ircode_num6
  label: IRCODE NUM6
  kind: action
  command: "IRCODE NUM6"
  params: []

- id: ircode_num7
  label: IRCODE NUM7
  kind: action
  command: "IRCODE NUM7"
  params: []

- id: ircode_num8
  label: IRCODE NUM8
  kind: action
  command: "IRCODE NUM8"
  params: []

- id: ircode_num9
  label: IRCODE NUM9
  kind: action
  command: "IRCODE NUM9"
  params: []

- id: ircode_enter
  label: IRCODE ENTER
  kind: action
  command: "IRCODE ENTER"
  params: []

- id: ircode_clear
  label: IRCODE CLEAR
  kind: action
  command: "IRCODE CLEAR"
  params: []

# Shortcut cluster
- id: ircode_action_a
  label: IRCODE ACTION_A
  kind: action
  command: "IRCODE ACTION_A"
  params: []

- id: ircode_action_b
  label: IRCODE ACTION_B
  kind: action
  command: "IRCODE ACTION_B"
  params: []

- id: ircode_action_c
  label: IRCODE ACTION_C
  kind: action
  command: "IRCODE ACTION_C"
  params: []

- id: ircode_action_d
  label: IRCODE ACTION_D
  kind: action
  command: "IRCODE ACTION_D"
  params: []

# KEYBOARD alphabet (A-Z) - each is a distinct documented code
- id: keyboard_a
  label: KEYBOARD A
  kind: action
  command: "KEYBOARD A"
  params: []

- id: keyboard_b
  label: KEYBOARD B
  kind: action
  command: "KEYBOARD B"
  params: []

- id: keyboard_c
  label: KEYBOARD C
  kind: action
  command: "KEYBOARD C"
  params: []

- id: keyboard_d
  label: KEYBOARD D
  kind: action
  command: "KEYBOARD D"
  params: []

- id: keyboard_e
  label: KEYBOARD E
  kind: action
  command: "KEYBOARD E"
  params: []

- id: keyboard_f
  label: KEYBOARD F
  kind: action
  command: "KEYBOARD F"
  params: []

- id: keyboard_g
  label: KEYBOARD G
  kind: action
  command: "KEYBOARD G"
  params: []

- id: keyboard_h
  label: KEYBOARD H
  kind: action
  command: "KEYBOARD H"
  params: []

- id: keyboard_i
  label: KEYBOARD I
  kind: action
  command: "KEYBOARD I"
  params: []

- id: keyboard_j
  label: KEYBOARD J
  kind: action
  command: "KEYBOARD J"
  params: []

- id: keyboard_k
  label: KEYBOARD K
  kind: action
  command: "KEYBOARD K"
  params: []

- id: keyboard_l
  label: KEYBOARD L
  kind: action
  command: "KEYBOARD L"
  params: []

- id: keyboard_m
  label: KEYBOARD M
  kind: action
  command: "KEYBOARD M"
  params: []

- id: keyboard_n
  label: KEYBOARD N
  kind: action
  command: "KEYBOARD N"
  params: []

- id: keyboard_o
  label: KEYBOARD O
  kind: action
  command: "KEYBOARD O"
  params: []

- id: keyboard_p
  label: KEYBOARD P
  kind: action
  command: "KEYBOARD P"
  params: []

- id: keyboard_q
  label: KEYBOARD Q
  kind: action
  command: "KEYBOARD Q"
  params: []

- id: keyboard_r
  label: KEYBOARD R
  kind: action
  command: "KEYBOARD R"
  params: []

- id: keyboard_s
  label: KEYBOARD S
  kind: action
  command: "KEYBOARD S"
  params: []

- id: keyboard_t
  label: KEYBOARD T
  kind: action
  command: "KEYBOARD T"
  params: []

- id: keyboard_u
  label: KEYBOARD U
  kind: action
  command: "KEYBOARD U"
  params: []

- id: keyboard_v
  label: KEYBOARD V
  kind: action
  command: "KEYBOARD V"
  params: []

- id: keyboard_w
  label: KEYBOARD W
  kind: action
  command: "KEYBOARD W"
  params: []

- id: keyboard_x
  label: KEYBOARD X
  kind: action
  command: "KEYBOARD X"
  params: []

- id: keyboard_y
  label: KEYBOARD Y
  kind: action
  command: "KEYBOARD Y"
  params: []

- id: keyboard_z
  label: KEYBOARD Z
  kind: action
  command: "KEYBOARD Z"
  params: []

# KEYBOARD special characters
- id: keyboard_minus
  label: KEYBOARD MINUS
  kind: action
  command: "KEYBOARD MINUS"
  params: []

- id: keyboard_equals
  label: KEYBOARD EQUALS
  kind: action
  command: "KEYBOARD EQUALS"
  params: []

- id: keyboard_lbracket
  label: KEYBOARD LBRACKET
  kind: action
  command: "KEYBOARD LBRACKET"
  params: []

- id: keyboard_rbracket
  label: KEYBOARD RBRACKET
  kind: action
  command: "KEYBOARD RBRACKET"
  params: []

- id: keyboard_backslash
  label: KEYBOARD BACKSLASH
  kind: action
  command: "KEYBOARD BACKSLASH"
  params: []

- id: keyboard_semicolon
  label: KEYBOARD SEMICOLON
  kind: action
  command: "KEYBOARD SEMICOLON"
  params: []

- id: keyboard_quote
  label: KEYBOARD QUOTE
  kind: action
  command: "KEYBOARD QUOTE"
  params: []

- id: keyboard_comma
  label: KEYBOARD COMMA
  kind: action
  command: "KEYBOARD COMMA"
  params: []

- id: keyboard_period
  label: KEYBOARD PERIOD
  kind: action
  command: "KEYBOARD PERIOD"
  params: []

- id: keyboard_slash
  label: KEYBOARD SLASH
  kind: action
  command: "KEYBOARD SLASH"
  params: []

- id: keyboard_backquote
  label: KEYBOARD BACKQUOTE
  kind: action
  command: "KEYBOARD BACKQUOTE"
  params: []

- id: keyboard_space
  label: KEYBOARD SPACE
  kind: action
  command: "KEYBOARD SPACE"
  params: []

# KEYBOARD navigation
- id: keyboard_kbdup
  label: KEYBOARD KBDUP
  kind: action
  command: "KEYBOARD KBDUP"
  params: []

- id: keyboard_kbddown
  label: KEYBOARD KBDDOWN
  kind: action
  command: "KEYBOARD KBDDOWN"
  params: []

- id: keyboard_kbdleft
  label: KEYBOARD KBDLEFT
  kind: action
  command: "KEYBOARD KBDLEFT"
  params: []

- id: keyboard_kbdright
  label: KEYBOARD KBDRIGHT
  kind: action
  command: "KEYBOARD KBDRIGHT"
  params: []

- id: keyboard_pageup
  label: KEYBOARD PAGEUP
  kind: action
  command: "KEYBOARD PAGEUP"
  params: []

- id: keyboard_pagedown
  label: KEYBOARD PAGEDOWN
  kind: action
  command: "KEYBOARD PAGEDOWN"
  params: []

- id: keyboard_home
  label: KEYBOARD HOME
  kind: action
  command: "KEYBOARD HOME"
  params: []

- id: keyboard_end
  label: KEYBOARD END
  kind: action
  command: "KEYBOARD END"
  params: []

# KEYBOARD edit
- id: keyboard_caps
  label: KEYBOARD CAPS
  kind: action
  command: "KEYBOARD CAPS"
  params: []

- id: keyboard_lshift
  label: KEYBOARD LSHIFT
  kind: action
  command: "KEYBOARD LSHIFT"
  params: []

- id: keyboard_rshift
  label: KEYBOARD RSHIFT
  kind: action
  command: "KEYBOARD RSHIFT"
  params: []

- id: keyboard_insert
  label: KEYBOARD INSERT
  kind: action
  command: "KEYBOARD INSERT"
  params: []

- id: keyboard_backspace
  label: KEYBOARD BACKSPACE
  kind: action
  command: "KEYBOARD BACKSPACE"
  params: []

- id: keyboard_delete
  label: KEYBOARD DELETE
  kind: action
  command: "KEYBOARD DELETE"
  params: []

- id: keyboard_kbdenter
  label: KEYBOARD KBDENTER
  kind: action
  command: "KEYBOARD KBDENTER"
  params: []

# KEYBOARD control (also supported)
- id: keyboard_stop
  label: KEYBOARD STOP
  kind: action
  command: "KEYBOARD STOP"
  params: []

- id: keyboard_video_on_demand
  label: KEYBOARD VIDEO_ON_DEMAND
  kind: action
  command: "KEYBOARD VIDEO_ON_DEMAND"
  params: []
```

## Feedbacks

```yaml
- id: ch_status
  type: string
  description: >
    Success response after SETCH or FORCECH channel change. Format:
    CH_STATUS {channel} {sub_channel} {reason} where channel and sub_channel
    are fixed 4-digit zero-padded numbers and reason is REMOTE, LOCAL, or
    RECORDING. Broadcast to all open clients on success.

- id: ch_failed
  type: string
  description: >
    Failure response after SETCH or FORCECH. Format: CH_FAILED {reason}.
    Reason is NO_LIVE, MISSING_CHANNEL, MALFORMED_CHANNEL, INVALID_CHANNEL,
    or (SETCH only) RECORDING. Sent only to the issuing client.

- id: livetv_ready
  type: string
  description: >
    Success response after TELEPORT LIVETV, indicating the DVR is now in
    live TV mode. Clients must wait for this before issuing SETCH or FORCECH.

- id: missing_teleport_name
  type: string
  description: >
    Failure response after TELEPORT issued without a screen parameter.
```

## Variables

```yaml
# No discrete settable parameter set is documented in this protocol reference
# beyond the parameters embedded in command opcodes (channel, sub_channel,
# screen, code). Section omitted.
```

## Events

```yaml
- id: ch_status_broadcast
  description: >
    After a successful SETCH or FORCECH, the DVR broadcasts the CH_STATUS
    message to ALL open TCP clients, not only the issuing client.

- id: ch_failed_private
  description: >
    After a failed SETCH or FORCECH, the DVR sends CH_FAILED only to the
    client that issued the command.

- id: ircode_queue_overflow
  description: >
    If IRCODE requests arrive faster than the DVR can process them, the DVR
    queues them and processes them in arrival order. No explicit overflow
    message is documented.

- id: keyboard_queue_overflow
  description: >
    If KEYBOARD requests arrive faster than the DVR can process them, the
    DVR queues them and processes them in arrival order.
```

## Macros

```yaml
# UNRESOLVED: source does not document multi-step sequences the device itself
# exposes as named macros. Section left for operator-supplied recipes.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
```

## Notes

- Protocol is plaintext ASCII over TCP; no authentication. TiVo software version 9.4 or later requires the user to manually enable Network Remote Control under `TiVo Central > Messages & Settings > Settings > Remote, CableCARD & Devices > Network Remote Control` before the DVR accepts connections on port 31339.
- Every command packet is a single uppercase ASCII line terminated by `\r` (carriage return).
- For uppercase characters or symbols, the shift modifier (`KEYBOARD LSHIFT` or `KEYBOARD RSHIFT`) applies only to the immediately following KEYBOARD command.
- `FORCECH` cancels a recording in progress to change channel; `SETCH` refuses to interrupt a recording and returns `CH_FAILED RECORDING`.
- `TELEPORT` is silently no-op on success except for `LIVETV`, which returns `LIVETV_READY`. `TELEPORT` is the only documented failure case under Guided Setup.
- `KEYBOARD A` … `KEYBOARD Z` are explicitly supported; the full enumerated code list is in Appendix A of the source.
- A complete code list for both `IRCODE` and `KEYBOARD` is reproduced as discrete Actions above (Navigation, Control, TrickPlay, Numeric, Shortcut, Keyboard-only alphabet/specials/navigation/edit/control).

<!-- UNRESOLVED: Firmware version compatibility for the TCD 849500 Series is not stated; source refers generically to "TiVo software v9.4" as the version that introduced the off-by-default flag, but no per-model firmware string is documented. -->

## Provenance

```yaml
source_domains:
  - github.com
  - yumpu.com
  - silo.tips
source_urls:
  - https://github.com/wcbonner/WimTiVoServer/raw/master/TiVoDocs/TiVo_TCP_Network_Remote_Control_Protocol.pdf
  - https://www.yumpu.com/en/document/view/42026982/tcp-remote-protocol-version-1-1-tivo
  - https://silo.tips/download/tcp-remote-protocol-version-11
retrieved_at: 2026-04-30T11:11:11.325Z
last_checked_at: 2026-09-22T11:47:59.820Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:47:59.820Z
matched_actions: 117
action_count: 117
confidence: medium
summary: "All 117 spec action units (5 opcodes + 112 IRCODE/KEYBOARD codes from Appendix A) appear verbatim in source; transport port 31339 documented; coverage is complete. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "No model-specific electrical, power, or fault-recovery data is documented in this protocol reference; this spec covers only the TCP remote-control command surface."
- "source does not document multi-step sequences the device itself"
- "Firmware version compatibility for the TCD 849500 Series is not stated; source refers generically to \"TiVo software v9.4\" as the version that introduced the off-by-default flag, but no per-model firmware string is documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
