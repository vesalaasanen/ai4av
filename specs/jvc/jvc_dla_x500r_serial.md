---
spec_id: admin/jvc-dla-x500r
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC DLA-X500R Control Spec"
manufacturer: JVC
model_family: DLA-X500R
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - DLA-X500R
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
  - manual3.jvckenwood.com
  - manualshelf.com
  - manuals.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/lch60830-001en/
  - https://www.manualshelf.com/manual/jvc/dla-x500r/owner-s-manual-english.html
  - https://manuals.jvckenwood.com/download/files/PC027183199-1.pdf
retrieved_at: 2026-05-21T01:16:55.267Z
last_checked_at: 2026-05-26T14:04:35.761Z
generated_at: 2026-05-26T14:04:35.761Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DLA-X500R is not listed explicitly in the source model list; entity covers the shared protocol family. Confirm exact model compatibility."
verification:
  verdict: verified
  checked_at: 2026-05-26T14:04:35.761Z
  matched_actions: 327
  action_count: 327
  confidence: medium
  summary: "All 327 spec hex commands match verbatim in source command tables; transport (baud 19200, port 20554, 8N1) confirmed; source command inventory co-extensive with spec. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# JVC DLA-X500R Control Spec

## Summary
The JVC DLA-X500R is a D-ILA home cinema projector controllable via RS-232C serial and LAN (TCP/IP) interfaces. This spec covers the complete binary hex command set including Direct Commands (power, input switching, gamma, picture mode, 3D, lens memory, and more) and Remote Control Emulation Commands, as documented in the RS-232C, LAN and Infrared Remote Control Guide v1.4. The same command set applies to a broad family of DLA-HD, DLA-X, and DLA-RS series projectors.

<!-- UNRESOLVED: DLA-X500R is not listed explicitly in the source model list; entity covers the shared protocol family. Confirm exact model compatibility. -->

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
  type: none  # inferred: no auth procedure in source; LAN uses PJ_OK/PJREQ/PJACK handshake but no password
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input switching commands present
- queryable       # query commands returning power/input/gamma/source/model state present
- levelable       # brightness, contrast, sharpness, gamma correction value commands present
```

## Actions
```yaml
# Direct Commands — POWER
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

# Direct Commands — INPUT SWITCHING
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

- id: input_svideo
  label: Input S-Video
  kind: action
  params: []
  hex: "21 89 01 49 50 30 0A"

- id: input_video
  label: Input Video
  kind: action
  params: []
  hex: "21 89 01 49 50 31 0A"

- id: input_pc
  label: "Input PC (HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 49 50 33 0A"

- id: input_next_highest
  label: Input+ (Go to next highest input)
  kind: action
  params: []
  hex: "21 89 01 49 50 2B 0A"

- id: input_next_lowest
  label: Input- (Go to next lowest input)
  kind: action
  params: []
  hex: "21 89 01 49 50 2D 0A"

# Direct Commands — TEST PATTERNS (HD350/550/750/950/990/RS10/15/20/25/35)
- id: test_pattern_off
  label: Test Pattern Off
  kind: action
  params: []
  hex: "21 89 01 54 53 30 0A"

- id: test_pattern_colour_bars
  label: Test Pattern Colour Bars
  kind: action
  params: []
  hex: "21 89 01 54 53 31 0A"

- id: test_pattern_stairstep_bw
  label: Test Pattern Stairstep (Black and White)
  kind: action
  params: []
  hex: "21 89 01 54 53 36 0A"

- id: test_pattern_stairstep_red
  label: Test Pattern Stairstep (Red)
  kind: action
  params: []
  hex: "21 89 01 54 53 37 0A"

- id: test_pattern_stairstep_green
  label: Test Pattern Stairstep (Green)
  kind: action
  params: []
  hex: "21 89 01 54 53 38 0A"

- id: test_pattern_stairstep_blue
  label: Test Pattern Stairstep (Blue)
  kind: action
  params: []
  hex: "21 89 01 54 53 39 0A"

- id: test_pattern_crosshatch_green
  label: Test Pattern Crosshatch (Green)
  kind: action
  params: []
  hex: "21 89 01 54 53 41 0A"

# Direct Commands — GAMMA
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
  label: "Gamma D (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
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

# Direct Commands — GAMMA VALUE
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
  label: Gamma Correction Value 2.2 (Default)
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

# Direct Commands — OFF TIMER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
- id: off_timer_off
  label: Off Timer Off
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 30 0A"

- id: off_timer_1hour
  label: Off Timer Set 1 Hour
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 31 0A"

- id: off_timer_2hours
  label: Off Timer Set 2 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 32 0A"

- id: off_timer_3hours
  label: Off Timer Set 3 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 33 0A"

- id: off_timer_4hours
  label: Off Timer Set 4 Hours
  kind: action
  params: []
  hex: "21 89 01 46 55 4F 54 34 0A"

# Direct Commands — LAMP POWER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
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

# Direct Commands — INFRARED REMOTE CODE (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
- id: remote_code_a
  label: Remote Code A (hex code 73)
  kind: action
  params: []
  hex: "21 89 01 53 55 52 43 30 0A"

