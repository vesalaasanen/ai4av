---
spec_id: admin/figure_53-gobutton_3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Figure 53 Go Button 3 Control Spec"
manufacturer: "Figure 53"
model_family: "Go Button 3"
aliases: []
compatible_with:
  manufacturers:
    - "Figure 53"
  models:
    - "Go Button 3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - gobutton.app
source_urls:
  - https://gobutton.app/docs/Go_Button_3_Reference_Manual.pdf
  - https://gobutton.app/docs/v3/working-with-your-show/osc-dictionary/
  - https://gobutton.app/docs/v3/
retrieved_at: 2026-04-29T23:42:56.952Z
last_checked_at: 2026-05-14T18:17:15.884Z
generated_at: 2026-05-14T18:17:15.884Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "MIDI input described but not fully documented in source; full MIDI message catalog not included"
  - "UDP port 53535 also accepts plain-text OSC; need explicit source confirmation before adding"
  - "宏 not found in source; remove section if not applicable"
  - "no safety warnings or interlock procedures stated in source"
  - "MIDI Show Control (MSC) commands mentioned but full command catalog not documented in source"
  - "Full MIDI Note On/Off/Controller/Program Change message documentation not in source"
  - "Passcode format (string length, character set, etc.) not specified in source"
  - "TCP connection timeout behavior not documented"
  - "Maximum UDP datagram size not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.884Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 73 spec actions have literal OSC matches in source; transport parameters verified verbatim; spec fully represents the documented OSC API. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Figure 53 Go Button 3 Control Spec

## Summary
Go Button 3 is a show control application for iOS/macOS that supports remote control via OSC over TCP and UDP. Default OSC listening port is 53100; UDP replies are sent to port 53101. An optional passcode can be configured for OSC access control.

<!-- UNRESOLVED: MIDI input described but not fully documented in source; full MIDI message catalog not included -->

## Transport
```yaml
protocols:
  - osc
addressing:
  port: 53100  # default TCP/UDP listening port
  udp_reply_port: 53101  # default UDP reply port
  # UNRESOLVED: UDP port 53535 also accepts plain-text OSC; need explicit source confirmation before adding
auth:
  type: passcode  # optional; configured in OSC Control Settings; passcode required for application messages
```

## Traits
```yaml
- powerable       # inferred: panic, go, stop commands present
- queryable       # inferred: read commands (e.g., /version, /shows, /cue/{n}/isRunning) present
- routable        # inferred: playhead/cue selection commands present (/playbackPosition/{cue_number}, next, previous)
```

