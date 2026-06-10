---
spec_id: admin/jvc_kenwood-dla_x518
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-X518 Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-X518
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-X518
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://support.jvc.com/consumer/support/documents/2015model_JVC_External_Control_Command_spec_v1_0.pdf
retrieved_at: 2026-05-21T01:41:56.206Z
last_checked_at: 2026-06-09T11:33:18.471Z
generated_at: 2026-06-09T11:33:18.471Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Infrared remote control supported but not a machine protocol."
  - "power on/off commands present - infer powerable"
  - "input switching commands present - infer routable"
  - "enquiry commands returning state present - infer queryable"
  - "gamma, brightness, contrast, colour, tint, sharpness, lens aperture, lens focus, lens shift, zoom commands present - infer levelable"
  - "no discrete parameter query commands besides power/input/gamma/source/model status above"
  - "projector does not send unsolicited events - all responses require an enquiry command"
  - "no multi-step macros explicitly documented beyond power-off double-send"
  - "no safety warnings or interlock procedures stated in source"
  - "RS-232C cable type required (null modem / cross-connected), not stated explicitly but noted as cross-connected in conversion example. Port number for TCP not stated in source — derived from source page 20 explicitly naming port."
verification:
  verdict: verified
  checked_at: 2026-06-09T11:33:18.471Z
  matched_actions: 303
  action_count: 303
  confidence: medium
  summary: "All 303 spec actions verified with exact hex sequence matches across direct commands, remote emulation, and enquiry templates (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# JVC KENWOOD DLA-X518 Control Spec

## Summary
Projector supports RS-232C and TCP/IP control. LAN control uses a proprietary handshake protocol on port 20554. No authentication required.

<!-- UNRESOLVED: Infrared remote control supported but not a machine protocol. -->

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
  port: 20554  # TCP port for LAN control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# UNRESOLVED: power on/off commands present - infer powerable
# UNRESOLVED: input switching commands present - infer routable
# UNRESOLVED: enquiry commands returning state present - infer queryable
# UNRESOLVED: gamma, brightness, contrast, colour, tint, sharpness, lens aperture, lens focus, lens shift, zoom commands present - infer levelable
```

## Actions
```yaml
# Direct Commands
- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "21 89 01 50 57 30 0A"

- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "21 89 01 50 57 31 0A"

- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  params: []
  hex: "21 89 01 49 50 36 0A"

- id: input_hdmi2
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

- id: input_next
  label: Input Next
  kind: action
  params: []
  hex: "21 89 01 49 50 2B 0A"

- id: input_prev
  label: Input Previous
  kind: action
  params: []
  hex: "21 89 01 49 50 2D 0A"

- id: testpattern_off
  label: Test Pattern Off
  kind: action
  params: []
  hex: "21 89 01 54 53 30 0A"

- id: testpattern_colourbars
  label: Test Pattern Colour Bars
  kind: action
  params: []
  hex: "21 89 01 54 53 31 0A"

- id: testpattern_stairstep_bw
  label: Test Pattern Stairstep B/W
  kind: action
  params: []
  hex: "21 89 01 54 53 36 0A"

- id: testpattern_stairstep_red
  label: Test Pattern Stairstep Red
  kind: action
  params: []
  hex: "21 89 01 54 53 37 0A"

- id: testpattern_stairstep_green
  label: Test Pattern Stairstep Green
  kind: action
  params: []
  hex: "21 89 01 54 53 38 0A"

- id: testpattern_stairstep_blue
  label: Test Pattern Stairstep Blue
  kind: action
  params: []
  hex: "21 89 01 54 53 39 0A"

- id: testpattern_crosshatch
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

- id: gamma_custom1
  label: Gamma Custom 1
  kind: action
  params: []
  hex: "21 89 01 47 54 34 0A"

- id: gamma_custom2
  label: Gamma Custom 2
  kind: action
  params: []
  hex: "21 89 01 47 54 35 0A"

- id: gamma_custom3
  label: Gamma Custom 3
  kind: action
  params: []
  hex: "21 89 01 47 54 36 0A"

