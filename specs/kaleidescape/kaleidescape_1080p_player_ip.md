---
spec_id: admin/kaleidescape-1080p-player
schema_version: ai4av-public-spec-v1
revision: 2
title: "Kaleidescape, Inc. 1080p Player Control Spec"
manufacturer: Kaleidescape
model_family: "1080p Player"
aliases: []
compatible_with:
  manufacturers:
    - Kaleidescape
    - "Kaleidescape, Inc."
  models:
    - "1080p Player"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/kaleidescape-system-control-protocol-reference-manual.pdf
  - https://www.kaleidescape.com/wp-content/uploads/2019/07/Kaleidescape-Programming-Manual-for-Crestron.pdf
  - https://www.kaleidescape.com/support/article/Kaleidescape-Control-Commands
retrieved_at: 2026-05-21T02:49:59.969Z
last_checked_at: 2026-07-22T07:41:59.038Z
generated_at: 2026-07-22T07:41:59.038Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "binary command byte encodings not provided; only printable delimiter format documented (BINARY_DELIMITERS selectable but byte tables not enumerated here)"
  - "status codes beyond 028 not in refined excerpt (Appendix A page 198 was truncated)"
  - "populate from source if applicable, or remove section"
  - "no explicit multi-step sequences described as macros in source"
  - "voltage/current/power specifications not provided in source"
  - "firmware version compatibility ranges not stated in source"
  - "fault behavior and error recovery sequences not explicitly documented"
  - "binary command byte encodings not provided (only printable delimiter format documented)"
  - "full status-code table beyond 018/028 truncated in source excerpt (Appendix A page 198)"
verification:
  verdict: verified
  checked_at: 2026-07-22T07:41:59.038Z
  matched_actions: 203
  action_count: 203
  confidence: medium
  summary: "All 203 spec actions match literal Kaleidescape command tokens 1:1 in the source's per-command sections; transport (port 10000, 19200 baud 8N1) verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Kaleidescape, Inc. 1080p Player Control Spec

## Summary
Kaleidescape 1080p Player with TCP/IP and RS-232 control interfaces. TCP/IP on port 10000 (up to 20 simultaneous connections). RS-232 serial at 19200 baud default (players support up to 57600), 8 data bits, no parity, 1 stop bit, no flow control (hardware RTS/CTS optional). ASCII text-based control protocol with slash-delimited message segments (`device_id/seq/message_body[/checksum]`). Covers power, navigation, browsing, playback (movie and music), screen masking/CinemaScape, video mode/color, network settings, and system capability queries. No authentication required.

<!-- UNRESOLVED: binary command byte encodings not provided; only printable delimiter format documented (BINARY_DELIMITERS selectable but byte tables not enumerated here) -->
<!-- UNRESOLVED: status codes beyond 028 not in refined excerpt (Appendix A page 198 was truncated) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 10000
serial:
  baud_rate: 19200  # player default (Table 1); players support up to 57600, servers up to 115200
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
  - powerable     # inferred: ENTER_STANDBY / LEAVE_STANDBY / GET_DEVICE_POWER_STATE present
  - queryable     # inferred: GET_UI_STATE, GET_SYSTEM_VERSION, GET_DEVICE_TYPE_NAME, GET_NUM_ZONES, GET_PLAY_STATUS, GET_MUSIC_TITLE, GET_VIDEO_MODE, GET_NETWORK_SETTINGS, etc.
  - routable       # inferred: CPDID-based command routing described
```

## Actions
```yaml
# Connection / Power
- id: get_device_power_state
  label: Get Device Power State
  kind: action
  command: "GET_DEVICE_POWER_STATE:"
  params: []
- id: enter_standby
  label: Enter Standby
  kind: action
  command: "ENTER_STANDBY:"
  params: []
- id: leave_standby
  label: Leave Standby
  kind: action
  command: "LEAVE_STANDBY:"
  params: []

# System Info / Verification
- id: get_system_readiness_state
  label: Get System Readiness State
  kind: action
  command: "GET_SYSTEM_READINESS_STATE:"
  params: []
- id: leave_idle_mode
  label: Leave Idle Mode
  kind: action
  command: "LEAVE_IDLE_MODE:"
  params: []
- id: get_available_devices
  label: Get Available Devices
  kind: action
  command: "GET_AVAILABLE_DEVICES:"
  params: []
- id: get_available_devices_by_serial_number
  label: Get Available Devices by Serial Number
  kind: action
  command: "GET_AVAILABLE_DEVICES_BY_SERIAL_NUMBER:"
  params: []
- id: get_device_type_name
  label: Get Device Type Name
  kind: action
  command: "GET_DEVICE_TYPE_NAME:"
  params: []
- id: get_num_zones
  label: Get Number of Zones
  kind: action
  command: "GET_NUM_ZONES:"
  params: []
- id: get_system_version
  label: Get System Version
  kind: action
  command: "GET_SYSTEM_VERSION:"
  params: []
- id: get_protocol
  label: Get Protocol
  kind: action
  command: "GET_PROTOCOL:"
  params: []
- id: get_protocol_version
  label: Get Protocol Version
  kind: action
  command: "GET_PROTOCOL_VERSION:"
  params: []
  notes: "Deprecated; superseded by GET_PROTOCOL but still available. Returns only the version number without the PROTOCOL message wrapper."
- id: set_protocol_settings
  label: Set Protocol Settings
  kind: action
  command: "SET_PROTOCOL_SETTINGS:{delimiter_type}:{character_set}:"
  params:
    - name: delimiter_type
      type: enum
      description: "PRINTABLE_DELIMITERS or BINARY_DELIMITERS (binary not supported over RS-232)"
    - name: character_set
      type: enum
      description: LATIN-1
- id: set_supported_protocol
  label: Set Supported Protocol
  kind: action
  command: "SET_SUPPORTED_PROTOCOL:{version}:"
  params:
    - name: version
      type: integer
      description: Protocol version number (zero-padded two-digit)
- id: get_active_protocol
  label: Get Active Protocol
  kind: action
  command: "GET_ACTIVE_PROTOCOL:"
  params: []
- id: get_device_info
  label: Get Device Info
  kind: action
  command: "GET_DEVICE_INFO:"
  params: []
- id: send_to_syslog
  label: Send to Syslog
  kind: action
  command: "SEND_TO_SYSLOG:INFORMATION:{message}:"
  params:
    - name: level
      type: string
      description: Log level (e.g., INFORMATION)
    - name: message
      type: string
      description: Message to log
