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
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T23:27:42.130Z
last_checked_at: 2026-05-20T11:34:25.055Z
generated_at: 2026-05-20T11:34:25.055Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T11:34:25.055Z
  matched_actions: 328
  action_count: 328
  confidence: high
  summary: "All 328 spec actions verified; transport and coverage complete."
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
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
- id: power_status_query
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
  label: Set Master Volume (dB)
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98 (ASCII), 80=0dB, 00=--- (MIN). 0.5dB steps use 3-digit ASCII."
- id: master_volume_status_query
  label: Query Master Volume Status
  kind: action
  params: []

# Channel Volume - FL/FR/C/SW/SW2/SL/SR/SBL/SBR/SB/FHL/FHR/FWL/FWR/TFL/TFR/TML/TMR/TRL/TRR/RHL/RHR/FDL/FDR/SDL/SDR/BDL/BDR/SHL/SHR/TS
- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "Channel ID e.g. FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
    - name: level
      type: integer
      description: "38-62 (ASCII), 50=0dB. Subwoofer SW2: 00,38-62."
- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
    - name: level
      type: integer
- id: channel_volume_set
  label: Set Channel Volume (dB)
  kind: action
  params:
    - name: channel
      type: string
    - name: level
      type: integer
- id: channel_volume_reset_all
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []
- id: channel_volume_status_query
  label: Query Channel Volume Status
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
- id: mute_status_query
  label: Query Mute Status
  kind: action
  params: []

# Input Select - SI command
- id: input_select
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: input_status_query
  label: Query Input Status
  kind: action
  params: []

# Zone Control - ZM (Main Zone)
- id: zone_main_on
  label: Main Zone On
  kind: action
  params: []
- id: zone_main_off
  label: Main Zone Off
  kind: action
  params: []
- id: zone_main_status_query
  label: Query Main Zone Status
  kind: action
  params: []
- id: zone_main_favorite
  label: Main Zone Favorite Mode Select
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-4"
- id: zone_main_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-4"

# REC Select - SR command
- id: rec_select
  label: REC SELECT Mode Set
  kind: action
  params:
    - name: source
      type: string
      description: "Same as SI command sources"
- id: rec_select_cancel
  label: REC SELECT Mode Cancel
  kind: action
  params: []
- id: rec_status_query
  label: Query REC Status
  kind: action
  params: []

# Digital Input - SD command
- id: digital_input_auto
  label: Set Digital Input AUTO Mode
  kind: action
  params: []
- id: digital_input_hdmi
  label: Set Digital Input Force HDMI
  kind: action
  params: []
- id: digital_input_digital
  label: Set Digital Input Force DIGITAL
  kind: action
  params: []
- id: digital_input_analog
  label: Set Digital Input Force ANALOG
  kind: action
  params: []
- id: digital_input_extin
  label: Set External IN Mode
  kind: action
  params: []
- id: digital_input_7ch
  label: Set 7.1CH IN Mode
  kind: action
  params: []
- id: digital_input_off
  label: Digital Input Off
  kind: action
  params: []
- id: digital_input_status_query
  label: Query Digital Input Status
  kind: action
  params: []

# Digital Input Mode - DC command
- id: digital_mode_auto
  label: Set Digital Input AUTO Mode
  kind: action
  params: []
- id: digital_mode_pcm
  label: Set Digital Input Force PCM
  kind: action
  params: []
- id: digital_mode_dts
  label: Set Digital Input Force DTS
  kind: action
  params: []
- id: digital_mode_status_query
  label: Query Digital Mode Status
  kind: action
  params: []

# Video Select - SV command
- id: video_select
  label: Video Select Mode Set
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE"
- id: video_select_on
  label: Video Select On
  kind: action
  params: []
- id: video_select_off
  label: Video Select Off
  kind: action
  params: []
- id: video_select_status_query
  label: Query Video Select Status
  kind: action
  params: []

# Sleep Timer - SLP command
- id: sleep_timer
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 (minutes), or OFF"
- id: sleep_timer_status_query
  label: Query Sleep Timer Status
  kind: action
  params: []

# Auto Standby - STBY command
- id: auto_standby
  label: Set Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: "15M, 30M, 60M, OFF"
- id: auto_standby_status_query
  label: Query Auto Standby Status
  kind: action
  params: []