- id: remote_code_b
  label: Remote Code B (hex code 63)
  kind: action
  params: []
  hex: "21 89 01 53 55 52 43 31 0A"

# Direct Commands — TRIGGER OUTPUT SET (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
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

# Direct Commands — CLEAR MOTION DRIVE (CMD Models)
- id: cmd_off
  label: Clear Motion Drive Off
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 30 0A"

- id: cmd_mode1
  label: "Clear Motion Drive Mode 1 (Low - HD550/950/990)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 31 0A"

- id: cmd_mode2
  label: "Clear Motion Drive Mode 2 (High - HD550/950/990)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 32 0A"

- id: cmd_mode3
  label: "Clear Motion Drive Mode 3 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 33 0A"

- id: cmd_mode4
  label: "Clear Motion Drive Mode 4 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 34 0A"

- id: cmd_inverse_telecine
  label: "Clear Motion Drive Inverse Telecine (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 43 4D 35 0A"

# Direct Commands — ANAMORPHIC (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
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

# Direct Commands — PICTURE MODE (X30/X70/X90/RS45/55/65)
- id: picture_mode_film_x30
  label: "Picture Mode Film (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 30 0A"

- id: picture_mode_cinema_x30
  label: "Picture Mode Cinema (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 31 0A"

- id: picture_mode_animation_x30
  label: "Picture Mode Animation (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 32 0A"

- id: picture_mode_natural_x30
  label: "Picture Mode Natural (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 33 0A"

- id: picture_mode_stage_x30
  label: "Picture Mode Stage (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 34 0A"

- id: picture_mode_thx_x30
  label: "Picture Mode THX (X70/X90/RS55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 36 0A"

- id: picture_mode_3d_x30
  label: "Picture Mode 3D (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 42 0A"

- id: picture_mode_user1_x30
  label: "Picture Mode User 1 (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 43 0A"

- id: picture_mode_user2_x30
  label: "Picture Mode User 2 (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 44 0A"

- id: picture_mode_user3_x30
  label: "Picture Mode User 3 (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 45 0A"

- id: picture_mode_user4_x30
  label: "Picture Mode User 4 (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 46 0A"

- id: picture_mode_user5_x30
  label: "Picture Mode User 5 (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 31 30 0A"

# Direct Commands — PICTURE MODE (X3/X7/X9/RS40/50/60)
- id: picture_mode_film_x3
  label: "Picture Mode Film (X3/X7/X9/RS40/50/60)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 0A"

- id: picture_mode_cinema_x3
  label: "Picture Mode Cinema (X3/X7/X9/RS40/50/60)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 31 0A"

- id: picture_mode_animation_x3
  label: "Picture Mode Animation (X3/X7/X9/RS40/50/60)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 32 0A"

- id: picture_mode_natural_x3
  label: "Picture Mode Natural (X3/X7/X9/RS40/50/60)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 33 0A"

- id: picture_mode_stage_x3
  label: "Picture Mode Stage (X3/X7/X9/RS40/50/60)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 34 0A"

- id: picture_mode_3d_x3
  label: "Picture Mode 3D (X3/X7/X9/RS40/50/60)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 45 0A"

- id: picture_mode_user1_x3
  label: "Picture Mode User 1 (X3/X7/X9/RS40/50/60)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 36 0A"

- id: picture_mode_user2_x3
  label: "Picture Mode User 2 (X3/X7/X9/RS40/50/60)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 37 0A"

- id: picture_mode_thx_x3
  label: "Picture Mode THX (X7/X9/RS50/60)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 39 0A"

# Direct Commands — PICTURE MODE (HD350/750/550/950/990/RS10/20/15/25/35)
- id: picture_mode_cinema1_hd
  label: "Picture Mode Cinema 1 (HD350/750/550/950/990/RS10/20/15/25/35)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 30 0A"

- id: picture_mode_cinema2_hd
  label: "Picture Mode Cinema 2 (HD350/750/550/950/990/RS10/20/15/25/35)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 31 0A"

- id: picture_mode_cinema3_hd
  label: "Picture Mode Cinema 3 (HD350/750/550/950/990/RS10/20/15/25/35)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 32 0A"

- id: picture_mode_natural_hd
  label: "Picture Mode Natural (HD350/750/550/950/990/RS10/20/15/25/35)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 33 0A"

- id: picture_mode_stage_hd
  label: "Picture Mode Stage (HD350/750/550/950/990/RS10/20/15/25/35)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 34 0A"

- id: picture_mode_dynamic_hd
  label: "Picture Mode Dynamic (HD350/750/550/950/990/RS10/20/15/25/35)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 35 0A"

- id: picture_mode_user1_hd
  label: "Picture Mode User 1 (HD350/750/550/950/990/RS10/20/15/25/35)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 36 0A"

- id: picture_mode_user2_hd
  label: "Picture Mode User 2 (HD350/750/550/950/990/RS10/20/15/25/35)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 37 0A"

