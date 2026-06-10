---
spec_id: admin/marantz_sr8012_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR8012 Series Control Spec"
manufacturer: Marantz
model_family: "SR8012 Series"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "SR8012 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T20:09:35.508Z
last_checked_at: 2026-06-10T00:20:54.125Z
generated_at: 2026-06-10T00:20:54.125Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PSBAS ?"
  - "PSTRE ?"
  - "TFAN?"
  - "TPAN?"
  - "firmware version compatibility not stated in source"
  - "populate from source, or remove section if not applicable"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated"
  - "detailed error codes/fault behavior not documented"
  - "authentication token format not applicable (none stated)"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:20:54.125Z
  matched_actions: 352
  action_count: 352
  confidence: medium
  summary: "All 352 spec actions matched source commands with correct shapes and parameters; only 4 minor query variants (PSBAS?, PSTRE?, TFAN?, TPAN?) present in source but absent from spec, well within the 5-command tolerance. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR8012 Series Control Spec

## Summary
AV receiver supporting both RS-232C and Ethernet (TCP/IP) control. ASCII-based command protocol with 2-character command codes and CR-terminated strings. Supports power, volume, input routing, surround modes, multi-zone control, tuner, and media playback. Port 23 for TCP/telnet, 9600/8/N/1 for serial.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # stated: TCP port 23 (telnet)
serial:
  baud_rate: 9600  # stated: 9600bps
  data_bits: 8  # stated: 8 bits
  parity: none  # stated: none
  stop_bits: 1  # stated: 1 bit
  flow_control: none  # inferred: no flow control mentioned
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: PWON, PWSTANDBY, PW? commands present
- queryable  # inferred: SI?, MV?, PW?, etc. return state
- routable   # inferred: SI command selects input source
- levelable  # inferred: MV, CV commands adjust volume levels
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
      type: integer
      description: "Volume 00-98, 80=0dB, 00=--- (MIN). Use MV** format."
- id: master_volume_query
  label: Query Master Volume
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
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: input_query
  label: Query Input Status
  kind: action
  params: []
- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, etc."
- id: surround_mode_query
  label: Query Surround Mode
  kind: action
  params: []
- id: channel_volume_set
  label: Set Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
    - name: level
      type: integer
      description: "00-98, 50=0dB, range 38-62 or 00-98 for subwoofer"
- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "Channel ID (FL, FR, C, SW, etc.)"
- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "Channel ID (FL, FR, C, SW, etc.)"
- id: channel_volume_query
  label: Query Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "Channel ID (FL, FR, C, SW, etc.)"
- id: tone_ctrl_on
  label: Tone Control On
  kind: action
  params: []
- id: tone_ctrl_off
  label: Tone Control Off
  kind: action
  params: []
- id: tone_ctrl_query
  label: Query Tone Control
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
  label: Set Bass
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99, 50=0dB, range 44-56 (-6 to +6dB)"
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []
- id: treble_set
  label: Set Treble
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99, 50=0dB, range 44-56 (-6 to +6dB)"
- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
- id: main_zone_query
  label: Query Main Zone
  kind: action
  params: []
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
      description: "Same source options as SI command, plus Z2SOURCE to cancel"
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
      description: "00-98, 80=0dB, 00=--- (MIN)"
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
      description: "Same source options as SI command"
- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  params: []
- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  params: []
- id: zone3_volume_set
  label: Set Zone 3 Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98, 80=0dB, 00=--- (MIN)"
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
      description: "6 digits: ****.** kHz for AM (>050000), ****.** MHz for FM (<050000)"
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
      description: "01-56"
- id: tuner_band
  label: Set Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: "AM, FM, AUTO, MANUAL"
- id: hd_radio_query
  label: Query HD Radio Status
  kind: action
  params: []
- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120, 010=10min"
- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  params: []
- id: eco_mode_set
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
- id: cv_reset
  label: Reset All Channel Volumes
  kind: action
  params: []
- id: rec_select_set
  label: Set Record Select Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP, SOURCE"
- id: rec_select_query
  label: Query Record Select Status
  kind: action
  params: []
- id: signal_select_set
  label: Set Signal Select Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"
