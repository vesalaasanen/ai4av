---
spec_id: admin/jvc-kenwood-dla-v90r
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-V90R Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-V90R
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-V90R
    - DLA-V90RLTD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - manuals.jvckenwood.com
  - drivers.control4.com
  - jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-4578-01/
  - https://manuals.jvckenwood.com/download/files/B5A-4578-21.pdf
  - https://drivers.control4.com/projector_JVCKENWOOD_DLA-NZ900_RS4200.c4z
  - https://www.jvc.com/usa/projectors/procision/
retrieved_at: 2026-06-15T12:42:12.793Z
last_checked_at: 2026-06-16T07:05:20.093Z
generated_at: 2026-06-16T07:05:20.093Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "this refined excerpt is the legacy D-ILA guide covering DLA-HD350 through DLA-RS65. It does not enumerate V90R-specific command variants, picture modes, or feature flags. Treat as a structural reference; verify every opcode against the V90R service manual (manuals.jvckenwood.com B5A-3961-30, pp. 93-97) before implementing."
  - "DLA-V90R-specific continuous setters (e.g. raw brightness level 0-100, aperture position) are not enumerated in the legacy guide. Cross-check B5A-3961-30 (V90R/V80R/V70R/V50 service manual) for V90R-specific continuous setters."
  - "source does not document unsolicited event messages (e.g. power state change notifications beyond PJ_OK/PJREQ/PJACK handshake). The V90R service manual may list additional asynchronous notifications; verify against B5A-3961-30."
  - "source does not define multi-step macro sequences. The LAN handshake (PJ_OK -> PJREQ -> PJACK -> Command) and the \"send Power Off twice with short delay\" rule are documented in Notes."
  - "source does not list lamp hot-restart, emergency-state (RR=34), or cooling-state interlock procedures beyond the rule that Power On is ignored while cooling. Treat cooling/emergency as device-side interlocks; do not add speculative interlocks."
  - "comprehensive list"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:05:20.093Z
  matched_actions: 318
  action_count: 318
  confidence: medium
  summary: "All 318 spec action commands match literal hex sequences in source; transport (19200 baud, 8N1, TCP port 20554) fully supported. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# JVC KENWOOD DLA-V90R Control Spec

## Summary
DLA-V90R is a JVC KENWOOD D-ILA home theater projector. This spec covers RS-232C and LAN (TCP/IP) control, including the binary command framing used by the JVC D-ILA family. The companion manual B5A-3961-30 covers the DLA-V90R/V80R/V70R/V50 line; the older "RS-232C, LAN and Infrared Remote Control Guide" (this refined excerpt) provides the canonical direct/emulation command tables and the LAN handshake protocol carried forward into the V90R family.

<!-- UNRESOLVED: this refined excerpt is the legacy D-ILA guide covering DLA-HD350 through DLA-RS65. It does not enumerate V90R-specific command variants, picture modes, or feature flags. Treat as a structural reference; verify every opcode against the V90R service manual (manuals.jvckenwood.com B5A-3961-30, pp. 93-97) before implementing. -->

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
  type: none  # inferred: no auth procedure in source
```

**Notes on transport:**
- Serial: RS-232C, 19200 bps, 8N1, no flow control, binary data format, 9-pin D-Sub male (DB-9). Use a null-modem (cross-connected) cable.
- TCP: Connect to port 20554. Three-way handshake, then `PJ_OK` / `PJREQ` / `PJACK` session establishment with 5-second windows on each side. Session closes 5 s after last response; repeat the handshake for each command.
- LAN control is explicitly supported on the LAN-enabled D-ILA lineup (X7/X9/X30/X70/X90, RS50/RS60/RS45/RS55/RS65); V90R coverage requires confirmation against the V90R service manual.

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from input switching commands (HDMI 1/2, Component, S-Video, Video, PC)
- queryable       # inferred from 3F enquiry command and detailed 40 response codes
- levelable       # inferred from brightness/contrast/colour/sharpness +/− commands
```

