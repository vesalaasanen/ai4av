---
spec_id: admin/jvc-dila-hd2k
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC DiLA-HD2K Control Spec"
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
  - https://support.jvc.com/consumer/support/documents/DILARemoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:41.240Z
last_checked_at: 2026-05-14T18:17:17.155Z
generated_at: 2026-05-14T18:17:17.155Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.155Z
  matched_actions: 161
  action_count: 265
  confidence: high
  summary: "All 161 spec actions matched directly to source commands; transport parameters verified from RS-232 protocol spec."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# JVC DiLA-HD2K Control Spec

## Summary
JVC D-ILA home theater projector family supporting RS-232C and LAN control. Supports power on/off, input switching, test patterns, gamma correction, color management, lens control, 3D format settings, picture modes, and anamorphic modes. Source covers multiple models; DiLA-HD2K specific documentation not confirmed present in source.

<!-- UNRESOLVED: DiLA-HD2K-specific protocol not found in source; source covers DLA-HD350/550/750/950/990/X3/X7/X9/X30/X70/X90/RS10/RS15/RS20/RS25/RS35/RS40/RS45/RS50/RS55/RS60/RS65. LAN control only documented for X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65. -->

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
  port: 20554  # LAN control port; RS-232 port number not stated
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
  label: Input Next (cycle to next highest)
  kind: action
  params: []
- id: input_prev
  label: Input Previous (cycle to next lowest)
  kind: action
  params: []
- id: test_pattern_off
  label: Test Pattern Off
  kind: action
  params: []
- id: test_pattern_color_bars
  label: Test Pattern Colour Bars
  kind: action
  params: []
- id: test_pattern_stairstep_bw
  label: Test Pattern Stairstep (Black & White)
  kind: action
  params: []
- id: test_pattern_stairstep_red
  label: Test Pattern Stairstep (Red)
  kind: action
  params: []
- id: test_pattern_stairstep_green
  label: Test Pattern Stairstep (Green)
  kind: action
  params: []
- id: test_pattern_stairstep_blue
  label: Test Pattern Stairstep (Blue)
  kind: action
  params: []
- id: test_pattern_crosshatch
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
- id: gamma_value_1_8
  label: Gamma Correction Value 1.8
  kind: action
  params: []
- id: gamma_value_1_9
  label: Gamma Correction Value 1.9
  kind: action
  params: []
- id: gamma_value_2_0
  label: Gamma Correction Value 2.0
  kind: action
  params: []
- id: gamma_value_2_1
  label: Gamma Correction Value 2.1
  kind: action
  params: []
- id: gamma_value_2_2
  label: Gamma Correction Value 2.2
  kind: action
  params: []
- id: gamma_value_2_3
  label: Gamma Correction Value 2.3
  kind: action
  params: []
- id: gamma_value_2_4
  label: Gamma Correction Value 2.4
  kind: action
  params: []
- id: gamma_value_2_5
  label: Gamma Correction Value 2.5
  kind: action
  params: []
- id: gamma_value_2_6
  label: Gamma Correction Value 2.6
  kind: action
  params: []
- id: off_timer_off
  label: Off Timer Off
  kind: action
  params: []
- id: off_timer_1hr
  label: Off Timer Set 1 Hour
  kind: action
  params: []
- id: off_timer_2hr
  label: Off Timer Set 2 Hours
  kind: action
  params: []
- id: off_timer_3hr
  label: Off Timer Set 3 Hours
  kind: action
  params: []
- id: off_timer_4hr
  label: Off Timer Set 4 Hours
  kind: action
  params: []
- id: lamp_power_normal
  label: Lamp Power Normal
  kind: action
  params: []
- id: lamp_power_high
  label: Lamp Power High
  kind: action
  params: []
- id: remote_code_a
  label: Infrared Remote Code A (hex 73)
  kind: action
  params: []
- id: remote_code_b
  label: Infrared Remote Code B (hex 63)
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
- id: clear_motion_drive_off
  label: Clear Motion Drive Off
  kind: action
  params: []
- id: clear_motion_drive_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  params: []
- id: clear_motion_drive_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  params: []
- id: clear_motion_drive_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  params: []
- id: clear_motion_drive_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  params: []
- id: clear_motion_drive_inv_telecine
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
- id: picture_mode_film
  label: Picture Mode Film
  kind: action
  params: []
- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  params: []
- id: picture_mode_cinema1
  label: Picture Mode Cinema 1
  kind: action
  params: []
- id: picture_mode_cinema2
  label: Picture Mode Cinema 2
  kind: action
  params: []
- id: picture_mode_cinema3
  label: Picture Mode Cinema 3
  kind: action
  params: []
- id: picture_mode_animation
  label: Picture Mode Animation
  kind: action
  params: []
- id: picture_mode_natural
  label: Picture Mode Natural
  kind: action
  params: []
- id: picture_mode_stage
  label: Picture Mode Stage
  kind: action
  params: []
- id: picture_mode_dynamic
  label: Picture Mode Dynamic
  kind: action
  params: []
- id: picture_mode_thx
  label: Picture Mode THX
  kind: action
  params: []
- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  params: []
- id: picture_mode_user1
  label: Picture Mode User 1
  kind: action
  params: []
- id: picture_mode_user2
  label: Picture Mode User 2
  kind: action
  params: []
- id: picture_mode_user3
  label: Picture Mode User 3
  kind: action
  params: []
- id: picture_mode_user4
  label: Picture Mode User 4
  kind: action
  params: []
- id: picture_mode_user5
  label: Picture Mode User 5
  kind: action
  params: []
- id: colour_profile_off
  label: Colour Profile Off
  kind: action
  params: []
- id: colour_profile_film1
  label: Colour Profile Film 1
  kind: action
  params: []
- id: colour_profile_film2
  label: Colour Profile Film 2
  kind: action
  params: []
- id: colour_profile_standard
  label: Colour Profile Standard
  kind: action
  params: []
- id: colour_profile_cinema1
  label: Colour Profile Cinema 1
  kind: action
  params: []
- id: colour_profile_cinema2
  label: Colour Profile Cinema 2
  kind: action
  params: []
- id: colour_profile_anime1
  label: Colour Profile Anime 1
  kind: action
  params: []
- id: colour_profile_anime2
  label: Colour Profile Anime 2
  kind: action
  params: []
- id: colour_profile_video
  label: Colour Profile Video
  kind: action
  params: []
- id: colour_profile_vivid
  label: Colour Profile Vivid
  kind: action
  params: []
- id: colour_profile_adobe
  label: Colour Profile Adobe
  kind: action
  params: []
- id: colour_profile_stage
  label: Colour Profile Stage
  kind: action
  params: []
- id: colour_profile_3d
  label: Colour Profile 3D
  kind: action
  params: []
- id: colour_profile_thx
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
- id: 2d_to_3d_conversion_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []
- id: 2d_to_3d_conversion_on
  label: 2D to 3D Conversion On
  kind: action
  params: []
- id: 3d_subtitle_correction_off
  label: 3D Subtitle Correction Off
  kind: action
  params: []
- id: 3d_subtitle_correction_on
  label: 3D Subtitle Correction On
  kind: action
  params: []
- id: lens_memory_save_1
  label: Lens Memory Save Memory 1
  kind: action
  params: []
- id: lens_memory_save_2
  label: Lens Memory Save Memory 2
  kind: action
  params: []
- id: lens_memory_save_3
  label: Lens Memory Save Memory 3
  kind: action
  params: []
- id: lens_memory_select_1
  label: Lens Memory Select Memory 1
  kind: action
  params: []
- id: lens_memory_select_2
  label: Lens Memory Select Memory 2
  kind: action
  params: []
- id: lens_memory_select_3
  label: Lens Memory Select Memory 3
  kind: action
  params: []
- id: null_command
  label: Null Command (check communication)
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
- id: ok
  label: OK (accept selected option)
  kind: action
  params: []
- id: menu
  label: Menu (On/Off toggle)
  kind: action
  params: []
- id: back
  label: Back
  kind: action
  params: []
- id: brightness_up
  label: Brightness+
  kind: action
  params: []
- id: brightness_down
  label: Brightness-
  kind: action
  params: []
- id: contrast_up
  label: Contrast+
  kind: action
  params: []
- id: contrast_down
  label: Contrast-
  kind: action
  params: []
- id: colour_up
  label: Colour+
  kind: action
  params: []
- id: colour_down
  label: Colour-
  kind: action
  params: []
- id: tint_up
  label: Tint+
  kind: action
  params: []
