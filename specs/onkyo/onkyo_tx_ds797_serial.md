---
spec_id: admin/onkyo-tx-ds797
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-DS797 Control Spec"
manufacturer: Onkyo
model_family: TX-DS797
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-DS797
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T20:27:01.228Z
last_checked_at: 2026-09-16T22:18:13.886Z
generated_at: 2026-09-16T22:18:13.886Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. eISCP/Ethernet section of the source applies to network models only; TX-DS797 support for Ethernet not stated. Zone2 (ZPW/ZMT/ZVL/SLZ etc.), 12V triggers (TGA/TGB/TGC), XM/SIRIUS/HD Radio/Net-USB commands, and Zone3/Zone4 commands are marked \"No\" (or not listed) for TX-DS797 in the source support matrices."
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures found in source"
  - "firmware version compatibility not stated in source. Exact response payload formats for each QSTN (other than examples SLI03 / SST00) not individually documented. MVL/SLP/PRS parameters are hex-encoded strings, not plain decimal — the source does not further specify encoding of TUN frequency digits beyond \"nnnnn\"."
verification:
  verdict: verified
  checked_at: 2026-09-16T22:18:13.886Z
  matched_actions: 261
  action_count: 261
  confidence: medium
  summary: "All 261 spec wire-literal commands map to TX-DS797-Yes source rows; transport params match; bidirectional coverage is full. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Onkyo TX-DS797 Control Spec

## Summary
7.1-channel A/V receiver controlled via ISCP (Integra Serial Control Protocol) over RS-232C. Covers main-zone power, volume, muting, input/record-out selection, listening modes, tuner/RDS, dimmer, OSD menu navigation, sleep timer, speaker level calibration, and ONKYO RI System pass-through commands for connected CD/tape/DAT/DVD/MD/CD-R/GEQ devices. Source is the Onkyo "Integra Serial Communication Protocol for AV Receiver" version 1.15 (31 Aug 2009); command support filtered to the TX-DS797/DTR-7.2 column of the support matrices.

<!-- UNRESOLVED: firmware version compatibility not stated in source. eISCP/Ethernet section of the source applies to network models only; TX-DS797 support for Ethernet not stated. Zone2 (ZPW/ZMT/ZVL/SLZ etc.), 12V triggers (TGA/TGB/TGC), XM/SIRIUS/HD Radio/Net-USB commands, and Zone3/Zone4 commands are marked "No" (or not listed) for TX-DS797 in the source support matrices. -->

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
```

## Traits
```yaml
# powerable, queryable, routable, levelable inferred from command examples in source
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
# ISCP framing: controller->device message = "!" + unit char "1" + ISCP message + end char
# ([CR] or [LF] or [CR][LF]). Device->controller ends with [EOF] (0x1A).
# Command fields below are the full wire payload minus the end character.
# Source support matrices: only rows marked "Yes" in the TX-DS797/DTR-7.2 column are included.

# --- PWR: System Power ---
- id: power_standby
  label: System Standby
  kind: action
  command: "!1PWR00"
  params: []
- id: power_on
  label: System On
  kind: action
  command: "!1PWR01"
  params: []
- id: power_status_query
  label: System Power Status Query
  kind: query
  command: "!1PWRQSTN"
  params: []

# --- AMT: Audio Muting ---
- id: mute_off
  label: Audio Muting Off
  kind: action
  command: "!1AMT00"
  params: []
- id: mute_on
  label: Audio Muting On
  kind: action
  command: "!1AMT01"
  params: []
- id: mute_status_query
  label: Audio Muting State Query
  kind: query
  command: "!1AMTQSTN"
  params: []

# --- MVL: Master Volume (0-100 in hex, "00"-"64") ---
- id: master_volume_set
  label: Set Master Volume
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: string
      description: Volume level 0-100 as two hex digits ("00"-"64")
- id: master_volume_up
  label: Master Volume Up
  kind: action
  command: "!1MVLUP"
  params: []
- id: master_volume_down
  label: Master Volume Down
  kind: action
  command: "!1MVLDOWN"
  params: []
- id: master_volume_query
  label: Master Volume Query
  kind: query
  command: "!1MVLQSTN"
  params: []

# --- SLP: Sleep Set (1-90 min in hex, "01"-"5A") ---
- id: sleep_set
  label: Set Sleep Time
  kind: action
  command: "!1SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: Sleep time 1-90 minutes as two hex digits ("01"-"5A")
- id: sleep_off
  label: Sleep Time Off
  kind: action
  command: "!1SLPOFF"
  params: []
- id: sleep_up
  label: Sleep Time Wrap-Around Up
  kind: action
  command: "!1SLPUP"
  params: []
- id: sleep_query
  label: Sleep Time Query
  kind: query
  command: "!1SLPQSTN"
  params: []

# --- SLC: Speaker Level Calibration ---
- id: slc_test
  label: Speaker Level Calibration TEST Key
  kind: action
  command: "!1SLCTEST"
  params: []
- id: slc_chsel
  label: Speaker Level Calibration CH SEL Key
  kind: action
  command: "!1SLCCHSEL"
  params: []
- id: slc_level_up
  label: Speaker Level Calibration LEVEL + Key
  kind: action
  command: "!1SLCUP"
  params: []
- id: slc_level_down
  label: Speaker Level Calibration LEVEL - Key
  kind: action
  command: "!1SLCDOWN"
  params: []

# --- DIF: Display Mode ---
- id: display_mode_selector_volume
  label: Set Selector + Volume Display Mode
  kind: action
  command: "!1DIF00"
  params: []
