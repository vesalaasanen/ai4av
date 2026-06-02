---
spec_id: admin/jvc-dila-rs232-lan
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC D-ILA Projector Control Spec"
manufacturer: JVC
model_family: DLA-HD350
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - DLA-HD350
    - DLA-HD750
    - DLA-HD550
    - DLA-HD950
    - DLA-HD990
    - DLA-X3
    - DLA-X7
    - DLA-X9
    - DLA-X30
    - DLA-X70R
    - DLA-X90R
    - DLA-RS10
    - DLA-RS20
    - DLA-RS15
    - DLA-RS25
    - DLA-RS35
    - DLA-RS40
    - DLA-RS50
    - DLA-RS60
    - DLA-RS45
    - DLA-RS55
    - DLA-RS65
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:49.866Z
last_checked_at: 2026-06-02T17:26:31.894Z
generated_at: 2026-06-02T17:26:31.894Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command timing specifications beyond 50ms break detection not stated. UNRESOLVED:firmware version compatibility not stated."
  - "continuous adjustment parameters (brightness, contrast, colour,"
  - "projector sends unsolicited events only via acknowledgement"
  - "no multi-step macro sequences documented in source."
  - "power-on sequencing, lamp replacement warnings not stated in source."
  - "LAN default IP address (192.168.0.2), subnet mask, gateway — network settings stated but not as command parameters. UNRESOLVED: DHCP On/Off default not stated explicitly. UNRESOLVED: command timeout beyond 5 seconds not characterized."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:26:31.894Z
  matched_actions: 313
  action_count: 313
  confidence: medium
  summary: "All 313 spec operating commands have exact hex matches in source; source contains exactly 313 unique operating commands and 6 enquiry commands all covered by Feedbacks; transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# JVC D-ILA Projector Control Spec

## Summary
JVC D-ILA home theater projector family supporting RS-232C and TCP/IP (LAN) control. Direct commands control power, input selection, test patterns, gamma, lamp power, and other settings. Remote Control Emulation commands emulate the IR remote for full menu navigation and adjustment. Query commands return power state, input status, gamma settings, source status, and model identification.

<!-- UNRESOLVED: command timing specifications beyond 50ms break detection not stated. UNRESOLVED:firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 20554  # inferred from LAN control section
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
- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "21 89 01 50 57 31 0A"

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "21 89 01 50 57 30 0A"
  note: "Send twice with short delay between to switch off"

- id: input_hdmi_1
  label: Input HDMI 1
  kind: action
  params: []
  hex: "21 89 01 49 50 36 0A"

- id: input_hdmi_2
  label: Input HDMI 2
  kind: action
  params: []
  hex: "21 89 01 49 50 37 0A"

- id: input_component
  label: Input Component
  kind: action
  params: []
  hex: "21 89 01 49 50 32 0A"

- id: input_svideo
  label: Input S-Video
  kind: action
  params: []
  hex: "21 89 01 49 50 30 0A"

- id: input_video
  label: Input Video
  kind: action
  params: []
  hex: "21 89 01 49 50 31 0A"

- id: input_pc
  label: Input PC
  kind: action
  params: []
  hex: "21 89 01 49 50 33 0A"
  note: "HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65"

- id: input_next
  label: Input Next
  kind: action
  params: []
  hex: "21 89 01 49 50 2B 0A"
  note: "Go to next highest input"

- id: input_prev
  label: Input Previous
  kind: action
  params: []
  hex: "21 89 01 49 50 2D 0A"
  note: "Go to next lowest input"

- id: test_pattern_off
  label: Test Pattern Off
  kind: action
  params: []
  hex: "21 89 01 54 53 30 0A"
  note: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: test_pattern_colour_bars
  label: Test Pattern Colour Bars
  kind: action
  params: []
  hex: "21 89 01 54 53 31 0A"

- id: test_pattern_stairstep_bw
  label: Test Pattern Stairstep Black/White
  kind: action
  params: []
  hex: "21 89 01 54 53 36 0A"

- id: test_pattern_stairstep_red
  label: Test Pattern Stairstep Red
  kind: action
  params: []
  hex: "21 89 01 54 53 37 0A"

- id: test_pattern_stairstep_green
  label: Test Pattern Stairstep Green
  kind: action
  params: []
  hex: "21 89 01 54 53 38 0A"

- id: test_pattern_stairstep_blue
  label: Test Pattern Stairstep Blue
  kind: action
  params: []
  hex: "21 89 01 54 53 39 0A"

- id: test_pattern_crosshatch_green
  label: Test Pattern Crosshatch Green
  kind: action
  params: []
  hex: "21 89 01 54 53 41 0A"

- id: gamma_normal
  label: Gamma Normal
  kind: action
  params: []
  hex: "21 89 01 47 54 30 0A"

- id: gamma_a
  label: Gamma A
  kind: action
  params: []
  hex: "21 89 01 47 54 31 0A"

- id: gamma_b
  label: Gamma B
  kind: action
  params: []
  hex: "21 89 01 47 54 32 0A"

