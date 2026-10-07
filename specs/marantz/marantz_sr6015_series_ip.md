---
spec_id: admin/marantz-sr6015-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR6015 Series Control Spec"
manufacturer: Marantz
model_family: SR6015
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR6015
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:29:05.526Z
last_checked_at: 2026-10-07T20:50:49.860Z
generated_at: 2026-10-07T20:50:49.860Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version compatibility not stated"
  - "some surround mode commands listed may not apply to SR6015 specifically (doc covers multiple AVR models)"
  - "all settable parameters are represented as Actions with params."
  - "no explicit multi-step sequences in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated"
  - "some surround mode commands may be model-specific (doc covers multiple Marantz/Denon AVR generations)"
  - "HD Radio commands are North America model only"
  - "Spotify commands are North America & Europe model only"
  - "Pandora/SiriusXM/LASTFM commands may not apply to all regions"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:50:49.860Z
  matched_actions: 429
  action_count: 429
  confidence: medium
  summary: "All 429 units match the generic multi-model Denon/Marantz protocol source with transport confirmed. The unmapped event/status-only tokens are not controller commands. The source does not name the SR6015. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR6015 Series Control Spec

## Summary
Marantz SR6015 AV receiver controlled via RS-232 serial or TCP/IP (telnet port 23). ASCII command protocol using 2-character command codes with parameters terminated by CR (0x0D). Covers power, volume, input selection, surround modes, zone 2/3 control, tuner, online music, and system settings.

