---
spec_id: admin/jvc-kenwood-dla-np5-rs1100
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC KENWOOD DLA-NP5 / DLA-RS1100 Control Spec"
manufacturer: "JVC KENWOOD"
model_family: DLA-NP5
aliases: []
compatible_with:
  manufacturers:
    - "JVC KENWOOD"
  models:
    - DLA-NP5
    - DLA-RS1100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-3961-01/GBLESYxjclkllb.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-3961-01/GBLESYmrvanzpd.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-3961-01/GBLESYyfujtbjg.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-3961-01/GBLESYeeamtdau.php
retrieved_at: 2026-06-12T02:12:54.967Z
last_checked_at: 2026-06-12T19:22:48.792Z
generated_at: 2026-06-12T19:22:48.792Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DLA-NP5 and DLA-RS1100 are not in the source's \"FOR MODELS\" list. Command coverage in this spec is inherited from the family; per-command model applicability has not been independently verified."
  - "source does not specify a TCP port for general DLA-NP5/RS1100 LAN control; port 20554 is documented for the X7/X9/X30/X70/X90/RS50/60/RS45/55/65 family only. Listed a second entry as a flag; treat port below as UNRESOLVED for NP5/RS1100."
  - "source documents 20554 only for the X7/X9/X30/X70/X90/RS50/60/RS45/55/65 LAN-enabled family; DLA-NP5 / DLA-RS1100 may differ."
  - "source does not document discrete settable variables outside the"
  - "source does not document unsolicited push notifications. The"
  - "source does not document any safety warnings, interlocks, or"
  - "per-command applicability to DLA-NP5 / DLA-RS1100 not verified; LAN TCP port 20554 and Code B IR support inherited from sibling-family documentation and not independently confirmed for the NP5/RS1100."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:22:48.792Z
  matched_actions: 327
  action_count: 327
  confidence: medium
  summary: "All 327 spec actions confirmed verbatim in source; transport values (19200 baud, port 20554, 8N1) all present; source command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# JVC KENWOOD DLA-NP5 / DLA-RS1100 Control Spec

## Summary
Control spec for the JVC KENWOOD DLA-NP5 and DLA-RS1100 D-ILA projectors, derived from the vendor "RS-232C, LAN and Infrared Remote Control Guide" (Version 1.4). The guide documents direct RS-232C commands, remote-control emulation commands, and LAN control on TCP port 20554. The DLA-NP5 / DLA-RS1100 are not explicitly listed in the version-1.4 model table, so applicability of every command to these models must be verified against the actual device.

<!-- UNRESOLVED: DLA-NP5 and DLA-RS1100 are not in the source's "FOR MODELS" list. Command coverage in this spec is inherited from the family; per-command model applicability has not been independently verified. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - tcp  # UNRESOLVED: source does not specify a TCP port for general DLA-NP5/RS1100 LAN control; port 20554 is documented for the X7/X9/X30/X70/X90/RS50/60/RS45/55/65 family only. Listed a second entry as a flag; treat port below as UNRESOLVED for NP5/RS1100.
addressing:
  port: 20554  # UNRESOLVED: source documents 20554 only for the X7/X9/X30/X70/X90/RS50/60/RS45/55/65 LAN-enabled family; DLA-NP5 / DLA-RS1100 may differ.
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no login or password procedure described in source
```

## Traits
```yaml
- powerable       # inferred from Power On/Off commands
- routable        # inferred from Input switching commands (HDMI 1/2, Component, S-Video, Video, PC)
- queryable       # inferred from Power / Input / Gamma / Gamma Value / Source / Model status enquiry commands
- levelable       # inferred from Brightness/Contrast/Colour/Sharpness/Tint/Gain/Offset +/- adjustment commands
```

## Actions
```yaml
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
  label: Input PC (Direct, applicable models per source)
  kind: action
  command: "21 89 01 49 50 33 0A"
  params: []
- id: input_next
  label: Input Next (Direct)
  kind: action
  command: "21 89 01 49 50 2B 0A"
  params: []
- id: input_previous
  label: Input Previous (Direct)
  kind: action
  command: "21 89 01 49 50 2D 0A"
  params: []
- id: test_pattern_off
  label: Test Pattern Off (Direct, applicable models per source)
  kind: action
  command: "21 89 01 54 53 30 0A"
  params: []
- id: test_pattern_colour_bars
  label: Test Pattern Colour Bars (Direct, applicable models per source)
  kind: action
  command: "21 89 01 54 53 31 0A"
  params: []
- id: test_pattern_stairstep_bw
  label: Test Pattern Stairstep Black/White (Direct, applicable models per source)
  kind: action
  command: "21 89 01 54 53 36 0A"
  params: []
- id: test_pattern_stairstep_red
  label: Test Pattern Stairstep Red (Direct, applicable models per source)
  kind: action
  command: "21 89 01 54 53 37 0A"
  params: []
- id: test_pattern_stairstep_green
  label: Test Pattern Stairstep Green (Direct, applicable models per source)
  kind: action
  command: "21 89 01 54 53 38 0A"
  params: []
- id: test_pattern_stairstep_blue
  label: Test Pattern Stairstep Blue (Direct, applicable models per source)
  kind: action
  command: "21 89 01 54 53 39 0A"
  params: []
- id: test_pattern_crosshatch_green
  label: Test Pattern Crosshatch Green (Direct, applicable models per source)
  kind: action
  command: "21 89 01 54 53 41 0A"
  params: []
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
  label: Gamma D (Direct, applicable models per source)
  kind: action
  command: "21 89 01 47 54 37 0A"
  params: []
- id: gamma_custom_1
  label: Gamma Custom 1 (Direct)
  kind: action
  command: "21 89 01 47 54 34 0A"
  params: []
- id: gamma_custom_2
  label: Gamma Custom 2 (Direct)
  kind: action
  command: "21 89 01 47 54 35 0A"
  params: []
- id: gamma_custom_3
  label: Gamma Custom 3 (Direct)
  kind: action
  command: "21 89 01 47 54 36 0A"
  params: []
