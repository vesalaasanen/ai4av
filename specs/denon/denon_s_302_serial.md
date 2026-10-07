---
spec_id: admin/denon-s-302
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon S-302 Control Spec"
manufacturer: Denon
model_family: S-302
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - S-302
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T21:15:28.180Z
last_checked_at: 2026-10-07T22:06:06.827Z
generated_at: 2026-10-07T22:06:06.827Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic Denon AVR control protocol doc (Ver.06) — S-302-specific command subset not explicitly delineated"
  - "no explicit multi-step macros in source"
  - "no explicit safety warnings or interlock procedures beyond command timing"
  - "firmware version compatibility not stated"
  - "S-302-specific command subset not explicitly delineated from generic AVR protocol"
  - "protocol version number stated as Ver.06 but no version compatibility range"
  - "HD Radio commands may be North America model only"
  - "Auro-3D commands require Auro-3D Upgrade"
verification:
  verdict: verified
  checked_at: 2026-10-07T22:06:06.827Z
  matched_actions: 270
  action_count: 270
  confidence: medium
  summary: "All 270 action units match source tokens and transport values are stated; coverage is near-complete, though the MS surround-mode enum is only partly listed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Denon S-302 Control Spec

## Summary
Denon S-302 network audio system with RS-232C serial and Ethernet (TCP port 23) control. ASCII command protocol using 2-character command codes with parameters terminated by CR (0x0D). Covers power, volume, input selection, surround modes, Zone 2/3, tuner, USB/iPod, Bluetooth, and system settings.

<!-- UNRESOLVED: source is a generic Denon AVR control protocol doc (Ver.06) — S-302-specific command subset not explicitly delineated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED
addressing:
  port: 23
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable  # inferred from PW command
- queryable  # inferred from ? request commands
- levelable  # inferred from volume/bass/treble commands
- routable  # inferred from SI input selection commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: PWON
  description: "Power ON. Wait 1 second before next command."
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: PWSTANDBY
  description: "Power STANDBY"
  params: []

- id: master_volume_up
  label: Master Volume Up
  kind: action
  command: MVUP
  description: "Master volume UP. Range 00-98, 80=0dB, 00=---(MIN). Supports 0.5dB steps (3-char param)."
  params: []

- id: master_volume_down
  label: Master Volume Down
  kind: action
  command: MVDOWN
  description: "Master volume DOWN."
  params: []

- id: master_volume_set
  label: Master Volume Set
  kind: action
  command: "MV{level}"
  description: "Direct volume level. 2-char: 00-98 (80=0dB). 3-char for 0.5dB: e.g. 805=+0.5dB, 795=-0.5dB."
  params:
    - name: level
      type: string
      description: "Volume level (00-98 or 3-digit for 0.5dB step)"

- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  command: "CV{channel} UP"
  description: "Channel volume UP. Channels: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS. Range 38-62, 50=0dB."
  params:
    - name: channel
      type: string
      description: "Channel code (FL, FR, C, SW, SL, SR, etc.)"

- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  command: "CV{channel} DOWN"
  description: "Channel volume DOWN."
  params:
    - name: channel
      type: string
      description: "Channel code"

- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  command: "CV{channel} {level}"
  description: "Direct channel volume. Range 38-62, 50=0dB. SW range 00,38-62."
  params:
    - name: channel
      type: string
      description: "Channel code"
    - name: level
      type: string
      description: "Level value (38-62, 50=0dB)"

- id: channel_volume_reset
  label: Channel Volume Reset
  kind: action
  command: CVZRL
  description: "Reset all channel levels to factory defaults."
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: MUON
  description: "Output mute ON."
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: MUOFF
  description: "Output mute OFF."
  params: []

- id: select_input
  label: Select Input
  kind: action
  command: "SI{source}"
  description: "Select input source."
  params:
    - name: source
      type: string
      description: "Source name: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"

- id: main_zone_on
  label: Main Zone On
  kind: action
  command: ZMON
  description: "MAIN-ZONE ON."
  params: []

- id: main_zone_off
  label: Main Zone Off
  kind: action
  command: ZMOFF
  description: "MAIN-ZONE OFF."
  params: []

- id: rec_select
  label: Rec Select
  kind: action
  command: "SR{source}"
  description: "REC SELECT mode set and select source. SOURCE cancels."
  params:
    - name: source
      type: string
      description: "Source name (same as SI command) or SOURCE"

- id: input_mode_set
  label: Input Mode Set
  kind: action
  command: "SD{mode}"
  description: "Set input mode. AUTO: HDMI>DIGITAL>ANALOG priority."
  params:
    - name: mode
      type: string
      description: "Mode: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"

- id: digital_input_mode
  label: Digital Input Mode
  kind: action
  command: "DC{mode}"
  description: "Set digital input mode."
  params:
    - name: mode
      type: string
      description: "Mode: AUTO, PCM, DTS"

- id: video_select
  label: Video Select
  kind: action
  command: "SV{source}"
  description: "Video SELECT mode. ON/OFF enables/disables. SOURCE cancels."
  params:
    - name: source
      type: string
      description: "Source name or ON, OFF, SOURCE"

- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: "SLP{minutes}"
  description: "Main zone sleep timer. OFF or 001-120 (minutes)."
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120"

- id: auto_standby
  label: Auto Standby
  kind: action
  command: "STBY{setting}"
  description: "Main zone auto standby."
  params:
    - name: setting
      type: string
      description: "15M, 30M, 60M, OFF"

- id: eco_mode
  label: ECO Mode
  kind: action
  command: "ECO{mode}"
  description: "ECO mode setting."
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"

- id: surround_mode
  label: Surround Mode
  kind: action
  command: "MS{mode}"
  description: "Select surround mode. Many modes available."
  params:
    - name: mode
      type: string
      description: "Mode: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, MCH STEREO, AURO3D, AURO2DSURR, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5"

- id: surround_mode_memory
  label: Surround Mode Memory
  kind: action
  command: "MSQUICK{n} MEMORY"
  description: "Quick select 1-5 mode memory."
  params:
    - name: n
      type: string
      description: "Quick select number 1-5"

- id: tone_control
  label: Tone Control
  kind: action
  command: "PSTONE CTRL {state}"
  description: "Tone control ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: bass_adjust
  label: Bass Adjust
  kind: action
  command: "PSBAS {direction}"
  description: "Bass UP/DOWN/direct. Range 00-99, 50=0dB (AVR: 44-56 = -6 to +6)."
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or 2-digit level"

- id: treble_adjust
  label: Treble Adjust
  kind: action
  command: "PSTRE {direction}"
  description: "Treble UP/DOWN/direct. Range 00-99, 50=0dB (AVR: 44-56 = -6 to +6)."
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or 2-digit level"

- id: subwoofer_level
  label: Subwoofer Level Adjust
  kind: action
  command: "PSSWL {state_or_dir}"
  description: "Subwoofer level adjust ON/OFF/UP/DOWN/direct. Range 00,38-62, 50=0dB."
  params:
    - name: state_or_dir
      type: string
      description: "ON, OFF, UP, DOWN, or 2-digit level"