- id: signal_select_query
  label: Query Signal Select Status
  kind: action
  params: []
- id: digital_input_mode_set
  label: Set Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, PCM, DTS"
- id: digital_input_mode_query
  label: Query Digital Input Mode
  kind: action
  params: []
- id: video_select_set
  label: Set Video Select Source
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE"
- id: video_select_on
  label: Video Select On
  kind: action
  params: []
- id: video_select_off
  label: Video Select Off
  kind: action
  params: []
- id: video_select_query
  label: Query Video Select Status
  kind: action
  params: []
- id: auto_standby_set
  label: Set Auto Standby Timer
  kind: action
  params:
    - name: period
      type: string
      description: "15M, 30M, 60M, OFF"
- id: auto_standby_query
  label: Query Auto Standby Setting
  kind: action
  params: []
- id: eco_query
  label: Query ECO Mode Status
  kind: action
  params: []
- id: sleep_timer_query
  label: Query Main Zone Sleep Timer
  kind: action
  params: []
- id: main_zone_favorite_select
  label: Select Main Zone Favorite
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
- id: main_zone_favorite_memory
  label: Store Main Zone Favorite
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY"
- id: quick_select
  label: Quick Select Mode Select
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"
- id: quick_select_memory
  label: Quick Select Memory Store
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY"
- id: quick_select_query
  label: Query Quick Select Status
  kind: action
  params: []
- id: vs_aspect_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: "ASPNRM, ASPFUL"
- id: vs_aspect_query
  label: Query Aspect Ratio Status
  kind: action
  params: []
- id: vs_monitor_set
  label: Set HDMI Monitor Output
  kind: action
  params:
    - name: mode
      type: string
      description: "MONIAUTO, MONI1, MONI2"
- id: vs_monitor_query
  label: Query HDMI Monitor Output
  kind: action
  params: []
- id: vs_resolution_set
  label: Set Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO"
- id: vs_resolution_query
  label: Query Video Resolution
  kind: action
  params: []
- id: vs_hdmi_resolution_set
  label: Set HDMI Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO"
- id: vs_hdmi_resolution_query
  label: Query HDMI Resolution
  kind: action
  params: []
- id: vs_audio_output_set
  label: Set HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: "AUDIO AMP, AUDIO TV"
- id: vs_audio_output_query
  label: Query HDMI Audio Output
  kind: action
  params: []
- id: vs_video_processing_set
  label: Set Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "VPMAUTO, VPMGAME, VPMMOVI"
- id: vs_video_processing_query
  label: Query Video Processing Mode
  kind: action
  params: []
- id: vs_vertical_stretch_set
  label: Set Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: "VST ON, VST OFF"
- id: vs_vertical_stretch_query
  label: Query Vertical Stretch Status
  kind: action
  params: []
- id: ps_dialog_level_on
  label: Dialog Level Adjust On
  kind: action
  params: []
- id: ps_dialog_level_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
- id: ps_dialog_level_up
  label: Dialog Level Up
  kind: action
  params: []
- id: ps_dialog_level_down
  label: Dialog Level Down
  kind: action
  params: []
- id: ps_dialog_level_set
  label: Set Dialog Level
  kind: action
  params:
    - name: level
      type: integer
      description: "38-62 by ASCII, 50=0dB"
- id: ps_dialog_level_query
  label: Query Dialog Level
  kind: action
  params: []
- id: ps_subwoofer_level_on
  label: Subwoofer Level Adjust On
  kind: action
  params: []
- id: ps_subwoofer_level_off
  label: Subwoofer Level Adjust Off
  kind: action
  params: []
- id: ps_subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  params: []
- id: ps_subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  params: []
- id: ps_subwoofer_level_set
  label: Set Subwoofer Level
  kind: action
  params:
    - name: level
      type: integer
      description: "00,38-62 by ASCII, 50=0dB"
- id: ps_subwoofer_level2_up
  label: Subwoofer 2 Level Up
  kind: action
  params: []
- id: ps_subwoofer_level2_down
  label: Subwoofer 2 Level Down
  kind: action
  params: []
- id: ps_subwoofer_level2_set
  label: Set Subwoofer 2 Level
  kind: action
  params:
    - name: level
      type: integer
      description: "00,38-62 by ASCII, 50=0dB"
