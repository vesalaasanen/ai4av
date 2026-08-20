---
spec_id: admin/denon-electronics-rcdn9
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics Rcdn9 Control Spec"
manufacturer: Denon
model_family: RCD-N8
aliases: []
compatible_with:
  manufacturers:
    - Denon
    - "Denon Electronics"
  models:
    - RCD-N8
    - DRA-N5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
  - scribd.com
source_urls:
  - https://web.archive.org/web/20150501111601/http://assets.eu.denon.com:80/DocumentMaster/UK/DRAN5_RCDN8_PROTOCOL_V.1.0.0.pdf
  - https://www.scribd.com/document/352131267/DNP-730-DRA-N4-RCD-N9-PROTOCOL-Ver1-0-1
retrieved_at: 2026-08-15T04:19:41.977Z
last_checked_at: 2026-08-19T09:14:15.258Z
generated_at: 2026-08-19T09:14:15.258Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input device name \"Rcdn9\" does not match source application models \"DRA-N5/RCD-N8\"; source covers DRA-N5/RCD-N8 only"
  - "firmware version compatibility not stated in source"
  - "no RS-232 serial configuration found in source despite RS-232C being flagged as known protocol; source specifies Ethernet only"
  - "function description blank in source\""
  - "no multi-step sequences described explicitly in source"
  - "source contains no safety warnings or interlock procedures;"
  - "no serial (RS-232C) electrical/port configuration found in source despite ingest metadata claiming RS-232C"
  - "NS97/NS98 function descriptions blank in source"
  - "NSE parameter example frames omitted from source (NSA example format applies)"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:14:15.258Z
  matched_actions: 147
  action_count: 147
  confidence: medium
  summary: "All 147 spec actions map to literals in the COMMAND/PARAMETER tables of the Denon SYSTEM protocol source; transport matches verbatim; no extras omitted. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-15
---

# Denon Electronics Rcdn9 Control Spec

## Summary
Network control protocol (Ver.1.0.0) for the Denon DRA-N5 / RCD-N8, carried over Ethernet (RJ-45, 10/100BASE-TX) on TCP port 23 (telnet). ASCII command set covering power, master volume, mute, input source select, sleep timer, timers/clock, tone (bass/treble/balance), SDB, source direct, favorites, menu/favorite cursor control, analog tuner, DAB tuner, network/USB/iPod browse control (NS), and CD transport control (N8 only).

<!-- UNRESOLVED: input device name "Rcdn9" does not match source application models "DRA-N5/RCD-N8"; source covers DRA-N5/RCD-N8 only -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no RS-232 serial configuration found in source despite RS-232C being flagged as known protocol; source specifies Ethernet only -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23  # stated: "Communication port : TCP port 23 (telnet)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable   (PWON/PWSTANDBY present)
# - routable    (SI input source select commands present)
# - queryable   (PW?, MV?, MU?, SI?, SLP?, TS?, TO?, PS sub-queries present)
# - levelable   (MV, PSBAS, PSTRE, PSBAL level controls present)
traits:
  - powerable  # inferred from power command examples
  - routable  # inferred from input source select commands
  - queryable  # inferred from query command examples
  - levelable  # inferred from volume/tone level commands
```

## Actions
```yaml
# All commands terminated with CR (0x0D). ASCII 0x20-0x7F only. Max data length 135 bytes.
# <CR> omitted from command strings below; append 0x0D when transmitting.
# Notes: wait 1 second after PWON before next command. TF/TP '*' params
# inoperative unless input source is TUNER. CD (BD), analog tuner, DAB are N8 only.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "PWON"
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: "PWSTANDBY"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "PW?"
  params: []

# --- Master Volume ---
- id: master_volume_up
  label: Master Volume Up
  kind: action
  command: "MVUP"
  params: []

- id: master_volume_down
  label: Master Volume Down
  kind: action
  command: "MVDOWN"
  params: []

- id: master_volume_set
  label: Master Volume Set
  kind: action
  command: "MV{level}"
  params:
    - name: level
      type: string
      description: "Two ASCII digits, 00 to 60 (dB); 00 = minimum level"