- id: display_mode_selector_listening
  label: Set Selector + Listening Mode Display Mode
  kind: action
  command: "!1DIF01"
  params: []
- id: display_mode_wrap_up
  label: Display Mode Wrap-Around Up
  kind: action
  command: "!1DIFUP"
  params: []
- id: display_mode_query
  label: Display Mode Query
  kind: query
  command: "!1DIFQSTN"
  params: []

# --- DIM: Dimmer Level ---
- id: dimmer_bright
  label: Set Dimmer Bright
  kind: action
  command: "!1DIM00"
  params: []
- id: dimmer_dim
  label: Set Dimmer Dim
  kind: action
  command: "!1DIM01"
  params: []
- id: dimmer_dark
  label: Set Dimmer Dark
  kind: action
  command: "!1DIM02"
  params: []
- id: dimmer_wrap_up
  label: Set Dimmer Level Wrap-Around Up
  kind: action
  command: "!1DIMDIM"
  params: []
- id: dimmer_query
  label: Dimmer Level Query
  kind: query
  command: "!1DIMQSTN"
  params: []

# --- OSD: Setup Operation ---
- id: osd_menu
  label: OSD Menu Key
  kind: action
  command: "!1OSDMENU"
  params: []
- id: osd_up
  label: OSD Up Key
  kind: action
  command: "!1OSDUP"
  params: []
- id: osd_down
  label: OSD Down Key
  kind: action
  command: "!1OSDDOWN"
  params: []
- id: osd_right
  label: OSD Right Key
  kind: action
  command: "!1OSDRIGHT"
  params: []
- id: osd_left
  label: OSD Left Key
  kind: action
  command: "!1OSDLEFT"
  params: []
- id: osd_enter
  label: OSD Enter Key
  kind: action
  command: "!1OSDENTER"
  params: []
- id: osd_exit
  label: OSD Exit Key
  kind: action
  command: "!1OSDEXIT"
  params: []

# --- SLI: Input Selector ---
- id: select_input_video1
  label: Select Input VIDEO1 (VCR/DVR)
  kind: action
  command: "!1SLI00"
  params: []
- id: select_input_video2
  label: Select Input VIDEO2 (CBL/SAT)
  kind: action
  command: "!1SLI01"
  params: []
- id: select_input_video3
  label: Select Input VIDEO3 (GAME/TV/GAME)
  kind: action
  command: "!1SLI02"
  params: []
- id: select_input_video4
  label: Select Input VIDEO4 (AUX1/AUX)
  kind: action
  command: "!1SLI03"
  params: []
- id: select_input_video5
  label: Select Input VIDEO5 (AUX2)
  kind: action
  command: "!1SLI04"
  params: []
- id: select_input_dvd
  label: Select Input DVD
  kind: action
  command: "!1SLI10"
  params: []
- id: select_input_tape1
  label: Select Input TAPE(1) (TV/TAPE)
  kind: action
  command: "!1SLI20"
  params: []
- id: select_input_phono
  label: Select Input PHONO
  kind: action
  command: "!1SLI22"
  params: []
- id: select_input_cd
  label: Select Input CD
  kind: action
  command: "!1SLI23"
  params: []
- id: select_input_fm
  label: Select Input FM
  kind: action
  command: "!1SLI24"
  params: []
- id: select_input_am
  label: Select Input AM
  kind: action
  command: "!1SLI25"
  params: []
- id: input_selector_up
  label: Input Selector Wrap-Around Up
  kind: action
  command: "!1SLIUP"
  params: []
- id: input_selector_down
  label: Input Selector Wrap-Around Down
  kind: action
  command: "!1SLIDOWN"
  params: []
- id: input_selector_query
  label: Input Selector Position Query
  kind: query
  command: "!1SLIQSTN"
  params: []

# --- SLR: RECOUT Selector ---
- id: recout_video1
  label: Set RECOUT VIDEO1
  kind: action
  command: "!1SLR00"
  params: []
- id: recout_video2
  label: Set RECOUT VIDEO2
  kind: action
  command: "!1SLR01"
  params: []
- id: recout_video3
  label: Set RECOUT VIDEO3
  kind: action
  command: "!1SLR02"
  params: []
- id: recout_video4
  label: Set RECOUT VIDEO4
  kind: action
  command: "!1SLR03"
  params: []
- id: recout_video5
  label: Set RECOUT VIDEO5
  kind: action
  command: "!1SLR04"
  params: []
- id: recout_dvd
  label: Set RECOUT DVD
  kind: action
  command: "!1SLR10"
  params: []
- id: recout_tape1
  label: Set RECOUT TAPE(1)
  kind: action
  command: "!1SLR20"
  params: []
- id: recout_phono
  label: Set RECOUT PHONO
  kind: action
  command: "!1SLR22"
  params: []
- id: recout_cd
  label: Set RECOUT CD
  kind: action
  command: "!1SLR23"
  params: []
- id: recout_fm
  label: Set RECOUT FM
  kind: action
  command: "!1SLR24"
  params: []
- id: recout_am
  label: Set RECOUT AM
  kind: action
  command: "!1SLR25"
  params: []
- id: recout_off
  label: Set RECOUT OFF
  kind: action
  command: "!1SLR7F"
  params: []
- id: recout_source
  label: Set RECOUT SOURCE
  kind: action
  command: "!1SLR80"
  params: []
