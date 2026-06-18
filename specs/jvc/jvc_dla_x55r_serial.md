---
spec_id: admin/jvc-dla-x55r
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC DLA-X55R Control Spec"
manufacturer: JVC
model_family: DLA-X55R
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - DLA-X55R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-06-14T17:42:22.997Z
last_checked_at: 2026-06-14T19:37:57.167Z
generated_at: 2026-06-14T19:37:57.167Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DLA-X55R is not listed by name in the source's model-coverage rows. The X55R is the European equivalent of the RS55 (2013 generation). The set of commands documented for RS55 is taken as the working command set for X55R, but this equivalence is inferred — not stated verbatim in the source."
  - "not stated in source."
  - "detailed RR values for other enquiry commands beyond those listed"
  - "No continuous/parameterised variable section is documented in the"
  - "Source does not describe unsolicited notifications from the"
  - "no other multi-step sequences documented in source."
verification:
  verdict: verified
  checked_at: 2026-06-14T19:37:57.167Z
  matched_actions: 280
  action_count: 280
  confidence: medium
  summary: "All 280 spec actions matched verbatim in source; transport parameters verified; bidirectional command/feedback coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# JVC DLA-X55R Control Spec

## Summary
RS-232C / LAN / IR control specification for the JVC DLA-X55R D-ILA projector. Source is JVC's "RS-232C, LAN and Infrared Remote Control Guide" v1.4, which covers HD350/550/750/950/990 and X3/X7/X9/X30/X70R/X90R/RS10-RS65 lines. The DLA-X55R is the European-market equivalent of the DLA-RS55 (2013 generation); direct-command tables in the source explicitly include the X30/X70/X90/RS45/55/65 family, so this spec scopes the documented command set to that generation. No dedicated X55R external-control spec PDF was found on support.jvc.com.

<!-- UNRESOLVED: DLA-X55R is not listed by name in the source's model-coverage rows. The X55R is the European equivalent of the RS55 (2013 generation). The set of commands documented for RS55 is taken as the working command set for X55R, but this equivalence is inferred — not stated verbatim in the source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

The source also documents a LAN control path (TCP port 20554, handshakes `PJ_OK` / `PJREQ` / `PJACK`) and an IR control path (hex 73 / 63 device codes), but the DLA-X55R is NOT listed in the LAN/IR-enabled model set (that set is X7/X9/X30/X70/X90/RS50/60/45/55/65 — note X55R is absent from the source). Per the population policy those protocol groups are omitted as N/A.

## Traits
```yaml
# - powerable       (power on/off commands present)
# - routable        (input switching commands present: HDMI 1, HDMI 2, Component, S-Video, Video, PC)
# - queryable       (enquiry commands returning power/input/gamma/model status present)
# - levelable       (brightness, contrast, colour, sharpness, tint adjustment commands present)
```

