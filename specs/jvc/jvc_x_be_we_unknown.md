---
spec_id: admin/jvc-d-ila-x_be_we
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
  - github.com
  - sbprojects.net
  - remotecentral.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://support.jvc.com/consumer/support/documents/RemoteCodes.pdf
  - https://github.com/jcj83429/jvc_compulink
  - https://www.sbprojects.net/knowledge/ir/jvc.php
  - https://www.remotecentral.com/cgi-bin/codes/jvc/
retrieved_at: 2026-05-17T21:22:34.987Z
last_checked_at: 2026-06-03T07:13:10.201Z
generated_at: 2026-06-03T07:13:10.201Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device name \"X BE WE\" could not be mapped to a specific model; spec covers all models listed in compatible_with"
  - "source does not describe settable parameters beyond discrete actions."
  - "source does not describe unsolicited event notifications from projector."
  - "no safety warnings or interlock procedures stated in source."
  - "device name \"X BE WE\" — likely an internal JVC reference; no model by that exact name appears in the source document. Compatible model list derived from the full model list in the source document."
  - "firmware version compatibility not stated in source."
  - "RS-232C COM port number not stated in source."
  - "LAN IP address defaults are stated (192.168.0.2 etc.) but these are installer-configurable; not hard-coded in the protocol."
  - "full Remote Control Emulation command table (pages 7-13 of source) not fully enumerated here — subset included covering most common operations. Full table available at source pages 7-13."
verification:
  verdict: verified
  checked_at: 2026-06-03T07:13:10.201Z
  matched_actions: 223
  action_count: 223
  confidence: medium
  summary: "Spec transport and all 223 actions verified (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# JVC D-ILA Projector Control Spec

## Summary
RS-232C and LAN control protocol for JVC D-ILA home cinema projectors. Direct commands control power, input switching, picture modes, gamma, lens memory, and test patterns. Remote control emulation commands expose full menu navigation. Serial: 19200 8N1. LAN: TCP port 20554 with PJREQ/PJACK handshake.

<!-- UNRESOLVED: device name "X BE WE" could not be mapped to a specific model; spec covers all models listed in compatible_with -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 20554  # LAN control port; RS-232C port UNRESOLVED (no port number stated in source)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source for RS-232C or LAN
```

## Traits
```yaml
# inferred from command examples in source
- powerable
- routable
- queryable
- levelable
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

- id: input_video
  label: Input Video
  kind: action
  params: []
  hex: "21 89 01 49 50 31 0A"

- id: input_svideo
  label: Input S-Video
  kind: action
  params: []
  hex: "21 89 01 49 50 30 0A"

- id: input_pc
  label: Input PC
  kind: action
  params: []
  hex: "21 89 01 49 50 33 0A"

- id: input_next
  label: Input Next (cycles through inputs)
  kind: action
  params: []
  hex: "21 89 01 49 50 2B 0A"

- id: input_prev
  label: Input Previous (cycles through inputs)
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
  label: Test Pattern Stairstep (B&W)
  kind: action
  params: []
  hex: "21 89 01 54 53 36 0A"

- id: testpattern_stairstep_red
  label: Test Pattern Stairstep (Red)
  kind: action
  params: []
  hex: "21 89 01 54 53 37 0A"

- id: testpattern_stairstep_green
  label: Test Pattern Stairstep (Green)
  kind: action
  params: []
  hex: "21 89 01 54 53 38 0A"

- id: testpattern_stairstep_blue
  label: Test Pattern Stairstep (Blue)
  kind: action
  params: []
  hex: "21 89 01 54 53 39 0A"

- id: testpattern_crosshatch_green
  label: Test Pattern Crosshatch (Green)
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
  label: Gamma Correction Value 2.2
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
  label: Infrared Remote Code A
  kind: action
  params: []
  hex: "21 89 01 53 55 52 43 30 0A"

- id: remote_code_b
  label: Infrared Remote Code B
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
  label: Null Command (test communication)
  kind: action
  params: []
  hex: "21 89 01 00 00 0A"

