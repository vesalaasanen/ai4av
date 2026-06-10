---
spec_id: admin/jvc_kenwood-dla_v9r
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-V9R Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-V9R
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-V9R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manualslib.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://www.manualslib.com/manual/83315/Jvc-Rs-232c.html
retrieved_at: 2026-05-21T00:48:59.488Z
last_checked_at: 2026-06-09T11:18:21.259Z
generated_at: 2026-06-09T11:18:21.259Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DLA-V9R model not individually listed in source; this spec covers the command set documented for this product family"
  - "no discrete settable parameters documented separately from direct commands"
  - "no unsolicited event notifications documented in source"
  - "exact delay duration not specified"
  - "no explicit safety warnings or interlock procedures in source"
  - "Model status enquiry returns model identification codes but DLA-V9R specifically not listed in model status table"
  - "Lamp hour status / runtime not documented in source"
  - "Network settings (IP address, DHCP) not commandable via serial — must be set via projector OSD menu"
verification:
  verdict: verified
  checked_at: 2026-06-09T11:18:21.259Z
  matched_actions: 303
  action_count: 303
  confidence: medium
  summary: "All 303 actions matched to source with correct hex codes; transport parameters verified; coverage ratio 96.8% above 0.9 threshold. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# JVC KENWOOD DLA-V9R Control Spec

## Summary
JVC KENWOOD DLA-V9R home theater projector supporting RS-232C and TCP/IP (LAN) control interfaces. Direct commands control power, input selection, test patterns, gamma, lamp power, and anamorphic modes. Remote control emulation commands replicate the full IR remote functionality via serial or LAN. No authentication required.

<!-- UNRESOLVED: DLA-V9R model not individually listed in source; this spec covers the command set documented for this product family -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 20554  # LAN control port; RS-232 uses standard 9-pin D-Sub
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**LAN Handshake Sequence:**
1. Controller → Projector: TCP connection request to port 20554
2. Projector → Controller: `PJ_OK`
3. Controller → Projector: `PJREQ` (within 5 seconds)
4. Projector → Controller: `PJACK`
5. Controller → Projector: Hex command (within 5 seconds of PJACK)
6. Projector closes connection 5 seconds after command completion

**RS-232C Pinout (9-pin D-Sub male):**
| Pin | Signal | Direction |
|-----|--------|-----------|
| 2 | Rx Data | Computer → Projector |
| 3 | Tx Data | Projector → Computer |
| 5 | Ground | — |

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

- id: testpattern_colour_bars
  label: Test Pattern Colour Bars
  kind: action
  params: []
  hex: "2189 01 54 53 31 0A"

- id: testpattern_stairstep_bw
  label: Test Pattern Stairstep (Black & White)
  kind: action
  params: []
  hex: "2189 01 54 53 36 0A"

- id: testpattern_stairstep_red
  label: Test Pattern Stairstep (Red)
  kind: action
  params: []
  hex: "2189 01 54 53 37 0A"

- id: testpattern_stairstep_green
  label: Test Pattern Stairstep (Green)
  kind: action
  params: []
  hex: "2189 01 54 53 38 0A"

- id: testpattern_stairstep_blue
  label: Test Pattern Stairstep (Blue)
  kind: action
  params: []
  hex: "2189 01 54 53 39 0A"

- id: testpattern_crosshatch_green
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

- id: format_3d_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  params: []
  hex: "2189 01 49 53 33 44 34 0A"

- id: convert_2d_to_3d_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []
  hex: "2189 01 49 53 33 43 30 0A"

- id: convert_2d_to_3d_on
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
  label: Null Command (test communication)
  kind: action
  params: []
  hex: "2189 01 00 00 0A"
- id: input_pc
  label: Input PC
  kind: action
  params: []
  hex: "2189 01 49 50 33 0A"
- id: gamma_correction_1_8
  label: Gamma Correction Value 1.8
  kind: action
  params: []
  hex: "2189 01 47 50 30 0A"
