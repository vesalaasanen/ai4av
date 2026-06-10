---
spec_id: admin/marantz-sr5014-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR5014 Series Control Spec"
manufacturer: Marantz
model_family: SR5014
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR5014
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:12:53.169Z
last_checked_at: 2026-06-09T19:08:18.581Z
generated_at: 2026-06-09T19:08:18.581Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - VSASPNRM
  - VSASPFUL
  - "PSBAS **"
  - "PSTRE **"
  - TPHDMEM
  - NS9G
  - "firmware version compatibility not stated in source"
  - "no explicit safety warnings or interlock procedures beyond timing note"
  - "firmware version compatibility not stated"
  - "exact response latency guarantees not specified beyond 200ms (query) and 5s (event)"
  - "error codes/fault behavior not documented"
  - "Ethernet autonegotiation details not specified beyond 10BASE-T/100BASE-TX"
verification:
  verdict: verified
  checked_at: 2026-06-09T19:08:18.581Z
  matched_actions: 146
  action_count: 146
  confidence: medium
  summary: "All 146 spec actions matched; 6 uncovered source tokens represent ≤5 functional groups (aspect ratio, bass/treble direct-set, HD preset memory, NS9G); transport port 23 / 9600-8N1 confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR5014 Series Control Spec

## Summary
AV receiver with both RS-232C and Ethernet (TCP/IP) control interfaces. Serial: 9600bps, 8N1, DB-9. IP: TCP port 23 (telnet). ASCII command protocol with 2-char command + parameter + CR. Supports multi-zone operation (Main Zone, Zone2, Zone3), surround mode selection, volume/mute control, input routing, tuner control, and networked audio playback. No authentication procedure described.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
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
- routable        # SI (input select), SD, DC commands present
- queryable       # ? suffix commands return status
- levelable       # MV, CV, tone, picture controls present
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
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 (MIN/-79.5dB) to 98 (+18.0dB); 80 = 0dB; MV? for current"
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []

# Input Select
- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: select_input_digital
  label: Select Digital Input
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"
- id: select_digital_input_type
  label: Select Digital Input Type
  kind: action
  params:
    - name: type
      type: string
      description: "AUTO, PCM, DTS"

# Surround Mode
- id: surround_mode
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO, 7.1IN, PURE DIRECT EXT, QUICK1-5, QUICK1-5 MEMORY, and many others - see full MS command table"

# Video Processing
- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-7, CD, SOURCE, ON, OFF"
- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
- id: video_resolution
  label: Set Video Resolution
  kind: action
  params:
    - name: res
      type: string
      description: "ASP NRM, ASP FUL, SC 48P, SC 10I, SC 72P, SC 10P, SC 10P24, SC 4K, SC 4KF, SCAUTO, and HDMI variants (SCH48P, SCH10I, etc.)"
- id: hdmi_monitor
  label: Set HDMI Monitor
  kind: action
  params:
    - name: monitor
      type: string
      description: "MONI AUTO, MONI1, MONI2"
- id: hdmi_audio_output
  label: HDMI Audio Output
  kind: action
  params:
    - name: dest
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
  label: Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"

# Audio Processing / Tone
- id: tone_control
  label: Tone Control
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
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
- id: dialog_level
  label: Dialog Level Adjust
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, UP, DOWN, or direct value 38-62 (50=0dB)"
- id: subwoofer_level
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, UP, DOWN, or direct value"
- id: subwoofer_level_2
  label: Subwoofer 2 Level Adjust
  kind: action
  params:
    - name: state
      type: string
      description: "UP, DOWN, or direct value"
- id: cinema_eq
  label: Cinema EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: dynamic_eq
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: loudness_management
  label: Loudness Management
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: dynamic_volume
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "HEV, MED, LIT, OFF"
- id: audio_restorer
  label: Audio Restorer
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MED, HI"
- id: multieq_mode
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"
- id: channel_volume
  label: Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
    - name: direction
      type: string
      description: "UP, DOWN, or direct dB value (38-62, 50=0dB; SW/SW2: 00,38-62)"
- id: reset_channel_levels
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []

# Sleep / ECO / Auto Standby
- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "OFF or 001-120 (010=10min)"
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
      description: "ON, AUTO, OFF"

