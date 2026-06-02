---
spec_id: admin/denon-dn-v310
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon DN-V310 Control Spec"
manufacturer: Denon
model_family: DN-V310
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - DN-V310
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
  - assets.denon.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-05-14T15:23:54.227Z
last_checked_at: 2026-05-20T11:28:33.817Z
generated_at: 2026-05-20T11:28:33.817Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact product category (AVR vs pre-pro vs Blu-ray) not confirmed — source is a generic Denon \"Control Protocol Ver.06\" covering multiple AVR models"
  - "flow control not stated; \"non procedural\" communication procedure noted"
  - "no multi-step macro sequences described in source"
  - "source contains no explicit safety warnings or interlock procedures"
  - "protocol version \"Ver.06\" mentioned but no version compatibility range stated"
  - "exact DN-V310 model capabilities vs full command set — source covers multiple Denon AVR models; not all commands may apply to DN-V310"
  - "Zone 2/3 bass/treble ranges may differ by model (X4100 noted with extended range)"
verification:
  verdict: verified
  checked_at: 2026-05-20T11:28:33.817Z
  matched_actions: 106
  action_count: 106
  confidence: medium
  summary: "All 106 spec actions matched verbatim; transport verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Denon DN-V310 Control Spec

## Summary
AV receiver/processor controllable via RS-232C serial and TCP (Telnet port 23). ASCII command protocol with 2-character command codes, up to 25-character parameters, terminated by CR (0x0D). Supports power, volume, input selection, surround modes, zone 2/3 control, tuner, online music/USB playback, video settings, and system configuration.

<!-- UNRESOLVED: exact product category (AVR vs pre-pro vs Blu-ray) not confirmed — source is a generic Denon "Control Protocol Ver.06" covering multiple AVR models -->

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
  flow_control: none  # UNRESOLVED: flow control not stated; "non procedural" communication procedure noted
