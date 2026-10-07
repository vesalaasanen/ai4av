---
spec_id: admin/shinybow-sb-5582
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-5582 Control Spec"
manufacturer: Shinybow
model_family: SB-5582
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-5582
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-06-02T19:51:08.682Z
last_checked_at: 2026-10-01T10:58:40.794Z
generated_at: 2026-10-01T10:58:40.794Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical serial connector pinout not in refined excerpt; firmware version compatibility not stated."
  - "no separately settable parameters beyond the routing/power/lock"
  - "source documents feedback frames sent in response to commands;"
  - "no multi-step macro sequences described in source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility range; physical DB9 pinout; command inter-character / inter-command timing; behaviour when an unknown command is received."
verification:
  verdict: verified
  checked_at: 2026-10-01T10:58:40.794Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec action units map to the 10 source controlling commands; transport (9600, 8N1, no flow) matches; coverage 10/10. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Shinybow SB-5582 Control Spec

## Summary
Shinybow SB-5582 is a 6x4 component matrix switcher controlled over RS-232. This spec covers the RS-232 protocol version 1.0 documented in the vendor manual (Encl00RS23200a0, FEB 2016), which applies to all Shinybow devices except SB-5688. The protocol uses 8-byte ASCII commands at 9600 bps for power, input/output routing, front-panel lock, reset, and status query.

<!-- UNRESOLVED: physical serial connector pinout not in refined excerpt; firmware version compatibility not stated. -->

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
- powerable   # inferred from SBSYSMON / SBSYSMOF power commands
- routable    # inferred from SBIxxOyy channel routing commands
- queryable   # inferred from SBASKSTA status query
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "SBSYSMON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "SBSYSMOF"
  params: []

- id: route_input_to_output_1
  label: Channel 1 Setting (route input to output 1)
  kind: action
  command: "SBI{xx}O01"
  params:
    - name: xx
      type: string
      description: Input number, zero-padded two-digit ASCII, 01-06
      enum: ["01", "02", "03", "04", "05", "06"]

- id: route_input_to_output_2
  label: Channel 2 Setting (route input to output 2)
  kind: action
  command: "SBI{xx}O02"
  params:
    - name: xx
      type: string
      description: Input number, zero-padded two-digit ASCII, 01-06
      enum: ["01", "02", "03", "04", "05", "06"]

- id: route_input_to_output_3
  label: Channel 3 Setting (route input to output 3)
  kind: action
  command: "SBI{xx}O03"
  params:
    - name: xx
      type: string
      description: Input number, zero-padded two-digit ASCII, 01-06
      enum: ["01", "02", "03", "04", "05", "06"]

- id: route_input_to_output_4
  label: Channel 4 Setting (route input to output 4)
  kind: action
  command: "SBI{xx}O04"
  params:
    - name: xx
      type: string
      description: Input number, zero-padded two-digit ASCII, 01-06
      enum: ["01", "02", "03", "04", "05", "06"]

- id: front_panel_lock_on
  label: Front Panel Lock Toggle On
  kind: action
  command: "SBSYSMLK"
  params: []
  notes: When locked on, all status changes only via RS-232.

- id: front_panel_lock_off
  label: Front Panel Lock Toggle Off
  kind: action
  command: "SBSYSMUK"
  params: []

- id: reset_all
  label: Reset
  kind: action
  command: "SBALLRST"
  params: []
  notes: Resets device; all destinations set to Source 1.

- id: ask_status
  label: Ask Status
  kind: query
  command: "SBASKSTA"
  params: []
  notes: |
    Triggers a multi-frame feedback sequence: device replies with reset-ack,
    power state (1st/2nd), then IN/OUT state for each channel, then lock
    state (7th/8th), in that order.
```

## Feedbacks
```yaml
- id: power_on_ack
  label: Power On Acknowledge
  command: "SBALONAK"
  type: enum
  values: [received]
  description: Acknowledges system power-on command.

- id: power_off_ack
  label: Power Off Acknowledge
  command: "SBALOFAK"
  type: enum
  values: [received]
  description: Acknowledges system power-off command.

