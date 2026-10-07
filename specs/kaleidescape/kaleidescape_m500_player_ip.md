---
spec_id: admin/kaleidescape_inc-m500-player
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kaleidescape, Inc. M500 Player Control Spec"
manufacturer: Kaleidescape
model_family: "M500 Player"
aliases: []
compatible_with:
  manufacturers:
    - Kaleidescape
    - "Kaleidescape, Inc."
  models:
    - "M500 Player"
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
retrieved_at: 2026-05-21T19:52:35.323Z
last_checked_at: 2026-10-07T21:02:16.989Z
generated_at: 2026-10-07T21:02:16.989Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "M500-specific feature limitations not differentiated from general Kaleidescape protocol"
  - "no standalone variables - all parameters are command arguments"
  - "no multi-step macros explicitly documented as sequences"
  - "no safety interlock procedures stated in source"
  - "M500-specific firmware compatibility range not stated"
  - "voltage/current/power specs not in source"
  - "fault behavior and error recovery sequences not documented"
verification:
  verdict: verified
  checked_at: 2026-10-07T21:02:16.989Z
  matched_actions: 246
  action_count: 246
  confidence: medium
  summary: "All 246 action units match literal source commands, serial and TCP transport values are stated in the source, and no uncovered commands remain. The source never names the M500 model, so applicability is assumed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Kaleidescape, Inc. M500 Player Control Spec

## Summary

Kaleidescape M500 Player is a movie and music playback device supporting both TCP/IP (port 10000) and RS-232 serial control. The control protocol is ASCII text-based with slash-delimited message segments. 
<!-- UNRESOLVED: M500-specific feature limitations not differentiated from general Kaleidescape protocol -->

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
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable
- queryable
- routable
```

## Actions
```yaml
- id: enter_standby
  label: Enter Standby
  kind: action
  params: []

- id: leave_standby
  label: Leave Standby
  kind: action
  params: []

- id: get_device_power_state
  label: Get Device Power State
  kind: action
  params: []

- id: get_system_readiness_state
  label: Get System Readiness State
  kind: action
  params: []

- id: leave_idle_mode
  label: Leave Idle Mode
  kind: action
  params: []

- id: get_available_devices
  label: Get Available Devices
  kind: action
  params: []

- id: get_available_devices_by_serial_number
  label: Get Available Devices By Serial Number
  kind: action
  params: []

- id: get_device_type_name
  label: Get Device Type Name
  kind: action
  params: []

- id: get_num_zones
  label: Get Number of Zones
  kind: action
  params: []

- id: get_system_version
  label: Get System Version
  kind: action
  params: []

- id: get_protocol
  label: Get Protocol
  kind: action
  params: []

- id: set_protocol_settings
  label: Set Protocol Settings
  kind: action
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
  params:
    - name: version
      type: string
      description: Protocol version number

- id: get_active_protocol
  label: Get Active Protocol
  kind: action
  params: []

- id: enable_events
  label: Enable Events
  kind: action
  params:
    - name: target_device_id
      type: string
      description: CPDID or serial number

- id: disable_events
  label: Disable Events
  kind: action
  params:
    - name: target_device_id
      type: string
      description: CPDID

- id: get_device_info
  label: Get Device Info
  kind: action
  params: []

- id: send_to_syslog
  label: Send to Syslog
  kind: action
  params:
    - name: message
      type: string
      description: Log message

- id: get_friendly_name
  label: Get Friendly Name
  kind: action
  params: []

- id: set_friendly_name
  label: Set Friendly Name
  kind: action
  params:
    - name: name
      type: string
      description: Friendly name to assign

- id: get_friendly_system_name
  label: Get Friendly System Name
  kind: action
  params: []

- id: up
  label: Up
  kind: action
  params: []

- id: down
  label: Down
  kind: action
  params: []

- id: left
  label: Left
  kind: action
  params: []

- id: right
  label: Right
  kind: action
  params: []

- id: select
  label: Select
  kind: action
  params: []

- id: back
  label: Back
  kind: action
  params: []

- id: page_up
  label: Page Up
  kind: action
  params: []

- id: page_down
  label: Page Down
  kind: action
  params: []

- id: go_movies
  label: Go to Movies
  kind: action
  params: []

