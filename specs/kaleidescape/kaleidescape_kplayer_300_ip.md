---
spec_id: admin/kaleidescape-kplayer_300
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kaleidescape, Inc. KPLAYER-300 Control Spec"
manufacturer: Kaleidescape
model_family: KPLAYER-300
aliases: []
compatible_with:
  manufacturers:
    - Kaleidescape
    - "Kaleidescape, Inc."
  models:
    - KPLAYER-300
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kaleidescape.com
  - support.kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/Kaleidescape-System-Control-Protocol-Reference-Manual.pdf
  - https://www.kaleidescape.com/support/article/Kaleidescape-Control-Commands
  - https://support.kaleidescape.com/support/article/Control-Protocol-Reference-Manual
retrieved_at: 2026-05-21T02:54:31.022Z
last_checked_at: 2026-10-07T20:56:43.868Z
generated_at: 2026-10-07T20:56:43.868Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - PAUSE_ON
  - PAUSE_OFF
  - CHILD_PAUSE_ON
  - CHILD_PAUSE_OFF
  - "Premier/M-Class players vs Strato-specific command differences not fully enumerated"
  - "full variable list not enumerated in source"
  - "no explicit multi-step macros defined in source"
  - "full command enumeration for all device types (Premiere vs Strato variants)"
  - "voltage/current/power specifications not in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:56:43.868Z
  matched_actions: 204
  action_count: 204
  confidence: medium
  summary: "All 204 action units match source commands. Transport values are supported and auth is left UNRESOLVED. Only 4 on/off pause variants are unrepresented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Kaleidescape, Inc. KPLAYER-300 Control Spec

## Summary
Kaleidescape Movie Player controlled via TCP/IP (port 10000) or RS-232 serial. Supports power on/off, playback, navigation, content browsing, and zone management. ASCII text-based protocol with slash-delimited messages.

<!-- UNRESOLVED: Premier/M-Class players vs Strato-specific command differences not fully enumerated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 10000
serial:
  baud_rate: 19200  # default for player; servers use 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # RTS/CTS optional
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # ENTER_STANDBY, LEAVE_STANDBY, GET_DEVICE_POWER_STATE
- queryable       # GET_UI_STATE, GET_PLAY_STATUS, GET_CONTENT_DETAILS, etc.
- routable        # CPDID-based command routing, serial number syntax
```

## Actions
```yaml
# Power
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

# Navigation
- id: up_press
  label: Up Press
  kind: action
  params: []
- id: down_press
  label: Down Press
  kind: action
  params: []
- id: left_press
  label: Left Press
  kind: action
  params: []
- id: right_press
  label: Right Press
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
      description: Collection name
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
- id: go_now_playing
  label: Go Now Playing
  kind: action
  params: []
- id: go_search
  label: Go Search
  kind: action
  params: []

# Playback
- id: play
  label: Play
  kind: action
  params: []
- id: pause
  label: Pause
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
- id: disc_menu
  label: Disc Menu
  kind: action
  params: []

# Content
- id: get_content_details
  label: Get Content Details
  kind: action
  params:
    - name: handle
      type: string
      description: Content handle
    - name: passcode
      type: string
      description: Parental passcode (optional)
- id: get_highlighted_selection
  label: Get Highlighted Selection
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

# System
- id: get_system_version
  label: Get System Version
  kind: action
  params: []
- id: get_num_zones
  label: Get Num Zones
  kind: action
  params: []
- id: get_available_devices
  label: Get Available Devices
  kind: action
  params: []
- id: get_ui_state
  label: Get UI State
  kind: action
  params: []
- id: get_device_info
  label: Get Device Info
  kind: action
  params: []
- id: get_time
  label: Get Time
  kind: action
  params: []

# Additional documented commands
- id: get_system_readiness_state
  label: Get System Readiness State
  kind: action
  params: []
- id: leave_idle_mode
  label: Leave Idle Mode
  kind: action
  params: []
- id: get_device_type_name
  label: Get Device Type Name
  kind: action
  params: []
- id: get_available_devices_by_serial_number
  label: Get Available Devices By Serial Number
  kind: action
  params: []
