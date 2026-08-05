---
spec_id: admin/kaleidescape-inc-m300-player
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kaleidescape, Inc. M300 Player Control Spec"
manufacturer: Kaleidescape
model_family: "M300 Player"
aliases: []
compatible_with:
  manufacturers:
    - Kaleidescape
    - "Kaleidescape, Inc."
  models:
    - "M300 Player"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kaleidescape.com
  - support.kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/kaleidescape-system-control-protocol-reference-manual.pdf
  - https://support.kaleidescape.com/support/article/Control-Protocol-Reference-Manual
  - https://www.kaleidescape.com/support/article/Kaleidescape-Control-Commands
  - https://www.kaleidescape.com/wp-content/uploads/2019/07/Kaleidescape-Programming-Manual-for-Crestron.pdf
retrieved_at: 2026-05-21T19:58:25.112Z
last_checked_at: 2026-07-22T01:02:03.562Z
generated_at: 2026-07-22T01:02:03.562Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - GET_PROTOCOL_VERSION
  - "M300-specific firmware compatibility not stated; source applies to entire Premiere/Strato line."
  - "source says \"None (default) or RTS/CTS\" - rts_cts listed as optional"
  - "section intentionally omitted - the Kaleidescape protocol is command/response based;"
  - "section intentionally omitted - Kaleidescape control protocol defines no built-in"
  - "source contains only the BLURAY_SPECIAL_STOP caution; no other interlock procedures"
  - "M300-specific firmware compatibility not stated (source covers the full Premiere/Strato line at kOS 10.18 / 8.13). Voltage, current, and power specifications not stated. M300-specific RS-232 baud rate not stated — used the Premiere-player default of 19200."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:02:03.562Z
  matched_actions: 202
  action_count: 202
  confidence: medium
  summary: "All 202 spec actions are literal wire-token matches with correct shapes/params against the source command reference, and transport values (port 10000, 19200/8/N/1) are verbatim-supported. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Kaleidescape, Inc. M300 Player Control Spec

## Summary
The Kaleidescape M300 Player is a Premiere-line movie player controlled via TCP/IP on port 10000 or RS-232 serial. This spec covers the Kaleidescape System control protocol (July 2024 revision, protocol version 18) as it applies to the M300, including connection setup, navigation/playback commands, zone management, music controls, masking, video mode queries, and networking. M300 supports LEAVE_STANDBY over both RS-232 and TCP/IP without disconnecting the TCP session, and supports event registration via CPDID 01.

<!-- UNRESOLVED: M300-specific firmware compatibility not stated; source applies to entire Premiere/Strato line. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 10000
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: rts_cts  # UNRESOLVED: source says "None (default) or RTS/CTS" - rts_cts listed as optional
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from ENTER_STANDBY/LEAVE_STANDBY examples
- routable  # inferred from command routing via CPDID and serial number device identifiers
- queryable  # inferred from GET_* status/state query commands
- levelable  # inferred from DEFAULT_LEVEL/SAFE_LEVEL parental control level commands
```

## Actions
```yaml
# Power & standby
- id: get_device_power_state
  label: Get Device Power State
  kind: query
  command: "GET_DEVICE_POWER_STATE:"
  params: []
- id: leave_standby
  label: Leave Standby
  kind: action
  command: "LEAVE_STANDBY:"
  params: []
- id: enter_standby
  label: Enter Standby
  kind: action
  command: "ENTER_STANDBY:"
  params: []
# Idle mode (Strato/Cinema One gen2 only - included for completeness)
- id: get_system_readiness_state
  label: Get System Readiness State
  kind: query
  command: "GET_SYSTEM_READINESS_STATE:"
  params: []
- id: leave_idle_mode
  label: Leave Idle Mode
  kind: action
  command: "LEAVE_IDLE_MODE:"
  params: []
# Verification / discovery
- id: get_system_version
  label: Get System Version
  kind: query
  command: "GET_SYSTEM_VERSION:"
  params: []
- id: get_num_zones
  label: Get Num Zones
  kind: query
  command: "GET_NUM_ZONES:"
  params: []
