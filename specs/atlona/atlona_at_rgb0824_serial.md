---
spec_id: admin/atlona-at-rgb0824
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-RGB0824 Control Spec"
manufacturer: Atlona
model_family: AT-RGB0824
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-RGB0824
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
  - https://files.bzbexpress.com/files/attachments/17246/atlona-at-rgb0824-manual.pdf
retrieved_at: 2026-06-03T07:21:24.494Z
last_checked_at: 2026-06-04T06:22:40.178Z
generated_at: 2026-06-04T06:22:40.178Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated; password policy and default auth unknown; exact line-ending character behavior (.;!$ or &) only partially specified"
  - "source mentions password reset command but not auth flow"
  - "no explicit power on/off commands in source"
  - "exact response string format for each query command not documented"
  - "source documents no persistent settable variables beyond memory slots."
  - "source documents no unsolicited events/notifications."
  - "source documents no multi-step sequences or macro commands."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing."
  - "response/feedback string formats for all query commands (/*Type, /^Version, Status, S, etc.) not documented in source. Response/acknowledgment bytes for action commands not documented."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:22:40.178Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched literal source commands with correct parameters and full transport verification. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-RGB0824 Control Spec

## Summary
Atlona AT-RGB0824 8x24 RGBHV matrix switcher. RS-232C serial control via 9-pin female D connector, 9600/8/N/1. Source documents ASCII command set for system control, routing, grouping, status queries, and memory operations.

<!-- UNRESOLVED: firmware version not stated; password policy and default auth unknown; exact line-ending character behavior (.;!$ or &) only partially specified -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: no flow control pins documented (pins 4,6,7,8 unused)
auth:
  type: password  # UNRESOLVED: source mentions password reset command but not auth flow
```

**Pinout (9-pin female D):** Pin 2 Tx, Pin 3 Rx, Pin 5 Gnd. Pins 1, 4, 6, 7, 8, 9 unused.

## Traits
```yaml
- routable    # inferred from extensive input/output routing commands
- queryable   # inferred from Status, S, /*Type, /^Version query commands
- powerable   # UNRESOLVED: no explicit power on/off commands in source
```

## Actions
```yaml
- id: get_model_type
  label: Get Matrix Model Type
  kind: query
  command: "/*Type;"
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+{password};"
  params:
    - name: password
      type: string
      description: 9-digit numeric password

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  command: "/%Lock;"
  params: []

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  command: "/%Unlock;"
  params: []

- id: bell_off
  label: Buzzer Off
  kind: action
  command: "/:BellOff;"
  params: []

- id: bell_on
  label: Buzzer On
  kind: action
  command: "/:BellOn;"
  params: []

- id: get_version
  label: Get Software Version
  kind: query
  command: "/^Version;"
  params: []

- id: route_input_to_all_outputs
  label: Route Input To All Outputs
  kind: action
  command: "[{input}]All."
  params:
    - name: input
      type: integer
      description: Input number (1-8)

- id: mirror_all_inputs_to_outputs
  label: Mirror All Inputs To Matching Outputs
  kind: action
  command: "All#."
  params: []

- id: all_outputs_off
  label: All Outputs Off
  kind: action
  command: "All$."
  params: []

- id: route_video_input_to_output
  label: Route Video Input To Output
  kind: action
  command: "{input}V{output}."
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output
      type: integer
      description: Output number (1-24)

- id: route_video_input_to_outputs
  label: Route Video Input To Multiple Outputs
  kind: action
  command: "{input}V{out1},{out2},{out3}."
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: out1
      type: integer
      description: Output number (1-24)
    - name: out2
      type: integer
      description: Output number (1-24)
    - name: out3
      type: integer
      description: Output number (1-24)

- id: route_audio_input_to_output
  label: Route Audio Input To Output
  kind: action
  command: "{input}A{output}."
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output
      type: integer
      description: Output number (1-24)

- id: route_audio_input_to_outputs
  label: Route Audio Input To Multiple Outputs
  kind: action
  command: "{input}A{out1},{out2},{out3}."
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: out1
      type: integer
      description: Output number (1-24)
    - name: out2
      type: integer
      description: Output number (1-24)
    - name: out3
      type: integer
      description: Output number (1-24)

