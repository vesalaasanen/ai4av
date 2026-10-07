---
spec_id: admin/onkyo-tx-sr875
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-SR875 Control Spec"
manufacturer: Onkyo
model_family: TX-SR875
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-SR875
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T13:47:32.681Z
last_checked_at: 2026-10-07T22:06:32.752Z
generated_at: 2026-10-07T22:06:32.752Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TX-SR875-specific Yes/No columns not captured in source extraction — model support for individual commands inferred from protocol generation (v1.07 era). Zone3/Zone4 applicability to TX-SR875 not independently verified."
  - "Ethernet port default 60128 from source; not verified for this specific model"
  - "default TCP port from source; configurable 49152-65535 per source"
  - "Zone3 support on TX-SR875 not confirmed from source model columns"
  - "TX-SR875 applicability of these additional command families."
  - "no discrete parameter commands beyond action-based controls"
  - "no explicit multi-step sequences documented"
  - "no explicit safety warnings or interlock procedures beyond trigger/zone notes"
  - "firmware version compatibility not stated"
  - "Ethernet port 60128 default not independently verified for TX-SR875"
  - "TX-SR875-specific Yes/No columns not captured in source table extraction — model-column mapping incomplete. Zone3/Zone4 support on TX-SR875 not confirmed from source model columns."
  - "Audyssey (ADY/ADQ/ADV), Dolby Volume (DVL), Music Optimizer (MOT), Speaker Layout (SPL), HDMI Output (HDO), Monitor Out Resolution (RES), ISF Mode (ISF), Tone per-channel (TFR/TFW/TFH/TCT/TSR/TSB/TSW) commands appear in source but model support for TX-SR875 unclear from extraction — included as commands may apply to this generation but per-model verification needed"
  - "HD Radio commands (HAT/HCN/HTI/HDS/HPR/HBL/HTS) and XM commands (XCN/XAT/XTI/XCH/XCT) present in source but model-specific support unclear"
verification:
  verdict: verified
  checked_at: 2026-10-07T22:06:32.752Z
  matched_actions: 452
  action_count: 452
  confidence: medium
  summary: "All 452 units match source mnemonics and parameters, and the serial and port values are stated. The source is a shared Integra protocol doc that names TX-SR875 but has no per-model columns for it. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-15
---

# Onkyo TX-SR875 Control Spec

## Summary
AV receiver with RS-232C and Ethernet (eISCP) control interfaces. ISCP protocol: 3-character command + variable-length parameter, prefixed `!1` (Destination Unit Type "1" = Receiver). Serial end char [CR]; Ethernet end char [EOF]. Minimum 50ms interval between messages. Response within 50ms. Supports MAIN zone, Zone 2, Zone 3, and RI system passthrough commands for external devices.

<!-- UNRESOLVED: TX-SR875-specific Yes/No columns not captured in source extraction — model support for individual commands inferred from protocol generation (v1.07 era). Zone3/Zone4 applicability to TX-SR875 not independently verified. -->
<!-- UNRESOLVED: Ethernet port default 60128 from source; not verified for this specific model -->

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
  port: 60128  # UNRESOLVED: default TCP port from source; configurable 49152-65535 per source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable
- queryable
- levelable
- routable
```

## Actions
```yaml
# =========================================================================
# MAIN ZONE - System Power (PWR)
# =========================================================================
- id: power_on
  label: Power On
  kind: action
  command: "!1PWR01"
  params: []

- id: power_off
  label: Standby
  kind: action
  command: "!1PWR00"
  params: []

- id: power_query
  label: Get Power Status
  kind: query
  command: "!1PWRQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Audio Muting (AMT)
# =========================================================================
- id: mute_on
  label: Mute On
  kind: action
  command: "!1AMT01"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "!1AMT00"
  params: []

- id: mute_toggle
  label: Mute Wrap-Around
  kind: action
  command: "!1AMTTG"
  params: []

- id: mute_query
  label: Get Mute State
  kind: query
  command: "!1AMTQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Master Volume (MVL)
# =========================================================================
- id: volume_set
  label: Set Master Volume
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: string
      description: "Volume 0-100 in hex (00-64). e.g. MVL50 = level 80"

- id: volume_up
  label: Volume Up
  kind: action
  command: "!1MVLUP"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "!1MVLDOWN"
  params: []

- id: volume_up_1db
  label: Volume Up 1dB Step
  kind: action
  command: "!1MVLUP1"
  params: []

- id: volume_down_1db
  label: Volume Down 1dB Step
  kind: action
  command: "!1MVLDOWN1"
  params: []

- id: volume_query
  label: Get Master Volume Level
  kind: query
  command: "!1MVLQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Input Selector (SLI)
# =========================================================================
- id: input_select
  label: Select Input
  kind: action
  command: "!1SLI{source}"
  params:
    - name: source
      type: string
      description: |
        Input code (hex): 00=VIDEO1/VCR-DVR, 01=VIDEO2/CBL-SAT, 02=VIDEO3/GAME-TV,
        03=VIDEO4/AUX1, 04=VIDEO5/AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD,
        20=TAPE1/TV-TAPE, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM,
        26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB-Front,
        2A=USB-Rear, 30=MULTI CH, 31=XM, 32=SIRIUS, 40=Universal PORT

- id: input_up
  label: Input Selector Wrap-Around Up
  kind: action
  command: "!1SLIUP"
  params: []

- id: input_down
  label: Input Selector Wrap-Around Down
  kind: action
  command: "!1SLIDOWN"
  params: []

- id: input_query
  label: Get Input Selector Position
  kind: query
  command: "!1SLIQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Listening Mode (LMD)
# =========================================================================
- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  command: "!1LMD{mode}"
  params:
    - name: mode
      type: string
      description: |
        Mode code (hex): 00=STEREO, 01=DIRECT, 02=SURROUND, 03=FILM,
        04=THX, 05=ACTION, 06=MUSICAL, 07=MONO MOVIE, 08=ORCHESTRA,
        09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO,
        0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7, 0F=MONO, 11=PURE AUDIO,
        12=MULTIPLEX, 13=FULL MONO, 40=5.1ch Surround/Straight Decode,
        41=Dolby EX/DTS ES, 42=THX Cinema, 43=THX Surround EX,
        44=THX Music, 45=THX Games, 50=U2-S2 Cinema, 51=U2-S2 Music,
        52=U2-S2 Games, 80=PLII-PLIIx Movie, 81=PLII-PLIIx Music,
        82=Neo6 Cinema, 83=Neo6 Music, 84=PLII-PLIIx THX Cinema,
        85=Neo6 THX Cinema, 86=PLII-PLIIx Game, 87=Neural Surr,
        88=Neural THX-Neural Surround, 89=PLII-PLIIx THX Games,
        8A=Neo6 THX Games, 8B=PLII-PLIIx THX Music, 8C=Neo6 THX Music,
        8D=Neural THX Cinema, 8E=Neural THX Music, 8F=Neural THX Games,
        90=PLIIz Height, A0-A7=Audyssey DSX variants

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
  label: Get Listening Mode
  kind: query
  command: "!1LMDQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Dimmer (DIM)
# =========================================================================
- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  command: "!1DIM{level}"
  params:
    - name: level
      type: string
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF"

- id: dimmer_wrap
  label: Dimmer Wrap-Around Up
  kind: action
  command: "!1DIMDIM"
  params: []

- id: dimmer_query
  label: Get Dimmer Level
  kind: query
  command: "!1DIMQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Sleep Timer (SLP)
# =========================================================================
- id: sleep_set
  label: Set Sleep Timer
  kind: action
  command: "!1SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "Sleep time 1-90 min in hex (01-5A); OFF to cancel"

- id: sleep_off
  label: Sleep Timer Off
  kind: action
  command: "!1SLPOFF"
  params: []

- id: sleep_wrap
  label: Sleep Timer Wrap-Around Up
  kind: action
  command: "!1SLPUP"
  params: []

- id: sleep_query
  label: Get Sleep Timer
  kind: query
  command: "!1SLPQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Speaker Level Calibration (SLC)
# =========================================================================
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

- id: slc_up
  label: Speaker Level Calibration LEVEL + Key
  kind: action
  command: "!1SLCUP"
  params: []

- id: slc_down
  label: Speaker Level Calibration LEVEL - Key
  kind: action
  command: "!1SLCDOWN"
  params: []

# =========================================================================
# MAIN ZONE - Display Mode (DIF)
# =========================================================================
- id: display_info_program
  label: Display Program Format
  kind: action
  command: "!1DIF00"
  params: []

- id: display_info_digital_input
  label: Display Digital Input Position
  kind: action
  command: "!1DIF01"
  params: []

- id: display_info_digital_format
  label: Display Digital Format Position
  kind: action
  command: "!1DIF02"
  params: []

- id: display_info_bass_level
  label: Display Bass Level
  kind: action
  command: "!1DIF03"
  params: []

- id: display_info_treble_level
  label: Display Treble Level
  kind: action
  command: "!1DIF04"
  params: []

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

- id: display_video_format
  label: Display Video Format (temporary)
  kind: action
  command: "!1DIF03"
  params: []

- id: display_mode_wrap
  label: Display Mode Wrap-Around Up
  kind: action
  command: "!1DIFTG"
  params: []

- id: display_mode_query
  label: Get Display Mode
  kind: query
  command: "!1DIFQSTN"
  params: []

# =========================================================================
# MAIN ZONE - OSD Setup Navigation (OSD)
# =========================================================================
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

- id: osd_audio
  label: OSD Audio Adjust Key
  kind: action
  command: "!1OSDAUDIO"
  params: []

- id: osd_video
  label: OSD Video Adjust Key
  kind: action
  command: "!1OSDVIDEO"
  params: []

# =========================================================================
# MAIN ZONE - Memory Setup (MEM)
# =========================================================================
- id: memory_store
  label: Store Memory
  kind: action
  command: "!1MEMSTR"
  params: []

- id: memory_recall
  label: Recall Memory
  kind: action
  command: "!1MEMRCL"
  params: []

- id: memory_lock
  label: Lock Memory
  kind: action
  command: "!1MEMLOCK"
  params: []

- id: memory_unlock
  label: Unlock Memory
  kind: action
  command: "!1MEMUNLK"
  params: []

# =========================================================================
# MAIN ZONE - Audio Information (IFA)
# =========================================================================
- id: audio_info_query
  label: Get Audio Information
  kind: query
  command: "!1IFAQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Video Information (IFV)
# =========================================================================
- id: video_info_query
  label: Get Video Information
  kind: query
  command: "!1IFVQSTN"
  params: []