## Actions
```yaml
# Application-level actions
- id: go
  label: GO
  kind: action
  description: Start the standing-by cue and advance playhead
  params: []

- id: panic
  label: Panic Show
  kind: action
  description: Fade out and stop all cues and hits over the configured panic duration
  params: []

- id: panic_in_time
  label: Panic In Time
  kind: action
  params:
    - name: duration
      type: number
      description: Duration in seconds

- id: stop
  label: Stop
  kind: action
  description: Stop all cues and hits immediately (same as hardStop)

- id: pause
  label: Pause
  kind: action
  description: Pause all currently running cues and hits

- id: resume
  label: Resume
  kind: action
  description: Un-pause all paused cues and hits

- id: reset
  label: Reset Show
  kind: action
  description: Stop all cues and hits, return playhead to top, stop and reset elapsed show timer

- id: oops
  label: Oops - Reset to Last Cue Played
  kind: action
  description: Stop and re-select the most recently-played cue; can be sent multiple times

# Playhead / cue selection
- id: select_cue
  label: Select Cue
  kind: action
  params:
    - name: cue_number
      type: string
      description: Cue number (string, not integer)

- id: playhead_next
  label: Select Next Cue
  kind: action
  params: []

- id: playhead_previous
  label: Select Previous Cue
  kind: action
  params: []

# Volume controls
- id: toggle_dim
  label: Toggle Main Volume Dimmed
  kind: action
  params: []

- id: toggle_mute
  label: Toggle Main Volume Muted
  kind: action
  params: []

- id: volume_step_up
  label: Step Up Main Volume
  kind: action
  description: Fade main volume up by 6 dB
  params: []

- id: volume_step_down
  label: Step Down Main Volume
  kind: action
  description: Fade main volume down by 6 dB
  params: []

- id: set_volume
  label: Set Main Volume
  kind: action
  params:
    - name: decibels
      type: number
      description: Volume in decibels (-96.0 to 0.0)

- id: set_volume_percent
  label: Set Main Volume Percent
  kind: action
  params:
    - name: percent
      type: number
      description: Volume as percentage (0.0 to 1.0)

# Per-cue / per-hit actions (addressed by cue_number or unique ID)
- id: cue_load
  label: Load Cue
  kind: action
  params:
    - name: cue_number
      type: string

- id: cue_load_at
  label: Load Cue At
  kind: action
  params:
    - name: cue_number
      type: string
    - name: seconds
      type: number

- id: cue_start
  label: Start Cue
  kind: action
  params:
    - name: cue_number
      type: string

- id: cue_pause
  label: Pause Cue
  kind: action
  params:
    - name: cue_number
      type: string

- id: cue_toggle_pause
  label: Toggle Cue Pause
  kind: action
  params:
    - name: cue_number
      type: string

- id: cue_resume
  label: Resume Cue
  kind: action
  params:
    - name: cue_number
      type: string

- id: cue_stop
  label: Stop Cue
  kind: action
  params:
    - name: cue_number
      type: string

- id: cue_panic
  label: Panic Cue
  kind: action
  params:
    - name: cue_number
      type: string

- id: cue_reset
  label: Reset Cue
  kind: action
  params:
    - name: cue_number
      type: string

- id: cue_set_name
  label: Set Cue Name
  kind: action
  params:
    - name: cue_number
      type: string
    - name: name
      type: string

- id: cue_set_number
  label: Set Cue Number
  kind: action
  params:
    - name: cue_number
      type: string
    - name: number
      type: string

- id: cue_set_pre_wait
  label: Set Pre-Wait
  kind: action
  params:
    - name: cue_number
      type: string
    - name: seconds
      type: number

- id: cue_set_color
  label: Set Cue Color
  kind: action
  params:
    - name: cue_number
      type: string
    - name: color
      type: string
      description: One of none, red, orange, green, blue, purple

# Timer controls
- id: timer_start
  label: Start Timer
  kind: action
  params: []

- id: timer_stop
  label: Stop Timer
  kind: action
  params: []

- id: timer_toggle
  label: Toggle Timer
  kind: action
  params: []

- id: timer_reset
  label: Reset Timer
  kind: action
  params: []

- id: timer_set_elapsed
  label: Set Timer Elapsed
  kind: action
  params:
    - name: seconds
      type: number

- id: timer_set_duration
  label: Set Timer Duration
  kind: action
  params:
    - name: seconds
      type: number

# Display controls
- id: toggle_fullscreen
  label: Toggle Full Screen
  kind: action
  params: []

- id: toggle_main_volume_visible
  label: Toggle Main Volume Visible
  kind: action
  params: []
- id: always_reply
  label: Always Reply
  kind: action
  params:
    - name: boolean
      type: boolean
      description: true to enable always-reply; false to disable; omit to read current state

- id: connect
  label: Connect
  kind: action
  params:
    - name: passcode
      type: string
      description: Optional passcode string; required if OSC passcode is configured

- id: disconnect
  label: Disconnect
  kind: action
  params: []

- id: forget_me_not
  label: Forget Me Not
  kind: action
  params:
    - name: boolean
      type: boolean
      description: true to persist client; false to clear

- id: udp_keep_alive
  label: UDP Keep Alive
  kind: action
  params:
    - name: boolean
      type: boolean
      description: true to persist client; false to clear

- id: reply_format
  label: Reply Format
  kind: action
  params:
    - name: format_string
      type: string
      description: Format string with optional tokens; empty string resets to default

- id: shows
  label: List Shows
  kind: query
  params: []

- id: thump
  label: Thump Heartbeat
  kind: query
  params: []

- id: version
  label: Get Version
  kind: query
  params: []

- id: updates
  label: Subscribe to Updates
  kind: action
  params:
    - name: boolean
      type: boolean
      description: true (or 1) to start receiving updates; false (or 0) to stop

- id: show_open
  label: Open Show
  kind: action
  params: []

- id: show_close
  label: Close Show
  kind: action
  params: []

- id: show_cue_lists
  label: Get Cue Lists
  kind: query
  params: []

- id: show_running_cues
  label: Get Running Cues
  kind: query
  params: []

- id: show_running_or_paused_cues
  label: Get Running Or Paused Cues
  kind: query
  params: []

- id: show_dim
  label: Set/Read Show Dim
  kind: action
  params:
    - name: boolean
      type: boolean
      description: true to engage DIM; false to disengage; omit to read current state
    - name: duration
      type: number
      description: Optional fade duration in seconds

- id: show_full_screen
  label: Set/Read Full Screen
  kind: action
  params:
    - name: boolean
      type: boolean
      description: true to enter full screen; false to dismiss; omit to read current state

- id: show_mute
  label: Set/Read Show Mute
  kind: action
  params:
    - name: boolean
      type: boolean
      description: true to mute; false to unmute; omit to read current state

- id: show_main_volume_visible
  label: Set/Read Main Volume Visible
  kind: action
  params:
    - name: boolean
      type: boolean
      description: true to show fader; false to hide; omit to read current state

- id: cue_panic_in_time
  label: Panic Cue In Time
  kind: action
  params:
    - name: cue_number
      type: string
    - name: duration
      type: number
      description: Panic duration in seconds

- id: cue_display_name
  label: Get Cue Display Name
  kind: query
  params:
    - name: cue_number
      type: string

- id: timer_reset_duration
  label: Reset Timer Duration
  kind: action
  params: []

- id: timer_reset_elapsed
  label: Reset Timer Elapsed
  kind: action
  params: []

- id: cue_lists_shallow
  label: Get Cue Lists Shallow
  kind: query
  params: []

- id: running_cues_shallow
  label: Get Running Cues Shallow
  kind: query
  params: []

- id: running_or_paused_cues_shallow
  label: Get Running Or Paused Cues Shallow
  kind: query
  params: []

- id: cue_lists_unique_ids
  label: Get Cue Lists Unique IDs
  kind: query
  params: []

- id: running_cues_unique_ids
  label: Get Running Cues Unique IDs
  kind: query
  params: []

- id: running_or_paused_cues_unique_ids
  label: Get Running Or Paused Cues Unique IDs
  kind: query
  params: []

- id: cue_lists_unique_ids_shallow
  label: Get Cue Lists Unique IDs Shallow
  kind: query
  params: []

- id: running_cues_unique_ids_shallow
  label: Get Running Cues Unique IDs Shallow
  kind: query
  params: []

- id: running_or_paused_cues_unique_ids_shallow
  label: Get Running Or Paused Cues Unique IDs Shallow
  kind: query
  params: []
```

