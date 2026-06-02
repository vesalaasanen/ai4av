---
spec_id: admin/denon-dnt625-dnt645
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon DNT625 DNT645 Control Spec"
manufacturer: Denon
model_family: DNT625
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - DNT625
    - DNT645
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
  - assets.denon.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-05-14T15:21:12.776Z
last_checked_at: 2026-06-02T21:41:27.641Z
generated_at: 2026-06-02T21:41:27.641Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model variants (e.g. DNT625 vs DNT645) may differ in channel count or power rating — not differentiated in source"
  - "flow control not stated in source"
  - "complete event catalog not enumerated in source - only representative examples given"
  - "no explicit named macros defined in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "voltage/current/power specifications not in source"
  - "error code/fault behavior descriptions not in source"
  - "TCP keepalive/heartbeat behavior not described"
  - "RS-232 flow control (hardware) not specified"
  - "multicast HD Radio channel count per station not bounded (1–8 stated, but no upper limit on total channels)"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:27.641Z
  matched_actions: 565
  action_count: 565
  confidence: medium
  summary: "All 565 spec actions matched verbatim in the source command table; transport (9600bps, port 23) confirmed; no fabricated or drifted tokens found. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Denon DNT625 DNT645 Control Spec

## Summary
Denon AV receiver (DNT625/DNT645) control protocol. Supports RS-232C serial and Ethernet TCP (port 23, telnet). ASCII command-based, half-duplex. Max 135 bytes per message. No authentication required.

<!-- UNRESOLVED: device model variants (e.g. DNT625 vs DNT645) may differ in channel count or power rating — not differentiated in source -->

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
  flow_control: none  # UNRESOLVED: flow control not stated in source
addressing:
  port: 23  # TCP port 23 (telnet) - stated explicitly in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Power
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
  label: Query Power Status
  kind: query
  command: "PW?"
  params: []

# Master Volume
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
  label: Set Master Volume (dB)
  kind: action
  command: "MV{level}"
  params:
    - name: level
      type: integer
      description: "00-98 (ASCII), 80=0dB, 00=--- (MIN). 0.5dB steps use 3-digit ASCII."
- id: master_volume_status_query
  label: Query Master Volume Status
  kind: query
  command: "MV?"
  params: []

# Channel Volume - CV command
- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  command: "CV{channel} UP"
  params:
    - name: channel
      type: string
      description: "Channel ID e.g. FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  command: "CV{channel} DOWN"
  params:
    - name: channel
      type: string
      description: "Channel ID (see channel_volume_up)"
- id: channel_volume_set
  label: Set Channel Volume (dB)
  kind: action
  command: "CV{channel} {level}"
  params:
    - name: channel
      type: string
      description: "Channel ID (see channel_volume_up)"
    - name: level
      type: integer
      description: "38-62 (ASCII), 50=0dB. Subwoofer SW2: 00,38-62."
- id: channel_volume_reset_all
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  command: "CVZRL"
  params: []
- id: channel_volume_status_query
  label: Query Channel Volume Status
  kind: query
  command: "CV?"
  params: []

# Mute
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
  label: Query Mute Status
  kind: query
  command: "MU?"
  params: []

# Input Select - SI command
- id: input_select
  label: Select Input Source
  kind: action
  command: "SI{source}"
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: input_status_query
  label: Query Input Status
  kind: query
  command: "SI?"
  params: []

# Zone Control - ZM (Main Zone)
- id: zone_main_on
  label: Main Zone On
  kind: action
  command: "ZMON"
  params: []
- id: zone_main_off
  label: Main Zone Off
  kind: action
  command: "ZMOFF"
  params: []
- id: zone_main_status_query
  label: Query Main Zone Status
  kind: query
  command: "ZM?"
  params: []
- id: zone_main_favorite
  label: Main Zone Favorite Mode Select
  kind: action
  command: "ZMFAVORITE{slot}"
  params:
    - name: slot
      type: integer
      description: "1-4"
- id: zone_main_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  command: "ZMFAVORITE{slot} MEMORY"
  params:
    - name: slot
      type: integer
      description: "1-4"

# REC Select - SR command
- id: rec_select
  label: REC SELECT Mode Set
  kind: action
  command: "SR{source}"
  params:
    - name: source
      type: string
      description: "Same as SI command sources"
- id: rec_select_cancel
  label: REC SELECT Mode Cancel
  kind: action
  command: "SRSOURCE"
  params: []
- id: rec_status_query
  label: Query REC Status
  kind: query
  command: "SR?"
  params: []

# Digital Input - SD command
- id: digital_input_auto
  label: Set Digital Input AUTO Mode
  kind: action
  command: "SDAUTO"
  params: []
- id: digital_input_hdmi
  label: Set Digital Input Force HDMI
  kind: action
  command: "SDHDMI"
  params: []
- id: digital_input_digital
  label: Set Digital Input Force DIGITAL
  kind: action
  command: "SDDIGITAL"
  params: []
- id: digital_input_analog
  label: Set Digital Input Force ANALOG
  kind: action
  command: "SDANALOG"
  params: []
- id: digital_input_extin
  label: Set External IN Mode
  kind: action
  command: "SDEXT.IN"
  params: []
- id: digital_input_7ch
  label: Set 7.1CH IN Mode
  kind: action
  command: "SD7.1IN"
  params: []
- id: digital_input_off
  label: Digital Input Off
  kind: action
  command: "SDNO"
  params: []
- id: digital_input_status_query
  label: Query Digital Input Status
  kind: query
  command: "SD?"
  params: []

# Digital Input Mode - DC command
- id: digital_mode_auto
  label: Set Digital Input AUTO Mode
  kind: action
  command: "DCAUTO"
  params: []
- id: digital_mode_pcm
  label: Set Digital Input Force PCM
  kind: action
  command: "DCPCM"
  params: []
- id: digital_mode_dts
  label: Set Digital Input Force DTS
  kind: action
  command: "DCDTS"
  params: []
- id: digital_mode_status_query
  label: Query Digital Mode Status
  kind: query
  command: "DC?"
  params: []

# Video Select - SV command
- id: video_select
  label: Video Select Mode Set
  kind: action
  command: "SV{source}"
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE"
- id: video_select_on
  label: Video Select On
  kind: action
  command: "SVON"
  params: []
- id: video_select_off
  label: Video Select Off
  kind: action
  command: "SVOFF"
  params: []
- id: video_select_status_query
  label: Query Video Select Status
  kind: query
  command: "SV?"
  params: []

# Sleep Timer - SLP command
- id: sleep_timer
  label: Set Sleep Timer
  kind: action
  command: "SLP{minutes}"
  params:
    - name: minutes
      type: integer
      description: "001-120 (minutes), or OFF (use SLPOFF)"
- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []
- id: sleep_timer_status_query
  label: Query Sleep Timer Status
  kind: query
  command: "SLP?"
  params: []

# Auto Standby - STBY command
- id: auto_standby_15m
  label: Set Auto Standby 15 Minutes
  kind: action
  command: "STBY15M"
  params: []
- id: auto_standby_30m
  label: Set Auto Standby 30 Minutes
  kind: action
  command: "STBY30M"
  params: []
- id: auto_standby_60m
  label: Set Auto Standby 60 Minutes
  kind: action
  command: "STBY60M"
  params: []
- id: auto_standby_off
  label: Set Auto Standby Off
  kind: action
  command: "STBYOFF"
  params: []
- id: auto_standby_status_query
  label: Query Auto Standby Status
  kind: query
  command: "STBY?"
  params: []

# ECO Mode - ECO command
- id: eco_mode_on
  label: Set ECO Mode On
  kind: action
  command: "ECOON"
  params: []
- id: eco_mode_auto
  label: Set ECO Mode Auto
  kind: action
  command: "ECOAUTO"
  params: []
- id: eco_mode_off
  label: Set ECO Mode Off
  kind: action
  command: "ECOOFF"
  params: []
- id: eco_mode_status_query
  label: Query ECO Mode Status
  kind: query
  command: "ECO?"
  params: []

# Surround Mode - MS command
- id: surround_mode_movie
  label: Set Surround Mode MOVIE
  kind: action
  command: "MSMOVIE"
  params: []
- id: surround_mode_music
  label: Set Surround Mode MUSIC
  kind: action
  command: "MSMUSIC"
  params: []
- id: surround_mode_game
  label: Set Surround Mode GAME
  kind: action
  command: "MSGAME"
  params: []
- id: surround_mode_direct
  label: Set Surround Mode DIRECT
  kind: action
  command: "MSDIRECT"
  params: []
- id: surround_mode_pure_direct
  label: Set Surround Mode PURE DIRECT
  kind: action
  command: "MSPURE DIRECT"
  params: []
- id: surround_mode_stereo
  label: Set Surround Mode STEREO
  kind: action
  command: "MSSTEREO"
  params: []
- id: surround_mode_auto
  label: Set Surround Mode AUTO
  kind: action
  command: "MSAUTO"
  params: []
- id: surround_mode_dolby_digital
  label: Set Surround Mode DOLBY DIGITAL
  kind: action
  command: "MSDOLBY DIGITAL"
  params: []
- id: surround_mode_dts_surround
  label: Set Surround Mode DTS SURROUND
  kind: action
  command: "MSDTS SURROUND"
  params: []
- id: surround_mode_auro3d
  label: Set Surround Mode AURO3D
  kind: action
  command: "MSAURO3D"
  params: []
- id: surround_mode_auro2dsurr
  label: Set Surround Mode AURO2DSURR
  kind: action
  command: "MSAURO2DSURR"
  params: []
- id: surround_mode_mch_stereo
  label: Set Surround Mode MCH STEREO
  kind: action
  command: "MSMCH STEREO"
  params: []
- id: surround_mode_wide_screen
  label: Set Surround Mode WIDE SCREEN
  kind: action
  command: "MSWIDE SCREEN"
  params: []
- id: surround_mode_super_stadium
  label: Set Surround Mode SUPER STADIUM
  kind: action
  command: "MSSUPER STADIUM"
  params: []
- id: surround_mode_rock_arena
  label: Set Surround Mode ROCK ARENA
  kind: action
  command: "MSROCK ARENA"
  params: []
- id: surround_mode_jazz_club
  label: Set Surround Mode JAZZ CLUB
  kind: action
  command: "MSJAZZ CLUB"
  params: []
- id: surround_mode_classic_concert
  label: Set Surround Mode CLASSIC CONCERT
  kind: action
  command: "MSCLASSIC CONCERT"
  params: []
- id: surround_mode_mono_movie
  label: Set Surround Mode MONO MOVIE
  kind: action
  command: "MSMONO MOVIE"
  params: []
- id: surround_mode_matrix
  label: Set Surround Mode MATRIX
  kind: action
  command: "MSMATRIX"
  params: []
- id: surround_mode_video_game
  label: Set Surround Mode VIDEO GAME
  kind: action
  command: "MSVIDEO GAME"
  params: []
- id: surround_mode_virtual
  label: Set Surround Mode VIRTUAL
  kind: action
  command: "MSVIRTUAL"
  params: []
- id: surround_mode_left
  label: Set Surround Mode LEFT
  kind: action
  command: "MSLEFT"
  params: []
