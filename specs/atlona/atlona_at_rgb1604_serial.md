---
spec_id: admin/atlona-at-rgb1604
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-RGB1604 Control Spec"
manufacturer: Atlona
model_family: AT-RGB1604
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-RGB1604
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - files.bzbexpress.com
  - sep.turbifycdn.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://files.bzbexpress.com/files/attachments/17043/atlona-at-rgb1604-manual.pdf
  - https://sep.turbifycdn.com/ty/cdn/focusedtechnology/at-rgb1604.pdf
  - https://atlona.com/
retrieved_at: 2026-06-07T20:17:33.842Z
last_checked_at: 2026-06-09T07:14:35.220Z
generated_at: 2026-06-09T07:14:35.220Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input/output count not stated in the refined excerpt; AT-RGB1604 model name implies 16-input/4-output but this is not stated in the source text itself."
  - "flow control not stated in source"
  - "no response/acknowledgement format documented in source. Responses are mentioned in the form of query results (e.g. Status, /*Type, /^Version, SG) but their exact wire format is not stated."
  - "no settable parameters beyond the discrete action commands above. Section omitted if not applicable."
  - "no unsolicited notifications documented in source."
  - "no multi-step sequences documented in source."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements documented in source."
  - "response/ack wire format not stated in source."
  - "maximum input and output counts not stated in source (model name implies 16x4 but unverified)."
  - "flow control (RTS/CTS, XON/XOFF, none) not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:14:35.220Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions match literally with source commands; transport parameters verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-07
---

# Atlona AT-RGB1604 Control Spec

## Summary
The Atlona AT-RGB1604 is an RGBHV matrix switcher controlled over RS-232 via a 9-pin female D connector. This spec covers the serial command set for routing video, audio, or both across input/output pairs, plus system commands for lock, buzzer, version, and saved-memory recall.

<!-- UNRESOLVED: input/output count not stated in the refined excerpt; AT-RGB1604 model name implies 16-input/4-output but this is not stated in the source text itself. -->

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
  type: none  # inferred: no login/auth procedure in source. Note: a password-reset command exists, implying a password may be set, but no auth handshake is documented.
```

## Traits
```yaml
- routable  # inferred from XVY, XAY, XBY input/output routing commands
- queryable  # inferred from StatusX and /*Type query commands
```

## Actions
```yaml
# Every command from the source table is enumerated as a separate action.

- id: query_model
  label: Query Matrix Model
  kind: query
  command: "/*Type"
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+xxxxxxxx"
  params:
    - name: xxxxxxxx
      type: string
      description: New 9-digit password

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

- id: route_all
  label: Route Input To All Outputs
  kind: action
  command: "[X]All"
  params:
    - name: X
      type: integer
      description: Input number

- id: mirror_all
  label: Mirror All Inputs To Matching Outputs
  kind: action
  command: "All#"
  params: []

- id: switch_off_all
  label: Switch Off All Outputs
  kind: action
  command: "All$"
  params: []

- id: mirror_input_to_output
  label: Mirror Input To Corresponding Output
  kind: action
  command: "X#"
  params:
    - name: X
      type: integer
      description: Input number

- id: route_video
  label: Route Video Input To Output
  kind: action
  command: "XVY"
  params:
    - name: X
      type: integer
      description: Input number
    - name: Y
      type: integer
      description: Output number

- id: route_video_multi
  label: Route Video Input To Multiple Outputs
  kind: action
  command: "XVW,Y,Z"
  params:
    - name: X
      type: integer
      description: Input number
    - name: W
      type: integer
      description: Output number
    - name: Y
      type: integer
      description: Output number
    - name: Z
      type: integer
      description: Output number

- id: route_audio
  label: Route Audio Input To Output
  kind: action
  command: "XAY"
  params:
    - name: X
      type: integer
      description: Input number
    - name: Y
      type: integer
      description: Output number

- id: route_audio_multi
  label: Route Audio Input To Multiple Outputs
  kind: action
  command: "XAW,Y,Z"
  params:
    - name: X
      type: integer
      description: Input number
    - name: W
      type: integer
      description: Output number
    - name: Y
      type: integer
      description: Output number
    - name: Z
      type: integer
      description: Output number

- id: route_both
  label: Route Audio And Video Input To Output
  kind: action
  command: "XBY"
  params:
    - name: X
      type: integer
      description: Input number
    - name: Y
      type: integer
      description: Output number

