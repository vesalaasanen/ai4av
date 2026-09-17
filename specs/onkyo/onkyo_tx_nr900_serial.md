---
spec_id: admin/onkyo-tx-nr900
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-NR900 Control Spec"
manufacturer: Onkyo
model_family: TX-NR900
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-NR900
    - TX-NA900
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T13:24:46.723Z
last_checked_at: 2026-09-16T22:18:59.271Z
generated_at: 2026-09-16T22:18:59.271Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source support tables group TX-NR900/TX-NA900 with DTR-8.3/DTR-7.3/DTC-9.4/DTC-7 in one column; per-model differences within that group are not broken out"
  - "source table row truncated; codes 03-24 (VIDEO4, VIDEO5, DVD, TAPE, PHONO, CD, FM) and UP/DOWN/QSTN variants could not be verified'"
  - "SLZ wrap-around up/down and query rows are lost to truncation in the source extraction"
  - "none identified in source"
  - "no multi-step sequences described in source"
  - "source contains no safety warnings or interlock procedures"
  - "SLZ codes 03-24 and SLZ UP/DOWN/QSTN support - source table rows truncated during document extraction"
  - "firmware version compatibility not stated in source"
  - "exact response payload formats for QSTN queries beyond echo of command+state not exemplified in source"
verification:
  verdict: verified
  checked_at: 2026-09-16T22:18:59.271Z
  matched_actions: 233
  action_count: 233
  confidence: medium
  summary: "Every spec action's ISCP mnemonic appears in the TX-NR900 column as Yes, transport matches source verbatim, exclusions correctly omit source commands marked No. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Onkyo TX-NR900 Control Spec

## Summary
Onkyo TX-NR900 A/V receiver controlled via ISCP (Integra Serial Control Protocol) over RS-232C. ISCP commands are 3 command characters plus variable-length parameter characters. This spec covers main-zone, Zone2, tuner, Net-Tune, and RI-system (remote-controlled peripheral) commands listed as supported for the TX-NR900/TX-NA900 model column in the source protocol document (ISCP spec v1.15, 31 August 2009).

<!-- UNRESOLVED: source support tables group TX-NR900/TX-NA900 with DTR-8.3/DTR-7.3/DTC-9.4/DTC-7 in one column; per-model differences within that group are not broken out -->

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
  wiring: 3-wire RS-232C, 9-pin female D connector (pin 2 transmit, pin 3 receive, pin 5 signal ground), straight-thru cable
auth:
  type: none  # inferred: no auth procedure in source
```

**Framing (ISCP over RS-232C):**
- Controller → Device: `!` (start) + `1` (destination unit type, Receiver) + ISCP message + end character `[CR]` or `[LF]` or `[CR][LF]`. Example power-on: `!1PWR01[CR]`
- Device → Controller: `!` + `1` (source unit type) + ISCP message + `[EOF]` (0x1A). Example: `!1PWR00[EOF]`
- `[CR]` = 0x0D, `[LF]` = 0x0A, `[EOF]` = 0x1A

## Traits
```yaml
# inferred from command examples in source
- powerable    # PWR00/PWR01, ZPW00/ZPW01
- routable     # SLI/SLR/SLZ input and record-out selection
- queryable    # QSTN-suffix status queries on most commands
- levelable    # MVL/ZVL volume set, SLP sleep timer
```

## Actions
```yaml
# ISCP message = 3 command chars + parameter chars. Wire prefix "!1", terminator [CR]/[LF]/[CR][LF].
# TX-NR900 = column "TX-NR900/TX-NA900/DTR-8.3/DTR-7.3/DTC-9.4/DTC-7" in source support tables.

# --- System power (PWR) ---
- id: power_standby
  label: System Standby
  kind: action
  command: "PWR00"
  params: []
- id: power_on
  label: System On
  kind: action
  command: "PWR01"
  params: []
- id: power_status_query
  label: System Power Status Query
  kind: query
  command: "PWRQSTN"
  params: []

# --- Audio muting (AMT) ---
- id: mute_off
  label: Audio Muting Off
  kind: action
  command: "AMT00"
  params: []
- id: mute_on
  label: Audio Muting On
  kind: action
  command: "AMT01"
  params: []
- id: mute_toggle
  label: Audio Muting Wrap-Around
  kind: action
  command: "AMTTG"
  params: []
- id: mute_status_query
  label: Audio Muting State Query
  kind: query
  command: "AMTQSTN"
  params: []

# --- Master volume (MVL) ---
- id: volume_set
  label: Master Volume Set
  kind: action
  command: "MVL{level}"
  params:
    - name: level
      type: string
      description: Volume level 0-100 in hexadecimal representation ("00"-"64")
- id: volume_up
  label: Volume Level Up
  kind: action
  command: "MVLUP"
  params: []
- id: volume_down
  label: Volume Level Down
  kind: action
  command: "MVLDOWN"
  params: []
- id: volume_level_query
  label: Volume Level Query
  kind: query
  command: "MVLQSTN"
  params: []

