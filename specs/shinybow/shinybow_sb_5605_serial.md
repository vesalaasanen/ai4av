---
spec_id: admin/shinybow-sb-5605
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-5605 Control Spec"
manufacturer: Shinybow
model_family: SB-5605
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-5605
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
last_checked_at: 2026-05-31T21:22:45.245Z
generated_at: 2026-05-31T21:22:45.245Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:22:45.245Z
  matched_actions: 10
  action_count: 10
  confidence: high
  summary: "All 10 spec actions matched source control commands one-to-one with correct transport parameters."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Shinybow SB-5605 Control Spec

## Summary
Matrix switcher with 6 inputs and 4 outputs controllable via RS-232C. Supports power control, input/output routing, panel lock, and status queries. Serial communication at 9600 bps, 8-N-1, no flow control.

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
  label: Set Channel 1 Routing
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01-06)

- id: set_channel_2
  label: Set Channel 2 Routing
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01-06)

- id: set_channel_3
  label: Set Channel 3 Routing
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (01-06)

- id: set_channel_4
  label: Set Channel 4 Routing
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
  label: Reset
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
  values: [SBaLonaK]

- id: power_off_ack
  label: Power Off Acknowledge
  type: enum
  values: [SBaLoFaK]

- id: channel_1_updated
  label: Channel 1 Updated
  type: string
  description: Returns SBUdxxo1 where xx = source (01-06)

- id: channel_2_updated
  label: Channel 2 Updated
  type: string
  description: Returns SBUdxxo2 where xx = source (01-06)

- id: channel_3_updated
  label: Channel 3 Updated
  type: string
  description: Returns SBUdxxo4 where xx = source (01-06)

- id: channel_4_updated
  label: Channel 4 Updated
  type: string
  description: Returns SBUdxxo3 where xx = source (01-06)

- id: lock_on
  label: Lock On
  type: enum
  values: [SBSYSLoK]

- id: lock_off
  label: Lock Off
  type: enum
  values: [SBSYSULK]

- id: reset_ack
  label: Reset Acknowledge
  type: enum
  values: [SBRStaCK]

- id: status_ack
  label: Status Acknowledge
  type: enum
  values: [SBStataK]

- id: in_out_state
  label: Input/Output State
  type: string
  description: Returns SBUD0000XXYY where XX=input (01-06), YY=output (01-06)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
After receiving SBASKSTA, device sends status sequentially: item 10, 1/2, IN/OUT state, 7/8 feedback commands.
<!-- UNRESOLVED: command timing/interval specifications not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery not documented -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://www.shinybowusa.com/PDF/RS232_Protocol_SB-5544BNC_SB-5548BNC.pdf
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
retrieved_at: 2026-05-21T22:00:46.782Z
last_checked_at: 2026-05-31T21:22:45.245Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:22:45.245Z
matched_actions: 10
action_count: 10
confidence: high
summary: "All 10 spec actions matched source control commands one-to-one with correct transport parameters."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