## Actions
```yaml
# CRITICAL: Direct commands all use the framing:
#   21 89 01 [CMD] [DATA] 0A
# Unit ID is fixed at 89 01. End byte is fixed at 0A.
# Data byte is 30 for Off / 31 for On where applicable.
# Acknowledgement format on success: 06 89 01 [CMD] 0A
# Enquiry prefix: 3F 89 01 [CMD] 0A  -> detailed: 40 89 01 [CMD] [RR] 0A

# --- Direct: POWER ---
- id: power_off
  label: Power Off (Direct)
  kind: action
  command: "21 89 01 50 57 30 0A"
  params: []
- id: power_on
  label: Power On (Direct)
  kind: action
  command: "21 89 01 50 57 31 0A"
  params: []

# --- Direct: INPUT SWITCHING ---
- id: input_hdmi1
  label: Input HDMI 1 (Direct)
  kind: action
  command: "21 89 01 49 50 36 0A"
  params: []
- id: input_hdmi2
  label: Input HDMI 2 (Direct)
  kind: action
  command: "21 89 01 49 50 37 0A"
  params: []
- id: input_component
  label: Input Component (Direct)
  kind: action
  command: "21 89 01 49 50 32 0A"
  params: []
- id: input_svideo
  label: Input S-Video (Direct)
  kind: action
  command: "21 89 01 49 50 30 0A"
  params: []
- id: input_video
  label: Input Video (Direct)
  kind: action
  command: "21 89 01 49 50 31 0A"
  params: []
- id: input_pc
  label: Input PC (Direct)
  kind: action
  command: "21 89 01 49 50 33 0A"
  params: []
- id: input_next
  label: Input Next (Direct)
  kind: action
  command: "21 89 01 49 50 2B 0A"
  params: []
- id: input_prev
  label: Input Previous (Direct)
  kind: action
  command: "21 89 01 49 50 2D 0A"
  params: []

# --- Direct: TEST PATTERNS (legacy models; V90R coverage UNRESOLVED) ---
- id: test_pattern_off
  label: Test Pattern Off (Direct)
  kind: action
  command: "21 89 01 54 53 30 0A"
  params: []
- id: test_pattern_colour_bars
  label: Test Pattern Colour Bars (Direct)
  kind: action
  command: "21 89 01 54 53 31 0A"
  params: []
- id: test_pattern_stairstep_bw
  label: Test Pattern Stairstep B/W (Direct)
  kind: action
  command: "21 89 01 54 53 36 0A"
  params: []
- id: test_pattern_stairstep_red
  label: Test Pattern Stairstep Red (Direct)
  kind: action
  command: "21 89 01 54 53 37 0A"
  params: []
- id: test_pattern_stairstep_green
  label: Test Pattern Stairstep Green (Direct)
  kind: action
  command: "21 89 01 54 53 38 0A"
  params: []
- id: test_pattern_stairstep_blue
  label: Test Pattern Stairstep Blue (Direct)
  kind: action
  command: "21 89 01 54 53 39 0A"
  params: []
- id: test_pattern_crosshatch_green
  label: Test Pattern Crosshatch Green (Direct)
  kind: action
  command: "21 89 01 54 53 41 0A"
  params: []

# --- Direct: GAMMA TABLE ---
- id: gamma_normal
  label: Gamma Normal (Direct)
  kind: action
  command: "21 89 01 47 54 30 0A"
  params: []
- id: gamma_a
  label: Gamma A (Direct)
  kind: action
  command: "21 89 01 47 54 31 0A"
  params: []
- id: gamma_b
  label: Gamma B (Direct)
  kind: action
  command: "21 89 01 47 54 32 0A"
  params: []
- id: gamma_c
  label: Gamma C (Direct)
  kind: action
  command: "21 89 01 47 54 33 0A"
  params: []
- id: gamma_d
  label: Gamma D (Direct)
  kind: action
  command: "21 89 01 47 54 37 0A"
  params: []
- id: gamma_custom1
  label: Gamma Custom 1 (Direct)
  kind: action
  command: "21 89 01 47 54 34 0A"
  params: []
- id: gamma_custom2
  label: Gamma Custom 2 (Direct)
  kind: action
  command: "21 89 01 47 54 35 0A"
  params: []
- id: gamma_custom3
  label: Gamma Custom 3 (Direct)
  kind: action
  command: "21 89 01 47 54 36 0A"
  params: []

# --- Direct: GAMMA VALUE ---
- id: gamma_value_1_8
  label: Gamma Value 1.8 (Direct)
  kind: action
  command: "21 89 01 47 50 30 0A"
  params: []
- id: gamma_value_1_9
  label: Gamma Value 1.9 (Direct)
  kind: action
  command: "21 89 01 47 50 31 0A"
  params: []
- id: gamma_value_2_0
  label: Gamma Value 2.0 (Direct)
  kind: action
  command: "21 89 01 47 50 32 0A"
  params: []
- id: gamma_value_2_1
  label: Gamma Value 2.1 (Direct)
  kind: action
  command: "21 89 01 47 50 33 0A"
  params: []
- id: gamma_value_2_2
  label: Gamma Value 2.2 Default (Direct)
  kind: action
  command: "21 89 01 47 50 34 0A"
  params: []
- id: gamma_value_2_3
  label: Gamma Value 2.3 (Direct)
  kind: action
  command: "21 89 01 47 50 35 0A"
  params: []
- id: gamma_value_2_4
  label: Gamma Value 2.4 (Direct)
  kind: action
  command: "21 89 01 47 50 36 0A"
  params: []
- id: gamma_value_2_5
  label: Gamma Value 2.5 (Direct)
  kind: action
  command: "21 89 01 47 50 37 0A"
  params: []
- id: gamma_value_2_6
  label: Gamma Value 2.6 (Direct)
  kind: action
  command: "21 89 01 47 50 38 0A"
  params: []

# --- Direct: OFF TIMER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: off_timer_off
  label: Off Timer Off (Direct)
  kind: action
  command: "21 89 01 46 55 4F 54 30 0A"
  params: []
- id: off_timer_1h
  label: Off Timer 1 Hour (Direct)
  kind: action
  command: "21 89 01 46 55 4F 54 31 0A"
  params: []
- id: off_timer_2h
  label: Off Timer 2 Hours (Direct)
  kind: action
  command: "21 89 01 46 55 4F 54 32 0A"
  params: []
- id: off_timer_3h
  label: Off Timer 3 Hours (Direct)
  kind: action
  command: "21 89 01 46 55 4F 54 33 0A"
  params: []
- id: off_timer_4h
  label: Off Timer 4 Hours (Direct)
  kind: action
  command: "21 89 01 46 55 4F 54 34 0A"
  params: []

# --- Direct: LAMP POWER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: lamp_power_normal
  label: Lamp Power Normal (Direct)
  kind: action
  command: "21 89 01 50 4D 4C 50 30 0A"
  params: []
- id: lamp_power_high
  label: Lamp Power High (Direct)
  kind: action
  command: "21 89 01 50 4D 4C 50 31 0A"
  params: []

# --- Direct: INFRARED REMOTE CODE (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: ir_code_a
  label: IR Remote Code A (hex 73) (Direct)
  kind: action
  command: "21 89 01 53 55 52 43 30 0A"
  params: []
- id: ir_code_b
  label: IR Remote Code B (hex 63) (Direct)
  kind: action
  command: "21 89 01 53 55 52 43 31 0A"
  params: []

# --- Direct: TRIGGER OUTPUT (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: trigger_off
  label: Trigger Off (Direct)
  kind: action
  command: "21 89 01 46 55 54 52 30 0A"
  params: []
- id: trigger_on_power
  label: Trigger On (Power) (Direct)
  kind: action
  command: "21 89 01 46 55 54 52 31 0A"
  params: []
- id: trigger_on_anamorphic
  label: Trigger On (Anamorphic) (Direct)
  kind: action
  command: "21 89 01 46 55 54 52 32 0A"
  params: []

# --- Direct: CLEAR MOTION DRIVE (CMD Models) ---
- id: cmd_off
  label: Clear Motion Drive Off (Direct)
  kind: action
  command: "21 89 01 50 4D 43 4D 30 0A"
  params: []
- id: cmd_mode1
  label: Clear Motion Drive Mode 1 (Direct)
  kind: action
  command: "21 89 01 50 4D 43 4D 31 0A"
  params: []
- id: cmd_mode2
  label: Clear Motion Drive Mode 2 (Direct)
  kind: action
  command: "21 89 01 50 4D 43 4D 32 0A"
  params: []
- id: cmd_mode3
  label: Clear Motion Drive Mode 3 (Direct)
  kind: action
  command: "21 89 01 50 4D 43 4D 33 0A"
  params: []
- id: cmd_mode4
  label: Clear Motion Drive Mode 4 (Direct)
  kind: action
  command: "21 89 01 50 4D 43 4D 34 0A"
  params: []
- id: cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine (Direct)
  kind: action
  command: "21 89 01 50 4D 43 4D 35 0A"
  params: []

# --- Direct: ANAMORPHIC (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: anamorphic_off
  label: Anamorphic Off (Direct)
  kind: action
  command: "21 89 01 49 4E 56 53 30 0A"
  params: []
- id: anamorphic_a
  label: Anamorphic A (Direct)
  kind: action
  command: "21 89 01 49 4E 56 53 31 0A"
  params: []
- id: anamorphic_b
  label: Anamorphic B (Direct)
  kind: action
  command: "21 89 01 49 4E 56 53 32 0A"
  params: []

# --- Direct: PICTURE MODE (X30/X70/X90/RS45/55/65) ---
- id: picture_mode_film
  label: Picture Mode Film (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 30 0A"
  params: []
- id: picture_mode_cinema
  label: Picture Mode Cinema (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 31 0A"
  params: []
- id: picture_mode_animation
  label: Picture Mode Animation (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 32 0A"
  params: []
- id: picture_mode_natural
  label: Picture Mode Natural (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 33 0A"
  params: []
- id: picture_mode_stage
  label: Picture Mode Stage (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 34 0A"
  params: []
- id: picture_mode_thx
  label: Picture Mode THX (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 36 0A"
  params: []
- id: picture_mode_3d
  label: Picture Mode 3D (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 42 0A"
  params: []
- id: picture_mode_user1
  label: Picture Mode User 1 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 43 0A"
  params: []
- id: picture_mode_user2
  label: Picture Mode User 2 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 44 0A"
  params: []
- id: picture_mode_user3
  label: Picture Mode User 3 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 45 0A"
  params: []
- id: picture_mode_user4
  label: Picture Mode User 4 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 46 0A"
  params: []
- id: picture_mode_user5
  label: Picture Mode User 5 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 30 0A"
  params: []

# --- Direct: PICTURE MODE (HD/older: 30/31/32/33/34/45/36/37/39) ---
- id: picture_mode_legacy_film
  label: Picture Mode Film legacy (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []
- id: picture_mode_legacy_cinema
  label: Picture Mode Cinema legacy (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []
- id: picture_mode_legacy_animation
  label: Picture Mode Animation legacy (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []
- id: picture_mode_legacy_natural
  label: Picture Mode Natural legacy (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []
- id: picture_mode_legacy_stage
  label: Picture Mode Stage legacy (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []
- id: picture_mode_legacy_3d
  label: Picture Mode 3D legacy (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 45 0A"
  params: []
- id: picture_mode_legacy_user1
  label: Picture Mode User 1 legacy (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []
- id: picture_mode_legacy_user2
  label: Picture Mode User 2 legacy (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []
- id: picture_mode_legacy_thx
  label: Picture Mode THX legacy (Direct)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# --- Direct: COLOUR PROFILE (X30/X70/X90/RS45/55/65) ---
- id: colour_profile_off
  label: Colour Profile Off (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 30 0A"
  params: []
- id: colour_profile_film1
  label: Colour Profile Film 1 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 31 0A"
  params: []
- id: colour_profile_film2
  label: Colour Profile Film 2 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 32 0A"
  params: []
- id: colour_profile_standard
  label: Colour Profile Standard (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 33 0A"
  params: []
- id: colour_profile_cinema1
  label: Colour Profile Cinema 1 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 34 0A"
  params: []
- id: colour_profile_cinema2
  label: Colour Profile Cinema 2 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 35 0A"
  params: []
- id: colour_profile_anime1
  label: Colour Profile Anime 1 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 36 0A"
  params: []
- id: colour_profile_anime2
  label: Colour Profile Anime 2 (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 37 0A"
  params: []
- id: colour_profile_video
  label: Colour Profile Video (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 38 0A"
  params: []
- id: colour_profile_vivid
  label: Colour Profile Vivid (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 39 0A"
  params: []
- id: colour_profile_adobe
  label: Colour Profile Adobe (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 41 0A"
  params: []
- id: colour_profile_stage
  label: Colour Profile Stage (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 42 0A"
  params: []
- id: colour_profile_3d
  label: Colour Profile 3D (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 43 0A"
  params: []
- id: colour_profile_thx
  label: Colour Profile THX (Direct)
  kind: action
  command: "21 89 01 50 4D 50 52 30 44 0A"
  params: []

# --- Direct: 3D FORMAT (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: threed_format_off
  label: 3D Format Off (2D) (Direct)
  kind: action
  command: "21 89 01 49 53 33 44 30 0A"
  params: []
- id: threed_format_auto
  label: 3D Format Auto (Direct)
  kind: action
  command: "21 89 01 49 53 33 44 31 0A"
  params: []
- id: threed_format_frame_packing
  label: 3D Format Frame Packing (Direct)
  kind: action
  command: "21 89 01 49 53 33 44 32 0A"
  params: []
- id: threed_format_side_by_side
  label: 3D Format Side by Side (Direct)
  kind: action
  command: "21 89 01 49 53 33 44 33 0A"
  params: []
- id: threed_format_top_bottom
  label: 3D Format Top and Bottom (Direct)
  kind: action
  command: "21 89 01 49 53 33 44 34 0A"
  params: []

# --- Direct: 2D->3D CONVERSION (X30/X70/X90/RS45/55/65) ---
- id: twod_to_threed_off
  label: 2D to 3D Conversion Off (Direct)
  kind: action
  command: "21 89 01 49 53 33 43 30 0A"
  params: []
- id: twod_to_threed_on
  label: 2D to 3D Conversion On (Direct)
  kind: action
  command: "21 89 01 49 53 33 43 31 0A"
  params: []

# --- Direct: 3D SUBTITLE CORRECTION (X30/X70/X90/RS45/55/65) ---
- id: threed_subtitle_off
  label: 3D Subtitle Correction Off (Direct)
  kind: action
  command: "21 89 01 49 53 33 54 31 0A"
  params: []
- id: threed_subtitle_on
  label: 3D Subtitle Correction On (Direct)
  kind: action
  command: "21 89 01 49 53 33 54 30 0A"
  params: []

# --- Direct: LENS MEMORY (X30/X70/X90/RS45/55/65) ---
- id: lens_memory_save_1
  label: Lens Memory Save Memory 1 (Direct)
  kind: action
  command: "21 89 01 49 4E 4D 53 30 0A"
  params: []
- id: lens_memory_save_2
  label: Lens Memory Save Memory 2 (Direct)
  kind: action
  command: "21 89 01 49 4E 4D 53 31 0A"
  params: []
- id: lens_memory_save_3
  label: Lens Memory Save Memory 3 (Direct)
  kind: action
  command: "21 89 01 49 4E 4D 53 32 0A"
  params: []
- id: lens_memory_select_1
  label: Lens Memory Select Memory 1 (Direct)
  kind: action
  command: "21 89 01 49 4E 4D 4C 30 0A"
  params: []
- id: lens_memory_select_2
  label: Lens Memory Select Memory 2 (Direct)
  kind: action
  command: "21 89 01 49 4E 4D 4C 31 0A"
  params: []
- id: lens_memory_select_3
  label: Lens Memory Select Memory 3 (Direct)
  kind: action
  command: "21 89 01 49 4E 4D 4C 32 0A"
  params: []

# --- Direct: NULL TEST ---
- id: null_command
  label: Null Command (comm test) (Direct)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

# --- Remote Control Emulation: 3D / Advanced / Anamorphic / Aspect ---
- id: rc_3d_setting
  label: 3D Setting Menu (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 44 35 0A"
  params: []
- id: rc_3d_format_cycle
  label: 3D Format Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 44 36 0A"
  params: []
- id: rc_advanced_menu
  label: Advanced Picture Adjust Menu (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 33 0A"
  params: []
- id: rc_anamorphic_off
  label: Anamorphic / Vertical Stretch Off (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 34 0A"
  params: []
- id: rc_anamorphic_a
  label: Anamorphic A / Vertical Stretch On (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 33 0A"
  params: []
- id: rc_anamorphic_b
  label: Anamorphic B (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 42 0A"
  params: []
- id: rc_anamorphic_cycle
  label: Anamorphic Off/A/B Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 35 0A"
  params: []
- id: rc_aspect_16_9
  label: Aspect 16:9 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 36 0A"
  params: []
- id: rc_aspect_4_3
  label: Aspect 4:3 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 35 0A"
  params: []
- id: rc_aspect_zoom
  label: Aspect Zoom (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 37 0A"
  params: []
- id: rc_aspect_pc_auto
  label: Aspect (PC) Auto (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 45 0A"
  params: []
- id: rc_aspect_pc_full
  label: Aspect (PC) Full (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 30 0A"
  params: []
- id: rc_aspect_pc_just
  label: Aspect (PC) Just (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 46 0A"
  params: []
- id: rc_aspect_cycle
  label: Aspect + Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 37 0A"
  params: []
- id: rc_auto_align
  label: Auto Align PC (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 33 0A"
  params: []
- id: rc_auto_lens_centre
  label: Auto Lens Centre (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 39 0A"
  params: []
- id: rc_back
  label: Back (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 33 0A"
  params: []
- id: rc_bnr_off
  label: BNR Off (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 30 0A"
  params: []
- id: rc_bnr_on
  label: BNR On (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 46 0A"
  params: []
- id: rc_bright_level_down
  label: Bright Level Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 33 0A"
  params: []
- id: rc_bright_level_up
  label: Bright Level Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 32 0A"
  params: []
- id: rc_brightness_down
  label: Brightness Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 42 0A"
  params: []
- id: rc_brightness_up
  label: Brightness Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 41 0A"
  params: []
- id: rc_brightness_adj
  label: Brightness Adj Bar Toggle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 39 0A"
  params: []
- id: rc_cec_off
  label: CEC Off (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 37 0A"
  params: []
- id: rc_cec_on
  label: CEC On (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 36 0A"
  params: []
- id: rc_cmd_cycle
  label: Clear Motion Drive Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 41 0A"
  params: []
- id: rc_cmd_off
  label: Clear Motion Drive Off (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 37 0A"
  params: []
- id: rc_cmd_mode1
  label: Clear Motion Drive Mode 1 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 45 0A"
  params: []
- id: rc_cmd_mode2
  label: Clear Motion Drive Mode 2 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 46 0A"
  params: []
- id: rc_cmd_mode3
  label: Clear Motion Drive Mode 3 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 38 0A"
  params: []
- id: rc_cmd_mode4
  label: Clear Motion Drive Mode 4 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 39 0A"
  params: []
- id: rc_cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 41 0A"
  params: []
- id: rc_colour_down
  label: Colour Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 44 0A"
  params: []
- id: rc_colour_up
  label: Colour Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 43 0A"
  params: []
- id: rc_colour_adj
  label: Colour Adj Bar Toggle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 35 0A"
  params: []
- id: rc_colour_mgmt_off
  label: Colour Management Off (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 30 0A"
  params: []
- id: rc_colour_mgmt_custom1
  label: Colour Management Custom 1 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 31 0A"
  params: []
- id: rc_colour_mgmt_custom2
  label: Colour Management Custom 2 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 32 0A"
  params: []
- id: rc_colour_mgmt_custom3
  label: Colour Management Custom 3 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 33 0A"
  params: []
- id: rc_colour_mgmt_cycle
  label: Colour Management Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 39 0A"
  params: []
- id: rc_colour_profile_cycle
  label: Colour Profile Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 38 0A"
  params: []
- id: rc_colour_space_cycle
  label: Colour Space Cycle Standard/Wide1/Wide2 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 44 0A"
  params: []
- id: rc_colour_temp_5800k
  label: Colour Temp 5800K (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 45 0A"
  params: []
- id: rc_colour_temp_6500k
  label: Colour Temp 6500K (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 46 0A"
  params: []
- id: rc_colour_temp_7500k
  label: Colour Temp 7500K (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 30 0A"
  params: []
- id: rc_colour_temp_9300k
  label: Colour Temp 9300K (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 31 0A"
  params: []
- id: rc_colour_temp_custom1
  label: Colour Temp Custom 1 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 33 0A"
  params: []
- id: rc_colour_temp_custom2
  label: Colour Temp Custom 2 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 34 0A"
  params: []
- id: rc_colour_temp_custom3
  label: Colour Temp Custom 3 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 35 0A"
  params: []
- id: rc_colour_temp_high_bright
  label: Colour Temp High Bright (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 32 0A"
  params: []
- id: rc_colour_temp_cycle
  label: Colour Temp Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 36 0A"
  params: []
- id: rc_ct_gain_blue_down
  label: CT Gain Blue Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 31 0A"
  params: []
- id: rc_ct_gain_blue_up
  label: CT Gain Blue Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 30 0A"
  params: []
- id: rc_ct_gain_green_down
  label: CT Gain Green Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 46 0A"
  params: []
- id: rc_ct_gain_green_up
  label: CT Gain Green Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 45 0A"
  params: []
- id: rc_ct_gain_red_down
  label: CT Gain Red Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 44 0A"
  params: []
- id: rc_ct_gain_red_up
  label: CT Gain Red Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 43 0A"
  params: []
- id: rc_ct_offset_blue_down
  label: CT Offset Blue Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 37 0A"
  params: []
- id: rc_ct_offset_blue_up
  label: CT Offset Blue Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 36 0A"
  params: []
- id: rc_ct_offset_green_down
  label: CT Offset Green Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 35 0A"
  params: []
- id: rc_ct_offset_green_up
  label: CT Offset Green Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 34 0A"
  params: []
- id: rc_ct_offset_red_down
  label: CT Offset Red Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 33 0A"
  params: []
- id: rc_ct_offset_red_up
  label: CT Offset Red Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 32 0A"
  params: []
- id: rc_contrast_down
  label: Contrast Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 39 0A"
  params: []
- id: rc_contrast_up
  label: Contrast Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 38 0A"
  params: []
- id: rc_contrast_adj
  label: Contrast Adj Bar Toggle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 41 0A"
  params: []
- id: rc_cti_off
  label: CTI Off (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 43 0A"
  params: []
- id: rc_cti_low
  label: CTI Low (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 44 0A"
  params: []
- id: rc_cti_middle
  label: CTI Middle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 45 0A"
  params: []
- id: rc_cti_high
  label: CTI High (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 46 0A"
  params: []
- id: rc_cursor_down
  label: Cursor Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 32 0A"
  params: []
- id: rc_cursor_left
  label: Cursor Left (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 36 0A"
  params: []
- id: rc_cursor_right
  label: Cursor Right (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 34 0A"
  params: []
- id: rc_cursor_up
  label: Cursor Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 31 0A"
  params: []
- id: rc_dark_level_down
  label: Dark Level Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 35 0A"
  params: []
- id: rc_dark_level_up
  label: Dark Level Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 34 0A"
  params: []
- id: rc_detail_enhance_down
  label: Detail Enhance Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 32 0A"
  params: []
- id: rc_detail_enhance_up
  label: Detail Enhance Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 31 0A"
  params: []
- id: rc_picture_tone_blue_down
  label: Picture Tone Blue Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 31 0A"
  params: []
- id: rc_picture_tone_blue_up
  label: Picture Tone Blue Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 30 0A"
  params: []
- id: rc_picture_tone_green_down
  label: Picture Tone Green Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 46 0A"
  params: []
- id: rc_picture_tone_green_up
  label: Picture Tone Green Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 45 0A"
  params: []
- id: rc_picture_tone_red_down
  label: Picture Tone Red Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 44 0A"
  params: []
- id: rc_picture_tone_red_up
  label: Picture Tone Red Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 43 0A"
  params: []
- id: rc_picture_tone_white_down
  label: Picture Tone White Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 42 0A"
  params: []
- id: rc_picture_tone_white_up
  label: Picture Tone White Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 41 0A"
  params: []
- id: rc_gamma_a
  label: Gamma A (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 39 0A"
  params: []
- id: rc_gamma_b
  label: Gamma B (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 41 0A"
  params: []
- id: rc_gamma_c
  label: Gamma C (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 42 0A"
  params: []
- id: rc_gamma_custom1
  label: Gamma Custom 1 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 43 0A"
  params: []
- id: rc_gamma_custom2
  label: Gamma Custom 2 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 44 0A"
  params: []
- id: rc_gamma_custom3
  label: Gamma Custom 3 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 45 0A"
  params: []
- id: rc_gamma_d
  label: Gamma D (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 46 0A"
  params: []
- id: rc_gamma_normal
  label: Gamma Normal (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 38 0A"
  params: []
- id: rc_gamma_cycle
  label: Gamma Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 35 0A"
  params: []
- id: rc_hide_off
  label: Hide Off (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 44 31 0A"
  params: []
- id: rc_hide_on
  label: Hide On (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 44 30 0A"
  params: []
- id: rc_hide_toggle
  label: Hide Toggle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 44 0A"
  params: []
- id: rc_hpos_down
  label: Horizontal Position Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 42 0A"
  params: []
- id: rc_hpos_up
  label: Horizontal Position Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 41 0A"
  params: []
- id: rc_information
  label: Information Menu (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 34 0A"
  params: []
- id: rc_input_component
  label: Input Component (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 44 0A"
  params: []
- id: rc_input_hdmi1
  label: Input HDMI 1 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 30 0A"
  params: []
- id: rc_input_hdmi2
  label: Input HDMI 2 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 31 0A"
  params: []
- id: rc_input_pc
  label: Input PC (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 36 0A"
  params: []
- id: rc_input_svideo
  label: Input S-Video (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 43 0A"
  params: []
- id: rc_input_video
  label: Input Video (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 42 0A"
  params: []
- id: rc_input_cycle
  label: Input + Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 38 0A"
  params: []
- id: rc_isf_day
  label: ISF Day (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 34 0A"
  params: []
- id: rc_isf_night
  label: ISF Night (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 35 0A"
  params: []
- id: rc_isf_off
  label: ISF Off (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 41 0A"
  params: []
- id: rc_isf_on
  label: ISF On (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 42 0A"
  params: []
- id: rc_keystone_h_down
  label: Keystone Horizontal Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 31 0A"
  params: []
- id: rc_keystone_h_up
  label: Keystone Horizontal Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 30 0A"
  params: []
- id: rc_keystone_v_down
  label: Keystone Vertical Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 43 0A"
  params: []
- id: rc_keystone_v_up
  label: Keystone Vertical Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 42 0A"
  params: []
- id: rc_lens_aperture_1
  label: Lens Aperture 1 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 38 0A"
  params: []
- id: rc_lens_aperture_2
  label: Lens Aperture 2 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 39 0A"
  params: []
- id: rc_lens_aperture_3
  label: Lens Aperture 3 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 41 0A"
  params: []
- id: rc_lens_aperture_down
  label: Lens Aperture Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 46 0A"
  params: []
- id: rc_lens_aperture_up
  label: Lens Aperture Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 45 0A"
  params: []
- id: rc_lens_aperture_adj
  label: Lens Aperture Adj Bar (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 30 0A"
  params: []
- id: rc_lens_control
  label: Lens Control Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 30 0A"
  params: []
- id: rc_lens_focus_down
  label: Lens Focus Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 32 0A"
  params: []
- id: rc_lens_focus_up
  label: Lens Focus Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 31 0A"
  params: []
- id: rc_lens_memory_cycle
  label: Lens Memory Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 44 34 0A"
  params: []
- id: rc_lens_memory_1
  label: Lens Memory 1 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 44 38 0A"
  params: []
- id: rc_lens_memory_2
  label: Lens Memory 2 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 44 39 0A"
  params: []
- id: rc_lens_memory_3
  label: Lens Memory 3 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 44 41 0A"
  params: []
- id: rc_lens_shift_down
  label: Lens Shift Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 32 0A"
  params: []
- id: rc_lens_shift_left
  label: Lens Shift Left (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 34 0A"
  params: []
- id: rc_lens_shift_right
  label: Lens Shift Right (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 33 0A"
  params: []
- id: rc_lens_shift_up
  label: Lens Shift Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 31 0A"
  params: []
- id: rc_lens_zoom_in
  label: Lens Zoom In (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 35 0A"
  params: []
- id: rc_lens_zoom_out
  label: Lens Zoom Out (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 37 0A"
  params: []
- id: rc_mask_bottom_down
  label: Mask Bottom Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 38 0A"
  params: []
- id: rc_mask_bottom_up
  label: Mask Bottom Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 37 0A"
  params: []
- id: rc_mask_left_down
  label: Mask Left Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 32 0A"
  params: []
- id: rc_mask_left_up
  label: Mask Left Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 31 0A"
  params: []
- id: rc_mask_right_down
  label: Mask Right Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 34 0A"
  params: []
- id: rc_mask_right_up
  label: Mask Right Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 33 0A"
  params: []
- id: rc_mask_top_down
  label: Mask Top Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 36 0A"
  params: []
- id: rc_mask_top_up
  label: Mask Top Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 35 0A"
  params: []
- id: rc_menu_toggle
  label: Menu Toggle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 45 0A"
  params: []
- id: rc_menu_position
  label: Menu Position (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 32 0A"
  params: []
- id: rc_mnr_down
  label: MNR Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 45 0A"
  params: []
- id: rc_mnr_up
  label: MNR Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 44 0A"
  params: []
- id: rc_nr_toggle
  label: NR RNR/MNR Toggle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 38 0A"
  params: []
- id: rc_ok
  label: OK (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 46 0A"
  params: []
- id: rc_phase_down
  label: Phase PC Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 39 0A"
  params: []
- id: rc_phase_up
  label: Phase PC Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 38 0A"
  params: []
- id: rc_picture_adjust
  label: Picture Adjust Menu (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 32 0A"
  params: []
- id: rc_picture_mode_3d
  label: Picture Mode 3D (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 37 0A"
  params: []
- id: rc_picture_mode_cinema1
  label: Picture Mode Cinema 1 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 39 0A"
  params: []
- id: rc_picture_mode_cinema2
  label: Picture Mode Cinema 2 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 38 0A"
  params: []
- id: rc_picture_mode_cinema3
  label: Picture Mode Cinema 3 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 36 0A"
  params: []
- id: rc_picture_mode_dynamic
  label: Picture Mode Dynamic (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 42 0A"
  params: []
- id: rc_picture_mode_natural
  label: Picture Mode Natural (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 41 0A"
  params: []
- id: rc_picture_mode_stage
  label: Picture Mode Stage (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 37 0A"
  params: []
- id: rc_picture_mode_thx
  label: Picture Mode THX (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 46 0A"
  params: []
- id: rc_picture_mode_user1
  label: Picture Mode User 1 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 43 0A"
  params: []
- id: rc_picture_mode_user2
  label: Picture Mode User 2 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 44 0A"
  params: []
- id: rc_picture_mode_user3
  label: Picture Mode User 3 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 45 0A"
  params: []
- id: rc_picture_mode_user4
  label: Picture Mode User 4 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 41 0A"
  params: []
- id: rc_picture_mode_user5
  label: Picture Mode User 5 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 42 0A"
  params: []
- id: rc_pixshift_h_blue_down
  label: Pixel Shift H Blue Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 45 0A"
  params: []
- id: rc_pixshift_h_blue_up
  label: Pixel Shift H Blue Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 44 0A"
  params: []
- id: rc_pixshift_h_green_down
  label: Pixel Shift H Green Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 43 0A"
  params: []
- id: rc_pixshift_h_green_up
  label: Pixel Shift H Green Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 42 0A"
  params: []
- id: rc_pixshift_h_red_down
  label: Pixel Shift H Red Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 41 0A"
  params: []
- id: rc_pixshift_h_red_up
  label: Pixel Shift H Red Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 39 0A"
  params: []
- id: rc_pixshift_v_blue_down
  label: Pixel Shift V Blue Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 34 0A"
  params: []
- id: rc_pixshift_v_blue_up
  label: Pixel Shift V Blue Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 33 0A"
  params: []
- id: rc_pixshift_v_green_down
  label: Pixel Shift V Green Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 32 0A"
  params: []
- id: rc_pixshift_v_green_up
  label: Pixel Shift V Green Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 31 0A"
  params: []
- id: rc_pixshift_v_red_down
  label: Pixel Shift V Red Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 30 0A"
  params: []
- id: rc_pixshift_v_red_up
  label: Pixel Shift V Red Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 42 46 0A"
  params: []
- id: rc_power_off
  label: Power Off (Emulation; send twice)
  kind: action
  command: "21 89 01 52 43 37 33 30 36 0A"
  params: []
- id: rc_power_on
  label: Power On (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 35 0A"
  params: []
- id: rc_rnr_down
  label: RNR Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 43 0A"
  params: []
- id: rc_rnr_up
  label: RNR Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 42 0A"
  params: []
- id: rc_screen_adjust_off
  label: Screen Adjust Off (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 30 0A"
  params: []
- id: rc_screen_adjust_a
  label: Screen Adjust A (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 31 0A"
  params: []
- id: rc_screen_adjust_b
  label: Screen Adjust B (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 32 0A"
  params: []
- id: rc_screen_adjust_c
  label: Screen Adjust C (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 33 0A"
  params: []
- id: rc_sharpness_down
  label: Sharpness Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 46 0A"
  params: []
- id: rc_sharpness_up
  label: Sharpness Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 45 0A"
  params: []
- id: rc_sharpness_adj
  label: Sharpness Adj Bar Toggle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 34 0A"
  params: []
- id: rc_shutter_close
  label: Shutter Close (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 39 0A"
  params: []
- id: rc_shutter_open
  label: Shutter Open (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 41 0A"
  params: []
- id: rc_shutter_off
  label: Shutter Off (desync hide) (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 44 0A"
  params: []
- id: rc_shutter_on
  label: Shutter On (sync hide) (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 43 0A"
  params: []
- id: rc_test_pattern_cycle
  label: Test Pattern Cycle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 39 0A"
  params: []
- id: rc_thx_bright
  label: THX Bright (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 35 0A"
  params: []
- id: rc_thx_dark
  label: THX Dark (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 38 36 0A"
  params: []
- id: rc_thx_off
  label: THX Off (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 37 0A"
  params: []
- id: rc_thx_on
  label: THX On (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 43 38 0A"
  params: []
- id: rc_tint_down
  label: Tint Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 39 0A"
  params: []
- id: rc_tint_up
  label: Tint Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 39 38 0A"
  params: []
- id: rc_tint_adj
  label: Tint Adj Bar Toggle (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 36 0A"
  params: []
- id: rc_tracking_down
  label: Tracking PC Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 37 0A"
  params: []
- id: rc_tracking_up
  label: Tracking PC Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 36 0A"
  params: []
- id: rc_user_cycle
  label: User Picture Mode Cycle 1-5 (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 44 37 0A"
  params: []
- id: rc_vpos_down
  label: Vertical Position Down (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 44 0A"
  params: []
- id: rc_vpos_up
  label: Vertical Position Up (Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 41 43 0A"
  params: []

# --- Query / Enquiry (3F prefix; response: 06 + 40 detailed) ---
- id: query_power_status
  label: Power Status Enquiry
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []
- id: query_input_status
  label: Input Status Enquiry
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []
- id: query_gamma_table
  label: Gamma Table Enquiry
  kind: query
  command: "3F 89 01 47 54 0A"
  params: []
- id: query_gamma_value
  label: Gamma Value Enquiry
  kind: query
  command: "3F 89 01 47 50 0A"
  params: []
- id: query_source_status
  label: Source Status Enquiry
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []
- id: query_model_status
  label: Model Status Enquiry
  kind: query
  command: "3F 89 01 4D 44 0A"
  params: []
```

