---
spec_id: admin/jvc_kenwood-dla_xc7890r
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-XC7890R Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-XC7890R
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-XC7890R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - manuals.jvckenwood.com
  - jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/lch60830-001en/
  - https://manuals.jvckenwood.com/download/files/PC027183199-1.pdf
  - "https://www.jvc.com/content/dam/jvc/usa/projectors/installers-calibrators/2024-D_ILA_External_command_(Ver1.0).pdf"
retrieved_at: 2026-05-21T19:45:25.160Z
last_checked_at: 2026-06-09T12:27:12.102Z
generated_at: 2026-06-09T12:27:12.102Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DLA-XC7890R not explicitly listed in source model list; compatibility inferred from D-ILA X-series generation shared protocol."
  - "source does not describe settable discrete parameters beyond the action list above."
  - "source describes no unsolicited event notifications from projector."
  - "source does not describe multi-step macro sequences."
  - "no safety warnings or interlock procedures beyond those listed above."
verification:
  verdict: verified
  checked_at: 2026-06-09T12:27:12.102Z
  matched_actions: 319
  action_count: 319
  confidence: medium
  summary: "All 319 spec actions matched verbatim to source hex codes; transport parameters (19200bps 8-N-1 serial) confirmed in source; command format matches source documentation; source command inventory comprehensively represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# JVC KENWOOD DLA-XC7890R Control Spec

## Summary
JVC D-ILA home theater projector supporting RS-232C direct commands and Remote Control Emulation commands. Protocol uses 7-byte or 10-byte hex command format with 19200bps 8-N-1 serial. Query commands available for power state, input, gamma, source, and model status. No authentication required. Infrared RC code 73 (Code A) supported per D-ILA X-series generation.

<!-- UNRESOLVED: DLA-XC7890R not explicitly listed in source model list; compatibility inferred from D-ILA X-series generation shared protocol. -->

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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "2189 01 50 57 30 0A"

- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "2189 01 50 57 31 0A"

- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  params: []
  hex: "2189 01 49 50 36 0A"

- id: input_hdmi2
  label: Input HDMI 2
  kind: action
  params: []
  hex: "2189 01 49 50 37 0A"

- id: input_component
  label: Input Component
  kind: action
  params: []
  hex: "2189 01 49 50 32 0A"

- id: input_svideo
  label: Input S-Video
  kind: action
  params: []
  hex: "2189 01 49 50 30 0A"

- id: input_video
  label: Input Video
  kind: action
  params: []
  hex: "2189 01 49 50 31 0A"

- id: input_pc
  label: Input PC
  kind: action
  params: []
  hex: "2189 01 49 50 33 0A"

- id: input_next
  label: Input Next (cycle to next highest)
  kind: action
  params: []
  hex: "2189 01 49 50 2B 0A"

- id: input_prev
  label: Input Previous (cycle to next lowest)
  kind: action
  params: []
  hex: "2189 01 49 50 2D 0A"

- id: testpattern_off
  label: Test Pattern Off
  kind: action
  params: []
  hex: "2189 01 54 53 30 0A"

- id: testpattern_colourbars
  label: Test Pattern Colour Bars
  kind: action
  params: []
  hex: "2189 01 54 53 31 0A"

- id: testpattern_stairstep_bw
  label: Test Pattern Stairstep (black and white)
  kind: action
  params: []
  hex: "2189 01 54 53 36 0A"

- id: testpattern_stairstep_red
  label: Test Pattern Stairstep (red)
  kind: action
  params: []
  hex: "2189 01 54 53 37 0A"

- id: testpattern_stairstep_green
  label: Test Pattern Stairstep (green)
  kind: action
  params: []
  hex: "2189 01 54 53 38 0A"

- id: testpattern_stairstep_blue
  label: Test Pattern Stairstep (blue)
  kind: action
  params: []
  hex: "2189 01 54 53 39 0A"

- id: testpattern_crosshatch_green
  label: Test Pattern Crosshatch (green)
  kind: action
  params: []
  hex: "2189 01 54 53 41 0A"

- id: gamma_normal
  label: Gamma Normal
  kind: action
  params: []
  hex: "2189 01 47 54 30 0A"

- id: gamma_a
  label: Gamma A
  kind: action
  params: []
  hex: "2189 01 47 54 31 0A"

- id: gamma_b
  label: Gamma B
  kind: action
  params: []
  hex: "2189 01 47 54 32 0A"

- id: gamma_c
  label: Gamma C
  kind: action
  params: []
  hex: "2189 01 47 54 33 0A"

- id: gamma_d
  label: Gamma D
  kind: action
  params: []
  hex: "2189 01 47 54 37 0A"

