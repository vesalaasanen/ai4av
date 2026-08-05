---
spec_id: admin/kaleidescape-1080p-mini-player
schema_version: ai4av-public-spec-v1
revision: 2
title: "Kaleidescape, Inc. 1080p Mini Player Control Spec"
manufacturer: Kaleidescape
model_family: "1080p Mini Player"
aliases: []
compatible_with:
  manufacturers:
    - Kaleidescape
    - "Kaleidescape, Inc."
  models:
    - "1080p Mini Player"
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
retrieved_at: 2026-05-21T02:46:18.238Z
last_checked_at: 2026-07-21T22:57:00.983Z
generated_at: 2026-07-21T22:57:00.983Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix A (full command summary and status codes) referenced but not fully reproduced in source excerpt"
  - "no direct volume/gain commands in source (volume reported only as USER_DEFINED_EVENT from remote)"
  - "explicit settable parameters largely mirror actions (SET_* commands)."
  - "explicit multi-step macros not described in source"
  - "explicit interlock procedures not fully detailed in source"
  - "Appendix A (full command summary and status codes) referenced but only partially reproduced in source excerpt"
  - "direct volume/audio level commands not documented (only USER_DEFINED_EVENT triggers from remote/apps)"
  - "firmware version compatibility not stated in source (doc covers kOS 10.18 & 8.13)"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:57:00.983Z
  matched_actions: 203
  action_count: 203
  confidence: medium
  summary: "All 203 spec actions match literal source command headers/tokens with consistent shapes; transport values (port 10000, 19200-8-N-1) confirmed verbatim; near-total bidirectional coverage of source protocol. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Kaleidescape, Inc. 1080p Mini Player Control Spec

## Summary
Kaleidescape 1080p Mini Player is a media player supporting both TCP/IP (port 10000) and RS-232 serial control. Protocol is ASCII text-based with slash-delimited message segments (`device_id/seq/message_body[/checksum]`). Supports power, navigation, media browsing, playback, music-zone control, disc navigation, video/masking reporting, and child-mode commands. Premiere players with Co-Star are controlled via the connected Strato and cannot be controlled directly.

<!-- UNRESOLVED: Appendix A (full command summary and status codes) referenced but not fully reproduced in source excerpt -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 10000  # stated: "port 10000"
serial:
  baud_rate: 19200  # stated: Table 1 Player speed
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: none  # stated (RTS/CTS hardware flow control also supported per Table 3)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable: ENTER_STANDBY, LEAVE_STANDBY present
# queryable: GET_DEVICE_POWER_STATE, GET_UI_STATE, GET_SYSTEM_VERSION, GET_PLAY_STATUS, etc. present
# levelable: UNRESOLVED: no direct volume/gain commands in source (volume reported only as USER_DEFINED_EVENT from remote)
```

## Actions
```yaml
# Connection / Power
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
- id: get_device_power_state
  label: Get Device Power State
  kind: query
  command: "GET_DEVICE_POWER_STATE:"
  params: []

# System / Verification
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
- id: get_available_devices
  label: Get Available Devices
  kind: query
  command: "GET_AVAILABLE_DEVICES:"
  params: []
- id: get_available_devices_by_serial_number
  label: Get Available Devices by Serial Number
  kind: query
  command: "GET_AVAILABLE_DEVICES_BY_SERIAL_NUMBER:"
  params: []
- id: get_protocol
  label: Get Protocol
  kind: query
  command: "GET_PROTOCOL:"
  params: []
- id: get_protocol_version
  label: Get Protocol Version (legacy)
  kind: query
  command: "GET_PROTOCOL_VERSION:"
  params: []
  notes: "Legacy; GET_PROTOCOL preferred (source note line 648)"
- id: set_protocol_settings
  label: Set Protocol Settings
  kind: action
  command: "SET_PROTOCOL_SETTINGS:{delimiter_type}:{character_set}"
  params:
    - name: delimiter_type
      type: enum
      values: [PRINTABLE_DELIMITERS, BINARY_DELIMITERS]
    - name: character_set
      type: enum
      values: [LATIN-1]
