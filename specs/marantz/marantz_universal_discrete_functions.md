---
schema_version: ai4av-public-spec-v1
device_id: marantz/marantz-universal-discrete-functions
entity_id: marantz_universal_discrete_functions
spec_id: admin/marantz-universal-discrete-functions
revision: 1
author: admin
title: "Marantz Universal Discrete Functions Control Spec"
status: published
manufacturer: Marantz
manufacturer_key: marantz
model_family: "Marantz Universal Discrete Functions"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "Marantz Universal Discrete Functions"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:45.631Z
retrieved_at: 2026-04-29T11:13:45.631Z
last_checked_at: 2026-04-23T08:13:13.540Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:13:13.540Z
  matched_actions: 700
  action_count: 700
  confidence: high
  summary: "All 700 spec actions matched literal command mnemonics in source; transport parameters (port 23, 9600 baud) verified verbatim; comprehensive bidirectional coverage of Marantz discrete protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz Universal Discrete Functions Control Spec

## Summary
Marantz AV receiver control protocol supporting both RS-232C serial and Ethernet TCP/IP interfaces. Protocol is ASCII-based with 2-character commands followed by parameters and a carriage-return terminator. Supports multi-zone control, volume management, input routing, surround mode selection, and tuner control.

<!-- UNRESOLVED: specific compatible model numbers not listed — document is titled "Universal Discrete Functions" and covers commands applicable across multiple Marantz AVR models (X1100, S700, S70, X4100, 2014 AVR series, etc.). Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # TCP port 23 (Telnet) stated in source
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
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
- id: power_query
  label: Query Power Status
  kind: action
  params: []

# Master Volume
- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []
- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []
- id: master_volume_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII value 00-98, 80=0dB, 00=minimum (---); for 0.5dB steps use 3-digit format (e.g., MV805 for +0.5dB)
- id: master_volume_query
  label: Query Master Volume Status
  kind: action
  params: []

# Mute
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_query
  label: Query Mute Status
  kind: action
  params: []

# Input Select (SI)
- id: si_phono
  label: Select Input Phono
  kind: action
  params: []
- id: si_cd
  label: Select Input CD
  kind: action
  params: []
- id: si_tuner
  label: Select Input Tuner
  kind: action
  params: []
- id: si_dvd
  label: Select Input DVD/Blu-ray
  kind: action
  params: []
- id: si_bd
  label: Select Input Blu-ray
  kind: action
  params: []
- id: si_tv
  label: Select Input TV Audio
  kind: action
  params: []
- id: si_sat_cbl
  label: Select Input Satellite/Cable
  kind: action
  params: []
- id: si_media_player
  label: Select Input Media Player
  kind: action
  params: []
- id: si_game
  label: Select Input Game
  kind: action
  params: []
- id: si_hdradio
  label: Select Input HD Radio
  kind: action
  params: []
- id: si_net
  label: Select Input Network/Online Music
  kind: action
  params: []
- id: si_pandora
  label: Select Input Pandora
  kind: action
  params: []
- id: si_siriusxm
  label: Select Input SiriusXM
  kind: action
  params: []
- id: si_spotify
  label: Select Input Spotify
  kind: action
  params: []
- id: si_lastfm
  label: Select Input LastFM
  kind: action
  params: []
- id: si_flickr
  label: Select Input Flickr
  kind: action
  params: []
- id: si_iradio
  label: Select Input Internet Radio
  kind: action
  params: []
- id: si_server
  label: Select Input Media Server
  kind: action
  params: []
- id: si_favorites
  label: Select Input Favorites
  kind: action
  params: []
- id: si_aux1
  label: Select Input AUX1
  kind: action
  params: []
- id: si_aux2
  label: Select Input AUX2
  kind: action
  params: []
- id: si_aux3
  label: Select Input AUX3
  kind: action
  params: []
- id: si_aux4
  label: Select Input AUX4
  kind: action
  params: []
- id: si_aux5
  label: Select Input AUX5
  kind: action
  params: []
- id: si_aux6
  label: Select Input AUX6
  kind: action
  params: []
- id: si_aux7
  label: Select Input AUX7
  kind: action
  params: []
- id: si_bt
  label: Select Input Bluetooth
  kind: action
  params: []
- id: si_usb
  label: Select Input USB
  kind: action
  params: []
- id: si_ipd
  label: Select Input USB iPod Direct
  kind: action
  params: []
- id: si_irp
  label: Select Input iRadio Recent Play
  kind: action
  params: []
- id: si_fvp
  label: Select Input Favorites Play
  kind: action
  params: []
- id: si_query
  label: Query Input Status
  kind: action
  params: []

# Main Zone Control (ZM)
- id: zm_on
  label: Main Zone On
  kind: action
  params: []
- id: zm_off
  label: Main Zone Off
  kind: action
  params: []
- id: zm_query
  label: Query Main Zone Status
  kind: action
  params: []
- id: zm_favorite1
  label: Main Zone Favorite 1
  kind: action
  params: []
- id: zm_favorite2
  label: Main Zone Favorite 2
  kind: action
  params: []
- id: zm_favorite3
  label: Main Zone Favorite 3
  kind: action
  params: []
- id: zm_favorite4
  label: Main Zone Favorite 4
  kind: action
  params: []
- id: zm_favorite1_memory
  label: Main Zone Favorite 1 Memory
  kind: action
  params: []
- id: zm_favorite2_memory
  label: Main Zone Favorite 2 Memory
  kind: action
  params: []
- id: zm_favorite3_memory
  label: Main Zone Favorite 3 Memory
  kind: action
  params: []
- id: zm_favorite4_memory
  label: Main Zone Favorite 4 Memory
  kind: action
  params: []

# Rec Select (SR)
- id: sr_source
  label: Rec Select Source (cancel)
  kind: action
  params: []
- id: sr_query
  label: Query Rec Select Status
  kind: action
  params: []

# Digital Input Select (SD)
- id: sd_auto
  label: Set Digital Input Auto (HDMI>>Digital>>Analog)
  kind: action
  params: []
- id: sd_hdmi
  label: Set Digital Input Force HDMI
  kind: action
  params: []
- id: sd_digital
  label: Set Digital Input Force Digital
  kind: action
  params: []
- id: sd_analog
  label: Set Digital Input Force Analog
  kind: action
  params: []
- id: sd_ext_in
  label: Set External Input Mode
  kind: action
  params: []
- id: sd_7_1_in
  label: Set 7.1 Channel Input Mode
  kind: action
  params: []
- id: sd_no
  label: Digital Input Off
  kind: action
  params: []
- id: sd_query
  label: Query Digital Input Status
  kind: action
  params: []
- id: sd_arc
  label: Set ARC On
  kind: action
  params: []

# Digital Input Type (DC)
- id: dc_auto
  label: Set Digital Input Auto Mode
  kind: action
  params: []
- id: dc_pcm
  label: Set Digital Input Force PCM
  kind: action
  params: []
- id: dc_dts
  label: Set Digital Input Force DTS
  kind: action
  params: []
- id: dc_query
  label: Query Digital Input Type Status
  kind: action
  params: []

# Video Select (SV)
- id: sv_dvd
  label: Video Select DVD
  kind: action
  params: []
- id: sv_bd
  label: Video Select Blu-ray
  kind: action
  params: []
- id: sv_tv
  label: Video Select TV
  kind: action
  params: []
- id: sv_sat_cbl
  label: Video Select Satellite/Cable
  kind: action
  params: []
- id: sv_media_player
  label: Video Select Media Player
  kind: action
  params: []
- id: sv_game
  label: Video Select Game
  kind: action
  params: []
- id: sv_aux1
  label: Video Select AUX1
  kind: action
  params: []
- id: sv_aux2
  label: Video Select AUX2
  kind: action
  params: []
- id: sv_aux3
  label: Video Select AUX3
  kind: action
  params: []
- id: sv_aux4
  label: Video Select AUX4
  kind: action
  params: []
- id: sv_aux5
  label: Video Select AUX5
  kind: action
  params: []
- id: sv_aux6
  label: Video Select AUX6
  kind: action
  params: []
- id: sv_aux7
  label: Video Select AUX7
  kind: action
  params: []
- id: sv_cd
  label: Video Select CD
  kind: action
  params: []
- id: sv_source
  label: Video Select Cancel (Source)
  kind: action
  params: []
- id: sv_on
  label: Video Select On
  kind: action
  params: []
- id: sv_off
  label: Video Select Off
  kind: action
  params: []
- id: sv_query
  label: Query Video Select Status
  kind: action
  params: []

# Sleep Timer (SLP)
- id: slp_off
  label: Sleep Timer Off
  kind: action
  params: []
- id: slp_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001 to 120 minutes, ASCII format (e.g., 010 = 10 min)
- id: slp_query
  label: Query Sleep Timer Status
  kind: action
  params: []