# Zone 2 Control
- id: zone2_power
  label: Zone2 Power
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone2_select_input
  label: Zone2 Select Input
  kind: action
  params:
    - name: source
      type: string
      description: "Same sources as main zone (PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP, SOURCE)"
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
    - name: level
      type: integer
      description: "00 (MIN) to 98 (+18dB); 80 = 0dB"
- id: zone2_mute
  label: Zone2 Mute
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone2_channel_volume
  label: Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN, or direct value 38-62 (50=0dB)"
- id: zone2_hpf
  label: Zone2 HPF
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone2_bass
  label: Zone2 Bass
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or direct value 00-99 (50=0dB); range -10 to +10 (40-60)"
- id: zone2_treble
  label: Zone2 Treble
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or direct value 00-99 (50=0dB); range -10 to +10 (40-60)"
- id: zone2_hdmi_audio
  label: Zone2 HDMI Audio
  kind: action
  params:
    - name: mode
      type: string
      description: "THR (Through), PCM"
- id: zone2_sleep
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: time
      type: string
      description: "OFF or 001-120"
- id: zone2_auto_standby
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: num
      type: integer
      description: "1-5 select, 1-5 MEMORY to memorize"
- id: zone2_favorite
  label: Zone2 Favorite
  kind: action
  params:
    - name: num
      type: integer
      description: "1-4"
- id: zone2_channel_setting
  label: Zone2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"

# Zone 3 Control
- id: zone3_power
  label: Zone3 Power
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone3_select_input
  label: Zone3 Select Input
  kind: action
  params:
    - name: source
      type: string
      description: "Same sources as Zone2"
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
    - name: level
      type: integer
      description: "00 to 98; 80 = 0dB"
- id: zone3_mute
  label: Zone3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone3_channel_volume
  label: Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN, or direct value"
- id: zone3_hpf
  label: Zone3 HPF
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone3_bass
  label: Zone3 Bass
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or direct value"
- id: zone3_treble
  label: Zone3 Treble
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or direct value"
- id: zone3_sleep
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: time
      type: string
      description: "OFF or 001-120"
- id: zone3_auto_standby
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: num
      type: integer
      description: "1-5 select, 1-5 MEMORY to memorize"
- id: zone3_favorite
  label: Zone3 Favorite
  kind: action
  params:
    - name: num
      type: integer
      description: "1-4"
- id: zone3_channel_setting
  label: Zone3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"

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
      description: "6 digits: ****.** kHz (AM, >050000) or ****.** MHz (FM, <050000)"
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
      description: "ANAM (AM), ANFM (FM)"
    - name: mode
      type: string
      description: "ANAUTO, ANMANUAL"
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
      description: "6 digits with optional MC* for multicast channel"
- id: hd_radio_multicast_select
  label: HD Radio Multicast Select
  kind: action
  params:
    - name: channel
      type: integer
      description: "1-8 (multicast), 0 (analog)"
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
- id: hd_radio_band_mode
  label: HD Radio Band/Mode
  kind: action
  params:
    - name: band
      type: string
      description: "HDAM, HDFM"
    - name: mode
      type: string
      description: "HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU"

# Online Music / USB / iPod / Bluetooth / Network
- id: network_cursor
  label: Network Cursor Control
  kind: action
  params:
    - name: direction
      type: string
      description: "90 (Up), 91 (Down), 92 (Left), 93 (Right/Enter/Play/Pause/Stop/Skip+/Skip-), 94, 9A-9D, 9E (Skip Minus), 9F (Manual Search +/-)"
- id: network_repeat
  label: Network Repeat
  kind: action
  params:
    - name: mode
      type: string
      description: "RPT toggle, 9H (Repeat One), 9I (Repeat All), 9J (Repeat Off)"
- id: network_shuffle
  label: Network Shuffle
  kind: action
  params:
    - name: mode
      type: string
      description: "9K (Shuffle On), 9M (Shuffle Off)"
- id: network_preset_call
  label: Network Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35 (2014 AVR)"
- id: network_preset_memory
  label: Network Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35"
- id: net_audio_preset_name
  label: Net Audio Preset Name Status
  kind: action
  params: []
- id: favorites_add
  label: Add Favorites Folder
  kind: action
  params: []
- id: onscreen_display_request
  label: Onscreen Display Information Request
  kind: action
  params:
    - name: mode
      type: string
      description: "NSA (list), NSE (request)"
