---
spec_id: admin/christie-lx750-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie LX750 Control Spec"
manufacturer: Christie
model_family: LX750
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - LX750
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000161-02-christie-tech-guid-lw650_ls700_lx750_lw720-.pdf
  - https://www.manualslib.com/manual/918644/Christie-Lx750.html
  - https://www.manualslib.com/manual/1226224/Christie-Lx750.html
retrieved_at: 2026-05-22T05:51:48.893Z
last_checked_at: 2026-06-23T11:53:01.834Z
generated_at: 2026-06-23T11:53:01.834Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PJLink command set documented separately — PJLink actions not enumerated here as the source treats them as a distinct protocol layer"
verification:
  verdict: verified
  checked_at: 2026-06-23T11:53:01.834Z
  matched_actions: 636
  action_count: 636
  confidence: medium
  summary: "All 636 spec actions match source hex sequences verbatim; transport 19200 8N1 + TCP 23 confirmed. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Christie LX750 Control Spec

## Summary
The Christie LX750 is an XGA DLP projector controlled via RS-232C serial (19200 bps, 8N1) using a binary protocol with a 7-byte header (BE EF 03 06 00 CRC_low CRC_high) plus 6-byte command data. The same binary protocol is also accessible over TCP on ports 23 and 9715; port 9715 uses an additional framing wrapper with checksum and connection ID. This spec covers all RS-232C/Network commands documented in the command table.

<!-- UNRESOLVED: PJLink command set documented separately — PJLink actions not enumerated here as the source treats them as a distinct protocol layer -->

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
  port: 23  # TCP #23 (default enabled); TCP #9715 also available with additional framing
auth:
  type: none  # inferred: no auth procedure required by default; optional MD5 challenge-response auth configurable per port
```

## Traits
```yaml
- powerable    # inferred from power on/off commands
- queryable    # inferred from GET commands throughout the command table
- levelable    # inferred from brightness, contrast, zoom, focus, and other increment/decrement commands
- routable     # inferred from input source selection and monitor-out routing commands
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  hex: "BE EF 03 06 00 2A D3 01 00 00 60 00 00"
  params: []

- id: power_on
  label: Power On
  kind: action
  hex: "BE EF 03 06 00 BA D2 01 00 00 60 01 00"
  params: []

- id: power_get
  label: Power Status Get
  kind: query
  hex: "BE EF 03 06 00 19 D3 02 00 00 60 00 00"
  params: []

- id: input_source_set_computer_in_1
  label: Select Input COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 FE D2 01 00 00 20 00 00"
  params: []

- id: input_source_set_computer_in_2
  label: Select Input COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 3E D0 01 00 00 20 04 00"
  params: []

- id: input_source_set_hdmi
  label: Select Input HDMI
  kind: action
  hex: "BE EF 03 06 00 0E D2 01 00 00 20 03 00"
  params: []

- id: input_source_set_video_1
  label: Select Input VIDEO 1
  kind: action
  hex: "BE EF 03 06 00 6E D3 01 00 00 20 01 00"
  params: []

- id: input_source_set_s_video
  label: Select Input S-VIDEO
  kind: action
  hex: "BE EF 03 06 00 9E D3 01 00 00 20 02 00"
  params: []

- id: input_source_set_component
  label: Select Input COMPONENT
  kind: action
  hex: "BE EF 03 06 00 AE D1 01 00 00 20 05 00"
  params: []

- id: input_source_set_bnc
  label: Select Input BNC
  kind: action
  hex: "BE EF 03 06 00 CE D0 01 00 00 20 07 00"
  params: []

- id: input_source_set_dvi_d
  label: Select Input DVI-D
  kind: action
  hex: "BE EF 03 06 00 AE D4 01 00 00 20 09 00"
  params: []

- id: input_source_set_video_2
  label: Select Input VIDEO 2
  kind: action
  hex: "BE EF 03 06 00 5E D4 01 00 00 20 0A 00"
  params: []

- id: input_source_get
  label: Input Source Get
  kind: query
  hex: "BE EF 03 06 00 CD D2 02 00 00 20 00 00"
  params: []

- id: error_status_get
  label: Error Status Get
  kind: query
  hex: "BE EF 03 06 00 D9 D8 02 00 20 60 00 00"
  params: []

- id: brightness_get
  label: Brightness Get
  kind: query
  hex: "BE EF 03 06 00 89 D2 02 00 03 20 00 00"
  params: []

- id: brightness_increment
  label: Brightness Increment
  kind: action
  hex: "BE EF 03 06 00 EF D2 04 00 03 20 00 00"
  params: []

- id: brightness_decrement
  label: Brightness Decrement
  kind: action
  hex: "BE EF 03 06 00 3E D3 05 00 03 20 00 00"
  params: []

- id: contrast_get
  label: Contrast Get
  kind: query
  hex: "BE EF 03 06 00 FD D3 02 00 04 20 00 00"
  params: []

- id: contrast_increment
  label: Contrast Increment
  kind: action
  hex: "BE EF 03 06 00 9B D3 04 00 04 20 00 00"
  params: []

- id: contrast_decrement
  label: Contrast Decrement
  kind: action
  hex: "BE EF 03 06 00 4A D2 05 00 04 20 00 00"
  params: []

- id: picture_mode_set_normal
  label: Picture Mode Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 23 F6 01 00 BA 30 00 00"
  params: []

- id: picture_mode_set_cinema
  label: Picture Mode Set CINEMA
  kind: action
  hex: "BE EF 03 06 00 B3 F7 01 00 BA 30 01 00"
  params: []

- id: picture_mode_set_dynamic
  label: Picture Mode Set DYNAMIC
  kind: action
  hex: "BE EF 03 06 00 E3 F4 01 00 BA 30 04 00"
  params: []

- id: picture_mode_set_board_black
  label: Picture Mode Set BOARD(BLACK)
  kind: action
  hex: "BE EF 03 06 00 E3 EF 01 00 BA 30 20 00"
  params: []

- id: picture_mode_set_board_green
  label: Picture Mode Set BOARD(GREEN)
  kind: action
  hex: "BE EF 03 06 00 73 EE 01 00 BA 30 21 00"
  params: []

- id: picture_mode_set_white_board
  label: Picture Mode Set WHITE BOARD
  kind: action
  hex: "BE EF 03 06 00 83 EE 01 00 BA 30 22 00"
  params: []

- id: picture_mode_set_day_time
  label: Picture Mode Set DAY TIME
  kind: action
  hex: "BE EF 03 06 00 E3 C7 01 00 BA 30 40 00"
  params: []

- id: picture_mode_set_custom
  label: Picture Mode Set CUSTOM
  kind: action
  hex: "BE EF 03 06 00 E3 FB 01 00 BA 30 10 00"
  params: []

- id: picture_mode_get
  label: Picture Mode Get
  kind: query
  hex: "BE EF 03 06 00 10 F6 02 00 BA 30 00 00"
  params: []

- id: gamma_set_1_default
  label: Gamma Set 1 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 07 E9 01 00 A1 30 20 00"
  params: []

- id: gamma_set_2_default
  label: Gamma Set 2 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 97 E8 01 00 A1 30 21 00"
  params: []

- id: gamma_set_3_default
  label: Gamma Set 3 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 67 E8 01 00 A1 30 22 00"
  params: []

- id: gamma_set_4_default
  label: Gamma Set 4 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 F7 E9 01 00 A1 30 23 00"
  params: []

- id: gamma_set_5_default
  label: Gamma Set 5 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 C7 EB 01 00 A1 30 24 00"
  params: []

- id: gamma_set_6_default
  label: Gamma Set 6 DEFAULT
  kind: action
  hex: "BE EF 03 06 00 57 EA 01 00 A1 30 25 00"
  params: []

- id: gamma_set_1_custom
  label: Gamma Set 1 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 07 FD 01 00 A1 30 10 00"
  params: []

- id: gamma_set_2_custom
  label: Gamma Set 2 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 97 FC 01 00 A1 30 11 00"
  params: []

- id: gamma_set_3_custom
  label: Gamma Set 3 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 67 FC 01 00 A1 30 12 00"
  params: []

- id: gamma_set_4_custom
  label: Gamma Set 4 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 F7 FD 01 00 A1 30 13 00"
  params: []

- id: gamma_set_5_custom
  label: Gamma Set 5 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 C7 FF 01 00 A1 30 14 00"
  params: []

- id: gamma_set_6_custom
  label: Gamma Set 6 CUSTOM
  kind: action
  hex: "BE EF 03 06 00 57 FE 01 00 A1 30 15 00"
  params: []

- id: gamma_get
  label: Gamma Get
  kind: query
  hex: "BE EF 03 06 00 F4 F0 02 00 A1 30 00 00"
  params: []

- id: user_gamma_pattern_set_off
  label: User Gamma Pattern Set Off
  kind: action
  hex: "BE EF 03 06 00 FB FA 01 00 80 30 00 00"
  params: []

- id: user_gamma_pattern_set_9step
  label: User Gamma Pattern Set 9stepGrayScale
  kind: action
  hex: "BE EF 03 06 00 6B FB 01 00 80 30 01 00"
  params: []

- id: user_gamma_pattern_set_15step
  label: User Gamma Pattern Set 15stepGrayScale
  kind: action
  hex: "BE EF 03 06 00 9B FB 01 00 80 30 02 00"
  params: []

- id: user_gamma_pattern_set_ramp
  label: User Gamma Pattern Set Ramp
  kind: action
  hex: "BE EF 03 06 00 0B FA 01 00 80 30 03 00"
  params: []

- id: user_gamma_pattern_get
  label: User Gamma Pattern Get
  kind: query
  hex: "BE EF 03 06 00 C8 FA 02 00 80 30 00 00"
  params: []

- id: user_gamma_point_1_get
  label: User Gamma Point 1 Get
  kind: query
  hex: "BE EF 03 06 00 08 FE 02 00 90 30 00 00"
  params: []

- id: user_gamma_point_1_increment
  label: User Gamma Point 1 Increment
  kind: action
  hex: "BE EF 03 06 00 6E FE 04 00 90 30 00 00"
  params: []

- id: user_gamma_point_1_decrement
  label: User Gamma Point 1 Decrement
  kind: action
  hex: "BE EF 03 06 00 BF FF 05 00 90 30 00 00"
  params: []

- id: user_gamma_point_2_get
  label: User Gamma Point 2 Get
  kind: query
  hex: "BE EF 03 06 00 F4 FF 02 00 91 30 00 00"
  params: []

- id: user_gamma_point_2_increment
  label: User Gamma Point 2 Increment
  kind: action
  hex: "BE EF 03 06 00 92 FF 04 00 91 30 00 00"
  params: []

- id: user_gamma_point_2_decrement
  label: User Gamma Point 2 Decrement
  kind: action
  hex: "BE EF 03 06 00 43 FE 05 00 91 30 00 00"
  params: []

- id: user_gamma_point_3_get
  label: User Gamma Point 3 Get
  kind: query
  hex: "BE EF 03 06 00 B0 FF 02 00 92 30 00 00"
  params: []

- id: user_gamma_point_3_increment
  label: User Gamma Point 3 Increment
  kind: action
  hex: "BE EF 03 06 00 D6 FF 04 00 92 30 00 00"
  params: []

- id: user_gamma_point_3_decrement
  label: User Gamma Point 3 Decrement
  kind: action
  hex: "BE EF 03 06 00 07 FE 05 00 92 30 00 00"
  params: []

- id: user_gamma_point_4_get
  label: User Gamma Point 4 Get
  kind: query
  hex: "BE EF 03 06 00 4C FE 02 00 93 30 00 00"
  params: []

- id: user_gamma_point_4_increment
  label: User Gamma Point 4 Increment
  kind: action
  hex: "BE EF 03 06 00 2A FE 04 00 93 30 00 00"
  params: []

- id: user_gamma_point_4_decrement
  label: User Gamma Point 4 Decrement
  kind: action
  hex: "BE EF 03 06 00 FB FF 05 00 93 30 00 00"
  params: []

- id: user_gamma_point_5_get
  label: User Gamma Point 5 Get
  kind: query
  hex: "BE EF 03 06 00 38 FF 02 00 94 30 00 00"
  params: []

- id: user_gamma_point_5_increment
  label: User Gamma Point 5 Increment
  kind: action
  hex: "BE EF 03 06 00 5E FF 04 00 94 30 00 00"
  params: []

- id: user_gamma_point_5_decrement
  label: User Gamma Point 5 Decrement
  kind: action
  hex: "BE EF 03 06 00 8F FE 05 00 94 30 00 00"
  params: []

- id: user_gamma_point_6_get
  label: User Gamma Point 6 Get
  kind: query
  hex: "BE EF 03 06 00 C4 FE 02 00 95 30 00 00"
  params: []

- id: user_gamma_point_6_increment
  label: User Gamma Point 6 Increment
  kind: action
  hex: "BE EF 03 06 00 A2 FE 04 00 95 30 00 00"
  params: []

- id: user_gamma_point_6_decrement
  label: User Gamma Point 6 Decrement
  kind: action
  hex: "BE EF 03 06 00 73 FF 05 00 95 30 00 00"
  params: []

- id: user_gamma_point_7_get
  label: User Gamma Point 7 Get
  kind: query
  hex: "BE EF 03 06 00 80 FE 02 00 96 30 00 00"
  params: []

- id: user_gamma_point_7_increment
  label: User Gamma Point 7 Increment
  kind: action
  hex: "BE EF 03 06 00 E6 FE 04 00 96 30 00 00"
  params: []

- id: user_gamma_point_7_decrement
  label: User Gamma Point 7 Decrement
  kind: action
  hex: "BE EF 03 06 00 37 FF 05 00 96 30 00 00"
  params: []

- id: user_gamma_point_8_get
  label: User Gamma Point 8 Get
  kind: query
  hex: "BE EF 03 06 00 7C FF 02 00 97 30 00 00"
  params: []

- id: user_gamma_point_8_increment
  label: User Gamma Point 8 Increment
  kind: action
  hex: "BE EF 03 06 00 1A FF 04 00 97 30 00 00"
  params: []

- id: user_gamma_point_8_decrement
  label: User Gamma Point 8 Decrement
  kind: action
  hex: "BE EF 03 06 00 CB FE 05 00 97 30 00 00"
  params: []

- id: color_temp_set_1_high
  label: Color Temp Set 1 HIGH
  kind: action
  hex: "BE EF 03 06 00 0B F5 01 00 B0 30 03 00"
  params: []

- id: color_temp_set_2_mid
  label: Color Temp Set 2 MID
  kind: action
  hex: "BE EF 03 06 00 9B F4 01 00 B0 30 02 00"
  params: []

