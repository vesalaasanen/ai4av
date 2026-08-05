---
spec_id: admin/kaleidescape-media-server
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kaleidescape Media Server Control Spec"
manufacturer: Kaleidescape
model_family: "Kaleidescape Server"
aliases: []
compatible_with:
  manufacturers:
    - Kaleidescape
  models:
    - "Kaleidescape Server"
    - Strato
    - "Strato V"
    - Alto
    - "Terra Movie Server"
    - "Cinema One"
    - Player
    - "1080p Player"
    - "1080p Mini Player"
    - "Movie Player 2"
    - "Music Player"
    - "Disc Vault"
  firmware: "\"\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/kaleidescape-system-control-protocol-reference-manual.pdf
  - https://www.kaleidescape.com/support/article/Control-Protocol-Reference-Manual
  - https://www.kaleidescape.com/wp-content/uploads/integrating-with-the-kaleidescape-mobile-app.pdf
  - https://www.kaleidescape.com/support/article/control-systems
retrieved_at: 2026-05-22T16:40:07.713Z
last_checked_at: 2026-07-21T23:03:06.238Z
generated_at: 2026-07-21T23:03:06.238Z
firmware_coverage: "\"\""
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges not stated"
  - "exact model-specific command availability matrix not fully documented"
  - "PLAY_SCRIPT references named scripts but script definitions not in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:03:06.238Z
  matched_actions: 202
  action_count: 202
  confidence: medium
  summary: "All 202 spec actions map literally to source command headers, params and transport values verified verbatim, and the source command catalogue is fully represented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Kaleidescape Media Server Control Spec

## Summary
Kaleidescape media server and player systems controlled via ASCII text-based protocol over TCP/IP (port 10000) or RS-232 serial. Protocol supports up to 20 simultaneous TCP connections, command routing to any component in the system via CPDID or serial number, and event-driven state updates. Covers power management, movie and music playback, navigation, parental controls, video output configuration, screen masking, and intermission control.

<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: exact model-specific command availability matrix not fully documented -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 10000
serial:
  baud_rate: 19200  # player default (Table 2); server default 115200; players support up to 57600, servers up to 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # hardware RTS/CTS optional; software flow control not supported
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: ENTER_STANDBY / LEAVE_STANDBY commands
  - queryable     # inferred: extensive GET_ query commands
  - routable      # inferred: command routing via CPDID / serial number
