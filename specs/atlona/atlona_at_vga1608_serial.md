---
spec_id: admin/atlona-at-vga1608
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-VGA1608 Control Spec"
manufacturer: Atlona
model_family: AT-VGA1608
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-VGA1608
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/AT-VGA-MATRIX.pdf
  - https://atlona.com
retrieved_at: 2026-06-03T20:38:39.085Z
last_checked_at: 2026-06-04T06:24:25.588Z
generated_at: 2026-06-04T06:24:25.588Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Password reset command documented but password/auth mechanism not detailed."
  - "source documents query commands but does not show the verbatim"
  - "response payload format not stated in source"
  - "storage representation not stated in source; Save/Recall/Clear"
  - "source does not document unsolicited notifications. Section"
  - "source does not document multi-step sequences. Section removed."
  - "source does not document safety warnings, interlocks, or power-on"
  - "firmware version compatibility, response payload format, full password/auth lifecycle, and any safety/interlock procedures."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:24:25.588Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literally in source with correct shapes and parameters; transport fully verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-VGA1608 Control Spec

## Summary
The Atlona AT-VGA1608 is a VGA matrix switcher controllable via RS-232C serial. This spec covers its ASCII command set, including system commands (model info, version, keyboard lock, buzzer), routing commands (video, audio, both, group, mirror, all-off), memory operations (save/recall/clear), and status queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Password reset command documented but password/auth mechanism not detailed. -->

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
  pins_used:
    - "Pin 2 Tx (Transmit)"
    - "Pin 3 Rx (Receive)"
    - "Pin 5 Gnd (Ground)"
auth:
  type: none  # inferred: no auth procedure documented in source
```

## Traits
```yaml
- routable     # inferred: routing commands present (V, A, B, P, group, mirror, all-off)
- queryable    # inferred: status query commands present (Status, S G)
```

## Actions
```yaml
# Each command-bearing row from the source is a distinct action.
# Variable placeholders: X=input number, Y/Z=output number(s), W=output number in list,
# G=group number, N=memory number (0-9). Each command line must end with one of
# the terminator characters: " . " " ; " " ! " " $ " or " & ".
# Notes:
#  - /*Type; is a query (returns model info).
#  - /^Version; is a query (returns software version).
#  - /+xxxxxxxx; is a SET/writer (resets the password to the 9-digit value).
#  - System commands use ";" as terminator; operation commands use "." as terminator
#    in the source examples. Preserve the source's terminator per command.

# --- System commands ---
- id: get_model_info
  label: Get Model Info
  kind: query
  command: "/*Type;"
  params: []

- id: reset_password
  label: Reset Password (9 digits)
  kind: action
  command: "/+{password};"
  params:
    - name: password
      type: string
      description: 9-digit password string

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

- id: route_input_to_all
  label: Route Input to All Outputs
  kind: action
  command: "[{input}]All."
  params:
    - name: input
      type: integer
      description: Input number

# --- Operation commands ---
- id: mirror_all_inputs
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
  label: Mirror Input to Corresponding Output
  kind: action
  command: "{input}#."
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: route_video_to_output
  label: Route Video Input to Output
  kind: action
  command: "{input}V{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_video_to_outputs
  label: Route Video Input to Multiple Outputs
  kind: action
  command: "{input}V{output_list}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output_list
      type: string
      description: Comma-separated output numbers (e.g. "4,7,8")

- id: route_audio_to_output
  label: Route Audio Input to Output
  kind: action
  command: "{input}A{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_audio_to_outputs
  label: Route Audio Input to Multiple Outputs
  kind: action
  command: "{input}A{output_list}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output_list
      type: string
      description: Comma-separated output numbers (e.g. "2,4,6")

- id: route_both_to_output
  label: Route Audio and Video to Output
  kind: action
  command: "{input}B{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_both_to_outputs
  label: Route Audio and Video to Multiple Outputs
  kind: action
  command: "{input}B{output_list}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output_list
      type: string
      description: Comma-separated output numbers (e.g. "3,4,5")

