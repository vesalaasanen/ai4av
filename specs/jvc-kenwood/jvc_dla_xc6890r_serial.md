---
spec_id: admin/jvc_kenwood-dla_xc6890r
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-XC6890R Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-XC6890R
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-XC6890R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - manuals.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/lch60830-001en/
  - https://manuals.jvckenwood.com/download/files/PC027183199-1.pdf
retrieved_at: 2026-05-21T02:19:39.831Z
last_checked_at: 2026-06-09T12:49:18.145Z
generated_at: 2026-06-09T12:49:18.145Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DLA-XC6890R not in model list — closest match DLA-X90R, inferred from model name pattern"
  - "DLA-XC6890R not listed in source model compatibility list — closest is DLA-X90R"
  - "firmware version not stated in source"
  - "LAN port 20554 stated for X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65 — confirmed for this model family"
verification:
  verdict: verified
  checked_at: 2026-06-09T12:49:18.145Z
  matched_actions: 303
  action_count: 303
  confidence: medium
  summary: "All 303 spec actions matched literally to source; all transport parameters verified in documentation; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# JVC KENWOOD DLA-XC6890R Control Spec

## Summary
JVC KENWOOD DLA-XC6890R projector. Supports RS-232C serial and TCP/IP LAN control. Direct commands control power, input switching, test patterns, gamma, lamp power, and more. Remote control emulation commands expose full menu navigation. Note: DLA-XC6890R not explicitly listed in source; mapped from DLA-X90R family. <!-- UNRESOLVED: DLA-XC6890R not in model list — closest match DLA-X90R, inferred from model name pattern -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 20554
auth:
  type: none
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

- id: input_video
  label: Input Video
  kind: action
  params: []
  hex: "2189 01 49 50 31 0A"

- id: input_svideo
  label: Input S-Video
  kind: action
  params: []
  hex: "2189 01 49 50 30 0A"

- id: input_pc
  label: Input PC
  kind: action
  params: []
  hex: "2189 01 49 50 33 0A"

- id: input_next
  label: Input Next
  kind: action
  params: []
  hex: "2189 01 49 50 2B 0A"

- id: input_prev
  label: Input Previous
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
  label: Test Pattern Stairstep B/W
  kind: action
  params: []
  hex: "2189 01 54 53 36 0A"

- id: testpattern_stairstep_red
  label: Test Pattern Stairstep Red
  kind: action
  params: []
  hex: "2189 01 54 53 37 0A"

- id: testpattern_stairstep_green
  label: Test Pattern Stairstep Green
  kind: action
  params: []
  hex: "2189 01 54 53 38 0A"

- id: testpattern_stairstep_blue
  label: Test Pattern Stairstep Blue
  kind: action
  params: []
  hex: "2189 01 54 53 39 0A"

- id: testpattern_crosshatch
  label: Test Pattern Crosshatch Green
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

- id: gamma_value_1_8
  label: Gamma Value 1.8
  kind: action
  params: []
  hex: "2189 01 47 50 30 0A"

- id: gamma_value_1_9
  label: Gamma Value 1.9
  kind: action
  params: []
  hex: "2189 01 47 50 31 0A"

- id: gamma_value_2_0
  label: Gamma Value 2.0
  kind: action
  params: []
  hex: "2189 01 47 50 32 0A"

- id: gamma_value_2_1
  label: Gamma Value 2.1
  kind: action
  params: []
  hex: "2189 01 47 50 33 0A"

- id: gamma_value_2_2
  label: Gamma Value 2.2
  kind: action
  params: []
  hex: "2189 01 47 50 34 0A"

- id: gamma_value_2_3
  label: Gamma Value 2.3
  kind: action
  params: []
  hex: "2189 01 47 50 35 0A"

- id: gamma_value_2_4
  label: Gamma Value 2.4
  kind: action
  params: []
  hex: "2189 01 47 50 36 0A"

- id: gamma_value_2_5
  label: Gamma Value 2.5
  kind: action
  params: []
  hex: "2189 01 47 50 37 0A"

- id: gamma_value_2_6
  label: Gamma Value 2.6
  kind: action
  params: []
  hex: "2189 01 47 50 38 0A"

