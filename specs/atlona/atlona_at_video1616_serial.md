---
spec_id: admin/atlona-at-video1616
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-VIDEO1616 Control Spec"
manufacturer: Atlona
model_family: AT-VIDEO1616
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-VIDEO1616
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - files.avprosupply.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://files.avprosupply.com/files/attachments/258/atlona-at-video1616-manual.pdf
retrieved_at: 2026-06-07T20:28:13.537Z
last_checked_at: 2026-06-09T07:14:36.708Z
generated_at: 2026-06-09T07:14:36.708Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not name AT-VIDEO1616 verbatim; command set derived from shared Atlona AV-switcher family protocol document. Firmware version compatibility not stated. No power on/off commands documented (device may be always-on when mains supplied)."
  - "source documents query commands (Status, StatusX, S{group}, /*Type, /^Version)"
  - "no continuous/analog variable parameters (volume, level, gain, etc.) documented in source."
  - "source does not document unsolicited notification messages from the device."
  - "source does not document any device-side macro or multi-step sequence capabilities."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "source does not state firmware version compatibility, port numbers (N/A for serial), voltage/current specs, fault behavior, error recovery sequences, or response message formats."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:14:36.708Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literally in source with correct shapes and parameters; transport parameters fully verified; bidirectional command coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-07
---

# Atlona AT-VIDEO1616 Control Spec

## Summary
RS-232 control spec for Atlona AT-VIDEO1616 composite video/audio matrix switcher. Covers ASCII command set for routing, memory save/recall, group management, status queries, and system commands over a 9-pin D-sub serial connection at 9600 8N1.

<!-- UNRESOLVED: source does not name AT-VIDEO1616 verbatim; command set derived from shared Atlona AV-switcher family protocol document. Firmware version compatibility not stated. No power on/off commands documented (device may be always-on when mains supplied). -->

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
    pin2: Tx
    pin3: Rx
    pin5: Gnd
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable       # inferred: input/output routing commands present (X#, XVY, XAY, XBY, XPG)
- queryable      # inferred: status/query commands present (Status, StatusX, /*Type, /^Version, SG)
```

## Actions
```yaml
- id: get_type
  label: Get Matrix Type
  kind: query
  command: "/*Type."
  params: []
- id: reset_password
  label: Reset Password
  kind: action
  command: "/+{password};"
  params:
    - name: password
      type: string
      description: 9-digit password
- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  command: "/%Lock."
  params: []
- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  command: "/%Unlock."
  params: []
- id: bell_off
  label: Bell Off
  kind: action
  command: "/:BellOff."
  params: []
- id: bell_on
  label: Bell On
  kind: action
  command: "/:BellOn."
  params: []
- id: get_version
  label: Get Software Version
  kind: query
  command: "/^Version."
  params: []
- id: transfer_to_all
  label: Transfer Signal To All Outputs
  kind: action
  command: "[{input}]All."
  params:
    - name: input
      type: integer
      description: Input number
- id: mirror_all_inputs
  label: Mirror All Inputs To All Matching Outputs
  kind: action
  command: "All#."
  params: []
- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$."
  params: []
- id: mirror_input_to_output
  label: Mirror Input To Matching Output
  kind: action
  command: "{input}#."
  params:
    - name: input
      type: integer
      description: Input number
- id: transfer_video_input_to_output
  label: Transfer Video From Input To Output
  kind: action
  command: "{input}V{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number
- id: transfer_video_input_to_outputs
  label: Transfer Video From Input To Multiple Outputs
  kind: action
  command: "{input}V{output1},{output2},{output3}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output1
      type: integer
      description: First output number
    - name: output2
      type: integer
      description: Second output number
    - name: output3
      type: integer
      description: Third output number
- id: transfer_audio_input_to_output
  label: Transfer Audio From Input To Output
  kind: action
  command: "{input}A{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number