- id: color_temp_set_3_low
  label: Color Temp Set 3 LOW
  kind: action
  hex: "BE EF 03 06 00 6B F4 01 00 B0 30 01 00"
  params: []

- id: color_temp_set_4_hi_bright_1
  label: Color Temp Set 4 Hi-BRIGHT-1
  kind: action
  hex: "BE EF 03 06 00 3B F2 01 00 B0 30 08 00"
  params: []

- id: color_temp_set_5_hi_bright_2
  label: Color Temp Set 5 Hi-BRIGHT-2
  kind: action
  hex: "BE EF 03 06 00 AB F3 01 00 B0 30 09 00"
  params: []

- id: color_temp_set_6_hi_bright_3
  label: Color Temp Set 6 Hi-BRIGHT-3
  kind: action
  hex: "BE EF 03 06 00 5B F3 01 00 B0 30 0A 00"
  params: []

- id: color_temp_set_1_custom_high
  label: Color Temp Set 1 CUSTOM(HIGH)
  kind: action
  hex: "BE EF 03 06 00 CB F8 01 00 B0 30 13 00"
  params: []

- id: color_temp_set_2_custom_mid
  label: Color Temp Set 2 CUSTOM(MID)
  kind: action
  hex: "BE EF 03 06 00 5B F9 01 00 B0 30 12 00"
  params: []

- id: color_temp_set_3_custom_low
  label: Color Temp Set 3 CUSTOM(LOW)
  kind: action
  hex: "BE EF 03 06 00 AB F9 01 00 B0 30 11 00"
  params: []

- id: color_temp_set_4_custom_hi_bright_1
  label: Color Temp Set 4 CUSTOM(Hi-BRIGHT-1)
  kind: action
  hex: "BE EF 03 06 00 FB FF 01 00 B0 30 18 00"
  params: []

- id: color_temp_set_5_custom_hi_bright_2
  label: Color Temp Set 5 CUSTOM(Hi-BRIGHT-2)
  kind: action
  hex: "BE EF 03 06 00 6B FE 01 00 B0 30 19 00"
  params: []

- id: color_temp_set_6_custom_hi_bright_3
  label: Color Temp Set 6 CUSTOM(Hi-BRIGHT-3)
  kind: action
  hex: "BE EF 03 06 00 9B FE 01 00 B0 30 1A 00"
  params: []

- id: color_temp_get
  label: Color Temp Get
  kind: query
  hex: "BE EF 03 06 00 C8 F5 02 00 B0 30 00 00"
  params: []

- id: color_temp_gain_r_get
  label: Color Temp Gain R Get
  kind: query
  hex: "BE EF 03 06 00 34 F4 02 00 B1 30 00 00"
  params: []

- id: color_temp_gain_r_increment
  label: Color Temp Gain R Increment
  kind: action
  hex: "BE EF 03 06 00 52 F4 04 00 B1 30 00 00"
  params: []

- id: color_temp_gain_r_decrement
  label: Color Temp Gain R Decrement
  kind: action
  hex: "BE EF 03 06 00 83 F5 05 00 B1 30 00 00"
  params: []

- id: color_temp_gain_g_get
  label: Color Temp Gain G Get
  kind: query
  hex: "BE EF 03 06 00 70 F4 02 00 B2 30 00 00"
  params: []

- id: color_temp_gain_g_increment
  label: Color Temp Gain G Increment
  kind: action
  hex: "BE EF 03 06 00 16 F4 04 00 B2 30 00 00"
  params: []

- id: color_temp_gain_g_decrement
  label: Color Temp Gain G Decrement
  kind: action
  hex: "BE EF 03 06 00 C7 F5 05 00 B2 30 00 00"
  params: []

- id: color_temp_gain_b_get
  label: Color Temp Gain B Get
  kind: query
  hex: "BE EF 03 06 00 8C F5 02 00 B3 30 00 00"
  params: []

- id: color_temp_gain_b_increment
  label: Color Temp Gain B Increment
  kind: action
  hex: "BE EF 03 06 00 EA F5 04 00 B3 30 00 00"
  params: []

- id: color_temp_gain_b_decrement
  label: Color Temp Gain B Decrement
  kind: action
  hex: "BE EF 03 06 00 3B F4 05 00 B3 30 00 00"
  params: []

- id: color_temp_offset_r_get
  label: Color Temp Offset R Get
  kind: query
  hex: "BE EF 03 06 00 04 F5 02 00 B5 30 00 00"
  params: []

- id: color_temp_offset_r_increment
  label: Color Temp Offset R Increment
  kind: action
  hex: "BE EF 03 06 00 62 F5 04 00 B5 30 00 00"
  params: []

- id: color_temp_offset_r_decrement
  label: Color Temp Offset R Decrement
  kind: action
  hex: "BE EF 03 06 00 B3 F4 05 00 B5 30 00 00"
  params: []

- id: color_temp_offset_g_get
  label: Color Temp Offset G Get
  kind: query
  hex: "BE EF 03 06 00 40 F5 02 00 B6 30 00 00"
  params: []

- id: color_temp_offset_g_increment
  label: Color Temp Offset G Increment
  kind: action
  hex: "BE EF 03 06 00 26 F5 04 00 B6 30 00 00"
  params: []

- id: color_temp_offset_g_decrement
  label: Color Temp Offset G Decrement
  kind: action
  hex: "BE EF 03 06 00 F7 F4 05 00 B6 30 00 00"
  params: []

- id: color_temp_offset_b_get
  label: Color Temp Offset B Get
  kind: query
  hex: "BE EF 03 06 00 BC F4 02 00 B7 30 00 00"
  params: []

- id: color_temp_offset_b_increment
  label: Color Temp Offset B Increment
  kind: action
  hex: "BE EF 03 06 00 DA F4 04 00 B7 30 00 00"
  params: []

- id: color_temp_offset_b_decrement
  label: Color Temp Offset B Decrement
  kind: action
  hex: "BE EF 03 06 00 0B F5 05 00 B7 30 00 00"
  params: []

- id: color_get
  label: Color Get
  kind: query
  hex: "BE EF 03 06 00 B5 72 02 00 02 22 00 00"
  params: []

- id: color_increment
  label: Color Increment
  kind: action
  hex: "BE EF 03 06 00 D3 72 04 00 02 22 00 00"
  params: []

- id: color_decrement
  label: Color Decrement
  kind: action
  hex: "BE EF 03 06 00 02 73 05 00 02 22 00 00"
  params: []

- id: color_reset
  label: Color Reset
  kind: action
  hex: "BE EF 03 06 00 80 D0 06 00 0A 70 00 00"
  params: []

- id: tint_get
  label: Tint Get
  kind: query
  hex: "BE EF 03 06 00 49 73 02 00 03 22 00 00"
  params: []

- id: tint_increment
  label: Tint Increment
  kind: action
  hex: "BE EF 03 06 00 2F 73 04 00 03 22 00 00"
  params: []

- id: tint_decrement
  label: Tint Decrement
  kind: action
  hex: "BE EF 03 06 00 FE 72 05 00 03 22 00 00"
  params: []

- id: tint_reset
  label: Tint Reset
  kind: action
  hex: "BE EF 03 06 00 7C D1 06 00 0B 70 00 00"
  params: []

- id: sharpness_get
  label: Sharpness Get
  kind: query
  hex: "BE EF 03 06 00 F1 72 02 00 01 22 00 00"
  params: []

- id: sharpness_increment
  label: Sharpness Increment
  kind: action
  hex: "BE EF 03 06 00 97 72 04 00 01 22 00 00"
  params: []

- id: sharpness_decrement
  label: Sharpness Decrement
  kind: action
  hex: "BE EF 03 06 00 46 73 05 00 01 22 00 00"
  params: []

- id: sharpness_reset
  label: Sharpness Reset
  kind: action
  hex: "BE EF 03 06 00 C4 D0 06 00 09 70 00 00"
  params: []

- id: active_iris_set_presentation
  label: Active Iris Set PRESENTATION
  kind: action
  hex: "BE EF 03 06 00 5B 2E 01 00 04 33 11 00"
  params: []

- id: active_iris_set_theater
  label: Active Iris Set THEATER
  kind: action
  hex: "BE EF 03 06 00 CB 2F 01 00 04 33 10 00"
  params: []

- id: active_iris_set_manual
  label: Active Iris Set MANUAL
  kind: action
  hex: "BE EF 03 06 00 CB 3B 01 00 04 33 20 00"
  params: []

- id: active_iris_get
  label: Active Iris Get
  kind: query
  hex: "BE EF 03 06 00 38 22 02 00 04 33 00 00"
  params: []

- id: manual_iris_get
  label: Manual Iris Get
  kind: query
  hex: "BE EF 03 06 00 B0 22 02 00 02 33 00 00"
  params: []

- id: manual_iris_increment
  label: Manual Iris Increment
  kind: action
  hex: "BE EF 03 06 00 D6 22 04 00 02 33 00 00"
  params: []

- id: manual_iris_decrement
  label: Manual Iris Decrement
  kind: action
  hex: "BE EF 03 06 00 07 23 05 00 02 33 00 00"
  params: []

- id: my_memory_load_1
  label: My Memory Load 1
  kind: action
  hex: "BE EF 03 06 00 0E D7 01 00 14 20 00 00"
  params: []

- id: my_memory_load_2
  label: My Memory Load 2
  kind: action
  hex: "BE EF 03 06 00 9E D6 01 00 14 20 01 00"
  params: []

- id: my_memory_load_3
  label: My Memory Load 3
  kind: action
  hex: "BE EF 03 06 00 6E D6 01 00 14 20 02 00"
  params: []

- id: my_memory_load_4
  label: My Memory Load 4
  kind: action
  hex: "BE EF 03 06 00 FE D7 01 00 14 20 03 00"
  params: []

- id: my_memory_save_1
  label: My Memory Save 1
  kind: action
  hex: "BE EF 03 06 00 F2 D6 01 00 15 20 00 00"
  params: []

- id: my_memory_save_2
  label: My Memory Save 2
  kind: action
  hex: "BE EF 03 06 00 62 D7 01 00 15 20 01 00"
  params: []

- id: my_memory_save_3
  label: My Memory Save 3
  kind: action
  hex: "BE EF 03 06 00 92 D7 01 00 15 20 02 00"
  params: []

- id: my_memory_save_4
  label: My Memory Save 4
  kind: action
  hex: "BE EF 03 06 00 02 D6 01 00 15 20 03 00"
  params: []

- id: progressive_set_off
  label: Progressive Set OFF
  kind: action
  hex: "BE EF 03 06 00 4A 72 01 00 07 22 00 00"
  params: []

- id: progressive_set_tv
  label: Progressive Set TV
  kind: action
  hex: "BE EF 03 06 00 DA 73 01 00 07 22 01 00"
  params: []

- id: progressive_set_film
  label: Progressive Set FILM
  kind: action
  hex: "BE EF 03 06 00 2A 73 01 00 07 22 02 00"
  params: []

- id: progressive_get
  label: Progressive Get
  kind: query
  hex: "BE EF 03 06 00 79 72 02 00 07 22 00 00"
  params: []

- id: 3d_ycs_set_off
  label: 3D-YCS Set OFF
  kind: action
  hex: "BE EF 03 06 00 E6 70 01 00 0A 22 00 00"
  params: []

- id: 3d_ycs_set_movie
  label: 3D-YCS Set MOVIE
  kind: action
  hex: "BE EF 03 06 00 76 71 01 00 0A 22 01 00"
  params: []

- id: 3d_ycs_set_still_image
  label: 3D-YCS Set STILL IMAGE
  kind: action
  hex: "BE EF 03 06 00 86 71 01 00 0A 22 02 00"
  params: []

- id: 3d_ycs_get
  label: 3D-YCS Get
  kind: query
  hex: "BE EF 03 06 00 D5 70 02 00 0A 22 00 00"
  params: []

- id: video_nr_set_low
  label: Video NR Set LOW
  kind: action
  hex: "BE EF 03 06 00 26 72 01 00 06 22 01 00"
  params: []

- id: video_nr_set_mid
  label: Video NR Set MID
  kind: action
  hex: "BE EF 03 06 00 D6 72 01 00 06 22 02 00"
  params: []

- id: video_nr_set_high
  label: Video NR Set HIGH
  kind: action
  hex: "BE EF 03 06 00 46 73 01 00 06 22 03 00"
  params: []

- id: video_nr_get
  label: Video NR Get
  kind: query
  hex: "BE EF 03 06 00 85 73 02 00 06 22 00 00"
  params: []

- id: aspect_set_normal
  label: Aspect Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 5E DD 01 00 08 20 10 00"
  params: []

- id: aspect_set_4_3
  label: Aspect Set 4:3
  kind: action
  hex: "BE EF 03 06 00 9E D0 01 00 08 20 00 00"
  params: []

- id: aspect_set_16_9
  label: Aspect Set 16:9
  kind: action
  hex: "BE EF 03 06 00 0E D1 01 00 08 20 01 00"
  params: []

- id: aspect_set_16_10
  label: Aspect Set 16:10
  kind: action
  hex: "BE EF 03 06 00 3E D6 01 00 08 20 0A 00"
  params: []

- id: aspect_set_14_9
  label: Aspect Set 14:9
  kind: action
  hex: "BE EF 03 06 00 CE D6 01 00 08 20 09 00"
  params: []

- id: aspect_set_small
  label: Aspect Set SMALL
  kind: action
  hex: "BE EF 03 06 00 FE D1 01 00 08 20 02 00"
  params: []

- id: aspect_set_native
  label: Aspect Set NATIVE
  kind: action
  hex: "BE EF 03 06 00 5E D7 01 00 08 20 08 00"
  params: []

- id: aspect_set_full
  label: Aspect Set FULL
  kind: action
  hex: "BE EF 03 06 00 5E C9 01 00 08 20 20 00"
  params: []

- id: aspect_get
  label: Aspect Get
  kind: query
  hex: "BE EF 03 06 00 AD D0 02 00 08 20 00 00"
  params: []

- id: over_scan_get
  label: Over Scan Get
  kind: query
  hex: "BE EF 03 06 00 91 70 02 00 09 22 00 00"
  params: []

- id: over_scan_increment
  label: Over Scan Increment
  kind: action
  hex: "BE EF 03 06 00 F7 70 04 00 09 22 00 00"
  params: []

- id: over_scan_decrement
  label: Over Scan Decrement
  kind: action
  hex: "BE EF 03 06 00 26 71 05 00 09 22 00 00"
  params: []

