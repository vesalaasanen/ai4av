---
spec_id: admin/marantz-sr7009-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR7009 Series Control Spec"
manufacturer: Marantz
model_family: SR7009
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR7009
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:29:35.314Z
last_checked_at: 2026-06-09T23:02:34.880Z
generated_at: 2026-06-09T23:02:34.880Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PSBAS **"
  - "PSBAS ?"
  - "PSTRE **"
  - "PSTRE ?"
  - "PSTONE CTRL ?"
  - "Bluetooth control, HD Radio mode support, firmware compatibility"
  - "many PS (parameter settings) commands set persistent values"
  - "complete event catalog not enumerated in source"
  - "no explicit multi-step macros documented"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated"
  - "authentication credentials not stated (no login procedure in source)"
  - "exact event catalog not enumerated in source"
  - "Bluetooth-specific command details sparse"
  - "HD Radio mode support varies by model region"
verification:
  verdict: verified
  checked_at: 2026-06-09T23:02:34.880Z
  matched_actions: 122
  action_count: 122
  confidence: medium
  summary: "All 122 spec actions confirmed in source; transport literals match (port 23, 9600/8N1); only 5 uncovered sub-variants (PSBAS **/?, PSTRE **/?, PSTONE CTRL ?) from partially-enumerated families — below the short threshold. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR7009 Series Control Spec

## Summary
AV receiver with TCP/IP (port 23 telnet) and RS-232C (DB-9, 9600bps, 8N1) control. ASCII command protocol with 2-char commands + parameters + CR (0x0D). Supports multi-zone operation (MAIN/ZONE2/ZONE3), surround modes, video processing, tuner, and network/USB playback.

<!-- UNRESOLVED: Bluetooth control, HD Radio mode support, firmware compatibility -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet) stated in source
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
- powerable       # PWON/PWSTANDBY commands present
- routable        # SI (input select), SD (digital input select) present
- queryable       # ? suffix commands (PW?, MV?, SI?, etc.) present
- levelable       # MV (master vol), CV (channel vol), PS tone controls present
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

- id: power_status
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
      description: Volume 0-98 (80=0dB, 00=---/MIN). 0.5dB steps use 3-digit ASCII.

- id: master_volume_status
  label: Get Master Volume Status
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

- id: mute_status
  label: Get Mute Status
  kind: action
  params: []

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP

- id: input_status
  label: Get Input Source Status
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

- id: main_zone_status
  label: Get Main Zone Status
  kind: action
  params: []

- id: digital_input_select
  label: Select Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO

- id: channel_volume
  label: Set Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: level
      type: integer
      description: Channel level 00-99 (50=0dB). Range 38-62 for most channels.

- id: channel_volume_status
  label: Get Channel Volume Status
  kind: action
  params: []

- id: reset_channel_levels
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []

- id: surround_mode
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, QUICK1-5 MEMORY

- id: surround_status
  label: Get Surround Mode Status
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

- id: treble_up
  label: Treble Up
  kind: action
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  params: []

- id: sleep_timer
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001-120 minutes, or OFF

- id: auto_standby
  label: Set Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 15M, 30M, 60M, OFF

- id: eco_mode
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF

- id: video_resolution
  label: Set Video Resolution
  kind: action
  params:
    - name: res
      type: string
      description: SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO (HDMI out)
    - name: hdmi
      type: boolean
      description: true for HDMI output, false for main

- id: hdmi_monitor
  label: Set HDMI Monitor
  kind: action
  params:
    - name: monitor
      type: string
      description: MONIAUTO, MONI1, MONI2

- id: hdmi_audio_output
  label: Set HDMI Audio Output
  kind: action
  params:
    - name: dest
      type: string
      description: AMP, TV

- id: video_processing_mode
  label: Set Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, GAME, MOVI

- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT

- id: picture_adjust
  label: Adjust Picture Setting
  kind: action
  params:
    - name: setting
      type: string
      description: CN (contrast), BR (brightness), ST (saturation), HUE, DNR, ENH
    - name: direction
      type: string
      description: UP, DOWN, or value (contrast/brightness/saturation 000-100, hue 44-56, enhancer 00-12)

- id: multichannel_input
  label: Set Multichannel Input
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO

- id: rec_select
  label: Set Recording Select
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI command sources

- id: video_select
  label: Set Video Select
  kind: action
  params:
    - name: source
      type: string
      description: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-7, CD, SOURCE, ON, OFF

- id: quick_select
  label: Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: 1-5
    - name: action
      type: string
      description: MEMORY or omitted for select

