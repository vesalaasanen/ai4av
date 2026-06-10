---
spec_id: admin/marantz-nr1711-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz NR1711 Series Control Spec"
manufacturer: Marantz
model_family: "NR1711 Series"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "NR1711 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:02:41.159Z
last_checked_at: 2026-06-09T13:44:19.174Z
generated_at: 2026-06-09T13:44:19.174Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Bluetooth control section incomplete in source"
  - "flow control not stated in source"
  - "many PS (Parameter Setting) commands partially documented - too many sub-parameters to enumerate fully from table formatting"
  - "HD Radio commands (TFHD, TPHD, TMHD, HD) require better source formatting"
  - "Network streaming commands (NS*) for USB/iPod/Bluetooth incomplete"
  - "response schemas for complex PS parameter queries not fully enumerated from table"
  - "PS parameter responses (tone, bass, treble, EQ, DRC, etc.) - table formatting obscures exact response schema"
  - "Video adjustment responses (PVCN, PVBR, PVST, PVHUE, etc.) - table formatting obscures exact response schema"
  - "no discrete Variables section found in source - all settable parameters use action command pattern"
  - "complete event type enumeration not provided in source"
  - "no explicit multi-step macros found in source"
  - "no safety warnings or interlock procedures stated in source"
  - "firmware version compatibility not stated"
  - "exact port number for RS-232 not stated (only DB-9 pinout provided)"
  - "flow control (RTS/CTS) for RS-232 not stated"
  - "TCP keepalive or connection persistence behavior not stated"
verification:
  verdict: verified
  checked_at: 2026-06-09T13:44:19.174Z
  matched_actions: 137
  action_count: 137
  confidence: medium
  summary: "All 137 spec actions match literal source commands (semantic-id convention); transport port 23 and serial 9600-8N1 confirmed; MV?/Z2?/Z3? query-only variants covered by feedbacks; coverage ratio 137/140=0.979 exceeds 0.9 threshold. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz NR1711 Series Control Spec

## Summary
Slim-profile AV receiver supporting multi-zone audio/video control via RS-232C and TCP/IP (Telnet on port 23). ASCII-based command/response protocol with half-duplex communication. Supports 3 zones, HD radio, tuner, network streaming, and comprehensive audio DSP.

<!-- UNRESOLVED: Bluetooth control section incomplete in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet) - stated explicitly in source
serial:
  baud_rate: 9600  # stated: "9600bps"
  data_bits: 8  # stated: "8 bits"
  parity: none  # stated: "None"
  stop_bits: 1  # stated: "1 bit"
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # PWON, PWSTANDBY commands present
- routable       # SI input select, ZM zone control present
- queryable      # ? suffix commands present (PW?, MV?, SI?, etc.)
- levelable      # MV, CV, PS volume/DSP level commands present
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
      description: "00-98 (ASCII), 80=0dB, 00=minimum (---dB). See volume table for dB steps."

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: mute_status
  label: Query Mute Status
  kind: action
  params: []

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP"

- id: input_status
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

- id: main_zone_status
  label: Query Main Zone Status
  kind: action
  params: []

- id: channel_volume
  label: Channel Volume Control
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
    - name: direction
      type: string
      description: "UP, DOWN, or ** for direct value (38-62 ASCII, 50=0dB)"

- id: channel_volume_reset
  label: Reset All Channel Levels
  kind: action
  params: []

- id: channel_volume_status
  label: Query Channel Volume Status
  kind: action
  params: []

- id: rec_select
  label: REC Select Mode
  kind: action
  params:
    - name: source
      type: string
      description: "Source name same as SI command"

- id: digital_input_mode
  label: Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"

- id: video_select
  label: Video Select Mode
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-7, CD, SOURCE, ON, OFF"

- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 (ASCII), 010=10min, OFF to cancel"

- id: auto_standby
  label: Auto Standby Setting
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

- id: surround_mode
  label: Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, QUICK1-5 MEMORY, and many others"

- id: video_resolution
  label: Video Resolution (HDMI Out)
  kind: action
  params:
    - name: resolution
      type: string
      description: "ASPNRM, ASPFUL, MONIAUTO, MONI1, MONI2, SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO, SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO"

- id: hdmi_audio_output
  label: HDMI Audio Output
  kind: action
  params:
    - name: target
      type: string
      description: "AMP, TV"

- id: video_processing_mode
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, GAME, MOVI"

- id: vertical_stretch
  label: Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: tone_control
  label: Tone Control
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: bass_control
  label: Bass Control
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, 50=0dB, range -6 to +6dB)"

- id: treble_control
  label: Treble Control
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, 50=0dB, range -6 to +6dB)"

