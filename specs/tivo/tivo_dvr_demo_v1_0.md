---
spec_id: admin/tivo-dvr-demo-v1-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "TiVo DVR Control Spec"
manufacturer: TiVo
model_family: "TiVo DVR"
aliases: []
compatible_with:
  manufacturers:
    - TiVo
  models:
    - "TiVo DVR"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
  - yumpu.com
source_urls:
  - https://github.com/wcbonner/WimTiVoServer/raw/master/TiVoDocs/TiVo_TCP_Network_Remote_Control_Protocol.pdf
  - https://www.yumpu.com/en/document/view/42026982/tcp-remote-protocol-version-1-1-tivo
retrieved_at: 2026-04-29T14:57:34.184Z
last_checked_at: 2026-08-28T22:16:52.413Z
generated_at: 2026-08-28T22:16:52.413Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific DVR model lineup not identified in source. Source references \"TCD channel lineup\" but no specific model number."
  - "no explicit power on/off commands in source. DVR power is not controlled via this protocol - Network Remote Control must first be enabled via UI. Not adding powerable trait."
  - "source documents no settable parameters beyond command arguments."
  - "source documents no multi-step macro sequences."
  - "specific DVR model numbers/series not identified in source. Source refers generically to \"TiVo DVR\" and \"TCD channel lineup\" without naming a specific product."
  - "firmware version requirements — source only states \"Beginning with version 9.4 of the TiVo software, this feature is turned off by default\" without listing supported firmware versions or minimum version for the protocol itself."
verification:
  verdict: verified
  checked_at: 2026-08-28T22:16:52.413Z
  matched_actions: 64
  action_count: 64
  confidence: medium
  summary: "All 64 spec actions map to the 5 wire-level commands (IRCODE, KEYBOARD, SETCH, FORCECH, TELEPORT) in the source, and TCP port 31339 is verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-28
---

# TiVo DVR Control Spec

## Summary
TiVo DVR TCP remote control protocol (v1.1). ASCII command set over TCP port 31339 for channel tuning, UI navigation, and simulated remote button presses. No authentication.

<!-- UNRESOLVED: specific DVR model lineup not identified in source. Source references "TCD channel lineup" but no specific model number. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 31339
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# UNRESOLVED: no explicit power on/off commands in source. DVR power is not controlled via this protocol - Network Remote Control must first be enabled via UI. Not adding powerable trait.
# - routable        (input/source switching not present)
# - queryable       (no query commands returning device state)
```

## Actions
```yaml
- id: forcech
  label: Force Channel Change
  kind: action
  command: "FORCECH {channel}"
  params:
    - name: channel
      type: integer
      description: Channel number 1 to max in lineup
    - name: sub_channel
      type: integer
      description: Sub-channel number (optional)
  notes: Cancels in-progress recording. DVR must be in Live TV.

- id: forcech_sub
  label: Force Channel Change (sub-channel)
  kind: action
  command: "FORCECH {channel} {sub_channel}"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: sub_channel
      type: integer
      description: Sub-channel number
  notes: Redundant with forcech when sub_channel provided; included for completeness per source syntax listing.

- id: setch
  label: Set Channel
  kind: action
  command: "SETCH {channel}"
  params:
    - name: channel
      type: integer
      description: Channel number 1 to max in lineup
    - name: sub_channel
      type: integer
      description: Sub-channel number (optional)
  notes: Fails if recording in progress. DVR must be in Live TV.

- id: setch_sub
  label: Set Channel (sub-channel)
  kind: action
  command: "SETCH {channel} {sub_channel}"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: sub_channel
      type: integer
      description: Sub-channel number
  notes: Redundant with setch when sub_channel provided.

- id: ircode
  label: Send IR Code
  kind: action
  command: "IRCODE {code}"
  params:
    - name: code
      type: string
      description: IR code name from Appendix A (e.g. SELECT, UP, DOWN, PLAY, PAUSE)
  notes: Code always processed; effect depends on UI state.

- id: keyboard
  label: Send Keyboard Code
  kind: action
  command: "KEYBOARD {code}"
  params:
    - name: code
      type: string
      description: Keyboard key name from Appendix A (e.g. A-Z, LSHIFT, SPACE)
  notes: Shift modifiers apply to next KEYBOARD command only.