- id: set_supported_protocol
  label: Set Supported Protocol
  kind: action
  command: "SET_SUPPORTED_PROTOCOL:{version}"
  params:
    - name: version
      type: string
      description: Zero-padded two-digit protocol version
- id: get_active_protocol
  label: Get Active Protocol
  kind: query
  command: "GET_ACTIVE_PROTOCOL:"
  params: []

# Events
- id: enable_events
  label: Enable Events
  kind: action
  command: "ENABLE_EVENTS:{target_device_id}"
  params:
    - name: target_device_id
      type: string
      description: CPDID or serial number (.xx music zone suffix)
- id: disable_events
  label: Disable Events
  kind: action
  command: "DISABLE_EVENTS:{target_device_id}"
  params:
    - name: target_device_id
      type: string
- id: get_device_info
  label: Get Device Info
  kind: query
  command: "GET_DEVICE_INFO:"
  params: []
- id: send_event
  label: Send Event
  kind: action
  command: "SEND_EVENT:{message}"
  params:
    - name: message
      type: string
      description: Triggers a USER_DEFINED_EVENT

# Friendly Name
- id: get_friendly_name
  label: Get Friendly Name
  kind: query
  command: "GET_FRIENDLY_NAME:"
  params: []
- id: set_friendly_name
  label: Set Friendly Name
  kind: action
  command: "SET_FRIENDLY_NAME:{name}"
  params:
    - name: name
      type: string
- id: get_friendly_system_name
  label: Get Friendly System Name
  kind: query
  command: "GET_FRIENDLY_SYSTEM_NAME:"
  params: []

# Navigation - Arrow Commands
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
- id: up
  label: Up
  kind: action
  command: "UP:"
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
- id: down
  label: Down
  kind: action
  command: "DOWN:"
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
- id: left
  label: Left
  kind: action
  command: "LEFT:"
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
- id: right
  label: Right
  kind: action
  command: "RIGHT:"
  params: []

# Navigation - Child / Advanced
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
- id: child_up
  label: Child Up
  kind: action
  command: "CHILD_UP:"
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
- id: child_down
  label: Child Down
  kind: action
  command: "CHILD_DOWN:"
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
- id: child_left
  label: Child Left
  kind: action
  command: "CHILD_LEFT:"
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
- id: child_right
  label: Child Right
  kind: action
  command: "CHILD_RIGHT:"
  params: []
- id: child_select
  label: Child Select
  kind: action
  command: "CHILD_SELECT:"
  params: []

# Navigation - Page / Selection
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
- id: page_up
  label: Page Up
  kind: action
  command: "PAGE_UP:"
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
- id: page_down
  label: Page Down
  kind: action
  command: "PAGE_DOWN:"
  params: []
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
  command: "POSITION_SELECT:{x_loc}:{y_loc}"
  params:
    - name: x_loc
      type: integer
      description: X coordinate (0 to 2 billion)
    - name: y_loc
      type: integer
      description: Y coordinate (0 to 2 billion)

# Paging and skipping
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

# UI - Menu
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

# UI - Views / Navigation
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
  command: "GO_MOVIE_COLLECTION:{collection_name}"
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
  command: "GO_MUSIC_COLLECTION:{collection_name}"
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

# UI State
- id: get_ui_state
  label: Get UI State
  kind: query
  command: "GET_UI_STATE:"
  params: []

# User Input
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
  command: "SET_USER_INPUT_ENTRY:{string}"
  params:
    - name: string
      type: string
- id: keyboard_character
  label: Keyboard Character
  kind: action
  command: "KEYBOARD_CHARACTER:{character}"
  params:
    - name: character
      type: string
      description: Single character (colon must be escaped with backslash)
- id: keyboard_literal
  label: Keyboard Literal
  kind: action
  command: "KEYBOARD_LITERAL:{character}"
  params:
    - name: character
      type: string
      description: ASCII character >= 32 (colon/slash must be escaped)
- id: backspace
  label: Backspace
  kind: action
  command: "BACKSPACE:"
  params: []

# View Controls
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
  label: Default Level
  kind: action
  command: "DEFAULT_LEVEL:"
  params: []
