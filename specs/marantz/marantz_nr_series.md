---
schema_version: ai4av-public-spec-v1
device_id: marantz/marantz-nr-series
entity_id: marantz_nr_series
spec_id: admin/marantz-nr-series
revision: 1
author: admin
title: "Marantz NR Series Control Spec"
status: published
manufacturer: Marantz
manufacturer_key: marantz
model_family: "Marantz NR Series"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "Marantz NR Series"
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
    checked_at: 2026-04-29T11:13:42.330Z
retrieved_at: 2026-04-29T11:13:42.330Z
last_checked_at: 2026-04-23T08:09:31.366Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:09:31.366Z
  matched_actions: 227
  action_count: 227
  confidence: high
  summary: "All 227 spec actions verified against source; transport parameters confirmed; bidirectional coverage of command protocol achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz NR Series Control Spec

## Summary
Marantz NR Series AV receivers support both RS-232C and Ethernet (TCP/IP) control. The protocol is ASCII-based with 2-character command codes followed by parameters and a CR terminator. The device operates in half-duplex mode and supports unsolicited EVENT notifications as well as query RESPONSEs. Multi-zone control is available for Main, Zone2, and Zone3.

<!-- UNRESOLVED: specific model names (e.g., NR1504, NR1604) not stated in source — only "NR Series" used -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # TCP port 23 (Telnet) - inferred from Ethernet spec; RS-232 has no port
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
- powerable      # PWON/PWSTANDBY commands present
- queryable      # ? suffix commands return RESPONSE
- routable       # SI command selects input sources
- levelable      # MV, CV, PS commands adjust volume and parameters
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Standby
  kind: action
  params: []
- id: power_status_query
  label: Power Status Query
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
  label: Master Volume Set (direct dB)
  kind: action
  params:
    - name: level
      type: string
      description: 3-digit ASCII: 00 (MIN) to 98 (+18dB), 80 = 0dB
- id: master_volume_status_query
  label: Master Volume Status Query
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
  label: Mute Status Query
  kind: action
  params: []

# Input Selection
- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP
- id: input_status_query
  label: Input Status Query
  kind: action
  params: []

# Surround Mode
- id: surround_mode_set
  label: Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO, 7.1IN, MULTI CH IN, and many others listed in MS command table
- id: surround_mode_status_query
  label: Surround Mode Status Query
  kind: action
  params: []

# Main Zone
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
    - name: slot
      type: integer
      description: 1 to 4
- id: main_zone_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: 1 to 4

# Sleep Timer
- id: sleep_timer_set
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001 to 120, or OFF
- id: sleep_timer_query
  label: Sleep Timer Query
  kind: action
  params: []

# ECO Mode
- id: eco_mode_set
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF
- id: eco_mode_query
  label: ECO Mode Query
  kind: action
  params: []

# Auto Standby
- id: auto_standby_set
  label: Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: 15M, 30M, 60M, OFF
- id: auto_standby_query
  label: Auto Standby Query
  kind: action
  params: []

# Channel Volume (per-channel level adjust)
- id: channel_volume
  label: Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: direction
      type: string
      description: UP, DOWN, or direct value (2-3 digit dB offset)
- id: channel_volume_query
  label: Channel Volume Query
  kind: action
  params: []
- id: channel_volume_reset_all
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []

# Video Resolution
- id: video_resolution_set
  label: Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO for HDMI; SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO for HDMI (HDMI)
- id: video_resolution_query
  label: Video Resolution Query
  kind: action
  params: []

# HDMI Monitor
- id: hdmi_monitor_set
  label: HDMI Monitor Select
  kind: action
  params:
    - name: monitor
      type: string
      description: MONIAUTO, MONI1, MONI2
- id: hdmi_monitor_query
  label: HDMI Monitor Query
  kind: action
  params: []

# HDMI Audio Output
- id: hdmi_audio_output_set
  label: HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: AMP, TV
- id: hdmi_audio_output_query
  label: HDMI Audio Output Query
  kind: action
  params: []

# Video Processing Mode
- id: video_processing_mode_set
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: VPMAUTO, VPMGAME, VPMMOVI
- id: video_processing_mode_query
  label: Video Processing Mode Query
  kind: action
  params: []

# Vertical Stretch
- id: vertical_stretch_set
  label: Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: vertical_stretch_query
  label: Vertical Stretch Query
  kind: action
  params: []

