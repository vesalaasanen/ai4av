---
spec_id: admin/jvc-dla-rs-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC DLA-RS Series Control Spec"
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
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-06-25T11:30:02.660Z
last_checked_at: 2026-06-25T15:31:44.219Z
generated_at: 2026-06-25T15:31:44.219Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Infrared control (73/63 hex preamble + ASCII code) is documented in the source but not modelled as a transport here; it is a one-way IR remote protocol, not a wired/network interface."
  - "no continuously-variable settable parameters documented as a"
  - "no asynchronous event emission described in source."
  - "no multi-step sequences explicitly described in source."
  - "no thermal/lamp-interlock procedures beyond cooling-state ignoring"
  - "voltage / current / lamp power draw values not present in source (only \"Lamp Power - Normal/High\" command exists, no wattage)."
  - "exact firmware version compatibility range not stated; source is \"Version 1.4\" of the control guide, not device firmware."
  - "Power Off \"short delay\" between the two required sends is not numerically specified in source."
  - "LAN handshake exact window (\"within 5 seconds\") is stated, but minimum inter-command delay on RS-232C beyond the ack-wait rule is not specified."
verification:
  verdict: verified
  checked_at: 2026-06-25T15:31:44.219Z
  matched_actions: 155
  action_count: 155
  confidence: medium
  summary: "deterministic presence proof: 155/155 payloads verbatim in source; stratified Sonnet sample corroborated (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# JVC DLA-RS Series Control Spec

## Summary
JVC D-ILA home theatre projector family spanning the HD350/550/750/950/990, X3/X7/X9/X30/X70R/X90R and RS10/15/20/25/35/40/45/50/55/60/65 model lines. This spec covers the documented external control interfaces: RS-232C serial control (all models) and LAN (TCP/IP) control on the X7/X9/X30/X70/X90 and RS45/50/55/60/65 subset. Control is exercised via a binary hex command protocol with two command classes — Direct Commands and Remote Control Emulation Commands — plus a set of enquiry (status query) commands that return detailed state.

<!-- UNRESOLVED: Infrared control (73/63 hex preamble + ASCII code) is documented in the source but not modelled as a transport here; it is a one-way IR remote protocol, not a wired/network interface. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# RS-232C applies to ALL models. LAN/TCP applies only to:
#   DLA-X7, X9, X30, X70, X90, DLA-RS45, RS50, RS55, RS60, RS65
addressing:
  port: 20554  # TCP port for LAN control - only port projector will communicate on
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  data_format: binary  # send/receive modes set to Hex in control software
auth:
  type: none  # inferred: no credential/login procedure in source; LAN uses PJ_OK/PJREQ/PJACK handshake (connection establishment, not auth)
```

## Traits
```yaml
- powerable    # inferred: power on/off Direct + Emulation commands present
- queryable    # inferred: 3F-based enquiry commands return power/input/gamma/source/model status
- levelable    # inferred: brightness, contrast, colour, tint, sharpness, gamma value, lens aperture +/- commands present
```

## Actions
```yaml
# All payloads are verbatim hex byte sequences from the source. Bytes use
# the source's "NNh" notation; {NAME} tokens are parameters substituted at
# send time. No bytes are reformatted from the source.

- id: 3_d_setting_direct_access_to_3_d_setting_menu_x30_x70_x90_rs45_55_65
  label: "3D Setting - Direct access to 3D Setting menu (X30/X70/X90/RS45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 44 35 0A"
  params: []

- id: 3_d_format_cycles_through_all_available_3_d_formats_x30_x70_x90_rs45_55_65
  label: "3D Format - Cycles through all available 3D formats (X30/X70/X90/RS45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 44 36 0A"
  params: []

- id: advanced_direct_access_to_picture_adjust_>_advanced_menu_hd550_950_990_x3_x7_x9_x30_x70_x90_rs15_25_35_40_50_60_45_55_65
  label: "Advanced - Direct access to Picture Adjust > Advanced menu (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 37 33 0A"
  params: []

- id: anamorphic_off_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65_vertical_stretch_off_hd350_750_950_990_rs10_20_25_35
  label: "Anamorphic - Off (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) / Vertical Stretch - Off (HD350/750/950/990/RS10/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 32 34 0A"
  params: []

- id: anamorphic_a_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65_vertical_stretch_on_hd350_750_950_990_rs10_20_25_35
  label: "Anamorphic - A (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) / Vertical Stretch - On (HD350/750/950/990/RS10/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 32 33 0A"
  params: []

