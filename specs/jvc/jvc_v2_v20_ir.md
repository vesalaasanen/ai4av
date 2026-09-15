---
spec_id: admin/jvc-dila-projector
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
    - DLA-HD550
    - DLA-HD750
    - DLA-HD950
    - DLA-HD990
    - DLA-X3
    - DLA-X7
    - DLA-X9
    - DLA-X30
    - DLA-X70R
    - DLA-X90R
    - DLA-RS10
    - DLA-RS15
    - DLA-RS20
    - DLA-RS25
    - DLA-RS35
    - DLA-RS40
    - DLA-RS45
    - DLA-RS50
    - DLA-RS55
    - DLA-RS60
    - DLA-RS65
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
retrieved_at: 2026-09-02T16:37:54.679Z
last_checked_at: 2026-09-12T22:16:43.798Z
generated_at: 2026-09-12T22:16:43.798Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document is the \"RS-232C, LAN and Infrared Remote Control Guide v1.4\" which covers the full D-ILA family (HD/X/RS). The input target name \"V2-V20\" does not correspond to any JVC model listed in the source; the closest matching JVC designations are V5/V7/V9. If \"V2-V20\" is a private-label or distributor designation for one of the documented D-ILA models, that mapping is unknown. Firmware compatibility version not stated."
  - "the source documents discrete command-per-setting actions rather than continuous"
  - "the projector returns Acknowledgement Response Return Codes only in response to"
  - "the source does not describe multi-step macro sequences. It does note that the"
  - "explicit safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware version compatibility is not stated in the source; some commands are"
verification:
  verdict: verified
  checked_at: 2026-09-12T22:16:43.798Z
  matched_actions: 327
  action_count: 327
  confidence: medium
  summary: "All 327 spec action hex literals match source command-table rows verbatim after whitespace collapse; transport values (port 20554, 19200 8N1) explicit in source; bidirectional coverage is essentially 1:1. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# JVC D-ILA Projector Control Spec

## Summary
This spec covers RS-232C, LAN, and Infrared remote control of the JVC D-ILA projector line (DLA-HD, DLA-X, DLA-RS series). Commands are binary hexadecimal frames sent over a 19200 bps 8N1 serial link, or over TCP port 20554 using the same hex frame format with an ASCII handshake, or as IR pulses encoded with hex code 73 (Code A) / 63 (Code B). Power, input, picture mode, gamma, lamp power, anamorphic, trigger, 3D format, lens memory, and many picture-adjustment parameters are covered.

<!-- UNRESOLVED: The source document is the "RS-232C, LAN and Infrared Remote Control Guide v1.4" which covers the full D-ILA family (HD/X/RS). The input target name "V2-V20" does not correspond to any JVC model listed in the source; the closest matching JVC designations are V5/V7/V9. If "V2-V20" is a private-label or distributor designation for one of the documented D-ILA models, that mapping is unknown. Firmware compatibility version not stated. -->

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
  port: 20554
auth:
  type: none
  # inferred: no auth procedure in source - LAN handshake is PJ_OK / PJREQ / PJACK, not credentials
```

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from input switching commands (HDMI 1/2, Component, S-Video, Video, PC)
- queryable       # inferred from enquiry commands (power, input, gamma, source, model status)
- levelable       # inferred from picture-adjustment ± commands (brightness, contrast, colour, sharpness, gamma, etc.)
```

