---
schema_version: ai4av-public-spec-v1
device_id: marantz/av8003-north-america
entity_id: marantz_av8003_north_america
spec_id: admin/marantz-av8003-north-america
revision: 1
author: admin
title: "Marantz AV8003 Control Spec"
status: published
manufacturer: Marantz
manufacturer_key: marantz
model_family: "AV8003 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "AV8003 (North America)"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:26.819Z
retrieved_at: 2026-04-29T11:13:26.819Z
last_checked_at: 2026-04-23T08:07:12.714Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:07:12.714Z
  matched_actions: 23
  action_count: 23
  confidence: high
  summary: "All 23 spec actions matched literal commands in source; transport parameters verified; comprehensive bidirectional coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz AV8003 Control Spec

## Summary
The Marantz AV8003 is a multi-zone AV receiver supporting RS-232C and Ethernet (TCP/IP) control. This spec covers power management, volume control across multiple channels, input/source selection, surround mode selection, tuner control, HD Radio control, and multi-zone operation (Main Zone, Zone 2, Zone 3). Commands are ASCII-based with 2-character command codes plus parameters, terminated by CR (0x0D).

<!-- UNRESOLVED: HDMI CEC control not documented -->

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
  flow_control: none
addressing:
  port: 23  # TCP port 23 (telnet) for Ethernet
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
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

- id: master_volume
  label: Master Volume
  kind: action
  params:
    - name: direction_or_value
      type: string
      description: "UP, DOWN, or direct dB value (00-98, 80=0dB, 00=---/MIN)"

- id: mute
  label: Mute
  kind: action
  params:
    - name: state
      type: string
      enum: [ON, OFF]

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"

- id: channel_volume
  label: Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
    - name: direction_or_value
      type: string
      description: "UP, DOWN, or direct value (38-62, 50=0dB for most; 00,38-62 for SW/SW2)"

- id: reset_channel_levels
  label: Reset All Channel Levels
  kind: action
  params: []

- id: surround_mode
  label: Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, NEO:6, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, QUICK1-5 MEMORY, or direct mode names"

- id: digital_input
  label: Digital Input Select
  kind: action
  params:
    - name: mode
      type: string
      enum: [AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, "7.1IN", NO]

- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-7, CD, SOURCE, ON, OFF"

- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 (minutes), or OFF"

- id: auto_standby
  label: Auto Standby
  kind: action
  params:
    - name: time
      type: string
      enum: ["15M", "30M", "60M", OFF]

- id: eco_mode
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [ON, AUTO, OFF]

- id: main_zone
  label: Main Zone
  kind: action
  params:
    - name: state
      type: string
      enum: [ON, OFF]
    - name: favorite
      type: string
      description: "FAVORITE1-4, FAVORITE1-4 MEMORY"

- id: zone2
  label: Zone 2 Control
  kind: action
  params:
    - name: command
      type: string
      description: "SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP, QUICK1-5, QUICK0, QUICK1-5 MEMORY, UP, DOWN, ON, OFF"

- id: zone3
  label: Zone 3 Control
  kind: action
  params:
    - name: command
      type: string
      description: "Same options as Zone 2"

- id: tuner_frequency
  label: Tuner Frequency
  kind: action
  params:
    - name: direction_or_freq
      type: string
      description: "ANUP, ANDOWN, or 6-digit frequency (AN******)"

- id: tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: command
      type: string
      description: "ANUP, ANDOWN, AN**, ANMEM, ANMEM**, AN?, ANOFF"

- id: tuner_band
  label: Tuner Band
  kind: action
  params:
    - name: mode
      type: string
      description: "ANAM (AM), ANFM (FM), ANAUTO, ANMANUAL"

- id: hd_radio
  label: HD Radio Control
  kind: action
  params:
    - name: command
      type: string
      description: "HDUP, HDDOWN, HD******, HDMC*, HDANAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU, HD?"

- id: online_music_control
  label: Online Music / USB / iPod Control
  kind: action
  params:
    - name: command
      type: string
      description: "90-9Z codes for cursor/playback control, RPT, RND, B**, C**, H, FV MEM, NSA, NSE"

