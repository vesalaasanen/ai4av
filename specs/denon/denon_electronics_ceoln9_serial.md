---
spec_id: admin/denon-electronics-ceoln9
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics CEOL N9 Control Spec"
manufacturer: Denon
model_family: "CEOL N9"
aliases: []
compatible_with:
  manufacturers:
    - Denon
    - "Denon Electronics"
  models:
    - "CEOL N9"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/20150501111601/http://assets.eu.denon.com:80/DocumentMaster/UK/DRAN5_RCDN8_PROTOCOL_V.1.0.0.pdf
retrieved_at: 2026-07-31T17:15:26.759Z
last_checked_at: 2026-08-05T08:17:19.586Z
generated_at: 2026-08-05T08:17:19.586Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source protocol doc is labelled DRA-N5/RCD-N8 v1.0.0 (12-Oct-2012); CEOL N9 / RCD-N9-specific protocol doc could not be located. Application to CEOL N9 is inferred from shared platform. Some commands marked \"N8 Only\" / \"N5\" / \"E2 Only\" / \"NA Only\" in source — region/model availability on CEOL N9 not confirmed."
  - "source states TCP port 23 (telnet) and 135 bytes max command length; base URL / IP discovery not specified (DHCP/manual via on-device SETUP menu)."
  - "detailed BD STATUS field decoding (disc type/audio format/time mode/answer code) defined in source footnotes but not split into discrete feedback variables."
  - "favorite slot count / numbering range not explicitly bounded in source."
  - "source documents no explicit multi-step macro sequences (command-by-command recipes). Timer-set commands embed multiple fields but are single commands, not sequences."
  - "no explicit safety interlock procedures, voltage/current protection, or power-on sequencing beyond the PWON 1-second spacing note."
  - "firmware version compatibility not stated in source."
  - "base URL / IP discovery method not specified (device SETUP menu only)."
  - "CEOL-N9-specific protocol document not found; RCD-N8 doc applied by platform inference."
  - "exact favorite slot count / numbering bounds not stated."
  - "region/model-specific command availability on CEOL N9 unconfirmed."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:17:19.586Z
  matched_actions: 128
  action_count: 128
  confidence: medium
  summary: "All 128 spec actions (Actions + Feedbacks) match wire-literal command examples in the source COMMAND/parameter table; transport TCP port 23 confirmed verbatim. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-31
---

# Denon Electronics CEOL N9 Control Spec

## Summary
Denon CEOL N9 (network CD-receiver, internal model RCD-N9) controlled via Ethernet using TCP port 23 (telnet), ASCII command protocol. Commands are 2-character opcodes + parameter + CR (0x0D). Source document is the DRA-N5/RCD-N8 control protocol v1.0.0; per Denon platform continuity this protocol applies to the RCD-N9/CEOL N9 successor on the same network CD-receiver platform. Covers power, volume, mute, input selection, sleep timer, timer, tone/balance, source direct, favorites, menu navigation, tuner (FM/AM/DAB), network/iPod/USB playback control, and CD transport control.

<!-- UNRESOLVED: source protocol doc is labelled DRA-N5/RCD-N8 v1.0.0 (12-Oct-2012); CEOL N9 / RCD-N9-specific protocol doc could not be located. Application to CEOL N9 is inferred from shared platform. Some commands marked "N8 Only" / "N5" / "E2 Only" / "NA Only" in source — region/model availability on CEOL N9 not confirmed. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
  # UNRESOLVED: source states TCP port 23 (telnet) and 135 bytes max command length; base URL / IP discovery not specified (DHCP/manual via on-device SETUP menu).
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from PW power command examples
  - queryable    # inferred from ? query command examples (PW?, MV?, SI?, etc.)
  - levelable    # inferred from MV / PS BAS / PS TRE / PS BAL level commands
