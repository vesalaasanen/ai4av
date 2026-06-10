---
spec_id: admin/denon-dra800_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon DRA800 Series Control Spec"
manufacturer: Denon
model_family: "DRA800 Series"
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - "DRA800 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-21T09:21:51.925Z
last_checked_at: 2026-06-09T10:55:39.549Z
generated_at: 2026-06-09T10:55:39.549Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SVON
  - SVOFF
  - "SV?"
  - "PSTONE CTRL?"
  - "firmware compatibility range not stated in source"
  - "full response format for all query commands not explicitly enumerated"
  - "channel volume parameter ranges not fully enumerated per channel type"
  - "complete event taxonomy not enumerated in source"
  - "multi-step macros not explicitly documented in source"
  - "no explicit safety warnings, fault behavior, or error recovery sequences stated in source"
  - "no voltage, current, or power specifications provided"
  - "firmware version compatibility not stated"
  - "error codes and fault behavior not enumerated in source"
  - "authentication token format not applicable (no auth in source)"
  - "electrical specifications (voltage/current/power) not stated"
verification:
  verdict: verified
  checked_at: 2026-06-09T10:55:39.549Z
  matched_actions: 336
  action_count: 336
  confidence: medium
  summary: "All 336 spec actions have semantic matches in the source command table; transport port 23, 9600 baud, 8N1 confirmed verbatim; 4 source commands (SV ON, SV OFF, SV?, PS TONE CTRL?) are unrepresented, below the >5 short threshold. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Denon DRA800 Series Control Spec

## Summary
AV receiver supporting both RS-232C and TCP/IP Ethernet control. ASCII-based 2-character command protocol with CR (0x0D) termination. Controls power, volume, input selection, surround modes, and multi-zone operation. No authentication required per source.

<!-- UNRESOLVED: firmware compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet) stated in source
serial:
  baud_rate: 9600  # 9600bps stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Add only traits supported by evidence from source:
- powerable       # PWON/PWSTANDBY commands present
- routable        # SI (input selection) commands present
- queryable       # ? suffix commands (e.g., PW?, MV?, SI?) returning state
- levelable       # MV (master volume), CV (channel volume) commands present
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
      description: Volume value 00-98, 80=0dB, 00=minimum (---)
- id: master_volume_query
  label: Query Master Volume
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

# Input Selection
- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: Source name (e.g., DVD, CD, TUNER, BD, TV, SAT/CBL, MPLAY, GAME, NET, USB, BT, etc.)
- id: input_query
  label: Query Input Status
  kind: action
  params: []

# Surround Mode
- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Mode name (e.g., STEREO, MUSIC, MOVIE, GAME, DIRECT, PURE DIRECT, DOLBY DIGITAL, DTS SURROUND, AURO3D, etc.)
- id: surround_mode_query
  label: Query Surround Mode
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
- id: main_zone_query
  label: Query Main Zone Status
  kind: action
  params: []

# Channel Volume (CV) - per-channel level control
# Channels: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: Channel name (e.g., FL, FR, C, SW, SL, SR, etc.)
- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: Channel name (e.g., FL, FR, C, SW, SL, SR, etc.)
- id: channel_volume_set
  label: Set Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: Channel name
    - name: level
      type: integer
      description: Channel level value (38-62, 50=0dB)
- id: channel_volume_query
  label: Query Channel Volume Status
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

# Video Output
- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: Source to route to video output
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Picture mode (OFF, STD, MOV, VVD, STM, CTM, DAY, NGT)
- id: picture_mode_query
  label: Query Picture Mode
  kind: action
  params: []

# Sleep Timer
- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Timer value 001-120 minutes, 010=10min
- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  params: []
- id: sleep_timer_query
  label: Query Sleep Timer
  kind: action
  params: []

# Eco Mode
- id: eco_mode_set
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ECO mode (ON, AUTO, OFF)
- id: eco_mode_query
  label: Query ECO Mode
  kind: action
  params: []

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
  label: Set Tuner Frequency
  kind: action
  params:
    - name: frequency
      type: integer
      description: Frequency value (6 digits: ****.** kHz AM or ****.** MHz FM)
- id: tuner_query
  label: Query Tuner Status
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
- id: tuner_preset_set
  label: Set Tuner Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-56
- id: tuner_band_set
  label: Set Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: Band (AM, FM)

# Zone 2 Control
- id: zone2_on
  label: Zone 2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone 2 Off
  kind: action
  params: []
- id: zone2_source
  label: Zone 2 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: Zone 2 source (PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, NET, USB, BT, etc.)
- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
- id: zone2_volume_set
  label: Set Zone 2 Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume value 00-98, 80=0dB
- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []
- id: zone2_query
  label: Query Zone 2 Status
  kind: action
  params: []

