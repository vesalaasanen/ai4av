---
spec_id: admin/onkyo-tx-ds898
schema_version: ai4av-public-spec-v1
revision: 2
title: "Onkyo TX-DS898 Control Spec"
manufacturer: Onkyo
model_family: TX-DS898
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-DS898
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T15:35:32.559Z
last_checked_at: 2026-10-07T17:31:30.390Z
generated_at: 2026-10-07T17:31:30.390Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TX-DS898 Ethernet applicability is not established by the supplied source."
  - "no eISCP header-only protocol block emitted; defer to a separate protocol group if needed."
  - "TX-DS898 Zone2 volume applicability and range. The protocol-wide source lists both 0-100 (hex 00-64) and 0-80 (hex 00-50), without a model mapping.'"
  - "TX-DS898 Zone2 selector"
  - "TX-DS898 applicability.'"
  - "frequency range and TX-DS898 applicability.'"
  - "TX-DS898 applicability and which range applies.'"
  - "TX-DS898 applicability and supported subset.'"
  - "TX-DS898 applicability and supported input subset."
  - "TX-DS898 applicability."
  - "wire representation of the off-state reply is not specified.'"
  - "no TX-DS898 Cinema Filter feedback definition; the source marks this RAS variant No for TX-DS898. Retained id does not establish model support; RAS feedback for this model is Re-EQ.'"
  - "TX-DS898 Zone2 volume applicability and range. Protocol-wide alternatives are 0-100 (hex 00-64) and 0-80 (hex 00-50).'"
  - "TX-DS898 applicability and supported input subset.'"
  - "Zone2 tone (ZTN) applicability to TX-DS898 is not established"
  - "the RS-232C standby example uses SST00 rather than PWR00;"
  - "TX-DS898 Ethernet applicability and eISCP end-character variant."
  - "TX-DS898 firmware version compatibility ranges not stated in source."
  - "TX-DS898 Ethernet applicability is not established; no separate eISCP protocol group emitted."
  - "TX-DS898 applicability of the protocol-wide Zone2/Zone3/Zone4 definitions is not established."
verification:
  verdict: verified
  checked_at: 2026-10-07T17:31:30.390Z
  matched_actions: 239
  action_count: 239
  confidence: medium
  summary: "All 239 action units match source tokens with correct TX-DS898 column support and shapes; serial transport verified, auth honestly unresolved; Zone2-4 applicability caveated. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-15
---

# Onkyo TX-DS898 Control Spec

## Summary
Onkyo TX-DS898 AV receiver. ISCP (Integra Serial Control Protocol) over RS-232C (9600 baud, 8N1, no flow control, DB9 straight-thru). The source also describes eISCP over TCP, with protocol-wide default port 60128 and configurable ports 49152-65535; Ethernet applicability to TX-DS898 is UNRESOLVED. Authentication is UNRESOLVED because the source does not state an authentication policy. Controls: system power, muting, master volume, input selector, RECOUT selector, listening mode, late night, dimmer, sleep, tuner, preset, display mode, OSD menu, Re-EQ, and RI-connected CD/Tape1/Tape2/DAT/MD/CDR/DVD devices and graphics equalizer. Existing Zone2 definitions are retained, but their TX-DS898 applicability and model-specific ranges are UNRESOLVED.

<!-- TX-DS898 column shows No for HDO/RES/ISF HDMI, TFR/TCT/TSR/TSB/TSW/TFH/TFW tone zones, SWL/CTL temporary levels, SPA/SPB speaker A/B, ADY/ADQ/ADV/DVL Audyssey/Dolby Volume, MEM, XM/SIRIUS/HD Radio, NTC Net-Tune, TGA/TGB/TGC 12V Trigger, IFA/IFV info, VOS, and SLI MULTI CH. SLP is supported. The supplied Zone2/Zone3/Zone4 tables lack per-model support columns; TX-DS898 applicability is UNRESOLVED. -->

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
# UNRESOLVED: TX-DS898 Ethernet applicability is not established by the supplied source.
# Protocol-wide eISCP documentation specifies TCP port 60128 by default,
# configurable from 49152 through 65535; these are not established TX-DS898 defaults.
# UNRESOLVED: no eISCP header-only protocol block emitted; defer to a separate protocol group if needed.
auth:
  type: UNRESOLVED  # Source does not state an authentication policy.
```

## Traits
```yaml
powerable:
  - inferred from PWR command ("00"=Standby, "01"=On)
queryable:
  - inferred from QSTN suffix used throughout
levelable:
  - inferred from MVL volume range 0x00-0x64
routable:
  - inferred from SLI input selector and SLR RECOUT selector
```

## Actions
```yaml
# System Power (PWR)
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
- id: power_status_qstn
  label: Get Power Status
  kind: query
  command: "PWRQSTN"
  params: []

# Audio Muting (AMT)
- id: muting_off
  label: Audio Muting Off
  kind: action
  command: "AMT00"
  params: []
- id: muting_on
  label: Audio Muting On
  kind: action
  command: "AMT01"
  params: []
- id: muting_status_qstn
  label: Get Muting Status
  kind: query
  command: "AMTQSTN"
  params: []

# Master Volume (MVL) - 0-100 hex 0x00-0x64 (TX-DS898 column)
- id: volume_set
  label: Set Master Volume
  kind: action
  command: "MVL{level:02X}"
  params:
    - name: level
      type: integer
      description: Volume 0-100 (hex 0x00-0x64)
- id: volume_up
  label: Volume Up
  kind: action
  command: "MVLUP"
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  command: "MVLDOWN"
  params: []
- id: volume_status_qstn
  label: Get Master Volume
  kind: query
  command: "MVLQSTN"
  params: []

# Display Mode (DIF)
- id: display_mode_selector_volume
  label: Display Selector + Volume
  kind: action
  command: "DIF00"
  params: []
- id: display_mode_selector_listening
  label: Display Selector + Listening Mode
  kind: action
  command: "DIF01"
  params: []
- id: display_mode_toggle
  label: Display Mode Wrap-Around Up
  kind: action
  command: "DIF{parameter}"
  params:
    - name: parameter
      type: string
      description: 'Required literal "UP"; the TX-DS898 Yes(*1) entry refers to the footnote specifying parameter character "UP".'
- id: display_mode_qstn
  label: Get Display Mode
  kind: query
  command: "DIFQSTN"
  params: []

# Dimmer (DIM)
- id: dimmer_bright
  label: Dimmer Bright
  kind: action
  command: "DIM00"
  params: []
- id: dimmer_dim
  label: Dimmer Dim
  kind: action
  command: "DIM01"
  params: []
- id: dimmer_dark
  label: Dimmer Dark
  kind: action
  command: "DIM02"
  params: []
- id: dimmer_shutoff
  label: Dimmer Shut-Off
  kind: action
  command: "DIM03"
  params: []
- id: dimmer_up
  label: Dimmer Wrap-Around Up
  kind: action
  command: "DIMDIM"
  params: []
- id: dimmer_qstn
  label: Get Dimmer Level
  kind: query
  command: "DIMQSTN"
  params: []

# OSD Setup Operation (OSD)
- id: osd_menu
  label: Menu Key
  kind: action
  command: "OSDMENU"
  params: []
- id: osd_up
  label: Up Key
  kind: action
  command: "OSDUP"
  params: []
- id: osd_down
  label: Down Key
  kind: action
  command: "OSDDOWN"
  params: []
