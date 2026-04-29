---
schema_version: ai4av-public-spec-v1
device_id: lg/50qned85tua
entity_id: lg_50qned85tua_smarttv_series
spec_id: admin/lg-50qned85tua
revision: 1
author: admin
title: "LG 50QNED85TUA SmartTV Series Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 50QNED85TUA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50QNED85TUA
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_50qned85tua_smarttv_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:02:36.339Z
retrieved_at: 2026-04-25T21:02:36.339Z
last_checked_at: 2026-04-25T21:02:36.339Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps:
  - "ISM Method (j p) - plasma only"
  - "Equalizer (j v) - model dependent"
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:02:36.339Z
  matched_actions: 25
  action_count: 25
  confidence: high
  summary: "All 25 spec actions matched cleanly with source; transport parameters verified; two extra source commands are plasma-only/model-dependent."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 50QNED85TUA SmartTV Series Control Spec

## Summary
Smart TV in the LG QNED85TUA series supporting both RS-232C serial control and wired TCP/IP (Telnet) control on port 9761. Supports power, picture, sound, channel, input, and 3D mode control. Set ID range 1–99 (or 0 for broadcast).

<!-- UNRESOLVED: 3D commands only apply to 3D model variants -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761  # Telnet port for IP control (USA only)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in RS-232 source; IP control has setup password (828) but no telnet login
```

## Traits
```yaml
- powerable
- levelable
- routable
- queryable  # inferred: FF read commands present for most parameters
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"  # Power Off
        - "01"  # Power On

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values:
        - "01"  # Normal screen
        - "02"  # Wide screen (16:9)
        - "04"  # Zoom
        - "05"  # Zoom 2
        - "06"  # Set by Program/Original
        - "07"  # 14:9
        - "09"  # Just Scan
        - "0B"  # Full Wide
        - "0C"  # 21:9
        - "10"-"1F"  # Cinema Zoom 1-16

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"  # Screen mute off (Picture on) Video mute off
        - "01"  # Screen mute on (Picture off)
        - "10"  # Video mute on

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"  # Volume mute on (Volume off)
        - "01"  # Volume mute off (Volume on)

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: color
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 32]

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"  # OSD off
        - "01"  # OSD on

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  params:
    - name: lock
      type: enum
      values:
        - "00"  # Lock off
        - "01"  # Lock on

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"  # Off
        - "01"  # Minimum
        - "02"  # Medium
        - "03"  # Maximum
        - "04"  # Auto (LCD/LED) / Intelligent sensor (PDP)
        - "05"  # Screen off

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel_data
      type: string
      description: Hex channel data (format varies by region and signal type; see source pp.9-10)

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values:
        - "00"  # Del/Skip
        - "01"  # Add

- id: key
  label: Key
  kind: action
  params:
    - name: key_code
      type: string
      description: Hex key code from Key Codes table (p.2 of source)

- id: backlight
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "00"  # DTV
        - "01"  # CADTV
        - "02"  # Satellite DTV
        - "03"  # ISDB-CS1 (Japan)
        - "04"  # ISDB-CS2 (Japan)
        - "10"  # ATV
        - "11"  # CATV
        - "20"  # AV/AV1
        - "21"  # AV2
        - "40"  # Component1
        - "41"  # Component2
        - "60"  # RGB
        - "90"  # HDMI1
        - "91"  # HDMI2
        - "92"  # HDMI3
        - "93"  # HDMI4
        - "ISDB-BS"  # Japan

- id: picture_3d
  label: 3D Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"  # 3D On
        - "01"  # 3D Off
        - "02"  # 3D to 2D
        - "03"  # 2D to 3D

- id: extended_3d
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values:
        - "00"  # 3D Picture Correction
        - "01"  # 3D Depth
        - "02"  # 3D Viewpoint
        - "06"  # 3D Color Correction
        - "07"  # 3D Sound Zooming
        - "08"  # Normal Image View
        - "09"  # 3D Mode (Genre)

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: enum
      values:
        - "01"  # Execute Auto Configure
  notes: Works only in RGB (PC) mode
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "00"  # Power Off
    - "01"  # Power On

- id: ack_response
  label: Acknowledgement
  type: object
  properties:
    - name: status
      type: enum
      values:
        - OK
        - NG
    - name: data
      type: string
      description: Response data or error code
  notes: |
    Format (RS-232): [Command2][ ][Set ID][ ][OK/NG][Data][x]
    NG Data 00: Illegal Code

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values:
    - "00"  # Mute on
    - "01"  # Mute off

- id: osd_state
  label: OSD State
  type: enum
  values:
    - "00"  # OSD off
    - "01"  # OSD on

- id: remote_lock_state
  label: Remote Control Lock State
  type: enum
  values:
    - "00"  # Lock off
    - "01"  # Lock on
```

## Variables
```yaml
# UNRESOLVED: source does not describe standalone parameter query interface;
# all read operations use FF data via the standard command transmission format
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from TV
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - When main power is off then on (plug-off/plug-in), external control lock is released after 20-30 seconds
  - In standby mode (DC off by off timer or ka/mc command), if key lock is on, TV will not turn on by IR or local key
  - During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG
  - IP Control must be set to 'Off' when feature is not in use
```
<!-- UNRESOLVED: ISM Method (j p) documented for Plasma TV only; QNED85TUA is LCD/LED so may not apply -->

## Notes
**RS-232C Transmission format:** `[Command1][Command2][ ][Set ID][ ][Data][Cr]`
- Set ID: 1–99 (decimal), 0x00–0x63 (hex), 0 = broadcast to all TVs
- Cr = ASCII 0x0D, Space = ASCII 0x20
- Read mode: send FF as data

**Telnet/IP Control (port 9761, USA only):** Commands sent as plain text strings (e.g., `VOLUME_MUTE on`, `POWER off`). No authentication required on telnet connection.

**Known constraints:**
- With USB-to-Serial converter cable, power command works only if TV is on
- With RS-232C cable, power command works in both on and off states
- 3D commands only available on 3D model variants
- Auto Configure only works in RGB (PC) mode
- Backlight control requires Energy Saving to be set to Off

**Set ID configuration:** Settings → General → About this TV/OPTION → SET ID (range 1–99)

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_50qned85tua_smarttv_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:02:36.339Z
retrieved_at: 2026-04-25T21:02:36.339Z
last_checked_at: 2026-04-25T21:02:36.339Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:02:36.339Z
matched_actions: 25
action_count: 25
confidence: high
summary: "All 25 spec actions matched cleanly with source; transport parameters verified; two extra source commands are plasma-only/model-dependent."
```

## Known Gaps

```yaml
- "ISM Method (j p) - plasma only"
- "Equalizer (j v) - model dependent"
```