# Remote Control Emulation Commands (subset - full table on pages 7-13)
- id: rc_power_on
  label: Remote Power On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 35 0A"

- id: rc_power_off
  label: Remote Power Off (send twice with delay)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 36 0A"

- id: rc_menu
  label: Menu (On/Off toggle)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 45 0A"

- id: rc_ok
  label: OK (accept selected option)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 46 0A"

- id: rc_back
  label: Back (steps backwards through menus)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 33 0A"

- id: rc_cursor_up
  label: Cursor Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 31 0A"

- id: rc_cursor_down
  label: Cursor Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 32 0A"

- id: rc_cursor_left
  label: Cursor Left
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 36 0A"

- id: rc_cursor_right
  label: Cursor Right
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 34 0A"

- id: rc_brightness_up
  label: Brightness +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 41 0A"

- id: rc_brightness_down
  label: Brightness -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 42 0A"

- id: rc_contrast_up
  label: Contrast +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 38 0A"

- id: rc_contrast_down
  label: Contrast -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 39 0A"

- id: rc_colour_up
  label: Colour +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 43 0A"

- id: rc_colour_down
  label: Colour -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 44 0A"

- id: rc_sharpness_up
  label: Sharpness +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 45 0A"

- id: rc_sharpness_down
  label: Sharpness -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 46 0A"

- id: rc_tint_up
  label: Tint +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 38 0A"

- id: rc_tint_down
  label: Tint -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 39 0A"

- id: rc_aspect_16_9
  label: Aspect 16:9
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 36 0A"

- id: rc_aspect_4_3
  label: Aspect 4:3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 35 0A"

- id: rc_aspect_zoom
  label: Aspect Zoom
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 37 0A"

- id: rc_lens_zoom_in
  label: Lens Zoom In
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 35 0A"

- id: rc_lens_zoom_out
  label: Lens Zoom Out
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 37 0A"

- id: rc_lens_focus_in
  label: Lens Focus +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 31 0A"

- id: rc_lens_focus_out
  label: Lens Focus -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 32 0A"

- id: rc_lens_shift_up
  label: Lens Shift Up
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 31 0A"

- id: rc_lens_shift_down
  label: Lens Shift Down
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 32 0A"

- id: rc_lens_shift_left
  label: Lens Shift Left
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 34 0A"

- id: rc_lens_shift_right
  label: Lens Shift Right
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 33 0A"
- id: bnr_off
  label: BNR Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 30 0A"

- id: bnr_on
  label: BNR On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 46 0A"

- id: colour_management_off
  label: Colour Management Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 30 0A"

- id: colour_management_custom1
  label: Colour Management Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 31 0A"

- id: colour_management_custom2
  label: Colour Management Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 32 0A"

- id: colour_management_custom3
  label: Colour Management Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 33 0A"

- id: colour_management_cycles
  label: Colour Management Cycles
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 39 0A"

- id: colour_space_cycles
  label: Colour Space Cycles
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 44 0A"

- id: colour_temp_5800k
  label: Colour Temp 5800K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 45 0A"

- id: colour_temp_6500k
  label: Colour Temp 6500K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 46 0A"

- id: colour_temp_7500k
  label: Colour Temp 7500K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 30 0A"

- id: colour_temp_9300k
  label: Colour Temp 9300K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 31 0A"

- id: colour_temp_custom1
  label: Colour Temp Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 33 0A"

- id: colour_temp_custom2
  label: Colour Temp Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 34 0A"

- id: colour_temp_custom3
  label: Colour Temp Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 35 0A"

- id: colour_temp_high_bright
  label: Colour Temp High Bright
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 32 0A"

- id: colour_temp_cycles
  label: Colour Temp Cycles
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 36 0A"

- id: colour_temp_gain_red_down
  label: Colour Temp Gain Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 44 0A"

- id: colour_temp_gain_red_up
  label: Colour Temp Gain Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 43 0A"

- id: colour_temp_gain_green_down
  label: Colour Temp Gain Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 46 0A"