- id: gamma_correction_1_9
  label: Gamma Correction Value 1.9
  kind: action
  params: []
  hex: "2189 01 47 50 31 0A"
- id: gamma_correction_2_0
  label: Gamma Correction Value 2.0
  kind: action
  params: []
  hex: "2189 01 47 50 32 0A"
- id: gamma_correction_2_1
  label: Gamma Correction Value 2.1
  kind: action
  params: []
  hex: "2189 01 47 50 33 0A"
- id: gamma_correction_2_2
  label: Gamma Correction Value 2.2
  kind: action
  params: []
  hex: "2189 01 47 50 34 0A"
- id: gamma_correction_2_3
  label: Gamma Correction Value 2.3
  kind: action
  params: []
  hex: "2189 01 47 50 35 0A"
- id: gamma_correction_2_4
  label: Gamma Correction Value 2.4
  kind: action
  params: []
  hex: "2189 01 47 50 36 0A"
- id: gamma_correction_2_5
  label: Gamma Correction Value 2.5
  kind: action
  params: []
  hex: "2189 01 47 50 37 0A"
- id: gamma_correction_2_6
  label: Gamma Correction Value 2.6
  kind: action
  params: []
  hex: "2189 01 47 50 38 0A"
- id: remote_code_a
  label: Remote Code A (IR Hex Code 73)
  kind: action
  params: []
  hex: "2189 01 53 55 52 43 30 0A"
- id: remote_code_b
  label: Remote Code B (IR Hex Code 63)
  kind: action
  params: []
  hex: "2189 01 53 55 52 43 31 0A"
- id: rc_3d_setting
  label: RC 3D Setting
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 35 0A"
- id: rc_3d_format_cycle
  label: RC 3D Format Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 36 0A"
- id: rc_advanced
  label: RC Advanced
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 33 0A"
- id: rc_anamorphic_off
  label: RC Anamorphic Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 34 0A"
- id: rc_anamorphic_a
  label: RC Anamorphic A
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 33 0A"
- id: rc_anamorphic_b
  label: RC Anamorphic B
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 42 0A"
- id: rc_anamorphic_cycle
  label: RC Anamorphic Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 35 0A"
- id: rc_aspect_169
  label: RC Aspect 16:9
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 36 0A"
- id: rc_aspect_43
  label: RC Aspect 4:3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 35 0A"
- id: rc_aspect_zoom
  label: RC Aspect Zoom
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 37 0A"
- id: rc_aspect_pc_auto
  label: RC Aspect PC Auto
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 45 0A"
- id: rc_aspect_pc_full
  label: RC Aspect PC Full
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 30 0A"
- id: rc_aspect_pc_just
  label: RC Aspect PC Just
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 46 0A"
- id: rc_aspect_cycle
  label: RC Aspect Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 37 0A"
- id: rc_auto_align
  label: RC Auto Align
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 33 0A"
- id: rc_auto_lens_centre
  label: RC Auto Lens Centre
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 39 0A"
- id: rc_back
  label: RC Back
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 33 0A"
- id: rc_bnr_off
  label: RC BNR Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 30 0A"
- id: rc_bnr_on
  label: RC BNR On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 46 0A"
- id: rc_bright_level_dec
  label: RC Bright Level Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 33 0A"
- id: rc_bright_level_inc
  label: RC Bright Level Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 32 0A"
- id: rc_brightness_dec
  label: RC Brightness Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 42 0A"
- id: rc_brightness_inc
  label: RC Brightness Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 41 0A"
- id: rc_brightness_adj
  label: RC Brightness Adjustment Bar Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 39 0A"
- id: rc_cec_off
  label: RC CEC Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 37 0A"
- id: rc_cec_on
  label: RC CEC On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 36 0A"
- id: rc_cmd_cycle
  label: RC Clear Motion Drive Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 41 0A"
- id: rc_cmd_off
  label: RC Clear Motion Drive Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 37 0A"
- id: rc_cmd_mode1
  label: RC Clear Motion Drive Mode 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 45 0A"
- id: rc_cmd_mode2
  label: RC Clear Motion Drive Mode 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 46 0A"
