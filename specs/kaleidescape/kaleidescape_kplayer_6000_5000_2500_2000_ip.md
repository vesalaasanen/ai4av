---
spec_id: admin/kaleidescape-inc-kplayer-6000-5000-2500-2000
schema_version: ai4av-public-spec-v1
revision: 2
title: "Kaleidescape KPLAYER-6000, 5000, 2500, 2000 Control Spec"
manufacturer: Kaleidescape
model_family: KPLAYER-6000
aliases: []
compatible_with:
  manufacturers:
    - Kaleidescape
    - "Kaleidescape, Inc."
  models:
    - KPLAYER-6000
    - KPLAYER-5000
    - KPLAYER-2500
    - KPLAYER-2000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/Kaleidescape-System-Control-Protocol-Reference-Manual.pdf
  - https://www.kaleidescape.com/wp-content/uploads/integrating-with-the-kaleidescape-mobile-app.pdf
retrieved_at: 2026-05-21T02:53:34.336Z
last_checked_at: 2026-07-21T22:57:03.125Z
generated_at: 2026-07-21T22:57:03.125Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated"
  - "exact product feature differences between KPLAYER models not specified"
  - "no explicit safety interlock procedures stated beyond the BLURAY_SPECIAL_STOP caution"
  - "exact differences between KPLAYER-6000, 5000, 2500, 2000 not specified"
  - "maximum concurrent zone count per player model not specified"
  - "BROWSE response multi-line details not fully reproduced here; see source for full BROWSE_RESULT action1-4 fields"
  - "GET_PROTOCOL_VERSION legacy command behavior — response format differs from GET_PROTOCOL"
  - "server-side serial baud (115200) is supported per Table 2 but KPLAYER players use 19200"
  - "content_details_table 'movies' vs 'albums' field contents"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:57:03.125Z
  matched_actions: 205
  action_count: 205
  confidence: medium
  summary: "All 205 spec action/feedback units match literal source commands with correct shapes; every source command heading is represented in the spec. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Kaleidescape KPLAYER-6000, 5000, 2500, 2000 Control Spec

## Summary

Kaleidescape movie players (KPLAYER-6000, 5000, 2500, 2000) controlled via TCP/IP (port 10000) or RS-232 serial. ASCII text-based protocol with `device_id/seq/message_body[/checksum]` message format, up to 1024 characters per message, CR/LF terminated. Supports movie and music playback, onscreen navigation, screen masking, CinemaScape, child mode, scripting, and multi-component command routing. Up to 20 simultaneous TCP/IP connections per component. Document describes control protocol version 18 (kOS 10.18).

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact product feature differences between KPLAYER models not specified -->

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
  flow_control: none  # RTS/CTS optional; hardware-only
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

## Actions