- id: cinema_eq
  label: Cinema EQ
  kind: action
  command: "PSCINEMA EQ.{state}"
  description: "Cinema EQ ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: dynamic_eq
  label: Dynamic EQ
  kind: action
  command: "PSDYNEQ {state}"
  description: "Dynamic EQ ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: dynamic_volume
  label: Dynamic Volume
  kind: action
  command: "PSDYNVOL {mode}"
  description: "Dynamic volume mode."
  params:
    - name: mode
      type: string
      description: "HEV, MED, LIT, OFF"

- id: multeq
  label: MultEQ Mode
  kind: action
  command: "PSMULTEQ:{mode}"
  description: "Audyssey MultEQ mode."
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"

- id: drc
  label: Dynamic Compression
  kind: action
  command: "PSDRC {mode}"
  description: "Dynamic compression mode."
  params:
    - name: mode
      type: string
      description: "AUTO, LOW, MID, HI, OFF"

- id: lfe_level
  label: LFE Level
  kind: action
  command: "PSLFE {level}"
  description: "LFE level. Range 00-10 (00=0dB, 10=-10dB)."
  params:
    - name: level
      type: string
      description: "UP, DOWN, or 2-digit level (00-10)"

- id: effect_level
  label: Effect Level
  kind: action
  command: "PSEFF {level}"
  description: "Effect ON/OFF/level. Range 00-15 (00=0dB, 10=10dB)."
  params:
    - name: level
      type: string
      description: "ON, OFF, UP, DOWN, or 2-digit level"

- id: delay_adjust
  label: Audio Delay
  kind: action
  command: "PSDEL {value}"
  description: "Delay 0-300ms. 0-60ms: 3ms step; >60ms: 10ms step."
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 3-digit value (000-999)"

- id: graphic_eq
  label: Graphic EQ
  kind: action
  command: "PSGEQ {state}"
  description: "Graphic EQ ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: room_size
  label: Room Size
  kind: action
  command: "PSRSZ {size}"
  description: "Room size setting."
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "VS{mode}"
  description: "Set aspect ratio."
  params:
    - name: mode
      type: string
      description: "ASPNRM (4:3), ASPFUL (16:9)"

- id: hdmi_monitor
  label: HDMI Monitor Select
  kind: action
  command: "VS{output}"
  description: "HDMI monitor output select."
  params:
    - name: output
      type: string
      description: "MONIAUTO, MONI1, MONI2"

- id: resolution_set
  label: Resolution Set
  kind: action
  command: "VS{res}"
  description: "Set output resolution."
  params:
    - name: res
      type: string
      description: "SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO (analog); SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO (HDMI)"

- id: hdmi_audio_output
  label: HDMI Audio Output
  kind: action
  command: "VSAUDIO {target}"
  description: "HDMI audio output target."
  params:
    - name: target
      type: string
      description: "AMP, TV"

- id: video_processing_mode
  label: Video Processing Mode
  kind: action
  command: "VS{mode}"
  description: "Video processing mode."
  params:
    - name: mode
      type: string
      description: "VPMAUTO, VPMGAME, VPMMOVI"

- id: vertical_stretch
  label: Vertical Stretch
  kind: action
  command: "VSVST {state}"
  description: "Vertical stretch ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: picture_mode
  label: Picture Mode
  kind: action
  command: "PV{mode}"
  description: "Picture mode select."
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"

- id: contrast_adjust
  label: Contrast Adjust
  kind: action
  command: "PVCN {value}"
  description: "Contrast adjust. Range 000-100, 050=0 (-50 to +50)."
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 3-digit value (000-100)"

- id: brightness_adjust
  label: Brightness Adjust
  kind: action
  command: "PVBR {value}"
  description: "Brightness adjust. Range 000-100, 050=0 (-50 to +50)."
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 3-digit value (000-100)"

- id: saturation_adjust
  label: Saturation Adjust
  kind: action
  command: "PVST {value}"
  description: "Saturation adjust. Range 000-100, 050=0 (-50 to +50)."
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 3-digit value (000-100)"

- id: hue_adjust
  label: Hue Adjust
  kind: action
  command: "PVHUE {value}"
  description: "Hue adjust. Range 44-56, 50=0 (-6 to +6)."
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 2-digit value (44-56)"

- id: dnr
  label: DNR
  kind: action
  command: "PVDNR {mode}"
  description: "Digital noise reduction."
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MID, HI"

- id: enhancer
  label: Enhancer
  kind: action
  command: "PVENH {value}"
  description: "Enhancer level. Range 00-12."
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 2-digit value (00-12)"

- id: zone2_source
  label: Zone 2 Source
  kind: action
  command: "Z2{source}"
  description: "Zone 2 input source select. SOURCE = same as main zone."
  params:
    - name: source
      type: string
      description: "SOURCE or source name (same as SI command)"

- id: zone2_on
  label: Zone 2 On
  kind: action
  command: Z2ON
  description: "Zone 2 ON."
  params: []

- id: zone2_off
  label: Zone 2 Off
  kind: action
  command: Z2OFF
  description: "Zone 2 OFF."
  params: []

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: Z2UP
  description: "Zone 2 volume UP. Range 00-98, 80=0dB, 00=---(MIN)."
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: Z2DOWN
  description: "Zone 2 volume DOWN."
  params: []

- id: zone2_volume_set
  label: Zone 2 Volume Set
  kind: action
  command: "Z2{level}"
  description: "Zone 2 direct volume level."
  params:
    - name: level
      type: string
      description: "2-digit level (00-98)"

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: Z2MUON
  description: "Zone 2 mute ON."
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: Z2MUOFF
  description: "Zone 2 mute OFF."
  params: []

- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  command: "Z2QUICK{n}"
  description: "Zone 2 quick select 1-5."
  params:
    - name: n
      type: string
      description: "1-5"

- id: zone2_sleep_timer
  label: Zone 2 Sleep Timer
  kind: action
  command: "Z2SLP{minutes}"
  description: "Zone 2 sleep timer. OFF or 001-120 minutes."
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120"

- id: zone2_auto_standby
  label: Zone 2 Auto Standby
  kind: action
  command: "Z2STBY{setting}"
  description: "Zone 2 auto standby."
  params:
    - name: setting
      type: string
      description: "2H, 4H, 8H, OFF"

- id: zone3_source
  label: Zone 3 Source
  kind: action
  command: "Z3{source}"
  description: "Zone 3 input source select. SOURCE = same as main zone."
  params:
    - name: source
      type: string
      description: "SOURCE or source name"

- id: zone3_on
  label: Zone 3 On
  kind: action
  command: Z3ON
  description: "Zone 3 ON."
  params: []

- id: zone3_off
  label: Zone 3 Off
  kind: action
  command: Z3OFF
  description: "Zone 3 OFF."
  params: []

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: Z3UP
  description: "Zone 3 volume UP."
  params: []

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: Z3DOWN
  description: "Zone 3 volume DOWN."
  params: []

