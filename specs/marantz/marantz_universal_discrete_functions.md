---
spec_id: admin/marantz-universal-discrete-functions
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz Universal Discrete Functions Control Spec"
manufacturer: Marantz
model_family: "Marantz Universal Discrete Functions"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "Marantz Universal Discrete Functions"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:45.631Z
last_checked_at: 2026-06-02T08:46:07.387Z
generated_at: 2026-06-02T08:46:07.387Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific compatible model numbers not listed — document is titled \"Universal Discrete Functions\" and covers commands applicable across multiple Marantz AVR models (X1100, S700, S70, X4100, 2014 AVR series, etc.). Firmware version compatibility not stated."
  - "The protocol uses a command-response model where variables are"
  - "No explicit macro/sequence definitions in source."
  - "Entity ID is provided as placeholder. Verify entity_id in Convex dashboard before ingestion."
  - "Compatible models list contains generic \"Marantz Universal Discrete Functions\" — document does not specify exact model numbers. Specific AVR model names (X1100, S700, X4100, etc.) appear as footnotes in the source but no definitive model compatibility matrix is provided."
  - "Firmware version compatibility not stated in source."
  - "TCP port 23 stated for Ethernet/Telnet; no alternative ports documented."
verification:
  verdict: verified
  checked_at: 2026-06-02T08:46:07.387Z
  matched_actions: 767
  action_count: 767
  confidence: medium
  summary: "All 767 spec actions matched verbatim in source; transport port 23 and baud 9600 confirmed; source command count ~770 giving coverage ratio ~0.99. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz Universal Discrete Functions Control Spec

## Summary
Marantz AV receiver control protocol supporting both RS-232C serial and Ethernet TCP/IP interfaces. Protocol is ASCII-based with 2-character commands followed by parameters and a carriage-return terminator (CR = 0x0D). Supports multi-zone control, volume management, input routing, surround mode selection, tuner control, network/USB playback, and system maintenance.

<!-- UNRESOLVED: specific compatible model numbers not listed — document is titled "Universal Discrete Functions" and covers commands applicable across multiple Marantz AVR models (X1100, S700, S70, X4100, 2014 AVR series, etc.). Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # TCP port 23 (telnet) stated in source
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
- powerable  # inferred from PWON/PWSTANDBY commands
- levelable  # inferred from MV (master volume), CV (channel volume), PSBAS/PSTRE commands
- routable   # inferred from SI (input select), SD (digital input select) commands
- queryable  # inferred from all ? query commands (PW?, MV?, SI?, etc.)
```

## Actions
```yaml
# Power control
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

- id: power_query
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
  label: Master Volume Set
  kind: action
  command: "MV{level}"
  params:
    - name: level
      type: string
      description: "ASCII value 00-98; 80=0dB, 00=minimum (---); 0.5dB steps use 3-digit format e.g. MV805=+0.5dB"

- id: master_volume_query
  label: Query Master Volume Status
  kind: query
  command: "MV?"
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

- id: mute_query
  label: Query Mute Status
  kind: query
  command: "MU?"
  params: []

# Input Select (SI)
- id: si_phono
  label: Select Input Phono
  kind: action
  command: "SIPHONO"
  params: []

- id: si_cd
  label: Select Input CD
  kind: action
  command: "SICD"
  params: []

- id: si_tuner
  label: Select Input Tuner
  kind: action
  command: "SITUNER"
  params: []

- id: si_dvd
  label: Select Input DVD/Blu-ray
  kind: action
  command: "SIDVD"
  params: []

- id: si_bd
  label: Select Input Blu-ray
  kind: action
  command: "SIBD"
  params: []

- id: si_tv
  label: Select Input TV Audio
  kind: action
  command: "SITV"
  params: []

- id: si_sat_cbl
  label: Select Input Satellite/Cable
  kind: action
  command: "SISAT/CBL"
  params: []

- id: si_mplay
  label: Select Input Media Player
  kind: action
  command: "SIMPLAY"
  params: []

- id: si_game
  label: Select Input Game
  kind: action
  command: "SIGAME"
  params: []

- id: si_hdradio
  label: Select Input HD Radio (North America only)
  kind: action
  command: "SIHDRADIO"
  params: []

- id: si_net
  label: Select Input Network/Online Music
  kind: action
  command: "SINET"
  params: []

- id: si_pandora
  label: Select Input Pandora (North America only)
  kind: action
  command: "SIPANDORA"
  params: []

- id: si_siriusxm
  label: Select Input SiriusXM
  kind: action
  command: "SISIRIUSXM"
  params: []

- id: si_spotify
  label: Select Input Spotify (North America and Europe only)
  kind: action
  command: "SISPOTIFY"
  params: []

- id: si_lastfm
  label: Select Input LastFM
  kind: action
  command: "SILASTFM"
  params: []

- id: si_flickr
  label: Select Input Flickr
  kind: action
  command: "SIFLICKR"
  params: []

- id: si_iradio
  label: Select Input Internet Radio
  kind: action
  command: "SIIRADIO"
  params: []

- id: si_server
  label: Select Input Media Server
  kind: action
  command: "SISERVER"
  params: []

- id: si_favorites
  label: Select Input Favorites
  kind: action
  command: "SIFAVORITES"
  params: []

- id: si_aux1
  label: Select Input AUX1
  kind: action
  command: "SIAUX1"
  params: []

- id: si_aux2
  label: Select Input AUX2
  kind: action
  command: "SIAUX2"
  params: []

- id: si_aux3
  label: Select Input AUX3 (when Additional Source is set to On)
  kind: action
  command: "SIAUX3"
  params: []

- id: si_aux4
  label: Select Input AUX4
  kind: action
  command: "SIAUX4"
  params: []

- id: si_aux5
  label: Select Input AUX5
  kind: action
  command: "SIAUX5"
  params: []

- id: si_aux6
  label: Select Input AUX6
  kind: action
  command: "SIAUX6"
  params: []

- id: si_aux7
  label: Select Input AUX7
  kind: action
  command: "SIAUX7"
  params: []

- id: si_bt
  label: Select Input Bluetooth
  kind: action
  command: "SIBT"
  params: []

- id: si_usb_ipod
  label: Select Input USB/iPod
  kind: action
  command: "SIUSB/IPOD"
  params: []

- id: si_usb
  label: Select Input USB and USB Start Playback
  kind: action
  command: "SIUSB"
  params: []

- id: si_ipd
  label: Select Input USB and iPod DIRECT Start Playback
  kind: action
  command: "SIIPD"
  params: []

- id: si_irp
  label: Select Input NET/USB and iRadio Recent Play
  kind: action
  command: "SIIRP"
  params: []

- id: si_fvp
  label: Select Input NET/USB and Favorites Play
  kind: action
  command: "SIFVP"
  params: []

- id: si_query
  label: Query Input Status
  kind: query
  command: "SI?"
  params: []

# Main Zone Control (ZM)
- id: zm_on
  label: Main Zone On
  kind: action
  command: "ZMON"
  params: []

- id: zm_off
  label: Main Zone Off
  kind: action
  command: "ZMOFF"
  params: []

- id: zm_query
  label: Query Main Zone Status
  kind: query
  command: "ZM?"
  params: []

- id: zm_favorite1
  label: Main Zone Favorite 1
  kind: action
  command: "ZMFAVORITE1"
  params: []

- id: zm_favorite2
  label: Main Zone Favorite 2
  kind: action
  command: "ZMFAVORITE2"
  params: []

- id: zm_favorite3
  label: Main Zone Favorite 3
  kind: action
  command: "ZMFAVORITE3"
  params: []

- id: zm_favorite4
  label: Main Zone Favorite 4
  kind: action
  command: "ZMFAVORITE4"
  params: []

- id: zm_favorite1_memory
  label: Main Zone Favorite 1 Memory
  kind: action
  command: "ZMFAVORITE1 MEMORY"
  params: []

- id: zm_favorite2_memory
  label: Main Zone Favorite 2 Memory
  kind: action
  command: "ZMFAVORITE2 MEMORY"
  params: []

- id: zm_favorite3_memory
  label: Main Zone Favorite 3 Memory
  kind: action
  command: "ZMFAVORITE3 MEMORY"
  params: []

- id: zm_favorite4_memory
  label: Main Zone Favorite 4 Memory
  kind: action
  command: "ZMFAVORITE4 MEMORY"
  params: []

# Rec Select (SR)
- id: sr_source
  label: Rec Select Source (cancel)
  kind: action
  command: "SRSOURCE"
  params: []

- id: sr_query
  label: Query Rec Select Status
  kind: query
  command: "SR?"
  params: []

# Digital Input Select (SD)
- id: sd_auto
  label: Set Digital Input Auto (HDMI>>Digital>>Analog)
  kind: action
  command: "SDAUTO"
  params: []

- id: sd_hdmi
  label: Set Digital Input Force HDMI
  kind: action
  command: "SDHDMI"
  params: []

- id: sd_digital
  label: Set Digital Input Force Digital
  kind: action
  command: "SDDIGITAL"
  params: []

- id: sd_analog
  label: Set Digital Input Force Analog
  kind: action
  command: "SDANALOG"
  params: []

- id: sd_ext_in
  label: Set External Input Mode
  kind: action
  command: "SDEXT.IN"
  params: []

- id: sd_7_1in
  label: Set 7.1CH IN Mode
  kind: action
  command: "SD7.1IN"
  params: []

- id: sd_no
  label: Digital Input Off
  kind: action
  command: "SDNO"
  params: []

- id: sd_query
  label: Query Digital Input Status
  kind: query
  command: "SD?"
  params: []

# Digital Input Type (DC)
- id: dc_auto
  label: Set Digital Input Auto Mode
  kind: action
  command: "DCAUTO"
  params: []

- id: dc_pcm
  label: Set Digital Input Force PCM
  kind: action
  command: "DCPCM"
  params: []

- id: dc_dts
  label: Set Digital Input Force DTS
  kind: action
  command: "DCDTS"
  params: []

- id: dc_query
  label: Query Digital Input Type Status
  kind: query
  command: "DC?"
  params: []

# Video Select (SV)
- id: sv_dvd
  label: Video Select DVD
  kind: action
  command: "SVDVD"
  params: []

- id: sv_bd
  label: Video Select Blu-ray
  kind: action
  command: "SVBD"
  params: []

- id: sv_tv
  label: Video Select TV
  kind: action
  command: "SVTV"
  params: []

- id: sv_sat_cbl
  label: Video Select Satellite/Cable
  kind: action
  command: "SVSAT/CBL"
  params: []

- id: sv_mplay
  label: Video Select Media Player
  kind: action
  command: "SVMPLAY"
  params: []

- id: sv_game
  label: Video Select Game
  kind: action
  command: "SVGAME"
  params: []

- id: sv_aux1
  label: Video Select AUX1
  kind: action
  command: "SVAUX1"
  params: []

- id: sv_aux2
  label: Video Select AUX2
  kind: action
  command: "SVAUX2"
  params: []

- id: sv_aux3
  label: Video Select AUX3 (when Additional Source is set to On)
  kind: action
  command: "SVAUX3"
  params: []

- id: sv_aux4
  label: Video Select AUX4
  kind: action
  command: "SVAUX4"
  params: []

- id: sv_aux5
  label: Video Select AUX5
  kind: action
  command: "SVAUX5"
  params: []

- id: sv_aux6
  label: Video Select AUX6
  kind: action
  command: "SVAUX6"
  params: []

- id: sv_aux7
  label: Video Select AUX7
  kind: action
  command: "SVAUX7"
  params: []

- id: sv_cd
  label: Video Select CD
  kind: action
  command: "SVCD"
  params: []

- id: sv_source
  label: Video Select Cancel (Source)
  kind: action
  command: "SVSOURCE"
  params: []

- id: sv_on
  label: Video Select On
  kind: action
  command: "SVON"
  params: []

- id: sv_off
  label: Video Select Off
  kind: action
  command: "SVOFF"
  params: []

- id: sv_query
  label: Query Video Select Status
  kind: query
  command: "SV?"
  params: []

# Sleep Timer (SLP)
- id: slp_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []

- id: slp_set
  label: Set Sleep Timer
  kind: action
  command: "SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001 to 120 by ASCII, 010=10min"

- id: slp_query
  label: Query Sleep Timer Status
  kind: query
  command: "SLP?"
  params: []

# Auto Standby (STBY)
- id: stby_15m
  label: Auto Standby 15 Minutes
  kind: action
  command: "STBY15M"
  params: []

- id: stby_30m
  label: Auto Standby 30 Minutes
  kind: action
  command: "STBY30M"
  params: []

- id: stby_60m
  label: Auto Standby 60 Minutes
  kind: action
  command: "STBY60M"
  params: []

- id: stby_off
  label: Auto Standby Off
  kind: action
  command: "STBYOFF"
  params: []

- id: stby_query
  label: Query Auto Standby Status
  kind: query
  command: "STBY?"
  params: []

# ECO Mode (ECO)
- id: eco_on
  label: ECO Mode On
  kind: action
  command: "ECOON"
  params: []

- id: eco_auto
  label: ECO Mode Auto
  kind: action
  command: "ECOAUTO"
  params: []

- id: eco_off
  label: ECO Mode Off
  kind: action
  command: "ECOOFF"
  params: []

- id: eco_query
  label: Query ECO Mode Status
  kind: query
  command: "ECO?"
  params: []

# Surround Mode (MS)
- id: ms_movie
  label: Surround Mode Movie
  kind: action
  command: "MSMOVIE"
  params: []

- id: ms_music
  label: Surround Mode Music
  kind: action
  command: "MSMUSIC"
  params: []

- id: ms_game
  label: Surround Mode Game
  kind: action
  command: "MSGAME"
  params: []