- id: rc_cmd_mode3
  label: RC Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 38 0A"
- id: rc_cmd_mode4
  label: RC Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 39 0A"
- id: rc_cmd_inverse_telecine
  label: RC Clear Motion Drive Inverse Telecine
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 41 0A"
- id: rc_colour_dec
  label: RC Colour Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 44 0A"
- id: rc_colour_inc
  label: RC Colour Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 43 0A"
- id: rc_colour_adj
  label: RC Colour Adjustment Bar Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 35 0A"
- id: rc_colour_management_off
  label: RC Colour Management Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 30 0A"
- id: rc_colour_management_custom1
  label: RC Colour Management Custom 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 31 0A"
- id: rc_colour_management_custom2
  label: RC Colour Management Custom 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 32 0A"
- id: rc_colour_management_custom3
  label: RC Colour Management Custom 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 33 0A"
- id: rc_colour_management_cycle
  label: RC Colour Management Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 39 0A"
- id: rc_colour_profile_cycle
  label: RC Colour Profile Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 38 0A"
- id: rc_colour_space_cycle
  label: RC Colour Space Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 44 0A"
- id: rc_colour_temp_5800k
  label: RC Colour Temperature 5800K
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 45 0A"
- id: rc_colour_temp_6500k
  label: RC Colour Temperature 6500K
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 46 0A"
- id: rc_colour_temp_7500k
  label: RC Colour Temperature 7500K
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 30 0A"
- id: rc_colour_temp_9300k
  label: RC Colour Temperature 9300K
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 31 0A"
- id: rc_colour_temp_custom1
  label: RC Colour Temperature Custom 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 33 0A"
- id: rc_colour_temp_custom2
  label: RC Colour Temperature Custom 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 34 0A"
- id: rc_colour_temp_custom3
  label: RC Colour Temperature Custom 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 35 0A"
- id: rc_colour_temp_high_bright
  label: RC Colour Temperature High Bright
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 32 0A"
- id: rc_colour_temp_cycle
  label: RC Colour Temperature Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 36 0A"
- id: rc_colour_temp_gain_blue_dec
  label: RC Colour Temperature Gain Blue Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 31 0A"
- id: rc_colour_temp_gain_blue_inc
  label: RC Colour Temperature Gain Blue Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 30 0A"
- id: rc_colour_temp_gain_green_dec
  label: RC Colour Temperature Gain Green Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 46 0A"
- id: rc_colour_temp_gain_green_inc
  label: RC Colour Temperature Gain Green Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 45 0A"
- id: rc_colour_temp_gain_red_dec
  label: RC Colour Temperature Gain Red Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 44 0A"
- id: rc_colour_temp_gain_red_inc
  label: RC Colour Temperature Gain Red Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 43 0A"
- id: rc_colour_temp_offset_blue_dec
  label: RC Colour Temperature Offset Blue Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 37 0A"
- id: rc_colour_temp_offset_blue_inc
  label: RC Colour Temperature Offset Blue Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 36 0A"
- id: rc_colour_temp_offset_green_dec
  label: RC Colour Temperature Offset Green Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 35 0A"
- id: rc_colour_temp_offset_green_inc
  label: RC Colour Temperature Offset Green Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 34 0A"
- id: rc_colour_temp_offset_red_dec
  label: RC Colour Temperature Offset Red Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 33 0A"
- id: rc_colour_temp_offset_red_inc
  label: RC Colour Temperature Offset Red Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 32 0A"
- id: rc_contrast_dec
  label: RC Contrast Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 39 0A"
- id: rc_contrast_inc
  label: RC Contrast Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 38 0A"
- id: rc_contrast_adj
  label: RC Contrast Adjustment Bar Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 41 0A"
- id: rc_cti_off
  label: RC CTI Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 43 0A"
- id: rc_cti_low
  label: RC CTI Low
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 44 0A"
- id: rc_cti_middle
  label: RC CTI Middle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 45 0A"
- id: rc_cti_high
  label: RC CTI High
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 46 0A"
- id: rc_cursor_down
  label: RC Cursor Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 32 0A"