```yaml
actions:
  # ── Power ──
  - id: enter_standby
    label: Enter Standby
    kind: action
    command: "ENTER_STANDBY:"
    params: []
    description: Puts component into standby immediately

  - id: leave_standby
    label: Leave Standby
    kind: action
    command: "LEAVE_STANDBY:"
    params: []
    description: Exits standby mode; component sends DEVICE_POWER_STATE event when startup complete

  # ── Idle Mode ──
  - id: leave_idle_mode
    label: Leave Idle Mode
    kind: action
    command: "LEAVE_IDLE_MODE:"
    params: []
    description: Causes Strato player or Cinema One (2nd gen) to exit idle mode

  # ── Playback ──
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
    label: Play or Pause
    kind: action
    command: "PLAY_OR_PAUSE:"
    params: []
    description: Strato movie zones only

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

  # ── Child Playback ──
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

  # ── Navigation: Arrows ──
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
    command: "POSITION_SELECT:{x}:{y}:"
    params:
      - name: x
        type: integer
        description: X screen coordinate (0 to 2 billion)
      - name: y
        type: integer
        description: Y screen coordinate (0 to 2 billion)

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

  # ── Menu ──
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

  # ── Views ──
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
        description: Name of the collection to open

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
        description: Name of the music collection

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
    description: Strato movie zones only

  - id: go_system_status
    label: Go System Status
    kind: action
    command: "GO_SYSTEM_STATUS:"
    params: []

  - id: go_vault_summary
    label: Go Vault Summary
    kind: action
    command: "GO_VAULT_SUMMARY:"
    params: []

  - id: go_parental_control
    label: Go Parental Control
    kind: action
    command: "GO_PARENTAL_CONTROL:"
    params: []

  - id: go_search
    label: Go Search
    kind: action
    command: "GO_SEARCH:"
    params: []
    description: Strato or Alto movie zones only

  # ── User Input ──
  - id: keyboard_character
    label: Keyboard Character
    kind: action
    command: "KEYBOARD_CHARACTER:{character}:"
    params:
      - name: character
        type: string
        description: Single character to send to OSD

  - id: keyboard_literal
    label: Keyboard Literal
    kind: action
    command: "KEYBOARD_LITERAL:{character}:"
    params:
      - name: character
        type: string
        description: ASCII character >=32 to send to OSD

  - id: backspace
    label: Backspace
    kind: action
    command: "BACKSPACE:"
    params: []

  - id: set_user_input_entry
    label: Set User Input Entry
    kind: action
    command: "SET_USER_INPUT_ENTRY:{string}:"
    params:
      - name: string
        type: string
        description: Text entry to set in the input field
    description: Strato or Alto movie zones only

  # ── View-Specific ──
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

  - id: details
    label: Details
    kind: action
    command: "DETAILS:"
    params: []

  # ── Screen Saver ──
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

  # ── Disc ──
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
    description: Any movie player with an optical disc drive

  - id: disc_or_kaleidescape_menu
    label: Disc or Kaleidescape Menu
    kind: action
    command: "DISC_OR_KALEIDESCAPE_MENU:"
    params: []

  - id: start_chapter_entry
    label: Start Chapter Entry
    kind: action
    command: "START_CHAPTER_ENTRY:"
    params: []
    description: Opens numeric entry prompt to jump to chapter

  - id: start_disc_title_entry
    label: Start Disc Title Entry
    kind: action
    command: "START_DISC_TITLE_ENTRY:"
    params: []
    description: Opens numeric entry prompt to jump to title

  - id: start_send_number_to_disc_entry
    label: Start Send Number to Disc Entry
    kind: action
    command: "START_SEND_NUMBER_TO_DISC_ENTRY:"
    params: []

  # ── Playback Overlay ──
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

  # ── Intermission ──
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

  # ── Favorite Scenes ──
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

  # ── Angle / Audio / Subtitles ──
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

  # ── Blu-ray ──
  - id: bluray_special_stop
    label: Blu-ray Special Stop
    kind: action
    command: "BLURAY_SPECIAL_STOP:"
    params: []
    description: CAUTION - can trap user depending on disc authoring; controller must provide mechanism to return to Kaleidescape menu

  - id: bluray_popup_menu_toggle
    label: Blu-ray Popup Menu Toggle
    kind: action
    command: "BLURAY_POPUP_MENU_TOGGLE:"
    params: []

  # ── Blu-ray Color Buttons ──
  - id: red
    label: Red Button
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
    label: Green Button
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
    label: Blue Button
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
    label: Yellow Button
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

  # ── Child Mode ──
  - id: enter_child_mode
    label: Enter Child Mode
    kind: action
    command: "ENTER_CHILD_MODE:"
    params: []
    description: Any movie zone except Strato V in standalone mode

  - id: leave_child_mode
    label: Leave Child Mode
    kind: action
    command: "LEAVE_CHILD_MODE:"
    params: []
    description: Any movie zone except Strato V in standalone mode

  # ── Music Controls ──
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
    label: Play First in Music Collection
    kind: action
    command: "PLAY_FIRST_IN_MUSIC_COLLECTION:{collection}:"
    params:
      - name: collection
        type: string
        description: Name of the music collection

  - id: play_next_in_music_collection
    label: Play Next in Music Collection
    kind: action
    command: "PLAY_NEXT_IN_MUSIC_COLLECTION:{collection}:"
    params:
      - name: collection
        type: string
        description: Name of the music collection

  - id: play_previous_in_music_collection
    label: Play Previous in Music Collection
    kind: action
    command: "PLAY_PREVIOUS_IN_MUSIC_COLLECTION:{collection}:"
    params:
      - name: collection
        type: string
        description: Name of the music collection

  - id: assign_playing_music_to_preset
    label: Assign Playing Music to Preset
    kind: action
    command: "ASSIGN_PLAYING_MUSIC_TO_PRESET:{tag}:"
    params:
      - name: tag
        type: string
        description: Preset tag name

  - id: play_music_preset
    label: Play Music Preset
    kind: action
    command: "PLAY_MUSIC_PRESET:{tag}:"
    params:
      - name: tag
        type: string
        description: Preset tag name

  - id: perform_action
    label: Perform Music Action
    kind: action
    command: "PERFORM_ACTION:{handle}:{passcode}:{action}:"
    params:
      - name: handle
        type: string
        description: Browse result handle
      - name: passcode
        type: string
        description: Parental control passcode (empty if not needed)
      - name: action
        type: string
        description: Action index or identifier

  - id: browse
    label: Browse
    kind: action
    command: "BROWSE:{browse_handle}:{passcode}:{lines}:{flags}:"
    params:
      - name: browse_handle
        type: string
        description: Handle of the node being requested (Premiere music zones only)
      - name: passcode
        type: string
        description: Parental control passcode (blank if not needed)
      - name: lines
        type: string
        description: "Line range to return, format: firstLine-lastLine (e.g. 1-10)"
      - name: flags
        type: string
        description: 'Optional flags (e.g. filter="searchstring", suggest)'

  # ── Scripts ──
  - id: play_script
    label: Play Script
    kind: action
    command: "PLAY_SCRIPT:{script_name}:"
    params:
      - name: script_name
        type: string
        description: Name of the script to play

  # ── Masking / CinemaScape ──
  - id: set_screen_mask
    label: Set Screen Mask
    kind: action
    command: "SET_SCREEN_MASK:{flag}:"
    params:
      - name: flag
        type: integer
        description: "0 = no masking compensation, 1 = enable masking compensation"

  - id: set_cinemascape_mode
    label: Set CinemaScape Mode
    kind: action
    command: "SET_CINEMASCAPE_MODE:{mode}:"
    params:
      - name: mode
        type: integer
        description: "0=off, 1=2.35 Anamorphic, 2=2.35 Letterbox, 3=Native 2.35 Display"

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

  # ── Protocol / Session ──
  - id: set_protocol_settings
    label: Set Protocol Settings
    kind: action
    command: "SET_PROTOCOL_SETTINGS:{delimiter_type}:{character_set}:"
    params:
      - name: delimiter_type
        type: string
        description: "PRINTABLE_DELIMITERS or BINARY_DELIMITERS"
      - name: character_set
        type: string
        description: "LATIN-1"

  - id: set_supported_protocol
    label: Set Supported Protocol
    kind: action
    command: "SET_SUPPORTED_PROTOCOL:{version}:"
    params:
      - name: version
        type: integer
        description: "Zero-padded two-digit protocol version (e.g. 18)"

  - id: enable_events
    label: Enable Events
    kind: action
    command: "ENABLE_EVENTS:{target_device_id}:"
    params:
      - name: target_device_id
        type: string
        description: "CPDID or serial number of target device/zone"

  - id: disable_events
    label: Disable Events
    kind: action
    command: "DISABLE_EVENTS:{target_device_id}:"
    params:
      - name: target_device_id
        type: string
        description: "CPDID or serial number of target device/zone"

  - id: send_to_syslog
    label: Send to Syslog
    kind: action
    command: "SEND_TO_SYSLOG:INFORMATION:{message}:"
    params:
      - name: message
        type: string
        description: String to log in diagnostic logs

  - id: send_event
    label: Send Custom Event
    kind: action
    command: "SEND_EVENT:{message}:"
    params:
      - name: message
        type: string
        description: Custom event message string

  - id: set_network_settings
    label: Set Network Settings
    kind: action
    command: "SET_NETWORK_SETTINGS:{static}:{ip_address}:{subnet}:{gateway}:{dns1}:{dns2}:"
    params:
      - name: static
        type: integer
        description: "0=DHCP, 1=static IP. Blank fields are ignored."
      - name: ip_address
        type: string
        description: IP address (decimal dotted-quad)
      - name: subnet
        type: string
        description: Subnet mask (blank to leave unchanged)
      - name: gateway
        type: string
        description: Default gateway IP (blank to leave unchanged)
      - name: dns1
        type: string
        description: Primary DNS IP (blank to leave unchanged)
      - name: dns2
        type: string
        description: Secondary DNS IP (blank to leave unchanged)

  # ── Friendly Name ──
  - id: set_friendly_name
    label: Set Friendly Name
    kind: action
    command: "SET_FRIENDLY_NAME:{name}:"
    params:
      - name: name
        type: string
        description: Friendly name to assign

  # ── Zone ──
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
        description: "Music zone number (01-04)"

  # ── Status Cue Period ──
  - id: set_status_cue_period
    label: Set Status Cue Period
    kind: action
    command: "SET_STATUS_CUE_PERIOD:{period}:"
    params:
      - name: period
        type: integer
        description: "Seconds between PLAY_STATUS/MUSIC_PLAY_STATUS events (0=off, 1=every second)"
```

