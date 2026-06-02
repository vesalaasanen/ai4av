---
spec_id: admin/devialet-d-expert
schema_version: ai4av-public-spec-v1
revision: 1
title: "Devialet D-EXPERT Control Spec"
manufacturer: Devialet
model_family: D-EXPERT
aliases: []
compatible_with:
  manufacturers:
    - Devialet
  models:
    - D-EXPERT
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - devialet.com
source_urls:
  - https://www.devialet.com/en-us/docs/D-Premier-RS232.pdf
retrieved_at: 2026-04-30T04:26:31.247Z
last_checked_at: 2026-06-02T22:06:03.434Z
generated_at: 2026-06-02T22:06:03.434Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact connector pinout not documented; trigger input/output specifications mentioned but trigger commands not detailed beyond TTL-level description"
  - "no settable parameters beyond actions/feedbacks documented in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures found in source"
  - "exact serial connector pinout not documented"
  - "trigger output configuration details not fully documented"
  - "ACK response format details — source shows example but not full specification"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:06:03.434Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Devialet D-EXPERT Control Spec

## Summary
The Devialet D-EXPERT is a high-end integrated amplifier controllable via RS-232C serial. Commands follow the pattern `[DEVIALET>COMMAND=VALUE]` with ACK responses. The device supports power, source selection, volume, mute, phase, PreOut, RIAA curve, subsonic filter, and subwoofer control. The programmable identifier defaults to `DEVIALET` and can be changed via the configurator.

<!-- UNRESOLVED: exact connector pinout not documented; trigger input/output specifications mentioned but trigger commands not detailed beyond TTL-level description -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; configurable 9600-115200 via configurator
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
  - powerable   # power on/off/toggle/query commands
  - routable    # source selection commands with named inputs
  - queryable   # query commands returning current state
  - levelable   # volume control with dB values, step 0.5 dB