# Zone 3 Control
- id: zone3_on
  label: Zone 3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone 3 Off
  kind: action
  params: []
- id: zone3_source
  label: Zone 3 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: Zone 3 source (PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, NET, USB, BT, etc.)
- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  params: []
- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  params: []
- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  params: []
- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  params: []
- id: zone3_query
  label: Query Zone 3 Status
  kind: action
  params: []

# Display Dimmer
- id: dimmer_set
  label: Set Display Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: Dimmer level (BRI, DIM, DAR, OFF, SEL)
- id: dimmer_query
  label: Query Dimmer Status
  kind: action
  params: []

# Trigger Output
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
- id: channel_volume_reset
  label: Reset All Channel Volumes
  kind: action
  params: []
- id: rec_select
  label: Rec Select Source
  kind: action
  params:
    - name: source
      type: string
      description: Source name (same as SI parameters) or SOURCE to cancel REC mode
- id: rec_select_query
  label: Query Rec Select Status
  kind: action
  params: []
- id: digital_input_mode_set
  label: Set Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Input mode (AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO)
- id: digital_input_mode_query
  label: Query Digital Input Mode
  kind: action
  params: []
- id: digital_input_format_set
  label: Set Digital Input Format
  kind: action
  params:
    - name: format
      type: string
      description: Digital input format (AUTO, PCM, DTS)
- id: digital_input_format_query
  label: Query Digital Input Format
  kind: action
  params: []
- id: auto_standby_set
  label: Set Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: Standby time (15M, 30M, 60M, OFF)
- id: auto_standby_query
  label: Query Auto Standby
  kind: action
  params: []
- id: main_zone_favorite_select
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: preset
      type: string
      description: Favorite number (FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4)
- id: main_zone_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: preset
      type: string
      description: Favorite number to save (FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4)
- id: quick_select
  label: Quick Select
  kind: action
  params:
    - name: preset
      type: string
      description: Quick select preset (QUICK1, QUICK2, QUICK3, QUICK4, QUICK5)
- id: quick_select_memory
  label: Quick Select Memory
  kind: action
  params:
    - name: preset
      type: string
      description: Quick select preset to save (QUICK1, QUICK2, QUICK3, QUICK4, QUICK5)
- id: quick_select_query
  label: Query Quick Select Status
  kind: action
  params: []
- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: Aspect ratio mode (ASPNRM for 4:3, ASPFUL for 16:9)
- id: aspect_ratio_query
  label: Query Aspect Ratio
  kind: action
  params: []
- id: hdmi_monitor_set
  label: Set HDMI Monitor Output
  kind: action
  params:
    - name: output
      type: string
      description: Monitor output (MONIAUTO, MONI1, MONI2)
- id: hdmi_monitor_query
  label: Query HDMI Monitor Output
  kind: action
  params: []
- id: video_resolution_set
  label: Set Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: Resolution (SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO)
- id: video_resolution_query
  label: Query Video Resolution
  kind: action
  params: []
- id: hdmi_resolution_set
  label: Set HDMI Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: HDMI resolution (SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO)
- id: hdmi_resolution_query
  label: Query HDMI Resolution
  kind: action
  params: []
- id: hdmi_audio_output_set
  label: Set HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: Audio output destination (AUDIO AMP, AUDIO TV)
- id: hdmi_audio_output_query
  label: Query HDMI Audio Output
  kind: action
  params: []
- id: video_processing_mode_set
  label: Set Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Video processing mode (VPMAUTO, VPMGAME, VPMMOVI)
- id: video_processing_mode_query
  label: Query Video Processing Mode
  kind: action
  params: []
- id: vertical_stretch_set
  label: Set Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: Vertical stretch state (ON, OFF)
- id: vertical_stretch_query
  label: Query Vertical Stretch
  kind: action
  params: []
- id: bass_set
  label: Set Bass Level
  kind: action
  params:
    - name: level
      type: integer
      description: Bass level 00-99, 50=0dB; AVR range -6 to +6 (44-56)
- id: bass_query
  label: Query Bass Level
  kind: action
  params: []
- id: treble_set
  label: Set Treble Level
  kind: action
  params:
    - name: level
      type: integer
      description: Treble level 00-99, 50=0dB; AVR range -6 to +6 (44-56)
- id: treble_query
  label: Query Treble Level
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
  label: Set Dialog Level
  kind: action
  params:
    - name: level
      type: integer
      description: Dialog level 38-62, 50=0dB
- id: dialog_level_query
  label: Query Dialog Level
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
  label: Set Subwoofer Level
  kind: action
  params:
    - name: level
      type: integer
      description: Subwoofer level 00,38-62, 50=0dB
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
      type: integer
      description: Subwoofer 2 level 00,38-62, 50=0dB
- id: subwoofer_level_query
  label: Query Subwoofer Level
  kind: action
  params: []