# Auto Standby (STBY)
- id: stby_15m
  label: Auto Standby 15 Minutes
  kind: action
  params: []
- id: stby_30m
  label: Auto Standby 30 Minutes
  kind: action
  params: []
- id: stby_60m
  label: Auto Standby 60 Minutes
  kind: action
  params: []
- id: stby_off
  label: Auto Standby Off
  kind: action
  params: []
- id: stby_query
  label: Query Auto Standby Status
  kind: action
  params: []

# ECO Mode (ECO)
- id: eco_on
  label: ECO Mode On
  kind: action
  params: []
- id: eco_auto
  label: ECO Mode Auto
  kind: action
  params: []
- id: eco_off
  label: ECO Mode Off
  kind: action
  params: []
- id: eco_query
  label: Query ECO Mode Status
  kind: action
  params: []

# Surround Mode (MS)
- id: ms_movie
  label: Surround Mode Movie
  kind: action
  params: []
- id: ms_music
  label: Surround Mode Music
  kind: action
  params: []
- id: ms_game
  label: Surround Mode Game
  kind: action
  params: []
- id: ms_direct
  label: Surround Mode Direct
  kind: action
  params: []
- id: ms_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  params: []
- id: ms_stereo
  label: Surround Mode Stereo
  kind: action
  params: []
- id: ms_auto
  label: Surround Mode Auto
  kind: action
  params: []
- id: ms_dolby_digital
  label: Surround Mode Dolby Digital
  kind: action
  params: []
- id: ms_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  params: []
- id: ms_dts_es_matrix
  label: Surround Mode DTS ES Matrix
  kind: action
  params: []
- id: ms_dts_es_discrete
  label: Surround Mode DTS ES Discrete
  kind: action
  params: []
- id: ms_multi_ch_in
  label: Surround Mode Multi-Channel Input
  kind: action
  params: []
- id: ms_multi_ch_in_7_1
  label: Surround Mode Multi-Channel Input 7.1
  kind: action
  params: []
- id: ms_dolby_surround
  label: Surround Mode Dolby Surround
  kind: action
  params: []
- id: ms_dolby_atmos
  label: Surround Mode Dolby Atmos
  kind: action
  params: []
- id: ms_dts_neural_x
  label: Surround Mode Neural:X
  kind: action
  params: []
- id: msauro3d
  label: Surround Mode Auro-3D
  kind: action
  params: []
- id: msauro2dsurr
  label: Surround Mode Auro-2D Surround
  kind: action
  params: []
- id: ms_mch_stereo
  label: Surround Mode Multi-Channel Stereo
  kind: action
  params: []
- id: ms_wide_screen
  label: Surround Mode Wide Screen
  kind: action
  params: []
- id: ms_super_stadium
  label: Surround Mode Super Stadium
  kind: action
  params: []
- id: ms_rock_arena
  label: Surround Mode Rock Arena
  kind: action
  params: []
- id: ms_jazz_club
  label: Surround Mode Jazz Club
  kind: action
  params: []
- id: ms_classic_concert
  label: Surround Mode Classic Concert
  kind: action
  params: []
- id: ms_mono_movie
  label: Surround Mode Mono Movie
  kind: action
  params: []
- id: ms_matrix
  label: Surround Mode Matrix
  kind: action
  params: []
- id: ms_video_game
  label: Surround Mode Video Game
  kind: action
  params: []
- id: ms_virtual
  label: Surround Mode Virtual
  kind: action
  params: []
- id: ms_left
  label: Surround Mode Left
  kind: action
  params: []
- id: ms_right
  label: Surround Mode Right
  kind: action
  params: []
- id: ms_all_zone_stereo
  label: All Zone Stereo
  kind: action
  params: []
- id: ms_7_1_in
  label: 7.1 Channel Input
  kind: action
  params: []
- id: ms_pure_direct_ext
  label: Pure Direct Extended
  kind: action
  params: []
- id: ms_query
  label: Query Surround Mode Status
  kind: action
  params: []
- id: ms_quick1
  label: Quick Select 1
  kind: action
  params: []
- id: ms_quick2
  label: Quick Select 2
  kind: action
  params: []
- id: ms_quick3
  label: Quick Select 3
  kind: action
  params: []
- id: ms_quick4
  label: Quick Select 4
  kind: action
  params: []
- id: ms_quick5
  label: Quick Select 5
  kind: action
  params: []
- id: ms_quick0
  label: Quick Select 0
  kind: action
  params: []
- id: ms_quick1_memory
  label: Quick Select 1 Memory
  kind: action
  params: []
- id: ms_quick2_memory
  label: Quick Select 2 Memory
  kind: action
  params: []
- id: ms_quick3_memory
  label: Quick Select 3 Memory
  kind: action
  params: []
- id: ms_quick4_memory
  label: Quick Select 4 Memory
  kind: action
  params: []
- id: ms_quick5_memory
  label: Quick Select 5 Memory
  kind: action
  params: []
- id: ms_quick_query
  label: Query Quick Select Status
  kind: action
  params: []

# Video Aspect (VS)
- id: vs_asp_norm
  label: Aspect Ratio 4:3 Normal
  kind: action
  params: []
- id: vs_asp_ful
  label: Aspect Ratio 16:9 Full
  kind: action
  params: []
- id: vs_asp_query
  label: Query Aspect Ratio Status
  kind: action
  params: []

# HDMI Monitor (VSMONI)
- id: vsmoni_auto
  label: HDMI Monitor Auto Detection
  kind: action
  params: []
- id: vsmoni1
  label: HDMI Monitor OUT-1
  kind: action
  params: []
- id: vsmoni2
  label: HDMI Monitor OUT-2
  kind: action
  params: []
- id: vsmoni_query
  label: Query HDMI Monitor Status
  kind: action
  params: []

# Video Resolution (VSSC)
- id: vssc_48p
  label: Resolution 480p/576p
  kind: action
  params: []
- id: vssc_10i
  label: Resolution 1080i
  kind: action
  params: []
- id: vssc_72p
  label: Resolution 720p
  kind: action
  params: []
- id: vssc_10p
  label: Resolution 1080p
  kind: action
  params: []
- id: vssc_10p24
  label: Resolution 1080p 24Hz
  kind: action
  params: []
- id: vssc_4k
  label: Resolution 4K
  kind: action
  params: []
- id: vssc_4kf
  label: Resolution 4K 60/50Hz
  kind: action
  params: []
- id: vssc_auto
  label: Resolution Auto
  kind: action
  params: []
- id: vssc_query
  label: Query Resolution Status
  kind: action
  params: []

# HDMI Resolution (VSSCH)
- id: vssch_48p
  label: HDMI Resolution 480p/576p
  kind: action
  params: []
- id: vssch_10i
  label: HDMI Resolution 1080i
  kind: action
  params: []
- id: vssch_72p
  label: HDMI Resolution 720p
  kind: action
  params: []
- id: vssch_10p
  label: HDMI Resolution 1080p
  kind: action
  params: []
- id: vssch_10p24
  label: HDMI Resolution 1080p 24Hz
  kind: action
  params: []
- id: vssch_4k
  label: HDMI Resolution 4K
  kind: action
  params: []
- id: vssch_4kf
  label: HDMI Resolution 4K 60/50Hz
  kind: action
  params: []
- id: vssch_auto
  label: HDMI Resolution Auto
  kind: action
  params: []
- id: vssch_query
  label: Query HDMI Resolution Status
  kind: action
  params: []

# HDMI Audio Output (VSAUDIO)
- id: vsaudio_amp
  label: HDMI Audio Output to AMP
  kind: action
  params: []
- id: vsaudio_tv
  label: HDMI Audio Output to TV
  kind: action
  params: []
- id: vsaudio_query
  label: Query HDMI Audio Status
  kind: action
  params: []

# Video Processing Mode (VSVPM)
- id: vsvpm_auto
  label: Video Processing Mode Auto
  kind: action
  params: []
- id: vsvpm_game
  label: Video Processing Mode Game
  kind: action
  params: []
- id: vsvpm_movi
  label: Video Processing Mode Movie
  kind: action
  params: []
- id: vsvpm_query
  label: Query Video Processing Mode Status
  kind: action
  params: []

# Vertical Stretch (VSVST)
- id: vsvst_on
  label: Vertical Stretch On
  kind: action
  params: []
- id: vsvst_off
  label: Vertical Stretch Off
  kind: action
  params: []
- id: vsvst_query
  label: Query Vertical Stretch Status
  kind: action
  params: []

# Parameter Settings (PS) - Tone and EQ
- id: ps_tone_ctrl_on
  label: Tone Control On
  kind: action
  params: []
- id: ps_tone_ctrl_off
  label: Tone Control Off
  kind: action
  params: []
- id: ps_tone_ctrl_query
  label: Query Tone Control Status
  kind: action
  params: []