- id: get_friendly_name
  label: Get Friendly Name
  kind: action
  command: "GET_FRIENDLY_NAME:"
  params: []
- id: set_friendly_name
  label: Set Friendly Name
  kind: action
  command: "SET_FRIENDLY_NAME:{name}:"
  params:
    - name: name
      type: string
      description: Friendly name to assign
- id: get_friendly_system_name
  label: Get Friendly System Name
  kind: action
  command: "GET_FRIENDLY_SYSTEM_NAME:"
  params: []

# Event registration
- id: enable_events
  label: Enable Events
  kind: action
  command: "ENABLE_EVENTS:{target_device_id}:"
  params:
    - name: target_device_id
      type: string
      description: CPDID or serial number of target device
- id: disable_events
  label: Disable Events
  kind: action
  command: "DISABLE_EVENTS:{target_device_id}:"
  params:
    - name: target_device_id
      type: string
      description: CPDID or serial number of target device

# Navigation - bare arrow forms
- id: up
  label: Up
  kind: action
  command: "UP:"
  params: []
- id: down
  label: Down
  kind: action
  command: "DOWN:"
  params: []
- id: left
  label: Left
  kind: action
  command: "LEFT:"
  params: []
- id: right
  label: Right
  kind: action
  command: "RIGHT:"
  params: []
- id: child_up
  label: Child Up
  kind: action
  command: "CHILD_UP:"
  params: []
- id: child_down
  label: Child Down
  kind: action
  command: "CHILD_DOWN:"
  params: []
- id: child_left
  label: Child Left
  kind: action
  command: "CHILD_LEFT:"
  params: []
- id: child_right
  label: Child Right
  kind: action
  command: "CHILD_RIGHT:"
  params: []
- id: page_up
  label: Page Up
  kind: action
  command: "PAGE_UP:"
  params: []
- id: page_down
  label: Page Down
  kind: action
  command: "PAGE_DOWN:"
  params: []

# Navigation - press/release pairs
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

# Paging and skipping (each listed as distinct in source)
- id: page_down_or_next
  label: Page Down Or Next
  kind: action
  command: "PAGE_DOWN_OR_NEXT:"
  params: []
- id: page_down_or_next_press
  label: Page Down Or Next Press
  kind: action
  command: "PAGE_DOWN_OR_NEXT_PRESS:"
  params: []
- id: page_down_or_next_release
  label: Page Down Or Next Release
  kind: action
  command: "PAGE_DOWN_OR_NEXT_RELEASE:"
  params: []
- id: page_down_or_previous
  label: Page Down Or Previous
  kind: action
  command: "PAGE_DOWN_OR_PREVIOUS:"
  params: []
- id: page_down_or_previous_press
  label: Page Down Or Previous Press
  kind: action
  command: "PAGE_DOWN_OR_PREVIOUS_PRESS:"
  params: []
- id: page_down_or_previous_release
  label: Page Down Or Previous Release
  kind: action
  command: "PAGE_DOWN_OR_PREVIOUS_RELEASE:"
  params: []
- id: page_up_or_next
  label: Page Up Or Next
  kind: action
  command: "PAGE_UP_OR_NEXT:"
  params: []
- id: page_up_or_next_press
  label: Page Up Or Next Press
  kind: action
  command: "PAGE_UP_OR_NEXT_PRESS:"
  params: []
- id: page_up_or_next_release
  label: Page Up Or Next Release
  kind: action
  command: "PAGE_UP_OR_NEXT_RELEASE:"
  params: []
- id: page_up_or_previous
  label: Page Up Or Previous
  kind: action
  command: "PAGE_UP_OR_PREVIOUS:"
  params: []
- id: page_up_or_previous_press
  label: Page Up Or Previous Press
  kind: action
  command: "PAGE_UP_OR_PREVIOUS_PRESS:"
  params: []
- id: page_up_or_previous_release
  label: Page Up Or Previous Release
  kind: action
  command: "PAGE_UP_OR_PREVIOUS_RELEASE:"
  params: []

# Selection
- id: select
  label: Select
  kind: action
  command: "SELECT:"
  params: []
- id: back
  label: Back
  kind: action
  command: "BACK:"
  params: []
- id: position_select
  label: Position Select
  kind: action
  command: "POSITION_SELECT:{x_loc}:{y_loc}:"
  params:
    - name: x_loc
      type: integer
      description: X coordinate (0 to 2 billion)
    - name: y_loc
      type: integer
      description: Y coordinate (0 to 2 billion)
- id: child_select
  label: Child Select
  kind: action
  command: "CHILD_SELECT:"
  params: []

# Menu
- id: kaleidescape_menu_on
  label: Kaleidescape Menu On
  kind: action
  command: "KALEIDESCAPE_MENU_ON:"
  params: []
- id: kaleidescape_menu_off
  label: Kaleidescape Menu Off
  kind: action
  command: "KALEIDESCAPE_MENU_OFF:"
  params: []
- id: kaleidescape_menu_toggle
  label: Kaleidescape Menu Toggle
  kind: action
  command: "KALEIDESCAPE_MENU_TOGGLE:"
  params: []

# Views
- id: get_ui_state
  label: Get UI State
  kind: action
  command: "GET_UI_STATE:"
  params: []
- id: go_movies
  label: Go Movies
  kind: action
  command: "GO_MOVIES:"
  params: []
- id: go_movie_list
  label: Go Movie List
  kind: action
  command: "GO_MOVIE_LIST:"
  params: []
- id: go_movie_covers
  label: Go Movie Covers
  kind: action
  command: "GO_MOVIE_COVERS:"
  params: []
- id: go_movie_collections
  label: Go Movie Collections
  kind: action
  command: "GO_MOVIE_COLLECTIONS:"
  params: []
- id: go_movie_collection
  label: Go Movie Collection
  kind: action
  command: "GO_MOVIE_COLLECTION:{collection_name}:"
  params:
    - name: collection_name
      type: string
      description: Name of the collection
- id: go_music
  label: Go Music
  kind: action
  command: "GO_MUSIC:"
  params: []
- id: go_music_list
  label: Go Music List
  kind: action
  command: "GO_MUSIC_LIST:"
  params: []
- id: go_music_covers
  label: Go Music Covers
  kind: action
  command: "GO_MUSIC_COVERS:"
  params: []