## Feedbacks

```yaml
feedbacks:
  # ── Power ──
  - id: device_power_state
    label: Device Power State
    query_command: "GET_DEVICE_POWER_STATE:"
    response: "DEVICE_POWER_STATE:{power_state}:{zone_1_state}:…:{zone_n_state}:"
    type: enum
    values: [standby, powered_on]
    description: "power_state: 0=standby, 1=powered on. Zone states: 0=disabled, 1=available"

  # ── System ──
  - id: system_readiness_state
    label: System Readiness State
    query_command: "GET_SYSTEM_READINESS_STATE:"
    response: "SYSTEM_READINESS_STATE:{state}:"
    type: enum
    values: [ready, becoming_ready, idle]
    description: "0=ready, 1=becoming ready, 2=idle (Strato/Cinema One 2nd gen)"

  - id: ui_state
    label: UI State
    query_command: "GET_UI_STATE:"
    response: "UI_STATE:{screen}:{popup}:{dialog}:{saver}:"
    type: string
    description: "Current OSD view state. screen (00-18), popup (00-03), dialog (00-10), saver (0/1)"

  - id: system_version
    label: System Version
    query_command: "GET_SYSTEM_VERSION:"
    response: "SYSTEM_VERSION:{control_protocol_version}:{kOS_version}:"
    type: string

  - id: device_type_name
    label: Device Type Name
    query_command: "GET_DEVICE_TYPE_NAME:"
    response: "DEVICE_TYPE_NAME:{device_name}:"
    type: string

  - id: num_zones
    label: Number of Zones
    query_command: "GET_NUM_ZONES:"
    response: "NUM_ZONES:{num_movie_zones}:{num_music_zones}:"
    type: string

  - id: available_devices
    label: Available Devices
    query_command: "GET_AVAILABLE_DEVICES:"
    response: "AVAILABLE_DEVICES:{dev1}:{dev2}:…:"
    type: string
    description: Colon-separated list of CPDIDs

  - id: available_devices_by_serial
    label: Available Devices by Serial Number
    query_command: "GET_AVAILABLE_DEVICES_BY_SERIAL_NUMBER:"
    response: "AVAILABLE_DEVICES_BY_SERIAL_NUMBER:{sn1}:{sn2}:…:"
    type: string

  - id: device_info
    label: Device Info
    query_command: "GET_DEVICE_INFO:"
    response: "DEVICE_INFO:{device_type}:{serial_num}:{cpdid}:{ip_address}:"
    type: string

  - id: time
    label: Time
    query_command: "GET_TIME:"
    response: "TIME:{yyyy}:{mm}:{dd}:{hh}:{mm}:{ss}:{timezone}:"
    type: string

  - id: protocol_version
    label: Protocol Version
    query_command: "GET_PROTOCOL:"
    response: "PROTOCOL:{version}:"
    type: integer

  - id: active_protocol
    label: Active Protocol
    query_command: "GET_ACTIVE_PROTOCOL:"
    response: "ACTIVE_PROTOCOL:{version}:"
    type: integer

  - id: protocol_version_legacy
    label: Protocol Version (Legacy)
    query_command: "GET_PROTOCOL_VERSION:"
    response: "{version}:"
    type: integer
    description: "Deprecated alias for GET_PROTOCOL; still available but GET_PROTOCOL is preferred"

  - id: system_capabilities
    label: System Capabilities
    query_command: "GET_SYSTEM_CAPABILITIES:"
    response: "SYSTEM_CAPABILITIES:{movies}:{music}: ::{product_line}::::::::"
    type: string
    description: "movies/music: Y/N, product_line: Y=Premiere, N=Strato"

  - id: zone_capabilities
    label: Zone Capabilities
    query_command: "GET_ZONE_CAPABILITIES:"
    response: "ZONE_CAPABILITIES:{osd}:{movies}:{music}:{store}:{search}:{library_type}:{osd_generation}::::"
    type: string
    description: "Strato or Alto movie zones only. osd_generation: 00=none, 01=OSDv1, 02=OSDv2 classic, 03=OSDv2 row"

  - id: network_settings
    label: Network Settings
    query_command: "GET_NETWORK_SETTINGS:"
    response: "NETWORK_SETTINGS:{static}:{ip_address}:{subnet_mask}:{gateway}:{dns1}:{dns2}:"
    type: string

  - id: friendly_name
    label: Friendly Name
    query_command: "GET_FRIENDLY_NAME:"
    response: "FRIENDLY_NAME:{name}:"
    type: string

  - id: friendly_system_name
    label: Friendly System Name
    query_command: "GET_FRIENDLY_SYSTEM_NAME:"
    response: "FRIENDLY_SYSTEM_NAME:{name}:"
    type: string

  # ── Playback ──
  - id: play_status
    label: Play Status
    query_command: "GET_PLAY_STATUS:"
    response: "PLAY_STATUS:{mode}:{speed}:{title_num}:{title_length}:{title_loc}:{chap_num}:{chap_len}:{chap_loc}:"
    type: string
    description: "mode: 0=nothing, 1=paused, 2=playing, 4=fwd scan, 6=rev scan"

  - id: playing_title_name
    label: Playing Title Name
    query_command: "GET_PLAYING_TITLE_NAME:"
    response: "TITLE_NAME:{title}:"
    type: string

  - id: movie_location
    label: Movie Location
    query_command: "GET_MOVIE_LOCATION:"
    response: "MOVIE_LOCATION:{location}:"
    type: enum
    values: ["interface/unknown", "main_content", "intermission", "end_credits", "disc_menu"]
    description: "00=interface/unknown, 03=main content, 04=intermission, 05=end credits, 06=disc menu"

  - id: movie_media_type
    label: Movie Media Type
    query_command: "GET_MOVIE_MEDIA_TYPE:"
    response: "MOVIE_MEDIA_TYPE:{media_type}:"
    type: enum
    values: [none, dvd, video_stream, bluray]
    description: "00=none, 01=DVD, 02=video stream, 03=Blu-ray"

  - id: camera_angle
    label: Camera Angle
    query_command: "GET_CAMERA_ANGLE:"
    response: "CAMERA_ANGLE:{cur_angle}:{num_angles}:{in_angle_block}:"
    type: string

  # ── Video ──
  - id: video_mode
    label: Video Mode
    query_command: "GET_VIDEO_MODE:"
    response: "VIDEO_MODE:{composite}:{component}:{HDMI}:"
    type: string
    description: "Returns resolution codes for each output (00-57). Values 39-57 require ACTIVE_PROTOCOL:18+."

  - id: video_color
    label: Video Color
    query_command: "GET_VIDEO_COLOR:"
    response: "VIDEO_COLOR:{EOTF}:{color_space}:{color_depth}:{color_sampling}:"
    type: string
    description: "Strato or Alto movie zones only"

  - id: content_color
    label: Content Color
    query_command: "GET_CONTENT_COLOR:"
    response: "CONTENT_COLOR:{EOTF}:{color_space}:{color_depth}:{color_sampling}:"
    type: string
    description: "Strato or Alto movie zones only"

  - id: scale_mode
    label: Scale Mode
    query_command: "GET_SCALE_MODE:"
    response: "SCALE_MODE:{mode}:"
    type: integer
    description: "0=no scaling, 1=anamorphic, 2=reserved, 3=zoom"

  # ── Masking / CinemaScape ──
  - id: screen_mask
    label: Screen Mask
    query_command: "GET_SCREEN_MASK:"
    response: "SCREEN_MASK:{image_ratio}:{top_trim_rel}:{bottom_trim_rel}:{conservative_ratio}:{top_mask_abs}:{bottom_mask_abs}:"
    type: string

  - id: screen_mask2
    label: Screen Mask 2
    query_command: "GET_SCREEN_MASK2:"
    response: "SCREEN_MASK2:{top_mask_abs}:{bottom_mask_abs}:{top_calibrated}:{bottom_calibrated}:"
    type: string

  - id: cinemascape_mask
    label: CinemaScape Mask
    query_command: "GET_CINEMASCAPE_MASK:"
    response: "CINEMASCAPE_MASK:{frame_ratio}:"
    type: integer
    description: "Three-digit frame ratio in hundredths (133, 166, 178, 237, 240). Returns error 028 if not in CinemaScape mode."

  - id: cinemascape_mode
    label: CinemaScape Mode
    query_command: "GET_CINEMASCAPE_MODE:"
    response: "CINEMASCAPE_MODE:{mode}:"
    type: enum
    values: [off, "2.35_anamorphic", "2.35_letterbox", "native_2.35"]
    description: "0=off, 1=2.35 Anamorphic, 2=2.35 Letterbox, 3=Native 2.35 Display"

  # ── Content / Selection ──
  - id: highlighted_selection
    label: Highlighted Selection
    query_command: "GET_HIGHLIGHTED_SELECTION:"
    response: "HIGHLIGHTED_SELECTION:{handle}:"
    type: string
    description: Handle for currently highlighted item

  - id: content_details
    label: Content Details
    query_command: "GET_CONTENT_DETAILS:{handle}:{passcode}:"
    response: "CONTENT_DETAILS_OVERVIEW:{num_lines}:{handle}:{table}:"
    response_continued: "CONTENT_DETAILS:{line}:{name}:{value}:"
    type: string
    description: Returns multiple lines of metadata for a content handle; one CONTENT_DETAILS line per metadata row

  # ── User Input ──
  - id: user_input
    label: User Input
    query_command: "GET_USER_INPUT:"
    response: "USER_INPUT:{type}:{prompt}:{entry}:"
    type: string
    description: "type: 00=none, 01=alphanumeric, 02=numeric"

  - id: user_input_prompt
    label: User Input Prompt
    query_command: "GET_USER_INPUT_PROMPT:"
    response: "USER_INPUT_PROMPT:{type}:{icon}:{prompt}:{displayed}:{char_limit}:{valid}:"
    type: string
    description: Strato or Alto movie zones only

  # ── Child Mode ──
  - id: child_mode_state
    label: Child Mode State
    query_command: "GET_CHILD_MODE_STATE:"
    response: "CHILD_MODE_STATE:{child_mode}:"
    type: enum
    values: [inactive, active]

  # ── Music ──
  - id: music_now_playing_status
    label: Music Now Playing Status
    query_command: "GET_MUSIC_NOW_PLAYING_STATUS:"
    response: "MUSIC_NOW_PLAYING_STATUS:{total}:{location}:{repeat}:{random}:{generation}:{now_playing_handle}:"
    type: string

  - id: music_play_status
    label: Music Play Status
    query_command: "GET_MUSIC_PLAY_STATUS:"
    response: "MUSIC_PLAY_STATUS:{mode}:{speed}:{length}:{position}:{progress}:"
    type: string
    description: "mode: 1=paused, 2=playing, 4=ffwd, 6=frev"

  - id: music_title
    label: Music Title
    query_command: "GET_MUSIC_TITLE:"
    response: "MUSIC_TITLE:{track}:{artist}:{album}:{track_handle}:{album_handle}:{now_playing_handle}:"
    type: string

  - id: music_preset_information
    label: Music Preset Information
    query_command: "GET_MUSIC_PRESET_INFORMATION:{tag}:"
    response: "MUSIC_PRESET_INFORMATION:{tag}:{handle}:{label}:"
    type: string

  - id: playing_music_information
    label: Playing Music Information
    query_command: "GET_PLAYING_MUSIC_INFORMATION:"
    response: "PLAYING_MUSIC_INFORMATION:{handle}:{label}:"
    type: string

  - id: controlled_zone
    label: Controlled Zone
    query_command: "GET_CONTROLLED_ZONE:"
    response: "CONTROLLED_ZONE:#{sn}.{zn}:"
    type: string

  - id: browse_results
    label: Browse Results
    query_command: "BROWSE:{browse_handle}:{passcode}:{lines}:{flags}:"
    response: "BROWSE_RESULTS_OVERVIEW:{browse_handle}:{title}:{response_lines}:{total_lines}:[:{first_line_index}:{playing_line_index}:]"
    response_continued: "BROWSE_RESULT:{relative_line}:{absolute_line:text:play_status}:{default_label}:{default_behavior:default_handle:default_pop}:{action1_label}:{action1_behavior:action1_handle:action1_pop}:…:{action4_label}:{action4_behavior:action4_handle:action4_pop}:"
    type: string
    description: "Premiere music zones only. Multiple BROWSE_RESULT lines returned per request."

  - id: action_performed
    label: Action Performed
    query_command: "PERFORM_ACTION:{handle}:{passcode}:{action}:"
    response: "ACTION_PERFORMED:{text}:"
    type: string
    description: "Premiere music zones only"
```