- id: dialog_level
  label: Dialog Level Adjust
  kind: action
  params:
    - name: action
      type: string
      description: "ON, OFF, UP, DOWN, ** for direct (38-62 ASCII, 50=0dB)"

- id: subwoofer_level
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: action
      type: string
      description: "ON, OFF, UP, DOWN, ** for direct (00,38-62 ASCII, 50=0dB)"

- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"

- id: picture_adjust
  label: Picture Adjustment
  kind: action
  params:
    - name: parameter
      type: string
      description: "CN (contrast), BR (brightness), ST (saturation), HUE, DNR, ENH - each with UP/DOWN/**"

- id: zone2_on
  label: Zone2 On
  kind: action
  params: []

- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []

- id: zone2_source
  label: Zone2 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: "Same source names as SI command"

- id: zone2_volume
  label: Zone2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-98 ASCII, 80=0dB)"

- id: zone2_mute
  label: Zone2 Mute
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: zone3_on
  label: Zone3 On
  kind: action
  params: []

- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []

- id: zone3_source
  label: Zone3 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: "Same source names as SI command"

- id: zone3_volume
  label: Zone3 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-98 ASCII, 80=0dB)"

- id: zone3_mute
  label: Zone3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: tuner_frequency
  label: Tuner Frequency
  kind: action
  params:
    - name: direction
      type: string
      description: "ANUP, ANDOWN, or 6-digit frequency AN******"
    - name: band
      type: string
      description: "AM (>050000), FM (<050000)"

- id: tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: action
      type: string
      description: "ANUP, ANDOWN, AN** (01-56), ANMEM, ANMEM**, AN?"

- id: tuner_band
  label: Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: "ANAM (AM), ANFM (FM), ANAUTO, ANMANUAL"

- id: trigger_control
  label: Trigger Control
  kind: action
  params:
    - name: number
      type: integer
      description: "1, 2"
    - name: state
      type: string
      description: "ON, OFF"

- id: dimmer
  label: Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: "BRI, DIM, DAR, OFF, SEL"

- id: system_menu
  label: System Menu
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ?"

- id: panel_lock
  label: Panel Lock
  kind: action
  params:
    - name: mode
      type: string
      description: "LOCK ON, LOCK OFF, PANEL+V LOCK ON"

- id: remote_lock
  label: Remote Lock
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: all_zone_stereo
  label: All Zone Stereo
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"

# UNRESOLVED: many PS (Parameter Setting) commands partially documented - too many sub-parameters to enumerate fully from table formatting
# UNRESOLVED: HD Radio commands (TFHD, TPHD, TMHD, HD) require better source formatting
# UNRESOLVED: Network streaming commands (NS*) for USB/iPod/Bluetooth incomplete
- id: video_aspect_ratio
  label: Video Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: "ASPNRM (4:3), ASPFUL (16:9), ASP ? (query)"

- id: video_monitor_select
  label: Video Monitor Select
  kind: action
  params:
    - name: mode
      type: string
      description: "MONIAUTO (auto), MONI1 (OUT-1), MONI2 (OUT-2), MONI ? (query)"

- id: digital_control_mode
  label: Digital Control Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, PCM, DTS, ? (query) — force digital decode mode"

- id: main_zone_favorite_select
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: preset
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"

- id: main_zone_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY"

- id: cinema_eq
  label: Cinema EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query)"

- id: ps_mode
  label: PS Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC, ? (query) — changes DOLBY PL2/PL2x/NEO:6 mode"

- id: loudness_management
  label: Loudness Management
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query)"

- id: front_height_output
  label: Front Height Output
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query) — Front Height (PLIIx Height) output enable"

- id: speaker_output_assign
  label: Speaker Output Assign
  kind: action
  params:
    - name: assignment
      type: string
      description: "FW (Front Wide), FH (Front Height), SB (Surround Back), HW (Height+Wide), BH (SB+FH), BW (SB+FW), FL (Floor), HF (Height+Floor), FR (Front), ? (query)"

- id: pl2z_height_gain
  label: PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: "LOW, MID, HI, ? (query)"

- id: multeq_mode
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUDYSSEY (Reference), BYP.LR (L/R Bypass), FLAT, MANUAL, OFF, ? (query)"

- id: dynamic_eq
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query)"

- id: reference_level_offset
  label: Reference Level Offset
  kind: action
  params:
    - name: offset
      type: string
      description: "0, 5, 10, 15 (dB offset values), ? (query)"

- id: dynamic_volume
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "HEV (Heavy), MED (Medium), LIT (Light), OFF, ? (query)"