# =========================================================================
# MAIN ZONE - RECOUT Selector (SLR)
# =========================================================================
- id: recout_select
  label: Set RECOUT Selector
  kind: action
  command: "!1SLR{source}"
  params:
    - name: source
      type: string
      description: |
        Same input codes as SLI (00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4,
        04=VIDEO5, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM,
        25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 30=MULTI CH,
        31=XM), plus 7F=OFF, 80=SOURCE

- id: recout_query
  label: Get RECOUT Selector Position
  kind: query
  command: "!1SLRQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Audio Selector (SLA)
# =========================================================================
- id: audio_selector_set
  label: Set Audio Selector
  kind: action
  command: "!1SLA{mode}"
  params:
    - name: mode
      type: string
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX-OPT, 06=BALANCE"

- id: audio_selector_wrap
  label: Audio Selector Wrap-Around Up
  kind: action
  command: "!1SLAUP"
  params: []

- id: audio_selector_query
  label: Get Audio Selector Status
  kind: query
  command: "!1SLAQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Late Night (LTN)
# =========================================================================
- id: late_night_set
  label: Set Late Night Level
  kind: action
  command: "!1LTN{level}"
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low (DD)/On (TrueHD), 02=High (DD), 03=Auto (TrueHD)"

- id: late_night_wrap
  label: Late Night Wrap-Around Up
  kind: action
  command: "!1LTNUP"
  params: []

- id: late_night_query
  label: Get Late Night Level
  kind: query
  command: "!1LTNQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Re-EQ / Academy Filter (RAS)
# =========================================================================
- id: reeq_set
  label: Set Re-EQ / Academy Filter
  kind: action
  command: "!1RAS{state}"
  params:
    - name: state
      type: string
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On"

- id: reeq_wrap
  label: Re-EQ / Academy Wrap-Around Up
  kind: action
  command: "!1RASUP"
  params: []

- id: reeq_query
  label: Get Re-EQ / Academy State
  kind: query
  command: "!1RASQSTN"
  params: []

# =========================================================================
# MAIN ZONE - Tuner (TUN / PRS / PRM)
# =========================================================================
- id: tuner_tune
  label: Tune Frequency
  kind: action
  command: "!1TUN{frequency}"
  params:
    - name: frequency
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch (0 in first two digits for XM)"

- id: tuner_tune_up
  label: Tune Frequency Wrap-Around Up
  kind: action
  command: "!1TUNUP"
  params: []

- id: tuner_tune_down
  label: Tune Frequency Wrap-Around Down
  kind: action
  command: "!1TUNDOWN"
  params: []

- id: tuner_frequency_query
  label: Get Tuning Frequency
  kind: query
  command: "!1TUNQSTN"
  params: []

- id: preset_set
  label: Set Preset
  kind: action
  command: "!1PRS{number}"
  params:
    - name: number
      type: string
      description: Preset 1-40 (hex 01-28)

- id: preset_up
  label: Preset Wrap-Around Up
  kind: action
  command: "!1PRSUP"
  params: []

- id: preset_down
  label: Preset Wrap-Around Down
  kind: action
  command: "!1PRSDOWN"
  params: []

- id: preset_query
  label: Get Preset Number
  kind: query
  command: "!1PRSQSTN"
  params: []

- id: preset_memory
  label: Preset Memory Store
  kind: action
  command: "!1PRM{number}"
  params:
    - name: number
      type: string
      description: Preset 1-40 (hex 01-28)

# =========================================================================
# MAIN ZONE - RDS Information (RDS)
# =========================================================================
- id: rds_rt
  label: Display RDS RT Information
  kind: action
  command: "!1RDS00"
  params: []

- id: rds_pty
  label: Display RDS PTY Information
  kind: action
  command: "!1RDS01"
  params: []

- id: rds_tp
  label: Display RDS TP Information
  kind: action
  command: "!1RDS02"
  params: []

- id: rds_wrap
  label: RDS Information Wrap-Around
  kind: action
  command: "!1RDSUP"
  params: []

- id: pty_scan_set
  label: PTY Scan Set Number
  kind: action
  command: "!1PTS{number}"
  params:
    - name: number
      type: string
      description: PTY No 0-30 (hex 00-1E)

- id: pty_scan_finish
  label: Finish PTY Scan
  kind: action
  command: "!1PTSENTER"
  params: []

- id: tp_scan_start
  label: Start TP Scan
  kind: action
  command: "!1TPS"
  params: []

- id: tp_scan_finish
  label: Finish TP Scan
  kind: action
  command: "!1TPSENTER"
  params: []

# =========================================================================
# MAIN ZONE - Net / USB Operation (NTC)
# =========================================================================
- id: netusb_play
  label: Net/USB Play
  kind: action
  command: "!1NTCPLAY"
  params: []

- id: netusb_stop
  label: Net/USB Stop
  kind: action
  command: "!1NTCSTOP"
  params: []

- id: netusb_pause
  label: Net/USB Pause
  kind: action
  command: "!1NTCPAUSE"
  params: []

- id: netusb_track_up
  label: Net/USB Track Up
  kind: action
  command: "!1NTCTRUP"
  params: []

- id: netusb_track_down
  label: Net/USB Track Down
  kind: action
  command: "!1NTCTRDN"
  params: []

- id: netusb_ff
  label: Net/USB FF (continuous)
  kind: action
  command: "!1NTCFF"
  params: []

- id: netusb_rew
  label: Net/USB REW (continuous)
  kind: action
  command: "!1NTCREW"
  params: []

- id: netusb_repeat
  label: Net/USB Repeat Key
  kind: action
  command: "!1NTCREPEAT"
  params: []

- id: netusb_random
  label: Net/USB Random Key
  kind: action
  command: "!1NTCRANDOM"
  params: []

- id: netusb_display
  label: Net/USB Display Key
  kind: action
  command: "!1NTCDISPLAY"
  params: []

- id: netusb_album
  label: Net/USB Album Key
  kind: action
  command: "!1NTCALBUM"
  params: []

- id: netusb_artist
  label: Net/USB Artist Key
  kind: action
  command: "!1NTCARTIST"
  params: []

- id: netusb_genre
  label: Net/USB Genre Key
  kind: action
  command: "!1NTCGENRE"
  params: []

- id: netusb_playlist
  label: Net/USB Playlist Key
  kind: action
  command: "!1NTCPLAYLIST"
  params: []

- id: netusb_right
  label: Net/USB Right Key
  kind: action
  command: "!1NTCRIGHT"
  params: []

- id: netusb_left
  label: Net/USB Left Key
  kind: action
  command: "!1NTCLEFT"
  params: []

- id: netusb_up
  label: Net/USB Up Key
  kind: action
  command: "!1NTCUP"
  params: []

- id: netusb_down
  label: Net/USB Down Key
  kind: action
  command: "!1NTCDOWN"
  params: []

- id: netusb_select
  label: Net/USB Select Key
  kind: action
  command: "!1NTCSELECT"
  params: []

- id: netusb_delete
  label: Net/USB Delete Key
  kind: action
  command: "!1NTCDELETE"
  params: []

- id: netusb_caps
  label: Net/USB Caps Key
  kind: action
  command: "!1NTCCAPS"
  params: []

- id: netusb_num
  label: Net/USB Number Key
  kind: action
  command: "!1NTC{digit}"
  params:
    - name: digit
      type: string
      description: "Single digit 0-9"

- id: netusb_location
  label: Net/USB Location Key
  kind: action
  command: "!1NTCLOCATION"
  params: []

- id: netusb_language
  label: Net/USB Language Key
  kind: action
  command: "!1NTCLANGUAGE"
  params: []

- id: netusb_setup
  label: Net/USB Setup Key
  kind: action
  command: "!1NTCSETUP"
  params: []

- id: netusb_return
  label: Net/USB Return Key
  kind: action
  command: "!1NTCRETURN"
  params: []

- id: netusb_ch_up
  label: Net/USB CH Up (for iRadio)
  kind: action
  command: "!1NTCCHUP"
  params: []

- id: netusb_ch_down
  label: Net/USB CH Down (for iRadio)
  kind: action
  command: "!1NTCCHDN"
  params: []

# =========================================================================
# MAIN ZONE - Net / USB Information Queries
# =========================================================================
- id: netusb_artist_info_query
  label: Get Net/USB Artist Name
  kind: query
  command: "!1NATQSTN"
  params: []

- id: netusb_album_info_query
  label: Get Net/USB Album Name
  kind: query
  command: "!1NALQSTN"
  params: []

- id: netusb_title_info_query
  label: Get Net/USB Title Name
  kind: query
  command: "!1NTIQSTN"
  params: []

- id: netusb_time_info_query
  label: Get Net/USB Time Info
  kind: query
  command: "!1NTMQSTN"
  params: []

- id: netusb_track_info_query
  label: Get Net/USB Track Info
  kind: query
  command: "!1NTRQSTN"
  params: []

- id: netusb_status_query
  label: Get Net/USB Play Status
  kind: query
  command: "!1NSTQSTN"
  params: []

- id: net_radio_preset
  label: Set Internet Radio Preset
  kind: action
  command: "!1NPR{number}"
  params:
    - name: number
      type: string
      description: Preset 1-40 (hex 01-28)

# =========================================================================
# MAIN ZONE - 12V Triggers (TGA / TGB / TGC)
# =========================================================================
- id: trigger_a_set
  label: 12V Trigger A
  kind: action
  command: "!1TGA{state}"
  params:
    - name: state
      type: string
      description: "00=Off, 01=On"

- id: trigger_b_set
  label: 12V Trigger B
  kind: action
  command: "!1TGB{state}"
  params:
    - name: state
      type: string
      description: "00=Off, 01=On"

- id: trigger_c_set
  label: 12V Trigger C
  kind: action
  command: "!1TGC{state}"
  params:
    - name: state
      type: string
      description: "00=Off, 01=On"

# =========================================================================
# ZONE 2 - Power (ZPW)
# =========================================================================
- id: zone2_power_on
  label: Zone2 Power On
  kind: action
  command: "!1ZPW01"
  params: []

- id: zone2_power_off
  label: Zone2 Standby
  kind: action
  command: "!1ZPW00"
  params: []

- id: zone2_power_query
  label: Get Zone2 Power Status
  kind: query
  command: "!1ZPWQSTN"
  params: []

# =========================================================================
# ZONE 2 - Muting (ZMT)
# =========================================================================
- id: zone2_mute_on
  label: Zone2 Muting On
  kind: action
  command: "!1ZMT01"
  params: []

- id: zone2_mute_off
  label: Zone2 Muting Off
  kind: action
  command: "!1ZMT00"
  params: []