## Feedbacks
```yaml
# Acknowledgement Response Return Codes - Basic
# 06 89 01 [CMD] 0A  on success for direct commands
# 06 89 01 52 43 0A  on success for any emulation command
# 06 89 01 00 00 0A  on success for null test
# 06 89 01 [CMD] 0A  followed by 40 89 01 [CMD] [RR] 0A  for detailed status replies
- id: ack_basic
  label: Basic Acknowledgement
  type: object
  fields:
    - name: cmd_prefix
      type: bytes
      description: First 2 bytes of originating command (excluding 21 89 01)
- id: power_status
  label: Power Status
  type: enum
  values: [standby, power_on, cooling, emergency]
  rr_map:
    "30": standby
    "31": power_on
    "32": cooling
    "34": emergency
- id: input_status
  label: Input Status
  type: enum
  values: [svideo, video, component, pc, hdmi1, hdmi2]
  rr_map:
    "30": svideo
    "31": video
    "32": component
    "33": pc
    "36": hdmi1
    "37": hdmi2
- id: gamma_table_state
  label: Gamma Table
  type: enum
  values: [normal, a, b, c, custom1, custom2, custom3]
  rr_map:
    "30": normal
    "31": a
    "32": b
    "33": c
    "34": custom1
    "35": custom2
    "36": custom3
- id: gamma_value_state
  label: Gamma Value
  type: enum
  values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6"]
  rr_map:
    "30": "1.8"
    "31": "1.9"
    "32": "2.0"
    "33": "2.1"
    "34": "2.2"
    "35": "2.3"
    "36": "2.4"
    "37": "2.5"
    "38": "2.6"
- id: source_status
  label: Source Status
  type: enum
  values: [jvc_logo, no_signal, signal_ok]
  rr_map:
    "00": jvc_logo
    "30": no_signal
    "31": signal_ok
- id: model_status
  label: Model Status (12 ASCII bytes)
  type: string
  rr_examples:
    "49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 34": DLA-HD350
    "49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 37": DLA-RS10
    "49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 35": DLA-HD750 / DLA-RS20
    "49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 38": DLA-HD550
    "49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 39": DLA-HD950 / DLA-HD990 / DLA-RS25 / DLA-RS35
    "49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 42": DLA-X3 / DLA-RS40
    "49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 43": DLA-X7 / DLA-X9 / DLA-RS50 / DLA-RS60
    "49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 45": DLA-X30 / DLA-RS45
    "49 4C 41 46 50 4A 20 2D 2D 20 2D 58 48 46": DLA-X70R / DLA-X90R / DLA-RS55 / DLA-RS65
```