- id: zone3_volume_set
  label: Zone 3 Volume Set
  kind: action
  command: "Z3{level}"
  description: "Zone 3 direct volume level."
  params:
    - name: level
      type: string
      description: "2-digit level (00-98)"

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: Z3MUON
  description: "Zone 3 mute ON."
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: Z3MUOFF
  description: "Zone 3 mute OFF."
  params: []

- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  command: TFANUP
  description: "Tuner frequency UP."
  params: []

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  command: TFANDOWN
  description: "Tuner frequency DOWN."
  params: []

- id: tuner_frequency_set
  label: Tuner Frequency Set
  kind: action
  command: "TFAN{freq}"
  description: "Direct frequency. 6 digits: >050000=AM (kHz), <050000=FM (MHz*100)."
  params:
    - name: freq
      type: string
      description: "6-digit frequency value"

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  command: TPANUP
  description: "Tuner preset channel UP."
  params: []

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  command: TPANDOWN
  description: "Tuner preset channel DOWN."
  params: []

- id: tuner_preset_select
  label: Tuner Preset Select
  kind: action
  command: "TPAN{num}"
  description: "Tuner preset direct. 01-56."
  params:
    - name: num
      type: string
      description: "Preset number 01-56"

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "TPANMEM{num}"
  description: "Store current frequency to preset."
  params:
    - name: num
      type: string
      description: "Preset number 01-56 (optional)"

- id: tuner_band
  label: Tuner Band Select
  kind: action
  command: "TMAN{band}"
  description: "Tuner band select."
  params:
    - name: band
      type: string
      description: "AM, FM"

- id: tuner_mode
  label: Tuner Mode
  kind: action
  command: "TMAN{mode}"
  description: "Tuning mode."
  params:
    - name: mode
      type: string
      description: "AUTO, MANUAL"

- id: network_cursor
  label: Network/USB Cursor
  kind: action
  command: "NS{code}"
  description: "Navigation and playback control for USB/iPod/Bluetooth/network."
  params:
    - name: code
      type: string
      description: "90=Up, 91=Down, 92=Left, 93=Right, 94=Enter (Play/Pause), 9A=Play, 9B=Pause, 9C=Stop, 9D=Skip+, 9E=Skip-, 9F=Manual Search+, 9G=Manual Search-, 9H=Repeat One, 9I=Repeat All, 9J=Repeat Off, 9K=Random On, 9M=Random Off, 9W=iPod mode toggle, 9X=Page Next, 9Y=Page Prev, 9Z=Search Stop"

- id: network_repeat
  label: Network Repeat
  kind: action
  command: NSRPT
  description: "Toggle repeat."
  params: []

- id: network_random
  label: Network Random
  kind: action
  command: NSRND
  description: "Toggle random/shuffle."
  params: []

- id: network_preset_call
  label: Network Preset Call
  kind: action
  command: "NSB{num}"
  description: "Network/USB preset call. 00-35."
  params:
    - name: num
      type: string
      description: "Preset number 00-35"

- id: network_preset_memory
  label: Network Preset Memory
  kind: action
  command: "NSC{num}"
  description: "Network/USB preset memory. 00-35."
  params:
    - name: num
      type: string
      description: "Preset number 00-35"

- id: system_menu_on
  label: Setup Menu On
  kind: action
  command: "MNMEN ON"
  description: "Setup menu ON."
  params: []

- id: system_menu_off
  label: Setup Menu Off
  kind: action
  command: "MNMEN OFF"
  description: "Setup menu OFF."
  params: []

- id: system_cursor
  label: System Menu Cursor
  kind: action
  command: "MN{code}"
  description: "Menu navigation."
  params:
    - name: code
      type: string
      description: "CUP=Up, CDN=Down, CLT=Left, CRT=Right, ENT=Enter, RTN=Return, OPT=Option, INF=Info"

- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  command: "MNZST ON"
  description: "All Zone Stereo ON."
  params: []

- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  command: "MNZST OFF"
  description: "All Zone Stereo OFF."
  params: []

- id: panel_lock
  label: Panel Lock
  kind: action
  command: "SY{mode}"
  description: "Panel/remote lock."
  params:
    - name: mode
      type: string
      description: "REMOTE LOCK ON, REMOTE LOCK OFF, PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF"

- id: trigger
  label: Trigger Control
  kind: action
  command: "TR{n} {state}"
  description: "Trigger 1/2 ON/OFF."
  params:
    - name: n
      type: string
      description: "Trigger number 1 or 2"
    - name: state
      type: string
      description: "ON, OFF"

- id: dimmer
  label: Dimmer
  kind: action
  command: "DIM{mode}"
  description: "Display dimmer."
  params:
    - name: mode
      type: string
      description: "BRI, DIM, DAR, OFF, SEL (toggle)"

- id: remote_maintenance_start
  label: Remote Maintenance Start
  kind: action
  command: "RM STA"
  description: "Remote maintenance mode start."
  params: []

- id: remote_maintenance_end
  label: Remote Maintenance End
  kind: action
  command: "RM END"
  description: "Remote maintenance mode end."
  params: []

- id: main_zone_favorite_select
  label: Main Zone Favorite Select
  kind: action
  command: "ZMFAVORITE{n}"
  description: "favorite 1-4 Mode select."
  params:
    - name: n
      type: string
      description: "1-4"

- id: main_zone_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  command: "ZMFAVORITE{n} MEMORY"
  description: "Favorite memory. Source examples: ZMFAVORITE1 MEMORY, ZMFAVORITE2 MEMORY, ZMFAVORITE3 MEMORY, ZMFAVORITE4 MEMORY."
  params:
    - name: n
      type: string
      description: "1-4"

- id: dialog_level_adjust
  label: Dialog Level Adjust
  kind: action
  command: "PSDIL {state_or_dir}"
  description: "Dialog Level Adjust ON/OFF, UP/DOWN, or direct level."
  params:
    - name: state_or_dir
      type: string
      description: "ON, OFF, UP, DOWN; direct level: 38 to 62 by ASCII , 50=0dB"

- id: subwoofer2_level_adjust
  label: Subwoofer 2 Level Adjust
  kind: action
  command: "PSSWL2 {direction}"
  description: "SUBWOOFER(2) Level Adjust."
  params:
    - name: direction
      type: string
      description: "UP, DOWN; direct level: 00,38 to 62 by ASCII , 50=0dB"

- id: surround_parameter_mode
  label: Surround Parameter Mode
  kind: action
  command: "PSMODE:{mode}"
  description: "CINEMA / MUSIC / GAME / PL mode change. This parameter can change DOLBY PL2,PL2x,NEO:6 mode. SB=ON：PL2x mode / SB=OFF：PL2 mode. GAME can change DOLBY PL2 & PL2x mode; PL can change ONLY DOLBY PL2 mode."
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC"

