---
spec_id: admin/sunbritetv-sb-v3-55-4khdr-bl
schema_version: ai4av-public-spec-v1
revision: 1
title: "SunBriteTV SB-V3-55-4KHDR-BL Control Spec"
manufacturer: SunBrite
model_family: SB-V3-55-4KHDR-BL
aliases: []
compatible_with:
  manufacturers:
    - SunBrite
    - SunBriteTV
  models:
    - SB-V3-55-4KHDR-BL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
  - docs.control4.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
  - "https://docs.control4.com/help/sun/displays/veranda3api/Content/IP%20Control.htm"
retrieved_at: 2026-05-26T20:43:47.096Z
last_checked_at: 2026-05-31T22:43:11.007Z
generated_at: 2026-05-31T22:43:11.007Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Power Status"
  - "TCP/IP control not confirmed in source; source is RS-232 only"
  - "flow control not stated in source"
  - "port number not stated in source"
  - "no explicit response strings documented except power acknowledgement"
  - "no settable parameters documented as separate variables"
  - "no unsolicited notification events documented"
  - "no multi-step macro sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "TCP/IP control capability not confirmed; source document covers RS-232 only"
verification:
  verdict: verified
  checked_at: 2026-05-31T22:43:11.007Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions matched verbatim against source table; transport parameters confirmed; one additional Power Status query in source does not exceed the 5-entry threshold for short. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# SunBriteTV SB-V3-55-4KHDR-BL Control Spec

## Summary
Outdoor TV with RS-232 control interface. Rev. 10/07/2016. Supports power, input routing, volume, channel, picture mode, and menu navigation commands via ESC-prefixed ASCII protocol.

<!-- UNRESOLVED: TCP/IP control not confirmed in source; source is RS-232 only -->

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
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: POWER ON/OFF commands present
- routable   # inferred: input selection commands present
- levelable  # inferred: volume up/down present
```

## Actions
```yaml
- id: model_class_id_query
  label: Model Class ID Query
  kind: query
  params: []

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  params: []

- id: power_on
  label: Power ON
  kind: action
  params: []

- id: power_off
  label: Power OFF
  kind: action
  params: []

- id: input_10_tuner
  label: Input 10 - Tuner
  kind: action
  params: []

- id: input_1_av
  label: Input 1 - AV
  kind: action
  params: []

- id: input_2_na
  label: Input 2 - NA
  kind: action
  params: []

- id: input_3_hdbaset
  label: Input 3 - HDBaseT
  kind: action
  params: []

- id: input_4_usb
  label: Input 4 - USB
  kind: action
  params: []

- id: input_5_component1
  label: Input 5 - Component1
  kind: action
  params: []

- id: input_6_component2
  label: Input 6 - Component2
  kind: action
  params: []

- id: input_7_vga
  label: Input 7 - VGA
  kind: action
  params: []

- id: input_8_hdmi1
  label: Input 8 - HDMI1
  kind: action
  params: []

- id: input_9_hdmi2
  label: Input 9 - HDMI2
  kind: action
  params: []

- id: mute
  label: Mute
  kind: action
  params: []

- id: vol_up
  label: Volume Up
  kind: action
  params: []

- id: vol_down
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

- id: num_1
  label: "1"
  kind: action
  params: []

- id: num_2
  label: "2"
  kind: action
  params: []

- id: num_3
  label: "3"
  kind: action
  params: []

- id: num_4
  label: "4"
  kind: action
  params: []

- id: num_5
  label: "5"
  kind: action
  params: []

- id: num_6
  label: "6"
  kind: action
  params: []

- id: num_7
  label: "7"
  kind: action
  params: []

- id: num_8
  label: "8"
  kind: action
  params: []

- id: num_9
  label: "9"
  kind: action
  params: []

- id: num_0
  label: "0"
  kind: action
  params: []

- id: num_dash
  label: "-"
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

- id: cc
  label: Closed Caption
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

- id: up_arrow
  label: Up Arrow
  kind: action
  params: []

- id: down_arrow
  label: Down Arrow
  kind: action
  params: []

- id: left_arrow
  label: Left Arrow
  kind: action
  params: []

- id: right_arrow
  label: Right Arrow
  kind: action
  params: []

- id: picture_mode_1_personal
  label: Picture Mode 1 - Personal
  kind: action
  params: []

- id: picture_mode_2_standard
  label: Picture Mode 2 - Standard
  kind: action
  params: []

- id: picture_mode_3_sunbrite_day
  label: Picture Mode 3 - SunBrite Day
  kind: action
  params: []

- id: picture_mode_4_sunbrite_night
  label: Picture Mode 4 - Sunbrite Night
  kind: action
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no explicit response strings documented except power acknowledgement
# Responses noted: [PWRON], [PWROFF], [PWR], [TN1], [AV], [N/A], [HDBaseT], [USB],
# [Component 1], [Component2], [VGA], [HDMI1], [HDMI2], [MUTE], [VOL+], [VOL-],
# [CH+], [CH-]
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented as separate variables
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Input 7 (VGA) and Input 8 (HDMI1) are out of letter sequence to remain compatible with legacy SunBrite RS-232 commands. Commands prefixed with ESC (0x1B). Serial config: 9600,8,1,n.
<!-- UNRESOLVED: TCP/IP control capability not confirmed; source document covers RS-232 only -->

## Provenance

```yaml
source_domains:
  - sunbritetv.com
  - docs.control4.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
  - "https://docs.control4.com/help/sun/displays/veranda3api/Content/IP%20Control.htm"
retrieved_at: 2026-05-26T20:43:47.096Z
last_checked_at: 2026-05-31T22:43:11.007Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:43:11.007Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions matched verbatim against source table; transport parameters confirmed; one additional Power Status query in source does not exceed the 5-entry threshold for short. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Power Status"
- "TCP/IP control not confirmed in source; source is RS-232 only"
- "flow control not stated in source"
- "port number not stated in source"
- "no explicit response strings documented except power acknowledgement"
- "no settable parameters documented as separate variables"
- "no unsolicited notification events documented"
- "no multi-step macro sequences documented"
- "no safety warnings or interlock procedures in source"
- "TCP/IP control capability not confirmed; source document covers RS-232 only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