- id: gamma_value_18
  label: Gamma Value 1.8
  kind: action
  params: []
  hex: "21 89 01 47 50 30 0A"

- id: gamma_value_19
  label: Gamma Value 1.9
  kind: action
  params: []
  hex: "21 89 01 47 50 31 0A"

- id: gamma_value_20
  label: Gamma Value 2.0
  kind: action
  params: []
  hex: "21 89 01 47 50 32 0A"

- id: gamma_value_21
  label: Gamma Value 2.1
  kind: action
  params: []
  hex: "21 89 01 47 50 33 0A"

- id: gamma_value_22
  label: Gamma Value 2.2
  kind: action
  params: []
  hex: "21 89 01 47 50 34 0A"

- id: gamma_value_23
  label: Gamma Value 2.3
  kind: action
  params: []
  hex: "21 89 01 47 50 35 0A"

- id: gamma_value_24
  label: Gamma Value 2.4
  kind: action
  params: []
  hex: "21 89 01 47 50 36 0A"

- id: gamma_value_25
  label: Gamma Value 2.5
  kind: action
  params: []
  hex: "21 89 01 47 50 37 0A"

- id: gamma_value_26
  label: Gamma Value 2.6
  kind: action
  params: []
  hex: "21 89 01 47 50 38 0A"

- id: offtimer_off
  label: Off Timer Off
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 30 0A"

- id: offtimer_1hr
  label: Off Timer Set 1 Hour
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 31 0A"

- id: offtimer_2hr
  label: Off Timer Set 2 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 32 0A"

- id: offtimer_3hr
  label: Off Timer Set 3 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 33 0A"

- id: offtimer_4hr
  label: Off Timer Set 4 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 34 0A"

- id: lamppower_normal
  label: Lamp Power Normal
  kind: action
  params: []
  hex: "21 89 01 50 4D 4C 50 30 0A"

- id: lamppower_high
  label: Lamp Power High
  kind: action
  params: []
  hex: "21 89 01 50 4D 4C 50 31 0A"

- id: trigger_off
  label: Trigger Off
  kind: action
  params: []
  hex: "21 89 01 46 55 54 52 30 0A"

- id: trigger_power
  label: Trigger On Power
  kind: action
  params: []
  hex: "21 89 01 46 55 54 52 31 0A"

- id: trigger_anamorphic
  label: Trigger On Anamorphic
  kind: action
  params: []
  hex: "21 89 01 46 55 54 52 32 0A"

- id: clear_motion_off
  label: Clear Motion Drive Off
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 30 0A"

- id: clear_motion_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 31 0A"

- id: clear_motion_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 32 0A"

- id: clear_motion_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 33 0A"

- id: clear_motion_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 34 0A"

- id: clear_motion_inv_telecine
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

- id: colourprofile_off
  label: Colour Profile Off
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 30 0A"

- id: colourprofile_film1
  label: Colour Profile Film 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 31 0A"

- id: colourprofile_film2
  label: Colour Profile Film 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 32 0A"

- id: colourprofile_standard
  label: Colour Profile Standard
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 33 0A"

- id: colourprofile_cinema1
  label: Colour Profile Cinema 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 34 0A"

- id: colourprofile_cinema2
  label: Colour Profile Cinema 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 35 0A"

- id: colourprofile_anime1
  label: Colour Profile Anime 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 36 0A"

- id: colourprofile_anime2
  label: Colour Profile Anime 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 37 0A"

- id: colourprofile_video
  label: Colour Profile Video
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 38 0A"

- id: colourprofile_vivid
  label: Colour Profile Vivid
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 39 0A"

- id: colourprofile_adobe
  label: Colour Profile Adobe
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 41 0A"

- id: colourprofile_stage
  label: Colour Profile Stage
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 42 0A"

- id: colourprofile_3d
  label: Colour Profile 3D
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 43 0A"

- id: colourprofile_thx
  label: Colour Profile THX
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 44 0A"

- id: format_3d_off
  label: 3D Format Off
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

- id: lensmemory_save_1
  label: Lens Memory Save Memory 1
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 53 30 0A"

- id: lensmemory_save_2
  label: Lens Memory Save Memory 2
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 53 31 0A"

