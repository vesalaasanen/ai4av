---
spec_id: admin/sunbrite-sunbrite-unknown
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sunbrite Sunbrite Unknown Control Spec"
manufacturer: Sunbrite
model_family: "Sunbrite Unknown"
aliases: []
compatible_with:
  manufacturers:
    - Sunbrite
  models:
    - "Sunbrite Unknown"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
  - snapav.com
  - manualslib.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/SunBrite/ManualsAndGuides/SunBriteTV_Codes_RS232.pdf
  - https://www.manualslib.com/manual/734396/Sunbritetv-3220hd.html
retrieved_at: 2026-04-29T19:17:26.248Z
last_checked_at: 2026-05-14T18:17:21.023Z
generated_at: 2026-05-14T18:17:21.023Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Input 2 - NA"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.023Z
  matched_actions: 49
  action_count: 49
  confidence: high
  summary: "All 50 spec actions matched source with correct transport parameters; only 1 unused source input (Input 2 - NA) excluded."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Sunbrite Sunbrite Unknown Control Spec

## Summary
Outdoor display with RS-232 control interface. Protocol: 9600/8/1/N. Commands sent as ASCII escape sequences; TV responds with acknowledgement codes.

<!-- UNRESOLVED: no TCP/IP or HTTP support documented -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input selection commands present
- levelable       # volume and channel up/down present
- queryable       # power status query present
```

## Actions
```yaml
- id: model_class_id
  label: Model Class ID
  kind: action
  params: []

- id: firmware_version
  label: Firmware Version
  kind: action
  params: []

- id: power_status
  label: Power Status
  kind: action
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

- id: input_tuner
  label: Input 10 - Tuner
  kind: action
  params: []

- id: input_av
  label: Input 1 - AV
  kind: action
  params: []

- id: input_hdbaset
  label: Input 3 - HDBaseT
  kind: action
  params: []

- id: input_usb
  label: Input 4 - USB
  kind: action
  params: []

- id: input_component1
  label: Input 5 - Component1
  kind: action
  params: []

- id: input_component2
  label: Input 6 - Component2
  kind: action
  params: []

- id: input_vga
  label: Input 7 - VGA
  kind: action
  params: []

- id: input_hdmi1
  label: Input 8 - HDMI1
  kind: action
  params: []

- id: input_hdmi2
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

- id: channel_return
  label: Channel Return
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

- id: picture_mode_day
  label: Picture Mode 3 - SunBrite Day
  kind: action
  params: []

- id: picture_mode_night
  label: Picture Mode 4 - Sunbrite Night
  kind: action
  params: []
- id: dash
  label: "-"
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - PWRON
    - PWROFF

- id: input_state
  label: Input Selection Response
  type: enum
  values:
    - TN1
    - AV
    - HDBaseT
    - USB
    - Component 1
    - Component2
    - VGA
    - HDMI1
    - HDMI2

- id: mute_state
  label: Mute State
  type: enum
  values:
    - MUTE

- id: volume_state
  label: Volume State
  type: enum
  values:
    - VOL+
    - VOL-

- id: channel_state
  label: Channel State
  type: enum
  values:
    - CH+
    - CH-
```

## Variables
```yaml
# UNRESOLVED: no continuous variables documented - discrete command/response pairs only
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Input 7 (VGA) and Input 8 (HDMI1) are intentionally out of letter sequence to maintain compatibility with legacy Sunbrite RS-232 command set.

Command format: ESC + ASCII character. Example: ESC A = Power ON (hex 1B 41).

TV responds with confirmation code after command execution (e.g., [PWRON] after power on).

<!-- UNRESOLVED: flow control configuration not stated in source -->
<!-- UNRESOLVED: full variable state readback not documented — only discrete command acknowledgements -->

## Provenance

```yaml
source_domains:
  - sunbritetv.com
  - snapav.com
  - manualslib.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/SunBrite/ManualsAndGuides/SunBriteTV_Codes_RS232.pdf
  - https://www.manualslib.com/manual/734396/Sunbritetv-3220hd.html
retrieved_at: 2026-04-29T19:17:26.248Z
last_checked_at: 2026-05-14T18:17:21.023Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.023Z
matched_actions: 49
action_count: 49
confidence: high
summary: "All 50 spec actions matched source with correct transport parameters; only 1 unused source input (Input 2 - NA) excluded."
```

## Known Gaps

```yaml
- "Input 2 - NA"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