- id: recout_query
  label: RECOUT Selector Position Query
  kind: query
  command: "!1SLRQSTN"
  params: []

# --- SLA: Audio Selector ---
- id: audio_selector_auto
  label: Set Audio Selector AUTO
  kind: action
  command: "!1SLA00"
  params: []
- id: audio_selector_multichannel
  label: Set Audio Selector MULTI-CHANNEL
  kind: action
  command: "!1SLA01"
  params: []
- id: audio_selector_analog
  label: Set Audio Selector ANALOG
  kind: action
  command: "!1SLA02"
  params: []
- id: audio_selector_up
  label: Audio Selector Wrap-Around Up
  kind: action
  command: "!1SLAUP"
  params: []
- id: audio_selector_query
  label: Audio Selector Status Query
  kind: query
  command: "!1SLAQSTN"
  params: []

# --- LMD: Listening Mode ---
- id: listening_mode_stereo
  label: Set Listening Mode STEREO
  kind: action
  command: "!1LMD00"
  params: []
- id: listening_mode_direct
  label: Set Listening Mode DIRECT
  kind: action
  command: "!1LMD01"
  params: []
- id: listening_mode_surround
  label: Set Listening Mode SURROUND
  kind: action
  command: "!1LMD02"
  params: []
- id: listening_mode_thx
  label: Set Listening Mode THX
  kind: action
  command: "!1LMD04"
  params: []
- id: listening_mode_mono_movie
  label: Set Listening Mode MONO MOVIE
  kind: action
  command: "!1LMD07"
  params: []
- id: listening_mode_orchestra
  label: Set Listening Mode ORCHESTRA
  kind: action
  command: "!1LMD08"
  params: []
- id: listening_mode_unplugged
  label: Set Listening Mode UNPLUGGED
  kind: action
  command: "!1LMD09"
  params: []
- id: listening_mode_studio_mix
  label: Set Listening Mode STUDIO-MIX
  kind: action
  command: "!1LMD0A"
  params: []
- id: listening_mode_tv_logic
  label: Set Listening Mode TV LOGIC
  kind: action
  command: "!1LMD0B"
  params: []
- id: listening_mode_all_ch_stereo
  label: Set Listening Mode ALL CH STEREO
  kind: action
  command: "!1LMD0C"
  params: []
- id: listening_mode_theater_dimensional
  label: Set Listening Mode THEATER-DIMENSIONAL
  kind: action
  command: "!1LMD0D"
  params: []
- id: listening_mode_enhanced_7
  label: Set Listening Mode ENHANCED 7/ENHANCE
  kind: action
  command: "!1LMD0E"
  params: []
- id: listening_mode_mono
  label: Set Listening Mode MONO
  kind: action
  command: "!1LMD0F"
  params: []
- id: listening_mode_up
  label: Listening Mode Wrap-Around Up
  kind: action
  command: "!1LMDUP"
  params: []
- id: listening_mode_down
  label: Listening Mode Wrap-Around Down
  kind: action
  command: "!1LMDDOWN"
  params: []
- id: listening_mode_query
  label: Listening Mode Query
  kind: query
  command: "!1LMDQSTN"
  params: []

# --- LTN: Late Night ---
- id: late_night_off
  label: Set Late Night Off
  kind: action
  command: "!1LTN00"
  params: []
- id: late_night_low
  label: Set Late Night Low (Dolby Digital)
  kind: action
  command: "!1LTN01"
  params: []
- id: late_night_high
  label: Set Late Night High (Dolby Digital)
  kind: action
  command: "!1LTN02"
  params: []
- id: late_night_up
  label: Late Night State Wrap-Around Up
  kind: action
  command: "!1LTNUP"
  params: []
- id: late_night_query
  label: Late Night Level Query
  kind: query
  command: "!1LTNQSTN"
  params: []

# --- RAS: Re-EQ Command (TX-DS797 variant) ---
- id: reeq_off
  label: Set Re-EQ Off
  kind: action
  command: "!1RAS00"
  params: []
- id: reeq_on
  label: Set Re-EQ On
  kind: action
  command: "!1RAS01"
  params: []
- id: reeq_up
  label: Re-EQ State Wrap-Around Up
  kind: action
  command: "!1RASUP"
  params: []
- id: reeq_query
  label: Re-EQ State Query
  kind: query
  command: "!1RASQSTN"
  params: []

# --- TUN: Tuning ---
- id: tune_direct
  label: Set Tuning Frequency Directly
  kind: action
  command: "!1TUN{frequency}"
  params:
    - name: frequency
      type: string
      description: 5-digit frequency (FM nnn.nn MHz / AM nnnnn kHz)
- id: tune_up
  label: Tuning Frequency Wrap-Around Up
  kind: action
  command: "!1TUNUP"
  params: []
- id: tune_down
  label: Tuning Frequency Wrap-Around Down
  kind: action
  command: "!1TUNDOWN"
  params: []
- id: tune_query
  label: Tuning Frequency Query
  kind: query
  command: "!1TUNQSTN"
  params: []

# --- PRS: Preset (1-40 in hex, "01"-"28") ---
- id: preset_set
  label: Set Preset Number
  kind: action
  command: "!1PRS{preset}"
  params:
    - name: preset
      type: string
      description: Preset number 1-40 as two hex digits ("01"-"28")
- id: preset_up
  label: Preset No. Wrap-Around Up
  kind: action
  command: "!1PRSUP"
  params: []
- id: preset_down
  label: Preset No. Wrap-Around Down
  kind: action
  command: "!1PRSDOWN"
  params: []