- id: transfer_audio_input_to_outputs
  label: Transfer Audio From Input To Multiple Outputs
  kind: action
  command: "{input}A{output1},{output2},{output3}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output1
      type: integer
      description: First output number
    - name: output2
      type: integer
      description: Second output number
    - name: output3
      type: integer
      description: Third output number
- id: transfer_both_input_to_output
  label: Transfer Audio+Video From Input To Output
  kind: action
  command: "{input}B{output}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number
- id: transfer_both_input_to_outputs
  label: Transfer Audio+Video From Input To Multiple Outputs
  kind: action
  command: "{input}B{output1},{output2},{output3}."
  params:
    - name: input
      type: integer
      description: Input number
    - name: output1
      type: integer
      description: First output number
    - name: output2
      type: integer
      description: Second output number
    - name: output3
      type: integer
      description: Third output number
- id: transfer_input_to_group
  label: Transfer Audio+Video From Input To Output Group
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
  label: Form Group From Outputs
  kind: action
  command: "{group}PP{output1},{output2},{output3}."
  params:
    - name: group
      type: integer
      description: Group number
    - name: output1
      type: integer
      description: First output number
    - name: output2
      type: integer
      description: Second output number
    - name: output3
      type: integer
      description: Third output number
- id: get_group_outputs
  label: Get Outputs In Group
  kind: query
  command: "S{group}."
  params:
    - name: group
      type: integer
      description: Group number
- id: get_input_routing
  label: Get Outputs Connected To Input
  kind: query
  command: "Status{input}."
  params:
    - name: input
      type: integer
      description: Input number
- id: get_full_routing
  label: Get All Input/Output Connections
  kind: query
  command: "Status."
  params: []
- id: save_memory
  label: Save Current Routes To Memory
  kind: action
  command: "Save{memory}."
  params:
    - name: memory
      type: integer
      description: Memory slot number (0-9)
- id: recall_memory
  label: Recall Saved Route Memory
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
# UNRESOLVED: source documents query commands (Status, StatusX, S{group}, /*Type, /^Version)
# but does not specify the exact response format strings emitted by the device.
```

## Variables
```yaml
# UNRESOLVED: no continuous/analog variable parameters (volume, level, gain, etc.) documented in source.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notification messages from the device.
```

## Macros
```yaml
# UNRESOLVED: source does not document any device-side macro or multi-step sequence capabilities.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
Command terminator must be one of: `.` `;` `!` `"` `$` `&` (without it the code will fail). Capitalization, spacing, and lettering of command codes are sensitive and must not be altered. Variable placeholders: X=input, W/Y/Z=output numbers, G=group number, N=memory number. Memory slots are 0-9. Source document covers the Atlona AV-switcher family (AT-AV0404 through AT-AV128128) which includes the AT-VIDEO1616 as a shared-platform member; the source does not name AT-VIDEO1616 verbatim.

<!-- UNRESOLVED: source does not state firmware version compatibility, port numbers (N/A for serial), voltage/current specs, fault behavior, error recovery sequences, or response message formats. -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - files.avprosupply.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://files.avprosupply.com/files/attachments/258/atlona-at-video1616-manual.pdf
retrieved_at: 2026-06-07T20:28:13.537Z
last_checked_at: 2026-06-09T07:14:36.708Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:14:36.708Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literally in source with correct shapes and parameters; transport parameters fully verified; bidirectional command coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not name AT-VIDEO1616 verbatim; command set derived from shared Atlona AV-switcher family protocol document. Firmware version compatibility not stated. No power on/off commands documented (device may be always-on when mains supplied)."
- "source documents query commands (Status, StatusX, S{group}, /*Type, /^Version)"
- "no continuous/analog variable parameters (volume, level, gain, etc.) documented in source."
- "source does not document unsolicited notification messages from the device."
- "source does not document any device-side macro or multi-step sequence capabilities."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "source does not state firmware version compatibility, port numbers (N/A for serial), voltage/current specs, fault behavior, error recovery sequences, or response message formats."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