addressing:
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # PW ON/STANDBY commands
  - queryable     # ? suffix request commands return status
  - routable      # SI command selects input source
  - levelable     # MV/CV volume control, bass/treble
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
    label: Set Master Volume
    kind: action
    command: "MV**"
    params:
      - name: level
        type: string
        description: "00-98 (00=MIN/---dB, 80=0dB); 0.5dB step uses 3 chars e.g. 805=+0.5dB"

  - id: channel_volume_up
    label: Channel Volume Up
    kind: action
    command: "CV<ch> UP"
    params:
      - name: channel
        type: enum
        description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"

  - id: channel_volume_down
    label: Channel Volume Down
    kind: action
    command: "CV<ch> DOWN"
    params:
      - name: channel
        type: enum
        description: "Same channels as channel_volume_up"

  - id: channel_volume_set
    label: Set Channel Volume
    kind: action
    command: "CV<ch> **"
    params:
      - name: channel
        type: enum
        description: "Same channels as channel_volume_up"
      - name: level
        type: string
        description: "38-62 by ASCII, 50=0dB"

  - id: channel_volume_reset
    label: Reset All Channel Levels
    kind: action
    command: CVZRL
    params: []

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
    command: "SI<source>"
    params:
      - name: source
        type: enum
        description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"

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

  - id: surround_mode_set
    label: Set Surround Mode
    kind: action
    command: "MS<mode>"
    params:
      - name: mode
        type: enum
        description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-QUICK5"

  - id: surround_mode_memory
    label: Store Quick Select Memory
    kind: action
    command: "MSQUICK<n> MEMORY"
    params:
      - name: slot
        type: integer
        description: "1-5"

  - id: input_signal_mode
    label: Set Input Signal Mode
    kind: action
    command: "SD<mode>"
    params:
      - name: mode
        type: enum
        description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"

  - id: digital_input_mode
    label: Set Digital Input Mode
    kind: action
    command: "DC<mode>"
    params:
      - name: mode
        type: enum
        description: "AUTO, PCM, DTS"

  - id: video_select
    label: Video Select Source
    kind: action
    command: "SV<source>"
    params:
      - name: source
        type: enum
        description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE, ON, OFF"

  - id: sleep_timer
    label: Set Sleep Timer
    kind: action
    command: "SLP***"
    params:
      - name: minutes
        type: string
        description: "OFF or 001-120 by ASCII, 010=10min"

  - id: auto_standby
    label: Set Auto Standby
    kind: action
    command: "STBY<value>"
    params:
      - name: value
        type: enum
        description: "15M, 30M, 60M, OFF"

  - id: eco_mode
    label: Set ECO Mode
    kind: action
    command: "ECO<mode>"
    params:
      - name: mode
        type: enum
        description: "ON, AUTO, OFF"

  - id: video_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: "VSASP<value>"
    params:
      - name: value
        type: enum
        description: "NRM (4:3), FUL (16:9)"

  - id: video_monitor_select
    label: Set HDMI Monitor Output
    kind: action
    command: "VSMONI<value>"
    params:
      - name: value
        type: enum
        description: "AUTO, 1, 2"

  - id: video_resolution_set
    kind: action
    label: Set Video Resolution
    command: "VSSC<value>"
    params:
      - name: value
        type: enum
        description: "48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO"

  - id: hdmi_resolution_set
    label: Set HDMI Resolution
    kind: action
    command: "VSSCH<value>"
    params:
      - name: value
        type: enum
        description: "48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO"

  - id: hdmi_audio_output
    label: Set HDMI Audio Output
    kind: action
    command: "VSAUDIO <target>"
    params:
      - name: target
        type: enum
        description: "AMP, TV"

  - id: tone_control
    label: Set Tone Control
    kind: action
    command: "PSTONE CTRL <state>"
    params:
      - name: state
        type: enum
        description: "ON, OFF"

  - id: bass_adjust
    label: Bass Adjust
    kind: action
    command: "PSBAS <direction>"
    params:
      - name: direction
        type: string
        description: "UP, DOWN, or direct value 00-99 (50=0dB, operable 44-56)"

  - id: treble_adjust
    label: Treble Adjust
    kind: action
    command: "PSTRE <direction>"
    params:
      - name: direction
        type: string
        description: "UP, DOWN, or direct value 00-99 (50=0dB, operable 44-56)"

  - id: dynamic_eq
    label: Set Dynamic EQ
    kind: action
    command: "PSDYNEQ <state>"
    params:
      - name: state
        type: enum
        description: "ON, OFF"

  - id: dynamic_volume
    label: Set Dynamic Volume
    kind: action
    command: "PSDYNVOL <level>"
    params:
      - name: level
        type: enum
        description: "HEV, MED, LIT, OFF"

  - id: multeq_mode
    label: Set MultEQ Mode
    kind: action
    command: "PSMULTEQ:<mode>"
    params:
      - name: mode
        type: enum
        description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"

  - id: cinema_eq
    label: Set Cinema EQ
    kind: action
    command: "PSCINEMA EQ.<state>"
    params:
      - name: state
        type: enum
        description: "ON, OFF"

  - id: drc_set
    label: Set Dynamic Compression
    kind: action
    command: "PSDRC <level>"
    params:
      - name: level
        type: enum
        description: "AUTO, LOW, MID, HI, OFF"

  - id: subwoofer_level_adjust
    label: Subwoofer Level Adjust
    kind: action
    command: "PSSWL <value>"
    params:
      - name: value
        type: string
        description: "ON, OFF, UP, DOWN, or direct 00,38-62 (50=0dB)"

  - id: trigger_1_on
    label: Trigger 1 On
    kind: action
    command: "TR1 ON"
    params: []

  - id: trigger_1_off
    label: Trigger 1 Off
    kind: action
    command: "TR1 OFF"
    params: []

  - id: trigger_2_on
    label: Trigger 2 On
    kind: action
    command: "TR2 ON"
    params: []

  - id: trigger_2_off
    label: Trigger 2 Off
    kind: action
    command: "TR2 OFF"
    params: []

  - id: dimmer_set
    label: Set Front Panel Dimmer
    kind: action
    command: "DIM <level>"
    params:
      - name: level
        type: enum
        description: "BRI, DIM, DAR, OFF, SEL"

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
    command: "Z2<source>"
    params:
      - name: source
        type: enum
        description: "SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"

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
    command: "Z2**"
    params:
      - name: level
        type: string
        description: "00-98, 80=0dB, 00=MIN"

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
    command: "Z3<source>"
    params:
      - name: source
        type: enum
        description: "SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"

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
    command: "Z3**"
    params:
      - name: level
        type: string
        description: "00-98, 80=0dB, 00=MIN"

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
    label: Set Tuner Frequency
    kind: action
    command: "TFAN******"
    params:
      - name: frequency
        type: string
        description: "6 digits; >050000=AM kHz, <050000=FM MHz"

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
    label: Select Tuner Preset
    kind: action
    command: "TPAN**"
    params:
      - name: preset
        type: integer
        description: "01-56"

  - id: tuner_band
    label: Set Tuner Band
    kind: action
    command: "TMAN<band>"
    params:
      - name: band
        type: enum
        description: "AM, FM"

  - id: usb_playback_control
    label: USB/Online Music Playback
    kind: action
    command: "NS<code>"
    params:
      - name: code
        type: enum
        description: "9A (Play), 9B (Pause), 9C (Stop), 9D (Skip+), 9E (Skip-), 9F (Search+), 9G (Search-), 9H (Repeat One), 9I (Repeat All), 9J (Repeat Off), 9K (Random On), 9M (Random Off), RPT (Repeat toggle), RND (Random toggle)"

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

  - id: setup_menu_on
    label: Setup Menu On
    kind: action
    command: "MNMEN ON"
    params: []

  - id: setup_menu_off
    label: Setup Menu Off
    kind: action
    command: "MNMEN OFF"
    params: []

  - id: all_zone_stereo_on
    label: All Zone Stereo On
    kind: action
    command: "MNZST ON"
    params: []

  - id: all_zone_stereo_off
    label: All Zone Stereo Off
    kind: action
    command: "MNZST OFF"
    params: []

  - id: remote_lock_on
    label: Remote Lock On
    kind: action
    command: "SYREMOTE LOCK ON"
    params: []

  - id: remote_lock_off
    label: Remote Lock Off
    kind: action
    command: "SYREMOTE LOCK OFF"
    params: []

  - id: panel_lock_on
    label: Panel Lock On
    kind: action
    command: "SYPANEL LOCK ON"
    params: []

  - id: panel_lock_off
    label: Panel Lock Off
    kind: action
    command: "SYPANEL LOCK OFF"
    params: []
  - id: rec_select
    label: REC Select Source
    kind: action
    command: "SR<source>"
    params:
      - name: source
        type: string
        description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP, SOURCE"

  - id: picture_mode_off
    label: Picture Mode Off
    kind: action
    command: PVOFF
    params: []

  - id: picture_mode_standard
    label: Picture Mode Standard
    kind: action
    command: PVSTD
    params: []

  - id: picture_mode_movie
    label: Picture Mode Movie
    kind: action
    command: PVMOV
    params: []

  - id: picture_mode_vivid
    label: Picture Mode Vivid
    kind: action
    command: PVVVD
    params: []

  - id: picture_mode_stream
    label: Picture Mode Stream
    kind: action
    command: PVSTM
    params: []

  - id: picture_mode_custom
    label: Picture Mode Custom
    kind: action
    command: PVCTM
    params: []

  - id: dialog_level
    label: Dialog Level Adjust
    kind: action
    command: "PSDIL <value>"
    params:
      - name: value
        type: string

  - id: subwoofer2_level_adjust
    label: Subwoofer 2 Level Adjust
    kind: action
    command: "PSSWL2 <value>"
    params:
      - name: value
        type: string

  - id: ps_mode
    label: Set PS Surround Mode
    kind: action
    command: "PSMODE:<mode>"
    params:
      - name: mode
        type: string
        description: "MUSIC, CINEMA, GAME, PRO LOGIC"

  - id: loudness_management
    label: Set Loudness Management
    kind: action
    command: "PSLOM <state>"
    params:
      - name: state
        type: string

  - id: front_height_output
    label: Set Front Height Output
    kind: action
    command: "PSFH:<state>"
    params:
      - name: state
        type: string

  - id: speaker_output
    label: Set Speaker Output
    kind: action
    command: "PSSP:<config>"
    params:
      - name: config
        type: string

  - id: pl2z_height_gain
    label: Set PL2z Height Gain
    kind: action
    command: "PSPHG <level>"
    params:
      - name: level
        type: string
        description: "LOW, MID, HI"

  - id: reference_level_offset
    label: Set Reference Level Offset
    kind: action
    command: "PSREFLEV <value>"
    params:
      - name: value
        type: string

  - id: audyssey_lfc
    label: Set Audyssey LFC
    kind: action
    command: "PSLFC <state>"
    params:
      - name: state
        type: string

  - id: containment_amount
    label: Set Containment Amount
    kind: action
    command: "PSCNTAMT <value>"
    params:
      - name: value
        type: string

  - id: audyssey_dsx
    label: Set Audyssey DSX
    kind: action
    command: "PSDSX <mode>"
    params:
      - name: mode
        type: string
        description: "ONHW, ONH, ONW, OFF"

  - id: stage_width
    label: Set Stage Width
    kind: action
    command: "PSSTW <value>"
    params:
      - name: value
        type: string

  - id: stage_height
    label: Set Stage Height
    kind: action
    command: "PSSTH <value>"
    params:
      - name: value
        type: string
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    values: [ON, STANDBY]
    query: "PW?"
    response_prefix: "PW"

  - id: master_volume
    label: Master Volume Level
    type: string
    query: "MV?"
    response_prefix: "MV"
    description: "00-98 (2-char) or 005-995 (3-char for 0.5dB steps)"

  - id: mute_state
    label: Mute State
    type: enum
    values: [ON, OFF]
    query: "MU?"
    response_prefix: "MU"

  - id: input_source
    label: Current Input Source
    type: string
    query: "SI?"
    response_prefix: "SI"

  - id: main_zone_state
    label: Main Zone State
    type: enum
    values: [ON, OFF]
    query: "ZM?"
    response_prefix: "ZM"

  - id: surround_mode
    label: Current Surround Mode
    type: string
    query: "MS?"
    response_prefix: "MS"

  - id: input_signal_mode
    label: Input Signal Mode
    type: string
    query: "SD?"
    response_prefix: "SD"

  - id: digital_input_mode
    label: Digital Input Mode
    type: string
    query: "DC?"
    response_prefix: "DC"

  - id: video_select_state
    label: Video Select State
    type: string
    query: "SV?"
    response_prefix: "SV"

  - id: sleep_timer_state
    label: Sleep Timer State
    type: string
    query: "SLP?"
    response_prefix: "SLP"

  - id: auto_standby_state
    label: Auto Standby State
    type: string
    query: "STBY?"
    response_prefix: "STBY"

  - id: eco_mode_state
    label: ECO Mode State
    type: string
    query: "ECO?"
    response_prefix: "ECO"

  - id: channel_volume_status
    label: Channel Volume Status
    type: string
    query: "CV?"
    response_prefix: "CV"
    description: "Returns status for configured speakers, terminated by CVEND"

  - id: zone2_state
    label: Zone 2 State
    type: string
    query: "Z2?"
    response_prefix: "Z2"

  - id: zone2_mute_state
    label: Zone 2 Mute State
    type: enum
    values: [ON, OFF]
    query: "Z2MU?"
    response_prefix: "Z2MU"

  - id: zone3_state
    label: Zone 3 State
    type: string
    query: "Z3?"
    response_prefix: "Z3"

  - id: zone3_mute_state
    label: Zone 3 Mute State
    type: enum
    values: [ON, OFF]
    query: "Z3MU?"
    response_prefix: "Z3MU"

  - id: trigger_state
    label: Trigger State
    type: string
    query: "TR?"
    response_prefix: "TR"
    description: "Returns TR1 and TR2 state"

  - id: dimmer_state
    label: Front Panel Dimmer State
    type: string
    query: "DIM ?"
    response_prefix: "DIM"

  - id: setup_menu_state
    label: Setup Menu State
    type: enum
    values: ["ON", "OFF"]
    query: "MNMEN?"
    response_prefix: "MNMEN"

  - id: tuner_frequency
    label: Tuner Frequency
    type: string
    query: "TFAN?"
    response_prefix: "TF"

  - id: tuner_preset
    label: Tuner Preset
    type: string
    query: "TPAN?"
    response_prefix: "TP"

  - id: tuner_band
    label: Tuner Band
    type: string
    query: "TMAN?"
    response_prefix: "TM"

  - id: onscreen_display_ascii
    label: Onscreen Display (ASCII)
    type: string
    query: "NSA"
    response_prefix: "NSA"
    description: "Returns NSA0-NSA8 lines of onscreen info"

  - id: onscreen_display_utf8
    label: Onscreen Display (UTF-8)
    type: string
    query: "NSE"
    response_prefix: "NSE"
    description: "Returns NSE0-NSE8 lines of onscreen info in UTF-8"