- id: rc_cursor_left
  label: RC Cursor Left
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 36 0A"
- id: rc_cursor_right
  label: RC Cursor Right
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 34 0A"
- id: rc_cursor_up
  label: RC Cursor Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 31 0A"
- id: rc_dark_level_dec
  label: RC Dark Level Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 35 0A"
- id: rc_dark_level_inc
  label: RC Dark Level Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 34 0A"
- id: rc_detail_enhance_dec
  label: RC Detail Enhance Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 32 0A"
- id: rc_detail_enhance_inc
  label: RC Detail Enhance Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 31 0A"
- id: rc_picture_tone_blue_dec
  label: RC Picture Tone Blue Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 31 0A"
- id: rc_picture_tone_blue_inc
  label: RC Picture Tone Blue Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 30 0A"
- id: rc_picture_tone_green_dec
  label: RC Picture Tone Green Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 46 0A"
- id: rc_picture_tone_green_inc
  label: RC Picture Tone Green Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 45 0A"
- id: rc_picture_tone_red_dec
  label: RC Picture Tone Red Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 44 0A"
- id: rc_picture_tone_red_inc
  label: RC Picture Tone Red Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 43 0A"
- id: rc_picture_tone_white_dec
  label: RC Picture Tone White Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 42 0A"
- id: rc_picture_tone_white_inc
  label: RC Picture Tone White Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 41 0A"
- id: rc_gamma_a
  label: RC Gamma A
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 39 0A"
- id: rc_gamma_b
  label: RC Gamma B
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 41 0A"
- id: rc_gamma_c
  label: RC Gamma C
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 42 0A"
- id: rc_gamma_custom1
  label: RC Gamma Custom 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 43 0A"
- id: rc_gamma_custom2
  label: RC Gamma Custom 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 44 0A"
- id: rc_gamma_custom3
  label: RC Gamma Custom 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 45 0A"
- id: rc_gamma_d
  label: RC Gamma D
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 46 0A"
- id: rc_gamma_normal
  label: RC Gamma Normal
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 38 0A"
- id: rc_gamma_cycle
  label: RC Gamma Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 35 0A"
- id: rc_hide_off
  label: RC Hide Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 31 0A"
- id: rc_hide_on
  label: RC Hide On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 30 0A"
- id: rc_hide_toggle
  label: RC Hide Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 44 0A"
- id: rc_horizontal_position_dec
  label: RC Horizontal Position Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 42 0A"
- id: rc_horizontal_position_inc
  label: RC Horizontal Position Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 41 0A"
- id: rc_information
  label: RC Information
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 34 0A"
- id: rc_input_component
  label: RC Input Component
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 44 0A"
- id: rc_input_hdmi1
  label: RC Input HDMI 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 30 0A"
- id: rc_input_hdmi2
  label: RC Input HDMI 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 31 0A"
- id: rc_input_pc
  label: RC Input PC
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 36 0A"
- id: rc_input_svideo
  label: RC Input S-Video
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 43 0A"
- id: rc_input_video
  label: RC Input Video
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 42 0A"
- id: rc_input_cycle
  label: RC Input Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 38 0A"
- id: rc_isf_day
  label: RC ISF Day
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 34 0A"
- id: rc_isf_night
  label: RC ISF Night
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 35 0A"
- id: rc_isf_off
  label: RC ISF Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 41 0A"
- id: rc_isf_on
  label: RC ISF On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 42 0A"
- id: rc_keystone_h_dec
  label: RC Keystone Horizontal Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 31 0A"
- id: rc_keystone_h_inc
  label: RC Keystone Horizontal Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 30 0A"
- id: rc_keystone_v_dec
  label: RC Keystone Vertical Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 43 0A"
- id: rc_keystone_v_inc
  label: RC Keystone Vertical Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 42 0A"
- id: rc_lens_aperture_1
  label: RC Lens Aperture 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 38 0A"
- id: rc_lens_aperture_2
  label: RC Lens Aperture 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 39 0A"
