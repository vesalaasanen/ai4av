---
spec_id: admin/marantz-sr5010-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR5010 Series Control Spec"
manufacturer: Marantz
model_family: SR5010
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR5010
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:11:36.649Z
last_checked_at: 2026-06-09T19:01:01.310Z
generated_at: 2026-06-09T19:01:01.310Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TFHD******MC*"
  - "HD?"
  - "firmware version compatibility not stated"
  - "exact model variants in the SR5010 \"Series\" not enumerated"
  - "no explicit multi-step macro sequences documented in source"
  - "no explicit safety interlocks or power-on sequencing beyond the 1-second PWON delay documented in source"
  - "firmware version compatibility not stated in source"
  - "exact model variants in SR5010 \"Series\" not enumerated"
  - "some surround mode commands listed without full parameter documentation (many Dolby/DTS sub-variants shown in model-specific columns without clear parameter strings)"
  - "NSH (net audio preset name) UTF-8 response format only partially documented"
verification:
  verdict: verified
  checked_at: 2026-06-09T19:01:01.310Z
  matched_actions: 271
  action_count: 271
  confidence: medium
  summary: "All 271 spec actions confirmed in source at spec granularity; only 2 minor source extras (combined TFHD frequency+multicast command and HD? status query) well below the short threshold; transport fully verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR5010 Series Control Spec

