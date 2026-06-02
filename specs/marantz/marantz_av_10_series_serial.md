---
spec_id: admin/marantz-av-10-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz AV 10 Series Control Spec"
manufacturer: Marantz
model_family: "AV 10 Series"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "AV 10 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:24.677Z
last_checked_at: 2026-05-14T18:17:17.804Z
generated_at: 2026-05-14T18:17:17.804Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document title references Denon; Marantz-specific command differences (if any) are not documented"
  - "firmware version compatibility not stated in source"
  - "full list of PS (parameter setting) commands for Audyssey, room size,"
  - "no explicit multi-step macros described in source"
  - "no explicit safety interlock procedures documented in source"
  - "source references Denon model numbers (X1100, S700, X4100) in parameter notes — unclear which features apply specifically to Marantz AV 10 Series"
  - "no firmware version range specified for command compatibility"
  - "Auro-3D commands marked as \"Auro-3D Upgrade only\" — unclear if AV 10 Series includes this natively"
  - "HDRADIO, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR availability may vary by region"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.804Z
  matched_actions: 102
  action_count: 114
  confidence: medium
  summary: "Every spec action matched literally to source command table; all transport parameters verified in protocol specification section. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Marantz AV 10 Series Control Spec

## Summary
The Marantz AV 10 Series is a high-end A/V preamplifier/processor controllable via RS-232C serial and TCP/IP (Telnet on port 23). The protocol uses ASCII command strings terminated with carriage return (0x0D). Commands cover power, volume, input selection, surround modes, zone 2/3 control, tuner, network/USB playback, video output, tone control, and system settings. This protocol is shared with Denon AV receivers.

<!-- UNRESOLVED: source document title references Denon; Marantz-specific command differences (if any) are not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  connector: DB-9 female (DCE type, pins 1:GND, 2:TxD, 3:RxD, 5:Common, 4/6/7/8/9:NC)
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  duplex: half
  max_data_length: 135
addressing:
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # PW on/off/standby commands
  - routable     # SI input select, SV video select, Z2/Z3 source select
  - queryable    # ? parameter on most commands returns status
  - levelable    # MV master volume, CV channel volume, tone controls
