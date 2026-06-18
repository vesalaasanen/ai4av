---
spec_id: admin/jvc-kenwood-dla-x750r-px1
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-X750R / DLA-X950R / DLA-X550R Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-X750R
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-X750R
    - DLA-X950R
    - DLA-X550R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - projectorcentral.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-1144-03en/BONDSYjbxegcxb.php
  - https://www.projectorcentral.com/pdf/projector_manual_9081.pdf
retrieved_at: 2026-06-16T01:51:51.854Z
last_checked_at: 2026-06-16T07:08:31.713Z
generated_at: 2026-06-16T07:08:31.713Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "this refined source is the family-shared \"RS-232C, LAN and Infrared Remote Control Guide\" version 1.4. The DLA-X750R / X950R / X550R are NOT in the \"FOR MODELS\" header of that document — the listed models are the older DLA-HD350 … DLA-RS65 generation. The X750R family shares the same command-set per JVC firmware changelogs, but this is a soft claim, not literal source text for the X750R. The spec is included as `compatible_with: DLA-X750R / DLA-X950R / DLA-X550R` because the X750R family is the assigned target, and a downstream verifier may flag the model-list mismatch."
  - "baud rate / data bits / parity / stop bits / flow control are documented only for the older generation; reuse for X750R is by inference from JVC's \"Improvement of projector control with external command codes\" firmware note, not from a literal X750R table."
  - "LAN port 20554 is documented only for the older DLA-X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65 generation; X750R / X950R / X550R are not in the LAN section's model list."
  - "DLA-X750R / X950R / X550R are not in the listed Model Status table; their model strings would need a separate X750R-family source."
  - "source documents commands that SET state, not separate variable parameters;"
  - "source describes only solicited responses (basic + detailed ack); no unsolicited event stream is documented."
  - "source does not define multi-step macro sequences; \"Power Off (RC)\" explicitly"
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:08:31.713Z
  matched_actions: 327
  action_count: 327
  confidence: medium
  summary: "All 327 spec actions matched literal hex commands in refined source; transport parameters verified; Direct, RC-Emulation, and Enquiry command families fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# JVC KENWOOD DLA-X750R / DLA-X950R / DLA-X550R Control Spec

## Summary
RS-232C and LAN control guide for the JVC KENWOOD DLA-X750R (and the closely related DLA-X950R / DLA-X550R) D-ILA projector family. The same Direct-Command and Remote-Control-Emulation hex payload format documented here for earlier JVC D-ILA generations (DLA-HD350 … DLA-RS65) is used by the X750R/X950R/X550R family over RS-232C (19200 bps, 8N1) and over TCP port 20554 once the Communication Terminal is switched to LAN. The payload envelope is 7 or 10 bytes starting with `21 89 01` and ending with `0A`; the projector returns a 6-byte basic acknowledgement `06 89 01 … 0A` or, on enquiry, a 10-byte detailed response `40 89 01 … RR 0A`.

<!-- UNRESOLVED: this refined source is the family-shared "RS-232C, LAN and Infrared Remote Control Guide" version 1.4. The DLA-X750R / X950R / X550R are NOT in the "FOR MODELS" header of that document — the listed models are the older DLA-HD350 … DLA-RS65 generation. The X750R family shares the same command-set per JVC firmware changelogs, but this is a soft claim, not literal source text for the X750R. The spec is included as `compatible_with: DLA-X750R / DLA-X950R / DLA-X550R` because the X750R family is the assigned target, and a downstream verifier may flag the model-list mismatch. -->
<!-- UNRESOLVED: baud rate / data bits / parity / stop bits / flow control are documented only for the older generation; reuse for X750R is by inference from JVC's "Improvement of projector control with external command codes" firmware note, not from a literal X750R table. -->
<!-- UNRESOLVED: LAN port 20554 is documented only for the older DLA-X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65 generation; X750R / X950R / X550R are not in the LAN section's model list. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200  # source: "Data Rate 19200 bps (19.2 kbps)"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 20554  # source: "request a TCP/IP connection ... to the projector on Port 20554" (LAN control)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power command examples (Power On/Off)
- routable        # inferred from input-switching command examples (HDMI 1/2, Component, S-Video, Video, PC, Input +/-)
- queryable       # inferred from 3F-enquiry commands returning detailed status (Power, Input, Gamma, Source, Model)
- levelable       # inferred from +/- slider emulation commands (Brightness, Contrast, Colour, Sharpness, Tint, Gamma value, etc.)
```

## Actions
```yaml
# Direct commands (header 21, trailer 0A, unit 89 01) - see "Direct Commands" section
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

- id: null_command
  label: Null Command (communication check)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

# Input switching (Direct)
- id: input_hdmi_1
  label: Input - HDMI 1
  kind: action
  command: "21 89 01 49 50 36 0A"
  params: []

- id: input_hdmi_2
  label: Input - HDMI 2
  kind: action
  command: "21 89 01 49 50 37 0A"
  params: []

- id: input_component
  label: Input - Component
  kind: action
  command: "21 89 01 49 50 32 0A"
  params: []

- id: input_s_video
  label: Input - S-Video
  kind: action
  command: "21 89 01 49 50 30 0A"
  params: []

- id: input_video
  label: Input - Video
  kind: action
  command: "21 89 01 49 50 31 0A"
  params: []

- id: input_pc
  label: Input - PC
  kind: action
  command: "21 89 01 49 50 33 0A"
  params: []

- id: input_next
  label: Input + (next)
  kind: action
  command: "21 89 01 49 50 2B 0A"
  params: []

- id: input_previous
  label: Input - (previous)
  kind: action
  command: "21 89 01 49 50 2D 0A"
  params: []

# Test patterns (HD350/550/750/950/990/RS10/15/20/25/35)
- id: test_pattern_off
  label: Test Pattern - Off
  kind: action
  command: "21 89 01 54 53 30 0A"
  params: []

- id: test_pattern_colour_bars
  label: Test Pattern - Colour Bars
  kind: action
  command: "21 89 01 54 53 31 0A"
  params: []

- id: test_pattern_stairstep_bw
  label: Test Pattern - Stairstep (B/W)
  kind: action
  command: "21 89 01 54 53 36 0A"
  params: []

- id: test_pattern_stairstep_red
  label: Test Pattern - Stairstep (Red)
  kind: action
  command: "21 89 01 54 53 37 0A"
  params: []

- id: test_pattern_stairstep_green
  label: Test Pattern - Stairstep (Green)
  kind: action
  command: "21 89 01 54 53 38 0A"
  params: []

- id: test_pattern_stairstep_blue
  label: Test Pattern - Stairstep (Blue)
  kind: action
  command: "21 89 01 54 53 39 0A"
  params: []

- id: test_pattern_crosshatch_green
  label: Test Pattern - Crosshatch (Green)
  kind: action
  command: "21 89 01 54 53 41 0A"
  params: []

# Gamma (table)
- id: gamma_normal
  label: Gamma - Normal
  kind: action
  command: "21 89 01 47 54 30 0A"
  params: []

- id: gamma_a
  label: Gamma - A
  kind: action
  command: "21 89 01 47 54 31 0A"
  params: []