- id: ps_bas_up
  label: Bass Up
  kind: action
  params: []
- id: ps_bas_down
  label: Bass Down
  kind: action
  params: []
- id: ps_bas_set
  label: Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range -6 to +6 (44-56)"
- id: ps_bas_query
  label: Query Bass Status
  kind: action
  params: []
- id: ps_tre_up
  label: Treble Up
  kind: action
  params: []
- id: ps_tre_down
  label: Treble Down
  kind: action
  params: []
- id: ps_tre_set
  label: Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range -6 to +6 (44-56)"
- id: ps_tre_query
  label: Query Treble Status
  kind: action
  params: []

# Dialog Level (PSDIL)
- id: psdil_on
  label: Dialog Level Adjust On
  kind: action
  params: []
- id: psdil_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
- id: psdil_up
  label: Dialog Level Up
  kind: action
  params: []
- id: psdil_down
  label: Dialog Level Down
  kind: action
  params: []
- id: psdil_set
  label: Dialog Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: psdil_query
  label: Query Dialog Level Status
  kind: action
  params: []

# Subwoofer Level (PSSWL)
- id: psswl_on
  label: Subwoofer Level Adjust On
  kind: action
  params: []
- id: psswl_off
  label: Subwoofer Level Adjust Off
  kind: action
  params: []
- id: psswl_up
  label: Subwoofer Level Up
  kind: action
  params: []
- id: psswl_down
  label: Subwoofer Level Down
  kind: action
  params: []
- id: psswl_set
  label: Subwoofer Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB"
- id: psswl_query
  label: Query Subwoofer Level Status
  kind: action
  params: []

# Subwoofer 2 Level (PSSWL2)
- id: psswl2_up
  label: Subwoofer 2 Level Up
  kind: action
  params: []
- id: psswl2_down
  label: Subwoofer 2 Level Down
  kind: action
  params: []
- id: psswl2_set
  label: Subwoofer 2 Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB"
- id: psswl2_query
  label: Query Subwoofer 2 Level Status
  kind: action
  params: []

# Cinema EQ (PSCINEMA EQ)
- id: pscinema_eq_on
  label: Cinema EQ On
  kind: action
  params: []
- id: pscinema_eq_off
  label: Cinema EQ Off
  kind: action
  params: []
- id: pscinema_eq_query
  label: Query Cinema EQ Status
  kind: action
  params: []

# Cinema/Music/Game Mode (PSMODE)
- id: ps_mode_music
  label: Cinema/Music/Game Mode Music
  kind: action
  params: []
- id: ps_mode_cinema
  label: Cinema/Music/Game Mode Cinema
  kind: action
  params: []
- id: ps_mode_game
  label: Cinema/Music/Game Mode Game
  kind: action
  params: []
- id: ps_mode_pro_logic
  label: Cinema/Music/Game Mode Pro Logic
  kind: action
  params: []
- id: ps_mode_height
  label: PL2z Height Mode
  kind: action
  params: []
- id: ps_mode_query
  label: Query Cinema/Music/Game Mode Status
  kind: action
  params: []

# Loudness Management (PSLOM)
- id: pslom_on
  label: Loudness Management On
  kind: action
  params: []
- id: pslom_off
  label: Loudness Management Off
  kind: action
  params: []
- id: pslom_query
  label: Query Loudness Management Status
  kind: action
  params: []

# Front Height Output (PSFH)
- id: psfh_on
  label: Front Height Output On
  kind: action
  params: []
- id: psfh_off
  label: Front Height Output Off
  kind: action
  params: []
- id: psfh_query
  label: Query Front Height Output Status
  kind: action
  params: []

# Speaker Output (PSSP)
- id: pssp_fw
  label: Speaker Output Front Height/Width/Back
  kind: action
  params: []
- id: pssp_fh
  label: Speaker Output Front Height
  kind: action
  params: []
- id: pssp_sb
  label: Speaker Output Surround Back and Front Height
  kind: action
  params: []
- id: pssp_hw
  label: Speaker Output Front Height and Wide
  kind: action
  params: []
- id: pssp_bh
  label: Speaker Output Surround Back and Front Height
  kind: action
  params: []
- id: pssp_bw
  label: Speaker Output Surround Back and Wide
  kind: action
  params: []
- id: pssp_fl
  label: Speaker Output Floor
  kind: action
  params: []
- id: pssp_hf
  label: Speaker Output Height and Floor
  kind: action
  params: []
- id: pssp_fr
  label: Speaker Output Front
  kind: action
  params: []
- id: pssp_query
  label: Query Speaker Output Status
  kind: action
  params: []

# PL2z Height Gain (PSPHG)
- id: psphg_low
  label: PL2z Height Gain Low
  kind: action
  params: []
- id: psphg_mid
  label: PL2z Height Gain Mid
  kind: action
  params: []
- id: psphg_hi
  label: PL2z Height Gain High
  kind: action
  params: []
- id: psphg_query
  label: Query PL2z Height Gain Status
  kind: action
  params: []

# MultEQ (PSMULTEQ)
- id: psmulteq_audyssye
  label: MultEQ Audyssey
  kind: action
  params: []
- id: psmulteq_byp_lr
  label: MultEQ L/R Bypass
  kind: action
  params: []
- id: psmulteq_flat
  label: MultEQ Flat
  kind: action
  params: []
- id: psmulteq_manual
  label: MultEQ Manual
  kind: action
  params: []
- id: psmulteq_off
  label: MultEQ Off
  kind: action
  params: []
- id: psmulteq_query
  label: Query MultEQ Status
  kind: action
  params: []

# Dynamic EQ (PSDYNEQ)
- id: psdyneq_on
  label: Dynamic EQ On
  kind: action
  params: []
- id: psdyneq_off
  label: Dynamic EQ Off
  kind: action
  params: []
- id: psdyneq_query
  label: Query Dynamic EQ Status
  kind: action
  params: []

# Reference Level (PSREFLEV)
- id: psreflev_0
  label: Reference Level Offset 0dB
  kind: action
  params: []
- id: psreflev_5
  label: Reference Level Offset 5dB
  kind: action
  params: []
- id: psreflev_10
  label: Reference Level Offset 10dB
  kind: action
  params: []
- id: psreflev_15
  label: Reference Level Offset 15dB
  kind: action
  params: []
- id: psreflev_query
  label: Query Reference Level Status
  kind: action
  params: []

# Dynamic Volume (PSDYNVOL)
- id: psdynvol_hev
  label: Dynamic Volume Heavy
  kind: action
  params: []
- id: psdynvol_med
  label: Dynamic Volume Medium
  kind: action
  params: []
- id: psdynvol_lit
  label: Dynamic Volume Light
  kind: action
  params: []
- id: psdynvol_off
  label: Dynamic Volume Off
  kind: action
  params: []
- id: psdynvol_query
  label: Query Dynamic Volume Status
  kind: action
  params: []

# LFC (PSLFC)
- id: pslfc_on
  label: Audyssey LFC On
  kind: action
  params: []
- id: pslfc_off
  label: Audyssey LFC Off
  kind: action
  params: []
- id: pslfc_query
  label: Query Audyssey LFC Status
  kind: action
  params: []

# Containment Amount (PSCNTAMT)
- id: pscntamt_up
  label: Containment Amount Up
  kind: action
  params: []
- id: pscntamt_down
  label: Containment Amount Down
  kind: action
  params: []
- id: pscntamt_set
  label: Containment Amount Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0; AVR range 1-7 (01-07)"
- id: pscntamt_query
  label: Query Containment Amount Status
  kind: action
  params: []

# DSX (PSDSX)
- id: psdsx_onhw
  label: Audyssey DSX On Height and Wide
  kind: action
  params: []
- id: psdsx_onh
  label: Audyssey DSX On Height
  kind: action
  params: []
- id: psdsx_onw
  label: Audyssey DSX On Wide
  kind: action
  params: []
- id: psdsx_off
  label: Audyssey DSX Off
  kind: action
  params: []
- id: psdsx_query
  label: Query Audyssey DSX Status
  kind: action
  params: []

# Stage Width (PSSTW)
- id: psstw_up
  label: Stage Width Up
  kind: action
  params: []
- id: psstw_down
  label: Stage Width Down
  kind: action
  params: []
- id: psstw_set
  label: Stage Width Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range -10 to +10 (40-60)"
- id: psstw_query
  label: Query Stage Width Status
  kind: action
  params: []

# Stage Height (PSSTH)
- id: pssth_up
  label: Stage Height Up
  kind: action
  params: []
- id: pssth_down
  label: Stage Height Down
  kind: action
  params: []
- id: pssth_set
  label: Stage Height Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range -10 to +10 (40-60)"
- id: pssth_query
  label: Query Stage Height Status
  kind: action
  params: []

# Graphic EQ (PSGEQ)
- id: psgeq_on
  label: Graphic EQ On
  kind: action
  params: []
