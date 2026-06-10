---
spec_id: admin/marantz-nr1200-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz NR1200 Series Control Spec"
manufacturer: Marantz
model_family: NR1200
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - NR1200
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T11:53:39.490Z
last_checked_at: 2026-06-09T13:09:16.535Z
generated_at: 2026-06-09T13:09:16.535Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - UGIDN
  - TPHDMEM
  - "firmware version compatibility not stated in source"
  - "no discrete settable parameters beyond actions"
  - "comprehensive event list not fully enumerated in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated"
  - "detailed event list not fully enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-06-09T13:09:16.535Z
  matched_actions: 134
  action_count: 134
  confidence: medium
  summary: "All 134 spec actions matched with correct shapes and transport; only UGIDN and TPHDMEM (HD preset memory) are unrepresented in spec. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz NR1200 Series Control Spec

## Summary
Stereo AV receiver with both RS-232C and Ethernet control interfaces. Supports TCP port 23 (Telnet) and RS-232C at 9600bps 8N1. ASCII command protocol with 2-character commands, parameter-based control for power, volume, input selection, surround mode, tuner, and multi-zone operation. No authentication required.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
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
      type: integer
      description: Volume level 0-98 ASCII, 80=0dB, 00=min
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: source
      type: string
      description: Input source (PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP)
- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
- id: surround_mode
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Surround mode (MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO, 7.1IN, QUICK1-5, QUICK1-5 MEMORY)
- id: channel_volume
  label: Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: Channel (FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS)
    - name: direction
      type: string
      description: UP, DOWN, or value (38-62 ASCII, 50=0dB)
- id: reset_channel_levels
  label: Reset All Channel Levels
  kind: action
  params: []
- id: tone_control_on
  label: Tone Control On
  kind: action
  params: []
- id: tone_control_off
  label: Tone Control Off
  kind: action
  params: []
- id: bass_up
  label: Bass Up
  kind: action
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  params: []
- id: bass_set
  label: Bass Set
  kind: action
  params:
    - name: level
      type: integer
      description: Bass level 00-99, 50=0dB, range 44-56 (-6 to +6dB)
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []
- id: treble_set
  label: Treble Set
  kind: action
  params:
    - name: level
      type: integer
      description: Treble level 00-99, 50=0dB, range 44-56 (-6 to +6dB)
- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: Video source or ON/OFF/SOURCE
- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Sleep time 001-120, OFF to cancel
- id: auto_standby
  label: Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 15M, 30M, 60M, OFF
- id: eco_mode
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF
- id: tuner_frequency
  label: Tuner Frequency
  kind: action
  params:
    - name: direction
      type: string
      description: ANUP, ANDOWN, or frequency in kHz (AM) / MHz*100 (FM)
- id: tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-56
- id: tuner_band_mode
  label: Tuner Band/Mode
  kind: action
  params:
    - name: band
      type: string
      description: ANAM (AM), ANFM (FM), ANAUTO, ANMANUAL
- id: hd_radio_channel
  label: HD Radio Channel
  kind: action
  params:
    - name: direction
      type: string
      description: HDUP, HDDOWN, or frequency
- id: hd_radio_preset
  label: HD Radio Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: HD preset 01-56
- id: zone2_on
  label: Zone2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []
- id: zone2_source
  label: Zone2 Source
  kind: action
  params:
    - name: source
      type: string
      description: Zone2 input source
- id: zone2_volume
  label: Zone2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or level 00-98
- id: zone2_mute
  label: Zone2 Mute
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: zone3_on
  label: Zone3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []
- id: zone3_source
  label: Zone3 Source
  kind: action
  params:
    - name: source
      type: string
      description: Zone3 input source
- id: zone3_volume
  label: Zone3 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or level 00-98
- id: zone3_mute
  label: Zone3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: netusb_command
  label: USB/iPod/Bluetooth Control
  kind: action
  params:
    - name: command
      type: string
      description: NS command code (90-9Z, RPT, RND, B**, C**, H, FV MEM, NSA, NSE)