- id: surround_mode_right
  label: Set Surround Mode RIGHT
  kind: action
  command: "MSRIGHT"
  params: []
- id: surround_mode_status_query
  label: Query Surround Mode Status
  kind: query
  command: "MS?"
  params: []
- id: surround_quick_select_1
  label: Quick Select 1
  kind: action
  command: "MSQUICK1"
  params: []
- id: surround_quick_select_2
  label: Quick Select 2
  kind: action
  command: "MSQUICK2"
  params: []
- id: surround_quick_select_3
  label: Quick Select 3
  kind: action
  command: "MSQUICK3"
  params: []
- id: surround_quick_select_4
  label: Quick Select 4
  kind: action
  command: "MSQUICK4"
  params: []
- id: surround_quick_select_5
  label: Quick Select 5
  kind: action
  command: "MSQUICK5"
  params: []
- id: surround_quick_memory_1
  label: Quick Select 1 Memory
  kind: action
  command: "MSQUICK1 MEMORY"
  params: []
- id: surround_quick_memory_2
  label: Quick Select 2 Memory
  kind: action
  command: "MSQUICK2 MEMORY"
  params: []
- id: surround_quick_memory_3
  label: Quick Select 3 Memory
  kind: action
  command: "MSQUICK3 MEMORY"
  params: []
- id: surround_quick_memory_4
  label: Quick Select 4 Memory
  kind: action
  command: "MSQUICK4 MEMORY"
  params: []
- id: surround_quick_memory_5
  label: Quick Select 5 Memory
  kind: action
  command: "MSQUICK5 MEMORY"
  params: []
- id: surround_quick_status_query
  label: Query Quick Select Status
  kind: query
  command: "MSQUICK ?"
  params: []

# Video Processing - VS command
- id: video_aspect_nrm
  label: Set Aspect Ratio 4:3
  kind: action
  command: "VSASPNRM"
  params: []
- id: video_aspect_ful
  label: Set Aspect Ratio 16:9
  kind: action
  command: "VSASPFUL"
  params: []
- id: video_aspect_status_query
  label: Query Aspect Ratio Status
  kind: query
  command: "VSASP ?"
  params: []
- id: video_hdmi_monitor_auto
  label: Set HDMI Monitor Auto
  kind: action
  command: "VSMONIAUTO"
  params: []
- id: video_hdmi_monitor_1
  label: Set HDMI Monitor OUT-1
  kind: action
  command: "VSMONI1"
  params: []
- id: video_hdmi_monitor_2
  label: Set HDMI Monitor OUT-2
  kind: action
  command: "VSMONI2"
  params: []
- id: video_hdmi_monitor_status_query
  label: Query HDMI Monitor Status
  kind: query
  command: "VSMONI ?"
  params: []
- id: video_resolution_sc48p
  label: Set Resolution 480p/576p
  kind: action
  command: "VSSC48P"
  params: []
- id: video_resolution_sc10i
  label: Set Resolution 1080i
  kind: action
  command: "VSSC10I"
  params: []
- id: video_resolution_sc72p
  label: Set Resolution 720p
  kind: action
  command: "VSSC72P"
  params: []
- id: video_resolution_sc10p
  label: Set Resolution 1080p
  kind: action
  command: "VSSC10P"
  params: []
- id: video_resolution_sc10p24
  label: Set Resolution 1080p 24Hz
  kind: action
  command: "VSSC10P24"
  params: []
- id: video_resolution_sc4k
  label: Set Resolution 4K
  kind: action
  command: "VSSC4K"
  params: []
- id: video_resolution_sc4kf
  label: Set Resolution 4K 60/50
  kind: action
  command: "VSSC4KF"
  params: []
- id: video_resolution_scauto
  label: Set Resolution AUTO
  kind: action
  command: "VSSCAUTO"
  params: []
- id: video_resolution_status_query
  label: Query Resolution Status
  kind: query
  command: "VSSC ?"
  params: []
- id: video_resolution_sch48p
  label: Set Resolution 480p/576p (HDMI)
  kind: action
  command: "VSSCH48P"
  params: []
- id: video_resolution_sch10i
  label: Set Resolution 1080i (HDMI)
  kind: action
  command: "VSSCH10I"
  params: []
- id: video_resolution_sch72p
  label: Set Resolution 720p (HDMI)
  kind: action
  command: "VSSCH72P"
  params: []
- id: video_resolution_sch10p
  label: Set Resolution 1080p (HDMI)
  kind: action
  command: "VSSCH10P"
  params: []
- id: video_resolution_sch10p24
  label: Set Resolution 1080p 24Hz (HDMI)
  kind: action
  command: "VSSCH10P24"
  params: []
- id: video_resolution_sch4k
  label: Set Resolution 4K (HDMI)
  kind: action
  command: "VSSCH4K"
  params: []
- id: video_resolution_sch4kf
  label: Set Resolution 4K 60/50 (HDMI)
  kind: action
  command: "VSSCH4KF"
  params: []
- id: video_resolution_schauto
  label: Set Resolution AUTO (HDMI)
  kind: action
  command: "VSSCHAUTO"
  params: []
- id: video_resolution_hdmi_status_query
  label: Query Resolution Status (HDMI)
  kind: query
  command: "VSSCH ?"
  params: []
- id: video_audio_output_amp
  label: Set HDMI Audio Output to AMP
  kind: action
  command: "VSAUDIO AMP"
  params: []
- id: video_audio_output_tv
  label: Set HDMI Audio Output to TV
  kind: action
  command: "VSAUDIO TV"
  params: []
- id: video_audio_output_status_query
  label: Query HDMI Audio Output Status
  kind: query
  command: "VSAUDIO ?"
  params: []
- id: video_processing_mode_auto
  label: Set Video Processing Mode AUTO
  kind: action
  command: "VSVPMAUTO"
  params: []
- id: video_processing_mode_game
  label: Set Video Processing Mode GAME
  kind: action
  command: "VSVPMGAME"
  params: []
- id: video_processing_mode_movie
  label: Set Video Processing Mode MOVIE
  kind: action
  command: "VSVPMMOVI"
  params: []
- id: video_processing_mode_status_query
  label: Query Video Processing Mode Status
  kind: query
  command: "VSVPM ?"
  params: []
- id: video_vertical_stretch_on
  label: Set Vertical Stretch On
  kind: action
  command: "VSVST ON"
  params: []
- id: video_vertical_stretch_off
  label: Set Vertical Stretch Off
  kind: action
  command: "VSVST OFF"
  params: []
- id: video_vertical_stretch_status_query
  label: Query Vertical Stretch Status
  kind: query
  command: "VSVST ?"
  params: []

# Parameter Settings - PS command
- id: tone_control_on
  label: Tone Control On
  kind: action
  command: "PSTONE CTRL ON"
  params: []
- id: tone_control_off
  label: Tone Control Off
  kind: action
  command: "PSTONE CTRL OFF"
  params: []
- id: tone_control_status_query
  label: Query Tone Control Status
  kind: query
  command: "PSTONE CTRL ?"
  params: []
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
  label: Set Bass Direct (dB)
  kind: action
  command: "PSBAS {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), 50=0dB. Range -6 to +6dB (44-56)."
- id: bass_status_query
  label: Query Bass Status
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
  label: Set Treble Direct (dB)
  kind: action
  command: "PSTRE {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), 50=0dB. Range -6 to +6dB (44-56)."
- id: treble_status_query
  label: Query Treble Status
  kind: query
  command: "PSTRE ?"
  params: []
- id: dialog_level_on
  label: Dialog Level Adjust On
  kind: action
  command: "PSDIL ON"
  params: []
- id: dialog_level_off
  label: Dialog Level Adjust Off
  kind: action
  command: "PSDIL OFF"
  params: []
- id: dialog_level_up
  label: Dialog Level Up
  kind: action
  command: "PSDIL UP"
  params: []
- id: dialog_level_down
  label: Dialog Level Down
  kind: action
  command: "PSDIL DOWN"
  params: []
- id: dialog_level_set
  label: Set Dialog Level Direct
  kind: action
  command: "PSDIL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 (ASCII), 50=0dB"
- id: dialog_level_status_query
  label: Query Dialog Level Status
  kind: query
  command: "PSDIL ?"
  params: []
- id: subwoofer_level_on
  label: Subwoofer Level Adjust On
  kind: action
  command: "PSSWL ON"
  params: []
- id: subwoofer_level_off
  label: Subwoofer Level Adjust Off
  kind: action
  command: "PSSWL OFF"
  params: []
- id: subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  command: "PSSWL UP"
  params: []
- id: subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  command: "PSSWL DOWN"
  params: []
- id: subwoofer_level_set
  label: Set Subwoofer Level Direct
  kind: action
  command: "PSSWL {level}"
  params:
    - name: level
      type: integer
      description: "00,38-62 (ASCII), 50=0dB"
- id: subwoofer2_level_up
  label: Subwoofer 2 Level Up
  kind: action
  command: "PSSWL2 UP"
  params: []
- id: subwoofer2_level_down
  label: Subwoofer 2 Level Down
  kind: action
  command: "PSSWL2 DOWN"
  params: []
- id: subwoofer2_level_set
  label: Set Subwoofer 2 Level Direct
  kind: action
  command: "PSSWL2 {level}"
  params:
    - name: level
      type: integer
      description: "00,38-62 (ASCII), 50=0dB"
- id: subwoofer_level_status_query
  label: Query Subwoofer Level Status
  kind: query
  command: "PSSWL ?"
  params: []
- id: cinema_eq_on
  label: CINEMA EQ On
  kind: action
  command: "PSCINEMA EQ.ON"
  params: []
- id: cinema_eq_off
  label: CINEMA EQ Off
  kind: action
  command: "PSCINEMA EQ.OFF"
  params: []
- id: cinema_eq_status_query
  label: Query CINEMA EQ Status
  kind: query
  command: "PSCINEMA EQ. ?"
  params: []
- id: cinema_mode_music
  label: Set CINEMA Mode MUSIC
  kind: action
  command: "PSMODE:MUSIC"
  params: []
- id: cinema_mode_cinema
  label: Set CINEMA Mode CINEMA
  kind: action
  command: "PSMODE:CINEMA"
  params: []
- id: cinema_mode_game
  label: Set CINEMA Mode GAME
  kind: action
  command: "PSMODE:GAME"
  params: []
- id: cinema_mode_pro_logic
  label: Set CINEMA Mode PRO LOGIC
  kind: action
  command: "PSMODE:PRO LOGIC"
  params: []
- id: cinema_mode_status_query
  label: Query CINEMA Mode Status
  kind: query
  command: "PSMODE: ?"
  params: []
- id: loudness_management_on
  label: Loudness Management On
  kind: action
  command: "PSLOM ON"
  params: []
- id: loudness_management_off
  label: Loudness Management Off
  kind: action
  command: "PSLOM OFF"
  params: []
- id: loudness_management_status_query
  label: Query Loudness Management Status
  kind: query
  command: "PSLOM ?"
  params: []
- id: front_height_output_on
  label: Front Height Output On
  kind: action
  command: "PSFH:ON"
  params: []