```

## Variables
```yaml
variables:
  - id: master_volume_db
    label: Master Volume (dB)
    type: string
    description: "00=MIN/---dB, 80=0dB, 98=+18dB. 0.5dB step uses 3 chars (e.g. 805=+0.5dB, 795=-0.5dB)"
    set_command: "MV<value>"

  - id: zone2_volume_db
    label: Zone 2 Volume (dB)
    type: string
    description: "Same encoding as master volume. 00=MIN, 80=0dB"
    set_command: "Z2<value>"

  - id: zone3_volume_db
    label: Zone 3 Volume (dB)
    type: string
    description: "Same encoding as master volume. 00=MIN, 80=0dB"
    set_command: "Z3<value>"

  - id: bass_level
    label: Bass Level
    type: string
    description: "00-99, 50=0dB, operable range 44-56"
    set_command: "PSBAS <value>"

  - id: treble_level
    label: Treble Level
    type: string
    description: "00-99, 50=0dB, operable range 44-56"
    set_command: "PSTRE <value>"

  - id: sleep_timer_minutes
    label: Sleep Timer (minutes)
    type: string
    description: "OFF or 001-120 by ASCII"
    set_command: "SLP<value>"

  - id: tuner_frequency_direct
    label: Tuner Frequency Direct
    type: string
    description: "6 digits; >050000=AM (kHz), <050000=FM (MHz)"
    set_command: "TFAN<value>"
