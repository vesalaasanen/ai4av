---
spec_id: admin/key-digital-systems-kd-amp220
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-AMP220 Control Spec"
manufacturer: "Key Digital"
model_family: KD-AMP220
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-AMP220
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.org
source_urls:
  - https://www.keydigital.org/web/content/5927/KD-AMP220_Manual.pdf
retrieved_at: 2026-07-13T06:32:00.709Z
last_checked_at: 2026-07-21T23:03:10.243Z
generated_at: 2026-07-21T23:03:10.243Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source; the required underscore command prefix depends on firmware version boundary (1.06)."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility range not stated beyond the 1.06 underscore boundary."
  - "no power on/off command documented in source."
  - "no voltage/power/current specifications in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:03:10.243Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions have literal command matches in source; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Key Digital Systems KD-AMP220 Control Spec

## Summary
The KD-AMP220 is a multi-channel audio amplifier from Key Digital Systems. This spec covers its RS-232C serial control interface, which provides access to all software functions including input switching, volume/EQ control, muting, noise gate, status query, and factory reset.

<!-- UNRESOLVED: firmware version compatibility not stated in source; the required underscore command prefix depends on firmware version boundary (1.06). -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - routable   # inferred: input routing commands (SPO01SA01/SA02)
  - queryable  # inferred: _STA status query command present
  - levelable  # inferred: volume/bass/treble level control present
```

## Actions
```yaml
# NOTE: Firmware version 1.06 and later requires commands begin with underscore "_".
# Earlier firmware must NOT include the underscore. Commands shown here use the
# underscore prefix as documented for current firmware. A carriage return (CR)
# is required at the end of each command string. Commands are not case-sensitive.
actions:
  # --- Input Switching ---
  - id: select_audio_input_1
    label: Switch to Audio Input 1
    kind: action
    command: "_SPO01SA01"
    params: []

  - id: select_audio_input_2
    label: Switch to Audio Input 2
    kind: action
    command: "_SPO01SA02"
    params: []

  - id: select_audio_input_1_redundant
    label: Switch to Audio Input 1 (Redundant)
    kind: action
    command: "_SPO01SI01"
    params: []

  - id: select_audio_input_2_redundant
    label: Switch to Audio Input 2 (Redundant)
    kind: action
    command: "_SPO01SI02"
    params: []

  # --- Volume Up/Down ---
  - id: mic_volume_up
    label: MIC Audio Volume Up
    kind: action
    command: "_SPI01AVU"
    params: []

  - id: mic_volume_down
    label: MIC Audio Volume Down
    kind: action
    command: "_SPI01AVD"
    params: []

  - id: line_volume_up
    label: Line Audio Volume Up
    kind: action
    command: "_SPO01AVU"
    params: []

  - id: line_volume_down
    label: Line Audio Volume Down
    kind: action
    command: "_SPO01AVD"
    params: []

  # --- EQ Up/Down ---
  - id: line_bass_up
    label: Line Audio Bass Up
    kind: action
    command: "_SPO01ALU"
    params: []

  - id: line_bass_down
    label: Line Audio Bass Down
    kind: action
    command: "_SPO01ALD"
    params: []

  - id: line_treble_up
    label: Line Audio Treble Up
    kind: action
    command: "_SPO01AHU"
    params: []

  - id: line_treble_down
    label: Line Audio Treble Down
    kind: action
    command: "_SPO01AHD"
    params: []

  # --- Level Set (parameterized) ---
  - id: set_mic_volume
    label: Set MIC Audio Volume
    kind: action
    command: "_SPI01AV{level}"
    params:
      - name: level
        type: string
        description: "Two-digit level, 00-60 (zero-padded)"

  - id: set_line_volume
    label: Set Line Audio Volume
    kind: action
    command: "_SPO01AV{level}"
    params:
      - name: level
        type: string
        description: "Two-digit level, 00-60 (zero-padded)"

  - id: set_line_bass
    label: Set Line Audio Bass Level
    kind: action
    command: "_SPO01AL{level}"
    params:
      - name: level
        type: string
        description: "Two-digit level, 00-08 (zero-padded)"

  - id: set_line_treble
    label: Set Line Audio Treble Level
    kind: action
    command: "_SPO01AH{level}"
    params:
      - name: level
        type: string
        description: "Two-digit level, 00-08 (zero-padded)"

  # --- Muting ---
  - id: mute_all
    label: Mute MIC and LINE Audio
    kind: action
    command: "_SPO01AE"
    params: []

  - id: unmute_all
    label: Unmute MIC and LINE Audio
    kind: action
    command: "_SPO01AD"
    params: []

  - id: mute_mic
    label: Mute MIC Audio Only
    kind: action
    command: "_SPI01AE"
    params: []

  - id: mute_line
    label: Mute Line Audio Only
    kind: action
    command: "_SPI02AE"
    params: []

  - id: unmute_mic
    label: Unmute MIC Audio Only
    kind: action
    command: "_SPI01AD"
    params: []

  - id: unmute_line
    label: Unmute Line Audio Only
    kind: action
    command: "_SPI02AD"
    params: []

  # --- Noise Gate ---
  - id: noise_gate_on
    label: Set Noise Gate ON
    kind: action
    command: "_SPO01NGON"
    params: []

  - id: noise_gate_off
    label: Set Noise Gate OFF
    kind: action
    command: "_SPO01NGOFF"
    params: []

  # --- System Query ---
  - id: print_status
    label: Print Status Message
    kind: query
    command: "_STA"
    params: []

  # --- Factory Reset ---
  - id: factory_default
    label: Set Factory Default
    kind: action
    command: "_SPCDF"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: input_switch_response
    type: string
    description: "Echo + 'Output Audio switch to Input NN'"

  - id: mic_volume_response
    type: string
    description: "Echo + 'Volume of MIC Audio [xx] turn Up/Down' (level 00-60)"

  - id: line_volume_response
    type: string
    description: "Echo + 'Volume of Line Audio [xx] turn Up/Down' (level 00-60)"

  - id: line_bass_response
    type: string
    description: "Echo + 'Bass Level of Line Audio [xx] turn Up/Down' (level 00-08)"

  - id: line_treble_response
    type: string
    description: "Echo + 'Treble Level of Line Audio [xx] turn Up/Down' (level 00-08)"

  - id: mute_response
    type: enum
    values: [enabled, disabled]

  - id: noise_gate_response
    type: enum
    values: [on, off]

  - id: status_block
    type: string
    description: |
      Multi-line status block returned by _STA, including firmware version,
      line audio source, MIC/Line volume & mute, bass/treble, and noise gate state.