- id: preset_query
  label: Preset No. Query
  kind: query
  command: "!1PRSQSTN"
  params: []

# --- RDS: RDS Information (RDS model only) ---
- id: rds_display_rt
  label: Display RT Information
  kind: action
  command: "!1RDS00"
  params: []
- id: rds_display_pty
  label: Display PTY Information
  kind: action
  command: "!1RDS01"
  params: []
- id: rds_display_tp
  label: Display TP Information
  kind: action
  command: "!1RDS02"
  params: []
- id: rds_display_up
  label: RDS Information Wrap-Around Change
  kind: action
  command: "!1RDSUP"
  params: []

# --- PTS: PTY Scan (RDS model only; PTY 0-30 in hex) ---
- id: pty_scan
  label: Set PTY Scan Number
  kind: action
  command: "!1PTS{pty}"
  params:
    - name: pty
      type: string
      description: PTY number 0-30 as two hex digits ("00"-"1E")

# --- TPS: TP Scan (RDS model only) ---
- id: tp_scan_start
  label: Start TP Scan
  kind: action
  command: "!1TPS"
  params: []

# --- CCD: RI CD Player Operation ---
- id: ccd_track_up
  label: RI CD TRACK+
  kind: action
  command: "!1CCDTRACK"
  params: []
- id: ccd_play
  label: RI CD PLAY
  kind: action
  command: "!1CCDPLAY"
  params: []
- id: ccd_stop
  label: RI CD STOP
  kind: action
  command: "!1CCDSTOP"
  params: []
- id: ccd_pause
  label: RI CD PAUSE
  kind: action
  command: "!1CCDPAUSE"
  params: []
- id: ccd_skip_f
  label: RI CD SKIP FORWARD
  kind: action
  command: "!1CCDSKIP.F"
  params: []
- id: ccd_skip_r
  label: RI CD SKIP REVERSE
  kind: action
  command: "!1CCDSKIP.R"
  params: []
- id: ccd_memory
  label: RI CD MEMORY
  kind: action
  command: "!1CCDMEMORY"
  params: []
- id: ccd_clear
  label: RI CD CLEAR
  kind: action
  command: "!1CCDCLEAR"
  params: []
- id: ccd_repeat
  label: RI CD REPEAT
  kind: action
  command: "!1CCDREPEAT"
  params: []
- id: ccd_random
  label: RI CD RANDOM
  kind: action
  command: "!1CCDRANDOM"
  params: []
- id: ccd_disp
  label: RI CD DISPLAY
  kind: action
  command: "!1CCDDISP"
  params: []
- id: ccd_dmode
  label: RI CD D.MODE
  kind: action
  command: "!1CCDD.MODE"
  params: []
- id: ccd_ff
  label: RI CD FF
  kind: action
  command: "!1CCDFF"
  params: []
- id: ccd_rew
  label: RI CD REW
  kind: action
  command: "!1CCDREW"
  params: []
- id: ccd_open_close
  label: RI CD OPEN/CLOSE
  kind: action
  command: "!1CCDOP/CL"
  params: []
- id: ccd_key_1
  label: RI CD Key 1
  kind: action
  command: "!1CCD1"
  params: []
- id: ccd_key_2
  label: RI CD Key 2
  kind: action
  command: "!1CCD2"
  params: []
- id: ccd_key_3
  label: RI CD Key 3
  kind: action
  command: "!1CCD3"
  params: []
- id: ccd_key_4
  label: RI CD Key 4
  kind: action
  command: "!1CCD4"
  params: []
- id: ccd_key_5
  label: RI CD Key 5
  kind: action
  command: "!1CCD5"
  params: []
- id: ccd_key_6
  label: RI CD Key 6
  kind: action
  command: "!1CCD6"
  params: []
- id: ccd_key_7
  label: RI CD Key 7
  kind: action
  command: "!1CCD7"
  params: []
- id: ccd_key_8
  label: RI CD Key 8
  kind: action
  command: "!1CCD8"
  params: []
- id: ccd_key_9
  label: RI CD Key 9
  kind: action
  command: "!1CCD9"
  params: []
- id: ccd_key_0
  label: RI CD Key 0
  kind: action
  command: "!1CCD0"
  params: []
- id: ccd_key_10
  label: RI CD Key 10
  kind: action
  command: "!1CCD10"
  params: []
- id: ccd_disc_f
  label: RI CD DISC +
  kind: action
  command: "!1CCDDISC.F"
  params: []
- id: ccd_disc_r
  label: RI CD DISC -
  kind: action
  command: "!1CCDDISC.R"
  params: []
- id: ccd_disc_1
  label: RI CD DISC1
  kind: action
  command: "!1CCDDISC1"
  params: []
- id: ccd_disc_2
  label: RI CD DISC2
  kind: action
  command: "!1CCDDISC2"
  params: []
- id: ccd_disc_3
  label: RI CD DISC3
  kind: action
  command: "!1CCDDISC3"
  params: []
- id: ccd_disc_4
  label: RI CD DISC4
  kind: action
  command: "!1CCDDISC4"
  params: []
- id: ccd_disc_5
  label: RI CD DISC5
  kind: action
  command: "!1CCDDISC5"
  params: []
- id: ccd_disc_6
  label: RI CD DISC6
  kind: action
  command: "!1CCDDISC6"
  params: []

# --- CT1: RI TAPE1(A) Operation ---
- id: ct1_play_f
  label: RI TAPE1 PLAY FORWARD
  kind: action
  command: "!1CT1PLAY.F"
  params: []