# --- Sleep timer (SLP) ---
- id: sleep_set
  label: Sleep Time Set
  kind: action
  command: "SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: Sleep time 1-90 minutes in hexadecimal representation ("01"-"5A")
- id: sleep_off
  label: Sleep Time Off
  kind: action
  command: "SLPOFF"
  params: []
- id: sleep_up
  label: Sleep Time Wrap-Around Up
  kind: action
  command: "SLPUP"
  params: []
- id: sleep_query
  label: Sleep Time Query
  kind: query
  command: "SLPQSTN"
  params: []

# --- Speaker level calibration (SLC) ---
- id: speaker_cal_test
  label: Speaker Calibration TEST Key
  kind: action
  command: "SLCTEST"
  params: []
- id: speaker_cal_chsel
  label: Speaker Calibration CH SEL Key
  kind: action
  command: "SLCCHSEL"
  params: []
- id: speaker_cal_level_up
  label: Speaker Calibration LEVEL + Key
  kind: action
  command: "SLCUP"
  params: []
- id: speaker_cal_level_down
  label: Speaker Calibration LEVEL - Key
  kind: action
  command: "SLCDOWN"
  params: []

# --- Display mode (DIF) ---
- id: display_mode_selector_volume
  label: Set Selector + Volume Display Mode
  kind: action
  command: "DIF00"
  params: []
- id: display_mode_selector_listening
  label: Set Selector + Listening Mode Display Mode
  kind: action
  command: "DIF01"
  params: []
- id: display_mode_toggle
  label: Display Mode Wrap-Around Up
  kind: action
  command: "DIFTG"
  params: []
- id: display_mode_query
  label: Display Mode Query
  kind: query
  command: "DIFQSTN"
  params: []

# --- Dimmer (DIM) ---
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
- id: dimmer_toggle
  label: Dimmer Level Wrap-Around Up
  kind: action
  command: "DIMDIM"
  params: []
- id: dimmer_query
  label: Dimmer Level Query
  kind: query
  command: "DIMQSTN"
  params: []

# --- Setup / OSD operation (OSD) ---
- id: osd_menu
  label: Setup Menu Key
  kind: action
  command: "OSDMENU"
  params: []
- id: osd_up
  label: Setup Up Key
  kind: action
  command: "OSDUP"
  params: []
- id: osd_down
  label: Setup Down Key
  kind: action
  command: "OSDDOWN"
  params: []
- id: osd_right
  label: Setup Right Key
  kind: action
  command: "OSDRIGHT"
  params: []
- id: osd_left
  label: Setup Left Key
  kind: action
  command: "OSDLEFT"
  params: []
- id: osd_enter
  label: Setup Enter Key
  kind: action
  command: "OSDENTER"
  params: []
- id: osd_exit
  label: Setup Exit Key
  kind: action
  command: "OSDEXIT"
  params: []

# --- Input selector (SLI) ---
- id: select_input
  label: Select Input
  kind: action
  command: "SLI{code}"
  params:
    - name: code
      type: string
      description: 'Input code supported on this model: 00=VIDEO1(VCR/DVR), 01=VIDEO2(CBL/SAT), 02=VIDEO3(GAME/TV), 03=VIDEO4(AUX1/AUX), 04=VIDEO5(AUX2), 10=DVD, 20=TAPE(1)(TV/TAPE), 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO'
- id: input_next
  label: Selector Position Wrap-Around Up
  kind: action
  command: "SLIUP"
  params: []
- id: input_prev
  label: Selector Position Wrap-Around Down
  kind: action
  command: "SLIDOWN"
  params: []
- id: input_query
  label: Selector Position Query
  kind: query
  command: "SLIQSTN"
  params: []

# --- RECOUT selector (SLR) ---
- id: recout_select
  label: RECOUT Selector Set
  kind: action
  command: "SLR{code}"
  params:
    - name: code
      type: string
      description: 'Output code supported on this model: 00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4, 04=VIDEO5, 10=DVD, 20=TAPE(1), 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 7F=OFF, 80=SOURCE'
- id: recout_query
  label: RECOUT Selector Position Query
  kind: query
  command: "SLRQSTN"
  params: []

# --- Audio selector (SLA) ---
- id: audio_input_mode_set
  label: Audio Selector Set
  kind: action
  command: "SLA{mode}"
  params:
    - name: mode
      type: string
      description: '00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG'
- id: audio_input_mode_toggle
  label: Audio Selector Wrap-Around Up
  kind: action
  command: "SLAUP"
  params: []
- id: audio_input_mode_query
  label: Audio Selector Status Query
  kind: query
  command: "SLAQSTN"
  params: []

# --- Listening mode (LMD) ---
- id: listening_mode_set
  label: Listening Mode Set
  kind: action
  command: "LMD{mode}"
  params:
    - name: mode
      type: string
      description: '00=STEREO, 01=DIRECT, 02=SURROUND, 04=THX, 07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7/ENHANCE, 0F=MONO, 11=PURE AUDIO'
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

# --- Late night (LTN) ---
- id: late_night_off
  label: Late Night Off
  kind: action
  command: "LTN00"
  params: []
