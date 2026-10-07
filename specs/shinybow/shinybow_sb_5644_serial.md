---
spec_id: admin/shinybow-sb-5644
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-5644 Control Spec"
manufacturer: Shinybow
model_family: SB-5644
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-5644
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
retrieved_at: 2026-05-22T18:30:24.670Z
last_checked_at: 2026-10-07T10:10:14.098Z
generated_at: 2026-10-07T10:10:14.098Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device firmware version compatibility not stated in source"
  - "port number not stated in source"
  - "no standalone settable parameters found in source"
  - "no unsolicited event descriptions found in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "input voltage/current/power specifications not in source"
  - "error code definitions not in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T10:10:14.098Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 controller commands match the source command table literally, and the serial transport values are supported. Auth is honestly UNRESOLVED. The 10 device-response feedbacks are all modelled in Feedbacks. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Shinybow SB-5644 Control Spec

## Summary
RS-232 matrix switcher with 6 inputs and 4 outputs. Controls power, routing, panel lock, and reset via ASCII command strings at 9600 baud. Applies to all devices except SB-5688.

<!-- UNRESOLVED: device firmware version compatibility not stated in source -->

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
addressing:
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: UNRESOLVED  # source does not state this
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input/output routing commands present
- queryable       # ask status command present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command: SBSYSmon

- id: power_off
  label: Power Off
  kind: action
  params: []
  command: SBSYSmoF

- id: set_channel_1
  label: Set Channel 1 Routing
  kind: action
  params:
    - name: xx
      type: string
      description: Source input code (01-06)
  command: SBI{{xx}}o01

- id: set_channel_2
  label: Set Channel 2 Routing
  kind: action
  params:
    - name: xx
      type: string
      description: Source input code (01-06)
  command: SBI{{xx}}o02

- id: set_channel_3
  label: Set Channel 3 Routing
  kind: action
  params:
    - name: xx
      type: string
      description: Source input code (01-06)
  command: SBI{{xx}}o03

- id: set_channel_4
  label: Set Channel 4 Routing
  kind: action
  params:
    - name: xx
      type: string
      description: Source input code (01-06)
  command: SBI{{xx}}o04

- id: lock_panel_on
  label: Lock Panel On
  kind: action
  params: []
  command: SBSYSmLK

- id: lock_panel_off
  label: Lock Panel Off
  kind: action
  params: []
  command: SBSYSmUK

- id: reset
  label: Reset Device
  kind: action
  params: []
  command: SBaLLRSt

- id: ask_status
  label: Ask Status
  kind: action
  params: []
  command: SBaSKSta
```

## Feedbacks
```yaml
- id: power_on_ack
  label: Power On Ack
  kind: feedback
  command: SBaLonaK

- id: power_off_ack
  label: Power Off Ack
  kind: feedback
  command: SBaLoFaK

- id: channel_1_updated
  label: Channel 1 Updated
  kind: feedback
  command: SBUd{{xx}}o1
  params:
    - name: xx
      type: string
      description: Source input code (01-06)

- id: channel_2_updated
  label: Channel 2 Updated
  kind: feedback
  command: SBUd{{xx}}o2
  params:
    - name: xx
      type: string
      description: Source input code (01-06)

- id: channel_3_updated
  label: Channel 3 Updated
  kind: feedback
  command: SBUd{{xx}}o4
  params:
    - name: xx
      type: string
      description: Source input code (01-06)

- id: channel_4_updated
  label: Channel 4 Updated
  kind: feedback
  command: SBUd{{xx}}o3
  params:
    - name: xx
      type: string
      description: Source input code (01-06)

- id: lock_on_ack
  label: Lock On Ack
  kind: feedback
  command: SBSYSLoK

- id: lock_off_ack
  label: Lock Off Ack
  kind: feedback
  command: SBSYSULK

- id: reset_ack
  label: Reset Ack
  kind: feedback
  command: SBRStaCK

- id: status_ack
  label: Status Acknowledge
  kind: feedback
  command: SBStataK
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions found in source
# After <SBASKSTA>, source says the device sends the "10th, 1/2th, IN/OUT state, 7/8th" commands sequentially; exact sequence meaning is UNRESOLVED.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands are 8-byte ASCII strings
- After receiving `<SBASKSTA>`, the device sends the “10th, 1/2th, IN/OUT state, 7/8th” commands sequentially; the exact sequence meaning is UNRESOLVED in the source
- IN/OUT state format: `SBUD0000XXYY` where XX=input port (01-06), YY=output port (01-06), as stated in the source
- Device responds to one feedback command per request except for status query
- Front panel lock: when locked, all status changes only via RS-232
- Reset sets all destinations to Source 1
- RS-232 Protocol Version 1.0, applies to all devices except SB-5688
<!-- UNRESOLVED: input voltage/current/power specifications not in source -->
<!-- UNRESOLVED: error code definitions not in source -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
  - startelektronik.com.tr
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
  - https://www.startelektronik.com.tr/pdf/shinybow/SB5608/SB5608_Kullanim_Klavuzu.pdf
retrieved_at: 2026-05-22T18:30:24.670Z
last_checked_at: 2026-10-07T10:10:14.098Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T10:10:14.098Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 controller commands match the source command table literally, and the serial transport values are supported. Auth is honestly UNRESOLVED. The 10 device-response feedbacks are all modelled in Feedbacks. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device firmware version compatibility not stated in source"
- "port number not stated in source"
- "no standalone settable parameters found in source"
- "no unsolicited event descriptions found in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "input voltage/current/power specifications not in source"
- "error code definitions not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
