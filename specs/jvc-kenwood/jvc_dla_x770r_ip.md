---
spec_id: admin/jvc-kenwood-dla-x770r
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-X770R Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-X770R
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-X770R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2025-02en/BONDSYeadnntfl.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2025-02en/BONDSYhxmdhnpn.php
retrieved_at: 2026-06-01T19:44:40.249Z
last_checked_at: 2026-06-09T11:43:08.326Z
generated_at: 2026-06-09T11:43:08.326Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source; voltage and power specifications not stated; physical installation details not in this document"
  - "source does not define discrete settable parameters beyond the command-driven values above."
  - "source does not document unsolicited event messages from the device. The projector"
  - "source does not document interlock procedures, power-on sequencing requirements, or"
  - "firmware version compatibility not stated; voltage, current, and power consumption not stated; physical installation/wiring details not stated; maximum concurrent LAN sessions and keep-alive behaviour not fully specified beyond per-command 5s window"
verification:
  verdict: verified
  checked_at: 2026-06-09T11:43:08.326Z
  matched_actions: 275
  action_count: 275
  confidence: medium
  summary: "All 275 spec actions matched verbatim in source; wire-literal hex convention; transport parameters (port 20554, baud 19200, 8N1, no flow control) verified; source covers X70R models with documented commands. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# JVC KENWOOD DLA-X770R Control Spec

## Summary
The JVC KENWOOD DLA-X770R is a D-ILA projector belonging to the X70R family. This spec covers RS-232C and TCP/IP (LAN) control using a binary hex command set, plus infrared remote control emulation. LAN control uses TCP port 20554 with a multi-step PJ_OK / PJREQ / PJACK handshake. RS-232C runs at 19200 bps, 8N1, no flow control.

<!-- UNRESOLVED: firmware version compatibility not stated in source; voltage and power specifications not stated; physical installation details not in this document -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 20554  # TCP port for LAN control (PJ_OK handshake listener)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth/login procedure documented in source
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
# ===== Direct Commands (RS-232C / LAN) =====
# Header 21 89 01 is the operating command prefix; 0A is the end marker.
# Hex codes below include header, unit ID, command, and data bytes only (end byte 0A added by transport).

- id: power_off
  label: Power Off
  kind: action
  hex: "21 89 01 50 57 30 0A"
  params: []

- id: power_on
  label: Power On
  kind: action
  hex: "21 89 01 50 57 31 0A"
  params: []

- id: input_hdmi1
  label: Select HDMI 1
  kind: action
  hex: "21 89 01 49 50 36 0A"
  params: []

- id: input_hdmi2
  label: Select HDMI 2
  kind: action
  hex: "21 89 01 49 50 37 0A"
  params: []

- id: input_component
  label: Select Component
  kind: action
  hex: "21 89 01 49 50 32 0A"
  params: []

- id: input_pc
  label: Select PC
  kind: action
  hex: "21 89 01 49 50 33 0A"
  params: []

- id: input_next
  label: Next Input (higher)
  kind: action
  hex: "21 89 01 49 50 2B 0A"
  params: []

- id: input_previous
  label: Previous Input (lower)
  kind: action
  hex: "21 89 01 49 50 2D 0A"
  params: []

- id: gamma_normal
  label: Gamma Table Normal
  kind: action
  hex: "21 89 01 47 54 30 0A"
  params: []

- id: gamma_a
  label: Gamma Table A
  kind: action
  hex: "21 89 01 47 54 31 0A"
  params: []

- id: gamma_b
  label: Gamma Table B
  kind: action
  hex: "21 89 01 47 54 32 0A"
  params: []

- id: gamma_c
  label: Gamma Table C
  kind: action
  hex: "21 89 01 47 54 33 0A"
  params: []

- id: gamma_d
  label: Gamma Table D
  kind: action
  hex: "21 89 01 47 54 37 0A"
  params: []

- id: gamma_custom1
  label: Gamma Table Custom 1
  kind: action
  hex: "21 89 01 47 54 34 0A"
  params: []

- id: gamma_custom2
  label: Gamma Table Custom 2
  kind: action
  hex: "21 89 01 47 54 35 0A"
  params: []

- id: gamma_custom3
  label: Gamma Table Custom 3
  kind: action
  hex: "21 89 01 47 54 36 0A"
  params: []

- id: gamma_value_1_8
  label: Gamma Correction Value 1.8
  kind: action
  hex: "21 89 01 47 50 30 0A"
  params: []

- id: gamma_value_1_9
  label: Gamma Correction Value 1.9
  kind: action
  hex: "21 89 01 47 50 31 0A"
  params: []

- id: gamma_value_2_0
  label: Gamma Correction Value 2.0
  kind: action
  hex: "21 89 01 47 50 32 0A"
  params: []

- id: gamma_value_2_1
  label: Gamma Correction Value 2.1
  kind: action
  hex: "21 89 01 47 50 33 0A"
  params: []

- id: gamma_value_2_2
  label: Gamma Correction Value 2.2 (Default)
  kind: action
  hex: "21 89 01 47 50 34 0A"
  params: []

- id: gamma_value_2_3
  label: Gamma Correction Value 2.3
  kind: action
  hex: "21 89 01 47 50 35 0A"
  params: []

- id: gamma_value_2_4
  label: Gamma Correction Value 2.4
  kind: action
  hex: "21 89 01 47 50 36 0A"
  params: []

- id: gamma_value_2_5
  label: Gamma Correction Value 2.5
  kind: action
  hex: "21 89 01 47 50 37 0A"
  params: []

- id: gamma_value_2_6
  label: Gamma Correction Value 2.6
  kind: action
  hex: "21 89 01 47 50 38 0A"
  params: []

- id: off_timer_off
  label: Off Timer Off
  kind: action
  hex: "21 89 01 46 55 4F 54 30 0A"
  params: []

- id: off_timer_1h
  label: Off Timer 1 Hour
  kind: action
  hex: "21 89 01 46 55 4F 54 31 0A"
  params: []

- id: off_timer_2h
  label: Off Timer 2 Hours
  kind: action
  hex: "21 89 01 46 55 4F 54 32 0A"
  params: []

- id: off_timer_3h
  label: Off Timer 3 Hours
  kind: action
  hex: "21 89 01 46 55 4F 54 33 0A"
  params: []

- id: off_timer_4h
  label: Off Timer 4 Hours
  kind: action
  hex: "21 89 01 46 55 4F 54 34 0A"
  params: []

- id: lamp_power_normal
  label: Lamp Power Normal
  kind: action
  hex: "21 89 01 50 4D 4C 50 30 0A"
  params: []

- id: lamp_power_high
  label: Lamp Power High
  kind: action
  hex: "21 89 01 50 4D 4C 50 31 0A"
  params: []

- id: ir_code_a
  label: IR Remote Code A (73)
  kind: action
  hex: "21 89 01 53 55 52 43 30 0A"
  params: []

- id: ir_code_b
  label: IR Remote Code B (63)
  kind: action
  hex: "21 89 01 53 55 52 43 31 0A"
  params: []

