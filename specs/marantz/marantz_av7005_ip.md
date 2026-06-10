---
spec_id: admin/marantz-av7005
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz AV7005 Control Spec"
manufacturer: Marantz
model_family: AV7005
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - AV7005
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T19:56:02.186Z
last_checked_at: 2026-06-09T12:30:05.569Z
generated_at: 2026-06-09T12:30:05.569Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TFANNAME?"
  - "TPANMEM**"
  - "Zone4+ control not documented in source"
  - "precise variable definitions for all settable parameters"
  - "complete list of event types the device can emit"
  - "user-defined macro storage not documented"
  - "no explicit safety warnings or interlock procedures for hazardous operations"
  - "firmware version compatibility not stated"
  - "exact event emission rules for all state changes not fully enumerated"
  - "HD Radio / USB/iPod detailed response formats truncated in source"
  - "REC SELECT (SR) and ZONE2/ZONE3 interaction details minimal"
verification:
  verdict: verified
  checked_at: 2026-06-09T12:30:05.569Z
  matched_actions: 355
  action_count: 355
  confidence: medium
  summary: "All 355 spec actions confirmed in source via semantic-id matching; only 2 minor source command forms absent (TFANNAME? RDS query and TPANMEM** direct-preset-number variant); transport parameters port 23 and 9600 8N1 verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz AV7005 Control Spec

## Summary
AV surround controller/AV processor with RS-232C and TCP/IP (Telnet) control interfaces. Supports multi-zone audio, video processing, surround modes, tuner, and network/USB playback. Command protocol is ASCII-based with 2-character command codes plus parameters terminated by CR (0x0D).

<!-- UNRESOLVED: Zone4+ control not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet) - stated in source
serial:
  baud_rate: 9600  # stated in source
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

- id: power_query
  label: Query Power Status
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
  label: Set Master Volume
  kind: action
  params:
    - name: level
      type: string
      description: Volume level 00-98 (ASCII), 80=0dB, 00=minimum (---dB)

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

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: |
        PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET,
        PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES,
        AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP

- id: input_query
  label: Query Input Status
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

- id: main_zone_query
  label: Query Main Zone Status
  kind: action
  params: []

- id: digital_input_select
  label: Select Digital Input
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO

- id: digital_input_query
  label: Query Digital Input Status
  kind: action
  params: []

- id: video_select
  label: Select Video Source
  kind: action
  params:
    - name: source
      type: string
      description: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE, ON, OFF

- id: video_select_query
  label: Query Video Select Status
  kind: action
  params: []

- id: sleep_timer
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "001-120 (minutes), OFF to cancel"

- id: sleep_timer_query
  label: Query Sleep Timer Status
  kind: action
  params: []

- id: auto_standby
  label: Set Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: "15M, 30M, 60M, OFF"

- id: auto_standby_query
  label: Query Auto Standby Status
  kind: action
  params: []

- id: eco_mode
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF

- id: eco_mode_query
  label: Query ECO Mode Status
  kind: action
  params: []

- id: surround_mode
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: |
        MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO,
        DOLBY DIGITAL, DTS SURROUND, MPEG2 AAC, AURO3D, AURO2DSURR,
        MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB,
        CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL,
        LEFT, RIGHT, QUICK1-QUICK5, QUICK1 MEMORY - QUICK5 MEMORY,
        and many DTS/DOLBY variants

- id: surround_mode_query
  label: Query Surround Mode Status
  kind: action
  params: []

- id: channel_volume
  label: Set Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: |
        FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB,
        FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR,
        RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: direction
      type: string
      description: UP, DOWN, or direct value (38-62 ASCII, 50=0dB)

- id: channel_volume_reset
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []

- id: channel_volume_query
  label: Query Channel Volume Status
  kind: action
  params: []

- id: tone_control
  label: Set Tone Control
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: tone_control_query
  label: Query Tone Control Status
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
  label: Set Bass Level
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB, range -6 to +6dB (44-56)"

- id: bass_query
  label: Query Bass Status
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
  label: Set Treble Level
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB, range -6 to +6dB (44-56)"

- id: treble_query
  label: Query Treble Status
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

- id: dialog_level_query
  label: Query Dialog Level Status
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

- id: subwoofer_level_query
  label: Query Subwoofer Level Status
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

- id: cinema_eq_query
  label: Query Cinema EQ Status
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

