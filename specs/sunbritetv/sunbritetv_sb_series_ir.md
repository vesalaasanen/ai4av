---
spec_id: admin/sunbritetv-sb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sunbritetv SB Series Control Spec"
manufacturer: Sunbritetv
model_family: "SB Series"
aliases: []
compatible_with:
  manufacturers:
    - Sunbritetv
  models:
    - "SB Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T15:18:20.447Z
last_checked_at: 2026-05-14T18:17:21.049Z
generated_at: 2026-05-14T18:17:21.049Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.049Z
  matched_actions: 49
  action_count: 49
  confidence: high
  summary: "All 50 spec actions matched literally against source hex codes and transport parameters verified; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Sunbritetv SB Series Control Spec

## Summary
Sunbritetv SB Series outdoor display. RS-232 control at 9600/8/N/1. Commands sent as single ASCII bytes (prefixed with ESC 0x1B). Device returns execution acknowledgements. Supports power, input routing, volume, channel, and picture mode control.

<!-- UNRESOLVED: Model Class ID variants B3220AHD and B4610AHD mentioned but not listed as separate models. -->

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
- powerable  # Power ON/OFF/TOGGLE commands present
- routable   # Input selection commands present (HDMI1, HDMI2, AV, Component, VGA, USB, HDBaseT, Tuner)
- levelable  # Volume Up/Down, Mute present
- queryable  # Power Status and Firmware Version queries present
```

## Actions
```yaml
- id: power_status_query
  label: Power Status Query
  kind: query
  params: []
  command: [0x1B, 0x21]
  response_pattern: "[PWRON]"  # or no response if off

- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
  command: [0x1B, 0x24]  # [$]
  response: "[PWR]"

- id: power_on
  label: Power ON
  kind: action
  params: []
  command: [0x1B, 0x41]  # [A]
  response: "[PWRON]"

- id: power_off
  label: Power OFF
  kind: action
  params: []
  command: [0x1B, 0x42]  # [B]
  response: "[PWROFF]"

- id: select_input_tuner
  label: Select Input Tuner
  kind: action
  params: []
  command: [0x1B, 0x43]  # [C]
  response: "[TN1]"

- id: select_input_av
  label: Select Input AV
  kind: action
  params: []
  command: [0x1B, 0x44]  # [D]
  response: "[AV]"

- id: select_input_hdbaset
  label: Select Input HDBaseT
  kind: action
  params: []
  command: [0x1B, 0x46]  # [F]
  response: "[HDBaseT]"

- id: select_input_usb
  label: Select Input USB
  kind: action
  params: []
  command: [0x1B, 0x47]  # [G]
  response: "[USB]"

- id: select_input_component1
  label: Select Input Component 1
  kind: action
  params: []
  command: [0x1B, 0x48]  # [H]
  response: "[Component 1]"

- id: select_input_component2
  label: Select Input Component 2
  kind: action
  params: []
  command: [0x1B, 0x49]  # [I]
  response: "[Component2]"

- id: select_input_vga
  label: Select Input VGA
  kind: action
  params: []
  command: [0x1B, 0x4B]  # [K]
  response: "[VGA]"

- id: select_input_hdmi1
  label: Select Input HDMI 1
  kind: action
  params: []
  command: [0x1B, 0x4A]  # [J]
  response: "[HDMI1]"

- id: select_input_hdmi2
  label: Select Input HDMI 2
  kind: action
  params: []
  command: [0x1B, 0x4C]  # [L]
  response: "[HDMI2]"

- id: mute
  label: Mute Toggle
  kind: action
  params: []
  command: [0x1B, 0x58]  # [X]
  response: "[MUTE]"

- id: volume_up
  label: Volume Up
  kind: action
  params: []
  command: [0x1B, 0x59]  # [Y]
  response: "[VOL+]"

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  command: [0x1B, 0x5A]  # [Z]
  response: "[VOL-]"

- id: channel_up
  label: Channel Up
  kind: action
  params: []
  command: [0x1B, 0x56]  # [V]
  response: "[CH+]"

- id: channel_down
  label: Channel Down
  kind: action
  params: []
  command: [0x1B, 0x57]  # [W]
  response: "[CH-]"

- id: numeric_0
  label: Numeric 0
  kind: action
  params: []
  command: [0x1B, 0x30]  # [0]

- id: numeric_1
  label: Numeric 1
  kind: action
  params: []
  command: [0x1B, 0x31]  # [1]

- id: numeric_2
  label: Numeric 2
  kind: action
  params: []
  command: [0x1B, 0x32]  # [2]

- id: numeric_3
  label: Numeric 3
  kind: action
  params: []
  command: [0x1B, 0x33]  # [3]

- id: numeric_4
  label: Numeric 4
  kind: action
  params: []
  command: [0x1B, 0x34]  # [4]

- id: numeric_5
  label: Numeric 5
  kind: action
  params: []
  command: [0x1B, 0x35]  # [5]

- id: numeric_6
  label: Numeric 6
  kind: action
  params: []
  command: [0x1B, 0x36]  # [6]