- id: master_volume_query
  label: Master Volume Query
  kind: query
  command: "MV?"
  params: []

# --- Mute ---
- id: mute_on
  label: Mute On
  kind: action
  command: "MUON"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUOFF"
  params: []

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "MU?"
  params: []

# --- Input Source Select ---
- id: select_input_iradio
  label: Select Input Internet Radio
  kind: action
  command: "SIIRADIO"
  params: []

- id: select_input_server
  label: Select Input Music Server
  kind: action
  command: "SISERVER"
  params: []

- id: select_input_lastfm
  label: Select Input LastFM (E2 only)
  kind: action
  command: "SILASTFM"
  params: []

- id: select_input_spotify
  label: Select Input Spotify
  kind: action
  command: "SISPOTIFY"
  params: []

- id: select_input_pandora
  label: Select Input Pandora (NA only)
  kind: action
  command: "SIPANDORA"
  params: []

- id: select_input_siriusxm
  label: Select Input SiriusXM (NA only)
  kind: action
  command: "SISIRIUSXM"
  params: []

- id: select_input_ipod
  label: Select Input iPod
  kind: action
  command: "SIIPOD"
  params: []

- id: select_input_usb
  label: Select Input USB
  kind: action
  command: "SIUSB"
  params: []

- id: select_input_auxa
  label: Select Input AUXA / Portable In (N8 only)
  kind: action
  command: "SIAUXA"
  params: []

- id: select_input_auxb
  label: Select Input AUXB Analog In (N5: Analog In, N8: Analog In 1)
  kind: action
  command: "SIAUXB"
  params: []

- id: select_input_auxc
  label: Select Input AUXC Analog In 2 (N8 only)
  kind: action
  command: "SIAUXC"
  params: []

- id: select_input_auxd
  label: Select Input AUXD Digital In
  kind: action
  command: "SIAUXD"
  params: []

- id: select_input_portable_in
  label: Select Input Portable In
  kind: action
  command: "SIPORTABLE_IN"
  params: []

- id: select_input_cd
  label: Select Input CD (N8 only)
  kind: action
  command: "SICD"
  params: []

- id: select_input_fm
  label: Select Input FM (N8 only)
  kind: action
  command: "SIFM"
  params: []

- id: select_input_am
  label: Select Input AM (N8 JP only)
  kind: action
  command: "SIAM"
  params: []

- id: select_input_dab
  label: Select Input DAB (N8 only)
  kind: action
  command: "SIDAB"
  params: []

- id: input_source_query
  label: Input Source Query
  kind: query
  command: "SI?"
  params: []

# --- Sleep Timer ---
- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []

- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  command: "SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "Three ASCII digits, 001 to 120; 010 = 10 minutes"

- id: sleep_timer_query
  label: Sleep Timer Query
  kind: query
  command: "SLP?"
  params: []

# --- Portable In check ---
- id: portable_in_connection_check
  label: Portable In Connection Check
  kind: query
  command: "PICONECT?"
  params: []

# --- Timers ---
- id: once_timer_set
  label: Once Timer Set
  kind: action
  command: "TSONCE {timer_spec}"
  params:
    - name: timer_spec
      type: string
      description: "Format @**##-@$$%% [F][N] VV [O]; @: A/P/2 (AM/PM/24h); start/stop times (FFFF = not used); [F]: function FA/CD/IP/US; [N]: 2-digit preset; VV: volume; [O]: 0=OFF 1=ON. Source example: TSONCE A0730-AFFFF DV00 05 0"
  notes: "Source examples: TSONCE P0630-PFFFF TU01 05 1; TSONCE 21930-2FFFF IP00 05 1"

- id: every_timer_set
  label: Every Timer Set
  kind: action
  command: "TSEVERY {timer_spec}"
  params:
    - name: timer_spec
      type: string
      description: "Same format as ONCE timer. Source example: TSEVERY P0630-PFFFF DV00 05 0"
  notes: "Source examples: TSEVERY P0630-PFFFF TU01 05 1; TSEVERY 21830-2FFFF IP00 05 1"

- id: timer_status_query
  label: Timer Status Query
  kind: query
  command: "TS?"
  params: []

