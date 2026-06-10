---
spec_id: admin/denon-avrx7200-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVRX7200 Series Control Spec"
manufacturer: Denon
model_family: AVRX7200
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - AVRX7200
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T05:56:00.295Z
last_checked_at: 2026-06-09T10:33:36.382Z
generated_at: 2026-06-09T10:33:36.382Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - UGIDN
  - "RM STA"
  - "firmware compatibility range not stated in source"
  - "many PS (parameter setting) commands set EQ/tone/bass/treble values"
  - "complete event list not enumerated in source - only command/response pairs shown"
  - "no explicit safety warnings or interlock procedures in source"
  - "complete list of unsolicited events not explicitly enumerated"
  - "firmware version compatibility not stated"
  - "error/fault behavior not documented in source"
verification:
  verdict: verified
  checked_at: 2026-06-09T10:33:36.382Z
  matched_actions: 169
  action_count: 169
  confidence: medium
  summary: "All 169 spec actions matched against source (PW/MV/MU/SI/ZM/SR/SD/DC/SV/VS/SLP/STBY/ECO/MS/CV/PS/PV/Tuner/HDRadio/NS/MN/SY/TR/DIM/Zone2/Zone3); only UG IDN and RM STA/END (2 minor diagnostic commands) present in source but unrepresented in spec; transport port 23 and 9600 8N1 confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Denon AVRX7200 Series Control Spec

## Summary
Denon AVRX7200 Series AV receiver supporting TCP/IP (Telnet on port 23) and RS-232C control. ASCII command protocol with CR-terminated commands. Supports power control, volume/mute, input/source selection, surround mode, video settings, equalizer, multi-zone control, tuner, HD Radio, and online music/Bluetooth. No authentication required per source.

<!-- UNRESOLVED: firmware compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # stated: TCP port 23 (telnet)
serial:
  baud_rate: 9600  # stated: 9600bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: PWON/PWSTANDBY commands present
- queryable  # inferred: ? query commands present throughout
- routable   # inferred: SI (input select), SD (input mode), SR (rec select)
- levelable  # inferred: MV, CV, PS tone controls present
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
      type: string
      description: Volume value (00 to 98, 80=0dB)
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
      description: Input source (PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP)
- id: input_status_query
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
- id: main_zone_status_query
  label: Main Zone Status Query
  kind: action
  params: []
- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Surround mode (MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, etc.)
- id: surround_mode_status_query
  label: Surround Mode Status Query
  kind: action
  params: []
- id: channel_volume
  label: Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: Channel (FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS)
    - name: direction
      type: string
      description: UP or DOWN
- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
    - name: value
      type: string
      description: 38-62 ASCII, 50=0dB (some channels: 00,38-62)
- id: channel_volume_status_query
  label: Channel Volume Status Query
  kind: action
  params: []
- id: channel_volume_reset
  label: Reset All Channel Levels
  kind: action
  params: []
- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: Video source or SOURCE (cancel), ON, OFF
- id: video_select_status_query
  label: Video Select Status Query
  kind: action
  params: []
- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "001-120 or OFF"
- id: sleep_timer_status_query
  label: Sleep Timer Status Query
  kind: action
  params: []
- id: auto_standby
  label: Auto Standby
  kind: action
  params:
    - name: setting
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
- id: digital_input_select
  label: Digital Input Select
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"
- id: digital_input_status_query
  label: Digital Input Status Query
  kind: action
  params: []
- id: rec_select
  label: Record Source Select
  kind: action
  params:
    - name: source
      type: string
      description: Same parameter names as SI command
- id: rec_select_status_query
  label: Record Select Status Query
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
- id: picture_contrast
  label: Picture Contrast
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or 000-100 (050=0)"
- id: picture_brightness
  label: Picture Brightness
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or 000-100 (050=0)"
- id: picture_saturation
  label: Picture Saturation
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or 000-100 (050=0)"
- id: picture_hue
  label: Picture Hue
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or 44-56 (50=0)"
- id: picture_dnr
  label: Picture DNR
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MID, HI"
- id: picture_enhancer
  label: Picture Enhancer
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or 00-12 (00=0)"
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
      description: "6 digits: ****.** kHz AM, ****.** MHz FM"