- id: safe_level
  label: Safe Level
  kind: action
  command: "SAFE_LEVEL:"
  params: []
- id: go_search
  label: Go Search
  kind: action
  command: "GO_SEARCH:"
  params: []
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

# Content Details
- id: get_content_details
  label: Get Content Details
  kind: query
  command: "GET_CONTENT_DETAILS:{handle}:{passcode}"
  params:
    - name: handle
      type: string
      description: Content handle from HIGHLIGHTED_SELECTION / BROWSE_RESPONSE / MUSIC_TITLE
    - name: passcode
      type: string
      description: Passcode to access content above current parental-control level
- id: get_highlighted_selection
  label: Get Highlighted Selection
  kind: query
  command: "GET_HIGHLIGHTED_SELECTION:"
  params: []

# Logging
- id: send_to_syslog
  label: Send to Syslog
  kind: action
  command: "SEND_TO_SYSLOG:INFORMATION:{message}"
  params:
    - name: message
      type: string

# Playback - Movie
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
- id: stop_or_cancel
  label: Stop or Cancel
  kind: action
  command: "STOP_OR_CANCEL:"
  params: []

# Child Playback
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

# Disc Navigation
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
- id: start_send_number_to_disc_entry
  label: Start Send Number to Disc Entry
  kind: action
  command: "START_SEND_NUMBER_TO_DISC_ENTRY:"
  params: []
- id: show_navigation_overlay
  label: Show Navigation Overlay
  kind: action
  command: "SHOW_NAVIGATION_OVERLAY:"
  params: []
- id: status_and_settings
  label: Status and Settings
  kind: action
  command: "STATUS_AND_SETTINGS:"
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
- id: bluray_special_stop
  label: BluRay Special Stop
  kind: action
  command: "BLURAY_SPECIAL_STOP:"
  params: []
  notes: "Source CAUTION: can trap user depending on disc authoring; provide alternative return mechanism"
- id: bluray_popup_menu_toggle
  label: BluRay Popup Menu Toggle
  kind: action
  command: "BLURAY_POPUP_MENU_TOGGLE:"
  params: []

# Intermission
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

# Favorite Scene
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

# Blu-ray Color Buttons
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

# Playback Queries / Status
- id: set_status_cue_period
  label: Set Status Cue Period
  kind: action
  command: "SET_STATUS_CUE_PERIOD:{period}"
  params:
    - name: period
      type: integer
      description: "Seconds between PLAY_STATUS/MUSIC_PLAY_STATUS messages (0=no location updates, 1=every second)"
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
- id: get_movie_media_type
  label: Get Movie Media Type
  kind: query
  command: "GET_MOVIE_MEDIA_TYPE:"
  params: []
- id: get_camera_angle
  label: Get Camera Angle
  kind: query
  command: "GET_CAMERA_ANGLE:"
  params: []
- id: get_movie_location
  label: Get Movie Location
  kind: query
  command: "GET_MOVIE_LOCATION:"
  params: []
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

# Masking / CinemaScape
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
  label: Get Screen Mask2
  kind: query
  command: "GET_SCREEN_MASK2:"
  params: []
- id: set_screen_mask
  label: Set Screen Mask
  kind: action
  command: "SET_SCREEN_MASK:{flag}"
  params:
    - name: flag
      type: enum
      values: [0, 1]
      description: "0=no masking compensation, 1=compensate for masking"
- id: get_cinemascape_mode
  label: Get CinemaScape Mode
  kind: query
  command: "GET_CINEMASCAPE_MODE:"
  params: []
- id: set_cinemascape_mode
  label: Set CinemaScape Mode
  kind: action
  command: "SET_CINEMASCAPE_MODE:{mode}"
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: "0=off, 1=2.35 Anamorphic, 2=2.35 Letterbox, 3=Native 2.35"
- id: get_scale_mode
  label: Get Scale Mode
  kind: query
  command: "GET_SCALE_MODE:"
  params: []

# Music Zone
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
- id: get_playing_music_information
  label: Get Playing Music Information
  kind: query
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
- id: get_controlled_zone
  label: Get Controlled Zone
  kind: query
  command: "GET_CONTROLLED_ZONE:"
  params: []