- id: timer_once_off_every_off
  label: Timer Once=Off Every=Off
  kind: action
  command: "TOOFF OFF"
  params: []

- id: timer_once_off_every_on
  label: Timer Once=Off Every=On
  kind: action
  command: "TOOFF ON"
  params: []

- id: timer_once_on_every_off
  label: Timer Once=On Every=Off
  kind: action
  command: "TOON OFF"
  params: []

- id: timer_once_on_every_on
  label: Timer Once=On Every=On
  kind: action
  command: "TOON ON"
  params: []

- id: timer_onoff_query
  label: Timer On/Off Status Query
  kind: query
  command: "TO?"
  params: []

- id: clock_request
  label: Clock Request
  kind: query
  command: "CLK"
  params: []

# --- Parameter Set (tone / balance / SDB / source direct) ---
- id: bass_up
  label: Bass Up
  kind: action
  command: "PSBAS UP"
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  command: "PSBAS DOWN"
  params: []

- id: bass_set
  label: Bass Set
  kind: action
  command: "PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII, 50 = 0dB; operable range 40 to 60 (-10 to +10 dB), 2-step (40,42,...,60)"

- id: bass_query
  label: Bass Status Query
  kind: query
  command: "PSBAS ?"
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  command: "PSTRE UP"
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  command: "PSTRE DOWN"
  params: []

- id: treble_set
  label: Treble Set
  kind: action
  command: "PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII, 50 = 0dB; operable range 40 to 60, 2-step"

- id: treble_query
  label: Treble Status Query
  kind: query
  command: "PSTRE ?"
  params: []

- id: balance_left
  label: Balance Left
  kind: action
  command: "PSBAL LEFT"
  params: []

- id: balance_right
  label: Balance Right
  kind: action
  command: "PSBAL RIGHT"
  params: []

- id: balance_set
  label: Balance Set
  kind: action
  command: "PSBAL {level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII, 50 = center; operable range 44 to 56 (L6 to R6)"

- id: balance_query
  label: Balance Status Query
  kind: query
  command: "PSBAL ?"
  params: []

- id: sdb_on
  label: SDB On
  kind: action
  command: "PSSDB ON"
  params: []

- id: sdb_off
  label: SDB Off
  kind: action
  command: "PSSDB OFF"
  params: []

- id: sdb_query
  label: SDB Status Query
  kind: query
  command: "PSSDB ?"
  params: []

- id: source_direct_on
  label: Source Direct On
  kind: action
  command: "PSSDI ON"
  params: []

- id: source_direct_off
  label: Source Direct Off
  kind: action
  command: "PSSDI OFF"
  params: []

- id: source_direct_query
  label: Source Direct Status Query
  kind: query
  command: "PSSDI ?"
  params: []

# --- Favorites ---
- id: favorite_select
  label: Favorite Direct Select
  kind: action
  command: "FV {number}"
  params:
    - name: number
      type: string
      description: Favorite number (source example: FV 25)

- id: favorite_query
  label: Favorite List Query
  kind: query
  command: "FV ?"
  params: []

- id: favorite_memory
  label: Favorite Memory
  kind: action
  command: "FVMEM {number}"
  params:
    - name: number
      type: string
      description: Favorite number to store (source example: FVMEM 01)

- id: favorite_delete
  label: Favorite Delete
  kind: action
  command: "FVDEL {number}"
  params:
    - name: number
      type: string
      description: Favorite number to delete (source example: FVDEL 01)

# --- Menu / Favorite cursor control ---
- id: menu_cursor_up
  label: Menu Cursor Up
  kind: action
  command: "MNCUP"
  params: []

- id: menu_cursor_down
  label: Menu Cursor Down
  kind: action
  command: "MNCDN"
  params: []

- id: menu_cursor_left
  label: Menu Cursor Left
  kind: action
  command: "MNCLT"
  params: []

- id: menu_cursor_right
  label: Menu Cursor Right
  kind: action
  command: "MNCRT"
  params: []

- id: menu_enter
  label: Menu Enter
  kind: action
  command: "MNENT"
  params: []

- id: favorite_on
  label: Favorite Mode On
  kind: action
  command: "MNFAV ON"
  params: []

