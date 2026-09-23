---
spec_id: admin/tivo-series-3-4-5
schema_version: ai4av-public-spec-v1
revision: 1
title: "TIVO Series 3/4/5 Control Spec"
manufacturer: TIVO
model_family: "Series 3"
aliases: []
compatible_with:
  manufacturers:
    - TIVO
  models:
    - "Series 3"
    - "Series 4"
    - "Series 5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - github.com
  - silo.tips
source_urls:
  - https://raw.githubusercontent.com/blantz/homebridge-tivo-control/main/doc/TiVo_TCP_Network_Remote_Control_Protocol.pdf
  - https://github.com/wcbonner/WimTiVoServer/raw/master/TiVoDocs/TiVo_TCP_Network_Remote_Control_Protocol.pdf
  - https://silo.tips/download/tcp-remote-protocol-version-11
retrieved_at: 2026-05-21T23:43:10.434Z
last_checked_at: 2026-09-22T11:47:28.531Z
generated_at: 2026-09-22T11:47:28.531Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "any feedback/variable state for channel number is dynamic (depends on channel lineup); the source documents the message format but not a fixed enumerated list."
  - "protocol version (\"1.1\" appears in source chunk0 header but is not formally tagged as a protocol version field)."
  - "exact firmware version list that introduced/changed this feature — source says \"beginning with version 9.4\" but does not enumerate all compatible firmware."
verification:
  verdict: verified
  checked_at: 2026-09-22T11:47:28.531Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec actions (FORCECH/SETCH/TELEPORT/KEYBOARD + IRCODE codes from Appendix A) match source verbatim; transport port 31339 confirmed. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-08
---

# TIVO Series 3/4/5 Control Spec

## Summary
ASCII-based TCP command protocol for remote control of TiVo Series 3/4/5 DVRs. Sends simulated remote-control and keyboard button presses, tunes channels, and teleports to specific UI screens. Network Remote Control must be enabled in device settings (off by default since software v9.4).

<!-- UNRESOLVED: any feedback/variable state for channel number is dynamic (depends on channel lineup); the source documents the message format but not a fixed enumerated list. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 31339
auth:
  type: none  # inferred: no auth procedure in source; access controlled by per-device Network Remote Control toggle, not by protocol auth
```

## Traits
```yaml
# powerable: not stated (no documented power on/off command)
# routable: not stated (no documented input/output routing command)
# queryable: not stated (no query commands returning state; SETCH/FORCECH have response messages but no separate "what channel am I on?" query)
# levelable: not stated (volume up/down/mute exist as IRCODE buttons, not as numeric level control)
```

## Actions
```yaml
# Each command the source documents is a separate action entry.
# IRCODE buttons are enumerated individually per Appendix A tables (each is a distinct row in the source).
# KEYBOARD alphabet A-Z listed by source as a single block; treated as one parameterized action.

- id: forcech
  label: Force Channel Change
  kind: action
  command: "FORCECH {channel} {sub_channel}"
  params:
    - name: channel
      type: integer
      description: Primary channel number, 1 to max channel list (leading zeros optional).
    - name: sub_channel
      type: integer
      required: false
      description: Sub-channel number, 1 to max channel list (leading zeros optional).

- id: setch
  label: Set Channel (no recording cancel)
  kind: action
  command: "SETCH {channel} {sub_channel}"
  params:
    - name: channel
      type: integer
      description: Primary channel number, 1 to max channel list (leading zeros optional).
    - name: sub_channel
      type: integer
      required: false
      description: Sub-channel number, 1 to max channel list (leading zeros optional).

- id: teleport
  label: Teleport to UI screen
  kind: action
  command: "TELEPORT {screen}"
  params:
    - name: screen
      type: enum
      values: [TIVO, LIVETV, GUIDE, NOWPLAYING]

- id: keyboard
  label: Send Keyboard Key
  kind: action
  command: "KEYBOARD {code}"
  params:
    - name: code
      type: string
      description: Keyboard key name (A-Z, modifier keys LSHIFT/RSHIFT/CAPS, special chars per Appendix A).

# IRCODE - Navigation Buttons
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

# IRCODE - Control Buttons
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

# IRCODE - TrickPlay Buttons
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