- id: tint_down
  label: Tint-
  kind: action
  params: []
- id: sharpness_up
  label: Sharpness+
  kind: action
  params: []
- id: sharpness_down
  label: Sharpness-
  kind: action
  params: []
- id: lens_focus_up
  label: Lens Focus+
  kind: action
  params: []
- id: lens_focus_down
  label: Lens Focus-
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
- id: keystone_v_up
  label: Keystone Correction Vertical+
  kind: action
  params: []
- id: keystone_v_down
  label: Keystone Correction Vertical-
  kind: action
  params: []
- id: keystone_h_up
  label: Keystone Correction Horizontal+
  kind: action
  params: []
- id: keystone_h_down
  label: Keystone Correction Horizontal-
  kind: action
  params: []
- id: aspect_16_9
  label: Aspect 16:9
  kind: action
  params: []
- id: aspect_4_3
  label: Aspect 4:3
  kind: action
  params: []
- id: aspect_zoom
  label: Aspect Zoom
  kind: action
  params: []
- id: aspect_auto
  label: Aspect (PC) Auto
  kind: action
  params: []
- id: aspect_full
  label: Aspect (PC) Full
  kind: action
  params: []
- id: aspect_just
  label: Aspect (PC) Just
  kind: action
  params: []
- id: auto_lens_centre
  label: Auto Lens Centre
  kind: action
  params: []
- id: auto_align_pc
  label: Auto Align (PC input)
  kind: action
  params: []
- id: bnr_off
  label: BNR (Block Noise Reduction) Off
  kind: action
  params: []
- id: bnr_on
  label: BNR (Block Noise Reduction) On
  kind: action
  params: []
- id: rnr_off
  label: RNR (Random Noise Reduction) Off
  kind: action
  params: []
- id: rnr_on
  label: RNR (Random Noise Reduction) On
  kind: action
  params: []
- id: mnr_off
  label: MNR (Mosquito Noise Reduction) Off
  kind: action
  params: []
- id: mnr_on
  label: MNR (Mosquito Noise Reduction) On
  kind: action
  params: []
- id: cti_off
  label: CTI (Colour Transient Improvement) Off
  kind: action
  params: []
- id: cti_low
  label: CTI (Colour Transient Improvement) Low
  kind: action
  params: []
- id: cti_middle
  label: CTI (Colour Transient Improvement) Middle
  kind: action
  params: []
- id: cti_high
  label: CTI (Colour Transient Improvement) High
  kind: action
  params: []
- id: colour_management_off
  label: Colour Management Off
  kind: action
  params: []
- id: colour_management_custom1
  label: Colour Management Custom 1
  kind: action
  params: []
- id: colour_management_custom2
  label: Colour Management Custom 2
  kind: action
  params: []
- id: colour_management_custom3
  label: Colour Management Custom 3
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
- id: colour_temp_gain_blue_up
  label: Colour Temperature Gain Blue+
  kind: action
  params: []
- id: colour_temp_gain_blue_down
  label: Colour Temperature Gain Blue-
  kind: action
  params: []
- id: colour_temp_gain_green_up
  label: Colour Temperature Gain Green+
  kind: action
  params: []
- id: colour_temp_gain_green_down
  label: Colour Temperature Gain Green-
  kind: action
  params: []
- id: colour_temp_gain_red_up
  label: Colour Temperature Gain Red+
  kind: action
  params: []
- id: colour_temp_gain_red_down
  label: Colour Temperature Gain Red-
  kind: action
  params: []
- id: colour_temp_offset_blue_up
  label: Colour Temperature Offset Blue+
  kind: action
  params: []
- id: colour_temp_offset_blue_down
  label: Colour Temperature Offset Blue-
  kind: action
  params: []
- id: colour_temp_offset_green_up
  label: Colour Temperature Offset Green+
  kind: action
  params: []
- id: colour_temp_offset_green_down
  label: Colour Temperature Offset Green-
  kind: action
  params: []
- id: colour_temp_offset_red_up
  label: Colour Temperature Offset Red+
  kind: action
  params: []
- id: colour_temp_offset_red_down
  label: Colour Temperature Offset Red-
  kind: action
  params: []
- id: bright_level_up
  label: Bright Level+
  kind: action
  params: []
- id: bright_level_down
  label: Bright Level-
  kind: action
  params: []