- id: go_movie_list
  label: Go to Movie List
  kind: action
  params: []

- id: go_movie_covers
  label: Go to Movie Covers
  kind: action
  params: []

- id: go_movie_collections
  label: Go to Movie Collections
  kind: action
  params: []

- id: go_movie_collection
  label: Go to Movie Collection
  kind: action
  params:
    - name: collection_name
      type: string

- id: go_music
  label: Go to Music
  kind: action
  params: []

- id: go_music_list
  label: Go to Music List
  kind: action
  params: []

- id: go_music_covers
  label: Go to Music Covers
  kind: action
  params: []

- id: go_music_collections
  label: Go to Music Collections
  kind: action
  params: []

- id: go_music_collection
  label: Go to Music Collection
  kind: action
  params:
    - name: collection_name
      type: string

- id: go_now_playing
  label: Go to Now Playing
  kind: action
  params: []

- id: go_movie_store
  label: Go to Movie Store
  kind: action
  params: []

- id: go_system_status
  label: Go to System Status
  kind: action
  params: []

- id: go_parental_control
  label: Go to Parental Control
  kind: action
  params: []

- id: go_vault_summary
  label: Go to Vault Summary
  kind: action
  params: []

- id: play
  label: Play
  kind: action
  params: []

- id: pause
  label: Pause
  kind: action
  params: []

- id: pause_on
  label: Pause On
  kind: action
  params: []

- id: pause_off
  label: Pause Off
  kind: action
  params: []

- id: play_or_pause
  label: Play or Pause
  kind: action
  params: []

- id: stop
  label: Stop
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

- id: set_status_cue_period
  label: Set Status Cue Period
  kind: action
  params:
    - name: period
      type: integer
      description: Seconds between status updates (0 = off, 1 = every second)

- id: get_play_status
  label: Get Play Status
  kind: action
  params: []

- id: get_playing_title_name
  label: Get Playing Title Name
  kind: action
  params: []

- id: get_movie_media_type
  label: Get Movie Media Type
  kind: action
  params: []

- id: get_movie_location
  label: Get Movie Location
  kind: action
  params: []

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

- id: stop_or_cancel
  label: Stop or Cancel
  kind: action
  params: []

- id: disc_in_tray_toggle
  label: Disc In Tray Toggle
  kind: action
  params: []

- id: get_ui_state
  label: Get UI State
  kind: action
  params: []

- id: get_content_details
  label: Get Content Details
  kind: action
  params:
    - name: handle
      type: string
    - name: passcode
      type: string

- id: get_highlighted_selection
  label: Get Highlighted Selection
  kind: action
  params: []

- id: go_screen_saver
  label: Go to Screen Saver
  kind: action
  params: []

- id: stop_screen_saver
  label: Stop Screen Saver
  kind: action
  params: []

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

- id: details
  label: Details
  kind: action
  params: []

- id: get_user_input
  label: Get User Input
  kind: action
  params: []

- id: get_user_input_prompt
  label: Get User Input Prompt
  kind: action
  params: []

- id: set_user_input_entry
  label: Set User Input Entry
  kind: action
  params:
    - name: string
      type: string

- id: keyboard_character
  label: Keyboard Character
  kind: action
  params:
    - name: character
      type: string

- id: keyboard_literal
  label: Keyboard Literal
  kind: action
  params:
    - name: character
      type: string

- id: backspace
  label: Backspace
  kind: action
  params: []

- id: filter_list
  label: Filter List
  kind: action
  params: []

- id: go_search
  label: Go to Search
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

- id: safe_level
  label: Safe Level
  kind: action
  params: []

- id: child_play
  label: Child Play
  kind: action
  params: []

- id: child_pause
  label: Child Pause
  kind: action
  params: []

- id: child_stop
  label: Child Stop
  kind: action
  params: []

- id: get_music_now_playing_status
  label: Get Music Now Playing Status
  kind: action
  params: []

- id: get_music_play_status
  label: Get Music Play Status
  kind: action
  params: []

- id: get_music_title
  label: Get Music Title
  kind: action
  params: []

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

- id: get_controlled_zone
  label: Get Controlled Zone
  kind: action
  params: []

- id: set_controlled_zone
  label: Set Controlled Zone
  kind: action
  params:
    - name: serial_number
      type: string
    - name: zone
      type: string