- id: favorite_off
  label: Favorite Mode Off
  kind: action
  command: "MNFAV OFF"
  params: []

# --- Analog Tuner (N8 only) ---
- id: tuner_freq_up
  label: Tuner Frequency Up (analog)
  kind: action
  command: "TFANUP"
  params: []

- id: tuner_freq_down
  label: Tuner Frequency Down (analog)
  kind: action
  command: "TFANDOWN"
  params: []

- id: tuner_freq_set
  label: Tuner Frequency Set (analog)
  kind: action
  command: "TFAN{frequency}"
  params:
    - name: frequency
      type: string
      description: "6 digits; >050000 = AM (kHz), <050000 = FM (MHz). Source example: TFAN105000 (1050.00 kHz at AM)"

- id: tuner_freq_query
  label: Tuner Frequency Query (analog)
  kind: query
  command: "TFAN?"
  params: []

- id: tuner_preset_up
  label: Tuner Preset Channel Up
  kind: action
  command: "TPANUP"
  params: []

- id: tuner_preset_down
  label: Tuner Preset Channel Down
  kind: action
  command: "TPANDOWN"
  params: []

- id: tuner_preset_set
  label: Tuner Preset Direct Select
  kind: action
  command: "TPAN{preset}"
  params:
    - name: preset
      type: string
      description: Preset number (source example: TPAN50 = preset 50)

- id: tuner_preset_query
  label: Tuner Preset Query
  kind: query
  command: "TPAN?"
  params: []

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "TPANMEM{preset}"
  params:
    - name: preset
      type: string
      description: Preset number (source example: TPANMEM05)

- id: tuner_band_am
  label: Tuner Band AM
  kind: action
  command: "TMANAM"
  params: []

- id: tuner_band_fm
  label: Tuner Band FM
  kind: action
  command: "TMANFM"
  params: []

- id: tuner_band_mode_query
  label: Tuner Band/Mode Query
  kind: query
  command: "TM?"
  params: []

- id: tuner_mode_auto
  label: Tuning Mode Auto
  kind: action
  command: "TMANAUTO"
  params: []

- id: tuner_mode_manual
  label: Tuning Mode Manual
  kind: action
  command: "TMANMANUAL"
  params: []

# --- DAB Tuner (N8 only) ---
- id: dab_station_up
  label: DAB Station Up
  kind: action
  command: "TFDAUP"
  params: []

- id: dab_station_down
  label: DAB Station Down
  kind: action
  command: "TFDADOWN"
  params: []

- id: dab_station_set
  label: DAB Station Direct Select
  kind: action
  command: "TFDA{station}"
  params:
    - name: station
      type: string
      description: "3 digits / frequency block (source example: TFDAA13)"

- id: dab_station_query
  label: DAB Station/Frequency Query
  kind: query
  command: "TFDA?"
  params: []

- id: dab_band_set
  label: Band Set to DAB
  kind: action
  command: "TMDA"
  params: []

# --- Network/USB/iPod browse control (NS) ---
- id: ns_cursor_up
  label: NS Cursor Up
  kind: action
  command: "NS90"
  params: []

- id: ns_cursor_down
  label: NS Cursor Down
  kind: action
  command: "NS91"
  params: []

- id: ns_cursor_left
  label: NS Cursor Left
  kind: action
  command: "NS92"
  params: []

- id: ns_cursor_right
  label: NS Cursor Right
  kind: action
  command: "NS93"
  params: []

- id: ns_enter
  label: NS Enter
  kind: action
  command: "NS94"
  params: []

- id: ns_97
  label: NS97 Control
  kind: action
  command: "NS97"
  params: []
  notes: "UNRESOLVED: function description blank in source"

- id: ns_98
  label: NS98 Control
  kind: action
  command: "NS98"
  params: []
  notes: "UNRESOLVED: function description blank in source"

- id: ns_play
  label: NS Play (iRadio/mServer/USB), Play/Pause (iPod Direct)
  kind: action
  command: "NS9A"
  params: []

- id: ns_pause
  label: NS Pause (Play/Pause on iPod Direct)
  kind: action
  command: "NS9B"
  params: []