- id: audyssey_lfc
  label: Audyssey LFC
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query)"

- id: containment_amount
  label: Containment Amount
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, AVR range 01-07), ? (query)"

- id: audyssey_dsx
  label: Audyssey DSX
  kind: action
  params:
    - name: mode
      type: string
      description: "ONHW (Height+Wide), ONH (Height only), ONW (Width only), OFF, ? (query)"

- id: stage_width
  label: Stage Width
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, 50=0dB, range -10 to +10), ? (query)"

- id: stage_height
  label: Stage Height
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, 50=0dB, range -10 to +10), ? (query)"

- id: graphic_eq
  label: Graphic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query)"

- id: dynamic_compression
  label: Dynamic Compression
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, LOW, MID, HI, OFF, ? (query)"

- id: bass_sync
  label: Bass Sync
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, range 0-16), ? (query)"

- id: dialogue_enhancer
  label: Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MED, HIGH, ? (query)"

- id: lfe_level
  label: LFE Level
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, 00=0dB, 10=-10dB, range 0 to -10), ? (query)"

- id: lfe_level_ext
  label: LFE Level EXT
  kind: action
  params:
    - name: level
      type: string
      description: "00, 05, 10, 15, ? (query) — LFE Level for EXT.IN/7.1CH IN mode"

- id: effect_control
  label: Effect Control
  kind: action
  params:
    - name: action
      type: string
      description: "ON, OFF, UP, DOWN, ** for direct (00-99 ASCII, 00=0dB, range 1-15), ? (query)"

- id: audio_delay
  label: Audio Delay PS
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, *** for direct (000-999 ASCII, 000=0ms, range 0-300ms), ? (query)"

- id: panorama
  label: Panorama
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query)"

- id: dimension
  label: Dimension
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, range 0-6), ? (query)"

- id: center_width
  label: Center Width
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, range 0-7), ? (query)"

- id: center_image
  label: Center Image
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, 00=0.0, range 0.0-1.0), ? (query)"

- id: center_gain
  label: Center Gain
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, 00=0.0, range 0.0-1.0), ? (query)"

- id: center_spread
  label: Center Spread
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query)"

- id: subwoofer_switch
  label: Subwoofer Switch
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query) — SW enable in DIRECT/STEREO(2ch) mode"

- id: room_size
  label: Room Size
  kind: action
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L, ? (query)"

- id: ps_audio_delay
  label: PS Audio Delay
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, *** for direct (000-999 ASCII, 000=0ms, range 0-200ms), ? (query)"

- id: audio_restorer
  label: Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW (MODE3), MED (MODE2), HI (MODE1), ? (query)"

- id: front_speaker_select
  label: Front Speaker Select
  kind: action
  params:
    - name: speaker
      type: string
      description: "SPA, SPB, A+B, ? (query)"

- id: auro_matic_preset
  label: Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "SMA (Small), MED (Medium), LAR (Large), SPE (Speech), ? (query)"

- id: auro_matic_strength
  label: Auro-Matic 3D Strength
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, range 1-16), ? (query)"

- id: subwoofer2_level
  label: Subwoofer 2 Level
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00,38-62 ASCII, 50=0dB)"

- id: zone2_channel_setting
  label: Zone2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST (stereo), MONO, ? (query)"

- id: zone2_channel_volume
  label: Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (38-62 ASCII, 50=0dB), ? (query via Z2CV?)"

- id: zone2_hpf
  label: Zone2 HPF
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query)"

- id: zone2_tone
  label: Zone2 Bass/Treble
  kind: action
  params:
    - name: band
      type: string
      description: "BAS (bass), TRE (treble)"
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, 50=0dB, range -10 to +10), ? (query)"

- id: zone2_hdmi_audio
  label: Zone2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: "THR (Through), PCM, ? (query)"

- id: zone2_sleep_timer
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: time
      type: string
      description: "OFF, *** for 001-120 min (ASCII, 010=10min), ? (query)"

- id: zone2_auto_standby
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: "2H, 4H, 8H, OFF, ? (query)"

- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: preset
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"

- id: zone2_quick_select_memory
  label: Zone2 Quick Select Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY, ? (query)"

- id: zone2_favorite_select
  label: Zone2 Favorite Select
  kind: action
  params:
    - name: preset
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"

- id: zone2_favorite_memory
  label: Zone2 Favorite Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY"

- id: zone3_channel_setting
  label: Zone3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST (stereo), MONO, ? (query)"

- id: zone3_channel_volume
  label: Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (38-62 ASCII, 50=0dB), ? (query)"

- id: zone3_hpf
  label: Zone3 HPF
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query)"

