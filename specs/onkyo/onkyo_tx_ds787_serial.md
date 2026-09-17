---
spec_id: admin/onkyo-tx-ds787
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-DS787 Control Spec"
manufacturer: Onkyo
model_family: TX-DS787
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-DS787
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T20:16:22.102Z
last_checked_at: 2026-09-16T22:17:17.635Z
generated_at: 2026-09-16T22:17:17.635Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Zone2 power/mute/volume/tone/balance commands (ZPW/ZMT/ZVL/ZTN/ZBL) and Net-Tune, XM, SIRIUS, HD Radio, memory setup, tone per-channel, sleep, trigger, and HDMI-era commands are marked unsupported for TX-DS787 in the source and are omitted. Zone2 selector (SLZ) is supported."
  - "tuning-frequency query (TUNQSTN) not supported on TX-DS787 per source support matrix"
  - "none identified in source"
  - "no multi-step sequences described in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source"
  - "RDS RT information response payload format not specified for TX-DS787"
verification:
  verdict: verified
  checked_at: 2026-09-16T22:17:17.635Z
  matched_actions: 152
  action_count: 152
  confidence: medium
  summary: "All 152 spec actions map to TX-DS787=Yes source rows; ISCP transport parameters (9600/8/N/1, 3-wire RS-232C, framing) verbatim in source. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Onkyo TX-DS787 Control Spec

## Summary
Onkyo TX-DS787 AV receiver controlled over RS-232C using ISCP (Integra Serial Control Protocol, documented in "Integra Serial Communication Protocol for AV Receiver" v1.15). Spec covers the commands the source marks supported for the TX-DS787/DTR-7.1 column: system power, muting, master volume, input/record-out selection, Zone2 source selection, listening modes, late night, Re-EQ/Academy filter, tuner/presets/RDS, display and dimmer, plus RI-bus pass-through control of connected CD/tape devices.

<!-- UNRESOLVED: Zone2 power/mute/volume/tone/balance commands (ZPW/ZMT/ZVL/ZTN/ZBL) and Net-Tune, XM, SIRIUS, HD Radio, memory setup, tone per-channel, sleep, trigger, and HDMI-era commands are marked unsupported for TX-DS787 in the source and are omitted. Zone2 selector (SLZ) is supported. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
# Framing (ISCP over RS-232C, from source section 1.1):
#   Controller -> Device: "!" + unit-type char "1" (Receiver) + 3 command chars +
#     parameter chars + end char [CR] (0x0D) or [LF] (0x0A) or [CR][LF].
#     Example: !1PWR01[CR]
#   Device -> Controller: "!" + "1" + ISCP message + [EOF] (0x1A).
#     Example (power standby): !1SST00[EOF]  (example verbatim from source)
#   3-wire RS-232C, 9-pin female D connector: pin 2 = transmit, pin 3 = receive,
#     pin 5 = signal ground. Use a straight-through cable.
# Note: source also documents eISCP over Ethernet (TCP port 60128 default) but only
#   for network-capable models; TX-DS787 is not in those model columns.
```

## Traits
```yaml
# powerable: inferred from PWR00/PWR01 commands
# routable: inferred from SLI/SLR/SLZ input selection commands
# queryable: inferred from QSTN query commands returning state
# levelable: inferred from MVL volume set/up/down commands
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# All command values are the ISCP message (3 command chars + parameter chars).
# Wire format: "!1" + command + end char. See Transport.
# Source column: "TX-DS787 DTR-7.1" = Yes rows only.

# --- PWR: System Power Command ---
- id: system_standby
  label: System Standby
  kind: action
  command: "PWR00"
  params: []
- id: system_on
  label: System On
  kind: action
  command: "PWR01"
  params: []
- id: system_power_query
  label: System Power Status Query
  kind: query
  command: "PWRQSTN"
  params: []

# --- AMT: Audio Muting Command ---
- id: audio_muting_off
  label: Audio Muting Off
  kind: action
  command: "AMT00"
  params: []
- id: audio_muting_on
  label: Audio Muting On
  kind: action
  command: "AMT01"
  params: []
