---
spec_id: admin/jvc_kenwood-dla_x570r
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-X570R Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-X570R
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-X570R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2025-02en/
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2025-02en/BONDSYcidajkqv.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2025-02en/BONDSYceulccqp.php
retrieved_at: 2026-05-21T01:26:53.604Z
last_checked_at: 2026-06-09T12:09:39.423Z
generated_at: 2026-06-09T12:09:39.423Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DLA-X570R not explicitly listed in source model list; spec covers X70R-family protocols; confirmation against actual device required"
  - "source does not enumerate discrete settable parameters"
  - "no unsolicited event messages documented in source"
  - "no explicit multi-step macro sequences documented in source"
  - "firmware version compatibility not stated"
  - "DLA-X570R not explicitly in source model list; spec derived from X70R-family documentation"
  - "TCP/IP address assignment (DHCP vs static) depends on projector menu settings; no command-level control documented"
  - "RS-232C cable type required (cross-connected nullmodem) not encoded as commands"
verification:
  verdict: verified
  checked_at: 2026-06-09T12:09:39.423Z
  matched_actions: 262
  action_count: 262
  confidence: medium
  summary: "All 262 spec actions matched source commands; all transport parameters (port 20554, 19200 baud, 8N1 serial) verified verbatim in source documentation. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# JVC KENWOOD DLA-X570R Control Spec

## Summary
JVC KENWOOD DLA-X570R home theater projector supports both RS-232C and TCP/IP control. Direct commands control power, input selection, picture settings, gamma, lens memory, and more. Remote control emulation commands replicate the IR remote. Query commands return power state, input status, gamma settings, and source status via acknowledgement response protocol.

<!-- UNRESOLVED: DLA-X570R not explicitly listed in source model list; spec covers X70R-family protocols; confirmation against actual device required -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 20554  # TCP port stated in source
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
  notes: Send twice with short delay between to switch off

- id: power_on
  label: Power On
  kind: action
  params: []

- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  params: []

- id: input_hdmi2
  label: Input HDMI 2
  kind: action
  params: []

- id: input_component
  label: Input Component
  kind: action
  params: []

- id: input_svideo
  label: Input S-Video
  kind: action
  params: []

- id: input_video
  label: Input Video
  kind: action
  params: []

- id: input_pc
  label: Input PC
  kind: action
  params: []

- id: input_next
  label: Input + (Next Highest)
  kind: action
  params: []

- id: input_prev
  label: Input - (Next Lowest)
  kind: action
  params: []

- id: testpattern_off
  label: Test Pattern Off
  kind: action
  params: []

- id: testpattern_colourbars
  label: Test Pattern Colour Bars
  kind: action
  params: []

- id: testpattern_stairstep_bw
  label: Test Pattern Stairstep (Black/White)
  kind: action
  params: []

- id: testpattern_stairstep_red
  label: Test Pattern Stairstep (Red)
  kind: action
  params: []

- id: testpattern_stairstep_green
  label: Test Pattern Stairstep (Green)
  kind: action
  params: []

- id: testpattern_stairstep_blue
  label: Test Pattern Stairstep (Blue)
  kind: action
  params: []

- id: testpattern_crosshatch_green
  label: Test Pattern Crosshatch (Green)
  kind: action
  params: []

- id: gamma_normal
  label: Gamma Normal
  kind: action
  params: []

- id: gamma_a
  label: Gamma A
  kind: action
  params: []

- id: gamma_b
  label: Gamma B
  kind: action
  params: []

- id: gamma_c
  label: Gamma C
  kind: action
  params: []

- id: gamma_d
  label: Gamma D
  kind: action
  params: []

- id: gamma_custom1
  label: Gamma Custom 1
  kind: action
  params: []

- id: gamma_custom2
  label: Gamma Custom 2
  kind: action
  params: []

- id: gamma_custom3
  label: Gamma Custom 3
  kind: action
  params: []

- id: gamma_value_18
  label: Gamma Value 1.8
  kind: action
  params: []

- id: gamma_value_19
  label: Gamma Value 1.9
  kind: action
  params: []

- id: gamma_value_20
  label: Gamma Value 2.0
  kind: action
  params: []