- id: gamma_c
  label: Gamma C
  kind: action
  params: []
  hex: "21 89 01 47 54 33 0A"

- id: gamma_d
  label: Gamma D
  kind: action
  params: []
  hex: "21 89 01 47 54 37 0A"
  note: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: gamma_custom_1
  label: Gamma Custom 1
  kind: action
  params: []
  hex: "21 89 01 47 54 34 0A"

- id: gamma_custom_2
  label: Gamma Custom 2
  kind: action
  params: []
  hex: "21 89 01 47 54 35 0A"

- id: gamma_custom_3
  label: Gamma Custom 3
  kind: action
  params: []
  hex: "21 89 01 47 54 36 0A"

- id: gamma_value_1_8
  label: Gamma Correction Value 1.8
  kind: action
  params: []
  hex: "21 89 01 47 50 30 0A"

- id: gamma_value_1_9
  label: Gamma Correction Value 1.9
  kind: action
  params: []
  hex: "21 89 01 47 50 31 0A"

- id: gamma_value_2_0
  label: Gamma Correction Value 2.0
  kind: action
  params: []
  hex: "21 89 01 47 50 32 0A"

- id: gamma_value_2_1
  label: Gamma Correction Value 2.1
  kind: action
  params: []
  hex: "21 89 01 47 50 33 0A"

- id: gamma_value_2_2
  label: Gamma Correction Value 2.2 (Default)
  kind: action
  params: []
  hex: "21 89 01 47 50 34 0A"

- id: gamma_value_2_3
  label: Gamma Correction Value 2.3
  kind: action
  params: []
  hex: "21 89 01 47 50 35 0A"

- id: gamma_value_2_4
  label: Gamma Correction Value 2.4
  kind: action
  params: []
  hex: "21 89 01 47 50 36 0A"

- id: gamma_value_2_5
  label: Gamma Correction Value 2.5
  kind: action
  params: []
  hex: "21 89 01 47 50 37 0A"

- id: gamma_value_2_6
  label: Gamma Correction Value 2.6
  kind: action
  params: []
  hex: "21 89 01 47 50 38 0A"

- id: off_timer_off
  label: Off Timer Off
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 30 0A"

- id: off_timer_1hr
  label: Off Timer Set 1 Hour
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 31 0A"

- id: off_timer_2hr
  label: Off Timer Set 2 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 32 0A"

- id: off_timer_3hr
  label: Off Timer Set 3 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 33 0A"

- id: off_timer_4hr
  label: Off Timer Set 4 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 34 0A"

- id: lamp_power_normal
  label: Lamp Power Normal
  kind: action
  params: []
  hex: "21 89 01 50 4D 4C 50 30 0A"

- id: lamp_power_high
  label: Lamp Power High
  kind: action
  params: []
  hex: "21 89 01 50 4D 4C 50 31 0A"

- id: remote_code_a
  label: Remote Code A (hex 73)
  kind: action
  params: []
  hex: "21 89 01 53 55 52 43 30 0A"

- id: remote_code_b
  label: Remote Code B (hex 63)
  kind: action
  params: []
  hex: "21 89 01 53 55 52 43 31 0A"

- id: trigger_off
  label: Trigger Off
  kind: action
  params: []
  hex: "21 89 01 46 55 54 52 30 0A"

- id: trigger_on_power
  label: Trigger On (Power)
  kind: action
  params: []
  hex: "21 89 01 46 55 54 52 31 0A"

- id: trigger_on_anamorphic
  label: Trigger On (Anamorphic)
  kind: action
  params: []
  hex: "21 89 01 46 55 54 52 32 0A"

- id: clear_motion_drive_off
  label: Clear Motion Drive Off
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 30 0A"

- id: clear_motion_drive_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 31 0A"

- id: clear_motion_drive_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 32 0A"

- id: clear_motion_drive_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 33 0A"

- id: clear_motion_drive_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 34 0A"

- id: clear_motion_drive_inv_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 35 0A"

- id: anamorphic_off
  label: Anamorphic Off
  kind: action
  params: []
  hex: "21 89 01 49 4E 56 53 30 0A"

- id: anamorphic_a
  label: Anamorphic A
  kind: action
  params: []
  hex: "21 89 01 49 4E 56 53 31 0A"

- id: anamorphic_b
  label: Anamorphic B
  kind: action
  params: []
  hex: "21 89 01 49 4E 56 53 32 0A"

- id: picture_mode_film
  label: Picture Mode Film
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 30 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 31 0A"

- id: picture_mode_animation
  label: Picture Mode Animation
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 32 0A"

- id: picture_mode_natural
  label: Picture Mode Natural
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 33 0A"

- id: picture_mode_stage
  label: Picture Mode Stage
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 34 0A"

- id: picture_mode_thx
  label: Picture Mode THX
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 36 0A"
  note: "X70/X90/RS55/65"

- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 42 0A"

- id: picture_mode_user1
  label: Picture Mode User 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 43 0A"

- id: picture_mode_user2
  label: Picture Mode User 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 44 0A"

- id: picture_mode_user3
  label: Picture Mode User 3
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 45 0A"