- id: dynamic_eq_query
  label: Query Dynamic EQ Status
  kind: action
  params: []

- id: dynamic_volume
  label: Set Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: HEV (Heavy), MED (Medium), LIT (Light), OFF

- id: dynamic_volume_query
  label: Query Dynamic Volume Status
  kind: action
  params: []

- id: mult_eq
  label: Set MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF

- id: mult_eq_query
  label: Query MultEQ Status
  kind: action
  params: []

- id: ref_level
  label: Set Reference Level Offset
  kind: action
  params:
    - name: offset
      type: string
      description: "0, 5, 10, 15 (dB)"

- id: ref_level_query
  label: Query Reference Level Status
  kind: action
  params: []

- id: video_aspect
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      description: ASPNRM (4:3), ASPFUL (16:9)

- id: video_aspect_query
  label: Query Aspect Ratio Status
  kind: action
  params: []

- id: video_resolution
  label: Set Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: |
        SC48P (480p/576p), SC10I (1080i), SC72P (720p), SC10P (1080p),
        SC10P24 (1080p:24Hz), SC4K, SC4KF (4K 60/50), SCAUTO

- id: video_resolution_query
  label: Query Resolution Status
  kind: action
  params: []

- id: hdmi_monitor
  label: Set HDMI Monitor
  kind: action
  params:
    - name: monitor
      type: string
      description: MONIAUTO, MONI1, MONI2

- id: hdmi_monitor_query
  label: Query HDMI Monitor Status
  kind: action
  params: []

- id: hdmi_audio_output
  label: Set HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: AMP, TV

- id: hdmi_audio_query
  label: Query HDMI Audio Status
  kind: action
  params: []

- id: video_processing_mode
  label: Set Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, GAME, MOVI (Movie)

- id: video_processing_query
  label: Query Video Processing Status
  kind: action
  params: []

- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD (Vivid), STM (Stream), CTM (Custom), DAY, NGT

- id: picture_mode_query
  label: Query Picture Mode Status
  kind: action
  params: []

- id: picture_contrast
  label: Set Picture Contrast
  kind: action
  params:
    - name: value
      type: string
      description: "000-100 ASCII, 050=0, range -50 to +50"

- id: picture_brightness
  label: Set Picture Brightness
  kind: action
  params:
    - name: value
      type: string
      description: "000-100 ASCII, 050=0, range -50 to +50"

- id: picture_saturation
  label: Set Picture Saturation
  kind: action
  params:
    - name: value
      type: string
      description: "000-100 ASCII, 050=0, range -50 to +50"

- id: picture_hue
  label: Set Picture Hue
  kind: action
  params:
    - name: value
      type: string
      description: "44-56 ASCII, 50=0, range -6 to +6"

- id: picture_enhancer
  label: Set Picture Enhancer
  kind: action
  params:
    - name: value
      type: string
      description: "00-12 ASCII, 00=0, range 0 to 12"

- id: picture_dnr
  label: Set DNR
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MID, HI

- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []

- id: tuner_frequency_direct
  label: Set Tuner Frequency Directly
  kind: action
  params:
    - name: frequency
      type: string
      description: "6 digits: ****.** kHz (AM) or ***.** MHz (FM)"

- id: tuner_frequency_query
  label: Query Tuner Frequency Status
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
  label: Select Tuner Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56"

- id: tuner_preset_memory
  label: Store Tuner Preset
  kind: action
  params: []

- id: tuner_band
  label: Set Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: AM, FM

- id: tuner_band_query
  label: Query Tuner Band Status
  kind: action
  params: []

- id: tuner_tuning_mode
  label: Set Tuner Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, MANUAL

- id: zone2_on
  label: Zone2 On
  kind: action
  params: []

- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []

- id: zone2_source
  label: Set Zone2 Source
  kind: action
  params:
    - name: source
      type: string
      description: Same sources as main zone plus Z2SOURCE (follows main)

- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  params: []

- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  params: []

- id: zone2_volume_set
  label: Set Zone2 Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=minimum"

- id: zone2_mute_on
  label: Zone2 Mute On
  kind: action
  params: []

- id: zone2_mute_off
  label: Zone2 Mute Off
  kind: action
  params: []

- id: zone3_on
  label: Zone3 On
  kind: action
  params: []

- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []

- id: zone3_source
  label: Set Zone3 Source
  kind: action
  params:
    - name: source
      type: string
      description: Same sources as main zone plus Z3SOURCE (follows main)

- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  params: []

- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  params: []

- id: zone3_mute_on
  label: Zone3 Mute On
  kind: action
  params: []

- id: zone3_mute_off
  label: Zone3 Mute Off
  kind: action
  params: []
- id: dc_mode
  label: Set Digital Input Decoding Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, PCM, DTS
- id: dc_mode_query
  label: Query Digital Input Decoding Mode
  kind: action
  params: []
- id: video_vertical_stretch_on
  label: Video Vertical Stretch On
  kind: action
  params: []
- id: video_vertical_stretch_off
  label: Video Vertical Stretch Off
  kind: action
  params: []
- id: video_vertical_stretch_query
  label: Query Video Vertical Stretch Status
  kind: action
  params: []
- id: ps_mode_set
  label: Set PS Surround Mode Type
  kind: action
  params:
    - name: mode
      type: string
      description: MUSIC, CINEMA, GAME, PRO LOGIC
- id: ps_mode_query
  label: Query PS Mode Type Status
  kind: action
  params: []
- id: loudness_management_on
  label: Loudness Management On
  kind: action
  params: []
- id: loudness_management_off
  label: Loudness Management Off
  kind: action
  params: []
- id: loudness_management_query
  label: Query Loudness Management Status
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
- id: front_height_query
  label: Query Front Height Output Status
  kind: action
  params: []
- id: speaker_output
  label: Set Speaker Output Configuration
  kind: action
  params:
    - name: config
      type: string
      description: FW (Front Wide), FH (Front Height), SB (Surround Back), HW (Height+Wide), BH (SB+FH), BW (SB+FW), FL (Floor), HF (Height+Floor), FR (Front)
- id: speaker_output_query
  label: Query Speaker Output Status
  kind: action
  params: []
- id: plz_height_gain
  label: Set PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: LOW, MID, HI
- id: plz_height_gain_query
  label: Query PL2z Height Gain Status
  kind: action
  params: []
- id: audyssey_lfc_on
  label: Audyssey LFC On
  kind: action
  params: []
- id: audyssey_lfc_off
  label: Audyssey LFC Off
  kind: action
  params: []
- id: audyssey_lfc_query
  label: Query Audyssey LFC Status
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
  label: Set Containment Amount
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII; AVR range 1 to 7 (01-07)
- id: containment_amount_query
  label: Query Containment Amount Status
  kind: action
  params: []
- id: audyssey_dsx
  label: Set Audyssey DSX
  kind: action
  params:
    - name: mode
      type: string
      description: ONHW (Height+Wide), ONH (Height), ONW (Width), OFF
- id: audyssey_dsx_query
  label: Query Audyssey DSX Status
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
  label: Set Stage Width
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII, 50=0dB; AVR range -10 to +10 (40-60)
- id: stage_width_query
  label: Query Stage Width Status
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
  label: Set Stage Height
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII, 50=0dB; AVR range -10 to +10 (40-60)
- id: stage_height_query
  label: Query Stage Height Status
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
- id: graphic_eq_query
  label: Query Graphic EQ Status
  kind: action
  params: []
- id: dynamic_compression
  label: Set Dynamic Compression
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, LOW, MID, HI, OFF
- id: dynamic_compression_query
  label: Query Dynamic Compression Status
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
  label: Set Bass Sync
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII, 00=0; AVR range 0 to 16
- id: bass_sync_query
  label: Query Bass Sync Status
  kind: action
  params: []
- id: dialogue_enhancer
  label: Set Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MED, HIGH
- id: dialogue_enhancer_query
  label: Query Dialogue Enhancer Status
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
  label: Set LFE Level
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII, 00=0dB, 10=-10dB; AVR range 0 to -10
- id: lfe_query
  label: Query LFE Status
  kind: action
  params: []
- id: lfe_level_set
  label: Set LFE Level (EXT.IN/7.1CH IN)
  kind: action
  params:
    - name: level
      type: string
      description: 00, 05, 10, 15
- id: lfe_level_query
  label: Query LFE Level (EXT.IN/7.1CH IN) Status
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
  label: Set Effect Level
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII, 00=0dB, 10=10dB; AVR range 1 to 15
- id: effect_query
  label: Query Effect Status
  kind: action
  params: []