- id: ipod_mode_toggle
  label: iPod Mode Toggle
  kind: action
  params: []
- id: main_zone_on_off
  label: Main Zone On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zm_favorite
  label: Main Zone Favorite
  kind: action
  params:
    - name: num
      type: integer
      description: "1-4"
    - name: mode
      type: string
      description: "select (default) or MEMORY to memorize"
- id: rec_select
  label: Record Select
  kind: action
  params:
    - name: source
      type: string
      description: "SOURCE (cancel), PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: mn_navigate
  label: System Navigation
  kind: action
  params:
    - name: code
      type: string
      description: "CUP (Cursor Up), CDN (Cursor Down), CLT (Cursor Left), CRT (Cursor Right), ENT (Enter), RTN (Return), OPT (Option), INF (Info), CHL (Channel Level)"
- id: mn_menu
  label: Setup Menu
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: mn_instaprevue
  label: InstaPrevue
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: mn_all_zone_stereo
  label: All Zone Stereo
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: sy_remote_lock
  label: Remote Lock
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: sy_panel_lock
  label: Panel Lock
  kind: action
  params:
    - name: mode
      type: string
      description: "PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF"
- id: trigger
  label: Trigger Output
  kind: action
  params:
    - name: num
      type: integer
      description: "1, 2"
    - name: state
      type: string
      description: "ON, OFF"
- id: dimmer
  label: Display Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: "BRI (Bright), DIM (Dim), DAR (Dark), OFF, SEL (toggle)"
- id: ps_mode
  label: Dolby/DTS Decoding Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC"
- id: ps_front_height
  label: Front Height Output
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_speaker_config
  label: Speaker Output Configuration
  kind: action
  params:
    - name: config
      type: string
      description: "FW (F.Wide), FH (F.Height), SB (Surround Back), HW, BH, BW, FL (Floor), HF, FR (Front)"
- id: ps_pl2z_height_gain
  label: PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: "LOW, MID, HI"
- id: ps_reference_level
  label: Dynamic EQ Reference Level Offset
  kind: action
  params:
    - name: offset
      type: integer
      description: "0, 5, 10, 15 (dB)"
- id: ps_lfc
  label: Audyssey LFC
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_containment_amount
  label: Audyssey LFC Containment Amount
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 01-07 direct value"
- id: ps_dsx
  label: Audyssey DSX
  kind: action
  params:
    - name: mode
      type: string
      description: "ONHW (Height+Wide), ONH (Height only), ONW (Width only), OFF"
- id: ps_stage_width
  label: Stage Width
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 40-60 direct value (50=0dB)"
- id: ps_stage_height
  label: Stage Height
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 40-60 direct value (50=0dB)"
- id: ps_graphic_eq
  label: Graphic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_dynamic_compression
  label: Dynamic Compression
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, LOW, MID, HI, OFF"
- id: ps_bass_sync
  label: Bass Sync
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-16 direct value"
- id: ps_dialogue_enhancer
  label: Dialogue Enhancer
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HIGH"
- id: ps_lfe
  label: LFE Level Trim
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-10 direct value (00=0dB, 10=-10dB)"
- id: ps_lfe_level
  label: LFE Level (7.1CH IN / EXT.IN Mode)
  kind: action
  params:
    - name: level
      type: integer
      description: "0, 5, 10, 15"
- id: ps_effect
  label: Effect On/Off and Level
  kind: action
  params:
    - name: value
      type: string
      description: "ON, OFF, UP, DOWN, or 01-15 direct level value"
- id: ps_delay
  label: Sound Delay
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 000-300 direct value (ms; 0-60ms 3ms steps, over 60ms 10ms steps)"
- id: ps_panorama
  label: Panorama
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_dimension
  label: Dimension
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-06 direct value"
- id: ps_center_width
  label: Center Width
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-07 direct value"
- id: ps_center_image
  label: Center Image
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-10 direct value"
- id: ps_center_gain
  label: Center Gain
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-10 direct value"
- id: ps_center_spread
  label: Center Spread
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_sw_on_off
  label: Subwoofer Output (Direct/Stereo Mode)
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_room_size
  label: Room Size
  kind: action
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L"
- id: ps_audio_delay
  label: Audio Delay
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 000-200 direct value (ms)"
- id: ps_front_speaker
  label: Front Speaker Output
  kind: action
  params:
    - name: output
      type: string
      description: "SPA (Speaker A), SPB (Speaker B), A+B"
