---
spec_id: admin/sunbrite-sbv465-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sunbrite SBV465 Series Control Spec"
manufacturer: Sunbrite
model_family: "SBV465 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sunbrite
  models:
    - "SBV465 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T18:05:01.545Z
last_checked_at: 2026-05-31T22:42:30.855Z
generated_at: 2026-05-31T22:42:30.855Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:42:30.855Z
  matched_actions: 50
  action_count: 50
  confidence: high
  summary: "All 50 spec actions matched verbatim with source hex codes and ASCII equivalents; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sunbrite SBV465 Series Control Spec

## Summary
Outdoor TV with RS-232 serial control interface. 9600 baud 8N1. Commands use ESC-prefix ASCII format with HEX equivalents. Controls: power, input selection, volume, channel, navigation, picture modes.

<!-- UNRESOLVED: TCP/IP control — source document covers only RS-232. Port number for IP control not stated in source. -->

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
addressing:
  port: null  # UNRESOLVED: serial port identifier not stated in source
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
- id: model_class_id_query
  label: Model Class ID Query
  kind: query
  params: []
  hex: 1B 3F
  ascii: "[ESC]?"
  response: "[B3220AHD-X.XX] or [B4610AHD-X.XX]"

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  params: []
  hex: 1B 2E
  ascii: "[ESC]."
  response: "main board followed by version"

- id: power_status_query
  label: Power Status Query
  kind: query
  params: []
  hex: 1B 21
  ascii: "[ESC]!"
  response: "[PWRON]"

- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
  hex: 1B 24
  ascii: "[ESC]$"
  response: "[PWR]"

- id: power_on
  label: Power ON
  kind: action
  params: []
  hex: 1B 41
  ascii: "[ESC]A"
  response: "[PWRON]"

- id: power_off
  label: Power OFF
  kind: action
  params: []
  hex: 1B 42
  ascii: "[ESC]B"
  response: "[PWROFF]"

- id: input_10_tuner
  label: Input 10 - Tuner
  kind: action
  params: []
  hex: 1B 43
  ascii: "[ESC]C"
  response: "[TN1]"

- id: input_1_av
  label: Input 1 - AV
  kind: action
  params: []
  hex: 1B 44
  ascii: "[ESC]D"
  response: "[AV]"

- id: input_2_na
  label: Input 2 - NA
  kind: action
  params: []
  hex: 1B 45
  ascii: "[ESC]E"
  response: "[N/A]"

- id: input_3_hdbaset
  label: Input 3 - HDBaseT
  kind: action
  params: []
  hex: 1B 46
  ascii: "[ESC]F"
  response: "[HDBaseT]"

- id: input_4_usb
  label: Input 4 - USB
  kind: action
  params: []
  hex: 1B 47
  ascii: "[ESC]G"
  response: "[USB]"

- id: input_5_component1
  label: Input 5 - Component1
  kind: action
  params: []
  hex: 1B 48
  ascii: "[ESC]H"
  response: "[Component 1]"

- id: input_6_component2
  label: Input 6 - Component2
  kind: action
  params: []
  hex: 1B 49
  ascii: "[ESC]I"
  response: "[Component2]"

- id: input_7_vga
  label: Input 7 - VGA
  kind: action
  params: []
  hex: 1B 4B
  ascii: "[ESC]K"
  response: "[VGA]"

- id: input_8_hdmi1
  label: Input 8 - HDMI1
  kind: action
  params: []
  hex: 1B 4A
  ascii: "[ESC]J"
  response: "[HDMI1]"

- id: input_9_hdmi2
  label: Input 9 - HDMI2
  kind: action
  params: []
  hex: 1B 4C
  ascii: "[ESC]L"
  response: "[HDMI2]"

- id: mute
  label: Mute
  kind: action
  params: []
  hex: 1B 58
  ascii: "[ESC]X"
  response: "[MUTE]"

- id: vol_up
  label: Vol Up
  kind: action
  params: []
  hex: 1B 59
  ascii: "[ESC]Y"
  response: "[VOL+]"

- id: vol_down
  label: Vol Down
  kind: action
  params: []
  hex: 1B 5A
  ascii: "[ESC]Z"
  response: "[VOL-]"

- id: channel_up
  label: Channel Up
  kind: action
  params: []
  hex: 1B 56
  ascii: "[ESC]V"
  response: "[CH+]"

- id: channel_down
  label: Channel Down
  kind: action
  params: []
  hex: 1B 57
  ascii: "[ESC]W"
  response: "[CH-]"

- id: key_1
  label: Key 1
  kind: action
  params: []
  hex: 1B 31
  ascii: "[ESC]1"

- id: key_2
  label: Key 2
  kind: action
  params: []
  hex: 1B 32
  ascii: "[ESC]2"

