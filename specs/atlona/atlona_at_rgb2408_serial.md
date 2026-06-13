---
spec_id: admin/atlona-at-rgb2408
schema_version: ai4av-public-spec-v1
revision: 2
title: "Atlona AT-RGB2408 Control Spec"
manufacturer: Atlona
model_family: AT-RGB2408
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-RGB2408
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-RGB-MATRIX.pdf
retrieved_at: 2026-06-12T02:01:56.267Z
last_checked_at: 2026-06-12T19:09:51.259Z
generated_at: 2026-06-12T19:09:51.259Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command terminator for operation commands is not explicitly stated; the only example ends with `.` while system commands consistently use `;`. Treat the terminator as documented `;` for system commands and ambiguous for operation commands until verified against a real device."
  - "not stated in source; default assumption omitted"
  - "no continuously-settable variable parameters (volume, gain, level) are"
  - "source does not document unsolicited notifications."
  - "source does not document named multi-step sequences beyond Save/Recall presets."
  - "source contains no safety warnings, interlock procedures, or"
  - "input/output channel count (24×8 inferred from model number, not source)."
  - "default password and whether auth is required on serial connect."
  - "command terminator for operation (non-system) commands."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:09:51.259Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions have exact literal matches in the source command table; transport parameters verified; complete one-to-one coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-RGB2408 Control Spec

## Summary
The AT-RGB2408 is an RGB matrix switcher controllable via RS-232 from a PC, third-party automation, or the bundled SWITCHER 2.0 software. Commands are issued as ASCII strings terminated with `;` (system commands) or sent as routing sequences in the form `[input][type][output](.[input][type][output])*`.

<!-- UNRESOLVED: command terminator for operation commands is not explicitly stated; the only example ends with `.` while system commands consistently use `;`. Treat the terminator as documented `;` for system commands and ambiguous for operation commands until verified against a real device. -->

## Transport
```yaml
# RS-232 only - no TCP/IP control documented in this source.
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: not stated in source; default assumption omitted
auth:
  type: password  # inferred from /+xxxxxxxx; password-rewrite command in source
```

## Traits
```yaml
- routable   # inferred from input/output routing command examples
- queryable  # inferred from Status, /*Type, /^Version, S[x] query commands
```

## Actions
```yaml
# System commands - ASCII, semicolon-terminated per source examples.

- id: get_model_info
  label: Get Model Information
  kind: query
  command: "/*Type;"
  params: []

- id: set_password
  label: Set Password
  kind: action
  command: "/+{password};"
  params:
    - name: password
      type: string
      description: 8-digit password per source documentation

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

- id: switch_to_creator2
  label: Switch to CREATOR 2.0 Command System
  kind: action
  command: "/~CREATOR20;"
  params: []

# Operation commands - primary ASCII routing set.

- id: route_input_to_all_outputs
  label: Route Input to All Outputs
  kind: action
  command: "{input}All"
  params:
    - name: input
      type: integer
      description: Input channel number

- id: route_all_matching
  label: Mirror Route (Input N → Output N)
  kind: action
  command: "All#"
  params: []

- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$"
  params: []

- id: route_input_to_matching_output
  label: Route Input N to Output N
  kind: action
  command: "{input}#"
  params:
    - name: input
      type: integer
      description: Input channel number (output = same number)

- id: switch_off_one_output
  label: Switch Off One Output
  kind: action
  command: "{output}$"
  params:
    - name: output
      type: integer
      description: Output channel number to switch off

- id: route_video
  label: Route Video Only (Single Output)
  kind: action
  command: "{input} V{output}"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number

- id: route_video_multi
  label: Route Video Only (Multiple Outputs)
  kind: action
  command: "{input} V{output1},{output2},{output3}"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output1
      type: integer
      description: First output channel
    - name: output2
      type: integer
      description: Second output channel
    - name: output3
      type: integer
      description: Third output channel

- id: route_audio
  label: Route Audio Only (Single Output)
  kind: action
  command: "{input} A{output}"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number

- id: route_audio_multi
  label: Route Audio Only (Multiple Outputs)
  kind: action
  command: "{input} A{output1},{output2},{output3}"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output1
      type: integer
      description: First output channel
    - name: output2
      type: integer
      description: Second output channel
    - name: output3
      type: integer
      description: Third output channel

- id: route_both
  label: Route Audio and Video (Single Output)
  kind: action
  command: "{input} B{output}"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number

- id: route_both_multi
  label: Route Audio and Video (Multiple Outputs)
  kind: action
  command: "{input} B{output1},{output2},{output3}"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output1
      type: integer
      description: First output channel
    - name: output2
      type: integer
      description: Second output channel
    - name: output3
      type: integer
      description: Third output channel

- id: route_to_group
  label: Route Input to All Outputs in Group
  kind: action
  command: "{input}P{group}"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: group
      type: integer
      description: Group number

- id: define_group
  label: Group Outputs Under a Group Number
  kind: action
  command: "{group}PP{output1},{output2},{output3}"
  params:
    - name: group
      type: integer
      description: Group number to assign
    - name: output1
      type: integer
      description: First output channel
    - name: output2
      type: integer
      description: Second output channel
    - name: output3
      type: integer
      description: Third output channel

- id: get_group_outputs
  label: Get Outputs in Group
  kind: query
  command: "S{group}"
  params:
    - name: group
      type: integer
      description: Group number to query

- id: get_output_status
  label: Get Input Routed to One Output
  kind: query
  command: "Status{output}"
  params:
    - name: output
      type: integer
      description: Output channel number to query

- id: get_all_outputs_status
  label: Get Status of All Outputs
  kind: query
  command: "Status"
  params: []

- id: save_preset
  label: Save Current Routing to Preset
  kind: action
  command: "Save{preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot 0-9

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "Recall{preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot 0-9

- id: clear_preset
  label: Clear Preset
  kind: action
  command: "Clear{preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot 0-9

# Operation commands - alternate "*"-style routing set (presumably CREATOR 2.0).

- id: route_both_alt
  label: Route Both A/V (Alternate Syntax)
  kind: action
  command: "{input}*{output}!"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number

- id: route_audio_alt
  label: Route Audio (Alternate Syntax)
  kind: action
  command: "{input}*{output}$"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number

- id: route_video_alt_percent
  label: Route Video (Alternate Syntax, %)
  kind: action
  command: "{input}*{output}%"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number

- id: route_video_alt_amp
  label: Route Video (Alternate Syntax, &)
  kind: action
  command: "{input}*{output}&"
  params:
    - name: input
      type: integer
      description: Input channel number
    - name: output
      type: integer
      description: Output channel number
```

