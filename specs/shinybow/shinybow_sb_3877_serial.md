---
spec_id: admin/shinybow-sb-3877
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-3877 Control Spec"
manufacturer: Shinybow
model_family: SB-3877
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-3877
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-05-22T18:28:26.673Z
last_checked_at: 2026-10-01T10:48:56.005Z
generated_at: 2026-10-01T10:48:56.005Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no discrete settable parameters outside of routing commands"
  - "no unsolicited event notifications described"
  - "no multi-step sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "voltage/current/power specifications not in source"
  - "firmware version compatibility not stated"
  - "protocol version number not confirmed"
  - "binary command byte encodings not provided"
  - "port number not applicable (serial only)"
verification:
  verdict: verified
  checked_at: 2026-10-01T10:48:56.005Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions match the source command table 1:1; transport params (9600, 8N1, no flow control) are verbatim in the source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Shinybow SB-3877 Control Spec

## Summary
The SB-3877 is an HDMI matrix switcher with 6 inputs and 4 outputs, controllable via RS-232. This spec covers the serial control protocol including power, routing, lock, and reset commands.

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

- id: set_channel_1_output
  label: Channel 1 Output Setting
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (01-06)

- id: set_channel_2_output
  label: Channel 2 Output Setting
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (01-06)

- id: set_channel_3_output
  label: Channel 3 Output Setting
  kind: action
  params:
    - name: input
      type: integer
      description: Source input number (01-06)

- id: set_channel_4_output
  label: Channel 4 Output Setting
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
  type: enum
  values: [SBALONAK]

- id: power_off_ack
  label: Power Off Acknowledge
  type: enum
  values: [SBALOFAK]

- id: channel_1_updated
  label: Channel 1 Updated
  type: enum
  values: [SBUD0101-SBUD0601]  # xx=01-06

- id: channel_2_updated
  label: Channel 2 Updated
  type: enum
  values: [SBUD0102-SBUD0602]

- id: channel_3_updated
  label: Channel 3 Updated
  type: enum
  values: [SBUD0103-SBUD0603]

- id: channel_4_updated
  label: Channel 4 Updated
  type: enum
  values: [SBUD0104-SBUD0604]

- id: lock_on_status
  label: Lock On Status
  type: enum
  values: [SBSYSLOK]

- id: lock_off_status
  label: Lock Off Status
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
  label: IN/OUT State
  type: string
  description: Returns SBUD0000XXYY where XX=input(01-06), YY=output(01-04)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside of routing commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described
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
The device responds with 10 sequential feedback commands after a status request (SBASKSTA). Reset sets all destinations to Source 1. When locked on, all status changes are controlled via RS-232 only.
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: protocol version number not confirmed -->
<!-- UNRESOLVED: binary command byte encodings not provided -->
<!-- UNRESOLVED: port number not applicable (serial only) -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-05-22T18:28:26.673Z
last_checked_at: 2026-10-01T10:48:56.005Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T10:48:56.005Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions match the source command table 1:1; transport params (9600, 8N1, no flow control) are verbatim in the source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no discrete settable parameters outside of routing commands"
- "no unsolicited event notifications described"
- "no multi-step sequences documented"
- "no safety warnings or interlock procedures in source"
- "voltage/current/power specifications not in source"
- "firmware version compatibility not stated"
- "protocol version number not confirmed"
- "binary command byte encodings not provided"
- "port number not applicable (serial only)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