- id: zone2_mute_toggle
  label: Zone2 Muting Wrap-Around
  kind: action
  command: "!1ZMTTG"
  params: []

- id: zone2_mute_query
  label: Get Zone2 Muting Status
  kind: query
  command: "!1ZMTQSTN"
  params: []

# =========================================================================
# ZONE 2 - Volume (ZVL)
# =========================================================================
- id: zone2_volume_set
  label: Set Zone2 Volume
  kind: action
  command: "!1ZVL{level}"
  params:
    - name: level
      type: string
      description: "Volume 0-100 in hex (00-64)"

- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  command: "!1ZVLUP"
  params: []

- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  command: "!1ZVLDOWN"
  params: []

- id: zone2_volume_query
  label: Get Zone2 Volume Level
  kind: query
  command: "!1ZVLQSTN"
  params: []

# =========================================================================
# ZONE 2 - Tone (ZTN)
# =========================================================================
- id: zone2_tone_set
  label: Set Zone2 Tone
  kind: action
  command: "!1ZTN{BxxTxx}"
  params:
    - name: bass_treble
      type: string
      description: |
        Format BxxTxx where xx is -A..00..+A [-10..0..+10, 2 step].
        Bass: BUP (up 2), BDOWN (down 2). Treble: TUP (up 2), TDOWN (down 2).

- id: zone2_bass_up
  label: Zone2 Bass Up (2 step)
  kind: action
  command: "!1ZTNBUP"
  params: []

- id: zone2_bass_down
  label: Zone2 Bass Down (2 step)
  kind: action
  command: "!1ZTNBDOWN"
  params: []

- id: zone2_treble_up
  label: Zone2 Treble Up (2 step)
  kind: action
  command: "!1ZTNTUP"
  params: []

- id: zone2_treble_down
  label: Zone2 Treble Down (2 step)
  kind: action
  command: "!1ZTNTDOWN"
  params: []

- id: zone2_tone_query
  label: Get Zone2 Tone
  kind: query
  command: "!1ZTNQSTN"
  params: []

# =========================================================================
# ZONE 2 - Balance (ZBL)
# =========================================================================
- id: zone2_balance_set
  label: Set Zone2 Balance
  kind: action
  command: "!1ZBL{level}"
  params:
    - name: level
      type: string
      description: "xx is -A..00..+A [-10..0..+10, 2 step]"

- id: zone2_balance_up
  label: Zone2 Balance Up (to R, 2 step)
  kind: action
  command: "!1ZBLUP"
  params: []

- id: zone2_balance_down
  label: Zone2 Balance Down (to L, 2 step)
  kind: action
  command: "!1ZBLDOWN"
  params: []

- id: zone2_balance_query
  label: Get Zone2 Balance
  kind: query
  command: "!1ZBLQSTN"
  params: []

# =========================================================================
# ZONE 2 - Selector (SLZ)
# =========================================================================
- id: zone2_input_select
  label: Select Zone2 Input
  kind: action
  command: "!1SLZ{source}"
  params:
    - name: source
      type: string
      description: |
        Input code (hex): 00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4,
        04=VIDEO5, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2,
        22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER,
        28=INTERNET RADIO, 29=USB-Front, 2A=USB-Rear, 30=MULTI CH,
        31=XM, 32=SIRIUS, 40=Universal PORT, 80=SOURCE

- id: zone2_input_query
  label: Get Zone2 Selector Position
  kind: query
  command: "!1SLZQSTN"
  params: []

# =========================================================================
# ZONE 2 - Tuner (TUZ / PRZ)
# =========================================================================
- id: zone2_tuner_tune
  label: Zone2 Tune Frequency
  kind: action
  command: "!1TUZ{frequency}"
  params:
    - name: frequency
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz"

- id: zone2_tuner_up
  label: Zone2 Tune Wrap-Around Up
  kind: action
  command: "!1TUZUP"
  params: []

- id: zone2_tuner_down
  label: Zone2 Tune Wrap-Around Down
  kind: action
  command: "!1TUZDOWN"
  params: []

- id: zone2_tuner_query
  label: Get Zone2 Tuning Frequency
  kind: query
  command: "!1TUZQSTN"
  params: []

- id: zone2_preset_set
  label: Set Zone2 Preset
  kind: action
  command: "!1PRZ{number}"
  params:
    - name: number
      type: string
      description: Preset 1-40 (hex 01-28)

- id: zone2_preset_up
  label: Zone2 Preset Wrap-Around Up
  kind: action
  command: "!1PRZUP"
  params: []

- id: zone2_preset_down
  label: Zone2 Preset Wrap-Around Down
  kind: action
  command: "!1PRZDOWN"
  params: []

- id: zone2_preset_query
  label: Get Zone2 Preset Number
  kind: query
  command: "!1PRZQSTN"
  params: []

# =========================================================================
# ZONE 2 - Net Operation (NTZ / NPZ)
# =========================================================================
- id: zone2_net_play
  label: Zone2 Net Play Key
  kind: action
  command: "!1NTZPLAY"
  params: []

- id: zone2_net_stop
  label: Zone2 Net Stop Key
  kind: action
  command: "!1NTZSTOP"
  params: []

- id: zone2_net_pause
  label: Zone2 Net Pause Key
  kind: action
  command: "!1NTZPAUSE"
  params: []

- id: zone2_net_track_up
  label: Zone2 Net Track Up
  kind: action
  command: "!1NTZTRUP"
  params: []

- id: zone2_net_track_down
  label: Zone2 Net Track Down
  kind: action
  command: "!1NTZTRDN"
  params: []

- id: zone2_net_ch_up
  label: Zone2 Net CH Up (iRadio)
  kind: action
  command: "!1NTZCHUP"
  params: []

- id: zone2_net_ch_down
  label: Zone2 Net CH Down (iRadio)
  kind: action
  command: "!1NTZCHDN"
  params: []

- id: zone2_net_radio_preset
  label: Zone2 Internet Radio Preset
  kind: action
  command: "!1NPZ{number}"
  params:
    - name: number
      type: string
      description: Preset 1-40 (hex 01-28)

# =========================================================================
# ZONE 2 - Listening Mode / Late Night / Re-EQ (LMZ / LTZ / RAZ)
# =========================================================================
- id: zone2_listening_mode_set
  label: Set Zone2 Listening Mode
  kind: action
  command: "!1LMZ{mode}"
  params:
    - name: mode
      type: string
      description: "00=STEREO, 01=DIRECT, 0F=MONO, 12=MULTIPLEX, 87=DVS(PL2), 88=DVS(NEO6)"

- id: zone2_late_night_set
  label: Set Zone2 Late Night Level
  kind: action
  command: "!1LTZ{level}"
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low, 02=High"

- id: zone2_late_night_wrap
  label: Zone2 Late Night Wrap-Around Up
  kind: action
  command: "!1LTZUP"
  params: []

- id: zone2_late_night_query
  label: Get Zone2 Late Night Level
  kind: query
  command: "!1LTZQSTN"
  params: []

- id: zone2_reeq_set
  label: Set Zone2 Re-EQ / Academy Filter
  kind: action
  command: "!1RAZ{state}"
  params:
    - name: state
      type: string
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On"

- id: zone2_reeq_wrap
  label: Zone2 Re-EQ / Academy Wrap-Around Up
  kind: action
  command: "!1RAZUP"
  params: []

- id: zone2_reeq_query
  label: Get Zone2 Re-EQ / Academy State
  kind: query
  command: "!1RAZQSTN"
  params: []

# =========================================================================
# ZONE 3 - Power / Muting / Volume / Selector / Tuner / Preset / Net
# UNRESOLVED: Zone3 support on TX-SR875 not confirmed from source model columns
# =========================================================================
- id: zone3_power_on
  label: Zone3 Power On
  kind: action
  command: "!1PW301"
  params: []

- id: zone3_power_off
  label: Zone3 Standby
  kind: action
  command: "!1PW300"
  params: []

- id: zone3_power_query
  label: Get Zone3 Power Status
  kind: query
  command: "!1PW3QSTN"
  params: []

- id: zone3_mute_on
  label: Zone3 Muting On
  kind: action
  command: "!1MT301"
  params: []

- id: zone3_mute_off
  label: Zone3 Muting Off
  kind: action
  command: "!1MT300"
  params: []

- id: zone3_mute_toggle
  label: Zone3 Muting Wrap-Around
  kind: action
  command: "!1MT3TG"
  params: []

- id: zone3_mute_query
  label: Get Zone3 Muting Status
  kind: query
  command: "!1MT3QSTN"
  params: []

- id: zone3_volume_set
  label: Set Zone3 Volume
  kind: action
  command: "!1VL3{level}"
  params:
    - name: level
      type: string
      description: "Volume 0-100 in hex (00-64)"

- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  command: "!1VL3UP"
  params: []

- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  command: "!1VL3DOWN"
  params: []

- id: zone3_volume_query
  label: Get Zone3 Volume Level
  kind: query
  command: "!1VL3QSTN"
  params: []

- id: zone3_tone_bass_up
  label: Zone3 Bass Up (2 step)
  kind: action
  command: "!1TN3BUP"
  params: []

- id: zone3_tone_bass_down
  label: Zone3 Bass Down (2 step)
  kind: action
  command: "!1TN3BDOWN"
  params: []

- id: zone3_tone_treble_up
  label: Zone3 Treble Up (2 step)
  kind: action
  command: "!1TN3TUP"
  params: []

- id: zone3_tone_treble_down
  label: Zone3 Treble Down (2 step)
  kind: action
  command: "!1TN3TDOWN"
  params: []

- id: zone3_tone_query
  label: Get Zone3 Tone
  kind: query
  command: "!1TN3QSTN"
  params: []

- id: zone3_balance_set
  label: Set Zone3 Balance
  kind: action
  command: "!1BL3{level}"
  params:
    - name: level
      type: string
      description: "xx is -A..00..+A [-10..0..+10, 2 step]"

- id: zone3_balance_up
  label: Zone3 Balance Up (to R, 2 step)
  kind: action
  command: "!1BL3UP"
  params: []

- id: zone3_balance_down
  label: Zone3 Balance Down (to L, 2 step)
  kind: action
  command: "!1BL3DOWN"
  params: []

- id: zone3_balance_query
  label: Get Zone3 Balance
  kind: query
  command: "!1BL3QSTN"
  params: []

- id: zone3_input_select
  label: Select Zone3 Input
  kind: action
  command: "!1SL3{source}"
  params:
    - name: source
      type: string
      description: |
        Same input codes as Zone2: 00-06=VIDEO1-7, 10=DVD, 20-21=TAPE1-2,
        22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER,
        28=INTERNET RADIO, 29=USB-Front, 2A=USB-Rear, 30=MULTI CH,
        31=XM, 32=SIRIUS, 40=Universal PORT, 80=SOURCE

