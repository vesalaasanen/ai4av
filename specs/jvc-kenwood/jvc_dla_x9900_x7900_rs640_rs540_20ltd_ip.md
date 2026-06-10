---
spec_id: admin/jvc_kenwood-dla_x9900_x7900_rs640_rs540_20ltd
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-X9900/DLA-X7900/DLA-RS640/DLA-RS540/20LTD Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-X9900
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-X9900
    - DLA-X7900
    - DLA-RS640
    - DLA-RS540
    - DLA-20LTD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2360-0Cen/BONDSYvxqkwmjo.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2360-0Cen/BONDSYdwwybaxa.php
retrieved_at: 2026-05-21T02:09:56.230Z
last_checked_at: 2026-06-09T11:50:18.411Z
generated_at: 2026-06-09T11:50:18.411Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "lamp hour counter, serial number, and advanced calibration commands not documented in source"
  - "No discrete parameter get/set commands found in source - all controls are action-based"
  - "projector does not send unsolicited notifications; all communication is request/response"
  - "lamp replacement procedure, fan failure handling, thermal shutdown thresholds - not stated in source"
  - "lamp hour counter read/write commands, firmware version compatibility, error code definitions beyond basic ACK"
verification:
  verdict: verified
  checked_at: 2026-06-09T11:50:18.411Z
  matched_actions: 303
  action_count: 303
  confidence: medium
  summary: "All 303 spec actions matched literally against source hex codes; transport parameters (19200 baud, port 20554, 8N1, no flow control) verified verbatim; feedback query commands (power/input/gamma/source/model status) represented in spec Feedbacks; comprehensive coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# JVC KENWOOD DLA-X9900/DLA-X7900/DLA-RS640/DLA-RS540/20LTD Control Spec

## Summary
DLA-X9900, DLA-X7900, DLA-RS640, DLA-RS540, and DLA-20LTD home theater projectors support both RS-232C and TCP/IP (LAN) control. Direct commands control power, input switching, picture modes, gamma, lens memory, 3D format, and trigger output. Remote Control Emulation commands provide equivalent functionality via emulated remote key codes. Commands use a binary hex format with a fixed header, unit ID (89 01), command code, data, and end marker (0A).

<!-- UNRESOLVED: lamp hour counter, serial number, and advanced calibration commands not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 20554  # TCP port stated for LAN control
serial:
  baud_rate: 19200  # explicitly stated: 19200 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source, LAN uses PJREQ/PJACK handshake
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input switching commands present
- queryable       # enquiry commands for power status, input status, gamma, source, model
- levelable       # brightness, contrast, colour, tint, sharpness, detail enhance, lens aperture, lens focus, lens shift, pixel shift, keystone, colour temp, picture tone
```

## Actions
```yaml
# Direct Commands
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

- id: input_s_video
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

- id: input_next
  label: Input Next (highest)
  kind: action
  params: []
  hex: "21 89 01 49 50 2B 0A"

- id: input_prev
  label: Input Previous (lowest)
  kind: action
  params: []
  hex: "21 89 01 49 50 2D 0A"

- id: test_pattern_off
  label: Test Pattern Off
  kind: action
  params: []
  hex: "21 89 01 54 53 30 0A"

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
  label: Gamma Value 1.8
  kind: action
  params: []
  hex: "21 89 01 47 50 30 0A"

- id: gamma_value_1_9
  label: Gamma Value 1.9
  kind: action
  params: []
  hex: "21 89 01 47 50 31 0A"

- id: gamma_value_2_0
  label: Gamma Value 2.0
  kind: action
  params: []
  hex: "21 89 01 47 50 32 0A"

- id: gamma_value_2_1
  label: Gamma Value 2.1
  kind: action
  params: []
  hex: "21 89 01 47 50 33 0A"

- id: gamma_value_2_2
  label: Gamma Value 2.2 (Default)
  kind: action
  params: []
  hex: "21 89 01 47 50 34 0A"

- id: gamma_value_2_3
  label: Gamma Value 2.3
  kind: action
  params: []
  hex: "21 89 01 47 50 35 0A"

- id: gamma_value_2_4
  label: Gamma Value 2.4
  kind: action
  params: []
  hex: "21 89 01 47 50 36 0A"

- id: gamma_value_2_5
  label: Gamma Value 2.5
  kind: action
  params: []
  hex: "21 89 01 47 50 37 0A"

