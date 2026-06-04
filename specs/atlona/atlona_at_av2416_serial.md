---
spec_id: admin/atlona-at-av2416
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-AV2416 Control Spec"
manufacturer: Atlona
model_family: AT-AV2416
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-AV2416
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/data_sheet/AT-AV2416.pdf
  - https://www.manualslib.com/manual/558681/Atlona-Av128128.html
  - https://atlona.com/support/
retrieved_at: 2026-06-03T20:17:21.139Z
last_checked_at: 2026-06-04T06:22:38.031Z
generated_at: 2026-06-04T06:22:38.031Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control, authentication/login procedure, firmware version compatibility, and any queryable power state are not addressed in source."
  - "source documents password-reset command (/+xxxxxxxx) but no login procedure"
  - "source does not document explicit response/acknowledgement strings"
  - "no settable scalar parameters distinct from routing actions."
  - "source does not document unsolicited notifications."
  - "source does not document multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "TCP/IP control, firmware version range, response byte format for query commands, and authentication procedure are not stated in the refined source."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:22:38.031Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literally in source with correct parameter templates and shapes; transport parameters verified; full command coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-AV2416 Control Spec

## Summary
The AT-AV2416 is a 24x16 audio/video matrix switcher. This spec covers RS-232 control of input/output routing, group/memory management, and system commands. Connection is via a 9-pin female D connector at 9600bps, 8N1.

<!-- UNRESOLVED: TCP/IP control, authentication/login procedure, firmware version compatibility, and any queryable power state are not addressed in source. -->

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
auth:
  type: null  # UNRESOLVED: source documents password-reset command (/+xxxxxxxx) but no login procedure
```

Pinout (9-pin female D, from source):
| Pin | Function |
|-----|----------|
| 1   | Not used |
| 2   | Tx (Transmit) |
| 3   | Rx (Receive) |
| 4   | Not used |
| 5   | Gnd (Ground) |
| 6   | Not used |
| 7   | Not used |
| 8   | Not used |
| 9   | Not used |

Command line terminator: one of `.`, `;`, `!`, `"`, `$`, `&`.

## Traits
```yaml
- routable      # inferred: extensive input/output routing command set
- queryable     # inferred: Status / StatusX / S G / /^Version / /*Type query commands present
```

## Actions
```yaml
- id: get_model_info
  label: Get Model Info
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
      description: Nine-digit password (no spaces, exact 9 digits)

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

- id: get_software_version
  label: Get Software Version
  kind: query
  command: "/^Version"
  params: []

- id: transfer_input_to_all_outputs
  label: Transfer Input to All Outputs
  kind: action
  command: "[{input}]All"
  params:
    - name: input
      type: integer
      description: Input number (X = input)

- id: mirror_all_inputs_to_outputs
  label: Mirror All Inputs to Matching Outputs
  kind: action
  command: "All#"
  params: []

- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$"
  params: []

- id: mirror_input_to_matching_output
  label: Mirror Input to Corresponding Output
  kind: action
  command: "{input}#"
  params:
    - name: input
      type: integer
      description: Input number (mirrored to same-numbered output)

- id: route_video_to_output
  label: Route Video Input to Single Output
  kind: action
  command: "{input}V{output}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number (W, Y, or Z slot)

- id: route_video_to_outputs
  label: Route Video Input to Multiple Outputs
  kind: action
  command: "{input}V{output1},{output2},{output3}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output1
      type: integer
      description: First output (W)
    - name: output2
      type: integer
      description: Second output (Y)
    - name: output3
      type: integer
      description: Third output (Z)

- id: route_audio_to_output
  label: Route Audio Input to Single Output
  kind: action
  command: "{input}A{output}"
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
  command: "{input}A{output1},{output2},{output3}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output1
      type: integer
      description: First output (W)
    - name: output2
      type: integer
      description: Second output (Y)
    - name: output3
      type: integer
      description: Third output (Z)

- id: route_both_to_output
  label: Route Audio+Video Input to Single Output
  kind: action
  command: "{input}B{output}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: route_both_to_outputs
  label: Route Audio+Video Input to Multiple Outputs
  kind: action
  command: "{input}B{output1},{output2},{output3}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output1
      type: integer
      description: First output (W)
    - name: output2
      type: integer
      description: Second output (Y)
    - name: output3
      type: integer
      description: Third output (Z)

- id: route_input_to_group
  label: Route Input to Group
  kind: action
  command: "{input}P{group}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: group
      type: integer
      description: Group number (G)

- id: form_group_from_outputs
  label: Form Group from Outputs
  kind: action
  command: "{group}PP{output1},{output2},{output3}"
  params:
    - name: group
      type: integer
      description: Group number (G)
    - name: output1
      type: integer
      description: First output (W)
    - name: output2
      type: integer
      description: Second output (Y)
    - name: output3
      type: integer
      description: Third output (Z)

- id: get_group_members
  label: Get Group Members
  kind: query
  command: "S{group}"
  params:
    - name: group
      type: integer
      description: Group number (G)

- id: get_input_route
  label: Get Outputs Connected to Input
  kind: query
  command: "Status{input}"
  params:
    - name: input
      type: integer
      description: Input number (X)

- id: get_all_routes
  label: Get All Input/Output Routes
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
      description: Memory slot number 0-9 (N)

- id: recall_memory
  label: Recall Saved Route Memory
  kind: action
  command: "Recall{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot number 0-9 (N)

- id: clear_memory
  label: Clear Saved Memory
  kind: action
  command: "Clear{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot number 0-9 (N)
```