- id: zone3_input_query
  label: Get Zone3 Selector Position
  kind: query
  command: "!1SL3QSTN"
  params: []

- id: zone3_tuner_tune
  label: Zone3 Tune Frequency
  kind: action
  command: "!1TU3{frequency}"
  params:
    - name: frequency
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz"

- id: zone3_tuner_up
  label: Zone3 Tune Wrap-Around Up
  kind: action
  command: "!1TU3UP"
  params: []

- id: zone3_tuner_down
  label: Zone3 Tune Wrap-Around Down
  kind: action
  command: "!1TU3DOWN"
  params: []

- id: zone3_tuner_query
  label: Get Zone3 Tuning Frequency
  kind: query
  command: "!1TU3QSTN"
  params: []

- id: zone3_preset_set
  label: Set Zone3 Preset
  kind: action
  command: "!1PR3{number}"
  params:
    - name: number
      type: string
      description: Preset 1-40 (hex 01-28)

- id: zone3_preset_up
  label: Zone3 Preset Wrap-Around Up
  kind: action
  command: "!1PR3UP"
  params: []

- id: zone3_preset_down
  label: Zone3 Preset Wrap-Around Down
  kind: action
  command: "!1PR3DOWN"
  params: []

- id: zone3_preset_query
  label: Get Zone3 Preset Number
  kind: query
  command: "!1PR3QSTN"
  params: []

- id: zone3_net_play
  label: Zone3 Net Play Key
  kind: action
  command: "!1NT3PLAY"
  params: []

- id: zone3_net_stop
  label: Zone3 Net Stop Key
  kind: action
  command: "!1NT3STOP"
  params: []

- id: zone3_net_pause
  label: Zone3 Net Pause Key
  kind: action
  command: "!1NT3PAUSE"
  params: []

- id: zone3_net_track_up
  label: Zone3 Net Track Up
  kind: action
  command: "!1NT3TRUP"
  params: []

- id: zone3_net_track_down
  label: Zone3 Net Track Down
  kind: action
  command: "!1NT3TRDN"
  params: []

- id: zone3_net_radio_preset
  label: Zone3 Internet Radio Preset
  kind: action
  command: "!1NP3{number}"
  params:
    - name: number
      type: string
      description: Preset 1-40 (hex 01-28)

# =========================================================================
# RI SYSTEM - CD Player (CCD)
# Controls external CD player connected via RI bus
# =========================================================================
- id: ri_cd_track
  label: RI CD Track+
  kind: action
  command: "!1CCDTRACK"
  params: []

- id: ri_cd_play
  label: RI CD Play
  kind: action
  command: "!1CCDPLAY"
  params: []

- id: ri_cd_stop
  label: RI CD Stop
  kind: action
  command: "!1CCDSTOP"
  params: []

- id: ri_cd_pause
  label: RI CD Pause
  kind: action
  command: "!1CCDPAUSE"
  params: []

- id: ri_cd_skip_f
  label: RI CD Skip Forward
  kind: action
  command: "!1CCDSKIP.F"
  params: []

- id: ri_cd_skip_r
  label: RI CD Skip Reverse
  kind: action
  command: "!1CCDSKIP.R"
  params: []

- id: ri_cd_memory
  label: RI CD Memory
  kind: action
  command: "!1CCDMEMORY"
  params: []

- id: ri_cd_clear
  label: RI CD Clear
  kind: action
  command: "!1CCDCLEAR"
  params: []

- id: ri_cd_repeat
  label: RI CD Repeat
  kind: action
  command: "!1CCDREPEAT"
  params: []

- id: ri_cd_random
  label: RI CD Random
  kind: action
  command: "!1CCDRANDOM"
  params: []

- id: ri_cd_disp
  label: RI CD Display
  kind: action
  command: "!1CCDDISP"
  params: []

- id: ri_cd_dmode
  label: RI CD D.Mode
  kind: action
  command: "!1CCDD.MODE"
  params: []

- id: ri_cd_ff
  label: RI CD FF
  kind: action
  command: "!1CCDFF"
  params: []

- id: ri_cd_rew
  label: RI CD REW
  kind: action
  command: "!1CCDREW"
  params: []

- id: ri_cd_opcl
  label: RI CD Open/Close
  kind: action
  command: "!1CCDOP/CL"
  params: []

- id: ri_cd_num
  label: RI CD Number Key
  kind: action
  command: "!1CCD{digit}"
  params:
    - name: digit
      type: string
      description: "0-9, 10, +10"

- id: ri_cd_dskip
  label: RI CD Disc Skip (DISC+)
  kind: action
  command: "!1CCDD.SKIP"
  params: []

- id: ri_cd_disc_f
  label: RI CD Disc Forward
  kind: action
  command: "!1CCDDISC.F"
  params: []

- id: ri_cd_disc_r
  label: RI CD Disc Reverse
  kind: action
  command: "!1CCDDISC.R"
  params: []

- id: ri_cd_disc
  label: RI CD Direct Disc Select
  kind: action
  command: "!1CCD{DISCn}"
  params:
    - name: DISCn
      type: string
      description: "DISC1-DISC6"

- id: ri_cd_standby
  label: RI CD Standby
  kind: action
  command: "!1CCDSTBY"
  params: []

- id: ri_cd_power_on
  label: RI CD Power On
  kind: action
  command: "!1CCDPON"
  params: []

# =========================================================================
# RI SYSTEM - Tape1/A (CT1)
# =========================================================================
- id: ri_tape1_play_f
  label: RI Tape1 Play Forward
  kind: action
  command: "!1CT1PLAY.F"
  params: []

- id: ri_tape1_play_r
  label: RI Tape1 Play Reverse
  kind: action
  command: "!1CT1PLAY.R"
  params: []

- id: ri_tape1_stop
  label: RI Tape1 Stop
  kind: action
  command: "!1CT1STOP"
  params: []

- id: ri_tape1_rec_pause
  label: RI Tape1 Rec/Pause
  kind: action
  command: "!1CT1RC/PAU"
  params: []

- id: ri_tape1_ff
  label: RI Tape1 FF
  kind: action
  command: "!1CT1FF"
  params: []

- id: ri_tape1_rew
  label: RI Tape1 REW
  kind: action
  command: "!1CT1REW"
  params: []

# =========================================================================
# RI SYSTEM - Tape2/B (CT2)
# =========================================================================
- id: ri_tape2_play_f
  label: RI Tape2 Play Forward
  kind: action
  command: "!1CT2PLAY.F"
  params: []

- id: ri_tape2_play_r
  label: RI Tape2 Play Reverse
  kind: action
  command: "!1CT2PLAY.R"
  params: []

- id: ri_tape2_stop
  label: RI Tape2 Stop
  kind: action
  command: "!1CT2STOP"
  params: []

- id: ri_tape2_rec_pause
  label: RI Tape2 Rec/Pause
  kind: action
  command: "!1CT2RC/PAU"
  params: []

- id: ri_tape2_ff
  label: RI Tape2 FF
  kind: action
  command: "!1CT2FF"
  params: []

- id: ri_tape2_rew
  label: RI Tape2 REW
  kind: action
  command: "!1CT2REW"
  params: []

- id: ri_tape2_opcl
  label: RI Tape2 Open/Close
  kind: action
  command: "!1CT2OP/CL"
  params: []

- id: ri_tape2_skip_f
  label: RI Tape2 Skip Forward
  kind: action
  command: "!1CT2SKIP.F"
  params: []

- id: ri_tape2_skip_r
  label: RI Tape2 Skip Reverse
  kind: action
  command: "!1CT2SKIP.R"
  params: []

- id: ri_tape2_rec
  label: RI Tape2 Record
  kind: action
  command: "!1CT2REC"
  params: []

# =========================================================================
# RI SYSTEM - Graphics Equalizer (CEQ)
# =========================================================================
- id: ri_geq_preset
  label: RI Graphics EQ Preset
  kind: action
  command: "!1CEQPRESET"
  params: []

# =========================================================================
# RI SYSTEM - DAT Recorder (CDT)
# =========================================================================
- id: ri_dat_play
  label: RI DAT Play
  kind: action
  command: "!1CDTPLAY"
  params: []

- id: ri_dat_rec_pause
  label: RI DAT Rec/Pause
  kind: action
  command: "!1CDTRC/PAU"
  params: []

- id: ri_dat_stop
  label: RI DAT Stop
  kind: action
  command: "!1CDTSTOP"
  params: []

- id: ri_dat_skip_f
  label: RI DAT Skip Forward
  kind: action
  command: "!1CDTSKIP.F"
  params: []

- id: ri_dat_skip_r
  label: RI DAT Skip Reverse
  kind: action
  command: "!1CDTSKIP.R"
  params: []

- id: ri_dat_ff
  label: RI DAT FF
  kind: action
  command: "!1CDTFF"
  params: []

- id: ri_dat_rew
  label: RI DAT REW
  kind: action
  command: "!1CDTREW"
  params: []

# =========================================================================
# RI SYSTEM - DVD Player (CDV)
# =========================================================================
- id: ri_dvd_power_on
  label: RI DVD Power On
  kind: action
  command: "!1CDVPWRON"
  params: []

- id: ri_dvd_power_off
  label: RI DVD Power Off
  kind: action
  command: "!1CDVPWROFF"
  params: []

- id: ri_dvd_play
  label: RI DVD Play
  kind: action
  command: "!1CDVPLAY"
  params: []

- id: ri_dvd_stop
  label: RI DVD Stop
  kind: action
  command: "!1CDVSTOP"
  params: []

- id: ri_dvd_skip_f
  label: RI DVD Skip Forward
  kind: action
  command: "!1CDVSKIP.F"
  params: []

- id: ri_dvd_skip_r
  label: RI DVD Skip Reverse
  kind: action
  command: "!1CDVSKIP.R"
  params: []

- id: ri_dvd_ff
  label: RI DVD FF
  kind: action
  command: "!1CDVFF"
  params: []

- id: ri_dvd_rew
  label: RI DVD REW
  kind: action
  command: "!1CDVREW"
  params: []

- id: ri_dvd_pause
  label: RI DVD Pause
  kind: action
  command: "!1CDVPAUSE"
  params: []

- id: ri_dvd_last_play
  label: RI DVD Last Play
  kind: action
  command: "!1CDVLASTPLAY"
  params: []

- id: ri_dvd_subtitle_toggle
  label: RI DVD Subtitle On/Off
  kind: action
  command: "!1CDVSUBTON/OFF"
  params: []

