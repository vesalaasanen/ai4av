---
schema_version: ai4av-public-spec-v1
device_id: marantz/marantz-unknown
entity_id: marantz_marantz_unknown
spec_id: admin/marantz-marantz_unknown
revision: 1
author: admin
title: "Marantz Marantz Unknown Control Spec"
status: published
manufacturer: Marantz
manufacturer_key: marantz
model_family: "Marantz Unknown"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "Marantz Unknown"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
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
    checked_at: 2026-04-29T11:13:34.167Z
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-04-23T08:07:13.003Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps:
  - SDAUTO
  - SDHDMI
  - SVDVD
  - SVBD
  - PSTONE
  - PSBAS
  - PSTRE
  - VSASPNRM
  - VSASPFUL
  - VSMONI1
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:07:13.003Z
  matched_actions: 21
  action_count: 21
  confidence: high
  summary: "All 21 spec actions matched verbatim with their source commands and parameters; transport parameters verified; source contains many additional commands not represented in spec."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz Marantz Unknown Control Spec

## Summary
Marantz AV receiver supporting both RS-232C and Ethernet (TCP/IP) control. ASCII-based command protocol with CR (0x0D) terminator. Supports power, volume, input selection, surround mode, multi-zone control, tuner, and network/USB playback.

<!-- UNRESOLVED: specific model name not stated in source; device identified as generic Marantz AVR -->

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
  port: 23  # TCP port 23 (telnet) - stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # PWON/PWSTANDBY commands present
- routable        # SI (input selection) commands present
- queryable       # ? suffix commands returning state present (PW?, MV?, SI?, etc.)
- levelable       # MV (master volume), CV (channel volume), tone controls present
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
  label: Set Master Volume (direct dB)
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98 (ASCII), 80=0dB, 00=--- (MIN). 0.5dB steps use 3-digit ASCII."
      minimum: 0
      maximum: 98

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"

- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, etc."

- id: sleep_timer
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 (minutes), or OFF to cancel"
      minimum: 1
      maximum: 120

- id: eco_mode
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"

- id: zone2_on
  label: Zone 2 On
  kind: action
  params: []

- id: zone2_off
  label: Zone 2 Off
  kind: action
  params: []

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  params:
    - name: source
      type: string

- id: zone2_volume
  label: Zone 2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or direct value (00-98, 80=0dB)"
    - name: level
      type: integer
      description: "Direct dB value when not using UP/DOWN"

- id: zone3_on
  label: Zone 3 On
  kind: action
  params: []

- id: zone3_off
  label: Zone 3 Off
  kind: action
  params: []

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  params:
    - name: source
      type: string

- id: tuner_frequency
  label: Set Tuner Frequency
  kind: action
  params:
    - name: band
      type: string
      description: "AM or FM"
    - name: frequency
      type: integer
      description: "6 digits: kHz for AM (>050000), MHz*100 for FM (<050000)"

- id: tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - PWON
    - PWSTANDBY

- id: master_volume_state
  label: Master Volume State
  type: string
  description: "MV*** where *** is 000-995 (0.5dB steps), 800=0dB, 000=--- (MIN)"

- id: input_state
  label: Input Source State
  type: string
  description: "SI*** returning current input source"

- id: mute_state
  label: Mute State
  type: enum
  values:
    - MUON
    - MUOFF

- id: surround_mode_state
  label: Surround Mode State
  type: string
  description: "MS*** returning current surround mode"

- id: tuner_state
  label: Tuner State
  type: string
  description: "TFANxxxxxx for AM (kHz) or FM (MHz*100)"

- id: hd_radio_state
  label: HD Radio State
  type: string
  description: "HDST NAME, HDSIG LEV, HDMLT CURRCH, HDARTIST, HDTITLE, HDALBUM, etc."

- id: zone2_state
  label: Zone 2 State
  type: string
  description: "Z2ON, Z2OFF, Z2*** (source), Z2 volume level"

- id: zone3_state
  label: Zone 3 State
  type: string
  description: "Z3ON, Z3OFF, Z3*** (source), Z3 volume level"

- id: channel_volume_state
  label: Channel Volume State
  type: string
  description: "CVFL/CVFR/CVC/CVSW/CVSW2/CVSL/CVSR/CVSBL/CVSBR/CVSB/CVFHL/CVFHR/CVFWL/CVFWR/CVTFL/CVTFR/CVTML/CVTMR/CVTRL/CVTRR/CVRHL/CVRHR/CVFDL/CVFDR/CVSDL/CVSDR/CVBDL/CVBDR/CVSHL/CVSHR/CVTS (38-62 ASCII, 50=0dB)"
```

## Variables
```yaml
# UNRESOLVED: additional settable parameters not listed - remove section if not applicable
```

## Events
```yaml
# The device sends EVENT messages asynchronously when state changes.
# Events use same format as commands: COMMAND+PARAMETER+CR (0x0D)
# Timing: within 5 seconds of state change
# Note: device sends EVENT during command transmission (half-duplex)
```

## Macros
```yaml
# Power-on sequence: send PWON, wait 1 second before next command (documented in source note J)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Command interval: minimum 50ms between consecutive commands
- RESPONSE timing: within 200ms of receiving request command
- Half-duplex communication: commands receivable during EVENT transmission
- When input source changes, channel volume and surround mode return as EVENTs simultaneously
- If surround mode or channel volume is unchanged before/after input switch, no EVENT is returned
- MASTER VOLUME minimum level (00) represents ---dB (silence)
- 0.5dB volume steps use 3-digit ASCII parameter; standard steps use 2-digit
- Zone 2 and Zone 3 support independent power, input, volume, and mute control
- HD Radio / network control commands (NS*) are command-only with no response

<!-- UNRESOLVED: specific model number(s) covered by this protocol document -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: authentication credentials for Ethernet control not stated (none described) -->

## Provenance

```yaml
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:34.167Z
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-04-23T08:07:13.003Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:07:13.003Z
matched_actions: 21
action_count: 21
confidence: high
summary: "All 21 spec actions matched verbatim with their source commands and parameters; transport parameters verified; source contains many additional commands not represented in spec."
```

## Known Gaps

```yaml
- SDAUTO
- SDHDMI
- SVDVD
- SVBD
- PSTONE
- PSBAS
- PSTRE
- VSASPNRM
- VSASPFUL
- VSMONI1
```
