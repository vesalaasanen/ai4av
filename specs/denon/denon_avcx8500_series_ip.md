---
spec_id: admin/denon-avcx8500-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVCX8500 Series Control Spec"
manufacturer: Denon
model_family: AVCX8500
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - AVCX8500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T21:01:03.328Z
last_checked_at: 2026-06-09T10:15:57.089Z
generated_at: 2026-06-09T10:15:57.089Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete command list for USB/iPod/networking beyond what is documented; full parameter ranges for all extended commands"
  - "flow control not stated in source"
  - "complete event catalog not fully enumerated in source."
  - "no explicit safety warnings or interlock procedures found in source"
  - "firmware version compatibility not stated"
  - "authentication credentials/tokens not documented (no auth section found)"
  - "error code catalog not provided in source"
  - "network protocol details beyond TCP port 23 not specified"
verification:
  verdict: verified
  checked_at: 2026-06-09T10:15:57.089Z
  matched_actions: 149
  action_count: 149
  confidence: medium
  summary: "All 149 spec actions verified against source commands; every transport parameter confirmed verbatim; TFHD? covered by tuner_state feedback; coverage 149/150 = 0.993 exceeds 0.9 gate. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Denon AVCX8500 Series Control Spec

## Summary
Denon AVCX8500 is a multi-zone AV receiver supporting RS-232C and TCP/IP control. This spec covers power management, volume control, input routing, surround mode selection, zone management, tuner control, and network/Bluetooth playback. Commands are ASCII-based with CR (0x0D) termination. Minimum 50ms interval between commands; response within 200ms of query.

<!-- UNRESOLVED: complete command list for USB/iPod/networking beyond what is documented; full parameter ranges for all extended commands -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet) - stated in source
serial:
  baud_rate: 9600  # stated: "Communication speed : 9600bps"
  data_bits: 8  # stated: "Character length : 8 bits"
  parity: none  # stated: "Parity control : None"
  stop_bits: 1  # stated: "Start bit : 1 bit / Stop bit : 1 bit"
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # PWON/PWSTANDBY commands present
- routable  # SI (input select), SD (source direct), SV (video select) present
- queryable  # query commands (e.g. PW?, MV?, SI?) present returning state
- levelable  # MV (master volume), CV (channel volume), PS (parameter settings) present
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
  label: Get Power Status
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
      description: Volume level 0-98 (ASCII), 80=0dB, 00=minimum
- id: master_volume_query
  label: Get Master Volume
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
  label: Get Mute Status
  kind: action
  params: []
- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP
- id: input_status_query
  label: Get Input Status
  kind: action
  params: []
- id: zone_main_on
  label: Main Zone On
  kind: action
  params: []
- id: zone_main_off
  label: Main Zone Off
  kind: action
  params: []
- id: zone_main_query
  label: Get Main Zone Status
  kind: action
  params: []
- id: channel_volume
  label: Channel Volume Control
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: direction
      type: string
      description: UP, DOWN, or direct value
    - name: value
      type: integer
      description: "For direct: 38-62 (ASCII), 50=0dB; or 00,38-62 for subwoofer"
- id: channel_volume_reset_all
  label: Reset All Channel Levels
  kind: action
  params: []
- id: channel_volume_query
  label: Get Channel Volume Status
  kind: action
  params: []
- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, QUICK1-5 MEMORY, and many others
- id: surround_mode_query
  label: Get Surround Mode Status
  kind: action
  params: []
- id: quick_select
  label: Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: "1-5 for select, or MEMORY suffix for save"
- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 (minutes), or OFF"
- id: auto_standby
  label: Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: "15M, 30M, 60M, OFF"
- id: eco_mode
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF
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
- id: digital_input_mode
  label: Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO
- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE, ON, OFF
- id: hdmi_monitor
  label: HDMI Monitor
  kind: action
  params:
    - name: monitor
      type: string
      description: AUTO, MONI1, MONI2
- id: video_resolution
  label: Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO (SD), or SCH48P-SCHAUTO (HDMI)
- id: hdmi_audio_output
  label: HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: AMP, TV
- id: video_processing_mode
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, GAME, MOVI
- id: vertical_stretch
  label: Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      description: ASPNRM (4:3), ASPFUL (16:9)
- id: dialog_level_adjust
  label: Dialog Level Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or ON/OFF to enable
- id: subwoofer_level_adjust
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: sw
      type: string
      description: "SW (sub1), SW2 (sub2)"
    - name: direction
      type: string
      description: UP, DOWN, or ON/OFF
