---
spec_id: admin/atlona-at-rgb0808
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-RGB0808 Control Spec"
manufacturer: Atlona
model_family: AT-RGB0808
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-RGB0808
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - files.avprosupply.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://files.avprosupply.com/files/attachments/255/atlona-at-rgb0808-manual.pdf
retrieved_at: 2026-06-07T20:14:28.028Z
last_checked_at: 2026-06-09T07:14:34.396Z
generated_at: 2026-06-09T07:14:34.396Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP/IP control availability, exact password default, firmware version range"
  - "flow control not stated in source"
  - "default password value, password length (only constraint stated is \"must be 9 digits\" on reset)"
  - "no power on/off commands in source"
  - "no settable numeric parameters (volume, gain, brightness, etc.) in source"
  - "source describes no unsolicited device-pushed notifications"
  - "no safety warnings in source"
  - "no interlock procedures in source"
  - "HTTP/IP control (if any); firmware compatibility range; default password; flow control on RS-232; response framing / termination bytes"
verification:
  verdict: verified
  checked_at: 2026-06-09T07:14:34.396Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec commands matched literally in source; transport parameters confirmed; 100% coverage achieved. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-07
---

# Atlona AT-RGB0808 Control Spec

## Summary
Atlona AT-RGB0808 — 8x8 RGBHV matrix switcher. RS-232 ASCII command protocol for routing video, audio, or both between inputs and outputs; group, save, recall, and status commands included.

<!-- UNRESOLVED: HTTP/IP control availability, exact password default, firmware version range -->

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
  type: password  # inferred: /+xxxxxxxx password-reset command present, auth procedure exists
```

<!-- UNRESOLVED: default password value, password length (only constraint stated is "must be 9 digits" on reset) -->

## Traits
```yaml
# powerable       # UNRESOLVED: no power on/off commands in source
routable  # inferred: X V Y / X A Y / X B Y routing commands
queryable  # inferred: Status, StatusX, /*Type, /^Version, SG queries
```

## Actions
```yaml
- id: query_type
  label: Acquire Matrix Model Information
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
      description: New password, must be 9 digits

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

- id: transfer_all
  label: Transfer Signal From Input To All Outputs
  kind: action
  command: "[{input}]All"
  params:
    - name: input
      type: integer
      description: Input number (1-8)

- id: mirror_all
  label: Mirror All Inputs To All Matching Outputs
  kind: action
  command: "All#"
  params: []

- id: all_outputs_off
  label: Switch Off All Outputs
  kind: action
  command: "All$"
  params: []

- id: mirror_input_to_matching_output
  label: Mirror Input To Corresponding Output
  kind: action
  command: "{input}#"
  params:
    - name: input
      type: integer
      description: Input number (1-8)

- id: route_video
  label: Transfer Video Input To Output
  kind: action
  command: "{input}V{output}"
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output
      type: integer
      description: Output number (1-8)

- id: route_video_multi
  label: Transfer Video Input To Multiple Outputs
  kind: action
  command: "{input}V{output1},{output2},{output3}"
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output1
      type: integer
      description: First output number (1-8)
    - name: output2
      type: integer
      description: Second output number (1-8)
    - name: output3
      type: integer
      description: Third output number (1-8)

- id: route_audio
  label: Transfer Audio Input To Output
  kind: action
  command: "{input}A{output}"
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output
      type: integer
      description: Output number (1-8)

- id: route_audio_multi
  label: Transfer Audio Input To Multiple Outputs
  kind: action
  command: "{input}A{output1},{output2},{output3}"
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output1
      type: integer
      description: First output number (1-8)
    - name: output2
      type: integer
      description: Second output number (1-8)
    - name: output3
      type: integer
      description: Third output number (1-8)

- id: route_both
  label: Transfer Audio And Video Input To Output
  kind: action
  command: "{input}B{output}"
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output
      type: integer
      description: Output number (1-8)

- id: route_both_multi
  label: Transfer Audio And Video Input To Multiple Outputs
  kind: action
  command: "{input}B{output1},{output2},{output3}"
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: output1
      type: integer
      description: First output number (1-8)
    - name: output2
      type: integer
      description: Second output number (1-8)
    - name: output3
      type: integer
      description: Third output number (1-8)