- id: cinema_eq_set
  label: Set Cinema EQ
  kind: action
  params:
    - name: state
      type: string
      description: Cinema EQ state (ON, OFF)
- id: cinema_eq_query
  label: Query Cinema EQ
  kind: action
  params: []
- id: ps_mode_set
  label: Set PS Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Dolby PL2/PLx mode (MODE:MUSIC, MODE:CINEMA, MODE:GAME, MODE:PRO LOGIC)
- id: ps_mode_query
  label: Query PS Mode
  kind: action
  params: []
- id: loudness_management_set
  label: Set Loudness Management
  kind: action
  params:
    - name: state
      type: string
      description: Loudness management state (ON, OFF)
- id: loudness_management_query
  label: Query Loudness Management
  kind: action
  params: []
- id: front_height_output_set
  label: Set Front Height Output
  kind: action
  params:
    - name: state
      type: string
      description: Front height output state (ON, OFF)
- id: front_height_output_query
  label: Query Front Height Output
  kind: action
  params: []
- id: speaker_output_set
  label: Set Speaker Output
  kind: action
  params:
    - name: config
      type: string
      description: Speaker config (SP:FW, SP:FH, SP:SB, SP:HW, SP:BH, SP:BW, SP:FL, SP:HF, SP:FR)
- id: speaker_output_query
  label: Query Speaker Output
  kind: action
  params: []
- id: pl2z_height_gain_set
  label: Set PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: PL2z height gain (LOW, MID, HI)
- id: pl2z_height_gain_query
  label: Query PL2z Height Gain
  kind: action
  params: []
- id: multeq_set
  label: Set MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MultEQ mode (MULTEQ:AUDYSSEY, MULTEQ:BYP.LR, MULTEQ:FLAT, MULTEQ:MANUAL, MULTEQ:OFF)
- id: multeq_query
  label: Query MultEQ Mode
  kind: action
  params: []
- id: dynamic_eq_set
  label: Set Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: Dynamic EQ state (ON, OFF)
- id: dynamic_eq_query
  label: Query Dynamic EQ
  kind: action
  params: []
- id: reference_level_set
  label: Set Reference Level Offset
  kind: action
  params:
    - name: offset
      type: string
      description: Reference level offset in dB (0, 5, 10, 15)
- id: reference_level_query
  label: Query Reference Level Offset
  kind: action
  params: []
- id: dynamic_volume_set
  label: Set Dynamic Volume
  kind: action
  params:
    - name: mode
      type: string
      description: Dynamic volume mode (HEV, MED, LIT, OFF)
- id: dynamic_volume_query
  label: Query Dynamic Volume
  kind: action
  params: []
- id: audyssey_lfc_set
  label: Set Audyssey LFC
  kind: action
  params:
    - name: state
      type: string
      description: Audyssey LFC state (ON, OFF)
- id: audyssey_lfc_query
  label: Query Audyssey LFC
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
    - name: value
      type: integer
      description: Containment amount 00-99; AVR range 1-7 (01-07)
- id: containment_amount_query
  label: Query Containment Amount
  kind: action
  params: []
- id: audyssey_dsx_set
  label: Set Audyssey DSX
  kind: action
  params:
    - name: mode
      type: string
      description: DSX mode (DSX ONHW, DSX ONH, DSX ONW, DSX OFF)
- id: audyssey_dsx_query
  label: Query Audyssey DSX
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
      type: integer
      description: Stage width 00-99, 50=0dB; AVR range -10 to +10 (40-60)
- id: stage_width_query
  label: Query Stage Width
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
      type: integer
      description: Stage height 00-99, 50=0dB; AVR range -10 to +10 (40-60)
- id: stage_height_query
  label: Query Stage Height
  kind: action
  params: []
- id: graphic_eq_set
  label: Set Graphic EQ
  kind: action
  params:
    - name: state
      type: string
      description: Graphic EQ state (ON, OFF)
- id: graphic_eq_query
  label: Query Graphic EQ
  kind: action
  params: []
- id: drc_set
  label: Set Dynamic Range Compression
  kind: action
  params:
    - name: mode
      type: string
      description: DRC mode (AUTO, LOW, MID, HI, OFF)
- id: drc_query
  label: Query Dynamic Range Compression
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
    - name: value
      type: integer
      description: Bass sync 00-99; AVR range 0-16
- id: bass_sync_query
  label: Query Bass Sync
  kind: action
  params: []
- id: dialogue_enhancer_set
  label: Set Dialogue Enhancer
  kind: action
  params:
    - name: mode
      type: string
      description: Dialogue enhancer mode (OFF, LOW, MED, HIGH)
- id: dialogue_enhancer_query
  label: Query Dialogue Enhancer
  kind: action
  params: []
- id: lfe_up
  label: LFE Level Up
  kind: action
  params: []
