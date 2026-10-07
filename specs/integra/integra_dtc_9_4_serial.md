---
spec_id: admin/integra-dtc-9-4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DTC-9.4 Control Spec"
manufacturer: Integra
model_family: DTC-9.4
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DTC-9.4
    - DTC-7
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T10:44:09.294Z
last_checked_at: 2026-10-07T21:07:30.131Z
generated_at: 2026-10-07T21:07:30.131Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-10-07T21:07:30.131Z
  matched_actions: 377
  action_count: 377
  confidence: medium
  summary: "All 377 action units match source ISCP codes and transport values are supported; auth is UNRESOLVED; many rows are marked No for DTC-9.4 (disclosed in spec)."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Integra DTC-9.4 Control Spec

## Summary
AV receiver with RS-232C (3-wire, 9600/8/N/1) and TCP/Ethernet (eISCP, port 60128) control interfaces. Supports multi-zone operation (MAIN + Zone 2/3/4), audio/video source selection, volume/tone/balance, listening-mode and surround processing, FM/AM tuner, RDS, network/USB playback, RI-dock control, and 12V triggers A/B/C. ISCP messages are 3-character command codes with variable-length hex parameters, framed as `!1XXX[param][CR]` on RS-232C and wrapped in the eISCP header on TCP.

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 60128  # eISCP default; receiver allows 49152-65535 via setup menu
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
# ISCP message format: !1{cmd}{param}[CR] over RS-232C; same payload wrapped
# in eISCP header (header 0x10, data size BE, version 0x01) over TCP/60128.
# Each "Yes" in source column for DTC-9.4 included as separate action.
# Parameter ranges shown as {param} placeholders.

# ----- Main system power -----
- id: power_on
  label: Power On
  kind: action
  command: "PWR01"
  params: []

- id: power_off
  label: Power Standby
  kind: action
  command: "PWR00"
  params: []

- id: power_qstn
  label: Get Power Status
  kind: query
  command: "PWRQSTN"
  params: []

# ----- Audio muting -----
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

- id: amt_toggle
  label: Audio Muting Toggle
  kind: action
  command: "AMTTG"
  params: []

- id: amt_qstn
  label: Get Audio Muting State
  kind: query
  command: "AMTQSTN"
  params: []

# ----- Speaker A/B -----
- id: spa_off
  label: Speaker A Off
  kind: action
  command: "SPA00"
  params: []

- id: spa_on
  label: Speaker A On
  kind: action
  command: "SPA01"
  params: []

- id: spb_off
  label: Speaker B Off
  kind: action
  command: "SPB00"
  params: []

- id: spb_on
  label: Speaker B On
  kind: action
  command: "SPB01"
  params: []

# ----- Master volume -----
- id: mvl_set
  label: Set Master Volume
  kind: action
  command: "MVL{level}"
  params:
    - name: level
      type: string
      description: Hex 00-64 (0-100)

- id: mvl_up
  label: Master Volume Up
  kind: action
  command: "MVLUP"
  params: []

- id: mvl_down
  label: Master Volume Down
  kind: action
  command: "MVLDOWN"
  params: []

- id: mvl_qstn
  label: Get Master Volume
  kind: query
  command: "MVLQSTN"
  params: []

# ----- Sleep timer -----
- id: slp_set
  label: Set Sleep Timer
  kind: action
  command: "SLP{time}"
  params:
    - name: time
      type: string
      description: Hex 01-5A (1-90 min) or OFF

- id: slp_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []

- id: slp_up
  label: Sleep Timer Up
  kind: action
  command: "SLPUP"
  params: []

- id: slp_qstn
  label: Get Sleep Timer
  kind: query
  command: "SLPQSTN"
  params: []

# ----- Speaker level calibration (test tone) -----
- id: slc_test
  label: Speaker Calibration Test
  kind: action
  command: "SLCTEST"
  params: []

- id: slc_chsel
  label: Speaker Calibration Channel Select
  kind: action
  command: "SLCCHSEL"
  params: []

- id: slc_up
  label: Speaker Calibration Level Up
  kind: action
  command: "SLCUP"
  params: []

- id: slc_down
  label: Speaker Calibration Level Down
  kind: action
  command: "SLCDOWN"
  params: []

# ----- Display info / mode -----
- id: dif00
  label: Display Program Format
  kind: action
  command: "DIF00"
  params: []

- id: dif01
  label: Display Digital Input Position
  kind: action
  command: "DIF01"
  params: []

- id: dif02
  label: Display Digital Format Position
  kind: action
  command: "DIF02"
  params: []

- id: dif03
  label: Display Bass Level
  kind: action
  command: "DIF03"
  params: []

- id: dif04
  label: Display Treble Level
  kind: action
  command: "DIF04"
  params: []

- id: dif_mode_set
  label: Set Display Mode
  kind: action
  command: "DIF{value}"
  params:
    - name: value
      type: string
      description: "00=Selector+Volume, 01=Selector+Listening Mode, 02=Digital Format, 03=Video Format"

- id: dif_mode_up
  label: Display Mode Up
  kind: action
  command: "DIFTG"
  params: []

- id: dif_mode_qstn
  label: Get Display Mode
  kind: query
  command: "DIFQSTN"
  params: []

# ----- Dimmer -----
- id: dim_bright
  label: Dimmer Bright
  kind: action
  command: "DIM00"
  params: []

- id: dim_dim
  label: Dimmer Dim
  kind: action
  command: "DIM01"
  params: []

- id: dim_dark
  label: Dimmer Dark
  kind: action
  command: "DIM02"
  params: []

- id: dim_shutoff
  label: Dimmer Shut-Off
  kind: action
  command: "DIM03"
  params: []

- id: dim_up
  label: Dimmer Up
  kind: action
  command: "DIMDIM"
  params: []

- id: dim_qstn
  label: Get Dimmer Level
  kind: query
  command: "DIMQSTN"
  params: []

# ----- OSD / Setup navigation -----
- id: osd_menu
  label: Setup Menu
  kind: action
  command: "OSDMENU"
  params: []

- id: osd_up
  label: Setup Up
  kind: action
  command: "OSDUP"
  params: []

- id: osd_down
  label: Setup Down
  kind: action
  command: "OSDDOWN"
  params: []

- id: osd_right
  label: Setup Right
  kind: action
  command: "OSDRIGHT"
  params: []

- id: osd_left
  label: Setup Left
  kind: action
  command: "OSDLEFT"
  params: []

- id: osd_enter
  label: Setup Enter
  kind: action
  command: "OSDENTER"
  params: []

- id: osd_exit
  label: Setup Exit
  kind: action
  command: "OSDEXIT"
  params: []

# ----- Audio / video information readouts -----
- id: ifa_qstn
  label: Get Audio Information
  kind: query
  command: "IFAQSTN"
  params: []

- id: ifv_qstn
  label: Get Video Information
  kind: query
  command: "IFVQSTN"
  params: []

# ----- Input selector -----
- id: sli_set
  label: Input Selector
  kind: action
  command: "SLI{input}"
  params:
    - name: input
      type: string
      description: |
        00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4, 04=VIDEO5,
        10=DVD, 20=TAPE1, 23=CD, 24=FM, 25=AM, 26=TUNER,
        27=MUSIC SERVER, 28=INTERNET RADIO, 30=MULTI CH

- id: sli_up
  label: Input Selector Up
  kind: action
  command: "SLIUP"
  params: []

- id: sli_down
  label: Input Selector Down
  kind: action
  command: "SLIDOWN"
  params: []

- id: sli_qstn
  label: Get Input Selector
  kind: query
  command: "SLIQSTN"
  params: []

# ----- RECOUT selector -----
- id: slr_set
  label: RECOUT Selector
  kind: action
  command: "SLR{source}"
  params:
    - name: source
      type: string
      description: |
        Same codes as SLI plus 7F=OFF, 80=SOURCE

- id: slr_qstn
  label: Get RECOUT Selector
  kind: query
  command: "SLRQSTN"
  params: []

