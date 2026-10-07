---
spec_id: admin/shinybow-sb-4148
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-4148 Control Spec"
manufacturer: Shinybow
model_family: SB-4148
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-4148
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-05-21T21:45:15.984Z
last_checked_at: 2026-10-01T10:50:47.097Z
generated_at: 2026-10-01T10:50:47.097Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device firmware version not stated in source"
  - "no discrete settable parameters documented"
  - "no unsolicited event notifications documented"
  - "no multi-step sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "lock behavior when panel is locked vs unlocked not fully specified"
  - "response timing not documented"
  - "error codes not documented"
verification:
  verdict: verified
  checked_at: 2026-10-01T10:50:47.097Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions and transport values verified literally against refined source; source has no additional commands beyond the 10 covered. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Shinybow SB-4148 Control Spec

## Summary
Matrix switcher with 4 outputs and 6 inputs. RS-232C serial control at 9600/8-N-1. ASCII command protocol. Supports power, routing, lock, reset, and status query.

<!-- UNRESOLVED: device firmware version not stated in source -->

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
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable  # inferred: power on/off commands present
- routable   # inferred: input/output routing commands present
- queryable  # inferred: ask status command present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: set_channel_1
  label: Set Channel 1 Source
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01-06)

- id: set_channel_2
  label: Set Channel 2 Source
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01-06)

- id: set_channel_3
  label: Set Channel 3 Source
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01-06)

- id: set_channel_4
  label: Set Channel 4 Source
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01-06)

- id: lock_on
  label: Lock Panel On
  kind: action
  params: []

- id: lock_off
  label: Lock Panel Off
  kind: action
  params: []

- id: reset
  label: Reset Device
  kind: action
  params: []

- id: ask_status
  label: Ask Status
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_on_ack
  label: Power On Acknowledge
  type: enum
  values:
    - SBaLonaK

- id: power_off_ack
  label: Power Off Acknowledge
  type: enum
  values:
    - SBaLoFaK

- id: channel_1_updated
  label: Channel 1 Updated
  type: string
  pattern: SBUdxxo1
  description: xx = source input (01-06)

- id: channel_2_updated
  label: Channel 2 Updated
  type: string
  pattern: SBUdxxo2
  description: xx = source input (01-06)

- id: channel_3_updated
  label: Channel 3 Updated
  type: string
  pattern: SBUdxxo3
  description: xx = source input (01-06)

- id: channel_4_updated
  label: Channel 4 Updated
  type: string
  pattern: SBUdxxo4
  description: xx = source input (01-06)

- id: lock_on_state
  label: Lock On State
  type: enum
  values:
    - SBSYSLoK

- id: lock_off_state
  label: Lock Off State
  type: enum
  values:
    - SBSYSULK

- id: reset_ack
  label: Reset Acknowledge
  type: enum
  values:
    - SBRStaCK

- id: status_ack
  label: Status Acknowledge
  type: enum
  values:
    - SBStataK

- id: in_out_state
  label: IN/OUT State
  type: string
  pattern: SBUD0000XXYY
  description: XX = input port (01-06), YY = output port (01-06)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
After receiving SBASKSTA, device sends 10 feedback commands sequentially. Reset sets all destinations to Source 1. When locked on, all status changes are controlled via RS-232 only.
<!-- UNRESOLVED: lock behavior when panel is locked vs unlocked not fully specified -->
<!-- UNRESOLVED: response timing not documented -->
<!-- UNRESOLVED: error codes not documented -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-05-21T21:45:15.984Z
last_checked_at: 2026-10-01T10:50:47.097Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T10:50:47.097Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions and transport values verified literally against refined source; source has no additional commands beyond the 10 covered. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device firmware version not stated in source"
- "no discrete settable parameters documented"
- "no unsolicited event notifications documented"
- "no multi-step sequences documented"
- "no safety warnings or interlock procedures in source"
- "lock behavior when panel is locked vs unlocked not fully specified"
- "response timing not documented"
- "error codes not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