- id: ns_stop
  label: NS Stop
  kind: action
  command: "NS9C"
  params: []

- id: ns_skip_plus
  label: NS Skip Plus
  kind: action
  command: "NS9D"
  params: []

- id: ns_skip_minus
  label: NS Skip Minus
  kind: action
  command: "NS9E"
  params: []

- id: ns_start_ff_9f
  label: NS Start Fast Forward (9F)
  kind: action
  command: "NS9F"
  params: []

- id: ns_start_ff_9g
  label: NS Start Fast Forward (9G)
  kind: action
  command: "NS9G"
  params: []
  notes: "Source labels both 9F and 9G 'Start Fast Forward' verbatim; 9G likely fast reverse but not stated"

- id: ns_repeat_one
  label: NS Repeat One (USB/iPod Direct/mServer)
  kind: action
  command: "NS9H"
  params: []

- id: ns_repeat_all
  label: NS Repeat All (USB/iPod Direct/mServer)
  kind: action
  command: "NS9I"
  params: []

- id: ns_repeat_off
  label: NS Repeat Off (USB/iPod Direct/mServer)
  kind: action
  command: "NS9J"
  params: []

- id: ns_random_on
  label: NS Random On/Repeat All (USB/mServer); Shuffle Songs (iPod Direct)
  kind: action
  command: "NS9K"
  params: []

- id: ns_random_off
  label: NS Random Off (USB/mServer); Shuffle Off (iPod Direct)
  kind: action
  command: "NS9M"
  params: []

- id: ns_browse_remote_toggle
  label: Toggle Browse/Remote Mode (iPod Direct only)
  kind: action
  command: "NS9W"
  params: []

- id: ns_page_up
  label: NS Page Up
  kind: action
  command: "NS9X"
  params: []

- id: ns_page_down
  label: NS Page Down
  kind: action
  command: "NS9Y"
  params: []

- id: ns_end_ff_rev
  label: NS End Fast Forward/Reverse
  kind: action
  command: "NS9Z"
  params: []

- id: ns_display_info_ascii
  label: Request Onscreen Display Info List (ASCII)
  kind: query
  command: "NSA"
  params: []
  notes: Returns NSA0-NSA8 display line data, ASCII, 96-byte fixed records

- id: ns_display_info_utf8
  label: Request Onscreen Display Info List (UTF-8)
  kind: query
  command: "NSE"
  params: []
  notes: Returns NSE0-NSE8 display line data, UTF-8, 96-byte fixed records

# --- CD Control (N8 only, BD command set) ---
- id: cd_cursor_up
  label: CD Cursor Up
  kind: action
  command: "BDCURSOR UP"
  params: []

- id: cd_cursor_down
  label: CD Cursor Down
  kind: action
  command: "BDCURSOR DOWN"
  params: []

- id: cd_cursor_left
  label: CD Cursor Left
  kind: action
  command: "BDCURSOR LEFT"
  params: []

- id: cd_cursor_right
  label: CD Cursor Right
  kind: action
  command: "BDCURSOR RIGHT"
  params: []

- id: cd_enter
  label: CD Enter
  kind: action
  command: "BDENTER"
  params: []

- id: cd_play
  label: CD Play
  kind: action
  command: "BDPLAY"
  params: []

- id: cd_pause
  label: CD Pause
  kind: action
  command: "BDPAUSE"
  params: []

- id: cd_play_pause
  label: CD Play/Pause
  kind: action
  command: "BDPLAY PAUSE"
  params: []

- id: cd_stop
  label: CD Stop
  kind: action
  command: "BDSTOP"
  params: []

- id: cd_skip_plus
  label: CD Skip Plus
  kind: action
  command: "BDSKIP +"
  params: []

- id: cd_skip_minus
  label: CD Skip Minus
  kind: action
  command: "BDSKIP -"
  params: []

- id: cd_manual_search_plus
  label: CD Manual Search Plus (search forward)
  kind: action
  command: "BDMANUAL SEARCH +"
  params: []

- id: cd_manual_search_minus
  label: CD Manual Search Minus (search reverse)
  kind: action
  command: "BDMANUAL SEARCH -"
  params: []