- id: gamma_value_2_6
  label: Gamma Value 2.6
  kind: action
  params: []
  hex: "21 89 01 47 50 38 0A"

- id: off_timer_off
  label: Off Timer Off
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 30 0A"

- id: off_timer_set_1h
  label: Off Timer Set 1 Hour
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 31 0A"

- id: off_timer_set_2h
  label: Off Timer Set 2 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 32 0A"

- id: off_timer_set_3h
  label: Off Timer Set 3 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 33 0A"

- id: off_timer_set_4h
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
  label: Infrared Remote Code A (hex 73)
  kind: action
  params: []
  hex: "21 89 01 53 55 52 43 30 0A"

- id: remote_code_b
  label: Infrared Remote Code B (hex 63)
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

- id: clear_motion_drive_mode_1
  label: Clear Motion Drive Mode 1 (Low)
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 31 0A"

- id: clear_motion_drive_mode_2
  label: Clear Motion Drive Mode 2 (High)
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 32 0A"

- id: clear_motion_drive_mode_3
  label: Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 33 0A"

- id: clear_motion_drive_mode_4
  label: Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 34 0A"

- id: clear_motion_drive_inverse_telecine
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

- id: picture_mode_user_1
  label: Picture Mode User 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 43 0A"

- id: picture_mode_user_2
  label: Picture Mode User 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 44 0A"

- id: picture_mode_user_3
  label: Picture Mode User 3
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 45 0A"

- id: picture_mode_user_4
  label: Picture Mode User 4
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 46 0A"

- id: picture_mode_user_5
  label: Picture Mode User 5
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 31 30 0A"

- id: colour_profile_off
  label: Colour Profile Off
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 30 0A"

- id: colour_profile_film_1
  label: Colour Profile Film 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 31 0A"

- id: colour_profile_film_2
  label: Colour Profile Film 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 32 0A"

- id: colour_profile_standard
  label: Colour Profile Standard
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 33 0A"

- id: colour_profile_cinema_1
  label: Colour Profile Cinema 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 34 0A"

- id: colour_profile_cinema_2
  label: Colour Profile Cinema 2
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 35 0A"

- id: colour_profile_anime_1
  label: Colour Profile Anime 1
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 36 0A"

- id: colour_profile_anime_2
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

- id: conversion_2d_to_3d_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []
  hex: "21 89 01 49 53 33 43 30 0A"

- id: conversion_2d_to_3d_on
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
  label: Null Command (test communication)
  kind: action
  params: []
  hex: "21 89 01 00 00 0A"

# Remote Control Emulation Commands (key codes, not direct commands)
# These emulate the physical remote; use Direct Commands where available
- id: rc_power_on
  label: Remote Power On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 35 0A"

- id: rc_power_off
  label: Remote Power Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 36 0A"

- id: rc_input_hdmi_1
  label: Remote Input HDMI 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 30 0A"

- id: rc_input_hdmi_2
  label: Remote Input HDMI 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 31 0A"

- id: rc_input_component
  label: Remote Input Component
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 44 0A"

- id: rc_input_s_video
  label: Remote Input S-Video
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 43 0A"

- id: rc_input_video
  label: Remote Input Video
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 42 0A"

- id: rc_input_pc
  label: Remote Input PC
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 36 0A"

- id: rc_input_next
  label: Remote Input Next
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 38 0A"

- id: rc_aspect_16_9
  label: Remote Aspect 16:9
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 36 0A"

- id: rc_aspect_4_3
  label: Remote Aspect 4:3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 35 0A"

- id: rc_aspect_zoom
  label: Remote Aspect Zoom
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 37 0A"

- id: rc_menu_toggle
  label: Remote Menu Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 45 0A"

- id: rc_ok
  label: Remote OK
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 46 0A"

- id: rc_back
  label: Remote Back
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 33 0A"

- id: rc_cursor_up
  label: Remote Cursor Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 31 0A"

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

- id: rc_brightness_up
  label: Remote Brightness Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 41 0A"

- id: rc_brightness_down
  label: Remote Brightness Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 42 0A"

- id: rc_contrast_up
  label: Remote Contrast Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 38 0A"

- id: rc_contrast_down
  label: Remote Contrast Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 39 0A"

- id: rc_colour_up
  label: Remote Colour Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 43 0A"

- id: rc_colour_down
  label: Remote Colour Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 44 0A"