- id: ps_subwoofer_level_query
  label: Query Subwoofer Level
  kind: action
  params: []
- id: ps_cinema_eq_on
  label: Cinema EQ On
  kind: action
  params: []
- id: ps_cinema_eq_off
  label: Cinema EQ Off
  kind: action
  params: []
- id: ps_cinema_eq_query
  label: Query Cinema EQ Status
  kind: action
  params: []
- id: ps_mode_set
  label: Set Surround Sub-Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MODE:MUSIC, MODE:CINEMA, MODE:GAME, MODE:PRO LOGIC"
- id: ps_mode_query
  label: Query Surround Sub-Mode
  kind: action
  params: []
- id: ps_loudness_on
  label: Loudness Management On
  kind: action
  params: []
- id: ps_loudness_off
  label: Loudness Management Off
  kind: action
  params: []
- id: ps_loudness_query
  label: Query Loudness Management
  kind: action
  params: []
- id: ps_front_height_on
  label: Front Height Output On
  kind: action
  params: []
- id: ps_front_height_off
  label: Front Height Output Off
  kind: action
  params: []
- id: ps_front_height_query
  label: Query Front Height Output
  kind: action
  params: []
- id: ps_speaker_set
  label: Set Speaker Output Assignment
  kind: action
  params:
    - name: assignment
      type: string
      description: "SP:FW, SP:FH, SP:SB, SP:HW, SP:BH, SP:BW, SP:FL, SP:HF, SP:FR"
- id: ps_speaker_query
  label: Query Speaker Output Assignment
  kind: action
  params: []
- id: ps_plz_height_gain_set
  label: Set PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: "PHG LOW, PHG MID, PHG HI"
- id: ps_plz_height_gain_query
  label: Query PL2z Height Gain
  kind: action
  params: []
- id: ps_multeq_set
  label: Set MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MULTEQ:AUDYSSEY, MULTEQ:BYP.LR, MULTEQ:FLAT, MULTEQ:MANUAL, MULTEQ:OFF"
- id: ps_multeq_query
  label: Query MultEQ Mode
  kind: action
  params: []
- id: ps_dynamic_eq_on
  label: Dynamic EQ On
  kind: action
  params: []
- id: ps_dynamic_eq_off
  label: Dynamic EQ Off
  kind: action
  params: []
- id: ps_dynamic_eq_query
  label: Query Dynamic EQ Status
  kind: action
  params: []
- id: ps_reflev_set
  label: Set Reference Level Offset
  kind: action
  params:
    - name: level
      type: string
      description: "REFLEV 0, REFLEV 5, REFLEV 10, REFLEV 15"
- id: ps_reflev_query
  label: Query Reference Level Offset
  kind: action
  params: []
- id: ps_dynamic_volume_set
  label: Set Dynamic Volume
  kind: action
  params:
    - name: mode
      type: string
      description: "DYNVOL HEV, DYNVOL MED, DYNVOL LIT, DYNVOL OFF"
- id: ps_dynamic_volume_query
  label: Query Dynamic Volume
  kind: action
  params: []
- id: ps_lfc_on
  label: Audyssey LFC On
  kind: action
  params: []
- id: ps_lfc_off
  label: Audyssey LFC Off
  kind: action
  params: []
- id: ps_lfc_query
  label: Query Audyssey LFC Status
  kind: action
  params: []
- id: ps_containment_amount_up
  label: Containment Amount Up
  kind: action
  params: []
- id: ps_containment_amount_down
  label: Containment Amount Down
  kind: action
  params: []
- id: ps_containment_amount_set
  label: Set Containment Amount
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 01-07 operable range"
- id: ps_containment_amount_query
  label: Query Containment Amount
  kind: action
  params: []
- id: ps_dsx_set
  label: Set Audyssey DSX
  kind: action
  params:
    - name: mode
      type: string
      description: "DSX ONHW, DSX ONH, DSX ONW, DSX OFF"
- id: ps_dsx_query
  label: Query Audyssey DSX Status
  kind: action
  params: []
- id: ps_stage_width_up
  label: Stage Width Up
  kind: action
  params: []