- id: cd_track_direct_select
  label: CD Direct Track Select
  kind: action
  command: "BDDS TRACK {track}"
  params:
    - name: track
      type: string
      description: "0000 to 9999 by ASCII (source example: BDDS TRACK 0010)"

- id: cd_tray_open_close
  label: CD Tray Open/Close
  kind: action
  command: "BDOPEN/CLOSE"
  params: []

- id: cd_repeat
  label: CD Repeat Toggle
  kind: action
  command: "BDREPEAT"
  params: []

- id: cd_repeat_one
  label: CD Repeat One
  kind: action
  command: "BDREPEAT ONE"
  params: []

- id: cd_repeat_all
  label: CD Repeat All
  kind: action
  command: "BDREPEAT ALL"
  params: []

- id: cd_repeat_off
  label: CD Repeat Off
  kind: action
  command: "BDREPEAT OFF"
  params: []

- id: cd_random
  label: CD Random Toggle
  kind: action
  command: "BDRANDOM"
  params: []

- id: cd_random_on
  label: CD Random On
  kind: action
  command: "BDRANDOM ON"
  params: []

- id: cd_random_off
  label: CD Random Off
  kind: action
  command: "BDRANDOM OFF"
  params: []

- id: cd_folder_mode_on
  label: CD Folder Mode On
  kind: action
  command: "BDFOLDER MODE ON"
  params: []

- id: cd_folder_mode_off
  label: CD Folder Mode Off
  kind: action
  command: "BDFOLDER MODE OFF"
  params: []

- id: cd_folder_mode_toggle
  label: CD Folder Mode Toggle
  kind: action
  command: "BDFOLDER MODE"
  params: []

- id: cd_folder_name_query
  label: CD Folder Name Request
  kind: query
  command: "BDFOLDER NAME?"
  params: []

- id: cd_file_name_query
  label: CD File Name Request
  kind: query
  command: "BDFILE NAME?"
  params: []

- id: cd_artist_name_query
  label: CD Artist Name Request
  kind: query
  command: "BDARTIST NAME?"
  params: []

- id: cd_album_name_query
  label: CD Album Name Request
  kind: query
  command: "BDALBUM NAME?"
  params: []

- id: cd_song_name_query
  label: CD Song Name Request
  kind: query
  command: "BDSONG NAME?"
  params: []

- id: cd_status_query
  label: CD System Status Request
  kind: query
  command: "BDSTATUS?"
  params: []
  notes: Returns BDSTATUS frame with answer/disc-type/audio-format/time/play-mode/status codes

- id: cd_folder_plus
  label: CD Folder Plus
  kind: action
  command: "BDFOLDER +"
  params: []

- id: cd_folder_minus
  label: CD Folder Minus
  kind: action
  command: "BDFOLDER -"
  params: []
```

## Feedbacks
```yaml
# EVENT/RESPONSE messages share the COMMAND form. RESPONSE sent within 200ms of a request.
- id: power_state
  type: enum
  values: [ON, STANDBY]
  trigger: "PWON / PWSTANDBY event; response to PW?"

- id: master_volume
  type: string
  description: "Two ASCII digits 00 to 60"
  trigger: "MV** event; response to MV?"

- id: mute_state
  type: enum
  values: [ON, OFF]
  trigger: "MUON / MUOFF event; response to MU?"

- id: input_source
  type: enum
  values: [IRADIO, SERVER, LASTFM, SPOTIFY, PANDORA, SIRIUSXM, IPOD, USB, AUXA, AUXB, AUXC, AUXD, PORTABLE_IN, CD, FM, AM, DAB]
  trigger: "SI** event; response to SI?"

- id: sleep_timer
  type: string
  description: "OFF or three digits 001 to 120 (minutes)"
  trigger: "SLP** event; response to SLP?"

- id: portable_in_connection
  type: enum
  values: [OK, NG]
  trigger: "PICONECTOK / PICONECTNG response to PICONECT?"

- id: once_timer_state
  type: string
  description: "TSONCE @**##-@$$%% [F][N] VV [O] timer frame"
  trigger: "TSONCE event; response to TS?"

