---
spec_id: admin/denon-avr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVR Control Spec"
manufacturer: Denon
model_family: "Denon AVR"
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - "Denon AVR"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
retrieved_at: 2026-04-29T23:27:42.130Z
last_checked_at: 2026-04-23T15:34:43.974Z
generated_at: 2026-04-23T15:34:43.974Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - VSASPNRM
  - VSASPFUL
  - VSVPMAUTO
  - VSVPMGAME
  - VSVPMMOVI
  - VSVST
  - PSDIL
  - PSSWL
  - PSCINEMA
  - PSMODE
  - PSLOM
  - PSFH
verification:
  verdict: verified
  checked_at: 2026-04-23T15:34:43.974Z
  matched_actions: 106
  action_count: 106
  confidence: high
  summary: "All 106 spec actions matched with verbatim evidence in source; transport parameters confirmed; source contains extended audio processing commands beyond spec scope."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Denon AVR Control Spec

## Summary
Denon AV Receiver with RS-232C serial and TCP/IP (telnet) control. ASCII command protocol using 2-character command codes followed by parameters and carriage return (0x0D). Supports main zone, Zone 2, Zone 3, tuner, online music/USB, video scaling, surround mode selection, channel volume, and system control.

<!-- UNRESOLVED: specific AVR model numbers not stated in source; document covers a family of Denon AVRs -->
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
  flow_control: none
auth:
  type: none
```

auth.type inferred: no auth procedure described anywhere in source. TCP port 23 (telnet) stated explicitly. Serial: 9600bps, 8 bits, no parity, 1 stop bit stated explicitly.

## Traits

```yaml
traits:
  - powerable
  - queryable
  - routable
  - levelable