- id: ct1_play_r
  label: RI TAPE1 PLAY REVERSE
  kind: action
  command: "!1CT1PLAY.R"
  params: []
- id: ct1_stop
  label: RI TAPE1 STOP
  kind: action
  command: "!1CT1STOP"
  params: []
- id: ct1_rec_pause
  label: RI TAPE1 REC/PAUSE
  kind: action
  command: "!1CT1RC/PAU"
  params: []
- id: ct1_ff
  label: RI TAPE1 FF
  kind: action
  command: "!1CT1FF"
  params: []
- id: ct1_rew
  label: RI TAPE1 REW
  kind: action
  command: "!1CT1REW"
  params: []

# --- CT2: RI TAPE2(B) Operation ---
- id: ct2_play_f
  label: RI TAPE2 PLAY FORWARD
  kind: action
  command: "!1CT2PLAY.F"
  params: []
- id: ct2_play_r
  label: RI TAPE2 PLAY REVERSE
  kind: action
  command: "!1CT2PLAY.R"
  params: []
- id: ct2_stop
  label: RI TAPE2 STOP
  kind: action
  command: "!1CT2STOP"
  params: []
- id: ct2_rec_pause
  label: RI TAPE2 REC/PAUSE
  kind: action
  command: "!1CT2RC/PAU"
  params: []
- id: ct2_ff
  label: RI TAPE2 FF
  kind: action
  command: "!1CT2FF"
  params: []
- id: ct2_rew
  label: RI TAPE2 REW
  kind: action
  command: "!1CT2REW"
  params: []
- id: ct2_open_close
  label: RI TAPE2 OPEN/CLOSE
  kind: action
  command: "!1CT2OP/CL"
  params: []
- id: ct2_skip_f
  label: RI TAPE2 SKIP FORWARD
  kind: action
  command: "!1CT2SKIP.F"
  params: []
- id: ct2_skip_r
  label: RI TAPE2 SKIP REVERSE
  kind: action
  command: "!1CT2SKIP.R"
  params: []
- id: ct2_rec
  label: RI TAPE2 REC
  kind: action
  command: "!1CT2REC"
  params: []

# --- CEQ: RI Graphics Equalizer Operation ---
- id: ceq_preset
  label: RI GEQ PRESET
  kind: action
  command: "!1CEQPRESET"
  params: []

# --- CDT: RI DAT Recorder Operation ---
- id: cdt_play
  label: RI DAT PLAY
  kind: action
  command: "!1CDTPLAY"
  params: []
- id: cdt_rec_pause
  label: RI DAT REC/PAUSE
  kind: action
  command: "!1CDTRC/PAU"
  params: []
- id: cdt_stop
  label: RI DAT STOP
  kind: action
  command: "!1CDTSTOP"
  params: []
- id: cdt_skip_f
  label: RI DAT SKIP FORWARD
  kind: action
  command: "!1CDTSKIP.F"
  params: []
- id: cdt_skip_r
  label: RI DAT SKIP REVERSE
  kind: action
  command: "!1CDTSKIP.R"
  params: []
- id: cdt_ff
  label: RI DAT FF
  kind: action
  command: "!1CDTFF"
  params: []
- id: cdt_rew
  label: RI DAT REW
  kind: action
  command: "!1CDTREW"
  params: []

# --- CDV: RI DVD Player Operation ---
- id: cdv_power_on
  label: RI DVD POWER ON
  kind: action
  command: "!1CDVPWRON"
  params: []
- id: cdv_power_off
  label: RI DVD POWER OFF
  kind: action
  command: "!1CDVPWROFF"
  params: []
- id: cdv_play
  label: RI DVD PLAY
  kind: action
  command: "!1CDVPLAY"
  params: []
- id: cdv_stop
  label: RI DVD STOP
  kind: action
  command: "!1CDVSTOP"
  params: []
- id: cdv_skip_f
  label: RI DVD SKIP FORWARD
  kind: action
  command: "!1CDVSKIP.F"
  params: []
- id: cdv_skip_r
  label: RI DVD SKIP REVERSE
  kind: action
  command: "!1CDVSKIP.R"
  params: []
- id: cdv_ff
  label: RI DVD FF
  kind: action
  command: "!1CDVFF"
  params: []
- id: cdv_rew
  label: RI DVD REW
  kind: action
  command: "!1CDVREW"
  params: []
- id: cdv_pause
  label: RI DVD PAUSE
  kind: action
  command: "!1CDVPAUSE"
  params: []
- id: cdv_last_play
  label: RI DVD LAST PLAY
  kind: action
  command: "!1CDVLASTPLAY"
  params: []
- id: cdv_subtitle_on_off
  label: RI DVD SUBTITLE ON/OFF
  kind: action
  command: "!1CDVSUBTON/OFF"
  params: []
- id: cdv_subtitle
  label: RI DVD SUBTITLE
  kind: action
  command: "!1CDVSUBTITLE"
  params: []
- id: cdv_setup
  label: RI DVD SETUP
  kind: action
  command: "!1CDVSETUP"
  params: []
- id: cdv_topmenu
  label: RI DVD TOPMENU
  kind: action
  command: "!1CDVTOPMENU"
  params: []
- id: cdv_menu
  label: RI DVD MENU
  kind: action
  command: "!1CDVMENU"
  params: []
- id: cdv_up
  label: RI DVD UP
  kind: action
  command: "!1CDVUP"
  params: []