- id: every_timer_state
  type: string
  description: "TSEVERY @**##-@$$%% [F][N] VV [O] timer frame"
  trigger: "TSEVERY event; response to TS?"

- id: timer_onoff_state
  type: enum
  values: ["OFF OFF", "OFF ON", "ON OFF", "ON ON"]
  trigger: "TO** event; response to TO?"

- id: clock
  type: string
  description: Clock event frame
  trigger: "CLK event"

- id: bass_level
  type: string
  description: "00-99, 50 = 0dB"
  trigger: "PSBAS ** event"

- id: treble_level
  type: string
  description: "00-99, 50 = 0dB"
  trigger: "PSTRE ** event"

- id: balance_level
  type: string
  description: "00-99, 50 = center"
  trigger: "PSBAL ** event"

- id: sdb_state
  type: enum
  values: [ON, OFF]
  trigger: "PSSDB ON / PSSDB OFF event"

- id: source_direct_state
  type: enum
  values: [ON, OFF]
  trigger: "PSSDI ON / PSSDI OFF event"

- id: favorite_name
  type: string
  description: "FV**_XX_aaaa_????? frame - favorite no., function (0=Internet Radio,1=Music Server,2=TUNER), name up to 32 bytes, null-padded to 35 bytes. Source example: FV25 01 FM-87.50MHz"
  trigger: "FV** event; response to FV ?"

- id: tuner_frequency
  type: string
  description: "6-digit frequency; >050000 = AM kHz, <050000 = FM MHz (N8 only). Source example: TFAN105000 = 1050.00 kHz AM"
  trigger: "TFAN****** event"

- id: tuner_preset
  type: string
  description: "Preset number, or OFF when no preset (N8 only). Source example: TPANA1"
  trigger: "TPAN** / TPANOFF event"

- id: tuner_band_mode
  type: enum
  values: [ANAM, ANFM, ANAUTO, ANMANUAL]
  trigger: "TM** event (N8 only)"

- id: dab_station
  type: string
  description: "3-digit frequency block at DAB band (N8 only). Source example: TFDA13F"
  trigger: "TFDA*** / TMDA event"

- id: onscreen_display_ascii
  type: string
  description: "NSA0-NSA8, one frame per display line 1-9, ASCII max 95 bytes + null + info byte, 96 bytes fixed; info byte bit1 = playable music, bit4 = cursor select"
  trigger: "response to NSA (mServer/iRadio)"

- id: onscreen_display_utf8
  type: string
  description: "NSE0-NSE8, same framing as NSA but UTF-8 characters"
  trigger: "response to NSE (mServer/iRadio)"

- id: cd_status
  type: string
  description: "BDSTATUS frame: answer code (0-3), disc type, audio format/channel, status code (0-G), play mode code (1-;), track info, time mode, elapsed h/m/s, disc/USB mode (N8 only)"
  trigger: "response to BDSTATUS?"
```

## Variables
```yaml
- id: master_volume
  type: string
  min: "00"
  max: "60"
  unit: dB
  description: Set via MV**; 00 = minimum; three ASCII chars when 1dB step (00,05,...,60)

- id: sleep_timer
  type: string
  min: "001"
  max: "120"
  unit: minutes
  description: Set via SLP***; 010 = 10 minutes

- id: bass_level
  type: string
  min: "40"
  max: "60"
  unit: dB
  description: Set via PSBAS **; 50 = 0dB, 2-step values (40,42,...,60)

- id: treble_level
  type: string
  min: "40"
  max: "60"
  unit: dB
  description: Set via PSTRE **; 50 = 0dB, 2-step values

- id: balance_level
  type: string
  min: "44"
  max: "56"
  description: Set via PSBAL **; 50 = center, 44 = L6, 56 = R6