- id: set_controlled_zone
  label: Set Controlled Zone
  kind: action
  command: "SET_CONTROLLED_ZONE:#{sn}.{zn}"
  params:
    - name: sn
      type: string
      description: Serial number (zero-padded 12 hex)
    - name: zn
      type: integer
      description: Music zone 01-04
- id: browse
  label: Browse
  kind: action
  command: "BROWSE:{browse_handle}:{passcode}:{lines}:{flags}"
  params:
    - name: browse_handle
      type: string
    - name: passcode
      type: string
    - name: lines
      type: string
      description: Line range, e.g. "1-10"
    - name: flags
      type: string
      description: "filter=\"searchstring\" or suggest"
- id: perform_action
  label: Perform Action
  kind: action
  command: "PERFORM_ACTION:{handle}:{passcode}:{action}"
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
  command: "PLAY_FIRST_IN_MUSIC_COLLECTION:{collection}"
  params:
    - name: collection
      type: string
- id: play_next_in_music_collection
  label: Play Next In Music Collection
  kind: action
  command: "PLAY_NEXT_IN_MUSIC_COLLECTION:{collection}"
  params:
    - name: collection
      type: string
- id: play_previous_in_music_collection
  label: Play Previous In Music Collection
  kind: action
  command: "PLAY_PREVIOUS_IN_MUSIC_COLLECTION:{collection}"
  params:
    - name: collection
      type: string
- id: assign_playing_music_to_preset
  label: Assign Playing Music To Preset
  kind: action
  command: "ASSIGN_PLAYING_MUSIC_TO_PRESET:{tag}"
  params:
    - name: tag
      type: string
- id: play_music_preset
  label: Play Music Preset
  kind: action
  command: "PLAY_MUSIC_PRESET:{tag}"
  params:
    - name: tag
      type: string
- id: get_music_preset_information
  label: Get Music Preset Information
  kind: query
  command: "GET_MUSIC_PRESET_INFORMATION:{tag}"
  params:
    - name: tag
      type: string

# Scripts
- id: play_script
  label: Play Script
  kind: action
  command: "PLAY_SCRIPT:{script_name}"
  params:
    - name: script_name
      type: string

# Child Mode
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

# Network
- id: get_network_settings
  label: Get Network Settings
  kind: query
  command: "GET_NETWORK_SETTINGS:"
  params: []
- id: set_network_settings
  label: Set Network Settings
  kind: action
  command: "SET_NETWORK_SETTINGS:{static}:{ip_address}:{subnet}:{gateway}:{dns1}:{dns2}"
  params:
    - name: static
      type: enum
      values: [0, 1]
      description: "0=DHCP, 1=static"
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

# Capabilities / Time
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
- id: get_time
  label: Get Time
  kind: query
  command: "GET_TIME:"
  params: []
  notes: "Recommended TCP/IP connection keepalive test (no system effect)"
```

## Feedbacks
```yaml
# Event messages are unsolicited; device sends them on state change
# Response format: status_code:message_name:fields...
# Status 000 = OK, non-zero = error

# Power state events
- id: device_power_state
  label: Device Power State
  type: event
  fields:
    - name: power_state
      type: enum
      values: [0, 1]
      description: "0=standby, 1=powered on"
    - name: zone_states
      type: string
      description: "Colon-delimited zone availability (0=disabled, 1=available)"

- id: player_restart
  label: Player Restart
  type: event
  description: Generated after power up complete or LEAVE_STANDBY

# UI state event
- id: ui_state
  label: UI State
  type: event
  fields:
    - name: screen
      type: integer
      description: "00=Unknown, 01=Movie List, 02=Movie Collections, 03=Movie Covers, 04=Parental Control, 07=Playing movie, 08=System Status, 09=Music List, 10=Music Covers, 11=Music Collections, 12=Music Now Playing, 14=Vault Summary, 15=System Settings, 16=Movie Store, 18=Library search"
    - name: popup
      type: integer
      description: "00=None, 01=Details, 02=Status overlay, 03=Overlay not status, 09=Keyboard"
    - name: dialog
      type: integer
      description: "00=None, 01=Kaleidescape menu, 02=Passcode, 03=Question, 04=Info, 05=Warning, 06=Error, 07=Preplay, 08=Import Warranty, 09=Keyboard, 10=IP config"
    - name: saver
      type: enum
      values: [0, 1]
      description: "0=inactive, 1=active"

