---
spec_id: admin/shinybow-sb-5642
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-5642 Control Spec"
manufacturer: Shinybow
model_family: SB-5642
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-5642
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://shinybowusa.com/PDF/RS232_V2.0.pdf
retrieved_at: 2026-05-21T22:06:27.193Z
last_checked_at: 2026-05-31T21:22:46.847Z
generated_at: 2026-05-31T21:22:46.847Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "applies to all devices except SB-5688 per source"
  - "no discrete settable parameters other than routing actions"
  - "no unsolicited event descriptions in source"
  - "no explicit multi-step sequences described"
  - "no safety warnings or interlock procedures in source"
  - "lock commands change status via RS-232 only per source"
  - "firmware version not stated"
  - "SB-5688 excluded per source"
verification:
  verdict: verified
  checked_at: 2026-05-31T21:22:46.847Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions matched control commands in source; transport parameters verbatim; source catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Shinybow SB-5642 Control Spec

## Summary
RS-232C matrix switcher supporting 6 inputs to 4 outputs. Control via ASCII command strings at 9600 baud. No authentication required.

<!-- UNRESOLVED: applies to all devices except SB-5688 per source -->

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
- powerable  # power on/off commands present
- routable   # input/output routing commands present
- queryable  # ask status command present
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
  label: Set Channel 1 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (1-6), zero-padded to 2 digits

- id: set_channel_2
  label: Set Channel 2 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (1-6), zero-padded to 2 digits

- id: set_channel_3
  label: Set Channel 3 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (1-6), zero-padded to 2 digits

- id: set_channel_4
  label: Set Channel 4 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (1-6), zero-padded to 2 digits

- id: lock_panel_on
  label: Lock Front Panel On
  kind: action
  params: []

- id: lock_panel_off
  label: Lock Front Panel Off
  kind: action
  params: []

- id: reset_device
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
  values: [SBALONAK]

- id: power_off_ack
  label: Power Off Acknowledge
  type: enum
  values: [SBALOFAK]

- id: channel_1_updated
  label: Channel 1 Updated
  type: string
  description: Format SBUDXXO1 where XX = source input (01-06)

- id: channel_2_updated
  label: Channel 2 Updated
  type: string
  description: Format SBUDXXO2 where XX = source input (01-06)

- id: channel_3_updated
  label: Channel 3 Updated
  type: string
  description: Format SBUDXXO3 where XX = source input (01-06)

- id: channel_4_updated
  label: Channel 4 Updated
  type: string
  description: Format SBUDXXO4 where XX = source input (01-06)

- id: lock_on
  label: Lock On
  type: enum
  values: [SBSYSL]

- id: lock_off
  label: Lock Off
  type: enum
  values: [SBSYSULK]

- id: reset_ack
  label: Reset Acknowledge
  type: enum
  values: [SBRSTACK]

- id: status_ack
  label: Status Acknowledge
  type: enum
  values: [SBSTATAK]

- id: in_out_state
  label: Input/Output State
  type: string
  description: Format SBUD0000XXYY where XX = input port (01-06), YY = output port (01-06)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters other than routing actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: 8 ASCII bytes — first 6 bytes specify action, remaining bytes encode parameters.

After SBASKSTA command, device sends status sequentially for all 10 feedback items plus IN/OUT state.

Reset sets all destinations to Source 1.

<!-- UNRESOLVED: lock commands change status via RS-232 only per source -->
<!-- UNRESOLVED: firmware version not stated -->
<!-- UNRESOLVED: SB-5688 excluded per source -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://shinybowusa.com/PDF/RS232_V2.0.pdf
retrieved_at: 2026-05-21T22:06:27.193Z
last_checked_at: 2026-05-31T21:22:46.847Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:22:46.847Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions matched control commands in source; transport parameters verbatim; source catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "applies to all devices except SB-5688 per source"
- "no discrete settable parameters other than routing actions"
- "no unsolicited event descriptions in source"
- "no explicit multi-step sequences described"
- "no safety warnings or interlock procedures in source"
- "lock commands change status via RS-232 only per source"
- "firmware version not stated"
- "SB-5688 excluded per source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
