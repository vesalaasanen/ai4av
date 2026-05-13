---
spec_id: admin/denon-dcm-5000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon DCM-5000 Control Spec"
manufacturer: Denon
model_family: DCM-5000
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - DCM-5000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
retrieved_at: 2026-04-29T09:03:22.437Z
last_checked_at: 2026-04-22T22:11:15.626Z
generated_at: 2026-04-22T22:11:15.626Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-22T22:11:15.626Z
  matched_actions: 52
  action_count: 52
  confidence: high
  summary: "All 52 spec actions found with exact command mnemonics in source; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Denon DCM-5000 Control Spec

## Summary
The Denon DCM-5000 is an AV receiver supporting RS-232C and TCP/IP (Telnet) control on port 23. The protocol uses ASCII commands terminated by carriage return (0x0D), with half-duplex communication at 9600 baud over serial and 10/100 Mbps over Ethernet. Commands must be sent at 50ms intervals minimum; power-on commands require a 1-second wait before the next command.

<!-- UNRESOLVED: compatible model list is limited to DCM-5000 as named in source; source document covers multiple AVR models (X1100, S700, S770, X4100, 2014 AVR series) but DCM-5000 specific documentation not isolated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
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

## Traits
```yaml
powerable: true
routable: true
queryable: true
levelable: true
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
- id: power_query
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
      type: string
      description: Volume level (00 to 98, 80 = 0dB, 00 = minimum/---)
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_query
  label: Query Mute Status
  kind: action
  params: []
- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: Input source (PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP)
- id: input_query
  label: Query Input Source
  kind: action
  params: []
- id: surround_mode
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Surround mode (MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, etc.)
- id: surround_query
  label: Query Surround Mode
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
- id: main_zone_query
  label: Query Main Zone Status
  kind: action
  params: []
- id: sleep_timer
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Sleep time in minutes (001 to 120, or 0 for off)
- id: sleep_timer_query
  label: Query Sleep Timer
  kind: action
  params: []
- id: auto_standby
  label: Set Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: Duration (15M, 30M, 60M, OFF)
- id: eco_mode
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ECO mode (ON, AUTO, OFF)
- id: video_resolution
  label: Set Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: Resolution (48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO)
- id: hdmi_monitor
  label: Set HDMI Monitor
  kind: action
  params:
    - name: monitor
      type: string
      description: HDMI monitor (AUTO, MONI1, MONI2)
- id: tone_control
  label: Set Tone Control
  kind: action
  params:
    - name: setting
      type: string
      description: Tone control (ON, OFF)
- id: bass_up
  label: Bass Up
  kind: action
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  params: []
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []
- id: dialog_level_on
  label: Dialog Level Adjust On
  kind: action
  params: []
- id: dialog_level_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
- id: subwoofer_level
  label: Set Subwoofer Level
  kind: action
  params:
    - name: level
      type: string
      description: Subwoofer level (00 to 62, 50 = 0dB)
- id: channel_volume
  label: Set Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: Channel (FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS)
    - name: level
      type: string
      description: Volume level (38 to 62, 50 = 0dB; SW/SW2 also accept 00)
- id: channel_volume_reset
  label: Reset All Channel Levels
  kind: action
  params: []
- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Picture mode (OFF, STD, MOV, VVD, STM, CTM, DAY, NGT)
- id: tuner_frequency
  label: Set Tuner Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: Frequency (6 digits for direct entry, ANUP/ANDOWN for step)
- id: tuner_band
  label: Set Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: Band (AM, FM)
- id: tuner_preset
  label: Set Tuner Preset
  kind: action
  params:
    - name: preset
      type: string
      description: Preset number (01-56)
- id: hd_radio_channel
  label: Set HD Radio Channel
  kind: action
  params:
    - name: channel
      type: string
      description: HD channel (HDUP, HDDOWN, or 6-digit frequency with optional MC digit)
- id: zone2_on
  label: Zone 2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone 2 Off
  kind: action
  params: []
- id: zone2_source
  label: Set Zone 2 Source
  kind: action
  params:
    - name: source
      type: string
      description: Zone 2 input source
- id: zone2_volume
  label: Set Zone 2 Volume
  kind: action
  params:
    - name: level
      type: string
      description: Volume level (00 to 98, 80 = 0dB)
- id: zone2_mute
  label: Zone 2 Mute
  kind: action
  params:
    - name: state
      type: string
      description: Mute state (ON, OFF)
- id: zone3_on
  label: Zone 3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone 3 Off
  kind: action
  params: []
- id: zone3_source
  label: Set Zone 3 Source
  kind: action
  params:
    - name: source
      type: string
      description: Zone 3 input source
- id: zone3_volume
  label: Set Zone 3 Volume
  kind: action
  params:
    - name: level
      type: string
      description: Volume level (00 to 98, 80 = 0dB)
- id: zone3_mute
  label: Zone 3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: Mute state (ON, OFF)
- id: trigger
  label: Set Trigger Output
  kind: action
  params:
    - name: trigger
      type: integer
      description: Trigger number (1 or 2)
    - name: state
      type: string
      description: Trigger state (ON, OFF)
- id: dimmer
  label: Set Display Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: Dimmer level (BRI, DIM, DAR, OFF, SEL)
- id: remote_lock
  label: Set Remote Lock
  kind: action
  params:
    - name: lock
      type: string
      description: Lock type (REMOTE LOCK ON/OFF, PANEL LOCK ON/OFF, PANEL+V LOCK ON/OFF)
- id: menu_on
  label: Setup Menu On
  kind: action
  params: []
- id: menu_off
  label: Setup Menu Off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - PWON
    - PWSTANDBY
- id: mute_state
  label: Mute State
  type: enum
  values:
    - MUON
    - MUOFF
- id: input_state
  label: Input Source State
  type: string
- id: surround_state
  label: Surround Mode State
  type: string
- id: master_volume_state
  label: Master Volume State
  type: string
- id: channel_volume_state
  label: Channel Volume State
  type: string
- id: zone2_state
  label: Zone 2 State
  type: string
- id: zone3_state
  label: Zone 3 State
  type: string
- id: tuner_state
  label: Tuner State
  type: string
- id: hd_radio_state
  label: HD Radio State
  type: string
- id: sleep_timer_state
  label: Sleep Timer State
  type: string
- id: menu_state
  label: Menu State
  type: string
- id: trigger_state
  label: Trigger State
  type: string
```