- id: highlighted_selection
  label: Highlighted Selection
  type: event
  fields:
    - name: selection_id
      type: string

- id: system_readiness_state
  label: System Readiness State
  type: event
  fields:
    - name: state
      type: enum
      values: [0, 1, 2]
      description: "0=ready, 1=becoming ready, 2=idle"

- id: available_devices
  label: Available Devices
  type: event
  fields:
    - name: devices
      type: string
      description: Colon-delimited CPDID list

- id: available_devices_by_serial_number
  label: Available Devices by Serial Number
  type: event
  fields:
    - name: serial_numbers
      type: string
      description: Colon-delimited zero-padded 12-hex serial numbers

# Query responses share same field structure as events
- id: system_version
  label: System Version
  type: response
  fields:
    - name: control_protocol_version
      type: string
      description: Zero-padded two-digit protocol version
    - name: kos_version
      type: string

- id: protocol
  label: Protocol
  type: response
  fields:
    - name: version
      type: string

- id: active_protocol
  label: Active Protocol
  type: response
  fields:
    - name: version
      type: string

- id: num_zones
  label: Num Zones
  type: response
  fields:
    - name: num_movie_zones
      type: string
      description: "01=has onscreen display, 00=no display"
    - name: num_music_zones
      type: string

- id: device_type_name
  label: Device Type Name
  type: response
  fields:
    - name: device_name
      type: string
      description: "Server, Cinema One, Strato, Strato V, Alto, Terra Movie Server, Player, Music Player, or Disc Vault"

- id: device_info
  label: Device Info
  type: response
  fields:
    - name: device_type
      type: string
    - name: serial_num
      type: string
      description: Zero-padded 16 hex
    - name: cpdid
      type: string
      description: Assigned CPDID (00 if unassigned)
    - name: ip_address
      type: string

- id: friendly_name
  label: Friendly Name
  type: response
  fields:
    - name: name
      type: string

- id: friendly_system_name
  label: Friendly System Name
  type: response
  fields:
    - name: name
      type: string

- id: user_input
  label: User Input
  type: response
  fields:
    - name: type
      type: enum
      values: [00, 01, 02]
      description: "00=No prompt, 01=Alphanumeric, 02=Numeric"
    - name: prompt
      type: string
    - name: entry
      type: string

- id: user_input_prompt
  label: User Input Prompt
  type: response
  fields:
    - name: type
      type: enum
      values: [00, 01, 02]
    - name: icon
      type: string
    - name: prompt
      type: string
    - name: displayed
      type: enum
      values: [0, 1]
    - name: char_limit
      type: string
    - name: valid
      type: enum
      values: [0, 1]

- id: content_details_overview
  label: Content Details Overview
  type: response
  fields:
    - name: num_lines
      type: integer
    - name: handle
      type: string
    - name: table
      type: string
      description: "movies or albums"

- id: content_details
  label: Content Details
  type: response
  fields:
    - name: line
      type: integer
    - name: name
      type: string
    - name: value
      type: string

- id: title_name
  label: Title Name
  type: event
  fields:
    - name: title
      type: string

- id: movie_media_type
  label: Movie Media Type
  type: event
  fields:
    - name: media_type
      type: string
      description: "00=none, 01=DVD, 02=Video stream, 03=Blu-ray"

- id: movie_location
  label: Movie Location
  type: event
  fields:
    - name: location
      type: string
      description: "00=Kaleidescape interface/unknown, 03=main content, 04=intermission, 05=end credits, 06=disc menu"

- id: video_mode
  label: Video Mode
  type: event
  fields:
    - name: composite
      type: string
    - name: component
      type: string
    - name: hdmi
      type: string

- id: video_color
  label: Video Color
  type: event
  fields:
    - name: eotf
      type: string
    - name: color_space
      type: string
    - name: color_depth
      type: string
    - name: color_sampling
      type: string

