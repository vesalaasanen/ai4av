---
spec_id: admin/marantz-cinema-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz Cinema Series Control Spec"
manufacturer: Marantz
model_family: "Marantz Cinema Series"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "Marantz Cinema Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-04-25T21:08:46.868Z
generated_at: 2026-04-25T21:08:46.868Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:08:46.868Z
  matched_actions: 144
  action_count: 144
  confidence: high
  summary: "All 144 spec actions matched literal commands in source; transport parameters verified; coverage is complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Marantz Cinema Series Control Spec

## Summary
The Marantz Cinema Series AV receivers support control via RS-232 serial and Ethernet (TCP port 23, telnet) using an ASCII command protocol. Commands consist of a 2-character command code followed by a parameter and a carriage return (0x0D). The protocol provides control for power, volume, input selection, surround modes, multi-zone operation, tuner, and system settings. This protocol is shared with Denon AV receivers.

<!-- UNRESOLVED: specific Marantz Cinema Series model numbers not stated in source document -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: source document is titled "Denon AV Receiver Control Protocol" — Marantz and Denon share the same protocol but exact model coverage is unconfirmed -->

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
  - powerable     # inferred from PW power on/off/standby commands
  - levelable     # inferred from MV volume, CV channel volume, tone controls
  - queryable     # inferred from ? query commands on most parameters
  - routable      # inferred from SI input select, SV video select, Z2/Z3 zone routing
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PWON
    params: []
    notes: Wait 1 second before sending next command after PWON

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
    command: MV{level}
    params:
      - name: level
        type: string
        description: "Volume as ASCII: 00=MIN(---), 80=0dB, 98=+18dB. 0.5dB steps use 3 chars (e.g. MV805=+0.5dB)"
    examples:
      - "MV80 = 0dB"
      - "MV81 = +1dB"
      - "MV805 = +0.5dB"
      - "MV795 = -0.5dB"
      - "MV00 = MIN (---)"

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
        description: Input source name

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

  - id: favorite_select
    label: Select Favorite
    kind: action
    command: ZMFAVORITE{n}
    params:
      - name: n
        type: integer
        description: "Favorite number (1-4)"

  - id: favorite_memory
    label: Store Favorite
    kind: action
    command: ZMFAVORITE{n} MEMORY
    params:
      - name: n
        type: integer
        description: "Favorite number (1-4)"

  - id: input_mode_set
    label: Set Input Mode
    kind: action
    command: SD{mode}
    params:
      - name: mode
        type: enum
        values: [AUTO, HDMI, DIGITAL, ANALOG, "EXT.IN", "7.1IN", NO]
        description: Input mode selection

  - id: digital_input_set
    label: Set Digital Input Mode
    kind: action
    command: DC{mode}
    params:
      - name: mode
        type: enum
        values: [AUTO, PCM, DTS]
        description: Digital input decoding mode

  - id: surround_mode_set
    label: Set Surround Mode
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
          - PURE DIRECT
          - STEREO
          - AUTO
          - DOLBY DIGITAL
          - DOLBY SURROUND
          - DOLBY ATMOS
          - DTS SURROUND
          - DTS HD MSTR
          - MCH STEREO
          - AURO3D
          - AURO2DSURR
          - WIDE SCREEN
          - SUPER STADIUM
          - ROCK ARENA
          - JAZZ CLUB
          - CLASSIC CONCERT
          - MONO MOVIE
          - MATRIX
          - VIDEO GAME
          - VIRTUAL
          - ALL ZONE STEREO
        description: Surround mode name (partial list; source contains extensive Dolby/DTS variants)
    notes: Full list includes many Dolby PL2/PL2X/PL2Z and DTS NEO:X variants

  - id: quick_select
    label: Quick Select
    kind: action
    command: MSQUICK{n}
    params:
      - name: n
        type: integer
        description: "Quick select number (1-5)"

  - id: quick_memory
    label: Quick Select Memory
    kind: action
    command: MSQUICK{n} MEMORY
    params:
      - name: n
        type: integer
        description: "Quick select number (1-5)"

  - id: channel_volume_up
    label: Channel Volume Up
    kind: action
    command: CV{channel} UP
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
        description: Speaker channel abbreviation

  - id: channel_volume_down
    label: Channel Volume Down
    kind: action
    command: CV{channel} DOWN
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
        description: Speaker channel abbreviation

  - id: channel_volume_set
    label: Set Channel Volume
    kind: action
    command: CV{channel} {level}
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
        description: Speaker channel abbreviation
      - name: level
        type: integer
        description: "38-62 by ASCII, 50=0dB"

  - id: channel_volume_reset
    label: Reset All Channel Levels
    kind: action
    command: CVZRL
    params: []

  - id: sleep_timer_set
    label: Set Sleep Timer
    kind: action
    command: SLP{minutes}
    params:
      - name: minutes
        type: integer
        description: "OFF or 1-120 minutes (3-digit ASCII, e.g. 010=10min)"

  - id: auto_standby_set
    label: Set Auto Standby
    kind: action
    command: STBY{period}
    params:
      - name: period
        type: enum
        values: ["15M", "30M", "60M", OFF]
        description: Auto standby timer period

  - id: eco_mode_set
    label: Set Eco Mode
    kind: action
    command: ECO{mode}
    params:
      - name: mode
        type: enum
        values: [ON, AUTO, OFF]

  - id: video_select_source
    label: Video Select Source
    kind: action
    command: SV{source}
    params:
      - name: source
        type: enum
        values: [DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE]
        description: "Video source. SOURCE cancels video select mode."

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

  - id: tone_control_on
    label: Tone Control On
    kind: action
    command: PSTONE CTRL ON
    params: []

  - id: tone_control_off
    label: Tone Control Off
    kind: action
    command: PSTONE CTRL OFF
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
    label: Set Bass Level
    kind: action
    command: PSBAS {level}
    params:
      - name: level
        type: integer
        description: "00-99, 50=0dB, AVR range -6 to +6 (44-56)"

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
    command: PSTRE {level}
    params:
      - name: level
        type: integer
        description: "00-99, 50=0dB, AVR range -6 to +6 (44-56)"

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

  - id: dialogue_enhancer_set
    label: Set Dialogue Enhancer
    kind: action
    command: PSDEH {mode}
    params:
      - name: mode
        type: enum
        values: [OFF, LOW, MED, HIGH]

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

  - id: dynamic_volume_set
    label: Set Dynamic Volume
    kind: action
    command: PSDYNVOL {mode}
    params:
      - name: mode
        type: enum
        values: [HEV, MED, LIT, OFF]

  - id: multeq_set
    label: Set MultEQ Mode
    kind: action
    command: PSMULTEQ:{mode}
    params:
      - name: mode
        type: enum
        values: [AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF]

  - id: audyssey_lfc_on
    label: Audyssey LFC On
    kind: action
    command: PSLFC ON
    params: []

  - id: audyssey_lfc_off
    label: Audyssey LFC Off
    kind: action
    command: PSLFC OFF
    params: []

  - id: drc_set
    label: Set Dynamic Compression
    kind: action
    command: PSDRC {mode}
    params:
      - name: mode
        type: enum
        values: [AUTO, LOW, MID, HI, OFF]

  - id: cinema_eq_on
    label: Cinema EQ On
    kind: action
    command: PSCINEMA EQ.ON
    params: []

  - id: cinema_eq_off
    label: Cinema EQ Off
    kind: action
    command: PSCINEMA EQ.OFF
    params: []

  - id: picture_mode_set
    label: Set Picture Mode
    kind: action
    command: PV{mode}
    params:
      - name: mode
        type: enum
        values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]
        description: "OFF=Off, STD=Standard, MOV=Movie, VVD=Vivid, STM=Stream, CTM=Custom, DAY=ISF Day, NGT=ISF Night"

  - id: picture_contrast_set
    label: Set Picture Contrast
    kind: action
    command: PVCN {value}
    params:
      - name: value
        type: integer
        description: "000-100, 050=0, range -50 to +50"

  - id: picture_brightness_set
    label: Set Picture Brightness
    kind: action
    command: PVBR {value}
    params:
      - name: value
        type: integer
        description: "000-100, 050=0, range -50 to +50"

  - id: video_output_resolution_set
    label: Set Video Output Resolution
    kind: action
    command: VSSC{resolution}
    params:
      - name: resolution
        type: enum
        values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]
        description: "480p/576p, 1080i, 720p, 1080p, 1080p24, 4K, 4K60/50, AUTO"

  - id: hdmi_monitor_set
    label: Set HDMI Monitor Output
    kind: action
    command: VSMONI{output}
    params:
      - name: output
        type: enum
        values: [AUTO, "1", "2"]
        description: "AUTO, MONITOR OUT-1, MONITOR OUT-2"

  - id: hdmi_audio_output_set
    label: Set HDMI Audio Output
    kind: action
    command: VSAUDIO {destination}
    params:
      - name: destination
        type: enum
        values: [AMP, TV]

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

  - id: zone2_select_input
    label: Zone 2 Select Input
    kind: action
    command: Z2{source}
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, "USB/IPOD", USB, IPD, IRP, FVP]
        description: "SOURCE cancels zone 2 mode (follows main zone)"

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
    command: Z2{level}
    params:
      - name: level
        type: string
        description: "00-98 by ASCII, 80=0dB, 00=MIN(---). Same encoding as master volume."

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

  - id: zone2_quick_select
    label: Zone 2 Quick Select
    kind: action
    command: Z2QUICK{n}
    params:
      - name: n
        type: integer
        description: "Quick select number (1-5)"

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

  - id: zone3_select_input
    label: Zone 3 Select Input
    kind: action
    command: Z3{source}
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, "USB/IPOD", USB, IPD, IRP, FVP]
        description: "SOURCE cancels zone 3 mode (follows main zone)"

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
    command: Z3{level}
    params:
      - name: level
        type: string
        description: "00-98 by ASCII, 80=0dB, 00=MIN(---). Same encoding as master volume."

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

  - id: tuner_frequency_set
    label: Set Tuner Frequency
    kind: action
    command: TFAN{frequency}
    params:
      - name: frequency
        type: string
        description: "6-digit ASCII. >050000=AM (kHz), <050000=FM (MHz*100). e.g. 105000=1050.00kHz AM"

  - id: tuner_preset_call
    label: Tuner Preset Call
    kind: action
    command: TPAN{preset}
    params:
      - name: preset
        type: integer
        description: "Preset number 01-56"

  - id: tuner_band_set
    label: Set Tuner Band
    kind: action
    command: TMAN{band}
    params:
      - name: band
        type: enum
        values: [AM, FM]

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
    label: Net/USB Enter (Play/Pause)
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
    command: NSB{preset}
    params:
      - name: preset
        type: integer
        description: "Preset number 00-35"

  - id: net_usb_preset_memory
    label: Net/USB Preset Memory
    kind: action
    command: NSC{preset}
    params:
      - name: preset
        type: integer
        description: "Preset number 00-35"

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
    label: Set Front Panel Dimmer
    kind: action
    command: DIM {level}
    params:
      - name: level
        type: enum
        values: [BRI, DIM, DAR, OFF, SEL]
        description: "BRI=Bright, DIM=Dim, DAR=Dark, OFF=Off, SEL=Toggle through levels"

  - id: record_select
    label: Record Select
    kind: action
    command: SR{source}
    params:
      - name: source
        type: enum
        values: [PHONO, IPOD, "USB DIRECT", "IPOD DIRECT", SOURCE]
        description: "SOURCE cancels REC SELECT mode"

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

  - id: panel_lock_off
    label: Panel Lock Off
    kind: action
    command: SYPANEL LOCK OFF
    params: []

  - id: panel_volume_lock_on
    label: Panel + Volume Lock On
    kind: action
    command: SYPANEL+V LOCK ON
    params: []

  - id: remote_maintenance_start
    label: Remote Maintenance Start
    kind: action
    command: RM STA
    params: []

  - id: remote_maintenance_end
    label: Remote Maintenance End
    kind: action
    command: RM END
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [ON, STANDBY]
    query_command: PW?
    response_prefix: PW

  - id: master_volume
    type: string
    query_command: MV?
    response_prefix: MV
    description: "Volume as ASCII: 00=MIN, 80=0dB. 3-char for 0.5dB steps (e.g. 805)."

  - id: mute_state
    type: enum
    values: [ON, OFF]
    query_command: MU?
    response_prefix: MU

  - id: input_source
    type: string
    query_command: SI?
    response_prefix: SI
    description: Returns current input source name

  - id: main_zone_state
    type: enum
    values: [ON, OFF]
    query_command: ZM?
    response_prefix: ZM

  - id: surround_mode
    type: string
    query_command: MS?
    response_prefix: MS
    description: Returns current surround mode name

  - id: input_mode
    type: string
    query_command: SD?
    response_prefix: SD
    description: "Returns input mode (AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO, ARC)"

  - id: digital_input_mode
    type: string
    query_command: DC?
    response_prefix: DC

  - id: video_select_state
    type: string
    query_command: SV?
    response_prefix: SV
    description: "Returns video source and ON/OFF status"

  - id: channel_volume
    type: string
    query_command: CV?
    response_prefix: CV
    description: "Returns all configured speaker channel volumes, terminated with CVEND"

  - id: sleep_timer
    type: string
    query_command: SLP?
    response_prefix: SLP
    description: "Returns OFF or remaining minutes (001-120)"

  - id: auto_standby
    type: enum
    values: ["15M", "30M", "60M", OFF]
    query_command: STBY?
    response_prefix: STBY

  - id: eco_mode
    type: enum
    values: [ON, AUTO, OFF]
    query_command: ECO?
    response_prefix: ECO

  - id: tone_control_state
    type: enum
    values: [ON, OFF]
    query_command: PSTONE CTRL?
    response_prefix: PSTONE CTRL

  - id: bass_level
    type: string
    query_command: PSBAS?
    response_prefix: PSBAS

  - id: treble_level
    type: string
    query_command: PSTRE?
    response_prefix: PSTRE

  - id: subwoofer_level_state
    type: string
    query_command: PSSWL?
    response_prefix: PSSWL
    description: "Returns ON/OFF status and level(s)"

  - id: dialogue_enhancer
    type: enum
    values: [OFF, LOW, MED, HIGH]
    query_command: PSDEH?
    response_prefix: PSDEH

  - id: dynamic_eq
    type: enum
    values: [ON, OFF]
    query_command: PSDYNEQ?
    response_prefix: PSDYNEQ

  - id: dynamic_volume
    type: enum
    values: [HEV, MED, LIT, OFF]
    query_command: PSDYNVOL?
    response_prefix: PSDYNVOL

  - id: multeq_mode
    type: enum
    values: [AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF]
    query_command: PSMULTEQ?
    response_prefix: PSMULTEQ

  - id: audyssey_lfc
    type: enum
    values: [ON, OFF]
    query_command: PSLFC?
    response_prefix: PSLFC

  - id: containment_amount
    type: string
    query_command: PSCNTAMT?
    response_prefix: PSCNTAMT
    description: "01-07"

  - id: dynamic_compression
    type: enum
    values: [AUTO, LOW, MID, HI, OFF]
    query_command: PSDRC?
    response_prefix: PSDRC

  - id: cinema_eq
    type: enum
    values: [ON, OFF]
    query_command: PSCINEMA EQ.?
    response_prefix: PSCINEMA EQ.

  - id: picture_mode
    type: string
    query_command: PV?
    response_prefix: PV

  - id: picture_contrast
    type: string
    query_command: PVCN?
    response_prefix: PVCN

  - id: picture_brightness
    type: string
    query_command: PVBR?
    response_prefix: PVBR

  - id: video_resolution
    type: string
    query_command: VSSC?
    response_prefix: VSSC

  - id: hdmi_monitor
    type: string
    query_command: VSMONI?
    response_prefix: VSMONI

  - id: hdmi_audio_output
    type: enum
    values: [AMP, TV]
    query_command: VSAUDIO?
    response_prefix: VSAUDIO

  - id: zone2_state
    type: enum
    values: [ON, OFF]
    query_command: Z2?
    response_prefix: Z2

  - id: zone2_volume
    type: string
    query_command: Z2?
    response_prefix: Z2
    description: "Returns volume level in same format as master volume"

  - id: zone2_mute
    type: enum
    values: [ON, OFF]
    query_command: Z2MU?
    response_prefix: Z2MU

  - id: zone3_state
    type: enum
    values: [ON, OFF]
    query_command: Z3?
    response_prefix: Z3

  - id: zone3_volume
    type: string
    query_command: Z3?
    response_prefix: Z3

  - id: zone3_mute
    type: enum
    values: [ON, OFF]
    query_command: Z3MU?
    response_prefix: Z3MU

  - id: tuner_frequency
    type: string
    query_command: TFAN?
    response_prefix: TFAN
    description: "6-digit frequency value"

  - id: tuner_preset
    type: string
    query_command: TPAN?
    response_prefix: TPAN

  - id: tuner_band
    type: string
    query_command: TMAN?
    response_prefix: TMAN

  - id: rds_station_name
    type: string
    query_command: TFANNAME?
    response_prefix: TFANNAME
    description: "RDS station name (EU/AP only)"

  - id: trigger_state
    type: string
    query_command: TR?
    response_prefix: TR
    description: "Returns TR1 and TR2 status"

  - id: dimmer_state
    type: enum
    values: [BRI, DIM, DAR, OFF]
    query_command: DIM?
    response_prefix: DIM

  - id: setup_menu_state
    type: enum
    values: [ON, OFF]
    query_command: MNMEN?
    response_prefix: MNMEN

  - id: all_zone_stereo
    type: enum
    values: [ON, OFF]
    query_command: MNZST?
    response_prefix: MNZST

  - id: remote_maintenance
    type: enum
    values: [ON, OFF]
    query_command: RM?
    response_prefix: RM

  - id: net_usb_onscreen_ascii
    type: string
    query_command: NSA
    response_prefix: NSA
    description: "Returns NSA0-NSA8 lines (ASCII, 96 bytes each)"

  - id: net_usb_onscreen_utf8
    type: string
    query_command: NSE
    response_prefix: NSE
    description: "Returns NSE0-NSE8 lines (UTF-8, 96 bytes each)"

  - id: net_preset_names
    type: string
    query_command: NSH
    response_prefix: NSH
    description: "Returns preset names (UTF-8), NSH00-NSH35"

  - id: hd_radio_status
    type: string
    query_command: HD?
    response_prefix: HD
    description: "Returns band, station name, multicast channel, signal level, artist, title, album, genre, program type, digital/analog mode"