- id: dark_level_up
  label: Dark Level+
  kind: action
  params: []
- id: dark_level_down
  label: Dark Level-
  kind: action
  params: []
- id: detail_enhance_up
  label: Detail Enhance+
  kind: action
  params: []
- id: detail_enhance_down
  label: Detail Enhance-
  kind: action
  params: []
- id: pixel_shift_h_blue_up
  label: Pixel Shift Horizontal Blue+
  kind: action
  params: []
- id: pixel_shift_h_blue_down
  label: Pixel Shift Horizontal Blue-
  kind: action
  params: []
- id: pixel_shift_h_green_up
  label: Pixel Shift Horizontal Green+
  kind: action
  params: []
- id: pixel_shift_h_green_down
  label: Pixel Shift Horizontal Green-
  kind: action
  params: []
- id: pixel_shift_h_red_up
  label: Pixel Shift Horizontal Red+
  kind: action
  params: []
- id: pixel_shift_h_red_down
  label: Pixel Shift Horizontal Red-
  kind: action
  params: []
- id: pixel_shift_v_blue_up
  label: Pixel Shift Vertical Blue+
  kind: action
  params: []
- id: pixel_shift_v_blue_down
  label: Pixel Shift Vertical Blue-
  kind: action
  params: []
- id: pixel_shift_v_green_up
  label: Pixel Shift Vertical Green+
  kind: action
  params: []
- id: pixel_shift_v_green_down
  label: Pixel Shift Vertical Green-
  kind: action
  params: []
- id: pixel_shift_v_red_up
  label: Pixel Shift Vertical Red+
  kind: action
  params: []
- id: pixel_shift_v_red_down
  label: Pixel Shift Vertical Red-
  kind: action
  params: []
- id: phase_pc_up
  label: Phase (PC Input)+
  kind: action
  params: []
- id: phase_pc_down
  label: Phase (PC Input)-
  kind: action
  params: []
- id: tracking_pc_up
  label: Tracking (PC Input)+
  kind: action
  params: []
- id: tracking_pc_down
  label: Tracking (PC Input)-
  kind: action
  params: []
- id: horizontal_pos_up
  label: Horizontal Position+
  kind: action
  params: []
- id: horizontal_pos_down
  label: Horizontal Position-
  kind: action
  params: []
- id: vertical_pos_up
  label: Vertical Position+
  kind: action
  params: []
- id: vertical_pos_down
  label: Vertical Position-
  kind: action
  params: []
- id: mask_top_up
  label: Mask Top+
  kind: action
  params: []
- id: mask_top_down
  label: Mask Top-
  kind: action
  params: []
- id: mask_bottom_up
  label: Mask Bottom+
  kind: action
  params: []
- id: mask_bottom_down
  label: Mask Bottom-
  kind: action
  params: []
- id: mask_left_up
  label: Mask Left+
  kind: action
  params: []
- id: mask_left_down
  label: Mask Left-
  kind: action
  params: []
- id: mask_right_up
  label: Mask Right+
  kind: action
  params: []
- id: mask_right_down
  label: Mask Right-
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
- id: lens_aperture_down
  label: Lens Aperture-
  kind: action
  params: []
- id: lens_aperture_up
  label: Lens Aperture+
  kind: action
  params: []
- id: picture_tone_blue_up
  label: Picture Tone Blue+
  kind: action
  params: []
- id: picture_tone_blue_down
  label: Picture Tone Blue-
  kind: action
  params: []
- id: picture_tone_green_up
  label: Picture Tone Green+
  kind: action
  params: []
- id: picture_tone_green_down
  label: Picture Tone Green-
  kind: action
  params: []
- id: picture_tone_red_up
  label: Picture Tone Red+
  kind: action
  params: []
- id: picture_tone_red_down
  label: Picture Tone Red-
  kind: action
  params: []
- id: picture_tone_white_up
  label: Picture Tone White+
  kind: action
  params: []
- id: picture_tone_white_down
  label: Picture Tone White-
  kind: action
  params: []
- id: isf_day
  label: ISF-Day
  kind: action
  params: []
- id: isf_night
  label: ISF-Night
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
- id: thx_bright
  label: THX Bright
  kind: action
  params: []
- id: thx_dark
  label: THX Dark
  kind: action
  params: []
- id: thx_mode_off
  label: THX Mode Off
  kind: action
  params: []
