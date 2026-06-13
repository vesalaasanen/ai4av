---
spec_id: admin/jvckenwood-dla-v800r
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVCKENWOOD DLA-V800R Control Spec"
manufacturer: JVCKENWOOD
model_family: DLA-V800R
aliases: []
compatible_with:
  manufacturers:
    - JVCKENWOOD
  models:
    - DLA-V800R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - "https://www.jvc.com/content/dam/jvc/usa/projectors/installers-calibrators/External-command_for-LEO4(Ver2.0).pdf"
  - "https://www.jvc.com/content/dam/jvc/usa/projectors/installers-calibrators/2024-D_ILA_External_command_(Ver1.0).pdf"
  - https://www.jvc.com/content/dam/jvc/usa/projectors/installers-calibrators/LANconnection_spec_2024_EN.pdf
retrieved_at: 2026-06-12T02:14:41.526Z
last_checked_at: 2026-06-12T19:22:49.762Z
generated_at: 2026-06-12T19:22:49.762Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DLA-V800R-specific command set differences vs. the documented family (which tops out at RS65/X90R) are not stated in the source."
  - "LAN control section source explicitly enumerates LAN-capable models (X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65) — DLA-V800R LAN capability not confirmed in source."
  - "settable numeric parameters (lens shift position, brightness level, etc.)"
  - "no unsolicited notification commands documented in source; projector"
  - "source does not document multi-step command sequences at the"
  - "source does not contain safety warnings, interlock procedures,"
  - "DLA-V800R-specific command set additions, deprecations, and 8K-relevant commands (e.g. 8K signal handling, HDMI 2.1 inputs) are not stated in the source."
  - "source does not specify whether DLA-V800R supports LAN control on port 20554; the LAN section names specific models that may not include V800R."
  - "source does not state a unit ID override (89 01 is fixed for all models in source)."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:22:49.762Z
  matched_actions: 120
  action_count: 120
  confidence: medium
  summary: "All 120 spec actions matched directly to source hex codes; transport parameters verbatim; bidirectional command coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# JVCKENWOOD DLA-V800R Control Spec

## Summary
JVCKENWOOD DLA-V800R is a D-ILA projector. This spec covers RS-232C and TCP/IP (LAN) control using the hex command protocol documented in the JVCKENWOOD "RS-232C, LAN and Infrared Remote Control Guide" (Version 1.4). The DLA-V800R is not explicitly named in the source document, but the RS-232C/LAN command set and transport parameters (19200 bps, 8N1, Port 20554) are shared across the documented projector family.

<!-- UNRESOLVED: DLA-V800R-specific command set differences vs. the documented family (which tops out at RS65/X90R) are not stated in the source. -->
<!-- UNRESOLVED: LAN control section source explicitly enumerates LAN-capable models (X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65) — DLA-V800R LAN capability not confirmed in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 20554  # LAN control TCP port from source page "Control Protocol"
serial:
  baud_rate: 19200  # source: "Data Rate 19200bps (19.2kbps)"
  data_bits: 8      # source: "Character Length 8 Bit"
  parity: none      # source: "Parity None"
  stop_bits: 1      # source: "Stop Bit 1"
  flow_control: none  # source: "Flow Control None"
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable    # inferred from Power On/Off command examples
- routable     # inferred from input switching command examples
- queryable    # inferred from Power/Input/Gamma/Source/Model status enquiry examples
- levelable    # inferred from brightness/contrast/colour/sharpness +/- command examples
```

## Actions
```yaml
# Direct Commands (pages 3-6 of source). Header 21, Unit ID 89 01, End 0A.
# All hex bytes verbatim from source.

- id: power_off_direct
  label: Power Off (Direct)
  kind: action
  command: "21 89 01 50 57 30 0A"
  params: []

- id: power_on_direct
  label: Power On (Direct)
  kind: action
  command: "21 89 01 50 57 31 0A"
  params: []

- id: input_hdmi1_direct
  label: Input HDMI 1 (Direct)
  kind: action
  command: "21 89 01 49 50 36 0A"
  params: []

- id: input_hdmi2_direct
  label: Input HDMI 2 (Direct)
  kind: action
  command: "21 89 01 49 50 37 0A"
  params: []

- id: input_component_direct
  label: Input Component (Direct)
  kind: action
  command: "21 89 01 49 50 32 0A"
  params: []

- id: input_svideo_direct
  label: Input S-Video (Direct)
  kind: action
  command: "21 89 01 49 50 30 0A"
  params: []

