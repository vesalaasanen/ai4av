---
spec_id: admin/jvc-dla-sx21-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC DLA-SX21 Control Spec"
manufacturer: JVC
model_family: DLA-SX21
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - DLA-SX21
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
source_urls:
  - http://www.support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:43.669Z
last_checked_at: 2026-06-02T17:22:42.114Z
generated_at: 2026-06-02T17:22:42.114Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document does not list DLA-SX21 in its compatible model set; this spec is generated from a multi-model guide and may or may not apply to the DLA-SX21 specifically"
  - "source does not document unsolicited notification events."
  - "source does not contain explicit safety warnings, interlock procedures,"
  - "DLA-SX21 not listed in source's compatible model set; protocol applicability to DLA-SX21 is uncertain."
  - "firmware version compatibility not stated in source."
  - "no voltage, current, power, or physical-installation specifications in source."
  - "no fault behavior or error recovery sequences documented beyond the \"ignores unrecognized commands\" note."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:42.114Z
  matched_actions: 329
  action_count: 329
  confidence: medium
  summary: "All 329 spec actions have verbatim hex matches in the source command tables; transport (19200/8N1, port 20554) confirmed; source inventory fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# JVC DLA-SX21 Control Spec

## Summary
RS-232C, LAN, and Infrared remote control guide covering JVC D-ILA projector models. Source document explicitly lists DLA-HD350/HD750/HD550/HD950/HD990, DLA-X3/X7/X9/X30/X70R/X90R, and DLA-RS10/RS15/RS20/RS25/RS35/RS40/RS45/RS50/RS55/RS60/RS65. The DLA-SX21 specified in the title is NOT listed in the source's model list; protocol applicability to the DLA-SX21 specifically is UNRESOLVED. Transport: RS-232C serial at 19200/8N1, LAN TCP port 20554 with PJ_OK/PJREQ/PJACK handshake, plus Infrared remote codes. All commands are 7-byte or 10-byte hex strings with format: Header + Unit ID (89 01) + Command + Data + 0A.

<!-- UNRESOLVED: source document does not list DLA-SX21 in its compatible model set; this spec is generated from a multi-model guide and may or may not apply to the DLA-SX21 specifically -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 20554
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**Infrared remote control:** codes are 2-byte hex with format `73 <ASCII-hex>` (default Code A = 73; Code B = 63 on certain models). See Notes section.

## Traits
```yaml
powerable: true       # Power On/Off commands present
routable: true        # Input switching commands present (HDMI 1/2, Component, S-Video, Video, PC)
queryable: true       # Status query commands returning values present (Power, Input, Gamma, Source, Model)
levelable: true       # Brightness, Contrast, Color, Sharpness, Tint adjustment commands present
```