## Summary
AV receiver supporting multi-zone audio/video with RS-232C serial and TCP/IP (telnet) control. ASCII command protocol with 2-character command codes and up to 25-character parameters terminated by CR (0x0D). Controls power, volume, input selection, surround modes, video processing, zone 2/3, tuner, and network/USB playback.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact model variants in the SR5010 "Series" not enumerated -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # PW command for power on/standby
  - queryable    # ? parameter returns status for most commands
  - routable     # SI, SV, SD commands for input/output routing
  - levelable    # MV, CV, PS tone/bass/treble level controls
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PWON
    description: "Power on system. Wait 1 second before sending next command."
    params: []

  - id: power_standby
    label: Power Standby
    kind: action
    command: PWSTANDBY
    description: "Set system to standby."
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
    description: "Direct volume set. 00=---(MIN), 80=0dB, 98=+18dB. 0.5dB step uses 3 digits e.g. MV805=+0.5dB."
    params:
      - name: level
        type: string
        description: "Volume level 00-98 (2-digit) or 3-digit for 0.5dB steps"

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
    command: SI***
    description: "Select input source."
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
    label: Select Surround Mode
    kind: action
    command: MS***
    description: "Select surround mode."
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
          - AURO3D
          - AURO2DSURR

  - id: input_mode_set
    label: Set Input Mode
    kind: action
    command: SD***
    params:
      - name: mode
        type: enum
        values: [AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, "7.1IN", NO]

  - id: digital_input_mode
    label: Set Digital Input Mode
    kind: action
    command: DC***
    params:
      - name: mode
        type: enum
        values: [AUTO, PCM, DTS]

  - id: video_select
    label: Video Select Source
    kind: action
    command: SV***
    params:
      - name: source
        type: enum
        values: [DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE]

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

  - id: sleep_timer
    label: Set Sleep Timer
    kind: action
    command: SLP***
    description: "OFF or 001-120 minutes."
    params:
      - name: minutes
        type: string
        description: "OFF or 001-120"

  - id: auto_standby
    label: Set Auto Standby
    kind: action
    command: STBY***
    params:
      - name: timeout
        type: enum
        values: ["15M", "30M", "60M", OFF]

  - id: eco_mode
    label: Set Eco Mode
    kind: action
    command: ECO***
    params:
      - name: mode
        type: enum
        values: [ON, AUTO, OFF]

  - id: tone_control
    label: Set Tone Control
    kind: action
    command: PSTONE CTRL ***
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: bass_up
    label: Bass Up
    kind: action
    command: PSBAS UP
    params: []

  - id: bass_down
    label: Bass Down
    kind: action
    command: PSBAS DOWN
    params: []

  - id: bass_set
    label: Set Bass Level
    kind: action
    command: PSBAS **
    description: "00-99, 50=0dB. AVR range -6 to +6 (44 to 56)."
    params:
      - name: level
        type: string

  - id: treble_up
    label: Treble Up
    kind: action
    command: PSTRE UP
    params: []

  - id: treble_down
    label: Treble Down
    kind: action
    command: PSTRE DOWN
    params: []

  - id: treble_set
    label: Set Treble Level
    kind: action
    command: PSTRE **
    description: "00-99, 50=0dB. AVR range -6 to +6 (44 to 56)."
    params:
      - name: level
        type: string

  - id: channel_volume_up
    label: Channel Volume Up
    kind: action
    command: CV** UP
    description: "Channel volume up for specified channel."
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]

  - id: channel_volume_down
    label: Channel Volume Down
    kind: action
    command: CV** DOWN
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]

  - id: channel_volume_set
    label: Set Channel Volume
    kind: action
    command: CV** **
    description: "Direct level set per channel. 38-62 ASCII, 50=0dB."
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
      - name: level
        type: string
        description: "38-62, 50=0dB"

  - id: channel_volume_reset
    label: Reset Channel Levels
    kind: action
    command: CVZRL
    description: "Reset all channel levels to factory defaults."
    params: []

  - id: aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: VSASP***
    params:
      - name: mode
        type: enum
        values: [ASPNRM, ASPFUL]

  - id: hdmi_monitor
    label: Set HDMI Monitor Output
    kind: action
    command: VSMONI***
    params:
      - name: output
        type: enum
        values: [MONIAUTO, MONI1, MONI2]

  - id: resolution_set
    kind: action
    label: Set Output Resolution
    command: VSSC***
    params:
      - name: resolution
        type: enum
        values: [SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO]

  - id: hdmi_resolution_set
    label: Set HDMI Resolution
    kind: action
    command: VSSCH***
    params:
      - name: resolution
        type: enum
        values: [SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO]

  - id: hdmi_audio_output
    label: Set HDMI Audio Output
    kind: action
    command: VSAUDIO ***
    params:
      - name: destination
        type: enum
        values: [AMP, TV]

  - id: video_processing_mode
    label: Set Video Processing Mode
    kind: action
    command: VSVPM***
    params:
      - name: mode
        type: enum
        values: [VPMAUTO, VPMGAME, VPMMOVI]

  - id: vertical_stretch
    label: Set Vertical Stretch
    kind: action
    command: VSVST ***
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: picture_mode
    label: Set Picture Mode
    kind: action
    command: PV***
    params:
      - name: mode
        type: enum
        values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]

  - id: contrast_set
    label: Set Contrast
    kind: action
    command: PVCN ***
    description: "000-100, 050=0. Range -50 to +50."
    params:
      - name: value
        type: string

  - id: brightness_set
    label: Set Brightness
    kind: action
    command: PVBR ***
    description: "000-100, 050=0. Range -50 to +50."
    params:
      - name: value
        type: string

  - id: saturation_set
    label: Set Saturation
    kind: action
    command: PVST ***
    description: "000-100, 050=0. Range -50 to +50."
    params:
      - name: value
        type: string

  - id: hue_set
    label: Set Hue
    kind: action
    command: PVHUE **
    description: "44-56, 50=0. Range -6 to +6."
    params:
      - name: value
        type: string

  - id: dynamic_eq
    label: Set Dynamic EQ
    kind: action
    command: PSDYNEQ ***
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: dynamic_volume
    label: Set Dynamic Volume
    kind: action
    command: PSDYNVOL ***
    params:
      - name: mode
        type: enum
        values: [HEV, MED, LIT, OFF]

  - id: multeq
    label: Set MultEQ Mode
    kind: action
    command: PSMULTEQ:***
    params:
      - name: mode
        type: enum
        values: [AUDYSSEY, BYP.LR, FLAT, OFF]

  - id: ref_level_offset
    label: Set Reference Level Offset
    kind: action
    command: PSREFLEV ***
    params:
      - name: offset
        type: enum
        values: ["0", "5", "10", "15"]

  - id: dynamic_compression
    label: Set Dynamic Compression
    kind: action
    command: PSDRC ***
    params:
      - name: mode
        type: enum
        values: [AUTO, LOW, MID, HI, OFF]

  - id: cinema_eq
    label: Set Cinema EQ
    kind: action
    command: PSCINEMA EQ.***
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: audyssey_lfc
    label: Set Audyssey LFC
    kind: action
    command: PSLFC ***
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: containment_amount_up
    label: Containment Amount Up
    kind: action
    command: PSCNTAMT UP
    params: []

  - id: containment_amount_down
    label: Containment Amount Down
    kind: action
    command: PSCNTAMT DOWN
    params: []

  - id: audyssey_dsx
    label: Set Audyssey DSX
    kind: action
    command: PSDSX ***
    params:
      - name: mode
        type: enum
        values: [ONHW, ONH, ONW, OFF]

  - id: dialog_level_on
    label: Dialog Level Adjust On
    kind: action
    command: PSDIL ON
    params: []

  - id: dialog_level_off
    label: Dialog Level Adjust Off
    kind: action
    command: PSDIL OFF
    params: []

  - id: subwoofer_level_on
    label: Subwoofer Level Adjust On
    kind: action
    command: PSSWL ON
    params: []

  - id: subwoofer_level_off
    label: Subwoofer Level Adjust Off
    kind: action
    command: PSSWL OFF
    params: []

  - id: graphic_eq
    label: Set Graphic EQ
    kind: action
    command: PSGEQ ***
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: dnr
    label: Set DNR
    kind: action
    command: PVDNR ***
    params:
      - name: mode
        type: enum
        values: [OFF, LOW, MID, HI]

  - id: enhancer_set
    label: Set Enhancer
    kind: action
    command: PVENH ***
    description: "00-12, 00=0. Range 0 to 12."
    params:
      - name: value
        type: string

  - id: dialogue_enhancer
    label: Set Dialogue Enhancer
    kind: action
    command: PSDEH ***
    params:
      - name: mode
        type: enum
        values: [OFF, LOW, MED, HIGH]

  - id: audio_delay_up
    label: Audio Delay Up
    kind: action
    command: PSDELAY UP
    params: []

  - id: audio_delay_down
    label: Audio Delay Down
    kind: action
    command: PSDELAY DOWN
    params: []

  - id: audio_delay_set
    label: Set Audio Delay
    kind: action
    command: PSDELAY ***
    description: "000-200ms, 000=0ms."
    params:
      - name: delay_ms
        type: string

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

  - id: zone2_source
    label: Zone 2 Select Source
    kind: action
    command: Z2***
    description: "Select Zone 2 input source."
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]

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
    description: "00-98, 80=0dB, 00=---(MIN). Same encoding as MV."
    params:
      - name: level
        type: string

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

  - id: zone2_sleep_timer
    label: Zone 2 Sleep Timer
    kind: action
    command: Z2SLP***
    description: "OFF or 001-120 minutes."
    params:
      - name: minutes
        type: string

  - id: zone2_auto_standby
    label: Zone 2 Auto Standby
    kind: action
    command: Z2STBY***
    params:
      - name: timeout
        type: enum
        values: ["2H", "4H", "8H", OFF]

  - id: zone2_channel_setting
    label: Zone 2 Channel Setting
    kind: action
    command: Z2CS***
    params:
      - name: mode
        type: enum
        values: [ST, MONO]

  - id: zone2_hpf
    label: Zone 2 HPF
    kind: action
    command: Z2HPF***
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: zone2_hdmi_audio
    label: Zone 2 HDMI Audio
    kind: action
    command: Z2HDA ***
    params:
      - name: mode
        type: enum
        values: [THR, PCM]

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

  - id: zone3_source
    label: Zone 3 Select Source
    kind: action
    command: Z3***
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]

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
    description: "00-98, 80=0dB, 00=---(MIN)."
    params:
      - name: level
        type: string

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

  - id: zone3_sleep_timer
    label: Zone 3 Sleep Timer
    kind: action
    command: Z3SLP***
    params:
      - name: minutes
        type: string

  - id: zone3_auto_standby
    label: Zone 3 Auto Standby
    kind: action
    command: Z3STBY***
    params:
      - name: timeout
        type: enum
        values: ["2H", "4H", "8H", OFF]

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

  - id: tuner_freq_set
    label: Set Tuner Frequency
    kind: action
    command: TFAN******
    description: "6 digits. >050000=AM kHz, <050000=FM MHz."
    params:
      - name: frequency
        type: string

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

  - id: tuner_preset_set
    label: Set Tuner Preset
    kind: action
    command: TPAN**
    params:
      - name: preset
        type: string
        description: "01-56"

  - id: tuner_preset_memory
    label: Tuner Preset Memory
    kind: action
    command: TPANMEM
    params: []

  - id: tuner_band_am
    label: Tuner Band AM
    kind: action
    command: TMANAM
    params: []

  - id: tuner_band_fm
    label: Tuner Band FM
    kind: action
    command: TMANFM
    params: []

  - id: tuner_mode_auto
    label: Tuner Auto Mode
    kind: action
    command: TMANAUTO
    params: []

  - id: tuner_mode_manual
    label: Tuner Manual Mode
    kind: action
    command: TMANMANUAL
    params: []

  - id: net_cursor_up
    label: Network Cursor Up
    kind: action
    command: NS90
    params: []

  - id: net_cursor_down
    label: Network Cursor Down
    kind: action
    command: NS91
    params: []

  - id: net_cursor_left
    label: Network Cursor Left
    kind: action
    command: NS92
    params: []

  - id: net_cursor_right
    label: Network Cursor Right
    kind: action
    command: NS93
    params: []

  - id: net_enter
    label: Network Enter (Play/Pause)
    kind: action
    command: NS94
    params: []

  - id: net_play
    label: Network Play
    kind: action
    command: NS9A
    params: []

  - id: net_pause
    label: Network Pause
    kind: action
    command: NS9B
    params: []

  - id: net_stop
    label: Network Stop
    kind: action
    command: NS9C
    params: []

  - id: net_skip_plus
    label: Network Skip Forward
    kind: action
    command: NS9D
    params: []

  - id: net_skip_minus
    label: Network Skip Back
    kind: action
    command: NS9E
    params: []

  - id: net_search_plus
    label: Network Search Forward
    kind: action
    command: NS9F
    params: []

  - id: net_search_minus
    label: Network Search Back
    kind: action
    command: NS9G
    params: []

  - id: net_repeat_one
    label: Network Repeat One
    kind: action
    command: NS9H
    params: []

  - id: net_repeat_all
    label: Network Repeat All
    kind: action
    command: NS9I
    params: []

  - id: net_repeat_off
    label: Network Repeat Off
    kind: action
    command: NS9J
    params: []

  - id: net_random_on
    label: Network Random On
    kind: action
    command: NS9K
    params: []

  - id: net_random_off
    label: Network Random Off
    kind: action
    command: NS9M
    params: []

  - id: net_preset_call
    label: Network Preset Call
    kind: action
    command: NSB**
    params:
      - name: preset
        type: string
        description: "00-35"

  - id: net_preset_memory
    label: Network Preset Memory
    kind: action
    command: NSC**
    params:
      - name: preset
        type: string
        description: "00-35"

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

  - id: channel_level_adjust
    label: Channel Level Adjust Menu
    kind: action
    command: MNCHL
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
    description: "Lock panel buttons except master volume."
    params: []

  - id: panel_vol_lock_on
    label: Panel + Volume Lock On
    kind: action
    command: SYPANEL+V LOCK ON
    description: "Lock panel buttons and master volume."
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
    label: Set Display Dimmer
    kind: action
    command: DIM ***
    params:
      - name: level
        type: enum
        values: [BRI, DIM, DAR, OFF, SEL]

  - id: rec_select_source
    label: Record Select Source
    kind: action
    command: SR***
    description: "Set record select source. Parameters same as SI command."
    params:
      - name: source
        type: string

  - id: rec_select_cancel
    label: Record Select Cancel
    kind: action
    command: SRSOURCE
    params: []

  - id: quick_select
    label: Quick Select Mode
    kind: action
    command: MSQUICK*
    description: "Quick select 1-5."
    params:
      - name: slot
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: quick_memory
    label: Quick Select Memory
    kind: action
    command: MSQUICK* MEMORY
    params:
      - name: slot
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: favorite_select
    label: Favorite Select (Main Zone)
    kind: action
    command: ZMFAVORITE*
    params:
      - name: slot
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: remote_maintenance_start
    label: Remote Maintenance Start
    kind: action
    command: RMSTA
    params: []

  - id: remote_maintenance_end
    label: Remote Maintenance End
    kind: action
    command: RMEND
    params: []

  - id: lfe_level_set
    label: Set LFE Level
    kind: action
    command: PSLFE **
    description: "00=0dB, 10=-10dB. Range 0 to -10."
    params:
      - name: level
        type: string

  - id: room_size_set
    label: Set Room Size
    kind: action
    command: PSRSZ ***
    params:
      - name: size
        type: enum
        values: [S, MS, M, ML, L]

  - id: audio_restorer
    label: Set Audio Restorer
    kind: action
    command: PSRSTR ***
    params:
      - name: mode
        type: enum
        values: [OFF, LOW, MED, HI]

  - id: loudness_management
    label: Set Loudness Management
    kind: action
    command: PSLOM ***
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: sw_on_off
    label: Subwoofer On/Off (Direct/Stereo 2ch)
    kind: action
    command: PSSWR ***
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: front_speaker
    label: Set Front Speaker
    kind: action
    command: PSFRONT ***
    params:
      - name: config
        type: enum
        values: [SPA, SPB, "A+B"]

  - id: speaker_output
    label: Set Speaker Output
    kind: action
    command: PSSP:***
    description: "Speaker output config for Height/Wide/Surround Back."
    params:
      - name: config
        type: enum
        values: [FW, FH, SB, HW, BH, BW, FL, HF, FR]

  - id: effect_on
    label: Effect On
    kind: action
    command: PSEFF ON
    params: []

  - id: effect_off
    label: Effect Off
    kind: action
    command: PSEFF OFF
    params: []

  - id: effect_level_set
    label: Set Effect Level
    kind: action
    command: PSEFF **
    description: "00-99, 00=0dB, 10=10dB. Range 1 to 15."
    params:
      - name: level
        type: string

  - id: pl2z_mode
    label: Set PL2/PL2x Mode
    kind: action
    command: PSMODE:***
    params:
      - name: mode
        type: enum
        values: [MUSIC, CINEMA, GAME, "PRO LOGIC"]
  - id: zmfavorite_memory
    label: Main Zone Favorite Memory
    kind: action
    command: ZMFAVORITE* MEMORY
    params:
      - name: slot
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: zone2_quick_select
    label: Zone 2 Quick Select
    kind: action
    command: Z2QUICK*
    params:
      - name: slot
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: zone2_quick_memory
    label: Zone 2 Quick Select Memory
    kind: action
    command: Z2QUICK* MEMORY
    params:
      - name: slot
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: zone2_favorite_select
    label: Zone 2 Favorite Select
    kind: action
    command: Z2FAVORITE*
    params:
      - name: slot
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: zone2_favorite_memory
    label: Zone 2 Favorite Memory
    kind: action
    command: Z2FAVORITE* MEMORY
    params:
      - name: slot
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: zone3_quick_select
    label: Zone 3 Quick Select
    kind: action
    command: Z3QUICK*
    params:
      - name: slot
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: zone3_quick_memory
    label: Zone 3 Quick Select Memory
    kind: action
    command: Z3QUICK* MEMORY
    params:
      - name: slot
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: zone3_favorite_select
    label: Zone 3 Favorite Select
    kind: action
    command: Z3FAVORITE*
    params:
      - name: slot
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: zone3_favorite_memory
    label: Zone 3 Favorite Memory
    kind: action
    command: Z3FAVORITE* MEMORY
    params:
      - name: slot
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: zone3_channel_setting
    label: Zone 3 Channel Setting
    kind: action
    command: Z3CS***
    params:
      - name: mode
        type: enum
        values: [ST, MONO]

  - id: zone3_hpf
    label: Zone 3 HPF
    kind: action
    command: Z3HPF***
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: zone2_bass_up
    label: Zone 2 Bass Up
    kind: action
    command: Z2PSBAS UP
    params: []

  - id: zone2_bass_down
    label: Zone 2 Bass Down
    kind: action
    command: Z2PSBAS DOWN
    params: []

  - id: zone2_bass_set
    label: Set Zone 2 Bass Level
    kind: action
    command: Z2PSBAS **
    description: '00-99, 50=0dB. Range -10 to +10 (40-60).'
    params:
      - name: level
        type: string

  - id: zone2_treble_up
    label: Zone 2 Treble Up
    kind: action
    command: Z2PSTRE UP
    params: []

  - id: zone2_treble_down
    label: Zone 2 Treble Down
    kind: action
    command: Z2PSTRE DOWN
    params: []

  - id: zone2_treble_set
    label: Set Zone 2 Treble Level
    kind: action
    command: Z2PSTRE **
    description: '00-99, 50=0dB. Range -10 to +10 (40-60).'
    params:
      - name: level
        type: string

  - id: zone3_bass_up
    label: Zone 3 Bass Up
    kind: action
    command: Z3PSBAS UP
    params: []

  - id: zone3_bass_down
    label: Zone 3 Bass Down
    kind: action
    command: Z3PSBAS DOWN
    params: []

  - id: zone3_bass_set
    label: Set Zone 3 Bass Level
    kind: action
    command: Z3PSBAS **
    description: '00-99, 50=0dB. Range -10 to +10 (40-60).'
    params:
      - name: level
        type: string

  - id: zone3_treble_up
    label: Zone 3 Treble Up
    kind: action
    command: Z3PSTRE UP
    params: []

  - id: zone3_treble_down
    label: Zone 3 Treble Down
    kind: action
    command: Z3PSTRE DOWN
    params: []

  - id: zone3_treble_set
    label: Set Zone 3 Treble Level
    kind: action
    command: Z3PSTRE **
    description: '00-99, 50=0dB. Range -10 to +10 (40-60).'
    params:
      - name: level
        type: string

  - id: zone2_channel_volume_up
    label: Zone 2 Channel Volume Up
    kind: action
    command: Z2CV** UP
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: zone2_channel_volume_down
    label: Zone 2 Channel Volume Down
    kind: action
    command: Z2CV** DOWN
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: zone2_channel_volume_set
    label: Set Zone 2 Channel Volume
    kind: action
    command: Z2CV** **
    description: '38-62, 50=0dB.'
    params:
      - name: channel
        type: enum
        values: [FL, FR]
      - name: level
        type: string

  - id: zone3_channel_volume_up
    label: Zone 3 Channel Volume Up
    kind: action
    command: Z3CV** UP
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: zone3_channel_volume_down
    label: Zone 3 Channel Volume Down
    kind: action
    command: Z3CV** DOWN
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: zone3_channel_volume_set
    label: Set Zone 3 Channel Volume
    kind: action
    command: Z3CV** **
    description: '38-62, 50=0dB.'
    params:
      - name: channel
        type: enum
        values: [FL, FR]
      - name: level
        type: string

  - id: dialog_level_up
    label: Dialog Level Up
    kind: action
    command: PSDIL UP
    params: []

  - id: dialog_level_down
    label: Dialog Level Down
    kind: action
    command: PSDIL DOWN
    params: []

  - id: dialog_level_set
    label: Set Dialog Level
    kind: action
    command: PSDIL **
    description: '38-62, 50=0dB.'
    params:
      - name: level
        type: string

  - id: subwoofer_level_up
    label: Subwoofer Level Up
    kind: action
    command: PSSWL UP
    params: []

  - id: subwoofer_level_down
    label: Subwoofer Level Down
    kind: action
    command: PSSWL DOWN
    params: []

  - id: subwoofer_level_set
    label: Set Subwoofer Level
    kind: action
    command: PSSWL **
    description: '00,38-62, 50=0dB.'
    params:
      - name: level
        type: string

  - id: subwoofer2_level_up
    label: Subwoofer 2 Level Up
    kind: action
    command: PSSWL2 UP
    params: []

  - id: subwoofer2_level_down
    label: Subwoofer 2 Level Down
    kind: action
    command: PSSWL2 DOWN
    params: []

  - id: subwoofer2_level_set
    label: Set Subwoofer 2 Level
    kind: action
    command: PSSWL2 **
    description: '00,38-62, 50=0dB.'
    params:
      - name: level
        type: string

  - id: containment_amount_set
    label: Set Containment Amount
    kind: action
    command: PSCNTAMT **
    description: '00-99, AVR range 01-07.'
    params:
      - name: amount
        type: string

  - id: stage_width_up
    label: Stage Width Up
    kind: action
    command: PSSTW UP
    params: []

  - id: stage_width_down
    label: Stage Width Down
    kind: action
    command: PSSTW DOWN
    params: []

  - id: stage_width_set
    label: Set Stage Width
    kind: action
    command: PSSTW **
    description: '00-99, 50=0dB. AVR range -10 to +10 (40-60).'
    params:
      - name: level
        type: string

  - id: stage_height_up
    label: Stage Height Up
    kind: action
    command: PSSTH UP
    params: []

  - id: stage_height_down
    label: Stage Height Down
    kind: action
    command: PSSTH DOWN
    params: []

  - id: stage_height_set
    label: Set Stage Height
    kind: action
    command: PSSTH **
    description: '00-99, 50=0dB. AVR range -10 to +10 (40-60).'
    params:
      - name: level
        type: string

  - id: lfe_level_up
    label: LFE Level Up
    kind: action
    command: PSLFE UP
    params: []

  - id: lfe_level_down
    label: LFE Level Down
    kind: action
    command: PSLFE DOWN
    params: []

  - id: lfe_level_ext_in
    label: Set LFE Level EXT IN
    kind: action
    command: PSLFL **
    description: 'LFE level for EXT.IN or 7.1CH IN input.'
    params:
      - name: level
        type: enum
        values: ['00', '05', '10', '15']

  - id: pl2z_height_gain_set
    label: Set PL2z Height Gain
    kind: action
    command: PSPHG ***
    params:
      - name: gain
        type: enum
        values: [LOW, MID, HI]

  - id: panorama_on
    label: Panorama On
    kind: action
    command: PSPAN ON
    params: []

  - id: panorama_off
    label: Panorama Off
    kind: action
    command: PSPAN OFF
    params: []

  - id: dimension_up
    label: Dimension Up
    kind: action
    command: PSDIM UP
    params: []

  - id: dimension_down
    label: Dimension Down
    kind: action
    command: PSDIM DOWN
    params: []

  - id: dimension_set
    label: Set Dimension
    kind: action
    command: PSDIM **
    description: '00-99, AVR range 0-6.'
    params:
      - name: value
        type: string

  - id: center_width_up
    label: Center Width Up
    kind: action
    command: PSCEN UP
    params: []

  - id: center_width_down
    label: Center Width Down
    kind: action
    command: PSCEN DOWN
    params: []

  - id: center_width_set
    label: Set Center Width
    kind: action
    command: PSCEN **
    description: '00-99, AVR range 0-7.'
    params:
      - name: value
        type: string

  - id: center_image_up
    label: Center Image Up
    kind: action
    command: PSCEI UP
    params: []

  - id: center_image_down
    label: Center Image Down
    kind: action
    command: PSCEI DOWN
    params: []

  - id: center_image_set
    label: Set Center Image
    kind: action
    command: PSCEI **
    description: '00-99, AVR range 0.0-1.0 (00-10).'
    params:
      - name: value
        type: string

  - id: center_gain_up
    label: Center Gain Up
    kind: action
    command: PSCEG UP
    params: []

  - id: center_gain_down
    label: Center Gain Down
    kind: action
    command: PSCEG DOWN
    params: []

  - id: center_gain_set
    label: Set Center Gain
    kind: action
    command: PSCEG **
    description: '00-99, AVR range 0.0-1.0 (00-10).'
    params:
      - name: value
        type: string

  - id: center_spread_on
    label: Center Spread On
    kind: action
    command: PSCES ON
    params: []

  - id: center_spread_off
    label: Center Spread Off
    kind: action
    command: PSCES OFF
    params: []

  - id: bass_sync_up
    label: Bass Sync Up
    kind: action
    command: PSBSC UP
    params: []

  - id: bass_sync_down
    label: Bass Sync Down
    kind: action
    command: PSBSC DOWN
    params: []

  - id: bass_sync_set
    label: Set Bass Sync
    kind: action
    command: PSBSC **
    description: '00-99, AVR range 0-16.'
    params:
      - name: value
        type: string

  - id: delay_up
    label: Delay Up
    kind: action
    command: PSDEL UP
    params: []

  - id: delay_down
    label: Delay Down
    kind: action
    command: PSDEL DOWN
    params: []

  - id: delay_set
    label: Set Delay
    kind: action
    command: PSDEL ***
    description: '000-999, 000=0ms. AVR range 0-300ms.'
    params:
      - name: delay_ms
        type: string

  - id: front_height_on
    label: Front Height On
    kind: action
    command: PSFH:ON
    params: []

  - id: front_height_off
    label: Front Height Off
    kind: action
    command: PSFH:OFF
    params: []

  - id: auro3d_preset
    label: Set Auro-3D Preset
    kind: action
    command: PSAUROPR ***
    description: 'Auro-3D Upgrade only.'
    params:
      - name: preset
        type: enum
        values: [SMA, MED, LAR, SPE]

  - id: auro3d_strength_up
    label: Auro-3D Strength Up
    kind: action
    command: PSAUROST UP
    description: 'Auro-3D Upgrade only.'
    params: []

  - id: auro3d_strength_down
    label: Auro-3D Strength Down
    kind: action
    command: PSAUROST DOWN
    params: []

  - id: auro3d_strength_set
    label: Set Auro-3D Strength
    kind: action
    command: PSAUROST **
    description: '00-99, AVR range 1-16. Auro-3D Upgrade only.'
    params:
      - name: value
        type: string

  - id: contrast_up
    label: Contrast Up
    kind: action
    command: PVCN UP
    params: []

  - id: contrast_down
    label: Contrast Down
    kind: action
    command: PVCN DOWN
    params: []

  - id: brightness_up
    label: Brightness Up
    kind: action
    command: PVBR UP
    params: []

  - id: brightness_down
    label: Brightness Down
    kind: action
    command: PVBR DOWN
    params: []

  - id: saturation_up
    label: Saturation Up
    kind: action
    command: PVST UP
    params: []

  - id: saturation_down
    label: Saturation Down
    kind: action
    command: PVST DOWN
    params: []

  - id: hue_up
    label: Hue Up
    kind: action
    command: PVHUE UP
    params: []

  - id: hue_down
    label: Hue Down
    kind: action
    command: PVHUE DOWN
    params: []

  - id: enhancer_up
    label: Enhancer Up
    kind: action
    command: PVENH UP
    params: []

  - id: enhancer_down
    label: Enhancer Down
    kind: action
    command: PVENH DOWN
    params: []

  - id: effect_level_up
    label: Effect Level Up
    kind: action
    command: PSEFF UP
    params: []

  - id: effect_level_down
    label: Effect Level Down
    kind: action
    command: PSEFF DOWN
    params: []

  - id: net_toggle_mode
    label: Network Toggle Mode
    kind: action
    command: NS9W
    description: 'Toggle iPod Mode / On Screen Mode.'
    params: []

  - id: net_page_next
    label: Network Page Next
    kind: action
    command: NS9X
    params: []

  - id: net_page_prev
    label: Network Page Previous
    kind: action
    command: NS9Y
    params: []

  - id: net_search_stop
    label: Network Manual Search Stop
    kind: action
    command: NS9Z
    params: []

  - id: net_repeat_toggle
    label: Network Repeat Toggle
    kind: action
    command: NSRPT
    params: []

  - id: net_random_toggle
    label: Network Random Toggle
    kind: action
    command: NSRND
    params: []

  - id: net_preset_name
    label: Network Preset Name
    kind: action
    command: NSH
    description: 'Returns up to 36 preset names (UTF-8, 20 chars each).'
    params: []

  - id: net_add_favorite
    label: Add Network Favorites Folder
    kind: action
    command: NSFV MEM
    params: []

  - id: net_display_ascii
    label: Network On-Screen Display ASCII
    kind: action
    command: NSA
    description: 'Returns 9 lines of on-screen display data in ASCII.'
    params: []

  - id: net_display_utf8
    label: Network On-Screen Display UTF-8
    kind: action
    command: NSE
    description: 'Returns 9 lines of on-screen display data in UTF-8.'
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

  - id: hd_freq_up
    label: HD Radio Frequency Up
    kind: action
    command: TFHDUP
    description: 'North America model only.'
    params: []

  - id: hd_freq_down
    label: HD Radio Frequency Down
    kind: action
    command: TFHDDOWN
    params: []

  - id: hd_freq_set
    label: Set HD Radio Frequency
    kind: action
    command: TFHD******
    description: '6 digits. >050000=AM kHz, <050000=FM MHz. North America only.'
    params:
      - name: frequency
        type: string
        description: '6-digit frequency'

  - id: hd_multicast_select
    label: HD Radio Multicast Channel Select
    kind: action
    command: TFHDMC*
    description: '1 digit: 0=Analog, 1-8=Multicast. North America only.'
    params:
      - name: channel
        type: string

  - id: hd_preset_up
    label: HD Radio Preset Up
    kind: action
    command: TPHDUP
    params: []

  - id: hd_preset_down
    label: HD Radio Preset Down
    kind: action
    command: TPHDDOWN
    params: []

  - id: hd_preset_set
    label: Set HD Radio Preset
    kind: action
    command: TPHD**
    params:
      - name: preset
        type: string
        description: '01-56'

  - id: hd_preset_memory
    label: HD Radio Preset Memory
    kind: action
    command: TPHDMEM
    params: []

  - id: tuner_preset_memory_direct
    label: Tuner Preset Memory Direct
    kind: action
    command: TPANMEM**
    description: 'Store current frequency to specific preset slot.'
    params:
      - name: preset
        type: string
        description: '01-56'

  - id: hd_preset_memory_direct
    label: HD Radio Preset Memory Direct
    kind: action
    command: TPHDMEM**
    description: 'Store current HD frequency to specific preset slot.'
    params:
      - name: preset
        type: string
        description: '01-56'

  - id: hd_band_am
    label: HD Radio Band AM
    kind: action
    command: TMHDAM
    params: []

  - id: hd_band_fm
    label: HD Radio Band FM
    kind: action
    command: TMHDFM
    params: []

  - id: hd_mode
    label: Set HD Radio Mode
    kind: action
    command: TMHD***
    description: 'North America model only.'
    params:
      - name: mode
        type: enum
        values: [AUTOHD, AUTO, MANUAL, ANAAUTO, ANAMANU]
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    values: [ON, STANDBY]
    query: PW?
    response_pattern: "PW***"

  - id: master_volume
    label: Master Volume Level
    type: string
    query: MV?
    response_pattern: "MV***"
    description: "00-98 (2-digit) or 3-digit for 0.5dB. 80=0dB, 00=---(MIN)."

  - id: mute_state
    label: Mute State
    type: enum
    values: [ON, OFF]
    query: MU?
    response_pattern: "MU***"

  - id: input_source
    label: Current Input Source
    type: string
    query: SI?
    response_pattern: "SI***"

  - id: main_zone_state
    label: Main Zone State
    type: enum
    values: [ON, OFF]
    query: ZM?
    response_pattern: "ZM***"

  - id: surround_mode
    label: Current Surround Mode
    type: string
    query: MS?
    response_pattern: "MS***"

  - id: channel_volume
    label: Channel Volume Status
    type: string
    query: CV?
    response_pattern: "CV** ** .. CVEND"
    description: "Returns levels for all configured speakers, terminated by CVEND."

  - id: input_mode
    label: Current Input Mode
    type: string
    query: SD?
    response_pattern: "SD***"

  - id: digital_input_mode
    label: Current Digital Input Mode
    type: string
    query: DC?
    response_pattern: "DC***"

  - id: video_select_state
    label: Video Select State
    type: string
    query: SV?
    response_pattern: "SV***"

  - id: sleep_timer
    label: Sleep Timer Status
    type: string
    query: SLP?
    response_pattern: "SLP***"

  - id: auto_standby
    label: Auto Standby Status
    type: string
    query: STBY?
    response_pattern: "STBY***"

  - id: eco_mode
    label: Eco Mode Status
    type: string
    query: ECO?
    response_pattern: "ECO***"

  - id: bass_level
    label: Bass Level
    type: string
    query: PSBAS ?
    response_pattern: "PSBAS **"

  - id: treble_level
    label: Treble Level
    type: string
    query: PSTRE ?
    response_pattern: "PSTRE **"

  - id: tone_control_state
    label: Tone Control State
    type: string
    query: PSTONE CTRL ?
    response_pattern: "PSTONE CTRL ***"

  - id: aspect_ratio
    label: Aspect Ratio
    type: string
    query: VSASP ?
    response_pattern: "VSASP***"

  - id: hdmi_monitor
    label: HDMI Monitor Output
    type: string
    query: VSMONI ?
    response_pattern: "VSMONI***"

  - id: resolution
    label: Output Resolution
    type: string
    query: VSSC ?
    response_pattern: "VSSC***"

  - id: hdmi_resolution
    label: HDMI Resolution
    type: string
    query: VSSCH ?
    response_pattern: "VSSCH***"

  - id: hdmi_audio
    label: HDMI Audio Output
    type: string
    query: VSAUDIO ?
    response_pattern: "VSAUDIO ***"

  - id: video_processing_mode
    label: Video Processing Mode
    type: string
    query: VSVPM ?
    response_pattern: "VSVPM***"

  - id: vertical_stretch
    label: Vertical Stretch State
    type: string
    query: VSVST ?
    response_pattern: "VSVST ***"

  - id: picture_mode
    label: Picture Mode
    type: string
    query: PV?
    response_pattern: "PV***"

  - id: contrast
    label: Contrast Level
    type: string
    query: PVCN ?
    response_pattern: "PVCN ***"

  - id: brightness
    label: Brightness Level
    type: string
    query: PVBR ?
    response_pattern: "PVBR ***"

  - id: saturation
    label: Saturation Level
    type: string
    query: PVST ?
    response_pattern: "PVST ***"

  - id: hue
    label: Hue Level
    type: string
    query: PVHUE ?
    response_pattern: "PVHUE **"

  - id: dynamic_eq
    label: Dynamic EQ State
    type: string
    query: PSDYNEQ ?
    response_pattern: "PSDYNEQ ***"

  - id: dynamic_volume
    label: Dynamic Volume State
    type: string
    query: PSDYNVOL ?
    response_pattern: "PSDYNVOL ***"

  - id: multeq_mode
    label: MultEQ Mode
    type: string
    query: PSMULTEQ ?
    response_pattern: "PSMULTEQ:***"

  - id: ref_level_offset
    label: Reference Level Offset
    type: string
    query: PSREFLEV ?
    response_pattern: "PSREFLEV ***"

  - id: dynamic_compression
    label: Dynamic Compression
    type: string
    query: PSDRC ?
    response_pattern: "PSDRC ***"

  - id: cinema_eq
    label: Cinema EQ State
    type: string
    query: PSCINEMA EQ. ?
    response_pattern: "PSCINEMA EQ.***"

  - id: audyssey_lfc
    label: Audyssey LFC State
    type: string
    query: PSLFC ?
    response_pattern: "PSLFC ***"

  - id: containment_amount
    label: Containment Amount
    type: string
    query: PSCNTAMT ?
    response_pattern: "PSCNTAMT **"

  - id: audyssey_dsx
    label: Audyssey DSX State
    type: string
    query: PSDSX ?
    response_pattern: "PSDSX ***"

  - id: dialog_level
    label: Dialog Level Adjust
    type: string
    query: PSDIL ?
    response_pattern: "PSDIL***"

  - id: subwoofer_level
    label: Subwoofer Level Adjust
    type: string
    query: PSSWL ?
    response_pattern: "PSSWL***"

  - id: graphic_eq
    label: Graphic EQ State
    type: string
    query: PSGEQ ?
    response_pattern: "PSGEQ ***"

  - id: dnr_state
    label: DNR State
    type: string
    query: PVDNR ?
    response_pattern: "PVDNR ***"

  - id: enhancer
    label: Enhancer Level
    type: string
    query: PVENH ?
    response_pattern: "PVENH **"

  - id: dialogue_enhancer
    label: Dialogue Enhancer
    type: string
    query: PSDEH ?
    response_pattern: "PSDEH ***"

  - id: audio_delay
    label: Audio Delay
    type: string
    query: PSDELAY?
    response_pattern: "PSDELAY ***"

  - id: zone2_state
    label: Zone 2 State
    type: string
    query: Z2?
    response_pattern: "Z2***"

  - id: zone2_volume
    label: Zone 2 Volume
    type: string
    query: Z2?
    description: "Returns Z2** volume level."

  - id: zone2_mute
    label: Zone 2 Mute State
    type: enum
    values: [ON, OFF]
    query: Z2MU?
    response_pattern: "Z2MU***"

  - id: zone2_sleep
    label: Zone 2 Sleep Timer
    type: string
    query: Z2SLP?
    response_pattern: "Z2SLP***"

  - id: zone2_auto_standby
    label: Zone 2 Auto Standby
    type: string
    query: Z2STBY?
    response_pattern: "Z2STBY***"

  - id: zone2_channel_setting
    label: Zone 2 Channel Setting
    type: string
    query: Z2CS?
    response_pattern: "Z2CS***"

  - id: zone2_hpf
    label: Zone 2 HPF State
    type: string
    query: Z2HPF?
    response_pattern: "Z2HPF***"

  - id: zone2_hdmi_audio
    label: Zone 2 HDMI Audio
    type: string
    query: Z2HDA?
    response_pattern: "Z2HDA***"

  - id: zone3_state
    label: Zone 3 State
    type: string
    query: Z3?
    response_pattern: "Z3***"

  - id: zone3_volume
    label: Zone 3 Volume
    type: string
    query: Z3?
    description: "Returns Z3** volume level."

  - id: zone3_mute
    label: Zone 3 Mute State
    type: enum
    values: [ON, OFF]
    query: Z3MU?
    response_pattern: "Z3MU***"

  - id: zone3_sleep
    label: Zone 3 Sleep Timer
    type: string
    query: Z3SLP?
    response_pattern: "Z3SLP***"

  - id: zone3_auto_standby
    label: Zone 3 Auto Standby
    type: string
    query: Z3STBY?
    response_pattern: "Z3STBY***"

  - id: tuner_frequency
    label: Tuner Frequency
    type: string
    query: TFAN?
    response_pattern: "TFAN******"

  - id: tuner_preset
    label: Tuner Preset
    type: string
    query: TPAN?
    response_pattern: "TPAN**"

  - id: tuner_band
    label: Tuner Band
    type: string
    query: TMAN?
    response_pattern: "TMAN***"

  - id: tuner_rds_name
    label: Tuner RDS Station Name
    type: string
    query: TFANNAME?
    response_pattern: "TFANNAME********"
    description: "EU/AP models only."

  - id: trigger_status
    label: Trigger Status
    type: string
    query: TR?
    response_pattern: "TR1 *** TR2 ***"

  - id: dimmer_state
    label: Display Dimmer State
    type: string
    query: DIM ?
    response_pattern: "DIM ***"

  - id: menu_state
    label: Setup Menu State
    type: string
    query: MNMEN?
    response_pattern: "MNMEN ***"

  - id: all_zone_stereo
    label: All Zone Stereo State
    type: string
    query: MNZST?
    response_pattern: "MNZST ***"

  - id: remote_maintenance
    label: Remote Maintenance State
    type: string
    query: RM ?
    response_pattern: "RM ***"

  - id: quick_select_status
    label: Quick Select Status
    type: string
    query: MSQUICK ?
    response_pattern: "MSQUICK***"

  - id: speaker_output
    label: Speaker Output Config
    type: string
    query: PSSP: ?
    response_pattern: "PSSP:***"

  - id: pl2z_mode_status
    label: PL2/PL2x Mode
    type: string
    query: PSMODE: ?
    response_pattern: "PSMODE:***"

  - id: pl2z_height_gain
    label: PL2z Height Gain
    type: string
    query: PSPHG ?
    response_pattern: "PSPHG ***"

  - id: room_size
    label: Room Size
    type: string
    query: PSRSZ ?
    response_pattern: "PSRSZ ***"

  - id: audio_restorer
    label: Audio Restorer
    type: string
    query: PSRSTR ?
    response_pattern: "PSRSTR ***"

  - id: loudness_management
    label: Loudness Management
    type: string
    query: PSLOM ?
    response_pattern: "PSLOM ***"

  - id: sw_state
    label: Subwoofer On/Off State
    type: string
    query: PSSWR ?
    response_pattern: "PSSWR ***"

  - id: front_speaker
    label: Front Speaker Config
    type: string
    query: PSFRONT?
    response_pattern: "PSFRONT***"

  - id: effect_status
    label: Effect Status
    type: string
    query: PSEFF ?
    response_pattern: "PSEFF***"

  - id: center_spread
    label: Center Spread State
    type: string
    query: PSCES ?
    response_pattern: "PSCES ***"

  - id: center_gain
    label: Center Gain
    type: string
    query: PSCEG ?
    response_pattern: "PSCEG **"

  - id: center_image
    label: Center Image
    type: string
    query: PSCEI?
    response_pattern: "PSCEI **"

  - id: upgrade_id
    label: Upgrade ID Number
    type: string
    query: UGIDN
    response_pattern: "UGIDN************"
    description: "12-digit ID number displayed on FL display."
