---
spec_id: admin/jvc-dila-hd2k
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC D-ILA Projector RS-232C/LAN Control Spec"
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
    - DLA-HD2K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILARemoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:41.240Z
last_checked_at: 2026-06-02T17:22:41.364Z
generated_at: 2026-06-02T17:22:41.364Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "This source document (RS-232C, LAN and Infrared Remote Control Guide, Version 1.4) does NOT explicitly cover the DLA-HD2K. The model list begins with DLA-HD350 (2008+) and ends at DLA-RS65 (2012). The DLA-HD2K (c. 2004) is a discontinued model that pre-dates this guide. Commands in this spec are emitted from the guide's payload tables; per-model applicability to DLA-HD2K is UNRESOLVED."
  - "no continuous/dial-style settable parameters (volume sliders, etc.)"
  - "source documents no unsolicited notifications. Connection close"
  - "source documents no multi-step sequences. Note that \"Power Off"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "Firmware version requirements, voltage/power specifications, fault-recovery sequences, and per-model feature gates beyond those noted inline are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:41.364Z
  matched_actions: 327
  action_count: 327
  confidence: medium
  summary: "All 327 spec actions match verbatim source hex codes across direct, RC emulation, and query command tables; transport parameters confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# JVC D-ILA Projector RS-232C/LAN Control Spec

## Summary
Control spec for JVC D-ILA projector family via RS-232C (DB-9 male, 19200 bps 8N1) and TCP (port 20554). Documented commands cover power, input switching, picture mode, gamma, lamp, trigger, lens memory, 3D, colour profile, anamorphic, test patterns, and detailed status queries. Some commands are model-specific.

<!-- UNRESOLVED: This source document (RS-232C, LAN and Infrared Remote Control Guide, Version 1.4) does NOT explicitly cover the DLA-HD2K. The model list begins with DLA-HD350 (2008+) and ends at DLA-RS65 (2012). The DLA-HD2K (c. 2004) is a discontinued model that pre-dates this guide. Commands in this spec are emitted from the guide's payload tables; per-model applicability to DLA-HD2K is UNRESOLVED. -->

## Transport
```yaml
# RS-232C parameters stated explicitly in source Communication Parameters table.
# LAN TCP port 20554 stated explicitly in source Control Protocol section.
# LAN handshake uses plain ASCII tokens (PJ_OK / PJREQ / PJACK) - no credentials.
# IR is documented separately (hex 73/63 + ASCII) but is not a packet transport; see Notes.
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
  type: none  # inferred: no login/password/token documented in source for either transport
```

## Traits
```yaml
- powerable    # inferred from power on/off commands and Off Timer
- routable     # inferred from input switching, picture mode, gamma, 3D, anamorphic
- queryable    # inferred from Power/Input/Gamma/Source/Model status enquiry commands
- levelable    # inferred from brightness/contrast/colour/sharpness/tint ± and lens shift/zoom/focus
```

