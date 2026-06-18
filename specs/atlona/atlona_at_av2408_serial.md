---
spec_id: admin/atlona-at-av2408
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-AV2408 Control Spec"
manufacturer: Atlona
model_family: AT-AV2408
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-AV2408
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
  - https://atlona.com/
retrieved_at: 2026-06-16T06:29:45.582Z
last_checked_at: 2026-06-16T07:00:47.438Z
generated_at: 2026-06-16T07:00:47.438Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device matrix dimensions (input/output counts) not stated in refined source; only model name AT-AV2408 given. Output/input numbering ranges inferred from sibling products in family, not from this source."
  - "flow control not stated in source"
  - "exact response string formats for each query are not shown in"
  - "no settable continuous/level parameters documented in source."
  - "no unsolicited notification messages documented in source."
  - "no multi-step sequences documented in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "device matrix dimensions (input/output counts) not stated in refined source."
  - "exact response string formats for queries not shown in source."
  - "valid range/count of outputs in multi-output routing not stated beyond 3-output examples."
  - "flow_control not stated in source."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:00:47.438Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions match literal command tokens in source; transport parameters verified; complete coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Atlona AT-AV2408 Control Spec

## Summary
Atlona AT-AV2408 AV matrix switcher, controlled via RS-232C serial. Spec covers the full documented command set: model/version queries, keyboard lock, buzzer, video/audio/audio+video routing to single or multiple outputs, output groups, route mirroring, route memory save/recall/clear, and routing status queries.

<!-- UNRESOLVED: device matrix dimensions (input/output counts) not stated in refined source; only model name AT-AV2408 given. Output/input numbering ranges inferred from sibling products in family, not from this source. -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Traits supported by evidence from source:
# - routable    (XVY/XAY/XBY routing commands present)
# - queryable   (Status, /*Type;, /^Version;, SG queries present)
traits:
  - routable
  - queryable
```

## Actions
```yaml
# Coverage: every distinct command row from the refined source. Variable tokens:
#   X = input number, W/Y/Z = output number, G = group number, N = memory number (0-9).
# Terminator: each command line MUST end with one of: . ; ! " $ &  (see Notes).
#
# --- System commands ---
- id: query_model_info
  label: Acquire Model Information
  kind: query
  command: "/*Type;"
  params: []

- id: reset_password
  label: Reset Password
  kind: action
  command: "/+{digits};"
  params:
    - name: digits
      type: string
      description: New password, must be exactly 9 digits

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

- id: query_software_version
  label: Acquire Software Version
  kind: query
  command: "/^Version;"
  params: []

# --- Routing: whole-matrix ---
- id: transfer_input_to_all_outputs
  label: Transfer Input to All Outputs
  kind: action
  command: "[ {input} ]All."
  params:
    - name: input
      type: integer
      description: Input number to send to every output

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

