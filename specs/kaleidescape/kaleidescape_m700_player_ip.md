---
spec_id: admin/kaleidescape-inc-m700-player
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kaleidescape M700 Player Control Spec"
manufacturer: Kaleidescape
model_family: "M700 Player"
aliases: []
compatible_with:
  manufacturers:
    - Kaleidescape
    - "Kaleidescape, Inc."
  models:
    - "M700 Player"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kaleidescape.com
  - support.kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/Kaleidescape-System-Control-Protocol-Reference-Manual.pdf
  - https://support.kaleidescape.com/support/article/Control-Protocol-Reference-Manual
  - https://www.kaleidescape.com/support/article/Kaleidescape-Control-Commands
  - https://www.kaleidescape.com/wp-content/uploads/kaleidescape-programming-manual-for-crestron.pdf
retrieved_at: 2026-05-21T03:02:18.647Z
last_checked_at: 2026-06-09T11:54:28.528Z
generated_at: 2026-06-09T11:54:28.528Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - GET_PROTOCOL_VERSION
  - "paging/skip commands (PAGE_DOWN_OR_NEXT, PAGE_UP_OR_PREVIOUS, etc.)"
  - "source describes PLAY_SCRIPT command to execute named scripts,"
  - "no explicit safety interlock sequences documented in source"
  - "M700-specific power behavior not distinguished from general Player class"
  - "maximum concurrent TCP/IP session behavior for M700 specifically"
  - "firmware version compatibility range for M700"
  - "RS-232 pinout specific to M700 physical connector"
  - "BROWSE protocol detail fields for browse_result sub-parameters"
verification:
  verdict: verified
  checked_at: 2026-06-09T11:54:28.528Z
  matched_actions: 202
  action_count: 202
  confidence: medium
  summary: "All 202 spec actions match verbatim source commands and all transport parameters are confirmed; one deprecated legacy alias GET_PROTOCOL_VERSION is in the source but not the spec. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Kaleidescape M700 Player Control Spec

## Summary
Kaleidescape M700 Player is a Premiere-line movie and music player. This spec covers TCP/IP and RS-232 serial control via the Kaleidescape ASCII text-based protocol (format: `device_id/seq/message_body[/checksum]`). Messages up to 1024 characters terminated by CR or LF. Protocol version 18.

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
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from ENTER_STANDBY / LEAVE_STANDBY commands
- queryable    # inferred from GET_* query commands
- routable     # inferred from multi-zone routing (CPDID, serial number)
- levelable    # inferred from SET_STATUS_CUE_PERIOD timing control
```

## Actions
```yaml
- id: enter_standby
  label: Enter Standby
  kind: action
  command: ENTER_STANDBY:
  params: []

- id: leave_standby
  label: Leave Standby
  kind: action
  command: LEAVE_STANDBY:
  params: []

- id: get_device_power_state
  label: Get Device Power State
  kind: query
  command: GET_DEVICE_POWER_STATE:
  params: []

- id: get_system_readiness_state
  label: Get System Readiness State
  kind: query
  command: GET_SYSTEM_READINESS_STATE:
  params: []

- id: leave_idle_mode
  label: Leave Idle Mode
  kind: action
  command: LEAVE_IDLE_MODE:
  params: []

- id: get_system_version
  label: Get System Version
  kind: query
  command: GET_SYSTEM_VERSION:
  params: []

- id: get_device_type_name
  label: Get Device Type Name
  kind: query
  command: GET_DEVICE_TYPE_NAME:
  params: []

- id: get_available_devices
  label: Get Available Devices
  kind: query
  command: GET_AVAILABLE_DEVICES:
  params: []

- id: get_available_devices_by_serial_number
  label: Get Available Devices by Serial Number
  kind: query
  command: GET_AVAILABLE_DEVICES_BY_SERIAL_NUMBER:
  params: []

- id: get_num_zones
  label: Get Number of Zones
  kind: query
  command: GET_NUM_ZONES:
  params: []

- id: get_protocol
  label: Get Protocol Version
  kind: query
  command: GET_PROTOCOL:
  params: []

