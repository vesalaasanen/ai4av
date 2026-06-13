---
spec_id: admin/atlona-at-av1604
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-AV1604 Control Spec"
manufacturer: Atlona
model_family: AT-AV1604
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-AV1604
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-AV-MATRIX.pdf
  - "https://www.manualslib.com/manual/558681/Atlona-Av128128.html?page=26"
retrieved_at: 2026-06-12T01:59:29.492Z
last_checked_at: 2026-06-12T19:07:28.885Z
generated_at: 2026-06-12T19:07:28.885Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP port number not stated (optional accessory, no port/baud specified)"
  - "firmware version compatibility not stated"
  - "password format details beyond \"8 digits\" not fully specified"
  - "response format for query commands not documented"
  - "flow control not stated in source"
  - "response format for query commands not documented in source"
  - "no safety warnings or interlock procedures found in source"
  - "TCP/IP port number not stated in source"
  - "flow control setting not stated"
  - "response/acknowledgement format for all commands not documented"
  - "command terminator/line ending not specified"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:07:28.885Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec commands matched verbatim in source table; transport parameters confirmed; complete protocol coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Atlona AT-AV1604 Control Spec

## Summary
16×4 AV matrix switcher controlled via RS-232C serial. Supports video, audio, and combined video+audio routing from any input to any output, plus presets, groups, keyboard lock, and buzzer control. Optional TCP/IP Ethernet control available on some AV16 series units.

<!-- UNRESOLVED: TCP/IP port number not stated (optional accessory, no port/baud specified) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: password format details beyond "8 digits" not fully specified -->
<!-- UNRESOLVED: response format for query commands not documented -->

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
  type: none  # inferred: no auth procedure required for serial commands; password only for front panel
```

## Traits
```yaml
traits:
  - routable    # input/output routing commands present
  - queryable   # Status, /*Type, S[x] query commands present
  - powerable   # inferred: All$ switches off all outputs
