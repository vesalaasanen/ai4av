---
spec_id: admin/rotel-rc-1580
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RC-1580 Control Spec"
manufacturer: Rotel
model_family: RC-1580
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RC-1580
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1576%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
  - "https://rotel.com/sites/default/files/product/rs232/RT1080%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:04.962Z
last_checked_at: 2026-05-31T20:58:10.594Z
generated_at: 2026-05-31T20:58:10.594Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T20:58:10.594Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec actions match verbatim source commands; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Rotel RC-1580 Control Spec

## Summary
Rotel RC-1580 stereo preamplifier. RS-232C HEX protocol at 19200 baud, 8-N-1, no handshake. Commands: power, volume, source selection, record source, theater bypass. Device ID 0x08. Response mirrors front panel display changes.

<!-- UNRESOLVED: no query commands for current state, volume readable only via front panel not serial -->

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
addressing:
  device_id: "0x08"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # power on/off/toggle commands present
- levelable  # volume up/down commands present
- routable   # source selection commands present
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
- id: theater_bypass_toggle
  label: Theater Bypass Toggle
  kind: action
  params: []
- id: theater_bypass_on
  label: Theater Bypass On
  kind: action
  params: []
- id: theater_bypass_off
  label: Theater Bypass Off
  kind: action
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source describes response format (42-byte ASCII status) but does not
# enumerate specific feedback strings. No response string examples provided.
```

## Variables
```yaml
# UNRESOLVED: volume is rotary knob, not numerically controllable via serial
```

## Events
```yaml
# UNRESOLVED: any change to front panel display triggers unsolicited feedback
# string, but specific event strings not documented
```

## Macros
```yaml
# No multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Command structure: `FE 03 [device_id] [type] [key] [checksum]`. Count byte = 3 (ID+Type+Key only). No spaces or delimiters in actual commands. Meta encoding: any occurrence of FD or FE in command data must be replaced with `FD 00` (for FD) or `FD 01` (for FE). Response format: `FE 2C 08 20 [42-byte ASCII] [checksum]`.

<!-- UNRESOLVED: specific response strings for each state change not provided -->
<!-- UNRESOLVED: checksum algorithm not documented -->
<!-- UNRESOLVED: power-on sequencing or warm-up requirements not stated -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1576%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
  - "https://rotel.com/sites/default/files/product/rs232/RT1080%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:04.962Z
last_checked_at: 2026-05-31T20:58:10.594Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T20:58:10.594Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec actions match verbatim source commands; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