- id: lfe_down
  label: LFE Level Down
  kind: action
  params: []
- id: lfe_set
  label: Set LFE Level
  kind: action
  params:
    - name: level
      type: integer
      description: LFE level 00-99; AVR range 0 to -10
- id: lfe_query
  label: Query LFE Level
  kind: action
  params: []
- id: lfe_ext_set
  label: Set LFE Level (Ext In Mode)
  kind: action
  params:
    - name: level
      type: string
      description: LFE ext level when EXT.IN/7.1CH IN (LFL 00, LFL 05, LFL 10, LFL 15)
- id: lfe_ext_query
  label: Query LFE Level (Ext In Mode)
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
      type: integer
      description: Effect level 00-99; AVR range 1-15
- id: effect_query
  label: Query Effect Level
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
  label: Set Delay
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: Delay 000-999ms; AVR range 0-300ms (0-60ms 3ms/step, >60ms 10ms/step)
- id: delay_query
  label: Query Delay
  kind: action
  params: []
- id: panorama_set
  label: Set Panorama
  kind: action
  params:
    - name: state
      type: string
      description: Panorama state (ON, OFF)
- id: panorama_query
  label: Query Panorama
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
      type: integer
      description: Dimension 00-99; AVR range 0-6
- id: dimension_query
  label: Query Dimension
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
      type: integer
      description: Center width 00-99; AVR range 0-7
- id: center_width_query
  label: Query Center Width
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
      type: integer
      description: Center image 00-99; AVR range 0.0-1.0
- id: center_image_query
  label: Query Center Image
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
      type: integer
      description: Center gain 00-99; AVR range 0.0-1.0
- id: center_gain_query
  label: Query Center Gain
  kind: action
  params: []
- id: center_spread_set
  label: Set Center Spread
  kind: action
  params:
    - name: state
      type: string
      description: Center spread state (ON, OFF)
- id: center_spread_query
  label: Query Center Spread
  kind: action
  params: []
- id: subwoofer_output_set
  label: Set Subwoofer Output (Direct/Stereo Mode)
  kind: action
  params:
    - name: state
      type: string
      description: Subwoofer output state in DIRECT/STEREO mode (ON, OFF)
- id: subwoofer_output_query
  label: Query Subwoofer Output
  kind: action
  params: []
- id: room_size_set
  label: Set Room Size
  kind: action
  params:
    - name: size
      type: string
      description: Room size (S, MS, M, ML, L)
- id: room_size_query
  label: Query Room Size
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
    - name: milliseconds
      type: integer
      description: Audio delay 000-999ms; AVR range 0-200ms
- id: audio_delay_query
  label: Query Audio Delay
  kind: action
  params: []
- id: audio_restorer_set
  label: Set Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: Audio restorer mode (OFF, LOW, MED, HI); LOW=MODE3, MED=MODE2, HI=MODE1
- id: audio_restorer_query
  label: Query Audio Restorer
  kind: action
  params: []
- id: front_speaker_set
  label: Set Front Speaker Output
  kind: action
  params:
    - name: output
      type: string
      description: Front speaker output (SPA, SPB, A+B)
- id: front_speaker_query
  label: Query Front Speaker Output
  kind: action
  params: []
- id: auro_preset_set
  label: Set Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: Auro-Matic 3D preset (SMA, MED, LAR, SPE); Auro-3D Upgrade only
- id: auro_preset_query
  label: Query Auro-Matic 3D Preset
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
  label: Set Auro-Matic 3D Strength
  kind: action
  params:
    - name: level
      type: integer
      description: Auro-Matic strength 00-99; AVR range 1-16; Auro-3D Upgrade only
- id: auro_strength_query
  label: Query Auro-Matic 3D Strength
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
  label: Set Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: Contrast 000-100, 050=0; AVR range -50 to +50 (000-100)
- id: contrast_query
  label: Query Contrast
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
  label: Set Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: Brightness 000-100, 050=0; AVR range -50 to +50 (000-100)
- id: brightness_query
  label: Query Brightness
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
  label: Set Saturation
  kind: action
  params:
    - name: level
      type: integer
      description: Saturation 000-100, 050=0; AVR range -50 to +50 (000-100)
- id: saturation_query
  label: Query Saturation
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
  label: Set Hue
  kind: action
  params:
    - name: level
      type: integer
      description: Hue 44-56, 50=0; AVR range -6 to +6
- id: hue_query
  label: Query Hue
  kind: action
  params: []
- id: dnr_set
  label: Set DNR
  kind: action
  params:
    - name: mode
      type: string
      description: DNR noise reduction mode (OFF, LOW, MID, HI)
- id: dnr_query
  label: Query DNR
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
  label: Set Enhancer
  kind: action
  params:
    - name: level
      type: integer
      description: Enhancer level 00-12; AVR range 0-12