## Actions
```yaml
# ============================================================
# DIRECT COMMANDS - POWER
# ============================================================
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

# ============================================================
# DIRECT COMMANDS - INPUT SWITCHING
# ============================================================
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
  label: Input PC (Direct)
  kind: action
  command: "21 89 01 49 50 33 0A"
  params: []

- id: input_next_direct
  label: Input + (next highest)
  kind: action
  command: "21 89 01 49 50 2B 0A"
  params: []

- id: input_prev_direct
  label: Input - (next lowest)
  kind: action
  command: "21 89 01 49 50 2D 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - TEST PATTERNS
# ============================================================
- id: test_pattern_off_direct
  label: Test Pattern Off
  kind: action
  command: "21 89 01 54 53 30 0A"
  params: []

- id: test_pattern_color_bars_direct
  label: Test Pattern Color Bars
  kind: action
  command: "21 89 01 54 53 31 0A"
  params: []

- id: test_pattern_stairstep_bw_direct
  label: Test Pattern Stairstep (B&W)
  kind: action
  command: "21 89 01 54 53 36 0A"
  params: []

- id: test_pattern_stairstep_red_direct
  label: Test Pattern Stairstep (Red)
  kind: action
  command: "21 89 01 54 53 37 0A"
  params: []

- id: test_pattern_stairstep_green_direct
  label: Test Pattern Stairstep (Green)
  kind: action
  command: "21 89 01 54 53 38 0A"
  params: []

- id: test_pattern_stairstep_blue_direct
  label: Test Pattern Stairstep (Blue)
  kind: action
  command: "21 89 01 54 53 39 0A"
  params: []

- id: test_pattern_crosshatch_green_direct
  label: Test Pattern Crosshatch (Green)
  kind: action
  command: "21 89 01 54 53 41 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - GAMMA TABLE
# ============================================================
- id: gamma_normal_direct
  label: Gamma Normal
  kind: action
  command: "21 89 01 47 54 30 0A"
  params: []

- id: gamma_a_direct
  label: Gamma A
  kind: action
  command: "21 89 01 47 54 31 0A"
  params: []

- id: gamma_b_direct
  label: Gamma B
  kind: action
  command: "21 89 01 47 54 32 0A"
  params: []

- id: gamma_c_direct
  label: Gamma C
  kind: action
  command: "21 89 01 47 54 33 0A"
  params: []

- id: gamma_d_direct
  label: Gamma D
  kind: action
  command: "21 89 01 47 54 37 0A"
  params: []

- id: gamma_custom1_direct
  label: Gamma Custom 1
  kind: action
  command: "21 89 01 47 54 34 0A"
  params: []

- id: gamma_custom2_direct
  label: Gamma Custom 2
  kind: action
  command: "21 89 01 47 54 35 0A"
  params: []

- id: gamma_custom3_direct
  label: Gamma Custom 3
  kind: action
  command: "21 89 01 47 54 36 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - GAMMA CORRECTION VALUE
# ============================================================
- id: gamma_value_1_8_direct
  label: Gamma Correction Value 1.8
  kind: action
  command: "21 89 01 47 50 30 0A"
  params: []

- id: gamma_value_1_9_direct
  label: Gamma Correction Value 1.9
  kind: action
  command: "21 89 01 47 50 31 0A"
  params: []

- id: gamma_value_2_0_direct
  label: Gamma Correction Value 2.0
  kind: action
  command: "21 89 01 47 50 32 0A"
  params: []

- id: gamma_value_2_1_direct
  label: Gamma Correction Value 2.1
  kind: action
  command: "21 89 01 47 50 33 0A"
  params: []

- id: gamma_value_2_2_direct
  label: Gamma Correction Value 2.2 (Default)
  kind: action
  command: "21 89 01 47 50 34 0A"
  params: []

- id: gamma_value_2_3_direct
  label: Gamma Correction Value 2.3
  kind: action
  command: "21 89 01 47 50 35 0A"
  params: []

- id: gamma_value_2_4_direct
  label: Gamma Correction Value 2.4
  kind: action
  command: "21 89 01 47 50 36 0A"
  params: []

- id: gamma_value_2_5_direct
  label: Gamma Correction Value 2.5
  kind: action
  command: "21 89 01 47 50 37 0A"
  params: []

- id: gamma_value_2_6_direct
  label: Gamma Correction Value 2.6
  kind: action
  command: "21 89 01 47 50 38 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - OFF TIMER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
# ============================================================
- id: off_timer_off_direct
  label: Off Timer Off
  kind: action
  command: "21 89 01 46 55 4F 54 30 0A"
  params: []

- id: off_timer_1h_direct
  label: Off Timer 1 Hour
  kind: action
  command: "21 89 01 46 55 4F 54 31 0A"
  params: []

- id: off_timer_2h_direct
  label: Off Timer 2 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 32 0A"
  params: []

- id: off_timer_3h_direct
  label: Off Timer 3 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 33 0A"
  params: []

- id: off_timer_4h_direct
  label: Off Timer 4 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 34 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - LAMP POWER
# ============================================================
- id: lamp_power_normal_direct
  label: Lamp Power Normal
  kind: action
  command: "21 89 01 50 4D 4C 50 30 0A"
  params: []

- id: lamp_power_high_direct
  label: Lamp Power High
  kind: action
  command: "21 89 01 50 4D 4C 50 31 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - INFRARED REMOTE CODE
# ============================================================
- id: ir_code_a_direct
  label: Remote Code A (hex 73)
  kind: action
  command: "21 89 01 53 55 52 43 30 0A"
  params: []

- id: ir_code_b_direct
  label: Remote Code B (hex 63)
  kind: action
  command: "21 89 01 53 55 52 43 31 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - TRIGGER OUTPUT
# ============================================================
- id: trigger_off_direct
  label: Trigger Off
  kind: action
  command: "21 89 01 46 55 54 52 30 0A"
  params: []

- id: trigger_on_power_direct
  label: Trigger On (Power)
  kind: action
  command: "21 89 01 46 55 54 52 31 0A"
  params: []

- id: trigger_on_anamorphic_direct
  label: Trigger On (Anamorphic)
  kind: action
  command: "21 89 01 46 55 54 52 32 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - CLEAR MOTION DRIVE
# ============================================================
- id: cmd_off_direct
  label: Clear Motion Drive Off
  kind: action
  command: "21 89 01 50 4D 43 4D 30 0A"
  params: []

- id: cmd_mode1_direct
  label: Clear Motion Drive Mode 1 (Low)
  kind: action
  command: "21 89 01 50 4D 43 4D 31 0A"
  params: []

- id: cmd_mode2_direct
  label: Clear Motion Drive Mode 2 (High)
  kind: action
  command: "21 89 01 50 4D 43 4D 32 0A"
  params: []

- id: cmd_mode3_direct
  label: Clear Motion Drive Mode 3
  kind: action
  command: "21 89 01 50 4D 43 4D 33 0A"
  params: []

- id: cmd_mode4_direct
  label: Clear Motion Drive Mode 4
  kind: action
  command: "21 89 01 50 4D 43 4D 34 0A"
  params: []

- id: cmd_inverse_telecine_direct
  label: Clear Motion Drive Inverse Telecine
  kind: action
  command: "21 89 01 50 4D 43 4D 35 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - ANAMORPHIC
# ============================================================
- id: anamorphic_off_direct
  label: Anamorphic Off
  kind: action
  command: "21 89 01 49 4E 56 53 30 0A"
  params: []

- id: anamorphic_a_direct
  label: Anamorphic A
  kind: action
  command: "21 89 01 49 4E 56 53 31 0A"
  params: []

- id: anamorphic_b_direct
  label: Anamorphic B
  kind: action
  command: "21 89 01 49 4E 56 53 32 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - PICTURE MODE (X30/X70/X90/RS45/55/65)
# ============================================================
- id: picture_mode_film_direct
  label: Picture Mode Film
  kind: action
  command: "21 89 01 50 4D 50 4D 30 30 0A"
  params: []

- id: picture_mode_cinema_direct
  label: Picture Mode Cinema
  kind: action
  command: "21 89 01 50 4D 50 4D 30 31 0A"
  params: []

- id: picture_mode_animation_direct
  label: Picture Mode Animation
  kind: action
  command: "21 89 01 50 4D 50 4D 30 32 0A"
  params: []

- id: picture_mode_natural_direct
  label: Picture Mode Natural
  kind: action
  command: "21 89 01 50 4D 50 4D 30 33 0A"
  params: []

- id: picture_mode_stage_direct
  label: Picture Mode Stage
  kind: action
  command: "21 89 01 50 4D 50 4D 30 34 0A"
  params: []

- id: picture_mode_thx_direct
  label: Picture Mode THX
  kind: action
  command: "21 89 01 50 4D 50 4D 30 36 0A"
  params: []

- id: picture_mode_3d_direct
  label: Picture Mode 3D
  kind: action
  command: "21 89 01 50 4D 50 4D 30 42 0A"
  params: []

- id: picture_mode_user1_direct
  label: Picture Mode User 1
  kind: action
  command: "21 89 01 50 4D 50 4D 30 43 0A"
  params: []

- id: picture_mode_user2_direct
  label: Picture Mode User 2
  kind: action
  command: "21 89 01 50 4D 50 4D 30 44 0A"
  params: []

- id: picture_mode_user3_direct
  label: Picture Mode User 3
  kind: action
  command: "21 89 01 50 4D 50 4D 30 45 0A"
  params: []

- id: picture_mode_user4_direct
  label: Picture Mode User 4
  kind: action
  command: "21 89 01 50 4D 50 4D 30 46 0A"
  params: []

- id: picture_mode_user5_direct
  label: Picture Mode User 5
  kind: action
  command: "21 89 01 50 4D 50 4D 31 30 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - PICTURE MODE (X3/X7/X9/RS40/50/60) - different opcodes
# ============================================================
- id: picture_mode_film_x3_direct
  label: Picture Mode Film (X3/X7/X9/RS40/50/60 variant)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []

- id: picture_mode_cinema_x3_direct
  label: Picture Mode Cinema (X3/X7/X9/RS40/50/60 variant)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []

- id: picture_mode_animation_x3_direct
  label: Picture Mode Animation (X3/X7/X9/RS40/50/60 variant)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []

- id: picture_mode_natural_x3_direct
  label: Picture Mode Natural (X3/X7/X9/RS40/50/60 variant)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []

- id: picture_mode_stage_x3_direct
  label: Picture Mode Stage (X3/X7/X9/RS40/50/60 variant)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []

- id: picture_mode_3d_x3_direct
  label: Picture Mode 3D (X3/X7/X9/RS40/50/60 variant)
  kind: action
  command: "21 89 01 50 4D 50 4D 45 0A"
  params: []

- id: picture_mode_user1_x3_direct
  label: Picture Mode User 1 (X3/X7/X9/RS40/50/60 variant)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []

- id: picture_mode_user2_x3_direct
  label: Picture Mode User 2 (X3/X7/X9/RS40/50/60 variant)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []

- id: picture_mode_thx_x3_direct
  label: Picture Mode THX (X3/X7/X9/RS40/50/60 variant)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - PICTURE MODE (HD350/750/550/950/990/RS10/20/15/25/35) - different opcodes
# ============================================================
- id: picture_mode_cinema1_hd_direct
  label: Picture Mode Cinema 1 (HD series)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []

- id: picture_mode_cinema2_hd_direct
  label: Picture Mode Cinema 2 (HD series)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []

- id: picture_mode_cinema3_hd_direct
  label: Picture Mode Cinema 3 (HD series)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []

- id: picture_mode_natural_hd_direct
  label: Picture Mode Natural (HD series)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []

- id: picture_mode_stage_hd_direct
  label: Picture Mode Stage (HD series)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []

- id: picture_mode_dynamic_hd_direct
  label: Picture Mode Dynamic (HD series)
  kind: action
  command: "21 89 01 50 4D 50 4D 35 0A"
  params: []

- id: picture_mode_user1_hd_direct
  label: Picture Mode User 1 (HD series)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []

- id: picture_mode_user2_hd_direct
  label: Picture Mode User 2 (HD series)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []

- id: picture_mode_thx_hd_direct
  label: Picture Mode THX (HD series)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - COLOUR PROFILE (X30/X70/X90/RS45/55/65)
# ============================================================
- id: colour_profile_off_direct
  label: Colour Profile Off
  kind: action
  command: "21 89 01 50 4D 50 52 30 30 0A"
  params: []

- id: colour_profile_film1_direct
  label: Colour Profile Film 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 31 0A"
  params: []

- id: colour_profile_film2_direct
  label: Colour Profile Film 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 32 0A"
  params: []

- id: colour_profile_standard_direct
  label: Colour Profile Standard
  kind: action
  command: "21 89 01 50 4D 50 52 30 33 0A"
  params: []

- id: colour_profile_cinema1_direct
  label: Colour Profile Cinema 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 34 0A"
  params: []

- id: colour_profile_cinema2_direct
  label: Colour Profile Cinema 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 35 0A"
  params: []

- id: colour_profile_anime1_direct
  label: Colour Profile Anime 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 36 0A"
  params: []

- id: colour_profile_anime2_direct
  label: Colour Profile Anime 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 37 0A"
  params: []

- id: colour_profile_video_direct
  label: Colour Profile Video
  kind: action
  command: "21 89 01 50 4D 50 52 30 38 0A"
  params: []

- id: colour_profile_vivid_direct
  label: Colour Profile Vivid
  kind: action
  command: "21 89 01 50 4D 50 52 30 39 0A"
  params: []

- id: colour_profile_adobe_direct
  label: Colour Profile Adobe
  kind: action
  command: "21 89 01 50 4D 50 52 30 41 0A"
  params: []

- id: colour_profile_stage_direct
  label: Colour Profile Stage
  kind: action
  command: "21 89 01 50 4D 50 52 30 42 0A"
  params: []

- id: colour_profile_3d_direct
  label: Colour Profile 3D
  kind: action
  command: "21 89 01 50 4D 50 52 30 43 0A"
  params: []

- id: colour_profile_thx_direct
  label: Colour Profile THX
  kind: action
  command: "21 89 01 50 4D 50 52 30 44 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - 3D FORMAT
# ============================================================
- id: 3d_format_off_direct
  label: 3D Format Off (2D)
  kind: action
  command: "21 89 01 49 53 33 44 30 0A"
  params: []

- id: 3d_format_auto_direct
  label: 3D Format Auto
  kind: action
  command: "21 89 01 49 53 33 44 31 0A"
  params: []

- id: 3d_format_frame_packing_direct
  label: 3D Format Frame Packing
  kind: action
  command: "21 89 01 49 53 33 44 32 0A"
  params: []

- id: 3d_format_side_by_side_direct
  label: 3D Format Side by Side
  kind: action
  command: "21 89 01 49 53 33 44 33 0A"
  params: []

- id: 3d_format_top_bottom_direct
  label: 3D Format Top and Bottom
  kind: action
  command: "21 89 01 49 53 33 44 34 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - 2D TO 3D CONVERSION
# ============================================================
- id: 2d_to_3d_off_direct
  label: 2D to 3D Conversion Off
  kind: action
  command: "21 89 01 49 53 33 43 30 0A"
  params: []

- id: 2d_to_3d_on_direct
  label: 2D to 3D Conversion On
  kind: action
  command: "21 89 01 49 53 33 43 31 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - 3D SUBTITLE CORRECTION
# ============================================================
- id: 3d_subtitle_off_direct
  label: 3D Subtitle Correction Off
  kind: action
  command: "21 89 01 49 53 33 54 31 0A"
  params: []

- id: 3d_subtitle_on_direct
  label: 3D Subtitle Correction On
  kind: action
  command: "21 89 01 49 53 33 54 30 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - LENS MEMORY
# ============================================================
- id: lens_memory_save_1_direct
  label: Lens Memory Save Memory 1
  kind: action
  command: "21 89 01 49 4E 4D 53 30 0A"
  params: []

- id: lens_memory_save_2_direct
  label: Lens Memory Save Memory 2
  kind: action
  command: "21 89 01 49 4E 4D 53 31 0A"
  params: []

- id: lens_memory_save_3_direct
  label: Lens Memory Save Memory 3
  kind: action
  command: "21 89 01 49 4E 4D 53 32 0A"
  params: []

- id: lens_memory_select_1_direct
  label: Lens Memory Select Memory 1
  kind: action
  command: "21 89 01 49 4E 4D 4C 30 0A"
  params: []

- id: lens_memory_select_2_direct
  label: Lens Memory Select Memory 2
  kind: action
  command: "21 89 01 49 4E 4D 4C 31 0A"
  params: []

- id: lens_memory_select_3_direct
  label: Lens Memory Select Memory 3
  kind: action
  command: "21 89 01 49 4E 4D 4C 32 0A"
  params: []

# ============================================================
# DIRECT COMMANDS - TEST (NULL) COMMAND
# ============================================================
- id: null_command_direct
  label: Null Command (communication check)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

# ============================================================
# REMOTE CONTROL EMULATION COMMANDS
# Format: 21 89 01 52 43 <code> 0A
# ============================================================
- id: rc_3d_setting
  label: 3D Setting menu (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 44 35 0A"
  params: []

- id: rc_3d_format_cycle
  label: 3D Format cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 44 36 0A"
  params: []

- id: rc_advanced_menu
  label: Picture Adjust > Advanced menu (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 33 0A"
  params: []

- id: rc_anamorphic_off
  label: Anamorphic Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 34 0A"
  params: []

- id: rc_anamorphic_a
  label: Anamorphic A (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 33 0A"
  params: []

- id: rc_anamorphic_b
  label: Anamorphic B (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 42 0A"
  params: []

- id: rc_anamorphic_cycle
  label: Anamorphic cycle Off/A/B (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 35 0A"
  params: []

- id: rc_aspect_16_9
  label: Aspect 16:9 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 36 0A"
  params: []

- id: rc_aspect_4_3
  label: Aspect 4:3 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 35 0A"
  params: []

- id: rc_aspect_zoom
  label: Aspect Zoom (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 37 0A"
  params: []

- id: rc_aspect_pc_auto
  label: Aspect (PC) Auto (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 45 0A"
  params: []

- id: rc_aspect_pc_full
  label: Aspect (PC) Full (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 30 0A"
  params: []

- id: rc_aspect_pc_just
  label: Aspect (PC) Just (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 46 0A"
  params: []

- id: rc_aspect_cycle
  label: Aspect cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 37 0A"
  params: []

- id: rc_auto_align
  label: Auto Align (PC input) (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 33 0A"
  params: []

- id: rc_auto_lens_centre
  label: Auto Lens Centre (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 39 0A"
  params: []

- id: rc_back
  label: Back (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 33 0A"
  params: []

- id: rc_bnr_off
  label: BNR Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 30 0A"
  params: []

- id: rc_bnr_on
  label: BNR On (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 46 0A"
  params: []

- id: rc_bright_level_down
  label: Bright Level - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 33 0A"
  params: []

- id: rc_bright_level_up
  label: Bright Level + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 32 0A"
  params: []

- id: rc_brightness_down
  label: Brightness - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 42 0A"
  params: []

- id: rc_brightness_up
  label: Brightness + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 41 0A"
  params: []

- id: rc_brightness_adj
  label: Brightness Adj Bar toggle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 39 0A"
  params: []

- id: rc_cec_off
  label: CEC Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 37 0A"
  params: []

- id: rc_cec_on
  label: CEC On (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 36 0A"
  params: []

- id: rc_cmd_cycle
  label: Clear Motion Drive cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 41 0A"
  params: []

- id: rc_cmd_off
  label: Clear Motion Drive Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 37 0A"
  params: []

- id: rc_cmd_mode1
  label: Clear Motion Drive Mode 1 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 45 0A"
  params: []

- id: rc_cmd_mode2
  label: Clear Motion Drive Mode 2 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 46 0A"
  params: []

- id: rc_cmd_mode3
  label: Clear Motion Drive Mode 3 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 38 0A"
  params: []

- id: rc_cmd_mode4
  label: Clear Motion Drive Mode 4 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 39 0A"
  params: []

- id: rc_cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 41 0A"
  params: []

- id: rc_colour_down
  label: Colour - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 44 0A"
  params: []

- id: rc_colour_up
  label: Colour + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 43 0A"
  params: []

- id: rc_colour_adj
  label: Colour Adj Bar toggle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 35 0A"
  params: []

- id: rc_colour_mgmt_off
  label: Colour Management Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 30 0A"
  params: []

- id: rc_colour_mgmt_custom1
  label: Colour Management Custom 1 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 31 0A"
  params: []

- id: rc_colour_mgmt_custom2
  label: Colour Management Custom 2 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 32 0A"
  params: []

- id: rc_colour_mgmt_custom3
  label: Colour Management Custom 3 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 33 0A"
  params: []

- id: rc_colour_mgmt_cycle
  label: Colour Management cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 39 0A"
  params: []

- id: rc_colour_profile_cycle
  label: Colour Profile cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 38 0A"
  params: []

- id: rc_colour_space_cycle
  label: Colour Space cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 44 0A"
  params: []

- id: rc_colour_temp_5800k
  label: Colour Temp 5800K (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 45 0A"
  params: []

- id: rc_colour_temp_6500k
  label: Colour Temp 6500K (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 46 0A"
  params: []

- id: rc_colour_temp_7500k
  label: Colour Temp 7500K (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 30 0A"
  params: []

- id: rc_colour_temp_9300k
  label: Colour Temp 9300K (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 31 0A"
  params: []

- id: rc_colour_temp_custom1
  label: Colour Temp Custom 1 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 33 0A"
  params: []

- id: rc_colour_temp_custom2
  label: Colour Temp Custom 2 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 34 0A"
  params: []

- id: rc_colour_temp_custom3
  label: Colour Temp Custom 3 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 35 0A"
  params: []

- id: rc_colour_temp_high_bright
  label: Colour Temp High Bright (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 32 0A"
  params: []

- id: rc_colour_temp_cycle
  label: Colour Temp cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 36 0A"
  params: []

- id: rc_colour_temp_gain_blue_down
  label: Colour Temp Gain Blue - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 31 0A"
  params: []

- id: rc_colour_temp_gain_blue_up
  label: Colour Temp Gain Blue + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 30 0A"
  params: []

- id: rc_colour_temp_gain_green_down
  label: Colour Temp Gain Green - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 46 0A"
  params: []

- id: rc_colour_temp_gain_green_up
  label: Colour Temp Gain Green + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 45 0A"
  params: []

- id: rc_colour_temp_gain_red_down
  label: Colour Temp Gain Red - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 44 0A"
  params: []

- id: rc_colour_temp_gain_red_up
  label: Colour Temp Gain Red + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 43 0A"
  params: []

- id: rc_colour_temp_offset_blue_down
  label: Colour Temp Offset Blue - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 37 0A"
  params: []

- id: rc_colour_temp_offset_blue_up
  label: Colour Temp Offset Blue + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 36 0A"
  params: []

- id: rc_colour_temp_offset_green_down
  label: Colour Temp Offset Green - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 35 0A"
  params: []

- id: rc_colour_temp_offset_green_up
  label: Colour Temp Offset Green + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 34 0A"
  params: []

- id: rc_colour_temp_offset_red_down
  label: Colour Temp Offset Red - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 33 0A"
  params: []

- id: rc_colour_temp_offset_red_up
  label: Colour Temp Offset Red + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 32 0A"
  params: []

- id: rc_contrast_down
  label: Contrast - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 39 0A"
  params: []

- id: rc_contrast_up
  label: Contrast + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 38 0A"
  params: []

- id: rc_contrast_adj
  label: Contrast Adj Bar toggle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 41 0A"
  params: []

- id: rc_cti_off
  label: CTI Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 43 0A"
  params: []

- id: rc_cti_low
  label: CTI Low (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 44 0A"
  params: []

- id: rc_cti_middle
  label: CTI Middle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 45 0A"
  params: []

- id: rc_cti_high
  label: CTI High (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 46 0A"
  params: []

- id: rc_cursor_down
  label: Cursor Down (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 32 0A"
  params: []

- id: rc_cursor_left
  label: Cursor Left (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 36 0A"
  params: []

- id: rc_cursor_right
  label: Cursor Right (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 34 0A"
  params: []

- id: rc_cursor_up
  label: Cursor Up (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 31 0A"
  params: []

- id: rc_dark_level_down
  label: Dark Level - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 35 0A"
  params: []

- id: rc_dark_level_up
  label: Dark Level + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 34 0A"
  params: []

- id: rc_detail_enhance_down
  label: Detail Enhance - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 32 0A"
  params: []

- id: rc_detail_enhance_up
  label: Detail Enhance + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 31 0A"
  params: []

- id: rc_picture_tone_blue_down
  label: Picture Tone Blue - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 31 0A"
  params: []

- id: rc_picture_tone_blue_up
  label: Picture Tone Blue + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 30 0A"
  params: []

- id: rc_picture_tone_green_down
  label: Picture Tone Green - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 46 0A"
  params: []

- id: rc_picture_tone_green_up
  label: Picture Tone Green + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 45 0A"
  params: []

- id: rc_picture_tone_red_down
  label: Picture Tone Red - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 44 0A"
  params: []

- id: rc_picture_tone_red_up
  label: Picture Tone Red + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 43 0A"
  params: []

- id: rc_picture_tone_white_down
  label: Picture Tone White - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 42 0A"
  params: []

- id: rc_picture_tone_white_up
  label: Picture Tone White + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 41 0A"
  params: []

- id: rc_gamma_a
  label: Gamma A (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 39 0A"
  params: []

- id: rc_gamma_b
  label: Gamma B (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 41 0A"
  params: []

- id: rc_gamma_c
  label: Gamma C (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 42 0A"
  params: []

- id: rc_gamma_custom1
  label: Gamma Custom 1 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 43 0A"
  params: []

- id: rc_gamma_custom2
  label: Gamma Custom 2 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 44 0A"
  params: []

- id: rc_gamma_custom3
  label: Gamma Custom 3 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 45 0A"
  params: []

- id: rc_gamma_d
  label: Gamma D (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 46 0A"
  params: []

- id: rc_gamma_normal
  label: Gamma Normal (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 38 0A"
  params: []

- id: rc_gamma_cycle
  label: Gamma cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 35 0A"
  params: []

- id: rc_hide_off
  label: Hide Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 44 31 0A"
  params: []

- id: rc_hide_on
  label: Hide On (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 44 30 0A"
  params: []

- id: rc_hide_toggle
  label: Hide toggle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 44 0A"
  params: []

- id: rc_hpos_down
  label: Horizontal Position - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 42 0A"
  params: []

- id: rc_hpos_up
  label: Horizontal Position + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 41 0A"
  params: []

- id: rc_info
  label: Information (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 34 0A"
  params: []

- id: rc_input_component
  label: Input Component (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 44 0A"
  params: []

- id: rc_input_hdmi1
  label: Input HDMI 1 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 30 0A"
  params: []

- id: rc_input_hdmi2
  label: Input HDMI 2 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 31 0A"
  params: []

- id: rc_input_pc
  label: Input PC (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 36 0A"
  params: []

- id: rc_input_svideo
  label: Input S-Video (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 43 0A"
  params: []

- id: rc_input_video
  label: Input Video (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 42 0A"
  params: []

- id: rc_input_cycle
  label: Input cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 38 0A"
  params: []

- id: rc_isf_day
  label: ISF Day (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 34 0A"
  params: []

- id: rc_isf_night
  label: ISF Night (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 35 0A"
  params: []

- id: rc_isf_off
  label: ISF Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 41 0A"
  params: []

- id: rc_isf_on
  label: ISF On (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 42 0A"
  params: []

- id: rc_keystone_h_down
  label: Keystone Horizontal - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 31 0A"
  params: []

- id: rc_keystone_h_up
  label: Keystone Horizontal + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 30 0A"
  params: []

- id: rc_keystone_v_down
  label: Keystone Vertical - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 43 0A"
  params: []

- id: rc_keystone_v_up
  label: Keystone Vertical + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 42 0A"
  params: []

- id: rc_lens_aperture_1
  label: Lens Aperture 1 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 38 0A"
  params: []

- id: rc_lens_aperture_2
  label: Lens Aperture 2 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 39 0A"
  params: []

- id: rc_lens_aperture_3
  label: Lens Aperture 3 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 41 0A"
  params: []

- id: rc_lens_aperture_down
  label: Lens Aperture - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 46 0A"
  params: []

- id: rc_lens_aperture_up
  label: Lens Aperture + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 45 0A"
  params: []

- id: rc_lens_aperture_adj
  label: Lens Aperture Adj (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 30 0A"
  params: []

- id: rc_lens_control_cycle
  label: Lens Control cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 30 0A"
  params: []

- id: rc_lens_focus_down
  label: Lens Focus - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 32 0A"
  params: []

- id: rc_lens_focus_up
  label: Lens Focus + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 31 0A"
  params: []

- id: rc_lens_memory_cycle
  label: Lens Memory cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 44 34 0A"
  params: []

- id: rc_lens_memory_1
  label: Lens Memory 1 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 44 38 0A"
  params: []

- id: rc_lens_memory_2
  label: Lens Memory 2 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 44 39 0A"
  params: []

- id: rc_lens_memory_3
  label: Lens Memory 3 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 44 41 0A"
  params: []

- id: rc_lens_shift_down
  label: Lens Shift Down (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 32 0A"
  params: []

- id: rc_lens_shift_left
  label: Lens Shift Left (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 34 0A"
  params: []

- id: rc_lens_shift_right
  label: Lens Shift Right (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 33 0A"
  params: []

- id: rc_lens_shift_up
  label: Lens Shift Up (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 31 0A"
  params: []

- id: rc_lens_zoom_in
  label: Lens Zoom In (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 35 0A"
  params: []

- id: rc_lens_zoom_out
  label: Lens Zoom Out (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 33 37 0A"
  params: []

- id: rc_mask_bottom_down
  label: Mask Bottom - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 38 0A"
  params: []

- id: rc_mask_bottom_up
  label: Mask Bottom + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 37 0A"
  params: []

- id: rc_mask_left_down
  label: Mask Left - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 32 0A"
  params: []

- id: rc_mask_left_up
  label: Mask Left + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 31 0A"
  params: []

- id: rc_mask_right_down
  label: Mask Right - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 34 0A"
  params: []

- id: rc_mask_right_up
  label: Mask Right + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 33 0A"
  params: []

- id: rc_mask_top_down
  label: Mask Top - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 36 0A"
  params: []

- id: rc_mask_top_up
  label: Mask Top + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 35 0A"
  params: []

- id: rc_menu_toggle
  label: Menu On/Off toggle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 45 0A"
  params: []

- id: rc_menu_position
  label: Menu Position (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 34 32 0A"
  params: []

- id: rc_mnr_down
  label: MNR - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 45 0A"
  params: []

- id: rc_mnr_up
  label: MNR + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 44 0A"
  params: []

- id: rc_nr_toggle
  label: NR display toggle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 38 0A"
  params: []

- id: rc_ok
  label: OK (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 46 0A"
  params: []

- id: rc_phase_down
  label: Phase (PC) - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 39 0A"
  params: []

- id: rc_phase_up
  label: Phase (PC) + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 38 0A"
  params: []

- id: rc_picture_adjust
  label: Picture Adjust (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 32 0A"
  params: []

- id: rc_picture_mode_3d
  label: Picture Mode 3D (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 37 0A"
  params: []

- id: rc_picture_mode_cinema1
  label: Picture Mode Cinema 1 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 39 0A"
  params: []

- id: rc_picture_mode_cinema2
  label: Picture Mode Cinema 2 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 38 0A"
  params: []

- id: rc_picture_mode_cinema3
  label: Picture Mode Cinema 3 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 36 0A"
  params: []

- id: rc_picture_mode_dynamic
  label: Picture Mode Dynamic (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 42 0A"
  params: []

- id: rc_picture_mode_natural
  label: Picture Mode Natural (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 41 0A"
  params: []

- id: rc_picture_mode_stage
  label: Picture Mode Stage (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 37 0A"
  params: []

- id: rc_picture_mode_thx
  label: Picture Mode THX (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 46 0A"
  params: []

- id: rc_picture_mode_user1
  label: Picture Mode User 1 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 43 0A"
  params: []

- id: rc_picture_mode_user2
  label: Picture Mode User 2 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 44 0A"
  params: []

- id: rc_picture_mode_user3
  label: Picture Mode User 3 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 36 45 0A"
  params: []

- id: rc_picture_mode_user4
  label: Picture Mode User 4 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 41 0A"
  params: []

- id: rc_picture_mode_user5
  label: Picture Mode User 5 (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 42 0A"
  params: []

- id: rc_pixel_shift_h_blue_down
  label: Pixel Shift H Blue - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 45 0A"
  params: []

- id: rc_pixel_shift_h_blue_up
  label: Pixel Shift H Blue + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 44 0A"
  params: []

- id: rc_pixel_shift_h_green_down
  label: Pixel Shift H Green - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 43 0A"
  params: []

- id: rc_pixel_shift_h_green_up
  label: Pixel Shift H Green + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 42 0A"
  params: []

- id: rc_pixel_shift_h_red_down
  label: Pixel Shift H Red - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 41 0A"
  params: []

- id: rc_pixel_shift_h_red_up
  label: Pixel Shift H Red + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 39 0A"
  params: []

- id: rc_pixel_shift_v_blue_down
  label: Pixel Shift V Blue - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 34 0A"
  params: []

- id: rc_pixel_shift_v_blue_up
  label: Pixel Shift V Blue + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 33 0A"
  params: []

- id: rc_pixel_shift_v_green_down
  label: Pixel Shift V Green - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 32 0A"
  params: []

- id: rc_pixel_shift_v_green_up
  label: Pixel Shift V Green + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 31 0A"
  params: []

- id: rc_pixel_shift_v_red_down
  label: Pixel Shift V Red - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 30 0A"
  params: []

- id: rc_pixel_shift_v_red_up
  label: Pixel Shift V Red + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 42 46 0A"
  params: []

- id: rc_power_off
  label: Power Off (RC emul; send twice with short delay)
  kind: action
  command: "21 89 01 52 43 37 33 30 36 0A"
  params: []

- id: rc_power_on
  label: Power On (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 35 0A"
  params: []

- id: rc_rnr_down
  label: RNR - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 43 0A"
  params: []

- id: rc_rnr_up
  label: RNR + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 30 42 0A"
  params: []

- id: rc_screen_adjust_off
  label: Screen Adjust Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 30 0A"
  params: []

- id: rc_screen_adjust_a
  label: Screen Adjust A (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 31 0A"
  params: []

- id: rc_screen_adjust_b
  label: Screen Adjust B (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 32 0A"
  params: []

- id: rc_screen_adjust_c
  label: Screen Adjust C (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 33 0A"
  params: []

- id: rc_sharpness_down
  label: Sharpness - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 46 0A"
  params: []

- id: rc_sharpness_up
  label: Sharpness + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 37 45 0A"
  params: []

- id: rc_sharpness_adj
  label: Sharpness Adj Bar toggle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 34 0A"
  params: []

- id: rc_shutter_close
  label: Shutter Close (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 39 0A"
  params: []

- id: rc_shutter_open
  label: Shutter Open (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 41 0A"
  params: []

- id: rc_shutter_off
  label: Shutter Off - un-sync from Hide (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 44 0A"
  params: []

- id: rc_shutter_on
  label: Shutter On - sync with Hide (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 43 0A"
  params: []

- id: rc_test_pattern_cycle
  label: Test Pattern cycle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 35 39 0A"
  params: []

- id: rc_thx_bright
  label: THX Bright (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 35 0A"
  params: []

- id: rc_thx_dark
  label: THX Dark (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 38 36 0A"
  params: []

- id: rc_thx_off
  label: THX Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 37 0A"
  params: []

- id: rc_thx_on
  label: THX On (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 43 38 0A"
  params: []

- id: rc_tint_down
  label: Tint - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 39 0A"
  params: []

- id: rc_tint_up
  label: Tint + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 39 38 0A"
  params: []

- id: rc_tint_adj
  label: Tint Adj Bar toggle (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 31 36 0A"
  params: []

- id: rc_tracking_down
  label: Tracking (PC) - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 37 0A"
  params: []

- id: rc_tracking_up
  label: Tracking (PC) + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 36 0A"
  params: []

- id: rc_user_cycle
  label: User cycle (User 1-5) (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 44 37 0A"
  params: []

- id: rc_vpos_down
  label: Vertical Position - (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 44 0A"
  params: []

- id: rc_vpos_up
  label: Vertical Position + (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 41 43 0A"
  params: []

- id: rc_vertical_stretch_off
  label: Vertical Stretch Off (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 34 0A"
  params: []

- id: rc_vertical_stretch_on
  label: Vertical Stretch On (RC emul)
  kind: action
  command: "21 89 01 52 43 37 33 32 33 0A"
  params: []

# ============================================================
# QUERY COMMANDS (3F prefix) - Acknowledgement Enquiry
# ============================================================
- id: query_power_status
  label: Power Status Query
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []

- id: query_input_status
  label: Input Status Query
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []

- id: query_gamma_table
  label: Gamma Table Query
  kind: query
  command: "3F 89 01 47 54 0A"
  params: []

- id: query_gamma_value
  label: Gamma Value Query
  kind: query
  command: "3F 89 01 47 50 0A"
  params: []

- id: query_source_status
  label: Source Status Query
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []

- id: query_model_status
  label: Model Status Query
  kind: query
  command: "3F 89 01 4D 44 0A"
  params: []
```