- id: audio_muting_query
  label: Audio Muting State Query
  kind: query
  command: "AMTQSTN"
  params: []

# --- MVL: Master Volume Command ---
- id: master_volume_set
  label: Set Master Volume
  kind: action
  command: "MVL{level}"
  params:
    - name: level
      type: string
      description: "Volume level 0-100 in hexadecimal representation, 2 chars (\"00\"-\"64\")"
- id: master_volume_up
  label: Volume Level Up
  kind: action
  command: "MVLUP"
  params: []
- id: master_volume_down
  label: Volume Level Down
  kind: action
  command: "MVLDOWN"
  params: []
- id: master_volume_query
  label: Volume Level Query
  kind: query
  command: "MVLQSTN"
  params: []

# --- DIF: Display Information Command (TX-DS787 supported rows) ---
- id: display_program_format
  label: Display Program Format
  kind: action
  command: "DIF00"
  params: []
- id: display_digital_input_position
  label: Display Digital Input Position
  kind: action
  command: "DIF01"
  params: []
- id: display_digital_format
  label: Display Digital Format (temporary display)
  kind: action
  command: "DIF02"
  params: []
- id: display_bass_level
  label: Display Bass Level
  kind: action
  command: "DIF03"
  params: []
- id: display_treble_level
  label: Display Treble Level
  kind: action
  command: "DIF04"
  params: []

# --- DIM: Dimmer Level Command ---
- id: dimmer_bright
  label: Dimmer Level Bright
  kind: action
  command: "DIM00"
  params: []
- id: dimmer_dim
  label: Dimmer Level Dim
  kind: action
  command: "DIM01"
  params: []
- id: dimmer_dark
  label: Dimmer Level Dark
  kind: action
  command: "DIM02"
  params: []
- id: dimmer_shut_off
  label: Dimmer Level Shut-Off
  kind: action
  command: "DIM03"
  params: []
- id: dimmer_wrap_up
  label: Dimmer Level Wrap-Around Up
  kind: action
  command: "DIMDIM"
  params: []
- id: dimmer_query
  label: Dimmer Level Query
  kind: query
  command: "DIMQSTN"
  params: []

# --- OSD: Setup Operation Command ---
- id: osd_menu
  label: OSD Menu Key
  kind: action
  command: "OSDMENU"
  params: []
- id: osd_up
  label: OSD Up Key
  kind: action
  command: "OSDUP"
  params: []
- id: osd_down
  label: OSD Down Key
  kind: action
  command: "OSDDOWN"
  params: []
- id: osd_right
  label: OSD Right Key
  kind: action
  command: "OSDRIGHT"
  params: []
- id: osd_left
  label: OSD Left Key
  kind: action
  command: "OSDLEFT"
  params: []
- id: osd_enter
  label: OSD Enter Key
  kind: action
  command: "OSDENTER"
  params: []
- id: osd_exit
  label: OSD Exit Key
  kind: action
  command: "OSDEXIT"
  params: []

# --- SLI: Input Selector Command ---
- id: select_input_video1
  label: Select Input VIDEO1 (VCR/DVR)
  kind: action
  command: "SLI00"
  params: []
- id: select_input_video2
  label: Select Input VIDEO2 (CBL/SAT)
  kind: action
  command: "SLI01"
  params: []
- id: select_input_video3
  label: Select Input VIDEO3 (GAME/TV/GAME)
  kind: action
  command: "SLI02"
  params: []
- id: select_input_video4
  label: Select Input VIDEO4 (AUX1/AUX)
  kind: action
  command: "SLI03"
  params: []
- id: select_input_video5
  label: Select Input VIDEO5 (AUX2)
  kind: action
  command: "SLI04"
  params: []
- id: select_input_dvd
  label: Select Input DVD
  kind: action
  command: "SLI10"
  params: []
- id: select_input_tape1
  label: Select Input TAPE(1) (TV/TAPE)
  kind: action
  command: "SLI20"
  params: []
- id: select_input_tape2
  label: Select Input TAPE2
  kind: action
  command: "SLI21"
  params: []
- id: select_input_phono
  label: Select Input PHONO
  kind: action
  command: "SLI22"
  params: []