- id: cinema_eq
  label: Cinema EQ
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: dynamic_eq
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: dynamic_volume
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: HEV (Heavy), MED (Medium), LIT (Light), OFF
- id: mult EQ_mode
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF
- id: loudness_management
  label: Loudness Management
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: zone2_on
  label: Zone2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []
- id: zone2_select_input
  label: Zone2 Input Select
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI command sources
- id: zone2_volume
  label: Zone2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value
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
- id: zone3_select_input
  label: Zone3 Input Select
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI command sources
- id: zone3_volume
  label: Zone3 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value
- id: zone3_mute
  label: Zone3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
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
      description: 6 digits - ****.** kHz (AM) or ****.** MHz (FM)
- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
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
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tuner_band_mode
  label: Tuner Band/Mode
  kind: action
  params:
    - name: band
      type: string
      description: ANAM (AM), ANFM (FM)
    - name: mode
      type: string
      description: AUTO, MANUAL
- id: hd_radio_channel_up
  label: HD Radio Channel Up
  kind: action
  params: []
- id: hd_radio_channel_down
  label: HD Radio Channel Down
  kind: action
  params: []
- id: hd_radio_multicast_select
  label: HD Radio Multicast Select
  kind: action
  params:
    - name: channel
      type: integer
      description: "1-8 (multicast), 0 (analog)"
- id: network_control
  label: Network/USB Control
  kind: action
  params:
    - name: command
      type: string
      description: "90 (up), 91 (down), 92 (left), 93 (right), 94 (enter/play), 95 (pause), 96 (stop), 97 (skip+), 98 (skip-), 9A-9F, 9G-9M, 9W, 9X, 9Y, 9Z, RPT, RND, B**, C**, H, FV MEM, NSA, NSE"
- id: rec_select
  label: Record Select
  kind: action
  params:
    - name: source
      type: string
      description: 'SOURCE (cancel), PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, NET, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP'
- id: digital_compression_mode
  label: Digital Compression Mode
  kind: action
  params:
    - name: mode
      type: string
      description: 'AUTO, PCM, DTS'
- id: bass_set
  label: Set Bass Level
  kind: action
  params:
    - name: level
      type: integer
      description: 'Direct value 00-99 (ASCII), 50=0dB; range -6 to +6 (44 to 56)'
- id: treble_set
  label: Set Treble Level
  kind: action
  params:
    - name: level
      type: integer
      description: 'Direct value 00-99 (ASCII), 50=0dB; range -6 to +6 (44 to 56)'
- id: surround_parameter_mode
  label: Surround Parameter Mode
  kind: action
  params:
    - name: mode
      type: string
      description: 'MUSIC, CINEMA, GAME, PRO LOGIC'
- id: front_height_output
  label: Front Height Output
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: speaker_output
  label: Speaker Output Set
  kind: action
  params:
    - name: config
      type: string
      description: 'FW, FH, SB, HW, BH, BW, FL, HF, FR'
- id: pl2z_height_gain
  label: PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: 'LOW, MID, HI'
- id: reference_level_offset
  label: Reference Level Offset
  kind: action
  params:
    - name: level
      type: integer
      description: '0, 5, 10, 15 (dB)'
- id: audyssey_lfc
  label: Audyssey LFC
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: containment_amount
  label: Containment Amount
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (01-07 operable)'
- id: audyssey_dsx
  label: Audyssey DSX
  kind: action
  params:
    - name: mode
      type: string
      description: 'ONHW (Height+Wide), ONH (Height), ONW (Width), OFF'
- id: stage_width
  label: Stage Width
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (40-60 operable, 50=0dB)'
- id: stage_height
  label: Stage Height
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (40-60 operable, 50=0dB)'
- id: graphic_eq
  label: Graphic EQ
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: dynamic_compression
  label: Dynamic Compression
  kind: action
  params:
    - name: mode
      type: string
      description: 'AUTO, LOW, MID, HI, OFF'
- id: bass_sync
  label: Bass Sync
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (0-16 operable)'
- id: dialogue_enhancer
  label: Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: string
      description: 'OFF, LOW, MED, HIGH'
- id: lfe_level
  label: LFE Level
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (0 to -10 operable); 00=0dB, 10=-10dB'
- id: lfe_level_filter
  label: LFE Level Filter
  kind: action
  params:
    - name: level
      type: string
      description: '00, 05, 10, 15 (for EXT.IN/7.1CH IN mode)'