## Feedbacks
```yaml
# Basic acknowledgement (6 bytes; header 06; same for all commands)
- id: ack_basic
  description: Basic acknowledgement; returned for every command
  format: "06 89 01 <CC CC> 0A"
  notes: "CC CC is the first 2 bytes of the original command (excluding 21 89 01)"

# Detailed acknowledgement (8 bytes; header 40; follows 06 ack for query responses)
- id: ack_detailed
  description: Detailed response code; follows basic ack after a query
  format: "40 89 01 <CC CC RR> 0A"
  notes: "RR is the detailed response code for the queried value"

# Power status detailed codes
- id: power_state
  type: enum
  description: Power status detailed return code
  values:
    - "30: Standby"
    - "31: Power On"
    - "32: Cooling"
    - "34: Emergency"

# Input status detailed codes
- id: input_state
  type: enum
  description: Input status detailed return code
  values:
    - "30: S-Video"
    - "31: Video"
    - "32: Component"
    - "33: PC"
    - "36: HDMI 1"
    - "37: HDMI 2"

# Gamma table detailed codes
- id: gamma_table
  type: enum
  description: Gamma table detailed return code
  values:
    - "30: Gamma Normal"
    - "31: Gamma A"
    - "32: Gamma B"
    - "33: Gamma C"
    - "34: Gamma Custom 1"
    - "35: Gamma Custom 2"
    - "36: Gamma Custom 3"

# Gamma value detailed codes
- id: gamma_value
  type: enum
  description: Gamma correction value detailed return code
  values:
    - "30: 1.8"
    - "31: 1.9"
    - "32: 2.0"
    - "33: 2.1"
    - "34: 2.2"
    - "35: 2.3"
    - "36: 2.4"
    - "37: 2.5"
    - "38: 2.6"

# Source status detailed codes
- id: source_state
  type: enum
  description: Video source status detailed return code
  values:
    - "00: JVC Logo displayed"
    - "30: No signal or signal out of range"
    - "31: Signal input correctly"

# Model status (variable-length hex string returned)
- id: model_state
  type: string
  description: Projector model identifier (hex ASCII string in detailed response)
  values:
    - "494C41 46 504A 202D 2D 202D 5848 34: DLA-HD350"
    - "494C41 46 504A 202D 2D 202D 5848 37: DLA-RS10"
    - "494C41 46 504A 202D 2D 202D 5848 35: DLA-HD750 & DLA-RS20"
    - "494C41 46 504A 202D 2D 202D 5848 38: DLA-HD550"
    - "494C41 46 504A 202D 2D 202D 5848 41: DLA-RS15"
    - "494C41 46 504A 202D 2D 202D 5848 39: DLA-HD950/HD990/DLA-RS25/RS35"
    - "494C41 46 504A 202D 2D 202D 5848 42: DLA-X3 & DLA-RS40"
    - "494C41 46 504A 202D 2D 202D 5848 43: DLA-X7/X9 & DLA-RS50/60"
    - "494C41 46 504A 202D 2D 202D 5848 45: DLA-X30 & DLA-RS45"
    - "494C41 46 504A 202D 2D 202D 5848 46: DLA-X70R/X90R & DLA-RS55/65"
```

