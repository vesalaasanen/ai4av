---
spec_id: admin/marantz_sr7015_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR7015 Series Control Spec"
manufacturer: Marantz
model_family: SR7015
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR7015
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:31:52.616Z
last_checked_at: 2026-10-07T17:16:08.784Z
generated_at: 2026-10-07T17:16:08.784Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "populate from source, or remove section if not applicable"
  - "complete event catalog not explicitly enumerated in source"
  - "macros not explicitly documented in source"
  - "no safety warnings or interlock procedures stated in source"
  - "authentication/token format not stated in source"
  - "error codes/fault behavior not enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T17:16:08.784Z
  matched_actions: 267
  action_count: 267
  confidence: medium
  summary: "All 267 action units match source commands with correct shapes and stated transport values; the generic Denon/Marantz protocol doc names no SR7015, so applicability is inferred. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR7015 Series Control Spec

## Summary
AV receiver with TCP/IP (Telnet on port 23) and RS-232C control interfaces. ASCII command protocol with CR-terminated commands. Supports multi-zone operation (Main, Zone2, Zone3), surround mode selection, volume control, input routing, and tuner control.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (Telnet) stated in source
serial:
  baud_rate: 9600  # stated in source
  data_bits: 8     # stated in source
  parity: none     # stated in source
  stop_bits: 1     # stated in source
  flow_control: UNRESOLVED
auth:
  type: UNRESOLVED
```

## Traits
```yaml
- powerable    # PWON/PWSTANDBY commands present
- routable     # SI (input select) commands present
- queryable    # ? commands returning status present (e.g., PW?, SI?, MV?)
- levelable    # MV, CV, Z2CV commands for volume control
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
    - name: level
      type: integer
      description: Volume 00-98, 80=0dB, 00=min
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_query
  label: Mute Status Query
  kind: action
  params: []
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: source
      type: string
      description: Input source (DVD, BD, TV, SAT/CBL, MPLAY, GAME, NET, USB, etc.)
- id: input_query
  label: Input Status Query
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
  label: Main Zone Status Query
  kind: action
  params: []
- id: surround_mode_set
  label: Surround Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS, AURO3D, etc."
- id: surround_mode_query
  label: Surround Mode Query
  kind: action
  params: []
- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
    - name: level
      type: integer
      description: "38-62 by ASCII, 50=0dB"
- id: channel_volume_query
  label: Channel Volume Query
  kind: action
  params: []
- id: video_resolution_set
  label: Video Resolution Set
  kind: action
  params:
    - name: resolution
      type: string
      description: "SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO"
- id: hdmi_output_set
  label: HDMI Output Set
  kind: action
  params:
    - name: output
      type: string
      description: "MONI1, MONI2, MONIAUTO, AUDIO AMP, AUDIO TV"
- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120, 010=10min"
- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"
- id: tone_control_set
  label: Tone Control Set
  kind: action
  params:
    - name: setting
      type: string
      description: "TONE CTRL ON, TONE CTRL OFF"
- id: bass_set
  label: Bass Set
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or value 00-99, 50=0dB"
- id: treble_set
  label: Treble Set
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or value 00-99, 50=0dB"
- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
- id: tuner_frequency_set
  label: Tuner Frequency Set
  kind: action
  params:
    - name: frequency
      type: integer
      description: "6 digits: ****.** kHz AM or ****.** MHz FM"
- id: tuner_preset_set
  label: Tuner Preset Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: zone2_on
  label: Zone2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []
- id: zone2_volume_set
  label: Zone2 Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98, 80=0dB"
- id: zone3_on
  label: Zone3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []
- id: zone3_volume_set
  label: Zone3 Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98, 80=0dB"
- id: video_select_source
  label: Video Select Source
  kind: action
  params:
    - name: source
      type: string
      description: "SV source: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE"
- id: video_select_on
  label: Video Select On
  kind: action
  params: []
- id: video_select_off
  label: Video Select Off
  kind: action
  params: []
- id: video_select_query
  label: Video Select Query
  kind: action
  params: []
- id: digital_input_mode_set
  label: Digital Input Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "SD parameter: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"
- id: digital_input_mode_query
  label: Digital Input Mode Query
  kind: action
  params: []
- id: digital_audio_mode_set
  label: Digital Audio Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DC parameter: AUTO, PCM, DTS"
- id: digital_audio_mode_query
  label: Digital Audio Mode Query
  kind: action
  params: []
- id: main_zone_auto_standby_set
  label: Main Zone Auto Standby Set
  kind: action
  params:
    - name: setting
      type: string
      description: "STBY parameter: 15M, 30M, 60M, OFF"
- id: main_zone_auto_standby_query
  label: Main Zone Auto Standby Query
  kind: action
  params: []
- id: recording_source_set
  label: Recording Source Set
  kind: action
  params:
    - name: source
      type: string
      description: "SR source uses parameter names matching SI COMMAND; SOURCE cancels REC SELECT mode"
- id: recording_source_query
  label: Recording Source Query
  kind: action
  params: []
- id: favorite_select
  label: Favorite Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "ZMFAVORITE1, ZMFAVORITE2, ZMFAVORITE3, ZMFAVORITE4; favorite 1-4"
- id: favorite_memory_set
  label: Favorite Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "ZMFAVORITE1 MEMORY through ZMFAVORITE4 MEMORY"
- id: quick_select
  label: Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "MSQUICK1 through MSQUICK5"
- id: quick_select_memory_set
  label: Quick Select Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "MSQUICK1 MEMORY through MSQUICK5 MEMORY"