- id: input_video_direct
  label: Input Video (Direct)
  kind: action
  command: "21 89 01 49 50 31 0A"
  params: []

- id: input_pc_direct
  label: Input PC (Direct, HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65)
  kind: action
  command: "21 89 01 49 50 33 0A"
  params: []

- id: input_next_direct
  label: Input Next (Direct)
  kind: action
  command: "21 89 01 49 50 2B 0A"
  params: []

- id: input_prev_direct
  label: Input Previous (Direct)
  kind: action
  command: "21 89 01 49 50 2D 0A"
  params: []

- id: gamma_normal
  label: Gamma Normal
  kind: action
  command: "21 89 01 47 54 30 0A"
  params: []

- id: gamma_a
  label: Gamma A
  kind: action
  command: "21 89 01 47 54 31 0A"
  params: []

- id: gamma_b
  label: Gamma B
  kind: action
  command: "21 89 01 47 54 32 0A"
  params: []

- id: gamma_c
  label: Gamma C
  kind: action
  command: "21 89 01 47 54 33 0A"
  params: []

- id: gamma_d
  label: Gamma D (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)
  kind: action
  command: "21 89 01 47 54 37 0A"
  params: []

- id: gamma_custom1
  label: Gamma Custom 1
  kind: action
  command: "21 89 01 47 54 34 0A"
  params: []

- id: gamma_custom2
  label: Gamma Custom 2
  kind: action
  command: "21 89 01 47 54 35 0A"
  params: []

- id: gamma_custom3
  label: Gamma Custom 3
  kind: action
  command: "21 89 01 47 54 36 0A"
  params: []

- id: gamma_value_1_8
  label: Gamma Correction Value 1.8
  kind: action
  command: "21 89 01 47 50 30 0A"
  params: []

- id: gamma_value_1_9
  label: Gamma Correction Value 1.9
  kind: action
  command: "21 89 01 47 50 31 0A"
  params: []

- id: gamma_value_2_0
  label: Gamma Correction Value 2.0
  kind: action
  command: "21 89 01 47 50 32 0A"
  params: []

- id: gamma_value_2_1
  label: Gamma Correction Value 2.1
  kind: action
  command: "21 89 01 47 50 33 0A"
  params: []

- id: gamma_value_2_2
  label: Gamma Correction Value 2.2 (Default)
  kind: action
  command: "21 89 01 47 50 34 0A"
  params: []

- id: gamma_value_2_3
  label: Gamma Correction Value 2.3
  kind: action
  command: "21 89 01 47 50 35 0A"
  params: []

- id: gamma_value_2_4
  label: Gamma Correction Value 2.4
  kind: action
  command: "21 89 01 47 50 36 0A"
  params: []

- id: gamma_value_2_5
  label: Gamma Correction Value 2.5
  kind: action
  command: "21 89 01 47 50 37 0A"
  params: []

- id: gamma_value_2_6
  label: Gamma Correction Value 2.6
  kind: action
  command: "21 89 01 47 50 38 0A"
  params: []

