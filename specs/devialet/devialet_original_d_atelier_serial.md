---
spec_id: admin/devialet-original-d-atelier
schema_version: ai4av-public-spec-v1
revision: 1
title: "Devialet Original d'Atelier Control Spec"
manufacturer: Devialet
model_family: "Devialet Original d'Atelier"
aliases: []
compatible_with:
  manufacturers:
    - Devialet
  models:
    - "Devialet Original d'Atelier"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - devialet.com
source_urls:
  - https://www.devialet.com/en-us/docs/D-Premier-RS232.pdf
retrieved_at: 2026-04-30T04:26:34.695Z
last_checked_at: 2026-04-25T20:38:08.456Z
generated_at: 2026-04-25T20:38:08.456Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact pinout of the RS-232 connector not specified in source"
  - "trigger I/O (3.5mm jack) control protocol not fully documented — only physical specs given"
  - "no settable parameters beyond discrete actions and volume (covered in actions/feedbacks)"
  - "no multi-step sequences described in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "exact ACK response format not fully specified (e.g. \"[DEVIALET>VOLUME=ACK]\" shown as example)"
  - "RS-232 connector pinout not specified"
  - "configurator software details and configuration protocol not documented"
  - "firmware version compatibility not stated in source"
  - "trigger I/O command protocol (beyond physical spec) not documented"
verification:
  verdict: verified
  checked_at: 2026-04-25T20:38:08.456Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions matched literals from source; complete transport verification (baud 115200, 8n1, no flow control); no extraneous commands in source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Devialet Original d'Atelier Control Spec

## Summary
The Devialet Original d'Atelier is a high-end integrated amplifier with RS-232C serial control. This spec covers the full serial command set including power, source selection, volume, mute, phase, pre-out, RIAA curve, subsonic filter, and subwoofer control. The command format uses bracketed messages `[IDENTIFIER>COMMAND=VALUE]` with a configurable identifier (default: `DEVIALET`).

<!-- UNRESOLVED: exact pinout of the RS-232 connector not specified in source -->
<!-- UNRESOLVED: trigger I/O (3.5mm jack) control protocol not fully documented — only physical specs given -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; configurable 9600-115200 via configurator
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # stated as "No flow control"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # power on/off/toggle commands
  - queryable     # query commands for all parameters
  - levelable     # volume control (continuous, -97.5 to 30 dB, 0.5 dB steps)
  - routable      # source selection commands (14 named sources + next/previous)
```

## Actions
```yaml
commands:
  - id: power_off
    label: Power Off
    kind: action
    payload: "[DEVIALET>POWER=0]"
    params: []

  - id: power_on
    label: Power On
    kind: action
    payload: "[DEVIALET>POWER=1]"
    params: []

  - id: power_toggle
    label: Toggle Power
    kind: action
    payload: "[DEVIALET>POWER=!]"
    params: []

  - id: source_set
    label: Select Source
    kind: action
    payload: "[DEVIALET>SOURCE={source}]"
    params:
      - name: source
        type: enum
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
        description: Source name (configurable names via configurator)

  - id: source_previous
    label: Previous Source
    kind: action
    payload: "[DEVIALET>SOURCE=--]"
    params: []

  - id: source_next
    label: Next Source
    kind: action
    payload: "[DEVIALET>SOURCE=++]"
    params: []

  - id: volume_set
    label: Set Volume
    kind: action
    payload: "[DEVIALET>VOLUME={level}]"
    params:
      - name: level
        type: number
        min: -97.5
        max: 30
        step: 0.5
        unit: dB
        description: Absolute volume level in dB

  - id: volume_down
    label: Volume Down
    kind: action
    payload: "[DEVIALET>VOLUME=--]"
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    payload: "[DEVIALET>VOLUME=++]"
    params: []

  - id: mute_off
    label: Unmute
    kind: action
    payload: "[DEVIALET>MUTE=0]"
    params: []

  - id: mute_on
    label: Mute
    kind: action
    payload: "[DEVIALET>MUTE=1]"
    params: []

  - id: mute_toggle
    label: Toggle Mute
    kind: action
    payload: "[DEVIALET>MUTE=!]"
    params: []

  - id: phase_normal
    label: Normal Phase
    kind: action
    payload: "[DEVIALET>PHASE=0]"
    params: []

  - id: phase_invert
    label: Invert Phase
    kind: action
    payload: "[DEVIALET>PHASE=1]"
    params: []

  - id: phase_toggle
    label: Toggle Phase
    kind: action
    payload: "[DEVIALET>PHASE=!]"
    params: []

  - id: preout_disable
    label: Disable PreOut
    kind: action
    payload: "[DEVIALET>PREOUT=0]"
    params: []

  - id: preout_enable
    label: Enable PreOut
    kind: action
    payload: "[DEVIALET>PREOUT=1]"
    params: []

  - id: preout_toggle
    label: Toggle PreOut
    kind: action
    payload: "[DEVIALET>PREOUT=!]"
    params: []

  - id: riaa_1953
    label: RIAA Curve 1953
    kind: action
    payload: "[DEVIALET>RIAA=0]"
    params: []

  - id: riaa_1976
    label: RIAA Curve 1976
    kind: action
    payload: "[DEVIALET>RIAA=1]"
    params: []

  - id: riaa_toggle
    label: Toggle RIAA Curve
    kind: action
    payload: "[DEVIALET>RIAA=!]"
    params: []

  - id: subsonic_filter_disable
    label: Disable Subsonic Filter
    kind: action
    payload: "[DEVIALET>SUBSONIC_FILTER=0]"
    params: []

  - id: subsonic_filter_enable
    label: Enable Subsonic Filter
    kind: action
    payload: "[DEVIALET>SUBSONIC_FILTER=1]"
    params: []

  - id: subsonic_filter_toggle
    label: Toggle Subsonic Filter
    kind: action
    payload: "[DEVIALET>SUBSONIC_FILTER=!]"
    params: []

  - id: subwoofer_disable
    label: Disable Subwoofer
    kind: action
    payload: "[DEVIALET>SUBWOOFER=0]"
    params: []

  - id: subwoofer_enable
    label: Enable Subwoofer
    kind: action
    payload: "[DEVIALET>SUBWOOFER=1]"
    params: []

  - id: subwoofer_toggle
    label: Toggle Subwoofer
    kind: action
    payload: "[DEVIALET>SUBWOOFER=!]"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    query: "[DEVIALET>POWER=?]"
    response_pattern: "[DEVIALET>POWER={value}]"
    type: enum
    values: ["0", "1"]
    description: "0=off, 1=on"

  - id: start_state
    label: Start State
    query: "[DEVIALET>START=?]"
    response_pattern: "[DEVIALET>START={value}]"
    type: enum
    values: ["0", "1"]
    description: "1 when unit is starting (meanwhile POWER=0)"

  - id: stop_state
    label: Stop State
    query: "[DEVIALET>STOP=?]"
    response_pattern: "[DEVIALET>STOP={value}]"
    type: enum
    values: ["0", "1"]
    description: "1 when unit is stopping (meanwhile POWER=0)"

  - id: source
    label: Current Source
    query: "[DEVIALET>SOURCE=?]"
    response_pattern: "[DEVIALET>SOURCE={value}]"
    type: enum
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
    description: Current active source name

  - id: volume
    label: Volume Level
    query: "[DEVIALET>VOLUME=?]"
    response_pattern: "[DEVIALET>VOLUME={value}]"
    type: number
    min: -97.5
    max: 30
    step: 0.5
    unit: dB

  - id: mute_state
    label: Mute State
    query: "[DEVIALET>MUTE=?]"
    response_pattern: "[DEVIALET>MUTE={value}]"
    type: enum
    values: ["0", "1"]
    description: "0=unmuted, 1=muted"

  - id: phase_state
    label: Phase State
    query: "[DEVIALET>PHASE=?]"
    response_pattern: "[DEVIALET>PHASE={value}]"
    type: enum
    values: ["0", "1"]
    description: "0=normal, 1=inverted"

  - id: preout_state
    label: PreOut State
    query: "[DEVIALET>PREOUT=?]"
    response_pattern: "[DEVIALET>PREOUT={value}]"
    type: enum
    values: ["0", "1"]
    description: "0=disabled, 1=enabled"

  - id: riaa_state
    label: RIAA Curve
    query: "[DEVIALET>RIAA=?]"
    response_pattern: "[DEVIALET>RIAA={value}]"
    type: enum
    values: ["0", "1"]
    description: "0=RIAA 1953, 1=RIAA 1976"

  - id: subsonic_filter_state
    label: Subsonic Filter State
    query: "[DEVIALET>SUBSONIC_FILTER=?]"
    response_pattern: "[DEVIALET>SUBSONIC_FILTER={value}]"
    type: enum
    values: ["0", "1"]
    description: "0=disabled, 1=enabled"

  - id: subwoofer_state
    label: Subwoofer State
    query: "[DEVIALET>SUBWOOFER=?]"
    response_pattern: "[DEVIALET>SUBWOOFER={value}]"
    type: enum
    values: ["0", "1"]
    description: "0=disabled, 1=enabled"
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions and volume (covered in actions/feedbacks)
```

## Events
```yaml
events:
  - id: auto_change_notification
    label: Auto Change Notification
    description: >-
      When "Auto change notification" mode is enabled, the Devialet
      automatically sends status updates when a parameter is changed
      by the user via remote or other means. Format matches the query
      response pattern (e.g. [DEVIALET>VOLUME=12.5]).
    trigger: parameter_changed_by_user
    response_pattern: "[DEVIALET>COMMAND=VALUE]"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >-
      Non-power commands are only available when POWER=1 (unit is powered on).
      During start sequence (START=1) and stop sequence (STOP=1), POWER=0.
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Command format: `[IDENTIFIER>COMMAND=VALUE]` where IDENTIFIER is configurable (default: `DEVIALET`).
- Three operating modes (set via configurator): Command Acknowledge (responds with command + ACK), Auto Change Notification (pushes state on user changes), Echo Chaining (echoes received bytes).
- Baud rate is configurable from 9600 to 115200 via the Devialet configurator; default is 115200.
- Source names are configurable via the online configurator and may differ from the defaults listed.
- `SOURCE=--` cycles to previous source (bottom to top in list); `SOURCE=++` cycles to next source (top to bottom).
- The device also has a 3.5mm TRIG IN / TRIG OUT connector for TTL-level (up to 12V) trigger-based remote on/off, but its serial command protocol is not documented.

<!-- UNRESOLVED: exact ACK response format not fully specified (e.g. "[DEVIALET>VOLUME=ACK]" shown as example) -->
<!-- UNRESOLVED: RS-232 connector pinout not specified -->
<!-- UNRESOLVED: configurator software details and configuration protocol not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: trigger I/O command protocol (beyond physical spec) not documented -->

## Provenance

```yaml
source_domains:
  - devialet.com
source_urls:
  - https://www.devialet.com/en-us/docs/D-Premier-RS232.pdf
retrieved_at: 2026-04-30T04:26:34.695Z
last_checked_at: 2026-04-25T20:38:08.456Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:38:08.456Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions matched literals from source; complete transport verification (baud 115200, 8n1, no flow control); no extraneous commands in source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact pinout of the RS-232 connector not specified in source"
- "trigger I/O (3.5mm jack) control protocol not fully documented — only physical specs given"
- "no settable parameters beyond discrete actions and volume (covered in actions/feedbacks)"
- "no multi-step sequences described in source"
- "no explicit safety warnings or interlock procedures in source"
- "exact ACK response format not fully specified (e.g. \"[DEVIALET>VOLUME=ACK]\" shown as example)"
- "RS-232 connector pinout not specified"
- "configurator software details and configuration protocol not documented"
- "firmware version compatibility not stated in source"
- "trigger I/O command protocol (beyond physical spec) not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