- id: colour_temp_gain_green_up
  label: Colour Temp Gain Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 45 0A"

- id: colour_temp_gain_blue_down
  label: Colour Temp Gain Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 31 0A"

- id: colour_temp_gain_blue_up
  label: Colour Temp Gain Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 30 0A"

- id: colour_temp_offset_red_down
  label: Colour Temp Offset Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 33 0A"

- id: colour_temp_offset_red_up
  label: Colour Temp Offset Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 32 0A"

- id: colour_temp_offset_green_down
  label: Colour Temp Offset Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 35 0A"

- id: colour_temp_offset_green_up
  label: Colour Temp Offset Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 34 0A"

- id: colour_temp_offset_blue_down
  label: Colour Temp Offset Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 37 0A"

- id: colour_temp_offset_blue_up
  label: Colour Temp Offset Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 36 0A"

- id: cti_off
  label: CTI Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 43 0A"

- id: cti_low
  label: CTI Low
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 44 0A"

- id: cti_middle
  label: CTI Middle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 45 0A"

- id: cti_high
  label: CTI High
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 46 0A"

- id: detail_enhance_down
  label: Detail Enhance -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 32 0A"

- id: detail_enhance_up
  label: Detail Enhance +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 31 0A"

- id: hide_off
  label: Hide Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 31 0A"

- id: hide_on
  label: Hide On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 30 0A"

- id: hide_toggle
  label: Hide Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 44 0A"

- id: keystone_h_down
  label: Keystone H -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 31 0A"

- id: keystone_h_up
  label: Keystone H +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 30 0A"

- id: keystone_v_down
  label: Keystone V -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 43 0A"

- id: keystone_v_up
  label: Keystone V +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 42 0A"

- id: lens_aperture_1
  label: Lens Aperture 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 38 0A"

- id: lens_aperture_2
  label: Lens Aperture 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 39 0A"

- id: lens_aperture_3
  label: Lens Aperture 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 41 0A"

- id: lens_aperture_down
  label: Lens Aperture -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 46 0A"

- id: lens_aperture_up
  label: Lens Aperture +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 45 0A"

- id: lens_aperture_adj
  label: Lens Aperture Adj Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 30 0A"

- id: rc_lens_memory_cycles
  label: Lens Memory Cycles Pages
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 34 0A"

- id: rc_lens_memory_1
  label: Lens Memory 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 38 0A"

- id: rc_lens_memory_2
  label: Lens Memory 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 39 0A"

- id: rc_lens_memory_3
  label: Lens Memory 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 41 0A"

- id: mask_bottom_down
  label: Mask Bottom -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 38 0A"

- id: mask_bottom_up
  label: Mask Bottom +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 37 0A"

- id: mask_left_down
  label: Mask Left -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 32 0A"

- id: mask_left_up
  label: Mask Left +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 31 0A"

- id: mask_right_down
  label: Mask Right -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 34 0A"

- id: mask_right_up
  label: Mask Right +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 33 0A"

- id: mask_top_down
  label: Mask Top -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 36 0A"

- id: mask_top_up
  label: Mask Top +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 35 0A"

- id: mnr_down
  label: MNR -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 45 0A"

- id: mnr_up
  label: MNR +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 44 0A"

- id: nr_toggle
  label: NR Toggle
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 38 0A"

- id: phase_down
  label: Phase -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 39 0A"

- id: phase_up
  label: Phase +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 38 0A"

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 32 0A"

- id: picture_tone_blue_down
  label: Picture Tone Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 31 0A"

- id: picture_tone_blue_up
  label: Picture Tone Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 30 0A"

- id: picture_tone_green_down
  label: Picture Tone Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 46 0A"

- id: picture_tone_green_up
  label: Picture Tone Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 45 0A"

- id: picture_tone_red_down
  label: Picture Tone Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 44 0A"

- id: picture_tone_red_up
  label: Picture Tone Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 43 0A"

- id: picture_tone_white_down
  label: Picture Tone White -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 42 0A"