- id: ri_dvd_subtitle
  label: RI DVD Subtitle
  kind: action
  command: "!1CDVSUBTITLE"
  params: []

- id: ri_dvd_setup
  label: RI DVD Setup
  kind: action
  command: "!1CDVSETUP"
  params: []

- id: ri_dvd_topmenu
  label: RI DVD Top Menu
  kind: action
  command: "!1CDVTOPMENU"
  params: []

- id: ri_dvd_menu
  label: RI DVD Menu
  kind: action
  command: "!1CDVMENU"
  params: []

- id: ri_dvd_up
  label: RI DVD Up
  kind: action
  command: "!1CDVUP"
  params: []

- id: ri_dvd_down
  label: RI DVD Down
  kind: action
  command: "!1CDVDOWN"
  params: []

- id: ri_dvd_left
  label: RI DVD Left
  kind: action
  command: "!1CDVLEFT"
  params: []

- id: ri_dvd_right
  label: RI DVD Right
  kind: action
  command: "!1CDVRIGHT"
  params: []

- id: ri_dvd_enter
  label: RI DVD Enter
  kind: action
  command: "!1CDVENTER"
  params: []

- id: ri_dvd_return
  label: RI DVD Return
  kind: action
  command: "!1CDVRETURN"
  params: []

- id: ri_dvd_disc_f
  label: RI DVD Disc Forward
  kind: action
  command: "!1CDVDISC.F"
  params: []

- id: ri_dvd_disc_r
  label: RI DVD Disc Reverse
  kind: action
  command: "!1CDVDISC.R"
  params: []

- id: ri_dvd_audio
  label: RI DVD Audio
  kind: action
  command: "!1CDVAUDIO"
  params: []

- id: ri_dvd_random
  label: RI DVD Random
  kind: action
  command: "!1CDVRANDOM"
  params: []

- id: ri_dvd_opcl
  label: RI DVD Open/Close
  kind: action
  command: "!1CDVOP/CL"
  params: []

- id: ri_dvd_angle
  label: RI DVD Angle
  kind: action
  command: "!1CDVANGLE"
  params: []

- id: ri_dvd_num
  label: RI DVD Number Key
  kind: action
  command: "!1CDV{digit}"
  params:
    - name: digit
      type: string
      description: "0-9, 10"

- id: ri_dvd_search
  label: RI DVD Search
  kind: action
  command: "!1CDVSEARCH"
  params: []

- id: ri_dvd_disp
  label: RI DVD Display
  kind: action
  command: "!1CDVDISP"
  params: []

- id: ri_dvd_repeat
  label: RI DVD Repeat
  kind: action
  command: "!1CDVREPEAT"
  params: []

- id: ri_dvd_memory
  label: RI DVD Memory
  kind: action
  command: "!1CDVMEMORY"
  params: []

- id: ri_dvd_clear
  label: RI DVD Clear
  kind: action
  command: "!1CDVCLEAR"
  params: []

- id: ri_dvd_abr
  label: RI DVD A-B Repeat
  kind: action
  command: "!1CDVABR"
  params: []

- id: ri_dvd_step_f
  label: RI DVD Step Forward
  kind: action
  command: "!1CDVSTEP.F"
  params: []

- id: ri_dvd_step_r
  label: RI DVD Step Reverse
  kind: action
  command: "!1CDVSTEP.R"
  params: []

- id: ri_dvd_slow_f
  label: RI DVD Slow Forward
  kind: action
  command: "!1CDVSLOW.F"
  params: []

- id: ri_dvd_slow_r
  label: RI DVD Slow Reverse
  kind: action
  command: "!1CDVSLOW.R"
  params: []

- id: ri_dvd_zoom
  label: RI DVD Zoom Toggle
  kind: action
  command: "!1CDVZOOMTG"
  params: []

- id: ri_dvd_zoom_up
  label: RI DVD Zoom Up
  kind: action
  command: "!1CDVZOOMUP"
  params: []

- id: ri_dvd_zoom_dn
  label: RI DVD Zoom Down
  kind: action
  command: "!1CDVZOOMDN"
  params: []

- id: ri_dvd_progressive
  label: RI DVD Progressive
  kind: action
  command: "!1CDVPROGRE"
  params: []

- id: ri_dvd_vdoff
  label: RI DVD Video On/Off
  kind: action
  command: "!1CDVVDOFF"
  params: []

- id: ri_dvd_condmem
  label: RI DVD Condition Memory
  kind: action
  command: "!1CDVCONMEM"
  params: []

- id: ri_dvd_funmem
  label: RI DVD Function Memory
  kind: action
  command: "!1CDVFUNMEM"
  params: []

- id: ri_dvd_disc
  label: RI DVD Direct Disc Select
  kind: action
  command: "!1CDV{DISCn}"
  params:
    - name: DISCn
      type: string
      description: "DISC1-DISC6"

- id: ri_dvd_folder_up
  label: RI DVD Folder Up
  kind: action
  command: "!1CDVFOLDUP"
  params: []

- id: ri_dvd_folder_dn
  label: RI DVD Folder Down
  kind: action
  command: "!1CDVFOLDDN"
  params: []

# =========================================================================
# RI SYSTEM - MD Recorder (CMD)
# =========================================================================
- id: ri_md_play
  label: RI MD Play
  kind: action
  command: "!1CMDPLAY"
  params: []

- id: ri_md_stop
  label: RI MD Stop
  kind: action
  command: "!1CMDSTOP"
  params: []

- id: ri_md_ff
  label: RI MD FF
  kind: action
  command: "!1CMDFF"
  params: []

- id: ri_md_rew
  label: RI MD REW
  kind: action
  command: "!1CMDREW"
  params: []

- id: ri_md_pmode
  label: RI MD Play Mode
  kind: action
  command: "!1CMDP.MODE"
  params: []

- id: ri_md_skip_f
  label: RI MD Skip Forward
  kind: action
  command: "!1CMDSKIP.F"
  params: []

- id: ri_md_skip_r
  label: RI MD Skip Reverse
  kind: action
  command: "!1CMDSKIP.R"
  params: []

- id: ri_md_pause
  label: RI MD Pause
  kind: action
  command: "!1CMDPAUSE"
  params: []

- id: ri_md_rec
  label: RI MD Record
  kind: action
  command: "!1CMDREC"
  params: []

- id: ri_md_memory
  label: RI MD Memory
  kind: action
  command: "!1CMDMEMORY"
  params: []

- id: ri_md_disp
  label: RI MD Display
  kind: action
  command: "!1CMDDISP"
  params: []

- id: ri_md_scroll
  label: RI MD Scroll
  kind: action
  command: "!1CMDSCROLL"
  params: []

- id: ri_md_mscan
  label: RI MD Music Scan
  kind: action
  command: "!1CMDM.SCAN"
  params: []

- id: ri_md_clear
  label: RI MD Clear
  kind: action
  command: "!1CMDCLEAR"
  params: []

- id: ri_md_random
  label: RI MD Random
  kind: action
  command: "!1CMDRANDOM"
  params: []

- id: ri_md_repeat
  label: RI MD Repeat
  kind: action
  command: "!1CMDREPEAT"
  params: []

- id: ri_md_enter
  label: RI MD Enter
  kind: action
  command: "!1CMDENTER"
  params: []

- id: ri_md_eject
  label: RI MD Eject
  kind: action
  command: "!1CMDEJECT"
  params: []

- id: ri_md_num
  label: RI MD Number Key
  kind: action
  command: "!1CMD{digit}"
  params:
    - name: digit
      type: string
      description: "1-9, 10/0, nn/nnn"

- id: ri_md_name
  label: RI MD Name
  kind: action
  command: "!1CMDNAME"
  params: []

- id: ri_md_group
  label: RI MD Group
  kind: action
  command: "!1CMDGROUP"
  params: []

- id: ri_md_standby
  label: RI MD Standby
  kind: action
  command: "!1CMDSTBY"
  params: []

# =========================================================================
# RI SYSTEM - CD-R Recorder (CCR)
# =========================================================================
- id: ri_cdr_pmode
  label: RI CD-R Play Mode
  kind: action
  command: "!1CCRP.MODE"
  params: []

- id: ri_cdr_play
  label: RI CD-R Play
  kind: action
  command: "!1CCRPLAY"
  params: []

- id: ri_cdr_stop
  label: RI CD-R Stop
  kind: action
  command: "!1CCRSTOP"
  params: []

- id: ri_cdr_skip_f
  label: RI CD-R Skip Forward
  kind: action
  command: "!1CCRSKIP.F"
  params: []

- id: ri_cdr_skip_r
  label: RI CD-R Skip Reverse
  kind: action
  command: "!1CCRSKIP.R"
  params: []

- id: ri_cdr_pause
  label: RI CD-R Pause
  kind: action
  command: "!1CCRPAUSE"
  params: []

- id: ri_cdr_rec
  label: RI CD-R Record
  kind: action
  command: "!1CCRREC"
  params: []

- id: ri_cdr_clear
  label: RI CD-R Clear
  kind: action
  command: "!1CCRCLEAR"
  params: []

- id: ri_cdr_repeat
  label: RI CD-R Repeat
  kind: action
  command: "!1CCRREPEAT"
  params: []

- id: ri_cdr_num
  label: RI CD-R Number Key
  kind: action
  command: "!1CCR{digit}"
  params:
    - name: digit
      type: string
      description: "1-9, 10/0, nn/nnn"

- id: ri_cdr_scroll
  label: RI CD-R Scroll
  kind: action
  command: "!1CCRSCROLL"
  params: []

- id: ri_cdr_opcl
  label: RI CD-R Open/Close
  kind: action
  command: "!1CCROP/CL"
  params: []

- id: ri_cdr_disp
  label: RI CD-R Display
  kind: action
  command: "!1CCRDISP"
  params: []

- id: ri_cdr_random
  label: RI CD-R Random
  kind: action
  command: "!1CCRRANDOM"
  params: []

- id: ri_cdr_memory
  label: RI CD-R Memory
  kind: action
  command: "!1CCRMEMORY"
  params: []

- id: ri_cdr_ff
  label: RI CD-R FF
  kind: action
  command: "!1CCRFF"
  params: []

- id: ri_cdr_rew
  label: RI CD-R REW
  kind: action
  command: "!1CCRREW"
  params: []

- id: ri_cdr_standby
  label: RI CD-R Standby
  kind: action
  command: "!1CCRSTBY"
  params: []

# =========================================================================
# RI SYSTEM - Docking Station (CDS) - iPod dock via RI
# =========================================================================
- id: ri_dock_power_on
  label: RI Dock Power On
  kind: action
  command: "!1CDSPWRON"
  params: []

