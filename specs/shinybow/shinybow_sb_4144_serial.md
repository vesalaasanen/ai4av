---
spec_id: admin/shinybow-sb-4144
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-4144 Control Spec"
manufacturer: Shinybow
model_family: SB-4144
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-4144
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-05-21T22:00:46.782Z
last_checked_at: 2026-10-07T13:51:12.741Z
generated_at: 2026-10-07T13:51:12.741Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact matrix I/O count for SB-4144 not stated — 6 in / 4 out inferred from command parameter ranges. Protocol doc covers all Shinybow devices except SB-5688; SB-4144-specific behavior not distinguished."
  - "no settable parameters beyond discrete actions found in source"
  - "no unsolicited notification mechanism described in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures found in source"
  - "exact matrix size for SB-4144 not explicitly stated — 6 in / 4 out inferred from command parameter ranges"
  - "inter-command delay / timing not specified"
  - "error recovery behavior not documented"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:51:12.741Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 action units match source literals and shapes; serial transport verbatim; catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Shinybow SB-4144 Control Spec

## Summary
The Shinybow SB-4144 is an AV matrix switcher controllable via RS-232 serial using 8-byte ASCII command strings. This spec covers power control, input-to-output routing (up to 6 inputs to 4 outputs), front-panel lockout, device reset, and status query.

<!-- UNRESOLVED: exact matrix I/O count for SB-4144 not stated — 6 in / 4 out inferred from command parameter ranges. Protocol doc covers all Shinybow devices except SB-5688; SB-4144-specific behavior not distinguished. -->

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
traits:
  - powerable  # inferred from power on/off commands
  - routable   # inferred from channel routing commands
  - queryable  # inferred from ask status command
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: SBSYSmon
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: SBSYSmoF
    params: []

  - id: channel_1_set
    label: Channel 1 Setting
    kind: action
    command: SBIxxo01
    params:
      - name: input
        type: integer
        min: 1
        max: 6
        description: "Source input (1-6). Replace xx with zero-padded value 01-06."

  - id: channel_2_set
    label: Channel 2 Setting
    kind: action
    command: SBIxxo02
    params:
      - name: input
        type: integer
        min: 1
        max: 6
        description: "Source input (1-6). Replace xx with zero-padded value 01-06."

  - id: channel_3_set
    label: Channel 3 Setting
    kind: action
    command: SBIxxo03
    params:
      - name: input
        type: integer
        min: 1
        max: 6
        description: "Source input (1-6). Replace xx with zero-padded value 01-06."

  - id: channel_4_set
    label: Channel 4 Setting
    kind: action
    command: SBIxxo04
    params:
      - name: input
        type: integer
        min: 1
        max: 6
        description: "Source input (1-6). Replace xx with zero-padded value 01-06."

  - id: lock_on
    label: Front Panel Lock On
    kind: action
    command: SBSYSmLK
    params: []
    description: "Locks front panel. All status changes via RS-232 only."

  - id: lock_off
    label: Front Panel Lock Off
    kind: action
    command: SBSYSmUK
    params: []
    description: "Unlocks front panel."

  - id: reset
    label: Reset
    kind: action
    command: SBaLLRSt
    params: []
    description: "Resets device; all outputs set to Source 1."

  - id: ask_status
    label: Ask Status
    kind: action
    command: SBaSKSta
    params: []
    description: "Requests full status. Device responds with multiple sequential feedbacks."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_on_ack
    label: Power On Acknowledge
    command: SBaLonaK
    query_command: SBaSKSta
    description: "Response to power on command."

  - id: power_off_ack
    label: Power Off Acknowledge
    command: SBaLoFaK
    query_command: SBaSKSta
    description: "Response to power off command."

  - id: channel_1_updated
    label: Channel 1 Updated
    command: SBUdxxo1
    description: "1st output updated. xx = selected source 01-06."
    query_command: SBIxxo01

  - id: channel_2_updated
    label: Channel 2 Updated
    command: SBUdxxo2
    description: "2nd output updated. xx = selected source 01-06."
    query_command: SBIxxo02

  - id: channel_3_updated
    label: Channel 3 Updated
    command: SBUdxxo4
    description: "3rd output updated. xx = selected source 01-06. NOTE: suffix o4 per source - possible doc error (see Notes)."
    query_command: SBIxxo03

  - id: channel_4_updated
    label: Channel 4 Updated
    command: SBUdxxo3
    description: "4th output updated. xx = selected source 01-06. NOTE: suffix o3 per source - possible doc error (see Notes)."
    query_command: SBIxxo04

  - id: lock_on_ack
    label: Lock On Acknowledge
    command: SBSYSLoK
    query_command: SBaSKSta
    description: "Front panel lock confirmed."

  - id: lock_off_ack
    label: Lock Off Acknowledge
    command: SBSYSULK
    query_command: SBaSKSta
    description: "Front panel unlock confirmed."

  - id: reset_ack
    label: Reset Acknowledge
    command: SBRStaCK
    description: "Response to reset command."
    query_command: SBaLLRSt

  - id: status_ack
    label: Status Acknowledge
    command: SBStataK
    query_command: SBaSKSta
    description: "Acknowledges status request. Device then sends power state, routing state, and lock state sequentially."

  - id: in_out_state
    label: IN/OUT State
    command: SBUD0000XXYY
    query_command: SBaSKSta
    description: "Routing state. XX = input port (01-06), YY = output port (01-06). Sent per output during status response."
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- Commands are exactly 8 ASCII bytes.
- The `xx` placeholder in routing commands must be zero-padded (e.g., input 1 → `01`).
- Feedback commands for channels 3 and 4 appear to have suffixes swapped in source: `SBUdxxo4` maps to Channel 3 and `SBUdxxo3` maps to Channel 4. Likely documentation error — verify against real device.
- After receiving `SBaSKSta`, the device sends sequentially: `SBStataK` (ack), power state (`SBaLonaK`/`SBaLoFaK`), IN/OUT routing state (`SBUD0000XXYY` per output), lock state (`SBSYSLoK`/`SBSYSULK`).
- Protocol version 1.0. Applies to all Shinybow devices except SB-5688.

<!-- UNRESOLVED: exact matrix size for SB-4144 not explicitly stated — 6 in / 4 out inferred from command parameter ranges -->
<!-- UNRESOLVED: inter-command delay / timing not specified -->
<!-- UNRESOLVED: error recovery behavior not documented -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-05-21T22:00:46.782Z
last_checked_at: 2026-10-07T13:51:12.741Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:51:12.741Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 action units match source literals and shapes; serial transport verbatim; catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact matrix I/O count for SB-4144 not stated — 6 in / 4 out inferred from command parameter ranges. Protocol doc covers all Shinybow devices except SB-5688; SB-4144-specific behavior not distinguished."
- "no settable parameters beyond discrete actions found in source"
- "no unsolicited notification mechanism described in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures found in source"
- "exact matrix size for SB-4144 not explicitly stated — 6 in / 4 out inferred from command parameter ranges"
- "inter-command delay / timing not specified"
- "error recovery behavior not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