- id: off_timer_off
  label: Off Timer Off
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 30 0A"

- id: off_timer_1h
  label: Off Timer 1 Hour
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 31 0A"

- id: off_timer_2h
  label: Off Timer 2 Hours
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 32 0A"

- id: off_timer_3h
  label: Off Timer 3 Hours
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 33 0A"

- id: off_timer_4h
  label: Off Timer 4 Hours
  kind: action
  params: []
  hex: "2189 01 46 55 4F 54 34 0A"

- id: lamp_power_normal
  label: Lamp Power Normal
  kind: action
  params: []
  hex: "2189 01 50 4D 4C 50 30 0A"

- id: lamp_power_high
  label: Lamp Power High
  kind: action
  params: []
  hex: "2189 01 50 4D 4C 50 31 0A"

- id: remote_code_a
  label: Infrared Remote Code A
  kind: action
  params: []
  hex: "2189 01 53 55 52 43 30 0A"

- id: remote_code_b
  label: Infrared Remote Code B
  kind: action
  params: []
  hex: "2189 01 53 55 52 43 31 0A"

- id: trigger_off
  label: Trigger Off
  kind: action
  params: []
  hex: "2189 01 46 55 54 52 30 0A"

- id: trigger_power
  label: Trigger On Power
  kind: action
  params: []
  hex: "2189 01 46 55 54 52 31 0A"

- id: trigger_anamorphic
  label: Trigger On Anamorphic
  kind: action
  params: []
  hex: "2189 01 46 55 54 52 32 0A"

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

- id: clear_motion_drive_inv_telecine
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

- id: picture_mode_film
  label: Picture Mode Film
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 30 0A"

- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 31 0A"

- id: picture_mode_animation
  label: Picture Mode Animation
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 32 0A"

- id: picture_mode_natural
  label: Picture Mode Natural
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 33 0A"

- id: picture_mode_stage
  label: Picture Mode Stage
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 34 0A"

- id: picture_mode_thx
  label: Picture Mode THX
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 36 0A"

- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 42 0A"

- id: picture_mode_user1
  label: Picture Mode User 1
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 43 0A"

- id: picture_mode_user2
  label: Picture Mode User 2
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 44 0A"

- id: picture_mode_user3
  label: Picture Mode User 3
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 45 0A"

- id: picture_mode_user4
  label: Picture Mode User 4
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 30 46 0A"

- id: picture_mode_user5
  label: Picture Mode User 5
  kind: action
  params: []
  hex: "2189 01 50 4D 50 4D 31 30 0A"

- id: colour_profile_off
  label: Colour Profile Off
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 30 0A"

- id: colour_profile_film1
  label: Colour Profile Film 1
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 31 0A"

- id: colour_profile_film2
  label: Colour Profile Film 2
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 32 0A"

- id: colour_profile_standard
  label: Colour Profile Standard
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 33 0A"

- id: colour_profile_cinema1
  label: Colour Profile Cinema 1
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 34 0A"

- id: colour_profile_cinema2
  label: Colour Profile Cinema 2
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 35 0A"

- id: colour_profile_anime1
  label: Colour Profile Anime 1
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 36 0A"

- id: colour_profile_anime2
  label: Colour Profile Anime 2
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 37 0A"

- id: colour_profile_video
  label: Colour Profile Video
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 38 0A"

- id: colour_profile_vivid
  label: Colour Profile Vivid
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 39 0A"

- id: colour_profile_adobe
  label: Colour Profile Adobe
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 41 0A"

- id: colour_profile_stage
  label: Colour Profile Stage
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 42 0A"

- id: colour_profile_3d
  label: Colour Profile 3D
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 43 0A"

- id: colour_profile_thx
  label: Colour Profile THX
  kind: action
  params: []
  hex: "2189 01 50 4D 50 52 30 44 0A"

- id: format_3d_off
  label: 3D Format Off
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 30 0A"

- id: format_3d_auto
  label: 3D Format Auto
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 31 0A"

- id: format_3d_framepacking
  label: 3D Format Frame Packing
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 32 0A"