- id: psgeq_off
  label: Graphic EQ Off
  kind: action
  params: []
- id: psgeq_query
  label: Query Graphic EQ Status
  kind: action
  params: []

# Dynamic Compression (PSDRC)
- id: psdrc_auto
  label: Dynamic Compression Auto
  kind: action
  params: []
- id: psdrc_low
  label: Dynamic Compression Low
  kind: action
  params: []
- id: psdrc_mid
  label: Dynamic Compression Mid
  kind: action
  params: []
- id: psdrc_hi
  label: Dynamic Compression High
  kind: action
  params: []
- id: psdrc_off
  label: Dynamic Compression Off
  kind: action
  params: []
- id: psdrc_query
  label: Query Dynamic Compression Status
  kind: action
  params: []

# Bass Sync (PSBSC)
- id: psbsc_up
  label: Bass Sync Up
  kind: action
  params: []
- id: psbsc_down
  label: Bass Sync Down
  kind: action
  params: []
- id: psbsc_set
  label: Bass Sync Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0; AVR range 0-16"
- id: psbsc_query
  label: Query Bass Sync Status
  kind: action
  params: []

# Dialogue Enhancer (PSDEH)
- id: psdeh_off
  label: Dialogue Enhancer Off
  kind: action
  params: []
- id: psdeh_low
  label: Dialogue Enhancer Low
  kind: action
  params: []
- id: psdeh_med
  label: Dialogue Enhancer Medium
  kind: action
  params: []
- id: psdeh_high
  label: Dialogue Enhancer High
  kind: action
  params: []
- id: psdeh_query
  label: Query Dialogue Enhancer Status
  kind: action
  params: []

# LFE (PSLFE)
- id: pslfe_up
  label: LFE Up
  kind: action
  params: []
- id: pslfe_down
  label: LFE Down
  kind: action
  params: []
- id: pslfe_set
  label: LFE Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB; AVR range 0 to -10 (10=-10dB)"
- id: pslfe_query
  label: Query LFE Status
  kind: action
  params: []

# LFE Level (PSLFL)
- id: pslfl_set
  label: LFE Level Set (EXT.IN/7.1CH IN)
  kind: action
  params:
    - name: level
      type: string
      description: "00, 05, 10, 15 dB"
- id: pslfl_query
  label: Query LFE Level Status
  kind: action
  params: []

# Effect (PSEFF)
- id: pseff_on
  label: Effect On
  kind: action
  params: []
- id: pseff_off
  label: Effect Off
  kind: action
  params: []
- id: pseff_up
  label: Effect Level Up
  kind: action
  params: []
- id: pseff_down
  label: Effect Level Down
  kind: action
  params: []
- id: pseff_set
  label: Effect Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB; AVR range 1-15"
- id: pseff_query
  label: Query Effect Status
  kind: action
  params: []

# Delay (PSDEL)
- id: psdel_up
  label: Delay Up
  kind: action
  params: []
- id: psdel_down
  label: Delay Down
  kind: action
  params: []
- id: psdel_set
  label: Delay Set
  kind: action
  params:
    - name: ms
      type: string
      description: "000-999 ASCII, 000=0ms; AVR range 0-300ms, 0-60ms: 3ms/step, over 60ms: 10ms/step"
- id: psdel_query
  label: Query Delay Status
  kind: action
  params: []

# Panorama (PSPAN)
- id: pspan_on
  label: Panorama On
  kind: action
  params: []
- id: pspan_off
  label: Panorama Off
  kind: action
  params: []
- id: pspan_query
  label: Query Panorama Status
  kind: action
  params: []

# Dimension (PSDIM)
- id: psdim_up
  label: Dimension Up
  kind: action
  params: []
- id: psdim_down
  label: Dimension Down
  kind: action
  params: []
- id: psdim_set
  label: Dimension Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0; AVR range 0-6"
- id: psdim_query
  label: Query Dimension Status
  kind: action
  params: []

# Center Width (PSCEN)
- id: pscen_up
  label: Center Width Up
  kind: action
  params: []
- id: pscen_down
  label: Center Width Down
  kind: action
  params: []
- id: pscen_set
  label: Center Width Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0; AVR range 0-7"
- id: pscen_query
  label: Query Center Width Status
  kind: action
  params: []

# Center Image (PSCEI)
- id: pscei_up
  label: Center Image Up
  kind: action
  params: []
- id: pscei_down
  label: Center Image Down
  kind: action
  params: []
- id: pscei_set
  label: Center Image Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0.0; AVR range 0.0-1.0"
- id: pscei_query
  label: Query Center Image Status
  kind: action
  params: []

# Center Gain (PSCEG)
- id: psceg_up
  label: Center Gain Up
  kind: action
  params: []
- id: psceg_down
  label: Center Gain Down
  kind: action
  params: []
- id: psceg_set
  label: Center Gain Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0.0; AVR range 0.0-1.0"
- id: psceg_query
  label: Query Center Gain Status
  kind: action
  params: []

# Center Spread (PSCES)
- id: pscest_on
  label: Center Spread On
  kind: action
  params: []
- id: pscest_off
  label: Center Spread Off
  kind: action
  params: []
- id: pscest_query
  label: Query Center Spread Status
  kind: action
  params: []

# Subwoofer Mode (PSSWR)
- id: psswr_on
  label: Subwoofer Mode On
  kind: action
  params: []
- id: psswr_off
  label: Subwoofer Mode Off
  kind: action
  params: []
- id: psswr_query
  label: Query Subwoofer Mode Status
  kind: action
  params: []

# Room Size (PSRSZ)
- id: psrsz_s
  label: Room Size Small
  kind: action
  params: []
- id: psrsz_ms
  label: Room Size Medium Small
  kind: action
  params: []
- id: psrsz_m
  label: Room Size Medium
  kind: action
  params: []
- id: psrsz_ml
  label: Room Size Medium Large
  kind: action
  params: []
- id: psrsz_l
  label: Room Size Large
  kind: action
  params: []
- id: psrsz_query
  label: Query Room Size Status
  kind: action
  params: []

# Audio Delay (PSDELAY)
- id: psdelay_up
  label: Audio Delay Up
  kind: action
  params: []
- id: psdelay_down
  label: Audio Delay Down
  kind: action
  params: []
- id: psdelay_set
  label: Audio Delay Set
  kind: action
  params:
    - name: ms
      type: string
      description: "000-999 ASCII, 000=0ms, 200=200ms; AVR range 0-200ms"
- id: psdelay_query
  label: Query Audio Delay Status
  kind: action
  params: []

# Audio Restorer (PSRSTR)
- id: psrstr_off
  label: Audio Restorer Off
  kind: action
  params: []
- id: psrstr_low
  label: Audio Restorer Low (Mode 3)
  kind: action
  params: []
- id: psrstr_med
  label: Audio Restorer Medium (Mode 2)
  kind: action
  params: []
- id: psrstr_hi
  label: Audio Restorer High (Mode 1)
  kind: action
  params: []
- id: psrstr_query
  label: Query Audio Restorer Status
  kind: action
  params: []

# Front Speaker (PSFRONT)
- id: psfront_spa
  label: Front Speaker A
  kind: action
  params: []
- id: psfront_spb
  label: Front Speaker B
  kind: action
  params: []
- id: psfront_apb
  label: Front Speaker A+B
  kind: action
  params: []
- id: psfront_query
  label: Query Front Speaker Status
  kind: action
  params: []

# Auro-Matic Preset (PSAUROPR)
- id: psauropr_sma
  label: Auro-Matic 3D Preset Small
  kind: action
  params: []
- id: psauropr_med
  label: Auro-Matic 3D Preset Medium
  kind: action
  params: []
- id: psauropr_lar
  label: Auro-Matic 3D Preset Large
  kind: action
  params: []
- id: psauropr_spe
  label: Auro-Matic 3D Preset Speaker
  kind: action
  params: []
- id: psauropr_query
  label: Query Auro-Matic 3D Preset Status
  kind: action
  params: []

# Auro-Matic Strength (PSAUROST)
- id: psaurost_up
  label: Auro-Matic 3D Strength Up
  kind: action
  params: []
- id: psaurost_down
  label: Auro-Matic 3D Strength Down
  kind: action
  params: []
- id: psaurost_set
  label: Auro-Matic 3D Strength Set
  kind: action
  params:
    - name: level
      type: string
      description: "01-16 ASCII"
- id: psaurost_query
  label: Query Auro-Matic 3D Strength Status
  kind: action
  params: []

# Picture Mode (PV)
- id: pv_off
  label: Picture Mode Off
  kind: action
  params: []
- id: pv_std
  label: Picture Mode Standard
  kind: action
  params: []
- id: pv_mov
  label: Picture Mode Movie
  kind: action
  params: []
- id: pv_vvd
  label: Picture Mode Vivid
  kind: action
  params: []
- id: pv_stm
  label: Picture Mode Stream
  kind: action
  params: []
