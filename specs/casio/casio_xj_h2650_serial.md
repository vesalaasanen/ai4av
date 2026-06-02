---
spec_id: admin/casio-xj-h2650
schema_version: ai4av-public-spec-v1
revision: 1
title: "Casio XJ-H2650 Control Spec"
manufacturer: Casio
model_family: XJ-H2650
aliases: []
compatible_with:
  manufacturers:
    - Casio
  models:
    - XJ-H2650
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.casio.com
source_urls:
  - https://support.casio.com/pdf/007/YK-5_RS-232C_Control_E.pdf
retrieved_at: 2026-05-20T00:27:05.504Z
last_checked_at: 2026-05-22T13:30:17.445Z
generated_at: 2026-05-22T13:30:17.445Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model variants supported not stated beyond XJ-H2650"
  - "no unsolicited event/notification protocol described in source"
  - "no multi-step sequences described in source"
  - "exact cooldown duration not stated in source"
  - "exact cooldown time after power off not stated"
  - "response timeout duration not stated"
  - "maximum command queue depth not stated"
verification:
  verdict: verified
  checked_at: 2026-05-22T13:30:17.445Z
  matched_actions: 11
  action_count: 11
  confidence: medium
  summary: "All 11 spec actions matched with correct opcodes and parameters; all transport values verified in source; all source commands represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Casio XJ-H2650 Control Spec

## Summary
Casio XJ-H2650 data projector with RS-232C serial control. Commands use ASCII characters and decimal format integers. Read queries return setting range and current value; write commands set values. Requires YK-5 serial conversion cable and straight serial cable.

<!-- UNRESOLVED: exact model variants supported not stated beyond XJ-H2650 -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
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
  - powerable    # PWR command controls on/off
  - routable     # SRC command switches input sources
  - queryable    # read commands return current settings
  - levelable    # VOL command adjusts volume
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "(PWR1)"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "(PWR0)"
    params: []

  - id: select_input
    label: Select Input Source
    kind: action
    command: "(SRC{value})"
    params:
      - name: value
        type: integer
        enum: [0, 1, 2, 5, 6, 7, 8]
        description: "0: RGB, 1: Component, 2: Video, 5: USB, 6: Auto, 7: HDMI, 8: Wireless"

  - id: blank_screen_on
    label: Blank Screen On
    kind: action
    command: "(BLK1)"
    params: []

  - id: blank_screen_off
    label: Blank Screen Off
    kind: action
    command: "(BLK0)"
    params: []

  - id: set_volume
    label: Set Volume
    kind: action
    command: "(VOL{value})"
    params:
      - name: value
        type: integer
        min: 0
        max: 50
        description: "Volume level (0-50, or 0-30 depending on model)"

  - id: set_color_mode
    label: Set Color Mode
    kind: action
    command: "(PST{value})"
    params:
      - name: value
        type: integer
        enum: [0, 1, 2, 3, 4, 5]
        description: "0: Presentation, 1: Graphics, 2: Theater, 3: Standard, 4: Blackboard, 5: Game"

  - id: set_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: "(ARZ{value})"
    params:
      - name: value
        type: integer
        enum: [0, 1, 2, 3, 4, 5, 6]
        description: "0: Normal (RGB/HDMI PC), 1: 16:9, 2: Normal (Video/Component/HDMI DTV), 3: Letter Box, 4: Full, 5: True, 6: 4:3"

  - id: optical_zoom_shift
    label: Optical Zoom Shift
    kind: action
    command: "(OZM{value})"
    params:
      - name: value
        type: integer
        enum: [0, 1, 2]
        description: "0: No change, 1: Wide, 2: Tele"

  - id: optical_focus_shift
    label: Optical Focus Shift
    kind: action
    command: "(OFC{value})"
    params:
      - name: value
        type: integer
        enum: [0, 1, 2]
        description: "0: No change, 1: Near, 2: Far"

  - id: reset_lamp_time
    label: Reset Lamp Time
    kind: action
    command: "(LRT1)"
    params: []
    notes: "Only when lamp time exceeds 2100 hours and projector power is off"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    query: "(PWR?)"
    response_format: "(0-1,{value})"
    type: enum
    values: ["0", "1"]
    description: "0: Off, 1: On"

  - id: input_source
    label: Input Source
    query: "(SRC?)"
    response_format: "({range},{value})"
    type: enum
    values: ["0", "1", "2", "5", "6", "7", "8"]
    description: "Current input source"

  - id: blank_screen_state
    label: Blank Screen State
    query: "(BLK?)"
    response_format: "(0-1,{value})"
    type: enum
    values: ["0", "1"]
    description: "0: Off, 1: On"

  - id: volume_level
    label: Volume Level
    query: "(VOL?)"
    response_format: "(0-50,{value})"
    type: integer
    description: "Current volume setting"

  - id: color_mode
    label: Color Mode
    query: "(PST?)"
    response_format: "({range},{value})"
    type: enum
    values: ["0", "1", "2", "3", "4", "5"]
    description: "Current color mode"

  - id: aspect_ratio
    label: Aspect Ratio
    query: "(ARZ?)"
    response_format: "({range},{value})"
    type: enum
    values: ["0", "1", "2", "3", "4", "5", "6"]
    description: "Current aspect ratio"

  - id: lamp_time
    label: Lamp Time
    query: "(LMP?)"
    response_format: "(0-,{value})"
    type: integer
    unit: hours
    description: "Cumulative lamp usage in hours"
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    command: "(VOL{value})"
    query: "(VOL?)"
    type: integer
    min: 0
    max: 50
    description: "Volume level (0-50 or 0-30 depending on model)"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  - reset_lamp_time
interlocks:
  - description: "After power off, must wait for cooldown before powering back on"
  - description: "After power on, wait at least one minute before powering off"
  - description: "Lamp time reset only when lamp exceeds 2100 hours and power is off"
# UNRESOLVED: exact cooldown duration not stated in source
```

## Notes
- All commands use ASCII characters and decimal format integers.
- Commands wrapped in parentheses: `(CMD?)` for read, `(CMDvalue)` for write.
- Projector returns `?` for unrecognized commands.
- Out-of-range values for settings like VOL change to maximum value rather than being ignored.
- Must wait for previous command to complete before sending next command.
- Most read/write commands disabled while projector is off (exceptions: PWR read, PWR write on, LMP read, LRT write).
- Valid signal input required for blank screen and aspect ratio commands.
- Volume range varies by model (0-50 or 0-30).

<!-- UNRESOLVED: exact cooldown time after power off not stated -->
<!-- UNRESOLVED: response timeout duration not stated -->
<!-- UNRESOLVED: maximum command queue depth not stated -->

## Provenance

```yaml
source_domains:
  - support.casio.com
source_urls:
  - https://support.casio.com/pdf/007/YK-5_RS-232C_Control_E.pdf
retrieved_at: 2026-05-20T00:27:05.504Z
last_checked_at: 2026-05-22T13:30:17.445Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-22T13:30:17.445Z
matched_actions: 11
action_count: 11
confidence: medium
summary: "All 11 spec actions matched with correct opcodes and parameters; all transport values verified in source; all source commands represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model variants supported not stated beyond XJ-H2650"
- "no unsolicited event/notification protocol described in source"
- "no multi-step sequences described in source"
- "exact cooldown duration not stated in source"
- "exact cooldown time after power off not stated"
- "response timeout duration not stated"
- "maximum command queue depth not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