- id: quick_select_query
  label: Quick Select Query
  kind: action
  params: []
- id: aspect_ratio_set
  label: Aspect Ratio Set
  kind: action
  params:
    - name: mode
      type: string
      description: "VSASPNRM, VSASPFUL"
- id: aspect_ratio_query
  label: Aspect Ratio Query
  kind: action
  params: []
- id: hdmi_monitor_set
  label: HDMI Monitor Set
  kind: action
  params:
    - name: output
      type: string
      description: "VSMONIAUTO, VSMONI1, VSMONI2"
- id: hdmi_monitor_query
  label: HDMI Monitor Query
  kind: action
  params: []
- id: hdmi_resolution_set
  label: HDMI Resolution Set
  kind: action
  params:
    - name: resolution
      type: string
      description: "SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO"
- id: hdmi_resolution_query
  label: HDMI Resolution Query
  kind: action
  params: []
- id: hdmi_audio_output_query
  label: HDMI Audio Output Query
  kind: action
  params: []
- id: video_processing_mode_set
  label: Video Processing Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "VPMAUTO, VPMGAME, VPMMOVI"
- id: video_processing_mode_query
  label: Video Processing Mode Query
  kind: action
  params: []
- id: vertical_stretch_set
  label: Vertical Stretch Set
  kind: action
  params:
    - name: setting
      type: string
      description: "VST ON, VST OFF"
- id: vertical_stretch_query
  label: Vertical Stretch Query
  kind: action
  params: []
- id: tone_control_query
  label: Tone Control Query
  kind: action
  params: []
- id: bass_query
  label: Bass Query
  kind: action
  params: []
- id: treble_query
  label: Treble Query
  kind: action
  params: []
- id: dialog_level_set
  label: Dialog Level Set
  kind: action
  params:
    - name: setting
      type: string
      description: "DIL ON, DIL OFF, DIL UP, DIL DOWN, or value 38 to 62 by ASCII, 50=0dB"
- id: dialog_level_query
  label: Dialog Level Query
  kind: action
  params: []
- id: subwoofer_level_set
  label: Subwoofer Level Set
  kind: action
  params:
    - name: setting
      type: string
      description: "SWL ON, SWL OFF, SWL UP, SWL DOWN, or value 00,38 to 62 by ASCII, 50=0dB; SWL2 UP, SWL2 DOWN, or value 00,38 to 62 by ASCII, 50=0dB"
- id: subwoofer_level_query
  label: Subwoofer Level Query
  kind: action
  params: []
- id: cinema_eq_set
  label: Cinema EQ Set
  kind: action
  params:
    - name: setting
      type: string
      description: "CINEMA EQ.ON, CINEMA EQ.OFF"
- id: cinema_eq_query
  label: Cinema EQ Query
  kind: action
  params: []
- id: surround_decode_mode_set
  label: Surround Decode Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "MODE:MUSIC, MODE:CINEMA, MODE:GAME, MODE:PRO LOGIC"
- id: surround_decode_mode_query
  label: Surround Decode Mode Query
  kind: action
  params: []
- id: loudness_management_set
  label: Loudness Management Set
  kind: action
  params:
    - name: setting
      type: string
      description: "PSLOM ON, PSLOM OFF"
- id: loudness_management_query
  label: Loudness Management Query
  kind: action
  params: []
- id: front_height_set
  label: Front Height Set
  kind: action
  params:
    - name: setting
      type: string
      description: "FH:ON, FH:OFF"
- id: front_height_query
  label: Front Height Query
  kind: action
  params: []
- id: speaker_output_set
  label: Speaker Output Set
  kind: action
  params:
    - name: setting
      type: string
      description: "SP:FW, SP:FH, SP:SB, SP:HW, SP:BH, SP:BW, SP:FL, SP:HF, SP:FR"
- id: speaker_output_query
  label: Speaker Output Query
  kind: action
  params: []
- id: pl2z_height_gain_set
  label: PL2z Height Gain Set
  kind: action
  params:
    - name: setting
      type: string
      description: "PHG LOW, PHG MID, PHG HI"
- id: pl2z_height_gain_query
  label: PL2z Height Gain Query
  kind: action
  params: []
- id: mult_eq_mode_set
  label: Mult EQ Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "MULTEQ:AUDYSSEY, MULTEQ:BYP.LR, MULTEQ:FLAT, MULTEQ:MANUAL, MULTEQ:OFF"
- id: mult_eq_mode_query
  label: Mult EQ Mode Query
  kind: action
  params: []
- id: dynamic_eq_set
  label: Dynamic EQ Set
  kind: action
  params:
    - name: setting
      type: string
      description: "DYNEQ ON, DYNEQ OFF"
- id: reference_level_offset_set
  label: Reference Level Offset Set
  kind: action
  params:
    - name: level
      type: integer
      description: "REFLEV 0, REFLEV 5, REFLEV 10, REFLEV 15"
- id: reference_level_offset_query
  label: Reference Level Offset Query
  kind: action
  params: []
- id: dynamic_volume_set
  label: Dynamic Volume Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DYNVOL HEV, DYNVOL MED, DYNVOL LIT, DYNVOL OFF"
- id: dynamic_volume_query
  label: Dynamic Volume Query
  kind: action
  params: []
- id: audyssey_lfc_set
  label: Audyssey LFC Set
  kind: action
  params:
    - name: setting
      type: string
      description: "LFC ON, LFC OFF"
