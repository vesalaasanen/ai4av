---
spec_id: admin/figure_53-qlab
schema_version: ai4av-public-spec-v1
revision: 1
title: "Figure 53 QLab Control Spec"
manufacturer: "Figure 53"
model_family: QLab
aliases: []
compatible_with:
  manufacturers:
    - "Figure 53"
  models:
    - QLab
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - qlab.app
source_urls:
  - https://qlab.app/docs/QLab_5_Reference_Manual.pdf
retrieved_at: 2026-07-13T21:15:25.250Z
last_checked_at: 2026-07-21T22:44:11.219Z
generated_at: 2026-07-21T22:44:11.219Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model version (e.g., QLab 5, QLab 4) not stated in source"
  - "no explicit multi-step macros described in source"
  - "no safety warnings or interlock procedures stated in source"
  - "device model version not stated in source"
  - "baud rate / serial config not applicable (software-only, no RS-232)"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:44:11.219Z
  matched_actions: 164
  action_count: 164
  confidence: medium
  summary: "All 164 spec actions match literal OSC addresses in the source verbatim with correct param shapes; transport ports confirmed; the source OSC command catalogue is fully represented with no missing or drifted commands. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Figure 53 QLab Control Spec

## Summary
QLab is a show control platform for audio, video, lighting, and media cue management. Control is via OSC (Open Sound Control) over UDP and TCP. The main OSC listen port is 53000/UDP; UDP replies are sent to port 53001 by default, configurable via `/udpReplyPort`. QLab also accepts plain text as OSC on UDP port 53535. TCP connections use double-end SLIP framing (RFC 1055) per OSC 1.1 specification. No authentication required.

<!-- UNRESOLVED: device model version (e.g., QLab 5, QLab 4) not stated in source -->

## Transport
```yaml
protocols:
  - udp
  - tcp
addressing:
  port: 53000  # OSC listen port (UDP)
  reply_port: 53001  # UDP reply port (default, customizable via /udpReplyPort)
  plaintext_port: 53535  # plain text UDP interpreted as OSC
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from extensive query commands (isRunning, isPaused, etc.)
- levelable  # inferred from duckLevel (-120 to +12 dB) and audio level controls
- routable  # inferred from audio patch and video routing commands
```