- id: set_protocol_settings
  label: Set Protocol Settings
  kind: action
  command: "SET_PROTOCOL_SETTINGS:{delimiter_type}:{character_set}:"
  params:
    - name: delimiter_type
      type: enum
      values: [PRINTABLE_DELIMITERS, BINARY_DELIMITERS]
    - name: character_set
      type: enum
      values: [LATIN-1]

- id: get_active_protocol
  label: Get Active Protocol
  kind: query
  command: GET_ACTIVE_PROTOCOL:
  params: []

- id: set_supported_protocol
  label: Set Supported Protocol
  kind: action
  command: "SET_SUPPORTED_PROTOCOL:{version}:"
  params:
    - name: version
      type: integer
      description: Zero-padded two-digit protocol version number

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

- id: get_device_info
  label: Get Device Info
  kind: query
  command: GET_DEVICE_INFO:
  params: []

- id: send_to_syslog
  label: Send to Syslog
  kind: action
  command: "SEND_TO_SYSLOG:INFORMATION:{message}:"
  params:
    - name: message
      type: string

- id: get_friendly_name
  label: Get Friendly Name
  kind: query
  command: GET_FRIENDLY_NAME:
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
  command: GET_FRIENDLY_SYSTEM_NAME:
  params: []

- id: up
  label: Navigate Up
  kind: action
  command: "UP:"
  params: []

- id: down
  label: Navigate Down
  kind: action
  command: "DOWN:"
  params: []

- id: left
  label: Navigate Left
  kind: action
  command: "LEFT:"
  params: []

- id: right
  label: Navigate Right
  kind: action
  command: "RIGHT:"
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

- id: child_up
  label: Child Navigate Up
  kind: action
  command: "CHILD_UP:"
  params: []

- id: child_down
  label: Child Navigate Down
  kind: action
  command: "CHILD_DOWN:"
  params: []

- id: child_left
  label: Child Navigate Left
  kind: action
  command: "CHILD_LEFT:"
  params: []

- id: child_right
  label: Child Navigate Right
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
      description: X coordinate (0 to 2000000000)
    - name: y_loc
      type: integer
      description: Y coordinate (0 to 2000000000)

- id: child_select
  label: Child Select
  kind: action
  command: "CHILD_SELECT:"
  params: []

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

- id: get_ui_state
  label: Get UI State
  kind: query
  command: "GET_UI_STATE:"
  params: []

- id: go_movies
  label: Go to Movies
  kind: action
  command: "GO_MOVIES:"
  params: []

- id: go_movie_list
  label: Go to Movie List
  kind: action
  command: "GO_MOVIE_LIST:"
  params: []

- id: go_movie_covers
  label: Go to Movie Covers
  kind: action
  command: "GO_MOVIE_COVERS:"
  params: []

- id: go_movie_collections
  label: Go to Movie Collections
  kind: action
  command: "GO_MOVIE_COLLECTIONS:"
  params: []

- id: go_movie_collection
  label: Go to Movie Collection
  kind: action
  command: "GO_MOVIE_COLLECTION:{collection_name}:"
  params:
    - name: collection_name
      type: string

- id: go_music
  label: Go to Music
  kind: action
  command: "GO_MUSIC:"
  params: []

- id: go_music_list
  label: Go to Music List
  kind: action
  command: "GO_MUSIC_LIST:"
  params: []

- id: go_music_covers
  label: Go to Music Covers
  kind: action
  command: "GO_MUSIC_COVERS:"
  params: []

- id: go_music_collections
  label: Go to Music Collections
  kind: action
  command: "GO_MUSIC_COLLECTIONS:"
  params: []

- id: go_music_collection
  label: Go to Music Collection
  kind: action
  command: "GO_MUSIC_COLLECTION:{collection_name}:"
  params:
    - name: collection_name
      type: string

- id: go_now_playing
  label: Go to Now Playing
  kind: action
  command: "GO_NOW_PLAYING:"
  params: []

- id: go_movie_store
  label: Go to Movie Store
  kind: action
  command: "GO_MOVIE_STORE:"
  params: []