- id: lensmemory_save_3
  label: Lens Memory Save Memory 3
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 53 32 0A"

- id: lensmemory_select_1
  label: Lens Memory Select Memory 1
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 4C 30 0A"

- id: lensmemory_select_2
  label: Lens Memory Select Memory 2
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 4C 31 0A"

- id: lensmemory_select_3
  label: Lens Memory Select Memory 3
  kind: action
  params: []
  hex: "21 89 01 49 4E 4D 4C 32 0A"

- id: remote_code_a
  label: Remote Code A
  kind: action
  params: []
  hex: "21 89 01 53 55 52 43 30 0A"

- id: remote_code_b
  label: Remote Code B
  kind: action
  params: []
  hex: "21 89 01 53 55 52 43 31 0A"

# Remote Control Emulation Commands (abbreviated listing - full table in source)
# Power
- id: rc_power_off
  label: Remote Power Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 36 0A"

- id: rc_power_on
  label: Remote Power On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 35 0A"

# Lens
- id: rc_lens_shift_up
  label: Remote Lens Shift Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 31 0A"

- id: rc_lens_shift_down
  label: Remote Lens Shift Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 32 0A"

- id: rc_lens_shift_left
  label: Remote Lens Shift Left
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 34 0A"

- id: rc_lens_shift_right
  label: Remote Lens Shift Right
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 33 0A"

- id: rc_lens_zoom_in
  label: Remote Lens Zoom In
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 35 0A"

- id: rc_lens_zoom_out
  label: Remote Lens Zoom Out
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 37 0A"

- id: rc_lens_focus_plus
  label: Remote Lens Focus +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 31 0A"

- id: rc_lens_focus_minus
  label: Remote Lens Focus -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 32 0A"

# Picture Adjustments
- id: rc_brightness_up
  label: Remote Brightness +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 41 0A"

- id: rc_brightness_down
  label: Remote Brightness -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 42 0A"

- id: rc_contrast_up
  label: Remote Contrast +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 38 0A"

- id: rc_contrast_down
  label: Remote Contrast -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 39 0A"

- id: rc_colour_up
  label: Remote Colour +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 43 0A"

- id: rc_colour_down
  label: Remote Colour -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 44 0A"

- id: rc_tint_up
  label: Remote Tint +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 38 0A"

- id: rc_tint_down
  label: Remote Tint -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 39 0A"

- id: rc_sharpness_up
  label: Remote Sharpness +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 45 0A"

- id: rc_sharpness_down
  label: Remote Sharpness -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 46 0A"
- id: input_pc
  label: Input PC
  kind: action
  params: []
  hex: "21 89 01 49 50 33 0A"
- id: null_command
  label: Null Command
  kind: action
  params: []
  hex: "21 89 01 00 00 0A"
- id: rc_3d_setting
  label: Remote 3D Setting
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 35 0A"
- id: rc_3d_format_cycle
  label: Remote 3D Format Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 36 0A"
- id: rc_advanced
  label: Remote Advanced
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 33 0A"
- id: rc_anamorphic_off
  label: Remote Anamorphic Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 34 0A"
- id: rc_anamorphic_a
  label: Remote Anamorphic A
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 33 0A"
- id: rc_anamorphic_b
  label: Remote Anamorphic B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 42 0A"
- id: rc_anamorphic_cycle
  label: Remote Anamorphic Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 35 0A"
- id: rc_aspect_169
  label: Remote Aspect 16:9
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 36 0A"
- id: rc_aspect_43
  label: Remote Aspect 4:3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 35 0A"
- id: rc_aspect_zoom
  label: Remote Aspect Zoom
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 37 0A"
- id: rc_aspect_pc_auto
  label: Remote Aspect PC Auto
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 45 0A"
- id: rc_aspect_pc_full
  label: Remote Aspect PC Full
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 30 0A"
- id: rc_aspect_pc_just
  label: Remote Aspect PC Just
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 46 0A"
- id: rc_aspect_cycle
  label: Remote Aspect Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 37 0A"