- id: picture_mode_user4
  label: Picture Mode User 4
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 46 0A"

- id: picture_mode_user5
  label: Picture Mode User 5
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 31 30 0A"

- id: colour_profile_off
  label: Colour Profile Off
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 30 0A"

- id: colour_profile_film1
  label: Colour Profile Film 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 31 0A"

- id: colour_profile_film2
  label: Colour Profile Film 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 32 0A"

- id: colour_profile_standard
  label: Colour Profile Standard
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 33 0A"

- id: colour_profile_cinema1
  label: Colour Profile Cinema 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 34 0A"

- id: colour_profile_cinema2
  label: Colour Profile Cinema 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 35 0A"

- id: colour_profile_anime1
  label: Colour Profile Anime 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 36 0A"

- id: colour_profile_anime2
  label: Colour Profile Anime 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 37 0A"

- id: colour_profile_video
  label: Colour Profile Video
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 38 0A"

- id: colour_profile_vivid
  label: Colour Profile Vivid
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 39 0A"

- id: colour_profile_adobe
  label: Colour Profile Adobe
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 41 0A"

- id: colour_profile_stage
  label: Colour Profile Stage
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 42 0A"

- id: colour_profile_3d
  label: Colour Profile 3D
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 43 0A"

- id: colour_profile_thx
  label: Colour Profile THX
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 44 0A"

- id: format_3d_off
  label: 3D Format Off (2D)
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 30 0A"

- id: format_3d_auto
  label: 3D Format Auto
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 31 0A"

- id: format_3d_frame_packing
  label: 3D Format Frame Packing
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 32 0A"

- id: format_3d_side_by_side
  label: 3D Format Side by Side
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 33 0A"

- id: format_3d_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 34 0A"

- id: convert_2d_to_3d_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []
  hex: "21 89 01 49 53 33 43 30 0A"

- id: convert_2d_to_3d_on
  label: 2D to 3D Conversion On
  kind: action
  params: []
  hex: "21 89 01 49 53 33 43 31 0A"

- id: subtitle_correction_off
  label: 3D Subtitle Correction Off
  kind: action
  params: []
  hex: "21 89 01 49 53 33 54 31 0A"

- id: subtitle_correction_on
  label: 3D Subtitle Correction On
  kind: action
  params: []
  hex: "21 89 01 49 53 33 54 30 0A"

- id: lens_memory_save_1
  label: Lens Memory Save Memory 1
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 53 30 0A"

- id: lens_memory_save_2
  label: Lens Memory Save Memory 2
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 53 31 0A"

- id: lens_memory_save_3
  label: Lens Memory Save Memory 3
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 53 32 0A"

- id: lens_memory_select_1
  label: Lens Memory Select Memory 1
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 4C 30 0A"

- id: lens_memory_select_2
  label: Lens Memory Select Memory 2
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 4C 31 0A"

- id: lens_memory_select_3
  label: Lens Memory Select Memory 3
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 4C 32 0A"

- id: null_command
  label: Null Command (Test Communication)
  kind: action
  params: []
  hex: "21 89 01 00 00 0A"
- id: rc_3d_setting
  label: RC 3D Setting (Direct Access)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 35 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: rc_3d_format_cycle
  label: RC 3D Format Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 36 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: rc_advanced_picture
  label: RC Advanced (Picture Adjust > Advanced)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 33 0A"
  note: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_anamorphic_off
  label: RC Anamorphic Off / Vertical Stretch Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 34 0A"
  note: "Anamorphic Off (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65); Vertical Stretch Off (HD350/750/950/990/RS10/20/25/35)"

- id: rc_anamorphic_a
  label: RC Anamorphic A / Vertical Stretch On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 33 0A"
  note: "Anamorphic A (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65); Vertical Stretch On (HD350/750/950/990/RS10/20/25/35)"

- id: rc_anamorphic_b
  label: RC Anamorphic B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 42 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_anamorphic_cycle
  label: RC Anamorphic Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 35 0A"
  note: "Cycles through Off/A/B (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"

- id: rc_aspect_16_9
  label: RC Aspect 16:9
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 36 0A"

- id: rc_aspect_4_3
  label: RC Aspect 4:3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 35 0A"

- id: rc_aspect_zoom
  label: RC Aspect Zoom
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 37 0A"

- id: rc_aspect_pc_auto
  label: RC Aspect PC Auto
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 45 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_aspect_pc_full
  label: RC Aspect PC Full
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 30 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_aspect_pc_just
  label: RC Aspect PC Just
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 46 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_aspect_cycle
  label: RC Aspect Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 37 0A"
  note: "Cycles through all available modes"

- id: rc_auto_align
  label: RC Auto Align
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 33 0A"
  note: "PC input on HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65"

- id: rc_auto_lens_centre
  label: RC Auto Lens Centre
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 39 0A"
  note: "X3/X7/X9/X70/X90/RS50/60/45/55/65"

- id: rc_back
  label: RC Back
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 33 0A"
  note: "Steps backwards through menus and removes OSD messages"