- id: get_device_type_name
  label: Get Device Type Name
  kind: query
  command: "GET_DEVICE_TYPE_NAME:"
  params: []
- id: get_time
  label: Get Time
  kind: query
  command: "GET_TIME:"
  params: []
- id: get_available_devices
  label: Get Available Devices
  kind: query
  command: "GET_AVAILABLE_DEVICES:"
  params: []
- id: get_available_devices_by_serial_number
  label: Get Available Devices By Serial Number
  kind: query
  command: "GET_AVAILABLE_DEVICES_BY_SERIAL_NUMBER:"
  params: []
# Protocol
- id: get_protocol
  label: Get Protocol
  kind: query
  command: "GET_PROTOCOL:"
  params: []
- id: set_protocol_settings
  label: Set Protocol Settings
  kind: action
  command: "SET_PROTOCOL_SETTINGS:{delimiter_type}:{character_set}:"
  params:
    - name: delimiter_type
      type: string
      description: PRINTABLE_DELIMITERS or BINARY_DELIMITERS
    - name: character_set
      type: string
      description: LATIN-1
- id: set_supported_protocol
  label: Set Supported Protocol
  kind: action
  command: "SET_SUPPORTED_PROTOCOL:{version}:"
  params:
    - name: version
      type: integer
      description: Protocol version (e.g. 18)
- id: get_active_protocol
  label: Get Active Protocol
  kind: query
  command: "GET_ACTIVE_PROTOCOL:"
  params: []
