---
spec_id: admin/request-f3
schema_version: ai4av-public-spec-v1
revision: 1
title: "ReQuest F3 Control Spec"
manufacturer: ReQuest
model_family: F3
aliases: []
compatible_with:
  manufacturers:
    - ReQuest
  models:
    - F3
  firmware: "Linux firmware 2.2.0 or higher"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - request.com
source_urls:
  - "http://www.request.com/downloads/Integration%20-%20ReQuest%20Communication%20Protocol%20Guide%20v220.pdf"
retrieved_at: 2026-08-11T04:36:15.169Z
last_checked_at: 2026-08-19T09:42:49.232Z
generated_at: 2026-08-19T09:42:49.232Z
firmware_coverage: "Linux firmware 2.2.0 or higher"
protocol_coverage: []
known_gaps:
  - "TCP port number is not stated in source."
  - "TCP port number not stated in source"
  - "source gives no explicit command-safety interlocks or confirmation requirements."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:42:49.232Z
  matched_actions: 239
  action_count: 239
  confidence: medium
  summary: "All 239 spec actions match source hex bytes verbatim; transport matches source COM settings for multi-zone units; no fabricated actions and no missing source tokens. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# ReQuest F3 Control Spec

## Summary
The ReQuest F3 is an F-Series multi-zone digital music system controlled through IR, rear-port RS-232, or Ethernet. This spec covers the Serial/Ethernet protocol from Multi-Zone Communication Protocol Guide version 2.2.0, including command bytes, zone framing, feedback data, and initialization.

<!-- UNRESOLVED: TCP port number is not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power commands
- routable        # inferred from active-zone commands
- queryable       # inferred from feedback and query commands
- levelable       # inferred from analog volume commands
```

## Actions
```yaml
# Connection and active-zone control
- id: init_connection
  label: Initialize Connection
  kind: action
  command: "5F A1"
  params: []

- id: get_current_active_zone
  label: Get Current Active Zone
  kind: query
  command: "4C 00"
  params: []

- id: set_zone_1_active
  label: Set Zone 1 Active
  kind: action
  command: "4C 01"
  params: []

- id: set_zone_2_active
  label: Set Zone 2 Active
  kind: action
  command: "4C 02"
  params: []

- id: set_zone_3_active
  label: Set Zone 3 Active
  kind: action
  command: "4C 03"
  params: []

- id: set_zone_4_active
  label: Set Zone 4 Active
  kind: action
  command: "4C 04"
  params: []

- id: set_previous_zone_active
  label: Set Previous Zone Active
  kind: action
  command: "4C FE"
  params: []

- id: set_next_zone_active
  label: Set Next Zone Active
  kind: action
  command: "4C FF"
  params: []

# Power
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "30 03"
  params: []

- id: power_on
  label: Power ON
  kind: action
  command: "30 73"
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "30 74"
  params: []

# Transport and playback
- id: pause_toggle
  label: Pause Toggle
  kind: action
  command: "30 0F"
  params: []

- id: pause_on
  label: Pause ON
  kind: action
  command: "30 84"
  params: []

- id: pause_off
  label: Pause OFF
  kind: action
  command: "30 81"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "30 0E"
  params: []

- id: play
  label: Play
  kind: action
  command: "30 8C"
  params: []

- id: play_pause_toggle
  label: Play/Pause Toggle
  kind: action
  command: "30 B2"
  params: []

- id: enter_pause
  label: Enter / Pause
  kind: action
  command: "30 19"
  params: []

- id: enter_no_flip
  label: Enter - No Flip
  kind: action
  command: "30 8D"
  params: []

- id: next_song
  label: Next Song
  kind: action
  command: "30 89"
  params: []

- id: previous_song
  label: Previous Song
  kind: action
  command: "30 87"
  params: []

- id: fast_forward
  label: Fast Forward
  kind: action
  command: "30 88"
  params: []

- id: rewind
  label: Rewind
  kind: action
  command: "30 8A"
  params: []

- id: forward_right
  label: Forward / Right
  kind: action
  command: "30 16"
  params: []

- id: rewind_left
  label: Rewind / Left
  kind: action
  command: "30 18"
  params: []

- id: seek
  label: Seek to Time
  kind: action
  command: "44 {byte_1} {byte_2}"
  params:
    - name: seconds
      type: integer
      description: Target time encoded in two bytes using source-documented seek calculation

# Volume
- id: volume_up
  label: Volume Up
  kind: action
  command: "30 1A"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "30 1B"
  params: []

- id: set_volume_level
  label: Set Volume Level
  kind: action
  command: "49 {level}"
  params:
    - name: level
      type: integer
      description: "00h-64h for 0-100, FFh for mute, or FEh for unmute"

