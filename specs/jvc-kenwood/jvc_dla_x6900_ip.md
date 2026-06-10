---
spec_id: admin/jvc_kenwood-dla_x6900
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-X6900 Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-X6900
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-X6900
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-4578-01/GOUMSYrlwiddkr.php
  - https://support.jvc.com/consumer/support/documents/2015model_JVC_External_Control_Command_spec_v1_0.pdf
retrieved_at: 2026-05-21T01:44:32.976Z
last_checked_at: 2026-06-09T11:59:21.599Z
generated_at: 2026-06-09T11:59:21.599Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DLA-X6900 not listed in source model list; closest match is DLA-X70R/X90R family. Port 20554 stated for LAN control."
  - "direct settable parameters not separately enumerated from actions in source."
  - "projector does not spontaneously emit events; all responses are"
  - "no explicit multi-step macro sequences described in source."
  - "DLA-X6900 not explicitly listed in source model list; mapped via entity_id but closest source match is DLA-X70R/X90R family."
  - "lamp hour counter not readable via commands in source."
  - "firmware version not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-09T11:59:21.599Z
  matched_actions: 163
  action_count: 163
  confidence: medium
  summary: "All 163 spec actions matched to hex codes in source; all transport parameters verified; coverage ratio 1.0 indicates complete representation of source command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# JVC KENWOOD DLA-X6900 Control Spec

## Summary
JVC KENWOOD DLA-X6900 home theater projector. Supports RS-232C, TCP/IP (LAN), and infrared remote control. Direct commands control power, inputs, test patterns, gamma, lamp power, and picture settings. Remote Control Emulation commands replicate the IR remote functionality over the serial/LAN interface. Query commands return power status, input status, gamma settings, source status, and model identification.

<!-- UNRESOLVED: DLA-X6900 not listed in source model list; closest match is DLA-X70R/X90R family. Port 20554 stated for LAN control.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 20554  # TCP port for LAN control
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source; LAN uses challenge-response handshake (PJREQ/PJACK)
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

- id: input_hdmi_1
  label: Input HDMI 1
  kind: action
  params: []
  hex: "2189 01 49 50 36 0A"

- id: input_hdmi_2
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
  note: "HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65 only"

- id: input_next
  label: Input + (Next Highest)
  kind: action
  params: []
  hex: "2189 01 49 50 2B 0A"

- id: input_prev
  label: Input - (Next Lowest)
  kind: action
  params: []
  hex: "2189 01 49 50 2D 0A"

- id: test_pattern_off
  label: Test Pattern Off
  kind: action
  params: []
  hex: "2189 01 54 53 30 0A"

- id: test_pattern_colour_bars
  label: Test Pattern Colour Bars
  kind: action
  params: []
  hex: "2189 01 54 53 31 0A"

- id: test_pattern_stairstep_bw
  label: Test Pattern Stairstep (Black and White)
  kind: action
  params: []
  hex: "2189 01 54 53 36 0A"

- id: test_pattern_stairstep_red
  label: Test Pattern Stairstep (Red)
  kind: action
  params: []
  hex: "2189 01 54 53 37 0A"

- id: test_pattern_stairstep_green
  label: Test Pattern Stairstep (Green)
  kind: action
  params: []
  hex: "2189 01 54 53 38 0A"

- id: test_pattern_stairstep_blue
  label: Test Pattern Stairstep (Blue)
  kind: action
  params: []
  hex: "2189 01 54 53 39 0A"

- id: test_pattern_crosshatch_green
  label: Test Pattern Crosshatch (Green)
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
  note: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65 only"

- id: gamma_custom_1
  label: Gamma Custom 1
  kind: action
  params: []
  hex: "2189 01 47 54 34 0A"

- id: gamma_custom_2
  label: Gamma Custom 2
  kind: action
  params: []
  hex: "2189 01 47 54 35 0A"

- id: gamma_custom_3
  label: Gamma Custom 3
  kind: action
  params: []
  hex: "2189 01 47 54 36 0A"

- id: gamma_value_1_8
  label: Gamma Correction Value 1.8
  kind: action
  params: []
  hex: "2189 01 47 50 30 0A"

- id: gamma_value_1_9
  label: Gamma Correction Value 1.9
  kind: action
  params: []
  hex: "2189 01 47 50 31 0A"

- id: gamma_value_2_0
  label: Gamma Correction Value 2.0
  kind: action
  params: []
  hex: "2189 01 47 50 32 0A"

- id: gamma_value_2_1
  label: Gamma Correction Value 2.1
  kind: action
  params: []
  hex: "2189 01 47 50 33 0A"

- id: gamma_value_2_2
  label: Gamma Correction Value 2.2 (Default)
  kind: action
  params: []
  hex: "2189 01 47 50 34 0A"

- id: gamma_value_2_3
  label: Gamma Correction Value 2.3
  kind: action
  params: []
  hex: "2189 01 47 50 35 0A"

- id: gamma_value_2_4
  label: Gamma Correction Value 2.4
  kind: action
  params: []
  hex: "2189 01 47 50 36 0A"