# Event registration
- id: enable_events
  label: Enable Events
  kind: action
  command: "ENABLE_EVENTS:{target_device_id}:"
  params:
    - name: target_device_id
      type: string
      description: CPDID (e.g. 09) or serial number (e.g. #144B) or zone (e.g. 35.01)
- id: disable_events
  label: Disable Events
  kind: action
  command: "DISABLE_EVENTS:{target_device_id}:"
  params:
    - name: target_device_id
      type: string
      description: CPDID or serial number
- id: get_device_info
  label: Get Device Info
  kind: query
  command: "GET_DEVICE_INFO:"
  params: []
- id: send_to_syslog
  label: Send To Syslog
  kind: action
  command: "SEND_TO_SYSLOG:INFORMATION:{message}:"
  params:
    - name: message
      type: string
      description: Free-form string logged by the Kaleidescape System
# Friendly name
- id: get_friendly_name
  label: Get Friendly Name
  kind: query
  command: "GET_FRIENDLY_NAME:"
  params: []
- id: set_friendly_name
  label: Set Friendly Name
  kind: action
  command: "SET_FRIENDLY_NAME:{name}:"
  params:
    - name: name
      type: string
- id: get_friendly_system_name
  label: Get Friendly System Name
  kind: query
  command: "GET_FRIENDLY_SYSTEM_NAME:"
  params: []
# Arrow / page nav (each direction has PRESS, RELEASE, and combined)
- id: up
  label: Up
  kind: action
  command: "UP:"
  params: []
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
- id: down
  label: Down
  kind: action
  command: "DOWN:"
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
- id: left
  label: Left
  kind: action
  command: "LEFT:"
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
- id: right
  label: Right
  kind: action
  command: "RIGHT:"
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
- id: child_up
  label: Child Up
  kind: action
  command: "CHILD_UP:"
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
- id: page_up
  label: Page Up
  kind: action
  command: "PAGE_UP:"
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
- id: page_down
  label: Page Down
  kind: action
  command: "PAGE_DOWN:"
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
# Selection / position
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
    - name: y_loc
      type: integer
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
- id: disc_or_kaleidescape_menu
  label: Disc or Kaleidescape Menu
  kind: action
  command: "DISC_OR_KALEIDESCAPE_MENU:"
  params: []
# View navigation
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
- id: go_search
  label: Go Search
  kind: action
  command: "GO_SEARCH:"
  params: []
- id: disc_in_tray_toggle
  label: Disc In Tray Toggle
  kind: action
  command: "DISC_IN_TRAY_TOGGLE:"
  params: []
# UI state / user input
- id: get_ui_state
  label: Get UI State
  kind: query
  command: "GET_UI_STATE:"
  params: []
- id: get_user_input
  label: Get User Input
  kind: query
  command: "GET_USER_INPUT:"
  params: []
- id: get_user_input_prompt
  label: Get User Input Prompt
  kind: query
  command: "GET_USER_INPUT_PROMPT:"
  params: []
- id: set_user_input_entry
  label: Set User Input Entry
  kind: action
  command: "SET_USER_INPUT_ENTRY:{string}:"
  params:
    - name: string
      type: string
- id: keyboard_character
  label: Keyboard Character
  kind: action
  command: "KEYBOARD_CHARACTER:{character}:"
  params:
    - name: character
      type: string
      description: Single character; colon must be escaped as \:
- id: keyboard_literal
  label: Keyboard Literal
  kind: action
  command: "KEYBOARD_LITERAL:{character}:"
  params:
    - name: character
      type: string
      description: ASCII character >=32; colon/slash must be escaped
- id: backspace
  label: Backspace
  kind: action
  command: "BACKSPACE:"
  params: []
- id: filter_list
  label: Filter List
  kind: action
  command: "FILTER_LIST:"
  params: []
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
  label: Default Level (Parental)
  kind: action
  command: "DEFAULT_LEVEL:"
  params: []
- id: safe_level
  label: Safe Level (Parental)
  kind: action
  command: "SAFE_LEVEL:"
  params: []
# Content details
- id: details
  label: Details
  kind: action
  command: "DETAILS:"
  params: []
- id: get_content_details
  label: Get Content Details
  kind: query
  command: "GET_CONTENT_DETAILS:{handle}:{passcode}:"
  params:
    - name: handle
      type: string
    - name: passcode
      type: string
- id: get_highlighted_selection
  label: Get Highlighted Selection
  kind: query
  command: "GET_HIGHLIGHTED_SELECTION:"
  params: []
# Screen saver
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
# Playback transport
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
  label: Play or Pause
  kind: action
  command: "PLAY_OR_PAUSE:"
  params: []
- id: stop
  label: Stop
  kind: action
  command: "STOP:"
  params: []
- id: stop_or_cancel
  label: Stop or Cancel
  kind: action
  command: "STOP_OR_CANCEL:"
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
- id: set_status_cue_period
  label: Set Status Cue Period
  kind: action
  command: "SET_STATUS_CUE_PERIOD:{period}:"
  params:
    - name: period
      type: integer
      description: 0=off, 1=every second
- id: get_play_status
  label: Get Play Status
  kind: query
  command: "GET_PLAY_STATUS:"
  params: []
- id: get_playing_title_name
  label: Get Playing Title Name
  kind: query
  command: "GET_PLAYING_TITLE_NAME:"
  params: []
# Music zone
- id: get_music_now_playing_status
  label: Get Music Now Playing Status
  kind: query
  command: "GET_MUSIC_NOW_PLAYING_STATUS:"
  params: []
- id: get_music_play_status
  label: Get Music Play Status
  kind: query
  command: "GET_MUSIC_PLAY_STATUS:"
  params: []
- id: get_music_title
  label: Get Music Title
  kind: query
  command: "GET_MUSIC_TITLE:"
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
- id: get_controlled_zone
  label: Get Controlled Zone
  kind: query
  command: "GET_CONTROLLED_ZONE:"
  params: []
- id: set_controlled_zone
  label: Set Controlled Zone
  kind: action
  command: "SET_CONTROLLED_ZONE:#{sn}.{zn}:"
  params:
    - name: sn
      type: string
      description: Component serial number (hex)
    - name: zn
      type: string
      description: Music zone 01-04
- id: browse
  label: Browse (music)
  kind: query
  command: "BROWSE:{browse_handle}:{passcode}:{lines}:{flags}:"
  params:
    - name: browse_handle
      type: string
    - name: passcode
      type: string
    - name: lines
      type: string
      description: e.g. 1-10
    - name: flags
      type: string
      description: e.g. filter="searchstring" or suggest
- id: perform_action
  label: Perform Action
  kind: action
  command: "PERFORM_ACTION:{handle}:{passcode}:{action}:"
  params:
    - name: handle
      type: string
    - name: passcode
      type: string
    - name: action
      type: string
- id: play_first_in_music_collection
  label: Play First In Music Collection
  kind: action
  command: "PLAY_FIRST_IN_MUSIC_COLLECTION:{collection}:"
  params:
    - name: collection
      type: string
- id: play_next_in_music_collection
  label: Play Next In Music Collection
  kind: action
  command: "PLAY_NEXT_IN_MUSIC_COLLECTION:{collection}:"
  params:
    - name: collection
      type: string
- id: play_previous_in_music_collection
  label: Play Previous In Music Collection
  kind: action
  command: "PLAY_PREVIOUS_IN_MUSIC_COLLECTION:{collection}:"
  params:
    - name: collection
      type: string
- id: assign_playing_music_to_preset
  label: Assign Playing Music To Preset
  kind: action
  command: "ASSIGN_PLAYING_MUSIC_TO_PRESET:{tag}:"
  params:
    - name: tag
      type: string
- id: play_music_preset
  label: Play Music Preset
  kind: action
  command: "PLAY_MUSIC_PRESET:{tag}:"
  params:
    - name: tag
      type: string
- id: get_music_preset_information
  label: Get Music Preset Information
  kind: query
  command: "GET_MUSIC_PRESET_INFORMATION:{tag}:"
  params:
    - name: tag
      type: string
- id: get_playing_music_information
  label: Get Playing Music Information
  kind: query
  command: "GET_PLAYING_MUSIC_INFORMATION:"
  params: []
# Disc / BD controls
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
- id: start_send_number_to_disc_entry
  label: Start Send Number To Disc Entry
  kind: action
  command: "START_SEND_NUMBER_TO_DISC_ENTRY:"
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
  kind: query
  command: "GET_CAMERA_ANGLE:"
  params: []
- id: red
  label: Red (BD color button)
  kind: action
  command: "RED:"
  params: []
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
- id: green
  label: Green (BD color button)
  kind: action
  command: "GREEN:"
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
- id: blue
  label: Blue (BD color button)
  kind: action
  command: "BLUE:"
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
- id: yellow
  label: Yellow (BD color button)
  kind: action
  command: "YELLOW:"
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
- id: get_movie_media_type
  label: Get Movie Media Type
  kind: query
  command: "GET_MOVIE_MEDIA_TYPE:"
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
# Paging / skipping (PRESS/RELEASE variants enumerated)
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
# Masking / video mode
- id: get_movie_location
  label: Get Movie Location
  kind: query
  command: "GET_MOVIE_LOCATION:"
  params: []
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
  kind: query
  command: "GET_CINEMASCAPE_MASK:"
  params: []
- id: get_screen_mask
  label: Get Screen Mask
  kind: query
  command: "GET_SCREEN_MASK:"
  params: []
- id: get_screen_mask2
  label: Get Screen Mask 2
  kind: query
  command: "GET_SCREEN_MASK2:"
  params: []
- id: set_screen_mask
  label: Set Screen Mask
  kind: action
  command: "SET_SCREEN_MASK:{flag}:"
  params:
    - name: flag
      type: integer
      description: 0=no masking compensation, 1=compensate for masking
- id: get_video_mode
  label: Get Video Mode
  kind: query
  command: "GET_VIDEO_MODE:"
  params: []
- id: get_video_color
  label: Get Video Color
  kind: query
  command: "GET_VIDEO_COLOR:"
  params: []
- id: get_content_color
  label: Get Content Color
  kind: query
  command: "GET_CONTENT_COLOR:"
  params: []
- id: get_cinemascape_mode
  label: Get CinemaScape Mode
  kind: query
  command: "GET_CINEMASCAPE_MODE:"
  params: []
- id: set_cinemascape_mode
  label: Set CinemaScape Mode
  kind: action
  command: "SET_CINEMASCAPE_MODE:{mode}:"
  params:
    - name: mode
      type: integer
      description: 0=off, 1=2.35 Anamorphic, 2=2.35 Letterbox, 3=Native 2.35 Display
- id: get_scale_mode
  label: Get Scale Mode
  kind: query
  command: "GET_SCALE_MODE:"
  params: []
- id: play_script
  label: Play Script
  kind: action
  command: "PLAY_SCRIPT:{script_name}:"
  params:
    - name: script_name
      type: string
- id: send_event
  label: Send Event
  kind: action
  command: "SEND_EVENT:{message}:"
  params:
    - name: message
      type: string
# Child mode
- id: get_child_mode_state
  label: Get Child Mode State
  kind: query
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
# Networking
- id: get_network_settings
  label: Get Network Settings
  kind: query
  command: "GET_NETWORK_SETTINGS:"
  params: []
- id: set_network_settings
  label: Set Network Settings
  kind: action
  command: "SET_NETWORK_SETTINGS:{static}:{ip_address}:{subnet}:{gateway}:{dns1}:{dns2}:"
  params:
    - name: static
      type: integer
      description: 0=DHCP, 1=static
    - name: ip_address
      type: string
    - name: subnet
      type: string
    - name: gateway
      type: string
    - name: dns1
      type: string
    - name: dns2
      type: string
- id: get_system_capabilities
  label: Get System Capabilities
  kind: query
  command: "GET_SYSTEM_CAPABILITIES:"
  params: []
- id: get_zone_capabilities
  label: Get Zone Capabilities
  kind: query
  command: "GET_ZONE_CAPABILITIES:"
  params: []
```

## Feedbacks
```yaml
- id: device_power_state
  type: enum
  values:
    - standby
    - on
- id: zone_state
  type: enum
  values:
    - disabled
    - available
- id: system_readiness_state
  type: enum
  values:
    - ready
    - becoming_ready
    - idle
- id: ui_state
  type: object
  description: screen / popup / dialog / saver codes; see GET_UI_STATE table
- id: available_devices
  type: string
  description: Colon-delimited list of CPDIDs
- id: available_devices_by_serial_number
  type: string
  description: Colon-delimited list of zero-padded 12-hex serial numbers
- id: device_type_name
  type: enum
  values:
    - Server
    - Cinema One
    - Strato
    - Strato V
    - Alto
    - Terra Movie Server
    - Player
    - Music Player
    - Disc Vault
- id: num_zones
  type: object
  description: num_movie_zones (00 or 01) and num_music_zones
- id: system_version
  type: object
  description: control_protocol_version (e.g. 18) and kOS_version string
- id: protocol
  type: integer
  description: Active protocol version (zero-padded two-digit)
- id: active_protocol
  type: integer
  description: Session protocol version
- id: device_info
  type: object
  description: device_type, serial_num (16 hex), cpdid, ip_address
- id: friendly_name
  type: string
- id: friendly_system_name
  type: string
- id: highlighted_selection
  type: string
  description: Handle for currently highlighted item
- id: user_input
  type: object
  description: type (00/01/02), prompt, entry
- id: user_input_prompt
  type: object
  description: type, icon, prompt, displayed, char_limit, valid
- id: content_details_overview
  type: object
  description: num_lines, handle, table
- id: content_details
  type: object
  description: line, name, value
- id: play_status
  type: object
  description: mode (0/1/2/4/6), speed, title_num, title_length, title_loc, chap_num, chap_len, chap_loc
- id: title_name
  type: string
- id: music_now_playing_status
  type: object
  description: total, location, repeat (0/1), random (0/1), generation, now_playing_handle
- id: music_play_status
  type: object
  description: mode, speed, length, position (+/-), progress
- id: music_title
  type: object
  description: track, artist, album, track_handle, album_handle, now_playing_handle
- id: playing_music_information
  type: object
  description: handle, label
- id: music_preset_information
  type: object
  description: tag, handle, label
- id: browse_results_overview
  type: object
  description: browse_handle, title, response_lines, total_lines, first_line_index, playing_line_index
- id: browse_result
  type: object
  description: relative_line, line text, default_action fields, action1..action4 fields
- id: action_performed
  type: string
- id: controlled_zone
  type: string
  description: #{sn}.{zn}
- id: movie_media_type
  type: enum
  values:
    - none
    - dvd
    - video_stream
    - bluray
- id: movie_location
  type: enum
  values:
    - interface_or_unknown
    - main_content
    - intermission
    - end_credits
    - disc_menu
- id: cinema_angle
  type: object
  description: cur_angle (1-9), num_angles (1-9), in_angle_block (0/1)
- id: cinemascape_mask
  type: integer
  description: frame_ratio *100 (e.g. 133, 166, 178, 237, 240)
- id: screen_mask
  type: object
  description: image_ratio (00-05), top_trim_rel, bottom_trim_rel, conservative_ratio, top_mask_abs, bottom_mask_abs
- id: screen_mask2
  type: object
  description: top_mask_abs, bottom_mask_abs, top_calibrated, bottom_calibrated
- id: video_mode
  type: object
  description: composite, component, HDMI two-digit codes (table of 00-57)
- id: video_color
  type: object
  description: EOTF, color_space, color_depth, color_sampling
- id: content_color
  type: object
  description: EOTF, color_space, color_depth, color_sampling
- id: cinemascape_mode
  type: enum
  values:
    - off
    - "2_35_anamorphic"
    - "2_35_letterbox"
    - native_2_35_display
- id: scale_mode
  type: enum
  values:
    - no_scaling
    - anamorphic
    - reserved
    - zoom
- id: child_mode_state
  type: enum
  values:
    - inactive
    - active
- id: network_settings
  type: object
  description: static (0/1), ip_address, subnet_mask, gateway, dns1, dns2
- id: system_capabilities
  type: object
  description: movies (Y/N), music (Y/N), product_line (Y/N)
- id: zone_capabilities
  type: object
  description: osd/movies/music/store/search flags, library_type, osd_generation (00-03)
- id: time
  type: object
  description: yyyy, mm, dd, hh, mm, ss, timezone (3-letter)
- id: player_restart
  type: event
  description: Sent when component finishes powering up; no status code
- id: user_defined_event
  type: string
  description: Custom event message (from SEND_EVENT, scripts, child UI, volume buttons)
- id: status_code
  type: object
  description: Three-digit zero-padded status code; 000=success, others=errors (Appendix A)
```

## Variables
```yaml
# UNRESOLVED: section intentionally omitted - the Kaleidescape protocol is command/response based;
# persistent settable parameters are configured via dedicated SET_* commands already enumerated as actions.
```

## Events
```yaml
- id: player_restart
  description: PLAYER_RESTART - emitted when component finishes powering up and is ready for input
- id: device_power_state
  description: DEVICE_POWER_STATE - emitted on power state change
- id: available_devices
  description: AVAILABLE_DEVICES - emitted when component list changes
- id: ui_state
  description: UI_STATE - emitted on screen/popup/dialog/saver change
- id: highlighted_selection
  description: HIGHLIGHTED_SELECTION - emitted on highlight change
- id: user_input
  description: USER_INPUT - emitted on prompt/entry change
- id: play_status
  description: PLAY_STATUS - periodic during playback when status cue period >0
- id: music_play_status
  description: MUSIC_PLAY_STATUS - periodic during music playback
- id: music_now_playing_status
  description: MUSIC_NOW_PLAYING_STATUS - emitted on music list state change
- id: music_title
  description: MUSIC_TITLE - emitted on track change
- id: playing_music_information
  description: PLAYING_MUSIC_INFORMATION - emitted on now-playing change
- id: music_preset_information
  description: MUSIC_PRESET_INFORMATION - emitted on preset assignment
- id: video_mode
  description: VIDEO_MODE - emitted on output mode change
- id: video_color
  description: VIDEO_COLOR - emitted on output color change
- id: content_color
  description: CONTENT_COLOR - emitted on content color change
- id: cinemascape_mask
  description: CINEMASCAPE_MASK - emitted on mask change
- id: screen_mask
  description: SCREEN_MASK - emitted on mask change
- id: movie_location
  description: MOVIE_LOCATION - emitted on playback location change
- id: movie_media_type
  description: MOVIE_MEDIA_TYPE - emitted on media type change
- id: child_mode_state
  description: CHILD_MODE_STATE - emitted on child UI activation
- id: title_name
  description: TITLE_NAME - emitted on title change
- id: user_defined_event
  description: USER_DEFINED_EVENT - custom event from SEND_EVENT, scripts, child UI, volume keys
- id: status_cue_period
  description: STATUS_CUE_PERIOD - response confirming cue period
```

## Macros
```yaml
# UNRESOLVED: section intentionally omitted - Kaleidescape control protocol defines no built-in
# multi-step macro commands. The PLAY_SCRIPT action triggers a user-defined script on the player,
# but the script contents are configured separately on-device and not described in this source.
```

## Safety
```yaml
confirmation_required_for:
  - bluray_special_stop  # source: "CAUTION: USING THIS COMMAND CAN TRAP THE USER... controller must provide another mechanism to return to the Kaleidescape menu"
interlocks: []
# UNRESOLVED: source contains only the BLURAY_SPECIAL_STOP caution; no other interlock procedures
# or power-on sequencing requirements are documented.
```

## Notes
- TCP/IP control uses port 10000 (verified in source). Up to 20 simultaneous connections per component.
- M300 supports `LEAVE_STANDBY` over both RS-232 and TCP/IP without disconnecting TCP (M-Class behavior).
- M300 has an RS-232 DTE port; data rates up to 57,600 baud for players; default 19200/8/N/1, no flow control.
- Most Premiere Players disconnect TCP when entering/leaving standby; 1080p/Mini/Movie Player 2/Music Player also drop TCP on `LEAVE_STANDBY` over TCP. Wait 15s before reconnecting.
- Each message uses `device_id/seq/message_body[/checksum]` format; checksum is modulo-100 sum of preceding characters and optional in commands.
- Binary delimiter mode (`SET_PROTOCOL_SETTINGS:BINARY_DELIMITERS:LATIN-1:`) replaces `/` with SOH (0x01), `:` with STX (0x02), `\r\n` with EOT (0x04); not supported over RS-232.
- Command routing via CPDID (01-99) or serial-number prefix (`#144B`) lets a single connection reach other components.
- Music-zone commands use the `01.02/seq/...` device-ID syntax; only music-related commands valid for music zones.
- Status code 028 ("Incompatible video configuration") returned for `GET_CINEMASCAPE_MASK` outside CinemaScape mode.

<!-- UNRESOLVED: M300-specific firmware compatibility not stated (source covers the full Premiere/Strato line at kOS 10.18 / 8.13). Voltage, current, and power specifications not stated. M300-specific RS-232 baud rate not stated — used the Premiere-player default of 19200. -->

## Provenance

```yaml
source_domains:
  - kaleidescape.com
  - support.kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/kaleidescape-system-control-protocol-reference-manual.pdf
  - https://support.kaleidescape.com/support/article/Control-Protocol-Reference-Manual
  - https://www.kaleidescape.com/support/article/Kaleidescape-Control-Commands
  - https://www.kaleidescape.com/wp-content/uploads/2019/07/Kaleidescape-Programming-Manual-for-Crestron.pdf
retrieved_at: 2026-05-21T19:58:25.112Z
last_checked_at: 2026-07-22T01:02:03.562Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:02:03.562Z
matched_actions: 202
action_count: 202
confidence: medium
summary: "All 202 spec actions are literal wire-token matches with correct shapes/params against the source command reference, and transport values (port 10000, 19200/8/N/1) are verbatim-supported. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- GET_PROTOCOL_VERSION
- "M300-specific firmware compatibility not stated; source applies to entire Premiere/Strato line."
- "source says \"None (default) or RTS/CTS\" - rts_cts listed as optional"
- "section intentionally omitted - the Kaleidescape protocol is command/response based;"
- "section intentionally omitted - Kaleidescape control protocol defines no built-in"
- "source contains only the BLURAY_SPECIAL_STOP caution; no other interlock procedures"
- "M300-specific firmware compatibility not stated (source covers the full Premiere/Strato line at kOS 10.18 / 8.13). Voltage, current, and power specifications not stated. M300-specific RS-232 baud rate not stated — used the Premiere-player default of 19200."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