```

powerable: PWON/PWSTANDBY commands. queryable: extensive ?-suffix query commands. routable: SI input select, SV video select. levelable: MV volume, CV channel volume, PS tone controls.

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
    command: MV<value>
    params:
      - name: level
        type: string
        description: "Volume level 00-98, 80=0dB, 00=---(MIN). 0.5dB steps use 3 chars e.g. 805=+0.5dB"
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
    command: SI<value>
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
    label: Set Surround Mode
    kind: action
    command: MS<value>
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
          - DTS HD
          - DTS HD MSTR
          - MCH STEREO
          - MULTI CH IN
          - VIRTUAL
          - AURO3D
          - AURO2DSURR
  - id: video_select
    label: Video Select
    kind: action
    command: SV<value>
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
          - SOURCE
          - ON
          - OFF
  - id: sleep_timer
    label: Set Sleep Timer
    kind: action
    command: SLP<value>
    params:
      - name: minutes
        type: string
        description: "OFF or 001-120 by ASCII (e.g. 010=10min)"
  - id: auto_standby
    label: Set Auto Standby
    kind: action
    command: STBY<value>
    params:
      - name: timeout
        type: enum
        values:
          - "15M"
          - "30M"
          - "60M"
          - OFF
  - id: eco_mode
    label: Set Eco Mode
    kind: action
    command: ECO<value>
    params:
      - name: mode
        type: enum
        values:
          - ON
          - AUTO
          - OFF
  - id: channel_volume_up
    label: Channel Volume Up
    kind: action
    command: CV<channel> UP
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
    label: Channel Volume Set
    kind: action
    command: CV<channel> <value>
    params:
      - name: channel
        type: string
        description: "Channel code (FL, FR, C, SW, etc.)"
      - name: level
        type: string
        description: "38-62 by ASCII, 50=0dB"
  - id: channel_volume_reset
    label: Channel Volume Reset
    kind: action
    command: CVZRL
    params: []
  - id: tone_ctrl_on
    label: Tone Control On
    kind: action
    command: PSTONE CTRL ON
    params: []
  - id: tone_ctrl_off
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
    label: Bass Set
    kind: action
    command: PSBAS<value>
    params:
      - name: level
        type: string
        description: "00-99 by ASCII, 50=0dB, AVR range 44-56"
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
    command: PSTRE<value>
    params:
      - name: level
        type: string
        description: "00-99 by ASCII, 50=0dB, AVR range 44-56"
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
    label: Dynamic Volume Set
    kind: action
    command: PSDYNVOL <value>
    params:
      - name: mode
        type: enum
        values:
          - HEV
          - MED
          - LIT
          - OFF
  - id: multeq_set
    label: MultEQ Set
    kind: action
    command: PSMULTEQ:<value>
    params:
      - name: mode
        type: enum
        values:
          - AUDYSSEY
          - BYP.LR
          - FLAT
          - MANUAL
          - OFF
  - id: picture_mode_set
    label: Picture Mode Set
    kind: action
    command: PV<value>
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
  - id: dimmer_set
    label: Dimmer Set
    kind: action
    command: DIM <value>
    params:
      - name: level
        type: enum
        values:
          - BRI
          - DIM
          - DAR
          - OFF
          - SEL
  - id: video_resolution_set
    label: Video Resolution Set
    kind: action
    command: VSSC<value>
    params:
      - name: resolution
        type: enum
        values:
          - 48P
          - 10I
          - 72P
          - 10P
          - 10P24
          - 4K
          - 4KF
          - AUTO
  - id: hdmi_monitor_set
    label: HDMI Monitor Set
    kind: action
    command: VSMONI<value>
    params:
      - name: output
        type: enum
        values:
          - AUTO
          - "1"
          - "2"
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
    command: Z2<value>
    params:
      - name: level
        type: string
        description: "00-98 by ASCII, 80=0dB, 00=---(MIN)"
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
  - id: zone2_select_input
    label: Zone 2 Select Input
    kind: action
    command: Z2<value>
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
          - IRADIO
          - SERVER
          - FAVORITES
          - AUX1
          - AUX2
          - BT
          - USB
          - IPD
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
    command: Z3<value>
    params:
      - name: level
        type: string
        description: "00-98 by ASCII, 80=0dB, 00=---(MIN)"
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
  - id: zone3_select_input
    label: Zone 3 Select Input
    kind: action
    command: Z3<value>
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
          - IRADIO
          - SERVER
          - FAVORITES
          - AUX1
          - AUX2
          - BT
          - USB
          - IPD
  - id: net_play
    label: Net/USB Play
    kind: action
    command: NS94
    params: []
  - id: net_pause
    label: Net/USB Pause
    kind: action
    command: NS9A
    params: []
  - id: net_stop
    label: Net/USB Stop
    kind: action
    command: NS9B
    params: []
  - id: net_skip_plus
    label: Net/USB Skip Forward
    kind: action
    command: NS9C
    params: []
  - id: net_skip_minus
    label: Net/USB Skip Back
    kind: action
    command: NS9D
    params: []
  - id: net_cursor_up
    label: Net/USB Cursor Up
    kind: action
    command: NS90
    params: []
  - id: net_cursor_down
    label: Net/USB Cursor Down
    kind: action
    command: NS91
    params: []
  - id: net_cursor_left
    label: Net/USB Cursor Left
    kind: action
    command: NS92
    params: []
  - id: net_cursor_right
    label: Net/USB Cursor Right
    kind: action
    command: NS93
    params: []
  - id: quick_select
    label: Quick Select
    kind: action
    command: MSQUICK<value>
    params:
      - name: slot
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"
          - "5"
  - id: quick_memory
    label: Quick Select Memory
    kind: action
    command: MSQUICK<value> MEMORY
    params:
      - name: slot
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"
          - "5"
  - id: favorite_select
    label: Favorite Select
    kind: action
    command: ZMFAVORITE<value>
    params:
      - name: slot
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"
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
    params: []
  - id: panel_lock_off
    label: Panel Lock Off
    kind: action
    command: SYPANEL LOCK OFF
    params: []
  - id: drc_set
    label: Dynamic Range Compression Set
    kind: action
    command: PSDRC <value>
    params:
      - name: mode
        type: enum
        values:
          - AUTO
          - LOW
          - MID
          - HI
          - OFF
  - id: hdmi_audio_out_set
    label: HDMI Audio Output Set
    kind: action
    command: VSAUDIO <value>
    params:
      - name: output
        type: enum
        values:
          - AMP
          - TV
```

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    type: enum
    values:
      - ON
      - STANDBY
    query_command: PW?
    response_prefix: PW
  - id: master_volume
    type: string
    description: "Volume level 00-98, 80=0dB. 0.5dB steps use 3 chars."
    query_command: MV?
    response_prefix: MV
  - id: mute_state
    type: enum
    values:
      - ON
      - OFF
    query_command: MU?
    response_prefix: MU
  - id: input_source
    type: string
    description: "Current input source name"
    query_command: SI?
    response_prefix: SI
  - id: main_zone_state
    type: enum
    values:
      - ON
      - OFF
    query_command: ZM?
    response_prefix: ZM
  - id: surround_mode
    type: string
    description: "Current surround mode name"
    query_command: MS?
    response_prefix: MS
  - id: video_select_state
    type: string
    description: "Current video select source and ON/OFF status"
    query_command: SV?
    response_prefix: SV
  - id: sleep_timer
    type: string
    description: "OFF or 001-120 minutes"
    query_command: SLP?
    response_prefix: SLP
  - id: auto_standby
    type: enum
    values:
      - 15M
      - 30M
      - 60M
      - OFF
    query_command: STBY?
    response_prefix: STBY
  - id: eco_mode
    type: enum
    values:
      - ON
      - AUTO
      - OFF
    query_command: ECO?
    response_prefix: ECO
  - id: zone2_state
    type: string
    description: "Zone 2 on/off or source status"
    query_command: Z2?
    response_prefix: Z2
  - id: zone2_mute
    type: enum
    values:
      - ON
      - OFF
    query_command: Z2MU?
    response_prefix: Z2MU
  - id: zone2_channel_setting
    type: enum
    values:
      - ST
      - MONO
    query_command: Z2CS?
    response_prefix: Z2CS
  - id: zone2_volume
    type: string
    query_command: Z2?
    response_prefix: Z2
  - id: zone3_state
    type: string
    description: "Zone 3 on/off or source status"
    query_command: Z3?
    response_prefix: Z3
  - id: zone3_mute
    type: enum
    values:
      - ON
      - OFF
    query_command: Z3MU?
    response_prefix: Z3MU
  - id: zone3_volume
    type: string
    query_command: Z3?
    response_prefix: Z3
  - id: trigger_state
    type: string
    description: "Trigger 1 and 2 on/off status"
    query_command: TR?
    response_prefix: TR
  - id: dimmer_state
    type: enum
    values:
      - BRI
      - DIM
      - DAR
      - OFF
    query_command: DIM ?
    response_prefix: DIM
  - id: tuner_frequency
    type: string
    description: "6-digit frequency, >050000=AM kHz, <050000=FM MHz"
    query_command: TFAN?
    response_prefix: TF
  - id: tuner_preset
    type: string
    description: "Preset number 01-56"
    query_command: TPAN?
    response_prefix: TP
  - id: tuner_band
    type: enum
    values:
      - AM
      - FM
    query_command: TMAN?
    response_prefix: TM
  - id: channel_volume
    type: string
    description: "Per-channel level 38-62, 50=0dB. Returns for all used channels on input change."
    query_command: CV<channel> ?
  - id: tone_bass
    type: string
    description: "Bass level 00-99, 50=0dB"
    query_command: PSBAS ?
    response_prefix: PSBAS
  - id: tone_treble
    type: string
    description: "Treble level 00-99, 50=0dB"
    query_command: PSTRE ?
    response_prefix: PSTRE
  - id: dynamic_eq
    type: enum
    values:
      - ON
      - OFF
    query_command: PSDYNEQ ?
    response_prefix: PSDYNEQ
  - id: dynamic_volume
    type: enum
    values:
      - HEV
      - MED
      - LIT
      - OFF
    query_command: PSDYNVOL ?
    response_prefix: PSDYNVOL
  - id: multeq
    type: enum
    values:
      - AUDYSSEY
      - BYP.LR
      - FLAT
      - MANUAL
      - OFF
    query_command: PSMULTEQ ?
    response_prefix: PSMULTEQ
  - id: picture_mode
    type: string
    query_command: PV?
    response_prefix: PV
  - id: video_scaling
    type: string
    query_command: VSSC ?
    response_prefix: VSSC
  - id: hdmi_audio_output
    type: enum
    values:
      - AMP
      - TV
    query_command: VSAUDIO ?
    response_prefix: VSAUDIO
  - id: setup_menu
    type: enum
    values:
      - ON
      - OFF
    query_command: MNMEN?
    response_prefix: MNMEN