# Playback modes
- id: shuffle_toggle
  label: Shuffle Toggle
  kind: action
  command: "30 11"
  params: []

- id: shuffle_on
  label: Shuffle ON
  kind: action
  command: "30 85"
  params: []

- id: shuffle_off
  label: Shuffle OFF
  kind: action
  command: "30 82"
  params: []

- id: repeat_toggle
  label: Repeat Toggle
  kind: action
  command: "30 12"
  params: []

- id: repeat_continuous_toggle
  label: Repeat/Continuous/Normal Toggle
  kind: action
  command: "30 B0"
  params: []

- id: repeat_continuous_off
  label: Repeat/Continuous OFF
  kind: action
  command: "30 83"
  params: []

- id: repeat_on
  label: Repeat ON
  kind: action
  command: "30 86"
  params: []

- id: continuous_toggle
  label: Continuous Toggle
  kind: action
  command: "30 AF"
  params: []

- id: continuous_on
  label: Continuous ON
  kind: action
  command: "30 3C"
  params: []

- id: random_in
  label: Random IN
  kind: action
  command: "30 80"
  params: []

- id: random_out
  label: Random OUT
  kind: action
  command: "30 7F"
  params: []

- id: intro_toggle
  label: Intro Toggle
  kind: action
  command: "30 5F"
  params: []

# Navigation
- id: mode
  label: Mode
  kind: action
  command: "30 01"
  params: []

- id: menu
  label: Menu
  kind: action
  command: "30 02"
  params: []

- id: cancel
  label: Cancel
  kind: action
  command: "30 13"
  params: []

- id: next_down
  label: Next / Down
  kind: action
  command: "30 17"
  params: []

- id: previous_up
  label: Previous / Up
  kind: action
  command: "30 15"
  params: []

- id: jump_down
  label: Jump Down
  kind: action
  command: "30 1D"
  params: []

- id: jump_up
  label: Jump Up
  kind: action
  command: "30 1C"
  params: []

- id: jump_down_x
  label: Jump Down X Lines
  kind: action
  command: "46 {lines}"
  params:
    - name: lines
      type: integer
      description: "01h-08h"

- id: jump_up_x
  label: Jump Up X Lines
  kind: action
  command: "45 {lines}"
  params:
    - name: lines
      type: integer
      description: "01h-08h"

- id: move_to_top
  label: Move to Top of List
  kind: action
  command: "30 B3"
  params: []

- id: move_to_bottom
  label: Move to Bottom of List
  kind: action
  command: "30 B4"
  params: []

- id: move_to_line_x
  label: Move to Line X
  kind: action
  command: "3D {line}"
  params:
    - name: line
      type: integer
      description: Target line

- id: jump_to_line_x_flip
  label: Jump to Line X - Flip
  kind: action
  command: "5D {line}"
  params:
    - name: line
      type: integer
      description: Target line; issues Enter and may switch to Player

- id: jump_to_line_x_noflip
  label: Jump to Line X - No Flip
  kind: action
  command: "3E {line}"
  params:
    - name: line
      type: integer
      description: Target line; issues Enter without switching to Player

- id: go_to_albums
  label: Go to Albums
  kind: action
  command: "30 21"
  params: []

- id: go_to_all_songs
  label: Go to All Songs
  kind: action
  command: "30 1F"
  params: []

- id: go_to_artists
  label: Go to Artists
  kind: action
  command: "30 20"
  params: []

- id: go_to_cd
  label: Go to CD
  kind: action
  command: "30 1E"
  params: []

- id: go_to_genres
  label: Go to Genres
  kind: action
  command: "30 6A"
  params: []

- id: go_to_now_playing
  label: Go to Now Playing
  kind: action
  command: "30 22"
  params: []

- id: go_to_playlists
  label: Go to Playlists
  kind: action
  command: "30 69"
  params: []

- id: go_to_selected_songs
  label: Go to Selected Songs
  kind: action
  command: "30 A6"
  params: []

- id: go_to_navigator
  label: Go to Navigator
  kind: action
  command: "30 8E"
  params: []

- id: go_to_player
  label: Go to Player
  kind: action
  command: "30 8F"
  params: []

- id: go_to_current_album
  label: Go to Current Playing Album
  kind: action
  command: "30 BA"
  params: []

- id: go_to_current_artist
  label: Go to Current Playing Artist
  kind: action
  command: "30 B9"
  params: []

- id: go_to_current_genre
  label: Go to Current Playing Genre
  kind: action
  command: "30 79"
  params: []

- id: go_to_current_playlist
  label: Go to Current Playing Playlist
  kind: action
  command: "30 7A"
  params: []

- id: go_to_current_song
  label: Go to Current Playing Song
  kind: action
  command: "30 B8"
  params: []

