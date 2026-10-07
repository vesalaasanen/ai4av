---
spec_id: admin/marantz-sr6011-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR6011 Series Control Spec"
manufacturer: Marantz
model_family: "SR6011 Series"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "SR6011 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:24:45.188Z
last_checked_at: 2026-10-01T10:30:32.720Z
generated_at: 2026-10-01T10:30:32.720Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated"
  - "exact model variants covered by this protocol version not specified beyond \"SR6011 Series\""
  - "no distinct settable parameters beyond Actions in source; volume/input/mode changes are all action-driven"
  - "no multi-step sequences explicitly described in source beyond note J (1s delay after PWON)"
  - "source contains no explicit safety warnings or interlock procedures"
  - "exact set of surround mode variants available for SR6011 vs other models not fully disambiguated — source shows model-specific columns but SR6011 column not labeled"
  - "NS onscreen display data byte encoding details (flag byte bit meanings) not fully documented for programmatic parsing"
verification:
  verdict: verified
  checked_at: 2026-10-01T10:30:32.720Z
  matched_actions: 164
  action_count: 164
  confidence: medium
  summary: "All 164 spec actions have literal command matches in source's ASCII command table; transport values (TCP 23, 9600 8N1) confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR6011 Series Control Spec

## Summary
The Marantz SR6011 is an AV receiver supporting both RS-232C serial and TCP/IP (Telnet) control. This spec covers the ASCII command protocol (Ver.06) for power, volume, input selection, surround modes, zone 2/3 control, tuner, and system settings. Commands are 2-character ASCII codes with optional parameters terminated by CR (0x0D).

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact model variants covered by this protocol version not specified beyond "SR6011 Series" -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable    # inferred from PW ON/STANDBY commands
- routable     # inferred from SI input selection commands
- queryable    # inferred from ? request commands throughout
- levelable    # inferred from MV/CV volume control commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: PWON
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: PWSTANDBY
  params: []

- id: master_volume_up
  label: Master Volume Up
  kind: action
  command: MVUP
  params: []

- id: master_volume_down
  label: Master Volume Down
  kind: action
  command: MVDOWN
  params: []

- id: master_volume_set
  label: Set Master Volume
  kind: action
  command: MV**
  description: "Direct volume set. 00=---(MIN), 80=0dB, 98=+18dB. 0.5dB steps use 3 chars e.g. 805=+0.5dB, 795=-0.5dB"
  params:
    - name: level
      type: string
      description: "Two-char (1dB step) or three-char (0.5dB step) ASCII value. 00=MIN, 80=0dB, 98=+18dB"

- id: mute_on
  label: Mute On
  kind: action
  command: MUON
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: MUOFF
  params: []

- id: select_input
  label: Select Input Source
  kind: action
  command: SI
  description: "Select input source"
  params:
    - name: source
      type: enum
      values:
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - HDRADIO
        - NET
        - PANDORA
        - SIRIUSXM
        - SPOTIFY
        - LASTFM
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - BT
        - USB/IPOD
        - USB
        - IPD
        - IRP
        - FVP

- id: main_zone_on
  label: Main Zone On
  kind: action
  command: ZMON
  params: []

- id: main_zone_off
  label: Main Zone Off
  kind: action
  command: ZMOFF
  params: []

- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  command: CV<channel> UP
  description: "Increase channel volume. Range 38-62, 50=0dB"
  params:
    - name: channel
      type: enum
      values:
        - FL
        - FR
        - C
        - SW
        - SW2
        - SL
        - SR
        - SBL
        - SBR
        - SB
        - FHL
        - FHR
        - FWL
        - FWR
        - TFL
        - TFR
        - TML
        - TMR
        - TRL
        - TRR
        - RHL
        - RHR
        - FDL
        - FDR
        - SDL
        - SDR
        - BDL
        - BDR
        - SHL
        - SHR
        - TS

- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  command: CV<channel> DOWN
  description: "Decrease channel volume. Range 38-62, 50=0dB"
  params:
    - name: channel
      type: enum
      values:
        - FL
        - FR
        - C
        - SW
        - SW2
        - SL
        - SR
        - SBL
        - SBR
        - SB
        - FHL
        - FHR
        - FWL
        - FWR
        - TFL
        - TFR
        - TML
        - TMR
        - TRL
        - TRR
        - RHL
        - RHR
        - FDL
        - FDR
        - SDL
        - SDR
        - BDL
        - BDR
        - SHL
        - SHR
        - TS

- id: channel_volume_set
  label: Set Channel Volume
  kind: action
  command: CV<channel> **
  description: "Direct channel volume set. Range 38-62, 50=0dB"
  params:
    - name: channel
      type: enum
      values:
        - FL
        - FR
        - C
        - SW
        - SW2
        - SL
        - SR
        - SBL
        - SBR
        - SB
        - FHL
        - FHR
        - FWL
        - FWR
        - TFL
        - TFR
        - TML
        - TMR
        - TRL
        - TRR
        - RHL
        - RHR
        - FDL
        - FDR
        - SDL
        - SDR
        - BDL
        - BDR
        - SHL
        - SHR
        - TS
    - name: level
      type: string
      description: "Two-char ASCII, 38 to 62, 50=0dB"