- id: rc_bnr_off
  label: RC BNR Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 30 0A"

- id: rc_bnr_on
  label: RC BNR On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 46 0A"

- id: rc_bright_level_down
  label: RC Bright Level Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 33 0A"
  note: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_bright_level_up
  label: RC Bright Level Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 32 0A"
  note: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_brightness_down
  label: RC Brightness Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 42 0A"

- id: rc_brightness_up
  label: RC Brightness Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 41 0A"

- id: rc_brightness_adj
  label: RC Brightness Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 39 0A"

- id: rc_cec_off
  label: RC CEC Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 37 0A"

- id: rc_cec_on
  label: RC CEC On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 36 0A"

- id: rc_cmd_cycle
  label: RC Clear Motion Drive Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 41 0A"
  note: "Cycles Off/Mode 1/Mode 2/Mode 3/Mode 4/Inverse Telecine (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"

- id: rc_cmd_off
  label: RC Clear Motion Drive Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 37 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_cmd_mode1
  label: RC Clear Motion Drive Mode 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 45 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_cmd_mode2
  label: RC Clear Motion Drive Mode 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 46 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_cmd_mode3
  label: RC Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 38 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_cmd_mode4
  label: RC Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 39 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_cmd_inv_telecine
  label: RC Clear Motion Drive Inverse Telecine
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 41 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_down
  label: RC Colour Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 44 0A"

- id: rc_colour_up
  label: RC Colour Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 43 0A"

- id: rc_colour_adj
  label: RC Colour Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 35 0A"

- id: rc_colour_mgmt_off
  label: RC Colour Management Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 30 0A"
  note: "HD750/950/990/X7/X9/RS20/25/35/50/60/55/65"

- id: rc_colour_mgmt_custom1
  label: RC Colour Management Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 31 0A"
  note: "HD750/950/990/X7/X9/RS20/25/35/50/60/55/65"

- id: rc_colour_mgmt_custom2
  label: RC Colour Management Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 32 0A"
  note: "HD750/950/990/X7/X9/RS20/25/35/50/60/55/65"

- id: rc_colour_mgmt_custom3
  label: RC Colour Management Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 33 0A"
  note: "HD750/950/990/X7/X9/RS20/25/35/50/60/55/65"

- id: rc_colour_mgmt_cycle
  label: RC Colour Management Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 39 0A"
  note: "Cycles Off/Custom 1/Custom 2/Custom 3 (X7/X9/X70/X90/RS50/60/55/65)"

- id: rc_colour_profile_cycle
  label: RC Colour Profile Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 38 0A"
  note: "X7/X9/X79/X90/RS50/60/55/65"

- id: rc_colour_space_cycle
  label: RC Colour Space Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 44 0A"
  note: "Cycles Standard/Wide 1/Wide 2 (X3/X30/RS40/RS45)"

- id: rc_colour_temp_5800k
  label: RC Colour Temp 5800K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 45 0A"
  note: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_colour_temp_6500k
  label: RC Colour Temp 6500K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 46 0A"

- id: rc_colour_temp_7500k
  label: RC Colour Temp 7500K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 30 0A"
  note: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_colour_temp_9300k
  label: RC Colour Temp 9300K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 31 0A"
  note: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_colour_temp_custom1
  label: RC Colour Temp Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 33 0A"

- id: rc_colour_temp_custom2
  label: RC Colour Temp Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 34 0A"

- id: rc_colour_temp_custom3
  label: RC Colour Temp Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 35 0A"

- id: rc_colour_temp_high_bright
  label: RC Colour Temp High Bright
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 32 0A"
  note: "HD350/550/750/950/990/X3/X30/RS10/15/20/25/35/40/45"

- id: rc_colour_temp_cycle
  label: RC Colour Temp Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 36 0A"
  note: "Cycles through all options"

- id: rc_colour_temp_gain_blue_down
  label: RC Colour Temperature Gain Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 31 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_gain_blue_up
  label: RC Colour Temperature Gain Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 30 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_gain_green_down
  label: RC Colour Temperature Gain Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 46 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_gain_green_up
  label: RC Colour Temperature Gain Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 45 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_gain_red_down
  label: RC Colour Temperature Gain Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 44 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_gain_red_up
  label: RC Colour Temperature Gain Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 43 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_offset_blue_down
  label: RC Colour Temperature Offset Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 37 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_offset_blue_up
  label: RC Colour Temperature Offset Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 36 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_offset_green_down
  label: RC Colour Temperature Offset Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 35 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_offset_green_up
  label: RC Colour Temperature Offset Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 34 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_offset_red_down
  label: RC Colour Temperature Offset Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 33 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_temp_offset_red_up
  label: RC Colour Temperature Offset Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 32 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_contrast_down
  label: RC Contrast Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 39 0A"

- id: rc_contrast_up
  label: RC Contrast Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 38 0A"

- id: rc_contrast_adj
  label: RC Contrast Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 41 0A"

- id: rc_cti_off
  label: RC CTI Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 43 0A"
  note: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_cti_low
  label: RC CTI Low
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 44 0A"
  note: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_cti_middle
  label: RC CTI Middle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 45 0A"
  note: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_cti_high
  label: RC CTI High
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 46 0A"
  note: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_cursor_down
  label: RC Cursor Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 32 0A"

