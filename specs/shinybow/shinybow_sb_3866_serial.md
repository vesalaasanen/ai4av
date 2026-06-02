---
spec_id: admin/shinybow-sb_3866
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-3866 Control Spec"
manufacturer: Shinybow
model_family: SB-3866
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-3866
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
  - manualslib.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
  - "https://www.manualslib.com/manual/1854379/Shinybow-Usa-8x2-Multivideo-To-Vga-Switcher-Series.html?page=8"
retrieved_at: 2026-05-21T21:31:27.380Z
last_checked_at: 2026-05-31T21:21:14.612Z
generated_at: 2026-05-31T21:21:14.612Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no standalone settable parameters documented"
  - "no unsolicited event notifications documented"
  - "no multi-step macros documented"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "RS-232 connector pinout not stated in source"
  - "command timing or inter-command delay requirements not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-31T21:21:14.612Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions matched distinct source control commands; transport params verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Shinybow SB-3866 Control Spec

## Summary
Matrix switcher with 6 inputs and 4 outputs. RS-232C serial control at 9600 bps 8-N-1. Supports per-output input selection, front panel lock, power on/off, and device reset.

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
powerable: true  # power on/off commands present
routable: true   # per-output input routing commands present
queryable: true  # status query command present
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
      description: Source input number (1-6)
      range: [1, 6]

- id: set_channel_2
  label: Set Channel 2 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (1-6)
      range: [1, 6]

- id: set_channel_3
  label: Set Channel 3 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (1-6)
      range: [1, 6]

- id: set_channel_4
  label: Set Channel 4 Input
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (1-6)
      range: [1, 6]

- id: lock_on
  label: Lock Front Panel On
  kind: action
  params: []

- id: lock_off
  label: Lock Front Panel Off
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
  response: SBaLonaK

- id: power_off_ack
  label: Power Off Acknowledge
  response: SBaLoFaK

- id: channel_1_updated
  label: Channel 1 Updated
  response: SBUdxxo1
  params:
    - name: input
      type: integer
      description: Selected source (1-6)

- id: channel_2_updated
  label: Channel 2 Updated
  response: SBUdxxo2
  params:
    - name: input
      type: integer
      description: Selected source (1-6)

- id: channel_3_updated
  label: Channel 3 Updated
  response: SBUdxxo4
  params:
    - name: input
      type: integer
      description: Selected source (1-6)

- id: channel_4_updated
  label: Channel 4 Updated
  response: SBUdxxo3
  params:
    - name: input
      type: integer
      description: Selected source (1-6)

- id: lock_on_status
  label: Lock On Status
  response: SBSYSLoK

- id: lock_off_status
  label: Lock Off Status
  response: SBSYSULK

- id: reset_ack
  label: Reset Acknowledge
  response: SBRStaCK

- id: status_ack
  label: Status Acknowledge
  response: SBStataK
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
After receiving `SBASKSTA`, device sends 10 sequential feedback responses: power ack, lock status, reset ack, status ack, then IN/OUT state commands (`SBUD0000XXYY` where XX=input 01–06, YY=output 01–04).
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RS-232 connector pinout not stated in source -->
<!-- UNRESOLVED: command timing or inter-command delay requirements not stated in source -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
  - manualslib.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
  - "https://www.manualslib.com/manual/1854379/Shinybow-Usa-8x2-Multivideo-To-Vga-Switcher-Series.html?page=8"
retrieved_at: 2026-05-21T21:31:27.380Z
last_checked_at: 2026-05-31T21:21:14.612Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:21:14.612Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions matched distinct source control commands; transport params verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no standalone settable parameters documented"
- "no unsolicited event notifications documented"
- "no multi-step macros documented"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "RS-232 connector pinout not stated in source"
- "command timing or inter-command delay requirements not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
