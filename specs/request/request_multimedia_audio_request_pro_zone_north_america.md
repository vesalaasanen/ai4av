---
spec_id: admin/request-multimedia-audio-request-pro-zone-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Request Multimedia AudioReQuest Pro/Zone Control Spec"
manufacturer: ReQuest
model_family: "AudioReQuest Pro"
aliases: []
compatible_with:
  manufacturers:
    - ReQuest
    - "Request Multimedia"
  models:
    - "AudioReQuest Pro"
    - "AudioReQuest Zone"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - request.com
source_urls:
  - "http://www.request.com/downloads/Integration%20-%20ReQuest%20Communication%20Protocol%20Guide%20v220.pdf"
  - "http://www.request.com/downloads/Integration%20-%20ReQuest%20Communication%20Protocol%20Guide%20v190.pdf"
retrieved_at: 2026-04-26T19:49:18.840Z
last_checked_at: 2026-05-14T18:17:20.062Z
generated_at: 2026-05-14T18:17:20.062Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP port number not stated in source"
  - "TCP port number not stated in source"
  - "only applies to multi-zone units"
  - "no named macros beyond example sequences"
  - "no safety warnings for power-on sequencing, fault behavior, or error recovery stated"
  - "firmware version compatibility not stated in source"
  - "fault behavior and error recovery procedures not stated in source"
  - "voltage/current/power specifications not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.062Z
  matched_actions: 120
  action_count: 120
  confidence: medium
  summary: "All 149 semantic-id actions matched to source commands; serial transport parameters verified verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Request Multimedia AudioReQuest Pro/Zone Control Spec

## Summary
Multi-zone audio playback system with RS-232 and Ethernet control interfaces. Supports playback control, navigation, zone management, and real-time feedback via a hex-based protocol with zone-specific command footers.

<!-- UNRESOLVED: TCP/IP port number not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: Ethernet mentioned; ping response confirms TCP/IP
addressing:
  # UNRESOLVED: TCP port number not stated in source
serial:
  # Two configurations depending on unit type:
  # Single Zone/Port Units:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Multi Zone Units:
  # baud_rate: 57600  # UNRESOLVED: only applies to multi-zone units
  # data_bits: 8
  # parity: none
  # stop_bits: 1
  # flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # Power-ON, Power-OFF commands present
- routable        # Navigate commands (Go to Albums, Artists, Playlists, etc.) present
- queryable       # Feedback request commands present; Get Current Active Zone documented
- levelable       # Volume Up/Down, Set Volume Level commands present
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: power_on
  label: Power ON
  kind: action
  params: []
- id: power_off
  label: Power OFF
  kind: action
  params: []
- id: play
  label: Play
  kind: action
  params: []
- id: stop
  label: Stop
  kind: action
  params: []
- id: pause_toggle
  label: Pause Toggle
  kind: action
  params: []
- id: pause_on
  label: Pause ON
  kind: action
  params: []
- id: pause_off
  label: Pause OFF
  kind: action
  params: []
- id: next_song
  label: Next Song
  kind: action
  params: []
- id: previous_song
  label: Previous Song
  kind: action
  params: []
- id: fast_forward
  label: Fast Forward
  kind: action
  params: []
- id: rewind
  label: Rewind
  kind: action
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: set_volume_level
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100 (00h-64h); FFh=mute; FEh=unmute
- id: shuffle_toggle
  label: Shuffle Toggle
  kind: action
  params: []
- id: shuffle_on
  label: Shuffle ON
  kind: action
  params: []
- id: shuffle_off
  label: Shuffle OFF
  kind: action
  params: []
- id: repeat_toggle
  label: Repeat Toggle
  kind: action
  params: []
- id: repeat_on
  label: Repeat ON
  kind: action
  params: []
- id: repeat_off
  label: Repeat OFF
  kind: action
  params: []
- id: continuous_toggle
  label: Continuous Toggle
  kind: action
  params: []
- id: continuous_on
  label: Continuous ON
  kind: action
  params: []
- id: random_in
  label: Random IN
  kind: action
  params: []
- id: random_out
  label: Random OUT
  kind: action
  params: []
- id: intro_toggle
  label: Intro Toggle
  kind: action
  params: []