- id: ps_delay_up
  label: PS Delay Up
  kind: action
  params: []
- id: ps_delay_down
  label: PS Delay Down
  kind: action
  params: []
- id: ps_delay_set
  label: Set PS Delay
  kind: action
  params:
    - name: delay
      type: string
      description: 000-999 ASCII, 000=0ms, 300=300ms; AVR range 0 to 300ms
- id: ps_delay_query
  label: Query PS Delay Status
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
- id: panorama_query
  label: Query Panorama Status
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
  label: Set Dimension
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII, 00=0; AVR range 0 to 6
- id: dimension_query
  label: Query Dimension Status
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
  label: Set Center Width
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII, 00=0; AVR range 0 to 7
- id: center_width_query
  label: Query Center Width Status
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
  label: Set Center Image
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII, 00=0.0; AVR range 0.0 to 1.0
- id: center_image_query
  label: Query Center Image Status
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
  label: Set Center Gain
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII, 00=0.0; AVR range 0.0 to 1.0
- id: center_gain_query
  label: Query Center Gain Status
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
- id: center_spread_query
  label: Query Center Spread Status
  kind: action
  params: []
- id: subwoofer_direct_stereo_on
  label: Subwoofer On (Direct/Stereo Mode)
  kind: action
  params: []
- id: subwoofer_direct_stereo_off
  label: Subwoofer Off (Direct/Stereo Mode)
  kind: action
  params: []
- id: subwoofer_direct_stereo_query
  label: Query Subwoofer Status (Direct/Stereo Mode)
  kind: action
  params: []
- id: room_size
  label: Set Room Size
  kind: action
  params:
    - name: size
      type: string
      description: S, MS, M, ML, L
- id: room_size_query
  label: Query Room Size Status
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
  label: Set Audio Delay
  kind: action
  params:
    - name: delay
      type: string
      description: 000-999 ASCII, 000=0ms, 200=200ms; AVR range 0 to 200ms
- id: audio_delay_query
  label: Query Audio Delay Status
  kind: action
  params: []
- id: audio_restorer
  label: Set Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, LOW (MODE3), MED (MODE2), HI (MODE1)
- id: audio_restorer_query
  label: Query Audio Restorer Status
  kind: action
  params: []
- id: front_speaker
  label: Set Front Speaker Output
  kind: action
  params:
    - name: config
      type: string
      description: SPA (Speaker A), SPB (Speaker B), A+B (Both)
- id: front_speaker_query
  label: Query Front Speaker Status
  kind: action
  params: []
- id: auro3d_preset
  label: Set Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: SMA (Small), MED (Medium), LAR (Large), SPE (Speech)
- id: auro3d_preset_query
  label: Query Auro-Matic 3D Preset Status
  kind: action
  params: []
- id: auro3d_strength_up
  label: Auro-Matic 3D Strength Up
  kind: action
  params: []
- id: auro3d_strength_down
  label: Auro-Matic 3D Strength Down
  kind: action
  params: []
- id: auro3d_strength_set
  label: Set Auro-Matic 3D Strength
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII, 01=1, 10=10; AVR range 1 to 16
- id: auro3d_strength_query
  label: Query Auro-Matic 3D Strength Status
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
  label: Set Subwoofer Level
  kind: action
  params:
    - name: level
      type: string
      description: 00,38-62 ASCII, 50=0dB
- id: subwoofer2_level_up
  label: Subwoofer 2 Level Up
  kind: action
  params: []
- id: subwoofer2_level_down
  label: Subwoofer 2 Level Down
  kind: action
  params: []
- id: subwoofer2_level_set
  label: Set Subwoofer 2 Level
  kind: action
  params:
    - name: level
      type: string
      description: 00,38-62 ASCII, 50=0dB
- id: dialog_level_set
  label: Set Dialog Level
  kind: action
  params:
    - name: level
      type: string
      description: 38-62 ASCII, 50=0dB
- id: picture_contrast_up
  label: Picture Contrast Up
  kind: action
  params: []
- id: picture_contrast_down
  label: Picture Contrast Down
  kind: action
  params: []
- id: picture_contrast_query
  label: Query Picture Contrast Status
  kind: action
  params: []
- id: picture_brightness_up
  label: Picture Brightness Up
  kind: action
  params: []
- id: picture_brightness_down
  label: Picture Brightness Down
  kind: action
  params: []
