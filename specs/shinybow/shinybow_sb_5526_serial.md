---
spec_id: admin/shinybow-sb-5526
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-5526 Control Spec"
manufacturer: Shinybow
model_family: SB-5526
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-5526
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://shinybowusa.com/PDF/UG-5526.pdf
retrieved_at: 2026-06-01T22:37:37.621Z
last_checked_at: 2026-06-02T08:29:33.748Z
generated_at: 2026-06-02T08:29:33.748Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated; safety warnings not present in source"
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements"
  - "firmware version not stated in source; applies to all devices except SB-5688 per protocol scope note"
verification:
  verdict: verified
  checked_at: 2026-06-02T08:29:33.748Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions match source commands verbatim with correct shapes; transport parameters (9600 bps, 8N1, no flow control) confirmed; source has exactly 10 control commands fully represented by spec. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Shinybow SB-5526 Control Spec

## Summary
Shinybow SB-5526 multi-output matrix/switcher controlled over RS-232C at 9600 bps 8N1, no flow control. Spec covers the 10 ASCII control commands and 10 ASCII feedback responses documented in the vendor's RS-232 protocol manual.

<!-- UNRESOLVED: firmware version not stated; safety warnings not present in source -->

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
- powerable   # inferred from power on/off command examples
- routable    # inferred from input/output routing command examples
- queryable   # inferred from ask-status command example
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "SBSYSmon"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "SBSYSmoF"
  params: []

- id: set_channel_1_input
  label: Channel 1 Input
  kind: action
  command: "SBI{xx}o01"
  params:
    - name: xx
      type: integer
      description: Input source number (01-06)

- id: set_channel_2_input
  label: Channel 2 Input
  kind: action
  command: "SBI{xx}o02"
  params:
    - name: xx
      type: integer
      description: Input source number (01-06)

- id: set_channel_3_input
  label: Channel 3 Input
  kind: action
  command: "SBI{xx}o03"
  params:
    - name: xx
      type: integer
      description: Input source number (01-06)

- id: set_channel_4_input
  label: Channel 4 Input
  kind: action
  command: "SBI{xx}o04"
  params:
    - name: xx
      type: integer
      description: Input source number (01-06)

- id: lock_toggle_on
  label: Front Panel Lock On
  kind: action
  command: "SBSYSmLK"
  params: []

- id: lock_toggle_off
  label: Front Panel Lock Off
  kind: action
  command: "SBSYSmUK"
  params: []

- id: reset
  label: Reset Device
  kind: action
  command: "SBaLLRSt"
  params: []

- id: ask_status
  label: Ask Status
  kind: query
  command: "SBaSKSta"
  params: []
```

## Feedbacks
```yaml
- id: power_on_ack
  type: string
  response: "SBaLonaK"
  description: Ack for system power-on command

- id: power_off_ack
  type: string
  response: "SBaLoFaK"
  description: Ack for system power-off command

- id: channel_1_updated
  type: string
  response: "SBUd{xx}o1"
  description: Channel 1 output source changed; xx = (01..06)

- id: channel_2_updated
  type: string
  response: "SBUd{xx}o2"
  description: Channel 2 output source changed; xx = (01..06)

- id: channel_3_updated
  type: string
  response: "SBUd{xx}o4"
  description: Channel 3 output source changed; xx = (01..06)

- id: channel_4_updated
  type: string
  response: "SBUd{xx}o3"
  description: Channel 4 output source changed; xx = (01..06)

- id: lock_on
  type: string
  response: "SBSYSLoK"
  description: Front panel lock engaged

- id: lock_off
  type: string
  response: "SBSYSULK"
  description: Front panel lock released

- id: reset_ack
  type: string
  response: "SBRStaCK"
  description: Ack for reset command

- id: status_ack
  type: string
  response: "SBStataK"
  description: Ack for ask-status; followed by 10th, 1/2th, IN/OUT, 7/8th feedback commands sequentially

- id: in_out_state
  type: string
  response: "SBUD0000{XX}{YY}"
  description: IN/OUT state reported after ask-status; XX = input port (01..06), YY = output port (01..06)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements
```

## Notes
- Commands are 8 ASCII bytes sent from controller.
- After receiving <SBaSKSta>, device sends 10th, 1/2th, IN/OUT, 7/8th feedback commands sequentially.
- Feedback uses capitalised variants (<SBSYSLoK> / <SBSYSULK>) while the corresponding control commands use mixed case (<SBSYSmLK> / <SBSYSmUK>) — case is significant.
- Front panel lock: when locked on, all status changes occur via RS-232 only.
- Reset returns all output destinations to Source 1.
- All 6 source inputs selectable; 4 output channels.

<!-- UNRESOLVED: firmware version not stated in source; applies to all devices except SB-5688 per protocol scope note -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://shinybowusa.com/PDF/UG-5526.pdf
retrieved_at: 2026-06-01T22:37:37.621Z
last_checked_at: 2026-06-02T08:29:33.748Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:29:33.748Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions match source commands verbatim with correct shapes; transport parameters (9600 bps, 8N1, no flow control) confirmed; source has exactly 10 control commands fully represented by spec. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated; safety warnings not present in source"
- "source contains no safety warnings, interlocks, or power-on sequencing requirements"
- "firmware version not stated in source; applies to all devices except SB-5688 per protocol scope note"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