- id: go_music_collections
  label: Go Music Collections
  kind: action
  command: "GO_MUSIC_COLLECTIONS:"
  params: []
- id: go_music_collection
  label: Go Music Collection
  kind: action
  command: "GO_MUSIC_COLLECTION:{collection_name}:"
  params:
    - name: collection_name
      type: string
      description: Name of the collection
- id: go_now_playing
  label: Go Now Playing
  kind: action
  command: "GO_NOW_PLAYING:"
  params: []
- id: go_movie_store
  label: Go Movie Store
  kind: action
  command: "GO_MOVIE_STORE:"
  params: []
- id: go_system_status
  label: Go System Status
  kind: action
  command: "GO_SYSTEM_STATUS:"
  params: []
- id: go_parental_control
  label: Go Parental Control
  kind: action
  command: "GO_PARENTAL_CONTROL:"
  params: []
- id: go_vault_summary
  label: Go Vault Summary
  kind: action
  command: "GO_VAULT_SUMMARY:"
  params: []

# User Input
- id: get_user_input
  label: Get User Input
  kind: action
  command: "GET_USER_INPUT:"
  params: []
- id: keyboard_character
  label: Keyboard Character
  kind: action
  command: "KEYBOARD_CHARACTER:{character}:"
  params:
    - name: character
      type: string
      description: Character to send (colon must be escaped as \:)
- id: keyboard_literal
  label: Keyboard Literal
  kind: action
  command: "KEYBOARD_LITERAL:{character}:"
  params:
    - name: character
      type: string
      description: ASCII character >=32 (colon/slash must be escaped)
- id: backspace
  label: Backspace
  kind: action
  command: "BACKSPACE:"
  params: []
- id: get_user_input_prompt
  label: Get User Input Prompt
  kind: action
  command: "GET_USER_INPUT_PROMPT:"
  params: []
- id: set_user_input_entry
  label: Set User Input Entry
  kind: action
  command: "SET_USER_INPUT_ENTRY:{string}:"
  params:
    - name: string
      type: string
      description: Input string
- id: filter_list
  label: Filter List
  kind: action
  command: "FILTER_LIST:"
  params: []
- id: go_search
  label: Go Search
  kind: action
  command: "GO_SEARCH:"
  params: []

# Screen Saver
- id: go_screen_saver
  label: Go Screen Saver
  kind: action
  command: "GO_SCREEN_SAVER:"
  params: []
- id: stop_screen_saver
  label: Stop Screen Saver
  kind: action
  command: "STOP_SCREEN_SAVER:"
  params: []

# Cover Art
- id: shuffle_cover_art
  label: Shuffle Cover Art
  kind: action
  command: "SHUFFLE_COVER_ART:"
  params: []
- id: child_shuffle_cover_art
  label: Child Shuffle Cover Art
  kind: action
  command: "CHILD_SHUFFLE_COVER_ART:"
  params: []
- id: alphabetize_cover_art
  label: Alphabetize Cover Art
  kind: action
  command: "ALPHABETIZE_COVER_ART:"
  params: []
- id: default_level
  label: Default Level
  kind: action
  command: "DEFAULT_LEVEL:"
  params: []
- id: safe_level
  label: Safe Level
  kind: action
  command: "SAFE_LEVEL:"
  params: []

# Page and content details
- id: details
  label: Details
  kind: action
  command: "DETAILS:"
  params: []
- id: disc_in_tray_toggle
  label: Disc In Tray Toggle
  kind: action
  command: "DISC_IN_TRAY_TOGGLE:"
  params: []
- id: get_content_details
  label: Get Content Details
  kind: action
  command: "GET_CONTENT_DETAILS:{handle}:{passcode}:"
  params:
    - name: handle
      type: string
      description: Content handle from HIGHLIGHTED_SELECTION, BROWSE_RESPONSE, or MUSIC_TITLE
    - name: passcode
      type: string
      description: Passcode to access content above current parental level
- id: get_highlighted_selection
  label: Get Highlighted Selection
  kind: action
  command: "GET_HIGHLIGHTED_SELECTION:"
  params: []

# Playback - movie
- id: play
  label: Play
  kind: action
  command: "PLAY:"
  params: []
- id: pause
  label: Pause
  kind: action
  command: "PAUSE:"
  params: []
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
  label: Play Or Pause
  kind: action
  command: "PLAY_OR_PAUSE:"
  params: []
- id: stop
  label: Stop
  kind: action
  command: "STOP:"
  params: []
- id: next
  label: Next
  kind: action
  command: "NEXT:"
  params: []
- id: previous
  label: Previous
  kind: action
  command: "PREVIOUS:"
  params: []
- id: scan_forward
  label: Scan Forward
  kind: action
  command: "SCAN_FORWARD:"
  params: []
- id: scan_reverse
  label: Scan Reverse
  kind: action
  command: "SCAN_REVERSE:"
  params: []
- id: replay
  label: Replay
  kind: action
  command: "REPLAY:"
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
  command: "CHILD_STOP:"
  params: []
- id: stop_or_cancel
  label: Stop Or Cancel
  kind: action
  command: "STOP_OR_CANCEL:"
  params: []
- id: disc_or_kaleidescape_menu
  label: Disc Or Kaleidescape Menu
  kind: action
  command: "DISC_OR_KALEIDESCAPE_MENU:"
  params: []
- id: disc_menu
  label: Disc Menu
  kind: action
  command: "DISC_MENU:"
  params: []
- id: disc_top_menu
  label: Disc Top Menu
  kind: action
  command: "DISC_TOP_MENU:"
  params: []
- id: disc_resume
  label: Disc Resume
  kind: action
  command: "DISC_RESUME:"
  params: []
- id: show_navigation_overlay
  label: Show Navigation Overlay
  kind: action
  command: "SHOW_NAVIGATION_OVERLAY:"
  params: []
- id: status_and_settings
  label: Status And Settings
  kind: action
  command: "STATUS_AND_SETTINGS:"
  params: []
- id: start_chapter_entry
  label: Start Chapter Entry
  kind: action
  command: "START_CHAPTER_ENTRY:"
  params: []
- id: start_disc_title_entry
  label: Start Disc Title Entry
  kind: action
  command: "START_DISC_TITLE_ENTRY:"
  params: []
- id: start_send_number_to_disc_entry
  label: Start Send Number To Disc Entry
  kind: action
  command: "START_SEND_NUMBER_TO_DISC_ENTRY:"
  params: []
