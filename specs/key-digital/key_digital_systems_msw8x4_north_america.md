---
spec_id: admin/key-digital-systems-msw8x4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems MSW8x4 Control Spec"
manufacturer: "Key Digital"
model_family: KD-MSW8x4
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-MSW8x4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
source_urls:
  - "http://keydigital.com/Control%20Mods%20Codes/KDMSW8x4_RS232_Commands.pdf"
  - "https://keydigital.com/Control%20Mods%20Codes/KDMSW8x4_RS232_Commands.pdf"
retrieved_at: 2026-07-21T23:35:58.397Z
last_checked_at: 2026-07-22T00:08:29.917Z
generated_at: 2026-07-22T00:08:29.917Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no IP/Ethernet control documented; only RS-232"
  - "source mentions IR 0->5->1->3 example for address linking but does not document explicit safety interlocks."
  - "source does not document termination enable/disable command byte (mentioned only as part of factory reset state). No IP/Ethernet control documented. Firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:08:29.917Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions matched verbatim in source with correct shapes and transport parameters verified. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Key Digital Systems MSW8x4 Control Spec

## Summary
KD-MSW8x4 (Fat Boy Series) is an 8x4 HDTV matrix switcher controllable via RS-232. Spec covers serial protocol parameters and full command set: I/O routing, status query, unit addressing, video mute, fade-to-black interval, output mode, factory reset, IR enable/disable, and front-panel lock.

<!-- UNRESOLVED: no IP/Ethernet control documented; only RS-232 -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from I/O switching command CCxy
- queryable  # inferred from status command CCww
```

## Actions
```yaml
- id: switch_io
  label: I/O Switching
  kind: action
  command: "CC{x}{y}"
  params:
    - name: x
      type: integer
      description: Output position (1-4)
    - name: y
      type: integer
      description: Input position (1-8)

- id: status_query
  label: Status Query
  kind: query
  command: "CCww"
  params: []

- id: set_address
  label: Set Unit Address
  kind: action
  command: "CCA{nn}"
  params:
    - name: nn
      type: integer
      description: Address 01-15 for addressable units; 16 selects default non-addressable unit

- id: mute_enable
  label: Enable Video Mute
  kind: action
  command: "CCm{n}"
  params:
    - name: n
      type: integer
      description: Output number (1-5); 5 mutes every output

- id: mute_disable
  label: Disable Video Mute
  kind: action
  command: "CCn{n}"
  params:
    - name: n
      type: integer
      description: Output number (1-5)

- id: set_fade_to_black_interval
  label: Set Fade-to-Black Interval
  kind: action
  command: "CCi{i}"
  params:
    - name: i
      type: integer
      description: Interval 0-9 (0=no mute, 1=28ms, 2=40ms, 3=80ms, 4=120ms, 5=160ms, 6=240ms, 7=320ms, 8=400ms, 9=600ms)

- id: output_mode_rgbhv
  label: Output Mode RGBHV
  kind: action
  command: "CCOR"
  params: []

- id: output_mode_component
  label: Output Mode Component
  kind: action
  command: "CCOC"
  params: []

- id: factory_default
  label: Factory Default Reset
  kind: action
  command: "CCF0"
  params: []

- id: disable_ir
  label: Disable IR Remote Control
  kind: action
  command: "I"
  params: []

- id: enable_ir
  label: Enable IR Remote Control
  kind: action
  command: "u"
  params: []

- id: disable_front_panel
  label: Disable Front Panel Pushbuttons
  kind: action
  command: "d"
  params: []

- id: enable_front_panel
  label: Enable Front Panel Pushbuttons
  kind: action
  command: "e"
  params: []
```

## Feedbacks
```yaml
- id: status_response
  type: string
  description: Response to CCww status or CCxy switch command; format UUy1y2y3y4n where y1..y4 are current input (1-8) for each of 4 outputs and n is unit number (1-15)
```

## Variables
```yaml
# No discrete settable variables beyond those enumerated as Actions.
```

## Events
```yaml
# No unsolicited events documented.
```

## Macros
```yaml
# No multi-step sequences documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions IR 0->5->1->3 example for address linking but does not document explicit safety interlocks.
```

## Notes
All commands are fixed-length ASCII; no terminator required per source. Factory reset (CCF0) sets all outputs to input 1, termination enabled, unit address 16, mute interval 240ms. Output mode (CCOR/CCOC) must be set correctly or mute function and video output will not work.

<!-- UNRESOLVED: source does not document termination enable/disable command byte (mentioned only as part of factory reset state). No IP/Ethernet control documented. Firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - keydigital.com
source_urls:
  - "http://keydigital.com/Control%20Mods%20Codes/KDMSW8x4_RS232_Commands.pdf"
  - "https://keydigital.com/Control%20Mods%20Codes/KDMSW8x4_RS232_Commands.pdf"
retrieved_at: 2026-07-21T23:35:58.397Z
last_checked_at: 2026-07-22T00:08:29.917Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:08:29.917Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions matched verbatim in source with correct shapes and transport parameters verified. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no IP/Ethernet control documented; only RS-232"
- "source mentions IR 0->5->1->3 example for address linking but does not document explicit safety interlocks."
- "source does not document termination enable/disable command byte (mentioned only as part of factory reset state). No IP/Ethernet control documented. Firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