```

## Variables
```yaml
variables:
  - id: master_volume_db
    type: string
    description: "Master volume in protocol encoding: 00=MIN, 80=0dB, 98=+18dB. 0.5dB step uses 3 chars."
    set_command: MV{value}
    query_command: MV?

  - id: zone2_volume_db
    type: string
    description: "Zone 2 volume in protocol encoding (same as master volume)"
    set_command: Z2{value}
    query_command: Z2?

  - id: zone3_volume_db
    type: string
    description: "Zone 3 volume in protocol encoding (same as master volume)"
    set_command: Z3{value}
    query_command: Z3?
```

## Events
```yaml
events:
  - id: power_event
    description: "Sent when power state changes (PWON or PWSTANDBY)"
    prefix: PW

  - id: master_volume_event
    description: "Sent when master volume changes. Returns within 5 seconds of state change."
    prefix: MV

  - id: mute_event
    description: "Sent when mute state changes"
    prefix: MU

  - id: input_source_event
    description: "Sent when input source changes"
    prefix: SI

  - id: surround_mode_event
    description: "Sent when surround mode changes. Present surround mode is returned before the new mode."
    prefix: MS

  - id: channel_volume_event
    description: "Sent when channel volume changes (triggered by input source change or direct adjustment). Returns for all used channels."
    prefix: CV

  - id: main_zone_event
    description: "Sent when main zone state changes"
    prefix: ZM

  - id: zone2_event
    description: "Sent when zone 2 state changes"
    prefix: Z2

  - id: zone3_event
    description: "Sent when zone 3 state changes"
    prefix: Z3

  - id: input_mode_event
    description: "Sent when input mode changes"
    prefix: SD

  - id: video_select_event
    description: "Sent when video select state changes"
    prefix: SV

  - id: tone_event
    description: "Sent when tone control parameters change"
    prefix: PS

  - id: video_output_event
    description: "Sent when video output settings change"
    prefix: VS

  - id: picture_mode_event
    description: "Sent when picture mode parameters change"
    prefix: PV