## Actions
```yaml
# Direct Commands - POWER
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

# Direct Commands - INPUT SWITCHING
- id: input_hdmi_1
  label: Input HDMI 1
  kind: action
  command: "21 89 01 49 50 36 0A"
  params: []

- id: input_hdmi_2
  label: Input HDMI 2
  kind: action
  command: "21 89 01 49 50 37 0A"
  params: []

- id: input_component
  label: Input Component
  kind: action
  command: "21 89 01 49 50 32 0A"
  params: []

- id: input_s_video
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
  label: Input PC (HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65)
  kind: action
  command: "21 89 01 49 50 33 0A"
  params: []

- id: input_next
  label: Input Next (cycle to next-highest input)
  kind: action
  command: "21 89 01 49 50 2B 0A"
  params: []

- id: input_prev
  label: Input Previous (cycle to next-lowest input)
  kind: action
  command: "21 89 01 49 50 2D 0A"
  params: []

# Direct Commands - TEST PATTERNS (HD350/550/750/950/990/RS10/15/20/25/35)
- id: test_pattern_off
  label: Test Pattern Off
  kind: action
  command: "21 89 01 54 53 30 0A"
  params: []

- id: test_pattern_colour_bars
  label: Test Pattern Colour Bars
  kind: action
  command: "21 89 01 54 53 31 0A"
  params: []

- id: test_pattern_stairstep_bw
  label: Test Pattern Stairstep (black and white)
  kind: action
  command: "21 89 01 54 53 36 0A"
  params: []

- id: test_pattern_stairstep_red
  label: Test Pattern Stairstep (red)
  kind: action
  command: "21 89 01 54 53 37 0A"
  params: []

- id: test_pattern_stairstep_green
  label: Test Pattern Stairstep (green)
  kind: action
  command: "21 89 01 54 53 38 0A"
  params: []

- id: test_pattern_stairstep_blue
  label: Test Pattern Stairstep (blue)
  kind: action
  command: "21 89 01 54 53 39 0A"
  params: []

- id: test_pattern_crosshatch_green
  label: Test Pattern Crosshatch (green)
  kind: action
  command: "21 89 01 54 53 41 0A"
  params: []

# Direct Commands - GAMMA TABLE
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

- id: gamma_custom_1
  label: Gamma Custom 1
  kind: action
  command: "21 89 01 47 54 34 0A"
  params: []

- id: gamma_custom_2
  label: Gamma Custom 2
  kind: action
  command: "21 89 01 47 54 35 0A"
  params: []

- id: gamma_custom_3
  label: Gamma Custom 3
  kind: action
  command: "21 89 01 47 54 36 0A"
  params: []

# Direct Commands - GAMMA VALUE
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

# Direct Commands - OFF TIMER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
- id: off_timer_off
  label: Off Timer Off
  kind: action
  command: "21 89 01 46 55 4F 54 30 0A"
  params: []

- id: off_timer_1_hour
  label: Off Timer 1 Hour
  kind: action
  command: "21 89 01 46 55 4F 54 31 0A"
  params: []

- id: off_timer_2_hours
  label: Off Timer 2 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 32 0A"
  params: []

- id: off_timer_3_hours
  label: Off Timer 3 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 33 0A"
  params: []

- id: off_timer_4_hours
  label: Off Timer 4 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 34 0A"
  params: []

# Direct Commands - LAMP POWER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
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

# Direct Commands - INFRARED REMOTE CODE (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
- id: ir_remote_code_a
  label: Remote Code A (hex73)
  kind: action
  command: "21 89 01 53 55 52 43 30 0A"
  params: []

- id: ir_remote_code_b
  label: Remote Code B (hex 63)
  kind: action
  command: "21 89 01 53 55 52 43 31 0A"
  params: []

# Direct Commands - TRIGGER OUTPUT (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
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

# Direct Commands - CLEAR MOTION DRIVE
- id: cmd_off
  label: Clear Motion Drive Off
  kind: action
  command: "21 89 01 50 4D 43 4D 30 0A"
  params: []

- id: cmd_mode_1
  label: Clear Motion Drive Mode 1 (Low)
  kind: action
  command: "21 89 01 50 4D 43 4D 31 0A"
  params: []

- id: cmd_mode_2
  label: Clear Motion Drive Mode 2 (High)
  kind: action
  command: "21 89 01 50 4D 43 4D 32 0A"
  params: []

- id: cmd_mode_3
  label: Clear Motion Drive Mode 3
  kind: action
  command: "21 89 01 50 4D 43 4D 33 0A"
  params: []

- id: cmd_mode_4
  label: Clear Motion Drive Mode 4
  kind: action
  command: "21 89 01 50 4D 43 4D 34 0A"
  params: []

- id: cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  command: "21 89 01 50 4D 43 4D 35 0A"
  params: []

# Direct Commands - ANAMORPHIC (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
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

# Direct Commands - PICTURE MODE (X30/X70/X90/RS45/55/65)
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

- id: picture_mode_thx
  label: Picture Mode THX (X70/X90/RS55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 36 0A"
  params: []

- id: picture_mode_3d
  label: Picture Mode 3D (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 42 0A"
  params: []

- id: picture_mode_user_1
  label: Picture Mode User 1 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 43 0A"
  params: []

- id: picture_mode_user_2
  label: Picture Mode User 2 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 44 0A"
  params: []

- id: picture_mode_user_3
  label: Picture Mode User 3 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 45 0A"
  params: []

- id: picture_mode_user_4
  label: Picture Mode User 4 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 46 0A"
  params: []

- id: picture_mode_user_5
  label: Picture Mode User 5 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 30 0A"
  params: []

# Direct Commands - PICTURE MODE (X3/X7/X9/RS40/50/60)
- id: picture_mode_film_x3
  label: Picture Mode Film (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []

- id: picture_mode_cinema_x3
  label: Picture Mode Cinema (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []

- id: picture_mode_animation_x3
  label: Picture Mode Animation (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []

- id: picture_mode_natural_x3
  label: Picture Mode Natural (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []

- id: picture_mode_stage_x3
  label: Picture Mode Stage (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []

- id: picture_mode_3d_x3
  label: Picture Mode 3D (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 45 0A"
  params: []

- id: picture_mode_user_1_x3
  label: Picture Mode User 1 (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []

- id: picture_mode_user_2_x3
  label: Picture Mode User 2 (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []

- id: picture_mode_thx_x3
  label: Picture Mode THX (X7/X9/RS50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# Direct Commands - PICTURE MODE (HD350/750/550/950/990/RS10/20/15/25/35)
- id: picture_mode_cinema_1_hd
  label: Picture Mode Cinema 1 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []

- id: picture_mode_cinema_2_hd
  label: Picture Mode Cinema 2 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []

- id: picture_mode_cinema_3_hd
  label: Picture Mode Cinema 3 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []

- id: picture_mode_natural_hd
  label: Picture Mode Natural (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []

- id: picture_mode_stage_hd
  label: Picture Mode Stage (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []

- id: picture_mode_dynamic_hd
  label: Picture Mode Dynamic (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 35 0A"
  params: []

- id: picture_mode_user_1_hd
  label: Picture Mode User 1 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []

- id: picture_mode_user_2_hd
  label: Picture Mode User 2 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []

- id: picture_mode_thx_hd
  label: Picture Mode THX (HD750/950/990/RS20/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# Direct Commands - COLOUR PROFILE (X30/X70/X90/RS45/55/65)
- id: colour_profile_off
  label: Colour Profile Off
  kind: action
  command: "21 89 01 50 4D 50 52 30 30 0A"
  params: []

- id: colour_profile_film_1
  label: Colour Profile Film 1  kind: action
  command: "21 89 01 50 4D 50 52 30 31 0A"
  params: []

- id: colour_profile_film_2
  label: Colour Profile Film 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 32 0A"
  params: []

- id: colour_profile_standard
  label: Colour Profile Standard
  kind: action
  command: "21 89 01 50 4D 50 52 30 33 0A"
  params: []

- id: colour_profile_cinema_1
  label: Colour Profile Cinema 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 34 0A"
  params: []

- id: colour_profile_cinema_2
  label: Colour Profile Cinema 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 35 0A"
  params: []

- id: colour_profile_anime_1
  label: Colour Profile Anime 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 36 0A"
  params: []

- id: colour_profile_anime_2
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

# Direct Commands - 3D FORMAT (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
- id: 3d_format_off
  label: 3D Format Off (2D)
  kind: action
  command: "21 89 01 49 53 33 44 30 0A"
  params: []

- id: 3d_format_auto
  label: 3D Format Auto
  kind: action
  command: "21 89 01 49 53 33 44 31 0A"
  params: []

- id: 3d_format_frame_packing
  label: 3D Format Frame Packing
  kind: action
  command: "21 89 01 49 53 33 44 32 0A"
  params: []

- id: 3d_format_side_by_side
  label: 3D Format Side by Side
  kind: action
  command: "21 89 01 49 53 33 44 33 0A"
  params: []

- id: 3d_format_top_and_bottom
  label: 3D Format Top and Bottom
  kind: action
  command: "21 89 01 49 53 33 44 34 0A"
  params: []

# Direct Commands - 2D TO 3D CONVERSION (X30/X70/X90/RS45/55/65)
- id: 2d_to_3d_off
  label: 2D to 3D Conversion Off
  kind: action
  command: "21 89 01 49 53 33 43 30 0A"
  params: []

- id: 2d_to_3d_on
  label: 2D to 3D Conversion On
  kind: action
  command: "21 89 01 49 53 33 43 31 0A"
  params: []

# Direct Commands - 3D SUBTITLE CORRECTION (X30/X70/X90/RS45/55/65)
- id: 3d_subtitle_correction_off
  label: 3D Subtitle Correction Off
  kind: action
  command: "21 89 01 49 53 33 54 31 0A"
  params: []

- id: 3d_subtitle_correction_on
  label: 3D Subtitle Correction On
  kind: action
  command: "21 89 01 49 53 33 54 30 0A"
  params: []

# Direct Commands - LENS MEMORY (X30/X70/X90/RS45/55/65)
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

# Direct Commands - TEST (NULL) COMMAND
- id: null_command
  label: Null Command (check communication)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

# Remote Control Emulation Commands (prefix 21 89 01 52 43 37 33 ...0A)
- id: rc_3d_setting_menu
  label: 3D Setting Menu (direct access)
  kind: action
  command: "21 89 01 52 43 37 33 44 35 0A"
  params: []

- id: rc_3d_format_cycle
  label: 3D Format Cycle
  kind: action
  command: "21 89 01 52 43 37 33 44 36 0A"
  params: []

- id: rc_advanced_menu
  label: Picture Adjust > Advanced Menu
  kind: action
  command: "21 89 01 52 43 37 33 37 33 0A"
  params: []

- id: rc_anamorphic_off
  label: Anamorphic Off / Vertical Stretch Off
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
  label: Anamorphic Cycle (Off/A/B)
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
  label: Aspect (PC) Auto
  kind: action
  command: "21 89 01 52 43 37 33 41 45 0A"
  params: []

- id: rc_aspect_pc_full
  label: Aspect (PC) Full
  kind: action
  command: "21 89 01 52 43 37 33 42 30 0A"
  params: []

- id: rc_aspect_pc_just
  label: Aspect (PC) Just
  kind: action
  command: "21 89 01 52 43 37 33 41 46 0A"
  params: []

- id: rc_aspect_cycle
  label: Aspect Cycle (all available modes)
  kind: action
  command: "21 89 01 52 43 37 33 37 37 0A"
  params: []

- id: rc_auto_align
  label: Auto Align (PC input)
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
  label: BNR (Block Noise Reduction) Off
  kind: action
  command: "21 89 01 52 43 37 33 31 30 0A"
  params: []

- id: rc_bnr_on
  label: BNR (Block Noise Reduction) On
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
  label: Clear Motion Drive Cycle (Off/M1/M2/M3/M4/Inverse Telecine)
  kind: action
  command: "21 89 01 52 43 37 33 38 41 0A"
  params: []

- id: rc_cmd_off
  label: Clear Motion Drive Off
  kind: action
  command: "21 89 01 52 43 37 33 34 37 0A"
  params: []

- id: rc_cmd_mode_1
  label: Clear Motion Drive Mode 1
  kind: action
  command: "21 89 01 52 43 37 33 43 45 0A"
  params: []

- id: rc_cmd_mode_2
  label: Clear Motion Drive Mode 2
  kind: action
  command: "21 89 01 52 43 37 33 43 46 0A"
  params: []

- id: rc_cmd_mode_3
  label: Clear Motion Drive Mode 3
  kind: action
  command: "21 89 01 52 43 37 33 34 38 0A"
  params: []

- id: rc_cmd_mode_4
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

- id: rc_colour_management_off
  label: Colour Management Off
  kind: action
  command: "21 89 01 52 43 37 33 36 30 0A"
  params: []

- id: rc_colour_management_custom_1
  label: Colour Management Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 36 31 0A"
  params: []

- id: rc_colour_management_custom_2
  label: Colour Management Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 36 32 0A"
  params: []

- id: rc_colour_management_custom_3
  label: Colour Management Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 36 33 0A"
  params: []

- id: rc_colour_management_cycle
  label: Colour Management Cycle (Off/Custom 1/2/3)
  kind: action
  command: "21 89 01 52 43 37 33 38 39 0A"
  params: []

- id: rc_colour_profile_cycle
  label: Colour Profile Cycle
  kind: action
  command: "21 89 01 52 43 37 33 38 38 0A"
  params: []

- id: rc_colour_space_cycle
  label: Colour Space Cycle (Standard/Wide 1/Wide 2)
  kind: action
  command: "21 89 01 52 43 37 33 43 44 0A"
  params: []

- id: rc_colour_temp_5800k
  label: Colour Temperature 5800K
  kind: action
  command: "21 89 01 52 43 37 33 34 45 0A"
  params: []

- id: rc_colour_temp_6500k
  label: Colour Temperature 6500K
  kind: action
  command: "21 89 01 52 43 37 33 34 46 0A"
  params: []

- id: rc_colour_temp_7500k
  label: Colour Temperature 7500K
  kind: action
  command: "21 89 01 52 43 37 33 35 30 0A"
  params: []

- id: rc_colour_temp_9300k
  label: Colour Temperature 9300K
  kind: action
  command: "21 89 01 52 43 37 33 35 31 0A"
  params: []

- id: rc_colour_temp_custom_1
  label: Colour Temperature Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 35 33 0A"
  params: []

- id: rc_colour_temp_custom_2
  label: Colour Temperature Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 35 34 0A"
  params: []

- id: rc_colour_temp_custom_3
  label: Colour Temperature Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 35 35 0A"
  params: []

- id: rc_colour_temp_high_bright
  label: Colour Temperature High Bright
  kind: action
  command: "21 89 01 52 43 37 33 35 32 0A"
  params: []

- id: rc_colour_temp_cycle
  label: Colour Temperature Cycle (all options)
  kind: action
  command: "21 89 01 52 43 37 33 37 36 0A"
  params: []

- id: rc_ct_gain_blue_minus
  label: Colour Temperature Gain Blue -
  kind: action
  command: "21 89 01 52 43 37 33 39 31 0A"
  params: []

- id: rc_ct_gain_blue_plus
  label: Colour Temperature Gain Blue +
  kind: action
  command: "21 89 01 52 43 37 33 39 30 0A"
  params: []

- id: rc_ct_gain_green_minus
  label: Colour Temperature Gain Green -
  kind: action
  command: "21 89 01 52 43 37 33 38 46 0A"
  params: []

- id: rc_ct_gain_green_plus
  label: Colour Temperature Gain Green +
  kind: action
  command: "21 89 01 52 43 37 33 38 45 0A"
  params: []

- id: rc_ct_gain_red_minus
  label: Colour Temperature Gain Red -
  kind: action
  command: "21 89 01 52 43 37 33 38 44 0A"
  params: []

- id: rc_ct_gain_red_plus
  label: Colour Temperature Gain Red +
  kind: action
  command: "21 89 01 52 43 37 33 38 43 0A"
  params: []

- id: rc_ct_offset_blue_minus
  label: Colour Temperature Offset Blue -
  kind: action
  command: "21 89 01 52 43 37 33 39 37 0A"
  params: []

- id: rc_ct_offset_blue_plus
  label: Colour Temperature Offset Blue +
  kind: action
  command: "21 89 01 52 43 37 33 39 36 0A"
  params: []

- id: rc_ct_offset_green_minus
  label: Colour Temperature Offset Green -
  kind: action
  command: "21 89 01 52 43 37 33 39 35 0A"
  params: []

- id: rc_ct_offset_green_plus
  label: Colour Temperature Offset Green +
  kind: action
  command: "21 89 01 52 43 37 33 39 34 0A"
  params: []

- id: rc_ct_offset_red_minus
  label: Colour Temperature Offset Red -
  kind: action
  command: "21 89 01 52 43 37 33 39 33 0A"
  params: []

- id: rc_ct_offset_red_plus
  label: Colour Temperature Offset Red +
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
  label: CTI (Colour Transient Improvement) Off
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
  label: Gamma A (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 39 0A"
  params: []

- id: rc_gamma_b
  label: Gamma B (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 41 0A"
  params: []

- id: rc_gamma_c
  label: Gamma C (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 42 0A"
  params: []

- id: rc_gamma_custom_1
  label: Gamma Custom 1 (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 43 0A"
  params: []

- id: rc_gamma_custom_2
  label: Gamma Custom 2 (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 44 0A"
  params: []

- id: rc_gamma_custom_3
  label: Gamma Custom 3 (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 45 0A"
  params: []

- id: rc_gamma_d
  label: Gamma D (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 46 0A"
  params: []

- id: rc_gamma_normal
  label: Gamma Normal (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 38 0A"
  params: []

- id: rc_gamma_cycle
  label: Gamma Cycle (all options)
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

- id: rc_hposition_minus
  label: Horizontal Position -
  kind: action
  command: "21 89 01 52 43 37 33 41 42 0A"
  params: []

- id: rc_hposition_plus
  label: Horizontal Position +
  kind: action
  command: "21 89 01 52 43 37 33 41 41 0A"
  params: []

- id: rc_information
  label: Information (display Info tab)
  kind: action
  command: "21 89 01 52 43 37 33 37 34 0A"
  params: []

- id: rc_input_component
  label: Input Component (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 44 0A"
  params: []

- id: rc_input_hdmi_1
  label: Input HDMI 1 (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 30 0A"
  params: []

- id: rc_input_hdmi_2
  label: Input HDMI 2 (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 31 0A"
  params: []

- id: rc_input_pc
  label: Input PC (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 36 0A"
  params: []

- id: rc_input_s_video
  label: Input S-Video (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 43 0A"
  params: []

- id: rc_input_video
  label: Input Video (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 42 0A"
  params: []

- id: rc_input_cycle
  label: Input Cycle (all available inputs)
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
  label: Lens Aperture 1  kind: action
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
  label: Lens Aperture Adjustment Bar Toggle
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
  label: Lens Memory Cycle (Select/Save/Name Edit)
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

- id: rc_menu_toggle
  label: Menu Toggle (On/Off)
  kind: action
  command: "21 89 01 52 43 37 33 32 45 0A"
  params: []

- id: rc_menu_position
  label: Menu Position
  kind: action
  command: "21 89 01 52 43 37 33 34 32 0A"
  params: []

- id: rc_mnr_minus
  label: MNR (Mosquito Noise Reduction) -
  kind: action
  command: "21 89 01 52 43 37 33 30 45 0A"
  params: []

- id: rc_mnr_plus
  label: MNR (Mosquito Noise Reduction) +
  kind: action
  command: "21 89 01 52 43 37 33 30 44 0A"
  params: []

- id: rc_nr_toggle
  label: NR Toggle (display RNR/MNR)
  kind: action
  command: "21 89 01 52 43 37 33 31 38 0A"
  params: []

- id: rc_ok
  label: OK (accept selected option)
  kind: action
  command: "21 89 01 52 43 37 33 32 46 0A"
  params: []

- id: rc_phase_pc_minus
  label: Phase (PC Input) -
  kind: action
  command: "21 89 01 52 43 37 33 41 39 0A"
  params: []

- id: rc_phase_pc_plus
  label: Phase (PC Input) +
  kind: action
  command: "21 89 01 52 43 37 33 41 38 0A"
  params: []

- id: rc_picture_adjust
  label: Picture Adjust
  kind: action
  command: "21 89 01 52 43 37 33 37 32 0A"
  params: []

- id: rc_picture_mode_3d
  label: Picture Mode 3D (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 37 0A"
  params: []

- id: rc_picture_mode_cinema_1
  label: Picture Mode Cinema 1 / Film Mode
  kind: action
  command: "21 89 01 52 43 37 33 36 39 0A"
  params: []

- id: rc_picture_mode_cinema_2
  label: Picture Mode Cinema 2 / Cinema Mode
  kind: action
  command: "21 89 01 52 43 37 33 36 38 0A"
  params: []

- id: rc_picture_mode_cinema_3
  label: Picture Mode Cinema 3 / Animation Mode
  kind: action
  command: "21 89 01 52 43 37 33 36 36 0A"
  params: []

- id: rc_picture_mode_dynamic
  label: Picture Mode Dynamic
  kind: action
  command: "21 89 01 52 43 37 33 36 42 0A"
  params: []

- id: rc_picture_mode_natural
  label: Picture Mode Natural (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 41 0A"
  params: []

- id: rc_picture_mode_stage
  label: Picture Mode Stage (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 37 0A"
  params: []

- id: rc_picture_mode_thx
  label: Picture Mode THX (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 46 0A"
  params: []

- id: rc_picture_mode_user_1
  label: Picture Mode User 1 (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 43 0A"
  params: []

- id: rc_picture_mode_user_2
  label: Picture Mode User 2 (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 44 0A"
  params: []

- id: rc_picture_mode_user_3
  label: Picture Mode User 3
  kind: action
  command: "21 89 01 52 43 37 33 36 45 0A"
  params: []

- id: rc_picture_mode_user_4
  label: Picture Mode User 4
  kind: action
  command: "21 89 01 52 43 37 33 43 41 0A"
  params: []

- id: rc_picture_mode_user_5
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
  label: Power Off (send twice with short delay)
  kind: action
  command: "21 89 01 52 43 37 33 30 36 0A"
  params: []

- id: rc_power_on
  label: Power On (remote emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 35 0A"
  params: []

- id: rc_rnr_minus
  label: RNR (Random Noise Reduction) -
  kind: action
  command: "21 89 01 52 43 37 33 30 43 0A"
  params: []

- id: rc_rnr_plus
  label: RNR (Random Noise Reduction) +
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
  label: Shutter Off (un-sync with Hide)
  kind: action
  command: "21 89 01 52 43 37 33 32 44 0A"
  params: []

- id: rc_shutter_on
  label: Shutter On (sync with Hide)
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

- id: rc_tracking_pc_minus
  label: Tracking (PC Input) -
  kind: action
  command: "21 89 01 52 43 37 33 41 37 0A"
  params: []

- id: rc_tracking_pc_plus
  label: Tracking (PC Input) +
  kind: action
  command: "21 89 01 52 43 37 33 41 36 0A"
  params: []

- id: rc_user_cycle
  label: User Picture Mode Cycle (User 1-5)
  kind: action
  command: "21 89 01 52 43 37 33 44 37 0A"
  params: []

- id: rc_vposition_minus
  label: Vertical Position -
  kind: action
  command: "21 89 01 52 43 37 33 41 44 0A"
  params: []

- id: rc_vposition_plus
  label: Vertical Position +
  kind: action
  command: "21 89 01 52 43 37 33 41 43 0A"
  params: []

# Query commands - Enquiry (header 3F)
- id: query_power_status
  label: Query Power Status
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []

- id: query_input_status
  label: Query Video Input Status
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []

- id: query_gamma_table
  label: Query Gamma Table
  kind: query
  command: "3F 89 01 47 54 0A"
  params: []

- id: query_gamma_value
  label: Query Gamma Value
  kind: query
  command: "3F 89 01 47 50 0A"
  params: []

- id: query_source_status
  label: Query Video Source Status
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []

- id: query_model_status
  label: Query Projector Model
  kind: query
  command: "3F 89 01 4D 44 0A"
  params: []
```