- id: intermission_on
  label: Intermission On
  kind: action
  command: "INTERMISSION_ON:"
  params: []
- id: intermission_off
  label: Intermission Off
  kind: action
  command: "INTERMISSION_OFF:"
  params: []
- id: intermission_toggle
  label: Intermission Toggle
  kind: action
  command: "INTERMISSION_TOGGLE:"
  params: []
- id: set_favorite_scene_start
  label: Set Favorite Scene Start
  kind: action
  command: "SET_FAVORITE_SCENE_START:"
  params: []
- id: set_favorite_scene_end
  label: Set Favorite Scene End
  kind: action
  command: "SET_FAVORITE_SCENE_END:"
  params: []
- id: angle_next
  label: Angle Next
  kind: action
  command: "ANGLE_NEXT:"
  params: []
- id: angle_previous
  label: Angle Previous
  kind: action
  command: "ANGLE_PREVIOUS:"
  params: []
- id: audio_next
  label: Audio Next
  kind: action
  command: "AUDIO_NEXT:"
  params: []
- id: subtitles_next
  label: Subtitles Next
  kind: action
  command: "SUBTITLES_NEXT:"
  params: []
- id: get_camera_angle
  label: Get Camera Angle
  kind: action
  command: "GET_CAMERA_ANGLE:"
  params: []
- id: get_movie_media_type
  label: Get Movie Media Type
  kind: action
  command: "GET_MOVIE_MEDIA_TYPE:"
  params: []
- id: get_movie_location
  label: Get Movie Location
  kind: action
  command: "GET_MOVIE_LOCATION:"
  params: []
- id: get_play_status
  label: Get Play Status
  kind: action
  command: "GET_PLAY_STATUS:"
  params: []
- id: get_playing_title_name
  label: Get Playing Title Name
  kind: action
  command: "GET_PLAYING_TITLE_NAME:"
  params: []
- id: bluray_special_stop
  label: Blu-ray Special Stop
  kind: action
  command: "BLURAY_SPECIAL_STOP:"
  params: []
- id: bluray_popup_menu_toggle
  label: Blu-ray Popup Menu Toggle
  kind: action
  command: "BLURAY_POPUP_MENU_TOGGLE:"
  params: []
- id: play_script
  label: Play Script
  kind: action
  command: "PLAY_SCRIPT:{script_name}:"
  params:
    - name: script_name
      type: string
      description: Name of the Kaleidescape script to play

# Blu-ray color buttons (each press/release/bare listed as distinct in source)
- id: red_press
  label: Red Press
  kind: action
  command: "RED_PRESS:"
  params: []
- id: red_release
  label: Red Release
  kind: action
  command: "RED_RELEASE:"
  params: []
- id: red
  label: Red
  kind: action
  command: "RED:"
  params: []
- id: green_press
  label: Green Press
  kind: action
  command: "GREEN_PRESS:"
  params: []
- id: green_release
  label: Green Release
  kind: action
  command: "GREEN_RELEASE:"
  params: []
- id: green
  label: Green
  kind: action
  command: "GREEN:"
  params: []
- id: blue_press
  label: Blue Press
  kind: action
  command: "BLUE_PRESS:"
  params: []
- id: blue_release
  label: Blue Release
  kind: action
  command: "BLUE_RELEASE:"
  params: []
- id: blue
  label: Blue
  kind: action
  command: "BLUE:"
  params: []
- id: yellow_press
  label: Yellow Press
  kind: action
  command: "YELLOW_PRESS:"
  params: []
- id: yellow_release
  label: Yellow Release
  kind: action
  command: "YELLOW_RELEASE:"
  params: []
- id: yellow
  label: Yellow
  kind: action
  command: "YELLOW:"
  params: []

# Status cue
- id: set_status_cue_period
  label: Set Status Cue Period
  kind: action
  command: "SET_STATUS_CUE_PERIOD:{period}:"
  params:
    - name: period
      type: enum
      description: "0 = no location updates; 1 = update every second"

# Music playback (Premiere music zones)
- id: get_music_now_playing_status
  label: Get Music Now Playing Status
  kind: action
  command: "GET_MUSIC_NOW_PLAYING_STATUS:"
  params: []
- id: get_music_play_status
  label: Get Music Play Status
  kind: action
  command: "GET_MUSIC_PLAY_STATUS:"
  params: []
- id: get_music_title
  label: Get Music Title
  kind: action
  command: "GET_MUSIC_TITLE:"
  params: []
- id: get_playing_music_information
  label: Get Playing Music Information
  kind: action
  command: "GET_PLAYING_MUSIC_INFORMATION:"
  params: []
- id: music_random_on
  label: Music Random On
  kind: action
  command: "MUSIC_RANDOM_ON:"
  params: []
- id: music_random_off
  label: Music Random Off
  kind: action
  command: "MUSIC_RANDOM_OFF:"
  params: []
- id: music_random_toggle
  label: Music Random Toggle
  kind: action
  command: "MUSIC_RANDOM_TOGGLE:"
  params: []
- id: music_repeat_on
  label: Music Repeat On
  kind: action
  command: "MUSIC_REPEAT_ON:"
  params: []
- id: music_repeat_off
  label: Music Repeat Off
  kind: action
  command: "MUSIC_REPEAT_OFF:"
  params: []
- id: music_repeat_toggle
  label: Music Repeat Toggle
  kind: action
  command: "MUSIC_REPEAT_TOGGLE:"
  params: []
- id: play_first_in_music_collection
  label: Play First In Music Collection
  kind: action
  command: "PLAY_FIRST_IN_MUSIC_COLLECTION:{collection}:"
  params:
    - name: collection
      type: string
      description: Music collection name
- id: play_next_in_music_collection
  label: Play Next In Music Collection
  kind: action
  command: "PLAY_NEXT_IN_MUSIC_COLLECTION:{collection}:"
  params:
    - name: collection
      type: string
      description: Music collection name
- id: play_previous_in_music_collection
  label: Play Previous In Music Collection
  kind: action
  command: "PLAY_PREVIOUS_IN_MUSIC_COLLECTION:{collection}:"
  params:
    - name: collection
      type: string
      description: Music collection name
- id: assign_playing_music_to_preset
  label: Assign Playing Music To Preset
  kind: action
  command: "ASSIGN_PLAYING_MUSIC_TO_PRESET:{tag}:"
  params:
    - name: tag
      type: string
      description: Preset tag/name