- id: pv_ctm
  label: Picture Mode Custom
  kind: action
  params: []
- id: pv_day
  label: Picture Mode ISF Day
  kind: action
  params: []
- id: pv_ngt
  label: Picture Mode ISF Night
  kind: action
  params: []
- id: pv_query
  label: Query Picture Mode Status
  kind: action
  params: []

# Picture Contrast (PVCN)
- id: pvcn_up
  label: Contrast Up
  kind: action
  params: []
- id: pvcn_down
  label: Contrast Down
  kind: action
  params: []
- id: pvcn_set
  label: Contrast Set
  kind: action
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0; AVR range -50 to +50 (000-100)"
- id: pvcn_query
  label: Query Contrast Status
  kind: action
  params: []

# Picture Brightness (PVBR)
- id: pvbr_up
  label: Brightness Up
  kind: action
  params: []
- id: pvbr_down
  label: Brightness Down
  kind: action
  params: []
- id: pvbr_set
  label: Brightness Set
  kind: action
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0; AVR range -50 to +50 (000-100)"
- id: pvbr_query
  label: Query Brightness Status
  kind: action
  params: []

# Picture Saturation (PVST)
- id: pvst_up
  label: Saturation Up
  kind: action
  params: []
- id: pvst_down
  label: Saturation Down
  kind: action
  params: []
- id: pvst_set
  label: Saturation Set
  kind: action
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0; AVR range -50 to +50 (000-100)"
- id: pvst_query
  label: Query Saturation Status
  kind: action
  params: []

# Picture Hue (PVHUE)
- id: pvhue_up
  label: Hue Up
  kind: action
  params: []
- id: pvhue_down
  label: Hue Down
  kind: action
  params: []
- id: pvhue_set
  label: Hue Set
  kind: action
  params:
    - name: level
      type: string
      description: "44-56 ASCII, 50=0; AVR range -6 to +6 (44-56)"
- id: pvhue_query
  label: Query Hue Status
  kind: action
  params: []

# DNR (PVDNR)
- id: pvdns_off
  label: DNR Off
  kind: action
  params: []
- id: pvdns_low
  label: DNR Low
  kind: action
  params: []
- id: pvdns_mid
  label: DNR Mid
  kind: action
  params: []
- id: pvdns_hi
  label: DNR High
  kind: action
  params: []
- id: pvdns_query
  label: Query DNR Status
  kind: action
  params: []

# Enhancer (PVENH)
- id: pvenv_up
  label: Enhancer Up
  kind: action
  params: []
- id: pvenv_down
  label: Enhancer Down
  kind: action
  params: []
- id: pvenv_set
  label: Enhancer Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-12 ASCII, 00=0; AVR range 0-12"
- id: pvenv_query
  label: Query Enhancer Status
  kind: action
  params: []

# Zone2 Control
- id: z2_on
  label: Zone2 On
  kind: action
  params: []
- id: z2_off
  label: Zone2 Off
  kind: action
  params: []
- id: z2_query
  label: Query Zone2 Status
  kind: action
  params: []
- id: z2_source
  label: Zone2 Source (cancel, same as Main)
  kind: action
  params: []
- id: z2_up
  label: Zone2 Volume Up
  kind: action
  params: []
- id: z2_down
  label: Zone2 Volume Down
  kind: action
  params: []
- id: z2_volume_set
  label: Zone2 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=minimum"
- id: z2_quick1
  label: Zone2 Quick Select 1
  kind: action
  params: []
- id: z2_quick2
  label: Zone2 Quick Select 2
  kind: action
  params: []
- id: z2_quick3
  label: Zone2 Quick Select 3
  kind: action
  params: []
- id: z2_quick4
  label: Zone2 Quick Select 4
  kind: action
  params: []
- id: z2_quick5
  label: Zone2 Quick Select 5
  kind: action
  params: []
- id: z2_quick0
  label: Zone2 Quick Select 0
  kind: action
  params: []
- id: z2_quick1_memory
  label: Zone2 Quick Select 1 Memory
  kind: action
  params: []
- id: z2_quick2_memory
  label: Zone2 Quick Select 2 Memory
  kind: action
  params: []
- id: z2_quick3_memory
  label: Zone2 Quick Select 3 Memory
  kind: action
  params: []
- id: z2_quick4_memory
  label: Zone2 Quick Select 4 Memory
  kind: action
  params: []
- id: z2_quick5_memory
  label: Zone2 Quick Select 5 Memory
  kind: action
  params: []
- id: z2_quick_query
  label: Query Zone2 Quick Select Status
  kind: action
  params: []
- id: z2_favorite1
  label: Zone2 Favorite 1
  kind: action
  params: []
- id: z2_favorite2
  label: Zone2 Favorite 2
  kind: action
  params: []
- id: z2_favorite3
  label: Zone2 Favorite 3
  kind: action
  params: []
- id: z2_favorite4
  label: Zone2 Favorite 4
  kind: action
  params: []
- id: z2_favorite1_memory
  label: Zone2 Favorite 1 Memory
  kind: action
  params: []
- id: z2_favorite2_memory
  label: Zone2 Favorite 2 Memory
  kind: action
  params: []
- id: z2_favorite3_memory
  label: Zone2 Favorite 3 Memory
  kind: action
  params: []
- id: z2_favorite4_memory
  label: Zone2 Favorite 4 Memory
  kind: action
  params: []

# Zone2 Mute (Z2MU)
- id: z2mu_on
  label: Zone2 Mute On
  kind: action
  params: []
- id: z2mu_off
  label: Zone2 Mute Off
  kind: action
  params: []
- id: z2mu_query
  label: Query Zone2 Mute Status
  kind: action
  params: []

# Zone2 Channel Setting (Z2CS)
- id: z2cs_st
  label: Zone2 Channel Stereo
  kind: action
  params: []
- id: z2cs_mono
  label: Zone2 Channel Mono
  kind: action
  params: []
- id: z2cs_query
  label: Query Zone2 Channel Status
  kind: action
  params: []

# Zone2 Channel Volume (Z2CV)
- id: z2cvfl_up
  label: Zone2 Front Left Volume Up
  kind: action
  params: []
- id: z2cvfl_down
  label: Zone2 Front Left Volume Down
  kind: action
  params: []
- id: z2cvfl_set
  label: Zone2 Front Left Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: z2cvfr_up
  label: Zone2 Front Right Volume Up
  kind: action
  params: []
- id: z2cvfr_down
  label: Zone2 Front Right Volume Down
  kind: action
  params: []
- id: z2cvfr_set
  label: Zone2 Front Right Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: z2cv_query
  label: Query Zone2 Channel Volume Status
  kind: action
  params: []

# Zone2 HPF (Z2HPF)
- id: z2hpf_on
  label: Zone2 HPF On
  kind: action
  params: []
- id: z2hpf_off
  label: Zone2 HPF Off
  kind: action
  params: []
- id: z2hpf_query
  label: Query Zone2 HPF Status
  kind: action
  params: []

# Zone2 Bass/Treble (Z2PS)
- id: z2ps_bas_up
  label: Zone2 Bass Up
  kind: action
  params: []
- id: z2ps_bas_down
  label: Zone2 Bass Down
  kind: action
  params: []
- id: z2ps_bas_set
  label: Zone2 Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB; range -10 to +10 (40-60) or -14 to +14 for X4100 (36-64)"
- id: z2ps_bas_query
  label: Query Zone2 Bass Status
  kind: action
  params: []
- id: z2ps_tre_up
  label: Zone2 Treble Up
  kind: action
  params: []
- id: z2ps_tre_down
  label: Zone2 Treble Down
  kind: action
  params: []
- id: z2ps_tre_set
  label: Zone2 Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB; range -10 to +10 (40-60) or -14 to +14 for X4100 (36-64)"
- id: z2ps_tre_query
  label: Query Zone2 Treble Status
  kind: action
  params: []

# Zone2 HDMI Audio (Z2HDA)
- id: z2hda_thr
  label: Zone2 HDMI Audio Through
  kind: action
  params: []
- id: z2hda_pcm
  label: Zone2 HDMI Audio PCM
  kind: action
  params: []
- id: z2hda_query
  label: Query Zone2 HDMI Audio Status
  kind: action
  params: []

# Zone2 Sleep Timer (Z2SLP)
- id: z2slp_off
  label: Zone2 Sleep Timer Off
  kind: action
  params: []
- id: z2slp_set
  label: Zone2 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001 to 120 minutes"
- id: z2slp_query
  label: Query Zone2 Sleep Timer Status
  kind: action
  params: []

# Zone2 Auto Standby (Z2STBY)
- id: z2stby_2h
  label: Zone2 Auto Standby 2 Hours
  kind: action
  params: []
- id: z2stby_4h
  label: Zone2 Auto Standby 4 Hours
  kind: action
  params: []