## Feedbacks
```yaml
- id: ack_basic
  type: object
  description: |
 Basic Acknowledgement Response Return Code. Format: 06 89 01 CC CC 0A where CC CC is the    first 2 bytes of the command that was originally sent (not including 21 89 01).
  examples:
    power: "06 89 01 50 57 0A"
    input: "06 89 01 49 50 0A"
    test_pattern: "06 89 01 54 53 0A"
    gamma_table: "06 89 01 47 54 0A"
    gamma_value: "06 89 01 47 50 0A"
    remote_control_emulation: "06 89 01 52 43 0A"
    null_command: "06 89 01 00 00 0A"

- id: ack_detailed
  type: object
  description: |
    Detailed Acknowledgement Response Return Code. Sent after the basic ack following an enquiry
    command. Format: 40 89 01 CC CC RR 0A where RR is the Detailed Response Return Code.

- id: power_status_detail
  type: enum
  values:
    - standby
    - power_on
    - cooling
    - emergency
  description: |
    RR value for the Power Status Enquiry: 30 = Standby, 31 = Power On, 32 = Cooling, 34 = Emergency.

- id: input_status_detail
  type: enum
  values:
    - s_video
    - video
    - component
    - pc
    - hdmi_1
    - hdmi_2
  description: |
    RR value for the Input Status Enquiry: 30 = S-Video, 31 = Video, 32 = Component,
    33 = PC (HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65), 36 = HDMI 1, 37 = HDMI 2.

- id: gamma_table_detail
  type: enum
  values:
    - normal
    - a
    - b
    - c
    - custom_1
    - custom_2
    - custom_3
  description: |
    RR value for the Gamma Table Enquiry: 30 = Normal, 31 = A, 32 = B, 33 = C,
    34 = Custom 1, 35 = Custom 2, 36 = Custom 3.

- id: gamma_value_detail
  type: enum
  values:
    - "1.8"
    - "1.9"
    - "2.0"
    - "2.1"
    - "2.2"
    - "2.3"
    - "2.4"
    - "2.5"
    - "2.6"
  description: |
    RR value for the Gamma Value Enquiry: 30 = 1.8, 31 = 1.9, 32 = 2.0, 33 = 2.1,
    34 = 2.2, 35 = 2.3, 36 = 2.4, 37 = 2.5, 38 = 2.6.

- id: source_status_detail
  type: enum
  values:
    - jvc_logo    - no_signal
    - signal_ok
  description: |
    RR value for the Source Status Enquiry: 00 = JVC Logo displayed,
    30 = No signal or signal out of range, 31 = Signal input correctly.

- id: model_status_detail
  type: string
  description: |
    RR value for the Model Status Enquiry is a multi-byte ASCII string. Examples from the source:
    "494C41 46 504A 202D 2D 202D5848 34" = DLA-HD350,
    "494C41 46 504A 202D 2D 202D5848 37" = DLA-RS10,
    "494C41 46 504A 202D 2D 202D5848 35" = DLA-HD750 & DLA-RS20,
    "494C41 46 504A 202D 2D 202D5848 38" = DLA-HD550,
    "494C41 46 504A 202D 2D 202D5848 41" = DLA-RS15,
    "494C41 46 504A 202D 2D 202D5848 39" = DLA-HD950/HD990/DLA-RS25/RS35,
    "494C41 46 504A 202D 2D 202D5848 42" = DLA-X3 & DLA-RS40,
    "494C41 46 504A 202D 2D 202D5848 43" = DLA-X7/X9 & DLA-RS50/60,
    "494C41 46 504A 202D 2D 202D5848 45" = DLA-X30 & DLA-RS45,
    "494C41 46 504A 202D 2D 202D5848 46" = DLA-X70R/X90R & DLA-RS55/65.

- id: lan_pj_ok
  type: string
  description: ASCII "PJ_OK" sent by projector immediately after accepting a TCP connection on port 20554.

- id: lan_pjreq_required
  type: string
  description: ASCII "PJREQ" that the controller must send within 5 seconds of PJ_OK to keep the connection open.

- id: lan_pjack_required
  type: string
  description: ASCII "PJACK" that the projector sends after PJ_REQ; controller must send its command within 5 seconds of PJACK.
```