- id: late_night_low
  label: Late Night Low
  kind: action
  command: "LTN01"
  params: []
- id: late_night_high
  label: Late Night High
  kind: action
  command: "LTN02"
  params: []
- id: late_night_toggle
  label: Late Night State Wrap-Around Up
  kind: action
  command: "LTNUP"
  params: []
- id: late_night_query
  label: Late Night Level Query
  kind: query
  command: "LTNQSTN"
  params: []

# --- Re-EQ (RAS, Re-EQ variant for this model) ---
- id: reeq_off
  label: Re-EQ Off
  kind: action
  command: "RAS00"
  params: []
- id: reeq_on
  label: Re-EQ On
  kind: action
  command: "RAS01"
  params: []
- id: reeq_toggle
  label: Re-EQ State Wrap-Around Up
  kind: action
  command: "RASUP"
  params: []
- id: reeq_query
  label: Re-EQ State Query
  kind: query
  command: "RASQSTN"
  params: []

# --- Tuner (TUN, include tuner pack model only) ---
- id: tuning_direct
  label: Direct Tuning Frequency Set
  kind: action
  command: "TUN{frequency}"
  params:
    - name: frequency
      type: string
      description: 5-digit frequency (FM nnn.nn MHz / AM nnnnn kHz)
- id: tuning_up
  label: Tuning Frequency Wrap-Around Up
  kind: action
  command: "TUNUP"
  params: []
- id: tuning_down
  label: Tuning Frequency Wrap-Around Down
  kind: action
  command: "TUNDOWN"
  params: []
- id: tuning_query
  label: Tuning Frequency Query
  kind: query
  command: "TUNQSTN"
  params: []

# --- Presets (PRS) ---
- id: preset_set
  label: Preset Set
  kind: action
  command: "PRS{preset}"
  params:
    - name: preset
      type: string
      description: Preset number 1-40 in hexadecimal representation ("01"-"28")
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
  label: Preset No. Query
  kind: query
  command: "PRSQSTN"
  params: []

# --- RDS (RDS model only) ---
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
- id: rds_display_next
  label: RDS Information Wrap-Around Change
  kind: action
  command: "RDSUP"
  params: []

# --- PTY scan (PTS, RDS model only) ---
- id: pty_scan_set
  label: PTY Scan Set
  kind: action
  command: "PTS{pty}"
  params:
    - name: pty
      type: string
      description: PTY number 0-30 in hexadecimal representation ("00"-"1E")
- id: pty_scan_finish
  label: Finish PTY Scan
  kind: action
  command: "PTSENTER"
  params: []

# --- TP scan (TPS, RDS model only) ---
- id: tp_scan_start
  label: Start TP Scan
  kind: action
  command: "TPS"
  params: []
- id: tp_scan_finish
  label: Finish TP Scan
  kind: action
  command: "TPSENTER"
  params: []

# --- Net-Tune operation (NTC, Net-Tune model before TX-NR1000) ---
- id: net_play
  label: Net-Tune PLAY Key
  kind: action
  command: "NTCPLAY"
  params: []
- id: net_stop
  label: Net-Tune STOP Key
  kind: action
  command: "NTCSTOP"
  params: []
- id: net_pause
  label: Net-Tune PAUSE Key
  kind: action
  command: "NTCPAUSE"
  params: []
- id: net_track_up
  label: Net-Tune TRACK UP Key
  kind: action
  command: "NTCTRUP"
  params: []
- id: net_track_down
  label: Net-Tune TRACK DOWN Key
  kind: action
  command: "NTCTRDN"
  params: []
- id: net_ff
  label: Net-Tune FF Key (continuous)
  kind: action
  command: "NTCFF"
  params: []
  # source note: FF/REW Net-Tune commands must be sent continuously, no more than 100ms delay between codes
- id: net_rew
  label: Net-Tune REW Key (continuous)
  kind: action
  command: "NTCREW"
  params: []
- id: net_repeat
  label: Net-Tune REPEAT Key
  kind: action
  command: "NTCREPEAT"
  params: []
- id: net_random
  label: Net-Tune RANDOM Key
  kind: action
  command: "NTCRANDOM"
  params: []
- id: net_display
  label: Net-Tune DISPLAY Key
  kind: action
  command: "NTCDISPLAY"
  params: []
- id: net_album
  label: Net-Tune ALBUM Key
  kind: action
  command: "NTCALBUM"
  params: []
- id: net_artist
  label: Net-Tune ARTIST Key
  kind: action
  command: "NTCARTIST"
  params: []
- id: net_genre
  label: Net-Tune GENRE Key
  kind: action
  command: "NTCGENRE"
  params: []
- id: net_playlist
  label: Net-Tune PLAYLIST Key
  kind: action
  command: "NTCPLAYLIST"
  params: []
- id: net_cursor_right
  label: Net-Tune RIGHT Key
  kind: action
  command: "NTCRIGHT"
  params: []
- id: net_cursor_left
  label: Net-Tune LEFT Key
  kind: action
  command: "NTCLEFT"
  params: []