## Variables
```yaml
# RS-232C / LAN connection parameters; settable on the projector network page or RS-232C menu.
- id: ip_address
  type: string
  default: "192.168.0.2"
  description: "Projector IP address (LAN control only; manual set when DHCP Off)"

- id: subnet_mask
  type: string
  default: "255.255.255.0"
  description: "Projector subnet mask (LAN control only)"

- id: default_gateway
  type: string
  default: "192.168.0.254"
  description: "Projector default gateway (LAN control only)"

- id: dhcp_client
  type: enum
  values: [off, on]
  default: off
  description: "DHCP client enable for automatic IP address assignment (LAN control only)"

- id: mac_address
  type: string
  description: "6-byte hex MAC address identifying the projector on the LAN (read-only, not settable via control protocol)"
  notes: "Source documents this as a readable but not configurable field"

# Communication Terminal selection (RS-232C vs LAN)
- id: communication_terminal
  type: enum
  values: [rs_232c, lan]
  default: rs_232c
  description: "Selects active control interface; set via Function menu (not via control protocol)"
  notes: "Source documents this as a menu setting, not a controllable command"
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notification events.
# Acknowledgement responses are solicited (returned in reply to a sent command or query),
# not pushed asynchronously.
```

## Macros
```yaml
# Connection establishment sequence (LAN only). Per source pages 19-20.
- id: lan_connection_handshake
  description: "Five-step TCP handshake required before sending each LAN command"
  steps:
    - step: 1
      action: "Controller opens TCP connection to projector on port 20554"
    - step: 2
      action: "Projector immediately responds with ASCII string: PJ_OK"
    - step: 3
      action: "Controller must send PJREQ within 5 seconds"
    - step: 4
      action: "Projector responds with ASCII string: PJACK"
    - step: 5
      action: "Controller must send command within 5 seconds of receiving PJACK"
  notes: "If controller fails to respond in steps 3 or 5 within 5 seconds, the projector closes the connection. After completing one command, the projector closes the network connection after 5 seconds. To send more commands, repeat the full handshake for each one."

# Infrared Code A / Code B selection (multi-projector control)
- id: ir_code_switch
  description: "Switch IR receiver between Code A (default, hex 73) and Code B (hex 63)"
  methods:
    - "RS-232C Direct Commands (IR Remote Code A / B) - applies to X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"
    - "Service Menu > Option > IR Code (on X3/X7/X9/RS40/50/60)"
    - "Function menu (on X30/X70/X90/RS45/55/65)"
  notes: "When switched to Code B, projector responds only to Code B; substitute hex code 63 (decimal 99) for default 73 (decimal 115) in all IR commands. To switch the physical Remote Control between codes, press and hold Menu + Back buttons for 3+ seconds."

# Power Off sequence for remote-control emulation
- id: power_off_double_send
  description: "Power Off via RC emulation requires sending the command twice with a short delay"
  command_template: "21 89 01 52 43 37 33 30 36 0A"
  notes: "From source: 'send twice with short delay between to switch off'"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Power Off is described as needing to be sent twice
# via the RC emulation path, but this is a command timing note rather than a safety interlock.
# No lamp, electrical, or installation safety information is present in the source.
```