- id: format_3d_sidebyside
  label: 3D Format Side by Side
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 33 0A"

- id: format_3d_topbottom
  label: 3D Format Top and Bottom
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 34 0A"

- id: convert_2dto3d_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []
  hex: "2189 01 49 53 33 43 30 0A"

- id: convert_2dto3d_on
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

- id: lens_memory_save1
  label: Lens Memory Save 1
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 53 30 0A"

- id: lens_memory_save2
  label: Lens Memory Save 2
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 53 31 0A"

- id: lens_memory_save3
  label: Lens Memory Save 3
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 53 32 0A"

- id: lens_memory_select1
  label: Lens Memory Select 1
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 4C 30 0A"

- id: lens_memory_select2
  label: Lens Memory Select 2
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 4C 31 0A"

- id: lens_memory_select3
  label: Lens Memory Select 3
  kind: action
  params: []
  hex: "2189 01 49 4E 4D 4C 32 0A"

- id: null_command
  label: Null Command (Test)
  kind: action
  params: []
  hex: "2189 01 00 00 0A"
- id: rc_power_on
  label: Remote Control Power On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 35 0A"

- id: rc_power_off
  label: Remote Control Power Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 36 0A"

- id: rc_cursor_up
  label: Remote Control Cursor Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 31 0A"

- id: rc_cursor_down
  label: Remote Control Cursor Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 32 0A"

- id: rc_cursor_left
  label: Remote Control Cursor Left
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 36 0A"

- id: rc_cursor_right
  label: Remote Control Cursor Right
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 34 0A"

- id: rc_ok
  label: Remote Control OK
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 46 0A"

- id: rc_back
  label: Remote Control Back
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 33 0A"

- id: rc_menu
  label: Remote Control Menu Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 45 0A"

- id: rc_menu_position
  label: Remote Control Menu Position
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 32 0A"

- id: rc_information
  label: Remote Control Information
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 34 0A"

- id: rc_advanced
  label: Remote Control Advanced
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 33 0A"

- id: rc_picture_adjust
  label: Remote Control Picture Adjust
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 32 0A"

- id: rc_hide_on
  label: Remote Control Hide On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 30 0A"

- id: rc_hide_off
  label: Remote Control Hide Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 31 0A"

- id: rc_hide_toggle
  label: Remote Control Hide Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 44 0A"

- id: rc_input_hdmi1
  label: Remote Control Input HDMI 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 30 0A"

- id: rc_input_hdmi2
  label: Remote Control Input HDMI 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 31 0A"

- id: rc_input_component
  label: Remote Control Input Component
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 44 0A"

- id: rc_input_svideo
  label: Remote Control Input S-Video
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 43 0A"

- id: rc_input_video
  label: Remote Control Input Video
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 42 0A"

- id: rc_input_pc
  label: Remote Control Input PC
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 36 0A"

- id: rc_input_cycle
  label: Remote Control Input Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 38 0A"

- id: rc_brightness_up
  label: Remote Control Brightness Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 41 0A"

- id: rc_brightness_down
  label: Remote Control Brightness Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 42 0A"

- id: rc_brightness_adj
  label: Remote Control Brightness Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 39 0A"

- id: rc_contrast_up
  label: Remote Control Contrast Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 38 0A"

- id: rc_contrast_down
  label: Remote Control Contrast Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 39 0A"

- id: rc_contrast_adj
  label: Remote Control Contrast Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 41 0A"

- id: rc_colour_up
  label: Remote Control Colour Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 43 0A"

- id: rc_colour_down
  label: Remote Control Colour Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 44 0A"

- id: rc_colour_adj
  label: Remote Control Colour Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 35 0A"

- id: rc_sharpness_up
  label: Remote Control Sharpness Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 45 0A"

- id: rc_sharpness_down
  label: Remote Control Sharpness Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 46 0A"

- id: rc_sharpness_adj
  label: Remote Control Sharpness Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 34 0A"

- id: rc_tint_up
  label: Remote Control Tint Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 38 0A"

- id: rc_tint_down
  label: Remote Control Tint Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 39 0A"