- id: loudness_management
  label: Loudness Management
  kind: action
  command: "PSLOM {state}"
  description: "Loudness Management ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: front_height_output
  label: Front Height Output
  kind: action
  command: "PSFH:{state}"
  description: "FRONT HEIGHT（PLⅡx Height) Output ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: speaker_output
  label: Speaker Output
  kind: action
  command: "PSSP:{output}"
  description: "Speaker Output set(F.Height/F.Wide/S.Back). Also supports Floor, Height & Floor, and Front."
  params:
    - name: output
      type: string
      description: "FW, FH, SB, HW, BH, BW, FL, HF, FR"

- id: height_gain
  label: Height Gain
  kind: action
  command: "PSPHG {level}"
  description: "PL2z HEIGHT GAIN direct change."
  params:
    - name: level
      type: string
      description: "LOW, MID, HI"

- id: reference_level_offset
  label: Reference Level Offset
  kind: action
  command: "PSREFLEV {level}"
  description: "Reference Level Offset=0dB, 5dB, 10dB, or 15dB."
  params:
    - name: level
      type: string
      description: "0, 5, 10, 15"

- id: audyssey_lfc
  label: Audyssey LFC
  kind: action
  command: "PSLFC {state}"
  description: "Audyssey LFC ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: containment_amount
  label: Containment Amount
  kind: action
  command: "PSCNTAMT {value}"
  description: "Containment Amount UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 00=0; AVR can be operated from 1 to 7 (01 to 07)"

- id: audyssey_dsx
  label: Audyssey DSX
  kind: action
  command: "PSDSX {mode}"
  description: "Audyssey DSX ON(Height＆Wide), ON(Height), ON(Width), or OFF."
  params:
    - name: mode
      type: string
      description: "ONHW, ONH, ONW, OFF"

- id: stage_width_adjust
  label: Stage Width Adjust
  kind: action
  command: "PSSTW {value}"
  description: "STAGE WIDTH UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct level: 00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"

- id: stage_height_adjust
  label: Stage Height Adjust
  kind: action
  command: "PSSTH {value}"
  description: "STAGE HEIGHT UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct level: 00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"

- id: bass_sync_adjust
  label: Bass Sync Adjust
  kind: action
  command: "PSBSC {value}"
  description: "Bass Sync UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 16"

- id: dialogue_enhancer
  label: Dialogue Enhancer
  kind: action
  command: "PSDEH {mode}"
  description: "Dialogue Enhancer."
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HIGH"

- id: external_input_lfe_level
  label: External Input LFE Level
  kind: action
  command: "PSLFL {level}"
  description: "LFE Level direct change(When EXT.IN/7.1CH IN)."
  params:
    - name: level
      type: string
      description: "00, 05, 10, 15"

- id: panorama
  label: Panorama
  kind: action
  command: "PSPAN {state}"
  description: "PANORAMA ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: dimension_adjust
  label: Dimension Adjust
  kind: action
  command: "PSDIM {value}"
  description: "DIMENSION UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 6"

- id: center_width_adjust
  label: Center Width Adjust
  kind: action
  command: "PSCEN {value}"
  description: "CENTER WIDTH UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 7"

- id: center_image_adjust
  label: Center Image Adjust
  kind: action
  command: "PSCEI {value}"
  description: "CENTER IMAGE UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"

- id: center_gain_adjust
  label: Center Gain Adjust
  kind: action
  command: "PSCEG {value}"
  description: "CENTER GAIN UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"

- id: center_spread
  label: Center Spread
  kind: action
  command: "PSCES {state}"
  description: "CENTER SPREAD ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: subwoofer_output
  label: Subwoofer Output
  kind: action
  command: "PSSWR {state}"
  description: "SW ON/OFF in DIRECT,STEREO(2ch) mode."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: audio_delay_adjust
  label: Audio Delay Adjust
  kind: action
  command: "PSDELAY {value}"
  description: "AUDIO DELAY UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 000 to 999 by ASCII , 000=0ms, 200=200ms; AVR can be operated from 0 to 200"

- id: audio_restorer
  label: Audio Restorer
  kind: action
  command: "PSRSTR {mode}"
  description: "AUDIO RESTORER direct change. Source command examples use PSRSTR OFF, PSRSTR LOW, PSRSTR MED, PSRSTR HI."
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HI"

- id: front_speaker_select
  label: Front Speaker Select
  kind: action
  command: "PSFRONT {speaker}"
  description: "FRONT SPEAKER direct change."
  params:
    - name: speaker
      type: string
      description: "SPA, SPB, A+B"

- id: auro_preset
  label: Auro Preset
  kind: action
  command: "PSAUROPR {preset}"
  description: "Auro-Matic 3D Preset direct change (Auro-3D Upgrade only)."
  params:
    - name: preset
      type: string
      description: "SMA, MED, LAR, SPE"

- id: auro_strength_adjust
  label: Auro Strength Adjust
  kind: action
  command: "PSAUROST {value}"
  description: "Auro-Matic 3D Strength UP/DOWN or direct change. Requires Auro-3D Upgrade."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 01=1, 10=10; AVR can be operated from 1 to 16"

- id: zone2_quick_memory
  label: Zone 2 Quick Memory
  kind: action
  command: "Z2QUICK{n} MEMORY"
  description: "Z2 QUICK SELECT 1-5 MODE MEMORY."
  params:
    - name: n
      type: string
      description: "1-5"

- id: zone2_favorite_select
  label: Zone 2 Favorite Select
  kind: action
  command: "Z2FAVORITE{n}"
  description: "Z2 favorite 1-4 Mode select."
  params:
    - name: n
      type: string
      description: "1-4"

- id: zone2_favorite_memory
  label: Zone 2 Favorite Memory
  kind: action
  command: "Z2FAVORITE{n} MEMORY"
  description: "Favorite memory. Source examples: Z2FAVORITE1 MEMORY, Z2FAVORITE2 MEMORY, Z2FAVORITE3 MEMORY, Z2FAVORITE4 MEMORY."
  params:
    - name: n
      type: string
      description: "1-4"

- id: zone2_channel_setting
  label: Zone 2 Channel Setting
  kind: action
  command: "Z2CS{mode}"
  description: "ZONE2 Channel setting."
  params:
    - name: mode
      type: string
      description: "ST, MONO"

- id: zone2_channel_volume_up
  label: Zone 2 Channel Volume Up
  kind: action
  command: "Z2CV{channel} UP"
  description: "ZONE2 CHANNEL VOLUME UP."
  params:
    - name: channel
      type: string
      description: "FL, FR"

- id: zone2_channel_volume_down
  label: Zone 2 Channel Volume Down
  kind: action
  command: "Z2CV{channel} DOWN"
  description: "ZONE2 CHANNEL VOLUME DOWN."
  params:
    - name: channel
      type: string
      description: "FL, FR"

- id: zone2_channel_volume_set
  label: Zone 2 Channel Volume Set
  kind: action
  command: "Z2CV{channel} {level}"
  description: "ZONE2 CHANNEL VOLUME direct change."
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: string
      description: "38 to 62 by ASCII , 50=0dB"

