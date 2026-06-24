---
spec_id: admin/jvc-kenwood-dla-x5900-rs440
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-X5900_RS440 Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-X5900
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-X5900
    - DLA-RS440
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - github.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2360-0Cen/BONDSYvxqkwmjo.php
  - https://github.com/atrus05/JVCProjectorControl
retrieved_at: 2026-06-14T17:43:29.085Z
last_checked_at: 2026-06-22T14:03:05.730Z
generated_at: 2026-06-22T14:03:05.730Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document v1.4 predates DLA-X5900/RS440 (2017) by 6 years; model is not in the FOR MODELS list. Confidence reduced accordingly."
  - "source contains no explicit safety warnings, interlocks, or"
  - "firmware version compatibility not stated; DLA-X5900/RS440 not in source FOR MODELS list; LAN support for X5900/RS440 inferred from atrus05."
verification:
  verdict: verified
  checked_at: 2026-06-22T14:03:05.730Z
  matched_actions: 309
  action_count: 309
  confidence: medium
  summary: "All 309 spec actions verified against source; every hex command literal found; transport parameters confirmed. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# JVC KENWOOD DLA-X5900_RS440 Control Spec

## Summary
D-ILA projector control spec covering RS-232C serial and LAN TCP/IP control. Source document is JVC's "RS-232C, LAN and Infrared Remote Control Guide" v1.4 which lists DLA-HD350 through DLA-RS65; DLA-X5900/DLA-RS440 (2017) is not explicitly named in the document but the atrus05 GitHub project "JVCProjectorControl" confirms the X5900 uses the identical hex protocol on TCP port 20554.

<!-- UNRESOLVED: source document v1.4 predates DLA-X5900/RS440 (2017) by 6 years; model is not in the FOR MODELS list. Confidence reduced accordingly. -->

## Transport
```yaml
# Source documents both RS-232C (19200 bps, 8N1) and LAN (TCP port 20554).
# LAN handshake: Controller connects, projector replies "PJ_OK", controller
# sends "PJREQ" within 5s, projector replies "PJACK", controller sends
# command within 5s. Connection closes 5s after command response.
protocols:
  - serial
  - tcp
addressing:
  port: 20554  # source: "request a TCP/IP connection ... on Port 20554"
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
powerable:    # inferred from power on/off commands present
queryable:    # inferred from power/input/gamma/model status enquiry commands
routable:     # inferred from input-switching commands
```