- id: off_timer_off
  label: Off Timer Off (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
  kind: action
  command: "21 89 01 46 55 4F 54 30 0A"
  params: []

- id: off_timer_1h
  label: Off Timer 1 Hour
  kind: action
  command: "21 89 01 46 55 4F 54 31 0A"
  params: []

- id: off_timer_2h
  label: Off Timer 2 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 32 0A"
  params: []

- id: off_timer_3h
  label: Off Timer 3 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 33 0A"
  params: []

- id: off_timer_4h
  label: Off Timer 4 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 34 0A"
  params: []

- id: lamp_power_normal
  label: Lamp Power Normal
  kind: action
  command: "21 89 01 50 4D 4C 50 30 0A"
  params: []

- id: lamp_power_high
  label: Lamp Power High
  kind: action
  command: "21 89 01 50 4D 4C 50 31 0A"
  params: []

- id: remote_code_a
  label: Remote Code A
  kind: action
  command: "21 89 01 53 55 52 43 30 0A"
  params: []

- id: remote_code_b
  label: Remote Code B
  kind: action
  command: "21 89 01 53 55 52 43 31 0A"
  params: []

- id: trigger_off
  label: Trigger Off
  kind: action
  command: "21 89 01 46 55 54 52 30 0A"
  params: []

- id: trigger_on_power
  label: Trigger On (Power)
  kind: action
  command: "21 89 01 46 55 54 52 31 0A"
  params: []

- id: trigger_on_anamorphic
  label: Trigger On (Anamorphic)
  kind: action
  command: "21 89 01 46 55 54 52 32 0A"
  params: []

- id: anamorphic_off_direct
  label: Anamorphic Off (Direct)
  kind: action
  command: "21 89 01 49 4E 56 53 30 0A"
  params: []

- id: anamorphic_a_direct
  label: Anamorphic A (Direct)
  kind: action
  command: "21 89 01 49 4E 56 53 31 0A"
  params: []

- id: anamorphic_b_direct
  label: Anamorphic B (Direct)
  kind: action
  command: "21 89 01 49 4E 56 53 32 0A"
  params: []

- id: picture_mode_film
  label: Picture Mode Film (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 30 0A"
  params: []

- id: picture_mode_cinema
  label: Picture Mode Cinema (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 31 0A"
  params: []

- id: picture_mode_animation
  label: Picture Mode Animation (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 32 0A"
  params: []

- id: picture_mode_natural
  label: Picture Mode Natural (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 33 0A"
  params: []

- id: picture_mode_stage
  label: Picture Mode Stage (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 34 0A"
  params: []

- id: picture_mode_thx_x70_x90
  label: Picture Mode THX (X70/X90/RS55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 36 0A"
  params: []

- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  command: "21 89 01 50 4D 50 4D 30 42 0A"
  params: []

- id: picture_mode_user1
  label: Picture Mode User 1
  kind: action
  command: "21 89 01 50 4D 50 4D 30 43 0A"
  params: []

- id: picture_mode_user2
  label: Picture Mode User 2
  kind: action
  command: "21 89 01 50 4D 50 4D 30 44 0A"
  params: []

- id: picture_mode_user3
  label: Picture Mode User 3
  kind: action
  command: "21 89 01 50 4D 50 4D 30 45 0A"
  params: []

- id: picture_mode_user4
  label: Picture Mode User 4
  kind: action
  command: "21 89 01 50 4D 50 4D 30 46 0A"
  params: []

- id: picture_mode_user5
  label: Picture Mode User 5
  kind: action
  command: "21 89 01 50 4D 50 4D 31 30 0A"
  params: []

- id: colour_profile_off
  label: Colour Profile Off
  kind: action
  command: "21 89 01 50 4D 50 52 30 30 0A"
  params: []

- id: colour_profile_film1
  label: Colour Profile Film 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 31 0A"
  params: []

- id: colour_profile_film2
  label: Colour Profile Film 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 32 0A"
  params: []

- id: colour_profile_standard
  label: Colour Profile Standard
  kind: action
  command: "21 89 01 50 4D 50 52 30 33 0A"
  params: []

- id: colour_profile_cinema1
  label: Colour Profile Cinema 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 34 0A"
  params: []

- id: colour_profile_cinema2
  label: Colour Profile Cinema 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 35 0A"
  params: []

- id: colour_profile_anime1
  label: Colour Profile Anime 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 36 0A"
  params: []

- id: colour_profile_anime2
  label: Colour Profile Anime 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 37 0A"
  params: []

- id: colour_profile_video
  label: Colour Profile Video
  kind: action
  command: "21 89 01 50 4D 50 52 30 38 0A"
  params: []

- id: colour_profile_vivid
  label: Colour Profile Vivid
  kind: action
  command: "21 89 01 50 4D 50 52 30 39 0A"
  params: []

- id: colour_profile_adobe
  label: Colour Profile Adobe
  kind: action
  command: "21 89 01 50 4D 50 52 30 41 0A"
  params: []

- id: colour_profile_stage
  label: Colour Profile Stage
  kind: action
  command: "21 89 01 50 4D 50 52 30 42 0A"
  params: []

- id: colour_profile_3d
  label: Colour Profile 3D
  kind: action
  command: "21 89 01 50 4D 50 52 30 43 0A"
  params: []

- id: colour_profile_thx
  label: Colour Profile THX
  kind: action
  command: "21 89 01 50 4D 50 52 30 44 0A"
  params: []

- id: threed_format_off
  label: 3D Format Off (2D)
  kind: action
  command: "21 89 01 49 53 33 44 30 0A"
  params: []

- id: threed_format_auto
  label: 3D Format Auto
  kind: action
  command: "21 89 01 49 53 33 44 31 0A"
  params: []

- id: threed_format_frame_packing
  label: 3D Format Frame Packing
  kind: action
  command: "21 89 01 49 53 33 44 32 0A"
  params: []

- id: threed_format_side_by_side
  label: 3D Format Side by Side
  kind: action
  command: "21 89 01 49 53 33 44 33 0A"
  params: []

- id: threed_format_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  command: "21 89 01 49 53 33 44 34 0A"
  params: []

- id: threed_subtitle_correction_off
  label: 3D Subtitle Correction Off
  kind: action
  command: "21 89 01 49 53 33 54 31 0A"
  params: []

- id: threed_subtitle_correction_on
  label: 3D Subtitle Correction On
  kind: action
  command: "21 89 01 49 53 33 54 30 0A"
  params: []

- id: lens_memory_save_1
  label: Lens Memory Save Memory 1
  kind: action
  command: "21 89 01 49 4E 4D 53 30 0A"
  params: []

- id: lens_memory_save_2
  label: Lens Memory Save Memory 2
  kind: action
  command: "21 89 01 49 4E 4D 53 31 0A"
  params: []

- id: lens_memory_save_3
  label: Lens Memory Save Memory 3
  kind: action
  command: "21 89 01 49 4E 4D 53 32 0A"
  params: []

- id: lens_memory_select_1
  label: Lens Memory Select Memory 1
  kind: action
  command: "21 89 01 49 4E 4D 4C 30 0A"
  params: []

- id: lens_memory_select_2
  label: Lens Memory Select Memory 2
  kind: action
  command: "21 89 01 49 4E 4D 4C 31 0A"
  params: []

- id: lens_memory_select_3
  label: Lens Memory Select Memory 3
  kind: action
  command: "21 89 01 49 4E 4D 4C 32 0A"
  params: []

- id: test_null
  label: Null Command (communication check)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

# --- Remote Control Emulation Commands (pages 7-13 of source) ---
# Header 21 89 01, suffix 0A, ASCII byte 73 37 33 (RC) precedes the 2-byte data.

- id: rc_power_on
  label: Power On (RC)
  kind: action
  command: "21 89 01 52 43 37 33 30 35 0A"
  params: []

- id: rc_power_off
  label: Power Off (RC; send twice with short delay)
  kind: action
  command: "21 89 01 52 43 37 33 30 36 0A"
  params: []

- id: rc_input_hdmi1
  label: Input HDMI 1 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 30 0A"
  params: []

- id: rc_input_hdmi2
  label: Input HDMI 2 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 31 0A"
  params: []

- id: rc_input_component
  label: Input Component (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 44 0A"
  params: []

- id: rc_input_pc
  label: Input PC (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 36 0A"
  params: []

- id: rc_input_svideo
  label: Input S-Video (RC, HD350/550/750/950/990)
  kind: action
  command: "21 89 01 52 43 37 33 34 43 0A"
  params: []

- id: rc_input_video
  label: Input Video (RC, HD350/550/750/950/990)
  kind: action
  command: "21 89 01 52 43 37 33 34 42 0A"
  params: []

- id: rc_input_next
  label: Input Next (RC, cycle)
  kind: action
  command: "21 89 01 52 43 37 33 30 38 0A"
  params: []

- id: rc_aspect_16_9
  label: Aspect 16:9 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 32 36 0A"
  params: []

- id: rc_aspect_4_3
  label: Aspect 4:3 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 32 35 0A"
  params: []

- id: rc_aspect_zoom
  label: Aspect Zoom (RC)
  kind: action
  command: "21 89 01 52 43 37 33 32 37 0A"
  params: []

- id: rc_aspect_next
  label: Aspect Next (RC, cycle)
  kind: action
  command: "21 89 01 52 43 37 33 37 37 0A"
  params: []

- id: rc_menu_toggle
  label: Menu On/Off Toggle (RC)
  kind: action
  command: "21 89 01 52 43 37 33 32 45 0A"
  params: []

- id: rc_ok
  label: OK (RC)
  kind: action
  command: "21 89 01 52 43 37 33 32 46 0A"
  params: []

- id: rc_back
  label: Back (RC)
  kind: action
  command: "21 89 01 52 43 37 33 30 33 0A"
  params: []

- id: rc_cursor_up
  label: Cursor Up (RC)
  kind: action
  command: "21 89 01 52 43 37 33 30 31 0A"
  params: []

- id: rc_cursor_down
  label: Cursor Down (RC)
  kind: action
  command: "21 89 01 52 43 37 33 30 32 0A"
  params: []

- id: rc_cursor_left
  label: Cursor Left (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 36 0A"
  params: []

- id: rc_cursor_right
  label: Cursor Right (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 34 0A"
  params: []

- id: rc_brightness_down
  label: Brightness Down (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 42 0A"
  params: []

- id: rc_brightness_up
  label: Brightness Up (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 41 0A"
  params: []

- id: rc_contrast_down
  label: Contrast Down (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 39 0A"
  params: []

- id: rc_contrast_up
  label: Contrast Up (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 38 0A"
  params: []

- id: rc_colour_down
  label: Colour Down (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 44 0A"
  params: []

- id: rc_colour_up
  label: Colour Up (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 43 0A"
  params: []

- id: rc_sharpness_down
  label: Sharpness Down (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 46 0A"
  params: []

- id: rc_sharpness_up
  label: Sharpness Up (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 45 0A"
  params: []

- id: rc_shutter_close
  label: Shutter Close (RC)
  kind: action
  command: "21 89 01 52 43 37 33 31 39 0A"
  params: []

- id: rc_shutter_open
  label: Shutter Open (RC)
  kind: action
  command: "21 89 01 52 43 37 33 31 41 0A"
  params: []

- id: rc_hide_on
  label: Hide On (RC)
  kind: action
  command: "21 89 01 52 43 37 33 44 30 0A"
  params: []

- id: rc_hide_off
  label: Hide Off (RC)
  kind: action
  command: "21 89 01 52 43 37 33 44 31 0A"
  params: []

# --- Status Enquiry Commands (pages 17-18 of source) ---
# Header 3F, Unit ID 89 01, End 0A.

- id: enquiry_power_status
  label: Power Status Enquiry
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []

- id: enquiry_input_status
  label: Input Status Enquiry
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []

- id: enquiry_gamma_table
  label: Gamma Table Enquiry
  kind: query
  command: "3F 89 01 47 54 0A"
  params: []

- id: enquiry_gamma_value
  label: Gamma Value Enquiry
  kind: query
  command: "3F 89 01 47 50 0A"
  params: []

- id: enquiry_source_status
  label: Source Status Enquiry
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []

- id: enquiry_model_status
  label: Model Status Enquiry
  kind: query
  command: "3F 89 01 4D 44 0A"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, emergency]
  description: |
    Detailed response byte RR in 40 89 01 50 57 RR 0A.
    30 = Standby, 31 = Power On, 32 = Cooling, 34 = Emergency.
    Power Status Enquiry Command: 3F 89 01 50 57 0A.

- id: input_state
  type: enum
  values: [svideo, video, component, pc, hdmi1, hdmi2]
  description: |
    Detailed response byte RR in 40 89 01 49 50 RR 0A.
    30 = S-Video, 31 = Video, 32 = Component, 33 = PC, 36 = HDMI 1, 37 = HDMI 2.
    Input Status Enquiry Command: 3F 89 01 49 50 0A.

- id: gamma_table_state
  type: enum
  values: [normal, a, b, c, custom1, custom2, custom3]
  description: |
    Detailed response byte RR in 40 89 01 47 54 RR 0A.
    30 = Normal, 31 = A, 32 = B, 33 = C, 34 = Custom 1, 35 = Custom 2, 36 = Custom 3.

- id: gamma_value_state
  type: enum
  values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6"]
  description: |
    Detailed response byte RR in 40 89 01 47 50 RR 0A.
    30 = 1.8, 31 = 1.9, 32 = 2.0, 33 = 2.1, 34 = 2.2, 35 = 2.3, 36 = 2.4, 37 = 2.5, 38 = 2.6.

- id: source_state
  type: enum
  values: [jvc_logo, no_signal, signal_ok]
  description: |
    Detailed response byte RR in 40 89 01 53 43 RR 0A.
    00 = JVC Logo displayed, 30 = No signal or signal out of range, 31 = Signal input correctly.

- id: model_id
  type: string
  description: |
    Detailed response payload in 40 89 01 4D 44 <ASCII> 0A. Multi-byte ASCII identifies model:
    DLA-HD350 / DLA-RS10 / DLA-HD750+RS20 / DLA-HD550 / DLA-RS15 / DLA-HD950+HD990+RS25+RS35 /
    DLA-X3+RS40 / DLA-X7+X9+RS50+RS60 / DLA-X30+RS45 / DLA-X70R+X90R+RS55+RS65.
    Source does not list a DLA-V800R identifier.

- id: ack_basic
  type: bytes
  description: |
    Basic Acknowledgement Return Code: 06 89 01 CC CC 0A
    where CC CC is the first 2 bytes of the command sent to the projector (excluding 21 89 01).
    Confirms successful command receipt.
```

## Variables
```yaml
# UNRESOLVED: settable numeric parameters (lens shift position, brightness level, etc.)
# in this protocol are set via discrete +/- or named-value commands, not variable payloads.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification commands documented in source; projector
# only responds to commands and enquiry requests.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences at the
# protocol level. Power Off via Remote Control emulation must be sent twice
# with a short delay (per source page 13) - this is the only sequencing note.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings, interlock procedures,
# or power-on sequencing requirements at the protocol level.
```

## Notes
- Source document is "RS-232C, LAN and Infrared Remote Control Guide" Version 1.4. DLA-V800R is not enumerated in the model list (latest model listed: DLA-X90R / DLA-RS65). The transport parameters (RS-232C 19200 8N1; LAN TCP port 20554) and command format are assumed to be shared with the DLA-V800R family pending a V800R-specific source.
- RS-232 pinout: D-Sub 9 male, pin 2 RX, pin 3 TX, pin 5 GND. Use a cross-connected (null-modem) cable.
- Command format: 1-byte header + 2-byte unit ID (89 01) + 2-byte command + variable data + 1-byte end (0A). Headers: 21 = Operating Command, 3F = Enquiry, 06 = Basic Ack, 40 = Detailed Ack.
- LAN handshake: open TCP to port 20554 → projector replies "PJ_OK" → controller replies "PJREQ" within 5s → projector replies "PJACK" → send command within 5s → connection closes 5s after response.
- Projector discards commands if incoming data has a break ≥ 50 ms. Send next command only after receiving the acknowledgement.
- Source expresses hex without leading zeros in places (e.g. `21 89 01 49 50 2B 0A`); the 0x0A terminator is the same byte as ASCII LF. Do not strip it.
- For multi-projector IR setups, the projector accepts hex code 73 (Code A) or 63 (Code B); default is A.
- Crestron example for Power On: `\x21\x89\x01\x50\x57\x31\x0A\r`. AMX example: `SEND_STRING dvProj, "$21, $89, $01, $50, $57, $31, $0A"`.
<!-- UNRESOLVED: DLA-V800R-specific command set additions, deprecations, and 8K-relevant commands (e.g. 8K signal handling, HDMI 2.1 inputs) are not stated in the source. -->
<!-- UNRESOLVED: source does not specify whether DLA-V800R supports LAN control on port 20554; the LAN section names specific models that may not include V800R. -->
<!-- UNRESOLVED: source does not state a unit ID override (89 01 is fixed for all models in source). -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - "https://www.jvc.com/content/dam/jvc/usa/projectors/installers-calibrators/External-command_for-LEO4(Ver2.0).pdf"
  - "https://www.jvc.com/content/dam/jvc/usa/projectors/installers-calibrators/2024-D_ILA_External_command_(Ver1.0).pdf"
  - https://www.jvc.com/content/dam/jvc/usa/projectors/installers-calibrators/LANconnection_spec_2024_EN.pdf
retrieved_at: 2026-06-12T02:14:41.526Z
last_checked_at: 2026-06-12T19:22:49.762Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:22:49.762Z
matched_actions: 120
action_count: 120
confidence: medium
summary: "All 120 spec actions matched directly to source hex codes; transport parameters verbatim; bidirectional command coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DLA-V800R-specific command set differences vs. the documented family (which tops out at RS65/X90R) are not stated in the source."
- "LAN control section source explicitly enumerates LAN-capable models (X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65) — DLA-V800R LAN capability not confirmed in source."
- "settable numeric parameters (lens shift position, brightness level, etc.)"
- "no unsolicited notification commands documented in source; projector"
- "source does not document multi-step command sequences at the"
- "source does not contain safety warnings, interlock procedures,"
- "DLA-V800R-specific command set additions, deprecations, and 8K-relevant commands (e.g. 8K signal handling, HDMI 2.1 inputs) are not stated in the source."
- "source does not specify whether DLA-V800R supports LAN control on port 20554; the LAN section names specific models that may not include V800R."
- "source does not state a unit ID override (89 01 is fixed for all models in source)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