## Variables
```yaml
# UNRESOLVED: the source documents discrete command-per-setting actions rather than continuous
# numeric variables. There are no "set brightness to N" or "set contrast to N" commands with a
# numeric range - brightness/contrast/colour/sharpness/gamma/etc. are stepped via dedicated +/- or
# preset-value actions. No enumerated variable parameters are documented beyond the discrete
# actions already enumerated above.
```

## Events
```yaml
# UNRESOLVED: the projector returns Acknowledgement Response Return Codes only in response to
# commands/enquiries; the source does not describe unsolicited asynchronous events/notifications.
```

## Macros
```yaml
# UNRESOLVED: the source does not describe multi-step macro sequences. It does note that the
# remote-emulation Power Off command must be sent twice with a short delay to switch off, and
# that the LAN handshake (PJ_OK → PJREQ → PJACK → Command) is a required multi-step prelude to
# every TCP command, but neither is a "macro" in the device-side sense.
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  - lamp_power_high
  - trigger_on_power
  - trigger_on_anamorphic
interlocks: []
# UNRESOLVED: explicit safety warnings, interlock procedures, or power-on sequencing requirements
# are not stated in the source. Items above are confirmation candidates based on the device's
# documented behavior (power commands and trigger changes affect attached equipment) but are NOT
# documented as safety requirements in the source. Remove from confirmation_required_for if the
# operator does not want inferred confirmation policies.
```