- id: osd_right
  label: Right Key
  kind: action
  command: "OSDRIGHT"
  params: []
- id: osd_left
  label: Left Key
  kind: action
  command: "OSDLEFT"
  params: []
- id: osd_enter
  label: Enter Key
  kind: action
  command: "OSDENTER"
  params: []
- id: osd_exit
  label: Exit Key
  kind: action
  command: "OSDEXIT"
  params: []

# Input Selector (SLI) - TX-DS898 column set:
# 00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4, 04=VIDEO5,
# 10=DVD, 20=TAPE(1), 22=PHONO (No TAPE2 "21"), 23=CD, 24=FM, 25=AM
- id: select_input
  label: Select Input Source
  kind: action
  command: "SLI{input}"
  params:
    - name: input
      type: string
      description: |
        Two-character hexadecimal input selector code (TX-DS898 supported):
        "00"=VIDEO1 VCR/DVR, "01"=VIDEO2 CBL/SAT, "02"=VIDEO3 GAME/TV,
        "03"=VIDEO4 AUX1, "04"=VIDEO5 AUX2, "10"=DVD, "20"=TAPE(1),
        "22"=PHONO, "23"=CD, "24"=FM, "25"=AM
- id: input_up
  label: Selector Wrap-Around Up
  kind: action
  command: "SLIUP"
  params: []
- id: input_down
  label: Selector Wrap-Around Down
  kind: action
  command: "SLIDOWN"
  params: []
- id: input_status_qstn
  label: Get Selector Position
  kind: query
  command: "SLIQSTN"
  params: []

# RECOUT Selector (SLR)
- id: select_recout
  label: Select RECOUT Source
  kind: action
  command: "SLR{input}"
  params:
    - name: input
      type: string
      description: |
        Two-character hexadecimal RECOUT selector code: "00"=VIDEO1,
        "01"=VIDEO2, "02"=VIDEO3, "03"=VIDEO4, "04"=VIDEO5,
        "10"=DVD, "20"=TAPE(1), "22"=PHONO, "23"=CD,
        "24"=FM, "25"=AM, "7F"=OFF, "80"=SOURCE
- id: recout_status_qstn
  label: Get RECOUT Selector Position
  kind: query
  command: "SLRQSTN"
  params: []

# Audio Selector (SLA) - TX-DS898 Yes for AUTO/MULTI-CH/ANALOG, No for iLINK/HDMI/COAX-OPT/BALANCE
- id: audio_selector_set
  label: Set Audio Selector
  kind: action
  command: "SLA{mode}"
  params:
    - name: mode
      type: string
      description: 'Two-character hexadecimal code: "00"=AUTO, "01"=MULTI-CHANNEL, "02"=ANALOG'
- id: audio_selector_up
  label: Audio Selector Wrap-Around Up
  kind: action
  command: "SLAUP"
  params: []
- id: audio_selector_qstn
  label: Get Audio Selector
  kind: query
  command: "SLAQSTN"
  params: []

# Speaker Level Calibration (SLC) - TX-DS898 Yes
- id: speaker_level_test
  label: Speaker Level TEST Key
  kind: action
  command: "SLCTEST"
  params: []
- id: speaker_level_chsel
  label: Speaker Level CH SEL Key
  kind: action
  command: "SLCCHSEL"
  params: []
- id: speaker_level_up
  label: Speaker Level +
  kind: action
  command: "SLCUP"
  params: []
- id: speaker_level_down
  label: Speaker Level -
  kind: action
  command: "SLCDOWN"
  params: []

# Sleep Timer (SLP) - TX-DS898 Yes (1-90 min)
- id: sleep_set
  label: Set Sleep Time
  kind: action
  command: "SLP{minutes:02X}"
  params:
    - name: minutes
      type: integer
      description: Sleep time 1-90 minutes (hex 0x01-0x5A)
- id: sleep_off
  label: Sleep Off
  kind: action
  command: "SLPOFF"
  params: []
- id: sleep_up
  label: Sleep Wrap-Around Up
  kind: action
  command: "SLPUP"
  params: []
- id: sleep_qstn
  label: Get Sleep Time
  kind: query
  command: "SLPQSTN"
  params: []

# Listening Mode (LMD) - TX-DS898 Yes for codes below; 03=FILM is No
- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  command: "LMD{mode}"
  params:
    - name: mode
      type: string
      description: |
        Two-character hexadecimal TX-DS898 supported listening mode code:
        "00"=STEREO, "01"=DIRECT, "02"=SURROUND,
        "04"=THX, "07"=MONO MOVIE, "08"=ORCHESTRA, "09"=UNPLUGGED,
        "0A"=STUDIO-MIX, "0B"=TV LOGIC, "0C"=ALL CH STEREO,
        "0D"=THEATER-DIMENSIONAL, "0E"=ENHANCED 7, "0F"=MONO
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
- id: listening_mode_qstn
  label: Get Listening Mode
  kind: query
  command: "LMDQSTN"
  params: []

# Late Night (LTN) - TX-DS898 Yes for 00/01/02 (no "03" Auto)
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
- id: late_night_up
  label: Late Night Wrap-Around Up
  kind: action
  command: "LTNUP"
  params: []
- id: late_night_qstn
  label: Get Late Night Level
  kind: query
  command: "LTNQSTN"
  params: []

# Re-EQ (RAS) - TX-DS898 column: Re-EQ section Yes
- id: re_eq_off
  label: Re-EQ Off
  kind: action
  command: "RAS00"
  params: []
- id: re_eq_on
  label: Re-EQ On
  kind: action
  command: "RAS01"
  params: []
- id: re_eq_up
  label: Re-EQ State Wrap-Around Up
  kind: action
  command: "RASUP"
  params: []
- id: re_eq_qstn
  label: Get Re-EQ State
  kind: query
  command: "RASQSTN"
  params: []

# Cinema Filter RAS variant is No for TX-DS898; no Cinema Filter actions emitted.

# Tuner (TUN) - TX-DS898 Yes for direct/UP/DOWN/QSTN
- id: tuner_set_frequency
  label: Set Tuning Frequency
  kind: action
  command: "TUN{frequency}"
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz (five decimal digits without separator, e.g. "09950" for 99.50 MHz)
- id: tuner_up
  label: Tuning Frequency Up
  kind: action
  command: "TUNUP"
  params: []
- id: tuner_down
  label: Tuning Frequency Down
  kind: action
  command: "TUNDOWN"
  params: []
- id: tuner_qstn
  label: Get Tuning Frequency
  kind: query
  command: "TUNQSTN"
  params: []

# Preset (PRS) - TX-DS898: 0x01-0x28 (1-40)
- id: preset_set
  label: Set Preset Number
  kind: action
  command: "PRS{preset:02X}"
  params:
    - name: preset
      type: integer
      description: Preset 1-40 (hex 0x01-0x28)
- id: preset_up
  label: Preset Wrap-Around Up
  kind: action
  command: "PRSUP"
  params: []
- id: preset_down
  label: Preset Wrap-Around Down
  kind: action
  command: "PRSDOWN"
  params: []
- id: preset_qstn
  label: Get Preset Number
  kind: query
  command: "PRSQSTN"
  params: []

# RDS Information (RDS) - RDS model only; RBDS models support RT information only
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
- id: rds_display_up
  label: RDS Information Wrap-Around
  kind: action
  command: "RDSUP"
  params: []