- id: zone3_tone
  label: Zone3 Bass/Treble
  kind: action
  params:
    - name: band
      type: string
      description: "BAS (bass), TRE (treble)"
    - name: direction
      type: string
      description: "UP, DOWN, ** for direct (00-99 ASCII, 50=0dB, range -10 to +10), ? (query)"

- id: zone3_sleep_timer
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: time
      type: string
      description: "OFF, *** for 001-120 min (ASCII, 010=10min), ? (query)"

- id: zone3_auto_standby
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: "2H, 4H, 8H, OFF, ? (query)"

- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: preset
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"

- id: zone3_quick_select_memory
  label: Zone3 Quick Select Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY, ? (query)"

- id: zone3_favorite_select
  label: Zone3 Favorite Select
  kind: action
  params:
    - name: preset
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"

- id: zone3_favorite_memory
  label: Zone3 Favorite Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY"

- id: hd_radio_frequency
  label: HD Radio Frequency
  kind: action
  params:
    - name: action
      type: string
      description: "HDUP, HDDOWN, HD****** (6-digit freq), HDMC* (multicast ch 0-8), HD******MC* (freq+multicast), HD? (query)"

- id: hd_radio_preset
  label: HD Radio Preset
  kind: action
  params:
    - name: action
      type: string
      description: "HDUP, HDDOWN, HD** (01-56), HD? (query), HDMEM, HDMEM** (01-56)"

- id: hd_radio_band
  label: HD Radio Band/Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "HDAM, HDFM, HDAUTOHD (auto-HD), HDAUTO, HDMANUAL, HDANAAUTO (analog auto), HDANAMANU (analog manual), HD? (query)"

- id: hd_radio_query
  label: HD Radio Status Query
  kind: action
  params: []

- id: network_cursor_control
  label: Network Cursor Control
  kind: action
  params:
    - name: direction
      type: string
      description: "90 (Cursor Up), 91 (Cursor Down), 92 (Cursor Left), 93 (Cursor Right)"

- id: network_playback_control
  label: Network Playback Control
  kind: action
  params:
    - name: command
      type: string
      description: "94 (Enter/Play/Pause), 9A (Play), 9B (Pause), 9C (Stop), 9D (Skip Plus), 9E (Skip Minus)"

- id: network_search_control
  label: Network Search Control
  kind: action
  params:
    - name: command
      type: string
      description: "9F (Manual Search Plus), 9G (Manual Search Minus), 9W (iPod/Onscreen Toggle), 9X (Page Next), 9Y (Page Previous), 9Z (Manual Search Stop)"

- id: network_repeat_random
  label: Network Repeat/Random Control
  kind: action
  params:
    - name: command
      type: string
      description: "9H (Repeat One), 9I (Repeat All), 9J (Repeat Off), 9K (Random On), 9M (Random Off), RPT (Repeat toggle), RND (Random toggle)"

- id: network_preset_call
  label: Network Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35 (2014 AVR preset number)"

- id: network_preset_memory
  label: Network Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35 (2014 AVR preset number)"

- id: network_preset_name
  label: Network Audio Preset Name Status
  kind: action
  params: []

- id: network_add_favorite
  label: Network Add Favorites Folder
  kind: action
  params: []

- id: network_display_ascii
  label: Network Onscreen Info ASCII
  kind: action
  params: []

- id: network_display_utf8
  label: Network Onscreen Info UTF-8
  kind: action
  params: []

- id: menu_cursor_navigation
  label: Menu Cursor Navigation
  kind: action
  params:
    - name: direction
      type: string
      description: "CUP (Up), CDN (Down), CLT (Left), CRT (Right)"

- id: menu_action_control
  label: Menu Action Control
  kind: action
  params:
    - name: action
      type: string
      description: "ENT (Enter), RTN (Return), OPT (Option), INF (Info), CHL (Channel Level Adjust)"

- id: insta_prevue
  label: InstaPrevue Control
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF, ? (query)"

- id: upgrade_id
  label: Upgrade ID Number
  kind: action
  params: []

- id: remote_maintenance
  label: Remote Maintenance Mode
  kind: action
  params:
    - name: state
      type: string
      description: "STA (start), END (end), ? (query)"

- id: tuner_rds_name
  label: Tuner RDS Station Name
  kind: action
  params: []
```

## Feedbacks
```yaml
# All feedbacks follow ASCII response format matching command structure.
# General pattern: same COMMAND prefix with parameter value, terminated by CR (0x0D).
# UNRESOLVED: response schemas for complex PS parameter queries not fully enumerated from table

- id: power_state
  type: enum
  values: [PWON, PWSTANDBY]