## Actions
```yaml
# All commands from source. Hex format: Header 21 | UnitID 89 01 | Cmd | Data | End 0A.
# Header values: 21=Op, 3F=Enquiry, 06=Basic Ack, 40=Detailed Ack.

# --- Direct Commands: POWER ---
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

# --- Direct Commands: INPUT SWITCHING ---
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

- id: input_previous
  label: Input Previous
  kind: action
  command: "21 89 01 49 50 2D 0A"
  params: []

# --- Direct Commands: TEST PATTERNS ---
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
  label: Test Pattern Stairstep (B/W)
  kind: action
  command: "21 89 01 54 53 36 0A"
  params: []

- id: test_pattern_stairstep_red
  label: Test Pattern Stairstep (Red)
  kind: action
  command: "21 89 01 54 53 37 0A"
  params: []

- id: test_pattern_stairstep_green
  label: Test Pattern Stairstep (Green)
  kind: action
  command: "21 89 01 54 53 38 0A"
  params: []

- id: test_pattern_stairstep_blue
  label: Test Pattern Stairstep (Blue)
  kind: action
  command: "21 89 01 54 53 39 0A"
  params: []

- id: test_pattern_crosshatch_green
  label: Test Pattern Crosshatch (Green)
  kind: action
  command: "21 89 01 54 53 41 0A"
  params: []

# --- Direct Commands: GAMMA TABLE ---
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

# --- Direct Commands: GAMMA VALUE ---
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

# --- Direct Commands: OFF TIMER ---
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

# --- Direct Commands: LAMP POWER ---
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

# --- Direct Commands: INFRARED REMOTE CODE ---
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

# --- Direct Commands: TRIGGER OUTPUT ---
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

# --- Direct Commands: CLEAR MOTION DRIVE ---
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

# --- Direct Commands: ANAMORPHIC ---
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

# --- Direct Commands: PICTURE MODE (X30/X70/X90/RS45/RS55/RS65 variant) ---
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

# --- Direct Commands: COLOUR PROFILE ---
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

# --- Direct Commands: 3D FORMAT ---
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

- id: 3d_format_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  command: "21 89 01 49 53 33 44 34 0A"
  params: []

# --- Direct Commands: 2D to 3D CONVERSION ---
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

# --- Direct Commands: 3D SUBTITLE CORRECTION ---
- id: 3d_subtitle_off
  label: 3D Subtitle Correction Off
  kind: action
  command: "21 89 01 49 53 33 54 31 0A"
  params: []

- id: 3d_subtitle_on
  label: 3D Subtitle Correction On
  kind: action
  command: "21 89 01 49 53 33 54 30 0A"
  params: []

# --- Direct Commands: LENS MEMORY ---
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

# --- Direct Commands: TEST (null command) ---
- id: null_command
  label: Null Command (test communication)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

# --- Status Enquiry Commands ---
- id: power_status_query
  label: Power Status Enquiry
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []
  response: "06 89 01 50 57 0A 40 89 01 50 57 {RR} 0A"

- id: input_status_query
  label: Input Status Enquiry
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []
  response: "06 89 01 49 50 0A 40 89 01 49 50 {RR} 0A"

- id: gamma_table_query
  label: Gamma Table Enquiry
  kind: query
  command: "3F 89 01 47 54 0A"
  params: []
  response: "06 89 01 47 54 0A 40 89 01 47 54 {RR} 0A"

- id: gamma_value_query
  label: Gamma Value Enquiry
  kind: query
  command: "3F 89 01 47 50 0A"
  params: []
  response: "06 89 01 47 50 0A 40 89 01 47 50 {RR} 0A"

- id: source_status_query
  label: Source Status Enquiry
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []
  response: "06 89 01 53 43 0A 40 89 01 53 43 {RR} 0A"

- id: model_status_query
  label: Model Status Enquiry
  kind: query
  command: "3F 89 01 4D 44 0A"
  params: []
  response: "06 89 01 4D 44 0A 40 89 01 4D 44 {RR} 0A"

# --- Remote Control Emulation: Navigation ---
- id: cursor_up
  label: Cursor Up
  kind: action
  command: "21 89 01 52 43 37 33 30 31 0A"
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  command: "21 89 01 52 43 37 33 30 32 0A"
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  command: "21 89 01 52 43 37 33 33 36 0A"
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  command: "21 89 01 52 43 37 33 33 34 0A"
  params: []

- id: ok
  label: OK
  kind: action
  command: "21 89 01 52 43 37 33 32 46 0A"
  params: []

- id: back
  label: Back
  kind: action
  command: "21 89 01 52 43 37 33 30 33 0A"
  params: []

- id: menu_toggle
  label: Menu Toggle
  kind: action
  command: "21 89 01 52 43 37 33 32 45 0A"
  params: []

- id: information
  label: Information
  kind: action
  command: "21 89 01 52 43 37 33 37 34 0A"
  params: []

# --- Remote Control Emulation: Power (send twice with short delay for off) ---
- id: rc_power_on
  label: RC Power On
  kind: action
  command: "21 89 01 52 43 37 33 30 35 0A"
  params: []

- id: rc_power_off
  label: RC Power Off (send twice)
  kind: action
  command: "21 89 01 52 43 37 33 30 36 0A"
  params: []
  notes: "Source says: send twice with short delay between to switch off"

# --- Remote Control Emulation: Aspect / Image Adjust ---
- id: aspect_16_9
  label: Aspect 16:9
  kind: action
  command: "21 89 01 52 43 37 33 32 36 0A"
  params: []

- id: aspect_4_3
  label: Aspect 4:3
  kind: action
  command: "21 89 01 52 43 37 33 32 35 0A"
  params: []

- id: aspect_zoom
  label: Aspect Zoom
  kind: action
  command: "21 89 01 52 43 37 33 32 37 0A"
  params: []

- id: aspect_pc_auto
  label: Aspect PC Auto
  kind: action
  command: "21 89 01 52 43 37 33 41 45 0A"
  params: []

- id: aspect_pc_full
  label: Aspect PC Full
  kind: action
  command: "21 89 01 52 43 37 33 42 30 0A"
  params: []

- id: aspect_pc_just
  label: Aspect PC Just
  kind: action
  command: "21 89 01 52 43 37 33 41 46 0A"
  params: []

- id: aspect_cycle
  label: Aspect Cycle (all modes)
  kind: action
  command: "21 89 01 52 43 37 33 37 37 0A"
  params: []

# --- Remote Control Emulation: Image Adjustments ---
- id: brightness_up
  label: Brightness +
  kind: action
  command: "21 89 01 52 43 37 33 37 41 0A"
  params: []

- id: brightness_down
  label: Brightness -
  kind: action
  command: "21 89 01 52 43 37 33 37 42 0A"
  params: []

- id: contrast_up
  label: Contrast +
  kind: action
  command: "21 89 01 52 43 37 33 37 38 0A"
  params: []

- id: contrast_down
  label: Contrast -
  kind: action
  command: "21 89 01 52 43 37 33 37 39 0A"
  params: []

- id: colour_up
  label: Colour +
  kind: action
  command: "21 89 01 52 43 37 33 37 43 0A"
  params: []

- id: colour_down
  label: Colour -
  kind: action
  command: "21 89 01 52 43 37 33 37 44 0A"
  params: []

- id: sharpness_up
  label: Sharpness +
  kind: action
  command: "21 89 01 52 43 37 33 37 45 0A"
  params: []

- id: sharpness_down
  label: Sharpness -
  kind: action
  command: "21 89 01 52 43 37 33 37 46 0A"
  params: []

- id: tint_up
  label: Tint +
  kind: action
  command: "21 89 01 52 43 37 33 39 38 0A"
  params: []

- id: tint_down
  label: Tint -
  kind: action
  command: "21 89 01 52 43 37 33 39 39 0A"
  params: []

- id: detail_enhance_up
  label: Detail Enhance +
  kind: action
  command: "21 89 01 52 43 37 33 31 31 0A"
  params: []

- id: detail_enhance_down
  label: Detail Enhance -
  kind: action
  command: "21 89 01 52 43 37 33 31 32 0A"
  params: []

- id: bnr_off
  label: BNR Off
  kind: action
  command: "21 89 01 52 43 37 33 31 30 0A"
  params: []

- id: bnr_on
  label: BNR On
  kind: action
  command: "21 89 01 52 43 37 33 30 46 0A"
  params: []

- id: mnr_up
  label: MNR +
  kind: action
  command: "21 89 01 52 43 37 33 30 44 0A"
  params: []

- id: mnr_down
  label: MNR -
  kind: action
  command: "21 89 01 52 43 37 33 30 45 0A"
  params: []

- id: rnr_up
  label: RNR +
  kind: action
  command: "21 89 01 52 43 37 33 30 42 0A"
  params: []

- id: rnr_down
  label: RNR -
  kind: action
  command: "21 89 01 52 43 37 33 30 43 0A"
  params: []

# --- Remote Control Emulation: Lens Control ---
- id: lens_focus_up
  label: Lens Focus +
  kind: action
  command: "21 89 01 52 43 37 33 33 31 0A"
  params: []

- id: lens_focus_down
  label: Lens Focus -
  kind: action
  command: "21 89 01 52 43 37 33 33 32 0A"
  params: []

- id: lens_zoom_in
  label: Lens Zoom In
  kind: action
  command: "21 89 01 52 43 37 33 33 35 0A"
  params: []

- id: lens_zoom_out
  label: Lens Zoom Out
  kind: action
  command: "21 89 01 52 43 37 33 33 37 0A"
  params: []

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  command: "21 89 01 52 43 37 33 32 31 0A"
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  command: "21 89 01 52 43 37 33 32 32 0A"
  params: []

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  command: "21 89 01 52 43 37 33 34 34 0A"
  params: []

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  command: "21 89 01 52 43 37 33 34 33 0A"
  params: []

- id: lens_aperture_up
  label: Lens Aperture +
  kind: action
  command: "21 89 01 52 43 37 33 31 45 0A"
  params: []

- id: lens_aperture_down
  label: Lens Aperture -
  kind: action
  command: "21 89 01 52 43 37 33 31 46 0A"
  params: []

- id: lens_aperture_1
  label: Lens Aperture 1
  kind: action
  command: "21 89 01 52 43 37 33 32 38 0A"
  params: []

- id: lens_aperture_2
  label: Lens Aperture 2
  kind: action
  command: "21 89 01 52 43 37 33 32 39 0A"
  params: []

- id: lens_aperture_3
  label: Lens Aperture 3
  kind: action
  command: "21 89 01 52 43 37 33 32 41 0A"
  params: []

- id: lens_control_cycle
  label: Lens Control Cycle
  kind: action
  command: "21 89 01 52 43 37 33 33 30 0A"
  params: []

- id: auto_lens_centre
  label: Auto Lens Centre
  kind: action
  command: "21 89 01 52 43 37 33 43 39 0A"
  params: []

- id: lens_memory_1
  label: Lens Memory 1
  kind: action
  command: "21 89 01 52 43 37 33 44 38 0A"
  params: []

- id: lens_memory_2
  label: Lens Memory 2
  kind: action
  command: "21 89 01 52 43 37 33 44 39 0A"
  params: []

- id: lens_memory_3
  label: Lens Memory 3
  kind: action
  command: "21 89 01 52 43 37 33 44 41 0A"
  params: []

- id: lens_memory_cycle
  label: Lens Memory Cycle
  kind: action
  command: "21 89 01 52 43 37 33 44 34 0A"
  params: []

# --- Remote Control Emulation: Shutter / Hide ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "21 89 01 52 43 37 33 31 39 0A"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "21 89 01 52 43 37 33 31 41 0A"
  params: []

- id: shutter_on
  label: Shutter On (sync with Hide)
  kind: action
  command: "21 89 01 52 43 37 33 32 43 0A"
  params: []

- id: shutter_off
  label: Shutter Off (unsync from Hide)
  kind: action
  command: "21 89 01 52 43 37 33 32 44 0A"
  params: []

- id: hide_on
  label: Hide On
  kind: action
  command: "21 89 01 52 43 37 33 44 30 0A"
  params: []

- id: hide_off
  label: Hide Off
  kind: action
  command: "21 89 01 52 43 37 33 44 31 0A"
  params: []

- id: hide_toggle
  label: Hide Toggle
  kind: action
  command: "21 89 01 52 43 37 33 31 44 0A"
  params: []

# --- Remote Control Emulation: Picture Mode (RC variant) ---
- id: rc_picture_mode_film
  label: Picture Mode Film (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 39 0A"
  params: []

- id: rc_picture_mode_cinema
  label: Picture Mode Cinema (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 38 0A"
  params: []

- id: rc_picture_mode_animation
  label: Picture Mode Animation (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 36 0A"
  params: []

- id: rc_picture_mode_3d
  label: Picture Mode 3D (RC)
  kind: action
  command: "21 89 01 52 43 37 33 38 37 0A"
  params: []

- id: rc_picture_mode_dynamic
  label: Picture Mode Dynamic (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 42 0A"
  params: []

- id: rc_picture_mode_natural
  label: Picture Mode Natural (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 41 0A"
  params: []

- id: rc_picture_mode_stage
  label: Picture Mode Stage (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 37 0A"
  params: []

- id: rc_picture_mode_thx
  label: Picture Mode THX (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 46 0A"
  params: []

- id: rc_picture_mode_user1
  label: Picture Mode User 1 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 43 0A"
  params: []

- id: rc_picture_mode_user2
  label: Picture Mode User 2 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 44 0A"
  params: []

- id: rc_picture_mode_user3
  label: Picture Mode User 3 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 36 45 0A"
  params: []

- id: rc_picture_mode_user4
  label: Picture Mode User 4 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 43 41 0A"
  params: []

- id: rc_picture_mode_user5
  label: Picture Mode User 5 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 43 42 0A"
  params: []

# --- Remote Control Emulation: Gamma (RC) ---
- id: rc_gamma_normal
  label: Gamma Normal (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 38 0A"
  params: []

- id: rc_gamma_a
  label: Gamma A (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 39 0A"
  params: []

- id: rc_gamma_b
  label: Gamma B (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 41 0A"
  params: []

- id: rc_gamma_c
  label: Gamma C (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 42 0A"
  params: []

- id: rc_gamma_custom1
  label: Gamma Custom 1 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 43 0A"
  params: []

- id: rc_gamma_custom2
  label: Gamma Custom 2 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 44 0A"
  params: []

- id: rc_gamma_custom3
  label: Gamma Custom 3 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 45 0A"
  params: []

- id: rc_gamma_d
  label: Gamma D (RC)
  kind: action
  command: "21 89 01 52 43 37 33 33 46 0A"
  params: []

- id: gamma_cycle
  label: Gamma Cycle
  kind: action
  command: "21 89 01 52 43 37 33 37 35 0A"
  params: []

# --- Remote Control Emulation: Anamorphic / Vertical Stretch ---
- id: rc_anamorphic_off
  label: Anamorphic Off (RC)
  kind: action
  command: "21 89 01 52 43 37 33 32 34 0A"
  params: []

- id: rc_anamorphic_a
  label: Anamorphic A (RC)
  kind: action
  command: "21 89 01 52 43 37 33 32 33 0A"
  params: []

- id: rc_anamorphic_b
  label: Anamorphic B (RC)
  kind: action
  command: "21 89 01 52 43 37 33 32 42 0A"
  params: []

- id: anamorphic_cycle
  label: Anamorphic Cycle
  kind: action
  command: "21 89 01 52 43 37 33 43 35 0A"
  params: []

# --- Remote Control Emulation: Clear Motion Drive (RC) ---
- id: rc_cmd_off
  label: Clear Motion Drive Off (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 37 0A"
  params: []

- id: rc_cmd_mode1
  label: Clear Motion Drive Mode 1 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 43 45 0A"
  params: []

- id: rc_cmd_mode2
  label: Clear Motion Drive Mode 2 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 43 46 0A"
  params: []

- id: rc_cmd_mode3
  label: Clear Motion Drive Mode 3 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 38 0A"
  params: []

- id: rc_cmd_mode4
  label: Clear Motion Drive Mode 4 (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 39 0A"
  params: []

- id: rc_cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 41 0A"
  params: []

- id: cmd_cycle
  label: Clear Motion Drive Cycle
  kind: action
  command: "21 89 01 52 43 37 33 38 41 0A"
  params: []

# --- Remote Control Emulation: Colour Management ---
- id: colour_management_off
  label: Colour Management Off
  kind: action
  command: "21 89 01 52 43 37 33 36 30 0A"
  params: []

- id: colour_management_custom1
  label: Colour Management Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 36 31 0A"
  params: []

- id: colour_management_custom2
  label: Colour Management Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 36 32 0A"
  params: []

- id: colour_management_custom3
  label: Colour Management Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 36 33 0A"
  params: []

- id: colour_management_cycle
  label: Colour Management Cycle
  kind: action
  command: "21 89 01 52 43 37 33 38 39 0A"
  params: []

- id: colour_profile_cycle
  label: Colour Profile Cycle
  kind: action
  command: "21 89 01 52 43 37 33 38 38 0A"
  params: []

# --- Remote Control Emulation: Colour Temperature ---
- id: colour_temp_5800k
  label: Colour Temperature 5800K
  kind: action
  command: "21 89 01 52 43 37 33 34 45 0A"
  params: []

- id: colour_temp_6500k
  label: Colour Temperature 6500K
  kind: action
  command: "21 89 01 52 43 37 33 34 46 0A"
  params: []

- id: colour_temp_7500k
  label: Colour Temperature 7500K
  kind: action
  command: "21 89 01 52 43 37 33 35 30 0A"
  params: []

- id: colour_temp_9300k
  label: Colour Temperature 9300K
  kind: action
  command: "21 89 01 52 43 37 33 35 31 0A"
  params: []

- id: colour_temp_custom1
  label: Colour Temperature Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 35 33 0A"
  params: []

- id: colour_temp_custom2
  label: Colour Temperature Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 35 34 0A"
  params: []

- id: colour_temp_custom3
  label: Colour Temperature Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 35 35 0A"
  params: []

- id: colour_temp_high_bright
  label: Colour Temperature High Bright
  kind: action
  command: "21 89 01 52 43 37 33 35 32 0A"
  params: []

- id: colour_temp_cycle
  label: Colour Temperature Cycle
  kind: action
  command: "21 89 01 52 43 37 33 37 36 0A"
  params: []

# --- Remote Control Emulation: ISF / THX Modes ---
- id: isf_off
  label: ISF Off
  kind: action
  command: "21 89 01 52 43 37 33 35 41 0A"
  params: []

- id: isf_on
  label: ISF On
  kind: action
  command: "21 89 01 52 43 37 33 35 42 0A"
  params: []

- id: isf_day
  label: ISF Day
  kind: action
  command: "21 89 01 52 43 37 33 36 34 0A"
  params: []

- id: isf_night
  label: ISF Night
  kind: action
  command: "21 89 01 52 43 37 33 36 35 0A"
  params: []

- id: thx_on
  label: THX On
  kind: action
  command: "21 89 01 52 43 37 33 43 38 0A"
  params: []

- id: thx_off
  label: THX Off
  kind: action
  command: "21 89 01 52 43 37 33 43 37 0A"
  params: []

- id: thx_bright
  label: THX Bright
  kind: action
  command: "21 89 01 52 43 37 33 38 35 0A"
  params: []

- id: thx_dark
  label: THX Dark
  kind: action
  command: "21 89 01 52 43 37 33 38 36 0A"
  params: []

# --- Remote Control Emulation: 3D / HDMI ---
- id: cec_on
  label: CEC On
  kind: action
  command: "21 89 01 52 43 37 33 35 36 0A"
  params: []

- id: cec_off
  label: CEC Off
  kind: action
  command: "21 89 01 52 43 37 33 35 37 0A"
  params: []

- id: 3d_setting_menu
  label: 3D Setting Menu
  kind: action
  command: "21 89 01 52 43 37 33 44 35 0A"
  params: []

- id: 3d_format_cycle
  label: 3D Format Cycle
  kind: action
  command: "21 89 01 52 43 37 33 44 36 0A"
  params: []

- id: picture_adjust_menu
  label: Picture Adjust Menu
  kind: action
  command: "21 89 01 52 43 37 33 37 32 0A"
  params: []

- id: advanced_menu
  label: Advanced Menu
  kind: action
  command: "21 89 01 52 43 37 33 37 33 0A"
  params: []

- id: test_pattern_cycle
  label: Test Pattern Cycle
  kind: action
  command: "21 89 01 52 43 37 33 35 39 0A"
  params: []
- id: mask_bottom_increase
  label: Mask Bottom +
  kind: action
  command: "21 89 01 52 43 37 33 42 37 0A"
  params: []

- id: mask_bottom_decrease
  label: Mask Bottom -
  kind: action
  command: "21 89 01 52 43 37 33 42 38 0A"
  params: []

- id: mask_left_increase
  label: Mask Left +
  kind: action
  command: "21 89 01 52 43 37 33 42 31 0A"
  params: []

- id: mask_left_decrease
  label: Mask Left -
  kind: action
  command: "21 89 01 52 43 37 33 42 32 0A"
  params: []

- id: mask_right_increase
  label: Mask Right +
  kind: action
  command: "21 89 01 52 43 37 33 42 33 0A"
  params: []

- id: mask_right_decrease
  label: Mask Right -
  kind: action
  command: "21 89 01 52 43 37 33 42 34 0A"
  params: []

- id: mask_top_increase
  label: Mask Top +
  kind: action
  command: "21 89 01 52 43 37 33 42 35 0A"
  params: []

- id: mask_top_decrease
  label: Mask Top -
  kind: action
  command: "21 89 01 52 43 37 33 42 36 0A"
  params: []

- id: cti_off
  label: CTI Off
  kind: action
  command: "21 89 01 52 43 37 33 35 43 0A"
  params: []

- id: cti_low
  label: CTI Low
  kind: action
  command: "21 89 01 52 43 37 33 35 44 0A"
  params: []

- id: cti_middle
  label: CTI Middle
  kind: action
  command: "21 89 01 52 43 37 33 35 45 0A"
  params: []

- id: cti_high
  label: CTI High
  kind: action
  command: "21 89 01 52 43 37 33 35 46 0A"
  params: []

- id: keystone_h_increase
  label: Keystone Correction Horizontal +
  kind: action
  command: "21 89 01 52 43 37 33 34 30 0A"
  params: []

- id: keystone_h_decrease
  label: Keystone Correction Horizontal -
  kind: action
  command: "21 89 01 52 43 37 33 34 31 0A"
  params: []

- id: keystone_v_increase
  label: Keystone Correction Vertical +
  kind: action
  command: "21 89 01 52 43 37 33 31 42 0A"
  params: []

- id: keystone_v_decrease
  label: Keystone Correction Vertical -
  kind: action
  command: "21 89 01 52 43 37 33 31 43 0A"
  params: []

- id: phase_increase
  label: Phase +
  kind: action
  command: "21 89 01 52 43 37 33 41 38 0A"
  params: []

- id: phase_decrease
  label: Phase -
  kind: action
  command: "21 89 01 52 43 37 33 41 39 0A"
  params: []

- id: tracking_increase
  label: Tracking +
  kind: action
  command: "21 89 01 52 43 37 33 41 36 0A"
  params: []

- id: tracking_decrease
  label: Tracking -
  kind: action
  command: "21 89 01 52 43 37 33 41 37 0A"
  params: []

- id: horizontal_position_increase
  label: Horizontal Position +
  kind: action
  command: "21 89 01 52 43 37 33 41 41 0A"
  params: []

- id: horizontal_position_decrease
  label: Horizontal Position -
  kind: action
  command: "21 89 01 52 43 37 33 41 42 0A"
  params: []

- id: vertical_position_increase
  label: Vertical Position +
  kind: action
  command: "21 89 01 52 43 37 33 41 43 0A"
  params: []

- id: vertical_position_decrease
  label: Vertical Position -
  kind: action
  command: "21 89 01 52 43 37 33 41 44 0A"
  params: []

- id: screen_adjust_off
  label: Screen Adjust Off
  kind: action
  command: "21 89 01 52 43 37 33 38 30 0A"
  params: []

- id: screen_adjust_a
  label: Screen Adjust A
  kind: action
  command: "21 89 01 52 43 37 33 38 31 0A"
  params: []

- id: screen_adjust_b
  label: Screen Adjust B
  kind: action
  command: "21 89 01 52 43 37 33 38 32 0A"
  params: []

- id: screen_adjust_c
  label: Screen Adjust C
  kind: action
  command: "21 89 01 52 43 37 33 38 33 0A"
  params: []

- id: user_cycle
  label: User Cycle
  kind: action
  command: "21 89 01 52 43 37 33 44 37 0A"
  params: []

- id: bright_level_increase
  label: Bright Level +
  kind: action
  command: "21 89 01 52 43 37 33 41 32 0A"
  params: []

- id: bright_level_decrease
  label: Bright Level -
  kind: action
  command: "21 89 01 52 43 37 33 41 33 0A"
  params: []

- id: dark_level_increase
  label: Dark Level +
  kind: action
  command: "21 89 01 52 43 37 33 41 34 0A"
  params: []

- id: dark_level_decrease
  label: Dark Level -
  kind: action
  command: "21 89 01 52 43 37 33 41 35 0A"
  params: []

- id: picture_tone_white_increase
  label: Picture Tone White +
  kind: action
  command: "21 89 01 52 43 37 33 39 41 0A"
  params: []

- id: picture_tone_white_decrease
  label: Picture Tone White -
  kind: action
  command: "21 89 01 52 43 37 33 39 42 0A"
  params: []

- id: picture_tone_red_increase
  label: Picture Tone Red +
  kind: action
  command: "21 89 01 52 43 37 33 39 43 0A"
  params: []

- id: picture_tone_red_decrease
  label: Picture Tone Red -
  kind: action
  command: "21 89 01 52 43 37 33 39 44 0A"
  params: []

- id: picture_tone_green_increase
  label: Picture Tone Green +
  kind: action
  command: "21 89 01 52 43 37 33 39 45 0A"
  params: []

- id: picture_tone_green_decrease
  label: Picture Tone Green -
  kind: action
  command: "21 89 01 52 43 37 33 39 46 0A"
  params: []

- id: picture_tone_blue_increase
  label: Picture Tone Blue +
  kind: action
  command: "21 89 01 52 43 37 33 41 30 0A"
  params: []

- id: picture_tone_blue_decrease
  label: Picture Tone Blue -
  kind: action
  command: "21 89 01 52 43 37 33 41 31 0A"
  params: []

- id: colour_space_cycle
  label: Colour Space Cycle
  kind: action
  command: "21 89 01 52 43 37 33 43 44 0A"
  params: []

- id: auto_align
  label: Auto Align
  kind: action
  command: "21 89 01 52 43 37 33 31 33 0A"
  params: []

- id: nr_toggle
  label: NR Toggle
  kind: action
  command: "21 89 01 52 43 37 33 31 38 0A"
  params: []

- id: lens_aperture_adj
  label: Lens Aperture Adj
  kind: action
  command: "21 89 01 52 43 37 33 32 30 0A"
  params: []

- id: brightness_adj
  label: Brightness Adj
  kind: action
  command: "21 89 01 52 43 37 33 30 39 0A"
  params: []

- id: contrast_adj
  label: Contrast Adj
  kind: action
  command: "21 89 01 52 43 37 33 30 41 0A"
  params: []

- id: colour_adj
  label: Colour Adj
  kind: action
  command: "21 89 01 52 43 37 33 31 35 0A"
  params: []

- id: sharpness_adj
  label: Sharpness Adj
  kind: action
  command: "21 89 01 52 43 37 33 31 34 0A"
  params: []

- id: tint_adj
  label: Tint Adj
  kind: action
  command: "21 89 01 52 43 37 33 31 36 0A"
  params: []

- id: menu_position
  label: Menu Position
  kind: action
  command: "21 89 01 52 43 37 33 34 32 0A"
  params: []

- id: rc_input_component
  label: Input Component (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 44 0A"
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

- id: rc_input_pc
  label: Input PC (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 36 0A"
  params: []

- id: rc_input_svideo
  label: Input S-Video (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 43 0A"
  params: []

- id: rc_input_video
  label: Input Video (RC)
  kind: action
  command: "21 89 01 52 43 37 33 34 42 0A"
  params: []

- id: rc_input_cycle
  label: Input Cycle (RC)
  kind: action
  command: "21 89 01 52 43 37 33 30 38 0A"
  params: []

- id: colour_temp_gain_red_increase
  label: Colour Temperature Gain Red +
  kind: action
  command: "21 89 01 52 43 37 33 38 43 0A"
  params: []

- id: colour_temp_gain_red_decrease
  label: Colour Temperature Gain Red -
  kind: action
  command: "21 89 01 52 43 37 33 38 44 0A"
  params: []

- id: colour_temp_gain_green_increase
  label: Colour Temperature Gain Green +
  kind: action
  command: "21 89 01 52 43 37 33 38 45 0A"
  params: []

- id: colour_temp_gain_green_decrease
  label: Colour Temperature Gain Green -
  kind: action
  command: "21 89 01 52 43 37 33 38 46 0A"
  params: []

- id: colour_temp_gain_blue_increase
  label: Colour Temperature Gain Blue +
  kind: action
  command: "21 89 01 52 43 37 33 39 30 0A"
  params: []

- id: colour_temp_gain_blue_decrease
  label: Colour Temperature Gain Blue -
  kind: action
  command: "21 89 01 52 43 37 33 39 31 0A"
  params: []

- id: colour_temp_offset_red_increase
  label: Colour Temperature Offset Red +
  kind: action
  command: "21 89 01 52 43 37 33 39 32 0A"
  params: []

- id: colour_temp_offset_red_decrease
  label: Colour Temperature Offset Red -
  kind: action
  command: "21 89 01 52 43 37 33 39 33 0A"
  params: []

- id: colour_temp_offset_green_increase
  label: Colour Temperature Offset Green +
  kind: action
  command: "21 89 01 52 43 37 33 39 34 0A"
  params: []

- id: colour_temp_offset_green_decrease
  label: Colour Temperature Offset Green -
  kind: action
  command: "21 89 01 52 43 37 33 39 35 0A"
  params: []

- id: colour_temp_offset_blue_increase
  label: Colour Temperature Offset Blue +
  kind: action
  command: "21 89 01 52 43 37 33 39 36 0A"
  params: []

- id: colour_temp_offset_blue_decrease
  label: Colour Temperature Offset Blue -
  kind: action
  command: "21 89 01 52 43 37 33 39 37 0A"
  params: []

- id: pixel_shift_h_red_increase
  label: Pixel Shift Horizontal Red +
  kind: action
  command: "21 89 01 52 43 37 33 42 39 0A"
  params: []

- id: pixel_shift_h_red_decrease
  label: Pixel Shift Horizontal Red -
  kind: action
  command: "21 89 01 52 43 37 33 42 41 0A"
  params: []

- id: pixel_shift_h_green_increase
  label: Pixel Shift Horizontal Green +
  kind: action
  command: "21 89 01 52 43 37 33 42 42 0A"
  params: []

- id: pixel_shift_h_green_decrease
  label: Pixel Shift Horizontal Green -
  kind: action
  command: "21 89 01 52 43 37 33 42 43 0A"
  params: []

- id: pixel_shift_h_blue_increase
  label: Pixel Shift Horizontal Blue +
  kind: action
  command: "21 89 01 52 43 37 33 42 44 0A"
  params: []

- id: pixel_shift_h_blue_decrease
  label: Pixel Shift Horizontal Blue -
  kind: action
  command: "21 89 01 52 43 37 33 42 45 0A"
  params: []

- id: pixel_shift_v_red_increase
  label: Pixel Shift Vertical Red +
  kind: action
  command: "21 89 01 52 43 37 33 42 46 0A"
  params: []

- id: pixel_shift_v_red_decrease
  label: Pixel Shift Vertical Red -
  kind: action
  command: "21 89 01 52 43 37 33 43 30 0A"
  params: []

- id: pixel_shift_v_green_increase
  label: Pixel Shift Vertical Green +
  kind: action
  command: "21 89 01 52 43 37 33 43 31 0A"
  params: []

- id: pixel_shift_v_green_decrease
  label: Pixel Shift Vertical Green -
  kind: action
  command: "21 89 01 52 43 37 33 43 32 0A"
  params: []

- id: pixel_shift_v_blue_increase
  label: Pixel Shift Vertical Blue +
  kind: action
  command: "21 89 01 52 43 37 33 43 33 0A"
  params: []

- id: pixel_shift_v_blue_decrease
  label: Pixel Shift Vertical Blue -
  kind: action
  command: "21 89 01 52 43 37 33 43 34 0A"
  params: []
```