## Actions
```yaml
# ===== Direct Commands =====

# POWER
- id: power_off
  label: Power Off
  kind: action
  command: "21 89 01 50 57 30 0A"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "21 89 01 50 57 31 0A"
  params: []

# INPUT SWITCHING
- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  command: "21 89 01 49 50 36 0A"
  params: []

- id: input_hdmi2
  label: Input HDMI 2
  kind: action
  command: "21 89 01 49 50 37 0A"
  params: []

- id: input_component
  label: Input Component
  kind: action
  command: "21 89 01 49 50 32 0A"
  params: []

- id: input_svideo
  label: Input S-Video
  kind: action
  command: "21 89 01 49 50 30 0A"
  params: []

- id: input_video
  label: Input Video
  kind: action
  command: "21 89 01 49 50 31 0A"
  params: []

- id: input_pc
  label: Input PC
  kind: action
  command: "21 89 01 49 50 33 0A"
  params: []

- id: input_next
  label: Input Next
  kind: action
  command: "21 89 01 49 50 2B 0A"
  params: []

- id: input_prev
  label: Input Previous
  kind: action
  command: "21 89 01 49 50 2D 0A"
  params: []

# TEST PATTERNS (HD350/550/750/950/990/RS10/15/20/25/35)
- id: testpattern_off
  label: Test Pattern Off
  kind: action
  command: "21 89 01 54 53 30 0A"
  params: []

- id: testpattern_color_bars
  label: Test Pattern Color Bars
  kind: action
  command: "21 89 01 54 53 31 0A"
  params: []

- id: testpattern_stairstep_bw
  label: Test Pattern Stairstep B/W
  kind: action
  command: "21 89 01 54 53 36 0A"
  params: []

- id: testpattern_stairstep_red
  label: Test Pattern Stairstep Red
  kind: action
  command: "21 89 01 54 53 37 0A"
  params: []

- id: testpattern_stairstep_green
  label: Test Pattern Stairstep Green
  kind: action
  command: "21 89 01 54 53 38 0A"
  params: []

- id: testpattern_stairstep_blue
  label: Test Pattern Stairstep Blue
  kind: action
  command: "21 89 01 54 53 39 0A"
  params: []

- id: testpattern_crosshatch_green
  label: Test Pattern Crosshatch Green
  kind: action
  command: "21 89 01 54 53 41 0A"
  params: []

# GAMMA
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
  label: Gamma D
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

# GAMMA VALUE
- id: gamma_value_18
  label: Gamma Value 1.8
  kind: action
  command: "21 89 01 47 50 30 0A"
  params: []

- id: gamma_value_19
  label: Gamma Value 1.9
  kind: action
  command: "21 89 01 47 50 31 0A"
  params: []

- id: gamma_value_20
  label: Gamma Value 2.0
  kind: action
  command: "21 89 01 47 50 32 0A"
  params: []

- id: gamma_value_21
  label: Gamma Value 2.1
  kind: action
  command: "21 89 01 47 50 33 0A"
  params: []

- id: gamma_value_22
  label: Gamma Value 2.2 (Default)
  kind: action
  command: "21 89 01 47 50 34 0A"
  params: []

- id: gamma_value_23
  label: Gamma Value 2.3
  kind: action
  command: "21 89 01 47 50 35 0A"
  params: []

- id: gamma_value_24
  label: Gamma Value 2.4
  kind: action
  command: "21 89 01 47 50 36 0A"
  params: []

- id: gamma_value_25
  label: Gamma Value 2.5
  kind: action
  command: "21 89 01 47 50 37 0A"
  params: []

- id: gamma_value_26
  label: Gamma Value 2.6
  kind: action
  command: "21 89 01 47 50 38 0A"
  params: []

# OFF TIMER
- id: off_timer_off
  label: Off Timer Off
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

# LAMP POWER
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

# IR REMOTE CODE
- id: ir_code_a
  label: IR Code A
  kind: action
  command: "21 89 01 53 55 52 43 30 0A"
  params: []

- id: ir_code_b
  label: IR Code B
  kind: action
  command: "21 89 01 53 55 52 43 31 0A"
  params: []

# TRIGGER OUTPUT
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

# CLEAR MOTION DRIVE
- id: cmd_off
  label: Clear Motion Drive Off
  kind: action
  command: "21 89 01 50 4D 43 4D 30 0A"
  params: []

- id: cmd_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  command: "21 89 01 50 4D 43 4D 31 0A"
  params: []

- id: cmd_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  command: "21 89 01 50 4D 43 4D 32 0A"
  params: []

- id: cmd_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  command: "21 89 01 50 4D 43 4D 33 0A"
  params: []

- id: cmd_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  command: "21 89 01 50 4D 43 4D 34 0A"
  params: []

- id: cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  command: "21 89 01 50 4D 43 4D 35 0A"
  params: []

# ANAMORPHIC
- id: anamorphic_off
  label: Anamorphic Off
  kind: action
  command: "21 89 01 49 4E 56 53 30 0A"
  params: []

- id: anamorphic_a
  label: Anamorphic A
  kind: action
  command: "21 89 01 49 4E 56 53 31 0A"
  params: []

- id: anamorphic_b
  label: Anamorphic B
  kind: action
  command: "21 89 01 49 4E 56 53 32 0A"
  params: []

# PICTURE MODE (X30/X70/X90/RS45/55/65 - v1)
- id: picture_mode_film
  label: Picture Mode Film
  kind: action
  command: "21 89 01 50 4D 50 4D 30 30 0A"
  params: []

- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  command: "21 89 01 50 4D 50 4D 30 31 0A"
  params: []

- id: picture_mode_animation
  label: Picture Mode Animation
  kind: action
  command: "21 89 01 50 4D 50 4D 30 32 0A"
  params: []

- id: picture_mode_natural
  label: Picture Mode Natural
  kind: action
  command: "21 89 01 50 4D 50 4D 30 33 0A"
  params: []

- id: picture_mode_stage
  label: Picture Mode Stage
  kind: action
  command: "21 89 01 50 4D 50 4D 30 34 0A"
  params: []

- id: picture_mode_thx
  label: Picture Mode THX
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

# PICTURE MODE (X3/X7/X9/RS40/50/60 - v2)
- id: picture_mode_film_v2
  label: Picture Mode Film (X3/X7/X9)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []

- id: picture_mode_cinema_v2
  label: Picture Mode Cinema (X3/X7/X9)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []

- id: picture_mode_animation_v2
  label: Picture Mode Animation (X3/X7/X9)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []

- id: picture_mode_natural_v2
  label: Picture Mode Natural (X3/X7/X9)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []

- id: picture_mode_stage_v2
  label: Picture Mode Stage (X3/X7/X9)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []

- id: picture_mode_3d_v2
  label: Picture Mode 3D (X3/X7/X9)
  kind: action
  command: "21 89 01 50 4D 50 4D 45 0A"
  params: []

- id: picture_mode_user1_v2
  label: Picture Mode User 1 (X3/X7/X9)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []

- id: picture_mode_user2_v2
  label: Picture Mode User 2 (X3/X7/X9)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []

- id: picture_mode_thx_v2
  label: Picture Mode THX (X7/X9)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# PICTURE MODE (HD350/750/550/950/990/RS10/20/15/25/35 - v3)
- id: picture_mode_cinema1_v3
  label: Picture Mode Cinema 1 (HD-series)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []

- id: picture_mode_cinema2_v3
  label: Picture Mode Cinema 2 (HD-series)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []

- id: picture_mode_cinema3_v3
  label: Picture Mode Cinema 3 (HD-series)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []

- id: picture_mode_natural_v3
  label: Picture Mode Natural (HD-series)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []

- id: picture_mode_stage_v3
  label: Picture Mode Stage (HD-series)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []

- id: picture_mode_dynamic_v3
  label: Picture Mode Dynamic (HD-series)
  kind: action
  command: "21 89 01 50 4D 50 4D 35 0A"
  params: []

- id: picture_mode_user1_v3
  label: Picture Mode User 1 (HD-series)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []

- id: picture_mode_user2_v3
  label: Picture Mode User 2 (HD-series)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []

- id: picture_mode_thx_v3
  label: Picture Mode THX (HD-series)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# COLOUR PROFILE (X30/X70/X90/RS45/55/65)
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

# 3D FORMAT
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

# 2D-TO-3D CONVERSION
- id: twod_to_3d_off
  label: 2D to 3D Conversion Off
  kind: action
  command: "21 89 01 49 53 33 43 30 0A"
  params: []

- id: twod_to_3d_on
  label: 2D to 3D Conversion On
  kind: action
  command: "21 89 01 49 53 33 43 31 0A"
  params: []

# 3D SUBTITLE CORRECTION
- id: subtitle_3d_correction_off
  label: 3D Subtitle Correction Off
  kind: action
  command: "21 89 01 49 53 33 54 31 0A"
  params: []

- id: subtitle_3d_correction_on
  label: 3D Subtitle Correction On
  kind: action
  command: "21 89 01 49 53 33 54 30 0A"
  params: []

# LENS MEMORY
- id: lens_memory_save_1
  label: Lens Memory Save 1
  kind: action
  command: "21 89 01 49 4E 4D 53 30 0A"
  params: []

- id: lens_memory_save_2
  label: Lens Memory Save 2
  kind: action
  command: "21 89 01 49 4E 4D 53 31 0A"
  params: []

- id: lens_memory_save_3
  label: Lens Memory Save 3
  kind: action
  command: "21 89 01 49 4E 4D 53 32 0A"
  params: []

- id: lens_memory_select_1
  label: Lens Memory Select 1
  kind: action
  command: "21 89 01 49 4E 4D 4C 30 0A"
  params: []

- id: lens_memory_select_2
  label: Lens Memory Select 2
  kind: action
  command: "21 89 01 49 4E 4D 4C 31 0A"
  params: []

- id: lens_memory_select_3
  label: Lens Memory Select 3
  kind: action
  command: "21 89 01 49 4E 4D 4C 32 0A"
  params: []

# TEST (NULL) COMMAND
- id: null_command
  label: Null Command (Communication Test)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

# ===== Remote Control Emulation Commands =====
# Full RS-232C hex form: 21 89 01 52 43 37 33 <IR-code-byte> 0A
# For IR-only transmission, prefix with 73 (Code A) or 63 (Code B).

- id: rc_3d_setting_menu
  label: 3D Setting Menu
  kind: action
  command: "21 89 01 52 43 37 33 44 35 0A"
  params: []

- id: rc_3d_format_cycle
  label: 3D Format Cycle
  kind: action
  command: "21 89 01 52 43 37 33 44 36 0A"
  params: []

- id: rc_advanced_menu
  label: Advanced Menu
  kind: action
  command: "21 89 01 52 43 37 33 37 33 0A"
  params: []

- id: rc_anamorphic_off
  label: Anamorphic / Vertical Stretch Off
  kind: action
  command: "21 89 01 52 43 37 33 32 34 0A"
  params: []

- id: rc_anamorphic_a
  label: Anamorphic A / Vertical Stretch On
  kind: action
  command: "21 89 01 52 43 37 33 32 33 0A"
  params: []

- id: rc_anamorphic_b
  label: Anamorphic B
  kind: action
  command: "21 89 01 52 43 37 33 32 42 0A"
  params: []

- id: rc_anamorphic_cycle
  label: Anamorphic Cycle
  kind: action
  command: "21 89 01 52 43 37 33 43 35 0A"
  params: []

- id: rc_aspect_16_9
  label: Aspect 16:9
  kind: action
  command: "21 89 01 52 43 37 33 32 36 0A"
  params: []

- id: rc_aspect_4_3
  label: Aspect 4:3
  kind: action
  command: "21 89 01 52 43 37 33 32 35 0A"
  params: []

- id: rc_aspect_zoom
  label: Aspect Zoom
  kind: action
  command: "21 89 01 52 43 37 33 32 37 0A"
  params: []

- id: rc_aspect_pc_auto
  label: Aspect PC Auto
  kind: action
  command: "21 89 01 52 43 37 33 41 45 0A"
  params: []

- id: rc_aspect_pc_full
  label: Aspect PC Full
  kind: action
  command: "21 89 01 52 43 37 33 42 30 0A"
  params: []

- id: rc_aspect_pc_just
  label: Aspect PC Just
  kind: action
  command: "21 89 01 52 43 37 33 41 46 0A"
  params: []

- id: rc_aspect_cycle
  label: Aspect Cycle
  kind: action
  command: "21 89 01 52 43 37 33 37 37 0A"
  params: []

- id: rc_auto_align
  label: Auto Align (PC)
  kind: action
  command: "21 89 01 52 43 37 33 31 33 0A"
  params: []

- id: rc_auto_lens_centre
  label: Auto Lens Centre
  kind: action
  command: "21 89 01 52 43 37 33 43 39 0A"
  params: []

- id: rc_back
  label: Back
  kind: action
  command: "21 89 01 52 43 37 33 30 33 0A"
  params: []

- id: rc_bnr_off
  label: BNR Off
  kind: action
  command: "21 89 01 52 43 37 33 31 30 0A"
  params: []

- id: rc_bnr_on
  label: BNR On
  kind: action
  command: "21 89 01 52 43 37 33 30 46 0A"
  params: []

- id: rc_bright_level_minus
  label: Bright Level -
  kind: action
  command: "21 89 01 52 43 37 33 41 33 0A"
  params: []

- id: rc_bright_level_plus
  label: Bright Level +
  kind: action
  command: "21 89 01 52 43 37 33 41 32 0A"
  params: []

- id: rc_brightness_minus
  label: Brightness -
  kind: action
  command: "21 89 01 52 43 37 33 37 42 0A"
  params: []

- id: rc_brightness_plus
  label: Brightness +
  kind: action
  command: "21 89 01 52 43 37 33 37 41 0A"
  params: []

- id: rc_brightness_adj
  label: Brightness Adjustment Bar Toggle
  kind: action
  command: "21 89 01 52 43 37 33 30 39 0A"
  params: []

- id: rc_cec_off
  label: CEC Off
  kind: action
  command: "21 89 01 52 43 37 33 35 37 0A"
  params: []

- id: rc_cec_on
  label: CEC On
  kind: action
  command: "21 89 01 52 43 37 33 35 36 0A"
  params: []

- id: rc_cmd_cycle
  label: Clear Motion Drive Cycle
  kind: action
  command: "21 89 01 52 43 37 33 38 41 0A"
  params: []

- id: rc_cmd_off
  label: Clear Motion Drive Off
  kind: action
  command: "21 89 01 52 43 37 33 34 37 0A"
  params: []

- id: rc_cmd_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  command: "21 89 01 52 43 37 33 43 45 0A"
  params: []

- id: rc_cmd_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  command: "21 89 01 52 43 37 33 43 46 0A"
  params: []

- id: rc_cmd_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  command: "21 89 01 52 43 37 33 34 38 0A"
  params: []

- id: rc_cmd_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  command: "21 89 01 52 43 37 33 34 39 0A"
  params: []

- id: rc_cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  command: "21 89 01 52 43 37 33 34 41 0A"
  params: []

- id: rc_colour_minus
  label: Colour -
  kind: action
  command: "21 89 01 52 43 37 33 37 44 0A"
  params: []

- id: rc_colour_plus
  label: Colour +
  kind: action
  command: "21 89 01 52 43 37 33 37 43 0A"
  params: []

- id: rc_colour_adj
  label: Colour Adjustment Bar Toggle
  kind: action
  command: "21 89 01 52 43 37 33 31 35 0A"
  params: []

- id: rc_colour_mgmt_off
  label: Colour Management Off
  kind: action
  command: "21 89 01 52 43 37 33 36 30 0A"
  params: []

- id: rc_colour_mgmt_custom1
  label: Colour Management Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 36 31 0A"
  params: []

- id: rc_colour_mgmt_custom2
  label: Colour Management Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 36 32 0A"
  params: []

- id: rc_colour_mgmt_custom3
  label: Colour Management Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 36 33 0A"
  params: []

- id: rc_colour_mgmt_cycle
  label: Colour Management Cycle
  kind: action
  command: "21 89 01 52 43 37 33 38 39 0A"
  params: []

- id: rc_colour_profile_cycle
  label: Colour Profile Cycle
  kind: action
  command: "21 89 01 52 43 37 33 38 38 0A"
  params: []

- id: rc_colour_space_cycle
  label: Colour Space Cycle
  kind: action
  command: "21 89 01 52 43 37 33 43 44 0A"
  params: []

- id: rc_colour_temp_5800k
  label: Colour Temp 5800K
  kind: action
  command: "21 89 01 52 43 37 33 34 45 0A"
  params: []

- id: rc_colour_temp_6500k
  label: Colour Temp 6500K
  kind: action
  command: "21 89 01 52 43 37 33 34 46 0A"
  params: []

- id: rc_colour_temp_7500k
  label: Colour Temp 7500K
  kind: action
  command: "21 89 01 52 43 37 33 35 30 0A"
  params: []

- id: rc_colour_temp_9300k
  label: Colour Temp 9300K
  kind: action
  command: "21 89 01 52 43 37 33 35 31 0A"
  params: []

- id: rc_colour_temp_custom1
  label: Colour Temp Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 35 33 0A"
  params: []

- id: rc_colour_temp_custom2
  label: Colour Temp Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 35 34 0A"
  params: []

- id: rc_colour_temp_custom3
  label: Colour Temp Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 35 35 0A"
  params: []

- id: rc_colour_temp_high_bright
  label: Colour Temp High Bright
  kind: action
  command: "21 89 01 52 43 37 33 35 32 0A"
  params: []

- id: rc_colour_temp_cycle
  label: Colour Temp Cycle
  kind: action
  command: "21 89 01 52 43 37 33 37 36 0A"
  params: []

- id: rc_ct_gain_blue_minus
  label: Colour Temp Gain Blue -
  kind: action
  command: "21 89 01 52 43 37 33 39 31 0A"
  params: []

- id: rc_ct_gain_blue_plus
  label: Colour Temp Gain Blue +
  kind: action
  command: "21 89 01 52 43 37 33 39 30 0A"
  params: []

- id: rc_ct_gain_green_minus
  label: Colour Temp Gain Green -
  kind: action
  command: "21 89 01 52 43 37 33 38 46 0A"
  params: []

- id: rc_ct_gain_green_plus
  label: Colour Temp Gain Green +
  kind: action
  command: "21 89 01 52 43 37 33 38 45 0A"
  params: []

- id: rc_ct_gain_red_minus
  label: Colour Temp Gain Red -
  kind: action
  command: "21 89 01 52 43 37 33 38 44 0A"
  params: []

- id: rc_ct_gain_red_plus
  label: Colour Temp Gain Red +
  kind: action
  command: "21 89 01 52 43 37 33 38 43 0A"
  params: []

- id: rc_ct_offset_blue_minus
  label: Colour Temp Offset Blue -
  kind: action
  command: "21 89 01 52 43 37 33 39 37 0A"
  params: []

- id: rc_ct_offset_blue_plus
  label: Colour Temp Offset Blue +
  kind: action
  command: "21 89 01 52 43 37 33 39 36 0A"
  params: []

- id: rc_ct_offset_green_minus
  label: Colour Temp Offset Green -
  kind: action
  command: "21 89 01 52 43 37 33 39 35 0A"
  params: []

- id: rc_ct_offset_green_plus
  label: Colour Temp Offset Green +
  kind: action
  command: "21 89 01 52 43 37 33 39 34 0A"
  params: []

- id: rc_ct_offset_red_minus
  label: Colour Temp Offset Red -
  kind: action
  command: "21 89 01 52 43 37 33 39 33 0A"
  params: []

- id: rc_ct_offset_red_plus
  label: Colour Temp Offset Red +
  kind: action
  command: "21 89 01 52 43 37 33 39 32 0A"
  params: []

- id: rc_contrast_minus
  label: Contrast -
  kind: action
  command: "21 89 01 52 43 37 33 37 39 0A"
  params: []

- id: rc_contrast_plus
  label: Contrast +
  kind: action
  command: "21 89 01 52 43 37 33 37 38 0A"
  params: []

- id: rc_contrast_adj
  label: Contrast Adjustment Bar Toggle
  kind: action
  command: "21 89 01 52 43 37 33 30 41 0A"
  params: []

- id: rc_cti_off
  label: CTI Off
  kind: action
  command: "21 89 01 52 43 37 33 35 43 0A"
  params: []

- id: rc_cti_low
  label: CTI Low
  kind: action
  command: "21 89 01 52 43 37 33 35 44 0A"
  params: []

- id: rc_cti_middle
  label: CTI Middle
  kind: action
  command: "21 89 01 52 43 37 33 35 45 0A"
  params: []

- id: rc_cti_high
  label: CTI High
  kind: action
  command: "21 89 01 52 43 37 33 35 46 0A"
  params: []

- id: rc_cursor_down
  label: Cursor Down
  kind: action
  command: "21 89 01 52 43 37 33 30 32 0A"
  params: []

- id: rc_cursor_left
  label: Cursor Left
  kind: action
  command: "21 89 01 52 43 37 33 33 36 0A"
  params: []

- id: rc_cursor_right
  label: Cursor Right
  kind: action
  command: "21 89 01 52 43 37 33 33 34 0A"
  params: []

- id: rc_cursor_up
  label: Cursor Up
  kind: action
  command: "21 89 01 52 43 37 33 30 31 0A"
  params: []

- id: rc_dark_level_minus
  label: Dark Level -
  kind: action
  command: "21 89 01 52 43 37 33 41 35 0A"
  params: []

- id: rc_dark_level_plus
  label: Dark Level +
  kind: action
  command: "21 89 01 52 43 37 33 41 34 0A"
  params: []

- id: rc_detail_enhance_minus
  label: Detail Enhance -
  kind: action
  command: "21 89 01 52 43 37 33 31 32 0A"
  params: []

- id: rc_detail_enhance_plus
  label: Detail Enhance +
  kind: action
  command: "21 89 01 52 43 37 33 31 31 0A"
  params: []

- id: rc_picture_tone_blue_minus
  label: Picture Tone Blue -
  kind: action
  command: "21 89 01 52 43 37 33 41 31 0A"
  params: []

- id: rc_picture_tone_blue_plus
  label: Picture Tone Blue +
  kind: action
  command: "21 89 01 52 43 37 33 41 30 0A"
  params: []

- id: rc_picture_tone_green_minus
  label: Picture Tone Green -
  kind: action
  command: "21 89 01 52 43 37 33 39 46 0A"
  params: []

- id: rc_picture_tone_green_plus
  label: Picture Tone Green +
  kind: action
  command: "21 89 01 52 43 37 33 39 45 0A"
  params: []

- id: rc_picture_tone_red_minus
  label: Picture Tone Red -
  kind: action
  command: "21 89 01 52 43 37 33 39 44 0A"
  params: []

- id: rc_picture_tone_red_plus
  label: Picture Tone Red +
  kind: action
  command: "21 89 01 52 43 37 33 39 43 0A"
  params: []

- id: rc_picture_tone_white_minus
  label: Picture Tone White -
  kind: action
  command: "21 89 01 52 43 37 33 39 42 0A"
  params: []

- id: rc_picture_tone_white_plus
  label: Picture Tone White +
  kind: action
  command: "21 89 01 52 43 37 33 39 41 0A"
  params: []

- id: rc_gamma_a
  label: Gamma A
  kind: action
  command: "21 89 01 52 43 37 33 33 39 0A"
  params: []

- id: rc_gamma_b
  label: Gamma B
  kind: action
  command: "21 89 01 52 43 37 33 33 41 0A"
  params: []

- id: rc_gamma_c
  label: Gamma C
  kind: action
  command: "21 89 01 52 43 37 33 33 42 0A"
  params: []

- id: rc_gamma_custom1
  label: Gamma Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 33 43 0A"
  params: []

- id: rc_gamma_custom2
  label: Gamma Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 33 44 0A"
  params: []

- id: rc_gamma_custom3
  label: Gamma Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 33 45 0A"
  params: []

- id: rc_gamma_d
  label: Gamma D
  kind: action
  command: "21 89 01 52 43 37 33 33 46 0A"
  params: []

- id: rc_gamma_normal
  label: Gamma Normal
  kind: action
  command: "21 89 01 52 43 37 33 33 38 0A"
  params: []

- id: rc_gamma_cycle
  label: Gamma Cycle
  kind: action
  command: "21 89 01 52 43 37 33 37 35 0A"
  params: []

- id: rc_hide_off
  label: Hide Off
  kind: action
  command: "21 89 01 52 43 37 33 44 31 0A"
  params: []

- id: rc_hide_on
  label: Hide On
  kind: action
  command: "21 89 01 52 43 37 33 44 30 0A"
  params: []

- id: rc_hide_toggle
  label: Hide Toggle
  kind: action
  command: "21 89 01 52 43 37 33 31 44 0A"
  params: []

- id: rc_hpos_minus
  label: Horizontal Position -
  kind: action
  command: "21 89 01 52 43 37 33 41 42 0A"
  params: []

- id: rc_hpos_plus
  label: Horizontal Position +
  kind: action
  command: "21 89 01 52 43 37 33 41 41 0A"
  params: []

- id: rc_information
  label: Information
  kind: action
  command: "21 89 01 52 43 37 33 37 34 0A"
  params: []

- id: rc_input_component
  label: Input Component
  kind: action
  command: "21 89 01 52 43 37 33 34 44 0A"
  params: []

- id: rc_input_hdmi1
  label: Input HDMI 1
  kind: action
  command: "21 89 01 52 43 37 33 37 30 0A"
  params: []

- id: rc_input_hdmi2
  label: Input HDMI 2
  kind: action
  command: "21 89 01 52 43 37 33 37 31 0A"
  params: []

- id: rc_input_pc
  label: Input PC
  kind: action
  command: "21 89 01 52 43 37 33 34 36 0A"
  params: []

- id: rc_input_svideo
  label: Input S-Video
  kind: action
  command: "21 89 01 52 43 37 33 34 43 0A"
  params: []

- id: rc_input_video
  label: Input Video
  kind: action
  command: "21 89 01 52 43 37 33 34 42 0A"
  params: []

- id: rc_input_cycle
  label: Input Cycle
  kind: action
  command: "21 89 01 52 43 37 33 30 38 0A"
  params: []

- id: rc_isf_day
  label: ISF Day
  kind: action
  command: "21 89 01 52 43 37 33 36 34 0A"
  params: []

- id: rc_isf_night
  label: ISF Night
  kind: action
  command: "21 89 01 52 43 37 33 36 35 0A"
  params: []

- id: rc_isf_off
  label: ISF Off
  kind: action
  command: "21 89 01 52 43 37 33 35 41 0A"
  params: []

- id: rc_isf_on
  label: ISF On
  kind: action
  command: "21 89 01 52 43 37 33 35 42 0A"
  params: []

- id: rc_keystone_h_minus
  label: Keystone Correction Horizontal -
  kind: action
  command: "21 89 01 52 43 37 33 34 31 0A"
  params: []

- id: rc_keystone_h_plus
  label: Keystone Correction Horizontal +
  kind: action
  command: "21 89 01 52 43 37 33 34 30 0A"
  params: []

- id: rc_keystone_v_minus
  label: Keystone Correction Vertical -
  kind: action
  command: "21 89 01 52 43 37 33 31 43 0A"
  params: []

- id: rc_keystone_v_plus
  label: Keystone Correction Vertical +
  kind: action
  command: "21 89 01 52 43 37 33 31 42 0A"
  params: []

- id: rc_lens_aperture_1
  label: Lens Aperture 1
  kind: action
  command: "21 89 01 52 43 37 33 32 38 0A"
  params: []

- id: rc_lens_aperture_2
  label: Lens Aperture 2
  kind: action
  command: "21 89 01 52 43 37 33 32 39 0A"
  params: []

- id: rc_lens_aperture_3
  label: Lens Aperture 3
  kind: action
  command: "21 89 01 52 43 37 33 32 41 0A"
  params: []

- id: rc_lens_aperture_minus
  label: Lens Aperture -
  kind: action
  command: "21 89 01 52 43 37 33 31 46 0A"
  params: []

- id: rc_lens_aperture_plus
  label: Lens Aperture +
  kind: action
  command: "21 89 01 52 43 37 33 31 45 0A"
  params: []

- id: rc_lens_aperture_adj
  label: Lens Aperture Adjustment
  kind: action
  command: "21 89 01 52 43 37 33 32 30 0A"
  params: []

- id: rc_lens_control_cycle
  label: Lens Control Cycle
  kind: action
  command: "21 89 01 52 43 37 33 33 30 0A"
  params: []

- id: rc_lens_focus_minus
  label: Lens Focus -
  kind: action
  command: "21 89 01 52 43 37 33 33 32 0A"
  params: []

- id: rc_lens_focus_plus
  label: Lens Focus +
  kind: action
  command: "21 89 01 52 43 37 33 33 31 0A"
  params: []

- id: rc_lens_memory_cycle
  label: Lens Memory Cycle
  kind: action
  command: "21 89 01 52 43 37 33 44 34 0A"
  params: []

- id: rc_lens_memory_1
  label: Lens Memory 1
  kind: action
  command: "21 89 01 52 43 37 33 44 38 0A"
  params: []

- id: rc_lens_memory_2
  label: Lens Memory 2
  kind: action
  command: "21 89 01 52 43 37 33 44 39 0A"
  params: []

- id: rc_lens_memory_3
  label: Lens Memory 3
  kind: action
  command: "21 89 01 52 43 37 33 44 41 0A"
  params: []

- id: rc_lens_shift_down
  label: Lens Shift Down
  kind: action
  command: "21 89 01 52 43 37 33 32 32 0A"
  params: []

- id: rc_lens_shift_left
  label: Lens Shift Left
  kind: action
  command: "21 89 01 52 43 37 33 34 34 0A"
  params: []

- id: rc_lens_shift_right
  label: Lens Shift Right
  kind: action
  command: "21 89 01 52 43 37 33 34 33 0A"
  params: []

- id: rc_lens_shift_up
  label: Lens Shift Up
  kind: action
  command: "21 89 01 52 43 37 33 32 31 0A"
  params: []

- id: rc_lens_zoom_in
  label: Lens Zoom In
  kind: action
  command: "21 89 01 52 43 37 33 33 35 0A"
  params: []

- id: rc_lens_zoom_out
  label: Lens Zoom Out
  kind: action
  command: "21 89 01 52 43 37 33 33 37 0A"
  params: []

- id: rc_mask_bottom_minus
  label: Mask Bottom -
  kind: action
  command: "21 89 01 52 43 37 33 42 38 0A"
  params: []

- id: rc_mask_bottom_plus
  label: Mask Bottom +
  kind: action
  command: "21 89 01 52 43 37 33 42 37 0A"
  params: []

- id: rc_mask_left_minus
  label: Mask Left -
  kind: action
  command: "21 89 01 52 43 37 33 42 32 0A"
  params: []

- id: rc_mask_left_plus
  label: Mask Left +
  kind: action
  command: "21 89 01 52 43 37 33 42 31 0A"
  params: []

- id: rc_mask_right_minus
  label: Mask Right -
  kind: action
  command: "21 89 01 52 43 37 33 42 34 0A"
  params: []

- id: rc_mask_right_plus
  label: Mask Right +
  kind: action
  command: "21 89 01 52 43 37 33 42 33 0A"
  params: []

- id: rc_mask_top_minus
  label: Mask Top -
  kind: action
  command: "21 89 01 52 43 37 33 42 36 0A"
  params: []

- id: rc_mask_top_plus
  label: Mask Top +
  kind: action
  command: "21 89 01 52 43 37 33 42 35 0A"
  params: []

- id: rc_menu
  label: Menu Toggle
  kind: action
  command: "21 89 01 52 43 37 33 32 45 0A"
  params: []

- id: rc_menu_position
  label: Menu Position
  kind: action
  command: "21 89 01 52 43 37 33 34 32 0A"
  params: []

- id: rc_mnr_minus
  label: MNR -
  kind: action
  command: "21 89 01 52 43 37 33 30 45 0A"
  params: []

- id: rc_mnr_plus
  label: MNR +
  kind: action
  command: "21 89 01 52 43 37 33 30 44 0A"
  params: []

- id: rc_nr_toggle
  label: NR Toggle
  kind: action
  command: "21 89 01 52 43 37 33 31 38 0A"
  params: []

- id: rc_ok
  label: OK
  kind: action
  command: "21 89 01 52 43 37 33 32 46 0A"
  params: []

- id: rc_phase_minus
  label: Phase (PC) -
  kind: action
  command: "21 89 01 52 43 37 33 41 39 0A"
  params: []

- id: rc_phase_plus
  label: Phase (PC) +
  kind: action
  command: "21 89 01 52 43 37 33 41 38 0A"
  params: []

- id: rc_picture_adjust
  label: Picture Adjust
  kind: action
  command: "21 89 01 52 43 37 33 37 32 0A"
  params: []

- id: rc_picture_mode_3d
  label: Picture Mode 3D
  kind: action
  command: "21 89 01 52 43 37 33 38 37 0A"
  params: []

- id: rc_picture_mode_cinema1
  label: Picture Mode Cinema 1
  kind: action
  command: "21 89 01 52 43 37 33 36 39 0A"
  params: []

- id: rc_picture_mode_cinema2
  label: Picture Mode Cinema 2
  kind: action
  command: "21 89 01 52 43 37 33 36 38 0A"
  params: []

- id: rc_picture_mode_cinema3
  label: Picture Mode Cinema 3
  kind: action
  command: "21 89 01 52 43 37 33 36 36 0A"
  params: []

- id: rc_picture_mode_dynamic
  label: Picture Mode Dynamic
  kind: action
  command: "21 89 01 52 43 37 33 36 42 0A"
  params: []

- id: rc_picture_mode_natural
  label: Picture Mode Natural
  kind: action
  command: "21 89 01 52 43 37 33 36 41 0A"
  params: []

- id: rc_picture_mode_stage
  label: Picture Mode Stage
  kind: action
  command: "21 89 01 52 43 37 33 36 37 0A"
  params: []

- id: rc_picture_mode_thx
  label: Picture Mode THX
  kind: action
  command: "21 89 01 52 43 37 33 36 46 0A"
  params: []

- id: rc_picture_mode_user1
  label: Picture Mode User 1
  kind: action
  command: "21 89 01 52 43 37 33 36 43 0A"
  params: []

- id: rc_picture_mode_user2
  label: Picture Mode User 2
  kind: action
  command: "21 89 01 52 43 37 33 36 44 0A"
  params: []

- id: rc_picture_mode_user3
  label: Picture Mode User 3
  kind: action
  command: "21 89 01 52 43 37 33 36 45 0A"
  params: []

- id: rc_picture_mode_user4
  label: Picture Mode User 4
  kind: action
  command: "21 89 01 52 43 37 33 43 41 0A"
  params: []

- id: rc_picture_mode_user5
  label: Picture Mode User 5
  kind: action
  command: "21 89 01 52 43 37 33 43 42 0A"
  params: []

- id: rc_pixel_shift_h_blue_minus
  label: Pixel Shift Horizontal Blue -
  kind: action
  command: "21 89 01 52 43 37 33 42 45 0A"
  params: []

- id: rc_pixel_shift_h_blue_plus
  label: Pixel Shift Horizontal Blue +
  kind: action
  command: "21 89 01 52 43 37 33 42 44 0A"
  params: []

- id: rc_pixel_shift_h_green_minus
  label: Pixel Shift Horizontal Green -
  kind: action
  command: "21 89 01 52 43 37 33 42 43 0A"
  params: []

- id: rc_pixel_shift_h_green_plus
  label: Pixel Shift Horizontal Green +
  kind: action
  command: "21 89 01 52 43 37 33 42 42 0A"
  params: []

- id: rc_pixel_shift_h_red_minus
  label: Pixel Shift Horizontal Red -
  kind: action
  command: "21 89 01 52 43 37 33 42 41 0A"
  params: []

- id: rc_pixel_shift_h_red_plus
  label: Pixel Shift Horizontal Red +
  kind: action
  command: "21 89 01 52 43 37 33 42 39 0A"
  params: []

- id: rc_pixel_shift_v_blue_minus
  label: Pixel Shift Vertical Blue -
  kind: action
  command: "21 89 01 52 43 37 33 43 34 0A"
  params: []

- id: rc_pixel_shift_v_blue_plus
  label: Pixel Shift Vertical Blue +
  kind: action
  command: "21 89 01 52 43 37 33 43 33 0A"
  params: []

- id: rc_pixel_shift_v_green_minus
  label: Pixel Shift Vertical Green -
  kind: action
  command: "21 89 01 52 43 37 33 43 32 0A"
  params: []

- id: rc_pixel_shift_v_green_plus
  label: Pixel Shift Vertical Green +
  kind: action
  command: "21 89 01 52 43 37 33 43 31 0A"
  params: []

- id: rc_pixel_shift_v_red_minus
  label: Pixel Shift Vertical Red -
  kind: action
  command: "21 89 01 52 43 37 33 43 30 0A"
  params: []

- id: rc_pixel_shift_v_red_plus
  label: Pixel Shift Vertical Red +
  kind: action
  command: "21 89 01 52 43 37 33 42 46 0A"
  params: []

- id: rc_power_off
  label: Power Off (RC; send twice with short delay)
  kind: action
  command: "21 89 01 52 43 37 33 30 36 0A"
  params: []

- id: rc_power_on
  label: Power On (RC)
  kind: action
  command: "21 89 01 52 43 37 33 30 35 0A"
  params: []

- id: rc_rnr_minus
  label: RNR -
  kind: action
  command: "21 89 01 52 43 37 33 30 43 0A"
  params: []

- id: rc_rnr_plus
  label: RNR +
  kind: action
  command: "21 89 01 52 43 37 33 30 42 0A"
  params: []

- id: rc_screen_adjust_off
  label: Screen Adjust Off
  kind: action
  command: "21 89 01 52 43 37 33 38 30 0A"
  params: []

- id: rc_screen_adjust_a
  label: Screen Adjust A
  kind: action
  command: "21 89 01 52 43 37 33 38 31 0A"
  params: []

- id: rc_screen_adjust_b
  label: Screen Adjust B
  kind: action
  command: "21 89 01 52 43 37 33 38 32 0A"
  params: []

- id: rc_screen_adjust_c
  label: Screen Adjust C
  kind: action
  command: "21 89 01 52 43 37 33 38 33 0A"
  params: []

- id: rc_sharpness_minus
  label: Sharpness -
  kind: action
  command: "21 89 01 52 43 37 33 37 46 0A"
  params: []

- id: rc_sharpness_plus
  label: Sharpness +
  kind: action
  command: "21 89 01 52 43 37 33 37 45 0A"
  params: []

- id: rc_sharpness_adj
  label: Sharpness Adjustment Bar Toggle
  kind: action
  command: "21 89 01 52 43 37 33 31 34 0A"
  params: []

- id: rc_shutter_close
  label: Shutter Close
  kind: action
  command: "21 89 01 52 43 37 33 31 39 0A"
  params: []

- id: rc_shutter_open
  label: Shutter Open
  kind: action
  command: "21 89 01 52 43 37 33 31 41 0A"
  params: []

- id: rc_shutter_off
  label: Shutter Off (Desync from Hide)
  kind: action
  command: "21 89 01 52 43 37 33 32 44 0A"
  params: []

- id: rc_shutter_on
  label: Shutter On (Sync to Hide)
  kind: action
  command: "21 89 01 52 43 37 33 32 43 0A"
  params: []

- id: rc_test_pattern_cycle
  label: Test Pattern Cycle
  kind: action
  command: "21 89 01 52 43 37 33 35 39 0A"
  params: []

- id: rc_thx_bright
  label: THX Bright
  kind: action
  command: "21 89 01 52 43 37 33 38 35 0A"
  params: []

- id: rc_thx_dark
  label: THX Dark
  kind: action
  command: "21 89 01 52 43 37 33 38 36 0A"
  params: []

- id: rc_thx_off
  label: THX Off
  kind: action
  command: "21 89 01 52 43 37 33 43 37 0A"
  params: []

- id: rc_thx_on
  label: THX On
  kind: action
  command: "21 89 01 52 43 37 33 43 38 0A"
  params: []

- id: rc_tint_minus
  label: Tint -
  kind: action
  command: "21 89 01 52 43 37 33 39 39 0A"
  params: []

- id: rc_tint_plus
  label: Tint +
  kind: action
  command: "21 89 01 52 43 37 33 39 38 0A"
  params: []

- id: rc_tint_adj
  label: Tint Adjustment Bar Toggle
  kind: action
  command: "21 89 01 52 43 37 33 31 36 0A"
  params: []

- id: rc_tracking_minus
  label: Tracking (PC) -
  kind: action
  command: "21 89 01 52 43 37 33 41 37 0A"
  params: []

- id: rc_tracking_plus
  label: Tracking (PC) +
  kind: action
  command: "21 89 01 52 43 37 33 41 36 0A"
  params: []

- id: rc_user_cycle
  label: User Picture Mode Cycle
  kind: action
  command: "21 89 01 52 43 37 33 44 37 0A"
  params: []

- id: rc_vpos_minus
  label: Vertical Position -
  kind: action
  command: "21 89 01 52 43 37 33 41 44 0A"
  params: []

- id: rc_vpos_plus
  label: Vertical Position +
  kind: action
  command: "21 89 01 52 43 37 33 41 43 0A"
  params: []

# ===== Enquiry (Query) Commands =====
# Enquiry header 3F. Projector first echoes basic ACK 06 89 01 CC CC 0A,
# then returns detailed 40 89 01 CC CC RR 0A.

- id: power_status_query
  label: Power Status Enquiry
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []

- id: input_status_query
  label: Input Status Enquiry
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []

- id: gamma_table_query
  label: Gamma Table Enquiry
  kind: query
  command: "3F 89 01 47 54 0A"
  params: []

- id: gamma_value_query
  label: Gamma Value Enquiry
  kind: query
  command: "3F 89 01 47 50 0A"
  params: []

- id: source_status_query
  label: Source Status Enquiry
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []

- id: model_status_query
  label: Model Status Enquiry
  kind: query
  command: "3F 89 01 4D 44 0A"
  params: []
```