- id: rc_tint_adj
  label: Remote Control Tint Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 36 0A"

- id: rc_detail_enhance_up
  label: Remote Control Detail Enhance Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 31 0A"

- id: rc_detail_enhance_down
  label: Remote Control Detail Enhance Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 32 0A"

- id: rc_rnr_up
  label: Remote Control RNR Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 42 0A"

- id: rc_rnr_down
  label: Remote Control RNR Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 43 0A"

- id: rc_mnr_up
  label: Remote Control MNR Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 44 0A"

- id: rc_mnr_down
  label: Remote Control MNR Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 45 0A"

- id: rc_nr_toggle
  label: Remote Control NR Display Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 38 0A"

- id: rc_bnr_on
  label: Remote Control BNR On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 46 0A"

- id: rc_bnr_off
  label: Remote Control BNR Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 30 0A"

- id: rc_cti_off
  label: Remote Control CTI Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 43 0A"

- id: rc_cti_low
  label: Remote Control CTI Low
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 44 0A"

- id: rc_cti_middle
  label: Remote Control CTI Middle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 45 0A"

- id: rc_cti_high
  label: Remote Control CTI High
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 46 0A"

- id: rc_picture_mode_cinema1
  label: Remote Control Picture Mode Cinema 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 39 0A"

- id: rc_picture_mode_cinema2
  label: Remote Control Picture Mode Cinema 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 38 0A"

- id: rc_picture_mode_cinema3
  label: Remote Control Picture Mode Cinema 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 36 0A"

- id: rc_picture_mode_natural
  label: Remote Control Picture Mode Natural
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 41 0A"

- id: rc_picture_mode_stage
  label: Remote Control Picture Mode Stage
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 37 0A"

- id: rc_picture_mode_thx
  label: Remote Control Picture Mode THX
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 46 0A"

- id: rc_picture_mode_3d
  label: Remote Control Picture Mode 3D
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 37 0A"

- id: rc_picture_mode_dynamic
  label: Remote Control Picture Mode Dynamic
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 42 0A"

- id: rc_picture_mode_user1
  label: Remote Control Picture Mode User 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 43 0A"

- id: rc_picture_mode_user2
  label: Remote Control Picture Mode User 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 44 0A"

- id: rc_picture_mode_user3
  label: Remote Control Picture Mode User 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 45 0A"

- id: rc_picture_mode_user4
  label: Remote Control Picture Mode User 4
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 41 0A"

- id: rc_picture_mode_user5
  label: Remote Control Picture Mode User 5
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 42 0A"

- id: rc_gamma_normal
  label: Remote Control Gamma Normal
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 38 0A"

- id: rc_gamma_a
  label: Remote Control Gamma A
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 39 0A"

- id: rc_gamma_b
  label: Remote Control Gamma B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 41 0A"

- id: rc_gamma_c
  label: Remote Control Gamma C
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 42 0A"

- id: rc_gamma_d
  label: Remote Control Gamma D
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 46 0A"

- id: rc_gamma_custom1
  label: Remote Control Gamma Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 43 0A"

- id: rc_gamma_custom2
  label: Remote Control Gamma Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 44 0A"

- id: rc_gamma_custom3
  label: Remote Control Gamma Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 45 0A"

- id: rc_gamma_cycle
  label: Remote Control Gamma Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 35 0A"

- id: rc_colour_profile_cycle
  label: Remote Control Colour Profile Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 38 0A"

- id: rc_colour_space_cycle
  label: Remote Control Colour Space Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 44 0A"

- id: rc_colour_management_off
  label: Remote Control Colour Management Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 30 0A"

- id: rc_colour_management_custom1
  label: Remote Control Colour Management Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 31 0A"

- id: rc_colour_management_custom2
  label: Remote Control Colour Management Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 32 0A"

- id: rc_colour_management_custom3
  label: Remote Control Colour Management Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 33 0A"

- id: rc_colour_management_cycle
  label: Remote Control Colour Management Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 39 0A"

- id: rc_colour_temp_5800k
  label: Remote Control Colour Temp 5800K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 45 0A"

- id: rc_colour_temp_6500k
  label: Remote Control Colour Temp 6500K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 46 0A"