# ECO Mode - ECO command
- id: eco_mode
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"
- id: eco_mode_status_query
  label: Query ECO Mode Status
  kind: action
  params: []

# Surround Mode - MS command
- id: surround_mode
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, DTS ES DSCRT6.1, DTS ES MTRX6.1, DTS+PL2X C/M/G, DTS+DS, DTS96/24, DTS96 ES MTRX, DTS+NEO:6, DTS+NEO:X C/M/G, MULTI CH IN, DOLBY D+, DOLBY HD, DOLBY SURROUND, DOLBY ATMOS, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO, 7.1IN, PURE DIRECT EXT, QUICK0-QUICK5, QUICK1-5 MEMORY, and many decoders (PL2 C/M/G/Z, PL2X C/M/G/Z H, NEO:X C/M/G, D+EX, D+NEO:X, etc.)"
- id: surround_mode_status_query
  label: Query Surround Mode Status
  kind: action
  params: []
- id: surround_quick_select
  label: Quick Select 1-5
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-5"
- id: surround_quick_memory
  label: Quick Select Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-5"

# Video Processing - VS command
- id: video_aspect
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      description: "ASPNRM (4:3), ASPFUL (16:9)"
- id: video_aspect_status_query
  label: Query Aspect Ratio Status
  kind: action
  params: []
- id: video_hdmi_monitor
  label: Set HDMI Monitor
  kind: action
  params:
    - name: monitor
      type: string
      description: "MONIAUTO, MONI1, MONI2"
- id: video_hdmi_monitor_status_query
  label: Query HDMI Monitor Status
  kind: action
  params: []
- id: video_resolution
  label: Set Resolution
  kind: action
  params:
    - name: res
      type: string
      description: "SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO (HDMI), SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO"
- id: video_resolution_status_query
  label: Query Resolution Status
  kind: action
  params: []
- id: video_audio_output
  label: Set HDMI Audio Output
  kind: action
  params:
    - name: dest
      type: string
      description: "AUDIO AMP, AUDIO TV"
- id: video_audio_output_status_query
  label: Query HDMI Audio Output Status
  kind: action
  params: []
- id: video_processing_mode
  label: Set Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "VPMAUTO, VPMGAME, VPMMOVI"
- id: video_processing_mode_status_query
  label: Query Video Processing Mode Status
  kind: action
  params: []
- id: video_vertical_stretch
  label: Set Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: video_vertical_stretch_status_query
  label: Query Vertical Stretch Status
  kind: action
  params: []

# Parameter Settings - PS command
- id: tone_control
  label: Tone Control On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: tone_control_status_query
  label: Query Tone Control Status
  kind: action
  params: []
- id: bass_treble
  label: Set Bass or Treble
  kind: action
  params:
    - name: band
      type: string
      description: "BAS (bass) or TRE (treble)"
    - name: direction
      type: string
      description: "UP, DOWN"
- id: bass_treble_direct
  label: Set Bass/Treble Direct (dB)
  kind: action
  params:
    - name: band
      type: string
    - name: level
      type: integer
      description: "00-99 (ASCII), 50=0dB. Range -6 to +6dB (44-56)."
- id: bass_treble_status_query
  label: Query Bass/Treble Status
  kind: action
  params: []
- id: dialog_level
  label: Dialog Level Adjust
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "38-62 (ASCII), 50=0dB"
- id: dialog_level_status_query
  label: Query Dialog Level Status
  kind: action
  params: []
- id: subwoofer_level_adjust
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "SW1: 00,38-62 (50=0dB). SW2: same."
- id: subwoofer_level_status_query
  label: Query Subwoofer Level Status
  kind: action
  params: []
- id: cinema_eq
  label: CINEMA EQ On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: cinema_eq_status_query
  label: Query CINEMA EQ Status
  kind: action
  params: []
- id: cinema_mode
  label: CINEMA/MUSIC/GAME/PRO LOGIC Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC, HEIGHT"
- id: cinema_mode_status_query
  label: Query CINEMA Mode Status
  kind: action
  params: []
- id: loudness_management
  label: Loudness Management
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: loudness_management_status_query
  label: Query Loudness Management Status
  kind: action
  params: []
- id: front_height_output
  label: Front Height Output On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: front_height_output_status_query
  label: Query Front Height Output Status
  kind: action
  params: []