## Variables
```yaml
<!-- UNRESOLVED: DLA-V90R-specific continuous setters (e.g. raw brightness level 0-100, aperture position) are not enumerated in the legacy guide. Cross-check B5A-3961-30 (V90R/V80R/V70R/V50 service manual) for V90R-specific continuous setters. -->
```

## Events
```yaml
<!-- UNRESOLVED: source does not document unsolicited event messages (e.g. power state change notifications beyond PJ_OK/PJREQ/PJACK handshake). The V90R service manual may list additional asynchronous notifications; verify against B5A-3961-30. -->
```

## Macros
```yaml
<!-- UNRESOLVED: source does not define multi-step macro sequences. The LAN handshake (PJ_OK -> PJREQ -> PJACK -> Command) and the "send Power Off twice with short delay" rule are documented in Notes. -->
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: "Power - Off (send twice with short delay between to switch off)" - RC emulation path
interlocks: []
# UNRESOLVED: source does not list lamp hot-restart, emergency-state (RR=34), or cooling-state interlock procedures beyond the rule that Power On is ignored while cooling. Treat cooling/emergency as device-side interlocks; do not add speculative interlocks.
```

## Notes
<!-- UNRESOLVED: comprehensive list -->
- **Scope caveat.** This refined excerpt is the legacy "RS-232C, LAN and Infrared Remote Control Guide" (Version 1.4) covering DLA-HD350/550/750/950/990, DLA-X3/X7/X9/X30/X70/X90, and DLA-RS10/15/20/25/35/40/45/50/55/60/65. The DLA-V90R (and V80R/V70R/V50) are part of the 2021 D-ILA lineup; their primary protocol documentation is B5A-3961-30 (manuals.jvckenwood.com, "External Control" section, pp. 93-97). Every opcode here is a candidate for V90R; every opcode must be re-verified against the V90R service manual before being sent to a real device.
- **Binary framing.** All commands share: `21 89 01 [CMD] [DATA] 0A` for direct commands, `21 89 01 52 43 [SUB] 0A` (12-byte total) for emulation, `3F 89 01 [CMD] 0A` for enquiry. Unit ID `89 01` is fixed. End byte `0A` is fixed. Header values: `21` (operating), `3F` (enquiry request), `06` (basic ack), `40` (detailed status). `06 89 01 [CMD] 0A` is the basic success response.
- **LAN handshake (TCP/IP, port 20554).** Open TCP -> Projector emits `PJ_OK` -> Controller replies `PJREQ` within 5 s -> Projector emits `PJACK` -> Controller sends the hex command within 5 s -> Projector returns the ack. Projector closes connection 5 s after the response. Repeat the full handshake for each command. Default projector IP `192.168.0.2`, subnet `255.255.255.0`, gateway `192.168.0.254`. DHCP client option off by default.
- **Serial pinout.** DB-9 male: pin 2 RxD, pin 3 TxD, pin 5 GND, pins 1/4/6-9 NC. Null-modem (DTE/DTE) cable required. 19200 bps, 8N1, no flow control, binary.
- **Power off via RC.** Emulation command `06` (Power Off) must be sent twice with a short delay; otherwise the device does not switch off.
- **Inter-command timing.** Projector discards commands if the incoming data has a break of 50 ms or more; the controller must wait for the matching ack before sending the next command.
- **IR code A/B.** 0x73 is code A, 0x63 is code B. After switching to code B with the `IR Code` service-menu option or with the `IR Code B` direct command, substitute 0x73 with 0x63 in all subsequent IR commands to that projector.
- **Crestron / AMX examples from source.** Crestron: `\x21\x89\x01\x50\x57\x31\x0A\r`. AMX: `SEND_STRING dvProj, "$21, $89, $01, $50, $57, $31, $0A"`.
- **Enquiry (3F) RR value 34 = Emergency** — undocumented emergency sub-states, do not act on automatically.
- **Pictures in this refined excerpt are hex byte strings** with literal space separators; transport code must strip the spaces before transmitting (or send as raw binary over TCP). On RS-232C the same bytes go out as binary at 19200 8N1.
- **Mandatory cross-check before publish:** B5A-3961-30.pdf pp. 93-97 for V90R-specific opcodes, picture modes (e.g. V90R HDR/FILMMAKER modes), and any V90R-only additions. The `entity_id` placeholder is `jvc_kenwood_dla_v90r` (provided in input).
- **Inferred trait `levelable`** rests on the +/− adjustment commands (brightness/contrast/colour/sharpness/tint/bright level/dark level/colour temperature gains and offsets/picture tone) and the lens (focus/zoom/shift/aperture) step commands. Continuous-range level setters for the V90R are not enumerated in the legacy guide; mark Variables UNRESOLVED until the V90R manual is consumed.

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - manuals.jvckenwood.com
  - drivers.control4.com
  - jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-4578-01/
  - https://manuals.jvckenwood.com/download/files/B5A-4578-21.pdf
  - https://drivers.control4.com/projector_JVCKENWOOD_DLA-NZ900_RS4200.c4z
  - https://www.jvc.com/usa/projectors/procision/