- id: rc_colour_temp_7500k
  label: Remote Control Colour Temp 7500K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 30 0A"

- id: rc_colour_temp_9300k
  label: Remote Control Colour Temp 9300K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 31 0A"

- id: rc_colour_temp_high_bright
  label: Remote Control Colour Temp High Bright
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 32 0A"

- id: rc_colour_temp_custom1
  label: Remote Control Colour Temp Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 33 0A"

- id: rc_colour_temp_custom2
  label: Remote Control Colour Temp Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 34 0A"

- id: rc_colour_temp_custom3
  label: Remote Control Colour Temp Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 35 0A"

- id: rc_colour_temp_cycle
  label: Remote Control Colour Temp Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 36 0A"

- id: rc_colour_temp_gain_red_up
  label: Remote Control Colour Temp Gain Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 43 0A"

- id: rc_colour_temp_gain_red_down
  label: Remote Control Colour Temp Gain Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 44 0A"

- id: rc_colour_temp_gain_green_up
  label: Remote Control Colour Temp Gain Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 45 0A"

- id: rc_colour_temp_gain_green_down
  label: Remote Control Colour Temp Gain Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 46 0A"

- id: rc_colour_temp_gain_blue_up
  label: Remote Control Colour Temp Gain Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 30 0A"

- id: rc_colour_temp_gain_blue_down
  label: Remote Control Colour Temp Gain Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 31 0A"

- id: rc_colour_temp_offset_red_up
  label: Remote Control Colour Temp Offset Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 32 0A"

- id: rc_colour_temp_offset_red_down
  label: Remote Control Colour Temp Offset Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 33 0A"

- id: rc_colour_temp_offset_green_up
  label: Remote Control Colour Temp Offset Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 34 0A"

- id: rc_colour_temp_offset_green_down
  label: Remote Control Colour Temp Offset Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 35 0A"

- id: rc_colour_temp_offset_blue_up
  label: Remote Control Colour Temp Offset Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 36 0A"

- id: rc_colour_temp_offset_blue_down
  label: Remote Control Colour Temp Offset Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 37 0A"

- id: rc_picture_tone_white_up
  label: Remote Control Picture Tone White Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 41 0A"

- id: rc_picture_tone_white_down
  label: Remote Control Picture Tone White Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 42 0A"

- id: rc_picture_tone_red_up
  label: Remote Control Picture Tone Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 43 0A"

- id: rc_picture_tone_red_down
  label: Remote Control Picture Tone Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 44 0A"

- id: rc_picture_tone_green_up
  label: Remote Control Picture Tone Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 45 0A"

- id: rc_picture_tone_green_down
  label: Remote Control Picture Tone Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 46 0A"

- id: rc_picture_tone_blue_up
  label: Remote Control Picture Tone Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 30 0A"

- id: rc_picture_tone_blue_down
  label: Remote Control Picture Tone Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 31 0A"

- id: rc_bright_level_up
  label: Remote Control Bright Level Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 32 0A"

- id: rc_bright_level_down
  label: Remote Control Bright Level Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 33 0A"

- id: rc_dark_level_up
  label: Remote Control Dark Level Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 34 0A"

- id: rc_dark_level_down
  label: Remote Control Dark Level Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 35 0A"

- id: rc_isf_off
  label: Remote Control ISF Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 41 0A"

- id: rc_isf_on
  label: Remote Control ISF On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 42 0A"

- id: rc_isf_day
  label: Remote Control ISF Day
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 34 0A"

- id: rc_isf_night
  label: Remote Control ISF Night
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 35 0A"

- id: rc_cec_on
  label: Remote Control CEC On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 36 0A"

- id: rc_cec_off
  label: Remote Control CEC Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 37 0A"

- id: rc_thx_on
  label: Remote Control THX On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 38 0A"

- id: rc_thx_off
  label: Remote Control THX Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 37 0A"

- id: rc_thx_bright
  label: Remote Control THX Bright
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 35 0A"

- id: rc_thx_dark
  label: Remote Control THX Dark
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 36 0A"

- id: rc_aspect_169
  label: Remote Control Aspect 16:9
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 36 0A"

- id: rc_aspect_43
  label: Remote Control Aspect 4:3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 35 0A"