- id: go_system_status
  label: Go to System Status
  kind: action
  command: "GO_SYSTEM_STATUS:"
  params: []

- id: go_parental_control
  label: Go to Parental Control
  kind: action
  command: "GO_PARENTAL_CONTROL:"
  params: []

- id: go_vault_summary
  label: Go to Vault Summary
  kind: action
  command: "GO_VAULT_SUMMARY:"
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

- id: keyboard_literal
  label: Keyboard Literal
  kind: action
  command: "KEYBOARD_LITERAL:{character}:"
  params:
    - name: character
      type: string

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

- id: go_search
  label: Go to Search
  kind: action
  command: "GO_SEARCH:"
  params: []

- id: details
  label: Show Details
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
      description: Content identifier
    - name: passcode
      type: string
      description: Passcode for restricted content

- id: get_highlighted_selection
  label: Get Highlighted Selection
  kind: query
  command: "GET_HIGHLIGHTED_SELECTION:"
  params: []

- id: go_screen_saver
  label: Go to Screen Saver
  kind: action
  command: "GO_SCREEN_SAVER:"
  params: []

- id: stop_screen_saver
  label: Stop Screen Saver
  kind: action
  command: "STOP_SCREEN_SAVER:"
  params: []

- id: play
  label: Play
  kind: action
  command: "PLAY:"
  params: []

- id: pause
  label: Pause Toggle
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
  label: Play or Pause Toggle
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
  label: Child Pause Toggle
  kind: action
  command: "CHILD_PAUSE:"
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
      description: "Seconds between PLAY_STATUS updates (0=off, 1=every second)"

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
      description: Serial number of component
    - name: zn
      type: string
      description: "Music zone (01-04)"

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

- id: disc_in_tray_toggle
  label: Disc in Tray Toggle
  kind: action
  command: "DISC_IN_TRAY_TOGGLE:"
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
  label: Status and Settings
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
  label: Red Button
  kind: action
  command: "RED:"
  params: []

- id: green
  label: Green Button
  kind: action
  command: "GREEN:"
  params: []

- id: blue
  label: Blue Button
  kind: action
  command: "BLUE:"
  params: []

- id: yellow
  label: Yellow Button
  kind: action
  command: "YELLOW:"
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

- id: stop_or_cancel
  label: Stop or Cancel
  kind: action
  command: "STOP_OR_CANCEL:"
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

- id: browse
  label: Browse Music
  kind: query
  command: "BROWSE:{browse_handle}:{passcode}:{lines}:{flags}:"
  params:
    - name: browse_handle
      type: string
    - name: passcode
      type: string
    - name: lines
      type: string
      description: "Line range e.g. 1-10"
    - name: flags
      type: string
      description: "Modifiers: filter, suggest"

- id: perform_action
  label: Perform Music Action
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
  label: Play First in Music Collection
  kind: action
  command: "PLAY_FIRST_IN_MUSIC_COLLECTION:{collection}:"
  params:
    - name: collection
      type: string

- id: play_next_in_music_collection
  label: Play Next in Music Collection
  kind: action
  command: "PLAY_NEXT_IN_MUSIC_COLLECTION:{collection}:"
  params:
    - name: collection
      type: string

- id: play_previous_in_music_collection
  label: Play Previous in Music Collection
  kind: action
  command: "PLAY_PREVIOUS_IN_MUSIC_COLLECTION:{collection}:"
  params:
    - name: collection
      type: string

- id: assign_playing_music_to_preset
  label: Assign Playing Music to Preset
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

- id: get_movie_location
  label: Get Movie Location
  kind: query
  command: "GET_MOVIE_LOCATION:"
  params: []

- id: go_calibrate_masking
  label: Go to Calibrate Masking
  kind: action
  command: "GO_CALIBRATE_MASKING:"
  params: []

- id: go_calibrate_masking_overscan
  label: Go to Calibrate Masking Overscan
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
      description: "0=no masking compensation, 1=enable masking compensation"

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
      description: "0=off, 1=2.35 Anamorphic, 2=2.35 Letterbox, 3=Native 2.35"

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