## Notes
- The target input device designation "V2-V20" does not appear in the source. The source is JVC's
  RS-232C/LAN/IR Remote Control Guide v1.4 covering the entire D-ILA projector family (HD350  through RS65). Each command in the source lists which specific model variants support that
  command. If "V2-V20" is a private-label or distributor designation, the mapping to a documented
  D-ILA model is unknown and should be resolved before relying on this spec.
- All commands are 7 or 10 bytes of binary hex over RS-232C or LAN. Frame layout:
  Header (1B) | Unit ID (8901, fixed) | Command (2B) | Data (variable) | End (0A, fixed).
  Header values: 21 = Operating Command, 3F = Enquiry, 06 = Basic Ack, 40 = Detailed Ack.
- A null/heartbeat command (21 89 01 00 00 0A) can be sent to verify the link; the projector
  responds with06 89 01 00 00 0A whether it is in Standby or Powered On.
- The projector discards any incoming command after a 50ms or longer gap. External controllers
  must wait for the acknowledgement before sending the next command.
- LAN control (TCP port 20554) is available on DLA-X7, X9, X30, X70, X90, RS50, RS60, RS45, RS55,
  RS65 only. All other models in the family are RS-232C and IR only.
- LAN requires a 5-second handshake on every connection: TCP connect → PJ_OK → PJREQ (≤5s) →
  PJACK → Command (≤5s). The projector closes the connection 5 seconds after each command.