## Variables
```yaml
- id: master_volume
  label: Master Volume
  type: string
  description: "00 to 98, 80 = 0dB, 00 = minimum (---)"
- id: channel_volume
  label: Channel Volume
  type: string
  description: "38 to 62 ASCII, 50 = 0dB; subwoofer channels accept 00"
- id: bass_level
  label: Bass Level
  type: string
  description: "00 to 99, 50 = 0dB; operable range -6 to +6 dB (44-56)"
- id: treble_level
  label: Treble Level
  type: string
  description: "00 to 99, 50 = 0dB; operable range -6 to +6 dB (44-56)"
- id: dialog_level
  label: Dialog Level
  type: string
  description: "38 to 62 ASCII, 50 = 0dB"
- id: subwoofer_level
  label: Subwoofer Level
  type: string
  description: "00, 38 to 62 ASCII, 50 = 0dB"
```

## Events
```yaml
- id: power_event
  label: Power State Change Event
  description: Unsolicited event sent when power state changes
- id: input_event
  label: Input Source Change Event
  description: Unsolicited event sent when input source changes; returns channel volume and surround mode simultaneously
- id: volume_event
  label: Volume Change Event
  description: Unsolicited event sent when volume changes
- id: surround_mode_event
  label: Surround Mode Change Event
  description: When surround mode changes, the present mode is returned before the new mode
- id: zone2_event
  label: Zone 2 Status Event
  description: Z2 status returned when Zone2 mode is selected; SR status returned when REC mode is selected
```

## Macros
```yaml
- id: power_on_sequence
  label: Power On Sequence
  description: Send PWON command, then wait 1 second before transmitting next command
- id: input_change_with_audio
  label: Input Change with Audio Update
  description: When input source changes, channel volume and surround mode return as event simultaneously; if values are unchanged from before the switch, no event is returned
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Send power on command (PWON), then wait 1 second before sending next command"
```

## Notes
Command format: ASCII COMMAND + PARAMETER + CR (0x0D). Maximum data length: 135 bytes. Minimum command interval: 50ms. RESPONSE sent within 200ms of request command. EVENT sent within 5 seconds of state change. Half-duplex communication. Commands are receivable during EVENT transmission.

Volume 0.5dB step uses 3 ASCII characters in parameter (e.g., MV805 for +0.5dB, MV795 for -0.5dB). Two-character volume used for standard steps.

The document references multiple AVR models (X1100, S700, S770, X4100, 2014 AVR series) and may contain command parameters not supported by DCM-5000 specifically. Further model-specific verification recommended.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: specific DCM-5000 model capabilities not verified separate from general AVR protocol -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
retrieved_at: 2026-04-29T09:03:22.437Z
last_checked_at: 2026-04-22T22:11:15.626Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-22T22:11:15.626Z
matched_actions: 52
action_count: 52
confidence: high
summary: "All 52 spec actions found with exact command mnemonics in source; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
