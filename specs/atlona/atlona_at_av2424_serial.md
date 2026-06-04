---
spec_id: admin/atlona-at-av2424
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-AV2424 Control Spec"
manufacturer: Atlona
model_family: AT-AV2424
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-AV2424
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://www.manualslib.com/manual/558681/Atlona-Av128128.html
retrieved_at: 2026-06-03T20:18:14.772Z
last_checked_at: 2026-06-04T06:22:38.745Z
generated_at: 2026-06-04T06:22:38.745Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents queries (Status, S, /*Type, /^Version) but does not"
  - "no settable discrete variables documented beyond route state."
  - "source does not document unsolicited notifications."
  - "no multi-step sequences described in source."
  - "no safety warnings, interlocks, or power-on sequencing in source."
  - "response/acknowledgement payload strings for queries (Status, S, /*Type, /^Version) not stated in source. Input/output port count (24x24) implied by model number AT-AV2424 but not explicitly stated in refined source."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:22:38.745Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched verbatim in source with correct transport parameters and no extraneous source commands. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-AV2424 Control Spec

## Summary
Atlona AT-AV2424 is a 24x24 audio/video matrix switcher controllable over RS-232C. This spec covers the serial command set for routing video, audio, or both across inputs and outputs, plus system commands for keyboard lock, buzzer, version query, and route memory.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: DB9  # female D-sub; pin 2 Tx, pin 3 Rx, pin 5 Gnd
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from input/output routing command examples
- queryable  # inferred from Status, /*Type, /^Version, SG query commands
```

## Actions
```yaml
- id: query_model
  label: Query Matrix Model
  kind: query
  command: "/*Type"  # line must end in . ; ! " $ or &
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+{password}"  # password must be 9 digits
  params:
    - name: password
      type: string
      description: 9-digit password (xxxxxxxx)

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  command: "/%Lock"

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  command: "/%Unlock"

- id: bell_off
  label: Buzzer Off
  kind: action
  command: "/:BellOff"

- id: bell_on
  label: Buzzer On
  kind: action
  command: "/:BellOn"

- id: query_version
  label: Query Software Version
  kind: query
  command: "/^Version"

- id: input_to_all_outputs
  label: Input to All Outputs
  kind: action
  command: "[{input}]All"
  params:
    - name: input
      type: integer
      description: Input number

- id: mirror_all_matching
  label: Mirror All Inputs to Matching Outputs
  kind: action
  command: "All#"
  description: Mirror input N to output N for every N

- id: all_outputs_off
  label: All Outputs Off
  kind: action
  command: "All$"

- id: mirror_input_to_output
  label: Mirror Input X to Output X
  kind: action
  command: "{input}#"
  params:
    - name: input
      type: integer
      description: Input number (mirrored to same-numbered output)

- id: route_video
  label: Route Video Input to Output
  kind: action
  command: "{input}V{output}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_video_multi
  label: Route Video Input to Multiple Outputs
  kind: action
  command: "{input}V{out1},{out2},{out3}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: out1
      type: integer
      description: First output number
    - name: out2
      type: integer
      description: Second output number
    - name: out3
      type: integer
      description: Third output number

- id: route_audio
  label: Route Audio Input to Output
  kind: action
  command: "{input}A{output}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_audio_multi
  label: Route Audio Input to Multiple Outputs
  kind: action
  command: "{input}A{out1},{out2},{out3}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: out1
      type: integer
      description: First output number
    - name: out2
      type: integer
      description: Second output number
    - name: out3
      type: integer
      description: Third output number

- id: route_both
  label: Route Video+Audio Input to Output
  kind: action
  command: "{input}B{output}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_both_multi
  label: Route Video+Audio Input to Multiple Outputs
  kind: action
  command: "{input}B{out1},{out2},{out3}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: out1
      type: integer
      description: First output number
    - name: out2
      type: integer
      description: Second output number
    - name: out3
      type: integer
      description: Third output number

- id: route_to_group
  label: Route Input to Group
  kind: action
  command: "{input}P{group}"
  description: Routes audio+video from input to all outputs in group
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
  command: "{group}PP{out1},{out2},{out3}"
  description: Takes listed outputs and forms them into group
  params:
    - name: group
      type: integer
      description: Group number
    - name: out1
      type: integer
      description: First output number
    - name: out2
      type: integer
      description: Second output number
    - name: out3
      type: integer
      description: Third output number

- id: query_group
  label: Query Group Membership
  kind: query
  command: "S{group}"
  params:
    - name: group
      type: integer
      description: Group number

- id: query_input_routes
  label: Query Outputs Connected to Input
  kind: query
  command: "Status{input}"
  params:
    - name: input
      type: integer
      description: Input number

- id: query_all_routes
  label: Query All Input/Output Routes
  kind: query
  command: "Status"

- id: save_routes
  label: Save Current Routes to Memory
  kind: action
  command: "Save{memory}"
  description: Memory slots 0-9
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)

- id: recall_routes
  label: Recall Saved Route Memory
  kind: action
  command: "Recall{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)

- id: clear_memory
  label: Clear Route Memory
  kind: action
  command: "Clear{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)
```

## Feedbacks
```yaml
# UNRESOLVED: source documents queries (Status, S, /*Type, /^Version) but does not
# enumerate literal response payloads. Feedback payloads left unresolved.
```

## Variables
```yaml
# UNRESOLVED: no settable discrete variables documented beyond route state.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing in source.
```

## Notes
Command lines MUST terminate with one of `.` `;` `!` `"` `$` `&` — without terminator the code fails. Command codes are case- and spacing-sensitive. Password reset (`/+xxxxxxxx;`) requires exactly 9 digits. Memory slots for Save/Recall/Clear: 0-9. Group operations and multi-output routing accept up to 3 output numbers per command per source examples (W,Y,Z).

<!-- UNRESOLVED: response/acknowledgement payload strings for queries (Status, S, /*Type, /^Version) not stated in source. Input/output port count (24x24) implied by model number AT-AV2424 but not explicitly stated in refined source. -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://www.manualslib.com/manual/558681/Atlona-Av128128.html
retrieved_at: 2026-06-03T20:18:14.772Z
last_checked_at: 2026-06-04T06:22:38.745Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:22:38.745Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched verbatim in source with correct transport parameters and no extraneous source commands. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents queries (Status, S, /*Type, /^Version) but does not"
- "no settable discrete variables documented beyond route state."
- "source does not document unsolicited notifications."
- "no multi-step sequences described in source."
- "no safety warnings, interlocks, or power-on sequencing in source."
- "response/acknowledgement payload strings for queries (Status, S, /*Type, /^Version) not stated in source. Input/output port count (24x24) implied by model number AT-AV2424 but not explicitly stated in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