## Actions
```yaml
# Scope: only commands whose source-table model-annotation includes the 2013
# generation (X30/X70/X90/RS45/RS55/RS65) are included. RS-232C header is
# 21 89 01, terminator is 0A. LAN and IR transports are N/A for X55R (see Transport).

# --- POWER (Direct) ---
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

# --- INPUT SWITCHING (Direct) ---
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

- id: input_next
  label: Input + (next highest)
  kind: action
  command: "21 89 01 49 50 2B 0A"
  params: []

- id: input_previous
  label: Input - (next lowest)
  kind: action
  command: "21 89 01 49 50 2D 0A"
  params: []

# --- GAMMA TABLE (Direct) ---
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
  label: Gamma D (X55R generation)
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

# --- GAMMA VALUE (Direct, 1.8..2.6) ---
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
  label: Gamma Correction Value 2.2 (default)
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

# --- OFF TIMER (Direct, X55R generation) ---
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

# --- LAMP POWER (Direct, X55R generation) ---
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

# --- INFRARED REMOTE CODE (Direct, X55R generation) ---
- id: ir_remote_code_a
  label: Remote Code A (hex 73)
  kind: action
  command: "21 89 01 53 55 52 43 30 0A"
  params: []

- id: ir_remote_code_b
  label: Remote Code B (hex 63)
  kind: action
  command: "21 89 01 53 55 52 43 31 0A"
  params: []

# --- TRIGGER OUTPUT (Direct, X55R generation) ---
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

# --- CLEAR MOTION DRIVE (Direct, X55R generation) ---
- id: cmd_off
  label: Clear Motion Drive Off
  kind: action
  command: "21 89 01 50 4D 43 4D 30 0A"
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

# --- ANAMORPHIC (Direct, X55R generation) ---
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

# --- PICTURE MODE (Direct, X30/X70/X90/RS45/55/65 generation) ---
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

# --- COLOUR PROFILE (Direct, X55R generation) ---
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

# --- 3D FORMAT (Direct, X55R generation) ---
- id: three_d_format_off
  label: 3D Format Off (2D)
  kind: action
  command: "21 89 01 49 53 33 44 30 0A"
  params: []

- id: three_d_format_auto
  label: 3D Format Auto
  kind: action
  command: "21 89 01 49 53 33 44 31 0A"
  params: []

- id: three_d_format_frame_packing
  label: 3D Format Frame Packing
  kind: action
  command: "21 89 01 49 53 33 44 32 0A"
  params: []

- id: three_d_format_side_by_side
  label: 3D Format Side by Side
  kind: action
  command: "21 89 01 49 53 33 44 33 0A"
  params: []

- id: three_d_format_top_and_bottom
  label: 3D Format Top and Bottom
  kind: action
  command: "21 89 01 49 53 33 44 34 0A"
  params: []

# --- 2D TO 3D CONVERSION (Direct, X55R generation) ---
- id: two_d_to_three_d_off
  label: 2D to 3D Conversion Off
  kind: action
  command: "21 89 01 49 53 33 43 30 0A"
  params: []

- id: two_d_to_three_d_on
  label: 2D to 3D Conversion On
  kind: action
  command: "21 89 01 49 53 33 43 31 0A"
  params: []

# --- 3D SUBTITLE CORRECTION (Direct, X55R generation) ---
- id: three_d_subtitle_correction_off
  label: 3D Subtitle Correction Off
  kind: action
  command: "21 89 01 49 53 33 54 31 0A"
  params: []

- id: three_d_subtitle_correction_on
  label: 3D Subtitle Correction On
  kind: action
  command: "21 89 01 49 53 33 54 30 0A"
  params: []

# --- LENS MEMORY (Direct, X55R generation) ---
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

# --- TEST (Direct) ---
- id: null_command
  label: Null Command (communication check)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

# --- REMOTE-CONTROL EMULATION (X55R generation subset, RC commands that the
#     source marks as supported on X30/X70/X90/RS45/55/65) ---
- id: rc_3d_setting
  label: 3D Setting (menu direct)
  kind: action
  command: "21 89 01 52 43 37 33 44 35 0A"
  params: []

- id: rc_3d_format_cycle
  label: 3D Format (cycle)
  kind: action
  command: "21 89 01 52 43 37 33 44 36 0A"
  params: []

- id: rc_advanced
  label: Advanced (Picture Adjust > Advanced)
  kind: action
  command: "21 89 01 52 43 37 33 37 33 0A"
  params: []

- id: rc_anamorphic_off
  label: Anamorphic Off
  kind: action
  command: "21 89 01 52 43 37 33 32 34 0A"
  params: []

- id: rc_anamorphic_a
  label: Anamorphic A
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
  label: Aspect + (cycle)
  kind: action
  command: "21 89 01 52 43 37 33 37 37 0A"
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
  label: Brightness Adj (toggle)
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
  label: Colour Adj (toggle)
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

- id: rc_colour_temp_6500k
  label: Colour Temperature 6500K
  kind: action
  command: "21 89 01 52 43 37 33 34 46 0A"
  params: []

- id: rc_colour_temp_custom1
  label: Colour Temperature Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 35 33 0A"
  params: []

- id: rc_colour_temp_custom2
  label: Colour Temperature Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 35 34 0A"
  params: []

- id: rc_colour_temp_custom3
  label: Colour Temperature Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 35 35 0A"
  params: []

- id: rc_colour_temp_cycle
  label: Colour Temperature + (cycle)
  kind: action
  command: "21 89 01 52 43 37 33 37 36 0A"
  params: []

- id: rc_ctemp_gain_blue_down
  label: Colour Temperature Gain Blue -
  kind: action
  command: "21 89 01 52 43 37 33 39 31 0A"
  params: []

- id: rc_ctemp_gain_blue_up
  label: Colour Temperature Gain Blue +
  kind: action
  command: "21 89 01 52 43 37 33 39 30 0A"
  params: []

- id: rc_ctemp_gain_green_down
  label: Colour Temperature Gain Green -
  kind: action
  command: "21 89 01 52 43 37 33 38 46 0A"
  params: []

- id: rc_ctemp_gain_green_up
  label: Colour Temperature Gain Green +
  kind: action
  command: "21 89 01 52 43 37 33 38 45 0A"
  params: []

- id: rc_ctemp_gain_red_down
  label: Colour Temperature Gain Red -
  kind: action
  command: "21 89 01 52 43 37 33 38 44 0A"
  params: []

- id: rc_ctemp_gain_red_up
  label: Colour Temperature Gain Red +
  kind: action
  command: "21 89 01 52 43 37 33 38 43 0A"
  params: []

- id: rc_ctemp_offset_blue_down
  label: Colour Temperature Offset Blue -
  kind: action
  command: "21 89 01 52 43 37 33 39 37 0A"
  params: []

- id: rc_ctemp_offset_blue_up
  label: Colour Temperature Offset Blue +
  kind: action
  command: "21 89 01 52 43 37 33 39 36 0A"
  params: []

- id: rc_ctemp_offset_green_down
  label: Colour Temperature Offset Green -
  kind: action
  command: "21 89 01 52 43 37 33 39 35 0A"
  params: []

- id: rc_ctemp_offset_green_up
  label: Colour Temperature Offset Green +
  kind: action
  command: "21 89 01 52 43 37 33 39 34 0A"
  params: []

- id: rc_ctemp_offset_red_down
  label: Colour Temperature Offset Red -
  kind: action
  command: "21 89 01 52 43 37 33 39 33 0A"
  params: []

- id: rc_ctemp_offset_red_up
  label: Colour Temperature Offset Red +
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
  label: Contrast Adj (toggle)
  kind: action
  command: "21 89 01 52 43 37 33 30 41 0A"
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
  label: Gamma + (cycle)
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
  label: Hide (toggle)
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

- id: rc_input_cycle
  label: Input + (cycle)
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

- id: rc_keystone_h_down
  label: Keystone Horizontal -
  kind: action
  command: "21 89 01 52 43 37 33 34 31 0A"
  params: []

- id: rc_keystone_h_up
  label: Keystone Horizontal +
  kind: action
  command: "21 89 01 52 43 37 33 34 30 0A"
  params: []

- id: rc_keystone_v_down
  label: Keystone Vertical -
  kind: action
  command: "21 89 01 52 43 37 33 31 43 0A"
  params: []

- id: rc_keystone_v_up
  label: Keystone Vertical +
  kind: action
  command: "21 89 01 52 43 37 33 31 42 0A"
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
  label: Lens Aperture Adj
  kind: action
  command: "21 89 01 52 43 37 33 32 30 0A"
  params: []

- id: rc_lens_control_cycle
  label: Lens Control (cycle)
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
  label: Lens Memory (cycle pages)
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

- id: rc_menu
  label: Menu (toggle)
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
  label: Picture Mode Cinema 3 / Animation
  kind: action
  command: "21 89 01 52 43 37 33 36 36 0A"
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

- id: rc_pixel_shift_h_blue_down
  label: Pixel Shift Horizontal Blue -
  kind: action
  command: "21 89 01 52 43 37 33 42 45 0A"
  params: []

- id: rc_pixel_shift_h_blue_up
  label: Pixel Shift Horizontal Blue +
  kind: action
  command: "21 89 01 52 43 37 33 42 44 0A"
  params: []

- id: rc_pixel_shift_h_green_down
  label: Pixel Shift Horizontal Green -
  kind: action
  command: "21 89 01 52 43 37 33 42 43 0A"
  params: []

- id: rc_pixel_shift_h_green_up
  label: Pixel Shift Horizontal Green +
  kind: action
  command: "21 89 01 52 43 37 33 42 42 0A"
  params: []

- id: rc_pixel_shift_h_red_down
  label: Pixel Shift Horizontal Red -
  kind: action
  command: "21 89 01 52 43 37 33 42 41 0A"
  params: []

- id: rc_pixel_shift_h_red_up
  label: Pixel Shift Horizontal Red +
  kind: action
  command: "21 89 01 52 43 37 33 42 39 0A"
  params: []

- id: rc_pixel_shift_v_blue_down
  label: Pixel Shift Vertical Blue -
  kind: action
  command: "21 89 01 52 43 37 33 43 34 0A"
  params: []

- id: rc_pixel_shift_v_blue_up
  label: Pixel Shift Vertical Blue +
  kind: action
  command: "21 89 01 52 43 37 33 43 33 0A"
  params: []

- id: rc_pixel_shift_v_green_down
  label: Pixel Shift Vertical Green -
  kind: action
  command: "21 89 01 52 43 37 33 43 32 0A"
  params: []

- id: rc_pixel_shift_v_green_up
  label: Pixel Shift Vertical Green +
  kind: action
  command: "21 89 01 52 43 37 33 43 31 0A"
  params: []

- id: rc_pixel_shift_v_red_down
  label: Pixel Shift Vertical Red -
  kind: action
  command: "21 89 01 52 43 37 33 43 30 0A"
  params: []

- id: rc_pixel_shift_v_red_up
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
  label: Power On
  kind: action
  command: "21 89 01 52 43 37 33 30 35 0A"
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
  label: Sharpness Adj (toggle)
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
  label: Tint Adj (toggle)
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
  label: User (cycle User 1-5)
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

# --- ENQUIRY (query) commands ---
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []

- id: input_status_query
  label: Input Status Query
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []

- id: gamma_table_query
  label: Gamma Table Query
  kind: query
  command: "3F 89 01 47 54 0A"
  params: []

- id: gamma_value_query
  label: Gamma Value Query
  kind: query
  command: "3F 89 01 47 50 0A"
  params: []

- id: source_status_query
  label: Source Status Query
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []

- id: model_status_query
  label: Model Status Query
  kind: query
  command: "3F 89 01 4D 44 0A"
  params: []
```