- id: net_cursor_up
  label: Net-Tune UP Key
  kind: action
  command: "NTCUP"
  params: []
- id: net_cursor_down
  label: Net-Tune DOWN Key
  kind: action
  command: "NTCDOWN"
  params: []
- id: net_select
  label: Net-Tune SELECT Key
  kind: action
  command: "NTCSELECT"
  params: []
- id: net_digit
  label: Net-Tune Numeric Key
  kind: action
  command: "NTC{digit}"
  params:
    - name: digit
      type: string
      description: Single digit 0-9
- id: net_delete
  label: Net-Tune DELETE Key
  kind: action
  command: "NTCDELETE"
  params: []
- id: net_caps
  label: Net-Tune CAPS Key
  kind: action
  command: "NTCCAPS"
  params: []

# --- Zone2 power (ZPW) ---
- id: zone2_power_standby
  label: Zone2 Standby
  kind: action
  command: "ZPW00"
  params: []
- id: zone2_power_on
  label: Zone2 On
  kind: action
  command: "ZPW01"
  params: []
- id: zone2_power_query
  label: Zone2 Power Status Query
  kind: query
  command: "ZPWQSTN"
  params: []

# --- Zone2 volume (ZVL) ---
# source footnote: only works when main is ON
- id: zone2_volume_set
  label: Zone2 Volume Set
  kind: action
  command: "ZVL{level}"
  params:
    - name: level
      type: string
      description: Volume level 0-100 in hexadecimal representation ("00"-"64")
- id: zone2_volume_up
  label: Zone2 Volume Level Up
  kind: action
  command: "ZVLUP"
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Level Down
  kind: action
  command: "ZVLDOWN"
  params: []
- id: zone2_volume_query
  label: Zone2 Volume Level Query
  kind: query
  command: "ZVLQSTN"
  params: []

# --- Zone2 selector (SLZ) ---
- id: zone2_select_source
  label: ZONE2 Selector Set
  kind: action
  command: "SLZ{code}"
  params:
    - name: code
      type: string
      description: 'Confirmed codes for this model: 00=VIDEO1(VCR/DVR), 01=VIDEO2(CBL/SAT), 02=VIDEO3(GAME/TV), 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO. # UNRESOLVED: source table row truncated; codes 03-24 (VIDEO4, VIDEO5, DVD, TAPE, PHONO, CD, FM) and UP/DOWN/QSTN variants could not be verified'
# UNRESOLVED: SLZ wrap-around up/down and query rows are lost to truncation in the source extraction

# --- Zone2 Net-Tune (NTC with z-suffix parameter, control separated from main) ---
- id: zone2_net_play
  label: Zone2 Net-Tune PLAY Key
  kind: action
  command: "NTCPLAYz"
  params: []
- id: zone2_net_stop
  label: Zone2 Net-Tune STOP Key
  kind: action
  command: "NTCSTOPz"
  params: []
- id: zone2_net_pause
  label: Zone2 Net-Tune PAUSE Key
  kind: action
  command: "NTCPAUSEz"
  params: []
- id: zone2_net_track_up
  label: Zone2 Net-Tune TRACK UP Key
  kind: action
  command: "NTCTRUPz"
  params: []
- id: zone2_net_track_down
  label: Zone2 Net-Tune TRACK DOWN Key
  kind: action
  command: "NTCTRDNz"
  params: []

# --- RI system: CD player operation (CCD) ---
- id: ccd_track_plus
  label: RI CD TRACK+ Key
  kind: action
  command: "CCDTRACK"
  params: []
- id: ccd_play
  label: RI CD PLAY
  kind: action
  command: "CCDPLAY"
  params: []
- id: ccd_stop
  label: RI CD STOP
  kind: action
  command: "CCDSTOP"
  params: []
- id: ccd_pause
  label: RI CD PAUSE
  kind: action
  command: "CCDPAUSE"
  params: []
- id: ccd_skip_forward
  label: RI CD Skip Forward
  kind: action
  command: "CCDSKIP.F"
  params: []
- id: ccd_skip_reverse
  label: RI CD Skip Reverse
  kind: action
  command: "CCDSKIP.R"
  params: []
- id: ccd_memory
  label: RI CD MEMORY
  kind: action
  command: "CCDMEMORY"
  params: []
- id: ccd_clear
  label: RI CD CLEAR
  kind: action
  command: "CCDCLEAR"
  params: []
- id: ccd_repeat
  label: RI CD REPEAT
  kind: action
  command: "CCDREPEAT"
  params: []
- id: ccd_random
  label: RI CD RANDOM
  kind: action
  command: "CCDRANDOM"
  params: []
- id: ccd_display
  label: RI CD DISPLAY
  kind: action
  command: "CCDDISP"
  params: []
- id: ccd_display_mode
  label: RI CD D.MODE
  kind: action
  command: "CCDD.MODE"
  params: []
- id: ccd_ff
  label: RI CD FF
  kind: action
  command: "CCDFF"
  params: []
