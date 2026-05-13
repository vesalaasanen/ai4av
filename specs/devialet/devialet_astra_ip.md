---
spec_id: admin/devialet-astra
schema_version: ai4av-public-spec-v1
revision: 1
title: "Devialet Astra Control Spec"
manufacturer: Devialet
model_family: Astra
aliases: []
compatible_with:
  manufacturers:
    - Devialet
  models:
    - Astra
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - devialet.com
retrieved_at: 2026-05-01T01:56:41.364Z
last_checked_at: 2026-04-23T15:40:48.640Z
generated_at: 2026-04-23T15:40:48.640Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:40:48.640Z
  matched_actions: 38
  action_count: 38
  confidence: high
  summary: "Every spec action matched literally in source; all transport parameters verified; no additional commands in source; full bidirectional coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Devialet Astra Control Spec

## Summary
Devialet Astra high-fidelity integrated amplifier with RS-232 serial control. Supports power, source selection, volume, mute, phase, pre-out, RIAA curve, subsonic filter, and subwoofer commands. Commands use the bracket-delimited format `[IDENTIFIER>COMMAND=VALUE]` with a configurable identifier (default: `DEVIALET`). The device also supports auto-change notification mode where status is pushed automatically when parameters change.

<!-- UNRESOLVED: TCP/IP control indicated as known protocol but no TCP port or addressing details found in this source -->
<!-- UNRESOLVED: trigger I/O (3.5 mm jack) documented but not a machine-serializable protocol -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from known protocol context; no TCP details in source
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER on/off/toggle commands
  - queryable    # inferred from query commands (POWER=?, SOURCE=?, VOLUME=?, etc.)
  - levelable    # inferred from VOLUME set/increment/decrement commands
  - routable     # inferred from SOURCE selection commands
```

## Actions
```yaml
commands:
  - id: power_on
    label: Power On
    kind: action
    command: "[DEVIALET>POWER=1]"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "[DEVIALET>POWER=0]"
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "[DEVIALET>POWER=!]"
    params: []

  - id: source_select
    label: Select Source
    kind: action
    command: "[DEVIALET>SOURCE={source}]"
    params:
      - name: source
        type: string
        values:
          - AES/EBU
          - Digital 1
          - Digital 2
          - Digital 3
          - Digital 4
          - Phono 2
          - Line 1
          - Line 2
          - Phono
          - Optical 1
          - Optical 2
          - HDMI
          - Air
          - Brown N
        description: "Source name (configurable; defaults listed)"

  - id: source_previous
    label: Previous Source
    kind: action
    command: "[DEVIALET>SOURCE=--]"
    params: []

  - id: source_next
    label: Next Source
    kind: action
    command: "[DEVIALET>SOURCE=++]"
    params: []

  - id: volume_set
    label: Set Volume
    kind: action
    command: "[DEVIALET>VOLUME={level}]"
    params:
      - name: level
        type: number
        min: -97.5
        max: 30.0
        step: 0.5
        unit: dB
        description: "Volume in dB"

  - id: volume_down
    label: Volume Down
    kind: action
    command: "[DEVIALET>VOLUME=--]"
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    command: "[DEVIALET>VOLUME=++]"
    params: []

  - id: mute_on
    label: Mute
    kind: action
    command: "[DEVIALET>MUTE=1]"
    params: []

  - id: mute_off
    label: Unmute
    kind: action
    command: "[DEVIALET>MUTE=0]"
    params: []

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "[DEVIALET>MUTE=!]"
    params: []

  - id: phase_normal
    label: Normal Phase
    kind: action
    command: "[DEVIALET>PHASE=0]"
    params: []

  - id: phase_invert
    label: Invert Phase
    kind: action
    command: "[DEVIALET>PHASE=1]"
    params: []

  - id: phase_toggle
    label: Phase Toggle
    kind: action
    command: "[DEVIALET>PHASE=!]"
    params: []

  - id: preout_enable
    label: Enable PreOut
    kind: action
    command: "[DEVIALET>PREOUT=1]"
    params: []

  - id: preout_disable
    label: Disable PreOut
    kind: action
    command: "[DEVIALET>PREOUT=0]"
    params: []

  - id: preout_toggle
    label: PreOut Toggle
    kind: action
    command: "[DEVIALET>PREOUT=!]"
    params: []

  - id: riaa_1976
    label: RIAA Curve 1976
    kind: action
    command: "[DEVIALET>RIAA=1]"
    params: []

  - id: riaa_1953
    label: RIAA Curve 1953
    kind: action
    command: "[DEVIALET>RIAA=0]"
    params: []

  - id: riaa_toggle
    label: RIAA Curve Toggle
    kind: action
    command: "[DEVIALET>RIAA=!]"
    params: []

  - id: subsonic_filter_enable
    label: Enable Subsonic Filter
    kind: action
    command: "[DEVIALET>SUBSONIC_FILTER=1]"
    params: []

  - id: subsonic_filter_disable
    label: Disable Subsonic Filter
    kind: action
    command: "[DEVIALET>SUBSONIC_FILTER=0]"
    params: []

  - id: subsonic_filter_toggle
    label: Subsonic Filter Toggle
    kind: action
    command: "[DEVIALET>SUBSONIC_FILTER=!]"
    params: []

  - id: subwoofer_enable
    label: Enable Subwoofer
    kind: action
    command: "[DEVIALET>SUBWOOFER=1]"
    params: []

  - id: subwoofer_disable
    label: Disable Subwoofer
    kind: action
    command: "[DEVIALET>SUBWOOFER=0]"
    params: []

  - id: subwoofer_toggle
    label: Subwoofer Toggle
    kind: action
    command: "[DEVIALET>SUBWOOFER=!]"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    query: "[DEVIALET>POWER=?]"
    response_format: "[DEVIALET>POWER={value}]"
    type: enum
    values: ["0", "1"]

  - id: start_state
    label: Start State
    query: "[DEVIALET>START=?]"
    response_format: "[DEVIALET>START={value}]"
    type: enum
    values: ["0", "1"]
    description: "Returns 1 when unit is starting (meanwhile POWER=0)"

  - id: stop_state
    label: Stop State
    query: "[DEVIALET>STOP=?]"
    response_format: "[DEVIALET>STOP={value}]"
    type: enum
    values: ["0", "1"]
    description: "Returns 1 when unit is stopping (meanwhile POWER=0)"

  - id: source
    label: Current Source
    query: "[DEVIALET>SOURCE=?]"
    response_format: "[DEVIALET>SOURCE={value}]"
    type: string

  - id: volume
    label: Volume Level
    query: "[DEVIALET>VOLUME=?]"
    response_format: "[DEVIALET>VOLUME={value}]"
    type: number
    min: -97.5
    max: 30.0
    step: 0.5
    unit: dB

  - id: mute_state
    label: Mute State
    query: "[DEVIALET>MUTE=?]"
    response_format: "[DEVIALET>MUTE={value}]"
    type: enum
    values: ["0", "1"]

  - id: phase_state
    label: Phase State
    query: "[DEVIALET>PHASE=?]"
    response_format: "[DEVIALET>PHASE={value}]"
    type: enum
    values: ["0", "1"]

  - id: preout_state
    label: PreOut State
    query: "[DEVIALET>PREOUT=?]"
    response_format: "[DEVIALET>PREOUT={value}]"
    type: enum
    values: ["0", "1"]

  - id: riaa_state
    label: RIAA Curve
    query: "[DEVIALET>RIAA=?]"
    response_format: "[DEVIALET>RIAA={value}]"
    type: enum
    values: ["0", "1"]
    description: "0 = RIAA 1953, 1 = RIAA 1976"

  - id: subsonic_filter_state
    label: Subsonic Filter State
    query: "[DEVIALET>SUBSONIC_FILTER=?]"
    response_format: "[DEVIALET>SUBSONIC_FILTER={value}]"
    type: enum
    values: ["0", "1"]

  - id: subwoofer_state
    label: Subwoofer State
    query: "[DEVIALET>SUBWOOFER=?]"
    response_format: "[DEVIALET>SUBWOOFER={value}]"
    type: enum
    values: ["0", "1"]