# ----- Audio selector -----
- id: sla_set
  label: Audio Selector
  kind: action
  command: "SLA{mode}"
  params:
    - name: mode
      type: string
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG"

- id: sla_up
  label: Audio Selector Up
  kind: action
  command: "SLAUP"
  params: []

- id: sla_qstn
  label: Get Audio Selector
  kind: query
  command: "SLAQSTN"
  params: []

# ----- 12V triggers -----
- id: tga_off
  label: 12V Trigger A Off
  kind: action
  command: "TGA00"
  params: []

- id: tga_on
  label: 12V Trigger A On
  kind: action
  command: "TGA01"
  params: []

- id: tgb_off
  label: 12V Trigger B Off
  kind: action
  command: "TGB00"
  params: []

- id: tgb_on
  label: 12V Trigger B On
  kind: action
  command: "TGB01"
  params: []

- id: tgc_off
  label: 12V Trigger C Off
  kind: action
  command: "TGC00"
  params: []

- id: tgc_on
  label: 12V Trigger C On
  kind: action
  command: "TGC01"
  params: []

# ----- Listening mode -----
- id: lmd_set
  label: Listening Mode
  kind: action
  command: "LMD{mode}"
  params:
    - name: mode
      type: string
      description: |
        00=STEREO, 01=DIRECT, 02=SURROUND, 04=THX, 07=MONO MOVIE,
        08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC,
        0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7,
        0F=MONO, 11=PURE AUDIO, 80=PLII/PLIIx Movie,
        81=PLII/PLIIx Music, 82=Neo:6 Cinema, 83=Neo:6 Music,
        84=PLII/PLIIx THX Cinema, 85=Neo:6 THX Cinema

- id: lmd_up
  label: Listening Mode Up
  kind: action
  command: "LMDUP"
  params: []

- id: lmd_down
  label: Listening Mode Down
  kind: action
  command: "LMDDOWN"
  params: []

- id: lmd_qstn
  label: Get Listening Mode
  kind: query
  command: "LMDQSTN"
  params: []

# ----- Late Night -----
- id: ltn_off
  label: Late Night Off
  kind: action
  command: "LTN00"
  params: []

- id: ltn_low
  label: Late Night Low
  kind: action
  command: "LTN01"
  params: []

- id: ltn_high
  label: Late Night High
  kind: action
  command: "LTN02"
  params: []

- id: ltn_up
  label: Late Night Up
  kind: action
  command: "LTNUP"
  params: []

- id: ltn_qstn
  label: Get Late Night
  kind: query
  command: "LTNQSTN"
  params: []

# ----- Re-EQ / Academy filter -----
- id: ras_both_off
  label: Re-EQ/Academy Both Off
  kind: action
  command: "RAS00"
  params: []

- id: ras_reeq_on
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
  label: Re-EQ/Academy Up
  kind: action
  command: "RASUP"
  params: []

- id: ras_qstn
  label: Get Re-EQ/Academy
  kind: query
  command: "RASQSTN"
  params: []

# ----- Tuner -----
- id: tun_set
  label: Tuning
  kind: action
  command: "TUN{freq}"
  params:
    - name: freq
      type: string
      description: "nnnnn - FM nnn.nn MHz (digits 1-5) or AM nnnnn kHz"

- id: tun_up
  label: Tuning Up
  kind: action
  command: "TUNUP"
  params: []

- id: tun_down
  label: Tuning Down
  kind: action
  command: "TUNDOWN"
  params: []

- id: tun_qstn
  label: Get Tuning Frequency
  kind: query
  command: "TUNQSTN"
  params: []

# ----- Preset -----
- id: prs_set
  label: Preset
  kind: action
  command: "PRS{number}"
  params:
    - name: number
      type: string
      description: "01-28 hex (1-40)"

- id: prs_up
  label: Preset Up
  kind: action
  command: "PRSUP"
  params: []

- id: prs_down
  label: Preset Down
  kind: action
  command: "PRSDOWN"
  params: []

- id: prs_qstn
  label: Get Preset
  kind: query
  command: "PRSQSTN"
  params: []

# ----- RDS -----
- id: rds_rt
  label: Display RDS RT
  kind: action
  command: "RDS00"
  params: []

- id: rds_pty
  label: Display RDS PTY
  kind: action
  command: "RDS01"
  params: []

- id: rds_tp
  label: Display RDS TP
  kind: action
  command: "RDS02"
  params: []

- id: rds_up
  label: RDS Display Cycle
  kind: action
  command: "RDSUP"
  params: []

- id: pts_set
  label: PTY Scan
  kind: action
  command: "PTS{nn}"
  params:
    - name: nn
      type: string
      description: Hex 00-1E (0-30)

- id: pts_enter
  label: Finish PTY Scan
  kind: action
  command: "PTSENTER"
  params: []

- id: tps_start
  label: Start TP Scan
  kind: action
  command: "TPS"
  params: []

- id: tps_enter
  label: Finish TP Scan
  kind: action
  command: "TPSENTER"
  params: []

# ----- Network / USB operation -----
- id: ntc_play
  label: Net/USB Play
  kind: action
  command: "NTCPLAY"
  params: []

- id: ntc_stop
  label: Net/USB Stop
  kind: action
  command: "NTCSTOP"
  params: []

- id: ntc_pause
  label: Net/USB Pause
  kind: action
  command: "NTCPAUSE"
  params: []

- id: ntc_trup
  label: Net/USB Track Up
  kind: action
  command: "NTCTRUP"
  params: []

- id: ntc_trdn
  label: Net/USB Track Down
  kind: action
  command: "NTCTRDN"
  params: []

- id: ntc_ff
  label: Net/USB Fast Forward
  kind: action
  command: "NTCFF"
  params: []

- id: ntc_rew
  label: Net/USB Rewind
  kind: action
  command: "NTCREW"
  params: []

- id: ntc_repeat
  label: Net/USB Repeat
  kind: action
  command: "NTCREPEAT"
  params: []

- id: ntc_random
  label: Net/USB Random
  kind: action
  command: "NTCRANDOM"
  params: []

- id: ntc_display
  label: Net/USB Display
  kind: action
  command: "NTCDISPLAY"
  params: []

- id: ntc_album
  label: Net/USB Album
  kind: action
  command: "NTCALBUM"
  params: []

- id: ntc_artist
  label: Net/USB Artist
  kind: action
  command: "NTCARTIST"
  params: []

- id: ntc_genre
  label: Net/USB Genre
  kind: action
  command: "NTCGENRE"
  params: []

- id: ntc_playlist
  label: Net/USB Playlist
  kind: action
  command: "NTCPLAYLIST"
  params: []

- id: ntc_right
  label: Net/USB Right
  kind: action
  command: "NTCRIGHT"
  params: []

- id: ntc_left
  label: Net/USB Left
  kind: action
  command: "NTCLEFT"
  params: []

- id: ntc_up
  label: Net/USB Up
  kind: action
  command: "NTCUP"
  params: []

- id: ntc_down
  label: Net/USB Down
  kind: action
  command: "NTCDOWN"
  params: []

- id: ntc_select
  label: Net/USB Select
  kind: action
  command: "NTCSELECT"
  params: []

- id: ntc_0
  label: Net/USB 0
  kind: action
  command: "NTC0"
  params: []

- id: ntc_1
  label: Net/USB 1
  kind: action
  command: "NTC1"
  params: []

- id: ntc_2
  label: Net/USB 2
  kind: action
  command: "NTC2"
  params: []

- id: ntc_3
  label: Net/USB 3
  kind: action
  command: "NTC3"
  params: []

- id: ntc_4
  label: Net/USB 4
  kind: action
  command: "NTC4"
  params: []

- id: ntc_5
  label: Net/USB 5
  kind: action
  command: "NTC5"
  params: []

- id: ntc_6
  label: Net/USB 6
  kind: action
  command: "NTC6"
  params: []

- id: ntc_7
  label: Net/USB 7
  kind: action
  command: "NTC7"
  params: []

- id: ntc_8
  label: Net/USB 8
  kind: action
  command: "NTC8"
  params: []