## Variables

```yaml
variables:
  - id: status_cue_period
    label: Status Cue Period
    set_command: "SET_STATUS_CUE_PERIOD:{period}:"
    type: integer
    description: "Seconds between periodic PLAY_STATUS/MUSIC_PLAY_STATUS events. 0=disabled, 1=every second"
    unit: seconds

  - id: protocol_delimiter_type
    label: Protocol Delimiter Type
    set_command: "SET_PROTOCOL_SETTINGS:{delimiter_type}:{character_set}:"
    type: string
    description: "PRINTABLE_DELIMITERS or BINARY_DELIMITERS (TCP only)"

  - id: cinemascape_mode
    label: CinemaScape Mode
    set_command: "SET_CINEMASCAPE_MODE:{mode}:"
    type: integer
    description: "0=off, 1=2.35 Anamorphic, 2=2.35 Letterbox, 3=Native 2.35 Display"

  - id: screen_mask_flag
    label: Screen Mask Flag
    set_command: "SET_SCREEN_MASK:{flag}:"
    type: integer
    description: "0=no masking compensation, 1=enable masking compensation"

  - id: session_protocol_version
    label: Session Protocol Version
    set_command: "SET_SUPPORTED_PROTOCOL:{version}:"
    type: integer
    description: "Zero-padded two-digit protocol version for the session"

  - id: friendly_name
    label: Friendly Name
    set_command: "SET_FRIENDLY_NAME:{name}:"
    type: string

  - id: network_settings
    label: Network Settings
    set_command: "SET_NETWORK_SETTINGS:{static}:{ip_address}:{subnet}:{gateway}:{dns1}:{dns2}:"
    type: string
    description: "static: 0=DHCP, 1=static IP. Blank fields are ignored."

  - id: controlled_zone
    label: Controlled Zone
    set_command: "SET_CONTROLLED_ZONE:#{sn}.{zn}:"
    type: string
    description: "sn = component serial number, zn = music zone 01-04"
```

