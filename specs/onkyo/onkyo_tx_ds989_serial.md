---
spec_id: admin/onkyo-tx-ds989
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-DS989 Control Spec"
manufacturer: Onkyo
model_family: TX-DS989
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-DS989
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T15:42:29.293Z
last_checked_at: 2026-09-16T22:18:18.298Z
generated_at: 2026-09-16T22:18:18.298Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source contains no Zone2 power/volume/muting/tone commands for TX-DS989 (all \"No\" in that model's columns); sleep timer (SLP), speaker A/B (SPA/SPB), tone commands (TFR/TSW family), triggers (TGA/B/C), and Net-Tune/network commands are likewise \"No\" for this model. The doc also describes ISCP over Ethernet (eISCP, TCP port 60128 default) but that applies to network models; all network command rows are \"No\" for TX-DS989."
  - "source extraction truncates the SLZ support matrix; rows for"
  - "no separate variable table in source."
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility range not stated in source (only original vs Ver2.0 hardware distinction)."
  - "SLZ support-matrix rows for input codes 03/04/10/20/21/22/23/24 truncated in source extraction; only 00/01/02/25 verifiable as supported for TX-DS989. Footnote *1 meaning for TX-DS989 SLZ not readable."
  - "exact response payload formats for each QSTN query not enumerated in source (only the SLI and SST examples)."
verification:
  verdict: verified
  checked_at: 2026-09-16T22:18:18.298Z
  matched_actions: 138
  action_count: 138
  confidence: medium
  summary: "All 138 spec actions match Yes-for-TX-DS989 source commands 1:1; transport parameters verbatim; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Onkyo TX-DS989 Control Spec

## Summary
Onkyo TX-DS989 A/V receiver controlled via ISCP (Integra Serial Control Protocol) over RS-232C. Source is the "Integra Serial Communication Protocol for AV Receiver" (Version 1.15, 31 August 2009, ONKYO CORPORATION), whose per-model support tables define exactly which commands apply to the TX-DS989. Covers main-zone power, volume, muting, dimmer, display, OSD navigation, input/recout selection, listening modes, late night, Re-EQ/Academy filter, tuner/presets/RDS, Zone2 source selection, and RI-system transport control (CD, tape decks).

<!-- UNRESOLVED: source contains no Zone2 power/volume/muting/tone commands for TX-DS989 (all "No" in that model's columns); sleep timer (SLP), speaker A/B (SPA/SPB), tone commands (TFR/TSW family), triggers (TGA/B/C), and Net-Tune/network commands are likewise "No" for this model. The doc also describes ISCP over Ethernet (eISCP, TCP port 60128 default) but that applies to network models; all network command rows are "No" for TX-DS989. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600      # "9600 baud / 8 data bits / 1 stop bits / no parity / no flow control"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # 3-wire RS-232C, 9-pin female D-type connector:
  # pin 2 = transmit, pin 3 = receive, pin 5 = signal ground.
  # Use a straight-thru cable to connect to controller PC.
auth:
  type: none  # inferred: no auth procedure in source
```

**ISCP message framing (from source §1.1):**
- Controller → Device: start character `!` + destination unit-type character `1` (Receiver) + ISCP message (3 command characters + parameter characters, variable length) + end character `[CR]` or `[LF]` or `[CR][LF]`. Example (Power On): `!1PWR01[CR]`
- Device → Controller: `!` + source unit-type character `1` + ISCP message + `[EOF]` (ASCII 0x1A). Example (Power Status = Standby): `!1SST00[EOF]`
- Actions below list the bare ISCP command+parameter; prepend `!1` and append the end character on the wire.
- Special characters: `[CR]` = 0x0D, `[LF]` = 0x0A, `[EOF]` = 0x1A.

## Traits
```yaml
# - powerable  (PWR00/PWR01 present)
# - routable   (SLI/SLR/SLZ selection commands present)
# - queryable  (QSTN query commands present)
# - levelable  (MVL volume level set/up/down present)
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# TX-DS989 support taken from the "TX-DS989 DTR-9.1 RDC-7" and
# "TX-DS989 DTC-9.1 RDC-7 (Ver2.0)" Yes/No columns of the source tables.
# Entries marked "original only" are Yes in column 1 (TX-DS989) and No in
# column 2 (TX-DS989 Ver2.0).

# --- PWR: System Power Command ---
- id: pwr_standby
  label: System Standby
  kind: action
  command: "PWR00"
  params: []
- id: pwr_on
  label: System On
  kind: action
  command: "PWR01"
  params: []
- id: pwr_query
  label: System Power Status Query
  kind: query
  command: "PWRQSTN"
  params: []

# --- AMT: Audio Muting Command ---
- id: amt_off
  label: Audio Muting Off
  kind: action
  command: "AMT00"
  params: []
- id: amt_on
  label: Audio Muting On
  kind: action
  command: "AMT01"
  params: []
- id: amt_query
  label: Audio Muting State Query
  kind: query
  command: "AMTQSTN"
  params: []

# --- MVL: Master Volume Command (TX-DS989 uses 00-64 hex = 0-100 range) ---
- id: mvl_set
  label: Set Master Volume Level
  kind: action
  command: "MVL{level}"
  params:
    - name: level
      type: string
      description: "Volume level 0-100 in hexadecimal representation, two digits (00-64)"
- id: mvl_up
  label: Volume Level Up
  kind: action
  command: "MVLUP"
  params: []
- id: mvl_down
  label: Volume Level Down
  kind: action
  command: "MVLDOWN"
  params: []
- id: mvl_query
  label: Volume Level Query
  kind: query
  command: "MVLQSTN"
  params: []

# --- DIF: Display Information Command ---
- id: dif_program_format
  label: Display Program Format
  kind: action
  command: "DIF00"
  params: []
- id: dif_digital_input_position
  label: Display Digital Input Position
  kind: action
  command: "DIF01"
  params: []
- id: dif_digital_format
  label: Display Digital Format
  kind: action
  command: "DIF02"
  params: []
  # source lists DIF02 twice, both Yes for TX-DS989: "Display Digital Format
  # Position" (info table) and "Display Digital Format (temporary display)"
  # (mode table). Same payload, one action.
- id: dif_bass_level
  label: Display Bass Level
  kind: action
  command: "DIF03"
  params: []
- id: dif_treble_level
  label: Display Treble Level
  kind: action
  command: "DIF04"
  params: []

# --- DIM: Dimmer Level Command ---
- id: dim_bright
  label: Dimmer Level Bright
  kind: action
  command: "DIM00"
  params: []
- id: dim_dim
  label: Dimmer Level Dim
  kind: action
  command: "DIM01"
  params: []
- id: dim_dark
  label: Dimmer Level Dark
  kind: action
  command: "DIM02"
  params: []
- id: dim_shut_off
  label: Dimmer Level Shut-Off
  kind: action
  command: "DIM03"
  params: []
- id: dim_wrap_up
  label: Dimmer Level Wrap-Around Up
  kind: action
  command: "DIMDIM"
  params: []
- id: dim_query
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

# --- SLI: Input Selector Command (inputs marked Yes for TX-DS989) ---
- id: sli_video1
  label: Select Input VIDEO1 (VCR/DVR)
  kind: action
  command: "SLI00"
  params: []
- id: sli_video2
  label: Select Input VIDEO2 (CBL/SAT)
  kind: action
  command: "SLI01"
  params: []
- id: sli_video3
  label: Select Input VIDEO3 (GAME/TV/GAME)
  kind: action
  command: "SLI02"
  params: []
- id: sli_video4
  label: Select Input VIDEO4 (AUX1/AUX)
  kind: action
  command: "SLI03"
  params: []
- id: sli_video5
  label: Select Input VIDEO5 (AUX2)
  kind: action
  command: "SLI04"
  params: []
- id: sli_dvd
  label: Select Input DVD
  kind: action
  command: "SLI10"
  params: []
- id: sli_tape1
  label: Select Input TAPE(1) (TV/TAPE)
  kind: action
  command: "SLI20"
  params: []
- id: sli_tape2
  label: Select Input TAPE2
  kind: action
  command: "SLI21"
  params: []
- id: sli_phono
  label: Select Input PHONO
  kind: action
  command: "SLI22"
  params: []
- id: sli_cd
  label: Select Input CD
  kind: action
  command: "SLI23"
  params: []
- id: sli_fm
  label: Select Input FM
  kind: action
  command: "SLI24"
  params: []
- id: sli_am
  label: Select Input AM
  kind: action
  command: "SLI25"
  params: []
- id: sli_query
  label: Input Selector Position Query
  kind: query
  command: "SLIQSTN"
  params: []

# --- SLR: RECOUT Selector Command (codes marked Yes for TX-DS989) ---
- id: slr_video1
  label: RECOUT Select VIDEO1
  kind: action
  command: "SLR00"
  params: []
- id: slr_video2
  label: RECOUT Select VIDEO2
  kind: action
  command: "SLR01"
  params: []
- id: slr_video3
  label: RECOUT Select VIDEO3
  kind: action
  command: "SLR02"
  params: []
- id: slr_video4
  label: RECOUT Select VIDEO4
  kind: action
  command: "SLR03"
  params: []
- id: slr_video5
  label: RECOUT Select VIDEO5
  kind: action
  command: "SLR04"
  params: []
- id: slr_dvd
  label: RECOUT Select DVD
  kind: action
  command: "SLR10"
  params: []
- id: slr_tape1
  label: RECOUT Select TAPE(1)
  kind: action
  command: "SLR20"
  params: []
- id: slr_tape2
  label: RECOUT Select TAPE2
  kind: action
  command: "SLR21"
  params: []
- id: slr_phono
  label: RECOUT Select PHONO
  kind: action
  command: "SLR22"
  params: []
- id: slr_cd
  label: RECOUT Select CD
  kind: action
  command: "SLR23"
  params: []
- id: slr_fm
  label: RECOUT Select FM
  kind: action
  command: "SLR24"
  params: []
- id: slr_am
  label: RECOUT Select AM
  kind: action
  command: "SLR25"
  params: []
- id: slr_off
  label: RECOUT Select OFF
  kind: action
  command: "SLR7F"
  params: []
- id: slr_source
  label: RECOUT Select SOURCE
  kind: action
  command: "SLR80"
  params: []
- id: slr_query
  label: RECOUT Selector Position Query
  kind: query
  command: "SLRQSTN"
  params: []

# --- LMD: Listening Mode Command (modes marked Yes for TX-DS989) ---
- id: lmd_stereo
  label: Listening Mode STEREO
  kind: action
  command: "LMD00"
  params: []
- id: lmd_direct
  label: Listening Mode DIRECT
  kind: action
  command: "LMD01"
  params: []
- id: lmd_surround
  label: Listening Mode SURROUND
  kind: action
  command: "LMD02"
  params: []
- id: lmd_film
  label: Listening Mode FILM (Game-RPG)
  kind: action
  command: "LMD03"
  params: []
  # original TX-DS989 only; "No" on TX-DS989 Ver2.0 column
- id: lmd_thx
  label: Listening Mode THX
  kind: action
  command: "LMD04"
  params: []
- id: lmd_action
  label: Listening Mode ACTION (Game-Action)
  kind: action
  command: "LMD05"
  params: []
  # original TX-DS989 only; "No" on TX-DS989 Ver2.0 column
- id: lmd_musical
  label: Listening Mode MUSICAL (Game-Rock)
  kind: action
  command: "LMD06"
  params: []
  # original TX-DS989 only; "No" on TX-DS989 Ver2.0 column
- id: lmd_mono_movie
  label: Listening Mode MONO MOVIE
  kind: action
  command: "LMD07"
  params: []
- id: lmd_orchestra
  label: Listening Mode ORCHESTRA
  kind: action
  command: "LMD08"
  params: []
- id: lmd_unplugged
  label: Listening Mode UNPLUGGED
  kind: action
  command: "LMD09"
  params: []
- id: lmd_studio_mix
  label: Listening Mode STUDIO-MIX
  kind: action
  command: "LMD0A"
  params: []
- id: lmd_tv_logic
  label: Listening Mode TV LOGIC
  kind: action
  command: "LMD0B"
  params: []
- id: lmd_all_ch_stereo
  label: Listening Mode ALL CH STEREO
  kind: action
  command: "LMD0C"
  params: []
- id: lmd_theater_dimensional
  label: Listening Mode THEATER-DIMENSIONAL
  kind: action
  command: "LMD0D"
  params: []
- id: lmd_enhanced7
  label: Listening Mode ENHANCED 7 (Game-Sports)
  kind: action
  command: "LMD0E"
  params: []
- id: lmd_mono
  label: Listening Mode MONO
  kind: action
  command: "LMD0F"
  params: []
- id: lmd_up
  label: Listening Mode Wrap-Around Up
  kind: action
  command: "LMDUP"
  params: []
- id: lmd_down
  label: Listening Mode Wrap-Around Down
  kind: action
  command: "LMDDOWN"
  params: []
- id: lmd_query
  label: Listening Mode Query
  kind: query
  command: "LMDQSTN"
  params: []

# --- LTN: Late Night Command ---
- id: ltn_off
  label: Late Night Off
  kind: action
  command: "LTN00"
  params: []
- id: ltn_low
  label: Late Night Low (at Dolby Digital / On at Dolby TrueHD)
  kind: action
  command: "LTN01"
  params: []
- id: ltn_high
  label: Late Night High (at Dolby Digital / On at Dolby TrueHD)
  kind: action
  command: "LTN02"
  params: []
- id: ltn_up
  label: Late Night State Wrap-Around Up
  kind: action
  command: "LTNUP"
  params: []
- id: ltn_query
  label: Late Night Level Query
  kind: query
  command: "LTNQSTN"
  params: []

# --- RAS: Re-EQ/Academy Filter Command ---
- id: ras_both_off
  label: Re-EQ and Academy Both Off
  kind: action
  command: "RAS00"
  params: []
- id: ras_re_eq_on
  label: Re-EQ On
  kind: action
  command: "RAS01"
  params: []
- id: ras_academy_on
  label: Academy On
  kind: action
  command: "RAS02"
  params: []
- id: ras_up
  label: Re-EQ/Academy State Wrap-Around Up
  kind: action
  command: "RASUP"
  params: []
- id: ras_query
  label: Re-EQ/Academy State Query
  kind: query
  command: "RASQSTN"
  params: []

# --- TUN: Tuning Command (tuner-pack model) ---
- id: tun_set_frequency
  label: Set Tuning Frequency Directly
  kind: action
  command: "TUN{frequency}"
  params:
    - name: frequency
      type: string
      description: "5 digits: FM nnn.nn MHz / AM nnnnn kHz"
- id: tun_up
  label: Tuning Frequency Wrap-Around Up
  kind: action
  command: "TUNUP"
  params: []
- id: tun_down
  label: Tuning Frequency Wrap-Around Down
  kind: action
  command: "TUNDOWN"
  params: []
  # TUNQSTN (tuning frequency query) is "No" for TX-DS989 columns.

# --- PRS: Preset Command (TX-DS989: 01-28 hex = presets 1-40) ---
- id: prs_set
  label: Set Preset Number
  kind: action
  command: "PRS{preset}"
  params:
    - name: preset
      type: string
      description: "Preset number 1-40 in hexadecimal representation, two digits (01-28)"
- id: prs_up
  label: Preset Number Wrap-Around Up
  kind: action
  command: "PRSUP"
  params: []
- id: prs_down
  label: Preset Number Wrap-Around Down
  kind: action
  command: "PRSDOWN"
  params: []
- id: prs_query
  label: Preset Number Query
  kind: query
  command: "PRSQSTN"
  params: []

# --- RDS: RDS Information Command (RDS model) ---
- id: rds_rt_info
  label: Display RT Information
  kind: action
  command: "RDS00"
  params: []
- id: rds_pty_info
  label: Display PTY Information
  kind: action
  command: "RDS01"
  params: []
- id: rds_tp_info
  label: Display TP Information
  kind: action
  command: "RDS02"
  params: []
- id: rds_up
  label: RDS Information Wrap-Around Change
  kind: action
  command: "RDSUP"
  params: []

# --- PTS: PTY Scan Command (RDS model) ---
- id: pts_set
  label: Set PTY Number / PTY Scan
  kind: action
  command: "PTS{pty}"
  params:
    - name: pty
      type: string
      description: "PTY number 0-30 in hexadecimal representation, two digits (00-1E)"
  # PTSENTER (finish PTY scan) is "No" for TX-DS989 columns.

# --- TPS: TP Scan Command (RDS model) ---
- id: tps_start
  label: Start TP Scan
  kind: action
  command: "TPS"
  params: []
  # source: start TP scan when parameter is empty; TPSENTER is "No" for TX-DS989.

# --- SLZ: ZONE2 Selector Command ---
- id: slz_select_input
  label: ZONE2 Select Input
  kind: action
  command: "SLZ{input}"
  params:
    - name: input
      type: enum
      values: ["00", "01", "02", "25"]
      description: "00=VIDEO1 (VCR/DVR), 01=VIDEO2 (CBL/SAT), 02=VIDEO3 (GAME/TV), 25=AM; marked Yes(*1) in TX-DS989 columns"
  # UNRESOLVED: source extraction truncates the SLZ support matrix; rows for
  # codes 03, 04, 10, 20, 21, 22, 23, 24 and the meaning of footnote *1 for
  # TX-DS989 could not be read. Codes above are the verifiable rows.

# --- CCD: CD Player Operation Command (via ONKYO RI System) ---
- id: ccd_track_up
  label: CD TRACK+
  kind: action
  command: "CCDTRACK"
  params: []
- id: ccd_play
  label: CD PLAY
  kind: action
  command: "CCDPLAY"
  params: []
- id: ccd_stop
  label: CD STOP
  kind: action
  command: "CCDSTOP"
  params: []
- id: ccd_pause
  label: CD PAUSE
  kind: action
  command: "CCDPAUSE"
  params: []
- id: ccd_skip_f
  label: CD SKIP FORWARD (>>I)
  kind: action
  command: "CCDSKIP.F"
  params: []
- id: ccd_skip_r
  label: CD SKIP REVERSE (I<<)
  kind: action
  command: "CCDSKIP.R"
  params: []
- id: ccd_memory
  label: CD MEMORY
  kind: action
  command: "CCDMEMORY"
  params: []
- id: ccd_clear
  label: CD CLEAR
  kind: action
  command: "CCDCLEAR"
  params: []
- id: ccd_repeat
  label: CD REPEAT
  kind: action
  command: "CCDREPEAT"
  params: []
- id: ccd_random
  label: CD RANDOM
  kind: action
  command: "CCDRANDOM"
  params: []
- id: ccd_disp
  label: CD DISPLAY
  kind: action
  command: "CCDDISP"
  params: []
- id: ccd_open_close
  label: CD OPEN/CLOSE
  kind: action
  command: "CCDOP/CL"
  params: []
- id: ccd_key_1
  label: CD Numeric Key 1
  kind: action
  command: "CCD1"
  params: []
- id: ccd_key_2
  label: CD Numeric Key 2
  kind: action
  command: "CCD2"
  params: []
- id: ccd_key_3
  label: CD Numeric Key 3
  kind: action
  command: "CCD3"
  params: []
- id: ccd_key_4
  label: CD Numeric Key 4
  kind: action
  command: "CCD4"
  params: []
- id: ccd_key_5
  label: CD Numeric Key 5
  kind: action
  command: "CCD5"
  params: []
- id: ccd_key_6
  label: CD Numeric Key 6
  kind: action
  command: "CCD6"
  params: []
- id: ccd_key_7
  label: CD Numeric Key 7
  kind: action
  command: "CCD7"
  params: []
- id: ccd_key_8
  label: CD Numeric Key 8
  kind: action
  command: "CCD8"
  params: []
- id: ccd_key_9
  label: CD Numeric Key 9
  kind: action
  command: "CCD9"
  params: []
- id: ccd_key_0
  label: CD Numeric Key 0
  kind: action
  command: "CCD0"
  params: []
- id: ccd_plus_10
  label: CD +10 Key
  kind: action
  command: "CCD+10"
  params: []
- id: ccd_disc_skip
  label: CD DISC+ (D.SKIP)
  kind: action
  command: "CCDD.SKIP"
  params: []

# --- CT1: TAPE1(A) Operation Command (via ONKYO RI System) ---
- id: ct1_play_forward
  label: TAPE1 PLAY (forward)
  kind: action
  command: "CT1PLAY.F"
  params: []
- id: ct1_play_reverse
  label: TAPE1 PLAY (reverse)
  kind: action
  command: "CT1PLAY.R"
  params: []
- id: ct1_stop
  label: TAPE1 STOP
  kind: action
  command: "CT1STOP"
  params: []
- id: ct1_rec_pause
  label: TAPE1 REC/PAUSE
  kind: action
  command: "CT1RC/PAU"
  params: []
- id: ct1_ff
  label: TAPE1 FF (>>)
  kind: action
  command: "CT1FF"
  params: []
- id: ct1_rew
  label: TAPE1 REW (<<)
  kind: action
  command: "CT1REW"
  params: []

# --- CT2: TAPE2(B) Operation Command (via ONKYO RI System) ---
- id: ct2_play_forward
  label: TAPE2 PLAY (forward)
  kind: action
  command: "CT2PLAY.F"
  params: []
- id: ct2_play_reverse
  label: TAPE2 PLAY (reverse)
  kind: action
  command: "CT2PLAY.R"
  params: []
- id: ct2_stop
  label: TAPE2 STOP
  kind: action
  command: "CT2STOP"
  params: []
- id: ct2_rec_pause
  label: TAPE2 REC/PAUSE
  kind: action
  command: "CT2RC/PAU"
  params: []
- id: ct2_ff
  label: TAPE2 FF (>>)
  kind: action
  command: "CT2FF"
  params: []
- id: ct2_rew
  label: TAPE2 REW (<<)
  kind: action
  command: "CT2REW"
  params: []
- id: ct2_open_close
  label: TAPE2 OPEN/CLOSE
  kind: action
  command: "CT2OP/CL"
  params: []
- id: ct2_skip_f
  label: TAPE2 SKIP FORWARD (>>I)
  kind: action
  command: "CT2SKIP.F"
  params: []
- id: ct2_skip_r
  label: TAPE2 SKIP REVERSE (I<<)
  kind: action
  command: "CT2SKIP.R"
  params: []
```

## Feedbacks
```yaml
- id: command_status_response
  type: string
  description: "Receiver acknowledges a command by returning a status message echoing the ISCP command+parameter within 50msec (source §2.1: send 'SLI03', response 'SLI03')"
- id: question_status_response
  type: string
  description: "A question message (command + 'QSTN') returns the current status as an ISCP message (source §2.2: send 'SLIQSTN', response 'SLI03')"
# Power-status framing example given verbatim in source §1.1: device sends
# '!1SST00[EOF]' for Power Status = Standby.
```

## Variables
```yaml
# All settable parameters in the source (volume level, preset number, tuning
# frequency, PTY number, Zone2 input) are represented as parameterized actions
# above. No additional non-action variables documented.
# UNRESOLVED: no separate variable table in source.
```

## Events
```yaml
- id: event_notice
  type: string
  description: "Unsolicited notice: if the system status changes, the receiver notifies the controller by sending the new current status as an ISCP message (source §2.3 Event Notice Communication, example 'SLI03')"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Command support filtered per the TX-DS989 columns of the source support tables ("TX-DS989 DTR-9.1 RDC-7" and "TX-DS989 DTC-9.1 RDC-7 (Ver2.0)"). Commands marked "No" for both columns (sleep timer SLP, speaker A/B SPA/SPB, tone TFR/TSW family, triggers TGA/TGB/TGC, memory MEM, audio/video info IFA/IFV, audio selector SLA, XM/SIRIUS/HD Radio, Net-Tune NTC, Zone2 power/mute/volume/tone, MD/CD-R/DVD RI commands, dock CDS, Zone3/4) are intentionally excluded.
- Communication timing: receiver responds to a command within 50msec; if no response within 50msec the communication has failed (§2.1). Protocol is point-to-point with a single controller.
- Firmware version check procedure (source "Version Check"): turn on the unit, press DISPLAY + STANDBY/ON; the version number shows the firmware creation date (yymdd), where X/Y/Z in the month mean Oct/Nov/Dec.
- Source doc revision history runs 1.00 (22 Aug 2003, first edition including TX-DS989) to 1.15 (31 Aug 2009); the doc covers a large family of Onkyo/Integra receivers — DTR-9.1 and RDC-7 share the TX-DS989's column, so commands here apply to those siblings too.
- TX-DS989 Ver2.0 hardware drops the FILM (LMD03), ACTION (LMD05), MUSICAL (LMD06) listening modes relative to the original, per the support columns.
- The eISCP-over-Ethernet section of the doc (TCP, default destination port 60128, configurable 49152-65535, eISCP packet header with big-endian header-size 0x00000010 / data size / version 0x01) applies to network-capable models only; TX-DS989 is controlled via RS-232C.
- TUNER function is shared by the MAIN and ZONE side (source note under tuner commands).

<!-- UNRESOLVED: firmware version compatibility range not stated in source (only original vs Ver2.0 hardware distinction). -->
<!-- UNRESOLVED: SLZ support-matrix rows for input codes 03/04/10/20/21/22/23/24 truncated in source extraction; only 00/01/02/25 verifiable as supported for TX-DS989. Footnote *1 meaning for TX-DS989 SLZ not readable. -->
<!-- UNRESOLVED: exact response payload formats for each QSTN query not enumerated in source (only the SLI and SST examples). -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T15:42:29.293Z
last_checked_at: 2026-09-16T22:18:18.298Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-16T22:18:18.298Z
matched_actions: 138
action_count: 138
confidence: medium
summary: "All 138 spec actions match Yes-for-TX-DS989 source commands 1:1; transport parameters verbatim; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source contains no Zone2 power/volume/muting/tone commands for TX-DS989 (all \"No\" in that model's columns); sleep timer (SLP), speaker A/B (SPA/SPB), tone commands (TFR/TSW family), triggers (TGA/B/C), and Net-Tune/network commands are likewise \"No\" for this model. The doc also describes ISCP over Ethernet (eISCP, TCP port 60128 default) but that applies to network models; all network command rows are \"No\" for TX-DS989."
- "source extraction truncates the SLZ support matrix; rows for"
- "no separate variable table in source."
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility range not stated in source (only original vs Ver2.0 hardware distinction)."
- "SLZ support-matrix rows for input codes 03/04/10/20/21/22/23/24 truncated in source extraction; only 00/01/02/25 verifiable as supported for TX-DS989. Footnote *1 meaning for TX-DS989 SLZ not readable."
- "exact response payload formats for each QSTN query not enumerated in source (only the SLI and SST examples)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