- id: front_height_output_off
  label: Front Height Output Off
  kind: action
  command: "PSFH:OFF"
  params: []
- id: front_height_output_status_query
  label: Query Front Height Output Status
  kind: query
  command: "PSFH: ?"
  params: []
- id: speaker_output_fw
  label: Speaker Output FW
  kind: action
  command: "PSSP:FW"
  params: []
- id: speaker_output_fh
  label: Speaker Output FH
  kind: action
  command: "PSSP:FH"
  params: []
- id: speaker_output_sb
  label: Speaker Output SB
  kind: action
  command: "PSSP:SB"
  params: []
- id: speaker_output_hw
  label: Speaker Output HW
  kind: action
  command: "PSSP:HW"
  params: []
- id: speaker_output_bh
  label: Speaker Output BH
  kind: action
  command: "PSSP:BH"
  params: []
- id: speaker_output_bw
  label: Speaker Output BW
  kind: action
  command: "PSSP:BW"
  params: []
- id: speaker_output_fl
  label: Speaker Output FL
  kind: action
  command: "PSSP:FL"
  params: []
- id: speaker_output_hf
  label: Speaker Output HF
  kind: action
  command: "PSSP:HF"
  params: []
- id: speaker_output_fr
  label: Speaker Output FR
  kind: action
  command: "PSSP:FR"
  params: []
- id: speaker_output_config_status_query
  label: Query Speaker Output Config Status
  kind: query
  command: "PSSP: ?"
  params: []
- id: pl2z_height_gain_low
  label: PL2z Height Gain LOW
  kind: action
  command: "PSPHG LOW"
  params: []
- id: pl2z_height_gain_mid
  label: PL2z Height Gain MID
  kind: action
  command: "PSPHG MID"
  params: []
- id: pl2z_height_gain_hi
  label: PL2z Height Gain HI
  kind: action
  command: "PSPHG HI"
  params: []
- id: pl2z_height_gain_status_query
  label: Query PL2z Height Gain Status
  kind: query
  command: "PSPHG ?"
  params: []
- id: mult_eq_audyssey
  label: MultEQ Mode AUDYSSEY
  kind: action
  command: "PSMULTEQ:AUDYSSEY"
  params: []
- id: mult_eq_byp_lr
  label: MultEQ Mode BYP.LR
  kind: action
  command: "PSMULTEQ:BYP.LR"
  params: []
- id: mult_eq_flat
  label: MultEQ Mode FLAT
  kind: action
  command: "PSMULTEQ:FLAT"
  params: []
- id: mult_eq_manual
  label: MultEQ Mode MANUAL
  kind: action
  command: "PSMULTEQ:MANUAL"
  params: []
- id: mult_eq_off
  label: MultEQ Mode OFF
  kind: action
  command: "PSMULTEQ:OFF"
  params: []
- id: mult_eq_mode_status_query
  label: Query MultEQ Mode Status
  kind: query
  command: "PSMULTEQ: ?"
  params: []
- id: dynamic_eq_on
  label: Dynamic EQ On
  kind: action
  command: "PSDYNEQ ON"
  params: []
- id: dynamic_eq_off
  label: Dynamic EQ Off
  kind: action
  command: "PSDYNEQ OFF"
  params: []
- id: dynamic_eq_status_query
  label: Query Dynamic EQ Status
  kind: query
  command: "PSDYNEQ ?"
  params: []
- id: reference_level_offset_0
  label: Reference Level Offset 0dB
  kind: action
  command: "PSREFLEV 0"
  params: []
- id: reference_level_offset_5
  label: Reference Level Offset 5dB
  kind: action
  command: "PSREFLEV 5"
  params: []
- id: reference_level_offset_10
  label: Reference Level Offset 10dB
  kind: action
  command: "PSREFLEV 10"
  params: []
- id: reference_level_offset_15
  label: Reference Level Offset 15dB
  kind: action
  command: "PSREFLEV 15"
  params: []
- id: reference_level_offset_status_query
  label: Query Reference Level Offset Status
  kind: query
  command: "PSREFLEV ?"
  params: []
- id: dynamic_volume_hev
  label: Dynamic Volume Heavy
  kind: action
  command: "PSDYNVOL HEV"
  params: []
- id: dynamic_volume_med
  label: Dynamic Volume Medium
  kind: action
  command: "PSDYNVOL MED"
  params: []
- id: dynamic_volume_lit
  label: Dynamic Volume Light
  kind: action
  command: "PSDYNVOL LIT"
  params: []
- id: dynamic_volume_off
  label: Dynamic Volume Off
  kind: action
  command: "PSDYNVOL OFF"
  params: []
- id: dynamic_volume_status_query
  label: Query Dynamic Volume Status
  kind: query
  command: "PSDYNVOL ?"
  params: []
- id: audyssey_lfc_on
  label: Audyssey LFC On
  kind: action
  command: "PSLFC ON"
  params: []
- id: audyssey_lfc_off
  label: Audyssey LFC Off
  kind: action
  command: "PSLFC OFF"
  params: []
- id: audyssey_lfc_status_query
  label: Query Audyssey LFC Status
  kind: query
  command: "PSLFC ?"
  params: []
- id: containment_amount_up
  label: Containment Amount Up
  kind: action
  command: "PSCNTAMT UP"
  params: []
- id: containment_amount_down
  label: Containment Amount Down
  kind: action
  command: "PSCNTAMT DOWN"
  params: []
- id: containment_amount_set
  label: Set Containment Amount Direct
  kind: action
  command: "PSCNTAMT {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), range 1-7 (01-07)"
- id: containment_amount_status_query
  label: Query Containment Amount Status
  kind: query
  command: "PSCNTAMT ?"
  params: []
- id: audyssey_dsx_onhw
  label: Audyssey DSX On Height+Wide
  kind: action
  command: "PSDSX ONHW"
  params: []
- id: audyssey_dsx_onh
  label: Audyssey DSX On Height
  kind: action
  command: "PSDSX ONH"
  params: []
- id: audyssey_dsx_onw
  label: Audyssey DSX On Wide
  kind: action
  command: "PSDSX ONW"
  params: []
- id: audyssey_dsx_off
  label: Audyssey DSX Off
  kind: action
  command: "PSDSX OFF"
  params: []
- id: audyssey_dsx_status_query
  label: Query Audyssey DSX Status
  kind: query
  command: "PSDSX ?"
  params: []
- id: stage_width_up
  label: Stage Width Up
  kind: action
  command: "PSSTW UP"
  params: []
- id: stage_width_down
  label: Stage Width Down
  kind: action
  command: "PSSTW DOWN"
  params: []
- id: stage_width_set
  label: Set Stage Width Direct
  kind: action
  command: "PSSTW {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), 50=0dB. Range -10 to +10 (40-60)."
- id: stage_width_status_query
  label: Query Stage Width Status
  kind: query
  command: "PSSTW ?"
  params: []
- id: stage_height_up
  label: Stage Height Up
  kind: action
  command: "PSSTH UP"
  params: []
- id: stage_height_down
  label: Stage Height Down
  kind: action
  command: "PSSTH DOWN"
  params: []
- id: stage_height_set
  label: Set Stage Height Direct
  kind: action
  command: "PSSTH {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), 50=0dB. Range -10 to +10 (40-60)."
- id: stage_height_status_query
  label: Query Stage Height Status
  kind: query
  command: "PSSTH ?"
  params: []
- id: graphic_eq_on
  label: Graphic EQ On
  kind: action
  command: "PSGEQ ON"
  params: []
- id: graphic_eq_off
  label: Graphic EQ Off
  kind: action
  command: "PSGEQ OFF"
  params: []
- id: graphic_eq_status_query
  label: Query Graphic EQ Status
  kind: query
  command: "PSGEQ ?"
  params: []
- id: dynamic_compression_auto
  label: Dynamic Compression AUTO
  kind: action
  command: "PSDRC AUTO"
  params: []
- id: dynamic_compression_low
  label: Dynamic Compression LOW
  kind: action
  command: "PSDRC LOW"
  params: []
- id: dynamic_compression_mid
  label: Dynamic Compression MID
  kind: action
  command: "PSDRC MID"
  params: []
- id: dynamic_compression_hi
  label: Dynamic Compression HI
  kind: action
  command: "PSDRC HI"
  params: []
- id: dynamic_compression_off
  label: Dynamic Compression OFF
  kind: action
  command: "PSDRC OFF"
  params: []
- id: dynamic_compression_status_query
  label: Query Dynamic Compression Status
  kind: query
  command: "PSDRC ?"
  params: []
- id: bass_sync_up
  label: Bass Sync Up
  kind: action
  command: "PSBSC UP"
  params: []
- id: bass_sync_down
  label: Bass Sync Down
  kind: action
  command: "PSBSC DOWN"
  params: []
- id: bass_sync_set
  label: Set Bass Sync Direct
  kind: action
  command: "PSBSC {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), range 0-16"
- id: bass_sync_status_query
  label: Query Bass Sync Status
  kind: query
  command: "PSBSC ?"
  params: []
- id: dialogue_enhancer_off
  label: Dialogue Enhancer Off
  kind: action
  command: "PSDEH OFF"
  params: []
- id: dialogue_enhancer_low
  label: Dialogue Enhancer LOW
  kind: action
  command: "PSDEH LOW"
  params: []
- id: dialogue_enhancer_med
  label: Dialogue Enhancer MED
  kind: action
  command: "PSDEH MED"
  params: []
- id: dialogue_enhancer_high
  label: Dialogue Enhancer HIGH
  kind: action
  command: "PSDEH HIGH"
  params: []
- id: dialogue_enhancer_status_query
  label: Query Dialogue Enhancer Status
  kind: query
  command: "PSDEH ?"
  params: []
- id: lfe_level_up
  label: LFE Level Up
  kind: action
  command: "PSLFE UP"
  params: []
- id: lfe_level_down
  label: LFE Level Down
  kind: action
  command: "PSLFE DOWN"
  params: []
- id: lfe_level_set
  label: Set LFE Level Direct
  kind: action
  command: "PSLFE {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), 00=0dB, 10=-10dB. Range 0 to -10dB."
- id: lfe_level_status_query
  label: Query LFE Level Status
  kind: query
  command: "PSLFE ?"
  params: []
- id: lfe_level_direct_00
  label: LFE Level Direct 0dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 00"
  params: []
- id: lfe_level_direct_05
  label: LFE Level Direct 5dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 05"
  params: []
- id: lfe_level_direct_10
  label: LFE Level Direct 10dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 10"
  params: []
- id: lfe_level_direct_15
  label: LFE Level Direct 15dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 15"
  params: []
- id: lfe_level_direct_status_query
  label: Query LFE Level Direct Status
  kind: query
  command: "PSLFL ?"
  params: []
- id: effect_on
  label: Effect On
  kind: action
  command: "PSEFF ON"
  params: []
- id: effect_off
  label: Effect Off
  kind: action
  command: "PSEFF OFF"
  params: []
- id: effect_level_up
  label: Effect Level Up
  kind: action
  command: "PSEFF UP"
  params: []