- id: ri_dock_power_off
  label: RI Dock Standby
  kind: action
  command: "!1CDSPWROFF"
  params: []

- id: ri_dock_play_resume
  label: RI Dock Play/Resume
  kind: action
  command: "!1CDSPLY/RES"
  params: []

- id: ri_dock_stop
  label: RI Dock Stop
  kind: action
  command: "!1CDSSTOP"
  params: []

- id: ri_dock_skip_f
  label: RI Dock Track Up
  kind: action
  command: "!1CDSSKIP.F"
  params: []

- id: ri_dock_skip_r
  label: RI Dock Track Down
  kind: action
  command: "!1CDSSKIP.R"
  params: []

- id: ri_dock_pause
  label: RI Dock Pause
  kind: action
  command: "!1CDSPAUSE"
  params: []

- id: ri_dock_play_pause
  label: RI Dock Play/Pause
  kind: action
  command: "!1CDSPLY/PAU"
  params: []

- id: ri_dock_ff
  label: RI Dock FF
  kind: action
  command: "!1CDSFF"
  params: []

- id: ri_dock_rew
  label: RI Dock FR
  kind: action
  command: "!1CDSREW"
  params: []

- id: ri_dock_album_up
  label: RI Dock Album Up
  kind: action
  command: "!1CDSALBUM+"
  params: []

- id: ri_dock_album_down
  label: RI Dock Album Down
  kind: action
  command: "!1CDSALBUM-"
  params: []

- id: ri_dock_playlist_up
  label: RI Dock Playlist Up
  kind: action
  command: "!1CDSPLIST+"
  params: []

- id: ri_dock_playlist_down
  label: RI Dock Playlist Down
  kind: action
  command: "!1CDSPLIST-"
  params: []

- id: ri_dock_chapter_up
  label: RI Dock Chapter Up
  kind: action
  command: "!1CDSCHAPT+"
  params: []

- id: ri_dock_chapter_down
  label: RI Dock Chapter Down
  kind: action
  command: "!1CDSCHAPT-"
  params: []

- id: ri_dock_random
  label: RI Dock Shuffle
  kind: action
  command: "!1CDSRANDOM"
  params: []

- id: ri_dock_repeat
  label: RI Dock Repeat
  kind: action
  command: "!1CDSREPEAT"
  params: []

- id: ri_dock_mute
  label: RI Dock Mute
  kind: action
  command: "!1CDSMUTE"
  params: []

- id: ri_dock_blight
  label: RI Dock Backlight
  kind: action
  command: "!1CDSBLIGHT"
  params: []

- id: ri_dock_menu
  label: RI Dock Menu
  kind: action
  command: "!1CDSMENU"
  params: []

- id: ri_dock_enter
  label: RI Dock Select
  kind: action
  command: "!1CDSENTER"
  params: []

- id: ri_dock_up
  label: RI Dock Cursor Up
  kind: action
  command: "!1CDSUP"
  params: []

- id: ri_dock_down
  label: RI Dock Cursor Down
  kind: action
  command: "!1CDSDOWN"
  params: []

# =========================================================================
# ADDITIONAL SOURCE COMMANDS
# command below is the literal three-character source opcode.
# Frame these entries as !1 + command + the parameter value + end character.
# xx and nnnnn denote source parameter formats, not characters to transmit.
# QSTN is the documented question parameter wherever listed.
# UNRESOLVED: TX-SR875 applicability of these additional command families.
# =========================================================================
- id: speaker_a_control
  label: Speaker A Control
  kind: action
  command: "SPA"
  params:
    - name: parameter
      type: string
      description: '"00": sets Speaker Off; "01": sets Speaker On; "UP": sets Speaker Switch Wrap-Around; "QSTN": gets the Speaker State. SPA=MAIN A or Front A; model mapping UNRESOLVED.'

- id: speaker_b_control
  label: Speaker B Control
  kind: action
  command: "SPB"
  params:
    - name: parameter
      type: string
      description: '"00": sets Speaker Off; "01": sets Speaker On; "UP": sets Speaker Switch Wrap-Around; "QSTN": gets the Speaker State. SPB=MAIN B or Front B(Exclucive use); model mapping UNRESOLVED.'

- id: speaker_layout_control
  label: Speaker Layout Control
  kind: action
  command: "SPL"
  params:
    - name: parameter
      type: string
      description: '"SB": sets SurrBack Speaker; "FH": sets Front High Speaker / SurrBack+Front High Speakers; "FW": sets Front Wide Speaker / SurrBack+Front Wide Speakers; "UP": sets Speaker Switch Wrap-Around; "QSTN": gets the Speaker State.'

- id: front_tone_control
  label: Front Tone Control
  kind: action
  command: "TFR"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx": Front Bass; "Txx": Front Treble.
        xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP": sets Front Bass up(2 step); "BDOWN": sets Front Bass down(2 step).
        "TUP": sets Front Treble up(2 step); "TDOWN": sets Front Treble down(2 step).
        "QSTN": gets Front Tone ("BxxTxx").

- id: front_wide_tone_control
  label: Front Wide Tone Control
  kind: action
  command: "TFW"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx": Front Wide Bass; "Txx": Front Wide Treble.
        xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP": sets Front Wide Bass up(2 step); "BDOWN": sets Front Wide Bass down(2 step).
        "TUP": sets Front Wide Treble up(2 step); "TDOWN": sets Front Wide Treble down(2 step).
        "QSTN": gets Front Wide Tone ("BxxTxx").

- id: front_high_tone_control
  label: Front High Tone Control
  kind: action
  command: "TFH"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx": Front High Bass; "Txx": Front High Treble.
        xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP": sets Front High Bass up(2 step); "BDOWN": sets Front High Bass down(2 step).
        "TUP": sets Front High Treble up(2 step); "TDOWN": sets Front High Treble down(2 step).
        "QSTN": gets Front High Tone ("BxxTxx").

- id: center_tone_control
  label: Center Tone Control
  kind: action
  command: "TCT"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx": Center Bass; "Txx": Center Treble.
        xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP": sets Center Bass up(2 step); "BDOWN": sets Center Bass down(2 step).
        "TUP": sets Center Treble up(2 step); "TDOWN": sets Center Treble down(2 step).
        "QSTN": gets Cetner Tone ("BxxTxx").

- id: surround_tone_control
  label: Surround Tone Control
  kind: action
  command: "TSR"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx": Surround Bass; "Txx": Surround Treble.
        xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP": sets Surround Bass up(2 step); "BDOWN": sets Surround Bass down(2 step).
        "TUP": sets Surround Treble up(2 step); "TDOWN": sets Surround Treble down(2 step).
        "QSTN": gets Surround Tone ("BxxTxx").

- id: surround_back_tone_control
  label: Surround Back Tone Control
  kind: action
  command: "TSB"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx": Surround Back Bass; "Txx": Surround Back Treble.
        xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP": sets Surround Back Bass up(2 step); "BDOWN": sets Surround Back Bass down(2 step).
        "TUP": sets Surround Back Treble up(2 step); "TDOWN": sets Surround Back Treble down(2 step).
        "QSTN": gets Surround Back Tone ("BxxTxx").

- id: subwoofer_tone_control
  label: Subwoofer Tone Control
  kind: action
  command: "TSW"
  params:
    - name: parameter
      type: string
      description: |
        "Bxx": Subwoofer Bass.
        xx is"-A"..."00"..."+A"[-10...0...+10 2 step]
        "BUP": sets Subwoofer Bass up(2 step); "BDOWN": sets Subwoofer Bass down(2 step).
        "QSTN": gets Subwoofer Tone ("BxxTxx"). No Txx, TUP or TDOWN command documented for TSW.

- id: subwoofer_temporary_level_control
  label: Subwoofer Temporary Level Control
  kind: action
  command: "SWL"
  params:
    - name: parameter
      type: string
      description: '"-F"-"00"-"+C": sets Subwoofer Level-15dB-0dB-+12dB; "UP": LEVEL + Key; "DOWN": LEVEL–KEY; "QSTN": gets the Subwoofer Level.'

- id: center_temporary_level_control
  label: Center Temporary Level Control
  kind: action
  command: "CTL"
  params:
    - name: parameter
      type: string
      description: '"-C"-"00"-"+C": sets Center Level-12dB-0dB-+12dB; "UP": LEVEL + Key; "DOWN": LEVEL–KEY; "QSTN": documented under CTL, but source says gets the Subwoofer Level; queried value UNRESOLVED.'

- id: display_mode_legacy_wrap
  label: Display Mode Legacy Wrap-Around Up
  kind: action
  command: "DIF"
  params:
    - name: parameter
      type: string
      description: '"UP": Parameter Character is"UP" for the source DIF *1 model variants. TX-SR875 applicability UNRESOLVED.'

- id: video_output_control
  label: Video Output Control
  kind: action
  command: "VOS"
  params:
    - name: parameter
      type: string
      description: 'Japanese Model Only. "00": sets D4; "01": sets Component; "QSTN": gets The Selector Position.'

- id: hdmi_output_control
  label: HDMI Output Control
  kind: action
  command: "HDO"
  params:
    - name: parameter
      type: string
      description: '"00": No / Analog; "01": Yes/Out Main / HDMI Main; "02": Out Sub / HDMI Sub; "03": Both; "04": Both(Main); "05": Both(Sub); "UP": sets HDMI Out Selector Wrap-Around Up; "QSTN": gets The HDMI Out Selector.'

- id: monitor_resolution_control
  label: Monitor Resolution Control
  kind: action
  command: "RES"
  params:
    - name: parameter
      type: string
      description: '"00": Through; "01": Auto(HDMI Output Only); "02": 480p; "03": 720p; "04": 1080i; "05": 1080p(HDMI Output Only); "07": 1080p/24fs(HDMI Output Only); "06": Source; "UP": sets Monitor Out Resolution Wrap-Around Up; "QSTN": gets The Monitor Out Resolution.'

- id: isf_mode_control
  label: ISF Mode Control
  kind: action
  command: "ISF"
  params:
    - name: parameter
      type: string
      description: '"00": Custom; "01": Day; "02": Night; "UP": sets ISF Mode State Wrap-Around Up; "QSTN": gets The ISF Mode State.'

- id: listening_mode_category_wrap
  label: Listening Mode Category Wrap-Around Up
  kind: action
  command: "LMD"
  params:
    - name: parameter
      type: string
      description: '"MOVIE", "MUSIC", "GAME": each sets Listening Mode Wrap-Around Up.'

