---
spec_id: admin/marantz-receiver-sr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz Receiver SR Control Spec"
manufacturer: Marantz
model_family: "Marantz Receiver SR"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "Marantz Receiver SR"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T16:45:29.002Z
last_checked_at: 2026-06-09T13:40:09.830Z
generated_at: 2026-06-09T13:40:09.830Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model variants (X1100, S700, S900) are referenced in source but no single model name is stated as the canonical name"
  - "complete response format documentation for all query commands"
  - "no discrete settable parameters beyond action commands"
  - "complete event catalog with value formats"
  - "explicit multi-step macros not documented in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated"
  - "specific model variants differ in some command applicability (noted in source)"
verification:
  verdict: verified
  checked_at: 2026-06-09T13:40:09.830Z
  matched_actions: 372
  action_count: 372
  confidence: medium
  summary: "All 372 spec actions confirmed in source with correct shapes and parameter ranges; serial 9600 8N1 and TCP port 23 verified; source command catalogue fully represented at spec granularity. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz Receiver SR Control Spec

## Summary
AV receiver with both RS-232C and Ethernet control interfaces. Protocol is ASCII-based, half-duplex, with command + parameter + CR (0x0D) structure. Supports power control, input selection, volume/mute, surround mode, zone control, tuner, HD Radio, USB/iPod, Bluetooth, and system control. No authentication required.

<!-- UNRESOLVED: specific model variants (X1100, S700, S900) are referenced in source but no single model name is stated as the canonical name -->

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
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
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
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
- id: power_status_query
  label: Power Status Query
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
    - name: value
      type: integer
      description: Volume 00-98, 80=0dB, 00=minimum (---)
- id: master_volume_status_query
  label: Master Volume Status Query
  kind: action
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_status_query
  label: Mute Status Query
  kind: action
  params: []
- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: input_status_query
  label: Input Status Query
  kind: action
  params: []
- id: surround_mode
  label: Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO, 7.1IN, PURE DIRECT EXT, QUICK1-5, QUICK1-5 MEMORY, QUICK ?"
- id: surround_status_query
  label: Surround Mode Status Query
  kind: action
  params: []
- id: channel_volume
  label: Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
    - name: direction
      type: string
      description: "UP, DOWN, or direct value **"
- id: channel_volume_reset
  label: Reset All Channel Levels
  kind: action
  params: []
- id: channel_volume_status_query
  label: Channel Volume Status Query
  kind: action
  params: []
- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
- id: main_zone_status_query
  label: Main Zone Status Query
  kind: action
  params: []
- id: main_zone_favorite
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: number
      type: integer
      description: "1-4"
- id: main_zone_favorite_memorize
  label: Main Zone Favorite Memorize
  kind: action
  params:
    - name: number
      type: integer
      description: "1-4"
- id: rec_select
  label: Record Select Mode
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI command sources
- id: rec_select_status_query
  label: Record Select Status Query
  kind: action
  params: []
- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120, or OFF"
- id: sleep_timer_status_query
  label: Sleep Timer Status Query
  kind: action
  params: []
- id: auto_standby
  label: Auto Standby
  kind: action
  params:
    - name: minutes
      type: string
      description: "15M, 30M, 60M, OFF"
- id: auto_standby_status_query
  label: Auto Standby Status Query
  kind: action
  params: []
- id: eco_mode
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"
- id: eco_mode_status_query
  label: ECO Mode Status Query
  kind: action
  params: []
- id: video_resolution
  label: Video Resolution
  kind: action
  params:
    - name: res
      type: string
      description: "48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO"
- id: video_resolution_status_query
  label: Video Resolution Status Query
  kind: action
  params: []
- id: video_resolution_hdmi
  label: Video Resolution HDMI
  kind: action
  params:
    - name: res
      type: string
      description: "H48P, H10I, H72P, H10P, H10P24, H4K, H4KF, HAUTO"
- id: video_resolution_hdmi_status_query
  label: Video Resolution HDMI Status Query
  kind: action
  params: []
- id: hdmi_monitor_select
  label: HDMI Monitor Select
  kind: action
  params:
    - name: monitor
      type: string
      description: "AUTO, MONI1, MONI2"
- id: hdmi_monitor_status_query
  label: HDMI Monitor Status Query
  kind: action
  params: []
- id: hdmi_audio_output
  label: HDMI Audio Output
  kind: action
  params:
    - name: dest
      type: string
      description: "AMP, TV"