- id: ntc_9
  label: Net/USB 9
  kind: action
  command: "NTC9"
  params: []

- id: ntc_delete
  label: Net/USB Delete
  kind: action
  command: "NTCDELETE"
  params: []

- id: ntc_caps
  label: Net/USB Caps
  kind: action
  command: "NTCCAPS"
  params: []

- id: ntc_location
  label: Net/USB Location
  kind: action
  command: "NTCLOCATION"
  params: []

- id: ntc_language
  label: Net/USB Language
  kind: action
  command: "NTCLANGUAGE"
  params: []

# ----- Net/USB info queries -----
- id: nat_qstn
  label: Net/USB Artist
  kind: query
  command: "NATQSTN"
  params: []

- id: nal_qstn
  label: Net/USB Album
  kind: query
  command: "NALQSTN"
  params: []

- id: nti_qstn
  label: Net/USB Title
  kind: query
  command: "NTIQSTN"
  params: []

- id: ntm_qstn
  label: Net/USB Time
  kind: query
  command: "NTMQSTN"
  params: []

- id: ntr_qstn
  label: Net/USB Track Info
  kind: query
  command: "NTRQSTN"
  params: []

- id: nst_qstn
  label: Net/USB Play Status
  kind: query
  command: "NSTQSTN"
  params: []

- id: npr_set
  label: Internet Radio Preset
  kind: action
  command: "NPR{number}"
  params:
    - name: number
      type: string
      description: Hex 01-28 (1-40)

# ----- RI CD Player (CCD) -----
- id: ccd_track
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

- id: ccd_skipf
  label: CD Skip Forward
  kind: action
  command: "CCDSKIP.F"
  params: []

- id: ccd_skipr
  label: CD Skip Reverse
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

- id: ccd_opcl
  label: CD Open/Close
  kind: action
  command: "CCDOP/CL"
  params: []

- id: ccd_1
  label: CD 1
  kind: action
  command: "CCD1"
  params: []

- id: ccd_2
  label: CD 2
  kind: action
  command: "CCD2"
  params: []

- id: ccd_3
  label: CD 3
  kind: action
  command: "CCD3"
  params: []

- id: ccd_4
  label: CD 4
  kind: action
  command: "CCD4"
  params: []

- id: ccd_5
  label: CD 5
  kind: action
  command: "CCD5"
  params: []

- id: ccd_6
  label: CD 6
  kind: action
  command: "CCD6"
  params: []

- id: ccd_7
  label: CD 7
  kind: action
  command: "CCD7"
  params: []

- id: ccd_8
  label: CD 8
  kind: action
  command: "CCD8"
  params: []

- id: ccd_9
  label: CD 9
  kind: action
  command: "CCD9"
  params: []

- id: ccd_0
  label: CD 0
  kind: action
  command: "CCD0"
  params: []

- id: ccd_10
  label: CD 10
  kind: action
  command: "CCD10"
  params: []

- id: ccd_stby
  label: CD Standby
  kind: action
  command: "CCDSTBY"
  params: []

- id: ccd_pon
  label: CD Power On
  kind: action
  command: "CCDPON"
  params: []

# ----- RI TAPE1 (CT1) -----
- id: ct1_playf
  label: TAPE1 Play Forward
  kind: action
  command: "CT1PLAY.F"
  params: []

- id: ct1_playr
  label: TAPE1 Play Reverse
  kind: action
  command: "CT1PLAY.R"
  params: []

- id: ct1_stop
  label: TAPE1 Stop
  kind: action
  command: "CT1STOP"
  params: []

- id: ct1_rcpau
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
  label: TAPE1 Rewind
  kind: action
  command: "CT1REW"
  params: []

# ----- RI TAPE2 (CT2) -----
- id: ct2_playf
  label: TAPE2 Play Forward
  kind: action
  command: "CT2PLAY.F"
  params: []

- id: ct2_playr
  label: TAPE2 Play Reverse
  kind: action
  command: "CT2PLAY.R"
  params: []

- id: ct2_stop
  label: TAPE2 Stop
  kind: action
  command: "CT2STOP"
  params: []

- id: ct2_rcpau
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
  label: TAPE2 Rewind
  kind: action
  command: "CT2REW"
  params: []

- id: ct2_opcl
  label: TAPE2 Open/Close
  kind: action
  command: "CT2OP/CL"
  params: []

- id: ct2_skipf
  label: TAPE2 Skip Forward
  kind: action
  command: "CT2SKIP.F"
  params: []

- id: ct2_skipr
  label: TAPE2 Skip Reverse
  kind: action
  command: "CT2SKIP.R"
  params: []

- id: ct2_rec
  label: TAPE2 Rec
  kind: action
  command: "CT2REC"
  params: []

# ----- Zone 2 -----
- id: zp2_power
  label: Zone 2 Power
  kind: action
  command: "ZPW{state}"
  params:
    - name: state
      type: string
      description: "00=standby, 01=on"

- id: zp2_power_qstn
  label: Get Zone 2 Power
  kind: query
  command: "ZPWQSTN"
  params: []

- id: zp2_muting
  label: Zone 2 Muting
  kind: action
  command: "ZMT{state}"
  params:
    - name: state
      type: string
      description: "00=off, 01=on, TG=toggle"

- id: zp2_muting_qstn
  label: Get Zone 2 Muting
  kind: query
  command: "ZMTQSTN"
  params: []

- id: zp2_volume
  label: Zone 2 Volume
  kind: action
  command: "ZVL{level}"
  params:
    - name: level
      type: string
      description: Hex 00-64 (0-100)

- id: zp2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: "ZVLUP"
  params: []

- id: zp2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: "ZVLDOWN"
  params: []

- id: zp2_volume_qstn
  label: Get Zone 2 Volume
  kind: query
  command: "ZVLQSTN"
  params: []

- id: zp2_tone
  label: Zone 2 Tone
  kind: action
  command: "ZTN{cmd}"
  params:
    - name: cmd
      type: string
      description: "Bxx / Txx (xx = -A...00...+A) or BUP/BDOWN/TUP/TDOWN"

- id: zp2_tone_qstn
  label: Get Zone 2 Tone
  kind: query
  command: "ZTNQSTN"
  params: []

- id: zp2_balance
  label: Zone 2 Balance
  kind: action
  command: "ZBL{value}"
  params:
    - name: value
      type: string
      description: "xx range -A...00...+A (-10...0...+10 2-step) or UP/DOWN"

- id: zp2_balance_qstn
  label: Get Zone 2 Balance
  kind: query
  command: "ZBLQSTN"
  params: []

- id: zp2_selector
  label: Zone 2 Selector
  kind: action
  command: "SLZ{input}"
  params:
    - name: input
      type: string
      description: Same codes as SLI plus 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 80=SOURCE

- id: zp2_selector_qstn
  label: Get Zone 2 Selector
  kind: query
  command: "SLZQSTN"
  params: []

- id: zp2_tuning
  label: Zone 2 Tuning
  kind: action
  command: "TUZ{freq}"
  params:
    - name: freq
      type: string
      description: "nnnnn - FM nnn.nn MHz or AM nnnnn kHz"

- id: zp2_tuning_up
  label: Zone 2 Tuning Up
  kind: action
  command: "TUZUP"
  params: []

- id: zp2_tuning_down
  label: Zone 2 Tuning Down
  kind: action
  command: "TUZDOWN"
  params: []

- id: zp2_tuning_qstn
  label: Get Zone 2 Tuning
  kind: query
  command: "TUZQSTN"
  params: []

- id: zp2_preset
  label: Zone 2 Preset
  kind: action
  command: "PRZ{number}"
  params:
    - name: number
      type: string
      description: Hex 01-28 (1-40)

- id: zp2_preset_up
  label: Zone 2 Preset Up
  kind: action
  command: "PRZUP"
  params: []

- id: zp2_preset_down
  label: Zone 2 Preset Down
  kind: action
  command: "PRZDOWN"
  params: []