```

## Actions
```yaml
actions:
  - id: get_model_info
    label: Get Model Information
    kind: query
    command: "/*Type;"
    description: Acquires the model information.
    params: []

  - id: set_password
    label: Set Password
    kind: action
    command: "/+xxxxxxxx;"
    description: Rewrites the password. Must be 8 digits.
    params:
      - name: password
        type: string
        description: 8-digit numeric password

  - id: lock_keyboard
    label: Lock Keyboard
    kind: action
    command: "/%Lock;"
    description: Locks the front panel keyboard.
    params: []

  - id: unlock_keyboard
    label: Unlock Keyboard
    kind: action
    command: "/%Unlock;"
    description: Unlocks the front panel keyboard.
    params: []

  - id: buzzer_off
    label: Buzzer Off
    kind: action
    command: "/:BellOff;"
    description: Turn off the buzzer.
    params: []

  - id: buzzer_on
    label: Buzzer On
    kind: action
    command: "/:BellOn;"
    description: Turn on the buzzer.
    params: []

  - id: get_software_version
    label: Get Software Version
    kind: query
    command: "/^Version;"
    description: Acquires the version of software.
    params: []

  - id: switch_creator20_mode
    label: Switch to CREATOR 2.0 Command System
    kind: action
    command: "/~CREATOR20;"
    description: Switch to CREATOR2.0 command system.
    params: []

  - id: route_input_to_all_outputs
    label: Route Input to All Outputs
    kind: action
    command: "[x1]All"
    description: Transfer signals from input channel [x1] to all output channels.
    params:
      - name: input
        type: integer
        description: Input channel number

  - id: all_inputs_to_matching_outputs
    label: All Inputs to Matching Outputs
    kind: action
    command: "All#"
    description: Transfer all input signals to matching output channels (input 1→output 1, input 2→output 2, etc.).
    params: []

  - id: all_outputs_off
    label: All Outputs Off
    kind: action
    command: "All$"
    description: Switch off all output channels.
    params: []

  - id: route_input_to_matching_output
    label: Route Input to Matching Output
    kind: action
    command: "[x1]#"
    description: Transfer signals from input channel [x1] to output channel [x1].
    params:
      - name: input
        type: integer
        description: Input/output channel number

  - id: output_off
    label: Output Off
    kind: action
    command: "[x1]$"
    description: Switch off output channel [x1].
    params:
      - name: output
        type: integer
        description: Output channel number

  - id: route_video
    label: Route Video
    kind: action
    command: "[x1] V[x2]"
    description: Transfer video signals from input channel [x1] to output channel [x2].
    params:
      - name: input
        type: integer
        description: Input channel number
      - name: output
        type: integer
        description: Output channel number

  - id: route_video_multi
    label: Route Video to Multiple Outputs
    kind: action
    command: "[x1] V[x2],[x3],[x4]"
    description: Transfer video signals from input channel [x1] to output channels [x2], [x3] and [x4].
    params:
      - name: input
        type: integer
        description: Input channel number
      - name: outputs
        type: string
        description: Comma-separated output channel numbers

  - id: route_audio
    label: Route Audio
    kind: action
    command: "[x1] A[x2]"
    description: Transfer audio signals from input channel [x1] to output channel [x2].
    params:
      - name: input
        type: integer
        description: Input channel number
      - name: output
        type: integer
        description: Output channel number

  - id: route_audio_multi
    label: Route Audio to Multiple Outputs
    kind: action
    command: "[x1] A[x2],[x3],[x4]"
    description: Transfer audio signals from input channel [x1] to output channels [x2], [x3] and [x4].
    params:
      - name: input
        type: integer
        description: Input channel number
      - name: outputs
        type: string
        description: Comma-separated output channel numbers

  - id: route_av
    label: Route AV (Video + Audio)
    kind: action
    command: "[x1] B[x2]"
    description: Transfer both video and audio signals from input channel [x1] to output channel [x2].
    params:
      - name: input
        type: integer
        description: Input channel number
      - name: output
        type: integer
        description: Output channel number

  - id: route_av_multi
    label: Route AV to Multiple Outputs
    kind: action
    command: "[x1] B[x2],[x3],[x4]"
    description: Transfer both video and audio signals from input channel [x1] to output channels [x2], [x3] and [x4].
    params:
      - name: input
        type: integer
        description: Input channel number
      - name: outputs
        type: string
        description: Comma-separated output channel numbers

  - id: route_input_to_group
    label: Route Input to Group
    kind: action
    command: "[x1]P[x2]"
    description: Transfer signals from input channel [x1] to all output channels in group [x2].
    params:
      - name: input
        type: integer
        description: Input channel number
      - name: group
        type: integer
        description: Group number

  - id: create_group
    label: Create Output Group
    kind: action
    command: "[x1]PP[x2],[x3],[x4]"
    description: Group output channels [x2], [x3] and [x4] under group [x1].
    params:
      - name: group
        type: integer
        description: Group number to create/assign
      - name: outputs
        type: string
        description: Comma-separated output channel numbers

  - id: get_group_status
    label: Get Group Status
    kind: query
    command: "S[x]"
    description: Acquires the output channels in group [x].
    params:
      - name: group
        type: integer
        description: Group number

  - id: get_output_status
    label: Get Output Status
    kind: query
    command: "Status[x1]"
    description: Acquires the input channel routed to output channel [x1].
    params:
      - name: output
        type: integer
        description: Output channel number

  - id: get_all_status
    label: Get All Outputs Status
    kind: query
    command: "Status"
    description: Acquires the input channel to the output channels one by one.
    params: []

  - id: save_preset
    label: Save Preset
    kind: action
    command: "Save[Y]"
    description: Save the present operation to preset [Y]. Y ranges from 0 to 9.
    params:
      - name: preset
        type: integer
        description: Preset number (0-9)

  - id: recall_preset
    label: Recall Preset
    kind: action
    command: "Recall[Y]"
    description: Recall preset [Y].
    params:
      - name: preset
        type: integer
        description: Preset number (0-9)

  - id: clear_preset
    label: Clear Preset
    kind: action
    command: "Clear[Y]"
    description: Clear preset [Y].
    params:
      - name: preset
        type: integer
        description: Preset number (0-9)

  - id: alt_route_av
    label: Alt Route AV
    kind: action
    command: "[X1]*[X2]!"
    description: Transfer both video and audio signals from input channel [X1] to output channel [X2].
    params:
      - name: input
        type: integer
        description: Input channel number
      - name: output
        type: integer
        description: Output channel number

  - id: alt_route_audio
    label: Alt Route Audio
    kind: action
    command: "[X1]*[X2]$"
    description: Transfer audio signals from input channel [X1] to output channel [X2].
    params:
      - name: input
        type: integer
        description: Input channel number
      - name: output
        type: integer
        description: Output channel number

  - id: alt_route_video_percent
    label: Alt Route Video (Percent)
    kind: action
    command: "[X1]*[X2]%"
    description: Transfer video signals from input channel [X1] to output channel [X2].
    params:
      - name: input
        type: integer
        description: Input channel number
      - name: output
        type: integer
        description: Output channel number

  - id: alt_route_video_amp
    label: Alt Route Video (Ampersand)
    kind: action
    command: "[X1]*[X2]&"
    description: Transfer video signals from input channel [X1] to output channel [X2].
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
# UNRESOLVED: response format for query commands not documented in source
# Source describes query commands (/*Type;, /^Version;, S[x], Status[x1], Status)
# but does not document the response format/structure
```

## Variables
```yaml
# No continuous variables identified. All commands are discrete actions/queries.
```

## Events
```yaml
# No unsolicited notification events documented in source.
```

## Macros
```yaml
# Source shows multi-command chaining example (e.g. "1B7.2A4." = route AV 1→7 then audio 2→4)
# but does not define named macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- Command codes work in both ASCII and HEX format.
- Multiple commands can be chained in a single transmission separated by periods (e.g. `1B7.2A4.`).
- Password is 8-digit numeric, used for front panel control panel — serial commands do not require authentication.
- Two alternative command syntaxes exist for routing: `[x1]B[x2]` and `[X1]*[X2]!` for AV, `[x1]A[x2]` and `[X1]*[X2]$` for audio, `[x1]V[x2]` and `[X1]*[X2]%`/`[X1]*[X2]&` for video.
- AV16 series has optional TCP/IP Ethernet (RJ-45) but port number not documented.

<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: flow control setting not stated -->
<!-- UNRESOLVED: response/acknowledgement format for all commands not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: command terminator/line ending not specified -->

## Provenance

```yaml
source_domains:
  - atlona.com
  - manualslib.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-AV-MATRIX.pdf
  - "https://www.manualslib.com/manual/558681/Atlona-Av128128.html?page=26"
retrieved_at: 2026-06-12T01:59:29.492Z
last_checked_at: 2026-06-12T19:07:28.885Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:07:28.885Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec commands matched verbatim in source table; transport parameters confirmed; complete protocol coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP port number not stated (optional accessory, no port/baud specified)"
- "firmware version compatibility not stated"
- "password format details beyond \"8 digits\" not fully specified"
- "response format for query commands not documented"
- "flow control not stated in source"
- "response format for query commands not documented in source"
- "no safety warnings or interlock procedures found in source"
- "TCP/IP port number not stated in source"
- "flow control setting not stated"
- "response/acknowledgement format for all commands not documented"
- "command terminator/line ending not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