```

## Actions
```yaml
actions:
  # --- Power ---
  - id: power_on
    label: Power On
    kind: action
    command: PWON
    description: "Power on. Wait 1 second before sending next command after PWON."
    params: []

  - id: power_standby
    label: Power Standby
    kind: action
    command: PWSTANDBY
    description: "Set system to standby."
    params: []

  - id: power_query
    label: Power Status Query
    kind: query
    command: "PW?"
    description: "Request current power status."
    params: []

  # --- Master Volume ---
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
    command: "MV**"
    description: "Direct volume set. 00-98 by ASCII, 80=0dB, 00=---(MIN). 0.5dB steps use 3 chars (e.g. MV805=+0.5dB)."
    params:
      - name: level
        type: string
        description: "Two or three ASCII chars. 80=0dB, 00=---(MIN), 98=+18dB. Half-dB: 805=+0.5dB, 795=-0.5dB."

  - id: master_volume_query
    label: Master Volume Query
    kind: query
    command: "MV?"
    params: []

  # --- Mute ---
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

  - id: mute_query
    label: Mute Status Query
    kind: query
    command: "MU?"
    params: []

  # --- Input Select ---
  - id: select_input
    label: Select Input Source
    kind: action
    command: "SI{source}"
    description: "Select input source. Also starts playback for USB/iPod sources."
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
        description: "Input source name."

  - id: input_query
    label: Input Source Query
    kind: query
    command: "SI?"
    params: []

  # --- Main Zone On/Off ---
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

  - id: main_zone_query
    label: Main Zone Status Query
    kind: query
    command: "ZM?"
    params: []

  - id: main_zone_favorite
    label: Main Zone Favorite Select
    kind: action
    command: "ZMFAVORITE{n}"
    description: "Select favorite 1-4."
    params:
      - name: number
        type: integer
        values: [1, 2, 3, 4]

  - id: main_zone_favorite_memory
    label: Main Zone Favorite Memory
    kind: action
    command: "ZMFAVORITE{n} MEMORY"
    description: "Store current state to favorite 1-4."
    params:
      - name: number
        type: integer
        values: [1, 2, 3, 4]

  # --- Surround Mode ---
  - id: surround_mode_set
    label: Set Surround Mode
    kind: action
    command: "MS{mode}"
    description: "Set surround mode. Available modes depend on current input and speaker config."
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
          - "DOLBY SURROUND"
          - "DOLBY ATMOS"
          - "DTS SURROUND"
          - "MULTI CH IN"
          - "MULTI CH IN 7.1"
          - "MCH STEREO"
          - AURO3D
          - AURO2DSURR
          - "WIDE SCREEN"
          - "SUPER STADIUM"
          - "ROCK ARENA"
          - "JAZZ CLUB"
          - "CLASSIC CONCERT"
          - "MONO MOVIE"
          - MATRIX
          - "VIDEO GAME"
          - VIRTUAL
          - "ALL ZONE STEREO"
        description: "Surround mode name. Not all modes available on all inputs."

  - id: surround_mode_query
    label: Surround Mode Query
    kind: query
    command: "MS?"
    params: []

  # --- Quick Select ---
  - id: quick_select
    label: Quick Select
    kind: action
    command: "MSQUICK{n}"
    description: "Quick select mode 1-5."
    params:
      - name: number
        type: integer
        values: [1, 2, 3, 4, 5]

  - id: quick_select_memory
    label: Quick Select Memory
    kind: action
    command: "MSQUICK{n} MEMORY"
    description: "Store current state to quick select 1-5."
    params:
      - name: number
        type: integer
        values: [1, 2, 3, 4, 5]

  - id: quick_select_query
    label: Quick Select Query
    kind: query
    command: "MSQUICK?"
    params: []

  # --- Channel Volume ---
  - id: channel_volume_up
    label: Channel Volume Up
    kind: action
    command: "CV{channel} UP"
    description: "Increase channel volume. Range 38-62, 50=0dB."
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
        description: "Speaker channel abbreviation."

  - id: channel_volume_down
    label: Channel Volume Down
    kind: action
    command: "CV{channel} DOWN"
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
        description: "Speaker channel abbreviation."

  - id: channel_volume_set
    label: Channel Volume Set
    kind: action
    command: "CV{channel} {level}"
    description: "Direct set. Range 38-62, 50=0dB."
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
      - name: level
        type: integer
        description: "38-62, 50=0dB."

  - id: channel_volume_reset
    label: Channel Volume Reset
    kind: action
    command: CVZRL
    description: "Reset all channel levels to factory defaults."
    params: []

  - id: channel_volume_query
    label: Channel Volume Query
    kind: query
    command: "CV?"
    description: "Returns all configured speaker channel levels ending with CVEND."
    params: []

  # --- Input Mode ---
  - id: input_mode_set
    label: Set Input Mode
    kind: action
    command: "SD{mode}"
    description: "Set input decode mode."
    params:
      - name: mode
        type: enum
        values: [AUTO, HDMI, DIGITAL, ANALOG, "EXT.IN", "7.1IN"]
        description: "AUTO priority: HDMI>>DIGITAL>>ANALOG."

  - id: input_mode_query
    label: Input Mode Query
    kind: query
    command: "SD?"
    params: []

  # --- Digital Input ---
  - id: digital_input_set
    label: Set Digital Input Mode
    kind: action
    command: "DC{mode}"
    params:
      - name: mode
        type: enum
        values: [AUTO, PCM, DTS]

  - id: digital_input_query
    label: Digital Input Query
    kind: query
    command: "DC?"
    params: []

  # --- Video Select ---
  - id: video_select
    label: Video Select Source
    kind: action
    command: "SV{source}"
    description: "Select video source for overlay. SOURCE cancels video select."
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

  - id: video_select_query
    label: Video Select Query
    kind: query
    command: "SV?"
    params: []

  # --- Sleep Timer ---
  - id: sleep_timer_set
    label: Set Sleep Timer
    kind: action
    command: "SLP{minutes}"
    description: "Set sleep timer. SLPOFF to cancel. Range 1-120 minutes."
    params:
      - name: minutes
        type: integer
        description: "1-120 minutes, or 0 for OFF."

  - id: sleep_timer_query
    label: Sleep Timer Query
    kind: query
    command: "SLP?"
    params: []

  # --- Auto Standby ---
  - id: auto_standby_set
    label: Set Auto Standby
    kind: action
    command: "STBY{timeout}"
    params:
      - name: timeout
        type: enum
        values: ["15M", "30M", "60M", OFF]

  - id: auto_standby_query
    label: Auto Standby Query
    kind: query
    command: "STBY?"
    params: []

  # --- ECO Mode ---
  - id: eco_mode_set
    label: Set ECO Mode
    kind: action
    command: "ECO{mode}"
    params:
      - name: mode
        type: enum
        values: [ON, AUTO, OFF]

  - id: eco_mode_query
    label: ECO Mode Query
    kind: query
    command: "ECO?"
    params: []

  # --- Tone Control ---
  - id: tone_control_on
    label: Tone Control On
    kind: action
    command: "PSTONE CTRL ON"
    params: []

  - id: tone_control_off
    label: Tone Control Off
    kind: action
    command: "PSTONE CTRL OFF"
    params: []

  - id: tone_control_query
    label: Tone Control Query
    kind: query
    command: "PSTONE CTRL?"
    params: []

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
    label: Bass Set
    kind: action
    command: "PSBAS {level}"
    description: "Direct set. 00-99, 50=0dB. AVR range -6 to +6 (44 to 56)."
    params:
      - name: level
        type: integer

  - id: bass_query
    label: Bass Query
    kind: query
    command: "PSBAS?"
    params: []

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
    label: Treble Set
    kind: action
    command: "PSTRE {level}"
    description: "Direct set. 00-99, 50=0dB. AVR range -6 to +6 (44 to 56)."
    params:
      - name: level
        type: integer

  - id: treble_query
    label: Treble Query
    kind: query
    command: "PSTRE?"
    params: []

  # --- Audyssey ---
  - id: multeq_set
    label: Set MultEQ Mode
    kind: action
    command: "PSMULTEQ:{mode}"
    params:
      - name: mode
        type: enum
        values: [AUDYSSEY, "BYP.LR", FLAT, MANUAL, OFF]

  - id: multeq_query
    label: MultEQ Query
    kind: query
    command: "PSMULTEQ?"
    params: []

  - id: dynamic_eq_on
    label: Dynamic EQ On
    kind: action
    command: PSDYNEQ ON
    params: []

  - id: dynamic_eq_off
    label: Dynamic EQ Off
    kind: action
    command: PSDYNEQ OFF
    params: []

  - id: dynamic_eq_query
    label: Dynamic EQ Query
    kind: query
    command: "PSDYNEQ?"
    params: []

  - id: ref_level_offset_set
    label: Set Reference Level Offset
    kind: action
    command: "PSREFLEV {offset}"
    params:
      - name: offset
        type: enum
        values: ["0", "5", "10", "15"]
        description: "Offset in dB."

  - id: dynamic_volume_set
    label: Set Dynamic Volume
    kind: action
    command: "PSDYNVOL {mode}"
    params:
      - name: mode
        type: enum
        values: [HEV, MED, LIT, OFF]
        description: "Heavy, Medium, Light, or Off."

  # --- Video Output ---
  - id: video_output_aspect_set
    label: Set Aspect Ratio
    kind: action
    command: "VSASP{mode}"
    params:
      - name: mode
        type: enum
        values: [NRM, FUL]
        description: "4:3 (NRM) or 16:9 (FUL)."

  - id: video_output_monitor_set
    label: Set HDMI Monitor Output
    kind: action
    command: "VSMONI{output}"
    params:
      - name: output
        type: enum
        values: [AUTO, "1", "2"]

  - id: video_output_resolution_set
    kind: action
    label: Set Video Resolution
    command: "VSSC{resolution}"
    params:
      - name: resolution
        type: enum
        values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]

  - id: hdmi_audio_set
    label: Set HDMI Audio Output
    kind: action
    command: "VSAUDIO {target}"
    params:
      - name: target
        type: enum
        values: [AMP, TV]

  # --- Zone 2 ---
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

  - id: zone2_query
    label: Zone 2 Status Query
    kind: query
    command: "Z2?"
    params: []

  - id: zone2_source_select
    label: Zone 2 Source Select
    kind: action
    command: "Z2{source}"
    description: "Z2SOURCE cancels zone 2 mode (follows main zone)."
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, "USB/IPOD", USB, IPD, IRP, FVP]

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
    command: "Z2{level}"
    description: "00-98 by ASCII, 80=0dB, 00=---(MIN)."
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

  - id: zone2_mute_query
    label: Zone 2 Mute Query
    kind: query
    command: "Z2MU?"
    params: []

  # --- Zone 3 ---
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

  - id: zone3_query
    label: Zone 3 Status Query
    kind: query
    command: "Z3?"
    params: []

  - id: zone3_source_select
    label: Zone 3 Source Select
    kind: action
    command: "Z3{source}"
    description: "Z3SOURCE cancels zone 3 mode (follows main zone)."
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, "USB/IPOD", USB, IPD, IRP, FVP]

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
    command: "Z3{level}"
    description: "00-98 by ASCII, 80=0dB, 00=---(MIN)."
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

  - id: zone3_mute_query
    label: Zone 3 Mute Query
    kind: query
    command: "Z3MU?"
    params: []

  # --- Dimmer ---
  - id: dimmer_set
    label: Set Display Dimmer
    kind: action
    command: "DIM {level}"
    params:
      - name: level
        type: enum
        values: [BRI, DIM, DAR, OFF, SEL]
        description: "Bright, Dim, Dark, Off, or Toggle cycle."

  - id: dimmer_query
    label: Dimmer Query
    kind: query
    command: "DIM?"
    params: []

  # --- Triggers ---
  - id: trigger1_set
    label: Trigger 1 Control
    kind: action
    command: "TR1 {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: trigger2_set
    label: Trigger 2 Control
    kind: action
    command: "TR2 {state}"
    params:
      - name: state
        type: enum
        values: [ON, OFF]

  - id: trigger_query
    label: Trigger Status Query
    kind: query
    command: "TR?"
    params: []

  # --- System Lock ---
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
    label: Panel Lock On (except master vol)
    kind: action
    command: SYPANEL LOCK ON
    params: []

  - id: panel_volume_lock_on
    label: Panel + Volume Lock On
    kind: action
    command: "SYPANEL+V LOCK ON"
    params: []

  - id: panel_lock_off
    label: Panel Lock Off
    kind: action
    command: SYPANEL LOCK OFF
    params: []

  # --- Tuner ---
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
    label: Tuner Frequency Set
    kind: action
    command: "TFAN{freq}"
    description: "6-digit ASCII. >050000=AM (kHz), <050000=FM (MHz*100)."
    params:
      - name: freq
        type: string
        description: "6-digit frequency value."

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
    label: Tuner Preset Set
    kind: action
    command: "TPAN{preset}"
    params:
      - name: preset
        type: integer
        description: "01-56."

  # --- Network/USB/BT Playback ---
  - id: net_cursor_up
    label: Net Cursor Up
    kind: action
    command: NS90
    params: []

  - id: net_cursor_down
    label: Net Cursor Down
    kind: action
    command: NS91
    params: []

  - id: net_cursor_left
    label: Net Cursor Left
    kind: action
    command: NS92
    params: []

  - id: net_cursor_right
    label: Net Cursor Right
    kind: action
    command: NS93
    params: []

  - id: net_enter
    label: Net Enter (Play/Pause)
    kind: action
    command: NS94
    params: []

  - id: net_play
    label: Net Play
    kind: action
    command: NS9A
    params: []

  - id: net_pause
    label: Net Pause
    kind: action
    command: NS9B
    params: []

  - id: net_stop
    label: Net Stop
    kind: action
    command: NS9C
    params: []

  - id: net_skip_plus
    label: Net Skip Forward
    kind: action
    command: NS9D
    params: []

  - id: net_skip_minus
    label: Net Skip Backward
    kind: action
    command: NS9E
    params: []

  - id: net_repeat_one
    label: Net Repeat One
    kind: action
    command: NS9H
    params: []

  - id: net_repeat_all
    label: Net Repeat All
    kind: action
    command: NS9I
    params: []

  - id: net_repeat_off
    label: Net Repeat Off
    kind: action
    command: NS9J
    params: []

  - id: net_random_on
    label: Net Random On
    kind: action
    command: NS9K
    params: []

  - id: net_random_off
    label: Net Random Off
    kind: action
    command: NS9M
    params: []

  # UNRESOLVED: full list of PS (parameter setting) commands for Audyssey, room size,
  # graphic EQ, DRC, dialogue enhancer, LFE, effect level, delay, panorama,
  # dimension, center width, etc. - partially documented above.
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [ON, STANDBY]
    command: "PW?"
    response_pattern: "PW{state}<CR>"

  - id: master_volume
    type: string
    command: "MV?"
    response_pattern: "MV{level}<CR>"
    description: "2-3 ASCII chars. 80=0dB, 00=---(MIN). Half-dB uses 3 chars."

  - id: mute_state
    type: enum
    values: [ON, OFF]
    command: "MU?"
    response_pattern: "MU{state}<CR>"

  - id: input_source
    type: string
    command: "SI?"
    response_pattern: "SI{source}<CR>"
    description: "Returns current input source name."

  - id: surround_mode
    type: string
    command: "MS?"
    response_pattern: "MS{mode}<CR>"
    description: "Returns current surround mode name."

  - id: main_zone_state
    type: enum
    values: [ON, OFF]
    command: "ZM?"
    response_pattern: "ZM{state}<CR>"

  - id: zone2_state
    type: enum
    values: [ON, OFF]
    command: "Z2?"
    response_pattern: "Z2{state}<CR>"

  - id: zone2_volume
    type: string
    command: "Z2?"
    description: "Returns Z2 level on volume changes."

  - id: zone3_state
    type: enum
    values: [ON, OFF]
    command: "Z3?"
    response_pattern: "Z3{state}<CR>"

  - id: zone3_volume
    type: string
    command: "Z3?"
    description: "Returns Z3 level on volume changes."

  - id: channel_volume_status
    type: string
    command: "CV?"
    response_pattern: "CV{ch} {level}<CR>:...:CVEND<CR>"
    description: "Returns all configured speaker channel levels, terminated by CVEND."

  - id: input_mode
    type: string
    command: "SD?"
    response_pattern: "SD{mode}<CR>"

  - id: video_select_state
    type: string
    command: "SV?"
    response_pattern: "SV{source}<CR>"

  - id: sleep_timer
    type: string
    command: "SLP?"
    response_pattern: "SLP{value}<CR>"
    description: "OFF or 001-120 minutes."

  - id: eco_mode
    type: enum
    values: [ON, AUTO, OFF]
    command: "ECO?"
    response_pattern: "ECO{mode}<CR>"

  - id: dimmer_state
    type: string
    command: "DIM?"
    response_pattern: "DIM{state}<CR>"