- id: zp2_preset_qstn
  label: Get Zone 2 Preset
  kind: query
  command: "PRZQSTN"
  params: []

- id: zp2_ntz_play
  label: Zone 2 Net/USB Play
  kind: action
  command: "NTZPLAY"
  params: []

- id: zp2_ntz_stop
  label: Zone 2 Net/USB Stop
  kind: action
  command: "NTZSTOP"
  params: []

- id: zp2_ntz_pause
  label: Zone 2 Net/USB Pause
  kind: action
  command: "NTZPAUSE"
  params: []

- id: zp2_ntz_trup
  label: Zone 2 Net/USB Track Up
  kind: action
  command: "NTZTRUP"
  params: []

- id: zp2_ntz_trdn
  label: Zone 2 Net/USB Track Down
  kind: action
  command: "NTZTRDN"
  params: []

- id: zp2_ntz_chup
  label: Zone 2 iRadio CH Up
  kind: action
  command: "NTZCHUP"
  params: []

- id: zp2_ntz_chdn
  label: Zone 2 iRadio CH Down
  kind: action
  command: "NTZCHDN"
  params: []

- id: zp2_npz
  label: Zone 2 Internet Radio Preset
  kind: action
  command: "NPZ{number}"
  params:
    - name: number
      type: string
      description: Hex 01-28 (1-40)

- id: zp2_listening_mode
  label: Zone 2 Listening Mode
  kind: action
  command: "LMZ{mode}"
  params:
    - name: mode
      type: string
      description: "00=STEREO, 01=DIRECT, 0F=MONO, 12=MULTIPLEX, 87=DVS (PL2), 88=DVS (NEO6)"

- id: zp2_late_night
  label: Zone 2 Late Night
  kind: action
  command: "LTZ{level}"
  params:
    - name: level
      type: string
      description: "00=off, 01=low, 02=high, UP"

- id: zp2_late_night_qstn
  label: Get Zone 2 Late Night
  kind: query
  command: "LTZQSTN"
  params: []

- id: zp2_ras
  label: Zone 2 Re-EQ/Academy
  kind: action
  command: "RAZ{value}"
  params:
    - name: value
      type: string
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On, UP"

- id: zp2_ras_qstn
  label: Get Zone 2 Re-EQ/Academy
  kind: query
  command: "RAZQSTN"
  params: []

# ----- Zone 3 -----
- id: zp3_power
  label: Zone 3 Power
  kind: action
  command: "PW3{state}"
  params:
    - name: state
      type: string
      description: "00=standby, 01=on"

- id: zp3_power_qstn
  label: Get Zone 3 Power
  kind: query
  command: "PW3QSTN"
  params: []

- id: zp3_muting
  label: Zone 3 Muting
  kind: action
  command: "MT3{state}"
  params:
    - name: state
      type: string
      description: "00=off, 01=on, TG=toggle"

- id: zp3_muting_qstn
  label: Get Zone 3 Muting
  kind: query
  command: "MT3QSTN"
  params: []

- id: zp3_volume
  label: Zone 3 Volume
  kind: action
  command: "VL3{level}"
  params:
    - name: level
      type: string
      description: Hex 00-64 (0-100)

- id: zp3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: "VL3UP"
  params: []

- id: zp3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: "VL3DOWN"
  params: []

- id: zp3_volume_qstn
  label: Get Zone 3 Volume
  kind: query
  command: "VL3QSTN"
  params: []

- id: zp3_tone
  label: Zone 3 Tone
  kind: action
  command: "TN3{cmd}"
  params:
    - name: cmd
      type: string
      description: "Bxx / Txx (xx = -A...00...+A) or BUP/BDOWN/TUP/TDOWN"

- id: zp3_tone_qstn
  label: Get Zone 3 Tone
  kind: query
  command: "TN3QSTN"
  params: []

- id: zp3_balance
  label: Zone 3 Balance
  kind: action
  command: "BL3{value}"
  params:
    - name: value
      type: string
      description: "xx range -A...00...+A or UP/DOWN"

- id: zp3_balance_qstn
  label: Get Zone 3 Balance
  kind: query
  command: "BL3QSTN"
  params: []

- id: zp3_selector
  label: Zone 3 Selector
  kind: action
  command: "SL3{input}"
  params:
    - name: input
      type: string
      description: Same codes as SLI plus 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 80=SOURCE

- id: zp3_selector_qstn
  label: Get Zone 3 Selector
  kind: query
  command: "SL3QSTN"
  params: []

- id: zp3_tuning
  label: Zone 3 Tuning
  kind: action
  command: "TU3{freq}"
  params:
    - name: freq
      type: string
      description: "nnnnn - FM nnn.nn MHz or AM nnnnn kHz"

- id: zp3_tuning_up
  label: Zone 3 Tuning Up
  kind: action
  command: "TU3UP"
  params: []

- id: zp3_tuning_down
  label: Zone 3 Tuning Down
  kind: action
  command: "TU3DOWN"
  params: []

- id: zp3_tuning_qstn
  label: Get Zone 3 Tuning
  kind: query
  command: "TU3QSTN"
  params: []

- id: zp3_preset
  label: Zone 3 Preset
  kind: action
  command: "PR3{number}"
  params:
    - name: number
      type: string
      description: Hex 01-28 (1-40)

- id: zp3_preset_up
  label: Zone 3 Preset Up
  kind: action
  command: "PR3UP"
  params: []

- id: zp3_preset_down
  label: Zone 3 Preset Down
  kind: action
  command: "PR3DOWN"
  params: []

- id: zp3_preset_qstn
  label: Get Zone 3 Preset
  kind: query
  command: "PR3QSTN"
  params: []

- id: zp3_ntz_play
  label: Zone 3 Net/USB Play
  kind: action
  command: "NT3PLAY"
  params: []

- id: zp3_ntz_stop
  label: Zone 3 Net/USB Stop
  kind: action
  command: "NT3STOP"
  params: []

- id: zp3_ntz_pause
  label: Zone 3 Net/USB Pause
  kind: action
  command: "NT3PAUSE"
  params: []

- id: zp3_ntz_trup
  label: Zone 3 Net/USB Track Up
  kind: action
  command: "NT3TRUP"
  params: []

- id: zp3_ntz_trdn
  label: Zone 3 Net/USB Track Down
  kind: action
  command: "NT3TRDN"
  params: []

- id: zp3_ntz_chup
  label: Zone 3 iRadio CH Up
  kind: action
  command: "NT3CHUP"
  params: []

- id: zp3_ntz_chdn
  label: Zone 3 iRadio CH Down
  kind: action
  command: "NT3CHDN"
  params: []

- id: zp3_npz
  label: Zone 3 Internet Radio Preset
  kind: action
  command: "NP3{number}"
  params:
    - name: number
      type: string
      description: Hex 01-28 (1-40)

# ----- Zone 4 -----
- id: zp4_power
  label: Zone 4 Power
  kind: action
  command: "PW4{state}"
  params:
    - name: state
      type: string
      description: "00=standby, 01=on"

- id: zp4_power_qstn
  label: Get Zone 4 Power
  kind: query
  command: "PW4QSTN"
  params: []

- id: zp4_muting
  label: Zone 4 Muting
  kind: action
  command: "MT4{state}"
  params:
    - name: state
      type: string
      description: "00=off, 01=on, TG=toggle"

- id: zp4_muting_qstn
  label: Get Zone 4 Muting
  kind: query
  command: "MT4QSTN"
  params: []

- id: zp4_volume
  label: Zone 4 Volume
  kind: action
  command: "VL4{level}"
  params:
    - name: level
      type: string
      description: Hex 00-64 (0-100)

- id: zp4_volume_up
  label: Zone 4 Volume Up
  kind: action
  command: "VL4UP"
  params: []

- id: zp4_volume_down
  label: Zone 4 Volume Down
  kind: action
  command: "VL4DOWN"
  params: []

- id: zp4_volume_qstn
  label: Get Zone 4 Volume
  kind: query
  command: "VL4QSTN"
  params: []