- id: tuner_frequency
  label: Set Tuner Frequency
  kind: action
  params:
    - name: band
      type: string
      description: AM or FM frequency in kHz (6 digits, AM >50000, FM <50000)
    - name: direction
      type: string
      description: UP, DOWN, or frequency value

- id: tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: 01-56
    - name: action
      type: string
      description: MEM to store, or number to tune

- id: tuner_band_mode
  label: Tuner Band/Mode
  kind: action
  params:
    - name: band
      type: string
      description: AM, FM
    - name: mode
      type: string
      description: AUTO, MANUAL (tuning mode)

- id: hd_radio_channel
  label: Set HD Radio Channel
  kind: action
  params:
    - name: band
      type: string
      description: AM or FM frequency
    - name: direction
      type: string
      description: UP, DOWN, or frequency value
    - name: multicast
      type: integer
      description: Optional multicast channel 1-8 (analog 0)

- id: hd_radio_preset
  label: HD Radio Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: 01-56
    - name: action
      type: string
      description: MEM to store, or number to tune

- id: hd_radio_band_mode
  label: HD Radio Band/Mode
  kind: action
  params:
    - name: band
      type: string
      description: HDAM, HDFM
    - name: mode
      type: string
      description: AUTOHD, AUTO, MANUAL, ANAAUTO, ANAMANU

- id: netusb_control
  label: Net/USB Control
  kind: action
  params:
    - name: command
      type: string
      description: "90-9Z codes for cursor/repeat/shuffle/search, RPT, RND, B## (preset call), C## (preset memory), H (preset name), FV MEM (add favorites), NSA (now playing info), NSE (request display info)"

- id: zone2_on
  label: Zone2 On
  kind: action
  params: []

- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []

- id: zone2_source
  label: Zone2 Select Source
  kind: action
  params:
    - name: source
      type: string
      description: Same sources as SI command

- id: zone2_volume
  label: Zone2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or value (00-98, 80=0dB)
    - name: set
      type: boolean
      description: true to set absolute value

- id: zone2_mute
  label: Zone2 Mute
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: zone2_channel
  label: Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR
    - name: direction
      type: string
      description: UP, DOWN, or value

- id: zone2_hpf
  label: Zone2 HPF
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: zone2_bass_treble
  label: Zone2 Bass/Treble
  kind: action
  params:
    - name: band
      type: string
      description: BAS, TRE
    - name: direction
      type: string
      description: UP, DOWN, or value

- id: zone2_hdmi_audio
  label: Zone2 HDMI Audio
  kind: action
  params:
    - name: mode
      type: string
      description: THR (through), PCM

- id: zone2_sleep
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: time
      type: string
      description: OFF or minutes 001-120

- id: zone2_standby
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 2H, 4H, 8H, OFF

- id: zone3_on
  label: Zone3 On
  kind: action
  params: []

- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []

- id: zone3_source
  label: Zone3 Select Source
  kind: action
  params:
    - name: source
      type: string
      description: Same sources as SI command

- id: zone3_volume
  label: Zone3 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or value

- id: zone3_mute
  label: Zone3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: zone3_channel
  label: Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR
    - name: direction
      type: string
      description: UP, DOWN, or value

- id: zone3_hpf
  label: Zone3 HPF
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: zone3_bass_treble
  label: Zone3 Bass/Treble
  kind: action
  params:
    - name: band
      type: string
      description: BAS, TRE
    - name: direction
      type: string
      description: UP, DOWN, or value

- id: zone3_sleep
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: time
      type: string
      description: OFF or minutes 001-120

- id: zone3_standby
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 2H, 4H, 8H, OFF
- id: main_zone_favorite
  label: Main Zone Favorite Select/Store
  kind: action
  params:
    - name: number
      type: integer
      description: Favorite slot 1-4
    - name: action
      type: string
      description: MEMORY to store, omit to select

- id: digital_input_mode
  label: Set Digital Input Decoding Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, PCM, DTS

- id: aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      description: NRM (4:3 mode), FUL (16:9 mode)

- id: vertical_stretch
  label: Set Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: system_navigation
  label: System Navigation and Menu Control
  kind: action
  params:
    - name: command
      type: string
      description: "CUP, CDN, CLT, CRT, ENT, RTN, OPT, INF, CHL; MEN ON, MEN OFF; PRV ON, PRV OFF; ZST ON, ZST OFF"

- id: panel_lock
  label: Panel and Remote Lock Control
  kind: action
  params:
    - name: mode
      type: string
      description: "REMOTE LOCK ON, REMOTE LOCK OFF, PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF"

- id: trigger_control
  label: Trigger Output Control
  kind: action
  params:
    - name: trigger
      type: integer
      description: Trigger number 1 or 2
    - name: state
      type: string
      description: ON, OFF