```

## Variables
```yaml
variables:
  - id: master_volume_db
    label: Master Volume (dB)
    type: string
    min: "---"
    max: "+18.0"
    step: "0.5"
    description: "00=---(MIN), 80=0dB, 98=+18dB. 0.5dB step uses 3 chars (e.g. 805=+0.5dB)."

  - id: channel_volume_db
    label: Channel Volume (dB)
    type: string
    range: "38-62"
    zero: "50=0dB"
    description: "Per-channel trim. 38 to 62 by ASCII, 50=0dB."

  - id: zone2_volume_db
    label: Zone 2 Volume (dB)
    type: string
    description: "Same encoding as master volume. 00=---(MIN), 80=0dB, 98=+18dB."

  - id: zone3_volume_db
    label: Zone 3 Volume (dB)
    type: string
    description: "Same encoding as master volume. 00=---(MIN), 80=0dB, 98=+18dB."
```

## Events
```yaml
events:
  - id: power_event
    label: Power State Change
    pattern: "PWON | PWSTANDBY"
    description: "Sent when power state changes from front panel or remote."

  - id: volume_event
    label: Master Volume Change
    pattern: "MV**"
    description: "Sent when master volume changes. Also returns surround mode and channel volume if they change with input source."

  - id: mute_event
    label: Mute State Change
    pattern: "MUON | MUOFF"
    description: "Sent when mute state changes."

  - id: input_source_event
    label: Input Source Change
    pattern: "SI***"
    description: "Sent when input source changes. Channel volume and surround mode events may follow."

  - id: surround_mode_event
    label: Surround Mode Change
    pattern: "MS***"
    description: "Current surround mode returned before changed mode event when surround mode changes."

  - id: channel_volume_event
    label: Channel Volume Change
    pattern: "CV** ** .. CVEND"
    description: "Sent when channel volumes change (e.g. on input source switch). Terminated by CVEND."

  - id: zone2_event
    label: Zone 2 State Change
    pattern: "Z2***"
    description: "Sent when Zone 2 state changes."

  - id: zone3_event
    label: Zone 3 State Change
    pattern: "Z3***"
    description: "Sent when Zone 3 state changes."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "1 second delay required after PWON before next command (source note J)"
  - "Commands must be sent at 50ms+ intervals"
  - "Responses must be sent within 200ms of request"
  - "Events should be sent within 5 seconds of state change"