- id: trigger_off
  label: Trigger Output Off
  kind: action
  hex: "21 89 01 46 55 54 52 30 0A"
  params: []

- id: trigger_on_power
  label: Trigger Output On (Power)
  kind: action
  hex: "21 89 01 46 55 54 52 31 0A"
  params: []

- id: trigger_on_anamorphic
  label: Trigger Output On (Anamorphic)
  kind: action
  hex: "21 89 01 46 55 54 52 32 0A"
  params: []

- id: cmd_off
  label: Clear Motion Drive Off
  kind: action
  hex: "21 89 01 50 4D 43 4D 30 0A"
  params: []

- id: cmd_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  hex: "21 89 01 50 4D 43 4D 33 0A"
  params: []

- id: cmd_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  hex: "21 89 01 50 4D 43 4D 34 0A"
  params: []

- id: cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  hex: "21 89 01 50 4D 43 4D 35 0A"
  params: []

- id: anamorphic_off
  label: Anamorphic Off
  kind: action
  hex: "21 89 01 49 4E 56 53 30 0A"
  params: []

- id: anamorphic_a
  label: Anamorphic A
  kind: action
  hex: "21 89 01 49 4E 56 53 31 0A"
  params: []

- id: anamorphic_b
  label: Anamorphic B
  kind: action
  hex: "21 89 01 49 4E 56 53 32 0A"
  params: []

- id: picture_mode_film
  label: Picture Mode Film
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 30 0A"
  params: []

- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 31 0A"
  params: []

- id: picture_mode_animation
  label: Picture Mode Animation
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 32 0A"
  params: []

- id: picture_mode_natural
  label: Picture Mode Natural
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 33 0A"
  params: []

- id: picture_mode_stage
  label: Picture Mode Stage
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 34 0A"
  params: []

- id: picture_mode_thx
  label: Picture Mode THX
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 36 0A"
  params: []

- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 42 0A"
  params: []

- id: picture_mode_user1
  label: Picture Mode User 1
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 43 0A"
  params: []

- id: picture_mode_user2
  label: Picture Mode User 2
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 44 0A"
  params: []

- id: picture_mode_user3
  label: Picture Mode User 3
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 45 0A"
  params: []

- id: picture_mode_user4
  label: Picture Mode User 4
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 46 0A"
  params: []

- id: picture_mode_user5
  label: Picture Mode User 5
  kind: action
  hex: "21 89 01 50 4D 50 4D 31 30 0A"
  params: []

- id: color_profile_off
  label: Colour Profile Off
  kind: action
  hex: "21 89 01 50 4D 50 52 30 30 0A"
  params: []

- id: color_profile_film1
  label: Colour Profile Film 1
  kind: action
  hex: "21 89 01 50 4D 50 52 30 31 0A"
  params: []

- id: color_profile_film2
  label: Colour Profile Film 2
  kind: action
  hex: "21 89 01 50 4D 50 52 30 32 0A"
  params: []

- id: color_profile_standard
  label: Colour Profile Standard
  kind: action
  hex: "21 89 01 50 4D 50 52 30 33 0A"
  params: []

- id: color_profile_cinema1
  label: Colour Profile Cinema 1
  kind: action
  hex: "21 89 01 50 4D 50 52 30 34 0A"
  params: []

- id: color_profile_cinema2
  label: Colour Profile Cinema 2
  kind: action
  hex: "21 89 01 50 4D 50 52 30 35 0A"
  params: []

- id: color_profile_anime1
  label: Colour Profile Anime 1
  kind: action
  hex: "21 89 01 50 4D 50 52 30 36 0A"
  params: []

- id: color_profile_anime2
  label: Colour Profile Anime 2
  kind: action
  hex: "21 89 01 50 4D 50 52 30 37 0A"
  params: []

- id: color_profile_video
  label: Colour Profile Video
  kind: action
  hex: "21 89 01 50 4D 50 52 30 38 0A"
  params: []

- id: color_profile_vivid
  label: Colour Profile Vivid
  kind: action
  hex: "21 89 01 50 4D 50 52 30 39 0A"
  params: []

- id: color_profile_adobe
  label: Colour Profile Adobe
  kind: action
  hex: "21 89 01 50 4D 50 52 30 41 0A"
  params: []

- id: color_profile_stage
  label: Colour Profile Stage
  kind: action
  hex: "21 89 01 50 4D 50 52 30 42 0A"
  params: []

- id: color_profile_3d
  label: Colour Profile 3D
  kind: action
  hex: "21 89 01 50 4D 50 52 30 43 0A"
  params: []

- id: color_profile_thx
  label: Colour Profile THX
  kind: action
  hex: "21 89 01 50 4D 50 52 30 44 0A"
  params: []

- id: threed_format_off
  label: 3D Format Off (2D)
  kind: action
  hex: "21 89 01 49 53 33 44 30 0A"
  params: []

- id: threed_format_auto
  label: 3D Format Auto
  kind: action
  hex: "21 89 01 49 53 33 44 31 0A"
  params: []

- id: threed_format_frame_packing
  label: 3D Format Frame Packing
  kind: action
  hex: "21 89 01 49 53 33 44 32 0A"
  params: []

- id: threed_format_side_by_side
  label: 3D Format Side by Side
  kind: action
  hex: "21 89 01 49 53 33 44 33 0A"
  params: []

- id: threed_format_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  hex: "21 89 01 49 53 33 44 34 0A"
  params: []

- id: threed_conversion_off
  label: 2D-to-3D Conversion Off
  kind: action
  hex: "21 89 01 49 53 33 43 30 0A"
  params: []

- id: threed_conversion_on
  label: 2D-to-3D Conversion On
  kind: action
  hex: "21 89 01 49 53 33 43 31 0A"
  params: []

- id: threed_subtitle_correction_off
  label: 3D Subtitle Correction Off
  kind: action
  hex: "21 89 01 49 53 33 54 31 0A"
  params: []

- id: threed_subtitle_correction_on
  label: 3D Subtitle Correction On
  kind: action
  hex: "21 89 01 49 53 33 54 30 0A"
  params: []

- id: lens_memory_save_1
  label: Lens Memory Save 1
  kind: action
  hex: "21 89 01 49 4E 4D 53 30 0A"
  params: []

- id: lens_memory_save_2
  label: Lens Memory Save 2
  kind: action
  hex: "21 89 01 49 4E 4D 53 31 0A"
  params: []

- id: lens_memory_save_3
  label: Lens Memory Save 3
  kind: action
  hex: "21 89 01 49 4E 4D 53 32 0A"
  params: []

- id: lens_memory_select_1
  label: Lens Memory Select 1
  kind: action
  hex: "21 89 01 49 4E 4D 4C 30 0A"
  params: []

- id: lens_memory_select_2
  label: Lens Memory Select 2
  kind: action
  hex: "21 89 01 49 4E 4D 4C 31 0A"
  params: []