- id: play_music_preset
  label: Play Music Preset
  kind: action
  command: "PLAY_MUSIC_PRESET:{tag}:"
  params:
    - name: tag
      type: string
      description: Preset tag/name to play
- id: get_music_preset_information
  label: Get Music Preset Information
  kind: action
  command: "GET_MUSIC_PRESET_INFORMATION:{tag}:"
  params:
    - name: tag
      type: string
      description: Preset tag/name

# Browse (Premiere music zones)
- id: browse
  label: Browse
  kind: action
  command: "BROWSE:{browse_handle}:{passcode}:{lines}:{flags}:"
  params:
    - name: browse_handle
      type: string
      description: Handle of the node being requested
    - name: passcode
      type: string
      description: Passcode for restricted content
    - name: lines
      type: string
      description: Line range to request (e.g. 1-5)
    - name: flags
      type: string
      description: "Modifiers: filter=\"searchstring\" and/or suggest"
- id: perform_action
  label: Perform Action
  kind: action
  command: "PERFORM_ACTION:{handle}:{passcode}:{action}:"
  params:
    - name: handle
      type: string
      description: Content handle for the item to act on
    - name: passcode
      type: string
      description: Passcode for restricted content
    - name: action
      type: string
      description: Action identifier (from BROWSE_RESULT action fields)

# Controlled zone
- id: get_controlled_zone
  label: Get Controlled Zone
  kind: action
  command: "GET_CONTROLLED_ZONE:"
  params: []
- id: set_controlled_zone
  label: Set Controlled Zone
  kind: action
  command: "SET_CONTROLLED_ZONE:#{sn}.{zn}:"
  params:
    - name: sn
      type: string
      description: Serial number of the component with the music zone
    - name: zn
      type: integer
      description: Music zone number (01-04)

# Child mode
- id: get_child_mode_state
  label: Get Child Mode State
  kind: action
  command: "GET_CHILD_MODE_STATE:"
  params: []
- id: enter_child_mode
  label: Enter Child Mode
  kind: action
  command: "ENTER_CHILD_MODE:"
  params: []
- id: leave_child_mode
  label: Leave Child Mode
  kind: action
  command: "LEAVE_CHILD_MODE:"
  params: []

# Screen masking / CinemaScape / scaling
- id: go_calibrate_masking
  label: Go Calibrate Masking
  kind: action
  command: "GO_CALIBRATE_MASKING:"
  params: []
- id: go_calibrate_masking_overscan
  label: Go Calibrate Masking Overscan
  kind: action
  command: "GO_CALIBRATE_MASKING_OVERSCAN:"
  params: []
- id: get_cinemascape_mask
  label: Get CinemaScape Mask
  kind: action
  command: "GET_CINEMASCAPE_MASK:"
  params: []
- id: get_screen_mask
  label: Get Screen Mask
  kind: action
  command: "GET_SCREEN_MASK:"
  params: []
- id: get_screen_mask2
  label: Get Screen Mask2
  kind: action
  command: "GET_SCREEN_MASK2:"
  params: []
- id: set_screen_mask
  label: Set Screen Mask
  kind: action
  command: "SET_SCREEN_MASK:{flag}:"
  params:
    - name: flag
      type: enum
      description: "0 = do not compensate for masking; 1 = compensate for masking"
- id: get_cinemascape_mode
  label: Get CinemaScape Mode
  kind: action
  command: "GET_CINEMASCAPE_MODE:"
  params: []
- id: set_cinemascape_mode
  label: Set CinemaScape Mode
  kind: action
  command: "SET_CINEMASCAPE_MODE:{mode}:"
  params:
    - name: mode
      type: enum
      description: "0=off, 1=2.35 Anamorphic, 2=2.35 Letterbox, 3=Native 2.35 Display"
- id: get_scale_mode
  label: Get Scale Mode
  kind: action
  command: "GET_SCALE_MODE:"
  params: []

# Video mode / color
- id: get_video_mode
  label: Get Video Mode
  kind: action
  command: "GET_VIDEO_MODE:"
  params: []
- id: get_video_color
  label: Get Video Color
  kind: action
  command: "GET_VIDEO_COLOR:"
  params: []
- id: get_content_color
  label: Get Content Color
  kind: action
  command: "GET_CONTENT_COLOR:"
  params: []

# Network / capabilities / time
- id: get_network_settings
  label: Get Network Settings
  kind: action
  command: "GET_NETWORK_SETTINGS:"
  params: []
- id: set_network_settings
  label: Set Network Settings
  kind: action
  command: "SET_NETWORK_SETTINGS:{static}:{ip_address}:{subnet}:{gateway}:{dns1}:{dns2}:"
  params:
    - name: static
      type: enum
      description: "0 = DHCP, 1 = static IP"
    - name: ip_address
      type: string
      description: Static IP address (ignored when DHCP)
    - name: subnet
      type: string
      description: Subnet mask (ignored when DHCP)
    - name: gateway
      type: string
      description: Default gateway (ignored when DHCP)
    - name: dns1
      type: string
      description: Primary DNS server (ignored when DHCP)
    - name: dns2
      type: string
      description: Secondary DNS server (ignored when DHCP)
- id: get_system_capabilities
  label: Get System Capabilities
  kind: action
  command: "GET_SYSTEM_CAPABILITIES:"
  params: []
- id: get_zone_capabilities
  label: Get Zone Capabilities
  kind: action
  command: "GET_ZONE_CAPABILITIES:"
  params: []
- id: get_time
  label: Get Time
  kind: action
  command: "GET_TIME:"
  params: []

# Custom events
- id: send_event
  label: Send Event
  kind: action
  command: "SEND_EVENT:{message}:"
  params:
    - name: message
      type: string
      description: Custom event message text to emit as USER_DEFINED_EVENT
```

## Feedbacks
```yaml
# Power state: 0=standby, 1=powered on
- id: device_power_state
  type: enum
  values:
    - "0"
    - "1"
  description: Device power state

# Zone availability: 0=disabled, 1=available
- id: zone_state
  type: enum
  values:
    - "0"
    - "1"
  description: Zone availability state

# System readiness: 0=ready, 1=becoming ready, 2=idle
- id: system_readiness_state
  type: enum
  values:
    - "0"
    - "1"
    - "2"
  description: System idle/ready state

