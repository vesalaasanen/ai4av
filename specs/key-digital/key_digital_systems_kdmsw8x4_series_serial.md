---
spec_id: admin/key-digital-systems-kdmsw8x4-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MSW8x4 Control Spec"
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
  - manualslib.com
source_urls:
  - "https://www.keydigital.com/Control%20Mods%20Codes/KDMSW8x4_RS232_Commands.pdf"
  - "https://www.manualslib.com/manual/359867/Key-Digital-Kd-Msw8x4.html?page=12"
  - "https://www.manualslib.com/manual/359868/Key-Digital-Kd-Msw8x4pro.html?page=13"
retrieved_at: 2026-05-22T11:39:23.903Z
last_checked_at: 2026-05-26T20:03:35.068Z
generated_at: 2026-05-26T20:03:35.068Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no power on/off commands in source"
  - "flow control not stated in source"
  - "no discrete settable parameters beyond discrete actions"
  - "no unsolicited event notifications documented"
  - "no multi-step sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "flow control (hardware) not stated in source"
  - "termination details not stated in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-26T20:03:35.068Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions matched to source commands with correct shapes and transport parameters fully supported in source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Key Digital Systems KD-MSW8x4 Control Spec

## Summary
Key Digital Systems KD-MSW8x4 HDTV Matrix Switcher with 4 outputs and 8 inputs. Controlled via RS-232C serial interface at 4800 baud. Supports input/output routing, video mute, fade-to-black timing, and addressable unit selection.

<!-- UNRESOLVED: no power on/off commands in source -->

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
- routable    # inferred: CCxy I/O switching command present
- queryable   # inferred: CCww status query command present
- levelable   # inferred: video mute and fade-to-black commands present
```

## Actions
```yaml
- id: io_switch
  label: I/O Switching
  kind: action
  params:
    - name: output
      type: integer
      description: Output position (1-4)
    - name: input
      type: integer
      description: Input position (1-8)

- id: set_address
  label: Set Unit Address
  kind: action
  params:
    - name: address
      type: integer
      description: Unit address (1-16, 16 = non-addressable default)

- id: video_mute_enable
  label: Enable Video Mute
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (1-5)

- id: video_mute_disable
  label: Disable Video Mute
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (1-5)

- id: fade_to_black_set
  label: Set Fade-to-Black Interval
  kind: action
  params:
    - name: interval
      type: integer
      description: Interval code (0-9, see interval mapping in Notes)

- id: output_mode_rgbhv
  label: Set RGBHV Output Mode
  kind: action

- id: output_mode_component
  label: Set Component Output Mode
  kind: action

- id: factory_default
  label: Reset to Factory Default
  kind: action

- id: ir_disable
  label: Disable IR Remote Control
  kind: action

- id: ir_enable
  label: Enable IR Remote Control
  kind: action

- id: panel_disable
  label: Disable Front Panel Pushbuttons
  kind: action

- id: panel_enable
  label: Enable Front Panel Pushbuttons
  kind: action
```

## Feedbacks
```yaml
- id: routing_status
  label: Routing Status
  type: string
  description: Returns UUy1y2y3y4n where y1-y4 are input selections (1-8) and n is unit number (1-15)

- id: unit_status
  label: Unit Status
  type: string
  description: Returns Y1y2y3y4 - input states (1-8) and N - unit number (1-15)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
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
Fade-to-black interval mapping (interval code → actual mute duration):
- 0: No mute (CCI0)
- 1: 28 ms
- 2: 40 ms
- 3: 80 ms
- 4: 120 ms
- 5: 160 ms
- 6: 240 ms
- 7: 320 ms
- 8: 400 ms
- 9: 600 ms

Total muted period = twice the interval. Output mode must be set correctly for mute function to work. Unit number (address) range: 1-15 settable, 16 = non-addressable default.

<!-- UNRESOLVED: flow control (hardware) not stated in source -->
<!-- UNRESOLVED: termination details not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - keydigital.com
  - manualslib.com
source_urls:
  - "https://www.keydigital.com/Control%20Mods%20Codes/KDMSW8x4_RS232_Commands.pdf"
  - "https://www.manualslib.com/manual/359867/Key-Digital-Kd-Msw8x4.html?page=12"
  - "https://www.manualslib.com/manual/359868/Key-Digital-Kd-Msw8x4pro.html?page=13"
retrieved_at: 2026-05-22T11:39:23.903Z
last_checked_at: 2026-05-26T20:03:35.068Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T20:03:35.068Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions matched to source commands with correct shapes and transport parameters fully supported in source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no power on/off commands in source"
- "flow control not stated in source"
- "no discrete settable parameters beyond discrete actions"
- "no unsolicited event notifications documented"
- "no multi-step sequences documented"
- "no safety warnings or interlock procedures in source"
- "flow control (hardware) not stated in source"
- "termination details not stated in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