- id: lens_memory_select_3
  label: Lens Memory Select 3
  kind: action
  hex: "21 89 01 49 4E 4D 4C 32 0A"
  params: []

- id: test_null_command
  label: Null Command (link check)
  kind: action
  hex: "21 89 01 00 00 0A"
  params: []

# ===== Remote Control Emulation Commands (RS-232C / LAN) =====
# Header 21 89 01 52 43 ... 0A; the 2-byte ASCII hex suffix on the right column of the source is the IR-only code.

- id: rc_3d_setting
  label: 3D Setting Menu
  kind: action
  hex: "21 89 01 52 43 37 33 44 35 0A"
  ir_code: "D5"
  params: []

- id: rc_3d_format_cycle
  label: 3D Format Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 44 36 0A"
  ir_code: "D6"
  params: []

- id: rc_advanced_menu
  label: Advanced Menu
  kind: action
  hex: "21 89 01 52 43 37 33 37 33 0A"
  ir_code: "73"
  params: []

- id: rc_anamorphic_off
  label: Anamorphic Off
  kind: action
  hex: "21 89 01 52 43 37 33 32 34 0A"
  ir_code: "24"
  params: []

- id: rc_anamorphic_a
  label: Anamorphic A
  kind: action
  hex: "21 89 01 52 43 37 33 32 33 0A"
  ir_code: "23"
  params: []

- id: rc_anamorphic_b
  label: Anamorphic B
  kind: action
  hex: "21 89 01 52 43 37 33 32 42 0A"
  ir_code: "2B"
  params: []

- id: rc_anamorphic_cycle
  label: Anamorphic Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 43 35 0A"
  ir_code: "C5"
  params: []

- id: rc_aspect_16_9
  label: Aspect 16:9
  kind: action
  hex: "21 89 01 52 43 37 33 32 36 0A"
  ir_code: "26"
  params: []

- id: rc_aspect_4_3
  label: Aspect 4:3
  kind: action
  hex: "21 89 01 52 43 37 33 32 35 0A"
  ir_code: "25"
  params: []

- id: rc_aspect_zoom
  label: Aspect Zoom
  kind: action
  hex: "21 89 01 52 43 37 33 32 37 0A"
  ir_code: "27"
  params: []

- id: rc_aspect_pc_auto
  label: Aspect (PC) Auto
  kind: action
  hex: "21 89 01 52 43 37 33 41 45 0A"
  ir_code: "AE"
  params: []

- id: rc_aspect_pc_full
  label: Aspect (PC) Full
  kind: action
  hex: "21 89 01 52 43 37 33 42 30 0A"
  ir_code: "B0"
  params: []

- id: rc_aspect_pc_just
  label: Aspect (PC) Just
  kind: action
  hex: "21 89 01 52 43 37 33 41 46 0A"
  ir_code: "AF"
  params: []

- id: rc_aspect_cycle
  label: Aspect Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 37 37 0A"
  ir_code: "77"
  params: []

- id: rc_auto_align
  label: Auto Align
  kind: action
  hex: "21 89 01 52 43 37 33 31 33 0A"
  ir_code: "13"
  params: []

- id: rc_auto_lens_centre
  label: Auto Lens Centre
  kind: action
  hex: "21 89 01 52 43 37 33 43 39 0A"
  ir_code: "C9"
  params: []

- id: rc_back
  label: Back
  kind: action
  hex: "21 89 01 52 43 37 33 30 33 0A"
  ir_code: "03"
  params: []

- id: rc_bnr_off
  label: BNR Off
  kind: action
  hex: "21 89 01 52 43 37 33 31 30 0A"
  ir_code: "10"
  params: []

- id: rc_bnr_on
  label: BNR On
  kind: action
  hex: "21 89 01 52 43 37 33 30 46 0A"
  ir_code: "0F"
  params: []

- id: rc_bright_level_down
  label: Bright Level Down
  kind: action
  hex: "21 89 01 52 43 37 33 41 33 0A"
  ir_code: "A3"
  params: []

- id: rc_bright_level_up
  label: Bright Level Up
  kind: action
  hex: "21 89 01 52 43 37 33 41 32 0A"
  ir_code: "A2"
  params: []

- id: rc_brightness_down
  label: Brightness Down
  kind: action
  hex: "21 89 01 52 43 37 33 37 42 0A"
  ir_code: "7B"
  params: []

- id: rc_brightness_up
  label: Brightness Up
  kind: action
  hex: "21 89 01 52 43 37 33 37 41 0A"
  ir_code: "7A"
  params: []

- id: rc_brightness_adj
  label: Brightness Adjustment Bar Toggle
  kind: action
  hex: "21 89 01 52 43 37 33 30 39 0A"
  ir_code: "09"
  params: []

- id: rc_cec_off
  label: CEC Off
  kind: action
  hex: "21 89 01 52 43 37 33 35 37 0A"
  ir_code: "57"
  params: []

- id: rc_cec_on
  label: CEC On
  kind: action
  hex: "21 89 01 52 43 37 33 35 36 0A"
  ir_code: "56"
  params: []

- id: rc_cmd_cycle
  label: Clear Motion Drive Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 38 41 0A"
  ir_code: "8A"
  params: []

- id: rc_cmd_off
  label: Clear Motion Drive Off
  kind: action
  hex: "21 89 01 52 43 37 33 34 37 0A"
  ir_code: "47"
  params: []

- id: rc_cmd_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  hex: "21 89 01 52 43 37 33 43 45 0A"
  ir_code: "CE"
  params: []

- id: rc_cmd_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  hex: "21 89 01 52 43 37 33 43 46 0A"
  ir_code: "CF"
  params: []

- id: rc_cmd_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  hex: "21 89 01 52 43 37 33 34 38 0A"
  ir_code: "48"
  params: []

- id: rc_cmd_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  hex: "21 89 01 52 43 37 33 34 39 0A"
  ir_code: "49"
  params: []

- id: rc_cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  hex: "21 89 01 52 43 37 33 34 41 0A"
  ir_code: "4A"
  params: []

- id: rc_colour_down
  label: Colour Down
  kind: action
  hex: "21 89 01 52 43 37 33 37 44 0A"
  ir_code: "7D"
  params: []

- id: rc_colour_up
  label: Colour Up
  kind: action
  hex: "21 89 01 52 43 37 33 37 43 0A"
  ir_code: "7C"
  params: []

- id: rc_colour_adj
  label: Colour Adjustment Bar Toggle
  kind: action
  hex: "21 89 01 52 43 37 33 31 35 0A"
  ir_code: "15"
  params: []

- id: rc_colour_mgmt_cycle
  label: Colour Management Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 38 39 0A"
  ir_code: "89"
  params: []

- id: rc_colour_profile_cycle
  label: Colour Profile Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 38 38 0A"
  ir_code: "88"
  params: []

- id: rc_colour_temp_6500k
  label: Colour Temperature 6500K
  kind: action
  hex: "21 89 01 52 43 37 33 34 46 0A"
  ir_code: "4F"
  params: []