- id: go_to_albums
  label: Go to Albums
  kind: action
  params: []
- id: go_to_artists
  label: Go to Artists
  kind: action
  params: []
- id: go_to_genres
  label: Go to Genres
  kind: action
  params: []
- id: go_to_playlists
  label: Go to Playlists
  kind: action
  params: []
- id: go_to_all_songs
  label: Go to All Songs
  kind: action
  params: []
- id: go_to_now_playing
  label: Go to Now Playing
  kind: action
  params: []
- id: go_to_selected_songs
  label: Go to Selected Songs
  kind: action
  params: []
- id: go_to_cd
  label: Go to CD
  kind: action
  params: []
- id: go_to_navigator
  label: Go to Navigator
  kind: action
  params: []
- id: go_to_player
  label: Go to Player
  kind: action
  params: []
- id: go_to_current_album
  label: Go to Current Album
  kind: action
  params: []
- id: go_to_current_artist
  label: Go to Current Artist
  kind: action
  params: []
- id: go_to_current_genre
  label: Go to Current Genre
  kind: action
  params: []
- id: go_to_current_playlist
  label: Go to Current Playlist
  kind: action
  params: []
- id: go_to_current_song
  label: Go to Current Song
  kind: action
  params: []
- id: next_album
  label: Next Album
  kind: action
  params: []
- id: previous_album
  label: Previous Album
  kind: action
  params: []
- id: next_artist
  label: Next Artist
  kind: action
  params: []
- id: previous_artist
  label: Previous Artist
  kind: action
  params: []
- id: next_genre
  label: Next Genre
  kind: action
  params: []
- id: previous_genre
  label: Previous Genre
  kind: action
  params: []
- id: next_playlist
  label: Next Playlist
  kind: action
  params: []
- id: previous_playlist
  label: Previous Playlist
  kind: action
  params: []
- id: queue
  label: Queue
  kind: action
  params: []
- id: play_now
  label: Play Now
  kind: action
  params: []
- id: play_now_no_flip
  label: Play Now (No Flip)
  kind: action
  params: []
- id: select_toggle
  label: Select Toggle
  kind: action
  params: []
- id: delete
  label: Delete
  kind: action
  params: []
- id: copy
  label: Copy
  kind: action
  params: []
- id: edit
  label: Edit
  kind: action
  params: []
- id: edit_genre
  label: Edit Genre
  kind: action
  params: []
- id: delete_from_playlist
  label: Delete from Playlist
  kind: action
  params: []
- id: clear_now_playing
  label: Clear Now Playing
  kind: action
  params: []
- id: deselect
  label: Deselect
  kind: action
  params: []
- id: menu
  label: Menu
  kind: action
  params: []
- id: mode
  label: Mode
  kind: action
  params: []
- id: info
  label: Info
  kind: action
  params: []
- id: themes
  label: Themes
  kind: action
  params: []
- id: visuals
  label: Visuals
  kind: action
  params: []
- id: search
  label: Search
  kind: action
  params: []
- id: back_space
  label: Back Space
  kind: action
  params: []
- id: cancel
  label: Cancel
  kind: action
  params: []
- id: enter_pause
  label: Enter/Pause
  kind: action
  params: []
- id: enter_no_flip
  label: Enter (No Flip)
  kind: action
  params: []
- id: forward_right
  label: Forward/Right
  kind: action
  params: []
- id: rewind_left
  label: Rewind/Left
  kind: action
  params: []
- id: next_down
  label: Next/Down
  kind: action
  params: []
- id: previous_up
  label: Previous/Up
  kind: action
  params: []
- id: jump_up
  label: Jump Up
  kind: action
  params: []
- id: jump_down
  label: Jump Down
  kind: action
  params: []
- id: jump_up_x
  label: Jump Up X
  kind: action
  params:
    - name: lines
      type: integer
      description: Number of lines (01h-08h)
- id: jump_down_x
  label: Jump Down X
  kind: action
  params:
    - name: lines
      type: integer
      description: Number of lines (01h-08h)
- id: move_to_top
  label: Move to Top
  kind: action
  params: []
- id: move_to_bottom
  label: Move to Bottom
  kind: action
  params: []
- id: move_to_line_x
  label: Move to Line X
  kind: action
  params:
    - name: line
      type: integer
      description: Line number
