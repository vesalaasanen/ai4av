---
spec_id: admin/casio-xjl8300hn
schema_version: ai4av-public-spec-v1
revision: 1
title: "Casio XJL8300HN Control Spec"
manufacturer: Casio
model_family: XJL8300HN
aliases: []
compatible_with:
  manufacturers:
    - Casio
  models:
    - XJL8300HN
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.casio.com
source_urls:
  - https://support.casio.com/pdf/007/YK-5_RS-232C_Control_E.pdf
retrieved_at: 2026-05-14T13:50:09.945Z
last_checked_at: 2026-06-02T22:04:58.482Z
generated_at: 2026-06-02T22:04:58.482Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "firmware version compatibility not stated in source"
  - "specific volume range for this model not stated — range varies by model"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:04:58.482Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Casio XJL8300HN Control Spec

## Summary
Casio data projector with RS-232C serial control interface. All commands use ASCII decimal format. Projector returns `?` for unrecognized commands and ignores values outside valid ranges (e.g., volume clamped to max).

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
- powerable    # PWR read/write present
- routable     # SRC input switching present
- queryable    # LMP lamp time query, read commands present
- levelable    # VOL volume control present
```

## Actions
```yaml
- id: power
  label: Power On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 1 = On

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: 0=RGB, 1=Component, 2=Video, 5=USB, 6=Auto(RGB/Component), 7=HDMI, 8=Wireless

- id: blank_screen
  label: Blank Screen
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 1 = On

- id: volume
  label: Volume
  kind: action
  params:
    - name: level
      type: integer
      description: 0-50 (range varies by model - projector clamps out-of-range to max)

- id: color_mode
  label: Color Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Presentation, 1=Graphics, 2=Theater, 3=Standard, 4=Blackboard, 5=Game

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 0=Normal(RGB/HDMI PC), 1=16:9, 2=Normal(Video/component/HDMI DTV), 3=Letter Box, 4=Full, 5=True, 6=4:3

- id: optical_zoom_shift
  label: Optical Zoom Shift
  kind: action
  params:
    - name: direction
      type: integer
      description: 0=No change, 1=Shift wide, 2=Shift tele

- id: optical_focus_shift
  label: Optical Focus Shift
  kind: action
  params:
    - name: direction
      type: integer
      description: 0=No change, 1=Shift near, 2=Shift far

- id: lamp_time_reset
  label: Lamp Time Reset
  kind: action
  params:
    - name: action
      type: integer
      description: 0=Do not reset, 1=Reset (only when lamp time exceeds 2100 hours AND power is off)
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [0, 1]
  description: 0=Off, 1=On

- id: input_source
  label: Input Source
  type: enum
  values: [0, 1, 2, 5, 6, 7, 8]
  description: Current selected input

- id: blank_state
  label: Blank Screen State
  type: enum
  values: [0, 1]
  description: 0=Off, 1=On

- id: volume_level
  label: Volume Level
  type: range
  description: Returns (min,max,current) e.g. (0-50,35)

- id: color_mode_state
  label: Color Mode
  type: enum
  values: [0, 1, 2, 3, 4, 5]

- id: aspect_ratio_state
  label: Aspect Ratio
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]

- id: lamp_time
  label: Lamp Time
  type: integer
  description: Hours elapsed - read only

- id: lamp_time_reset_state
  label: Lamp Time Reset
  type: enum
  values: [0, 1]
  description: 0=Do not reset, 1=Reset (write only when conditions met)
```

## Variables
```yaml
# All settable parameters exposed as both write actions and read queries.
# No additional variables beyond Actions above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - After turning off, wait for projector to cool down before turning power back on
  - After power on, wait at least 1 minute before turning power off
  - Lamp time reset only allowed when lamp time exceeds 2100 hours AND projector power is off
```

## Notes
Command format: ASCII decimal integers wrapped in parentheses, e.g. `(PWR1)` to power on, `(VOL?)` to query volume.

Read format: send `<command>?` wrapped in parentheses, e.g. `(VOL?)`. Response: `(min,max,current)` wrapped in parentheses, e.g. `(0-50,35)`.

Write format: send `<command><value>` wrapped in parentheses, e.g. `(VOL25)`.

Projector returns `?` for unrecognized commands. Out-of-range values for bounded settings (e.g., volume) are clamped to maximum.

Most read/write operations disabled while projector is off. Exceptions: power state read, power on, lamp time read, lamp time reset.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: specific volume range for this model not stated — range varies by model -->

## Provenance

```yaml
source_domains:
  - support.casio.com
source_urls:
  - https://support.casio.com/pdf/007/YK-5_RS-232C_Control_E.pdf
retrieved_at: 2026-05-14T13:50:09.945Z
last_checked_at: 2026-06-02T22:04:58.482Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:04:58.482Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "firmware version compatibility not stated in source"
- "specific volume range for this model not stated — range varies by model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
