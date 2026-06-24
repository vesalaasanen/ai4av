---
spec_id: admin/atlona-at-video1604-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-VIDEO1604 Control Spec"
manufacturer: Atlona
model_family: AT-VIDEO1604
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-VIDEO1604
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/support/
retrieved_at: 2026-06-03T20:43:10.599Z
last_checked_at: 2026-06-23T09:27:14.342Z
generated_at: 2026-06-23T09:27:14.342Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "number of inputs and outputs not explicitly stated in source; device name implies 16 inputs × 4 outputs but this is not confirmed in the extracted source text"
  - "flow control not stated in source; omitted as no mention found"
  - "no variable state parameters beyond routing and memory documented in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step macros described in source"
  - "exact input/output count for the AT-VIDEO1604 not confirmed in the source text; the model name suggests 16×4 but this is not explicitly stated"
  - "response format and acknowledgement strings for routing commands not documented in source"
  - "flow control (RTS/CTS, XON/XOFF) not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-23T09:27:14.342Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions match source commands; transport parameters verified; compact wire form confirmed by source examples. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Atlona AT-VIDEO1604 Control Spec

## Summary
The Atlona AT-VIDEO1604 is a video matrix switcher controllable via RS-232C serial connection. This spec covers the full RS-232 command set for routing video and audio signals between inputs and outputs, managing output groups, saving and recalling routing memories, and system operations such as locking the keyboard and querying device information.

<!-- UNRESOLVED: number of inputs and outputs not explicitly stated in source; device name implies 16 inputs × 4 outputs but this is not confirmed in the extracted source text -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source; omitted as no mention found
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable    # inferred from routing command examples
- queryable   # inferred from query command examples (Status, /*Type, /^Version)
```

## Actions
```yaml
# NOTE: Commands are case-sensitive. Each command must end with one of: . ; ! $ &
# Do NOT append a carriage return to any command.
# Variables: X = input number, W/Y/Z = output numbers, G = group number, N = memory number (0-9)

- id: get_matrix_model
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
      description: 9-digit password to set (replace xxxxxxxx with 9 digits)

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
  label: Turn Buzzer Off
  kind: action
  command: "/:BellOff;"
  params: []

- id: buzzer_on
  label: Turn Buzzer On
  kind: action
  command: "/:BellOn;"
  params: []

- id: get_software_version
  label: Get Software Version
  kind: query
  command: "/^Version;"
  params: []

- id: route_input_to_all_outputs
  label: Transfer Input to All Outputs
  kind: action
  command: "[ X ]All."
  params:
    - name: X
      type: integer
      description: Input number

- id: mirror_all_inputs_to_matching_outputs
  label: Mirror All Inputs to Matching Outputs
  kind: action
  command: "All#."
  params: []

- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$."
  params: []

- id: mirror_input_to_matching_output
  label: Mirror Input Number to Corresponding Output
  kind: action
  command: "X#."
  params:
    - name: X
      type: integer
      description: Input number (routes input X to output X)

- id: route_video_input_to_output
  label: Transfer Video from Input to Output
  kind: action
  command: "XVY."
  params:
    - name: X
      type: integer
      description: Input number
    - name: Y
      type: integer
      description: Output number

- id: route_video_input_to_multiple_outputs
  label: Transfer Video from Input to Multiple Outputs
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
      description: Additional output number(s), comma-separated

- id: route_audio_input_to_output
  label: Transfer Audio from Input to Output
  kind: action
  command: "XAY."
  params:
    - name: X
      type: integer
      description: Input number
    - name: Y
      type: integer
      description: Output number

- id: route_audio_input_to_multiple_outputs
  label: Transfer Audio from Input to Multiple Outputs
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
      description: Additional output number(s), comma-separated

- id: route_av_input_to_output
  label: Transfer Both Video and Audio from Input to Output
  kind: action
  command: "XBY."
  params:
    - name: X
      type: integer
      description: Input number
    - name: Y
      type: integer
      description: Output number

- id: route_av_input_to_multiple_outputs
  label: Transfer Both Video and Audio from Input to Multiple Outputs
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
      description: Additional output number(s), comma-separated