- id: over_scan_reset
  label: Over Scan Reset
  kind: action
  hex: "BE EF 03 06 00 EC D9 06 00 27 70 00 00"
  params: []

- id: v_position_get
  label: V Position Get
  kind: query
  hex: "BE EF 03 06 00 0D 83 02 00 00 21 00 00"
  params: []

- id: v_position_increment
  label: V Position Increment
  kind: action
  hex: "BE EF 03 06 00 6B 83 04 00 00 21 00 00"
  params: []

- id: v_position_decrement
  label: V Position Decrement
  kind: action
  hex: "BE EF 03 06 00 BA 82 05 00 00 21 00 00"
  params: []

- id: v_position_reset
  label: V Position Reset
  kind: action
  hex: "BE EF 03 06 00 E0 D2 06 00 02 70 00 00"
  params: []

- id: h_position_get
  label: H Position Get
  kind: query
  hex: "BE EF 03 06 00 F1 82 02 00 01 21 00 00"
  params: []

- id: h_position_increment
  label: H Position Increment
  kind: action
  hex: "BE EF 03 06 00 97 82 04 00 01 21 00 00"
  params: []

- id: h_position_decrement
  label: H Position Decrement
  kind: action
  hex: "BE EF 03 06 00 46 83 05 00 01 21 00 00"
  params: []

- id: h_position_reset
  label: H Position Reset
  kind: action
  hex: "BE EF 03 06 00 1C D3 06 00 03 70 00 00"
  params: []

- id: h_phase_get
  label: H Phase Get
  kind: query
  hex: "BE EF 03 06 00 49 83 02 00 03 21 00 00"
  params: []

- id: h_phase_increment
  label: H Phase Increment
  kind: action
  hex: "BE EF 03 06 00 2F 83 04 00 03 21 00 00"
  params: []

- id: h_phase_decrement
  label: H Phase Decrement
  kind: action
  hex: "BE EF 03 06 00 FE 82 05 00 03 21 00 00"
  params: []

- id: h_size_get
  label: H Size Get
  kind: query
  hex: "BE EF 03 06 00 B5 82 02 00 02 21 00 00"
  params: []

- id: h_size_increment
  label: H Size Increment
  kind: action
  hex: "BE EF 03 06 00 D3 82 04 00 02 21 00 00"
  params: []

- id: h_size_decrement
  label: H Size Decrement
  kind: action
  hex: "BE EF 03 06 00 02 83 05 00 02 21 00 00"
  params: []

- id: h_size_reset
  label: H Size Reset
  kind: action
  hex: "BE EF 03 06 00 68 D2 06 00 04 70 00 00"
  params: []

- id: auto_adjust
  label: Auto Adjust
  kind: action
  hex: "BE EF 03 06 00 91 D0 06 00 0A 20 00 00"
  params: []

- id: color_space_set_auto
  label: Color Space Set AUTO
  kind: action
  hex: "BE EF 03 06 00 0E 72 01 00 04 22 00 00"
  params: []

- id: color_space_set_rgb
  label: Color Space Set RGB
  kind: action
  hex: "BE EF 03 06 00 9E 73 01 00 04 22 01 00"
  params: []

- id: color_space_set_smpte240
  label: Color Space Set SMPTE240
  kind: action
  hex: "BE EF 03 06 00 6E 73 01 00 04 22 02 00"
  params: []

- id: color_space_set_rec709
  label: Color Space Set REC709
  kind: action
  hex: "BE EF 03 06 00 FE 72 01 00 04 22 03 00"
  params: []

- id: color_space_set_rec601
  label: Color Space Set REC601
  kind: action
  hex: "BE EF 03 06 00 CE 70 01 00 04 22 04 00"
  params: []

- id: color_space_get
  label: Color Space Get
  kind: query
  hex: "BE EF 03 06 00 3D 72 02 00 04 22 00 00"
  params: []

- id: component_set_component
  label: Component Set COMPONENT
  kind: action
  hex: "BE EF 03 06 00 4A D7 01 00 17 20 00 00"
  params: []

- id: component_set_scart_rgb
  label: Component Set SCART RGB
  kind: action
  hex: "BE EF 03 06 00 DA D6 01 00 17 20 01 00"
  params: []

- id: component_get
  label: Component Get
  kind: query
  hex: "BE EF 03 06 00 79 D7 02 00 17 20 00 00"
  params: []

- id: s_video_format_set_auto
  label: S-VIDEO Format Set AUTO
  kind: action
  hex: "BE EF 03 06 00 E6 70 01 00 12 22 0A 00"
  params: []

- id: s_video_format_set_ntsc
  label: S-VIDEO Format Set NTSC
  kind: action
  hex: "BE EF 03 06 00 86 74 01 00 12 22 04 00"
  params: []

- id: s_video_format_set_pal
  label: S-VIDEO Format Set PAL
  kind: action
  hex: "BE EF 03 06 00 16 75 01 00 12 22 05 00"
  params: []

- id: s_video_format_set_secam
  label: S-VIDEO Format Set SECAM
  kind: action
  hex: "BE EF 03 06 00 16 70 01 00 12 22 09 00"
  params: []

- id: s_video_format_set_ntsc443
  label: S-VIDEO Format Set NTSC4.43
  kind: action
  hex: "BE EF 03 06 00 26 77 01 00 12 22 02 00"
  params: []

- id: s_video_format_set_m_pal
  label: S-VIDEO Format Set M-PAL
  kind: action
  hex: "BE EF 03 06 00 86 71 01 00 12 22 08 00"
  params: []

- id: s_video_format_set_n_pal
  label: S-VIDEO Format Set N-PAL
  kind: action
  hex: "BE EF 03 06 00 76 74 01 00 12 22 07 00"
  params: []

- id: s_video_format_get
  label: S-VIDEO Format Get
  kind: query
  hex: "BE EF 03 06 00 75 76 02 00 12 22 00 00"
  params: []

- id: video1_format_set_auto
  label: VIDEO 1 Format Set AUTO
  kind: action
  hex: "BE EF 03 06 00 A2 70 01 00 11 22 0A 00"
  params: []

- id: video1_format_set_ntsc
  label: VIDEO 1 Format Set NTSC
  kind: action
  hex: "BE EF 03 06 00 C2 74 01 00 11 22 04 00"
  params: []

- id: video1_format_set_pal
  label: VIDEO 1 Format Set PAL
  kind: action
  hex: "BE EF 03 06 00 52 75 01 00 11 22 05 00"
  params: []

- id: video1_format_set_secam
  label: VIDEO 1 Format Set SECAM
  kind: action
  hex: "BE EF 03 06 00 52 70 01 00 11 22 09 00"
  params: []

- id: video1_format_set_ntsc443
  label: VIDEO 1 Format Set NTSC4.43
  kind: action
  hex: "BE EF 03 06 00 62 77 01 00 11 22 02 00"
  params: []

- id: video1_format_set_m_pal
  label: VIDEO 1 Format Set M-PAL
  kind: action
  hex: "BE EF 03 06 00 C2 71 01 00 11 22 08 00"
  params: []

- id: video1_format_set_n_pal
  label: VIDEO 1 Format Set N-PAL
  kind: action
  hex: "BE EF 03 06 00 32 74 01 00 11 22 07 00"
  params: []

- id: video1_format_get
  label: VIDEO 1 Format Get
  kind: query
  hex: "BE EF 03 06 00 31 76 02 00 11 22 00 00"
  params: []

- id: video2_format_set_auto
  label: VIDEO 2 Format Set AUTO
  kind: action
  hex: "BE EF 03 06 00 86 72 01 00 1A 22 0A 00"
  params: []

- id: video2_format_set_ntsc
  label: VIDEO 2 Format Set NTSC
  kind: action
  hex: "BE EF 03 06 00 E6 76 01 00 1A 22 04 00"
  params: []

- id: video2_format_set_pal
  label: VIDEO 2 Format Set PAL
  kind: action
  hex: "BE EF 03 06 00 76 77 01 00 1A 22 05 00"
  params: []

- id: video2_format_set_secam
  label: VIDEO 2 Format Set SECAM
  kind: action
  hex: "BE EF 03 06 00 76 72 01 00 1A 22 09 00"
  params: []

- id: video2_format_set_ntsc443
  label: VIDEO 2 Format Set NTSC4.43
  kind: action
  hex: "BE EF 03 06 00 46 75 01 00 1A 22 02 00"
  params: []

- id: video2_format_set_m_pal
  label: VIDEO 2 Format Set M-PAL
  kind: action
  hex: "BE EF 03 06 00 E6 73 01 00 1A 22 08 00"
  params: []

- id: video2_format_set_n_pal
  label: VIDEO 2 Format Set N-PAL
  kind: action
  hex: "BE EF 03 06 00 16 76 01 00 1A 22 07 00"
  params: []

- id: video2_format_get
  label: VIDEO 2 Format Get
  kind: query
  hex: "BE EF 03 06 00 15 74 02 00 1A 22 00 00"
  params: []

- id: hdmi_format_set_auto
  label: HDMI Format Set AUTO
  kind: action
  hex: "BE EF 03 06 00 BA 77 01 00 13 22 00 00"
  params: []

- id: hdmi_format_set_video
  label: HDMI Format Set VIDEO
  kind: action
  hex: "BE EF 03 06 00 2A 76 01 00 13 22 01 00"
  params: []

- id: hdmi_format_set_computer
  label: HDMI Format Set COMPUTER
  kind: action
  hex: "BE EF 03 06 00 DA 76 01 00 13 22 02 00"
  params: []

- id: hdmi_format_get
  label: HDMI Format Get
  kind: query
  hex: "BE EF 03 06 00 89 77 02 00 13 22 00 00"
  params: []

- id: dvi_d_format_set_auto
  label: DVI-D Format Set AUTO
  kind: action
  hex: "BE EF 03 06 00 62 74 01 00 19 22 00 00"
  params: []

- id: dvi_d_format_set_video
  label: DVI-D Format Set VIDEO
  kind: action
  hex: "BE EF 03 06 00 F2 75 01 00 19 22 01 00"
  params: []

- id: dvi_d_format_set_computer
  label: DVI-D Format Set COMPUTER
  kind: action
  hex: "BE EF 03 06 00 02 75 01 00 19 22 02 00"
  params: []

- id: dvi_d_format_get
  label: DVI-D Format Get
  kind: query
  hex: "BE EF 03 06 00 51 74 02 00 19 22 00 00"
  params: []

- id: hdmi_range_set_auto
  label: HDMI Range Set AUTO
  kind: action
  hex: "BE EF 03 06 00 86 D8 01 00 22 20 00 00"
  params: []

- id: hdmi_range_set_normal
  label: HDMI Range Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 16 D9 01 00 22 20 01 00"
  params: []

- id: hdmi_range_set_enhanced
  label: HDMI Range Set ENHANCED
  kind: action
  hex: "BE EF 03 06 00 E6 D9 01 00 22 20 02 00"
  params: []

- id: hdmi_range_get
  label: HDMI Range Get
  kind: query
  hex: "BE EF 03 06 00 B5 D8 02 00 22 20 00 00"
  params: []

- id: dvi_d_range_set_auto
  label: DVI-D Range Set AUTO
  kind: action
  hex: "BE EF 03 06 00 FE D4 01 00 20 20 10 00"
  params: []

- id: dvi_d_range_set_normal
  label: DVI-D Range Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 3E D9 01 00 20 20 00 00"
  params: []

- id: dvi_d_range_set_enhanced
  label: DVI-D Range Set ENHANCED
  kind: action
  hex: "BE EF 03 06 00 AE D8 01 00 20 20 01 00"
  params: []

- id: dvi_d_range_get
  label: DVI-D Range Get
  kind: query
  hex: "BE EF 03 06 00 0D D9 02 00 20 20 00 00"
  params: []

- id: computer_in_1_set_sync_on_g_off
  label: COMPUTER IN 1 Set SYNC ON G OFF
  kind: action
  hex: "BE EF 03 06 00 5E D7 01 00 10 20 02 00"
  params: []

- id: computer_in_1_set_auto
  label: COMPUTER IN 1 Set AUTO
  kind: action
  hex: "BE EF 03 06 00 CE D6 01 00 10 20 03 00"
  params: []

- id: computer_in_1_get
  label: COMPUTER IN 1 Get
  kind: query
  hex: "BE EF 03 06 00 0D D6 02 00 10 20 00 00"
  params: []

- id: computer_in_2_set_sync_on_g_off
  label: COMPUTER IN 2 Set SYNC ON G OFF
  kind: action
  hex: "BE EF 03 06 00 A2 D6 01 00 11 20 02 00"
  params: []

- id: computer_in_2_set_auto
  label: COMPUTER IN 2 Set AUTO
  kind: action
  hex: "BE EF 03 06 00 32 D7 01 00 11 20 03 00"
  params: []

- id: computer_in_2_get
  label: COMPUTER IN 2 Get
  kind: query
  hex: "BE EF 03 06 00 F1 D7 02 00 11 20 00 00"
  params: []

- id: bnc_set_sync_on_g_off
  label: BNC Set SYNC ON G OFF
  kind: action
  hex: "BE EF 03 06 00 86 D4 01 00 1A 20 02 00"
  params: []

- id: bnc_set_auto
  label: BNC Set AUTO
  kind: action
  hex: "BE EF 03 06 00 16 D5 01 00 1A 20 03 00"
  params: []

- id: bnc_get
  label: BNC Get
  kind: query
  hex: "BE EF 03 06 00 D5 D5 02 00 1A 20 00 00"
  params: []

- id: frame_lock_computer_in_1_set_off
  label: Frame Lock COMPUTER IN 1 Set OFF
  kind: action
  hex: "BE EF 03 06 00 3B C2 01 00 50 30 00 00"
  params: []

- id: frame_lock_computer_in_1_set_on
  label: Frame Lock COMPUTER IN 1 Set ON
  kind: action
  hex: "BE EF 03 06 00 AB C3 01 00 50 30 01 00"
  params: []

- id: frame_lock_computer_in_1_get
  label: Frame Lock COMPUTER IN 1 Get
  kind: query
  hex: "BE EF 03 06 00 08 C2 02 00 50 30 00 00"
  params: []

- id: frame_lock_computer_in_2_set_off
  label: Frame Lock COMPUTER IN 2 Set OFF
  kind: action
  hex: "BE EF 03 06 00 0B C3 01 00 54 30 00 00"
  params: []

- id: frame_lock_computer_in_2_set_on
  label: Frame Lock COMPUTER IN 2 Set ON
  kind: action
  hex: "BE EF 03 06 00 9B C2 01 00 54 30 00 00"
  params: []