- id: channel_volume_reset
  label: Reset All Channel Levels
  kind: action
  command: CVZRL
  params: []

- id: input_mode_set
  label: Set Input Mode
  kind: action
  command: SD
  params:
    - name: mode
      type: enum
      values:
        - AUTO
        - HDMI
        - DIGITAL
        - ANALOG
        - EXT.IN
        - 7.1IN
        - NO

- id: digital_input_set
  label: Set Digital Input Mode
  kind: action
  command: DC
  params:
    - name: mode
      type: enum
      values:
        - AUTO
        - PCM
        - DTS

- id: video_select
  label: Video Select
  kind: action
  command: SV
  description: "Set video select source or toggle on/off"
  params:
    - name: source
      type: enum
      values:
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - CD
        - SOURCE
        - ON
        - OFF

- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  command: SLP
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120 by ASCII, 010=10min"

- id: auto_standby_set
  label: Set Auto Standby
  kind: action
  command: STBY
  params:
    - name: timeout
      type: enum
      values:
        - 15M
        - 30M
        - 60M
        - OFF

- id: eco_mode_set
  label: Set ECO Mode
  kind: action
  command: ECO
  params:
    - name: mode
      type: enum
      values:
        - ON
        - AUTO
        - OFF

- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  command: MS
  description: "Select surround mode. Many modes available depending on input signal and configuration."
  params:
    - name: mode
      type: enum
      values:
        - MOVIE
        - MUSIC
        - GAME
        - DIRECT
        - PURE DIRECT
        - STEREO
        - AUTO
        - DOLBY DIGITAL
        - DTS SURROUND
        - AURO3D
        - AURO2DSURR
        - MCH STEREO
        - WIDE SCREEN
        - SUPER STADIUM
        - ROCK ARENA
        - JAZZ CLUB
        - CLASSIC CONCERT
        - MONO MOVIE
        - MATRIX
        - VIDEO GAME
        - VIRTUAL
        - LEFT
        - RIGHT
        - QUICK1
        - QUICK2
        - QUICK3
        - QUICK4
        - QUICK5

- id: surround_mode_memory
  label: Surround Mode Quick Memory
  kind: action
  command: MSQUICK* MEMORY
  params:
    - name: slot
      type: enum
      values:
        - QUICK1
        - QUICK2
        - QUICK3
        - QUICK4
        - QUICK5

- id: video_aspect_set
  label: Set Video Aspect Ratio
  kind: action
  command: VS
  params:
    - name: aspect
      type: enum
      values:
        - ASPNRM
        - ASPFUL

- id: video_monitor_set
  label: Set HDMI Monitor Out
  kind: action
  command: VS
  params:
    - name: output
      type: enum
      values:
        - MONIAUTO
        - MONI1
        - MONI2

- id: video_resolution_set
  kind: action
  command: VS
  description: "Set output resolution"
  params:
    - name: resolution
      type: enum
      values:
        - SC48P
        - SC10I
        - SC72P
        - SC10P
        - SC10P24
        - SC4K
        - SC4KF
        - SCAUTO

- id: video_resolution_hdmi_set
  kind: action
  command: VS
  description: "Set HDMI output resolution"
  params:
    - name: resolution
      type: enum
      values:
        - SCH48P
        - SCH10I
        - SCH72P
        - SCH10P
        - SCH10P24
        - SCH4K
        - SCH4KF
        - SCHAUTO

- id: hdmi_audio_output_set
  label: Set HDMI Audio Output
  kind: action
  command: VS
  params:
    - name: output
      type: enum
      values:
        - AUDIO AMP
        - AUDIO TV

- id: video_processing_mode_set
  label: Set Video Processing Mode
  kind: action
  command: VS
  params:
    - name: mode
      type: enum
      values:
        - VPMAUTO
        - VPMGAME
        - VPMMOVI

- id: vertical_stretch_set
  label: Set Vertical Stretch
  kind: action
  command: VS
  params:
    - name: state
      type: enum
      values:
        - VST ON
        - VST OFF

- id: tone_control_set
  label: Set Tone Control
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - TONE CTRL ON
        - TONE CTRL OFF

- id: bass_adjust
  label: Bass Adjust
  kind: action
  command: PS
  description: "Bass UP/DOWN or direct set. Range 00-99, 50=0dB. AVR range -6 to +6 (44-56)"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or two-char direct value"

- id: treble_adjust
  label: Treble Adjust
  kind: action
  command: PS
  description: "Treble UP/DOWN or direct set. Range 00-99, 50=0dB. AVR range -6 to +6 (44-56)"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or two-char direct value"

- id: dialog_level_adjust
  label: Dialog Level Adjust
  kind: action
  command: PS
  description: "Dialog level on/off and UP/DOWN. Range 38-62, 50=0dB"
  params:
    - name: value
      type: enum
      values:
        - DIL ON
        - DIL OFF
        - DIL UP
        - DIL DOWN