- id: select_input_cd
  label: Select Input CD
  kind: action
  command: "SLI23"
  params: []
- id: select_input_fm
  label: Select Input FM
  kind: action
  command: "SLI24"
  params: []
- id: select_input_am
  label: Select Input AM
  kind: action
  command: "SLI25"
  params: []
- id: input_selector_query
  label: Input Selector Position Query
  kind: query
  command: "SLIQSTN"
  params: []

# --- SLR: RECOUT Selector Command ---
- id: recout_video1
  label: RECOUT VIDEO1
  kind: action
  command: "SLR00"
  params: []
- id: recout_video2
  label: RECOUT VIDEO2
  kind: action
  command: "SLR01"
  params: []
- id: recout_video3
  label: RECOUT VIDEO3
  kind: action
  command: "SLR02"
  params: []
- id: recout_video4
  label: RECOUT VIDEO4
  kind: action
  command: "SLR03"
  params: []
- id: recout_video5
  label: RECOUT VIDEO5
  kind: action
  command: "SLR04"
  params: []
- id: recout_dvd
  label: RECOUT DVD
  kind: action
  command: "SLR10"
  params: []
- id: recout_tape1
  label: RECOUT TAPE(1)
  kind: action
  command: "SLR20"
  params: []
- id: recout_tape2
  label: RECOUT TAPE2
  kind: action
  command: "SLR21"
  params: []
- id: recout_phono
  label: RECOUT PHONO
  kind: action
  command: "SLR22"
  params: []
- id: recout_cd
  label: RECOUT CD
  kind: action
  command: "SLR23"
  params: []
- id: recout_fm
  label: RECOUT FM
  kind: action
  command: "SLR24"
  params: []
- id: recout_am
  label: RECOUT AM
  kind: action
  command: "SLR25"
  params: []
- id: recout_off
  label: RECOUT OFF
  kind: action
  command: "SLR7F"
  params: []
- id: recout_source
  label: RECOUT SOURCE
  kind: action
  command: "SLR80"
  params: []
- id: recout_query
  label: RECOUT Selector Position Query
  kind: query
  command: "SLRQSTN"
  params: []

# --- LMD: Listening Mode Command (TX-DS787 supported values) ---
- id: listening_mode_stereo
  label: Listening Mode STEREO
  kind: action
  command: "LMD00"
  params: []
- id: listening_mode_direct
  label: Listening Mode DIRECT
  kind: action
  command: "LMD01"
  params: []
- id: listening_mode_surround
  label: Listening Mode SURROUND
  kind: action
  command: "LMD02"
  params: []
- id: listening_mode_film
  label: Listening Mode FILM (Game-RPG)
  kind: action
  command: "LMD03"
  params: []
- id: listening_mode_thx
  label: Listening Mode THX
  kind: action
  command: "LMD04"
  params: []
- id: listening_mode_action
  label: Listening Mode ACTION (Game-Action)
  kind: action
  command: "LMD05"
  params: []
- id: listening_mode_musical
  label: Listening Mode MUSICAL (Game-Rock)
  kind: action
  command: "LMD06"
  params: []
- id: listening_mode_mono_movie
  label: Listening Mode MONO MOVIE
  kind: action
  command: "LMD07"
  params: []
- id: listening_mode_orchestra
  label: Listening Mode ORCHESTRA
  kind: action
  command: "LMD08"
  params: []
- id: listening_mode_unplugged
  label: Listening Mode UNPLUGGED
  kind: action
  command: "LMD09"
  params: []
- id: listening_mode_studio_mix
  label: Listening Mode STUDIO-MIX
  kind: action
  command: "LMD0A"
  params: []
- id: listening_mode_tv_logic
  label: Listening Mode TV LOGIC
  kind: action
  command: "LMD0B"
  params: []
- id: listening_mode_all_ch_stereo
  label: Listening Mode ALL CH STEREO
  kind: action
  command: "LMD0C"
  params: []
- id: listening_mode_theater_dimensional
  label: Listening Mode THEATER-DIMENSIONAL
  kind: action
  command: "LMD0D"
  params: []
- id: listening_mode_enhanced7
  label: Listening Mode ENHANCED 7 (Game-Sports)
  kind: action
  command: "LMD0E"
  params: []