```

## Actions
```yaml
actions:
  # ── Power ──
  - id: enter_standby
    label: Enter Standby
    kind: action
    params: []
    description: "Command: ENTER_STANDBY:"

  - id: leave_standby
    label: Leave Standby
    kind: action
    params: []
    description: "Command: LEAVE_STANDBY:"

  - id: get_device_power_state
    label: Get Device Power State
    kind: query
    params: []

  # ── Idle mode ──
  - id: get_system_readiness_state
    label: Get System Readiness State
    kind: query
    params: []
    description: "Strato and Cinema One 2nd gen only"

  - id: leave_idle_mode
    label: Leave Idle Mode
    kind: action
    params: []
    description: "Strato and Cinema One 2nd gen only"

  # ── Verification ──
  - id: get_system_version
    label: Get System Version
    kind: query
    params: []

  - id: get_device_type_name
    label: Get Device Type Name
    kind: query
    params: []

  - id: get_time
    label: Get Time
    kind: query
    params: []

  - id: get_num_zones
    label: Get Number of Zones
    kind: query
    params: []

  - id: get_available_devices
    label: Get Available Devices
    kind: query
    params: []

  - id: get_available_devices_by_serial_number
    label: Get Available Devices by Serial Number
    kind: query
    params: []

  # ── Protocol ──
  - id: get_protocol
    label: Get Protocol Version
    kind: query
    params: []

  - id: set_protocol_settings
    label: Set Protocol Settings
    kind: action
    params:
      - name: delimiter_type
        type: string
        description: "PRINTABLE_DELIMITERS or BINARY_DELIMITERS"
      - name: character_set
        type: string
        description: "LATIN-1"

  - id: get_active_protocol
    label: Get Active Protocol
    kind: query
    params: []

  - id: set_supported_protocol
    label: Set Supported Protocol
    kind: action
    params:
      - name: version
        type: integer
        description: "Zero-padded two-digit protocol version number"

  # ── Events ──
  - id: enable_events
    label: Enable Events
    kind: action
    params:
      - name: target_device_id
        type: string
        description: "CPDID or serial number device identifier"

  - id: disable_events
    label: Disable Events
    kind: action
    params:
      - name: target_device_id
        type: string
        description: "CPDID or serial number device identifier"

  - id: get_device_info
    label: Get Device Info
    kind: query
    params: []

  - id: send_to_syslog
    label: Send to Syslog
    kind: action
    command: "SEND_TO_SYSLOG:INFORMATION:{message}:"
    params:
      - name: message
        type: string
        description: "Information string to log (preceded by literal INFORMATION token in command body)"

  # ── Friendly name ──
  - id: get_friendly_name
    label: Get Friendly Name
    kind: query
    params: []

  - id: set_friendly_name
    label: Set Friendly Name
    kind: action
    params:
      - name: name
        type: string
        description: "Friendly name to assign"

  - id: get_friendly_system_name
    label: Get Friendly System Name
    kind: query
    params: []

  # ── Navigation arrows ──
  - id: up
    label: Up
    kind: action
    params: []
    description: "Also UP_PRESS, UP_RELEASE"

  - id: down
    label: Down
    kind: action
    params: []
    description: "Also DOWN_PRESS, DOWN_RELEASE"

  - id: left
    label: Left
    kind: action
    params: []
    description: "Also LEFT_PRESS, LEFT_RELEASE"

  - id: right
    label: Right
    kind: action
    params: []
    description: "Also RIGHT_PRESS, RIGHT_RELEASE"

  - id: up_press
    label: Up Press
    kind: action
    command: "UP_PRESS:"
    params: []

  - id: up_release
    label: Up Release
    kind: action
    command: "UP_RELEASE:"
    params: []

  - id: down_press
    label: Down Press
    kind: action
    command: "DOWN_PRESS:"
    params: []

  - id: down_release
    label: Down Release
    kind: action
    command: "DOWN_RELEASE:"
    params: []

  - id: left_press
    label: Left Press
    kind: action
    command: "LEFT_PRESS:"
    params: []

  - id: left_release
    label: Left Release
    kind: action
    command: "LEFT_RELEASE:"
    params: []

  - id: right_press
    label: Right Press
    kind: action
    command: "RIGHT_PRESS:"
    params: []

  - id: right_release
    label: Right Release
    kind: action
    command: "RIGHT_RELEASE:"
    params: []

  - id: page_up
    label: Page Up
    kind: action
    params: []
    description: "Also PAGE_UP_PRESS, PAGE_UP_RELEASE"

  - id: page_down
    label: Page Down
    kind: action
    params: []
    description: "Also PAGE_DOWN_PRESS, PAGE_DOWN_RELEASE"

  - id: page_up_press
    label: Page Up Press
    kind: action
    command: "PAGE_UP_PRESS:"
    params: []

  - id: page_up_release
    label: Page Up Release
    kind: action
    command: "PAGE_UP_RELEASE:"
    params: []

  - id: page_down_press
    label: Page Down Press
    kind: action
    command: "PAGE_DOWN_PRESS:"
    params: []

  - id: page_down_release
    label: Page Down Release
    kind: action
    command: "PAGE_DOWN_RELEASE:"
    params: []

  - id: page_down_or_next
    label: Page Down or Next
    kind: action
    command: "PAGE_DOWN_OR_NEXT:"
    params: []

  - id: page_down_or_next_press
    label: Page Down or Next Press
    kind: action
    command: "PAGE_DOWN_OR_NEXT_PRESS:"
    params: []

  - id: page_down_or_next_release
    label: Page Down or Next Release
    kind: action
    command: "PAGE_DOWN_OR_NEXT_RELEASE:"
    params: []

  - id: page_down_or_previous
    label: Page Down or Previous
    kind: action
    command: "PAGE_DOWN_OR_PREVIOUS:"
    params: []

  - id: page_down_or_previous_press
    label: Page Down or Previous Press
    kind: action
    command: "PAGE_DOWN_OR_PREVIOUS_PRESS:"
    params: []

  - id: page_down_or_previous_release
    label: Page Down or Previous Release
    kind: action
    command: "PAGE_DOWN_OR_PREVIOUS_RELEASE:"
    params: []

  - id: page_up_or_next
    label: Page Up or Next
    kind: action
    command: "PAGE_UP_OR_NEXT:"
    params: []

  - id: page_up_or_next_press
    label: Page Up or Next Press
    kind: action
    command: "PAGE_UP_OR_NEXT_PRESS:"
    params: []

  - id: page_up_or_next_release
    label: Page Up or Next Release
    kind: action
    command: "PAGE_UP_OR_NEXT_RELEASE:"
    params: []

  - id: page_up_or_previous
    label: Page Up or Previous
    kind: action
    command: "PAGE_UP_OR_PREVIOUS:"
    params: []

  - id: page_up_or_previous_press
    label: Page Up or Previous Press
    kind: action
    command: "PAGE_UP_OR_PREVIOUS_PRESS:"
    params: []

  - id: page_up_or_previous_release
    label: Page Up or Previous Release
    kind: action
    command: "PAGE_UP_OR_PREVIOUS_RELEASE:"
    params: []

  - id: select
    label: Select
    kind: action
    params: []

  - id: back
    label: Back
    kind: action
    params: []

  - id: position_select
    label: Position Select
    kind: action
    params:
      - name: x_loc
        type: integer
        description: "X coordinate (0 to 2 billion)"
      - name: y_loc
        type: integer
        description: "Y coordinate (0 to 2 billion)"

  # ── Child navigation ──
  - id: child_select
    label: Child Select
    kind: action
    command: "CHILD_SELECT:"
    params: []

  - id: child_up
    label: Child Up
    kind: action
    command: "CHILD_UP:"
    params: []
    description: "Any movie zone"

  - id: child_up_press
    label: Child Up Press
    kind: action
    command: "CHILD_UP_PRESS:"
    params: []

  - id: child_up_release
    label: Child Up Release
    kind: action
    command: "CHILD_UP_RELEASE:"
    params: []

  - id: child_down
    label: Child Down
    kind: action
    command: "CHILD_DOWN:"
    params: []

  - id: child_down_press
    label: Child Down Press
    kind: action
    command: "CHILD_DOWN_PRESS:"
    params: []

  - id: child_down_release
    label: Child Down Release
    kind: action
    command: "CHILD_DOWN_RELEASE:"
    params: []

  - id: child_left
    label: Child Left
    kind: action
    command: "CHILD_LEFT:"
    params: []

  - id: child_left_press
    label: Child Left Press
    kind: action
    command: "CHILD_LEFT_PRESS:"
    params: []

  - id: child_left_release
    label: Child Left Release
    kind: action
    command: "CHILD_LEFT_RELEASE:"
    params: []

  - id: child_right
    label: Child Right
    kind: action
    command: "CHILD_RIGHT:"
    params: []

  - id: child_right_press
    label: Child Right Press
    kind: action
    command: "CHILD_RIGHT_PRESS:"
    params: []

  - id: child_right_release
    label: Child Right Release
    kind: action
    command: "CHILD_RIGHT_RELEASE:"
    params: []

  - id: child_play
    label: Child Play
    kind: action
    command: "CHILD_PLAY:"
    params: []

  - id: child_pause
    label: Child Pause
    kind: action
    command: "CHILD_PAUSE:"
    params: []
    description: "Also CHILD_PAUSE_ON, CHILD_PAUSE_OFF"

  - id: child_pause_on
    label: Child Pause On
    kind: action
    command: "CHILD_PAUSE_ON:"
    params: []

  - id: child_pause_off
    label: Child Pause Off
    kind: action
    command: "CHILD_PAUSE_OFF:"
    params: []

  - id: child_stop
    label: Child Stop
    kind: action
    params: []

  - id: enter_child_mode
    label: Enter Child Mode
    kind: action
    params: []

  - id: leave_child_mode
    label: Leave Child Mode
    kind: action
    params: []

  # ── Menu ──
  - id: kaleidescape_menu_on
    label: Kaleidescape Menu On
    kind: action
    params: []

  - id: kaleidescape_menu_off
    label: Kaleidescape Menu Off
    kind: action
    params: []

  - id: kaleidescape_menu_toggle
    label: Kaleidescape Menu Toggle
    kind: action
    params: []

  - id: disc_or_kaleidescape_menu
    label: Disc or Kaleidescape Menu
    kind: action
    params: []

  # ── Views ──
  - id: get_ui_state
    label: Get UI State
    kind: query
    params: []

  - id: go_movies
    label: Go Movies
    kind: action
    params: []

  - id: go_movie_list
    label: Go Movie List
    kind: action
    params: []

  - id: go_movie_covers
    label: Go Movie Covers
    kind: action
    params: []

  - id: go_movie_collections
    label: Go Movie Collections
    kind: action
    params: []

  - id: go_movie_collection
    label: Go Movie Collection
    kind: action
    params:
      - name: collection_name
        type: string
        description: "Name of the collection to open"

  - id: go_music
    label: Go Music
    kind: action
    params: []

  - id: go_music_list
    label: Go Music List
    kind: action
    params: []

  - id: go_music_covers
    label: Go Music Covers
    kind: action
    params: []

  - id: go_music_collections
    label: Go Music Collections
    kind: action
    params: []

  - id: go_music_collection
    label: Go Music Collection
    kind: action
    params:
      - name: collection_name
        type: string
        description: "Name of the music collection to open"

  - id: go_now_playing
    label: Go Now Playing
    kind: action
    params: []

  - id: go_movie_store
    label: Go Movie Store
    kind: action
    params: []
    description: "Strato movie zones only"

  - id: go_system_status
    label: Go System Status
    kind: action
    params: []

  - id: go_parental_control
    label: Go Parental Control
    kind: action
    params: []

  - id: go_vault_summary
    label: Go Vault Summary
    kind: action
    params: []

  - id: go_search
    label: Go Search
    kind: action
    params: []
    description: "Strato or Alto movie zones only"

  # ── Screen saver ──
  - id: go_screen_saver
    label: Go Screen Saver
    kind: action
    params: []

  - id: stop_screen_saver
    label: Stop Screen Saver
    kind: action
    params: []

  # ── Playback ──
  - id: play
    label: Play
    kind: action
    params: []

  - id: pause
    label: Pause
    kind: action
    command: "PAUSE:"
    params: []
    description: "Toggle pause. Also PAUSE_ON, PAUSE_OFF"

  - id: pause_on
    label: Pause On
    kind: action
    command: "PAUSE_ON:"
    params: []

  - id: pause_off
    label: Pause Off
    kind: action
    command: "PAUSE_OFF:"
    params: []

  - id: play_or_pause
    label: Play or Pause
    kind: action
    params: []
    description: "Strato movie zones only"

  - id: stop
    label: Stop
    kind: action
    params: []

  - id: stop_or_cancel
    label: Stop or Cancel
    kind: action
    params: []

  - id: next
    label: Next
    kind: action
    params: []

  - id: previous
    label: Previous
    kind: action
    params: []

  - id: scan_forward
    label: Scan Forward
    kind: action
    params: []

  - id: scan_reverse
    label: Scan Reverse
    kind: action
    params: []

  - id: replay
    label: Replay
    kind: action
    params: []

  # ── Playback queries ──
  - id: get_play_status
    label: Get Play Status
    kind: query
    params: []

  - id: get_playing_title_name
    label: Get Playing Title Name
    kind: query
    params: []

  - id: get_movie_media_type
    label: Get Movie Media Type
    kind: query
    params: []

  - id: get_movie_location
    label: Get Movie Location
    kind: query
    params: []

  - id: get_camera_angle
    label: Get Camera Angle
    kind: query
    params: []

  # ── Playback control ──
  - id: set_status_cue_period
    label: Set Status Cue Period
    kind: action
    params:
      - name: period
        type: integer
        description: "Seconds between PLAY_STATUS updates (0=off, 1=every second)"

  # ── Disc ──
  - id: disc_menu
    label: Disc Menu
    kind: action
    params: []

  - id: disc_top_menu
    label: Disc Top Menu
    kind: action
    params: []

  - id: disc_resume
    label: Disc Resume
    kind: action
    params: []

  - id: disc_in_tray_toggle
    label: Disc In Tray Toggle
    kind: action
    params: []
    description: "Movie players with optical disc drive only"

  - id: start_chapter_entry
    label: Start Chapter Entry
    kind: action
    params: []

  - id: start_disc_title_entry
    label: Start Disc Title Entry
    kind: action
    params: []

  - id: start_send_number_to_disc_entry
    label: Start Send Number to Disc Entry
    kind: action
    params: []

  # ── Intermission ──
  - id: intermission_on
    label: Intermission On
    kind: action
    params: []

  - id: intermission_off
    label: Intermission Off
    kind: action
    params: []

  - id: intermission_toggle
    label: Intermission Toggle
    kind: action
    params: []

  # ── Scenes / Scripts ──
  - id: set_favorite_scene_start
    label: Set Favorite Scene Start
    kind: action
    params: []

  - id: set_favorite_scene_end
    label: Set Favorite Scene End
    kind: action
    params: []

  - id: play_script
    label: Play Script
    kind: action
    params:
      - name: script_name
        type: string
        description: "Name of the script to play"

  # ── Blu-ray ──
  - id: bluray_special_stop
    label: Blu-ray Special Stop
    kind: action
    params: []
    description: "CAUTION: can trap user depending on disc authoring"

  - id: bluray_popup_menu_toggle
    label: Blu-ray Popup Menu Toggle
    kind: action
    params: []

  - id: angle_next
    label: Angle Next
    kind: action
    params: []

  - id: angle_previous
    label: Angle Previous
    kind: action
    params: []

  - id: audio_next
    label: Audio Next
    kind: action
    params: []

  - id: subtitles_next
    label: Subtitles Next
    kind: action
    params: []

  # ── Blu-ray color buttons ──
  - id: red
    label: Red Button
    kind: action
    params: []
    description: "Also RED_PRESS, RED_RELEASE"

  - id: green
    label: Green Button
    kind: action
    params: []
    description: "Also GREEN_PRESS, GREEN_RELEASE"

  - id: blue
    label: Blue Button
    kind: action
    params: []
    description: "Also BLUE_PRESS, BLUE_RELEASE"

  - id: yellow
    label: Yellow Button
    kind: action
    command: "YELLOW:"
    params: []
    description: "Also YELLOW_PRESS, YELLOW_RELEASE"

  - id: red_press
    label: Red Button Press
    kind: action
    command: "RED_PRESS:"
    params: []

  - id: red_release
    label: Red Button Release
    kind: action
    command: "RED_RELEASE:"
    params: []

  - id: green_press
    label: Green Button Press
    kind: action
    command: "GREEN_PRESS:"
    params: []

  - id: green_release
    label: Green Button Release
    kind: action
    command: "GREEN_RELEASE:"
    params: []

  - id: blue_press
    label: Blue Button Press
    kind: action
    command: "BLUE_PRESS:"
    params: []

  - id: blue_release
    label: Blue Button Release
    kind: action
    command: "BLUE_RELEASE:"
    params: []

  - id: yellow_press
    label: Yellow Button Press
    kind: action
    command: "YELLOW_PRESS:"
    params: []

  - id: yellow_release
    label: Yellow Button Release
    kind: action
    command: "YELLOW_RELEASE:"
    params: []

  # ── User input ──
  - id: get_user_input
    label: Get User Input
    kind: query
    params: []

  - id: get_user_input_prompt
    label: Get User Input Prompt
    kind: query
    params: []
    description: "Strato or Alto movie zones only"

  - id: set_user_input_entry
    label: Set User Input Entry
    kind: action
    params:
      - name: string
        type: string
        description: "Text to enter"

  - id: keyboard_character
    label: Keyboard Character
    kind: action
    params:
      - name: character
        type: string
        description: "Single character to send"

  - id: keyboard_literal
    label: Keyboard Literal
    kind: action
    params:
      - name: character
        type: string
        description: "ASCII character >=32"

  - id: backspace
    label: Backspace
    kind: action
    params: []

  # ── View-specific ──
  - id: filter_list
    label: Filter List
    kind: action
    params: []

  - id: shuffle_cover_art
    label: Shuffle Cover Art
    kind: action
    params: []

  - id: child_shuffle_cover_art
    label: Child Shuffle Cover Art
    kind: action
    params: []

  - id: alphabetize_cover_art
    label: Alphabetize Cover Art
    kind: action
    params: []

  - id: default_level
    label: Default Level
    kind: action
    params: []
    description: "Parental control: set to default level"

  - id: safe_level
    label: Safe Level
    kind: action
    params: []
    description: "Parental control: set to safe level"

  - id: details
    label: Details
    kind: action
    params: []

  - id: show_navigation_overlay
    label: Show Navigation Overlay
    kind: action
    params: []

  - id: status_and_settings
    label: Status and Settings
    kind: action
    params: []

  # ── Content details ──
  - id: get_content_details
    label: Get Content Details
    kind: query
    params:
      - name: handle
        type: string
        description: "Content handle from HIGHLIGHTED_SELECTION or BROWSE_RESPONSE"
      - name: passcode
        type: string
        description: "Passcode for restricted content (empty if not needed)"

  - id: get_highlighted_selection
    label: Get Highlighted Selection
    kind: query
    params: []

  # ── Video output ──
  - id: get_video_mode
    label: Get Video Mode
    kind: query
    params: []

  - id: get_video_color
    label: Get Video Color
    kind: query
    params: []
    description: "Strato or Alto movie zones only"

  - id: get_content_color
    label: Get Content Color
    kind: query
    params: []
    description: "Strato or Alto movie zones only"

  - id: get_cinemascape_mode
    label: Get CinemaScape Mode
    kind: query
    params: []

  - id: set_cinemascape_mode
    label: Set CinemaScape Mode
    kind: action
    params:
      - name: mode
        type: integer
        description: "0=off, 1=2.35 Anamorphic, 2=2.35 Letterbox, 3=Native 2.35 Display"

  - id: get_cinemascape_mask
    label: Get CinemaScape Mask
    kind: query
    params: []

  - id: get_screen_mask
    label: Get Screen Mask
    kind: query
    params: []

  - id: get_screen_mask2
    label: Get Screen Mask 2
    kind: query
    params: []

  - id: set_screen_mask
    label: Set Screen Mask
    kind: action
    params:
      - name: flag
        type: integer
        description: "0=no masking compensation, 1=compensate for masking"

  - id: get_scale_mode
    label: Get Scale Mode
    kind: query
    params: []

  - id: go_calibrate_masking
    label: Go Calibrate Masking
    kind: action
    params: []

  - id: go_calibrate_masking_overscan
    label: Go Calibrate Masking Overscan
    kind: action
    params: []

  # ── Music playback ──
  - id: get_music_now_playing_status
    label: Get Music Now Playing Status
    kind: query
    params: []
    description: "Premiere music zones only"

  - id: get_music_play_status
    label: Get Music Play Status
    kind: query
    params: []
    description: "Premiere music zones only"

  - id: get_music_title
    label: Get Music Title
    kind: query
    params: []
    description: "Premiere music zones only"

  - id: get_playing_music_information
    label: Get Playing Music Information
    kind: query
    params: []
    description: "Premiere music zones only"

  - id: music_random_on
    label: Music Random On
    kind: action
    params: []

  - id: music_random_off
    label: Music Random Off
    kind: action
    params: []

  - id: music_random_toggle
    label: Music Random Toggle
    kind: action
    params: []

  - id: music_repeat_on
    label: Music Repeat On
    kind: action
    params: []

  - id: music_repeat_off
    label: Music Repeat Off
    kind: action
    params: []

  - id: music_repeat_toggle
    label: Music Repeat Toggle
    kind: action
    params: []

  # ── Music browsing ──
  - id: browse
    label: Browse
    kind: action
    params:
      - name: browse_handle
        type: string
        description: "Handle of the node being requested"
      - name: passcode
        type: string
        description: "Passcode if needed"
      - name: lines
        type: string
        description: "Line range (e.g. 1-10)"
      - name: flags
        type: string
        description: "filter or suggest modifiers"
    description: "Premiere music zones only"

  - id: perform_action
    label: Perform Action
    kind: action
    params:
      - name: handle
        type: string
        description: "Content handle"
      - name: passcode
        type: string
        description: "Passcode if needed"
      - name: action
        type: string
        description: "Action to perform"
    description: "Premiere music zones only"

  - id: play_first_in_music_collection
    label: Play First in Music Collection
    kind: action
    params:
      - name: collection
        type: string
        description: "Collection name"
    description: "Premiere music zones only"

  - id: play_next_in_music_collection
    label: Play Next in Music Collection
    kind: action
    params:
      - name: collection
        type: string
        description: "Collection name"
    description: "Premiere music zones only"

  - id: play_previous_in_music_collection
    label: Play Previous in Music Collection
    kind: action
    params:
      - name: collection
        type: string
        description: "Collection name"
    description: "Premiere music zones only"

  # ── Music presets ──
  - id: assign_playing_music_to_preset
    label: Assign Playing Music to Preset
    kind: action
    params:
      - name: tag
        type: string
        description: "Preset tag name"
    description: "Premiere music zones only"

  - id: play_music_preset
    label: Play Music Preset
    kind: action
    params:
      - name: tag
        type: string
        description: "Preset tag name"
    description: "Premiere music zones only"

  - id: get_music_preset_information
    label: Get Music Preset Information
    kind: query
    params:
      - name: tag
        type: string
        description: "Preset tag name"
    description: "Premiere music zones only"

  # ── Zone control ──
  - id: get_controlled_zone
    label: Get Controlled Zone
    kind: query
    params: []

  - id: set_controlled_zone
    label: Set Controlled Zone
    kind: action
    params:
      - name: serial_zone
        type: string
        description: "Serial number and zone (e.g. #000000120B91.02)"

  # ── Child mode ──
  - id: get_child_mode_state
    label: Get Child Mode State
    kind: query
    params: []

  # ── Network ──
  - id: get_network_settings
    label: Get Network Settings
    kind: query
    params: []

  - id: set_network_settings
    label: Set Network Settings
    kind: action
    params:
      - name: static
        type: integer
        description: "0=DHCP, 1=static IP"
      - name: ip_address
        type: string
        description: "IP address (blank to keep)"
      - name: subnet
        type: string
        description: "Subnet mask (blank to keep)"
      - name: gateway
        type: string
        description: "Gateway (blank to keep)"
      - name: dns1
        type: string
        description: "Primary DNS (blank to keep)"
      - name: dns2
        type: string
        description: "Secondary DNS (blank to keep)"

  # ── System capabilities ──
  - id: get_system_capabilities
    label: Get System Capabilities
    kind: query
    params: []

  - id: get_zone_capabilities
    label: Get Zone Capabilities
    kind: query
    params: []
    description: "Strato or Alto movie zones only"

  # ── Custom events ──
  - id: send_event
    label: Send Custom Event
    kind: action
    params:
      - name: message
        type: string
        description: "Custom event message string"