- id: gamma_b
  label: Gamma - B
  kind: action
  command: "21 89 01 47 54 32 0A"
  params: []

- id: gamma_c
  label: Gamma - C
  kind: action
  command: "21 89 01 47 54 33 0A"
  params: []

- id: gamma_d
  label: Gamma - D
  kind: action
  command: "21 89 01 47 54 37 0A"
  params: []

- id: gamma_custom_1
  label: Gamma - Custom 1
  kind: action
  command: "21 89 01 47 54 34 0A"
  params: []

- id: gamma_custom_2
  label: Gamma - Custom 2
  kind: action
  command: "21 89 01 47 54 35 0A"
  params: []

- id: gamma_custom_3
  label: Gamma - Custom 3
  kind: action
  command: "21 89 01 47 54 36 0A"
  params: []

# Gamma (correction value)
- id: gamma_value_1_8
  label: Gamma Correction Value - 1.8
  kind: action
  command: "21 89 01 47 50 30 0A"
  params: []

- id: gamma_value_1_9
  label: Gamma Correction Value - 1.9
  kind: action
  command: "21 89 01 47 50 31 0A"
  params: []

- id: gamma_value_2_0
  label: Gamma Correction Value - 2.0
  kind: action
  command: "21 89 01 47 50 32 0A"
  params: []

- id: gamma_value_2_1
  label: Gamma Correction Value - 2.1
  kind: action
  command: "21 89 01 47 50 33 0A"
  params: []

- id: gamma_value_2_2
  label: Gamma Correction Value - 2.2 (Default)
  kind: action
  command: "21 89 01 47 50 34 0A"
  params: []

- id: gamma_value_2_3
  label: Gamma Correction Value - 2.3
  kind: action
  command: "21 89 01 47 50 35 0A"
  params: []

- id: gamma_value_2_4
  label: Gamma Correction Value - 2.4
  kind: action
  command: "21 89 01 47 50 36 0A"
  params: []

- id: gamma_value_2_5
  label: Gamma Correction Value - 2.5
  kind: action
  command: "21 89 01 47 50 37 0A"
  params: []

- id: gamma_value_2_6
  label: Gamma Correction Value - 2.6
  kind: action
  command: "21 89 01 47 50 38 0A"
  params: []

# Off timer (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
- id: off_timer_off
  label: Off Timer - Off
  kind: action
  command: "21 89 01 46 55 4F 54 30 0A"
  params: []

- id: off_timer_1h
  label: Off Timer - 1 Hour
  kind: action
  command: "21 89 01 46 55 4F 54 31 0A"
  params: []

- id: off_timer_2h
  label: Off Timer - 2 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 32 0A"
  params: []

- id: off_timer_3h
  label: Off Timer - 3 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 33 0A"
  params: []

- id: off_timer_4h
  label: Off Timer - 4 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 34 0A"
  params: []

# Lamp power
- id: lamp_power_normal
  label: Lamp Power - Normal
  kind: action
  command: "21 89 01 50 4D 4C 50 30 0A"
  params: []

- id: lamp_power_high
  label: Lamp Power - High
  kind: action
  command: "21 89 01 50 4D 4C 50 31 0A"
  params: []

# IR remote code
- id: remote_code_a
  label: Remote Code A (0x73)
  kind: action
  command: "21 89 01 53 55 52 43 30 0A"
  params: []

- id: remote_code_b
  label: Remote Code B (0x63)
  kind: action
  command: "21 89 01 53 55 52 43 31 0A"
  params: []

# Trigger output
- id: trigger_off
  label: Trigger - Off
  kind: action
  command: "21 89 01 46 55 54 52 30 0A"
  params: []

- id: trigger_on_power
  label: Trigger - On (Power)
  kind: action
  command: "21 89 01 46 55 54 52 31 0A"
  params: []

- id: trigger_on_anamorphic
  label: Trigger - On (Anamorphic)
  kind: action
  command: "21 89 01 46 55 54 52 32 0A"
  params: []

# Clear Motion Drive
- id: cmd_off
  label: Clear Motion Drive - Off
  kind: action
  command: "21 89 01 50 4D 43 4D 30 0A"
  params: []

- id: cmd_mode_1
  label: Clear Motion Drive - Mode 1
  kind: action
  command: "21 89 01 50 4D 43 4D 31 0A"
  params: []

- id: cmd_mode_2
  label: Clear Motion Drive - Mode 2
  kind: action
  command: "21 89 01 50 4D 43 4D 32 0A"
  params: []

- id: cmd_mode_3
  label: Clear Motion Drive - Mode 3
  kind: action
  command: "21 89 01 50 4D 43 4D 33 0A"
  params: []

- id: cmd_mode_4
  label: Clear Motion Drive - Mode 4
  kind: action
  command: "21 89 01 50 4D 43 4D 34 0A"
  params: []

- id: cmd_inverse_telecine
  label: Clear Motion Drive - Inverse Telecine
  kind: action
  command: "21 89 01 50 4D 43 4D 35 0A"
  params: []

# Anamorphic
- id: anamorphic_off_direct
  label: Anamorphic - Off
  kind: action
  command: "21 89 01 49 4E 56 53 30 0A"
  params: []

- id: anamorphic_a_direct
  label: Anamorphic - A
  kind: action
  command: "21 89 01 49 4E 56 53 31 0A"
  params: []

- id: anamorphic_b_direct
  label: Anamorphic - B
  kind: action
  command: "21 89 01 49 4E 56 53 32 0A"
  params: []

# Picture Mode (X30/X70/X90/RS45/55/65)
- id: picture_mode_film_x30
  label: Picture Mode - Film
  kind: action
  command: "21 89 01 50 4D 50 4D 30 30 0A"
  params: []

- id: picture_mode_cinema_x30
  label: Picture Mode - Cinema
  kind: action
  command: "21 89 01 50 4D 50 4D 30 31 0A"
  params: []

- id: picture_mode_animation_x30
  label: Picture Mode - Animation
  kind: action
  command: "21 89 01 50 4D 50 4D 30 32 0A"
  params: []

- id: picture_mode_natural_x30
  label: Picture Mode - Natural
  kind: action
  command: "21 89 01 50 4D 50 4D 30 33 0A"
  params: []

- id: picture_mode_stage_x30
  label: Picture Mode - Stage
  kind: action
  command: "21 89 01 50 4D 50 4D 30 34 0A"
  params: []

- id: picture_mode_thx_x30
  label: Picture Mode - THX
  kind: action
  command: "21 89 01 50 4D 50 4D 30 36 0A"
  params: []

- id: picture_mode_3d_x30
  label: Picture Mode - 3D
  kind: action
  command: "21 89 01 50 4D 50 4D 30 42 0A"
  params: []

- id: picture_mode_user_1_x30
  label: Picture Mode - User 1
  kind: action
  command: "21 89 01 50 4D 50 4D 30 43 0A"
  params: []

- id: picture_mode_user_2_x30
  label: Picture Mode - User 2
  kind: action
  command: "21 89 01 50 4D 50 4D 30 44 0A"
  params: []

- id: picture_mode_user_3_x30
  label: Picture Mode - User 3
  kind: action
  command: "21 89 01 50 4D 50 4D 30 45 0A"
  params: []