## Events

```yaml
events:
  - id: device_power_state
    label: Device Power State
    format: "000:DEVICE_POWER_STATE:{power_state}:{zone_1_state}:…:"
    description: Sent when component power state changes

  - id: player_restart
    label: Player Restart
    format: "PLAYER_RESTART:"
    description: Sent when component has finished powering up and is ready for input. No status code in this event.

  - id: system_readiness_state
    label: System Readiness State
    format: "000:SYSTEM_READINESS_STATE:{state}:"
    description: "Sent when idle mode changes (Strato/Cinema One 2nd gen). 0=ready, 1=becoming ready, 2=idle"

  - id: ui_state
    label: UI State
    format: "000:UI_STATE:{screen}:{popup}:{dialog}:{saver}:"
    description: Sent when the onscreen display state changes

  - id: highlighted_selection
    label: Highlighted Selection
    format: "000:HIGHLIGHTED_SELECTION:{handle}:"
    description: Sent when the highlighted item on screen changes

  - id: available_devices
    label: Available Devices
    format: "000:AVAILABLE_DEVICES:{dev1}:{dev2}:…:"
    description: Sent when list of available components changes

  - id: title_name
    label: Title Name
    format: "000:TITLE_NAME:{title}:"
    description: Sent when the playing movie title changes

  - id: movie_media_type
    label: Movie Media Type
    format: "000:MOVIE_MEDIA_TYPE:{media_type}:"
    description: Sent when the media type changes during playback

  - id: movie_location
    label: Movie Location
    format: "000:MOVIE_LOCATION:{location}:"
    description: "Sent when movie playback location changes (00=unknown, 03=main, 04=intermission, 05=credits, 06=menu)"

  - id: play_status
    label: Play Status
    format: "000:PLAY_STATUS:{mode}:{speed}:{title_num}:{title_length}:{title_loc}:{chap_num}:{chap_len}:{chap_loc}:"
    description: Sent periodically per SET_STATUS_CUE_PERIOD and on playback state changes

  - id: music_play_status
    label: Music Play Status
    format: "000:MUSIC_PLAY_STATUS:{mode}:{speed}:{length}:{position}:{progress}:"
    description: Sent periodically per SET_STATUS_CUE_PERIOD during music playback

  - id: music_now_playing_status
    label: Music Now Playing Status
    format: "000:MUSIC_NOW_PLAYING_STATUS:{total}:{location}:{repeat}:{random}:{generation}:{now_playing_handle}:"
    description: Sent when music now-playing list changes

  - id: music_title
    label: Music Title
    format: "000:MUSIC_TITLE:{track}:{artist}:{album}:{track_handle}:{album_handle}:{now_playing_handle}:"
    description: Sent when the playing music track changes

  - id: playing_music_information
    label: Playing Music Information
    format: "000:PLAYING_MUSIC_INFORMATION:{handle}:{label}:"
    description: Sent when the playing music context changes

  - id: video_mode
    label: Video Mode
    format: "000:VIDEO_MODE:{composite}:{component}:{HDMI}:"
    description: Sent when video output mode changes (also on power on)

  - id: video_color
    label: Video Color
    format: "000:VIDEO_COLOR:{EOTF}:{color_space}:{color_depth}:{color_sampling}:"
    description: Sent when video color properties change

  - id: content_color
    label: Content Color
    format: "000:CONTENT_COLOR:{EOTF}:{color_space}:{color_depth}:{color_sampling}:"
    description: Sent when content color properties change

  - id: screen_mask
    label: Screen Mask
    format: "000:SCREEN_MASK:{image_ratio}:{top_trim_rel}:{bottom_trim_rel}:{conservative_ratio}:{top_mask_abs}:{bottom_mask_abs}:"
    description: Sent when masking parameters change

  - id: screen_mask2
    label: Screen Mask 2
    format: "000:SCREEN_MASK2:{top_mask_abs}:{bottom_mask_abs}:{top_calibrated}:{bottom_calibrated}:"
    description: Extended masking info

  - id: cinemascape_mask
    label: CinemaScape Mask
    format: "000:CINEMASCAPE_MASK:{frame_ratio}:"
    description: Sent when CinemaScape frame ratio changes

  - id: cinemascape_mode
    label: CinemaScape Mode
    format: "000:CINEMASCAPE_MODE:{mode}:"
    description: Sent when CinemaScape mode changes

  - id: scale_mode
    label: Scale Mode
    format: "000:SCALE_MODE:{mode}:"
    description: Sent when scale mode changes

  - id: camera_angle
    label: Camera Angle
    format: "000:CAMERA_ANGLE:{cur_angle}:{num_angles}:{in_angle_block}:"
    description: Sent when camera angle availability changes

  - id: child_mode_state
    label: Child Mode State
    format: "000:CHILD_MODE_STATE:{child_mode}:"
    description: "Sent when child UI mode changes (0=inactive, 1=active)"

  - id: user_defined_event
    label: User Defined Event
    format: "000:USER_DEFINED_EVENT:{event_message}:"
    description: "Custom events from scripts, child UI activation, remote volume buttons, Kaleidescape App volume queries, or SEND_EVENT command"

  - id: music_preset_information
    label: Music Preset Information
    format: "000:MUSIC_PRESET_INFORMATION:{tag}:{handle}:{label}:"
    description: Sent when a music preset is assigned

  - id: status_cue_period
    label: Status Cue Period
    format: "000:STATUS_CUE_PERIOD:{period}:"
    description: Response confirmation for SET_STATUS_CUE_PERIOD
```

