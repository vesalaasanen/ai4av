---
spec_id: admin/atlona-at-video2416
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-VIDEO2416 Control Spec"
manufacturer: Atlona
model_family: AT-VIDEO2416
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-VIDEO2416
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/rs232/
retrieved_at: 2026-06-03T20:52:33.139Z
last_checked_at: 2026-06-04T06:24:28.127Z
generated_at: 2026-06-04T06:24:28.127Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "password handling — /+xxxxxxxx reset exists but auth/login flow not described."
  - "no explicit power on/off in refined excerpt"
  - "response payload formats for queries not specified in refined excerpt."
  - "source lists no settable scalar parameters distinct from discrete routing actions."
  - "source lists no unsolicited notifications."
  - "source lists no multi-step macro sequences."
  - "no safety warnings, interlocks, or power-sequencing requirements in source."
  - "response format for /*Type, /^Version, Status, SG, Clear/Recall/Save not specified in refined excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:24:28.127Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched their source commands literally; transport parameters verified verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-VIDEO2416 Control Spec

## Summary
RS-232 controlled 24x16 video matrix switcher. Serial protocol on 9-pin D-sub, 9600 8N1. Commands end in `.` `;` `!` `"` `$` or `&`.

<!-- UNRESOLVED: password handling — /+xxxxxxxx reset exists but auth/login flow not described. -->

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
  connector: "DB-9 female"
  pinout:
    tx: 2
    rx: 3
    gnd: 5
auth:
  type: none  # inferred: no auth procedure documented in source
```

## Traits
```yaml
- routable  # inferred from X/Y routing commands
- powerable  # UNRESOLVED: no explicit power on/off in refined excerpt
- queryable  # inferred from Status, /*Type, /^Version queries
```

## Actions
```yaml
# Variable conventions from source: X=input, W/Y/Z=output number, G=group, N=memory (0-9).
# Each command terminates with one of: . ; ! " $ &
# Pins: Tx=2, Rx=3, Gnd=5.

- id: query_model
  label: Query Matrix Model
  kind: query
  command: "/*Type"
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+{password}"
  params:
    - name: password
      type: string
      description: 9-digit password (must be 9 digits per source)
  notes: "No auth flow documented; behavior of locked vs unlocked state not in source."

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

- id: query_version
  label: Query Software Version
  kind: query
  command: "/^Version"
  params: []

- id: input_to_all_outputs
  label: Transfer Input to All Outputs
  kind: action
  command: "[{input}]All"
  params:
    - name: input
      type: integer
      description: Input number (source uses X)

- id: mirror_all_inputs_to_matching_outputs
  label: Mirror All Inputs to Matching Outputs
  kind: action
  command: "All#"
  params: []
  notes: "Mirrors input N to output N across the matrix (e.g. 1->1, 2->2, 4->4)."

- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$"
  params: []

- id: mirror_input_to_matching_output
  label: Mirror Input N to Output N
  kind: action
  command: "{input}#"
  params:
    - name: input
      type: integer
      description: Input number (also routes to same-numbered output)

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
      description: Output number (Y)

- id: route_video_multi
  label: Route Video Input to Multiple Outputs
  kind: action
  command: "{input}V{outputs}"
  params:
    - name: input
      type: integer
      description: Input number (X)
    - name: outputs
      type: string
      description: Comma-separated output list using W,Y,Z placeholders (e.g. "4,7,8")

- id: route_audio
  label: Route Audio Input to Output
  kind: action
  command: "{input}A{output}"
  params:
    - name: input
      type: integer
      description: Input number (X)
    - name: output
      type: integer
      description: Output number (Y)

- id: route_audio_multi
  label: Route Audio Input to Multiple Outputs
  kind: action
  command: "{input}A{outputs}"
  params:
    - name: input
      type: integer
      description: Input number (X)
    - name: outputs
      type: string
      description: Comma-separated output list using W,Y,Z placeholders (e.g. "2,4,6")

- id: route_both
  label: Route Audio+Video Input to Output
  kind: action
  command: "{input}B{output}"
  params:
    - name: input
      type: integer
      description: Input number (X)
    - name: output
      type: integer
      description: Output number (Y)

- id: route_both_multi
  label: Route Audio+Video Input to Multiple Outputs
  kind: action
  command: "{input}B{outputs}"
  params:
    - name: input
      type: integer
      description: Input number (X)
    - name: outputs
      type: string
      description: Comma-separated output list using W,Y,Z placeholders (e.g. "3,4,5")

- id: route_input_to_group
  label: Route Input to Output Group
  kind: action
  command: "{input}P{group}"
  params:
    - name: input
      type: integer
      description: Input number (X)
    - name: group
      type: integer
      description: Group number (G)

- id: form_group
  label: Form Output Group
  kind: action
  command: "{group}PP{outputs}"
  params:
    - name: group
      type: integer
      description: Group number (G) to form
    - name: outputs
      type: string
      description: Comma-separated output list using W,Y,Z placeholders (e.g. "4,5,6")

- id: query_group_members
  label: Query Group Members
  kind: query
  command: "S{group}"
  params:
    - name: group
      type: integer
      description: Group number (G)

- id: query_input_routing
  label: Query Outputs Connected to Input
  kind: query
  command: "Status{input}"
  params:
    - name: input
      type: integer
      description: Input number (X)

- id: query_all_routing
  label: Query All Input/Output Routing
  kind: query
  command: "Status"
  params: []

- id: save_memory
  label: Save Current Routes to Memory
  kind: action
  command: "Save{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot 0-9 (N)

- id: recall_memory
  label: Recall Saved Route Memory
  kind: action
  command: "Recall{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot 0-9 (N)

- id: clear_memory
  label: Clear Memory Slot
  kind: action
  command: "Clear{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot 0-9 (N)
```

## Feedbacks
```yaml
# UNRESOLVED: response payload formats for queries not specified in refined excerpt.
```

## Variables
```yaml
# UNRESOLVED: source lists no settable scalar parameters distinct from discrete routing actions.
```

## Events
```yaml
# UNRESOLVED: source lists no unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source lists no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-sequencing requirements in source.
```

## Notes
- Command strings case-sensitive per source. Do not change capitalization, spacing, or lettering.
- Every command line must end with one of `.` `;` `!` `"` `$` `&` — code fails without terminator.
- Memory slots N range 0-9.
- Pin 1, 4, 6, 7, 8, 9 unused.
- Password reset `/+xxxxxxxx` requires 9 digits; broader auth flow not described in refined excerpt.
- Source uses X=input, W/Y/Z=output number, G=group, N=memory as variable tokens.

<!-- UNRESOLVED: response format for /*Type, /^Version, Status, SG, Clear/Recall/Save not specified in refined excerpt. -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/rs232/
retrieved_at: 2026-06-03T20:52:33.139Z
last_checked_at: 2026-06-04T06:24:28.127Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:24:28.127Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched their source commands literally; transport parameters verified verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "password handling — /+xxxxxxxx reset exists but auth/login flow not described."
- "no explicit power on/off in refined excerpt"
- "response payload formats for queries not specified in refined excerpt."
- "source lists no settable scalar parameters distinct from discrete routing actions."
- "source lists no unsolicited notifications."
- "source lists no multi-step macro sequences."
- "no safety warnings, interlocks, or power-sequencing requirements in source."
- "response format for /*Type, /^Version, Status, SG, Clear/Recall/Save not specified in refined excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