- id: picture_brightness_query
  label: Query Picture Brightness Status
  kind: action
  params: []
- id: picture_saturation_up
  label: Picture Saturation Up
  kind: action
  params: []
- id: picture_saturation_down
  label: Picture Saturation Down
  kind: action
  params: []
- id: picture_saturation_query
  label: Query Picture Saturation Status
  kind: action
  params: []
- id: picture_hue_up
  label: Picture Hue Up
  kind: action
  params: []
- id: picture_hue_down
  label: Picture Hue Down
  kind: action
  params: []
- id: picture_hue_query
  label: Query Picture Hue Status
  kind: action
  params: []
- id: picture_enhancer_up
  label: Picture Enhancer Up
  kind: action
  params: []
- id: picture_enhancer_down
  label: Picture Enhancer Down
  kind: action
  params: []
- id: picture_enhancer_query
  label: Query Picture Enhancer Status
  kind: action
  params: []
- id: picture_dnr_query
  label: Query Picture DNR Status
  kind: action
  params: []
- id: video_hdmi_resolution
  label: Set HDMI Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: SCH48P (480p/576p HDMI), SCH10I (1080i HDMI), SCH72P (720p HDMI), SCH10P (1080p HDMI), SCH10P24 (1080p:24Hz HDMI), SCH4K (4K HDMI), SCH4KF (4K 60/50 HDMI), SCHAUTO (Auto HDMI)
- id: video_hdmi_resolution_query
  label: Query HDMI Resolution Status
  kind: action
  params: []
- id: main_zone_quick_select
  label: Main Zone Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: QUICK1, QUICK2, QUICK3, QUICK4, QUICK5
- id: main_zone_quick_memory
  label: Main Zone Quick Select Memory
  kind: action
  params:
    - name: slot
      type: string
      description: QUICK1, QUICK2, QUICK3, QUICK4, QUICK5
- id: main_zone_quick_query
  label: Query Main Zone Quick Select Status
  kind: action
  params: []
- id: main_zone_favorite_select
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4
- id: main_zone_favorite_memory
  label: Main Zone Favorite Memory Store
  kind: action
  params:
    - name: slot
      type: string
      description: FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4
- id: rec_select
  label: Set REC Select Source
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, NET, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP, SOURCE
- id: rec_select_query
  label: Query REC Select Status
  kind: action
  params: []
- id: tuner_tuning_mode_query
  label: Query Tuner Tuning Mode Status
  kind: action
  params: []
- id: zone2_query
  label: Query Zone2 Status
  kind: action
  params: []
- id: zone2_channel_setting
  label: Set Zone2 Channel Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ST (Stereo), MONO
- id: zone2_channel_setting_query
  label: Query Zone2 Channel Setting
  kind: action
  params: []
- id: zone2_channel_volume
  label: Set Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL (Front Left), FR (Front Right)
    - name: direction
      type: string
      description: UP, DOWN, or direct value (38-62 ASCII, 50=0dB)
- id: zone2_channel_volume_query
  label: Query Zone2 Channel Volume Status
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
- id: zone2_hpf_query
  label: Query Zone2 HPF Status
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
  label: Set Zone2 Bass Level
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII; range -10 to +10 (40-60)
- id: zone2_bass_query
  label: Query Zone2 Bass Status
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
  label: Set Zone2 Treble Level
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII; range -10 to +10 (40-60)
- id: zone2_treble_query
  label: Query Zone2 Treble Status
  kind: action
  params: []
- id: zone2_hdmi_audio
  label: Set Zone2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: THR (Through), PCM
- id: zone2_hdmi_audio_query
  label: Query Zone2 HDMI Audio Status
  kind: action
  params: []
- id: zone2_sleep_timer
  label: Set Zone2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: OFF to cancel, 001-120 (minutes)
- id: zone2_sleep_timer_query
  label: Query Zone2 Sleep Timer Status
  kind: action
  params: []
- id: zone2_auto_standby
  label: Set Zone2 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 2H, 4H, 8H, OFF
- id: zone2_auto_standby_query
  label: Query Zone2 Auto Standby Status
  kind: action
  params: []
- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: QUICK1, QUICK2, QUICK3, QUICK4, QUICK5
- id: zone2_quick_memory
  label: Zone2 Quick Select Memory
  kind: action
  params:
    - name: slot
      type: string
      description: QUICK1, QUICK2, QUICK3, QUICK4, QUICK5