- id: gamma_value_2_5
  label: Gamma Correction Value 2.5
  kind: action
  params: []
  hex: "2189 01 47 50 37 0A"

- id: gamma_value_2_6
  label: Gamma Correction Value 2.6
  kind: action
  params: []
  hex: "2189 01 47 50 38 0A"

- id: off_timer_off
  label: Off Timer Off
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 30 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: off_timer_set_1h
  label: Off Timer Set 1 Hour
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 31 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: off_timer_set_2h
  label: Off Timer Set 2 Hours
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 32 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: off_timer_set_3h
  label: Off Timer Set 3 Hours
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 33 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: off_timer_set_4h
  label: Off Timer Set 4 Hours
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 34 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: lamp_power_normal
  label: Lamp Power Normal
  kind: action
  params: []
  hex: "2189 01 50 4D 4C 50 30 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: lamp_power_high
  label: Lamp Power High
  kind: action
  params: []
  hex: "2189 01 50 4D 4C 50 31 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: remote_code_a
  label: Remote Code A (hex 73)
  kind: action
  params: []
  hex: "2189 01 53 55 52 43 30 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: remote_code_b
  label: Remote Code B (hex 63)
  kind: action
  params: []
  hex: "2189 01 53 55 52 43 31 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: trigger_off
  label: Trigger Off
  kind: action
  params: []
  hex: "2189 01 46 55 54 52 30 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: trigger_on_power
  label: Trigger On (Power)
  kind: action
  params: []
  hex: "2189 01 46 55 54 52 31 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: trigger_on_anamorphic
  label: Trigger On (Anamorphic)
  kind: action
  params: []
  hex: "2189 01 46 55 54 52 32 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: cmd_off
  label: Clear Motion Drive Off
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 30 0A"

- id: cmd_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 31 0A"
  note: "Low - HD550/950/990"

- id: cmd_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 32 0A"
  note: "High - HD550/950/990"

- id: cmd_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 33 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: cmd_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 34 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  params: []
  hex: "2189 01 50 4D 43 4D 35 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

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

- id: picture_mode_film
  label: Picture Mode Film
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 30 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 31 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_animation
  label: Picture Mode Animation
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 32 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_natural
  label: Picture Mode Natural
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 33 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_stage
  label: Picture Mode Stage
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 34 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_thx
  label: Picture Mode THX
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 36 0A"
  note: "X70/X90/RS55/65 only"

- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 42 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_user1
  label: Picture Mode User 1
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 43 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_user2
  label: Picture Mode User 2
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 44 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_user3
  label: Picture Mode User 3
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 45 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_user4
  label: Picture Mode User 4
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 46 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_user5
  label: Picture Mode User 5
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 31 30 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: colour_profile_off
  label: Colour Profile Off
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 30 0A"

- id: colour_profile_film1
  label: Colour Profile Film 1 (in Film mode)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 31 0A"

- id: colour_profile_film2
  label: Colour Profile Film 2 (in Film mode)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 32 0A"

- id: colour_profile_standard
  label: Colour Profile Standard (in Cinema, Natural, Stage, 3D modes)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 33 0A"

- id: colour_profile_cinema1
  label: Colour Profile Cinema 1 (in Cinema mode)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 34 0A"

- id: colour_profile_cinema2
  label: Colour Profile Cinema 2 (in Cinema mode)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 35 0A"

- id: colour_profile_anime1
  label: Colour Profile Anime 1 (in Animation mode)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 36 0A"

- id: colour_profile_anime2
  label: Colour Profile Anime 2 (in Animation mode)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 37 0A"

- id: colour_profile_video
  label: Colour Profile Video (in Natural mode)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 38 0A"

- id: colour_profile_vivid
  label: Colour Profile Vivid (in Natural and 3D modes)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 39 0A"

- id: colour_profile_adobe
  label: Colour Profile Adobe (in Natural mode)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 41 0A"

- id: colour_profile_stage
  label: Colour Profile Stage (in Stage mode)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 42 0A"

- id: colour_profile_3d
  label: Colour Profile 3D (in 3D mode)
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 43 0A"

- id: colour_profile_thx
  label: Colour Profile THX (in THX mode)
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

- id: 2d_to_3d_conversion_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []
  hex: "2189 01 49 53 33 43 30 0A"

- id: 2d_to_3d_conversion_on
  label: 2D to 3D Conversion On
  kind: action
  params: []
  hex: "2189 01 49 53 33 43 31 0A"

- id: subtitle_correction_off
  label: 3D Subtitle Correction Off
  kind: action
  params: []
  hex: "2189 01 49 53 33 54 31 0A"

- id: subtitle_correction_on
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

- id: null_command
  label: Null Command (Test Communication)
  kind: action
  params: []
  hex: "2189 01 00 00 0A"
- id: rc_cursor
  label: RC Cursor Navigation
  kind: action
  params:
    - {name: direction, type: enum, values: [up, down, left, right]}
  hex:
    up: "21 89 01 52 43 37 33 30 31 0A"
    down: "21 89 01 52 43 37 33 30 32 0A"
    left: "21 89 01 52 43 37 33 33 36 0A"
    right: "21 89 01 52 43 37 33 33 34 0A"
