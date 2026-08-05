---
spec_id: admin/atlona-at-hd-v44m-version2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HD-V44M Version2 Control Spec"
manufacturer: Atlona
model_family: "AT-HD-V44M Version2"
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - "AT-HD-V44M Version2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-HD-V44M_v2.pdf
  - https://www.manualslib.com/manual/786758/Atlona-At-Hd-V44m.html
  - https://atlona.com
retrieved_at: 2026-07-24T18:41:59.492Z
last_checked_at: 2026-08-05T07:18:31.217Z
generated_at: 2026-08-05T07:18:31.217Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "matrix dimensions (input/output count) not explicitly stated in source, though examples reference up to output 5 and x7 in feedback"
  - "firmware version not stated in source"
  - "command response timing / inter-command delay not stated in source"
  - "flow control not stated in source"
  - "no settable scalar parameters distinct from discrete actions documented in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings, interlock procedures, or power sequencing requirements stated in source"
  - "matrix dimensions, firmware compatibility, command response timing, flow control setting"
verification:
  verdict: verified
  checked_at: 2026-08-05T07:18:31.217Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 actions match the complete source command catalogue with supported shapes and transport values. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-04
---

# Atlona AT-HD-V44M Version2 Control Spec

## Summary
Atlona AT-HD-V44M Version2 HDMI matrix switcher controlled via RS-232. Spec covers power, input-to-output routing (single and multi-output), output muting, preset save/recall/clear, status queries, and factory reset. All commands are case-sensitive ASCII strings terminated with a carriage return.

<!-- UNRESOLVED: matrix dimensions (input/output count) not explicitly stated in source, though examples reference up to output 5 and x7 in feedback -->
<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: command response timing / inter-command delay not stated in source -->

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
  connector: DB9-female
auth:
  type: none  # inferred: no auth procedure in source
framing:
  terminator: "\r"  # carriage return per source
  error_response: "Command FAILED"
```

## Traits
```yaml
- powerable    # inferred from PWON/PWOFF commands
- routable     # inferred from x1AVx2 routing commands
- queryable    # inferred from Status / Statusx1 query commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWOFF"
  params: []

- id: reset_all_routing
  label: Reset All Inputs to Corresponding Outputs
  kind: action
  command: "All#"
  params: []
  notes: "Routes input N to output N (e.g. in3 to out3)."

- id: output_off
  label: Turn Off Output Channel
  kind: action
  command: "x{output}$"
  params:
    - name: output
      type: integer
      description: Output channel number to turn off (example in source: x3$ turns off output 3)

- id: route_input_to_output
  label: Switch Input to Single Output
  kind: action
  command: "x{input}AVx{output}"
  params:
    - name: input
      type: integer
      description: Source input number
    - name: output
      type: integer
      description: Destination output number
  notes: "Source example: x3AVx5 routes input 3 to output 5."

- id: route_input_to_multiple_outputs
  label: Switch Input to Multiple Outputs
  kind: action
  command: "x{input}AVx{output1},x{output2},x{output3}"
  params:
    - name: input
      type: integer
      description: Source input number
    - name: outputs
      type: list
      description: Comma-separated list of destination output numbers
  notes: "Source example: x3AVx1,x2 routes input 3 to outputs 1 and 2. Number of outputs in list is not bounded in source."

- id: query_output_routing
  label: Query Routing for Single Output
  kind: query
  command: "Statusx{output}"
  params:
    - name: output
      type: integer
      description: Output number to query
  notes: "Returns the input currently routed to the specified output (e.g. x7AVx1)."

- id: query_full_routing
  label: Query Full Routing Status
  kind: query
  command: "Status"
  params: []
  notes: "Returns a list of all input-to-output assignments (e.g. x1AVx1, x2AVx2, x3AVx4, ...)."