- id: rc_colour_temp_custom1
  label: Colour Temperature Custom 1
  kind: action
  hex: "21 89 01 52 43 37 33 35 33 0A"
  ir_code: "53"
  params: []

- id: rc_colour_temp_custom2
  label: Colour Temperature Custom 2
  kind: action
  hex: "21 89 01 52 43 37 33 35 34 0A"
  ir_code: "54"
  params: []

- id: rc_colour_temp_custom3
  label: Colour Temperature Custom 3
  kind: action
  hex: "21 89 01 52 43 37 33 35 35 0A"
  ir_code: "55"
  params: []

- id: rc_colour_temp_high_bright
  label: Colour Temperature High Bright
  kind: action
  hex: "21 89 01 52 43 37 33 35 32 0A"
  ir_code: "52"
  params: []

- id: rc_colour_temp_cycle
  label: Colour Temperature Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 37 36 0A"
  ir_code: "76"
  params: []

- id: rc_colour_temp_gain_blue_down
  label: Colour Temperature Gain Blue Down
  kind: action
  hex: "21 89 01 52 43 37 33 39 31 0A"
  ir_code: "91"
  params: []

- id: rc_colour_temp_gain_blue_up
  label: Colour Temperature Gain Blue Up
  kind: action
  hex: "21 89 01 52 43 37 33 39 30 0A"
  ir_code: "90"
  params: []

- id: rc_colour_temp_gain_green_down
  label: Colour Temperature Gain Green Down
  kind: action
  hex: "21 89 01 52 43 37 33 38 46 0A"
  ir_code: "8F"
  params: []

- id: rc_colour_temp_gain_green_up
  label: Colour Temperature Gain Green Up
  kind: action
  hex: "21 89 01 52 43 37 33 38 45 0A"
  ir_code: "8E"
  params: []

- id: rc_colour_temp_gain_red_down
  label: Colour Temperature Gain Red Down
  kind: action
  hex: "21 89 01 52 43 37 33 38 44 0A"
  ir_code: "8D"
  params: []

- id: rc_colour_temp_gain_red_up
  label: Colour Temperature Gain Red Up
  kind: action
  hex: "21 89 01 52 43 37 33 38 43 0A"
  ir_code: "8C"
  params: []

- id: rc_colour_temp_offset_blue_down
  label: Colour Temperature Offset Blue Down
  kind: action
  hex: "21 89 01 52 43 37 33 39 37 0A"
  ir_code: "97"
  params: []

- id: rc_colour_temp_offset_blue_up
  label: Colour Temperature Offset Blue Up
  kind: action
  hex: "21 89 01 52 43 37 33 39 36 0A"
  ir_code: "96"
  params: []

- id: rc_colour_temp_offset_green_down
  label: Colour Temperature Offset Green Down
  kind: action
  hex: "21 89 01 52 43 37 33 39 35 0A"
  ir_code: "95"
  params: []

- id: rc_colour_temp_offset_green_up
  label: Colour Temperature Offset Green Up
  kind: action
  hex: "21 89 01 52 43 37 33 39 34 0A"
  ir_code: "94"
  params: []

- id: rc_colour_temp_offset_red_down
  label: Colour Temperature Offset Red Down
  kind: action
  hex: "21 89 01 52 43 37 33 39 33 0A"
  ir_code: "93"
  params: []

- id: rc_colour_temp_offset_red_up
  label: Colour Temperature Offset Red Up
  kind: action
  hex: "21 89 01 52 43 37 33 39 32 0A"
  ir_code: "92"
  params: []

- id: rc_contrast_down
  label: Contrast Down
  kind: action
  hex: "21 89 01 52 43 37 33 37 39 0A"
  ir_code: "79"
  params: []

- id: rc_contrast_up
  label: Contrast Up
  kind: action
  hex: "21 89 01 52 43 37 33 37 38 0A"
  ir_code: "78"
  params: []

- id: rc_contrast_adj
  label: Contrast Adjustment Bar Toggle
  kind: action
  hex: "21 89 01 52 43 37 33 30 41 0A"
  ir_code: "0A"
  params: []

- id: rc_cursor_down
  label: Cursor Down
  kind: action
  hex: "21 89 01 52 43 37 33 30 32 0A"
  ir_code: "02"
  params: []

- id: rc_cursor_left
  label: Cursor Left
  kind: action
  hex: "21 89 01 52 43 37 33 33 36 0A"
  ir_code: "36"
  params: []

- id: rc_cursor_right
  label: Cursor Right
  kind: action
  hex: "21 89 01 52 43 37 33 33 34 0A"
  ir_code: "34"
  params: []

- id: rc_cursor_up
  label: Cursor Up
  kind: action
  hex: "21 89 01 52 43 37 33 30 31 0A"
  ir_code: "01"
  params: []

- id: rc_dark_level_down
  label: Dark Level Down
  kind: action
  hex: "21 89 01 52 43 37 33 41 35 0A"
  ir_code: "A5"
  params: []

- id: rc_dark_level_up
  label: Dark Level Up
  kind: action
  hex: "21 89 01 52 43 37 33 41 34 0A"
  ir_code: "A4"
  params: []

- id: rc_detail_enhance_down
  label: Detail Enhance Down
  kind: action
  hex: "21 89 01 52 43 37 33 31 32 0A"
  ir_code: "12"
  params: []

- id: rc_detail_enhance_up
  label: Detail Enhance Up
  kind: action
  hex: "21 89 01 52 43 37 33 31 31 0A"
  ir_code: "11"
  params: []

- id: rc_picture_tone_blue_down
  label: Picture Tone Blue Down
  kind: action
  hex: "21 89 01 52 43 37 33 41 31 0A"
  ir_code: "A1"
  params: []

- id: rc_picture_tone_blue_up
  label: Picture Tone Blue Up
  kind: action
  hex: "21 89 01 52 43 37 33 41 30 0A"
  ir_code: "A0"
  params: []

- id: rc_picture_tone_green_down
  label: Picture Tone Green Down
  kind: action
  hex: "21 89 01 52 43 37 33 39 46 0A"
  ir_code: "9F"
  params: []

- id: rc_picture_tone_green_up
  label: Picture Tone Green Up
  kind: action
  hex: "21 89 01 52 43 37 33 39 45 0A"
  ir_code: "9E"
  params: []

- id: rc_picture_tone_red_down
  label: Picture Tone Red Down
  kind: action
  hex: "21 89 01 52 43 37 33 39 44 0A"
  ir_code: "9D"
  params: []

- id: rc_picture_tone_red_up
  label: Picture Tone Red Up
  kind: action
  hex: "21 89 01 52 43 37 33 39 43 0A"
  ir_code: "9C"
  params: []

- id: rc_picture_tone_white_down
  label: Picture Tone White Down
  kind: action
  hex: "21 89 01 52 43 37 33 39 42 0A"
  ir_code: "9B"
  params: []

- id: rc_picture_tone_white_up
  label: Picture Tone White Up
  kind: action
  hex: "21 89 01 52 43 37 33 39 41 0A"
  ir_code: "9A"
  params: []