```

## Actions
```yaml
actions:
  # ===== PW : system Power =====
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

  # ===== MV : Master Volume (00-60 ASCII, 1dB steps) =====
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
        type: integer
        description: "Volume level 00 to 60 by ASCII (1dB step). 00 = minimum."
  - id: master_volume_status_query
    label: Master Volume Status Query
    kind: query
    command: "MV?"
    params: []

  # ===== MU : Output Mute =====
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
  - id: mute_status_query
    label: Mute Status Query
    kind: query
    command: "MU?"
    params: []

  # ===== SI : Select Input source =====
  - id: select_input
    label: Select Input Source
    kind: action
    command: "SI{input}"
    params:
      - name: input
        type: string
        description: >-
          Input source. Values from source: IRADIO, SERVER, LASTFM (E2 Only),
          SPOTIFY, PANDORA (NA Only), SIRIUSXM (NA Only), IPOD, USB, AUXA
          (Portable In, N8 Only), AUXB (N5 Analog In / N8 Analog In1), AUXC
          (Analog In2, N8 Only), AUXD (Digital In), PORTABLE_IN, CD (N8 Only),
          FM (N8 Only), AM (N8/JP Only), DAB (N8 Only).
  - id: input_status_query
    label: Input Source Status Query
    kind: query
    command: "SI?"
    params: []

  # ===== SLP : Main Zone Sleep Timer (001-120 min, 010=10min) =====
  - id: sleep_off
    label: Sleep Timer Off
    kind: action
    command: "SLPOFF"
    params: []
  - id: sleep_set
    label: Sleep Timer Set
    kind: action
    command: "SLP{minutes}"
    params:
      - name: minutes
        type: integer
        description: "Sleep minutes 001 to 120 by ASCII (010 = 10 min)."
  - id: sleep_status_query
    label: Sleep Timer Status Query
    kind: query
    command: "SLP?"
    params: []

  # ===== PI : Portable In Connection check =====
  - id: portable_in_connection_query
    label: Portable In Connection Query
    kind: query
    command: "PICONECT?"
    params: []

  # ===== TS : Timer set =====
  - id: timer_once_set
    label: Once Timer Set
    kind: action
    command: "TSONCE {start}-{stop} {func}{preset} {vol} {onoff}"
    params:
      - name: start
        type: string
        description: >-
          Start time. Format A**## (AM), P**## (PM), or 2**## (24h).
          **=00-23 hours, ##=00-59 minutes by ASCII. Use FFFF for unused stop.
      - name: stop
        type: string
        description: "Stop time, same format as start; FFFF when not used."
      - name: func
        type: string
        description: >-
          Function 2-byte ASCII: FA=Favorite, CD=CD(N8 Only), IP=iPod, US=USB,
          TU=Tuner, DV=devices.
      - name: preset
        type: string
        description: "Preset No. 2-byte ASCII (TU uses 00)."
      - name: vol
        type: string
        description: "Volume VV (2-byte ASCII)."
      - name: onoff
        type: integer
        description: "ONCE timer enable (0=OFF, 1=ON)."
  - id: timer_every_set
    label: Every Timer Set
    kind: action
    command: "TSEVERY {start}-{stop} {func}{preset} {vol} {onoff}"
    params:
      - name: start
        type: string
        description: "Start time A**## / P**## / 2**## (see timer_once_set)."
      - name: stop
        type: string
        description: "Stop time, same format; FFFF when not used."
      - name: func
        type: string
        description: "Function 2-byte ASCII (same as ONCE TIMER)."
      - name: preset
        type: string
        description: "Preset No. 2-byte ASCII."
      - name: vol
        type: string
        description: "Volume VV (2-byte ASCII)."
      - name: onoff
        type: integer
        description: "EVERY timer enable (0=OFF, 1=ON)."
  - id: timer_status_query
    label: Timer Status Query
    kind: query
    command: "TS?"
    params: []

  # ===== TO : Timer ON/OFF (once/every combos) =====
  - id: timer_onoff_set
    label: Timer ON/OFF Set
    kind: action
    command: "TO{once} {every}"
    params:
      - name: once
        type: string
        description: "ON or OFF (once timer)."
      - name: every
        type: string
        description: "ON or OFF (every timer). Combinations: OFF OFF, OFF ON, ON OFF, ON ON."
  - id: timer_onoff_status_query
    label: Timer ON/OFF Status Query
    kind: query
    command: "TO?"
    params: []

  # ===== CLK : Clock =====
  - id: clock_command
    label: Clock
    kind: action
    command: "CLK"
    params: []

  # ===== PS : Parameter (tone/balance/source direct/SDB) =====
  - id: ps_bass_up
    label: Bass Up
    kind: action
    command: "PSBAS UP"
    params: []
  - id: ps_bass_down
    label: Bass Down
    kind: action
    command: "PSBAS DOWN"
    params: []
  - id: ps_bass_set
    label: Bass Set
    kind: action
    command: "PSBAS {level}"
    params:
      - name: level
        type: integer
        description: "00-99 ASCII, 50=0dB. Operable 40-60 (-10 to +10dB), 2-step."
  - id: ps_bass_query
    label: Bass Status Query
    kind: query
    command: "PSBAS ?"
    params: []
  - id: ps_treble_up
    label: Treble Up
    kind: action
    command: "PSTRE UP"
    params: []
  - id: ps_treble_down
    label: Treble Down
    kind: action
    command: "PSTRE DOWN"
    params: []
  - id: ps_treble_set
    label: Treble Set
    kind: action
    command: "PSTRE {level}"
    params:
      - name: level
        type: integer
        description: "00-99 ASCII, 50=0dB. Operable 40-60 (-10 to +10dB), 2-step."
  - id: ps_treble_query
    label: Treble Status Query
    kind: query
    command: "PSTRE ?"
    params: []
  - id: ps_balance_left
    label: Balance Left
    kind: action
    command: "PSBAL LEFT"
    params: []
  - id: ps_balance_right
    label: Balance Right
    kind: action
    command: "PSBAL RIGHT"
    params: []
  - id: ps_balance_set
    label: Balance Set
    kind: action
    command: "PSBAL {level}"
    params:
      - name: level
        type: integer
        description: "00-99 ASCII, 50=center. Operable 44-56 (L6 to R6)."
  - id: ps_balance_query
    label: Balance Status Query
    kind: query
    command: "PSBAL ?"
    params: []
  - id: ps_sdb_on
    label: SDB On
    kind: action
    command: "PSSDB ON"
    params: []
  - id: ps_sdb_off
    label: SDB Off
    kind: action
    command: "PSSDB OFF"
    params: []
  - id: ps_sdb_query
    label: SDB Status Query
    kind: query
    command: "PSSDB ?"
    params: []
  - id: ps_source_direct_on
    label: Source Direct On
    kind: action
    command: "PSSDI ON"
    params: []
  - id: ps_source_direct_off
    label: Source Direct Off
    kind: action
    command: "PSSDI OFF"
    params: []
  - id: ps_source_direct_query
    label: Source Direct Status Query
    kind: query
    command: "PSSDI ?"
    params: []

  # ===== FV : Favorite direct/memory/delete =====
  - id: favorite_set
    label: Favorite Direct Change
    kind: action
    command: "FV {number}"
    params:
      - name: number
        type: integer
        description: "Favorite number (direct change)."
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
        type: integer
        description: "Favorite memory slot number."
  - id: favorite_delete
    label: Favorite Delete
    kind: action
    command: "FVDEL {number}"
    params:
      - name: number
        type: integer
        description: "Favorite number to delete."

  # ===== MN : Menu / Favorite navigation =====
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
    label: Favorite On
    kind: action
    command: "MNFAV ON"
    params: []
  - id: favorite_off
    label: Favorite Off
    kind: action
    command: "MNFAV OFF"
    params: []

  # ===== TF : Tuner Frequency (Analog + DAB, N8 Only) =====
  - id: tuner_freq_analog_up
    label: Tuner Frequency Up (Analog)
    kind: action
    command: "TFANUP"
    params: []
  - id: tuner_freq_analog_down
    label: Tuner Frequency Down (Analog)
    kind: action
    command: "TFANDOWN"
    params: []
  - id: tuner_freq_analog_set
    label: Tuner Frequency Set (Analog)
    kind: action
    command: "TFAN{frequency}"
    params:
      - name: frequency
        type: string
        description: "6-digit ASCII. >050000 = AM (kHz), <050000 = FM (MHz). e.g. 105000 = 1050.00 kHz AM."
  - id: tuner_freq_analog_query
    label: Tuner Frequency Query (Analog)
    kind: query
    command: "TFAN?"
    params: []
  - id: tuner_freq_dab_up
    label: DAB Station Up
    kind: action
    command: "TFDAUP"
    params: []
  - id: tuner_freq_dab_down
    label: DAB Station Down
    kind: action
    command: "TFDADOWN"
    params: []
  - id: tuner_freq_dab_set
    label: DAB Station Set
    kind: action
    command: "TFDA{station}"
    params:
      - name: station
        type: string
        description: "3-digit FrequencyBlock at DAB band. e.g. A13."
  - id: tuner_freq_dab_query
    label: DAB Station Query
    kind: query
    command: "TFDA?"
    params: []

  # ===== TP : Tuner Preset (Analog) =====
  - id: tuner_preset_up
    label: Tuner Preset Up
    kind: action
    command: "TPANUP"
    params: []
  - id: tuner_preset_down
    label: Tuner Preset Down
    kind: action
    command: "TPANDOWN"
    params: []
  - id: tuner_preset_set
    label: Tuner Preset Set
    kind: action
    command: "TPAN{preset}"
    params:
      - name: preset
        type: string
        description: "Preset number (e.g. 50)."
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
        description: "Preset number to store (e.g. 05)."

  # ===== TM : Tuner Band/Mode =====
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
  - id: tuner_band_dab
    label: Tuner Band DAB
    kind: action
    command: "TMDA"
    params: []
  - id: tuner_mode_auto
    label: Tuner Mode Auto
    kind: action
    command: "TMANAUTO"
    params: []
  - id: tuner_mode_manual
    label: Tuner Mode Manual
    kind: action
    command: "TMANMANUAL"
    params: []
  - id: tuner_status_query
    label: Tuner Status Query
    kind: query
    command: "TM?"
    params: []

  # ===== NS : Network/Rhapsody/Napster/USB/iPod Direct Extended Control =====
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
  - id: ns_enter_play_pause
    label: NS Enter (Play/Pause)
    kind: action
    command: "NS94"
    params: []
  - id: ns_fn_97
    label: NS Function 97
    kind: action
    command: "NS97"
    params: []
  - id: ns_fn_98
    label: NS Function 98
    kind: action
    command: "NS98"
    params: []
  - id: ns_play
    label: NS Play
    kind: action
    command: "NS9A"
    params: []
  - id: ns_pause
    label: NS Pause
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
  - id: ns_fast_forward_start_9f
    label: NS Start Fast Forward (9F)
    kind: action
    command: "NS9F"
    params: []
  - id: ns_fast_forward_start_9g
    label: NS Start Fast Forward (9G)
    kind: action
    command: "NS9G"
    params: []
  - id: ns_repeat_one
    label: NS Repeat One
    kind: action
    command: "NS9H"
    params: []
  - id: ns_repeat_all
    label: NS Repeat All
    kind: action
    command: "NS9I"
    params: []
  - id: ns_repeat_off
    label: NS Repeat Off
    kind: action
    command: "NS9J"
    params: []
  - id: ns_random_on_shuffle
    label: NS Random On / Shuffle Songs
    kind: action
    command: "NS9K"
    params: []
  - id: ns_random_off
    label: NS Random Off / Shuffle Off
    kind: action
    command: "NS9M"
    params: []
  - id: ns_browse_remote_toggle
    label: NS Browse/Remote Mode Toggle
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
  - id: ns_fast_end
    label: NS End Fast Forward/Reverse
    kind: action
    command: "NS9Z"
    params: []
  - id: ns_onscreen_ascii_request
    label: NS Onscreen Display Info Request (ASCII)
    kind: query
    command: "NSA"
    params: []
  - id: ns_onscreen_utf8_request
    label: NS Onscreen Display Info Request (UTF-8)
    kind: query
    command: "NSE"
    params: []

  # ===== BD : CD Control (N8 Only) =====
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
    label: CD Manual Search Plus
    kind: action
    command: "BDMANUAL SEARCH +"
    params: []
  - id: cd_manual_search_minus
    label: CD Manual Search Minus
    kind: action
    command: "BDMANUAL SEARCH -"
    params: []
  - id: cd_direct_track_select
    label: CD Direct Track Select
    kind: action
    command: "BDDS TRACK {track}"
    params:
      - name: track
        type: integer
        description: "Track number 0000 to 9999 by ASCII."
  - id: cd_open_close
    label: CD Open/Close
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
    label: CD Folder Name Query
    kind: query
    command: "BDFOLDER NAME?"
    params: []
  - id: cd_file_name_query
    label: CD File Name Query
    kind: query
    command: "BDFILE NAME?"
    params: []
  - id: cd_artist_name_query
    label: CD Artist Name Query
    kind: query
    command: "BDARTIST NAME?"
    params: []
  - id: cd_album_name_query
    label: CD Album Name Query
    kind: query
    command: "BDALBUM NAME?"
    params: []
  - id: cd_song_name_query
    label: CD Song Name Query
    kind: query
    command: "BDSONG NAME?"
    params: []
  - id: cd_status_query
    label: CD System Status Query
    kind: query
    command: "BDSTATUS?"
    params: []
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
feedbacks:
  - id: power_state
    type: enum
    values: [ON, STANDBY]
    command: "PW?"
  - id: master_volume
    type: range
    values: "00-60"
    command: "MV?"
  - id: mute_state
    type: enum
    values: [ON, OFF]
    command: "MU?"
  - id: input_source
    type: enum
    values: [IRADIO, SERVER, LASTFM, SPOTIFY, PANDORA, SIRIUSXM, IPOD, USB, AUXA, AUXB, AUXC, AUXD, PORTABLE_IN, CD, FM, AM, DAB]
    command: "SI?"
  - id: sleep_timer
    type: string
    command: "SLP?"
  - id: portable_in_connection
    type: enum
    values: [OK, NG]
    command: "PICONECT?"
  - id: bass_level
    type: range
    values: "40-60"
    command: "PSBAS ?"
  - id: treble_level
    type: range
    values: "40-60"
    command: "PSTRE ?"
  - id: balance_level
    type: range
    values: "44-56"
    command: "PSBAL ?"
  - id: sdb_state
    type: enum
    values: [ON, OFF]
    command: "PSSDB ?"
  - id: source_direct_state
    type: enum
    values: [ON, OFF]
    command: "PSSDI ?"
  - id: favorite_list
    type: string
    command: "FV ?"
  - id: tuner_frequency
    type: string
    command: "TFAN?"
  - id: tuner_preset
    type: string
    command: "TPAN?"
  - id: tuner_mode
    type: enum
    values: [AM, FM, DAB, AUTO, MANUAL]
    command: "TM?"
  - id: timer_status
    type: string
    command: "TS?"
  - id: timer_onoff_status
    type: string
    command: "TO?"
  - id: cd_system_status
    type: string
    command: "BDSTATUS?"
  # UNRESOLVED: detailed BD STATUS field decoding (disc type/audio format/time mode/answer code) defined in source footnotes but not split into discrete feedback variables.