- id: rc_aspect_zoom
  label: Remote Control Aspect Zoom
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 37 0A"

- id: rc_aspect_pc_auto
  label: Remote Control Aspect PC Auto
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 45 0A"

- id: rc_aspect_pc_just
  label: Remote Control Aspect PC Just
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 46 0A"

- id: rc_aspect_pc_full
  label: Remote Control Aspect PC Full
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 30 0A"

- id: rc_aspect_cycle
  label: Remote Control Aspect Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 37 0A"

- id: rc_anamorphic_off
  label: Remote Control Anamorphic Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 34 0A"

- id: rc_anamorphic_a
  label: Remote Control Anamorphic A
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 33 0A"

- id: rc_anamorphic_b
  label: Remote Control Anamorphic B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 42 0A"

- id: rc_anamorphic_cycle
  label: Remote Control Anamorphic Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 35 0A"

- id: rc_cmd_off
  label: Remote Control Clear Motion Drive Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 37 0A"

- id: rc_cmd_mode1
  label: Remote Control Clear Motion Drive Mode 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 45 0A"

- id: rc_cmd_mode2
  label: Remote Control Clear Motion Drive Mode 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 46 0A"

- id: rc_cmd_mode3
  label: Remote Control Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 38 0A"

- id: rc_cmd_mode4
  label: Remote Control Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 39 0A"

- id: rc_cmd_inv_telecine
  label: Remote Control Clear Motion Drive Inverse Telecine
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 41 0A"

- id: rc_cmd_cycle
  label: Remote Control Clear Motion Drive Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 41 0A"

- id: rc_3d_setting
  label: Remote Control 3D Setting
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 35 0A"

- id: rc_3d_format_cycle
  label: Remote Control 3D Format Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 36 0A"

- id: rc_screen_adjust_off
  label: Remote Control Screen Adjust Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 30 0A"

- id: rc_screen_adjust_a
  label: Remote Control Screen Adjust A
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 31 0A"

- id: rc_screen_adjust_b
  label: Remote Control Screen Adjust B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 32 0A"

- id: rc_screen_adjust_c
  label: Remote Control Screen Adjust C
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 33 0A"

- id: rc_shutter_close
  label: Remote Control Shutter Close
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 39 0A"

- id: rc_shutter_open
  label: Remote Control Shutter Open
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 41 0A"

- id: rc_shutter_sync_on
  label: Remote Control Shutter Sync On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 43 0A"

- id: rc_shutter_sync_off
  label: Remote Control Shutter Sync Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 44 0A"

- id: rc_test_pattern_cycle
  label: Remote Control Test Pattern Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 39 0A"

- id: rc_auto_align
  label: Remote Control Auto Align
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 33 0A"

- id: rc_auto_lens_centre
  label: Remote Control Auto Lens Centre
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 39 0A"

- id: rc_lens_focus_up
  label: Remote Control Lens Focus Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 31 0A"

- id: rc_lens_focus_down
  label: Remote Control Lens Focus Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 32 0A"

- id: rc_lens_zoom_in
  label: Remote Control Lens Zoom In
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 35 0A"

- id: rc_lens_zoom_out
  label: Remote Control Lens Zoom Out
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 37 0A"

- id: rc_lens_shift_up
  label: Remote Control Lens Shift Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 31 0A"

- id: rc_lens_shift_down
  label: Remote Control Lens Shift Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 32 0A"

- id: rc_lens_shift_left
  label: Remote Control Lens Shift Left
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 34 0A"

- id: rc_lens_shift_right
  label: Remote Control Lens Shift Right
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 33 0A"

- id: rc_lens_aperture_1
  label: Remote Control Lens Aperture 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 38 0A"

- id: rc_lens_aperture_2
  label: Remote Control Lens Aperture 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 39 0A"

- id: rc_lens_aperture_3
  label: Remote Control Lens Aperture 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 41 0A"

- id: rc_lens_aperture_up
  label: Remote Control Lens Aperture Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 45 0A"

- id: rc_lens_aperture_down
  label: Remote Control Lens Aperture Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 46 0A"