- id: subwoofer_level_adjust
  label: Subwoofer Level Adjust
  kind: action
  command: PS
  description: "Subwoofer(1) level on/off and UP/DOWN. Range 00,38-62, 50=0dB"
  params:
    - name: value
      type: enum
      values:
        - SWL ON
        - SWL OFF
        - SWL UP
        - SWL DOWN

- id: subwoofer2_level_adjust
  label: Subwoofer 2 Level Adjust
  kind: action
  command: PS
  description: "Subwoofer(2) level UP/DOWN. Range 00,38-62, 50=0dB"
  params:
    - name: value
      type: enum
      values:
        - SWL2 UP
        - SWL2 DOWN

- id: cinema_eq_set
  label: Set Cinema EQ
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - CINEMA EQ.ON
        - CINEMA EQ.OFF

- id: pl_mode_set
  label: Set PL2/PL2x/NEO:6 Mode
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - MODE:MUSIC
        - MODE:CINEMA
        - MODE:GAME
        - MODE:PRO LOGIC

- id: loudness_management_set
  label: Set Loudness Management
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - PSLOM ON
        - PSLOM OFF

- id: speaker_output_set
  label: Set Speaker Output Config
  kind: action
  command: PS
  params:
    - name: config
      type: enum
      values:
        - SP:FW
        - SP:FH
        - SP:SB
        - SP:HW
        - SP:BH
        - SP:BW
        - SP:FL
        - SP:HF
        - SP:FR

- id: multeq_set
  label: Set MultEQ Mode
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - MULTEQ:AUDYSSEY
        - MULTEQ:BYP.LR
        - MULTEQ:FLAT
        - MULTEQ:OFF

- id: dynamic_eq_set
  label: Set Dynamic EQ
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - DYNEQ ON
        - DYNEQ OFF

- id: reference_level_offset_set
  label: Set Reference Level Offset
  kind: action
  command: PS
  params:
    - name: offset
      type: enum
      values:
        - REFLEV 0
        - REFLEV 5
        - REFLEV 10
        - REFLEV 15

- id: dynamic_volume_set
  label: Set Dynamic Volume
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - DYNVOL HEV
        - DYNVOL MED
        - DYNVOL LIT
        - DYNVOL OFF

- id: lfc_set
  label: Set Audyssey LFC
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - LFC ON
        - LFC OFF

- id: containment_amount_adjust
  label: Containment Amount Adjust
  kind: action
  command: PS
  description: "UP/DOWN or direct set. Range 00-99, AVR range 1-7 (01-07)"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or two-char direct value"

- id: graphic_eq_set
  label: Set Graphic EQ
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - GEQ ON
        - GEQ OFF

- id: dynamic_compression_set
  label: Set Dynamic Compression
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - DRC AUTO
        - DRC LOW
        - DRC MID
        - DRC HI
        - DRC OFF

- id: bass_sync_adjust
  label: Bass Sync Adjust
  kind: action
  command: PS
  description: "UP/DOWN or direct set. Range 00-99, 00=0. AVR range 0-16"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or two-char direct value"

- id: dialogue_enhancer_set
  label: Set Dialogue Enhancer
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - DEH OFF
        - DEH LOW
        - DEH MED
        - DEH HIGH

- id: lfe_level_adjust
  label: LFE Level Adjust
  kind: action
  command: PS
  description: "LFE UP/DOWN or direct. Range 00-99, 00=0dB, 10=-10dB. AVR range 0 to -10"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or two-char direct value"

- id: lfe_level_ext_in_set
  label: Set LFE Level (EXT.IN/7.1CH IN)
  kind: action
  command: PS
  params:
    - name: value
      type: enum
      values:
        - LFL 00
        - LFL 05
        - LFL 10
        - LFL 15

- id: effect_level_set
  label: Effect On/Off and Level
  kind: action
  command: PS
  description: "Effect ON/OFF or level UP/DOWN. Range 00-99, 00=0dB, 10=10dB. AVR range 1-15"
  params:
    - name: value
      type: enum
      values:
        - EFF ON
        - EFF OFF
        - EFF UP
        - EFF DOWN

- id: delay_adjust
  label: Delay Adjust
  kind: action
  command: PS
  description: "Delay UP/DOWN or direct set. Range 000-999, 000=0ms, 300=300ms. AVR range 0-300. 0-60ms=3ms/step, over 60ms=10ms/step"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or three-char direct value"

- id: audio_delay_adjust
  label: Audio Delay Adjust
  kind: action
  command: PS
  description: "Audio delay UP/DOWN or direct set. Range 000-999, 000=0ms, 200=200ms. AVR range 0-200"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or three-char direct value"

- id: room_size_set
  label: Set Room Size
  kind: action
  command: PS
  params:
    - name: size
      type: enum
      values:
        - RSZ S
        - RSZ MS
        - RSZ M
        - RSZ ML
        - RSZ L

- id: restorer_set
  label: Set Audio Restorer
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - RSTR OFF
        - RSTR LOW
        - RSTR MED
        - RSTR HI