- id: zp4_selector
  label: Zone 4 Selector
  kind: action
  command: "SL4{input}"
  params:
    - name: input
      type: string
      description: Same codes as SLI plus 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 80=SOURCE

- id: zp4_selector_qstn
  label: Get Zone 4 Selector
  kind: query
  command: "SL4QSTN"
  params: []

- id: zp4_tuning
  label: Zone 4 Tuning
  kind: action
  command: "TU4{freq}"
  params:
    - name: freq
      type: string
      description: "nnnnn - FM nnn.nn MHz or AM nnnnn kHz"

- id: zp4_tuning_up
  label: Zone 4 Tuning Up
  kind: action
  command: "TU4UP"
  params: []

- id: zp4_tuning_down
  label: Zone 4 Tuning Down
  kind: action
  command: "TU4DOWN"
  params: []

- id: zp4_tuning_qstn
  label: Get Zone 4 Tuning
  kind: query
  command: "TU4QSTN"
  params: []

- id: zp4_preset
  label: Zone 4 Preset
  kind: action
  command: "PR4{number}"
  params:
    - name: number
      type: string
      description: Hex 01-28 (1-40)

- id: zp4_preset_up
  label: Zone 4 Preset Up
  kind: action
  command: "PR4UP"
  params: []

- id: zp4_preset_down
  label: Zone 4 Preset Down
  kind: action
  command: "PR4DOWN"
  params: []

- id: zp4_preset_qstn
  label: Get Zone 4 Preset
  kind: query
  command: "PR4QSTN"
  params: []

- id: zp4_ntz_play
  label: Zone 4 Net/USB Play
  kind: action
  command: "NT4PLAY"
  params: []

- id: zp4_ntz_stop
  label: Zone 4 Net/USB Stop
  kind: action
  command: "NT4STOP"
  params: []

- id: zp4_ntz_pause
  label: Zone 4 Net/USB Pause
  kind: action
  command: "NT4PAUSE"
  params: []

- id: zp4_ntz_trup
  label: Zone 4 Net/USB Track Up
  kind: action
  command: "NT4TRUP"
  params: []

- id: zp4_ntz_trdn
  label: Zone 4 Net/USB Track Down
  kind: action
  command: "NT4TRDN"
  params: []

- id: zp4_npz
  label: Zone 4 Internet Radio Preset
  kind: action
  command: "NP4{number}"
  params:
    - name: number
      type: string
      description: Hex 01-28 (1-40)

# ----- Dock via RI (CDS) -----
- id: cds_pwron
  label: Dock Power On
  kind: action
  command: "CDSPWRON"
  params: []

- id: cds_pwroff
  label: Dock Standby
  kind: action
  command: "CDSPWROFF"
  params: []

- id: cds_plyres
  label: Dock Play/Resume
  kind: action
  command: "CDSPLY/RES"
  params: []

- id: cds_stop
  label: Dock Stop
  kind: action
  command: "CDSSTOP"
  params: []

- id: cds_skipf
  label: Dock Track Up
  kind: action
  command: "CDSSKIP.F"
  params: []

- id: cds_skipr
  label: Dock Track Down
  kind: action
  command: "CDSSKIP.R"
  params: []

- id: cds_pause
  label: Dock Pause
  kind: action
  command: "CDSPAUSE"
  params: []

- id: cds_plypau
  label: Dock Play/Pause
  kind: action
  command: "CDSPLY/PAU"
  params: []

- id: cds_ff
  label: Dock FF
  kind: action
  command: "CDSFF"
  params: []

- id: cds_rew
  label: Dock Rewind
  kind: action
  command: "CDSREW"
  params: []

- id: cds_album_up
  label: Dock Album Up
  kind: action
  command: "CDSALBUM+"
  params: []

- id: cds_album_dn
  label: Dock Album Down
  kind: action
  command: "CDSALBUM-"
  params: []

- id: cds_plist_up
  label: Dock Playlist Up
  kind: action
  command: "CDSPLIST+"
  params: []

- id: cds_plist_dn
  label: Dock Playlist Down
  kind: action
  command: "CDSPLIST-"
  params: []

- id: cds_chapt_up
  label: Dock Chapter Up
  kind: action
  command: "CDSCHAPT+"
  params: []

- id: cds_chapt_dn
  label: Dock Chapter Down
  kind: action
  command: "CDSCHAPT-"
  params: []

- id: cds_random
  label: Dock Shuffle
  kind: action
  command: "CDSRANDOM"
  params: []

- id: cds_repeat
  label: Dock Repeat
  kind: action
  command: "CDSREPEAT"
  params: []

- id: cds_mute
  label: Dock Mute
  kind: action
  command: "CDSMUTE"
  params: []

- id: cds_blight
  label: Dock Backlight
  kind: action
  command: "CDSBLIGHT"
  params: []

- id: cds_menu
  label: Dock Menu
  kind: action
  command: "CDSMENU"
  params: []

- id: cds_enter
  label: Dock Select
  kind: action
  command: "CDSENTER"
  params: []

- id: cds_up
  label: Dock Cursor Up
  kind: action
  command: "CDSUP"
  params: []

- id: cds_down
  label: Dock Cursor Down
  kind: action
  command: "CDSDOWN"
  params: []

# ----- Additional source command families -----
# Source tables document the following codes and parameter tokens separately.
# Each appended command is the verbatim source code; append its selected param.
# These entries record documentation coverage, not DTC-9.4 support: many rows
# explicitly say No in that model's column. Model applicability remains as stated
# in the source support tables.

- id: spa_additional
  label: Speaker A Additional Operations
  kind: action
  command: "SPA"
  params:
    - name: cmd
      type: string
      description: '"UP" sets Speaker Switch Wrap-Around; "QSTN" gets the Speaker State'

- id: spb_additional
  label: Speaker B Additional Operations
  kind: action
  command: "SPB"
  params:
    - name: cmd
      type: string
      description: '"UP" sets Speaker Switch Wrap-Around; "QSTN" gets the Speaker State'

- id: spl_set
  label: Speaker Layout
  kind: action
  command: "SPL"
  params:
    - name: cmd
      type: string
      description: |
        "SB" sets SurrBack Speaker
        "FH" sets Front High Speaker / SurrBack+Front High Speakers
        "FW" sets Front Wide Speaker / SurrBack+Front Wide Speakers
        "UP" sets Speaker Switch Wrap-Around
        "QSTN" gets the Speaker State

- id: mvl_step
  label: Master Volume 1dB Step
  kind: action
  command: "MVL"
  params:
    - name: cmd
      type: string
      description: '"UP1" sets Volume Level Up 1dB Step; "DOWN1" sets Volume Level Down 1dB Step'

- id: tfr_set
  label: Front Tone
  kind: action
  command: "TFR"
  params:
    - name: cmd
      type: string
      description: |
        "Bxx" Front Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Front Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Front Bass up(2 step)
        "BDOWN" sets Front Bass down(2 step)
        "TUP" sets Front Treble up(2 step)
        "TDOWN" sets Front Treble down(2 step)
        "QSTN" gets Front Tone ("BxxTxx")

- id: tfw_set
  label: Front Wide Tone
  kind: action
  command: "TFW"
  params:
    - name: cmd
      type: string
      description: |
        "Bxx" Front Wide Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Front Wide Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Front Wide Bass up(2 step)
        "BDOWN" sets Front Wide Bass down(2 step)
        "TUP" sets Front Wide Treble up(2 step)
        "TDOWN" sets Front Wide Treble down(2 step)
        "QSTN" gets Front Wide Tone ("BxxTxx")

- id: tfh_set
  label: Front High Tone
  kind: action
  command: "TFH"
  params:
    - name: cmd
      type: string
      description: |
        "Bxx" Front High Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Front High Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Front High Bass up(2 step)
        "BDOWN" sets Front High Bass down(2 step)
        "TUP" sets Front High Treble up(2 step)
        "TDOWN" sets Front High Treble down(2 step)
        "QSTN" gets Front High Tone ("BxxTxx")