- id: gamma_value_21
  label: Gamma Value 2.1
  kind: action
  params: []

- id: gamma_value_22
  label: Gamma Value 2.2
  kind: action
  params: []

- id: gamma_value_23
  label: Gamma Value 2.3
  kind: action
  params: []

- id: gamma_value_24
  label: Gamma Value 2.4
  kind: action
  params: []

- id: gamma_value_25
  label: Gamma Value 2.5
  kind: action
  params: []

- id: gamma_value_26
  label: Gamma Value 2.6
  kind: action
  params: []

- id: offtimer_off
  label: Off Timer Off
  kind: action
  params: []

- id: offtimer_1hr
  label: Off Timer Set 1 Hour
  kind: action
  params: []

- id: offtimer_2hr
  label: Off Timer Set 2 Hours
  kind: action
  params: []

- id: offtimer_3hr
  label: Off Timer Set 3 Hours
  kind: action
  params: []

- id: offtimer_4hr
  label: Off Timer Set 4 Hours
  kind: action
  params: []

- id: lamppower_normal
  label: Lamp Power Normal
  kind: action
  params: []

- id: lamppower_high
  label: Lamp Power High
  kind: action
  params: []

- id: trigger_off
  label: Trigger Off
  kind: action
  params: []

- id: trigger_on_power
  label: Trigger On (Power)
  kind: action
  params: []

- id: trigger_on_anamorphic
  label: Trigger On (Anamorphic)
  kind: action
  params: []

- id: cmd_off
  label: Clear Motion Drive Off
  kind: action
  params: []

- id: cmd_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  params: []

- id: cmd_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  params: []

- id: cmd_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  params: []

- id: cmd_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  params: []

- id: cmd_inv_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  params: []

- id: anamorphic_off
  label: Anamorphic Off
  kind: action
  params: []

- id: anamorphic_a
  label: Anamorphic A
  kind: action
  params: []

- id: anamorphic_b
  label: Anamorphic B
  kind: action
  params: []

- id: picturemode_film
  label: Picture Mode Film
  kind: action
  params: []

- id: picturemode_cinema
  label: Picture Mode Cinema
  kind: action
  params: []

- id: picturemode_animation
  label: Picture Mode Animation
  kind: action
  params: []

- id: picturemode_natural
  label: Picture Mode Natural
  kind: action
  params: []

- id: picturemode_stage
  label: Picture Mode Stage
  kind: action
  params: []

- id: picturemode_thx
  label: Picture Mode THX
  kind: action
  params: []

- id: picturemode_3d
  label: Picture Mode 3D
  kind: action
  params: []

- id: picturemode_user1
  label: Picture Mode User 1
  kind: action
  params: []

- id: picturemode_user2
  label: Picture Mode User 2
  kind: action
  params: []

- id: picturemode_user3
  label: Picture Mode User 3
  kind: action
  params: []

- id: picturemode_user4
  label: Picture Mode User 4
  kind: action
  params: []

- id: picturemode_user5
  label: Picture Mode User 5
  kind: action
  params: []

- id: colourprofile_off
  label: Colour Profile Off
  kind: action
  params: []

- id: colourprofile_film1
  label: Colour Profile Film 1
  kind: action
  params: []

- id: colourprofile_film2
  label: Colour Profile Film 2
  kind: action
  params: []

- id: colourprofile_standard
  label: Colour Profile Standard
  kind: action
  params: []

- id: colourprofile_cinema1
  label: Colour Profile Cinema 1
  kind: action
  params: []

- id: colourprofile_cinema2
  label: Colour Profile Cinema 2
  kind: action
  params: []

- id: colourprofile_anime1
  label: Colour Profile Anime 1
  kind: action
  params: []

- id: colourprofile_anime2
  label: Colour Profile Anime 2
  kind: action
  params: []

- id: colourprofile_video
  label: Colour Profile Video
  kind: action
  params: []

- id: colourprofile_vivid
  label: Colour Profile Vivid
  kind: action
  params: []

- id: colourprofile_adobe
  label: Colour Profile Adobe
  kind: action
  params: []