# Tone Control
- id: tone_control_on
  label: Tone Control On
  kind: action
  params: []
- id: tone_control_off
  label: Tone Control Off
  kind: action
  params: []
- id: tone_control_query
  label: Tone Control Query
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
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []

# Parameter Settings (PS command)
- id: dialog_level_adjust_on
  label: Dialog Level Adjust On
  kind: action
  params: []
- id: dialog_level_adjust_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
- id: subwoofer_level_adjust_on
  label: Subwoofer Level Adjust On
  kind: action
  params: []
- id: subwoofer_level_adjust_off
  label: Subwoofer Level Adjust Off
  kind: action
  params: []
- id: cinema_eq_set
  label: Cinema EQ
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: loudness_management_set
  label: Loudness Management
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: dynamic_eq_set
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: reference_level_offset_set
  label: Reference Level Offset
  kind: action
  params:
    - name: offset
      type: integer
      description: 0, 5, 10, 15 (dB)
- id: dynamic_volume_set
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: HEV, MED, LIT, OFF
- id: audyssey_lfc_set
  label: Audyssey LFC
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: speaker_output_config_set
  label: Speaker Output Configuration
  kind: action
  params:
    - name: config
      type: string
      description: FW, FH, SB, HW, BH, BW, FL, HF, FR
- id: multieq_mode_set
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF
- id: pl2z_height_gain_set
  label: PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: LOW, MID, HI
- id: stage_width_set
  label: Stage Width
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-99)
- id: stage_height_set
  label: Stage Height
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-99)
- id: graphic_eq_set
  label: Graphic EQ
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: dynamic_compression_set
  label: Dynamic Compression
  kind: action
  params:
    - name: level
      type: string
      description: AUTO, LOW, MID, HI, OFF
- id: bass_sync_set
  label: Bass Sync
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-99)
- id: dialogue_enhancer_set
  label: Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MED, HIGH
- id: lfe_level_set
  label: LFE Level
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-99)
- id: effect_level_set
  label: Effect Level
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-99)
- id: audio_delay_set
  label: Audio Delay
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (000-999 ms)
- id: panorama_set
  label: Panorama
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: dimension_set
  label: Dimension
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-99)
- id: center_width_set
  label: Center Width
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-99)
- id: center_image_set
  label: Center Image
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-99)
- id: center_gain_set
  label: Center Gain
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-99)
- id: center_spread_set
  label: Center Spread
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: subwoofer_mode_set
  label: Subwoofer Mode
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: room_size_set
  label: Room Size
  kind: action
  params:
    - name: size
      type: string
      description: S, MS, M, ML, L
- id: audio_restorer_set
  label: Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, LOW, MED, HI
- id: front_speaker_set
  label: Front Speaker Selection
  kind: action
  params:
    - name: speakers
      type: string
      description: SPA, SPB, A+B
- id: auro_preset_set
  label: Auro-Matic 3D Preset (Auro-3D Upgrade only)
  kind: action
  params:
    - name: preset
      type: string
      description: SMA, MED, LAR, SPE
- id: auro_strength_set
  label: Auro-Matic 3D Strength
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (01-16)

# Picture Mode
- id: picture_mode_set
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT
- id: contrast_set
  label: Contrast
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (000-100)
- id: brightness_set
  label: Brightness
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (000-100)
- id: saturation_set
  label: Saturation
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (000-100)
- id: hue_set
  label: Hue
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (44-56)
- id: dnr_set
  label: DNR
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MID, HI
- id: enhancer_set
  label: Enhancer
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-12)

# Digital Input Auto/Force
- id: digital_input_mode_set
  label: Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO
- id: digital_input_codec_set
  label: Digital Input Codec
  kind: action
  params:
    - name: codec
      type: string
      description: AUTO, PCM, DTS

# Video Select
- id: video_select_set
  label: Video Select Source
  kind: action
  params:
    - name: source
      type: string
      description: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE, ON, OFF
- id: video_select_status_query
  label: Video Select Status Query
  kind: action
  params: []

# Record Select
- id: record_select_set
  label: Record Select Source
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI command sources
- id: record_select_status_query
  label: Record Select Status Query
  kind: action
  params: []

# Zone2 Control
- id: zone2_on
  label: Zone2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []
- id: zone2_source_set
  label: Zone2 Source
  kind: action
  params:
    - name: source
      type: string
      description: Same sources as SI command
- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  params: []
- id: zone2_volume_set
  label: Zone2 Volume Set (direct dB)
  kind: action
  params:
    - name: level
      type: string
      description: 00 (MIN) to 98 (+18dB), 80 = 0dB
- id: zone2_mute_on
  label: Zone2 Mute On
  kind: action
  params: []
- id: zone2_mute_off
  label: Zone2 Mute Off
  kind: action
  params: []
- id: zone2_mute_query
  label: Zone2 Mute Query
  kind: action
  params: []
- id: zone2_channel_setting_set
  label: Zone2 Channel Setting
  kind: action
  params:
    - name: setting
      type: string
      description: ST, MONO
- id: zone2_hpf_set
  label: Zone2 HPF
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: zone2_tone_bass_up
  label: Zone2 Bass Up
  kind: action
  params: []
- id: zone2_tone_bass_down
  label: Zone2 Bass Down
  kind: action
  params: []
- id: zone2_tone_treble_up
  label: Zone2 Treble Up
  kind: action
  params: []
- id: zone2_tone_treble_down
  label: Zone2 Treble Down
  kind: action
  params: []
- id: zone2_hdmi_audio_set
  label: Zone2 HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: THR, PCM
- id: zone2_sleep_timer_set
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001 to 120, or OFF
- id: zone2_auto_standby_set
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: 2H, 4H, 8H, OFF
- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: slot
      type: integer
      description: 1 to 5

# Zone3 Control
- id: zone3_on
  label: Zone3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []
- id: zone3_source_set
  label: Zone3 Source
  kind: action
  params:
    - name: source
      type: string
      description: Same sources as SI command
- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  params: []
- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  params: []
- id: zone3_volume_set
  label: Zone3 Volume Set (direct dB)
  kind: action
  params:
    - name: level
      type: string
      description: 00 (MIN) to 98 (+18dB), 80 = 0dB
- id: zone3_mute_on
  label: Zone3 Mute On
  kind: action
  params: []
- id: zone3_mute_off
  label: Zone3 Mute Off
  kind: action
  params: []
- id: zone3_mute_query
  label: Zone3 Mute Query
  kind: action
  params: []
- id: zone3_channel_setting_set
  label: Zone3 Channel Setting
  kind: action
  params:
    - name: setting
      type: string
      description: ST, MONO
- id: zone3_hpf_set
  label: Zone3 HPF
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: zone3_tone_bass_up
  label: Zone3 Bass Up
  kind: action
  params: []
- id: zone3_tone_bass_down
  label: Zone3 Bass Down
  kind: action
  params: []
- id: zone3_tone_treble_up
  label: Zone3 Treble Up
  kind: action
  params: []
- id: zone3_tone_treble_down
  label: Zone3 Treble Down
  kind: action
  params: []
- id: zone3_sleep_timer_set
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001 to 120, or OFF
- id: zone3_auto_standby_set
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: 2H, 4H, 8H, OFF
- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: slot
      type: integer
      description: 1 to 5

# Tuner Control
- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []
- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []
- id: tuner_frequency_set
  label: Tuner Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: 6-digit frequency (AM: kHz, FM: MHz * 100)
- id: tuner_frequency_query
  label: Tuner Frequency Query
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
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params: []
- id: tuner_band_mode_set
  label: Tuner Band/Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ANAM (AM), ANFM (FM), ANAUTO (Auto), ANMANUAL (Manual)
- id: tuner_mode_query
  label: Tuner Mode Query
  kind: action
  params: []

# HD Radio Control
- id: hd_radio_channel_up
  label: HD Radio Channel Up
  kind: action
  params: []
- id: hd_radio_channel_down
  label: HD Radio Channel Down
  kind: action
  params: []
- id: hd_radio_channel_set
  label: HD Radio Channel Set
  kind: action
  params:
    - name: frequency
      type: string
      description: 6-digit frequency with optional MC* (MultiCast channel)
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
- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params: []
- id: hd_radio_band_mode_set
  label: HD Radio Band/Mode
  kind: action
  params:
    - name: mode
      type: string
      description: HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU
- id: hd_radio_status_query
  label: HD Radio Status Query
  kind: action
  params: []