- id: start_send_number_to_disc_entry
  label: Start Send Number to Disc Entry
  kind: action
  command: "START_SEND_NUMBER_TO_DISC_ENTRY:"
  params: []

# UNRESOLVED: paging/skip commands (PAGE_DOWN_OR_NEXT, PAGE_UP_OR_PREVIOUS, etc.) 
# listed but not individually documented with full parameter specs
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
```

## Feedbacks
```yaml
- id: device_power_state
  type: composite
  description: "Power state and zone availability"
  fields:
    - name: power_state
      values: [0, 1]
      meaning: ["standby", "powered on"]
    - name: zone_states
      type: list
      values: [0, 1]
      meaning: ["disabled", "available"]

- id: player_restart
  type: event
  description: "Component finished powering up and is ready for input"

- id: ui_state
  type: composite
  description: "Current screen, popup, dialog, and screen saver state"
  fields:
    - name: screen
      values: ["00", "01", "02", "03", "04", "07", "08", "09", "10", "11", "12", "14", "15", "16", "18"]
      meaning: ["Unknown", "Movie List", "Movie Collections", "Movie Covers", "Parental Control", "Playing movie", "System Status", "Music List", "Music Covers", "Music Collections", "Music Now Playing", "Vault Summary", "System Settings", "Movie Store", "Library search"]
    - name: popup
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]
    - name: dialog
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]
    - name: saver
      values: [0, 1]
      meaning: ["inactive", "active"]

- id: system_readiness_state
  type: enum
  values: [0, 1, 2]
  meaning: ["ready", "becoming ready", "idle"]

- id: play_status
  type: composite
  description: "Movie playback status"
  fields:
    - name: mode
      values: [0, 1, 2, 4, 6]
      meaning: ["nothing playing", "paused", "playing", "forward scan", "reverse scan"]
    - name: speed
      type: integer
    - name: title_num
      type: integer
    - name: title_length
      type: integer
      unit: seconds
    - name: title_loc
      type: integer
      unit: seconds
    - name: chap_num
      type: integer
    - name: chap_length
      type: integer
      unit: seconds
    - name: chap_loc
      type: integer
      unit: seconds

- id: music_play_status
  type: composite
  description: "Music playback status"
  fields:
    - name: mode
      values: [1, 2, 4, 6]
      meaning: ["paused", "playing", "fast forward", "fast reverse"]
    - name: speed
      type: integer
    - name: length
      type: integer
      unit: seconds
    - name: position
      type: string
    - name: progress
      type: string

- id: music_now_playing_status
  type: composite
  fields:
    - name: total
      type: integer
    - name: location
      type: integer
    - name: repeat
      values: [0, 1]
    - name: random
      values: [0, 1]
    - name: generation
      type: integer
    - name: now_playing_handle
      type: string

- id: music_title
  type: composite
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

- id: title_name
  type: string
  description: "Title of currently playing movie"

- id: movie_media_type
  type: enum
  values: ["00", "01", "02", "03"]
  meaning: ["No media", "DVD", "Video stream", "Blu-ray Disc"]

- id: movie_location
  type: enum
  values: ["00", "03", "04", "05", "06"]
  meaning: ["Unknown/interface", "Main content", "Intermission", "End credits", "Disc menu"]

- id: video_mode
  type: composite
  fields:
    - name: composite
      type: integer
    - name: component
      type: integer
    - name: hdmi
      type: integer

- id: video_color
  type: composite
  fields:
    - name: eotf
      values: ["00", "01", "03", "05", "06"]
    - name: color_space
      values: ["00", "01", "02", "03", "04"]
    - name: color_depth
      values: [24, 30, 36]
    - name: color_sampling
      values: ["00", "01", "02", "03", "04"]

- id: screen_mask
  type: composite
  fields:
    - name: image_ratio
      values: ["00", "01", "02", "03", "04", "05"]
    - name: top_trim_rel
      type: string
    - name: bottom_trim_rel
      type: string
    - name: conservative_ratio
      type: string
    - name: top_mask_abs
      type: integer
    - name: bottom_mask_abs
      type: integer

