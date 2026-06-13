---
spec_id: admin/atlona-at-prohd82m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-PROHD82M Control Spec"
manufacturer: Atlona
model_family: AT-PROHD82M
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-PROHD82M
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PROHD82M_manual2.pdf
  - https://www.manualslib.com/manual/788217/Atlona-At-Prohd82m.html
retrieved_at: 2026-06-12T02:01:50.815Z
last_checked_at: 2026-06-12T19:09:50.036Z
generated_at: 2026-06-12T19:09:50.036Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-485 command syntax and any RS-485-specific commands not documented in source."
  - "feedback/response messages not documented in source."
  - "flow control not stated in source"
  - "power on/off commands not present in supplied source excerpt. Trait may not apply."
  - "source states \"unit does not send out a message when a value is changed"
  - "no settable parameters distinct from the discrete Actions above are"
  - "no unsolicited notifications documented in source."
  - "no multi-step sequences documented in source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "RS-485 command syntax not documented in source excerpt."
  - "flow control, status query commands, and firmware version not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:09:50.036Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched verbatim against source commands; transport fully verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-PROHD82M Control Spec

## Summary
The Atlona AT-PROHD82M is an HDMI matrix switcher controllable via RS-232 (and RS-485) serial interface. This spec covers the documented serial command set for routing, volume, and preset management.

<!-- UNRESOLVED: RS-485 command syntax and any RS-485-specific commands not documented in source. -->
<!-- UNRESOLVED: feedback/response messages not documented in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from input/output routing command examples
- levelable  # inferred from volume adjustment commands
- powerable  # inferred: device is switcher with power; no explicit power cmd in source excerpt
```

<!-- UNRESOLVED: power on/off commands not present in supplied source excerpt. Trait may not apply. -->

## Actions
```yaml
- id: all_route
  label: Route All Inputs to Matching Outputs
  kind: action
  command: "All#"
  params: []

- id: route_av_single
  label: Route AV (Input to Single Output)
  kind: action
  command: "x{x1}AVx{x2}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: route_av_multi
  label: Route AV (Input to Multiple Outputs)
  kind: action
  command: "x{x1}AVx{x2},x{x3},x{x4}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: First output channel number
    - name: x3
      type: integer
      description: Second output channel number
    - name: x4
      type: integer
      description: Third output channel number

- id: route_audio_single
  label: Route Audio (Input to Single Output)
  kind: action
  command: "x{x1}Ax{x2}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: save_preset
  label: Save Preset
  kind: action
  command: "Save{Y}"
  params:
    - name: Y
      type: integer
      description: Preset number (0-9)

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "Recall{Y}"
  params:
    - name: Y
      type: integer
      description: Preset number (0-9)

- id: vol100
  label: Volume Output 1 Level 00
  kind: action
  command: "Vol100"
  params: []
- id: vol101
  label: Volume Output 1 Level 01
  kind: action
  command: "Vol101"
  params: []
- id: vol102
  label: Volume Output 1 Level 02
  kind: action
  command: "Vol102"
  params: []
- id: vol103
  label: Volume Output 1 Level 03
  kind: action
  command: "Vol103"
  params: []
- id: vol104
  label: Volume Output 1 Level 04
  kind: action
  command: "Vol104"
  params: []
- id: vol105
  label: Volume Output 1 Level 05
  kind: action
  command: "Vol105"
  params: []
- id: vol106
  label: Volume Output 1 Level 06
  kind: action
  command: "Vol106"
  params: []
- id: vol107
  label: Volume Output 1 Level 07
  kind: action
  command: "Vol107"
  params: []
- id: vol108
  label: Volume Output 1 Level 08
  kind: action
  command: "Vol108"
  params: []
- id: vol109
  label: Volume Output 1 Level 09
  kind: action
  command: "Vol109"
  params: []
- id: vol110
  label: Volume Output 1 Level 10
  kind: action
  command: "Vol110"
  params: []
- id: vol200
  label: Volume Output 2 Level 00
  kind: action
  command: "Vol200"
  params: []
- id: vol201
  label: Volume Output 2 Level 01
  kind: action
  command: "Vol201"
  params: []
- id: vol202
  label: Volume Output 2 Level 02
  kind: action
  command: "Vol202"
  params: []
- id: vol203
  label: Volume Output 2 Level 03
  kind: action
  command: "Vol203"
  params: []
- id: vol204
  label: Volume Output 2 Level 04
  kind: action
  command: "Vol204"
  params: []
- id: vol205
  label: Volume Output 2 Level 05
  kind: action
  command: "Vol205"
  params: []
- id: vol206
  label: Volume Output 2 Level 06
  kind: action
  command: "Vol206"
  params: []
- id: vol207
  label: Volume Output 2 Level 07
  kind: action
  command: "Vol207"
  params: []
- id: vol208
  label: Volume Output 2 Level 08
  kind: action
  command: "Vol208"
  params: []
- id: vol209
  label: Volume Output 2 Level 09
  kind: action
  command: "Vol209"
  params: []
- id: vol210
  label: Volume Output 2 Level 10
  kind: action
  command: "Vol210"
  params: []
- id: clear_preset
  label: Clear Preset
  kind: action
  command: "Clear{Y}"
  params:
    - name: Y
      type: integer
      description: Preset number (0-9)
```

## Feedbacks
```yaml
# UNRESOLVED: source states "unit does not send out a message when a value is changed
# from the front panel or by IR control" and does not document any response strings.
# No feedback payloads documented in source.
```

## Variables
```yaml
# UNRESOLVED: no settable parameters distinct from the discrete Actions above are
# documented in source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements documented in source.
```

## Notes
- Source states: "When the unit recognizes a complete command it will perform the requested action. There is no delimiter character required."
- Source states: "The unit does not send out a message when a value is changed from the front panel or by IR control" — host should poll if state sync required.
- Volume commands are listed as discrete per-level entries (Vol100–Vol110 for output 1, Vol200–Vol210 for output 2); enumerated as separate actions to preserve source-row fidelity.
- Pinout documented for both RS-232 (Tx/Rx/GND on pins 2/3/5) and RS-485 (A/B/GND on pins 2/3/5).

<!-- UNRESOLVED: RS-485 command syntax not documented in source excerpt. -->
<!-- UNRESOLVED: flow control, status query commands, and firmware version not stated in source. -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PROHD82M_manual2.pdf
  - https://www.manualslib.com/manual/788217/Atlona-At-Prohd82m.html
retrieved_at: 2026-06-12T02:01:50.815Z
last_checked_at: 2026-06-12T19:09:50.036Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:09:50.036Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched verbatim against source commands; transport fully verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-485 command syntax and any RS-485-specific commands not documented in source."
- "feedback/response messages not documented in source."
- "flow control not stated in source"
- "power on/off commands not present in supplied source excerpt. Trait may not apply."
- "source states \"unit does not send out a message when a value is changed"
- "no settable parameters distinct from the discrete Actions above are"
- "no unsolicited notifications documented in source."
- "no multi-step sequences documented in source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "RS-485 command syntax not documented in source excerpt."
- "flow control, status query commands, and firmware version not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