# PTY Scan (PTS) - RDS model only; TX-DS898 column Yes
- id: pty_scan_set
  label: Set PTY Scan Number
  kind: action
  command: "PTS{pty:02X}"
  params:
    - name: pty
      type: integer
      description: PTY number 0-30 (hex 0x00-0x1E)

# TP Scan (TPS) - RDS model only; TX-DS898 column Yes
- id: tp_scan_start
  label: Start TP Scan
  kind: action
  command: "TPS"
  params: []

# RI CD Player Operation (CCD) - TX-DS898 Yes
- id: ccd_track_next
  label: CD Track+
  kind: action
  command: "CCDTRACK"
  params: []
- id: ccd_play
  label: CD Play
  kind: action
  command: "CCDPLAY"
  params: []
- id: ccd_stop
  label: CD Stop
  kind: action
  command: "CCDSTOP"
  params: []
- id: ccd_pause
  label: CD Pause
  kind: action
  command: "CCDPAUSE"
  params: []
- id: ccd_skip_fwd
  label: CD >>I
  kind: action
  command: "CCDSKIP.F"
  params: []
- id: ccd_skip_rev
  label: CD I<<
  kind: action
  command: "CCDSKIP.R"
  params: []
- id: ccd_memory
  label: CD Memory
  kind: action
  command: "CCDMEMORY"
  params: []
- id: ccd_clear
  label: CD Clear
  kind: action
  command: "CCDCLEAR"
  params: []
- id: ccd_repeat
  label: CD Repeat
  kind: action
  command: "CCDREPEAT"
  params: []
- id: ccd_random
  label: CD Random
  kind: action
  command: "CCDRANDOM"
  params: []
- id: ccd_disp
  label: CD Display
  kind: action
  command: "CCDDISP"
  params: []
- id: ccd_ff
  label: CD FF
  kind: action
  command: "CCDFF"
  params: []
- id: ccd_rew
  label: CD REW
  kind: action
  command: "CCDREW"
  params: []
- id: ccd_op_cl
  label: CD Open/Close
  kind: action
  command: "CCDOP/CL"
  params: []
- id: ccd_num
  label: CD Number Key
  kind: action
  command: "CCD{digit}"
  params:
    - name: digit
      type: string
      description: '"0"-"9" single digit'
- id: ccd_d_mode
  label: CD D.MODE Key
  kind: action
  command: "CCD{operation}"
  params:
    - name: operation
      type: string
      description: 'Required literal "D.MODE", including the period; TX-DS898 column Yes.'

# RI Tape1 (CT1) - TX-DS898 Yes
- id: ct1_play_f
  label: TAPE1 Play Forward
  kind: action
  command: "CT1PLAY.F"
  params: []
- id: ct1_play_r
  label: TAPE1 Play Reverse
  kind: action
  command: "CT1PLAY.R"
  params: []
- id: ct1_stop
  label: TAPE1 Stop
  kind: action
  command: "CT1STOP"
  params: []
- id: ct1_rec_pause
  label: TAPE1 Rec/Pause
  kind: action
  command: "CT1RC/PAU"
  params: []
- id: ct1_ff
  label: TAPE1 FF
  kind: action
  command: "CT1FF"
  params: []
- id: ct1_rew
  label: TAPE1 REW
  kind: action
  command: "CT1REW"
  params: []

# RI Tape2 (CT2) - TX-DS898 Yes for base transport; REC has separate per-row Yes
- id: ct2_play_f
  label: TAPE2 Play Forward
  kind: action
  command: "CT2PLAY.F"
  params: []
- id: ct2_play_r
  label: TAPE2 Play Reverse
  kind: action
  command: "CT2PLAY.R"
  params: []
- id: ct2_stop
  label: TAPE2 Stop
  kind: action
  command: "CT2STOP"
  params: []
- id: ct2_rec_pause
  label: TAPE2 Rec/Pause
  kind: action
  command: "CT2RC/PAU"
  params: []
- id: ct2_ff
  label: TAPE2 FF
  kind: action
  command: "CT2FF"
  params: []
- id: ct2_rew
  label: TAPE2 REW
  kind: action
  command: "CT2REW"
  params: []
- id: ct2_op_cl
  label: TAPE2 Open/Close
  kind: action
  command: "CT2OP/CL"
  params: []
- id: ct2_skip_fwd
  label: TAPE2 >>I
  kind: action
  command: "CT2SKIP.F"
  params: []
- id: ct2_skip_rev
  label: TAPE2 I<<
  kind: action
  command: "CT2SKIP.R"
  params: []
- id: ct2_rec
  label: TAPE2 Rec
  kind: action
  command: "CT2REC"
  params: []

# RI Graphics Equalizer (CEQ) - TX-DS898 Yes
- id: ceq_preset
  label: Graphics Equalizer Preset
  kind: action
  command: "CEQ{operation}"
  params:
    - name: operation
      type: string
      description: 'Required literal "PRESET".'

# RI DAT (CDT) - TX-DS898 Yes
- id: cdt_play
  label: DAT Play
  kind: action
  command: "CDTPLAY"
  params: []
- id: cdt_rec_pause
  label: DAT Rec/Pause
  kind: action
  command: "CDTRC/PAU"
  params: []
- id: cdt_stop
  label: DAT Stop
  kind: action
  command: "CDTSTOP"
  params: []
- id: cdt_skip_fwd
  label: DAT >>I
  kind: action
  command: "CDTSKIP.F"
  params: []
- id: cdt_skip_rev
  label: DAT I<<
  kind: action
  command: "CDTSKIP.R"
  params: []
- id: cdt_ff
  label: DAT FF
  kind: action
  command: "CDTFF"
  params: []
- id: cdt_rew
  label: DAT REW
  kind: action
  command: "CDTREW"
  params: []

# RI DVD (CDV) - TX-DS898 Yes for the listed parameter rows
- id: cdv_operation
  label: DVD Player Operation
  kind: action
  command: "CDV{operation}"
  params:
    - name: operation
      type: string
      description: |
        Required literal parameter from TX-DS898-supported rows:
        "PWRON"=Power On, "PWROFF"=Power Off, "PLAY"=Play, "STOP"=Stop,
        "SKIP.F"=Skip Forward, "SKIP.R"=Skip Reverse, "FF"=Fast Forward,
        "REW"=Rewind, "PAUSE"=Pause, "LASTPLAY"=Last Play,
        "SUBTON/OFF"=Subtitle On/Off, "SUBTITLE"=Subtitle,
        "SETUP"=Setup, "TOPMENU"=Top Menu, "MENU"=Menu,
        "UP"=Up, "DOWN"=Down, "LEFT"=Left, "RIGHT"=Right,
        "ENTER"=Enter, "RETURN"=Return, "DISC.F"=Disc Forward,
        "DISC.R"=Disc Reverse, "AUDIO"=Audio, "RANDOM"=Random,
        "OP/CL"=Open/Close, "0" through "9"=Number Keys, "10"=Number 10,
        "SEARCH"=Search, "DISP"=Display, "REPEAT"=Repeat,
        "MEMORY"=Memory, "CLEAR"=Clear.
        ANGLE is not documented in the supplied source and is not an allowed parameter.