- id: gamma_custom1
  label: Gamma Custom 1
  kind: action
  params: []
  hex: "2189 01 47 54 34 0A"

- id: gamma_custom2
  label: Gamma Custom 2
  kind: action
  params: []
  hex: "2189 01 47 54 35 0A"

- id: gamma_custom3
  label: Gamma Custom 3
  kind: action
  params: []
  hex: "2189 01 47 54 36 0A"

- id: lamppower_normal
  label: Lamp Power Normal
  kind: action
  params: []
  hex: "2189 01 50 4D 4C 50 30 0A"

- id: lamppower_high
  label: Lamp Power High
  kind: action
  params: []
  hex: "2189 01 50 4D 4C 50 31 0A"

- id: clear_motion_drive_off
  label: Clear Motion Drive Off
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 30 0A"

- id: clear_motion_drive_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 31 0A"

- id: clear_motion_drive_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 32 0A"

- id: clear_motion_drive_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 33 0A"

- id: clear_motion_drive_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 34 0A"

- id: clear_motion_drive_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 35 0A"

- id: anamorphic_off
  label: Anamorphic Off
  kind: action
  params: []
  hex: "2189 01 49 4E 56 53 30 0A"

- id: anamorphic_a
  label: Anamorphic A
  kind: action
  params: []
  hex: "2189 01 49 4E 56 53 31 0A"

- id: anamorphic_b
  label: Anamorphic B
  kind: action
  params: []
  hex: "2189 01 49 4E 56 53 32 0A"

- id: off_timer_off
  label: Off Timer Off
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 30 0A"

- id: off_timer_1hr
  label: Off Timer Set 1 Hour
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 31 0A"

- id: off_timer_2hr
  label: Off Timer Set 2 Hours
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 32 0A"

- id: off_timer_3hr
  label: Off Timer Set 3 Hours
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 33 0A"

- id: off_timer_4hr
  label: Off Timer Set 4 Hours
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 34 0A"

- id: trigger_off
  label: Trigger Off
  kind: action
  params: []
  hex: "2189 01 46 55 54 52 30 0A"

- id: trigger_on_power
  label: Trigger On (Power)
  kind: action
  params: []
  hex: "2189 01 46 55 54 52 31 0A"

- id: trigger_on_anamorphic
  label: Trigger On (Anamorphic)
  kind: action
  params: []
  hex: "2189 01 46 55 54 52 32 0A"

- id: remote_code_a
  label: Remote Code A (hex 73)
  kind: action
  params: []
  hex: "2189 01 53 55 52 43 30 0A"

- id: remote_code_b
  label: Remote Code B (hex 63)
  kind: action
  params: []
  hex: "2189 01 53 55 52 43 31 0A"

- id: brightness_up
  label: Brightness Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 41 0A"

- id: brightness_down
  label: Brightness Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 42 0A"

- id: contrast_up
  label: Contrast Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 38 0A"

- id: contrast_down
  label: Contrast Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 39 0A"

- id: colour_up
  label: Colour Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 43 0A"

- id: colour_down
  label: Colour Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 44 0A"

- id: tint_up
  label: Tint Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 38 0A"

- id: tint_down
  label: Tint Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 39 0A"

- id: sharpness_up
  label: Sharpness Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 45 0A"

- id: sharpness_down
  label: Sharpness Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 46 0A"

- id: lens_focus_up
  label: Lens Focus Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 31 0A"

- id: lens_focus_down
  label: Lens Focus Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 32 0A"

- id: lens_zoom_in
  label: Lens Zoom In
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 35 0A"

- id: lens_zoom_out
  label: Lens Zoom Out
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 37 0A"

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 31 0A"

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 32 0A"

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 34 0A"

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 33 0A"

- id: menu_toggle
  label: Menu (On/Off Toggle)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 45 0A"

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 31 0A"

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 32 0A"

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 36 0A"

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 34 0A"

- id: ok
  label: OK (accept selection)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 46 0A"

- id: back
  label: Back
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 33 0A"

- id: aspect_16x9
  label: Aspect 16:9
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 36 0A"

- id: aspect_4x3
  label: Aspect 4:3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 35 0A"

- id: aspect_zoom
  label: Aspect Zoom
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 37 0A"

- id: null_command
  label: Null Command (test communication)
  kind: action
  params: []
  hex: "2189 01 00 00 0A"
- id: gamma_value_set_18
  label: Set Gamma Correction Value 1.8
  kind: action
  params: []
  hex: "2189 01 47 50 30 0A"

- id: gamma_value_set_19
  label: Set Gamma Correction Value 1.9
  kind: action
  params: []
  hex: "2189 01 47 50 31 0A"