## Actions
```yaml
# === Workspace core commands ===
- id: workspace_go
  label: Go
  kind: action
  command: "/workspace/{id}/go {cue_number}"
  params:
    - name: cue_number
      type: string
      description: Cue number to GO (optional if playhead already positioned)
- id: workspace_go_address
  label: Go (cue number in address)
  kind: action
  command: "/workspace/{id}/go/{cue_number}"
  params:
    - name: cue_number
      type: string
      description: Cue number encoded in OSC address path
- id: audition_go
  label: Audition Go
  kind: action
  command: "/workspace/{id}/auditionGo {cue_number}"
  params:
    - name: cue_number
      type: string
      description: Cue number to audition
- id: panic
  label: Panic Workspace
  kind: action
  command: "/workspace/{id}/panic"
  params:
    - name: workspace_id
      type: string
      description: Workspace display name or unique ID
- id: panic_in_time
  label: Panic Over Time
  kind: action
  command: "/workspace/{id}/panicInTime {number}"
  params:
    - name: workspace_id
      type: string
    - name: duration
      type: number
      description: Duration in seconds
- id: pause
  label: Pause All
  kind: action
  command: "/workspace/{id}/pause"
  params: []
- id: resume
  label: Resume All
  kind: action
  command: "/workspace/{id}/resume"
  params: []
- id: stop
  label: Stop Playback
  kind: action
  command: "/workspace/{id}/stop"
  params: []
- id: hard_stop
  label: Hard Stop
  kind: action
  command: "/workspace/{id}/hardStop"
  params: []
- id: reset
  label: Reset Workspace
  kind: action
  command: "/workspace/{id}/reset"
  params: []
- id: save
  label: Save Workspace
  kind: action
  command: "/workspace/{id}/save"
  params: []
- id: workspace_select
  label: Select Cue
  kind: action
  command: "/workspace/{id}/select/{cue_number}"
  params:
    - name: cue_number
      type: string
- id: workspace_select_next
  label: Select Next
  kind: action
  command: "/workspace/{id}/select/next"
  params: []
- id: workspace_select_previous
  label: Select Previous
  kind: action
  command: "/workspace/{id}/select/previous"
  params: []
- id: workspace_playhead_set
  label: Set Playhead
  kind: action
  command: "/workspace/{id}/playhead/{cue_number}"
  params:
    - name: cue_number
      type: string
- id: workspace_playhead_next
  label: Playhead Next
  kind: action
  command: "/workspace/{id}/playhead/next"
  params: []
- id: workspace_playhead_previous
  label: Playhead Previous
  kind: action
  command: "/workspace/{id}/playhead/previous"
  params: []
- id: workspace_playhead_none
  label: Unset Playhead
  kind: action
  command: "/workspace/{id}/playhead/none"
  params: []
- id: workspace_connect
  label: Connect to Workspace
  kind: action
  command: "/workspace/{id}/connect {passcode_string}"
  params:
    - name: workspace_id
      type: string
    - name: passcode_string
      type: string
      description: Passcode; returns ok, badpass, or error
- id: workspace_cue_lists
  label: Get Cue Lists
  kind: query
  command: "/workspace/{id}/cueLists"
  params:
    - name: workspace_id
      type: string
- id: workspace_selected_cues
  label: Get Selected Cues
  kind: query
  command: "/workspace/{id}/selectedCues"
  params:
    - name: workspace_id
      type: string
- id: workspace_running_cues
  label: Get Running Cues
  kind: query
  command: "/workspace/{id}/runningCues"
  params:
    - name: workspace_id
      type: string
- id: workspace_running_or_paused_cues
  label: Get Running or Paused Cues
  kind: query
  command: "/workspace/{id}/runningOrPausedCues"
  params:
    - name: workspace_id
      type: string
- id: workspace_thump
  label: Heartbeat Thump
  kind: query
  command: "/workspace/{id}/thump"
  params:
    - name: workspace_id
      type: string
      description: Returns string "thump"
- id: workspace_double_go_window_remaining
  label: Double GO Window Remaining
  kind: query
  command: "/workspace/{id}/doubleGoWindowRemaining"
  params:
    - name: workspace_id
      type: string
      description: Seconds until next GO permitted (0 when allowed)
- id: workspace_new_cue
  label: New Cue
  kind: action
  command: "/workspace/{id}/new {cue_type} {cue_ID} {cart_row} {cart_column}"
  params:
    - name: workspace_id
      type: string
    - name: cue_type
      type: string
      description: "audio, mic, video, camera, text, light, fade, network, midi, midi file, timecode, group, start, stop, pause, load, reset, devamp, goto, target, arm, disarm, wait, memo, script, list, cuelist, cue list, cart, cuecart, cue cart"
    - name: cue_ID
      type: string
      description: Optional unique ID for new cue
    - name: cart_row
      type: integer
      description: Optional cart row
    - name: cart_column
      type: integer
      description: Optional cart column
- id: workspace_move_cue
  label: Move Cue
  kind: action
  command: "/workspace/{id}/move/{cue_id} {new_index} {new_parent_cue_id}"
  params:
    - name: workspace_id
      type: string
    - name: cue_id
      type: string
    - name: new_index
      type: integer
    - name: new_parent_cue_id
      type: string
      description: Optional new parent
- id: workspace_delete_cue
  label: Delete Cue
  kind: action
  command: "/workspace/{id}/delete/{cue_number}"
  params:
    - name: workspace_id
      type: string
    - name: cue_number
      type: string
- id: workspace_delete_cue_id
  label: Delete Cue by ID
  kind: action
  command: "/workspace/{id}/delete_id/{cue_id}"
  params:
    - name: workspace_id
      type: string
    - name: cue_id
      type: string
- id: workspace_delete_selected
  label: Delete Selected Cues
  kind: action
  command: "/workspace/{id}/delete/selected"
  params:
    - name: workspace_id
      type: string
- id: workspace_delete_active
  label: Delete Active Cues
  kind: action
  command: "/workspace/{id}/delete/active"
  params:
    - name: workspace_id
      type: string
- id: workspace_renumber
  label: Renumber Selected Cues
  kind: action
  command: "/workspace/{id}/renumber {startNumber} {incrementNumber} {prefix} {suffix}"
  params:
    - name: workspace_id
      type: string
    - name: startNumber
      type: number
    - name: incrementNumber
      type: number
    - name: prefix
      type: string
    - name: suffix
      type: string

# === Cue-level commands ===
- id: cue_go
  label: Go Cue
  kind: action
  command: "/cue/{cue_number}/go"
  params:
    - name: cue_number
      type: string
- id: cue_start
  label: Start Cue
  kind: action
  command: "/cue/{cue_number}/start"
  params:
    - name: cue_number
      type: string
- id: cue_start_and_autoload_next
  label: Start and Autoload Next
  kind: action
  command: "/cue/{cue_number}/startAndAutoloadNext"
  params:
    - name: cue_number
      type: string
- id: cue_stop
  label: Stop Cue
  kind: action
  command: "/cue/{cue_number}/stop"
  params:
    - name: cue_number
      type: string
- id: cue_panic
  label: Panic Cue
  kind: action
  command: "/cue/{cue_number}/panic"
  params:
    - name: cue_number
      type: string
- id: cue_panic_in_time
  label: Panic Cue Over Time
  kind: action
  command: "/cue/{cue_number}/panicInTime {number}"
  params:
    - name: cue_number
      type: string
    - name: duration
      type: number
- id: cue_pause
  label: Pause Cue
  kind: action
  command: "/cue/{cue_number}/pause"
  params:
    - name: cue_number
      type: string
- id: cue_hard_pause
  label: Hard Pause Cue
  kind: action
  command: "/cue/{cue_number}/hardPause"
  params:
    - name: cue_number
      type: string
- id: cue_hard_stop
  label: Hard Stop Cue
  kind: action
  command: "/cue/{cue_number}/hardStop"
  params:
    - name: cue_number
      type: string
- id: cue_toggle_pause
  label: Toggle Pause/Resume
  kind: action
  command: "/cue/{cue_number}/togglePause"
  params:
    - name: cue_number
      type: string
- id: cue_resume
  label: Resume Cue
  kind: action
  command: "/cue/{cue_number}/resume"
  params:
    - name: cue_number
      type: string
- id: cue_preview
  label: Preview Cue
  kind: action
  command: "/cue/{cue_number}/preview"
  params:
    - name: cue_number
      type: string
- id: cue_audition_go
  label: Audition Go Cue
  kind: action
  command: "/cue/{cue_number}/auditionGo"
  params:
    - name: cue_number
      type: string
- id: cue_audition_preview
  label: Audition Preview Cue
  kind: action
  command: "/cue/{cue_number}/auditionPreview"
  params:
    - name: cue_number
      type: string
- id: cue_reset
  label: Reset Cue
  kind: action
  command: "/cue/{cue_number}/reset"
  params:
    - name: cue_number
      type: string
- id: cue_load
  label: Load Cue
  kind: action
  command: "/cue/{cue_number}/load"
  params:
    - name: cue_number
      type: string
- id: cue_load_at_seconds
  label: Load Cue At Seconds
  kind: action
  command: "/cue/{cue_number}/loadAt {number}"
  params:
    - name: cue_number
      type: string
    - name: seconds
      type: number
      description: Negative = from end
- id: cue_load_at_hms
  label: Load Cue At HMS
  kind: action
  command: "/cue/{cue_number}/loadAt {hours} {minutes} {seconds}"
  params:
    - name: cue_number
      type: string
    - name: hours
      type: number
    - name: minutes
      type: number
    - name: seconds
      type: number
- id: cue_load_and_set_playhead
  label: Load Cue And Set Playhead
  kind: action
  command: "/cue/{cue_number}/loadAndSetPlayhead"
  params:
    - name: cue_number
      type: string
- id: cue_load_action_at_seconds
  label: Load Action At Seconds
  kind: action
  command: "/cue/{cue_number}/loadActionAt {number}"
  params:
    - name: cue_number
      type: string
    - name: seconds
      type: number
      description: Negative = from end; auto-adds pre-wait
- id: cue_load_action_at_hms
  label: Load Action At HMS
  kind: action
  command: "/cue/{cue_number}/loadActionAt {hours} {minutes} {seconds}"
  params:
    - name: cue_number
      type: string
    - name: hours
      type: number
    - name: minutes
      type: number
    - name: seconds
      type: number
- id: cue_load_file_at_seconds
  label: Load File At Seconds
  kind: action
  command: "/cue/{cue_number}/loadFileAt {number}"
  params:
    - name: cue_number
      type: string
    - name: seconds
      type: number
      description: Ignores slice loop counts
- id: cue_load_file_at_hms
  label: Load File At HMS
  kind: action
  command: "/cue/{cue_number}/loadFileAt {hours} {minutes} {seconds}"
  params:
    - name: cue_number
      type: string
    - name: hours
      type: number
    - name: minutes
      type: number
    - name: seconds
      type: number
- id: cue_capture_timecode
  label: Capture Timecode Trigger
  kind: action
  command: "/cue/{cue_number}/captureTimecode"
  params:
    - name: cue_number
      type: string
      description: Set timecode trigger to incoming timecode
- id: cue_collapse
  label: Collapse Group Cue
  kind: action
  command: "/cue/{cue_number}/collapse"
  params:
    - name: cue_number
      type: string
- id: cue_expand
  label: Expand Group Cue
  kind: action
  command: "/cue/{cue_number}/expand"
  params:
    - name: cue_number
      type: string
- id: cue_move_cart_cue
  label: Move Cart Cue
  kind: action
  command: "/cue/{cue_number}/moveCartCue/{child} {row} {column}"
  params:
    - name: cue_number
      type: string
      description: Cart cue number
    - name: child
      type: string
      description: Child cue ID
    - name: row
      type: integer
    - name: column
      type: integer
- id: cue_playhead_next
  label: Cue Playhead Next
  kind: action
  command: "/cue/{cue_number}/playhead/next"
  params:
    - name: cue_number
      type: string
- id: cue_playhead_previous
  label: Cue Playhead Previous
  kind: action
  command: "/cue/{cue_number}/playhead/previous"
  params:
    - name: cue_number
      type: string
- id: cue_playhead_none
  label: Cue Playhead None
  kind: action
  command: "/cue/{cue_number}/playhead/none"
  params:
    - name: cue_number
      type: string
- id: cue_playhead_next_sequence
  label: Cue Playhead Next Sequence
  kind: action
  command: "/cue/{cue_number}/playhead/nextSequence"
  params:
    - name: cue_number
      type: string
- id: cue_playhead_previous_sequence
  label: Cue Playhead Previous Sequence
  kind: action
  command: "/cue/{cue_number}/playhead/previousSequence"
  params:
    - name: cue_number
      type: string
- id: cue_playlist_next
  label: Playlist Next
  kind: action
  command: "/cue/{cue_number}/playlist/next"
  params:
    - name: cue_number
      type: string
      description: Playlist Group cue number
- id: cue_playlist_previous
  label: Playlist Previous
  kind: action
  command: "/cue/{cue_number}/playlist/previous"
  params:
    - name: cue_number
      type: string
      description: Playlist Group cue number

# === Show control listen/ignore ===
- id: subscribe_updates
  label: Subscribe to Updates
  kind: action
  command: "/updates {enable}"
  params:
    - name: enable
      type: boolean
      description: "1 to subscribe, 0 to unsubscribe"
- id: listen_all
  label: Listen to All Show Control
  kind: action
  command: "/listen"
  params: []
- id: ignore_all
  label: Stop Receiving Show Control
  kind: action
  command: "/ignore"
  params: []
- id: listen_audition_go
  label: Listen Audition Go
  kind: action
  command: "/listen/auditionGo"
  params: []
- id: listen_audition_go_number
  label: Listen Audition Go Number
  kind: action
  command: "/listen/auditionGo/number"
  params: []
- id: listen_audition_go_name
  label: Listen Audition Go Name
  kind: action
  command: "/listen/auditionGo/name"
  params: []
- id: listen_audition_go_unique_id
  label: Listen Audition Go UniqueID
  kind: action
  command: "/listen/auditionGo/uniqueID"
  params: []
- id: listen_cue_start
  label: Listen Cue Start
  kind: action
  command: "/listen/cue/start"
  params: []
- id: listen_cue_start_number
  label: Listen Cue Start Number
  kind: action
  command: "/listen/cue/start/number"
  params: []
- id: listen_cue_start_name
  label: Listen Cue Start Name
  kind: action
  command: "/listen/cue/start/name"
  params: []
- id: listen_cue_start_unique_id
  label: Listen Cue Start UniqueID
  kind: action
  command: "/listen/cue/start/uniqueID"
  params: []
- id: listen_cue_stop
  label: Listen Cue Stop
  kind: action
  command: "/listen/cue/stop"
  params: []
- id: listen_cue_stop_number
  label: Listen Cue Stop Number
  kind: action
  command: "/listen/cue/stop/number"
  params: []
- id: listen_cue_stop_name
  label: Listen Cue Stop Name
  kind: action
  command: "/listen/cue/stop/name"
  params: []
- id: listen_cue_stop_unique_id
  label: Listen Cue Stop UniqueID
  kind: action
  command: "/listen/cue/stop/uniqueID"
  params: []
- id: listen_go
  label: Listen Go
  kind: action
  command: "/listen/go"
  params: []
- id: listen_go_number
  label: Listen Go Number
  kind: action
  command: "/listen/go/number"
  params: []
- id: listen_go_name
  label: Listen Go Name
  kind: action
  command: "/listen/go/name"
  params: []
- id: listen_go_unique_id
  label: Listen Go UniqueID
  kind: action
  command: "/listen/go/uniqueID"
  params: []
- id: listen_hard_stop_all
  label: Listen HardStop All
  kind: action
  command: "/listen/hardStopAll"
  params: []
- id: listen_panic_all
  label: Listen Panic All
  kind: action
  command: "/listen/panicAll"
  params: []
- id: listen_pause_all
  label: Listen Pause All
  kind: action
  command: "/listen/pauseAll"
  params: []
- id: listen_playhead
  label: Listen Playhead
  kind: action
  command: "/listen/playhead"
  params: []
- id: listen_playhead_number
  label: Listen Playhead Number
  kind: action
  command: "/listen/playhead/number"
  params: []
- id: listen_playhead_name
  label: Listen Playhead Name
  kind: action
  command: "/listen/playhead/name"
  params: []
- id: listen_playhead_unique_id
  label: Listen Playhead UniqueID
  kind: action
  command: "/listen/playhead/uniqueID"
  params: []
- id: listen_reset_all
  label: Listen Reset All
  kind: action
  command: "/listen/resetAll"
  params: []
- id: listen_resume_all
  label: Listen Resume All
  kind: action
  command: "/listen/resumeAll"
  params: []
- id: listen_stop_all
  label: Listen Stop All
  kind: action
  command: "/listen/stopAll"
  params: []
# Note: corresponding /ignore/{event}[/detail] variants exist for each /listen
# variant above (e.g. /ignore/go, /ignore/go/number, /ignore/playhead, etc.) and
# stop those specific messages.

# === Application OSC messages ===
- id: app_always_reply
  label: Always Reply
  kind: action
  command: "/alwaysReply {number}"
  params:
    - name: number
      type: number
      description: Non-zero = send reply for every OSC message
- id: app_disconnect
  label: Disconnect
  kind: action
  command: "/disconnect"
  params: []
- id: app_forget_me_not
  label: Forget Me Not
  kind: action
  command: "/forgetMeNot {boolean}"
  params:
    - name: enable
      type: boolean
      description: Keep client settings until QLab quits
- id: app_udp_keep_alive
  label: UDP Keep Alive
  kind: action
  command: "/udpKeepAlive {boolean}"
  params:
    - name: enable
      type: boolean
      description: Same as forgetMeNot
- id: app_reply_format
  label: Set Reply Format
  kind: action
  command: "/replyFormat {format_string}"
  params:
    - name: format_string
      type: string
      description: "Tokens: #workspace_id#, #address#, #status#, #data#. Empty string resets."
- id: app_event_format
  label: Set Event Format
  kind: action
  command: "/eventFormat {format_string}"
  params:
    - name: format_string
      type: string
      description: "Tokens: #workspace_id#, #address#, #status#, #data#. Empty string resets."
- id: app_toggle_timecode_window
  label: Toggle Timecode Window
  kind: action
  command: "/toggleTimecodeWindow"
  params: []
- id: app_toggle_override_window
  label: Toggle Override Window
  kind: action
  command: "/toggleOverrideWindow"
  params: []
- id: app_version
  label: Get Version
  kind: query
  command: "/version"
  params: []
- id: app_workspaces
  label: Get Open Workspaces
  kind: query
  command: "/workspaces"
  params: []
  description: Returns array of workspaces with ID, display name, port, UDP reply port, version
- id: app_font_names
  label: Get Font Names
  kind: query
  command: "/fontNames"
  params: []
- id: app_font_families_and_styles
  label: Get Font Families and Styles
  kind: query
  command: "/fontFamiliesAndStyles"
  params: []

# === Override controls ===
- id: override_toggle_dmx_output
  label: Toggle DMX Output Override
  kind: action
  command: "/overrides/toggleDmxOutput"
  params: []
- id: override_toggle_midi_input
  label: Toggle MIDI Input Override
  kind: action
  command: "/overrides/toggleMidiInput"
  params: []
- id: override_toggle_midi_output
  label: Toggle MIDI Output Override
  kind: action
  command: "/overrides/toggleMidiOutput"
  params: []
- id: override_toggle_msc_input
  label: Toggle MSC Input Override
  kind: action
  command: "/overrides/toggleMscInput"
  params: []
- id: override_toggle_msc_output
  label: Toggle MSC Output Override
  kind: action
  command: "/overrides/toggleMscOutput"
  params: []
- id: override_toggle_sysex_input
  label: Toggle SysEx Input Override
  kind: action
  command: "/overrides/toggleSysexInput"
  params: []
- id: override_toggle_sysex_output
  label: Toggle SysEx Output Override
  kind: action
  command: "/overrides/toggleSysexOutput"
  params: []
- id: override_toggle_network_external_input
  label: Toggle External Network Input Override
  kind: action
  command: "/overrides/toggleNetworkExternalInput"
  params: []
- id: override_toggle_network_external_output
  label: Toggle External Network Output Override
  kind: action
  command: "/overrides/toggleNetworkExternalOutput"
  params: []
- id: override_toggle_network_local_input
  label: Toggle Local Network Input Override
  kind: action
  command: "/overrides/toggleNetworkLocalInput"
  params: []
- id: override_toggle_network_local_output
  label: Toggle Local Network Output Override
  kind: action
  command: "/overrides/toggleNetworkLocalOutput"
  params: []
- id: override_toggle_timecode_input
  label: Toggle Timecode Input Override
  kind: action
  command: "/overrides/toggleTimecodeInput"
  params: []
- id: override_toggle_timecode_output
  label: Toggle Timecode Output Override
  kind: action
  command: "/overrides/toggleTimecodeOutput"
  params: []

# === Settings: audio map ===
- id: settings_audio_map
  label: Get Audio Map
  kind: query
  command: "/settings/audio/map/{map_name}"
  params:
    - name: map_name
      type: string
- id: settings_audio_map_by_id
  label: Get Audio Map By ID
  kind: query
  command: "/settings/audio/mapID/{map_ID}"
  params:
    - name: map_ID
      type: string
- id: settings_audio_maps
  label: Get All Audio Maps
  kind: query
  command: "/settings/audio/maps"
  params: []
- id: settings_audio_map_marks
  label: Get Audio Map Marks
  kind: query
  command: "/settings/audio/map/{map_name}/marks"
  params:
    - name: map_name
      type: string
- id: settings_audio_map_filters
  label: Get Audio Map Filters
  kind: query
  command: "/settings/audio/map/{map_name}/filters"
  params:
    - name: map_name
      type: string
- id: settings_audio_map_objects
  label: Get Audio Map Objects
  kind: query
  command: "/settings/audio/map/{map_name}/objects"
  params:
    - name: map_name
      type: string
- id: settings_audio_map_size
  label: Get Audio Map Size
  kind: query
  command: "/settings/audio/map/{map_name}/size"
  params:
    - name: map_name
      type: string
- id: settings_audio_map_size_width
  label: Get Audio Map Width
  kind: query
  command: "/settings/audio/map/{map_name}/size/width"
  params:
    - name: map_name
      type: string
- id: settings_audio_map_size_height
  label: Get Audio Map Height
  kind: query
  command: "/settings/audio/map/{map_name}/size/height"
  params:
    - name: map_name
      type: string

# === Settings: audio patch ===
- id: settings_audio_patch
  label: Get Audio Patch
  kind: query
  command: "/settings/audio/patch/{name}"
  params:
    - name: name
      type: string
- id: settings_audio_patch_by_id
  label: Get Audio Patch By ID
  kind: query
  command: "/settings/audio/patchID/{id}"
  params:
    - name: id
      type: string
- id: settings_audio_patch_reset
  label: Reset Audio Patch
  kind: action
  command: "/settings/audio/patch/{name}/reset"
  params:
    - name: name
      type: string
- id: settings_audio_patch_mute_clear
  label: Clear Patch Mutes
  kind: action
  command: "/settings/audio/patch/{name}/mute/clear"
  params:
    - name: name
      type: string
- id: settings_audio_patch_solo_clear
  label: Clear Patch Solos
  kind: action
  command: "/settings/audio/patch/{name}/solo/clear"
  params:
    - name: name
      type: string
- id: settings_audio_patch_routing_reset
  label: Reset Patch Routing
  kind: action
  command: "/settings/audio/patch/{name}/routing/reset"
  params:
    - name: name
      type: string
- id: settings_audio_patch_mute_channels
  label: Get Patch Muted Channels
  kind: query
  command: "/settings/audio/patch/{name}/muteChannels"
  params:
    - name: name
      type: string
- id: settings_audio_patch_solo_channels
  label: Get Patch Soloed Channels
  kind: query
  command: "/settings/audio/patch/{name}/soloChannels"
  params:
    - name: name
      type: string
- id: settings_audio_patch_routing
  label: Get Patch Routing
  kind: query
  command: "/settings/audio/patch/{name}/routing"
  params:
    - name: name
      type: string
- id: settings_audio_patch_list
  label: Get Audio Patch List
  kind: query
  command: "/settings/audio/patchList"
  params: []
- id: settings_audio_cue_output_channel_counts
  label: Get Cue Output Channel Counts
  kind: query
  command: "/settings/audio/cueOutputChannelCounts"
  params: []
- id: settings_audio_output_channel_names
  label: Get Output Channel Names
  kind: query
  command: "/settings/audio/outputChannelNames"
  params: []

# === Settings: light ===
- id: settings_light_patch
  label: Get Light Patch
  kind: query
  command: "/settings/light/patch"
  params: []
  description: Returns verbose JSON of light patch (groups, instruments, parameters)
- id: settings_light_undo
  label: Light Undo
  kind: action
  command: "/settings/light/undo"
  params: []
- id: settings_light_redo
  label: Light Redo
  kind: action
  command: "/settings/light/redo"
  params: []

# === Settings: general ===
- id: settings_general_toggle_selection_is_playhead
  label: Toggle Selection/Playhead Lock
  kind: action
  command: "/settings/general/toggleSelectionIsPlayhead"
  params: []
- id: settings_general_undo
  label: General Undo
  kind: action
  command: "/settings/general/undo"
  params: []
- id: settings_general_redo
  label: General Redo
  kind: action
  command: "/settings/general/redo"
  params: []

# === Settings: MIDI / network / mic ===
- id: settings_midi_patch_list
  label: Get MIDI Patch List
  kind: query
  command: "/settings/midi/patchList"
  params: []
- id: settings_network_patch_list
  label: Get Network Patch List
  kind: query
  command: "/settings/network/patchList"
  params: []
- id: settings_mic_patch_list
  label: Get Mic Input Patch List
  kind: query
  command: "/settings/mic/patchList"
  params: []

# === Settings: video ===
- id: settings_video_input_patch_list
  label: Get Video Input Patch List
  kind: query
  command: "/settings/video/inputPatchList"
  params: []
- id: settings_video_routes
  label: Get Video Routes
  kind: query
  command: "/settings/video/routes"
  params: []
- id: settings_video_stages
  label: Get All Stages
  kind: query
  command: "/settings/video/stages"
  params: []
- id: settings_video_stage
  label: Get Stage
  kind: query
  command: "/settings/video/stage/{name}"
  params:
    - name: name
      type: string
- id: settings_video_stage_size
  label: Get Stage Size
  kind: query
  command: "/settings/video/stage/{name}/size"
  params:
    - name: name
      type: string
- id: settings_video_stage_size_width
  label: Get Stage Width
  kind: query
  command: "/settings/video/stage/{name}/size/width"
  params:
    - name: name
      type: string
- id: settings_video_stage_size_height
  label: Get Stage Height
  kind: query
  command: "/settings/video/stage/{name}/size/height"
  params:
    - name: name
      type: string
- id: settings_video_stage_unique_id
  label: Get Stage Unique ID
  kind: query
  command: "/settings/video/stage/{name}/uniqueID"
  params:
    - name: name
      type: string
- id: settings_video_stage_regions
  label: Get Stage Regions
  kind: query
  command: "/settings/video/stage/{name}/regions"
  params:
    - name: name
      type: string
- id: settings_video_stage_region_reset_control_points
  label: Reset Region Control Points
  kind: action
  command: "/settings/video/stage/{name}/region/{name}/resetControlPoints"
  params:
    - name: stage_name
      type: string
    - name: region_name
      type: string
- id: settings_video_undo
  label: Video Undo
  kind: action
  command: "/settings/video/undo"
  params: []
- id: settings_video_redo
  label: Video Redo
  kind: action
  command: "/settings/video/redo"
  params: []

# === Cue custom state queries ===
- id: cue_values_for_keys
  label: Values For Keys
  kind: query
  command: "/cue/{cue_number}/valuesForKeys \"[\\\"key1\\\",\\\"key2\\\"]\""
  params:
    - name: cue_number
      type: string
    - name: keys
      type: string
      description: JSON array of key names
- id: cue_values_for_keys_with_arguments
  label: Values For Keys With Arguments
  kind: query
  command: "/cue/{cue_number}/valuesForKeysWithArguments \"{\\\"key\\\":[arg1,arg2]}\""
  params:
    - name: cue_number
      type: string
    - name: key_args
      type: string
      description: JSON dictionary of key to arguments
```