- id: rc_tint_up
  label: Remote Tint Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 38 0A"

- id: rc_tint_down
  label: Remote Tint Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 39 0A"

- id: rc_sharpness_up
  label: Remote Sharpness Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 45 0A"

- id: rc_sharpness_down
  label: Remote Sharpness Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 46 0A"

- id: rc_lens_focus_plus
  label: Remote Lens Focus Plus
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 31 0A"

- id: rc_lens_focus_minus
  label: Remote Lens Focus Minus
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 32 0A"

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
- id: rc_bright_level_down
  label: Remote Bright Level Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 33 0A"
- id: rc_bright_level_up
  label: Remote Bright Level Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 32 0A"
- id: rc_brightness_adj
  label: Remote Brightness Adjustment Bar Toggle
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
- id: rc_cmd_cycle
  label: Remote Clear Motion Drive Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 41 0A"
- id: rc_cmd_off
  label: Remote Clear Motion Drive Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 37 0A"
- id: rc_cmd_mode_1
  label: Remote Clear Motion Drive Mode 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 45 0A"
- id: rc_cmd_mode_2
  label: Remote Clear Motion Drive Mode 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 46 0A"
- id: rc_cmd_mode_3
  label: Remote Clear Motion Drive Mode 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 38 0A"
- id: rc_cmd_mode_4
  label: Remote Clear Motion Drive Mode 4
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 39 0A"
- id: rc_cmd_inverse_telecine
  label: Remote Clear Motion Drive Inverse Telecine
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 41 0A"
- id: rc_colour_adj
  label: Remote Colour Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 35 0A"
- id: rc_colour_management_off
  label: Remote Colour Management Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 30 0A"
- id: rc_colour_management_custom_1
  label: Remote Colour Management Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 31 0A"
- id: rc_colour_management_custom_2
  label: Remote Colour Management Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 32 0A"
- id: rc_colour_management_custom_3
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
- id: rc_colour_temp_custom_1
  label: Remote Colour Temp Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 33 0A"
- id: rc_colour_temp_custom_2
  label: Remote Colour Temp Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 34 0A"
- id: rc_colour_temp_custom_3
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
- id: rc_colour_temp_gain_blue_down
  label: Remote Colour Temperature Gain Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 31 0A"
- id: rc_colour_temp_gain_blue_up
  label: Remote Colour Temperature Gain Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 30 0A"
- id: rc_colour_temp_gain_green_down
  label: Remote Colour Temperature Gain Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 46 0A"
- id: rc_colour_temp_gain_green_up
  label: Remote Colour Temperature Gain Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 45 0A"
- id: rc_colour_temp_gain_red_down
  label: Remote Colour Temperature Gain Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 44 0A"
- id: rc_colour_temp_gain_red_up
  label: Remote Colour Temperature Gain Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 43 0A"
- id: rc_colour_temp_offset_blue_down
  label: Remote Colour Temperature Offset Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 37 0A"
- id: rc_colour_temp_offset_blue_up
  label: Remote Colour Temperature Offset Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 36 0A"
- id: rc_colour_temp_offset_green_down
  label: Remote Colour Temperature Offset Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 35 0A"
- id: rc_colour_temp_offset_green_up
  label: Remote Colour Temperature Offset Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 34 0A"
- id: rc_colour_temp_offset_red_down
  label: Remote Colour Temperature Offset Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 33 0A"
- id: rc_colour_temp_offset_red_up
  label: Remote Colour Temperature Offset Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 32 0A"
- id: rc_contrast_adj
  label: Remote Contrast Adjustment Bar Toggle
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
- id: rc_dark_level_down
  label: Remote Dark Level Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 35 0A"
- id: rc_dark_level_up
  label: Remote Dark Level Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 34 0A"
- id: rc_detail_enhance_down
  label: Remote Detail Enhance Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 32 0A"
- id: rc_detail_enhance_up
  label: Remote Detail Enhance Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 31 0A"
- id: rc_picture_tone_blue_down
  label: Remote Picture Tone Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 31 0A"
- id: rc_picture_tone_blue_up
  label: Remote Picture Tone Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 30 0A"
- id: rc_picture_tone_green_down
  label: Remote Picture Tone Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 46 0A"
- id: rc_picture_tone_green_up
  label: Remote Picture Tone Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 45 0A"
- id: rc_picture_tone_red_down
  label: Remote Picture Tone Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 44 0A"