- id: hdmi_audio_status_query
  label: HDMI Audio Status Query
  kind: action
  params: []
- id: video_processing_mode
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, GAME, MOVI"
- id: video_processing_status_query
  label: Video Processing Status Query
  kind: action
  params: []
- id: vertical_stretch
  label: Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: vertical_stretch_status_query
  label: Vertical Stretch Status Query
  kind: action
  params: []
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      description: "NRM (4:3), FUL (16:9)"
- id: aspect_ratio_status_query
  label: Aspect Ratio Status Query
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
- id: tone_control_status_query
  label: Tone Control Status Query
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
    - name: value
      type: integer
      description: "00-99, 50=0dB, range -6 to +6dB (44-56)"
- id: bass_status_query
  label: Bass Status Query
  kind: action
  params: []
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
    - name: value
      type: integer
      description: "00-99, 50=0dB, range -6 to +6dB (44-56)"
- id: treble_status_query
  label: Treble Status Query
  kind: action
  params: []
- id: dialog_level_on
  label: Dialog Level Adjust On
  kind: action
  params: []
- id: dialog_level_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
- id: dialog_level_up
  label: Dialog Level Up
  kind: action
  params: []
- id: dialog_level_down
  label: Dialog Level Down
  kind: action
  params: []
- id: dialog_level_set
  label: Dialog Level Set
  kind: action
  params:
    - name: value
      type: integer
      description: "38-62, 50=0dB"
- id: dialog_level_status_query
  label: Dialog Level Status Query
  kind: action
  params: []
- id: subwoofer_level_on
  label: Subwoofer Level Adjust On
  kind: action
  params: []
- id: subwoofer_level_off
  label: Subwoofer Level Adjust Off
  kind: action
  params: []
- id: subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  params: []
- id: subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  params: []
- id: subwoofer_level_set
  label: Subwoofer Level Set
  kind: action
  params:
    - name: channel
      type: string
      description: "SW, SW2"
    - name: value
      type: integer
      description: "00,38-62, 50=0dB"
- id: subwoofer_level_status_query
  label: Subwoofer Level Status Query
  kind: action
  params: []
- id: cinema_eq_on
  label: Cinema EQ On
  kind: action
  params: []
- id: cinema_eq_off
  label: Cinema EQ Off
  kind: action
  params: []
- id: cinema_eq_status_query
  label: Cinema EQ Status Query
  kind: action
  params: []
- id: cinema_mode
  label: Cinema/Music/Game Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC, HEIGHT"
- id: cinema_mode_status_query
  label: Cinema Mode Status Query
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
  label: Loudness Management Status Query
  kind: action
  params: []
- id: front_height_on
  label: Front Height Output On
  kind: action
  params: []
- id: front_height_off
  label: Front Height Output Off
  kind: action
  params: []
- id: front_height_status_query
  label: Front Height Status Query
  kind: action
  params: []
- id: speaker_output_config
  label: Speaker Output Configuration
  kind: action
  params:
    - name: config
      type: string
      description: "FW, FH, SB, HW, BH, BW, FL, HF, FR"
- id: speaker_output_status_query
  label: Speaker Output Status Query
  kind: action
  params: []
- id: pl2z_height_gain
  label: PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: "LOW, MID, HI"
- id: pl2z_height_gain_status_query
  label: PL2z Height Gain Status Query
  kind: action
  params: []
- id: mult_eq_mode
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"
- id: mult_eq_status_query
  label: MultEQ Status Query
  kind: action
  params: []
- id: dynamic_eq_on
  label: Dynamic EQ On
  kind: action
  params: []
- id: dynamic_eq_off
  label: Dynamic EQ Off
  kind: action
  params: []
- id: dynamic_eq_status_query
  label: Dynamic EQ Status Query
  kind: action
  params: []
- id: reference_level_offset
  label: Reference Level Offset
  kind: action
  params:
    - name: db
      type: integer
      description: "0, 5, 10, 15"
- id: reference_level_status_query
  label: Reference Level Status Query
  kind: action
  params: []
- id: dynamic_volume
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "HEV, MED, LIT, OFF"
- id: dynamic_volume_status_query
  label: Dynamic Volume Status Query
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
  label: Audyssey LFC Status Query
  kind: action
  params: []
- id: containment_amount_up
  label: Containment Amount Up
  kind: action
  params: []