- id: z2stby_8h
  label: Zone2 Auto Standby 8 Hours
  kind: action
  params: []
- id: z2stby_off
  label: Zone2 Auto Standby Off
  kind: action
  params: []
- id: z2stby_query
  label: Query Zone2 Auto Standby Status
  kind: action
  params: []

# Zone3 Control
- id: z3_on
  label: Zone3 On
  kind: action
  params: []
- id: z3_off
  label: Zone3 Off
  kind: action
  params: []
- id: z3_query
  label: Query Zone3 Status
  kind: action
  params: []
- id: z3_source
  label: Zone3 Source (cancel, same as Main)
  kind: action
  params: []
- id: z3_up
  label: Zone3 Volume Up
  kind: action
  params: []
- id: z3_down
  label: Zone3 Volume Down
  kind: action
  params: []
- id: z3_volume_set
  label: Zone3 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=minimum"
- id: z3_quick1
  label: Zone3 Quick Select 1
  kind: action
  params: []
- id: z3_quick2
  label: Zone3 Quick Select 2
  kind: action
  params: []
- id: z3_quick3
  label: Zone3 Quick Select 3
  kind: action
  params: []
- id: z3_quick4
  label: Zone3 Quick Select 4
  kind: action
  params: []
- id: z3_quick5
  label: Zone3 Quick Select 5
  kind: action
  params: []
- id: z3_quick0
  label: Zone3 Quick Select 0
  kind: action
  params: []
- id: z3_quick1_memory
  label: Zone3 Quick Select 1 Memory
  kind: action
  params: []
- id: z3_quick2_memory
  label: Zone3 Quick Select 2 Memory
  kind: action
  params: []
- id: z3_quick3_memory
  label: Zone3 Quick Select 3 Memory
  kind: action
  params: []
- id: z3_quick4_memory
  label: Zone3 Quick Select 4 Memory
  kind: action
  params: []
- id: z3_quick5_memory
  label: Zone3 Quick Select 5 Memory
  kind: action
  params: []
- id: z3_quick_query
  label: Query Zone3 Quick Select Status
  kind: action
  params: []
- id: z3_favorite1
  label: Zone3 Favorite 1
  kind: action
  params: []
- id: z3_favorite2
  label: Zone3 Favorite 2
  kind: action
  params: []
- id: z3_favorite3
  label: Zone3 Favorite 3
  kind: action
  params: []
- id: z3_favorite4
  label: Zone3 Favorite 4
  kind: action
  params: []
- id: z3_favorite1_memory
  label: Zone3 Favorite 1 Memory
  kind: action
  params: []
- id: z3_favorite2_memory
  label: Zone3 Favorite 2 Memory
  kind: action
  params: []
- id: z3_favorite3_memory
  label: Zone3 Favorite 3 Memory
  kind: action
  params: []
- id: z3_favorite4_memory
  label: Zone3 Favorite 4 Memory
  kind: action
  params: []

# Zone3 Mute (Z3MU)
- id: z3mu_on
  label: Zone3 Mute On
  kind: action
  params: []
- id: z3mu_off
  label: Zone3 Mute Off
  kind: action
  params: []
- id: z3mu_query
  label: Query Zone3 Mute Status
  kind: action
  params: []

# Zone3 Channel Setting (Z3CS)
- id: z3cs_st
  label: Zone3 Channel Stereo
  kind: action
  params: []
- id: z3cs_mono
  label: Zone3 Channel Mono
  kind: action
  params: []
- id: z3cs_query
  label: Query Zone3 Channel Status
  kind: action
  params: []

# Zone3 Channel Volume (Z3CV)
- id: z3cvfl_up
  label: Zone3 Front Left Volume Up
  kind: action
  params: []
- id: z3cvfl_down
  label: Zone3 Front Left Volume Down
  kind: action
  params: []
- id: z3cvfl_set
  label: Zone3 Front Left Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: z3cvfr_up
  label: Zone3 Front Right Volume Up
  kind: action
  params: []
- id: z3cvfr_down
  label: Zone3 Front Right Volume Down
  kind: action
  params: []
- id: z3cvfr_set
  label: Zone3 Front Right Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: z3cv_query
  label: Query Zone3 Channel Volume Status
  kind: action
  params: []

# Zone3 HPF (Z3HPF)
- id: z3hpf_on
  label: Zone3 HPF On
  kind: action
  params: []
- id: z3hpf_off
  label: Zone3 HPF Off
  kind: action
  params: []
- id: z3hpf_query
  label: Query Zone3 HPF Status
  kind: action
  params: []

# Zone3 Bass/Treble (Z3PS)
- id: z3ps_bas_up
  label: Zone3 Bass Up
  kind: action
  params: []
- id: z3ps_bas_down
  label: Zone3 Bass Down
  kind: action
  params: []
- id: z3ps_bas_set
  label: Zone3 Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB; range -10 to +10 (40-60) or -14 to +14 for X4100 (36-64)"
- id: z3ps_bas_query
  label: Query Zone3 Bass Status
  kind: action
  params: []
- id: z3ps_tre_up
  label: Zone3 Treble Up
  kind: action
  params: []
- id: z3ps_tre_down
  label: Zone3 Treble Down
  kind: action
  params: []
- id: z3ps_tre_set
  label: Zone3 Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB; range -10 to +10 (40-60) or -14 to +14 for X4100 (36-64)"
- id: z3ps_tre_query
  label: Query Zone3 Treble Status
  kind: action
  params: []

# Zone3 Sleep Timer (Z3SLP)
- id: z3slp_off
  label: Zone3 Sleep Timer Off
  kind: action
  params: []
- id: z3slp_set
  label: Zone3 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001 to 120 minutes"
- id: z3slp_query
  label: Query Zone3 Sleep Timer Status
  kind: action
  params: []

# Zone3 Auto Standby (Z3STBY)
- id: z3stby_2h
  label: Zone3 Auto Standby 2 Hours
  kind: action
  params: []
- id: z3stby_4h
  label: Zone3 Auto Standby 4 Hours
  kind: action
  params: []
- id: z3stby_8h
  label: Zone3 Auto Standby 8 Hours
  kind: action
  params: []
- id: z3stby_off
  label: Zone3 Auto Standby Off
  kind: action
  params: []
- id: z3stby_query
  label: Query Zone3 Auto Standby Status
  kind: action
  params: []

# Channel Volume (CV) - per-channel commands
- id: cvfl_up
  label: Channel Volume Front Left Up
  kind: action
  params: []
- id: cvfl_down
  label: Channel Volume Front Left Down
  kind: action
  params: []
- id: cvfl_set
  label: Channel Volume Front Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvfr_up
  label: Channel Volume Front Right Up
  kind: action
  params: []
- id: cvfr_down
  label: Channel Volume Front Right Down
  kind: action
  params: []
- id: cvfr_set
  label: Channel Volume Front Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvc_up
  label: Channel Volume Center Up
  kind: action
  params: []
- id: cvc_down
  label: Channel Volume Center Down
  kind: action
  params: []
- id: cvc_set
  label: Channel Volume Center Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvsw_up
  label: Channel Volume Subwoofer Up
  kind: action
  params: []
- id: cvsw_down
  label: Channel Volume Subwoofer Down
  kind: action
  params: []
- id: cvsw_set
  label: Channel Volume Subwoofer Set
  kind: action
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB"
- id: cvsw2_up
  label: Channel Volume Subwoofer 2 Up
  kind: action
  params: []
- id: cvsw2_down
  label: Channel Volume Subwoofer 2 Down
  kind: action
  params: []
- id: cvsw2_set
  label: Channel Volume Subwoofer 2 Set
  kind: action
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB"
- id: cvsl_up
  label: Channel Volume Surround Left Up
  kind: action
  params: []
- id: cvsl_down
  label: Channel Volume Surround Left Down
  kind: action
  params: []
- id: cvsl_set
  label: Channel Volume Surround Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvsr_up
  label: Channel Volume Surround Right Up
  kind: action
  params: []
- id: cvsr_down
  label: Channel Volume Surround Right Down
  kind: action
  params: []
- id: cvsr_set
  label: Channel Volume Surround Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvsbl_up
  label: Channel Volume Surround Back Left Up
  kind: action
  params: []
- id: cvsbl_down
  label: Channel Volume Surround Back Left Down
  kind: action
  params: []
- id: cvsbl_set
  label: Channel Volume Surround Back Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvsbr_up
  label: Channel Volume Surround Back Right Up
  kind: action
  params: []
- id: cvsbr_down
  label: Channel Volume Surround Back Right Down
  kind: action
  params: []
- id: cvsbr_set
  label: Channel Volume Surround Back Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvsb_up
  label: Channel Volume Surround Back Up (mono)
  kind: action
  params: []
- id: cvsb_down
  label: Channel Volume Surround Back Down (mono)
  kind: action
  params: []