- id: ms_direct
  label: Surround Mode Direct
  kind: action
  command: "MSDIRECT"
  params: []

- id: ms_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  command: "MSPURE DIRECT"
  params: []

- id: ms_stereo
  label: Surround Mode Stereo
  kind: action
  command: "MSSTEREO"
  params: []

- id: ms_auto
  label: Surround Mode Auto
  kind: action
  command: "MSAUTO"
  params: []

- id: ms_dolby_digital
  label: Surround Mode Dolby Digital
  kind: action
  command: "MSDOLBY DIGITAL"
  params: []

- id: ms_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  command: "MSDTS SURROUND"
  params: []

- id: ms_auro3d
  label: Surround Mode Auro-3D (Auro-3D Upgrade only)
  kind: action
  command: "MSAURO3D"
  params: []

- id: ms_auro2dsurr
  label: Surround Mode Auro-2D Surround
  kind: action
  command: "MSAURO2DSURR"
  params: []

- id: ms_mch_stereo
  label: Surround Mode Multi-Channel Stereo
  kind: action
  command: "MSMCH STEREO"
  params: []

- id: ms_wide_screen
  label: Surround Mode Wide Screen
  kind: action
  command: "MSWIDE SCREEN"
  params: []

- id: ms_super_stadium
  label: Surround Mode Super Stadium
  kind: action
  command: "MSSUPER STADIUM"
  params: []

- id: ms_rock_arena
  label: Surround Mode Rock Arena
  kind: action
  command: "MSROCK ARENA"
  params: []

- id: ms_jazz_club
  label: Surround Mode Jazz Club
  kind: action
  command: "MSJAZZ CLUB"
  params: []

- id: ms_classic_concert
  label: Surround Mode Classic Concert
  kind: action
  command: "MSCLASSIC CONCERT"
  params: []

- id: ms_mono_movie
  label: Surround Mode Mono Movie
  kind: action
  command: "MSMONO MOVIE"
  params: []

- id: ms_matrix
  label: Surround Mode Matrix
  kind: action
  command: "MSMATRIX"
  params: []

- id: ms_video_game
  label: Surround Mode Video Game
  kind: action
  command: "MSVIDEO GAME"
  params: []

- id: ms_virtual
  label: Surround Mode Virtual
  kind: action
  command: "MSVIRTUAL"
  params: []

- id: ms_left
  label: Surround Mode Left
  kind: action
  command: "MSLEFT"
  params: []

- id: ms_right
  label: Surround Mode Right
  kind: action
  command: "MSRIGHT"
  params: []

- id: ms_query
  label: Query Surround Mode Status
  kind: query
  command: "MS?"
  params: []

- id: ms_quick1
  label: Quick Select 1
  kind: action
  command: "MSQUICK1"
  params: []

- id: ms_quick2
  label: Quick Select 2
  kind: action
  command: "MSQUICK2"
  params: []

- id: ms_quick3
  label: Quick Select 3
  kind: action
  command: "MSQUICK3"
  params: []

- id: ms_quick4
  label: Quick Select 4
  kind: action
  command: "MSQUICK4"
  params: []

- id: ms_quick5
  label: Quick Select 5
  kind: action
  command: "MSQUICK5"
  params: []

- id: ms_quick1_memory
  label: Quick Select 1 Memory
  kind: action
  command: "MSQUICK1 MEMORY"
  params: []

- id: ms_quick2_memory
  label: Quick Select 2 Memory
  kind: action
  command: "MSQUICK2 MEMORY"
  params: []

- id: ms_quick3_memory
  label: Quick Select 3 Memory
  kind: action
  command: "MSQUICK3 MEMORY"
  params: []

- id: ms_quick4_memory
  label: Quick Select 4 Memory
  kind: action
  command: "MSQUICK4 MEMORY"
  params: []

- id: ms_quick5_memory
  label: Quick Select 5 Memory
  kind: action
  command: "MSQUICK5 MEMORY"
  params: []

- id: ms_quick_query
  label: Query Quick Select Status
  kind: query
  command: "MSQUICK ?"
  params: []

# Video Aspect (VS)
- id: vs_asp_nrm
  label: Aspect Ratio 4:3 Normal
  kind: action
  command: "VSASPNRM"
  params: []

- id: vs_asp_ful
  label: Aspect Ratio 16:9 Full
  kind: action
  command: "VSASPFUL"
  params: []

- id: vs_asp_query
  label: Query Aspect Ratio Status
  kind: query
  command: "VSASP ?"
  params: []

# HDMI Monitor (VSMONI)
- id: vsmoni_auto
  label: HDMI Monitor Auto Detection
  kind: action
  command: "VSMONIAUTO"
  params: []

- id: vsmoni1
  label: HDMI Monitor OUT-1
  kind: action
  command: "VSMONI1"
  params: []

- id: vsmoni2
  label: HDMI Monitor OUT-2
  kind: action
  command: "VSMONI2"
  params: []

- id: vsmoni_query
  label: Query HDMI Monitor Status
  kind: query
  command: "VSMONI ?"
  params: []

# Video Resolution (VSSC)
- id: vssc_48p
  label: Resolution 480p/576p
  kind: action
  command: "VSSC48P"
  params: []

- id: vssc_10i
  label: Resolution 1080i
  kind: action
  command: "VSSC10I"
  params: []

- id: vssc_72p
  label: Resolution 720p
  kind: action
  command: "VSSC72P"
  params: []

- id: vssc_10p
  label: Resolution 1080p
  kind: action
  command: "VSSC10P"
  params: []

- id: vssc_10p24
  label: Resolution 1080p 24Hz
  kind: action
  command: "VSSC10P24"
  params: []

- id: vssc_4k
  label: Resolution 4K
  kind: action
  command: "VSSC4K"
  params: []

- id: vssc_4kf
  label: Resolution 4K 60/50Hz
  kind: action
  command: "VSSC4KF"
  params: []

- id: vssc_auto
  label: Resolution Auto
  kind: action
  command: "VSSCAUTO"
  params: []

- id: vssc_query
  label: Query Resolution Status
  kind: query
  command: "VSSC ?"
  params: []

# HDMI Resolution (VSSCH)
- id: vssch_48p
  label: HDMI Resolution 480p/576p
  kind: action
  command: "VSSCH48P"
  params: []

- id: vssch_10i
  label: HDMI Resolution 1080i
  kind: action
  command: "VSSCH10I"
  params: []

- id: vssch_72p
  label: HDMI Resolution 720p
  kind: action
  command: "VSSCH72P"
  params: []

- id: vssch_10p
  label: HDMI Resolution 1080p
  kind: action
  command: "VSSCH10P"
  params: []

- id: vssch_10p24
  label: HDMI Resolution 1080p 24Hz
  kind: action
  command: "VSSCH10P24"
  params: []

- id: vssch_4k
  label: HDMI Resolution 4K
  kind: action
  command: "VSSCH4K"
  params: []

- id: vssch_4kf
  label: HDMI Resolution 4K 60/50Hz
  kind: action
  command: "VSSCH4KF"
  params: []

- id: vssch_auto
  label: HDMI Resolution Auto
  kind: action
  command: "VSSCHAUTO"
  params: []

- id: vssch_query
  label: Query HDMI Resolution Status
  kind: query
  command: "VSSCH ?"
  params: []

# HDMI Audio Output (VSAUDIO)
- id: vsaudio_amp
  label: HDMI Audio Output to AMP
  kind: action
  command: "VSAUDIO AMP"
  params: []

- id: vsaudio_tv
  label: HDMI Audio Output to TV
  kind: action
  command: "VSAUDIO TV"
  params: []

- id: vsaudio_query
  label: Query HDMI Audio Status
  kind: query
  command: "VSAUDIO ?"
  params: []

# Video Processing Mode (VSVPM)
- id: vsvpm_auto
  label: Video Processing Mode Auto
  kind: action
  command: "VSVPMAUTO"
  params: []

- id: vsvpm_game
  label: Video Processing Mode Game
  kind: action
  command: "VSVPMGAME"
  params: []

- id: vsvpm_movi
  label: Video Processing Mode Movie
  kind: action
  command: "VSVPMMOVI"
  params: []

- id: vsvpm_query
  label: Query Video Processing Mode Status
  kind: query
  command: "VSVPM ?"
  params: []

# Vertical Stretch (VSVST)
- id: vsvst_on
  label: Vertical Stretch On
  kind: action
  command: "VSVST ON"
  params: []

- id: vsvst_off
  label: Vertical Stretch Off
  kind: action
  command: "VSVST OFF"
  params: []

- id: vsvst_query
  label: Query Vertical Stretch Status
  kind: query
  command: "VSVST ?"
  params: []

# Parameter Settings (PS) - Tone Control
- id: ps_tone_ctrl_on
  label: Tone Control On
  kind: action
  command: "PSTONE CTRL ON"
  params: []

- id: ps_tone_ctrl_off
  label: Tone Control Off
  kind: action
  command: "PSTONE CTRL OFF"
  params: []

- id: ps_tone_ctrl_query
  label: Query Tone Control Status
  kind: query
  command: "PSTONE CTRL ?"
  params: []

- id: ps_bas_up
  label: Bass Up
  kind: action
  command: "PSBAS UP"
  params: []

- id: ps_bas_down
  label: Bass Down
  kind: action
  command: "PSBAS DOWN"
  params: []

- id: ps_bas_set
  label: Bass Set
  kind: action
  command: "PSBAS{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range -6 to +6 (44 to 56)"

- id: ps_bas_query
  label: Query Bass Status
  kind: query
  command: "PSBAS ?"
  params: []

- id: ps_tre_up
  label: Treble Up
  kind: action
  command: "PSTRE UP"
  params: []

- id: ps_tre_down
  label: Treble Down
  kind: action
  command: "PSTRE DOWN"
  params: []

- id: ps_tre_set
  label: Treble Set
  kind: action
  command: "PSTRE{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range -6 to +6 (44 to 56)"

- id: ps_tre_query
  label: Query Treble Status
  kind: query
  command: "PSTRE ?"
  params: []

# Dialog Level (PSDIL)
- id: psdil_on
  label: Dialog Level Adjust On
  kind: action
  command: "PSDIL ON"
  params: []

- id: psdil_off
  label: Dialog Level Adjust Off
  kind: action
  command: "PSDIL OFF"
  params: []

- id: psdil_up
  label: Dialog Level Up
  kind: action
  command: "PSDIL UP"
  params: []

- id: psdil_down
  label: Dialog Level Down
  kind: action
  command: "PSDIL DOWN"
  params: []

- id: psdil_set
  label: Dialog Level Set
  kind: action
  command: "PSDIL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: psdil_query
  label: Query Dialog Level Status
  kind: query
  command: "PSDIL ?"
  params: []

# Subwoofer Level (PSSWL)
- id: psswl_on
  label: Subwoofer Level Adjust On
  kind: action
  command: "PSSWL ON"
  params: []

- id: psswl_off
  label: Subwoofer Level Adjust Off
  kind: action
  command: "PSSWL OFF"
  params: []

- id: psswl_up
  label: Subwoofer Level Up
  kind: action
  command: "PSSWL UP"
  params: []

- id: psswl_down
  label: Subwoofer Level Down
  kind: action
  command: "PSSWL DOWN"
  params: []

- id: psswl_set
  label: Subwoofer Level Set
  kind: action
  command: "PSSWL{level}"
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB"

- id: psswl_query
  label: Query Subwoofer Level Status
  kind: query
  command: "PSSWL ?"
  params: []

# Subwoofer 2 Level (PSSWL2)
- id: psswl2_up
  label: Subwoofer 2 Level Up
  kind: action
  command: "PSSWL2 UP"
  params: []

- id: psswl2_down
  label: Subwoofer 2 Level Down
  kind: action
  command: "PSSWL2 DOWN"
  params: []

- id: psswl2_set
  label: Subwoofer 2 Level Set
  kind: action
  command: "PSSWL2{level}"
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB"

# Cinema EQ (PSCINEMA EQ.)
- id: pscinema_eq_on
  label: Cinema EQ On
  kind: action
  command: "PSCINEMA EQ.ON"
  params: []

- id: pscinema_eq_off
  label: Cinema EQ Off
  kind: action
  command: "PSCINEMA EQ.OFF"
  params: []

- id: pscinema_eq_query
  label: Query Cinema EQ Status
  kind: query
  command: "PSCINEMA EQ. ?"
  params: []

# Cinema/Music/Game Mode (PSMODE)
- id: ps_mode_music
  label: Cinema/Music/Game Mode Music
  kind: action
  command: "PSMODE:MUSIC"
  params: []

- id: ps_mode_cinema
  label: Cinema/Music/Game Mode Cinema
  kind: action
  command: "PSMODE:CINEMA"
  params: []

- id: ps_mode_game
  label: Cinema/Music/Game Mode Game
  kind: action
  command: "PSMODE:GAME"
  params: []

- id: ps_mode_pro_logic
  label: Cinema/Music/Game Mode Pro Logic
  kind: action
  command: "PSMODE:PRO LOGIC"
  params: []

- id: ps_mode_query
  label: Query Cinema/Music/Game Mode Status
  kind: query
  command: "PSMODE: ?"
  params: []

# Loudness Management (PSLOM)
- id: pslom_on
  label: Loudness Management On
  kind: action
  command: "PSLOM ON"
  params: []

- id: pslom_off
  label: Loudness Management Off
  kind: action
  command: "PSLOM OFF"
  params: []

- id: pslom_query
  label: Query Loudness Management Status
  kind: query
  command: "PSLOM ?"
  params: []