- id: colourprofile_stage
  label: Colour Profile Stage
  kind: action
  params: []

- id: colourprofile_3d
  label: Colour Profile 3D
  kind: action
  params: []

- id: colourprofile_thx
  label: Colour Profile THX
  kind: action
  params: []

- id: format_3d_off
  label: 3D Format Off (2D)
  kind: action
  params: []

- id: format_3d_auto
  label: 3D Format Auto
  kind: action
  params: []

- id: format_3d_frame_packing
  label: 3D Format Frame Packing
  kind: action
  params: []

- id: format_3d_side_by_side
  label: 3D Format Side by Side
  kind: action
  params: []

- id: format_3d_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  params: []

- id: convert_2d_to_3d_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []

- id: convert_2d_to_3d_on
  label: 2D to 3D Conversion On
  kind: action
  params: []

- id: subtitle_correction_off
  label: 3D Subtitle Correction Off
  kind: action
  params: []

- id: subtitle_correction_on
  label: 3D Subtitle Correction On
  kind: action
  params: []

- id: lensmem_save_1
  label: Lens Memory Save Memory 1
  kind: action
  params: []

- id: lensmem_save_2
  label: Lens Memory Save Memory 2
  kind: action
  params: []

- id: lensmem_save_3
  label: Lens Memory Save Memory 3
  kind: action
  params: []

- id: lensmem_select_1
  label: Lens Memory Select Memory 1
  kind: action
  params: []

- id: lensmem_select_2
  label: Lens Memory Select Memory 2
  kind: action
  params: []

- id: lensmem_select_3
  label: Lens Memory Select Memory 3
  kind: action
  params: []

- id: null_command
  label: Null Command (Test)
  kind: action
  params: []
  notes: Use to check communication

- id: aspect_16x9
  label: Aspect 16:9
  kind: action
  params: []

- id: aspect_4x3
  label: Aspect 4:3
  kind: action
  params: []

- id: aspect_zoom
  label: Aspect Zoom
  kind: action
  params: []

- id: back
  label: Back
  kind: action
  params: []

- id: menu
  label: Menu (Toggle)
  kind: action
  params: []

- id: ok
  label: OK
  kind: action
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []

- id: brightness_up
  label: Brightness +
  kind: action
  params: []

- id: brightness_down
  label: Brightness -
  kind: action
  params: []

- id: contrast_up
  label: Contrast +
  kind: action
  params: []

- id: contrast_down
  label: Contrast -
  kind: action
  params: []

- id: colour_up
  label: Colour +
  kind: action
  params: []

- id: colour_down
  label: Colour -
  kind: action
  params: []

- id: sharpness_up
  label: Sharpness +
  kind: action
  params: []

- id: sharpness_down
  label: Sharpness -
  kind: action
  params: []

- id: tint_up
  label: Tint +
  kind: action
  params: []

- id: tint_down
  label: Tint -
  kind: action
  params: []

- id: lens_focus_up
  label: Lens Focus +
  kind: action
  params: []

- id: lens_focus_down
  label: Lens Focus -
  kind: action
  params: []

- id: lens_zoom_in
  label: Lens Zoom In
  kind: action
  params: []

- id: lens_zoom_out
  label: Lens Zoom Out
  kind: action
  params: []

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  params: []

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  params: []

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  params: []

- id: lens_aperture_up
  label: Lens Aperture +
  kind: action
  params: []

- id: lens_aperture_down
  label: Lens Aperture -
  kind: action
  params: []

- id: keystone_v_up
  label: Keystone Vertical +
  kind: action
  params: []

- id: keystone_v_down
  label: Keystone Vertical -
  kind: action
  params: []

- id: keystone_h_up
  label: Keystone Horizontal +
  kind: action
  params: []

- id: keystone_h_down
  label: Keystone Horizontal -
  kind: action
  params: []

- id: pos_vertical_up
  label: Vertical Position +
  kind: action
  params: []

- id: pos_vertical_down
  label: Vertical Position -
  kind: action
  params: []

- id: pos_horizontal_up
  label: Horizontal Position +
  kind: action
  params: []

- id: pos_horizontal_down
  label: Horizontal Position -
  kind: action
  params: []