- id: next_album
  label: Next Album
  kind: action
  command: "30 AC"
  params: []

- id: previous_album
  label: Previous Album
  kind: action
  command: "30 AD"
  params: []

- id: next_artist
  label: Next Artist
  kind: action
  command: "30 AA"
  params: []

- id: previous_artist
  label: Previous Artist
  kind: action
  command: "30 AB"
  params: []

- id: next_genre
  label: Next Genre
  kind: action
  command: "30 6C"
  params: []

- id: previous_genre
  label: Previous Genre
  kind: action
  command: "30 6B"
  params: []

- id: next_playlist
  label: Next Playlist
  kind: action
  command: "30 9E"
  params: []

- id: previous_playlist
  label: Previous Playlist
  kind: action
  command: "30 9F"
  params: []

- id: info
  label: Info
  kind: action
  command: "30 5E"
  params: []

- id: search
  label: Search
  kind: action
  command: "30 64"
  params: []

- id: themes
  label: Themes
  kind: action
  command: "30 5C"
  params: []

- id: visuals
  label: Visuals
  kind: action
  command: "30 5B"
  params: []

# Playlist operations
- id: queue
  label: Queue
  kind: action
  command: "30 68"
  params: []

- id: play_now
  label: Play Now - Flip
  kind: action
  command: "30 AE"
  params: []

- id: play_now_noflip
  label: Play Now - No Flip
  kind: action
  command: "30 6E"
  params: []

- id: select_toggle
  label: Select Toggle
  kind: action
  command: "30 14"
  params: []

- id: deselect
  label: Deselect All
  kind: action
  command: "30 76"
  params: []

- id: clear_now_playing
  label: Clear Now Playing
  kind: action
  command: "30 A0"
  params: []

- id: copy
  label: Copy
  kind: action
  command: "30 66"
  params: []

- id: delete
  label: Delete
  kind: action
  command: "30 65"
  params: []

- id: delete_from_playlist
  label: Delete from Playlist
  kind: action
  command: "30 B1"
  params: []

- id: edit
  label: Edit
  kind: action
  command: "30 7D"
  params: []

- id: edit_genre
  label: Edit Genre
  kind: action
  command: "30 6D"
  params: []

- id: create_empty_playlist
  label: Create Empty Playlist
  kind: action
  command: "30 A7"
  params: []

- id: create_now_playing_playlist
  label: Create Playlist from Now Playing
  kind: action
  command: "30 A8"
  params: []

- id: create_selected_songs_playlist
  label: Create Playlist from Selected Songs
  kind: action
  command: "30 A9"
  params: []

- id: play_playlist_1
  label: Play Playlist 1
  kind: action
  command: "30 94"
  params: []

- id: play_playlist_2
  label: Play Playlist 2
  kind: action
  command: "30 95"
  params: []

- id: play_playlist_3
  label: Play Playlist 3
  kind: action
  command: "30 96"
  params: []

- id: play_playlist_4
  label: Play Playlist 4
  kind: action
  command: "30 97"
  params: []

- id: play_playlist_5
  label: Play Playlist 5
  kind: action
  command: "30 98"
  params: []

- id: play_playlist_6
  label: Play Playlist 6
  kind: action
  command: "30 99"
  params: []

- id: play_playlist_7
  label: Play Playlist 7
  kind: action
  command: "30 9A"
  params: []

- id: play_playlist_8
  label: Play Playlist 8
  kind: action
  command: "30 9B"
  params: []

- id: play_playlist_9
  label: Play Playlist 9
  kind: action
  command: "30 9C"
  params: []

- id: play_playlist_10
  label: Play Playlist 10
  kind: action
  command: "30 9D"
  params: []

- id: direct_playlist_access_flip
  label: Direct Playlist Access - Flip
  kind: action
  command: "42 {n}"
  params:
    - name: n
      type: integer
      description: "Playlist number 01h-FFh"

- id: direct_playlist_access_noflip
  label: Direct Playlist Access - No Flip
  kind: action
  command: "43 {n}"
  params:
    - name: n
      type: integer
      description: "Playlist number 01h-FFh"

- id: queue_by_song_id
  label: Queue by Song ID
  kind: action
  command: "4B {id_byte_1} {id_byte_2} {id_byte_3} {id_byte_4}"
  params:
    - name: song_id
      type: integer
      description: Song ID starting at 1001, encoded LSBF in four bytes

- id: queue_by_song_path
  label: Queue by Song Path
  kind: action
  command: "4D {path_length} {path}"
  params:
    - name: path
      type: string
      description: Path of up to 255 bytes beginning with /MP3

# CD and recording
- id: eject
  label: Eject
  kind: action
  command: "30 8B"
  params: []