- id: cinemascape_mask
  type: integer
  description: "Frame ratio in hundredths (133, 166, 178, 237, 240)"

- id: cinemascape_mode
  type: enum
  values: [0, 1, 2, 3]
  meaning: ["Off", "2.35 Anamorphic", "2.35 Letterbox", "Native 2.35 Display"]

- id: highlighted_selection
  type: string
  description: "Handle of currently highlighted item"

- id: camera_angle
  type: composite
  fields:
    - name: cur_angle
      type: integer
    - name: num_angles
      type: integer
    - name: in_angle_block
      values: [0, 1]

- id: child_mode_state
  type: enum
  values: [0, 1]
  meaning: ["inactive", "active"]

- id: user_defined_event
  type: string
  description: "Custom event message from scripts, child UI, or SEND_EVENT"

- id: user_input
  type: composite
  fields:
    - name: type
      values: ["00", "01", "02"]
      meaning: ["No prompt", "Alphanumeric", "Numeric"]
    - name: prompt
      type: string
    - name: entry
      type: string

- id: available_devices
  type: list
  description: "List of CPDIDs for available components"

- id: device_type_name
  type: string

- id: num_zones
  type: composite
  fields:
    - name: num_movie_zones
      type: integer
    - name: num_music_zones
      type: integer

- id: system_version
  type: composite
  fields:
    - name: control_protocol_version
      type: integer
    - name: kos_version
      type: string

- id: device_info
  type: composite
  fields:
    - name: device_type
      type: integer
    - name: serial_num
      type: string
    - name: cpdid
      type: string
    - name: ip_address
      type: string

- id: content_details
  type: composite
  description: "Multi-line response with title, rating, year, actors, etc."

- id: playing_music_information
  type: composite
  fields:
    - name: handle
      type: string
    - name: label
      type: string

- id: music_preset_information
  type: composite
  fields:
    - name: tag
      type: string
    - name: handle
      type: string
    - name: label
      type: string

- id: network_settings
  type: composite
  fields:
    - name: static
      values: [0, 1]
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
  type: composite
  fields:
    - name: movies
      values: [Y, N]
    - name: music
      values: [Y, N]
    - name: product_line
      values: [Y, N]
      meaning: ["Premiere", "Strato"]

- id: status_cue_period
  type: integer
  description: "Current status update period in seconds"
```

## Variables
```yaml
- id: controlled_zone
  type: string
  description: "Currently controlled music zone (serial.zone format)"
  access: read_write

- id: cinemascape_mode
  type: integer
  description: "CinemaScape mode (0-3)"
  access: read_write

- id: screen_mask_flag
  type: integer
  description: "Masking compensation flag (0 or 1)"
  access: write_only

- id: friendly_name
  type: string
  description: "Friendly name for the zone or component"
  access: read_write

- id: network_settings
  type: composite
  access: read_write
```

## Events
```yaml
- id: device_power_state_event
  description: "Unsolicited event when power state changes"

- id: player_restart_event
  description: "Component finished powering up"

- id: ui_state_event
  description: "UI screen/popup/dialog state changed"

- id: highlighted_selection_event
  description: "Highlighted item changed"

- id: system_readiness_state_event
  description: "Idle mode changed"

- id: available_devices_event
  description: "List of available components changed"

- id: play_status_event
  description: "Movie playback status update (period per SET_STATUS_CUE_PERIOD)"

- id: music_play_status_event
  description: "Music playback status update"

- id: music_now_playing_status_event
  description: "Music now-playing list changed"

- id: music_title_event
  description: "Music track changed"

- id: title_name_event
  description: "Movie title changed"

- id: movie_media_type_event
  description: "Media type changed"

- id: movie_location_event
  description: "Movie playback location changed"

- id: video_mode_event
  description: "Video output mode changed"

- id: video_color_event
  description: "Video color properties changed"

- id: screen_mask_event
  description: "Screen mask position changed"

- id: cinemascape_mask_event
  description: "CinemaScape mask ratio changed"

- id: child_mode_state_event
  description: "Child UI mode changed"