- id: containment_amount_down
  label: Containment Amount Down
  kind: action
  params: []
- id: containment_amount_set
  label: Containment Amount Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0, range 1-7 (01-07)"
- id: containment_amount_status_query
  label: Containment Amount Status Query
  kind: action
  params: []
- id: audyssey_dsx_on
  label: Audyssey DSX On
  kind: action
  params:
    - name: config
      type: string
      description: "ONHW, ONH, ONW, OFF"
- id: audyssey_dsx_status_query
  label: Audyssey DSX Status Query
  kind: action
  params: []
- id: stage_width_up
  label: Stage Width Up
  kind: action
  params: []
- id: stage_width_down
  label: Stage Width Down
  kind: action
  params: []
- id: stage_width_set
  label: Stage Width Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 50=0dB, range -10 to +10 (40-60)"
- id: stage_width_status_query
  label: Stage Width Status Query
  kind: action
  params: []
- id: stage_height_up
  label: Stage Height Up
  kind: action
  params: []
- id: stage_height_down
  label: Stage Height Down
  kind: action
  params: []
- id: stage_height_set
  label: Stage Height Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 50=0dB, range -10 to +10 (40-60)"
- id: stage_height_status_query
  label: Stage Height Status Query
  kind: action
  params: []
- id: graphic_eq_on
  label: Graphic EQ On
  kind: action
  params: []
- id: graphic_eq_off
  label: Graphic EQ Off
  kind: action
  params: []
- id: graphic_eq_status_query
  label: Graphic EQ Status Query
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
  label: Dynamic Compression Status Query
  kind: action
  params: []
- id: bass_sync_up
  label: Bass Sync Up
  kind: action
  params: []
- id: bass_sync_down
  label: Bass Sync Down
  kind: action
  params: []
- id: bass_sync_set
  label: Bass Sync Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0, range 0-16"
- id: bass_sync_status_query
  label: Bass Sync Status Query
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
  label: Dialogue Enhancer Status Query
  kind: action
  params: []
- id: lfe_up
  label: LFE Up
  kind: action
  params: []
- id: lfe_down
  label: LFE Down
  kind: action
  params: []
- id: lfe_set
  label: LFE Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0dB, range -10dB"
- id: lfe_status_query
  label: LFE Status Query
  kind: action
  params: []
- id: lfe_level_direct
  label: LFE Level Direct (EXT.IN/7.1CH IN)
  kind: action
  params:
    - name: value
      type: integer
      description: "00, 05, 10, 15"
- id: lfe_level_status_query
  label: LFE Level Status Query
  kind: action
  params: []
- id: effect_on
  label: Effect On
  kind: action
  params: []
- id: effect_off
  label: Effect Off
  kind: action
  params: []
- id: effect_up
  label: Effect Level Up
  kind: action
  params: []
- id: effect_down
  label: Effect Level Down
  kind: action
  params: []
- id: effect_set
  label: Effect Level Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0dB, range 1-15"
- id: effect_status_query
  label: Effect Status Query
  kind: action
  params: []
- id: delay_up
  label: Delay Up
  kind: action
  params: []
- id: delay_down
  label: Delay Down
  kind: action
  params: []
- id: delay_set
  label: Delay Set
  kind: action
  params:
    - name: ms
      type: integer
      description: "000-999ms, 000=0ms, range 0-300ms"
- id: delay_status_query
  label: Delay Status Query
  kind: action
  params: []
- id: panorama_on
  label: Panorama On
  kind: action
  params: []
- id: panorama_off
  label: Panorama Off
  kind: action
  params: []
- id: panorama_status_query
  label: Panorama Status Query
  kind: action
  params: []
- id: dimension_up
  label: Dimension Up
  kind: action
  params: []
- id: dimension_down
  label: Dimension Down
  kind: action
  params: []
- id: dimension_set
  label: Dimension Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0, range 0-6"
- id: dimension_status_query
  label: Dimension Status Query
  kind: action
  params: []
- id: center_width_up
  label: Center Width Up
  kind: action
  params: []
- id: center_width_down
  label: Center Width Down
  kind: action
  params: []
- id: center_width_set
  label: Center Width Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0, range 0-7"
- id: center_width_status_query
  label: Center Width Status Query
  kind: action
  params: []
- id: center_image_up
  label: Center Image Up
  kind: action
  params: []