```

## Feedbacks
```yaml
feedbacks:
  - id: device_power_state
    type: enum
    values: [standby, powered_on]
    description: "Response/event: DEVICE_POWER_STATE. Also includes zone availability states."

  - id: system_readiness_state
    type: enum
    values: [ready, becoming_ready, idle]
    description: "Response/event: SYSTEM_READINESS_STATE (Strato/Cinema One 2nd gen)"

  - id: ui_state
    type: composite
    description: "Response/event: UI_STATE with screen, popup, dialog, saver fields"

  - id: play_status
    type: composite
    description: "Response/event: PLAY_STATUS with mode, speed, title_num, title_length, title_loc, chap_num, chap_len, chap_loc"

  - id: title_name
    type: string
    description: "Response/event: TITLE_NAME"

  - id: movie_media_type
    type: enum
    values: [none, dvd, video_stream, bluray]
    description: "Response/event: MOVIE_MEDIA_TYPE"

  - id: movie_location
    type: enum
    values: [interface, main_content, intermission, end_credits, disc_menu]
    description: "Response/event: MOVIE_LOCATION"

  - id: video_mode
    type: composite
    description: "Response/event: VIDEO_MODE with composite, component, HDMI fields"

  - id: video_color
    type: composite
    description: "Response/event: VIDEO_COLOR with EOTF, color_space, color_depth, color_sampling"

  - id: content_color
    type: composite
    description: "Response/event: CONTENT_COLOR with EOTF, color_space, color_depth, color_sampling (Strato/Alto movie zones)"

  - id: screen_mask
    type: composite
    description: "Response/event: SCREEN_MASK with image_ratio, trim values, mask positions"

  - id: cinemascape_mask
    type: string
    description: "Response/event: CINEMASCAPE_MASK frame ratio"

  - id: cinemascape_mode
    type: enum
    values: [off, anamorphic_235, letterbox_235, native_235]
    description: "Response/event: CINEMASCAPE_MODE"

  - id: scale_mode
    type: enum
    values: [none, anamorphic, reserved, zoom]
    description: "Response/event: SCALE_MODE"

  - id: highlighted_selection
    type: string
    description: "Response/event: HIGHLIGHTED_SELECTION handle"

  - id: camera_angle
    type: composite
    description: "Response/event: CAMERA_ANGLE with current angle, total angles, angle block flag"

  - id: child_mode_state
    type: enum
    values: [inactive, active]
    description: "Response/event: CHILD_MODE_STATE"

  - id: music_now_playing_status
    type: composite
    description: "Response/event: MUSIC_NOW_PLAYING_STATUS (Premiere music zones)"

  - id: music_play_status
    type: composite
    description: "Response/event: MUSIC_PLAY_STATUS with mode, speed, length, position, progress (Premiere)"

  - id: music_title
    type: composite
    description: "Response/event: MUSIC_TITLE with track, artist, album, handles (Premiere)"

  - id: playing_music_information
    type: composite
    description: "Response/event: PLAYING_MUSIC_INFORMATION with handle and label"

  - id: music_preset_information
    type: composite
    description: "Response/event: MUSIC_PRESET_INFORMATION with tag, handle, label"

  - id: user_input
    type: composite
    description: "Response/event: USER_INPUT with type, prompt, entry fields"

  - id: user_defined_event
    type: string
    description: "Event: USER_DEFINED_EVENT with custom event message"

  - id: available_devices
    type: string
    description: "Response/event: AVAILABLE_DEVICES list of CPDIDs"

  - id: content_details
    type: composite
    description: "Response: CONTENT_DETAILS line-by-line name/value pairs"

  - id: content_details_overview
    type: composite
    description: "Response: CONTENT_DETAILS_OVERVIEW with num_lines, handle, table name"

  - id: network_settings
    type: composite
    description: "Response: NETWORK_SETTINGS with static flag, IP, subnet, gateway, DNS"

  - id: system_capabilities
    type: composite
    description: "Response: SYSTEM_CAPABILITIES with movies, music, product_line flags"

  - id: zone_capabilities
    type: composite
    description: "Response: ZONE_CAPABILITIES with osd, movies, music, store, search flags"

  - id: system_version
    type: composite
    description: "Response: SYSTEM_VERSION with protocol version and kOS version"

  - id: protocol_version
    type: integer
    description: "Response: PROTOCOL version number"

  - id: active_protocol
    type: integer
    description: "Response: ACTIVE_PROTOCOL version number"

  - id: device_info
    type: composite
    description: "Response: DEVICE_INFO with device_type, serial_num, cpdid, ip_address"

  - id: device_type_name
    type: string
    description: "Response: DEVICE_TYPE_NAME"

  - id: num_zones
    type: composite
    description: "Response: NUM_ZONES with movie and music zone counts"

  - id: friendly_name
    type: string
    description: "Response: FRIENDLY_NAME"

  - id: friendly_system_name
    type: string
    description: "Response: FRIENDLY_SYSTEM_NAME"

  - id: controlled_zone
    type: string
    description: "Response: CONTROLLED_ZONE with serial and zone number"

  - id: time
    type: composite
    description: "Response: TIME with yyyy, mm, dd, hh, mm, ss, timezone"

  - id: status_cue_period
    type: integer
    description: "Response: STATUS_CUE_PERIOD"

  - id: player_restart
    type: event
    description: "Event: PLAYER_RESTART - component finished powering up and ready"

  - id: browse_results_overview
    type: composite
    description: "Response: BROWSE_RESULTS_OVERVIEW (Premiere music zones)"

  - id: browse_result
    type: composite
    description: "Response: BROWSE_RESULT with line data and actions (Premiere music zones)"

  - id: action_performed
    type: string
    description: "Response: ACTION_PERFORMED text"