- id: front_speaker_set
  label: Set Front Speaker
  kind: action
  command: PS
  params:
    - name: config
      type: enum
      values:
        - FRONT SPA
        - FRONT SPB
        - FRONT A+B

- id: subwoofer_toggle
  label: Subwoofer On/Off (Direct/Stereo 2ch)
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - SWR ON
        - SWR OFF

- id: center_spread_set
  label: Set Center Spread
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - CES ON
        - CES OFF

- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  command: PV
  params:
    - name: mode
      type: enum
      values:
        - OFF
        - STD
        - MOV
        - VVD
        - STM
        - CTM
        - DAY
        - NGT

- id: picture_contrast_adjust
  label: Adjust Picture Contrast
  kind: action
  command: PV
  description: "UP/DOWN or direct set. Range 000-100, 050=0. AVR range -50 to +50"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or three-char direct value"

- id: picture_brightness_adjust
  label: Adjust Picture Brightness
  kind: action
  command: PV
  description: "UP/DOWN or direct set. Range 000-100, 050=0. AVR range -50 to +50"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or three-char direct value"

- id: picture_saturation_adjust
  label: Adjust Picture Saturation
  kind: action
  command: PV
  description: "UP/DOWN or direct set. Range 000-100, 050=0. AVR range -50 to +50"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or three-char direct value"

- id: picture_hue_adjust
  label: Adjust Picture Hue
  kind: action
  command: PV
  description: "UP/DOWN or direct set. Range 44-56, 50=0. AVR range -6 to +6"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or two-char direct value"

- id: picture_dnr_set
  label: Set Picture DNR
  kind: action
  command: PV
  params:
    - name: mode
      type: enum
      values:
        - DNR OFF
        - DNR LOW
        - DNR MID
        - DNR HI

- id: picture_enhancer_adjust
  label: Adjust Picture Enhancer
  kind: action
  command: PV
  description: "UP/DOWN or direct set. Range 00-12, 00=0. AVR range 0-12"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or direct value"

- id: zone2_source_select
  label: Zone 2 Source Select
  kind: action
  command: Z2
  description: "Select Zone 2 input source"
  params:
    - name: source
      type: enum
      values:
        - SOURCE
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - NET
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - BT
        - USB/IPOD
        - USB
        - IPD
        - IRP
        - FVP

- id: zone2_on
  label: Zone 2 On
  kind: action
  command: Z2ON
  params: []

- id: zone2_off
  label: Zone 2 Off
  kind: action
  command: Z2OFF
  params: []

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: Z2UP
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: Z2DOWN
  params: []

- id: zone2_volume_set
  label: Zone 2 Volume Set
  kind: action
  command: Z2**
  description: "Direct volume set. 00=---(MIN), 80=0dB. Same scheme as MV."
  params:
    - name: level
      type: string
      description: "Two-char ASCII value"

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: Z2MUON
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: Z2MUOFF
  params: []

- id: zone2_channel_set
  label: Zone 2 Channel Setting
  kind: action
  command: Z2CS
  params:
    - name: mode
      type: enum
      values:
        - ST
        - MONO

- id: zone2_channel_volume_up
  label: Zone 2 Channel Volume Up
  kind: action
  command: Z2CV
  params:
    - name: channel
      type: enum
      values:
        - FL
        - FR

- id: zone2_channel_volume_down
  label: Zone 2 Channel Volume Down
  kind: action
  command: Z2CV
  params:
    - name: channel
      type: enum
      values:
        - FL
        - FR

- id: zone2_hpf_set
  label: Zone 2 HPF On/Off
  kind: action
  command: Z2HPF
  params:
    - name: state
      type: enum
      values:
        - ON
        - OFF

- id: zone2_bass_adjust
  label: Zone 2 Bass Adjust
  kind: action
  command: Z2PS
  description: "UP/DOWN or direct set. Range 00-99, 50=0dB"
  params:
    - name: value
      type: string
      description: "BAS UP, BAS DOWN, or two-char direct value"

- id: zone2_treble_adjust
  label: Zone 2 Treble Adjust
  kind: action
  command: Z2PS
  description: "UP/DOWN or direct set. Range 00-99, 50=0dB"
  params:
    - name: value
      type: string
      description: "TRE UP, TRE DOWN, or two-char direct value"

- id: zone2_hdmi_audio_set
  label: Zone 2 HDMI Audio Output
  kind: action
  command: Z2HDA
  params:
    - name: mode
      type: enum
      values:
        - THR
        - PCM

- id: zone2_sleep_timer_set
  label: Zone 2 Sleep Timer Set
  kind: action
  command: Z2SLP
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120 by ASCII"

- id: zone2_auto_standby_set
  label: Zone 2 Auto Standby Set
  kind: action
  command: Z2STBY
  params:
    - name: timeout
      type: enum
      values:
        - 2H
        - 4H
        - 8H
        - OFF

- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  command: Z2QUICK*
  params:
    - name: slot
      type: enum
      values:
        - QUICK1
        - QUICK2
        - QUICK3
        - QUICK4
        - QUICK5