# UNRESOLVED: no explicit safety interlocks or power-on sequencing beyond the 1-second PWON delay documented in source
```

## Notes
- Command structure: `COMMAND` (2 ASCII chars) + `PARAMETER` (up to 25 ASCII chars) + `CR` (0x0D). ASCII range 0x20-0x7F.
- Max communication data length: 135 bytes.
- Half duplex communication for both serial and TCP.
- Volume encoding: 2-char for integer dB steps (00-98), 3-char for 0.5dB steps (e.g. `MV805` = +0.5dB). `80` = 0dB, `00` = --- (MIN), `98` = +18dB.
- Channel volume range 38-62 (50=0dB). Subwoofer range 00,38-62 (50=0dB).
- Input source change triggers automatic channel volume and surround mode events for channels/modes that differ from previous source.
- When surround mode is re-selected (same mode), surround mode EVENT returns but channel volume does NOT (source note E).
- CV? response only includes speakers present in current speaker configuration.
- Zone 2/3 quick select supports slots 1-5 with memory save capability.
- HD Radio commands (TFHD*, TPHD*, TMHD*) are North America model only.
- Auro-3D commands (AURO3D, AURO2DSURR, AUROPR, AUROST, SHL, SHR, TS) require Auro-3D Upgrade.
- Network preset range 00-35 (2014 AVR); source mentions older range 00-55.
- Network on-screen display (NSA/NSE) returns up to 9 lines of 96-byte UTF-8 display data with cursor/playable flag bytes.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact model variants in SR5010 "Series" not enumerated -->
<!-- UNRESOLVED: some surround mode commands listed without full parameter documentation (many Dolby/DTS sub-variants shown in model-specific columns without clear parameter strings) -->
<!-- UNRESOLVED: NSH (net audio preset name) UTF-8 response format only partially documented -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:11:36.649Z
last_checked_at: 2026-06-09T19:01:01.310Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T19:01:01.310Z
matched_actions: 271
action_count: 271
confidence: medium
summary: "All 271 spec actions confirmed in source at spec granularity; only 2 minor source extras (combined TFHD frequency+multicast command and HD? status query) well below the short threshold; transport fully verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TFHD******MC*"
- "HD?"
- "firmware version compatibility not stated"
- "exact model variants in the SR5010 \"Series\" not enumerated"
- "no explicit multi-step macro sequences documented in source"
- "no explicit safety interlocks or power-on sequencing beyond the 1-second PWON delay documented in source"
- "firmware version compatibility not stated in source"
- "exact model variants in SR5010 \"Series\" not enumerated"
- "some surround mode commands listed without full parameter documentation (many Dolby/DTS sub-variants shown in model-specific columns without clear parameter strings)"
- "NSH (net audio preset name) UTF-8 response format only partially documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
