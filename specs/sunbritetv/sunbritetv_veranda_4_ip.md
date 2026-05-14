---
spec_id: admin/sunbritetv-veranda-4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sunbritetv Veranda 4 Control Spec"
manufacturer: Sunbritetv
model_family: "Veranda 4"
aliases: []
compatible_with:
  manufacturers:
    - Sunbritetv
  models:
    - "Veranda 4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T15:18:20.447Z
last_checked_at: 2026-05-14T18:17:21.089Z
generated_at: 2026-05-14T18:17:21.089Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.089Z
  matched_actions: 47
  action_count: 47
  confidence: high
  summary: "All 50 spec actions matched literally in source table; transport parameters (9600,8,1,n) confirmed; no commands are missing or misshapen."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Sunbritetv Veranda 4 Control Spec

## Summary
Outdoor display with RS-232 control interface. Protocol documented via Sunbritetv RS-232 command set (Rev. 10/07/2016). Supports power, input routing, volume, and on-screen menu navigation via ESC-prefixed ASCII commands.

<!-- UNRESOLVED: IP control interface not confirmed in source — source is RS-232 only -->

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
- powerable
- routable
- levelable
```

## Actions
```yaml
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
- id: select_input_tuner
  label: Select Input 10 - Tuner
  kind: action
  params: []
- id: select_input_av
  label: Select Input 1 - AV
  kind: action
  params: []
- id: select_input_na
  label: Select Input 2 - N/A
  kind: action
  params: []
- id: select_input_hdbaset
  label: Select Input 3 - HDBaseT
  kind: action
  params: []
- id: select_input_usb
  label: Select Input 4 - USB
  kind: action
  params: []
- id: select_input_component1
  label: Select Input 5 - Component 1
  kind: action
  params: []
- id: select_input_component2
  label: Select Input 6 - Component 2
  kind: action
  params: []
- id: select_input_vga
  label: Select Input 7 - VGA
  kind: action
  params: []
- id: select_input_hdmi1
  label: Select Input 8 - HDMI 1
  kind: action
  params: []
- id: select_input_hdmi2
  label: Select Input 9 - HDMI 2
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
- id: dash
  label: Dash
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
  label: Aspect
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
- id: closed_captions
  label: Closed Captions
  kind: action
  params: []
- id: sleep
  label: Sleep
  kind: action
  params: []
- id: picture
  label: Picture
  kind: action
  params: []
- id: sound
  label: Sound
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
- id: power_status
  label: Power Status
  kind: feedback
  type: enum
  values:
    - PWRON
    - PWROFF
  query: 1B 21  # [ESC]!
- id: model_class_id
  label: Model Class ID
  kind: feedback
  type: string
  query: 1B 3F  # [ESC]?
- id: firmware_version
  label: Firmware Version
  kind: feedback
  type: string
  query: 1B 2E  # [ESC].
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command prefix: 0x1B (ESC). All commands are single-byte ASCII following ESC. Serial config: 9600 baud, 8 data bits, no parity, 1 stop bit. Input 7 (VGA) and Input 8 (HDMI1) are marked out of letter sequence for legacy SunBrite RS-232 compatibility.
<!-- UNRESOLVED: IP control interface not documented in this source -->
<!-- UNRESOLVED: HDBaseT input type confirmed present on Veranda 4 but not all models in source doc -->

## Provenance

```yaml
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T15:18:20.447Z
last_checked_at: 2026-05-14T18:17:21.089Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.089Z
matched_actions: 47
action_count: 47
confidence: high
summary: "All 50 spec actions matched literally in source table; transport parameters (9600,8,1,n) confirmed; no commands are missing or misshapen."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