- id: teleport
  label: Teleport to Screen
  kind: action
  command: "TELEPORT {screen}"
  params:
    - name: screen
      type: enum
      values: [TIVO, LIVETV, GUIDE, NOWPLAYING]
      description: Target UI screen
  notes: LIVETV returns LIVETV_READY; other targets return no response. Fails during Guided Setup.

# Appendix A button codes - each code as separate action per source enumeration.
- id: ircode_up
  label: IR Code Up
  kind: action
  command: "IRCODE UP"
  params: []

- id: ircode_down
  label: IR Code Down
  kind: action
  command: "IRCODE DOWN"
  params: []

- id: ircode_left
  label: IR Code Left
  kind: action
  command: "IRCODE LEFT"
  params: []

- id: ircode_right
  label: IR Code Right
  kind: action
  command: "IRCODE RIGHT"
  params: []

- id: ircode_select
  label: IR Code Select
  kind: action
  command: "IRCODE SELECT"
  params: []

- id: ircode_tivo
  label: IR Code TiVo
  kind: action
  command: "IRCODE TIVO"
  params: []

- id: ircode_livetv
  label: IR Code Live TV
  kind: action
  command: "IRCODE LIVETV"
  params: []

- id: ircode_guide
  label: IR Code Guide
  kind: action
  command: "IRCODE GUIDE"
  params: []

- id: ircode_info
  label: IR Code Info
  kind: action
  command: "IRCODE INFO"
  params: []

- id: ircode_exit
  label: IR Code Exit
  kind: action
  command: "IRCODE EXIT"
  params: []

- id: ircode_thumbsup
  label: IR Code Thumbs Up
  kind: action
  command: "IRCODE THUMBSUP"
  params: []

- id: ircode_thumbsdown
  label: IR Code Thumbs Down
  kind: action
  command: "IRCODE THUMBSDOWN"
  params: []

- id: ircode_channelup
  label: IR Code Channel Up
  kind: action
  command: "IRCODE CHANNELUP"
  params: []

- id: ircode_channeldown
  label: IR Code Channel Down
  kind: action
  command: "IRCODE CHANNELDOWN"
  params: []

- id: ircode_mute
  label: IR Code Mute
  kind: action
  command: "IRCODE MUTE"
  params: []

- id: ircode_volumedown
  label: IR Code Volume Down
  kind: action
  command: "IRCODE VOLUMEDOWN"
  params: []

- id: ircode_volumeup
  label: IR Code Volume Up
  kind: action
  command: "IRCODE VOLUMEUP"
  params: []

- id: ircode_tvinput
  label: IR Code TV Input
  kind: action
  command: "IRCODE TVINPUT"
  params: []

- id: ircode_video_mode_fixed_480i
  label: IR Code Video Mode 480i
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_480i"
  params: []

- id: ircode_video_mode_fixed_480p
  label: IR Code Video Mode 480p
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_480p"
  params: []

- id: ircode_video_mode_fixed_720p
  label: IR Code Video Mode 720p
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_720p"
  params: []

- id: ircode_video_mode_fixed_1080i
  label: IR Code Video Mode 1080i
  kind: action
  command: "IRCODE VIDEO_MODE_FIXED_1080i"
  params: []

- id: ircode_video_mode_hybrid
  label: IR Code Video Mode Hybrid
  kind: action
  command: "IRCODE VIDEO_MODE_HYBRID"
  params: []

- id: ircode_video_mode_hybrid_720p
  label: IR Code Video Mode Hybrid 720p
  kind: action
  command: "IRCODE VIDEO_MODE_HYBRID_720p"
  params: []

- id: ircode_video_mode_hybrid_1080i
  label: IR Code Video Mode Hybrid 1080i
  kind: action
  command: "IRCODE VIDEO_MODE_HYBRID_1080i"
  params: []

- id: ircode_video_mode_native
  label: IR Code Video Mode Native
  kind: action
  command: "IRCODE VIDEO_MODE_NATIVE"
  params: []

- id: ircode_cc_on
  label: IR Code CC On
  kind: action
  command: "IRCODE CC_ON"
  params: []

- id: ircode_cc_off
  label: IR Code CC Off
  kind: action
  command: "IRCODE CC_OFF"
  params: []