- id: record
  label: Record
  kind: action
  command: "30 10"
  params: []

- id: record_no_edit
  label: Record - No Edit
  kind: action
  command: "30 90"
  params: []

- id: line_in_play
  label: Line-In Play
  kind: action
  command: "30 B5"
  params: []

- id: line_in_record
  label: Line-In Record
  kind: action
  command: "30 B6"
  params: []

- id: auto_rip_on
  label: Auto Rip ON
  kind: action
  command: "30 92"
  params: []

- id: auto_rip_off
  label: Auto Rip OFF
  kind: action
  command: "30 93"
  params: []

- id: freedb_reset
  label: FreeDB Reset
  kind: action
  command: "30 75"
  params: []

# Text input
- id: back_space
  label: Back Space
  kind: action
  command: "30 3F"
  params: []

- id: space
  label: Space
  kind: action
  command: "30 3D"
  params: []

- id: letter_a
  label: Letter "a"
  kind: action
  command: "30 23"
  params: []

- id: letter_b
  label: Letter "b"
  kind: action
  command: "30 24"
  params: []

- id: letter_c
  label: Letter "c"
  kind: action
  command: "30 25"
  params: []

- id: letter_d
  label: Letter "d"
  kind: action
  command: "30 26"
  params: []

- id: letter_e
  label: Letter "e"
  kind: action
  command: "30 27"
  params: []

- id: letter_f
  label: Letter "f"
  kind: action
  command: "30 28"
  params: []

- id: letter_g
  label: Letter "g"
  kind: action
  command: "30 29"
  params: []

- id: letter_h
  label: Letter "h"
  kind: action
  command: "30 2A"
  params: []

- id: letter_i
  label: Letter "i"
  kind: action
  command: "30 2B"
  params: []

- id: letter_j
  label: Letter "j"
  kind: action
  command: "30 2C"
  params: []

- id: letter_k
  label: Letter "k"
  kind: action
  command: "30 2D"
  params: []

- id: letter_l
  label: Letter "l"
  kind: action
  command: "30 2E"
  params: []

- id: letter_m
  label: Letter "m"
  kind: action
  command: "30 2F"
  params: []

- id: letter_n
  label: Letter "n"
  kind: action
  command: "30 30"
  params: []

- id: letter_o
  label: Letter "o"
  kind: action
  command: "30 31"
  params: []

- id: letter_p
  label: Letter "p"
  kind: action
  command: "30 32"
  params: []

- id: letter_q
  label: Letter "q"
  kind: action
  command: "30 33"
  params: []

- id: letter_r
  label: Letter "r"
  kind: action
  command: "30 34"
  params: []

- id: letter_s
  label: Letter "s"
  kind: action
  command: "30 35"
  params: []

- id: letter_t
  label: Letter "t"
  kind: action
  command: "30 36"
  params: []

- id: letter_u
  label: Letter "u"
  kind: action
  command: "30 37"
  params: []

- id: letter_v
  label: Letter "v"
  kind: action
  command: "30 38"
  params: []

- id: letter_w
  label: Letter "w"
  kind: action
  command: "30 39"
  params: []

- id: letter_x
  label: Letter "x"
  kind: action
  command: "30 3A"
  params: []

- id: letter_y
  label: Letter "y"
  kind: action
  command: "30 3B"
  params: []

- id: letter_z
  label: Letter "z"
  kind: action
  command: "30 3E"
  params: []

- id: letter_A
  label: Letter "A"
  kind: action
  command: "30 41"
  params: []

- id: letter_B
  label: Letter "B"
  kind: action
  command: "30 42"
  params: []

- id: letter_C
  label: Letter "C"
  kind: action
  command: "30 43"
  params: []

- id: letter_D
  label: Letter "D"
  kind: action
  command: "30 44"
  params: []

- id: letter_E
  label: Letter "E"
  kind: action
  command: "30 45"
  params: []

- id: letter_F
  label: Letter "F"
  kind: action
  command: "30 46"
  params: []

- id: letter_G
  label: Letter "G"
  kind: action
  command: "30 47"
  params: []

- id: letter_H
  label: Letter "H"
  kind: action
  command: "30 48"
  params: []

- id: letter_I
  label: Letter "I"
  kind: action
  command: "30 49"
  params: []

- id: letter_J
  label: Letter "J"
  kind: action
  command: "30 4A"
  params: []

- id: letter_K
  label: Letter "K"
  kind: action
  command: "30 4B"
  params: []

- id: letter_L
  label: Letter "L"
  kind: action
  command: "30 4C"
  params: []

- id: letter_M
  label: Letter "M"
  kind: action
  command: "30 4D"
  params: []