# RI MD (CMD) - TX-DS898 Yes for the listed parameter rows
- id: cmd_operation
  label: MD Recorder Operation
  kind: action
  command: "CMD{operation}"
  params:
    - name: operation
      type: string
      description: |
        Required literal parameter from TX-DS898-supported rows:
        "PLAY"=Play, "STOP"=Stop, "FF"=Fast Forward, "REW"=Rewind,
        "P.MODE"=Play Mode, "SKIP.F"=Skip Forward, "SKIP.R"=Skip Reverse,
        "PAUSE"=Pause, "REC"=Record, "MEMORY"=Memory, "DISP"=Display,
        "SCROLL"=Scroll, "M.SCAN"=Music Scan, "CLEAR"=Clear,
        "RANDOM"=Random, "REPEAT"=Repeat, "ENTER"=Enter, "EJECT"=Eject,
        "1" through "9"=Number Keys, "10/0"=Number 10/0,
        "nn/nnn"=--/--- Key (literal parameter as printed in the source).
        EJECT is included because the supplied source explicitly documents it.

# RI CD-R (CCR) - TX-DS898 Yes for the listed parameter rows
- id: ccr_operation
  label: CD-R Recorder Operation
  kind: action
  command: "CCR{operation}"
  params:
    - name: operation
      type: string
      description: |
        Required literal parameter from TX-DS898-supported rows:
        "P.MODE"=Play Mode, "PLAY"=Play, "STOP"=Stop,
        "SKIP.F"=Skip Forward, "SKIP.R"=Skip Reverse, "PAUSE"=Pause,
        "REC"=Record, "CLEAR"=Clear, "REPEAT"=Repeat, "RANDOM"=Random,
        "1" through "9"=Number Keys, "10/0"=Number 10/0,
        "nn/nnn"=--/--- Key (literal parameter as printed in the source),
        "SCROLL"=Scroll, "OP/CL"=Open/Close, "DISP"=Display,
        "MEMORY"=Memory.
        FF, REW and STBY are No for TX-DS898 and are not allowed parameters.

# Zone2 - protocol-wide definitions; TX-DS898 applicability is UNRESOLVED
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
- id: zone2_power_qstn
  label: Get Zone2 Power
  kind: query
  command: "ZPWQSTN"
  params: []
- id: zone2_muting_off
  label: Zone2 Muting Off
  kind: action
  command: "ZMT00"
  params: []
- id: zone2_muting_on
  label: Zone2 Muting On
  kind: action
  command: "ZMT01"
  params: []
- id: zone2_muting_qstn
  label: Get Zone2 Muting
  kind: query
  command: "ZMTQSTN"
  params: []
- id: zone2_volume_set
  label: Set Zone2 Volume
  kind: action
  command: "ZVL{level:02X}"
  params:
    - name: level
      type: integer
      description: 'UNRESOLVED: TX-DS898 Zone2 volume applicability and range. The protocol-wide source lists both 0-100 (hex 00-64) and 0-80 (hex 00-50), without a model mapping.'
- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  command: "ZVLUP"
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  command: "ZVLDOWN"
  params: []
- id: zone2_volume_qstn
  label: Get Zone2 Volume
  kind: query
  command: "ZVLQSTN"
  params: []
- id: zone2_select_input
  label: Zone2 Select Input
  kind: action
  command: "SLZ{input}"
  params:
    - name: input
      type: string
      description: |
        Two-character hexadecimal code. UNRESOLVED: TX-DS898 Zone2 selector
        applicability and supported input subset. Protocol-wide SLZ codes are
        "00"=VIDEO1, "01"=VIDEO2, "02"=VIDEO3, "03"=VIDEO4,
        "04"=VIDEO5, "05"=VIDEO6, "06"=VIDEO7, "10"=DVD,
        "20"=TAPE(1), "21"=TAPE2, "22"=PHONO, "23"=CD,
        "24"=FM, "25"=AM, "26"=TUNER, "27"=MUSIC SERVER,
        "28"=INTERNET RADIO, "29"=USB/USB(Front), "2A"=USB(Rear),
        "40"=Universal PORT, "30"=MULTI CH, "31"=XM, "32"=SIRIUS,
        "80"=SOURCE. This protocol-wide list does not establish TX-DS898 support.
- id: zone2_input_qstn
  label: Get Zone2 Selector
  kind: query
  command: "SLZQSTN"
  params: []

# Appended entries retain literal source Code tokens in command.
# Append the parameter directly to command, without a separator, before framing.
# RI CD additions - TX-DS898 column Yes
- id: ccd_number_ten
  label: CD Number 10 Key
  kind: action
  command: "CCD"
  params:
    - name: operation
      type: string
      description: 'Append required literal "10" to command.'
- id: ccd_disc_forward
  label: CD Disc Forward
  kind: action
  command: "CCD"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DISC.F" to command.'
- id: ccd_disc_reverse
  label: CD Disc Reverse
  kind: action
  command: "CCD"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DISC.R" to command.'
- id: ccd_disc_select
  label: CD Select Disc
  kind: action
  command: "CCD"
  params:
    - name: operation
      type: string
      description: 'Append one literal to command: "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6".'

# RI DVD addition - supplied complete source documents ANGLE; TX-DS898 Yes
- id: cdv_angle
  label: DVD Angle Key
  kind: action
  command: "CDV"
  params:
    - name: operation
      type: string
      description: 'Append required literal "ANGLE" to command.'

# Zone2 additions are protocol-wide; TX-DS898 applicability is UNRESOLVED.
- id: zone2_muting_toggle
  label: Zone2 Muting Wrap-Around
  kind: action
  command: "ZMT"
  params:
    - name: operation
      type: string
      description: 'Append required literal "TG" to command. UNRESOLVED: TX-DS898 applicability.'

# ZTN footnote: only works when main is ON and Zone2 is powered or variable.
- id: zone2_bass_set
  label: Set Zone2 Bass
  kind: action
  command: "ZTN"
  params:
    - name: operation
      type: string
      description: 'Append "Bxx" with xx replaced as documented: xx is "-A"..."00"..."+A"[-10...0...+10 2 step]. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_treble_set
  label: Set Zone2 Treble
  kind: action
  command: "ZTN"
  params:
    - name: operation
      type: string
      description: 'Append "Txx" with xx replaced as documented: xx is "-A"..."00"..."+A"[-10...0...+10 2 step]. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_bass_up
  label: Zone2 Bass Up
  kind: action
  command: "ZTN"
  params:
    - name: operation
      type: string
      description: 'Append required literal "BUP" to command; Bass Up (2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone2_bass_down
  label: Zone2 Bass Down
  kind: action
  command: "ZTN"
  params:
    - name: operation
      type: string
      description: 'Append required literal "BDOWN" to command; Bass Down (2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone2_treble_up
  label: Zone2 Treble Up
  kind: action
  command: "ZTN"
  params:
    - name: operation
      type: string
      description: 'Append required literal "TUP" to command; Treble Up (2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone2_treble_down
  label: Zone2 Treble Down
  kind: action
  command: "ZTN"
  params:
    - name: operation
      type: string
      description: 'Append required literal "TDOWN" to command; Treble Down (2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone2_tone_qstn
  label: Get Zone2 Tone
  kind: query
  command: "ZTN"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command; gets Zone2 Tone ("BxxTxx"). UNRESOLVED: TX-DS898 applicability.'