- id: frame_lock_computer_in_2_get
  label: Frame Lock COMPUTER IN 2 Get
  kind: query
  hex: "BE EF 03 06 00 38 C3 02 00 54 30 00 00"
  params: []

- id: frame_lock_bnc_set_off
  label: Frame Lock BNC Set OFF
  kind: action
  hex: "BE EF 03 06 00 4F C3 01 00 57 30 00 00"
  params: []

- id: frame_lock_bnc_set_on
  label: Frame Lock BNC Set ON
  kind: action
  hex: "BE EF 03 06 00 DF C2 01 00 57 30 01 00"
  params: []

- id: frame_lock_bnc_get
  label: Frame Lock BNC Get
  kind: query
  hex: "BE EF 03 06 00 7C C3 02 00 57 30 00 00"
  params: []

- id: frame_lock_hdmi_set_off
  label: Frame Lock HDMI Set OFF
  kind: action
  hex: "BE EF 03 06 00 7F C2 01 00 53 30 00 00"
  params: []

- id: frame_lock_hdmi_set_on
  label: Frame Lock HDMI Set ON
  kind: action
  hex: "BE EF 03 06 00 EF C3 01 00 53 30 01 00"
  params: []

- id: frame_lock_hdmi_get
  label: Frame Lock HDMI Get
  kind: query
  hex: "BE EF 03 06 00 4C C2 02 00 53 30 00 00"
  params: []

- id: frame_lock_dvi_d_set_off
  label: Frame Lock DVI-D Set OFF
  kind: action
  hex: "BE EF 03 06 00 A7 C1 01 00 59 30 00 00"
  params: []

- id: frame_lock_dvi_d_set_on
  label: Frame Lock DVI-D Set ON
  kind: action
  hex: "BE EF 03 06 00 37 C0 01 00 59 30 01 00"
  params: []

- id: frame_lock_dvi_d_get
  label: Frame Lock DVI-D Get
  kind: query
  hex: "BE EF 03 06 00 94 C1 02 00 59 30 00 00"
  params: []

- id: keystone_v_get
  label: Keystone V Get
  kind: query
  hex: "BE EF 03 06 00 B9 D3 02 00 07 20 00 00"
  params: []

- id: keystone_v_increment
  label: Keystone V Increment
  kind: action
  hex: "BE EF 03 06 00 DF D3 04 00 07 20 00 00"
  params: []

- id: keystone_v_decrement
  label: Keystone V Decrement
  kind: action
  hex: "BE EF 03 06 00 0E D2 05 00 07 20 00 00"
  params: []

- id: keystone_v_reset
  label: Keystone V Reset
  kind: action
  hex: "BE EF 03 06 00 08 D0 06 00 0C 70 00 00"
  params: []

- id: auto_keystone_v_execute
  label: Auto Keystone V Execute
  kind: action
  hex: "BE EF 03 06 00 E5 D1 06 00 0D 20 00 00"
  params: []

- id: auto_keystone_v_set_off
  label: Auto Keystone V Set OFF
  kind: action
  hex: "BE EF 03 06 00 EA D1 01 00 0F 20 00 00"
  params: []

- id: auto_keystone_v_set_on
  label: Auto Keystone V Set ON
  kind: action
  hex: "BE EF 03 06 00 7A D0 01 00 0F 20 01 00"
  params: []

- id: auto_keystone_v_get
  label: Auto Keystone V Get
  kind: query
  hex: "BE EF 03 06 00 D9 D1 02 00 0F 20 00 00"
  params: []

- id: keystone_h_get
  label: Keystone H Get
  kind: query
  hex: "BE EF 03 06 00 E9 D0 02 00 0B 20 00 00"
  params: []

- id: keystone_h_increment
  label: Keystone H Increment
  kind: action
  hex: "BE EF 03 06 00 8F D0 04 00 0B 20 00 00"
  params: []

- id: keystone_h_decrement
  label: Keystone H Decrement
  kind: action
  hex: "BE EF 03 06 00 5E D1 05 00 0B 20 00 00"
  params: []

- id: keystone_h_reset
  label: Keystone H Reset
  kind: action
  hex: "BE EF 03 06 00 98 D8 06 00 20 70 00 00"
  params: []

- id: eco_mode_set_normal
  label: ECO Mode Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 3B 23 01 00 00 33 00 00"
  params: []

- id: eco_mode_set_eco
  label: ECO Mode Set ECO
  kind: action
  hex: "BE EF 03 06 00 AB 22 01 00 00 33 01 00"
  params: []

- id: eco_mode_get
  label: ECO Mode Get
  kind: query
  hex: "BE EF 03 06 00 08 23 02 00 00 33 00 00"
  params: []

- id: mirror_set_normal
  label: Mirror Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 C7 D2 01 00 01 30 00 00"
  params: []

- id: mirror_set_h_invert
  label: Mirror Set H:INVERT
  kind: action
  hex: "BE EF 03 06 00 57 D3 01 00 01 30 01 00"
  params: []

- id: mirror_set_v_invert
  label: Mirror Set V:INVERT
  kind: action
  hex: "BE EF 03 06 00 A7 D3 01 00 01 30 02 00"
  params: []

- id: mirror_set_h_v_invert
  label: Mirror Set H&V:INVERT
  kind: action
  hex: "BE EF 03 06 00 37 D2 01 00 01 30 03 00"
  params: []

- id: mirror_get
  label: Mirror Get
  kind: query
  hex: "BE EF 03 06 00 F4 D2 02 00 01 30 00 00"
  params: []

- id: monitor_out_computer_in_1_set_computer_in_1
  label: Monitor Out (COMPUTER IN 1) Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 3E F4 01 00 B0 20 00 00"
  params: []

- id: monitor_out_computer_in_1_set_computer_in_2
  label: Monitor Out (COMPUTER IN 1) Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 FE F6 01 00 B0 20 04 00"
  params: []

- id: monitor_out_computer_in_1_set_bnc
  label: Monitor Out (COMPUTER IN 1) Set BNC
  kind: action
  hex: "BE EF 03 06 00 0E F6 01 00 B0 20 07 00"
  params: []

- id: monitor_out_computer_in_1_set_off
  label: Monitor Out (COMPUTER IN 1) Set OFF
  kind: action
  hex: "BE EF 03 06 00 CE B5 01 00 B0 20 FF 00"
  params: []

- id: monitor_out_computer_in_1_get
  label: Monitor Out (COMPUTER IN 1) Get
  kind: query
  hex: "BE EF 03 06 00 0D F4 02 00 B0 20 00 00"
  params: []

- id: monitor_out_computer_in_2_set_computer_in_1
  label: Monitor Out (COMPUTER IN 2) Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 0E F5 01 00 B4 20 00 00"
  params: []

- id: monitor_out_computer_in_2_set_computer_in_2
  label: Monitor Out (COMPUTER IN 2) Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 CE F7 01 00 B4 20 04 00"
  params: []

- id: monitor_out_computer_in_2_set_bnc
  label: Monitor Out (COMPUTER IN 2) Set BNC
  kind: action
  hex: "BE EF 03 06 00 3E F7 01 00 B4 20 07 00"
  params: []

- id: monitor_out_computer_in_2_set_off
  label: Monitor Out (COMPUTER IN 2) Set OFF
  kind: action
  hex: "BE EF 03 06 00 FE B4 01 00 B4 20 FF 00"
  params: []

- id: monitor_out_computer_in_2_get
  label: Monitor Out (COMPUTER IN 2) Get
  kind: query
  hex: "BE EF 03 06 00 3D F5 02 00 B4 20 00 00"
  params: []

- id: monitor_out_bnc_set_computer_in_1
  label: Monitor Out (BNC) Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 4A F5 01 00 B7 20 00 00"
  params: []

- id: monitor_out_bnc_set_computer_in_2
  label: Monitor Out (BNC) Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 8A F7 01 00 B7 20 04 00"
  params: []

- id: monitor_out_bnc_set_bnc
  label: Monitor Out (BNC) Set BNC
  kind: action
  hex: "BE EF 03 06 00 7A F7 01 00 B7 20 07 00"
  params: []

- id: monitor_out_bnc_set_off
  label: Monitor Out (BNC) Set OFF
  kind: action
  hex: "BE EF 03 06 00 BA B4 01 00 B7 20 FF 00"
  params: []

- id: monitor_out_bnc_get
  label: Monitor Out (BNC) Get
  kind: query
  hex: "BE EF 03 06 00 79 F5 02 00 B7 20 00 00"
  params: []

- id: monitor_out_hdmi_set_computer_in_1
  label: Monitor Out (HDMI) Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 7A F4 01 00 B3 20 00 00"
  params: []

- id: monitor_out_hdmi_set_computer_in_2
  label: Monitor Out (HDMI) Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 BA F6 01 00 B3 20 04 00"
  params: []

- id: monitor_out_hdmi_set_bnc
  label: Monitor Out (HDMI) Set BNC
  kind: action
  hex: "BE EF 03 06 00 4A F6 01 00 B3 20 07 00"
  params: []

- id: monitor_out_hdmi_set_off
  label: Monitor Out (HDMI) Set OFF
  kind: action
  hex: "BE EF 03 06 00 8A B5 01 00 B3 20 FF 00"
  params: []

- id: monitor_out_hdmi_get
  label: Monitor Out (HDMI) Get
  kind: query
  hex: "BE EF 03 06 00 49 F4 02 00 B3 20 00 00"
  params: []

- id: monitor_out_dvi_d_set_computer_in_1
  label: Monitor Out (DVI-D) Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 A2 F7 01 00 B9 20 00 00"
  params: []

- id: monitor_out_dvi_d_set_computer_in_2
  label: Monitor Out (DVI-D) Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 62 F5 01 00 B9 20 04 00"
  params: []

- id: monitor_out_dvi_d_set_bnc
  label: Monitor Out (DVI-D) Set BNC
  kind: action
  hex: "BE EF 03 06 00 92 F5 01 00 B9 20 07 00"
  params: []

- id: monitor_out_dvi_d_set_off
  label: Monitor Out (DVI-D) Set OFF
  kind: action
  hex: "BE EF 03 06 00 52 B6 01 00 B9 20 FF 00"
  params: []

- id: monitor_out_dvi_d_get
  label: Monitor Out (DVI-D) Get
  kind: query
  hex: "BE EF 03 06 00 91 F7 02 00 B9 20 00 00"
  params: []

- id: monitor_out_component_set_computer_in_1
  label: Monitor Out (COMPONENT) Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 F2 F4 01 00 B5 20 00 00"
  params: []

- id: monitor_out_component_set_computer_in_2
  label: Monitor Out (COMPONENT) Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 32 F6 01 00 B5 20 04 00"
  params: []

- id: monitor_out_component_set_bnc
  label: Monitor Out (COMPONENT) Set BNC
  kind: action
  hex: "BE EF 03 06 00 C2 F6 01 00 B5 20 07 00"
  params: []

- id: monitor_out_component_set_off
  label: Monitor Out (COMPONENT) Set OFF
  kind: action
  hex: "BE EF 03 06 00 02 B5 01 00 B5 20 FF 00"
  params: []

- id: monitor_out_component_get
  label: Monitor Out (COMPONENT) Get
  kind: query
  hex: "BE EF 03 06 00 C1 F4 02 00 B5 20 00 00"
  params: []

- id: monitor_out_s_video_set_computer_in_1
  label: Monitor Out (S-VIDEO) Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 86 F5 01 00 B2 20 00 00"
  params: []

- id: monitor_out_s_video_set_computer_in_2
  label: Monitor Out (S-VIDEO) Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 46 F7 01 00 B2 20 04 00"
  params: []

- id: monitor_out_s_video_set_bnc
  label: Monitor Out (S-VIDEO) Set BNC
  kind: action
  hex: "BE EF 03 06 00 B6 F7 01 00 B2 20 07 00"
  params: []

- id: monitor_out_s_video_set_off
  label: Monitor Out (S-VIDEO) Set OFF
  kind: action
  hex: "BE EF 03 06 00 76 B4 01 00 B2 20 FF 00"
  params: []

- id: monitor_out_s_video_get
  label: Monitor Out (S-VIDEO) Get
  kind: query
  hex: "BE EF 03 06 00 B5 F5 02 00 B2 20 00 00"
  params: []

- id: monitor_out_video1_set_computer_in_1
  label: Monitor Out (VIDEO 1) Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 C2 F5 01 00 B1 20 00 00"
  params: []

- id: monitor_out_video1_set_computer_in_2
  label: Monitor Out (VIDEO 1) Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 02 F7 01 00 B1 20 04 00"
  params: []

- id: monitor_out_video1_set_bnc
  label: Monitor Out (VIDEO 1) Set BNC
  kind: action
  hex: "BE EF 03 06 00 F2 F7 01 00 B1 20 07 00"
  params: []

- id: monitor_out_video1_set_off
  label: Monitor Out (VIDEO 1) Set OFF
  kind: action
  hex: "BE EF 03 06 00 32 B4 01 00 B1 20 FF 00"
  params: []

- id: monitor_out_video1_get
  label: Monitor Out (VIDEO 1) Get
  kind: query
  hex: "BE EF 03 06 00 F1 F5 02 00 B1 20 00 00"
  params: []

- id: monitor_out_video2_set_computer_in_1
  label: Monitor Out (VIDEO 2) Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 E6 F7 01 00 BA 20 00 00"
  params: []

- id: monitor_out_video2_set_computer_in_2
  label: Monitor Out (VIDEO 2) Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 26 F5 01 00 BA 20 04 00"
  params: []

- id: monitor_out_video2_set_bnc
  label: Monitor Out (VIDEO 2) Set BNC
  kind: action
  hex: "BE EF 03 06 00 D6 F5 01 00 BA 20 07 00"
  params: []

- id: monitor_out_video2_set_off
  label: Monitor Out (VIDEO 2) Set OFF
  kind: action
  hex: "BE EF 03 06 00 16 B6 01 00 BA 20 FF 00"
  params: []

- id: monitor_out_video2_get
  label: Monitor Out (VIDEO 2) Get
  kind: query
  hex: "BE EF 03 06 00 D5 F7 02 00 BA 20 00 00"
  params: []

- id: monitor_out_standby_set_computer_in_1
  label: Monitor Out (STANDBY) Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 2A F7 01 00 BF 20 00 00"
  params: []

- id: monitor_out_standby_set_computer_in_2
  label: Monitor Out (STANDBY) Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 EA F5 01 00 BF 20 04 00"
  params: []

- id: monitor_out_standby_set_bnc
  label: Monitor Out (STANDBY) Set BNC
  kind: action
  hex: "BE EF 03 06 00 1A F5 01 00 BF 20 07 00"
  params: []