- id: ircode_options
  label: IR Code Options
  kind: action
  command: "IRCODE OPTIONS"
  params: []

- id: ircode_aspect_correction_full
  label: IR Code Aspect Full
  kind: action
  command: "IRCODE ASPECT_CORRECTION_FULL"
  params: []

- id: ircode_aspect_correction_panel
  label: IR Code Aspect Panel
  kind: action
  command: "IRCODE ASPECT_CORRECTION_PANEL"
  params: []

- id: ircode_aspect_correction_zoom
  label: IR Code Aspect Zoom
  kind: action
  command: "IRCODE ASPECT_CORRECTION_ZOOM"
  params: []

- id: ircode_aspect_correction_wide_zoom
  label: IR Code Aspect Wide Zoom
  kind: action
  command: "IRCODE ASPECT_CORRECTION_WIDE_ZOOM"
  params: []

- id: ircode_play
  label: IR Code Play
  kind: action
  command: "IRCODE PLAY"
  params: []

- id: ircode_forward
  label: IR Code Forward
  kind: action
  command: "IRCODE FORWARD"
  params: []

- id: ircode_reverse
  label: IR Code Reverse
  kind: action
  command: "IRCODE REVERSE"
  params: []

- id: ircode_pause
  label: IR Code Pause
  kind: action
  command: "IRCODE PAUSE"
  params: []

- id: ircode_slow
  label: IR Code Slow
  kind: action
  command: "IRCODE SLOW"
  params: []

- id: ircode_replay
  label: IR Code Replay
  kind: action
  command: "IRCODE REPLAY"
  params: []

- id: ircode_advance
  label: IR Code Advance
  kind: action
  command: "IRCODE ADVANCE"
  params: []

- id: ircode_record
  label: IR Code Record
  kind: action
  command: "IRCODE RECORD"
  params: []

- id: ircode_num0
  label: IR Code 0
  kind: action
  command: "IRCODE NUM0"
  params: []

- id: ircode_num1
  label: IR Code 1
  kind: action
  command: "IRCODE NUM1"
  params: []

- id: ircode_num2
  label: IR Code 2
  kind: action
  command: "IRCODE NUM2"
  params: []

- id: ircode_num3
  label: IR Code 3
  kind: action
  command: "IRCODE NUM3"
  params: []

- id: ircode_num4
  label: IR Code 4
  kind: action
  command: "IRCODE NUM4"
  params: []

- id: ircode_num5
  label: IR Code 5
  kind: action
  command: "IRCODE NUM5"
  params: []

- id: ircode_num6
  label: IR Code 6
  kind: action
  command: "IRCODE NUM6"
  params: []

- id: ircode_num7
  label: IR Code 7
  kind: action
  command: "IRCODE NUM7"
  params: []

- id: ircode_num8
  label: IR Code 8
  kind: action
  command: "IRCODE NUM8"
  params: []

- id: ircode_num9
  label: IR Code 9
  kind: action
  command: "IRCODE NUM9"
  params: []

- id: ircode_enter
  label: IR Code Enter
  kind: action
  command: "IRCODE ENTER"
  params: []

- id: ircode_clear
  label: IR Code Clear
  kind: action
  command: "IRCODE CLEAR"
  params: []

- id: ircode_action_a
  label: IR Code Action A
  kind: action
  command: "IRCODE ACTION_A"
  params: []

- id: ircode_action_b
  label: IR Code Action B
  kind: action
  command: "IRCODE ACTION_B"
  params: []

- id: ircode_action_c
  label: IR Code Action C
  kind: action
  command: "IRCODE ACTION_C"
  params: []

- id: ircode_action_d
  label: IR Code Action D
  kind: action
  command: "IRCODE ACTION_D"
  params: []
```

## Feedbacks
```yaml
- id: ch_status
  type: object
  description: Channel change status notification (broadcast to all clients on success)
  fields:
    - name: channel
      type: string
      description: 4-digit primary channel
    - name: sub_channel
      type: string
      description: 4-digit sub-channel (may be absent)
    - name: reason
      type: enum
      values: [REMOTE, LOCAL, RECORDING]
      description: Source of channel change