- id: audyssey_control
  label: Audyssey Control
  kind: action
  command: "ADY"
  params:
    - name: parameter
      type: string
      description: '"00": sets Audyssey 2EQ/MultEQ/MultEQ XT Off; "01": sets Audyssey 2EQ/MultEQ/MultEQ XT On; "UP": sets Audyssey 2EQ/MultEQ/MultEQ XT State Wrap-Around Up; "QSTN": gets The Audyssey 2EQ/MultEQ/MultEQ XT State.'

- id: audyssey_dynamic_eq_control
  label: Audyssey Dynamic EQ Control
  kind: action
  command: "ADQ"
  params:
    - name: parameter
      type: string
      description: '"00": Off; "01": On; "UP": sets Audyssey Dynamic EQ State Wrap-Around Up; "QSTN": gets The Audyssey Dynamic EQ State.'

- id: audyssey_dynamic_volume_control
  label: Audyssey Dynamic Volume Control
  kind: action
  command: "ADV"
  params:
    - name: parameter
      type: string
      description: '"00": Off; "01": Light; "02": Medium; "03": Heavy; "UP": sets Audyssey Dynamic Volume State Wrap-Around Up; "QSTN": gets The Audyssey Dynamic Volume State.'

- id: dolby_volume_control
  label: Dolby Volume Control
  kind: action
  command: "DVL"
  params:
    - name: parameter
      type: string
      description: '"00": Off; "01": Low; "02": Mid; "03": High; "UP": sets Dolby Volume State Wrap-Around Up; "QSTN": gets The Dolby Volume State.'

- id: music_optimizer_control
  label: Music Optimizer Control
  kind: action
  command: "MOT"
  params:
    - name: parameter
      type: string
      description: '"00": sets Music Optimizer Off; "01": sets Music Optimizer On; "UP": sets Music Optimizer State Wrap-Around Up; "QSTN": documented under MOT, but source says gets The Dolby Volume State; queried value UNRESOLVED.'

- id: xm_channel_name_query
  label: Get XM Channel Name
  kind: query
  command: "XCN"
  params:
    - name: parameter
      type: string
      description: '"QSTN": gets XM Channel Name. XM Model Only.'

- id: xm_artist_query
  label: Get XM Artist Name
  kind: query
  command: "XAT"
  params:
    - name: parameter
      type: string
      description: '"QSTN": gets XM Artist Name. XM Model Only.'

- id: xm_title_query
  label: Get XM Title
  kind: query
  command: "XTI"
  params:
    - name: parameter
      type: string
      description: '"QSTN": gets XM Title. XM Model Only.'

- id: xm_channel_control
  label: XM Channel Control
  kind: action
  command: "XCH"
  params:
    - name: parameter
      type: string
      description: 'XM Model Only. "000"-"255": XM Channel Number"000-255"; "UP": sets XM Channel Wrap-Around Up; "DOWN": sets XM Channel Wrap-Around Down; "QSTN": gets XM Channel Number.'

- id: xm_category_control
  label: XM Category Control
  kind: action
  command: "XCT"
  params:
    - name: parameter
      type: string
      description: 'XM Model Only. "UP": sets XM Category Wrap-Around Up; "DOWN": sets XM Category Wrap-Around Down; "QSTN": gets XM Category. nnnnnnnnnn is category information feedback, not a documented setter.'

- id: sirius_channel_name_query
  label: Get SIRIUS Channel Name
  kind: query
  command: "SCN"
  params:
    - name: parameter
      type: string
      description: '"QSTN": gets SIRIUS Channel Name. SIRIUS Model Only.'

- id: sirius_artist_query
  label: Get SIRIUS Artist Name
  kind: query
  command: "SAT"
  params:
    - name: parameter
      type: string
      description: '"QSTN": gets SIRIUS Artist Name. SIRIUS Model Only.'

- id: sirius_title_query
  label: Get SIRIUS Title
  kind: query
  command: "STI"
  params:
    - name: parameter
      type: string
      description: '"QSTN": gets SIRIUS Title. SIRIUS Model Only.'

- id: sirius_channel_control
  label: SIRIUS Channel Control
  kind: action
  command: "SCH"
  params:
    - name: parameter
      type: string
      description: 'SIRIUS Model Only. "000"-"255": SIRIUS Channel Number"000-255"; "UP": sets SIRIUS Channel Wrap-Around Up; "DOWN": sets SIRIUS Channel Wrap-Around Down; "QSTN": gets SIRIUS Channel Number.'

- id: sirius_category_control
  label: SIRIUS Category Control
  kind: action
  command: "SCT"
  params:
    - name: parameter
      type: string
      description: 'SIRIUS Model Only. "UP": sets SIRIUS Category Wrap-Around Up; "DOWN": sets SIRIUS Category Wrap-Around Down; "QSTN": gets SIRIUS Category. nnnnnnnnnn is category information feedback, not a documented setter.'

- id: sirius_lock_password
  label: SIRIUS Lock Password
  kind: action
  command: "SLK"
  params:
    - name: password
      type: string
      description: '"nnnn": Lock Password (4Digits). SIRIUS Model Only. Numeric range UNRESOLVED; INPUT and WRONG are documented display responses.'

- id: hd_radio_artist_query
  label: Get HD Radio Artist Name
  kind: query
  command: "HAT"
  params:
    - name: parameter
      type: string
      description: '"QSTN": gets HD Radio Artist Name. HD Radio Model Only; response variable-length, 64 digits max.'

- id: hd_radio_channel_name_query
  label: Get HD Radio Channel Name
  kind: query
  command: "HCN"
  params:
    - name: parameter
      type: string
      description: '"QSTN": gets HD Radio Channel Name. HD Radio Model Only; response HD Radio Channel Name (Station Name) (7 digits).'

- id: hd_radio_title_query
  label: Get HD Radio Title
  kind: query
  command: "HTI"
  params:
    - name: parameter
      type: string
      description: '"QSTN": gets HD Radio Title. HD Radio Model Only; response variable-length, 64 digits max.'

- id: hd_radio_detail_query
  label: Get HD Radio Detail Information
  kind: query
  command: "HDS"
  params:
    - name: parameter
      type: string
      description: '"QSTN": gets HD Radio Title under HD Radio Detail Info. HD Radio Model Only; detail response structure UNRESOLVED.'

- id: hd_radio_program_control
  label: HD Radio Program Control
  kind: action
  command: "HPR"
  params:
    - name: parameter
      type: string
      description: 'HD Radio Model Only. "01"-"08": sets directly HD Radio Channel Program; "QSTN": gets HD Radio Channel Program.'

- id: hd_radio_blend_control
  label: HD Radio Blend Control
  kind: action
  command: "HBL"
  params:
    - name: parameter
      type: string
      description: 'HD Radio Model Only. "00": sets HD Radio Blend Mode"Auto"; "01": sets HD Radio Blend Mode"Analog"; "QSTN": gets the HD Radio Blend Mode Status.'

- id: hd_radio_tuner_status_query
  label: Get HD Radio Tuner Status
  kind: query
  command: "HTS"
  params:
    - name: parameter
      type: string
      description: |
        "QSTN": gets the HD Radio Tuner Status. HD Radio Model Only.
        Response "mmnnoo": HD Radio Tuner Status (3 bytes).
        mm -> "00" not HD, "01" HD
        nn -> current Program "01"-"08"
        oo -> receivable Program (8 bits are represented in hexadecimal notation. Each bit shows receivable or not.)

- id: ri_dvd_additional_operation
  label: RI DVD Additional Operation
  kind: action
  command: "CDV"
  params:
    - name: parameter
      type: string
      description: '"P.MODE": PLAY MODE; "ASCTG": ASPECT(Toggle); "CDPCD": CD CHAIN REPEAT; "MSPUP": MULTI SPEED UP; "MSPDN": MULTI SPEED DOWN; "PCT": PICTURE CONTROL; "RSCTG": RESOLUTION(Toggle); "INIT": Return to Factory Settings.'

- id: zone2_tone_component_set
  label: Set Zone2 Tone Component
  kind: action
  command: "ZTN"
  params:
    - name: parameter
      type: string
      description: '"Bxx": sets Zone2 Bass; "Txx": sets Zone2 Treble; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]. Only works when main is ON and Zone2 is powered or variable.'

- id: zone3_tone_component_set
  label: Set Zone3 Tone Component
  kind: action
  command: "TN3"
  params:
    - name: parameter
      type: string
      description: '"Bxx": Zone3 Bass; "Txx": Zone3 Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step].'

- id: zone3_net_channel_control
  label: Zone3 Net Channel Control
  kind: action
  command: "NT3"
  params:
    - name: parameter
      type: string
      description: '"CHUP": CH UP (for iRadio); "CHDN": CH DOWN (for iRadio). Network Model Only.'

# =========================================================================
# ZONE 4 - Source-documented families; TX-SR875 support UNRESOLVED
# =========================================================================
- id: zone4_power_control
  label: Zone4 Power Control
  kind: action
  command: "PW4"
  params:
    - name: parameter
      type: string
      description: '"00": sets Zone4 Standby; "01": sets Zone4 On; "QSTN": gets the Zone4 Power Status.'

- id: zone4_mute_control
  label: Zone4 Mute Control
  kind: action
  command: "MT4"
  params:
    - name: parameter
      type: string
      description: '"00": sets Zone4 Muting Off; "01": sets Zone4 Muting On; "TG": sets Zone4 Muting Wrap-Around; "QSTN": gets the Zone4 Muting Status.'

- id: zone4_volume_control
  label: Zone4 Volume Control
  kind: action
  command: "VL4"
  params:
    - name: parameter
      type: string
      description: |
        "00"-"64": Volume Level 0–100 (In hexadecimal representation).
        "00"-"50": Volume Level 0–80 (In hexadecimal representation).
        Model-specific range UNRESOLVED.
        "UP": sets Volume Level Up; "DOWN": sets Volume Level Down; "QSTN": gets the Volume Level.

- id: zone4_input_control
  label: Zone4 Input Control
  kind: action
  command: "SL4"
  params:
    - name: parameter
      type: string
      description: |
        "00": VIDEO1 VCR/DVR; "01": VIDEO2 CBL/SAT; "02": VIDEO3 GAME/TV GAME;
        "03": VIDEO4 AUX1(AUX); "04": VIDEO5 AUX2; "05": VIDEO6; "06": VIDEO7;
        "10": DVD; "20": TAPE(1) TV/TAPE; "21": TAPE2; "22": PHONO; "23": CD;
        "24": FM; "25": AM; "26": TUNER; "27": MUSIC SERVER; "28": INTERNET RADIO;
        "29": USB/USB(Front); "2A": USB(Rear); "40": Universal PORT;
        "30": MULTI CH; "31": XM; "32": SIRIUS; "80": SOURCE;
        "QSTN": gets The Selector Position.