- id: monitor_out_standby_set_off
  label: Monitor Out (STANDBY) Set OFF
  kind: action
  hex: "BE EF 03 06 00 DA B6 01 00 BF 20 FF 00"
  params: []

- id: monitor_out_standby_get
  label: Monitor Out (STANDBY) Get
  kind: query
  hex: "BE EF 03 06 00 19 F7 02 00 BF 20 00 00"
  params: []

- id: language_set_english
  label: Language Set ENGLISH
  kind: action
  hex: "BE EF 03 06 00 F7 D3 01 00 05 30 00 00"
  params: []

- id: language_set_francais
  label: Language Set FRANÇAIS
  kind: action
  hex: "BE EF 03 06 00 67 D2 01 00 05 30 01 00"
  params: []

- id: language_set_deutsch
  label: Language Set DEUTSCH
  kind: action
  hex: "BE EF 03 06 00 97 D2 01 00 05 30 02 00"
  params: []

- id: language_set_espanol
  label: Language Set ESPAÑOL
  kind: action
  hex: "BE EF 03 06 00 07 D3 01 00 05 30 03 00"
  params: []

- id: language_set_italiano
  label: Language Set ITALIANO
  kind: action
  hex: "BE EF 03 06 00 37 D1 01 00 05 30 04 00"
  params: []

- id: language_set_norsk
  label: Language Set NORSK
  kind: action
  hex: "BE EF 03 06 00 A7 D0 01 00 05 30 05 00"
  params: []

- id: language_set_nederlands
  label: Language Set NEDERLANDS
  kind: action
  hex: "BE EF 03 06 00 57 D0 01 00 05 30 06 00"
  params: []

- id: language_set_portugues
  label: Language Set PORTUGUÊS
  kind: action
  hex: "BE EF 03 06 00 C7 D1 01 00 05 30 07 00"
  params: []

- id: language_set_japanese
  label: Language Set 日本語
  kind: action
  hex: "BE EF 03 06 00 37 D4 01 00 05 30 08 00"
  params: []

- id: language_set_chinese_simplified
  label: Language Set Chinese (Simplified)
  kind: action
  hex: "BE EF 03 06 00 A7 D5 01 00 05 30 09 00"
  params: []

- id: language_set_chinese_traditional
  label: Language Set Chinese (Traditional)
  kind: action
  hex: "BE EF 03 06 00 37 DE 01 00 05 30 10 00"
  params: []

- id: language_set_korean
  label: Language Set Korean
  kind: action
  hex: "BE EF 03 06 00 57 D5 01 00 05 30 0A 00"
  params: []

- id: language_set_svenska
  label: Language Set SVENSKA
  kind: action
  hex: "BE EF 03 06 00 C7 D4 01 00 05 30 0B 00"
  params: []

- id: language_set_russian
  label: Language Set PYCCKNN
  kind: action
  hex: "BE EF 03 06 00 F7 D6 01 00 05 30 0C 00"
  params: []

- id: language_set_suomi
  label: Language Set SUOMI
  kind: action
  hex: "BE EF 03 06 00 67 D7 01 00 05 30 0D 00"
  params: []

- id: language_set_polski
  label: Language Set POLSKI
  kind: action
  hex: "BE EF 03 06 00 97 D7 01 00 05 30 0E 00"
  params: []

- id: language_set_turkce
  label: Language Set TÜRKÇE
  kind: action
  hex: "BE EF 03 06 00 07 D6 01 00 05 30 0F 00"
  params: []

- id: language_set_dansk
  label: Language Set DANSK
  kind: action
  hex: "BE EF 03 06 00 A7 DF 01 00 05 30 11 00"
  params: []

- id: language_set_cestina
  label: Language Set ČEŠTINA
  kind: action
  hex: "BE EF 03 06 00 57 DF 01 00 05 30 12 00"
  params: []

- id: language_set_arabic
  label: Language Set Arabic
  kind: action
  hex: "BE EF 03 06 00 37 DB 01 00 05 30 1C 00"
  params: []

- id: language_set_farsi
  label: Language Set Farsi
  kind: action
  hex: "BE EF 03 06 00 A7 DA 01 00 05 30 1D 00"
  params: []

- id: language_get
  label: Language Get
  kind: query
  hex: "BE EF 03 06 00 C4 D3 02 00 05 30 00 00"
  params: []

- id: menu_position_v_get
  label: Menu Position V Get
  kind: query
  hex: "BE EF 03 06 00 40 D7 02 00 16 30 00 00"
  params: []

- id: menu_position_v_increment
  label: Menu Position V Increment
  kind: action
  hex: "BE EF 03 06 00 26 D7 04 00 16 30 00 00"
  params: []

- id: menu_position_v_decrement
  label: Menu Position V Decrement
  kind: action
  hex: "BE EF 03 06 00 F7 D6 05 00 16 30 00 00"
  params: []

- id: menu_position_v_reset
  label: Menu Position V Reset
  kind: action
  hex: "BE EF 03 06 00 A8 C7 06 00 44 70 00 00"
  params: []

- id: menu_position_h_get
  label: Menu Position H Get
  kind: query
  hex: "BE EF 03 06 00 04 D7 02 00 15 30 00 00"
  params: []

- id: menu_position_h_increment
  label: Menu Position H Increment
  kind: action
  hex: "BE EF 03 06 00 62 D7 04 00 15 30 00 00"
  params: []

- id: menu_position_h_decrement
  label: Menu Position H Decrement
  kind: action
  hex: "BE EF 03 06 00 B3 D6 05 00 15 30 00 00"
  params: []

- id: menu_position_h_reset
  label: Menu Position H Reset
  kind: action
  hex: "BE EF 03 06 00 DC C6 06 00 43 70 00 00"
  params: []

- id: blank_set_myscreen
  label: Blank Set MyScreen
  kind: action
  hex: "BE EF 03 06 00 FB CA 01 00 00 30 20 00"
  params: []

- id: blank_set_original
  label: Blank Set ORIGINAL
  kind: action
  hex: "BE EF 03 06 00 FB E2 01 00 00 30 40 00"
  params: []

- id: blank_set_blue
  label: Blank Set BLUE
  kind: action
  hex: "BE EF 03 06 00 CB D3 01 00 00 30 03 00"
  params: []

- id: blank_set_white
  label: Blank Set WHITE
  kind: action
  hex: "BE EF 03 06 00 6B D0 01 00 00 30 05 00"
  params: []

- id: blank_set_black
  label: Blank Set BLACK
  kind: action
  hex: "BE EF 03 06 00 9B D0 01 00 00 30 06 00"
  params: []

- id: blank_get
  label: Blank Get
  kind: query
  hex: "BE EF 03 06 00 08 D3 02 00 00 30 00 00"
  params: []

- id: blank_on_off_set_off
  label: Blank On/Off Set OFF
  kind: action
  hex: "BE EF 03 06 00 FB D8 01 00 20 30 00 00"
  params: []

- id: blank_on_off_set_on
  label: Blank On/Off Set ON
  kind: action
  hex: "BE EF 03 06 00 6B D9 01 00 20 30 01 00"
  params: []

- id: blank_on_off_get
  label: Blank On/Off Get
  kind: query
  hex: "BE EF 03 06 00 C8 D8 02 00 20 30 00 00"
  params: []

- id: start_up_set_myscreen
  label: Start Up Set MyScreen
  kind: action
  hex: "BE EF 03 06 00 CB CB 01 00 04 30 20 00"
  params: []

- id: start_up_set_original
  label: Start Up Set ORIGINAL
  kind: action
  hex: "BE EF 03 06 00 0B D2 01 00 04 30 00 00"
  params: []

- id: start_up_set_off
  label: Start Up Set OFF
  kind: action
  hex: "BE EF 03 06 00 9B D3 01 00 04 30 01 00"
  params: []

- id: start_up_get
  label: Start Up Get
  kind: query
  hex: "BE EF 03 06 00 38 D2 02 00 04 30 00 00"
  params: []

- id: myscreen_lock_set_off
  label: MyScreen Lock Set OFF
  kind: action
  hex: "BE EF 03 06 00 3B EF 01 00 C0 30 00 00"
  params: []

- id: myscreen_lock_set_on
  label: MyScreen Lock Set ON
  kind: action
  hex: "BE EF 03 06 00 AB EE 01 00 C0 30 01 00"
  params: []

- id: myscreen_lock_get
  label: MyScreen Lock Get
  kind: query
  hex: "BE EF 03 06 00 08 EF 02 00 C0 30 00 00"
  params: []

- id: message_set_off
  label: Message Set OFF
  kind: action
  hex: "BE EF 03 06 00 8F D6 01 00 17 30 00 00"
  params: []

- id: message_set_on
  label: Message Set ON
  kind: action
  hex: "BE EF 03 06 00 1F D7 01 00 17 30 01 00"
  params: []

- id: message_get
  label: Message Get
  kind: query
  hex: "BE EF 03 06 00 BC D6 02 00 17 30 00 00"
  params: []

- id: template_set_test_pattern
  label: Template Set TEST PATTERN
  kind: action
  hex: "BE EF 03 06 00 43 D9 01 00 22 30 00 00"
  params: []

- id: template_set_dot_line_1
  label: Template Set DOT-LINE 1
  kind: action
  hex: "BE EF 03 06 00 D3 D8 01 00 22 30 01 00"
  params: []

- id: template_set_dot_line_2
  label: Template Set DOT-LINE 2
  kind: action
  hex: "BE EF 03 06 00 23 D8 01 00 22 30 02 00"
  params: []

- id: template_set_dot_line_3
  label: Template Set DOT-LINE 3
  kind: action
  hex: "BE EF 03 06 00 B3 D9 01 00 22 30 03 00"
  params: []

- id: template_set_dot_line_4
  label: Template Set DOT-LINE 4
  kind: action
  hex: "BE EF 03 06 00 83 DB 01 00 22 30 04 00"
  params: []

- id: template_get
  label: Template Get
  kind: query
  hex: "BE EF 03 06 00 70 D9 02 00 22 30 00 00"
  params: []

- id: template_on_off_set_off
  label: Template On/Off Set OFF
  kind: action
  hex: "BE EF 03 06 00 BF D8 01 00 23 30 00 00"
  params: []

- id: template_on_off_set_on
  label: Template On/Off Set ON
  kind: action
  hex: "BE EF 03 06 00 2F D9 01 00 23 30 01 00"
  params: []

- id: template_on_off_get
  label: Template On/Off Get
  kind: query
  hex: "BE EF 03 06 00 8C D8 02 00 23 30 00 00"
  params: []

- id: closed_caption_display_set_off
  label: Closed Caption Display Set OFF
  kind: action
  hex: "BE EF 03 06 00 FA 62 01 00 00 37 00 00"
  params: []

- id: closed_caption_display_set_on
  label: Closed Caption Display Set ON
  kind: action
  hex: "BE EF 03 06 00 6A 63 01 00 00 37 01 00"
  params: []

- id: closed_caption_display_get
  label: Closed Caption Display Get
  kind: query
  hex: "BE EF 03 06 00 C9 62 02 00 00 37 00 00"
  params: []

- id: closed_caption_mode_set_captions
  label: Closed Caption Mode Set CAPTIONS
  kind: action
  hex: "BE EF 03 06 00 06 63 01 00 01 37 00 00"
  params: []

- id: closed_caption_mode_set_text
  label: Closed Caption Mode Set TEXT
  kind: action
  hex: "BE EF 03 06 00 96 62 01 00 01 37 01 00"
  params: []

- id: closed_caption_mode_get
  label: Closed Caption Mode Get
  kind: query
  hex: "BE EF 03 06 00 35 63 02 00 01 37 00 00"
  params: []

- id: closed_caption_channel_set_1
  label: Closed Caption Channel Set 1
  kind: action
  hex: "BE EF 03 06 00 D2 62 01 00 02 37 01 00"
  params: []

- id: closed_caption_channel_set_2
  label: Closed Caption Channel Set 2
  kind: action
  hex: "BE EF 03 06 00 22 62 01 00 02 37 02 00"
  params: []

- id: closed_caption_channel_set_3
  label: Closed Caption Channel Set 3
  kind: action
  hex: "BE EF 03 06 00 B2 63 01 00 02 37 03 00"
  params: []

- id: closed_caption_channel_set_4
  label: Closed Caption Channel Set 4
  kind: action
  hex: "BE EF 03 06 00 82 61 01 00 02 37 04 00"
  params: []

- id: closed_caption_channel_get
  label: Closed Caption Channel Get
  kind: query
  hex: "BE EF 03 06 00 71 63 02 00 02 37 00 00"
  params: []

- id: source_skip_computer_in_1_set_normal
  label: Source Skip COMPUTER IN 1 Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 FE 78 01 00 20 22 00 00"
  params: []

- id: source_skip_computer_in_1_set_skip
  label: Source Skip COMPUTER IN 1 Set SKIP
  kind: action
  hex: "BE EF 03 06 00 6E 79 01 00 20 22 01 00"
  params: []

- id: source_skip_computer_in_1_get
  label: Source Skip COMPUTER IN 1 Get
  kind: query
  hex: "BE EF 03 06 00 CD 78 02 00 20 22 00 00"
  params: []

- id: source_skip_computer_in_2_set_normal
  label: Source Skip COMPUTER IN 2 Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 CE 79 01 00 24 22 00 00"
  params: []

- id: source_skip_computer_in_2_set_skip
  label: Source Skip COMPUTER IN 2 Set SKIP
  kind: action
  hex: "BE EF 03 06 00 5E 78 01 00 24 22 01 00"
  params: []

- id: source_skip_computer_in_2_get
  label: Source Skip COMPUTER IN 2 Get
  kind: query
  hex: "BE EF 03 06 00 FD 79 02 00 24 22 00 00"
  params: []

- id: source_skip_bnc_set_normal
  label: Source Skip BNC Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 8A 79 01 00 27 22 00 00"
  params: []

- id: source_skip_bnc_set_skip
  label: Source Skip BNC Set SKIP
  kind: action
  hex: "BE EF 03 06 00 1A 78 01 00 27 22 01 00"
  params: []

- id: source_skip_bnc_get
  label: Source Skip BNC Get
  kind: query
  hex: "BE EF 03 06 00 B9 79 02 00 27 22 00 00"
  params: []

- id: source_skip_hdmi_set_normal
  label: Source Skip HDMI Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 BA 78 01 00 23 22 00 00"
  params: []

- id: source_skip_hdmi_set_skip
  label: Source Skip HDMI Set SKIP
  kind: action
  hex: "BE EF 03 06 00 2A 79 01 00 23 22 01 00"
  params: []