- id: get_protocol
  label: Get Protocol
  kind: action
  params: []
- id: get_protocol_version
  label: Get Protocol Version
  kind: action
  params: []
- id: get_active_protocol
  label: Get Active Protocol
  kind: action
  params: []
- id: set_supported_protocol
  label: Set Supported Protocol
  kind: action
  params:
    - name: version
      type: string
      description: Zero-padded, two-digit number representing the current protocol version
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
- id: enable_events
  label: Enable Events
  kind: action
  params:
    - name: target_device_id
      type: string
      description: Target device identifier
- id: disable_events
  label: Disable Events
  kind: action
  params:
    - name: target_device_id
      type: string
      description: Target device identifier
- id: send_event
  label: Send Event
  kind: action
  params:
    - name: message
      type: string
      description: Message
- id: send_to_syslog
  label: Send To Syslog
  kind: action
  params:
    - name: message
      type: string
      description: String logged by the Kaleidescape System
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
      description: Friendly name to assign to the zone or component
- id: get_friendly_system_name
  label: Get Friendly System Name
  kind: action
  params: []
- id: up_release
  label: Up Release
  kind: action
  params: []
- id: up
  label: Up
  kind: action
  params: []
- id: down_release
  label: Down Release
  kind: action
  params: []
- id: down
  label: Down
  kind: action
  params: []
- id: left_release
  label: Left Release
  kind: action
  params: []
- id: left
  label: Left
  kind: action
  params: []
- id: right_release
  label: Right Release
  kind: action
  params: []
- id: right
  label: Right
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
- id: child_up
  label: Child Up
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
- id: child_down
  label: Child Down
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
- id: child_left
  label: Child Left
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
- id: child_right
  label: Child Right
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
- id: position_select
  label: Position Select
  kind: action
  params:
    - name: x_loc
      type: string
      description: Any ASCII decimal integers from 0 to 2 billion
    - name: y_loc
      type: string
      description: Any ASCII decimal integers from 0 to 2 billion
- id: child_select
  label: Child Select
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
      description: Collection name
- id: go_movie_store
  label: Go Movie Store
  kind: action
  params: []
- id: go_parental_control
  label: Go Parental Control
  kind: action
  params: []
- id: go_system_status
  label: Go System Status
  kind: action
  params: []
- id: disc_in_tray_toggle
  label: Disc In Tray Toggle
  kind: action
  params: []
- id: go_vault_summary
  label: Go Vault Summary
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
      description: String
- id: keyboard_character
  label: Keyboard Character
  kind: action
  params:
    - name: character
      type: string
      description: Letter, digit, or any other symbol
- id: keyboard_literal
  label: Keyboard Literal
  kind: action
  params:
    - name: character
      type: string
      description: ASCII character >=32
- id: backspace
  label: Backspace
  kind: action
  params: []
- id: filter_list
  label: Filter List
  kind: action
  params: []
- id: shuffle_cover_art
  label: Shuffle Cover Art
  kind: action
  params: []
- id: alphabetize_cover_art
  label: Alphabetize Cover Art
  kind: action
  params: []
- id: child_shuffle_cover_art
  label: Child Shuffle Cover Art
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
- id: details
  label: Details
  kind: action
  params: []
- id: get_play_status
  label: Get Play Status
  kind: action
  params: []
- id: play_or_pause
  label: Play Or Pause
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
- id: set_status_cue_period
  label: Set Status Cue Period
  kind: action
  params:
    - name: period
      type: string
      description: "0 No updates for title and chapter locations are sent; 1 a PLAY_STATUS/MUSIC_PLAY_STATUS event message is sent every second as title and chapter locations change"
- id: get_playing_title_name
  label: Get Playing Title Name
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
    - name: sn
      type: string
      description: Serial number of the component to be controlled
    - name: zn
      type: string
      description: Music zone (01–04) to be controlled
- id: disc_top_menu
  label: Disc Top Menu
  kind: action
  params: []
- id: disc_resume
  label: Disc Resume
  kind: action
  params: []
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
  label: Status And Settings
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
  label: Start Send Number To Disc Entry
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
- id: red_press
  label: Red Press
  kind: action
  params: []