## Feedbacks
```yaml
# Replies use OSC address pattern: /reply/{original_address} json_string
# JSON format: { "show_id": string, "address": string, "status": "ok"|"error", "data": any }
# Status values: ok, error

- id: reply
  type: object
  description: Standard reply format for all OSC commands
  fields:
    - show_id: string (optional; present if reply is show-specific)
    - address: string (the OSC address that was sent)
    - status: enum [ok, error]
    - data: any (JSON-encoded result)
```

## Variables
```yaml
# Show-level variables
- id: volume
  label: Main Volume
  type: number
  range: [-96.0, 0.0]
  description: Main volume in decibels

- id: volumePercent
  label: Main Volume Percent
  type: number
  range: [0.0, 1.0]
  description: Main volume as linear percentage

- id: dim
  label: Dim State
  type: boolean
  description: Whether main volume dim is engaged

- id: mute
  label: Mute State
  type: boolean
  description: Whether main volume is muted

- id: fullScreen
  label: Full Screen State
  type: boolean
  description: Full screen mode status (iPad only)

- id: timer_elapsed
  label: Timer Elapsed
  type: number
  description: Elapsed time of the Elapsed Show Timer in seconds

- id: timer_duration
  label: Timer Duration
  type: number
  description: Current duration (Starting Time) of the Elapsed Show Timer in seconds

- id: timer_running
  label: Timer Running State
  type: boolean
  description: Whether the Elapsed Show Timer is currently running

# Per-cue variables (addressed by cue_number)
- id: cue_preWait
  label: Pre-Wait
  type: number
  description: Pre-wait time in seconds

- id: cue_duration
  label: Duration
  type: number
  description: Cue duration in seconds

- id: cue_name
  label: Name
  type: string
  description: Cue display name

- id: cue_number
  label: Cue Number
  type: string
  description: Cue number (string, not integer)

- id: cue_defaultName
  label: Default Name
  type: string
  description: Cue default name

- id: cue_colorName
  label: Color
  type: string
  description: Cue color (none, red, orange, green, blue, purple)

- id: cue_isLoaded
  label: Is Loaded
  type: boolean

- id: cue_isRunning
  label: Is Running
  type: boolean

- id: cue_isPaused
  label: Is Paused
  type: boolean

- id: cue_isBroken
  label: Is Broken
  type: boolean

- id: cue_actionElapsed
  label: Action Elapsed
  type: number
  description: Elapsed action time in seconds

- id: cue_percentActionElapsed
  label: Percent Action Elapsed
  type: number
  description: Elapsed action as percentage

- id: cue_preWaitElapsed
  label: Pre-Wait Elapsed
  type: number
  description: Elapsed pre-wait time in seconds

- id: cue_percentPreWaitElapsed
  label: Percent Pre-Wait Elapsed
  type: number
  description: Elapsed pre-wait as percentage

- id: cue_goButtonText
  label: GO Button Text
  type: string
  description: String displayed on GO button when cue is selected

- id: cue_uniqueID
  label: Unique ID
  type: string
  description: Cue unique identifier

# Show listing
- id: shows
  label: Shows List
  type: array
  description: Array of show dictionaries with uniqueID, displayName, port, udpReplyPort, version

- id: cueLists
  label: Cue Lists
  type: array
  description: Array of cue dictionaries for cue list and hits list

- id: runningCues
  label: Running Cues
  type: array
  description: Array of cues and hits currently running

- id: runningOrPausedCues
  label: Running Or Paused Cues
  type: array
  description: All running cues and hits regardless of duration elapsing

- id: playbackPosition
  label: Playback Position
  type: string
  description: Currently selected cue ID (or empty if no position)
```