- {id: rc_back, label: RC Back, kind: action, params: [], hex: "21 89 01 52 43 37 33 30 33 0A"}
- {id: rc_ok, label: RC OK, kind: action, params: [], hex: "21 89 01 52 43 37 33 32 46 0A"}
- {id: rc_menu, label: RC Menu Toggle, kind: action, params: [], hex: "21 89 01 52 43 37 33 32 45 0A"}
- {id: rc_information, label: RC Information, kind: action, params: [], hex: "21 89 01 52 43 37 33 37 34 0A"}
- {id: rc_picture_adjust, label: RC Picture Adjust, kind: action, params: [], hex: "21 89 01 52 43 37 33 37 32 0A", note: HD550/750/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65}
- {id: rc_advanced, label: RC Advanced Menu, kind: action, params: [], hex: "21 89 01 52 43 37 33 37 33 0A", note: HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65}
- id: rc_brightness
  label: RC Brightness
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 37 41 0A"
    decrease: "21 89 01 52 43 37 33 37 42 0A"
- {id: rc_brightness_adj, label: RC Brightness Adj Bar Toggle, kind: action, params: [], hex: "21 89 01 52 43 37 33 30 39 0A"}
- id: rc_contrast
  label: RC Contrast
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 37 38 0A"
    decrease: "21 89 01 52 43 37 33 37 39 0A"
- {id: rc_contrast_adj, label: RC Contrast Adj Bar Toggle, kind: action, params: [], hex: "21 89 01 52 43 37 33 30 41 0A"}
- id: rc_colour
  label: RC Colour
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 37 43 0A"
    decrease: "21 89 01 52 43 37 33 37 44 0A"
- {id: rc_colour_adj, label: RC Colour Adj Bar Toggle, kind: action, params: [], hex: "21 89 01 52 43 37 33 31 35 0A"}
- id: rc_tint
  label: RC Tint
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 39 38 0A"
    decrease: "21 89 01 52 43 37 33 39 39 0A"
  note: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65
- {id: rc_tint_adj, label: RC Tint Adj Bar Toggle, kind: action, params: [], hex: "21 89 01 52 43 37 33 31 36 0A"}
- id: rc_sharpness
  label: RC Sharpness
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 37 45 0A"
    decrease: "21 89 01 52 43 37 33 37 46 0A"
- {id: rc_sharpness_adj, label: RC Sharpness Adj Bar Toggle, kind: action, params: [], hex: "21 89 01 52 43 37 33 31 34 0A"}
- id: rc_detail_enhance
  label: RC Detail Enhance
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 31 31 0A"
    decrease: "21 89 01 52 43 37 33 31 32 0A"
- id: rc_bright_level
  label: RC Bright Level
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 41 32 0A"
    decrease: "21 89 01 52 43 37 33 41 33 0A"
  note: X7/X9/X70/X90/RS50/60/55/65
- id: rc_dark_level
  label: RC Dark Level
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 41 34 0A"
    decrease: "21 89 01 52 43 37 33 41 35 0A"
  note: X7/X9/X70/X90/RS50/60/55/65
- id: rc_picture_tone
  label: RC Picture Tone
  kind: action
  params:
    - {name: channel, type: enum, values: [red, green, blue, white]}
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    red.increase: "21 89 01 52 43 37 33 39 43 0A"
    red.decrease: "21 89 01 52 43 37 33 39 44 0A"
    green.increase: "21 89 01 52 43 37 33 39 45 0A"
    green.decrease: "21 89 01 52 43 37 33 39 46 0A"
    blue.increase: "21 89 01 52 43 37 33 41 30 0A"
    blue.decrease: "21 89 01 52 43 37 33 41 31 0A"
    white.increase: "21 89 01 52 43 37 33 39 41 0A"
    white.decrease: "21 89 01 52 43 37 33 39 42 0A"
  note: "X7/X9/RS50/60 Film Mode only; X70/X90/RS55/65 All Modes"
- id: rc_gamma_rc
  label: RC Gamma Select
  kind: action
  params:
    - {name: value, type: enum, values: [normal, A, B, C, D, custom_1, custom_2, custom_3, cycle]}
  hex:
    normal: "21 89 01 52 43 37 33 33 38 0A"
    A: "21 89 01 52 43 37 33 33 39 0A"
    B: "21 89 01 52 43 37 33 33 41 0A"
    C: "21 89 01 52 43 37 33 33 42 0A"
    D: "21 89 01 52 43 37 33 33 46 0A"
    custom_1: "21 89 01 52 43 37 33 33 43 0A"
    custom_2: "21 89 01 52 43 37 33 33 44 0A"
    custom_3: "21 89 01 52 43 37 33 33 45 0A"
    cycle: "21 89 01 52 43 37 33 37 35 0A"