- id: remote_code_a
  label: Remote Code A
  kind: action
  params: []
  notes: Sets projector to respond to infrared remote code 73 (default)

- id: remote_code_b
  label: Remote Code B
  kind: action
  params: []
  notes: Sets projector to respond to infrared remote code 63

- id: anamorphic_cycle
  label: Anamorphic Cycle
  kind: action
  params: []

- id: advanced_menu
  label: Advanced Menu
  kind: action
  params: []

- id: aspect_cycle
  label: Aspect Cycle
  kind: action
  params: []

- id: aspect_pc_auto
  label: Aspect PC Auto
  kind: action
  params: []

- id: aspect_pc_full
  label: Aspect PC Full
  kind: action
  params: []

- id: aspect_pc_just
  label: Aspect PC Just
  kind: action
  params: []

- id: auto_align
  label: Auto Align (PC Input)
  kind: action
  params: []

- id: auto_lens_centre
  label: Auto Lens Centre
  kind: action
  params: []

- id: bnr_off
  label: Block Noise Reduction Off
  kind: action
  params: []

- id: bnr_on
  label: Block Noise Reduction On
  kind: action
  params: []

- id: bright_level_down
  label: Bright Level -
  kind: action
  params: []

- id: bright_level_up
  label: Bright Level +
  kind: action
  params: []

- id: brightness_adj
  label: Brightness Adjustment Bar Toggle
  kind: action
  params: []

- id: cec_off
  label: CEC Off
  kind: action
  params: []

- id: cec_on
  label: CEC On
  kind: action
  params: []

- id: cmd_cycle
  label: Clear Motion Drive Cycle
  kind: action
  params: []

- id: colour_adj
  label: Colour Adjustment Bar Toggle
  kind: action
  params: []

- id: colour_mgmt_off
  label: Colour Management Off
  kind: action
  params: []

- id: colour_mgmt_custom1
  label: Colour Management Custom 1
  kind: action
  params: []

- id: colour_mgmt_custom2
  label: Colour Management Custom 2
  kind: action
  params: []

- id: colour_mgmt_custom3
  label: Colour Management Custom 3
  kind: action
  params: []

- id: colour_mgmt_cycle
  label: Colour Management Cycle
  kind: action
  params: []

- id: colour_profile_cycle
  label: Colour Profile Cycle
  kind: action
  params: []

- id: colour_space_cycle
  label: Colour Space Cycle
  kind: action
  params: []

- id: colour_temp_5800k
  label: Colour Temperature 5800K
  kind: action
  params: []

- id: colour_temp_6500k
  label: Colour Temperature 6500K
  kind: action
  params: []

- id: colour_temp_7500k
  label: Colour Temperature 7500K
  kind: action
  params: []

- id: colour_temp_9300k
  label: Colour Temperature 9300K
  kind: action
  params: []

- id: colour_temp_custom1
  label: Colour Temperature Custom 1
  kind: action
  params: []

- id: colour_temp_custom2
  label: Colour Temperature Custom 2
  kind: action
  params: []

- id: colour_temp_custom3
  label: Colour Temperature Custom 3
  kind: action
  params: []

- id: colour_temp_high_bright
  label: Colour Temperature High Bright
  kind: action
  params: []

- id: colour_temp_cycle
  label: Colour Temperature Cycle
  kind: action
  params: []

- id: colour_temp_gain_red_up
  label: Colour Temperature Gain Red +
  kind: action
  params: []

- id: colour_temp_gain_red_down
  label: Colour Temperature Gain Red -
  kind: action
  params: []

- id: colour_temp_gain_green_up
  label: Colour Temperature Gain Green +
  kind: action
  params: []

- id: colour_temp_gain_green_down
  label: Colour Temperature Gain Green -
  kind: action
  params: []

- id: colour_temp_gain_blue_up
  label: Colour Temperature Gain Blue +
  kind: action
  params: []

- id: colour_temp_gain_blue_down
  label: Colour Temperature Gain Blue -
  kind: action
  params: []

- id: colour_temp_offset_red_up
  label: Colour Temperature Offset Red +
  kind: action
  params: []

