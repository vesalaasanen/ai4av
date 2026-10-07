---
spec_id: admin/denon-avrx5200-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVR-X5200 Series Control Spec"
manufacturer: Denon
model_family: AVR-X5200
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - AVR-X5200
    - AVR-X5200W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-23T19:19:43.416Z
last_checked_at: 2026-10-07T13:44:52.391Z
generated_at: 2026-10-07T13:44:52.391Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SDARC
  - "SYPANEL+V LOCK OFF"
  - "exact model variants in the series not fully enumerated"
  - "firmware version compatibility not stated"
  - "no continuous settable variables beyond what Actions cover"
  - "no multi-step sequences explicitly described in source"
  - "exact list of model variants in the X5200 series"
  - "maximum concurrent connection count for TCP"
  - "which surround modes apply to which specific X5200 model variant"
  - "HD Radio, Pandora, SiriusXM, Spotify, Last.fm availability by region"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:44:52.391Z
  matched_actions: 345
  action_count: 345
  confidence: medium
  summary: "All 345 action units match source literals and transport supported; only SDARC and a PANEL+V LOCK OFF form unrepresented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-23
---

# Denon AVR-X5200 Series Control Spec

## Summary
Denon AVR-X5200 series AV receiver with RS-232C and TCP/IP (Telnet) control. ASCII command protocol using 2-character command codes with parameters terminated by carriage return (0x0D). Covers main zone, Zone 2, Zone 3, tuner, online music/USB, and system control.

<!-- UNRESOLVED: exact model variants in the series not fully enumerated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

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
  - powerable    # inferred from PW command
  - routable     # inferred from SI command (input source select)
  - queryable    # inferred from ? query commands
  - levelable    # inferred from MV/CV volume commands