- id: effect_level_down
  label: Effect Level Down
  kind: action
  command: "PSEFF DOWN"
  params: []
- id: effect_level_set
  label: Set Effect Level Direct
  kind: action
  command: "PSEFF {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), 00=0dB, 10=10dB. Range 1-15."
- id: effect_status_query
  label: Query Effect Status
  kind: query
  command: "PSEFF ?"
  params: []
- id: delay_up
  label: Audio Delay Up
  kind: action
  command: "PSDEL UP"
  params: []
- id: delay_down
  label: Audio Delay Down
  kind: action
  command: "PSDEL DOWN"
  params: []
- id: delay_set
  label: Set Audio Delay Direct
  kind: action
  command: "PSDEL {ms}"
  params:
    - name: ms
      type: integer
      description: "000-999 (ASCII), 000=0ms. Range 0-300ms. 0-60ms: 3ms/step; over 60ms: 10ms/step."
- id: delay_status_query
  label: Query Audio Delay Status
  kind: query
  command: "PSDEL ?"
  params: []
- id: panorama_on
  label: Panorama On
  kind: action
  command: "PSPAN ON"
  params: []
- id: panorama_off
  label: Panorama Off
  kind: action
  command: "PSPAN OFF"
  params: []
- id: panorama_status_query
  label: Query Panorama Status
  kind: query
  command: "PSPAN ?"
  params: []
- id: dimension_up
  label: Dimension Up
  kind: action
  command: "PSDIM UP"
  params: []
- id: dimension_down
  label: Dimension Down
  kind: action
  command: "PSDIM DOWN"
  params: []
- id: dimension_set
  label: Set Dimension Direct
  kind: action
  command: "PSDIM {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), range 0-6"
- id: dimension_status_query
  label: Query Dimension Status
  kind: query
  command: "PSDIM ?"
  params: []
- id: center_width_up
  label: Center Width Up
  kind: action
  command: "PSCEN UP"
  params: []
- id: center_width_down
  label: Center Width Down
  kind: action
  command: "PSCEN DOWN"
  params: []
- id: center_width_set
  label: Set Center Width Direct
  kind: action
  command: "PSCEN {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), range 0-7"
- id: center_width_status_query
  label: Query Center Width Status
  kind: query
  command: "PSCEN ?"
  params: []
- id: center_image_up
  label: Center Image Up
  kind: action
  command: "PSCEI UP"
  params: []
- id: center_image_down
  label: Center Image Down
  kind: action
  command: "PSCEI DOWN"
  params: []
- id: center_image_set
  label: Set Center Image Direct
  kind: action
  command: "PSCEI {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), range 0.0-1.0"
- id: center_image_status_query
  label: Query Center Image Status
  kind: query
  command: "PSCEI ?"
  params: []
- id: center_gain_up
  label: Center Gain Up
  kind: action
  command: "PSCEG UP"
  params: []
- id: center_gain_down
  label: Center Gain Down
  kind: action
  command: "PSCEG DOWN"
  params: []
- id: center_gain_set
  label: Set Center Gain Direct
  kind: action
  command: "PSCEG {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), range 0.0-1.0"
- id: center_gain_status_query
  label: Query Center Gain Status
  kind: query
  command: "PSCEG ?"
  params: []
- id: center_spread_on
  label: Center Spread On
  kind: action
  command: "PSCES ON"
  params: []
- id: center_spread_off
  label: Center Spread Off
  kind: action
  command: "PSCES OFF"
  params: []
- id: center_spread_status_query
  label: Query Center Spread Status
  kind: query
  command: "PSCES ?"
  params: []
- id: subwoofer_onoff_on
  label: Subwoofer On (DIRECT/STEREO 2ch mode)
  kind: action
  command: "PSSWR ON"
  params: []
- id: subwoofer_onoff_off
  label: Subwoofer Off (DIRECT/STEREO 2ch mode)
  kind: action
  command: "PSSWR OFF"
  params: []
- id: subwoofer_onoff_status_query
  label: Query Subwoofer On/Off Status
  kind: query
  command: "PSSWR ?"
  params: []
- id: room_size_s
  label: Room Size S
  kind: action
  command: "PSRSZ S"
  params: []
- id: room_size_ms
  label: Room Size MS
  kind: action
  command: "PSRSZ MS"
  params: []
- id: room_size_m
  label: Room Size M
  kind: action
  command: "PSRSZ M"
  params: []
- id: room_size_ml
  label: Room Size ML
  kind: action
  command: "PSRSZ ML"
  params: []
- id: room_size_l
  label: Room Size L
  kind: action
  command: "PSRSZ L"
  params: []
- id: room_size_status_query
  label: Query Room Size Status
  kind: query
  command: "PSRSZ ?"
  params: []
- id: audio_delay_up
  label: Audio Delay (PS) Up
  kind: action
  command: "PSDELAY UP"
  params: []
- id: audio_delay_down
  label: Audio Delay (PS) Down
  kind: action
  command: "PSDELAY DOWN"
  params: []
- id: audio_delay_set
  label: Set Audio Delay (PS) Direct
  kind: action
  command: "PSDELAY {ms}"
  params:
    - name: ms
      type: integer
      description: "000-999 (ASCII), range 0-200ms"
- id: audio_delay_status_query
  label: Query Audio Delay (PS) Status
  kind: query
  command: "PSDELAY ?"
  params: []
- id: audio_restorer_off
  label: Audio Restorer Off
  kind: action
  command: "PSRSTR OFF"
  params: []
- id: audio_restorer_low
  label: Audio Restorer LOW (MODE3)
  kind: action
  command: "PSRSTR LOW"
  params: []
- id: audio_restorer_med
  label: Audio Restorer MED (MODE2)
  kind: action
  command: "PSRSTR MED"
  params: []
- id: audio_restorer_hi
  label: Audio Restorer HI (MODE1)
  kind: action
  command: "PSRSTR HI"
  params: []
- id: audio_restorer_status_query
  label: Query Audio Restorer Status
  kind: query
  command: "PSRSTR ?"
  params: []
- id: front_speaker_spa
  label: Front Speaker SPA
  kind: action
  command: "PSFRONT SPA"
  params: []
- id: front_speaker_spb
  label: Front Speaker SPB
  kind: action
  command: "PSFRONT SPB"
  params: []
- id: front_speaker_apb
  label: Front Speaker A+B
  kind: action
  command: "PSFRONT A+B"
  params: []
- id: front_speaker_status_query
  label: Query Front Speaker Status
  kind: query
  command: "PSFRONT?"
  params: []
- id: auro_preset_sma
  label: Auro-Matic 3D Preset SMA
  kind: action
  command: "PSAUROPR SMA"
  params: []
- id: auro_preset_med
  label: Auro-Matic 3D Preset MED
  kind: action
  command: "PSAUROPR MED"
  params: []
- id: auro_preset_lar
  label: Auro-Matic 3D Preset LAR
  kind: action
  command: "PSAUROPR LAR"
  params: []
- id: auro_preset_spe
  label: Auro-Matic 3D Preset SPE
  kind: action
  command: "PSAUROPR SPE"
  params: []
- id: auro_preset_status_query
  label: Query Auro Preset Status
  kind: query
  command: "PSAUROPR ?"
  params: []
- id: auro_strength_up
  label: Auro-Matic 3D Strength Up
  kind: action
  command: "PSAUROST UP"
  params: []
- id: auro_strength_down
  label: Auro-Matic 3D Strength Down
  kind: action
  command: "PSAUROST DOWN"
  params: []
- id: auro_strength_set
  label: Set Auro-Matic 3D Strength Direct
  kind: action
  command: "PSAUROST {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), 01=1, 10=10. Range 1-16."
- id: auro_strength_status_query
  label: Query Auro Strength Status
  kind: query
  command: "PSAUROST ?"
  params: []

# Picture Mode - PV command
- id: picture_mode_off
  label: Picture Mode Off
  kind: action
  command: "PVOFF"
  params: []
- id: picture_mode_std
  label: Picture Mode Standard
  kind: action
  command: "PVSTD"
  params: []
- id: picture_mode_mov
  label: Picture Mode Movie
  kind: action
  command: "PVMOV"
  params: []
- id: picture_mode_vvd
  label: Picture Mode Vivid
  kind: action
  command: "PVVVD"
  params: []
- id: picture_mode_stm
  label: Picture Mode Stream
  kind: action
  command: "PVSTM"
  params: []
- id: picture_mode_ctm
  label: Picture Mode Custom
  kind: action
  command: "PVCTM"
  params: []
- id: picture_mode_day
  label: Picture Mode ISF Day
  kind: action
  command: "PVDAY"
  params: []
- id: picture_mode_ngt
  label: Picture Mode ISF Night
  kind: action
  command: "PVNGT"
  params: []
- id: picture_mode_status_query
  label: Query Picture Mode Status
  kind: query
  command: "PV?"
  params: []
- id: contrast_up
  label: Contrast Up
  kind: action
  command: "PVCN UP"
  params: []
- id: contrast_down
  label: Contrast Down
  kind: action
  command: "PVCN DOWN"
  params: []
- id: contrast_set
  label: Set Contrast Direct
  kind: action
  command: "PVCN {level}"
  params:
    - name: level
      type: integer
      description: "000-100 (ASCII), 050=0. Range -50 to +50."
- id: contrast_status_query
  label: Query Contrast Status
  kind: query
  command: "PVCN ?"
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  command: "PVBR UP"
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  command: "PVBR DOWN"
  params: []
- id: brightness_set
  label: Set Brightness Direct
  kind: action
  command: "PVBR {level}"
  params:
    - name: level
      type: integer
      description: "000-100 (ASCII), 050=0. Range -50 to +50."
- id: brightness_status_query
  label: Query Brightness Status
  kind: query
  command: "PVBR ?"
  params: []
- id: saturation_up
  label: Saturation Up
  kind: action
  command: "PVST UP"
  params: []
- id: saturation_down
  label: Saturation Down
  kind: action
  command: "PVST DOWN"
  params: []
- id: saturation_set
  label: Set Saturation Direct
  kind: action
  command: "PVST {level}"
  params:
    - name: level
      type: integer
      description: "000-100 (ASCII), 050=0. Range -50 to +50."
- id: saturation_status_query
  label: Query Saturation Status
  kind: query
  command: "PVST ?"
  params: []
- id: hue_up
  label: Hue Up
  kind: action
  command: "PVHUE UP"
  params: []
- id: hue_down
  label: Hue Down
  kind: action
  command: "PVHUE DOWN"
  params: []
- id: hue_set
  label: Set Hue Direct
  kind: action
  command: "PVHUE {level}"
  params:
    - name: level
      type: integer
      description: "44-56 (ASCII), 50=0. Range -6 to +6."
- id: hue_status_query
  label: Query Hue Status
  kind: query
  command: "PVHUE ?"
  params: []
- id: dnr_off
  label: DNR Off
  kind: action
  command: "PVDNR OFF"
  params: []
- id: dnr_low
  label: DNR LOW
  kind: action
  command: "PVDNR LOW"
  params: []
- id: dnr_mid
  label: DNR MID
  kind: action
  command: "PVDNR MID"
  params: []