- id: ccd_rew
  label: RI CD REW
  kind: action
  command: "CCDREW"
  params: []
- id: ccd_open_close
  label: RI CD OPEN/CLOSE
  kind: action
  command: "CCDOP/CL"
  params: []
- id: ccd_digit
  label: RI CD Numeric Key
  kind: action
  command: "CCD{digit}"
  params:
    - name: digit
      type: string
      description: Single digit 0-9
- id: ccd_track_10
  label: RI CD Track 10 Key
  kind: action
  command: "CCD10"
  params: []
- id: ccd_disc_forward
  label: RI CD DISC + Key
  kind: action
  command: "CCDDISC.F"
  params: []
- id: ccd_disc_reverse
  label: RI CD DISC - Key
  kind: action
  command: "CCDDISC.R"
  params: []
- id: ccd_disc_select
  label: RI CD Select Disc
  kind: action
  command: "CCD{disc}"
  params:
    - name: disc
      type: string
      description: Disc number DISC1-DISC6
- id: ccd_standby
  label: RI CD STANDBY
  kind: action
  command: "CCDSTBY"
  params: []
- id: ccd_power_on
  label: RI CD POWER ON
  kind: action
  command: "CCDPON"
  params: []

# --- RI system: TAPE1(A) operation (CT1) ---
- id: ct1_play_forward
  label: RI TAPE1 PLAY Forward
  kind: action
  command: "CT1PLAY.F"
  params: []
- id: ct1_play_reverse
  label: RI TAPE1 PLAY Reverse
  kind: action
  command: "CT1PLAY.R"
  params: []
- id: ct1_stop
  label: RI TAPE1 STOP
  kind: action
  command: "CT1STOP"
  params: []
- id: ct1_rec_pause
  label: RI TAPE1 REC/PAUSE
  kind: action
  command: "CT1RC/PAU"
  params: []
- id: ct1_ff
  label: RI TAPE1 FF
  kind: action
  command: "CT1FF"
  params: []
- id: ct1_rew
  label: RI TAPE1 REW
  kind: action
  command: "CT1REW"
  params: []

# --- RI system: TAPE2(B) operation (CT2) ---
- id: ct2_play_forward
  label: RI TAPE2 PLAY Forward
  kind: action
  command: "CT2PLAY.F"
  params: []
- id: ct2_play_reverse
  label: RI TAPE2 PLAY Reverse
  kind: action
  command: "CT2PLAY.R"
  params: []
- id: ct2_stop
  label: RI TAPE2 STOP
  kind: action
  command: "CT2STOP"
  params: []
- id: ct2_rec_pause
  label: RI TAPE2 REC/PAUSE
  kind: action
  command: "CT2RC/PAU"
  params: []
- id: ct2_ff
  label: RI TAPE2 FF
  kind: action
  command: "CT2FF"
  params: []
- id: ct2_rew
  label: RI TAPE2 REW
  kind: action
  command: "CT2REW"
  params: []
- id: ct2_open_close
  label: RI TAPE2 OPEN/CLOSE
  kind: action
  command: "CT2OP/CL"
  params: []
- id: ct2_skip_forward
  label: RI TAPE2 Skip Forward
  kind: action
  command: "CT2SKIP.F"
  params: []
- id: ct2_skip_reverse
  label: RI TAPE2 Skip Reverse
  kind: action
  command: "CT2SKIP.R"
  params: []
- id: ct2_rec
  label: RI TAPE2 REC
  kind: action
  command: "CT2REC"
  params: []

# --- RI system: graphics equalizer (CEQ) ---
- id: ceq_preset
  label: RI Graphics Equalizer PRESET
  kind: action
  command: "CEQPRESET"
  params: []

# --- RI system: DAT recorder (CDT) ---
- id: cdt_play
  label: RI DAT PLAY
  kind: action
  command: "CDTPLAY"
  params: []
- id: cdt_rec_pause
  label: RI DAT REC/PAUSE
  kind: action
  command: "CDTRC/PAU"
  params: []
- id: cdt_stop
  label: RI DAT STOP
  kind: action
  command: "CDTSTOP"
  params: []
- id: cdt_skip_forward
  label: RI DAT Skip Forward
  kind: action
  command: "CDTSKIP.F"
  params: []
- id: cdt_skip_reverse
  label: RI DAT Skip Reverse
  kind: action
  command: "CDTSKIP.R"
  params: []
- id: cdt_ff
  label: RI DAT FF
  kind: action
  command: "CDTFF"
  params: []
- id: cdt_rew
  label: RI DAT REW
  kind: action
  command: "CDTREW"
  params: []

# --- RI system: DVD player (CDV) ---
- id: cdv_power_on
  label: RI DVD POWER ON
  kind: action
  command: "CDVPWRON"
  params: []
- id: cdv_power_off
  label: RI DVD POWER OFF
  kind: action
  command: "CDVPWROFF"
  params: []
- id: cdv_play
  label: RI DVD PLAY
  kind: action
  command: "CDVPLAY"
  params: []
- id: cdv_stop
  label: RI DVD STOP
  kind: action
  command: "CDVSTOP"
  params: []