```

## Actions
```yaml
actions:
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
    label: Master Volume Set
    kind: action
    command: MV{value}
    params:
      - name: value
        type: string
        description: "00-98, 80=0dB, 00=---(MIN). 0.5dB step uses 3 chars e.g. 805"

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

  - id: surround_mode
    label: Surround Mode Select
    kind: action
    command: MS{mode}
    params:
      - name: mode
        type: enum
        values:
          - MOVIE
          - MUSIC
          - GAME
          - DIRECT
          - "PURE DIRECT"
          - STEREO
          - AUTO
          - "DOLBY DIGITAL"
          - "DTS SURROUND"
          - AURO3D
          - AURO2DSURR
          - "MCH STEREO"
          - "WIDE SCREEN"
          - "SUPER STADIUM"
          - "ROCK ARENA"
          - "JAZZ CLUB"
          - "CLASSIC CONCERT"
          - "MONO MOVIE"
          - MATRIX
          - "VIDEO GAME"
          - VIRTUAL
          - LEFT
          - RIGHT
          - QUICK1
          - QUICK2
          - QUICK3
          - QUICK4
          - QUICK5

  - id: quick_select_memory
    label: Quick Select Memory
    kind: action
    command: "MSQUICK{n} MEMORY"
    params:
      - name: slot
        type: integer
        description: "Quick select slot 1-5"

  - id: input_mode_set
    label: Input Mode Set
    kind: action
    command: SD{mode}
    params:
      - name: mode
        type: enum
        values: [AUTO, HDMI, DIGITAL, ANALOG, "EXT.IN", "7.1IN", NO]

  - id: digital_input_mode
    label: Digital Input Mode Set
    kind: action
    command: DC{mode}
    params:
      - name: mode
        type: enum
        values: [AUTO, PCM, DTS]

  - id: video_select
    label: Video Select Source
    kind: action
    command: SV{source}
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

  - id: sleep_timer
    label: Sleep Timer Set
    kind: action
    command: SLP{value}
    params:
      - name: value
        type: string
        description: "OFF or 001-120 minutes (ASCII, e.g. 010=10min)"

  - id: auto_standby
    label: Auto Standby Set
    kind: action
    command: STBY{value}
    params:
      - name: value
        type: enum
        values: ["15M", "30M", "60M", OFF]

  - id: eco_mode
    label: ECO Mode Set
    kind: action
    command: ECO{mode}
    params:
      - name: mode
        type: enum
        values: [ON, AUTO, OFF]

  - id: channel_volume_up
    label: Channel Volume Up
    kind: action
    command: "CV{channel} UP"
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]

  - id: channel_volume_down
    label: Channel Volume Down
    kind: action
    command: "CV{channel} DOWN"
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]

  - id: channel_volume_set
    label: Channel Volume Set
    kind: action
    command: "CV{channel} {value}"
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
      - name: value
        type: string
        description: "38-62 ASCII, 50=0dB"

  - id: channel_volume_reset
    label: Channel Volume Reset All
    kind: action
    command: CVZRL
    params: []

  - id: video_aspect_ratio
    label: Aspect Ratio Set
    kind: action
    command: VS{mode}
    params:
      - name: mode
        type: enum
        values: [ASPNRM, ASPFUL]

  - id: video_monitor_select
    label: HDMI Monitor Select
    kind: action
    command: VSMONI{output}
    params:
      - name: output
        type: enum
        values: [AUTO, "1", "2"]

  - id: video_resolution_set
    kind: action
    label: Video Resolution Set
    command: VSSC{mode}
    params:
      - name: mode
        type: enum
        values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]

  - id: hdmi_resolution_set
    kind: action
    label: HDMI Resolution Set
    command: VSSCH{mode}
    params:
      - name: mode
        type: enum
        values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]

  - id: hdmi_audio_output
    kind: action
    label: HDMI Audio Output Set
    command: "VSAUDIO {target}"
    params:
      - name: target
        type: enum
        values: [AMP, TV]

  - id: video_processing_mode
    kind: action
    label: Video Processing Mode Set
    command: VSVPM{mode}
    params:
      - name: mode
        type: enum
        values: [AUTO, GAME, MOVI]

  - id: vertical_stretch
    kind: action
    label: Vertical Stretch Set
    command: "VSVST {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: tone_control
    kind: action
    label: Tone Control Set
    command: "PSTONE CTRL {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: bass_adjust
    kind: action
    label: Bass Adjust
    command: "PSBAS {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "00-99 ASCII, 50=0dB, range 44-56"

  - id: treble_adjust
    kind: action
    label: Treble Adjust
    command: "PSTRE {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "00-99 ASCII, 50=0dB, range 44-56"

  - id: subwoofer_level_adjust
    kind: action
    label: Subwoofer Level Adjust
    command: "PSSWL {param}"
    params:
      - name: param
        type: enum
        values: [ON, OFF, UP, DOWN]

  - id: cinema_eq
    kind: action
    label: Cinema EQ Set
    command: "PSCINEMA EQ.{state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: dynamic_eq
    kind: action
    label: Dynamic EQ Set
    command: "PSDYNEQ {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: dynamic_volume
    kind: action
    label: Dynamic Volume Set
    command: "PSDYNVOL {mode}"
    params:
      - name: mode
        type: enum
        values: [HEV, MED, LIT, OFF]

  - id: reference_level_offset
    kind: action
    label: Reference Level Offset Set
    command: "PSREFLEV {value}"
    params:
      - name: value
        type: enum
        values: ["0", "5", "10", "15"]

  - id: multeq_mode
    kind: action
    label: MultEQ Mode Set
    command: "PSMULTEQ:{mode}"
    params:
      - name: mode
        type: enum
        values: [AUDYSSEY, BYP.LR, FLAT, OFF]

  - id: audyssey_lfc
    kind: action
    label: Audyssey LFC Set
    command: "PSLFC {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: containment_amount
    kind: action
    label: Containment Amount Adjust
    command: "PSCNTAMT {param}"
    params:
      - name: param
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "00-99 ASCII, range 01-07"

  - id: audyssey_dsx
    kind: action
    label: Audyssey DSX Set
    command: "PSDSX {mode}"
    params:
      - name: mode
        type: enum
        values: [ONHW, ONH, ONW, OFF]

  - id: stage_width
    kind: action
    label: Stage Width Adjust
    command: "PSSTW {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "00-99 ASCII, 50=0dB, range 40-60"

  - id: stage_height
    kind: action
    label: Stage Height Adjust
    command: "PSSTH {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "00-99 ASCII, 50=0dB, range 40-60"

  - id: graphic_eq
    kind: action
    label: Graphic EQ Set
    command: "PSGEQ {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: dynamic_compression
    kind: action
    label: Dynamic Compression Set
    command: "PSDRC {mode}"
    params:
      - name: mode
        type: enum
        values: [AUTO, LOW, MID, HI, OFF]

  - id: audio_delay
    kind: action
    label: Audio Delay Adjust
    command: "PSDELAY {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "000-999 ASCII ms, range 0-200"

  - id: dialogue_enhancer
    kind: action
    label: Dialogue Enhancer Set
    command: "PSDEH {mode}"
    params:
      - name: mode
        type: enum
        values: [OFF, LOW, MED, HIGH]

  - id: picture_mode
    kind: action
    label: Picture Mode Set
    command: "PV{mode}"
    params:
      - name: mode
        type: enum
        values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]

  - id: contrast_adjust
    kind: action
    label: Contrast Adjust
    command: "PVCN {param}"
    params:
      - name: param
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "000-100 ASCII, 050=0"

  - id: brightness_adjust
    kind: action
    label: Brightness Adjust
    command: "PVBR {param}"
    params:
      - name: param
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "000-100 ASCII, 050=0"

  - id: saturation_adjust
    kind: action
    label: Saturation Adjust
    command: "PVST {param}"
    params:
      - name: param
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "000-100 ASCII, 050=0"

  - id: hue_adjust
    kind: action
    label: Hue Adjust
    command: "PVHUE {param}"
    params:
      - name: param
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "44-56 ASCII, 50=0"

  - id: dnr_set
    kind: action
    label: DNR Set
    command: "PVDNR {mode}"
    params:
      - name: mode
        type: enum
        values: [OFF, LOW, MID, HI]

  - id: enhancer_adjust
    kind: action
    label: Enhancer Adjust
    command: "PVENH {param}"
    params:
      - name: param
        type: enum
        values: [UP, DOWN]
      - name: value
        type: string
        description: "00-12 ASCII"

  - id: zone2_on
    kind: action
    label: Zone 2 On
    command: Z2ON
    params: []

  - id: zone2_off
    kind: action
    label: Zone 2 Off
    command: Z2OFF
    params: []

  - id: zone2_source
    kind: action
    label: Zone 2 Source Select
    command: "Z2{source}"
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]

  - id: zone2_volume_up
    kind: action
    label: Zone 2 Volume Up
    command: Z2UP
    params: []

  - id: zone2_volume_down
    kind: action
    label: Zone 2 Volume Down
    command: Z2DOWN
    params: []

  - id: zone2_volume_set
    kind: action
    label: Zone 2 Volume Set
    command: "Z2{value}"
    params:
      - name: value
        type: string
        description: "00-98 ASCII, 80=0dB, 00=---(MIN)"

  - id: zone2_mute_on
    kind: action
    label: Zone 2 Mute On
    command: Z2MUON
    params: []

  - id: zone2_mute_off
    kind: action
    label: Zone 2 Mute Off
    command: Z2MUOFF
    params: []

  - id: zone2_channel_set
    kind: action
    label: Zone 2 Channel Setting
    command: "Z2CS{mode}"
    params:
      - name: mode
        type: enum
        values: [ST, MONO]

  - id: zone2_hpf
    kind: action
    label: Zone 2 HPF Set
    command: "Z2HPF{state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: zone2_sleep_timer
    kind: action
    label: Zone 2 Sleep Timer Set
    command: "Z2SLP{value}"
    params:
      - name: value
        type: string
        description: "OFF or 001-120 minutes"

  - id: zone2_auto_standby
    kind: action
    label: Zone 2 Auto Standby Set
    command: "Z2STBY{value}"
    params:
      - name: value
        type: enum
        values: ["2H", "4H", "8H", OFF]

  - id: zone2_quick_select
    kind: action
    label: Zone 2 Quick Select
    command: "Z2QUICK{n}"
    params:
      - name: slot
        type: integer
        description: "Quick select slot 1-5"

  - id: zone3_on
    kind: action
    label: Zone 3 On
    command: Z3ON
    params: []

  - id: zone3_off
    kind: action
    label: Zone 3 Off
    command: Z3OFF
    params: []

  - id: zone3_source
    kind: action
    label: Zone 3 Source Select
    command: "Z3{source}"
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]

  - id: zone3_volume_up
    kind: action
    label: Zone 3 Volume Up
    command: Z3UP
    params: []

  - id: zone3_volume_down
    kind: action
    label: Zone 3 Volume Down
    command: Z3DOWN
    params: []

  - id: zone3_volume_set
    kind: action
    label: Zone 3 Volume Set
    command: "Z3{value}"
    params:
      - name: value
        type: string
        description: "00-98 ASCII, 80=0dB, 00=---(MIN)"

  - id: zone3_mute_on
    kind: action
    label: Zone 3 Mute On
    command: Z3MUON
    params: []

  - id: zone3_mute_off
    kind: action
    label: Zone 3 Mute Off
    command: Z3MUOFF
    params: []

  - id: zone3_sleep_timer
    kind: action
    label: Zone 3 Sleep Timer Set
    command: "Z3SLP{value}"
    params:
      - name: value
        type: string
        description: "OFF or 001-120 minutes"

  - id: zone3_auto_standby
    kind: action
    label: Zone 3 Auto Standby Set
    command: "Z3STBY{value}"
    params:
      - name: value
        type: enum
        values: ["2H", "4H", "8H", OFF]

  - id: zone3_quick_select
    kind: action
    label: Zone 3 Quick Select
    command: "Z3QUICK{n}"
    params:
      - name: slot
        type: integer
        description: "Quick select slot 1-5"

  - id: trigger1_on
    kind: action
    label: Trigger 1 On
    command: "TR1 ON"
    params: []

  - id: trigger1_off
    kind: action
    label: Trigger 1 Off
    command: "TR1 OFF"
    params: []

  - id: trigger2_on
    kind: action
    label: Trigger 2 On
    command: "TR2 ON"
    params: []

  - id: trigger2_off
    kind: action
    label: Trigger 2 Off
    command: "TR2 OFF"
    params: []

  - id: dimmer_set
    kind: action
    label: Dimmer Set
    command: "DIM {mode}"
    params:
      - name: mode
        type: enum
        values: [BRI, DIM, DAR, OFF, SEL]

  - id: all_zone_stereo_on
    kind: action
    label: All Zone Stereo On
    command: "MNZST ON"
    params: []

  - id: all_zone_stereo_off
    kind: action
    label: All Zone Stereo Off
    command: "MNZST OFF"
    params: []

  - id: setup_menu_on
    kind: action
    label: Setup Menu On
    command: "MNMEN ON"
    params: []

  - id: setup_menu_off
    kind: action
    label: Setup Menu Off
    command: "MNMEN OFF"
    params: []

  - id: remote_lock_on
    kind: action
    label: Remote Lock On
    command: "SYREMOTE LOCK ON"
    params: []

  - id: remote_lock_off
    kind: action
    label: Remote Lock Off
    command: "SYREMOTE LOCK OFF"
    params: []

  - id: panel_lock_on
    kind: action
    label: Panel Lock On
    command: "SYPANEL LOCK ON"
    params: []

  - id: panel_lock_off
    kind: action
    label: Panel Lock Off
    command: "SYPANEL LOCK OFF"
    params: []

  - id: panel_vol_lock_on
    kind: action
    label: Panel + Volume Lock On
    command: "SYPANEL+V LOCK ON"
    params: []

  - id: remote_maintenance_start
    kind: action
    label: Remote Maintenance Start
    command: "RM STA"
    params: []

  - id: remote_maintenance_end
    kind: action
    label: Remote Maintenance End
    command: "RM END"
    params: []

  - id: tuner_freq_up
    kind: action
    label: Tuner Frequency Up
    command: TFANUP
    params: []

  - id: tuner_freq_down
    kind: action
    label: Tuner Frequency Down
    command: TFANDOWN
    params: []

  - id: tuner_freq_set
    kind: action
    label: Tuner Frequency Set
    command: "TFAN{freq}"
    params:
      - name: freq
        type: string
        description: "6 digits, >050000=AM kHz, <050000=FM MHz"

  - id: tuner_preset_up
    kind: action
    label: Tuner Preset Up
    command: TPANUP
    params: []

  - id: tuner_preset_down
    kind: action
    label: Tuner Preset Down
    command: TPANDOWN
    params: []

  - id: tuner_preset_select
    kind: action
    label: Tuner Preset Select
    command: "TPAN{num}"
    params:
      - name: num
        type: string
        description: "01-56"

  - id: tuner_preset_memory
    kind: action
    label: Tuner Preset Memory
    command: TPANMEM
    params: []

  - id: tuner_band_am
    kind: action
    label: Tuner Band AM
    command: TMANAM
    params: []

  - id: tuner_band_fm
    kind: action
    label: Tuner Band FM
    command: TMANFM
    params: []

  - id: net_usb_cursor_up
    kind: action
    label: Net/USB Cursor Up
    command: NS90
    params: []

  - id: net_usb_cursor_down
    kind: action
    label: Net/USB Cursor Down
    command: NS91
    params: []

  - id: net_usb_cursor_left
    kind: action
    label: Net/USB Cursor Left
    command: NS92
    params: []

  - id: net_usb_cursor_right
    kind: action
    label: Net/USB Cursor Right
    command: NS93
    params: []

  - id: net_usb_enter
    kind: action
    label: Net/USB Enter
    command: NS94
    params: []

  - id: net_usb_play
    kind: action
    label: Net/USB Play
    command: NS9A
    params: []

  - id: net_usb_pause
    kind: action
    label: Net/USB Pause
    command: NS9B
    params: []

  - id: net_usb_stop
    kind: action
    label: Net/USB Stop
    command: NS9C
    params: []

  - id: net_usb_skip_plus
    kind: action
    label: Net/USB Skip Forward
    command: NS9D
    params: []

  - id: net_usb_skip_minus
    kind: action
    label: Net/USB Skip Backward
    command: NS9E
    params: []

  - id: net_usb_search_plus
    kind: action
    label: Net/USB Search Forward
    command: NS9F
    params: []

  - id: net_usb_search_minus
    kind: action
    label: Net/USB Search Backward
    command: NS9G
    params: []

  - id: net_usb_repeat_one
    kind: action
    label: Net/USB Repeat One
    command: NS9H
    params: []

  - id: net_usb_repeat_all
    kind: action
    label: Net/USB Repeat All
    command: NS9I
    params: []

  - id: net_usb_repeat_off
    kind: action
    label: Net/USB Repeat Off
    command: NS9J
    params: []

  - id: net_usb_random_on
    kind: action
    label: Net/USB Random On
    command: NS9K
    params: []

  - id: net_usb_random_off
    kind: action
    label: Net/USB Random Off
    command: NS9M
    params: []

  - id: net_usb_preset_call
    kind: action
    label: Net/USB Preset Call
    command: "NSB{num}"
    params:
      - name: num
        type: string
        description: "00-35"

  - id: net_usb_preset_memory
    kind: action
    label: Net/USB Preset Memory
    command: "NSC{num}"
    params:
      - name: num
        type: string
        description: "00-35"

  - id: main_zone_favorite_select
    kind: action
    label: Main Zone Favorite Select
    command: "ZMFAVORITE{slot}"
    params:
      - name: slot
        type: integer
        description: "favorite 1-4 Mode select."

  - id: main_zone_favorite_memory
    kind: action
    label: Main Zone Favorite Memory
    command: "ZMFAVORITE{slot} MEMORY"
    params:
      - name: slot
        type: integer
        description: "favorite 1-4 Mode select."

  - id: record_source_select
    kind: action
    label: Record Source Select
    command: "SR{source}"
    params:
      - name: source
        type: enum
        values: [PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP, IPOD, "USB DIRECT", "IPOD DIRECT", SOURCE]

  - id: zone2_direct_source_select
    kind: action
    label: Zone 2 Direct Source Select
    command: "Z2{source} DIRECT"
    params:
      - name: source
        type: enum
        values: [USB, IPOD]

  - id: bass_set
    kind: action
    label: Bass Set
    command: "PSBAS {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 50=0dB; AVR can be operated from -6 to +6(44 to 56)"

  - id: treble_set
    kind: action
    label: Treble Set
    command: "PSTRE {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 50=0dB; AVR can be operated from -6 to +6(44 to 56)"

  - id: dialog_level_control
    kind: action
    label: Dialog Level Control
    command: "PSDIL {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: dialog_level_adjust
    kind: action
    label: Dialog Level Adjust
    command: "PSDIL {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: dialog_level_set
    kind: action
    label: Dialog Level Set
    command: "PSDIL {value}"
    params:
      - name: value
        type: string
        description: "38 to 62 by ASCII , 50=0dB"

  - id: subwoofer_level_set
    kind: action
    label: Subwoofer Level Set
    command: "PSSWL {value}"
    params:
      - name: value
        type: string
        description: "00,38 to 62 by ASCII , 50=0dB"

  - id: subwoofer2_level_adjust
    kind: action
    label: Subwoofer 2 Level Adjust
    command: "PSSWL2 {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: subwoofer2_level_set
    kind: action
    label: Subwoofer 2 Level Set
    command: "PSSWL2 {value}"
    params:
      - name: value
        type: string
        description: "00,38 to 62 by ASCII , 50=0dB"

  - id: surround_parameter_mode
    kind: action
    label: Surround Parameter Mode Set
    command: "PSMODE:{mode}"
    params:
      - name: mode
        type: enum
        values: [MUSIC, CINEMA, GAME, "PRO LOGIC"]

  - id: loudness_management
    kind: action
    label: Loudness Management Set
    command: "PSLOM {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: front_height_output
    kind: action
    label: Front Height Output Set
    command: "PSFH:{state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: speaker_output
    kind: action
    label: Speaker Output Set
    command: "PSSP:{mode}"
    params:
      - name: mode
        type: enum
        values: [FW, FH, SB, HW, BH, BW, FL, HF, FR]

  - id: height_gain
    kind: action
    label: Height Gain Set
    command: "PSPHG {mode}"
    params:
      - name: mode
        type: enum
        values: [LOW, MID, HI]

  - id: multeq_manual
    kind: action
    label: MultEQ Manual
    command: "PSMULTEQ:MANUAL"
    params: []

  - id: containment_amount_set
    kind: action
    label: Containment Amount Set
    command: "PSCNTAMT {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0; AVR can be operated from 1 to 7 (01 to 07)"

  - id: stage_width_set
    kind: action
    label: Stage Width Set
    command: "PSSTW {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"

  - id: stage_height_set
    kind: action
    label: Stage Height Set
    command: "PSSTH {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"

  - id: bass_sync_adjust
    kind: action
    label: Bass Sync Adjust
    command: "PSBSC {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: bass_sync_set
    kind: action
    label: Bass Sync Set
    command: "PSBSC {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 16"

  - id: lfe_up
    kind: action
    label: LFE Up
    command: "PSLEE UP"
    params: []

  - id: lfe_down
    kind: action
    label: LFE Down
    command: "PSLFE DOWN"
    params: []

  - id: lfe_set
    kind: action
    label: LFE Set
    command: "PSLFE {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0dB, 10=-10dB; AVR can be operated from 0 to -10"

  - id: external_input_lfe_level
    kind: action
    label: External Input LFE Level Set
    command: "PSLFL {value}"
    params:
      - name: value
        type: enum
        values: ["00", "05", "10", "15"]

  - id: effect_control
    kind: action
    label: Effect Control Set
    command: "PSEFF {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: effect_level_adjust
    kind: action
    label: Effect Level Adjust
    command: "PSEFF {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: effect_level_set
    kind: action
    label: Effect Level Set
    command: "PSEFF {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0dB, 10=10dB; AVR can be operated from 1 to 15"

  - id: surround_delay_adjust
    kind: action
    label: Surround Delay Adjust
    command: "PSDEL {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: surround_delay_set
    kind: action
    label: Surround Delay Set
    command: "PSDEL {value}"
    params:
      - name: value
        type: string
        description: "000 to 999 by ASCII , 000=0ms, 300=300ms; AVR can be operated from 0 to 300; 0-60ms:3ms/Step Over 60ms:10ms/Step"

  - id: panorama
    kind: action
    label: Panorama Set
    command: "PSPAN {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: dimension_adjust
    kind: action
    label: Dimension Adjust
    command: "PSDIM {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: dimension_set
    kind: action
    label: Dimension Set
    command: "PSDIM {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 6"

  - id: center_width_adjust
    kind: action
    label: Center Width Adjust
    command: "PSCEN {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: center_width_set
    kind: action
    label: Center Width Set
    command: "PSCEN {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 7"

  - id: center_image_adjust
    kind: action
    label: Center Image Adjust
    command: "PSCEI {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: center_image_set
    kind: action
    label: Center Image Set
    command: "PSCEI {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"

  - id: center_gain_adjust
    kind: action
    label: Center Gain Adjust
    command: "PSCEG {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: center_gain_set
    kind: action
    label: Center Gain Set
    command: "PSCEG {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"

  - id: center_spread
    kind: action
    label: Center Spread Set
    command: "PSCES {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: subwoofer_output
    kind: action
    label: Subwoofer Output Set
    command: "PSSWR {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: room_size
    kind: action
    label: Room Size Set
    command: "PSRSZ {mode}"
    params:
      - name: mode
        type: enum
        values: [S, MS, M, ML, L]

  - id: audio_delay_set
    kind: action
    label: Audio Delay Set
    command: "PSDELAY {value}"
    params:
      - name: value
        type: string
        description: "000 to 999 by ASCII , 000=0ms, 200=200ms; AVR can be operated from 0 to 200"

  - id: audio_restorer
    kind: action
    label: Audio Restorer Set
    command: "PSRSTR {mode}"
    params:
      - name: mode
        type: enum
        values: [OFF, LOW, MED, HI]

  - id: front_speaker
    kind: action
    label: Front Speaker Set
    command: "PSFRONT {mode}"
    params:
      - name: mode
        type: enum
        values: [SPA, SPB, "A+B"]

  - id: auro_matic_preset
    kind: action
    label: Auro-Matic Preset Set
    command: "PSAUROPR {mode}"
    params:
      - name: mode
        type: enum
        values: [SMA, MED, LAR, SPE]

  - id: auro_matic_strength_adjust
    kind: action
    label: Auro-Matic Strength Adjust
    command: "PSAUROST {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: auro_matic_strength_set
    kind: action
    label: Auro-Matic Strength Set
    command: "PSAUROST {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 01=1, 10=10; AVR can be operated from 1 to 16"

  - id: contrast_set
    kind: action
    label: Contrast Set
    command: "PVCN {value}"
    params:
      - name: value
        type: string
        description: "000 to 100 by ASCII , 050=0; AVR can be operated from -50 to +50(000 to 100)"

  - id: brightness_set
    kind: action
    label: Brightness Set
    command: "PVBR {value}"
    params:
      - name: value
        type: string
        description: "000 to 100 by ASCII , 050=0; AVR can be operated from -50 to +50(000 to 100)"

  - id: saturation_set
    kind: action
    label: Saturation Set
    command: "PVST {value}"
    params:
      - name: value
        type: string
        description: "000 to 100 by ASCII , 050=0; AVR can be operated from -50 to +50(000 to 100)"

  - id: hue_set
    kind: action
    label: Hue Set
    command: "PVHUE {value}"
    params:
      - name: value
        type: string
        description: "44 to 56 by ASCII , 50=0; AVR can be operated from -6 to +6(44 to 56)"

  - id: enhancer_set
    kind: action
    label: Enhancer Set
    command: "PVENH {value}"
    params:
      - name: value
        type: string
        description: "00 to 12 by ASCII, 00=0; AVR can be operated from 0 to 12"

  - id: zone2_quick_select_memory
    kind: action
    label: Zone 2 Quick Select Memory
    command: "Z2QUICK{slot} MEMORY"
    params:
      - name: slot
        type: integer
        description: "Z2 QUICK SELECT 1-5 MODE MEMORY"

  - id: zone2_favorite_select
    kind: action
    label: Zone 2 Favorite Select
    command: "Z2FAVORITE{slot}"
    params:
      - name: slot
        type: integer
        description: "Z2 favorite 1-4 Mode select."

  - id: zone2_favorite_memory
    kind: action
    label: Zone 2 Favorite Memory
    command: "Z2FAVORITE{slot} MEMORY"
    params:
      - name: slot
        type: integer
        description: "Z2 favorite 1-4 Mode select."

  - id: zone2_channel_volume_up
    kind: action
    label: Zone 2 Channel Volume Up
    command: "Z2CV{channel} UP"
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: zone2_channel_volume_down
    kind: action
    label: Zone 2 Channel Volume Down
    command: "Z2CV{channel} DOWN"
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: zone2_channel_volume_set
    kind: action
    label: Zone 2 Channel Volume Set
    command: "Z2CV{channel} {value}"
    params:
      - name: channel
        type: enum
        values: [FL, FR]
      - name: value
        type: string
        description: "38 to 62 by ASCII , 50=0dB"

  - id: zone2_bass_adjust
    kind: action
    label: Zone 2 Bass Adjust
    command: "Z2PSBAS {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: zone2_bass_set
    kind: action
    label: Zone 2 Bass Set
    command: "Z2PSBAS {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"

  - id: zone2_treble_adjust
    kind: action
    label: Zone 2 Treble Adjust
    command: "Z2PSTRE {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: zone2_treble_set
    kind: action
    label: Zone 2 Treble Set
    command: "Z2PSTRE {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"

  - id: zone2_hdmi_audio_output
    kind: action
    label: Zone 2 HDMI Audio Output Set
    command: "Z2HDA {mode}"
    params:
      - name: mode
        type: enum
        values: [THR, PCM]

  - id: zone3_quick_select_memory
    kind: action
    label: Zone 3 Quick Select Memory
    command: "Z3QUICK{slot} MEMORY"
    params:
      - name: slot
        type: integer
        description: "Z3 QUICK SELECT 1-5 MODE MEMORY"

  - id: zone3_favorite_select
    kind: action
    label: Zone 3 Favorite Select
    command: "Z3FAVORITE{slot}"
    params:
      - name: slot
        type: integer
        description: "Z3 favorite 1-4 Mode select."

  - id: zone3_favorite_memory
    kind: action
    label: Zone 3 Favorite Memory
    command: "Z3FAVORITE{slot} MEMORY"
    params:
      - name: slot
        type: integer
        description: "Z3 favorite 1-4 Mode select."

  - id: zone3_channel_set
    kind: action
    label: Zone 3 Channel Setting
    command: "Z3CS{mode}"
    params:
      - name: mode
        type: enum
        values: [ST, MONO]

  - id: zone3_channel_volume_up
    kind: action
    label: Zone 3 Channel Volume Up
    command: "Z3CV{channel} UP"
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: zone3_channel_volume_down
    kind: action
    label: Zone 3 Channel Volume Down
    command: "Z3CV{channel} DOWN"
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: zone3_channel_volume_set
    kind: action
    label: Zone 3 Channel Volume Set
    command: "Z3CV{channel} {value}"
    params:
      - name: channel
        type: enum
        values: [FL, FR]
      - name: value
        type: string
        description: "38 to 62 by ASCII , 50=0dB"

  - id: zone3_hpf
    kind: action
    label: Zone 3 HPF Set
    command: "Z3HPF{state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: zone3_bass_adjust
    kind: action
    label: Zone 3 Bass Adjust
    command: "Z3PSBAS {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: zone3_bass_set
    kind: action
    label: Zone 3 Bass Set
    command: "Z3PSBAS {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"

  - id: zone3_treble_adjust
    kind: action
    label: Zone 3 Treble Adjust
    command: "Z3PSTRE {direction}"
    params:
      - name: direction
        type: enum
        values: [UP, DOWN]

  - id: zone3_treble_set
    kind: action
    label: Zone 3 Treble Set
    command: "Z3PSTRE {value}"
    params:
      - name: value
        type: string
        description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"

  - id: tuner_preset_memory_set
    kind: action
    label: Tuner Preset Memory Set
    command: "TPANMEM{num}"
    params:
      - name: num
        type: string
        description: "01-56 01=CH01,56=CH56"

  - id: tuner_tuning_mode
    kind: action
    label: Tuner Tuning Mode Set
    command: "TMAN{mode}"
    params:
      - name: mode
        type: enum
        values: [AUTO, MANUAL]

  - id: hd_radio_freq_up
    kind: action
    label: HD Radio Frequency Up
    command: TFHDUP
    params: []

  - id: hd_radio_freq_down
    kind: action
    label: HD Radio Frequency Down
    command: TFHDDOWN
    params: []

  - id: hd_radio_freq_set
    kind: action
    label: HD Radio Frequency Set
    command: "TFHD{freq}"
    params:
      - name: freq
        type: string
        description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.)"

  - id: hd_radio_multicast_select
    kind: action
    label: HD Radio Multicast Select
    command: "TFHDMC{channel}"
    params:
      - name: channel
        type: integer
        description: "1 digit; Multi Cast 1～8, Analog 0"

  - id: hd_radio_freq_multicast_set
    kind: action
    label: HD Radio Frequency And Multicast Set
    command: "TFHD{freq}MC{channel}"
    params:
      - name: freq
        type: string
        description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.)"
      - name: channel
        type: integer
        description: "1 digit; Multi Cast 1～8, Analog 0"

  - id: hd_radio_preset_up
    kind: action
    label: HD Radio Preset Up
    command: TPHDUP
    params: []

  - id: hd_radio_preset_down
    kind: action
    label: HD Radio Preset Down
    command: TPHDDOWN
    params: []

  - id: hd_radio_preset_select
    kind: action
    label: HD Radio Preset Select
    command: "TPHD{num}"
    params:
      - name: num
        type: string
        description: "01-56 01=CH01,56=CH56"

  - id: hd_radio_preset_memory
    kind: action
    label: HD Radio Preset Memory
    command: TPHDMEM
    params: []

  - id: hd_radio_preset_memory_set
    kind: action
    label: HD Radio Preset Memory Set
    command: "TPHDMEM{num}"
    params:
      - name: num
        type: string
        description: "01-56 01=CH01,56=CH56"

  - id: hd_radio_band_am
    kind: action
    label: HD Radio Band AM
    command: TMHDAM
    params: []

  - id: hd_radio_band_fm
    kind: action
    label: HD Radio Band FM
    command: TMHDFM
    params: []

  - id: hd_radio_tuning_mode
    kind: action
    label: HD Radio Tuning Mode Set
    command: "TMHD{mode}"
    params:
      - name: mode
        type: enum
        values: [AUTOHD, AUTO, MANUAL, ANAAUTO, ANAMANU]

  - id: net_usb_ipod_mode_toggle
    kind: action
    label: Net/USB iPod Mode Toggle
    command: NS9W
    params: []

  - id: net_usb_page_next
    kind: action
    label: Net/USB Page Next
    command: NS9X
    params: []

  - id: net_usb_page_previous
    kind: action
    label: Net/USB Page Previous
    command: NS9Y
    params: []

  - id: net_usb_search_stop
    kind: action
    label: Net/USB Search Stop
    command: NS9Z
    params: []

  - id: net_usb_repeat_toggle
    kind: action
    label: Net/USB Repeat Toggle
    command: NSRPT
    params: []

  - id: net_usb_random_toggle
    kind: action
    label: Net/USB Random Toggle
    command: NSRND
    params: []

  - id: net_usb_favorites_add
    kind: action
    label: Net/USB Favorites Add
    command: "NSFV MEM"
    params: []

  - id: system_cursor_up
    kind: action
    label: System Cursor Up
    command: MNCUP
    params: []

  - id: system_cursor_down
    kind: action
    label: System Cursor Down
    command: MNCDN
    params: []

  - id: system_cursor_left
    kind: action
    label: System Cursor Left
    command: MNCLT
    params: []

  - id: system_cursor_right
    kind: action
    label: System Cursor Right
    command: MNCRT
    params: []

  - id: system_enter
    kind: action
    label: System Enter
    command: MNENT
    params: []

  - id: system_return
    kind: action
    label: System Return
    command: MNRTN
    params: []

  - id: system_option
    kind: action
    label: System Option
    command: MNOPT
    params: []

  - id: system_info
    kind: action
    label: System Info
    command: MNINF
    params: []

  - id: channel_level_menu_toggle
    kind: action
    label: Channel Level Menu Toggle
    command: MNCHL
    params: []

  - id: insta_prevue
    kind: action
    label: InstaPrevue Set
    command: "MNPRV {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: upgrade_id_display
    kind: action
    label: Upgrade ID Display
    command: UGIDN
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [ON, STANDBY]
    command: "PW?"
    query_command: "PW?"
    response_pattern: "PW{state}"

  - id: master_volume
    type: string
    description: "00-98 (2-char) or 000-995 (3-char for 0.5dB step), 80=0dB"
    command: "MV?"
    query_command: "MV?"
    response_pattern: "MV{value}"

  - id: mute_state
    type: enum
    values: [ON, OFF]
    command: "MU?"
    query_command: "MU?"
    response_pattern: "MU{state}"

  - id: input_source
    type: string
    command: "SI?"
    query_command: "SI?"
    response_pattern: "SI{source}"

  - id: main_zone_state
    type: enum
    values: [ON, OFF]
    command: "ZM?"
    query_command: "ZM?"
    response_pattern: "ZM{state}"

  - id: surround_mode
    type: string
    command: "MS?"
    query_command: "MS?"
    response_pattern: "MS{mode}"

  - id: input_mode
    type: string
    command: "SD?"
    query_command: "SD?"
    response_pattern: "SD{mode}"

  - id: digital_input_mode
    type: string
    command: "DC?"
    query_command: "DC?"
    response_pattern: "DC{mode}"

  - id: video_select_state
    type: string
    command: "SV?"
    query_command: "SV?"
    response_pattern: "SV{source}"

  - id: sleep_timer_state
    type: string
    command: "SLP?"
    query_command: "SLP?"
    response_pattern: "SLP{value}"

  - id: auto_standby_state
    type: string
    command: "STBY?"
    query_command: "STBY?"
    response_pattern: "STBY{value}"

  - id: eco_mode_state
    type: string
    command: "ECO?"
    query_command: "ECO?"
    response_pattern: "ECO{mode}"

  - id: channel_volume_state
    type: string
    command: "CV?"
    query_command: "CV?"
    response_pattern: "CV{channel} {value}"
    description: "Returns status for all configured speakers, terminated by CVEND"

  - id: tuner_frequency
    type: string
    command: "TFAN?"
    query_command: "TFAN?"
    response_pattern: "TFAN{freq}"

  - id: tuner_preset
    type: string
    command: "TPAN?"
    query_command: "TPAN?"
    response_pattern: "TPAN{num}"

  - id: tuner_band
    type: string
    command: "TMAN?"
    query_command: "TMAN?"
    response_pattern: "TMAN{band}"

  - id: rds_station_name
    type: string
    command: "TFANNAME?"
    query_command: "TFANNAME?"
    response_pattern: "TFANNAME{name}"

  - id: trigger_state
    type: string
    command: "TR?"
    query_command: "TR?"
    response_pattern: "TR1 {state} TR2 {state}"

  - id: dimmer_state
    type: string
    command: "DIM ?"
    query_command: "DIM ?"
    response_pattern: "DIM {mode}"

  - id: zone2_state
    type: enum
    values: [ON, OFF]
    command: "Z2?"
    query_command: "Z2?"
    response_pattern: "Z2{state}"

  - id: zone2_volume
    type: string
    command: "Z2?"
    query_command: "Z2?"
    response_pattern: "Z2{value}"

  - id: zone2_mute_state
    type: enum
    values: [ON, OFF]
    command: "Z2MU?"
    query_command: "Z2MU?"
    response_pattern: "Z2MU{state}"

  - id: zone3_state
    type: enum
    values: [ON, OFF]
    command: "Z3?"
    query_command: "Z3?"
    response_pattern: "Z3{state}"

  - id: zone3_volume
    type: string
    command: "Z3?"
    query_command: "Z3?"
    response_pattern: "Z3{value}"

  - id: zone3_mute_state
    type: enum
    values: [ON, OFF]
    command: "Z3MU?"
    query_command: "Z3MU?"
    response_pattern: "Z3MU{state}"

  - id: hd_radio_status
    type: string
    command: "HD?"
    query_command: "HD?"
    description: "Returns band, station name, signal level, multicast channel, artist, title, album, genre"

  - id: remote_maintenance_state
    type: enum
    values: [ON, OFF]
    command: "RM ?"
    query_command: "RM ?"
    response_pattern: "RM {state}"

  - id: video_aspect
    type: string
    command: "VSASP ?"
    query_command: "VSASP ?"
    response_pattern: "VSASP{value}"

  - id: video_monitor
    type: string
    command: "VSMONI ?"
    query_command: "VSMONI ?"
    response_pattern: "VSMONI{value}"

  - id: video_resolution
    type: string
    command: "VSSC ?"
    query_command: "VSSC ?"
    response_pattern: "VSSC{value}"

  - id: hdmi_resolution
    type: string
    command: "VSSCH ?"
    query_command: "VSSCH ?"
    response_pattern: "VSSCH{value}"

  - id: hdmi_audio_state
    type: string
    command: "VSAUDIO ?"
    query_command: "VSAUDIO ?"
    response_pattern: "VSAUDIO {value}"

  - id: video_processing_mode_state
    type: string
    command: "VSVPM ?"
    query_command: "VSVPM ?"
    response_pattern: "VSVPM{value}"

  - id: vertical_stretch_state
    type: string
    command: "VSVST ?"
    query_command: "VSVST ?"
    response_pattern: "VSVST {value}"

  - id: tone_control_state
    type: string
    command: "PSTONE CTRL ?"
    query_command: "PSTONE CTRL ?"
    response_pattern: "PSTONE CONTROL {state}"

  - id: bass_state
    type: string
    command: "PSBAS ?"
    query_command: "PSBAS ?"
    response_pattern: "PSBAS {value}"

  - id: treble_state
    type: string
    command: "PSTRE ?"
    query_command: "PSTRE ?"
    response_pattern: "PSTRE {value}"

  - id: multeq_state
    type: string
    command: "PSMULTEQ ?"
    query_command: "PSMULTEQ: ?"
    response_pattern: "PSMULTEQ:{mode}"

  - id: dynamic_eq_state
    type: string
    command: "PSDYNEQ ?"
    query_command: "PSDYNEQ ?"
    response_pattern: "PSDYNEQ {state}"

  - id: dynamic_volume_state
    type: string
    command: "PSDYNVOL ?"
    query_command: "PSDYNVOL ?"
    response_pattern: "PSDYNVOL {mode}"

  - id: onscreen_display_ascii
    type: string
    command: "NSA"
    query_command: "NSA"
    description: "Returns NSA0-NSA8 lines of onscreen display info (ASCII)"

  - id: onscreen_display_utf8
    type: string
    command: "NSE"
    query_command: "NSE"
    description: "Returns NSE0-NSE8 lines of onscreen display info (UTF-8)"

  - id: record_source_state
    type: string
    command: "SR?"
    query_command: "SR?"
    description: "Return SR Status; If REC mode is selected, SR status returns; If ZONE2 mode is selected, Z2 status returns"

  - id: quick_select_state
    type: string
    command: "MSQUICK ?"
    query_command: "MSQUICK ?"
    description: "Return MSQUICK Status"

  - id: dialog_level_state
    type: string
    command: "PSDIL ?"
    query_command: "PSDIL ?"
    description: "Return DIL Status"

  - id: subwoofer_level_state
    type: string
    command: "PSSWL ?"
    query_command: "PSSWL ?"
    description: "Return SWL Status; If SW2 is none, PSSWL2 command is not output"

  - id: cinema_eq_state
    type: string
    command: "PSCINEMA EQ. ?"
    query_command: "PSCINEMA EQ. ?"
    description: "Return PSCINEMA EQ.Status"

  - id: surround_parameter_mode_state
    type: string
    command: "PSMODE: ?"
    query_command: "PSMODE: ?"
    description: "Return PSMODE: Status"

  - id: loudness_management_state
    type: string
    command: "PSLOM ?"
    query_command: "PSLOM ?"
    description: "Return PSLOM Status"

  - id: front_height_output_state
    type: string
    command: "PSFH: ?"
    query_command: "PSFH: ?"
    description: "Return PSFH: Status"

  - id: speaker_output_state
    type: string
    command: "PSSP: ?"
    query_command: "PSSP: ?"
    description: "Return PSSP: Status"

  - id: height_gain_state
    type: string
    command: "PSPHG ?"
    query_command: "PSPHG ?"
    description: "Return PSPHG Status"

  - id: reference_level_offset_state
    type: string
    command: "PSREFLEV ?"
    query_command: "PSREFLEV ?"
    description: "Return PSREFLEV Status"

  - id: audyssey_lfc_state
    type: string
    command: "PSLFC ?"
    query_command: "PSLFC ?"
    description: "Return Audyssey LFC Status"

  - id: containment_amount_state
    type: string
    command: "PSCNTAMT ?"
    query_command: "PSCNTAMT ?"
    description: "Return Cotainment Amount Status"

  - id: audyssey_dsx_state
    type: string
    command: "PSDSX ?"
    query_command: "PSDSX ?"
    description: "Return PSDSX Status"

  - id: stage_width_state
    type: string
    command: "PSSTW ?"
    query_command: "PSSTW ?"
    description: "Return PSSTW Status"

  - id: stage_height_state
    type: string
    command: "PSSTH ?"
    query_command: "PSSTH ?"
    description: "Return PSSTH Status"

  - id: graphic_eq_state
    type: string
    command: "PSGEQ ?"
    query_command: "PSGEQ ?"
    description: "Return Graphic EQ Status"

  - id: dynamic_compression_state
    type: string
    command: "PSDRC ?"
    query_command: "PSDRC ?"
    description: "Return PSDRC Status"

  - id: bass_sync_state
    type: string
    command: "PSBSC ?"
    query_command: "PSBSC ?"
    description: "Return PSBSC Status"

  - id: dialogue_enhancer_state
    type: string
    command: "PSDEH ?"
    query_command: "PSDEH ?"
    description: "Return PSDEH Status"

  - id: lfe_state
    type: string
    command: "PSLFE ?"
    query_command: "PSLFE ?"
    description: "Return PSLFE Status"

  - id: external_input_lfe_level_state
    type: string
    command: "PSLFL ?"
    query_command: "PSLFL ?"
    description: "Return PSLFL Status"

  - id: effect_state
    type: string
    command: "PSEFF ?"
    query_command: "PSEFF ?"
    description: "Return PSEFF Status"

  - id: surround_delay_state
    type: string
    command: "PSDEL ?"
    query_command: "PSDEL ?"
    description: "Return PSDEL Status"

  - id: panorama_state
    type: string
    command: "PSPAN ?"
    query_command: "PSPAN ?"
    description: "Return PSPAN Status"

  - id: dimension_state
    type: string
    command: "PSDIM ?"
    query_command: "PSDIM ?"
    description: "Return PSDIM Status"

  - id: center_width_state
    type: string
    command: "PSCEN ?"
    query_command: "PSCEN ?"
    description: "Return PSCEN Status"

  - id: center_image_state
    type: string
    command: "PSCEI ?"
    query_command: "PSCEI ?"
    description: "Return PSCEI Status"

  - id: center_gain_state
    type: string
    command: "PSCEG ?"
    query_command: "PSCEG ?"
    description: "Return PSCEG Status"

  - id: center_spread_state
    type: string
    command: "PSCES ?"
    query_command: "PSCES ?"
    description: "Return PSCES Status"

  - id: subwoofer_output_state
    type: string
    command: "PSSWR ?"
    query_command: "PSSWR ?"
    description: "Return PSSWR Status"

  - id: room_size_state
    type: string
    command: "PSRSZ ?"
    query_command: "PSRSZ ?"
    description: "Return PSRSZ Status"

  - id: audio_delay_state
    type: string
    command: "PSDELAY ?"
    query_command: "PSDELAY ?"
    description: "Return PSDELAY Status"

  - id: audio_restorer_state
    type: string
    command: "PSRSTR ?"
    query_command: "PSRSTR ?"
    description: "Return PSRSTR Status"

  - id: front_speaker_state
    type: string
    command: "PSFRONT?"
    query_command: "PSFRONT?"
    description: "Return PSFRONT Status"

  - id: auro_matic_preset_state
    type: string
    command: "PSAUROPR ?"
    query_command: "PSAUROPR ?"
    description: "Return PSAUROPR Status"

  - id: auro_matic_strength_state
    type: string
    command: "PSAUROST ?"
    query_command: "PSAUROST ?"
    description: "Return PSAUROST Status"

  - id: picture_mode_state
    type: string
    command: "PV?"
    query_command: "PV?"
    description: "Return PSPV Status"

  - id: contrast_state
    type: string
    command: "PVCN ?"
    query_command: "PVCN ?"
    description: "Return PSCN Status"

  - id: brightness_state
    type: string
    command: "PVBR ?"
    query_command: "PVBR ?"
    description: "Return PSBR Status"

  - id: saturation_state
    type: string
    command: "PVST ?"
    query_command: "PVST ?"
    description: "Return PSST Status"

  - id: hue_state
    type: string
    command: "PVHUE ?"
    query_command: "PVHUE ?"
    description: "Return PSHUE Status"

  - id: dnr_state
    type: string
    command: "PVDNR ?"
    query_command: "PVDNR ?"
    description: "Return PVDNR Status"

  - id: enhancer_state
    type: string
    command: "PVENH ?"
    query_command: "PVENH ?"
    description: "Return PVENH Status"

  - id: zone2_quick_select_state
    type: string
    command: "Z2QUICK ?"
    query_command: "Z2QUICK ?"
    description: "Return Z2QUICK Status"

  - id: zone2_channel_state
    type: string
    command: "Z2CS?"
    query_command: "Z2CS?"
    description: "Return Z2CS Status"

  - id: zone2_channel_volume_state
    type: string
    command: "Z2CV?"
    query_command: "Z2CV?"
    description: "Return Z2CV Status"

  - id: zone2_hpf_state
    type: string
    command: "Z2HPF?"
    query_command: "Z2HPF?"
    description: "Return Z2HPF Status"

  - id: zone2_bass_state
    type: string
    command: "Z2PSBAS ?"
    query_command: "Z2PSBAS ?"
    description: "Return Z2PSBAS Status"

  - id: zone2_treble_state
    type: string
    command: "Z2PSTRE ?"
    query_command: "Z2PSTRE ?"
    description: "Return Z2PSTRE Status"

  - id: zone2_hdmi_audio_state
    type: string
    command: "Z2HDA?"
    query_command: "Z2HDA?"
    description: "Return Z2HPA Status"

  - id: zone2_sleep_timer_state
    type: string
    command: "Z2SLP?"
    query_command: "Z2SLP?"
    description: "Return SLP Status"

  - id: zone2_auto_standby_state
    type: string
    command: "Z2STBY?"
    query_command: "Z2STBY?"
    description: "Return Z2STBY Status"

  - id: zone3_quick_select_state
    type: string
    command: "Z3QUICK ?"
    query_command: "Z3QUICK ?"
    description: "Return MSQUICK Status"

  - id: zone3_channel_state
    type: string
    command: "Z3CS?"
    query_command: "Z3CS?"
    description: "Return Z3CS Status"

  - id: zone3_channel_volume_state
    type: string
    command: "Z3CV?"
    query_command: "Z3CV?"
    description: "Return Z3CV Status"

  - id: zone3_hpf_state
    type: string
    command: "Z3HPF?"
    query_command: "Z3HPF?"
    description: "Return Z3HPF Status"

  - id: zone3_bass_state
    type: string
    command: "Z3PSBAS ?"
    query_command: "Z3PSBAS ?"
    description: "Return Z3PSBAS Status"

  - id: zone3_treble_state
    type: string
    command: "Z3PSTRE ?"
    query_command: "Z3PSTRE ?"
    description: "Return Z3PSTRE Status"

  - id: zone3_sleep_timer_state
    type: string
    command: "Z3SLP?"
    query_command: "Z3SLP?"
    description: "Return SLP Status"

  - id: zone3_auto_standby_state
    type: string
    command: "Z3STBY?"
    query_command: "Z3STBY?"
    description: "Return Z3STBY Status"

  - id: hd_radio_frequency
    type: string
    command: "TFHD?"
    query_command: "TFHD?"
    description: "Return TFHD Status"

  - id: hd_radio_preset
    type: string
    command: "TPHD?"
    query_command: "TPHD?"
    description: "Return TPHD Status"

  - id: hd_radio_band_mode
    type: string
    command: "TMHD?"
    query_command: "TMHD?"
    description: "Return TMHD Status"

  - id: net_audio_preset_names
    type: string
    command: "NSH"
    query_command: "NSH"
    description: "Audio Preset Name status（UTF-8）; except Bluetooth, USB/iPod; NSH00 through NSH35, 20 digits per preset name"

  - id: onscreen_display_ascii_example_request
    type: string
    command: "NSA0"
    query_command: "NSA0"
    description: "Documented request example for onscreen display information (ASCII)"

  - id: onscreen_display_utf8_example_request
    type: string
    command: "NSE0"
    query_command: "NSE0"
    description: "Documented request example for onscreen display information (UTF-8)"

  - id: setup_menu_state
    type: string
    command: "MNMEN?"
    query_command: "MNMEN?"
    description: "Return MNMEN(Menu) status"

  - id: insta_prevue_state
    type: string
    command: "MNPRV?"
    query_command: "MNPRV?"
    description: "Return MNPRV(InstaPrevue) status; NG is status only when InstaPrevue is not available"

  - id: all_zone_stereo_state
    type: string
    command: "MNZST?"
    query_command: "MNZST?"
    description: "Return MNZST status"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable variables beyond what Actions cover