- id: rc_cursor_left
  label: RC Cursor Left
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 36 0A"

- id: rc_cursor_right
  label: RC Cursor Right
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 34 0A"

- id: rc_cursor_up
  label: RC Cursor Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 31 0A"

- id: rc_dark_level_down
  label: RC Dark Level Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 35 0A"
  note: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_dark_level_up
  label: RC Dark Level Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 34 0A"
  note: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_detail_enhance_down
  label: RC Detail Enhance Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 32 0A"

- id: rc_detail_enhance_up
  label: RC Detail Enhance Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 31 0A"

- id: rc_picture_tone_blue_down
  label: RC Picture Tone Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 31 0A"
  note: "X7/X9/RS50/60 Film Mode only; X70/X90/RS55/65 all modes"

- id: rc_picture_tone_blue_up
  label: RC Picture Tone Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 30 0A"
  note: "X7/X9/RS50/60 Film Mode only; X70/X90/RS55/65 all modes"

- id: rc_picture_tone_green_down
  label: RC Picture Tone Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 46 0A"
  note: "X7/X9/RS50/60 Film Mode only; X70/X90/RS55/65 all modes"

- id: rc_picture_tone_green_up
  label: RC Picture Tone Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 45 0A"
  note: "X7/X9/RS50/60 Film Mode only; X70/X90/RS55/65 all modes"

- id: rc_picture_tone_red_down
  label: RC Picture Tone Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 44 0A"
  note: "X7/X9/RS50/60 Film Mode only; X70/X90/RS55/65 all modes"

- id: rc_picture_tone_red_up
  label: RC Picture Tone Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 43 0A"
  note: "X7/X9/RS50/60 Film Mode only; X70/X90/RS55/65 all modes"

- id: rc_picture_tone_white_down
  label: RC Picture Tone White Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 42 0A"
  note: "X7/X9/RS50/60 Film Mode only; X70/X90/RS55/65 all modes"

- id: rc_picture_tone_white_up
  label: RC Picture Tone White Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 41 0A"
  note: "X7/X9/RS50/60 Film Mode only; X70/X90/RS55/65 all modes"

- id: rc_gamma_a
  label: RC Gamma A
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 39 0A"

- id: rc_gamma_b
  label: RC Gamma B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 41 0A"

- id: rc_gamma_c
  label: RC Gamma C
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 42 0A"

- id: rc_gamma_custom1
  label: RC Gamma Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 43 0A"

- id: rc_gamma_custom2
  label: RC Gamma Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 44 0A"

- id: rc_gamma_custom3
  label: RC Gamma Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 45 0A"

- id: rc_gamma_d
  label: RC Gamma D
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 46 0A"
  note: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_gamma_normal
  label: RC Gamma Normal
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 38 0A"

- id: rc_gamma_cycle
  label: RC Gamma Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 35 0A"
  note: "Cycles through all options"

- id: rc_hide_off
  label: RC Hide Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 31 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_hide_on
  label: RC Hide On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 30 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_hide_toggle
  label: RC Hide Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 44 0A"

- id: rc_horizontal_position_down
  label: RC Horizontal Position Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 42 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_horizontal_position_up
  label: RC Horizontal Position Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 41 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_information
  label: RC Information
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 34 0A"
  note: "Displays Information tab of menu"

- id: rc_input_component
  label: RC Input Component
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 44 0A"

- id: rc_input_hdmi1
  label: RC Input HDMI 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 30 0A"

- id: rc_input_hdmi2
  label: RC Input HDMI 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 31 0A"

- id: rc_input_pc
  label: RC Input PC
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 36 0A"
  note: "HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65"

- id: rc_input_svideo
  label: RC Input S-Video
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 43 0A"
  note: "HD350/550/750/950/990"

- id: rc_input_video
  label: RC Input Video
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 42 0A"
  note: "HD350/550/750/950/990"

- id: rc_input_cycle
  label: RC Input Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 38 0A"
  note: "Cycles through all available inputs"

- id: rc_isf_day
  label: RC ISF Day
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 34 0A"
  note: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_isf_night
  label: RC ISF Night
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 35 0A"
  note: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_isf_off
  label: RC ISF Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 41 0A"
  note: "HD950/990/X7/X9/X70/X90/RS25/35/50/60/55/65"

- id: rc_isf_on
  label: RC ISF On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 42 0A"
  note: "HD950/990/X7/X9/X70/X90/RS25/35/50/60/55/65"

- id: rc_keystone_h_down
  label: RC Keystone Correction Horizontal Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 31 0A"

- id: rc_keystone_h_up
  label: RC Keystone Correction Horizontal Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 30 0A"

- id: rc_keystone_v_down
  label: RC Keystone Correction Vertical Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 43 0A"

- id: rc_keystone_v_up
  label: RC Keystone Correction Vertical Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 42 0A"

- id: rc_lens_aperture_1
  label: RC Lens Aperture 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 38 0A"
  note: "HD350/HD550"