- id: center_image_down
  label: Center Image Down
  kind: action
  params: []
- id: center_image_set
  label: Center Image Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0.0, range 0.0-1.0"
- id: center_image_status_query
  label: Center Image Status Query
  kind: action
  params: []
- id: center_gain_up
  label: Center Gain Up
  kind: action
  params: []
- id: center_gain_down
  label: Center Gain Down
  kind: action
  params: []
- id: center_gain_set
  label: Center Gain Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0.0, range 0.0-1.0"
- id: center_gain_status_query
  label: Center Gain Status Query
  kind: action
  params: []
- id: center_spread_on
  label: Center Spread On
  kind: action
  params: []
- id: center_spread_off
  label: Center Spread Off
  kind: action
  params: []
- id: center_spread_status_query
  label: Center Spread Status Query
  kind: action
  params: []
- id: sw_on
  label: Subwoofer On
  kind: action
  params: []
- id: sw_off
  label: Subwoofer Off
  kind: action
  params: []
- id: sw_status_query
  label: Subwoofer Status Query
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
  label: Room Size Status Query
  kind: action
  params: []
- id: audio_delay_up
  label: Audio Delay Up
  kind: action
  params: []
- id: audio_delay_down
  label: Audio Delay Down
  kind: action
  params: []
- id: audio_delay_set
  label: Audio Delay Set
  kind: action
  params:
    - name: ms
      type: integer
      description: "000-999ms, 000=0ms, range 0-200ms"
- id: audio_delay_status_query
  label: Audio Delay Status Query
  kind: action
  params: []
- id: audio_restorer
  label: Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HI"
- id: audio_restorer_status_query
  label: Audio Restorer Status Query
  kind: action
  params: []
- id: front_speaker_select
  label: Front Speaker Select
  kind: action
  params:
    - name: selection
      type: string
      description: "SPA, SPB, A+B"
- id: front_speaker_status_query
  label: Front Speaker Status Query
  kind: action
  params: []
- id: auro_preset
  label: Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "SMA, MED, LAR, SPE"
- id: auro_preset_status_query
  label: Auro Preset Status Query
  kind: action
  params: []
- id: auro_strength_up
  label: Auro-Matic 3D Strength Up
  kind: action
  params: []
- id: auro_strength_down
  label: Auro-Matic 3D Strength Down
  kind: action
  params: []
- id: auro_strength_set
  label: Auro-Matic 3D Strength Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 01=1, 10=10, range 1-16"
- id: auro_strength_status_query
  label: Auro Strength Status Query
  kind: action
  params: []
- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
- id: picture_mode_status_query
  label: Picture Mode Status Query
  kind: action
  params: []
- id: contrast_up
  label: Contrast Up
  kind: action
  params: []
- id: contrast_down
  label: Contrast Down
  kind: action
  params: []
- id: contrast_set
  label: Contrast Set
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, 050=0, range -50 to +50"
- id: contrast_status_query
  label: Contrast Status Query
  kind: action
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  params: []
- id: brightness_set
  label: Brightness Set
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, 050=0, range -50 to +50"
- id: brightness_status_query
  label: Brightness Status Query
  kind: action
  params: []
- id: saturation_up
  label: Saturation Up
  kind: action
  params: []
- id: saturation_down
  label: Saturation Down
  kind: action
  params: []
- id: saturation_set
  label: Saturation Set
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, 050=0, range -50 to +50"
- id: saturation_status_query
  label: Saturation Status Query
  kind: action
  params: []
- id: hue_up
  label: Hue Up
  kind: action
  params: []
- id: hue_down
  label: Hue Down
  kind: action
  params: []
- id: hue_set
  label: Hue Set
  kind: action
  params:
    - name: value
      type: integer
      description: "44-56, 50=0, range -6 to +6"
- id: hue_status_query
  label: Hue Status Query
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
  label: DNR Status Query
  kind: action
  params: []
- id: enhancer_up
  label: Enhancer Up
  kind: action
  params: []
- id: enhancer_down
  label: Enhancer Down
  kind: action
  params: []
- id: enhancer_set
  label: Enhancer Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-12, 00=0, range 0-12"
- id: enhancer_status_query
  label: Enhancer Status Query
  kind: action
  params: []
- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []
- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []
- id: tuner_frequency_direct
  label: Tuner Frequency Direct
  kind: action
  params:
    - name: frequency
      type: integer
      description: "6 digits: ****.** kHz AM or ****.** MHz FM"