- id: red_release
  label: Red Release
  kind: action
  params: []
- id: red
  label: Red
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
- id: green
  label: Green
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
- id: blue
  label: Blue
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
- id: yellow
  label: Yellow
  kind: action
  params: []
- id: get_movie_media_type
  label: Get Movie Media Type
  kind: action
  params: []
- id: bluray_special_stop
  label: Bluray Special Stop
  kind: action
  params: []
- id: bluray_popup_menu_toggle
  label: Bluray Popup Menu Toggle
  kind: action
  params: []
- id: stop_or_cancel
  label: Stop Or Cancel
  kind: action
  params: []
- id: disc_or_kaleidescape_menu
  label: Disc Or Kaleidescape Menu
  kind: action
  params: []
- id: page_down_or_next
  label: Page Down Or Next
  kind: action
  params: []
- id: page_down_or_next_press
  label: Page Down Or Next Press
  kind: action
  params: []
- id: page_down_or_next_release
  label: Page Down Or Next Release
  kind: action
  params: []
- id: page_down_or_previous
  label: Page Down Or Previous
  kind: action
  params: []
- id: page_down_or_previous_press
  label: Page Down Or Previous Press
  kind: action
  params: []
- id: page_down_or_previous_release
  label: Page Down Or Previous Release
  kind: action
  params: []
- id: page_up_or_next
  label: Page Up Or Next
  kind: action
  params: []
- id: page_up_or_next_press
  label: Page Up Or Next Press
  kind: action
  params: []
- id: page_up_or_next_release
  label: Page Up Or Next Release
  kind: action
  params: []
- id: page_up_or_previous
  label: Page Up Or Previous
  kind: action
  params: []
- id: page_up_or_previous_press
  label: Page Up Or Previous Press
  kind: action
  params: []
- id: page_up_or_previous_release
  label: Page Up Or Previous Release
  kind: action
  params: []
- id: perform_action
  label: Perform Action
  kind: action
  params:
    - name: handle
      type: string
      description: Handle
    - name: passcode
      type: string
      description: Passcode
    - name: action
      type: string
      description: Action
- id: play_first_in_music_collection
  label: Play First In Music Collection
  kind: action
  params:
    - name: collection
      type: string
      description: Collection
- id: play_next_in_music_collection
  label: Play Next In Music Collection
  kind: action
  params:
    - name: collection
      type: string
      description: Collection
- id: play_previous_in_music_collection
  label: Play Previous In Music Collection
  kind: action
  params:
    - name: collection
      type: string
      description: Collection
- id: assign_playing_music_to_preset
  label: Assign Playing Music To Preset
  kind: action
  params:
    - name: tag
      type: string
      description: Tag
- id: play_music_preset
  label: Play Music Preset
  kind: action
  params:
    - name: tag
      type: string
      description: Tag
- id: get_music_preset_information
  label: Get Music Preset Information
  kind: action
  params:
    - name: tag
      type: string
      description: Tag
- id: get_playing_music_information
  label: Get Playing Music Information
  kind: action
  params: []
- id: get_movie_location
  label: Get Movie Location
  kind: action
  params: []
- id: go_calibrate_masking
  label: Go Calibrate Masking
  kind: action
  params: []
- id: go_calibrate_masking_overscan
  label: Go Calibrate Masking Overscan
  kind: action
  params: []
- id: get_cinemascape_mask
  label: Get Cinemascape Mask
  kind: action
  params: []
- id: get_screen_mask
  label: Get Screen Mask
  kind: action
  params: []
- id: get_screen_mask2
  label: Get Screen Mask2
  kind: action
  params: []
- id: set_screen_mask
  label: Set Screen Mask
  kind: action
  params:
    - name: flag
      type: string
      description: "0 Instructs the movie zone not to compensate for masking; 1 Instructs the movie zone to compensate for masking"
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
  label: Get Cinemascape Mode
  kind: action
  params: []
