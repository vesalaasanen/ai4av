---
spec_id: admin/atlona-at-hd-v42m-version2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HD-V42M Version2 Control Spec"
manufacturer: Atlona
model_family: "AT-HD-V42M Version2"
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - "AT-HD-V42M Version2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-HD-V42M_v2.pdf
retrieved_at: 2026-06-14T18:55:10.140Z
last_checked_at: 2026-06-22T12:17:39.412Z
generated_at: 2026-06-22T12:17:39.412Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no TCP/IP control documented in source; no auth credentials stated (only a password-reset command); buzzer default state unknown; firmware version returned at runtime only"
  - "flow control not stated in source"
  - "exact response format not documented in source"
  - "device may emit async feedback on routing changes but source does not state this."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "exact valid range of input/output numbers for this specific 4×2 model not explicitly bounded in source; group count limit not stated; default buzzer state unknown; terminator selection rule per command not specified (source lists several valid terminators without mapping each to a command)."
verification:
  verdict: verified
  checked_at: 2026-06-22T12:17:39.412Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched verbatim in source; transport parameters verified; complete command-set coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Atlona AT-HD-V42M Version2 Control Spec

## Summary
The Atlona AT-HD-V42M Version2 is a 4-input by 2-output HDMI matrix router with RS-232C serial control via a 9-pin D-sub connector. This spec covers the documented serial command set: system commands, video/audio/both routing, output grouping, memory save/recall/clear, and status queries.

<!-- UNRESOLVED: no TCP/IP control documented in source; no auth credentials stated (only a password-reset command); buzzer default state unknown; firmware version returned at runtime only -->

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
  type: none  # inferred: no auth procedure in source (password reset command exists but no login sequence documented)
```

## Traits
```yaml
traits:
  - routable    # inferred: input/output routing commands present
  - queryable   # inferred: status/version/group query commands present
```

## Actions
```yaml
# Source note: "The command codes are very sensitive, do not change capitalization,
# spacing, or lettering." Each line must end with one of: . ; ! " $ &
# Variables per source: X = input number, W/Y/Z = output numbers, G = group number, N = memory number (0-9)

- id: query_type
  label: Acquire Model Information
  kind: query
  command: "/*Type"
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+xxxxxxxx"  # 9-digit password
  params:
    - name: password
      type: string
      description: New password, exactly 9 digits

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

- id: bell_off
  label: Buzzer Off
  kind: action
  command: "/:BellOff"
  params: []

- id: bell_on
  label: Buzzer On
  kind: action
  command: "/:BellOn"
  params: []

- id: query_version
  label: Acquire Software Version
  kind: query
  command: "/^Version"
  params: []

- id: route_input_to_all
  label: Transfer Input To All Outputs
  kind: action
  command: "[X]All."
  params:
    - name: X
      type: integer
      description: Input number

- id: mirror_all
  label: Mirror All Inputs To Matching Outputs
  kind: action
  command: "All#."
  params: []

- id: all_outputs_off
  label: Switch Off All Outputs
  kind: action
  command: "All$."
  params: []

- id: mirror_input
  label: Mirror Input To Corresponding Output
  kind: action
  command: "X#."
  params:
    - name: X
      type: integer
      description: Input number

- id: route_video_single
  label: Route Video (single output)
  kind: action
  command: "XVY."
  params:
    - name: X
      type: integer
      description: Input number
    - name: Y
      type: integer
      description: Output number

- id: route_video_multi
  label: Route Video (multiple outputs)
  kind: action
  command: "XVW,Y,Z."
  params:
    - name: X
      type: integer
      description: Input number
    - name: W
      type: integer
      description: First output number
    - name: Y
      type: integer
      description: Second output number
    - name: Z
      type: integer
      description: Third output number

- id: route_audio_single
  label: Route Audio (single output)
  kind: action
  command: "XAY."
  params:
    - name: X
      type: integer
      description: Input number
    - name: Y
      type: integer
      description: Output number

- id: route_audio_multi
  label: Route Audio (multiple outputs)
  kind: action
  command: "XAW,Y,Z."
  params:
    - name: X
      type: integer
      description: Input number
    - name: W
      type: integer
      description: First output number
    - name: Y
      type: integer
      description: Second output number
    - name: Z
      type: integer
      description: Third output number