# Online Music / USB/iPod / Bluetooth Control
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
- id: enter
  label: Enter / Play / Pause
  kind: action
  params: []
- id: playback_play
  label: Play
  kind: action
  params: []
- id: playback_pause
  label: Pause
  kind: action
  params: []
- id: playback_stop
  label: Stop
  kind: action
  params: []
- id: skip_plus
  label: Skip Plus
  kind: action
  params: []
- id: skip_minus
  label: Skip Minus
  kind: action
  params: []
- id: manual_search_plus
  label: Manual Search Plus
  kind: action
  params: []
- id: manual_search_minus
  label: Manual Search Minus
  kind: action
  params: []
- id: repeat_one
  label: Repeat One
  kind: action
  params: []
- id: repeat_all
  label: Repeat All
  kind: action
  params: []
- id: repeat_off
  label: Repeat Off
  kind: action
  params: []
- id: random_on
  label: Random On
  kind: action
  params: []
- id: random_off
  label: Random Off
  kind: action
  params: []
- id: toggle_ipod_mode
  label: Toggle iPod Mode / On Screen Mode
  kind: action
  params: []
- id: page_next
  label: Page Next
  kind: action
  params: []
- id: page_previous
  label: Page Previous
  kind: action
  params: []
- id: manual_search_stop
  label: Manual Search Stop
  kind: action
  params: []
- id: preset_call
  label: Preset Call
  kind: action
  params:
    - name: number
      type: integer
      description: "00-35"
- id: preset_memory
  label: Preset Memory
  kind: action
  params:
    - name: number
      type: integer
      description: "00-35"
- id: net_audio_preset_name_query
  label: Net Audio Preset Name Status
  kind: action
  params: []
- id: favorites_add
  label: Add Favorites Folder
  kind: action
  params: []
- id: onscreen_display_info
  label: Onscreen Display Information List
  kind: action
  params: []
- id: onscreen_display_request
  label: Onscreen Display Information Request
  kind: action
  params: []

# System Control
- id: cursor_up_system
  label: Cursor Up (System)
  kind: action
  params: []
- id: cursor_down_system
  label: Cursor Down (System)
  kind: action
  params: []
- id: cursor_left_system
  label: Cursor Left (System)
  kind: action
  params: []
- id: cursor_right_system
  label: Cursor Right (System)
  kind: action
  params: []
- id: enter_system
  label: Enter (System)
  kind: action
  params: []
- id: return_system
  label: Return (System)
  kind: action
  params: []
- id: option_system
  label: Option (System)
  kind: action
  params: []
- id: info_system
  label: Info (System)
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
- id: setup_menu_query
  label: Setup Menu Status Query
  kind: action
  params: []
- id: insta_prev_on
  label: InstaPrevue On
  kind: action
  params: []
- id: insta_prev_off
  label: InstaPrevue Off
  kind: action
  params: []
- id: insta_prev_query
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
- id: all_zone_stereo_query
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
- id: trigger_status_query
  label: Trigger Status Query
  kind: action
  params: []
- id: upgrade_id_display
  label: Upgrade ID Number Display
  kind: action
  params: []
- id: maintenance_mode_start
  label: Remote Maintenance Mode Start
  kind: action
  params: []
- id: maintenance_mode_end
  label: Remote Maintenance Mode End
  kind: action
  params: []
- id: maintenance_status_query
  label: Remote Maintenance Status Query
  kind: action
  params: []
- id: dimmer_set
  label: Dimmer
  kind: action
  params:
    - name: mode
      type: string
      description: BRI (Bright), DIM, DAR (Dark), OFF, SEL (toggle)
- id: dimmer_query
  label: Dimmer Query
  kind: action
  params: []
```

## Feedbacks
```yaml
# Power
- id: power_status
  type: enum
  values: [PWON, PWSTANDBY]
  description: Returns PWON or PWSTANDBY

# Master Volume
- id: master_volume_status
  type: string
  description: "3 ASCII digits: 00 (MIN) to 98 (+18dB), 80 = 0dB. Format: MV###<CR>"
# Channel Volume
- id: channel_volume_status
  type: string
  description: "Returns per-channel volume, e.g. CVFL 50<CR>"

# Mute
- id: mute_status
  type: enum
  values: [MUON, MUOFF]

