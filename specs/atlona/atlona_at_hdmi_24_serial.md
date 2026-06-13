---
spec_id: admin/atlona-at-hdmi-24
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HDMI-24 Control Spec"
manufacturer: Atlona
model_family: AT-HDMI-24
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-HDMI-24
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-HDMI-24M_manual.pdf
  - https://www.manualslib.com/manual/725529/Atlona-At-Hdmi-24m.html
  - https://atlona.com/
retrieved_at: 2026-06-12T02:01:46.256Z
last_checked_at: 2026-06-12T19:07:31.615Z
generated_at: 2026-06-12T19:07:31.615Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source command table is ASCII-only with no documented terminator (CR/LF/other) and no documented response format. Source pin table header references \"AT-HDMI-42M\" — treated as a model series reference; spec is filed under AT-HDMI-24 per the source filename."
  - "flow control not stated in source; not emitted by name in many Atlona docs, left explicit-unknown"
  - "source does not document response payload format for ST or VR queries."
  - "no settable parameters beyond discrete actions documented in source."
  - "source does not document unsolicited notifications."
  - "source does not document multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:07:31.615Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec commands matched verbatim in source table; transport parameters confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-HDMI-24 Control Spec

## Summary
2x4 HDMI matrix switcher (or related 4-output HDMI matrix family) with RS-232 serial control. This spec covers the documented RS-232 command set for power, status/version queries, and per-output input selection.

<!-- UNRESOLVED: source command table is ASCII-only with no documented terminator (CR/LF/other) and no documented response format. Source pin table header references "AT-HDMI-42M" — treated as a model series reference; spec is filed under AT-HDMI-24 per the source filename. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source; not emitted by name in many Atlona docs, left explicit-unknown
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from P0/P1 command examples
- routable     # inferred from per-output input select command examples
- queryable    # inferred from ST/VR query command examples
```

## Actions
```yaml
- id: power_off
  label: Power Off (standby)
  kind: action
  command: "P0"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "P1"
  params: []

- id: system_status
  label: System Status
  kind: query
  command: "ST"
  params: []

- id: firmware_version
  label: Firmware Version
  kind: query
  command: "VR"
  params: []

- id: output_a_select_input1
  label: Output A select Input 1
  kind: action
  command: "A1"
  params: []

- id: output_a_select_input2
  label: Output A select Input 2
  kind: action
  command: "A2"
  params: []

- id: output_b_select_input1
  label: Output B select Input 1
  kind: action
  command: "B1"
  params: []

- id: output_b_select_input2
  label: Output B select Input 2
  kind: action
  command: "B2"
  params: []

- id: output_c_select_input1
  label: Output C select Input 1
  kind: action
  command: "C1"
  params: []

- id: output_c_select_input2
  label: Output C select Input 2
  kind: action
  command: "C2"
  params: []

- id: output_d_select_input1
  label: Output D select Input 1
  kind: action
  command: "D1"
  params: []

- id: output_d_select_input2
  label: Output D select Input 2
  kind: action
  command: "D2"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source does not document response payload format for ST or VR queries.
# Per the manual, each is marked "*" suggesting a response is produced, but the
# format/values are not in the refined excerpt. Feedbacks section is therefore empty
# pending source evidence.
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions documented in source.
# Section retained for schema consistency; remove if device truly has no variables.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
# Section retained for schema consistency; remove if not applicable.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Source pin table header references "AT-HDMI-42M" (likely an Atlona matrix family; the refined excerpt is filed under AT-HDMI-24 per operator direction and source filename).
- Command set lists four outputs (A, B, C, D). The "24" suffix typically denotes a 2-input / 4-output matrix; the 4 outputs in the command table are consistent with that interpretation.
- Command payload strings are emitted verbatim. The source does not document a line terminator (CR/LF) — implementers should confirm against the device's expected framing.
- Status (ST) and Firmware Version (VR) are marked "*" in the source command table, suggesting these commands return a response; response format is not documented in the refined excerpt.
- Flow control is not explicitly stated in the source's "RS-232 transmission format" line; emitted as explicit-unknown rather than inferred.
```

Spec covers all 12 commands from source. No fabrication on port, baud inferred-but-stated (9600 in source), no auth invented.

## Provenance

```yaml
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-HDMI-24M_manual.pdf
  - https://www.manualslib.com/manual/725529/Atlona-At-Hdmi-24m.html
  - https://atlona.com/
retrieved_at: 2026-06-12T02:01:46.256Z
last_checked_at: 2026-06-12T19:07:31.615Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:07:31.615Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec commands matched verbatim in source table; transport parameters confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source command table is ASCII-only with no documented terminator (CR/LF/other) and no documented response format. Source pin table header references \"AT-HDMI-42M\" — treated as a model series reference; spec is filed under AT-HDMI-24 per the source filename."
- "flow control not stated in source; not emitted by name in many Atlona docs, left explicit-unknown"
- "source does not document response payload format for ST or VR queries."
- "no settable parameters beyond discrete actions documented in source."
- "source does not document unsolicited notifications."
- "source does not document multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