- id: zone2_quick_memory
  label: Zone 2 Quick Memory
  kind: action
  command: Z2QUICK* MEMORY
  params:
    - name: slot
      type: enum
      values:
        - QUICK1
        - QUICK2
        - QUICK3
        - QUICK4
        - QUICK5

- id: zone3_source_select
  label: Zone 3 Source Select
  kind: action
  command: Z3
  description: "Select Zone 3 input source"
  params:
    - name: source
      type: enum
      values:
        - SOURCE
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - NET
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - BT
        - USB/IPOD
        - USB
        - IPD
        - IRP
        - FVP

- id: zone3_on
  label: Zone 3 On
  kind: action
  command: Z3ON
  params: []

- id: zone3_off
  label: Zone 3 Off
  kind: action
  command: Z3OFF
  params: []

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: Z3UP
  params: []

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: Z3DOWN
  params: []

- id: zone3_volume_set
  label: Zone 3 Volume Set
  kind: action
  command: Z3**
  description: "Direct volume set. 00=---(MIN), 80=0dB. Same scheme as MV."
  params:
    - name: level
      type: string
      description: "Two-char ASCII value"

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: Z3MUON
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: Z3MUOFF
  params: []

- id: zone3_channel_set
  label: Zone 3 Channel Setting
  kind: action
  command: Z3CS
  params:
    - name: mode
      type: enum
      values:
        - ST
        - MONO

- id: zone3_channel_volume_up
  label: Zone 3 Channel Volume Up
  kind: action
  command: Z3CV
  params:
    - name: channel
      type: enum
      values:
        - FL
        - FR

- id: zone3_channel_volume_down
  label: Zone 3 Channel Volume Down
  kind: action
  command: Z3CV
  params:
    - name: channel
      type: enum
      values:
        - FL
        - FR

- id: zone3_hpf_set
  label: Zone 3 HPF On/Off
  kind: action
  command: Z3HPF
  params:
    - name: state
      type: enum
      values:
        - ON
        - OFF

- id: zone3_bass_adjust
  label: Zone 3 Bass Adjust
  kind: action
  command: Z3PS
  description: "UP/DOWN or direct set. Range 00-99, 50=0dB"
  params:
    - name: value
      type: string
      description: "BAS UP, BAS DOWN, or two-char direct value"

- id: zone3_treble_adjust
  label: Zone 3 Treble Adjust
  kind: action
  command: Z3PS
  description: "UP/DOWN or direct set. Range 00-99, 50=0dB"
  params:
    - name: value
      type: string
      description: "TRE UP, TRE DOWN, or two-char direct value"

- id: zone3_sleep_timer_set
  label: Zone 3 Sleep Timer Set
  kind: action
  command: Z3SLP
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120 by ASCII"

- id: zone3_auto_standby_set
  label: Zone 3 Auto Standby Set
  kind: action
  command: Z3STBY
  params:
    - name: timeout
      type: enum
      values:
        - 2H
        - 4H
        - 8H
        - OFF

- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  command: Z3QUICK*
  params:
    - name: slot
      type: enum
      values:
        - QUICK1
        - QUICK2
        - QUICK3
        - QUICK4
        - QUICK5

- id: zone3_quick_memory
  label: Zone 3 Quick Memory
  kind: action
  command: Z3QUICK* MEMORY
  params:
    - name: slot
      type: enum
      values:
        - QUICK1
        - QUICK2
        - QUICK3
        - QUICK4
        - QUICK5

- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  command: TFANUP
  params: []

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  command: TFANDOWN
  params: []

- id: tuner_frequency_set
  label: Tuner Frequency Direct Set
  kind: action
  command: TFAN******
  description: "6 digits. >050000 is AM (kHz), <050000 is FM (MHz)"
  params:
    - name: frequency
      type: string
      description: "6-digit ASCII frequency value"

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  command: TPANUP
  params: []

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  command: TPANDOWN
  params: []

- id: tuner_preset_select
  label: Tuner Preset Select
  kind: action
  command: TPAN**
  params:
    - name: preset
      type: string
      description: "01-56 by ASCII"

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: TPANMEM
  params: []

- id: tuner_preset_memory_num
  label: Tuner Preset Memory (Numbered)
  kind: action
  command: TPANMEM**
  params:
    - name: preset
      type: string
      description: "01-56 by ASCII"

- id: tuner_band_set
  label: Tuner Band Set
  kind: action
  command: TM
  params:
    - name: band
      type: enum
      values:
        - ANAM
        - ANFM

- id: tuner_mode_set
  label: Tuner Mode Set
  kind: action
  command: TM
  params:
    - name: mode
      type: enum
      values:
        - ANAUTO
        - ANMANUAL

- id: net_usb_cursor_up
  label: Net/USB Cursor Up
  kind: action
  command: NS90
  params: []

- id: net_usb_cursor_down
  label: Net/USB Cursor Down
  kind: action
  command: NS91
  params: []

- id: net_usb_cursor_left
  label: Net/USB Cursor Left
  kind: action
  command: NS92
  params: []

- id: net_usb_cursor_right
  label: Net/USB Cursor Right
  kind: action
  command: NS93
  params: []