- id: rc_gamma_a
  label: Gamma A
  kind: action
  hex: "21 89 01 52 43 37 33 33 39 0A"
  ir_code: "39"
  params: []

- id: rc_gamma_b
  label: Gamma B
  kind: action
  hex: "21 89 01 52 43 37 33 33 41 0A"
  ir_code: "3A"
  params: []

- id: rc_gamma_c
  label: Gamma C
  kind: action
  hex: "21 89 01 52 43 37 33 33 42 0A"
  ir_code: "3B"
  params: []

- id: rc_gamma_custom1
  label: Gamma Custom 1
  kind: action
  hex: "21 89 01 52 43 37 33 33 43 0A"
  ir_code: "3C"
  params: []

- id: rc_gamma_custom2
  label: Gamma Custom 2
  kind: action
  hex: "21 89 01 52 43 37 33 33 44 0A"
  ir_code: "3D"
  params: []

- id: rc_gamma_custom3
  label: Gamma Custom 3
  kind: action
  hex: "21 89 01 52 43 37 33 33 45 0A"
  ir_code: "3E"
  params: []

- id: rc_gamma_d
  label: Gamma D
  kind: action
  hex: "21 89 01 52 43 37 33 33 46 0A"
  ir_code: "3F"
  params: []

- id: rc_gamma_normal
  label: Gamma Normal
  kind: action
  hex: "21 89 01 52 43 37 33 33 38 0A"
  ir_code: "38"
  params: []

- id: rc_gamma_cycle
  label: Gamma Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 37 35 0A"
  ir_code: "75"
  params: []

- id: rc_hide_off
  label: Hide Off
  kind: action
  hex: "21 89 01 52 43 37 33 44 31 0A"
  ir_code: "D1"
  params: []

- id: rc_hide_on
  label: Hide On
  kind: action
  hex: "21 89 01 52 43 37 33 44 30 0A"
  ir_code: "D0"
  params: []

- id: rc_hide_toggle
  label: Hide Toggle
  kind: action
  hex: "21 89 01 52 43 37 33 31 44 0A"
  ir_code: "1D"
  params: []

- id: rc_horizontal_position_down
  label: Horizontal Position Down
  kind: action
  hex: "21 89 01 52 43 37 33 41 42 0A"
  ir_code: "AB"
  params: []

- id: rc_horizontal_position_up
  label: Horizontal Position Up
  kind: action
  hex: "21 89 01 52 43 37 33 41 41 0A"
  ir_code: "AA"
  params: []

- id: rc_information
  label: Information
  kind: action
  hex: "21 89 01 52 43 37 33 37 34 0A"
  ir_code: "74"
  params: []

- id: rc_input_component
  label: Input Component
  kind: action
  hex: "21 89 01 52 43 37 33 34 44 0A"
  ir_code: "4D"
  params: []

- id: rc_input_hdmi1
  label: Input HDMI 1
  kind: action
  hex: "21 89 01 52 43 37 33 37 30 0A"
  ir_code: "70"
  params: []

- id: rc_input_hdmi2
  label: Input HDMI 2
  kind: action
  hex: "21 89 01 52 43 37 33 37 31 0A"
  ir_code: "71"
  params: []

- id: rc_input_pc
  label: Input PC
  kind: action
  hex: "21 89 01 52 43 37 33 34 36 0A"
  ir_code: "46"
  params: []

- id: rc_input_cycle
  label: Input Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 30 38 0A"
  ir_code: "08"
  params: []

- id: rc_isf_day
  label: ISF Day
  kind: action
  hex: "21 89 01 52 43 37 33 36 34 0A"
  ir_code: "64"
  params: []

- id: rc_isf_night
  label: ISF Night
  kind: action
  hex: "21 89 01 52 43 37 33 36 35 0A"
  ir_code: "65"
  params: []

- id: rc_isf_off
  label: ISF Off
  kind: action
  hex: "21 89 01 52 43 37 33 35 41 0A"
  ir_code: "5A"
  params: []

- id: rc_isf_on
  label: ISF On
  kind: action
  hex: "21 89 01 52 43 37 33 35 42 0A"
  ir_code: "5B"
  params: []

- id: rc_keystone_h_down
  label: Keystone Horizontal Down
  kind: action
  hex: "21 89 01 52 43 37 33 34 31 0A"
  ir_code: "41"
  params: []

- id: rc_keystone_h_up
  label: Keystone Horizontal Up
  kind: action
  hex: "21 89 01 52 43 37 33 34 30 0A"
  ir_code: "40"
  params: []

- id: rc_keystone_v_down
  label: Keystone Vertical Down
  kind: action
  hex: "21 89 01 52 43 37 33 31 43 0A"
  ir_code: "1C"
  params: []

- id: rc_keystone_v_up
  label: Keystone Vertical Up
  kind: action
  hex: "21 89 01 52 43 37 33 31 42 0A"
  ir_code: "1B"
  params: []

- id: rc_lens_aperture_down
  label: Lens Aperture Down
  kind: action
  hex: "21 89 01 52 43 37 33 31 46 0A"
  ir_code: "1F"
  params: []

- id: rc_lens_aperture_up
  label: Lens Aperture Up
  kind: action
  hex: "21 89 01 52 43 37 33 31 45 0A"
  ir_code: "1E"
  params: []

- id: rc_lens_aperture_adj
  label: Lens Aperture Adjustment Bar
  kind: action
  hex: "21 89 01 52 43 37 33 32 30 0A"
  ir_code: "20"
  params: []

- id: rc_lens_control_cycle
  label: Lens Control Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 33 30 0A"
  ir_code: "30"
  params: []

- id: rc_lens_focus_down
  label: Lens Focus Down
  kind: action
  hex: "21 89 01 52 43 37 33 33 32 0A"
  ir_code: "32"
  params: []

- id: rc_lens_focus_up
  label: Lens Focus Up
  kind: action
  hex: "21 89 01 52 43 37 33 33 31 0A"
  ir_code: "31"
  params: []

- id: rc_lens_memory_cycle
  label: Lens Memory Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 44 34 0A"
  ir_code: "D4"
  params: []

- id: rc_lens_memory_1
  label: Lens Memory 1
  kind: action
  hex: "21 89 01 52 43 37 33 44 38 0A"
  ir_code: "D8"
  params: []

- id: rc_lens_memory_2
  label: Lens Memory 2
  kind: action
  hex: "21 89 01 52 43 37 33 44 39 0A"
  ir_code: "D9"
  params: []

- id: rc_lens_memory_3
  label: Lens Memory 3
  kind: action
  hex: "21 89 01 52 43 37 33 44 41 0A"
  ir_code: "DA"
  params: []

- id: rc_lens_shift_down
  label: Lens Shift Down
  kind: action
  hex: "21 89 01 52 43 37 33 32 32 0A"
  ir_code: "22"
  params: []