# UI state fields: screen, popup, dialog, saver
- id: ui_state
  type: object
  fields:
    - name: screen
      type: integer
      description: "Active screen ID (00=Unknown,01=Movie List,02=Movie Collections,03=Movie Covers,04=Parental Control,07=Playing movie,08=System Status,09=Music List,10=Music Covers,11=Music Collections,12=Music Now Playing,14=Vault Summary,15=System Settings,16=Movie Store,18=Library search results)"
    - name: popup
      type: integer
      description: "Popup/menu ID (00=none,01=Details,02=Movie status overlay,03=Movie non-status overlay)"
    - name: dialog
      type: integer
      description: "Dialog box ID (00-10: none/Kaleidescape menu/passcode/question/info/warning/error/preplay/import_warranty/keyboard/IP config)"
    - name: saver
      type: integer
      description: "Screen saver active: 0=inactive, 1=active"

# Available devices list (CPDID format)
- id: available_devices
  type: array
  description: List of available CPDID numbers

# Available devices by serial number
- id: available_devices_by_serial_number
  type: array
  description: List of available device serial numbers (zero-padded 12 hex)

# Device type name
- id: device_type_name
  type: enum
  values: [Server, Cinema One, Strato, Strato V, Alto, Terra Movie Server, Player, Music Player, Disc Vault]
  description: Kaleidescape component type name

# Number of zones
- id: num_zones
  type: object
  fields:
    - name: num_movie_zones
      type: integer
      description: "01 if onscreen display present, 00 if not"
    - name: num_music_zones
      type: integer
      description: Number of music zones

# System version
- id: system_version
  type: object
  fields:
    - name: control_protocol_version
      type: string
      description: Zero-padded two-digit protocol version (source documents v18)
    - name: kos_version
      type: string
      description: kOS version string

# Active protocol version
- id: active_protocol
  type: string
  description: Currently active protocol version

# Device info
- id: device_info
  type: object
  fields:
    - name: device_type
      type: string
      description: Device type identifier (deprecated; use GET_NUM_ZONES / GET_DEVICE_TYPE_NAME)
    - name: serial_num
      type: string
      description: Serial number (zero-padded 16 hex)
    - name: cpdid
      type: string
      description: Assigned CPDID
    - name: ip_address
      type: string
      description: Network IP address

# Friendly name
- id: friendly_name
  type: string
  description: Zone or component friendly name

# Friendly system name
- id: friendly_system_name
  type: string
  description: System name the zone belongs to

# User input
- id: user_input
  type: object
  fields:
    - name: type
      type: string
      description: "Prompt type: 00=none, 01=alphanumeric, 02=numeric"
    - name: prompt
      type: string
      description: Query/prompt text
    - name: entry
      type: string
      description: User-entered text

# User input prompt details
- id: user_input_prompt
  type: object
  fields:
    - name: type
      type: string
    - name: icon
      type: string
    - name: prompt
      type: string
    - name: displayed
      type: string
      description: "0=not displayed, 1=displayed"
    - name: char_limit
      type: string
    - name: valid
      type: string
      description: "0=invalid, 1=valid"

# Highlighted selection
- id: highlighted_selection
  type: string
  description: Currently highlighted content identifier

# Child mode state
- id: child_mode_state
  type: enum
  values:
    - "0"
    - "1"
  description: "0=child UI inactive, 1=child UI active"

# Video mode event
- id: video_mode
  type: string
  description: Video mode parameters

# Video color event
- id: video_color
  type: string
  description: Video color parameters

# Music now playing status
- id: music_now_playing_status
  type: string
  description: Music playback status

# Title name event
- id: title_name
  type: string
  description: Currently playing title name

# Movie media type
- id: movie_media_type
  type: string
  description: Movie media type identifier

# Movie location
- id: movie_location
  type: string
  description: Movie location identifier

# System readiness state event
- id: system_readiness_state_event
  type: enum
  values:
    - "0"
    - "1"
    - "2"

# Player restart event
- id: player_restart
  type: null
  description: Component restart notification (no status code in event)

# User defined event
- id: user_defined_event
  type: string
  description: "Custom user-defined event name. Documented message values include: SELECT_KALEIDESCAPE_INPUT, VOLUME_DOWN_PRESS, VOLUME_UP_PRESS, VOLUME_DOWN_RELEASE, VOLUME_UP_RELEASE, TOGGLE_MUTE, VOLUME_QUERY, VOLUME_UP, VOLUME_DOWN (volume values emitted by Kaleidescape Remote / Apps, not standalone commands)."

# Movie play status (response to GET_PLAY_STATUS / event)
- id: play_status
  type: object
  fields:
    - name: mode
      type: enum
      description: "0=nothing playing, 1=paused, 2=playing, 4=forward scan, 6=reverse scan"
    - name: speed
      type: integer
      description: Scan speed (1-3); applies to mode 4 or 6
    - name: title_num
      type: string
      description: Zero-padded two-digit current title number
    - name: title_length
      type: integer
      description: Total title length in seconds
    - name: title_loc
      type: integer
      description: Current position within title in seconds
    - name: chap_num
      type: string
      description: Zero-padded three-digit current chapter number
    - name: chap_length
      type: integer
      description: Total chapter length in seconds
    - name: chap_loc
      type: integer
      description: Current position within chapter in seconds

# Title name (response to GET_PLAYING_TITLE_NAME)
- id: title_name_response
  type: string
  description: Title of the movie currently playing

# Music play status
- id: music_play_status
  type: object
  fields:
    - name: mode
      type: enum
      description: "1=paused, 2=normal play, 4=fast forward, 6=fast reverse"
    - name: speed
      type: integer
      description: "FF/REV speed; normally 0"
    - name: length
      type: integer
      description: Length of current track in seconds
    - name: position
      type: string
      description: Position within track in seconds, prepended with + or -
    - name: progress
      type: string
      description: Percentage through track (000.00 to 100.00)

# Music title (response to GET_MUSIC_TITLE)
- id: music_title
  type: object
  fields:
    - name: track
      type: string
    - name: artist
      type: string
    - name: album
      type: string
    - name: track_handle
      type: string
    - name: album_handle
      type: string
    - name: now_playing_handle
      type: string

# Playing music information
- id: playing_music_information
  type: object
  fields:
    - name: handle
      type: string
    - name: label
      type: string