- id: save_preset
  label: Save Preset
  kind: action
  command: "Save{slot}"
  params:
    - name: slot
      type: integer
      description: Preset slot number, 0 to 9 per source

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "Recall{slot}"
  params:
    - name: slot
      type: integer
      description: Preset slot number, 0 to 9 per source

- id: clear_preset
  label: Clear Preset
  kind: action
  command: "Clear{slot}"
  params:
    - name: slot
      type: integer
      description: Preset slot number, 0 to 9 per source

- id: matrix_reset
  label: Factory Reset Matrix to Defaults
  kind: action
  command: "Mreset"
  params: []
```

## Feedbacks
```yaml
- id: power_on_ack
  type: string
  match: "PWON"
  description: Echo confirming power on

- id: power_off_ack
  type: string
  match: "PWOFF"
  description: Echo confirming power off

- id: reset_all_ack
  type: string
  match: "All#"
  description: Echo confirming reset-all-routing

- id: output_off_ack
  type: string
  pattern: "x{output}$"
  description: Echo confirming output channel turned off

- id: route_single_ack
  type: string
  pattern: "x{input}AVx{output}"
  description: Echo confirming single-output route

- id: route_multi_ack
  type: string
  pattern: "x{input}AVx{output1},x{output2},x{output3}"
  description: Echo confirming multi-output route

- id: output_routing_response
  type: string
  pattern: "x{input}AVx{output}"
  description: Response to Statusx{output} query (source example: x7AVx1)

- id: full_routing_response
  type: string
  pattern: "x1AVx1, x2AVx2, x3AVx4, ..."
  description: Response to Status query listing all input-to-output assignments

- id: save_ack
  type: string
  pattern: "Save{slot}"
  description: Echo confirming preset saved (source example: Save2)

- id: recall_ack
  type: string
  pattern: "Recall{slot}"
  description: Echo confirming preset recalled (source example: Recall2)

- id: clear_ack
  type: string
  pattern: "Clear{slot}"
  description: Echo confirming preset cleared (source example: Clear2)

- id: matrix_reset_ack
  type: string
  match: "Mreset"
  description: Echo confirming matrix factory reset

- id: command_failed
  type: string
  match: "Command FAILED"
  description: Returned when a command fails or is incorrect
```

## Variables
```yaml
# UNRESOLVED: no settable scalar parameters distinct from discrete actions documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power sequencing requirements stated in source
```

## Notes
- Command codes are case-sensitive; capitalization, spacing, and lettering must be preserved exactly as documented.
- Every command and every feedback is terminated with a carriage return (`\r`).
- On failure or syntax error the device returns the literal string `Command FAILED`.
- DB9 female connector pinout per source: pin 2 Tx, pin 3 Rx, pin 5 Gnd; pins 1, 4, 6, 7, 8, 9 unused.
- Preset slot range is `0` through `9` per source for Save / Recall / Clear.
- Source examples show routing addressing up to output `5` and a query feedback referencing input `x7`, but the source does not explicitly state the matrix's total input/output count.
<!-- UNRESOLVED: matrix dimensions, firmware compatibility, command response timing, flow control setting -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-HD-V44M_v2.pdf
  - https://www.manualslib.com/manual/786758/Atlona-At-Hd-V44m.html
  - https://atlona.com
retrieved_at: 2026-07-24T18:41:59.492Z
last_checked_at: 2026-08-05T07:18:31.217Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T07:18:31.217Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 actions match the complete source command catalogue with supported shapes and transport values. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "matrix dimensions (input/output count) not explicitly stated in source, though examples reference up to output 5 and x7 in feedback"
- "firmware version not stated in source"
- "command response timing / inter-command delay not stated in source"
- "flow control not stated in source"
- "no settable scalar parameters distinct from discrete actions documented in source"
- "no unsolicited notifications documented in source"
- "no multi-step macro sequences documented in source"
- "no safety warnings, interlock procedures, or power sequencing requirements stated in source"
- "matrix dimensions, firmware compatibility, command response timing, flow control setting"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