- id: ps_auro_preset
  label: Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "SMA (Small), MED (Medium), LAR (Large), SPE (Speech)"
- id: ps_auro_strength
  label: Auro-Matic 3D Strength
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 01-16 direct value"
- id: pv_contrast
  label: Picture Contrast
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 000-100 direct value (050=0)"
- id: pv_brightness
  label: Picture Brightness
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 000-100 direct value (050=0)"
- id: pv_saturation
  label: Picture Saturation
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 000-100 direct value (050=0)"
- id: pv_hue
  label: Picture Hue
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 44-56 direct value (50=0)"
- id: pv_dnr
  label: Digital Noise Reduction
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MID, HI"
- id: pv_enhancer
  label: Picture Enhancer
  kind: action
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 00-12 direct value"
- id: ns_page
  label: Network Page Control
  kind: action
  params:
    - name: direction
      type: string
      description: "9X (Page Next), 9Y (Page Previous)"
- id: ns_manual_search_stop
  label: Network Manual Search Stop
  kind: action
  params: []
- id: network_random_toggle
  label: Network Random Toggle
  kind: action
  params: []
- id: tuner_rds_name
  label: Tuner RDS Station Name Query
  kind: action
  params: []
- id: upgrade_id
  label: Display Upgrade ID Number
  kind: action
  params: []
- id: remote_maintenance
  label: Remote Maintenance Mode
  kind: action
  params:
    - name: state
      type: string
      description: "STA (start), END"
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values:
    - PWON
    - PWSTANDBY
  description: "Returned by PW?; unsolicited EVENT on state change"
- id: master_volume_status
  type: string
  description: "MV status; e.g. MV80 for 0dB; format per volume note"
- id: mute_status
  type: enum
  values:
    - MUON
    - MUOFF
- id: input_status
  type: string
  description: "Current input source, e.g. SIDVD"
- id: surround_mode_status
  type: string
  description: "Current surround mode, e.g. MSSTEREO"
- id: channel_volume_status
  type: string
  description: "CVFL 50, CVFR 50, etc.; CVEND marks end of multi-channel response"
- id: tuner_status
  type: string
  description: "TFAN105000 (AM 1050kHz), TFAN08710 (FM 87.10MHz)"
- id: hd_radio_status
  type: string
  description: "HD? returns: HDST NAME, HDSIG LEV (0-6), HDMLT CURRCH, HDMLT CAST CH*, HDPTY, HDARTIST (40 chars), HDTITLE (40 chars), HDALBUM (40 chars), HDGENRE (23 chars), HDMODE DIGITAL/ANALOG"
- id: net_audio_onscreen
  type: string
  description: "NSA returns 96-byte records NSA0-NSA8 with playback info; NSA1-5 carry metadata flags"
- id: zone2_status
  type: string
  description: "Z2ON, Z2OFF; Z2<volume> e.g. Z280"
- id: zone3_status
  type: string
  description: "Z3ON, Z3OFF; Z3<volume>"
- id: sleep_timer_status
  type: string
  description: "SLP120 for 120min, SLPOFF"
- id: auto_standby_status
  type: string
  description: "STBY15M, STBY30M, STBY60M, STBYOFF"
- id: eco_mode_status
  type: string
  description: "ECONON, ECOAUTO, ECOOFF"
- id: hdmi_monitor_status
  type: string
  description: "VSMONIAUTO, VSMONI1, VSMONI2"
- id: video_resolution_status
  type: string
  description: "VSSC? / VSSCH? for HDMI output resolution"
- id: video_select_status
  type: string
  description: "SVDVD, SVON, etc."
- id: picture_mode_status
  type: string
  description: "PVSTD, PVMOV, etc."
```

## Variables
```yaml
# All PS (parameter setting) commands that set/read discrete audio parameters
# are represented here as variables since they are settable/readable state.
- id: tone_control_state
  type: enum
  values: ["TONE CTRL ON", "TONE CTRL OFF"]
- id: bass_level
  type: integer
  range: [44, 56]  # -6 to +6dB; 50=0dB
- id: treble_level
  type: integer
  range: [44, 56]