- id: ch_failed
  type: object
  description: Channel change failure (sent only to issuing client)
  fields:
    - name: reason
      type: enum
      values: [NO_LIVE, RECORDING, MISSING_CHANNEL, MALFORMED_CHANNEL, INVALID_CHANNEL]
      description: Failure reason code

- id: livetv_ready
  type: string
  description: Returned after TELEPORT LIVETV succeeds; signals DVR is in live TV mode. Clients must wait for this before issuing SETCH or FORCECH.

- id: missing_teleport_name
  type: string
  description: Returned when TELEPORT issued without required screen parameter
```

## Variables
```yaml
# UNRESOLVED: source documents no settable parameters beyond command arguments.
```

## Events
```yaml
# CH_STATUS is broadcast to all open clients on every channel change (including from physical remote or internal recording triggers). Treated as unsolicited notification.
- id: ch_status_broadcast
  description: CH_STATUS channel [sub_channel] reason - emitted to all clients on any channel change
  payload: "CH_STATUS {channel} [{sub_channel}] {reason}"
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: FORCECH cancels any recording in progress.
    source: "FORCECH section"
  - description: SETCH fails (CH_FAILED RECORDING) if recording is in progress.
    source: "SETCH failure responses"
  - description: TELEPORT fails during Guided Setup.
    source: "TELEPORT section"
  - description: Network Remote Control is disabled by default since TiVo software v9.4; must be explicitly enabled via TiVo Central > Messages & Settings > Settings > Remote, CableCARD & Devices > Network Remote Control.
    source: "Important section"
```

## Notes
- Protocol version 1.1 per document header.
- TCP port 31339; ASCII commands terminated by CR (carriage return).
- Command packets are single lines of uppercase text; command and parameters separated by single spaces.
- FORCECH and SETCH require DVR to be in Live TV mode — issue TELEPORT LIVETV first and wait for LIVETV_READY before sending channel change.
- Channel and sub-channel parameters: integers 1 to lineup max; leading zeros optional but allowed; returned values are fixed 4-digit.
- KEYBOARD LSHIFT/RSHIFT/CAPS affect only the immediately following KEYBOARD command (for LSHIFT/RSHIFT); CAPS toggles persistent mode.
- IRCODE always processed by DVR but may be ignored or have unexpected effect depending on UI state.
- KEYBOARD may be ignored or disallowed depending on UI state; can produce unexpected behavior.
- Requests queue if sent faster than DVR can process; processed in arrival order.
- Source: "TCP Remote Protocol, version 1.1" — TiVo vendor document.

<!-- UNRESOLVED: specific DVR model numbers/series not identified in source. Source refers generically to "TiVo DVR" and "TCD channel lineup" without naming a specific product. -->

<!-- UNRESOLVED: firmware version requirements — source only states "Beginning with version 9.4 of the TiVo software, this feature is turned off by default" without listing supported firmware versions or minimum version for the protocol itself. -->

## Provenance

```yaml
source_domains:
  - github.com
  - yumpu.com
source_urls:
  - https://github.com/wcbonner/WimTiVoServer/raw/master/TiVoDocs/TiVo_TCP_Network_Remote_Control_Protocol.pdf
  - https://www.yumpu.com/en/document/view/42026982/tcp-remote-protocol-version-1-1-tivo
retrieved_at: 2026-04-29T14:57:34.184Z
last_checked_at: 2026-08-28T22:16:52.413Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-28T22:16:52.413Z
matched_actions: 64
action_count: 64
confidence: medium
summary: "All 64 spec actions map to the 5 wire-level commands (IRCODE, KEYBOARD, SETCH, FORCECH, TELEPORT) in the source, and TCP port 31339 is verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific DVR model lineup not identified in source. Source references \"TCD channel lineup\" but no specific model number."
- "no explicit power on/off commands in source. DVR power is not controlled via this protocol - Network Remote Control must first be enabled via UI. Not adding powerable trait."
- "source documents no settable parameters beyond command arguments."
- "source documents no multi-step macro sequences."
- "specific DVR model numbers/series not identified in source. Source refers generically to \"TiVo DVR\" and \"TCD channel lineup\" without naming a specific product."
- "firmware version requirements — source only states \"Beginning with version 9.4 of the TiVo software, this feature is turned off by default\" without listing supported firmware versions or minimum version for the protocol itself."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