- id: audyssey_lfc_query
  label: Audyssey LFC Query
  kind: action
  params: []
- id: containment_amount_set
  label: Containment Amount Set
  kind: action
  params:
    - name: setting
      type: string
      description: "CNTAMT UP, CNTAMT DOWN, or AVR-operable values 01 to 07"
- id: containment_amount_query
  label: Containment Amount Query
  kind: action
  params: []
- id: audyssey_dsx_set
  label: Audyssey DSX Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DSX ONHW, DSX ONH, DSX ONW, DSX OFF"
- id: audyssey_dsx_query
  label: Audyssey DSX Query
  kind: action
  params: []
- id: stage_width_set
  label: Stage Width Set
  kind: action
  params:
    - name: setting
      type: string
      description: "STW UP, STW DOWN, or AVR-operable values 40 to 60"
- id: stage_width_query
  label: Stage Width Query
  kind: action
  params: []
- id: stage_height_set
  label: Stage Height Set
  kind: action
  params:
    - name: setting
      type: string
      description: "STH UP, STH DOWN, or AVR-operable values 40 to 60"
- id: stage_height_query
  label: Stage Height Query
  kind: action
  params: []
- id: graphic_eq_set
  label: Graphic EQ Set
  kind: action
  params:
    - name: setting
      type: string
      description: "GEQ ON, GEQ OFF"
- id: graphic_eq_query
  label: Graphic EQ Query
  kind: action
  params: []
- id: dynamic_compression_set
  label: Dynamic Compression Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DRC AUTO, DRC LOW, DRC MID, DRC HI, DRC OFF"
- id: dynamic_compression_query
  label: Dynamic Compression Query
  kind: action
  params: []
- id: bass_sync_set
  label: Bass Sync Set
  kind: action
  params:
    - name: setting
      type: string
      description: "BSC UP, BSC DOWN, or AVR-operable values 0 to 16"
- id: bass_sync_query
  label: Bass Sync Query
  kind: action
  params: []
- id: dialogue_enhancer_set
  label: Dialogue Enhancer Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DEH OFF, DEH LOW, DEH MED, DEH HIGH"
- id: dialogue_enhancer_query
  label: Dialogue Enhancer Query
  kind: action
  params: []
- id: lfe_level_set
  label: LFE Level Set
  kind: action
  params:
    - name: setting
      type: string
      description: "LFE UP, LFE DOWN, or AVR-operable values from 0 to -10"
- id: lfe_level_query
  label: LFE Level Query
  kind: action
  params: []
- id: lfe_input_level_set
  label: LFE Input Level Set
  kind: action
  params:
    - name: level
      type: integer
      description: "LFL 00, LFL 05, LFL 10, LFL 15"
- id: lfe_input_level_query
  label: LFE Input Level Query
  kind: action
  params: []
- id: effect_set
  label: Effect Set
  kind: action
  params:
    - name: setting
      type: string
      description: "EFF ON, EFF OFF, EFF UP, EFF DOWN, or AVR-operable values from 1 to 15"
- id: effect_query
  label: Effect Query
  kind: action
  params: []
- id: delay_set
  label: Delay Set
  kind: action
  params:
    - name: setting
      type: string
      description: "DEL UP, DEL DOWN, or values 000 to 999 by ASCII, 000=0ms, 300=300ms; AVR-operable 0 to 300; 0-60ms:3ms/Step Over 60ms:10ms/Step"
- id: delay_query
  label: Delay Query
  kind: action
  params: []
- id: panorama_set
  label: Panorama Set
  kind: action
  params:
    - name: setting
      type: string
      description: "PAN ON, PAN OFF"
- id: panorama_query
  label: Panorama Query
  kind: action
  params: []
- id: dimension_set
  label: Dimension Set
  kind: action
  params:
    - name: setting
      type: string
      description: "DIM UP, DIM DOWN, or AVR-operable values 0 to 6"
- id: dimension_query
  label: Dimension Query
  kind: action
  params: []
- id: center_width_set
  label: Center Width Set
  kind: action
  params:
    - name: setting
      type: string
      description: "CEN UP, CEN DOWN, or AVR-operable values 0 to 7"
- id: center_width_query
  label: Center Width Query
  kind: action
  params: []
- id: center_image_set
  label: Center Image Set
  kind: action
  params:
    - name: setting
      type: string
      description: "CEI UP, CEI DOWN, or AVR-operable values 0.0 to 1.0"
- id: center_image_query
  label: Center Image Query
  kind: action
  params: []
- id: center_gain_set
  label: Center Gain Set
  kind: action
  params:
    - name: setting
      type: string
      description: "CEG UP, CEG DOWN, or AVR-operable values 0.0 to 1.0"
- id: center_gain_query
  label: Center Gain Query
  kind: action
  params: []
- id: center_spread_set
  label: Center Spread Set
  kind: action
  params:
    - name: setting
      type: string
      description: "CES ON, CES OFF"
- id: center_spread_query
  label: Center Spread Query
  kind: action
  params: []
- id: subwoofer_mode_set
  label: Subwoofer Mode Set
  kind: action
  params:
    - name: setting
      type: string
      description: "SWR ON, SWR OFF"
- id: subwoofer_mode_query
  label: Subwoofer Mode Query
  kind: action
  params: []
- id: room_size_set
  label: Room Size Set
  kind: action
  params:
    - name: size
      type: string
      description: "RSZ S, RSZ MS, RSZ M, RSZ ML, RSZ L"
- id: room_size_query
  label: Room Size Query
  kind: action
  params: []