- id: cdv_skip_forward
  label: RI DVD Skip Forward
  kind: action
  command: "CDVSKIP.F"
  params: []
- id: cdv_skip_reverse
  label: RI DVD Skip Reverse
  kind: action
  command: "CDVSKIP.R"
  params: []
- id: cdv_ff
  label: RI DVD FF
  kind: action
  command: "CDVFF"
  params: []
- id: cdv_rew
  label: RI DVD REW
  kind: action
  command: "CDVREW"
  params: []
- id: cdv_pause
  label: RI DVD PAUSE
  kind: action
  command: "CDVPAUSE"
  params: []
- id: cdv_last_play
  label: RI DVD LAST PLAY
  kind: action
  command: "CDVLASTPLAY"
  params: []
- id: cdv_subtitle_toggle
  label: RI DVD SUBTITLE ON/OFF
  kind: action
  command: "CDVSUBTON/OFF"
  params: []
- id: cdv_subtitle
  label: RI DVD SUBTITLE
  kind: action
  command: "CDVSUBTITLE"
  params: []
- id: cdv_setup
  label: RI DVD SETUP
  kind: action
  command: "CDVSETUP"
  params: []
- id: cdv_topmenu
  label: RI DVD TOPMENU
  kind: action
  command: "CDVTOPMENU"
  params: []
- id: cdv_menu
  label: RI DVD MENU
  kind: action
  command: "CDVMENU"
  params: []
- id: cdv_up
  label: RI DVD UP
  kind: action
  command: "CDVUP"
  params: []
- id: cdv_down
  label: RI DVD DOWN
  kind: action
  command: "CDVDOWN"
  params: []
- id: cdv_left
  label: RI DVD LEFT
  kind: action
  command: "CDVLEFT"
  params: []
- id: cdv_right
  label: RI DVD RIGHT
  kind: action
  command: "CDVRIGHT"
  params: []
- id: cdv_enter
  label: RI DVD ENTER
  kind: action
  command: "CDVENTER"
  params: []
- id: cdv_return
  label: RI DVD RETURN
  kind: action
  command: "CDVRETURN"
  params: []
- id: cdv_disc_forward
  label: RI DVD DISC + Key
  kind: action
  command: "CDVDISC.F"
  params: []
- id: cdv_disc_reverse
  label: RI DVD DISC - Key
  kind: action
  command: "CDVDISC.R"
  params: []
- id: cdv_audio
  label: RI DVD AUDIO
  kind: action
  command: "CDVAUDIO"
  params: []
- id: cdv_random
  label: RI DVD RANDOM
  kind: action
  command: "CDVRANDOM"
  params: []
- id: cdv_open_close
  label: RI DVD OPEN/CLOSE
  kind: action
  command: "CDVOP/CL"
  params: []
- id: cdv_angle
  label: RI DVD ANGLE
  kind: action
  command: "CDVANGLE"
  params: []
- id: cdv_digit
  label: RI DVD Numeric Key
  kind: action
  command: "CDV{digit}"
  params:
    - name: digit
      type: string
      description: Single digit 0-9
- id: cdv_track_10
  label: RI DVD 10 Key
  kind: action
  command: "CDV10"
  params: []
- id: cdv_search
  label: RI DVD SEARCH
  kind: action
  command: "CDVSEARCH"
  params: []
- id: cdv_display
  label: RI DVD DISPLAY
  kind: action
  command: "CDVDISP"
  params: []
- id: cdv_repeat
  label: RI DVD REPEAT
  kind: action
  command: "CDVREPEAT"
  params: []
- id: cdv_memory
  label: RI DVD MEMORY
  kind: action
  command: "CDVMEMORY"
  params: []
- id: cdv_clear
  label: RI DVD CLEAR
  kind: action
  command: "CDVCLEAR"
  params: []
- id: cdv_ab_repeat
  label: RI DVD A-B REPEAT
  kind: action
  command: "CDVABR"
  params: []
- id: cdv_step_forward
  label: RI DVD STEP
  kind: action
  command: "CDVSTEP.F"
  params: []
- id: cdv_step_reverse
  label: RI DVD STEP BACK
  kind: action
  command: "CDVSTEP.R"
  params: []
- id: cdv_slow_forward
  label: RI DVD SLOW
  kind: action
  command: "CDVSLOW.F"
  params: []
- id: cdv_slow_reverse
  label: RI DVD SLOW BACK
  kind: action
  command: "CDVSLOW.R"
  params: []

# --- RI system: MD recorder (CMD) ---
- id: cmd_play
  label: RI MD PLAY
  kind: action
  command: "CMDPLAY"
  params: []
- id: cmd_stop
  label: RI MD STOP
  kind: action
  command: "CMDSTOP"
  params: []
- id: cmd_ff
  label: RI MD FF
  kind: action
  command: "CMDFF"
  params: []
- id: cmd_rew
  label: RI MD REW
  kind: action
  command: "CMDREW"
  params: []
- id: cmd_play_mode
  label: RI MD PLAY MODE
  kind: action
  command: "CMDP.MODE"
  params: []