- id: cdv_down
  label: RI DVD DOWN
  kind: action
  command: "!1CDVDOWN"
  params: []
- id: cdv_left
  label: RI DVD LEFT
  kind: action
  command: "!1CDVLEFT"
  params: []
- id: cdv_right
  label: RI DVD RIGHT
  kind: action
  command: "!1CDVRIGHT"
  params: []
- id: cdv_enter
  label: RI DVD ENTER
  kind: action
  command: "!1CDVENTER"
  params: []
- id: cdv_return
  label: RI DVD RETURN
  kind: action
  command: "!1CDVRETURN"
  params: []
- id: cdv_disc_f
  label: RI DVD DISC +
  kind: action
  command: "!1CDVDISC.F"
  params: []
- id: cdv_disc_r
  label: RI DVD DISC -
  kind: action
  command: "!1CDVDISC.R"
  params: []
- id: cdv_audio
  label: RI DVD AUDIO
  kind: action
  command: "!1CDVAUDIO"
  params: []
- id: cdv_random
  label: RI DVD RANDOM
  kind: action
  command: "!1CDVRANDOM"
  params: []
- id: cdv_open_close
  label: RI DVD OPEN/CLOSE
  kind: action
  command: "!1CDVOP/CL"
  params: []
- id: cdv_angle
  label: RI DVD ANGLE
  kind: action
  command: "!1CDVANGLE"
  params: []
- id: cdv_key_1
  label: RI DVD Key 1
  kind: action
  command: "!1CDV1"
  params: []
- id: cdv_key_2
  label: RI DVD Key 2
  kind: action
  command: "!1CDV2"
  params: []
- id: cdv_key_3
  label: RI DVD Key 3
  kind: action
  command: "!1CDV3"
  params: []
- id: cdv_key_4
  label: RI DVD Key 4
  kind: action
  command: "!1CDV4"
  params: []
- id: cdv_key_5
  label: RI DVD Key 5
  kind: action
  command: "!1CDV5"
  params: []
- id: cdv_key_6
  label: RI DVD Key 6
  kind: action
  command: "!1CDV6"
  params: []
- id: cdv_key_7
  label: RI DVD Key 7
  kind: action
  command: "!1CDV7"
  params: []
- id: cdv_key_8
  label: RI DVD Key 8
  kind: action
  command: "!1CDV8"
  params: []
- id: cdv_key_9
  label: RI DVD Key 9
  kind: action
  command: "!1CDV9"
  params: []
- id: cdv_key_10
  label: RI DVD Key 10
  kind: action
  command: "!1CDV10"
  params: []
- id: cdv_key_0
  label: RI DVD Key 0
  kind: action
  command: "!1CDV0"
  params: []
- id: cdv_search
  label: RI DVD SEARCH
  kind: action
  command: "!1CDVSEARCH"
  params: []
- id: cdv_disp
  label: RI DVD DISPLAY
  kind: action
  command: "!1CDVDISP"
  params: []
- id: cdv_repeat
  label: RI DVD REPEAT
  kind: action
  command: "!1CDVREPEAT"
  params: []
- id: cdv_memory
  label: RI DVD MEMORY
  kind: action
  command: "!1CDVMEMORY"
  params: []
- id: cdv_clear
  label: RI DVD CLEAR
  kind: action
  command: "!1CDVCLEAR"
  params: []

# --- CMD: RI MD Recorder Operation ---
- id: cmd_play
  label: RI MD PLAY
  kind: action
  command: "!1CMDPLAY"
  params: []
- id: cmd_stop
  label: RI MD STOP
  kind: action
  command: "!1CMDSTOP"
  params: []
- id: cmd_ff
  label: RI MD FF
  kind: action
  command: "!1CMDFF"
  params: []
- id: cmd_rew
  label: RI MD REW
  kind: action
  command: "!1CMDREW"
  params: []
- id: cmd_play_mode
  label: RI MD PLAY MODE
  kind: action
  command: "!1CMDP.MODE"
  params: []
- id: cmd_skip_f
  label: RI MD SKIP FORWARD
  kind: action
  command: "!1CMDSKIP.F"
  params: []
- id: cmd_skip_r
  label: RI MD SKIP REVERSE
  kind: action
  command: "!1CMDSKIP.R"
  params: []
- id: cmd_pause
  label: RI MD PAUSE
  kind: action
  command: "!1CMDPAUSE"
  params: []
- id: cmd_rec
  label: RI MD REC
  kind: action
  command: "!1CMDREC"
  params: []
- id: cmd_memory
  label: RI MD MEMORY
  kind: action
  command: "!1CMDMEMORY"
  params: []
- id: cmd_disp
  label: RI MD DISPLAY
  kind: action
  command: "!1CMDDISP"
  params: []
- id: cmd_scroll
  label: RI MD SCROLL
  kind: action
  command: "!1CMDSCROLL"
  params: []
- id: cmd_music_scan
  label: RI MD MUSIC SCAN
  kind: action
  command: "!1CMDM.SCAN"
  params: []
- id: cmd_clear
  label: RI MD CLEAR
  kind: action
  command: "!1CMDCLEAR"
  params: []
- id: cmd_random
  label: RI MD RANDOM
  kind: action
  command: "!1CMDRANDOM"
  params: []
- id: cmd_repeat
  label: RI MD REPEAT
  kind: action
  command: "!1CMDREPEAT"
  params: []