- id: effect_control
  label: Effect Control
  kind: action
  params:
    - name: command
      type: string
      description: 'ON, OFF, UP, DOWN, or direct value 00-99 (1-15 operable)'
- id: ps_delay
  label: Surround Delay
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 000-999 (0-300ms operable)'
- id: panorama
  label: Panorama
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: dimension
  label: Dimension
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (0-6 operable)'
- id: center_width
  label: Center Width
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (0-7 operable)'
- id: center_image
  label: Center Image
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (0.0-1.0 operable)'
- id: center_gain
  label: Center Gain
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (0.0-1.0 operable)'
- id: center_spread
  label: Center Spread
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: subwoofer_output
  label: Subwoofer Output
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: room_size
  label: Room Size
  kind: action
  params:
    - name: size
      type: string
      description: 'S, MS, M, ML, L'
- id: audio_delay_ms
  label: Audio Delay
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 000-999 (0-200ms operable)'
- id: audio_restorer
  label: Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: 'OFF, LOW (MODE3), MED (MODE2), HI (MODE1)'
- id: front_speaker
  label: Front Speaker Output
  kind: action
  params:
    - name: output
      type: string
      description: 'SPA, SPB, A+B'
- id: auro_matic_preset
  label: Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: 'SMA, MED, LAR, SPE'
- id: auro_matic_strength
  label: Auro-Matic 3D Strength
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (1-16 operable)'
- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: 'OFF, STD, MOV, VVD, STM, CTM, DAY, NGT'
- id: picture_contrast
  label: Picture Contrast
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 000-100 (050=0, range -50 to +50)'
- id: picture_brightness
  label: Picture Brightness
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 000-100 (050=0, range -50 to +50)'
- id: picture_saturation
  label: Picture Saturation
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 000-100 (050=0, range -50 to +50)'
- id: picture_hue
  label: Picture Hue
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 44-56 (50=0, range -6 to +6)'
- id: picture_dnr
  label: Picture DNR
  kind: action
  params:
    - name: mode
      type: string
      description: 'OFF, LOW, MID, HI'
- id: picture_enhancer
  label: Picture Enhancer
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-12'
- id: zone_main_favorite
  label: Main Zone Favorite
  kind: action
  params:
    - name: number
      type: integer
      description: '1-4 for recall; append MEMORY to save (e.g. ZMFAVORITE1 MEMORY)'
- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: '1-5 for select; append MEMORY to save'
- id: zone2_favorite
  label: Zone2 Favorite
  kind: action
  params:
    - name: number
      type: integer
      description: '1-4 for recall; append MEMORY to save'
- id: zone2_channel_setting
  label: Zone2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: 'ST, MONO'
- id: zone2_channel_volume
  label: Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: 'FL, FR'
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 38-62 (50=0dB)'
- id: zone2_hpf
  label: Zone2 High Pass Filter
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: zone2_bass
  label: Zone2 Bass
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (50=0dB; -10 to +10 range at 40-60)'
- id: zone2_treble
  label: Zone2 Treble
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (50=0dB; -10 to +10 range at 40-60)'
- id: zone2_hdmi_audio
  label: Zone2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: 'THR (Through), PCM'
- id: zone2_sleep_timer
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: '001-120 (minutes), or OFF'
- id: zone2_auto_standby
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: '2H, 4H, 8H, OFF'
- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: '1-5 for select; append MEMORY to save'
- id: zone3_favorite
  label: Zone3 Favorite
  kind: action
  params:
    - name: number
      type: integer
      description: '1-4 for recall; append MEMORY to save'
- id: zone3_channel_setting
  label: Zone3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: 'ST, MONO'
- id: zone3_channel_volume
  label: Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: 'FL, FR'
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 38-62 (50=0dB)'
- id: zone3_hpf
  label: Zone3 High Pass Filter
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: zone3_bass
  label: Zone3 Bass
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (50=0dB; -10 to +10 range at 40-60)'
- id: zone3_treble
  label: Zone3 Treble
  kind: action
  params:
    - name: direction
      type: string
      description: 'UP, DOWN, or direct value 00-99 (50=0dB; -10 to +10 range at 40-60)'
- id: zone3_sleep_timer
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: '001-120 (minutes), or OFF'
- id: zone3_auto_standby
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: '2H, 4H, 8H, OFF'
- id: hd_radio_preset_up
  label: HD Radio Preset Up
  kind: action
  params: []
- id: hd_radio_preset_down
  label: HD Radio Preset Down
  kind: action
  params: []