- id: channel_1_updated
  label: Channel 1 Updated
  command: "SBUD{xx}O1"
  type: string
  description: 1st output signal changed; xx = selected source (01-06).

- id: channel_2_updated
  label: Channel 2 Updated
  command: "SBUD{xx}O2"
  type: string
  description: 2nd output signal changed; xx = selected source (01-06).

- id: channel_3_updated
  label: Channel 3 Updated
  command: "SBUD{xx}O4"   # verbatim from source: row 5 of feedback table uses O4 for "Channel 3 Updated"
  type: string
  description: |
    3rd output signal changed; xx = selected source (01-06).
    NOTE: source table lists this token as "SBUDxxO4" under "Channel 3 Updated"
    and "SBUDxxO3" under "Channel 4 Updated" - preserved verbatim from source.
    This is a likely vendor documentation swap; behaviour on real hardware
    not verified.

- id: channel_4_updated
  label: Channel 4 Updated
  command: "SBUD{xx}O3"   # verbatim from source: row 6 of feedback table uses O3 for "Channel 4 Updated"
  type: string
  description: |
    4th output signal changed; xx = selected source (01-06).
    See note on channel_3_updated regarding source table ordering.

- id: lock_on
  label: Lock On
  command: "SBSYSLOK"
  type: enum
  values: [locked]
  description: Reports front panel is locked.

- id: lock_off
  label: Lock Off
  command: "SBSYSULK"
  type: enum
  values: [unlocked]
  description: Reports front panel lock released.

- id: reset_ack
  label: Reset Acknowledge
  command: "SBRSTACK"
  type: enum
  values: [received]
  description: Acknowledges reset command.

- id: status_ack
  label: Status Acknowledge
  command: "SBSTATAK"
  type: enum
  values: [received]
  description: Acknowledges ask-status command (first frame of multi-frame status reply).

- id: in_out_state
  label: IN/OUT State
  command: "SBUD0000{xx}{yy}"
  type: string
  description: |
    Per-channel input/output mapping reported as part of the ask-status
    response sequence. xx = input port (01-06), yy = output port (01-06).
```

## Variables
```yaml
# UNRESOLVED: no separately settable parameters beyond the routing/power/lock
# actions above are documented in the refined source.
```

## Events
```yaml
# UNRESOLVED: source documents feedback frames sent in response to commands;
# no unsolicited (non-request-driven) event notifications are described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements present in the refined RS-232 protocol excerpt.
```

## Notes
- Wire-level framing: every command is exactly 8 ASCII bytes; the first six bytes carry the action token and the remaining two bytes carry the action parameter (e.g. `O01`..`O04` channel selector, `xx` input selector).
- The protocol header states it "applies to all devices except SB-5688", confirming SB-5582 is covered.
- The `SBASKSTA` query returns a multi-frame reply: reset-ack, power state, per-channel IN/OUT mapping (`SBUD0000xxyy`), then lock state — emitted sequentially by the device.
- Feedback tokens `SBUDxxO4` (labelled "Channel 3 Updated") and `SBUDxxO3` (labelled "Channel 4 Updated") appear swapped in the vendor table; preserved verbatim because the spec must not silently correct documented payloads. Validate on real hardware before relying on either channel-3 or channel-4 feedback parsing.
- Source document part number: `Encl00RS23200a0`, dated FEB 2016, RS-232 protocol version 1.0.

<!-- UNRESOLVED: firmware version compatibility range; physical DB9 pinout; command inter-character / inter-command timing; behaviour when an unknown command is received. -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-06-02T19:51:08.682Z
last_checked_at: 2026-10-01T10:58:40.794Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T10:58:40.794Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec action units map to the 10 source controlling commands; transport (9600, 8N1, no flow) matches; coverage 10/10. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical serial connector pinout not in refined excerpt; firmware version compatibility not stated."
- "no separately settable parameters beyond the routing/power/lock"
- "source documents feedback frames sent in response to commands;"
- "no multi-step macro sequences described in source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility range; physical DB9 pinout; command inter-character / inter-command timing; behaviour when an unknown command is received."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