- id: rc_picture_tone_red_up
  label: Remote Picture Tone Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 43 0A"
- id: rc_picture_tone_white_down
  label: Remote Picture Tone White Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 42 0A"
- id: rc_picture_tone_white_up
  label: Remote Picture Tone White Up
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
- id: rc_gamma_custom_1
  label: Remote Gamma Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 43 0A"
- id: rc_gamma_custom_2
  label: Remote Gamma Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 44 0A"
- id: rc_gamma_custom_3
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
- id: rc_horizontal_position_down
  label: Remote Horizontal Position Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 42 0A"
- id: rc_horizontal_position_up
  label: Remote Horizontal Position Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 41 0A"
- id: rc_information
  label: Remote Information
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 34 0A"
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
- id: rc_keystone_horizontal_down
  label: Remote Keystone Correction Horizontal Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 31 0A"
- id: rc_keystone_horizontal_up
  label: Remote Keystone Correction Horizontal Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 30 0A"
- id: rc_keystone_vertical_down
  label: Remote Keystone Correction Vertical Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 43 0A"
- id: rc_keystone_vertical_up
  label: Remote Keystone Correction Vertical Up
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
- id: rc_lens_aperture_down
  label: Remote Lens Aperture Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 46 0A"
- id: rc_lens_aperture_up
  label: Remote Lens Aperture Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 45 0A"
- id: rc_lens_aperture_adj
  label: Remote Lens Aperture Adjustment
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 30 0A"
- id: rc_lens_control_cycle
  label: Remote Lens Control Cycle
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
- id: rc_mask_bottom_down
  label: Remote Mask Bottom Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 38 0A"
- id: rc_mask_bottom_up
  label: Remote Mask Bottom Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 37 0A"
- id: rc_mask_left_down
  label: Remote Mask Left Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 32 0A"
- id: rc_mask_left_up
  label: Remote Mask Left Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 31 0A"
- id: rc_mask_right_down
  label: Remote Mask Right Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 34 0A"
- id: rc_mask_right_up
  label: Remote Mask Right Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 33 0A"
- id: rc_mask_top_down
  label: Remote Mask Top Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 36 0A"
- id: rc_mask_top_up
  label: Remote Mask Top Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 35 0A"
- id: rc_menu_position
  label: Remote Menu Position
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 32 0A"
- id: rc_mnr_down
  label: Remote MNR Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 45 0A"
- id: rc_mnr_up
  label: Remote MNR Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 44 0A"
- id: rc_nr_toggle
  label: Remote NR Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 38 0A"
- id: rc_phase_down
  label: Remote Phase Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 39 0A"
- id: rc_phase_up
  label: Remote Phase Up
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
- id: rc_picture_mode_cinema_1
  label: Remote Picture Mode Cinema 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 39 0A"
- id: rc_picture_mode_cinema_2
  label: Remote Picture Mode Cinema 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 38 0A"
- id: rc_picture_mode_cinema_3
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
- id: rc_picture_mode_user_1
  label: Remote Picture Mode User 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 43 0A"
- id: rc_picture_mode_user_2
  label: Remote Picture Mode User 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 44 0A"
- id: rc_picture_mode_user_3
  label: Remote Picture Mode User 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 45 0A"
- id: rc_picture_mode_user_4
  label: Remote Picture Mode User 4
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 41 0A"
- id: rc_picture_mode_user_5
  label: Remote Picture Mode User 5
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 42 0A"
- id: rc_advanced
  label: Remote Advanced Menu
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 33 0A"
- id: rc_pixel_shift_h_blue_down
  label: Remote Pixel Shift Horizontal Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 45 0A"
- id: rc_pixel_shift_h_blue_up
  label: Remote Pixel Shift Horizontal Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 44 0A"
- id: rc_pixel_shift_h_green_down
  label: Remote Pixel Shift Horizontal Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 43 0A"
- id: rc_pixel_shift_h_green_up
  label: Remote Pixel Shift Horizontal Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 42 0A"
- id: rc_pixel_shift_h_red_down
  label: Remote Pixel Shift Horizontal Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 41 0A"
- id: rc_pixel_shift_h_red_up
  label: Remote Pixel Shift Horizontal Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 39 0A"
- id: rc_pixel_shift_v_blue_down
  label: Remote Pixel Shift Vertical Blue Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 34 0A"
- id: rc_pixel_shift_v_blue_up
  label: Remote Pixel Shift Vertical Blue Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 33 0A"