- id: gamma_value_1_8
  label: Gamma Correction Value 1.8 (Direct)
  kind: action
  command: "21 89 01 47 50 30 0A"
  params: []
- id: gamma_value_1_9
  label: Gamma Correction Value 1.9 (Direct)
  kind: action
  command: "21 89 01 47 50 31 0A"
  params: []
- id: gamma_value_2_0
  label: Gamma Correction Value 2.0 (Direct)
  kind: action
  command: "21 89 01 47 50 32 0A"
  params: []
- id: gamma_value_2_1
  label: Gamma Correction Value 2.1 (Direct)
  kind: action
  command: "21 89 01 47 50 33 0A"
  params: []
- id: gamma_value_2_2
  label: Gamma Correction Value 2.2 (Default, Direct)
  kind: action
  command: "21 89 01 47 50 34 0A"
  params: []
- id: gamma_value_2_3
  label: Gamma Correction Value 2.3 (Direct)
  kind: action
  command: "21 89 01 47 50 35 0A"
  params: []
- id: gamma_value_2_4
  label: Gamma Correction Value 2.4 (Direct)
  kind: action
  command: "21 89 01 47 50 36 0A"
  params: []
- id: gamma_value_2_5
  label: Gamma Correction Value 2.5 (Direct)
  kind: action
  command: "21 89 01 47 50 37 0A"
  params: []
- id: gamma_value_2_6
  label: Gamma Correction Value 2.6 (Direct)
  kind: action
  command: "21 89 01 47 50 38 0A"
  params: []
- id: off_timer_off
  label: Off Timer Off (Direct, applicable models per source)
  kind: action
  command: "21 89 01 46 55 4F 54 30 0A"
  params: []
- id: off_timer_1h
  label: Off Timer 1 Hour (Direct, applicable models per source)
  kind: action
  command: "21 89 01 46 55 4F 54 31 0A"
  params: []
- id: off_timer_2h
  label: Off Timer 2 Hours (Direct, applicable models per source)
  kind: action
  command: "21 89 01 46 55 4F 54 32 0A"
  params: []
- id: off_timer_3h
  label: Off Timer 3 Hours (Direct, applicable models per source)
  kind: action
  command: "21 89 01 46 55 4F 54 33 0A"
  params: []
- id: off_timer_4h
  label: Off Timer 4 Hours (Direct, applicable models per source)
  kind: action
  command: "21 89 01 46 55 4F 54 34 0A"
  params: []
- id: lamp_power_normal
  label: Lamp Power Normal (Direct, applicable models per source)
  kind: action
  command: "21 89 01 50 4D 4C 50 30 0A"
  params: []
- id: lamp_power_high
  label: Lamp Power High (Direct, applicable models per source)
  kind: action
  command: "21 89 01 50 4D 4C 50 31 0A"
  params: []
- id: remote_code_a
  label: Infrared Remote Code A (Direct, applicable models per source)
  kind: action
  command: "21 89 01 53 55 52 43 30 0A"
  params: []
- id: remote_code_b
  label: Infrared Remote Code B (Direct, applicable models per source)
  kind: action
  command: "21 89 01 53 55 52 43 31 0A"
  params: []
- id: trigger_off
  label: Trigger Off (Direct, applicable models per source)
  kind: action
  command: "21 89 01 46 55 54 52 30 0A"
  params: []
- id: trigger_on_power
  label: Trigger On (Power, Direct, applicable models per source)
  kind: action
  command: "21 89 01 46 55 54 52 31 0A"
  params: []
- id: trigger_on_anamorphic
  label: Trigger On (Anamorphic, Direct, applicable models per source)
  kind: action
  command: "21 89 01 46 55 54 52 32 0A"
  params: []
- id: clear_motion_drive_off
  label: Clear Motion Drive Off (Direct, CMD models)
  kind: action
  command: "21 89 01 50 4D 43 4D 30 0A"
  params: []
- id: clear_motion_drive_mode_1
  label: Clear Motion Drive Mode 1 Low (Direct, applicable models per source)
  kind: action
  command: "21 89 01 50 4D 43 4D 31 0A"
  params: []
- id: clear_motion_drive_mode_2
  label: Clear Motion Drive Mode 2 High (Direct, applicable models per source)
  kind: action
  command: "21 89 01 50 4D 43 4D 32 0A"
  params: []
- id: clear_motion_drive_mode_3
  label: Clear Motion Drive Mode 3 (Direct, applicable models per source)
  kind: action
  command: "21 89 01 50 4D 43 4D 33 0A"
  params: []
- id: clear_motion_drive_mode_4
  label: Clear Motion Drive Mode 4 (Direct, applicable models per source)
  kind: action
  command: "21 89 01 50 4D 43 4D 34 0A"
  params: []
- id: clear_motion_drive_inverse_telecine
  label: Clear Motion Drive Inverse Telecine (Direct, applicable models per source)
  kind: action
  command: "21 89 01 50 4D 43 4D 35 0A"
  params: []
- id: anamorphic_off_direct
  label: Anamorphic Off (Direct, applicable models per source)
  kind: action
  command: "21 89 01 49 4E 56 53 30 0A"
  params: []
- id: anamorphic_a_direct
  label: Anamorphic A (Direct, applicable models per source)
  kind: action
  command: "21 89 01 49 4E 56 53 31 0A"
  params: []
- id: anamorphic_b_direct
  label: Anamorphic B (Direct, applicable models per source)
  kind: action
  command: "21 89 01 49 4E 56 53 32 0A"
  params: []
