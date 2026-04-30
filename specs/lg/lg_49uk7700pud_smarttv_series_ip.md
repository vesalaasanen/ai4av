---
schema_version: ai4av-public-spec-v1
device_id: lg/49uk7700pud
entity_id: lg_49uk7700pud_smarttv_series
spec_id: admin/lg-49uk7700pud
revision: 1
author: admin
title: "LG 49UK7700PUD Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 49UK7700PUD
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49UK7700PUD
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_49uk7700pud_smarttv_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:01:20.578Z
retrieved_at: 2026-04-25T21:01:20.578Z
last_checked_at: 2026-04-25T21:01:20.578Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:01:20.578Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions matched to source commands; all transport parameters verified in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49UK7700PUD Control Spec

## Summary
LG 49UK7700PUD Smart TV supporting both RS-232C serial and TCP/IP (Telnet) control interfaces. The RS-232C interface uses a 3-wire configuration at 9600 baud. The IP control interface uses Telnet on port 9761 (USA only). Commands cover power, volume, aspect ratio, input selection, channel tuning, 3D mode, picture settings, and audio settings.

<!-- UNRESOLVED: IP control is noted as USA only; regional availability of IP control feature not fully documented -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761  # IP control Telnet port; stated for USA
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source for RS-232C or IP control
```

## Traits
```yaml
# Based on command presence:
# - powerable: power on/off commands present (ka, POWER)
# - routable: input selection commands present (x b, INPUT_SELECT)
# - queryable: read mode via FF data returns current status
# - levelable: volume, contrast, brightness, etc. use range values
```

## Actions
```yaml
# RS-232C Commands (ASCII protocol)
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: "01=Normal, 02=Wide, 04=Zoom, 05=Zoom2, 06=Original, 07=14:9, 09=JustScan, 0B=FullWide, 0C=21:9, 10-1F=CinemaZoom1-16"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Off, 01=ScreenMuteOn, 10=VideoMuteOn"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "00=MuteOn, 01=MuteOff"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: "00-64 (Hex), 0-100 (Decimal in IP control)"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "00-64 (Hex), 0-100 (Decimal in IP control)"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "00-64 (Hex), 0-100 (Decimal in IP control)"

- id: color_colour
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      description: "00-64 (Hex), 0-100 (Decimal in IP control)"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: "00-64 (Red-Green)"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: "00-32 (Hex), 0-50 (Decimal in IP control)"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: "00=OSDoff, 01=OSDon"

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "00=LockOff, 01=LockOn"

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      description: "00-64"

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      description: "00-64"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: "00-64"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      description: "00-64"

- id: ism_method
  label: ISM Method
  kind: action
  params:
    - name: mode
      type: integer
      description: "02=Orbiter, 08=Normal, 20=ColourWash"

- id: equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      description: "1-5 (frequency band)"
    - name: step
      type: integer
      description: "0-20"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: level
      type: integer
      description: "00=Off, 01=Minimum, 02=Medium, 03=Maximum, 04=Auto, 05=ScreenOff"

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel_data
      type: integer
      description: "Channel number (varies by region and signal type)"
    - name: input_source
      type: integer
      description: "Input source code (antenna, cable, satellite, etc.)"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: action
      type: integer
      description: "00=Delete/Skip, 01=Add"

- id: key
  label: Key
  kind: action
  params:
    - name: code
      type: string
      description: "Key code from Key Code table (Hex)"

- id: control_backlight
  label: Control Backlight
  kind: action
  params:
    - name: level
      type: integer
      description: "00-64 (Hex), 0-100 (Decimal in IP control)"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: string
      description: "DTV, CADTV, SatelliteDTV, ATV, CATV, AV/AV1, AV2, Component1, Component2, RGB, HDMI1-4, ISDB-BS"

- id: picture_3d
  label: 3D
  kind: action
  params:
    - name: mode
      type: string
      description: "off, on, 3dto2d, 2dto3d"
    - name: format
      type: string
      description: "topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving"
    - name: direction
      type: string
      description: "righttoleft, lefttoright"
    - name: effect
      type: integer
      description: "0-20 (3D depth/effect level)"

- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: string
      description: "picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre"
    - name: value
      type: string
      description: "varies by option type"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      description: "01=Execute AutoConfigure (RGB mode only)"
```

## Feedbacks
```yaml
# Acknowledgement responses
- id: ok_ack
  label: OK Acknowledgement
  type: string
  description: "Returns [Command2][SetID][OK][Data][x] on success"

- id: ng_ack
  label: NG Acknowledgement
  type: string
  description: "Returns [Command2][SetID][NG][Data][x] on failure; Data=00 for Illegal Code"

- id: power_status
  label: Power Status
  kind: feedback
  type: enum
  values: [on, off]
  description: "Query by sending FF data; returns current power state"
```

## Variables
```yaml
# All adjustable parameters can be queried via FF data read mode
# UNRESOLVED: dedicated query commands for discrete variables not separately documented
```

## Events
```yaml
# UNRESOLVED: device does not appear to send unsolicited notifications based on source documentation
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG"
  - "When main power is off & on (plug-off and plug-in, after 20-30 seconds), external control lock is released"
  - "In standby mode (DC off by off timer or ka/mc command), if key lock is on, TV will not turn on by power on key of IR & Local Key"
  - "Use crossed (reverse) cable for RS-232C connection"
  - "IP Control feature (port 9761) is for USA only"
```

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_49uk7700pud_smarttv_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:01:20.578Z
retrieved_at: 2026-04-25T21:01:20.578Z
last_checked_at: 2026-04-25T21:01:20.578Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:01:20.578Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions matched to source commands; all transport parameters verified in source."
```

## Known Gaps

```yaml
[]
```