- id: content_color
  label: Content Color
  type: event
  fields:
    - name: eotf
      type: string
    - name: color_space
      type: string
    - name: color_depth
      type: string
    - name: color_sampling
      type: string

- id: play_status
  label: Play Status
  type: event
  fields:
    - name: mode
      type: enum
      values: [0, 1, 2, 4, 6]
      description: "0=nothing playing, 1=paused, 2=playing, 4=fwd scan, 6=rev scan"
    - name: speed
      type: integer
      description: 1-3, applies to mode 4 or 6
    - name: title_num
      type: string
    - name: title_length
      type: string
    - name: title_loc
      type: string
    - name: chap_num
      type: string
    - name: chap_len
      type: string
    - name: chap_loc
      type: string

- id: status_cue_period
  label: Status Cue Period
  type: response
  fields:
    - name: period
      type: integer

- id: camera_angle
  label: Camera Angle
  type: event
  fields:
    - name: cur_angle
      type: integer
    - name: num_angles
      type: integer
    - name: in_angle_block
      type: enum
      values: [0, 1]

- id: cinemascape_mask
  label: CinemaScape Mask
  type: event
  fields:
    - name: frame_ratio
      type: string
      description: "133, 166, 178, 237, or 240"

- id: screen_mask
  label: Screen Mask
  type: event
  fields:
    - name: image_ratio
      type: string
    - name: top_trim_rel
      type: string
    - name: bottom_trim_rel
      type: string
    - name: conservative_ratio
      type: string
    - name: top_mask_abs
      type: string
    - name: bottom_mask_abs
      type: string

- id: screen_mask2
  label: Screen Mask2
  type: event
  fields:
    - name: top_mask_abs
      type: string
    - name: bottom_mask_abs
      type: string
    - name: top_calibrated
      type: string
    - name: bottom_calibrated
      type: string

- id: cinemascape_mode
  label: CinemaScape Mode
  type: event
  fields:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]

- id: scale_mode
  label: Scale Mode
  type: event
  fields:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: "0=no scaling, 1=anamorphic, 2=reserved, 3=zoom"

- id: music_now_playing_status
  label: Music Now Playing Status
  type: event
  fields:
    - name: total
      type: string
    - name: location
      type: string
    - name: repeat
      type: enum
      values: [0, 1]
    - name: random
      type: enum
      values: [0, 1]
    - name: generation
      type: string
    - name: now_playing_handle
      type: string

- id: music_play_status
  label: Music Play Status
  type: event
  fields:
    - name: mode
      type: enum
      values: [1, 2, 4, 6]
      description: "1=paused, 2=play, 4=ff, 6=rev"
    - name: speed
      type: string
    - name: length
      type: string
    - name: position
      type: string
    - name: progress
      type: string

- id: music_title
  label: Music Title
  type: event
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

- id: playing_music_information
  label: Playing Music Information
  type: event
  fields:
    - name: handle
      type: string
    - name: label
      type: string

- id: music_preset_information
  label: Music Preset Information
  type: response
  fields:
    - name: tag
      type: string
    - name: handle
      type: string
    - name: label
      type: string

- id: controlled_zone
  label: Controlled Zone
  type: response
  fields:
    - name: sn
      type: string
      description: Component serial number
    - name: zn
      type: integer
      description: Music zone 01-04

- id: browse_results_overview
  label: Browse Results Overview
  type: response
  fields:
    - name: browse_handle
      type: string
    - name: title
      type: string
    - name: response_lines
      type: integer
    - name: total_lines
      type: integer
    - name: first_line_index
      type: integer
    - name: playing_line_index
      type: integer

