---
spec_id: admin/atlona-at-av1616
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-AV1616 Control Spec"
manufacturer: Atlona
model_family: AT-AV1616
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-AV1616
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-AV-MATRIX.pdf
  - https://atlona.com/support/
retrieved_at: 2026-07-21T22:55:36.014Z
last_checked_at: 2026-07-21T23:10:43.977Z
generated_at: 2026-07-21T23:10:43.977Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default password value not stated; RS-232 auth flow (whether password is required for session) not stated; Ethernet/TCP-IP control listed as \"Optional accessory\" for AV16 Series and is not included here."
  - "flow control not stated in source"
  - "source describes a password (/+xxxxxxxx;) and \"Set Password\" feature but does not state default credentials or whether RS-232 commands require authentication"
  - "response format for /*Type; and /^Version; not specified in source"
  - "response format for Status / Status{x} / S{x} not specified in source"
  - "settable parameters beyond the discrete actions above are not documented in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures documented in source"
  - "input/output channel count constraints (1-16 inferred from model number but not stated for the command set); group number range; Ethernet command set (if accessory installed); default password; RS-232 auth flow; firmware version; response/feedback payload formats for all queries."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:10:43.977Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched verbatim in source; transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-AV1616 Control Spec

## Summary
The Atlona AT-AV1616 is a 16-input × 16-output AV matrix switcher (part of the Atlona AV16 Series) controlled over RS-232 at 9600 baud, 8N1. This spec covers the verbatim RS-232 command set for system controls (password, keyboard lock, buzzer, version query) and operation controls (video, audio, video+audio routing; group assignment; preset save/recall/clear; routing status queries).

<!-- UNRESOLVED: default password value not stated; RS-232 auth flow (whether password is required for session) not stated; Ethernet/TCP-IP control listed as "Optional accessory" for AV16 Series and is not included here. -->

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
auth:
  type: password  # UNRESOLVED: source describes a password (/+xxxxxxxx;) and "Set Password" feature but does not state default credentials or whether RS-232 commands require authentication
```

## Traits
```yaml
- routable  # inferred from routing command examples
- queryable  # inferred from query command examples
```

## Actions
```yaml
- id: acquire_model_info
  label: Acquire Model Info
  kind: query
  command: "/*Type;"
  params: []

- id: rewrite_password
  label: Rewrite Password
  kind: action
  command: "/+{password};"
  params:
    - name: password
      type: string
      description: New password; must be 8 digits (per source).

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

- id: acquire_software_version
  label: Acquire Software Version
  kind: query
  command: "/^Version;"
  params: []

- id: switch_to_creator2
  label: Switch to CREATOR2.0 Command System
  kind: action
  command: "/~CREATOR20;"
  params: []

- id: input_to_all_outputs
  label: Input to All Outputs
  kind: action
  command: "{input}All"
  params:
    - name: input
      type: integer
      description: Input channel number (1-16).

- id: all_inputs_to_matching_outputs
  label: All Inputs to Matching Outputs
  kind: action
  command: "All#"
  params: []

- id: all_outputs_off
  label: All Outputs Off
  kind: action
  command: "All$"
  params: []

- id: input_to_matching_output
  label: Input to Matching Output
  kind: action
  command: "{input}#"
  params:
    - name: input
      type: integer
      description: Input channel number (1-16).

- id: output_off
  label: Output Off
  kind: action
  command: "{output}$"
  params:
    - name: output
      type: integer
      description: Output channel number (1-16).

- id: route_video
  label: Route Video
  kind: action
  command: "{input} V{outputs}"
  params:
    - name: input
      type: integer
      description: Input channel number (1-16).
    - name: outputs
      type: string
      description: Comma-separated output channel numbers, e.g. "7" or "7,8,9" (source syntax: [x1] V[x2] or [x1] V[x2],[x3],[x4]).

- id: route_audio
  label: Route Audio
  kind: action
  command: "{input} A{outputs}"
  params:
    - name: input
      type: integer
      description: Input channel number (1-16).
    - name: outputs
      type: string
      description: Comma-separated output channel numbers, e.g. "4" or "4,5,6" (source syntax: [x1] A[x2] or [x1] A[x2],[x3],[x4]).

- id: route_both
  label: Route Both Video and Audio
  kind: action
  command: "{input} B{outputs}"
  params:
    - name: input
      type: integer
      description: Input channel number (1-16).
    - name: outputs
      type: string
      description: Comma-separated output channel numbers, e.g. "7" or "7,8,9" (source syntax: [x1] B[x2] or [x1] B[x2],[x3],[x4]).

- id: route_input_to_group
  label: Route Input to Group
  kind: action
  command: "{input}P{group}"
  params:
    - name: input
      type: integer
      description: Input channel number (1-16).
    - name: group
      type: integer
      description: Group number (range not stated in source).