- id: audio_delay_set
  label: Audio Delay Set
  kind: action
  params:
    - name: setting
      type: string
      description: "DELAY UP, DELAY DOWN, or values 000 to 999 by ASCII, 000=0ms, 200=200ms; AVR-operable 0 to 200"
- id: audio_delay_query
  label: Audio Delay Query
  kind: action
  params: []
- id: audio_restorer_set
  label: Audio Restorer Set
  kind: action
  params:
    - name: mode
      type: string
      description: "RSTR OFF, RSTR LOW, RSTR MED, RSTR HI"
- id: audio_restorer_query
  label: Audio Restorer Query
  kind: action
  params: []
- id: front_speaker_set
  label: Front Speaker Set
  kind: action
  params:
    - name: setting
      type: string
      description: "FRONT SPA, FRONT SPB, FRONT A+B"
- id: front_speaker_query
  label: Front Speaker Query
  kind: action
  params: []
- id: auromatic_preset_set
  label: Auromatic Preset Set
  kind: action
  params:
    - name: preset
      type: string
      description: "AUROPR SMA, AUROPR MED, AUROPR LAR, AUROPR SPE (Auro-3D Upgrade only)"
- id: auromatic_preset_query
  label: Auromatic Preset Query
  kind: action
  params: []
- id: auromatic_strength_set
  label: Auromatic Strength Set
  kind: action
  params:
    - name: setting
      type: string
      description: "AUROST UP, AUROST DOWN, or AVR-operable values from 1 to 16 (Auro-3D Upgrade only)"
- id: auromatic_strength_query
  label: Auromatic Strength Query
  kind: action
  params: []
- id: picture_mode_query
  label: Picture Mode Query
  kind: action
  params: []
- id: contrast_set
  label: Contrast Set
  kind: action
  params:
    - name: setting
      type: string
      description: "CN UP, CN DOWN, or values 000 to 100 by ASCII, 050=0; AVR-operable -50 to +50 (000 to 100)"
- id: contrast_query
  label: Contrast Query
  kind: action
  params: []
- id: brightness_set
  label: Brightness Set
  kind: action
  params:
    - name: setting
      type: string
      description: "BR UP, BR DOWN, or values 000 to 100 by ASCII, 050=0; AVR-operable -50 to +50 (000 to 100)"
- id: brightness_query
  label: Brightness Query
  kind: action
  params: []
- id: saturation_set
  label: Saturation Set
  kind: action
  params:
    - name: setting
      type: string
      description: "ST UP, ST DOWN, or values 000 to 100 by ASCII, 050=0; AVR-operable -50 to +50 (000 to 100)"
- id: saturation_query
  label: Saturation Query
  kind: action
  params: []
- id: hue_set
  label: Hue Set
  kind: action
  params:
    - name: setting
      type: string
      description: "HUE UP, HUE DOWN, or values 44 to 56 by ASCII, 50=0; AVR-operable -6 to +6 (44 to 56)"
- id: hue_query
  label: Hue Query
  kind: action
  params: []
- id: noise_reduction_set
  label: Noise Reduction Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DNR OFF, DNR LOW, DNR MID, DNR HI"
- id: noise_reduction_query
  label: Noise Reduction Query
  kind: action
  params: []
- id: enhancer_set
  label: Enhancer Set
  kind: action
  params:
    - name: setting
      type: string
      description: "ENH UP, ENH DOWN, or values 00 to 12 by ASCII; AVR-operable 0 to 12"
- id: enhancer_query
  label: Enhancer Query
  kind: action
  params: []
- id: zone2_source_set
  label: Zone2 Source Set
  kind: action
  params:
    - name: source
      type: string
      description: "Z2 source parameters PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1 through AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP, SOURCE"
- id: zone2_mute_set
  label: Zone2 Mute Set
  kind: action
  params:
    - name: setting
      type: string
      description: "Z2MUON, Z2MUOFF"
- id: zone2_mute_query
  label: Zone2 Mute Query
  kind: action
  params: []
- id: zone2_channel_set
  label: Zone2 Channel Set
  kind: action
  params:
    - name: setting
      type: string
      description: "Z2CSST, Z2CSMONO"
- id: zone2_channel_query
  label: Zone2 Channel Query
  kind: action
  params: []
- id: zone2_channel_volume_query
  label: Zone2 Channel Volume Query
  kind: action
  params: []
- id: zone2_high_pass_filter_set
  label: Zone2 High Pass Filter Set
  kind: action
  params:
    - name: setting
      type: string
      description: "Z2HPFON, Z2HPFOFF"
- id: zone2_high_pass_filter_query
  label: Zone2 High Pass Filter Query
  kind: action
  params: []
- id: zone2_bass_set
  label: Zone2 Bass Set
  kind: action
  params:
    - name: setting
      type: string
      description: "BAS UP, BAS DOWN, BAS **; 00 to 99 by ASCII, 00=0dB, -10 to +10 (40 to 60); -14 to +14 /2dBstep (36 to 64) X4100 only"
- id: zone2_bass_query
  label: Zone2 Bass Query
  kind: action
  params: []
- id: zone2_treble_set
  label: Zone2 Treble Set
  kind: action
  params:
    - name: setting
      type: string
      description: "TRE UP, TRE DOWN, TRE **; 00 to 99 by ASCII, 00=0dB, -10 to +10 (40 to 60); -14 to +14 /2dBstep (36 to 64) X4100 only"
- id: zone2_treble_query
  label: Zone2 Treble Query
  kind: action
  params: []