- id: dnr_hi
  label: DNR HI
  kind: action
  command: "PVDNR HI"
  params: []
- id: dnr_status_query
  label: Query DNR Status
  kind: query
  command: "PVDNR ?"
  params: []
- id: enhancer_up
  label: Enhancer Up
  kind: action
  command: "PVENH UP"
  params: []
- id: enhancer_down
  label: Enhancer Down
  kind: action
  command: "PVENH DOWN"
  params: []
- id: enhancer_set
  label: Set Enhancer Direct
  kind: action
  command: "PVENH {level}"
  params:
    - name: level
      type: integer
      description: "00-12 (ASCII), range 0-12"
- id: enhancer_status_query
  label: Query Enhancer Status
  kind: query
  command: "PVENH ?"
  params: []

# Zone 2 Control - Z2 command
- id: zone2_source
  label: Zone2 Source (same as Main Zone)
  kind: action
  command: "Z2SOURCE"
  params: []
- id: zone2_input
  label: Zone2 Input Select
  kind: action
  command: "Z2{source}"
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  command: "Z2UP"
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  command: "Z2DOWN"
  params: []
- id: zone2_volume_set
  label: Zone2 Volume Direct
  kind: action
  command: "Z2{level}"
  params:
    - name: level
      type: integer
      description: "00-98 (ASCII), 80=0dB, 00=---(MIN)"
- id: zone2_power_on
  label: Zone2 On
  kind: action
  command: "Z2ON"
  params: []
- id: zone2_power_off
  label: Zone2 Off
  kind: action
  command: "Z2OFF"
  params: []
- id: zone2_status_query
  label: Query Zone2 Status
  kind: query
  command: "Z2?"
  params: []
- id: zone2_quick_select_1
  label: Zone2 Quick Select 1
  kind: action
  command: "Z2QUICK1"
  params: []
- id: zone2_quick_select_2
  label: Zone2 Quick Select 2
  kind: action
  command: "Z2QUICK2"
  params: []
- id: zone2_quick_select_3
  label: Zone2 Quick Select 3
  kind: action
  command: "Z2QUICK3"
  params: []
- id: zone2_quick_select_4
  label: Zone2 Quick Select 4
  kind: action
  command: "Z2QUICK4"
  params: []
- id: zone2_quick_select_5
  label: Zone2 Quick Select 5
  kind: action
  command: "Z2QUICK5"
  params: []
- id: zone2_quick_memory_1
  label: Zone2 Quick Select 1 Memory
  kind: action
  command: "Z2QUICK1 MEMORY"
  params: []
- id: zone2_quick_memory_2
  label: Zone2 Quick Select 2 Memory
  kind: action
  command: "Z2QUICK2 MEMORY"
  params: []
- id: zone2_quick_memory_3
  label: Zone2 Quick Select 3 Memory
  kind: action
  command: "Z2QUICK3 MEMORY"
  params: []
- id: zone2_quick_memory_4
  label: Zone2 Quick Select 4 Memory
  kind: action
  command: "Z2QUICK4 MEMORY"
  params: []
- id: zone2_quick_memory_5
  label: Zone2 Quick Select 5 Memory
  kind: action
  command: "Z2QUICK5 MEMORY"
  params: []
- id: zone2_quick_status_query
  label: Query Zone2 Quick Select Status
  kind: query
  command: "Z2QUICK ?"
  params: []
- id: zone2_favorite_1
  label: Zone2 Favorite 1
  kind: action
  command: "Z2FAVORITE1"
  params: []
- id: zone2_favorite_2
  label: Zone2 Favorite 2
  kind: action
  command: "Z2FAVORITE2"
  params: []
- id: zone2_favorite_3
  label: Zone2 Favorite 3
  kind: action
  command: "Z2FAVORITE3"
  params: []
- id: zone2_favorite_4
  label: Zone2 Favorite 4
  kind: action
  command: "Z2FAVORITE4"
  params: []
- id: zone2_favorite_memory_1
  label: Zone2 Favorite 1 Memory
  kind: action
  command: "Z2FAVORITE1 MEMORY"
  params: []
- id: zone2_favorite_memory_2
  label: Zone2 Favorite 2 Memory
  kind: action
  command: "Z2FAVORITE2 MEMORY"
  params: []
- id: zone2_favorite_memory_3
  label: Zone2 Favorite 3 Memory
  kind: action
  command: "Z2FAVORITE3 MEMORY"
  params: []
- id: zone2_favorite_memory_4
  label: Zone2 Favorite 4 Memory
  kind: action
  command: "Z2FAVORITE4 MEMORY"
  params: []
- id: zone2_mute_on
  label: Zone2 Mute On
  kind: action
  command: "Z2MUON"
  params: []
- id: zone2_mute_off
  label: Zone2 Mute Off
  kind: action
  command: "Z2MUOFF"
  params: []
- id: zone2_mute_status_query
  label: Query Zone2 Mute Status
  kind: query
  command: "Z2MU?"
  params: []
- id: zone2_channel_setting_st
  label: Zone2 Channel Setting Stereo
  kind: action
  command: "Z2CSST"
  params: []
- id: zone2_channel_setting_mono
  label: Zone2 Channel Setting Mono
  kind: action
  command: "Z2CSMONO"
  params: []
- id: zone2_channel_setting_status_query
  label: Query Zone2 Channel Setting Status
  kind: query
  command: "Z2CS?"
  params: []
- id: zone2_channel_volume_fl_up
  label: Zone2 Channel Volume FL Up
  kind: action
  command: "Z2CVFL UP"
  params: []
- id: zone2_channel_volume_fl_down
  label: Zone2 Channel Volume FL Down
  kind: action
  command: "Z2CVFL DOWN"
  params: []
- id: zone2_channel_volume_fl_set
  label: Zone2 Channel Volume FL Set
  kind: action
  command: "Z2CVFL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 (ASCII), 50=0dB"
- id: zone2_channel_volume_fr_up
  label: Zone2 Channel Volume FR Up
  kind: action
  command: "Z2CVFR UP"
  params: []
- id: zone2_channel_volume_fr_down
  label: Zone2 Channel Volume FR Down
  kind: action
  command: "Z2CVFR DOWN"
  params: []
- id: zone2_channel_volume_fr_set
  label: Zone2 Channel Volume FR Set
  kind: action
  command: "Z2CVFR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 (ASCII), 50=0dB"
- id: zone2_channel_volume_status_query
  label: Query Zone2 Channel Volume Status
  kind: query
  command: "Z2CV?"
  params: []
- id: zone2_hpf_on
  label: Zone2 HPF On
  kind: action
  command: "Z2HPFON"
  params: []
- id: zone2_hpf_off
  label: Zone2 HPF Off
  kind: action
  command: "Z2HPFOFF"
  params: []
- id: zone2_hpf_status_query
  label: Query Zone2 HPF Status
  kind: query
  command: "Z2HPF?"
  params: []
- id: zone2_bass_up
  label: Zone2 Bass Up
  kind: action
  command: "Z2PSBAS UP"
  params: []
- id: zone2_bass_down
  label: Zone2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN"
  params: []
- id: zone2_bass_set
  label: Zone2 Bass Set
  kind: action
  command: "Z2PSBAS {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), range -10 to +10 (40-60)"
- id: zone2_bass_status_query
  label: Query Zone2 Bass Status
  kind: query
  command: "Z2PSBAS ?"
  params: []
- id: zone2_treble_up
  label: Zone2 Treble Up
  kind: action
  command: "Z2PSTRE UP"
  params: []
- id: zone2_treble_down
  label: Zone2 Treble Down
  kind: action
  command: "Z2PSTRE DOWN"
  params: []
- id: zone2_treble_set
  label: Zone2 Treble Set
  kind: action
  command: "Z2PSTRE {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), range -10 to +10 (40-60)"
- id: zone2_treble_status_query
  label: Query Zone2 Treble Status
  kind: query
  command: "Z2PSTRE ?"
  params: []
- id: zone2_hdmi_audio_thr
  label: Zone2 HDMI Audio Through
  kind: action
  command: "Z2HDA THR"
  params: []
- id: zone2_hdmi_audio_pcm
  label: Zone2 HDMI Audio PCM
  kind: action
  command: "Z2HDA PCM"
  params: []
- id: zone2_hdmi_audio_status_query
  label: Query Zone2 HDMI Audio Status
  kind: query
  command: "Z2HDA?"
  params: []
- id: zone2_sleep_timer_off
  label: Zone2 Sleep Timer Off
  kind: action
  command: "Z2SLPOFF"
  params: []
- id: zone2_sleep_timer_set
  label: Zone2 Sleep Timer Set
  kind: action
  command: "Z2SLP{minutes}"
  params:
    - name: minutes
      type: integer
      description: "001-120 (ASCII)"
- id: zone2_sleep_timer_status_query
  label: Query Zone2 Sleep Timer Status
  kind: query
  command: "Z2SLP?"
  params: []
- id: zone2_auto_standby_2h
  label: Zone2 Auto Standby 2H
  kind: action
  command: "Z2STBY2H"
  params: []
- id: zone2_auto_standby_4h
  label: Zone2 Auto Standby 4H
  kind: action
  command: "Z2STBY4H"
  params: []
- id: zone2_auto_standby_8h
  label: Zone2 Auto Standby 8H
  kind: action
  command: "Z2STBY8H"
  params: []
- id: zone2_auto_standby_off
  label: Zone2 Auto Standby Off
  kind: action
  command: "Z2STBYOFF"
  params: []
- id: zone2_auto_standby_status_query
  label: Query Zone2 Auto Standby Status
  kind: query
  command: "Z2STBY?"
  params: []

# Zone 3 Control - Z3 command
- id: zone3_source
  label: Zone3 Source (same as Main Zone)
  kind: action
  command: "Z3SOURCE"
  params: []
- id: zone3_input
  label: Zone3 Input Select
  kind: action
  command: "Z3{source}"
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  command: "Z3UP"
  params: []
- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  command: "Z3DOWN"
  params: []
- id: zone3_volume_set
  label: Zone3 Volume Direct
  kind: action
  command: "Z3{level}"
  params:
    - name: level
      type: integer
      description: "00-98 (ASCII), 80=0dB, 00=---(MIN)"
- id: zone3_power_on
  label: Zone3 On
  kind: action
  command: "Z3ON"
  params: []
- id: zone3_power_off
  label: Zone3 Off
  kind: action
  command: "Z3OFF"
  params: []
- id: zone3_status_query
  label: Query Zone3 Status
  kind: query
  command: "Z3?"
  params: []
- id: zone3_quick_select_1
  label: Zone3 Quick Select 1
  kind: action
  command: "Z3QUICK1"
  params: []
- id: zone3_quick_select_2
  label: Zone3 Quick Select 2
  kind: action
  command: "Z3QUICK2"
  params: []
- id: zone3_quick_select_3
  label: Zone3 Quick Select 3
  kind: action
  command: "Z3QUICK3"
  params: []
- id: zone3_quick_select_4
  label: Zone3 Quick Select 4
  kind: action
  command: "Z3QUICK4"
  params: []
- id: zone3_quick_select_5
  label: Zone3 Quick Select 5
  kind: action
  command: "Z3QUICK5"
  params: []