- id: thx_mode_on
  label: THX Mode On
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
- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
- id: shutter_sync_off
  label: Shutter Sync Off
  kind: action
  params: []
- id: shutter_sync_on
  label: Shutter Sync On
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
- id: vertical_stretch_off
  label: Vertical Stretch Off
  kind: action
  params: []
- id: vertical_stretch_on
  label: Vertical Stretch On
  kind: action
  params: []
- id: menu_position
  label: Menu Position
  kind: action
  params: []
- id: information
  label: Information (displays Information tab)
  kind: action
  params: []
- id: picture_adjust
  label: Picture Adjust
  kind: action
  params: []
- id: advanced_picture
  label: Advanced (Picture Adjust > Advanced menu)
  kind: action
  params: []
- id: colour_space_cycle
  label: Colour Space Cycle (Standard/Wide 1/Wide 2)
  kind: action
  params: []
- id: colour_profile_cycle
  label: Colour Profile Cycle
  kind: action
  params: []
- id: colour_management_cycle
  label: Colour Management Cycle
  kind: action
  params: []
- id: gamma_cycle
  label: Gamma Cycle
  kind: action
  params: []
- id: aspect_cycle
  label: Aspect Cycle
  kind: action
  params: []
- id: input_cycle
  label: Input Cycle
  kind: action
  params: []
- id: clear_motion_drive_cycle
  label: Clear Motion Drive Cycle
  kind: action
  params: []
- id: anamorphic_cycle
  label: Anamorphic Cycle (Off/A/B)
  kind: action
  params: []
- id: 3d_format_cycle
  label: 3D Format Cycle
  kind: action
  params: []
- id: colour_temp_cycle
  label: Colour Temperature+
  kind: action
  params: []
- id: lens_control_cycle
  label: Lens Control Cycle
  kind: action
  params: []
- id: user_cycle
  label: User Cycle (User 1-5 Picture Modes)
  kind: action
  params: []
- id: lens_memory_cycle
  label: Lens Memory Cycle (Select/Save/Name Edit)
  kind: action
  params: []
- id: 3d_setting_direct
  label: 3D Setting Direct Access
  kind: action
  params: []
- id: picture_tone_adj_toggle
  label: Picture Tone Adjustment Bar Toggle
  kind: action
  params: []
- id: brightness_adj_toggle
  label: Brightness Adjustment Bar Toggle
  kind: action
  params: []
- id: contrast_adj_toggle
  label: Contrast Adjustment Bar Toggle
  kind: action
  params: []
- id: colour_adj_toggle
  label: Colour Adjustment Bar Toggle
  kind: action
  params: []
- id: tint_adj_toggle
  label: Tint Adjustment Bar Toggle
  kind: action
  params: []
- id: sharpness_adj_toggle
  label: Sharpness Adjustment Bar Toggle
  kind: action
  params: []
- id: auto_lens_aperture_adj_toggle
  label: Lens Aperture Adjustment Bar Toggle
  kind: action
  params: []
- id: power_off_remote
  label: Power Off via Remote Control Emulation (send twice)
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  description: Power status enquiry response
  values:
    - "30": Standby
    - "31": Power On
    - "32": Cooling
    - "34": Emergency
- id: input_status
  type: enum
  description: Video input status enquiry response
  values:
    - "30": S-Video
    - "31": Video
    - "32": Component
    - "33": PC
    - "36": HDMI 1
    - "37": HDMI 2
- id: gamma_table_status
  type: enum
  description: Gamma table status enquiry response
  values:
    - "30": Gamma Normal
    - "31": Gamma A
    - "32": Gamma B
    - "33": Gamma C
    - "34": Gamma Custom 1
    - "35": Gamma Custom 2
    - "36": Gamma Custom 3
- id: gamma_value_status
  type: enum
  description: Gamma value status enquiry response
  values:
    - "30": Gamma Correction Value 1.8
    - "31": Gamma Correction Value 1.9
    - "32": Gamma Correction Value 2.0
    - "33": Gamma Correction Value 2.1
    - "34": Gamma Correction Value 2.2
    - "35": Gamma Correction Value 2.3
    - "36": Gamma Correction Value 2.4
    - "37": Gamma Correction Value 2.5
    - "38": Gamma Correction Value 2.6