- id: net_usb_enter
  label: Net/USB Enter
  kind: action
  command: NS94
  params: []

- id: net_usb_play
  label: Net/USB Play
  kind: action
  command: NS9A
  params: []

- id: net_usb_pause
  label: Net/USB Pause
  kind: action
  command: NS9B
  params: []

- id: net_usb_stop
  label: Net/USB Stop
  kind: action
  command: NS9C
  params: []

- id: net_usb_skip_plus
  label: Net/USB Skip Forward
  kind: action
  command: NS9D
  params: []

- id: net_usb_skip_minus
  label: Net/USB Skip Backward
  kind: action
  command: NS9E
  params: []

- id: net_usb_search_plus
  label: Net/USB Search Forward
  kind: action
  command: NS9F
  params: []

- id: net_usb_search_minus
  label: Net/USB Search Backward
  kind: action
  command: NS9G
  params: []

- id: net_usb_repeat_one
  label: Net/USB Repeat One
  kind: action
  command: NS9H
  params: []

- id: net_usb_repeat_all
  label: Net/USB Repeat All
  kind: action
  command: NS9I
  params: []

- id: net_usb_repeat_off
  label: Net/USB Repeat Off
  kind: action
  command: NS9J
  params: []

- id: net_usb_random_on
  label: Net/USB Random On
  kind: action
  command: NS9K
  params: []

- id: net_usb_random_off
  label: Net/USB Random Off
  kind: action
  command: NS9M
  params: []

- id: net_usb_page_next
  label: Net/USB Page Next
  kind: action
  command: NS9X
  params: []

- id: net_usb_page_prev
  label: Net/USB Page Previous
  kind: action
  command: NS9Y
  params: []

- id: net_usb_search_stop
  label: Net/USB Search Stop
  kind: action
  command: NS9Z
  params: []

- id: net_usb_repeat_toggle
  label: Net/USB Repeat Toggle
  kind: action
  command: NSRPT
  params: []

- id: net_usb_random_toggle
  label: Net/USB Random Toggle
  kind: action
  command: NSRND
  params: []

- id: net_usb_preset_call
  label: Net/USB Preset Call
  kind: action
  command: NSB**
  params:
    - name: preset
      type: string
      description: "00-35 by ASCII (2014 AVR)"

- id: net_usb_preset_memory
  label: Net/USB Preset Memory
  kind: action
  command: NSC**
  params:
    - name: preset
      type: string
      description: "00-35 by ASCII (2014 AVR)"

- id: net_usb_favorites_add
  label: Net/USB Add Favorites Folder
  kind: action
  command: NSFV MEM
  params: []

- id: menu_cursor_up
  label: Menu Cursor Up
  kind: action
  command: MNCUP
  params: []

- id: menu_cursor_down
  label: Menu Cursor Down
  kind: action
  command: MNCDN
  params: []

- id: menu_cursor_left
  label: Menu Cursor Left
  kind: action
  command: MNCLT
  params: []

- id: menu_cursor_right
  label: Menu Cursor Right
  kind: action
  command: MNCRT
  params: []

- id: menu_enter
  label: Menu Enter
  kind: action
  command: MNENT
  params: []

- id: menu_return
  label: Menu Return
  kind: action
  command: MNRTN
  params: []

- id: menu_option
  label: Menu Option
  kind: action
  command: MNOPT
  params: []

- id: menu_info
  label: Menu Info
  kind: action
  command: MNINF
  params: []

- id: menu_channel_level
  label: Channel Level Adjust Menu
  kind: action
  command: MNCHL
  params: []

- id: setup_menu_on
  label: Setup Menu On
  kind: action
  command: MNMEN ON
  params: []

- id: setup_menu_off
  label: Setup Menu Off
  kind: action
  command: MNMEN OFF
  params: []

- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  command: MNZST ON
  params: []

- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  command: MNZST OFF
  params: []

- id: remote_lock_on
  label: Remote Lock On
  kind: action
  command: SYREMOTE LOCK ON
  params: []

- id: remote_lock_off
  label: Remote Lock Off
  kind: action
  command: SYREMOTE LOCK OFF
  params: []

- id: panel_lock_on
  label: Panel Lock On
  kind: action
  command: SYPANEL LOCK ON
  description: "Panel buttons locked except Master Volume"
  params: []

- id: panel_vol_lock_on
  label: Panel and Volume Lock On
  kind: action
  command: SYPANEL+V LOCK ON
  params: []

- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  command: SYPANEL LOCK OFF
  params: []

- id: trigger1_on
  label: Trigger 1 On
  kind: action
  command: TR1 ON
  params: []

- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  command: TR1 OFF
  params: []

- id: trigger2_on
  label: Trigger 2 On
  kind: action
  command: TR2 ON
  params: []

- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  command: TR2 OFF
  params: []

- id: dimmer_set
  label: Set Dimmer
  kind: action
  command: DIM
  params:
    - name: level
      type: enum
      values:
        - BRI
        - DIM
        - DAR
        - OFF
        - SEL