```

## Actions
```yaml
actions:
  - id: power_off
    label: Power Off
    kind: action
    command: "[DEVIALET>POWER=0]"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: "[DEVIALET>POWER=1]"
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "[DEVIALET>POWER=!]"
    params: []

  - id: select_source
    label: Select Source
    kind: action
    command: "[DEVIALET>SOURCE={source}]"
    params:
      - name: source
        type: string
        description: "Source name (AES/EBU, Digital 1, Digital 2, Digital 3, Digital 4, Phono 2, Line 1, Line 2, Phono, Optical 1, Optical 2, HDMI, Air, Brown N, -- for previous, ++ for next)"
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
          - "--"
          - "++"

  - id: volume_set
    label: Set Volume
    kind: action
    command: "[DEVIALET>VOLUME={level}]"
    params:
      - name: level
        type: number
        description: "Volume in dB (min -97.5, max 30, step 0.5)"
        min: -97.5
        max: 30
        step: 0.5

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

  - id: mute_off
    label: Unmute
    kind: action
    command: "[DEVIALET>MUTE=0]"
    params: []

  - id: mute_on
    label: Mute
    kind: action
    command: "[DEVIALET>MUTE=1]"
    params: []

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "[DEVIALET>MUTE=!]"
    params: []

  - id: phase_normal
    label: Phase Normal
    kind: action
    command: "[DEVIALET>PHASE=0]"
    params: []

  - id: phase_invert
    label: Phase Invert
    kind: action
    command: "[DEVIALET>PHASE=1]"
    params: []

  - id: phase_toggle
    label: Phase Toggle
    kind: action
    command: "[DEVIALET>PHASE=!]"
    params: []

  - id: preout_disable
    label: Disable PreOut
    kind: action
    command: "[DEVIALET>PREOUT=0]"
    params: []

  - id: preout_enable
    label: Enable PreOut
    kind: action
    command: "[DEVIALET>PREOUT=1]"
    params: []

  - id: preout_toggle
    label: PreOut Toggle
    kind: action
    command: "[DEVIALET>PREOUT=!]"
    params: []

  - id: riaa_1953
    label: RIAA Curve 1953
    kind: action
    command: "[DEVIALET>RIAA=0]"
    params: []

  - id: riaa_1976
    label: RIAA Curve 1976
    kind: action
    command: "[DEVIALET>RIAA=1]"
    params: []

  - id: riaa_toggle
    label: RIAA Toggle
    kind: action
    command: "[DEVIALET>RIAA=!]"
    params: []

  - id: subsonic_filter_disable
    label: Disable Subsonic Filter
    kind: action
    command: "[DEVIALET>SUBSONIC_FILTER=0]"
    params: []

  - id: subsonic_filter_enable
    label: Enable Subsonic Filter
    kind: action
    command: "[DEVIALET>SUBSONIC_FILTER=1]"
    params: []

  - id: subsonic_filter_toggle
    label: Subsonic Filter Toggle
    kind: action
    command: "[DEVIALET>SUBSONIC_FILTER=!]"
    params: []

  - id: subwoofer_disable
    label: Disable Subwoofer
    kind: action
    command: "[DEVIALET>SUBWOOFER=0]"
    params: []

  - id: subwoofer_enable
    label: Enable Subwoofer
    kind: action
    command: "[DEVIALET>SUBWOOFER=1]"
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
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>POWER=?]"
    response_pattern: "[DEVIALET>POWER={value}]"

  - id: start_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>START=?]"
    description: "Returns 1 when unit is starting (meanwhile POWER=0)"

  - id: stop_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>STOP=?]"
    description: "Returns 1 when unit is stopping (meanwhile POWER=0)"

  - id: source
    type: string
    query_command: "[DEVIALET>SOURCE=?]"
    response_pattern: "[DEVIALET>SOURCE={value}]"

  - id: volume
    type: number
    query_command: "[DEVIALET>VOLUME=?]"
    response_pattern: "[DEVIALET>VOLUME={value}]"
    description: "Volume in dB"

  - id: mute_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>MUTE=?]"
    response_pattern: "[DEVIALET>MUTE={value}]"

  - id: phase_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>PHASE=?]"
    response_pattern: "[DEVIALET>PHASE={value}]"

  - id: preout_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>PREOUT=?]"
    response_pattern: "[DEVIALET>PREOUT={value}]"

  - id: riaa_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>RIAA=?]"
    response_pattern: "[DEVIALET>RIAA={value}]"

  - id: subsonic_filter_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>SUBSONIC_FILTER=?]"
    response_pattern: "[DEVIALET>SUBSONIC_FILTER={value}]"

  - id: subwoofer_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>SUBWOOFER=?]"
    response_pattern: "[DEVIALET>SUBWOOFER={value}]"
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond actions/feedbacks documented in source
```

## Events
```yaml
# The device supports "auto change notification" mode where it sends status
# automatically when a parameter is changed by remote or other means.
# The exact event format is the same as the command response pattern.
# Example: [DEVIALET>VOLUME=12.5] sent unsolicited on volume change.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- The command format is `[IDENTIFIER>COMMAND=VALUE]`. The default identifier is `DEVIALET` and is configurable via the Devialet configurator software.
- The baud rate is configurable from 9600 to 115200 via the configurator; default is 115200.
- Three communication modes are available: Command Acknowledge (responds with command + ACK), Auto Change Notification (unsolicited status updates on parameter changes), and Echo Chaining (repeats received bytes on Tx).
- Non-power commands are only available when `POWER=1`.
- Source names are configurable via the configurator; the defaults are listed in the source commands.
- The trigger input uses a standard 3.5mm stereo jack, TTL compatible up to 12V, for remote on/off control.
<!-- UNRESOLVED: exact serial connector pinout not documented -->
<!-- UNRESOLVED: trigger output configuration details not fully documented -->
<!-- UNRESOLVED: ACK response format details — source shows example but not full specification -->

## Provenance

```yaml
source_domains:
  - devialet.com
source_urls:
  - https://www.devialet.com/en-us/docs/D-Premier-RS232.pdf
retrieved_at: 2026-04-30T04:26:31.247Z
last_checked_at: 2026-06-02T22:06:03.434Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:06:03.434Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact connector pinout not documented; trigger input/output specifications mentioned but trigger commands not detailed beyond TTL-level description"
- "no settable parameters beyond actions/feedbacks documented in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures found in source"
- "exact serial connector pinout not documented"
- "trigger output configuration details not fully documented"
- "ACK response format details — source shows example but not full specification"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