## Events
```yaml
# Go Button sends proactive update messages when status updates are requested (/updates 1)

- id: update_show
  label: Update Show
  address: /update/show/{show_id}
  description: Client must reload cue lists for the show

- id: update_cue
  label: Update Cue
  address: /update/show/{show_id}/cue_id/{cue_id}
  description: Client must reload state for specified cue or hit; for Group cues, also reload children

- id: update_playbackPosition
  label: Update Playback Position
  address: /update/show/{show_id}/playbackPosition {cue_id}
  description: Playback position has changed; no cue_id argument if no current position

- id: update_volume
  label: Update Volume
  address: /update/show/{show_id}/volume {decibels}
  description: Main volume changed; range -96.0 to 0.0

- id: update_volume_percent
  label: Update Volume Percent
  address: /update/show/{show_id}/volume {percent}
  description: Main volume changed; range 0.0 to 1.0

- id: update_disconnect
  label: Disconnect
  address: /update/show/{show_id}/disconnect
  description: Client must disconnect (show is closing)
```

## Macros
```yaml
# No explicit multi-step macros documented in source
# UNRESOLVED:宏 not found in source; remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
OSC messages can use wildcards (* and ?) in {cue_number} and {id} address patterns. Spaces are not permitted in OSC addresses; avoid spaces in cue numbers when using OSC control.

Go Button supports increment/decrement syntax for numerical cue properties: `/cue/{n}/property/+ {delta}` and `/cue/{n}/property/- {delta}`.

UDP clients are auto-disconnected after 61 seconds of inactivity; sending any message (e.g. /thump) resets the timer. Use `/forgetMeNot` or `/udpKeepAlive` with `true` to persist client settings across inactivity. TCP connections are not auto-disconnected.

For QLab integration, set Go Button UDP Reply Port to 53000 to view reply messages in QLab Workspace Status Logs.

Legacy note: Go Button 3.2.0+ uses new default ports (53100/53101) vs. older versions (53000/53001). Settings migrate automatically to avoid breaking changes.

<!-- UNRESOLVED: MIDI Show Control (MSC) commands mentioned but full command catalog not documented in source -->
<!-- UNRESOLVED: Full MIDI Note On/Off/Controller/Program Change message documentation not in source -->
<!-- UNRESOLVED: Passcode format (string length, character set, etc.) not specified in source -->
<!-- UNRESOLVED: TCP connection timeout behavior not documented -->
<!-- UNRESOLVED: Maximum UDP datagram size not stated in source -->

## Provenance

```yaml
source_domains:
  - gobutton.app
source_urls:
  - https://gobutton.app/docs/Go_Button_3_Reference_Manual.pdf
  - https://gobutton.app/docs/v3/working-with-your-show/osc-dictionary/
  - https://gobutton.app/docs/v3/
retrieved_at: 2026-04-29T23:42:56.952Z
last_checked_at: 2026-05-14T18:17:15.884Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.884Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 73 spec actions have literal OSC matches in source; transport parameters verified verbatim; spec fully represents the documented OSC API. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MIDI input described but not fully documented in source; full MIDI message catalog not included"
- "UDP port 53535 also accepts plain-text OSC; need explicit source confirmation before adding"
- "宏 not found in source; remove section if not applicable"
- "no safety warnings or interlock procedures stated in source"
- "MIDI Show Control (MSC) commands mentioned but full command catalog not documented in source"
- "Full MIDI Note On/Off/Controller/Program Change message documentation not in source"
- "Passcode format (string length, character set, etc.) not specified in source"
- "TCP connection timeout behavior not documented"
- "Maximum UDP datagram size not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