- id: colour_temp_offset_red_down
  label: Colour Temperature Offset Red -
  kind: action
  params: []

- id: colour_temp_offset_green_up
  label: Colour Temperature Offset Green +
  kind: action
  params: []

- id: colour_temp_offset_green_down
  label: Colour Temperature Offset Green -
  kind: action
  params: []

- id: colour_temp_offset_blue_up
  label: Colour Temperature Offset Blue +
  kind: action
  params: []

- id: colour_temp_offset_blue_down
  label: Colour Temperature Offset Blue -
  kind: action
  params: []

- id: contrast_adj
  label: Contrast Adjustment Bar Toggle
  kind: action
  params: []

- id: cti_off
  label: Colour Transient Improvement Off
  kind: action
  params: []

- id: cti_low
  label: Colour Transient Improvement Low
  kind: action
  params: []

- id: cti_middle
  label: Colour Transient Improvement Middle
  kind: action
  params: []

- id: cti_high
  label: Colour Transient Improvement High
  kind: action
  params: []

- id: dark_level_down
  label: Dark Level -
  kind: action
  params: []

- id: dark_level_up
  label: Dark Level +
  kind: action
  params: []

- id: detail_enhance_down
  label: Detail Enhance -
  kind: action
  params: []

- id: detail_enhance_up
  label: Detail Enhance +
  kind: action
  params: []

- id: gamma_cycle
  label: Gamma Cycle
  kind: action
  params: []

- id: hide_off
  label: Hide Off
  kind: action
  params: []

- id: hide_on
  label: Hide On
  kind: action
  params: []

- id: hide_toggle
  label: Hide Toggle
  kind: action
  params: []

- id: information
  label: Information Menu
  kind: action
  params: []

- id: isf_day
  label: ISF Day
  kind: action
  params: []

- id: isf_night
  label: ISF Night
  kind: action
  params: []

- id: isf_off
  label: ISF Off
  kind: action
  params: []

- id: isf_on
  label: ISF On
  kind: action
  params: []

- id: lens_aperture_adj
  label: Lens Aperture Adjustment
  kind: action
  params: []

- id: lens_aperture_1
  label: Lens Aperture 1
  kind: action
  params: []

- id: lens_aperture_2
  label: Lens Aperture 2
  kind: action
  params: []

- id: lens_aperture_3
  label: Lens Aperture 3
  kind: action
  params: []

- id: lens_control_cycle
  label: Lens Control Cycle
  kind: action
  params: []

- id: lens_memory_cycle
  label: Lens Memory Page Cycle
  kind: action
  params: []

- id: mask_bottom_down
  label: Mask Bottom -
  kind: action
  params: []

- id: mask_bottom_up
  label: Mask Bottom +
  kind: action
  params: []

- id: mask_left_down
  label: Mask Left -
  kind: action
  params: []

- id: mask_left_up
  label: Mask Left +
  kind: action
  params: []

- id: mask_right_down
  label: Mask Right -
  kind: action
  params: []

- id: mask_right_up
  label: Mask Right +
  kind: action
  params: []

- id: mask_top_down
  label: Mask Top -
  kind: action
  params: []

- id: mask_top_up
  label: Mask Top +
  kind: action
  params: []

- id: menu_position
  label: Menu Position
  kind: action
  params: []

- id: mnr_down
  label: Mosquito Noise Reduction -
  kind: action
  params: []

- id: mnr_up
  label: Mosquito Noise Reduction +
  kind: action
  params: []

- id: nr_toggle
  label: Noise Reduction Toggle
  kind: action
  params: []

- id: phase_down
  label: Phase (PC Input) -
  kind: action
  params: []

- id: phase_up
  label: Phase (PC Input) +
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust Menu
  kind: action
  params: []

- id: picture_mode_user_cycle
  label: Picture Mode User Cycle
  kind: action
  params: []

- id: picture_tone_blue_down
  label: Picture Tone Blue -
  kind: action
  params: []

- id: picture_tone_blue_up
  label: Picture Tone Blue +
  kind: action
  params: []

- id: picture_tone_green_down
  label: Picture Tone Green -
  kind: action
  params: []