- id: cmd_skip_forward
  label: RI MD Skip Forward
  kind: action
  command: "CMDSKIP.F"
  params: []
- id: cmd_skip_reverse
  label: RI MD Skip Reverse
  kind: action
  command: "CMDSKIP.R"
  params: []
- id: cmd_pause
  label: RI MD PAUSE
  kind: action
  command: "CMDPAUSE"
  params: []
- id: cmd_rec
  label: RI MD REC
  kind: action
  command: "CMDREC"
  params: []
- id: cmd_memory
  label: RI MD MEMORY
  kind: action
  command: "CMDMEMORY"
  params: []
- id: cmd_display
  label: RI MD DISPLAY
  kind: action
  command: "CMDDISP"
  params: []
- id: cmd_scroll
  label: RI MD SCROLL
  kind: action
  command: "CMDSCROLL"
  params: []
- id: cmd_music_scan
  label: RI MD MUSIC SCAN
  kind: action
  command: "CMDM.SCAN"
  params: []
- id: cmd_clear
  label: RI MD CLEAR
  kind: action
  command: "CMDCLEAR"
  params: []
- id: cmd_random
  label: RI MD RANDOM
  kind: action
  command: "CMDRANDOM"
  params: []
- id: cmd_repeat
  label: RI MD REPEAT
  kind: action
  command: "CMDREPEAT"
  params: []
- id: cmd_enter
  label: RI MD ENTER
  kind: action
  command: "CMDENTER"
  params: []
- id: cmd_eject
  label: RI MD EJECT
  kind: action
  command: "CMDEJECT"
  params: []
- id: cmd_digit
  label: RI MD Numeric Key
  kind: action
  command: "CMD{key}"
  params:
    - name: key
      type: string
      description: '"1"-"9" or "10/0"'
- id: cmd_direct_track
  label: RI MD Direct Track Entry
  kind: action
  command: "CMDnn/nnn"
  params:
    - name: track
      type: string
      description: 2- or 3-digit track number as shown in source ("--/---" entry)
- id: cmd_name
  label: RI MD NAME
  kind: action
  command: "CMDNAME"
  params: []
- id: cmd_group
  label: RI MD GROUP
  kind: action
  command: "CMDGROUP"
  params: []

# --- RI system: CD-R recorder (CCR) ---
- id: ccr_play_mode
  label: RI CD-R PLAY MODE
  kind: action
  command: "CCRP.MODE"
  params: []
- id: ccr_play
  label: RI CD-R PLAY
  kind: action
  command: "CCRPLAY"
  params: []
- id: ccr_stop
  label: RI CD-R STOP
  kind: action
  command: "CCRSTOP"
  params: []
- id: ccr_skip_forward
  label: RI CD-R Skip Forward
  kind: action
  command: "CCRSKIP.F"
  params: []
- id: ccr_skip_reverse
  label: RI CD-R Skip Reverse
  kind: action
  command: "CCRSKIP.R"
  params: []
- id: ccr_pause
  label: RI CD-R PAUSE
  kind: action
  command: "CCRPAUSE"
  params: []
- id: ccr_rec
  label: RI CD-R REC
  kind: action
  command: "CCRREC"
  params: []
- id: ccr_clear
  label: RI CD-R CLEAR
  kind: action
  command: "CCRCLEAR"
  params: []
- id: ccr_repeat
  label: RI CD-R REPEAT
  kind: action
  command: "CCRREPEAT"
  params: []
- id: ccr_digit
  label: RI CD-R Numeric Key
  kind: action
  command: "CCR{key}"
  params:
    - name: key
      type: string
      description: '"1"-"9" or "10/0"'
- id: ccr_direct_track
  label: RI CD-R Direct Track Entry
  kind: action
  command: "CCRnn/nnn"
  params:
    - name: track
      type: string
      description: 2- or 3-digit track number as shown in source ("--/---" entry)
- id: ccr_scroll
  label: RI CD-R SCROLL
  kind: action
  command: "CCRSCROLL"
  params: []
- id: ccr_open_close
  label: RI CD-R OPEN/CLOSE
  kind: action
  command: "CCROP/CL"
  params: []
- id: ccr_display
  label: RI CD-R DISPLAY
  kind: action
  command: "CCRDISP"
  params: []
- id: ccr_random
  label: RI CD-R RANDOM
  kind: action
  command: "CCRRANDOM"
  params: []
- id: ccr_memory
  label: RI CD-R MEMORY
  kind: action
  command: "CCRMEMORY"
  params: []
- id: ccr_ff
  label: RI CD-R FF
  kind: action
  command: "CCRFF"
  params: []
- id: ccr_rew
  label: RI CD-R REW
  kind: action
  command: "CCRREW"
  params: []