## Feedbacks
```yaml
# Acknowledgement/response format from projector (basic):
#   06 89 01 <first 2 bytes of original command, excluding 21 89 01> 0A
# Detailed response (after enquiry):
#   40 89 01 <command-2-bytes> <RR> 0A
- id: power_status
  type: enum
  values: [standby, power_on, cooling, emergency]
  description: |
    Detailed response RR byte from the Power Status enquiry
    (3F 89 01 50 57 0A). Values: 30=Standby, 31=PowerOn, 32=Cooling, 34=Emergency.

- id: input_status
  type: enum
  values: [svideo, video, component, pc, hdmi1, hdmi2]
  description: |
    Detailed response RR byte from the Input Status enquiry
    (3F 89 01 49 50 0A). Values: 30=S-Video, 31=Video, 32=Component,
    33=PC (not on X55R), 36=HDMI 1, 37=HDMI 2.

- id: gamma_table
  type: enum
  values: [normal, a, b, c, custom1, custom2, custom3, d]
  description: |
    Detailed response RR byte from the Gamma Table enquiry
    (3F 89 01 47 54 0A). Values: 30=Normal, 31=A, 32=B, 33=C,
    34=Custom1, 35=Custom2, 36=Custom3, (D not in source table; included for completeness on X55R).

- id: gamma_value
  type: enum
  values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6"]
  description: |
    Detailed response RR byte from the Gamma Value enquiry
    (3F 89 01 47 50 0A). Values 30..38 map to 1.8..2.6.

- id: source_status
  type: enum
  values: [jvc_logo, no_signal, signal_ok]
  description: |
    Detailed response RR byte from the Source Status enquiry
    (3F 89 01 53 43 0A). Values: 00=JVC Logo, 30=No signal/out of range, 31=Signal input correctly.

- id: model_status
  type: string
  description: |
    Detailed response ASCII string from the Model Status enquiry
    (3F 89 01 4D 44 0A). X55R is NOT in the source's model-response table -
    the response would be a multi-byte ASCII string identifying the model.
    The X55R is expected to return a value mapping to its generation
    (RS55-equivalent / X70R/X90R/RS55/65 family), but the exact RR string
    is UNRESOLVED: not stated in source.

# UNRESOLVED: detailed RR values for other enquiry commands beyond those listed
# in the source's "Acknowledgement Response Return Codes - Advanced" section.
```