- id: source_skip_hdmi_get
  label: Source Skip HDMI Get
  kind: query
  hex: "BE EF 03 06 00 89 78 02 00 23 22 00 00"
  params: []

- id: source_skip_dvi_d_set_normal
  label: Source Skip DVI-D Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 62 7B 01 00 29 22 00 00"
  params: []

- id: source_skip_dvi_d_set_skip
  label: Source Skip DVI-D Set SKIP
  kind: action
  hex: "BE EF 03 06 00 F2 7A 01 00 29 22 01 00"
  params: []

- id: source_skip_dvi_d_get
  label: Source Skip DVI-D Get
  kind: query
  hex: "BE EF 03 06 00 51 7B 02 00 29 22 00 00"
  params: []

- id: source_skip_component_set_normal
  label: Source Skip COMPONENT Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 32 78 01 00 25 22 00 00"
  params: []

- id: source_skip_component_set_skip
  label: Source Skip COMPONENT Set SKIP
  kind: action
  hex: "BE EF 03 06 00 A2 79 01 00 25 22 01 00"
  params: []

- id: source_skip_component_get
  label: Source Skip COMPONENT Get
  kind: query
  hex: "BE EF 03 06 00 01 78 02 00 25 22 00 00"
  params: []

- id: source_skip_s_video_set_normal
  label: Source Skip S-VIDEO Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 46 79 01 00 22 22 00 00"
  params: []

- id: source_skip_s_video_set_skip
  label: Source Skip S-VIDEO Set SKIP
  kind: action
  hex: "BE EF 03 06 00 D6 78 01 00 22 22 01 00"
  params: []

- id: source_skip_s_video_get
  label: Source Skip S-VIDEO Get
  kind: query
  hex: "BE EF 03 06 00 75 79 02 00 22 22 00 00"
  params: []

- id: source_skip_video1_set_normal
  label: Source Skip VIDEO 1 Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 02 79 01 00 21 22 00 00"
  params: []

- id: source_skip_video1_set_skip
  label: Source Skip VIDEO 1 Set SKIP
  kind: action
  hex: "BE EF 03 06 00 92 78 01 00 21 22 01 00"
  params: []

- id: source_skip_video1_get
  label: Source Skip VIDEO 1 Get
  kind: query
  hex: "BE EF 03 06 00 31 79 02 00 21 22 00 00"
  params: []

- id: source_skip_video2_set_normal
  label: Source Skip VIDEO 2 Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 26 7B 01 00 2A 22 00 00"
  params: []

- id: source_skip_video2_set_skip
  label: Source Skip VIDEO 2 Set SKIP
  kind: action
  hex: "BE EF 03 06 00 B6 7A 01 00 2A 22 01 00"
  params: []

- id: source_skip_video2_get
  label: Source Skip VIDEO 2 Get
  kind: query
  hex: "BE EF 03 06 00 15 7B 02 00 2A 22 00 00"
  params: []

- id: auto_search_set_off
  label: Auto Search Set OFF
  kind: action
  hex: "BE EF 03 06 00 B6 D6 01 00 16 20 00 00"
  params: []

- id: auto_search_set_on
  label: Auto Search Set ON
  kind: action
  hex: "BE EF 03 06 00 26 D7 01 00 16 20 01 00"
  params: []

- id: auto_search_get
  label: Auto Search Get
  kind: query
  hex: "BE EF 03 06 00 85 D6 02 00 16 20 00 00"
  params: []

- id: direct_on_set_off
  label: Direct On Set OFF
  kind: action
  hex: "BE EF 03 06 00 3B 89 01 00 20 31 00 00"
  params: []

- id: direct_on_set_on
  label: Direct On Set ON
  kind: action
  hex: "BE EF 03 06 00 AB 88 01 00 20 31 01 00"
  params: []

- id: direct_on_get
  label: Direct On Get
  kind: query
  hex: "BE EF 03 06 00 08 89 02 00 20 31 00 00"
  params: []

- id: auto_off_get
  label: Auto Off Get
  kind: query
  hex: "BE EF 03 06 00 08 86 02 00 10 31 00 00"
  params: []

- id: auto_off_increment
  label: Auto Off Increment
  kind: action
  hex: "BE EF 03 06 00 6E 86 04 00 10 31 00 00"
  params: []

- id: auto_off_decrement
  label: Auto Off Decrement
  kind: action
  hex: "BE EF 03 06 00 BF 87 05 00 10 31 00 00"
  params: []

- id: shutter_timer_set_1h
  label: Shutter Timer Set 1h
  kind: action
  hex: "BE EF 03 06 00 27 92 01 00 06 24 01 00"
  params: []

- id: shutter_timer_set_3h
  label: Shutter Timer Set 3h
  kind: action
  hex: "BE EF 03 06 00 47 93 01 00 06 24 03 00"
  params: []

- id: shutter_timer_set_6h
  label: Shutter Timer Set 6h
  kind: action
  hex: "BE EF 03 06 00 17 90 01 00 06 24 06 00"
  params: []

- id: shutter_timer_get
  label: Shutter Timer Get
  kind: query
  hex: "BE EF 03 06 00 84 93 02 00 06 24 00 00"
  params: []

- id: lamp_time_low_get
  label: Lamp Time Low Get
  kind: query
  hex: "BE EF 03 06 00 C2 FF 02 00 90 10 00 00"
  params: []

- id: lamp_time_high_get
  label: Lamp Time High Get
  kind: query
  hex: "BE EF 03 06 00 2A FD 02 00 9E 10 00 00"
  params: []

- id: lamp_time_reset
  label: Lamp Time Reset
  kind: action
  hex: "BE EF 03 06 00 58 DC 06 00 30 70 00 00"
  params: []

- id: filter_time_low_get
  label: Filter Time Low Get
  kind: query
  hex: "BE EF 03 06 00 C2 F0 02 00 A0 10 00 00"
  params: []

- id: filter_time_high_get
  label: Filter Time High Get
  kind: query
  hex: "BE EF 03 06 00 D6 FC 02 00 9F 10 00 00"
  params: []

- id: filter_time_reset
  label: Filter Time Reset
  kind: action
  hex: "BE EF 03 06 00 98 C6 06 00 40 70 00 00"
  params: []

- id: my_button_1_get
  label: My Button-1 Get
  kind: query
  hex: "BE EF 03 06 00 09 33 02 00 00 36 00 00"
  params: []

- id: my_button_2_get
  label: My Button-2 Get
  kind: query
  hex: "BE EF 03 06 00 F5 32 02 00 01 36 00 00"
  params: []

- id: my_button_3_get
  label: My Button-3 Get
  kind: query
  hex: "BE EF 03 06 00 B1 32 02 00 02 36 00 00"
  params: []

- id: my_button_4_get
  label: My Button-4 Get
  kind: query
  hex: "BE EF 03 06 00 4D 33 02 00 03 36 00 00"
  params: []

- id: my_source_set_computer_in_1
  label: My Source Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 FA 38 01 00 20 36 00 00"
  params: []

- id: my_source_set_computer_in_2
  label: My Source Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 3A 3A 01 00 20 36 04 00"
  params: []

- id: my_source_set_bnc
  label: My Source Set BNC
  kind: action
  hex: "BE EF 03 06 00 CA 3A 01 00 20 36 07 00"
  params: []

- id: my_source_set_hdmi
  label: My Source Set HDMI
  kind: action
  hex: "BE EF 03 06 00 0A 38 01 00 20 36 03 00"
  params: []

- id: my_source_set_dvi_d
  label: My Source Set DVI-D
  kind: action
  hex: "BE EF 03 06 00 AA 3E 01 00 20 36 09 00"
  params: []

- id: my_source_set_component
  label: My Source Set COMPONENT
  kind: action
  hex: "BE EF 03 06 00 AA 3B 01 00 20 36 05 00"
  params: []

- id: my_source_set_s_video
  label: My Source Set S-VIDEO
  kind: action
  hex: "BE EF 03 06 00 9A 39 01 00 20 36 02 00"
  params: []

- id: my_source_set_video1
  label: My Source Set VIDEO 1
  kind: action
  hex: "BE EF 03 06 00 6A 39 01 00 20 36 01 00"
  params: []

- id: my_source_set_video2
  label: My Source Set VIDEO 2
  kind: action
  hex: "BE EF 03 06 00 5A 3E 01 00 20 36 0A 00"
  params: []

- id: my_source_get
  label: My Source Get
  kind: query
  hex: "BE EF 03 06 00 C9 38 02 00 20 36 00 00"
  params: []

- id: my_image_set_off
  label: My Image Set OFF
  kind: action
  hex: "BE EF 03 06 00 3A C3 01 00 00 35 00 00"
  params: []

- id: my_image_set_image1
  label: My Image Set IMAGE-1
  kind: action
  hex: "BE EF 03 06 00 AA C2 01 00 00 35 01 00"
  params: []

- id: my_image_set_image2
  label: My Image Set IMAGE-2
  kind: action
  hex: "BE EF 03 06 00 5A C2 01 00 00 35 02 00"
  params: []

- id: my_image_set_image3
  label: My Image Set IMAGE-3
  kind: action
  hex: "BE EF 03 06 00 CA C3 01 00 00 35 03 00"
  params: []

- id: my_image_set_image4
  label: My Image Set IMAGE-4
  kind: action
  hex: "BE EF 03 06 00 FA C1 01 00 00 35 04 00"
  params: []

- id: my_image_get
  label: My Image Get
  kind: query
  hex: "BE EF 03 06 00 09 C3 02 00 00 35 00 00"
  params: []

- id: my_image_image1_delete
  label: My Image IMAGE-1 Delete
  kind: action
  hex: "BE EF 03 06 00 71 C3 06 00 01 35 00 00"
  params: []

- id: my_image_image2_delete
  label: My Image IMAGE-2 Delete
  kind: action
  hex: "BE EF 03 06 00 35 C3 06 00 02 35 00 00"
  params: []

- id: my_image_image3_delete
  label: My Image IMAGE-3 Delete
  kind: action
  hex: "BE EF 03 06 00 C9 C2 06 00 03 35 00 00"
  params: []

- id: my_image_image4_delete
  label: My Image IMAGE-4 Delete
  kind: action
  hex: "BE EF 03 06 00 BD C3 06 00 04 35 00 00"
  params: []

- id: remote_front_set_off
  label: Remote Front Set Off
  kind: action
  hex: "BE EF 03 06 00 FF 32 01 00 00 26 00 00"
  params: []

- id: remote_front_set_on
  label: Remote Front Set On
  kind: action
  hex: "BE EF 03 06 00 6F 33 01 00 00 26 01 00"
  params: []

- id: remote_front_get
  label: Remote Front Get
  kind: query
  hex: "BE EF 03 06 00 CC 32 02 00 00 26 00 00"
  params: []

- id: remote_rear_set_off
  label: Remote Rear Set Off
  kind: action
  hex: "BE EF 03 06 00 03 33 01 00 01 26 00 00"
  params: []

- id: remote_rear_set_on
  label: Remote Rear Set On
  kind: action
  hex: "BE EF 03 06 00 93 32 01 00 01 26 01 00"
  params: []

- id: remote_rear_get
  label: Remote Rear Get
  kind: query
  hex: "BE EF 03 06 00 30 33 02 00 01 26 00 00"
  params: []

- id: remote_top_set_off
  label: Remote Top Set Off
  kind: action
  hex: "BE EF 03 06 00 47 33 01 00 02 26 00 00"
  params: []

- id: remote_top_set_on
  label: Remote Top Set On
  kind: action
  hex: "BE EF 03 06 00 D7 32 01 00 02 26 01 00"
  params: []

- id: remote_top_get
  label: Remote Top Get
  kind: query
  hex: "BE EF 03 06 00 74 33 02 00 02 26 00 00"
  params: []

- id: remote_id_set_all
  label: Remote ID Set ALL
  kind: action
  hex: "BE EF 03 06 00 9F 30 01 00 08 26 00 00"
  params: []

- id: remote_id_set_1
  label: Remote ID Set 1
  kind: action
  hex: "BE EF 03 06 00 0F 31 01 00 08 26 01 00"
  params: []

- id: remote_id_set_2
  label: Remote ID Set 2
  kind: action
  hex: "BE EF 03 06 00 FF 31 01 00 08 26 02 00"
  params: []

- id: remote_id_set_3
  label: Remote ID Set 3
  kind: action
  hex: "BE EF 03 06 00 6F 30 01 00 08 26 03 00"
  params: []

- id: remote_id_set_4
  label: Remote ID Set 4
  kind: action
  hex: "BE EF 03 06 00 5F 32 01 00 08 26 04 00"
  params: []

- id: remote_id_get
  label: Remote ID Get
  kind: query
  hex: "BE EF 03 06 00 AC 30 02 00 08 26 00 00"
  params: []

- id: remote_frequency_normal_set_disable
  label: Remote Frequency Normal Set Disable
  kind: action
  hex: "BE EF 03 06 00 FF 3D 01 00 30 26 00 00"
  params: []

- id: remote_frequency_normal_set_enable
  label: Remote Frequency Normal Set Enable
  kind: action
  hex: "BE EF 03 06 00 6F 3C 01 00 30 26 01 00"
  params: []

- id: remote_frequency_normal_get
  label: Remote Frequency Normal Get
  kind: query
  hex: "BE EF 03 06 00 CC 3D 02 00 30 26 00 00"
  params: []

- id: remote_frequency_high_set_disable
  label: Remote Frequency High Set Disable
  kind: action
  hex: "BE EF 03 06 00 03 3C 01 00 31 26 00 00"
  params: []

- id: remote_frequency_high_set_enable
  label: Remote Frequency High Set Enable
  kind: action
  hex: "BE EF 03 06 00 93 3D 01 00 31 26 01 00"
  params: []

- id: remote_frequency_high_get
  label: Remote Frequency High Get
  kind: query
  hex: "BE EF 03 06 00 30 3C 02 00 31 26 00 00"
  params: []

- id: focus_increment
  label: Focus Increment
  kind: action
  hex: "BE EF 03 06 00 6A 93 04 00 00 24 00 00"
  params: []

- id: focus_decrement
  label: Focus Decrement
  kind: action
  hex: "BE EF 03 06 00 BB 92 05 00 00 24 00 00"
  params: []

- id: zoom_increment
  label: Zoom Increment
  kind: action
  hex: "BE EF 03 06 00 96 92 04 00 01 24 00 00"
  params: []

- id: zoom_decrement
  label: Zoom Decrement
  kind: action
  hex: "BE EF 03 06 00 47 93 05 00 01 24 00 00"
  params: []

- id: lens_shift_v_increment
  label: Lens Shift V Increment
  kind: action
  hex: "BE EF 03 06 00 D2 92 04 00 02 24 00 00"
  params: []