- id: cvsb_set
  label: Channel Volume Surround Back Set (mono)
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvfhl_up
  label: Channel Volume Front Height Left Up
  kind: action
  params: []
- id: cvfhl_down
  label: Channel Volume Front Height Left Down
  kind: action
  params: []
- id: cvfhl_set
  label: Channel Volume Front Height Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvfhr_up
  label: Channel Volume Front Height Right Up
  kind: action
  params: []
- id: cvfhr_down
  label: Channel Volume Front Height Right Down
  kind: action
  params: []
- id: cvfhr_set
  label: Channel Volume Front Height Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvfwl_up
  label: Channel Volume Front Wide Left Up
  kind: action
  params: []
- id: cvfwl_down
  label: Channel Volume Front Wide Left Down
  kind: action
  params: []
- id: cvfwl_set
  label: Channel Volume Front Wide Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvfwr_up
  label: Channel Volume Front Wide Right Up
  kind: action
  params: []
- id: cvfwr_down
  label: Channel Volume Front Wide Right Down
  kind: action
  params: []
- id: cvfwr_set
  label: Channel Volume Front Wide Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvtfl_up
  label: Channel Volume Top Front Left Up
  kind: action
  params: []
- id: cvtfl_down
  label: Channel Volume Top Front Left Down
  kind: action
  params: []
- id: cvtfl_set
  label: Channel Volume Top Front Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvtfr_up
  label: Channel Volume Top Front Right Up
  kind: action
  params: []
- id: cvtfr_down
  label: Channel Volume Top Front Right Down
  kind: action
  params: []
- id: cvtfr_set
  label: Channel Volume Top Front Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvtml_up
  label: Channel Volume Top Middle Left Up
  kind: action
  params: []
- id: cvtml_down
  label: Channel Volume Top Middle Left Down
  kind: action
  params: []
- id: cvtml_set
  label: Channel Volume Top Middle Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvtmr_up
  label: Channel Volume Top Middle Right Up
  kind: action
  params: []
- id: cvtmr_down
  label: Channel Volume Top Middle Right Down
  kind: action
  params: []
- id: cvtmr_set
  label: Channel Volume Top Middle Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvtrl_up
  label: Channel Volume Top Rear Left Up
  kind: action
  params: []
- id: cvtrl_down
  label: Channel Volume Top Rear Left Down
  kind: action
  params: []
- id: cvtrl_set
  label: Channel Volume Top Rear Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvtrr_up
  label: Channel Volume Top Rear Right Up
  kind: action
  params: []
- id: cvtrr_down
  label: Channel Volume Top Rear Right Down
  kind: action
  params: []
- id: cvtrr_set
  label: Channel Volume Top Rear Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvrhl_up
  label: Channel Volume Rear Height Left Up
  kind: action
  params: []
- id: cvrhl_down
  label: Channel Volume Rear Height Left Down
  kind: action
  params: []
- id: cvrhl_set
  label: Channel Volume Rear Height Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvrhr_up
  label: Channel Volume Rear Height Right Up
  kind: action
  params: []
- id: cvrhr_down
  label: Channel Volume Rear Height Right Down
  kind: action
  params: []
- id: cvrhr_set
  label: Channel Volume Rear Height Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvfdl_up
  label: Channel Volume Front Dolby Left Up
  kind: action
  params: []
- id: cvfdl_down
  label: Channel Volume Front Dolby Left Down
  kind: action
  params: []
- id: cvfdl_set
  label: Channel Volume Front Dolby Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvfdr_up
  label: Channel Volume Front Dolby Right Up
  kind: action
  params: []
- id: cvfdr_down
  label: Channel Volume Front Dolby Right Down
  kind: action
  params: []
- id: cvfdr_set
  label: Channel Volume Front Dolby Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvsdl_up
  label: Channel Volume Surround Dolby Left Up
  kind: action
  params: []
- id: cvsdl_down
  label: Channel Volume Surround Dolby Left Down
  kind: action
  params: []
- id: cvsdl_set
  label: Channel Volume Surround Dolby Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvsdr_up
  label: Channel Volume Surround Dolby Right Up
  kind: action
  params: []
- id: cvsdr_down
  label: Channel Volume Surround Dolby Right Down
  kind: action
  params: []
- id: cvsdr_set
  label: Channel Volume Surround Dolby Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvbdl_up
  label: Channel Volume Back Dolby Left Up
  kind: action
  params: []
- id: cvbdl_down
  label: Channel Volume Back Dolby Left Down
  kind: action
  params: []
- id: cvbdl_set
  label: Channel Volume Back Dolby Left Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvbdr_up
  label: Channel Volume Back Dolby Right Up
  kind: action
  params: []
- id: cvbdr_down
  label: Channel Volume Back Dolby Right Down
  kind: action
  params: []
- id: cvbdr_set
  label: Channel Volume Back Dolby Right Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvshl_up
  label: Channel Volume Surround Height Left (Auro-3D) Up
  kind: action
  params: []
- id: cvshl_down
  label: Channel Volume Surround Height Left (Auro-3D) Down
  kind: action
  params: []
- id: cvshl_set
  label: Channel Volume Surround Height Left (Auro-3D) Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvshr_up
  label: Channel Volume Surround Height Right (Auro-3D) Up
  kind: action
  params: []
- id: cvshr_down
  label: Channel Volume Surround Height Right (Auro-3D) Down
  kind: action
  params: []
- id: cvshr_set
  label: Channel Volume Surround Height Right (Auro-3D) Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvts_up
  label: Channel Volume Top Surround (Auro-3D) Up
  kind: action
  params: []
- id: cvts_down
  label: Channel Volume Top Surround (Auro-3D) Down
  kind: action
  params: []
- id: cvts_set
  label: Channel Volume Top Surround (Auro-3D) Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: cvzrl
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []
- id: cv_query
  label: Query Channel Volume Status
  kind: action
  params: []

# Tuner Control (TF/TP/TM)
- id: tf_anup
  label: Tuner Frequency Up
  kind: action
  params: []
- id: tf_andown
  label: Tuner Frequency Down
  kind: action
  params: []
- id: tf_an_set
  label: Tuner Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6 digits: ****.** kHz at AM (>050000), ****.** MHz at FM (<050000)"
- id: tf_an_query
  label: Query Tuner Status
  kind: action
  params: []
- id: tf_name_query
  label: Query RDS Station Name (EU/AP only)
  kind: action
  params: []
- id: tp_anup
  label: Tuner Preset Up
  kind: action
  params: []
- id: tp_andown
  label: Tuner Preset Down
  kind: action
  params: []
- id: tp_an_set
  label: Tuner Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tp_an_query
  label: Query Tuner Preset Status
  kind: action
  params: []
- id: tp_an_off
  label: Tuner Preset Off
  kind: action
  params: []
- id: tp_anmem
  label: Tuner Preset Memory (next frequency)
  kind: action
  params: []
- id: tp_anmem_set
  label: Tuner Preset Memory (specific preset)
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tm_anam
  label: Tuner Band AM
  kind: action
  params: []
- id: tm_anfm
  label: Tuner Band FM
  kind: action
  params: []
- id: tm_an_query
  label: Query Tuner Band/Status
  kind: action
  params: []
- id: tm_anauto
  label: Tuning Mode Auto
  kind: action
  params: []
- id: tm_anmanual
  label: Tuning Mode Manual
  kind: action
  params: []

# HD Radio Control (TF/TP/TM)
- id: tf_hdup
  label: HD Channel Up
  kind: action
  params: []
- id: tf_hddown
  label: HD Channel Down
  kind: action
  params: []
- id: tf_hd_set
  label: HD Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6 digits: ****.** kHz at AM (>050000), ****.** MHz at FM (<050000)"
- id: tf_hdmc_set
  label: HD Multi Cast Channel Select
  kind: action
  params:
    - name: channel
      type: integer
      description: "1-8 (Multi Cast), 0 (Analog)"
- id: tf_hd_query
  label: Query HD Tuner Status
  kind: action
  params: []
- id: tp_hdup
  label: HD Preset Up
  kind: action
  params: []
- id: tp_hddown
  label: HD Preset Down
  kind: action
  params: []
- id: tp_hd_set
  label: HD Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tp_hd_query
  label: Query HD Preset Status
  kind: action
  params: []
- id: tp_hd_off
  label: HD Preset Off
  kind: action
  params: []
- id: tp_hdmem
  label: HD Preset Memory (next channel)
  kind: action
  params: []
- id: tp_hdmem_set
  label: HD Preset Memory (specific preset)
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tm_hdam
  label: HD Radio Band AM
  kind: action
  params: []
- id: tm_hdfm
  label: HD Radio Band FM
  kind: action
  params: []
- id: tm_hdauto_hd
  label: HD Radio Tuning Mode Auto-HD
  kind: action
  params: []
- id: tm_hdauto
  label: HD Radio Tuning Mode Auto
  kind: action
  params: []
