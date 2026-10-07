---
spec_id: admin/shinybow-sb-5608
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-5608 Control Spec"
manufacturer: Shinybow
model_family: SB-5608
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-5608
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
  - startelektronik.com.tr
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://www.startelektronik.com.tr/pdf/shinybow/SB5608/SB5608_Kullanim_Klavuzu.pdf
retrieved_at: 2026-05-21T22:03:44.223Z
last_checked_at: 2026-10-07T13:27:18.352Z
generated_at: 2026-10-07T13:27:18.352Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full command syntax (byte-level structure) not detailed beyond ASCII mnemonics. UNRESOLVED: device applies to all models except SB-5688."
  - "no discrete queryable parameters other than status request"
  - "no unsolicited event documentation"
  - "no explicit multi-step sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "byte-level command packet structure not detailed — only ASCII mnemonics provided. UNRESOLVED: whether device auto-reports state changes (unsolicited) not confirmed."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:27:18.352Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 units match source commands (10 controller commands, 10 feedback replies, IN/OUT state); serial settings verbatim; source generic 'all devices except SB-5688'. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Shinybow SB-5608 Control Spec

## Summary
8×8 matrix switcher supporting RS-232C serial control. Controls input/output routing (6 inputs → 4 outputs), power, front panel lock, and device reset. Serial config: 9600 bps, 8N1, no flow control.

<!-- UNRESOLVED: full command syntax (byte-level structure) not detailed beyond ASCII mnemonics. UNRESOLVED: device applies to all models except SB-5688. -->

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
- powerable
- routable
- queryable
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
      description: Source input number (01-06)

- id: set_channel_2
  label: Set Channel 2 Source
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (01-06)

- id: set_channel_3
  label: Set Channel 3 Source
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (01-06)

- id: set_channel_4
  label: Set Channel 4 Source
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (01-06)

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
  type: string
  values:
    - SBaLonaK
  query_command: SBSYSmon

- id: power_off_ack
  label: Power Off Acknowledge
  type: string
  values:
    - SBaLoFaK
  query_command: SBSYSmoF

- id: channel_1_updated
  label: Channel 1 Updated
  type: string
  values:
    - SBUdxxo1  # xx = source input 01-06
  query_command: SBIxxo01

- id: channel_2_updated
  label: Channel 2 Updated
  type: string
  values:
    - SBUdxxo2  # xx = source input 01-06
  query_command: SBIxxo02

- id: channel_3_updated
  label: Channel 3 Updated
  type: string
  values:
    - SBUdxxo4  # xx = source input 01-06
  query_command: SBIxxo03

- id: channel_4_updated
  label: Channel 4 Updated
  type: string
  values:
    - SBUdxxo3  # xx = source input 01-06
  query_command: SBIxxo04

- id: lock_on_ack
  label: Lock On Acknowledge
  type: string
  values:
    - SBSYSLoK
  query_command: SBSYSmLK

- id: lock_off_ack
  label: Lock Off Acknowledge
  type: string
  values:
    - SBSYSULK
  query_command: SBSYSmUK

- id: reset_ack
  label: Reset Acknowledge
  type: string
  values:
    - SBRStaCK
  query_command: SBaLLRSt

- id: status_ack
  label: Status Acknowledge
  type: string
  values:
    - SBStataK
  query_command: SBaSKSta

- id: inout_state
  label: IN/OUT State
  type: string
  values:
    - SBUD0000XXYY  # XX = input port 01-06, YY = output port 01-06
  query_command: SBaSKSta
  note: Sent sequentially after SBASKSTA request. All 10 feedback commands sent in sequence after status request.
```

## Variables
```yaml
# UNRESOLVED: no discrete queryable parameters other than status request
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
On power-on reset, all destinations set to Source 1. When front panel is locked, all status changes are made via RS-232 only. The device sends all 10 feedback commands sequentially after receiving the status request.
<!-- UNRESOLVED: byte-level command packet structure not detailed — only ASCII mnemonics provided. UNRESOLVED: whether device auto-reports state changes (unsolicited) not confirmed. -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
  - startelektronik.com.tr
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://www.startelektronik.com.tr/pdf/shinybow/SB5608/SB5608_Kullanim_Klavuzu.pdf
retrieved_at: 2026-05-21T22:03:44.223Z
last_checked_at: 2026-10-07T13:27:18.352Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:27:18.352Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 units match source commands (10 controller commands, 10 feedback replies, IN/OUT state); serial settings verbatim; source generic 'all devices except SB-5688'. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full command syntax (byte-level structure) not detailed beyond ASCII mnemonics. UNRESOLVED: device applies to all models except SB-5688."
- "no discrete queryable parameters other than status request"
- "no unsolicited event documentation"
- "no explicit multi-step sequences documented"
- "no safety warnings or interlock procedures in source"
- "byte-level command packet structure not detailed — only ASCII mnemonics provided. UNRESOLVED: whether device auto-reports state changes (unsolicited) not confirmed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
