---
spec_id: admin/atlona-at-rgb0804
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-RGB0804 Control Spec"
manufacturer: Atlona
model_family: AT-RGB0804
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-RGB0804
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - files.bzbexpress.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-RGB-MATRIX.pdf
  - https://files.bzbexpress.com/files/attachments/17045/atlona-at-rgb0804-a-manual.pdf
retrieved_at: 2026-06-03T07:12:32.264Z
last_checked_at: 2026-06-04T06:22:39.458Z
generated_at: 2026-06-04T06:22:39.458Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "response payload formats for /*Type, /^Version, StatusX, Status., and SG are not documented in the source excerpt."
  - "source documents a password-reset command (/+xxxxxxxx;) and keyboard lock/unlock, but does not describe a protocol-level login/auth flow."
  - "source does not document the response payload format for any"
  - "source defines state only implicitly through routing commands"
  - "source does not document unsolicited device notifications."
  - "source does not document any multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility, response payload formats, and protocol-level auth flow are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:22:39.458Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literally in source; transport parameters verified; complete coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-RGB0804 Control Spec

## Summary
The Atlona AT-RGB0804 is an 8-input × 4-output RGBHV matrix switcher. This spec covers its RS-232C control protocol over a DB-9 female connector, including system commands (status, lock, buzzer, version) and routing operations (video / audio / both, single / multi-output, groups, memory save/recall/clear).