- id: tuner_frequency_status_query
  label: Tuner Frequency Status Query
  kind: action
  params: []
- id: rds_station_name_query
  label: RDS Station Name Query
  kind: action
  params: []
- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
- id: tuner_preset_select
  label: Tuner Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tuner_preset_status_query
  label: Tuner Preset Status Query
  kind: action
  params: []
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params: []
- id: tuner_band
  label: Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: "AM, FM"
- id: tuner_band_status_query
  label: Tuner Band Status Query
  kind: action
  params: []
- id: tuner_tuning_mode
  label: Tuner Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, MANUAL"
- id: tuner_tuning_mode_status_query
  label: Tuner Tuning Mode Status Query
  kind: action
  params: []
- id: hd_radio_channel_up
  label: HD Radio Channel Up
  kind: action
  params: []
- id: hd_radio_channel_down
  label: HD Radio Channel Down
  kind: action
  params: []
- id: hd_radio_channel_direct
  label: HD Radio Channel Direct
  kind: action
  params:
    - name: channel
      type: integer
      description: "6 digits frequency + MC* for multi cast"
- id: hd_radio_multicast_select
  label: HD Radio MultiCast Select
  kind: action
  params:
    - name: channel
      type: integer
      description: "1-8, 0 for analog"
- id: hd_radio_status_query
  label: HD Radio Status Query
  kind: action
  params: []
- id: hd_radio_preset_up
  label: HD Radio Preset Up
  kind: action
  params: []
- id: hd_radio_preset_down
  label: HD Radio Preset Down
  kind: action
  params: []
- id: hd_radio_preset_select
  label: HD Radio Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: hd_radio_preset_status_query
  label: HD Radio Preset Status Query
  kind: action
  params: []
- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params: []
- id: hd_radio_band_mode
  label: HD Radio Band/Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AM, FM, AUTOHD, AUTO, MANUAL, ANAAUTO, ANAMANU"
- id: hd_radio_band_mode_status_query
  label: HD Radio Band/Mode Status Query
  kind: action
  params: []
- id: online_music_cursor_up
  label: Online Music Cursor Up
  kind: action
  params: []
- id: online_music_cursor_down
  label: Online Music Cursor Down
  kind: action
  params: []
- id: online_music_cursor_left
  label: Online Music Cursor Left
  kind: action
  params: []
- id: online_music_cursor_right
  label: Online Music Cursor Right
  kind: action
  params: []
- id: online_music_enter
  label: Online Music Enter
  kind: action
  params: []
- id: online_music_play
  label: Online Music Play
  kind: action
  params: []
- id: online_music_pause
  label: Online Music Pause
  kind: action
  params: []
- id: online_music_stop
  label: Online Music Stop
  kind: action
  params: []
- id: online_music_skip_plus
  label: Online Music Skip Plus
  kind: action
  params: []
- id: online_music_skip_minus
  label: Online Music Skip Minus
  kind: action
  params: []
- id: online_music_manual_search_plus
  label: Online Music Manual Search Plus
  kind: action
  params: []
- id: online_music_manual_search_minus
  label: Online Music Manual Search Minus
  kind: action
  params: []
- id: online_music_manual_search_stop
  label: Online Music Manual Search Stop
  kind: action
  params: []
- id: online_music_repeat_one
  label: Online Music Repeat One
  kind: action
  params: []
- id: online_music_repeat_all
  label: Online Music Repeat All
  kind: action
  params: []
- id: online_music_repeat_off
  label: Online Music Repeat Off
  kind: action
  params: []
- id: online_music_random_on
  label: Online Music Random On
  kind: action
  params: []
- id: online_music_random_off
  label: Online Music Random Off
  kind: action
  params: []
- id: online_music_toggle_ipod_mode
  label: Online Music Toggle iPod Mode
  kind: action
  params: []
- id: online_music_page_next
  label: Online Music Page Next
  kind: action
  params: []
- id: online_music_page_previous
  label: Online Music Page Previous
  kind: action
  params: []
- id: online_music_preset_call
  label: Online Music Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35 (2014 AVR)"
- id: online_music_preset_memory
  label: Online Music Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35 (2014 AVR)"
- id: online_music_preset_name_query
  label: Online Music Preset Name Query
  kind: action
  params: []
- id: online_music_add_favorites
  label: Online Music Add Favorites
  kind: action
  params: []