- id: rc_lens_shift_left
  label: Lens Shift Left
  kind: action
  hex: "21 89 01 52 43 37 33 34 34 0A"
  ir_code: "44"
  params: []

- id: rc_lens_shift_right
  label: Lens Shift Right
  kind: action
  hex: "21 89 01 52 43 37 33 34 33 0A"
  ir_code: "43"
  params: []

- id: rc_lens_shift_up
  label: Lens Shift Up
  kind: action
  hex: "21 89 01 52 43 37 33 32 31 0A"
  ir_code: "21"
  params: []

- id: rc_lens_zoom_in
  label: Lens Zoom In
  kind: action
  hex: "21 89 01 52 43 37 33 33 35 0A"
  ir_code: "35"
  params: []

- id: rc_lens_zoom_out
  label: Lens Zoom Out
  kind: action
  hex: "21 89 01 52 43 37 33 33 37 0A"
  ir_code: "37"
  params: []

- id: rc_mask_bottom_down
  label: Mask Bottom Down
  kind: action
  hex: "21 89 01 52 43 37 33 42 38 0A"
  ir_code: "B8"
  params: []

- id: rc_mask_bottom_up
  label: Mask Bottom Up
  kind: action
  hex: "21 89 01 52 43 37 33 42 37 0A"
  ir_code: "B7"
  params: []

- id: rc_mask_left_down
  label: Mask Left Down
  kind: action
  hex: "21 89 01 52 43 37 33 42 32 0A"
  ir_code: "B2"
  params: []

- id: rc_mask_left_up
  label: Mask Left Up
  kind: action
  hex: "21 89 01 52 43 37 33 42 31 0A"
  ir_code: "B1"
  params: []

- id: rc_mask_right_down
  label: Mask Right Down
  kind: action
  hex: "21 89 01 52 43 37 33 42 34 0A"
  ir_code: "B4"
  params: []

- id: rc_mask_right_up
  label: Mask Right Up
  kind: action
  hex: "21 89 01 52 43 37 33 42 33 0A"
  ir_code: "B3"
  params: []

- id: rc_mask_top_down
  label: Mask Top Down
  kind: action
  hex: "21 89 01 52 43 37 33 42 36 0A"
  ir_code: "B6"
  params: []

- id: rc_mask_top_up
  label: Mask Top Up
  kind: action
  hex: "21 89 01 52 43 37 33 42 35 0A"
  ir_code: "B5"
  params: []

- id: rc_menu_toggle
  label: Menu Toggle
  kind: action
  hex: "21 89 01 52 43 37 33 32 45 0A"
  ir_code: "2E"
  params: []

- id: rc_menu_position
  label: Menu Position
  kind: action
  hex: "21 89 01 52 43 37 33 34 32 0A"
  ir_code: "42"
  params: []

- id: rc_mnr_down
  label: MNR Down
  kind: action
  hex: "21 89 01 52 43 37 33 30 45 0A"
  ir_code: "0E"
  params: []

- id: rc_mnr_up
  label: MNR Up
  kind: action
  hex: "21 89 01 52 43 37 33 30 44 0A"
  ir_code: "0D"
  params: []

- id: rc_ok
  label: OK
  kind: action
  hex: "21 89 01 52 43 37 33 32 46 0A"
  ir_code: "2F"
  params: []

- id: rc_phase_pc_down
  label: Phase (PC) Down
  kind: action
  hex: "21 89 01 52 43 37 33 41 39 0A"
  ir_code: "A9"
  params: []

- id: rc_phase_pc_up
  label: Phase (PC) Up
  kind: action
  hex: "21 89 01 52 43 37 33 41 38 0A"
  ir_code: "A8"
  params: []

- id: rc_picture_adjust
  label: Picture Adjust Menu
  kind: action
  hex: "21 89 01 52 43 37 33 37 32 0A"
  ir_code: "72"
  params: []

- id: rc_picture_mode_3d
  label: Picture Mode 3D
  kind: action
  hex: "21 89 01 52 43 37 33 38 37 0A"
  ir_code: "87"
  params: []

- id: rc_picture_mode_cinema1
  label: Picture Mode Cinema 1 (Film)
  kind: action
  hex: "21 89 01 52 43 37 33 36 39 0A"
  ir_code: "69"
  params: []

- id: rc_picture_mode_cinema2
  label: Picture Mode Cinema 2 (Cinema)
  kind: action
  hex: "21 89 01 52 43 37 33 36 38 0A"
  ir_code: "68"
  params: []

- id: rc_picture_mode_cinema3
  label: Picture Mode Cinema 3 (Animation)
  kind: action
  hex: "21 89 01 52 43 37 33 36 36 0A"
  ir_code: "66"
  params: []

- id: rc_picture_mode_natural
  label: Picture Mode Natural
  kind: action
  hex: "21 89 01 52 43 37 33 36 41 0A"
  ir_code: "6A"
  params: []

- id: rc_picture_mode_stage
  label: Picture Mode Stage
  kind: action
  hex: "21 89 01 52 43 37 33 36 37 0A"
  ir_code: "67"
  params: []

- id: rc_picture_mode_thx
  label: Picture Mode THX
  kind: action
  hex: "21 89 01 52 43 37 33 36 46 0A"
  ir_code: "6F"
  params: []

- id: rc_picture_mode_user1
  label: Picture Mode User 1
  kind: action
  hex: "21 89 01 52 43 37 33 36 43 0A"
  ir_code: "6C"
  params: []

- id: rc_picture_mode_user2
  label: Picture Mode User 2
  kind: action
  hex: "21 89 01 52 43 37 33 36 44 0A"
  ir_code: "6D"
  params: []

- id: rc_picture_mode_user4
  label: Picture Mode User 4
  kind: action
  hex: "21 89 01 52 43 37 33 43 41 0A"
  ir_code: "CA"
  params: []

- id: rc_picture_mode_user5
  label: Picture Mode User 5
  kind: action
  hex: "21 89 01 52 43 37 33 43 42 0A"
  ir_code: "CB"
  params: []

- id: rc_pixel_shift_h_blue_down
  label: Pixel Shift Horizontal Blue Down
  kind: action
  hex: "21 89 01 52 43 37 33 42 45 0A"
  ir_code: "BE"
  params: []

- id: rc_pixel_shift_h_blue_up
  label: Pixel Shift Horizontal Blue Up
  kind: action
  hex: "21 89 01 52 43 37 33 42 44 0A"
  ir_code: "BD"
  params: []

- id: rc_pixel_shift_h_green_down
  label: Pixel Shift Horizontal Green Down
  kind: action
  hex: "21 89 01 52 43 37 33 42 43 0A"
  ir_code: "BC"
  params: []

- id: rc_pixel_shift_h_green_up
  label: Pixel Shift Horizontal Green Up
  kind: action
  hex: "21 89 01 52 43 37 33 42 42 0A"
  ir_code: "BB"
  params: []

- id: rc_pixel_shift_h_red_down
  label: Pixel Shift Horizontal Red Down
  kind: action
  hex: "21 89 01 52 43 37 33 42 41 0A"
  ir_code: "BA"
  params: []