# Music preset information
- id: music_preset_information
  type: object
  fields:
    - name: tag
      type: string
    - name: handle
      type: string
    - name: label
      type: string

# Movie media type
- id: movie_media_type_response
  type: enum
  values: ["00", "01", "02", "03"]
  description: "00=none, 01=DVD, 02=Video stream, 03=Blu-ray Disc"

# Movie location
- id: movie_location_response
  type: enum
  values: ["00", "03", "04", "05", "06"]
  description: "00=interface/unknown, 03=main content, 04=intermission, 05=end credits, 06=disc menu"

# Camera angle
- id: camera_angle
  type: object
  fields:
    - name: cur_angle
      type: integer
      description: Currently active angle (1-9)
    - name: num_angles
      type: integer
      description: Number of angles available (1-9)
    - name: in_angle_block
      type: enum
      values: ["0", "1"]
      description: "0=no extra angles, 1=multiple angles available"

# Status cue period
- id: status_cue_period
  type: integer
  description: Seconds between PLAY_STATUS / MUSIC_PLAY_STATUS updates

# Controlled zone
- id: controlled_zone
  type: string
  description: "#serial.zone of the controlled music zone"

# CinemaScape mask
- id: cinemascape_mask
  type: enum
  values: ["133", "166", "178", "237", "240"]
  description: Frame ratio in hundredths (CinemaScape mode only)

# CinemaScape mode
- id: cinemascape_mode
  type: enum
  values: ["0", "1", "2", "3"]
  description: "0=off, 1=2.35 Anamorphic, 2=2.35 Letterbox, 3=Native 2.35"

# Scale mode
- id: scale_mode
  type: enum
  values: ["0", "1", "2", "3"]
  description: "0=no scaling, 1=anamorphic, 2=reserved, 3=zoom"

# Screen mask
- id: screen_mask
  type: object
  fields:
    - name: image_ratio
      type: enum
      values: ["00", "01", "02", "03", "04", "05"]
      description: "00=none,01=1.33,02=1.66,03=1.78,04=1.85,05=2.35"
    - name: top_trim_rel
      type: string
    - name: bottom_trim_rel
      type: string
    - name: conservative_ratio
      type: string
    - name: top_mask_abs
      type: string
      description: Zero-padded four-digit, tenths of a percent of screen height
    - name: bottom_mask_abs
      type: string

# Screen mask2
- id: screen_mask2
  type: object
  fields:
    - name: top_mask_abs
      type: string
    - name: bottom_mask_abs
      type: string
    - name: top_calibrated
      type: string
    - name: bottom_calibrated
      type: string

# Video mode
- id: video_mode_response
  type: object
  fields:
    - name: composite
      type: string
      description: Composite/S-Video mode code (00-57)
    - name: component
      type: string
      description: Component analog mode code (00-57)
    - name: HDMI
      type: string
      description: HDMI mode code (00-57)

# Video color
- id: video_color_response
  type: object
  fields:
    - name: EOTF
      type: enum
      description: "00=unknown,01=SDR,03=HDR10,05=Dolby Vision std,06=DV low-latency"
    - name: color_space
      type: enum
      description: "00=default,01=RGB,02=BT.601,03=BT.709,04=BT.2020"
    - name: color_depth
      type: enum
      values: ["24", "30", "36"]
    - name: color_sampling
      type: enum
      description: "00=NONE,01=RGB,02=4:2:2,03=4:4:4,04=4:2:0"

# Content color
- id: content_color
  type: object
  fields:
    - name: EOTF
      type: enum
    - name: color_space
      type: enum
    - name: color_depth
      type: enum
    - name: color_sampling
      type: enum

# Network settings
- id: network_settings
  type: object
  fields:
    - name: static
      type: enum
      values: ["0", "1"]
      description: "0=DHCP, 1=static"
    - name: ip_address
      type: string
    - name: subnet_mask
      type: string
    - name: gateway
      type: string
    - name: dns1
      type: string
    - name: dns2
      type: string

# System capabilities
- id: system_capabilities
  type: object
  fields:
    - name: movies
      type: enum
      values: ["Y", "N"]
    - name: music
      type: enum
      values: ["Y", "N"]
    - name: product_line
      type: enum
      values: ["Y", "N"]
      description: "Y=Premiere, N=Strato"

# Zone capabilities
- id: zone_capabilities
  type: object
  fields:
    - name: osd
      type: enum
      values: ["Y", "N"]
    - name: movies
      type: enum
      values: ["Y", "N"]
    - name: music
      type: enum
      values: ["Y", "N"]
    - name: store
      type: enum
      values: ["Y", "N"]
    - name: search
      type: enum
      values: ["Y", "N"]
    - name: library_type
      type: enum
      values: ["Y", "N"]
    - name: osd_generation
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=none,01=OSDv1,02=OSDv2 classic,03=OSDv2 row"

# Time
- id: time
  type: object
  fields:
    - name: yyyy
      type: string
    - name: mm
      type: string
    - name: dd
      type: string
    - name: hh
      type: string
    - name: min
      type: string
    - name: ss
      type: string
    - name: timezone
      type: string

# Content details (multi-line response)
- id: content_details
  type: array
  description: Lines of CONTENT_DETAILS name/value pairs (TITLE:GET_CONTENT_DETAILS)

# Browse results
- id: browse_results
  type: array
  description: BROWSE_RESULT rows from a BROWSE command

# Action performed (PERFORM_ACTION response)
- id: action_performed
  type: string
  description: Result text from PERFORM_ACTION

# Response status code (every response/event begins with zero-padded 3-digit code)
- id: status_code
  type: enum
  values:
    - "000"
    - "001"
    - "002"
    - "003"
    - "004"
    - "005"
    - "006"
    - "007"
    - "010"
    - "011"
    - "012"
    - "013"
    - "014"
    - "015"
    - "016"
    - "017"
    - "018"
    - "028"
  description: "000=Success,001=Message too long,002=Invalid character,003=Checksum error,004=Invalid device,005=Device unavailable,006=Invalid zone syntax,007=Invalid zone,010=Invalid request,011=Invalid number of parameters,012=Invalid parameter,013=Device identifier conflict,014=Invalid sequence number,015=Unused,016=Invalid passcode,017=Invalid content handle,018=(see Appendix A),028=Incompatible video configuration"