- id: letter_N
  label: Letter "N"
  kind: action
  command: "30 4E"
  params: []

- id: letter_O
  label: Letter "O"
  kind: action
  command: "30 4F"
  params: []

- id: letter_P
  label: Letter "P"
  kind: action
  command: "30 50"
  params: []

- id: letter_Q
  label: Letter "Q"
  kind: action
  command: "30 51"
  params: []

- id: letter_R
  label: Letter "R"
  kind: action
  command: "30 52"
  params: []

- id: letter_S
  label: Letter "S"
  kind: action
  command: "30 53"
  params: []

- id: letter_T
  label: Letter "T"
  kind: action
  command: "30 54"
  params: []

- id: letter_U
  label: Letter "U"
  kind: action
  command: "30 55"
  params: []

- id: letter_V
  label: Letter "V"
  kind: action
  command: "30 56"
  params: []

- id: letter_W
  label: Letter "W"
  kind: action
  command: "30 57"
  params: []

- id: letter_X
  label: Letter "X"
  kind: action
  command: "30 58"
  params: []

- id: letter_Y
  label: Letter "Y"
  kind: action
  command: "30 59"
  params: []

- id: letter_Z
  label: Letter "Z"
  kind: action
  command: "30 5A"
  params: []

- id: number_0
  label: Number "0"
  kind: action
  command: "30 0D"
  params: []

- id: number_1
  label: Number "1"
  kind: action
  command: "30 04"
  params: []

- id: number_2
  label: Number "2"
  kind: action
  command: "30 05"
  params: []

- id: number_3
  label: Number "3"
  kind: action
  command: "30 06"
  params: []

- id: number_4
  label: Number "4"
  kind: action
  command: "30 07"
  params: []

- id: number_5
  label: Number "5"
  kind: action
  command: "30 08"
  params: []

- id: number_6
  label: Number "6"
  kind: action
  command: "30 09"
  params: []

- id: number_7
  label: Number "7"
  kind: action
  command: "30 0A"
  params: []

- id: number_8
  label: Number "8"
  kind: action
  command: "30 0B"
  params: []

- id: number_9
  label: Number "9"
  kind: action
  command: "30 0C"
  params: []

# Source-listed symbol entries sharing bytes with contextual commands
- id: symbol_double_quote
  label: Symbol Double Quote
  kind: action
  command: "30 75"
  params: []

- id: symbol_exclamation
  label: Symbol Exclamation Mark
  kind: action
  command: "30 79"
  params: []

- id: symbol_hash
  label: Symbol Number Sign
  kind: action
  command: "30 6A"
  params: []

- id: symbol_dollar
  label: Symbol Dollar Sign
  kind: action
  command: "30 6B"
  params: []

- id: symbol_ampersand
  label: Symbol Ampersand
  kind: action
  command: "30 78"
  params: []

- id: symbol_left_parenthesis
  label: Symbol Left Parenthesis
  kind: action
  command: "30 6E"
  params: []

- id: symbol_right_parenthesis
  label: Symbol Right Parenthesis
  kind: action
  command: "30 6F"
  params: []

- id: symbol_asterisk
  label: Symbol Asterisk
  kind: action
  command: "30 6C"
  params: []

- id: symbol_comma
  label: Symbol Comma
  kind: action
  command: "30 7B"
  params: []

- id: symbol_period
  label: Symbol Period
  kind: action
  command: "30 7C"
  params: []

- id: symbol_slash
  label: Symbol Slash
  kind: action
  command: "30 6D"
  params: []

- id: symbol_colon
  label: Symbol Colon
  kind: action
  command: "30 74"
  params: []

- id: symbol_question
  label: Symbol Question Mark
  kind: action
  command: "30 7A"
  params: []

- id: symbol_at
  label: Symbol At Sign
  kind: action
  command: "30 69"
  params: []

- id: symbol_underscore
  label: Symbol Underscore
  kind: action
  command: "30 70"
  params: []

- id: symbol_tilde
  label: Symbol Tilde
  kind: action
  command: "30 73"
  params: []

- id: symbol_hyphen
  label: Symbol Hyphen
  kind: action
  command: "30 71"
  params: []

- id: symbol_plus
  label: Symbol Plus Sign
  kind: action
  command: "30 72"
  params: []

- id: symbol_equals
  label: Symbol Equals Sign
  kind: action
  command: "30 77"
  params: []

- id: symbol_apostrophe
  label: Symbol Apostrophe
  kind: action
  command: "30 76"
  params: []

# System and advanced
- id: reboot
  label: Reboot
  kind: action
  command: "30 B7"
  params: []

- id: refresh
  label: Refresh
  kind: query
  command: "48"
  params: []