- id: picture_mode_thx_hd
  label: "Picture Mode THX (HD750/950/990/RS20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 4D 39 0A"

# Direct Commands — COLOUR PROFILE (X30/X70/X90/RS45/55/65)
- id: colour_profile_off
  label: Colour Profile Off
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 30 0A"

- id: colour_profile_film1
  label: Colour Profile Film 1 (in Film mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 31 0A"

- id: colour_profile_film2
  label: Colour Profile Film 2 (in Film mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 32 0A"

- id: colour_profile_standard
  label: Colour Profile Standard (in Cinema, Natural, Stage and 3D modes)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 33 0A"

- id: colour_profile_cinema1
  label: Colour Profile Cinema 1 (in Cinema mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 34 0A"

- id: colour_profile_cinema2
  label: Colour Profile Cinema 2 (in Cinema mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 35 0A"

- id: colour_profile_anime1
  label: Colour Profile Anime 1 (in Animation mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 36 0A"

- id: colour_profile_anime2
  label: Colour Profile Anime 2 (in Animation mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 37 0A"

- id: colour_profile_video
  label: Colour Profile Video (in Natural mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 38 0A"

- id: colour_profile_vivid
  label: Colour Profile Vivid (in Natural and 3D modes)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 39 0A"

- id: colour_profile_adobe
  label: Colour Profile Adobe (in Natural mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 41 0A"

- id: colour_profile_stage
  label: Colour Profile Stage (in Stage mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 42 0A"

- id: colour_profile_3d
  label: Colour Profile 3D (in 3D mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 43 0A"

- id: colour_profile_thx
  label: Colour Profile THX (in THX mode)
  kind: action
  params: []
  hex: "21 89 01 50 4D 50 52 30 44 0A"

# Direct Commands — 3D FORMAT (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
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

- id: format_3d_top_and_bottom
  label: 3D Format Top and Bottom
  kind: action
  params: []
  hex: "21 89 01 49 53 33 44 34 0A"

# Direct Commands — 2D to 3D CONVERSION (X30/X70/X90/RS45/55/65)
- id: conversion_2d_to_3d_off
  label: 2D to 3D Conversion Off
  kind: action
  params: []
  hex: "21 89 01 49 53 33 43 30 0A"

- id: conversion_2d_to_3d_on
  label: 2D to 3D Conversion On
  kind: action
  params: []
  hex: "21 89 01 49 53 33 43 31 0A"

# Direct Commands — 3D SUBTITLE CORRECTION (X30/X70/X90/RS45/55/65)
- id: subtitle_correction_3d_off
  label: 3D Subtitle Correction Off
  kind: action
  params: []
  hex: "21 89 01 49 53 33 54 31 0A"

- id: subtitle_correction_3d_on
  label: 3D Subtitle Correction On
  kind: action
  params: []
  hex: "21 89 01 49 53 33 54 30 0A"

# Direct Commands — LENS MEMORY (X30/X70/X90/RS45/55/65)
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

# Direct Commands — TEST COMMAND
- id: null_command
  label: Null Command (to check communication)
  kind: action
  params: []
  hex: "21 89 01 00 00 0A"

# Query Commands — Advanced Acknowledgement Response Requests
- id: query_power_status
  label: Power Status Query
  kind: query
  params: []
  hex: "3F 89 01 50 57 0A"

- id: query_input_status
  label: Input Status Query
  kind: query
  params: []
  hex: "3F 89 01 49 50 0A"

- id: query_gamma_table
  label: Gamma Table Query
  kind: query
  params: []
  hex: "3F 89 01 47 54 0A"

- id: query_gamma_value
  label: Gamma Value Query
  kind: query
  params: []
  hex: "3F 89 01 47 50 0A"

- id: query_source_status
  label: Source Status Query
  kind: query
  params: []
  hex: "3F 89 01 53 43 0A"

- id: query_model_status
  label: Model Status Query
  kind: query
  params: []
  hex: "3F 89 01 4D 44 0A"

# Remote Control Emulation Commands — 3D
- id: rc_3d_setting_menu
  label: "3D Setting — Direct access to 3D Setting menu (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 35 0A"

- id: rc_3d_format_cycle
  label: "3D Format — Cycles through all available 3D formats (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 36 0A"

# Remote Control Emulation Commands — Advanced / Picture menus
- id: rc_advanced
  label: "Advanced — Direct access to Picture Adjust > Advanced menu (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 33 0A"

# Remote Control Emulation Commands — Anamorphic / Vertical Stretch
- id: rc_anamorphic_off
  label: "Anamorphic Off / Vertical Stretch Off (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 / HD350/750/950/990/RS10/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 34 0A"

- id: rc_anamorphic_a
  label: "Anamorphic A / Vertical Stretch On (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 / HD350/750/950/990/RS10/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 33 0A"

- id: rc_anamorphic_b
  label: "Anamorphic B (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 42 0A"

- id: rc_anamorphic_cycle
  label: "Anamorphic — Cycles through Off/A/B (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 35 0A"

# Remote Control Emulation Commands — Aspect
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

- id: rc_aspect_pc_auto
  label: "Aspect (PC) Auto (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 45 0A"

- id: rc_aspect_pc_full
  label: "Aspect (PC) Full (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 30 0A"

- id: rc_aspect_pc_just
  label: "Aspect (PC) Just (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 46 0A"

- id: rc_aspect_cycle
  label: Aspect+ (cycles through all available modes)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 37 0A"

# Remote Control Emulation Commands — Auto functions
- id: rc_auto_align
  label: "Auto Align (PC input on HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 33 0A"

- id: rc_auto_lens_centre
  label: "Auto Lens Centre (X3/X7/X9/X70/X90/RS50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 39 0A"

# Remote Control Emulation Commands — Navigation
- id: rc_back
  label: Back — Steps backwards through menus and removes any OSD messages
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 33 0A"

- id: rc_ok
  label: OK (to accept currently selected option)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 46 0A"

- id: rc_menu
  label: Menu (On/Off toggle)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 45 0A"

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

# Remote Control Emulation Commands — BNR
- id: rc_bnr_off
  label: BNR (Block Noise Reduction) Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 30 0A"

- id: rc_bnr_on
  label: BNR (Block Noise Reduction) On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 46 0A"

# Remote Control Emulation Commands — Bright Level / Brightness
- id: rc_bright_level_minus
  label: "Bright Level- (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 33 0A"

- id: rc_bright_level_plus
  label: "Bright Level+ (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 32 0A"

- id: rc_brightness_minus
  label: Brightness-
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 42 0A"

- id: rc_brightness_plus
  label: Brightness+
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 41 0A"

- id: rc_brightness_adj
  label: Brightness Adj. (Adjustment Bar On/Off toggle)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 39 0A"

# Remote Control Emulation Commands — CEC
- id: rc_cec_off
  label: CEC Off
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 37 0A"

- id: rc_cec_on
  label: CEC On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 36 0A"

# Remote Control Emulation Commands — Clear Motion Drive
- id: rc_cmd_cycle
  label: "Clear Motion Drive — Cycles through Off/Mode 1/Mode 2/Mode 3/Mode 4/Inverse Telecine (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 41 0A"

- id: rc_cmd_off
  label: "Clear Motion Drive Off (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 37 0A"

- id: rc_cmd_mode1
  label: "Clear Motion Drive Mode 1 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 45 0A"

- id: rc_cmd_mode2
  label: "Clear Motion Drive Mode 2 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 46 0A"

- id: rc_cmd_mode3
  label: "Clear Motion Drive Mode 3 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 38 0A"

- id: rc_cmd_mode4
  label: "Clear Motion Drive Mode 4 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 39 0A"

- id: rc_cmd_inverse_telecine
  label: "Clear Motion Drive Inverse Telecine (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 41 0A"

# Remote Control Emulation Commands — Colour
- id: rc_colour_minus
  label: Colour-
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 44 0A"

- id: rc_colour_plus
  label: Colour+
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 43 0A"

- id: rc_colour_adj
  label: Colour Adj. (Adjustment Bar On/Off toggle)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 35 0A"

# Remote Control Emulation Commands — Colour Management
- id: rc_colour_management_off
  label: "Colour Management Off (HD750/950/990/X7/X9/RS20/25/35/50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 30 0A"

- id: rc_colour_management_custom1
  label: "Colour Management Custom 1 (HD750/950/990/X7/X9/RS20/25/35/50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 31 0A"

- id: rc_colour_management_custom2
  label: "Colour Management Custom 2 (HD750/950/990/X7/X9/RS20/25/35/50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 32 0A"

- id: rc_colour_management_custom3
  label: "Colour Management Custom 3 (HD750/950/990/X7/X9/RS20/25/35/50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 33 0A"

- id: rc_colour_management_cycle
  label: "Colour Management — Cycles through Off/Custom 1/Custom 2/Custom 3 (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 39 0A"

- id: rc_colour_profile_cycle
  label: "Colour Profile — Cycles through all available Colour Profiles (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 38 0A"

- id: rc_colour_space_cycle
  label: "Colour Space — Cycles through Standard/Wide 1/Wide 2 (X3/X30/RS40/RS45)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 44 0A"

# Remote Control Emulation Commands — Colour Temperature
- id: rc_colour_temp_5800k
  label: "Colour Temp. 5800K (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 45 0A"

- id: rc_colour_temp_6500k
  label: Colour Temp. 6500K
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 46 0A"

- id: rc_colour_temp_7500k
  label: "Colour Temp. 7500K (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 30 0A"

- id: rc_colour_temp_9300k
  label: "Colour Temp. 9300K (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 31 0A"

- id: rc_colour_temp_custom1
  label: Colour Temp. Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 33 0A"

- id: rc_colour_temp_custom2
  label: Colour Temp. Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 34 0A"

- id: rc_colour_temp_custom3
  label: Colour Temp. Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 35 0A"

- id: rc_colour_temp_high_bright
  label: "Colour Temp. High Bright (HD350/550/750/950/990/X3/X30/RS10/15/20/25/35/40/45)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 32 0A"

- id: rc_colour_temp_cycle
  label: Colour Temp.+ (cycles through all options)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 36 0A"

# Remote Control Emulation Commands — Colour Temperature Gain
- id: rc_ct_gain_blue_minus
  label: "Colour Temperature Gain Blue- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 31 0A"

- id: rc_ct_gain_blue_plus
  label: "Colour Temperature Gain Blue+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 30 0A"

- id: rc_ct_gain_green_minus
  label: "Colour Temperature Gain Green- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 46 0A"

- id: rc_ct_gain_green_plus
  label: "Colour Temperature Gain Green+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 45 0A"

- id: rc_ct_gain_red_minus
  label: "Colour Temperature Gain Red- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 44 0A"

- id: rc_ct_gain_red_plus
  label: "Colour Temperature Gain Red+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 43 0A"

# Remote Control Emulation Commands — Colour Temperature Offset
- id: rc_ct_offset_blue_minus
  label: "Colour Temperature Offset Blue- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 37 0A"

- id: rc_ct_offset_blue_plus
  label: "Colour Temperature Offset Blue+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 36 0A"

- id: rc_ct_offset_green_minus
  label: "Colour Temperature Offset Green- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 35 0A"

- id: rc_ct_offset_green_plus
  label: "Colour Temperature Offset Green+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 34 0A"

- id: rc_ct_offset_red_minus
  label: "Colour Temperature Offset Red- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 33 0A"

- id: rc_ct_offset_red_plus
  label: "Colour Temperature Offset Red+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 32 0A"

# Remote Control Emulation Commands — Contrast
- id: rc_contrast_minus
  label: Contrast-
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 39 0A"

- id: rc_contrast_plus
  label: Contrast+
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 38 0A"

- id: rc_contrast_adj
  label: Contrast Adj. (Adjustment Bar On/Off toggle)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 41 0A"

# Remote Control Emulation Commands — CTI
- id: rc_cti_off
  label: "CTI (Colour Transient Improvement) Off (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 43 0A"

- id: rc_cti_low
  label: "CTI (Colour Transient Improvement) Low (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 44 0A"

- id: rc_cti_middle
  label: "CTI (Colour Transient Improvement) Middle (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 45 0A"

- id: rc_cti_high
  label: "CTI (Colour Transient Improvement) High (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 46 0A"

# Remote Control Emulation Commands — Dark Level
- id: rc_dark_level_minus
  label: "Dark Level- (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 35 0A"

- id: rc_dark_level_plus
  label: "Dark Level+ (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 34 0A"

# Remote Control Emulation Commands — Detail Enhance
- id: rc_detail_enhance_minus
  label: Detail Enhance-
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 32 0A"

- id: rc_detail_enhance_plus
  label: Detail Enhance+
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 31 0A"

# Remote Control Emulation Commands — Picture Tone
- id: rc_picture_tone_blue_minus
  label: "Picture Tone Blue- (X7/X9/RS50/60 Film Mode Only; X70/X90/RS55/65 All Modes)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 31 0A"

- id: rc_picture_tone_blue_plus
  label: "Picture Tone Blue+ (X7/X9/RS50/60 Film Mode Only; X70/X90/RS55/65 All Modes)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 30 0A"

- id: rc_picture_tone_green_minus
  label: "Picture Tone Green- (X7/X9/RS50/60 Film Mode Only; X70/X90/RS55/65 All Modes)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 46 0A"

- id: rc_picture_tone_green_plus
  label: "Picture Tone Green+ (X7/X9/RS50/60 Film Mode Only; X70/X90/RS55/65 All Modes)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 45 0A"

- id: rc_picture_tone_red_minus
  label: "Picture Tone Red- (X7/X9/RS50/60 Film Mode Only; X70/X90/RS55/65 All Modes)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 44 0A"

- id: rc_picture_tone_red_plus
  label: "Picture Tone Red+ (X7/X9/RS50/60 Film Mode Only; X70/X90/RS55/65 All Modes)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 43 0A"

- id: rc_picture_tone_white_minus
  label: "Picture Tone White- (X7/X9/RS50/60 Film Mode Only; X70/X90/RS55/65 All Modes)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 42 0A"

- id: rc_picture_tone_white_plus
  label: "Picture Tone White+ (X7/X9/RS50/60 Film Mode Only; X70/X90/RS55/65 All Modes)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 41 0A"

# Remote Control Emulation Commands — Gamma
- id: rc_gamma_a
  label: Gamma A
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 39 0A"

- id: rc_gamma_b
  label: Gamma B
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 41 0A"

- id: rc_gamma_c
  label: Gamma C
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 42 0A"

- id: rc_gamma_custom1
  label: Gamma Custom 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 43 0A"

- id: rc_gamma_custom2
  label: Gamma Custom 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 44 0A"

- id: rc_gamma_custom3
  label: Gamma Custom 3
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 45 0A"

- id: rc_gamma_d
  label: "Gamma D (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 46 0A"

- id: rc_gamma_normal
  label: Gamma Normal
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 38 0A"

- id: rc_gamma_cycle
  label: Gamma+ (cycles through all options)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 35 0A"

# Remote Control Emulation Commands — Hide
- id: rc_hide_off
  label: "Hide Off (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 31 0A"

- id: rc_hide_on
  label: "Hide On (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 30 0A"

- id: rc_hide_toggle
  label: Hide (On/Off toggle)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 44 0A"

# Remote Control Emulation Commands — Horizontal/Vertical Position
- id: rc_horizontal_position_minus
  label: "Horizontal Position- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 42 0A"

- id: rc_horizontal_position_plus
  label: "Horizontal Position+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 41 0A"

- id: rc_vertical_position_minus
  label: "Vertical Position- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 44 0A"

- id: rc_vertical_position_plus
  label: "Vertical Position+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 43 0A"

# Remote Control Emulation Commands — Information
- id: rc_information
  label: Information (displays Information tab of menu)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 34 0A"

# Remote Control Emulation Commands — Input (RC emulation)
- id: rc_input_component
  label: Input Component
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 44 0A"

- id: rc_input_hdmi1
  label: Input HDMI 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 30 0A"

- id: rc_input_hdmi2
  label: Input HDMI 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 31 0A"

- id: rc_input_pc
  label: "Input PC (HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 36 0A"

- id: rc_input_svideo
  label: "Input S-Video (HD350/550/750/950/990)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 43 0A"

- id: rc_input_video
  label: "Input Video (HD350/550/750/950/990)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 42 0A"

- id: rc_input_cycle
  label: Input+ (cycles through all available inputs)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 38 0A"

# Remote Control Emulation Commands — ISF
- id: rc_isf_day
  label: "ISF Day (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 34 0A"

- id: rc_isf_night
  label: "ISF Night (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 35 0A"

- id: rc_isf_off
  label: "ISF Off (HD950/990/X7/X9/X70/X90/RS25/35/50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 41 0A"

- id: rc_isf_on
  label: "ISF On (HD950/990/X7/X9/X70/X90/RS25/35/50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 42 0A"

# Remote Control Emulation Commands — Keystone Correction
- id: rc_keystone_h_minus
  label: Keystone Correction Horizontal-
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 31 0A"

- id: rc_keystone_h_plus
  label: Keystone Correction Horizontal+
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 30 0A"

- id: rc_keystone_v_minus
  label: Keystone Correction Vertical-
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 43 0A"

- id: rc_keystone_v_plus
  label: Keystone Correction Vertical+
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 42 0A"

# Remote Control Emulation Commands — Lens Aperture
- id: rc_lens_aperture_1
  label: "Lens Aperture 1 (HD350/HD550)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 38 0A"

- id: rc_lens_aperture_2
  label: "Lens Aperture 2 (HD350/HD550)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 39 0A"

- id: rc_lens_aperture_3
  label: "Lens Aperture 3 (HD350/HD550)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 41 0A"

- id: rc_lens_aperture_minus
  label: "Lens Aperture- (displays gauge if not shown, decreases aperture if shown) (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 46 0A"

- id: rc_lens_aperture_plus
  label: "Lens Aperture+ (displays gauge if not shown, increases aperture if shown) (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 45 0A"

- id: rc_lens_aperture_adj
  label: "Lens Aperture Adj. (HD350/750/950/990/RS10/20/25/35 toggle; X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 bar; HD550/RS15 cycle)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 30 0A"

# Remote Control Emulation Commands — Lens Control / Focus / Zoom / Shift
- id: rc_lens_control_cycle
  label: Lens Control (cycles through all options)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 30 0A"

- id: rc_lens_focus_minus
  label: Lens Focus-
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 32 0A"

- id: rc_lens_focus_plus
  label: Lens Focus+
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 33 31 0A"

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

# Remote Control Emulation Commands — Lens Memory (RC emulation)
- id: rc_lens_memory_cycle
  label: "Lens Memory — Cycles through Lens Memory Pages: Select/Save/Name Edit (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 34 0A"

- id: rc_lens_memory_1
  label: "Lens Memory 1 (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 38 0A"

- id: rc_lens_memory_2
  label: "Lens Memory 2 (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 39 0A"

- id: rc_lens_memory_3
  label: "Lens Memory 3 (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 41 0A"

# Remote Control Emulation Commands — Mask
- id: rc_mask_bottom_minus
  label: "Mask Bottom- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 38 0A"

- id: rc_mask_bottom_plus
  label: "Mask Bottom+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 37 0A"

- id: rc_mask_left_minus
  label: "Mask Left- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 32 0A"

- id: rc_mask_left_plus
  label: "Mask Left+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 31 0A"

- id: rc_mask_right_minus
  label: "Mask Right- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 34 0A"

- id: rc_mask_right_plus
  label: "Mask Right+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 33 0A"

- id: rc_mask_top_minus
  label: "Mask Top- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 36 0A"

- id: rc_mask_top_plus
  label: "Mask Top+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 35 0A"

# Remote Control Emulation Commands — Menu Position
- id: rc_menu_position
  label: "Menu Position (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 34 32 0A"

# Remote Control Emulation Commands — MNR / RNR / NR
- id: rc_mnr_minus
  label: MNR (Mosquito Noise Reduction)-
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 45 0A"

- id: rc_mnr_plus
  label: MNR (Mosquito Noise Reduction)+
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 44 0A"

- id: rc_rnr_minus
  label: RNR (Random Noise Reduction)-
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 43 0A"

- id: rc_rnr_plus
  label: RNR (Random Noise Reduction)+
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 42 0A"

- id: rc_nr_toggle
  label: "NR (toggles display of RNR/MNR) (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 38 0A"

# Remote Control Emulation Commands — PC Phase / Tracking
- id: rc_phase_minus
  label: "Phase (PC Input)- (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 39 0A"

- id: rc_phase_plus
  label: "Phase (PC Input)+ (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 38 0A"

- id: rc_tracking_minus
  label: "Tracking (PC Input)- (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 37 0A"

- id: rc_tracking_plus
  label: "Tracking (PC Input)+ (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 41 36 0A"

# Remote Control Emulation Commands — Picture Adjust / Picture Mode
- id: rc_picture_adjust
  label: "Picture Adjust (HD550/750/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 32 0A"

- id: rc_picture_mode_3d
  label: "Picture Mode 3D (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 37 0A"

- id: rc_picture_mode_cinema1
  label: "Picture Mode Cinema 1 / Film Mode (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 39 0A"

- id: rc_picture_mode_cinema2
  label: "Picture Mode Cinema 2 / Cinema Mode (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 38 0A"

- id: rc_picture_mode_cinema3
  label: "Picture Mode Cinema 3 / Animation Mode (HD550/750/990/RS15/25/35; X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 36 0A"

- id: rc_picture_mode_dynamic
  label: "Picture Mode Dynamic (HD350/550/750/950/990)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 42 0A"

- id: rc_picture_mode_natural
  label: Picture Mode Natural
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 41 0A"

- id: rc_picture_mode_stage
  label: Picture Mode Stage
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 37 0A"

- id: rc_picture_mode_thx
  label: "Picture Mode THX (HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 46 0A"

- id: rc_picture_mode_user1
  label: Picture Mode User 1
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 43 0A"

- id: rc_picture_mode_user2
  label: Picture Mode User 2
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 44 0A"

- id: rc_picture_mode_user3
  label: "Picture Mode User 3 (HD550/750/950/990/X3/X30/RS20/25/35/40/45)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 36 45 0A"

- id: rc_picture_mode_user4
  label: "Picture Mode User 4 (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 41 0A"

- id: rc_picture_mode_user5
  label: "Picture Mode User 5 (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 42 0A"

- id: rc_user_picture_mode_cycle
  label: "User — Cycles through User 1-User 5 Picture Modes (X30/X70/X90/RS45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 44 37 0A"

# Remote Control Emulation Commands — Pixel Shift
- id: rc_pixel_shift_h_blue_minus
  label: "Pixel Shift Horizontal Blue- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 45 0A"

- id: rc_pixel_shift_h_blue_plus
  label: "Pixel Shift Horizontal Blue+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 44 0A"

- id: rc_pixel_shift_h_green_minus
  label: "Pixel Shift Horizontal Green- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 43 0A"

- id: rc_pixel_shift_h_green_plus
  label: "Pixel Shift Horizontal Green+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 42 0A"

- id: rc_pixel_shift_h_red_minus
  label: "Pixel Shift Horizontal Red- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 41 0A"

- id: rc_pixel_shift_h_red_plus
  label: "Pixel Shift Horizontal Red+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 39 0A"

- id: rc_pixel_shift_v_blue_minus
  label: "Pixel Shift Vertical Blue- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 34 0A"

- id: rc_pixel_shift_v_blue_plus
  label: "Pixel Shift Vertical Blue+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 33 0A"

- id: rc_pixel_shift_v_green_minus
  label: "Pixel Shift Vertical Green- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 32 0A"

- id: rc_pixel_shift_v_green_plus
  label: "Pixel Shift Vertical Green+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 31 0A"

- id: rc_pixel_shift_v_red_minus
  label: "Pixel Shift Vertical Red- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 30 0A"

- id: rc_pixel_shift_v_red_plus
  label: "Pixel Shift Vertical Red+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 42 46 0A"

# Remote Control Emulation Commands — Power
- id: rc_power_off
  label: "Power Off (send twice with short delay between to switch off)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 36 0A"

- id: rc_power_on
  label: Power On
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 30 35 0A"

# Remote Control Emulation Commands — Screen Adjust
- id: rc_screen_adjust_off
  label: "Screen Adjust Off (X3/X30/RS40/45)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 30 0A"

- id: rc_screen_adjust_a
  label: "Screen Adjust A (X3/X30/RS40/45)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 31 0A"

- id: rc_screen_adjust_b
  label: "Screen Adjust B (X3/X30/RS40/45)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 32 0A"

- id: rc_screen_adjust_c
  label: "Screen Adjust C (X3/X30/RS40/45)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 33 0A"

# Remote Control Emulation Commands — Sharpness
- id: rc_sharpness_minus
  label: Sharpness-
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 46 0A"

- id: rc_sharpness_plus
  label: Sharpness+
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 37 45 0A"

- id: rc_sharpness_adj
  label: Sharpness Adj. (Adjustment Bar On/Off toggle)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 34 0A"

# Remote Control Emulation Commands — Shutter
- id: rc_shutter_close
  label: "Shutter Close (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 39 0A"

- id: rc_shutter_open
  label: "Shutter Open (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 41 0A"

- id: rc_shutter_sync_off
  label: "Shutter Off — Un-synchronises shutter with Hide function (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 44 0A"

- id: rc_shutter_sync_on
  label: "Shutter On — Synchronises shutter with Hide function (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 32 43 0A"

# Remote Control Emulation Commands — Test Pattern
- id: rc_test_pattern_cycle
  label: "Test Pattern (cycles through all patterns) (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 35 39 0A"

# Remote Control Emulation Commands — THX
- id: rc_thx_bright
  label: "THX Bright (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 35 0A"

- id: rc_thx_dark
  label: "THX Dark (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 38 36 0A"

- id: rc_thx_off
  label: "THX Off (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 37 0A"

- id: rc_thx_on
  label: "THX On (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 43 38 0A"

# Remote Control Emulation Commands — Tint
- id: rc_tint_minus
  label: "Tint- (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 39 0A"

- id: rc_tint_plus
  label: "Tint+ (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 39 38 0A"

- id: rc_tint_adj
  label: Tint Adj. (Adjustment Bar On/Off toggle)
  kind: action
  params: []
  hex: "21 89 01 52 43 37 33 31 36 0A"
```

## Feedbacks
```yaml
- id: fb_power_status
  label: Power Status
  query_hex: "3F 89 01 50 57 0A"
  response_format: "40 89 01 50 57 RR 0A"
  states:
    "30": standby
    "31": power_on
    "32": cooling
    "34": emergency

- id: fb_input_status
  label: Input Status
  query_hex: "3F 89 01 49 50 0A"
  response_format: "40 89 01 49 50 RR 0A"
  states:
    "30": s_video
    "31": video
    "32": component
    "33": pc
    "36": hdmi_1
    "37": hdmi_2

- id: fb_gamma_table
  label: Gamma Table
  query_hex: "3F 89 01 47 54 0A"
  response_format: "40 89 01 47 54 RR 0A"
  states:
    "30": normal
    "31": gamma_a
    "32": gamma_b
    "33": gamma_c
    "34": custom_1
    "35": custom_2
    "36": custom_3

- id: fb_gamma_value
  label: Gamma Correction Value
  query_hex: "3F 89 01 47 50 0A"
  response_format: "40 89 01 47 50 RR 0A"
  states:
    "30": "1.8"
    "31": "1.9"
    "32": "2.0"
    "33": "2.1"
    "34": "2.2"
    "35": "2.3"
    "36": "2.4"
    "37": "2.5"
    "38": "2.6"

- id: fb_source_status
  label: Source Status
  query_hex: "3F 89 01 53 43 0A"
  response_format: "40 89 01 53 43 RR 0A"
  states:
    "00": jvc_logo_displayed
    "30": no_signal_or_out_of_range
    "31": signal_ok

- id: fb_model_status
  label: Model / Projector Identity
  query_hex: "3F 89 01 4D 44 0A"
  response_format: "40 89 01 4D 44 RR... 0A"
  notes: >
    Multi-byte response; last byte encodes model family:
    34=HD350, 37=RS10, 35=HD750/RS20, 38=HD550, 41=RS15,
    39=HD950/HD990/RS25/RS35, 42=X3/RS40, 43=X7/X9/RS50/60,
    45=X30/RS45, 46=X70R/X90R/RS55/65
```

## Variables
[]

## Events
[]

## Macros
[]

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- All commands are terminated with 0x0A (LF). The projector discards any command with a gap of 50 ms or longer in the incoming byte stream.
- LAN control uses TCP port 20554 with a PJ_OK / PJREQ / PJACK handshake before each command; the connection is closed by the projector after 5 seconds of inactivity.
- For Remote Control Emulation power-off, send the rc_power_off command twice with a short delay; a single transmission is not sufficient to switch the projector to standby.

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
  - manualshelf.com
  - manuals.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/lch60830-001en/
  - https://www.manualshelf.com/manual/jvc/dla-x500r/owner-s-manual-english.html
  - https://manuals.jvckenwood.com/download/files/PC027183199-1.pdf
retrieved_at: 2026-05-21T01:16:55.267Z
last_checked_at: 2026-05-26T14:04:35.761Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T14:04:35.761Z
matched_actions: 327
action_count: 327
confidence: medium
summary: "All 327 spec hex commands match verbatim in source command tables; transport (baud 19200, port 20554, 8N1) confirmed; source command inventory co-extensive with spec. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DLA-X500R is not listed explicitly in the source model list; entity covers the shared protocol family. Confirm exact model compatibility."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