- id: main_zone_favorite
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: preset
      type: integer
      description: Favorite preset 1-4
- id: main_zone_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: Favorite preset 1-4 to memorize
- id: rec_select
  label: Rec Select
  kind: action
  params:
    - name: source
      type: string
      description: Recording source or SOURCE to cancel
- id: digital_input_mode
  label: Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO
- id: digital_input_format
  label: Digital Input Format
  kind: action
  params:
    - name: format
      type: string
      description: AUTO, PCM, DTS
- id: video_aspect_ratio
  label: Video Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      description: ASPNRM (4:3) or ASPFUL (16:9)
- id: video_monitor_output
  label: Video Monitor Output
  kind: action
  params:
    - name: output
      type: string
      description: MONIAUTO, MONI1, MONI2
- id: video_resolution
  label: Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO, SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO
- id: video_hdmi_audio
  label: HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: AMP or TV
- id: video_processing_mode
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: VPMAUTO, VPMGAME, VPMMOVI
- id: vertical_stretch
  label: Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: dialog_level
  label: Dialog Level Adjust
  kind: action
  params:
    - name: value
      type: string
      description: ON, OFF, UP, DOWN, or level 38-62 ASCII 50=0dB
- id: subwoofer_level
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: subwoofer
      type: string
      description: SWL (primary) or SWL2 (secondary)
    - name: value
      type: string
      description: ON, OFF, UP, DOWN, or level 00/38-62 ASCII 50=0dB
- id: cinema_eq
  label: Cinema EQ
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: ps_mode
  label: PS Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MUSIC, CINEMA, GAME, PRO LOGIC
- id: loudness_management
  label: Loudness Management
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: front_height_output
  label: Front Height Output
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: speaker_output
  label: Speaker Output
  kind: action
  params:
    - name: config
      type: string
      description: FW, FH, SB, HW, BH, BW, FL, HF, FR
- id: pl2z_height_gain
  label: PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: LOW, MID, HI
- id: multeq_mode
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF
- id: dynamic_eq
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: reference_level_offset
  label: Reference Level Offset
  kind: action
  params:
    - name: level
      type: string
      description: 0, 5, 10, or 15 dB
- id: dynamic_volume
  label: Dynamic Volume
  kind: action
  params:
    - name: mode
      type: string
      description: HEV, MED, LIT, OFF
- id: audyssey_lfc
  label: Audyssey LFC
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: containment_amount
  label: Containment Amount
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII range 01-07
- id: audyssey_dsx
  label: Audyssey DSX
  kind: action
  params:
    - name: mode
      type: string
      description: ONHW, ONH, ONW, OFF
- id: stage_width
  label: Stage Width
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII 50=0dB range 40-60
- id: stage_height
  label: Stage Height
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII 50=0dB range 40-60
- id: graphic_eq
  label: Graphic EQ
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: dynamic_compression
  label: Dynamic Compression
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, LOW, MID, HI, OFF
- id: bass_sync
  label: Bass Sync
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII range 0-16
- id: dialogue_enhancer
  label: Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MED, HIGH
- id: lfe_level
  label: LFE Level
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII 00=0dB range 0 to -10dB
- id: lfe_level_ext
  label: LFE Level EXT/7.1CH IN Mode
  kind: action
  params:
    - name: level
      type: string
      description: 00, 05, 10, or 15
- id: effect_control
  label: Effect Control
  kind: action
  params:
    - name: value
      type: string
      description: ON, OFF, UP, DOWN, or level 00-99 ASCII range 1-15
- id: delay
  label: Delay
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 000-999 ASCII 000=0ms range 0-300ms
- id: panorama
  label: Panorama
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: dimension
  label: Dimension
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII 00=0 range 0-6
- id: center_width
  label: Center Width
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII 00=0 range 0-7
- id: center_image
  label: Center Image
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII 00=0.0 range 0.0-1.0
- id: center_gain
  label: Center Gain
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII 00=0.0 range 0.0-1.0
- id: center_spread
  label: Center Spread
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: subwoofer_direct_mode
  label: Subwoofer Direct Mode
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF (DIRECT/STEREO 2ch mode only)
- id: room_size
  label: Room Size
  kind: action
  params:
    - name: size
      type: string
      description: S, MS, M, ML, L
