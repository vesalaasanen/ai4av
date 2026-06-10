---
spec_id: admin/atlona-at-rgb2416
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-RGB2416 Control Spec"
manufacturer: Atlona
model_family: AT-RGB2416
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-RGB2416
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-RGB-MATRIX.pdf
  - https://atlona.com
retrieved_at: 2026-06-07T20:19:13.987Z
last_checked_at: 2026-06-09T07:14:35.958Z
generated_at: 2026-06-09T07:14:35.958Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no feedback/response string formats documented; no safety procedures; no macros; no events"
  - "source documents a password-reset command (/+xxxxxxxx;) implying a password exists, but does not describe the login procedure or default credentials"
  - "source describes queries (Status, StatusX, SG, /^Version, /*Type) and gives"
  - "source contains no settable parameter that is not already covered by"
  - "no unsolicited notifications documented in source. Section removed"
  - "no multi-step sequences documented in source. Section removed from"
  - "source contains no safety warnings, interlock procedures, or"
  - "no firmware version range stated; no Telnet/IP control path documented (RS-232 only per source); exact input/output count limits not stated in the refined excerpt though the model number \"RGB2416\" suggests 24-in/16-out, this is not confirmed in the source text."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:14:35.958Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched verbatim against source commands; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-07
---

# Atlona AT-RGB2416 Control Spec

## Summary
RS-232-controlled RGBHV matrix switcher. Spec covers ASCII command set for routing, group management, memory, and system control over a DB-9 serial connection at 9600 8N1.

<!-- UNRESOLVED: no feedback/response string formats documented; no safety procedures; no macros; no events -->

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
  pinout:
    tx: 2
    rx: 3
    gnd: 5
auth:
  type: null  # UNRESOLVED: source documents a password-reset command (/+xxxxxxxx;) implying a password exists, but does not describe the login procedure or default credentials
```

## Traits
```yaml
- routable  # inferred from X V Y / X A Y / X B Y routing commands
- queryable  # inferred from Status, StatusX, SG, /^Version, /*Type queries
```

## Actions
```yaml
- id: get_model_info
  label: Get Model Info
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
      description: New password, exactly 9 digits

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

- id: get_software_version
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
      description: Input number (1-based)

- id: mirror_all_inputs_to_outputs
  label: Mirror All Inputs To Matching Outputs
  kind: action
  command: "All#."
  params: []

- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$."
  params: []

- id: mirror_input_to_matching_output
  label: Mirror Input To Corresponding Output
  kind: action
  command: "{input}#."
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: route_video_single
  label: Route Video To Single Output
  kind: action
  command: "{input}V{output}."
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)

- id: route_video_multi
  label: Route Video To Multiple Outputs
  kind: action
  command: "{input}V{output1},{output2},{output3}."
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output1
      type: integer
      description: First output number (1-based)
    - name: output2
      type: integer
      description: Second output number (1-based)
    - name: output3
      type: integer
      description: Third output number (1-based)

- id: route_audio_single
  label: Route Audio To Single Output
  kind: action
  command: "{input}A{output}."
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)

- id: route_audio_multi
  label: Route Audio To Multiple Outputs
  kind: action
  command: "{input}A{output1},{output2},{output3}."
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output1
      type: integer
      description: First output number (1-based)
    - name: output2
      type: integer
      description: Second output number (1-based)
    - name: output3
      type: integer
      description: Third output number (1-based)

- id: route_both_single
  label: Route Audio And Video To Single Output
  kind: action
  command: "{input}B{output}."
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)

- id: route_both_multi
  label: Route Audio And Video To Multiple Outputs
  kind: action
  command: "{input}B{output1},{output2},{output3}."
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output1
      type: integer
      description: First output number (1-based)
    - name: output2
      type: integer
      description: Second output number (1-based)
    - name: output3
      type: integer
      description: Third output number (1-based)

- id: route_to_group
  label: Route Input To Output Group
  kind: action
  command: "{input}P{group}."
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: group
      type: integer
      description: Group number (1-based)