```

## Variables
```yaml
variables:
  - id: cpdid
    type: string
    description: "Control Protocol Device ID (01-99). 01 = directly connected component."
    access: read_write

  - id: serial_number_device_id
    type: string
    description: "Serial number device identifier (# prefix, zero-padded 12 hex digits)."
    access: read_write

  - id: music_zone_id
    type: string
    description: "Optional music zone identifier appended to device ID (.xx format)."
    access: read_write

  - id: status_cue_period
    type: integer
    description: "Period in seconds between PLAY_STATUS/MUSIC_PLAY_STATUS updates. 0=off, 1=every second."
    access: read_write

  - id: cinemascape_mode
    type: integer
    description: "0=off, 1=2.35 Anamorphic, 2=2.35 Letterbox, 3=Native 2.35 Display."
    access: read_write

  - id: screen_mask_compensation
    type: integer
    description: "0=no masking compensation, 1=compensate for masking."
    access: read_write

  - id: protocol_settings
    type: composite
    description: "Delimiter type (PRINTABLE/BINARY) and character set (LATIN-1)."
    access: read_write

  - id: supported_protocol_version
    type: integer
    description: "Protocol version for current session (two-digit)."
    access: read_write
```

## Events
```yaml
events:
  - id: device_power_state_event
    description: "Unsolicited DEVICE_POWER_STATE when component power state changes."

  - id: player_restart_event
    description: "PLAYER_RESTART generated when component finishes powering up."

  - id: ui_state_event
    description: "Unsolicited UI_STATE when view changes."

  - id: highlighted_selection_event
    description: "Unsolicited HIGHLIGHTED_SELECTION when cursor moves."

  - id: play_status_event
    description: "Periodic PLAY_STATUS based on status_cue_period setting."

  - id: title_name_event
    description: "Unsolicited TITLE_NAME when playing title changes."

  - id: movie_location_event
    description: "Unsolicited MOVIE_LOCATION when playback location changes."

  - id: video_mode_event
    description: "Unsolicited VIDEO_MODE when output resolution changes."

  - id: video_color_event
    description: "Unsolicited VIDEO_COLOR when color parameters change."

  - id: screen_mask_event
    description: "Unsolicited SCREEN_MASK when aspect ratio masking changes."

  - id: cinemascape_mask_event
    description: "Unsolicited CINEMASCAPE_MASK when frame ratio changes."

  - id: cinemascape_mode_event
    description: "Unsolicited CINEMASCAPE_MODE when CinemaScape mode changes."

  - id: content_color_event
    description: "Unsolicited CONTENT_COLOR when content color parameters change (Strato/Alto)."

  - id: movie_media_type_event
    description: "Unsolicited MOVIE_MEDIA_TYPE when media type of playing content changes."

  - id: camera_angle_event
    description: "Unsolicited CAMERA_ANGLE when current camera angle changes."

  - id: scale_mode_event
    description: "Unsolicited SCALE_MODE when video scaling changes."

  - id: system_readiness_state_event
    description: "Unsolicited SYSTEM_READINESS_STATE when idle mode changes."

  - id: available_devices_event
    description: "Unsolicited AVAILABLE_DEVICES when system components change."

  - id: music_now_playing_status_event
    description: "Unsolicited MUSIC_NOW_PLAYING_STATUS when music list changes."

  - id: music_play_status_event
    description: "Periodic MUSIC_PLAY_STATUS based on status_cue_period."

  - id: music_title_event
    description: "Unsolicited MUSIC_TITLE when track changes."

  - id: user_defined_event
    description: "USER_DEFINED_EVENT from scripts, child UI activation, remote volume buttons, or SEND_EVENT command."

  - id: child_mode_state_event
    description: "Unsolicited CHILD_MODE_STATE when child mode toggles."