## Feedbacks
```yaml
# Acknowledgement responses (basic) - sent by projector on every successful command.
# Format: 06 89 01 CC CC 0A where CC CC is first 2 bytes of command (excluding 21 89 01).

- id: ack_power
  type: bytes
  pattern: "06 89 01 50 57 0A"
  description: "Ack for Power On/Off command"

- id: ack_input_changed
  type: bytes
  pattern: "06 89 01 49 50 0A"
  description: "Ack for input-switching command"

- id: ack_test_pattern
  type: bytes
  pattern: "06 89 01 54 53 0A"
  description: "Ack for test pattern command"

- id: ack_gamma_table
  type: bytes
  pattern: "06 89 01 47 54 0A"
  description: "Ack for gamma table command"

- id: ack_gamma_value
  type: bytes
  pattern: "06 89 01 47 50 0A"
  description: "Ack for gamma value command"

- id: ack_rc_emulation
  type: bytes
  pattern: "06 89 01 52 43 0A"
  description: "Ack for any Remote Control Emulation command"

- id: ack_null_command
  type: bytes
  pattern: "06 89 01 00 00 0A"
  description: "Ack for null (test) command"

# Power Status detailed response codes
- id: power_status_standby
  type: enum
  value: 30
  values: [30]
  description: "Standby"

- id: power_status_power_on
  type: enum
  value: 31
  values: [31]
  description: "Power On"

- id: power_status_cooling
  type: enum
  value: 32
  values: [32]
  description: "Cooling"

- id: power_status_emergency
  type: enum
  value: 34
  values: [34]
  description: "Emergency"

# Input Status detailed response codes
- id: input_status_svideo
  type: enum
  value: 30
  description: "S-Video"

- id: input_status_video
  type: enum
  value: 31
  description: "Video"

- id: input_status_component
  type: enum
  value: 32
  description: "Component"

- id: input_status_pc
  type: enum
  value: 33
  description: "PC"

- id: input_status_hdmi1
  type: enum
  value: 36
  description: "HDMI 1"

- id: input_status_hdmi2
  type: enum
  value: 37
  description: "HDMI 2"

# LAN handshake responses
- id: lan_pj_ok
  type: bytes
  pattern: "PJ_OK"
  description: "Projector LAN handshake step 2 - confirms availability"

- id: lan_pj_ack
  type: bytes
  pattern: "PJACK"
  description: "Projector LAN handshake step 4 - ready to accept command"
```