- id: hd_radio_preset_direct
  label: HD Radio Preset Direct
  kind: action
  params:
    - name: preset
      type: integer
      description: '01-56'
- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: '01-56 for direct; or omit for interactive memory sequence'
- id: hd_radio_band_mode
  label: HD Radio Band/Mode
  kind: action
  params:
    - name: band_mode
      type: string
      description: 'HDAM (AM), HDFM (FM), HDAUTOHD (Auto-HD), HDAUTO (Auto), HDMANUAL (Manual), HDANAAUTO (Analog Auto), HDANAMANU (Analog Manual)'
- id: hd_radio_status_query
  label: HD Radio Status Query
  kind: action
  params: []
- id: tuner_rds_query
  label: Tuner RDS Station Name Query
  kind: action
  params: []
- id: menu_navigation
  label: Menu Navigation
  kind: action
  params:
    - name: command
      type: string
      description: 'CUP (Cursor Up), CDN (Cursor Down), CLT (Cursor Left), CRT (Cursor Right), ENT (Enter), RTN (Return), OPT (Option), INF (Info), CHL (Channel Level)'
- id: menu_setup
  label: Setup Menu
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: insta_prevue
  label: InstaPrevue
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: all_zone_stereo
  label: All Zone Stereo
  kind: action
  params:
    - name: state
      type: string
      description: 'ON, OFF'
- id: system_lock
  label: System Lock
  kind: action
  params:
    - name: lock_type
      type: string
      description: 'REMOTE LOCK ON, REMOTE LOCK OFF, PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF'
- id: trigger_control
  label: Trigger Output Control
  kind: action
  params:
    - name: trigger
      type: integer
      description: '1 or 2'
    - name: state
      type: string
      description: 'ON, OFF'
- id: dimmer
  label: Display Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: 'BRI (Bright), DIM (Dim), DAR (Dark), OFF, SEL (Toggle)'
- id: remote_maintenance
  label: Remote Maintenance Mode
  kind: action
  params:
    - name: state
      type: string
      description: 'STA (Start), END (End)'
- id: upgrade_id_display
  label: Display Upgrade ID
  kind: action
  params: []
- id: hd_radio_frequency_direct
  label: HD Radio Frequency Direct
  kind: action
  params:
    - name: frequency
      type: integer
      description: '6-digit frequency; >050000 is AM (kHz), <050000 is FM (MHz)'
- id: tuner_frequency_query
  label: Tuner Frequency Query
  kind: action
  params: []
- id: tuner_preset_query
  label: Tuner Preset Query
  kind: action
  params: []
- id: hd_radio_frequency_multicast_direct
  label: HD Radio Frequency and Multicast Direct
  kind: action
  params:
    - name: frequency
      type: integer
      description: '6-digit frequency (TFHD format)'
    - name: multicast_channel
      type: integer
      description: '1-8 (multicast), 0 (analog)'
```

## Feedbacks
```yaml
# Responses returned for query commands (? suffix)
# Format: command + parameter + CR (0x0D)

- id: power_state
  label: Power State
  type: enum
  values:
    - PWON
    - PWSTANDBY
- id: master_volume_state
  label: Master Volume State
  type: string
  description: "MV*** format - 00-98 (ASCII), 80=0dB, 00=min"
- id: mute_state
  label: Mute State
  type: enum
  values:
    - MUON
    - MUOFF
- id: input_state
  label: Input State
  type: string
  description: SI*** - current input source name
- id: zone_main_state
  label: Main Zone State
  type: enum
  values:
    - ZMON
    - ZMOFF
- id: channel_volume_state
  label: Channel Volume State
  type: string
  description: "CV[CH] *** - e.g. CVFL 50"
- id: surround_mode_state
  label: Surround Mode State
  type: string
  description: MS*** - current surround mode
- id: tuner_state
  label: Tuner State
  type: string
  description: "TFAN****** or TFHD****** - frequency in format TFAN105000 (1050.00kHz AM or 105.00MHz FM)"
- id: tuner_preset_state
  label: Tuner Preset State
  type: string
  description: "TPAN** - preset number 01-56"
- id: hd_radio_state
  label: HD Radio State
  type: string
  description: "HDST NAME***, HDSIG LEV*, HDMLT CURRCH*, HDMLT CAST CH*, HDPTY*, HDARTIST*, HDTITLE*, HDALBUM*, HDGENRE*"
- id: zone2_state
  label: Zone2 State
  type: string
  description: Z2*** - power and input state