- id: route_to_group
  label: Route Input to Output Group
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
  label: Form Group from Outputs
  kind: action
  command: "{group}PP{output_list}."
  params:
    - name: group
      type: integer
      description: Group number
    - name: output_list
      type: string
      description: Comma-separated output numbers (e.g. "4,5,6")

- id: get_group_members
  label: Get Outputs in Group
  kind: query
  command: "S{group}."
  params:
    - name: group
      type: integer
      description: Group number

- id: get_input_routing
  label: Get Outputs Connected to Input
  kind: query
  command: "Status{input}."
  params:
    - name: input
      type: integer
      description: Input number

- id: get_all_routing
  label: Get All Input/Output Routing
  kind: query
  command: "Status."
  params: []

- id: save_routes_to_memory
  label: Save Routes to Memory
  kind: action
  command: "Save{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number (0-9)

- id: recall_routes_from_memory
  label: Recall Routes from Memory
  kind: action
  command: "Recall{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number (0-9)

- id: clear_memory
  label: Clear Memory
  kind: action
  command: "Clear{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number (0-9)
```

## Feedbacks
```yaml
# UNRESOLVED: source documents query commands but does not show the verbatim
# response payload format. Listed as candidates based on the source's
# descriptions; mark type/format as UNRESOLVED until response format is observed.
- id: model_info
  type: string
  values: []
  # UNRESOLVED: response payload format not stated in source

- id: software_version
  type: string
  values: []
  # UNRESOLVED: response payload format not stated in source

- id: group_members
  type: string
  values: []
  # UNRESOLVED: response payload format not stated in source

- id: input_routing
  type: string
  values: []
  # UNRESOLVED: response payload format not stated in source

- id: all_routing
  type: string
  values: []
  # UNRESOLVED: response payload format not stated in source
```

## Variables
```yaml
- id: keyboard_locked
  type: enum
  values: [locked, unlocked]
  # Set by /%Lock; and /%Unlock; system commands.

- id: buzzer_enabled
  type: enum
  values: [on, off]
  # Set by /:BellOn; and /:BellOff; system commands.

- id: memory_slots
  type: integer
  range: "0-9"
  # UNRESOLVED: storage representation not stated in source; Save/Recall/Clear
  # operate on memory numbers 0-9 per the source's note "Memories go from 0 to 9".
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications. Section
# removed.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences. Section removed.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on
# sequencing requirements. Password mechanism exists (/+xxxxxxxx;) but its
# full scope and any safety implications are not detailed in the source.
```

## Notes
Source documents RS-232C only (no TCP/IP or other transport mentioned). All commands are ASCII; capitalization, spacing, and lettering are case-sensitive per the source's explicit warning. Each command line must be terminated with one of: " . " " ; " " ! " " $ " or " & " — without a terminator the command fails. System commands (/*Type;, /+xxxxxxxx;, /%Lock;, /%Unlock;, /:BellOff;, /:BellOn;, /^Version;) use ";" as terminator in the source examples; operation/routing/status/memory commands use "." as terminator. The "[ X ]All." form uses literal brackets; the " X V W , Y , Z ." form uses literal commas to separate output numbers. No auth procedure is documented beyond a 9-digit password reset command, but the password mechanism's full lifecycle is not detailed. Response payload formats for queries (Status, S, /*Type, /^Version) are not shown in the source and are marked UNRESOLVED in Feedbacks.

<!-- UNRESOLVED: firmware version compatibility, response payload format, full password/auth lifecycle, and any safety/interlock procedures. -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/AT-VGA-MATRIX.pdf
  - https://atlona.com
retrieved_at: 2026-06-03T20:38:39.085Z
last_checked_at: 2026-06-04T06:24:25.588Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:24:25.588Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literally in source with correct shapes and parameters; transport fully verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Password reset command documented but password/auth mechanism not detailed."
- "source documents query commands but does not show the verbatim"
- "response payload format not stated in source"
- "storage representation not stated in source; Save/Recall/Clear"
- "source does not document unsolicited notifications. Section"
- "source does not document multi-step sequences. Section removed."
- "source does not document safety warnings, interlocks, or power-on"
- "firmware version compatibility, response payload format, full password/auth lifecycle, and any safety/interlock procedures."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