## Feedbacks
```yaml
# Detailed-response codes returned after the basic ACK.
# Format from source: 40 89 01 <cmd> RR 0A

- id: power_state
  type: enum
  values:
    - standby        # 30
    - power_on       # 31
    - cooling        # 32
    - emergency      # 34

- id: input_state
  type: enum
  values:
    - svideo         # 30
    - video          # 31
    - component      # 32
    - pc             # 33
    - hdmi1          # 36
    - hdmi2          # 37

- id: gamma_table
  type: enum
  values:
    - normal         # 30
    - a              # 31
    - b              # 32
    - c              # 33
    - custom1        # 34
    - custom2        # 35
    - custom3        # 36

- id: gamma_value
  type: enum
  values:
    - "1.8"          # 30
    - "1.9"          # 31
    - "2.0"          # 32
    - "2.1"          # 33
    - "2.2"          # 34
    - "2.3"          # 35
    - "2.4"          # 36
    - "2.5"          # 37
    - "2.6"          # 38

- id: source_state
  type: enum
  values:
    - jvc_logo       # 00
    - no_signal      # 30
    - signal_ok      # 31

- id: model_id
  type: string
  description: ASCII hex string returned by Model Status Enquiry identifying the projector
  values:
    - "494C41 46 504A 202D 2D 202D 5848 34"        # DLA-HD350
    - "494C41 46 504A 202D 2D 202D 5848 37"        # DLA-RS10
    - "494C41 46 504A 202D 2D 202D 5848 35"        # DLA-HD750 / DLA-RS20
    - "494C41 46 504A 202D 2D 202D 5848 38"        # DLA-HD550
    - "494C41 46 504A 202D 2D 202D 5848 41"        # DLA-RS15
    - "494C41 46 504A 202D 2D 202D 5848 39"        # DLA-HD950/HD990/DLA-RS25/RS35
    - "494C41 46 504A 202D 2D 202D 5848 42"        # DLA-X3 / DLA-RS40
    - "494C41 46 504A 202D 2D 202D 5848 43"        # DLA-X7/X9 / DLA-RS50/60
    - "494C41 46 504A 202D 2D 202D 5848 45"        # DLA-X30 / DLA-RS45
    - "494C41 46 504A 202D 2D 202D 5848 46"        # DLA-X70R/X90R / DLA-RS55/65
```

