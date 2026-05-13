---
spec_id: admin/key-digital-systems-kd-msw8x4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MSW8x4 Control Spec"
manufacturer: "Key Digital Systems"
model_family: KD-MSW8x4
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital Systems"
  models:
    - KD-MSW8x4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
retrieved_at: 2026-04-30T13:01:42.709Z
last_checked_at: 2026-04-30T15:20:36.891Z
generated_at: 2026-04-30T15:20:36.891Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:20:36.891Z
  matched_actions: 13
  action_count: 13
  confidence: high
  summary: "All 13 spec actions matched literally; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Key Digital Systems KD-MSW8x4 Control Spec

## Summary
KD-MSW8x4 is an 8×4 HDTV matrix switcher controllable via RS-232. Supports I/O routing, video mute, fade-to-black intervals, output mode selection, and front-panel/IR lockout. Part of the Fat Boy series expandable via factory-configured RS-232 daisy-chain.

<!-- UNRESOLVED: no TCP/IP or other transport mentioned; RS-232 only -->
<!-- UNRESOLVED: response format partially documented — byte semantics unclear -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable   # I/O switching commands present
- queryable  # status command returns routing state
- levelable  # fade-to-black interval control present
```

## Actions
```yaml
- id: switch_io
  label: Switch Input to Output
  kind: action
  params:
    - name: output
      type: integer
      description: Output position (1-4)
    - name: input
      type: integer
      description: Input position (1-8)
  command: "CC{output}{input}"

- id: query_status
  label: Query Status
  kind: action
  params: []
  command: "CCww"

- id: set_address
  label: Set Unit Address
  kind: action
  params:
    - name: address
      type: integer
      description: Unit address (1-16). 16 selects default non-addressable unit.
  command: "CCA{address:02d}"

- id: mute_enable
  label: Enable Video Mute
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (1-5). Note: range extends beyond 4 outputs in source.
  command: "CCm{output}"

- id: mute_disable
  label: Disable Video Mute
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (1-5). Note: range extends beyond 4 outputs in source.
  command: "CCn{output}"

- id: set_fade_interval
  label: Set Fade-to-Black Interval
  kind: action
  params:
    - name: interval
      type: integer
      description: "Interval index 0-9. 0=no mute, 1=28ms, 2=40ms, 3=80ms, 4=120ms, 5=160ms, 6=240ms, 7=320ms, 8=400ms, 9=600ms. Actual muted period is 2× interval."
  command: "CCi{interval}"

- id: set_output_rgbhv
  label: Set Output Mode RGBHV
  kind: action
  params: []
  command: "CCOR"

- id: set_output_component
  label: Set Output Mode Component
  kind: action
  params: []
  command: "CCOC"

- id: factory_reset
  label: Factory Default Reset
  kind: action
  params: []
  command: "CCF0"

- id: disable_ir_remote
  label: Disable IR Remote Control
  kind: action
  params: []
  command: "I"

- id: enable_ir_remote
  label: Enable IR Remote Control
  kind: action
  params: []
  command: "u"

- id: disable_front_panel
  label: Disable Front Panel Pushbuttons
  kind: action
  params: []
  command: "d"

- id: enable_front_panel
  label: Enable Front Panel Pushbuttons
  kind: action
  params: []
  command: "e"
```

## Feedbacks
```yaml
- id: status_response
  type: string
  description: >-
    Response to CCww (status) and CCxy (switch). Returns routing state.
    Format: UUy1y2y3y4n where y1-y4 are input assignments for outputs 1-4 (1-8)
    and n is unit number (1-15). Also returns Y1y2y3y4 input states.
  # UNRESOLVED: exact byte-level response parsing not fully documented in source
```

## Variables
```yaml
# UNRESOLVED: no continuous variable parameters documented beyond fade interval (action-based)
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: factory_reset (CCF0) clears all routing, termination, address, and mute config.
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Commands are fixed-length; no terminator required.
- Mute enable/disable parameter range is 1–5 but device has only 4 outputs — source lists range 1–5 without explaining the 5th.
- Fade-to-black: actual muted period is twice the selected interval value.
- Output mode (RGBHV vs Component) must be set correctly or mute function fails and no picture is displayed.
- Up to 15 addressable units can be daisy-chained via RS-232; address 16 selects the default (non-addressable) unit.

<!-- UNRESOLVED: flow control setting not stated -->
<!-- UNRESOLVED: mute output parameter range 1–5 vs 4 physical outputs unexplained -->
<!-- UNRESOLVED: response format byte semantics only partially documented -->
<!-- UNRESOLVED: no power on/off command documented -->

## Provenance

```yaml
source_domains:
  - keydigital.com
retrieved_at: 2026-04-30T13:01:42.709Z
last_checked_at: 2026-04-30T15:20:36.891Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:20:36.891Z
matched_actions: 13
action_count: 13
confidence: high
summary: "All 13 spec actions matched literally; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