- id: ps_stage_width_down
  label: Stage Width Down
  kind: action
  params: []
- id: ps_stage_width_set
  label: Set Stage Width
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 40-60 operable range, 50=0dB"
- id: ps_stage_width_query
  label: Query Stage Width
  kind: action
  params: []
- id: ps_stage_height_up
  label: Stage Height Up
  kind: action
  params: []
- id: ps_stage_height_down
  label: Stage Height Down
  kind: action
  params: []
- id: ps_stage_height_set
  label: Set Stage Height
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 40-60 operable range, 50=0dB"
- id: ps_stage_height_query
  label: Query Stage Height
  kind: action
  params: []
- id: ps_graphic_eq_on
  label: Graphic EQ On
  kind: action
  params: []
- id: ps_graphic_eq_off
  label: Graphic EQ Off
  kind: action
  params: []
- id: ps_graphic_eq_query
  label: Query Graphic EQ Status
  kind: action
  params: []
- id: ps_drc_set
  label: Set Dynamic Compression
  kind: action
  params:
    - name: mode
      type: string
      description: "DRC AUTO, DRC LOW, DRC MID, DRC HI, DRC OFF"
- id: ps_drc_query
  label: Query Dynamic Compression
  kind: action
  params: []
- id: ps_bass_sync_up
  label: Bass Sync Up
  kind: action
  params: []
- id: ps_bass_sync_down
  label: Bass Sync Down
  kind: action
  params: []
- id: ps_bass_sync_set
  label: Set Bass Sync
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 0-16 operable range"
- id: ps_bass_sync_query
  label: Query Bass Sync
  kind: action
  params: []
- id: ps_dialogue_enhancer_set
  label: Set Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: string
      description: "DEH OFF, DEH LOW, DEH MED, DEH HIGH"
- id: ps_dialogue_enhancer_query
  label: Query Dialogue Enhancer
  kind: action
  params: []
- id: ps_lfe_up
  label: LFE Level Up
  kind: action
  params: []
- id: ps_lfe_down
  label: LFE Level Down
  kind: action
  params: []
- id: ps_lfe_set
  label: Set LFE Level
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 00=0dB, 10=-10dB, 0 to -10 operable"
- id: ps_lfe_query
  label: Query LFE Level
  kind: action
  params: []
- id: ps_lfe_level_set
  label: Set LFE Level EXT In Mode
  kind: action
  params:
    - name: level
      type: string
      description: "LFL 00, LFL 05, LFL 10, LFL 15"
- id: ps_lfe_level_query
  label: Query LFE Level EXT In Mode
  kind: action
  params: []
- id: ps_effect_on
  label: Effect On
  kind: action
  params: []
- id: ps_effect_off
  label: Effect Off
  kind: action
  params: []
- id: ps_effect_up
  label: Effect Level Up
  kind: action
  params: []
- id: ps_effect_down
  label: Effect Level Down
  kind: action
  params: []
- id: ps_effect_set
  label: Set Effect Level
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 1-15 operable range"
- id: ps_effect_query
  label: Query Effect Status
  kind: action
  params: []
- id: ps_delay_up
  label: Delay Up
  kind: action
  params: []
- id: ps_delay_down
  label: Delay Down
  kind: action
  params: []
- id: ps_delay_set
  label: Set Delay
  kind: action
  params:
    - name: delay_ms
      type: integer
      description: "000-999 by ASCII, 000=0ms, 300=300ms, 0-300ms operable"
- id: ps_delay_query
  label: Query Delay
  kind: action
  params: []
- id: ps_panorama_on
  label: Panorama On
  kind: action
  params: []
- id: ps_panorama_off
  label: Panorama Off
  kind: action
  params: []
- id: ps_panorama_query
  label: Query Panorama Status
  kind: action
  params: []
- id: ps_dimension_up
  label: Dimension Up
  kind: action
  params: []
- id: ps_dimension_down
  label: Dimension Down
  kind: action
  params: []
- id: ps_dimension_set
  label: Set Dimension
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 0-6 operable range"
- id: ps_dimension_query
  label: Query Dimension
  kind: action
  params: []
- id: ps_center_width_up
  label: Center Width Up
  kind: action
  params: []