- id: cmd_enter
  label: RI MD ENTER
  kind: action
  command: "!1CMDENTER"
  params: []
- id: cmd_eject
  label: RI MD EJECT
  kind: action
  command: "!1CMDEJECT"
  params: []
- id: cmd_key_1
  label: RI MD Key 1
  kind: action
  command: "!1CMD1"
  params: []
- id: cmd_key_2
  label: RI MD Key 2
  kind: action
  command: "!1CMD2"
  params: []
- id: cmd_key_3
  label: RI MD Key 3
  kind: action
  command: "!1CMD3"
  params: []
- id: cmd_key_4
  label: RI MD Key 4
  kind: action
  command: "!1CMD4"
  params: []
- id: cmd_key_5
  label: RI MD Key 5
  kind: action
  command: "!1CMD5"
  params: []
- id: cmd_key_6
  label: RI MD Key 6
  kind: action
  command: "!1CMD6"
  params: []
- id: cmd_key_7
  label: RI MD Key 7
  kind: action
  command: "!1CMD7"
  params: []
- id: cmd_key_8
  label: RI MD Key 8
  kind: action
  command: "!1CMD8"
  params: []
- id: cmd_key_9
  label: RI MD Key 9
  kind: action
  command: "!1CMD9"
  params: []
- id: cmd_key_10_0
  label: RI MD Key 10/0
  kind: action
  command: "!1CMD10/0"
  params: []
- id: cmd_key_digits
  label: RI MD Numeric Digits Entry
  kind: action
  command: "!1CMDnn/nnn"
  params:
    - name: digits
      type: string
      description: Numeric entry shown in source as "nn/nnn" (--/---)

# --- CCR: RI CD-R Recorder Operation ---
- id: ccr_play_mode
  label: RI CD-R PLAY MODE
  kind: action
  command: "!1CCRP.MODE"
  params: []
- id: ccr_play
  label: RI CD-R PLAY
  kind: action
  command: "!1CCRPLAY"
  params: []
- id: ccr_stop
  label: RI CD-R STOP
  kind: action
  command: "!1CCRSTOP"
  params: []
- id: ccr_skip_f
  label: RI CD-R SKIP FORWARD
  kind: action
  command: "!1CCRSKIP.F"
  params: []
- id: ccr_skip_r
  label: RI CD-R SKIP REVERSE
  kind: action
  command: "!1CCRSKIP.R"
  params: []
- id: ccr_pause
  label: RI CD-R PAUSE
  kind: action
  command: "!1CCRPAUSE"
  params: []
- id: ccr_rec
  label: RI CD-R REC
  kind: action
  command: "!1CCRREC"
  params: []
- id: ccr_clear
  label: RI CD-R CLEAR
  kind: action
  command: "!1CCRCLEAR"
  params: []
- id: ccr_repeat
  label: RI CD-R REPEAT
  kind: action
  command: "!1CCRREPEAT"
  params: []
- id: ccr_key_1
  label: RI CD-R Key 1
  kind: action
  command: "!1CCR1"
  params: []
- id: ccr_key_2
  label: RI CD-R Key 2
  kind: action
  command: "!1CCR2"
  params: []
- id: ccr_key_3
  label: RI CD-R Key 3
  kind: action
  command: "!1CCR3"
  params: []
- id: ccr_key_4
  label: RI CD-R Key 4
  kind: action
  command: "!1CCR4"
  params: []
- id: ccr_key_5
  label: RI CD-R Key 5
  kind: action
  command: "!1CCR5"
  params: []
- id: ccr_key_6
  label: RI CD-R Key 6
  kind: action
  command: "!1CCR6"
  params: []
- id: ccr_key_7
  label: RI CD-R Key 7
  kind: action
  command: "!1CCR7"
  params: []
- id: ccr_key_8
  label: RI CD-R Key 8
  kind: action
  command: "!1CCR8"
  params: []
- id: ccr_key_9
  label: RI CD-R Key 9
  kind: action
  command: "!1CCR9"
  params: []
- id: ccr_key_10_0
  label: RI CD-R Key 10/0
  kind: action
  command: "!1CCR10/0"
  params: []
- id: ccr_key_digits
  label: RI CD-R Numeric Digits Entry
  kind: action
  command: "!1CCRnn/nnn"
  params:
    - name: digits
      type: string
      description: Numeric entry shown in source as "nn/nnn" (--/---)
- id: ccr_scroll
  label: RI CD-R SCROLL
  kind: action
  command: "!1CCRSCROLL"
  params: []
- id: ccr_open_close
  label: RI CD-R OPEN/CLOSE
  kind: action
  command: "!1CCROP/CL"
  params: []
- id: ccr_disp
  label: RI CD-R DISPLAY
  kind: action
  command: "!1CCRDISP"
  params: []
- id: ccr_random
  label: RI CD-R RANDOM
  kind: action
  command: "!1CCRRANDOM"
  params: []
- id: ccr_memory
  label: RI CD-R MEMORY
  kind: action
  command: "!1CCRMEMORY"
  params: []
```

## Feedbacks
```yaml
- id: command_status_response
  type: string
  description: >-
    Receiver echoes the ISCP message as a Status Message in response to a
    Command Message (e.g. send "SLI03", receive "SLI03"). Receiver responds
    within 50msec; no response within 50msec means communication failed.
- id: query_response
  type: string
  description: >-
    Response to a Question Message (QSTN) carrying the current value
    (e.g. send "SLIQSTN", receive "SLI03").