- id: anamorphic_b_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Anamorphic - B (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 32 42 0A"
  params: []

- id: anamorphic_cycles_through_off_a_b_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Anamorphic - Cycles through Off/A/B (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 35 0A"
  params: []

- id: aspect_zoom
  label: "Aspect-Zoom"
  kind: action
  command: "21 89 01 52 43 37 33 32 37 0A"
  params: []

- id: aspect_pc_auto_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Aspect (PC) - Auto (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 45 0A"
  params: []

- id: aspect_pc_full_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Aspect (PC) - Full (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 30 0A"
  params: []

- id: aspect_pc_just_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Aspect (PC) - Just (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 46 0A"
  params: []

- id: auto_align_pc_input_on_hd750_950_990_x7_x9_x70_x90_rs20_25_35_50_60_55_65
  label: "Auto Align (PC input on HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 31 33 0A"
  params: []

- id: auto_lens_centre_x3_x7_x9_x70_x90_rs50_60_45_55_65
  label: "Auto Lens Centre (X3/X7/X9/X70/X90/RS50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 39 0A"
  params: []

- id: back_steps_backwards_through_menus_and_removes_any_osd_messages
  label: "Back - Steps backwards through menus and removes any OSD messages"
  kind: action
  command: "21 89 01 52 43 37 33 30 33 0A"
  params: []

- id: bnr_block_noise_reduction_off
  label: "BNR (Block Noise Reduction)-Off"
  kind: action
  command: "21 89 01 52 43 37 33 31 30 0A"
  params: []

- id: bright_level_x7_x9_x70_x90_rs50_60_55_65
  label: "Bright Level-(X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 33 0A"
  params: []

- id: brightness-
  label: "Brightness-"
  kind: action
  command: "21 89 01 52 43 37 33 37 42 0A"
  params: []

- id: cec_off
  label: "CEC-Off"
  kind: action
  command: "21 89 01 52 43 37 33 35 37 0A"
  params: []

- id: clear_motion_drive_cycles_through_off_mode_1_mode_2_mode_3_mode_4_inverse_telecine_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Clear Motion Drive - Cycles through: Off/Mode 1/Mode 2/Mode 3/Mode 4/Inverse Telecine (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 38 41 0A"
  params: []

- id: clear_motion_drive_off_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Clear Motion Drive - Off (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 34 37 0A"
  params: []

- id: clear_motion_drive_mode_1_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Clear Motion Drive - Mode 1 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 45 0A"
  params: []

- id: clear_motion_drive_mode_2_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Clear Motion Drive - Mode 2 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 46 0A"
  params: []

- id: clear_motion_drive_mode_3_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Clear Motion Drive - Mode 3 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 34 38 0A"
  params: []

- id: clear_motion_drive_mode_4_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Clear Motion Drive - Mode 4 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 34 39 0A"
  params: []

- id: clear_motion_drive_inverse_telecine_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Clear Motion Drive - Inverse Telecine (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 34 41 0A"
  params: []

- id: colour
  label: "Colour +"
  kind: action
  command: "21 89 01 52 43 37 33 37 43 0A"
  params: []

- id: colour_management_off_hd750_950_990_x7_x9_rs20_25_35_50_60_55_65
  label: "Colour Management - Off (HD750/950/990/X7/X9/RS20/25/35/50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 36 30 0A"
  params: []

- id: colour_management_custom_1_hd750_950_990_x7_x9_rs20_25_35_50_60_55_65
  label: "Colour Management - Custom 1 (HD750/950/990/X7/X9/RS20/25/35/50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 36 31 0A"
  params: []

- id: colour_management_custom_2_hd750_950_990_x7_x9_rs20_25_35_50_60_55_65
  label: "Colour Management - Custom 2 (HD750/950/990/X7/X9/RS20/25/35/50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 36 32 0A"
  params: []

- id: colour_management_custom_3_hd750_950_990_x7_x9_rs20_25_35_50_60_55_65
  label: "Colour Management - Custom 3 (HD750/950/990/X7/X9/RS20/25/35/50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 36 33 0A"
  params: []

- id: colour_management_cycles_through_off_custom_1_custom_2_custom_3_x7_x9_x70_x90_rs50_60_55_65
  label: "Colour Management - Cycles through: Off/Custom 1/Custom 2/Custom 3 (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 38 39 0A"
  params: []

- id: colour_profile_cycles_through_all_available_colour_profiles_x7_x9_x79_x90_rs50_60_55_65
  label: "Colour Profile - Cycles through all available Colour Profiles (X7/X9/X79/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 38 38 0A"
  params: []

- id: colour_space_cycles_through_standard_wide_1_wide_2_x3_x30_rs40_rs45
  label: "Colour Space - Cycles through Standard/Wide 1/Wide 2 (X3/X30/RS40/RS45)"
  kind: action
  command: "21 89 01 52 43 37 33 43 44 0A"
  params: []

- id: colour_temp_5800_k_hd350_550_750_950_990_rs10_15_20_25_35
  label: "Colour Temp. - 5800K (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 34 45 0A"
  params: []

- id: colour_temp_7500_k_hd350_550_750_950_990_rs10_15_20_25_35
  label: "Colour Temp. - 7500K (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 35 30 0A"
  params: []

- id: colour_temp_9300_k_hd350_550_750_950_990_rs10_15_20_25_35
  label: "Colour Temp. - 9300K (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 35 31 0A"
  params: []

- id: colour_temp_custom_2
  label: "Colour Temp.-Custom 2"
  kind: action
  command: "21 89 01 52 43 37 33 35 34 0A"
  params: []

- id: colour_temp_high_bright_hd350_550_750_950_990_x3_x30_rs10_15_20_25_35_40_45
  label: "Colour Temp. - High Bright (HD350/550/750/950/990/X3/X30/RS10/15/20/25/35/40/45)"
  kind: action
  command: "21 89 01 52 43 37 33 35 32 0A"
  params: []

- id: colour_temp_cycles_through_all_options
  label: "Colour Temp. + (cycles through all options)"
  kind: action
  command: "21 89 01 52 43 37 33 37 36 0A"
  params: []

- id: colour_temperature_gain_blue_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Gain Blue - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 39 31 0A"
  params: []

- id: colour_temperature_gain_blue_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Gain Blue + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 39 30 0A"
  params: []

- id: colour_temperature_gain_green_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Gain Green - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 38 46 0A"
  params: []

- id: colour_temperature_gain_green_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Gain Green + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 38 45 0A"
  params: []

- id: colour_temperature_gain_red_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Gain Red - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 38 44 0A"
  params: []

- id: colour_temperature_gain_red_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Gain Red + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 38 43 0A"
  params: []

- id: colour_temperature_offset_blue_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Offset Blue - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 39 37 0A"
  params: []

- id: colour_temperature_offset_blue_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Offset Blue + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 39 36 0A"
  params: []

- id: colour_temperature_offset_green_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Offset Green - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 39 35 0A"
  params: []

- id: colour_temperature_offset_green_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Offset Green + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 39 34 0A"
  params: []

- id: colour_temperature_offset_red_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Offset Red - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 39 33 0A"
  params: []

- id: colour_temperature_offset_red_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Colour Temperature Offset Red + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 39 32 0A"
  params: []

- id: contrast
  label: "Contrast +"
  kind: action
  command: "21 89 01 52 43 37 33 37 38 0A"
  params: []

- id: cti_colour_transient_improvement_off_hd350_550_750_950_990_rs10_15_20_25_35
  label: "CTI (Colour Transient Improvement) - Off (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 35 43 0A"
  params: []

- id: cti_colour_transient_improvement_low_hd350_550_750_950_990_rs10_15_20_25_35
  label: "CTI (Colour Transient Improvement) - Low (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 35 44 0A"
  params: []

- id: cti_colour_transient_improvement_middle_hd350_550_750_950_990_rs10_15_20_25_35
  label: "CTI (Colour Transient Improvement) - Middle (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 35 45 0A"
  params: []

- id: cti_colour_transient_improvement_high_hd350_550_750_950_990_rs10_15_20_25_35
  label: "CTI (Colour Transient improvement) - High (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 35 46 0A"
  params: []

- id: cursor_down▼
  label: "Cursor Down▼"
  kind: action
  command: "21 89 01 52 43 37 33 30 32 0A"
  params: []

- id: cursor_right►
  label: "Cursor Right►"
  kind: action
  command: "21 89 01 52 43 37 33 33 34 0A"
  params: []

- id: dark_level_x7_x9_x70_x90_rs50_60_55_65
  label: "Dark Level + (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 34 0A"
  params: []

- id: detail_enhance
  label: "Detail Enhance +"
  kind: action
  command: "21 89 01 52 43 37 33 31 31 0A"
  params: []

- id: picture_tone_blue_-_x7_x9_rs50_60_film_mode_only_x70_x90_rs55_65_all_modes
  label: "Picture Tone Blue - (X7/X9/RS50/60 - Film Mode Only) (X70/X90/RS55/65-All Modes)"
  kind: action
  command: "21 89 01 52 43 37 33 41 31 0A"
  params: []

- id: picture_tone_blue_x7_x9_rs50_60_film_mode_only_x70_x90_rs55_65_all_modes
  label: "Picture Tone Blue + (X7/X9/RS50/60 - Film Mode Only) (X70/X90/RS55/65-All Modes)"
  kind: action
  command: "21 89 01 52 43 37 33 41 30 0A"
  params: []

- id: picture_tone_green_-_x7_x9_rs50_60_film_mode_only_x70_x90_rs55_65_all_modes
  label: "Picture Tone Green - (X7/X9/RS50/60 - Film Mode Only) (X70/X90/RS55/65-All Modes)"
  kind: action
  command: "21 89 01 52 43 37 33 39 46 0A"
  params: []

- id: picture_tone_green_x7_x9_rs50_60_film_mode_only_x70_x90_rs55_65_all_modes
  label: "Picture Tone Green + (X7/X9/RS50/60 - Film Mode Only) (X70/X90/RS55/65-All Modes)"
  kind: action
  command: "21 89 01 52 43 37 33 39 45 0A"
  params: []

- id: picture_tone_red_-_x7_x9_rs50_60_film_mode_only_x70_x90_rs55_65_all_modes
  label: "Picture Tone Red - (X7/X9/RS50/60 - Film Mode Only) (X70/X90/RS55/65-All Modes)"
  kind: action
  command: "21 89 01 52 43 37 33 39 44 0A"
  params: []

- id: picture_tone_red_x7_x9_rs50_60_film_mode_only_x70_x90_rs55_65_all_modes
  label: "Picture Tone Red + (X7/X9/RS50/60 - Film Mode Only) (X70/X90/RS55/65-All Modes)"
  kind: action
  command: "21 89 01 52 43 37 33 39 43 0A"
  params: []

- id: picture_tone_white_-_x7_x9_rs50_60_film_mode_only_x70_x90_rs55_65_all_modes
  label: "Picture Tone White - (X7/X9/RS50/60 - Film Mode Only) (X70/X90/RS55/65-All Modes)"
  kind: action
  command: "21 89 01 52 43 37 33 39 42 0A"
  params: []

- id: picture_tone_white_x7_x9_rs50_60_film_mode_only_x70_x90_rs55_65_all_modes
  label: "Picture Tone White + (X7/X9/RS50/60 - Film Mode Only) (X70/X90/RS55/65- All Modes)"
  kind: action
  command: "21 89 01 52 43 37 33 39 41 0A"
  params: []

- id: gamma_b
  label: "Gamma-B"
  kind: action
  command: "21 89 01 52 43 37 33 33 41 0A"
  params: []

- id: gamma_custom_1
  label: "Gamma-Custom 1"
  kind: action
  command: "21 89 01 52 43 37 33 33 43 0A"
  params: []

- id: gamma_d_hd550_950_990_x3_x7_x9_x30_x70_x90_rs15_25_35_40_50_60_45_55_65
  label: "Gamma - D (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 33 46 0A"
  params: []

- id: gamma_cycles_through_all_options
  label: "Gamma + (cycles through all options)"
  kind: action
  command: "21 89 01 52 43 37 33 37 35 0A"
  params: []

- id: hide_off_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Hide - Off (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 44 31 0A"
  params: []

- id: hide_on_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Hide - On (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 44 30 0A"
  params: []

- id: horizontal_position_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Horizontal Position - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 42 0A"
  params: []

- id: horizontal_position_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Horizontal Position + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 41 0A"
  params: []

- id: information_displays_information_tab_of_menu
  label: "Information (displays Information tab of menu)"
  kind: action
  command: "21 89 01 52 43 37 33 37 34 0A"
  params: []

- id: input_hdmi_1
  label: "Input-HDMI 1"
  kind: action
  command: "21 89 01 52 43 37 33 37 30 0A"
  params: []

- id: input_pc_hd750_950_990_x7_x9_x70_x90_rs20_25_35_50_60_55_65
  label: "Input - PC (HD750/950/990/X7/X9/X70/X90 RS20/25/35/50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 34 36 0A"
  params: []

- id: input_video_hd350_550_750_950_990
  label: "Input-Video (HD350/550/750/950/990)"
  kind: action
  command: "21 89 01 52 43 37 33 34 42 0A"
  params: []

- id: isf_day_x7_x9_x70_x90_rs50_60_55_65
  label: "ISF-Day (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 36 34 0A"
  params: []

- id: isf_off_hd950_990_x7_x9_x70_x90_rs25_35_50_60_55_65
  label: "ISF - Off (HD950/990/X7/X9/X70/X90/RS25/35/50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 35 41 0A"
  params: []

- id: isf_on_hd950_990_x7_x9_x70_x90_rs25_35_50_60_55_65
  label: "ISF - On (HD950/990/X7/X9/X70/X90/RS25/35/50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 35 42 0A"
  params: []

- id: keystone_correction_horizontal-
  label: "Keystone Correction Horizontal-"
  kind: action
  command: "21 89 01 52 43 37 33 34 31 0A"
  params: []

- id: keystone_correction_vertical
  label: "Keystone Correction Vertical +"
  kind: action
  command: "21 89 01 52 43 37 33 31 42 0A"
  params: []

- id: lens_aperture_2_hd350_hd550
  label: "Lens Aperture-2 (HD350/HD550)"
  kind: action
  command: "21 89 01 52 43 37 33 32 39 0A"
  params: []

- id: lens_aperture_-_if_lens_aperture_gauge_is_not_displayed_displays_gauge_if_lens_aperture_gauge_is_already_displayed_lens_aperture_is_decreased_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Lens Aperture - If Lens Aperture Gauge is not displayed - displays gauge. If Lens Aperture Gauge is already displayed - Lens Aperture is decreased (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 31 46 0A"
  params: []

- id: lens_aperture_if_lens_aperture_gauge_is_not_displayed_displays_gauge_if_lens_aperture_gauge_is_already_displayed_lens_aperture_is_increased_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Lens Aperture + If Lens Aperture Gauge is not displayed - displays gauge. If Lens Aperture Gauge is already displayed - Lens Aperture is increased (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 31 45 0A"
  params: []

- id: lens_aperture_adj_hd350_750_950_990_rs10_20_25_35_adjustment_bar_on_off_toggle_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65_displays_adjustment_bar_hd550_rs15_cycles_through_all_options
  label: "Lens Aperture Adj. (HD350/750/950/990/RS10/20/25/35 - Adjustment Bar On/Off toggle) (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 - Displays Adjustment Bar) (HD550/RS15-Cycles through all options)"
  kind: action
  command: "21 89 01 52 43 37 33 32 30 0A"
  params: []

- id: lens_focus
  label: "Lens Focus +"
  kind: action
  command: "21 89 01 52 43 37 33 33 31 0A"
  params: []

- id: lens_memory_cycles_through_lens_memory_pages_select_save_name_edit_x30_x70_x90_rs45_55_65
  label: "Lens Memory - Cycles through Lens Memory Pages: Select/Save/Name Edit (X30/X70/X90/RS45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 44 34 0A"
  params: []

- id: lens_memory_1_x30_x70_x90_rs45_55_65
  label: "Lens Memory 1 (X30/X70/X90/RS45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 44 38 0A"
  params: []

- id: lens_memory_3_x30_x70_x90_rs45_55_65
  label: "Lens Memory 3 (X30/X70/X90/RS45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 44 41 0A"
  params: []

- id: lens_shift_left
  label: "Lens Shift-Left"
  kind: action
  command: "21 89 01 52 43 37 33 34 34 0A"
  params: []

- id: lens_zoom_in
  label: "Lens Zoom-In"
  kind: action
  command: "21 89 01 52 43 37 33 33 35 0A"
  params: []

- id: mask_bottom_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Mask Bottom - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 38 0A"
  params: []

- id: mask_bottom_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Mask Bottom + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 37 0A"
  params: []

- id: mask_left_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Mask Left - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 32 0A"
  params: []

- id: mask_left_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Mask Left + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 31 0A"
  params: []

- id: mask_right_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Mask Right - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 34 0A"
  params: []

- id: mask_right_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Mask Right + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 33 0A"
  params: []

- id: mask_top_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Mask Top - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 36 0A"
  params: []

- id: mask_top_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Mask Top + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 35 0A"
  params: []

- id: menu_on_off_toggle
  label: "Menu (On/Off toggle)"
  kind: action
  command: "21 89 01 52 43 37 33 32 45 0A"
  params: []

- id: menu_position_hd550_950_990_x3_x7_x9_x30_x70_x90_rs15_25_35_40_50_60_45_55_65
  label: "Menu Position (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 34 32 0A"
  params: []

- id: mnr_mosquito_noise_reduction
  label: "MNR (Mosquito Noise Reduction) +"
  kind: action
  command: "21 89 01 52 43 37 33 30 44 0A"
  params: []

- id: nr_toggles_display_of_rnr_mnr_hd350_550_750_950_990_rs10_15_20_25_35
  label: "NR (toggles display of RNR/MNR) (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 31 38 0A"
  params: []

- id: phase_pc_input_-_x7_x9_x70_x90_rs50_60_55_65
  label: "Phase (PC Input) - (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 39 0A"
  params: []

- id: phase_pc_input_x7_x9_x70_x90_rs50_60_55_65
  label: "Phase (PC Input) + (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 38 0A"
  params: []

- id: picture_adjust_hd550_750_990_x3_x7_x9_x30_x70_x90_rs15_25_35_40_50_60_45_55_65
  label: "Picture Adjust (HD550/750/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 37 32 0A"
  params: []

- id: picture_mode_3_d_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Picture Mode - 3D (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 38 37 0A"
  params: []

- id: picture_mode_cinema_1_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65_film_mode
  label: "Picture Mode - Cinema 1 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65- Film Mode)"
  kind: action
  command: "21 89 01 52 43 37 33 36 39 0A"
  params: []

- id: picture_mode_cinema_2_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65_cinema_mode
  label: "Picture Mode - Cinema 2 (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65-CinemaMode)"
  kind: action
  command: "21 89 01 52 43 37 33 36 38 0A"
  params: []

- id: picture_mode_cinema_3_hd550_750_990_rs15_25_35_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65_animation_mode
  label: "Picture Mode - Cinema 3 (HD550/750/990/RS15/25/35) (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65- Animation Mode)"
  kind: action
  command: "21 89 01 52 43 37 33 36 36 0A"
  params: []

- id: picture_mode_dynamic_hd350_550_750_950_990
  label: "Picture Mode - Dynamic (HD350/550/750/950/990)"
  kind: action
  command: "21 89 01 52 43 37 33 36 42 0A"
  params: []

- id: picture_mode_stage
  label: "Picture Mode-Stage"
  kind: action
  command: "21 89 01 52 43 37 33 36 37 0A"
  params: []

- id: picture_mode_thx_hd750_950_990_x7_x9_x70_x90_rs20_25_35_50_60_55_65
  label: "Picture Mode - THX (HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 36 46 0A"
  params: []

- id: picture_mode_user_2
  label: "Picture Mode-User 2"
  kind: action
  command: "21 89 01 52 43 37 33 36 44 0A"
  params: []

- id: picture_mode_user_3_hd550_750_950_990_x3_x30_rs20_25_35_40_45
  label: "Picture Mode - User 3 (HD550/750/950/990/X3/X30/RS20/25/35/40/45)"
  kind: action
  command: "21 89 01 52 43 37 33 36 45 0A"
  params: []

- id: picture_mode_user_4_x30_x70_x90_rs45_55_65
  label: "Picture Mode - User 4 (X30/X70/X90/RS45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 41 0A"
  params: []

- id: picture_mode_user_5_x30_x70_x90_rs45_55_65
  label: "Picture Mode - User 5 (X30/X70/X90/RS45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 42 0A"
  params: []

- id: pixel_shift_horizontal_blue_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Horizontal Blue - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 45 0A"
  params: []

- id: pixel_shift_horizontal_blue_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Horizontal Blue + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 44 0A"
  params: []

- id: pixel_shift_horizontal_green_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Horizontal Green - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 43 0A"
  params: []

- id: pixel_shift_horizontal_green_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Horizontal Green + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 42 0A"
  params: []

- id: pixel_shift_horizontal_red_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Horizontal Red - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 41 0A"
  params: []

- id: pixel_shift_horizontal_red_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Horizontal Red + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 39 0A"
  params: []

- id: pixel_shift_vertical_blue_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Vertical Blue - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 34 0A"
  params: []

- id: pixel_shift_vertical_blue_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Vertical Blue + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 33 0A"
  params: []

- id: pixel_shift_vertical_green_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Vertical Green - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 32 0A"
  params: []

- id: pixel_shift_vertical_green_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Vertical Green + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 31 0A"
  params: []

- id: pixel_shift_vertical_red_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Vertical Red - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 30 0A"
  params: []

- id: pixel_shift_vertical_red_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Pixel Shift - Vertical Red + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 42 46 0A"
  params: []

- id: power_off_send_twice_with_short_delay_between_to_switch_off
  label: "Power - Off (send twice with short delay between to switch off)"
  kind: action
  command: "21 89 01 52 43 37 33 30 36 0A"
  params: []

- id: rnr_random_noise_reduction-
  label: "RNR (Random Noise Reduction)-"
  kind: action
  command: "21 89 01 52 43 37 33 30 43 0A"
  params: []

- id: screen_adjust_off_x3_x30_rs40_45
  label: "Screen Adjust-Off (X3/X30/RS40/45)"
  kind: action
  command: "21 89 01 52 43 37 33 38 30 0A"
  params: []

- id: screen_adjust_c_x3_x30_rs40_45
  label: "Screen Adjust-C (X3/X30/RS40/45)"
  kind: action
  command: "21 89 01 52 43 37 33 38 33 0A"
  params: []

- id: sharpness
  label: "Sharpness +"
  kind: action
  command: "21 89 01 52 43 37 33 37 45 0A"
  params: []

- id: sharpness_adj_adjustment_bar_on_off_toggle
  label: "Sharpness Adj. (Adjustment Bar On/Off toggle)"
  kind: action
  command: "21 89 01 52 43 37 33 31 34 0A"
  params: []

- id: shutter_close_hd550_950_990_x3_x7_x9_x30_x70_x90_rs15_25_35_40_50_60_45_55_65
  label: "Shutter - Close (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 31 39 0A"
  params: []

- id: shutter_open_hd550_950_990_x3_x7_x9_x30_x70_x90_rs15_25_35_40_50_60_45_55_65
  label: "Shutter - Open (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 31 41 0A"
  params: []

- id: shutter_off_un_synchronises_shutter_with_hide_function_hd550_950_990_x3_x7_x9_x30_x70_x90_rs15_25_35_40_50_60_45_55_65
  label: "Shutter - Off - Un-synchronises shutter with \"Hide\" function (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 32 44 0A"
  params: []

- id: shutter_on_synchronises_shutter_with_hide_function_hd550_950_990_x3_x7_x9_x30_x70_x90_rs15_25_35_40_50_60_45_55_65
  label: "Shutter - On - Synchronises shutter with \"Hide\" function (HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 32 43 0A"
  params: []

- id: test_pattern_cycles_through_all_patterns_hd350_550_750_950_990_rs10_15_20_25_35
  label: "Test Pattern (cycles through all patterns) (HD350/550/750/950/990/RS10/15/20/25/35)"
  kind: action
  command: "21 89 01 52 43 37 33 35 39 0A"
  params: []

- id: thx_bright_x7_x9_x70_x90_rs50_60_55_65
  label: "THX-Bright (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 38 35 0A"
  params: []

- id: thx_on_x7_x9_x70_x90_rs50_60_55_65
  label: "THX-On (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 43 38 0A"
  params: []

- id: tint_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Tint - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 39 39 0A"
  params: []

- id: tint_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Tint + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 39 38 0A"
  params: []

- id: tracking_-_pc_input_x7_x9_x70_x90_rs50_60_55_65
  label: "Tracking - (PC Input) (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 37 0A"
  params: []

- id: tracking_pc_input_x7_x9_x70_x90_rs50_60_55_65
  label: "Tracking + (PC Input) (X7/X9/X70/X90/RS50/60/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 36 0A"
  params: []

- id: user_cycles_through_user_1_user_5_picture_modes_x30_x70_x90_rs45_55_65
  label: "User - Cycles through User 1 - User 5 Picture Modes (X30/X70/X90/RS45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 44 37 0A"
  params: []

- id: vertical_position_-_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Vertical Position - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 44 0A"
  params: []

- id: vertical_position_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Vertical Position + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 41 43 0A"
  params: []

- id: vertical_stretch_off_hd350_550_750_950_990_rs10_15_20_25_35_anamorphic_off_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Vertical Stretch - Off (HD350/550/750/950/990/RS10/15/20/25/35) / Anamorphic - Off (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 32 34 0A"
  params: []

- id: vertical_stretch_on_hd350_550_750_950_990_rs10_15_20_25_35_anamorphic_a_x3_x7_x9_x30_x70_x90_rs40_50_60_45_55_65
  label: "Vertical Stretch - On (HD350/550/750/950/990/RS10/15/20/25/35) / Anamorphic - A (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)"
  kind: action
  command: "21 89 01 52 43 37 33 32 33 0A"
  params: []
```

## Feedbacks
```yaml

```

## Variables
```yaml
# UNRESOLVED: no continuously-variable settable parameters documented as a
# get/set variable pair in source. All adjustments are exposed as discrete
# +/- or toggle actions (see Actions).
```

## Events
```yaml
# No unsolicited notifications documented. Projector only responds to commands.
# UNRESOLVED: no asynchronous event emission described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off
    # Source: "Power - Off (send twice with short delay between to switch off)".
    # A single Power Off command does NOT switch the unit off - the controller
    # must send it twice with a short delay to confirm the intent.
interlocks:
  - cooling_state
    # Source: "inappropriate commands, e.g. Power On when in cooling mode" are
    # ignored. Controller must wait for cooling to complete (Power Status RR=32
    # → RR=30) before issuing power commands.
# UNRESOLVED: no thermal/lamp-interlock procedures beyond cooling-state ignoring
# are explicitly documented in the source.
```

## Notes
**Command structure.** All commands are binary hex. Sent-to-projector commands are 7 or 10 bytes; responses are 6 to 14 bytes. Frame = `Header(1) | Unit ID 89 01(2) | Command(2) | Data(varies) | End 0A(1)`. Headers: `21` operating command, `3F` detailed-response request, `06` basic ack (projector→controller), `40` detailed ack (projector→controller). Unit ID is fixed `89 01` on every model.

**Direct vs Remote Control Emulation.** Two command classes exist. Direct Commands produce fewer on-screen confirmations and should be preferred when both exist for the same function; some functions are duplicated across both classes.

**LAN control connection sequence (TCP, port 20554).** Mandatory handshake before each command:
1. Controller opens TCP connection (three-way handshake) to port 20554.
2. Projector immediately returns `PJ_OK`.
3. Controller must respond `PJREQ` within **5 seconds**.
4. Projector immediately returns `PJACK`.
5. Controller must send the command within **5 seconds** of `PJACK`.
The projector closes the connection ~5 s after the response. **Each command requires a fresh connection establishment.** If the controller misses either 5 s window, the projector drops the connection.

**LAN enablement.** LAN control is opt-in: projector menu → Function → Communication Terminal → change from `RS-232C` (default) to `LAN`. Default static IP `192.168.0.2`, mask `255.255.255.0`, gateway `192.168.0.254`, DHCP off.

**Serial cable.** Cross-connected (null-modem / DTE-DTE) cable required. 9-pin D-Sub male: pin 2 = Rx, pin 3 = Tx, pin 5 = ground; pins 1, 4, 6-9 no connection.

**Command timing.** Any break of **50 ms or longer** in incoming serial data causes the projector to discard the in-progress command. For consecutive commands, the controller must wait for the acknowledgement response before sending the next.

**Error handling.** Unrecognised commands (bad Unit ID, parity error, invalid opcode) and inappropriate commands (e.g. Power On while cooling) are silently ignored — no error response is emitted.

**Infrared control.** Source documents a separate IR protocol (`73 {ascii_hex}` preamble, switchable to code `63`/Code B for dual-projector rooms) but this is a one-way remote protocol and is not modelled as a wired transport in this spec.

<!-- UNRESOLVED: voltage / current / lamp power draw values not present in source (only "Lamp Power - Normal/High" command exists, no wattage). -->
<!-- UNRESOLVED: exact firmware version compatibility range not stated; source is "Version 1.4" of the control guide, not device firmware. -->
<!-- UNRESOLVED: Power Off "short delay" between the two required sends is not numerically specified in source. -->
<!-- UNRESOLVED: LAN handshake exact window ("within 5 seconds") is stated, but minimum inter-command delay on RS-232C beyond the ack-wait rule is not specified. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-06-25T11:30:02.660Z
last_checked_at: 2026-06-25T15:31:44.219Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T15:31:44.219Z
matched_actions: 155
action_count: 155
confidence: medium
summary: "deterministic presence proof: 155/155 payloads verbatim in source; stratified Sonnet sample corroborated (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Infrared control (73/63 hex preamble + ASCII code) is documented in the source but not modelled as a transport here; it is a one-way IR remote protocol, not a wired/network interface."
- "no continuously-variable settable parameters documented as a"
- "no asynchronous event emission described in source."
- "no multi-step sequences explicitly described in source."
- "no thermal/lamp-interlock procedures beyond cooling-state ignoring"
- "voltage / current / lamp power draw values not present in source (only \"Lamp Power - Normal/High\" command exists, no wattage)."
- "exact firmware version compatibility range not stated; source is \"Version 1.4\" of the control guide, not device firmware."
- "Power Off \"short delay\" between the two required sends is not numerically specified in source."
- "LAN handshake exact window (\"within 5 seconds\") is stated, but minimum inter-command delay on RS-232C beyond the ack-wait rule is not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