- id: rc_lens_aperture_3
  label: RC Lens Aperture 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 41 0A"
- id: rc_lens_aperture_dec
  label: RC Lens Aperture Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 46 0A"
- id: rc_lens_aperture_inc
  label: RC Lens Aperture Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 45 0A"
- id: rc_lens_aperture_adj
  label: RC Lens Aperture Adjustment
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 30 0A"
- id: rc_lens_control
  label: RC Lens Control
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 30 0A"
- id: rc_lens_focus_dec
  label: RC Lens Focus Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 32 0A"
- id: rc_lens_focus_inc
  label: RC Lens Focus Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 31 0A"
- id: rc_lens_memory_cycle
  label: RC Lens Memory Page Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 34 0A"
- id: rc_lens_memory_1
  label: RC Lens Memory 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 38 0A"
- id: rc_lens_memory_2
  label: RC Lens Memory 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 39 0A"
- id: rc_lens_memory_3
  label: RC Lens Memory 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 41 0A"
- id: rc_lens_shift_down
  label: RC Lens Shift Down
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 32 0A"
- id: rc_lens_shift_left
  label: RC Lens Shift Left
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 34 0A"
- id: rc_lens_shift_right
  label: RC Lens Shift Right
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 33 0A"
- id: rc_lens_shift_up
  label: RC Lens Shift Up
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 31 0A"
- id: rc_lens_zoom_in
  label: RC Lens Zoom In
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 35 0A"
- id: rc_lens_zoom_out
  label: RC Lens Zoom Out
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 33 37 0A"
- id: rc_mask_bottom_dec
  label: RC Mask Bottom Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 38 0A"
- id: rc_mask_bottom_inc
  label: RC Mask Bottom Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 37 0A"
- id: rc_mask_left_dec
  label: RC Mask Left Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 32 0A"
- id: rc_mask_left_inc
  label: RC Mask Left Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 31 0A"
- id: rc_mask_right_dec
  label: RC Mask Right Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 34 0A"
- id: rc_mask_right_inc
  label: RC Mask Right Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 33 0A"
- id: rc_mask_top_dec
  label: RC Mask Top Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 36 0A"
- id: rc_mask_top_inc
  label: RC Mask Top Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 35 0A"
- id: rc_menu
  label: RC Menu Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 45 0A"
- id: rc_menu_position
  label: RC Menu Position
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 34 32 0A"
- id: rc_mnr_dec
  label: RC MNR Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 45 0A"
- id: rc_mnr_inc
  label: RC MNR Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 44 0A"
- id: rc_nr
  label: RC Noise Reduction Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 38 0A"
- id: rc_ok
  label: RC OK
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 46 0A"
- id: rc_phase_dec
  label: RC Phase Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 39 0A"
- id: rc_phase_inc
  label: RC Phase Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 38 0A"
- id: rc_picture_adjust
  label: RC Picture Adjust
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 32 0A"
- id: rc_picture_mode_3d
  label: RC Picture Mode 3D
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 37 0A"
- id: rc_picture_mode_cinema1
  label: RC Picture Mode Cinema 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 39 0A"
- id: rc_picture_mode_cinema2
  label: RC Picture Mode Cinema 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 38 0A"
- id: rc_picture_mode_cinema3
  label: RC Picture Mode Cinema 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 36 0A"
- id: rc_picture_mode_dynamic
  label: RC Picture Mode Dynamic
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 42 0A"
- id: rc_picture_mode_natural
  label: RC Picture Mode Natural
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 41 0A"
- id: rc_picture_mode_stage
  label: RC Picture Mode Stage
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 37 0A"
- id: rc_picture_mode_thx
  label: RC Picture Mode THX
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 46 0A"
- id: rc_picture_mode_user1
  label: RC Picture Mode User 1
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 43 0A"
- id: rc_picture_mode_user2
  label: RC Picture Mode User 2
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 44 0A"
- id: rc_picture_mode_user3
  label: RC Picture Mode User 3
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 36 45 0A"
- id: rc_picture_mode_user4
  label: RC Picture Mode User 4
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 41 0A"
- id: rc_picture_mode_user5
  label: RC Picture Mode User 5
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 42 0A"
- id: rc_pixel_shift_h_blue_dec
  label: RC Pixel Shift Horizontal Blue Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 45 0A"