- id: zone2_hpf
  label: Zone 2 HPF
  kind: action
  command: "Z2HPF{state}"
  description: "ZONE2 HPF ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: zone2_bass_adjust
  label: Zone 2 Bass Adjust
  kind: action
  command: "Z2PSBAS {value}"
  description: "ZONE2 BASS UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"

- id: zone2_treble_adjust
  label: Zone 2 Treble Adjust
  kind: action
  command: "Z2PSTRE {value}"
  description: "ZONE2 TREBLE UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"

- id: zone2_hdmi_audio_output
  label: Zone 2 HDMI Audio Output
  kind: action
  command: "Z2HDA {mode}"
  description: "ZONE2 HDMI output Through or PCM."
  params:
    - name: mode
      type: string
      description: "THR, PCM"

- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  command: "Z3QUICK{n}"
  description: "Z3 QUICK SELECT 1-5 MODE SELECT."
  params:
    - name: n
      type: string
      description: "1-5"

- id: zone3_quick_memory
  label: Zone 3 Quick Memory
  kind: action
  command: "Z3QUICK{n} MEMORY"
  description: "Z3 QUICK SELECT 1-5 MODE MEMORY."
  params:
    - name: n
      type: string
      description: "1-5"

- id: zone3_favorite_select
  label: Zone 3 Favorite Select
  kind: action
  command: "Z3FAVORITE{n}"
  description: "Z3 favorite 1-4 Mode select."
  params:
    - name: n
      type: string
      description: "1-4"

- id: zone3_favorite_memory
  label: Zone 3 Favorite Memory
  kind: action
  command: "Z3FAVORITE{n} MEMORY"
  description: "Favorite memory. Source examples: Z3FAVORITE1 MEMORY, Z3FAVORITE2 MEMORY, Z3FAVORITE3 MEMORY, Z3FAVORITE4 MEMORY."
  params:
    - name: n
      type: string
      description: "1-4"

- id: zone3_channel_setting
  label: Zone 3 Channel Setting
  kind: action
  command: "Z3CS{mode}"
  description: "ZONE3 Channel setting."
  params:
    - name: mode
      type: string
      description: "ST, MONO"

- id: zone3_channel_volume_up
  label: Zone 3 Channel Volume Up
  kind: action
  command: "Z3CV{channel} UP"
  description: "ZONE3 CHANNEL VOLUME UP."
  params:
    - name: channel
      type: string
      description: "FL, FR"

- id: zone3_channel_volume_down
  label: Zone 3 Channel Volume Down
  kind: action
  command: "Z3CV{channel} DOWN"
  description: "ZONE3 CHANNEL VOLUME DOWN."
  params:
    - name: channel
      type: string
      description: "FL, FR"

- id: zone3_channel_volume_set
  label: Zone 3 Channel Volume Set
  kind: action
  command: "Z3CV{channel} {level}"
  description: "ZONE3 CHANNEL VOLUME direct change."
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: string
      description: "38 to 62 by ASCII , 50=0dB"

- id: zone3_hpf
  label: Zone 3 HPF
  kind: action
  command: "Z3HPF{state}"
  description: "ZONE3 HPF ON/OFF."
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: zone3_bass_adjust
  label: Zone 3 Bass Adjust
  kind: action
  command: "Z3PSBAS {value}"
  description: "ZONE3 BASS UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"

- id: zone3_treble_adjust
  label: Zone 3 Treble Adjust
  kind: action
  command: "Z3PSTRE {value}"
  description: "ZONE3 TREBLE UP/DOWN or direct change."
  params:
    - name: value
      type: string
      description: "UP, DOWN; direct value: 00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"

- id: zone3_sleep_timer
  label: Zone 3 Sleep Timer
  kind: action
  command: "Z3SLP{minutes}"
  description: "ZONE3 SLEEP TIMER setting."
  params:
    - name: minutes
      type: string
      description: "OFF; timer value: 001 to 120 by ASCII , 010=10min"

- id: zone3_auto_standby
  label: Zone 3 Auto Standby
  kind: action
  command: "Z3STBY{setting}"
  description: "ZONE3 Auto Standby setting."
  params:
    - name: setting
      type: string
      description: "2H, 4H, 8H, OFF"

- id: hd_radio_frequency_up
  label: HD Radio Frequency Up
  kind: action
  command: TFHDUP
  description: "HD Channel UP."
  params: []

- id: hd_radio_frequency_down
  label: HD Radio Frequency Down
  kind: action
  command: TFHDDOWN
  description: "HD Channel DOWN."
  params: []

- id: hd_radio_frequency_set
  label: HD Radio Frequency Set
  kind: action
  command: "TFHD{freq}"
  description: "HD frequency direct change."
  params:
    - name: freq
      type: string
      description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.). Frequency range: UNRESOLVED"

- id: hd_radio_multicast_select
  label: HD Radio Multicast Select
  kind: action
  command: "TFHDMC{channel}"
  description: "HD Multi Cast CH Select."
  params:
    - name: channel
      type: string
      description: "1 digit; Multi Cast 1～8, Analog 0"

- id: hd_radio_frequency_multicast_set
  label: HD Radio Frequency Multicast Set
  kind: action
  command: "TFHD{freq}MC{channel}"
  description: "Frequency and HD Multi Cast CH Select. Command only. Source example: TFHD008750MC5."
  params:
    - name: freq
      type: string
      description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.). Frequency range: UNRESOLVED"
    - name: channel
      type: string
      description: "1 digit; Multi Cast 1～8, Analog 0"

- id: hd_radio_preset_up
  label: HD Radio Preset Up
  kind: action
  command: TPHDUP
  description: "HD PRESET CH UP."
  params: []

- id: hd_radio_preset_down
  label: HD Radio Preset Down
  kind: action
  command: TPHDDOWN
  description: "HD PRESET CH DOWN."
  params: []

- id: hd_radio_preset_select
  label: HD Radio Preset Select
  kind: action
  command: "TPHD{num}"
  description: "HD PRESET CH direct change."
  params:
    - name: num
      type: string
      description: "01-56 01=CH01,56=CH56"

- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  command: "TPHDMEM{num}"
  description: "HD PRESET MEMORY. TPHDMEM starts memory selection; TPHDMEM01 directly stores preset 01."
  params:
    - name: num
      type: string
      description: "Optional; 01-56 01=CH01,56=CH56"

- id: hd_radio_band
  label: HD Radio Band Select
  kind: action
  command: "TMHD{band}"
  description: "HD RADIO BAND Select."
  params:
    - name: band
      type: string
      description: "AM, FM"

- id: hd_radio_mode
  label: HD Radio Mode
  kind: action
  command: "TMHD{mode}"
  description: "HD RADIO MODE Select."
  params:
    - name: mode
      type: string
      description: "AUTOHD, AUTO, MANUAL, ANAAUTO, ANAMANU"

- id: network_favorite_memory
  label: Network Favorite Memory
  kind: action
  command: "NSFV MEM"
  description: "Add Favorites folder."
  params: []

- id: channel_level_menu
  label: Channel Level Menu
  kind: action
  command: MNCHL
  description: "Channel Level Adjust menu on/off Control. Command only."
  params: []

