---
schema_version: ai4av-public-spec-v1
device_id: lg/50qned74baa
entity_id: lg_50qned74baa_series
spec_id: admin/lg-50qned74baa-series
revision: 1
author: admin
title: "LG 50QNED74BAA Series Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 50QNED74BAA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50QNED74BAA
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_50qned74baa_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:01:22.531Z
retrieved_at: 2026-04-25T21:01:22.531Z
last_checked_at: 2026-04-25T21:01:22.531Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:01:22.531Z
  matched_actions: 22
  action_count: 22
  confidence: high
  summary: "All 22 spec actions matched source commands; transport parameters verified verbatim; comprehensive command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 50QNED74BAA Series Control Spec

## Summary
LG commercial TV display supporting RS-232C serial control protocol. The device accepts ASCII command strings for power, input selection, picture adjustment, audio control, and tile mode (video wall) configuration. Query commands return current state values.

<!-- UNRESOLVED: no TCP/IP or network protocol documented; source shows RS-232C/UART only -->

## Transport
```yaml
protocols:
  - serial
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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 1 = On
- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: 2=AV, 4=Component1, 5=Component2, 6=RGB(DTV), 7=RGB(PC), 8=HDMI(DTV), 9=HDMI(PC)
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=4:3, 2=16:9, 3=Horizon, 4=Zoom1, 5=Zoom2, 6=Original, 7=14:9, 8=Full, 9=1:1(PC)
- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Mute On, 1=Mute Off
- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 step)
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 step)
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 step)
- id: color
  label: Color
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 step, video only)
- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (Red=-50 to Green=+50)
- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (0-100 step, video only)
- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      description: 00H-64H (L50-R50)
- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Normal, 1=Cool, 2=Warm, 3=User
- id: ism_mode
  label: ISM Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Inversion, 2=Orbiter, 4=White Wash, 8=Normal
- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: set
      type: integer
      description: 1=Set (RGB(PC) mode only)
- id: key
  label: Key (IR Code)
  kind: action
  params:
    - name: key_code
      type: string
      description: Hex key code (see IR code table)
- id: tile_mode
  label: Tile Mode
  kind: action
  params:
    - name: mode
      type: string
      description: 00=Off, 12=1x2, 13=1x3, 14=1x4, ...44=4x4
- id: tile_h_size
  label: Tile H Size
  kind: action
  params:
    - name: size
      type: integer
      description: 00H-64H
- id: tile_v_size
  label: Tile V Size
  kind: action
  params:
    - name: size
      type: integer
      description: 00H-64H
- id: tile_id_set
  label: Tile ID Set
  kind: action
  params:
    - name: id
      type: integer
      description: 00H-10H
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [0, 1]
  description: 0=Off, 1=On
- id: input_state
  label: Input State
  type: enum
  values: [2, 4, 5, 6, 7, 8, 9]
  description: 2=AV, 4=Component1, 5=Component2, 6=RGB(DTV), 7=RGB(PC), 8=HDMI(DTV), 9=HDMI(PC)
- id: abnormal_state
  label: Abnormal State
  type: enum
  values: [0, 1, 2, 3, 4, 6, 8, 9]
  description: 0=Normal, 1=No signal, 2=Remote off, 3=Sleep off, 4=RS-232C off, 6=AC down, 8=Off timer, 9=Auto off
- id: elapsed_time
  label: Elapsed Time
  type: integer
  description: Used hours (hex)
- id: temperature_value
  label: Temperature Value
  type: integer
  description: Inside temperature (hex)
- id: lamp_fault
  label: Lamp Fault
  type: enum
  values: [0, 1]
  description: 0=Fault, 1=OK
```

## Variables
```yaml
# All settable parameters are represented as Actions with the exception of
# read-only query targets above (elapsed time, temperature, lamp fault).
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Tile mode data cannot be set to 0X or X0 except 00
  - Auto Configure works only in RGB(PC) mode
```
<!-- UNRESOLVED: power-on sequencing, fault recovery procedures not documented in source -->
</parameter>
</invoke>

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_50qned74baa_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:01:22.531Z
retrieved_at: 2026-04-25T21:01:22.531Z
last_checked_at: 2026-04-25T21:01:22.531Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:01:22.531Z
matched_actions: 22
action_count: 22
confidence: high
summary: "All 22 spec actions matched source commands; transport parameters verified verbatim; comprehensive command coverage."
```

## Known Gaps

```yaml
[]
```