# Source-unsupported for this model column (excluded): SPA/SPB, SPL, TFR/TFW/TFH/TCT/TSR/TSB/TSW,
# SWL, CTL, DIF info commands, MEM, IFA/IFV, SLI 05/06/21/29/2A/30/31/32/40, SLA 03/04/05/06,
# TGA/TGB/TGC, VOS, HDO, RES, ISF, LMD 03/05/06/12/13/14/15/16/40-99/A0-A7, ADY, ADQ, ADV, DVL, MOT,
# PRM, XM/SIRIUS/HD Radio commands, NAT/NAL/NTI/NTM/NTR/NST/NPR, ZMT, ZTN, ZBL, CDS dock,
# NTC LOCATION/LANGUAGE/SETUP/RETURN/CHUP/CHDN
```

## Feedbacks
```yaml
# Receiver answers every command with a status message echoing the resulting state
# (e.g. send "SLI03" -> status "SLI03"), within 50msec of the command.
- id: power_state
  type: enum
  values: [on, standby]
  via: "PWR01 / PWR00 response or PWRQSTN"
- id: mute_state
  type: enum
  values: [on, off]
  via: "AMT response or AMTQSTN"
- id: master_volume
  type: string
  via: "MVL response (hex 00-64) or MVLQSTN"
- id: input_source
  type: string
  via: "SLI response or SLIQSTN"
- id: listening_mode
  type: string
  via: "LMD response or LMDQSTN"
- id: sleep_timer
  type: string
  via: "SLP response or SLPQSTN"
- id: dimmer_level
  type: enum
  values: [bright, dim, dark]
  via: "DIM response or DIMQSTN"
- id: tuning_frequency
  type: string
  via: "TUN response or TUNQSTN"
- id: preset_number
  type: string
  via: "PRS response or PRSQSTN"
- id: zone2_power_state
  type: enum
  values: [on, standby]
  via: "ZPW response or ZPWQSTN"
- id: zone2_volume
  type: string
  via: "ZVL response (hex 00-64) or ZVLQSTN"
```

## Variables
```yaml
# No settable parameters beyond the discrete actions above.
# UNRESOLVED: none identified in source
```

## Events
```yaml
# Event Notice Communication (source section 2.3): if the system status changes,
# the Receiver notifies the Controller by sending the new current status as an
# unsolicited ISCP status message (e.g. "SLI03"), framed "!1<msg>[EOF]".
- id: status_notification
  description: Unsolicited status message sent on any system status change
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures
```

## Notes
- Source is the "Integra Serial Communication Protocol for AV Receiver" spec v1.15 (31 Aug 2009), ONKYO CORPORATION. TX-NR900 support is read from the model-group column "TX-NR900/TX-NA900/DTR-8.3/DTR-7.3/DTC-9.4/DTC-7"; commands marked Yes for that column are included. Per-model differences inside that group are not distinguishable in the source.
- Communication is point-to-point with one controller. Receiver responds to a command within 50msec; no response within 50msec means the communication failed.
- Net-Tune FF/REW (NTCFF/NTCREW) must be sent continuously with no more than 100ms between codes.
- RAS on this model is the Re-EQ variant only; the Academy Filter and Cinema Filter RAS variants belong to other model columns.
- The TUNER function is shared between MAIN and ZONE2 (SLZ/TUN), but Net-Tune control is separated: main zone uses NTC "PLAY" etc., Zone2 uses the z-suffixed parameters ("PLAYz" etc.).
- Zone2 volume commands only work when the main zone is ON (source footnote).
- Firmware version check (from source): turn unit on, press DISPLAY + STANDBY/ON; version shows as firmware creation date (yymdd; X/Y/Z in month = Oct/Nov/Dec).
- The source also documents eISCP (ISCP over Ethernet, TCP destination port 60128 default, configurable 49152-65535), but that section targets network models (after TX-NR905). TX-NR900 is a Net-Tune-era model and its column support for eISCP is not stated; this spec covers RS-232C only.
<!-- UNRESOLVED: SLZ codes 03-24 and SLZ UP/DOWN/QSTN support - source table rows truncated during document extraction -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact response payload formats for QSTN queries beyond echo of command+state not exemplified in source -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T13:24:46.723Z
last_checked_at: 2026-09-16T22:18:59.271Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-16T22:18:59.271Z
matched_actions: 233
action_count: 233
confidence: medium
summary: "Every spec action's ISCP mnemonic appears in the TX-NR900 column as Yes, transport matches source verbatim, exclusions correctly omit source commands marked No. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source support tables group TX-NR900/TX-NA900 with DTR-8.3/DTR-7.3/DTC-9.4/DTC-7 in one column; per-model differences within that group are not broken out"
- "source table row truncated; codes 03-24 (VIDEO4, VIDEO5, DVD, TAPE, PHONO, CD, FM) and UP/DOWN/QSTN variants could not be verified'"
- "SLZ wrap-around up/down and query rows are lost to truncation in the source extraction"
- "none identified in source"
- "no multi-step sequences described in source"
- "source contains no safety warnings or interlock procedures"
- "SLZ codes 03-24 and SLZ UP/DOWN/QSTN support - source table rows truncated during document extraction"
- "firmware version compatibility not stated in source"
- "exact response payload formats for QSTN queries beyond echo of command+state not exemplified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