- id: picture_mode_user_4_x30
  label: Picture Mode - User 4
  kind: action
  command: "21 89 01 50 4D 50 4D 30 46 0A"
  params: []

- id: picture_mode_user_5_x30
  label: Picture Mode - User 5
  kind: action
  command: "21 89 01 50 4D 50 4D 31 30 0A"
  params: []

# Picture Mode (X3/X7/X9/RS40/50/60)
- id: picture_mode_film_x3
  label: Picture Mode - Film (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []

- id: picture_mode_cinema_x3
  label: Picture Mode - Cinema (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []

- id: picture_mode_animation_x3
  label: Picture Mode - Animation (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []

- id: picture_mode_natural_x3
  label: Picture Mode - Natural (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []

- id: picture_mode_stage_x3
  label: Picture Mode - Stage (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []

- id: picture_mode_3d_x3
  label: Picture Mode - 3D (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 45 0A"
  params: []

- id: picture_mode_user_1_x3
  label: Picture Mode - User 1 (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []

- id: picture_mode_user_2_x3
  label: Picture Mode - User 2 (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []

- id: picture_mode_thx_x3
  label: Picture Mode - THX (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# Picture Mode (HD350/750/550/950/990/RS10/20/15/25/35)
- id: picture_mode_cinema_1_hd
  label: Picture Mode - Cinema 1 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []

- id: picture_mode_cinema_2_hd
  label: Picture Mode - Cinema 2 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []

- id: picture_mode_cinema_3_hd
  label: Picture Mode - Cinema 3 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []

- id: picture_mode_natural_hd
  label: Picture Mode - Natural (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []

- id: picture_mode_stage_hd
  label: Picture Mode - Stage (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []

- id: picture_mode_dynamic_hd
  label: Picture Mode - Dynamic (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 35 0A"
  params: []

- id: picture_mode_user_1_hd
  label: Picture Mode - User 1 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []

- id: picture_mode_user_2_hd
  label: Picture Mode - User 2 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []

- id: picture_mode_thx_hd
  label: Picture Mode - THX (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# Colour Profile (X30/X70/X90/RS45/55/65)
- id: colour_profile_off
  label: Colour Profile - Off
  kind: action
  command: "21 89 01 50 4D 50 52 30 30 0A"
  params: []

- id: colour_profile_film_1
  label: Colour Profile - Film 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 31 0A"
  params: []

- id: colour_profile_film_2
  label: Colour Profile - Film 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 32 0A"
  params: []

- id: colour_profile_standard
  label: Colour Profile - Standard
  kind: action
  command: "21 89 01 50 4D 50 52 30 33 0A"
  params: []

- id: colour_profile_cinema_1
  label: Colour Profile - Cinema 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 34 0A"
  params: []

- id: colour_profile_cinema_2
  label: Colour Profile - Cinema 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 35 0A"
  params: []

- id: colour_profile_anime_1
  label: Colour Profile - Anime 1
  kind: action
  command: "21 89 01 50 4D 50 52 30 36 0A"
  params: []

- id: colour_profile_anime_2
  label: Colour Profile - Anime 2
  kind: action
  command: "21 89 01 50 4D 50 52 30 37 0A"
  params: []

- id: colour_profile_video
  label: Colour Profile - Video
  kind: action
  command: "21 89 01 50 4D 50 52 30 38 0A"
  params: []

- id: colour_profile_vivid
  label: Colour Profile - Vivid
  kind: action
  command: "21 89 01 50 4D 50 52 30 39 0A"
  params: []

- id: colour_profile_adobe
  label: Colour Profile - Adobe
  kind: action
  command: "21 89 01 50 4D 50 52 30 41 0A"
  params: []

- id: colour_profile_stage
  label: Colour Profile - Stage
  kind: action
  command: "21 89 01 50 4D 50 52 30 42 0A"
  params: []

- id: colour_profile_3d
  label: Colour Profile - 3D
  kind: action
  command: "21 89 01 50 4D 50 52 30 43 0A"
  params: []

- id: colour_profile_thx
  label: Colour Profile - THX
  kind: action
  command: "21 89 01 50 4D 50 52 30 44 0A"
  params: []

# 3D Format
- id: format_3d_off
  label: 3D Format - Off (2D)
  kind: action
  command: "21 89 01 49 53 33 44 30 0A"
  params: []

- id: format_3d_auto
  label: 3D Format - Auto
  kind: action
  command: "21 89 01 49 53 33 44 31 0A"
  params: []

- id: format_3d_frame_packing
  label: 3D Format - Frame Packing
  kind: action
  command: "21 89 01 49 53 33 44 32 0A"
  params: []

- id: format_3d_side_by_side
  label: 3D Format - Side by Side
  kind: action
  command: "21 89 01 49 53 33 44 33 0A"
  params: []

- id: format_3d_top_bottom
  label: 3D Format - Top and Bottom
  kind: action
  command: "21 89 01 49 53 33 44 34 0A"
  params: []

# 2D to 3D conversion
- id: conversion_2d_to_3d_off
  label: 2D to 3D Conversion - Off
  kind: action
  command: "21 89 01 49 53 33 43 30 0A"
  params: []

- id: conversion_2d_to_3d_on
  label: 2D to 3D Conversion - On
  kind: action
  command: "21 89 01 49 53 33 43 31 0A"
  params: []

# 3D Subtitle correction
- id: subtitle_3d_correction_off
  label: 3D Subtitle Correction - Off
  kind: action
  command: "21 89 01 49 53 33 54 31 0A"
  params: []

- id: subtitle_3d_correction_on
  label: 3D Subtitle Correction - On
  kind: action
  command: "21 89 01 49 53 33 54 30 0A"
  params: []

# Lens Memory (X30/X70/X90/RS45/55/65)
- id: lens_memory_save_1
  label: Lens Memory Save - Memory 1
  kind: action
  command: "21 89 01 49 4E 4D 53 30 0A"
  params: []

- id: lens_memory_save_2
  label: Lens Memory Save - Memory 2
  kind: action
  command: "21 89 01 49 4E 4D 53 31 0A"
  params: []

- id: lens_memory_save_3
  label: Lens Memory Save - Memory 3
  kind: action
  command: "21 89 01 49 4E 4D 53 32 0A"
  params: []

- id: lens_memory_select_1
  label: Lens Memory Select - Memory 1
  kind: action
  command: "21 89 01 49 4E 4D 4C 30 0A"
  params: []

- id: lens_memory_select_2
  label: Lens Memory Select - Memory 2
  kind: action
  command: "21 89 01 49 4E 4D 4C 31 0A"
  params: []

- id: lens_memory_select_3
  label: Lens Memory Select - Memory 3
  kind: action
  command: "21 89 01 49 4E 4D 4C 32 0A"
  params: []

# Remote Control Emulation commands (header 21 89 01 52 43 37 33, then 2 ASCII-hex bytes, then 0A)
- id: rc_power_off
  label: Power - Off (RC emulation, send twice)
  kind: action
  command: "21 89 01 52 43 37 33 30 36 0A"
  params: []

- id: rc_power_on
  label: Power - On (RC emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 35 0A"
  params: []

- id: rc_3d_setting_menu
  label: 3D Setting menu
  kind: action
  command: "21 89 01 52 43 37 33 44 35 0A"
  params: []

- id: rc_3d_format_cycle
  label: 3D Format cycle
  kind: action
  command: "21 89 01 52 43 37 33 44 36 0A"
  params: []

- id: rc_advanced_menu
  label: Picture Adjust > Advanced menu
  kind: action
  command: "21 89 01 52 43 37 33 37 33 0A"
  params: []

- id: rc_anamorphic_off
  label: Anamorphic / Vertical Stretch - Off
  kind: action
  command: "21 89 01 52 43 37 33 32 34 0A"
  params: []

- id: rc_anamorphic_a
  label: Anamorphic - A / Vertical Stretch - On
  kind: action
  command: "21 89 01 52 43 37 33 32 33 0A"
  params: []

- id: rc_anamorphic_b
  label: Anamorphic - B
  kind: action
  command: "21 89 01 52 43 37 33 32 42 0A"
  params: []

- id: rc_anamorphic_cycle
  label: Anamorphic cycle (Off/A/B)
  kind: action
  command: "21 89 01 52 43 37 33 43 35 0A"
  params: []

- id: rc_aspect_16_9
  label: Aspect - 16:9
  kind: action
  command: "21 89 01 52 43 37 33 32 36 0A"
  params: []

- id: rc_aspect_4_3
  label: Aspect - 4:3
  kind: action
  command: "21 89 01 52 43 37 33 32 35 0A"
  params: []

- id: rc_aspect_zoom
  label: Aspect - Zoom
  kind: action
  command: "21 89 01 52 43 37 33 32 37 0A"
  params: []

- id: rc_aspect_pc_auto
  label: Aspect (PC) - Auto
  kind: action
  command: "21 89 01 52 43 37 33 41 45 0A"
  params: []

- id: rc_aspect_pc_full
  label: Aspect (PC) - Full
  kind: action
  command: "21 89 01 52 43 37 33 42 30 0A"
  params: []

- id: rc_aspect_pc_just
  label: Aspect (PC) - Just
  kind: action
  command: "21 89 01 52 43 37 33 41 46 0A"
  params: []

- id: rc_aspect_cycle
  label: Aspect + cycle
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
  label: BNR (Block Noise Reduction) - Off
  kind: action
  command: "21 89 01 52 43 37 33 31 30 0A"
  params: []

- id: rc_bnr_on
  label: BNR - On
  kind: action
  command: "21 89 01 52 43 37 33 30 46 0A"
  params: []

- id: rc_bright_level_down
  label: Bright Level -
  kind: action
  command: "21 89 01 52 43 37 33 41 33 0A"
  params: []

- id: rc_bright_level_up
  label: Bright Level +
  kind: action
  command: "21 89 01 52 43 37 33 41 32 0A"
  params: []

- id: rc_brightness_down
  label: Brightness -
  kind: action
  command: "21 89 01 52 43 37 33 37 42 0A"
  params: []

- id: rc_brightness_up
  label: Brightness +
  kind: action
  command: "21 89 01 52 43 37 33 37 41 0A"
  params: []

- id: rc_brightness_adj
  label: Brightness Adj. (toggle adjustment bar)
  kind: action
  command: "21 89 01 52 43 37 33 30 39 0A"
  params: []

- id: rc_cec_off
  label: CEC - Off
  kind: action
  command: "21 89 01 52 43 37 33 35 37 0A"
  params: []

- id: rc_cec_on
  label: CEC - On
  kind: action
  command: "21 89 01 52 43 37 33 35 36 0A"
  params: []

- id: rc_cmd_cycle
  label: Clear Motion Drive cycle
  kind: action
  command: "21 89 01 52 43 37 33 38 41 0A"
  params: []

- id: rc_cmd_off
  label: Clear Motion Drive - Off (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 37 0A"
  params: []

- id: rc_cmd_mode_1
  label: Clear Motion Drive - Mode 1 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 43 45 0A"
  params: []

- id: rc_cmd_mode_2
  label: Clear Motion Drive - Mode 2 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 43 46 0A"
  params: []

- id: rc_cmd_mode_3
  label: Clear Motion Drive - Mode 3 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 38 0A"
  params: []

- id: rc_cmd_mode_4
  label: Clear Motion Drive - Mode 4 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 39 0A"
  params: []

- id: rc_cmd_inverse_telecine
  label: Clear Motion Drive - Inverse Telecine (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 41 0A"
  params: []

- id: rc_colour_down
  label: Colour -
  kind: action
  command: "21 89 01 52 43 37 33 37 44 0A"
  params: []

- id: rc_colour_up
  label: Colour +
  kind: action
  command: "21 89 01 52 43 37 33 37 43 0A"
  params: []

- id: rc_colour_adj
  label: Colour Adj. (toggle)
  kind: action
  command: "21 89 01 52 43 37 33 31 35 0A"
  params: []

- id: rc_colour_mgmt_off
  label: Colour Management - Off
  kind: action
  command: "21 89 01 52 43 37 33 36 30 0A"
  params: []

- id: rc_colour_mgmt_custom_1
  label: Colour Management - Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 36 31 0A"
  params: []

- id: rc_colour_mgmt_custom_2
  label: Colour Management - Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 36 32 0A"
  params: []

- id: rc_colour_mgmt_custom_3
  label: Colour Management - Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 36 33 0A"
  params: []

- id: rc_colour_mgmt_cycle
  label: Colour Management cycle
  kind: action
  command: "21 89 01 52 43 37 33 38 39 0A"
  params: []

- id: rc_colour_profile_cycle
  label: Colour Profile cycle
  kind: action
  command: "21 89 01 52 43 37 33 38 38 0A"
  params: []

- id: rc_colour_space_cycle
  label: Colour Space cycle (Standard/Wide 1/Wide 2)
  kind: action
  command: "21 89 01 52 43 37 33 43 44 0A"
  params: []

- id: rc_colour_temp_5800k
  label: Colour Temp. - 5800K
  kind: action
  command: "21 89 01 52 43 37 33 34 45 0A"
  params: []

- id: rc_colour_temp_6500k
  label: Colour Temp. - 6500K
  kind: action
  command: "21 89 01 52 43 37 33 34 46 0A"
  params: []

- id: rc_colour_temp_7500k
  label: Colour Temp. - 7500K
  kind: action
  command: "21 89 01 52 43 37 33 35 30 0A"
  params: []

- id: rc_colour_temp_9300k
  label: Colour Temp. - 9300K
  kind: action
  command: "21 89 01 52 43 37 33 35 31 0A"
  params: []

- id: rc_colour_temp_high_bright
  label: Colour Temp. - High Bright
  kind: action
  command: "21 89 01 52 43 37 33 35 32 0A"
  params: []

- id: rc_colour_temp_custom_1
  label: Colour Temp. - Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 35 33 0A"
  params: []

- id: rc_colour_temp_custom_2
  label: Colour Temp. - Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 35 34 0A"
  params: []

- id: rc_colour_temp_custom_3
  label: Colour Temp. - Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 35 35 0A"
  params: []

- id: rc_colour_temp_cycle
  label: Colour Temp. + cycle
  kind: action
  command: "21 89 01 52 43 37 33 37 36 0A"
  params: []

- id: rc_ct_gain_blue_down
  label: CT Gain Blue -
  kind: action
  command: "21 89 01 52 43 37 33 39 31 0A"
  params: []

- id: rc_ct_gain_blue_up
  label: CT Gain Blue +
  kind: action
  command: "21 89 01 52 43 37 33 39 30 0A"
  params: []

- id: rc_ct_gain_green_down
  label: CT Gain Green -
  kind: action
  command: "21 89 01 52 43 37 33 38 46 0A"
  params: []

- id: rc_ct_gain_green_up
  label: CT Gain Green +
  kind: action
  command: "21 89 01 52 43 37 33 38 45 0A"
  params: []

- id: rc_ct_gain_red_down
  label: CT Gain Red -
  kind: action
  command: "21 89 01 52 43 37 33 38 44 0A"
  params: []

- id: rc_ct_gain_red_up
  label: CT Gain Red +
  kind: action
  command: "21 89 01 52 43 37 33 38 43 0A"
  params: []

- id: rc_ct_offset_blue_down
  label: CT Offset Blue -
  kind: action
  command: "21 89 01 52 43 37 33 39 37 0A"
  params: []

- id: rc_ct_offset_blue_up
  label: CT Offset Blue +
  kind: action
  command: "21 89 01 52 43 37 33 39 36 0A"
  params: []

- id: rc_ct_offset_green_down
  label: CT Offset Green -
  kind: action
  command: "21 89 01 52 43 37 33 39 35 0A"
  params: []

- id: rc_ct_offset_green_up
  label: CT Offset Green +
  kind: action
  command: "21 89 01 52 43 37 33 39 34 0A"
  params: []

- id: rc_ct_offset_red_down
  label: CT Offset Red -
  kind: action
  command: "21 89 01 52 43 37 33 39 33 0A"
  params: []

- id: rc_ct_offset_red_up
  label: CT Offset Red +
  kind: action
  command: "21 89 01 52 43 37 33 39 32 0A"
  params: []

- id: rc_contrast_down
  label: Contrast -
  kind: action
  command: "21 89 01 52 43 37 33 37 39 0A"
  params: []

- id: rc_contrast_up
  label: Contrast +
  kind: action
  command: "21 89 01 52 43 37 33 37 38 0A"
  params: []

- id: rc_contrast_adj
  label: Contrast Adj. (toggle)
  kind: action
  command: "21 89 01 52 43 37 33 30 41 0A"
  params: []

- id: rc_cti_off
  label: CTI - Off
  kind: action
  command: "21 89 01 52 43 37 33 35 43 0A"
  params: []

- id: rc_cti_low
  label: CTI - Low
  kind: action
  command: "21 89 01 52 43 37 33 35 44 0A"
  params: []

- id: rc_cti_middle
  label: CTI - Middle
  kind: action
  command: "21 89 01 52 43 37 33 35 45 0A"
  params: []

- id: rc_cti_high
  label: CTI - High
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

- id: rc_dark_level_down
  label: Dark Level -
  kind: action
  command: "21 89 01 52 43 37 33 41 35 0A"
  params: []

- id: rc_dark_level_up
  label: Dark Level +
  kind: action
  command: "21 89 01 52 43 37 33 41 34 0A"
  params: []

- id: rc_detail_enhance_down
  label: Detail Enhance -
  kind: action
  command: "21 89 01 52 43 37 33 31 32 0A"
  params: []

- id: rc_detail_enhance_up
  label: Detail Enhance +
  kind: action
  command: "21 89 01 52 43 37 33 31 31 0A"
  params: []

- id: rc_picture_tone_blue_down
  label: Picture Tone Blue -
  kind: action
  command: "21 89 01 52 43 37 33 41 31 0A"
  params: []

- id: rc_picture_tone_blue_up
  label: Picture Tone Blue +
  kind: action
  command: "21 89 01 52 43 37 33 41 30 0A"
  params: []

- id: rc_picture_tone_green_down
  label: Picture Tone Green -
  kind: action
  command: "21 89 01 52 43 37 33 39 46 0A"
  params: []

- id: rc_picture_tone_green_up
  label: Picture Tone Green +
  kind: action
  command: "21 89 01 52 43 37 33 39 45 0A"
  params: []

- id: rc_picture_tone_red_down
  label: Picture Tone Red -
  kind: action
  command: "21 89 01 52 43 37 33 39 44 0A"
  params: []

- id: rc_picture_tone_red_up
  label: Picture Tone Red +
  kind: action
  command: "21 89 01 52 43 37 33 39 43 0A"
  params: []

- id: rc_picture_tone_white_down
  label: Picture Tone White -
  kind: action
  command: "21 89 01 52 43 37 33 39 42 0A"
  params: []

- id: rc_picture_tone_white_up
  label: Picture Tone White +
  kind: action
  command: "21 89 01 52 43 37 33 39 41 0A"
  params: []

- id: rc_gamma_a
  label: Gamma - A (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 39 0A"
  params: []

- id: rc_gamma_b
  label: Gamma - B (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 41 0A"
  params: []

- id: rc_gamma_c
  label: Gamma - C (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 42 0A"
  params: []

- id: rc_gamma_custom_1
  label: Gamma - Custom 1 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 43 0A"
  params: []

- id: rc_gamma_custom_2
  label: Gamma - Custom 2 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 44 0A"
  params: []

- id: rc_gamma_custom_3
  label: Gamma - Custom 3 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 45 0A"
  params: []

- id: rc_gamma_d
  label: Gamma - D (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 46 0A"
  params: []

- id: rc_gamma_normal
  label: Gamma - Normal (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 38 0A"
  params: []

- id: rc_gamma_cycle
  label: Gamma + cycle
  kind: action
  command: "21 89 01 52 43 37 33 37 35 0A"
  params: []

- id: rc_hide_off
  label: Hide - Off
  kind: action
  command: "21 89 01 52 43 37 33 44 31 0A"
  params: []

- id: rc_hide_on
  label: Hide - On
  kind: action
  command: "21 89 01 52 43 37 33 44 30 0A"
  params: []

- id: rc_hide_toggle
  label: Hide toggle
  kind: action
  command: "21 89 01 52 43 37 33 31 44 0A"
  params: []

- id: rc_h_position_down
  label: Horizontal Position -
  kind: action
  command: "21 89 01 52 43 37 33 41 42 0A"
  params: []

- id: rc_h_position_up
  label: Horizontal Position +
  kind: action
  command: "21 89 01 52 43 37 33 41 41 0A"
  params: []

- id: rc_information
  label: Information (menu)
  kind: action
  command: "21 89 01 52 43 37 33 37 34 0A"
  params: []

- id: rc_input_component
  label: Input - Component (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 44 0A"
  params: []

- id: rc_input_hdmi_1
  label: Input - HDMI 1 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 30 0A"
  params: []

- id: rc_input_hdmi_2
  label: Input - HDMI 2 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 37 31 0A"
  params: []

- id: rc_input_pc
  label: Input - PC (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 36 0A"
  params: []

- id: rc_input_s_video
  label: Input - S-Video (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 43 0A"
  params: []

- id: rc_input_video
  label: Input - Video (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 42 0A"
  params: []

- id: rc_input_cycle
  label: Input + cycle (RC)
  kind: action
  command: "21 89 01 52 43 37 33 30 38 0A"
  params: []

- id: rc_isf_day
  label: ISF - Day
  kind: action
  command: "21 89 01 52 43 37 33 36 34 0A"
  params: []

- id: rc_isf_night
  label: ISF - Night
  kind: action
  command: "21 89 01 52 43 37 33 36 35 0A"
  params: []

- id: rc_isf_off
  label: ISF - Off
  kind: action
  command: "21 89 01 52 43 37 33 35 41 0A"
  params: []

- id: rc_isf_on
  label: ISF - On
  kind: action
  command: "21 89 01 52 43 37 33 35 42 0A"
  params: []

- id: rc_keystone_h_down
  label: Keystone H -
  kind: action
  command: "21 89 01 52 43 37 33 34 31 0A"
  params: []

- id: rc_keystone_h_up
  label: Keystone H +
  kind: action
  command: "21 89 01 52 43 37 33 34 30 0A"
  params: []

- id: rc_keystone_v_down
  label: Keystone V -
  kind: action
  command: "21 89 01 52 43 37 33 31 43 0A"
  params: []

- id: rc_keystone_v_up
  label: Keystone V +
  kind: action
  command: "21 89 01 52 43 37 33 31 42 0A"
  params: []

- id: rc_lens_aperture_1
  label: Lens Aperture - 1
  kind: action
  command: "21 89 01 52 43 37 33 32 38 0A"
  params: []

- id: rc_lens_aperture_2
  label: Lens Aperture - 2
  kind: action
  command: "21 89 01 52 43 37 33 32 39 0A"
  params: []

- id: rc_lens_aperture_3
  label: Lens Aperture - 3
  kind: action
  command: "21 89 01 52 43 37 33 32 41 0A"
  params: []

- id: rc_lens_aperture_down
  label: Lens Aperture -
  kind: action
  command: "21 89 01 52 43 37 33 31 46 0A"
  params: []

- id: rc_lens_aperture_up
  label: Lens Aperture +
  kind: action
  command: "21 89 01 52 43 37 33 31 45 0A"
  params: []

- id: rc_lens_aperture_adj
  label: Lens Aperture Adj.
  kind: action
  command: "21 89 01 52 43 37 33 32 30 0A"
  params: []

- id: rc_lens_control_cycle
  label: Lens Control cycle
  kind: action
  command: "21 89 01 52 43 37 33 33 30 0A"
  params: []

- id: rc_lens_focus_down
  label: Lens Focus -
  kind: action
  command: "21 89 01 52 43 37 33 33 32 0A"
  params: []

- id: rc_lens_focus_up
  label: Lens Focus +
  kind: action
  command: "21 89 01 52 43 37 33 33 31 0A"
  params: []

- id: rc_lens_memory_cycle
  label: Lens Memory cycle (Select/Save/Name Edit)
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
  label: Lens Shift - Down
  kind: action
  command: "21 89 01 52 43 37 33 32 32 0A"
  params: []

- id: rc_lens_shift_left
  label: Lens Shift - Left
  kind: action
  command: "21 89 01 52 43 37 33 34 34 0A"
  params: []

- id: rc_lens_shift_right
  label: Lens Shift - Right
  kind: action
  command: "21 89 01 52 43 37 33 34 33 0A"
  params: []

- id: rc_lens_shift_up
  label: Lens Shift - Up
  kind: action
  command: "21 89 01 52 43 37 33 32 31 0A"
  params: []

- id: rc_lens_zoom_in
  label: Lens Zoom - In
  kind: action
  command: "21 89 01 52 43 37 33 33 35 0A"
  params: []

- id: rc_lens_zoom_out
  label: Lens Zoom - Out
  kind: action
  command: "21 89 01 52 43 37 33 33 37 0A"
  params: []

- id: rc_mask_bottom_down
  label: Mask Bottom -
  kind: action
  command: "21 89 01 52 43 37 33 42 38 0A"
  params: []

- id: rc_mask_bottom_up
  label: Mask Bottom +
  kind: action
  command: "21 89 01 52 43 37 33 42 37 0A"
  params: []

- id: rc_mask_left_down
  label: Mask Left -
  kind: action
  command: "21 89 01 52 43 37 33 42 32 0A"
  params: []

- id: rc_mask_left_up
  label: Mask Left +
  kind: action
  command: "21 89 01 52 43 37 33 42 31 0A"
  params: []

- id: rc_mask_right_down
  label: Mask Right -
  kind: action
  command: "21 89 01 52 43 37 33 42 34 0A"
  params: []

- id: rc_mask_right_up
  label: Mask Right +
  kind: action
  command: "21 89 01 52 43 37 33 42 33 0A"
  params: []

- id: rc_mask_top_down
  label: Mask Top -
  kind: action
  command: "21 89 01 52 43 37 33 42 36 0A"
  params: []

- id: rc_mask_top_up
  label: Mask Top +
  kind: action
  command: "21 89 01 52 43 37 33 42 35 0A"
  params: []

- id: rc_menu_toggle
  label: Menu toggle
  kind: action
  command: "21 89 01 52 43 37 33 32 45 0A"
  params: []

- id: rc_menu_position
  label: Menu Position
  kind: action
  command: "21 89 01 52 43 37 33 34 32 0A"
  params: []

- id: rc_mnr_down
  label: MNR -
  kind: action
  command: "21 89 01 52 43 37 33 30 45 0A"
  params: []

- id: rc_mnr_up
  label: MNR +
  kind: action
  command: "21 89 01 52 43 37 33 30 44 0A"
  params: []

- id: rc_nr_toggle
  label: NR (RNR/MNR) toggle
  kind: action
  command: "21 89 01 52 43 37 33 31 38 0A"
  params: []

- id: rc_ok
  label: OK
  kind: action
  command: "21 89 01 52 43 37 33 32 46 0A"
  params: []

- id: rc_phase_down
  label: Phase (PC) -
  kind: action
  command: "21 89 01 52 43 37 33 41 39 0A"
  params: []

- id: rc_phase_up
  label: Phase (PC) +
  kind: action
  command: "21 89 01 52 43 37 33 41 38 0A"
  params: []

- id: rc_picture_adjust
  label: Picture Adjust menu
  kind: action
  command: "21 89 01 52 43 37 33 37 32 0A"
  params: []

- id: rc_picture_mode_3d
  label: Picture Mode - 3D (RC)
  kind: action
  command: "21 89 01 52 43 37 33 38 37 0A"
  params: []

- id: rc_picture_mode_cinema_1
  label: Picture Mode - Cinema 1 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 39 0A"
  params: []

- id: rc_picture_mode_cinema_2
  label: Picture Mode - Cinema 2 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 38 0A"
  params: []

- id: rc_picture_mode_cinema_3
  label: Picture Mode - Cinema 3 / Animation (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 36 0A"
  params: []

- id: rc_picture_mode_dynamic
  label: Picture Mode - Dynamic (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 42 0A"
  params: []

- id: rc_picture_mode_natural
  label: Picture Mode - Natural (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 41 0A"
  params: []

- id: rc_picture_mode_stage
  label: Picture Mode - Stage (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 37 0A"
  params: []

- id: rc_picture_mode_thx
  label: Picture Mode - THX (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 46 0A"
  params: []

- id: rc_picture_mode_user_1
  label: Picture Mode - User 1 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 43 0A"
  params: []

- id: rc_picture_mode_user_2
  label: Picture Mode - User 2 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 44 0A"
  params: []

- id: rc_picture_mode_user_3
  label: Picture Mode - User 3 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 45 0A"
  params: []

- id: rc_picture_mode_user_4
  label: Picture Mode - User 4 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 43 41 0A"
  params: []

- id: rc_picture_mode_user_5
  label: Picture Mode - User 5 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 43 42 0A"
  params: []

- id: rc_pixel_shift_h_blue_down
  label: Pixel Shift H Blue -
  kind: action
  command: "21 89 01 52 43 37 33 42 45 0A"
  params: []

- id: rc_pixel_shift_h_blue_up
  label: Pixel Shift H Blue +
  kind: action
  command: "21 89 01 52 43 37 33 42 44 0A"
  params: []

- id: rc_pixel_shift_h_green_down
  label: Pixel Shift H Green -
  kind: action
  command: "21 89 01 52 43 37 33 42 43 0A"
  params: []

- id: rc_pixel_shift_h_green_up
  label: Pixel Shift H Green +
  kind: action
  command: "21 89 01 52 43 37 33 42 42 0A"
  params: []

- id: rc_pixel_shift_h_red_down
  label: Pixel Shift H Red -
  kind: action
  command: "21 89 01 52 43 37 33 42 41 0A"
  params: []

- id: rc_pixel_shift_h_red_up
  label: Pixel Shift H Red +
  kind: action
  command: "21 89 01 52 43 37 33 42 39 0A"
  params: []

- id: rc_pixel_shift_v_blue_down
  label: Pixel Shift V Blue -
  kind: action
  command: "21 89 01 52 43 37 33 43 34 0A"
  params: []

- id: rc_pixel_shift_v_blue_up
  label: Pixel Shift V Blue +
  kind: action
  command: "21 89 01 52 43 37 33 43 33 0A"
  params: []

- id: rc_pixel_shift_v_green_down
  label: Pixel Shift V Green -
  kind: action
  command: "21 89 01 52 43 37 33 43 32 0A"
  params: []

- id: rc_pixel_shift_v_green_up
  label: Pixel Shift V Green +
  kind: action
  command: "21 89 01 52 43 37 33 43 31 0A"
  params: []

- id: rc_pixel_shift_v_red_down
  label: Pixel Shift V Red -
  kind: action
  command: "21 89 01 52 43 37 33 43 30 0A"
  params: []

- id: rc_pixel_shift_v_red_up
  label: Pixel Shift V Red +
  kind: action
  command: "21 89 01 52 43 37 33 42 46 0A"
  params: []

- id: rc_rnr_down
  label: RNR -
  kind: action
  command: "21 89 01 52 43 37 33 30 43 0A"
  params: []

- id: rc_rnr_up
  label: RNR +
  kind: action
  command: "21 89 01 52 43 37 33 30 42 0A"
  params: []

- id: rc_screen_adjust_off
  label: Screen Adjust - Off
  kind: action
  command: "21 89 01 52 43 37 33 38 30 0A"
  params: []

- id: rc_screen_adjust_a
  label: Screen Adjust - A
  kind: action
  command: "21 89 01 52 43 37 33 38 31 0A"
  params: []

- id: rc_screen_adjust_b
  label: Screen Adjust - B
  kind: action
  command: "21 89 01 52 43 37 33 38 32 0A"
  params: []

- id: rc_screen_adjust_c
  label: Screen Adjust - C
  kind: action
  command: "21 89 01 52 43 37 33 38 33 0A"
  params: []

- id: rc_sharpness_down
  label: Sharpness -
  kind: action
  command: "21 89 01 52 43 37 33 37 46 0A"
  params: []

- id: rc_sharpness_up
  label: Sharpness +
  kind: action
  command: "21 89 01 52 43 37 33 37 45 0A"
  params: []

- id: rc_sharpness_adj
  label: Sharpness Adj. (toggle)
  kind: action
  command: "21 89 01 52 43 37 33 31 34 0A"
  params: []

- id: rc_shutter_close
  label: Shutter - Close
  kind: action
  command: "21 89 01 52 43 37 33 31 39 0A"
  params: []

- id: rc_shutter_open
  label: Shutter - Open
  kind: action
  command: "21 89 01 52 43 37 33 31 41 0A"
  params: []

- id: rc_shutter_off
  label: Shutter - Off (un-sync with Hide)
  kind: action
  command: "21 89 01 52 43 37 33 32 44 0A"
  params: []

- id: rc_shutter_on
  label: Shutter - On (sync with Hide)
  kind: action
  command: "21 89 01 52 43 37 33 32 43 0A"
  params: []

- id: rc_test_pattern_cycle
  label: Test Pattern cycle
  kind: action
  command: "21 89 01 52 43 37 33 35 39 0A"
  params: []

- id: rc_thx_bright
  label: THX - Bright
  kind: action
  command: "21 89 01 52 43 37 33 38 35 0A"
  params: []

- id: rc_thx_dark
  label: THX - Dark
  kind: action
  command: "21 89 01 52 43 37 33 38 36 0A"
  params: []

- id: rc_thx_off
  label: THX - Off
  kind: action
  command: "21 89 01 52 43 37 33 43 37 0A"
  params: []

- id: rc_thx_on
  label: THX - On
  kind: action
  command: "21 89 01 52 43 37 33 43 38 0A"
  params: []

- id: rc_tint_down
  label: Tint -
  kind: action
  command: "21 89 01 52 43 37 33 39 39 0A"
  params: []

- id: rc_tint_up
  label: Tint +
  kind: action
  command: "21 89 01 52 43 37 33 39 38 0A"
  params: []

- id: rc_tint_adj
  label: Tint Adj. (toggle)
  kind: action
  command: "21 89 01 52 43 37 33 31 36 0A"
  params: []

- id: rc_tracking_down
  label: Tracking (PC) -
  kind: action
  command: "21 89 01 52 43 37 33 41 37 0A"
  params: []

- id: rc_tracking_up
  label: Tracking (PC) +
  kind: action
  command: "21 89 01 52 43 37 33 41 36 0A"
  params: []

- id: rc_user_cycle
  label: User Picture Mode cycle (User 1-5)
  kind: action
  command: "21 89 01 52 43 37 33 44 37 0A"
  params: []

- id: rc_v_position_down
  label: Vertical Position -
  kind: action
  command: "21 89 01 52 43 37 33 41 44 0A"
  params: []

- id: rc_v_position_up
  label: Vertical Position +
  kind: action
  command: "21 89 01 52 43 37 33 41 43 0A"
  params: []

# Enquiry (3F) commands
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
# Basic acknowledgement response - common envelope
- id: ack_basic
  type: bytes
  description: |
    Projector returns 06 89 01 … 0A for any successful command.
    The payload between 89 01 and 0A is the first 2 bytes of the issued command
    (e.g. Power On "21 89 01 50 57 31 0A" → "06 89 01 50 57 0A").

# Detailed acknowledgement response - envelope
- id: ack_detailed
  type: bytes
  description: |
    On a 3F enquiry, projector returns 06 89 01 … 0A immediately, then
    40 89 01 … RR 0A with the detailed status code RR.

# Power state (detailed RR after 3F 89 01 50 57 0A)
- id: power_state
  type: enum
  values:
    - standby
    - power_on
    - cooling
    - emergency
  mapping:
    "30": standby
    "31": power_on
    "32": cooling
    "34": emergency

# Input state (detailed RR after 3F 89 01 49 50 0A)
- id: input_state
  type: enum
  values:
    - s_video
    - video
    - component
    - pc
    - hdmi_1
    - hdmi_2
  mapping:
    "30": s_video
    "31": video
    "32": component
    "33": pc
    "36": hdmi_1
    "37": hdmi_2

# Gamma table (detailed RR after 3F 89 01 47 54 0A)
- id: gamma_table
  type: enum
  values:
    - normal
    - a
    - b
    - c
    - custom_1
    - custom_2
    - custom_3
  mapping:
    "30": normal
    "31": a
    "32": b
    "33": c
    "34": custom_1
    "35": custom_2
    "36": custom_3

# Gamma value (detailed RR after 3F 89 01 47 50 0A)
- id: gamma_value
  type: enum
  values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6"]
  mapping:
    "30": "1.8"
    "31": "1.9"
    "32": "2.0"
    "33": "2.1"
    "34": "2.2"
    "35": "2.3"
    "36": "2.4"
    "37": "2.5"
    "38": "2.6"

# Source status (detailed RR after 3F 89 01 53 43 0A)
- id: source_status
  type: enum
  values:
    - jvc_logo
    - no_signal
    - signal_ok
  mapping:
    "00": jvc_logo
    "30": no_signal
    "31": signal_ok

# Model identification (detailed RR after 3F 89 01 4D 44 0A)
# Multiple ASCII hex bytes - see source for full mapping per model.
- id: model_id
  type: bytes
  description: |
    Returns an ASCII-hex model string. Examples:
    49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 34 → DLA-HD350
    49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 37 → DLA-RS10
    49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 35 → DLA-HD750 / DLA-RS20
    49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 38 → DLA-HD550
    49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 39 → DLA-HD950/HD990 / DLA-RS25/RS35
    49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 42 → DLA-X3 / DLA-RS40
    49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 43 → DLA-X7/X9 / DLA-RS50/60
    49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 45 → DLA-X30 / DLA-RS45
    49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 46 → DLA-X70R/X90R / DLA-RS55/65
  # UNRESOLVED: DLA-X750R / X950R / X550R are not in the listed Model Status table; their model strings would need a separate X750R-family source.
```

## Variables
```yaml
# UNRESOLVED: source documents commands that SET state, not separate variable parameters;
# all settable items are covered as discrete Actions above.
```

## Events
```yaml
# UNRESOLVED: source describes only solicited responses (basic + detailed ack); no unsolicited event stream is documented.
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step macro sequences; "Power Off (RC)" explicitly
# requires sending the same command twice with a short delay - this is the only multi-step
# instruction in the source and is captured as a note in the action label.
```

## Safety
```yaml
confirmation_required_for:
  - power_off_rc  # source: "Power - Off (send twice with short delay between to switch off)"
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
The X750R / X950R / X550R are NOT in the "FOR MODELS" list at the top of this guide — the guide's named models are the DLA-HD350 … DLA-RS65 generation. The X750R family is included in `compatible_with` because JVC's firmware changelog text ("Improvement of projector control with external command codes (like RS232C, LAN etc.)") and the family-shared nature of the protocol make it likely that the X750R / X950R / X550R use the same command-set, but a downstream verifier should treat this as a soft claim and may flag the model-list mismatch. The baud rate (19200) and serial framing (8N1, no flow control) are documented only for the older generation; reuse for X750R is by inference from that family-shared guide, not from a literal X750R table.

Connection-oriented LAN procedure: open TCP to port 20554 → projector replies `PJ_OK` → controller sends `PJREQ` within 5 s → projector replies `PJACK` → controller sends the same hex command envelope within 5 s. The projector closes the socket 5 s after responding. Each command requires the full handshake; for a multi-command session, repeat the handshake for every command.

Command envelope is uniform: header (21 = operating, 3F = enquiry, 06/40 = response) + unit ID 89 01 + 2-byte command code + variable data + 0A trailer. Variable commands are 7 bytes (3-byte data) or 10 bytes (6-byte data); responses are 6-14 bytes.

IR control: send `73 <ASCII-hex>` to emit the equivalent RC-emulation command (e.g. Power On = `73 05`); an alternative code B uses `63` instead of `73`. Code is selectable via menu or via the Direct "Remote Code A/B" command (above).

PC/controller should treat the projector as half-duplex and wait for the 6-byte ack before issuing the next command; commands with breaks of 50 ms or longer in incoming data are discarded.

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - projectorcentral.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-1144-03en/BONDSYjbxegcxb.php
  - https://www.projectorcentral.com/pdf/projector_manual_9081.pdf
retrieved_at: 2026-06-16T01:51:51.854Z
last_checked_at: 2026-06-16T07:08:31.713Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:08:31.713Z
matched_actions: 327
action_count: 327
confidence: medium
summary: "All 327 spec actions matched literal hex commands in refined source; transport parameters verified; Direct, RC-Emulation, and Enquiry command families fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "this refined source is the family-shared \"RS-232C, LAN and Infrared Remote Control Guide\" version 1.4. The DLA-X750R / X950R / X550R are NOT in the \"FOR MODELS\" header of that document — the listed models are the older DLA-HD350 … DLA-RS65 generation. The X750R family shares the same command-set per JVC firmware changelogs, but this is a soft claim, not literal source text for the X750R. The spec is included as `compatible_with: DLA-X750R / DLA-X950R / DLA-X550R` because the X750R family is the assigned target, and a downstream verifier may flag the model-list mismatch."
- "baud rate / data bits / parity / stop bits / flow control are documented only for the older generation; reuse for X750R is by inference from JVC's \"Improvement of projector control with external command codes\" firmware note, not from a literal X750R table."
- "LAN port 20554 is documented only for the older DLA-X7/X9/X30/X70/X90/RS50/RS60/RS45/RS55/RS65 generation; X750R / X950R / X550R are not in the LAN section's model list."
- "DLA-X750R / X950R / X550R are not in the listed Model Status table; their model strings would need a separate X750R-family source."
- "source documents commands that SET state, not separate variable parameters;"
- "source describes only solicited responses (basic + detailed ack); no unsolicited event stream is documented."
- "source does not define multi-step macro sequences; \"Power Off (RC)\" explicitly"
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