# Zone2 Balance (ZBL)
- id: zone2_balance_set
  label: Set Zone2 Balance
  kind: action
  command: "ZBL"
  params:
    - name: balance
      type: string
      description: 'Append xx to command: xx is "-A"..."00"..."+A"[-10...0...+10 2 step]. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_balance_up
  label: Zone2 Balance Up
  kind: action
  command: "ZBL"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command; Balance Up (to R 2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone2_balance_down
  label: Zone2 Balance Down
  kind: action
  command: "ZBL"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DOWN" to command; Balance Down (to L 2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone2_balance_qstn
  label: Get Zone2 Balance
  kind: query
  command: "ZBL"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone2 Tuning (TUZ); the TUNER function is shared by MAIN and ZONE.
- id: zone2_tuner_set_frequency
  label: Set Zone2 Tuning Frequency
  kind: action
  command: "TUZ"
  params:
    - name: frequency
      type: string
      description: 'Append nnnnn to command: FM nnn.nn MHz / AM nnnnn kHz, five decimal digits without separator. UNRESOLVED: frequency range and TX-DS898 applicability.'
- id: zone2_tuner_up
  label: Zone2 Tuning Frequency Up
  kind: action
  command: "TUZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command; Tuning Frequency Wrap-Around Up. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_tuner_down
  label: Zone2 Tuning Frequency Down
  kind: action
  command: "TUZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DOWN" to command; Tuning Frequency Wrap-Around Down. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_tuner_qstn
  label: Get Zone2 Tuning Frequency
  kind: query
  command: "TUZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone2 Preset (PRZ); tuner function shared, control separated.
- id: zone2_preset_set
  label: Set Zone2 Preset Number
  kind: action
  command: "PRZ"
  params:
    - name: preset
      type: string
      description: 'Append a two-character hexadecimal preset code to command. Source alternatives: "01"-"28", Preset No. 1 - 40 (In hexadecimal representation); "01"-"1E", Preset No. 1 - 30 (In hexadecimal representation). UNRESOLVED: TX-DS898 applicability and which range applies.'
- id: zone2_preset_up
  label: Zone2 Preset Wrap-Around Up
  kind: action
  command: "PRZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_preset_down
  label: Zone2 Preset Wrap-Around Down
  kind: action
  command: "PRZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DOWN" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_preset_qstn
  label: Get Zone2 Preset Number
  kind: query
  command: "PRZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone2 Listening Mode (LMZ)
- id: zone2_listening_mode_set
  label: Set Zone2 Listening Mode
  kind: action
  command: "LMZ"
  params:
    - name: mode
      type: string
      description: 'Append one literal code to command: "00"=STEREO, "01"=DIRECT, "0F"=MONO, "12"=MULTIPLEX, "87"=DVS (PL2), "88"=DVS (NEO6). UNRESOLVED: TX-DS898 applicability and supported subset.'

# Zone2 Late Night (LTZ)
- id: zone2_late_night_off
  label: Zone2 Late Night Off
  kind: action
  command: "LTZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "00" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_late_night_low
  label: Zone2 Late Night Low
  kind: action
  command: "LTZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "01" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_late_night_high
  label: Zone2 Late Night High
  kind: action
  command: "LTZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "02" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_late_night_up
  label: Zone2 Late Night Wrap-Around Up
  kind: action
  command: "LTZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_late_night_qstn
  label: Get Zone2 Late Night Level
  kind: query
  command: "LTZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone2 Re-EQ/Academy Filter (RAZ)
- id: zone2_re_eq_academy_off
  label: Zone2 Re-EQ And Academy Off
  kind: action
  command: "RAZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "00" to command; sets Both Off. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_re_eq_on
  label: Zone2 Re-EQ On
  kind: action
  command: "RAZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "01" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_academy_on
  label: Zone2 Academy On
  kind: action
  command: "RAZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "02" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_re_eq_academy_up
  label: Zone2 Re-EQ And Academy Wrap-Around Up
  kind: action
  command: "RAZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command; sets Re-EQ/Academy State Wrap-Around Up. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_re_eq_academy_qstn
  label: Get Zone2 Re-EQ And Academy State
  kind: query
  command: "RAZ"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Additional protocol-wide definitions; TX-DS898 applicability is UNRESOLVED.
# Retain literal source Code tokens; append each parameter without a separator.
# Zone2 Network (Network Model Only); function shared, control separated.
- id: zone2_network_operation
  label: Zone2 Network Operation
  kind: action
  command: "NTZ"
  params:
    - name: operation
      type: string
      description: 'Append one literal to command: "PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN". "CHUP" and "CHDN" are for iRadio. Network Model Only. UNRESOLVED: TX-DS898 applicability.'
- id: zone2_internet_radio_preset_set
  label: Set Zone2 Internet Radio Preset
  kind: action
  command: "NPZ"
  params:
    - name: preset
      type: string
      description: 'Append a hexadecimal preset code to command: "01"-"28", sets Preset No. 1 - 40 (In hexadecimal representation). Network Model Only. UNRESOLVED: TX-DS898 applicability.'

# Zone3 Power (PW3)
- id: zone3_power_standby
  label: Zone3 Standby
  kind: action
  command: "PW3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "00" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_power_on
  label: Zone3 On
  kind: action
  command: "PW3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "01" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_power_qstn
  label: Get Zone3 Power
  kind: query
  command: "PW3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone3 Muting (MT3)
- id: zone3_muting_off
  label: Zone3 Muting Off
  kind: action
  command: "MT3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "00" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_muting_on
  label: Zone3 Muting On
  kind: action
  command: "MT3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "01" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_muting_toggle
  label: Zone3 Muting Wrap-Around
  kind: action
  command: "MT3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "TG" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_muting_qstn
  label: Get Zone3 Muting
  kind: query
  command: "MT3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone3 Volume (VL3)
- id: zone3_volume_set
  label: Set Zone3 Volume
  kind: action
  command: "VL3"
  params:
    - name: level
      type: string
      description: 'Append a hexadecimal volume code to command. Source alternatives: "00"-"64", Volume Level 0–100 (In hexadecimal representation); "00"-"50", Volume Level 0–80 (In hexadecimal representation). UNRESOLVED: TX-DS898 applicability and which range applies.'
- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  command: "VL3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  command: "VL3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DOWN" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_volume_qstn
  label: Get Zone3 Volume
  kind: query
  command: "VL3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone3 Tone (TN3)
- id: zone3_bass_set
  label: Set Zone3 Bass
  kind: action
  command: "TN3"
  params:
    - name: operation
      type: string
      description: 'Append "Bxx" with xx replaced as documented: xx is"-A"..."00"..."+A"[-10...0...+10 2 step]. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_treble_set
  label: Set Zone3 Treble
  kind: action
  command: "TN3"
  params:
    - name: operation
      type: string
      description: 'Append "Txx" with xx replaced as documented: xx is"-A"..."00"..."+A"[-10...0...+10 2 step]. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_bass_up
  label: Zone3 Bass Up
  kind: action
  command: "TN3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "BUP" to command; sets Bass Up (2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone3_bass_down
  label: Zone3 Bass Down
  kind: action
  command: "TN3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "BDOWN" to command; sets Bass Down (2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone3_treble_up
  label: Zone3 Treble Up
  kind: action
  command: "TN3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "TUP" to command; sets Treble Up (2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone3_treble_down
  label: Zone3 Treble Down
  kind: action
  command: "TN3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "TDOWN" to command; sets Treble Down (2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone3_tone_qstn
  label: Get Zone3 Tone
  kind: query
  command: "TN3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command; gets Zone3 Tone ("BxxTxx"). UNRESOLVED: TX-DS898 applicability.'

# Zone3 Balance (BL3)
- id: zone3_balance_set
  label: Set Zone3 Balance
  kind: action
  command: "BL3"
  params:
    - name: balance
      type: string
      description: 'Append xx to command: xx is"-A"..."00"..."+A"[-10...0...+10 2 step]. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_balance_up
  label: Zone3 Balance Up
  kind: action
  command: "BL3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command; sets Balance Up (to R 2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone3_balance_down
  label: Zone3 Balance Down
  kind: action
  command: "BL3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DOWN" to command; sets Balance Down (to L 2 Step). UNRESOLVED: TX-DS898 applicability.'
- id: zone3_balance_qstn
  label: Get Zone3 Balance
  kind: query
  command: "BL3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone3 Selector (SL3)
- id: zone3_select_input
  label: Zone3 Select Input
  kind: action
  command: "SL3"
  params:
    - name: input
      type: string
      description: |
        Append one literal code to command:
        "00"=VIDEO1 VCR/DVR, "01"=VIDEO2 CBL/SAT,
        "02"=VIDEO3 GAME/TV GAME, "03"=VIDEO4 AUX1(AUX),
        "04"=VIDEO5 AUX2, "05"=VIDEO6, "06"=VIDEO7, "10"=DVD,
        "20"=TAPE(1) TV/TAPE, "21"=TAPE2, "22"=PHONO, "23"=CD,
        "24"=FM, "25"=AM, "26"=TUNER, "27"=MUSIC SERVER,
        "28"=INTERNET RADIO, "29"=USB/USB(Front), "2A"=USB(Rear),
        "40"=Universal PORT, "30"=MULTI CH, "31"=XM, "32"=SIRIUS,
        "80"=SOURCE.
        UNRESOLVED: TX-DS898 applicability and supported input subset.
- id: zone3_input_qstn
  label: Get Zone3 Selector
  kind: query
  command: "SL3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone3 Tuning (TU3); tuner function shared, control separated.
- id: zone3_tuner_set_frequency
  label: Set Zone3 Tuning Frequency
  kind: action
  command: "TU3"
  params:
    - name: frequency
      type: string
      description: 'Append nnnnn to command: sets Directly Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz). UNRESOLVED: frequency range and TX-DS898 applicability.'
- id: zone3_tuner_up
  label: Zone3 Tuning Frequency Up
  kind: action
  command: "TU3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command; sets Tuning Frequency Wrap-Around Up. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_tuner_down
  label: Zone3 Tuning Frequency Down
  kind: action
  command: "TU3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DOWN" to command; sets Tuning Frequency Wrap-Around Down. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_tuner_qstn
  label: Get Zone3 Tuning Frequency
  kind: query
  command: "TU3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone3 Preset (PR3)
- id: zone3_preset_set
  label: Set Zone3 Preset Number
  kind: action
  command: "PR3"
  params:
    - name: preset
      type: string
      description: 'Append a hexadecimal preset code to command. Source alternatives: "01"-"28", sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E", sets Preset No. 1-30 (In hexadecimal representation). UNRESOLVED: TX-DS898 applicability and which range applies.'
- id: zone3_preset_up
  label: Zone3 Preset Wrap-Around Up
  kind: action
  command: "PR3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_preset_down
  label: Zone3 Preset Wrap-Around Down
  kind: action
  command: "PR3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DOWN" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_preset_qstn
  label: Get Zone3 Preset Number
  kind: query
  command: "PR3"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone3 Network (Network Model Only)
- id: zone3_network_operation
  label: Zone3 Network Operation
  kind: action
  command: "NT3"
  params:
    - name: operation
      type: string
      description: 'Append one literal to command: "PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN". "CHUP" and "CHDN" are for iRadio. Network Model Only. UNRESOLVED: TX-DS898 applicability.'
- id: zone3_internet_radio_preset_set
  label: Set Zone3 Internet Radio Preset
  kind: action
  command: "NP3"
  params:
    - name: preset
      type: string
      description: 'Append a hexadecimal preset code to command: "01"-"28", sets Preset No. 1-40 (In hexadecimal representation). Network Model Only. UNRESOLVED: TX-DS898 applicability.'

# Zone4 Power (PW4)
- id: zone4_power_standby
  label: Zone4 Standby
  kind: action
  command: "PW4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "00" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_power_on
  label: Zone4 On
  kind: action
  command: "PW4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "01" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_power_qstn
  label: Get Zone4 Power
  kind: query
  command: "PW4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone4 Muting (MT4)
- id: zone4_muting_off
  label: Zone4 Muting Off
  kind: action
  command: "MT4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "00" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_muting_on
  label: Zone4 Muting On
  kind: action
  command: "MT4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "01" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_muting_toggle
  label: Zone4 Muting Wrap-Around
  kind: action
  command: "MT4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "TG" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_muting_qstn
  label: Get Zone4 Muting
  kind: query
  command: "MT4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone4 Volume (VL4)
- id: zone4_volume_set
  label: Set Zone4 Volume
  kind: action
  command: "VL4"
  params:
    - name: level
      type: string
      description: 'Append a hexadecimal volume code to command. Source alternatives: "00"-"64", Volume Level 0–100 (In hexadecimal representation); "00"-"50", Volume Level 0–80 (In hexadecimal representation). UNRESOLVED: TX-DS898 applicability and which range applies.'
- id: zone4_volume_up
  label: Zone4 Volume Up
  kind: action
  command: "VL4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_volume_down
  label: Zone4 Volume Down
  kind: action
  command: "VL4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DOWN" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_volume_qstn
  label: Get Zone4 Volume
  kind: query
  command: "VL4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone4 Selector (SL4)
- id: zone4_select_input
  label: Zone4 Select Input
  kind: action
  command: "SL4"
  params:
    - name: input
      type: string
      description: |
        Append one literal code to command:
        "00"=VIDEO1 VCR/DVR, "01"=VIDEO2 CBL/SAT,
        "02"=VIDEO3 GAME/TV GAME, "03"=VIDEO4 AUX1(AUX),
        "04"=VIDEO5 AUX2, "05"=VIDEO6, "06"=VIDEO7, "10"=DVD,
        "20"=TAPE(1) TV/TAPE, "21"=TAPE2, "22"=PHONO, "23"=CD,
        "24"=FM, "25"=AM, "26"=TUNER, "27"=MUSIC SERVER,
        "28"=INTERNET RADIO, "29"=USB/USB(Front), "2A"=USB(Rear),
        "40"=Universal PORT, "30"=MULTI CH, "31"=XM, "32"=SIRIUS,
        "80"=SOURCE.
        UNRESOLVED: TX-DS898 applicability and supported input subset.
- id: zone4_input_qstn
  label: Get Zone4 Selector
  kind: query
  command: "SL4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone4 Tuning (TU4); tuner function shared, control separated.
- id: zone4_tuner_set_frequency
  label: Set Zone4 Tuning Frequency
  kind: action
  command: "TU4"
  params:
    - name: frequency
      type: string
      description: 'Append nnnnn to command: sets Directly Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz). UNRESOLVED: frequency range and TX-DS898 applicability.'
- id: zone4_tuner_up
  label: Zone4 Tuning Frequency Up
  kind: action
  command: "TU4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command; sets Tuning Frequency Wrap-Around Up. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_tuner_down
  label: Zone4 Tuning Frequency Down
  kind: action
  command: "TU4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DOWN" to command; sets Tuning Frequency Wrap-Around Down. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_tuner_qstn
  label: Get Zone4 Tuning Frequency
  kind: query
  command: "TU4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone4 Preset (PR4)
- id: zone4_preset_set
  label: Set Zone4 Preset Number
  kind: action
  command: "PR4"
  params:
    - name: preset
      type: string
      description: 'Append a hexadecimal preset code to command. Source alternatives: "01"-"28", sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E", sets Preset No. 1-30 (In hexadecimal representation). UNRESOLVED: TX-DS898 applicability and which range applies.'
- id: zone4_preset_up
  label: Zone4 Preset Wrap-Around Up
  kind: action
  command: "PR4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "UP" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_preset_down
  label: Zone4 Preset Wrap-Around Down
  kind: action
  command: "PR4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "DOWN" to command. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_preset_qstn
  label: Get Zone4 Preset Number
  kind: query
  command: "PR4"
  params:
    - name: operation
      type: string
      description: 'Append required literal "QSTN" to command. UNRESOLVED: TX-DS898 applicability.'

# Zone4 Network (Network Model Only)
- id: zone4_network_operation
  label: Zone4 Network Operation
  kind: action
  command: "NT4"
  params:
    - name: operation
      type: string
      description: 'Append one literal to command: "PLAY", "STOP", "PAUSE", "TRUP", "TRDN". Network Model Only. UNRESOLVED: TX-DS898 applicability.'
- id: zone4_internet_radio_preset_set
  label: Set Zone4 Internet Radio Preset
  kind: action
  command: "NP4"
  params:
    - name: preset
      type: string
      description: 'Append a hexadecimal preset code to command: "01"-"28", sets Preset No. 1-40 (In hexadecimal representation). Network Model Only. UNRESOLVED: TX-DS898 applicability.'

# Dock via RI (CDS); supplied table has no per-model support column.
- id: cds_operation
  label: Docking Station Operation
  kind: action
  command: "CDS"
  params:
    - name: operation
      type: string
      description: |
        Append one literal parameter to command:
        "PWRON"=sets Dock On, "PWROFF"=sets Dock Standby,
        "PLY/RES"=PLAY/RESUME Key, "STOP"=STOP Key,
        "SKIP.F"=TRACK UP Key, "SKIP.R"=TRACK DOWN Key,
        "PAUSE"=PAUSE Key, "PLY/PAU"=PLAY/PAUSE Key,
        "FF"=FF Key, "REW"=FR Key,
        "ALBUM+"=ALBUM UP Key, "ALBUM-"=ALBUM DOWN Key,
        "PLIST+"=PLAYLIST UP Key, "PLIST-"=PLAYLIST DOWN Key,
        "CHAPT+"=CHAPTER UP Key, "CHAPT-"=CHAPTER DOWN Key,
        "RANDOM"=SHUFFLE Key, "REPEAT"=REPEAT Key,
        "MUTE"=MUTE Key, "BLIGHT"=BACKLIGHT Key,
        "MENU"=MENU Key, "ENTER"=SELECT Key,
        "UP"=CURSOR UP Key, "DOWN"=CURSOR DOWN Key.
        UNRESOLVED: TX-DS898 applicability.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["00", "01"]
  description: '"00"=Standby, "01"=On'
  query_command: "PWRQSTN"
- id: muting_state
  type: enum
  values: ["00", "01"]
  description: '"00"=Off, "01"=On'
  query_command: "AMTQSTN"
- id: volume_level
  type: integer
  description: Volume 0-100 (hex 0x00-0x64)
  query_command: "MVLQSTN"
- id: input_selector
  type: string
  description: Current input selector code (00/01/02/03/04/10/20/22/23/24/25 per TX-DS898 support)
  query_command: "SLIQSTN"
- id: recout_selector
  type: string
  description: Current RECOUT selector code
  query_command: "SLRQSTN"
- id: audio_selector
  type: string
  description: Current audio selector code (AUTO/MULTI-CH/ANALOG)
  query_command: "SLAQSTN"
- id: display_mode
  type: string
  description: '"00"=Selector+Volume, "01"=Selector+Listening Mode'
  query_command: "DIFQSTN"
- id: dimmer_level
  type: enum
  values: ["00", "01", "02", "03"]
  description: '"00"=Bright, "01"=Dim, "02"=Dark, "03"=Shut-Off'
  query_command: "DIMQSTN"
- id: sleep_timer
  type: integer
  description: 'Sleep time in minutes; source specifies 1-90 and the OFF command. UNRESOLVED: wire representation of the off-state reply is not specified.'
  query_command: "SLPQSTN"
- id: listening_mode
  type: string
  description: Current listening mode code
  query_command: "LMDQSTN"
- id: late_night_level
  type: enum
  values: ["00", "01", "02"]
  description: '"00"=Off, "01"=Low, "02"=High'
  query_command: "LTNQSTN"
- id: re_eq_state
  type: enum
  values: ["00", "01"]
  description: '"00"=Off, "01"=On'
  query_command: "RASQSTN"
- id: cinema_filter_state
  type: string
  description: 'UNRESOLVED: no TX-DS898 Cinema Filter feedback definition; the source marks this RAS variant No for TX-DS898. Retained id does not establish model support; RAS feedback for this model is Re-EQ.'
- id: tuner_frequency
  type: string
  description: Current tuning frequency (five decimal digits; FM nnn.nn MHz / AM nnnnn kHz without separator)
  query_command: "TUNQSTN"
- id: preset_number
  type: integer
  description: Current preset 1-40
  query_command: "PRSQSTN"
- id: zone2_power_state
  type: enum
  values: ["00", "01"]
  description: 'Protocol-wide "00"=Standby, "01"=On; UNRESOLVED: TX-DS898 applicability.'
  query_command: "ZPWQSTN"
- id: zone2_volume_level
  type: integer
  description: 'UNRESOLVED: TX-DS898 Zone2 volume applicability and range. Protocol-wide alternatives are 0-100 (hex 00-64) and 0-80 (hex 00-50).'
  query_command: "ZVLQSTN"
- id: zone2_input_selector
  type: string
  description: 'Zone2 selector code; UNRESOLVED: TX-DS898 applicability and supported input subset.'
  query_command: "SLZQSTN"
```

## Variables
```yaml
# Front tone (TFR), Front Wide (TFW), Front High (TFH), Center (TCT), Surround (TSR),
# Surround Back (TSB), Subwoofer (TSW) are documented protocol-wide but TX-DS898
# column shows "No" across the board - not emitted.
# UNRESOLVED: Zone2 tone (ZTN) applicability to TX-DS898 is not established
# by the supplied protocol-wide Zone2 table.
```

## Events
```yaml
# Receiver sends unsolicited Status Message to controller when status changes.
# Example: user changes input on receiver -> receiver sends "SLI03" to controller.
# Receiver responds to a command within 50msec.
# RS-232C device-to-controller example ends with [EOF] (0x1A).
# Controller-to-device RS-232C commands end with [CR], [LF], or [CR][LF].
# UNRESOLVED: the RS-232C standby example uses SST00 rather than PWR00;
# this source inconsistency does not establish a separate SST query or action.
# Protocol-wide Ethernet documentation requires a message interval >50msec
# and continuous connection for status notices; TX-DS898 Ethernet applicability
# is UNRESOLVED.
```

## Macros
```yaml
# No explicit multi-step macro sequences defined in source.
# Receiver responds to a command within 50msec.
# Controller-to-device RS-232C end character: [CR], [LF], or [CR][LF].
# Protocol-wide eISCP end characters: [EOF], [EOF][CR], or [EOF][CR][LF],
# depending on model. Ethernet message interval must be >50msec.
# UNRESOLVED: TX-DS898 Ethernet applicability and eISCP end-character variant.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - 'Source Zone2 ZVL footnote: only works when main is ON; TX-DS898 applicability is UNRESOLVED.'
```

## Notes
ISCP message format: `!1{command}{parameter}[CR]` for controller-to-device RS-232C messages, where `!1` = start character + unit type ("1" for Receiver). Command end character: `[CR]`, `[LF]`, or `[CR][LF]`. The source device-to-controller RS-232C example ends with `[EOF]` (0x1A). Its standby example uses `SST00`; the relationship to the documented `PWR` status command is UNRESOLVED and does not justify an invented `SST` command.

The protocol-wide eISCP/Ethernet format has a header beginning with ASCII `ISCP`, followed by Header Size and Data Size as big-endian fields, Version 0x01 and Reserved 0x000000. Current Header Size is 0x00000010, but implementations must account for the transmitted header size. Data Size is the size of the following ISCP data. The data end character is `[EOF]`, `[EOF][CR]`, or `[EOF][CR][LF]`, depending on model. TX-DS898 Ethernet applicability and its eISCP terminator variant are UNRESOLVED.

Hardware: 3-wire RS-232C, DB9 female (pin 2=TX, pin 3=RX, pin 5=GND). Straight-thru cable. 9600/8/N/1, no flow control. The source's protocol-wide Ethernet section specifies default port 60128, configurable 49152-65535 via the receiver setup menu followed by entering standby; one TCP connection at a time, held continuously for unsolicited status notifications, and message interval greater than 50msec. These Ethernet details do not establish Ethernet support or defaults for TX-DS898. Authentication is UNRESOLVED; absence of an authentication procedure in the source is not evidence of authentication type none.

The TX-DS898 support column ("TX-DS898 DTR-8.2") shows Yes for PWR/AMT/MVL/SLI/SLR/SLA/SLP/SLC/DIF display mode/DIM/OSD/LTN/Re-EQ RAS/LMD/TUN/PRS/RDS/PTS/TPS and supported RI-device rows for CCD/CT1/CT2/CEQ/CDT/CDV/CMD/CCR. DIF wrap-around uses parameter `UP` according to footnote *1. LMD `03` FILM is No for TX-DS898. The Cinema Filter RAS variant is No for TX-DS898; only the Re-EQ interpretation is supported. TUNQSTN and PRSQSTN are Yes for TX-DS898 and remain represented by their existing query actions. RDS/PTS/TPS are restricted to RDS models; the source limits RDS information on RBDS models to RT information. Regional applicability is UNRESOLVED.

The supplied RI DVD list documents the supported CDV parameter rows represented above, but does not document ANGLE. The MD list explicitly documents EJECT, so that supported parameter is retained. The CD display-mode parameter is `D.MODE`, including the period. Code and parameter are concatenated without a separator before applying the transport framing.

The supplied Zone2 tables are protocol-wide and have no TX-DS898 support column. They list two alternative ZVL ranges without a model mapping and an SLZ input list extending beyond TX-DS898 main-zone capabilities. Their TX-DS898 applicability, volume range and selector subset remain UNRESOLVED. The main-on footnote follows ZVL; the source does not establish a blanket main-on interlock for every Zone2 command. The existing Zone2 action and query ids are preserved without claiming model-specific confirmation.

Do not infer support for HDO/RES/ISF HDMI outputs, Audyssey (ADY/ADQ/ADV), Dolby Volume (DVL), TFR/TCT/TSR/TSB/TSW/TFH/TFW tone commands, SPA/SPB Speaker A/B, MEM, IFA/IFV information, TGA/TGB/TGC triggers, VOS, unsupported network/tuner functions, or SLI MULTI CH from protocol-wide descriptions. The 2003-08-22 revision 1.00 first edition explicitly includes TX-DS898.

<!-- UNRESOLVED: TX-DS898 firmware version compatibility ranges not stated in source. -->
<!-- UNRESOLVED: TX-DS898 Ethernet applicability is not established; no separate eISCP protocol group emitted. -->
<!-- UNRESOLVED: TX-DS898 applicability of the protocol-wide Zone2/Zone3/Zone4 definitions is not established. -->
<!-- Audyssey 2EQ/MultEQ, Dynamic EQ, Dynamic Volume, Dolby Volume, MEM, Audio Info (IFA), Video Info (IFV), 12V Trigger (TGA/TGB/TGC), HDMI Output Selector (HDO), Monitor Out Resolution (RES), and ISF Mode show No for TX-DS898. Not emitted. -->

Amendment clarification: the complete source supplied for this amendment explicitly documents CDV parameter `ANGLE` with Yes in the TX-DS898 column. The appended `cdv_angle` action represents it separately; the preserved original entry and note contain an outdated exclusion. The source also documents CCD `10`, `DISC.F`, `DISC.R`, and `DISC1` through `DISC6` for TX-DS898. Appended actions retain the source's literal three-character Code in `command`; their parameter descriptions specify the suffix to concatenate without a separator. Zone2 additions represent protocol-wide documentation only, with TX-DS898 applicability UNRESOLVED. ZTN has its own condition: main is ON and Zone2 is powered or variable.

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T15:35:32.559Z
last_checked_at: 2026-10-07T17:31:30.390Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:31:30.390Z
matched_actions: 239
action_count: 239
confidence: medium
summary: "All 239 action units match source tokens with correct TX-DS898 column support and shapes; serial transport verified, auth honestly unresolved; Zone2-4 applicability caveated. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TX-DS898 Ethernet applicability is not established by the supplied source."
- "no eISCP header-only protocol block emitted; defer to a separate protocol group if needed."
- "TX-DS898 Zone2 volume applicability and range. The protocol-wide source lists both 0-100 (hex 00-64) and 0-80 (hex 00-50), without a model mapping.'"
- "TX-DS898 Zone2 selector"
- "TX-DS898 applicability.'"
- "frequency range and TX-DS898 applicability.'"
- "TX-DS898 applicability and which range applies.'"
- "TX-DS898 applicability and supported subset.'"
- "TX-DS898 applicability and supported input subset."
- "TX-DS898 applicability."
- "wire representation of the off-state reply is not specified.'"
- "no TX-DS898 Cinema Filter feedback definition; the source marks this RAS variant No for TX-DS898. Retained id does not establish model support; RAS feedback for this model is Re-EQ.'"
- "TX-DS898 Zone2 volume applicability and range. Protocol-wide alternatives are 0-100 (hex 00-64) and 0-80 (hex 00-50).'"
- "TX-DS898 applicability and supported input subset.'"
- "Zone2 tone (ZTN) applicability to TX-DS898 is not established"
- "the RS-232C standby example uses SST00 rather than PWR00;"
- "TX-DS898 Ethernet applicability and eISCP end-character variant."
- "TX-DS898 firmware version compatibility ranges not stated in source."
- "TX-DS898 Ethernet applicability is not established; no separate eISCP protocol group emitted."
- "TX-DS898 applicability of the protocol-wide Zone2/Zone3/Zone4 definitions is not established."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