- id: set_cinemascape_mode
  label: Set Cinemascape Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "0 Not in CinemaScape mode; 1 CinemaScape 2.35 Anamorphic; 2 CinemaScape 2.35 Letterbox; 3 CinemaScape Native 2.35 Display"
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
      description: Script name
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
      type: string
      description: "0 Sets component to use DHCP to obtain an IP address; 1 Sets component to use a static IP address"
    - name: ip_address
      type: string
      description: IP address
    - name: subnet
      type: string
      description: Subnet
    - name: gateway
      type: string
      description: Gateway
    - name: dns1
      type: string
      description: DNS1
    - name: dns2
      type: string
      description: DNS2
- id: get_system_capabilities
  label: Get System Capabilities
  kind: action
  params: []
- id: get_zone_capabilities
  label: Get Zone Capabilities
  kind: action
  params: []
- id: go_screen_saver
  label: Go Screen Saver
  kind: action
  params: []
- id: stop_screen_saver
  label: Stop Screen Saver
  kind: action
  params: []
```

## Feedbacks
```yaml
# Device power state
- id: device_power_state
  type: enum
  values: [0, 1]
  description: "0=standby, 1=powered on"
  query_command: GET_DEVICE_POWER_STATE
# UI state
- id: ui_state
  type: object
  fields:
    - screen: integer
    - popup: integer
    - dialog: integer
    - saver: integer
  query_command: GET_UI_STATE
# Play status
- id: play_status
  type: object
  fields:
    - mode: integer  # 0=nothing, 1=paused, 2=playing, 4=fwd scan, 6=rev scan
    - speed: integer
    - title_num: string
    - title_length: string
    - title_loc: string
    - chap_num: string
    - chap_len: string
    - chap_loc: string
  query_command: GET_PLAY_STATUS
# Events (unsolicited)
- id: player_restart
  type: event
- id: available_devices
  type: event
  query_command: GET_AVAILABLE_DEVICES
- id: highlighted_selection
  type: event
  query_command: GET_HIGHLIGHTED_SELECTION
```

## Variables
```yaml
# UNRESOLVED: full variable list not enumerated in source
```

## Events
```yaml
# Unsolicited notifications
- id: player_restart
  description: Generated after power on or LEAVE_STANDBY
- id: device_power_state
  description: Power state change event
- id: ui_state
  description: UI view state change
- id: available_devices
  description: List of available components changes
- id: highlighted_selection
  description: Currently selected item changed
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: bluray_special_stop_caution
    description: "BLURAY_SPECIAL_STOP can trap user in disc menus depending on disc authoring. Controller must provide alternative mechanism to return to Kaleidescape menu."
```

## Notes
Serial baud rate defaults differ: 115200 for servers, 19200 for players. TCP port is 10000. Serial uses DTE pinout (DB-9). Message format: `device_id/seq/message_body[/checksum]`. Checksums not applicable over TCP (TCP has built-in error handling). Binary delimiters not supported over RS-232.
<!-- UNRESOLVED: full command enumeration for all device types (Premiere vs Strato variants) -->
<!-- UNRESOLVED: voltage/current/power specifications not in source -->

## Provenance

```yaml
source_domains:
  - kaleidescape.com
  - support.kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/Kaleidescape-System-Control-Protocol-Reference-Manual.pdf
  - https://www.kaleidescape.com/support/article/Kaleidescape-Control-Commands
  - https://support.kaleidescape.com/support/article/Control-Protocol-Reference-Manual
retrieved_at: 2026-05-21T02:54:31.022Z
last_checked_at: 2026-10-07T20:56:43.868Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:56:43.868Z
matched_actions: 204
action_count: 204
confidence: medium
summary: "All 204 action units match source commands. Transport values are supported and auth is left UNRESOLVED. Only 4 on/off pause variants are unrepresented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- PAUSE_ON
- PAUSE_OFF
- CHILD_PAUSE_ON
- CHILD_PAUSE_OFF
- "Premier/M-Class players vs Strato-specific command differences not fully enumerated"
- "full variable list not enumerated in source"
- "no explicit multi-step macros defined in source"
- "full command enumeration for all device types (Premiere vs Strato variants)"
- "voltage/current/power specifications not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