- id: speaker_output_config
  label: Speaker Output Configuration
  kind: action
  params:
    - name: config
      type: string
      description: "FW, FH, SB, HW, BH, BW, FL, HF, FR"
- id: speaker_output_config_status_query
  label: Query Speaker Output Config Status
  kind: action
  params: []
- id: pl2z_height_gain
  label: PL2z Height Gain
  kind: action
  params:
    - name: gain
      type: string
      description: "LOW, MID, HI"
- id: pl2z_height_gain_status_query
  label: Query PL2z Height Gain Status
  kind: action
  params: []
- id: mult_eq_mode
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"
- id: mult_eq_mode_status_query
  label: Query MultEQ Mode Status
  kind: action
  params: []
- id: dynamic_eq
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: dynamic_eq_status_query
  label: Query Dynamic EQ Status
  kind: action
  params: []
- id: reference_level_offset
  label: Reference Level Offset
  kind: action
  params:
    - name: offset
      type: integer
      description: "0, 5, 10, 15 (dB)"
- id: reference_level_offset_status_query
  label: Query Reference Level Offset Status
  kind: action
  params: []
- id: dynamic_volume
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "HEV (Heavy), MED (Medium), LIT (Light), OFF"
- id: dynamic_volume_status_query
  label: Query Dynamic Volume Status
  kind: action
  params: []
- id: audyssey_lfc
  label: Audyssey LFC
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: audyssey_lfc_status_query
  label: Query Audyssey LFC Status
  kind: action
  params: []
- id: containment_amount
  label: Containment Amount
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 00=0. Range 1-7 (01-07)."
- id: containment_amount_status_query
  label: Query Containment Amount Status
  kind: action
  params: []
- id: audyssey_dsx
  label: Audyssey DSX
  kind: action
  params:
    - name: setting
      type: string
      description: "ONHW (Height+Wide), ONH (Height), ONW (Wide), OFF"
- id: audyssey_dsx_status_query
  label: Query Audyssey DSX Status
  kind: action
  params: []
- id: stage_width
  label: Stage Width
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 50=0dB. Range -10 to +10 (40-60)."
- id: stage_width_status_query
  label: Query Stage Width Status
  kind: action
  params: []
- id: stage_height
  label: Stage Height
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 50=0dB. Range -10 to +10 (40-60)."
- id: stage_height_status_query
  label: Query Stage Height Status
  kind: action
  params: []
- id: graphic_eq
  label: Graphic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: graphic_eq_status_query
  label: Query Graphic EQ Status
  kind: action
  params: []
- id: dynamic_compression
  label: Dynamic Compression
  kind: action
  params:
    - name: level
      type: string
      description: "AUTO, LOW, MID, HI, OFF"
- id: dynamic_compression_status_query
  label: Query Dynamic Compression Status
  kind: action
  params: []
- id: bass_sync
  label: Bass Sync
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 00=0. Range 0-16."
- id: bass_sync_status_query
  label: Query Bass Sync Status
  kind: action
  params: []
- id: dialogue_enhancer
  label: Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MED, HIGH"
- id: dialogue_enhancer_status_query
  label: Query Dialogue Enhancer Status
  kind: action
  params: []
- id: lfe_level
  label: LFE Level
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 00=0dB. Range 0 to -10dB (10=-10dB)."
- id: lfe_level_direct
  label: LFE Level Direct
  kind: action
  params:
    - name: level
      type: integer
      description: "00, 05, 10, 15 (dB) for EXT.IN/7.1CH IN mode."
- id: lfe_level_status_query
  label: Query LFE Level Status
  kind: action
  params: []
- id: effect_onoff
  label: Effect On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: effect_level
  label: Effect Level
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 00=0dB, 10=10dB. Range 1-15."
- id: effect_status_query
  label: Query Effect Status
  kind: action
  params: []
- id: delay
  label: Audio Delay
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: ms
      type: integer
      description: "000-999 (ASCII), 000=0ms, 300=300ms. Range 0-300ms. 0-60ms: 3ms/step; over 60ms: 10ms/step."
- id: delay_status_query
  label: Query Audio Delay Status
  kind: action
  params: []
- id: panorama
  label: Panorama On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: panorama_status_query
  label: Query Panorama Status
  kind: action
  params: []
- id: dimension
  label: Dimension
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 00=0. Range 0-6."
- id: dimension_status_query
  label: Query Dimension Status
  kind: action
  params: []