# IRCODE - Numeric Buttons
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

# IRCODE - Shortcut Buttons
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
```

## Feedbacks
```yaml
# Channel-change status messages broadcast to all open clients on success.
- id: ch_status
  type: object
  description: Returned after successful FORCECH or SETCH (also broadcast to other connected clients).
  fields:
    - name: channel
      type: string
      description: Fixed 4-digit primary channel number.
    - name: sub_channel
      type: string
      required: false
      description: Fixed 4-digit sub-channel number.
    - name: reason
      type: enum
      values: [REMOTE, LOCAL, RECORDING]

# Channel-change failure - only returned to the issuing client.
- id: ch_failed
  type: object
  description: Returned to the issuing client when SETCH or FORCECH fails.
  fields:
    - name: reason
      type: enum
      description: One of NO_LIVE, MISSING_CHANNEL, MALFORMED_CHANNEL, INVALID_CHANNEL (SETCH additionally may return RECORDING).

# TELEPORT success (only returned for LIVETV target).
- id: livetv_ready
  type: string
  description: Returned after TELEPORT LIVETV succeeds; clients must wait for this before issuing SETCH or FORCECH.

# TELEPORT failure.
- id: missing_teleport_name
  type: string
  description: Returned when TELEPORT is issued without a required screen parameter.
```

## Variables
```yaml
# No discrete settable parameters beyond those captured in Actions.
```

## Events
```yaml
# CH_STATUS is broadcast to all open clients after a successful channel change, regardless of
# which client initiated it. Treat as an unsolicited event channel.
- id: ch_status_event
  description: "CH_STATUS channel [sub-channel] reason - broadcast to all open clients on successful channel change (REMOTE/LOCAL/RECORDING)."
```

## Macros
```yaml
# No multi-step sequences defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# FORCECH cancels a recording in progress if necessary; SETCH fails with RECORDING reason# rather than cancel. Source documents this behavior but does not define an interlock.
```

## Notes
- Network Remote Control must be enabled per-device (Settings > Remote, CableCARD & Devices > Network Remote Control > Enabled). Off by default since TiVo software v9.4.
- Commands are uppercase ASCII, single-line, terminated by carriage return (`\r`). Parameters separated by single spaces.
- Port: 31339 (TCP).
- No protocol-level authentication; access gating is via the per-device Network Remote Control toggle.
- IRCODE buttons may be unused or disallowed depending on UI state — the DVR is guaranteed to process the code, but the resulting effect is not guaranteed.
- KEYBOARD requests are queued and processed in order if they arrive faster than the DVR can handle them.
- TELEPORT only returns a success response when issued with LIVETV; other valid targets (TIVO, GUIDE, NOWPLAYING) return nothing on success.
- SETCH returns CH_FAILED with reason RECORDING when a recording is in progress; FORCECH cancels the recording to tune the channel.

<!-- UNRESOLVED: protocol version ("1.1" appears in source chunk0 header but is not formally tagged as a protocol version field). -->
<!-- UNRESOLVED: exact firmware version list that introduced/changed this feature — source says "beginning with version 9.4" but does not enumerate all compatible firmware. -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - github.com
  - silo.tips
source_urls:
  - https://raw.githubusercontent.com/blantz/homebridge-tivo-control/main/doc/TiVo_TCP_Network_Remote_Control_Protocol.pdf
  - https://github.com/wcbonner/WimTiVoServer/raw/master/TiVoDocs/TiVo_TCP_Network_Remote_Control_Protocol.pdf
  - https://silo.tips/download/tcp-remote-protocol-version-11
retrieved_at: 2026-05-21T23:43:10.434Z
last_checked_at: 2026-09-22T11:47:28.531Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:47:28.531Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec actions (FORCECH/SETCH/TELEPORT/KEYBOARD + IRCODE codes from Appendix A) match source verbatim; transport port 31339 confirmed. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "any feedback/variable state for channel number is dynamic (depends on channel lineup); the source documents the message format but not a fixed enumerated list."
- "protocol version (\"1.1\" appears in source chunk0 header but is not formally tagged as a protocol version field)."
- "exact firmware version list that introduced/changed this feature — source says \"beginning with version 9.4\" but does not enumerate all compatible firmware."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