```

## Events
```yaml
events:
  - id: power_event
    description: "Unsolicited. Sent when power state changes from front panel or remote."
    pattern: "PWON<CR> or PWSTANDBY<CR>"
    sent_within: "5 seconds of state change"

  - id: volume_event
    description: "Unsolicited. Sent when master volume changes from front panel or remote."
    pattern: "MV{level}<CR>"
    sent_within: "5 seconds of state change"

  - id: mute_event
    description: "Unsolicited. Sent when mute state changes."
    pattern: "MUON<CR> or MUOFF<CR>"
    sent_within: "5 seconds of state change"

  - id: input_source_event
    description: "Unsolicited. Sent when input source changes. May also trigger surround mode and channel volume events."
    pattern: "SI{source}<CR>"
    sent_within: "5 seconds of state change"

  - id: surround_mode_event
    description: "Unsolicited. Sent when surround mode changes. Present mode is returned before post-change mode."
    pattern: "MS{mode}<CR>"
    sent_within: "5 seconds of state change"

  - id: channel_volume_event
    description: "Unsolicited. Sent when channel volumes change (e.g. due to input source change). Only returns if values differ from previous input."
    pattern: "CV{ch} {level}<CR>"
    sent_within: "5 seconds of state change"

  - id: main_zone_event
    description: "Unsolicited. Sent when main zone on/off changes."
    pattern: "ZMON<CR> or ZMOFF<CR>"
    sent_within: "5 seconds of state change"