# --- Routing: single input ---
- id: mirror_input_to_output
  label: Mirror Input to Matching Output
  kind: action
  command: "{input}#."
  params:
    - name: input
      type: integer
      description: Input number mirrored to same-numbered output (e.g. 3#. = input 3 to output 3)

- id: route_video_single
  label: Route Video (single output)
  kind: action
  command: "{input}V{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number (e.g. 2V3. = input 2 video to output 3)

- id: route_video_multi
  label: Route Video (multiple outputs)
  kind: action
  command: "{input}V{w},{y},{z}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: w
      type: integer
      description: First output (e.g. 2V4,7,8. = input 2 video to outputs 4, 7, and 8)
    - name: y
      type: integer
      description: Second output
    - name: z
      type: integer
      description: Third output

- id: route_audio_single
  label: Route Audio (single output)
  kind: action
  command: "{input}A{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number (e.g. 4A3. = input 4 audio to output 3)

- id: route_audio_multi
  label: Route Audio (multiple outputs)
  kind: action
  command: "{input}A{w},{y},{z}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: w
      type: integer
      description: First output (e.g. 1A2,4,6. = input 1 audio to outputs 2, 4, 6)
    - name: y
      type: integer
      description: Second output
    - name: z
      type: integer
      description: Third output

- id: route_av_single
  label: Route Audio+Video (single output)
  kind: action
  command: "{input}B{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number (e.g. 3B2. = input 3 to output 2)

- id: route_av_multi
  label: Route Audio+Video (multiple outputs)
  kind: action
  command: "{input}B{w},{y},{z}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: w
      type: integer
      description: First output (e.g. 4B3,4,5. = input 4 to outputs 3, 4, 5)
    - name: y
      type: integer
      description: Second output
    - name: z
      type: integer
      description: Third output

# --- Output groups ---
- id: route_input_to_group
  label: Route Audio+Video to Output Group
  kind: action
  command: "{input}P{group}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: group
      type: integer
      description: Group number (e.g. 3P2. = input 3 to group 2)

- id: form_group
  label: Form Output Group
  kind: action
  command: "{group}PP{w},{y},{z}."
  params:
    - name: group
      type: integer
      description: Group number being defined
    - name: w
      type: integer
      description: First output in group (e.g. 2PP4,5,6. = outputs 4,5,6 form group 2)
    - name: y
      type: integer
      description: Second output in group
    - name: z
      type: integer
      description: Third output in group

- id: query_group_members
  label: Acquire Group Members
  kind: query
  command: "S{group}."
  params:
    - name: group
      type: integer
      description: Group number (e.g. S2. returns outputs in group 2)

# --- Status queries ---
- id: query_outputs_on_input
  label: Acquire Outputs Connected to Input
  kind: query
  command: "Status{input}."
  params:
    - name: input
      type: integer
      description: Input number (e.g. Status2. returns outputs tied to input 2)

- id: query_all_routing
  label: Acquire Full Routing State
  kind: query
  command: "Status."
  params: []

# --- Memory (0-9) ---
- id: save_routes
  label: Save Routes to Memory
  kind: action
  command: "Save{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot 0-9 (e.g. Save4.)

- id: recall_routes
  label: Recall Routes from Memory
  kind: action
  command: "Recall{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot 0-9 (e.g. Recall4.)

- id: clear_memory
  label: Clear Memory Slot
  kind: action
  command: "Clear{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot 0-9 (e.g. Clear4.)
```

## Feedbacks
```yaml
- id: model_info
  type: string
  source_query: query_model_info
  description: Matrix model information returned by /*Type;

- id: software_version
  type: string
  source_query: query_software_version
  description: Software version string returned by /^Version;

- id: group_membership
  type: string
  source_query: query_group_members
  description: List of outputs assigned to a group, returned by S{group}.

- id: input_outputs
  type: string
  source_query: query_outputs_on_input
  description: Outputs currently tied to an input, returned by Status{input}.

- id: full_routing_state
  type: string
  source_query: query_all_routing
  description: Full input/output routing map returned by Status.

# UNRESOLVED: exact response string formats for each query are not shown in
# source - only the command and prose description of what is returned.
```

## Variables
```yaml
# UNRESOLVED: no settable continuous/level parameters documented in source.
# All documented operations are discrete commands (see Actions).
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification messages documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Command codes are case-sensitive — do not change capitalization, spacing, or lettering (source warning).
- Line terminator required: each command MUST end with one of `.`, `;`, `!`, `"`, `$`, or `&`. Without the end character the code will fail.
- Variable tokens used in source: `X` = input, `W`/`Y`/`Z` = output number, `G` = group number, `N` = memory number.
- Memories range 0-9 (10 slots).
- Multi-output routing examples in source show exactly three outputs (W,Y,Z); source does not state whether 1, 2, or >3 outputs are valid — the parameterized templates above mirror the source's three-output examples verbatim.
- RS-232 connector: 9-pin female D-sub. Pin 2 = Tx, Pin 3 = Rx, Pin 5 = Gnd; pins 1,4,6,7,8,9 unused.

<!-- UNRESOLVED: device matrix dimensions (input/output counts) not stated in refined source. -->
<!-- UNRESOLVED: exact response string formats for queries not shown in source. -->
<!-- UNRESOLVED: valid range/count of outputs in multi-output routing not stated beyond 3-output examples. -->
<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://www.manualslib.com/manual/558681/Atlona-Av128128.html
  - https://atlona.com/
retrieved_at: 2026-06-16T06:29:45.582Z
last_checked_at: 2026-06-16T07:00:47.438Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:00:47.438Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions match literal command tokens in source; transport parameters verified; complete coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device matrix dimensions (input/output counts) not stated in refined source; only model name AT-AV2408 given. Output/input numbering ranges inferred from sibling products in family, not from this source."
- "flow control not stated in source"
- "exact response string formats for each query are not shown in"
- "no settable continuous/level parameters documented in source."
- "no unsolicited notification messages documented in source."
- "no multi-step sequences documented in source."
- "source contains no safety warnings, interlock procedures, or"
- "device matrix dimensions (input/output counts) not stated in refined source."
- "exact response string formats for queries not shown in source."
- "valid range/count of outputs in multi-output routing not stated beyond 3-output examples."
- "flow_control not stated in source."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