- id: rc_auto_align
  label: Remote Auto Align
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 33 0A"
- id: rc_auto_lens_centre
  label: Remote Auto Lens Centre
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 39 0A"
- id: rc_back
  label: Remote Back
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 33 0A"
- id: rc_bnr_off
  label: Remote BNR Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 30 0A"
- id: rc_bnr_on
  label: Remote BNR On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 46 0A"
- id: rc_bright_level_minus
  label: Remote Bright Level -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 33 0A"
- id: rc_bright_level_plus
  label: Remote Bright Level +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 32 0A"
- id: rc_brightness_adj
  label: Remote Brightness Adjust
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 39 0A"
- id: rc_cec_off
  label: Remote CEC Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 37 0A"
- id: rc_cec_on
  label: Remote CEC On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 36 0A"
- id: rc_clear_motion_cycle
  label: Remote Clear Motion Drive Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 41 0A"
- id: rc_clear_motion_off
  label: Remote Clear Motion Drive Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 37 0A"
- id: rc_clear_motion_mode1
  label: Remote Clear Motion Drive Mode 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 45 0A"
- id: rc_clear_motion_mode2
  label: Remote Clear Motion Drive Mode 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 46 0A"
- id: rc_clear_motion_mode3
  label: Remote Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 38 0A"
- id: rc_clear_motion_mode4
  label: Remote Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 39 0A"
- id: rc_clear_motion_inv_telecine
  label: Remote Clear Motion Drive Inverse Telecine
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 41 0A"
- id: rc_colour_adj
  label: Remote Colour Adjust
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 35 0A"
- id: rc_colour_management_off
  label: Remote Colour Management Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 30 0A"
- id: rc_colour_management_custom1
  label: Remote Colour Management Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 31 0A"
- id: rc_colour_management_custom2
  label: Remote Colour Management Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 32 0A"
- id: rc_colour_management_custom3
  label: Remote Colour Management Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 33 0A"
- id: rc_colour_management_cycle
  label: Remote Colour Management Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 39 0A"
- id: rc_colour_profile_cycle
  label: Remote Colour Profile Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 38 0A"
- id: rc_colour_space_cycle
  label: Remote Colour Space Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 44 0A"
- id: rc_colour_temp_5800k
  label: Remote Colour Temp 5800K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 45 0A"
- id: rc_colour_temp_6500k
  label: Remote Colour Temp 6500K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 46 0A"
- id: rc_colour_temp_7500k
  label: Remote Colour Temp 7500K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 30 0A"
- id: rc_colour_temp_9300k
  label: Remote Colour Temp 9300K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 31 0A"
- id: rc_colour_temp_custom1
  label: Remote Colour Temp Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 33 0A"
- id: rc_colour_temp_custom2
  label: Remote Colour Temp Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 34 0A"
- id: rc_colour_temp_custom3
  label: Remote Colour Temp Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 35 0A"
- id: rc_colour_temp_high_bright
  label: Remote Colour Temp High Bright
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 32 0A"
- id: rc_colour_temp_cycle
  label: Remote Colour Temp Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 36 0A"
- id: rc_colour_temp_gain_blue_minus
  label: Remote Colour Temp Gain Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 31 0A"
- id: rc_colour_temp_gain_blue_plus
  label: Remote Colour Temp Gain Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 30 0A"
- id: rc_colour_temp_gain_green_minus
  label: Remote Colour Temp Gain Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 46 0A"
- id: rc_colour_temp_gain_green_plus
  label: Remote Colour Temp Gain Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 45 0A"
- id: rc_colour_temp_gain_red_minus
  label: Remote Colour Temp Gain Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 44 0A"
- id: rc_colour_temp_gain_red_plus
  label: Remote Colour Temp Gain Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 43 0A"
- id: rc_colour_temp_offset_blue_minus
  label: Remote Colour Temp Offset Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 37 0A"
- id: rc_colour_temp_offset_blue_plus
  label: Remote Colour Temp Offset Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 36 0A"
- id: rc_colour_temp_offset_green_minus
  label: Remote Colour Temp Offset Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 35 0A"
- id: rc_colour_temp_offset_green_plus
  label: Remote Colour Temp Offset Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 34 0A"
- id: rc_colour_temp_offset_red_minus
  label: Remote Colour Temp Offset Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 33 0A"