- id: start_chapter_entry
  label: Start Chapter Entry
  kind: action
  params: []

- id: start_disc_title_entry
  label: Start Disc Title Entry
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

- id: set_favorite_scene_start
  label: Set Favorite Scene Start
  kind: action
  params: []

- id: set_favorite_scene_end
  label: Set Favorite Scene End
  kind: action
  params: []

- id: start_send_number_to_disc_entry
  label: Start Send Number to Disc Entry
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

- id: get_camera_angle
  label: Get Camera Angle
  kind: action
  params: []

- id: red
  label: Red Button
  kind: action
  params: []

- id: green
  label: Green Button
  kind: action
  params: []

- id: blue
  label: Blue Button
  kind: action
  params: []

- id: yellow
  label: Yellow Button
  kind: action
  params: []

- id: bluray_special_stop
  label: Blu-ray Special Stop
  kind: action
  params: []

- id: bluray_popup_menu_toggle
  label: Blu-ray Popup Menu Toggle
  kind: action
  params: []

- id: disc_or_kaleidescape_menu
  label: Disc or Kaleidescape Menu
  kind: action
  params: []

- id: browse
  label: Browse
  kind: action
  params:
    - name: browse_handle
      type: string
    - name: passcode
      type: string
    - name: lines
      type: string
    - name: flags
      type: string

- id: perform_action
  label: Perform Action
  kind: action
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
  params:
    - name: collection
      type: string

- id: play_next_in_music_collection
  label: Play Next in Music Collection
  kind: action
  params:
    - name: collection
      type: string

- id: play_previous_in_music_collection
  label: Play Previous in Music Collection
  kind: action
  params:
    - name: collection
      type: string

- id: assign_playing_music_to_preset
  label: Assign Playing Music to Preset
  kind: action
  params:
    - name: tag
      type: string

- id: play_music_preset
  label: Play Music Preset
  kind: action
  params:
    - name: tag
      type: string

- id: get_music_preset_information
  label: Get Music Preset Information
  kind: action
  params:
    - name: tag
      type: string

- id: get_playing_music_information
  label: Get Playing Music Information
  kind: action
  params: []

- id: go_calibrate_masking
  label: Go to Calibrate Masking
  kind: action
  params: []

- id: go_calibrate_masking_overscan
  label: Go to Calibrate Masking Overscan
  kind: action
  params: []

- id: get_cinemascape_mask
  label: Get CinemaScape Mask
  kind: action
  params: []

- id: get_screen_mask
  label: Get Screen Mask
  kind: action
  params: []

- id: get_screen_mask2
  label: Get Screen Mask 2
  kind: action
  params: []

- id: set_screen_mask
  label: Set Screen Mask
  kind: action
  params:
    - name: flag
      type: integer
      description: "0 = no compensation, 1 = compensate for masking"

- id: get_video_mode
  label: Get Video Mode
  kind: action
  params: []

- id: get_video_color
  label: Get Video Color
  kind: action
  params: []

- id: get_content_color
  label: Get Content Color
  kind: action
  params: []

- id: get_cinemascape_mode
  label: Get CinemaScape Mode
  kind: action
  params: []

- id: set_cinemascape_mode
  label: Set CinemaScape Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = off, 1 = CinemaScape 2.35 Anamorphic, 2 = Letterbox, 3 = Native"

- id: get_scale_mode
  label: Get Scale Mode
  kind: action
  params: []

- id: play_script
  label: Play Script
  kind: action
  params:
    - name: script_name
      type: string

- id: send_event
  label: Send Event
  kind: action
  params:
    - name: message
      type: string

- id: get_child_mode_state
  label: Get Child Mode State
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

- id: get_network_settings
  label: Get Network Settings
  kind: action
  params: []

- id: set_network_settings
  label: Set Network Settings
  kind: action
  params:
    - name: static
      type: integer
      description: "0 = DHCP, 1 = static"
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
  kind: action
  params: []

- id: get_zone_capabilities
  label: Get Zone Capabilities
  kind: action
  params: []

- id: get_time
  label: Get Time
  kind: action
  params: []

- id: up_press
  label: Up Press
  kind: action
  params: []

- id: up_release
  label: Up Release
  kind: action
  params: []