```

## Variables
```yaml
variables:
  - id: master_volume_level
    type: integer
    range: "00-60"
    unit: "dB (relative, 00 = min)"
  - id: bass_level
    type: integer
    range: "40-60"
    unit: "dB (50 = 0)"
  - id: treble_level
    type: integer
    range: "40-60"
    unit: "dB (50 = 0)"
  - id: balance_level
    type: integer
    range: "44-56"
    unit: "(50 = center, L6-R6)"
  - id: sleep_timer_minutes
    type: integer
    range: "001-120"
  # UNRESOLVED: favorite slot count / numbering range not explicitly bounded in source.
```

## Events
```yaml
events:
  - id: power_event
    description: "Unsolicited EVENT on power change. Same form as COMMAND (PWON / PWSTANDBY)."
    command: "PWON / PWSTANDBY"
  - id: master_volume_event
    description: "Unsolicited EVENT on master volume change (MV**)."
    command: "MV**"
  - id: mute_event
    description: "Unsolicited EVENT on mute change (MUON / MUOFF)."
    command: "MUON / MUOFF"
  - id: input_source_event
    description: "Unsolicited EVENT on input source change (SI***)."
    command: "SI***"
  - id: sleep_timer_event
    description: "Unsolicited EVENT on sleep timer change (SLP***)."
    command: "SLP***"
  - id: tone_balance_event
    description: "Unsolicited EVENT on bass/treble/balance/SDB/SDI change."
    command: "PSBAS ** / PSTRE ** / PSBAL ** / PSSDB ON|OFF / PSSDI ON|OFF"
  - id: favorite_name_event
    description: "Favorite name data (FV**_XX_aaaa_???????)."
    command: "FV25 01 FM-87.50MHz"
  - id: tuner_event
    description: "Unsolicited EVENT on tuner freq/preset/band/mode change."
    command: "TFAN****** / TPAN** / TMANAM|ANFM|ANAUTO|ANMANUAL / TMDA / TFDA***"
  - id: timer_event
    description: "Unsolicited EVENT on timer set / timer ON-OFF / clock."
    command: "TSONCE... / TSEVERY... / TO... / CLK"
  - id: onscreen_ascii_event
    description: "Onscreen display info lines 0-8 (ASCII) returned by NSA command."
    command: "NSA0...NSA8"
  - id: onscreen_utf8_event
    description: "Onscreen display info lines 0-8 (UTF-8) returned by NSE command."
    command: "NSE0...NSE8"
  - id: cd_status_event
    description: "CD system status event (BDSTATUS ...) plus play/pause/stop/skip/search/track/cursor/repeat/random/folder answer codes."
    command: "BDSTATUS / BDPLAY / BDPAUSE / ... etc."