- id: zone2_hdmi_audio_set
  label: Zone2 HDMI Audio Set
  kind: action
  params:
    - name: mode
      type: string
      description: "Z2HDA THR, Z2HDA PCM"
- id: zone2_hdmi_audio_query
  label: Zone2 HDMI Audio Query
  kind: action
  params: []
- id: zone2_sleep_timer_set
  label: Zone2 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: "Z2SLPOFF or ***:001 to 120 by ASCII, 010=10min"
- id: zone2_sleep_timer_query
  label: Zone2 Sleep Timer Query
  kind: action
  params: []
- id: zone2_auto_standby_set
  label: Zone2 Auto Standby Set
  kind: action
  params:
    - name: setting
      type: string
      description: "Z2STBY2H, Z2STBY4H, Z2STBY8H, Z2STBYOFF"
- id: zone2_auto_standby_query
  label: Zone2 Auto Standby Query
  kind: action
  params: []
- id: zone3_source_set
  label: Zone3 Source Set
  kind: action
  params:
    - name: source
      type: string
      description: "Z3 source parameters PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1 through AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP, SOURCE"
- id: zone3_mute_set
  label: Zone3 Mute Set
  kind: action
  params:
    - name: setting
      type: string
      description: "Z3MUON, Z3MUOFF"
- id: zone3_mute_query
  label: Zone3 Mute Query
  kind: action
  params: []
- id: zone3_channel_set
  label: Zone3 Channel Set
  kind: action
  params:
    - name: setting
      type: string
      description: "Z3CSST, Z3CSMONO"
- id: zone3_channel_query
  label: Zone3 Channel Query
  kind: action
  params: []
- id: zone3_channel_volume_query
  label: Zone3 Channel Volume Query
  kind: action
  params: []
- id: zone3_high_pass_filter_set
  label: Zone3 High Pass Filter Set
  kind: action
  params:
    - name: setting
      type: string
      description: "Z3HPFON, Z3HPFOFF"
- id: zone3_high_pass_filter_query
  label: Zone3 High Pass Filter Query
  kind: action
  params: []
- id: zone3_bass_set
  label: Zone3 Bass Set
  kind: action
  params:
    - name: setting
      type: string
      description: "BAS UP, BAS DOWN, BAS **; 00 to 99 by ASCII, 00=0dB, -10 to +10 (40 to 60); -14 to +14 /2dBstep (36 to 64) X4100 only"
- id: zone3_bass_query
  label: Zone3 Bass Query
  kind: action
  params: []
- id: zone3_treble_set
  label: Zone3 Treble Set
  kind: action
  params:
    - name: setting
      type: string
      description: "TRE UP, TRE DOWN, TRE **; 00 to 99 by ASCII, 00=0dB, -10 to +10 (40 to 60); -14 to +14 /2dBstep (36 to 64) X4100 only"
- id: zone3_treble_query
  label: Zone3 Treble Query
  kind: action
  params: []
- id: zone3_sleep_timer_set
  label: Zone3 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: "Z3SLPOFF or ***:001 to 120 by ASCII, 010=10min"
- id: zone3_sleep_timer_query
  label: Zone3 Sleep Timer Query
  kind: action
  params: []
- id: zone3_auto_standby_set
  label: Zone3 Auto Standby Set
  kind: action
  params:
    - name: setting
      type: string
      description: "Z3STBY2H, Z3STBY4H, Z3STBY8H, Z3STBYOFF"
- id: zone3_auto_standby_query
  label: Zone3 Auto Standby Query
  kind: action
  params: []
- id: tuner_frequency_step
  label: Tuner Frequency Step
  kind: action
  params:
    - name: direction
      type: string
      description: "TFANUP, TFANDOWN"
- id: tuner_frequency_query
  label: Tuner Frequency Query
  kind: action
  params: []
- id: tuner_station_name_query
  label: Tuner Station Name Query
  kind: action
  params: []
- id: tuner_preset_step
  label: Tuner Preset Step
  kind: action
  params:
    - name: direction
      type: string
      description: "TPANUP, TPANDOWN"
- id: tuner_preset_query
  label: Tuner Preset Query
  kind: action
  params: []
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "TPANMEM or TPANMEM**; preset number 01-56, 01=CH01,56=CH56"
- id: tuner_band_set
  label: Tuner Band Set
  kind: action
  params:
    - name: band
      type: string
      description: "TMANAM, TMANFM"
- id: tuner_band_query
  label: Tuner Band Query
  kind: action
  params: []
- id: tuner_tuning_mode_set
  label: Tuner Tuning Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "TMANAUTO, TMANMANUAL"
- id: hd_radio_frequency_step
  label: HD Radio Frequency Step
  kind: action
  params:
    - name: direction
      type: string
      description: "TFHDUP, TFHDDOWN"
- id: hd_radio_frequency_set
  label: HD Radio Frequency Set
  kind: action
  params:
    - name: setting
      type: string
      description: "TFHD****** (6 digits) or TFHD******MC*; HD multicast channel parameter (*：Multi Cast 1～8, Analog 0)"
- id: hd_radio_multicast_channel_set
  label: HD Radio Multicast Channel Set
  kind: action
  params:
    - name: channel
      type: integer
      description: "TFHDMC*; Multi Cast 1～8, Analog 0"
- id: hd_radio_frequency_query
  label: HD Radio Frequency Query
  kind: action
  params: []
- id: hd_radio_preset_step
  label: HD Radio Preset Step
  kind: action
  params:
    - name: direction
      type: string
      description: "TPHDUP, TPHDDOWN"