- id: down_press
  label: Down Press
  kind: action
  params: []

- id: down_release
  label: Down Release
  kind: action
  params: []

- id: left_press
  label: Left Press
  kind: action
  params: []

- id: left_release
  label: Left Release
  kind: action
  params: []

- id: right_press
  label: Right Press
  kind: action
  params: []

- id: right_release
  label: Right Release
  kind: action
  params: []

- id: child_up
  label: Child Up
  kind: action
  params: []

- id: child_up_press
  label: Child Up Press
  kind: action
  params: []

- id: child_up_release
  label: Child Up Release
  kind: action
  params: []

- id: child_down
  label: Child Down
  kind: action
  params: []

- id: child_down_press
  label: Child Down Press
  kind: action
  params: []

- id: child_down_release
  label: Child Down Release
  kind: action
  params: []

- id: child_left
  label: Child Left
  kind: action
  params: []

- id: child_left_press
  label: Child Left Press
  kind: action
  params: []

- id: child_left_release
  label: Child Left Release
  kind: action
  params: []

- id: child_right
  label: Child Right
  kind: action
  params: []

- id: child_right_press
  label: Child Right Press
  kind: action
  params: []

- id: child_right_release
  label: Child Right Release
  kind: action
  params: []

- id: page_up_press
  label: Page Up Press
  kind: action
  params: []

- id: page_up_release
  label: Page Up Release
  kind: action
  params: []

- id: page_down_press
  label: Page Down Press
  kind: action
  params: []

- id: page_down_release
  label: Page Down Release
  kind: action
  params: []

- id: red_press
  label: Red Press
  kind: action
  params: []

- id: red_release
  label: Red Release
  kind: action
  params: []

- id: green_press
  label: Green Press
  kind: action
  params: []

- id: green_release
  label: Green Release
  kind: action
  params: []

- id: blue_press
  label: Blue Press
  kind: action
  params: []

- id: blue_release
  label: Blue Release
  kind: action
  params: []

- id: yellow_press
  label: Yellow Press
  kind: action
  params: []

- id: yellow_release
  label: Yellow Release
  kind: action
  params: []

- id: page_down_or_next
  label: Page Down or Next
  kind: action
  params: []

- id: page_down_or_next_press
  label: Page Down or Next Press
  kind: action
  params: []

- id: page_down_or_next_release
  label: Page Down or Next Release
  kind: action
  params: []

- id: page_down_or_previous
  label: Page Down or Previous
  kind: action
  params: []

- id: page_down_or_previous_press
  label: Page Down or Previous Press
  kind: action
  params: []

- id: page_down_or_previous_release
  label: Page Down or Previous Release
  kind: action
  params: []

- id: page_up_or_next
  label: Page Up or Next
  kind: action
  params: []

- id: page_up_or_next_press
  label: Page Up or Next Press
  kind: action
  params: []

- id: page_up_or_next_release
  label: Page Up or Next Release
  kind: action
  params: []

- id: page_up_or_previous
  label: Page Up or Previous
  kind: action
  params: []

- id: page_up_or_previous_press
  label: Page Up or Previous Press
  kind: action
  params: []

- id: page_up_or_previous_release
  label: Page Up or Previous Release
  kind: action
  params: []

- id: position_select
  label: Position Select
  kind: action
  params:
    - name: x_loc
      type: integer
      description: Can be any ASCII decimal integers from 0 to 2 billion.
    - name: y_loc
      type: integer
      description: Can be any ASCII decimal integers from 0 to 2 billion.

- id: child_select
  label: Child Select
  kind: action
  params: []

- id: child_pause_on
  label: Child Pause On
  kind: action
  params: []

- id: child_pause_off
  label: Child Pause Off
  kind: action
  params: []

- id: get_protocol_version
  label: Get Protocol Version
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: device_power_state
  label: Device Power State
  query_command: GET_DEVICE_POWER_STATE
  type: object
  fields:
    - name: power_state
      type: enum
      values: [0, 1]
      description: "0 = standby, 1 = powered on"
    - name: zone_states
      type: array
      description: "Zone availability: 0 = disabled, 1 = available"

- id: device_power_state_event
  label: Device Power State Event
  type: object
  fields:
    - name: power_state
      type: enum
      values: [0, 1]
    - name: zone_states
      type: array