- id: audio_delay
  label: Audio Delay
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 000-999 ASCII 000=0ms range 0-200ms
- id: audio_restorer
  label: Audio Restorer
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW (MODE3), MED (MODE2), HI (MODE1)
- id: front_speaker
  label: Front Speaker
  kind: action
  params:
    - name: config
      type: string
      description: SPA, SPB, A+B
- id: auro_preset
  label: Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: SMA, MED, LAR, SPE
- id: auro_strength
  label: Auro-Matic 3D Strength
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII range 1-16
- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT
- id: picture_contrast
  label: Picture Contrast
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 000-100 ASCII 050=0 range -50 to +50
- id: picture_brightness
  label: Picture Brightness
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 000-100 ASCII 050=0 range -50 to +50
- id: picture_saturation
  label: Picture Saturation
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 000-100 ASCII 050=0 range -50 to +50
- id: picture_hue
  label: Picture Hue
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 44-56 ASCII 50=0 range -6 to +6
- id: picture_dnr
  label: Picture DNR
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MID, HI
- id: picture_enhancer
  label: Picture Enhancer
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-12 ASCII 00=0 range 0-12
- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: Quick select preset 1-5
- id: zone2_quick_select_memory
  label: Zone2 Quick Select Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: Quick select preset 1-5 to memorize
- id: zone2_favorite
  label: Zone2 Favorite Select
  kind: action
  params:
    - name: preset
      type: integer
      description: Favorite preset 1-4
- id: zone2_favorite_memory
  label: Zone2 Favorite Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: Favorite preset 1-4 to memorize
- id: zone2_channel_setting
  label: Zone2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: ST (Stereo) or MONO
- id: zone2_channel_volume
  label: Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL or FR
    - name: direction
      type: string
      description: UP, DOWN, or level 38-62 ASCII 50=0dB
- id: zone2_hpf
  label: Zone2 High Pass Filter
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: zone2_bass
  label: Zone2 Bass
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII range 40-60 (-10 to +10 dB)
- id: zone2_treble
  label: Zone2 Treble
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII range 40-60 (-10 to +10 dB)
- id: zone2_hdmi_audio
  label: Zone2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: THR (Through) or PCM
- id: zone2_sleep_timer
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: OFF or 001-120 ASCII
- id: zone2_auto_standby
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 2H, 4H, 8H, OFF
- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: Quick select preset 1-5
- id: zone3_quick_select_memory
  label: Zone3 Quick Select Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: Quick select preset 1-5 to memorize
- id: zone3_favorite
  label: Zone3 Favorite Select
  kind: action
  params:
    - name: preset
      type: integer
      description: Favorite preset 1-4
- id: zone3_favorite_memory
  label: Zone3 Favorite Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: Favorite preset 1-4 to memorize
- id: zone3_channel_setting
  label: Zone3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: ST (Stereo) or MONO
- id: zone3_channel_volume
  label: Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL or FR
    - name: direction
      type: string
      description: UP, DOWN, or level 38-62 ASCII 50=0dB
- id: zone3_hpf
  label: Zone3 High Pass Filter
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: zone3_bass
  label: Zone3 Bass
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII range 40-60 (-10 to +10 dB)
- id: zone3_treble
  label: Zone3 Treble
  kind: action
  params:
    - name: value
      type: string
      description: UP, DOWN, or level 00-99 ASCII range 40-60 (-10 to +10 dB)
- id: zone3_sleep_timer
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: OFF or 001-120 ASCII
- id: zone3_auto_standby
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 2H, 4H, 8H, OFF
- id: hd_radio_multicast
  label: HD Radio Multicast Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Multicast channel 1-8 or 0 for analog