- id: listening_mode_mono
  label: Listening Mode MONO
  kind: action
  command: "LMD0F"
  params: []
- id: listening_mode_up
  label: Listening Mode Wrap-Around Up
  kind: action
  command: "LMDUP"
  params: []
- id: listening_mode_down
  label: Listening Mode Wrap-Around Down
  kind: action
  command: "LMDDOWN"
  params: []
- id: listening_mode_query
  label: Listening Mode Query
  kind: query
  command: "LMDQSTN"
  params: []

# --- LTN: Late Night Command ---
- id: late_night_off
  label: Late Night Off
  kind: action
  command: "LTN00"
  params: []
- id: late_night_low
  label: "Late Night Low (Dolby Digital) / On (Dolby TrueHD)"
  kind: action
  command: "LTN01"
  params: []
- id: late_night_high
  label: "Late Night High (Dolby Digital)"
  kind: action
  command: "LTN02"
  params: []
- id: late_night_wrap_up
  label: Late Night State Wrap-Around Up
  kind: action
  command: "LTNUP"
  params: []
- id: late_night_query
  label: Late Night Level Query
  kind: query
  command: "LTNQSTN"
  params: []

# --- RAS: Re-EQ/Academy Filter Command ---
- id: reeq_academy_both_off
  label: Re-EQ/Academy Both Off
  kind: action
  command: "RAS00"
  params: []
- id: reeq_on
  label: Re-EQ On
  kind: action
  command: "RAS01"
  params: []
- id: academy_on
  label: Academy On
  kind: action
  command: "RAS02"
  params: []
- id: reeq_academy_wrap_up
  label: Re-EQ/Academy State Wrap-Around Up
  kind: action
  command: "RASUP"
  params: []
- id: reeq_academy_query
  label: Re-EQ/Academy State Query
  kind: query
  command: "RASQSTN"
  params: []

# --- TUN: Tuning Command (Tuner Pack model; QSTN not supported on TX-DS787) ---
- id: tuner_direct_frequency
  label: Set Tuning Frequency Directly
  kind: action
  command: "TUN{frequency}"
  params:
    - name: frequency
      type: string
      description: "5 digits: FM nnn.nn MHz / AM nnnnn kHz"
- id: tuner_up
  label: Tuning Frequency Wrap-Around Up
  kind: action
  command: "TUNUP"
  params: []
- id: tuner_down
  label: Tuning Frequency Wrap-Around Down
  kind: action
  command: "TUNDOWN"
  params: []

# --- PRS: Preset Command (TX-DS787: \"01\"-\"28\" hex = presets 1-40) ---
- id: preset_set
  label: Set Preset Number
  kind: action
  command: "PRS{preset}"
  params:
    - name: preset
      type: string
      description: "Preset No. 1-40 in hexadecimal representation (\"01\"-\"28\")"
- id: preset_up
  label: Preset No. Wrap-Around Up
  kind: action
  command: "PRSUP"
  params: []
- id: preset_down
  label: Preset No. Wrap-Around Down
  kind: action
  command: "PRSDOWN"
  params: []
- id: preset_query
  label: Preset Number Query
  kind: query
  command: "PRSQSTN"
  params: []

# --- RDS: RDS Information Command (RDS model) ---
- id: rds_display_rt
  label: Display RT Information
  kind: action
  command: "RDS00"
  params: []
- id: rds_display_pty
  label: Display PTY Information
  kind: action
  command: "RDS01"
  params: []
- id: rds_display_tp
  label: Display TP Information
  kind: action
  command: "RDS02"
  params: []
- id: rds_wrap_change
  label: RDS Information Wrap-Around Change
  kind: action
  command: "RDSUP"
  params: []

# --- PTS: PTY Scan Command (RDS model) ---
- id: pty_scan_set
  label: Set PTY Number / PTY Scan
  kind: action
  command: "PTS{pty}"
  params:
    - name: pty
      type: string
      description: "PTY No. 0-30 in hexadecimal representation (\"00\"-\"1E\")"