- id: zone3_quick_memory_1
  label: Zone3 Quick Select 1 Memory
  kind: action
  command: "Z3QUICK1 MEMORY"
  params: []
- id: zone3_quick_memory_2
  label: Zone3 Quick Select 2 Memory
  kind: action
  command: "Z3QUICK2 MEMORY"
  params: []
- id: zone3_quick_memory_3
  label: Zone3 Quick Select 3 Memory
  kind: action
  command: "Z3QUICK3 MEMORY"
  params: []
- id: zone3_quick_memory_4
  label: Zone3 Quick Select 4 Memory
  kind: action
  command: "Z3QUICK4 MEMORY"
  params: []
- id: zone3_quick_memory_5
  label: Zone3 Quick Select 5 Memory
  kind: action
  command: "Z3QUICK5 MEMORY"
  params: []
- id: zone3_quick_status_query
  label: Query Zone3 Quick Select Status
  kind: query
  command: "Z3QUICK ?"
  params: []
- id: zone3_favorite_1
  label: Zone3 Favorite 1
  kind: action
  command: "Z3FAVORITE1"
  params: []
- id: zone3_favorite_2
  label: Zone3 Favorite 2
  kind: action
  command: "Z3FAVORITE2"
  params: []
- id: zone3_favorite_3
  label: Zone3 Favorite 3
  kind: action
  command: "Z3FAVORITE3"
  params: []
- id: zone3_favorite_4
  label: Zone3 Favorite 4
  kind: action
  command: "Z3FAVORITE4"
  params: []
- id: zone3_favorite_memory_1
  label: Zone3 Favorite 1 Memory
  kind: action
  command: "Z3FAVORITE1 MEMORY"
  params: []
- id: zone3_favorite_memory_2
  label: Zone3 Favorite 2 Memory
  kind: action
  command: "Z3FAVORITE2 MEMORY"
  params: []
- id: zone3_favorite_memory_3
  label: Zone3 Favorite 3 Memory
  kind: action
  command: "Z3FAVORITE3 MEMORY"
  params: []
- id: zone3_favorite_memory_4
  label: Zone3 Favorite 4 Memory
  kind: action
  command: "Z3FAVORITE4 MEMORY"
  params: []
- id: zone3_mute_on
  label: Zone3 Mute On
  kind: action
  command: "Z3MUON"
  params: []
- id: zone3_mute_off
  label: Zone3 Mute Off
  kind: action
  command: "Z3MUOFF"
  params: []
- id: zone3_mute_status_query
  label: Query Zone3 Mute Status
  kind: query
  command: "Z3MU?"
  params: []
- id: zone3_channel_setting_st
  label: Zone3 Channel Setting Stereo
  kind: action
  command: "Z3CSST"
  params: []
- id: zone3_channel_setting_mono
  label: Zone3 Channel Setting Mono
  kind: action
  command: "Z3CSMONO"
  params: []
- id: zone3_channel_setting_status_query
  label: Query Zone3 Channel Setting Status
  kind: query
  command: "Z3CS?"
  params: []
- id: zone3_channel_volume_fl_up
  label: Zone3 Channel Volume FL Up
  kind: action
  command: "Z3CVFL UP"
  params: []
- id: zone3_channel_volume_fl_down
  label: Zone3 Channel Volume FL Down
  kind: action
  command: "Z3CVFL DOWN"
  params: []
- id: zone3_channel_volume_fl_set
  label: Zone3 Channel Volume FL Set
  kind: action
  command: "Z3CVFL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 (ASCII), 50=0dB"
- id: zone3_channel_volume_fr_up
  label: Zone3 Channel Volume FR Up
  kind: action
  command: "Z3CVFR UP"
  params: []
- id: zone3_channel_volume_fr_down
  label: Zone3 Channel Volume FR Down
  kind: action
  command: "Z3CVFR DOWN"
  params: []
- id: zone3_channel_volume_fr_set
  label: Zone3 Channel Volume FR Set
  kind: action
  command: "Z3CVFR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 (ASCII), 50=0dB"
- id: zone3_channel_volume_status_query
  label: Query Zone3 Channel Volume Status
  kind: query
  command: "Z3CV?"
  params: []
- id: zone3_hpf_on
  label: Zone3 HPF On
  kind: action
  command: "Z3HPFON"
  params: []
- id: zone3_hpf_off
  label: Zone3 HPF Off
  kind: action
  command: "Z3HPFOFF"
  params: []
- id: zone3_hpf_status_query
  label: Query Zone3 HPF Status
  kind: query
  command: "Z3HPF?"
  params: []
- id: zone3_bass_up
  label: Zone3 Bass Up
  kind: action
  command: "Z3PSBAS UP"
  params: []
- id: zone3_bass_down
  label: Zone3 Bass Down
  kind: action
  command: "Z3PSBAS DOWN"
  params: []
- id: zone3_bass_set
  label: Zone3 Bass Set
  kind: action
  command: "Z3PSBAS {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), range -10 to +10 (40-60)"
- id: zone3_bass_status_query
  label: Query Zone3 Bass Status
  kind: query
  command: "Z3PSBAS ?"
  params: []
- id: zone3_treble_up
  label: Zone3 Treble Up
  kind: action
  command: "Z3PSTRE UP"
  params: []
- id: zone3_treble_down
  label: Zone3 Treble Down
  kind: action
  command: "Z3PSTRE DOWN"
  params: []
- id: zone3_treble_set
  label: Zone3 Treble Set
  kind: action
  command: "Z3PSTRE {level}"
  params:
    - name: level
      type: integer
      description: "00-99 (ASCII), range -10 to +10 (40-60)"
- id: zone3_treble_status_query
  label: Query Zone3 Treble Status
  kind: query
  command: "Z3PSTRE ?"
  params: []
- id: zone3_sleep_timer_off
  label: Zone3 Sleep Timer Off
  kind: action
  command: "Z3SLPOFF"
  params: []
- id: zone3_sleep_timer_set
  label: Zone3 Sleep Timer Set
  kind: action
  command: "Z3SLP{minutes}"
  params:
    - name: minutes
      type: integer
      description: "001-120 (ASCII)"
- id: zone3_sleep_timer_status_query
  label: Query Zone3 Sleep Timer Status
  kind: query
  command: "Z3SLP?"
  params: []
- id: zone3_auto_standby_2h
  label: Zone3 Auto Standby 2H
  kind: action
  command: "Z3STBY2H"
  params: []
- id: zone3_auto_standby_4h
  label: Zone3 Auto Standby 4H
  kind: action
  command: "Z3STBY4H"
  params: []
- id: zone3_auto_standby_8h
  label: Zone3 Auto Standby 8H
  kind: action
  command: "Z3STBY8H"
  params: []
- id: zone3_auto_standby_off
  label: Zone3 Auto Standby Off
  kind: action
  command: "Z3STBYOFF"
  params: []
- id: zone3_auto_standby_status_query
  label: Query Zone3 Auto Standby Status
  kind: query
  command: "Z3STBY?"
  params: []

# Tuner Control - TF/TP/TM commands
- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  command: "TFANUP"
  params: []
- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  command: "TFANDOWN"
  params: []
- id: tuner_frequency_direct
  label: Tuner Frequency Direct
  kind: action
  command: "TFAN{frequency}"
  params:
    - name: frequency
      type: integer
      description: "6 digits. >050000 = AM (kHz), <050000 = FM (MHz)"
- id: tuner_frequency_status_query
  label: Query Tuner Frequency Status
  kind: query
  command: "TFAN?"
  params: []
- id: tuner_rds_name_query
  label: Query RDS Station Name (EU/AP only)
  kind: query
  command: "TFANNAME?"
  params: []
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
- id: tuner_preset_direct
  label: Tuner Preset Direct
  kind: action
  command: "TPAN{preset}"
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tuner_preset_status_query
  label: Query Tuner Preset Status
  kind: query
  command: "TPAN?"
  params: []
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "TPANMEM"
  params: []
- id: tuner_preset_memory_direct
  label: Tuner Preset Memory Direct
  kind: action
  command: "TPANMEM{preset}"
  params:
    - name: preset
      type: integer
      description: "01-56"
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
- id: tuner_band_mode_status_query
  label: Query Tuner Band/Mode Status
  kind: query
  command: "TMAN?"
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

# HD Radio Control
- id: hd_radio_channel_up
  label: HD Radio Channel Up
  kind: action
  command: "TFHDUP"
  params: []
- id: hd_radio_channel_down
  label: HD Radio Channel Down
  kind: action
  command: "TFHDDOWN"
  params: []
- id: hd_radio_channel_direct
  label: HD Radio Channel/Frequency Direct
  kind: action
  command: "TFHD{frequency}"
  params:
    - name: frequency
      type: integer
      description: "6 digits. >050000 = AM, <050000 = FM"
- id: hd_radio_multicast_select
  label: HD Radio Multicast Select
  kind: action
  command: "TFHDMC{channel}"
  params:
    - name: channel
      type: integer
      description: "1-8 (multicast channel), 0=analog"
- id: hd_radio_frequency_multicast_direct
  label: HD Radio Frequency + Multicast Direct
  kind: action
  command: "TFHD{frequency}MC{multicast}"
  params:
    - name: frequency
      type: integer
      description: "6 digits"
    - name: multicast
      type: integer
      description: "Multicast channel 1-8"
- id: hd_radio_status_query
  label: Query HD Radio Status
  kind: query
  command: "TFHD?"
  params: []
- id: hd_radio_preset_up
  label: HD Radio Preset Up
  kind: action
  command: "TPHDUP"
  params: []
- id: hd_radio_preset_down
  label: HD Radio Preset Down
  kind: action
  command: "TPHDDOWN"
  params: []
- id: hd_radio_preset_direct
  label: HD Radio Preset Direct
  kind: action
  command: "TPHD{preset}"
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: hd_radio_preset_status_query
  label: Query HD Radio Preset Status
  kind: query
  command: "TPHD?"
  params: []
- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  command: "TPHDMEM"
  params: []
- id: hd_radio_preset_memory_direct
  label: HD Radio Preset Memory Direct
  kind: action
  command: "TPHDMEM{preset}"
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: hd_radio_band_am
  label: HD Radio Band AM
  kind: action
  command: "TMHDAM"
  params: []
- id: hd_radio_band_fm
  label: HD Radio Band FM
  kind: action
  command: "TMHDFM"
  params: []
- id: hd_radio_mode_autohd
  label: HD Radio Mode AUTO-HD
  kind: action
  command: "TMHDAUTOHD"
  params: []
- id: hd_radio_mode_auto
  label: HD Radio Mode AUTO
  kind: action
  command: "TMHDAUTO"
  params: []
- id: hd_radio_mode_manual
  label: HD Radio Mode MANUAL
  kind: action
  command: "TMHDMANUAL"
  params: []
- id: hd_radio_mode_anaauto
  label: HD Radio Mode ANALOG AUTO
  kind: action
  command: "TMHDANAAUTO"
  params: []
- id: hd_radio_mode_anamanu
  label: HD Radio Mode ANALOG MANUAL
  kind: action
  command: "TMHDANAMANU"
  params: []