- id: rc_colour_temp_rc
  label: RC Colour Temperature Select
  kind: action
  params:
    - {name: value, type: enum, values: [5800K, 6500K, 7500K, 9300K, custom_1, custom_2, custom_3, high_bright, cycle]}
  hex:
    5800K: "21 89 01 52 43 37 33 34 45 0A"
    6500K: "21 89 01 52 43 37 33 34 46 0A"
    7500K: "21 89 01 52 43 37 33 35 30 0A"
    9300K: "21 89 01 52 43 37 33 35 31 0A"
    custom_1: "21 89 01 52 43 37 33 35 33 0A"
    custom_2: "21 89 01 52 43 37 33 35 34 0A"
    custom_3: "21 89 01 52 43 37 33 35 35 0A"
    high_bright: "21 89 01 52 43 37 33 35 32 0A"
    cycle: "21 89 01 52 43 37 33 37 36 0A"
  note: "5800K/7500K/9300K/high_bright: HD350/550/750/950/990 series"
- id: rc_colour_temp_gain
  label: RC Colour Temperature Gain
  kind: action
  params:
    - {name: channel, type: enum, values: [red, green, blue]}
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    red.increase: "21 89 01 52 43 37 33 38 43 0A"
    red.decrease: "21 89 01 52 43 37 33 38 44 0A"
    green.increase: "21 89 01 52 43 37 33 38 45 0A"
    green.decrease: "21 89 01 52 43 37 33 38 46 0A"
    blue.increase: "21 89 01 52 43 37 33 39 30 0A"
    blue.decrease: "21 89 01 52 43 37 33 39 31 0A"
  note: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65
- id: rc_colour_temp_offset
  label: RC Colour Temperature Offset
  kind: action
  params:
    - {name: channel, type: enum, values: [red, green, blue]}
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    red.increase: "21 89 01 52 43 37 33 39 32 0A"
    red.decrease: "21 89 01 52 43 37 33 39 33 0A"
    green.increase: "21 89 01 52 43 37 33 39 34 0A"
    green.decrease: "21 89 01 52 43 37 33 39 35 0A"
    blue.increase: "21 89 01 52 43 37 33 39 36 0A"
    blue.decrease: "21 89 01 52 43 37 33 39 37 0A"
  note: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65
- id: rc_colour_management
  label: RC Colour Management
  kind: action
  params:
    - {name: mode, type: enum, values: [off, custom_1, custom_2, custom_3, cycle]}
  hex:
    off: "21 89 01 52 43 37 33 36 30 0A"
    custom_1: "21 89 01 52 43 37 33 36 31 0A"
    custom_2: "21 89 01 52 43 37 33 36 32 0A"
    custom_3: "21 89 01 52 43 37 33 36 33 0A"
    cycle: "21 89 01 52 43 37 33 38 39 0A"
  note: "individual: HD750/950/990/X7/X9/RS20/25/35/50/60/55/65; cycle: X7/X9/X70/X90/RS50/60/55/65"
- {id: rc_colour_profile_cycle, label: RC Colour Profile Cycle, kind: action, params: [], hex: "21 89 01 52 43 37 33 38 38 0A", note: "X7/X9/X70/X90/RS50/60/55/65"}
- {id: rc_colour_space_cycle, label: RC Colour Space Cycle, kind: action, params: [], hex: "21 89 01 52 43 37 33 43 44 0A", note: "X3/X30/RS40/45; cycles Standard/Wide 1/Wide 2"}
- id: rc_bnr
  label: RC Block Noise Reduction
  kind: action
  params:
    - {name: state, type: enum, values: [on, off]}
  hex:
    on: "21 89 01 52 43 37 33 30 46 0A"
    off: "21 89 01 52 43 37 33 31 30 0A"
- id: rc_rnr
  label: RC Random Noise Reduction
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 30 42 0A"
    decrease: "21 89 01 52 43 37 33 30 43 0A"
- id: rc_mnr
  label: RC Mosquito Noise Reduction
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 30 44 0A"
    decrease: "21 89 01 52 43 37 33 30 45 0A"
- {id: rc_nr_toggle, label: RC NR Display Toggle, kind: action, params: [], hex: "21 89 01 52 43 37 33 31 38 0A", note: "HD350/550/750/950/990/RS10/15/20/25/35"}
- id: rc_cti
  label: RC Colour Transient Improvement
  kind: action
  params:
    - {name: level, type: enum, values: [off, low, middle, high]}
  hex:
    off: "21 89 01 52 43 37 33 35 43 0A"
    low: "21 89 01 52 43 37 33 35 44 0A"
    middle: "21 89 01 52 43 37 33 35 45 0A"
    high: "21 89 01 52 43 37 33 35 46 0A"
  note: HD350/550/750/950/990/RS10/15/20/25/35
- id: rc_hide
  label: RC Hide
  kind: action
  params:
    - {name: state, type: enum, values: [on, off, toggle]}
  hex:
    on: "21 89 01 52 43 37 33 44 30 0A"
    off: "21 89 01 52 43 37 33 44 31 0A"
    toggle: "21 89 01 52 43 37 33 31 44 0A"
  note: "on/off: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"
- id: rc_shutter
  label: RC Shutter
  kind: action
  params:
    - {name: state, type: enum, values: [close, open, sync_on, sync_off]}
  hex:
    close: "21 89 01 52 43 37 33 31 39 0A"
    open: "21 89 01 52 43 37 33 31 41 0A"
    sync_on: "21 89 01 52 43 37 33 32 43 0A"
    sync_off: "21 89 01 52 43 37 33 32 44 0A"
  note: HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65