- id: zone3_state
  label: Zone3 State
  type: string
  description: Z3*** - power and input state
```

## Variables
```yaml
# Tunable parameters with direct-set commands (not discrete on/off)

- id: master_volume
  label: Master Volume
  type: integer
  range:
    min: 0
    max: 98
  default: 0
  description: "00-98 (ASCII), 80=0dB. Set with MV***<CR>"

- id: channel_volume
  label: Channel Volume
  type: integer
  range:
    min: 0
    max: 62
  default: 50
  description: "38-62 (ASCII), 50=0dB for most channels; 00,38-62 for subwoofer"

- id: bass_level
  label: Bass Level
  type: integer
  range:
    min: 0
    max: 99
  default: 50
  description: "00-99 (ASCII), 50=0dB, range -10 to +10"

- id: treble_level
  label: Treble Level
  type: integer
  range:
    min: 0
    max: 99
  default: 50
  description: "00-99 (ASCII), 50=0dB, range -10 to +10"

- id: sleep_timer_minutes
  label: Sleep Timer
  type: integer
  range:
    min: 0
    max: 120
  default: 0
  description: "001-120 minutes, 0=OFF"

- id: tuner_frequency
  label: Tuner Frequency
  type: integer
  range:
    min: 0
    max: 999999
  description: "6 digits: ****.** kHz (AM) or ****.** MHz (FM)"

- id: hd_radio_frequency
  label: HD Radio Frequency
  type: integer
  range:
    min: 0
    max: 999999
  description: "6 digits with HD multicast channel TFHD******MC*"
```

## Events
```yaml
# Unsolicited messages sent when device state changes

# Device sends EVENT within 5 seconds of state change
# Event format mirrors command format (same structure as commands)

# Examples of event patterns (device sends when state changes):
# - PWON, PWSTANDBY - power state changes
# - MV*** - master volume changes
# - SI*** - input source changes
# - MS*** - surround mode changes
# - CV[CH] *** - channel volume changes (when input source changes)
# - ZMON, ZMOFF - main zone state changes
# - Z2*** - zone 2 state changes
# - Z3*** - zone 3 state changes
# - TFAN*** - tuner frequency changes
# - TPAN*** - tuner preset changes
# - HD*** - HD radio state changes

# UNRESOLVED: complete event catalog not fully enumerated in source.
# Only representative examples documented.
```

## Macros
```yaml
# Multi-step sequences explicitly documented

# Power on sequence (documented timing requirement):
# 1. Send PWON<CR>
# 2. Wait 1 second before sending next command

# Volume direct change (documented):
# 1. Send MV[value]<CR> where value is 00-98 ASCII
# 2. Device responds with MV[value]<CR> within 200ms
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Power on: minimum 1 second delay before sending subsequent commands (documented note J)
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source
```

## Notes
Command interval: minimum 50ms between commands (stated: "Send the COMMAND in 50ms or more intervals").
Query response time: device responds within 200ms of receiving request command.
Event delivery: device sends within 5 seconds of state change.
Maximum data length: 135 bytes per message.
ASCII range: 0x20–0x7F for commands; CR (0x0D) only as pause/terminator.
Half duplex communication on both serial and TCP.
Command structure: 2-character command + parameter (up to 25 chars) + CR.
Query format: COMMAND + ? + CR; response mirrors command format with value.
COMMAND is receivable during EVENT transmission (noted: "COMMAND is receivable also during transmission of EVENT").
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: authentication credentials/tokens not documented (no auth section found) -->
<!-- UNRESOLVED: error code catalog not provided in source -->
<!-- UNRESOLVED: network protocol details beyond TCP port 23 not specified -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T21:01:03.328Z
last_checked_at: 2026-06-09T10:15:57.089Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T10:15:57.089Z
matched_actions: 149
action_count: 149
confidence: medium
summary: "All 149 spec actions verified against source commands; every transport parameter confirmed verbatim; TFHD? covered by tuner_state feedback; coverage 149/150 = 0.993 exceeds 0.9 gate. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete command list for USB/iPod/networking beyond what is documented; full parameter ranges for all extended commands"
- "flow control not stated in source"
- "complete event catalog not fully enumerated in source."
- "no explicit safety warnings or interlock procedures found in source"
- "firmware version compatibility not stated"
- "authentication credentials/tokens not documented (no auth section found)"
- "error code catalog not provided in source"
- "network protocol details beyond TCP port 23 not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