- id: rc_pixel_shift_h_red_up
  label: Pixel Shift Horizontal Red Up
  kind: action
  hex: "21 89 01 52 43 37 33 42 39 0A"
  ir_code: "B9"
  params: []

- id: rc_pixel_shift_v_blue_down
  label: Pixel Shift Vertical Blue Down
  kind: action
  hex: "21 89 01 52 43 37 33 43 34 0A"
  ir_code: "C4"
  params: []

- id: rc_pixel_shift_v_blue_up
  label: Pixel Shift Vertical Blue Up
  kind: action
  hex: "21 89 01 52 43 37 33 43 33 0A"
  ir_code: "C3"
  params: []

- id: rc_pixel_shift_v_green_down
  label: Pixel Shift Vertical Green Down
  kind: action
  hex: "21 89 01 52 43 37 33 43 32 0A"
  ir_code: "C2"
  params: []

- id: rc_pixel_shift_v_green_up
  label: Pixel Shift Vertical Green Up
  kind: action
  hex: "21 89 01 52 43 37 33 43 31 0A"
  ir_code: "C1"
  params: []

- id: rc_pixel_shift_v_red_down
  label: Pixel Shift Vertical Red Down
  kind: action
  hex: "21 89 01 52 43 37 33 43 30 0A"
  ir_code: "C0"
  params: []

- id: rc_pixel_shift_v_red_up
  label: Pixel Shift Vertical Red Up
  kind: action
  hex: "21 89 01 52 43 37 33 42 46 0A"
  ir_code: "BF"
  params: []

- id: rc_power_off
  label: Power Off
  kind: action
  hex: "21 89 01 52 43 37 33 30 36 0A"
  ir_code: "06"
  notes: "Send twice with short delay between to actually switch off (per source)."
  params: []

- id: rc_power_on
  label: Power On
  kind: action
  hex: "21 89 01 52 43 37 33 30 35 0A"
  ir_code: "05"
  params: []

- id: rc_rnr_down
  label: RNR Down
  kind: action
  hex: "21 89 01 52 43 37 33 30 43 0A"
  ir_code: "0C"
  params: []

- id: rc_rnr_up
  label: RNR Up
  kind: action
  hex: "21 89 01 52 43 37 33 30 42 0A"
  ir_code: "0B"
  params: []

- id: rc_sharpness_down
  label: Sharpness Down
  kind: action
  hex: "21 89 01 52 43 37 33 37 46 0A"
  ir_code: "7F"
  params: []

- id: rc_sharpness_up
  label: Sharpness Up
  kind: action
  hex: "21 89 01 52 43 37 33 37 45 0A"
  ir_code: "7E"
  params: []

- id: rc_sharpness_adj
  label: Sharpness Adjustment Bar Toggle
  kind: action
  hex: "21 89 01 52 43 37 33 31 34 0A"
  ir_code: "14"
  params: []

- id: rc_shutter_close
  label: Shutter Close
  kind: action
  hex: "21 89 01 52 43 37 33 31 39 0A"
  ir_code: "19"
  params: []

- id: rc_shutter_open
  label: Shutter Open
  kind: action
  hex: "21 89 01 52 43 37 33 31 41 0A"
  ir_code: "1A"
  params: []

- id: rc_shutter_off
  label: Shutter Un-sync with Hide
  kind: action
  hex: "21 89 01 52 43 37 33 32 44 0A"
  ir_code: "2D"
  params: []

- id: rc_shutter_on
  label: Shutter Sync with Hide
  kind: action
  hex: "21 89 01 52 43 37 33 32 43 0A"
  ir_code: "2C"
  params: []

- id: rc_thx_bright
  label: THX Bright
  kind: action
  hex: "21 89 01 52 43 37 33 38 35 0A"
  ir_code: "85"
  params: []

- id: rc_thx_dark
  label: THX Dark
  kind: action
  hex: "21 89 01 52 43 37 33 38 36 0A"
  ir_code: "86"
  params: []

- id: rc_thx_off
  label: THX Off
  kind: action
  hex: "21 89 01 52 43 37 33 43 37 0A"
  ir_code: "C7"
  params: []

- id: rc_thx_on
  label: THX On
  kind: action
  hex: "21 89 01 52 43 37 33 43 38 0A"
  ir_code: "C8"
  params: []

- id: rc_tint_down
  label: Tint Down
  kind: action
  hex: "21 89 01 52 43 37 33 39 39 0A"
  ir_code: "99"
  params: []

- id: rc_tint_up
  label: Tint Up
  kind: action
  hex: "21 89 01 52 43 37 33 39 38 0A"
  ir_code: "98"
  params: []

- id: rc_tint_adj
  label: Tint Adjustment Bar Toggle
  kind: action
  hex: "21 89 01 52 43 37 33 31 36 0A"
  ir_code: "16"
  params: []

- id: rc_tracking_down
  label: Tracking (PC) Down
  kind: action
  hex: "21 89 01 52 43 37 33 41 37 0A"
  ir_code: "A7"
  params: []

- id: rc_tracking_up
  label: Tracking (PC) Up
  kind: action
  hex: "21 89 01 52 43 37 33 41 36 0A"
  ir_code: "A6"
  params: []

- id: rc_user_cycle
  label: User Picture Mode Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 44 37 0A"
  ir_code: "D7"
  params: []

- id: rc_vertical_position_down
  label: Vertical Position Down
  kind: action
  hex: "21 89 01 52 43 37 33 41 44 0A"
  ir_code: "AD"
  params: []

- id: rc_vertical_position_up
  label: Vertical Position Up
  kind: action
  hex: "21 89 01 52 43 37 33 41 43 0A"
  ir_code: "AC"
  params: []

# ===== Status / Enquiry Commands =====
# Header 3F 89 01 ... 0A is the Acknowledgement Response Request.
# Basic acknowledgement (06 89 01 ... 0A) always follows, then detailed (40 89 01 ... RR 0A).

- id: query_power_status
  label: Power Status Enquiry
  kind: query
  hex: "3F 89 01 50 57 0A"
  response_hex_prefix: "40 89 01 50 57"
  response_codes:
    "30": Standby
    "31": Power On
    "32": Cooling
    "34": Emergency
  params: []

- id: query_input_status
  label: Input Status Enquiry
  kind: query
  hex: "3F 89 01 49 50 0A"
  response_hex_prefix: "40 89 01 49 50"
  response_codes:
    "30": S-Video
    "31": Video
    "32": Component
    "33": PC
    "36": HDMI 1
    "37": HDMI 2
  params: []

- id: query_gamma_table
  label: Gamma Table Enquiry
  kind: query
  hex: "3F 89 01 47 54 0A"
  response_hex_prefix: "40 89 01 47 54"
  response_codes:
    "30": Gamma Normal
    "31": Gamma A
    "32": Gamma B
    "33": Gamma C
    "34": Gamma Custom 1
    "35": Gamma Custom 2
    "36": Gamma Custom 3
  params: []