## Feedbacks
```yaml
- id: reply
  type: object
  description: Reply to every OSC message in JSON format
  fields:
    workspace_id: string
    address: string
    status: enum [ok, error, denied]
    data: value
- id: workspace_event
  type: object
  description: Show control broadcast message from QLab
  fields:
    event: string
    cue_number: string
    cue_name: string
    cue_unique_id: string
    cue_type: string
- id: update_workspace
  type: object
  description: Client needs to reload cue lists
  fields:
    workspace_id: string
- id: update_cue
  type: object
  description: Client needs to reload cue state
  fields:
    workspace_id: string
    cue_id: string
- id: update_playback_position
  type: object
  description: Playback position changed
  fields:
    workspace_id: string
    cue_list_id: string
    cue_id: string
- id: disconnect
  type: string
  description: Client must disconnect event
- id: cue_is_running
  type: boolean
- id: cue_is-paused
  type: boolean
- id: cue_is-auditioning
  type: boolean
- id: cue_is-loaded
  type: boolean
- id: cue_is-broken
  type: boolean
- id: cue_is-warning
  type: boolean
- id: cue_is-panicking
  type: boolean
- id: cue_is-tailing-out
  type: boolean
- id: cue_is-crossfading-out
  type: boolean
- id: cue_is-overridden
  type: boolean
- id: cue_is-action-running
  type: boolean
- id: cue_is-next-in-playlist
  type: boolean
- id: cue_has-cue-targets
  type: boolean
- id: cue_has-file-targets
  type: boolean
- id: cue_list-name
  type: string
- id: cue_display-name
  type: string
- id: cue_default-name
  type: string
- id: cue_type
  type: string
- id: cue_unique-id
  type: string
- id: cue_number
  type: string
- id: cue_parent
  type: string
- id: cue_pre-wait-elapsed
  type: number
- id: cue_percent-pre-wait-elapsed
  type: number
- id: cue_post-wait-elapsed
  type: number
- id: cue_percent-post-wait-elapsed
  type: number
- id: cue_action-elapsed
  type: number
- id: cue_percent-action-elapsed
  type: number
- id: cue_max-time-in-cue-sequence
  type: number
- id: cue_current-duration
  type: number
- id: cue_allows-editing-duration
  type: boolean
- id: cue_can-have-audio-map-targets
  type: boolean
- id: cue_can-have-patch-targets
  type: boolean
- id: cue_cart-columns
  type: integer
- id: cue_cart-rows
  type: integer
- id: cue_cart-position-row
  type: integer
- id: cue_cart-position-column
  type: integer
- id: cue_children
  type: array
- id: cue_children-shallow
  type: array
- id: cue_children-unique-ids
  type: array
- id: cue_children-unique-ids-shallow
  type: array
- id: cue_is-child-flagged
  type: boolean
- id: cue_is-child-auditioning
  type: boolean
- id: cue_current-timecode
  type: number
- id: cue_current-timecode-hours
  type: number
- id: cue_current-timecode-minutes
  type: number
- id: cue_current-timecode-seconds
  type: number
- id: cue_current-timecode-frames
  type: number
- id: cue_current-timecode-bits
  type: number
- id: cue_current-timecode-text
  type: string
- id: cue_timecode-trigger
  type: number
- id: workspace_thump
  type: string
- id: workspace_double-go-window-remaining
  type: number
- id: workspace_cue-lists
  type: array
- id: workspace_selected-cues
  type: array
- id: workspace_running-cues
  type: array
- id: workspace_running-or-paused-cues
  type: array
- id: app_version
  type: string
- id: app_workspaces
  type: array
- id: app_font-names
  type: array
- id: app_font-families-and-styles
  type: object
```