- id: lens_shift_v_decrement
  label: Lens Shift V Decrement
  kind: action
  hex: "BE EF 03 06 00 03 93 05 00 02 24 00 00"
  params: []

- id: lens_shift_h_increment
  label: Lens Shift H Increment
  kind: action
  hex: "BE EF 03 06 00 2E 93 04 00 03 24 00 00"
  params: []

- id: lens_shift_h_decrement
  label: Lens Shift H Decrement
  kind: action
  hex: "BE EF 03 06 00 FF 92 05 00 03 24 00 00"
  params: []

- id: lens_shift_centering
  label: Lens Shift Centering
  kind: action
  hex: "BE EF 03 06 00 B8 93 06 00 04 24 00 00"
  params: []

- id: lens_memory_index_set_1
  label: Lens Memory Index Set 1
  kind: action
  hex: "BE EF 03 06 00 4B 92 01 00 07 24 00 00"
  params: []

- id: lens_memory_index_set_2
  label: Lens Memory Index Set 2
  kind: action
  hex: "BE EF 03 06 00 DB 93 01 00 07 24 01 00"
  params: []

- id: lens_memory_index_set_3
  label: Lens Memory Index Set 3
  kind: action
  hex: "BE EF 03 06 00 2B 93 01 00 07 24 02 00"
  params: []

- id: lens_memory_index_get
  label: Lens Memory Index Get
  kind: query
  hex: "BE EF 03 06 00 78 92 02 00 07 24 00 00"
  params: []

- id: lens_memory_load
  label: Lens Memory Load
  kind: action
  hex: "BE EF 03 06 00 E8 90 06 00 08 24 00 00"
  params: []

- id: lens_memory_save
  label: Lens Memory Save
  kind: action
  hex: "BE EF 03 06 00 14 91 06 00 09 24 00 00"
  params: []

- id: lens_memory_clear
  label: Lens Memory Clear
  kind: action
  hex: "BE EF 03 06 00 50 91 06 00 0A 24 00 00"
  params: []

- id: lens_memory_focus_get
  label: Lens Memory Focus Get
  kind: query
  hex: "BE EF 03 06 00 28 91 02 00 0B 24 00 00"
  params: []

- id: lens_memory_zoom_get
  label: Lens Memory Zoom Get
  kind: query
  hex: "BE EF 03 06 00 5C 90 02 00 0C 24 00 00"
  params: []

- id: lens_memory_lens_shift_v_get
  label: Lens Memory Lens Shift V Get
  kind: query
  hex: "BE EF 03 06 00 A0 91 02 00 0D 24 00 00"
  params: []

- id: lens_memory_lens_shift_h_get
  label: Lens Memory Lens Shift H Get
  kind: query
  hex: "BE EF 03 06 00 E4 91 02 00 0E 24 00 00"
  params: []

- id: lens_memory_lens_type_get
  label: Lens Memory Lens Type Get
  kind: query
  hex: "BE EF 03 06 00 18 90 02 00 0F 24 00 00"
  params: []

- id: magnify_get
  label: Magnify Get
  kind: query
  hex: "BE EF 03 06 00 7C D2 02 00 07 30 00 00"
  params: []

- id: magnify_increment
  label: Magnify Increment
  kind: action
  hex: "BE EF 03 06 00 1A D2 04 00 07 30 00 00"
  params: []

- id: magnify_decrement
  label: Magnify Decrement
  kind: action
  hex: "BE EF 03 06 00 CB D3 05 00 07 30 00 00"
  params: []

- id: freeze_set_normal
  label: Freeze Set NORMAL
  kind: action
  hex: "BE EF 03 06 00 83 D2 01 00 02 30 00 00"
  params: []

- id: freeze_set_freeze
  label: Freeze Set FREEZE
  kind: action
  hex: "BE EF 03 06 00 13 D3 01 00 02 30 01 00"
  params: []

- id: freeze_get
  label: Freeze Get
  kind: query
  hex: "BE EF 03 06 00 B0 D2 02 00 02 30 00 00"
  params: []

- id: shutter_set_off
  label: Shutter Set OFF
  kind: action
  hex: "BE EF 03 06 00 F3 93 01 00 05 24 00 00"
  params: []

- id: shutter_set_on
  label: Shutter Set ON
  kind: action
  hex: "BE EF 03 06 00 63 92 01 00 05 24 01 00"
  params: []

- id: shutter_get
  label: Shutter Get
  kind: query
  hex: "BE EF 03 06 00 C0 93 02 00 05 24 00 00"
  params: []

- id: pbyp_set_off
  label: PbyP Set OFF
  kind: action
  hex: "BE EF 03 06 00 3E 26 01 00 10 23 00 00"
  params: []

- id: pbyp_set_on
  label: PbyP Set ON
  kind: action
  hex: "BE EF 03 06 00 AE 27 01 00 10 23 01 00"
  params: []

- id: pbyp_get
  label: PbyP Get
  kind: query
  hex: "BE EF 03 06 00 0D 26 02 00 10 23 00 00"
  params: []

- id: pbyp_right_source_set_computer_in_1
  label: PbyP Right Source Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 86 27 01 00 12 23 00 00"
  params: []

- id: pbyp_right_source_set_computer_in_2
  label: PbyP Right Source Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 46 25 01 00 12 23 04 00"
  params: []

- id: pbyp_right_source_set_bnc
  label: PbyP Right Source Set BNC
  kind: action
  hex: "BE EF 03 06 00 B6 25 01 00 12 23 07 00"
  params: []

- id: pbyp_right_source_set_hdmi
  label: PbyP Right Source Set HDMI
  kind: action
  hex: "BE EF 03 06 00 76 27 01 00 12 23 03 00"
  params: []

- id: pbyp_right_source_set_dvi_d
  label: PbyP Right Source Set DVI-D
  kind: action
  hex: "BE EF 03 06 00 D6 21 01 00 12 23 09 00"
  params: []

- id: pbyp_right_source_set_component
  label: PbyP Right Source Set COMPONENT
  kind: action
  hex: "BE EF 03 06 00 D6 24 01 00 12 23 05 00"
  params: []

- id: pbyp_right_source_set_s_video
  label: PbyP Right Source Set S-VIDEO
  kind: action
  hex: "BE EF 03 06 00 E6 26 01 00 12 23 02 00"
  params: []

- id: pbyp_right_source_set_video1
  label: PbyP Right Source Set VIDEO 1
  kind: action
  hex: "BE EF 03 06 00 16 26 01 00 12 23 01 00"
  params: []

- id: pbyp_right_source_set_video2
  label: PbyP Right Source Set VIDEO 2
  kind: action
  hex: "BE EF 03 06 00 26 21 01 00 12 23 0A 00"
  params: []

- id: pbyp_right_source_get
  label: PbyP Right Source Get
  kind: query
  hex: "BE EF 03 06 00 B5 27 02 00 12 23 00 00"
  params: []

- id: pbyp_main_area_set_left
  label: PbyP Main Area Set LEFT
  kind: action
  hex: "BE EF 03 06 00 7A 26 01 00 13 23 00 00"
  params: []

- id: pbyp_main_area_set_right
  label: PbyP Main Area Set RIGHT
  kind: action
  hex: "BE EF 03 06 00 EA 27 01 00 13 23 01 00"
  params: []

- id: pbyp_main_area_get
  label: PbyP Main Area Get
  kind: query
  hex: "BE EF 03 06 00 49 26 02 00 13 23 00 00"
  params: []

- id: pbyp_left_source_set_computer_in_1
  label: PbyP Left Source Set COMPUTER IN 1
  kind: action
  hex: "BE EF 03 06 00 F2 26 01 00 15 23 00 00"
  params: []

- id: pbyp_left_source_set_computer_in_2
  label: PbyP Left Source Set COMPUTER IN 2
  kind: action
  hex: "BE EF 03 06 00 32 24 01 00 15 23 04 00"
  params: []

- id: pbyp_left_source_set_bnc
  label: PbyP Left Source Set BNC
  kind: action
  hex: "BE EF 03 06 00 C2 24 01 00 15 23 07 00"
  params: []

- id: pbyp_left_source_set_hdmi
  label: PbyP Left Source Set HDMI
  kind: action
  hex: "BE EF 03 06 00 02 26 01 00 15 23 03 00"
  params: []

- id: pbyp_left_source_set_dvi_d
  label: PbyP Left Source Set DVI-D
  kind: action
  hex: "BE EF 03 06 00 A2 20 01 00 15 23 09 00"
  params: []

- id: pbyp_left_source_set_component
  label: PbyP Left Source Set COMPONENT
  kind: action
  hex: "BE EF 03 06 00 A2 25 01 00 15 23 05 00"
  params: []

- id: pbyp_left_source_set_s_video
  label: PbyP Left Source Set S-VIDEO
  kind: action
  hex: "BE EF 03 06 00 92 27 01 00 15 23 02 00"
  params: []

- id: pbyp_left_source_set_video1
  label: PbyP Left Source Set VIDEO 1
  kind: action
  hex: "BE EF 03 06 00 62 27 01 00 15 23 01 00"
  params: []

- id: pbyp_left_source_set_video2
  label: PbyP Left Source Set VIDEO 2
  kind: action
  hex: "BE EF 03 06 00 52 20 01 00 15 23 0A 00"
  params: []

- id: pbyp_left_source_get
  label: PbyP Left Source Get
  kind: query
  hex: "BE EF 03 06 00 C1 26 02 00 15 23 00 00"
  params: []

- id: pbyp_swap
  label: PbyP Swap
  kind: action
  hex: "BE EF 03 06 00 01 27 06 00 16 23 00 00"
  params: []
- id: my_button_1_set_computer_in_1
  label: "My Button-1 Set COMPUTER IN 1"
  kind: action
  hex: "BE EF 03 06 00 3A 33 01 00 00 36 00 00"
  params: []

- id: my_button_1_set_computer_in_2
  label: "My Button-1 Set COMPUTER IN 2"
  kind: action
  hex: "BE EF 03 06 00 FA 31 01 00 00 36 04 00"
  params: []

- id: my_button_1_set_bnc
  label: "My Button-1 Set BNC"
  kind: action
  hex: "BE EF 03 06 00 0A 31 01 00 00 36 07 00"
  params: []

- id: my_button_1_set_hdmi
  label: "My Button-1 Set HDMI"
  kind: action
  hex: "BE EF 03 06 00 CA 33 01 00 00 36 03 00"
  params: []

- id: my_button_1_set_dvi_d
  label: "My Button-1 Set DVI-D"
  kind: action
  hex: "BE EF 03 06 00 6A 35 01 00 00 36 09 00"
  params: []

- id: my_button_1_set_component
  label: "My Button-1 Set COMPONENT"
  kind: action
  hex: "BE EF 03 06 00 6A 30 01 00 00 36 05 00"
  params: []

- id: my_button_1_set_s_video
  label: "My Button-1 Set S-VIDEO"
  kind: action
  hex: "BE EF 03 06 00 5A 32 01 00 00 36 02 00"
  params: []

- id: my_button_1_set_video_1
  label: "My Button-1 Set VIDEO 1"
  kind: action
  hex: "BE EF 03 06 00 AA 32 01 00 00 36 01 00"
  params: []

- id: my_button_1_set_video_2
  label: "My Button-1 Set VIDEO 2"
  kind: action
  hex: "BE EF 03 06 00 9A 35 01 00 00 36 0A 00"
  params: []

- id: my_button_1_set_information
  label: "My Button-1 Set INFORMATION"
  kind: action
  hex: "BE EF 03 06 00 FA 3E 01 00 00 36 10 00"
  params: []

- id: my_button_1_set_auto_keystone_execute
  label: "My Button-1 Set AUTO KEYSTONE EXECUTE"
  kind: action
  hex: "BE EF 03 06 00 6A 3F 01 00 00 36 11 00"
  params: []

- id: my_button_1_set_my_memory
  label: "My Button-1 Set MY MEMORY"
  kind: action
  hex: "BE EF 03 06 00 9A 3F 01 00 00 36 12 00"
  params: []

- id: my_button_1_set_active_iris
  label: "My Button-1 Set ACTIVE IRIS"
  kind: action
  hex: "BE EF 03 06 00 AA 3D 01 00 00 36 15 00"
  params: []

- id: my_button_1_set_picture_mode
  label: "My Button-1 Set PICTURE MODE"
  kind: action
  hex: "BE EF 03 06 00 0A 3E 01 00 00 36 13 00"
  params: []

- id: my_button_1_set_filter_reset
  label: "My Button-1 Set FILTER RESET"
  kind: action
  hex: "BE EF 03 06 00 3A 3C 01 00 00 36 14 00"
  params: []

- id: my_button_1_set_template
  label: "My Button-1 Set TEMPLATE"
  kind: action
  hex: "BE EF 03 06 00 CA 39 01 00 00 36 1B 00"
  params: []

- id: my_button_1_set_pbyp_swap
  label: "My Button-1 Set PbyP SWAP"
  kind: action
  hex: "BE EF 03 06 00 5A 38 01 00 00 36 1A 00"
  params: []

- id: my_button_1_set_lens_memory_1
  label: "My Button-1 Set LENS MEMORY-1"
  kind: action
  hex: "BE EF 03 06 00 CA 27 01 00 00 36 33 00"
  params: []

- id: my_button_1_set_lens_memory_2
  label: "My Button-1 Set LENS MEMORY-2"
  kind: action
  hex: "BE EF 03 06 00 FA 25 01 00 00 36 34 00"
  params: []

- id: my_button_1_set_lens_memory_3
  label: "My Button-1 Set LENS MEMORY-3"
  kind: action
  hex: "BE EF 03 06 00 6A 24 01 00 00 36 35 00"
  params: []

- id: my_button_1_set_my_image
  label: "My Button-1 Set MY IMAGE"
  kind: action
  hex: "BE EF 03 06 00 5A 3D 01 00 00 36 16 00"
  params: []

- id: my_button_2_set_computer_in_1
  label: "My Button-2 Set COMPUTER IN 1"
  kind: action
  hex: "BE EF 03 06 00 C6 32 01 00 01 36 00 00"
  params: []

- id: my_button_2_set_computer_in_2
  label: "My Button-2 Set COMPUTER IN 2"
  kind: action
  hex: "BE EF 03 06 00 06 30 01 00 01 36 04 00"
  params: []

- id: my_button_2_set_bnc
  label: "My Button-2 Set BNC"
  kind: action
  hex: "BE EF 03 06 00 F6 30 01 00 01 36 07 00"
  params: []