# Front Height Output (PSFH)
- id: psfh_on
  label: Front Height Output On
  kind: action
  command: "PSFH:ON"
  params: []

- id: psfh_off
  label: Front Height Output Off
  kind: action
  command: "PSFH:OFF"
  params: []

- id: psfh_query
  label: Query Front Height Output Status
  kind: query
  command: "PSFH: ?"
  params: []

# Speaker Output (PSSP)
- id: pssp_fw
  label: Speaker Output Front Height/Width/Back
  kind: action
  command: "PSSP:FW"
  params: []

- id: pssp_fh
  label: Speaker Output Front Height
  kind: action
  command: "PSSP:FH"
  params: []

- id: pssp_sb
  label: Speaker Output Surround Back
  kind: action
  command: "PSSP:SB"
  params: []

- id: pssp_hw
  label: Speaker Output Front Height and Wide
  kind: action
  command: "PSSP:HW"
  params: []

- id: pssp_bh
  label: Speaker Output Surround Back and Front Height
  kind: action
  command: "PSSP:BH"
  params: []

- id: pssp_bw
  label: Speaker Output Surround Back and Wide
  kind: action
  command: "PSSP:BW"
  params: []

- id: pssp_fl
  label: Speaker Output Floor
  kind: action
  command: "PSSP:FL"
  params: []

- id: pssp_hf
  label: Speaker Output Height and Floor
  kind: action
  command: "PSSP:HF"
  params: []

- id: pssp_fr
  label: Speaker Output Front
  kind: action
  command: "PSSP:FR"
  params: []

- id: pssp_query
  label: Query Speaker Output Status
  kind: query
  command: "PSSP: ?"
  params: []

# PL2z Height Gain (PSPHG)
- id: psphg_low
  label: PL2z Height Gain Low
  kind: action
  command: "PSPHG LOW"
  params: []

- id: psphg_mid
  label: PL2z Height Gain Mid
  kind: action
  command: "PSPHG MID"
  params: []

- id: psphg_hi
  label: PL2z Height Gain High
  kind: action
  command: "PSPHG HI"
  params: []

- id: psphg_query
  label: Query PL2z Height Gain Status
  kind: query
  command: "PSPHG ?"
  params: []

# MultEQ (PSMULTEQ)
- id: psmulteq_audyssey
  label: MultEQ Audyssey
  kind: action
  command: "PSMULTEQ:AUDYSSEY"
  params: []

- id: psmulteq_byp_lr
  label: MultEQ L/R Bypass
  kind: action
  command: "PSMULTEQ:BYP.LR"
  params: []

- id: psmulteq_flat
  label: MultEQ Flat
  kind: action
  command: "PSMULTEQ:FLAT"
  params: []

- id: psmulteq_manual
  label: MultEQ Manual
  kind: action
  command: "PSMULTEQ:MANUAL"
  params: []

- id: psmulteq_off
  label: MultEQ Off
  kind: action
  command: "PSMULTEQ:OFF"
  params: []

- id: psmulteq_query
  label: Query MultEQ Status
  kind: query
  command: "PSMULTEQ: ?"
  params: []

# Dynamic EQ (PSDYNEQ)
- id: psdyneq_on
  label: Dynamic EQ On
  kind: action
  command: "PSDYNEQ ON"
  params: []

- id: psdyneq_off
  label: Dynamic EQ Off
  kind: action
  command: "PSDYNEQ OFF"
  params: []

- id: psdyneq_query
  label: Query Dynamic EQ Status
  kind: query
  command: "PSDYNEQ ?"
  params: []

# Reference Level (PSREFLEV)
- id: psreflev_0
  label: Reference Level Offset 0dB
  kind: action
  command: "PSREFLEV 0"
  params: []

- id: psreflev_5
  label: Reference Level Offset 5dB
  kind: action
  command: "PSREFLEV 5"
  params: []

- id: psreflev_10
  label: Reference Level Offset 10dB
  kind: action
  command: "PSREFLEV 10"
  params: []

- id: psreflev_15
  label: Reference Level Offset 15dB
  kind: action
  command: "PSREFLEV 15"
  params: []

- id: psreflev_query
  label: Query Reference Level Status
  kind: query
  command: "PSREFLEV ?"
  params: []

# Dynamic Volume (PSDYNVOL)
- id: psdynvol_hev
  label: Dynamic Volume Heavy
  kind: action
  command: "PSDYNVOL HEV"
  params: []

- id: psdynvol_med
  label: Dynamic Volume Medium
  kind: action
  command: "PSDYNVOL MED"
  params: []

- id: psdynvol_lit
  label: Dynamic Volume Light
  kind: action
  command: "PSDYNVOL LIT"
  params: []

- id: psdynvol_off
  label: Dynamic Volume Off
  kind: action
  command: "PSDYNVOL OFF"
  params: []

- id: psdynvol_query
  label: Query Dynamic Volume Status
  kind: query
  command: "PSDYNVOL ?"
  params: []

# Audyssey LFC (PSLFC)
- id: pslfc_on
  label: Audyssey LFC On
  kind: action
  command: "PSLFC ON"
  params: []

- id: pslfc_off
  label: Audyssey LFC Off
  kind: action
  command: "PSLFC OFF"
  params: []

- id: pslfc_query
  label: Query Audyssey LFC Status
  kind: query
  command: "PSLFC ?"
  params: []

# Containment Amount (PSCNTAMT)
- id: pscntamt_up
  label: Containment Amount Up
  kind: action
  command: "PSCNTAMT UP"
  params: []

- id: pscntamt_down
  label: Containment Amount Down
  kind: action
  command: "PSCNTAMT DOWN"
  params: []

- id: pscntamt_set
  label: Containment Amount Set
  kind: action
  command: "PSCNTAMT{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII; AVR range 1-7 (01 to 07)"

- id: pscntamt_query
  label: Query Containment Amount Status
  kind: query
  command: "PSCNTAMT ?"
  params: []

# Audyssey DSX (PSDSX)
- id: psdsx_onhw
  label: Audyssey DSX On Height and Wide
  kind: action
  command: "PSDSX ONHW"
  params: []

- id: psdsx_onh
  label: Audyssey DSX On Height
  kind: action
  command: "PSDSX ONH"
  params: []

- id: psdsx_onw
  label: Audyssey DSX On Wide
  kind: action
  command: "PSDSX ONW"
  params: []

- id: psdsx_off
  label: Audyssey DSX Off
  kind: action
  command: "PSDSX OFF"
  params: []

- id: psdsx_query
  label: Query Audyssey DSX Status
  kind: query
  command: "PSDSX ?"
  params: []

# Stage Width (PSSTW)
- id: psstw_up
  label: Stage Width Up
  kind: action
  command: "PSSTW UP"
  params: []

- id: psstw_down
  label: Stage Width Down
  kind: action
  command: "PSSTW DOWN"
  params: []

- id: psstw_set
  label: Stage Width Set
  kind: action
  command: "PSSTW{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range -10 to +10 (40 to 60)"

- id: psstw_query
  label: Query Stage Width Status
  kind: query
  command: "PSSTW ?"
  params: []

# Stage Height (PSSTH)
- id: pssth_up
  label: Stage Height Up
  kind: action
  command: "PSSTH UP"
  params: []

- id: pssth_down
  label: Stage Height Down
  kind: action
  command: "PSSTH DOWN"
  params: []

- id: pssth_set
  label: Stage Height Set
  kind: action
  command: "PSSTH{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range -10 to +10 (40 to 60)"

- id: pssth_query
  label: Query Stage Height Status
  kind: query
  command: "PSSTH ?"
  params: []

# Graphic EQ (PSGEQ)
- id: psgeq_on
  label: Graphic EQ On
  kind: action
  command: "PSGEQ ON"
  params: []

- id: psgeq_off
  label: Graphic EQ Off
  kind: action
  command: "PSGEQ OFF"
  params: []

- id: psgeq_query
  label: Query Graphic EQ Status
  kind: query
  command: "PSGEQ ?"
  params: []

# Dynamic Compression (PSDRC)
- id: psdrc_auto
  label: Dynamic Compression Auto
  kind: action
  command: "PSDRC AUTO"
  params: []

- id: psdrc_low
  label: Dynamic Compression Low
  kind: action
  command: "PSDRC LOW"
  params: []

- id: psdrc_mid
  label: Dynamic Compression Mid
  kind: action
  command: "PSDRC MID"
  params: []

- id: psdrc_hi
  label: Dynamic Compression High
  kind: action
  command: "PSDRC HI"
  params: []

- id: psdrc_off
  label: Dynamic Compression Off
  kind: action
  command: "PSDRC OFF"
  params: []

- id: psdrc_query
  label: Query Dynamic Compression Status
  kind: query
  command: "PSDRC ?"
  params: []

# Bass Sync (PSBSC)
- id: psbsc_up
  label: Bass Sync Up
  kind: action
  command: "PSBSC UP"
  params: []

- id: psbsc_down
  label: Bass Sync Down
  kind: action
  command: "PSBSC DOWN"
  params: []

- id: psbsc_set
  label: Bass Sync Set
  kind: action
  command: "PSBSC{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0; AVR range 0-16"

- id: psbsc_query
  label: Query Bass Sync Status
  kind: query
  command: "PSBSC ?"
  params: []

# Dialogue Enhancer (PSDEH)
- id: psdeh_off
  label: Dialogue Enhancer Off
  kind: action
  command: "PSDEH OFF"
  params: []

- id: psdeh_low
  label: Dialogue Enhancer Low
  kind: action
  command: "PSDEH LOW"
  params: []

- id: psdeh_med
  label: Dialogue Enhancer Medium
  kind: action
  command: "PSDEH MED"
  params: []

- id: psdeh_high
  label: Dialogue Enhancer High
  kind: action
  command: "PSDEH HIGH"
  params: []

- id: psdeh_query
  label: Query Dialogue Enhancer Status
  kind: query
  command: "PSDEH ?"
  params: []

# LFE (PSLFE)
- id: pslfe_up
  label: LFE Up
  kind: action
  command: "PSLFE UP"
  params: []

- id: pslfe_down
  label: LFE Down
  kind: action
  command: "PSLFE DOWN"
  params: []

- id: pslfe_set
  label: LFE Set
  kind: action
  command: "PSLFE{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB; AVR range 0 to -10 (10=-10dB)"

- id: pslfe_query
  label: Query LFE Status
  kind: query
  command: "PSLFE ?"
  params: []

# LFE Level (PSLFL)
- id: pslfl_00
  label: LFE Level 0dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 00"
  params: []

- id: pslfl_05
  label: LFE Level 5dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 05"
  params: []

- id: pslfl_10
  label: LFE Level 10dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 10"
  params: []

- id: pslfl_15
  label: LFE Level 15dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 15"
  params: []

- id: pslfl_query
  label: Query LFE Level Status
  kind: query
  command: "PSLFL ?"
  params: []

# Effect (PSEFF)
- id: pseff_on
  label: Effect On
  kind: action
  command: "PSEFF ON"
  params: []

- id: pseff_off
  label: Effect Off
  kind: action
  command: "PSEFF OFF"
  params: []

- id: pseff_up
  label: Effect Level Up
  kind: action
  command: "PSEFF UP"
  params: []

- id: pseff_down
  label: Effect Level Down
  kind: action
  command: "PSEFF DOWN"
  params: []

- id: pseff_set
  label: Effect Level Set
  kind: action
  command: "PSEFF{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB; AVR range 1-15"

- id: pseff_query
  label: Query Effect Status
  kind: query
  command: "PSEFF ?"
  params: []

# Delay (PSDEL)
- id: psdel_up
  label: Delay Up
  kind: action
  command: "PSDEL UP"
  params: []

- id: psdel_down
  label: Delay Down
  kind: action
  command: "PSDEL DOWN"
  params: []

- id: psdel_set
  label: Delay Set
  kind: action
  command: "PSDEL{ms}"
  params:
    - name: ms
      type: string
      description: "000-999 ASCII, 000=0ms; AVR range 0-300ms, 0-60ms: 3ms/step, over 60ms: 10ms/step"

- id: psdel_query
  label: Query Delay Status
  kind: query
  command: "PSDEL ?"
  params: []

# Panorama (PSPAN)
- id: pspan_on
  label: Panorama On
  kind: action
  command: "PSPAN ON"
  params: []

- id: pspan_off
  label: Panorama Off
  kind: action
  command: "PSPAN OFF"
  params: []

- id: pspan_query
  label: Query Panorama Status
  kind: query
  command: "PSPAN ?"
  params: []

# Dimension (PSDIM)
- id: psdim_up
  label: Dimension Up
  kind: action
  command: "PSDIM UP"
  params: []

- id: psdim_down
  label: Dimension Down
  kind: action
  command: "PSDIM DOWN"
  params: []

- id: psdim_set
  label: Dimension Set
  kind: action
  command: "PSDIM{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0; AVR range 0-6"

- id: psdim_query
  label: Query Dimension Status
  kind: query
  command: "PSDIM ?"
  params: []

# Center Width (PSCEN)
- id: pscen_up
  label: Center Width Up
  kind: action
  command: "PSCEN UP"
  params: []

- id: pscen_down
  label: Center Width Down
  kind: action
  command: "PSCEN DOWN"
  params: []

- id: pscen_set
  label: Center Width Set
  kind: action
  command: "PSCEN{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0; AVR range 0-7"

- id: pscen_query
  label: Query Center Width Status
  kind: query
  command: "PSCEN ?"
  params: []

# Center Image (PSCEI)
- id: pscei_up
  label: Center Image Up
  kind: action
  command: "PSCEI UP"
  params: []

- id: pscei_down
  label: Center Image Down
  kind: action
  command: "PSCEI DOWN"
  params: []