```

## Variables
```yaml
variables:
  - id: master_volume_db
    type: string
    description: "Master volume as dB-encoded ASCII. 80=0dB, 00=---(MIN), 98=+18dB. 0.5dB steps use 3 chars."
    min: "00"
    max: "98"
    command_prefix: MV

  - id: channel_volume_db
    type: integer
    description: "Per-channel volume. Range 38-62, 50=0dB."
    min: 38
    max: 62
    command_prefix: CV

  - id: zone2_volume_db
    type: string
    description: "Zone 2 volume. Same encoding as master volume."
    min: "00"
    max: "98"
    command_prefix: Z2

  - id: zone3_volume_db
    type: string
    description: "Zone 3 volume. Same encoding as master volume."
    min: "00"
    max: "98"
    command_prefix: Z3

  - id: bass_level
    type: integer
    description: "Bass level. 00-99, 50=0dB. AVR range -6 to +6 (44-56)."
    min: 44
    max: 56
    command_prefix: PSBAS

  - id: treble_level
    type: integer
    description: "Treble level. 00-99, 50=0dB. AVR range -6 to +6 (44-56)."
    min: 44
    max: 56
    command_prefix: PSTRE
```

## Macros
```yaml
macros: []
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after sending PWON before transmitting the next command."
    source: "Source note J: 1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)."
  - description: "Send commands at 50ms or greater intervals."
    source: "Source: Send the COMMAND in 50ms or more intervals."
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes
- The protocol document is titled "Denon AV Receiver Control Protocol" — Marantz and Denon share the same control protocol under their common parent company. The Marantz AV 10 Series uses this identical protocol.
- Command format is ASCII: `COMMAND + PARAMETER + CR (0x0D)`. Command is always 2 characters; parameter is up to 25 characters.
- Query format: append `?` as the parameter (e.g. `PW?<CR>`). Response should arrive within 200ms.
- Volume encoding uses a non-linear ASCII scheme: `00`=---(MIN), `80`=0dB, `98`=+18dB. Half-dB steps use 3 characters (e.g. `805`=+0.5dB).
- Channel volume encoding is linear: 38-62 with 50=0dB.
- When input source changes, surround mode and channel volume events are sent only if they differ from the previous source's values.
- EVENTS should be sent within 5 seconds of state change. RESPONSES to queries should be sent within 200ms.
- The device supports RS-232C (DB-9 female, DCE) and TCP/IP (Telnet port 23) simultaneously.