- id: online_music_display_info
  label: Online Music Display Information
  kind: action
  params: []
- id: online_music_display_info_request
  label: Online Music Display Information Request
  kind: action
  params: []
- id: cursor_up
  label: Cursor Up
  kind: action
  params: []
- id: cursor_down
  label: Cursor Down
  kind: action
  params: []
- id: cursor_left
  label: Cursor Left
  kind: action
  params: []
- id: cursor_right
  label: Cursor Right
  kind: action
  params: []
- id: cursor_enter
  label: Cursor Enter
  kind: action
  params: []
- id: cursor_return
  label: Cursor Return
  kind: action
  params: []
- id: cursor_option
  label: Cursor Option
  kind: action
  params: []
- id: cursor_info
  label: Cursor Info
  kind: action
  params: []
- id: channel_level_adjust
  label: Channel Level Adjust Menu
  kind: action
  params: []
- id: setup_menu_on
  label: Setup Menu On
  kind: action
  params: []
- id: setup_menu_off
  label: Setup Menu Off
  kind: action
  params: []
- id: setup_menu_status_query
  label: Setup Menu Status Query
  kind: action
  params: []
- id: instaprevue_on
  label: InstaPrevue On
  kind: action
  params: []
- id: instaprevue_off
  label: InstaPrevue Off
  kind: action
  params: []
- id: instaprevue_status_query
  label: InstaPrevue Status Query
  kind: action
  params: []
- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  params: []
- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  params: []
- id: all_zone_stereo_status_query
  label: All Zone Stereo Status Query
  kind: action
  params: []
- id: remote_lock_on
  label: Remote Lock On
  kind: action
  params: []
- id: remote_lock_off
  label: Remote Lock Off
  kind: action
  params: []
- id: panel_lock_on
  label: Panel Lock On
  kind: action
  params: []
- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  params: []
- id: panel_vol_lock_on
  label: Panel + Volume Lock On
  kind: action
  params: []
- id: trigger_1_on
  label: Trigger 1 On
  kind: action
  params: []
- id: trigger_1_off
  label: Trigger 1 Off
  kind: action
  params: []
- id: trigger_2_on
  label: Trigger 2 On
  kind: action
  params: []
- id: trigger_2_off
  label: Trigger 2 Off
  kind: action
  params: []
- id: trigger_status_query
  label: Trigger Status Query
  kind: action
  params: []
- id: upgrade_id_display
  label: Upgrade ID Display
  kind: action
  params: []
- id: remote_maintenance_start
  label: Remote Maintenance Start
  kind: action
  params: []
- id: remote_maintenance_end
  label: Remote Maintenance End
  kind: action
  params: []
- id: remote_maintenance_status_query
  label: Remote Maintenance Status Query
  kind: action
  params: []
- id: dimmer_bright
  label: Dimmer Bright
  kind: action
  params: []
- id: dimmer_dim
  label: Dimmer Dim
  kind: action
  params: []
- id: dimmer_dark
  label: Dimmer Dark
  kind: action
  params: []
- id: dimmer_off
  label: Dimmer Off
  kind: action
  params: []
- id: dimmer_select
  label: Dimmer Select (Toggle)
  kind: action
  params: []
- id: dimmer_status_query
  label: Dimmer Status Query
  kind: action
  params: []
- id: zone2_on
  label: Zone2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []
- id: zone2_status_query
  label: Zone2 Status Query
  kind: action
  params: []
- id: zone2_source
  label: Zone2 Source
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI command sources
- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  params: []
- id: zone2_volume_set
  label: Zone2 Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-98, 80=0dB, 00=minimum"
- id: zone2_mute_on
  label: Zone2 Mute On
  kind: action
  params: []
- id: zone2_mute_off
  label: Zone2 Mute Off
  kind: action
  params: []
- id: zone2_mute_status_query
  label: Zone2 Mute Status Query
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
  label: Zone2 Channel Setting Status Query
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
      description: "UP, DOWN, or direct value **"
- id: zone2_channel_volume_status_query
  label: Zone2 Channel Volume Status Query
  kind: action
  params: []
- id: zone2_hpf_on
  label: Zone2 HPF On
  kind: action
  params: []
- id: zone2_hpf_off
  label: Zone2 HPF Off
  kind: action
  params: []
- id: zone2_hpf_status_query
  label: Zone2 HPF Status Query
  kind: action
  params: []