- id: rc_lens_aperture_adj
  label: Remote Control Lens Aperture Adjustment
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 30 0A"

- id: rc_lens_control_cycle
  label: Remote Control Lens Control Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 30 0A"

- id: rc_lens_memory_1
  label: Remote Control Lens Memory 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 38 0A"

- id: rc_lens_memory_2
  label: Remote Control Lens Memory 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 39 0A"

- id: rc_lens_memory_3
  label: Remote Control Lens Memory 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 41 0A"

- id: rc_lens_memory_cycle
  label: Remote Control Lens Memory Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 34 0A"

- id: rc_keystone_h_up
  label: Remote Control Keystone Horizontal Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 30 0A"

- id: rc_keystone_h_down
  label: Remote Control Keystone Horizontal Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 31 0A"

- id: rc_keystone_v_up
  label: Remote Control Keystone Vertical Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 42 0A"

- id: rc_keystone_v_down
  label: Remote Control Keystone Vertical Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 43 0A"

- id: rc_mask_left_up
  label: Remote Control Mask Left Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 31 0A"

- id: rc_mask_left_down
  label: Remote Control Mask Left Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 32 0A"

- id: rc_mask_right_up
  label: Remote Control Mask Right Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 33 0A"

- id: rc_mask_right_down
  label: Remote Control Mask Right Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 34 0A"

- id: rc_mask_top_up
  label: Remote Control Mask Top Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 35 0A"

- id: rc_mask_top_down
  label: Remote Control Mask Top Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 36 0A"

- id: rc_mask_bottom_up
  label: Remote Control Mask Bottom Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 37 0A"

- id: rc_mask_bottom_down
  label: Remote Control Mask Bottom Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 38 0A"

- id: rc_pixel_shift_h_red_up
  label: Remote Control Pixel Shift Horizontal Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 39 0A"

- id: rc_pixel_shift_h_red_down
  label: Remote Control Pixel Shift Horizontal Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 41 0A"

- id: rc_pixel_shift_h_green_up
  label: Remote Control Pixel Shift Horizontal Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 42 0A"

- id: rc_pixel_shift_h_green_down
  label: Remote Control Pixel Shift Horizontal Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 43 0A"

- id: rc_pixel_shift_h_blue_up
  label: Remote Control Pixel Shift Horizontal Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 44 0A"

- id: rc_pixel_shift_h_blue_down
  label: Remote Control Pixel Shift Horizontal Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 45 0A"

- id: rc_pixel_shift_v_red_up
  label: Remote Control Pixel Shift Vertical Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 46 0A"

- id: rc_pixel_shift_v_red_down
  label: Remote Control Pixel Shift Vertical Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 30 0A"

- id: rc_pixel_shift_v_green_up
  label: Remote Control Pixel Shift Vertical Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 31 0A"

- id: rc_pixel_shift_v_green_down
  label: Remote Control Pixel Shift Vertical Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 32 0A"

- id: rc_pixel_shift_v_blue_up
  label: Remote Control Pixel Shift Vertical Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 33 0A"

- id: rc_pixel_shift_v_blue_down
  label: Remote Control Pixel Shift Vertical Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 34 0A"

- id: rc_horizontal_position_up
  label: Remote Control Horizontal Position Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 41 0A"

- id: rc_horizontal_position_down
  label: Remote Control Horizontal Position Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 42 0A"

- id: rc_vertical_position_up
  label: Remote Control Vertical Position Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 43 0A"

- id: rc_vertical_position_down
  label: Remote Control Vertical Position Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 44 0A"

- id: rc_phase_up
  label: Remote Control Phase Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 38 0A"

- id: rc_phase_down
  label: Remote Control Phase Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 39 0A"

- id: rc_tracking_up
  label: Remote Control Tracking Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 36 0A"

- id: rc_tracking_down
  label: Remote Control Tracking Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 37 0A"

- id: rc_user_cycle
  label: Remote Control User Mode Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 37 0A"
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values:
    - "30"
    - "31"
    - "32"
    - "34"
  labels:
    "30": Standby
    "31": Power On
    "32": Cooling
    "34": Emergency
  enquiry_hex: "3F 89 01 50 57 0A"
  response_hex: "06 89 01 50 57 0A 40 89 01 50 57 RR 0A"

