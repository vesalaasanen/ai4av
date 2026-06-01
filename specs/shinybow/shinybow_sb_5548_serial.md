---
spec_id: admin/shinybow-sb-5548
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-5548BNC Control Spec"
manufacturer: Shinybow
model_family: SB-5548BNC
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-5548BNC
    - SB-5544BNC
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://www.shinybowusa.com/PDF/RS232_Protocol_SB-5544BNC_SB-5548BNC.pdf
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
retrieved_at: 2026-05-21T22:00:46.782Z
last_checked_at: 2026-05-31T21:22:44.437Z
generated_at: 2026-05-31T21:22:44.437Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:22:44.437Z
  matched_actions: 21
  action_count: 21
  confidence: high
  summary: "All 21 spec actions matched source commands; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Shinybow SB-5548BNC Control Spec

## Summary
Matrix/routing switcher controllable via RS-232C serial interface. Supports 8x8 video routing with per-output volume and balance control, memory save/recall, and lock capability. Serial config: 9600 baud, 8N1, no flow control.

<!-- UNRESOLVED: total port count not stated (8 outputs visible in command examples) -->

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
powerable: true  # POWER command present
routable: true  # OUTPUT[DD], OUTPUTALL routing commands present
queryable: true  # ? suffix queries for all states
levelable: true  # VOLUME and BALANCE commands present
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_status
  label: Check Power Status
  kind: query
  params: []

- id: set_output
  label: Set Output Routing
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
    - name: input
      type: integer
      description: Input channel (01-08), 00 = off

- id: check_output
  label: Check Output Routing
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel (01-08)

- id: set_all_outputs
  label: Set All Outputs to One Source
  kind: action
  params:
    - name: input
      type: integer
      description: Input channel (01-08), 00 = off all

- id: check_all_outputs
  label: Check All Output Routing
  kind: query
  params: []

- id: save_to_memory
  label: Save Configuration to Memory
  kind: action
  params:
    - name: address
      type: integer
      description: Memory address (00-0F, decimal 0-15)

- id: recall_memory
  label: Recall Configuration from Memory
  kind: action
  params:
    - name: location
      type: integer
      description: Memory location (00-0F, decimal 0-15)

- id: check_memory
  label: Check Memory Data
  kind: query
  params:
    - name: location
      type: integer
      description: Memory location (00-0F, decimal 0-15)

- id: unlock
  label: Unlock
  kind: action
  params: []

- id: lock
  label: Lock
  kind: action
  params: []

- id: check_lock
  label: Check Lock Status
  kind: query
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
    - name: value
      type: integer
      description: Volume value (000-100, 0=mute, 100=max)

- id: check_volume
  label: Check Volume
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel (01-08)

- id: volume_up
  label: Volume Up
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)

- id: volume_down
  label: Volume Down
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)

- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
    - name: value
      type: integer
      description: Balance value (000-100, 0=100%L, 50=center, 100=100%R)

- id: check_balance
  label: Check Balance
  kind: query
  params:
    - name: output
      type: integer
      description: Output channel (01-08)

- id: balance_up
  label: Balance Up
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)

- id: balance_down
  label: Balance Down
  kind: action
  params:
    - name: output
      type: integer
      description: Output channel (01-08)
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "00"
    - "01"

- id: output_state
  label: Output Routing State
  type: string
  description: Returns current input assignment per output channel

- id: memory_data
  label: Memory Data
  type: string
  description: 8-character string showing all output routing assignments

- id: lock_state
  label: Lock State
  type: enum
  values:
    - "00"
    - "01"

- id: volume_value
  label: Volume Value
  type: integer
  range: [0, 100]

- id: balance_value
  label: Balance Value
  type: integer
  range: [0, 100]
```

## Variables
```yaml
# No standalone settable parameters - all controlled via Actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: `[COMMAND] [DATA];` — space after command, semicolon terminates. All text uppercase ASCII.

Response format: device returns `SB5548BNC 00;` for success, or state data for queries.

Memory addresses 00-0F map to decimal 0-16.

Volume range 0-100; 0 functions as mute.
Balance range 0-100; 50 = center (equal L/R), 0 = 100% left, 100 = 100% right.

<!-- UNRESOLVED: number of inputs not explicitly stated (8 outputs shown, assumes 8x8) -->
<!-- UNRESOLVED: hardware revision/firmware version not stated in source -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://www.shinybowusa.com/PDF/RS232_Protocol_SB-5544BNC_SB-5548BNC.pdf
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
retrieved_at: 2026-05-21T22:00:46.782Z
last_checked_at: 2026-05-31T21:22:44.437Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:22:44.437Z
matched_actions: 21
action_count: 21
confidence: high
summary: "All 21 spec actions matched source commands; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