- id: zone2_bass_up
  label: Zone2 Bass Up
  kind: action
  params: []
- id: zone2_bass_down
  label: Zone2 Bass Down
  kind: action
  params: []
- id: zone2_bass_set
  label: Zone2 Bass Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0dB, range -10 to +10 (40-60)"
- id: zone2_bass_status_query
  label: Zone2 Bass Status Query
  kind: action
  params: []
- id: zone2_treble_up
  label: Zone2 Treble Up
  kind: action
  params: []
- id: zone2_treble_down
  label: Zone2 Treble Down
  kind: action
  params: []
- id: zone2_treble_set
  label: Zone2 Treble Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0dB, range -10 to +10 (40-60)"
- id: zone2_treble_status_query
  label: Zone2 Treble Status Query
  kind: action
  params: []
- id: zone2_hdmi_audio
  label: Zone2 HDMI Audio
  kind: action
  params:
    - name: mode
      type: string
      description: "THR (Through), PCM"
- id: zone2_hdmi_audio_status_query
  label: Zone2 HDMI Audio Status Query
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
  label: Zone2 Sleep Timer Status Query
  kind: action
  params: []
- id: zone2_auto_standby
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: hours
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone2_auto_standby_status_query
  label: Zone2 Auto Standby Status Query
  kind: action
  params: []
- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: "1-5"
- id: zone2_quick_select_memorize
  label: Zone2 Quick Select Memorize
  kind: action
  params:
    - name: number
      type: integer
      description: "1-5"
- id: zone2_quick_select_status_query
  label: Zone2 Quick Select Status Query
  kind: action
  params: []
- id: zone2_favorite
  label: Zone2 Favorite
  kind: action
  params:
    - name: number
      type: integer
      description: "1-4"
- id: zone3_on
  label: Zone3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []
- id: zone3_status_query
  label: Zone3 Status Query
  kind: action
  params: []
- id: zone3_source
  label: Zone3 Source
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI command sources
- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  params: []
- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  params: []
- id: zone3_volume_set
  label: Zone3 Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-98, 80=0dB, 00=minimum"
- id: zone3_mute_on
  label: Zone3 Mute On
  kind: action
  params: []
- id: zone3_mute_off
  label: Zone3 Mute Off
  kind: action
  params: []
- id: zone3_mute_status_query
  label: Zone3 Mute Status Query
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
  label: Zone3 Channel Setting Status Query
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
      description: "UP, DOWN, or direct value **"
- id: zone3_channel_volume_status_query
  label: Zone3 Channel Volume Status Query
  kind: action
  params: []
- id: zone3_hpf_on
  label: Zone3 HPF On
  kind: action
  params: []
- id: zone3_hpf_off
  label: Zone3 HPF Off
  kind: action
  params: []
- id: zone3_hpf_status_query
  label: Zone3 HPF Status Query
  kind: action
  params: []
- id: zone3_bass_up
  label: Zone3 Bass Up
  kind: action
  params: []
- id: zone3_bass_down
  label: Zone3 Bass Down
  kind: action
  params: []
- id: zone3_bass_set
  label: Zone3 Bass Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0dB, range -10 to +10 (40-60)"
- id: zone3_bass_status_query
  label: Zone3 Bass Status Query
  kind: action
  params: []
- id: zone3_treble_up
  label: Zone3 Treble Up
  kind: action
  params: []
- id: zone3_treble_down
  label: Zone3 Treble Down
  kind: action
  params: []
- id: zone3_treble_set
  label: Zone3 Treble Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-99, 00=0dB, range -10 to +10 (40-60)"
- id: zone3_treble_status_query
  label: Zone3 Treble Status Query
  kind: action
  params: []
- id: zone3_sleep_timer
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120, or OFF"
- id: zone3_sleep_timer_status_query
  label: Zone3 Sleep Timer Status Query
  kind: action
  params: []
- id: zone3_auto_standby
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: hours
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone3_auto_standby_status_query
  label: Zone3 Auto Standby Status Query
  kind: action
  params: []
- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: "1-5"
- id: zone3_quick_select_memorize
  label: Zone3 Quick Select Memorize
  kind: action
  params:
    - name: number
      type: integer
      description: "1-5"
- id: zone3_quick_select_status_query
  label: Zone3 Quick Select Status Query
  kind: action
  params: []