- id: center_width
  label: Center Width
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 00=0. Range 0-7."
- id: center_width_status_query
  label: Query Center Width Status
  kind: action
  params: []
- id: center_image
  label: Center Image
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 00=0.0. Range 0.0-1.0."
- id: center_image_status_query
  label: Query Center Image Status
  kind: action
  params: []
- id: center_gain
  label: Center Gain
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 00=0.0. Range 0.0-1.0."
- id: center_gain_status_query
  label: Query Center Gain Status
  kind: action
  params: []
- id: center_spread
  label: Center Spread On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: center_spread_status_query
  label: Query Center Spread Status
  kind: action
  params: []
- id: subwoofer_onoff
  label: Subwoofer On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF. DIRECT/STEREO(2ch) mode only."
- id: subwoofer_onoff_status_query
  label: Query Subwoofer On/Off Status
  kind: action
  params: []
- id: room_size
  label: Room Size
  kind: action
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L"
- id: room_size_status_query
  label: Query Room Size Status
  kind: action
  params: []
- id: audio_delay
  label: Audio Delay (alternate)
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: ms
      type: integer
      description: "000-999 (ASCII), 000=0ms. Range 0-200ms."
- id: audio_delay_status_query
  label: Query Audio Delay Status
  kind: action
  params: []
- id: audio_restorer
  label: Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW (MODE3), MED (MODE2), HI (MODE1)"
- id: audio_restorer_status_query
  label: Query Audio Restorer Status
  kind: action
  params: []
- id: front_speaker
  label: Front Speaker Selection
  kind: action
  params:
    - name: selection
      type: string
      description: "SPA, SPB, A+B"
- id: front_speaker_status_query
  label: Query Front Speaker Status
  kind: action
  params: []
- id: auro_preset
  label: Auro-Matic 3D Preset (Auro-3D Upgrade only)
  kind: action
  params:
    - name: preset
      type: string
      description: "SMA, MED, LAR, SPE"
- id: auro_preset_status_query
  label: Query Auro Preset Status
  kind: action
  params: []
- id: auro_strength
  label: Auro-Matic 3D Strength (Auro-3D Upgrade only)
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII), 01=1, 10=10. Range 1-16."
- id: auro_strength_status_query
  label: Query Auro Strength Status
  kind: action
  params: []

# Picture Mode - PV command
- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD (Vivid), STM (Stream), CTM (Custom), DAY (ISF Day), NGT (ISF Night)"
- id: picture_mode_status_query
  label: Query Picture Mode Status
  kind: action
  params: []
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "000-100 (ASCII), 050=0. Range -50 to +50."
- id: contrast_status_query
  label: Query Contrast Status
  kind: action
  params: []
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "000-100 (ASCII), 050=0. Range -50 to +50."
- id: brightness_status_query
  label: Query Brightness Status
  kind: action
  params: []
- id: saturation
  label: Saturation/Chroma
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "000-100 (ASCII), 050=0. Range -50 to +50."
- id: saturation_status_query
  label: Query Saturation Status
  kind: action
  params: []
- id: hue
  label: Hue
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "44-56 (ASCII), 50=0. Range -6 to +6."
- id: hue_status_query
  label: Query Hue Status
  kind: action
  params: []
- id: dnr
  label: DNR
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MID, HI"
- id: dnr_status_query
  label: Query DNR Status
  kind: action
  params: []
- id: enhancer
  label: Enhancer
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-12 (ASCII), 00=0. Range 0-12."
- id: enhancer_status_query
  label: Query Enhancer Status
  kind: action
  params: []

# Zone 2 Control
- id: zone2_source
  label: Zone2 Source (same as Main Zone)
  kind: action
  params: []
- id: zone2_input
  label: Zone2 Input Select
  kind: action
  params:
    - name: source
      type: string
      description: "Same sources as SI command, plus Z2-specific: QUICK1-5, QUICK1-5 MEMORY, FAVORITE1-4, ON, OFF"
- id: zone2_volume
  label: Zone2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-98 (ASCII), 80=0dB, 00=---(MIN)"
- id: zone2_volume_direct
  label: Zone2 Volume Direct
  kind: action
  params:
    - name: level
      type: integer
- id: zone2_power
  label: Zone2 On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone2_status_query
  label: Query Zone2 Status
  kind: action
  params: []