- id: picture_mode_film_x30_x70_x90_rs45_55_65
  label: Picture Mode Film (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 30 0A"
  params: []
- id: picture_mode_cinema_x30_x70_x90_rs45_55_65
  label: Picture Mode Cinema (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 31 0A"
  params: []
- id: picture_mode_animation_x30_x70_x90_rs45_55_65
  label: Picture Mode Animation (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 32 0A"
  params: []
- id: picture_mode_natural_x30_x70_x90_rs45_55_65
  label: Picture Mode Natural (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 33 0A"
  params: []
- id: picture_mode_stage_x30_x70_x90_rs45_55_65
  label: Picture Mode Stage (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 34 0A"
  params: []
- id: picture_mode_thx_x70_x90_rs55_65
  label: Picture Mode THX (Direct, X70/X90/RS55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 36 0A"
  params: []
- id: picture_mode_3d_x30_x70_x90_rs45_55_65
  label: Picture Mode 3D (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 42 0A"
  params: []
- id: picture_mode_user_1_x30_x70_x90_rs45_55_65
  label: Picture Mode User 1 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 43 0A"
  params: []
- id: picture_mode_user_2_x30_x70_x90_rs45_55_65
  label: Picture Mode User 2 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 44 0A"
  params: []
- id: picture_mode_user_3_x30_x70_x90_rs45_55_65
  label: Picture Mode User 3 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 45 0A"
  params: []
- id: picture_mode_user_4_x30_x70_x90_rs45_55_65
  label: Picture Mode User 4 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 46 0A"
  params: []
- id: picture_mode_user_5_x30_x70_x90_rs45_55_65
  label: Picture Mode User 5 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 30 0A"
  params: []
- id: picture_mode_film_x3_x7_x9_rs40_50_60
  label: Picture Mode Film (Direct, X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []
- id: picture_mode_cinema_x3_x7_x9_rs40_50_60
  label: Picture Mode Cinema (Direct, X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []
- id: picture_mode_animation_x3_x7_x9_rs40_50_60
  label: Picture Mode Animation (Direct, X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []
- id: picture_mode_natural_x3_x7_x9_rs40_50_60
  label: Picture Mode Natural (Direct, X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []
- id: picture_mode_stage_x3_x7_x9_rs40_50_60
  label: Picture Mode Stage (Direct, X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []
- id: picture_mode_3d_x3_x7_x9_rs40_50_60
  label: Picture Mode 3D (Direct, X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 45 0A"
  params: []
- id: picture_mode_user_1_x3_x7_x9_rs40_50_60
  label: Picture Mode User 1 (Direct, X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []
- id: picture_mode_user_2_x3_x7_x9_rs40_50_60
  label: Picture Mode User 2 (Direct, X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []
- id: picture_mode_thx_x7_x9_rs50_60
  label: Picture Mode THX (Direct, X7/X9/RS50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []
- id: picture_mode_cinema_1_legacy
  label: Picture Mode Cinema 1 (Direct, HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []
- id: picture_mode_cinema_2_legacy
  label: Picture Mode Cinema 2 (Direct, HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []
- id: picture_mode_cinema_3_legacy
  label: Picture Mode Cinema 3 (Direct, HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []
- id: picture_mode_natural_legacy
  label: Picture Mode Natural (Direct, HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []
- id: picture_mode_stage_legacy
  label: Picture Mode Stage (Direct, HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []
- id: picture_mode_dynamic_legacy
  label: Picture Mode Dynamic (Direct, HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 35 0A"
  params: []
- id: picture_mode_user_1_legacy
  label: Picture Mode User 1 (Direct, HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []
- id: picture_mode_user_2_legacy
  label: Picture Mode User 2 (Direct, HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []
- id: picture_mode_thx_legacy
  label: Picture Mode THX (Direct, HD750/950/990/RS20/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []
- id: colour_profile_off
  label: Colour Profile Off (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 30 0A"
  params: []
- id: colour_profile_film_1
  label: Colour Profile Film 1 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 31 0A"
  params: []
- id: colour_profile_film_2
  label: Colour Profile Film 2 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 32 0A"
  params: []
- id: colour_profile_standard
  label: Colour Profile Standard (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 33 0A"
  params: []
- id: colour_profile_cinema_1
  label: Colour Profile Cinema 1 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 34 0A"
  params: []
- id: colour_profile_cinema_2
  label: Colour Profile Cinema 2 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 35 0A"
  params: []
- id: colour_profile_anime_1
  label: Colour Profile Anime 1 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 36 0A"
  params: []
- id: colour_profile_anime_2
  label: Colour Profile Anime 2 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 37 0A"
  params: []
- id: colour_profile_video
  label: Colour Profile Video (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 38 0A"
  params: []
- id: colour_profile_vivid
  label: Colour Profile Vivid (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 39 0A"
  params: []
- id: colour_profile_adobe
  label: Colour Profile Adobe (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 41 0A"
  params: []
- id: colour_profile_stage
  label: Colour Profile Stage (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 42 0A"
  params: []
- id: colour_profile_3d
  label: Colour Profile 3D (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 43 0A"
  params: []
- id: colour_profile_thx
  label: Colour Profile THX (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 52 30 44 0A"
  params: []
- id: threed_format_off
  label: 3D Format Off (2D) (Direct, applicable models per source)
  kind: action
  command: "21 89 01 49 53 33 44 30 0A"
  params: []
- id: threed_format_auto
  label: 3D Format Auto (Direct, applicable models per source)
  kind: action
  command: "21 89 01 49 53 33 44 31 0A"
  params: []
- id: threed_format_frame_packing
  label: 3D Format Frame Packing (Direct, applicable models per source)
  kind: action
  command: "21 89 01 49 53 33 44 32 0A"
  params: []
- id: threed_format_side_by_side
  label: 3D Format Side by Side (Direct, applicable models per source)
  kind: action
  command: "21 89 01 49 53 33 44 33 0A"
  params: []
- id: threed_format_top_bottom
  label: 3D Format Top and Bottom (Direct, applicable models per source)
  kind: action
  command: "21 89 01 49 53 33 44 34 0A"
  params: []
- id: twod_to_threed_conversion_off
  label: 2D to 3D Conversion Off (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 49 53 33 43 30 0A"
  params: []
- id: twod_to_threed_conversion_on
  label: 2D to 3D Conversion On (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 49 53 33 43 31 0A"
  params: []
- id: threed_subtitle_correction_off
  label: 3D Subtitle Correction Off (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 49 53 33 54 31 0A"
  params: []
- id: threed_subtitle_correction_on
  label: 3D Subtitle Correction On (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 49 53 33 54 30 0A"
  params: []
- id: lens_memory_save_1
  label: Lens Memory Save Memory 1 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 49 4E 4D 53 30 0A"
  params: []
- id: lens_memory_save_2
  label: Lens Memory Save Memory 2 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 49 4E 4D 53 31 0A"
  params: []
- id: lens_memory_save_3
  label: Lens Memory Save Memory 3 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 49 4E 4D 53 32 0A"
  params: []
- id: lens_memory_select_1
  label: Lens Memory Select Memory 1 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 49 4E 4D 4C 30 0A"
  params: []
- id: lens_memory_select_2
  label: Lens Memory Select Memory 2 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 49 4E 4D 4C 31 0A"
  params: []
- id: lens_memory_select_3
  label: Lens Memory Select Memory 3 (Direct, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 49 4E 4D 4C 32 0A"
  params: []
- id: null_command
  label: Null Command (to check communication, Direct)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []
- id: threed_setting_menu
  label: 3D Setting menu (RC Emulation, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 44 35 0A"
  params: []
- id: threed_format_cycle
  label: 3D Format Cycle (RC Emulation, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 44 36 0A"
  params: []
- id: picture_advanced_menu
  label: Picture Adjust Advanced menu (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 37 33 0A"
  params: []
- id: anamorphic_off_rc
  label: Anamorphic Off / Vertical Stretch Off (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 32 34 0A"
  params: []
- id: anamorphic_a_rc
  label: Anamorphic A / Vertical Stretch On (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 32 33 0A"
  params: []
- id: anamorphic_b_rc
  label: Anamorphic B (RC Emulation, X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 32 42 0A"
  params: []
- id: anamorphic_cycle
  label: Anamorphic Cycle (Off/A/B) (RC Emulation, X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 43 35 0A"
  params: []
- id: aspect_16_9
  label: Aspect 16:9 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 36 0A"
  params: []
- id: aspect_4_3
  label: Aspect 4:3 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 35 0A"
  params: []
- id: aspect_zoom
  label: Aspect Zoom (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 37 0A"
  params: []
- id: aspect_pc_auto
  label: Aspect PC Auto (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 45 0A"
  params: []
- id: aspect_pc_full
  label: Aspect PC Full (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 30 0A"
  params: []
- id: aspect_pc_just
  label: Aspect PC Just (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 46 0A"
  params: []
- id: aspect_cycle
  label: Aspect Cycle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 37 0A"
  params: []
- id: auto_align_pc
  label: Auto Align (PC input, RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 31 33 0A"
  params: []
- id: auto_lens_centre
  label: Auto Lens Centre (RC Emulation, X3/X7/X9/X70/X90/RS50/60/45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 43 39 0A"
  params: []
- id: back
  label: Back (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 33 0A"
  params: []
- id: bnr_off
  label: BNR Off (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 30 0A"
  params: []
- id: bnr_on
  label: BNR On (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 46 0A"
  params: []
- id: bright_level_down
  label: Bright Level Down (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 41 33 0A"
  params: []
- id: bright_level_up
  label: Bright Level Up (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 41 32 0A"
  params: []
- id: brightness_down
  label: Brightness Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 42 0A"
  params: []
- id: brightness_up
  label: Brightness Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 41 0A"
  params: []
- id: brightness_adj_toggle
  label: Brightness Adjustment Bar Toggle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 39 0A"
  params: []
- id: cec_off
  label: CEC Off (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 37 0A"
  params: []
- id: cec_on
  label: CEC On (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 36 0A"
  params: []
- id: clear_motion_drive_cycle
  label: Clear Motion Drive Cycle (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 38 41 0A"
  params: []
- id: clear_motion_drive_off_rc
  label: Clear Motion Drive Off (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 34 37 0A"
  params: []
- id: clear_motion_drive_mode_1_rc
  label: Clear Motion Drive Mode 1 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 43 45 0A"
  params: []
- id: clear_motion_drive_mode_2_rc
  label: Clear Motion Drive Mode 2 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 43 46 0A"
  params: []
- id: clear_motion_drive_mode_3_rc
  label: Clear Motion Drive Mode 3 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 34 38 0A"
  params: []
- id: clear_motion_drive_mode_4_rc
  label: Clear Motion Drive Mode 4 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 34 39 0A"
  params: []
- id: clear_motion_drive_inverse_telecine_rc
  label: Clear Motion Drive Inverse Telecine (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 34 41 0A"
  params: []
- id: colour_down
  label: Colour Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 44 0A"
  params: []
- id: colour_up
  label: Colour Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 43 0A"
  params: []
- id: colour_adj_toggle
  label: Colour Adjustment Bar Toggle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 35 0A"
  params: []
- id: colour_management_off
  label: Colour Management Off (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 36 30 0A"
  params: []
- id: colour_management_custom_1
  label: Colour Management Custom 1 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 36 31 0A"
  params: []
- id: colour_management_custom_2
  label: Colour Management Custom 2 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 36 32 0A"
  params: []
- id: colour_management_custom_3
  label: Colour Management Custom 3 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 36 33 0A"
  params: []
- id: colour_management_cycle
  label: Colour Management Cycle (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 38 39 0A"
  params: []
- id: colour_profile_cycle
  label: Colour Profile Cycle (RC Emulation, X7/X9/X79/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 38 38 0A"
  params: []
- id: colour_space_cycle
  label: Colour Space Cycle (RC Emulation, X3/X30/RS40/RS45)
  kind: action
  command: "21 89 01 52 43 37 33 43 44 0A"
  params: []
- id: colour_temp_5800k
  label: Colour Temp 5800K (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 34 45 0A"
  params: []
- id: colour_temp_6500k
  label: Colour Temp 6500K (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 46 0A"
  params: []
- id: colour_temp_7500k
  label: Colour Temp 7500K (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 35 30 0A"
  params: []
- id: colour_temp_9300k
  label: Colour Temp 9300K (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 35 31 0A"
  params: []
- id: colour_temp_custom_1
  label: Colour Temp Custom 1 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 33 0A"
  params: []
- id: colour_temp_custom_2
  label: Colour Temp Custom 2 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 34 0A"
  params: []
- id: colour_temp_custom_3
  label: Colour Temp Custom 3 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 35 35 0A"
  params: []
- id: colour_temp_high_bright
  label: Colour Temp High Bright (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 35 32 0A"
  params: []
- id: colour_temp_cycle
  label: Colour Temp Cycle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 36 0A"
  params: []
- id: colour_temp_gain_blue_down
  label: Colour Temp Gain Blue Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 31 0A"
  params: []
- id: colour_temp_gain_blue_up
  label: Colour Temp Gain Blue Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 30 0A"
  params: []
- id: colour_temp_gain_green_down
  label: Colour Temp Gain Green Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 38 46 0A"
  params: []
- id: colour_temp_gain_green_up
  label: Colour Temp Gain Green Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 38 45 0A"
  params: []
- id: colour_temp_gain_red_down
  label: Colour Temp Gain Red Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 38 44 0A"
  params: []
- id: colour_temp_gain_red_up
  label: Colour Temp Gain Red Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 38 43 0A"
  params: []
- id: colour_temp_offset_blue_down
  label: Colour Temp Offset Blue Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 37 0A"
  params: []
- id: colour_temp_offset_blue_up
  label: Colour Temp Offset Blue Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 36 0A"
  params: []
- id: colour_temp_offset_green_down
  label: Colour Temp Offset Green Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 35 0A"
  params: []
- id: colour_temp_offset_green_up
  label: Colour Temp Offset Green Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 34 0A"
  params: []
- id: colour_temp_offset_red_down
  label: Colour Temp Offset Red Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 33 0A"
  params: []
- id: colour_temp_offset_red_up
  label: Colour Temp Offset Red Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 32 0A"
  params: []
- id: contrast_down
  label: Contrast Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 39 0A"
  params: []
- id: contrast_up
  label: Contrast Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 38 0A"
  params: []
- id: contrast_adj_toggle
  label: Contrast Adjustment Bar Toggle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 41 0A"
  params: []
- id: cti_off
  label: CTI Off (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 35 43 0A"
  params: []
- id: cti_low
  label: CTI Low (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 35 44 0A"
  params: []
- id: cti_middle
  label: CTI Middle (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 35 45 0A"
  params: []
- id: cti_high
  label: CTI High (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 35 46 0A"
  params: []
- id: cursor_down
  label: Cursor Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 32 0A"
  params: []
- id: cursor_left
  label: Cursor Left (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 36 0A"
  params: []
- id: cursor_right
  label: Cursor Right (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 34 0A"
  params: []
- id: cursor_up
  label: Cursor Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 31 0A"
  params: []
- id: dark_level_down
  label: Dark Level Down (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 41 35 0A"
  params: []
- id: dark_level_up
  label: Dark Level Up (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 41 34 0A"
  params: []
- id: detail_enhance_down
  label: Detail Enhance Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 32 0A"
  params: []
- id: detail_enhance_up
  label: Detail Enhance Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 31 0A"
  params: []
- id: picture_tone_blue_down
  label: Picture Tone Blue Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 31 0A"
  params: []
- id: picture_tone_blue_up
  label: Picture Tone Blue Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 30 0A"
  params: []
- id: picture_tone_green_down
  label: Picture Tone Green Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 46 0A"
  params: []
- id: picture_tone_green_up
  label: Picture Tone Green Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 45 0A"
  params: []
- id: picture_tone_red_down
  label: Picture Tone Red Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 44 0A"
  params: []
- id: picture_tone_red_up
  label: Picture Tone Red Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 43 0A"
  params: []
- id: picture_tone_white_down
  label: Picture Tone White Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 42 0A"
  params: []
- id: picture_tone_white_up
  label: Picture Tone White Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 41 0A"
  params: []
- id: gamma_a_rc
  label: Gamma A (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 39 0A"
  params: []
- id: gamma_b_rc
  label: Gamma B (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 41 0A"
  params: []
- id: gamma_c_rc
  label: Gamma C (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 42 0A"
  params: []
- id: gamma_custom_1_rc
  label: Gamma Custom 1 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 43 0A"
  params: []
- id: gamma_custom_2_rc
  label: Gamma Custom 2 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 44 0A"
  params: []
- id: gamma_custom_3_rc
  label: Gamma Custom 3 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 45 0A"
  params: []
- id: gamma_d_rc
  label: Gamma D (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 33 46 0A"
  params: []
- id: gamma_normal_rc
  label: Gamma Normal (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 38 0A"
  params: []
- id: gamma_cycle
  label: Gamma Cycle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 35 0A"
  params: []
- id: hide_off
  label: Hide Off (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 44 31 0A"
  params: []
- id: hide_on
  label: Hide On (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 44 30 0A"
  params: []
- id: hide_toggle
  label: Hide Toggle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 44 0A"
  params: []
- id: horizontal_position_down
  label: Horizontal Position Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 42 0A"
  params: []
- id: horizontal_position_up
  label: Horizontal Position Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 41 0A"
  params: []
- id: information
  label: Information (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 34 0A"
  params: []
- id: input_component_rc
  label: Input Component (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 44 0A"
  params: []
- id: input_hdmi_1_rc
  label: Input HDMI 1 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 30 0A"
  params: []
- id: input_hdmi_2_rc
  label: Input HDMI 2 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 31 0A"
  params: []
- id: input_pc_rc
  label: Input PC (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 34 36 0A"
  params: []
- id: input_svideo_rc
  label: Input S-Video (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 34 43 0A"
  params: []
- id: input_video_rc
  label: Input Video (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 34 42 0A"
  params: []
- id: input_cycle
  label: Input Cycle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 38 0A"
  params: []
- id: isf_day
  label: ISF Day (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 36 34 0A"
  params: []
- id: isf_night
  label: ISF Night (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 36 35 0A"
  params: []
- id: isf_off
  label: ISF Off (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 35 41 0A"
  params: []
- id: isf_on
  label: ISF On (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 35 42 0A"
  params: []
- id: keystone_horizontal_down
  label: Keystone Correction Horizontal Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 31 0A"
  params: []
- id: keystone_horizontal_up
  label: Keystone Correction Horizontal Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 30 0A"
  params: []
- id: keystone_vertical_down
  label: Keystone Correction Vertical Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 43 0A"
  params: []
- id: keystone_vertical_up
  label: Keystone Correction Vertical Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 42 0A"
  params: []
- id: lens_aperture_1_legacy
  label: Lens Aperture 1 (RC Emulation, HD350/HD550)
  kind: action
  command: "21 89 01 52 43 37 33 32 38 0A"
  params: []
- id: lens_aperture_2_legacy
  label: Lens Aperture 2 (RC Emulation, HD350/HD550)
  kind: action
  command: "21 89 01 52 43 37 33 32 39 0A"
  params: []
- id: lens_aperture_3_legacy
  label: Lens Aperture 3 (RC Emulation, HD350/HD550)
  kind: action
  command: "21 89 01 52 43 37 33 32 41 0A"
  params: []
- id: lens_aperture_down
  label: Lens Aperture Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 31 46 0A"
  params: []
- id: lens_aperture_up
  label: Lens Aperture Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 31 45 0A"
  params: []
- id: lens_aperture_adj
  label: Lens Aperture Adjustment (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 32 30 0A"
  params: []
- id: lens_control_cycle
  label: Lens Control Cycle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 30 0A"
  params: []
- id: lens_focus_down
  label: Lens Focus Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 32 0A"
  params: []
- id: lens_focus_up
  label: Lens Focus Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 31 0A"
  params: []
- id: lens_memory_cycle
  label: Lens Memory Cycle Pages (RC Emulation, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 44 34 0A"
  params: []
- id: lens_memory_1_rc
  label: Lens Memory 1 (RC Emulation, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 44 38 0A"
  params: []
- id: lens_memory_2_rc
  label: Lens Memory 2 (RC Emulation, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 44 39 0A"
  params: []
- id: lens_memory_3_rc
  label: Lens Memory 3 (RC Emulation, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 44 41 0A"
  params: []
- id: lens_shift_down
  label: Lens Shift Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 32 0A"
  params: []
- id: lens_shift_left
  label: Lens Shift Left (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 34 0A"
  params: []
- id: lens_shift_right
  label: Lens Shift Right (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 34 33 0A"
  params: []
- id: lens_shift_up
  label: Lens Shift Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 31 0A"
  params: []
- id: lens_zoom_in
  label: Lens Zoom In (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 35 0A"
  params: []
- id: lens_zoom_out
  label: Lens Zoom Out (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 33 37 0A"
  params: []
- id: mask_bottom_down
  label: Mask Bottom Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 38 0A"
  params: []
- id: mask_bottom_up
  label: Mask Bottom Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 37 0A"
  params: []
- id: mask_left_down
  label: Mask Left Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 32 0A"
  params: []
- id: mask_left_up
  label: Mask Left Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 31 0A"
  params: []
- id: mask_right_down
  label: Mask Right Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 34 0A"
  params: []
- id: mask_right_up
  label: Mask Right Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 33 0A"
  params: []
- id: mask_top_down
  label: Mask Top Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 36 0A"
  params: []
- id: mask_top_up
  label: Mask Top Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 35 0A"
  params: []
- id: menu_toggle
  label: Menu Toggle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 45 0A"
  params: []
- id: menu_position
  label: Menu Position (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 34 32 0A"
  params: []
- id: mnr_down
  label: MNR Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 45 0A"
  params: []
- id: mnr_up
  label: MNR Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 44 0A"
  params: []
- id: nr_toggle
  label: NR Toggle (RNR/MNR display, RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 31 38 0A"
  params: []
- id: ok
  label: OK (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 32 46 0A"
  params: []
- id: phase_pc_down
  label: Phase PC Input Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 39 0A"
  params: []
- id: phase_pc_up
  label: Phase PC Input Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 38 0A"
  params: []
- id: picture_adjust
  label: Picture Adjust (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 37 32 0A"
  params: []
- id: picture_mode_3d_rc
  label: Picture Mode 3D (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 38 37 0A"
  params: []
- id: picture_mode_cinema_1_rc
  label: Picture Mode Cinema 1 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 36 39 0A"
  params: []
- id: picture_mode_cinema_2_rc
  label: Picture Mode Cinema 2 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 36 38 0A"
  params: []
- id: picture_mode_cinema_3_rc
  label: Picture Mode Cinema 3 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 36 36 0A"
  params: []
- id: picture_mode_dynamic_rc
  label: Picture Mode Dynamic (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 36 42 0A"
  params: []
- id: picture_mode_natural_rc
  label: Picture Mode Natural (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 41 0A"
  params: []
- id: picture_mode_stage_rc
  label: Picture Mode Stage (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 37 0A"
  params: []
- id: picture_mode_thx_rc
  label: Picture Mode THX (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 36 46 0A"
  params: []
- id: picture_mode_user_1_rc
  label: Picture Mode User 1 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 43 0A"
  params: []
- id: picture_mode_user_2_rc
  label: Picture Mode User 2 (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 36 44 0A"
  params: []
- id: picture_mode_user_3_rc
  label: Picture Mode User 3 (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 36 45 0A"
  params: []
- id: picture_mode_user_4_rc
  label: Picture Mode User 4 (RC Emulation, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 43 41 0A"
  params: []
- id: picture_mode_user_5_rc
  label: Picture Mode User 5 (RC Emulation, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 43 42 0A"
  params: []
- id: pixel_shift_h_blue_down
  label: Pixel Shift Horizontal Blue Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 45 0A"
  params: []
- id: pixel_shift_h_blue_up
  label: Pixel Shift Horizontal Blue Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 44 0A"
  params: []
- id: pixel_shift_h_green_down
  label: Pixel Shift Horizontal Green Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 43 0A"
  params: []
- id: pixel_shift_h_green_up
  label: Pixel Shift Horizontal Green Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 42 0A"
  params: []
- id: pixel_shift_h_red_down
  label: Pixel Shift Horizontal Red Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 41 0A"
  params: []
- id: pixel_shift_h_red_up
  label: Pixel Shift Horizontal Red Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 39 0A"
  params: []
- id: pixel_shift_v_blue_down
  label: Pixel Shift Vertical Blue Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 43 34 0A"
  params: []
- id: pixel_shift_v_blue_up
  label: Pixel Shift Vertical Blue Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 43 33 0A"
  params: []
- id: pixel_shift_v_green_down
  label: Pixel Shift Vertical Green Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 43 32 0A"
  params: []
- id: pixel_shift_v_green_up
  label: Pixel Shift Vertical Green Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 43 31 0A"
  params: []
- id: pixel_shift_v_red_down
  label: Pixel Shift Vertical Red Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 43 30 0A"
  params: []
- id: pixel_shift_v_red_up
  label: Pixel Shift Vertical Red Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 42 46 0A"
  params: []
- id: power_off_rc
  label: Power Off (RC Emulation, send twice with short delay)
  kind: action
  command: "21 89 01 52 43 37 33 30 36 0A"
  params: []
- id: power_on_rc
  label: Power On (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 35 0A"
  params: []
- id: rnr_down
  label: RNR Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 43 0A"
  params: []
- id: rnr_up
  label: RNR Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 30 42 0A"
  params: []
- id: screen_adjust_off
  label: Screen Adjust Off (RC Emulation, X3/X30/RS40/45)
  kind: action
  command: "21 89 01 52 43 37 33 38 30 0A"
  params: []
- id: screen_adjust_a
  label: Screen Adjust A (RC Emulation, X3/X30/RS40/45)
  kind: action
  command: "21 89 01 52 43 37 33 38 31 0A"
  params: []
- id: screen_adjust_b
  label: Screen Adjust B (RC Emulation, X3/X30/RS40/45)
  kind: action
  command: "21 89 01 52 43 37 33 38 32 0A"
  params: []
- id: screen_adjust_c
  label: Screen Adjust C (RC Emulation, X3/X30/RS40/45)
  kind: action
  command: "21 89 01 52 43 37 33 38 33 0A"
  params: []
- id: sharpness_down
  label: Sharpness Down (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 46 0A"
  params: []
- id: sharpness_up
  label: Sharpness Up (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 37 45 0A"
  params: []
- id: sharpness_adj_toggle
  label: Sharpness Adjustment Bar Toggle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 34 0A"
  params: []
- id: shutter_close
  label: Shutter Close (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 31 39 0A"
  params: []
- id: shutter_open
  label: Shutter Open (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 31 41 0A"
  params: []
- id: shutter_off
  label: Shutter Off (unsync from Hide) (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 32 44 0A"
  params: []
- id: shutter_on
  label: Shutter On (sync with Hide) (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 32 43 0A"
  params: []
- id: test_pattern_cycle
  label: Test Pattern Cycle (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 35 39 0A"
  params: []
- id: thx_bright
  label: THX Bright (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 38 35 0A"
  params: []
- id: thx_dark
  label: THX Dark (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 38 36 0A"
  params: []
- id: thx_off
  label: THX Off (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 43 37 0A"
  params: []
- id: thx_on
  label: THX On (RC Emulation, X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 43 38 0A"
  params: []
- id: tint_down
  label: Tint Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 39 0A"
  params: []
- id: tint_up
  label: Tint Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 39 38 0A"
  params: []
- id: tint_adj_toggle
  label: Tint Adjustment Bar Toggle (RC Emulation)
  kind: action
  command: "21 89 01 52 43 37 33 31 36 0A"
  params: []
- id: tracking_pc_down
  label: Tracking PC Input Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 37 0A"
  params: []
- id: tracking_pc_up
  label: Tracking PC Input Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 36 0A"
  params: []
- id: user_picture_cycle
  label: User Picture Mode Cycle (User 1-5) (RC Emulation, X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 44 37 0A"
  params: []
- id: vertical_position_down
  label: Vertical Position Down (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 44 0A"
  params: []
- id: vertical_position_up
  label: Vertical Position Up (RC Emulation, applicable models per source)
  kind: action
  command: "21 89 01 52 43 37 33 41 43 0A"
  params: []
- id: power_status_enquiry
  label: Power Status Enquiry
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []
- id: input_status_enquiry
  label: Input Status Enquiry
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []
- id: gamma_table_enquiry
  label: Gamma Table Enquiry
  kind: query
  command: "3F 89 01 47 54 0A"
  params: []
- id: gamma_value_enquiry
  label: Gamma Value Enquiry
  kind: query
  command: "3F 89 01 47 50 0A"
  params: []
- id: source_status_enquiry
  label: Source Status Enquiry
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []
- id: model_status_enquiry
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
- id: input_state
  type: enum
  values: [svideo, video, component, pc, hdmi_1, hdmi_2]
- id: gamma_table_state
  type: enum
  values: [normal, gamma_a, gamma_b, gamma_c, gamma_custom_1, gamma_custom_2, gamma_custom_3]
- id: gamma_value_state
  type: enum
  values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6"]
- id: source_state
  type: enum
  values: [jvc_logo, no_signal_or_out_of_range, signal_input_ok]
- id: model_state
  type: enum
  values:
    - dla_hd350
    - dla_rs10
    - dla_hd750
    - dla_rs20
    - dla_hd550
    - dla_rs15
    - dla_hd950_hd990_rs25_rs35
    - dla_x3_rs40
    - dla_x7_x9_rs50_60
    - dla_x30_rs45
    - dla_x70r_x90r_rs55_65
- id: ack_basic
  type: enum
  values: [ok]
  description: |
    Basic Acknowledgement Return Code (06 89 01 ...) echoed with the first
    2 bytes of the original command (excluding the 21 89 01 header).
- id: ack_detailed
  type: enum
  values: [ok]
  description: |
    Detailed Acknowledgement Return Code (40 89 01 ...) follows the basic
    acknowledgement for enquiry requests; the RR payload byte carries the
    detailed state for the queried function.
```

## Variables
```yaml
# UNRESOLVED: source does not document discrete settable variables outside the
# action catalogue (no persistent slider values, no write-back configuration
# values). The Gamma Correction Value range (1.8-2.6) and Off Timer presets
# (1h-4h) are covered as discrete Actions above.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited push notifications. The
# documented responses are all solicited acknowledgements of commands sent
# by the controller.
```

## Macros
```yaml
- id: lan_handshake_and_command
  label: LAN connection handshake + single command
  steps:
    - description: Open TCP connection to the projector (default 192.168.0.2, port 20554).
    - description: Wait for "PJ_OK" from the projector.
    - description: Within 5 seconds, send "PJREQ".
    - description: Wait for "PJACK" from the projector.
    - description: Within 5 seconds, send the desired hex command (any direct command or enquiry).
    - description: Receive acknowledgement response.
    - description: Projector closes connection after 5 seconds.
  notes: |
    Source: "Local Area Network (LAN) Control" section. Each command requires
    re-establishing the connection. If controller fails to respond within
    5 seconds at steps 3 or 5, the projector closes the connection.
- id: power_off_via_rc_emulation
  label: Power Off (RC Emulation, send twice)
  steps:
    - description: Send RC Emulation Power Off (21 89 01 52 43 37 33 30 36 0A).
    - description: Wait a short delay.
    - description: Send the same Power Off command again.
  notes: |
    Source: "Power - Off (send twice with short delay between to switch off)"
    in the RC Emulation table.
- id: ir_code_b_switch
  label: Switch projector to IR Code B
  steps:
    - description: Use the Infrared Remote Code direct command with the "B" payload (21 89 01 53 55 52 43 31 0A), OR
    - description: Navigate the projector's on-screen menu (Service > Option > IR Code on X3/X7/X9/RS40/50/60; Function menu on X30/X70/X90/RS45/55/65) and select Code B.
  notes: |
    Source: "Multiple Projector Infrared Control" section. After switching
    to Code B the projector only accepts hex code 63 (decimal 99) instead
    of the default 73 (decimal 115).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document any safety warnings, interlocks, or
# power-on sequencing requirements beyond the operational note that
# "Power - Off (RC Emulation)" must be sent twice and the device ignores
# "inappropriate commands, e.g. Power On when in cooling mode".
```

## Notes
- The source document is the vendor "RS-232C, LAN and Infrared Remote Control Guide" Version 1.4, which lists applicable models as DLA-HD350/HD550/HD750/HD950/HD990/X3/X7/X9/X30/X70R/X90R/RS10/RS15/RS20/RS25/RS35/RS40/RS45/RS50/RS55/RS60/RS65. The DLA-NP5 and DLA-RS1100 are not on this list. Per-command model applicability should be verified against the actual NP5/RS1100 firmware.
- Every RS-232 command is binary hex, framed as: Header (1 byte: 21=command, 3F=enquiry, 06=basic ack, 40=detailed ack) + Unit ID (89 01) + Command (2 bytes) + Data (variable) + End (0A). The 89 01 unit ID is fixed across all models.
- The serial null command (21 89 01 00 00 0A) is the recommended way to verify connectivity; the projector responds with 06 89 01 00 00 0A whether it is in Standby or Powered On.
- LAN control is documented as TCP on port 20554 with a five-step handshake (PJ_OK / PJREQ / PJACK) and a 5-second timeout window at steps 3 and 5. The source only documents LAN control for the X7/X9/X30/X70/X90/RS50/60/RS45/55/65 family. Port 20554 is therefore a tentative value for the DLA-NP5 / DLA-RS1100.
- Multiple infrared remote codes (A=73, B=63) are available on the X3/X7/X9/X30/X70/X90/RS40/RS50/RS60/RS45/RS55/RS65 family to allow side-by-side control of multiple projectors; the source does not state whether the NP5/RS1100 supports Code B.
- The projector ignores commands with wrong Unit ID, parity errors, invalid commands, or commands sent during inappropriate states (e.g. Power On while cooling). A break of 50 ms or longer in incoming data causes the projector to discard the current command.
- The Crestron example in the source appends `\r` to the power-on command. The vendor guide does not explicitly require a trailing CR for the projector; this is a controller-convention artifact and not part of the projector's wire protocol.
<!-- UNRESOLVED: per-command applicability to DLA-NP5 / DLA-RS1100 not verified; LAN TCP port 20554 and Code B IR support inherited from sibling-family documentation and not independently confirmed for the NP5/RS1100. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
  - manual3.jvckenwood.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-3961-01/GBLESYxjclkllb.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-3961-01/GBLESYmrvanzpd.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-3961-01/GBLESYyfujtbjg.php
  - https://manual3.jvckenwood.com/projector/mobile/dla/b5a-3961-01/GBLESYeeamtdau.php
retrieved_at: 2026-06-12T02:12:54.967Z
last_checked_at: 2026-06-12T19:22:48.792Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:22:48.792Z
matched_actions: 327
action_count: 327
confidence: medium
summary: "All 327 spec actions confirmed verbatim in source; transport values (19200 baud, port 20554, 8N1) all present; source command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DLA-NP5 and DLA-RS1100 are not in the source's \"FOR MODELS\" list. Command coverage in this spec is inherited from the family; per-command model applicability has not been independently verified."
- "source does not specify a TCP port for general DLA-NP5/RS1100 LAN control; port 20554 is documented for the X7/X9/X30/X70/X90/RS50/60/RS45/55/65 family only. Listed a second entry as a flag; treat port below as UNRESOLVED for NP5/RS1100."
- "source documents 20554 only for the X7/X9/X30/X70/X90/RS50/60/RS45/55/65 LAN-enabled family; DLA-NP5 / DLA-RS1100 may differ."
- "source does not document discrete settable variables outside the"
- "source does not document unsolicited push notifications. The"
- "source does not document any safety warnings, interlocks, or"
- "per-command applicability to DLA-NP5 / DLA-RS1100 not verified; LAN TCP port 20554 and Code B IR support inherited from sibling-family documentation and not independently confirmed for the NP5/RS1100."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