- id: picture_tone_green_up
  label: Picture Tone Green +
  kind: action
  params: []

- id: picture_tone_red_down
  label: Picture Tone Red -
  kind: action
  params: []

- id: picture_tone_red_up
  label: Picture Tone Red +
  kind: action
  params: []

- id: picture_tone_white_down
  label: Picture Tone White -
  kind: action
  params: []

- id: picture_tone_white_up
  label: Picture Tone White +
  kind: action
  params: []

- id: picturemode_dynamic
  label: Picture Mode Dynamic
  kind: action
  params: []

- id: pixel_shift_h_blue_down
  label: Pixel Shift Horizontal Blue -
  kind: action
  params: []

- id: pixel_shift_h_blue_up
  label: Pixel Shift Horizontal Blue +
  kind: action
  params: []

- id: pixel_shift_h_green_down
  label: Pixel Shift Horizontal Green -
  kind: action
  params: []

- id: pixel_shift_h_green_up
  label: Pixel Shift Horizontal Green +
  kind: action
  params: []

- id: pixel_shift_h_red_down
  label: Pixel Shift Horizontal Red -
  kind: action
  params: []

- id: pixel_shift_h_red_up
  label: Pixel Shift Horizontal Red +
  kind: action
  params: []

- id: pixel_shift_v_blue_down
  label: Pixel Shift Vertical Blue -
  kind: action
  params: []

- id: pixel_shift_v_blue_up
  label: Pixel Shift Vertical Blue +
  kind: action
  params: []

- id: pixel_shift_v_green_down
  label: Pixel Shift Vertical Green -
  kind: action
  params: []

- id: pixel_shift_v_green_up
  label: Pixel Shift Vertical Green +
  kind: action
  params: []

- id: pixel_shift_v_red_down
  label: Pixel Shift Vertical Red -
  kind: action
  params: []

- id: pixel_shift_v_red_up
  label: Pixel Shift Vertical Red +
  kind: action
  params: []

- id: rnr_down
  label: Random Noise Reduction -
  kind: action
  params: []

- id: rnr_up
  label: Random Noise Reduction +
  kind: action
  params: []

- id: screen_adjust_off
  label: Screen Adjust Off
  kind: action
  params: []

- id: screen_adjust_a
  label: Screen Adjust A
  kind: action
  params: []

- id: screen_adjust_b
  label: Screen Adjust B
  kind: action
  params: []

- id: screen_adjust_c
  label: Screen Adjust C
  kind: action
  params: []

- id: sharpness_adj
  label: Sharpness Adjustment Bar Toggle
  kind: action
  params: []

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_off
  label: Shutter Sync Off
  kind: action
  params: []
  notes: Un-synchronises shutter with Hide function

- id: shutter_on
  label: Shutter Sync On
  kind: action
  params: []
  notes: Synchronises shutter with Hide function

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: test_pattern_cycle
  label: Test Pattern Cycle
  kind: action
  params: []

- id: threedsetting
  label: "3D Setting Menu"
  kind: action
  params: []

- id: threedformat_cycle
  label: "3D Format Cycle"
  kind: action
  params: []

- id: thx_bright
  label: THX Bright
  kind: action
  params: []

- id: thx_dark
  label: THX Dark
  kind: action
  params: []

- id: thx_off
  label: THX Off
  kind: action
  params: []

- id: thx_on
  label: THX On
  kind: action
  params: []

- id: tint_adj
  label: Tint Adjustment Bar Toggle
  kind: action
  params: []

- id: tracking_down
  label: Tracking (PC Input) -
  kind: action
  params: []

- id: tracking_up
  label: Tracking (PC Input) +
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power Status
  kind: feedback
  params: []
  enum:
    - "30"  # Standby
    - "31"  # Power On
    - "32"  # Cooling
    - "34"  # Emergency

- id: input_state
  label: Input Status
  kind: feedback
  params: []
  enum:
    - "30"  # S-Video
    - "31"  # Video
    - "32"  # Component
    - "33"  # PC
    - "36"  # HDMI 1
    - "37"  # HDMI 2