- id: picture_tone_white_up
  label: Picture Tone White +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 41 0A"

- id: pixel_shift_h_blue_down
  label: Pixel Shift H Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 45 0A"

- id: pixel_shift_h_blue_up
  label: Pixel Shift H Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 44 0A"

- id: pixel_shift_h_green_down
  label: Pixel Shift H Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 43 0A"

- id: pixel_shift_h_green_up
  label: Pixel Shift H Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 42 0A"

- id: pixel_shift_h_red_down
  label: Pixel Shift H Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 41 0A"

- id: pixel_shift_h_red_up
  label: Pixel Shift H Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 39 0A"

- id: pixel_shift_v_blue_down
  label: Pixel Shift V Blue -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 34 0A"

- id: pixel_shift_v_blue_up
  label: Pixel Shift V Blue +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 33 0A"

- id: pixel_shift_v_green_down
  label: Pixel Shift V Green -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 32 0A"

- id: pixel_shift_v_green_up
  label: Pixel Shift V Green +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 31 0A"

- id: pixel_shift_v_red_down
  label: Pixel Shift V Red -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 30 0A"

- id: pixel_shift_v_red_up
  label: Pixel Shift V Red +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 46 0A"

- id: rnr_down
  label: RNR -
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 43 0A"

- id: rnr_up
  label: RNR +
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 42 0A"

- id: screen_adjust_off
  label: Screen Adjust Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 30 0A"

- id: screen_adjust_a
  label: Screen Adjust A
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 31 0A"

- id: screen_adjust_b
  label: Screen Adjust B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 32 0A"

- id: screen_adjust_c
  label: Screen Adjust C
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 33 0A"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 39 0A"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 41 0A"

- id: shutter_sync_off
  label: Shutter Sync Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 44 0A"

- id: shutter_sync_on
  label: Shutter Sync On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 43 0A"
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
  label: Video Input Status
  type: enum
  values:
    - "30"  # S-Video
    - "31"  # Video
    - "32"  # Component
    - "33"  # PC
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
    - "30"  # 1.8
    - "31"  # 1.9
    - "32"  # 2.0
    - "33"  # 2.1
    - "34"  # 2.2
    - "35"  # 2.3
    - "36"  # 2.4
    - "37"  # 2.5
    - "38"  # 2.6
  enquiry_hex: "3F 89 01 47 50 0A"
  response_pattern: "06 89 01 47 50 0A 40 89 01 47 50 RR 0A"

- id: source_status
  label: Video Source Status
  type: enum
  values:
    - "00"  # JVC Logo displayed
    - "30"  # No signal or signal out of range
    - "31"  # Signal input correctly
  enquiry_hex: "3F 89 01 53 43 0A"
  response_pattern: "06 89 01 53 43 0A 40 89 01 53 43 RR 0A"

- id: model_status
  label: Projector Model
  type: enum
  values:
    - "494C4146504A202D2D202D5848 34"  # DLA-HD350
    - "494C4146504A202D2D202D5848 37"  # DLA-RS10
    - "494C4146504A202D2D202D5848 35"  # DLA-HD750 & DLA-RS20
    - "494C4146504A202D2D202D5848 38"  # DLA-HD550
    - "494C4146504A202D2D202D5848 39"  # DLA-HD950/HD990/DLA-RS25/RS35
    - "494C4146504A202D2D202D5848 42"  # DLA-X3 & DLA-RS40
    - "494C4146504A202D2D202D5848 43"  # DLA-X7/X9 & DLA-RS50/60
    - "494C4146504A202D2D202D5848 45"  # DLA-X30 & DLA-RS45
    - "494C4146504A202D2D202D5848 46"  # DLA-X70R/X90R & DLA-RS55/65
  enquiry_hex: "3F 89 01 4D 44 0A"
  response_pattern: "06 89 01 4D 44 0A 40 89 01 4D 44 RR 0A"

- id: acknowledgement_basic
  label: Basic Acknowledgement
  type: pattern
  pattern: "06 89 01 CC CC 0A"
  note: "CC CC = first 2 bytes of received command (excluding header 21 89 01)"
