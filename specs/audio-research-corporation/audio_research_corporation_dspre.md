---
spec_id: admin/audio-research-corporation-dspre
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio Research Corporation DSPre Control Spec"
manufacturer: "Audio Research Corporation"
model_family: DSPre
aliases: []
compatible_with:
  manufacturers:
    - "Audio Research Corporation"
  models:
    - DSPre
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audioresearch.com
source_urls:
  - https://audioresearch.com/new_website/wp-content/uploads/2024/11/DSPre-Manual.pdf
retrieved_at: 2026-04-30T04:32:54.782Z
last_checked_at: 2026-06-02T21:47:54.015Z
generated_at: 2026-06-02T21:47:54.015Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "actual RS-232 command string format/encoding not documented in source; only Crestron signal abstractions are provided"
  - "serial flow_control not stated in source"
  - "flow control not stated in source"
  - "actual serial command strings for each action are not documented;"
  - "actual serial response strings/formats not documented in source"
  - "no settable persistent parameters beyond actions documented in source"
  - "unsolicited notification behavior not documented in source"
  - "no explicit safety warnings or power-on sequencing interlocks documented beyond the 90-second mute delay"
  - "actual RS-232 command string syntax and encoding unknown"
  - "serial flow_control not stated"
  - "response/acknowledgement string format unknown"
  - "firmware version compatibility not stated"
  - "whether BNC input can be directly selected or only via Input Up/Down cycling"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:47:54.015Z
  matched_actions: 40
  action_count: 40
  confidence: medium
  summary: "All 40 spec actions traced to source. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Audio Research Corporation DSPre Control Spec

## Summary
The Audio Research Corporation DSPre is a stereo pre-amplifier with RS-232 serial control. This spec is derived from a Crestron SIMPL Windows module definition which describes available control and feedback signals but does not expose the underlying serial command strings. The unit supports power, volume, mute, balance, input selection, display brightness, DAC filter modes, and transport controls for USB media playback.

<!-- UNRESOLVED: actual RS-232 command string format/encoding not documented in source; only Crestron signal abstractions are provided -->
<!-- UNRESOLVED: serial flow_control not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from Power_On/Off/Toggle commands
  - levelable    # inferred from Volume_Set, Balance_Set, Display_Set commands
  - routable     # inferred from input selection commands
  - queryable    # inferred from Poll_Power, Poll_Settings commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    params: []

  - id: power_off
    label: Power Off
    kind: action
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    params: []

  - id: volume_set
    label: Set Volume
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 65535
        description: Volume level (0-65535)

  - id: mute_on
    label: Mute On
    kind: action
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    params: []

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    params: []

  - id: mono_on
    label: Mono On
    kind: action
    params: []

  - id: mono_off
    label: Mono Off
    kind: action
    params: []

  - id: mono_toggle
    label: Mono Toggle
    kind: action
    params: []

  - id: invert_on
    label: Invert On
    kind: action
    params: []

  - id: invert_off
    label: Invert Off
    kind: action
    params: []

  - id: invert_toggle
    label: Invert Toggle
    kind: action
    params: []

  - id: sharp_filter_on
    label: Sharp Filter On
    kind: action
    params: []

  - id: sharp_filter_off
    label: Sharp Filter Off
    kind: action
    params: []

  - id: sharp_filter_toggle
    label: Sharp Filter Toggle
    kind: action
    params: []

  - id: up_sample_on
    label: Up Sample On
    kind: action
    params: []

  - id: up_sample_off
    label: Up Sample Off
    kind: action
    params: []

  - id: up_sample_toggle
    label: Up Sample Toggle
    kind: action
    params: []

  - id: balance_right
    label: Balance Right
    kind: action
    params: []

  - id: balance_left
    label: Balance Left
    kind: action
    params: []

  - id: balance_set
    label: Set Balance
    kind: action
    params:
      - name: level
        type: integer
        min: -22
        max: 22
        description: "Balance level (-22 full left, 0 center, 22 full right)"

  - id: display_up
    label: Display Up
    kind: action
    params: []

  - id: display_down
    label: Display Down
    kind: action
    params: []

  - id: display_dim
    label: Display Dim
    kind: action
    params: []

  - id: display_set
    label: Set Display Level
    kind: action
    params:
      - name: level
        type: integer
        min: 1
        max: 7
        description: "Display brightness (1 dimmest, 7 brightest)"

  - id: display_normal
    label: Display Normal
    kind: action
    params: []

  - id: input_up
    label: Input Up
    kind: action
    params: []

  - id: input_down
    label: Input Down
    kind: action
    params: []

  - id: select_input
    label: Select Input
    kind: action
    params:
      - name: input
        type: enum
        values:
          - USB2HS
          - RCA
          - AES/EBU
          - TOS
          - BAL1
          - BAL2
          - SE1
          - SE2
          - SE3
          - PROCESSOR
        description: Input source to select

  - id: enter
    label: Enter
    kind: action
    params: []

  - id: menu
    label: Menu
    kind: action
    params: []

  - id: play_pause_toggle
    label: Play/Pause Toggle
    kind: action
    params: []

  - id: prev_track
    label: Previous Track
    kind: action
    params: []

  - id: next_track
    label: Next Track
    kind: action
    params: []

  - id: stop
    label: Stop
    kind: action
    params: []

  - id: set_factory_defaults
    label: Set Factory Defaults
    kind: action
    params: []

  - id: init
    label: Init Input Names
    kind: action
    params: []