<!-- UNRESOLVED: exact firmware version compatibility not stated -->
<!-- UNRESOLVED: some surround mode commands listed may not apply to SR6015 specifically (doc covers multiple AVR models) -->

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
  flow_control: UNRESOLVED
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable     # PW command: power on/standby
  - queryable     # ? parameter on most commands returns status
  - levelable     # MV/CV volume, PS tone/bass/treble controls
  - routable      # SI input source selection, SD input mode
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PWON
    params: []
    notes: "Wait 1 second before sending next command after PWON."

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
    params:
      - name: level
        type: string
        description: "Two-digit ASCII 00-98. 80=0dB, 00=---(MIN). For 0.5dB steps use 3 digits e.g. 805=-0.5dB."

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
    command: SI{source}
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
        description: "Input source name appended directly after SI command."

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

  - id: input_mode_auto
    label: Input Mode Auto
    kind: action
    command: SDAUTO
    params: []
    notes: "Priority: HDMI > Digital > Analog."

  - id: input_mode_hdmi
    label: Input Mode HDMI
    kind: action
    command: SDHDMI
    params: []

  - id: input_mode_digital
    label: Input Mode Digital
    kind: action
    command: SDDIGITAL
    params: []

  - id: input_mode_analog
    label: Input Mode Analog
    kind: action
    command: SDANALOG
    params: []

  - id: surround_mode_movie
    label: Surround Mode Movie
    kind: action
    command: MSMOVIE
    params: []

  - id: surround_mode_music
    label: Surround Mode Music
    kind: action
    command: MSMUSIC
    params: []

  - id: surround_mode_game
    label: Surround Mode Game
    kind: action
    command: MSGAME
    params: []

  - id: surround_mode_direct
    label: Surround Mode Direct
    kind: action
    command: MSDIRECT
    params: []

  - id: surround_mode_pure_direct
    label: Surround Mode Pure Direct
    kind: action
    command: MSPURE DIRECT
    params: []

  - id: surround_mode_stereo
    label: Surround Mode Stereo
    kind: action
    command: MSSTEREO
    params: []

  - id: surround_mode_auto
    label: Surround Mode Auto
    kind: action
    command: MSAUTO
    params: []

  - id: surround_mode_dolby_digital
    label: Surround Mode Dolby Digital
    kind: action
    command: MSDOLBY DIGITAL
    params: []

  - id: surround_mode_dolby_surround
    label: Surround Mode Dolby Surround
    kind: action
    command: MSDOLBY SURROUND
    params: []

  - id: surround_mode_dolby_atmos
    label: Surround Mode Dolby Atmos
    kind: action
    command: MSDOLBY ATMOS
    params: []

  - id: surround_mode_dts_surround
    label: Surround Mode DTS Surround
    kind: action
    command: MSDTS SURROUND
    params: []

  - id: surround_mode_dts_hd_master
    label: Surround Mode DTS HD Master
    kind: action
    command: MSDTS HD MSTR
    params: []

  - id: surround_mode_mch_stereo
    label: Surround Mode Multi Channel Stereo
    kind: action
    command: MSMCH STEREO
    params: []

  - id: surround_mode_auro3d
    label: Surround Mode Auro-3D
    kind: action
    command: MSAURO3D
    params: []
    notes: "Auro-3D Upgrade only."

  - id: surround_mode_auro2dsurr
    label: Surround Mode Auro-2D Surround
    kind: action
    command: MSAURO2DSURR
    params: []

  - id: surround_mode_wide_screen
    label: Surround Mode Wide Screen
    kind: action
    command: MSWIDE SCREEN
    params: []

  - id: surround_mode_virtual
    label: Surround Mode Virtual
    kind: action
    command: MSVIRTUAL
    params: []

  - id: quick_select
    label: Quick Select
    kind: action
    command: MSQUICK{n}
    params:
      - name: n
        type: integer
        description: "Quick select slot 1-5."

  - id: quick_select_memory
    label: Quick Select Memory
    kind: action
    command: MSQUICK{n} MEMORY
    params:
      - name: n
        type: integer
        description: "Quick select slot 1-5."

  - id: video_select_on
    label: Video Select On
    kind: action
    command: SVON
    params: []

  - id: video_select_off
    label: Video Select Off
    kind: action
    command: SVOFF
    params: []

  - id: video_select_source
    label: Video Select Source
    kind: action
    command: SV{source}
    params:
      - name: source
        type: enum
        values: [DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE]
        description: "Video source name appended after SV."

  - id: sleep_timer
    label: Set Sleep Timer
    kind: action
    command: SLP{minutes}
    params:
      - name: minutes
        type: string
        description: "OFF or 001-120 by ASCII (010=10min)."

  - id: auto_standby
    label: Set Auto Standby
    kind: action
    command: STBY{value}
    params:
      - name: value
        type: enum
        values: [15M, 30M, 60M, OFF]

  - id: eco_mode
    label: Set ECO Mode
    kind: action
    command: ECO{value}
    params:
      - name: value
        type: enum
        values: [ON, AUTO, OFF]

  - id: channel_volume_set
    label: Set Channel Volume
    kind: action
    command: CV{channel} {level}
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
        description: "Channel identifier."
      - name: level
        type: string
        description: "38-62 by ASCII, 50=0dB. Or UP/DOWN for relative."

  - id: channel_volume_reset
    label: Reset All Channel Levels
    kind: action
    command: CVZRL
    params: []

  - id: digital_input_auto
    label: Digital Input Auto
    kind: action
    command: DCAUTO
    params: []

  - id: digital_input_pcm
    label: Digital Input PCM
    kind: action
    command: DCPCM
    params: []

  - id: digital_input_dts
    label: Digital Input DTS
    kind: action
    command: DCDTS
    params: []

  - id: hdmi_monitor_out
    label: Set HDMI Monitor Out
    kind: action
    command: VSMONI{value}
    params:
      - name: value
        type: enum
        values: [AUTO, 1, 2]

  - id: hdmi_audio_output
    label: Set HDMI Audio Output
    kind: action
    command: VSAUDIO {value}
    params:
      - name: value
        type: enum
        values: [AMP, TV]

  - id: tone_control
    label: Set Tone Control
    kind: action
    command: PSTONE CTRL {value}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: bass_adjust
    label: Adjust Bass
    kind: action
    command: PSBAS {direction_or_value}
    params:
      - name: direction_or_value
        type: string
        description: "UP, DOWN, or 00-99 (50=0dB, range 44-56 = -6 to +6)."

  - id: treble_adjust
    label: Adjust Treble
    kind: action
    command: PSTRE {direction_or_value}
    params:
      - name: direction_or_value
        type: string
        description: "UP, DOWN, or 00-99 (50=0dB, range 44-56 = -6 to +6)."

  - id: dynamic_eq
    label: Set Dynamic EQ
    kind: action
    command: PSDYNEQ {value}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: dynamic_volume
    label: Set Dynamic Volume
    kind: action
    command: PSDYNVOL {value}
    params:
      - name: value
        type: enum
        values: [HEV, MED, LIT, OFF]

  - id: multeq
    label: Set MultEQ Mode
    kind: action
    command: PSMULTEQ:{value}
    params:
      - name: value
        type: enum
        values: [AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF]

  - id: reference_level_offset
    label: Set Reference Level Offset
    kind: action
    command: PSREFLEV {value}
    params:
      - name: value
        type: enum
        values: ["0", "5", "10", "15"]

  - id: audyssey_lfc
    label: Set Audyssey LFC
    kind: action
    command: PSLFC {value}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: dialog_level
    label: Set Dialog Level Adjust
    kind: action
    command: PSDIL {value}
    params:
      - name: value
        type: string
        description: "ON, OFF, UP, DOWN, or 38-62 (50=0dB)."

  - id: subwoofer_level
    label: Set Subwoofer Level
    kind: action
    command: PSSWL {value}
    params:
      - name: value
        type: string
        description: "ON, OFF, UP, DOWN, or 00,38-62 (50=0dB)."

  - id: cinema_eq
    label: Set Cinema EQ
    kind: action
    command: PSCINEMA EQ.{value}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: drc
    label: Set Dynamic Compression
    kind: action
    command: PSDRC {value}
    params:
      - name: value
        type: enum
        values: [AUTO, LOW, MID, HI, OFF]

  - id: dialog_enhancer
    label: Set Dialog Enhancer
    kind: action
    command: PSDEH {value}
    params:
      - name: value
        type: enum
        values: [OFF, LOW, MED, HIGH]

  - id: picture_mode
    label: Set Picture Mode
    kind: action
    command: PV{value}
    params:
      - name: value
        type: enum
        values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]

  - id: contrast_adjust
    label: Adjust Contrast
    kind: action
    command: PVCN {value}
    params:
      - name: value
        type: string
        description: "UP, DOWN, or 000-100 (050=0)."

  - id: brightness_adjust
    label: Adjust Brightness
    kind: action
    command: PVBR {value}
    params:
      - name: value
        type: string
        description: "UP, DOWN, or 000-100 (050=0)."

  - id: resolution_set
    kind: action
    label: Set Resolution
    command: VSSC{value}
    params:
      - name: value
        type: enum
        values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]

  - id: zone2_source
    label: Zone 2 Select Source
    kind: action
    command: Z2{source}
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
    notes: "SOURCE cancels Zone 2 mode."

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
    label: Zone 2 Set Volume
    kind: action
    command: Z2{level}
    params:
      - name: level
        type: string
        description: "00-98 by ASCII, 80=0dB, 00=---(MIN)."

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

  - id: zone3_source
    label: Zone 3 Select Source
    kind: action
    command: Z3{source}
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]

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
    label: Zone 3 Set Volume
    kind: action
    command: Z3{level}
    params:
      - name: level
        type: string
        description: "00-98 by ASCII, 80=0dB, 00=---(MIN)."

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

  - id: tuner_freq_up
    label: Tuner Frequency Up
    kind: action
    command: TFANUP
    params: []

  - id: tuner_freq_down
    label: Tuner Frequency Down
    kind: action
    command: TFANDOWN
    params: []

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

  - id: usb_play
    label: USB/iPod Play
    kind: action
    command: NS9A
    params: []

  - id: usb_pause
    label: USB/iPod Pause
    kind: action
    command: NS9B
    params: []

  - id: usb_stop
    label: USB/iPod Stop
    kind: action
    command: NS9C
    params: []

  - id: usb_skip_plus
    label: Skip Forward
    kind: action
    command: NS9D
    params: []

  - id: usb_skip_minus
    label: Skip Backward
    kind: action
    command: NS9E
    params: []

  - id: usb_cursor_up
    label: Cursor Up
    kind: action
    command: NS90
    params: []

  - id: usb_cursor_down
    label: Cursor Down
    kind: action
    command: NS91
    params: []

  - id: usb_cursor_left
    label: Cursor Left
    kind: action
    command: NS92
    params: []

  - id: usb_cursor_right
    label: Cursor Right
    kind: action
    command: NS93
    params: []

  - id: usb_enter
    label: Enter
    kind: action
    command: NS94
    params: []

  - id: usb_repeat_one
    label: Repeat One
    kind: action
    command: NS9H
    params: []

  - id: usb_repeat_all
    label: Repeat All
    kind: action
    command: NS9I
    params: []

  - id: usb_repeat_off
    label: Repeat Off
    kind: action
    command: NS9J
    params: []

  - id: usb_random_on
    label: Random On
    kind: action
    command: NS9K
    params: []

  - id: usb_random_off
    label: Random Off
    kind: action
    command: NS9M
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

  - id: dimmer_set
    label: Set Dimmer
    kind: action
    command: DIM {value}
    params:
      - name: value
        type: enum
        values: [BRI, DIM, DAR, OFF, SEL]

  - id: menu_on
    label: Setup Menu On
    kind: action
    command: MNMEN ON
    params: []

  - id: menu_off
    label: Setup Menu Off
    kind: action
    command: MNMEN OFF
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
    params: []
    notes: "Locks panel buttons except MASTER VOL."

  - id: panel_lock_off
    label: Panel Lock Off
    kind: action
    command: SYPANEL LOCK OFF
    params: []

  - id: zone2_sleep_timer
    label: Zone 2 Sleep Timer
    kind: action
    command: Z2SLP{value}
    params:
      - name: value
        type: string
        description: "OFF or 001-120 by ASCII."

  - id: zone3_sleep_timer
    label: Zone 3 Sleep Timer
    kind: action
    command: Z3SLP{value}
    params:
      - name: value
        type: string
        description: "OFF or 001-120 by ASCII."

  - id: favorite_select
    label: Favorite Select
    kind: action
    command: ZMFAVORITE{n}
    params:
      - name: n
        type: integer
        description: "Favorite slot 1-4."

  - id: favorite_memory
    label: Favorite Memory
    kind: action
    command: ZMFAVORITE{n} MEMORY
    params:
      - name: n
        type: integer
        description: "Favorite slot 1-4."

  - id: zone2_favorite_select
    label: Zone 2 Favorite Select
    kind: action
    command: Z2FAVORITE{n}
    params:
      - name: n
        type: integer
        description: "Favorite slot 1-4."

  - id: zone3_favorite_select
    label: Zone 3 Favorite Select
    kind: action
    command: Z3FAVORITE{n}
    params:
      - name: n
        type: integer
        description: "Favorite slot 1-4."

  - id: video_processing_mode
    label: Set Video Processing Mode
    kind: action
    command: VSVPM{value}
    params:
      - name: value
        type: enum
        values: [AUTO, GAME, MOVI]

  - id: aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: VSASP{value}
    params:
      - name: value
        type: enum
        values: [NRM, FUL]

  - id: lfe_level
    label: Set LFE Level
    kind: action
    command: PSLFE {value}
    params:
      - name: value
        type: string
        description: "UP, DOWN, or 00-10 (00=0dB, 10=-10dB). Range 0 to -10."

  - id: audio_delay
    label: Set Audio Delay
    kind: action
    command: PSDELAY {value}
    params:
      - name: value
        type: string
        description: "UP, DOWN, or 000-999 (000=0ms). Range 0-200ms. 0-60ms: 3ms/step, >60ms: 10ms/step."

  - id: graphic_eq
    label: Set Graphic EQ
    kind: action
    command: PSGEQ {value}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: loudness_management
    label: Set Loudness Management
    kind: action
    command: PSLOM {value}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: record_select_source
    label: Select Record Source
    kind: action
    command: SR
    params:
      - name: source
        type: enum
        values: [PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP, IPOD, USB DIRECT, IPOD DIRECT, SOURCE]
        description: "The name of PARAMETER is the same as that of the time of SI COMMAND. Additional examples document IPOD, USB DIRECT, IPOD DIRECT, and SOURCE."
    notes: "Append source directly after SR. SOURCE cancels REC SELECT mode. Responses use SR in REC mode and Z2 in ZONE2 mode."

  - id: zone2_direct_source
    label: Zone 2 Select Direct Source
    kind: action
    command: Z2
    params:
      - name: source
        type: enum
        values: [USB DIRECT, IPOD DIRECT]
        description: "Append source directly after Z2."

  - id: input_mode_external
    label: Input Mode External
    kind: action
    command: SDEXT.IN
    params: []

  - id: input_mode_seven_channel
    label: Input Mode 7.1 Channel
    kind: action
    command: SD7.1IN
    params: []

  - id: input_mode_no_input
    label: Input Mode No Input
    kind: action
    command: SDNO
    params: []

  - id: surround_mode_dsd_direct
    label: Surround Mode DSD Direct
    kind: action
    command: MSDSD DIRECT
    params: []

  - id: surround_mode_dsd_pure_direct
    label: Surround Mode DSD Pure Direct
    kind: action
    command: MSDSD PURE DIRECT
    params: []

  - id: surround_mode_dolby_pro_logic
    label: Surround Mode Dolby Pro Logic
    kind: action
    command: MSDOLBY PRO LOGIC
    params: []

  - id: surround_mode_dolby_pl2_c
    label: Surround Mode Dolby PL2 C
    kind: action
    command: MSDOLBY PL2 C
    params: []

  - id: surround_mode_dolby_pl2_m
    label: Surround Mode Dolby PL2 M
    kind: action
    command: MSDOLBY PL2 M
    params: []

  - id: surround_mode_dolby_pl2_g
    label: Surround Mode Dolby PL2 G
    kind: action
    command: MSDOLBY PL2 G
    params: []

  - id: surround_mode_dolby_pl2x_c
    label: Surround Mode Dolby PL2X C
    kind: action
    command: MSDOLBY PL2X C
    params: []

  - id: surround_mode_dolby_pl2x_m
    label: Surround Mode Dolby PL2X M
    kind: action
    command: MSDOLBY PL2X M
    params: []

  - id: surround_mode_dolby_pl2x_g
    label: Surround Mode Dolby PL2X G
    kind: action
    command: MSDOLBY PL2X G
    params: []

  - id: surround_mode_dolby_pl2z_h
    label: Surround Mode Dolby PL2Z H
    kind: action
    command: MSDOLBY PL2Z H
    params: []

  - id: surround_mode_dolby_d_ex
    label: Surround Mode Dolby D EX
    kind: action
    command: MSDOLBY D EX
    params: []

  - id: surround_mode_dolby_d_pl2x_c
    label: Surround Mode Dolby D Plus PL2X C
    kind: action
    command: MSDOLBY D+PL2X C
    params: []

  - id: surround_mode_dolby_d_pl2x_m
    label: Surround Mode Dolby D Plus PL2X M
    kind: action
    command: MSDOLBY D+PL2X M
    params: []

  - id: surround_mode_dolby_d_pl2z_h
    label: Surround Mode Dolby D Plus PL2Z H
    kind: action
    command: MSDOLBY D+PL2Z H
    params: []

  - id: surround_mode_dolby_d_ds
    label: Surround Mode Dolby D Plus DS
    kind: action
    command: MSDOLBY D+DS
    params: []

  - id: surround_mode_dolby_d_neo_x_c
    label: Surround Mode Dolby D Plus NEO X C
    kind: action
    command: MSDOLBY D+NEO:X C
    params: []

  - id: surround_mode_dolby_d_neo_x_m
    label: Surround Mode Dolby D Plus NEO X M
    kind: action
    command: MSDOLBY D+NEO:X M
    params: []

  - id: surround_mode_dolby_d_neo_x_g
    label: Surround Mode Dolby D Plus NEO X G
    kind: action
    command: MSDOLBY D+NEO:X G
    params: []

  - id: surround_mode_dts_es_discrete
    label: Surround Mode DTS ES Discrete 6.1
    kind: action
    command: MSDTS ES DSCRT6.1
    params: []

  - id: surround_mode_dts_es_matrix
    label: Surround Mode DTS ES Matrix 6.1
    kind: action
    command: MSDTS ES MTRX6.1
    params: []

  - id: surround_mode_dts_pl2x_c
    label: Surround Mode DTS Plus PL2X C
    kind: action
    command: MSDTS+PL2X C
    params: []

  - id: surround_mode_dts_pl2x_m
    label: Surround Mode DTS Plus PL2X M
    kind: action
    command: MSDTS+PL2X M
    params: []

  - id: surround_mode_dts_pl2z_h
    label: Surround Mode DTS Plus PL2Z H
    kind: action
    command: MSDTS+PL2Z H
    params: []

  - id: surround_mode_dts_ds
    label: Surround Mode DTS Plus DS
    kind: action
    command: MSDTS+DS
    params: []

  - id: surround_mode_dts_96_24
    label: Surround Mode DTS 96/24
    kind: action
    command: MSDTS96/24
    params: []

  - id: surround_mode_dts96_es_matrix
    label: Surround Mode DTS96 ES Matrix
    kind: action
    command: MSDTS96 ES MTRX
    params: []

  - id: surround_mode_dts_neo_6
    label: Surround Mode DTS Plus NEO 6
    kind: action
    command: MSDTS+NEO:6
    params: []

  - id: surround_mode_dts_neo_x_c
    label: Surround Mode DTS Plus NEO X C
    kind: action
    command: MSDTS+NEO:X C
    params: []

  - id: surround_mode_dts_neo_x_m
    label: Surround Mode DTS Plus NEO X M
    kind: action
    command: MSDTS+NEO:X M
    params: []

  - id: surround_mode_dts_neo_x_g
    label: Surround Mode DTS Plus NEO X G
    kind: action
    command: MSDTS+NEO:X G
    params: []

  - id: surround_mode_multi_ch_in
    label: Surround Mode Multi Channel In
    kind: action
    command: MSMULTI CH IN
    params: []

  - id: surround_mode_m_ch_in_dolby_ex
    label: Surround Mode Multi Channel In Plus Dolby EX
    kind: action
    command: MSM CH IN+DOLBY EX
    params: []

  - id: surround_mode_m_ch_in_pl2x_c
    label: Surround Mode Multi Channel In Plus PL2X C
    kind: action
    command: MSM CH IN+PL2X C
    params: []

  - id: surround_mode_m_ch_in_pl2x_m
    label: Surround Mode Multi Channel In Plus PL2X M
    kind: action
    command: MSM CH IN+PL2X M
    params: []

  - id: surround_mode_m_ch_in_pl2z_h
    label: Surround Mode Multi Channel In Plus PL2Z H
    kind: action
    command: MSM CH IN+PL2Z H
    params: []

  - id: surround_mode_m_ch_in_ds
    label: Surround Mode Multi Channel In Plus DS
    kind: action
    command: MSM CH IN+DS
    params: []

  - id: surround_mode_multi_ch_in_seven
    label: Surround Mode Multi Channel In 7.1
    kind: action
    command: MSMULTI CH IN 7.1
    params: []

  - id: surround_mode_m_ch_in_neo_x_c
    label: Surround Mode Multi Channel In Plus NEO X C
    kind: action
    command: MSM CH IN+NEO:X C
    params: []

  - id: surround_mode_m_ch_in_neo_x_m
    label: Surround Mode Multi Channel In Plus NEO X M
    kind: action
    command: MSM CH IN+NEO:X M
    params: []

  - id: surround_mode_m_ch_in_neo_x_g
    label: Surround Mode Multi Channel In Plus NEO X G
    kind: action
    command: MSM CH IN+NEO:X G
    params: []

  - id: surround_mode_dolby_d_plus
    label: Surround Mode Dolby D Plus
    kind: action
    command: MSDOLBY D+
    params: []

  - id: surround_mode_dolby_d_plus_ex
    label: Surround Mode Dolby D Plus EX
    kind: action
    command: MSDOLBY D+ +EX
    params: []

  - id: surround_mode_dolby_d_plus_pl2x_c
    label: Surround Mode Dolby D Plus PL2X C
    kind: action
    command: MSDOLBY D+ +PL2X C
    params: []

  - id: surround_mode_dolby_d_plus_pl2x_m
    label: Surround Mode Dolby D Plus PL2X M
    kind: action
    command: MSDOLBY D+ +PL2X M
    params: []

  - id: surround_mode_dolby_d_plus_pl2z_h
    label: Surround Mode Dolby D Plus PL2Z H
    kind: action
    command: MSDOLBY D+ +PL2Z H
    params: []

  - id: surround_mode_dolby_d_plus_ds
    label: Surround Mode Dolby D Plus DS
    kind: action
    command: MSDOLBY D+ +DS
    params: []

  - id: surround_mode_dolby_d_plus_neo_x_c
    label: Surround Mode Dolby D Plus NEO X C
    kind: action
    command: MSDOLBY D+ +NEO:X C
    params: []

  - id: surround_mode_dolby_d_plus_neo_x_m
    label: Surround Mode Dolby D Plus NEO X M
    kind: action
    command: MSDOLBY D+ +NEO:X M
    params: []

  - id: surround_mode_dolby_d_plus_neo_x_g
    label: Surround Mode Dolby D Plus NEO X G
    kind: action
    command: MSDOLBY D+ +NEO:X G
    params: []

  - id: surround_mode_dolby_hd
    label: Surround Mode Dolby HD
    kind: action
    command: MSDOLBY HD
    params: []

  - id: surround_mode_dolby_hd_ex
    label: Surround Mode Dolby HD Plus EX
    kind: action
    command: MSDOLBY HD+EX
    params: []

  - id: surround_mode_dolby_hd_pl2x_c
    label: Surround Mode Dolby HD Plus PL2X C
    kind: action
    command: MSDOLBY HD+PL2X C
    params: []

  - id: surround_mode_dolby_hd_pl2x_m
    label: Surround Mode Dolby HD Plus PL2X M
    kind: action
    command: MSDOLBY HD+PL2X M
    params: []

  - id: surround_mode_dolby_hd_pl2z_h
    label: Surround Mode Dolby HD Plus PL2Z H
    kind: action
    command: MSDOLBY HD+PL2Z H
    params: []

  - id: surround_mode_dolby_hd_ds
    label: Surround Mode Dolby HD Plus DS
    kind: action
    command: MSDOLBY HD+DS
    params: []

  - id: surround_mode_dolby_hd_neo_x_c
    label: Surround Mode Dolby HD Plus NEO X C
    kind: action
    command: MSDOLBY HD+NEO:X C
    params: []

  - id: surround_mode_dolby_hd_neo_x_m
    label: Surround Mode Dolby HD Plus NEO X M
    kind: action
    command: MSDOLBY HD+NEO:X M
    params: []

  - id: surround_mode_dolby_hd_neo_x_g
    label: Surround Mode Dolby HD Plus NEO X G
    kind: action
    command: MSDOLBY HD+NEO:X G
    params: []

  - id: surround_mode_dts_hd
    label: Surround Mode DTS HD
    kind: action
    command: MSDTS HD
    params: []

  - id: surround_mode_dts_hd_pl2x_c
    label: Surround Mode DTS HD Plus PL2X C
    kind: action
    command: MSDTS HD+PL2X C
    params: []

  - id: surround_mode_dts_hd_pl2x_m
    label: Surround Mode DTS HD Plus PL2X M
    kind: action
    command: MSDTS HD+PL2X M
    params: []

  - id: surround_mode_dts_hd_pl2z_h
    label: Surround Mode DTS HD Plus PL2Z H
    kind: action
    command: MSDTS HD+PL2Z H
    params: []

  - id: surround_mode_dts_hd_ds
    label: Surround Mode DTS HD Plus DS
    kind: action
    command: MSDTS HD+DS
    params: []

  - id: surround_mode_dts_hd_neo_6
    label: Surround Mode DTS HD Plus NEO 6
    kind: action
    command: MSDTS HD+NEO:6
    params: []

  - id: surround_mode_dts_hd_neo_x_c
    label: Surround Mode DTS HD Plus NEO X C
    kind: action
    command: MSDTS HD+NEO:X C
    params: []

  - id: surround_mode_dts_hd_neo_x_m
    label: Surround Mode DTS HD Plus NEO X M
    kind: action
    command: MSDTS HD+NEO:X M
    params: []

  - id: surround_mode_dts_hd_neo_x_g
    label: Surround Mode DTS HD Plus NEO X G
    kind: action
    command: MSDTS HD+NEO:X G
    params: []

  - id: surround_mode_dts_express
    label: Surround Mode DTS Express
    kind: action
    command: MSDTS EXPRESS
    params: []

  - id: surround_mode_dts_es_eight_discrete
    label: Surround Mode DTS ES 8 Channel Discrete
    kind: action
    command: MSDTS ES 8CH DSCRT
    params: []

  - id: surround_mode_mpeg2_aac
    label: Surround Mode MPEG2 AAC
    kind: action
    command: MSMPEG2 AAC
    params: []

  - id: surround_mode_aac_dolby_ex
    label: Surround Mode AAC Plus Dolby EX
    kind: action
    command: MSAAC+DOLBY EX
    params: []

  - id: surround_mode_aac_pl2x_c
    label: Surround Mode AAC Plus PL2X C
    kind: action
    command: MSAAC+PL2X C
    params: []

  - id: surround_mode_aac_pl2x_m
    label: Surround Mode AAC Plus PL2X M
    kind: action
    command: MSAAC+PL2X M
    params: []

  - id: surround_mode_aac_pl2z_h
    label: Surround Mode AAC Plus PL2Z H
    kind: action
    command: MSAAC+PL2Z H
    params: []

  - id: surround_mode_aac_ds
    label: Surround Mode AAC Plus DS
    kind: action
    command: MSAAC+DS
    params: []

  - id: surround_mode_aac_neo_x_c
    label: Surround Mode AAC Plus NEO X C
    kind: action
    command: MSAAC+NEO:X C
    params: []

  - id: surround_mode_aac_neo_x_m
    label: Surround Mode AAC Plus NEO X M
    kind: action
    command: MSAAC+NEO:X M
    params: []

  - id: surround_mode_aac_neo_x_g
    label: Surround Mode AAC Plus NEO X G
    kind: action
    command: MSAAC+NEO:X G
    params: []

  - id: surround_mode_pl_dsx
    label: Surround Mode PL DSX
    kind: action
    command: MSPL DSX
    params: []

  - id: surround_mode_pl2_c_dsx
    label: Surround Mode PL2 C DSX
    kind: action
    command: MSPL2 C DSX
    params: []

  - id: surround_mode_pl2_m_dsx
    label: Surround Mode PL2 M DSX
    kind: action
    command: MSPL2 M DSX
    params: []

  - id: surround_mode_pl2_g_dsx
    label: Surround Mode PL2 G DSX
    kind: action
    command: MSPL2 G DSX
    params: []

  - id: surround_mode_audyssey_dsx
    label: Surround Mode Audyssey DSX
    kind: action
    command: MSAUDYSSEY DSX
    params: []

  - id: surround_mode_dts_neo6_c
    label: Surround Mode DTS NEO 6 C
    kind: action
    command: MSDTS NEO:6 C
    params: []

  - id: surround_mode_dts_neo6_m
    label: Surround Mode DTS NEO 6 M
    kind: action
    command: MSDTS NEO:6 M
    params: []

  - id: surround_mode_dts_neox_c
    label: Surround Mode DTS NEO X C
    kind: action
    command: MSDTS NEO:X C
    params: []

  - id: surround_mode_dts_neox_m
    label: Surround Mode DTS NEO X M
    kind: action
    command: MSDTS NEO:X M
    params: []

  - id: surround_mode_dts_neox_g
    label: Surround Mode DTS NEO X G
    kind: action
    command: MSDTS NEO:X G
    params: []

  - id: surround_mode_super_stadium
    label: Surround Mode Super Stadium
    kind: action
    command: MSSUPER STADIUM
    params: []

  - id: surround_mode_rock_arena
    label: Surround Mode Rock Arena
    kind: action
    command: MSROCK ARENA
    params: []

  - id: surround_mode_jazz_club
    label: Surround Mode Jazz Club
    kind: action
    command: MSJAZZ CLUB
    params: []

  - id: surround_mode_classic_concert
    label: Surround Mode Classic Concert
    kind: action
    command: MSCLASSIC CONCERT
    params: []

  - id: surround_mode_mono_movie
    label: Surround Mode Mono Movie
    kind: action
    command: MSMONO MOVIE
    params: []

  - id: surround_mode_matrix
    label: Surround Mode Matrix
    kind: action
    command: MSMATRIX
    params: []

  - id: surround_mode_video_game
    label: Surround Mode Video Game
    kind: action
    command: MSVIDEO GAME
    params: []

  - id: surround_mode_left
    label: Surround Mode Left
    kind: action
    command: MSLEFT
    params: []

  - id: surround_mode_right
    label: Surround Mode Right
    kind: action
    command: MSRIGHT
    params: []

  - id: hdmi_resolution_set
    label: Set HDMI Resolution
    kind: action
    command: VSSCH
    params:
      - name: value
        type: enum
        values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]
        description: "Append value directly after VSSCH."

  - id: vertical_stretch
    label: Set Vertical Stretch
    kind: action
    command: VSVST
    params:
      - name: value
        type: enum
        values: [ON, OFF]
        description: "Append a space and value after VSVST."

  - id: subwoofer2_level
    label: Set Subwoofer 2 Level
    kind: action
    command: PSSWL2
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00,38 to 62 by ASCII , 50=0dB"
    notes: "Append a space and value after PSSWL2."

  - id: surround_parameter_mode
    label: Set Surround Parameter Mode
    kind: action
    command: 'PSMODE:'
    params:
      - name: value
        type: enum
        values: [MUSIC, CINEMA, GAME, PRO LOGIC]
        description: "Append value directly after PSMODE:."
    notes: "This parameter can change DOLBY PL2,PL2x,NEO:6 mode. GAME can change DOLBY PL2 & PL2x mode; PL can change ONLY DOLBY PL2 mode. HEIGHT is EVENT only."

  - id: front_height_output
    label: Set Front Height Output
    kind: action
    command: 'PSFH:'
    params:
      - name: value
        type: enum
        values: [ON, OFF]
        description: "Append value directly after PSFH:."

  - id: speaker_output
    label: Set Speaker Output
    kind: action
    command: 'PSSP:'
    params:
      - name: value
        type: enum
        values: [FW, FH, SB, HW, BH, BW, FL, HF, FR]
        description: "Append value directly after PSSP:."

  - id: height_gain
    label: Set Height Gain
    kind: action
    command: PSPHG
    params:
      - name: value
        type: enum
        values: [LOW, MID, HI]
        description: "Append a space and value after PSPHG."

  - id: containment_amount
    label: Set Containment Amount
    kind: action
    command: PSCNTAMT
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 00=0, ---AVR can be operated from 1 to 7 (01 to 07)"
    notes: "Append a space and value after PSCNTAMT."

  - id: audyssey_dsx
    label: Set Audyssey DSX
    kind: action
    command: PSDSX
    params:
      - name: value
        type: enum
        values: [ONHW, ONH, ONW, OFF]
        description: "Append a space and value after PSDSX."

  - id: stage_width
    label: Set Stage Width
    kind: action
    command: PSSTW
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 50=0dB ---AVR can be operated from -10 to +10(40 to 60)"
    notes: "Append a space and value after PSSTW."

  - id: stage_height
    label: Set Stage Height
    kind: action
    command: PSSTH
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 50=0dB ---AVR can be operated from -10 to +10(40 to 60)"
    notes: "Append a space and value after PSSTH."

  - id: bass_sync
    label: Set Bass Sync
    kind: action
    command: PSBSC
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 00=0 ---AVR can be operated from 0 to 16"
    notes: "Append a space and value after PSBSC."

  - id: external_lfe_level
    label: Set External Input LFE Level
    kind: action
    command: PSLFL
    params:
      - name: value
        type: enum
        values: ["00", "05", "10", "15"]
        description: "Append a space and value after PSLFL."
    notes: "When EXT.IN/7.1CH IN."

  - id: effect_level
    label: Set Effect Level
    kind: action
    command: PSEFF
    params:
      - name: value
        type: string
        description: "ON, OFF, UP, DOWN; **:00 to 99 by ASCII , 00=0dB, 10=10dB ---AVR can be operated from 1 to 15"
    notes: "Append a space and value after PSEFF."

  - id: surround_delay
    label: Set Surround Delay
    kind: action
    command: PSDEL
    params:
      - name: value
        type: string
        description: "UP, DOWN; ***:000 to 999 by ASCII , 000=0ms, 300=300ms ---AVR can be operated from 0 to 300 0-60ms:3ms/Step Over 60ms:10ms/Step"
    notes: "Append a space and value after PSDEL."

  - id: panorama
    label: Set Panorama
    kind: action
    command: PSPAN
    params:
      - name: value
        type: enum
        values: [ON, OFF]
        description: "Append a space and value after PSPAN."

  - id: dimension
    label: Set Dimension
    kind: action
    command: PSDIM
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 00=0, ---AVR can be operated from 0 to 6"
    notes: "Append a space and value after PSDIM."

  - id: center_width
    label: Set Center Width
    kind: action
    command: PSCEN
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 00=0 ---AVR can be operated from 0 to 7"
    notes: "Append a space and value after PSCEN."

  - id: center_image
    label: Set Center Image
    kind: action
    command: PSCEI
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 00=0.0 ---AVR can be operated from 0.0 to 1.0"
    notes: "Append a space and value after PSCEI."

  - id: center_gain
    label: Set Center Gain
    kind: action
    command: PSCEG
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 00=0.0 ---AVR can be operated from 0.0 to 1.0"
    notes: "Append a space and value after PSCEG."

  - id: center_spread
    label: Set Center Spread
    kind: action
    command: PSCES
    params:
      - name: value
        type: enum
        values: [ON, OFF]
        description: "Append a space and value after PSCES."

  - id: subwoofer_output
    label: Set Subwoofer Output
    kind: action
    command: PSSWR
    params:
      - name: value
        type: enum
        values: [ON, OFF]
        description: "Append a space and value after PSSWR."
    notes: "DIRECT,STEREO(2ch) mode."

  - id: room_size
    label: Set Room Size
    kind: action
    command: PSRSZ
    params:
      - name: value
        type: enum
        values: [S, MS, M, ML, L]
        description: "Append a space and value after PSRSZ."

  - id: audio_restorer
    label: Set Audio Restorer
    kind: action
    command: PSRSTR
    params:
      - name: value
        type: enum
        values: [OFF, LOW, MED, HI]
        description: "Append a space and value after PSRSTR."

  - id: front_speaker
    label: Set Front Speaker
    kind: action
    command: PSFRONT
    params:
      - name: value
        type: enum
        values: [SPA, SPB, A+B]
        description: "Append a space and value after PSFRONT."

  - id: auro_preset
    label: Set Auro-Matic 3D Preset
    kind: action
    command: PSAUROPR
    params:
      - name: value
        type: enum
        values: [SMA, MED, LAR, SPE]
        description: "Append a space and value after PSAUROPR."
    notes: "Auro-3D Upgrade only."

  - id: auro_strength
    label: Set Auro-Matic 3D Strength
    kind: action
    command: PSAUROST
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 01=1, 10=10 ---AVR can be operated from 1 to 16"
    notes: "Append a space and value after PSAUROST. Auro-3D Upgrade only."

  - id: saturation_adjust
    label: Adjust Saturation
    kind: action
    command: PVST
    params:
      - name: value
        type: string
        description: "UP, DOWN; ***:000 to 100 by ASCII , 050=0 ---AVR can be operated from -50 to +50(000 to 100)"
    notes: "Append a space and value after PVST."

  - id: hue_adjust
    label: Adjust Hue
    kind: action
    command: PVHUE
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:44 to 56 by ASCII , 50=0 ---AVR can be operated from -6 to +6(44 to 56)"
    notes: "Append a space and value after PVHUE."

  - id: digital_noise_reduction
    label: Set Digital Noise Reduction
    kind: action
    command: PVDNR
    params:
      - name: value
        type: enum
        values: [OFF, LOW, MID, HI]
        description: "Append a space and value after PVDNR."

  - id: picture_enhancer
    label: Set Picture Enhancer
    kind: action
    command: PVENH
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 12 by ASCII, 00=0 ---AVR can be operated from 0 to 12"
    notes: "Append a space and value after PVENH."

  - id: zone2_quick_select
    label: Zone 2 Quick Select
    kind: action
    command: Z2QUICK
    params:
      - name: n
        type: integer
        description: "Z2 QUICK SELECT 1-5 MODE SELECT"
    notes: "Append n directly after Z2QUICK."

  - id: zone2_quick_select_memory
    label: Zone 2 Quick Select Memory
    kind: action
    command: Z2QUICK
    params:
      - name: n
        type: integer
        description: "Z2 QUICK SELECT 1-5 MODE MEMORY"
    notes: "Append n directly after Z2QUICK, then append ' MEMORY'."

  - id: zone2_favorite_memory
    label: Zone 2 Favorite Memory
    kind: action
    command: Z2FAVORITE
    params:
      - name: n
        type: integer
        description: "Z2 favorite 1-4 Mode select."
    notes: "Append n directly after Z2FAVORITE, then append ' MEMORY', as in Z2FAVORITE1 MEMORY."

  - id: zone2_channel_setting
    label: Zone 2 Channel Setting
    kind: action
    command: Z2CS
    params:
      - name: value
        type: enum
        values: [ST, MONO]
        description: "Append value directly after Z2CS."

  - id: zone2_channel_volume
    label: Zone 2 Set Channel Volume
    kind: action
    command: Z2CV
    params:
      - name: channel
        type: enum
        values: [FL, FR]
      - name: level
        type: string
        description: "UP, DOWN; **:38 to 62 by ASCII , 50=0dB"
    notes: "Append channel directly after Z2CV, then a space and level."

  - id: zone2_high_pass_filter
    label: Zone 2 Set High Pass Filter
    kind: action
    command: Z2HPF
    params:
      - name: value
        type: enum
        values: [ON, OFF]
        description: "Append value directly after Z2HPF."

  - id: zone2_bass_adjust
    label: Zone 2 Adjust Bass
    kind: action
    command: Z2PSBAS
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60) from -14 to +14 /2dBstep (36 to 64)※X4100 only"
    notes: "Append a space and value after Z2PSBAS."

  - id: zone2_treble_adjust
    label: Zone 2 Adjust Treble
    kind: action
    command: Z2PSTRE
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60) from -14 to +14 /2dBstep (36 to 64)※X4100 only"
    notes: "Append a space and value after Z2PSTRE."

  - id: zone2_hdmi_output
    label: Zone 2 Set HDMI Output
    kind: action
    command: Z2HDA
    params:
      - name: value
        type: enum
        values: [THR, PCM]
        description: "Append a space and value after Z2HDA."

  - id: zone2_auto_standby
    label: Zone 2 Set Auto Standby
    kind: action
    command: Z2STBY
    params:
      - name: value
        type: enum
        values: [2H, 4H, 8H, OFF]
        description: "Append value directly after Z2STBY."

  - id: zone3_quick_select
    label: Zone 3 Quick Select
    kind: action
    command: Z3QUICK
    params:
      - name: n
        type: integer
        description: "Z3 QUICK SELECT 1-5 MODE SELECT"
    notes: "Append n directly after Z3QUICK."

  - id: zone3_quick_select_memory
    label: Zone 3 Quick Select Memory
    kind: action
    command: Z3QUICK
    params:
      - name: n
        type: integer
        description: "Z3 QUICK SELECT 1-5 MODE MEMORY"
    notes: "Append n directly after Z3QUICK, then append ' MEMORY'."

  - id: zone3_favorite_memory
    label: Zone 3 Favorite Memory
    kind: action
    command: Z3FAVORITE
    params:
      - name: n
        type: integer
        description: "Z3 favorite 1-4 Mode select."
    notes: "Append n directly after Z3FAVORITE, then append ' MEMORY', as in Z3FAVORITE1 MEMORY."

  - id: zone3_channel_setting
    label: Zone 3 Channel Setting
    kind: action
    command: Z3CS
    params:
      - name: value
        type: enum
        values: [ST, MONO]
        description: "Append value directly after Z3CS."

  - id: zone3_channel_volume
    label: Zone 3 Set Channel Volume
    kind: action
    command: Z3CV
    params:
      - name: channel
        type: enum
        values: [FL, FR]
      - name: level
        type: string
        description: "UP, DOWN; **:38 to 62 by ASCII , 50=0dB"
    notes: "Append channel directly after Z3CV, then a space and level."

  - id: zone3_high_pass_filter
    label: Zone 3 Set High Pass Filter
    kind: action
    command: Z3HPF
    params:
      - name: value
        type: enum
        values: [ON, OFF]
        description: "Append value directly after Z3HPF."

  - id: zone3_bass_adjust
    label: Zone 3 Adjust Bass
    kind: action
    command: Z3PSBAS
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60) from -14 to +14 /2dBstep (36 to 64)※X4100 only"
    notes: "Append a space and value after Z3PSBAS."

  - id: zone3_treble_adjust
    label: Zone 3 Adjust Treble
    kind: action
    command: Z3PSTRE
    params:
      - name: value
        type: string
        description: "UP, DOWN; **:00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60) from -14 to +14 /2dBstep (36 to 64)※X4100 only"
    notes: "Append a space and value after Z3PSTRE."

  - id: zone3_auto_standby
    label: Zone 3 Set Auto Standby
    kind: action
    command: Z3STBY
    params:
      - name: value
        type: enum
        values: [2H, 4H, 8H, OFF]
        description: "Append value directly after Z3STBY."

  - id: tuner_frequency_set
    label: Set Tuner Frequency
    kind: action
    command: TFAN
    params:
      - name: frequency
        type: string
        description: "6 digits; ****.** kHz at AM band (>050000 is AM.) ****.**MHz at FM band (<050000 is FM.)"
    notes: "Append frequency directly after TFAN, as in TFAN105000."

  - id: tuner_preset_select
    label: Select Tuner Preset
    kind: action
    command: TPAN
    params:
      - name: n
        type: string
        description: "01-56 01=CH01,56=CH56"
    notes: "Append n directly after TPAN."

  - id: tuner_preset_memory
    label: Tuner Preset Memory
    kind: action
    command: TPANMEM
    params: []
    notes: "Source sequence: TPANMEM, then TPANUP or TPANDOWN or TPAN**, then TPANMEM."

  - id: tuner_preset_memory_set
    label: Set Tuner Preset Memory
    kind: action
    command: TPANMEM
    params:
      - name: n
        type: string
        description: "01-56 01=CH01,56=CH56"
    notes: "Append n directly after TPANMEM, as in TPANMEM01."

  - id: tuner_band
    label: Set Tuner Band
    kind: action
    command: TMAN
    params:
      - name: value
        type: enum
        values: [AM, FM]
        description: "Append value directly after TMAN."

  - id: tuner_tuning_mode
    label: Set Tuner Tuning Mode
    kind: action
    command: TMAN
    params:
      - name: value
        type: enum
        values: [AUTO, MANUAL]
        description: "Append value directly after TMAN."

  - id: hd_radio_frequency_up
    label: HD Radio Frequency Up
    kind: action
    command: TFHDUP
    params: []

  - id: hd_radio_frequency_down
    label: HD Radio Frequency Down
    kind: action
    command: TFHDDOWN
    params: []

  - id: hd_radio_frequency_set
    label: Set HD Radio Frequency
    kind: action
    command: TFHD
    params:
      - name: frequency
        type: string
        description: "6 digits; ****.** kHz at AM band (>050000 is AM.) ****.** MHz at FM band (<050000 is FM.)"
    notes: "Append frequency directly after TFHD, as in TFHD105000."

  - id: hd_radio_multicast_select
    label: Select HD Radio Multicast
    kind: action
    command: TFHDMC
    params:
      - name: channel
        type: integer
        description: "1 digit; Multi Cast 1～8, Analog 0"
    notes: "Append channel directly after TFHDMC."

  - id: hd_radio_frequency_multicast_set
    label: Set HD Radio Frequency And Multicast
    kind: action
    command: TFHD
    params:
      - name: frequency
        type: string
        description: "6 digits; ****.** kHz at AM band (>050000 is AM.) ****.** MHz at FM band (<050000 is FM.)"
      - name: channel
        type: integer
        description: "1 digit; Multi Cast 1～8, Analog 0"
    notes: "Append frequency, then MC, then channel directly after TFHD, as in TFHD008750MC5. Command only."

  - id: hd_radio_preset_up
    label: HD Radio Preset Up
    kind: action
    command: TPHDUP
    params: []

  - id: hd_radio_preset_down
    label: HD Radio Preset Down
    kind: action
    command: TPHDDOWN
    params: []

  - id: hd_radio_preset_select
    label: Select HD Radio Preset
    kind: action
    command: TPHD
    params:
      - name: n
        type: string
        description: "01-56 01=CH01,56=CH56"
    notes: "Append n directly after TPHD."

  - id: hd_radio_preset_memory
    label: HD Radio Preset Memory
    kind: action
    command: TPHDMEM
    params: []

  - id: hd_radio_preset_memory_set
    label: Set HD Radio Preset Memory
    kind: action
    command: TPHDMEM
    params:
      - name: n
        type: string
        description: "01-56 01=CH01,56=CH56"
    notes: "Append n directly after TPHDMEM, as in TPHDMEM01."

  - id: hd_radio_band
    label: Set HD Radio Band
    kind: action
    command: TMHD
    params:
      - name: value
        type: enum
        values: [AM, FM]
        description: "Append value directly after TMHD."

  - id: hd_radio_tuning_mode
    label: Set HD Radio Tuning Mode
    kind: action
    command: TMHD
    params:
      - name: value
        type: enum
        values: [AUTOHD, AUTO, MANUAL, ANAAUTO, ANAMANU]
        description: "Append value directly after TMHD."

  - id: usb_manual_search_plus
    label: Manual Search Plus
    kind: action
    command: NS9F
    params: []

  - id: usb_manual_search_minus
    label: Manual Search Minus
    kind: action
    command: NS9G
    params: []

  - id: ipod_mode_toggle
    label: Toggle iPod Mode
    kind: action
    command: NS9W
    params: []
    notes: "Toggle From iPod Mode/On Screen Mode."

  - id: usb_page_next
    label: Page Next
    kind: action
    command: NS9X
    params: []
    notes: "Except Bluetooth, AirPlay, Spotify remote."

  - id: usb_page_previous
    label: Page Previous
    kind: action
    command: NS9Y
    params: []
    notes: "Except Bluetooth, AirPlay, Spotify remote."

  - id: usb_manual_search_stop
    label: Manual Search Stop
    kind: action
    command: NS9Z
    params: []

  - id: usb_repeat_toggle
    label: Toggle Repeat
    kind: action
    command: NSRPT
    params: []

  - id: usb_random_toggle
    label: Toggle Random
    kind: action
    command: NSRND
    params: []

  - id: network_preset_call
    label: Call Network Preset
    kind: action
    command: NSB
    params:
      - name: n
        type: string
        description: "00-35(2014 AVR)"
    notes: "Append n directly after NSB, as in NSB00. Except Bluetooth, USB/iPod."

  - id: network_preset_memory
    label: Network Preset Memory
    kind: action
    command: NSC
    params:
      - name: n
        type: string
        description: "00-35(2014 AVR)"
    notes: "Append n directly after NSC, as in NSC00. Except Bluetooth, USB/iPod."

  - id: network_favorite_add
    label: Add Network Favorite
    kind: action
    command: NSFV MEM
    params: []

  - id: channel_level_menu_toggle
    label: Toggle Channel Level Menu
    kind: action
    command: MNCHL
    params: []

  - id: instaprevue_on
    label: InstaPrevue On
    kind: action
    command: MNPRV ON
    params: []

  - id: instaprevue_off
    label: InstaPrevue Off
    kind: action
    command: MNPRV OFF
    params: []

  - id: panel_volume_lock_on
    label: Panel And Volume Lock On
    kind: action
    command: SYPANEL+V LOCK ON
    params: []
    notes: "Locks panel buttons and MASTER VOL. SYPANEL LOCK OFF is the documented unlock command."

  - id: remote_maintenance_start
    label: Start Remote Maintenance
    kind: action
    command: RM STA
    params: []

  - id: remote_maintenance_end
    label: End Remote Maintenance
    kind: action
    command: RM END
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [PWON, PWSTANDBY]
    query: PW?
    query_command: PW?
    description: "Power state query."

  - id: master_volume
    type: string
    query: MV?
    query_command: MV?
    description: "Returns MV level (e.g. MV80). 80=0dB, 00=---(MIN)."

  - id: mute_state
    type: enum
    values: [MUON, MUOFF]
    query: MU?
    query_command: MU?
    description: "Mute state."

  - id: input_source
    type: string
    query: SI?
    query_command: SI?
    description: "Returns current input source (e.g. SIBD)."

  - id: main_zone_state
    type: enum
    values: [ZMON, ZMOFF]
    query: ZM?
    query_command: ZM?
    description: "Main zone power state."

  - id: surround_mode
    type: string
    query: MS?
    query_command: MS?
    description: "Returns current surround mode (e.g. MSDOLBY DIGITAL)."

  - id: input_mode
    type: string
    query: SD?
    query_command: SD?
    description: "Returns input mode (e.g. SDAUTO)."

  - id: digital_input_mode
    type: string
    query: DC?
    query_command: DC?
    description: "Returns digital input mode."

  - id: video_select_state
    type: string
    query: SV?
    query_command: SV?
    description: "Returns video select source and on/off state."

  - id: sleep_timer_state
    type: string
    query: SLP?
    query_command: SLP?
    description: "Returns sleep timer value."

  - id: auto_standby_state
    type: string
    query: STBY?
    query_command: STBY?
    description: "Returns auto standby setting."

  - id: eco_mode_state
    type: string
    query: ECO?
    query_command: ECO?
    description: "Returns ECO mode setting."

  - id: channel_volume
    type: string
    query: CV?
    query_command: CV?
    description: "Returns all channel volumes for configured speakers, terminated by CVEND."

  - id: bass_state
    type: string
    query: PSBAS ?
    query_command: PSBAS ?
    description: "Returns bass level (e.g. PSBAS 50)."

  - id: treble_state
    type: string
    query: PSTRE ?
    query_command: PSTRE ?
    description: "Returns treble level."

  - id: tone_control_state
    type: string
    query: PSTONE CTRL ?
    query_command: PSTONE CTRL ?
    description: "Returns tone control on/off."

  - id: dynamic_eq_state
    type: string
    query: PSDYNEQ ?
    query_command: PSDYNEQ ?
    description: "Returns Dynamic EQ state."

  - id: dynamic_volume_state
    type: string
    query: PSDYNVOL ?
    query_command: PSDYNVOL ?
    description: "Returns Dynamic Volume setting."

  - id: multeq_state
    type: string
    query: PSMULTEQ ?
    query_command: PSMULTEQ: ?
    description: "Returns MultEQ mode."

  - id: dialog_level_state
    type: string
    query: PSDIL ?
    query_command: PSDIL ?
    description: "Returns dialog level adjust state and value."

  - id: subwoofer_level_state
    type: string
    query: PSSWL ?
    query_command: PSSWL ?
    description: "Returns subwoofer level state and value."

  - id: cinema_eq_state
    type: string
    query: PSCINEMA EQ. ?
    query_command: PSCINEMA EQ. ?
    description: "Returns Cinema EQ state."

  - id: drc_state
    type: string
    query: PSDRC ?
    query_command: PSDRC ?
    description: "Returns Dynamic Compression setting."

  - id: dialog_enhancer_state
    type: string
    query: PSDEH ?
    query_command: PSDEH ?
    description: "Returns Dialog Enhancer setting."

  - id: picture_mode_state
    type: string
    query: PV?
    query_command: PV?
    description: "Returns picture mode."

  - id: contrast_state
    type: string
    query: PVCN ?
    query_command: PVCN ?
    description: "Returns contrast value."

  - id: brightness_state
    type: string
    query: PVBR ?
    query_command: PVBR ?
    description: "Returns brightness value."

  - id: hdmi_monitor_state
    type: string
    query: VSMONI ?
    query_command: VSMONI ?
    description: "Returns HDMI monitor output setting."

  - id: hdmi_audio_state
    type: string
    query: VSAUDIO ?
    query_command: VSAUDIO ?
    description: "Returns HDMI audio output setting."

  - id: resolution_state
    type: string
    query: VSSC ?
    query_command: VSSC ?
    description: "Returns resolution setting."

  - id: video_processing_state
    type: string
    query: VSVPM ?
    query_command: VSVPM ?
    description: "Returns video processing mode."

  - id: aspect_ratio_state
    type: string
    query: VSASP ?
    query_command: VSASP ?
    description: "Returns aspect ratio setting."

  - id: zone2_state
    type: string
    query: Z2?
    query_command: Z2?
    description: "Returns Zone 2 power and source state."

  - id: zone2_mute_state
    type: enum
    values: [Z2MUON, Z2MUOFF]
    query: Z2MU?
    query_command: Z2MU?

  - id: zone3_state
    type: string
    query: Z3?
    query_command: Z3?
    description: "Returns Zone 3 power and source state."

  - id: zone3_mute_state
    type: enum
    values: [Z3MUON, Z3MUOFF]
    query: Z3MU?
    query_command: Z3MU?

  - id: trigger_state
    type: string
    query: TR?
    query_command: TR?
    description: "Returns trigger 1 and 2 states."

  - id: dimmer_state
    type: string
    query: DIM ?
    query_command: DIM ?
    description: "Returns dimmer setting."

  - id: menu_state
    type: string
    query: MNMEN?
    query_command: MNMEN?
    description: "Returns menu on/off state."

  - id: all_zone_stereo_state
    type: string
    query: MNZST?
    query_command: MNZST?
    description: "Returns all zone stereo state."

  - id: graphic_eq_state
    type: string
    query: PSGEQ ?
    query_command: PSGEQ ?

  - id: loudness_management_state
    type: string
    query: PSLOM ?
    query_command: PSLOM ?

  - id: audyssey_lfc_state
    type: string
    query: PSLFC ?
    query_command: PSLFC ?

  - id: lfe_level_state
    type: string
    query: PSLFE ?
    query_command: PSLFE ?

  - id: audio_delay_state
    type: string
    query: PSDELAY?
    query_command: PSDELAY ?

  - id: tuner_frequency
    type: string
    query: TFAN?
    query_command: TFAN?
    description: "Returns frequency (e.g. TFAN105000 = 1050.00kHz AM)."

  - id: tuner_preset
    type: string
    query: TPAN?
    query_command: TPAN?
    description: "Returns preset number (e.g. TPAN01)."

  - id: tuner_band_mode
    type: string
    query: TMAN?
    query_command: TMAN?

  - id: hd_radio_status
    type: string
    query: HD?
    query_command: HD?
    description: "Returns band, station name, multicast, signal level, artist, title, album, genre."

  - id: onscreen_display_ascii
    type: string
    query: NSA
    query_command: NSA
    description: "Returns onscreen display lines NSA0-NSA8 (ASCII)."

  - id: onscreen_display_utf8
    type: string
    query: NSE
    query_command: NSE
    description: "Returns onscreen display lines NSE0-NSE8 (UTF-8)."

  - id: upgrade_id
    type: string
    query: UGIDN
    query_command: UGIDN
    description: "Returns 12-digit upgrade ID number."

  - id: remote_maintenance_state
    type: string
    query: RM ?
    query_command: RM ?
    description: "Returns RM ON or RM OFF."

  - id: record_select_state
    type: string
    query: SR?
    query_command: SR?
    description: "Returns SR status in REC mode or Z2 status in ZONE2 mode."

  - id: quick_select_state
    type: string
    query: MSQUICK ?
    query_command: MSQUICK ?
    description: "Returns MSQUICK status."

  - id: hdmi_resolution_state
    type: string
    query: VSSCH ?
    query_command: VSSCH ?
    description: "Returns HDMI resolution setting."

  - id: vertical_stretch_state
    type: string
    query: VSVST ?
    query_command: VSVST ?
    description: "Returns vertical stretch setting."

  - id: surround_parameter_mode_state
    type: string
    query: PSMODE: ?
    query_command: PSMODE: ?
    description: "Returns PSMODE: status; HEIGHT is documented as EVENT only."

  - id: front_height_output_state
    type: string
    query: PSFH: ?
    query_command: PSFH: ?
    description: "Returns front height output status."

  - id: speaker_output_state
    type: string
    query: PSSP: ?
    query_command: PSSP: ?
    description: "Returns speaker output setting."

  - id: height_gain_state
    type: string
    query: PSPHG ?
    query_command: PSPHG ?
    description: "Returns PL2z height gain."

  - id: reference_level_offset_state
    type: string
    query: PSREFLEV ?
    query_command: PSREFLEV ?
    description: "Returns reference level offset."

  - id: containment_amount_state
    type: string
    query: PSCNTAMT ?
    query_command: PSCNTAMT ?
    description: "Returns containment amount."

  - id: audyssey_dsx_state
    type: string
    query: PSDSX ?
    query_command: PSDSX ?
    description: "Returns Audyssey DSX status."

  - id: stage_width_state
    type: string
    query: PSSTW ?
    query_command: PSSTW ?
    description: "Returns stage width."

  - id: stage_height_state
    type: string
    query: PSSTH ?
    query_command: PSSTH ?
    description: "Returns stage height."

  - id: bass_sync_state
    type: string
    query: PSBSC ?
    query_command: PSBSC ?
    description: "Returns bass sync."

  - id: external_lfe_level_state
    type: string
    query: PSLFL ?
    query_command: PSLFL ?
    description: "Returns external input LFE level."

  - id: effect_level_state
    type: string
    query: PSEFF ?
    query_command: PSEFF ?
    description: "Returns effect level and, in WIDE SCREEN mode, effect on/off status."

  - id: surround_delay_state
    type: string
    query: PSDEL ?
    query_command: PSDEL ?
    description: "Returns surround delay."

  - id: panorama_state
    type: string
    query: PSPAN ?
    query_command: PSPAN ?
    description: "Returns panorama status."

  - id: dimension_state
    type: string
    query: PSDIM ?
    query_command: PSDIM ?
    description: "Returns dimension."

  - id: center_width_state
    type: string
    query: PSCEN ?
    query_command: PSCEN ?
    description: "Returns center width."

  - id: center_image_state
    type: string
    query: PSCEI ?
    query_command: PSCEI ?
    description: "Returns center image."

  - id: center_gain_state
    type: string
    query: PSCEG ?
    query_command: PSCEG ?
    description: "Returns center gain."

  - id: center_spread_state
    type: string
    query: PSCES ?
    query_command: PSCES ?
    description: "Returns center spread status."

  - id: subwoofer_output_state
    type: string
    query: PSSWR ?
    query_command: PSSWR ?
    description: "Returns subwoofer output status."

  - id: room_size_state
    type: string
    query: PSRSZ ?
    query_command: PSRSZ ?
    description: "Returns room size."

  - id: audio_restorer_state
    type: string
    query: PSRSTR ?
    query_command: PSRSTR ?
    description: "Returns audio restorer setting."

  - id: front_speaker_state
    type: string
    query: PSFRONT?
    query_command: PSFRONT?
    description: "Returns front speaker setting."

  - id: auro_preset_state
    type: string
    query: PSAUROPR ?
    query_command: PSAUROPR ?
    description: "Returns Auro-Matic 3D preset."

  - id: auro_strength_state
    type: string
    query: PSAUROST ?
    query_command: PSAUROST ?
    description: "Returns Auro-Matic 3D strength."

  - id: saturation_state
    type: string
    query: PVST ?
    query_command: PVST ?
    description: "Returns saturation."

  - id: hue_state
    type: string
    query: PVHUE ?
    query_command: PVHUE ?
    description: "Returns hue."

  - id: digital_noise_reduction_state
    type: string
    query: PVDNR ?
    query_command: PVDNR ?
    description: "Returns digital noise reduction setting."

  - id: picture_enhancer_state
    type: string
    query: PVENH ?
    query_command: PVENH ?
    description: "Returns picture enhancer setting."

  - id: zone2_quick_select_state
    type: string
    query: Z2QUICK ?
    query_command: Z2QUICK ?
    description: "Returns Zone 2 quick select status."

  - id: zone2_channel_setting_state
    type: string
    query: Z2CS?
    query_command: Z2CS?
    description: "Returns Zone 2 channel setting."

  - id: zone2_channel_volume_state
    type: string
    query: Z2CV?
    query_command: Z2CV?
    description: "Returns Zone 2 channel volumes."

  - id: zone2_high_pass_filter_state
    type: string
    query: Z2HPF?
    query_command: Z2HPF?
    description: "Returns Zone 2 high pass filter status."

  - id: zone2_bass_state
    type: string
    query: Z2PSBAS ?
    query_command: Z2PSBAS ?
    description: "Returns Zone 2 bass."

  - id: zone2_treble_state
    type: string
    query: Z2PSTRE ?
    query_command: Z2PSTRE ?
    description: "Returns Zone 2 treble."

  - id: zone2_hdmi_output_state
    type: string
    query: Z2HDA?
    query_command: Z2HDA?
    description: "Returns Zone 2 HDMI output setting."

  - id: zone2_sleep_timer_state
    type: string
    query: Z2SLP?
    query_command: Z2SLP?
    description: "Returns Zone 2 sleep timer."

  - id: zone2_auto_standby_state
    type: string
    query: Z2STBY?
    query_command: Z2STBY?
    description: "Returns Zone 2 auto standby setting."

  - id: zone3_quick_select_state
    type: string
    query: Z3QUICK ?
    query_command: Z3QUICK ?
    description: "Returns Zone 3 quick select status."

  - id: zone3_channel_setting_state
    type: string
    query: Z3CS?
    query_command: Z3CS?
    description: "Returns Zone 3 channel setting."

  - id: zone3_channel_volume_state
    type: string
    query: Z3CV?
    query_command: Z3CV?
    description: "Returns Zone 3 channel volumes."

  - id: zone3_high_pass_filter_state
    type: string
    query: Z3HPF?
    query_command: Z3HPF?
    description: "Returns Zone 3 high pass filter status."

  - id: zone3_bass_state
    type: string
    query: Z3PSBAS ?
    query_command: Z3PSBAS ?
    description: "Returns Zone 3 bass."

  - id: zone3_treble_state
    type: string
    query: Z3PSTRE ?
    query_command: Z3PSTRE ?
    description: "Returns Zone 3 treble."

  - id: zone3_sleep_timer_state
    type: string
    query: Z3SLP?
    query_command: Z3SLP?
    description: "Returns Zone 3 sleep timer."

  - id: zone3_auto_standby_state
    type: string
    query: Z3STBY?
    query_command: Z3STBY?
    description: "Returns Zone 3 auto standby setting."

  - id: tuner_station_name
    type: string
    query: TFANNAME?
    query_command: TFANNAME?
    description: "Returns RDS station name; EU,AP Only."

  - id: hd_radio_frequency
    type: string
    query: TFHD?
    query_command: TFHD?
    description: "Returns HD Radio frequency status."

  - id: hd_radio_preset
    type: string
    query: TPHD?
    query_command: TPHD?
    description: "Returns HD Radio preset status."

  - id: hd_radio_band_mode
    type: string
    query: TMHD?
    query_command: TMHD?
    description: "Returns HD Radio band and tuning mode status."

  - id: network_preset_names
    type: string
    query: NSH
    query_command: NSH
    description: "Returns UTF-8 Net Audio preset names, NSH00 through NSH35, 20 digits per name. Except Bluetooth, USB/iPod."

  - id: onscreen_display_ascii_page
    type: string
    query: NSA0
    query_command: NSA0
    description: "Source documents NSA0 as an onscreen display request example returning ASCII display lines."

  - id: onscreen_display_utf8_page
    type: string
    query: NSE0
    query_command: NSE0
    description: "Source documents NSE0 as an onscreen display request example returning UTF-8 display lines."

  - id: instaprevue_state
    type: string
    query: MNPRV?
    query_command: MNPRV?
    description: "Returns InstaPrevue status; MNPRV NG is status only when unavailable."