```

## Events

```yaml
events:
  - id: state_changed_event
    description: "Unsolicited EVENT sent when AVR state changes via front panel or remote. Same format as COMMAND. Sent within 5 seconds of state change."
    format: "COMMAND+PARAMETER+CR"
  - id: channel_volume_on_input_change
    description: "Channel volume for all used channels returned as EVENT when input source changes."
  - id: surround_mode_on_input_change
    description: "Surround mode returned as EVENT when input source changes (if different from previous)."
  - id: surround_mode_before_change
    description: "Current surround mode returned as EVENT before the new mode EVENT when surround mode changes."
```

## Variables

```yaml
variables: []
```

<!-- UNRESOLVED: Variables section — all settable parameters are represented as Actions with params above -->

## Macros

```yaml
macros: []
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: safety section — source contains no explicit safety warnings, interlocks, or power-on sequencing beyond the 1-second delay note -->

## Notes

- Command format: ASCII `COMMAND + PARAMETER + CR (0x0D)`. Commands are 2-character codes. Parameters up to 25 characters.
- Send commands at 50ms or more intervals.
- After sending `PWON`, wait 1 second before sending the next command.
- Responses to query commands (`COMMAND?`) are sent within 200ms.
- EVENT messages (unsolicited state changes) are sent within 5 seconds of the change.
- Maximum communication data length: 135 bytes.
- Volume encoding: 00=MIN(---), 80=0dB, 98=+18dB. Half-dB steps use 3 ASCII characters (e.g. 805=+0.5dB, 795=-0.5dB).
- Channel volume: 38-62 range, 50=0dB.
- Bass/treble tone: 00-99 range, 50=0dB. AVR operable range typically 44-56 (-6 to +6dB).
- Commands are receivable during EVENT transmission.
- When surround mode is re-sent unchanged, EVENT returns surround mode but NOT channel volume.
- Surround mode EVENT returns current mode before returning new mode on change.
- Zone 2/3 quick select commands `Z2QUICK0`/`Z3QUICK0` appear in source but have no parameter description.
- Some commands are regional (North America only, Europe only) — marked in source.
- "All Zone Stereo" mode uses `MNZST ON`/`MNZST OFF` and `MSALL ZONE STEREO` for surround mode feedback.

<!-- UNRESOLVED: specific AVR model numbers not stated — document covers a family -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: protocol version number not stated -->
<!-- UNRESOLVED: flow control for serial not stated (listed as none based on "Non procedural" communication procedure) -->
<!-- UNRESOLVED: complete list of surround mode parameters is extensive — see source for full list beyond representative values -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
retrieved_at: 2026-04-29T23:27:42.130Z
last_checked_at: 2026-04-23T15:34:43.974Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:34:43.974Z
matched_actions: 106
action_count: 106
confidence: high
summary: "All 106 spec actions matched with verbatim evidence in source; transport parameters confirmed; source contains extended audio processing commands beyond spec scope."
```

## Known Gaps

```yaml
- VSASPNRM
- VSASPFUL
- VSVPMAUTO
- VSVPMGAME
- VSVPMMOVI
- VSVST
- PSDIL
- PSSWL
- PSCINEMA
- PSMODE
- PSLOM
- PSFH
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