# --- TPS: TP Scan Command (RDS model) ---
- id: tp_scan_start
  label: Start TP Scan
  kind: action
  command: "TPS"
  params: []  # source: "Start TP Scan (When Don't Have Parameter)"

# --- SLZ: ZONE2 Selector Command (TX-DS787: Yes(*1) rows; *1 = only works when main is ON) ---
- id: zone2_select_video1
  label: Zone2 Select VIDEO1 (VCR/DVR)
  kind: action
  command: "SLZ00"
  params: []
- id: zone2_select_video2
  label: Zone2 Select VIDEO2 (CBL/SAT)
  kind: action
  command: "SLZ01"
  params: []
- id: zone2_select_video3
  label: Zone2 Select VIDEO3 (GAME/TV)
  kind: action
  command: "SLZ02"
  params: []
- id: zone2_select_video4
  label: Zone2 Select VIDEO4 (AUX1/AUX)
  kind: action
  command: "SLZ03"
  params: []
- id: zone2_select_video5
  label: Zone2 Select VIDEO5 (AUX2)
  kind: action
  command: "SLZ04"
  params: []
- id: zone2_select_dvd
  label: Zone2 Select DVD
  kind: action
  command: "SLZ10"
  params: []
- id: zone2_select_tape1
  label: Zone2 Select TAPE(1)
  kind: action
  command: "SLZ20"
  params: []
- id: zone2_select_tape2
  label: Zone2 Select TAPE2
  kind: action
  command: "SLZ21"
  params: []
- id: zone2_select_phono
  label: Zone2 Select PHONO
  kind: action
  command: "SLZ22"
  params: []
- id: zone2_select_cd
  label: Zone2 Select CD
  kind: action
  command: "SLZ23"
  params: []
- id: zone2_select_fm
  label: Zone2 Select FM
  kind: action
  command: "SLZ24"
  params: []
- id: zone2_select_am
  label: Zone2 Select AM
  kind: action
  command: "SLZ25"
  params: []
- id: zone2_select_off
  label: Zone2 Select OFF
  kind: action
  command: "SLZ7F"
  params: []
- id: zone2_select_source
  label: Zone2 Select SOURCE
  kind: action
  command: "SLZ80"
  params: []
- id: zone2_selector_query
  label: Zone2 Selector Position Query
  kind: query
  command: "SLZQSTN"
  params: []

# --- CCD: RI CD Player Operation Command (via receiver RI port) ---
- id: ri_cd_track_up
  label: RI CD TRACK+
  kind: action
  command: "CCDTRACK"
  params: []
- id: ri_cd_play
  label: RI CD PLAY
  kind: action
  command: "CCDPLAY"
  params: []
- id: ri_cd_stop
  label: RI CD STOP
  kind: action
  command: "CCDSTOP"
  params: []
- id: ri_cd_pause
  label: RI CD PAUSE
  kind: action
  command: "CCDPAUSE"
  params: []
- id: ri_cd_skip_forward
  label: RI CD SKIP FORWARD (>>I)
  kind: action
  command: "CCDSKIP.F"
  params: []
- id: ri_cd_skip_reverse
  label: RI CD SKIP REVERSE (I<<)
  kind: action
  command: "CCDSKIP.R"
  params: []
- id: ri_cd_memory
  label: RI CD MEMORY
  kind: action
  command: "CCDMEMORY"
  params: []
- id: ri_cd_clear
  label: RI CD CLEAR
  kind: action
  command: "CCDCLEAR"
  params: []
- id: ri_cd_repeat
  label: RI CD REPEAT
  kind: action
  command: "CCDREPEAT"
  params: []
- id: ri_cd_random
  label: RI CD RANDOM
  kind: action
  command: "CCDRANDOM"
  params: []
- id: ri_cd_display
  label: RI CD DISPLAY
  kind: action
  command: "CCDDISP"
  params: []
- id: ri_cd_open_close
  label: RI CD OPEN/CLOSE
  kind: action
  command: "CCDOP/CL"
  params: []
- id: ri_cd_digit_1
  label: RI CD Key 1
  kind: action
  command: "CCD1"
  params: []
- id: ri_cd_digit_2
  label: RI CD Key 2
  kind: action
  command: "CCD2"
  params: []