## Variables
```yaml
# Populated from source - source explicitly documents the values these settable
# parameters can take.

- id: off_timer_hours
  type: integer
  description: "Off timer hours"
  values: [0, 1, 2, 3, 4]
  source_actions: [off_timer_off, off_timer_1h, off_timer_2h, off_timer_3h, off_timer_4h]

- id: lamp_power
  type: enum
  description: "Lamp power mode"
  values: [normal, high]
  source_actions: [lamp_power_normal, lamp_power_high]

- id: trigger_mode
  type: enum
  description: "Trigger output mode"
  values: [off, power, anamorphic]
  source_actions: [trigger_off, trigger_on_power, trigger_on_anamorphic]

- id: remote_code
  type: enum
  description: "IR remote code"
  values: [a, b]
  source_actions: [remote_code_a, remote_code_b]

- id: gamma_value
  type: float
  description: "Gamma correction value"
  values: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6]
  default: 2.2
  source_actions: [gamma_value_1_8, gamma_value_1_9, gamma_value_2_0, gamma_value_2_1, gamma_value_2_2, gamma_value_2_3, gamma_value_2_4, gamma_value_2_5, gamma_value_2_6]

- id: shutter_hide_sync
  type: enum
  description: "Shutter synchronised with Hide function"
  values: [on, off]
  source_actions: [shutter_on, shutter_off]

- id: cec
  type: enum
  description: "CEC enabled"
  values: [on, off]
  source_actions: [cec_on, cec_off]
```