- id: gamma_table_state
  label: Gamma Table Status
  kind: feedback
  params: []
  enum:
    - "30"  # Normal
    - "31"  # Gamma A
    - "32"  # Gamma B
    - "33"  # Gamma C
    - "34"  # Custom 1
    - "35"  # Custom 2
    - "36"  # Custom 3

- id: gamma_value_state
  label: Gamma Value Status
  kind: feedback
  params: []
  enum:
    - "30"  # 1.8
    - "31"  # 1.9
    - "32"  # 2.0
    - "33"  # 2.1
    - "34"  # 2.2
    - "35"  # 2.3
    - "36"  # 2.4
    - "37"  # 2.5
    - "38"  # 2.6

- id: source_state
  label: Source Status
  kind: feedback
  params: []
  enum:
    - "00"  # JVC Logo displayed
    - "30"  # No signal or signal out of range
    - "31"  # Signal input correctly

- id: model_state
  label: Model Status
  kind: feedback
  params: []

- id: ack_power
  label: Power Acknowledgement
  kind: feedback
  params: []
  notes: Returns 06 89 01 50 57 0A on success

- id: ack_input
  label: Input Change Acknowledgement
  kind: feedback
  params: []
  notes: Returns 06 89 01 49 50 0A on success

- id: ack_testpattern
  label: Test Pattern Acknowledgement
  kind: feedback
  params: []
  notes: Returns 06 89 01 54 53 0A on success

- id: ack_gamma
  label: Gamma Acknowledgement
  kind: feedback
  params: []
  notes: Returns 06 89 01 47 54 0A (table) or 06 89 01 47 50 0A (value)

- id: ack_remote
  label: Remote Control Emulation Acknowledgement
  kind: feedback
  params: []
  notes: Returns 06 89 01 52 43 0A on success

- id: ack_test
  label: Null Command Acknowledgement
  kind: feedback
  params: []
  notes: Returns 06 89 01 00 00 0A on success
```

## Variables
```yaml
# UNRESOLVED: source does not enumerate discrete settable parameters
# All adjustable image parameters are accessible via remote control emulation commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event messages documented in source
# Projector does not send unsolicited notifications; all responses are reply-based
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Direct commands (header `21`) control the projector directly. Remote control emulation commands (header `52 43`) emulate the IR remote and may produce on-screen confirmation messages. Where both exist, direct command is preferred unless confirmation display is needed.

LAN connection requires TCP handshake: connect to port 20554, receive `PJ_OK`, respond `PJREQ` within 5s, receive `PJACK`, then send command within 5s. Connection closes after 5s of inactivity.

RS-232C uses 19200bps 8N1 binary protocol with 7 or 10 byte commands. Projector ignores unrecognized commands and discards data on 50ms breaks.

Power Off requires sending the command twice with short delay.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: DLA-X570R not explicitly in source model list; spec derived from X70R-family documentation -->
<!-- UNRESOLVED: TCP/IP address assignment (DHCP vs static) depends on projector menu settings; no command-level control documented -->
<!-- UNRESOLVED: RS-232C cable type required (cross-connected nullmodem) not encoded as commands -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2025-02en/
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2025-02en/BONDSYcidajkqv.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2025-02en/BONDSYceulccqp.php
retrieved_at: 2026-05-21T01:26:53.604Z
last_checked_at: 2026-06-09T12:09:39.423Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T12:09:39.423Z
matched_actions: 262
action_count: 262
confidence: medium
summary: "All 262 spec actions matched source commands; all transport parameters (port 20554, 19200 baud, 8N1 serial) verified verbatim in source documentation. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DLA-X570R not explicitly listed in source model list; spec covers X70R-family protocols; confirmation against actual device required"
- "source does not enumerate discrete settable parameters"
- "no unsolicited event messages documented in source"
- "no explicit multi-step macro sequences documented in source"
- "firmware version compatibility not stated"
- "DLA-X570R not explicitly in source model list; spec derived from X70R-family documentation"
- "TCP/IP address assignment (DHCP vs static) depends on projector menu settings; no command-level control documented"
- "RS-232C cable type required (cross-connected nullmodem) not encoded as commands"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