- id: route_both_input_to_output
  label: Route Audio+Video Input To Output
  kind: action
  command: "{input}B{output}."
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output
      type: integer
      description: Output number (1-24)

- id: route_both_input_to_outputs
  label: Route Audio+Video Input To Multiple Outputs
  kind: action
  command: "{input}B{out1},{out2},{out3}."
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: out1
      type: integer
      description: Output number (1-24)
    - name: out2
      type: integer
      description: Output number (1-24)
    - name: out3
      type: integer
      description: Output number (1-24)

- id: route_input_to_group
  label: Route Input To Group
  kind: action
  command: "{input}P{group}."
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: group
      type: integer
      description: Group number (2)

- id: define_group
  label: Define Output Group
  kind: action
  command: "{group}PP{out1},{out2},{out3}."
  params:
    - name: group
      type: integer
      description: Group number (2)
    - name: out1
      type: integer
      description: Output number (1-24)
    - name: out2
      type: integer
      description: Output number (1-24)
    - name: out3
      type: integer
      description: Output number (1-24)

- id: get_group_members
  label: Get Group Members
  kind: query
  command: "S{group}."
  params:
    - name: group
      type: integer
      description: Group number (2)

- id: status_input_routing
  label: Get Outputs Connected To Input
  kind: query
  command: "Status{input}."
  params:
    - name: input
      type: integer
      description: Input number (1-8)

- id: status_all_routing
  label: Get All Input-Output Routing
  kind: query
  command: "Status."
  params: []

- id: save_routes_to_memory
  label: Save Routes To Memory
  kind: action
  command: "Save{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)

- id: recall_routes_from_memory
  label: Recall Routes From Memory
  kind: action
  command: "Recall{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)

- id: clear_memory
  label: Clear Memory
  kind: action
  command: "Clear{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)
```

## Feedbacks
```yaml
- id: routing_state
  type: object
  description: Output of Status command. Maps inputs to current output assignments.
# UNRESOLVED: exact response string format for each query command not documented
# in source. Source only documents request side.
```

## Variables
```yaml
# UNRESOLVED: source documents no persistent settable variables beyond memory slots.
# Memory slots (0-9) are addressed via Save/Recall/Clear commands, not as a variable.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited events/notifications.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences or macro commands.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing.
```

## Notes
- All command lines must terminate with one of: `.` `;` `!` `"` `$` `&` — without terminator the command fails.
- Commands are case-sensitive; do not alter capitalization, spacing, or lettering.
- Source documents routing for video (V), audio (A), and combined audio+video (B) as separate command forms.
- Memory slots 0-9 (10 total) for save/recall/clear of routing presets.
- Group support documented only for group 2 in examples; full group number range not stated.
- Auth behavior beyond `/+xxxxxxxx;` password reset not documented. Default password and auth-required commands unknown.

<!-- UNRESOLVED: response/feedback string formats for all query commands (/*Type, /^Version, Status, S, etc.) not documented in source. Response/acknowledgment bytes for action commands not documented. -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - files.bzbexpress.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-RGB-MATRIX.pdf
  - https://files.bzbexpress.com/files/attachments/17246/atlona-at-rgb0824-manual.pdf
retrieved_at: 2026-06-03T07:21:24.494Z
last_checked_at: 2026-06-04T06:22:40.178Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:22:40.178Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched literal source commands with correct parameters and full transport verification. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated; password policy and default auth unknown; exact line-ending character behavior (.;!$ or &) only partially specified"
- "source mentions password reset command but not auth flow"
- "no explicit power on/off commands in source"
- "exact response string format for each query command not documented"
- "source documents no persistent settable variables beyond memory slots."
- "source documents no unsolicited events/notifications."
- "source documents no multi-step sequences or macro commands."
- "source contains no safety warnings, interlock procedures, or power-on sequencing."
- "response/feedback string formats for all query commands (/*Type, /^Version, Status, S, etc.) not documented in source. Response/acknowledgment bytes for action commands not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