- id: rc_colour_temp_offset_red_plus
  label: Remote Colour Temp Offset Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 32 0A"
- id: rc_contrast_adj
  label: Remote Contrast Adjust
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 41 0A"
- id: rc_cti_off
  label: Remote CTI Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 43 0A"
- id: rc_cti_low
  label: Remote CTI Low
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 44 0A"
- id: rc_cti_middle
  label: Remote CTI Middle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 45 0A"
- id: rc_cti_high
  label: Remote CTI High
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 46 0A"
- id: rc_cursor_down
  label: Remote Cursor Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 32 0A"
- id: rc_cursor_left
  label: Remote Cursor Left
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 36 0A"
- id: rc_cursor_right
  label: Remote Cursor Right
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 34 0A"
- id: rc_cursor_up
  label: Remote Cursor Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 31 0A"
- id: rc_dark_level_minus
  label: Remote Dark Level -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 35 0A"
- id: rc_dark_level_plus
  label: Remote Dark Level +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 34 0A"
- id: rc_detail_enhance_minus
  label: Remote Detail Enhance -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 32 0A"
- id: rc_detail_enhance_plus
  label: Remote Detail Enhance +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 31 0A"
- id: rc_picture_tone_blue_minus
  label: Remote Picture Tone Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 31 0A"
- id: rc_picture_tone_blue_plus
  label: Remote Picture Tone Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 30 0A"
- id: rc_picture_tone_green_minus
  label: Remote Picture Tone Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 46 0A"
- id: rc_picture_tone_green_plus
  label: Remote Picture Tone Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 45 0A"
- id: rc_picture_tone_red_minus
  label: Remote Picture Tone Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 44 0A"
- id: rc_picture_tone_red_plus
  label: Remote Picture Tone Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 43 0A"
- id: rc_picture_tone_white_minus
  label: Remote Picture Tone White -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 42 0A"
- id: rc_picture_tone_white_plus
  label: Remote Picture Tone White +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 41 0A"
- id: rc_gamma_a
  label: Remote Gamma A
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 39 0A"
- id: rc_gamma_b
  label: Remote Gamma B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 41 0A"
- id: rc_gamma_c
  label: Remote Gamma C
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 42 0A"
- id: rc_gamma_custom1
  label: Remote Gamma Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 43 0A"
- id: rc_gamma_custom2
  label: Remote Gamma Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 44 0A"
- id: rc_gamma_custom3
  label: Remote Gamma Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 45 0A"
- id: rc_gamma_d
  label: Remote Gamma D
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 46 0A"
- id: rc_gamma_normal
  label: Remote Gamma Normal
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 38 0A"
- id: rc_gamma_cycle
  label: Remote Gamma Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 35 0A"
- id: rc_hide_off
  label: Remote Hide Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 31 0A"
- id: rc_hide_on
  label: Remote Hide On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 30 0A"
- id: rc_hide_toggle
  label: Remote Hide Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 44 0A"
- id: rc_horizontal_position_minus
  label: Remote Horizontal Position -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 42 0A"
- id: rc_horizontal_position_plus
  label: Remote Horizontal Position +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 41 0A"
- id: rc_information
  label: Remote Information
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 34 0A"
- id: rc_input_component
  label: Remote Input Component
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 44 0A"
- id: rc_input_hdmi1
  label: Remote Input HDMI 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 30 0A"
- id: rc_input_hdmi2
  label: Remote Input HDMI 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 31 0A"
- id: rc_input_pc
  label: Remote Input PC
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 36 0A"
- id: rc_input_svideo
  label: Remote Input S-Video
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 43 0A"
- id: rc_input_video
  label: Remote Input Video
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 42 0A"
- id: rc_input_cycle
  label: Remote Input Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 38 0A"
- id: rc_isf_day
  label: Remote ISF Day
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 34 0A"
- id: rc_isf_night
  label: Remote ISF Night
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 35 0A"
- id: rc_isf_off
  label: Remote ISF Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 41 0A"
- id: rc_isf_on
  label: Remote ISF On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 42 0A"
- id: rc_keystone_horizontal_minus
  label: Remote Keystone Horizontal -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 31 0A"
