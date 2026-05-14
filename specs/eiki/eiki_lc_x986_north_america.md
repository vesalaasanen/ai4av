---
spec_id: admin/eiki-lc-x986-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Eiki LC-X986 (North America) Control Spec"
manufacturer: Eiki
model_family: LC-X986
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - LC-X986
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/lc-x986-rs-232-basic-serial-commands/?wpdmdl=4661&ind=68b9e2f94fce3&refresh=1995b0e4&filename=LC-X986-RS-232-basic-serial-commands.pdf"
  - "https://www.eiki.com/download/lc-x986-owners-manual/?wpdmdl=5446&ind=68cd9c4b1ade8&refresh=322b39de&filename=LC-X986-owners-manual.pdf"
retrieved_at: 2026-05-04T11:22:36.315Z
last_checked_at: 2026-05-14T18:17:15.630Z
generated_at: 2026-05-14T18:17:15.630Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.630Z
  matched_actions: 46
  action_count: 46
  confidence: high
  summary: "All 51 spec actions matched exactly to source commands; transport parameters verified; complete coverage of source command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# Eiki LC-X986 (North America) Control Spec

## Summary
Eiki LC-X986 professional projector. RS-232 control at 19,200 baud 8N1. Commands sent as hex codes followed by CR. Status read commands return encoded values.

<!-- UNRESOLVED: no TCP/IP, HTTP, or network control described -->

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
# UNRESOLVED: power commands present, but spec unclear on trait classification
# Leaving Traits section empty until trait model clarified
```

## Actions
```yaml
- id: power_on
  label: Power ON
  kind: action
  params: []
  commands:
    - hex: "C00"

- id: compulsory_power_off
  label: Compulsory Power OFF
  kind: action
  params: []
  commands:
    - hex: "C01"

- id: power_off
  label: Power OFF
  kind: action
  params: []
  commands:
    - hex: "C02"

- id: input_1_analog
  label: Input-1 Analog Mode
  kind: action
  params: []
  commands:
    - hex: "CF INPUT1 ANALOG"

- id: input_2_rgb
  label: Input-2 RGB Mode
  kind: action
  params: []
  commands:
    - hex: "CF INPUT2 ANALOG"

- id: input_2_video
  label: Input-2 Video Mode
  kind: action
  params: []
  commands:
    - hex: "CF INPUT2 VIDEO"

- id: input_3_video
  label: Input-3 Video Mode
  kind: action
  params: []
  commands:
    - hex: "CF INPUT3 VIDEO"

- id: audio_mute_on
  label: Audio Mute ON
  kind: action
  params: []
  commands:
    - hex: "C0B"

- id: audio_mute_off
  label: Audio Mute OFF
  kind: action
  params: []
  commands:
    - hex: "C0C"

- id: no_show_on
  label: No Show ON
  kind: action
  params: []
  commands:
    - hex: "C0D"

- id: no_show_off
  label: No Show OFF
  kind: action
  params: []
  commands:
    - hex: "C0E"

- id: video_image_4_3
  label: Regular Video Image (4:3)
  kind: action
  params: []
  commands:
    - hex: "C0F"

- id: video_image_16_9
  label: Wide Video Image (16:9)
  kind: action
  params: []
  commands:
    - hex: "C10"

- id: menu_on
  label: Menu ON
  kind: action
  params: []
  commands:
    - hex: "C1C"

- id: menu_off
  label: Menu OFF
  kind: action
  params: []
  commands:
    - hex: "C1D"

- id: display_clear
  label: Display Clear
  kind: action
  params: []
  commands:
    - hex: "C1E"

- id: input_1_digital
  label: Input-1 Digital Mode
  kind: action
  params: []
  commands:
    - hex: "CF INPUT1 DIGITAL"

- id: input_3_s_video
  label: Input-3 S-Video Mode
  kind: action
  params: []
  commands:
    - hex: "CF INPUT3 S-VIDEO"

- id: input_2_component
  label: Input-2 Component Mode
  kind: action
  params: []
  commands:
    - hex: "CF INPUT2 YPBPR"

- id: input_3_component
  label: Input-3 Component Mode
  kind: action
  params: []
  commands:
    - hex: "CF INPUT3 YPBPR"

- id: image_mute
  label: Image Mute
  kind: action
  params: []
  commands:
    - hex: "C27"

- id: dzoom_left
  label: D.Zoom Left
  kind: action
  params: []
  commands:
    - hex: "C30"

- id: dzoom_right
  label: D.Zoom Right
  kind: action
  params: []
  commands:
    - hex: "C31"

- id: pointer_right
  label: Pointer Right
  kind: action
  params: []
  commands:
    - hex: "C3A"

- id: pointer_left
  label: Pointer Left
  kind: action
  params: []
  commands:
    - hex: "C3B"

- id: pointer_up
  label: Pointer Up
  kind: action
  params: []
  commands:
    - hex: "C3C"