retrieved_at: 2026-06-15T12:42:12.793Z
last_checked_at: 2026-06-16T07:05:20.093Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:05:20.093Z
matched_actions: 318
action_count: 318
confidence: medium
summary: "All 318 spec action commands match literal hex sequences in source; transport (19200 baud, 8N1, TCP port 20554) fully supported. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "this refined excerpt is the legacy D-ILA guide covering DLA-HD350 through DLA-RS65. It does not enumerate V90R-specific command variants, picture modes, or feature flags. Treat as a structural reference; verify every opcode against the V90R service manual (manuals.jvckenwood.com B5A-3961-30, pp. 93-97) before implementing."
- "DLA-V90R-specific continuous setters (e.g. raw brightness level 0-100, aperture position) are not enumerated in the legacy guide. Cross-check B5A-3961-30 (V90R/V80R/V70R/V50 service manual) for V90R-specific continuous setters."
- "source does not document unsolicited event messages (e.g. power state change notifications beyond PJ_OK/PJREQ/PJACK handshake). The V90R service manual may list additional asynchronous notifications; verify against B5A-3961-30."
- "source does not define multi-step macro sequences. The LAN handshake (PJ_OK -> PJREQ -> PJACK -> Command) and the \"send Power Off twice with short delay\" rule are documented in Notes."
- "source does not list lamp hot-restart, emergency-state (RR=34), or cooling-state interlock procedures beyond the rule that Power On is ignored while cooling. Treat cooling/emergency as device-side interlocks; do not add speculative interlocks."
- "comprehensive list"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