- id: enhancer_query
  label: Query Enhancer
  kind: action
  params: []
- id: zone2_mute_query
  label: Query Zone 2 Mute Status
  kind: action
  params: []
- id: zone2_channel_setting_set
  label: Set Zone 2 Channel Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Channel mode (ST for stereo, MONO)
- id: zone2_channel_setting_query
  label: Query Zone 2 Channel Mode
  kind: action
  params: []
- id: zone2_channel_volume_up
  label: Zone 2 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: Channel (FL, FR)
- id: zone2_channel_volume_down
  label: Zone 2 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: Channel (FL, FR)
- id: zone2_channel_volume_set
  label: Set Zone 2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: Channel (FL, FR)
    - name: level
      type: integer
      description: Channel level 38-62, 50=0dB
- id: zone2_channel_volume_query
  label: Query Zone 2 Channel Volume
  kind: action
  params: []
- id: zone2_hpf_set
  label: Set Zone 2 HPF
  kind: action
  params:
    - name: state
      type: string
      description: HPF state (ON, OFF)
- id: zone2_hpf_query
  label: Query Zone 2 HPF
  kind: action
  params: []
- id: zone2_bass_up
  label: Zone 2 Bass Up
  kind: action
  params: []
- id: zone2_bass_down
  label: Zone 2 Bass Down
  kind: action
  params: []
- id: zone2_bass_set
  label: Set Zone 2 Bass
  kind: action
  params:
    - name: level
      type: integer
      description: Bass level 00-99; AVR range -10 to +10 (40-60)
- id: zone2_bass_query
  label: Query Zone 2 Bass
  kind: action
  params: []
- id: zone2_treble_up
  label: Zone 2 Treble Up
  kind: action
  params: []
- id: zone2_treble_down
  label: Zone 2 Treble Down
  kind: action
  params: []
- id: zone2_treble_set
  label: Set Zone 2 Treble
  kind: action
  params:
    - name: level
      type: integer
      description: Treble level 00-99; AVR range -10 to +10 (40-60)
- id: zone2_treble_query
  label: Query Zone 2 Treble
  kind: action
  params: []
- id: zone2_hdmi_audio_set
  label: Set Zone 2 HDMI Audio
  kind: action
  params:
    - name: mode
      type: string
      description: HDMI audio mode (THR for through, PCM)
- id: zone2_hdmi_audio_query
  label: Query Zone 2 HDMI Audio
  kind: action
  params: []
- id: zone2_sleep_timer_set
  label: Set Zone 2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Timer value 001-120 minutes (e.g. 010=10min)
- id: zone2_sleep_timer_off
  label: Zone 2 Sleep Timer Off
  kind: action
  params: []
- id: zone2_sleep_timer_query
  label: Query Zone 2 Sleep Timer
  kind: action
  params: []
- id: zone2_auto_standby_set
  label: Set Zone 2 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: Standby time (2H, 4H, 8H, OFF)
- id: zone2_auto_standby_query
  label: Query Zone 2 Auto Standby
  kind: action
  params: []
- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  params:
    - name: preset
      type: string
      description: Quick select preset (QUICK1, QUICK2, QUICK3, QUICK4, QUICK5)
- id: zone2_quick_select_memory
  label: Zone 2 Quick Select Memory
  kind: action
  params:
    - name: preset
      type: string
      description: Quick select preset to save (QUICK1, QUICK2, QUICK3, QUICK4, QUICK5)
- id: zone2_quick_select_query
  label: Query Zone 2 Quick Select Status
  kind: action
  params: []
- id: zone2_favorite_select
  label: Zone 2 Favorite Select
  kind: action
  params:
    - name: preset
      type: string
      description: Favorite number (FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4)
- id: zone2_favorite_memory
  label: Zone 2 Favorite Memory
  kind: action
  params:
    - name: preset
      type: string
      description: Favorite number to save (FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4)
- id: zone3_volume_set
  label: Set Zone 3 Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume value 00-98, 80=0dB
- id: zone3_mute_query
  label: Query Zone 3 Mute Status
  kind: action
  params: []
- id: zone3_channel_setting_set
  label: Set Zone 3 Channel Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Channel mode (ST for stereo, MONO)
- id: zone3_channel_setting_query
  label: Query Zone 3 Channel Mode
  kind: action
  params: []
- id: zone3_channel_volume_up
  label: Zone 3 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: Channel (FL, FR)
- id: zone3_channel_volume_down
  label: Zone 3 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: Channel (FL, FR)
- id: zone3_channel_volume_set
  label: Set Zone 3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: Channel (FL, FR)
    - name: level
      type: integer
      description: Channel level 38-62, 50=0dB
- id: zone3_channel_volume_query
  label: Query Zone 3 Channel Volume
  kind: action
  params: []