- id: lcd_gui_data_request
  label: LCD/GUI Data Request
  kind: query
  command: "3F"
  params: []

- id: ethernet_ping_request
  label: Ethernet Ping Request
  kind: query
  command: "47"
  params: []

- id: start_tv_out
  label: Restart TV Out
  kind: action
  command: "30 77"
  params: []

- id: start_netsync
  label: Start Netsync
  kind: action
  command: "30 BD"
  params: []

- id: cancel_netsync
  label: Cancel Netsync
  kind: action
  command: "30 BE"
  params: []

- id: set_pro_as_pro_only
  label: Set Pro as "Pro Only"
  kind: action
  command: "30 BB"
  params: []

- id: set_pro_as_zone
  label: Set Pro as "Pro as Zone"
  kind: action
  command: "30 BC"
  params: []

# Feedback control
- id: feedback_off
  label: Feedback OFF
  kind: action
  command: "6E"
  params: []

- id: compressed_lcd_on
  label: Compressed LCD ON
  kind: action
  command: "4C 66"
  params: []

- id: lcd_off
  label: LCD OFF
  kind: action
  command: "4C 30"
  params: []

- id: compressed_gui_on
  label: Compressed GUI ON
  kind: action
  command: "47 63"
  params: []

- id: gui_off
  label: GUI OFF
  kind: action
  command: "47 30"
  params: []

- id: elapsed_time_on
  label: Elapsed Time ON
  kind: action
  command: "2B 74"
  params: []

- id: elapsed_time_off
  label: Elapsed Time OFF
  kind: action
  command: "2D 74"
  params: []

- id: constant_player_data_on
  label: Constant Player Data ON
  kind: action
  command: "6D 2B"
  params: []

- id: constant_player_data_off
  label: Constant Player Data OFF
  kind: action
  command: "6D 2D"
  params: []

- id: status_messages_on
  label: Status Messages ON
  kind: action
  command: "73 2B"
  params: []

- id: status_messages_off
  label: Status Messages OFF
  kind: action
  command: "73 2D"
  params: []

- id: active_zone_feedback_on
  label: Active Zone Feedback ON
  kind: action
  command: "33 7A 2B"
  params: []

- id: active_zone_feedback_off
  label: Active Zone Feedback OFF
  kind: action
  command: "33 7A 2D"
  params: []

- id: ir_action_feedback_on
  label: IR Action Feedback ON
  kind: action
  command: "3B 00"
  params: []

- id: ir_action_feedback_off
  label: IR Action Feedback OFF
  kind: action
  command: "3B 01"
  params: []

- id: reset_ir
  label: Reset IR
  kind: action
  command: "3B FF"
  params: []

# Path requests
- id: path_request
  label: Path Request
  kind: query
  command: "4A {path_type}"
  params:
    - name: path_type
      type: integer
      description: "01h-0Bh"

- id: path_request_player_current_image_large
  label: Request Player Current Song Image - Large
  kind: query
  command: "4A 01"
  params: []

- id: path_request_player_current_image_small
  label: Request Player Current Song Image - Small
  kind: query
  command: "4A 02"
  params: []

- id: path_request_player_current_song_path
  label: Request Player Current Song Path
  kind: query
  command: "4A 03"
  params: []

- id: path_request_navigator_image_large
  label: Request Navigator Image - Large
  kind: query
  command: "4A 04"
  params: []

- id: path_request_navigator_image_small
  label: Request Navigator Image - Small
  kind: query
  command: "4A 05"
  params: []

- id: path_request_navigator_song_path
  label: Request Navigator Song Path
  kind: query
  command: "4A 06"
  params: []

- id: path_request_current_song_id
  label: Request Player Current Song ID
  kind: query
  command: "4A 07"
  params: []

- id: path_request_next_song_id
  label: Request Player Next Song ID
  kind: query
  command: "4A 08"
  params: []

- id: path_request_next_song_image_large
  label: Request Player Next Song Image - Large
  kind: query
  command: "4A 09"
  params: []

- id: path_request_next_song_image_small
  label: Request Player Next Song Image - Small
  kind: query
  command: "4A 0A"
  params: []

- id: path_request_next_song_path
  label: Request Player Next Song Path
  kind: query
  command: "4A 0B"
  params: []
```

## Feedbacks
```yaml
- id: lcd_data
  type: object
  description: "Data type 31h: unused byte, cursor X, cursor Y, line number, and up to 32 bytes of text."

- id: gui_data_player
  type: object
  description: "Data type 32h, screen type 11h: Player data."

- id: gui_data_navigator
  type: object
  description: "Data type 32h, screen type 12h: Navigator data."

- id: status_message
  type: object
  description: "Data type 36h: two-byte LSBF state plus NetSync, software-update, search, screen-saver, and volume bytes."