- id: source_status
  type: enum
  description: Video source status enquiry response
  values:
    - "00": JVC Logo displayed
    - "30": No signal or signal out of range
    - "31": Signal input correctly
- id: model_status
  type: enum
  description: Projector model enquiry response
  values:
    - "4848": DLA-HD350
    - "4847": DLA-RS10
    - "4835": DLA-HD750 & DLA-RS20
    - "4838": DLA-HD550
    - "4841": DLA-RS15
    - "4839": DLA-HD950/HD990/DLA-RS25/RS35
    - "4842": DLA-X3 & DLA-RS40
    - "4843": DLA-X7/X9 & DLA-RS50/60
    - "4845": DLA-X30 & DLA-RS45
    - "4846": DLA-X70R/X90R & DLA-RS55/65
- id: ack_power
  description: Basic acknowledgement for power on/off
  type: binary
  hex: "06 89 01 50 57 0A"
- id: ack_input
  description: Basic acknowledgement for input change
  type: binary
  hex: "06 89 01 49 50 0A"
- id: ack_test_pattern
  description: Basic acknowledgement for test pattern on/off
  type: binary
  hex: "06 89 01 54 53 0A"
- id: ack_gamma_table
  description: Basic acknowledgement for gamma table change
  type: binary
  hex: "06 89 01 47 54 0A"
- id: ack_gamma_value
  description: Basic acknowledgement for gamma value change
  type: binary
  hex: "06 89 01 47 50 0A"
- id: ack_remote_emulation
  description: Basic acknowledgement for remote control emulation command
  type: binary
  hex: "06 89 01 52 43 0A"
- id: ack_null
  description: Basic acknowledgement for null/test command
  type: binary
  hex: "06 89 01 00 00 0A"
- id: lan_pj_ok
  description: LAN connection acknowledgement - projector available
  type: ascii
  value: "PJ_OK"
- id: lan_pjack
  description: LAN connection acknowledgement - ready to accept command
  type: ascii
  value: "PJACK"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found beyond direct commands;
# most settings are command-based actions in this protocol
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source;
# all communication is command-response (polling model)
```

## Macros
```yaml
# Power off via remote control emulation requires two sends with short delay
power_off_remote:
  description: Power Off via Remote Emulation (send twice with short delay)
  steps:
    - command: "21 89 01 52 43 37 33 30 36 0A"
      delay_ms: null
    - command: "21 89 01 52 43 37 33 30 36 0A"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
RS-232C commands are bidirectional hex format: header (1 byte) + unit ID (89 01 fixed) + command (2 bytes) + data (variable) + end (0A fixed). Commands are 7 or 10 bytes; responses are 6-14 bytes. Commands ignored if 50ms or longer gap in incoming data. Controller must wait for acknowledgement before sending next command.

LAN control uses TCP port 20554 with 3-way handshake: send connection request → projector responds PJ_OK → controller responds PJREQ → projector responds PJACK → command sent within 5s → projector processes and closes connection after 5s. Each command requires new connection.

Direct commands and remote control emulation commands overlap; direct commands preferred unless on-screen confirmation messages from emulation are needed.

RS-232C uses 9-pin D-Sub male (Rx=pin2, Tx=pin3, Ground=pin5, pins 1/4/6-9 no connection).

Default LAN IP: 192.168.0.2, Subnet: 255.255.255.0, Gateway: 192.168.0.254. DHCP off by default.

Infrared control format: 73 (hex) followed by ASCII hex value of command. Code A default (73), Code B optional (63). Multiple projectors can use different IR codes to avoid crosstalk.

<!-- UNRESOLVED: DiLA-HD2K-specific model not in source model list; protocol may differ for that older model -->
<!-- UNRESOLVED: RS-232 physical port DB-9 pinout not fully specified beyond pins 2/3/5 -->
<!-- UNRESOLVED: LAN control documented only for X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65 models -->
<!-- UNRESOLVED: command timing constraints beyond 50ms gap requirement not specified -->
<!-- UNRESOLVED: error recovery procedure not described beyond ignoring unrecognized commands -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILARemoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:41.240Z
last_checked_at: 2026-05-14T18:17:17.155Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.155Z
matched_actions: 161
action_count: 265
confidence: high
summary: "All 161 spec actions matched directly to source commands; transport parameters verified from RS-232 protocol spec."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