```

## Events
```yaml
events:
  - id: state_change_event
    label: State Change Event
    description: >-
      Sent within 5 seconds when device state changes from front panel or IR.
      Format identical to COMMAND responses. Covers power, volume, input,
      surround mode, mute, channel volume changes.

  - id: surround_mode_change
    label: Surround Mode Change
    description: >-
      When surround mode changes, current mode is returned as EVENT before
      the new mode EVENT.
```

## Macros
```yaml
macros: []
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures
```

## Notes
- Commands must be sent at 50ms or more intervals.
- After sending PWON (power on), wait 1 second before sending the next command.
- Response to request commands (COMMAND+?) should arrive within 200ms.
- Command terminator is CR (0x0D). All commands use ASCII (0x20-0x7F).
- Maximum communication data length: 135 bytes.
- Channel volume events return when input source changes (if surround mode or channel volume differs from previous source).
- Volume encoding: 2-digit for whole dB steps, 3-digit for 0.5dB steps (e.g. MV805 = +0.5dB).
- RS-232 connector: DB-9pin female, DCE type (pins 1=GND, 2=TxD, 3=RxD, 5=Common, 4/6/7/8/9=NC).
- Ethernet: RJ-45 10BASE-T/100BASE-TX, half duplex, TCP port 23 (telnet).

<!-- UNRESOLVED: protocol version "Ver.06" mentioned but no version compatibility range stated -->
<!-- UNRESOLVED: exact DN-V310 model capabilities vs full command set — source covers multiple Denon AVR models; not all commands may apply to DN-V310 -->
<!-- UNRESOLVED: Zone 2/3 bass/treble ranges may differ by model (X4100 noted with extended range) -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - assets.denon.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-05-14T15:23:54.227Z
last_checked_at: 2026-05-20T11:28:33.817Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T11:28:33.817Z
matched_actions: 106
action_count: 106
confidence: medium
summary: "All 106 spec actions matched verbatim; transport verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact product category (AVR vs pre-pro vs Blu-ray) not confirmed — source is a generic Denon \"Control Protocol Ver.06\" covering multiple AVR models"
- "flow control not stated; \"non procedural\" communication procedure noted"
- "no multi-step macro sequences described in source"
- "source contains no explicit safety warnings or interlock procedures"
- "protocol version \"Ver.06\" mentioned but no version compatibility range stated"
- "exact DN-V310 model capabilities vs full command set — source covers multiple Denon AVR models; not all commands may apply to DN-V310"
- "Zone 2/3 bass/treble ranges may differ by model (X4100 noted with extended range)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