- id: master_volume_state
  type: string
  description: "MV followed by 2-3 digit value (00-98 or 005-995 for 0.5dB steps)"

- id: mute_state
  type: enum
  values: [MUON, MUOFF]

- id: input_state
  type: string
  description: "SI followed by source name"

- id: main_zone_state
  type: enum
  values: [ZMON, ZMOFF]

- id: channel_volume_state
  type: string
  description: "CV + channel + space + value (38-62 ASCII range, 50=0dB)"

- id: surround_mode_state
  type: string
  description: "MS followed by mode name"

- id: zone2_state
  type: string
  description: "Z2 response with current source/volume/mute status"

- id: zone3_state
  type: string
  description: "Z3 response with current source/volume/mute status"

- id: tuner_frequency_state
  type: string
  description: "TFAN + 6-digit frequency"

- id: hd_radio_state
  type: string
  description: "Multiple response fields: HDST NAME, HDSIG LEV, HDMLT CURRCH, HDARTIST, HDTITLE, HDALBUM, HDGENRE, HDMODE"

# UNRESOLVED: PS parameter responses (tone, bass, treble, EQ, DRC, etc.) - table formatting obscures exact response schema
# UNRESOLVED: Video adjustment responses (PVCN, PVBR, PVST, PVHUE, etc.) - table formatting obscures exact response schema
```

## Variables
```yaml
# UNRESOLVED: no discrete Variables section found in source - all settable parameters use action command pattern
```

## Events
```yaml
# Device sends EVENT messages asynchronously when state changes.
# EVENT format same as COMMAND. E.g., when input source changes, SI EVENT returned.
# Channel volume and surround mode also return as EVENT on input source change.
# Timing: EVENT sent within 5 seconds of state change.
# UNRESOLVED: complete event type enumeration not provided in source
```

## Macros
```yaml
# Power-on sequence note: "1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)"
# This is a timing constraint, not a multi-step macro - documented as a command interval rule.
# UNRESOLVED: no explicit multi-step macros found in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Command interval: Send COMMAND at 50ms or more intervals.
- RESPONSE within 200ms of receiving request COMMAND.
- EVENT within 5 seconds of state change.
- Half-duplex communication on both RS-232 and TCP.
- Maximum data length: 135 bytes per message.
- Power on command (PWON): wait 1 second before sending next command.
- COMMAND is receivable during EVENT transmission.
- Minimum MASTER VOLUME level defined as "00" (silence/---).
- Volume 0.5dB step uses 3 ASCII characters (e.g., MV805 for +0.5dB).
- Channel volume changes simultaneously when input source changes — value returns as EVENT.
- SURROUND MODE or CHANNEL VOLUME returns as EVENT on input change if value differs from previous.
- SURROUND MODE returns current value before returning new value as EVENT when changed.
- No login/authentication procedure described in source.
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact port number for RS-232 not stated (only DB-9 pinout provided) -->
<!-- UNRESOLVED: flow control (RTS/CTS) for RS-232 not stated -->
<!-- UNRESOLVED: TCP keepalive or connection persistence behavior not stated -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:02:41.159Z
last_checked_at: 2026-06-09T13:44:19.174Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T13:44:19.174Z
matched_actions: 137
action_count: 137
confidence: medium
summary: "All 137 spec actions match literal source commands (semantic-id convention); transport port 23 and serial 9600-8N1 confirmed; MV?/Z2?/Z3? query-only variants covered by feedbacks; coverage ratio 137/140=0.979 exceeds 0.9 threshold. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Bluetooth control section incomplete in source"
- "flow control not stated in source"
- "many PS (Parameter Setting) commands partially documented - too many sub-parameters to enumerate fully from table formatting"
- "HD Radio commands (TFHD, TPHD, TMHD, HD) require better source formatting"
- "Network streaming commands (NS*) for USB/iPod/Bluetooth incomplete"
- "response schemas for complex PS parameter queries not fully enumerated from table"
- "PS parameter responses (tone, bass, treble, EQ, DRC, etc.) - table formatting obscures exact response schema"
- "Video adjustment responses (PVCN, PVBR, PVST, PVHUE, etc.) - table formatting obscures exact response schema"
- "no discrete Variables section found in source - all settable parameters use action command pattern"
- "complete event type enumeration not provided in source"
- "no explicit multi-step macros found in source"
- "no safety warnings or interlock procedures stated in source"
- "firmware version compatibility not stated"
- "exact port number for RS-232 not stated (only DB-9 pinout provided)"
- "flow control (RTS/CTS) for RS-232 not stated"
- "TCP keepalive or connection persistence behavior not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