- id: zone3_hpf_set
  label: Set Zone 3 HPF
  kind: action
  params:
    - name: state
      type: string
      description: HPF state (ON, OFF)
- id: zone3_hpf_query
  label: Query Zone 3 HPF
  kind: action
  params: []
- id: zone3_bass_up
  label: Zone 3 Bass Up
  kind: action
  params: []
- id: zone3_bass_down
  label: Zone 3 Bass Down
  kind: action
  params: []
- id: zone3_bass_set
  label: Set Zone 3 Bass
  kind: action
  params:
    - name: level
      type: integer
      description: Bass level 00-99; AVR range -10 to +10 (40-60)
- id: zone3_bass_query
  label: Query Zone 3 Bass
  kind: action
  params: []
- id: zone3_treble_up
  label: Zone 3 Treble Up
  kind: action
  params: []
- id: zone3_treble_down
  label: Zone 3 Treble Down
  kind: action
  params: []
- id: zone3_treble_set
  label: Set Zone 3 Treble
  kind: action
  params:
    - name: level
      type: integer
      description: Treble level 00-99; AVR range -10 to +10 (40-60)
- id: zone3_treble_query
  label: Query Zone 3 Treble
  kind: action
  params: []
- id: zone3_sleep_timer_set
  label: Set Zone 3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Timer value 001-120 minutes (e.g. 010=10min)
- id: zone3_sleep_timer_off
  label: Zone 3 Sleep Timer Off
  kind: action
  params: []
- id: zone3_sleep_timer_query
  label: Query Zone 3 Sleep Timer
  kind: action
  params: []
- id: zone3_auto_standby_set
  label: Set Zone 3 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: Standby time (2H, 4H, 8H, OFF)
- id: zone3_auto_standby_query
  label: Query Zone 3 Auto Standby
  kind: action
  params: []
- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  params:
    - name: preset
      type: string
      description: Quick select preset (QUICK1, QUICK2, QUICK3, QUICK4, QUICK5)
- id: zone3_quick_select_memory
  label: Zone 3 Quick Select Memory
  kind: action
  params:
    - name: preset
      type: string
      description: Quick select preset to save (QUICK1, QUICK2, QUICK3, QUICK4, QUICK5)
- id: zone3_quick_select_query
  label: Query Zone 3 Quick Select Status
  kind: action
  params: []
- id: zone3_favorite_select
  label: Zone 3 Favorite Select
  kind: action
  params:
    - name: preset
      type: string
      description: Favorite number (FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4)
- id: zone3_favorite_memory
  label: Zone 3 Favorite Memory
  kind: action
  params:
    - name: preset
      type: string
      description: Favorite number to save (FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4)
- id: tuner_preset_query
  label: Query Tuner Preset Status
  kind: action
  params: []
- id: tuner_preset_memory
  label: Tuner Preset Memory Store
  kind: action
  params: []
- id: tuner_preset_memory_set
  label: Set Tuner Preset Memory to Number
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-56
- id: tuner_mode_set
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Tuning mode (ANAUTO for auto, ANMANUAL for manual)
- id: tuner_band_query
  label: Query Tuner Band and Mode
  kind: action
  params: []
- id: tuner_rds_name_query
  label: Query Tuner RDS Station Name
  kind: action
  params: []
- id: hd_frequency_up
  label: HD Radio Frequency Up
  kind: action
  params: []
- id: hd_frequency_down
  label: HD Radio Frequency Down
  kind: action
  params: []
- id: hd_frequency_set
  label: Set HD Radio Frequency
  kind: action
  params:
    - name: frequency
      type: integer
      description: 6-digit frequency; >050000 is AM kHz, <050000 is FM MHz
- id: hd_frequency_query
  label: Query HD Radio Frequency
  kind: action
  params: []
- id: hd_multicast_select
  label: HD Radio Multicast Channel Select
  kind: action
  params:
    - name: channel
      type: integer
      description: Multicast channel 1-8; 0 for analog
- id: hd_preset_up
  label: HD Radio Preset Up
  kind: action
  params: []
- id: hd_preset_down
  label: HD Radio Preset Down
  kind: action
  params: []
- id: hd_preset_set
  label: Set HD Radio Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-56
- id: hd_preset_query
  label: Query HD Radio Preset
  kind: action
  params: []
- id: hd_preset_memory
  label: HD Radio Preset Memory Store
  kind: action
  params: []
- id: hd_preset_memory_set
  label: Set HD Radio Preset Memory to Number
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-56
- id: hd_band_set
  label: Set HD Radio Band
  kind: action
  params:
    - name: band
      type: string
      description: Band (HDAM for AM, HDFM for FM)
- id: hd_tuning_mode_set
  label: Set HD Radio Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Tuning mode (HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU)