- id: insta_prevue
  label: InstaPrevue
  kind: action
  command: "MNPRV {state}"
  description: "InstaPrevue ON/OFF Control."
  params:
    - name: state
      type: string
      description: "ON, OFF"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, STANDBY]
  query: "PW?"
  query_command: "PW?"
  description: "Power state. Response: PWON or PWSTANDBY."

- id: master_volume
  type: string
  query: "MV?"
  query_command: "MV?"
  description: "Master volume level. Response: MV{level}. 2 or 3 char."

- id: mute_state
  type: enum
  values: [ON, OFF]
  query: "MU?"
  query_command: "MU?"
  description: "Mute state. Response: MUON or MUOFF."

- id: input_source
  type: string
  query: "SI?"
  query_command: "SI?"
  description: "Current input source. Response: SI{source}."

- id: main_zone_state
  type: enum
  values: [ON, OFF]
  query: "ZM?"
  query_command: "ZM?"
  description: "Main zone state. Response: ZMON or ZMOFF."

- id: input_mode
  type: string
  query: "SD?"
  query_command: "SD?"
  description: "Input mode. Response: SD{mode}."

- id: digital_input_mode
  type: string
  query: "DC?"
  query_command: "DC?"
  description: "Digital input mode. Response: DC{mode}."

- id: video_select_state
  type: string
  query: "SV?"
  query_command: "SV?"
  description: "Video select state. Returns source and ON/OFF."

- id: sleep_timer_state
  type: string
  query: "SLP?"
  query_command: "SLP?"
  description: "Sleep timer state. Response: SLPOFF or SLP{001-120}."

- id: auto_standby_state
  type: string
  query: "STBY?"
  query_command: "STBY?"
  description: "Auto standby state."

- id: eco_mode_state
  type: string
  query: "ECO?"
  query_command: "ECO?"
  description: "ECO mode state."

- id: surround_mode_state
  type: string
  query: "MS?"
  query_command: "MS?"
  description: "Current surround mode. Response: MS{mode}."

- id: channel_volume
  type: string
  query: "CV?"
  query_command: "CV?"
  description: "Channel volume status. Returns status for configured speakers, terminated by CVEND."

- id: tone_control_state
  type: string
  query: "PSTONE CTRL ?"
  query_command: "PSTONE CTRL ?"
  description: "Tone control state."

- id: bass_level
  type: string
  query: "PSBAS ?"
  query_command: "PSBAS ?"
  description: "Bass level. Response: PSBAS{level}."

- id: treble_level
  type: string
  query: "PSTRE ?"
  query_command: "PSTRE ?"
  description: "Treble level. Response: PSTRE{level}."

- id: subwoofer_level_state
  type: string
  query: "PSSWL ?"
  query_command: "PSSWL ?"
  description: "Subwoofer level adjust state."

- id: cinema_eq_state
  type: string
  query: "PSCINEMA EQ. ?"
  query_command: "PSCINEMA EQ. ?"
  description: "Cinema EQ state."

- id: dynamic_eq_state
  type: string
  query: "PSDYNEQ ?"
  query_command: "PSDYNEQ ?"
  description: "Dynamic EQ state."

- id: dynamic_volume_state
  type: string
  query: "PSDYNVOL ?"
  query_command: "PSDYNVOL ?"
  description: "Dynamic volume state."

- id: multeq_state
  type: string
  query: "PSMULTEQ ?"
  query_command: "PSMULTEQ: ?"
  description: "MultEQ mode state."

- id: drc_state
  type: string
  query: "PSDRC ?"
  query_command: "PSDRC ?"
  description: "Dynamic compression state."

- id: lfe_level_state
  type: string
  query: "PSLFE ?"
  query_command: "PSLFE ?"
  description: "LFE level state."

- id: effect_state
  type: string
  query: "PSEFF ?"
  query_command: "PSEFF ?"
  description: "Effect state and level."

- id: delay_state
  type: string
  query: "PSDEL ?"
  query_command: "PSDEL ?"
  description: "Audio delay state."

- id: graphic_eq_state
  type: string
  query: "PSGEQ ?"
  query_command: "PSGEQ ?"
  description: "Graphic EQ state."

- id: room_size_state
  type: string
  query: "PSRSZ ?"
  query_command: "PSRSZ ?"
  description: "Room size state."

- id: aspect_ratio_state
  type: string
  query: "VSASP ?"
  query_command: "VSASP ?"
  description: "Aspect ratio state."

- id: hdmi_monitor_state
  type: string
  query: "VSMONI ?"
  query_command: "VSMONI ?"
  description: "HDMI monitor state."

- id: resolution_state
  type: string
  query: "VSSC ?"
  query_command: "VSSC ?"
  description: "Resolution state."

- id: hdmi_resolution_state
  type: string
  query: "VSSCH ?"
  query_command: "VSSCH ?"
  description: "HDMI resolution state."

- id: hdmi_audio_state
  type: string
  query: "VSAUDIO ?"
  query_command: "VSAUDIO ?"
  description: "HDMI audio output state."

- id: video_processing_state
  type: string
  query: "VSVPM ?"
  query_command: "VSVPM ?"
  description: "Video processing mode state."

- id: vertical_stretch_state
  type: string
  query: "VSVST ?"
  query_command: "VSVST ?"
  description: "Vertical stretch state."

- id: picture_mode_state
  type: string
  query: "PV?"
  query_command: "PV?"
  description: "Picture mode state."

- id: contrast_state
  type: string
  query: "PVCN ?"
  query_command: "PVCN ?"
  description: "Contrast state."

- id: brightness_state
  type: string
  query: "PVBR ?"
  query_command: "PVBR ?"
  description: "Brightness state."

- id: saturation_state
  type: string
  query: "PVST ?"
  query_command: "PVST ?"
  description: "Saturation state."

- id: hue_state
  type: string
  query: "PVHUE ?"
  query_command: "PVHUE ?"
  description: "Hue state."

- id: dnr_state
  type: string
  query: "PVDNR ?"
  query_command: "PVDNR ?"
  description: "DNR state."

- id: enhancer_state
  type: string
  query: "PVENH ?"
  query_command: "PVENH ?"
  description: "Enhancer state."

- id: zone2_state
  type: enum
  values: [ON, OFF]
  query: "Z2?"
  query_command: "Z2?"
  description: "Zone 2 state."

- id: zone2_mute_state
  type: enum
  values: [ON, OFF]
  query: "Z2MU?"
  query_command: "Z2MU?"
  description: "Zone 2 mute state."

- id: zone2_channel_setting
  type: string
  query: "Z2CS?"
  query_command: "Z2CS?"
  description: "Zone 2 channel setting."

- id: zone2_channel_volume
  type: string
  query: "Z2CV?"
  query_command: "Z2CV?"
  description: "Zone 2 channel volume."

- id: zone2_hpf_state
  type: enum
  values: [ON, OFF]
  query: "Z2HPF?"
  query_command: "Z2HPF?"
  description: "Zone 2 HPF state."