- id: rc_lens_aperture_2
  label: RC Lens Aperture 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 39 0A"
  note: "HD350/HD550"

- id: rc_lens_aperture_3
  label: RC Lens Aperture 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 41 0A"
  note: "HD350/HD550"

- id: rc_lens_aperture_down
  label: RC Lens Aperture Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 46 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_lens_aperture_up
  label: RC Lens Aperture Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 45 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_lens_aperture_adj
  label: RC Lens Aperture Adjustment
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 30 0A"
  note: "Toggle/display adjustment bar depending on model"

- id: rc_lens_control_cycle
  label: RC Lens Control Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 30 0A"
  note: "Cycles through all options"

- id: rc_lens_focus_down
  label: RC Lens Focus Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 32 0A"

- id: rc_lens_focus_up
  label: RC Lens Focus Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 31 0A"

- id: rc_lens_memory_pages_cycle
  label: RC Lens Memory Pages Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 34 0A"
  note: "Cycles Select/Save/Name Edit pages (X30/X70/X90/RS45/55/65)"

- id: rc_lens_memory_1
  label: RC Lens Memory 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 38 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: rc_lens_memory_2
  label: RC Lens Memory 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 39 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: rc_lens_memory_3
  label: RC Lens Memory 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 41 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: rc_lens_shift_down
  label: RC Lens Shift Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 32 0A"

- id: rc_lens_shift_left
  label: RC Lens Shift Left
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 34 0A"

- id: rc_lens_shift_right
  label: RC Lens Shift Right
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 33 0A"

- id: rc_lens_shift_up
  label: RC Lens Shift Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 31 0A"

- id: rc_lens_zoom_in
  label: RC Lens Zoom In
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 35 0A"

- id: rc_lens_zoom_out
  label: RC Lens Zoom Out
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 37 0A"

- id: rc_mask_bottom_down
  label: RC Mask Bottom Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 38 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_mask_bottom_up
  label: RC Mask Bottom Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 37 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_mask_left_down
  label: RC Mask Left Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 32 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_mask_left_up
  label: RC Mask Left Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 31 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_mask_right_down
  label: RC Mask Right Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 34 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_mask_right_up
  label: RC Mask Right Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 33 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_mask_top_down
  label: RC Mask Top Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 36 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_mask_top_up
  label: RC Mask Top Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 35 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_menu_toggle
  label: RC Menu Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 45 0A"

- id: rc_menu_position
  label: RC Menu Position
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 32 0A"
  note: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_mnr_down
  label: RC MNR Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 45 0A"

- id: rc_mnr_up
  label: RC MNR Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 44 0A"

- id: rc_nr_toggle
  label: RC NR Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 38 0A"
  note: "Toggles display of RNR/MNR (HD350/550/750/950/990/RS10/15/20/25/35)"

- id: rc_ok
  label: RC OK
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 46 0A"

- id: rc_phase_down
  label: RC Phase Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 39 0A"
  note: "PC input (X7/X9/X70/X90/RS50/60/55/65)"

- id: rc_phase_up
  label: RC Phase Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 38 0A"
  note: "PC input (X7/X9/X70/X90/RS50/60/55/65)"

- id: rc_picture_adjust
  label: RC Picture Adjust
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 32 0A"
  note: "HD550/750/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_picture_mode_3d
  label: RC Picture Mode 3D
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 37 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_picture_mode_cinema1
  label: RC Picture Mode Cinema 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 39 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 Film Mode"

- id: rc_picture_mode_cinema2
  label: RC Picture Mode Cinema 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 38 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 Cinema Mode"

- id: rc_picture_mode_cinema3
  label: RC Picture Mode Cinema 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 36 0A"
  note: "HD550/750/990/RS15/25/35; X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 Animation Mode"

- id: rc_picture_mode_dynamic
  label: RC Picture Mode Dynamic
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 42 0A"
  note: "HD350/550/750/950/990"

- id: rc_picture_mode_natural
  label: RC Picture Mode Natural
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 41 0A"

- id: rc_picture_mode_stage
  label: RC Picture Mode Stage
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 37 0A"

- id: rc_picture_mode_thx
  label: RC Picture Mode THX
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 46 0A"
  note: "HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65"

- id: rc_picture_mode_user1
  label: RC Picture Mode User 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 43 0A"

- id: rc_picture_mode_user2
  label: RC Picture Mode User 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 44 0A"

- id: rc_picture_mode_user3
  label: RC Picture Mode User 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 45 0A"
  note: "HD550/750/950/990/X3/X30/RS20/25/35/40/45"

- id: rc_picture_mode_user4
  label: RC Picture Mode User 4
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 41 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: rc_picture_mode_user5
  label: RC Picture Mode User 5
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 42 0A"
  note: "X30/X70/X90/RS45/55/65"