```

## Macros
```yaml
# UNRESOLVED: PLAY_SCRIPT references named scripts but script definitions not in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "BLURAY_SPECIAL_STOP can trap user depending on disc authoring; controller must provide mechanism to return to Kaleidescape menu."
  - description: "After LEAVE_STANDBY over TCP/IP on some models, connection drops; wait 15+ seconds before reconnecting."
  - description: "After ENTER_STANDBY on 1080p Player, 1080p Mini Player, Music Player, or Movie Player 2, TCP/IP connection temporarily drops."
  - description: "LEAVE_STANDBY on Movie Player (1st gen) can only be issued directly to the RS-232 port."
  - description: "Command routing cannot be used to leave standby on 1080p Player, 1080p Mini Player, Movie Player 2, Music Player, or Movie Player."
  - description: "Premiere Players used with Kaleidescape Co-Star are controlled by the connected Strato player and cannot be addressed directly."
  - description: "GET_CINEMASCAPE_MASK returns error code 028 'Incompatible video configuration' when issued outside CinemaScape mode."
  - description: "GET_PROTOCOL_VERSION is a legacy alias; use GET_PROTOCOL (returns same data inside a PROTOCOL message envelope)."
```

## Notes
- Message format: `device_id/seq/message_body[/checksum]` terminated by CR or LF. Max message size 1024 characters. Fields delimited by colons, segments by slashes.
- Kaleidescape components are RS-232 DTE devices. Use straight-through cable to another DTE, null-modem cable to a DCE device. Most AMX/Crestron DB-9 ports require null modem.
- CPDID 01 = directly connected component. CPDIDs 02-99 for command routing. Serial number format: `#XXXX` (zero-padded 12 hex digits; leading zeros may be omitted in commands).
- Sequence number: 0-9 for commands/responses, `!` for events, `?` when unknown.
- Checksum optional in commands (omitted on TCP due to built-in error handling), always present in responses/events. Modulo-100 sum of all preceding character decimal values, including the slash before the checksum segment.
- Protocol version 18 current. `SET_SUPPORTED_PROTOCOL` needed to enable features beyond v14 defaults.
- Binary delimiter mode (SOH/STX/EOT) available via `SET_PROTOCOL_SETTINGS` for faster parsing; TCP only, not supported over RS-232.
- Up to 20 simultaneous TCP/IP connections per component.
- After reconnect or restart, resend any persistent settings (e.g. `SET_SCREEN_MASK`, `SET_STATUS_CUE_PERIOD`).
- `GET_TIME` useful as keepalive/connection test (no side effects).
- Latin-1 (ISO 8859-1) character set. Escape sequences: `\n`, `\r`, `\t`, `\/`, `\\`, `\:`, `\dnnn`.
- Status code `000` = success; non-zero = error. Controller must inspect status before acting on response.
- Status codes documented in source: 000 Success, 001 Message too long, 002 Invalid character, 003 Checksum error, 004 Invalid device, 005 Device unavailable, 006 Invalid zone syntax, 007 Invalid zone, 010 Invalid request, 011 Invalid number of parameters, 012 Invalid parameter, 013 Device identifier conflict, 014 Invalid sequence number, 015 Unused, 016 Invalid passcode, 017 Invalid content handle, 028 Incompatible video configuration (e.g. CINEMASCAPE_MASK outside CinemaScape mode). Source page 198 lists additional codes beyond 018 but was truncated in the refined excerpt.
- Response times per source Table 4: 9600 baud = 3.2s, 19200 baud = 1.6s, 38400 baud = 0.8s, 57600 baud = 0.5s.
- Devices enumerated by `GET_DEVICE_TYPE_NAME`: Server, Cinema One, Strato, Strato V, Alto, Terra Movie Server, Player, Music Player, Disc Vault.
- `GET_CINEMASCAPE_MASK` frame_ratio values (hundredths): 133, 166, 178, 237, 240.
- `GET_VIDEO_COLOR`/`GET_CONTENT_COLOR` EOTF codes: 00 unknown, 01 SDR, 03 HDR10, 05 Dolby Vision standard (sink-led), 06 Dolby Vision low-latency (source-led). color_space: 00 default, 01 RGB, 02 BT.601, 03 BT.709, 04 BT.2020. color_depth: 24, 30, 36 bits. color_sampling: 00 none, 01 RGB, 02 YCbCr 4:2:2, 03 YCbCr 4:2:4, 04 YCbCr 4:2:0.
- `GET_VIDEO_MODE` enumerates resolutions from 720x480i59.94 (01) up to 3840x2160p50 (36); values 39-57 require `ACTIVE_PROTOCOL:18` or higher.
- `GET_PROTOCOL_VERSION` is a legacy alias for `GET_PROTOCOL` (still accepted, but `GET_PROTOCOL` preferred).
- BROWSE / PERFORM_ACTION / music preset / random / repeat commands apply to Premiere music zones only.

## Provenance

```yaml
source_domains:
  - kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/kaleidescape-system-control-protocol-reference-manual.pdf
  - https://www.kaleidescape.com/support/article/Control-Protocol-Reference-Manual
  - https://www.kaleidescape.com/wp-content/uploads/integrating-with-the-kaleidescape-mobile-app.pdf
  - https://www.kaleidescape.com/support/article/control-systems
retrieved_at: 2026-05-22T16:40:07.713Z
last_checked_at: 2026-07-21T23:03:06.238Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:03:06.238Z
matched_actions: 202
action_count: 202
confidence: medium
summary: "All 202 spec actions map literally to source command headers, params and transport values verified verbatim, and the source command catalogue is fully represented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges not stated"
- "exact model-specific command availability matrix not fully documented"
- "PLAY_SCRIPT references named scripts but script definitions not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