- id: rc_keystone_horizontal_plus
  label: Remote Keystone Horizontal +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 30 0A"
- id: rc_keystone_vertical_minus
  label: Remote Keystone Vertical -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 43 0A"
- id: rc_keystone_vertical_plus
  label: Remote Keystone Vertical +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 42 0A"
- id: rc_lens_aperture_1
  label: Remote Lens Aperture 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 38 0A"
- id: rc_lens_aperture_2
  label: Remote Lens Aperture 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 39 0A"
- id: rc_lens_aperture_3
  label: Remote Lens Aperture 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 41 0A"
- id: rc_lens_aperture_minus
  label: Remote Lens Aperture -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 46 0A"
- id: rc_lens_aperture_plus
  label: Remote Lens Aperture +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 45 0A"
- id: rc_lens_aperture_adj
  label: Remote Lens Aperture Adjust
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 30 0A"
- id: rc_lens_control
  label: Remote Lens Control
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 30 0A"
- id: rc_lens_memory_cycle
  label: Remote Lens Memory Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 34 0A"
- id: rc_lens_memory_1
  label: Remote Lens Memory 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 38 0A"
- id: rc_lens_memory_2
  label: Remote Lens Memory 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 39 0A"
- id: rc_lens_memory_3
  label: Remote Lens Memory 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 41 0A"
- id: rc_mask_bottom_minus
  label: Remote Mask Bottom -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 38 0A"
- id: rc_mask_bottom_plus
  label: Remote Mask Bottom +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 37 0A"
- id: rc_mask_left_minus
  label: Remote Mask Left -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 32 0A"
- id: rc_mask_left_plus
  label: Remote Mask Left +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 31 0A"
- id: rc_mask_right_minus
  label: Remote Mask Right -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 34 0A"
- id: rc_mask_right_plus
  label: Remote Mask Right +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 33 0A"
- id: rc_mask_top_minus
  label: Remote Mask Top -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 36 0A"
- id: rc_mask_top_plus
  label: Remote Mask Top +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 35 0A"
- id: rc_menu
  label: Remote Menu Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 45 0A"
- id: rc_menu_position
  label: Remote Menu Position
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 32 0A"
- id: rc_mnr_minus
  label: Remote MNR -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 45 0A"
- id: rc_mnr_plus
  label: Remote MNR +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 44 0A"
- id: rc_nr_toggle
  label: Remote NR Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 38 0A"
- id: rc_ok
  label: Remote OK
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 46 0A"
- id: rc_phase_minus
  label: Remote Phase -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 39 0A"
- id: rc_phase_plus
  label: Remote Phase +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 38 0A"
- id: rc_picture_adjust
  label: Remote Picture Adjust
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 32 0A"
- id: rc_picture_mode_3d
  label: Remote Picture Mode 3D
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 37 0A"
- id: rc_picture_mode_cinema1
  label: Remote Picture Mode Cinema 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 39 0A"
- id: rc_picture_mode_cinema2
  label: Remote Picture Mode Cinema 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 38 0A"
- id: rc_picture_mode_cinema3
  label: Remote Picture Mode Cinema 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 36 0A"
- id: rc_picture_mode_dynamic
  label: Remote Picture Mode Dynamic
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 42 0A"
- id: rc_picture_mode_natural
  label: Remote Picture Mode Natural
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 41 0A"
- id: rc_picture_mode_stage
  label: Remote Picture Mode Stage
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 37 0A"
- id: rc_picture_mode_thx
  label: Remote Picture Mode THX
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 46 0A"
- id: rc_picture_mode_user1
  label: Remote Picture Mode User 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 43 0A"
- id: rc_picture_mode_user2
  label: Remote Picture Mode User 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 44 0A"
- id: rc_picture_mode_user3
  label: Remote Picture Mode User 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 45 0A"
- id: rc_picture_mode_user4
  label: Remote Picture Mode User 4
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 41 0A"
- id: rc_picture_mode_user5
  label: Remote Picture Mode User 5
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 42 0A"
- id: rc_pixel_shift_h_blue_minus
  label: Remote Pixel Shift H Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 45 0A"