- id: hd_band_mode_query
  label: Query HD Radio Band and Mode
  kind: action
  params: []
- id: hd_status_query
  label: Query HD Radio Status
  kind: action
  params: []
- id: ns_navigate
  label: NS Navigation Control
  kind: action
  params:
    - name: code
      type: string
      description: "Sub-code: 90=Up, 91=Down, 92=Left, 93=Right, 94=Enter, 9A=Play, 9B=Pause, 9C=Stop, 9D=Skip+, 9E=Skip-, 9F=ManSearch+, 9G=ManSearch-, 9H=RepeatOne, 9I=RepeatAll, 9J=RepeatOff, 9K=RandomOn, 9M=RandomOff, 9W=iPodToggle, 9X=PageNext, 9Y=PagePrev, 9Z=SearchStop"
- id: ns_repeat_toggle
  label: NS Repeat Toggle
  kind: action
  params: []
- id: ns_random_toggle
  label: NS Random Toggle
  kind: action
  params: []
- id: ns_preset_call
  label: NS Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 00-35 (2014 AVR)
- id: ns_preset_memory
  label: NS Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 00-35 (2014 AVR)
- id: ns_preset_name_query
  label: NS Preset Name Query
  kind: action
  params: []
- id: ns_favorites_add
  label: NS Add Favorites Folder
  kind: action
  params: []
- id: ns_display_ascii_query
  label: NS Display Info Query (ASCII)
  kind: action
  params: []
- id: ns_display_utf8_query
  label: NS Display Info Query (UTF-8)
  kind: action
  params: []
- id: mn_navigate
  label: Menu Navigation Control
  kind: action
  params:
    - name: action
      type: string
      description: Navigation action (CUP, CDN, CLT, CRT, ENT, RTN, OPT, INF, CHL)
- id: mn_menu_set
  label: Set Setup Menu
  kind: action
  params:
    - name: state
      type: string
      description: Setup menu state (ON, OFF)
- id: mn_menu_query
  label: Query Setup Menu State
  kind: action
  params: []
- id: mn_insta_prevue_set
  label: Set InstaPrevue
  kind: action
  params:
    - name: state
      type: string
      description: InstaPrevue state (ON, OFF)
- id: mn_insta_prevue_query
  label: Query InstaPrevue State
  kind: action
  params: []
- id: mn_all_zone_stereo_set
  label: Set All Zone Stereo
  kind: action
  params:
    - name: state
      type: string
      description: All Zone Stereo state (ON, OFF)
- id: mn_all_zone_stereo_query
  label: Query All Zone Stereo State
  kind: action
  params: []
- id: remote_lock_set
  label: Set Remote Lock
  kind: action
  params:
    - name: state
      type: string
      description: Remote lock state (ON, OFF)
- id: panel_lock_set
  label: Set Panel Lock
  kind: action
  params:
    - name: mode
      type: string
      description: Panel lock mode (PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF)
- id: upgrade_id_display
  label: Display Upgrade ID Number
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
- id: remote_maintenance_query
  label: Query Remote Maintenance Status
  kind: action
  params: []
```

## Feedbacks
```yaml
# Power state
- id: power_state
  label: Power State
  type: enum
  values: [PWON, PWSTANDBY]

# Master volume level
- id: master_volume_level
  label: Master Volume Level
  type: integer
  description: Volume value 00-98, 80=0dB, 00=minimum

# Mute state
- id: mute_state
  label: Mute State
  type: enum
  values: [MUON, MUOFF]

# Input source
- id: input_source
  label: Input Source
  type: string
  description: Currently selected input source name

# Surround mode
- id: surround_mode
  label: Surround Mode
  type: string
  description: Currently active surround mode

# Main zone state
- id: main_zone_state
  label: Main Zone State
  type: enum
  values: [ZMON, ZMOFF]

# Channel volumes - per-channel dB level (38-62, 50=0dB)
- id: channel_volume_state
  label: Channel Volume State
  type: object
  description: Returns current channel volume for queried channel

# Tuner
- id: tuner_frequency
  label: Tuner Frequency
  type: string
  description: Current frequency (e.g., TFAN105000 for AM 1050.00kHz)
- id: tuner_rds_name
  label: RDS Station Name
  type: string
  description: Station name (EU/AP models only)

# Zone 2/3 state
- id: zone2_state
  label: Zone 2 State
  type: object
  description: Zone 2 on/off, source, volume, mute
- id: zone3_state
  label: Zone 3 State
  type: object
  description: Zone 3 on/off, source, volume, mute

# Trigger state
- id: trigger_state
  label: Trigger State
  type: object
  description: TR1 ON/OFF, TR2 ON/OFF

# Dimmer state
- id: dimmer_state
  label: Dimmer State
  type: enum
  values: [DIM BRI, DIM DIM, DIM DAR, DIM OFF]