- id: rc_pixel_shift_v_green_down
  label: Remote Pixel Shift Vertical Green Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 32 0A"
- id: rc_pixel_shift_v_green_up
  label: Remote Pixel Shift Vertical Green Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 31 0A"
- id: rc_pixel_shift_v_red_down
  label: Remote Pixel Shift Vertical Red Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 30 0A"
- id: rc_pixel_shift_v_red_up
  label: Remote Pixel Shift Vertical Red Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 46 0A"
- id: rc_rnr_down
  label: Remote RNR Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 43 0A"
- id: rc_rnr_up
  label: Remote RNR Up
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
  label: Remote Sharpness Adjustment Bar Toggle
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
- id: rc_shutter_off
  label: Remote Shutter Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 44 0A"
- id: rc_shutter_on
  label: Remote Shutter On
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
  label: Remote Tint Adjustment Bar Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 36 0A"
- id: rc_tracking_down
  label: Remote Tracking Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 37 0A"
- id: rc_tracking_up
  label: Remote Tracking Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 36 0A"
- id: rc_user_mode_cycle
  label: Remote User Mode Cycle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 37 0A"
- id: rc_vertical_position_down
  label: Remote Vertical Position Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 44 0A"
- id: rc_vertical_position_up
  label: Remote Vertical Position Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 43 0A"
```

## Feedbacks
```yaml
# Basic acknowledgement format: 06 89 01 CC CC 0A (echoes first 2 bytes of command after header/unit)
- id: ack_basic
  label: Basic Acknowledgement
  description: Echoes command bytes to confirm receipt
  kind: string
  format: "06 89 01 {command_bytes} 0A"

# Advanced enquiry with detailed response: send 3F 89 01 [cmd] 0A, receive 06 89 01 [cmd] 0A 40 89 01 [cmd] {RR} 0A
- id: power_status
  label: Power Status Enquiry
  kind: query
  request_hex: "3F 89 01 50 57 0A"
  response_pattern: "06 89 01 50 57 0A 40 89 01 50 57 {RR} 0A"
  values:
    "30": Standby
    "31": Power On
    "32": Cooling
    "34": Emergency

- id: input_status
  label: Input Status Enquiry
  kind: query
  request_hex: "3F 89 01 49 50 0A"
  response_pattern: "06 89 01 49 50 0A 40 89 01 49 50 {RR} 0A"
  values:
    "30": S-Video
    "31": Video
    "32": Component
    "33": PC
    "36": HDMI 1
    "37": HDMI 2

- id: gamma_table_status
  label: Gamma Table Status Enquiry
  kind: query
  request_hex: "3F 89 01 47 54 0A"
  response_pattern: "06 89 01 47 54 0A 40 89 01 47 54 {RR} 0A"
  values:
    "30": Gamma Normal
    "31": Gamma A
    "32": Gamma B
    "33": Gamma C
    "34": Gamma Custom 1
    "35": Gamma Custom 2
    "36": Gamma Custom 3

- id: gamma_value_status
  label: Gamma Value Status Enquiry
  kind: query
  request_hex: "3F 89 01 47 50 0A"
  response_pattern: "06 89 01 47 50 0A 40 89 01 47 50 {RR} 0A"
  values:
    "30": Gamma Correction 1.8
    "31": Gamma Correction 1.9
    "32": Gamma Correction 2.0
    "33": Gamma Correction 2.1
    "34": Gamma Correction 2.2
    "35": Gamma Correction 2.3
    "36": Gamma Correction 2.4
    "37": Gamma Correction 2.5
    "38": Gamma Correction 2.6

- id: source_status
  label: Source Status Enquiry
  kind: query
  request_hex: "3F 89 01 53 43 0A"
  response_pattern: "06 89 01 53 43 0A 40 89 01 53 43 {RR} 0A"
  values:
    "00": JVC Logo displayed
    "30": No signal or signal out of range
    "31": Signal input correctly