- id: form_group
  label: Form Output Group
  kind: action
  command: "{group}PP{output1},{output2},{output3}."
  params:
    - name: group
      type: integer
      description: Group number to assign (1-based)
    - name: output1
      type: integer
      description: First output number (1-based)
    - name: output2
      type: integer
      description: Second output number (1-based)
    - name: output3
      type: integer
      description: Third output number (1-based)

- id: get_group_members
  label: Get Group Members
  kind: query
  command: "S{group}."
  params:
    - name: group
      type: integer
      description: Group number (1-based)

- id: get_outputs_for_input
  label: Get Outputs Connected To Input
  kind: query
  command: "Status{input}."
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: get_full_routing_status
  label: Get Full Routing Status
  kind: query
  command: "Status."
  params: []

- id: save_routes_to_memory
  label: Save Current Routes To Memory
  kind: action
  command: "Save{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number (0-9)

- id: recall_routes_from_memory
  label: Recall Routes From Memory
  kind: action
  command: "Recall{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number (0-9)

- id: clear_memory
  label: Clear Saved Memory
  kind: action
  command: "Clear{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number (0-9)
```

## Feedbacks
```yaml
# UNRESOLVED: source describes queries (Status, StatusX, SG, /^Version, /*Type) and gives
# prose descriptions of their results, but does not document the literal response
# string format the device returns. Cannot enumerate Feedbacks without fabrication.
```

## Variables
```yaml
# UNRESOLVED: source contains no settable parameter that is not already covered by
# the discrete Actions above. Section retained per template; populate if future
# revisions add continuous-parameter commands (gain, brightness, etc.).
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source. Section removed
# from spec (template retained for reference).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source. Section removed from
# spec (template retained for reference).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
Command terminator is a single character drawn from `. ; ! " $ &`. Each line of the command protocol must end in one of these terminators or the code will fail. The source uses `.` for routing/memory/group commands and `;` for system commands (`/*Type;`, `/^Version;`, `/+xxxxxxxx;`, `/%Lock;`, `/%Unlock;`, `/:BellOff;`, `/:BellOn;`).

Bracketed placeholder `[X]` in `[X]All.` is positional syntax, not literal characters; substitute the input number inside the brackets. The source's note "do not change capitalization, spacing, or lettering" applies to command keywords; parameter placeholders (X/W/Y/Z/G/N) are uppercase letters representing integer values.

The device appears to support separate audio and video routing (X A Y vs X V Y) and combined routing (X B Y), indicating independent A/V planes. Group routing (X P G) operates on pre-formed output groups.

Password-related: the source documents a password-reset command but no default password, login sequence, or session/authentication protocol. Treat any password interaction as UNRESOLVED at the protocol level.

<!-- UNRESOLVED: no firmware version range stated; no Telnet/IP control path documented (RS-232 only per source); exact input/output count limits not stated in the refined excerpt though the model number "RGB2416" suggests 24-in/16-out, this is not confirmed in the source text. -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://atlona.com/pdf/manuals/AT-RGB-MATRIX.pdf
  - https://atlona.com
retrieved_at: 2026-06-07T20:19:13.987Z
last_checked_at: 2026-06-09T07:14:35.958Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:14:35.958Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched verbatim against source commands; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no feedback/response string formats documented; no safety procedures; no macros; no events"
- "source documents a password-reset command (/+xxxxxxxx;) implying a password exists, but does not describe the login procedure or default credentials"
- "source describes queries (Status, StatusX, SG, /^Version, /*Type) and gives"
- "source contains no settable parameter that is not already covered by"
- "no unsolicited notifications documented in source. Section removed"
- "no multi-step sequences documented in source. Section removed from"
- "source contains no safety warnings, interlock procedures, or"
- "no firmware version range stated; no Telnet/IP control path documented (RS-232 only per source); exact input/output count limits not stated in the refined excerpt though the model number \"RGB2416\" suggests 24-in/16-out, this is not confirmed in the source text."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