- id: tuner_frequency_status_query
  label: Tuner Frequency Status Query
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
  label: Tuner Preset Set
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56"
- id: tuner_preset_status_query
  label: Tuner Preset Status Query
  kind: action
  params: []
- id: tuner_band
  label: Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: "AM, FM, AUTO, MANUAL"
- id: tuner_band_status_query
  label: Tuner Band Status Query
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
      type: string
      description: "00-98, 80=0dB"
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
- id: zone2_channel_volume
  label: Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP or DOWN"
- id: zone2_channel_volume_set
  label: Zone2 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
    - name: value
      type: string
      description: "38-62 ASCII, 50=0dB"
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
      type: string
      description: "00-98, 80=0dB"
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
- id: zone3_channel_volume
  label: Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP or DOWN"
- id: zone3_channel_volume_set
  label: Zone3 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
    - name: value
      type: string
      description: "38-62 ASCII, 50=0dB"
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
      description: "6 digits with optional MC* for multi cast"
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
- id: hd_radio_preset_set
  label: HD Radio Preset Set
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56"
- id: online_music_control
  label: Online Music / USB/iPod Control
  kind: action
  params:
    - name: command
      type: string
      description: "90-9Z, RPT, RND, B*, C*, H, FV MEM, NSA, NSE (see NS command table)"
- id: main_zone_favorite_select
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4"
- id: main_zone_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4"
- id: surround_quick_select_memory
  label: Surround Quick Select Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4, 5"
- id: video_aspect_ratio
  label: Video Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: "NRM (4:3), FUL (16:9)"
- id: video_monitor_output
  label: Video Monitor Output
  kind: action
  params:
    - name: output
      type: string
      description: "AUTO, MONI1, MONI2"
- id: video_resolution
  label: Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "48P (480p/576p), 10I (1080i), 72P (720p), 10P (1080p), 10P24, 4K, 4KF (4K 60/50), AUTO"
- id: video_hdmi_resolution
  label: Video HDMI Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO"
- id: video_hdmi_audio_output
  label: Video HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: "AMP, TV"
- id: video_processing_mode
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, GAME, MOVI"
- id: video_vertical_stretch
  label: Video Vertical Stretch
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: digital_input_decoder
  label: Digital Input Decoder Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, PCM, DTS"
- id: ps_tone_control
  label: PS Tone Control
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: ps_bass
  label: PS Bass
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (50=0dB, AVR operates 44-56)"
- id: ps_treble
  label: PS Treble
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (50=0dB, AVR operates 44-56)"
- id: ps_dialog_level
  label: PS Dialog Level
  kind: action
  params:
    - name: value
      type: string
      description: "ON, OFF, UP, DOWN, or 38-62 (50=0dB)"
- id: ps_subwoofer_level
  label: PS Subwoofer Level
  kind: action
  params:
    - name: value
      type: string
      description: "ON, OFF, UP, DOWN, or 00,38-62 (50=0dB)"
- id: ps_subwoofer2_level
  label: PS Subwoofer 2 Level
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00,38-62 (50=0dB)"
- id: ps_cinema_eq
  label: PS Cinema EQ
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: ps_mode
  label: PS Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC"
- id: ps_loudness_management
  label: PS Loudness Management
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: ps_front_height
  label: PS Front Height
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: ps_speaker_output
  label: PS Speaker Output
  kind: action
  params:
    - name: config
      type: string
      description: "FW, FH, SB, HW, BH, BW, FL, HF, FR"
- id: ps_pl2z_height_gain
  label: PS PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: "LOW, MID, HI"
- id: ps_multeq
  label: PS MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"
- id: ps_dynamic_eq
  label: PS Dynamic EQ
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: ps_reference_level_offset
  label: PS Reference Level Offset
  kind: action
  params:
    - name: level
      type: string
      description: "0, 5, 10, 15"
- id: ps_dynamic_volume
  label: PS Dynamic Volume
  kind: action
  params:
    - name: setting
      type: string
      description: "HEV, MED, LIT, OFF"
- id: ps_audyssey_lfc
  label: PS Audyssey LFC
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: ps_containment_amount
  label: PS Containment Amount
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 01-07)"
- id: ps_audyssey_dsx
  label: PS Audyssey DSX
  kind: action
  params:
    - name: mode
      type: string
      description: "ONHW, ONH, ONW, OFF"