# Volume, bass, treble, delay values are set via action commands with direct-value parameters
```

## Events
```yaml
events:
  - id: power_event
    description: "Sent when power state changes (PWON or PWSTANDBY)"
    pattern: "PW{state}"

  - id: master_volume_event
    description: "Sent when master volume changes"
    pattern: "MV{value}"

  - id: mute_event
    description: "Sent when mute state changes"
    pattern: "MU{state}"

  - id: input_source_event
    description: "Sent when input source changes"
    pattern: "SI{source}"

  - id: main_zone_event
    description: "Sent when main zone on/off changes"
    pattern: "ZM{state}"

  - id: surround_mode_event
    description: "Sent when surround mode changes. Current mode returned first, then new mode."
    pattern: "MS{mode}"

  - id: channel_volume_event
    description: "Sent when channel volume changes (e.g. on input source change)"
    pattern: "CV{channel} {value}"

  - id: zone2_event
    description: "Sent when Zone 2 state changes"
    pattern: "Z2{state}"

  - id: zone2_volume_event
    description: "Sent when Zone 2 volume changes"
    pattern: "Z2{value}"

  - id: zone3_event
    description: "Sent when Zone 3 state changes"
    pattern: "Z3{state}"

  - id: zone3_volume_event
    description: "Sent when Zone 3 volume changes"
    pattern: "Z3{value}"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