```

## Variables
```yaml
variables: []
# UNRESOLVED: all settable parameters are represented as Actions with params.
# No additional variables needed beyond what Actions cover.
```

## Events
```yaml
events:
  - id: power_event
    description: "Sent when power state changes via front panel or remote. Form: PWON or PWSTANDBY."
    pattern: "PW{ON|STANDBY}"

  - id: volume_event
    description: "Sent when master volume changes. Returns MV level."
    pattern: "MV{level}"

  - id: mute_event
    description: "Sent when mute state changes."
    pattern: "MU{ON|OFF}"

  - id: input_source_event
    description: "Sent when input source changes."
    pattern: "SI{source}"

  - id: surround_mode_event
    description: "Sent when surround mode changes. Present mode returned before new mode."
    pattern: "MS{mode}"

  - id: channel_volume_event
    description: "Sent when channel volume changes (e.g. on input source change). Returns all active channel levels."
    pattern: "CV{channel} {level}"

  - id: zone2_event
    description: "Sent when Zone 2 state changes."
    pattern: "Z2{state}"

  - id: zone3_event
    description: "Sent when Zone 3 state changes."
    pattern: "Z3{state}"
```

## Macros
```yaml
macros: []
# UNRESOLVED: no explicit multi-step sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >-
  Must wait 1 second after PWON before sending next command.
  Commands must be sent at 50ms minimum intervals.
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Command format: `COMMAND + PARAMETER + CR (0x0D)`. All ASCII, 2-char command codes.
- Commands must be sent at **50ms minimum intervals**.
- After `PWON`, wait **1 second** before next command.
- Volume encoding: two-digit ASCII (00-98). 80=0dB, 00=---(MIN). For 0.5dB steps, three digits (e.g. MV805 = -0.5dB).
- Channel volume range: 38-62, where 50=0dB. Subwoofer includes 00.
- Max communication data length: 135 bytes.
- Response to query (`?`) commands should arrive within 200ms.
- Events (unsolicited status changes) should arrive within 5 seconds of state change.
- Events for surround mode and channel volume are NOT sent when values are the same before/after input source change.
- Rec select mode: SR command controls record output source; ZONE2 and REC SELECT share the same query response.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: some surround mode commands may be model-specific (doc covers multiple Marantz/Denon AVR generations) -->
<!-- UNRESOLVED: HD Radio commands are North America model only -->
<!-- UNRESOLVED: Spotify commands are North America & Europe model only -->
<!-- UNRESOLVED: Pandora/SiriusXM/LASTFM commands may not apply to all regions -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:29:05.526Z
last_checked_at: 2026-10-07T20:50:49.860Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:50:49.860Z
matched_actions: 429
action_count: 429
confidence: medium
summary: "All 429 units match the generic multi-model Denon/Marantz protocol source with transport confirmed. The unmapped event/status-only tokens are not controller commands. The source does not name the SR6015. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version compatibility not stated"
- "some surround mode commands listed may not apply to SR6015 specifically (doc covers multiple AVR models)"
- "all settable parameters are represented as Actions with params."
- "no explicit multi-step sequences in source"
- "no explicit safety warnings or interlock procedures in source"
- "firmware version compatibility not stated"
- "some surround mode commands may be model-specific (doc covers multiple Marantz/Denon AVR generations)"
- "HD Radio commands are North America model only"
- "Spotify commands are North America & Europe model only"
- "Pandora/SiriusXM/LASTFM commands may not apply to all regions"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