- id: rc_pixel_shift_h_blue_plus
  label: Remote Pixel Shift H Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 44 0A"
- id: rc_pixel_shift_h_green_minus
  label: Remote Pixel Shift H Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 43 0A"
- id: rc_pixel_shift_h_green_plus
  label: Remote Pixel Shift H Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 42 0A"
- id: rc_pixel_shift_h_red_minus
  label: Remote Pixel Shift H Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 41 0A"
- id: rc_pixel_shift_h_red_plus
  label: Remote Pixel Shift H Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 39 0A"
- id: rc_pixel_shift_v_blue_minus
  label: Remote Pixel Shift V Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 34 0A"
- id: rc_pixel_shift_v_blue_plus
  label: Remote Pixel Shift V Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 33 0A"
- id: rc_pixel_shift_v_green_minus
  label: Remote Pixel Shift V Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 32 0A"
- id: rc_pixel_shift_v_green_plus
  label: Remote Pixel Shift V Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 31 0A"
- id: rc_pixel_shift_v_red_minus
  label: Remote Pixel Shift V Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 30 0A"
- id: rc_pixel_shift_v_red_plus
  label: Remote Pixel Shift V Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 46 0A"
- id: rc_rnr_minus
  label: Remote RNR -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 43 0A"
- id: rc_rnr_plus
  label: Remote RNR +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 42 0A"
- id: rc_screen_adjust_off
  label: Remote Screen Adjust Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 30 0A"
- id: rc_screen_adjust_a
  label: Remote Screen Adjust A
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 31 0A"
- id: rc_screen_adjust_b
  label: Remote Screen Adjust B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 32 0A"
- id: rc_screen_adjust_c
  label: Remote Screen Adjust C
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 33 0A"
- id: rc_sharpness_adj
  label: Remote Sharpness Adjust
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 34 0A"
- id: rc_shutter_close
  label: Remote Shutter Close
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 39 0A"
- id: rc_shutter_open
  label: Remote Shutter Open
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 41 0A"
- id: rc_shutter_sync_off
  label: Remote Shutter Sync Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 44 0A"
- id: rc_shutter_sync_on
  label: Remote Shutter Sync On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 43 0A"
- id: rc_test_pattern_cycle
  label: Remote Test Pattern Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 39 0A"
- id: rc_thx_bright
  label: Remote THX Bright
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 35 0A"
- id: rc_thx_dark
  label: Remote THX Dark
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 36 0A"
- id: rc_thx_off
  label: Remote THX Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 37 0A"
- id: rc_thx_on
  label: Remote THX On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 38 0A"
- id: rc_tint_adj
  label: Remote Tint Adjust
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 36 0A"
- id: rc_tracking_minus
  label: Remote Tracking -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 37 0A"
- id: rc_tracking_plus
  label: Remote Tracking +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 36 0A"
- id: rc_user_cycle
  label: Remote User Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 37 0A"
- id: rc_vertical_position_minus
  label: Remote Vertical Position -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 44 0A"
- id: rc_vertical_position_plus
  label: Remote Vertical Position +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 43 0A"
```

## Feedbacks
```yaml
# Enquiry command format: 3F 89 01 [command] 0A
# Basic ack format: 06 89 01 [cmd bytes] 0A
# Detailed response format: 40 89 01 [cmd bytes] [RR] 0A

- id: power_status
  label: Power Status
  type: enum
  enquiry_hex: "3F 89 01 50 57 0A"
  values:
    30: Standby
    31: Power On
    32: Cooling
    34: Emergency

- id: input_status
  label: Input Status
  type: enum
  enquiry_hex: "3F 89 01 49 50 0A"
  values:
    30: S-Video
    31: Video
    32: Component
    33: PC
    36: HDMI 1
    37: HDMI 2

- id: gamma_table_status
  label: Gamma Table Status
  type: enum
  enquiry_hex: "3F 89 01 47 54 0A"
  values:
    30: Normal
    31: Gamma A
    32: Gamma B
    33: Gamma C
    34: Custom 1
    35: Custom 2
    36: Custom 3