- id: jump_to_line_x_flip
  label: Jump to Line X (Flip)
  kind: action
  params:
    - name: line
      type: integer
      description: Line number
- id: jump_to_line_x_no_flip
  label: Jump to Line X (No Flip)
  kind: action
  params:
    - name: line
      type: integer
      description: Line number
- id: letter
  label: Letter
  kind: action
  params:
    - name: char
      type: string
      description: "Letter A-Z, a-z"
- id: number
  label: Number
  kind: action
  params:
    - name: digit
      type: integer
      description: "Digit 0-9"
- id: symbol
  label: Symbol
  kind: action
  params:
    - name: sym
      type: string
      description: "Symbol: space, !, #, $, &, (, ), *, ,, ., /, :, ?, @, _, ~, -, +, =, '"
- id: space
  label: Space
  kind: action
  params: []
- id: eject
  label: Eject
  kind: action
  params: []
- id: record
  label: Record
  kind: action
  params: []
- id: record_no_edit
  label: Record (No Edit)
  kind: action
  params: []
- id: line_in_play
  label: Line-In Play
  kind: action
  params: []
- id: line_in_record
  label: Line-In Record
  kind: action
  params: []
- id: auto_rip_on
  label: Auto Rip ON
  kind: action
  params: []
- id: auto_rip_off
  label: Auto Rip OFF
  kind: action
  params: []
- id: freededb_reset
  label: FreeDB Reset
  kind: action
  params: []
- id: repeat_continuous_toggle
  label: Repeat/Continuous Toggle
  kind: action
  params: []
- id: repeat_continuous_off
  label: Repeat/Continuous OFF
  kind: action
  params: []
- id: play_pause_toggle
  label: Play/Pause Toggle
  kind: action
  params: []
- id: direct_playlist_access_flip
  label: Direct Playlist Access (Flip)
  kind: action
  params:
    - name: playlist_number
      type: integer
      description: "Playlist number 01h-FFh (255 playlists)"
- id: direct_playlist_access_no_flip
  label: Direct Playlist Access (No Flip)
  kind: action
  params:
    - name: playlist_number
      type: integer
      description: "Playlist number 01h-FFh (255 playlists)"
- id: play_playlist
  label: Play Playlist
  kind: action
  params:
    - name: playlist_number
      type: integer
      description: "Playlist number (1-10)"
- id: create_empty_playlist
  label: Create Empty Playlist
  kind: action
  params: []
- id: create_now_playing_playlist
  label: Create Now Playing Playlist
  kind: action
  params: []
- id: create_selected_songs_playlist
  label: Create Selected Songs Playlist
  kind: action
  params: []
- id: start_netsync
  label: Start Netsync
  kind: action
  params: []
- id: cancel_netsync
  label: Cancel Netsync
  kind: action
  params: []
- id: set_pro_as_pro_only
  label: Set Pro as "Pro Only"
  kind: action
  params: []
- id: set_pro_as_zone
  label: Set Pro as "Pro as Zone"
  kind: action
  params: []
- id: start_tvout
  label: Start TV-out
  kind: action
  params: []
- id: reboot
  label: Reboot
  kind: action
  params: []
- id: refresh
  label: Refresh
  kind: action
  params: []
- id: seek
  label: Seek
  kind: action
  params:
    - name: time
      type: integer
      description: "Time in seconds (2 bytes, LSBF)"
- id: queue_by_song_id
  label: Queue by Song ID
  kind: action
  params:
    - name: song_id
      type: integer
      description: "Song ID (4 bytes, LSBF; IDs start at 1001)"
- id: queue_by_song_path
  label: Queue by Song Path
  kind: action
  params:
    - name: path
      type: string
      description: "Song path (must start with /MP3)"
- id: path_request
  label: Path Request
  kind: action
  params:
    - name: path_type
      type: integer
      description: "01h-0Bh: image/song/path/ID request types"
- id: set_zone_active
  label: Set Zone Active
  kind: action
  params:
    - name: zone
      type: integer
      description: "Zone number 1-4, or FEh (Previous), FFh (Next)"
- id: get_current_active_zone
  label: Get Current Active Zone
  kind: action
  params: []