- id: system_readiness_state
  label: System Readiness State
  query_command: GET_SYSTEM_READINESS_STATE
  type: enum
  values: [0, 1, 2]
  description: "0 = ready, 1 = becoming ready, 2 = idle"

- id: available_devices
  label: Available Devices
  query_command: GET_AVAILABLE_DEVICES
  type: array
  description: List of CPDID numbers

- id: available_devices_by_serial_number
  label: Available Devices By Serial Number
  query_command: GET_AVAILABLE_DEVICES_BY_SERIAL_NUMBER
  type: array
  description: List of serial numbers (12 hex digits)

- id: device_type_name
  label: Device Type Name
  query_command: GET_DEVICE_TYPE_NAME
  type: string
  description: "Server, Cinema One, Strato, Strato V, Alto, Terra Movie Server, Player, Music Player, or Disc Vault"

- id: num_zones
  label: Number of Zones
  query_command: GET_NUM_ZONES
  type: object
  fields:
    - name: num_movie_zones
      type: integer
    - name: num_music_zones
      type: integer

- id: system_version
  label: System Version
  query_command: GET_SYSTEM_VERSION
  type: object
  fields:
    - name: control_protocol_version
      type: string
    - name: kos_version
      type: string

- id: protocol
  label: Protocol Version
  query_command: GET_PROTOCOL
  type: string

- id: active_protocol
  label: Active Protocol Version
  query_command: GET_ACTIVE_PROTOCOL
  type: string

- id: device_info
  label: Device Info
  query_command: GET_DEVICE_INFO
  type: object
  fields:
    - name: device_type
      type: string
    - name: serial_num
      type: string
    - name: cpdid
      type: string
    - name: ip_address
      type: string

- id: friendly_name
  label: Friendly Name
  query_command: GET_FRIENDLY_NAME
  type: string

- id: friendly_system_name
  label: Friendly System Name
  query_command: GET_FRIENDLY_SYSTEM_NAME
  type: string

- id: ui_state
  label: UI State
  query_command: GET_UI_STATE
  type: object
  fields:
    - name: screen
      type: integer
      description: "00=Unknown, 01=Movie List, 02=Collections, 03=Covers, 04=Parental, 07=Playing, 08=System Status, 09=Music List, 10=Music Covers, 11=Music Collections, 12=Now Playing, 14=Vault Summary, 15=System Settings, 16=Movie Store, 18=Library search"
    - name: popup
      type: integer
      description: "00=None, 01=Details, 02=Status overlay, 03=Non-status overlay"
    - name: dialog
      type: integer
      description: Dialog type code
    - name: saver
      type: integer
      description: "0=inactive, 1=active"

- id: play_status
  label: Play Status
  query_command: GET_PLAY_STATUS
  type: object
  fields:
    - name: mode
      type: integer
      description: "0=nothing, 1=paused, 2=playing, 4=forward scan, 6=reverse scan"
    - name: speed
      type: integer
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

- id: title_name
  label: Title Name
  query_command: GET_PLAYING_TITLE_NAME
  type: string

- id: movie_media_type
  label: Movie Media Type
  query_command: GET_MOVIE_MEDIA_TYPE
  type: enum
  values: ["00", "01", "02", "03"]
  description: "00=None, 01=DVD, 02=Stream, 03=Blu-ray"

- id: movie_location
  label: Movie Location
  query_command: GET_MOVIE_LOCATION
  type: enum
  values: ["00", "03", "04", "05", "06"]
  description: "00=Interface/unknown, 03=Main content, 04=Intermission, 05=End credits, 06=Disc menu"

- id: music_now_playing_status
  label: Music Now Playing Status
  query_command: GET_MUSIC_NOW_PLAYING_STATUS
  type: object
  fields:
    - name: total
      type: string
    - name: location
      type: string
    - name: repeat
      type: integer
    - name: random
      type: integer
    - name: generation
      type: string
    - name: now_playing_handle
      type: string

- id: music_play_status
  label: Music Play Status
  query_command: GET_MUSIC_PLAY_STATUS
  type: object
  fields:
    - name: mode
      type: integer
    - name: speed
      type: integer
    - name: length
      type: string
    - name: position
      type: string
    - name: progress
      type: string