- id: ri_cd_digit_3
  label: RI CD Key 3
  kind: action
  command: "CCD3"
  params: []
- id: ri_cd_digit_4
  label: RI CD Key 4
  kind: action
  command: "CCD4"
  params: []
- id: ri_cd_digit_5
  label: RI CD Key 5
  kind: action
  command: "CCD5"
  params: []
- id: ri_cd_digit_6
  label: RI CD Key 6
  kind: action
  command: "CCD6"
  params: []
- id: ri_cd_digit_7
  label: RI CD Key 7
  kind: action
  command: "CCD7"
  params: []
- id: ri_cd_digit_8
  label: RI CD Key 8
  kind: action
  command: "CCD8"
  params: []
- id: ri_cd_digit_9
  label: RI CD Key 9
  kind: action
  command: "CCD9"
  params: []
- id: ri_cd_digit_0
  label: RI CD Key 0
  kind: action
  command: "CCD0"
  params: []
- id: ri_cd_plus_10
  label: RI CD +10
  kind: action
  command: "CCD+10"
  params: []
- id: ri_cd_disc_up
  label: RI CD DISC+ (D.SKIP)
  kind: action
  command: "CCDD.SKIP"
  params: []

# --- CT1: RI TAPE1(A) Operation Command ---
- id: ri_tape1_play_forward
  label: RI TAPE1 PLAY (forward)
  kind: action
  command: "CT1PLAY.F"
  params: []
- id: ri_tape1_play_reverse
  label: RI TAPE1 PLAY (reverse)
  kind: action
  command: "CT1PLAY.R"
  params: []
- id: ri_tape1_stop
  label: RI TAPE1 STOP
  kind: action
  command: "CT1STOP"
  params: []
- id: ri_tape1_rec_pause
  label: RI TAPE1 REC/PAUSE
  kind: action
  command: "CT1RC/PAU"
  params: []
- id: ri_tape1_ff
  label: RI TAPE1 FF (>>)
  kind: action
  command: "CT1FF"
  params: []
- id: ri_tape1_rew
  label: RI TAPE1 REW (<<)
  kind: action
  command: "CT1REW"
  params: []

# --- CT2: RI TAPE2(B) Operation Command ---
- id: ri_tape2_play_forward
  label: RI TAPE2 PLAY (forward)
  kind: action
  command: "CT2PLAY.F"
  params: []
- id: ri_tape2_play_reverse
  label: RI TAPE2 PLAY (reverse)
  kind: action
  command: "CT2PLAY.R"
  params: []
- id: ri_tape2_stop
  label: RI TAPE2 STOP
  kind: action
  command: "CT2STOP"
  params: []
- id: ri_tape2_rec_pause
  label: RI TAPE2 REC/PAUSE
  kind: action
  command: "CT2RC/PAU"
  params: []
- id: ri_tape2_ff
  label: RI TAPE2 FF (>>)
  kind: action
  command: "CT2FF"
  params: []
- id: ri_tape2_rew
  label: RI TAPE2 REW (<<)
  kind: action
  command: "CT2REW"
  params: []
- id: ri_tape2_open_close
  label: RI TAPE2 OPEN/CLOSE
  kind: action
  command: "CT2OP/CL"
  params: []
- id: ri_tape2_skip_forward
  label: RI TAPE2 SKIP FORWARD (>>I)
  kind: action
  command: "CT2SKIP.F"
  params: []
- id: ri_tape2_skip_reverse
  label: RI TAPE2 SKIP REVERSE (I<<)
  kind: action
  command: "CT2SKIP.R"
  params: []
```

## Feedbacks
```yaml
# Device -> Controller message: "!" + "1" + ISCP message + [EOF].
# Command acknowledgement echoes the command (e.g. send "SLI03", receiver returns "SLI03").
# Query responses return the current value as an ISCP message.
- id: power_state
  type: enum
  values: [standby, on]
  # PWR00 = standby, PWR01 = on; source example device message for standby: "!1SST00[EOF]"
- id: audio_muting_state
  type: enum
  values: [off, on]
  # AMT00 = off, AMT01 = on
