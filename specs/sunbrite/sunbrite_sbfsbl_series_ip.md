---
spec_id: admin/sunbrite-sbfsbl-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sunbrite SBFSBL Series Control Spec"
manufacturer: Sunbrite
model_family: "SB-FSBL Series"
aliases: []
compatible_with:
  manufacturers:
    - Sunbrite
  models:
    - "SB-FSBL Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
  - help.snapone.com
  - snapav.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/Front%20Cover.htm"
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/SunBrite/ManualsAndGuides/SunBriteTV_Codes_RS232.pdf
retrieved_at: 2026-06-09T03:20:39.337Z
last_checked_at: 2026-06-09T07:24:27.770Z
generated_at: 2026-06-09T07:24:27.770Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input/transport notes"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "TCP/IP control path not documented in this RS-232 reference; known protocol hint (TCP/IP) in input has no source backing and is not emitted."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:24:27.770Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec hex commands match source table entries verbatim; transport 9600,8,1,n confirmed; 1:1 coverage. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sunbrite SBFSBL Series Control Spec

## Summary
RS-232 control codes for SunbriteTV SB-FSBL series outdoor televisions. The source document is an ASCII/Hex command table (Rev. 10/07/2016) covering power, input selection, volume, channel, and on-screen-keypad commands using a single `[ESC]` (0x1B) prefix byte.

<!-- UNRESOLVED: input/transport notes -->

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
- powerable   # inferred from power command examples
- routable    # inferred from input-select command examples
- levelable   # inferred from volume up/down command examples
```

## Actions
```yaml
- id: model_class_id_query
  label: Model Class ID Query
  kind: query
  command: "1B 3F"
  params: []
- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  command: "1B 2E"
  params: []
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "1B 21"
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "1B 24"
  params: []
- id: power_on
  label: Power ON
  kind: action
  command: "1B 41"
  params: []
- id: power_off
  label: Power OFF
  kind: action
  command: "1B 42"
  params: []
- id: input_tuner
  label: Input 10 - Tuner
  kind: action
  command: "1B 43"
  params: []
- id: input_av
  label: Input 1 - AV
  kind: action
  command: "1B 44"
  params: []
- id: input_2_na
  label: Input 2 - NA
  kind: action
  command: "1B 45"
  params: []
- id: input_hdbaset
  label: Input 3 - HDBaseT
  kind: action
  command: "1B 46"
  params: []
- id: input_usb
  label: Input 4 - USB
  kind: action
  command: "1B 47"
  params: []
- id: input_component1
  label: Input 5 - Component1
  kind: action
  command: "1B 48"
  params: []
- id: input_component2
  label: Input 6 - Component2
  kind: action
  command: "1B 49"
  params: []
- id: input_vga
  label: Input 7 - VGA
  kind: action
  command: "1B 4B"
  params: []
- id: input_hdmi1
  label: Input 8 - HDMI1
  kind: action
  command: "1B 4A"
  params: []
- id: input_hdmi2
  label: Input 9 - HDMI2
  kind: action
  command: "1B 4C"
  params: []
- id: mute
  label: Mute
  kind: action
  command: "1B 58"
  params: []
- id: vol_up
  label: Vol Up
  kind: action
  command: "1B 59"
  params: []
- id: vol_down
  label: Vol Down
  kind: action
  command: "1B 5A"
  params: []
- id: channel_up
  label: Channel Up
  kind: action
  command: "1B 56"
  params: []
- id: channel_down
  label: Channel Down
  kind: action
  command: "1B 57"
  params: []
- id: digit_1
  label: Digit 1
  kind: action
  command: "1B 31"
  params: []
- id: digit_2
  label: Digit 2
  kind: action
  command: "1B 32"
  params: []
- id: digit_3
  label: Digit 3
  kind: action
  command: "1B 33"
  params: []
- id: digit_4
  label: Digit 4
  kind: action
  command: "1B 34"
  params: []
- id: digit_5
  label: Digit 5
  kind: action
  command: "1B 35"
  params: []
- id: digit_6
  label: Digit 6
  kind: action
  command: "1B 36"
  params: []
