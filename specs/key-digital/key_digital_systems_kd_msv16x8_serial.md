---
spec_id: admin/key-digital-systems-kd-msv16x8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MSV16x8 Control Spec"
manufacturer: "Key Digital"
model_family: KD-MSV16x8
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-MSV16x8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
  - manualslib.com
source_urls:
  - "http://keydigital.com/Control%20Mods%20Codes/KD-MSV8X8/RS-232/KD-MSV8X8_232_Commands.pdf"
  - https://www.manualslib.com/manual/602639/Key-Digital-Kd-Msv8x8-Fatboy.html
retrieved_at: 2026-07-24T18:43:19.145Z
last_checked_at: 2026-08-05T08:25:29.773Z
generated_at: 2026-08-05T08:25:29.773Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is for the sibling KD-MSV8X8; protocol conformance to the 16x8 is inferred, not confirmed. No independent KD-MSV16x8 control PDF was located."
  - "response string formats for status queries (numeric vs verbose) are not specified in source."
  - "response format is switchable (numeric/verbose) but the exact string grammar is not documented."
  - "unsolicited notifications not documented in source."
  - "multi-step sequences not documented in source."
  - "no safety warnings or interlock procedures documented in source."
  - "source document is for KD-MSV8X8; command applicability to the KD-MSV16x8 is assumed but not independently verified. Response string grammar (numeric vs verbose) not documented."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:25:29.773Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions map cleanly to documented commands; transport parameters match the source verbatim; source has no extra commands. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Key Digital Systems KD-MSV16x8 Control Spec

## Summary
RS-232 control spec for the Key Digital Systems KD-MSV16x8 matrix switcher. Covers I/O switching, unit addressing, fade-to-black interval, IR/front-panel lockout, video mute, factory reset, status queries, response format, and AMX status. Source protocol is the sibling KD-MSV8X8 manual; the 16x8 is assumed to share the same command set family, but this has not been confirmed against a 16x8 device.

<!-- UNRESOLVED: source document is for the sibling KD-MSV8X8; protocol conformance to the 16x8 is inferred, not confirmed. No independent KD-MSV16x8 control PDF was located. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from I/O switching commands
- queryable  # inferred from status query commands
```

## Actions
```yaml
- id: io_switching_set
  label: I/O Switching Set
  kind: action
  command: "SPO{output}SI{input}"
  params:
    - name: output
      type: integer
      description: Output select (01-08)
    - name: input
      type: integer
      description: Input select (01-08)

- id: unit_address_set
  label: Unit Address Set
  kind: action
  command: "SPCA{address}"
  params:
    - name: address
      type: integer
      description: Desired 2-digit unit address (00-99). 00 = stand-alone.

- id: fade_to_black_set
  label: Fade-to-Black Interval Set
  kind: action
  command: "SPO{output}MI{interval}"
  params:
    - name: output
      type: integer
      description: Output select (01-08)
    - name: interval
      type: integer
      description: Fade-to-black interval setting (00-09)

- id: ir_enable
  label: IR Sensor Enable
  kind: action
  command: "SPCIRE"
  params: []

- id: ir_disable
  label: IR Sensor Disable
  kind: action
  command: "SPCIRD"
  params: []

- id: front_panel_enable
  label: Front Panel Button Enable
  kind: action
  command: "SPCFBE"
  params: []

- id: front_panel_disable
  label: Front Panel Button Disable
  kind: action
  command: "SPCFBD"
  params: []

- id: output_video_mute
  label: Output Video Mute
  kind: action
  command: "SPO{output}CME"
  params:
    - name: output
      type: integer
      description: Output select (01-08)

- id: output_video_unmute
  label: Output Video Un-Mute
  kind: action
  command: "SPO{output}CMD"
  params:
    - name: output
      type: integer
      description: Output select (01-08)

- id: all_outputs_mute
  label: All Outputs Mute
  kind: action
  command: "SPCCME"
  params: []

- id: all_outputs_unmute
  label: All Outputs Un-Mute
  kind: action
  command: "SPCCMD"
  params: []

- id: reset_unit
  label: Reset Unit to Factory Default
  kind: action
  command: "SPCDF"
  params: []

- id: output_status_query
  label: Output Status Query
  kind: query
  command: "STO{output}"
  params:
    - name: output
      type: integer
      description: Output select (01-08)

- id: global_status_query
  label: Global Status Query
  kind: query
  command: "STA"
  params: []

- id: response_numeric
  label: Numeric RS-232 Response Mode
  kind: action
  command: "SPCRSN"
  params: []

- id: response_verbose
  label: Verbose RS-232 Response Mode
  kind: action
  command: "SPCRSV"
  params: []

- id: list_commands
  label: List of RS-232 Commands
  kind: action
  command: "H"
  params: []

- id: amx_status
  label: AMX Status
  kind: query
  command: "AMX"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: response string formats for status queries (numeric vs verbose) are not specified in source.
```

## Variables
```yaml
# UNRESOLVED: response format is switchable (numeric/verbose) but the exact string grammar is not documented.
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not documented in source.
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures documented in source.
```

## Notes
The provided source is the RS-232 protocol manual for the sibling KD-MSV8X8 (8x8 matrix). The KD-MSV16x8 (16x8) has no independent public RS-232 protocol PDF located; command set above is assumed to extend. Per the source, command lines are not case-sensitive and embedded spaces are cosmetic only. Baud rate 57600, 8-N-1, no flow control. Per the source for items 7 (all outputs mute) and 11 (verbose response), the example lines shown ("SPCFBE" / "SPCFBD") appear to be typos in the vendor document; the inferred-correct commands "SPCCME" / "SPCCMD" and "SPCRSV" are used above as those match the documented mnemonic pattern.
<!-- UNRESOLVED: source document is for KD-MSV8X8; command applicability to the KD-MSV16x8 is assumed but not independently verified. Response string grammar (numeric vs verbose) not documented. -->

## Provenance

```yaml
source_domains:
  - keydigital.com
  - manualslib.com
source_urls:
  - "http://keydigital.com/Control%20Mods%20Codes/KD-MSV8X8/RS-232/KD-MSV8X8_232_Commands.pdf"
  - https://www.manualslib.com/manual/602639/Key-Digital-Kd-Msv8x8-Fatboy.html
retrieved_at: 2026-07-24T18:43:19.145Z
last_checked_at: 2026-08-05T08:25:29.773Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:25:29.773Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions map cleanly to documented commands; transport parameters match the source verbatim; source has no extra commands. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is for the sibling KD-MSV8X8; protocol conformance to the 16x8 is inferred, not confirmed. No independent KD-MSV16x8 control PDF was located."
- "response string formats for status queries (numeric vs verbose) are not specified in source."
- "response format is switchable (numeric/verbose) but the exact string grammar is not documented."
- "unsolicited notifications not documented in source."
- "multi-step sequences not documented in source."
- "no safety warnings or interlock procedures documented in source."
- "source document is for KD-MSV8X8; command applicability to the KD-MSV16x8 is assumed but not independently verified. Response string grammar (numeric vs verbose) not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