## Variables
```yaml
# UNRESOLVED: no continuous/dial-style settable parameters (volume sliders, etc.)
# are documented in the source - all source values are discrete mode selections.
# The PC Phase/Tracking and H/V Position commands are step-based but no numeric
# range is documented in the source.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. Connection close
# on LAN after 5s of idle is procedural, not an event.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences. Note that "Power Off
# (send twice with short delay between to switch off)" is a procedural note
# in the source for the RC command, not a defined macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. The Off Timer and Trigger commands are
# operational features, not safety mechanisms.
```

## Notes
- All RS-232C commands are 7 bytes (Direct) or 10 bytes (RC emulation) framed as `21 89 01 <cmd 2B> [data] 0A`. Header 21 = command; unit ID 89 01 fixed; end 0A fixed.
- LAN handshake (DLA-X7/X9/X30/X70/X90/RS50/60/RS45/55/65 only): TCP connect → projector sends `PJ_OK` → controller replies `PJREQ` within 5s → projector sends `PJACK` → controller sends command within 5s → projector closes connection 5s after response. Repeat full handshake for each command.
- IR commands: prefix `73` (Code A) or `63` (Code B) followed by the 2-digit hex from the right-hand column of the RC emulation tables. Multiple-projector installs can switch via `ir_code_a` / `ir_code_b` direct commands or by holding `Menu`+`Back` on the remote for 3s.
- Power-off via RC emulation (`rc_power_off`) must be sent twice with a short delay per source.
- Cross-connected (null-modem) DB-9 cable required for PC connection. Pinout: 2=Rx, 3=Tx, 5=GND, others NC.
- Source applies to DLA-HD350 through DLA-RS65; DLA-HD2K is a separate c.2004 model not enumerated in this document. Per-command applicability to DLA-HD2K is UNRESOLVED.
<!-- UNRESOLVED: Firmware version requirements, voltage/power specifications, fault-recovery sequences, and per-model feature gates beyond those noted inline are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILARemoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:41.240Z
last_checked_at: 2026-06-02T17:22:41.364Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:41.364Z
matched_actions: 327
action_count: 327
confidence: medium
summary: "All 327 spec actions match verbatim source hex codes across direct, RC emulation, and query command tables; transport parameters confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "This source document (RS-232C, LAN and Infrared Remote Control Guide, Version 1.4) does NOT explicitly cover the DLA-HD2K. The model list begins with DLA-HD350 (2008+) and ends at DLA-RS65 (2012). The DLA-HD2K (c. 2004) is a discontinued model that pre-dates this guide. Commands in this spec are emitted from the guide's payload tables; per-model applicability to DLA-HD2K is UNRESOLVED."
- "no continuous/dial-style settable parameters (volume sliders, etc.)"
- "source documents no unsolicited notifications. Connection close"
- "source documents no multi-step sequences. Note that \"Power Off"
- "source contains no explicit safety warnings, interlock procedures,"
- "Firmware version requirements, voltage/power specifications, fault-recovery sequences, and per-model feature gates beyond those noted inline are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