- id: zone2_quick_query
  label: Query Zone2 Quick Select Status
  kind: action
  params: []
- id: zone2_favorite_select
  label: Zone2 Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4
- id: zone2_favorite_memory
  label: Zone2 Favorite Memory Store
  kind: action
  params:
    - name: slot
      type: string
      description: FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4
- id: zone2_mute_query
  label: Query Zone2 Mute Status
  kind: action
  params: []
- id: zone3_volume_set
  label: Set Zone3 Volume
  kind: action
  params:
    - name: level
      type: string
      description: 00-98 ASCII, 80=0dB, 00=minimum
- id: zone3_query
  label: Query Zone3 Status
  kind: action
  params: []
- id: zone3_channel_setting
  label: Set Zone3 Channel Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ST (Stereo), MONO
- id: zone3_channel_setting_query
  label: Query Zone3 Channel Setting
  kind: action
  params: []
- id: zone3_channel_volume
  label: Set Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL (Front Left), FR (Front Right)
    - name: direction
      type: string
      description: UP, DOWN, or direct value (38-62 ASCII, 50=0dB)
- id: zone3_channel_volume_query
  label: Query Zone3 Channel Volume Status
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
- id: zone3_hpf_query
  label: Query Zone3 HPF Status
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
  label: Set Zone3 Bass Level
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII; range -10 to +10 (40-60)
- id: zone3_bass_query
  label: Query Zone3 Bass Status
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
  label: Set Zone3 Treble Level
  kind: action
  params:
    - name: level
      type: string
      description: 00-99 ASCII; range -10 to +10 (40-60)
- id: zone3_treble_query
  label: Query Zone3 Treble Status
  kind: action
  params: []
- id: zone3_sleep_timer
  label: Set Zone3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: OFF to cancel, 001-120 (minutes)
- id: zone3_sleep_timer_query
  label: Query Zone3 Sleep Timer Status
  kind: action
  params: []
- id: zone3_auto_standby
  label: Set Zone3 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 2H, 4H, 8H, OFF
- id: zone3_auto_standby_query
  label: Query Zone3 Auto Standby Status
  kind: action
  params: []
- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: QUICK1, QUICK2, QUICK3, QUICK4, QUICK5
- id: zone3_quick_memory
  label: Zone3 Quick Select Memory
  kind: action
  params:
    - name: slot
      type: string
      description: QUICK1, QUICK2, QUICK3, QUICK4, QUICK5
- id: zone3_quick_query
  label: Query Zone3 Quick Select Status
  kind: action
  params: []
- id: zone3_favorite_select
  label: Zone3 Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4
- id: zone3_favorite_memory
  label: Zone3 Favorite Memory Store
  kind: action
  params:
    - name: slot
      type: string
      description: FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4
- id: zone3_mute_query
  label: Query Zone3 Mute Status
  kind: action
  params: []
- id: hd_radio_freq_up
  label: HD Radio Frequency Up
  kind: action
  params: []
- id: hd_radio_freq_down
  label: HD Radio Frequency Down
  kind: action
  params: []
- id: hd_radio_freq_set
  label: Set HD Radio Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: "6 digits: ****.** kHz (AM, >050000) or ****.** MHz (FM, <050000)"
- id: hd_radio_multicast_select
  label: Select HD Radio Multicast Channel
  kind: action
  params:
    - name: channel
      type: string
      description: 1 digit (1-8 multicast, 0 analog)
- id: hd_radio_freq_multicast_set
  label: Set HD Radio Frequency and Multicast Channel
  kind: action
  params:
    - name: freq_mc
      type: string
      description: 6-digit frequency + MC + 1-digit channel (e.g., 008750MC5)
- id: hd_radio_freq_query
  label: Query HD Radio Frequency Status
  kind: action
  params: []
- id: hd_preset_up
  label: HD Radio Preset Up
  kind: action
  params: []
- id: hd_preset_down
  label: HD Radio Preset Down
  kind: action
  params: []
- id: hd_preset_select
  label: Select HD Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: 01-56
- id: hd_preset_query
  label: Query HD Radio Preset Status
  kind: action
  params: []
- id: hd_preset_memory
  label: Store HD Radio Preset
  kind: action
  params: []