- id: pscei_set
  label: Center Image Set
  kind: action
  command: "PSCEI{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0.0; AVR range 0.0-1.0"

- id: pscei_query
  label: Query Center Image Status
  kind: query
  command: "PSCEI ?"
  params: []

# Center Gain (PSCEG)
- id: psceg_up
  label: Center Gain Up
  kind: action
  command: "PSCEG UP"
  params: []

- id: psceg_down
  label: Center Gain Down
  kind: action
  command: "PSCEG DOWN"
  params: []

- id: psceg_set
  label: Center Gain Set
  kind: action
  command: "PSCEG{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0.0; AVR range 0.0-1.0"

- id: psceg_query
  label: Query Center Gain Status
  kind: query
  command: "PSCEG ?"
  params: []

# Center Spread (PSCES)
- id: psces_on
  label: Center Spread On
  kind: action
  command: "PSCES ON"
  params: []

- id: psces_off
  label: Center Spread Off
  kind: action
  command: "PSCES OFF"
  params: []

- id: psces_query
  label: Query Center Spread Status
  kind: query
  command: "PSCES ?"
  params: []

# Subwoofer Mode (PSSWR)
- id: psswr_on
  label: Subwoofer Mode On
  kind: action
  command: "PSSWR ON"
  params: []

- id: psswr_off
  label: Subwoofer Mode Off
  kind: action
  command: "PSSWR OFF"
  params: []

- id: psswr_query
  label: Query Subwoofer Mode Status
  kind: query
  command: "PSSWR ?"
  params: []

# Room Size (PSRSZ)
- id: psrsz_s
  label: Room Size Small
  kind: action
  command: "PSRSZ S"
  params: []

- id: psrsz_ms
  label: Room Size Medium Small
  kind: action
  command: "PSRSZ MS"
  params: []

- id: psrsz_m
  label: Room Size Medium
  kind: action
  command: "PSRSZ M"
  params: []

- id: psrsz_ml
  label: Room Size Medium Large
  kind: action
  command: "PSRSZ ML"
  params: []

- id: psrsz_l
  label: Room Size Large
  kind: action
  command: "PSRSZ L"
  params: []

- id: psrsz_query
  label: Query Room Size Status
  kind: query
  command: "PSRSZ ?"
  params: []

# Audio Delay (PSDELAY)
- id: psdelay_up
  label: Audio Delay Up
  kind: action
  command: "PSDELAY UP"
  params: []

- id: psdelay_down
  label: Audio Delay Down
  kind: action
  command: "PSDELAY DOWN"
  params: []

- id: psdelay_set
  label: Audio Delay Set
  kind: action
  command: "PSDELAY{ms}"
  params:
    - name: ms
      type: string
      description: "000-999 ASCII, 000=0ms, 200=200ms; AVR range 0-200ms"

- id: psdelay_query
  label: Query Audio Delay Status
  kind: query
  command: "PSDELAY ?"
  params: []

# Audio Restorer (PSRSTR)
- id: psrstr_off
  label: Audio Restorer Off
  kind: action
  command: "PSRSTR OFF"
  params: []

- id: psrstr_low
  label: Audio Restorer Low (Mode 3)
  kind: action
  command: "PSRSTR LOW"
  params: []

- id: psrstr_med
  label: Audio Restorer Medium (Mode 2)
  kind: action
  command: "PSRSTR MED"
  params: []

- id: psrstr_hi
  label: Audio Restorer High (Mode 1)
  kind: action
  command: "PSRSTR HI"
  params: []

- id: psrstr_query
  label: Query Audio Restorer Status
  kind: query
  command: "PSRSTR ?"
  params: []

# Front Speaker (PSFRONT)
- id: psfront_spa
  label: Front Speaker A
  kind: action
  command: "PSFRONT SPA"
  params: []

- id: psfront_spb
  label: Front Speaker B
  kind: action
  command: "PSFRONT SPB"
  params: []

- id: psfront_apb
  label: Front Speaker A+B
  kind: action
  command: "PSFRONT A+B"
  params: []

- id: psfront_query
  label: Query Front Speaker Status
  kind: query
  command: "PSFRONT?"
  params: []