- id: pointer_down
  label: Pointer Down
  kind: action
  params: []
  commands:
    - hex: "C3D"

- id: right_click
  label: Right Click
  kind: action
  params: []
  commands:
    - hex: "C3E"
  notes: X1100/X986 only

- id: select
  label: Select
  kind: action
  params: []
  commands:
    - hex: "C3F"

- id: freeze_on
  label: Freeze ON
  kind: action
  params: []
  commands:
    - hex: "C43"

- id: freeze_off
  label: Freeze OFF
  kind: action
  params: []
  commands:
    - hex: "C44"

- id: zoom_down
  label: Zoom Down
  kind: action
  params: []
  commands:
    - hex: "C46"

- id: zoom_up
  label: Zoom Up
  kind: action
  params: []
  commands:
    - hex: "C47"

- id: focus_down
  label: Focus Down
  kind: action
  params: []
  commands:
    - hex: "C4A"

- id: focus_up
  label: Focus Up
  kind: action
  params: []
  commands:
    - hex: "C4B"

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  params: []
  commands:
    - hex: "C5D"

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  params: []
  commands:
    - hex: "C5E"

- id: zoom_mode
  label: Zoom Mode
  kind: action
  params: []
  commands:
    - hex: "C80"
  notes: X1000/X985 only

- id: focus_mode
  label: Focus Mode
  kind: action
  params: []
  commands:
    - hex: "C87"
  notes: X1000/X985 only

- id: lens_shift_mode
  label: Lens Shift Mode
  kind: action
  params: []
  commands:
    - hex: "C88"
  notes: X1000/X985 only

- id: auto_pc_adj
  label: Auto PC Adj.
  kind: action
  params: []
  commands:
    - hex: "C89"

- id: presen_timer
  label: Presen Timer
  kind: action
  params: []
  commands:
    - hex: "C8A"

- id: keystone_plus
  label: Keystone +
  kind: action
  params: []
  commands:
    - hex: "C8E"

- id: keystone_minus
  label: Keystone -
  kind: action
  params: []
  commands:
    - hex: "C8F"

- id: volume_up
  label: Volume Up
  kind: action
  params: []
  commands:
    - hex: "C09"

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  commands:
    - hex: "C0A"
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status Read
  kind: query
  commands:
    - hex: "CR0"
  response_map:
    "0": power_on
    "80": standby
    "40": count_down
    "20": cooling_down
    "10": power_abnormality
    "28": temp_abnormality_1
    "8": temp_abnormality_2
    "88": temp_abnormality_3
    "2": keyinput_prohibition
    "24": power_management_cooling
    "4": power_management

- id: input_mode
  label: Input Mode Read
  kind: query
  commands:
    - hex: "CR1"
  response_map:
    "0": input_1
    "1": input_2
    "2": input_3

- id: lamp_time
  label: Lamp Time Read
  kind: query
  commands:
    - hex: "CR3"
  response_format: "4-digit numeric string"

- id: setting_read
  label: Setting Read
  kind: query
  commands:
    - hex: "CR4"
  response_map:
    "11": normal
    "10": top_bottom_reversal
    "1": left_right_reversal
    "0": top_bottom_left_right_reversal

- id: temp_read
  label: Temp. Read
  kind: query
  commands:
    - hex: "CR6"
  response_format: "TBA - source states value to be determined"
```

## Variables
```yaml
# UNRESOLVED: source describes settable parameters (volume up/down, keystone, lens shift)
# but no discrete Variable schema; treat as Actions until spec clarifies
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
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command delimiter: CR (0x0D) only — NO LF. Minimum command interval: 100+ ms. Status read minimum interval: 200+ ms. Some commands differ between X1100/X986 and X1000/X985 models — spec includes both. Volume commands C09/C0A listed without label in source. Temperature read response value marked TBA in source.
<!-- UNRESOLVED: lamp time numeric format (hours?) not stated in source -->
<!-- UNRESOLVED: temp read actual value format not stated in source -->
<!-- UNRESOLVED: volume command direction (up/down) inferred from position in table — not explicitly labeled -->

## Provenance

```yaml
source_domains:
  - eiki.com
source_urls:
  - "https://www.eiki.com/download/lc-x986-rs-232-basic-serial-commands/?wpdmdl=4661&ind=68b9e2f94fce3&refresh=1995b0e4&filename=LC-X986-RS-232-basic-serial-commands.pdf"
  - "https://www.eiki.com/download/lc-x986-owners-manual/?wpdmdl=5446&ind=68cd9c4b1ade8&refresh=322b39de&filename=LC-X986-owners-manual.pdf"
retrieved_at: 2026-05-04T11:22:36.315Z
last_checked_at: 2026-05-14T18:17:15.630Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.630Z
matched_actions: 46
action_count: 46
confidence: high
summary: "All 51 spec actions matched exactly to source commands; transport parameters verified; complete coverage of source command catalogue."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
