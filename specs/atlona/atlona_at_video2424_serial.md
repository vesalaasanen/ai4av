---
spec_id: admin/atlona-at-video2424
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-VIDEO2424 Control Spec"
manufacturer: Atlona
model_family: AT-VIDEO2424
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-VIDEO2424
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
retrieved_at: 2026-06-14T17:00:32.246Z
last_checked_at: 2026-06-14T19:37:56.061Z
generated_at: 2026-06-14T19:37:56.061Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command reference is a generic family-level RS-232 doc (AVswitcher_rs232.pdf), not an AT-VIDEO2424-specific manual. Application to this exact model is inferred from the family membership (AT-VIDEO2424 = composite video BNC matrix). No AT-VIDEO2424-specific protocol document was located."
  - "flow control not stated in source"
  - "exact response string format not stated in source"
  - "no settable continuous parameters (volume/gain/brightness) in source."
  - "source documents no unsolicited notifications. Section N/A."
  - "source documents no multi-step sequences beyond single commands. Section N/A."
  - "source contains no safety warnings, interlock procedures, or"
  - "flow_control not stated in source."
  - "exact response/acknowledgement string formats for queries not documented."
  - "terminator semantics (whether different terminators have different meanings) not fully explained in source."
  - "maximum number of comma-separated outputs per multi-output command not stated."
  - "AT-VIDEO2424-specific protocol confirmation not located — generic family doc used."
verification:
  verdict: verified
  checked_at: 2026-06-14T19:37:56.061Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 actions matched source literals with correct shapes and parameters; transport fully verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Atlona AT-VIDEO2424 Control Spec

## Summary
The Atlona AT-VIDEO2424 is a 24×24 composite video (BNC) matrix switcher controllable via RS-232C serial (9600/8/N/1). This spec covers video/audio routing, group management, memory presets, and system commands (keyboard lock, buzzer, password reset). The command reference used is Atlona's generic "AV switcher" RS-232 protocol document, which applies to the AT-VIDEO2424 at family level — it is not a model-specific manual.

<!-- UNRESOLVED: command reference is a generic family-level RS-232 doc (AVswitcher_rs232.pdf), not an AT-VIDEO2424-specific manual. Application to this exact model is inferred from the family membership (AT-VIDEO2424 = composite video BNC matrix). No AT-VIDEO2424-specific protocol document was located. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - routable    (input/output video/audio routing commands present)
# - queryable   (Status, group query, model/version query commands present)
```

## Actions
```yaml
# NOTE: Every command line MUST end with a terminator character.
# Valid terminators per source: . ; ! " $ &
# The terminator is shown in the command templates below where the source shows it.
# System commands (prefixed with /) do not show an explicit terminator in the source;
# append one per the rule above. Do not change capitalization, spacing, or lettering.

# --- System commands ---

- id: query_model_type
  label: Query Model Type
  kind: query
  command: "/*Type"
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+{code}"
  params:
    - name: code
      type: string
      description: 9-digit numeric code (must be 9 digits per source)

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  command: "/%Lock"
  params: []

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  command: "/%Unlock"
  params: []

- id: buzzer_off
  label: Buzzer Off
  kind: action
  command: "/:BellOff"
  params: []

- id: buzzer_on
  label: Buzzer On
  kind: action
  command: "/:BellOn"
  params: []

- id: query_software_version
  label: Query Software Version
  kind: query
  command: "/^Version"
  params: []

- id: route_input_to_all_outputs
  label: Route Input To All Outputs
  kind: action
  command: "[{input}]All."
  params:
    - name: input
      type: integer
      description: Input number

# --- Operation commands ---

- id: mirror_all_inputs
  label: Mirror All Inputs To Matching Outputs
  kind: action
  command: "All#."
  params: []

- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$"
  params: []

- id: mirror_single_input
  label: Mirror Input To Corresponding Output
  kind: action
  command: "{input}#."
  params:
    - name: input
      type: integer
      description: Input number (mirrored to same-numbered output)

- id: route_video_single
  label: Route Video To Single Output
  kind: action
  command: "{input}V{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_video_multi
  label: Route Video To Multiple Outputs
  kind: action
  command: "{input}V{outputs}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. "4,7,8")

- id: route_audio_single
  label: Route Audio To Single Output
  kind: action
  command: "{input}A{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_audio_multi
  label: Route Audio To Multiple Outputs
  kind: action
  command: "{input}A{outputs}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. "2,4,6")

- id: route_av_single
  label: Route Video And Audio To Single Output
  kind: action
  command: "{input}B{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_av_multi
  label: Route Video And Audio To Multiple Outputs
  kind: action
  command: "{input}B{outputs}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. "3,4,5")