## Macros

```yaml
macros:
  - id: reconnect_after_leave_standby
    label: Reconnect After Leave Standby
    description: "After LEAVE_STANDBY over TCP/IP: wait 15 seconds, reconnect, send GET_UI_STATE and GET_CHILD_MODE_STATE to resynchronize"
    steps:
      - Send LEAVE_STANDBY command
      - Wait at least 15 seconds
      - Reconnect TCP/IP session
      - Send GET_UI_STATE
      - Send GET_CHILD_MODE_STATE

  - id: startup_initialization
    label: Startup Initialization
    description: "Sequence to initialize after connecting to a powered-on component"
    steps:
      - Send GET_DEVICE_POWER_STATE to check power state
      - Send GET_SYSTEM_VERSION to verify protocol version
      - Send GET_PROTOCOL to check protocol version
      - Send SET_SUPPORTED_PROTOCOL if higher version needed
      - Send SET_PROTOCOL_SETTINGS to configure binary delimiters (optional)
      - Send GET_DEVICE_INFO to discover CPDID
      - Send GET_NUM_ZONES to verify zone configuration
      - Send ENABLE_EVENTS for any remote zones
      - Send SET_STATUS_CUE_PERIOD to enable periodic updates
      - Send GET_UI_STATE to get current display state

  - id: reconnect_after_restart
    label: Reconnect After Player Restart
    description: "Handle PLAYER_RESTART or TCP disconnect by reconnecting and resynchronizing"
    steps:
      - Drop connection if still active
      - Wait at least 30 seconds for reboot
      - Reconnect TCP/IP
      - Re-send all session settings (SET_PROTOCOL_SETTINGS, SET_STATUS_CUE_PERIOD, SET_SCREEN_MASK, etc.)
      - Send GET_UI_STATE to get current state
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - action: bluray_special_stop
    warning: "Can trap user depending on disc authoring. Controller must provide mechanism to return to Kaleidescape menu or movie view."
# UNRESOLVED: no explicit safety interlock procedures stated beyond the BLURAY_SPECIAL_STOP caution
```

