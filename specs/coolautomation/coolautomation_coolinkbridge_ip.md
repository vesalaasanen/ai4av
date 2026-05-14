---
spec_id: admin/coolautomation-coolinkbridge
schema_version: ai4av-public-spec-v1
revision: 1
title: "CoolAutomation CoolMaster Control Spec"
manufacturer: CoolAutomation
model_family: CoolMaster
aliases: []
compatible_with:
  manufacturers:
    - CoolAutomation
  models:
    - CoolMaster
    - "CoolMaster 4000M"
    - "CoolMaster 1000D"
    - "CoolMaster 2000S"
    - "CoolMaster 3000T"
    - "CoolMaster 6000L"
    - "CoolMaster 7000F"
    - "CoolMaster 8000I(MH)"
    - "CoolMaster 9000H"
    - "CoolMaster G"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - coolautomation.com
source_urls:
  - https://coolautomation.com/Lib/doc/prm/CoolAutomation-PRM-CoolMaster-v4.06.pdf
retrieved_at: 2026-05-04T18:05:10.825Z
last_checked_at: 2026-04-30T09:39:46.462Z
generated_at: 2026-04-30T09:39:46.462Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:39:46.462Z
  matched_actions: 25
  action_count: 25
  confidence: high
  summary: "All 25 spec actions match source commands verbatim; transport parameters verified; comprehensive coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# CoolAutomation CoolMaster Control Spec

## Summary
RS-232 text-based HVAC gateway for controlling indoor AC units. Communication via text commands terminated by CR/LF. Supports UID-based addressing for multiple indoor units across different CoolMaster models. No authentication required.

<!-- UNRESOLVED: TCP/IP control not documented in source despite device name suggesting IP capability -->

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
- id: alloff
  label: All Off
  kind: action
  params: []

- id: allon
  label: All On
  kind: action
  params: []

- id: boot
  label: Bootloader Mode
  kind: action
  params: []

- id: cool
  label: Set Mode Cool
  kind: action
  params:
    - name: UID
      type: string
      description: Indoor unit address (e.g., 101 = system 1, unit 01)

- id: dry
  label: Set Mode Dry
  kind: action
  params:
    - name: UID
      type: string

- id: heat
  label: Set Mode Heat
  kind: action
  params:
    - name: UID
      type: string

- id: auto
  label: Set Mode Auto
  kind: action
  params:
    - name: UID
      type: string

- id: fan
  label: Set Mode Fan
  kind: action
  params:
    - name: UID
      type: string

- id: filt
  label: Reset Filter Sign
  kind: action
  params:
    - name: UID
      type: string

- id: fspeed
  label: Set Fan Speed
  kind: action
  params:
    - name: UID
      type: string
    - name: speed
      type: string
      enum: [l, m, h, a, t]
      description: low, medium, high, auto, top

- id: off
  label: Power Off
  kind: action
  params:
    - name: UID
      type: string

- id: on
  label: Power On
  kind: action
  params:
    - name: UID
      type: string

- id: set
  label: Get/Set Configuration
  kind: action
  params:
    - name: option
      type: string
      required: false
    - name: value
      type: string
      required: false

- id: simul
  label: Simulate Indoor Units
  kind: action
  params:
    - name: N
      type: integer
      description: Number of units to simulate (0 to exit)

- id: stat
  label: Get Unit Status
  kind: action
  params:
    - name: UID
      type: string
      required: false

- id: stat2
  label: Get Unit Status (Extended)
  kind: action
  params:
    - name: UID
      type: string
      required: false

- id: stat3
  label: Get Unit Status (No Fractional Temp)
  kind: action
  params:
    - name: UID
      type: string
      required: false

- id: stat4
  label: Get Unit Status (With Thermostat)
  kind: action
  params:
    - name: UID
      type: string
      required: false

- id: query
  label: Query Unit Parameter
  kind: action
  params:
    - name: UID
      type: string
    - name: param
      type: string
      enum: [o, m, f, t, e, a, h, s]
      description: on/off, mode, fan speed, set temp, failure, ambient, high precision temp, swing

- id: swing
  label: Set Swing Mode
  kind: action
  params:
    - name: UID
      type: string
    - name: mode
      type: string
      enum: [a, h, 3, 4, 6, v]
      description: auto, horizontal, 30, 45, 60, vertical

- id: temp
  label: Set Temperature
  kind: action
  params:
    - name: UID
      type: string
    - name: temperature
      type: string
      description: Absolute (e.g., 20, 20.5) or relative (±N)

- id: group
  label: Group Units
  kind: action
  params:
    - name: UID_MASTER
      type: string
      required: false
    - name: UID
      type: string
      required: false

- id: vam
  label: Set VAM Mode
  kind: action
  params:
    - name: UID
      type: string
    - name: mode
      type: string
      enum: [a, b, x, l, L, h, H, s, A]

- id: lock
  label: Lock/Unlock Controller
  kind: action
  params:
    - name: UID
      type: string
    - name: operation
      type: string
      description: "+" lock all, "-" unlock all, or "+/-" followed by o/m/s/t for specific operations

- id: wh
  label: Set Water Heater Mode
  kind: action
  params:
    - name: UID
      type: string
    - name: mode
      type: string
      enum: [h, e, w, a]
      description: heating, ECO, hot water, anti-freeze
```

## Feedbacks
```yaml
- id: command_response
  type: string
  description: Response format varies by command. Success returns "OK". Errors return "Unknown command" or "Bad parameters".

- id: stat_response
  type: string
  description: |
    Format: "UID ON/OFF TEMP ROOMTEMP FAN MODE STATUS"
    Example: "101 OFF 32C 04,93C Low  Dry  OK"
```

## Variables
```yaml
- id: baud
  type: integer
  description: RS-232 baud rate
  values: [1200, 2400, 4800, 9600, 18200, 38400, 57600, 115200]
  default: 9600

- id: deg
  type: enum
  description: Temperature scale
  values: [C, F]

- id: echo
  type: integer
  description: Command echo enabled/disabled
  values: [0, 1]
  default: 1

- id: version
  type: string
  description: Firmware version (read only)

- id: simul
  type: integer
  description: Number of simulated indoor units
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Group command takes effect only after power reset
  - Baud rate change takes effect only after power reset
# UNRESOLVED: no explicit safety warnings in source
```

## Notes
UID format: 3 characters — System Number (0-9, A-F for 10-15, or Z for centralized) + Unit Number (00-99 or FF). Cable length max 25m per RS-232 spec. Commands are case sensitive, separated by single space, terminated by CR+LF or CR alone.

<!-- UNRESOLVED: TCP/IP port number not stated in source despite device name -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: voltage/current/power specifications not stated -->

## Provenance

```yaml
source_domains:
  - coolautomation.com
source_urls:
  - https://coolautomation.com/Lib/doc/prm/CoolAutomation-PRM-CoolMaster-v4.06.pdf
retrieved_at: 2026-05-04T18:05:10.825Z
last_checked_at: 2026-04-30T09:39:46.462Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:39:46.462Z
matched_actions: 25
action_count: 25
confidence: high
summary: "All 25 spec actions match source commands verbatim; transport parameters verified; comprehensive coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