- id: hd_radio_preset_set
  label: HD Radio Preset Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "HD** preset number 01-56, 01=CH01,56=CH56"
- id: hd_radio_preset_query
  label: HD Radio Preset Query
  kind: action
  params: []
- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "TPHDMEM or TPHDMEM**; preset number 01-56, 01=CH01,56=CH56"
- id: hd_radio_band_set
  label: HD Radio Band Set
  kind: action
  params:
    - name: mode
      type: string
      description: "TMHDAM, TMHDFM, TMHDAUTOHD, TMHDAUTO, TMHDMANUAL, TMHDANAAUTO, TMHDANAMANU"
- id: hd_radio_band_query
  label: HD Radio Band Query
  kind: action
  params: []
- id: hd_radio_status_query
  label: HD Radio Status Query
  kind: action
  params: []
- id: network_player_control
  label: Network Player Control
  kind: action
  params:
    - name: command
      type: string
      description: "NS90, NS91, NS92, NS93, NS94, NS9A, NS9B, NS9C, NS9D, NS9E, NS9F, NS9G, NS9H, NS9I, NS9J, NS9K, NS9M, NS9W, NS9X, NS9Y, NS9Z, NSRPT, NSRND; NSB** preset call, except Bluetooth, USB/iPod, 00-35 (2014 AVR); NSC** preset memory, except Bluetooth, USB/iPod, 00-35 (2014 AVR); NSFV MEM adds Favorites folder"
- id: network_audio_preset_name_query
  label: Network Audio Preset Name Query
  kind: action
  params: []
- id: onscreen_display_ascii_query
  label: Onscreen Display ASCII Query
  kind: action
  params: []
- id: onscreen_display_utf8_query
  label: Onscreen Display UTF8 Query
  kind: action
  params: []
- id: system_navigation_control
  label: System Navigation Control
  kind: action
  params:
    - name: command
      type: string
      description: "MNCUP, MNCDN, MNCLT, MNCRT, MNENT, MNRTN, MNOPT, MNINF, MNCHL"
- id: setup_menu_set
  label: Setup Menu Set
  kind: action
  params:
    - name: setting
      type: string
      description: "MNMEN ON, MNMEN OFF"
- id: setup_menu_query
  label: Setup Menu Query
  kind: action
  params: []
- id: instaprevue_set
  label: InstaPrevue Set
  kind: action
  params:
    - name: setting
      type: string
      description: "MNPRV ON, MNPRV OFF"
- id: instaprevue_query
  label: InstaPrevue Query
  kind: action
  params: []
- id: all_zone_stereo_set
  label: All Zone Stereo Set
  kind: action
  params:
    - name: setting
      type: string
      description: "MNZST ON, MNZST OFF"
- id: all_zone_stereo_query
  label: All Zone Stereo Query
  kind: action
  params: []
- id: remote_lock_set
  label: Remote Lock Set
  kind: action
  params:
    - name: setting
      type: string
      description: "SYREMOTE LOCK ON, REMOTE LOCK OFF"
- id: panel_lock_set
  label: Panel Lock Set
  kind: action
  params:
    - name: setting
      type: string
      description: "SYPANEL LOCK ON, SYPANEL+V LOCK ON, SYPANEL LOCK OFF"
- id: trigger_set
  label: Trigger Set
  kind: action
  params:
    - name: setting
      type: string
      description: "TR1 ON, TR1 OFF, TR2 ON, TR2 OFF"
- id: trigger_query
  label: Trigger Query
  kind: action
  params: []
- id: upgrade_id_query
  label: Upgrade ID Query
  kind: action
  params: []
- id: remote_maintenance_set
  label: Remote Maintenance Set
  kind: action
  params:
    - name: setting
      type: string
      description: "RM STA, RM END"
- id: remote_maintenance_query
  label: Remote Maintenance Query
  kind: action
  params: []
- id: dimmer_set
  label: Dimmer Set
  kind: action
  params:
    - name: setting
      type: string
      description: "DIM BRI, DIM DIM, DIM DAR, DIM OFF, DIM SEL"
- id: dimmer_query
  label: Dimmer Query
  kind: action
  params: []
- id: channel_volume_step
  label: Channel Volume Step
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS; SHL, SHR, TS: Auro-3D Upgrade only"
    - name: direction
      type: string
      description: "UP, DOWN; source examples CVFL UP, CVFL DOWN"
- id: channel_volume_reset
  label: Channel Volume Reset
  kind: action
  params: []  # CVZRL: Reset all channel level to the factory defaults
- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  params: []  # SLPOFF
- id: sleep_timer_query
  label: Sleep Timer Query
  kind: action
  params: []  # SLP?
- id: eco_mode_query
  label: ECO Mode Query
  kind: action
  params: []  # ECO?
- id: video_resolution_query
  label: Video Resolution Query
  kind: action
  params: []  # VSSC ?
- id: dynamic_eq_query
  label: Dynamic EQ Query
  kind: action
  params: []  # PSDYNEQ ?
- id: zone2_volume_step
  label: Zone2 Volume Step
  kind: action
  params:
    - name: direction
      type: string
      description: "Z2UP, Z2DOWN"
- id: zone2_query
  label: Zone2 Status Query
  kind: action
  params: []  # Z2?
- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "Z2QUICK1, Z2QUICK2, Z2QUICK3, Z2QUICK4, Z2QUICK5; Z2 QUICK SELECT 1-5 MODE SELECT"
- id: zone2_quick_select_memory_set
  label: Zone2 Quick Select Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "Z2QUICK1 MEMORY, Z2QUICK2 MEMORY, Z2QUICK3 MEMORY, Z2QUICK4 MEMORY, Z2QUICK5 MEMORY; Z2 QUICK SELECT 1-5 MODE MEMORY"
- id: zone2_quick_select_query
  label: Zone2 Quick Select Query
  kind: action
  params: []  # Z2QUICK ?
- id: zone2_favorite_select
  label: Zone2 Favorite Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "Z2FAVORITE1, Z2FAVORITE2, Z2FAVORITE3, Z2FAVORITE4; Z2 favorite 1-4 Mode select."
- id: zone2_favorite_memory_set
  label: Zone2 Favorite Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "Z2FAVORITE1 MEMORY, Z2FAVORITE2 MEMORY, Z2FAVORITE3 MEMORY, Z2FAVORITE4 MEMORY; Z2 favorite 1-4"
- id: zone2_channel_volume_set
  label: Zone2 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR; source examples Z2CVFL 50, Z2CVFR 50"
    - name: level
      type: integer
      description: "38 to 62 by ASCII , 50=0dB"
- id: zone2_channel_volume_step
  label: Zone2 Channel Volume Step
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN; Z2CVFL UP, Z2CVFL DOWN, Z2CVFR UP, Z2CVFR DOWN"
- id: zone3_volume_step
  label: Zone3 Volume Step
  kind: action
  params:
    - name: direction
      type: string
      description: "Z3UP, Z3DOWN"
- id: zone3_query
  label: Zone3 Status Query
  kind: action
  params: []  # Z3?
- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "Z3QUICK1, Z3QUICK2, Z3QUICK3, Z3QUICK4, Z3QUICK5; Z3 QUICK SELECT 1-5 MODE SELECT"
- id: zone3_quick_select_memory_set
  label: Zone3 Quick Select Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "Z3QUICK1 MEMORY, Z3QUICK2 MEMORY, Z3QUICK3 MEMORY, Z3QUICK4 MEMORY, Z3QUICK5 MEMORY; Z3 QUICK SELECT 1-5 MODE MEMORY"
- id: zone3_quick_select_query
  label: Zone3 Quick Select Query
  kind: action
  params: []  # Z3QUICK ?
- id: zone3_favorite_select
  label: Zone3 Favorite Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "Z3FAVORITE1, Z3FAVORITE2, Z3FAVORITE3, Z3FAVORITE4; Z3 favorite 1-4 Mode select."
- id: zone3_favorite_memory_set
  label: Zone3 Favorite Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "Z3FAVORITE1 MEMORY, Z3FAVORITE2 MEMORY, Z3FAVORITE3 MEMORY, Z3FAVORITE4 MEMORY; Z3 favorite 1-4"
- id: zone3_channel_volume_set
  label: Zone3 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR; source examples Z3CVFL 50, Z3CVFR 50"
    - name: level
      type: integer
      description: "38 to 62 by ASCII , 50=0dB"
- id: zone3_channel_volume_step
  label: Zone3 Channel Volume Step
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN; Z3CVFL UP, Z3CVFL DOWN, Z3CVFR UP, Z3CVFR DOWN"
- id: additional_surround_mode_set
  label: Additional Surround Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DTS SURROUND, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT; source examples MSDTS SURROUND, MSAURO2DSURR, MSMCH STEREO, MSWIDE SCREEN, MSSUPER STADIUM, MSROCK ARENA, MSJAZZ CLUB, MSCLASSIC CONCERT, MSMONO MOVIE, MSMATRIX, MSVIDEO GAME, MSVIRTUAL, MSLEFT, MSRIGHT; AURO2DSURR: Auro-3D Upgrade only"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [PWON, PWSTANDBY]
  query_command: PW?
- id: input_state
  label: Input State
  type: string
  description: "Returns current input source (e.g., SIDVD, SIBD, SITV)"
  query_command: SI?
- id: volume_state
  label: Volume State
  type: string
  description: "Returns MV level (e.g., MV80 for 0dB)"
  query_command: MV?
- id: mute_state
  label: Mute State
  type: enum
  values: [MUON, MUOFF]
  query_command: MU?
- id: surround_state
  label: Surround Mode State
  type: string
  description: "Returns current surround mode (e.g., MSSTEREO)"
  query_command: MS?
- id: zone_state
  label: Zone State
  type: enum
  values: [ZMON, ZMOFF]
  query_command: ZM?
- id: channel_volume_state
  label: Channel Volume State
  type: string
  description: "Returns channel volume (e.g., CVFL 50)"
  query_command: CV?
- id: digital_input_arc_state
  label: Digital Input ARC State
  type: enum
  values: [SDARC]
  query_command: SD?