- id: route_both_multi
  label: Route Audio And Video Input To Multiple Outputs
  kind: action
  command: "XBW,Y,Z"
  params:
    - name: X
      type: integer
      description: Input number
    - name: W
      type: integer
      description: Output number
    - name: Y
      type: integer
      description: Output number
    - name: Z
      type: integer
      description: Output number

- id: route_to_group
  label: Route Input To Output Group
  kind: action
  command: "XPG"
  params:
    - name: X
      type: integer
      description: Input number
    - name: G
      type: integer
      description: Group number

- id: define_group
  label: Define Output Group
  kind: action
  command: "GPPW,Y,Z"
  params:
    - name: G
      type: integer
      description: Group number
    - name: W
      type: integer
      description: Output number
    - name: Y
      type: integer
      description: Output number
    - name: Z
      type: integer
      description: Output number

- id: query_group
  label: Query Group Contents
  kind: query
  command: "SG"
  params:
    - name: G
      type: integer
      description: Group number

- id: query_input_routing
  label: Query Outputs Routed From Input
  kind: query
  command: "StatusX"
  params:
    - name: X
      type: integer
      description: Input number

- id: query_all_routing
  label: Query All Input/Output Routing
  kind: query
  command: "Status"
  params: []

- id: save_memory
  label: Save Routes To Memory
  kind: action
  command: "SaveN"
  params:
    - name: N
      type: integer
      description: Memory slot (0-9)

- id: recall_memory
  label: Recall Saved Routes
  kind: action
  command: "RecallN"
  params:
    - name: N
      type: integer
      description: Memory slot (0-9)

- id: clear_memory
  label: Clear Saved Routes
  kind: action
  command: "ClearN"
  params:
    - name: N
      type: integer
      description: Memory slot (0-9)
```

## Feedbacks
```yaml
# UNRESOLVED: no response/acknowledgement format documented in source. Responses are mentioned in the form of query results (e.g. Status, /*Type, /^Version, SG) but their exact wire format is not stated.
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond the discrete action commands above. Section omitted if not applicable.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements documented in source.
```

## Notes
Command-line terminator must be one of `.`, `;`, `!`, `"`, `$`, `&` — without it, the code will fail. The source describes the `XVY` / `XAW,Y,Z` syntax; multi-output variants allow W, Y, Z (three outputs) per the source example, not an arbitrary-length list. The "W, Y, Z" in the command template above reflects the source's literal example; the actual max output count per command is not stated. The `All$` terminator-collides-with-source-warning: source documents `$` as both a valid line terminator and as part of the `All$` command itself — the parser rule that allows `$` as a line end would need to be aware of this command.

The `/+xxxxxxxx` password-reset command implies a password may be set on the unit, but no auth handshake/login procedure is documented in the source — so `auth.type: none` is emitted under the Tier 2 inference rule.

<!-- UNRESOLVED: response/ack wire format not stated in source. -->
<!-- UNRESOLVED: maximum input and output counts not stated in source (model name implies 16x4 but unverified). -->
<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF, none) not stated in source. -->
```

Spec written. 27 actions, 1 system password-reset, 2 keyboard-lock, 2 buzzer, 2 query, 18 routing/memory. No auth flow documented.

## Provenance

```yaml
source_domains:
  - atlona.com
  - files.bzbexpress.com
  - sep.turbifycdn.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://files.bzbexpress.com/files/attachments/17043/atlona-at-rgb1604-manual.pdf
  - https://sep.turbifycdn.com/ty/cdn/focusedtechnology/at-rgb1604.pdf
  - https://atlona.com/
retrieved_at: 2026-06-07T20:17:33.842Z
last_checked_at: 2026-06-09T07:14:35.220Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:14:35.220Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions match literally with source commands; transport parameters verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input/output count not stated in the refined excerpt; AT-RGB1604 model name implies 16-input/4-output but this is not stated in the source text itself."
- "flow control not stated in source"
- "no response/acknowledgement format documented in source. Responses are mentioned in the form of query results (e.g. Status, /*Type, /^Version, SG) but their exact wire format is not stated."
- "no settable parameters beyond the discrete action commands above. Section omitted if not applicable."
- "no unsolicited notifications documented in source."
- "no multi-step sequences documented in source."
- "no safety warnings, interlock procedures, or power-on sequencing requirements documented in source."
- "response/ack wire format not stated in source."
- "maximum input and output counts not stated in source (model name implies 16x4 but unverified)."
- "flow control (RTS/CTS, XON/XOFF, none) not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