- id: tct_set
  label: Center Tone
  kind: action
  command: "TCT"
  params:
    - name: cmd
      type: string
      description: |
        "Bxx" Center Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Center Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Center Bass up(2 step)
        "BDOWN" sets Center Bass down(2 step)
        "TUP" sets Center Treble up(2 step)
        "TDOWN" sets Center Treble down(2 step)
        "QSTN" gets Cetner Tone ("BxxTxx")

- id: tsr_set
  label: Surround Tone
  kind: action
  command: "TSR"
  params:
    - name: cmd
      type: string
      description: |
        "Bxx" Surround Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Surround Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Surround Bass up(2 step)
        "BDOWN" sets Surround Bass down(2 step)
        "TUP" sets Surround Treble up(2 step)
        "TDOWN" sets Surround Treble down(2 step)
        "QSTN" gets Surround Tone ("BxxTxx")

- id: tsb_set
  label: Surround Back Tone
  kind: action
  command: "TSB"
  params:
    - name: cmd
      type: string
      description: |
        "Bxx" Surround Back Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "Txx" Surround Back Treble (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Surround Back Bass up(2 step)
        "BDOWN" sets Surround Back Bass down(2 step)
        "TUP" sets Surround Back Treble up(2 step)
        "TDOWN" sets Surround Back Treble down(2 step)
        "QSTN" gets Surround Back Tone ("BxxTxx")

- id: tsw_set
  label: Subwoofer Tone
  kind: action
  command: "TSW"
  params:
    - name: cmd
      type: string
      description: |
        "Bxx" Subwoofer Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP" sets Subwoofer Bass up(2 step)
        "BDOWN" sets Subwoofer Bass down(2 step)
        "QSTN" gets Subwoofer Tone ("BxxTxx")

- id: swl_set
  label: Temporary Subwoofer Level
  kind: action
  command: "SWL"
  params:
    - name: level
      type: string
      description: |
        "-F"-"00"-"+C" sets Subwoofer Level-15dB-0dB-+12dB
        "UP" LEVEL + Key
        "DOWN" LEVEL–KEY
        "QSTN" gets the Subwoofer Level

- id: ctl_set
  label: Temporary Center Level
  kind: action
  command: "CTL"
  params:
    - name: level
      type: string
      description: |
        "-C"-"00"-"+C" sets Center Level-12dB-0dB-+12dB
        "UP" LEVEL + Key
        "DOWN" LEVEL–KEY
        "QSTN" gets the Subwoofer Level

- id: dim_led_off
  label: Dimmer Bright And LED Off
  kind: action
  command: "DIM"
  params:
    - name: value
      type: string
      description: '"08" sets Dimmer Level"Bright & LED OFF"'

- id: osd_adjust
  label: Setup Audio Or Video Adjust
  kind: action
  command: "OSD"
  params:
    - name: cmd
      type: string
      description: '"AUDIO" Audio Adjust Key; "VIDEO" Video Adjust Key'

- id: mem_set
  label: Memory Setup
  kind: action
  command: "MEM"
  params:
    - name: cmd
      type: string
      description: |
        "STR" stores memory
        "RCL" recalls memory
        "LOCK" locks memory
        "UNLK" unlocks memory

- id: vos_set
  label: Video Output Selector
  kind: action
  command: "VOS"
  params:
    - name: value
      type: string
      description: |
        "00" sets D4
        "01" sets Component
        "QSTN" gets The Selector Position

- id: hdo_set
  label: HDMI Output Selector
  kind: action
  command: "HDO"
  params:
    - name: value
      type: string
      description: |
        "00" sets No                         Analog
        "01" sets Yes/Out Main        HDMI Main
        "02" sets Out Sub                HDMI Sub
        "03" sets                              Both
        "04" sets                              Both(Main)
        "05" sets                              Both(Sub)
        "UP" sets HDMI Out Selector Wrap-Around Up
        "QSTN" gets The HDMI Out Selector

- id: res_set
  label: Monitor Out Resolution
  kind: action
  command: "RES"
  params:
    - name: value
      type: string
      description: |
        "00" sets Through
        "01" sets Auto(HDMI Output Only)
        "02" sets 480p
        "03" sets 720p
        "04" sets 1080i
        "05" sets 1080p(HDMI Output Only)
        "07" sets 1080p/24fs(HDMI Output Only)
        "06" sets Source
        "UP" sets Monitor Out Resolution Wrap-Around Up
        "QSTN" gets The Monitor Out Resolution

- id: isf_set
  label: ISF Mode
  kind: action
  command: "ISF"
  params:
    - name: value
      type: string
      description: |
        "00" sets ISF Mode Custom
        "01" sets ISF Mode Day
        "02" sets ISF Mode Night
        "UP" sets ISF Mode State Wrap-Around Up
        "QSTN" gets The ISF Mode State

- id: lmd_category
  label: Listening Mode Category Cycle
  kind: action
  command: "LMD"
  params:
    - name: cmd
      type: string
      description: |
        "MOVIE" sets Listening Mode Wrap-Around Up
        "MUSIC" sets Listening Mode Wrap-Around Up
        "GAME" sets Listening Mode Wrap-Around Up

- id: ady_set
  label: Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  command: "ADY"
  params:
    - name: value
      type: string
      description: |
        "00" sets Audyssey 2EQ/MultEQ/MultEQ XT Off
        "01" sets Audyssey 2EQ/MultEQ/MultEQ XT On
        "UP" sets Audyssey 2EQ/MultEQ/MultEQ XT State Wrap-Around Up
        "QSTN" gets The Audyssey 2EQ/MultEQ/MultEQ XT State

- id: adq_set
  label: Audyssey Dynamic EQ
  kind: action
  command: "ADQ"
  params:
    - name: value
      type: string
      description: |
        "00" sets Audyssey Dynamic EQ Off
        "01" sets Audyssey Dynamic EQ On
        "UP" sets Audyssey Dynamic EQ State Wrap-Around Up
        "QSTN" gets The Audyssey Dynamic EQ State

- id: adv_set
  label: Audyssey Dynamic Volume
  kind: action
  command: "ADV"
  params:
    - name: value
      type: string
      description: |
        "00" sets Audyssey Dynamic Volume Off
        "01" sets Audyssey Dynamic Volume Light
        "02" sets Audyssey Dynamic Volume Medium
        "03" sets Audyssey Dynamic Volume Heavy
        "UP" sets Audyssey Dynamic Volume State Wrap-Around Up
        "QSTN" gets The Audyssey Dynamic Volume State

- id: dvl_set
  label: Dolby Volume
  kind: action
  command: "DVL"
  params:
    - name: value
      type: string
      description: |
        "00" sets Dolby Volume Off
        "01" sets Dolby Volume Low
        "02" sets Dolby Volume Mid
        "03" sets Dolby Volume High
        "UP" sets Dolby Volume State Wrap-Around Up
        "QSTN" gets The Dolby Volume State

- id: mot_set
  label: Music Optimizer
  kind: action
  command: "MOT"
  params:
    - name: value
      type: string
      description: |
        "00" sets Music Optimizer Off
        "01" sets Music Optimizer On
        "UP" sets Music Optimizer State Wrap-Around Up
        "QSTN" gets The Dolby Volume State

- id: prm_set
  label: Preset Memory
  kind: action
  command: "PRM"
  params:
    - name: number
      type: string
      description: |
        "01"-"28" sets Preset No. 1-40 ( In hexadecimal representation)
        "01"-"1E" sets Preset No. 1-30 ( In hexadecimal representation)

- id: xcn_query
  label: Get XM Channel Name
  kind: query
  command: "XCN"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets XM Channel Name'

- id: xat_query
  label: Get XM Artist Name
  kind: query
  command: "XAT"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets XM Artist Name'

- id: xti_query
  label: Get XM Title
  kind: query
  command: "XTI"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets XM Title'

- id: xch_set
  label: XM Channel Number
  kind: action
  command: "XCH"
  params:
    - name: value
      type: string
      description: |
        "000"-"255" XM Channel Number"000-255"
        "UP" sets XM Channel Wrap-Around Up
        "DOWN" sets XM Channel Wrap-Around Down
        "QSTN" gets XM Channel Number

- id: xct_set
  label: XM Category
  kind: action
  command: "XCT"
  params:
    - name: cmd
      type: string
      description: |
        "UP" sets XM Category Wrap-Around Up
        "DOWN" sets XM Category Wrap-Around Down
        "QSTN" gets XM Category

- id: scn_query
  label: Get SIRIUS Channel Name
  kind: query
  command: "SCN"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets SIRIUS Channel Name'

- id: sat_query
  label: Get SIRIUS Artist Name
  kind: query
  command: "SAT"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets SIRIUS Artist Name'

- id: sti_query
  label: Get SIRIUS Title
  kind: query
  command: "STI"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets SIRIUS Title'

- id: sch_set
  label: SIRIUS Channel Number
  kind: action
  command: "SCH"
  params:
    - name: value
      type: string
      description: |
        "000"-"255" SIRIUS Channel Number"000-255"
        "UP" sets SIRIUS Channel Wrap-Around Up
        "DOWN" sets SIRIUS Channel Wrap-Around Down
        "QSTN" gets SIRIUS Channel Number

- id: sct_set
  label: SIRIUS Category
  kind: action
  command: "SCT"
  params:
    - name: cmd
      type: string
      description: |
        "UP" sets SIRIUS Category Wrap-Around Up
        "DOWN" sets SIRIUS Category Wrap-Around Down
        "QSTN" gets SIRIUS Category

- id: slk_set
  label: SIRIUS Parental Lock
  kind: action
  command: "SLK"
  params:
    - name: value
      type: string
      description: |
        "nnnn" Lock Password (4Digits)
        "INPUT" displays"Please input the Lock password"
        "WRONG" displays"The Lock password is wrong"

- id: hat_query
  label: Get HD Radio Artist Name
  kind: query
  command: "HAT"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets HD Radio Artist Name'

- id: hcn_query
  label: Get HD Radio Channel Name
  kind: query
  command: "HCN"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets HD Radio Channel Name'

- id: hti_query
  label: Get HD Radio Title
  kind: query
  command: "HTI"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets HD Radio Title'

- id: hds_query
  label: Get HD Radio Detail Info
  kind: query
  command: "HDS"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets HD Radio Title'

- id: hpr_set
  label: HD Radio Channel Program
  kind: action
  command: "HPR"
  params:
    - name: value
      type: string
      description: |
        "01"-"08" sets directly HD Radio Channel Program
        "QSTN" gets HD Radio Channel Program

- id: hbl_set
  label: HD Radio Blend Mode
  kind: action
  command: "HBL"
  params:
    - name: value
      type: string
      description: |
        "00" sets HD Radio Blend Mode"Auto"
        "01" sets HD Radio Blend Mode"Analog"
        "QSTN" gets the HD Radio Blend Mode Status

- id: hts_query
  label: Get HD Radio Tuner Status
  kind: query
  command: "HTS"
  params:
    - name: cmd
      type: string
      description: '"QSTN" gets the HD Radio Tuner Status'

- id: ntc_additional
  label: Net/USB Additional Operations
  kind: action
  command: "NTC"
  params:
    - name: cmd
      type: string
      description: |
        "SETUP" SETUP KEY
        "RETURN" RETURN KEY
        "CHUP" CH UP(for iRadio)
        "CHDN" CH DOWN(for iRadio)

- id: ccd_additional
  label: CD Additional Operations
  kind: action
  command: "CCD"
  params:
    - name: cmd
      type: string
      description: |
        "D.MODE" D.MODE
        "FF" FF >>
        "REW" REW <<
        "+10" +10
        "D.SKIP" DISC +
        "DISC.F" DISC +
        "DISC.R" DISC-
        "DISC1" DISC1
        "DISC2" DISC2
        "DISC3" DISC3
        "DISC4" DISC4
        "DISC5" DISC5
        "DISC6" DISC6

- id: ceq_preset
  label: Graphics Equalizer Preset
  kind: action
  command: "CEQ"
  params:
    - name: cmd
      type: string
      description: '"PRESET" PRESET'

- id: cdt_operation
  label: DAT Recorder Operation
  kind: action
  command: "CDT"
  params:
    - name: cmd
      type: string
      description: |
        "PLAY" PLAY
        "RC/PAU" REC/PAUSE
        "STOP" STOP
        "SKIP.F" >>I
        "SKIP.R" I<<
        "FF" FF >>
        "REW" REW <<

- id: cdv_operation
  label: DVD Player Operation
  kind: action
  command: "CDV"
  params:
    - name: cmd
      type: string
      description: |
        "PWRON" POWER ON
        "PWROFF" POWER OFF
        "PLAY" PLAY
        "STOP" STOP
        "SKIP.F" >>I
        "SKIP.R" I<<
        "FF" FF >>
        "REW" REW <<
        "PAUSE" PAUSE
        "LASTPLAY" LAST PLAY
        "SUBTON/OFF" SUBTITLE ON/OFF
        "SUBTITLE" SUBTITLE
        "SETUP" SETUP
        "TOPMENU" TOPMENU
        "MENU" MENU
        "UP" UP
        "DOWN" DOWN
        "LEFT" LEFT
        "RIGHT" RIGHT
        "ENTER" ENTER
        "RETURN" RETURN
        "DISC.F" DISC +
        "DISC.R" DISC-
        "AUDIO" AUDIO
        "RANDOM" RANDOM
        "OP/CL" OPEN/CLOSE
        "ANGLE" ANGLE
        "1" 1
        "2" 2
        "3" 3
        "4" 4
        "5" 5
        "6" 6
        "7" 7
        "8" 8
        "9" 9
        "10" 10
        "0" 0
        "SEARCH" SEARCH
        "DISP" DISPLAY
        "REPEAT" REPEAT
        "MEMORY" MEMORY
        "CLEAR" CLEAR
        "ABR" A-B REPEAT
        "STEP.F" STEP
        "STEP.R" STEP BACK
        "SLOW.F" SLOW
        "SLOW.R" SLOW BACK
        "ZOOMTG" ZOOM
        "ZOOMUP" ZOOM UP
        "ZOOMDN" ZOOM DOWN
        "PROGRE" PROGRESSIVE
        "VDOFF" VIDEO ON/OFF
        "CONMEM" CONDITION MEMORY
        "FUNMEM" FUNCTION MEMORY
        "DISC1" DISC1
        "DISC2" DISC2
        "DISC3" DISC3
        "DISC4" DISC4
        "DISC5" DISC5
        "DISC6" DISC6
        "FOLDUP" FOLDER UP
        "FOLDDN" FOLDER DOWN
        "P.MODE" PLAY MODE
        "ASCTG" ASPECT(Toggle)
        "CDPCD" CD CHAIN REPEAT
        "MSPUP" MULTI SPEED UP
        "MSPDN" MULTI SPEED DOWN
        "PCT" PICTURE CONTROL
        "RSCTG" RESOLUTION(Toggle)
        "INIT" Return to Factory Settings

- id: cmd_operation
  label: MD Recorder Operation
  kind: action
  command: "CMD"
  params:
    - name: cmd
      type: string
      description: |
        "PLAY" PLAY
        "STOP" STOP
        "FF" FF >>
        "REW" REW <<
        "P.MODE" PLAY MODE
        "SKIP.F" >>I
        "SKIP.R" I<<
        "PAUSE" PAUSE
        "REC" REC
        "MEMORY" MEMORY
        "DISP" DISPLAY
        "SCROLL" SCROLL
        "M.SCAN" MUSIC SCAN
        "CLEAR" CLEAR
        "RANDOM" RANDOM
        "REPEAT" REPEAT
        "ENTER" ENTER
        "EJECT" EJECT
        "1" 1
        "2" 2
        "3" 3
        "4" 4
        "5" 5
        "6" 6
        "7" 7
        "8" 8
        "9" 9
        "10/0" 10/0
        "nn/nnn" --/---
        "NAME" NAME
        "GROUP" GROUP
        "STBY" STANDBY

- id: ccr_operation
  label: CD-R Recorder Operation
  kind: action
  command: "CCR"
  params:
    - name: cmd
      type: string
      description: |
        "P.MODE" PLAY MODE
        "PLAY" PLAY
        "STOP" STOP
        "SKIP.F" >>I
        "SKIP.R" I<<
        "PAUSE" PAUSE
        "REC" REC
        "CLEAR" CLEAR
        "REPEAT" REPEAT
        "1" 1
        "2" 2
        "3" 3
        "4" 4
        "5" 5
        "6" 6
        "7" 7
        "8" 8
        "9" 9
        "10/0" 10/0
        "nn/nnn" --/---
        "SCROLL" SCROLL
        "OP/CL" OPEN/CLOSE
        "DISP" DISPLAY
        "RANDOM" RANDOM
        "MEMORY" MEMORY
        "FF" FF
        "REW" REW
        "STBY" STANDBY
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  query_command: "PWRQSTN"

- id: muting_state
  type: enum
  values: [on, off]
  query_command: "AMTQSTN"

- id: volume_level
  type: integer
  range: [0, 100]
  query_command: "MVLQSTN"

- id: input_selector
  type: string
  query_command: "SLIQSTN"

- id: recout_selector
  type: string
  query_command: "SLRQSTN"

- id: audio_selector
  type: string
  query_command: "SLAQSTN"

- id: listening_mode
  type: string
  query_command: "LMDQSTN"

- id: late_night_level
  type: enum
  values: [off, low, high]
  query_command: "LTNQSTN"

- id: reeq_academy_state
  type: string
  query_command: "RASQSTN"

- id: display_mode
  type: integer
  range: [0, 3]
  query_command: "DIFQSTN"

- id: dimmer_level
  type: enum
  values: [bright, dim, dark, shut-off]
  query_command: "DIMQSTN"

- id: tuner_frequency
  type: string
  query_command: "TUNQSTN"

- id: preset_number
  type: integer
  range: [1, 40]
  query_command: "PRSQSTN"

- id: net_usb_artist
  type: string
  query_command: "NATQSTN"

- id: net_usb_album
  type: string
  query_command: "NALQSTN"

- id: net_usb_title
  type: string
  query_command: "NTIQSTN"

- id: net_usb_time
  type: string
  query_command: "NTMQSTN"

- id: net_usb_track
  type: string
  query_command: "NTRQSTN"

- id: net_usb_status
  type: string
  query_command: "NSTQSTN"

- id: trigger_a_state
  type: enum
  values: [on, off]

- id: trigger_b_state
  type: enum
  values: [on, off]

- id: trigger_c_state
  type: enum
  values: [on, off]

- id: zone2_power
  type: enum
  values: [on, standby]
  query_command: "ZPWQSTN"

- id: zone2_muting
  type: enum
  values: [on, off]
  query_command: "ZMTQSTN"

- id: zone2_volume
  type: integer
  range: [0, 100]
  query_command: "ZVLQSTN"

- id: zone2_balance
  type: integer
  range: [-10, 10]
  query_command: "ZBLQSTN"

- id: zone2_tone
  type: string
  query_command: "ZTNQSTN"

- id: zone2_selector
  type: string
  query_command: "SLZQSTN"

- id: zone2_tuning
  type: string
  query_command: "TUZQSTN"

- id: zone2_preset
  type: integer
  range: [1, 40]
  query_command: "PRZQSTN"

- id: zone2_late_night
  type: enum
  values: [off, low, high]
  query_command: "LTZQSTN"

- id: zone3_power
  type: enum
  values: [on, standby]
  query_command: "PW3QSTN"

- id: zone3_muting
  type: enum
  values: [on, off]
  query_command: "MT3QSTN"

- id: zone3_volume
  type: integer
  range: [0, 100]
  query_command: "VL3QSTN"

- id: zone3_balance
  type: integer
  range: [-10, 10]
  query_command: "BL3QSTN"

- id: zone3_tone
  type: string
  query_command: "TN3QSTN"

- id: zone3_selector
  type: string
  query_command: "SL3QSTN"

- id: zone4_power
  type: enum
  values: [on, standby]
  query_command: "PW4QSTN"

- id: zone4_muting
  type: enum
  values: [on, off]
  query_command: "MT4QSTN"

- id: zone4_volume
  type: integer
  range: [0, 100]
  query_command: "VL4QSTN"

- id: zone4_selector
  type: string
  query_command: "SL4QSTN"

- id: audio_info
  type: string
  query_command: "IFAQSTN"

- id: video_info
  type: string
  query_command: "IFVQSTN"
```

## Variables
```yaml
- id: zone2_tone_bass
  type: integer
  range: [-10, 10]

- id: zone2_tone_treble
  type: integer
  range: [-10, 10]

- id: zone3_tone_bass
  type: integer
  range: [-10, 10]

- id: zone3_tone_treble
  type: integer
  range: [-10, 10]
```

## Events
```yaml
# Receiver pushes unsolicited status messages whenever a state changes.
# Format identical to QSTN responses: !1XXX[param][EOF] (RS-232C) or wrapped
# in eISCP header on TCP. Any command listed above with a QSTN variant
# (PWR, AMT, MVL, SLP, DIM, DIF, RAS, LTN, SLI, SLR, SLA, LMD, TUN,
# PRS, NAT, NAL, NTI, NTM, NTR, NST, ZPW/ZMT/ZVL/ZTN/ZBL/SLZ/TUZ/PRZ/
# LTZ/RAZ, PW3/MT3/VL3/TN3/BL3/SL3/TU3/PR3, PW4/MT4/VL4/SL4/TU4/PR4)
# may be sent unsolicited by the receiver after a state change.
```

## Macros
```yaml
# Multi-step sequences not explicitly enumerated in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Zone 2/3/4 volume, tone, balance only work when main zone is ON"
  - "Zone 2 tone/balance only works when Zone 2 is powered or set to variable"
  - "Tuner function shared by MAIN and ZONE sides; control is separated per zone"
  - "12V Trigger A/B/C only operate when each trigger parameter is set to OFF in Setup Menu"
  - "eISCP allows only one client connection"
  - "50 msec minimum interval between ISCP messages"
  - "Net-Tune FF/REW must be sent continuously with no more than 100 ms delay between codes"
```

## Notes
- ISCP message format (RS-232C): `!1XXX[param][CR]` — start `!`, dest unit-type `1` (Receiver), 3-char command, variable-length hex params, end `[CR]` (also accepts `[LF]` or `[CR][LF]`); device replies use `[EOF]` (0x1A) as end character.
- eISCP header over TCP: magic `ISCP` (0x49534350), header size `0x00000010` (16, BIGENDIAN), data size BIGENDIAN, version `0x01`, reserved `0x000000`. Header size 0x10 must be used in any extension calculation.
- eISCP destination port default 60128; receiver allows 49152-65535 via Setup Menu (requires standby cycle after change).
- Version check procedure: hold DISPLAY + STANDBY/ON at power-on to display firmware build date as yymdd.
- Volume range 00-64 hex (0-100) for DTC-9.4; some other ISCP receivers limited to 00-50 (0-80).
- Tone/balance values encoded as hex two's-complement in `-A` ... `00` ... `+A` (-10 ... 0 ... +10) at 2-step increments.
- 12V Trigger A/B/C depend on per-trigger Setup Menu parameter being OFF.
- Zone 2/3/4 share tuner hardware with MAIN; selection/control are separated per zone.
- DTC-9.4 column header in source covers both DTC-9.4 and DTC-7 (Japanese-market variant).

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T10:44:09.294Z
last_checked_at: 2026-10-07T21:07:30.131Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:07:30.131Z
matched_actions: 377
action_count: 377
confidence: medium
summary: "All 377 action units match source ISCP codes and transport values are supported; auth is UNRESOLVED; many rows are marked No for DTC-9.4 (disclosed in spec)."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
