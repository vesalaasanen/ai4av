---
spec_id: admin/sunbrite-sbv455-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sunbrite SBV455 Series Control Spec"
manufacturer: Sunbrite
model_family: "SBV455 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sunbrite
  models:
    - "SBV455 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
  - help.snapone.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/IP%20Control%20Guide.htm"
retrieved_at: 2026-05-26T16:32:54.221Z
last_checked_at: 2026-05-31T22:42:30.126Z
generated_at: 2026-05-31T22:42:30.126Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control not documented in source — only RS-232 commands present"
  - "flow control not stated in source"
  - "COM port not stated in source"
  - "no standalone settable parameters documented - all commands are discrete actions"
  - "no unsolicited event notifications documented in source"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "TCP/IP control path not documented in source — spec derived from RS-232 command table only"
verification:
  verdict: verified
  checked_at: 2026-05-31T22:42:30.126Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions matched verbatim in source command table; transport parameters verified; complete coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sunbrite SBV455 Series Control Spec

## Summary
Outdoor TV with RS-232 control interface. Supports power control, input routing, volume/mute, channel navigation, numeric keypad, and on-screen menu navigation. Serial communication at 9600 baud, 8N1. No authentication required.

<!-- UNRESOLVED: TCP/IP control not documented in source — only RS-232 commands present -->

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
addressing:
  port: null  # UNRESOLVED: COM port not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # Power ON/OFF/TOGGLE commands present
- routable   # Input selection commands present (Tuner, AV, HDBaseT, USB, Component1/2, VGA, HDMI1/2)
- levelable  # Volume Up/Down, Mute commands present
```

## Actions
```yaml
- id: model_class_id_query
  label: Model Class ID Query
  kind: query
  params: []
  description: Returns model class ID (B3220AHD-X.XX or B4610AHD-X.XX)

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  params: []
  description: Returns main board firmware version

- id: power_status_query
  label: Power Status Query
  kind: query
  params: []
  description: Returns current power state (PWRON or PWROFF)

- id: power_toggle
  label: Power Toggle
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_tuner
  label: Select Input 10 - Tuner
  kind: action
  params: []

- id: input_av
  label: Select Input 1 - AV
  kind: action
  params: []

- id: input_na
  label: Select Input 2 - NA
  kind: action
  params: []

- id: input_hdbaset
  label: Select Input 3 - HDBaseT
  kind: action
  params: []

- id: input_usb
  label: Select Input 4 - USB
  kind: action
  params: []

- id: input_component1
  label: Select Input 5 - Component1
  kind: action
  params: []

- id: input_component2
  label: Select Input 6 - Component2
  kind: action
  params: []

- id: input_vga
  label: Select Input 7 - VGA
  kind: action
  params: []

- id: input_hdmi1
  label: Select Input 8 - HDMI1
  kind: action
  params: []

- id: input_hdmi2
  label: Select Input 9 - HDMI2
  kind: action
  params: []

- id: mute
  label: Mute
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

- id: channel_up
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  params: []

- id: digit_1
  label: Digit 1
  kind: action
  params: []

- id: digit_2
  label: Digit 2
  kind: action
  params: []

- id: digit_3
  label: Digit 3
  kind: action
  params: []

- id: digit_4
  label: Digit 4
  kind: action
  params: []

- id: digit_5
  label: Digit 5
  kind: action
  params: []

- id: digit_6
  label: Digit 6
  kind: action
  params: []

- id: digit_7
  label: Digit 7
  kind: action
  params: []

- id: digit_8
  label: Digit 8
  kind: action
  params: []

- id: digit_9
  label: Digit 9
  kind: action
  params: []

- id: digit_0
  label: Digit 0
  kind: action
  params: []

- id: digit_dash
  label: Digit Dash
  kind: action
  params: []

- id: channel_return
  label: Channel Return (Previous Channel)
  kind: action
  params: []

- id: source_toggle
  label: Source Toggle
  kind: action
  params: []

- id: aspect
  label: Aspect Ratio
  kind: action
  params: []

- id: enter
  label: Enter
  kind: action
  params: []

- id: info
  label: Info
  kind: action
  params: []

- id: closed_caption
  label: Closed Caption
  kind: action
  params: []

- id: sleep
  label: Sleep Timer
  kind: action
  params: []

- id: picture
  label: Picture Settings
  kind: action
  params: []

- id: sound
  label: Sound Settings
  kind: action
  params: []

- id: menu
  label: Menu
  kind: action
  params: []

- id: arrow_up
  label: Up Arrow
  kind: action
  params: []

- id: arrow_down
  label: Down Arrow
  kind: action
  params: []

- id: arrow_left
  label: Left Arrow
  kind: action
  params: []

- id: arrow_right
  label: Right Arrow
  kind: action
  params: []

- id: picture_mode_personal
  label: Picture Mode 1 - Personal
  kind: action
  params: []

- id: picture_mode_standard
  label: Picture Mode 2 - Standard
  kind: action
  params: []

- id: picture_mode_sunbrite_day
  label: Picture Mode 3 - SunBrite Day
  kind: action
  params: []

- id: picture_mode_sunbrite_night
  label: Picture Mode 4 - Sunbrite Night
  kind: action
  params: []
```

## Feedbacks
```yaml
# Command responses returned from TV to control system:
- id: power_state
  label: Power State
  type: enum
  values:
    - PWRON
    - PWROFF
  description: Response to power commands and queries

- id: input_confirmation
  label: Input Selection Confirmation
  type: enum
  values:
    - AV
    - N/A
    - HDBaseT
    - USB
    - Component 1
    - Component2
    - VGA
    - HDMI1
    - HDMI2
    - TN1

- id: volume_state
  label: Volume State
  type: enum
  values:
    - VOL+
    - VOL-
    - MUTE

- id: channel_state
  label: Channel State
  type: enum
  values:
    - CH+
    - CH-

- id: model_id_response
  label: Model ID Response
  type: string
  description: Model class ID response (B3220AHD-X.XX or B4610AHD-X.XX)

- id: firmware_version_response
  label: Firmware Version Response
  type: string
  description: Main board firmware version string
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters documented - all commands are discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Input 7 (VGA) and Input 8 (HDMI1) are documented as out of letter sequence to remain compatible with legacy SunBrite RS-232 command sets. Input 2 is marked NA (not available). Input 10 is Tuner.
<!-- UNRESOLVED: TCP/IP control path not documented in source — spec derived from RS-232 command table only -->

## Provenance

```yaml
source_domains:
  - sunbritetv.com
  - help.snapone.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/IP%20Control%20Guide.htm"
retrieved_at: 2026-05-26T16:32:54.221Z
last_checked_at: 2026-05-31T22:42:30.126Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:42:30.126Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions matched verbatim in source command table; transport parameters verified; complete coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control not documented in source — only RS-232 commands present"
- "flow control not stated in source"
- "COM port not stated in source"
- "no standalone settable parameters documented - all commands are discrete actions"
- "no unsolicited event notifications documented in source"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "TCP/IP control path not documented in source — spec derived from RS-232 command table only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