- id: zone2_bass
  type: string
  query: "Z2PSBAS ?"
  query_command: "Z2PSBAS ?"
  description: "Zone 2 bass level."

- id: zone2_treble
  type: string
  query: "Z2PSTRE ?"
  query_command: "Z2PSTRE ?"
  description: "Zone 2 treble level."

- id: zone2_hdmi_audio
  type: string
  query: "Z2HDA?"
  query_command: "Z2HDA?"
  description: "Zone 2 HDMI audio (THR/PCM)."

- id: zone2_sleep_timer
  type: string
  query: "Z2SLP?"
  query_command: "Z2SLP?"
  description: "Zone 2 sleep timer state."

- id: zone2_auto_standby
  type: string
  query: "Z2STBY?"
  query_command: "Z2STBY?"
  description: "Zone 2 auto standby state."

- id: zone3_state
  type: enum
  values: [ON, OFF]
  query: "Z3?"
  query_command: "Z3?"
  description: "Zone 3 state."

- id: zone3_mute_state
  type: enum
  values: [ON, OFF]
  query: "Z3MU?"
  query_command: "Z3MU?"
  description: "Zone 3 mute state."

- id: zone3_channel_setting
  type: string
  query: "Z3CS?"
  query_command: "Z3CS?"
  description: "Zone 3 channel setting."

- id: zone3_channel_volume
  type: string
  query: "Z3CV?"
  query_command: "Z3CV?"
  description: "Zone 3 channel volume."

- id: zone3_hpf_state
  type: enum
  values: [ON, OFF]
  query: "Z3HPF?"
  query_command: "Z3HPF?"
  description: "Zone 3 HPF state."

- id: zone3_sleep_timer
  type: string
  query: "Z3SLP?"
  query_command: "Z3SLP?"
  description: "Zone 3 sleep timer state."

- id: zone3_auto_standby
  type: string
  query: "Z3STBY?"
  query_command: "Z3STBY?"
  description: "Zone 3 auto standby state."

- id: tuner_frequency
  type: string
  query: "TFAN?"
  query_command: "TFAN?"
  description: "Current tuner frequency. Response: TFAN{freq}."

- id: tuner_preset
  type: string
  query: "TPAN?"
  query_command: "TPAN?"
  description: "Current tuner preset."

- id: tuner_band_state
  type: string
  query: "TMAN?"
  query_command: "TMAN?"
  description: "Tuner band and mode state."

- id: hd_radio_state
  type: string
  query: "HD?"
  query_command: "HD?"
  description: "HD Radio full status (band, station name, signal level, artist, title, album, genre, multicast)."

- id: network_onscreen_ascii
  type: string
  query: "NSA"
  query_command: "NSA"
  description: "Onscreen display info (ASCII, up to 9 lines of 96 bytes)."

- id: network_onscreen_utf8
  type: string
  query: "NSE"
  query_command: "NSE"
  description: "Onscreen display info (UTF-8, up to 9 lines of 96 bytes)."

- id: trigger_state
  type: string
  query: "TR?"
  query_command: "TR?"
  description: "Trigger states. Response: TR1 {state}, TR2 {state}."

- id: remote_maintenance_state
  type: enum
  values: [ON, OFF]
  query: "RM ?"
  query_command: "RM ?"
  description: "Remote maintenance state."

- id: dimmer_state
  type: string
  query: "DIM ?"
  query_command: "DIM ?"
  description: "Dimmer state."

- id: upgrade_id
  type: string
  query: "UGIDN"
  query_command: "UGIDN"
  description: "Upgrade ID number (12-digit)."

- id: rec_select_state
  type: string
  query: "SR?"
  query_command: "SR?"
  description: "REC SELECT status. If REC mode is selected, SR status returns; if ZONE2 mode is selected, Z2 status returns."

- id: quick_select_state
  type: string
  query: "MSQUICK ?"
  query_command: "MSQUICK ?"
  description: "Return MSQUICK Status."

- id: dialog_level_state
  type: string
  query: "PSDIL ?"
  query_command: "PSDIL ?"
  description: "Dialog Level Adjust state and level. Source response includes PSDIL ON and PSDIL 50."

- id: surround_parameter_mode_state
  type: string
  query: "PSMODE: ?"
  query_command: "PSMODE: ?"
  description: "Return PSMODE: Status. HEIGHT is documented as EVENT only."

- id: loudness_management_state
  type: string
  query: "PSLOM ?"
  query_command: "PSLOM ?"
  description: "Return PSLOM Status."

- id: front_height_output_state
  type: string
  query: "PSFH: ?"
  query_command: "PSFH: ?"
  description: "Return PSFH: Status."

- id: speaker_output_state
  type: string
  query: "PSSP: ?"
  query_command: "PSSP: ?"
  description: "Return PSSP: Status."

- id: height_gain_state
  type: string
  query: "PSPHG ?"
  query_command: "PSPHG ?"
  description: "Return PSPHG Status."

- id: reference_level_offset_state
  type: string
  query: "PSREFLEV ?"
  query_command: "PSREFLEV ?"
  description: "Return PSREFLEV Status."

- id: audyssey_lfc_state
  type: string
  query: "PSLFC ?"
  query_command: "PSLFC ?"
  description: "Return Audyssey LFC Status."

- id: containment_amount_state
  type: string
  query: "PSCNTAMT ?"
  query_command: "PSCNTAMT ?"
  description: "Containment Amount status."

- id: audyssey_dsx_state
  type: string
  query: "PSDSX ?"
  query_command: "PSDSX ?"
  description: "Return PSDSX Status."

- id: stage_width_state
  type: string
  query: "PSSTW ?"
  query_command: "PSSTW ?"
  description: "Return PSSTW Status."

- id: stage_height_state
  type: string
  query: "PSSTH ?"
  query_command: "PSSTH ?"
  description: "Return PSSTH Status."

- id: bass_sync_state
  type: string
  query: "PSBSC ?"
  query_command: "PSBSC ?"
  description: "Return PSBSC Status."

- id: dialogue_enhancer_state
  type: string
  query: "PSDEH ?"
  query_command: "PSDEH ?"
  description: "Return PSDEH Status."

- id: external_input_lfe_level_state
  type: string
  query: "PSLFL ?"
  query_command: "PSLFL ?"
  description: "Return PSLFL Status."

- id: panorama_state
  type: string
  query: "PSPAN ?"
  query_command: "PSPAN ?"
  description: "Return PSPAN Status."

- id: dimension_state
  type: string
  query: "PSDIM ?"
  query_command: "PSDIM ?"
  description: "Return PSDIM Status."

- id: center_width_state
  type: string
  query: "PSCEN ?"
  query_command: "PSCEN ?"
  description: "Return PSCEN Status."

- id: center_image_state
  type: string
  query: "PSCEI ?"
  query_command: "PSCEI ?"
  description: "Return PSCEI Status."

- id: center_gain_state
  type: string
  query: "PSCEG ?"
  query_command: "PSCEG ?"
  description: "Return PSCEG Status."