- id: key_3
  label: Key 3
  kind: action
  params: []
  hex: 1B 33
  ascii: "[ESC]3"

- id: key_4
  label: Key 4
  kind: action
  params: []
  hex: 1B 34
  ascii: "[ESC]4"

- id: key_5
  label: Key 5
  kind: action
  params: []
  hex: 1B 35
  ascii: "[ESC]5"

- id: key_6
  label: Key 6
  kind: action
  params: []
  hex: 1B 36
  ascii: "[ESC]6"

- id: key_7
  label: Key 7
  kind: action
  params: []
  hex: 1B 37
  ascii: "[ESC]7"

- id: key_8
  label: Key 8
  kind: action
  params: []
  hex: 1B 38
  ascii: "[ESC]8"

- id: key_9
  label: Key 9
  kind: action
  params: []
  hex: 1B 39
  ascii: "[ESC]9"

- id: key_0
  label: Key 0
  kind: action
  params: []
  hex: 1B 30
  ascii: "[ESC]0"

- id: key_dash
  label: Key Dash
  kind: action
  params: []
  hex: 1B 2D
  ascii: "[ESC]-"

- id: channel_return
  label: Channel Return (Previous Channel)
  kind: action
  params: []
  hex: 1B 72
  ascii: "[ESC]r"

- id: source_toggle
  label: Source Toggle
  kind: action
  params: []
  hex: 1B 62
  ascii: "[ESC]b"

- id: aspect
  label: Aspect
  kind: action
  params: []
  hex: 1B 61
  ascii: "[ESC]a"

- id: enter
  label: Enter
  kind: action
  params: []
  hex: 1B 65
  ascii: "[ESC]e"

- id: info
  label: Info
  kind: action
  params: []
  hex: 1B 69
  ascii: "[ESC]i"

- id: cc
  label: CC (Closed Captions)
  kind: action
  params: []
  hex: 1B 63
  ascii: "[ESC]c"

- id: sleep
  label: Sleep
  kind: action
  params: []
  hex: 1B 7A
  ascii: "[ESC]z"

- id: picture
  label: Picture
  kind: action
  params: []
  hex: 1B 70
  ascii: "[ESC]p"

- id: sound
  label: Sound
  kind: action
  params: []
  hex: 1B 73
  ascii: "[ESC]s"

- id: menu
  label: Menu
  kind: action
  params: []
  hex: 1B 6D
  ascii: "[ESC]m"

- id: up_arrow
  label: Up Arrow
  kind: action
  params: []
  hex: 1B 5E
  ascii: "[ESC]^"

- id: down_arrow
  label: Down Arrow
  kind: action
  params: []
  hex: 1B 76
  ascii: "[ESC]v"

- id: left_arrow
  label: Left Arrow
  kind: action
  params: []
  hex: 1B 3E
  ascii: "[ESC]>"

- id: right_arrow
  label: Right Arrow
  kind: action
  params: []
  hex: 1B 3C
  ascii: "[ESC]<"

- id: picture_mode_1_personal
  label: Picture Mode 1 - Personal
  kind: action
  params: []
  hex: 1B 50
  ascii: "[ESC]P"

- id: picture_mode_2_standard
  label: Picture Mode 2 - Standard
  kind: action
  params: []
  hex: 1B 51
  ascii: "[ESC]Q"

- id: picture_mode_3_sunbrite_day
  label: Picture Mode 3 - SunBrite Day
  kind: action
  params: []
  hex: 1B 52
  ascii: "[ESC]R"

- id: picture_mode_4_sunbrite_night
  label: Picture Mode 4 - Sunbrite Night
  kind: action
  params: []
  hex: 1B 53
  ascii: "[ESC]S"
```

## Feedbacks
```yaml
# UNRESOLVED: response payload structures not fully specified in source.
# Source provides command acknowledgment strings (e.g. [PWRON], [HDMI1])
# but does not document response format details (e.g. terminator, delimiter).
```

## Variables
```yaml
# UNRESOLVED: no persistent parameter storage commands identified in source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
```

## Notes
Input 7 (VGA) and Input 8 (HDMI1) are out of letter sequence to remain compatible with legacy SunBrite RS-232 commands. Left arrow ASCII `[ESC]>` and right arrow ASCII `[ESC]<` appear reversed relative to their symbols in source documentation — recorded as stated in source.
<!-- UNRESOLVED: TCP/IP control port and protocol details not stated in source. Firmware version compatibility range not stated. Response terminator format not documented. -->

## Provenance

```yaml
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T18:05:01.545Z
last_checked_at: 2026-05-31T22:42:30.855Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:42:30.855Z
matched_actions: 50
action_count: 50
confidence: high
summary: "All 50 spec actions matched verbatim with source hex codes and ASCII equivalents; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