- id: browse_result
  label: Browse Result
  type: response
  fields:
    - name: relative_line
      type: integer
    - name: absolute_line
      type: integer
    - name: text
      type: string
    - name: play_status
      type: string
    - name: default_label
      type: string
    - name: default_behavior
      type: string
    - name: default_handle
      type: string
    - name: default_pop
      type: string
    - name: action1_label
      type: string
    - name: action1_behavior
      type: string
    - name: action1_handle
      type: string
    - name: action1_pop
      type: string
    - name: action2_label
      type: string
    - name: action2_behavior
      type: string
    - name: action2_handle
      type: string
    - name: action2_pop
      type: string
    - name: action3_label
      type: string
    - name: action3_behavior
      type: string
    - name: action3_handle
      type: string
    - name: action3_pop
      type: string
    - name: action4_label
      type: string
    - name: action4_behavior
      type: string
    - name: action4_handle
      type: string
    - name: action4_pop
      type: string

- id: action_performed
  label: Action Performed
  type: response
  fields:
    - name: text
      type: string

- id: child_mode_state
  label: Child Mode State
  type: event
  fields:
    - name: state
      type: enum
      values: [0, 1]

- id: network_settings
  label: Network Settings
  type: response
  fields:
    - name: static
      type: enum
      values: [0, 1]
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

- id: system_capabilities
  label: System Capabilities
  type: response
  fields:
    - name: movies
      type: enum
      values: [Y, N]
    - name: music
      type: enum
      values: [Y, N]
    - name: product_line
      type: enum
      values: [Y, N]
      description: "Y=Premiere, N=Strato"

- id: zone_capabilities
  label: Zone Capabilities
  type: response
  fields:
    - name: osd
      type: enum
      values: [Y, N]
    - name: movies
      type: enum
      values: [Y, N]
    - name: music
      type: enum
      values: [Y, N]
    - name: store
      type: enum
      values: [Y, N]
    - name: search
      type: enum
      values: [Y, N]
    - name: library_type
      type: enum
      values: [Y, N]
    - name: osd_generation
      type: integer
      description: "00=none, 01=OSDv1 Premiere, 02=OSDv2 classic, 03=OSDv2 row"

- id: time
  label: Time
  type: response
  fields:
    - name: yyyy
      type: integer
    - name: mm
      type: integer
    - name: dd
      type: integer
    - name: hh
      type: integer
    - name: min
      type: integer
    - name: ss
      type: integer
    - name: timezone
      type: string

- id: user_defined_event
  label: User Defined Event
  type: event
  fields:
    - name: event_name
      type: string
```

## Variables
```yaml
# UNRESOLVED: explicit settable parameters largely mirror actions (SET_* commands).
# Volume control: source documents only USER_DEFINED_EVENT triggers from remote
# (VOLUME_DOWN_PRESS, VOLUME_UP_PRESS, VOLUME_DOWN_RELEASE, VOLUME_UP_RELEASE,
# TOGGLE_MUTE) and App volume capabilities (VOLUME_QUERY, VOLUME_UP, VOLUME_DOWN,
# TOGGLE_MUTE) - no direct volume SET command on the player itself.
```

## Events
```yaml
# See Feedbacks section - events use same message types as responses but with seq="!" and status 000
# Key unsolicited events:
#   - DEVICE_POWER_STATE: power state change
#   - PLAYER_RESTART: after power up or LEAVE_STANDBY (no status code)
#   - UI_STATE: onscreen display state change
#   - HIGHLIGHTED_SELECTION: user changes selection
#   - AVAILABLE_DEVICES: list of addressable components changes
#   - SYSTEM_READINESS_STATE: idle mode transitions
#   - PLAY_STATUS / MUSIC_PLAY_STATUS: playback progress (rate governed by SET_STATUS_CUE_PERIOD)
#   - VIDEO_MODE / VIDEO_COLOR / CONTENT_COLOR: video output changes
#   - SCREEN_MASK / SCREEN_MASK2 / CINEMASCAPE_MASK / CINEMASCAPE_MODE: masking state
#   - MOVIE_LOCATION / MOVIE_MEDIA_TYPE / TITLE_NAME: playback metadata
#   - MUSIC_TITLE / PLAYING_MUSIC_INFORMATION / MUSIC_NOW_PLAYING_STATUS / MUSIC_PLAY_STATUS: music metadata
#   - CHILD_MODE_STATE: child UI activation change
#   - USER_DEFINED_EVENT: script step, child UI activation, remote volume, or SEND_EVENT
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macros not described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "1080p Mini Player drops TCP/IP connection on ENTER_STANDBY/LEAVE_STANDBY; wait 15 seconds before reconnecting"
  - "When 1080p Mini Player disconnects on power state change, controller may miss DEVICE_POWER_STATE event during reconnect"
  - "BLURAY_SPECIAL_STOP can trap user depending on disc authoring; controller must provide alternative return to Kaleidescape menu/movie view"
  - "On PLAYER_RESTART, controller should resync: send SET_STATUS_CUE_PERIOD, GET_UI_STATE, GET_MOVIE_LOCATION"