- id: ps_center_width_down
  label: Center Width Down
  kind: action
  params: []
- id: ps_center_width_set
  label: Set Center Width
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 0-7 operable range"
- id: ps_center_width_query
  label: Query Center Width
  kind: action
  params: []
- id: ps_center_image_up
  label: Center Image Up
  kind: action
  params: []
- id: ps_center_image_down
  label: Center Image Down
  kind: action
  params: []
- id: ps_center_image_set
  label: Set Center Image
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 0.0-1.0 operable range"
- id: ps_center_image_query
  label: Query Center Image
  kind: action
  params: []
- id: ps_center_gain_up
  label: Center Gain Up
  kind: action
  params: []
- id: ps_center_gain_down
  label: Center Gain Down
  kind: action
  params: []
- id: ps_center_gain_set
  label: Set Center Gain
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 0.0-1.0 operable range"
- id: ps_center_gain_query
  label: Query Center Gain
  kind: action
  params: []
- id: ps_center_spread_on
  label: Center Spread On
  kind: action
  params: []
- id: ps_center_spread_off
  label: Center Spread Off
  kind: action
  params: []
- id: ps_center_spread_query
  label: Query Center Spread
  kind: action
  params: []
- id: ps_subwoofer_output_on
  label: Subwoofer Output On
  kind: action
  params: []
- id: ps_subwoofer_output_off
  label: Subwoofer Output Off
  kind: action
  params: []
- id: ps_subwoofer_output_query
  label: Query Subwoofer Output
  kind: action
  params: []
- id: ps_room_size_set
  label: Set Room Size
  kind: action
  params:
    - name: size
      type: string
      description: "RSZ S, RSZ MS, RSZ M, RSZ ML, RSZ L"
- id: ps_room_size_query
  label: Query Room Size
  kind: action
  params: []
- id: ps_audio_delay_up
  label: Audio Delay Up
  kind: action
  params: []
- id: ps_audio_delay_down
  label: Audio Delay Down
  kind: action
  params: []
- id: ps_audio_delay_set
  label: Set Audio Delay
  kind: action
  params:
    - name: delay_ms
      type: integer
      description: "000-999 by ASCII, 000=0ms, 200=200ms, 0-200ms operable"
- id: ps_audio_delay_query
  label: Query Audio Delay
  kind: action
  params: []
- id: ps_audio_restorer_set
  label: Set Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: "RSTR OFF, RSTR LOW, RSTR MED, RSTR HI"
- id: ps_audio_restorer_query
  label: Query Audio Restorer
  kind: action
  params: []
- id: ps_front_speaker_set
  label: Set Front Speaker Output
  kind: action
  params:
    - name: output
      type: string
      description: "FRONT SPA, FRONT SPB, FRONT A+B"
- id: ps_front_speaker_query
  label: Query Front Speaker Output
  kind: action
  params: []
- id: ps_auro_preset_set
  label: Set Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "AUROPR SMA, AUROPR MED, AUROPR LAR, AUROPR SPE"
- id: ps_auro_preset_query
  label: Query Auro-Matic 3D Preset
  kind: action
  params: []
- id: ps_auro_strength_up
  label: Auro-Matic 3D Strength Up
  kind: action
  params: []
- id: ps_auro_strength_down
  label: Auro-Matic 3D Strength Down
  kind: action
  params: []
- id: ps_auro_strength_set
  label: Set Auro-Matic 3D Strength
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99 by ASCII, 1-16 operable range"
- id: ps_auro_strength_query
  label: Query Auro-Matic 3D Strength
  kind: action
  params: []
- id: pv_query
  label: Query Picture Mode Status
  kind: action
  params: []
- id: pv_contrast_up
  label: Picture Contrast Up
  kind: action
  params: []
- id: pv_contrast_down
  label: Picture Contrast Down
  kind: action
  params: []
- id: pv_contrast_set
  label: Set Picture Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "000-100 by ASCII, 050=0, -50 to +50 operable"
- id: pv_contrast_query
  label: Query Picture Contrast
  kind: action
  params: []
- id: pv_brightness_up
  label: Picture Brightness Up
  kind: action
  params: []