<!-- UNRESOLVED: source references Denon model numbers (X1100, S700, X4100) in parameter notes — unclear which features apply specifically to Marantz AV 10 Series -->
<!-- UNRESOLVED: no firmware version range specified for command compatibility -->
<!-- UNRESOLVED: Auro-3D commands marked as "Auro-3D Upgrade only" — unclear if AV 10 Series includes this natively -->
<!-- UNRESOLVED: HDRADIO, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR availability may vary by region -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:24.677Z
last_checked_at: 2026-05-14T18:17:17.804Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.804Z
matched_actions: 102
action_count: 114
confidence: medium
summary: "Every spec action matched literally to source command table; all transport parameters verified in protocol specification section. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document title references Denon; Marantz-specific command differences (if any) are not documented"
- "firmware version compatibility not stated in source"
- "full list of PS (parameter setting) commands for Audyssey, room size,"
- "no explicit multi-step macros described in source"
- "no explicit safety interlock procedures documented in source"
- "source references Denon model numbers (X1100, S700, X4100) in parameter notes — unclear which features apply specifically to Marantz AV 10 Series"
- "no firmware version range specified for command compatibility"
- "Auro-3D commands marked as \"Auro-3D Upgrade only\" — unclear if AV 10 Series includes this natively"
- "HDRADIO, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR availability may vary by region"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