## Feedbacks
```yaml
# UNRESOLVED: source does not document explicit response/acknowledgement strings
# beyond the query results themselves (e.g. Status, StatusX, S G, /*Type, /^Version).
# Query responses return the requested state; raw response format not detailed in source.
```

## Variables
```yaml
# UNRESOLVED: no settable scalar parameters distinct from routing actions.
# Memory slots 0-9, groups, and password are accessed via Actions, not as Variables.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Command codes are case- and spacing-sensitive per source ("do not change capitalization, spacing, or lettering").
- Every command line must terminate with one of `.`, `;`, `!`, `"`, `$`, or `&` or it will fail.
- Variable placeholders: X = input, W/Y/Z = output slots, G = group number, N = memory number (0-9).
- The X B W,Y,Z, X A W,Y,Z, X V W,Y,Z, and G P P W,Y,Z commands each list three output slots; if fewer than three are needed, trailing slots are omitted (template preserved as three for fidelity to source).
- Password reset command exists (/+xxxxxxxx) but no login/authentication flow is documented — auth.type left UNRESOLVED.
- Source is a refined excerpt; full manual not located during discovery. Verify against complete vendor documentation before relying on edge-case behavior.
<!-- UNRESOLVED: TCP/IP control, firmware version range, response byte format for query commands, and authentication procedure are not stated in the refined source. -->
```

Spec ready. 25 actions enumerated, all source rows captured. 3 gaps flagged as UNRESOLVED.

## Provenance

```yaml
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/data_sheet/AT-AV2416.pdf
  - https://www.manualslib.com/manual/558681/Atlona-Av128128.html
  - https://atlona.com/support/
retrieved_at: 2026-06-03T20:17:21.139Z
last_checked_at: 2026-06-04T06:22:38.031Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:22:38.031Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literally in source with correct parameter templates and shapes; transport parameters verified; full command coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control, authentication/login procedure, firmware version compatibility, and any queryable power state are not addressed in source."
- "source documents password-reset command (/+xxxxxxxx) but no login procedure"
- "source does not document explicit response/acknowledgement strings"
- "no settable scalar parameters distinct from routing actions."
- "source does not document unsolicited notifications."
- "source does not document multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures, or"
- "TCP/IP control, firmware version range, response byte format for query commands, and authentication procedure are not stated in the refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