- id: zone3_favorite
  label: Zone3 Favorite
  kind: action
  params:
    - name: number
      type: integer
      description: "1-4"
- id: audio_input_mode
  label: Audio Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"
- id: audio_input_mode_status_query
  label: Audio Input Mode Status Query
  kind: action
  params: []
- id: digital_input_mode
  label: Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, PCM, DTS"
- id: digital_input_mode_status_query
  label: Digital Input Mode Status Query
  kind: action
  params: []
- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD"
- id: video_select_source_cancel
  label: Video Select Source Cancel
  kind: action
  params: []
- id: video_select_on
  label: Video Select On
  kind: action
  params: []
- id: video_select_off
  label: Video Select Off
  kind: action
  params: []
- id: video_select_status_query
  label: Video Select Status Query
  kind: action
  params: []
- id: online_music_repeat_toggle
  label: Online Music Repeat Toggle
  kind: action
  params: []
- id: online_music_random_toggle
  label: Online Music Random Toggle
  kind: action
  params: []
- id: zone2_favorite_memorize
  label: Zone2 Favorite Memorize
  kind: action
  params:
    - name: number
      type: integer
      description: "1-4"
- id: zone3_favorite_memorize
  label: Zone3 Favorite Memorize
  kind: action
  params:
    - name: number
      type: integer
      description: "1-4"
- id: tuner_preset_memory_direct
  label: Tuner Preset Memory Direct
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: hd_radio_preset_memory_direct
  label: HD Radio Preset Memory Direct
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
```

## Feedbacks
```yaml
# All query commands return responses. Key response formats:
- id: power_response
  type: enum
  values: [PWON, PWSTANDBY]
- id: input_response
  type: string
  description: "SI*** where *** is current input source"
- id: volume_response
  type: string
  description: "MV*** where *** is master volume value (80=0dB)"
- id: mute_response
  type: enum
  values: [MUON, MUOFF]
- id: surround_response
  type: string
  description: "MS*** where *** is current surround mode"
- id: hd_radio_response
  type: string
  description: "Returns: HDST NAME (station name), HDSIG LEV 0-6 (signal level), HDMLT CURRCH*, HDMLT CAST CH*, HDPTY, HDARTIST, HDTITLE, HDALBUM, HDGENRE, HDMODE DIGITAL/ANALOG"
# UNRESOLVED: complete response format documentation for all query commands
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands
```

## Events
```yaml
# AVR sends unsolicited events when state changes:
# - PW (power state change)
# - MV (master volume change)
# - CV (channel volume change when input source changes)
# - MU (mute state change)
# - SI (input source change)
# - MS (surround mode change when input source changes)
# Note: EVENT only sent if state actually differs after input change
# Event timing: within 5 seconds of state change
# UNRESOLVED: complete event catalog with value formats
```

## Macros
```yaml
# Power on sequence: PWON, then wait 1 second before next command
# UNRESOLVED: explicit multi-step macros not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command structure: 2-character command + parameter (up to 25 chars) + CR (0x0D)
- ASCII range: 0x20-0x7F only
- Half duplex on both serial and TCP
- Max data length: 135 bytes per message
- Minimum command interval: 50ms between sends
- RESPONSE timing: within 200ms of request
- EVENT timing: within 5 seconds of state change
- Volume 0.5dB steps encoded as 3 ASCII characters (e.g., MV805 for +0.5dB)
- Zone2/Z3 control uses Z2/Z3 prefix commands
- No authentication or login required for either interface
- RS-232: DB-9 female DCE, pins 1=GND, 2=TXD, 3=RXD, 5=Common
- Ethernet: TCP port 23 (Telnet), 10BASE-T/100BASE-TX
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: specific model variants differ in some command applicability (noted in source) -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T16:45:29.002Z
last_checked_at: 2026-06-09T13:40:09.830Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T13:40:09.830Z
matched_actions: 372
action_count: 372
confidence: medium
summary: "All 372 spec actions confirmed in source with correct shapes and parameter ranges; serial 9600 8N1 and TCP port 23 verified; source command catalogue fully represented at spec granularity. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model variants (X1100, S700, S900) are referenced in source but no single model name is stated as the canonical name"
- "complete response format documentation for all query commands"
- "no discrete settable parameters beyond action commands"
- "complete event catalog with value formats"
- "explicit multi-step macros not documented in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated"
- "specific model variants differ in some command applicability (noted in source)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