- id: hd_radio_band_mode
  label: HD Radio Band and Mode
  kind: action
  params:
    - name: mode
      type: string
      description: HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU
- id: menu_cursor
  label: Menu Cursor Navigation
  kind: action
  params:
    - name: direction
      type: string
      description: CUP, CDN, CLT, CRT
- id: menu_action
  label: Menu Action
  kind: action
  params:
    - name: action
      type: string
      description: ENT, RTN, OPT, INF
- id: channel_level_menu
  label: Channel Level Adjust Menu Toggle
  kind: action
  params: []
- id: setup_menu
  label: Setup Menu
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: insta_prevue
  label: InstaPrevue
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: all_zone_stereo
  label: All Zone Stereo
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: system_lock
  label: System Lock
  kind: action
  params:
    - name: lock
      type: string
      description: REMOTE LOCK ON, REMOTE LOCK OFF, PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF
- id: trigger
  label: Trigger Output
  kind: action
  params:
    - name: trigger
      type: string
      description: 1 or 2
    - name: state
      type: string
      description: ON or OFF
- id: dimmer
  label: Display Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: BRI, DIM, DAR, OFF, or SEL (toggle)
- id: remote_maintenance
  label: Remote Maintenance
  kind: action
  params:
    - name: state
      type: string
      description: STA (start) or END
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: ANMEM (interactive) or ANMEM01-56 (direct, preset 01-56)
- id: rds_station_name
  label: RDS Station Name Query
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [PWON, PWSTANDBY]
- id: master_volume_status
  type: string
  description: Returns MV level
- id: mute_status
  type: enum
  values: [MUON, MUOFF]
- id: input_status
  type: string
  description: Returns current input source
- id: zone_status
  type: enum
  values: [ZMON, ZMOFF]
- id: zone2_status
  type: enum
  values: [Z2ON, Z2OFF]
- id: zone3_status
  type: enum
  values: [Z3ON, Z3OFF]
- id: surround_mode_status
  type: string
  description: Returns current surround mode
- id: channel_volume_status
  type: string
  description: Returns channel volume levels
- id: tuner_status
  type: string
  description: Returns tuner frequency and band
- id: hd_radio_status
  type: string
  description: Returns HD Radio status with artist/title/album/signal
- id: netusb_display
  type: string
  description: Returns onscreen display info via NSA/NSE commands
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond actions
```

## Events
```yaml
# The device sends unsolicited EVENT messages when state changes.
# Events use same format as COMMAND with parameter update.
# Key event sources:
# - Power state changes
# - Input source changes (triggers channel volume + surround mode events)
# - Volume changes (master and channel)
# - Surround mode changes
# UNRESOLVED: comprehensive event list not fully enumerated in source
```

## Macros
```yaml
# No explicit multi-step macros documented.
# Timing note: send power on command PWON, then wait 1 second before next command.
# Minimum interval between commands: 50ms.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command format: COMMAND + PARAMETER + CR (0x0D), ASCII 0x20-0x7F
- Send commands at 50ms minimum interval
- Events sent within 5 seconds of state change
- Responses sent within 200ms of query command
- 0.5dB volume steps use 3 ASCII characters (e.g., MV805 = +0.5dB, MV795 = -0.5dB)
- Maximum command/data length: 135 bytes
- Both RS-232C and Ethernet (TCP port 23) use identical command protocol
- Source documents NR1200, X1100, S700, and other Marantz AVR models; NR1200 specific commands inferred from generic AVR protocol
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: detailed event list not fully enumerated in source -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T11:53:39.490Z
last_checked_at: 2026-06-09T13:09:16.535Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T13:09:16.535Z
matched_actions: 134
action_count: 134
confidence: medium
summary: "All 134 spec actions matched with correct shapes and transport; only UGIDN and TPHDMEM (HD preset memory) are unrepresented in spec. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- UGIDN
- TPHDMEM
- "firmware version compatibility not stated in source"
- "no discrete settable parameters beyond actions"
- "comprehensive event list not fully enumerated in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated"
- "detailed event list not fully enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