## Events
```yaml
# LAN events from source
- id: lan_connection_response
  description: "Projector sends 'PJ_OK' immediately on TCP connect, then 'PJACK' on 'PJREQ', then closes 5s after command response"
  source_section: "Control Protocol"

# RS-232C ack flow
- id: rs232_command_ack
  description: "Projector returns basic ack (06 89 01 CC CC 0A) within ~tens of ms of receiving a recognised command. For status enquiries, projector also returns detailed response (40 89 01 ... RR 0A) with state code."
  source_section: "Acknowledgement Response Return Codes"
```

## Macros
```yaml
# Power Off via Remote Control Emulation requires sending the RC power-off command twice.
- id: power_off_safe
  description: "RC power off sequence"
  steps:
    - "Send 21 89 01 52 43 37 33 30 36 0A"
    - "Wait short delay (source says 'short delay', no value given)"
    - "Send 21 89 01 52 43 37 33 30 36 0A"

# LAN command session
- id: lan_command_session
  description: "Establish LAN connection, send one command, close"
  steps:
    - "Open TCP connection to projector on port 20554"
    - "Wait for 'PJ_OK' from projector"
    - "Send 'PJREQ' within 5 seconds"
    - "Wait for 'PJACK' from projector"
    - "Send hex command within 5 seconds"
    - "Wait for ack (06 ...) and any detailed response (40 ...)"
    - "Connection closes 5s after command"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or
# power-on sequencing requirements beyond the 50ms break-discard behavior and
# 5s LAN timeout described in the error handling section.
```