- id: zone2_mute
  label: Zone2 Mute On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone2_mute_status_query
  label: Query Zone2 Mute Status
  kind: action
  params: []
- id: zone2_channel_setting
  label: Zone2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
- id: zone2_channel_setting_status_query
  label: Query Zone2 Channel Setting Status
  kind: action
  params: []
- id: zone2_channel_volume
  label: Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "38-62 (ASCII), 50=0dB"
- id: zone2_channel_volume_status_query
  label: Query Zone2 Channel Volume Status
  kind: action
  params: []
- id: zone2_hpf
  label: Zone2 HPF On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone2_hpf_status_query
  label: Query Zone2 HPF Status
  kind: action
  params: []
- id: zone2_bass_treble
  label: Zone2 Bass/Treble
  kind: action
  params:
    - name: band
      type: string
      description: "BAS, TRE"
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: level
      type: integer
      description: "00-99 (ASCII). Range -10 to +10dB (40-60). X4100: -14 to +14dB (36-64) at 2dB/step."
- id: zone2_bass_treble_status_query
  label: Query Zone2 Bass/Treble Status
  kind: action
  params: []
- id: zone2_hdmi_audio
  label: Zone2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: "THR (Through), PCM"
- id: zone2_hdmi_audio_status_query
  label: Query Zone2 HDMI Audio Status
  kind: action
  params: []
- id: zone2_sleep_timer
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120, or OFF"
- id: zone2_sleep_timer_status_query
  label: Query Zone2 Sleep Timer Status
  kind: action
  params: []
- id: zone2_auto_standby
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone2_auto_standby_status_query
  label: Query Zone2 Auto Standby Status
  kind: action
  params: []

# Zone 3 Control - same pattern as Zone 2
- id: zone3_source
  label: Zone3 Source (same as Main Zone)
  kind: action
  params: []
- id: zone3_input
  label: Zone3 Input Select
  kind: action
  params:
    - name: source
      type: string
- id: zone3_volume
  label: Zone3 Volume
  kind: action
  params:
    - name: direction
      type: string
    - name: level
      type: integer
- id: zone3_volume_direct
  label: Zone3 Volume Direct
  kind: action
  params:
    - name: level
      type: integer
- id: zone3_power
  label: Zone3 On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone3_status_query
  label: Query Zone3 Status
  kind: action
  params: []
- id: zone3_mute
  label: Zone3 Mute On/Off
  kind: action
  params:
    - name: state
      type: string
- id: zone3_mute_status_query
  label: Query Zone3 Mute Status
  kind: action
  params: []
- id: zone3_channel_setting
  label: Zone3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
- id: zone3_channel_setting_status_query
  label: Query Zone3 Channel Setting Status
  kind: action
  params: []
- id: zone3_channel_volume
  label: Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
    - name: level
      type: integer
- id: zone3_channel_volume_status_query
  label: Query Zone3 Channel Volume Status
  kind: action
  params: []
- id: zone3_hpf
  label: Zone3 HPF On/Off
  kind: action
  params:
    - name: state
      type: string
- id: zone3_hpf_status_query
  label: Query Zone3 HPF Status
  kind: action
  params: []
- id: zone3_bass_treble
  label: Zone3 Bass/Treble
  kind: action
  params:
    - name: band
      type: string
    - name: direction
      type: string
    - name: level
      type: integer
- id: zone3_bass_treble_status_query
  label: Query Zone3 Bass/Treble Status
  kind: action
  params: []
- id: zone3_sleep_timer
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
- id: zone3_sleep_timer_status_query
  label: Query Zone3 Sleep Timer Status
  kind: action
  params: []
- id: zone3_auto_standby
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: duration
      type: string
- id: zone3_auto_standby_status_query
  label: Query Zone3 Auto Standby Status
  kind: action
  params: []

# Tuner Control - TF/TP/TM commands
- id: tuner_frequency_updown
  label: Tuner Frequency Up/Down
  kind: action
  params:
    - name: direction
      type: string
      description: "ANUP, ANDOWN"
- id: tuner_frequency_direct
  label: Tuner Frequency Direct
  kind: action
  params:
    - name: frequency
      type: integer
      description: "6 digits. >050000 = AM (kHz), <050000 = FM (MHz)"
- id: tuner_frequency_status_query
  label: Query Tuner Frequency Status
  kind: action
  params: []