- id: ps_stage_width
  label: PS Stage Width
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (50=0dB, AVR operates 40-60)"
- id: ps_stage_height
  label: PS Stage Height
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (50=0dB, AVR operates 40-60)"
- id: ps_graphic_eq
  label: PS Graphic EQ
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: ps_dynamic_compression
  label: PS Dynamic Compression
  kind: action
  params:
    - name: setting
      type: string
      description: "AUTO, LOW, MID, HI, OFF"
- id: ps_bass_sync
  label: PS Bass Sync
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 0-16)"
- id: ps_dialogue_enhancer
  label: PS Dialogue Enhancer
  kind: action
  params:
    - name: setting
      type: string
      description: "OFF, LOW, MED, HIGH"
- id: ps_lfe
  label: PS LFE
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (00=0dB, 10=-10dB, AVR operates 0 to -10)"
- id: ps_lfe_level_ext
  label: PS LFE Level External Input
  kind: action
  params:
    - name: level
      type: string
      description: "00, 05, 10, 15"
- id: ps_effect
  label: PS Effect
  kind: action
  params:
    - name: value
      type: string
      description: "ON, OFF, UP, DOWN, or 00-99 (AVR operates 1-15)"
- id: ps_delay
  label: PS Delay
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 000-999 (ms, AVR operates 0-300)"
- id: ps_panorama
  label: PS Panorama
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: ps_dimension
  label: PS Dimension
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 0-6)"
- id: ps_center_width
  label: PS Center Width
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 0-7)"
- id: ps_center_image
  label: PS Center Image
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 0.0-1.0)"
- id: ps_center_gain
  label: PS Center Gain
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 0.0-1.0)"
- id: ps_center_spread
  label: PS Center Spread
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: ps_subwoofer_switch
  label: PS Subwoofer Switch
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: ps_room_size
  label: PS Room Size
  kind: action
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L"
- id: ps_audio_delay
  label: PS Audio Delay
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 000-999 (ms, AVR operates 0-200)"
- id: ps_audio_restorer
  label: PS Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HI"
- id: ps_front_speaker
  label: PS Front Speaker
  kind: action
  params:
    - name: setting
      type: string
      description: "SPA, SPB, A+B"
- id: ps_auro_preset
  label: PS Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "SMA, MED, LAR, SPE"
- id: ps_auro_strength
  label: PS Auro-Matic 3D Strength
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 1-16)"
- id: zone2_input_select
  label: Zone2 Input Select
  kind: action
  params:
    - name: source
      type: string
      description: "SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4, 5"
- id: zone2_quick_select_memory
  label: Zone2 Quick Select Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4, 5"
- id: zone2_favorite_select
  label: Zone2 Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4"
- id: zone2_favorite_memory
  label: Zone2 Favorite Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4"
- id: zone2_channel_setting
  label: Zone2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
- id: zone2_hpf
  label: Zone2 High Pass Filter
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: zone2_bass
  label: Zone2 Bass
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 40-60)"
- id: zone2_treble
  label: Zone2 Treble
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 40-60)"
- id: zone2_hdmi_audio
  label: Zone2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: "THR, PCM"
- id: zone2_sleep_timer
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: value
      type: string
      description: "OFF, or 001-120 (minutes)"
- id: zone2_auto_standby
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: setting
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone3_input_select
  label: Zone3 Input Select
  kind: action
  params:
    - name: source
      type: string
      description: "SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4, 5"
- id: zone3_quick_select_memory
  label: Zone3 Quick Select Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4, 5"
- id: zone3_favorite_select
  label: Zone3 Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4"
- id: zone3_favorite_memory
  label: Zone3 Favorite Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "1, 2, 3, 4"
- id: zone3_channel_setting
  label: Zone3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
- id: zone3_hpf
  label: Zone3 High Pass Filter
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: zone3_bass
  label: Zone3 Bass
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 40-60)"
- id: zone3_treble
  label: Zone3 Treble
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-99 (AVR operates 40-60)"
- id: zone3_sleep_timer
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: value
      type: string
      description: "OFF, or 001-120 (minutes)"
- id: zone3_auto_standby
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: setting
      type: string
      description: "2H, 4H, 8H, OFF"
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "ANMEM (interactive) or ANMEM01-56 (direct, 01-56)"
- id: tuner_rds_station_name_query
  label: Tuner RDS Station Name Query
  kind: action
  params: []