```

## Variables
```yaml
variables:
  - id: mic_volume
    type: integer
    range: [0, 60]
    unit: level

  - id: line_volume
    type: integer
    range: [0, 60]
    unit: level

  - id: line_bass
    type: integer
    range: [0, 8]
    unit: level

  - id: line_treble
    type: integer
    range: [0, 8]
    unit: level
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source.
```

## Notes
- RS-232C pinout (KD-AMP220 side): Pin 1 = TxD, Pin 2 = Ground, Pin 3 = RxD.
- Cable is null-modem (Master Tx→KD-AMP Rx, Master Rx→KD-AMP Tx, Ground↔Ground).
- Carriage return (CR) required at end of every command string.
- Commands are not case-sensitive; spaces shown in documentation may be excluded.
- **Firmware underscore rule:** Firmware v1.06 and later requires commands begin with `_`. Earlier firmware must NOT include the underscore. All commands in this spec are shown with the underscore prefix.
- Factory default values: Line Source = Input 1, Mic Volume = 45, Mic Mute = OFF, Line Volume = 45, Line Mute = OFF, Bass = 4, Treble = 4, Noise Gate = ON.

<!-- UNRESOLVED: firmware version compatibility range not stated beyond the 1.06 underscore boundary. -->
<!-- UNRESOLVED: no power on/off command documented in source. -->
<!-- UNRESOLVED: no voltage/power/current specifications in source. -->

## Provenance

```yaml
source_domains:
  - keydigital.org
source_urls:
  - https://www.keydigital.org/web/content/5927/KD-AMP220_Manual.pdf
retrieved_at: 2026-07-13T06:32:00.709Z
last_checked_at: 2026-07-21T23:03:10.243Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:03:10.243Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions have literal command matches in source; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source; the required underscore command prefix depends on firmware version boundary (1.06)."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility range not stated beyond the 1.06 underscore boundary."
- "no power on/off command documented in source."
- "no voltage/power/current specifications in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