- id: pv_brightness_down
  label: Picture Brightness Down
  kind: action
  params: []
- id: pv_brightness_set
  label: Set Picture Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "000-100 by ASCII, 050=0, -50 to +50 operable"
- id: pv_brightness_query
  label: Query Picture Brightness
  kind: action
  params: []
- id: pv_saturation_up
  label: Picture Saturation Up
  kind: action
  params: []
- id: pv_saturation_down
  label: Picture Saturation Down
  kind: action
  params: []
- id: pv_saturation_set
  label: Set Picture Saturation
  kind: action
  params:
    - name: level
      type: integer
      description: "000-100 by ASCII, 050=0, -50 to +50 operable"
- id: pv_saturation_query
  label: Query Picture Saturation
  kind: action
  params: []
- id: pv_hue_up
  label: Picture Hue Up
  kind: action
  params: []
- id: pv_hue_down
  label: Picture Hue Down
  kind: action
  params: []
- id: pv_hue_set
  label: Set Picture Hue
  kind: action
  params:
    - name: level
      type: integer
      description: "44-56 by ASCII, 50=0, -6 to +6 operable"
- id: pv_hue_query
  label: Query Picture Hue
  kind: action
  params: []
- id: pv_dnr_set
  label: Set Picture DNR
  kind: action
  params:
    - name: mode
      type: string
      description: "DNR OFF, DNR LOW, DNR MID, DNR HI"
- id: pv_dnr_query
  label: Query Picture DNR
  kind: action
  params: []
- id: pv_enhancer_up
  label: Picture Enhancer Up
  kind: action
  params: []
- id: pv_enhancer_down
  label: Picture Enhancer Down
  kind: action
  params: []
- id: pv_enhancer_set
  label: Set Picture Enhancer
  kind: action
  params:
    - name: level
      type: integer
      description: "00-12 by ASCII, 0-12 operable"
- id: pv_enhancer_query
  label: Query Picture Enhancer
  kind: action
  params: []
- id: zone2_query
  label: Query Zone 2 Status
  kind: action
  params: []
- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
- id: zone2_mute_off
  label: Zone 2 Mute Off
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
      description: "ST, MONO"
- id: zone2_channel_setting_query
  label: Query Zone 2 Channel Mode
  kind: action
  params: []
- id: zone2_channel_volume_set
  label: Set Zone 2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: integer
      description: "38-62 by ASCII, 50=0dB"
- id: zone2_channel_volume_up
  label: Zone 2 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone2_channel_volume_down
  label: Zone 2 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone2_channel_volume_query
  label: Query Zone 2 Channel Volume
  kind: action
  params: []
- id: zone2_hpf_on
  label: Zone 2 HPF On
  kind: action
  params: []
- id: zone2_hpf_off
  label: Zone 2 HPF Off
  kind: action
  params: []
- id: zone2_hpf_query
  label: Query Zone 2 HPF Status
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
      description: "00-99 by ASCII, -10 to +10 operable (40-60)"
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
      description: "00-99 by ASCII, -10 to +10 operable (40-60)"
- id: zone2_treble_query
  label: Query Zone 2 Treble
  kind: action
  params: []
- id: zone2_hda_set
  label: Set Zone 2 HDMI Audio Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "THR, PCM"
- id: zone2_hda_query
  label: Query Zone 2 HDMI Audio Mode
  kind: action
  params: []
- id: zone2_sleep_timer_set
  label: Set Zone 2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 by ASCII, 010=10min"
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
    - name: period
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone2_auto_standby_query
  label: Query Zone 2 Auto Standby
  kind: action
  params: []
- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"
- id: zone2_quick_select_memory
  label: Zone 2 Quick Select Memory Store
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY"
- id: zone2_quick_select_query
  label: Query Zone 2 Quick Select
  kind: action
  params: []
- id: zone2_favorite_select
  label: Zone 2 Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
- id: zone2_favorite_memory
  label: Zone 2 Favorite Memory Store
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY"
- id: zone3_query
  label: Query Zone 3 Status
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
      description: "ST, MONO"
- id: zone3_channel_setting_query
  label: Query Zone 3 Channel Mode
  kind: action
  params: []
