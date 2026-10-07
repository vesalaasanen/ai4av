---
spec_id: admin/rotel-rc-1082
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RC-1082 Control Spec"
manufacturer: Rotel
model_family: RC-1082
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RC-1082
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1082%20Protocol.pdf"
retrieved_at: 2026-05-21T20:47:27.038Z
last_checked_at: 2026-10-07T12:52:51.561Z
generated_at: 2026-10-07T12:52:51.561Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "volume level not queryable — rotary knob, no numerical value"
  - "full response state enumeration not explicitly documented"
  - "volume level not queryable - rotary knob, no numerical value in feedback"
  - "device sends unsolicited feedback on front panel state changes,"
  - "no safety warnings or interlock procedures in source"
  - "checksum algorithm not stated in source"
  - "feedback event subscription mechanism not described in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:52:51.561Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions map one-to-one to the 23 source control commands; the serial transport values match and the feedback format is represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Rotel RC-1082 Control Spec

## Summary
Rotel RC-1082 preamplifier. RS-232 HEX protocol. 19200 baud, 8N1. Supports power, volume, source selection, and record source routing. Feedback mirrors front panel state changes.

<!-- UNRESOLVED: volume level not queryable — rotary knob, no numerical value -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not specify authentication
```

## Traits
```yaml
- powerable  # inferred from power toggle/off/on commands
- levelable  # inferred from volume up/down/mute commands
- routable   # inferred from source selection commands
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []

- id: source_phono
  label: Source Phono
  kind: action
  params: []

- id: source_cd
  label: Source CD
  kind: action
  params: []

- id: source_tuner
  label: Source Tuner
  kind: action
  params: []

- id: source_aux1
  label: Source Aux 1
  kind: action
  params: []

- id: source_aux2
  label: Source Aux 2
  kind: action
  params: []

- id: source_aux3
  label: Source Aux 3
  kind: action
  params: []

- id: source_tape1
  label: Source Tape 1
  kind: action
  params: []

- id: source_tape2
  label: Source Tape 2
  kind: action
  params: []

- id: record_source_phono
  label: Record Source Phono
  kind: action
  params: []

- id: record_source_cd
  label: Record Source CD
  kind: action
  params: []

- id: record_source_tuner
  label: Record Source Tuner
  kind: action
  params: []

- id: record_source_aux1
  label: Record Source Aux 1
  kind: action
  params: []

- id: record_source_aux2
  label: Record Source Aux 2
  kind: action
  params: []

- id: record_source_aux3
  label: Record Source Aux 3
  kind: action
  params: []

- id: record_source_tape1
  label: Record Source Tape 1
  kind: action
  params: []

- id: record_source_off
  label: Record Source Off
  kind: action
  params: []

- id: record_function_select
  label: Record Function Select
  kind: action
  params: []
```

## Feedbacks
```yaml
# Standard response: FE 2C 06 20 <42 bytes ASCII> <checksum>
# Contains source and record source name as ASCII text.
# UNRESOLVED: full response state enumeration not explicitly documented
- id: unit_status
  label: Unit Status Feedback
  kind: feedback
  params:
    - name: source_name
      type: string
      description: Current source name (ASCII)
    - name: record_source_name
      type: string
      description: Current record source name (ASCII)
```

## Variables
```yaml
# UNRESOLVED: volume level not queryable - rotary knob, no numerical value in feedback
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited feedback on front panel state changes,
# but specific event format not detailed in source
```

## Macros
```yaml
# No explicit multi-step macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Meta encoding: any occurrence of bytes FD or FE in command data must be converted to FD 00 or FD 01 respectively to avoid confusion with start byte FE. Commands with Meta Encoding applied are highlighted in red in source.

Command format: 6 bytes — Start (0xFE), Count (0x03), Device ID (0x06), Type (0x10), Key (0xXX), Checksum (0xXX). No spaces, no delimiters, no CR/LF.

<!-- UNRESOLVED: checksum algorithm not stated in source -->
<!-- UNRESOLVED: feedback event subscription mechanism not described in source -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1082%20Protocol.pdf"
retrieved_at: 2026-05-21T20:47:27.038Z
last_checked_at: 2026-10-07T12:52:51.561Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:52:51.561Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions map one-to-one to the 23 source control commands; the serial transport values match and the feedback format is represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "volume level not queryable — rotary knob, no numerical value"
- "full response state enumeration not explicitly documented"
- "volume level not queryable - rotary knob, no numerical value in feedback"
- "device sends unsolicited feedback on front panel state changes,"
- "no safety warnings or interlock procedures in source"
- "checksum algorithm not stated in source"
- "feedback event subscription mechanism not described in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