- id: dialog_level
  type: integer
  range: [38, 62]  # 50=0dB
- id: subwoofer_level
  type: integer
  range: [38, 62]
- id: subwoofer2_level
  type: integer
  range: [38, 62]
- id: cinema_eq_state
  type: enum
  values: ["CINEMA EQ.ON", "CINEMA EQ.OFF"]
- id: dynamic_eq_state
  type: enum
  values: ["DYNEQ ON", "DYNEQ OFF"]
- id: loudness_management_state
  type: enum
  values: ["LOM ON", "LOM OFF"]
- id: dynamic_volume_setting
  type: enum
  values: ["DYNVOL HEV", "DYNVOL MED", "DYNVOL LIT", "DYNVOL OFF"]
- id: multieq_mode
  type: enum
  values: ["MULTEQ:AUDYSSEY", "MULTEQ:BYP.LR", "MULTEQ:FLAT", "MULTEQ:MANUAL", "MULTEQ:OFF"]
- id: audio_restorer_mode
  type: enum
  values: ["RSTR OFF", "RSTR LOW", "RSTR MED", "RSTR HI"]
- id: picture_contrast
  type: integer
  range: [0, 100]  # 50=0
- id: picture_brightness
  type: integer
  range: [0, 100]  # 50=0
- id: picture_saturation
  type: integer
  range: [0, 100]  # 50=0
- id: picture_hue
  type: integer
  range: [44, 56]  # -6 to +6; 50=0
- id: picture_dnr
  type: enum
  values: ["DNR OFF", "DNR LOW", "DNR MID", "DNR HI"]
- id: picture_enhancer
  type: integer
  range: [0, 12]
- id: zone2_bass
  type: integer
  range: [40, 60]
- id: zone2_treble
  type: integer
  range: [40, 60]
- id: zone3_bass
  type: integer
  range: [40, 60]
- id: zone3_treble
  type: integer
  range: [40, 60]
```

## Events
```yaml
# Device sends EVENT messages for state changes asynchronously.
# EVENT format is identical to COMMAND format.
# Unsolicited events fire when: power state changes, input source changes,
# surround mode changes, channel volume changes, direct operation occurs.
# Events fire within 5 seconds of state change (per spec).
# COMMANDs are receivable during EVENT transmission (no collision handling needed).
```

## Macros
```yaml
# No explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after transmitting PWON (power on) before sending next command"
    source: "Volume command note section, item J"
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond timing note
```

## Notes
Command timing: send commands at 50ms or greater intervals. RESPONSE sent within 200ms of receiving a ? query. EVENT sent within 5 seconds of state change.

ASCII-only command encoding (0x20-0x7F). CR (0x0D) terminates all commands.

Maximum data length: 135 bytes per transmission.

Volume encoding note: Master volume uses 2-char params for 0.5dB steps (e.g. MV805 = +0.5dB, MV795 = -0.5dB, MV80 = 0dB). Channel volume uses 2-char for subwoofer direct values and 3-char for 0.5dB step values.

COMMAND is receivable during EVENT transmission (no flow control needed). If input source changes and surround mode or channel volume remains the same, no EVENT is returned for those parameters.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact response latency guarantees not specified beyond 200ms (query) and 5s (event) -->
<!-- UNRESOLVED: error codes/fault behavior not documented -->
<!-- UNRESOLVED: Ethernet autonegotiation details not specified beyond 10BASE-T/100BASE-TX -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:12:53.169Z
last_checked_at: 2026-06-09T19:08:18.581Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T19:08:18.581Z
matched_actions: 146
action_count: 146
confidence: medium
summary: "All 146 spec actions matched; 6 uncovered source tokens represent ≤5 functional groups (aspect ratio, bass/treble direct-set, HD preset memory, NS9G); transport port 23 / 9600-8N1 confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- VSASPNRM
- VSASPFUL
- "PSBAS **"
- "PSTRE **"
- TPHDMEM
- NS9G
- "firmware version compatibility not stated in source"
- "no explicit safety warnings or interlock procedures beyond timing note"
- "firmware version compatibility not stated"
- "exact response latency guarantees not specified beyond 200ms (query) and 5s (event)"
- "error codes/fault behavior not documented"
- "Ethernet autonegotiation details not specified beyond 10BASE-T/100BASE-TX"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