- id: parameter_setting
  label: Parameter Settings
  kind: action
  params:
    - name: setting
      type: string
      description: "TONE CTRL, BAS UP/DOWN/**, TRE UP/DOWN/**, DIL ON/OFF/UP/DOWN/**, SWL ON/OFF/UP/DOWN/**, SWL2 UP/DOWN/**, CINEMA EQ. ON/OFF, MODE:MUSIC/CINEMA/GAME/PRO LOGIC, PSLOM ON/OFF, FH:ON/OFF, SP:FW/FH/SB/HW/BH/BW/FL/HF/HR, PHG LOW/MID/HI, MULTEQ:AUDYSSEY/BYP.LR/FLAT/MANUAL/OFF, DYNEQ ON/OFF, REFLEV 0/5/10/15, DYNVOL HEV/MED/LIT/OFF, LFC ON/OFF, CNTAMT UP/DOWN/**, DSX ONHW/ONH/ONW/OFF, STW UP/DOWN/**, STH UP/DOWN/**, GEQ ON/OFF, DRC AUTO/LOW/MID/HI/OFF, BSC UP/DOWN/**, DEH OFF/LOW/MED/HIGH, LFE UP/DOWN/**, LFL **, EFF ON/OFF/UP/DOWN/**, DEL UP/DOWN/***, PAN ON/OFF, DIM UP/DOWN/**, CEN UP/DOWN/**, CEI UP/DOWN/**, CEG UP/DOWN/**, CES ON/OFF, SWR ON/OFF, RSZ S/MS/M/ML/L, DELAY UP/DOWN/***, RSTR OFF/LOW/MED/HI, FRONT SPA/SPB/A+B, AUROPR SMA/MED/LAR/SPE, AUROST UP/DOWN/**"

- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values: [PWON, PWSTANDBY]

- id: master_volume_status
  label: Master Volume Status
  type: string
  description: "Returns MV value (e.g., MV80)"

- id: mute_status
  label: Mute Status
  type: enum
  values: [MUON, MUOFF]

- id: input_status
  label: Input Source Status
  type: string
  description: "Returns SI and current input source"

- id: channel_volume_status
  label: Channel Volume Status
  type: string
  description: "Returns CVFL, CVFR, etc. with values. Ends with CVEND."

- id: surround_mode_status
  label: Surround Mode Status
  type: string

- id: tuner_status
  label: Tuner Status
  type: string
  description: "TFAN****** for frequency, TPAN** for preset, TM status"

- id: hd_radio_status
  label: HD Radio Status
  type: string
  description: "HDST NAME, HDSIG LEV 0-6, HDMLT CURRCH*, HDMLT CAST CH*, HDPTY, HDARTIST, HDTITLE, HDALBUM, HDGENRE, HDMODE DIGITAL/ANALOG"

- id: zone2_status
  label: Zone 2 Status
  type: string

- id: zone3_status
  label: Zone 3 Status
  type: string
```

## Variables
```yaml
# UNRESOLVED: many parameters are settable via PS commands but response format not fully enumerated
```

## Events
```yaml
# The device sends unsolicited EVENT messages when state changes:
# - Power state changes
# - Input source changes (returns SI and CV for affected channels)
# - Surround mode changes
# - Channel volume changes (when input source changes)
# All events use same format as COMMAND/RESPONSE
# Events sent within 5 seconds of state change
```

## Macros
```yaml
# No explicit macros defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Wait 1 second before sending next command after PWON (power on)"
  - "When changing input source, channel volume and surround mode events may fire simultaneously"
# UNRESOLVED: safety warnings about power sequencing not found in source
```

## Notes
- Commands must be sent at 50ms or greater intervals
- Half duplex communication on both RS-232 and Ethernet
- Maximum data length: 135 bytes per message
- RESPONSE must be sent within 200ms of receiving query command
- EVENT must be sent within 5 seconds of state change
- ASCII codes 0x20-0x7F only; CR (0x0D) is pause terminator only
- Query commands use "?" suffix (e.g., PW?, MV?, SI?)
- Volume uses 0.5dB steps; 3 ASCII characters when using 0.5dB precision
- Multi-zone: ZONE2 and ZONE3 have independent power, source, volume, and mute control
- Some surround modes and channel configurations are Auro-3D upgrade dependent
- HD Radio and certain input sources (HDRADIO, PANDORA, SIRIUSXM, SPOTIFY, FLICKR, etc.) are North America model specific
<!-- UNRESOLVED: specific firmware version compatibility for command features not stated -->
<!-- UNRESOLVED: HDMI CEC control protocol not documented -->
<!-- UNRESOLVED: precise response format for all PS parameter query commands not fully specified in source -->

## Provenance

```yaml
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:26.819Z
retrieved_at: 2026-04-29T11:13:26.819Z
last_checked_at: 2026-04-23T08:07:12.714Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:07:12.714Z
matched_actions: 23
action_count: 23
confidence: high
summary: "All 23 spec actions matched literal commands in source; transport parameters verified; comprehensive bidirectional coverage achieved."
```

## Known Gaps

```yaml
[]
```