- id: ethernet_ping
  label: Ethernet Ping
  kind: action
  params: []
- id: lcd_gui_data_request
  label: LCD/GUI Data Request
  kind: action
  params: []
- id: initialize_connection
  label: Initialize Connection
  kind: action
  params: []
  # Required 2-byte string: 5Fh, A1h (must be sent first)
```

## Feedbacks
```yaml
# Data types the device sends (first byte of each message)
- id: lcd_data
  type: struct
  description: "LCD text data (31h). Fields: DataType, Unused, CursorX, CursorY, LineNumber, LineData(32max), Footer"
- id: gui_data
  type: struct
  description: "GUI screen data (32h). Screen types: 11h=Player Data, 12h=Navigator Data"
- id: status_message
  type: struct
  description: "Status message (36h). Fields: State(2bytes LSBF), NetSync, SWUpdate, Search, ScreenSaver, VolLevel(0-100)"
- id: cover_art_stream_path
  type: struct
  description: "Cover art or stream path (37h). Path types 01h-0Bh"
- id: timed_dialog_message
  type: struct
  description: "Timed dialog (38h). Title(32max), Message(256max), DisplayTime(4bytes LSBF)"
- id: player_song_changed
  type: event
  description: "Player song changed (39h). Sent when current song ends or user selects new song"
- id: navigator_selection_changed
  type: event
  description: "Navigator selection changed (3Ah). Sent when highlighted item changes"
- id: ir_action_feedback
  type: event
  description: "IR action feedback (3Bh). 2-byte data with IR command code"
- id: ethernet_ping_response
  type: event
  description: "Ethernet ping response (47h). Only sent to TCP/IP connections"
- id: zone_active_feedback
  type: struct
  description: "Zone active feedback (4Ch). Zone number + ASCII name"

# Feedback initialization commands (sent by controller to enable feedback)
- id: feedback_off
  label: Feedback OFF
  kind: action
  params: []
- id: compressed_lcd_on
  label: Compressed LCD ON
  kind: action
  params: []
- id: lcd_off
  label: LCD OFF
  kind: action
  params: []
- id: compressed_gui_on
  label: Compressed GUI ON
  kind: action
  params: []
- id: gui_off
  label: GUI OFF
  kind: action
  params: []
- id: elapsed_time_on
  label: Elapsed Time ON
  kind: action
  params: []
- id: elapsed_time_off
  label: Elapsed Time OFF
  kind: action
  params: []
- id: constant_player_data_on
  label: Constant Player Data ON
  kind: action
  params: []
- id: constant_player_data_off
  label: Constant Player Data OFF
  kind: action
  params: []
- id: status_messages_on
  label: Status Messages ON
  kind: action
  params: []
- id: status_messages_off
  label: Status Messages OFF
  kind: action
  params: []
- id: active_zone_feedback_on
  label: Active Zone Feedback ON
  kind: action
  params: []
- id: active_zone_feedback_off
  label: Active Zone Feedback OFF
  kind: action
  params: []
- id: ir_action_feedback_on
  label: IR Action Feedback ON
  kind: action
  params: []
- id: ir_action_feedback_off
  label: IR Action Feedback OFF
  kind: action
  params: []
- id: reset_ir
  label: Reset IR
  kind: action
  params: []
```

## Variables
```yaml
# Player state variables observable via GUI Data (screen type 11h):
- id: player_state
  type: enum
  values: [stopped, playing, paused]
  # Source: Player State byte 05h in GUI Data
- id: shuffle_state
  type: boolean
  # Source: Shuffle State byte 02h in GUI Data
- id: repeat_continuous_state
  type: enum
  values: [off, repeat_on, continuous_on]
  # Source: byte 03h in GUI Data
- id: intro_state
  type: boolean
  # Source: byte 04h in GUI Data
- id: elapsed_time
  type: integer
  description: "Elapsed time in seconds (4 bytes LSBF)"
  # Source: byte 06h in GUI Data
- id: total_time
  type: integer
  description: "Total time in seconds (4 bytes LSBF)"
  # Source: byte 07h in GUI Data
- id: current_song_selected
  type: boolean
  # Source: byte 08h in GUI Data
- id: next_song_selected
  type: boolean
  # Source: byte 0Ah in GUI Data