## Variables
```yaml
- id: workspace_current-cue-list
  type: string
  access: read_write
  description: Current cue list by cue number
- id: workspace_current-cue-list-id
  type: string
  access: read_write
  description: Current cue list by cue ID
- id: workspace_show-mode
  type: boolean
  access: read_write
  description: "true=show mode, false=edit mode"
- id: workspace_full-screen
  type: boolean
  access: read_write
- id: workspace_always-audition
  type: boolean
  access: read_write
- id: workspace_live-fade-preview
  type: boolean
  access: read_write
- id: workspace_light-dashboard
  type: boolean
  access: read_write
- id: workspace_min-go-time
  type: number
  access: read_write
  description: Minimum time between GO commands (seconds)
- id: workspace_selection-is-playhead
  type: boolean
  access: read_write
  description: Lock selection to playhead
- id: app_udp-reply-port
  type: integer
  access: read_write
  description: UDP reply port (0 resets to 53001)
- id: app_timecode-window
  type: boolean
  access: read_write
  description: Show/hide Timecode Window
- id: app_override-window
  type: boolean
  access: read_write
  description: Show/hide Override Window
- id: app_working-directory
  type: string
  access: read_write
  description: Working directory (full paths or ~/ paths)
- id: cue_armed
  type: boolean
  access: read_write
- id: cue_flagged
  type: boolean
  access: read_write
- id: cue_pre-wait
  type: number
  access: read_write
  description: Pre-wait time in seconds
- id: cue_post-wait
  type: number
  access: read_write
  description: Post-wait time in seconds
- id: cue_duration
  type: number
  access: read_write
  description: Cue duration in seconds
- id: cue_temp-duration
  type: number
  access: read_write
  description: Temporary duration (reverts on reset)
- id: cue_color-name
  type: string
  access: read_write
  description: Cue color (berry, blue, crimson, cyan, forest, gray, green, hot pink, indigo, lavender, magenta, midnight, olive, orange, peach, plum, purple, red, sky blue, yellow, none)
- id: cue_color-name-live
  type: string
  access: write
  description: Live version of colorName
- id: cue_second-color-name
  type: string
  access: read_write
  description: Second color (same value set as colorName)
- id: cue_second-color-name-live
  type: string
  access: write
  description: Live version of secondColorName
- id: cue_use-second-color
  type: boolean
  access: read_write
- id: cue_continue-mode
  type: integer
  access: read_write
  description: "0=No continue, 1=Auto-continue, 2=Auto-follow"
- id: cue_name
  type: string
  access: read_write
- id: cue_number
  type: string
  access: read_write
- id: cue_notes
  type: string
  access: read_write
- id: cue_duck-level
  type: number
  access: read_write
  description: Duck/boost level (-120 to +12 dB)
- id: cue_duck-others
  type: boolean
  access: read_write
- id: cue_duck-time
  type: number
  access: read_write
- id: cue_fade-and-stop-others
  type: integer
  access: read_write
  description: "0=None, 1=Peers, 2=List or cart, 3=All"
- id: cue_fade-and-stop-others-time
  type: number
  access: read_write
- id: cue_solo-cue-in-time
  type: number
  access: read_write
  description: Fade and stop all other cues in same list over N seconds
- id: cue_auto-load
  type: boolean
  access: read_write
- id: cue_skip-if-disarmed
  type: boolean
  access: read_write
- id: cue_second-trigger-action
  type: integer
  access: read_write
  description: "0=Do nothing, 1=Panic, 2=Stop, 3=Hard stop, 4=Hard stop & restart, 5=Devamp, 6=Playlist Next, 7=Playlist Previous"
- id: cue_second-trigger-on-release
  type: boolean
  access: read_write
- id: cue_target-mode
  type: integer
  access: read_write
  description: "0=Cue target, 1=Patch target"
- id: cue_cue-target-id
  type: string
  access: read_write
  description: Target cue ID. Empty string = no target, "none" = unset.
- id: cue_cue-target-number
  type: string
  access: read_write
- id: cue_file-target
  type: string
  access: read_write
  description: "File target path. 'none' or '' = unset. Full/~/relative paths supported."
- id: cue_patch-target-id
  type: string
  access: read_write
- id: cue_mode
  type: integer
  access: read_write
  description: "Group/list/cart mode. 0=List, 3=Timeline, 4=Start random, 5=Cart, 6=Playlist. Lists/carts are read-only mode."
- id: cue_playhead
  type: string
  access: read_write
  description: "Playhead cue number for group/list/cart. Values: cue number, next, previous, none."
- id: cue_playhead-id
  type: string
  access: read_write
  description: Playhead by cue ID
- id: cue_timecode-trigger-hours
  type: number
  access: read_write
- id: cue_timecode-trigger-minutes
  type: number
  access: read_write
- id: cue_timecode-trigger-seconds
  type: number
  access: read_write
- id: cue_timecode-trigger-frames
  type: number
  access: read_write
- id: cue_timecode-trigger-bits
  type: number
  access: read_write
- id: cue_timecode-trigger-text
  type: string
  access: read_write
  description: Timecode trigger as text string
- id: cue_playlist-current-cue
  type: string
  access: read_write
  description: Current cue in playlist (Playlist Group)
- id: cue_playlist-current-cue-id
  type: string
  access: read_write
- id: cue_playlist-do-crossfade
  type: boolean
  access: read_write
- id: cue_playlist-do-loop
  type: boolean
  access: read_write
- id: cue_playlist-do-shuffle
  type: boolean
  access: read_write
- id: cue_playlist-crossfade-duration
  type: number
  access: read_write
  description: Crossfade duration in seconds
- id: audio_patch_level
  type: number
  access: read_write
  description: Crosspoint level for {patch}/{inChannel}/{outChannel} in dB; -INF accepted as string
- id: audio_patch_level_live
  type: number
  access: write
  description: Live version of crosspoint level
- id: audio_patch_mute
  type: boolean
  access: read_write
  description: Mute {patch} device output {output}
- id: audio_patch_solo
  type: boolean
  access: read_write
  description: Solo {patch} device output {output}
- id: audio_patch_cue-output-channels
  type: integer
  access: read_write
  description: Number of cue outputs (1-128)
- id: override_dmx-output-enabled
  type: boolean
  access: read_write
- id: override_midi-input-enabled
  type: boolean
  access: read_write
- id: override_midi-output-enabled
  type: boolean
  access: read_write
- id: override_msc-input-enabled
  type: boolean
  access: read_write
- id: override_msc-output-enabled
  type: boolean
  access: read_write
- id: override_sysex-input-enabled
  type: boolean
  access: read_write
- id: override_sysex-output-enabled
  type: boolean
  access: read_write
- id: override_network-external-input-enabled
  type: boolean
  access: read_write
- id: override_network-external-output-enabled
  type: boolean
  access: read_write
- id: override_network-local-input-enabled
  type: boolean
  access: read_write
- id: override_network-local-output-enabled
  type: boolean
  access: read_write
- id: override_timecode-input-enabled
  type: boolean
  access: read_write
- id: override_timecode-output-enabled
  type: boolean
  access: read_write
- id: video_stage_region_bounds
  type: object
  access: read_write
  description: "Region bounds {x} {y} {width} {height} for stage/{stage}/region/{region}"
- id: video_stage_region_enable-grid
  type: boolean
  access: read_write
- id: video_stage_region_enable-guide
  type: boolean
  access: read_write
```