- id: center_spread_state
  type: string
  query: "PSCES ?"
  query_command: "PSCES ?"
  description: "Return PSCES Status."

- id: subwoofer_output_state
  type: string
  query: "PSSWR ?"
  query_command: "PSSWR ?"
  description: "Return PSSWR Status."

- id: audio_delay_state
  type: string
  query: "PSDELAY ?"
  query_command: "PSDELAY ?"
  description: "Return PSDELAY Status."

- id: audio_restorer_state
  type: string
  query: "PSRSTR ?"
  query_command: "PSRSTR ?"
  description: "Return PSRSTR Status."

- id: front_speaker_state
  type: string
  query: "PSFRONT?"
  query_command: "PSFRONT?"
  description: "Return PSFRONT Status."

- id: auro_preset_state
  type: string
  query: "PSAUROPR ?"
  query_command: "PSAUROPR ?"
  description: "Return PSAUROPR Status. Auro-3D Upgrade only."

- id: auro_strength_state
  type: string
  query: "PSAUROST ?"
  query_command: "PSAUROST ?"
  description: "Return PSAUROST Status. Auro-3D Upgrade only."

- id: zone2_quick_select_state
  type: string
  query: "Z2QUICK ?"
  query_command: "Z2QUICK ?"
  description: "Return Z2QUICK Status."

- id: zone3_quick_select_state
  type: string
  query: "Z3QUICK ?"
  query_command: "Z3QUICK ?"
  description: "Zone 3 quick select status."

- id: zone3_bass
  type: string
  query: "Z3PSBAS ?"
  query_command: "Z3PSBAS ?"
  description: "Return Z3PSBAS Status."

- id: zone3_treble
  type: string
  query: "Z3PSTRE ?"
  query_command: "Z3PSTRE ?"
  description: "Return Z3PSTRE Status."

- id: tuner_station_name
  type: string
  query: "TFANNAME?"
  query_command: "TFANNAME?"
  description: "Return RDS Station Name (EU,AP Only)."

- id: hd_radio_frequency
  type: string
  query: "TFHD?"
  query_command: "TFHD?"
  description: "Return TFHD Status."

- id: hd_radio_preset
  type: string
  query: "TPHD?"
  query_command: "TPHD?"
  description: "Return TPHD Status."

- id: hd_radio_band_mode_state
  type: string
  query: "TMHD?"
  query_command: "TMHD?"
  description: "Return TMHD Status."

- id: network_preset_names
  type: string
  query: "NSH"
  query_command: "NSH"
  description: "Net Audio Preset Name status（UTF-8）(except Bluetooth, USB/iPod). Returns NSH00 through NSH35, with preset names of 20 digits."

- id: system_menu_state
  type: string
  query: "MNMEN?"
  query_command: "MNMEN?"
  description: "Return MNMEN(Menu) status."

- id: insta_prevue_state
  type: string
  query: "MNPRV?"
  query_command: "MNPRV?"
  description: "Return MNPRV(InstaPrevue) status. MNPRV NG is status only when InstaPrevue is not available."

- id: all_zone_stereo_state
  type: string
  query: "MNZST?"
  query_command: "MNZST?"
  description: "Return MNZST status."
```

## Variables
```yaml
- id: master_volume_level
  type: string
  description: "Master volume 00-98 (80=0dB, 00=MIN). 3-char for 0.5dB step."
  set_command: "MV{value}"

- id: channel_volume_level
  type: string
  description: "Per-channel volume 38-62 (50=0dB). SW: 00,38-62."
  set_command: "CV{channel} {value}"

- id: zone2_volume_level
  type: string
  description: "Zone 2 volume 00-98 (80=0dB, 00=MIN)."
  set_command: "Z2{value}"

- id: zone3_volume_level
  type: string
  description: "Zone 3 volume 00-98 (80=0dB, 00=MIN)."
  set_command: "Z3{value}"

- id: bass_level
  type: string
  description: "Bass 00-99 (50=0dB). AVR range: 44-56."
  set_command: "PSBAS {value}"

- id: treble_level
  type: string
  description: "Treble 00-99 (50=0dB). AVR range: 44-56."
  set_command: "PSTRE {value}"

- id: contrast_level
  type: string
  description: "Contrast 000-100 (050=0)."
  set_command: "PVCN {value}"

- id: brightness_level
  type: string
  description: "Brightness 000-100 (050=0)."
  set_command: "PVBR {value}"

- id: saturation_level
  type: string
  description: "Saturation 000-100 (050=0)."
  set_command: "PVST {value}"

- id: hue_level
  type: string
  description: "Hue 44-56 (50=0)."
  set_command: "PVHUE {value}"
```

## Events
```yaml
- id: state_change_event
  description: >-
    Unsolicited EVENT sent when system state changes (front panel operation, etc.).
    Same format as COMMAND. Sent within 5 seconds of state change.
    Example: volume change returns MV{level}, input change returns SI{source},
    surround mode change returns MS{mode}, channel volume returns CV{channel} {level}.

- id: channel_volume_on_input_change
  description: >-
    When input source changes, channel volume and surround mode events return
    if they differ from previous input. No event if values are the same.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Wait 1 second after PWON before sending next command."
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond command timing
```

## Notes
- All commands are ASCII, terminated with CR (0x0D). Send commands at 50ms minimum intervals.
- Maximum communication data length is 135 bytes.
- Volume encoding: 2-char for whole dB (80=0dB, 00=MIN), 3-char for 0.5dB steps (805=+0.5dB, 795=-0.5dB).
- Response to query commands (`?`) sent within 200ms.
- Events on state change sent within 5 seconds.
- Commands receivable during EVENT transmission.
- When surround mode is changed, the current (pre-change) mode is returned before the new mode.
- CV? returns only speakers present in current speaker configuration, terminated by CVEND.
- Source document covers generic Denon AVR protocol Ver.06 — some commands may not apply to S-302 specifically.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: S-302-specific command subset not explicitly delineated from generic AVR protocol -->
<!-- UNRESOLVED: protocol version number stated as Ver.06 but no version compatibility range -->
<!-- UNRESOLVED: HD Radio commands may be North America model only -->
<!-- UNRESOLVED: Auro-3D commands require Auro-3D Upgrade -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T21:15:28.180Z
last_checked_at: 2026-10-07T22:06:06.827Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:06:06.827Z
matched_actions: 270
action_count: 270
confidence: medium
summary: "All 270 action units match source tokens and transport values are stated; coverage is near-complete, though the MS surround-mode enum is only partly listed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic Denon AVR control protocol doc (Ver.06) — S-302-specific command subset not explicitly delineated"
- "no explicit multi-step macros in source"
- "no explicit safety warnings or interlock procedures beyond command timing"
- "firmware version compatibility not stated"
- "S-302-specific command subset not explicitly delineated from generic AVR protocol"
- "protocol version number stated as Ver.06 but no version compatibility range"
- "HD Radio commands may be North America model only"
- "Auro-3D commands require Auro-3D Upgrade"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