- id: rc_anamorphic_rc
  label: RC Anamorphic
  kind: action
  params:
    - {name: mode, type: enum, values: [off, A, B, cycle]}
  hex:
    off: "21 89 01 52 43 37 33 32 34 0A"
    A: "21 89 01 52 43 37 33 32 33 0A"
    B: "21 89 01 52 43 37 33 32 42 0A"
    cycle: "21 89 01 52 43 37 33 43 35 0A"
  note: "off/A also Vertical Stretch Off/On for HD350/750/950/990/RS10/20/25/35"
- id: rc_aspect_rc
  label: RC Aspect Ratio
  kind: action
  params:
    - {name: mode, type: enum, values: [16_9, 4_3, zoom, pc_auto, pc_full, pc_just, cycle]}
  hex:
    16_9: "21 89 01 52 43 37 33 32 36 0A"
    4_3: "21 89 01 52 43 37 33 32 35 0A"
    zoom: "21 89 01 52 43 37 33 32 37 0A"
    pc_auto: "21 89 01 52 43 37 33 41 45 0A"
    pc_full: "21 89 01 52 43 37 33 42 30 0A"
    pc_just: "21 89 01 52 43 37 33 41 46 0A"
    cycle: "21 89 01 52 43 37 33 37 37 0A"
  note: "pc_auto/full/just: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"
- id: rc_picture_mode_rc
  label: RC Picture Mode Select
  kind: action
  params:
    - {name: mode, type: enum, values: [cinema_1, cinema_2, cinema_3, natural, stage, dynamic, thx, 3d, user_1, user_2, user_3, user_4, user_5]}
  hex:
    cinema_1: "21 89 01 52 43 37 33 36 39 0A"
    cinema_2: "21 89 01 52 43 37 33 36 38 0A"
    cinema_3: "21 89 01 52 43 37 33 36 36 0A"
    natural: "21 89 01 52 43 37 33 36 41 0A"
    stage: "21 89 01 52 43 37 33 36 37 0A"
    dynamic: "21 89 01 52 43 37 33 36 42 0A"
    thx: "21 89 01 52 43 37 33 36 46 0A"
    3d: "21 89 01 52 43 37 33 38 37 0A"
    user_1: "21 89 01 52 43 37 33 36 43 0A"
    user_2: "21 89 01 52 43 37 33 36 44 0A"
    user_3: "21 89 01 52 43 37 33 36 45 0A"
    user_4: "21 89 01 52 43 37 33 43 41 0A"
    user_5: "21 89 01 52 43 37 33 43 42 0A"
  note: "dynamic: HD350/550/750/950/990; thx: HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65; user_4/5: X30/X70/X90/RS45/55/65"
- id: rc_cmd_rc
  label: RC Clear Motion Drive
  kind: action
  params:
    - {name: mode, type: enum, values: [off, mode_1, mode_2, mode_3, mode_4, inverse_telecine, cycle]}
  hex:
    off: "21 89 01 52 43 37 33 34 37 0A"
    mode_1: "21 89 01 52 43 37 33 43 45 0A"
    mode_2: "21 89 01 52 43 37 33 43 46 0A"
    mode_3: "21 89 01 52 43 37 33 34 38 0A"
    mode_4: "21 89 01 52 43 37 33 34 39 0A"
    inverse_telecine: "21 89 01 52 43 37 33 34 41 0A"
    cycle: "21 89 01 52 43 37 33 38 41 0A"
  note: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65
- id: rc_isf
  label: RC ISF Mode
  kind: action
  params:
    - {name: mode, type: enum, values: [day, night, on, off]}
  hex:
    day: "21 89 01 52 43 37 33 36 34 0A"
    night: "21 89 01 52 43 37 33 36 35 0A"
    on: "21 89 01 52 43 37 33 35 42 0A"
    off: "21 89 01 52 43 37 33 35 41 0A"
  note: "day/night: X7/X9/X70/X90/RS50/60/55/65; on/off: HD950/990/X7/X9/X70/X90/RS25/35/50/60/55/65"
- id: rc_thx_rc
  label: RC THX Mode
  kind: action
  params:
    - {name: mode, type: enum, values: [bright, dark, on, off]}
  hex:
    bright: "21 89 01 52 43 37 33 38 35 0A"
    dark: "21 89 01 52 43 37 33 38 36 0A"
    on: "21 89 01 52 43 37 33 43 38 0A"
    off: "21 89 01 52 43 37 33 43 37 0A"
  note: X7/X9/X70/X90/RS50/60/55/65
- id: rc_screen_adjust
  label: RC Screen Adjust
  kind: action
  params:
    - {name: mode, type: enum, values: [off, A, B, C]}
  hex:
    off: "21 89 01 52 43 37 33 38 30 0A"
    A: "21 89 01 52 43 37 33 38 31 0A"
    B: "21 89 01 52 43 37 33 38 32 0A"
    C: "21 89 01 52 43 37 33 38 33 0A"
  note: X3/X30/RS40/45