```

## Macros
```yaml
macros: []
# UNRESOLVED: source documents no explicit multi-step macro sequences (command-by-command recipes). Timer-set commands embed multiple fields but are single commands, not sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Wait 1 second after sending PWON before transmitting next COMMAND (source: basic spec item E)."
  - "TF/TP commands cannot operate when INPUT source is not TUNER (source notes)."
  - "BD SKIP / MANUAL SEARCH valid only when mode status is Play (E) or Pause (F) (source footnote *C / *D)."
  - "When power condition is STANDBY, BD accepts only REQUEST SYSTEM STATUS, POWER ON KEY, REQUEST CPU VERSION, REQUEST ERROR STATUS; other commands return COMMAND FORMAT ERROR ('1')."
# UNRESOLVED: no explicit safety interlock procedures, voltage/current protection, or power-on sequencing beyond the PWON 1-second spacing note.
```

## Notes
- Protocol is ASCII over TCP telnet port 23. Command structure: `COMMAND(2 chars) + PARAMETER(up to 25 chars) + CR (0x0D)`. Max command length 135 bytes. Half-duplex, 10/100 Mbps.
- ASCII range usable: 0x20-0x7E plus 0x0D (CR) as terminator only.
- `?` parameter = request command; device returns RESPONSE within 200ms, same form as EVENT.
- EVENTs are unsolicited state-change notifications sent to controller (same form as COMMAND). RESPONSEs are replies to `?` request commands.
- Master volume minimum parameter is "00"; 1dB step uses 2 ASCII chars (MV00..MV60).
- Source document is labelled "DENON SYSTEM control protocol Ver.1.0.0, Application model: DRA-N5/RCD-N8, Application terminal: Ethernet Rev 8.0.0, dated 12-Oct-2012". Applied to CEOL N9 (RCD-N9) on platform-continuity inference per prior discovery; a CEOL-N9-specific protocol doc could not be located.
- Model/region markers in source: "N8 Only" (CD/FM/AM/JP/DAB/AUXA/AUXC), "N5" (AUXB analog), "E2 Only" (LASTFM, IRADIO), "NA Only" (PANDORA, SIRIUSXM). Availability on CEOL N9 unconfirmed.
- BD STATUS response field decoding (disc type code, audio format code, time mode code, answer code, status code, play mode code) is defined in source footnotes (*1-*7) as packed ASCII fields; not split into discrete feedback variables here.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: base URL / IP discovery method not specified (device SETUP menu only). -->
<!-- UNRESOLVED: CEOL-N9-specific protocol document not found; RCD-N8 doc applied by platform inference. -->
<!-- UNRESOLVED: exact favorite slot count / numbering bounds not stated. -->
<!-- UNRESOLVED: region/model-specific command availability on CEOL N9 unconfirmed. -->
````

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/20150501111601/http://assets.eu.denon.com:80/DocumentMaster/UK/DRAN5_RCDN8_PROTOCOL_V.1.0.0.pdf
retrieved_at: 2026-07-31T17:15:26.759Z
last_checked_at: 2026-08-05T08:17:19.586Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:17:19.586Z
matched_actions: 128
action_count: 128
confidence: medium
summary: "All 128 spec actions (Actions + Feedbacks) match wire-literal command examples in the source COMMAND/parameter table; transport TCP port 23 confirmed verbatim. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source protocol doc is labelled DRA-N5/RCD-N8 v1.0.0 (12-Oct-2012); CEOL N9 / RCD-N9-specific protocol doc could not be located. Application to CEOL N9 is inferred from shared platform. Some commands marked \"N8 Only\" / \"N5\" / \"E2 Only\" / \"NA Only\" in source — region/model availability on CEOL N9 not confirmed."
- "source states TCP port 23 (telnet) and 135 bytes max command length; base URL / IP discovery not specified (DHCP/manual via on-device SETUP menu)."
- "detailed BD STATUS field decoding (disc type/audio format/time mode/answer code) defined in source footnotes but not split into discrete feedback variables."
- "favorite slot count / numbering range not explicitly bounded in source."
- "source documents no explicit multi-step macro sequences (command-by-command recipes). Timer-set commands embed multiple fields but are single commands, not sequences."
- "no explicit safety interlock procedures, voltage/current protection, or power-on sequencing beyond the PWON 1-second spacing note."
- "firmware version compatibility not stated in source."
- "base URL / IP discovery method not specified (device SETUP menu only)."
- "CEOL-N9-specific protocol document not found; RCD-N8 doc applied by platform inference."
- "exact favorite slot count / numbering bounds not stated."
- "region/model-specific command availability on CEOL N9 unconfirmed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