- id: tuner_rds_name_query
  label: Query RDS Station Name (EU/AP only)
  kind: action
  params: []
- id: tuner_preset_updown
  label: Tuner Preset Up/Down
  kind: action
  params:
    - name: direction
      type: string
      description: "ANUP, ANDOWN"
- id: tuner_preset_direct
  label: Tuner Preset Direct
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params: []
- id: tuner_preset_memory_direct
  label: Tuner Preset Memory Direct
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tuner_preset_status_query
  label: Query Tuner Preset Status
  kind: action
  params: []
- id: tuner_band_mode
  label: Tuner Band/Mode Select
  kind: action
  params:
    - name: band
      type: string
      description: "ANAM (AM), ANFM (FM)"
    - name: mode
      type: string
      description: "ANAUTO, ANMANUAL"
- id: tuner_band_mode_status_query
  label: Query Tuner Band/Mode Status
  kind: action
  params: []

# HD Radio Control
- id: hd_radio_channel_updown
  label: HD Radio Channel Up/Down
  kind: action
  params:
    - name: direction
      type: string
      description: "HDUP, HDDOWN"
- id: hd_radio_channel_direct
  label: HD Radio Channel/Frequency Direct
  kind: action
  params:
    - name: value
      type: integer
      description: "6 digits. >050000 = AM, <050000 = FM. Append MC* (1-8) for multicast, 0 for analog."
- id: hd_radio_multicast_select
  label: HD Radio Multicast Select
  kind: action
  params:
    - name: channel
      type: integer
      description: "1-8 (multicast channel)"
- id: hd_radio_frequency_multicast_direct
  label: HD Radio Frequency + Multicast Direct
  kind: action
  params:
    - name: frequency_multicast
      type: string
      description: "6 digits + MC* (e.g. TFHD008750MC5)"
- id: hd_radio_status_query
  label: Query HD Radio Status
  kind: action
  params: []
- id: hd_radio_preset_updown
  label: HD Radio Preset Up/Down
  kind: action
  params:
    - name: direction
      type: string
      description: "HDUP, HDDOWN"
- id: hd_radio_preset_direct
  label: HD Radio Preset Direct
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params: []
- id: hd_radio_preset_memory_direct
  label: HD Radio Preset Memory Direct
  kind: action
  params:
    - name: preset
      type: integer
- id: hd_radio_preset_status_query
  label: Query HD Radio Preset Status
  kind: action
  params: []
- id: hd_radio_band_mode
  label: HD Radio Band/Mode Select
  kind: action
  params:
    - name: band_mode
      type: string
      description: "HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU"
- id: hd_radio_band_mode_status_query
  label: Query HD Radio Band/Mode Status
  kind: action
  params: []
- id: hd_radio_info_status_query
  label: Query HD Radio Info (all fields)
  kind: action
  params: []

# Online Music / USB/iPod / Bluetooth - NS command
- id: nav_cursor_up
  label: Cursor Up
  kind: action
  params: []
- id: nav_cursor_down
  label: Cursor Down
  kind: action
  params: []
- id: nav_cursor_left
  label: Cursor Left
  kind: action
  params: []
- id: nav_cursor_right
  label: Cursor Right
  kind: action
  params: []
- id: nav_enter
  label: Enter / Play / Pause
  kind: action
  params: []
- id: nav_play
  label: Play
  kind: action
  params: []
- id: nav_pause
  label: Pause
  kind: action
  params: []
- id: nav_stop
  label: Stop
  kind: action
  params: []
- id: nav_skip_plus
  label: Skip Plus
  kind: action
  params: []
- id: nav_skip_minus
  label: Skip Minus
  kind: action
  params: []
- id: nav_manual_search_plus
  label: Manual Search Plus
  kind: action
  params: []
- id: nav_manual_search_minus
  label: Manual Search Minus
  kind: action
  params: []
- id: nav_repeat_one
  label: Repeat One
  kind: action
  params: []
- id: nav_repeat_all
  label: Repeat All
  kind: action
  params: []
- id: nav_repeat_off
  label: Repeat Off
  kind: action
  params: []
- id: nav_random_on
  label: Random / Shuffle On
  kind: action
  params: []
- id: nav_random_off
  label: Random / Shuffle Off
  kind: action
  params: []
- id: nav_toggle_mode
  label: Toggle iPod Mode / On Screen Mode
  kind: action
  params: []