## Feedbacks
```yaml
- id: model_info
  type: string
  description: Response to /*Type; query - model identifier string
- id: software_version
  type: string
  description: Response to /^Version; query - software version string
- id: group_outputs
  type: string
  description: Response to S{group} query - output channels belonging to the group
- id: output_route
  type: integer
  description: Response to Status{output} - input channel currently routed to that output
- id: all_output_routes
  type: string
  description: Response to Status - sequential input→output map for every output
```

## Variables
```yaml
# UNRESOLVED: no continuously-settable variable parameters (volume, gain, level) are
# documented in this source beyond discrete routing and preset slots.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document named multi-step sequences beyond Save/Recall presets.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- The refined source documents RS-232 only; the AT-RGB2408 product family may also support Ethernet or front-panel control in the full manual, but those are out of scope here.
- The device's RS-232 port is a female DB9 (9-pin D-sub) connector per the source.
- The bundled SWITCHER 2.0 control software can transmit commands in either ASCII or HEX format via its Custom Code Tab; the device itself receives ASCII command strings per the protocol table.
- System commands end with `;` (e.g. `/*Type;`). Operation commands in the routing table do not show a terminator; the only full worked example is `1B7.2A4.` (input 1 both→out 7, input 2 audio→out 4), which ends with `.` — likely a sentence period rather than a literal terminator. The `.` between the two sub-commands in the example appears to chain multiple routing operations in one message; the source does not formally document this chaining separator. Verify against a live device.
- The `*`-suffix routing set (`$` / `%` / `&`) is documented alongside the primary `[input] V/A/B [output]` set. The `/~CREATOR20;` command appears to switch the device into this alternate command system.
- Password length is documented as 8 digits (`/+xxxxxxxx;`); default password and whether it is required on connect are not stated.
- Input/output count for the AT-RGB2408 is 24 inputs × 8 outputs per the model number; the source does not state this explicitly, so it is not reflected in the spec.

<!-- UNRESOLVED: input/output channel count (24×8 inferred from model number, not source). -->
<!-- UNRESOLVED: default password and whether auth is required on serial connect. -->
<!-- UNRESOLVED: command terminator for operation (non-system) commands. -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-RGB-MATRIX.pdf
retrieved_at: 2026-06-12T02:01:56.267Z
last_checked_at: 2026-06-12T19:09:51.259Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:09:51.259Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions have exact literal matches in the source command table; transport parameters verified; complete one-to-one coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command terminator for operation commands is not explicitly stated; the only example ends with `.` while system commands consistently use `;`. Treat the terminator as documented `;` for system commands and ambiguous for operation commands until verified against a real device."
- "not stated in source; default assumption omitted"
- "no continuously-settable variable parameters (volume, gain, level) are"
- "source does not document unsolicited notifications."
- "source does not document named multi-step sequences beyond Save/Recall presets."
- "source contains no safety warnings, interlock procedures, or"
- "input/output channel count (24×8 inferred from model number, not source)."
- "default password and whether auth is required on serial connect."
- "command terminator for operation (non-system) commands."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