- id: cover_art_stream_path
  type: object
  description: "Data type 37h: path type followed by up to 255 bytes of path data."

- id: timed_dialog_message
  type: object
  description: "Data type 38h: title, null delimiter, message, null delimiter, and four-byte LSBF display time."

- id: player_song_changed
  type: object
  description: "Data type 39h."

- id: navigator_selection_changed
  type: object
  description: "Data type 3Ah."

- id: ir_action_feedback
  type: object
  description: "Data type 3Bh followed by the two-byte command of the received IR action."

- id: ethernet_ping_response
  type: object
  description: "Data type 47h; returned only to TCP/IP connections."

- id: zone_active_feedback
  type: object
  description: "Data type 4Ch followed by active-zone number and ASCII zone name."

- id: power_state
  type: enum
  description: "Status state 101 indicates soft power off."
  values: [soft_off, on]

- id: player_state
  type: enum
  description: "GUI Player header 05h: 1=Stopped, 2=Playing, 3=Paused."
  values: [stopped, playing, paused]

- id: shuffle_state
  type: enum
  description: "GUI Player header 02h: 0=OFF, 1=ON."
  values: [off, on]

- id: repeat_continuous_state
  type: enum
  description: "GUI Player header 03h: 0=OFF, 1=Repeat, 2=Continuous."
  values: [off, repeat, continuous]

- id: intro_state
  type: enum
  description: "GUI Player header 04h: 0=OFF, 1=ON."
  values: [off, on]

- id: current_song_selected
  type: enum
  description: "GUI Player header 08h: 0=not selected, 1=selected."
  values: [not_selected, selected]

- id: next_song_selected
  type: enum
  description: "GUI Player header 0Ah: 0=not selected, 1=selected."
  values: [not_selected, selected]

- id: navigator_scroll_state
  type: object
  description: "GUI Navigator header 03h: one up-arrow byte and one down-arrow byte; each is 0 when no additional lines exist and 1 when additional lines exist."

- id: netsync_state
  type: enum
  description: "Status NetSync byte: 1 means NetSyncing to master."
  values: [idle, netsyncing]

- id: sw_update_state
  type: enum
  description: "Status software-update byte: 1 means downloading an update."
  values: [idle, downloading]

- id: search_state
  type: enum
  description: "Status Search byte: 1 means Extended Search mode."
  values: [idle, extended_search]

- id: screen_saver_state
  type: enum
  description: "Status Screen Saver byte: 1 means Screen Saver active."
  values: [idle, screen_saver]

- id: volume_level
  type: integer
  description: "Status volume byte: 00h-64h for 0-100 or FFh for mute; valid only for analog audio output."
  range: [0, 100]
```

## Variables
```yaml
- id: volume_level
  type: integer
  range: [0, 100]
  description: "Analog output volume; FFh mutes and FEh unmutes."

- id: elapsed_time
  type: integer
  description: "Current playback position in seconds, returned LSBF in four bytes."

- id: total_time
  type: integer
  description: "Total song time in seconds, returned LSBF in four bytes."

- id: current_track_number
  type: integer
  description: "Current track number, returned LSBF in four bytes."

- id: total_tracks
  type: integer
  description: "Total tracks, returned LSBF in four bytes."

- id: cursor_x
  type: integer
  description: "LCD cursor X position."

- id: cursor_y
  type: integer
  description: "LCD cursor Y position."

- id: navigator_cursor_position
  type: integer
  description: "Two-byte Navigator cursor-position bitmap with one bit for each of eight lines."

- id: list_item_count
  type: integer
  description: "Number of items in current Navigator list, returned LSBF in four bytes."

- id: playlist_name
  type: string
  description: "Current Player playlist name, up to 32 bytes."

- id: next_song_title
  type: string
  description: "Next song title, up to 32 bytes."

- id: current_song_title
  type: string
  description: "Current song title, up to 32 bytes."

- id: current_artist_name
  type: string
  description: "Current artist name, up to 32 bytes."

- id: current_album_name
  type: string
  description: "Current album name, up to 32 bytes."

- id: current_genre
  type: string
  description: "Current genre, up to 32 bytes."

- id: next_track_artist
  type: string
  description: "Next track artist, up to 32 bytes."

- id: next_track_album
  type: string
  description: "Next track album, up to 32 bytes."

- id: next_track_genre
  type: string
  description: "Next track genre, up to 32 bytes."

- id: navigator_window_title
  type: string
  description: "Navigator window title, up to 32 bytes."

- id: navigator_line_1
  type: string
  description: "Navigator line 1, up to 32 bytes."

- id: navigator_line_2
  type: string
  description: "Navigator line 2, up to 32 bytes."