- id: route_to_group
  label: Transfer Audio And Video Input To Output Group
  kind: action
  command: "{input}P{group}"
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: group
      type: integer
      description: Group number (1-8)

- id: define_group
  label: Form Output Group
  kind: action
  command: "{group}PP{output1},{output2},{output3}"
  params:
    - name: group
      type: integer
      description: Group number (1-8)
    - name: output1
      type: integer
      description: First output number (1-8)
    - name: output2
      type: integer
      description: Second output number (1-8)
    - name: output3
      type: integer
      description: Third output number (1-8)

- id: query_group
  label: Acquire Outputs In Group
  kind: query
  command: "S{group}"
  params:
    - name: group
      type: integer
      description: Group number (1-8)

- id: query_input_routes
  label: Acquire Outputs Connected To Input
  kind: query
  command: "Status{input}"
  params:
    - name: input
      type: integer
      description: Input number (1-8)

- id: query_all_routes
  label: Acquire All Input-Output Routing
  kind: query
  command: "Status"
  params: []

- id: save_routes
  label: Save Current Routes To Memory
  kind: action
  command: "Save{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)

- id: recall_routes
  label: Recall Saved Route Memory
  kind: action
  command: "Recall{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)

- id: clear_memory
  label: Clear Saved Route Memory
  kind: action
  command: "Clear{memory}"
  params:
    - name: memory
      type: integer
      description: Memory slot (0-9)
```

## Feedbacks
```yaml
- id: matrix_model
  type: string
  description: Response to /*Type query; device model identifier

- id: software_version
  type: string
  description: Response to /^Version query; firmware/software version string

- id: group_members
  type: string
  description: Response to S{group} query; list of outputs in named group

- id: input_routes
  type: string
  description: Response to Status{input} query; outputs connected to given input

- id: all_routes
  type: string
  description: Response to Status query; full input-output routing map
```

## Variables
```yaml
# UNRESOLVED: no settable numeric parameters (volume, gain, brightness, etc.) in source
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited device-pushed notifications
```

## Macros
```yaml
# Save / Recall / Clear commands (SaveN, RecallN, ClearN) implement named route presets
# across memory slots 0-9. Implemented above as discrete Actions; no multi-step
# composite macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []  # UNRESOLVED: no safety warnings in source
interlocks: []  # UNRESOLVED: no interlock procedures in source
```

## Notes
Each command line must terminate with one of: `.` `;` `!` `"` `$` `&` — source is emphatic that codes are case-sensitive, spacing-sensitive, and letter-exact.

Source documents password reset (`/+xxxxxxxx`) but no default password value, no lock/unlock auth flow, and no session establishment. Auth model is therefore recorded as `password` (inferred) but default credentials remain UNRESOLVED.

Routing commands come in three flavors: V (video-only), A (audio-only), B (audio+video). Multi-output variants accept comma-separated output lists; group variant accepts pre-defined group ID.

<!-- UNRESOLVED: HTTP/IP control (if any); firmware compatibility range; default password; flow control on RS-232; response framing / termination bytes -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - files.avprosupply.com
source_urls:
  - https://atlona.com/pdf/rs232/AVswitcher_rs232.pdf
  - https://files.avprosupply.com/files/attachments/255/atlona-at-rgb0808-manual.pdf
retrieved_at: 2026-06-07T20:14:28.028Z
last_checked_at: 2026-06-09T07:14:34.396Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:14:34.396Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec commands matched literally in source; transport parameters confirmed; 100% coverage achieved. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP/IP control availability, exact password default, firmware version range"
- "flow control not stated in source"
- "default password value, password length (only constraint stated is \"must be 9 digits\" on reset)"
- "no power on/off commands in source"
- "no settable numeric parameters (volume, gain, brightness, etc.) in source"
- "source describes no unsolicited device-pushed notifications"
- "no safety warnings in source"
- "no interlock procedures in source"
- "HTTP/IP control (if any); firmware compatibility range; default password; flow control on RS-232; response framing / termination bytes"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