- id: route_both_single
  label: Route Video And Audio (single output)
  kind: action
  command: "XBY."
  params:
    - name: X
      type: integer
      description: Input number
    - name: Y
      type: integer
      description: Output number

- id: route_both_multi
  label: Route Video And Audio (multiple outputs)
  kind: action
  command: "XBW,Y,Z."
  params:
    - name: X
      type: integer
      description: Input number
    - name: W
      type: integer
      description: First output number
    - name: Y
      type: integer
      description: Second output number
    - name: Z
      type: integer
      description: Third output number

- id: route_input_to_group
  label: Route Input To Output Group
  kind: action
  command: "XPG."
  params:
    - name: X
      type: integer
      description: Input number
    - name: G
      type: integer
      description: Group number

- id: form_group
  label: Form Output Group
  kind: action
  command: "GPPW,Y,Z."
  params:
    - name: G
      type: integer
      description: Group number
    - name: W
      type: integer
      description: First output number
    - name: Y
      type: integer
      description: Second output number
    - name: Z
      type: integer
      description: Third output number

- id: save_memory
  label: Save Routes To Memory
  kind: action
  command: "SaveN."
  params:
    - name: N
      type: integer
      description: Memory number (0 to 9)

- id: recall_memory
  label: Recall Saved Routes
  kind: action
  command: "RecallN."
  params:
    - name: N
      type: integer
      description: Memory number (0 to 9)

- id: clear_memory
  label: Clear Memory
  kind: action
  command: "ClearN."
  params:
    - name: N
      type: integer
      description: Memory number (0 to 9)
- id: query_group
  label: Query Group Membership
  kind: query
  command: "SG."
  params:
    - name: G
      type: integer
      description: Group number

- id: query_input_status
  label: Query Outputs Connected To Input
  kind: query
  command: "StatusX."
  params:
    - name: X
      type: integer
      description: Input number

- id: query_full_status
  label: Query Full Routing Status
  kind: query
  command: "Status."
  params: []
```

## Feedbacks
```yaml
- id: model_information
  type: string
  description: Response to /*Type - matrix model information
  # UNRESOLVED: exact response format not documented in source

- id: software_version
  type: string
  description: Response to /^Version - software version
  # UNRESOLVED: exact response format not documented in source

- id: group_membership
  type: string
  description: Response to SG - which outputs are in group G
  # UNRESOLVED: exact response format not documented in source

- id: input_routing_status
  type: string
  description: Response to StatusX - which outputs connected to input X
  # UNRESOLVED: exact response format not documented in source

- id: full_routing_status
  type: string
  description: Response to Status - which inputs with which outputs
  # UNRESOLVED: exact response format not documented in source
```

## Variables
```yaml
# No settable continuous parameters documented in source.
# Routing state, group membership, and memory are discrete actions, not variables.
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: device may emit async feedback on routing changes but source does not state this.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Command codes are case- and spacing-sensitive; do not alter capitalization, spacing, or lettering.
- Every command line must end with one of the terminator characters: `.` `;` `!` `"` `$` `&`. Without a terminator the code will fail.
- RS-232 pinout (9-pin female D): Pin 2 = Tx, Pin 3 = Rx, Pin 5 = Gnd; all other pins unused.
- Matrix is 4 inputs × 2 outputs (model name HD-V42M); source's "outputs 4,7,8" style examples appear to be generic command-syntax illustrations rather than literal port counts for this model.
- `/+xxxxxxxx` resets password to a 9-digit value; no default password or login handshake is documented.
<!-- UNRESOLVED: exact valid range of input/output numbers for this specific 4×2 model not explicitly bounded in source; group count limit not stated; default buzzer state unknown; terminator selection rule per command not specified (source lists several valid terminators without mapping each to a command). -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-HD-V42M_v2.pdf
retrieved_at: 2026-06-14T18:55:10.140Z
last_checked_at: 2026-06-22T12:17:39.412Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-22T12:17:39.412Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched verbatim in source; transport parameters verified; complete command-set coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no TCP/IP control documented in source; no auth credentials stated (only a password-reset command); buzzer default state unknown; firmware version returned at runtime only"
- "flow control not stated in source"
- "exact response format not documented in source"
- "device may emit async feedback on routing changes but source does not state this."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "exact valid range of input/output numbers for this specific 4×2 model not explicitly bounded in source; group count limit not stated; default buzzer state unknown; terminator selection rule per command not specified (source lists several valid terminators without mapping each to a command)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