```

## Events
```yaml
# Device sends EVENT messages (same form as COMMAND) unsolicited when operated
# directly and state changes. Documented EVENT set: PW, MV, MU, SI, SLP, TS
# (ONCE/EVERY), TO, CLK, PS (BAS/TRE/BAL/SDB/SDI), FV (favorite name),
# TF/TP/TM (analog tuner + DAB), NSA/NSE (display info), BD (CD status and
# per-operation acknowledgements with answer codes 0-3).
# Every command with a matching EVENT also answers its request form (? + CR)
# as a RESPONSE within 200ms.
- id: state_change_event
  description: "Unsolicited EVENT on direct operation/state change; form identical to COMMAND (see Feedbacks for per-command payloads)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures;
# only timing constraint found is waiting 1 second after PWON before next command
```

## Notes
- Command structure: COMMAND (2 ASCII chars) + PARAMETER (up to 25 ASCII chars) + CR (0x0D). Usable ASCII 0x20-0x7F; CR acts as pause/terminator only. Max communication data length 135 bytes.
- Connector: RJ-45, 10BASE-T/100BASE-TX, half duplex, 10/100 Mbps, TCP port 23 (telnet). Cross cable direct to PC or straight cables via HUB.
- RESPONSE must be sent within 200ms of receiving a request command. Commands are receivable during EVENT transmission.
- Wait 1 second after transmitting PWON before the next command.
- Master volume parameter "00" = minimum level; volume 00-60 by ASCII in 1dB steps.
- Network Standby mode must be set to "Network On" (SETUP > Network > Network Standby) for network control while in standby.
- DHCP/IP/Subnet/Gateway configured on-device via SETUP menu (Network > Settings). Proxy must be Off. DNS fields unused.
- Model/regional differences: CD, FM, AM (JP), DAB, AUXA, AUXC inputs are N8 only; LASTFM is E2 only; PANDORA and SIRIUSXM are NA only.
- TF/TP/TM '*' parameters inoperative when input source is not TUNER.
- NS9F and NS9G both labeled "Start Fast Forward" in source (9G likely fast reverse — not stated). NS97/NS98 function labels blank in source.
- CD (BD command set) answer codes: 0 = command OK, 1 = invalid command, 2 = invalid (specified track/group/title/chapter does not exist), 3 = order track none. Status codes 0-G cover standby through scan play; play mode codes 1-; cover NORMAL through REPEAT FOLDER.
- Protocol document version Ver.1.0.0 (12 Oct 2012); application terminal Ethernet Rev 8.0.0.
- Device name "Rcdn9" from ingest metadata does not appear in source; source application models are DRA-N5 and RCD-N8. Known protocol RS-232C in ingest metadata contradicts source (Ethernet telnet only; no serial port spec in source).

<!-- UNRESOLVED: no serial (RS-232C) electrical/port configuration found in source despite ingest metadata claiming RS-232C -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: NS97/NS98 function descriptions blank in source -->
<!-- UNRESOLVED: NSE parameter example frames omitted from source (NSA example format applies) -->

## Provenance

```yaml
source_domains:
  - web.archive.org
  - scribd.com
source_urls:
  - https://web.archive.org/web/20150501111601/http://assets.eu.denon.com:80/DocumentMaster/UK/DRAN5_RCDN8_PROTOCOL_V.1.0.0.pdf
  - https://www.scribd.com/document/352131267/DNP-730-DRA-N4-RCD-N9-PROTOCOL-Ver1-0-1
retrieved_at: 2026-08-15T04:19:41.977Z
last_checked_at: 2026-08-19T09:14:15.258Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:14:15.258Z
matched_actions: 147
action_count: 147
confidence: medium
summary: "All 147 spec actions map to literals in the COMMAND/PARAMETER tables of the Denon SYSTEM protocol source; transport matches verbatim; no extras omitted. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input device name \"Rcdn9\" does not match source application models \"DRA-N5/RCD-N8\"; source covers DRA-N5/RCD-N8 only"
- "firmware version compatibility not stated in source"
- "no RS-232 serial configuration found in source despite RS-232C being flagged as known protocol; source specifies Ethernet only"
- "function description blank in source\""
- "no multi-step sequences described explicitly in source"
- "source contains no safety warnings or interlock procedures;"
- "no serial (RS-232C) electrical/port configuration found in source despite ingest metadata claiming RS-232C"
- "NS97/NS98 function descriptions blank in source"
- "NSE parameter example frames omitted from source (NSA example format applies)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