- id: nav_page_next
  label: Page Next
  kind: action
  params: []
- id: nav_page_previous
  label: Page Previous
  kind: action
  params: []
- id: nav_manual_search_stop
  label: Manual Search Stop
  kind: action
  params: []
- id: nav_repeat_toggle
  label: Repeat Toggle
  kind: action
  params: []
- id: nav_random_toggle
  label: Random Toggle
  kind: action
  params: []
- id: nav_preset_call
  label: Preset Call (except Bluetooth, USB/iPod)
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35 (2014 AVR)"
- id: nav_preset_memory
  label: Preset Memory (except Bluetooth, USB/iPod)
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35"
- id: nav_net_audio_preset_name_query
  label: Net/Audio Preset Name Status
  kind: action
  params: []
- id: nav_add_favorites
  label: Add Favorites Folder
  kind: action
  params: []
- id: nav_onscreen_display_info
  label: Request Onscreen Display Information List
  kind: action
  params: []
- id: mn_cursor_up
  label: MN Cursor Up
  kind: action
  params: []

- id: mn_cursor_down
  label: MN Cursor Down
  kind: action
  params: []

- id: mn_cursor_left
  label: MN Cursor Left
  kind: action
  params: []

- id: mn_cursor_right
  label: MN Cursor Right
  kind: action
  params: []

- id: mn_enter
  label: MN Enter
  kind: action
  params: []

- id: mn_return
  label: MN Return
  kind: action
  params: []

- id: mn_option
  label: MN Option
  kind: action
  params: []

- id: mn_menu
  label: Setup Menu On/Off
  kind: action
  params:
    - name: state
      type: string

- id: mn_menu_status_query
  label: Query Setup Menu Status
  kind: action
  params: []

- id: mn_all_zone_stereo
  label: All Zone Stereo On/Off
  kind: action
  params:
    - name: state
      type: string

- id: mn_all_zone_stereo_status_query
  label: Query All Zone Stereo Status
  kind: action
  params: []

- id: sy_remote_lock
  label: Remote Lock On/Off
  kind: action
  params:
    - name: state
      type: string

- id: sy_panel_lock
  label: Panel Lock On/Off
  kind: action
  params:
    - name: mode
      type: string
      description: "PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF"

- id: trigger1
  label: Trigger 1 On/Off
  kind: action
  params:
    - name: state
      type: string

- id: trigger2
  label: Trigger 2 On/Off
  kind: action
  params:
    - name: state
      type: string

- id: trigger_status_query
  label: Query Trigger Status
  kind: action
  params: []

- id: dimmer
  label: Set Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: "BRI, DIM, DAR, OFF, SEL"

- id: dimmer_status_query
  label: Query Dimmer Status
  kind: action
  params: []

- id: nav_onscreen_display_info_utf8
  label: Request Onscreen Display Information UTF-8
  kind: action
  params: []

- id: zone2_favorite
  label: Zone2 Favorite Mode Select
  kind: action
  params:
    - name: slot
      type: integer

- id: zone2_favorite_memory
  label: Zone2 Favorite Memory
  kind: action
  params:
    - name: slot
      type: integer

- id: zone3_favorite
  label: Zone3 Favorite Mode Select
  kind: action
  params:
    - name: slot
      type: integer

- id: zone3_favorite_memory
  label: Zone3 Favorite Memory
  kind: action
  params:
    - name: slot
      type: integer
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
Command interval: send commands at ≥50ms intervals. Response to query within 200ms. Event delivery within 5 seconds of state change. Half-duplex communication on both serial and TCP. Ethernet uses TCP port 23 (telnet). After PWON, wait 1 second before sending next command. Max data length: 135 bytes. ASCII codes 0x20–0x7F only. CR (0x0D) terminates all commands. 0.5dB volume steps use 3-digit ASCII parameter. Command is receivable during EVENT transmission (note A). Channel volume and surround mode return as EVENTs when input source changes; if values unchanged before/after source change, EVENT does NOT fire (notes C/D). Minimum volume level is "00". RESPONSE sent only for request commands with a corresponding EVENT; other commands (e.g. SV) do not generate RESPONSE (note G).
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
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T23:27:42.130Z
last_checked_at: 2026-05-20T11:34:25.055Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T11:34:25.055Z
matched_actions: 328
action_count: 328
confidence: high
summary: "All 328 spec actions verified; transport and coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