- id: route_input_to_group
  label: Route Input To Output Group
  kind: action
  command: "{input}P{group}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: group
      type: integer
      description: Group number

- id: form_group
  label: Form Output Group
  kind: action
  command: "{group}PP{outputs}."
  params:
    - name: group
      type: integer
      description: Group number to assign
    - name: outputs
      type: string
      description: Comma-separated output numbers to include in the group (e.g. "4,5,6")

- id: query_group_members
  label: Query Group Members
  kind: query
  command: "S{group}."
  params:
    - name: group
      type: integer
      description: Group number

- id: query_input_routing
  label: Query Outputs Routed To Input
  kind: query
  command: "Status{input}."
  params:
    - name: input
      type: integer
      description: Input number

- id: query_all_routing
  label: Query All Input-Output Routing
  kind: query
  command: "Status."
  params: []

- id: save_preset
  label: Save Routes To Memory
  kind: action
  command: "Save{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number (0 to 9)

- id: recall_preset
  label: Recall Routes From Memory
  kind: action
  command: "Recall{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number (0 to 9)

- id: clear_preset
  label: Clear Memory Slot
  kind: action
  command: "Clear{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number (0 to 9)
```

## Feedbacks
```yaml
# Query responses documented in source (exact response formats not given):

- id: model_type_response
  type: string
  description: Response to /*Type - matrix model information
  # UNRESOLVED: exact response string format not stated in source

- id: software_version_response
  type: string
  description: Response to /^Version - software version
  # UNRESOLVED: exact response string format not stated in source

- id: group_members_response
  type: string
  description: Response to S{group} - list of outputs in the group
  # UNRESOLVED: exact response string format not stated in source

- id: input_routing_response
  type: string
  description: Response to Status{input} - outputs connected to the input
  # UNRESOLVED: exact response string format not stated in source

- id: all_routing_response
  type: string
  description: Response to Status - full input-to-output routing map
  # UNRESOLVED: exact response string format not stated in source
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters (volume/gain/brightness) in source.
# All controls are discrete routing/preset actions. Section N/A.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. Section N/A.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences beyond single commands. Section N/A.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- **Source scope:** This spec is derived from Atlona's generic "AV switcher" RS-232 command reference (`AVswitcher_rs232.pdf`), not an AT-VIDEO2424-specific manual. The AT-VIDEO2424 (24×24 composite video BNC matrix) belongs to this family, but model-specific deviations are possible.
- **Command sensitivity:** Per source, command codes are "very sensitive" — do not change capitalization, spacing, or lettering.
- **Line terminators required:** Every command line must end with one of `. ; ! " $ &` or the command will fail. The terminator may carry semantic meaning (e.g. `All$` uses `$` to switch off), but the source does not fully explain terminator semantics. Templates above include the terminator as shown in the source command table.
- **Parameter variables:** `X` = input number, `W`/`Y`/`Z` = output numbers, `G` = group number, `N` = memory number (0–9).
- **Pin assignment:** RS-232 via 9-pin female D-sub — Pin 2 = Tx, Pin 3 = Rx, Pin 5 = GND. All other pins unused.
<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: exact response/acknowledgement string formats for queries not documented. -->
<!-- UNRESOLVED: terminator semantics (whether different terminators have different meanings) not fully explained in source. -->
<!-- UNRESOLVED: maximum number of comma-separated outputs per multi-output command not stated. -->
<!-- UNRESOLVED: AT-VIDEO2424-specific protocol confirmation not located — generic family doc used. -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
retrieved_at: 2026-06-14T17:00:32.246Z
last_checked_at: 2026-06-14T19:37:56.061Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T19:37:56.061Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 actions matched source literals with correct shapes and parameters; transport fully verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command reference is a generic family-level RS-232 doc (AVswitcher_rs232.pdf), not an AT-VIDEO2424-specific manual. Application to this exact model is inferred from the family membership (AT-VIDEO2424 = composite video BNC matrix). No AT-VIDEO2424-specific protocol document was located."
- "flow control not stated in source"
- "exact response string format not stated in source"
- "no settable continuous parameters (volume/gain/brightness) in source."
- "source documents no unsolicited notifications. Section N/A."
- "source documents no multi-step sequences beyond single commands. Section N/A."
- "source contains no safety warnings, interlock procedures, or"
- "flow_control not stated in source."
- "exact response/acknowledgement string formats for queries not documented."
- "terminator semantics (whether different terminators have different meanings) not fully explained in source."
- "maximum number of comma-separated outputs per multi-output command not stated."
- "AT-VIDEO2424-specific protocol confirmation not located — generic family doc used."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