- id: rc_cec
  label: RC CEC
  kind: action
  params:
    - {name: state, type: enum, values: [on, off]}
  hex:
    on: "21 89 01 52 43 37 33 35 36 0A"
    off: "21 89 01 52 43 37 33 35 37 0A"
- id: rc_input_rc
  label: RC Input Select
  kind: action
  params:
    - {name: input, type: enum, values: [hdmi_1, hdmi_2, component, s_video, video, pc, cycle]}
  hex:
    hdmi_1: "21 89 01 52 43 37 33 37 30 0A"
    hdmi_2: "21 89 01 52 43 37 33 37 31 0A"
    component: "21 89 01 52 43 37 33 34 44 0A"
    s_video: "21 89 01 52 43 37 33 34 43 0A"
    video: "21 89 01 52 43 37 33 34 42 0A"
    pc: "21 89 01 52 43 37 33 34 36 0A"
    cycle: "21 89 01 52 43 37 33 30 38 0A"
  note: "s_video/video: HD350/550/750/950/990; pc: HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65"
- id: rc_lens_focus
  label: RC Lens Focus
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 33 31 0A"
    decrease: "21 89 01 52 43 37 33 33 32 0A"
- id: rc_lens_zoom
  label: RC Lens Zoom
  kind: action
  params:
    - {name: direction, type: enum, values: [in, out]}
  hex:
    in: "21 89 01 52 43 37 33 33 35 0A"
    out: "21 89 01 52 43 37 33 33 37 0A"
- id: rc_lens_shift
  label: RC Lens Shift
  kind: action
  params:
    - {name: direction, type: enum, values: [up, down, left, right]}
  hex:
    up: "21 89 01 52 43 37 33 32 31 0A"
    down: "21 89 01 52 43 37 33 32 32 0A"
    left: "21 89 01 52 43 37 33 34 34 0A"
    right: "21 89 01 52 43 37 33 34 33 0A"
- id: rc_lens_aperture
  label: RC Lens Aperture
  kind: action
  params:
    - {name: value, type: enum, values: ["1", "2", "3", increase, decrease, adj_toggle]}
  hex:
    "1": "21 89 01 52 43 37 33 32 38 0A"
    "2": "21 89 01 52 43 37 33 32 39 0A"
    "3": "21 89 01 52 43 37 33 32 41 0A"
    increase: "21 89 01 52 43 37 33 31 45 0A"
    decrease: "21 89 01 52 43 37 33 31 46 0A"
    adj_toggle: "21 89 01 52 43 37 33 32 30 0A"
  note: "1/2/3: HD350/HD550; increase/decrease: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"
- {id: rc_lens_control_cycle, label: RC Lens Control Cycle, kind: action, params: [], hex: "21 89 01 52 43 37 33 33 30 0A"}
- id: rc_lens_memory_rc
  label: RC Lens Memory Select
  kind: action
  params:
    - {name: position, type: enum, values: ["1", "2", "3", cycle]}
  hex:
    "1": "21 89 01 52 43 37 33 44 38 0A"
    "2": "21 89 01 52 43 37 33 44 39 0A"
    "3": "21 89 01 52 43 37 33 44 41 0A"
    cycle: "21 89 01 52 43 37 33 44 34 0A"
  note: X30/X70/X90/RS45/55/65
- id: rc_keystone
  label: RC Keystone Correction
  kind: action
  params:
    - {name: axis, type: enum, values: [horizontal, vertical]}
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    horizontal.increase: "21 89 01 52 43 37 33 34 30 0A"
    horizontal.decrease: "21 89 01 52 43 37 33 34 31 0A"
    vertical.increase: "21 89 01 52 43 37 33 31 42 0A"
    vertical.decrease: "21 89 01 52 43 37 33 31 43 0A"
- id: rc_mask_edge
  label: RC Mask Edge
  kind: action
  params:
    - {name: edge, type: enum, values: [top, bottom, left, right]}
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    top.increase: "21 89 01 52 43 37 33 42 35 0A"
    top.decrease: "21 89 01 52 43 37 33 42 36 0A"
    bottom.increase: "21 89 01 52 43 37 33 42 37 0A"
    bottom.decrease: "21 89 01 52 43 37 33 42 38 0A"
    left.increase: "21 89 01 52 43 37 33 42 31 0A"
    left.decrease: "21 89 01 52 43 37 33 42 32 0A"
    right.increase: "21 89 01 52 43 37 33 42 33 0A"
    right.decrease: "21 89 01 52 43 37 33 42 34 0A"
  note: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65