- id: input_status
  type: enum
  values:
    - "30"
    - "31"
    - "32"
    - "33"
    - "36"
    - "37"
  labels:
    "30": S-Video
    "31": Video
    "32": Component
    "33": PC
    "36": HDMI 1
    "37": HDMI 2
  enquiry_hex: "3F 89 01 49 50 0A"
  response_hex: "06 89 01 49 50 0A 40 89 01 49 50 RR 0A"

- id: gamma_table_status
  type: enum
  values:
    - "30"
    - "31"
    - "32"
    - "33"
    - "34"
    - "35"
    - "36"
  labels:
    "30": Gamma Normal
    "31": Gamma A
    "32": Gamma B
    "33": Gamma C
    "34": Gamma Custom 1
    "35": Gamma Custom 2
    "36": Gamma Custom 3
  enquiry_hex: "3F 89 01 47 54 0A"
  response_hex: "06 89 01 47 54 0A 40 89 01 47 54 RR 0A"

- id: gamma_value_status
  type: enum
  values:
    - "30"
    - "31"
    - "32"
    - "33"
    - "34"
    - "35"
    - "36"
    - "37"
    - "38"
  labels:
    "30": "1.8"
    "31": "1.9"
    "32": "2.0"
    "33": "2.1"
    "34": "2.2"
    "35": "2.3"
    "36": "2.4"
    "37": "2.5"
    "38": "2.6"
  enquiry_hex: "3F 89 01 47 50 0A"
  response_hex: "06 89 01 47 50 0A 40 89 01 47 50 RR 0A"

- id: source_status
  type: enum
  values:
    - "00"
    - "30"
    - "31"
  labels:
    "00": JVC Logo displayed
    "30": No signal or signal out of range
    "31": Signal input correctly
  enquiry_hex: "3F 89 01 53 43 0A"
  response_hex: "06 89 01 53 43 0A 40 89 01 53 43 RR 0A"

- id: model_status
  type: string
  enquiry_hex: "3F 89 01 4D 44 0A"
  response_hex: "06 89 01 4D 44 0A 40 89 01 4D 44 RR 0A"
```

## Variables
```yaml
# All direct command parameters are settable via action hex codes.
# No separate variable namespace identified in source.
```

## Events
```yaml
# Projector sends unsolicited acknowledgement responses on command completion.
# No event subscription mechanism described in source.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Power Off command must be sent twice with short delay between to switch off
  - Projector will ignore commands if cooling mode active
  - Projector discards commands after 50ms break in incoming data stream
  - Controller must wait for acknowledgement before sending next command
```

## Notes
- Command format: [Header 1 byte][Unit ID 2 bytes fixed 89 01][Command 2 bytes][Data variable][End fixed 0A]
- Header values: 21=Operating Command, 3F=Enquiry, 06=Basic ACK, 40=Detailed Response
- LAN uses TCP port 20554 with PJ_OK/PJREQ/PJACK handshake sequence before each command
- Infrared remote uses hex code 73 (Code A) or 63 (Code B) prefix followed by ASCII command byte
- Power Off requires sending the command twice with short delay
- Projector closes LAN connection 5 seconds after command completion
<!-- UNRESOLVED: DLA-XC6890R not listed in source model compatibility list — closest is DLA-X90R -->
<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: LAN port 20554 stated for X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65 — confirmed for this model family -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - manuals.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/lch60830-001en/
  - https://manuals.jvckenwood.com/download/files/PC027183199-1.pdf
retrieved_at: 2026-05-21T02:19:39.831Z
last_checked_at: 2026-06-09T12:49:18.145Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T12:49:18.145Z
matched_actions: 303
action_count: 303
confidence: medium
summary: "All 303 spec actions matched literally to source; all transport parameters verified in documentation; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DLA-XC6890R not in model list — closest match DLA-X90R, inferred from model name pattern"
- "DLA-XC6890R not listed in source model compatibility list — closest is DLA-X90R"
- "firmware version not stated in source"
- "LAN port 20554 stated for X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65 — confirmed for this model family"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