## Events
```yaml
- id: qlab_event_workspace
  type: object
  description: Workspace event broadcast (GO, stop, start, playhead move, etc.)
  fields:
    event: string
    cue_number: string
    cue_name: string
    cue_unique_id: string
    cue_type: string
- id: qlab_event_workspace_go
  type: object
  description: GO event (4 message forms sent)
  fields:
    number: integer
    name: string
    unique_id: string
    type: string
- id: qlab_event_workspace_audition-go
  type: object
  description: Audition GO event (4 message forms)
- id: qlab_event_workspace_cue_stop
  type: object
  description: Cue stop event
- id: qlab_event_workspace_cue_start
  type: object
  description: Cue start event
- id: qlab_event_workspace_playhead
  type: object
  description: Playhead move event (4 message forms)
- id: qlab_event_workspace_pause-all
  type: object
- id: qlab_event_workspace_resume-all
  type: object
- id: qlab_event_workspace_panic-all
  type: object
- id: qlab_event_workspace_stop-all
  type: object
- id: qlab_event_workspace_hard-stop-all
  type: object
- id: qlab_event_workspace_reset-all
  type: object
- id: update_workspace
  type: object
  description: Client must reload cue lists
- id: update_cue
  type: object
  description: Client must reload cue state
- id: update_playback_position
  type: object
  description: Playback position changed
- id: disconnect
  type: string
  description: Client must disconnect
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
OSC messages arriving on a given port are received by every open workspace listening on that port. OSC 1.1 booleans supported: True/False, integers/floats (0=false, any other number=true), strings (N/n/F/f/0=false, Y/y/T/t/1-9=true). Any boolean OSC message accepts `toggle` as argument or `/toggle` suffix. TCP uses double-end SLIP framing (RFC 1055) per OSC 1.1 specification. QLab also listens on UDP port 53535 interpreting plain text as OSC (e.g., sending `/cue/selected/start` as plain text behaves same as OSC command to port 53000).

Query commands returning values use `/reply/{/invoked/osc/method} json_string` format with status `ok`, `error`, or `denied`. JSON reply form: `{ "workspace_id": string, "address": "/osc/message/that/was/sent", "status": string, "data": value }`.

Form `/workspace/{id}/command` where {id} is display name (e.g., `hamlet.qlab5`, omit `.qlab5`) or unique ID. Without `/workspace/{id}` prefix, message sent to all open workspaces on that port.

Cue OSC form: `/workspace/{id}/cue/{cue_number}/command` or `/workspace/{id}/cue_id/{id}/command`. Special cue addresses: `/cue/selected`, `/cue/playhead`, `/cue/playbackPosition` (same as playhead), `/cue/active`. Wildcards supported: `*` matches any characters, `?` matches single character. Example: `/cue/*/armed 0` disarms all cues.

Custom event/reply formats: send `/eventFormat {format_string}` or `/replyFormat {format_string}` with tokens `#workspace_id#`, `#address#`, `#status#`, `#data#`. Empty string resets to default.

Network cues send OSC, plain text, or hex code over TCP or UDP. OSC argument rules: single space separates address and arguments; string args with spaces require quotes; digit-only args are integers; decimal-separator args are floats; OSC 1.1 literals `\T` `\F` `\I` `\N` supported. Fade types for Network cues: Resend (1-120 fps), 1D Fade (single `#v#` token with curve), 2D Fade (`#x#`/`#y#` along drawn path).

MSC broadcast uses configured MIDI output patches: GO -> MSC GO {cue number}; Panic All / Stop All / HardStop All -> MSC ALL_OFF; Reset All -> MSC RESET.

<!-- UNRESOLVED: device model version not stated in source -->
<!-- UNRESOLVED: baud rate / serial config not applicable (software-only, no RS-232) -->

## Provenance

```yaml
source_domains:
  - qlab.app
source_urls:
  - https://qlab.app/docs/QLab_5_Reference_Manual.pdf
retrieved_at: 2026-07-13T21:15:25.250Z
last_checked_at: 2026-07-21T22:44:11.219Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:44:11.219Z
matched_actions: 164
action_count: 164
confidence: medium
summary: "All 164 spec actions match literal OSC addresses in the source verbatim with correct param shapes; transport ports confirmed; the source OSC command catalogue is fully represented with no missing or drifted commands. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model version (e.g., QLab 5, QLab 4) not stated in source"
- "no explicit multi-step macros described in source"
- "no safety warnings or interlock procedures stated in source"
- "device model version not stated in source"
- "baud rate / serial config not applicable (software-only, no RS-232)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