- id: route_input_to_output_group
  label: Transfer Audio and Video from Input to Output Group
  kind: action
  command: "XPG."
  params:
    - name: X
      type: integer
      description: Input number
    - name: G
      type: integer
      description: Group number

- id: form_output_group
  label: Form Output Group from Specified Outputs
  kind: action
  command: "GPPW,Y,Z."
  params:
    - name: G
      type: integer
      description: Group number to create
    - name: W
      type: integer
      description: First output number
    - name: Y
      type: integer
      description: Second output number
    - name: Z
      type: integer
      description: Additional output number(s), comma-separated

- id: query_group_outputs
  label: Query Which Outputs Are in a Group
  kind: query
  command: "SG."
  params:
    - name: G
      type: integer
      description: Group number

- id: query_input_status
  label: Query Which Outputs Are Connected to an Input
  kind: query
  command: "StatusX."
  params:
    - name: X
      type: integer
      description: Input number

- id: query_all_status
  label: Query All Input-to-Output Routing Status
  kind: query
  command: "Status."
  params: []

- id: save_route_memory
  label: Save Current Routes to Memory
  kind: action
  command: "SaveN."
  params:
    - name: N
      type: integer
      description: Memory slot number (0-9)

- id: recall_route_memory
  label: Recall Saved Route Memory
  kind: action
  command: "RecallN."
  params:
    - name: N
      type: integer
      description: Memory slot number (0-9)

- id: clear_route_memory
  label: Clear Route Memory
  kind: action
  command: "ClearN."
  params:
    - name: N
      type: integer
      description: Memory slot number (0-9)
```

## Feedbacks
```yaml
- id: matrix_model_info
  type: string
  description: Response to /*Type; - returns matrix model information

- id: software_version
  type: string
  description: Response to /^Version; - returns software version string

- id: group_outputs
  type: string
  description: Response to SG. - returns which outputs belong to the specified group

- id: input_status
  type: string
  description: Response to StatusX. - returns which outputs are connected to the specified input

- id: all_routing_status
  type: string
  description: Response to Status. - returns all current input-to-output routing assignments
```

## Variables
```yaml
# UNRESOLVED: no variable state parameters beyond routing and memory documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No explicit safety warnings or interlock procedures found in source.
```

## Notes
Commands are case-sensitive — do not change capitalization, spacing, or lettering. Each command line must end with one of the following terminators: `.` `;` `!` `$` or `&`. Do not append a carriage return (`\r`) to any command as this may cause failure.

The RS-232 connector is a 9-pin female D-sub with only pins 2 (Tx), 3 (Rx), and 5 (Gnd) used; all other pins are unassigned.

Password reset command (`/+xxxxxxxx;`) requires exactly 9 digits.

For multi-output routing commands (`XVW,Y,Z.`, `XAW,Y,Z.`, `XBW,Y,Z.`, `GPPW,Y,Z.`), additional output numbers beyond the three shown in the template are comma-separated in the same pattern.

<!-- UNRESOLVED: exact input/output count for the AT-VIDEO1604 not confirmed in the source text; the model name suggests 16×4 but this is not explicitly stated -->
<!-- UNRESOLVED: response format and acknowledgement strings for routing commands not documented in source -->
<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF) not stated in source -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/support/
retrieved_at: 2026-06-03T20:43:10.599Z
last_checked_at: 2026-06-23T09:27:14.342Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T09:27:14.342Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions match source commands; transport parameters verified; compact wire form confirmed by source examples. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "number of inputs and outputs not explicitly stated in source; device name implies 16 inputs × 4 outputs but this is not confirmed in the extracted source text"
- "flow control not stated in source; omitted as no mention found"
- "no variable state parameters beyond routing and memory documented in source"
- "no unsolicited notifications documented in source"
- "no multi-step macros described in source"
- "exact input/output count for the AT-VIDEO1604 not confirmed in the source text; the model name suggests 16×4 but this is not explicitly stated"
- "response format and acknowledgement strings for routing commands not documented in source"
- "flow control (RTS/CTS, XON/XOFF) not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