- id: hd_radio_tuning_mode
  label: HD Radio Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU"
- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "HDMEM (interactive) or HDMEM01-56 (direct, 01-56)"
- id: hd_radio_info_query
  label: HD Radio Info Query
  kind: action
  params: []
- id: system_menu_navigation
  label: System Menu Navigation
  kind: action
  params:
    - name: command
      type: string
      description: "CUP, CDN, CLT, CRT, ENT, RTN, OPT, INF, CHL"
- id: system_menu_setup
  label: System Menu Setup
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: system_instaprevue
  label: System InstaPrevue
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: all_zone_stereo
  label: All Zone Stereo
  kind: action
  params:
    - name: setting
      type: string
      description: "ON, OFF"
- id: system_lock
  label: System Lock
  kind: action
  params:
    - name: mode
      type: string
      description: "REMOTE LOCK ON, REMOTE LOCK OFF, PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF"
- id: trigger_control
  label: Trigger Control
  kind: action
  params:
    - name: trigger
      type: string
      description: "1, 2"
    - name: state
      type: string
      description: "ON, OFF"
- id: dimmer
  label: Dimmer
  kind: action
  params:
    - name: setting
      type: string
      description: "BRI, DIM, DAR, OFF, SEL"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [PWON, PWSTANDBY]
- id: master_volume_state
  type: string
  description: "MV value (00-98, 80=0dB, 00=---MIN)"
- id: mute_state
  type: enum
  values: [MUON, MUOFF]
- id: input_state
  type: string
  description: "SI + source name"
- id: main_zone_state
  type: enum
  values: [ZMON, ZMOFF]
- id: surround_mode_state
  type: string
  description: "MS + mode name"
- id: channel_volume_state
  type: string
  description: "CVFL/CVFR/etc + value"
- id: hd_radio_signal_level
  type: enum
  values: [HDSIG LEV 0, HDSIG LEV 1, HDSIG LEV 2, HDSIG LEV 3, HDSIG LEV 4, HDSIG LEV 5, HDSIG LEV 6]
- id: hd_radio_band
  type: enum
  values: [HDMODE DIGITAL, HDMODE ANALOG]
```

## Variables
```yaml
# UNRESOLVED: many PS (parameter setting) commands set EQ/tone/bass/treble values
# These could be modeled as Variables, but source documents them as SET actions
# with query counterparts. Recommend modeling as levelable params if needed.
```

## Events
```yaml
# Device sends EVENT messages when state changes (operated directly or by another controller)
# Events within 5 seconds of state change, same format as commands
# PW, MV, CV, MU, SI, ZM, MS, SD, PS, PV and others fire events on state change
# UNRESOLVED: complete event list not enumerated in source - only command/response pairs shown
```

## Macros
```yaml
# No explicit multi-step macros described in source
# Note: source says wait 1 second after PWON before sending next command (line 108)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: power-on sequencing - wait 1 second after PWON before next command (line 108)
```

## Notes
Command format: COMMAND + PARAMETER + CR (0x0D). ASCII 0x20-0x7F only. Max 135 bytes per message. Send commands at 50ms+ intervals. Response within 200ms of query. Event within 5 seconds of state change. Half duplex on both serial and TCP. No login/auth required.
<!-- UNRESOLVED: complete list of unsolicited events not explicitly enumerated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: error/fault behavior not documented in source -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T05:56:00.295Z
last_checked_at: 2026-06-09T10:33:36.382Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T10:33:36.382Z
matched_actions: 169
action_count: 169
confidence: medium
summary: "All 169 spec actions matched against source (PW/MV/MU/SI/ZM/SR/SD/DC/SV/VS/SLP/STBY/ECO/MS/CV/PS/PV/Tuner/HDRadio/NS/MN/SY/TR/DIM/Zone2/Zone3); only UG IDN and RM STA/END (2 minor diagnostic commands) present in source but unrepresented in spec; transport port 23 and 9600 8N1 confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- UGIDN
- "RM STA"
- "firmware compatibility range not stated in source"
- "many PS (parameter setting) commands set EQ/tone/bass/treble values"
- "complete event list not enumerated in source - only command/response pairs shown"
- "no explicit safety warnings or interlock procedures in source"
- "complete list of unsolicited events not explicitly enumerated"
- "firmware version compatibility not stated"
- "error/fault behavior not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
