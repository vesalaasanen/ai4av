---
spec_id: admin/sunbrite-sbv475-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sunbrite SBV475 Series Control Spec"
manufacturer: Sunbrite
model_family: "SBV475 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sunbrite
  models:
    - "SBV475 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T18:05:01.545Z
last_checked_at: 2026-05-31T22:42:31.566Z
generated_at: 2026-05-31T22:42:31.566Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:42:31.566Z
  matched_actions: 50
  action_count: 50
  confidence: high
  summary: "All 50 spec actions matched verbatim to source command table; serial transport parameters verified against source; one-to-one coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sunbrite SBV475 Series Control Spec

## Summary
Outdoor-rated LCD TV for residential and commercial use. Control via RS-232 (9600 8N1) and TCP/IP. Source documents RS-232 command set with ASCII and HEX representations.

<!-- UNRESOLVED: TCP/IP port not stated in source; IP control protocol details not documented in this doc -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
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
# inferred from command set:
# - powerable: power on/off/toggle commands present
# - routable: input selection commands present
# - levelable: volume up/down present
# - queryable: power status query present
traits:
  - powerable
  - routable
  - levelable
  - queryable
```

## Actions
```yaml
# Each row in the source command table = one action
# Number keys 0-9, arrow keys, picture modes as separate entries per source rows

- id: model_class_id_query
  label: Model Class ID Query
  kind: query
  params: []

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  params: []

- id: power_status_query
  label: Power Status Query
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
# Responses documented in source table:
- id: power_on_response
  type: string
  values: ["[PWRON]"]

- id: power_off_response
  type: string
  values: ["[PWROFF]"]

- id: power_response
  type: string
  values: ["[PWR]"]

- id: tuner_response
  type: string
  values: ["[TN1]"]

- id: av_response
  type: string
  values: ["[AV]"]

- id: hdmi1_response
  type: string
  values: ["[HDMI1]"]

- id: hdmi2_response
  type: string
  values: ["[HDMI2]"]

- id: hdbaset_response
  type: string
  values: ["[HDBaseT]"]

- id: usb_response
  type: string
  values: ["[USB]"]

- id: component1_response
  type: string
  values: ["[Component 1]"]

- id: component2_response
  type: string
  values: ["[Component2]"]

- id: vga_response
  type: string
  values: ["[VGA]"]

- id: mute_response
  type: string
  values: ["[MUTE]"]

- id: vol_up_response
  type: string
  values: ["[VOL+]"]

- id: vol_down_response
  type: string
  values: ["[VOL-]"]

- id: channel_up_response
  type: string
  values: ["[CH+]"]

- id: channel_down_response
  type: string
  values: ["[CH-]"]

- id: model_id_response
  type: string
  values: ["[B3220AHD-X.XX]", "[B4610AHD-X.XX]"]

- id: firmware_response
  type: string
  values: ["main board followed by version XXXXX-X.XX"]
```

## Variables
```yaml
# No standalone settable parameters separate from discrete actions in source
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
Input 7 (VGA) and Input 8 (HDMI1) are out of letter sequence to maintain compatibility with legacy SunBrite RS-232 commands. Source documents RS-232 as primary control; TCP/IP details (port, protocol) not specified in available documentation.
<!-- UNRESOLVED: TCP/IP control protocol details, port number, and IP-level behavior not stated in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: error handling and fault behavior not documented in source -->

## Provenance

```yaml
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T18:05:01.545Z
last_checked_at: 2026-05-31T22:42:31.566Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:42:31.566Z
matched_actions: 50
action_count: 50
confidence: high
summary: "All 50 spec actions matched verbatim to source command table; serial transport parameters verified against source; one-to-one coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