- id: rc_pixel_shift
  label: RC Pixel Shift
  kind: action
  params:
    - {name: axis, type: enum, values: [horizontal, vertical]}
    - {name: channel, type: enum, values: [red, green, blue]}
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    horizontal.red.increase: "21 89 01 52 43 37 33 42 39 0A"
    horizontal.red.decrease: "21 89 01 52 43 37 33 42 41 0A"
    horizontal.green.increase: "21 89 01 52 43 37 33 42 42 0A"
    horizontal.green.decrease: "21 89 01 52 43 37 33 42 43 0A"
    horizontal.blue.increase: "21 89 01 52 43 37 33 42 44 0A"
    horizontal.blue.decrease: "21 89 01 52 43 37 33 42 45 0A"
    vertical.red.increase: "21 89 01 52 43 37 33 42 46 0A"
    vertical.red.decrease: "21 89 01 52 43 37 33 43 30 0A"
    vertical.green.increase: "21 89 01 52 43 37 33 43 31 0A"
    vertical.green.decrease: "21 89 01 52 43 37 33 43 32 0A"
    vertical.blue.increase: "21 89 01 52 43 37 33 43 33 0A"
    vertical.blue.decrease: "21 89 01 52 43 37 33 43 34 0A"
  note: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65
- id: rc_h_position
  label: RC Horizontal Position
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 41 41 0A"
    decrease: "21 89 01 52 43 37 33 41 42 0A"
  note: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65
- id: rc_v_position
  label: RC Vertical Position
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 41 43 0A"
    decrease: "21 89 01 52 43 37 33 41 44 0A"
  note: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65
- id: rc_tracking
  label: RC Tracking (PC Input)
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 41 36 0A"
    decrease: "21 89 01 52 43 37 33 41 37 0A"
  note: X7/X9/X70/X90/RS50/60/55/65
- id: rc_phase
  label: RC Phase (PC Input)
  kind: action
  params:
    - {name: direction, type: enum, values: [increase, decrease]}
  hex:
    increase: "21 89 01 52 43 37 33 41 38 0A"
    decrease: "21 89 01 52 43 37 33 41 39 0A"
  note: X7/X9/X70/X90/RS50/60/55/65