# UNRESOLVED: actual serial command strings for each action are not documented;
# source only provides Crestron signal names (digital/analog/serial abstractions)
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [on, off]

  - id: mute_state
    type: enum
    values: [on, off]

  - id: volume_level
    type: integer
    min: 0
    max: 65535

  - id: mono_state
    type: enum
    values: [on, off]

  - id: invert_state
    type: enum
    values: [on, off]

  - id: sharp_filter_state
    type: enum
    values: [on, off]

  - id: up_sample_state
    type: enum
    values: [on, off]

  - id: balance_level
    type: integer
    min: -22
    max: 22

  - id: display_level
    type: integer
    min: 1
    max: 7

  - id: selected_input
    type: enum
    values:
      - USB2HS
      - RCA
      - BNC
      - AES/EBU
      - TOS
      - BAL1
      - BAL2
      - SE1
      - SE2
      - SE3
      - PROCESSOR

# UNRESOLVED: actual serial response strings/formats not documented in source
```

## Variables
```yaml
# UNRESOLVED: no settable persistent parameters beyond actions documented in source
```

## Events
```yaml
# UNRESOLVED: unsolicited notification behavior not documented in source
```

## Macros
```yaml
macros:
  - id: poll_power
    label: Poll Power
    description: Polls the unit's power state every 15 seconds while held

  - id: poll_settings
    label: Poll Settings
    description: Polls all unit settings every 60 seconds while held
```

## Safety
```yaml
confirmation_required_for:
  - set_factory_defaults
interlocks: []
notes:
  - "Unit takes 90 seconds after power-on before outputs respond to mute commands; the last mute command sent during this period is automatically triggered after the 90-second window expires."
# UNRESOLVED: no explicit safety warnings or power-on sequencing interlocks documented beyond the 90-second mute delay
```

## Notes
- This spec is derived from a Crestron SIMPL Windows module definition (`AudioResearch DSPre Preamp v1.0.umc`), not from raw serial protocol documentation. The actual RS-232 command string format is unknown.
- Input names must be capitalized and are truncated to 6 characters on the front panel display.
- Init signal should be pulsed after 10 seconds to push input names defined in module parameters to the unit's front panel. This only needs to occur once.
- Cable reference: CNSP-121.
- BNC input appears in feedback and parameters but not as a discrete select control action (only available via input cycling).

<!-- UNRESOLVED: actual RS-232 command string syntax and encoding unknown -->
<!-- UNRESOLVED: serial flow_control not stated -->
<!-- UNRESOLVED: response/acknowledgement string format unknown -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: whether BNC input can be directly selected or only via Input Up/Down cycling -->

## Provenance

```yaml
source_domains:
  - audioresearch.com
source_urls:
  - https://audioresearch.com/new_website/wp-content/uploads/2024/11/DSPre-Manual.pdf
retrieved_at: 2026-04-30T04:32:54.782Z
last_checked_at: 2026-06-02T21:47:54.015Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:47:54.015Z
matched_actions: 40
action_count: 40
confidence: medium
summary: "All 40 spec actions traced to source. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "actual RS-232 command string format/encoding not documented in source; only Crestron signal abstractions are provided"
- "serial flow_control not stated in source"
- "flow control not stated in source"
- "actual serial command strings for each action are not documented;"
- "actual serial response strings/formats not documented in source"
- "no settable persistent parameters beyond actions documented in source"
- "unsolicited notification behavior not documented in source"
- "no explicit safety warnings or power-on sequencing interlocks documented beyond the 90-second mute delay"
- "actual RS-232 command string syntax and encoding unknown"
- "serial flow_control not stated"
- "response/acknowledgement string format unknown"
- "firmware version compatibility not stated"
- "whether BNC input can be directly selected or only via Input Up/Down cycling"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