- id: tm_hdmanual
  label: HD Radio Tuning Mode Manual
  kind: action
  params: []
- id: tm_hdanauto
  label: HD Radio Analog Auto Mode
  kind: action
  params: []
- id: tm_hdanamanu
  label: HD Radio Analog Manual Mode
  kind: action
  params: []
- id: tm_hd_query
  label: Query HD Radio Band/Status
  kind: action
  params: []
- id: hd_query
  label: Query HD Radio Full Status
  kind: action
  params: []

# Network/USB/iPod/Bluetooth Control (NS)
- id: ns_cursor_up
  label: Cursor Up
  kind: action
  params: []
- id: ns_cursor_down
  label: Cursor Down
  kind: action
  params: []
- id: ns_cursor_left
  label: Cursor Left
  kind: action
  params: []
- id: ns_cursor_right
  label: Cursor Right
  kind: action
  params: []
- id: ns_enter
  label: Enter (Play/Pause)
  kind: action
  params: []
- id: ns_play
  label: Play
  kind: action
  params: []
- id: ns_pause
  label: Pause
  kind: action
  params: []
- id: ns_stop
  label: Stop
  kind: action
  params: []
- id: ns_skip_plus
  label: Skip Plus
  kind: action
  params: []
- id: ns_skip_minus
  label: Skip Minus
  kind: action
  params: []
- id: ns_search_plus
  label: Manual Search Plus
  kind: action
  params: []
- id: ns_search_minus
  label: Manual Search Minus
  kind: action
  params: []
- id: ns_search_stop
  label: Manual Search Stop
  kind: action
  params: []
- id: ns_repeat_one
  label: Repeat One
  kind: action
  params: []
- id: ns_repeat_all
  label: Repeat All
  kind: action
  params: []
- id: ns_repeat_off
  label: Repeat Off
  kind: action
  params: []
- id: ns_random_on
  label: Random On / Shuffle Songs
  kind: action
  params: []
- id: ns_random_off
  label: Random Off / Shuffle Off
  kind: action
  params: []
- id: ns_toggle_ipod_mode
  label: Toggle iPod Mode/On Screen Mode
  kind: action
  params: []
- id: ns_page_next
  label: Page Next
  kind: action
  params: []
- id: ns_page_prev
  label: Page Previous
  kind: action
  params: []
- id: ns_repeat_toggle
  label: Repeat Toggle
  kind: action
  params: []
- id: ns_random_toggle
  label: Random Toggle
  kind: action
  params: []
- id: ns_preset_call
  label: Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35 (2014 AVR); some models 00-55"
- id: ns_preset_memory
  label: Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35 (2014 AVR); some models 00-55"
- id: ns_net_query
  label: Query Net Audio Preset Name Status
  kind: action
  params: []
- id: ns_add_favorites
  label: Add Favorites Folder
  kind: action
  params: []
- id: ns_onscreen_query
  label: Query Onscreen Display Information
  kind: action
  params: []
- id: nse_query
  label: Request Onscreen Display Information List
  kind: action
  params: []
```

## Feedbacks
```yaml
# Responses to query commands (? suffix) return the same command format with current value.
# Events are sent unsolicited when state changes (within 5 seconds).
# All responses follow the same format as the command that triggers them.

- id: power_status
  type: enum
  values:
    - PWON
    - PWSTANDBY
  description: Power state response to PW? query

- id: master_volume_status
  type: string
  description: MV value (2 or 3 digit ASCII) in response to MV? query; 80=0dB, 00=minimum

- id: mute_status
  type: enum
  values:
    - MUON
    - MUOFF

- id: input_status
  type: string
  description: SI*** response to SI? query (e.g., SIDVD)

- id: main_zone_status
  type: enum
  values:
    - ZMON
    - ZMOFF

- id: volume_status
  type: string
  description: "Z2/Z3 volume value: 00-98, 80=0dB"

- id: tuner_frequency
  type: string
  description: TFAN*** in response to TFAN?; AM in kHz (>050000), FM in MHz (<050000)

- id: tuner_preset_status
  type: string
  description: TPAN** or TPHD** response; TPANOFF when no preset

- id: tuner_band_status
  type: enum
  values:
    - TMANAM
    - TMANFM
    - TMHDAM
    - TMHDFM

- id: surround_mode_status
  type: string
  description: MS*** response to MS? query

- id: hd_radio_status
  type: object
  description: |
    HD? returns multiple fields:
    - HDST NAME******** (20 chars)
    - HDSIG LEV 0-6
    - HDMLT CURRCH* (current channel)
    - HDMLT CAST CH* (multi cast channel number)
    - HDPTY (18 digits)
    - HDARTIST (40 digits)
    - HDTITLE (40 digits)
    - HDALBUM (40 digits)
    - HDGENRE (23 digits)
    - HDMODE DIGITAL/ANALOG

- id: channel_volume_status
  type: object
  description: |
    CVFL 50, CVFR 50, etc. in response to CV? query.
    Only speakers configured in speaker configuration respond.
    CVEND terminates the response list.

- id: zone_status
  type: enum
  values:
    - Z2ON
    - Z2OFF
    - Z3ON
    - Z3OFF

- id: onscreen_display
  type: string
  description: "NSA0-NSA8 returned by NSA query; up to 96 bytes per line"
```

## Variables
```yaml
# UNRESOLVED: The protocol uses a command-response model where variables are
# queried with ? commands and the response format matches the set command format.
# There is no separate Variables section in the source document - all state
# is retrieved via query commands (PW?, MV?, SI?, etc.) and unsolicted EVENTS.
# Variables section retained for future clarification if needed.
```

## Events
```yaml
# The source describes EVENT messages sent unsolicited from the AVR when state changes.
# EVENT format matches COMMAND format.
# EVENT is sent within 5 seconds of state change.
# Commands are receivable during EVENT transmission (half-duplex).

- id: power_event
  type: enum
  values:
    - PWON
    - PWSTANDBY
  description: Sent when power state changes

- id: input_changed_event
  type: string
  description: SI*** sent when input source changes; also returns CVFL, etc. for channel volumes

- id: surround_mode_changed_event
  type: string
  description: MS*** sent when surround mode changes; if mode unchanged, no event sent

- id: channel_volume_changed_event
  type: string
  description: CVFL**, CVFR**, etc. sent when channel volume changes (only for configured channels)

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
  description: MSQUICK? status returned after memory operation

- id: tuner_event
  type: string
  description: TFAN or TPAN response when tuner frequency or preset changes
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
      the next command. Document states: "1 second later, please transmit
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
**Protocol format:** ASCII commands, 2-character command code + parameter (up to 25 chars) + CR (0x0D). ASCII range 0x20–0x7F only.

**Command timing:** 50ms minimum interval between commands. RESPONSE within 200ms. EVENT within 5 seconds of state change.

**Volume encoding:** Master volume uses 2-digit ASCII (00–98) where 80 = 0dB. 0.5dB steps use 3-digit format (e.g., MV805 for +0.5dB). Channel volume uses 38–62 range where 50 = 0dB; subwoofer uses 00, 38–62.

**Multi-zone behavior:** Zone2/Z3 source commands mirror Main Zone input selection commands (e.g., Z2DVD mirrors SIDVD). Zone status changes trigger Z2/Z3 events rather than SR events when in Zone2 mode. When in REC mode, Z2 status commands return SR status instead.

**Auro-3D commands:** SHL, SHR, TS (surround height and top surround) are only available on units with Auro-3D upgrade. Commands return CVSHL**, CVSHR**, CVTS** or error on non-upgraded units.

**HDMI audio:** Zone2 HDMI output can be set to Through (passthrough) or PCM via Z2HDA command.

**Zone channel volume:** Zone2/3 only supports FL (Front Left) and FR (Front Right) channel volume control, unlike Main Zone which supports all channels via CV commands.

<!-- UNRESOLVED: Entity ID is provided as placeholder. Verify entity_id in Convex dashboard before ingestion. -->
<!-- UNRESOLVED: Compatible models list contains generic "Marantz Universal Discrete Functions" — document does not specify exact model numbers the protocol applies to. Specific AVR model names (X1100, S700, X4100, etc.) appear as footnotes in the source but no definitive model compatibility matrix is provided. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Authentication credentials not applicable (auth.type: none inferred from no login procedure in source). -->
<!-- UNRESOLVED: TCP port 23 stated for Ethernet/Telnet; no alternative ports documented. -->

## Provenance

```yaml
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:45.631Z
retrieved_at: 2026-04-29T11:13:45.631Z
last_checked_at: 2026-04-23T08:13:13.540Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:13:13.540Z
matched_actions: 700
action_count: 700
confidence: high
summary: "All 700 spec actions matched literal command mnemonics in source; transport parameters (port 23, 9600 baud) verified verbatim; comprehensive bidirectional coverage of Marantz discrete protocol."
```

## Known Gaps

```yaml
[]
```