- id: hd_preset_memory_direct
  label: Store HD Radio Preset to Slot
  kind: action
  params:
    - name: preset
      type: string
      description: 01-56
- id: hd_tuner_mode
  label: Set HD Radio Tuner Mode
  kind: action
  params:
    - name: mode
      type: string
      description: HDAM (AM), HDFM (FM), HDAUTOHD (Auto-HD), HDAUTO (Auto), HDMANUAL (Manual), HDANAAUTO (Analog Auto), HDANAMANU (Analog Manual)
- id: hd_tuner_mode_query
  label: Query HD Radio Tuner Mode Status
  kind: action
  params: []
- id: hd_status_query
  label: Query HD Radio Status
  kind: action
  params: []
- id: ns_nav_code
  label: Online/USB/BT Navigation Code
  kind: action
  params:
    - name: code
      type: string
      description: 90 (CursorUp), 91 (CursorDown), 92 (CursorLeft), 93 (CursorRight), 94 (Enter/PlayPause), 9A (Play), 9B (Pause), 9C (Stop), 9D (SkipPlus), 9E (SkipMinus), 9F (ManualSearch+/-), 9H (RepeatOne), 9I (RepeatAll), 9J (RepeatOff), 9K (RandomOn), 9M (RandomOff), 9W (iPodModeToggle), 9X (PageNext), 9Y (PagePrev), 9Z (ManualSearchStop)
- id: ns_repeat_toggle
  label: Online/USB/BT Repeat Toggle
  kind: action
  params: []
- id: ns_random_toggle
  label: Online/USB/BT Random Toggle
  kind: action
  params: []
- id: ns_preset_call
  label: Online Music Preset Call
  kind: action
  params:
    - name: preset
      type: string
      description: 00-35 (2014 AVR)
- id: ns_preset_memory
  label: Online Music Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: 00-35 (2014 AVR)
- id: ns_preset_name_query
  label: Query Net Audio Preset Names
  kind: action
  params: []
- id: ns_favorites_add
  label: Add Favorites Folder
  kind: action
  params: []
- id: ns_display_ascii
  label: Request Onscreen Display Info (ASCII)
  kind: action
  params: []
- id: ns_display_utf8
  label: Request Onscreen Display Info (UTF-8)
  kind: action
  params: []
- id: mn_cursor_up
  label: System Cursor Up
  kind: action
  params: []
- id: mn_cursor_down
  label: System Cursor Down
  kind: action
  params: []
- id: mn_cursor_left
  label: System Cursor Left
  kind: action
  params: []
- id: mn_cursor_right
  label: System Cursor Right
  kind: action
  params: []
- id: mn_enter
  label: System Enter
  kind: action
  params: []
- id: mn_return
  label: System Return
  kind: action
  params: []
- id: mn_option
  label: System Option
  kind: action
  params: []
- id: mn_info
  label: System Info
  kind: action
  params: []
- id: mn_channel_level_menu
  label: Channel Level Adjust Menu Toggle
  kind: action
  params: []
- id: mn_menu_on
  label: Setup Menu On
  kind: action
  params: []
- id: mn_menu_off
  label: Setup Menu Off
  kind: action
  params: []
- id: mn_menu_query
  label: Query Setup Menu Status
  kind: action
  params: []
- id: mn_instaprevue_on
  label: InstaPrevue On
  kind: action
  params: []
- id: mn_instaprevue_off
  label: InstaPrevue Off
  kind: action
  params: []
- id: mn_instaprevue_query
  label: Query InstaPrevue Status
  kind: action
  params: []
- id: mn_all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  params: []
- id: mn_all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  params: []
- id: mn_all_zone_stereo_query
  label: Query All Zone Stereo Status
  kind: action
  params: []
- id: sy_remote_lock_on
  label: Remote Lock On
  kind: action
  params: []
- id: sy_remote_lock_off
  label: Remote Lock Off
  kind: action
  params: []
- id: sy_panel_lock_on
  label: Panel Lock On (Except Master Volume)
  kind: action
  params: []
- id: sy_panel_plus_vol_lock_on
  label: Panel and Master Volume Lock On
  kind: action
  params: []
- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  params: []
- id: trigger1_on
  label: Trigger 1 On
  kind: action
  params: []
- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  params: []
- id: trigger2_on
  label: Trigger 2 On
  kind: action
  params: []
- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  params: []
- id: trigger_query
  label: Query Trigger Status
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
- id: dimmer_toggle
  label: Dimmer Toggle (Bright to Dim to Dark to Off)
  kind: action
  params: []
- id: dimmer_query
  label: Query Dimmer Status
  kind: action
  params: []
- id: remote_maintenance_start
  label: Remote Maintenance Mode Start
  kind: action
  params: []
- id: remote_maintenance_end
  label: Remote Maintenance Mode End
  kind: action
  params: []
- id: remote_maintenance_query
  label: Query Remote Maintenance Status
  kind: action
  params: []
- id: upgrade_id_display
  label: Display Upgrade ID Number
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [PWON, PWSTANDBY]

- id: input_state
  type: string
  description: Returns current input source (e.g., SIDVD, SITUNER)

- id: volume_state
  type: string
  description: Returns master volume level (e.g., MV80 for 0dB)

- id: mute_state
  type: enum
  values: [MUON, MUOFF]

- id: surround_state
  type: string
  description: Returns current surround mode

- id: zone2_state
  type: string
  description: Returns Zone2 status including power and volume

- id: zone3_state
  type: string
  description: Returns Zone3 status including power and volume

- id: tuner_state
  type: string
  description: Returns tuner band, frequency, and preset info

- id: hd_radio_state
  type: string
  description: Returns HD Radio band, station name, artist, title, etc.
```

## Variables
```yaml
# Most settable parameters are action-based rather than variable-based.
# Query commands return current state as Feedbacks.
# UNRESOLVED: precise variable definitions for all settable parameters
```

## Events
```yaml
# Device sends unsolicited EVENT messages when state changes locally.
# Events use same format as commands.
# Examples:
# - PWON/PWSTANDBY when power state changes
# - SI*** when input source changes
# - MV*** when volume changes
# - MS*** when surround mode changes
# - CVFL/CVFR/etc. when channel volume changes
#
# UNRESOLVED: complete list of event types the device can emit
```

## Macros
```yaml
# Source describes command sequences but no explicit macros.
# UNRESOLVED: user-defined macro storage not documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after sending PWON (power on) command before sending next command"
    reference: "Volume command note, item J"
  - description: "Send commands at 50ms or greater intervals"
    reference: "COMMAND section"
# UNRESOLVED: no explicit safety warnings or interlock procedures for hazardous operations
```

## Notes
- Command format: 2-character ASCII command + parameter (up to 25 chars) + CR (0x0D)
- ASCII range: 0x20 to 0x7F only
- Half-duplex communication on both RS-232 and Ethernet
- Maximum data length: 135 bytes per message
- Response to query (?) commands returned within 200ms
- EVENT messages sent within 5 seconds of state change
- Volume uses 0.5dB steps; master volume range 00-98 (80=0dB, 00=minimum)
- Channel volume range 38-62 (50=0dB) for most channels
- Special channels (SW, SW2) allow 00 as minimum alongside 38-62 range
- Commands receivable during EVENT transmission
- When input source changes, channel volume and surround mode may return as events if they change
- When changing surround mode, old mode returned before new mode
- Minimum level for master/channel volume is "00"
- 3-character ASCII used for 0.5dB step volume values

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact event emission rules for all state changes not fully enumerated -->
<!-- UNRESOLVED: HD Radio / USB/iPod detailed response formats truncated in source -->
<!-- UNRESOLVED: REC SELECT (SR) and ZONE2/ZONE3 interaction details minimal -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T19:56:02.186Z
last_checked_at: 2026-06-09T12:30:05.569Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T12:30:05.569Z
matched_actions: 355
action_count: 355
confidence: medium
summary: "All 355 spec actions confirmed in source via semantic-id matching; only 2 minor source command forms absent (TFANNAME? RDS query and TPANMEM** direct-preset-number variant); transport parameters port 23 and 9600 8N1 verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TFANNAME?"
- "TPANMEM**"
- "Zone4+ control not documented in source"
- "precise variable definitions for all settable parameters"
- "complete list of event types the device can emit"
- "user-defined macro storage not documented"
- "no explicit safety warnings or interlock procedures for hazardous operations"
- "firmware version compatibility not stated"
- "exact event emission rules for all state changes not fully enumerated"
- "HD Radio / USB/iPod detailed response formats truncated in source"
- "REC SELECT (SR) and ZONE2/ZONE3 interaction details minimal"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