- id: rc_pixel_shift_h_blue_down
  label: RC Pixel Shift Horizontal Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 45 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_h_blue_up
  label: RC Pixel Shift Horizontal Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 44 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_h_green_down
  label: RC Pixel Shift Horizontal Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 43 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_h_green_up
  label: RC Pixel Shift Horizontal Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 42 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_h_red_down
  label: RC Pixel Shift Horizontal Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 41 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_h_red_up
  label: RC Pixel Shift Horizontal Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 39 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_v_blue_down
  label: RC Pixel Shift Vertical Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 34 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_v_blue_up
  label: RC Pixel Shift Vertical Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 33 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_v_green_down
  label: RC Pixel Shift Vertical Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 32 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_v_green_up
  label: RC Pixel Shift Vertical Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 31 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_v_red_down
  label: RC Pixel Shift Vertical Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 30 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_pixel_shift_v_red_up
  label: RC Pixel Shift Vertical Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 46 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_power_off
  label: RC Power Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 36 0A"
  note: "Send twice with short delay between to switch off"

- id: rc_power_on
  label: RC Power On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 35 0A"

- id: rc_rnr_down
  label: RC RNR Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 43 0A"

- id: rc_rnr_up
  label: RC RNR Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 42 0A"

- id: rc_screen_adjust_off
  label: RC Screen Adjust Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 30 0A"
  note: "X3/X30/RS40/45"

- id: rc_screen_adjust_a
  label: RC Screen Adjust A
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 31 0A"
  note: "X3/X30/RS40/45"

- id: rc_screen_adjust_b
  label: RC Screen Adjust B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 32 0A"
  note: "X3/X30/RS40/45"

- id: rc_screen_adjust_c
  label: RC Screen Adjust C
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 33 0A"
  note: "X3/X30/RS40/45"

- id: rc_sharpness_down
  label: RC Sharpness Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 46 0A"

- id: rc_sharpness_up
  label: RC Sharpness Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 45 0A"

- id: rc_sharpness_adj
  label: RC Sharpness Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 34 0A"

- id: rc_shutter_close
  label: RC Shutter Close
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 39 0A"
  note: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_shutter_open
  label: RC Shutter Open
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 41 0A"
  note: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_shutter_sync_off
  label: RC Shutter Sync Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 44 0A"
  note: "Un-synchronises shutter with Hide function"

- id: rc_shutter_sync_on
  label: RC Shutter Sync On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 43 0A"
  note: "Synchronises shutter with Hide function"

- id: rc_test_pattern_cycle
  label: RC Test Pattern Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 39 0A"
  note: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_thx_bright
  label: RC THX Bright
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 35 0A"
  note: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_thx_dark
  label: RC THX Dark
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 36 0A"
  note: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_thx_off
  label: RC THX Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 37 0A"
  note: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_thx_on
  label: RC THX On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 38 0A"
  note: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_tint_down
  label: RC Tint Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 39 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_tint_up
  label: RC Tint Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 38 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_tint_adj
  label: RC Tint Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 36 0A"

- id: rc_tracking_down
  label: RC Tracking Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 37 0A"
  note: "PC input (X7/X9/X70/X90/RS50/60/55/65)"

- id: rc_tracking_up
  label: RC Tracking Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 36 0A"
  note: "PC input (X7/X9/X70/X90/RS50/60/55/65)"

- id: rc_user_cycle
  label: RC User Picture Mode Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 37 0A"
  note: "Cycles User 1-5 (X30/X70/X90/RS45/55/65)"

- id: rc_vertical_position_down
  label: RC Vertical Position Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 44 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_vertical_position_up
  label: RC Vertical Position Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 43 0A"
  note: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: picture_mode_film_legacy
  label: Picture Mode Film (X3/X7/X9/RS40/50/60) / Cinema 1 (HD350/750/550/950/990)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 0A"
  note: "Legacy single-byte data variant for older model groups"

- id: picture_mode_cinema_legacy
  label: Picture Mode Cinema (X3) / Cinema 2 (HD)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 31 0A"
  note: "Legacy single-byte data variant"

- id: picture_mode_animation_legacy
  label: Picture Mode Animation (X3) / Cinema 3 (HD)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 32 0A"
  note: "Legacy single-byte data variant"

- id: picture_mode_natural_legacy
  label: Picture Mode Natural (X3/HD)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 33 0A"
  note: "Legacy single-byte data variant"

- id: picture_mode_stage_legacy
  label: Picture Mode Stage (X3/HD)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 34 0A"
  note: "Legacy single-byte data variant"

- id: picture_mode_dynamic
  label: Picture Mode Dynamic (HD350/550/750/950/990)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 35 0A"

- id: picture_mode_user1_legacy
  label: Picture Mode User 1 (X3/HD)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 36 0A"
  note: "Legacy single-byte data variant"

- id: picture_mode_user2_legacy
  label: Picture Mode User 2 (X3/HD)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 37 0A"
  note: "Legacy single-byte data variant"

- id: picture_mode_thx_legacy
  label: Picture Mode THX (X7/X9/RS50/60; HD750/950/990)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 39 0A"
  note: "Legacy single-byte data variant"