- id: dimmer
  label: Display Dimmer Setting
  kind: action
  params:
    - name: level
      type: string
      description: BRI (Bright), DIM, DAR (Dark), OFF, SEL (toggle)

- id: ps_dialog_level
  label: Dialog Level Adjust
  kind: action
  params:
    - name: command
      type: string
      description: "ON, OFF, UP, DOWN, or level value 38-62 (50=0dB)"

- id: ps_subwoofer_level
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: command
      type: string
      description: "ON, OFF, UP, DOWN, or value 00/38-62 (50=0dB); SWL2 UP/DOWN/value for second subwoofer"

- id: ps_cinema_eq
  label: Cinema EQ On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: ps_mode
  label: PL Surround Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MUSIC, CINEMA, GAME, PRO LOGIC

- id: ps_loudness_management
  label: Loudness Management On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: ps_front_height_output
  label: Front Height Output On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: ps_speaker_output
  label: Speaker Output Assignment
  kind: action
  params:
    - name: assignment
      type: string
      description: FW, FH, SB, HW, BH, BW, FL, HF, FR

- id: ps_pl2z_height_gain
  label: PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: LOW, MID, HI

- id: ps_multeq
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF

- id: ps_dynamic_eq
  label: Dynamic EQ On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: ps_reference_level
  label: Reference Level Offset
  kind: action
  params:
    - name: offset
      type: integer
      description: 0, 5, 10, or 15 dB

- id: ps_dynamic_volume
  label: Dynamic Volume Setting
  kind: action
  params:
    - name: level
      type: string
      description: HEV (Heavy), MED (Medium), LIT (Light), OFF

- id: ps_audyssey_lfc
  label: Audyssey LFC On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: ps_containment_amount
  label: Containment Amount
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 01-07

- id: ps_audyssey_dsx
  label: Audyssey DSX Setting
  kind: action
  params:
    - name: mode
      type: string
      description: ONHW (Height+Wide), ONH (Height only), ONW (Width only), OFF

- id: ps_stage_width
  label: Stage Width
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 40-60 (50=0dB, range -10 to +10)

- id: ps_stage_height
  label: Stage Height
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 40-60 (50=0dB, range -10 to +10)

- id: ps_graphic_eq
  label: Graphic EQ On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: ps_dynamic_compression
  label: Dynamic Range Compression
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, LOW, MID, HI, OFF

- id: ps_bass_sync
  label: Bass Sync
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 00-16

- id: ps_dialogue_enhancer
  label: Dialogue Enhancer Level
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MED, HIGH

- id: ps_lfe_level
  label: LFE Level
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 00-10 (00=0dB, 10=-10dB)

- id: ps_lfe_level_ext
  label: LFE Level for External/7.1CH Input
  kind: action
  params:
    - name: level
      type: string
      description: 00, 05, 10, 15

- id: ps_effect
  label: Effect On/Off and Level
  kind: action
  params:
    - name: command
      type: string
      description: "ON, OFF, UP, DOWN, or level value 01-15"

- id: ps_delay
  label: Surround Delay
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 000-300 ms (3ms/step to 60ms, 10ms/step over 60ms)

- id: ps_panorama
  label: Panorama On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: ps_dimension
  label: Dimension
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 00-06

- id: ps_center_width
  label: Center Width
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 00-07

- id: ps_center_image
  label: Center Image
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 00-10 (00=0.0, 10=1.0)

- id: ps_center_gain
  label: Center Gain
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 00-10 (00=0.0, 10=1.0)

- id: ps_center_spread
  label: Center Spread On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: ps_subwoofer_output
  label: Subwoofer Output On/Off (DIRECT/STEREO mode)
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF

- id: ps_room_size
  label: Room Size
  kind: action
  params:
    - name: size
      type: string
      description: S, MS, M, ML, L

- id: ps_audio_delay
  label: Audio Delay
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 000-200 ms

- id: ps_audio_restorer
  label: Audio Restorer
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MED, HI

- id: ps_front_speaker
  label: Front Speaker Output A/B/A+B
  kind: action
  params:
    - name: output
      type: string
      description: SPA, SPB, A+B

- id: ps_auro3d_preset
  label: Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: SMA, MED, LAR, SPE

- id: ps_auro3d_strength
  label: Auro-Matic 3D Strength
  kind: action
  params:
    - name: command
      type: string
      description: UP, DOWN, or value 01-16

- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: 1-5
    - name: action
      type: string
      description: MEMORY to store, omit to select

- id: zone2_favorite
  label: Zone2 Favorite Select/Store
  kind: action
  params:
    - name: number
      type: integer
      description: Favorite slot 1-4
    - name: action
      type: string
      description: MEMORY to store, omit to select