# UNRESOLVED: full response format for all query commands not explicitly enumerated
```

## Variables
```yaml
# Tuner frequency - directly settable without command suffix
- id: tuner_frequency_param
  label: Tuner Frequency Parameter
  type: integer
  description: 6-digit frequency value for TF command

# Tuner preset - directly settable
- id: tuner_preset_param
  label: Tuner Preset Parameter
  type: integer
  description: Preset number 01-56 for TP command

# Sleep timer value
- id: sleep_timer_value
  label: Sleep Timer Value
  type: integer
  description: Minutes 001-120

# Channel volume - per-channel direct set
# UNRESOLVED: channel volume parameter ranges not fully enumerated per channel type
```

## Events
```yaml
# Device sends unsolicited EVENT messages when state changes directly
# Event format same as COMMAND structure: COMMAND+PARAMETER+CR
# Source states: "The EVENT should be sent within 5 seconds after the state of the system (AVR) is changed"
#
# Examples:
- id: power_state_event
  label: Power State Changed
  description: Unsolicited PWON or PWSTANDBY when power state changes
- id: input_changed_event
  label: Input Source Changed
  description: Unsolicited SI response when input changes
- id: volume_changed_event
  label: Volume Changed
  description: Unsolicited MV response when master volume changes
- id: surround_mode_changed_event
  label: Surround Mode Changed
  description: Unsolicited MS response when surround mode changes
- id: channel_volume_changed_event
  label: Channel Volume Changed
  description: Unsolicited CVFL/CVFR/etc. response when channel volume changes

# UNRESOLVED: complete event taxonomy not enumerated in source
```

## Macros
```yaml
# Power-on sequence - source note J: "1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)"
- id: power_on_sequence
  label: Power On Sequence
  description: Send PWON, wait 1 second before sending next command

# Input source change with channel volume feedback
# Source notes B, C: channel volume and surround mode return as EVENT when input changes

# UNRESOLVED: multi-step macros not explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  # Source note J: wait 1 second after PWON before sending subsequent commands
  - description: After sending PWON (power on), wait at least 1 second before transmitting any subsequent COMMAND
# UNRESOLVED: no explicit safety warnings, fault behavior, or error recovery sequences stated in source
# UNRESOLVED: no voltage, current, or power specifications provided
```

## Notes
- Command interval: source states "Send the COMMAND in 50ms or more intervals"
- Response time: source states RESPONSE "should be sent within 200ms of receiving the request COMMAND"
- Event time: source states EVENT "should be sent within 5 seconds after the state of the system (AVR) is changed"
- Half duplex: source states both RS-232C and Ethernet use "half duplex" communication
- Max data length: 135 bytes per message
- ASCII range: 0x20 to 0x7F (alphabet, numbers, space 0x20, some signs)
- CR (0x0D) used only as pause sign
- Volume 0.5dB step: uses 3 ASCII characters (e.g., MV805 for +0.5dB, MV795 for -0.5dB)
- Channel volume range: 38-62 ASCII (50=0dB); subwoofer SW: 00,38-62
- Master volume range: 00-98 ASCII (80=0dB, 00=minimum ---)
- No login or password procedure described in source
- RS-232C: DB-9 female, slave straight (DCE), pins 1=GND, 2=TXD, 3=RXD, 5=Common(GND), 4/6/7/8/9=NC
- Ethernet: RJ-45 10BASE-T/100BASE-TX, TCP port 23 (telnet)

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: error codes and fault behavior not enumerated in source -->
<!-- UNRESOLVED: authentication token format not applicable (no auth in source) -->
<!-- UNRESOLVED: electrical specifications (voltage/current/power) not stated -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-21T09:21:51.925Z
last_checked_at: 2026-06-09T10:55:39.549Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T10:55:39.549Z
matched_actions: 336
action_count: 336
confidence: medium
summary: "All 336 spec actions have semantic matches in the source command table; transport port 23, 9600 baud, 8N1 confirmed verbatim; 4 source commands (SV ON, SV OFF, SV?, PS TONE CTRL?) are unrepresented, below the >5 short threshold. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SVON
- SVOFF
- "SV?"
- "PSTONE CTRL?"
- "firmware compatibility range not stated in source"
- "full response format for all query commands not explicitly enumerated"
- "channel volume parameter ranges not fully enumerated per channel type"
- "complete event taxonomy not enumerated in source"
- "multi-step macros not explicitly documented in source"
- "no explicit safety warnings, fault behavior, or error recovery sequences stated in source"
- "no voltage, current, or power specifications provided"
- "firmware version compatibility not stated"
- "error codes and fault behavior not enumerated in source"
- "authentication token format not applicable (no auth in source)"
- "electrical specifications (voltage/current/power) not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