- id: picture_mode_3d_legacy
  label: Picture Mode 3D (X3/X7/X9/RS40/50/60)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 45 0A"
  note: "Legacy single-byte data variant for X3 family"
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
  enquiry_hex: "3F 89 01 50 57 0A"
  response_hex: "06 89 01 50 57 0A 40 89 01 50 57 RR 0A"

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
  enquiry_hex: "3F 89 01 49 50 0A"
  response_hex: "06 89 01 49 50 0A 40 89 01 49 50 RR 0A"

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
  enquiry_hex: "3F 89 01 47 54 0A"
  response_hex: "06 89 01 47 54 0A 40 89 01 47 54 RR 0A"

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
  enquiry_hex: "3F 89 01 47 50 0A"
  response_hex: "06 89 01 47 50 0A 40 89 01 47 50 RR 0A"

- id: source_status
  label: Source Status
  type: enum
  values:
    - "00": JVC Logo displayed
    - "30": No signal or signal out of range
    - "31": Signal input correctly
  enquiry_hex: "3F 89 01 53 43 0A"
  response_hex: "06 89 01 53 43 0A 40 89 01 53 43 RR 0A"

- id: model_status
  label: Model Status
  type: enum
  values:
    - "494C4146504A202D2D202D5848 34": DLA-HD350
    - "494C4146504A202D2D202D5848 35": DLA-RS10
    - "494C4146504A202D2D202D5848 37": DLA-HD750/DLA-RS20
    - "494C4146504A202D2D202D5848 38": DLA-HD550
    - "494C4146504A202D2D202D5848 39": DLA-RS15
    - "494C4146504A202D2D202D5848 41": DLA-HD950/HD990/DLA-RS25/RS35
    - "494C4146504A202D2D202D5848 42": DLA-X3/DLA-RS40
    - "494C4146504A202D2D202D5848 43": DLA-X7/X9/DLA-RS50/60
    - "494C4146504A202D2D202D5848 45": DLA-X30/DLA-RS45
    - "494C4146504A202D2D202D5848 46": DLA-X70R/X90R/DLA-RS55/65
  enquiry_hex: "3F 89 01 4D 44 0A"
  response_hex: "06 89 01 4D 44 0A 40 89 01 4D 44 RR 0A"

- id: ack_basic
  label: Acknowledgement Basic
  type: binary
  note: "06 89 01 CC CC 0A - returns first 2 bytes of received command"
```

## Variables
```yaml
# UNRESOLVED: continuous adjustment parameters (brightness, contrast, colour,
# tint, sharpness, etc.) are controlled via discrete remote emulation commands,
# not as settable variables. No parameter ranges stated in source.
```

## Events
```yaml
# UNRESOLVED: projector sends unsolicited events only via acknowledgement
# response codes. No separate event channel documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # "send twice with short delay between to switch off"
interlocks: []
# UNRESOLVED: power-on sequencing, lamp replacement warnings not stated in source.
```

## Notes

**Command format summary:**
- Direct commands: 7-byte hex (`21 89 01 XX XX DD 0A`) or 10-byte for extended
- Remote emulation commands: 10-byte hex (`21 89 01 52 43 XX XX XX XX 0A`)
- Enquiry commands: 6-byte hex (`3F 89 01 XX XX 0A`)
- Basic ACK: `06 89 01 CC CC 0A`
- Detailed response: `40 89 01 XX XX RR 0A`

**LAN control handshake sequence:**
1. Controller → Projector: TCP connect to port 20554
2. Projector → Controller: `PJ_OK`
3. Controller → Projector: `PJREQ` (within 5 seconds)
4. Projector → Controller: `PJACK`
5. Controller → Projector: hex command (within 5 seconds)
6. Projector closes connection after 5 seconds or command timeout

**Serial cable:** Cross-connected (null-modem) cable required.

**Error handling:** Projector ignores unrecognized commands (wrong Unit ID, parity error, invalid command). Ignores commands sent during cooling mode. Discards commands if data break ≥50ms detected. External controller must wait for ACK before sending next command.

**Infrared remote emulation:** IR command format is `73 XX` where XX is the hex ASCII code of the remote emulation command. Two IR codes supported: hex 73 (Code A, default) and hex 63 (Code B).

<!-- UNRESOLVED: LAN default IP address (192.168.0.2), subnet mask, gateway — network settings stated but not as command parameters. UNRESOLVED: DHCP On/Off default not stated explicitly. UNRESOLVED: command timeout beyond 5 seconds not characterized. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:49.866Z
last_checked_at: 2026-06-02T17:26:31.894Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:26:31.894Z
matched_actions: 313
action_count: 313
confidence: medium
summary: "All 313 spec operating commands have exact hex matches in source; source contains exactly 313 unique operating commands and 6 enquiry commands all covered by Feedbacks; transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command timing specifications beyond 50ms break detection not stated. UNRESOLVED:firmware version compatibility not stated."
- "continuous adjustment parameters (brightness, contrast, colour,"
- "projector sends unsolicited events only via acknowledgement"
- "no multi-step macro sequences documented in source."
- "power-on sequencing, lamp replacement warnings not stated in source."
- "LAN default IP address (192.168.0.2), subnet mask, gateway — network settings stated but not as command parameters. UNRESOLVED: DHCP On/Off default not stated explicitly. UNRESOLVED: command timeout beyond 5 seconds not characterized."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