- id: zone2_channel_mode
  label: Zone2 Channel Stereo/Mono
  kind: action
  params:
    - name: mode
      type: string
      description: ST, MONO

- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: 1-5
    - name: action
      type: string
      description: MEMORY to store, omit to select

- id: zone3_favorite
  label: Zone3 Favorite Select/Store
  kind: action
  params:
    - name: number
      type: integer
      description: Favorite slot 1-4
    - name: action
      type: string
      description: MEMORY to store, omit to select

- id: zone3_channel_mode
  label: Zone3 Channel Stereo/Mono
  kind: action
  params:
    - name: mode
      type: string
      description: ST, MONO

- id: upgrade_id
  label: Request Firmware Upgrade ID Number
  kind: action
  params: []

- id: remote_maintenance
  label: Remote Maintenance Mode
  kind: action
  params:
    - name: command
      type: string
      description: STA to start, END to end
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [PWON, PWSTANDBY]

- id: master_volume
  type: integer
  description: 0-98 (80=0dB, 00=---/MIN), 3-digit for 0.5dB steps

- id: mute_state
  type: enum
  values: [MUON, MUOFF]

- id: input_source
  type: string
  description: Current input source name

- id: main_zone_state
  type: enum
  values: [ZMON, ZMOFF]

- id: surround_mode
  type: string
  description: Current surround mode

- id: channel_volumes
  type: object
  description: "Map of channel -> level (38-62, 50=0dB). Channels: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"

- id: digital_input_mode
  type: string

- id: video_select_mode
  type: string

- id: hd_radio_info
  type: object
  description: BAND, STATION NAME, MULTI CAST CURRENT CHANNEL, SIGNAL LEVEL (0-6), ARTIST (40 chars), TITLE (40 chars), ALBUM (40 chars), GENRE (23 chars), PROGRAM TYPE, MODE (DIGITAL/ANALOG)

- id: netusb_now_playing
  type: object
  description: NSA command returns: track info, artist, album, bitrate, position, playable flag

- id: zone2_state
  type: object
  description: Z2ON/OFF, source, volume (00-98), mute state

- id: zone3_state
  type: object
  description: Z3ON/OFF, source, volume (00-98), mute state

- id: tuner_status
  type: object
  description: TFAN frequency, TPAN preset, TM band/mode

- id: hd_radio_status
  type: object
  description: TFHD frequency/channel, TPHD preset, TMHD band/mode
```

## Variables
```yaml
# UNRESOLVED: many PS (parameter settings) commands set persistent values
# that function as variables. Full enumerated list not cleanly separated from actions in source.
```

## Events
```yaml
# Device sends EVENT messages when state changes (no prior request from controller)
# Same format as COMMAND+PARAMETER+CR
# EVENT sent within 5 seconds of state change
# Examples: PWON, PWSTANDBY, MV80, SIHDMI, MSDOLBY DIGITAL, CVFL 50
# UNRESOLVED: complete event catalog not enumerated in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
# Power-on note: wait 1 second before sending next command after PWON
# Command interval: send commands in 50ms or greater intervals
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command interval: 50ms minimum between commands. Power on (PWON): wait 1s before next command. Max data length: 135 bytes. RESPONSE within 200ms of request. EVENT within 5s of state change. Half-duplex communication. ASCII 0x20-0x7F only.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: authentication credentials not stated (no login procedure in source) -->
<!-- UNRESOLVED: exact event catalog not enumerated in source -->
<!-- UNRESOLVED: Bluetooth-specific command details sparse -->
<!-- UNRESOLVED: HD Radio mode support varies by model region -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:29:35.314Z
last_checked_at: 2026-06-09T23:02:34.880Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T23:02:34.880Z
matched_actions: 122
action_count: 122
confidence: medium
summary: "All 122 spec actions confirmed in source; transport literals match (port 23, 9600/8N1); only 5 uncovered sub-variants (PSBAS **/?, PSTRE **/?, PSTONE CTRL ?) from partially-enumerated families — below the short threshold. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PSBAS **"
- "PSBAS ?"
- "PSTRE **"
- "PSTRE ?"
- "PSTONE CTRL ?"
- "Bluetooth control, HD Radio mode support, firmware compatibility"
- "many PS (parameter settings) commands set persistent values"
- "complete event catalog not enumerated in source"
- "no explicit multi-step macros documented"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated"
- "authentication credentials not stated (no login procedure in source)"
- "exact event catalog not enumerated in source"
- "Bluetooth-specific command details sparse"
- "HD Radio mode support varies by model region"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