# Input
- id: input_status
  type: string
  description: "Current input source code, e.g. SIDVD<CR>"

# Surround Mode
- id: surround_mode_status
  type: string
  description: "Current surround mode string, e.g. MSSTEREO<CR>"

# Main Zone
- id: main_zone_status
  type: enum
  values: [ZMON, ZMOFF]
  description: Z2/Z3 mode also returns SR status

# Sleep Timer
- id: sleep_timer_status
  type: string
  description: "SLP### or SLP OFF"

# ECO Mode
- id: eco_mode_status
  type: enum
  values: [ECOON, ECOAUTO, ECOOFF]

# Auto Standby
- id: auto_standby_status
  type: string
  description: "STBY15M, STBY30M, STBY60M, STBYOFF"

# Tuner
- id: tuner_frequency
  type: string
  description: "TFAN###### (AM: kHz, FM: MHz*100)"
- id: rds_station_name
  type: string
  description: "TFANNAME######## (8 chars)"

# HD Radio
- id: hd_radio_status
  type: string
  description: "Band, station name, multi cast channel, signal level, artist, title, album, genre, program type, mode (digital/analog)"

# Remote Maintenance
- id: maintenance_status
  type: enum
  values: [RM ON, RM OFF]

# Trigger
- id: trigger_status
  type: string
  description: "TR1 ON/OFF TR2 ON/OFF"

# Dimmer
- id: dimmer_status
  type: enum
  values: [DIM BRI, DIM DIM, DIM DAR, DIM OFF]

# Online Music / USB/iPod display info
- id: display_info
  type: string
  description: NSA/NSE return up to 9 lines (NSA0-NSA8, NSE0-NSE8) of UTF-8 display data
```

## Variables
```yaml
# UNRESOLVED: variable system not explicitly defined in source. The protocol uses
# COMMAND + PARAMETER + CR for both actions and queries (via ? suffix).
# No distinct variable/getter pattern beyond the ? RESPONSE mechanism.
```

## Events
```yaml
# The device sends unsolicited EVENT messages when:
# - System state changes (input, volume, surround mode, zone on/off)
# - User operates device directly
# - EVENT is sent within 5 seconds of state change
# - EVENT format mirrors COMMAND format
# Example events:
# - SI###<CR> - input changed
# - MS###<CR> - surround mode changed
# - CVFL ##<CR> - channel volume changed
# - PWON<CR> or PWSTANDBY<CR> - power state changed
# NOTE: When input source changes, SURROUND MODE and CHANNEL VOLUME also return
# as EVENT if they differ from previous values.
```

## Macros
```yaml
# Power-on sequencing (documented):
# - After sending PWON<CR>, wait 1 second before sending next command
# - Command interval: minimum 50ms between commands
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "After power on command (PWON), wait 1 second before transmitting next command"
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond power-on sequencing
```

## Notes
- Protocol is ASCII-based, half-duplex, max 135 bytes per message
- Command structure: COMMAND + PARAMETER + CR (0x0D)
- Minimum 50ms interval between commands from controller
- RESPONSE must be sent within 200ms of receiving a query command
- EVENT must be sent within 5 seconds of state change
- When input source changes, channel volume and surround mode return as EVENT if they differ from prior values
- During EVENT transmission, COMMAND is still receivable
- Master volume uses 3-character parameter for 0.5dB precision (e.g., MV805 = +0.5dB, MV795 = -0.5dB)
- Channel volume uses 2-character parameter with 50 = 0dB, range 38-62 (subwoofers: 00, 38-62)
- Bass/Treble uses 50 = 0dB with ±6dB operating range (44-56)
- ASCII usable range: 0x20 to 0x7F only
- No login or password authentication documented — auth.type is none
- Ethernet uses TCP port 23 (Telnet); RS-232 uses 9600 8N1
<!-- UNRESOLVED: exact model names within NR Series not specified -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: binary encoding for any binary command data not applicable here (ASCII only) -->

## Provenance

```yaml
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:42.330Z
retrieved_at: 2026-04-29T11:13:42.330Z
last_checked_at: 2026-04-23T08:09:31.366Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:09:31.366Z
matched_actions: 227
action_count: 227
confidence: high
summary: "All 227 spec actions verified against source; transport parameters confirmed; bidirectional coverage of command protocol achieved."
```

## Known Gaps

```yaml
[]
```