- id: zone3_channel_volume_set
  label: Set Zone 3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: integer
      description: "38-62 by ASCII, 50=0dB"
- id: zone3_channel_volume_up
  label: Zone 3 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone3_channel_volume_down
  label: Zone 3 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone3_channel_volume_query
  label: Query Zone 3 Channel Volume
  kind: action
  params: []
- id: zone3_hpf_on
  label: Zone 3 HPF On
  kind: action
  params: []
- id: zone3_hpf_off
  label: Zone 3 HPF Off
  kind: action
  params: []
- id: zone3_hpf_query
  label: Query Zone 3 HPF Status
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
      description: "00-99 by ASCII, -10 to +10 operable (40-60)"
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
      description: "00-99 by ASCII, -10 to +10 operable (40-60)"
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
      description: "001-120 by ASCII, 010=10min"
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
    - name: period
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone3_auto_standby_query
  label: Query Zone 3 Auto Standby
  kind: action
  params: []
- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"
- id: zone3_quick_select_memory
  label: Zone 3 Quick Select Memory Store
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY"
- id: zone3_quick_select_query
  label: Query Zone 3 Quick Select
  kind: action
  params: []
- id: zone3_favorite_select
  label: Zone 3 Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
- id: zone3_favorite_memory
  label: Zone 3 Favorite Memory Store
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY"
- id: tuner_rds_name_query
  label: Query Tuner RDS Station Name
  kind: action
  params: []
- id: tuner_preset_memory
  label: Store Current Tuner Frequency to Preset
  kind: action
  params: []
- id: tuner_preset_memory_direct
  label: Store Tuner Frequency to Preset Slot
  kind: action
  params:
    - name: slot
      type: integer
      description: "01-56"
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
      type: integer
      description: "6 digits: ****.** kHz AM (>050000), ****.** MHz FM (<050000)"
- id: hd_radio_multicast_select
  label: HD Radio Multicast Channel Select
  kind: action
  params:
    - name: channel
      type: integer
      description: "1 digit, 1-8 Multi Cast channels, 0=Analog"
- id: hd_radio_freq_multicast_set
  label: Set HD Radio Frequency and Multicast Channel
  kind: action
  params:
    - name: frequency
      type: integer
      description: "6 digits"
    - name: channel
      type: integer
      description: "1 digit multicast channel"
- id: hd_radio_freq_query
  label: Query HD Radio Frequency Status
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
- id: hd_radio_preset_set
  label: Set HD Radio Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: hd_radio_preset_query
  label: Query HD Radio Preset Status
  kind: action
  params: []
- id: hd_radio_preset_memory
  label: Store Current HD Radio Frequency to Preset
  kind: action
  params: []
- id: hd_radio_preset_memory_direct
  label: Store HD Radio Frequency to Preset Slot
  kind: action
  params:
    - name: slot
      type: integer
      description: "01-56"
- id: hd_radio_band_set
  label: Set HD Radio Band
  kind: action
  params:
    - name: band
      type: string
      description: "HDAM, HDFM"
- id: hd_radio_tuning_mode_set
  label: Set HD Radio Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU"
- id: hd_radio_tm_query
  label: Query HD Radio Tuning Mode
  kind: action
  params: []
- id: ns_navigation
  label: Online Music Navigation Control
  kind: action
  params:
    - name: sub_code
      type: string
      description: "90, 91, 92, 93, 94, 9A, 9B, 9C, 9D, 9E, 9F, 9G, 9H, 9I, 9J, 9K, 9M, 9W, 9X, 9Y, 9Z"
- id: ns_repeat
  label: Online Music Repeat Toggle
  kind: action
  params: []
- id: ns_random
  label: Online Music Random Toggle
  kind: action
  params: []
- id: ns_preset_call
  label: Online Music Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35"
- id: ns_preset_memory
  label: Online Music Preset Memory Store
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35"
- id: ns_preset_name_query
  label: Query Online Music Preset Names
  kind: action
  params: []
- id: ns_add_favorites
  label: Add Favorites Folder
  kind: action
  params: []
- id: ns_display_ascii_query
  label: Query Onscreen Display Info ASCII
  kind: action
  params: []