- id: model_status
  label: Model Status Enquiry
  kind: query
  request_hex: "3F 89 01 4D 44 0A"
  response_pattern: "06 89 01 4D 44 0A 40 89 01 4D 44 {RR} 0A"
  values:
    "494C41 46 504A 202D 2D 202D5848 34": DLA-HD350
    "494C41 46 504A 202D 2D 202D5848 37": DLA-RS10
    "494C41 46 504A 202D 2D 202D5848 35": DLA-HD750/DLA-RS20
    "494C41 46 504A 202D 2D 202D5848 38": DLA-HD550
    "494C41 46 504A 202D 2D 202D5848 39": DLA-RS15
    "494C41 46 504A 202D 2D 202D5848 41": DLA-HD950/HD990/DLA-RS25/RS35
    "494C41 46 504A 202D 2D 202D5848 42": DLA-X3/DLA-RS40
    "494C41 46 504A 202D 2D 202D5848 43": DLA-X7/X9/DLA-RS50/60
    "494C41 46 504A 202D 2D 202D5848 45": DLA-X30/DLA-RS45
    "494C41 46 504A 202D 2D 202D5848 46": DLA-X70R/X90R/DLA-RS55/65
```

## Variables
```yaml
# UNRESOLVED: No discrete parameter get/set commands found in source - all controls are action-based
```

## Events
```yaml
# UNRESOLVED: projector does not send unsolicited notifications; all communication is request/response
```

## Macros
```yaml
# Power On sequence (RS-232C): send power_on command and wait for acknowledgement
- id: power_on_sequence
  description: Send Power On command, wait for 06 89 01 50 57 0A acknowledgement

# Power Off sequence: send power_off twice with short delay between
- id: power_off_sequence
  description: Send Power Off command, wait briefly, send Power Off again, wait for acknowledgement

# LAN connection sequence: TCP 3-way handshake
- id: lan_connection_sequence
  description: |
    1. Controller connects to projector TCP port 20554
    2. Projector sends PJ_OK
    3. Controller sends PJREQ within 5 seconds
    4. Projector sends PJACK
    5. Controller sends command within 5 seconds
    6. Projector responds and closes connection after 5 seconds
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Power Off command must be sent twice with short delay to actually power off
  - description: Projector ignores commands received during cooling mode
  - description: Controller must respond within 5 seconds at each protocol step (LAN); projector closes connection on timeout
  - description: Commands must be spaced with no gap exceeding 50ms (RS-232C); gap of 50ms or longer causes discard
  - description: External controller must wait for acknowledgement before sending next command
  - description: Projector closes network connection if command is not sent within 5 seconds of PJACK
# UNRESOLVED: lamp replacement procedure, fan failure handling, thermal shutdown thresholds - not stated in source
```

## Notes
Direct Commands control the projector directly and are preferred over Remote Control Emulation Commands. Remote Control Emulation Commands emulate the physical remote and provide equivalent functionality. Some commands are duplicated as both types — use the Direct Command version unless the on-screen confirmation messages from the Remote Control Emulation are required.

Command format: Header (1 byte) + Unit ID (89 01, 2 bytes) + Command (2 bytes) + Data (variable) + End (0A, 1 byte). Binary format; all values hexadecimal.

RS-232C uses 9-pin D-Sub (pins 2 Rx, 3 Tx, 5 Ground). LAN uses RJ45 with TCP port 20554 and a custom PJREQ/PJACK handshake protocol. No authentication required for either interface.

DHCP off by default; projector default IP 192.168.0.2, subnet 255.255.255.0, gateway 192.168.0.254.

Infrared uses hex code 73 (Code A) or 63 (Code B); select via remote code command or projector menu.

Power Off via direct command requires sending the command twice with a short delay between transmissions.

<!-- UNRESOLVED: lamp hour counter read/write commands, firmware version compatibility, error code definitions beyond basic ACK -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2360-0Cen/BONDSYvxqkwmjo.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2360-0Cen/BONDSYdwwybaxa.php
retrieved_at: 2026-05-21T02:09:56.230Z
last_checked_at: 2026-06-09T11:50:18.411Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T11:50:18.411Z
matched_actions: 303
action_count: 303
confidence: medium
summary: "All 303 spec actions matched literally against source hex codes; transport parameters (19200 baud, port 20554, 8N1, no flow control) verified verbatim; feedback query commands (power/input/gamma/source/model status) represented in spec Feedbacks; comprehensive coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "lamp hour counter, serial number, and advanced calibration commands not documented in source"
- "No discrete parameter get/set commands found in source - all controls are action-based"
- "projector does not send unsolicited notifications; all communication is request/response"
- "lamp replacement procedure, fan failure handling, thermal shutdown thresholds - not stated in source"
- "lamp hour counter read/write commands, firmware version compatibility, error code definitions beyond basic ACK"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