- id: numeric_7
  label: Numeric 7
  kind: action
  params: []
  command: [0x1B, 0x37]  # [7]

- id: numeric_8
  label: Numeric 8
  kind: action
  params: []
  command: [0x1B, 0x38]  # [8]

- id: numeric_9
  label: Numeric 9
  kind: action
  params: []
  command: [0x1B, 0x39]  # [9]

- id: numeric_minus
  label: Numeric Minus
  kind: action
  params: []
  command: [0x1B, 0x2D]  # [-]

- id: channel_return
  label: Channel Return (Previous Channel)
  kind: action
  params: []
  command: [0x1B, 0x72]  # [r]

- id: source_toggle
  label: Source Toggle
  kind: action
  params: []
  command: [0x1B, 0x62]  # [b]

- id: aspect
  label: Aspect Ratio
  kind: action
  params: []
  command: [0x1B, 0x61]  # [a]

- id: enter
  label: Enter
  kind: action
  params: []
  command: [0x1B, 0x65]  # [e]

- id: info
  label: Info
  kind: action
  params: []
  command: [0x1B, 0x69]  # [i]

- id: closed_caption
  label: Closed Caption
  kind: action
  params: []
  command: [0x1B, 0x63]  # [c]

- id: sleep
  label: Sleep Timer
  kind: action
  params: []
  command: [0x1B, 0x7A]  # [z]

- id: picture
  label: Picture Mode
  kind: action
  params: []
  command: [0x1B, 0x70]  # [p]

- id: sound
  label: Sound Mode
  kind: action
  params: []
  command: [0x1B, 0x73]  # [s]

- id: menu
  label: Menu
  kind: action
  params: []
  command: [0x1B, 0x6D]  # [m]

- id: arrow_up
  label: Up Arrow
  kind: action
  params: []
  command: [0x1B, 0x5E]  # [^]

- id: arrow_down
  label: Down Arrow
  kind: action
  params: []
  command: [0x1B, 0x76]  # [v]

- id: arrow_left
  label: Left Arrow
  kind: action
  params: []
  command: [0x1B, 0x3E]  # [>]
  note: "ASCII '>' used for Left Arrow in source"

- id: arrow_right
  label: Right Arrow
  kind: action
  params: []
  command: [0x1B, 0x3C]  # [<]
  note: "ASCII '<' used for Right Arrow in source"

- id: picture_mode_personal
  label: Picture Mode 1 - Personal
  kind: action
  params: []
  command: [0x1B, 0x50]  # [P]

- id: picture_mode_standard
  label: Picture Mode 2 - Standard
  kind: action
  params: []
  command: [0x1B, 0x51]  # [Q]

- id: picture_mode_sunbrite_day
  label: Picture Mode 3 - SunBrite Day
  kind: action
  params: []
  command: [0x1B, 0x52]  # [R]

- id: picture_mode_sunbrite_night
  label: Picture Mode 4 - Sunbrite Night
  kind: action
  params: []
  command: [0x1B, 0x53]  # [S]

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  params: []
  command: [0x1B, 0x2E]  # [.]
  response: "main board followed by version"

- id: model_class_id_query
  label: Model Class ID Query
  kind: query
  params: []
  command: [0x1B, 0x3F]  # [?]
  response_pattern: "[B3220AHD-X.XX]"  # or B4610AHD-X.XX
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - "[PWRON]"
    - "[PWROFF]"
  description: Device returns "[PWRON]" when queried for power status

- id: input_state
  type: enum
  values:
    - "[TN1]"
    - "[AV]"
    - "[N/A]"
    - "[HDBaseT]"
    - "[USB]"
    - "[Component 1]"
    - "[Component2]"
    - "[VGA]"
    - "[HDMI1]"
    - "[HDMI2]"
  description: Execution acknowledgement returned after input select command

- id: firmware_version
  type: string
  description: Free-form string returned after firmware version query

- id: model_class_id
  type: enum
  values:
    - "[B3220AHD-X.XX]"
    - "[B4610AHD-X.XX]"
  description: Model class identifier
```

## Variables
```yaml
# No independent settable parameters documented; all control is action-based.
```

## Events
```yaml
# No unsolicited event notifications documented.
```

## Macros
```yaml
# No multi-step macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Input 7 (VGA) and Input 8 (HDMI1) are documented as out of letter sequence to maintain legacy SunBrite RS-232 compatibility.

Input 2 is marked "[N/A]" in the response column — likely a placeholder for an unpopulated input.

Numeric key commands (0-9, minus, channel return) return no response (marked "na").
<!-- UNRESOLVED: Input 2 function not specified (marked N/A in source). -->
<!-- UNRESOLVED: Input 7 (VGA) and Input 8 (HDMI1) letter sequence swap reason not explained beyond legacy compat. -->

## Provenance

```yaml
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T15:18:20.447Z
last_checked_at: 2026-05-14T18:17:21.049Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.049Z
matched_actions: 49
action_count: 49
confidence: high
summary: "All 50 spec actions matched literally against source hex codes and transport parameters verified; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