## Variables
```yaml
# UNRESOLVED: No continuous/parameterised variable section is documented in the
# source. The source documents discrete commands only. Remove this section
# if it is not applicable.
```

## Events
```yaml
# UNRESOLVED: Source does not describe unsolicited notifications from the
# device on RS-232C. Per the population policy, no events are populated.
```

## Macros
```yaml
# Source documents one explicit power-off sequence:
#   "Power - Off (send twice with short delay between to switch off)" - RC
#   emulation 21 89 01 52 43 37 33 30 36 0A
- id: power_off_safe
  description: |
    Send the RC power-off command twice with a short delay between
    transmissions. Direct-command Power Off (21 89 01 50 57 30 0A) does
    not require the double-send in the source.
  steps:
    - send: "21 89 01 52 43 37 33 30 36 0A"
    - wait_ms: 100
    - send: "21 89 01 52 43 37 33 30 36 0A"

# UNRESOLVED: no other multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Per population policy, no values inferred.
```

## Notes
<!-- UNRESOLVED list:
  - DLA-X55R is NOT listed by name in the source's model-coverage rows. The
    DLA-X55R is the European-market equivalent of the DLA-RS55 (2013 generation).
    The command set in this spec is scoped to the X30/X70/X90/RS45/55/65
    generation as the closest documented family; the X55R↔RS55 equivalence
    is inferred, not stated in the source.
  - The DLA-X55R is NOT listed in the source's LAN-control-enabled model set
    (X7/X9/X30/X70/X90/RS50/60/45/55/65 — note X55R is absent). The spec
    therefore declares `protocols: [serial]` only. If a future agent confirms
    LAN control on the X55R, add the `tcp` protocol group with
    `addressing.port: 20554` and the `PJ_OK`/`PJREQ`/`PJACK` handshake notes.
  - The DLA-X55R is NOT listed in the source's IR-enabled model set for the
    X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 generations either (the table
    covers X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; X55R again absent).
    The RC-emulation commands above are nonetheless included because the
    Direct-command table covers the X30/X70/X90/RS45/55/65 family to which
    the X55R is presumed to belong.
  - The Power Off RC command must be sent twice with a short delay
    ("Power - Off (send twice with short delay between to switch off)").
  - The source's Model Status enquiry response table does NOT include an
    RR string for the DLA-X55R. The closest mapping is the X70R/X90R/RS55/65
    line. The exact RR string returned by an X55R is UNRESOLVED.
  - The source covers two different Direct-command "Power On" hex sequences
    in the document text (21 89 01 50 57 31 0A and 21 89 01 50 57 31 0A
    appears as both `2189 0150 57310A` and `21 89 01 50 57 31 0A` — these
    are the same bytes with different spacing). The single canonical form
    is `21 89 01 50 57 31 0A` as used in the worked example.
  - The source's "Power Status Enquiry" detailed RR list omits RR value
    `33` (Warmup). The 2014-vintage JVC RS-232 spec adds Warmup=33; for
    this 2013-generation spec it is left UNRESOLVED.
-->

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-06-14T17:42:22.997Z
last_checked_at: 2026-06-14T19:37:57.167Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T19:37:57.167Z
matched_actions: 280
action_count: 280
confidence: medium
summary: "All 280 spec actions matched verbatim in source; transport parameters verified; bidirectional command/feedback coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DLA-X55R is not listed by name in the source's model-coverage rows. The X55R is the European equivalent of the RS55 (2013 generation). The set of commands documented for RS55 is taken as the working command set for X55R, but this equivalence is inferred — not stated verbatim in the source."
- "not stated in source."
- "detailed RR values for other enquiry commands beyond those listed"
- "No continuous/parameterised variable section is documented in the"
- "Source does not describe unsolicited notifications from the"
- "no other multi-step sequences documented in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