<!-- UNRESOLVED: response payload formats for /*Type, /^Version, StatusX, Status., and SG are not documented in the source excerpt. -->

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
  connector: DB-9 female
  pins:
    - pin: 2
      function: Tx
    - pin: 3
      function: Rx
    - pin: 5
      function: Gnd
    - pin: 1
      function: not_used
    - pin: 4
      function: not_used
    - pin: 6
      function: not_used
    - pin: 7
      function: not_used
    - pin: 8
      function: not_used
    - pin: 9
      function: not_used
auth:
  type: null  # UNRESOLVED: source documents a password-reset command (/+xxxxxxxx;) and keyboard lock/unlock, but does not describe a protocol-level login/auth flow.
```

## Traits
```yaml
- routable    # inferred from routing command examples (X V Y, X A Y, X B Y, X P G, etc.)
- queryable   # inferred from query command examples (Status, StatusX, SG, /*Type, /^Version)
```

## Actions
```yaml
- id: get_model_info
  label: Get Matrix Model Information
  kind: query
  command: "/*Type;"
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+xxxxxxxx;"
  params:
    - name: password
      type: string
      description: Nine-digit password value (xxxxxxxx)

- id: lock_keyboard
  label: Lock Front-Panel Keyboard
  kind: action
  command: "/%Lock;"
  params: []

- id: unlock_keyboard
  label: Unlock Front-Panel Keyboard
  kind: action
  command: "/%Unlock;"
  params: []

- id: buzzer_off
  label: Buzzer Off
  kind: action
  command: "/:BellOff;"
  params: []

- id: buzzer_on
  label: Buzzer On
  kind: action
  command: "/:BellOn;"
  params: []

- id: get_software_version
  label: Get Software Version
  kind: query
  command: "/^Version;"
  params: []

- id: input_to_all_outputs
  label: Transfer Signal From Input to All Outputs
  kind: action
  command: "[ {input} ]All."
  params:
    - name: input
      type: integer
      description: Input number X (1-based; example: 2)

- id: mirror_all_inputs_to_outputs
  label: Mirror All Inputs to Matching Outputs
  kind: action
  command: "All#."
  params: []

- id: all_outputs_off
  label: Switch Off All Outputs
  kind: action
  command: "All$."
  params: []

- id: mirror_input_to_output
  label: Mirror Input Number to Corresponding Output
  kind: action
  command: "{input}#."
  params:
    - name: input
      type: integer
      description: Input number X (1-based; example: 3)

- id: route_video_input_to_output
  label: Route Video From Input to Output
  kind: action
  command: "{input}V{output}."
  params:
    - name: input
      type: integer
      description: Input number X (1-based; example: 2)
    - name: output
      type: integer
      description: Output number Y (1-based; example: 3)

- id: route_video_input_to_outputs
  label: Route Video From Input to Multiple Outputs
  kind: action
  command: "{input}V{outputs}."
  params:
    - name: input
      type: integer
      description: Input number X (1-based; example: 2)
    - name: outputs
      type: string
      description: Comma-separated output numbers (W,Y,Z); example: "4,7,8"

- id: route_audio_input_to_output
  label: Route Audio From Input to Output
  kind: action
  command: "{input}A{output}."
  params:
    - name: input
      type: integer
      description: Input number X (1-based; example: 4)
    - name: output
      type: integer
      description: Output number Y (1-based; example: 3)

- id: route_audio_input_to_outputs
  label: Route Audio From Input to Multiple Outputs
  kind: action
  command: "{input}A{outputs}."
  params:
    - name: input
      type: integer
      description: Input number X (1-based; example: 1)
    - name: outputs
      type: string
      description: Comma-separated output numbers (W,Y,Z); example: "2,4,6"

- id: route_both_input_to_output
  label: Route Video and Audio From Input to Output
  kind: action
  command: "{input}B{output}."
  params:
    - name: input
      type: integer
      description: Input number X (1-based; example: 3)
    - name: output
      type: integer
      description: Output number Y (1-based; example: 2)

- id: route_both_input_to_outputs
  label: Route Video and Audio From Input to Multiple Outputs
  kind: action
  command: "{input}B{outputs}."
  params:
    - name: input
      type: integer
      description: Input number X (1-based; example: 4)
    - name: outputs
      type: string
      description: Comma-separated output numbers (W,Y,Z); example: "3,4,5"

- id: route_input_to_group
  label: Route Video and Audio From Input to Output Group
  kind: action
  command: "{input}P{group}."
  params:
    - name: input
      type: integer
      description: Input number X (1-based; example: 3)
    - name: group
      type: integer
      description: Group number G (1-based; example: 2)

- id: form_group
  label: Form Group From Outputs
  kind: action
  command: "{group}PP{outputs}."
  params:
    - name: group
      type: integer
      description: Group number G (1-based; example: 2)
    - name: outputs
      type: string
      description: Comma-separated output numbers (W,Y,Z) that will form the group; example: "4,5,6"

- id: get_group_members
  label: Get Outputs in a Group
  kind: query
  command: "S{group}."
  params:
    - name: group
      type: integer
      description: Group number G (1-based; example: 2)

- id: get_routing_for_input
  label: Get Outputs Connected to an Input
  kind: query
  command: "Status{input}."
  params:
    - name: input
      type: integer
      description: Input number X (1-based; example: 2)

- id: get_all_routing
  label: Get All Input-to-Output Routing
  kind: query
  command: "Status."
  params: []

- id: save_routes_to_memory
  label: Save Current Routes to Memory
  kind: action
  command: "Save{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot N (0 to 9; example: 4)

- id: recall_routes_from_memory
  label: Recall Saved Route Memory
  kind: action
  command: "Recall{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot N (0 to 9; example: 4)

- id: clear_memory
  label: Clear Memory
  kind: action
  command: "Clear{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot N (0 to 9; example: 4)
```

## Feedbacks
```yaml
# UNRESOLVED: source does not document the response payload format for any
# query command (/*Type, /^Version, Status, StatusX, S G). Populate response
# schemas once a manual revision that lists them is available.
```

## Variables
```yaml
# UNRESOLVED: source defines state only implicitly through routing commands
# and status queries. No discrete settable parameters beyond actions above.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited device notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences.
# Save/Recall operate on internally stored route snapshots, not user-defined macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Command codes are case-, spacing-, and lettering-sensitive. Source states explicitly: "do not change capitalization, spacing, or lettering."
- Every command line must terminate with one of `.`, `;`, `!`, `"`, `$`, or `&`. Without a terminator the code will fail. The end character is part of each command and is preserved verbatim in the `command` field above.
- The source uses single-letter placeholders: `X` = input number, `W` / `Y` / `Z` = output numbers, `G` = group number, `N` = memory number (0–9).
- For multi-output commands (`V`, `A`, `B`), output numbers are comma-separated with no spaces, e.g. `2V4,7,8.`.
- Source lists commands across two visual tables (System, Operation) but they all use the same RS-232 framing.
- A password-reset command (`/+xxxxxxxx;`) and keyboard lock/unlock commands exist, but the source does not describe a protocol-level authentication/login flow, so `auth.type` is left as UNRESOLVED.
<!-- UNRESOLVED: firmware version compatibility, response payload formats, and protocol-level auth flow are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - files.bzbexpress.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-RGB-MATRIX.pdf
  - https://files.bzbexpress.com/files/attachments/17045/atlona-at-rgb0804-a-manual.pdf
retrieved_at: 2026-06-03T07:12:32.264Z
last_checked_at: 2026-06-04T06:22:39.458Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:22:39.458Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literally in source; transport parameters verified; complete coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "response payload formats for /*Type, /^Version, StatusX, Status., and SG are not documented in the source excerpt."
- "source documents a password-reset command (/+xxxxxxxx;) and keyboard lock/unlock, but does not describe a protocol-level login/auth flow."
- "source does not document the response payload format for any"
- "source defines state only implicitly through routing commands"
- "source does not document unsolicited device notifications."
- "source does not document any multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility, response payload formats, and protocol-level auth flow are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