- id: digit_7
  label: Digit 7
  kind: action
  command: "1B 37"
  params: []
- id: digit_8
  label: Digit 8
  kind: action
  command: "1B 38"
  params: []
- id: digit_9
  label: Digit 9
  kind: action
  command: "1B 39"
  params: []
- id: digit_0
  label: Digit 0
  kind: action
  command: "1B 30"
  params: []
- id: dash
  label: Dash (-)
  kind: action
  command: "1B 2D"
  params: []
- id: channel_return
  label: Channel Return (Previous Channel)
  kind: action
  command: "1B 72"
  params: []
- id: source_toggle
  label: Source Toggle
  kind: action
  command: "1B 62"
  params: []
- id: aspect
  label: Aspect
  kind: action
  command: "1B 61"
  params: []
- id: enter
  label: Enter
  kind: action
  command: "1B 65"
  params: []
- id: info
  label: Info
  kind: action
  command: "1B 69"
  params: []
- id: cc
  label: CC
  kind: action
  command: "1B 63"
  params: []
- id: sleep
  label: Sleep
  kind: action
  command: "1B 7A"
  params: []
- id: picture
  label: Picture
  kind: action
  command: "1B 70"
  params: []
- id: sound
  label: Sound
  kind: action
  command: "1B 73"
  params: []
- id: menu
  label: Menu
  kind: action
  command: "1B 6D"
  params: []
- id: up_arrow
  label: Up Arrow
  kind: action
  command: "1B 5E"
  params: []
- id: down_arrow
  label: Down Arrow
  kind: action
  command: "1B 76"
  params: []
- id: left_arrow
  label: Left Arrow
  kind: action
  command: "1B 3E"
  params: []
- id: right_arrow
  label: Right Arrow
  kind: action
  command: "1B 3C"
  params: []
- id: picture_mode_personal
  label: Picture Mode 1 - Personal
  kind: action
  command: "1B 50"
  params: []
- id: picture_mode_standard
  label: Picture Mode 2 - Standard
  kind: action
  command: "1B 51"
  params: []
- id: picture_mode_sunbrite_day
  label: Picture Mode 3 - SunBrite Day
  kind: action
  command: "1B 52"
  params: []
- id: picture_mode_sunbrite_night
  label: Picture Mode 4 - Sunbrite Night
  kind: action
  command: "1B 53"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
- id: active_input
  type: enum
  values: [Tuner, AV, N/A, HDBaseT, USB, Component1, Component2, VGA, HDMI1, HDMI2]
- id: mute_state
  type: enum
  values: [muted, unmuted]
- id: volume_direction
  type: enum
  values: [up, down]
- id: channel_direction
  type: enum
  values: [up, down]
- id: model_class_id
  type: string
- id: firmware_version
  type: string
```

## Variables
```yaml
# No settable numeric parameters documented in source beyond discrete actions.
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
All commands are 2-byte sequences prefixed by ESC (0x1B). Document dated 10/07/2016. Inputs 7 (VGA) and 8 (HDMI1) are intentionally out of letter sequence (`[ESC]K` and `[ESC]J`) for compatibility with legacy SunBrite RS-232 commands. Power status query response indicates current state; Power Toggle returns `[PWR]` and reflects the new state in subsequent status queries.

<!-- UNRESOLVED: TCP/IP control path not documented in this RS-232 reference; known protocol hint (TCP/IP) in input has no source backing and is not emitted. -->

## Provenance

```yaml
source_domains:
  - sunbritetv.com
  - help.snapone.com
  - snapav.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
  - "https://help.snapone.com/sb-solis-ig/Content/Topics/Front%20Cover.htm"
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/SunBrite/ManualsAndGuides/SunBriteTV_Codes_RS232.pdf
retrieved_at: 2026-06-09T03:20:39.337Z
last_checked_at: 2026-06-09T07:24:27.770Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:24:27.770Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec hex commands match source table entries verbatim; transport 9600,8,1,n confirmed; 1:1 coverage. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input/transport notes"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "TCP/IP control path not documented in this RS-232 reference; known protocol hint (TCP/IP) in input has no source backing and is not emitted."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