```

## Variables
```yaml
# No settable parameters that are discrete variables (all settable params are actions)
# UNRESOLVED: populate from source if applicable, or remove section
```

## Events
```yaml
# Unsolicited notifications
- id: device_power_state_event
  description: Generated when power state changes
- id: player_restart
  description: Generated after component powers up or receives LEAVE_STANDBY
- id: ui_state_event
  description: Generated when UI state changes
- id: highlighted_selection_event
  description: Generated when highlighted selection changes
- id: child_mode_state_event
  description: Generated when child mode state changes
- id: video_mode_event
  description: Generated when video mode changes
- id: video_color_event
  description: Generated when video color changes
- id: music_now_playing_status_event
  description: Generated when music playback status changes
- id: title_name_event
  description: Generated when title name changes
- id: movie_media_type_event
  description: Generated when movie media type changes
- id: movie_location_event
  description: Generated when movie location changes
- id: system_readiness_state_event
  description: Generated when idle mode changes
- id: available_devices_event
  description: Generated when available components list changes
- id: user_defined_event
  description: Custom events from the system (script steps, child UI activation, remote volume buttons, app volume capabilities, SEND_EVENT)
- id: user_input_event
  description: Generated during user input interaction
- id: user_input_prompt_event
  description: Generated when input prompt changes
- id: play_status_event
  description: Generated during playback as title/chapter locations change (rate set by SET_STATUS_CUE_PERIOD)
- id: music_play_status_event
  description: Generated during music playback as position/progress change
- id: music_title_event
  description: Generated when the playing music track changes
- id: playing_music_information_event
  description: Generated when playing music handle/label changes
- id: music_preset_information_event
  description: Generated when a music preset is assigned
- id: screen_mask_event
  description: Generated when screen mask values change; can indicate a component restart
- id: screen_mask2_event
  description: Generated in response to GET_SCREEN_MASK2 / when mask2 values change (Response/Event per source)
- id: cinemascape_mask_event
  description: Generated when the CinemaScape frame ratio changes (CinemaScape mode only)
- id: cinemascape_mode_event
  description: Generated when CinemaScape mode changes (Response/Event per GET_CINEMASCAPE_MODE / SET_CINEMASCAPE_MODE)
- id: scale_mode_event
  description: Generated when scale mode changes (Response/Event per GET_SCALE_MODE)
- id: content_color_event
  description: Generated when content color changes (Response/Event per GET_CONTENT_COLOR)
- id: action_performed_event
  description: Generated in response to PERFORM_ACTION
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described as macros in source
```

## Safety
```yaml
confirmation_required_for:
  - bluray_special_stop
interlocks:
  - description: "1080p Player drops TCP/IP connection on enter/leave standby; reconnect and wait 15s before sending commands (source: LEAVE_STANDBY / ENTER_STANDBY docs)"
  - description: "On LEAVE_STANDBY, if DEVICE_POWER_STATE event does not appear within 1s, drop connection, wait >=30s, then reconnect; component may take several minutes to reboot"
  - description: "BLURAY_SPECIAL_STOP can trap the user on non-Kaleidescape disc menus depending on disc authoring; controller must provide another mechanism to return to the Kaleidescape menu or a movie view"
# Safety warning verbatim from source (BLURAY_SPECIAL_STOP):
# "CAUTION: USING THIS COMMAND CAN TRAP THE USER. Depending on how the disc was authored,
#  this command does not always return the user to a Kaleidescape movie view."
```

## Notes
TCP/IP connection uses port 10000 (up to 20 simultaneous connections). RS-232 uses 19200 baud default for players (players support up to 57600, servers up to 115200); supports optional hardware RTS/CTS flow control but not software flow control. Message format: `device_id/seq/message_body[/checksum]`. Checksum is optional for commands, required for responses/events; not applicable over TCP/IP. Sequence number 0-9 for commands/responses, `!` for events, `#` followed by serial (leading zeros optional). Music zone suffix: `.xx` appended to CPDID. Binary delimiters (SOH/STX/EOT) not supported over RS-232. `GET_TIME` command can test if TCP/IP connection is still active (no side effects). Component may take several minutes to reboot after power on. Characters must be printable Latin-1 (decimal 32-255); colon, slash, and backslash must be backslash-escaped in data fields. The full status-code table is in Appendix A (page 198); refined excerpt covers codes 000-018 and 028, remainder UNRESOLVED.

Volume-related USER_DEFINED_EVENT message names (`VOLUME_UP_PRESS`, `VOLUME_DOWN_PRESS`, `VOLUME_UP_RELEASE`, `VOLUME_DOWN_RELEASE`, `TOGGLE_MUTE`, `VOLUME_QUERY`, `VOLUME_UP`, `VOLUME_DOWN`) are emitted by the system via USER_DEFINED_EVENT when a Kaleidescape Remote or App volume control is used; they are not documented as standalone command rows in the source.

<!-- UNRESOLVED: voltage/current/power specifications not provided in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not explicitly documented -->
<!-- UNRESOLVED: binary command byte encodings not provided (only printable delimiter format documented) -->
<!-- UNRESOLVED: full status-code table beyond 018/028 truncated in source excerpt (Appendix A page 198) -->

## Provenance

```yaml
source_domains:
  - kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/kaleidescape-system-control-protocol-reference-manual.pdf
  - https://www.kaleidescape.com/wp-content/uploads/2019/07/Kaleidescape-Programming-Manual-for-Crestron.pdf
  - https://www.kaleidescape.com/support/article/Kaleidescape-Control-Commands
retrieved_at: 2026-05-21T02:49:59.969Z
last_checked_at: 2026-07-22T07:41:59.038Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:41:59.038Z
matched_actions: 203
action_count: 203
confidence: medium
summary: "All 203 spec actions match literal Kaleidescape command tokens 1:1 in the source's per-command sections; transport (port 10000, 19200 baud 8N1) verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "binary command byte encodings not provided; only printable delimiter format documented (BINARY_DELIMITERS selectable but byte tables not enumerated here)"
- "status codes beyond 028 not in refined excerpt (Appendix A page 198 was truncated)"
- "populate from source if applicable, or remove section"
- "no explicit multi-step sequences described as macros in source"
- "voltage/current/power specifications not provided in source"
- "firmware version compatibility ranges not stated in source"
- "fault behavior and error recovery sequences not explicitly documented"
- "binary command byte encodings not provided (only printable delimiter format documented)"
- "full status-code table beyond 018/028 truncated in source excerpt (Appendix A page 198)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