- id: gamma_value_set_20
  label: Set Gamma Correction Value 2.0
  kind: action
  params: []
  hex: "2189 01 47 50 32 0A"

- id: gamma_value_set_21
  label: Set Gamma Correction Value 2.1
  kind: action
  params: []
  hex: "2189 01 47 50 33 0A"

- id: gamma_value_set_22
  label: Set Gamma Correction Value 2.2
  kind: action
  params: []
  hex: "2189 01 47 50 34 0A"

- id: gamma_value_set_23
  label: Set Gamma Correction Value 2.3
  kind: action
  params: []
  hex: "2189 01 47 50 35 0A"

- id: gamma_value_set_24
  label: Set Gamma Correction Value 2.4
  kind: action
  params: []
  hex: "2189 01 47 50 36 0A"

- id: gamma_value_set_25
  label: Set Gamma Correction Value 2.5
  kind: action
  params: []
  hex: "2189 01 47 50 37 0A"

- id: gamma_value_set_26
  label: Set Gamma Correction Value 2.6
  kind: action
  params: []
  hex: "2189 01 47 50 38 0A"

- id: picture_mode_film
  label: Picture Mode Film (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 30 0A"

- id: picture_mode_cinema
  label: Picture Mode Cinema (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 31 0A"

- id: picture_mode_animation
  label: Picture Mode Animation (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 32 0A"

- id: picture_mode_natural
  label: Picture Mode Natural (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 33 0A"

- id: picture_mode_stage
  label: Picture Mode Stage (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 34 0A"

- id: picture_mode_thx
  label: Picture Mode THX (X70/X90/RS55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 36 0A"

- id: picture_mode_3d
  label: Picture Mode 3D (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 42 0A"

- id: picture_mode_user1
  label: Picture Mode User 1 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 43 0A"

- id: picture_mode_user2
  label: Picture Mode User 2 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 44 0A"

- id: picture_mode_user3
  label: Picture Mode User 3 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 45 0A"

- id: picture_mode_user4
  label: Picture Mode User 4 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 46 0A"

- id: picture_mode_user5
  label: Picture Mode User 5 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 31 30 0A"

- id: picture_mode_x3_film
  label: Picture Mode Film (X3/X7/X9/RS40/50/60)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 0A"

- id: picture_mode_x3_cinema
  label: Picture Mode Cinema (X3/X7/X9/RS40/50/60)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 31 0A"

- id: picture_mode_x3_animation
  label: Picture Mode Animation (X3/X7/X9/RS40/50/60)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 32 0A"

- id: picture_mode_x3_natural
  label: Picture Mode Natural (X3/X7/X9/RS40/50/60)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 33 0A"

- id: picture_mode_x3_stage
  label: Picture Mode Stage (X3/X7/X9/RS40/50/60)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 34 0A"

- id: picture_mode_x3_3d
  label: Picture Mode 3D (X3/X7/X9/RS40/50/60)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 45 0A"

- id: picture_mode_x3_user1
  label: Picture Mode User 1 (X3/X7/X9/RS40/50/60)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 36 0A"

- id: picture_mode_x3_user2
  label: Picture Mode User 2 (X3/X7/X9/RS40/50/60)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 37 0A"

- id: picture_mode_x3_thx
  label: Picture Mode THX (X7/X9/RS50/60)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 39 0A"

- id: picture_mode_hd350_dynamic
  label: Picture Mode Dynamic (HD350/550/950/990)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 35 0A"

- id: colour_profile_off
  label: Colour Profile Off (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 30 0A"

- id: colour_profile_film1
  label: Colour Profile Film 1 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 31 0A"

- id: colour_profile_film2
  label: Colour Profile Film 2 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 32 0A"

- id: colour_profile_standard
  label: Colour Profile Standard (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 33 0A"

- id: colour_profile_cinema1
  label: Colour Profile Cinema 1 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 34 0A"

- id: colour_profile_cinema2
  label: Colour Profile Cinema 2 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 35 0A"

- id: colour_profile_anime1
  label: Colour Profile Anime 1 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 36 0A"

- id: colour_profile_anime2
  label: Colour Profile Anime 2 (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 37 0A"

- id: colour_profile_video
  label: Colour Profile Video (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 38 0A"

- id: colour_profile_vivid
  label: Colour Profile Vivid (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 39 0A"

- id: colour_profile_adobe
  label: Colour Profile Adobe (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 41 0A"

- id: colour_profile_stage
  label: Colour Profile Stage (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 42 0A"

- id: colour_profile_3d
  label: Colour Profile 3D (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 43 0A"

- id: colour_profile_thx
  label: Colour Profile THX (X30/X70/X90/RS45/55/65)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 44 0A"

- id: format_3d_off
  label: 3D Format Off (2D)
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 30 0A"

- id: format_3d_auto
  label: 3D Format Auto
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 31 0A"

- id: format_3d_frame_packing
  label: 3D Format Frame Packing
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 32 0A"

- id: format_3d_side_by_side
  label: 3D Format Side by Side
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 33 0A"

- id: format_3d_top_and_bottom
  label: 3D Format Top and Bottom
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 34 0A"

- id: conversion_2d_to_3d_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []
  hex: "2189 01 49 53 33 43 30 0A"

- id: conversion_2d_to_3d_on
  label: 2D to 3D Conversion On
  kind: action
  params: []
  hex: "2189 01 49 53 33 43 31 0A"

- id: subtitle_correction_3d_off
  label: 3D Subtitle Correction Off
  kind: action
  params: []
  hex: "2189 01 49 53 33 54 31 0A"

- id: subtitle_correction_3d_on
  label: 3D Subtitle Correction On
  kind: action
  params: []
  hex: "2189 01 49 53 33 54 30 0A"

- id: lens_memory_save_1
  label: Lens Memory Save Memory 1
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 53 30 0A"

- id: lens_memory_save_2
  label: Lens Memory Save Memory 2
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 53 31 0A"

- id: lens_memory_save_3
  label: Lens Memory Save Memory 3
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 53 32 0A"

- id: lens_memory_select_1
  label: Lens Memory Select Memory 1
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 4C 30 0A"

- id: lens_memory_select_2
  label: Lens Memory Select Memory 2
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 4C 31 0A"

- id: lens_memory_select_3
  label: Lens Memory Select Memory 3
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 4C 32 0A"

- id: power_off_rc
  label: Power Off (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 36 0A"

- id: power_on_rc
  label: Power On (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 35 0A"

- id: input_hdmi1_rc
  label: Input HDMI 1 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 30 0A"

- id: input_hdmi2_rc
  label: Input HDMI 2 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 31 0A"

- id: input_component_rc
  label: Input Component (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 44 0A"

- id: input_svideo_rc
  label: Input S-Video (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 43 0A"

- id: input_video_rc
  label: Input Video (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 42 0A"

- id: input_pc_rc
  label: Input PC (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 36 0A"

- id: input_cycle_rc
  label: Input Cycle (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 38 0A"

- id: gamma_normal_rc
  label: Gamma Normal (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 38 0A"

- id: gamma_a_rc
  label: Gamma A (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 39 0A"

- id: gamma_b_rc
  label: Gamma B (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 41 0A"

- id: gamma_c_rc
  label: Gamma C (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 42 0A"

- id: gamma_d_rc
  label: Gamma D (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 46 0A"

- id: gamma_custom1_rc
  label: Gamma Custom 1 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 43 0A"

- id: gamma_custom2_rc
  label: Gamma Custom 2 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 44 0A"

- id: gamma_custom3_rc
  label: Gamma Custom 3 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 45 0A"

- id: gamma_cycle_rc
  label: Gamma Cycle Through All Options
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 35 0A"

- id: picture_mode_3d_rc
  label: Picture Mode 3D (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 37 0A"

- id: picture_mode_cinema1_rc
  label: Picture Mode Cinema 1 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 39 0A"

- id: picture_mode_cinema2_rc
  label: Picture Mode Cinema 2 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 38 0A"

- id: picture_mode_cinema3_rc
  label: Picture Mode Cinema 3 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 36 0A"

- id: picture_mode_dynamic_rc
  label: Picture Mode Dynamic (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 42 0A"

- id: picture_mode_natural_rc
  label: Picture Mode Natural (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 41 0A"

- id: picture_mode_stage_rc
  label: Picture Mode Stage (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 37 0A"

- id: picture_mode_thx_rc
  label: Picture Mode THX (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 46 0A"

- id: picture_mode_user1_rc
  label: Picture Mode User 1 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 43 0A"

- id: picture_mode_user2_rc
  label: Picture Mode User 2 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 44 0A"

- id: picture_mode_user3_rc
  label: Picture Mode User 3 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 45 0A"

- id: picture_mode_user4_rc
  label: Picture Mode User 4 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 41 0A"

- id: picture_mode_user5_rc
  label: Picture Mode User 5 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 42 0A"

- id: picture_mode_user_cycle_rc
  label: Picture Mode User Cycle (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 37 0A"

- id: hide_off_rc
  label: Hide Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 31 0A"

- id: hide_on_rc
  label: Hide On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 30 0A"

- id: hide_toggle_rc
  label: Hide On/Off Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 44 0A"

- id: shutter_close_rc
  label: Shutter Close
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 39 0A"

- id: shutter_open_rc
  label: Shutter Open
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 41 0A"

- id: shutter_sync_off_rc
  label: Shutter Sync Off (unsynchronise with Hide)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 44 0A"

- id: shutter_sync_on_rc
  label: Shutter Sync On (synchronise with Hide)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 43 0A"

- id: isf_day_rc
  label: ISF Day
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 34 0A"

- id: isf_night_rc
  label: ISF Night
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 35 0A"

- id: isf_off_rc
  label: ISF Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 41 0A"

- id: isf_on_rc
  label: ISF On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 42 0A"

- id: keystone_horizontal_down_rc
  label: Keystone Correction Horizontal Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 31 0A"

- id: keystone_horizontal_up_rc
  label: Keystone Correction Horizontal Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 30 0A"

- id: keystone_vertical_down_rc
  label: Keystone Correction Vertical Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 43 0A"

- id: keystone_vertical_up_rc
  label: Keystone Correction Vertical Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 42 0A"

- id: lens_aperture_1_rc
  label: Lens Aperture 1 (HD350/HD550)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 38 0A"

- id: lens_aperture_2_rc
  label: Lens Aperture 2 (HD350/HD550)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 39 0A"

- id: lens_aperture_3_rc
  label: Lens Aperture 3 (HD350/HD550)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 41 0A"

- id: lens_aperture_down_rc
  label: Lens Aperture Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 46 0A"

- id: lens_aperture_up_rc
  label: Lens Aperture Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 45 0A"

- id: lens_aperture_adj_rc
  label: Lens Aperture Adjustment Bar Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 30 0A"

- id: lens_control_cycle_rc
  label: Lens Control Cycle Through All Options
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 30 0A"

- id: lens_memory_cycle_rc
  label: Lens Memory Cycle Pages
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 34 0A"

- id: lens_memory_1_rc
  label: Lens Memory 1 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 38 0A"

- id: lens_memory_2_rc
  label: Lens Memory 2 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 39 0A"

- id: lens_memory_3_rc
  label: Lens Memory 3 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 41 0A"

- id: bnr_off_rc
  label: BNR Block Noise Reduction Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 30 0A"

- id: bnr_on_rc
  label: BNR Block Noise Reduction On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 46 0A"

- id: mnr_down_rc
  label: MNR Mosquito Noise Reduction Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 45 0A"

- id: mnr_up_rc
  label: MNR Mosquito Noise Reduction Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 44 0A"

- id: rnr_down_rc
  label: RNR Random Noise Reduction Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 43 0A"

- id: rnr_up_rc
  label: RNR Random Noise Reduction Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 42 0A"

- id: nr_toggle_rc
  label: NR Toggle Display of RNR/MNR
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 38 0A"

- id: cmd_cycle_rc
  label: Clear Motion Drive Cycle Through All Modes
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 41 0A"

- id: cmd_off_rc
  label: Clear Motion Drive Off (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 37 0A"

- id: cmd_mode1_rc
  label: Clear Motion Drive Mode 1 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 45 0A"

- id: cmd_mode2_rc
  label: Clear Motion Drive Mode 2 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 46 0A"

- id: cmd_mode3_rc
  label: Clear Motion Drive Mode 3 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 38 0A"

- id: cmd_mode4_rc
  label: Clear Motion Drive Mode 4 (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 39 0A"

- id: cmd_inverse_telecine_rc
  label: Clear Motion Drive Inverse Telecine (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 41 0A"

- id: anamorphic_off_rc
  label: Anamorphic Off (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 34 0A"

- id: anamorphic_a_rc
  label: Anamorphic A (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 33 0A"

- id: anamorphic_b_rc
  label: Anamorphic B (RC Emulation)
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 42 0A"

- id: anamorphic_cycle_rc
  label: Anamorphic Cycle Off/A/B
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 35 0A"

- id: aspect_pc_auto_rc
  label: Aspect PC Auto
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 45 0A"

- id: aspect_pc_full_rc
  label: Aspect PC Full
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 30 0A"

- id: aspect_pc_just_rc
  label: Aspect PC Just
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 46 0A"

- id: aspect_cycle_rc
  label: Aspect Cycle Through All Available Modes
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 37 0A"

- id: colour_temp_5800k_rc
  label: Colour Temperature 5800K
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 45 0A"

- id: colour_temp_6500k_rc
  label: Colour Temperature 6500K
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 46 0A"

- id: colour_temp_7500k_rc
  label: Colour Temperature 7500K
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 30 0A"

- id: colour_temp_9300k_rc
  label: Colour Temperature 9300K
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 31 0A"

- id: colour_temp_custom1_rc
  label: Colour Temperature Custom 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 33 0A"

- id: colour_temp_custom2_rc
  label: Colour Temperature Custom 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 34 0A"

- id: colour_temp_custom3_rc
  label: Colour Temperature Custom 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 35 0A"

- id: colour_temp_high_bright_rc
  label: Colour Temperature High Bright
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 32 0A"

- id: colour_temp_cycle_rc
  label: Colour Temperature Cycle Through All Options
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 36 0A"

- id: colour_temp_gain_blue_down_rc
  label: Colour Temperature Gain Blue Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 31 0A"

- id: colour_temp_gain_blue_up_rc
  label: Colour Temperature Gain Blue Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 30 0A"

- id: colour_temp_gain_green_down_rc
  label: Colour Temperature Gain Green Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 46 0A"

- id: colour_temp_gain_green_up_rc
  label: Colour Temperature Gain Green Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 45 0A"

- id: colour_temp_gain_red_down_rc
  label: Colour Temperature Gain Red Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 44 0A"

- id: colour_temp_gain_red_up_rc
  label: Colour Temperature Gain Red Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 43 0A"

- id: colour_temp_offset_blue_down_rc
  label: Colour Temperature Offset Blue Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 37 0A"

- id: colour_temp_offset_blue_up_rc
  label: Colour Temperature Offset Blue Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 36 0A"

- id: colour_temp_offset_green_down_rc
  label: Colour Temperature Offset Green Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 35 0A"

- id: colour_temp_offset_green_up_rc
  label: Colour Temperature Offset Green Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 34 0A"

- id: colour_temp_offset_red_down_rc
  label: Colour Temperature Offset Red Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 33 0A"

- id: colour_temp_offset_red_up_rc
  label: Colour Temperature Offset Red Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 32 0A"

- id: colour_management_off_rc
  label: Colour Management Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 30 0A"

- id: colour_management_custom1_rc
  label: Colour Management Custom 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 31 0A"

- id: colour_management_custom2_rc
  label: Colour Management Custom 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 32 0A"

- id: colour_management_custom3_rc
  label: Colour Management Custom 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 33 0A"

- id: colour_management_cycle_rc
  label: Colour Management Cycle Off/Custom 1/Custom 2/Custom 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 39 0A"

- id: colour_profile_cycle_rc
  label: Colour Profile Cycle Through All Available
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 38 0A"

- id: colour_space_cycle_rc
  label: Colour Space Cycle Standard/Wide 1/Wide 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 44 0A"

- id: screen_adjust_off_rc
  label: Screen Adjust Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 30 0A"

- id: screen_adjust_a_rc
  label: Screen Adjust A
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 31 0A"

- id: screen_adjust_b_rc
  label: Screen Adjust B
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 32 0A"

- id: screen_adjust_c_rc
  label: Screen Adjust C
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 33 0A"

- id: picture_tone_blue_down_rc
  label: Picture Tone Blue Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 31 0A"

- id: picture_tone_blue_up_rc
  label: Picture Tone Blue Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 30 0A"

- id: picture_tone_green_down_rc
  label: Picture Tone Green Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 46 0A"

- id: picture_tone_green_up_rc
  label: Picture Tone Green Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 45 0A"

- id: picture_tone_red_down_rc
  label: Picture Tone Red Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 44 0A"

- id: picture_tone_red_up_rc
  label: Picture Tone Red Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 43 0A"

- id: picture_tone_white_down_rc
  label: Picture Tone White Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 42 0A"

- id: picture_tone_white_up_rc
  label: Picture Tone White Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 41 0A"

- id: pixel_shift_h_blue_down_rc
  label: Pixel Shift Horizontal Blue Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 45 0A"

- id: pixel_shift_h_blue_up_rc
  label: Pixel Shift Horizontal Blue Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 44 0A"

- id: pixel_shift_h_green_down_rc
  label: Pixel Shift Horizontal Green Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 43 0A"

- id: pixel_shift_h_green_up_rc
  label: Pixel Shift Horizontal Green Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 42 0A"

- id: pixel_shift_h_red_down_rc
  label: Pixel Shift Horizontal Red Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 41 0A"

- id: pixel_shift_h_red_up_rc
  label: Pixel Shift Horizontal Red Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 39 0A"

- id: pixel_shift_v_blue_down_rc
  label: Pixel Shift Vertical Blue Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 34 0A"

- id: pixel_shift_v_blue_up_rc
  label: Pixel Shift Vertical Blue Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 33 0A"

- id: pixel_shift_v_green_down_rc
  label: Pixel Shift Vertical Green Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 32 0A"

- id: pixel_shift_v_green_up_rc
  label: Pixel Shift Vertical Green Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 31 0A"

- id: pixel_shift_v_red_down_rc
  label: Pixel Shift Vertical Red Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 30 0A"

- id: pixel_shift_v_red_up_rc
  label: Pixel Shift Vertical Red Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 46 0A"

- id: mask_bottom_down_rc
  label: Mask Bottom Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 38 0A"

- id: mask_bottom_up_rc
  label: Mask Bottom Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 37 0A"

- id: mask_left_down_rc
  label: Mask Left Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 32 0A"

- id: mask_left_up_rc
  label: Mask Left Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 31 0A"

- id: mask_right_down_rc
  label: Mask Right Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 34 0A"

- id: mask_right_up_rc
  label: Mask Right Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 33 0A"

- id: mask_top_down_rc
  label: Mask Top Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 36 0A"

- id: mask_top_up_rc
  label: Mask Top Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 35 0A"

- id: bright_level_down_rc
  label: Bright Level Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 33 0A"

- id: bright_level_up_rc
  label: Bright Level Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 32 0A"

- id: dark_level_down_rc
  label: Dark Level Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 35 0A"

- id: dark_level_up_rc
  label: Dark Level Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 34 0A"

- id: detail_enhance_down_rc
  label: Detail Enhance Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 32 0A"

- id: detail_enhance_up_rc
  label: Detail Enhance Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 31 0A"

- id: horizontal_position_down_rc
  label: Horizontal Position Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 42 0A"

- id: horizontal_position_up_rc
  label: Horizontal Position Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 41 0A"

- id: vertical_position_down_rc
  label: Vertical Position Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 44 0A"

- id: vertical_position_up_rc
  label: Vertical Position Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 43 0A"

- id: brightness_adj_rc
  label: Brightness Adjustment Bar On/Off Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 39 0A"

- id: colour_adj_rc
  label: Colour Adjustment Bar On/Off Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 35 0A"

- id: contrast_adj_rc
  label: Contrast Adjustment Bar On/Off Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 41 0A"

- id: sharpness_adj_rc
  label: Sharpness Adjustment Bar On/Off Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 34 0A"

- id: tint_adj_rc
  label: Tint Adjustment Bar On/Off Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 36 0A"

- id: setting_3d_rc
  label: 3D Setting Direct Menu Access
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 35 0A"

- id: format_3d_cycle_rc
  label: 3D Format Cycle Through All Available
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 36 0A"

- id: thx_bright_rc
  label: THX Bright
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 35 0A"

- id: thx_dark_rc
  label: THX Dark
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 36 0A"

- id: thx_off_rc
  label: THX Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 37 0A"

- id: thx_on_rc
  label: THX On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 38 0A"

- id: advanced_rc
  label: Advanced Direct Access to Picture Adjust Advanced Menu
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 33 0A"

- id: information_rc
  label: Information Display
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 34 0A"

- id: menu_position_rc
  label: Menu Position
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 32 0A"

- id: picture_adjust_rc
  label: Picture Adjust
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 32 0A"

- id: cec_off_rc
  label: CEC Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 37 0A"

- id: cec_on_rc
  label: CEC On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 36 0A"

- id: phase_pc_down_rc
  label: Phase PC Input Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 39 0A"

- id: phase_pc_up_rc
  label: Phase PC Input Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 38 0A"

- id: tracking_pc_down_rc
  label: Tracking PC Input Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 37 0A"

- id: tracking_pc_up_rc
  label: Tracking PC Input Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 36 0A"

- id: auto_align_rc
  label: Auto Align PC Input
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 33 0A"

- id: auto_lens_centre_rc
  label: Auto Lens Centre
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 39 0A"

- id: cti_off_rc
  label: CTI Colour Transient Improvement Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 43 0A"

- id: cti_low_rc
  label: CTI Colour Transient Improvement Low
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 44 0A"

- id: cti_middle_rc
  label: CTI Colour Transient Improvement Middle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 45 0A"

- id: cti_high_rc
  label: CTI Colour Transient Improvement High
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 46 0A"

- id: testpattern_cycle_rc
  label: Test Pattern Cycle Through All Patterns
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 39 0A"
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - "30": Standby
    - "31": Power On
    - "32": Cooling
    - "34": Emergency
  query_command: "3F 89 01 50 57 0A"
  response_format: "06 89 01 50 57 0A 40 89 01 50 57 RR 0A"

- id: input_status
  label: Input Status
  type: enum
  values:
    - "30": S-Video
    - "31": Video
    - "32": Component
    - "33": PC
    - "36": HDMI 1
    - "37": HDMI 2
  query_command: "3F 89 01 49 50 0A"
  response_format: "06 89 01 49 50 0A 40 89 01 49 50 RR 0A"

- id: gamma_table_status
  label: Gamma Table Status
  type: enum
  values:
    - "30": Gamma Normal
    - "31": Gamma A
    - "32": Gamma B
    - "33": Gamma C
    - "34": Gamma Custom 1
    - "35": Gamma Custom 2
    - "36": Gamma Custom 3
  query_command: "3F 89 01 47 54 0A"
  response_format: "06 89 01 47 54 0A 40 89 01 47 54 RR 0A"

- id: gamma_value_status
  label: Gamma Value Status
  type: enum
  values:
    - "30": Gamma 1.8
    - "31": Gamma 1.9
    - "32": Gamma 2.0
    - "33": Gamma 2.1
    - "34": Gamma 2.2
    - "35": Gamma 2.3
    - "36": Gamma 2.4
    - "37": Gamma 2.5
    - "38": Gamma 2.6
  query_command: "3F 89 01 47 50 0A"
  response_format: "06 89 01 47 50 0A 40 89 01 47 50 RR 0A"

- id: source_status
  label: Source Status
  type: enum
  values:
    - "00": JVC Logo displayed
    - "30": No signal or signal out of range
    - "31": Signal input correctly
  query_command: "3F 89 01 53 43 0A"
  response_format: "06 89 01 53 43 0A 40 89 01 53 43 RR 0A"

- id: model_status
  label: Model Status
  type: string
  query_command: "3F 89 01 4D 44 0A"
  response_format: "06 89 01 4D 44 0A 40 89 01 4D 44 RR 0A"
  notes: "Response data is ASCII model identifier string"

- id: command_ack
  label: Command Acknowledgement
  type: enum
  values:
    - "06 89 01 50 57 0A": Power acknowledgement
    - "06 89 01 49 50 0A": Input acknowledgement
    - "06 89 01 54 53 0A": Test Pattern acknowledgement
    - "06 89 01 47 54 0A": Gamma Table acknowledgement
    - "06 89 01 47 50 0A": Gamma Value acknowledgement
    - "06 89 01 52 43 0A": Remote Control Emulation acknowledgement
    - "06 89 01 00 00 0A": Null command acknowledgement
```

## Variables
```yaml
# UNRESOLVED: source does not describe settable discrete parameters beyond the action list above.
# All adjustable picture parameters (brightness, contrast, colour, tint, sharpness,
# colour temperature, etc.) are controlled via RC emulation increment/decrement commands
# rather than discrete setters.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited event notifications from projector.
# Projector only responds to queries; does not initiate communication.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_off_requires_delay
    description: "Power Off command should be sent twice with short delay between sends"
    source: "Remote Control Emulation command table entry for Power - Off"
  - id: cooling_mode
    description: "Projector ignores power-on command while in cooling mode"
    source: "Error Handling section"
  - id: command_timing
    description: "External controller must wait for acknowledgement before sending next command; 50ms break in data discards command"
    source: "Error Handling section"
# UNRESOLVED: no safety warnings or interlock procedures beyond those listed above.
```

## Notes
- DLA-XC7890R not explicitly listed in source model compatibility list; inferred compatible from D-ILA X-series generation shared protocol. Confidence: low.
- RS-232C serial confirmed (19200bps 8-N-1); LAN control documented for X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65 but NOT stated for XC7890R — marked N/A.
- Command format: 7 or 10 byte hex, header (21=command, 3F=enquiry), unit ID (89 01 fixed), 2-byte command, data, terminator (0A).
- Acknowledgement responses: basic (06) followed by optional detailed response (40) for query commands.
- Infrared control uses RC code 73 (Code A) or 63 (Code B) with ASCII hex payload format.
- Source: JVC DILA Remote Control Guide v1.4 covering DLA-HD350/750/550/950/990, DLA-X3/X7/X9/X30/X70/X90, DLA-RS10/20/15/25/35/40/50/60/45/55/65.

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - manuals.jvckenwood.com
  - jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/lch60830-001en/
  - https://manuals.jvckenwood.com/download/files/PC027183199-1.pdf
  - "https://www.jvc.com/content/dam/jvc/usa/projectors/installers-calibrators/2024-D_ILA_External_command_(Ver1.0).pdf"
retrieved_at: 2026-05-21T19:45:25.160Z
last_checked_at: 2026-06-09T12:27:12.102Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T12:27:12.102Z
matched_actions: 319
action_count: 319
confidence: medium
summary: "All 319 spec actions matched verbatim to source hex codes; transport parameters (19200bps 8-N-1 serial) confirmed in source; command format matches source documentation; source command inventory comprehensively represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DLA-XC7890R not explicitly listed in source model list; compatibility inferred from D-ILA X-series generation shared protocol."
- "source does not describe settable discrete parameters beyond the action list above."
- "source describes no unsolicited event notifications from projector."
- "source does not describe multi-step macro sequences."
- "no safety warnings or interlock procedures beyond those listed above."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
