---
spec_id: admin/casio-xj-sc210
schema_version: ai4av-public-spec-v1
revision: 1
title: "Casio XJ-SC210 Control Spec"
manufacturer: Casio
model_family: XJ-SC210
aliases: []
compatible_with:
  manufacturers:
    - Casio
  models:
    - XJ-SC210
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.casio.com
  - applicationmarket.crestron.com
retrieved_at: 2026-04-29T17:27:21.180Z
last_checked_at: 2026-04-30T09:38:04.086Z
generated_at: 2026-04-30T09:38:04.086Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:38:04.086Z
  matched_actions: 18
  action_count: 18
  confidence: high
  summary: "All 18 spec actions matched source commands; transport parameters verified; full command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Casio XJ-SC210 Control Spec

## Summary
Casio XJ-SC210 data projector with RS-232C serial control via the YK-5 serial conversion cable. Commands use ASCII characters and decimal integers. Read commands query current settings; write commands control projector functions.

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
  - powerable    # PWR command
  - queryable    # read commands return current settings
  - routable     # SRC input switching
  - levelable    # VOL volume control
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
    notes: "After turning off, must wait for cooldown before turning back on. After power on, wait at least one minute before turning power off."

  - id: select_input
    label: Select Input
    kind: action
    command: "(SRC{value})"
    params:
      - name: value
        type: integer
        enum: [0, 1, 2, 5, 6, 7, 8]
        description: "0: RGB, 1: Component, 2: Video, 5: USB, 6: Auto (RGB/Component), 7: HDMI, 8: Wireless"

  - id: blank_screen_on
    label: Blank Screen On
    kind: action
    command: "(BLK1)"
    params: []
    notes: "Valid signal input must be in progress."

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
        description: "Volume level (0=mute). Range may be 0-30 depending on projector model."

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
    notes: "Valid signal input must be in progress."

  - id: optical_zoom_shift
    label: Optical Zoom Shift
    kind: action
    command: "(OZM{value})"
    params:
      - name: value
        type: integer
        enum: [0, 1, 2]
        description: "0: No change, 1: Shift one step towards wide, 2: Shift one step towards tele"

  - id: optical_focus_shift
    label: Optical Focus Shift
    kind: action
    command: "(OFC{value})"
    params:
      - name: value
        type: integer
        enum: [0, 1, 2]
        description: "0: No change, 1: Shift one step towards near, 2: Shift one step towards far"

  - id: reset_lamp_time
    label: Reset Lamp Time
    kind: action
    command: "(LRT1)"
    params: []
    notes: "Only when lamp time exceeds 2100 hours and projector power is off."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command: "(PWR?)"
    response_format: "(0-1,{value})"
    type: enum
    values: ["0", "1"]
    value_meaning: "0: Off, 1: On"

  - id: input_source
    label: Input Source
    command: "(SRC?)"
    response_format: "(0-8,{value})"
    type: enum
    values: ["0", "1", "2", "5", "6", "7", "8"]
    value_meaning: "0: RGB, 1: Component, 2: Video, 5: USB, 6: Auto, 7: HDMI, 8: Wireless"

  - id: blank_screen_state
    label: Blank Screen State
    command: "(BLK?)"
    response_format: "(0-1,{value})"
    type: enum
    values: ["0", "1"]
    value_meaning: "0: Off, 1: On"

  - id: volume_level
    label: Volume Level
    command: "(VOL?)"
    response_format: "(0-50,{value})"
    type: integer
    min: 0
    max: 50

  - id: color_mode
    label: Color Mode
    command: "(PST?)"
    response_format: "(0-5,{value})"
    type: enum
    values: ["0", "1", "2", "3", "4", "5"]
    value_meaning: "0: Presentation, 1: Graphics, 2: Theater, 3: Standard, 4: Blackboard, 5: Game"

  - id: aspect_ratio
    label: Aspect Ratio
    command: "(ARZ?)"
    response_format: "(0-6,{value})"
    type: enum
    values: ["0", "1", "2", "3", "4", "5", "6"]
    value_meaning: "0: Normal, 1: 16:9, 2: Normal, 3: Letter Box, 4: Full, 5: True, 6: 4:3"

  - id: lamp_time
    label: Lamp Time
    command: "(LMP?)"
    response_format: "(0-,{value})"
    type: integer
    unit: hours
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions identified in source
```

## Events
```yaml
# No unsolicited notifications documented. Projector returns ? for unrecognized commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  After power off, must wait for cooldown before powering back on.
  After power on, wait at least one minute before turning power off.
  If projector is busy processing a prior command, key operation, or remote control
  operation, next command must wait until prior process completes.
  Volume values outside valid range clamp to maximum.
```

## Notes
- All commands use ASCII characters and decimal format integers.
- Command send format for read: `(<command name>?)`. Response: `(<range>,<current setting>)`.
- Command send format for write: `(<command name><setting value>)`.
- Projector returns `?` for unrecognized commands.
- Volume range varies by model (0-50 or 0-30).
- Blank screen and aspect ratio commands require valid signal input.
- Lamp time reset requires lamp time >2100 hours and projector powered off.
- Not all commands available on all models; availability depends on projector feature set.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact cooldown duration after power off not specified -->

## Provenance

```yaml
source_domains:
  - support.casio.com
  - applicationmarket.crestron.com
retrieved_at: 2026-04-29T17:27:21.180Z
last_checked_at: 2026-04-30T09:38:04.086Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:38:04.086Z
matched_actions: 18
action_count: 18
confidence: high
summary: "All 18 spec actions matched source commands; transport parameters verified; full command coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