- id: rec_select_set
  label: REC Select Set
  kind: action
  command: SR
  description: "Set REC SELECT mode and source. Parameter names same as SI command."
  params:
    - name: source
      type: enum
      values:
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - AUX1
        - AUX2
        - USB
        - USB/IPOD
        - SOURCE

- id: favorite_select
  label: Favorite Select (1-4)
  kind: action
  command: ZM
  params:
    - name: slot
      type: enum
      values:
        - FAVORITE1
        - FAVORITE2
        - FAVORITE3
        - FAVORITE4

- id: favorite_memory
  label: Favorite Memory (1-4)
  kind: action
  command: ZMFAVORITE* MEMORY
  params:
    - name: slot
      type: enum
      values:
        - FAVORITE1
        - FAVORITE2
        - FAVORITE3
        - FAVORITE4
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  command: PW?
  response: PWON|PWSTANDBY
  type: enum
  values:
    - ON
    - STANDBY

- id: master_volume
  label: Master Volume Level
  command: MV?
  response: MV** or MV***
  type: string
  description: "Two-char (1dB step) or three-char (0.5dB step). 00=---(MIN), 80=0dB, 98=+18dB"

- id: mute_state
  label: Mute State
  command: MU?
  response: MUON|MUOFF
  type: enum
  values:
    - ON
    - OFF

- id: input_source
  label: Current Input Source
  command: SI?
  response: SI***
  type: string
  description: "Returns current input source name"

- id: main_zone_state
  label: Main Zone State
  command: ZM?
  response: ZMON|ZMOFF
  type: enum
  values:
    - ON
    - OFF

- id: surround_mode
  label: Current Surround Mode
  command: MS?
  response: MS***
  type: string
  description: "Returns current surround mode name"

- id: input_mode
  label: Current Input Mode
  command: SD?
  response: SD***
  type: string

- id: digital_input_mode
  label: Current Digital Input Mode
  command: DC?
  response: DCAUTO|DCPCM|DCDTS
  type: string

- id: video_select_state
  label: Video Select State
  command: SV?
  response: SV*** SVON|SVOFF
  type: string

- id: sleep_timer
  label: Sleep Timer
  command: SLP?
  response: SLP***|SLPOFF
  type: string

- id: auto_standby
  label: Auto Standby
  command: STBY?
  response: STBY***|STBYOFF
  type: string

- id: eco_mode
  label: ECO Mode
  command: ECO?
  response: ECO***|ECOOFF
  type: string

- id: channel_volume
  label: Channel Volume Status
  command: CV?
  response: "CVFL ** ... CVEND"
  type: string
  description: "Returns all configured speaker channel levels, terminated by CVEND"

- id: video_aspect
  label: Video Aspect Ratio
  command: VSASP ?
  response: VSASPNRM|VSASPFUL
  type: string

- id: video_monitor
  label: HDMI Monitor Output
  command: VSMONI ?
  response: VSMONIAUTO|VSMONI1|VSMONI2
  type: string

- id: video_resolution
  label: Video Resolution
  command: VSSC ?
  response: VSSC***
  type: string

- id: zone2_state
  label: Zone 2 State
  command: Z2?
  response: Z2ON|Z2OFF
  type: enum
  values:
    - ON
    - OFF

- id: zone2_volume
  label: Zone 2 Volume
  command: Z2?
  response: Z2**
  type: string

- id: zone2_mute
  label: Zone 2 Mute State
  command: Z2MU?
  response: Z2MUON|Z2MUOFF
  type: enum
  values:
    - ON
    - OFF

- id: zone2_source
  label: Zone 2 Source
  command: Z2?
  response: Z2***
  type: string

- id: zone3_state
  label: Zone 3 State
  command: Z3?
  response: Z3ON|Z3OFF
  type: enum
  values:
    - ON
    - OFF

- id: zone3_mute
  label: Zone 3 Mute State
  command: Z3MU?
  response: Z3MUON|Z3MUOFF
  type: enum
  values:
    - ON
    - OFF

- id: tuner_frequency
  label: Tuner Frequency
  command: TFAN?
  response: TFAN******
  type: string
  description: "6-digit frequency value"

- id: tuner_preset
  label: Tuner Preset
  command: TPAN?
  response: TPAN**
  type: string

- id: tuner_rds_name
  label: RDS Station Name
  command: TFANNAME?
  response: TFANNAME********
  type: string
  description: "EU/AP only. Returns RDS station name"

- id: net_usb_display_info_ascii
  label: Net/USB Display Info (ASCII)
  command: NSA
  response: NSA0-NSA8
  type: string
  description: "Returns onscreen display info lines (ASCII, max 96 bytes per line)"

- id: net_usb_display_info_utf8
  label: Net/USB Display Info (UTF-8)
  command: NSE
  response: NSE0-NSE8
  type: string
  description: "Returns onscreen display info lines (UTF-8, max 96 bytes per line)"

- id: trigger_state
  label: Trigger State
  command: TR?
  response: "TR1 ON|OFF, TR2 ON|OFF"
  type: string

- id: dimmer_state
  label: Dimmer State
  command: DIM ?
  response: DIM BRI|DIM|DAR|OFF
  type: string