- id: user_defined_event
  description: "Custom event from script, child UI, remote volume, or SEND_EVENT"

- id: user_input_event
  description: "User input prompt state changed"

- id: playing_music_information_event
  description: "Currently playing music info changed"

- id: music_preset_information_event
  description: "Music preset assigned or changed"
```

## Macros
```yaml
# UNRESOLVED: source describes PLAY_SCRIPT command to execute named scripts,
# but does not enumerate available scripts or script step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: BLURAY_SPECIAL_STOP
    warning: "Can trap user on disc-authored special features. Controller must provide mechanism to return to Kaleidescape menu."
  - command: ENTER_STANDBY
    warning: "TCP/IP connection may be temporarily dropped on some player types. Controller should reconnect after 30 seconds."
  - command: LEAVE_STANDBY
    warning: "TCP/IP connection may be temporarily dropped on some player types. Wait 15 seconds before reconnecting."
# UNRESOLVED: no explicit safety interlock sequences documented in source
```

## Notes
- Protocol message format: `device_id/seq/message_body[/checksum]` — segments separated by `/`, fields by `:`, terminated by CR or LF.
- Up to 20 simultaneous TCP/IP connections per component.
- CPDID 01 is always the directly connected component. CPDIDs 02–99 enable command routing to other components.
- Serial number addressing uses `#` prefix (e.g., `#144B`).
- Music zones append `.xx` to device ID (e.g., `01.02`).
- Sequence numbers 0–9 for commands/responses, `!` for events, `?` for garbled messages.
- Checksum optional in commands, always present in responses/events. Modulo-100 sum of ASCII values.
- Binary delimiters (SOH/STX/EOT) available via `SET_PROTOCOL_SETTINGS` for TCP only.
- Character set: printable ISO 8859-1 (Latin-1). Special chars escaped with `\`.
- After component restart, resend session-critical commands (e.g., `SET_SCREEN_MASK`, `SET_STATUS_CUE_PERIOD`).
- `GET_TIME` useful as keepalive probe — no side effects.
- `DEVICE_POWER_STATE` event may be missed if TCP connection dropped during standby transitions.
- Player serial default baud: 19200. Server default: 115200.
- Control protocol version 18 (document revision 101-0005 Rev 16, July 2024).

<!-- UNRESOLVED: M700-specific power behavior not distinguished from general Player class -->
<!-- UNRESOLVED: maximum concurrent TCP/IP session behavior for M700 specifically -->
<!-- UNRESOLVED: firmware version compatibility range for M700 -->
<!-- UNRESOLVED: RS-232 pinout specific to M700 physical connector -->
<!-- UNRESOLVED: BROWSE protocol detail fields for browse_result sub-parameters -->

## Provenance

```yaml
source_domains:
  - kaleidescape.com
  - support.kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/Kaleidescape-System-Control-Protocol-Reference-Manual.pdf
  - https://support.kaleidescape.com/support/article/Control-Protocol-Reference-Manual
  - https://www.kaleidescape.com/support/article/Kaleidescape-Control-Commands
  - https://www.kaleidescape.com/wp-content/uploads/kaleidescape-programming-manual-for-crestron.pdf
retrieved_at: 2026-05-21T03:02:18.647Z
last_checked_at: 2026-06-09T11:54:28.528Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T11:54:28.528Z
matched_actions: 202
action_count: 202
confidence: medium
summary: "All 202 spec actions match verbatim source commands and all transport parameters are confirmed; one deprecated legacy alias GET_PROTOCOL_VERSION is in the source but not the spec. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- GET_PROTOCOL_VERSION
- "paging/skip commands (PAGE_DOWN_OR_NEXT, PAGE_UP_OR_PREVIOUS, etc.)"
- "source describes PLAY_SCRIPT command to execute named scripts,"
- "no explicit safety interlock sequences documented in source"
- "M700-specific power behavior not distinguished from general Player class"
- "maximum concurrent TCP/IP session behavior for M700 specifically"
- "firmware version compatibility range for M700"
- "RS-232 pinout specific to M700 physical connector"
- "BROWSE protocol detail fields for browse_result sub-parameters"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