- id: assign_outputs_to_group
  label: Assign Outputs to Group
  kind: action
  command: "{group}PP{outputs}"
  params:
    - name: group
      type: integer
      description: Group number (range not stated in source).
    - name: outputs
      type: string
      description: Comma-separated output channel numbers, e.g. "1,2,3" (source syntax: [x1]PP[x2],[x3],[x4]).

- id: query_group_outputs
  label: Acquire Outputs in Group
  kind: query
  command: "S{group}"
  params:
    - name: group
      type: integer
      description: Group number (range not stated in source).

- id: query_output_input
  label: Acquire Input for Output
  kind: query
  command: "Status{output}"
  params:
    - name: output
      type: integer
      description: Output channel number (1-16).

- id: query_all_routing
  label: Acquire All Routing (Output-by-Output)
  kind: query
  command: "Status"
  params: []

- id: save_preset
  label: Save Preset
  kind: action
  command: "Save{preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot number; source states 0-9.

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "Recall{preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot number; source states 0-9.

- id: clear_preset
  label: Clear Preset
  kind: action
  command: "Clear{preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot number; source states 0-9.

- id: route_both_excl
  label: Route Both Video and Audio (Excl. Syntax)
  kind: action
  command: "{input}*{output}!"
  params:
    - name: input
      type: integer
      description: Input channel number.
    - name: output
      type: integer
      description: Output channel number.

- id: route_audio_excl
  label: Route Audio (Excl. Syntax)
  kind: action
  command: "{input}*{output}$"
  params:
    - name: input
      type: integer
      description: Input channel number.
    - name: output
      type: integer
      description: Output channel number.

- id: route_video_excl_pct
  label: Route Video (Excl. Syntax %)
  kind: action
  command: "{input}*{output}%"
  params:
    - name: input
      type: integer
      description: Input channel number.
    - name: output
      type: integer
      description: Output channel number.

- id: route_video_excl_amp
  label: Route Video (Excl. Syntax &)
  kind: action
  command: "{input}*{output}&"
  params:
    - name: input
      type: integer
      description: Input channel number.
    - name: output
      type: integer
      description: Output channel number.
```

## Feedbacks
```yaml
# UNRESOLVED: response format for /*Type; and /^Version; not specified in source
# UNRESOLVED: response format for Status / Status{x} / S{x} not specified in source
```

## Variables
```yaml
# UNRESOLVED: settable parameters beyond the discrete actions above are not documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures documented in source
```

## Notes
- Source exposes an apparent duplicate row: `[X1]*[X2]%` and `[X1]*[X2]&` are both listed as "Transfer video signals from input channel [x1] to output channel [x2]". Both retained as separate actions per source row-by-row enumeration; likely a manual typo, but not collapsed by the formatter.
- The `Custom Code Example` (e.g. `1B7.2A4.`) is a shorthand combining `1B7` (both 1→7) and `2A4` (audio 2→4); it is an illustration, not a distinct command family.
- Ethernet/TCP-IP control is listed for the AV16 Series in the `Control Type Specifications` table as an "Optional accessory" with RJ-45 connector and 10/100 full/half-duplex. It is not part of the standard AT-AV1616 control surface documented here, and the corresponding commands are not included.
- The `Communication Mode` block describes the supplied `SWITCHER 2.0` PC application's UI; it is not a device-side command.
- The `/*Type;` query implies a CREATOR-series command system. `/~CREATOR20;` switches to CREATOR2.0 — additional commands in that system are not documented in the source and are not enumerated here.
<!-- UNRESOLVED: input/output channel count constraints (1-16 inferred from model number but not stated for the command set); group number range; Ethernet command set (if accessory installed); default password; RS-232 auth flow; firmware version; response/feedback payload formats for all queries. -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-AV-MATRIX.pdf
  - https://atlona.com/support/
retrieved_at: 2026-07-21T22:55:36.014Z
last_checked_at: 2026-07-21T23:10:43.977Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:10:43.977Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched verbatim in source; transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default password value not stated; RS-232 auth flow (whether password is required for session) not stated; Ethernet/TCP-IP control listed as \"Optional accessory\" for AV16 Series and is not included here."
- "flow control not stated in source"
- "source describes a password (/+xxxxxxxx;) and \"Set Password\" feature but does not state default credentials or whether RS-232 commands require authentication"
- "response format for /*Type; and /^Version; not specified in source"
- "response format for Status / Status{x} / S{x} not specified in source"
- "settable parameters beyond the discrete actions above are not documented in source"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures documented in source"
- "input/output channel count constraints (1-16 inferred from model number but not stated for the command set); group number range; Ethernet command set (if accessory installed); default password; RS-232 auth flow; firmware version; response/feedback payload formats for all queries."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