- {id: rc_menu_position, label: RC Menu Position, kind: action, params: [], hex: "21 89 01 52 43 37 33 34 32 0A", note: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"}
- {id: rc_auto_align, label: RC Auto Align, kind: action, params: [], hex: "21 89 01 52 43 37 33 31 33 0A", note: "PC input; HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65"}
- {id: rc_auto_lens_centre, label: RC Auto Lens Centre, kind: action, params: [], hex: "21 89 01 52 43 37 33 43 39 0A", note: "X3/X7/X9/X70/X90/RS50/60/45/55/65"}
- {id: rc_3d_setting_menu, label: RC 3D Setting Menu, kind: action, params: [], hex: "21 89 01 52 43 37 33 44 35 0A", note: X30/X70/X90/RS45/55/65}
- {id: rc_3d_format_cycle, label: RC 3D Format Cycle, kind: action, params: [], hex: "21 89 01 52 43 37 33 44 36 0A", note: X30/X70/X90/RS45/55/65}
- {id: rc_user_pm_cycle, label: RC User Picture Mode Cycle, kind: action, params: [], hex: "21 89 01 52 43 37 33 44 37 0A", note: "X30/X70/X90/RS45/55/65; cycles User 1-5"}
- {id: rc_test_pattern_cycle, label: RC Test Pattern Cycle, kind: action, params: [], hex: "21 89 01 52 43 37 33 35 39 0A", note: HD350/550/750/950/990/RS10/15/20/25/35}
- {id: rc_power_on, label: RC Power On, kind: action, params: [], hex: "21 89 01 52 43 37 33 30 35 0A"}
- {id: rc_power_off, label: RC Power Off, kind: action, params: [], hex: "21 89 01 52 43 37 33 30 36 0A", note: Send twice with short delay between to switch off}
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - "30"  # Standby
    - "31"  # Power On
    - "32"  # Cooling
    - "34"  # Emergency
  enquiry_hex: "3F 89 01 50 57 0A"
  response_pattern: "06 89 01 50 57 0A 40 89 01 50 57 RR 0A"

- id: input_status
  label: Input Status
  type: enum
  values:
    - "30"  # S-Video
    - "31"  # Video
    - "32"  # Component
    - "33"  # PC (HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65)
    - "36"  # HDMI 1
    - "37"  # HDMI 2
  enquiry_hex: "3F 89 01 49 50 0A"
  response_pattern: "06 89 01 49 50 0A 40 89 01 49 50 RR 0A"

- id: gamma_table_status
  label: Gamma Table Status
  type: enum
  values:
    - "30"  # Gamma Normal
    - "31"  # Gamma A
    - "32"  # Gamma B
    - "33"  # Gamma C
    - "34"  # Gamma Custom 1
    - "35"  # Gamma Custom 2
    - "36"  # Gamma Custom 3
  enquiry_hex: "3F 89 01 47 54 0A"
  response_pattern: "06 89 01 47 54 0A 40 89 01 47 54 RR 0A"

- id: gamma_value_status
  label: Gamma Value Status
  type: enum
  values:
    - "30"  # Gamma Correction Value 1.8
    - "31"  # Gamma Correction Value 1.9
    - "32"  # Gamma Correction Value 2.0
    - "33"  # Gamma Correction Value 2.1
    - "34"  # Gamma Correction Value 2.2
    - "35"  # Gamma Correction Value 2.3
    - "36"  # Gamma Correction Value 2.4
    - "37"  # Gamma Correction Value 2.5
    - "38"  # Gamma Correction Value 2.6
  enquiry_hex: "3F 89 01 47 50 0A"
  response_pattern: "06 89 01 47 50 0A 40 89 01 47 50 RR 0A"

- id: source_status
  label: Source Status
  type: enum
  values:
    - "00"  # JVC Logo displayed
    - "30"  # No signal or signal out of range
    - "31"  # Signal input correctly
  enquiry_hex: "3F 89 01 53 43 0A"
  response_pattern: "06 89 01 53 43 0A 40 89 01 53 43 RR 0A"

- id: model_status
  label: Model Status
  type: enum
  values:
    - "494C4146504A202D2D20583438"  # DLA-HD350
    - "494C4146504A202D2D20583437"  # DLA-RS10
    - "494C4146504A202D2D20583435"  # DLA-HD750 and DLA-RS20
    - "494C4146504A202D2D20583438"  # DLA-HD550
    - "494C4146504A202D2D20584834"  # DLA-RS15
    - "494C4146504A202D2D20584839"  # DLA-HD950/HD990/DLA-RS25/RS35
    - "494C4146504A202D2D20584832"  # DLA-X3 and DLA-RS40
    - "494C4146504A202D2D20584833"  # DLA-X7/X9 and DLA-RS50/60
    - "494C4146504A202D2D20584835"  # DLA-X30 and DLA-RS45
    - "494C4146504A202D2D20584836"  # DLA-X70R/X90R and DLA-RS55/65
  enquiry_hex: "3F 89 01 4D 44 0A"
  response_pattern: "06 89 01 4D 44 0A 40 89 01 4D 44 RR 0A"

- id: basic_ack
  label: Basic Acknowledgement
  type: string
  pattern: "06 89 01 CC CC 0A"
  note: "Returns first 2 bytes of command received (excluding header 21 89 01). Confirms command was received."

- id: lan_connection_ack
  label: LAN Connection Acknowledgement
  type: string
  note: "Projector responds with PJ_OK on TCP connection, then PJACK after PJREQ from controller"
```

## Variables
```yaml
# UNRESOLVED: direct settable parameters not separately enumerated from actions in source.
# All picture adjustment parameters (brightness, contrast, colour, tint, sharpness,
# detail enhance, etc.) are exposed as Remote Control Emulation commands only.
```

## Events
```yaml
# UNRESOLVED: projector does not spontaneously emit events; all responses are
# acknowledgement-based (poll-only architecture).
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # Source notes: send twice with short delay between to switch off
interlocks: []
```

## Notes
Command protocol: bidirectional hexadecimal. Fixed header `21` for commands from controller, `3F` for enquiry requests, `06` for basic acknowledgement from projector, `40` for detailed response from projector. Fixed unit ID `89 01` for all models. Fixed end byte `0A` for all commands. Commands are 7 or 10 bytes. Responses are 6-14 bytes.

LAN handshake sequence: TCP connection → projector sends `PJ_OK` → controller sends `PJREQ` → projector sends `PJACK` → controller sends command within 5 seconds → projector responds and closes connection after 5 seconds.

Projector ignores unrecognized commands (wrong Unit ID, parity error, invalid command) and inappropriate commands (e.g., Power On while cooling). Projector discards commands if data break ≥50ms. Controller must wait for acknowledgement before sending next command.

DHCP off by default. Default IP: 192.168.0.2. Default subnet: 255.255.255.0. Default gateway: 192.168.0.254.

RS-232C: 9-pin D-Sub male. Rx=Pin 2, Tx=Pin 3, Ground=Pin 5. 19200 bps, 8N1, no flow control. Requires cross-connected (null-modem) cable.

Infrared remote uses hex code 73 (Device 115) by default, or hex code 63 (Device 99) for Code B. To send IR command, format is `73 [ASCII hex of RC command]`.

Power Off command should be sent twice with short delay.

<!-- UNRESOLVED: DLA-X6900 not explicitly listed in source model list; mapped via entity_id but closest source match is DLA-X70R/X90R family. -->

<!-- UNRESOLVED: lamp hour counter not readable via commands in source. -->

<!-- UNRESOLVED: firmware version not stated in source. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-4578-01/GOUMSYrlwiddkr.php
  - https://support.jvc.com/consumer/support/documents/2015model_JVC_External_Control_Command_spec_v1_0.pdf
retrieved_at: 2026-05-21T01:44:32.976Z
last_checked_at: 2026-06-09T11:59:21.599Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T11:59:21.599Z
matched_actions: 163
action_count: 163
confidence: medium
summary: "All 163 spec actions matched to hex codes in source; all transport parameters verified; coverage ratio 1.0 indicates complete representation of source command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DLA-X6900 not listed in source model list; closest match is DLA-X70R/X90R family. Port 20554 stated for LAN control."
- "direct settable parameters not separately enumerated from actions in source."
- "projector does not spontaneously emit events; all responses are"
- "no explicit multi-step macro sequences described in source."
- "DLA-X6900 not explicitly listed in source model list; mapped via entity_id but closest source match is DLA-X70R/X90R family."
- "lamp hour counter not readable via commands in source."
- "firmware version not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