# UNRESOLVED: explicit interlock procedures not fully detailed in source
```

## Notes
TCP/IP uses port 10000 with up to 20 simultaneous connections. Serial uses RS-232 DTE pinout (DB-9 male: pins 2 RD, 3 TD, 5 SG, 7 RTS, 8 CTS; straight-through to DCE, null modem to DTE). Hardware RTS/CTS flow control supported (not software); default = None (RTS asserted, CTS ignored). Checksums not applicable over TCP/IP (TCP has built-in error handling); checksums optional for serial commands. Message format: `device_id/seq/message_body[/checksum]` with slash (/) and colon (:) delimiters; up to 1024 chars + CR/LF. CPDID range 01-99; 00 invalid; ?? indicates garbled command. Sequence number 0-9 for commands/responses, ! for events, ? for unknown. Character set ISO 8859-1 (Latin-1), decimal 32-255; special chars escaped with backslash sequences (`\n`, `\r`, `\t`, `\/`, `\\`, `\:`, `\dnnn`). Binary delimiters (SOH/STX/EOT) available for TCP only, not RS-232. `GET_TIME` command recommended for TCP keepalive testing. Response times scale with serial baud rate (9600=3.2s, 19200=1.6s, 38400=0.8s, 57600=0.5s). Components do not echo characters; enable local echo on terminal emulator. Settings changed via SET_* commands reset on component restart — controller must resend on PLAYER_RESTART / VIDEO_MODE / SCREEN_MASK events. Premiere players used with Co-Star are controlled via the connected Strato and cannot be controlled directly.

<!-- UNRESOLVED: Appendix A (full command summary and status codes) referenced but only partially reproduced in source excerpt -->
<!-- UNRESOLVED: direct volume/audio level commands not documented (only USER_DEFINED_EVENT triggers from remote/apps) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source (doc covers kOS 10.18 & 8.13) -->
````

Spec output above. ~140 new actions added, all with verbatim `command:` payloads. Feedbacks extended with PLAY_STATUS, MUSIC_PLAY_STATUS, MUSIC_TITLE, CAMERA_ANGLE, masks, color, capabilities, time, browse, etc. Existing IDs/shapes preserved; revision bumped to 2. Caveman mode active for chat.

## Provenance

```yaml
source_domains:
  - kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/kaleidescape-system-control-protocol-reference-manual.pdf
  - https://www.kaleidescape.com/wp-content/uploads/2019/07/Kaleidescape-Programming-Manual-for-Crestron.pdf
  - https://www.kaleidescape.com/support/article/Kaleidescape-Control-Commands
retrieved_at: 2026-05-21T02:46:18.238Z
last_checked_at: 2026-07-21T22:57:00.983Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:57:00.983Z
matched_actions: 203
action_count: 203
confidence: medium
summary: "All 203 spec actions match literal source command headers/tokens with consistent shapes; transport values (port 10000, 19200-8-N-1) confirmed verbatim; near-total bidirectional coverage of source protocol. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix A (full command summary and status codes) referenced but not fully reproduced in source excerpt"
- "no direct volume/gain commands in source (volume reported only as USER_DEFINED_EVENT from remote)"
- "explicit settable parameters largely mirror actions (SET_* commands)."
- "explicit multi-step macros not described in source"
- "explicit interlock procedures not fully detailed in source"
- "Appendix A (full command summary and status codes) referenced but only partially reproduced in source excerpt"
- "direct volume/audio level commands not documented (only USER_DEFINED_EVENT triggers from remote/apps)"
- "firmware version compatibility not stated in source (doc covers kOS 10.18 & 8.13)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