- id: music_title
  label: Music Title
  query_command: GET_MUSIC_TITLE
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

- id: playing_music_information
  label: Playing Music Information
  query_command: GET_PLAYING_MUSIC_INFORMATION
  type: object
  fields:
    - name: handle
      type: string
    - name: label
      type: string

- id: controlled_zone
  label: Controlled Zone
  query_command: GET_CONTROLLED_ZONE
  type: string

- id: user_input
  label: User Input
  query_command: GET_USER_INPUT
  type: object
  fields:
    - name: type
      type: integer
    - name: prompt
      type: string
    - name: entry
      type: string

- id: highlighted_selection
  label: Highlighted Selection
  query_command: GET_HIGHLIGHTED_SELECTION
  type: string

- id: content_details_overview
  label: Content Details Overview
  query_command: GET_CONTENT_DETAILS
  type: object
  fields:
    - name: num_lines
      type: integer
    - name: handle
      type: string
    - name: table
      type: string

- id: content_details
  label: Content Details
  query_command: GET_CONTENT_DETAILS
  type: object
  fields:
    - name: line
      type: integer
    - name: name
      type: string
    - name: value
      type: string

- id: video_mode
  label: Video Mode
  query_command: GET_VIDEO_MODE
  type: object
  fields:
    - name: composite
      type: string
    - name: component
      type: string
    - name: hdmi
      type: string

- id: video_color
  label: Video Color
  query_command: GET_VIDEO_COLOR
  type: object
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
  query_command: GET_CONTENT_COLOR
  type: object
  fields:
    - name: eotf
      type: string
    - name: color_space
      type: string
    - name: color_depth
      type: string
    - name: color_sampling
      type: string

- id: cinema_scape_mode
  label: CinemaScape Mode
  query_command: GET_CINEMASCAPE_MODE
  type: enum
  values: [0, 1, 2, 3]

- id: cinema_scape_mask
  label: CinemaScape Mask
  query_command: GET_CINEMASCAPE_MASK
  type: string

- id: screen_mask
  label: Screen Mask
  query_command: GET_SCREEN_MASK
  type: object
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
  label: Screen Mask 2
  query_command: GET_SCREEN_MASK2
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

- id: scale_mode
  label: Scale Mode
  query_command: GET_SCALE_MODE
  type: enum
  values: [0, 1, 3]

- id: camera_angle
  label: Camera Angle
  query_command: GET_CAMERA_ANGLE
  type: object
  fields:
    - name: cur_angle
      type: integer
    - name: num_angles
      type: integer
    - name: in_angle_block
      type: integer

- id: child_mode_state
  label: Child Mode State
  query_command: GET_CHILD_MODE_STATE
  type: enum
  values: [0, 1]

- id: network_settings
  label: Network Settings
  query_command: GET_NETWORK_SETTINGS
  type: object
  fields:
    - name: static
      type: integer
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
  query_command: GET_SYSTEM_CAPABILITIES
  type: object
  fields:
    - name: movies
      type: string
    - name: music
      type: string
    - name: product_line
      type: string

- id: zone_capabilities
  label: Zone Capabilities
  query_command: GET_ZONE_CAPABILITIES
  type: object
  fields:
    - name: osd
      type: string
    - name: movies
      type: string
    - name: music
      type: string
    - name: store
      type: string
    - name: search
      type: string
    - name: library_type
      type: string
    - name: osd_generation
      type: string

- id: time
  label: Time
  query_command: GET_TIME
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
    - name: mm
      type: string
    - name: ss
      type: string
    - name: timezone
      type: string

- id: status_cue_period
  label: Status Cue Period
  type: string

- id: user_defined_event
  label: User Defined Event
  type: string

- id: action_performed
  label: Action Performed
  type: string

- id: music_preset_information
  label: Music Preset Information
  query_command: GET_MUSIC_PRESET_INFORMATION
  type: object
  fields:
    - name: tag
      type: string
    - name: handle
      type: string
    - name: label
      type: string

- id: browse_results_overview
  label: Browse Results Overview
  query_command: BROWSE
  type: object
  fields:
    - name: browse_handle
      type: string
    - name: title
      type: string
    - name: response_lines
      type: string
    - name: total_lines
      type: string
    - name: first_line_index
      type: integer
    - name: playing_line_index
      type: integer