- id: zone4_tuner_control
  label: Zone4 Tuner Control
  kind: action
  command: "TU4"
  params:
    - name: parameter
      type: string
      description: '"nnnnn": sets Directly Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz); "UP": sets Tuning Frequency Wrap-Around Up; "DOWN": sets Tuning Frequency Wrap-Around Down; "QSTN": gets The Tuning Frequency. Frequency range UNRESOLVED. The TUNER function is shared by the MAIN and ZONE side. But control is separated.'

- id: zone4_preset_control
  label: Zone4 Preset Control
  kind: action
  command: "PR4"
  params:
    - name: parameter
      type: string
      description: |
        "01"-"28": sets Preset No. 1-40 (In hexadecimal representation).
        "01"-"1E": sets Preset No. 1-30 (In hexadecimal representation).
        Model-specific range UNRESOLVED.
        "UP": sets Preset No. Wrap-Around Up; "DOWN": sets Preset No. Wrap-Around Down;
        "QSTN": gets The Preset No.

- id: zone4_net_operation
  label: Zone4 Net Operation
  kind: action
  command: "NT4"
  params:
    - name: parameter
      type: string
      description: 'Network Model Only. "PLAY": PLAY KEY; "STOP": STOP KEY; "PAUSE": PAUSE KEY; "TRUP": TRACK UP KEY; "TRDN": TRACK DOWN KEY.'

- id: zone4_net_radio_preset
  label: Zone4 Internet Radio Preset
  kind: action
  command: "NP4"
  params:
    - name: number
      type: string
      description: 'Network Model Only. "01"-"28": sets Preset No. 1-40 (In hexadecimal representation).'
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, standby]
  query_command: "!1PWRQSTN"

- id: volume_level
  label: Master Volume Level
  type: integer
  description: 0-100
  query_command: "!1MVLQSTN"

- id: mute_state
  label: Mute State
  type: enum
  values: [on, off]
  query_command: "!1AMTQSTN"

- id: input_selector
  label: Input Selector
  type: string
  query_command: "!1SLIQSTN"

- id: listening_mode
  label: Listening Mode
  type: string
  query_command: "!1LMDQSTN"

- id: dimmer_level
  label: Dimmer Level
  type: string
  query_command: "!1DIMQSTN"

- id: sleep_time
  label: Sleep Timer
  type: integer
  description: Minutes remaining, 0 if off
  query_command: "!1SLPQSTN"

- id: tuner_frequency
  label: Tuner Frequency
  type: string
  query_command: "!1TUNQSTN"

- id: preset_number
  label: Preset Number
  type: integer
  query_command: "!1PRSQSTN"

- id: netusb_status
  label: Net/USB Play Status
  type: string
  description: "3-char: p=Play status (S/P/p/F/R), r=Repeat (-/R/F/1)"
  query_command: "!1NSTQSTN"

- id: netusb_artist
  label: Net/USB Artist Name
  type: string
  query_command: "!1NATQSTN"

- id: netusb_album
  label: Net/USB Album Name
  type: string
  query_command: "!1NALQSTN"

- id: netusb_title
  label: Net/USB Title Name
  type: string
  query_command: "!1NTIQSTN"

- id: netusb_time
  label: Net/USB Time Info
  type: string
  description: "Elapsed/Track time mm:ss/mm:ss"
  query_command: "!1NTMQSTN"

- id: netusb_track
  label: Net/USB Track Info
  type: string
  description: "Current/Total cccc/tttt"
  query_command: "!1NTRQSTN"

- id: audio_info
  label: Audio Information
  type: string
  description: nnnnn:nnnnn format
  query_command: "!1IFAQSTN"

- id: video_info
  label: Video Information
  type: string
  description: nnnnn:nnnnn format
  query_command: "!1IFVQSTN"

- id: late_night_level
  label: Late Night Level
  type: string
  query_command: "!1LTNQSTN"

- id: reeq_state
  label: Re-EQ / Academy State
  type: string
  query_command: "!1RASQSTN"

- id: display_mode
  label: Display Mode
  type: string
  query_command: "!1DIFQSTN"

- id: audio_selector
  label: Audio Selector
  type: string
  query_command: "!1SLAQSTN"

- id: recout_selector
  label: RECOUT Selector
  type: string
  query_command: "!1SLRQSTN"

- id: zone2_power_state
  label: Zone2 Power State
  type: enum
  values: [on, standby]
  query_command: "!1ZPWQSTN"

- id: zone2_mute_state
  label: Zone2 Mute State
  type: enum
  values: [on, off]
  query_command: "!1ZMTQSTN"

- id: zone2_volume_level
  label: Zone2 Volume Level
  type: integer
  query_command: "!1ZVLQSTN"

- id: zone2_input_selector
  label: Zone2 Input Selector
  type: string
  query_command: "!1SLZQSTN"

- id: zone2_tone
  label: Zone2 Tone
  type: string
  description: BxxTxx format
  query_command: "!1ZTNQSTN"

- id: zone2_balance
  label: Zone2 Balance
  type: string
  query_command: "!1ZBLQSTN"

- id: zone2_late_night
  label: Zone2 Late Night Level
  type: string
  query_command: "!1LTZQSTN"

- id: zone2_reeq_state
  label: Zone2 Re-EQ / Academy State
  type: string
  query_command: "!1RAZQSTN"

- id: zone3_power_state
  label: Zone3 Power State
  type: enum
  values: [on, standby]
  query_command: "!1PW3QSTN"

- id: zone3_mute_state
  label: Zone3 Mute State
  type: enum
  values: [on, off]
  query_command: "!1MT3QSTN"

- id: zone3_volume_level
  label: Zone3 Volume Level
  type: integer
  query_command: "!1VL3QSTN"

- id: zone3_input_selector
  label: Zone3 Input Selector
  type: string
  query_command: "!1SL3QSTN"

- id: zone3_tone
  label: Zone3 Tone
  type: string
  description: BxxTxx format
  query_command: "!1TN3QSTN"

- id: zone3_balance
  label: Zone3 Balance
  type: string
  query_command: "!1BL3QSTN"
```

## Variables
```yaml
# UNRESOLVED: no discrete parameter commands beyond action-based controls
```

## Events
```yaml
- id: status_notification
  label: Unsolicited Status Notification
  type: string
  description: |
    Receiver sends status message when system status changes (Event Notice
    Communication per source section 2.3). Format: !1{Command}{Parameter}.
    Requires persistent TCP connection to receive.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: |
      TGA/TGB/TGC 12V trigger commands available only when each 12V Trigger
      parameter is all "OFF" at Setup Menu (per source).
  - description: |
      Zone2 volume/tone commands only work when main zone is ON and Zone2
      is powered or variable (per source *1 notes).
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond trigger/zone notes
```

## Notes
ISCP message format: `!1{Command}{Parameter}[CR]` for serial, `!1{Command}{Parameter}[EOF]` for TCP. Unit type "1" = Receiver. Response within 50ms. Minimum 50ms between sent messages. Ethernet supports only 1 simultaneous client connection — persistent connection required to receive unsolicited status notifications.

eISCP packet format (Ethernet): Header `ISCP` + Header Size (0x10 big-endian) + Data Size (big-endian) + Version (0x01) + Reserved (0x000000) + eISCP Data (= ISCP message).

FF/REW Net-Tune commands must be sent continuously with no more than 100ms delay between codes.

TUNER/XM/SIRIUS/HD Radio function shared by MAIN and ZONE side. Zone tuner control separated from main.

RI System commands (CCD/CT1/CT2/CEQ/CDT/CDV/CMD/CCR/CDS) control external devices connected via Onkyo RI (Remote Interactive) bus, not the receiver's own functions.

Version check procedure: Turn on unit, press DISPLAY + STANDBY/ON buttons simultaneously. Version number shows firmware date (yymdd, X/Y/Z = Oct/Nov/Dec).

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: Ethernet port 60128 default not independently verified for TX-SR875 -->
<!-- UNRESOLVED: TX-SR875-specific Yes/No columns not captured in source table extraction — model-column mapping incomplete. Zone3/Zone4 support on TX-SR875 not confirmed from source model columns. -->
<!-- UNRESOLVED: Audyssey (ADY/ADQ/ADV), Dolby Volume (DVL), Music Optimizer (MOT), Speaker Layout (SPL), HDMI Output (HDO), Monitor Out Resolution (RES), ISF Mode (ISF), Tone per-channel (TFR/TFW/TFH/TCT/TSR/TSB/TSW) commands appear in source but model support for TX-SR875 unclear from extraction — included as commands may apply to this generation but per-model verification needed -->
<!-- UNRESOLVED: HD Radio commands (HAT/HCN/HTI/HDS/HPR/HBL/HTS) and XM commands (XCN/XAT/XTI/XCH/XCT) present in source but model-specific support unclear -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T13:47:32.681Z
last_checked_at: 2026-10-07T22:06:32.752Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:06:32.752Z
matched_actions: 452
action_count: 452
confidence: medium
summary: "All 452 units match source mnemonics and parameters, and the serial and port values are stated. The source is a shared Integra protocol doc that names TX-SR875 but has no per-model columns for it. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TX-SR875-specific Yes/No columns not captured in source extraction — model support for individual commands inferred from protocol generation (v1.07 era). Zone3/Zone4 applicability to TX-SR875 not independently verified."
- "Ethernet port default 60128 from source; not verified for this specific model"
- "default TCP port from source; configurable 49152-65535 per source"
- "Zone3 support on TX-SR875 not confirmed from source model columns"
- "TX-SR875 applicability of these additional command families."
- "no discrete parameter commands beyond action-based controls"
- "no explicit multi-step sequences documented"
- "no explicit safety warnings or interlock procedures beyond trigger/zone notes"
- "firmware version compatibility not stated"
- "Ethernet port 60128 default not independently verified for TX-SR875"
- "TX-SR875-specific Yes/No columns not captured in source table extraction — model-column mapping incomplete. Zone3/Zone4 support on TX-SR875 not confirmed from source model columns."
- "Audyssey (ADY/ADQ/ADV), Dolby Volume (DVL), Music Optimizer (MOT), Speaker Layout (SPL), HDMI Output (HDO), Monitor Out Resolution (RES), ISF Mode (ISF), Tone per-channel (TFR/TFW/TFH/TCT/TSR/TSB/TSW) commands appear in source but model support for TX-SR875 unclear from extraction — included as commands may apply to this generation but per-model verification needed"
- "HD Radio commands (HAT/HCN/HTI/HDS/HPR/HBL/HTS) and XM commands (XCN/XAT/XTI/XCH/XCT) present in source but model-specific support unclear"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