- id: ns_display_utf8_query
  label: Query Onscreen Display Info UTF-8
  kind: action
  params: []
- id: mn_cursor_navigation
  label: Menu Cursor Navigation
  kind: action
  params:
    - name: direction
      type: string
      description: "CUP, CDN, CLT, CRT"
- id: mn_enter
  label: Menu Enter
  kind: action
  params: []
- id: mn_return
  label: Menu Return
  kind: action
  params: []
- id: mn_option
  label: Menu Option
  kind: action
  params: []
- id: mn_info
  label: Menu Info
  kind: action
  params: []
- id: mn_channel_level
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
- id: sy_panel_lock_set
  label: Set Panel Lock Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF"
- id: trigger_set
  label: Set Trigger Output
  kind: action
  params:
    - name: trigger
      type: string
      description: "1 ON, 1 OFF, 2 ON, 2 OFF"
- id: trigger_query
  label: Query Trigger Status
  kind: action
  params: []
- id: upgrade_id_query
  label: Query Upgrade ID Number
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
- id: dimmer_set
  label: Set Display Dimmer
  kind: action
  params:
    - name: mode
      type: string
      description: "BRI, DIM, DAR, OFF, SEL"
- id: dimmer_query
  label: Query Display Dimmer
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [PWON, PWSTANDBY]
  comment: "PW?, PWON, PWSTANDBY"
- id: master_volume_state
  type: string
  comment: "MV?? returns MV** value, 80=0dB"
- id: mute_state
  type: enum
  values: [MUON, MUOFF]
- id: input_state
  type: string
  comment: "SI?? returns current input source"
- id: surround_mode_state
  type: string
  comment: "MS?? returns current surround mode"
- id: channel_volume_state
  type: string
  comment: "CV? returns all channel volumes, CVFL?, etc. for individual"
- id: zone2_state
  type: enum
  values: [Z2ON, Z2OFF]
- id: zone3_state
  type: enum
  values: [Z3ON, Z3OFF]
- id: tuner_state
  type: string
  comment: "TFAN105000 format for frequency"
- id: hd_radio_signal_level
  type: enum
  values: ["0", "1", "2", "3", "4", "5", "6"]
- id: hd_radio_mode
  type: enum
  values: [DIGITAL, ANALOG]
- id: onscreen_display_info
  type: string
  comment: "NSA returns up to 9 lines of play info"
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
- id: power_state_changed
  type: string
  comment: "EVENT sent within 5s when power state changes"
- id: input_changed
  type: string
  comment: "EVENT returned when input source changes, includes channel volume if affected"
- id: surround_mode_changed
  type: string
  comment: "EVENT returned when surround mode changes"
- id: channel_volume_changed
  type: string
  comment: "EVENT returned when channel volume changes with input switch"
- id: mute_changed
  type: string
  comment: "EVENT returned when mute state changes"
```

## Macros
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

- Command format: 2-char COMMAND + PARAMETER + CR (0x0D), ASCII 0x20-0x7F
- Send commands at 50ms+ intervals (documented requirement)
- RESPONSE to query (? command) within 200ms
- EVENT sent within 5s of state change
- Half duplex communication (documented for both serial and TCP)
- Power on: wait 1 second before sending next command after PWON
- 0.5dB volume steps encoded as 3 ASCII chars (e.g., MV805 for +0.5dB)
- Minimum master volume is "00" at attenuator

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: detailed error codes/fault behavior not documented -->
<!-- UNRESOLVED: authentication token format not applicable (none stated) -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T20:09:35.508Z
last_checked_at: 2026-06-10T00:20:54.125Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:20:54.125Z
matched_actions: 352
action_count: 352
confidence: medium
summary: "All 352 spec actions matched source commands with correct shapes and parameters; only 4 minor query variants (PSBAS?, PSTRE?, TFAN?, TPAN?) present in source but absent from spec, well within the 5-command tolerance. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PSBAS ?"
- "PSTRE ?"
- "TFAN?"
- "TPAN?"
- "firmware version compatibility not stated in source"
- "populate from source, or remove section if not applicable"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated"
- "detailed error codes/fault behavior not documented"
- "authentication token format not applicable (none stated)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
