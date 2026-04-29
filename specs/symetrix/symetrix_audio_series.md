---
schema_version: ai4av-public-spec-v1
device_id: symetrix/deuce-722
entity_id: symetrix_audio_series
spec_id: admin/symetrix-integrator-series
revision: 1
author: admin
title: "Symetrix Integrator Series Control Spec"
status: published
manufacturer: Symetrix
manufacturer_key: symetrix
model_family: "Deuce 722"
aliases: []
compatible_with:
  manufacturers:
    - Symetrix
  models:
    - "Deuce 722"
    - "Zone Mix 760"
    - "Zone Mix 761"
    - "Automix Matrix 780"
    - "Room Combine 788"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: symetrix_audio_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:14.101Z
retrieved_at: 2026-04-27T10:13:14.101Z
last_checked_at: 2026-04-27T10:13:14.101Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:14.101Z
  matched_actions: 20
  action_count: 20
  confidence: high
  summary: "All 20 spec actions matched literally to command definitions in source; UDP port 48630 and RS-232 parameters (57600 baud, 8 data bits, 1 stop bit, no parity) verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Symetrix Integrator Series Control Spec

## Summary
Symetrix Integrator Series audio processors (Deuce 722, Zone Mix 760/761, Automix Matrix 780, Room Combine 788) support external control via RS-232 and UDP/IP Ethernet. The protocol is text-based (ASCII), using human-readable command strings terminated by a carriage return. Controller numbers (1-10000) address individual parameters. No authentication is required.

<!-- UNRESOLVED: RS-232 port not available on all models; Zone Mix 760 units manufactured before December 1, 2007 lack RS-232 -->

## Transport
```yaml
protocols:
  - udp
  - serial
addressing:
  port: 48630  # UDP port for Ethernet control
serial:
  baud_rate: 57600  # default, configurable: 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: GS, GS2, GSB, GSB2 commands return controller values
- levelable  # inferred: fader and gain commands present
- routable   # inferred: input selectors and output routing commands present
```

## Actions
```yaml
- id: cs
  label: Controller Set
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)
    - name: position
      type: integer
      description: 16-bit position value (0-65535)

- id: cc
  label: Change Controller
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)
    - name: dec_inc
      type: integer
      description: "0 = decrement, 1 = increment"
    - name: amount
      type: integer
      description: Amount to change (0-65535)

- id: gs
  label: Get Controller
  kind: query
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)

- id: gs2
  label: Get Controller with Number
  kind: query
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)

- id: gsb
  label: Get Controller Block
  kind: query
  params:
    - name: controller_number
      type: integer
      description: Starting controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of consecutive controllers (max 256)

- id: gsb2
  label: Get Controller Block with Number
  kind: query
  params:
    - name: controller_number
      type: integer
      description: Starting controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of consecutive controllers (max 256)

- id: gpr
  label: Get Preset
  kind: query
  params: []

- id: fu
  label: Flash Unit
  kind: action
  params: []

- id: lp
  label: Load Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: Preset number (1-50)

- id: pu
  label: Global Push Enable/Disable
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0 = OFF, 1 = ON"
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: pue
  label: Push Enable
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: pud
  label: Push Disable
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: gpu
  label: Get Push-enabled Controllers
  kind: query
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: pur
  label: Push Refresh
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: puc
  label: Push Clear
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: pui
  label: Set Push Interval
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: Push interval in ms (20-30000, default 100)

- id: put
  label: Set Push Threshold
  kind: action
  params:
    - name: parameter_thresh
      type: integer
      description: Optional threshold for parameters (0-65535)
    - name: meter_thresh
      type: integer
      description: Optional threshold for meters (0-65535)

- id: sb
  label: Set Baud
  kind: action
  params:
    - name: baud
      type: integer
      description: "Baud rate: 1200, 2400, 4800, 9600, 19200, 38400, 57600, or 115200"

- id: sq
  label: Set Quiet Mode
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0 = OFF, 1 = ON"

- id: eh
  label: Set Echo Mode
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0 = OFF, 1 = ON"
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values:
    - ACK
    - NAK

- id: controller_value
  type: integer
  description: 16-bit value (0-65535) returned by GS, GSB commands

- id: controller_block
  type: string
  description: Multi-line response from GSB, values 0-65535 or -1

- id: controller_block_with_number
  type: string
  description: "#NNNNN=VVVVV format from GSB2 command"

- id: push_data
  type: string
  description: "#NNNNN=VVVVV format, up to 64 values per push interval
```

## Variables
```yaml
# Controller numbers vary by model; see appendix tables for full mapping.
# Common ranges (Deuce 722):
#   Input faders: 190-1290 (ch1-ch12)
#   Output levels: 2104-2604
#   Meters: read-only at specific controller numbers
# UNRESOLVED: full controller number tables require model-specific appendix reference
```

## Events
```yaml
- id: push
  description: Unsolicited controller value changes pushed at configurable interval (default 100ms)
  data:
    type: string
    format: "#NNNNN=VVVVV"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Protocol is ASCII text-based; commands terminated with carriage return (CR, ASCII 13)
- Response format depends on quiet mode: ACK/NAK (quiet ON) or human-readable strings (quiet OFF)
- Push data uses same format as GSB2 command: `#NNNNN=VVVVV`
- RS-232 and Ethernet ports maintain independent quiet/echo/deaf mode settings
- Controller values are 16-bit (0-65535); formula for dB conversion varies by parameter type
- Some buttons use negative logic (0 = on); noted in appendix tables per controller
- Ethernet uses UDP port 48630; no TCP or Telnet options used despite Telnet-like description
<!-- UNRESOLVED: specific controller number mappings are model-dependent; full tables span appendices A-D -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: symetrix_audio_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:14.101Z
retrieved_at: 2026-04-27T10:13:14.101Z
last_checked_at: 2026-04-27T10:13:14.101Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:14.101Z
matched_actions: 20
action_count: 20
confidence: high
summary: "All 20 spec actions matched literally to command definitions in source; UDP port 48630 and RS-232 parameters (57600 baud, 8 data bits, 1 stop bit, no parity) verified."
```

## Known Gaps

```yaml
[]
```