```

## Macros
```yaml
macros: []
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after sending PWON before transmitting next command"
    source: "Note J in source: 1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)."
# UNRESOLVED: no additional safety warnings or interlock procedures found in source
```

## Notes
- Commands must be sent at 50ms minimum intervals.
- EVENT messages are sent within 5 seconds of a state change on the device.
- RESPONSE messages are sent within 200ms of receiving a request command (COMMAND+?+CR).
- Maximum communication data length is 135 bytes.
- Channel volume events return for all used channels when the input source changes. If surround mode or channel volume is the same before and after an input source change, no event is returned for that parameter.
- The `?` parameter is used as a query/request for all command groups that support events.
- Volume encoding: 2-char for whole dB steps (00-98, where 80=0dB), 3-char for 0.5dB steps (e.g. 805=+0.5dB, 795=-0.5dB).
- Channel volume range is 38-62 (50=0dB) for most channels; subwoofer is 00,38-62.
- The source document title references "Denon AV Receiver Control Protocol" — Marantz and Denon share this protocol architecture.
- Network Standby must be set to "Always On" for the device to respond to network commands while in standby.

<!-- UNRESOLVED: specific Marantz Cinema Series model numbers not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: max number of concurrent TCP connections not stated -->
<!-- UNRESOLVED: connection keepalive/timeout behavior not stated -->
<!-- UNRESOLVED: whether protocol version varies across Cinema Series models -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-04-25T21:08:46.868Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:08:46.868Z
matched_actions: 144
action_count: 144
confidence: high
summary: "All 144 spec actions matched literal commands in source; transport parameters verified; coverage is complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