- id: hd_radio_band_mode_status_query
  label: Query HD Radio Band/Mode Status
  kind: query
  command: "TMHD?"
  params: []
- id: hd_radio_info_status_query
  label: Query HD Radio Info (all fields)
  kind: query
  command: "HD?"
  params: []

# Online Music / USB/iPod / Bluetooth - NS command
- id: nav_cursor_up
  label: Cursor Up
  kind: action
  command: "NS90"
  params: []
- id: nav_cursor_down
  label: Cursor Down
  kind: action
  command: "NS91"
  params: []
- id: nav_cursor_left
  label: Cursor Left
  kind: action
  command: "NS92"
  params: []
- id: nav_cursor_right
  label: Cursor Right
  kind: action
  command: "NS93"
  params: []
- id: nav_enter
  label: Enter / Play / Pause
  kind: action
  command: "NS94"
  params: []
- id: nav_play
  label: Play
  kind: action
  command: "NS9A"
  params: []
- id: nav_pause
  label: Pause
  kind: action
  command: "NS9B"
  params: []
- id: nav_stop
  label: Stop
  kind: action
  command: "NS9C"
  params: []
- id: nav_skip_plus
  label: Skip Plus
  kind: action
  command: "NS9D"
  params: []
- id: nav_skip_minus
  label: Skip Minus
  kind: action
  command: "NS9E"
  params: []
- id: nav_manual_search_plus
  label: Manual Search Plus
  kind: action
  command: "NS9F"
  params: []
- id: nav_manual_search_minus
  label: Manual Search Minus
  kind: action
  command: "NS9G"
  params: []
- id: nav_repeat_one
  label: Repeat One
  kind: action
  command: "NS9H"
  params: []
- id: nav_repeat_all
  label: Repeat All
  kind: action
  command: "NS9I"
  params: []
- id: nav_repeat_off
  label: Repeat Off
  kind: action
  command: "NS9J"
  params: []
- id: nav_random_on
  label: Random / Shuffle On
  kind: action
  command: "NS9K"
  params: []
- id: nav_random_off
  label: Random / Shuffle Off
  kind: action
  command: "NS9M"
  params: []
- id: nav_toggle_mode
  label: Toggle iPod Mode / On Screen Mode
  kind: action
  command: "NS9W"
  params: []
- id: nav_page_next
  label: Page Next
  kind: action
  command: "NS9X"
  params: []
- id: nav_page_previous
  label: Page Previous
  kind: action
  command: "NS9Y"
  params: []
- id: nav_manual_search_stop
  label: Manual Search Stop
  kind: action
  command: "NS9Z"
  params: []
- id: nav_repeat_toggle
  label: Repeat Toggle
  kind: action
  command: "NSRPT"
  params: []
- id: nav_random_toggle
  label: Random Toggle
  kind: action
  command: "NSRND"
  params: []
- id: nav_preset_call
  label: Preset Call (except Bluetooth, USB/iPod)
  kind: action
  command: "NSB{preset}"
  params:
    - name: preset
      type: integer
      description: "00-35 (2014 AVR)"
- id: nav_preset_memory
  label: Preset Memory (except Bluetooth, USB/iPod)
  kind: action
  command: "NSC{preset}"
  params:
    - name: preset
      type: integer
      description: "00-35"
- id: nav_net_audio_preset_name_query
  label: Net/Audio Preset Name Status
  kind: query
  command: "NSH"
  params: []
- id: nav_add_favorites
  label: Add Favorites Folder
  kind: action
  command: "NSFV MEM"
  params: []
- id: nav_onscreen_display_info
  label: Request Onscreen Display Information List (ASCII)
  kind: query
  command: "NSA"
  params: []
- id: nav_onscreen_display_info_utf8
  label: Request Onscreen Display Information List (UTF-8)
  kind: query
  command: "NSE"
  params: []

# System Control - MN command
- id: sys_cursor_up
  label: System Cursor Up
  kind: action
  command: "MNCUP"
  params: []
- id: sys_cursor_down
  label: System Cursor Down
  kind: action
  command: "MNCDN"
  params: []
- id: sys_cursor_left
  label: System Cursor Left
  kind: action
  command: "MNCLT"
  params: []
- id: sys_cursor_right
  label: System Cursor Right
  kind: action
  command: "MNCRT"
  params: []
- id: sys_enter
  label: System Enter
  kind: action
  command: "MNENT"
  params: []
- id: sys_return
  label: System Return
  kind: action
  command: "MNRTN"
  params: []
- id: sys_option
  label: System Option
  kind: action
  command: "MNOPT"
  params: []
- id: sys_info
  label: System Info
  kind: action
  command: "MNINF"
  params: []
- id: sys_channel_level_adjust
  label: Channel Level Adjust Menu Toggle
  kind: action
  command: "MNCHL"
  params: []
- id: sys_menu_on
  label: Setup Menu On
  kind: action
  command: "MNMEN ON"
  params: []
- id: sys_menu_off
  label: Setup Menu Off
  kind: action
  command: "MNMEN OFF"
  params: []
- id: sys_menu_status_query
  label: Query Setup Menu Status
  kind: query
  command: "MNMEN?"
  params: []
- id: sys_instavue_on
  label: InstaPrevue On
  kind: action
  command: "MNPRV ON"
  params: []
- id: sys_instavue_off
  label: InstaPrevue Off
  kind: action
  command: "MNPRV OFF"
  params: []
- id: sys_instavue_status_query
  label: Query InstaPrevue Status
  kind: query
  command: "MNPRV?"
  params: []
- id: sys_all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  command: "MNZST ON"
  params: []
- id: sys_all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  command: "MNZST OFF"
  params: []
- id: sys_all_zone_stereo_status_query
  label: Query All Zone Stereo Status
  kind: query
  command: "MNZST?"
  params: []

# System Lock / Security - SY command
- id: sys_remote_lock_on
  label: Remote Lock On
  kind: action
  command: "SYREMOTE LOCK ON"
  params: []
- id: sys_remote_lock_off
  label: Remote Lock Off
  kind: action
  command: "SYREMOTE LOCK OFF"
  params: []
- id: sys_panel_lock_on
  label: Panel Lock On (except Master VOL)
  kind: action
  command: "SYPANEL LOCK ON"
  params: []
- id: sys_panel_vol_lock_on
  label: Panel and Master Volume Lock On
  kind: action
  command: "SYPANEL+V LOCK ON"
  params: []
- id: sys_panel_lock_off
  label: Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF"
  params: []

# Trigger - TR command
- id: trigger_1_on
  label: Trigger 1 On
  kind: action
  command: "TR1 ON"
  params: []
- id: trigger_1_off
  label: Trigger 1 Off
  kind: action
  command: "TR1 OFF"
  params: []
- id: trigger_2_on
  label: Trigger 2 On
  kind: action
  command: "TR2 ON"
  params: []
- id: trigger_2_off
  label: Trigger 2 Off
  kind: action
  command: "TR2 OFF"
  params: []
- id: trigger_status_query
  label: Query Trigger Status
  kind: query
  command: "TR?"
  params: []

# Upgrade - UG command
- id: upgrade_id_display
  label: Display ID Number for Upgrade
  kind: action
  command: "UGIDN"
  params: []

# Remote Maintenance - RM command
- id: remote_maintenance_start
  label: Remote Maintenance Mode Start
  kind: action
  command: "RM STA"
  params: []
- id: remote_maintenance_end
  label: Remote Maintenance Mode End
  kind: action
  command: "RM END"
  params: []
- id: remote_maintenance_status_query
  label: Query Remote Maintenance Status
  kind: query
  command: "RM ?"
  params: []

# Dimmer - DIM command
- id: dimmer_bright
  label: Dimmer Bright
  kind: action
  command: "DIM BRI"
  params: []
- id: dimmer_dim
  label: Dimmer Dim
  kind: action
  command: "DIM DIM"
  params: []
- id: dimmer_dark
  label: Dimmer Dark
  kind: action
  command: "DIM DAR"
  params: []
- id: dimmer_off
  label: Dimmer Off
  kind: action
  command: "DIM OFF"
  params: []
- id: dimmer_select_toggle
  label: Dimmer Select Toggle
  kind: action
  command: "DIM SEL"
  params: []
- id: dimmer_status_query
  label: Query Dimmer Status
  kind: query
  command: "DIM ?"
  params: []
```

## Feedbacks
```yaml
# Power
- id: power_state
  type: enum
  values: [PWON, PWSTANDBY]
  description: "Returned after PW, PWON, PWSTANDBY, or PW? command."

# Master Volume
- id: master_volume_state
  type: string
  description: "MVnn (2-digit or 3-digit ASCII). 80=0dB, 00=---(MIN). 0.5dB steps use 3 digits."
  example: "MV80<CR>"

# Channel Volume
- id: channel_volume_state
  type: string
  description: "CVCH nn (e.g. CVFL 50). Channel: FL/FR/C/SW/SW2/SL/SR/SBL/SBR/SB/FHL/FHR/FWL/FWR/TFL/TFR/TML/TMR/TRL/TRR/RHL/RHR/FDL/FDR/SDL/SDR/BDL/BDR/SHL/SHR/TS. Ends with CVEND<CR> after all channels."
  example: "CVFL 50<CR>"

# Mute
- id: mute_state
  type: enum
  values: [MUON, MUOFF]

# Input Select
- id: input_state
  type: string
  description: "SIxxxx<CR> where xxxx is the current input source."
  example: "SIDVD<CR>"

# Zone (ZM) - returns ZMON/ZMOFF + active Z2/SR status when in ZONE2/REC mode
- id: zone_main_state
  type: enum
  values: [ZMON, ZMOFF]
  description: "ZMFAVORITE1-4 also returned in favorite mode."

# Zone 2
- id: zone2_state
  type: string
  description: "Z2ON, Z2OFF, Z280 (volume), Z2CVFL nn, Z2CVFR nn, Z2MUON, Z2MUOFF, Z2CSST, Z2CSMONO, Z2HPFON, Z2HPFOFF, Z2PSBAS nn, Z2PSTRE nn, Z2HDA THR/PCM, Z2SLPnnn, Z2STBY2H/4H/8H/OFF"

# Zone 3
- id: zone3_state
  type: string
  description: "Z3ON, Z3OFF, Z380, Z3CVFL nn, Z3CVFR nn, Z3MUON, Z3MUOFF, Z3CSST, Z3CSMONO, Z3HPFON, Z3HPFOFF, Z3PSBAS nn, Z3PSTRE nn, Z3SLPnnn, Z3STBY2H/4H/8H/OFF"

# Digital Input (SD)
- id: digital_input_state
  type: string
  description: "SDAUTO, SDHDMI, SDDIGITAL, SDANALOG, SDEXT.IN, SD7.1IN, SDNO, SDARC"

# Digital Mode (DC)
- id: digital_mode_state
  type: enum
  values: [DCAUTO, DCPCM, DCDTS]

# Video Select (SV)
- id: video_select_state
  type: string
  description: "SVDVD/SVBD/SVTV/SVSAT/CBL/SVMPLAY/SVGAME/SVAUX1-7/SVCD/SVSOURCE/SVON/SVOFF"