- id: query_gamma_value
  label: Gamma Value Enquiry
  kind: query
  hex: "3F 89 01 47 50 0A"
  response_hex_prefix: "40 89 01 47 50"
  response_codes:
    "30": "1.8"
    "31": "1.9"
    "32": "2.0"
    "33": "2.1"
    "34": "2.2"
    "35": "2.3"
    "36": "2.4"
    "37": "2.5"
    "38": "2.6"
  params: []

- id: query_source_status
  label: Video Source Status Enquiry
  kind: query
  hex: "3F 89 01 53 43 0A"
  response_hex_prefix: "40 89 01 53 43"
  response_codes:
    "00": JVC Logo displayed
    "30": No signal or signal out of range
    "31": Signal input correctly
  params: []

- id: query_model_status
  label: Projector Model Enquiry
  kind: query
  hex: "3F 89 01 4D 44 0A"
  response_hex_prefix: "40 89 01 4D 44"
  response_codes:
    "494C41 46 504A 202D 2D 202D 5848 34": DLA-HD350
    "494C41 46 504A 202D 2D 202D 5848 37": DLA-RS10
    "494C41 46 504A 202D 2D 202D 5848 35": "DLA-HD750 / DLA-RS20"
    "494C41 46 504A 202D 2D 202D 5848 38": DLA-HD550
    "494C41 46 504A 202D 2D 202D 5848 41": DLA-RS15
    "494C41 46 504A 202D 2D 202D 5848 39": "DLA-HD950 / HD990 / DLA-RS25 / RS35"
    "494C41 46 504A 202D 2D 202D 5848 42": "DLA-X3 / DLA-RS40"
    "494C41 46 504A 202D 2D 202D 5848 43": "DLA-X7 / X9 / DLA-RS50 / RS60"
    "494C41 46 504A 202D 2D 202D 5848 45": "DLA-X30 / DLA-RS45"
    "494C41 46 504A 202D 2D 202D 5848 46": "DLA-X70R / X90R / DLA-RS55 / RS65"
  params: []
- id: input_svideo
  label: Select S-Video
  kind: action
  hex: "21 89 01 49 50 30 0A"
  params: []

- id: input_video
  label: Select Video
  kind: action
  hex: "21 89 01 49 50 31 0A"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, emergency]
  source: query_power_status

- id: input_source
  type: enum
  values: [svideo, video, component, pc, hdmi1, hdmi2]
  source: query_input_status

- id: gamma_table
  type: enum
  values: [normal, a, b, c, custom1, custom2, custom3]
  source: query_gamma_table

- id: gamma_value
  type: enum
  values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6"]
  source: query_gamma_value

- id: video_source_status
  type: enum
  values: [jvc_logo, no_signal, signal_ok]
  source: query_source_status

- id: projector_model
  type: string
  source: query_model_status
  notes: "Fixed 14-byte ASCII response identifying the projector model."
```

## Variables
```yaml
# UNRESOLVED: source does not define discrete settable parameters beyond the command-driven values above.
# Each enum command (picture mode, colour profile, gamma table, gamma value, trigger, off-timer, lamp power,
# input, anamorphic, clear motion drive, 2D-to-3D, 3D format, 3D subtitle correction, IR code, etc.)
# is its own action; the source treats them as discrete commands, not parameterised setters.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event messages from the device. The projector
# only sends basic (06 89 01 ... 0A) and detailed (40 89 01 ... RR 0A) acknowledgement responses
# in reply to a specific request. There is no "push" event channel.
```

## Macros
```yaml
# LAN connection establishment - required preamble before every command over TCP.
# 1. Controller opens TCP socket to projector on port 20554.
# 2. Projector sends "PJ_OK".
# 3. Controller must send "PJREQ" within 5 seconds.
# 4. Projector sends "PJACK".
# 5. Controller must send the actual command within 5 seconds of PJACK.
# 6. Projector responds, then closes the connection after 5 seconds.
# Each individual command must be preceded by this full handshake.

# Power Off via Remote Control Emulation: send rc_power_off twice with a short delay (per source note).
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  notes: "The RC power-off hex 06 should be sent twice with a short delay to actually switch off (per source)."

interlocks: []
# UNRESOLVED: source does not document interlock procedures, power-on sequencing requirements, or
# safety warnings specific to this device beyond the standard projector lamp cooldown behavior
# (Cooling state RR=32 in the Power Status Enquiry).
```

## Notes
- The DLA-X770R is a member of the DLA-X70R family. The refined source manual covers 30+ JVC D-ILA models spanning DLA-HD350 through DLA-RS65. The LAN control section explicitly lists DLA-X70/X90 among the LAN-enabled models.
- Two command styles are available: **Direct Commands** (compact 7-byte) and **Remote Control Emulation Commands** (10-byte, emulating the IR remote). The source recommends Direct Commands when available; RC emulation is useful when its on-screen confirmation messages are needed.
- All commands use the binary header `21 89 01`, fixed unit ID `89 01`, variable command and data bytes, and end byte `0A`. Acknowledgement responses use header `06` (basic) or `40` (detailed); enquiry requests use header `3F`.
- LAN sessions are per-command: the controller must perform the PJ_OK / PJREQ / PJACK handshake for every single command and the connection auto-closes 5 seconds after a response. A persistent connection is not supported.
- Default IP address (LAN) is 192.168.0.2, subnet mask 255.255.255.0, default gateway 192.168.0.254. DHCP is available but defaults to Off.
- The IR remote code can be set to A (hex 73) or B (hex 63) via direct commands; if set to B, all IR transmissions must substitute the device code.
- Commands with model-specific applicability have been restricted to those listing X70/X90 in the source's model annotation. Commands marked only for older families (HD350/550/750/950/990/RS10-35) are excluded.

<!-- UNRESOLVED: firmware version compatibility not stated; voltage, current, and power consumption not stated; physical installation/wiring details not stated; maximum concurrent LAN sessions and keep-alive behaviour not fully specified beyond per-command 5s window -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2025-02en/BONDSYeadnntfl.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2025-02en/BONDSYhxmdhnpn.php
retrieved_at: 2026-06-01T19:44:40.249Z
last_checked_at: 2026-06-09T11:43:08.326Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T11:43:08.326Z
matched_actions: 275
action_count: 275
confidence: medium
summary: "All 275 spec actions matched verbatim in source; wire-literal hex convention; transport parameters (port 20554, baud 19200, 8N1, no flow control) verified; source covers X70R models with documented commands. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source; voltage and power specifications not stated; physical installation details not in this document"
- "source does not define discrete settable parameters beyond the command-driven values above."
- "source does not document unsolicited event messages from the device. The projector"
- "source does not document interlock procedures, power-on sequencing requirements, or"
- "firmware version compatibility not stated; voltage, current, and power consumption not stated; physical installation/wiring details not stated; maximum concurrent LAN sessions and keep-alive behaviour not fully specified beyond per-command 5s window"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