- id: rc_pixel_shift_h_blue_inc
  label: RC Pixel Shift Horizontal Blue Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 44 0A"
- id: rc_pixel_shift_h_green_dec
  label: RC Pixel Shift Horizontal Green Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 43 0A"
- id: rc_pixel_shift_h_green_inc
  label: RC Pixel Shift Horizontal Green Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 42 0A"
- id: rc_pixel_shift_h_red_dec
  label: RC Pixel Shift Horizontal Red Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 41 0A"
- id: rc_pixel_shift_h_red_inc
  label: RC Pixel Shift Horizontal Red Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 39 0A"
- id: rc_pixel_shift_v_blue_dec
  label: RC Pixel Shift Vertical Blue Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 34 0A"
- id: rc_pixel_shift_v_blue_inc
  label: RC Pixel Shift Vertical Blue Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 33 0A"
- id: rc_pixel_shift_v_green_dec
  label: RC Pixel Shift Vertical Green Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 32 0A"
- id: rc_pixel_shift_v_green_inc
  label: RC Pixel Shift Vertical Green Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 31 0A"
- id: rc_pixel_shift_v_red_dec
  label: RC Pixel Shift Vertical Red Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 30 0A"
- id: rc_pixel_shift_v_red_inc
  label: RC Pixel Shift Vertical Red Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 42 46 0A"
- id: rc_power_off
  label: RC Power Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 36 0A"
- id: rc_power_on
  label: RC Power On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 35 0A"
- id: rc_rnr_dec
  label: RC RNR Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 43 0A"
- id: rc_rnr_inc
  label: RC RNR Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 30 42 0A"
- id: rc_screen_adjust_off
  label: RC Screen Adjust Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 30 0A"
- id: rc_screen_adjust_a
  label: RC Screen Adjust A
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 31 0A"
- id: rc_screen_adjust_b
  label: RC Screen Adjust B
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 32 0A"
- id: rc_screen_adjust_c
  label: RC Screen Adjust C
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 33 0A"
- id: rc_sharpness_dec
  label: RC Sharpness Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 46 0A"
- id: rc_sharpness_inc
  label: RC Sharpness Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 37 45 0A"
- id: rc_sharpness_adj
  label: RC Sharpness Adjustment Bar Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 34 0A"
- id: rc_shutter_close
  label: RC Shutter Close
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 39 0A"
- id: rc_shutter_open
  label: RC Shutter Open
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 41 0A"
- id: rc_shutter_off
  label: RC Shutter Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 44 0A"
- id: rc_shutter_on
  label: RC Shutter On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 32 43 0A"
- id: rc_test_pattern_cycle
  label: RC Test Pattern Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 35 39 0A"
- id: rc_thx_bright
  label: RC THX Bright
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 35 0A"
- id: rc_thx_dark
  label: RC THX Dark
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 38 36 0A"
- id: rc_thx_off
  label: RC THX Off
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 37 0A"
- id: rc_thx_on
  label: RC THX On
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 43 38 0A"
- id: rc_tint_dec
  label: RC Tint Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 39 0A"
- id: rc_tint_inc
  label: RC Tint Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 39 38 0A"
- id: rc_tint_adj
  label: RC Tint Adjustment Bar Toggle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 31 36 0A"
- id: rc_tracking_dec
  label: RC Tracking Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 37 0A"
- id: rc_tracking_inc
  label: RC Tracking Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 36 0A"
- id: rc_user_cycle
  label: RC User Picture Mode Cycle
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 44 37 0A"
- id: rc_vertical_position_dec
  label: RC Vertical Position Decrease
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 44 0A"
- id: rc_vertical_position_inc
  label: RC Vertical Position Increase
  kind: action
  params: []
  hex: "2189 01 52 43 37 33 41 43 0A"
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values:
    - "30": Standby
    - "31": Power On
    - "32": Cooling
    - "34": Emergency
  query: "3F 89 01 50 57 0A"
  response_pattern: "06 89 01 50 57 0A 40 89 01 50 57 RR 0A"