## Notes
- Source document v1.4 (2012) predates DLA-X5900/RS440 (2017) by 5+ years. The FOR MODELS list ends at DLA-X90R/DLA-RS65. Per model-name rule, this is a `low` confidence spec.
- The atrus05 GitHub project "JVCProjectorControl" (MIT) is an iOS remote explicitly tested with DLA-X5900, uses identical hex format and TCP port 20554, providing third-party confirmation that the protocol is unchanged for the X5900.
- All commands are 7 or 10 bytes: `21` (header) | `89 01` (fixed unit ID) | 2-byte command | variable data | `0A` (end).
- Enquiry header is `3F`; basic ack from projector is `06`; detailed ack is `40`.
- Serial cable required: cross-connected (null modem / DTE-to-DTE) RS-232 cable. Pin 2 = RX, Pin 3 = TX, Pin 5 = GND. Pins 1, 4, 6-9 unconnected.
- Projector discards any command with a break of 50ms or longer in incoming data — important for serial implementers using delays between bytes.
- LAN control supported on models: DLA-X7, DLA-X9, DLA-X30, DLA-X70, DLA-X90, DLA-RS50, DLA-RS60, DLA-RS45, DLA-RS55, DLA-RS65. DLA-X5900/RS440 LAN support inferred from atrus05 (not stated in this v1.4 doc).
- Default network settings per source: IP 192.168.0.2, Mask 255.255.255.0, Gateway 192.168.0.254, DHCP off.
- For Crestron: append `\r` to commands. For AMX: use `$xx` byte syntax.
<!-- UNRESOLVED: firmware version compatibility not stated; DLA-X5900/RS440 not in source FOR MODELS list; LAN support for X5900/RS440 inferred from atrus05. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - github.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-2360-0Cen/BONDSYvxqkwmjo.php
  - https://github.com/atrus05/JVCProjectorControl
retrieved_at: 2026-06-14T17:43:29.085Z
last_checked_at: 2026-06-22T14:03:05.730Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-22T14:03:05.730Z
matched_actions: 309
action_count: 309
confidence: medium
summary: "All 309 spec actions verified against source; every hex command literal found; transport parameters confirmed. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document v1.4 predates DLA-X5900/RS440 (2017) by 6 years; model is not in the FOR MODELS list. Confidence reduced accordingly."
- "source contains no explicit safety warnings, interlocks, or"
- "firmware version compatibility not stated; DLA-X5900/RS440 not in source FOR MODELS list; LAN support for X5900/RS440 inferred from atrus05."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