- id: surround_detailed_state
  label: Surround Detailed State
  type: enum
  values: ["MSDSD DIRECT", "MSDSD PURE DIRECT", "MSDOLBY PRO LOGIC", "MSDOLBY PL2 C", "MSDOLBY PL2 M", "MSDOLBY PL2 G", "MSDOLBY PL2X C", "MSDOLBY PL2X M", "MSDOLBY PL2X G", "MSDOLBY PL2Z H", "MSDOLBY SURROUND", "MSDOLBY ATMOS", "MSDOLBY D EX", "MSDOLBY D+PL2X C", "MSDOLBY D+PL2X M", "MSDOLBY D+PL2Z H", "MSDOLBY D+DS", "MSDOLBY D+NEO:X C", "MSDOLBY D+NEO:X M", "MSDOLBY D+NEO:X G", "MSDTS ES DSCRT6.1", "MSDTS ES MTRX6.1", "MSDTS+PL2X C", "MSDTS+PL2X M", "MSDTS+PL2Z H", "MSDTS+DS", "MSDTS96/24", "MSDTS96 ES MTRX", "MSDTS+NEO:6", "MSDTS+NEO:X C", "MSDTS+NEO:X M", "MSDTS+NEO:X G", "MSMULTI CH IN", "MSM CH IN+DOLBY EX", "MSM CH IN+PL2X C", "MSM CH IN+PL2X M", "MSM CH IN+PL2Z H", "MSM CH IN+DS", "MSMULTI CH IN 7.1", "MSM CH IN+NEO:X C", "MSM CH IN+NEO:X M", "MSM CH IN+NEO:X G", "MSDOLBY D+", "MSDOLBY D+ +EX", "MSDOLBY D+ +PL2X C", "MSDOLBY D+ +PL2X M", "MSDOLBY D+ +PL2Z H", "MSDOLBY D+ +DS", "MSDOLBY D+ +NEO:X C", "MSDOLBY D+ +NEO:X M", "MSDOLBY D+ +NEO:X G", "MSDOLBY HD", "MSDOLBY HD+EX", "MSDOLBY HD+PL2X C", "MSDOLBY HD+PL2X M", "MSDOLBY HD+PL2Z H", "MSDOLBY HD+DS", "MSDOLBY HD+NEO:X C", "MSDOLBY HD+NEO:X M", "MSDOLBY HD+NEO:X G", "MSDTS HD", "MSDTS HD MSTR", "MSDTS HD+PL2X C", "MSDTS HD+PL2X M", "MSDTS HD+PL2Z H", "MSDTS HD+DS", "MSDTS HD+NEO:6", "MSDTS HD+NEO:X C", "MSDTS HD+NEO:X M", "MSDTS HD+NEO:X G", "MSDTS EXPRESS", "MSDTS ES 8CH DSCRT", "MSMPEG2 AAC", "MSAAC+DOLBY EX", "MSAAC+PL2X C", "MSAAC+PL2X M", "MSAAC+PL2Z H", "MSAAC+DS", "MSAAC+NEO:X C", "MSAAC+NEO:X M", "MSAAC+NEO:X G", "MSPL DSX", "MSPL2 C DSX", "MSPL2 M DSX", "MSPL2 G DSX", "MSAUDYSSEY DSX", "MSDTS NEO:6 C", "MSDTS NEO:6 M", "MSDTS NEO:X C", "MSDTS NEO:X M", "MSDTS NEO:X G", "MSALL ZONE STEREO", "MS7.1IN", "MSPURE DIRECT EXT"]
  query_command: MS?
- id: surround_decode_height_state
  label: Surround Decode Height State
  type: enum
  values: ["PSMODE:HEIGHT"]
  query_command: "PSMODE: ?"
- id: quick_select_inactive_state
  label: Quick Select Inactive State
  type: enum
  values: [MSQUICK0]
  query_command: "MSQUICK ?"
- id: zone2_quick_select_inactive_state
  label: Zone2 Quick Select Inactive State
  type: enum
  values: [Z2QUICK0]
  query_command: "Z2QUICK ?"
- id: zone3_quick_select_inactive_state
  label: Zone3 Quick Select Inactive State
  type: enum
  values: [Z3QUICK0]
  query_command: "Z3QUICK ?"
- id: instaprevue_unavailable_state
  label: InstaPrevue Unavailable State
  type: enum
  values: ["MNPRV NG"]
  query_command: MNPRV?
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
# Device sends unsolicited EVENT messages when state changes.
# EVENT format same as COMMAND. Examples:
# - PWON / PWSTANDBY when power state changes
# - SI*** when input source changes
# - MV*** when master volume changes
# - CVFL 50 etc. when channel volume changes
# - MS*** when surround mode changes
# UNRESOLVED: complete event catalog not explicitly enumerated in source
```

## Macros
```yaml
# Power on sequence: wait 1 second after PWON before next command (per source note J)
# UNRESOLVED: macros not explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Command structure: 2-char COMMAND + PARAMETER + CR (0x0D)
- Minimum command interval: 50ms between commands
- RESPONSE must be sent within 200ms of receiving request command
- EVENT must be sent within 5 seconds of state change
- Half duplex communication on both interfaces
- Maximum data length: 135 bytes
- ASCII range: 0x20 to 0x7F (alphanumeric, space, some signs, CR as pause)
- Volume at 0.5dB step uses 3 ASCII characters as parameter
- Power on command requires 1 second wait before next command
- All zones share same protocol; Zone2/Zone3 prefix with Z2/Z3
<!-- UNRESOLVED: authentication/token format not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: error codes/fault behavior not enumerated in source -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:31:52.616Z
last_checked_at: 2026-10-07T17:16:08.784Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:16:08.784Z
matched_actions: 267
action_count: 267
confidence: medium
summary: "All 267 action units match source commands with correct shapes and stated transport values; the generic Denon/Marantz protocol doc names no SR7015, so applicability is inferred. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "populate from source, or remove section if not applicable"
- "complete event catalog not explicitly enumerated in source"
- "macros not explicitly documented in source"
- "no safety warnings or interlock procedures stated in source"
- "authentication/token format not stated in source"
- "error codes/fault behavior not enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