```

## Variables
```yaml
# UNRESOLVED: source does not describe settable parameters beyond discrete actions.
# Gamma value, lamp mode, off timer, picture mode etc. are captured as Actions (command-sent).
# No read/write parameter protocol distinct from the enquiry commands above.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from projector.
# All communication described is query-response or acknowledgement.
```

## Macros
```yaml
# Power Off with confirmation (source requires sending twice with short delay):
# - Step 1: send power_off hex
# - Step 2: wait short delay
# - Step 3: send power_off hex again
# Source: "Power - Off (send twice with short delay between to switch off)"
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # must send command twice with short delay between transmissions
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
# Projector ignores commands when in cooling mode (cannot accept Power On during cooling).
# Source: "The projector will ignore any commands that it cannot recognise...
# ...or any inappropriate commands, e.g. Power On when in cooling mode."
```

## Notes

**Command structure:** All RS-232C/LAN commands are hex-encoded binary. Format: `[Header: 1 byte][Unit ID: 89 01][Command: 2 bytes][Data: variable][End: 0A]`. Header values: `21` = operating command from controller, `3F` = enquiry request, `06` = basic acknowledgement from projector, `40` = detailed response from projector.

**LAN handshake sequence:** TCP connection → projector sends `PJ_OK` → controller responds `PJREQ` within 5s → projector sends `PJACK` → controller sends command within 5s → projector closes connection after 5s. Each command requires a fresh connection establishment.

**Serial cable:** Must use cross-connected (null-modem/DTE-DTE) RS-232C cable. Standard straight-through cable will not work.

**Command timing:** If 50ms or longer gap occurs in incoming data, projector discards the command. Controller must wait for acknowledgement before sending next command.

**RS-232C port number:** UNRESOLVED — source states the DB-9 pinout and electrical spec but does not specify the COM port number or baud rate other than 19200. Port number must be configured by the operator.

**DHCP default:** LAN mode default is DHCP Off; projector defaults to `192.168.0.2`. Operator must set IP manually or enable DHCP.

<!-- UNRESOLVED: device name "X BE WE" — likely an internal JVC reference; no model by that exact name appears in the source document. Compatible model list derived from the full model list in the source document. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: RS-232C COM port number not stated in source. -->
<!-- UNRESOLVED: LAN IP address defaults are stated (192.168.0.2 etc.) but these are installer-configurable; not hard-coded in the protocol. -->
<!-- UNRESOLVED: full Remote Control Emulation command table (pages 7-13 of source) not fully enumerated here — subset included covering most common operations. Full table available at source pages 7-13. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - github.com
  - sbprojects.net
  - remotecentral.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://support.jvc.com/consumer/support/documents/RemoteCodes.pdf
  - https://github.com/jcj83429/jvc_compulink
  - https://www.sbprojects.net/knowledge/ir/jvc.php
  - https://www.remotecentral.com/cgi-bin/codes/jvc/
retrieved_at: 2026-05-17T21:22:34.987Z
last_checked_at: 2026-06-03T07:13:10.201Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:13:10.201Z
matched_actions: 223
action_count: 223
confidence: medium
summary: "Spec transport and all 223 actions verified (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device name \"X BE WE\" could not be mapped to a specific model; spec covers all models listed in compatible_with"
- "source does not describe settable parameters beyond discrete actions."
- "source does not describe unsolicited event notifications from projector."
- "no safety warnings or interlock procedures stated in source."
- "device name \"X BE WE\" — likely an internal JVC reference; no model by that exact name appears in the source document. Compatible model list derived from the full model list in the source document."
- "firmware version compatibility not stated in source."
- "RS-232C COM port number not stated in source."
- "LAN IP address defaults are stated (192.168.0.2 etc.) but these are installer-configurable; not hard-coded in the protocol."
- "full Remote Control Emulation command table (pages 7-13 of source) not fully enumerated here — subset included covering most common operations. Full table available at source pages 7-13."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