- id: my_button_2_set_hdmi
  label: "My Button-2 Set HDMI"
  kind: action
  hex: "BE EF 03 06 00 36 32 01 00 01 36 03 00"
  params: []

- id: my_button_2_set_dvi_d
  label: "My Button-2 Set DVI-D"
  kind: action
  hex: "BE EF 03 06 00 96 34 01 00 01 36 09 00"
  params: []

- id: my_button_2_set_component
  label: "My Button-2 Set COMPONENT"
  kind: action
  hex: "BE EF 03 06 00 96 31 01 00 01 36 05 00"
  params: []

- id: my_button_2_set_s_video
  label: "My Button-2 Set S-VIDEO"
  kind: action
  hex: "BE EF 03 06 00 A6 33 01 00 01 36 02 00"
  params: []

- id: my_button_2_set_video_1
  label: "My Button-2 Set VIDEO 1"
  kind: action
  hex: "BE EF 03 06 00 56 33 01 00 01 36 01 00"
  params: []

- id: my_button_2_set_video_2
  label: "My Button-2 Set VIDEO 2"
  kind: action
  hex: "BE EF 03 06 00 66 34 01 00 01 36 0A 00"
  params: []

- id: my_button_2_set_information
  label: "My Button-2 Set INFORMATION"
  kind: action
  hex: "BE EF 03 06 00 06 3F 01 00 01 36 10 00"
  params: []

- id: my_button_2_set_auto_keystone_execute
  label: "My Button-2 Set AUTO KEYSTONE EXECUTE"
  kind: action
  hex: "BE EF 03 06 00 96 3E 01 00 01 36 11 00"
  params: []

- id: my_button_2_set_my_memory
  label: "My Button-2 Set MY MEMORY"
  kind: action
  hex: "BE EF 03 06 00 66 3E 01 00 01 36 12 00"
  params: []

- id: my_button_2_set_active_iris
  label: "My Button-2 Set ACTIVE IRIS"
  kind: action
  hex: "BE EF 03 06 00 56 3C 01 00 01 36 15 00"
  params: []

- id: my_button_2_set_picture_mode
  label: "My Button-2 Set PICTURE MODE"
  kind: action
  hex: "BE EF 03 06 00 F6 3F 01 00 01 36 13 00"
  params: []

- id: my_button_2_set_filter_reset
  label: "My Button-2 Set FILTER RESET"
  kind: action
  hex: "BE EF 03 06 00 C6 3D 01 00 01 36 14 00"
  params: []

- id: my_button_2_set_template
  label: "My Button-2 Set TEMPLATE"
  kind: action
  hex: "BE EF 03 06 00 36 38 01 00 01 36 1B 00"
  params: []

- id: my_button_2_set_pbyp_swap
  label: "My Button-2 Set PbyP SWAP"
  kind: action
  hex: "BE EF 03 06 00 A6 39 01 00 01 36 1A 00"
  params: []

- id: my_button_2_set_lens_memory_1
  label: "My Button-2 Set LENS MEMORY-1"
  kind: action
  hex: "BE EF 03 06 00 36 26 01 00 01 36 33 00"
  params: []

- id: my_button_2_set_lens_memory_2
  label: "My Button-2 Set LENS MEMORY-2"
  kind: action
  hex: "BE EF 03 06 00 06 24 01 00 01 36 34 00"
  params: []

- id: my_button_2_set_lens_memory_3
  label: "My Button-2 Set LENS MEMORY-3"
  kind: action
  hex: "BE EF 03 06 00 96 25 01 00 01 36 35 00"
  params: []

- id: my_button_2_set_my_image
  label: "My Button-2 Set MY IMAGE"
  kind: action
  hex: "BE EF 03 06 00 A6 3C 01 00 01 36 16 00"
  params: []

- id: my_button_3_set_computer_in_1
  label: "My Button-3 Set COMPUTER IN 1"
  kind: action
  hex: "BE EF 03 06 00 82 32 01 00 02 36 00 00"
  params: []

- id: my_button_3_set_computer_in_2
  label: "My Button-3 Set COMPUTER IN 2"
  kind: action
  hex: "BE EF 03 06 00 42 30 01 00 02 36 04 00"
  params: []

- id: my_button_3_set_bnc
  label: "My Button-3 Set BNC"
  kind: action
  hex: "BE EF 03 06 00 B2 30 01 00 02 36 07 00"
  params: []

- id: my_button_3_set_hdmi
  label: "My Button-3 Set HDMI"
  kind: action
  hex: "BE EF 03 06 00 72 32 01 00 02 36 03 00"
  params: []

- id: my_button_3_set_dvi_d
  label: "My Button-3 Set DVI-D"
  kind: action
  hex: "BE EF 03 06 00 D2 34 01 00 02 36 09 00"
  params: []

- id: my_button_3_set_component
  label: "My Button-3 Set COMPONENT"
  kind: action
  hex: "BE EF 03 06 00 D2 31 01 00 02 36 05 00"
  params: []

- id: my_button_3_set_s_video
  label: "My Button-3 Set S-VIDEO"
  kind: action
  hex: "BE EF 03 06 00 E2 33 01 00 02 36 02 00"
  params: []

- id: my_button_3_set_video_1
  label: "My Button-3 Set VIDEO 1"
  kind: action
  hex: "BE EF 03 06 00 12 33 01 00 02 36 01 00"
  params: []

- id: my_button_3_set_video_2
  label: "My Button-3 Set VIDEO 2"
  kind: action
  hex: "BE EF 03 06 00 22 34 01 00 02 36 0A 00"
  params: []

- id: my_button_3_set_information
  label: "My Button-3 Set INFORMATION"
  kind: action
  hex: "BE EF 03 06 00 42 3F 01 00 02 36 10 00"
  params: []

- id: my_button_3_set_auto_keystone_execute
  label: "My Button-3 Set AUTO KEYSTONE EXECUTE"
  kind: action
  hex: "BE EF 03 06 00 D2 3E 01 00 02 36 11 00"
  params: []

- id: my_button_3_set_my_memory
  label: "My Button-3 Set MY MEMORY"
  kind: action
  hex: "BE EF 03 06 00 22 3E 01 00 02 36 12 00"
  params: []

- id: my_button_3_set_active_iris
  label: "My Button-3 Set ACTIVE IRIS"
  kind: action
  hex: "BE EF 03 06 00 12 3C 01 00 02 36 15 00"
  params: []

- id: my_button_3_set_picture_mode
  label: "My Button-3 Set PICTURE MODE"
  kind: action
  hex: "BE EF 03 06 00 B2 3F 01 00 02 36 13 00"
  params: []

- id: my_button_3_set_filter_reset
  label: "My Button-3 Set FILTER RESET"
  kind: action
  hex: "BE EF 03 06 00 82 3D 01 00 02 36 14 00"
  params: []

- id: my_button_3_set_template
  label: "My Button-3 Set TEMPLATE"
  kind: action
  hex: "BE EF 03 06 00 72 38 01 00 02 36 1B 00"
  params: []

- id: my_button_3_set_pbyp_swap
  label: "My Button-3 Set PbyP SWAP"
  kind: action
  hex: "BE EF 03 06 00 E2 39 01 00 02 36 1A 00"
  params: []

- id: my_button_3_set_lens_memory_1
  label: "My Button-3 Set LENS MEMORY-1"
  kind: action
  hex: "BE EF 03 06 00 72 26 01 00 02 36 33 00"
  params: []

- id: my_button_3_set_lens_memory_2
  label: "My Button-3 Set LENS MEMORY-2"
  kind: action
  hex: "BE EF 03 06 00 42 24 01 00 02 36 34 00"
  params: []

- id: my_button_3_set_lens_memory_3
  label: "My Button-3 Set LENS MEMORY-3"
  kind: action
  hex: "BE EF 03 06 00 D2 25 01 00 02 36 35 00"
  params: []

- id: my_button_3_set_my_image
  label: "My Button-3 Set MY IMAGE"
  kind: action
  hex: "BE EF 03 06 00 E2 3C 01 00 02 36 16 00"
  params: []

- id: my_button_4_set_computer_in_1
  label: "My Button-4 Set COMPUTER IN 1"
  kind: action
  hex: "BE EF 03 06 00 7E 33 01 00 03 36 00 00"
  params: []

- id: my_button_4_set_computer_in_2
  label: "My Button-4 Set COMPUTER IN 2"
  kind: action
  hex: "BE EF 03 06 00 BE 31 01 00 03 36 04 00"
  params: []

- id: my_button_4_set_bnc
  label: "My Button-4 Set BNC"
  kind: action
  hex: "BE EF 03 06 00 4E 31 01 00 03 36 07 00"
  params: []

- id: my_button_4_set_hdmi
  label: "My Button-4 Set HDMI"
  kind: action
  hex: "BE EF 03 06 00 8E 33 01 00 03 36 03 00"
  params: []

- id: my_button_4_set_dvi_d
  label: "My Button-4 Set DVI-D"
  kind: action
  hex: "BE EF 03 06 00 2E 35 01 00 03 36 09 00"
  params: []

- id: my_button_4_set_component
  label: "My Button-4 Set COMPONENT"
  kind: action
  hex: "BE EF 03 06 00 2E 30 01 00 03 36 05 00"
  params: []

- id: my_button_4_set_s_video
  label: "My Button-4 Set S-VIDEO"
  kind: action
  hex: "BE EF 03 06 00 1E 32 01 00 03 36 02 00"
  params: []

- id: my_button_4_set_video_1
  label: "My Button-4 Set VIDEO 1"
  kind: action
  hex: "BE EF 03 06 00 EE 32 01 00 03 36 01 00"
  params: []

- id: my_button_4_set_video_2
  label: "My Button-4 Set VIDEO 2"
  kind: action
  hex: "BE EF 03 06 00 DE 35 01 00 03 36 0A 00"
  params: []

- id: my_button_4_set_information
  label: "My Button-4 Set INFORMATION"
  kind: action
  hex: "BE EF 03 06 00 BE 3E 01 00 03 36 10 00"
  params: []

- id: my_button_4_set_auto_keystone_execute
  label: "My Button-4 Set AUTO KEYSTONE EXECUTE"
  kind: action
  hex: "BE EF 03 06 00 2E 3F 01 00 03 36 11 00"
  params: []

- id: my_button_4_set_my_memory
  label: "My Button-4 Set MY MEMORY"
  kind: action
  hex: "BE EF 03 06 00 DE 3F 01 00 03 36 12 00"
  params: []

- id: my_button_4_set_active_iris
  label: "My Button-4 Set ACTIVE IRIS"
  kind: action
  hex: "BE EF 03 06 00 EE 3D 01 00 03 36 15 00"
  params: []

- id: my_button_4_set_picture_mode
  label: "My Button-4 Set PICTURE MODE"
  kind: action
  hex: "BE EF 03 06 00 4E 3E 01 00 03 36 13 00"
  params: []

- id: my_button_4_set_filter_reset
  label: "My Button-4 Set FILTER RESET"
  kind: action
  hex: "BE EF 03 06 00 7E 3C 01 00 03 36 14 00"
  params: []

- id: my_button_4_set_template
  label: "My Button-4 Set TEMPLATE"
  kind: action
  hex: "BE EF 03 06 00 8E 39 01 00 03 36 1B 00"
  params: []

- id: my_button_4_set_pbyp_swap
  label: "My Button-4 Set PbyP SWAP"
  kind: action
  hex: "BE EF 03 06 00 1E 38 01 00 03 36 1A 00"
  params: []

- id: my_button_4_set_lens_memory_1
  label: "My Button-4 Set LENS MEMORY-1"
  kind: action
  hex: "BE EF 03 06 00 8E 27 01 00 03 36 33 00"
  params: []

- id: my_button_4_set_lens_memory_2
  label: "My Button-4 Set LENS MEMORY-2"
  kind: action
  hex: "BE EF 03 06 00 BE 25 01 00 03 36 34 00"
  params: []

- id: my_button_4_set_lens_memory_3
  label: "My Button-4 Set LENS MEMORY-3"
  kind: action
  hex: "BE EF 03 06 00 2E 24 01 00 03 36 35 00"
  params: []

- id: my_button_4_set_my_image
  label: "My Button-4 Set MY IMAGE"
  kind: action
  hex: "BE EF 03 06 00 1E 3D 01 00 03 36 16 00"
  params: []
```

## Feedbacks
```yaml
- id: power_status
  query_command: power_get

- id: input_source_status
  query_command: input_source_get

- id: error_status
  query_command: error_status_get

- id: brightness_status
  query_command: brightness_get

- id: contrast_status
  query_command: contrast_get

- id: picture_mode_status
  query_command: picture_mode_get

- id: gamma_status
  query_command: gamma_get

- id: color_temp_status
  query_command: color_temp_get

- id: aspect_status
  query_command: aspect_get

- id: eco_mode_status
  query_command: eco_mode_get

- id: mirror_status
  query_command: mirror_get

- id: blank_on_off_status
  query_command: blank_on_off_get

- id: freeze_status
  query_command: freeze_get

- id: shutter_status
  query_command: shutter_get

- id: lamp_time_low_status
  query_command: lamp_time_low_get

- id: lamp_time_high_status
  query_command: lamp_time_high_get

- id: filter_time_low_status
  query_command: filter_time_low_get

- id: filter_time_high_status
  query_command: filter_time_high_get

- id: pbyp_status
  query_command: pbyp_get

- id: lens_memory_index_status
  query_command: lens_memory_index_get

- id: keystone_v_status
  query_command: keystone_v_get

- id: keystone_h_status
  query_command: keystone_h_get
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
The RS-232C protocol uses a 7-byte header (BE EF 03 06 00 CRC_low CRC_high) plus 6-byte command data; CRC covers the 6 command bytes only. A minimum 40 ms interval is required between the response code and the next command, and commands are not accepted during warm-up. TCP port 9715 wraps the same binary payload with an additional framing layer (1-byte header 02h, 1-byte length 0Dh, 13-byte command, checksum, connection ID); TCP port 23 uses the same bare binary format as RS-232C.

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000161-02-christie-tech-guid-lw650_ls700_lx750_lw720-.pdf
  - https://www.manualslib.com/manual/918644/Christie-Lx750.html
  - https://www.manualslib.com/manual/1226224/Christie-Lx750.html
retrieved_at: 2026-05-22T05:51:48.893Z
last_checked_at: 2026-06-23T11:53:01.834Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T11:53:01.834Z
matched_actions: 636
action_count: 636
confidence: medium
summary: "All 636 spec actions match source hex sequences verbatim; transport 19200 8N1 + TCP 23 confirmed. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PJLink command set documented separately — PJLink actions not enumerated here as the source treats them as a distinct protocol layer"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