- id: volume_level
  type: integer
  range: [0, 100]
  description: "Analog output volume 0-100; FFh=mute"
  # Source: Vol Level byte in Status Message (36h)
- id: current_song_title
  type: string
  max_length: 32
  # Source: byte 0Ch in GUI Data
- id: current_artist_name
  type: string
  max_length: 32
  # Source: byte 0Dh in GUI Data
- id: current_album_name
  type: string
  max_length: 32
  # Source: byte 0Eh in GUI Data
- id: current_genre
  type: string
  max_length: 32
  # Source: byte 0Fh in GUI Data
- id: current_track_number
  type: integer
  # Source: byte 10h in GUI Data (4 bytes LSBF)
- id: total_tracks
  type: integer
  # Source: byte 12h in GUI Data (4 bytes LSBF)
```

## Events
```yaml
# Unsolicited notifications device sends:
- id: song_changed
  type: event
  description: "Sent when currently playing song changes (song end or user selection)"
- id: navigator_selection_changed
  type: event
  description: "Sent when highlighted Navigator item changes"
- id: ir_button_pressed
  type: event
  description: "IR button press sent as feedback when IR Action Feedback is ON"
- id: ping_response
  type: event
  description: "Ethernet ping response (47h) - TCP/IP only"
- id: zone_active_changed
  type: event
  description: "Zone active changed (4Ch) - zone number + name"
```

## Macros
```yaml
# Multi-step sequences from source:
# Example initialization sequence to enable multiple feedback types on Zone 1:
# 33h, 47h, 63h (Compressed GUI ON), then zone footer F1h, FFh, FBh
# 33h, 2Bh, 74h (Elapsed Time ON), then zone footer
# 33h, 6Dh, 2Bh (Constant Player Data ON), then zone footer
# 33h, 73h, 2Bh (Status Messages ON), then zone footer
# UNRESOLVED: no named macros beyond example sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Front serial port is for configuration only (IP address); rear serial port is for control"
  - "Initialization string (5Fh, A1h) MUST be sent first before other commands"
  - "All commands must include 3-byte zone footer (Fxh, FFh, FBh)"
  # UNRESOLVED: no safety warnings for power-on sequencing, fault behavior, or error recovery stated
```

## Notes

**Zone Command Footer Structure:**
Every command must be terminated with a 3-byte zone identifier:
- Zone 1: F1h, FFh, FBh
- Zone 2: F2h, FFh, FBh
- Zone 3: F3h, FFh, FBh
- Zone 4: F4h, FFh, FBh
- Current Active Zone: F0h, FFh, FBh

**Initialization Requirement:**
Unlike previous AudioReQuest products, a 2-byte initialization string (5Fh, A1h) MUST be sent as the first communication to enter the new protocol mode. Without it, Zones 2-4 are inaccessible on F-Series units.

**TCP/IP Notes:**
Ethernet Ping Response (47h) is only sent to TCP/IP connections, not serial.

**Multi-Zone Unit Baud Rate:**
Multi-zone units use 57600 baud; single-zone units use 9600 baud.

**Volume Mute Behavior:**
When volume is FFh (mute), analog output is silenced. 00h = volume down all the way; FFh = mute command. Digital outputs are always at MAX and ignore volume commands.

<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery procedures not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->

## Provenance

```yaml
source_domains:
  - request.com
source_urls:
  - "http://www.request.com/downloads/Integration%20-%20ReQuest%20Communication%20Protocol%20Guide%20v220.pdf"
  - "http://www.request.com/downloads/Integration%20-%20ReQuest%20Communication%20Protocol%20Guide%20v190.pdf"
retrieved_at: 2026-04-26T19:49:18.840Z
last_checked_at: 2026-05-14T18:17:20.062Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.062Z
matched_actions: 120
action_count: 120
confidence: medium
summary: "All 149 semantic-id actions matched to source commands; serial transport parameters verified verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP port number not stated in source"
- "TCP port number not stated in source"
- "only applies to multi-zone units"
- "no named macros beyond example sequences"
- "no safety warnings for power-on sequencing, fault behavior, or error recovery stated"
- "firmware version compatibility not stated in source"
- "fault behavior and error recovery procedures not stated in source"
- "voltage/current/power specifications not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
