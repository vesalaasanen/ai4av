---
spec_id: admin/sunbritetv-solis-tv
schema_version: ai4av-public-spec-v1
revision: 1
title: "SunbriteTV Solis TV Control Spec"
manufacturer: SunBrite
model_family: "Solis TV"
aliases: []
compatible_with:
  manufacturers:
    - SunBrite
    - SunbriteTV
  models:
    - "Solis TV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T15:18:20.447Z
last_checked_at: 2026-05-14T18:17:21.070Z
generated_at: 2026-05-14T18:17:21.070Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.070Z
  matched_actions: 45
  action_count: 46
  confidence: high
  summary: "All 45 spec actions match their literal source counterparts; transport parameters verified; command table fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# SunbriteTV Solis TV Control Spec

## Summary
Outdoor TV with RS-232 control interface. Commands use ESC-prefixed ASCII sequences. Com spec: 9600 baud, 8 data bits, 1 stop bit, no parity.

<!-- UNRESOLVED: TCP/IP control path not documented in source -->

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
- id: power_on
  label: Power ON
  kind: action
  params: []

- id: power_off
  label: Power OFF
  kind: action
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  params: []

- id: select_input_tuner
  label: Input 10 - Tuner
  kind: action
  params: []

- id: select_input_av
  label: Input 1 - AV
  kind: action
  params: []

- id: select_input_hdbaset
  label: Input 3 - HDBaseT
  kind: action
  params: []

- id: select_input_usb
  label: Input 4 - USB
  kind: action
  params: []

- id: select_input_component1
  label: Input 5 - Component1
  kind: action
  params: []

- id: select_input_component2
  label: Input 6 - Component2
  kind: action
  params: []

- id: select_input_vga
  label: Input 7 - VGA
  kind: action
  params: []

- id: select_input_hdmi1
  label: Input 8 - HDMI1
  kind: action
  params: []

- id: select_input_hdmi2
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

- id: picture_mode
  label: Picture Mode
  kind: action
  params: []

- id: sound_mode
  label: Sound Mode
  kind: action
  params: []

- id: menu
  label: Menu
  kind: action
  params: []

- id: nav_up
  label: Up Arrow
  kind: action
  params: []

- id: nav_down
  label: Down Arrow
  kind: action
  params: []

- id: nav_left
  label: Left Arrow
  kind: action
  params: []

- id: nav_right
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

- id: picture_mode_sunday
  label: Picture Mode 3 - SunBrite Day
  kind: action
  params: []

- id: picture_mode_night
  label: Picture Mode 4 - Sunbrite Night
  kind: action
  params: []

- id: num_0
  label: Number 0
  kind: action
  params: []

- id: num_1
  label: Number 1
  kind: action
  params: []

- id: num_2
  label: Number 2
  kind: action
  params: []

- id: num_3
  label: Number 3
  kind: action
  params: []

- id: num_4
  label: Number 4
  kind: action
  params: []

- id: num_5
  label: Number 5
  kind: action
  params: []

- id: num_6
  label: Number 6
  kind: action
  params: []

- id: num_7
  label: Number 7
  kind: action
  params: []

- id: num_8
  label: Number 8
  kind: action
  params: []

- id: num_9
  label: Number 9
  kind: action
  params: []

- id: num_dash
  label: Dash
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [PWRON, PWROFF]

- id: input_status
  type: enum
  values: [TN1, AV, N/A, HDBaseT, USB, Component 1, Component2, VGA, HDMI1, HDMI2]

- id: model_class_id
  type: string
  description: Returns model class ID (e.g. B3220AHD-X.XX or B4610AHD-X.XX)

- id: firmware_version
  type: string
  description: Returns main board firmware version

- id: command_executed
  type: enum
  values: [PWR, PWRON, PWROFF, TN1, AV, N/A, HDBaseT, USB, Component 1, Component2, VGA, HDMI1, HDMI2, MUTE, VOL+, VOL-, CH+, CH-, MUTE, PWR]
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented separate from actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Input 7 (VGA) and Input 8 (HDMI1) are intentionally out of letter sequence to maintain legacy Sunbrite RS-232 command compatibility.

Command prefix: ESC (0x1B). Response format: command in brackets (e.g., [PWRON], [HDMI1]).

<!-- UNRESOLVED: TCP/IP control path referenced in filename but not documented in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->

## Provenance

```yaml
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T15:18:20.447Z
last_checked_at: 2026-05-14T18:17:21.070Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.070Z
matched_actions: 45
action_count: 46
confidence: high
summary: "All 45 spec actions match their literal source counterparts; transport parameters verified; command table fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