- IR commands use device code 73 (Code A) by default. X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65
  support Code B (device code 63). Code selection is set via the "Infrared Remote Code" direct
  command (hex53 55 52 43 30/31) or in the projector menu, and also by holding Menu+Back for3+ seconds on the physical remote.
- Each IR command byte sequence is `73 <hex-ascii-of-rc-code>`. Example: Power On via IR is73 05.
- Use a cross-connected (null-modem) DB9 serial cable when connecting to a PC.

<!-- UNRESOLVED: firmware version compatibility is not stated in the source; some commands are
documented as available only on certain model sub-ranges (e.g.3D format on X3+ and RS40+,
trigger on X3+, lens memory on X30/RS45+). Per-command model applicability is captured in each
action's label and Notes, but firmware ranges were not enumerated by the manufacturer. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manualslib.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://www.manualslib.com/manual/83315/Jvc-Rs-232c.html
retrieved_at: 2026-09-02T16:37:54.679Z
last_checked_at: 2026-09-12T22:16:43.798Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-12T22:16:43.798Z
matched_actions: 327
action_count: 327
confidence: medium
summary: "All 327 spec action hex literals match source command-table rows verbatim after whitespace collapse; transport values (port 20554, 19200 8N1) explicit in source; bidirectional coverage is essentially 1:1. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document is the \"RS-232C, LAN and Infrared Remote Control Guide v1.4\" which covers the full D-ILA family (HD/X/RS). The input target name \"V2-V20\" does not correspond to any JVC model listed in the source; the closest matching JVC designations are V5/V7/V9. If \"V2-V20\" is a private-label or distributor designation for one of the documented D-ILA models, that mapping is unknown. Firmware compatibility version not stated."
- "the source documents discrete command-per-setting actions rather than continuous"
- "the projector returns Acknowledgement Response Return Codes only in response to"
- "the source does not describe multi-step macro sequences. It does note that the"
- "explicit safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware version compatibility is not stated in the source; some commands are"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