## Notes

- **Message format:** `device_id/seq/message_body[/checksum]` — segments delimited by `/`, fields within message body delimited by `:`, messages terminated by CR/LF.
- **Device ID (CPDID):** Two-digit number 01-99. CPDID 01 = directly connected component. Serial number format `#XXXXXXXXXXXX` also supported. Music zone appended as `.XX`.
- **Sequence number:** Single digit 0-9 for commands/responses, `!` for event messages.
- **Checksum:** Optional in commands (mod 100 sum of all preceding chars including trailing `/`), always present in responses/events. Not applicable over TCP/IP.
- **Command routing:** Commands can be routed to other components in the system via CPDID or serial number, even through a single physical connection.
- **TCP/IP connections:** Up to 20 simultaneous connections per component on port 10000.
- **Binary delimiters:** `SET_PROTOCOL_SETTINGS:BINARY_DELIMITERS` replaces `/` with SOH, `:` with STX, `\r\n` with EOT. TCP/IP only. Not supported over RS-232. Binary mode omits checksum.
- **Character set:** ISO 8859-1 (Latin-1), printable ASCII 32-255. Special characters escaped with `\`.
- **Standby behavior:** 1080p Player, 1080p Mini Player, Movie Player 2, and Music Player drop TCP/IP connection on entering/leaving standby. Controller should reconnect after 15+ seconds (LEAVE_STANDBY) or 30+ seconds (PLAYER_RESTART).
- **Session state reset:** Settings like SET_PROTOCOL_SETTINGS, SET_STATUS_CUE_PERIOD, SET_SCREEN_MASK are lost on component restart and must be re-sent.
- **Protocol version:** Document describes protocol version 18 (kOS 10.18). Without SET_SUPPORTED_PROTOCOL, session defaults to version 14 features.
- **VIDEO_MODE values 39-57** require `ACTIVE_PROTOCOL:18` or higher.
- **USER_DEFINED_EVENT volume messages** (`VOLUME_UP_PRESS`, `VOLUME_DOWN_PRESS`, `VOLUME_UP_RELEASE`, `VOLUME_DOWN_RELEASE`, `TOGGLE_MUTE`, `VOLUME_QUERY`) come from Kaleidescape Remote and Kaleidescape Apps when volume capability enabled.
- **GO_MOVIE_STORE** requires `ACTIVE_PROTOCOL:16`; **library search UI** screen 18 requires `ACTIVE_PROTOCOL:17`.

<!-- UNRESOLVED: exact differences between KPLAYER-6000, 5000, 2500, 2000 not specified -->
<!-- UNRESOLVED: maximum concurrent zone count per player model not specified -->
<!-- UNRESOLVED: BROWSE response multi-line details not fully reproduced here; see source for full BROWSE_RESULT action1-4 fields -->
<!-- UNRESOLVED: GET_PROTOCOL_VERSION legacy command behavior — response format differs from GET_PROTOCOL -->
<!-- UNRESOLVED: server-side serial baud (115200) is supported per Table 2 but KPLAYER players use 19200 -->
<!-- UNRESOLVED: content_details_table 'movies' vs 'albums' field contents -->

## Provenance

```yaml
source_domains:
  - kaleidescape.com
source_urls:
  - https://www.kaleidescape.com/wp-content/uploads/Kaleidescape-System-Control-Protocol-Reference-Manual.pdf
  - https://www.kaleidescape.com/wp-content/uploads/integrating-with-the-kaleidescape-mobile-app.pdf
retrieved_at: 2026-05-21T02:53:34.336Z
last_checked_at: 2026-07-21T22:57:03.125Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:57:03.125Z
matched_actions: 205
action_count: 205
confidence: medium
summary: "All 205 spec action/feedback units match literal source commands with correct shapes; every source command heading is represented in the spec. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated"
- "exact product feature differences between KPLAYER models not specified"
- "no explicit safety interlock procedures stated beyond the BLURAY_SPECIAL_STOP caution"
- "exact differences between KPLAYER-6000, 5000, 2500, 2000 not specified"
- "maximum concurrent zone count per player model not specified"
- "BROWSE response multi-line details not fully reproduced here; see source for full BROWSE_RESULT action1-4 fields"
- "GET_PROTOCOL_VERSION legacy command behavior — response format differs from GET_PROTOCOL"
- "server-side serial baud (115200) is supported per Table 2 but KPLAYER players use 19200"
- "content_details_table 'movies' vs 'albums' field contents"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