# Auro-Matic Preset (PSAUROPR)
- id: psauropr_sma
  label: Auro-Matic 3D Preset Small (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROPR SMA"
  params: []

- id: psauropr_med
  label: Auro-Matic 3D Preset Medium (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROPR MED"
  params: []

- id: psauropr_lar
  label: Auro-Matic 3D Preset Large (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROPR LAR"
  params: []

- id: psauropr_spe
  label: Auro-Matic 3D Preset Speaker (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROPR SPE"
  params: []

- id: psauropr_query
  label: Query Auro-Matic 3D Preset Status
  kind: query
  command: "PSAUROPR ?"
  params: []

# Auro-Matic Strength (PSAUROST)
- id: psaurost_up
  label: Auro-Matic 3D Strength Up (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROST UP"
  params: []

- id: psaurost_down
  label: Auro-Matic 3D Strength Down (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROST DOWN"
  params: []

- id: psaurost_set
  label: Auro-Matic 3D Strength Set (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROST{level}"
  params:
    - name: level
      type: string
      description: "01-16 ASCII"

- id: psaurost_query
  label: Query Auro-Matic 3D Strength Status
  kind: query
  command: "PSAUROST ?"
  params: []

# Picture Mode (PV)
- id: pv_off
  label: Picture Mode Off
  kind: action
  command: "PVOFF"
  params: []

- id: pv_std
  label: Picture Mode Standard
  kind: action
  command: "PVSTD"
  params: []

- id: pv_mov
  label: Picture Mode Movie
  kind: action
  command: "PVMOV"
  params: []

- id: pv_vvd
  label: Picture Mode Vivid
  kind: action
  command: "PVVVD"
  params: []

- id: pv_stm
  label: Picture Mode Stream
  kind: action
  command: "PVSTM"
  params: []

- id: pv_ctm
  label: Picture Mode Custom
  kind: action
  command: "PVCTM"
  params: []

- id: pv_day
  label: Picture Mode ISF Day
  kind: action
  command: "PVDAY"
  params: []

- id: pv_ngt
  label: Picture Mode ISF Night
  kind: action
  command: "PVNGT"
  params: []

- id: pv_query
  label: Query Picture Mode Status
  kind: query
  command: "PV?"
  params: []

# Picture Contrast (PVCN)
- id: pvcn_up
  label: Contrast Up
  kind: action
  command: "PVCN UP"
  params: []

- id: pvcn_down
  label: Contrast Down
  kind: action
  command: "PVCN DOWN"
  params: []

- id: pvcn_set
  label: Contrast Set
  kind: action
  command: "PVCN{level}"
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0; AVR range -50 to +50 (000-100)"

- id: pvcn_query
  label: Query Contrast Status
  kind: query
  command: "PVCN ?"
  params: []

# Picture Brightness (PVBR)
- id: pvbr_up
  label: Brightness Up
  kind: action
  command: "PVBR UP"
  params: []

- id: pvbr_down
  label: Brightness Down
  kind: action
  command: "PVBR DOWN"
  params: []

- id: pvbr_set
  label: Brightness Set
  kind: action
  command: "PVBR{level}"
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0; AVR range -50 to +50 (000-100)"

- id: pvbr_query
  label: Query Brightness Status
  kind: query
  command: "PVBR ?"
  params: []

# Picture Saturation (PVST)
- id: pvst_up
  label: Saturation Up
  kind: action
  command: "PVST UP"
  params: []

- id: pvst_down
  label: Saturation Down
  kind: action
  command: "PVST DOWN"
  params: []

- id: pvst_set
  label: Saturation Set
  kind: action
  command: "PVST{level}"
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0; AVR range -50 to +50 (000-100)"

- id: pvst_query
  label: Query Saturation Status
  kind: query
  command: "PVST ?"
  params: []

# Picture Hue (PVHUE)
- id: pvhue_up
  label: Hue Up
  kind: action
  command: "PVHUE UP"
  params: []

- id: pvhue_down
  label: Hue Down
  kind: action
  command: "PVHUE DOWN"
  params: []

- id: pvhue_set
  label: Hue Set
  kind: action
  command: "PVHUE{level}"
  params:
    - name: level
      type: string
      description: "44-56 ASCII, 50=0; AVR range -6 to +6 (44-56)"

- id: pvhue_query
  label: Query Hue Status
  kind: query
  command: "PVHUE ?"
  params: []

# DNR (PVDNR)
- id: pvdnr_off
  label: DNR Off
  kind: action
  command: "PVDNR OFF"
  params: []

- id: pvdnr_low
  label: DNR Low
  kind: action
  command: "PVDNR LOW"
  params: []

- id: pvdnr_mid
  label: DNR Mid
  kind: action
  command: "PVDNR MID"
  params: []

- id: pvdnr_hi
  label: DNR High
  kind: action
  command: "PVDNR HI"
  params: []

- id: pvdnr_query
  label: Query DNR Status
  kind: query
  command: "PVDNR ?"
  params: []

# Enhancer (PVENH)
- id: pvenh_up
  label: Enhancer Up
  kind: action
  command: "PVENH UP"
  params: []

- id: pvenh_down
  label: Enhancer Down
  kind: action
  command: "PVENH DOWN"
  params: []

- id: pvenh_set
  label: Enhancer Set
  kind: action
  command: "PVENH{level}"
  params:
    - name: level
      type: string
      description: "00-12 ASCII, 00=0; AVR range 0-12"

- id: pvenh_query
  label: Query Enhancer Status
  kind: query
  command: "PVENH ?"
  params: []

# Zone2 Control (Z2)
- id: z2_source
  label: Zone2 Source (cancel, same as Main Zone)
  kind: action
  command: "Z2SOURCE"
  params: []

- id: z2_phono
  label: Zone2 Select Input Phono
  kind: action
  command: "Z2PHONO"
  params: []

- id: z2_cd
  label: Zone2 Select Input CD
  kind: action
  command: "Z2CD"
  params: []

- id: z2_tuner
  label: Zone2 Select Input Tuner
  kind: action
  command: "Z2TUNER"
  params: []

- id: z2_dvd
  label: Zone2 Select Input DVD/Blu-ray
  kind: action
  command: "Z2DVD"
  params: []

- id: z2_bd
  label: Zone2 Select Input Blu-ray
  kind: action
  command: "Z2BD"
  params: []

- id: z2_tv
  label: Zone2 Select Input TV Audio
  kind: action
  command: "Z2TV"
  params: []

- id: z2_sat_cbl
  label: Zone2 Select Input Satellite/Cable
  kind: action
  command: "Z2SAT/CBL"
  params: []

- id: z2_mplay
  label: Zone2 Select Input Media Player (North America only)
  kind: action
  command: "Z2MPLAY"
  params: []

- id: z2_game
  label: Zone2 Select Input Game
  kind: action
  command: "Z2GAME"
  params: []

- id: z2_hdradio
  label: Zone2 Select Input HD Radio
  kind: action
  command: "Z2HDRADIO"
  params: []

- id: z2_net
  label: Zone2 Select Input Network/Online Music
  kind: action
  command: "Z2NET"
  params: []

- id: z2_pandora
  label: Zone2 Select Input Pandora (North America only)
  kind: action
  command: "Z2PANDORA"
  params: []

- id: z2_siriusxm
  label: Zone2 Select Input SiriusXM
  kind: action
  command: "Z2SIRIUSXM"
  params: []

- id: z2_spotify
  label: Zone2 Select Input Spotify (North America and Europe only)
  kind: action
  command: "Z2SPOTIFY"
  params: []

- id: z2_lastfm
  label: Zone2 Select Input LastFM
  kind: action
  command: "Z2LASTFM"
  params: []

- id: z2_flickr
  label: Zone2 Select Input Flickr
  kind: action
  command: "Z2FLICKR"
  params: []

- id: z2_iradio
  label: Zone2 Select Input Internet Radio
  kind: action
  command: "Z2IRADIO"
  params: []

- id: z2_server
  label: Zone2 Select Input Media Server
  kind: action
  command: "Z2SERVER"
  params: []

- id: z2_favorites
  label: Zone2 Select Input Favorites
  kind: action
  command: "Z2FAVORITES"
  params: []

- id: z2_aux1
  label: Zone2 Select Input AUX1
  kind: action
  command: "Z2AUX1"
  params: []

- id: z2_aux2
  label: Zone2 Select Input AUX2
  kind: action
  command: "Z2AUX2"
  params: []

- id: z2_aux3
  label: Zone2 Select Input AUX3 (when Additional Source is set to On)
  kind: action
  command: "Z2AUX3"
  params: []

- id: z2_aux4
  label: Zone2 Select Input AUX4
  kind: action
  command: "Z2AUX4"
  params: []

- id: z2_aux5
  label: Zone2 Select Input AUX5
  kind: action
  command: "Z2AUX5"
  params: []

- id: z2_aux6
  label: Zone2 Select Input AUX6
  kind: action
  command: "Z2AUX6"
  params: []

- id: z2_aux7
  label: Zone2 Select Input AUX7
  kind: action
  command: "Z2AUX7"
  params: []

- id: z2_bt
  label: Zone2 Select Input Bluetooth
  kind: action
  command: "Z2BT"
  params: []

- id: z2_usb_ipod
  label: Zone2 Select Input USB/iPod
  kind: action
  command: "Z2USB/IPOD"
  params: []

- id: z2_usb
  label: Zone2 Select Input USB and USB Start Playback
  kind: action
  command: "Z2USB"
  params: []

- id: z2_ipd
  label: Zone2 Select Input USB and iPod DIRECT Start Playback
  kind: action
  command: "Z2IPD"
  params: []

- id: z2_irp
  label: Zone2 Select Input NET/USB and iRadio Recent Play
  kind: action
  command: "Z2IRP"
  params: []

- id: z2_fvp
  label: Zone2 Select Input NET/USB and Favorites Play
  kind: action
  command: "Z2FVP"
  params: []

- id: z2_volume_up
  label: Zone2 Volume Up
  kind: action
  command: "Z2UP"
  params: []

- id: z2_volume_down
  label: Zone2 Volume Down
  kind: action
  command: "Z2DOWN"
  params: []

- id: z2_volume_set
  label: Zone2 Volume Set
  kind: action
  command: "Z2{level}"
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=minimum"

- id: z2_on
  label: Zone2 On
  kind: action
  command: "Z2ON"
  params: []

- id: z2_off
  label: Zone2 Off
  kind: action
  command: "Z2OFF"
  params: []

- id: z2_query
  label: Query Zone2 Status
  kind: query
  command: "Z2?"
  params: []

- id: z2_quick1
  label: Zone2 Quick Select 1
  kind: action
  command: "Z2QUICK1"
  params: []

- id: z2_quick2
  label: Zone2 Quick Select 2
  kind: action
  command: "Z2QUICK2"
  params: []

- id: z2_quick3
  label: Zone2 Quick Select 3
  kind: action
  command: "Z2QUICK3"
  params: []

- id: z2_quick4
  label: Zone2 Quick Select 4
  kind: action
  command: "Z2QUICK4"
  params: []

- id: z2_quick5
  label: Zone2 Quick Select 5
  kind: action
  command: "Z2QUICK5"
  params: []

- id: z2_quick1_memory
  label: Zone2 Quick Select 1 Memory
  kind: action
  command: "Z2QUICK1 MEMORY"
  params: []

- id: z2_quick2_memory
  label: Zone2 Quick Select 2 Memory
  kind: action
  command: "Z2QUICK2 MEMORY"
  params: []

- id: z2_quick3_memory
  label: Zone2 Quick Select 3 Memory
  kind: action
  command: "Z2QUICK3 MEMORY"
  params: []

- id: z2_quick4_memory
  label: Zone2 Quick Select 4 Memory
  kind: action
  command: "Z2QUICK4 MEMORY"
  params: []

- id: z2_quick5_memory
  label: Zone2 Quick Select 5 Memory
  kind: action
  command: "Z2QUICK5 MEMORY"
  params: []

- id: z2_quick_query
  label: Query Zone2 Quick Select Status
  kind: query
  command: "Z2QUICK ?"
  params: []

- id: z2_favorite1
  label: Zone2 Favorite 1
  kind: action
  command: "Z2FAVORITE1"
  params: []

- id: z2_favorite2
  label: Zone2 Favorite 2
  kind: action
  command: "Z2FAVORITE2"
  params: []

- id: z2_favorite3
  label: Zone2 Favorite 3
  kind: action
  command: "Z2FAVORITE3"
  params: []

- id: z2_favorite4
  label: Zone2 Favorite 4
  kind: action
  command: "Z2FAVORITE4"
  params: []

- id: z2_favorite1_memory
  label: Zone2 Favorite 1 Memory
  kind: action
  command: "Z2FAVORITE1 MEMORY"
  params: []

- id: z2_favorite2_memory
  label: Zone2 Favorite 2 Memory
  kind: action
  command: "Z2FAVORITE2 MEMORY"
  params: []

- id: z2_favorite3_memory
  label: Zone2 Favorite 3 Memory
  kind: action
  command: "Z2FAVORITE3 MEMORY"
  params: []

- id: z2_favorite4_memory
  label: Zone2 Favorite 4 Memory
  kind: action
  command: "Z2FAVORITE4 MEMORY"
  params: []

# Zone2 Mute (Z2MU)
- id: z2mu_on
  label: Zone2 Mute On
  kind: action
  command: "Z2MUON"
  params: []

- id: z2mu_off
  label: Zone2 Mute Off
  kind: action
  command: "Z2MUOFF"
  params: []

- id: z2mu_query
  label: Query Zone2 Mute Status
  kind: query
  command: "Z2MU?"
  params: []

# Zone2 Channel Setting (Z2CS)
- id: z2cs_st
  label: Zone2 Channel Stereo
  kind: action
  command: "Z2CSST"
  params: []

- id: z2cs_mono
  label: Zone2 Channel Mono
  kind: action
  command: "Z2CSMONO"
  params: []

- id: z2cs_query
  label: Query Zone2 Channel Status
  kind: query
  command: "Z2CS?"
  params: []

# Zone2 Channel Volume (Z2CV)
- id: z2cvfl_up
  label: Zone2 Front Left Volume Up
  kind: action
  command: "Z2CVFL UP"
  params: []

- id: z2cvfl_down
  label: Zone2 Front Left Volume Down
  kind: action
  command: "Z2CVFL DOWN"
  params: []

- id: z2cvfl_set
  label: Zone2 Front Left Volume Set
  kind: action
  command: "Z2CVFL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: z2cvfr_up
  label: Zone2 Front Right Volume Up
  kind: action
  command: "Z2CVFR UP"
  params: []

- id: z2cvfr_down
  label: Zone2 Front Right Volume Down
  kind: action
  command: "Z2CVFR DOWN"
  params: []

- id: z2cvfr_set
  label: Zone2 Front Right Volume Set
  kind: action
  command: "Z2CVFR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: z2cv_query
  label: Query Zone2 Channel Volume Status
  kind: query
  command: "Z2CV?"
  params: []

# Zone2 HPF (Z2HPF)
- id: z2hpf_on
  label: Zone2 HPF On
  kind: action
  command: "Z2HPFON"
  params: []

- id: z2hpf_off
  label: Zone2 HPF Off
  kind: action
  command: "Z2HPFOFF"
  params: []

- id: z2hpf_query
  label: Query Zone2 HPF Status
  kind: query
  command: "Z2HPF?"
  params: []

# Zone2 Bass/Treble (Z2PS)
- id: z2ps_bas_up
  label: Zone2 Bass Up
  kind: action
  command: "Z2PSBAS UP"
  params: []

- id: z2ps_bas_down
  label: Zone2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN"
  params: []

- id: z2ps_bas_set
  label: Zone2 Bass Set
  kind: action
  command: "Z2PSBAS{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII; range -10 to +10 (40-60) or -14 to +14 for X4100 (36-64)"

- id: z2ps_bas_query
  label: Query Zone2 Bass Status
  kind: query
  command: "Z2PSBAS ?"
  params: []

- id: z2ps_tre_up
  label: Zone2 Treble Up
  kind: action
  command: "Z2PSTRE UP"
  params: []

- id: z2ps_tre_down
  label: Zone2 Treble Down
  kind: action
  command: "Z2PSTRE DOWN"
  params: []

- id: z2ps_tre_set
  label: Zone2 Treble Set
  kind: action
  command: "Z2PSTRE{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII; range -10 to +10 (40-60) or -14 to +14 for X4100 (36-64)"

- id: z2ps_tre_query
  label: Query Zone2 Treble Status
  kind: query
  command: "Z2PSTRE ?"
  params: []

# Zone2 HDMI Audio (Z2HDA)
- id: z2hda_thr
  label: Zone2 HDMI Audio Through
  kind: action
  command: "Z2HDA THR"
  params: []

- id: z2hda_pcm
  label: Zone2 HDMI Audio PCM
  kind: action
  command: "Z2HDA PCM"
  params: []

- id: z2hda_query
  label: Query Zone2 HDMI Audio Status
  kind: query
  command: "Z2HDA?"
  params: []

# Zone2 Sleep Timer (Z2SLP)
- id: z2slp_off
  label: Zone2 Sleep Timer Off
  kind: action
  command: "Z2SLPOFF"
  params: []

- id: z2slp_set
  label: Zone2 Sleep Timer Set
  kind: action
  command: "Z2SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001 to 120 by ASCII, 010=10min"

- id: z2slp_query
  label: Query Zone2 Sleep Timer Status
  kind: query
  command: "Z2SLP?"
  params: []

# Zone2 Auto Standby (Z2STBY)
- id: z2stby_2h
  label: Zone2 Auto Standby 2 Hours
  kind: action
  command: "Z2STBY2H"
  params: []

- id: z2stby_4h
  label: Zone2 Auto Standby 4 Hours
  kind: action
  command: "Z2STBY4H"
  params: []

- id: z2stby_8h
  label: Zone2 Auto Standby 8 Hours
  kind: action
  command: "Z2STBY8H"
  params: []

- id: z2stby_off
  label: Zone2 Auto Standby Off
  kind: action
  command: "Z2STBYOFF"
  params: []

- id: z2stby_query
  label: Query Zone2 Auto Standby Status
  kind: query
  command: "Z2STBY?"
  params: []

# Zone3 Control (Z3)
- id: z3_source
  label: Zone3 Source (cancel, same as Main Zone)
  kind: action
  command: "Z3SOURCE"
  params: []

- id: z3_phono
  label: Zone3 Select Input Phono
  kind: action
  command: "Z3PHONO"
  params: []

- id: z3_cd
  label: Zone3 Select Input CD
  kind: action
  command: "Z3CD"
  params: []

- id: z3_tuner
  label: Zone3 Select Input Tuner
  kind: action
  command: "Z3TUNER"
  params: []

- id: z3_dvd
  label: Zone3 Select Input DVD/Blu-ray
  kind: action
  command: "Z3DVD"
  params: []

- id: z3_bd
  label: Zone3 Select Input Blu-ray
  kind: action
  command: "Z3BD"
  params: []

- id: z3_tv
  label: Zone3 Select Input TV Audio
  kind: action
  command: "Z3TV"
  params: []

- id: z3_sat_cbl
  label: Zone3 Select Input Satellite/Cable
  kind: action
  command: "Z3SAT/CBL"
  params: []

- id: z3_mplay
  label: Zone3 Select Input Media Player
  kind: action
  command: "Z3MPLAY"
  params: []

- id: z3_game
  label: Zone3 Select Input Game
  kind: action
  command: "Z3GAME"
  params: []

- id: z3_hdradio
  label: Zone3 Select Input HD Radio (North America only)
  kind: action
  command: "Z3HDRADIO"
  params: []

- id: z3_net
  label: Zone3 Select Input Network/Online Music
  kind: action
  command: "Z3NET"
  params: []

- id: z3_pandora
  label: Zone3 Select Input Pandora (North America only)
  kind: action
  command: "Z3PANDORA"
  params: []

- id: z3_siriusxm
  label: Zone3 Select Input SiriusXM (North America only)
  kind: action
  command: "Z3SIRIUSXM"
  params: []

- id: z3_spotify
  label: Zone3 Select Input Spotify (North America and Europe only)
  kind: action
  command: "Z3SPOTIFY"
  params: []

- id: z3_lastfm
  label: Zone3 Select Input LastFM
  kind: action
  command: "Z3LASTFM"
  params: []

- id: z3_flickr
  label: Zone3 Select Input Flickr
  kind: action
  command: "Z3FLICKR"
  params: []

- id: z3_iradio
  label: Zone3 Select Input Internet Radio
  kind: action
  command: "Z3IRADIO"
  params: []

- id: z3_server
  label: Zone3 Select Input Media Server
  kind: action
  command: "Z3SERVER"
  params: []

- id: z3_favorites
  label: Zone3 Select Input Favorites
  kind: action
  command: "Z3FAVORITES"
  params: []

- id: z3_aux1
  label: Zone3 Select Input AUX1
  kind: action
  command: "Z3AUX1"
  params: []

- id: z3_aux2
  label: Zone3 Select Input AUX2
  kind: action
  command: "Z3AUX2"
  params: []

- id: z3_aux3
  label: Zone3 Select Input AUX3 (when Additional Source is set to On)
  kind: action
  command: "Z3AUX3"
  params: []

- id: z3_aux4
  label: Zone3 Select Input AUX4
  kind: action
  command: "Z3AUX4"
  params: []

- id: z3_aux5
  label: Zone3 Select Input AUX5
  kind: action
  command: "Z3AUX5"
  params: []

- id: z3_aux6
  label: Zone3 Select Input AUX6
  kind: action
  command: "Z3AUX6"
  params: []

- id: z3_aux7
  label: Zone3 Select Input AUX7
  kind: action
  command: "Z3AUX7"
  params: []

- id: z3_bt
  label: Zone3 Select Input Bluetooth
  kind: action
  command: "Z3BT"
  params: []

- id: z3_usb_ipod
  label: Zone3 Select Input USB/iPod
  kind: action
  command: "Z3USB/IPOD"
  params: []

- id: z3_usb
  label: Zone3 Select Input USB and USB Start Playback
  kind: action
  command: "Z3USB"
  params: []

- id: z3_ipd
  label: Zone3 Select Input USB and iPod DIRECT Start Playback
  kind: action
  command: "Z3IPD"
  params: []

- id: z3_irp
  label: Zone3 Select Input NET/USB and iRadio Recent Play
  kind: action
  command: "Z3IRP"
  params: []

- id: z3_fvp
  label: Zone3 Select Input NET/USB and Favorites Play
  kind: action
  command: "Z3FVP"
  params: []

- id: z3_volume_up
  label: Zone3 Volume Up
  kind: action
  command: "Z3UP"
  params: []

- id: z3_volume_down
  label: Zone3 Volume Down
  kind: action
  command: "Z3DOWN"
  params: []

- id: z3_volume_set
  label: Zone3 Volume Set
  kind: action
  command: "Z3{level}"
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=minimum"

- id: z3_on
  label: Zone3 On
  kind: action
  command: "Z3ON"
  params: []

- id: z3_off
  label: Zone3 Off
  kind: action
  command: "Z3OFF"
  params: []

- id: z3_query
  label: Query Zone3 Status
  kind: query
  command: "Z3?"
  params: []

- id: z3_quick1
  label: Zone3 Quick Select 1
  kind: action
  command: "Z3QUICK1"
  params: []

- id: z3_quick2
  label: Zone3 Quick Select 2
  kind: action
  command: "Z3QUICK2"
  params: []

- id: z3_quick3
  label: Zone3 Quick Select 3
  kind: action
  command: "Z3QUICK3"
  params: []

- id: z3_quick4
  label: Zone3 Quick Select 4
  kind: action
  command: "Z3QUICK4"
  params: []

- id: z3_quick5
  label: Zone3 Quick Select 5
  kind: action
  command: "Z3QUICK5"
  params: []

- id: z3_quick1_memory
  label: Zone3 Quick Select 1 Memory
  kind: action
  command: "Z3QUICK1 MEMORY"
  params: []

- id: z3_quick2_memory
  label: Zone3 Quick Select 2 Memory
  kind: action
  command: "Z3QUICK2 MEMORY"
  params: []

- id: z3_quick3_memory
  label: Zone3 Quick Select 3 Memory
  kind: action
  command: "Z3QUICK3 MEMORY"
  params: []

- id: z3_quick4_memory
  label: Zone3 Quick Select 4 Memory
  kind: action
  command: "Z3QUICK4 MEMORY"
  params: []

- id: z3_quick5_memory
  label: Zone3 Quick Select 5 Memory
  kind: action
  command: "Z3QUICK5 MEMORY"
  params: []

- id: z3_quick_query
  label: Query Zone3 Quick Select Status
  kind: query
  command: "Z3QUICK ?"
  params: []

- id: z3_favorite1
  label: Zone3 Favorite 1
  kind: action
  command: "Z3FAVORITE1"
  params: []

- id: z3_favorite2
  label: Zone3 Favorite 2
  kind: action
  command: "Z3FAVORITE2"
  params: []

- id: z3_favorite3
  label: Zone3 Favorite 3
  kind: action
  command: "Z3FAVORITE3"
  params: []

- id: z3_favorite4
  label: Zone3 Favorite 4
  kind: action
  command: "Z3FAVORITE4"
  params: []

- id: z3_favorite1_memory
  label: Zone3 Favorite 1 Memory
  kind: action
  command: "Z3FAVORITE1 MEMORY"
  params: []

- id: z3_favorite2_memory
  label: Zone3 Favorite 2 Memory
  kind: action
  command: "Z3FAVORITE2 MEMORY"
  params: []

- id: z3_favorite3_memory
  label: Zone3 Favorite 3 Memory
  kind: action
  command: "Z3FAVORITE3 MEMORY"
  params: []

- id: z3_favorite4_memory
  label: Zone3 Favorite 4 Memory
  kind: action
  command: "Z3FAVORITE4 MEMORY"
  params: []

# Zone3 Mute (Z3MU)
- id: z3mu_on
  label: Zone3 Mute On
  kind: action
  command: "Z3MUON"
  params: []

- id: z3mu_off
  label: Zone3 Mute Off
  kind: action
  command: "Z3MUOFF"
  params: []

- id: z3mu_query
  label: Query Zone3 Mute Status
  kind: query
  command: "Z3MU?"
  params: []

# Zone3 Channel Setting (Z3CS)
- id: z3cs_st
  label: Zone3 Channel Stereo
  kind: action
  command: "Z3CSST"
  params: []

- id: z3cs_mono
  label: Zone3 Channel Mono
  kind: action
  command: "Z3CSMONO"
  params: []

- id: z3cs_query
  label: Query Zone3 Channel Status
  kind: query
  command: "Z3CS?"
  params: []

# Zone3 Channel Volume (Z3CV)
- id: z3cvfl_up
  label: Zone3 Front Left Volume Up
  kind: action
  command: "Z3CVFL UP"
  params: []

- id: z3cvfl_down
  label: Zone3 Front Left Volume Down
  kind: action
  command: "Z3CVFL DOWN"
  params: []

- id: z3cvfl_set
  label: Zone3 Front Left Volume Set
  kind: action
  command: "Z3CVFL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: z3cvfr_up
  label: Zone3 Front Right Volume Up
  kind: action
  command: "Z3CVFR UP"
  params: []

- id: z3cvfr_down
  label: Zone3 Front Right Volume Down
  kind: action
  command: "Z3CVFR DOWN"
  params: []

- id: z3cvfr_set
  label: Zone3 Front Right Volume Set
  kind: action
  command: "Z3CVFR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: z3cv_query
  label: Query Zone3 Channel Volume Status
  kind: query
  command: "Z3CV?"
  params: []

# Zone3 HPF (Z3HPF)
- id: z3hpf_on
  label: Zone3 HPF On
  kind: action
  command: "Z3HPFON"
  params: []

- id: z3hpf_off
  label: Zone3 HPF Off
  kind: action
  command: "Z3HPFOFF"
  params: []

- id: z3hpf_query
  label: Query Zone3 HPF Status
  kind: query
  command: "Z3HPF?"
  params: []

# Zone3 Bass/Treble (Z3PS)
- id: z3ps_bas_up
  label: Zone3 Bass Up
  kind: action
  command: "Z3PSBAS UP"
  params: []

- id: z3ps_bas_down
  label: Zone3 Bass Down
  kind: action
  command: "Z3PSBAS DOWN"
  params: []

- id: z3ps_bas_set
  label: Zone3 Bass Set
  kind: action
  command: "Z3PSBAS{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII; range -10 to +10 (40-60) or -14 to +14 for X4100 (36-64)"

- id: z3ps_bas_query
  label: Query Zone3 Bass Status
  kind: query
  command: "Z3PSBAS ?"
  params: []

- id: z3ps_tre_up
  label: Zone3 Treble Up
  kind: action
  command: "Z3PSTRE UP"
  params: []

- id: z3ps_tre_down
  label: Zone3 Treble Down
  kind: action
  command: "Z3PSTRE DOWN"
  params: []

- id: z3ps_tre_set
  label: Zone3 Treble Set
  kind: action
  command: "Z3PSTRE{level}"
  params:
    - name: level
      type: string
      description: "00-99 ASCII; range -10 to +10 (40-60) or -14 to +14 for X4100 (36-64)"

- id: z3ps_tre_query
  label: Query Zone3 Treble Status
  kind: query
  command: "Z3PSTRE ?"
  params: []

# Zone3 Sleep Timer (Z3SLP)
- id: z3slp_off
  label: Zone3 Sleep Timer Off
  kind: action
  command: "Z3SLPOFF"
  params: []

- id: z3slp_set
  label: Zone3 Sleep Timer Set
  kind: action
  command: "Z3SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001 to 120 by ASCII, 010=10min"

- id: z3slp_query
  label: Query Zone3 Sleep Timer Status
  kind: query
  command: "Z3SLP?"
  params: []

# Zone3 Auto Standby (Z3STBY)
- id: z3stby_2h
  label: Zone3 Auto Standby 2 Hours
  kind: action
  command: "Z3STBY2H"
  params: []

- id: z3stby_4h
  label: Zone3 Auto Standby 4 Hours
  kind: action
  command: "Z3STBY4H"
  params: []

- id: z3stby_8h
  label: Zone3 Auto Standby 8 Hours
  kind: action
  command: "Z3STBY8H"
  params: []

- id: z3stby_off
  label: Zone3 Auto Standby Off
  kind: action
  command: "Z3STBYOFF"
  params: []

- id: z3stby_query
  label: Query Zone3 Auto Standby Status
  kind: query
  command: "Z3STBY?"
  params: []

# Channel Volume (CV) - per-channel commands
- id: cvfl_up
  label: Channel Volume Front Left Up
  kind: action
  command: "CVFL UP"
  params: []

- id: cvfl_down
  label: Channel Volume Front Left Down
  kind: action
  command: "CVFL DOWN"
  params: []

- id: cvfl_set
  label: Channel Volume Front Left Set
  kind: action
  command: "CVFL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvfr_up
  label: Channel Volume Front Right Up
  kind: action
  command: "CVFR UP"
  params: []

- id: cvfr_down
  label: Channel Volume Front Right Down
  kind: action
  command: "CVFR DOWN"
  params: []

- id: cvfr_set
  label: Channel Volume Front Right Set
  kind: action
  command: "CVFR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvc_up
  label: Channel Volume Center Up
  kind: action
  command: "CVC UP"
  params: []

- id: cvc_down
  label: Channel Volume Center Down
  kind: action
  command: "CVC DOWN"
  params: []

- id: cvc_set
  label: Channel Volume Center Set
  kind: action
  command: "CVC{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvsw_up
  label: Channel Volume Subwoofer Up
  kind: action
  command: "CVSW UP"
  params: []

- id: cvsw_down
  label: Channel Volume Subwoofer Down
  kind: action
  command: "CVSW DOWN"
  params: []

- id: cvsw_set
  label: Channel Volume Subwoofer Set
  kind: action
  command: "CVSW{level}"
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB"

- id: cvsw2_up
  label: Channel Volume Subwoofer 2 Up
  kind: action
  command: "CVSW2 UP"
  params: []

- id: cvsw2_down
  label: Channel Volume Subwoofer 2 Down
  kind: action
  command: "CVSW2 DOWN"
  params: []

- id: cvsw2_set
  label: Channel Volume Subwoofer 2 Set
  kind: action
  command: "CVSW2{level}"
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB"

- id: cvsl_up
  label: Channel Volume Surround Left Up
  kind: action
  command: "CVSL UP"
  params: []

- id: cvsl_down
  label: Channel Volume Surround Left Down
  kind: action
  command: "CVSL DOWN"
  params: []

- id: cvsl_set
  label: Channel Volume Surround Left Set
  kind: action
  command: "CVSL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvsr_up
  label: Channel Volume Surround Right Up
  kind: action
  command: "CVSR UP"
  params: []

- id: cvsr_down
  label: Channel Volume Surround Right Down
  kind: action
  command: "CVSR DOWN"
  params: []

- id: cvsr_set
  label: Channel Volume Surround Right Set
  kind: action
  command: "CVSR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvsbl_up
  label: Channel Volume Surround Back Left Up
  kind: action
  command: "CVSBL UP"
  params: []

- id: cvsbl_down
  label: Channel Volume Surround Back Left Down
  kind: action
  command: "CVSBL DOWN"
  params: []

- id: cvsbl_set
  label: Channel Volume Surround Back Left Set
  kind: action
  command: "CVSBL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvsbr_up
  label: Channel Volume Surround Back Right Up
  kind: action
  command: "CVSBR UP"
  params: []

- id: cvsbr_down
  label: Channel Volume Surround Back Right Down
  kind: action
  command: "CVSBR DOWN"
  params: []

- id: cvsbr_set
  label: Channel Volume Surround Back Right Set
  kind: action
  command: "CVSBR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvsb_up
  label: Channel Volume Surround Back Up (mono, 1SP)
  kind: action
  command: "CVSB UP"
  params: []

- id: cvsb_down
  label: Channel Volume Surround Back Down (mono, 1SP)
  kind: action
  command: "CVSB DOWN"
  params: []

- id: cvsb_set
  label: Channel Volume Surround Back Set (mono, 1SP)
  kind: action
  command: "CVSB{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvfhl_up
  label: Channel Volume Front Height Left Up
  kind: action
  command: "CVFHL UP"
  params: []

- id: cvfhl_down
  label: Channel Volume Front Height Left Down
  kind: action
  command: "CVFHL DOWN"
  params: []

- id: cvfhl_set
  label: Channel Volume Front Height Left Set
  kind: action
  command: "CVFHL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvfhr_up
  label: Channel Volume Front Height Right Up
  kind: action
  command: "CVFHR UP"
  params: []

- id: cvfhr_down
  label: Channel Volume Front Height Right Down
  kind: action
  command: "CVFHR DOWN"
  params: []

- id: cvfhr_set
  label: Channel Volume Front Height Right Set
  kind: action
  command: "CVFHR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvfwl_up
  label: Channel Volume Front Wide Left Up
  kind: action
  command: "CVFWL UP"
  params: []

- id: cvfwl_down
  label: Channel Volume Front Wide Left Down
  kind: action
  command: "CVFWL DOWN"
  params: []

- id: cvfwl_set
  label: Channel Volume Front Wide Left Set
  kind: action
  command: "CVFWL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvfwr_up
  label: Channel Volume Front Wide Right Up
  kind: action
  command: "CVFWR UP"
  params: []

- id: cvfwr_down
  label: Channel Volume Front Wide Right Down
  kind: action
  command: "CVFWR DOWN"
  params: []

- id: cvfwr_set
  label: Channel Volume Front Wide Right Set
  kind: action
  command: "CVFWR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvtfl_up
  label: Channel Volume Top Front Left Up
  kind: action
  command: "CVTFL UP"
  params: []

- id: cvtfl_down
  label: Channel Volume Top Front Left Down
  kind: action
  command: "CVTFL DOWN"
  params: []

- id: cvtfl_set
  label: Channel Volume Top Front Left Set
  kind: action
  command: "CVTFL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvtfr_up
  label: Channel Volume Top Front Right Up
  kind: action
  command: "CVTFR UP"
  params: []

- id: cvtfr_down
  label: Channel Volume Top Front Right Down
  kind: action
  command: "CVTFR DOWN"
  params: []

- id: cvtfr_set
  label: Channel Volume Top Front Right Set
  kind: action
  command: "CVTFR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvtml_up
  label: Channel Volume Top Middle Left Up
  kind: action
  command: "CVTML UP"
  params: []

- id: cvtml_down
  label: Channel Volume Top Middle Left Down
  kind: action
  command: "CVTML DOWN"
  params: []

- id: cvtml_set
  label: Channel Volume Top Middle Left Set
  kind: action
  command: "CVTML{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvtmr_up
  label: Channel Volume Top Middle Right Up
  kind: action
  command: "CVTMR UP"
  params: []

- id: cvtmr_down
  label: Channel Volume Top Middle Right Down
  kind: action
  command: "CVTMR DOWN"
  params: []

- id: cvtmr_set
  label: Channel Volume Top Middle Right Set
  kind: action
  command: "CVTMR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvtrl_up
  label: Channel Volume Top Rear Left Up
  kind: action
  command: "CVTRL UP"
  params: []

- id: cvtrl_down
  label: Channel Volume Top Rear Left Down
  kind: action
  command: "CVTRL DOWN"
  params: []

- id: cvtrl_set
  label: Channel Volume Top Rear Left Set
  kind: action
  command: "CVTRL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvtrr_up
  label: Channel Volume Top Rear Right Up
  kind: action
  command: "CVTRR UP"
  params: []

- id: cvtrr_down
  label: Channel Volume Top Rear Right Down
  kind: action
  command: "CVTRR DOWN"
  params: []

- id: cvtrr_set
  label: Channel Volume Top Rear Right Set
  kind: action
  command: "CVTRR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvrhl_up
  label: Channel Volume Rear Height Left Up
  kind: action
  command: "CVRHL UP"
  params: []

- id: cvrhl_down
  label: Channel Volume Rear Height Left Down
  kind: action
  command: "CVRHL DOWN"
  params: []

- id: cvrhl_set
  label: Channel Volume Rear Height Left Set
  kind: action
  command: "CVRHL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvrhr_up
  label: Channel Volume Rear Height Right Up
  kind: action
  command: "CVRHR UP"
  params: []

- id: cvrhr_down
  label: Channel Volume Rear Height Right Down
  kind: action
  command: "CVRHR DOWN"
  params: []

- id: cvrhr_set
  label: Channel Volume Rear Height Right Set
  kind: action
  command: "CVRHR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvfdl_up
  label: Channel Volume Front Dolby Left Up
  kind: action
  command: "CVFDL UP"
  params: []

- id: cvfdl_down
  label: Channel Volume Front Dolby Left Down
  kind: action
  command: "CVFDL DOWN"
  params: []

- id: cvfdl_set
  label: Channel Volume Front Dolby Left Set
  kind: action
  command: "CVFDL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvfdr_up
  label: Channel Volume Front Dolby Right Up
  kind: action
  command: "CVFDR UP"
  params: []

- id: cvfdr_down
  label: Channel Volume Front Dolby Right Down
  kind: action
  command: "CVFDR DOWN"
  params: []

- id: cvfdr_set
  label: Channel Volume Front Dolby Right Set
  kind: action
  command: "CVFDR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvsdl_up
  label: Channel Volume Surround Dolby Left Up
  kind: action
  command: "CVSDL UP"
  params: []

- id: cvsdl_down
  label: Channel Volume Surround Dolby Left Down
  kind: action
  command: "CVSDL DOWN"
  params: []

- id: cvsdl_set
  label: Channel Volume Surround Dolby Left Set
  kind: action
  command: "CVSDL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvsdr_up
  label: Channel Volume Surround Dolby Right Up
  kind: action
  command: "CVSDR UP"
  params: []

- id: cvsdr_down
  label: Channel Volume Surround Dolby Right Down
  kind: action
  command: "CVSDR DOWN"
  params: []

- id: cvsdr_set
  label: Channel Volume Surround Dolby Right Set
  kind: action
  command: "CVSDR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvbdl_up
  label: Channel Volume Back Dolby Left Up
  kind: action
  command: "CVBDL UP"
  params: []

- id: cvbdl_down
  label: Channel Volume Back Dolby Left Down
  kind: action
  command: "CVBDL DOWN"
  params: []

- id: cvbdl_set
  label: Channel Volume Back Dolby Left Set
  kind: action
  command: "CVBDL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvbdr_up
  label: Channel Volume Back Dolby Right Up
  kind: action
  command: "CVBDR UP"
  params: []

- id: cvbdr_down
  label: Channel Volume Back Dolby Right Down
  kind: action
  command: "CVBDR DOWN"
  params: []

- id: cvbdr_set
  label: Channel Volume Back Dolby Right Set
  kind: action
  command: "CVBDR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvshl_up
  label: Channel Volume Surround Height Left Up (Auro-3D Upgrade only)
  kind: action
  command: "CVSHL UP"
  params: []

- id: cvshl_down
  label: Channel Volume Surround Height Left Down (Auro-3D Upgrade only)
  kind: action
  command: "CVSHL DOWN"
  params: []

- id: cvshl_set
  label: Channel Volume Surround Height Left Set (Auro-3D Upgrade only)
  kind: action
  command: "CVSHL{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvshr_up
  label: Channel Volume Surround Height Right Up (Auro-3D Upgrade only)
  kind: action
  command: "CVSHR UP"
  params: []

- id: cvshr_down
  label: Channel Volume Surround Height Right Down (Auro-3D Upgrade only)
  kind: action
  command: "CVSHR DOWN"
  params: []

- id: cvshr_set
  label: Channel Volume Surround Height Right Set (Auro-3D Upgrade only)
  kind: action
  command: "CVSHR{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvts_up
  label: Channel Volume Top Surround Up (Auro-3D Upgrade only)
  kind: action
  command: "CVTS UP"
  params: []

- id: cvts_down
  label: Channel Volume Top Surround Down (Auro-3D Upgrade only)
  kind: action
  command: "CVTS DOWN"
  params: []

- id: cvts_set
  label: Channel Volume Top Surround Set (Auro-3D Upgrade only)
  kind: action
  command: "CVTS{level}"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cvzrl
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  command: "CVZRL"
  params: []

- id: cv_query
  label: Query Channel Volume Status
  kind: query
  command: "CV?"
  params: []

# Tuner Control (TF/TP/TM)
- id: tf_anup
  label: Tuner Frequency Up
  kind: action
  command: "TFANUP"
  params: []

- id: tf_andown
  label: Tuner Frequency Down
  kind: action
  command: "TFANDOWN"
  params: []

- id: tf_an_set
  label: Tuner Frequency Set
  kind: action
  command: "TFAN{frequency}"
  params:
    - name: frequency
      type: string
      description: "6 digits: ****.** kHz at AM (>050000), ****.** MHz at FM (<050000)"

- id: tf_an_query
  label: Query Tuner Frequency Status
  kind: query
  command: "TFAN?"
  params: []

- id: tf_anname_query
  label: Query RDS Station Name (EU/AP only)
  kind: query
  command: "TFANNAME?"
  params: []

- id: tp_anup
  label: Tuner Preset Up
  kind: action
  command: "TPANUP"
  params: []

- id: tp_andown
  label: Tuner Preset Down
  kind: action
  command: "TPANDOWN"
  params: []

- id: tp_an_set
  label: Tuner Preset Select
  kind: action
  command: "TPAN{preset}"
  params:
    - name: preset
      type: string
      description: "01-56 (01=CH01, 56=CH56)"

- id: tp_an_query
  label: Query Tuner Preset Status
  kind: query
  command: "TPAN?"
  params: []

- id: tp_anmem
  label: Tuner Preset Memory (next frequency)
  kind: action
  command: "TPANMEM"
  params: []

- id: tp_anmem_set
  label: Tuner Preset Memory (specific preset)
  kind: action
  command: "TPANMEM{preset}"
  params:
    - name: preset
      type: string
      description: "01-56 (01=CH01, 56=CH56)"

- id: tm_anam
  label: Tuner Band AM
  kind: action
  command: "TMANAM"
  params: []

- id: tm_anfm
  label: Tuner Band FM
  kind: action
  command: "TMANFM"
  params: []

- id: tm_an_query
  label: Query Tuner Band/Status
  kind: query
  command: "TMAN?"
  params: []

- id: tm_anauto
  label: Tuning Mode Auto
  kind: action
  command: "TMANAUTO"
  params: []

- id: tm_anmanual
  label: Tuning Mode Manual
  kind: action
  command: "TMANMANUAL"
  params: []

# HD Radio Control (TF/TP/TM)
- id: tf_hdup
  label: HD Channel Up
  kind: action
  command: "TFHDUP"
  params: []

- id: tf_hddown
  label: HD Channel Down
  kind: action
  command: "TFHDDOWN"
  params: []

- id: tf_hd_set
  label: HD Frequency Set
  kind: action
  command: "TFHD{frequency}"
  params:
    - name: frequency
      type: string
      description: "6 digits: ****.** kHz at AM (>050000), ****.** MHz at FM (<050000)"

- id: tf_hdmc_set
  label: HD Multi Cast Channel Select
  kind: action
  command: "TFHDMC{channel}"
  params:
    - name: channel
      type: string
      description: "1 digit: Multi Cast 1-8, Analog 0"

- id: tf_hd_freq_mc_set
  label: HD Frequency and Multi Cast Channel Select
  kind: action
  command: "TFHD{frequency}MC{channel}"
  params:
    - name: frequency
      type: string
      description: "6 digits e.g. 008750"
    - name: channel
      type: string
      description: "1 digit Multi Cast channel"

- id: tf_hd_query
  label: Query HD Tuner Status
  kind: query
  command: "TFHD?"
  params: []

- id: tp_hdup
  label: HD Preset Up
  kind: action
  command: "TPHDUP"
  params: []

- id: tp_hddown
  label: HD Preset Down
  kind: action
  command: "TPHDDOWN"
  params: []

- id: tp_hd_set
  label: HD Preset Select
  kind: action
  command: "TPHD{preset}"
  params:
    - name: preset
      type: string
      description: "01-56 (01=CH01, 56=CH56)"

- id: tp_hd_query
  label: Query HD Preset Status
  kind: query
  command: "TPHD?"
  params: []

- id: tp_hdmem
  label: HD Preset Memory (next channel)
  kind: action
  command: "TPHDMEM"
  params: []

- id: tp_hdmem_set
  label: HD Preset Memory (specific preset)
  kind: action
  command: "TPHDMEM{preset}"
  params:
    - name: preset
      type: string
      description: "01-56 (01=CH01, 56=CH56)"

- id: tm_hdam
  label: HD Radio Band AM
  kind: action
  command: "TMHDAM"
  params: []

- id: tm_hdfm
  label: HD Radio Band FM
  kind: action
  command: "TMHDFM"
  params: []

- id: tm_hdautohd
  label: HD Radio Tuning Mode Auto-HD
  kind: action
  command: "TMHDAUTOHD"
  params: []

- id: tm_hdauto
  label: HD Radio Tuning Mode Auto
  kind: action
  command: "TMHDAUTO"
  params: []

- id: tm_hdmanual
  label: HD Radio Tuning Mode Manual
  kind: action
  command: "TMHDMANUAL"
  params: []

- id: tm_hdanaauto
  label: HD Radio Analog Auto Mode
  kind: action
  command: "TMHDANAAUTO"
  params: []

- id: tm_hdanamanu
  label: HD Radio Analog Manual Mode
  kind: action
  command: "TMHDANAMANU"
  params: []

- id: tm_hd_query
  label: Query HD Radio Band/Status
  kind: query
  command: "TMHD?"
  params: []

- id: hd_query
  label: Query HD Radio Full Status
  kind: query
  command: "HD?"
  params: []

# Network/USB/iPod/Bluetooth Control (NS)
- id: ns_cursor_up
  label: Cursor Up
  kind: action
  command: "NS90"
  params: []

- id: ns_cursor_down
  label: Cursor Down
  kind: action
  command: "NS91"
  params: []

- id: ns_cursor_left
  label: Cursor Left
  kind: action
  command: "NS92"
  params: []

- id: ns_cursor_right
  label: Cursor Right
  kind: action
  command: "NS93"
  params: []

- id: ns_enter
  label: Enter (Play/Pause)
  kind: action
  command: "NS94"
  params: []

- id: ns_play
  label: Play
  kind: action
  command: "NS9A"
  params: []

- id: ns_pause
  label: Pause
  kind: action
  command: "NS9B"
  params: []

- id: ns_stop
  label: Stop
  kind: action
  command: "NS9C"
  params: []

- id: ns_skip_plus
  label: Skip Plus
  kind: action
  command: "NS9D"
  params: []

- id: ns_skip_minus
  label: Skip Minus
  kind: action
  command: "NS9E"
  params: []

- id: ns_search_plus
  label: Manual Search Plus (USB/iPod, Media Server, Bluetooth)
  kind: action
  command: "NS9F"
  params: []

- id: ns_search_minus
  label: Manual Search Minus (USB/iPod, Media Server, Bluetooth)
  kind: action
  command: "NS9G"
  params: []

- id: ns_repeat_one
  label: Repeat One (Media Server, USB, iPod Direct, Bluetooth)
  kind: action
  command: "NS9H"
  params: []

- id: ns_repeat_all
  label: Repeat All (Media Server, USB, iPod Direct, Bluetooth)
  kind: action
  command: "NS9I"
  params: []

- id: ns_repeat_off
  label: Repeat Off (Media Server, USB, iPod Direct, Bluetooth)
  kind: action
  command: "NS9J"
  params: []

- id: ns_random_on
  label: Random On / Shuffle Songs (Media Server, USB, Bluetooth, iPod Direct)
  kind: action
  command: "NS9K"
  params: []

- id: ns_random_off
  label: Random Off / Shuffle Off (Media Server, USB, Bluetooth, iPod Direct)
  kind: action
  command: "NS9M"
  params: []

- id: ns_toggle_ipod_mode
  label: Toggle iPod Mode/On Screen Mode
  kind: action
  command: "NS9W"
  params: []

- id: ns_page_next
  label: Page Next (except Bluetooth, AirPlay, Spotify remote)
  kind: action
  command: "NS9X"
  params: []

- id: ns_page_prev
  label: Page Previous (except Bluetooth, AirPlay, Spotify remote)
  kind: action
  command: "NS9Y"
  params: []

- id: ns_search_stop
  label: Manual Search Stop (USB/iPod, Media Server, Bluetooth)
  kind: action
  command: "NS9Z"
  params: []

- id: ns_repeat_toggle
  label: Repeat Toggle (Media Server, USB, iPod Direct, Spotify, AirPlay, Bluetooth)
  kind: action
  command: "NSRPT"
  params: []

- id: ns_random_toggle
  label: Random Toggle (Media Server, USB, iPod Direct, Spotify, AirPlay, Bluetooth)
  kind: action
  command: "NSRND"
  params: []

- id: ns_preset_call
  label: Preset Call (except Bluetooth, USB/iPod)
  kind: action
  command: "NSB{preset}"
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"

- id: ns_preset_memory
  label: Preset Memory (except Bluetooth, USB/iPod)
  kind: action
  command: "NSC{preset}"
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"

- id: ns_net_query
  label: Query Net Audio Preset Name Status (except Bluetooth, USB/iPod)
  kind: query
  command: "NSH"
  params: []

- id: ns_add_favorites
  label: Add Favorites Folder
  kind: action
  command: "NSFV MEM"
  params: []

- id: ns_onscreen_query
  label: Query Onscreen Display Information (ASCII)
  kind: query
  command: "NSA"
  params: []

- id: nse_query
  label: Request Onscreen Display Information List (UTF-8)
  kind: query
  command: "NSE"
  params: []

# System Control (MN)
- id: mn_cup
  label: Cursor Up (Menu)
  kind: action
  command: "MNCUP"
  params: []

- id: mn_cdn
  label: Cursor Down (Menu)
  kind: action
  command: "MNCDN"
  params: []

- id: mn_clt
  label: Cursor Left (Menu)
  kind: action
  command: "MNCLT"
  params: []

- id: mn_crt
  label: Cursor Right (Menu)
  kind: action
  command: "MNCRT"
  params: []

- id: mn_ent
  label: Enter (Menu)
  kind: action
  command: "MNENT"
  params: []

- id: mn_rtn
  label: Return (Menu)
  kind: action
  command: "MNRTN"
  params: []

- id: mn_opt
  label: Option (Menu)
  kind: action
  command: "MNOPT"
  params: []

- id: mn_inf
  label: Info (Menu)
  kind: action
  command: "MNINF"
  params: []

- id: mn_chl
  label: Channel Level Adjust Menu On/Off
  kind: action
  command: "MNCHL"
  params: []

- id: mn_men_on
  label: Setup Menu On
  kind: action
  command: "MNMEN ON"
  params: []

- id: mn_men_off
  label: Setup Menu Off
  kind: action
  command: "MNMEN OFF"
  params: []

- id: mn_men_query
  label: Query Menu Status
  kind: query
  command: "MNMEN?"
  params: []

- id: mn_prv_on
  label: InstaPrevue On
  kind: action
  command: "MNPRV ON"
  params: []

- id: mn_prv_off
  label: InstaPrevue Off
  kind: action
  command: "MNPRV OFF"
  params: []

- id: mn_prv_query
  label: Query InstaPrevue Status
  kind: query
  command: "MNPRV?"
  params: []

- id: mn_zst_on
  label: All Zone Stereo On
  kind: action
  command: "MNZST ON"
  params: []

- id: mn_zst_off
  label: All Zone Stereo Off
  kind: action
  command: "MNZST OFF"
  params: []

- id: mn_zst_query
  label: Query All Zone Stereo Status
  kind: query
  command: "MNZST?"
  params: []

# System Lock (SY)
- id: sy_remote_lock_on
  label: Remote Lock On
  kind: action
  command: "SYREMOTE LOCK ON"
  params: []

- id: sy_remote_lock_off
  label: Remote Lock Off
  kind: action
  command: "SYREMOTE LOCK OFF"
  params: []

- id: sy_panel_lock_on
  label: Panel Lock On (except Master Volume)
  kind: action
  command: "SYPANEL LOCK ON"
  params: []

- id: sy_panel_v_lock_on
  label: Panel and Master Volume Lock On
  kind: action
  command: "SYPANEL+V LOCK ON"
  params: []

- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF"
  params: []

# Trigger (TR)
- id: tr1_on
  label: Trigger 1 On
  kind: action
  command: "TR1 ON"
  params: []

- id: tr1_off
  label: Trigger 1 Off
  kind: action
  command: "TR1 OFF"
  params: []

- id: tr2_on
  label: Trigger 2 On
  kind: action
  command: "TR2 ON"
  params: []

- id: tr2_off
  label: Trigger 2 Off
  kind: action
  command: "TR2 OFF"
  params: []

- id: tr_query
  label: Query Trigger Status
  kind: query
  command: "TR?"
  params: []

# Upgrade (UG)
- id: ug_idn
  label: Display ID Number for Upgrade on FL Display
  kind: action
  command: "UGIDN"
  params: []

# Remote Maintenance (RM)
- id: rm_sta
  label: Remote Maintenance Mode Start
  kind: action
  command: "RM STA"
  params: []

- id: rm_end
  label: Remote Maintenance Mode End
  kind: action
  command: "RM END"
  params: []

- id: rm_query
  label: Query Remote Maintenance Status
  kind: query
  command: "RM ?"
  params: []

# Dimmer (DIM)
- id: dim_bri
  label: Dimmer Bright
  kind: action
  command: "DIM BRI"
  params: []

- id: dim_dim
  label: Dimmer Dim
  kind: action
  command: "DIM DIM"
  params: []

- id: dim_dar
  label: Dimmer Dark
  kind: action
  command: "DIM DAR"
  params: []

- id: dim_off
  label: Dimmer Off
  kind: action
  command: "DIM OFF"
  params: []

- id: dim_sel
  label: Dimmer Toggle (Bright->Dim->Dark->Off)
  kind: action
  command: "DIM SEL"
  params: []

- id: dim_query
  label: Query Dimmer Status
  kind: query
  command: "DIM ?"
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values:
    - PWON
    - PWSTANDBY
  description: Power state response to PW? query

- id: master_volume_status
  type: string
  description: "MV value (2 or 3 digit ASCII) in response to MV? query; 80=0dB, 00=minimum"

- id: mute_status
  type: enum
  values:
    - MUON
    - MUOFF

- id: input_status
  type: string
  description: "SI*** response to SI? query (e.g. SIDVD)"

- id: main_zone_status
  type: enum
  values:
    - ZMON
    - ZMOFF

- id: zone2_status
  type: enum
  values:
    - Z2ON
    - Z2OFF

- id: zone3_status
  type: enum
  values:
    - Z3ON
    - Z3OFF

- id: zone_volume_status
  type: string
  description: "Z2/Z3 volume value: 00-98, 80=0dB"

- id: tuner_frequency_status
  type: string
  description: "TFAN****** in response to TFAN?; AM in kHz (>050000), FM in MHz (<050000)"

- id: tuner_preset_status
  type: string
  description: "TPAN** or TPHD** response; TPANOFF when no preset active"

- id: tuner_band_status
  type: enum
  values:
    - TMANAM
    - TMANFM
    - TMHDAM
    - TMHDFM

- id: surround_mode_status
  type: string
  description: "MS*** response to MS? query"

- id: hd_radio_status
  type: object
  description: |
    HD? returns multiple fields:
    HDST NAME******** (20 chars)
    HDSIG LEV 0-6
    HDMLT CURRCH* (current channel)
    HDMLT CAST CH* (multi cast channel number)
    HDPTY (18 digits)
    HDARTIST (40 digits)
    HDTITLE (40 digits)
    HDALBUM (40 digits)
    HDGENRE (23 digits)
    HDMODE DIGITAL/ANALOG

- id: channel_volume_status
  type: object
  description: |
    CVFL 50, CVFR 50, etc. in response to CV? query.
    Only speakers configured in speaker configuration respond.
    CVEND terminates the response list.

- id: onscreen_display_ascii
  type: string
  description: "NSA0-NSA8 returned by NSA query; up to 96 bytes per line (ASCII)"

- id: onscreen_display_utf8
  type: string
  description: "NSE0-NSE8 returned by NSE query; up to 96 bytes per line (UTF-8)"
```

## Variables
```yaml
# UNRESOLVED: The protocol uses a command-response model where variables are
# queried with ? commands and the response format matches the set command format.
# No separate Variables section in the source document; all state is retrieved
# via query commands (PW?, MV?, SI?, etc.) and unsolicited EVENTS.
```

## Events
```yaml
# The source describes EVENT messages sent unsolicited from the AVR when state changes.
# EVENT format matches COMMAND format. EVENT is sent within 5 seconds of state change.
# Commands are receivable during EVENT transmission (half-duplex).

- id: power_event
  type: enum
  values:
    - PWON
    - PWSTANDBY
  description: Sent when power state changes

- id: input_changed_event
  type: string
  description: "SI*** sent when input source changes; also returns CVFL, etc. for channel volumes"

- id: surround_mode_changed_event
  type: string
  description: "MS*** sent when surround mode changes; if mode unchanged, no event sent"

- id: channel_volume_changed_event
  type: string
  description: "CVFL**, CVFR**, etc. sent when channel volume changes (only for configured channels)"

- id: main_zone_state_event
  type: enum
  values:
    - ZMON
    - ZMOFF
  description: Sent when Main Zone state changes

- id: mute_changed_event
  type: enum
  values:
    - MUON
    - MUOFF
  description: Sent when mute state changes

- id: quick_select_event
  type: string
  description: "MSQUICK? status returned after memory operation"

- id: tuner_event
  type: string
  description: "TFAN or TPAN response when tuner frequency or preset changes"
```

## Macros
```yaml
# UNRESOLVED: No explicit macro/sequence definitions in source.
# The document notes timing constraints but no multi-step sequences are named.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_delay
    description: |
      After transmitting PWON (Power On), wait 1 second before transmitting
      the next command. Source states: "1 second later, please transmit
      the next COMMAND after transmitting a power on COMMAND (PWON)."
  - id: command_interval
    description: |
      Commands must be sent at 50ms or greater intervals.
  - id: response_timeout
    description: |
      RESPONSE to query commands should arrive within 200ms.
      EVENTS should be sent within 5 seconds of state change.
  - id: half_duplex
    description: |
      Communication is half-duplex. Commands are receivable during
      transmission of EVENT. AVR does not transmit while receiving.
```

## Notes
**Protocol format:** ASCII commands, 2-character command code + parameter (up to 25 chars) + CR (0x0D). ASCII range 0x20-0x7F only.

**Command timing:** 50ms minimum interval between commands. RESPONSE within 200ms. EVENT within 5 seconds of state change.

**Volume encoding:** Master volume uses 2-digit ASCII (00-98) where 80=0dB. 0.5dB steps use 3-digit format (e.g. MV805=+0.5dB). Channel volume uses 38-62 range where 50=0dB; subwoofer uses 00,38-62.

**Multi-zone behavior:** Zone2/Z3 source commands mirror Main Zone input selection commands (e.g. Z2DVD mirrors SIDVD). Zone status changes trigger Z2/Z3 events rather than SR events when in Zone2 mode. When in REC mode, Z2 status commands return SR status instead.

**Auro-3D commands:** CVSHL, CVSHR, CVTS (surround height and top surround) are only available on units with Auro-3D upgrade. Commands return an error on non-upgraded units.

**HDMI audio:** Zone2 HDMI output can be set to Through (passthrough) or PCM via Z2HDA command.

**Zone channel volume:** Zone2/3 only supports FL (Front Left) and FR (Front Right) channel volume control, unlike Main Zone which supports all channels via CV commands.

**NS command codes:** NS commands use alphanumeric suffixes (90-9Z, RPT, RND, B**, C**, H, FV MEM, NSA, NSE) rather than descriptive names; all are verbatim from source table.

<!-- UNRESOLVED: Entity ID is provided as placeholder. Verify entity_id in Convex dashboard before ingestion. -->
<!-- UNRESOLVED: Compatible models list contains generic "Marantz Universal Discrete Functions" — document does not specify exact model numbers. Specific AVR model names (X1100, S700, X4100, etc.) appear as footnotes in the source but no definitive model compatibility matrix is provided. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: TCP port 23 stated for Ethernet/Telnet; no alternative ports documented. -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:45.631Z
last_checked_at: 2026-06-02T08:46:07.387Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:46:07.387Z
matched_actions: 767
action_count: 767
confidence: medium
summary: "All 767 spec actions matched verbatim in source; transport port 23 and baud 9600 confirmed; source command count ~770 giving coverage ratio ~0.99. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific compatible model numbers not listed — document is titled \"Universal Discrete Functions\" and covers commands applicable across multiple Marantz AVR models (X1100, S700, S70, X4100, 2014 AVR series, etc.). Firmware version compatibility not stated."
- "The protocol uses a command-response model where variables are"
- "No explicit macro/sequence definitions in source."
- "Entity ID is provided as placeholder. Verify entity_id in Convex dashboard before ingestion."
- "Compatible models list contains generic \"Marantz Universal Discrete Functions\" — document does not specify exact model numbers. Specific AVR model names (X1100, S700, X4100, etc.) appear as footnotes in the source but no definitive model compatibility matrix is provided."
- "Firmware version compatibility not stated in source."
- "TCP port 23 stated for Ethernet/Telnet; no alternative ports documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