- id: setup_menu_state
  label: Setup Menu State
  command: MNMEN?
  response: MNMEN ON|MNMEN OFF
  type: enum
  values:
    - ON
    - OFF

- id: all_zone_stereo_state
  label: All Zone Stereo State
  command: MNZST?
  response: MNZST ON|MNZST OFF
  type: enum
  values:
    - ON
    - OFF

- id: net_usb_preset_names
  label: Net/USB Preset Names
  command: NSH
  response: "NSH00-NSH35"
  type: string
  description: "Returns audio preset names (UTF-8, 20 chars each), except Bluetooth/USB/iPod"

- id: hd_radio_status
  label: HD Radio Status
  command: HD?
  response: "HDST NAME, HDSIG LEV, HDMLT CURRCH, HDMLT CAST CH, HDPTY, HDARTIST, HDTITLE, HDALBUM, HDGENRE, HDMODE"
  type: string
  description: "Returns comprehensive HD Radio status including station name, signal level, multicast, artist, title, album, genre"

- id: remote_maintenance_state
  label: Remote Maintenance State
  command: RM ?
  response: RM ON|RM OFF
  type: enum
  values:
    - ON
    - OFF

- id: upgrade_id
  label: Upgrade ID Number
  command: UGIDN
  response: UGIDN************
  type: string
  description: "12-digit ID number displayed on FL display"
```

## Variables
```yaml
# UNRESOLVED: no distinct settable parameters beyond Actions in source; volume/input/mode changes are all action-driven
```

## Events
```yaml
- id: power_event
  description: "Sent when power state changes via front panel or remote. Form same as COMMAND."
  pattern: PWON|PWSTANDBY

- id: volume_event
  description: "Sent when master volume changes. Returns MV status."
  pattern: MV**|MV***

- id: mute_event
  description: "Sent when mute state changes."
  pattern: MUON|MUOFF

- id: input_source_event
  description: "Sent when input source changes. Also triggers channel volume and surround mode events if they differ."
  pattern: SI***

- id: surround_mode_event
  description: "Sent when surround mode changes. Returns current mode then new mode."
  pattern: MS***

- id: channel_volume_event
  description: "Sent when channel volume changes or when input source changes and channel volumes differ."
  pattern: "CVFL ** ... CVEND"

- id: zone2_event
  description: "Sent when Zone 2 state changes."
  pattern: Z2***

- id: zone3_event
  description: "Sent when Zone 3 state changes."
  pattern: Z3***
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source beyond note J (1s delay after PWON)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures
```

## Notes
- Commands sent as ASCII: `COMMAND + PARAMETER + CR (0x0D)`. COMMAND is always 2 ASCII characters. PARAMETER is up to 25 ASCII characters.
- Send commands at 50ms minimum intervals.
- Response to request commands (COMMAND + `?` + CR) should arrive within 200ms.
- Events should be sent within 5 seconds of state change.
- Maximum communication data length is 135 bytes.
- **After sending PWON, wait 1 second before sending the next command.** (Source note J)
- Volume encoding: 0.5dB step uses 3 ASCII characters; 1dB step uses 2 characters. Example: `MV80` = 0dB, `MV805` = +0.5dB, `MV795` = -0.5dB, `MV98` = +18dB, `MV00` = --- (MIN).
- When input source changes, channel volume and surround mode events return automatically if they differ from the previous source (notes B-E).
- When surround mode is changed, the current mode is returned as an event before the new mode (note F).
- Zone 2/3 volume uses same encoding scheme as master volume.
- Some commands are region-specific (HDRADIO, PANDORA, SIRIUSXM, SPOTIFY = North America; LASTFM, SPOTIFY = Europe).
- AUX3 requires "Additional Source" set to On.
- Auro-3D features require Auro-3D Upgrade.
- HD Radio commands are North America model only.
- REC SELECT mode returns "SR" status; ZONE2 mode returns "Z2" status (shared command space for SR/Z2).

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact set of surround mode variants available for SR6011 vs other models not fully disambiguated — source shows model-specific columns but SR6011 column not labeled -->
<!-- UNRESOLVED: NS onscreen display data byte encoding details (flag byte bit meanings) not fully documented for programmatic parsing -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:24:45.188Z
last_checked_at: 2026-10-01T10:30:32.720Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T10:30:32.720Z
matched_actions: 164
action_count: 164
confidence: medium
summary: "All 164 spec actions have literal command matches in source's ASCII command table; transport values (TCP 23, 9600 8N1) confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated"
- "exact model variants covered by this protocol version not specified beyond \"SR6011 Series\""
- "no distinct settable parameters beyond Actions in source; volume/input/mode changes are all action-driven"
- "no multi-step sequences explicitly described in source beyond note J (1s delay after PWON)"
- "source contains no explicit safety warnings or interlock procedures"
- "exact set of surround mode variants available for SR6011 vs other models not fully disambiguated — source shows model-specific columns but SR6011 column not labeled"
- "NS onscreen display data byte encoding details (flag byte bit meanings) not fully documented for programmatic parsing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