- id: power_state
  type: enum
  values: [on, standby]
  description: >-
    Power status response; device-to-controller framing example in source is
    "!1SST00[EOF]" for Power Status = Standby.
```

## Variables
```yaml
- id: master_volume
  type: integer
  min: 0
  max: 100
  description: Master volume 0-100, sent as two hex digits ("00"-"64") via MVL
- id: sleep_timer
  type: integer
  min: 1
  max: 90
  description: Sleep time 1-90 minutes, sent as two hex digits ("01"-"5A") via SLP
- id: tuner_preset
  type: integer
  min: 1
  max: 40
  description: Tuner preset number 1-40, sent as two hex digits ("01"-"28") via PRS
- id: tuning_frequency
  type: string
  description: Direct tuning frequency (FM nnn.nn MHz / AM nnnnn kHz) via TUN
- id: dimmer_level
  type: enum
  values: [bright, dim, dark]
  description: Front panel dimmer level via DIM
```

## Events
```yaml
- id: status_change_notice
  description: >-
    Unsolicited Event Notice: when the receiver's status changes, it sends the
    new current status to the controller without being asked (e.g. "SLI03").
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- ISCP over RS-232C: 3-wire, 9-pin female D-sub; pin 2 = transmit, pin 3 = receive, pin 5 = signal ground. Use a straight-through cable to a PC.
- Controller-to-device frame: start character `!`, destination unit character `1` (Receiver), ISCP message (3 command characters + variable-length parameter), end character `[CR]` or `[LF]` or `[CR][LF]` (0x0D / 0x0A).
- Device-to-controller frame: `!` + source unit char `1` + ISCP message + `[EOF]` (0x1A).
- Receiver responds to commands within 50msec; treat no response within 50msec as failed communication. Interval between received messages must be more than 50msec.
- Source also documents eISCP over Ethernet (TCP, default port 60128) for network-capable models; TX-DS797 support for Ethernet is not stated, so only serial is declared here.
- TX-DS797 uses the "00"-"64" (0-100) MVL volume range and the "01"-"28" (preset 1-40) PRS range, not the 0-80 / 1-30 variants.
- Per the TX-DS797 column of the source support matrices, the following are NOT supported on this model and are excluded: AMT "TG", SPA/SPB, SPL, per-channel tone commands (TFR/TFW/TFH/TCT/TSR/TSB/TSW), SWL/CTL, DIF display-information variants (00-04 of the information table), DIM "03"/"08", OSD AUDIO/VIDEO, MEM, IFA/IFV, SLI/SLR extra inputs (05/06/21/26-32/40), SLA iLINK/HDMI/COAX-OPT/BALANCE, TGA/TGB/TGC 12V triggers, VOS/HDO/RES/ISF, LMD modes 03/05/06/11-16/40-45/50-52/80-A7, LTN "03", RAS Re-EQ/Academy and Cinema Filter variants, ADY/ADQ/ADV/DVL/MOT, PRM, XM/SIRIUS/HD Radio/Net-USB (XCN/SCN/HAT etc./NTC/NAT/NAL/NTI/NTM/NTR/NST/NPR), Zone2 (ZPW/ZMT/ZVL/ZTN/ZBL/SLZ/TUZ/PRZ/NTZ/NPZ/LMZ/LTZ/RAZ), Zone3 (PW3/MT3/VL3/TN3/BL3/SL3/TU3/PR3/NT3/NP3), Zone4, Dock (CDS), plus late-added RI keys (CCD "+10"/"D.SKIP"/"STBY"/"PON", CDV ABR/STEP/SLOW/ZOOM/PROGRE/VDOFF/CONMEM/FUNMEM/DISC1-6/FOLDUP/FOLDDN/P.MODE/ASCTG/CDPCD/MSPUP/MSPDN/PCT/RSCTG/INIT, CMD NAME/GROUP/STBY, CCR FF/REW/STBY, PTS/TPS "ENTER").
- RI System commands (CCD/CT1/CT2/CEQ/CDT/CDV/CMD/CCR) operate ONKYO RI-connected source devices through the receiver.
- The TUNER function is shared by the MAIN and ZONE side (source note).
- RDS/PTS/TPS commands apply to RDS models only; RBDS models support RT display only.
<!-- UNRESOLVED: firmware version compatibility not stated in source. Exact response payload formats for each QSTN (other than examples SLI03 / SST00) not individually documented. MVL/SLP/PRS parameters are hex-encoded strings, not plain decimal — the source does not further specify encoding of TUN frequency digits beyond "nnnnn". -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T20:27:01.228Z
last_checked_at: 2026-09-16T22:18:13.886Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-16T22:18:13.886Z
matched_actions: 261
action_count: 261
confidence: medium
summary: "All 261 spec wire-literal commands map to TX-DS797-Yes source rows; transport params match; bidirectional coverage is full. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. eISCP/Ethernet section of the source applies to network models only; TX-DS797 support for Ethernet not stated. Zone2 (ZPW/ZMT/ZVL/SLZ etc.), 12V triggers (TGA/TGB/TGC), XM/SIRIUS/HD Radio/Net-USB commands, and Zone3/Zone4 commands are marked \"No\" (or not listed) for TX-DS797 in the source support matrices."
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures found in source"
- "firmware version compatibility not stated in source. Exact response payload formats for each QSTN (other than examples SLI03 / SST00) not individually documented. MVL/SLP/PRS parameters are hex-encoded strings, not plain decimal — the source does not further specify encoding of TUN frequency digits beyond \"nnnnn\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