- id: gamma_value_status
  label: Gamma Value Status
  type: enum
  enquiry_hex: "3F 89 01 47 50 0A"
  values:
    30: "1.8"
    31: "1.9"
    32: "2.0"
    33: "2.1"
    34: "2.2"
    35: "2.3"
    36: "2.4"
    37: "2.5"
    38: "2.6"

- id: source_status
  label: Source Status
  type: enum
  enquiry_hex: "3F 89 01 53 43 0A"
  values:
    00: JVC Logo displayed
    30: No signal or signal out of range
    31: Signal input correctly

- id: model_status
  label: Model Status
  type: enum
  enquiry_hex: "3F 89 01 4D 44 0A"
  values:
    "494C4146504A202D2D202D5848 34": DLA-HD350
    "494C4146504A202D2D202D5848 37": DLA-RS10
    "494C4146504A202D2D202D5848 35": DLA-HD750 & DLA-RS20
    "494C4146504A202D2D202D5848 38": DLA-HD550
    "494C4146504A202D2D202D5848 39": DLA-HD950/HD990/DLA-RS25/RS35
    "494C4146504A202D2D202D5848 42": DLA-X3 & DLA-RS40
    "494C4146504A202D2D202D5848 43": DLA-X7/X9 & DLA-RS50/60
    "494C4146504A202D2D202D5848 45": DLA-X30 & DLA-RS45
    "494C4146504A202D2D202D5848 46": DLA-X70R/X90R & DLA-RS55/65

# Basic acknowledgement return codes (all commands return this pattern)
- id: basic_ack
  label: Basic Acknowledgement
  type: pattern
  pattern_hex: "06 89 01 [command bytes] 0A"
  description: Returned for every successful command. Echoes first 2 bytes of command data.
```

## Variables
```yaml
# UNRESOLVED: no discrete parameter query commands besides power/input/gamma/source/model status above
```

## Events
```yaml
# UNRESOLVED: projector does not send unsolicited events - all responses require an enquiry command
```

## Macros
```yaml
# Power off via remote emulation requires sending twice with short delay between commands
# LAN connection requires handshake: PJ_OK -> PJREQ -> PJACK -> command, all within 5 second timeouts
# UNRESOLVED: no multi-step macros explicitly documented beyond power-off double-send
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
LAN control uses proprietary handshake on port 20554. Controller sends TCP SYN, projector replies PJ_OK, controller sends PJREQ, projector replies PJACK, then command. Projector closes connection 5 seconds after command. Commands must be sent within 5 seconds of PJACK. Serial data format is binary (not ASCII text). Command discard occurs after 50ms break in incoming data. Consecutive commands require waiting for acknowledgement before sending next. Power off via remote emulation command must be sent twice with short delay.
<!-- UNRESOLVED: RS-232C cable type required (null modem / cross-connected), not stated explicitly but noted as cross-connected in conversion example. Port number for TCP not stated in source — derived from source page 20 explicitly naming port. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://support.jvc.com/consumer/support/documents/2015model_JVC_External_Control_Command_spec_v1_0.pdf
retrieved_at: 2026-05-21T01:41:56.206Z
last_checked_at: 2026-06-09T11:33:18.471Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T11:33:18.471Z
matched_actions: 303
action_count: 303
confidence: medium
summary: "All 303 spec actions verified with exact hex sequence matches across direct commands, remote emulation, and enquiry templates (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Infrared remote control supported but not a machine protocol."
- "power on/off commands present - infer powerable"
- "input switching commands present - infer routable"
- "enquiry commands returning state present - infer queryable"
- "gamma, brightness, contrast, colour, tint, sharpness, lens aperture, lens focus, lens shift, zoom commands present - infer levelable"
- "no discrete parameter query commands besides power/input/gamma/source/model status above"
- "projector does not send unsolicited events - all responses require an enquiry command"
- "no multi-step macros explicitly documented beyond power-off double-send"
- "no safety warnings or interlock procedures stated in source"
- "RS-232C cable type required (null modem / cross-connected), not stated explicitly but noted as cross-connected in conversion example. Port number for TCP not stated in source — derived from source page 20 explicitly naming port."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