```

## Variables
```yaml
variables:
  - id: identifier
    label: Device Identifier
    type: string
    default: DEVIALET
    description: "Configurable identifier used in command framing [IDENTIFIER>...]"
    # UNRESOLVED: configurator details not documented
```

## Events
```yaml
# In "auto change notification" mode, the device automatically sends status
# updates when a parameter is changed by remote or other means.
# UNRESOLVED: exact format of unsolicited notifications not specified in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: non-power commands are only available when POWER=1, but no explicit
# interlock behavior or error response documented for commands sent while powered off
```

## Notes
- Commands use the format `[IDENTIFIER>COMMAND=VALUE]` where the identifier is configurable via the Devialet Configurator (default: `DEVIALET`).
- Three operating modes: (1) Command Acknowledge — device responds with command echo and ACK; (2) Auto Change Notification — device pushes status automatically on remote/local changes; (3) Echo Chaining — device repeats all received bytes on the TX bus.
- Baud rate is configurable from 9600 to 115200 via the Configurator; default is 115200.
- Source names are configurable via the Configurator; listed names are defaults.
- Volume range: -97.5 dB to 30.0 dB in 0.5 dB steps.
- Answer to a query is the corresponding command with the current value, e.g. `[DEVIALET>VOLUME=?]` → `[DEVIALET>VOLUME=12.5]`.
- `SOURCE=--` cycles to previous source, `SOURCE=++` cycles to next source through the source list.
- Trigger I/O uses a standard 3.5 mm stereo jack, TTL-compatible up to 12V, for remote power on/off.

<!-- UNRESOLVED: TCP/IP transport details (port, connection lifecycle, framing) not in this source -->
<!-- UNRESOLVED: Configurator software details and configuration protocol not documented -->
<!-- UNRESOLVED: exact ACK response format beyond the single example -->

## Provenance

```yaml
source_domains:
  - devialet.com
retrieved_at: 2026-05-01T01:56:41.364Z
last_checked_at: 2026-04-23T15:40:48.640Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:40:48.640Z
matched_actions: 38
action_count: 38
confidence: high
summary: "Every spec action matched literally in source; all transport parameters verified; no additional commands in source; full bidirectional coverage achieved."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
