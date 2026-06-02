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
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1580%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - https://www.rotel.com/product/rc-1580
  - "https://www.rotel.com/sites/default/files/product/ir/RC1580%20HEX.pdf"
retrieved_at: 2026-05-22T14:16:14.822Z
last_checked_at: 2026-06-01T19:56:18.010Z
generated_at: 2026-06-01T19:56:18.010Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no firmware version stated in source; no query commands documented (status returned only via unsolicited feedback); volume is rotary with no numerical feedback"
  - "no multi-step sequences documented in source"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility not stated in source; no documented query commands (status available only via unsolicited feedback); no documented macros or safety interlocks"
verification:
  verdict: verified
  checked_at: 2026-06-01T19:56:18.010Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec commands match source table verbatim with correct transport parameters and 100% coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Rotel RC-1580 Control Spec

## Summary
Stereo preamplifier controlled over RS-232C using a HEX command protocol at 19200 baud. Source covers power, volume, mute, source selection, record source selection, and theater bypass commands, plus the unsolicited feedback string format.

<!-- UNRESOLVED: no firmware version stated in source; no query commands documented (status returned only via unsolicited feedback); volume is rotary with no numerical feedback -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from power toggle/on/off commands
- routable    # inferred from source + record source select commands
- levelable   # inferred from volume up/down and mute commands
```

## Actions
```yaml
# All command payloads below are literal HEX bytes from the source, verbatim.
# Command frame: FE 03 08 10 {KEY} {CHECKSUM}
# Meta Encoding: any FE/FD in payload byte stream must be escaped (FD→FD 00, FE→FD 01).

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "FE 03 08 10 00 0B"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "FE 03 08 10 01 1C"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "FE 03 08 10 02 1D"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "FE 03 08 10 13 2E"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "FE 03 08 10 14 2F"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "FE 03 08 10 15 30"
  params: []

- id: source_phono
  label: Source Phono
  kind: action
  command: "FE 03 08 10 03 1E"
  params: []

- id: source_cd
  label: Source CD
  kind: action
  command: "FE 03 08 10 04 1F"
  params: []

- id: source_tuner
  label: Source Tuner
  kind: action
  command: "FE 03 08 10 05 20"
  params: []

- id: source_aux1
  label: Source Aux 1
  kind: action
  command: "FE 03 08 10 06 21"
  params: []

- id: source_aux2
  label: Source Aux 2
  kind: action
  command: "FE 03 08 10 07 22"
  params: []

- id: source_aux3
  label: Source Aux 3
  kind: action
  command: "FE 03 08 10 08 23"
  params: []

- id: source_tape1
  label: Source Tape 1
  kind: action
  command: "FE 03 08 10 09 24"
  params: []

- id: source_tape2
  label: Source Tape 2
  kind: action
  command: "FE 03 08 10 0A 25"
  params: []

- id: record_source_phono
  label: Record Source Phono
  kind: action
  command: "FE 03 08 10 0B 26"
  params: []

- id: record_source_cd
  label: Record Source CD
  kind: action
  command: "FE 03 08 10 0C 27"
  params: []

- id: record_source_tuner
  label: Record Source Tuner
  kind: action
  command: "FE 03 08 10 0D 28"
  params: []

- id: record_source_aux1
  label: Record Source Aux 1
  kind: action
  command: "FE 03 08 10 0E 29"
  params: []

- id: record_source_aux2
  label: Record Source Aux 2
  kind: action
  command: "FE 03 08 10 0F 2A"
  params: []

- id: record_source_aux3
  label: Record Source Aux 3
  kind: action
  command: "FE 03 08 10 10 2B"
  params: []

- id: record_source_tape1
  label: Record Source Tape 1
  kind: action
  command: "FE 03 08 10 11 2C"
  params: []

- id: record_source_off
  label: Record Source Off
  kind: action
  command: "FE 03 08 10 12 2D"
  params: []

- id: record_function_select
  label: Record Function Select
  kind: action
  command: "FE 03 08 10 1A 35"
  params: []

- id: theater_bypass_toggle
  label: Theater Bypass Toggle
  kind: action
  command: "FE 03 08 10 1B 36"
  params: []

- id: theater_bypass_on
  label: Theater Bypass On
  kind: action
  command: "FE 03 08 10 1C 37"
  params: []

- id: theater_bypass_off
  label: Theater Bypass Off
  kind: action
  command: "FE 03 08 10 1D 38"
  params: []
```

## Feedbacks
```yaml
# Parsed from unsolicited 42-byte ASCII response string.
# Volume not available - unit uses a rotary knob, no numerical level.
- id: current_source
  type: enum
  values: [phono, cd, tuner, aux1, aux2, aux3, tape1, tape2]

- id: current_record_source
  type: enum
  values: [phono, cd, tuner, aux1, aux2, aux3, tape1, off]
```

## Events
```yaml
- id: front_panel_change
  description: |
    Unit sends unsolicited feedback string on any change to the front-panel display.
    Frame: FE 2C 08 20 {42 ASCII bytes} {checksum}.
    ASCII payload contains source name and record source name; parse to derive unit status.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing
```

## Notes
- Command frame: `FE 03 08 10 {KEY} {CHECKSUM}`. Count byte (0x03) covers ID+Type+Key only, not Start or Checksum.
- Do not append CR/LF to commands.
- Meta Encoding: any byte `FD` or `FE` appearing inside the byte stream must be escaped as `FD 00` (was `FD`) or `FD 01` (was `FE`), except the leading Start byte. Commands using meta encoding would be marked red in the source.
- Response frame: `FE 2C 08 20 {42 ASCII bytes} {CHECKSUM}` — sent unsolicited on every front-panel state change, not in reply to a query. No query command set documented.
- Volume is rotary; no numerical level queryable via serial.

<!-- UNRESOLVED: firmware version compatibility not stated in source; no documented query commands (status available only via unsolicited feedback); no documented macros or safety interlocks -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1580%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - https://www.rotel.com/product/rc-1580
  - "https://www.rotel.com/sites/default/files/product/ir/RC1580%20HEX.pdf"
retrieved_at: 2026-05-22T14:16:14.822Z
last_checked_at: 2026-06-01T19:56:18.010Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T19:56:18.010Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec commands match source table verbatim with correct transport parameters and 100% coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no firmware version stated in source; no query commands documented (status returned only via unsolicited feedback); volume is rotary with no numerical feedback"
- "no multi-step sequences documented in source"
- "source contains no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility not stated in source; no documented query commands (status available only via unsolicited feedback); no documented macros or safety interlocks"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