- id: master_volume_level
  type: integer
  # MVL response "00"-"64" hexadecimal = 0-100
- id: input_selector_position
  type: enum
  values: ["00", "01", "02", "03", "04", "10", "20", "21", "22", "23", "24", "25"]
- id: recout_selector_position
  type: enum
  values: ["00", "01", "02", "03", "04", "10", "20", "21", "22", "23", "24", "25", "7F", "80"]
- id: zone2_selector_position
  type: enum
  values: ["00", "01", "02", "03", "04", "10", "20", "21", "22", "23", "24", "25", "7F", "80"]
- id: listening_mode
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F"]
- id: late_night_level
  type: enum
  values: ["00", "01", "02"]
- id: reeq_academy_state
  type: enum
  values: ["00", "01", "02"]
- id: dimmer_level
  type: enum
  values: ["00", "01", "02", "03"]
- id: preset_number
  type: integer
  # PRS response "01"-"28" hexadecimal = preset 1-40
# UNRESOLVED: tuning-frequency query (TUNQSTN) not supported on TX-DS787 per source support matrix
```

## Variables
```yaml
# No settable parameters beyond the discrete/parameterized actions above.
# UNRESOLVED: none identified in source
```

## Events
```yaml
# Event Notice Communication (source section 2.3): if system status changes,
# the Receiver notifies the Controller by sending the new current status as an
# unsolicited ISCP status message (e.g. "SLI03" wrapped in "!1"...[EOF] framing).
- id: status_change_notice
  type: string
  description: Unsolicited ISCP status message sent whenever receiver status changes
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements for serial control.
```

## Notes
- Command timing: receiver responds to a command with a status message within 50 msec; if no response within 50 msec, "the communication has failed" (source section 2.1).
- Question communication: send a Question Message (e.g. "SLIQSTN") to get current status; receiver responds with a status message (e.g. "SLI03") (source section 2.2).
- Protocol is point-to-point between one third-party controller and the receiver (source section 2).
- ISCP message structure: 3 fixed command characters + variable-length parameter characters (source section 1).
- RI commands (CCD/CT1/CT2 groups) operate RI-bus-connected Onkyo devices (CD player, cassette decks) through the receiver, not the receiver itself.
- SLZ (Zone2 selector) on TX-DS787: source footnote "*1: only works when main is ON". Zone2 power/mute/volume serial commands (ZPW/ZMT/ZVL) are NOT supported on TX-DS787 per the source support matrix.
- TUN frequency parameter: 5 digits — FM as nnn.nn MHz, AM as nnnnn kHz.
- Volume range for TX-DS787 is 0-100 ("00"-"64" hex); the 0-80 ("00"-"50" hex) variant applies to other models. Presets: 1-40 ("01"-"28" hex).
- RDS/PTS/TPS commands apply to RDS-equipped models; source marks them supported for TX-DS787.
- Firmware version check (source "Version Check" section) is a front-panel procedure (DISPLAY + STANDBY/ON), not a serial command.
- Source document covers many Onkyo/Integra models; only rows marked "Yes" in the "TX-DS787 DTR-7.1" column were included. eISCP/Ethernet section applies to network models only, not TX-DS787.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RDS RT information response payload format not specified for TX-DS787 -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T20:16:22.102Z
last_checked_at: 2026-09-16T22:17:17.635Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-16T22:17:17.635Z
matched_actions: 152
action_count: 152
confidence: medium
summary: "All 152 spec actions map to TX-DS787=Yes source rows; ISCP transport parameters (9600/8/N/1, 3-wire RS-232C, framing) verbatim in source. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Zone2 power/mute/volume/tone/balance commands (ZPW/ZMT/ZVL/ZTN/ZBL) and Net-Tune, XM, SIRIUS, HD Radio, memory setup, tone per-channel, sleep, trigger, and HDMI-era commands are marked unsupported for TX-DS787 in the source and are omitted. Zone2 selector (SLZ) is supported."
- "tuning-frequency query (TUNQSTN) not supported on TX-DS787 per source support matrix"
- "none identified in source"
- "no multi-step sequences described in source"
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source"
- "RDS RT information response payload format not specified for TX-DS787"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