- id: input_status
  type: enum
  values:
    - "30": S-Video
    - "31": Video
    - "32": Component
    - "33": PC
    - "36": HDMI 1
    - "37": HDMI 2
  query: "3F 89 01 49 50 0A"
  response_pattern: "06 89 01 49 50 0A 40 89 01 49 50 RR 0A"

- id: gamma_table_status
  type: enum
  values:
    - "30": Gamma Normal
    - "31": Gamma A
    - "32": Gamma B
    - "33": Gamma C
    - "34": Gamma Custom 1
    - "35": Gamma Custom 2
    - "36": Gamma Custom 3
  query: "3F 89 01 47 54 0A"
  response_pattern: "06 89 01 47 54 0A 40 89 01 47 54 RR 0A"

- id: gamma_value_status
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
  query: "3F 89 01 47 50 0A"
  response_pattern: "06 89 01 47 50 0A 40 89 01 47 50 RR 0A"

- id: source_status
  type: enum
  values:
    - "00": JVC Logo displayed
    - "30": No signal or signal out of range
    - "31": Signal input correctly
  query: "3F 89 01 53 43 0A"
  response_pattern: "06 89 01 53 43 0A 40 89 01 53 43 RR 0A"

- id: basic_ack
  type: binary
  description: Basic acknowledgement response returned for all commands
  response_pattern: "06 89 01 CC CC 0A"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented separately from direct commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# Power off note: Source states to send power off command twice with short delay between
# UNRESOLVED: exact delay duration not specified
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes

**Command Format (RS-232C/LAN):**
| Field | Size | Value |
|-------|------|-------|
| Header | 1 byte | 21 (operating), 3F (enquiry) |
| Unit ID | 2 bytes | 89 01 (fixed) |
| Command | 2 bytes | varies |
| Data | variable | varies |
| End | 1 byte | 0A (fixed) |

**Acknowledgement Responses:**
- Basic: `06 89 01 CC CC 0A` — confirms command received
- Detailed: `40 89 01 CC CC RR 0A` — provides status value

**LAN Timing Constraints:**
- Controller must respond to PJ_OK with PJREQ within 5 seconds
- Command must be sent within 5 seconds of PJACK
- Projector closes connection 5 seconds after command completion
- RS-232C: Commands ignored if 50ms break in incoming data

**Remote Control Emulation Commands:** The source documents extensive Remote Control Emulation Commands (pages 7-13) that replicate full IR remote functionality. These use hex prefix `21 89 01 52 43 37 33` followed by command bytes. Full enumeration omitted for brevity — see source pages 7-13.

<!-- UNRESOLVED: Model status enquiry returns model identification codes but DLA-V9R specifically not listed in model status table -->
<!-- UNRESOLVED: Lamp hour status / runtime not documented in source -->
<!-- UNRESOLVED: Network settings (IP address, DHCP) not commandable via serial — must be set via projector OSD menu -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manualslib.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://www.manualslib.com/manual/83315/Jvc-Rs-232c.html
retrieved_at: 2026-05-21T00:48:59.488Z
last_checked_at: 2026-06-09T11:18:21.259Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T11:18:21.259Z
matched_actions: 303
action_count: 303
confidence: medium
summary: "All 303 actions matched to source with correct hex codes; transport parameters verified; coverage ratio 96.8% above 0.9 threshold. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DLA-V9R model not individually listed in source; this spec covers the command set documented for this product family"
- "no discrete settable parameters documented separately from direct commands"
- "no unsolicited event notifications documented in source"
- "exact delay duration not specified"
- "no explicit safety warnings or interlock procedures in source"
- "Model status enquiry returns model identification codes but DLA-V9R specifically not listed in model status table"
- "Lamp hour status / runtime not documented in source"
- "Network settings (IP address, DHCP) not commandable via serial — must be set via projector OSD menu"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