## Notes
The source document explicitly covers these JVC D-ILA projector models: DLA-HD350, DLA-HD750, DLA-HD550, DLA-HD950, DLA-HD990, DLA-X3, DLA-X7, DLA-X9, DLA-X30, DLA-X70R, DLA-X90R, DLA-RS10, DLA-RS15, DLA-RS20, DLA-RS25, DLA-RS35, DLA-RS40, DLA-RS45, DLA-RS50, DLA-RS55, DLA-RS60, DLA-RS65. The DLA-SX21 specified in the title is not listed in the source's compatible model set. This spec is generated from that multi-model guide; the RS-232C/LAN control protocol may or may not apply to the DLA-SX21 specifically.

**Command format:** all RS-232C/LAN commands are 7 or 10 bytes. Structure: `Header` (1 byte: 21 = command, 3F = query, 06 = basic ack from projector, 40 = detailed ack from projector) + `Unit ID` (2 bytes: 89 01, fixed) + `Command` (2 bytes) + `Data` (variable) + `End` (1 byte: 0A, fixed).

**Serial parameters:** RS-232C 9-pin D-Sub male; pin 2 Rx, pin 3 Tx, pin 5 Ground; pins 1, 4, 6-9 not connected. 19200 bps, 8 data bits, no parity, 1 stop bit, no flow control, binary format. Cross-connected (null-modem / DTE-DTE) cable required for PC connection.