- id: navigator_line_3
  type: string
  description: "Navigator line 3, up to 32 bytes."

- id: navigator_line_4
  type: string
  description: "Navigator line 4, up to 32 bytes."

- id: navigator_line_5
  type: string
  description: "Navigator line 5, up to 32 bytes."

- id: navigator_line_6
  type: string
  description: "Navigator line 6, up to 32 bytes."

- id: navigator_line_7
  type: string
  description: "Navigator line 7, up to 32 bytes."

- id: navigator_line_8
  type: string
  description: "Navigator line 8, up to 32 bytes."

- id: selected_artist
  type: string
  description: "Navigator selected artist, up to 32 bytes."

- id: selected_album
  type: string
  description: "Navigator selected album, up to 32 bytes."

- id: selected_genre
  type: string
  description: "Navigator selected genre, up to 32 bytes."

- id: selected_playlist
  type: string
  description: "Navigator selected playlist, up to 32 bytes."
```

## Events
```yaml
- id: player_song_changed_event
  data_type: "39h"
  description: "Sent when current song changes."

- id: navigator_selection_changed_event
  data_type: "3Ah"
  description: "Sent when highlighted Navigator item changes."

- id: ir_action_event
  data_type: "3Bh"
  description: "Carries two-byte command of received IR action when IR feedback is enabled."

- id: timed_dialog_event
  data_type: "38h"
  description: "Sent for timed dialog messages."

- id: status_change_event
  data_type: "36h"
  description: "Carries state, NetSync, update, search, screen-saver, and analog-volume status."

- id: lcd_update_event
  data_type: "31h"
  description: "Carries LCD update data."

- id: gui_update_event
  data_type: "32h"
  description: "Carries Player or Navigator GUI update data."

- id: zone_active_change_event
  data_type: "4Ch"
  description: "Carries active-zone number and name."

- id: cover_art_event
  data_type: "37h"
  description: "Response to Path Request."

- id: ethernet_ping_response_event
  data_type: "47h"
  description: "Response to Ethernet Ping Request on TCP/IP connections."
```

## Macros
```yaml
- id: enable_all_feedback_zone1
  label: Enable Recommended Feedback for Zone 1
  kind: macro
  description: Enable Compressed GUI, Elapsed Time, Constant Player Data, and Status Messages.
  steps:
    - { send: "33 47 63 F1 FF FB" }
    - { send: "33 2B 74 F1 FF FB" }
    - { send: "33 6D 2B F1 FF FB" }
    - { send: "33 73 2B F1 FF FB" }
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source gives no explicit command-safety interlocks or confirmation requirements.
```

## Notes

Every Serial/Ethernet command is followed by a three-byte zone footer: `F1 FF FB` through `F4 FF FB` select Zones 1–4, while `F0 FF FB` selects the currently active zone.

`5F A1` MUST be the first string sent on every connection. Omitting it selects the older protocol and prevents access to Zones 2–4 on F-Series systems.

Serial and Ethernet use identical commands and feedback. Multi-zone units use 57600 baud, 8 data bits, no parity, 1 stop bit, and no flow control. Control requires the rear male RS-232 port and a female-to-female null-modem cable; the front serial port cannot control the unit.

Feedback is opt-in. Feedback initialization commands use command header `33h` and the destination zone footer. Every feedback item is delimited by the same three-byte zone footer.

Status state values are: 100 Navigator, 101 soft power off, 102 Edit, 103 Info, 105 Day/Time, 106 Line In Recording, 107 Line In Info, 108 Edit list box, 240/241 Player, 303 Non-Timed Dialog, 400 Menu, 500/502 Encoder, 501 Encoder Edit, 503 Genre Lookup, 504 Transcode, 600 Visuals, 700 unusable during software update, and 701 Safe Mode after hardware or software failure.

The analog volume feedback byte is invalid for digital outputs, which remain at maximum.

The Ethernet Ping response is returned only on TCP/IP connections. Serial connections receive no response.

<!-- UNRESOLVED: TCP port number is not stated in source. -->

## Provenance

```yaml
source_domains:
  - request.com
source_urls:
  - "http://www.request.com/downloads/Integration%20-%20ReQuest%20Communication%20Protocol%20Guide%20v220.pdf"
retrieved_at: 2026-08-11T04:36:15.169Z
last_checked_at: 2026-08-19T09:42:49.232Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:42:49.232Z
matched_actions: 239
action_count: 239
confidence: medium
summary: "All 239 spec actions match source hex bytes verbatim; transport matches source COM settings for multi-zone units; no fabricated actions and no missing source tokens. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number is not stated in source."
- "TCP port number not stated in source"
- "source gives no explicit command-safety interlocks or confirmation requirements."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
