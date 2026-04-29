---
schema_version: ai4av-public-spec-v1
device_id: devialet/devialet-expert-series
entity_id: devialet_expert_series
spec_id: admin/devialet-expert-series
revision: 1
author: admin
title: "Devialet EXPERT Series Control Spec"
status: published
manufacturer: Devialet
manufacturer_key: devialet
model_family: "Devialet EXPERT Series"
aliases: []
compatible_with:
  manufacturers:
    - Devialet
  models:
    - "Devialet EXPERT Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: devialet_expert_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:38:07.492Z
retrieved_at: 2026-04-25T20:38:07.492Z
last_checked_at: 2026-04-25T20:38:07.492Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:38:07.492Z
  matched_actions: 38
  action_count: 38
  confidence: high
  summary: "All 38 spec actions matched verbatim in source, all transport parameters verified, complete command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Devialet EXPERT Series Control Spec

## Summary
The Devialet EXPERT Series is a high-end integrated amplifier controllable via RS-232C serial. The protocol uses a text-based command format `[IDENTIFIER>COMMAND=VALUE]` with a default identifier of `DEVIALET`. Commands cover power, source selection, volume, mute, phase, pre-out, RIAA curve, subsonic filter, and subwoofer control. The device supports query commands and can autonomously notify status changes.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; configurable 9600–115200 via configurator
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
  - powerable    # power on/off/toggle commands present
  - routable     # source selection commands present
  - queryable    # query commands returning state present
  - levelable    # volume control with dB values present
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
        description: "Source name (AES/EBU, Digital 1, Digital 2, Digital 3, Digital 4, Phono 2, Line 1, Line 2, Phono, Optical 1, Optical 2, HDMI, Air, Brown N)"

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

  - id: set_volume
    label: Set Volume
    kind: action
    command: "[DEVIALET>VOLUME={volume}]"
    params:
      - name: volume
        type: number
        description: "Volume in dB (min: -97.5, max: 30, step: 0.5)"

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
    label: Toggle Phase
    kind: action
    command: "[DEVIALET>PHASE=!]"
    params: []

  - id: preout_off
    label: Disable PreOut
    kind: action
    command: "[DEVIALET>PREOUT=0]"
    params: []

  - id: preout_on
    label: Enable PreOut
    kind: action
    command: "[DEVIALET>PREOUT=1]"
    params: []

  - id: preout_toggle
    label: Toggle PreOut
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
    label: Toggle RIAA Curve
    kind: action
    command: "[DEVIALET>RIAA=!]"
    params: []

  - id: subsonic_filter_off
    label: Disable Subsonic Filter
    kind: action
    command: "[DEVIALET>SUBSONIC_FILTER=0]"
    params: []

  - id: subsonic_filter_on
    label: Enable Subsonic Filter
    kind: action
    command: "[DEVIALET>SUBSONIC_FILTER=1]"
    params: []

  - id: subsonic_filter_toggle
    label: Toggle Subsonic Filter
    kind: action
    command: "[DEVIALET>SUBSONIC_FILTER=!]"
    params: []

  - id: subwoofer_off
    label: Disable Subwoofer
    kind: action
    command: "[DEVIALET>SUBWOOFER=0]"
    params: []

  - id: subwoofer_on
    label: Enable Subwoofer
    kind: action
    command: "[DEVIALET>SUBWOOFER=1]"
    params: []

  - id: subwoofer_toggle
    label: Toggle Subwoofer
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
    response_format: "[DEVIALET>POWER=<0|1>]"

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
    response_format: "[DEVIALET>SOURCE=<name>]"

  - id: volume
    type: number
    query_command: "[DEVIALET>VOLUME=?]"
    response_format: "[DEVIALET>VOLUME=<value>]"
    description: "Volume in dB (range -97.5 to 30, step 0.5)"

  - id: mute_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>MUTE=?]"
    response_format: "[DEVIALET>MUTE=<0|1>]"

  - id: phase_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>PHASE=?]"
    response_format: "[DEVIALET>PHASE=<0|1>]"

  - id: preout_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>PREOUT=?]"
    response_format: "[DEVIALET>PREOUT=<0|1>]"

  - id: riaa_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>RIAA=?]"
    response_format: "[DEVIALET>RIAA=<0|1>]"
    description: "0 = RIAA 1953, 1 = RIAA 1976"

  - id: subsonic_filter_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>SUBSONIC_FILTER=?]"
    response_format: "[DEVIALET>SUBSONIC_FILTER=<0|1>]"

  - id: subwoofer_state
    type: enum
    values: ["0", "1"]
    query_command: "[DEVIALET>SUBWOOFER=?]"
    response_format: "[DEVIALET>SUBWOOFER=<0|1>]"
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions found in source
```

## Events
```yaml
events:
  - id: auto_change_notification
    description: >-
      In auto change notification mode, the Devialet automatically sends status
      when a parameter is changed by remote or other means.
    format: "[DEVIALET><COMMAND>=<VALUE>]"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions non-power commands only available when POWER=1,
# but no explicit safety interlock procedure documented.
```

## Notes
- The device identifier (`DEVIALET`) is programmable via the Devialet configurator tool.
- The baud rate is configurable from 9600 to 115200 via configurator; default is 115200.
- Three communication modes are available: command acknowledge, auto change notification, and echo chaining.
- Source names are configurable and may differ from defaults listed in the documentation.
- The unit also has a 3.5mm TRIG IN/TTL trigger input (up to 12V) for remote power on/off.
- Command acknowledge mode: the device responds with the command and ACK, e.g. `[DEVIALET>VOLUME=ACK]`.
<!-- UNRESOLVED: exact response format for all query commands not fully documented -->
<!-- UNRESOLVED: timing/delays between commands not specified -->
<!-- UNRESOLVED: trigger output configuration details not specified -->
<!-- UNRESOLVED: whether specific EXPERT Series models (120, 130, 220, 250, 440, 1000) differ in protocol -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: devialet_expert_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:38:07.492Z
retrieved_at: 2026-04-25T20:38:07.492Z
last_checked_at: 2026-04-25T20:38:07.492Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:38:07.492Z
matched_actions: 38
action_count: 38
confidence: high
summary: "All 38 spec actions matched verbatim in source, all transport parameters verified, complete command coverage."
```

## Known Gaps

```yaml
[]
```