**LAN control:** available on DLA-X7, DLA-X9, DLA-X30, DLA-X70, DLA-X90, DLA-RS50, DLA-RS60, DLA-RS45, DLA-RS55, DLA-RS65. TCP port 20554. Connection must use the five-step PJ_OK / PJREQ / PJACK handshake; 5-second timeouts at each step. After one command, projector closes the connection. RJ45 standard connector. Default IP 192.168.0.2, default gateway 192.168.0.254, default mask 255.255.255.0, DHCP default off.

**Infrared control:** 2-byte hex format `73 <hex>`. Default Code A = 73 (decimal 115); Code B = 63 (decimal 99) available on X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65. Philips Pronto MakeHex integration documented; the rightmost column in the RC Emulation tables gives the hex ASCII for each command.

**Error handling:** projector silently ignores unrecognized commands, parity errors, invalid unit ID, and inappropriate commands (e.g. Power On while cooling). Commands with gaps of 50ms or longer in incoming data are discarded. Controllers must wait for an acknowledgement before sending the next command.

**Crestron / AMX examples from source:** Crestron Power On = `\x21\x89\x01\x50\x57\x31\x0A\r`; AMX Power On = `SEND_STRING dvProj, "$21, $89, $01, $50, $57, $31, $0A"`.

**Power Off via RC emulation** is a two-send operation: send `21 89 01 52 43 37 33 30 36 0A` twice with a short delay between.

<!-- UNRESOLVED: DLA-SX21 not listed in source's compatible model set; protocol applicability to DLA-SX21 is uncertain. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: no voltage, current, power, or physical-installation specifications in source. -->
<!-- UNRESOLVED: no fault behavior or error recovery sequences documented beyond the "ignores unrecognized commands" note. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - http://www.support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:43.669Z
last_checked_at: 2026-06-02T17:22:42.114Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:42.114Z
matched_actions: 329
action_count: 329
confidence: medium
summary: "All 329 spec actions have verbatim hex matches in the source command tables; transport (19200/8N1, port 20554) confirmed; source inventory fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document does not list DLA-SX21 in its compatible model set; this spec is generated from a multi-model guide and may or may not apply to the DLA-SX21 specifically"
- "source does not document unsolicited notification events."
- "source does not contain explicit safety warnings, interlock procedures,"
- "DLA-SX21 not listed in source's compatible model set; protocol applicability to DLA-SX21 is uncertain."
- "firmware version compatibility not stated in source."
- "no voltage, current, power, or physical-installation specifications in source."
- "no fault behavior or error recovery sequences documented beyond the \"ignores unrecognized commands\" note."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