timing_constraints:
  - description: "Send commands at 50ms or greater intervals"
  - description: "Wait 1 second after PWON before sending next command"
  - description: "Events sent within 5 seconds of state change"
  - description: "Responses sent within 200ms of request command"
```

## Notes
- Command structure: 2-character ASCII command + parameter + CR (0x0D). Max data length 135 bytes.
- Volume encoding: 2-char for whole dB steps (80=0dB, 00=---/MIN). 3-char for 0.5dB steps (805=+0.5dB, 795=-0.5dB).
- Channel volume: range 38-62, 50=0dB. Subwoofer: 00 or 38-62.
- When input source changes, surround mode and channel volume events are sent if they differ.
- Surround mode event returns current mode first, then new mode after change.
- Events and responses share the same format as commands.
- Some commands are region-specific (North America, Europe only).
- Auro-3D commands require Auro-3D Upgrade.
- Net/USB preset range is 00-35 for 2014 AVR models.

<!-- UNRESOLVED: exact list of model variants in the X5200 series -->
<!-- UNRESOLVED: maximum concurrent connection count for TCP -->
<!-- UNRESOLVED: which surround modes apply to which specific X5200 model variant -->
<!-- UNRESOLVED: HD Radio, Pandora, SiriusXM, Spotify, Last.fm availability by region -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-23T19:19:43.416Z
last_checked_at: 2026-10-07T13:44:52.391Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:44:52.391Z
matched_actions: 345
action_count: 345
confidence: medium
summary: "All 345 action units match source literals and transport supported; only SDARC and a PANEL+V LOCK OFF form unrepresented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SDARC
- "SYPANEL+V LOCK OFF"
- "exact model variants in the series not fully enumerated"
- "firmware version compatibility not stated"
- "no continuous settable variables beyond what Actions cover"
- "no multi-step sequences explicitly described in source"
- "exact list of model variants in the X5200 series"
- "maximum concurrent connection count for TCP"
- "which surround modes apply to which specific X5200 model variant"
- "HD Radio, Pandora, SiriusXM, Spotify, Last.fm availability by region"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