- id: browse_result
  label: Browse Result
  query_command: BROWSE
  type: string

- id: error
  label: Error
  type: object
  fields:
    - name: code
      type: string
    - name: message
      type: string
```

## Variables
```yaml
# UNRESOLVED: no standalone variables - all parameters are command arguments
```

## Events
```yaml
- id: player_restart
  label: Player Restart
  description: Generated after power on or LEAVE_STANDBY when component is ready

- id: device_power_state_event
  label: Device Power State Changed
  description: Generated when power state changes

- id: system_readiness_state_event
  label: System Readiness State Changed
  description: Generated when idle mode changes (Strato, Cinema One 2nd gen)

- id: available_devices_event
  label: Available Devices Changed
  description: Generated when list of available components changes

- id: ui_state_event
  label: UI State Changed
  description: Generated when screen, popup, dialog, or saver state changes

- id: play_status_event
  label: Play Status Changed
  description: Generated during playback when SET_STATUS_CUE_PERIOD > 0

- id: title_name_event
  label: Title Name Changed
  description: Generated when currently playing title changes

- id: movie_media_type_event
  label: Movie Media Type Changed
  description: Generated when media type changes

- id: movie_location_event
  label: Movie Location Changed
  description: Generated when location changes

- id: highlighted_selection_event
  label: Highlighted Selection Changed
  description: Generated when user selection changes

- id: music_now_playing_status_event
  label: Music Now Playing Status Changed
  description: Generated when music playback state changes

- id: music_play_status_event
  label: Music Play Status Changed
  description: Generated when music play state changes

- id: user_input_event
  label: User Input Changed
  description: Generated when user enters text

- id: user_defined_event
  label: User Defined Event
  description: Generated by scripts, child UI activation, volume buttons, SEND_EVENT

- id: child_mode_state_event
  label: Child Mode State Changed
  description: Generated when child UI mode changes

- id: video_mode_event
  label: Video Mode Changed
  description: Generated when video output mode changes

- id: video_color_event
  label: Video Color Changed
  description: Generated when color settings change

- id: cinema_scape_mode_event
  label: CinemaScape Mode Changed
  description: Generated when CinemaScape mode changes

- id: cinema_scape_mask_event
  label: CinemaScape Mask Changed
  description: Generated when CinemaScape mask changes

- id: screen_mask_event
  label: Screen Mask Changed
  description: Generated when screen mask changes

- id: music_title_event
  label: Music Title Changed
  description: Generated when track info changes

- id: controlled_zone_event
  label: Controlled Zone Changed
  description: Generated when controlled zone changes

- id: content_color_event
  label: Content Color Changed
  description: Generated when content color info changes
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros explicitly documented as sequences
```

## Safety
```yaml
confirmation_required_for:
  - bluray_special_stop  # CAUTION: can trap user in disc special features
interlocks: []
# UNRESOLVED: no safety interlock procedures stated in source
```

## Notes
- TCP/IP connections limited to 20 simultaneous sessions per component
- TCP port 10000
- Serial does not echo characters; terminal emulators should enable local echo
- Checksums not applicable over TCP (TCP has built-in error handling)
- Binary delimiters not supported for RS-232 control
- Component types: Server, Cinema One, Strato, Strato V, Alto, Terra Movie Server, Player, Music Player, Disc Vault
- M500 is a Player-class device; serial baud rate 19200 per Table 2

<!-- UNRESOLVED: M500-specific firmware compatibility range not stated -->
<!-- UNRESOLVED: voltage/current/power specs not in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented -->

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
retrieved_at: 2026-05-21T19:52:35.323Z
last_checked_at: 2026-10-07T21:02:16.989Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:02:16.989Z
matched_actions: 246
action_count: 246
confidence: medium
summary: "All 246 action units match literal source commands, serial and TCP transport values are stated in the source, and no uncovered commands remain. The source never names the M500 model, so applicability is assumed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "M500-specific feature limitations not differentiated from general Kaleidescape protocol"
- "no standalone variables - all parameters are command arguments"
- "no multi-step macros explicitly documented as sequences"
- "no safety interlock procedures stated in source"
- "M500-specific firmware compatibility range not stated"
- "voltage/current/power specs not in source"
- "fault behavior and error recovery sequences not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