# Sleep Timer (SLP)
- id: sleep_timer_state
  type: string
  description: "SLPnnn (001-120 minutes) or SLPOFF"

# Auto Standby (STBY)
- id: auto_standby_state
  type: string
  description: "STBY15M, STBY30M, STBY60M, STBYOFF"

# ECO Mode (ECO)
- id: eco_mode_state
  type: enum
  values: [ECONON, ECOAUTO, ECOOFF]

# Surround Mode (MS)
- id: surround_mode_state
  type: string
  description: "MSxxxx<CR>. Many values including MSDIRECT, MSPURE DIRECT, MSSTEREO, MSAUTO, MSDOLBY DIGITAL, MSDTS SURROUND, etc."

# Quick Select Status
- id: quick_select_state
  type: string
  description: "MSQUICK1-5 (select) or MSQUICK1-5 MEMORY (memory) returned after MSQUICK? query."

# Video Processing (VS)
- id: video_aspect_state
  type: enum
  values: [VSASPNRM, VSASPFUL]
- id: video_monitor_state
  type: string
  description: "VSMONIAUTO, VSMONI1, VSMONI2"
- id: video_resolution_state
  type: string
  description: "VSSC48P, VSSC10I, VSSC72P, VSSC10P, VSSC10P24, VSSC4K, VSSC4KF, VSSCAUTO, VSSCH48P, VSSCH10I, VSSCH72P, VSSCH10P, VSSCH10P24, VSSCH4K, VSSCH4KF, VSSCHAUTO"
- id: video_audio_output_state
  type: string
  description: "VSAUDIO AMP, VSAUDIO TV"
- id: video_processing_mode_state
  type: string
  description: "VSVPMAUTO, VSVPMGAME, VSVPMMOVI"
- id: video_vertical_stretch_state
  type: enum
  values: [VSVST ON, VSVST OFF]

# Tone / PS Parameters - tone, bass, treble, dialog, subwoofer, etc.
- id: tone_control_state
  type: enum
  values: [PSTONE CTRL ON, PSTONE CTRL OFF]
- id: bass_treble_state
  type: string
  description: "PSBAS nn / PSTRE nn (00-99, 50=0dB)"
- id: dialog_level_state
  type: string
  description: "PSDIL ON/OFF + PSDIL nn"
- id: subwoofer_level_state
  type: string
  description: "PSSWL ON/OFF + PPSWL nn + PSSWL2 nn (if SW2 present)"
- id: cinema_eq_state
  type: string
  description: "PSCINEMA EQ.ON, PSCINEMA EQ.OFF"
- id: cinema_mode_state
  type: string
  description: "PSMODE:MUSIC, PSMODE:CINEMA, PSMODE:GAME, PSMODE:PRO LOGIC, PSMODE:HEIGHT"
- id: loudness_management_state
  type: string
  description: "PSLOM ON/OFF"
- id: front_height_output_state
  type: string
  description: "PSFH:ON/OFF"
- id: speaker_output_config_state
  type: string
  description: "PSSP:FW/FH/SB/HW/BH/BW/FL/HF/FR"
- id: pl2z_height_gain_state
  type: string
  description: "PSPHG LOW/MID/HI"
- id: mult_eq_mode_state
  type: string
  description: "PSMULTEQ:AUDYSSEY/BYP.LR/FLAT/MANUAL/OFF"
- id: dynamic_eq_state
  type: string
  description: "PSDYNEQ ON/OFF"
- id: reference_level_offset_state
  type: string
  description: "PSREFLEV 0/5/10/15"
- id: dynamic_volume_state
  type: string
  description: "PSDYNVOL HEV/MED/LIT/OFF"
- id: audyssey_lfc_state
  type: string
  description: "PSLFC ON/OFF"
- id: containment_amount_state
  type: string
  description: "PSCNTAMT nn (01-07)"
- id: audyssey_dsx_state
  type: string
  description: "PSDSX ONHW/ONH/ONW/OFF"
- id: stage_width_state
  type: string
  description: "PSSTW nn (40-60)"
- id: stage_height_state
  type: string
  description: "PSSTH nn (40-60)"
- id: graphic_eq_state
  type: string
  description: "PSGEQ ON/OFF"
- id: dynamic_compression_state
  type: string
  description: "PSDRC AUTO/LOW/MID/HI/OFF"
- id: bass_sync_state
  type: string
  description: "PSBSC nn (00-99)"
- id: dialogue_enhancer_state
  type: string
  description: "PSDEH OFF/LOW/MED/HIGH"
- id: lfe_level_state
  type: string
  description: "PSLFE nn (00-99)"
- id: effect_state
  type: string
  description: "PSEFF ON/OFF + PSEFF nn"
- id: delay_state
  type: string
  description: "PSDEL UP/DOWN/nnn (000-999ms)"
- id: panorama_state
  type: string
  description: "PSPAN ON/OFF"
- id: dimension_state
  type: string
  description: "PSDIM nn (00-99)"
- id: center_width_state
  type: string
  description: "PSCEN nn (00-99)"
- id: center_image_state
  type: string
  description: "PSCEI nn (00-99)"
- id: center_gain_state
  type: string
  description: "PSCEG nn (00-99)"
- id: center_spread_state
  type: string
  description: "PSCES ON/OFF"
- id: subwoofer_onoff_state
  type: string
  description: "PSSWR ON/OFF"
- id: room_size_state
  type: string
  description: "PSRSZ S/MS/M/ML/L"
- id: audio_delay_state
  type: string
  description: "PSDELAY UP/DOWN/nnn (000-999ms)"
- id: audio_restorer_state
  type: string
  description: "PSRSTR OFF/LOW/MED/HI"
- id: front_speaker_state
  type: string
  description: "PSFRONT SPA/SPB/A+B"
- id: auro_preset_state
  type: string
  description: "PSAUROPR SMA/MED/LAR/SPE"
- id: auro_strength_state
  type: string
  description: "PSAUROST nn (01-16)"

# Picture Mode (PV)
- id: picture_mode_state
  type: string
  description: "PVOFF/PVSTD/PVMOV/PVVVD/PVSTM/PVCTM/PVDAY/PVNGT"
- id: picture_adjustment_state
  type: string
  description: "PVCN/PVBR/PVST/PVHUE nn (contrast/brightness/saturation/hue)"

# REC Select (SR)
- id: rec_select_state
  type: string
  description: "SRPHONO/etc. When ZONE2 mode active, returns Z2-prefixed values."
- id: rec_status_state
  type: string
  description: "SR? returns SRPHONO/etc. or Z2CD/etc. depending on mode."

# Tuner
- id: tuner_frequency_state
  type: string
  description: "TFANxxxxxx<CR> (AM in kHz, FM in MHz as 6 digits)"
- id: tuner_rds_name_state
  type: string
  description: "TFANNAMExxxxxxxx (UTF-8, 8 chars), or blank TFANNAME followed by spaces if NULL"
- id: tuner_preset_state
  type: string
  description: "TPAN01-56 (preset number) or TPANOFF (tuner off)"
- id: tuner_band_mode_state
  type: string
  description: "TMANAM/TMANFM (band) + TMANAUTO/TMANMANUAL (mode)"

# HD Radio
- id: hd_radio_state
  type: string
  description: "TFHDxxxxxxMC* (frequency + multicast channel)"
- id: hd_radio_preset_state
  type: string
  description: "TPHD01-56 or TPHDOFF"
- id: hd_radio_band_mode_state
  type: string
  description: "TMHDAM/HDFM/HDAUTOHD/HDAUTO/HDMANUAL/HDANAAUTO/HDANAMANU"
- id: hd_radio_info_state
  type: string
  description: "Multiple fields: HDST NAME******** (station name), HDSIG LEV 0-6 (signal), HDMLT CURRCH*/CAST CH* (multicast), HDPTY (18 digits), HDARTIST/TITLE/ALBUM/GENRE (up to 40 chars), HDMODE DIGITAL/ANALOG"

# Onscreen Display / Net Audio
- id: nav_onscreen_info_state
  type: string
  description: "NSA0-NSA8 returned lines (96 bytes each). NSA0=Now Playing info, NSA1=Song, NSA2=Artist, NSA3=bitrate, NSA4=Album, NSA5=time+progress, NSA6-NSA8=reserved."
- id: nav_preset_name_state
  type: string
  description: "NSH00-NSH35 (20-char preset names, UTF-8)"
- id: nav_preset_memory_confirm
  type: string
  description: "NSC00<CR> + NSCOK<CR>"
```

## Variables
```yaml
# All queryable parameters above (status queries) expose variable-like state.
# No discrete Variables section needed - Feedbacks cover queryable state.
```

## Events
```yaml
# Events are sent unsolicited when device state changes (within 5 seconds).
# Event format = same as COMMAND format.
# Events fire for: power, input source, surround mode, channel volume (on source change),
# mute, zone on/off, sleep timer, ECO mode, HD Radio changes, iPod/Bluetooth playback state.
# UNRESOLVED: complete event catalog not enumerated in source - only representative examples given
```

## Macros
```yaml
# Power-on sequence: PWON<CR> → wait 1 second → next command (per source note J)
# UNRESOLVED: no explicit named macros defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command interval: send commands at ≥50ms intervals. Response to query within 200ms. Event delivery within 5 seconds of state change. Half-duplex communication on both serial and TCP. Ethernet uses TCP port 23 (telnet). After PWON, wait 1 second before sending next command. Max data length: 135 bytes. ASCII codes 0x20–0x7F only. CR (0x0D) terminates all commands. 0.5dB volume steps use 3-digit ASCII parameter. Command is receivable during EVENT transmission (note A). Channel volume and surround mode return as EVENTs when input source changes; if values unchanged before/after source change, EVENT does NOT return (notes C/D). Minimum volume level is "00". RESPONSE sent only for request commands with a corresponding EVENT; other commands (e.g. SV) do not generate RESPONSE (note G).
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: error code/fault behavior descriptions not in source -->
<!-- UNRESOLVED: TCP keepalive/heartbeat behavior not described -->
<!-- UNRESOLVED: RS-232 flow control (hardware) not specified -->
<!-- UNRESOLVED: multicast HD Radio channel count per station not bounded (1–8 stated, but no upper limit on total channels) -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - assets.denon.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-05-14T15:21:12.776Z
last_checked_at: 2026-06-02T21:41:27.641Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:27.641Z
matched_actions: 565
action_count: 565
confidence: medium
summary: "All 565 spec actions matched verbatim in the source command table; transport (9600bps, port 23) confirmed; no fabricated or drifted tokens found. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model variants (e.g. DNT625 vs DNT645) may differ in channel count or power rating — not differentiated in source"
- "flow control not stated in source"
- "complete event catalog not enumerated in source - only representative examples given"
- "no explicit named macros defined in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "voltage/current/power specifications not in source"
- "error code/fault behavior descriptions not in source"
- "TCP keepalive/heartbeat behavior not described"
- "RS-232 flow control (hardware) not specified"
- "multicast HD Radio channel count per station not bounded (1–8 stated, but no upper limit on total channels)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
