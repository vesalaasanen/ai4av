---
spec_id: admin/hitachi-cp-tw-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hitachi CP-TW Series Control Spec"
manufacturer: Hitachi
model_family: CP-TW2503
aliases: []
compatible_with:
  manufacturers:
    - Hitachi
  models:
    - CP-TW2503
    - CP-TW3003
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hitachi.com
source_urls:
  - https://www.hitachi.com/content/dam/hitachi/au/en_au/product-support/ultra-interactive/CPTW2503_CPTW3003_Technical.pdf
  - https://www.hitachi.com/content/dam/hitachi/au/en_au/product-support/ultra-interactive/Hitachi-CP-TW2505.pdf
retrieved_at: 2026-06-25T08:18:40.161Z
last_checked_at: 2026-06-25T09:13:45.126Z
generated_at: 2026-06-25T09:13:45.126Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "no separate parameter surface documented beyond the"
  - "source describes response codes (ACK/NAK/Error/Data/Auth"
  - "no multi-step sequences documented in source."
  - "source contains power-on sequencing cautions (\"Turn off the"
  - "per-model behavioral differences (CP-TW2503 vs CP-TW3003) not itemized in source; voltage/current draw not stated."
verification:
  verdict: verified
  checked_at: 2026-06-25T09:13:45.126Z
  matched_actions: 659
  action_count: 659
  confidence: medium
  summary: "deterministic presence proof: 659/659 payloads verbatim in source; stratified Sonnet sample corroborated (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Hitachi CP-TW Series Control Spec

## Summary
Hitachi CP-TW2503 / CP-TW3003 ultra-short-throw interactive projectors. This spec covers RS-232C serial control (D-sub 9 CONTROL port, 19200 bps 8N1) and command-control-over-LAN (TCP ports 23 and 9715, framing-wrapped RS-232C commands), plus the PJLink control surface. Authentication on TCP ports is challenge-response MD5.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
  port: 9715  # TCP port for framed RS-232C commands; TCP #23 also supported per source
  alternate_ports:
    - 23     # raw RS-232C commands over TCP, per source
auth:
  type: md5_challenge_response  # MD5 challenge-response on TCP ports when authentication enabled (default Disable on port 23, Enable on port 9715)
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
# All payloads are verbatim hex byte sequences from the source. Bytes use
# the source's "NNh" notation; {NAME} tokens are parameters substituted at
# send time. No bytes are reformatted from the source.

- id: byte_number_0_1_2_3_4_5_6_7_8_9
  label: "Byte Number 0 1 2 3 4 5 6 7 8 9"
  kind: action
  command: "10 11 12"
  params: []

- id: <increment>_increment_setup_value_b_lb_h_by1_a_l_a_h_04h_00h_b_l_b_h
  label: "<INCREMENT> Increment setup value [(bL)(bH)] by1. (aL) (aH) 04h 00h (bL) (bH)"
  kind: action
  command: "00h 00h"
  params: []

- id: <decrement>_decrement_setup_value_b_lb_h_by1_a_l_a_h_05h_00h_b_l_b_h
  label: "<DECREMENT> Decrement setup value [(bL)(bH)] by1. (aL) (aH) 05h 00h (bL) (bH)"
  kind: action
  command: "00h 00h"
  params: []

- id: <execute>_run_a_command_b_lb_h_a_l_a_h_06h_00h_b_l_b_h
  label: "<EXECUTE> Run a command [(bL)(bH)]. (aL) (aH) 06h 00h (bL) (bH)"
  kind: action
  command: "00h 00h"
  params: []

- id: power_set_turn_off
  label: "Power Set Turn off"
  kind: action
  command: "BE  EF 03 06  00 2A  D3 01  00 00  60 00  00"
  params: []

- id: power_set_turn_on
  label: "Power Set Turn on"
  kind: action
  command: "BE  EF 03 06  00 BA  D2 01  00 00  60 01  00"
  params: []

- id: input_source_set_computer_in1
  label: "Input Source Set COMPUTER IN1"
  kind: action
  command: "BE  EF 03 06  00 FE  D2 01  00 00  20 00  00"
  params: []

- id: input_source_set_computer_in2
  label: "Input Source Set COMPUTER IN2"
  kind: action
  command: "BE  EF 03 06  00 3E  D0 01  00 00  20 04  00"
  params: []

- id: input_source_set_hdmi1
  label: "Input Source Set HDMI1"
  kind: action
  command: "BE EF 03 06 00 0E D2 01 00 00 20 03 00"
  params: []

- id: input_source_set_hdmi2
  label: "Input Source Set HDMI2"
  kind: action
  command: "BE EF 03 06 00 6E D6 01 00 00 20 0D 00"
  params: []

- id: input_source_set_video
  label: "Input Source Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 6E  D3 01  00 00  20 01  00"
  params: []

- id: input_source_set_usb_type_a
  label: "Input Source Set USB TYPE A"
  kind: action
  command: "BE EF 03 06 00 5E D1 01 00 00 20 06 00"
  params: []

- id: input_source_set_lan
  label: "Input Source Set LAN"
  kind: action
  command: "BE EF 03 06 00 CE D5 01 00 00 20 0B 00"
  params: []

- id: input_source_set_usb_type_b
  label: "Input Source Set USB TYPE B"
  kind: action
  command: "BE EF 03 06 00 FE D7 01 00 00 20 0C 00"
  params: []

- id: magnify_increment
  label: "MAGNIFY Increment"
  kind: action
  command: "BE  EF 03 06  00 1A  D2 04  00 07  30 00  00"
  params: []

- id: magnify_decrement
  label: "MAGNIFY Decrement"
  kind: action
  command: "BE  EF 03 06  00 CB  D3 05  00 07  30 00  00"
  params: []

- id: freeze_set_normal
  label: "FREEZE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 83  D2 01  00 02  30 00  00"
  params: []

- id: freeze_set_freeze
  label: "FREEZE Set FREEZE"
  kind: action
  command: "BE  EF 03 06  00 13  D3 01  00 02  30 01  00"
  params: []

- id: picture_mode_set_normal
  label: "PICTURE MODE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 23  F6 01  00 BA  30 00  00"
  params: []

- id: picture_mode_set_cinema
  label: "PICTURE MODE Set CINEMA"
  kind: action
  command: "BE  EF 03 06  00 B3  F7 01  00 BA  30 01  00"
  params: []

- id: picture_mode_set_dynamic
  label: "PICTURE MODE Set DYNAMIC"
  kind: action
  command: "BE  EF 03 06  00 E3  F4 01  00 BA  30 04  00"
  params: []

- id: picture_mode_set_boardblack
  label: "PICTURE MODE Set BOARD(BLACK)"
  kind: action
  command: "BE  EF 03 06  00 E3  EF 01  00 BA  30 20  00"
  params: []

- id: picture_mode_set_boardgreen
  label: "PICTURE MODE Set BOARD(GREEN)"
  kind: action
  command: "BE  EF 03 06  00 73  EE 01  00 BA  30 21  00"
  params: []

- id: picture_mode_set_whiteboard
  label: "PICTURE MODE Set WHITEBOARD"
  kind: action
  command: "BE  EF 03 06  00 83  EE 01  00 BA  30 22  00"
  params: []

- id: picture_mode_set_daytime
  label: "PICTURE MODE Set DAYTIME"
  kind: action
  command: "BE  EF 03 06  00 E3  C7 01  00 BA  30 40  00"
  params: []

- id: picture_mode_set_photo
  label: "PICTURE MODE Set PHOTO"
  kind: action
  command: "BE  EF 03 06  00 73  F5 01  00 BA  30 05  00"
  params: []

- id: picture_mode_set_dicom_sim
  label: "PICTURE MODE Set DICOM SIM."
  kind: action
  command: "BE  EF 03 06  00 73  C6 01  00 BA  30 41  00"
  params: []

- id: brightness_increment
  label: "BRIGHTNESS Increment"
  kind: action
  command: "BE  EF 03 06  00 EF  D2 04  00 03  20 00  00"
  params: []

- id: brightness_decrement
  label: "BRIGHTNESS Decrement"
  kind: action
  command: "BE  EF 03 06  00 3E  D3 05  00 03  20 00  00"
  params: []

- id: brightness_reset_execute
  label: "BRIGHTNESS Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 58  D3 06  00 00  70 00  00"
  params: []

- id: contrast_increment
  label: "CONTRAST Increment"
  kind: action
  command: "BE  EF 03 06  00 9B  D3 04  00 04  20 00  00"
  params: []

- id: contrast_decrement
  label: "CONTRAST Decrement"
  kind: action
  command: "BE  EF 03 06  00 4A  D2 05  00 04  20 00  00"
  params: []

- id: contrast_reset_execute
  label: "CONTRAST Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 A4  D2 06  00 01  70 00  00"
  params: []

- id: gamma_set_1_default
  label: "GAMMA Set 1 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 07  E9 01  00 A1  30 20  00"
  params: []

- id: gamma_set_1_custom
  label: "GAMMA Set 1 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 07  FD 01  00 A1  30 10  00"
  params: []

- id: gamma_set_2_default
  label: "GAMMA Set 2 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 97  E8 01  00 A1  30 21  00"
  params: []

- id: gamma_set_2_custom
  label: "GAMMA Set 2 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 97  FC 01  00 A1  30 11  00"
  params: []

- id: gamma_set_3_default
  label: "GAMMA Set 3 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 67  E8 01  00 A1  30 22  00"
  params: []

- id: gamma_set_3_custom
  label: "GAMMA Set 3 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 67  FC 01  00 A1  30 12  00"
  params: []

- id: gamma_set_4_default
  label: "GAMMA Set 4 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 F7  E9 01  00 A1  30 23  00"
  params: []

- id: gamma_set_4_custom
  label: "GAMMA Set 4 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 F7  FD 01  00 A1  30 13  00"
  params: []

- id: gamma_set_5_default
  label: "GAMMA Set 5 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 C7  EB 01  00 A1  30 24  00"
  params: []

- id: gamma_set_5_custom
  label: "GAMMA Set 5 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 C7  FF 01  00 A1  30 14  00"
  params: []

- id: gamma_set_6_default
  label: "GAMMA Set 6 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 57  EA 01  00 A1  30 25  00"
  params: []

- id: gamma_set_6_custom
  label: "GAMMA Set 6 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 57  FE 01  00 A1  30 15  00"
  params: []

- id: gamma_set_7_default
  label: "GAMMA Set 7 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 A7  EA 01  00 A1  30 26  00"
  params: []

- id: gamma_set_7_custom
  label: "GAMMA Set 7 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 A7  FE 01  00 A1  30 16  00"
  params: []

- id: gamma_set_8_default
  label: "GAMMA Set 8 DEFAULT"
  kind: action
  command: "BE  EF 03 06  00 37  EB 01  00 A1  30 27  00"
  params: []

- id: gamma_set_8_custom
  label: "GAMMA Set 8 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 37  FF 01  00 A1  30 17  00"
  params: []

- id: accent_ualizer_set_increment
  label: "ACCENT UALIZER Set Increment"
  kind: action
  command: "BE EF 03 06 00 3B 70 04 00 0C 22 00 00"
  params: []

- id: accent_ualizer_set_decrement
  label: "ACCENT UALIZER Set Decrement"
  kind: action
  command: "BE EF 03 06 00 EA 71 05 00 0C 22 00 00"
  params: []

- id: accent_ualizer_reset_set_execute
  label: "ACCENT UALIZER RESET Set Execute"
  kind: action
  command: "BE EF 03 06 00 C8 DB 06 00 2C 70 00 00"
  params: []

- id: hdcr_set_increment
  label: "HDCR Set Increment"
  kind: action
  command: "BE EF 03 06 00 C7 71 04 00 0D 22 00 00"
  params: []

- id: hdcr_set_decrement
  label: "HDCR Set Decrement"
  kind: action
  command: "BE EF 03 06 00 16 70 05 00 0D 22 00 00"
  params: []

- id: hdcr_reset_set_execute
  label: "HDCR RESET Set Execute"
  kind: action
  command: "BE EF 03 06 00 34 DA 06 00 2D 70 00 00"
  params: []

- id: user_gamma_pattern_set_off
  label: "User Gamma Pattern Set Off"
  kind: action
  command: "BE  EF 03 06  00 FB  FA 01  00 80  30 00  00"
  params: []

- id: user_gamma_pattern_set_9_stepsgrayscale
  label: "User Gamma Pattern Set 9 stepsgrayscale"
  kind: action
  command: "BE  EF 03 06  00 6B  FB 01  00 80  30 01  00"
  params: []

- id: user_gamma_pattern_set_15_stepsgrayscale
  label: "User Gamma Pattern Set 15 stepsgrayscale"
  kind: action
  command: "BE  EF 03 06  00 9B  FB 01  00 80  30 02  00"
  params: []

- id: user_gamma_pattern_set_ramp
  label: "User Gamma Pattern Set Ramp"
  kind: action
  command: "BE  EF 03 06  00 0B  FA 01  00 80  30 03  00"
  params: []

- id: user_gamma_point_1_set_increment
  label: "User Gamma Point 1 Set Increment"
  kind: action
  command: "BE  EF 03 06  00 6E  FE 04  00 90  30 00  00"
  params: []

- id: user_gamma_point_1_set_decrement
  label: "User Gamma Point 1 Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 BF  FF 05  00 90  30 00  00"
  params: []

- id: user_gamma_point_1_reset_set_execute
  label: "User Gamma Point 1 Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 58  C2 06  00 50  70 00  00"
  params: []

- id: user_gamma_point_2_set_increment
  label: "User Gamma Point 2 Set Increment"
  kind: action
  command: "BE  EF 03 06  00 92  FF 04  00 91  30 00  00"
  params: []

- id: user_gamma_point_2_set_decrement
  label: "User Gamma Point 2 Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 43  FE 05  00 91  30 00  00"
  params: []

- id: user_gamma_point_2_reset_set_execute
  label: "User Gamma Point 2 Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 A4  C3 06  00 51  70 00  00"
  params: []

- id: user_gamma_point_3_set_increment
  label: "User Gamma Point 3 Set Increment"
  kind: action
  command: "BE  EF 03 06  00 D6  FF 04  00 92  30 00  00"
  params: []

- id: user_gamma_point_3_set_decrement
  label: "User Gamma Point 3 Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 07  FE 05  00 92  30 00  00"
  params: []

- id: user_gamma_point_3_reset_execute
  label: "User Gamma Point 3 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 E0  C3 06  00 52  70 00  00"
  params: []

- id: user_gamma_point_4_increment
  label: "User Gamma Point 4 Increment"
  kind: action
  command: "BE  EF 03 06  00 2A  FE 04  00 93  30 00  00"
  params: []

- id: user_gamma_point_4_decrement
  label: "User Gamma Point 4 Decrement"
  kind: action
  command: "BE  EF 03 06  00 FB  FF 05  00 93  30 00  00"
  params: []

- id: user_gamma_point_4_reset_execute
  label: "User Gamma Point 4 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 1C  C2 06  00 53  70 00  00"
  params: []

- id: user_gamma_point_5_increment
  label: "User Gamma Point 5 Increment"
  kind: action
  command: "BE  EF 03 06  00 5E  FF 04  00 94  30 00  00"
  params: []

- id: user_gamma_point_5_decrement
  label: "User Gamma Point 5 Decrement"
  kind: action
  command: "BE  EF 03 06  00 8F  FE 05  00 94  30 00  00"
  params: []

- id: user_gamma_point_5_reset_execute
  label: "User Gamma Point 5 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 68  C3 06  00 54  70 00  00"
  params: []

- id: user_gamma_point_6_increment
  label: "User Gamma Point 6 Increment"
  kind: action
  command: "BE  EF 03 06  00 A2  FE 04  00 95  30 00  00"
  params: []

- id: user_gamma_point_6_decrement
  label: "User Gamma Point 6 Decrement"
  kind: action
  command: "BE  EF 03 06  00 73  FF 05  00 95  30 00  00"
  params: []

- id: user_gamma_point_6_reset_execute
  label: "User Gamma Point 6 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 94  C2 06  00 55  70 00  00"
  params: []

- id: user_gamma_point_7_increment
  label: "User Gamma Point 7 Increment"
  kind: action
  command: "BE  EF 03 06  00 E6  FE 04  00 96  30 00  00"
  params: []

- id: user_gamma_point_7_decrement
  label: "User Gamma Point 7 Decrement"
  kind: action
  command: "BE  EF 03 06  00 37  FF 05  00 96  30 00  00"
  params: []

- id: user_gamma_point_7_reset_execute
  label: "User Gamma Point 7 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 D0  C2 06  00 56  70 00  00"
  params: []

- id: user_gamma_point_8_increment
  label: "User Gamma Point 8 Increment"
  kind: action
  command: "BE  EF 03 06  00 1A  FF 04  00 97  30 00  00"
  params: []

- id: user_gamma_point_8_decrement
  label: "User Gamma Point 8 Decrement"
  kind: action
  command: "BE  EF 03 06  00 CB  FE 05  00 97  30 00  00"
  params: []

- id: user_gamma_point_8_reset_execute
  label: "User Gamma Point 8 Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 2C  C3 06  00 57  70 00  00"
  params: []

- id: color_temp_set_1_high
  label: "COLOR TEMP Set 1 HIGH"
  kind: action
  command: "BE  EF 03 06  00 0B  F5 01  00 B0  30 03  00"
  params: []

- id: color_temp_set_1_custom
  label: "COLOR TEMP Set 1 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 CB  F8 01  00 B0  30 13  00"
  params: []

- id: color_temp_set_2_mid
  label: "COLOR TEMP Set 2 MID"
  kind: action
  command: "BE  EF 03 06  00 9B  F4 01  00 B0  30 02  00"
  params: []

- id: color_temp_set_2_custom
  label: "COLOR TEMP Set 2 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 5B  F9 01  00 B0  30 12  00"
  params: []

- id: color_temp_set_3_low
  label: "COLOR TEMP Set 3 LOW"
  kind: action
  command: "BE  EF 03 06  00 6B  F4 01  00 B0  30 01  00"
  params: []

- id: color_temp_set_3_custom
  label: "COLOR TEMP Set 3 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 AB  F9 01  00 B0  30 11  00"
  params: []

- id: color_temp_set_4_hi_bright_1
  label: "COLOR TEMP Set 4 Hi-BRIGHT-1"
  kind: action
  command: "BE  EF 03 06  00 3B  F2 01  00 B0  30 08  00"
  params: []

- id: color_temp_set_4_custom
  label: "COLOR TEMP Set 4 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 FB  FF 01  00 B0  30 18  00"
  params: []

- id: color_temp_set_5_hi_bright_2
  label: "COLOR TEMP Set 5 Hi-BRIGHT-2"
  kind: action
  command: "BE  EF 03 06  00 AB  F3 01  00 B0  30 09  00"
  params: []

- id: color_temp_set_5_custom
  label: "COLOR TEMP Set 5 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 6B  FE 01  00 B0  30 19  00"
  params: []

- id: color_temp_set_6_hi_bright_3
  label: "COLOR TEMP Set 6 Hi-BRIGHT-3"
  kind: action
  command: "BE  EF 03 06  00 5B  F3 01  00 B0  30 0A  00"
  params: []

- id: color_temp_set_6_custom
  label: "COLOR TEMP Set 6 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 9B  FE 01  00 B0  30 1A  00"
  params: []

- id: color_temp_set_7_hi_bright_4
  label: "COLOR TEMP Set 7 Hi-BRIGHT-4"
  kind: action
  command: "BE  EF 03 06  00 CB  F2 01  00 B0  30 0B  00"
  params: []

- id: color_temp_set_7_custom
  label: "COLOR TEMP Set 7 CUSTOM"
  kind: action
  command: "BE  EF 03 06  00 0B  FF 01  00 B0  30 1B  00"
  params: []

- id: color_temp_gain_r_set_increment
  label: "COLOR TEMP GAIN R Set Increment"
  kind: action
  command: "BE  EF 03 06  00 52  F4 04  00 B1  30 00  00"
  params: []

- id: color_temp_gain_r_set_decrement
  label: "COLOR TEMP GAIN R Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 83  F5 05  00 B1  30 00  00"
  params: []

- id: color_temp_gain_r_reset_set_execute
  label: "COLOR TEMP GAIN R Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 10  C6 06  00 46  70 00  00"
  params: []

- id: color_temp_gain_g_set_increment
  label: "COLOR TEMP GAIN G Set Increment"
  kind: action
  command: "BE  EF 03 06  00 16  F4 04  00 B2  30 00  00"
  params: []

- id: color_temp_gain_g_set_decrement
  label: "COLOR TEMP GAIN G Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 C7  F5 05  00 B2  30 00  00"
  params: []

- id: color_temp_gain_g_reset_execute
  label: "COLOR TEMP GAIN G Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 EC  C7 06  00 47  70 00  00"
  params: []

- id: color_temp_gain_b_increment
  label: "COLOR TEMP GAIN B Increment"
  kind: action
  command: "BE  EF 03 06  00 EA  F5 04  00 B3  30 00  00"
  params: []

- id: color_temp_gain_b_decrement
  label: "COLOR TEMP GAIN B Decrement"
  kind: action
  command: "BE  EF 03 06  00 3B  F4 05  00 B3  30 00  00"
  params: []

- id: color_temp_gain_b_reset_execute
  label: "COLOR TEMP GAIN B Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 F8  C4 06  00 48  70 00  00"
  params: []

- id: color_temp_offset_r_increment
  label: "COLOR TEMP OFFSET R Increment"
  kind: action
  command: "BE  EF 03 06  00 62  F5 04  00 B5  30 00  00"
  params: []

- id: color_temp_offset_r_decrement
  label: "COLOR TEMP OFFSET R Decrement"
  kind: action
  command: "BE  EF 03 06  00 B3  F4 05  00 B5  30 00  00"
  params: []

- id: color_temp_offset_r_reset_execute
  label: "COLOR TEMP OFFSET R Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 40  C5 06  00 4A  70 00  00"
  params: []

- id: color_temp_offset_g_increment
  label: "COLOR TEMP OFFSET G Increment"
  kind: action
  command: "BE  EF 03 06  00 26  F5 04  00 B6  30 00  00"
  params: []

- id: color_temp_offset_g_decrement
  label: "COLOR TEMP OFFSET G Decrement"
  kind: action
  command: "BE  EF 03 06  00 F7  F4 05  00 B6  30 00  00"
  params: []

- id: color_temp_offset_g_reset_execute
  label: "COLOR TEMP OFFSET G Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 BC  C4 06  00 4B  70 00  00"
  params: []

- id: color_temp_offset_b_increment
  label: "COLOR TEMP OFFSET B Increment"
  kind: action
  command: "BE  EF 03 06  00 DA  F4 04  00 B7  30 00  00"
  params: []

- id: color_temp_offset_b_decrement
  label: "COLOR TEMP OFFSET B Decrement"
  kind: action
  command: "BE  EF 03 06  00 0B  F5 05  00 B7  30 00  00"
  params: []

- id: color_temp_offset_b_reset_execute
  label: "COLOR TEMP OFFSET B Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 C8  C5 06  00 4C  70 00  00"
  params: []

- id: color_increment
  label: "COLOR Increment"
  kind: action
  command: "BE  EF 03 06  00 D3  72 04  00 02  22 00  00"
  params: []

- id: color_decrement
  label: "COLOR Decrement"
  kind: action
  command: "BE  EF 03 06  00 02  73 05  00 02  22 00  00"
  params: []

- id: color_reset_execute
  label: "COLOR Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 80  D0 06  00 0A  70 00  00"
  params: []

- id: tint_increment
  label: "TINT Increment"
  kind: action
  command: "BE  EF 03 06  00 2F  73 04  00 03  22 00  00"
  params: []

- id: tint_decrement
  label: "TINT Decrement"
  kind: action
  command: "BE  EF 03 06  00 FE  72 05  00 03  22 00  00"
  params: []

- id: tint_reset_execute
  label: "TINT Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 7C  D1 06  00 0B  70 00  00"
  params: []

- id: sharpness_increment
  label: "SHARPNESS Increment"
  kind: action
  command: "BE  EF 03 06  00 97  72 04  00 01  22 00  00"
  params: []

- id: sharpness_decrement
  label: "SHARPNESS Decrement"
  kind: action
  command: "BE  EF 03 06  00 46  73 05  00 01  22 00  00"
  params: []

- id: sharpness_reset_execute
  label: "SHARPNESS Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 C4  D0 06  00 09  70 00  00"
  params: []

- id: active_iris_set_off
  label: "ACTIVE IRIS Set OFF"
  kind: action
  command: "BE  EF 03 06  00 0B  22 01  00 04  33 00  00"
  params: []

- id: active_iris_set_theater
  label: "ACTIVE IRIS Set THEATER"
  kind: action
  command: "BE  EF 03 06  00 CB  2F 01  00 04  33 10  00"
  params: []

- id: active_iris_set_presentation
  label: "ACTIVE IRIS Set PRESENTATION"
  kind: action
  command: "BE  EF 03 06  00 5B  2E 01  00 04  33 11  00"
  params: []

- id: my_memory_load_set_1
  label: "MY MEMORY Load Set 1"
  kind: action
  command: "BE  EF 03 06  00 0E  D7 01  00 14  20 00  00"
  params: []

- id: my_memory_load_set_2
  label: "MY MEMORY Load Set 2"
  kind: action
  command: "BE  EF 03 06  00 9E  D6 01  00 14  20 01  00"
  params: []

- id: my_memory_load_set_3
  label: "MY MEMORY Load Set 3"
  kind: action
  command: "BE  EF 03 06  00 6E  D6 01  00 14  20 02  00"
  params: []

- id: my_memory_load_set_4
  label: "MY MEMORY Load Set 4"
  kind: action
  command: "BE  EF 03 06  00 FE  D7 01  00 14  20 03  00"
  params: []

- id: my_memory_save_set_1
  label: "MY MEMORY Save Set 1"
  kind: action
  command: "BE  EF 03 06  00 F2  D6 01  00 15  20 00  00"
  params: []

- id: my_memory_save_set_2
  label: "MY MEMORY Save Set 2"
  kind: action
  command: "BE  EF 03 06  00 62  D7 01  00 15  20 01  00"
  params: []

- id: my_memory_save_set_3
  label: "MY MEMORY Save Set 3"
  kind: action
  command: "BE  EF 03 06  00 92  D7 01  00 15  20 02  00"
  params: []

- id: my_memory_save_set_4
  label: "MY MEMORY Save Set 4"
  kind: action
  command: "BE  EF 03 06  00 02  D6 01  00 15  20 03  00"
  params: []

- id: aspect_set_4_3
  label: "ASPECT Set 4:3"
  kind: action
  command: "BE  EF 03 06  00 9E  D0 01  00 08  20 00  00"
  params: []

- id: aspect_set_16_9
  label: "ASPECT Set 16:9"
  kind: action
  command: "BE  EF 03 06  00 0E  D1 01  00 08  20 01  00"
  params: []

- id: aspect_set_native
  label: "ASPECT Set NATIVE"
  kind: action
  command: "BE  EF 03 06  00 5E  D7 01  00 08  20 08  00"
  params: []

- id: aspect_set_14_9
  label: "ASPECT Set 14:9"
  kind: action
  command: "BE  EF 03 06  00 CE  D6 01  00 08  20 09  00"
  params: []

- id: aspect_set_16_10
  label: "ASPECT Set 16:10"
  kind: action
  command: "BE  EF 03 06  00 3E  D6 01  00 08  20 0A  00"
  params: []

- id: aspect_set_normal
  label: "ASPECT Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 5E  DD 01  00 08  20 10  00"
  params: []

- id: over_scan_set_increment
  label: "OVER SCAN Set Increment"
  kind: action
  command: "BE  EF 03 06  00 F7  70 04  00 09  22 00  00"
  params: []

- id: over_scan_set_decrement
  label: "OVER SCAN Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 26  71 05  00 09  22 00  00"
  params: []

- id: over_scan_reset_set_execute
  label: "OVER SCAN Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 EC  D9 06  00 27  70 00  00"
  params: []

- id: v_position_set_increment
  label: "V POSITION Set Increment"
  kind: action
  command: "BE  EF 03 06  00 6B  83 04  00 00  21 00  00"
  params: []

- id: v_position_set_decrement
  label: "V POSITION Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 BA  82 05  00 00  21 00  00"
  params: []

- id: v_position_reset_set_execute
  label: "V POSITION Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 E0  D2 06  00 02  70 00  00"
  params: []

- id: h_position_set_increment
  label: "H POSITION Set Increment"
  kind: action
  command: "BE  EF 03 06  00 97  82 04  00 01  21 00  00"
  params: []

- id: h_position_set_decrement
  label: "H POSITION Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 46  83 05  00 01  21 00  00"
  params: []

- id: h_position_reset_set_execute
  label: "H POSITION Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 1C  D3 06  00 03  70 00  00"
  params: []

- id: h_phase_set_increment
  label: "H PHASE Set Increment"
  kind: action
  command: "BE  EF 03 06  00 2F  83 04  00 03  21 00  00"
  params: []

- id: h_phase_set_decrement
  label: "H PHASE Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 FE  82 05  00 03  21 00  00"
  params: []

- id: h_size_set_increment
  label: "H SIZE Set Increment"
  kind: action
  command: "BE  EF 03 06  00 D3  82 04  00 02  21 00  00"
  params: []

- id: h_size_set_decrement
  label: "H SIZE Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 02  83 05  00 02  21 00  00"
  params: []

- id: h_size_reset_set_execute
  label: "H SIZE Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 68  D2 06  00 04  70 00  00"
  params: []

- id: auto_adjust_execute_set_execute
  label: "AUTO ADJUST EXECUTE Set Execute"
  kind: action
  command: "BE  EF 03 06  00 91  D0 06  00 0A  20 00  00"
  params: []

- id: progressive_set_off
  label: "PROGRESSIVE Set OFF"
  kind: action
  command: "BE  EF 03 06  00 4A  72 01  00 07  22 00  00"
  params: []

- id: progressive_set_tv
  label: "PROGRESSIVE Set TV"
  kind: action
  command: "BE  EF 03 06  00 DA  73 01  00 07  22 01  00"
  params: []

- id: progressive_set_film
  label: "PROGRESSIVE Set FILM"
  kind: action
  command: "BE  EF 03 06  00 2A  73 01  00 07  22 02  00"
  params: []

- id: video_nr_set_low
  label: "VIDEO NR Set LOW"
  kind: action
  command: "BE  EF 03 06  00 26  72 01  00 06  22 01  00"
  params: []

- id: video_nr_set_mid
  label: "VIDEO NR Set MID"
  kind: action
  command: "BE  EF 03 06  00 D6  72 01  00 06  22 02  00"
  params: []

- id: video_nr_set_high
  label: "VIDEO NR Set HIGH"
  kind: action
  command: "BE  EF 03 06  00 46  73 01  00 06  22 03  00"
  params: []

- id: color_space_set_auto
  label: "COLOR SPACE Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 0E  72 01  00 04  22 00  00"
  params: []

- id: color_space_set_rgb
  label: "COLOR SPACE Set RGB"
  kind: action
  command: "BE  EF 03 06  00 9E  73 01  00 04  22 01  00"
  params: []

- id: color_space_set_smpte240
  label: "COLOR SPACE Set SMPTE240"
  kind: action
  command: "BE  EF 03 06  00 6E  73 01  00 04  22 02  00"
  params: []

- id: color_space_set_rec709
  label: "COLOR SPACE Set REC709"
  kind: action
  command: "BE  EF 03 06  00 FE  72 01  00 04  22 03  00"
  params: []

- id: color_space_set_rec601
  label: "COLOR SPACE Set REC601"
  kind: action
  command: "BE  EF 03 06  00 CE  70 01  00 04  22 04  00"
  params: []

- id: c_video_format_set_auto
  label: "C-VIDEO FORMAT Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 A2  70 01  00 11  22 0A  00"
  params: []

- id: c_video_format_set_ntsc
  label: "C-VIDEO FORMAT Set NTSC"
  kind: action
  command: "BE  EF 03 06  00 C2  74 01  00 11  22 04  00"
  params: []

- id: c_video_format_set_pal
  label: "C-VIDEO FORMAT Set PAL"
  kind: action
  command: "BE  EF 03 06  00 52  75 01  00 11  22 05  00"
  params: []

- id: c_video_format_set_secam
  label: "C-VIDEO FORMAT Set SECAM"
  kind: action
  command: "BE  EF 03 06  00 52  70 01  00 11  22 09  00"
  params: []

- id: c_video_format_set_ntsc4_43
  label: "C-VIDEO FORMAT Set NTSC4.43"
  kind: action
  command: "BE  EF 03 06  00 62  77 01  00 11  22 02  00"
  params: []

- id: c_video_format_set_m_pal
  label: "C-VIDEO FORMAT Set M-PAL"
  kind: action
  command: "BE  EF 03 06  00 C2  71 01  00 11  22 08  00"
  params: []

- id: c_video_format_set_n_pal
  label: "C-VIDEO FORMAT Set N-PAL"
  kind: action
  command: "BE  EF 03 06  00 32  74 01  00 11  22 07  00"
  params: []

- id: hdmi1_format_set_auto
  label: "HDMI1 FORMAT Set AUTO"
  kind: action
  command: "BE EF 03 06 00 BA 77 01 00 13 22 00 00"
  params: []

- id: hdmi1_format_set_video
  label: "HDMI1 FORMAT Set VIDEO"
  kind: action
  command: "BE EF 03 06 00 2A 76 01 00 13 22 01 00"
  params: []

- id: hdmi1_format_set_computer
  label: "HDMI1 FORMAT Set COMPUTER"
  kind: action
  command: "BE EF 03 06 00 DA 76 01 00 13 22 02 00"
  params: []

- id: hdmi2_format_set_auto
  label: "HDMI2 FORMAT Set AUTO"
  kind: action
  command: "BE EF 03 06 00 52 75 01 00 1D 22 00 00"
  params: []

- id: hdmi2_format_set_video
  label: "HDMI2 FORMAT Set VIDEO"
  kind: action
  command: "BE EF 03 06 00 C2 74 01 00 1D 22 01 00"
  params: []

- id: hdmi2_format_set_computer
  label: "HDMI2 FORMAT Set COMPUTER"
  kind: action
  command: "BE EF 03 06 00 32 74 01 00 1D 22 02 00"
  params: []

- id: hdmi1_range_set_auto
  label: "HDMI1 RANGE Set AUTO"
  kind: action
  command: "BE EF 03 06 00 86 D8 01 00 22 20 00 00"
  params: []

- id: hdmi1_range_set_normal
  label: "HDMI1 RANGE Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 16 D9 01 00 22 20 01 00"
  params: []

- id: hdmi1_range_set_enhanced
  label: "HDMI1 RANGE Set ENHANCED"
  kind: action
  command: "BE EF 03 06 00 E6 D9 01 00 22 20 02 00"
  params: []

- id: hdmi2_range_set_auto
  label: "HDMI2 RANGE Set AUTO"
  kind: action
  command: "BE EF 03 06 00 7A D9 01 00 23 20 00 00"
  params: []

- id: hdmi2_range_set_normal
  label: "HDMI2 RANGE Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 EA D8 01 00 23 20 01 00"
  params: []

- id: hdmi2_range_set_enhanced
  label: "HDMI2 RANGE Set ENHANCED"
  kind: action
  command: "BE EF 03 06 00 1A D8 01 00 23 20 02 00"
  params: []

- id: computer_in1_set_auto
  label: "COMPUTER IN1 Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 CE  D6 01  00 10  20 03  00"
  params: []

- id: computer_in1_set_sync_on_g_off
  label: "COMPUTER IN1 Set SYNC ON G OFF"
  kind: action
  command: "BE  EF 03 06  00 5E  D7 01  00 10  20 02  00"
  params: []

- id: computer_in2_set_auto
  label: "COMPUTER IN2 Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 32  D7 01  00 11  20 03  00"
  params: []

- id: computer_in2_set_sync_on_g_off
  label: "COMPUTER IN2 Set SYNC ON G OFF"
  kind: action
  command: "BE  EF 03 06  00 A2  D6 01  00 11  20 02  00"
  params: []

- id: computer_in2_set_monitor_out
  label: "COMPUTER IN2 Set MONITOR OUT"
  kind: action
  command: "BE EF 03 06 00 02 D0 01 00 11 20 08 00"
  params: []

- id: frame_lock_-_computer_in1_set_off
  label: "FRAME LOCK - COMPUTER IN1 Set OFF"
  kind: action
  command: "BE  EF 03 06  00 3B  C2 01  00 50  30 00  00"
  params: []

- id: frame_lock_-_computer_in1_set_on
  label: "FRAME LOCK - COMPUTER IN1 Set ON"
  kind: action
  command: "BE  EF 03 06  00 AB  C3 01  00 50  30 01  00"
  params: []

- id: frame_lock_-_computer_in2_set_off
  label: "FRAME LOCK - COMPUTER IN2 Set OFF"
  kind: action
  command: "BE  EF 03 06  00 0B  C3 01  00 54  30 00  00"
  params: []

- id: frame_lock_-_computer_in2_set_on
  label: "FRAME LOCK - COMPUTER IN2 Set ON"
  kind: action
  command: "BE  EF 03 06  00 9B  C2 01  00 54  30 01  00"
  params: []

- id: frame_lock_hdmi1_set_off
  label: "FRAME LOCK - HDMI1 Set OFF"
  kind: action
  command: "BE EF 03 06 00 7F C2 01 00 53 30 00 00"
  params: []

- id: frame_lock_hdmi1_set_on
  label: "FRAME LOCK - HDMI1 Set ON"
  kind: action
  command: "BE EF 03 06 00 EF C3 01 00 53 30 01 00"
  params: []

- id: frame_lock_hdmi2_set_off
  label: "FRAME LOCK - HDMI2 Set OFF"
  kind: action
  command: "BE EF 03 06 00 97 C0 01 00 5D 30 00 00"
  params: []

- id: frame_lock_hdmi2_set_on
  label: "FRAME LOCK - HDMI2 Set ON"
  kind: action
  command: "BE EF 03 06 00 07 C1 01 00 5D 30 01 00"
  params: []

- id: d_zoom_set_increment
  label: "D-ZOOM Set Increment"
  kind: action
  command: "BE  EF 03 06  00 B6  D0 04  00 0A  30 00  00"
  params: []

- id: d_zoom_set_decrement
  label: "D-ZOOM Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 67  D1 05  00 0A  30 00  00"
  params: []

- id: d_zoom_reset_set_execute
  label: "D-ZOOM Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 98  C9 06  00 70  70 00  00"
  params: []

- id: d_shift_v_set_increment
  label: "D-SHIFT V Set Increment"
  kind: action
  command: "BE  EF 03 06  00 4A  D1 04  00 0B  30 00  00"
  params: []

- id: d_shift_v_set_decrement
  label: "D-SHIFT V Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 9B  D0 05  00 0B  30 00  00"
  params: []

- id: d_shift_v_reset_execute
  label: "D-SHIFT V Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 A8  C8 06  00 74  70 00  00"
  params: []

- id: d_shift_h_increment
  label: "D-SHIFT H Increment"
  kind: action
  command: "BE  EF 03 06  00 3E  D0 04  00 0C  30 00  00"
  params: []

- id: d_shift_h_decrement
  label: "D-SHIFT H Decrement"
  kind: action
  command: "BE  EF 03 06  00 EF  D1 05  00 0C  30 00  00"
  params: []

- id: d_shift_h_reset_execute
  label: "D-SHIFT H Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 54  C9 06  00 75  70 00  00"
  params: []

- id: pict_posit_h_set_right
  label: "PICT.POSIT.H Set RIGHT"
  kind: action
  command: "BE  EF 03 06  00 46  D5 01  00 1E  20 01  00"
  params: []

- id: pict_posit_h_set_middle
  label: "PICT.POSIT.H Set MIDDLE"
  kind: action
  command: "BE  EF 03 06  00 D6  D4 01  00 1E  20 00  00"
  params: []

- id: pict_posit_h_set_left
  label: "PICT.POSIT.H Set LEFT"
  kind: action
  command: "BE  EF 03 06  00 B6  D5 01  00 1E  20 02  00"
  params: []

- id: keystone_v_set_increment
  label: "KEYSTONE V Set Increment"
  kind: action
  command: "BE  EF 03 06  00 DF  D3 04  00 07  20 00  00"
  params: []

- id: keystone_v_set_decrement
  label: "KEYSTONE V Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 0E  D2 05  00 07  20 00  00"
  params: []

- id: keystone_v_reset_set_execute
  label: "KEYSTONE V Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 08  D0 06  00 0C  70 00  00"
  params: []

- id: keystone_h_set_increment
  label: "KEYSTONE H Set Increment"
  kind: action
  command: "BE  EF 03 06  00 8F  D0 04  00 0B  20 00  00"
  params: []

- id: keystone_h_set_decrement
  label: "KEYSTONE H Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 5E  D1 05  00 0B  20 00  00"
  params: []

- id: keystone_h_reset_set_execute
  label: "KEYSTONE H Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 98  D8 06  00 20  70 00  00"
  params: []

- id: perfect_fit_set_disable
  label: "PERFECT FIT Set Disable"
  kind: action
  command: "BE  EF 03 06  00 FE  88 01  00 20  21 00  00"
  params: []

- id: perfect_fit_set_enable
  label: "PERFECT FIT Set Enable"
  kind: action
  command: "BE  EF 03 06  00 6E  89 01  00 20  21 01  00"
  params: []

- id: perfect_fit_left_top_h_set_increment
  label: "PERFECT FIT Left Top -H Set Increment"
  kind: action
  command: "BE  EF 03 06  00 57  89 04  00 21  21 00  00"
  params: []

- id: perfect_fit_left_top_h_set_decrement
  label: "PERFECT FIT Left Top -H Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 86  88 05  00 21  21 00  00"
  params: []

- id: perfect_fit_left_top_v_set_increment
  label: "PERFECT FIT Left Top -V Set Increment"
  kind: action
  command: "BE  EF 03 06  00 13  89 04  00 22  21 00  00"
  params: []

- id: perfect_fit_left_top_v_set_decrement
  label: "PERFECT FIT Left Top -V Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 C2  88 05  00 22  21 00  00"
  params: []

- id: perfect_fit_right_top_h_set_increment
  label: "PERFECT FIT Right Top -H Set Increment"
  kind: action
  command: "BE  EF 03 06  00 EF  88 04  00 23  21 00  00"
  params: []

- id: perfect_fit_right_top_h_set_decrement
  label: "PERFECT FIT Right Top -H Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 3E  89 05  00 23  21 00  00"
  params: []

- id: perfect_fit_right_top_v_set_increment
  label: "PERFECT FIT Right Top -V Set Increment"
  kind: action
  command: "BE  EF 03 06  00 9B  89 04  00 24  21 00  00"
  params: []

- id: perfect_fit_right_top_v_set_decrement
  label: "PERFECT FIT Right Top -V Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 4A  88 05  00 24  21 00  00"
  params: []

- id: perfect_fit_left_bottom_h_set_increment
  label: "PERFECT FIT Left Bottom -H Set Increment"
  kind: action
  command: "BE  EF 03 06  00 67  88 04  00 25  21 00  00"
  params: []

- id: perfect_fit_left_bottom_h_set_decrement
  label: "PERFECT FIT Left Bottom -H Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 B6  89 05  00 25  21 00  00"
  params: []

- id: perfect_fit_left_bottom_v_set_increment
  label: "PERFECT FIT Left Bottom -V Set Increment"
  kind: action
  command: "BE  EF 03 06  00 23  88 04  00 26  21 00  00"
  params: []

- id: perfect_fit_left_bottom_v_set_decrement
  label: "PERFECT FIT Left Bottom -V Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 F2  89 05  00 26  21 00  00"
  params: []

- id: perfect_fit_right_bottom_h_set_increment
  label: "PERFECT FIT Right Bottom -H Set Increment"
  kind: action
  command: "BE  EF 03 06  00 DF  89 04  00 27  21 00  00"
  params: []

- id: perfect_fit_right_bottom_h_set_decrement
  label: "PERFECT FIT Right Bottom -H Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 0E  88 05  00 27  21 00  00"
  params: []

- id: perfect_fit_right_bottom_v_set_increment
  label: "PERFECT FIT Right Bottom -V Set Increment"
  kind: action
  command: "BE  EF 03 06  00 CB  8A 04  00 28  21 00  00"
  params: []

- id: perfect_fit_right_bottom_v_set_decrement
  label: "PERFECT FIT Right Bottom -V Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 1A  8B 05  00 28  21 00  00"
  params: []

- id: perfect_fit_all_corners_reset_set_execute
  label: "PERFECT FIT All Corners Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 D5  8A 06  00 29  21 00  00"
  params: []

- id: perfect_fit_left_side_distortion_increment
  label: "PERFECT FIT Left Side Distortion Increment"
  kind: action
  command: "BE  EF 03 06  00 57  97 04  00 41  21 00  00"
  params: []

- id: perfect_fit_left_side_distortion_decrement
  label: "PERFECT FIT Left Side Distortion Decrement"
  kind: action
  command: "BE  EF 03 06  00 86  96 05  00 41  21 00  00"
  params: []

- id: perfect_fit_right_side_distortion_increment
  label: "PERFECT FIT Right Side Distortion Increment"
  kind: action
  command: "BE  EF 03 06  00 57  97 04  00 42  21 00  00"
  params: []

- id: perfect_fit_right_side_distortion_decrement
  label: "PERFECT FIT Right Side Distortion Decrement"
  kind: action
  command: "BE  EF 03 06  00 C2  96 05  00 42  21 00  00"
  params: []

- id: perfect_fit_distortion_position_v_increment
  label: "PERFECT FIT Distortion Position V Increment"
  kind: action
  command: "BE  EF 03 06  00 EF  96 04  00 43  21 00  00"
  params: []

- id: perfect_fit_distortion_position_v_decrement
  label: "PERFECT FIT Distortion Position V Decrement"
  kind: action
  command: "BE  EF 03 06  00 3E  97 05  00 43  21 00  00"
  params: []

- id: perfect_fit_top_side_distortion_increment
  label: "PERFECT FIT Top Side Distortion Increment"
  kind: action
  command: "BE  EF 03 06  00 9B  97 04  00 44  21 00  00"
  params: []

- id: perfect_fit_top_side_distortion_decrement
  label: "PERFECT FIT Top Side Distortion Decrement"
  kind: action
  command: "BE  EF 03 06  00 4A  96 05  00 44  21 00  00"
  params: []

- id: perfect_fit_bottom_side_distortion_increment
  label: "PERFECT FIT Bottom Side Distortion Increment"
  kind: action
  command: "BE  EF 03 06  00 67  96 04  00 45  21 00  00"
  params: []

- id: perfect_fit_bottom_side_distortion_decrement
  label: "PERFECT FIT Bottom Side Distortion Decrement"
  kind: action
  command: "BE  EF 03 06  00 B6  97 05  00 45  21 00  00"
  params: []

- id: perfect_fit_distortion_position_h_increment
  label: "PERFECT FIT Distortion Position H Increment"
  kind: action
  command: "BE  EF 03 06  00 23  96 04  00 46  21 00  00"
  params: []

- id: perfect_fit_distortion_position_h_decrement
  label: "PERFECT FIT Distortion Position H Decrement"
  kind: action
  command: "BE  EF 03 06  00 F2  97 05  00 46  21 00  00"
  params: []

- id: perfect_fit_all_sides_reset_execute
  label: "PERFECT FIT All Sides Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 3D  96 06  00 47  21 00  00"
  params: []

- id: perfect_fit_memory_save_1_execute
  label: "PERFECT FIT MemorySave-1 Execute"
  kind: action
  command: "BE  EF 03 06  00 29  95 06  00 48  21 00  00"
  params: []

- id: perfect_fit_memory_save_2_execute
  label: "PERFECT FIT MemorySave-2 Execute"
  kind: action
  command: "BE  EF 03 06  00 D5  94 06  00 49  21 00  00"
  params: []

- id: perfect_fit_memory_save_3_execute
  label: "PERFECT FIT MemorySave-3 Execute"
  kind: action
  command: "BE  EF 03 06  00 91  94 06  00 4A  21 00  00"
  params: []

- id: perfect_fit_memory_load_1_execute
  label: "PERFECT FIT MemoryLoad-1 Execute"
  kind: action
  command: "BE  EF 03 06  00 6D  95 06  00 4B  21 00  00"
  params: []

- id: perfect_fit_memory_load_2_execute
  label: "PERFECT FIT MemoryLoad-2 Execute"
  kind: action
  command: "BE  EF 03 06  00 19  94 06  00 4C  21 00  00"
  params: []

- id: perfect_fit_memory_load_3_execute
  label: "PERFECT FIT MemoryLoad-3 Execute"
  kind: action
  command: "BE  EF 03 06  00 E5  95 06  00 4D  21 00  00"
  params: []

- id: auto_eco_mode_set_off
  label: "AUTO ECO MODE Set OFF"
  kind: action
  command: "BE  EF 03 06  00 FB  27 01  00 10  33 00  00"
  params: []

- id: auto_eco_mode_set_on
  label: "AUTO ECO MODE Set ON"
  kind: action
  command: "BE  EF 03 06  00 6B  26 01  00 10  33 01  00"
  params: []

- id: eco_mode_set_normal
  label: "ECO MODE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 3B  23 01  00 00  33 00  00"
  params: []

- id: eco_mode_set_eco
  label: "ECO MODE Set ECO"
  kind: action
  command: "BE  EF 03 06  00 AB  22 01  00 00  33 01  00"
  params: []

- id: eco_mode_set_intelligent_eco
  label: "ECO MODE Set INTELLIGENT ECO"
  kind: action
  command: "BE  EF 03 06  00 FB  2E 01  00 00  33 10  00"
  params: []

- id: eco_mode_set_saver
  label: "ECO MODE Set SAVER"
  kind: action
  command: "BE  EF 03 06  00 FB  3A 01  00 00  33 20  00"
  params: []

- id: installation_set_front_desktop
  label: "INSTALLATION Set FRONT / DESKTOP"
  kind: action
  command: "BE  EF 03 06  00 C7  D2 01  00 01  30 00  00"
  params: []

- id: installation_set_rear_desktop
  label: "INSTALLATION Set REAR / DESKTOP"
  kind: action
  command: "BE  EF 03 06  00 57  D3 01  00 01  30 01  00"
  params: []

- id: installation_set_rear_ceiling
  label: "INSTALLATION Set REAR / CEILING"
  kind: action
  command: "BE  EF 03 06  00 A7  D3 01  00 01  30 02  00"
  params: []

- id: installation_set_front_ceiling
  label: "INSTALLATION Set FRONT / CEILING"
  kind: action
  command: "BE  EF 03 06  00 37  D2 01  00 01  30 03  00"
  params: []

- id: standby_mode_set_normal
  label: "STANDBY MODE Set NORMAL"
  kind: action
  command: "BE  EF 03 06  00 D6  D2 01  00 01  60 00  00"
  params: []

- id: standby_mode_set_saving
  label: "STANDBY MODE Set SAVING"
  kind: action
  command: "BE  EF 03 06  00 46  D3 01  00 01  60 01  00"
  params: []

- id: monitor_out_computer_in1_set_computer_in1
  label: "MONITOR OUT - COMPUTER IN1 Set COMPUTER IN1"
  kind: action
  command: "BE  EF 03 06  00 3E  F4 01  00 B0  20 00  00"
  params: []

- id: monitor_out_computer_in1_set_off
  label: "MONITOR OUT - COMPUTER IN1 Set OFF"
  kind: action
  command: "BE  EF 03 06  00 CE  B5 01  00 B0  20 FF  00"
  params: []

- id: monitor_out_video_set_computer_in1
  label: "MONITOR OUT - VIDEO Set COMPUTER IN1"
  kind: action
  command: "BE  EF 03 06  00 C2  F5 01  00 B1  20 00  00"
  params: []

- id: monitor_out_video_set_off
  label: "MONITOR OUT - VIDEO Set OFF"
  kind: action
  command: "BE  EF 03 06  00 32  B4 01  00 B1  20 FF  00"
  params: []

- id: monitor_out_hdmi1_set_computer_in1
  label: "MONITOR OUT - HDMI1 Set COMPUTER IN1"
  kind: action
  command: "BE EF 03 06 00 7A F4 01 00 B3 20 00 00"
  params: []

- id: monitor_out_hdmi1_set_off
  label: "MONITOR OUT - HDMI1 Set OFF"
  kind: action
  command: "BE EF 03 06 00 8A B5 01 00 B3 20 FF 00"
  params: []

- id: monitor_out_hdmi2_set_computer_in1
  label: "MONITOR OUT - HDMI2 Set COMPUTER IN1"
  kind: action
  command: "BE EF 03 06 00 92 F6 01 00 BD 20 00 00"
  params: []

- id: monitor_out_hdmi2_set_off
  label: "MONITOR OUT - HDMI2 Set OFF"
  kind: action
  command: "BE EF 03 06 00 62 B7 01 00 BD 20 FF 00"
  params: []

- id: monitor_out_lan_set_computer_in1
  label: "MONITOR OUT - LAN Set COMPUTER IN1"
  kind: action
  command: "BE EF 03 06 00 1A F6 01 00 BB 20 00 00"
  params: []

- id: monitor_out_lan_set_off
  label: "MONITOR OUT - LAN Set OFF"
  kind: action
  command: "BE EF 03 06 00 EA B7 01 00 BB 20 FF 00"
  params: []

- id: monitor_out_usb_type_a_set_computer_in1
  label: "MONITOR OUT- USB TYPE A Set COMPUTER IN1"
  kind: action
  command: "BE EF 03 06 00 B6 F4 01 00 B6 20 00 00"
  params: []

- id: monitor_out_usb_type_a_set_off
  label: "MONITOR OUT- USB TYPE A Set OFF"
  kind: action
  command: "BE EF 03 06 00 46 B5 01 00 B6 20 FF 00"
  params: []

- id: monitor_out_usb_type_b_set_computer_in1
  label: "MONITOR OUT - USB TYPE B Set COMPUTER IN1"
  kind: action
  command: "BE EF 03 06 00 6E F7 01 00 BC 20 00 00"
  params: []

- id: monitor_out_usb_type_b_set_off
  label: "MONITOR OUT - USB TYPE B Set OFF"
  kind: action
  command: "BE EF 03 06 00 9E B6 01 00 BC 20 FF 00"
  params: []

- id: monitor_out_standby_set_computer_in1
  label: "MONITOR OUT - STANDBY Set COMPUTER IN1"
  kind: action
  command: "BE  EF 03 06  00 2A  F7 01  00 BF  20 00  00"
  params: []

- id: monitor_out_standby_set_off
  label: "MONITOR OUT - STANDBY Set OFF"
  kind: action
  command: "BE  EF 03 06  00 DA  B6 01  00 BF  20 FF  00"
  params: []

- id: volume_computer_in1_set_increment
  label: "VOLUME - COMPUTER IN1 Set Increment"
  kind: action
  command: "BE  EF 03 06  00 AB  CC 04  00 60  20 00  00"
  params: []

- id: volume_computer_in1_set_decrement
  label: "VOLUME - COMPUTER IN1 Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 7A  CD 05  00 60  20 00  00"
  params: []

- id: volume_computer_in2_set_increment
  label: "VOLUME - COMPUTER IN2 Set Increment"
  kind: action
  command: "BE  EF 03 06  00 9B  CD 04  00 64  20 00  00"
  params: []

- id: volume_computer_in2_set_decrement
  label: "VOLUME - COMPUTER IN2 Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 4A  CC 05  00 64  20 00  00"
  params: []

- id: volume_video_set_increment
  label: "VOLUME - VIDEO Set Increment"
  kind: action
  command: "BE  EF 03 06  00 57  CD 04  00 61  20 00  00"
  params: []

- id: volume_video_set_decrement
  label: "VOLUME - VIDEO Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 86  CC 05  00 61  20 00  00"
  params: []

- id: volume_hdmi1_set_increment
  label: "VOLUME - HDMI1 Set Increment"
  kind: action
  command: "BE EF 03 06 00 EF CC 04 00 63 20 00 00"
  params: []

- id: volume_hdmi1_set_decrement
  label: "VOLUME - HDMI1 Set Decrement"
  kind: action
  command: "BE EF 03 06 00 3E CD 05 00 63 20 00 00"
  params: []

- id: volume_hdmi2_set_increment
  label: "VOLUME - HDMI2 Set Increment"
  kind: action
  command: "BE EF 03 06 00 07 CE 04 00 6D 20 00 00"
  params: []

- id: volume_hdmi2_set_decrement
  label: "VOLUME - HDMI2 Set Decrement"
  kind: action
  command: "BE EF 03 06 00 D6 CF 05 00 6D 20 00 00"
  params: []

- id: volume_lan_set_increment
  label: "VOLUME - LAN Set Increment"
  kind: action
  command: "BE EF 03 06 00 8F CE 04 00 6B 20 00 00"
  params: []

- id: volume_lan_set_decrement
  label: "VOLUME - LAN Set Decrement"
  kind: action
  command: "BE EF 03 06 00 5E CF 05 00 6B 20 00 00"
  params: []

- id: volume_usb_type_a_set_increment
  label: "VOLUME - USB TYPE A Set Increment"
  kind: action
  command: "BE EF 03 06 00 23 CC 04 00 66 20 00 00"
  params: []

- id: volume_usb_type_a_set_decrement
  label: "VOLUME - USB TYPE A Set Decrement"
  kind: action
  command: "BE EF 03 06 00 F2 CD 05 00 66 20 00 00"
  params: []

- id: volume_usb_type_b_set_increment
  label: "VOLUME - USB TYPE B Set Increment"
  kind: action
  command: "BE EF 03 06 00 FB CF 04 00 6C 20 00 00"
  params: []

- id: volume_usb_type_b_set_decrement
  label: "VOLUME - USB TYPE B Set Decrement"
  kind: action
  command: "BE EF 03 06 00 2A CE 05 00 6C 20 00 00"
  params: []

- id: volume_standby_set_increment
  label: "VOLUME - STANDBY Set Increment"
  kind: action
  command: "BE  EF 03 06  00 BF  CF 04  00 6F  20 00  00"
  params: []

- id: volume_standby_set_decrement
  label: "VOLUME - STANDBY Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 6E  CE 05  00 6F  20 00  00"
  params: []

- id: mute_set_off
  label: "MUTE Set OFF"
  kind: action
  command: "BE  EF 03 06  00 46  D3 01  00 02  20 00  00"
  params: []

- id: mute_set_on
  label: "MUTE Set ON"
  kind: action
  command: "BE  EF 03 06  00 D6  D2 01  00 02  20 01  00"
  params: []

- id: av_mute_set_off
  label: "AV MUTE Set OFF"
  kind: action
  command: "BE EF 03 06 00 FE  F0 01 00 A0 20 00 00"
  params: []

- id: av_mute_set_on
  label: "AV MUTE Set ON"
  kind: action
  command: "BE EF 03 06 00 6E  F1 01 00 A0 20 01 00"
  params: []

- id: speaker_set_on
  label: "SPEAKER Set ON"
  kind: action
  command: "BE  EF 03 06  00 FE  D4 01  00 1C  20 01  00"
  params: []

- id: speaker_set_off
  label: "SPEAKER Set OFF"
  kind: action
  command: "BE  EF 03 06  00 6E  D5 01  00 1C  20 00  00"
  params: []

- id: audio_source_computer_in1_set_audio_in1
  label: "AUDIO SOURCE - COMPUTER IN1 Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 6E  DC 01  00 30  20 01  00"
  params: []

- id: audio_source_computer_in1_set_audio_in2
  label: "AUDIO SOURCE - COMPUTER IN1 Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 9E  DC 01  00 30  20 02  00"
  params: []

- id: audio_source_computer_in1_set_off
  label: "AUDIO SOURCE - COMPUTER IN1 Set OFF"
  kind: action
  command: "BE  EF 03 06  00 FE  DD 01  00 30  20 00  00"
  params: []

- id: audio_source_computer_in2_set_audio_in1
  label: "AUDIO SOURCE - COMPUTER IN2 Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 5E  DD 01  00 34  20 01  00"
  params: []

- id: audio_source_computer_in2_set_audio_in2
  label: "AUDIO SOURCE - COMPUTER IN2 Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 AE  DD 01  00 34  20 02  00"
  params: []

- id: audio_source_computer_in2_set_off
  label: "AUDIO SOURCE - COMPUTER IN2 Set OFF"
  kind: action
  command: "BE  EF 03 06  00 CE  DC 01  00 34  20 00  00"
  params: []

- id: audio_source_lan_set_off
  label: "AUDIO SOURCE - LAN Set OFF"
  kind: action
  command: "BE EF 03 06 00 DA DF 01 00 3B 20 00 00"
  params: []

- id: audio_source_lan_set_audio_in1
  label: "AUDIO SOURCE - LAN Set AUDIO IN1"
  kind: action
  command: "BE EF 03 06 00 4A DE 01 00 3B 20 01 00"
  params: []

- id: audio_source_lan_set_audio_in2
  label: "AUDIO SOURCE - LAN Set AUDIO IN2"
  kind: action
  command: "BE EF 03 06 00 BA DE 01 00 3B 20 02 00"
  params: []

- id: audio_source_lan_set_audio_lan
  label: "AUDIO SOURCE - LAN Set AUDIO LAN"
  kind: action
  command: "BE EF 03 06 00 8A D3 01 00 3B 20 11 00"
  params: []

- id: audio_source_usb_type_a_set_off
  label: "AUDIO SOURCE - USB TYPE A Set OFF"
  kind: action
  command: "BE EF 03 06 00 76 DD 01 00 36 20 00 00"
  params: []

- id: audio_source_usb_type_a_set_audio_in1
  label: "AUDIO SOURCE - USB TYPE A Set AUDIO IN1"
  kind: action
  command: "BE EF 03 06 00 E6 DC 01 00 36 20 01 00"
  params: []

- id: audio_source_usb_type_a_set_audio_in2
  label: "AUDIO SOURCE - USB TYPE A Set AUDIO IN2"
  kind: action
  command: "BE EF 03 06 00 16 DC 01 00 36 20 02 00"
  params: []

- id: audio_source_usb_type_a_set_audio_usb_type_a
  label: "AUDIO SOURCE - USB TYPE A Set AUDIO USB TYPE A"
  kind: action
  command: "BE EF 03 06 00 B6 D0 01 00 36 20 10 00"
  params: []

- id: audio_source_usb_type_b_set_off
  label: "AUDIO SOURCE - USB TYPE B Set OFF"
  kind: action
  command: "BE EF 03 06 00 AE DE 01 00 3C 20 00 00"
  params: []

- id: audio_source_usb_type_b_set_audio_in1
  label: "AUDIO SOURCE - USB TYPE B Set AUDIO IN1"
  kind: action
  command: "BE EF 03 06 00 3E DF 01 00 3C 20 01 00"
  params: []

- id: audio_source_usb_type_b_set_audio_in2
  label: "AUDIO SOURCE - USB TYPE B Set AUDIO IN2"
  kind: action
  command: "BE EF 03 06 00 CE DF 01 00 3C 20 02 00"
  params: []

- id: audio_source_usb_type_b_set_audio_usb_type_b
  label: "AUDIO SOURCE - USB TYPE B Set AUDIO USB TYPE B"
  kind: action
  command: "BE EF 03 06 00 0E D2 01 00 3C 20 12 00"
  params: []

- id: audio_source_hdmi1_set_off
  label: "AUDIO SOURCE - HDMI1 Set OFF"
  kind: action
  command: "BE EF 03 06 00 BA DD 01 00 33 20 00 00"
  params: []

- id: audio_source_hdmi1_set_audio_in1
  label: "AUDIO SOURCE - HDMI1 Set AUDIO IN1"
  kind: action
  command: "BE EF 03 06 00 2A DC 01 00 33 20 01 00"
  params: []

- id: audio_source_hdmi1_set_audio_in2
  label: "AUDIO SOURCE - HDMI1 Set AUDIO IN2"
  kind: action
  command: "BE EF 03 06 00 DA DC 01 00 33 20 02 00"
  params: []

- id: audio_source_hdmi1_set_hdmi1
  label: "AUDIO SOURCE - HDMI1 Set HDMI1"
  kind: action
  command: "BE EF 03 06 00 7A C4 01 00 33 20 20 00"
  params: []

- id: audio_source_hdmi2_set_off
  label: "AUDIO SOURCE - HDMI2 Set OFF"
  kind: action
  command: "BE EF 03 06 00 52 DF 01 00 3D 20 00 00"
  params: []

- id: audio_source_hdmi2_set_audio_in1
  label: "AUDIO SOURCE - HDMI2 Set AUDIO IN1"
  kind: action
  command: "BE EF 03 06 00 C2 DE 01 00 3D 20 01 00"
  params: []

- id: audio_source_hdmi2_set_audio_in2
  label: "AUDIO SOURCE - HDMI2 Set AUDIO IN2"
  kind: action
  command: "BE EF 03 06 00 32 DE 01 00 3D 20 02 00"
  params: []

- id: audio_source_hdmi2_set_hdmi2
  label: "AUDIO SOURCE - HDMI2 Set HDMI2"
  kind: action
  command: "BE EF 03 06 00 02 C7 01 00 3D 20 21 00"
  params: []

- id: audio_source_video_set_audio_in1
  label: "AUDIO SOURCE - VIDEO Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 92  DD 01  00 31  20 01  00"
  params: []

- id: audio_source_video_set_audio_in2
  label: "AUDIO SOURCE - VIDEO Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 62  DD 01  00 31  20 02  00"
  params: []

- id: audio_source_video_set_off
  label: "AUDIO SOURCE - VIDEO Set OFF"
  kind: action
  command: "BE  EF 03 06  00 02  DC 01  00 31  20 00  00"
  params: []

- id: audio_source_standby_set_audio_in1
  label: "AUDIO SOURCE - STANDBY Set AUDIO IN1"
  kind: action
  command: "BE  EF 03 06  00 7A  DF 01  00 3F  20 01  00"
  params: []

- id: audio_source_standby_set_audio_in2
  label: "AUDIO SOURCE - STANDBY Set AUDIO IN2"
  kind: action
  command: "BE  EF 03 06  00 8A  DF 01  00 3F  20 02  00"
  params: []

- id: audio_source_standby_set_off
  label: "AUDIO SOURCE - STANDBY Set OFF"
  kind: action
  command: "BE  EF 03 06  00 EA  DE 01  00 3F  20 00  00"
  params: []

- id: mic_volume_increment
  label: "MIC VOLUME Increment"
  kind: action
  command: "BE EF 03 06 00 13 F1 04 00 A2 20 00 00"
  params: []

- id: mic_volume_decrement
  label: "MIC VOLUME Decrement"
  kind: action
  command: "BE EF 03 06 00 C2 F0 05 00 A2 20 00 00"
  params: []

- id: language_set_english
  label: "LANGUAGE Set ENGLISH"
  kind: action
  command: "BE  EF 03 06  00 F7  D3 01  00 05  30 00  00"
  params: []

- id: language_set_français
  label: "LANGUAGE Set FRANÇAIS"
  kind: action
  command: "BE  EF 03 06  00 67  D2 01  00 05  30 01  00"
  params: []

- id: language_set_deutsch
  label: "LANGUAGE Set DEUTSCH"
  kind: action
  command: "BE  EF 03 06  00 97  D2 01  00 05  30 02  00"
  params: []

- id: language_set_español
  label: "LANGUAGE Set ESPAÑOL"
  kind: action
  command: "BE  EF 03 06  00 07  D3 01  00 05  30 03  00"
  params: []

- id: language_set_italiano
  label: "LANGUAGE Set ITALIANO"
  kind: action
  command: "BE  EF 03 06  00 37  D1 01  00 05  30 04  00"
  params: []

- id: language_set_norsk
  label: "LANGUAGE Set NORSK"
  kind: action
  command: "BE  EF 03 06  00 A7  D0 01  00 05  30 05  00"
  params: []

- id: language_set_nederlands
  label: "LANGUAGE Set NEDERLANDS"
  kind: action
  command: "BE  EF 03 06  00 57  D0 01  00 05  30 06  00"
  params: []

- id: language_set_português
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE  EF 03 06  00 C7  D1 01  00 05  30 07  00"
  params: []

- id: language_set_português_2
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE  EF 03 06  00 37  D4 01  00 05  30 08  00"
  params: []

- id: language_set_português_3
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE  EF 03 06  00 A7  D5 01  00 05  30 09  00"
  params: []

- id: language_set_português_4
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE  EF 03 06  00 37  DE 01  00 05  30 10  00"
  params: []

- id: language_set_português_5
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE  EF 03 06  00 57  D5 01  00 05  30 0A  00"
  params: []

- id: language_set_svenska
  label: "LANGUAGE Set SVENSKA"
  kind: action
  command: "BE  EF 03 06  00 C7  D4 01  00 05  30 0B  00"
  params: []

- id: language_set_pуcckий
  label: "LANGUAGE Set PУCCKИЙ"
  kind: action
  command: "BE  EF 03 06  00 F7  D6 01  00 05  30 0C  00"
  params: []

- id: language_set_suomi
  label: "LANGUAGE Set SUOMI"
  kind: action
  command: "BE  EF 03 06  00 67  D7 01  00 05  30 0D  00"
  params: []

- id: language_set_polski
  label: "LANGUAGE Set POLSKI"
  kind: action
  command: "BE  EF 03 06  00 97  D7 01  00 05  30 0E  00"
  params: []

- id: language_set_türkçe
  label: "LANGUAGE Set TÜRKÇE"
  kind: action
  command: "BE  EF 03 06  00 07  D6 01  00 05  30 0F  00"
  params: []

- id: language_set_dansk
  label: "LANGUAGE Set DANSK"
  kind: action
  command: "BE  EF 03 06  00 A7  DF 01  00 05  30 11  00"
  params: []

- id: language_set_česky
  label: "LANGUAGE Set ČESKY"
  kind: action
  command: "BE  EF 03 06  00 57  DF 01  00 05  30 12  00"
  params: []

- id: language_set_magyar
  label: "LANGUAGE Set MAGYAR"
  kind: action
  command: "BE  EF 03 06  00 C7  DE 01  00 05  30 13  00"
  params: []

- id: language_set_română
  label: "LANGUAGE Set ROMÂNĂ"
  kind: action
  command: "BE  EF 03 06  00 F7  DC 01  00 05  30 14  00"
  params: []

- id: language_set_slovenski
  label: "LANGUAGE Set SLOVENSKI"
  kind: action
  command: "BE  EF 03 06  00 67  DD 01  00 05  30 15  00"
  params: []

- id: language_set_hrvatski
  label: "LANGUAGE Set HRVATSKI"
  kind: action
  command: "BE  EF 03 06  00 97  DD 01  00 05  30 16  00"
  params: []

- id: language_set_ελληνικα
  label: "LANGUAGE Set ΕΛΛΗΝΙΚΑ"
  kind: action
  command: "BE  EF 03 06  00 07  DC 01  00 05  30 17  00"
  params: []

- id: language_set_lietuvių
  label: "LANGUAGE Set LIETUVIŲ"
  kind: action
  command: "BE  EF 03 06  00 F7  D9 01  00 05  30 18  00"
  params: []

- id: language_set_eesti
  label: "LANGUAGE Set EESTI"
  kind: action
  command: "BE  EF 03 06  00 67  D8 01  00 05  30 19  00"
  params: []

- id: language_set_latviešu
  label: "LANGUAGE Set LATVIEŠU"
  kind: action
  command: "BE  EF 03 06  00 97  D8 01  00 05  30 1A  00"
  params: []

- id: language_set_ไทย
  label: "LANGUAGE Set ไทย"
  kind: action
  command: "BE  EF 03 06  00 07  D9 01  00 05  30 1B  00"
  params: []

- id: language_set_ةيبرعلا_ةغللا
  label: "LANGUAGE Set ةيبرعلا ةغللا"
  kind: action
  command: "BE  EF 03 06  00 37  DB 01  00 05  30 1C  00"
  params: []

- id: language_set_ىسراف
  label: "LANGUAGE Set ىسراف"
  kind: action
  command: "BE  EF 03 06  00 A7  DA 01  00 05  30 1D  00"
  params: []

- id: language_set_português_bra
  label: "LANGUAGE Set PORTUGUÊS BRA"
  kind: action
  command: "BE  EF 03 06  00 57  DA 01  00 05  30 1E  00"
  params: []

- id: language_set_bahasa_ind
  label: "LANGUAGE Set BAHASA IND"
  kind: action
  command: "BE  EF 03 06  00 C7  DB 01  00 05  30 1F  00"
  params: []

- id: language_set_tieng_viet
  label: "LANGUAGE Set TIENG VIET"
  kind: action
  command: "BE  EF 03 06  00 37  CA 01  00 05  30 20  00"
  params: []

- id: menu_position_h_increment
  label: "MENU POSITION H Increment"
  kind: action
  command: "BE  EF 03 06  00 62  D7 04  00 15  30 00  00"
  params: []

- id: menu_position_h_decrement
  label: "MENU POSITION H Decrement"
  kind: action
  command: "BE  EF 03 06  00 B3  D6 05  00 15  30 00  00"
  params: []

- id: menu_position_h_reset_execute
  label: "MENU POSITION H Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 DC  C6 06  00 43  70 00  00"
  params: []

- id: menu_position_v_increment
  label: "MENU POSITION V Increment"
  kind: action
  command: "BE  EF 03 06  00 62  D7 04  00 16  30 00  00"
  params: []

- id: menu_position_v_decrement
  label: "MENU POSITION V Decrement"
  kind: action
  command: "BE  EF 03 06  00 F7  D6 05  00 16  30 00  00"
  params: []

- id: menu_position_v_reset_execute
  label: "MENU POSITION V Reset Execute"
  kind: action
  command: "BE  EF 03 06  00 A8  C7 06  00 44  70 00  00"
  params: []

- id: blank_set_my_screen
  label: "BLANK Set MyScreen"
  kind: action
  command: "BE  EF 03 06  00 FB  CA 01  00 00  30 20  00"
  params: []

- id: blank_set_original
  label: "BLANK Set ORIGINAL"
  kind: action
  command: "BE  EF 03 06  00 FB  E2 01  00 00  30 40  00"
  params: []

- id: blank_set_blue
  label: "BLANK Set BLUE"
  kind: action
  command: "BE  EF 03 06  00 CB  D3 01  00 00  30 03  00"
  params: []

- id: blank_set_white
  label: "BLANK Set WHITE"
  kind: action
  command: "BE  EF 03 06  00 6B  D0 01  00 00  30 05  00"
  params: []

- id: blank_set_black
  label: "BLANK Set BLACK"
  kind: action
  command: "BE  EF 03 06  00 9B  D0 01  00 00  30 06  00"
  params: []

- id: blank_on_off_set_off
  label: "BLANK On/Off Set OFF"
  kind: action
  command: "BE  EF 03 06  00 FB  D8 01  00 20  30 00  00"
  params: []

- id: blank_on_off_set_on
  label: "BLANK On/Off Set ON"
  kind: action
  command: "BE  EF 03 06  00 6B  D9 01  00 20  30 01  00"
  params: []

- id: auto_blank_set_blue
  label: "AUTO BLANK Set BLUE"
  kind: action
  command: "BE EF 03 06 00 67 D1 01 00 0D 30 03 00"
  params: []

- id: auto_blank_set_white
  label: "AUTO BLANK Set WHITE"
  kind: action
  command: "BE EF 03 06 00 C7 D2 01 00 0D 30 05 00"
  params: []

- id: auto_blank_set_black
  label: "AUTO BLANK Set BLACK"
  kind: action
  command: "BE EF 03 06 00 37 D2 01 00 0D 30 06 00"
  params: []

- id: start_up_set_my_screen
  label: "START UP Set MyScreen"
  kind: action
  command: "BE  EF 03 06  00 CB  CB 01  00 04  30 20  00"
  params: []

- id: start_up_set_original
  label: "START UP Set ORIGINAL"
  kind: action
  command: "BE  EF 03 06  00 0B  D2 01  00 04  30 00  00"
  params: []

- id: start_up_set_off
  label: "START UP Set OFF"
  kind: action
  command: "BE  EF 03 06  00 0B  D3 01  00 04  30 01  00"
  params: []

- id: my_screen_lock_set_off
  label: "MyScreen Lock Set OFF"
  kind: action
  command: "BE  EF 03 06  00 3B  EF 01  00 C0  30 00  00"
  params: []

- id: my_screen_lock_set_on
  label: "MyScreen Lock Set ON"
  kind: action
  command: "BE  EF 03 06  00 AB  EE 01  00 C0  30 01  00"
  params: []

- id: message_set_off
  label: "MESSAGE Set OFF"
  kind: action
  command: "BE  EF 03 06  00 8F  D6 01  00 17  30 00  00"
  params: []

- id: message_set_on
  label: "MESSAGE Set ON"
  kind: action
  command: "BE  EF 03 06  00 9F  D7 01  00 17  30 01  00"
  params: []

- id: template_set_test_pattern
  label: "TEMPLATE Set TEST PATTERN"
  kind: action
  command: "BE  EF 03 06  00 43  D9 01  00 22  30 00  00"
  params: []

- id: template_set_dot_line1
  label: "TEMPLATE Set DOT-LINE1"
  kind: action
  command: "BE  EF 03 06  00 D3  D8 01  00 22  30 01  00"
  params: []

- id: template_set_dot_line2
  label: "TEMPLATE Set DOT-LINE2"
  kind: action
  command: "BE  EF 03 06  00 23  D8 01  00 22  30 02  00"
  params: []

- id: template_set_dot_line3
  label: "TEMPLATE Set DOT-LINE3"
  kind: action
  command: "BE  EF 03 06  00 B3  D9 01  00 22  30 03  00"
  params: []

- id: template_set_dot_line4
  label: "TEMPLATE Set DOT-LINE4"
  kind: action
  command: "BE  EF 03 06  00 83  DB 01  00 22  30 04  00"
  params: []

- id: template_set_circle_1
  label: "TEMPLATE Set CIRCLE 1"
  kind: action
  command: "BE EF 03 06 00 13 DA 01 00 22 30 05 00"
  params: []

- id: template_set_circle_2
  label: "TEMPLATE Set CIRCLE 2"
  kind: action
  command: "BE EF 03 06 00 E3 DA 01 00 22 30 06 00"
  params: []

- id: template_set_map_1
  label: "TEMPLATE Set MAP 1"
  kind: action
  command: "BE EF 03 06 00 83 D4 01 00 22 30 10 00"
  params: []

- id: template_set_map_2
  label: "TEMPLATE Set MAP 2"
  kind: action
  command: "BE EF 03 06 00 D3 D5 01 00 22 30 11 00"
  params: []

- id: template_on_off_set_off
  label: "TEMPLATE On/ Off Set OFF"
  kind: action
  command: "BE  EF 03 06  00 BF  D8 01  00 23  30 00  00"
  params: []

- id: template_on_off_set_on
  label: "TEMPLATE On/ Off Set ON"
  kind: action
  command: "BE  EF 03 06  00 2F  D9 01  00 23  30 01  00"
  params: []

- id: c_c_display_set_off
  label: "C. C. - DISPLAY Set OFF"
  kind: action
  command: "BE  EF 03 06  00 FA  62 01  00 00  37 00  00"
  params: []

- id: c_c_display_set_on
  label: "C. C. - DISPLAY Set ON"
  kind: action
  command: "BE  EF 03 06  00 6A  63 01  00 00  37 01  00"
  params: []

- id: c_c_display_set_auto
  label: "C. C. - DISPLAY Set AUTO"
  kind: action
  command: "BE  EF 03 06  00 9A  63 01  00 00  37 02  00"
  params: []

- id: c_c_mode_set_captions
  label: "C. C. - MODE Set CAPTIONS"
  kind: action
  command: "BE  EF 03 06  00 06  63 01  00 01  37 00  00"
  params: []

- id: c_c_mode_set_text
  label: "C. C. - MODE Set TEXT"
  kind: action
  command: "BE  EF 03 06  00 96  62 01  00 01  37 01  00"
  params: []

- id: c_c_channel_set_1
  label: "C. C. - CHANNEL Set 1"
  kind: action
  command: "BE  EF 03 06  00 D2  62 01  00 02  37 01  00"
  params: []

- id: c_c_channel_set_2
  label: "C. C. - CHANNEL Set 2"
  kind: action
  command: "BE  EF 03 06  00 22  62 01  00 02  37 02  00"
  params: []

- id: c_c_channel_set_3
  label: "C. C. - CHANNEL Set 3"
  kind: action
  command: "BE  EF 03 06  00 63  B2 01  00 02  37 03  00"
  params: []

- id: c_c_channel_set_4
  label: "C. C. - CHANNEL Set 4"
  kind: action
  command: "BE  EF 03 06  00 82  61 01  00 02  37 04  00"
  params: []

- id: auto_search_set_off
  label: "AUTO SEARCH Set OFF"
  kind: action
  command: "BE  EF 03 06  00 B6  D6 01  00 16  20 00  00"
  params: []

- id: auto_search_set_on
  label: "AUTO SEARCH Set ON"
  kind: action
  command: "BE  EF 03 06  00 26  D7 01  00 16  20 01  00"
  params: []

- id: direct_power_on_set_off
  label: "DIRECT POWER ON Set OFF"
  kind: action
  command: "BE  EF 03 06  00 3B  89 01  00 20  31 00  00"
  params: []

- id: direct_power_on_set_on
  label: "DIRECT POWER ON Set ON"
  kind: action
  command: "BE  EF 03 06  00 AB  88 01  00 20  31 01  00"
  params: []

- id: auto_power_off_set_increment
  label: "AUTO POWER OFF Set Increment"
  kind: action
  command: "BE  EF 03 06  00 6E  86 04  00 10  31 00  00"
  params: []

- id: auto_power_off_set_decrement
  label: "AUTO POWER OFF Set Decrement"
  kind: action
  command: "BE  EF 03 06  00 BF  87 05  00 10  31 00  00"
  params: []

- id: lamp_time_reset_set_execute
  label: "LAMP TIME Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 58  DC 06  00 30  70 00  00"
  params: []

- id: filter_time_reset_set_execute
  label: "FILTER TIME Reset Set Execute"
  kind: action
  command: "BE  EF 03 06  00 98  C6 06  00 40  70 00  00"
  params: []

- id: my_button_1_set_computer_in1
  label: "MY BUTTON-1 Set COMPUTER IN1"
  kind: action
  command: "BE  EF 03 06  00 3A  33 01  00 00  36 00  00"
  params: []

- id: my_button_1_set_computer_in2
  label: "MY BUTTON-1 Set COMPUTER IN2"
  kind: action
  command: "BE  EF 03 06  00 FA  31 01  00 00  36 04  00"
  params: []

- id: my_button_1_set_lan
  label: "MY BUTTON-1 Set LAN"
  kind: action
  command: "BE EF 03 06 00 0A 34 01 00 00 36 0B 00"
  params: []

- id: my_button_1_set_usb_type_a
  label: "MY BUTTON-1 Set USB TYPE A"
  kind: action
  command: "BE EF 03 06 00 9A 30 01 00 00 36 06 00"
  params: []

- id: my_button_1_set_usb_type_b
  label: "MY BUTTON-1 Set USB TYPE B"
  kind: action
  command: "BE EF 03 06 00 3A 36 01 00 00 36 0C 00"
  params: []

- id: my_button_1_set_hdmi1
  label: "MY BUTTON-1 Set HDMI1"
  kind: action
  command: "BE EF 03 06 00 CA 33 01 00 00 36 03 00"
  params: []

- id: my_button_1_set_hdmi2
  label: "MY BUTTON-1 Set HDMI2"
  kind: action
  command: "BE EF 03 06 00 AA 37 01 00 00 36 0D 00"
  params: []

- id: my_button_1_set_video
  label: "MY BUTTON-1 Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 AA  32 01  00 00  36 01  00"
  params: []

- id: my_button_1_set_slideshow
  label: "MY BUTTON-1 Set SLIDESHOW"
  kind: action
  command: "BE EF 03 06 00 9A 2B 01 00 00 36 22 00"
  params: []

- id: my_button_1_set_my_image
  label: "MY BUTTON-1 Set MY IMAGE"
  kind: action
  command: "BE  EF 03 06  00 5A 3D 01 00 00 36 16 00"
  params: []

- id: my_button_1_set_messenger
  label: "MY BUTTON-1 Set MESSENGER"
  kind: action
  command: "BE  EF 03 06  00 AA 29 01 00 00 36 25 00"
  params: []

- id: my_button_1_set_information
  label: "MY BUTTON-1 Set INFORMATION"
  kind: action
  command: "BE  EF 03 06  00 FA  3E 01  00 00  36 10  00"
  params: []

- id: my_button_1_set_my_memory
  label: "MY BUTTON-1 Set MY MEMORY"
  kind: action
  command: "BE  EF 03 06  00 9A  3F 01  00 00  36 12  00"
  params: []

- id: my_button_1_set_active_iris
  label: "MY BUTTON-1 Set ACTIVE IRIS"
  kind: action
  command: "BE  EF 03 06  00 AA  3D 01  00 00  36 15  00"
  params: []

- id: my_button_1_set_picture_mode
  label: "MY BUTTON-1 Set PICTURE MODE"
  kind: action
  command: "BE  EF 03 06  00 0A  3E 01  00 00  36 13  00"
  params: []

- id: my_button_1_set_filter_reset
  label: "MY BUTTON-1 Set FILTER RESET"
  kind: action
  command: "BE  EF 03 06  00 3A  3C 01  00 00  36 14  00"
  params: []

- id: my_button_1_set_resolution
  label: "MY BUTTON-1 Set RESOLUTION"
  kind: action
  command: "BE  EF 03 06  00 9A  3A 01  00 00  36 1E  00"
  params: []

- id: my_button_1_set_mic_volume
  label: "MY BUTTON-1 Set MIC VOLUME"
  kind: action
  command: "BE  EF 03 06  00 9A  24 01  00 00  36 36  00"
  params: []

- id: my_button_1_set_eco_mode
  label: "MY BUTTON-1 Set ECO MODE"
  kind: action
  command: "BE  EF 03 06  00 0A  25 01  00 00  36 37  00"
  params: []

- id: my_button_1_set_saver_mode
  label: "MY BUTTON-1 Set SAVER MODE"
  kind: action
  command: "BE  EF 03 06  00 6A  21 01  00 00  36 39  00"
  params: []

- id: my_button_2_set_computer_in1
  label: "MY BUTTON-2 Set COMPUTER IN1"
  kind: action
  command: "BE  EF 03 06  00 C6  32 01  00 01  36 00  00"
  params: []

- id: my_button_2_set_computer_in2
  label: "MY BUTTON-2 Set COMPUTER IN2"
  kind: action
  command: "BE  EF 03 06  00 06  30 01  00 01  36 04  00"
  params: []

- id: my_button_2_set_lan
  label: "MY BUTTON-2 Set LAN"
  kind: action
  command: "BE EF 03 06 00 F6 35 01 00 01 36 0B 00"
  params: []

- id: my_button_2_set_usb_type_a
  label: "MY BUTTON-2 Set USB TYPE A"
  kind: action
  command: "BE EF 03 06 00 66 31 01 00 01 36 06 00"
  params: []

- id: my_button_2_set_usb_type_b
  label: "MY BUTTON-2 Set USB TYPE B"
  kind: action
  command: "BE EF 03 06 00 C6 37 01 00 01 36 0C 00"
  params: []

- id: my_button_2_set_hdmi1
  label: "MY BUTTON-2 Set HDMI1"
  kind: action
  command: "BE EF 03 06 00 36 32 01 00 01 36 03 00"
  params: []

- id: my_button_2_set_hdmi2
  label: "MY BUTTON-2 Set HDMI2"
  kind: action
  command: "BE EF 03 06 00 56 36 01 00 01 36 0D 00"
  params: []

- id: my_button_2_set_video
  label: "MY BUTTON-2 Set VIDEO"
  kind: action
  command: "BE  EF 03 06  00 56  33 01  00 01  36 01  00"
  params: []

- id: my_button_2_set_slideshow
  label: "MY BUTTON-2 Set SLIDESHOW"
  kind: action
  command: "BE EF 03 06 00 66 2A 01 00 01 36 22 00"
  params: []

- id: my_button_2_set_my_image
  label: "MY BUTTON-2 Set MY IMAGE"
  kind: action
  command: "BE  EF 03 06  00 A6 3C 01 00 01 36 16 00"
  params: []

- id: my_button_2_set_messenger
  label: "MY BUTTON-2 Set MESSENGER"
  kind: action
  command: "BE  EF 03 06  00 56 28 01 00 01 36 25 00"
  params: []

- id: my_button_2_set_information
  label: "MY BUTTON-2 Set INFORMATION"
  kind: action
  command: "BE  EF 03 06  00 06  3F 01  00 01  36 10  00"
  params: []

- id: my_button_2_set_my_memory
  label: "MY BUTTON-2 Set MY MEMORY"
  kind: action
  command: "BE  EF 03 06  00 66  3E 01  00 01  36 12  00"
  params: []

- id: my_button_2_set_active_iris
  label: "MY BUTTON-2 Set ACTIVE IRIS"
  kind: action
  command: "BE  EF 03 06  00 56  3C 01  00 01  36 15  00"
  params: []

- id: my_button_2_set_picture_mode
  label: "MY BUTTON-2 Set PICTURE MODE"
  kind: action
  command: "BE EF 03 06 00 F6  3F 01 00 01 36 13 00"
  params: []

- id: my_button_2_set_filter_reset
  label: "MY BUTTON-2 Set FILTER RESET"
  kind: action
  command: "BE EF 03 06 00 C6 3D 01 00 01 36 14 00"
  params: []

- id: my_button_2_set_resolution
  label: "MY BUTTON-2 Set RESOLUTION"
  kind: action
  command: "BE EF 03 06 00 66 3B 01 00 01 36 1E 00"
  params: []

- id: my_button_2_set_mic_volume
  label: "MY BUTTON-2 Set MIC VOLUME"
  kind: action
  command: "BE EF 03 06 00 66 25 01 00 01 36 36 00"
  params: []

- id: my_button_2_set_eco_mode
  label: "MY BUTTON-2 Set ECO MODE"
  kind: action
  command: "BE EF 03 06 00 F6 24 01 00 01 36 37 00"
  params: []

- id: my_button_2_set_saver_mode
  label: "MY BUTTON-2 Set SAVER MODE"
  kind: action
  command: "BE EF 03 06 00 96 20 01 00 01 36 39 00"
  params: []

- id: magnify_position_h_set_increment
  label: "Magnify Position H Set Increment"
  kind: action
  command: "BE EF 03 06 00 AE D7 04 00 10 30 00 00"
  params: []

- id: magnify_position_h_set_decrement
  label: "Magnify Position H Set Decrement"
  kind: action
  command: "BE EF 03 06 00 7F D6 05 00 10 30 00 00"
  params: []

- id: magnify_position_v_set_increment
  label: "Magnify Position V Set Increment"
  kind: action
  command: "BE EF 03 06 00 52 D6 04 00 11 30 00 00"
  params: []

- id: magnify_position_v_set_decrement
  label: "Magnify Position V Set Decrement"
  kind: action
  command: "BE EF 03 06 00 83 D7 05 00 11 30 00 00"
  params: []

- id: remote_front_set_off
  label: "REMOTE FRONT Set OFF"
  kind: action
  command: "BE EF 03 06 00 FF 32 01 00 00 26 00 00"
  params: []

- id: remote_front_set_on
  label: "REMOTE FRONT Set ON"
  kind: action
  command: "BE EF 03 06 00 6F 33 01 00 00 26 01 00"
  params: []

- id: remote_top_set_off
  label: "REMOTE TOP Set OFF"
  kind: action
  command: "BE EF 03 06 00 47 33 01 00 02 26 00 00"
  params: []

- id: remote_top_set_on
  label: "REMOTE TOP Set ON"
  kind: action
  command: "BE EF 03 06 00 D7 32 01 00 02 26 01 00"
  params: []

- id: remote_freq_normal_set_off
  label: "REMOTE FREQ. NORMAL Set OFF"
  kind: action
  command: "BE  EF 03 06  00 FF  3D 01  00 30  26 00  00"
  params: []

- id: remote_freq_normal_set_on
  label: "REMOTE FREQ. NORMAL Set ON"
  kind: action
  command: "BE  EF 03 06  00 6F  3C 01  00 30  26 01  00"
  params: []

- id: remote_freq_high_set_off
  label: "REMOTE FREQ. HIGH Set OFF"
  kind: action
  command: "BE  EF 03 06  00 03  3C 01  00 31  26 00  00"
  params: []

- id: remote_freq_high_set_on
  label: "REMOTE FREQ. HIGH Set ON"
  kind: action
  command: "BE  EF 03 06  00 93  3D 01  00 31  26 01  00"
  params: []

- id: my_image_set_off
  label: "MY IMAGE Set OFF"
  kind: action
  command: "BE EF 03 06 00 3A C3 01 00 00 35 00 00"
  params: []

- id: my_image_set_image_1
  label: "MY IMAGE Set IMAGE-1"
  kind: action
  command: "BE EF 03 06 00 AA C2 01 00 00 35 01 00"
  params: []

- id: my_image_set_image_2
  label: "MY IMAGE Set IMAGE-2"
  kind: action
  command: "BE EF 03 06 00 5A C2 01 00 00 35 02 00"
  params: []

- id: my_image_set_image_3
  label: "MY IMAGE Set IMAGE-3"
  kind: action
  command: "BE EF 03 06 00 CA C3 01 00 00 35 03 00"
  params: []

- id: my_image_set_image_4
  label: "MY IMAGE Set IMAGE-4"
  kind: action
  command: "BE EF 03 06 00 FA C1 01 00 00 35 04 00"
  params: []

- id: my_image_image_1_delete_set_execute
  label: "MY IMAGE IMAGE-1 Delete Set Execute"
  kind: action
  command: "BE EF 03 06 00 71 C3 06 00 01 35 00 00"
  params: []

- id: my_image_image_2_delete_set_execute
  label: "MY IMAGE IMAGE-2 Delete Set Execute"
  kind: action
  command: "BE EF 03 06 00 35 C3 06 00 02 35 00 00"
  params: []

- id: my_image_image_3_delete_set_execute
  label: "MY IMAGE IMAGE-3 Delete Set Execute"
  kind: action
  command: "BE EF 03 06 00 C9 C2 06 00 03 35 00 00"
  params: []

- id: my_image_image_4_delete_set_execute
  label: "MY IMAGE IMAGE-4 Delete Set Execute"
  kind: action
  command: "BE EF 03 06 00 BD C3 06 00 04 35 00 00"
  params: []

- id: volume_all_set_increment
  label: "VOLUME - ALL Set Increment"
  kind: action
  command: "BE EF 03 06 00 AB C3 04 00 50 20 00 00"
  params: []

- id: volume_all_set_decrement
  label: "VOLUME - ALL Set Decrement"
  kind: action
  command: "BE EF 03 06 00 7A C2 05 00 50 20 00 00"
  params: []

- id: lan_sound_enable_set_disable
  label: "LAN SOUND ENABLE Set Disable"
  kind: action
  command: "BE EF 03 06 00 BA F0 01 00 A3 20 00 00"
  params: []

- id: lan_sound_enable_set_enable
  label: "LAN SOUND ENABLE Set Enable"
  kind: action
  command: "BE EF 03 06 00 2A F1 01 00 A3 20 01 00"
  params: []

- id: usb_type_a_sound_enable_set_disable
  label: "USB TYPE A SOUND ENABLE Set Disable"
  kind: action
  command: "BE EF 03 06 00 CE F1 01 00 A4 20 00 00"
  params: []

- id: usb_type_a_sound_enable_set_enable
  label: "USB TYPE A SOUND ENABLE Set Enable"
  kind: action
  command: "BE EF 03 06 00 5E F0 01 00 A4 20 01 00"
  params: []

- id: usb_type_b_sound_enable_set_disable
  label: "USB TYPE B SOUND ENABLE Set Disable"
  kind: action
  command: "BE EF 03 06 00 32 F0 01 00 A5 20 00 00"
  params: []

- id: usb_type_b_sound_enable_set_enable
  label: "USB TYPE B SOUND ENABLE Set Enable"
  kind: action
  command: "BE EF 03 06 00 A2 F1 01 00 A5 20 01 00"
  params: []

- id: iwb_manual_calibrate_set_execute
  label: "IWB MANUAL CALIBRATE Set Execute"
  kind: action
  command: "BE EF 03 06 00 89 93 06 00 50 21 00 00"
  params: []

- id: iwb_auto_calibrate_set_execute
  label: "IWB AUTO CALIBRATE Set Execute"
  kind: action
  command: "BE EF 03 06 00 75 92 06 00 51 21 00 00"
  params: []

- id: iwb_mode_computer_in1_set_off
  label: "IWB MODE COMPUTER IN1 Set OFF"
  kind: action
  command: "BE EF 03 06 00 3E AE 01 00 90 21 00 00"
  params: []

- id: iwb_mode_computer_in1_set_stand_alone
  label: "IWB MODE COMPUTER IN1 Set STAND ALONE"
  kind: action
  command: "BE EF 03 06 00 AE AF 01 00 90 21 01 00"
  params: []

- id: iwb_mode_computer_in1_set_with_pc
  label: "IWB MODE COMPUTER IN1 Set WITH PC"
  kind: action
  command: "BE EF 03 06 00 5E AF 01 00 90 21 02 00"
  params: []

- id: iwb_mode_computer_in2_set_off
  label: "IWB MODE COMPUTER IN2 Set OFF"
  kind: action
  command: "BE EF 03 06 00 0E AF 01 00 94 21 00 00"
  params: []

- id: iwb_mode_computer_in2_set_stand_alone
  label: "IWB MODE COMPUTER IN2 Set STAND ALONE"
  kind: action
  command: "BE EF 03 06 00 94 21 01 00"
  params: []

- id: iwb_mode_computer_in2_set_with_pc
  label: "IWB MODE COMPUTER IN2 Set WITH PC"
  kind: action
  command: "BE EF 03 06 00 6E AE 01 00 94 21 02 00"
  params: []

- id: iwb_mode_usb_type_a_set_off
  label: "IWB MODE USB TYPE A Set OFF"
  kind: action
  command: "BE EF 03 06 00 B6 AE 01 00 96 21 00 00"
  params: []

- id: iwb_mode_usb_type_a_set_stand_alone
  label: "IWB MODE USB TYPE A Set STAND ALONE"
  kind: action
  command: "BE EF 03 06 00 26 AF 01 00 96 21 01 00"
  params: []

- id: iwb_mode_usb_type_a_set_with_pc
  label: "IWB MODE USB TYPE A Set WITH PC"
  kind: action
  command: "BE EF 03 06 00 D6 AF 01 00 96 21 02 00"
  params: []

- id: iwb_mode_hdmi1_set_off
  label: "IWB MODE HDMI1 Set OFF"
  kind: action
  command: "BE EF 03 06 00 7A AE 01 00 93 21 00 00"
  params: []

- id: iwb_mode_hdmi1_set_stand_alone
  label: "IWB MODE HDMI1 Set STAND ALONE"
  kind: action
  command: "BE EF 03 06 00 EA AF 01 00 93 21 01 00"
  params: []

- id: iwb_mode_hdmi1_set_with_pc
  label: "IWB MODE HDMI1 Set WITH PC"
  kind: action
  command: "BE EF 03 06 00 1A AF 01 00 93 21 02 00"
  params: []

- id: iwb_mode_hdmi2_set_off
  label: "IWB MODE HDMI2 Set OFF"
  kind: action
  command: "BE EF 03 06 00 92 AC 01 00 9D 21 00 00"
  params: []

- id: iwb_mode_hdmi2_set_stand_alone
  label: "IWB MODE HDMI2 Set STAND ALONE"
  kind: action
  command: "BE EF 03 06 00 02 AD 01 00 9D 21 01 00"
  params: []

- id: iwb_mode_hdmi2_set_with_pc
  label: "IWB MODE HDMI2 Set WITH PC"
  kind: action
  command: "BE EF 03 06 00 F2 AD 01 00 9D 21 02 00"
  params: []

- id: iwb_mode_video_set_off
  label: "IWB MODE VIDEO Set OFF"
  kind: action
  command: "BE EF 03 06 00 C2 AF 01 00 91 21 00 00"
  params: []

- id: iwb_mode_video_set_stand_alone
  label: "IWB MODE VIDEO Set STAND ALONE"
  kind: action
  command: "BE EF 03 06 00 52 AE 01 00 91 21 01 00"
  params: []

- id: iwb_mode_video_set_with_pc
  label: "IWB MODE VIDEO Set WITH PC"
  kind: action
  command: "BE EF 03 06 00 A2 AE 01 00 91 21 02 00"
  params: []
```

## Feedbacks
```yaml
- id: <get>read_projector_internal_setup_value_b_l_b_h_a_l_a_h_02h_00h_b_l_b_h
  label: "<GET>Read projector internal setup value [(bL) (bH)] . (aL) (aH) 02h 00h (bL) (bH)"
  kind: query
  query_command: "00h 00h"

- id: power_set_get
  label: "Power Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 19  D3 02  00 00  60 00  00"

- id: input_source_set_get
  label: "Input Source Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CD  D2 02  00 00  20 00  00"

- id: error_status_set_get
  label: "Error Status Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 D9  D8 02  00 20  60 00  00"

- id: magnify_get
  label: "MAGNIFY Get"
  kind: query
  query_command: "BE  EF 03 06  00 7C  D2 02  00 07  30 00  00"

- id: freeze_set_get
  label: "FREEZE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B0  D2 02  00 02  30 00  00"

- id: picture_mode_set_get
  label: "PICTURE MODE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 10  F6 02  00 BA  30 00  00"

- id: brightness_get
  label: "BRIGHTNESS Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  D2 02  00 03  20 00  00"

- id: contrast_get
  label: "CONTRAST Get"
  kind: query
  query_command: "BE  EF 03 06  00 FD  D3 02  00 04  20 00  00"

- id: gamma_set_get
  label: "GAMMA Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F4  F0 02  00 A1  30 00  00"

- id: accent_ualizer_set_get
  label: "ACCENT UALIZER Set Get"
  kind: query
  query_command: "BE EF 03 06 00 5D 70 02 00 0C 22 00 00"

- id: hdcr_set_get
  label: "HDCR Set Get"
  kind: query
  query_command: "BE EF 03 06 00 A1 71 02 00 0D 22 00 00"

- id: user_gamma_pattern_set_get
  label: "User Gamma Pattern Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C8  FA 02  00 80  30 00  00"

- id: user_gamma_point_1_set_get
  label: "User Gamma Point 1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  FE 02  00 90  30 00  00"

- id: user_gamma_point_2_set_get
  label: "User Gamma Point 2 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F4  FF 02  00 91  30 00  00"

- id: user_gamma_point_3_set_get
  label: "User Gamma Point 3 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B0  FF 02  00 92  30 00  00"

- id: user_gamma_point_4_get
  label: "User Gamma Point 4 Get"
  kind: query
  query_command: "BE  EF 03 06  00 4C  FE 02  00 93  30 00  00"

- id: user_gamma_point_5_get
  label: "User Gamma Point 5 Get"
  kind: query
  query_command: "BE  EF 03 06  00 38  FF 02  00 94  30 00  00"

- id: user_gamma_point_6_get
  label: "User Gamma Point 6 Get"
  kind: query
  query_command: "BE  EF 03 06  00 C4  FE 02  00 95  30 00  00"

- id: user_gamma_point_7_get
  label: "User Gamma Point 7 Get"
  kind: query
  query_command: "BE  EF 03 06  00 80  FE 02  00 96  30 00  00"

- id: user_gamma_point_8_get
  label: "User Gamma Point 8 Get"
  kind: query
  query_command: "BE  EF 03 06  00 7C  FF 02  00 97  30 00  00"

- id: color_temp_set_get
  label: "COLOR TEMP Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C8  F5 02  00 B0  30 00  00"

- id: color_temp_gain_r_set_get
  label: "COLOR TEMP GAIN R Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 34  F4 02  00 B1  30 00  00"

- id: color_temp_gain_g_set_get
  label: "COLOR TEMP GAIN G Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 70  F4 02  00 B2  30 00  00"

- id: color_temp_gain_b_get
  label: "COLOR TEMP GAIN B Get"
  kind: query
  query_command: "BE  EF 03 06  00 8C  F5 02  00 B3  30 00  00"

- id: color_temp_offset_r_get
  label: "COLOR TEMP OFFSET R Get"
  kind: query
  query_command: "BE  EF 03 06  00 04  F5 02  00 B5  30 00  00"

- id: color_temp_offset_g_get
  label: "COLOR TEMP OFFSET G Get"
  kind: query
  query_command: "BE  EF 03 06  00 40  F5 02  00 B6  30 00  00"

- id: color_temp_offset_b_get
  label: "COLOR TEMP OFFSET B Get"
  kind: query
  query_command: "BE  EF 03 06  00 BC  F4 02  00 B7  30 00  00"

- id: color_get
  label: "COLOR Get"
  kind: query
  query_command: "BE  EF 03 06  00 B5  72 02  00 02  22 00  00"

- id: tint_get
  label: "TINT Get"
  kind: query
  query_command: "BE  EF 03 06  00 49  73 02  00 03  22 00  00"

- id: sharpness_get
  label: "SHARPNESS Get"
  kind: query
  query_command: "BE  EF 03 06  00 F1  72 02  00 01  22 00  00"

- id: active_iris_set_get
  label: "ACTIVE IRIS Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 38  22 02  00 04  33 00  00"

- id: aspect_set_get
  label: "ASPECT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 AD  D0 02  00 08  20 00  00"

- id: over_scan_set_get
  label: "OVER SCAN Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 91  70 02  00 09  22 00  00"

- id: v_position_set_get
  label: "V POSITION Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 0D  83 02  00 00  21 00  00"

- id: h_position_set_get
  label: "H POSITION Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F1  82 02  00 01  21 00  00"

- id: h_phase_set_get
  label: "H PHASE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 49  83 02  00 03  21 00  00"

- id: h_size_set_get
  label: "H SIZE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B5  82 02  00 02  21 00  00"

- id: progressive_set_get
  label: "PROGRESSIVE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 79  72 02  00 07  22 00  00"

- id: video_nr_set_get
  label: "VIDEO NR Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 85  73 02  00 06  22 00  00"

- id: color_space_set_get
  label: "COLOR SPACE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 3D  72 02  00 04  22 00  00"

- id: c_video_format_set_get
  label: "C-VIDEO FORMAT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  76 02  00 11  22 00  00"

- id: hdmi1_format_set_get
  label: "HDMI1 FORMAT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 89 77 02 00 13 22 00 00"

- id: hdmi2_format_set_get
  label: "HDMI2 FORMAT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 61 75 02 00 1D 22 00 00"

- id: hdmi1_range_set_get
  label: "HDMI1 RANGE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B5 D8 02 00 22 20 00 00"

- id: hdmi2_range_set_get
  label: "HDMI2 RANGE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 49 D9 02 00 23 20 00 00"

- id: computer_in1_set_get
  label: "COMPUTER IN1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 0D  D6 02  00 10  20 00  00"

- id: computer_in2_set_get
  label: "COMPUTER IN2 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F1  D7 02  00 11  20 00  00"

- id: frame_lock_-_computer_in1_set_get
  label: "FRAME LOCK - COMPUTER IN1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  C2 02  00 50  30 00  00"

- id: frame_lock_-_computer_in2_set_get
  label: "FRAME LOCK - COMPUTER IN2 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 38  C3 02  00 54  30 00  00"

- id: frame_lock_hdmi1_set_get
  label: "FRAME LOCK - HDMI1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 4C C2 02 00 53 30 00 00"

- id: frame_lock_hdmi2_set_get
  label: "FRAME LOCK - HDMI2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 A4 C0 02 00 5D 30 00 00"

- id: d_zoom_set_get
  label: "D-ZOOM Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 D0  D0 02  00 0A  30 00  00"

- id: d_shift_v_set_get
  label: "D-SHIFT V Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 2C  D1 02  00 0B  30 00  00"

- id: d_shift_h_get
  label: "D-SHIFT H Get"
  kind: query
  query_command: "BE  EF 03 06  00 58  D0 02  00 0C  30 00  00"

- id: pict_posit_h_set_get
  label: "PICT.POSIT.H Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 E5  D4 02  00 1E  20 00  00"

- id: keystone_v_set_get
  label: "KEYSTONE V Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B9  D3 02  00 07  20 00  00"

- id: keystone_h_set_get
  label: "KEYSTONE H Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 E9  D0 02  00 0B  20 00  00"

- id: perfect_fit_set_get
  label: "PERFECT FIT Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CD  88 02  00 20  21 00  00"

- id: perfect_fit_left_top_h_set_get
  label: "PERFECT FIT Left Top -H Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  89 02  00 21  21 00  00"

- id: perfect_fit_left_top_v_set_get
  label: "PERFECT FIT Left Top -V Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 75  89 02  00 22  21 00  00"

- id: perfect_fit_right_top_h_set_get
  label: "PERFECT FIT Right Top -H Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  88 02  00 23  21 00  00"

- id: perfect_fit_right_top_v_set_get
  label: "PERFECT FIT Right Top -V Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 FD  89 02  00 24  21 00  00"

- id: perfect_fit_left_bottom_h_set_get
  label: "PERFECT FIT Left Bottom -H Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 01  88 02  00 25  21 00  00"

- id: perfect_fit_left_bottom_v_set_get
  label: "PERFECT FIT Left Bottom -V Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 45  88 02  00 26  21 00  00"

- id: perfect_fit_right_bottom_h_set_get
  label: "PERFECT FIT Right Bottom -H Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 B9  89 02  00 27  21 00  00"

- id: perfect_fit_right_bottom_v_set_get
  label: "PERFECT FIT Right Bottom -V Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 AD  8A 02  00 28  21 00  00"

- id: perfect_fit_left_side_distortion_get
  label: "PERFECT FIT Left Side Distortion Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  97 02  00 41  21 00  00"

- id: perfect_fit_right_side_distortion_get
  label: "PERFECT FIT Right Side Distortion Get"
  kind: query
  query_command: "BE  EF 03 06  00 75  97 02  00 42  21 00  00"

- id: perfect_fit_distortion_position_v_get
  label: "PERFECT FIT Distortion Position V Get"
  kind: query
  query_command: "BE  EF 03 06  00 89  96 02  00 43  21 00  00"

- id: perfect_fit_top_side_distortion_get
  label: "PERFECT FIT Top Side Distortion Get"
  kind: query
  query_command: "BE  EF 03 06  00 FD  97 02  00 44  21 00  00"

- id: perfect_fit_bottom_side_distortion_get
  label: "PERFECT FIT Bottom Side Distortion Get"
  kind: query
  query_command: "BE  EF 03 06  00 01  96 02  00 45  21 00  00"

- id: perfect_fit_distortion_position_h_get
  label: "PERFECT FIT Distortion Position H Get"
  kind: query
  query_command: "BE  EF 03 06  00 45  96 02  00 46  21 00  00"

- id: auto_eco_mode_set_get
  label: "AUTO ECO MODE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C8  27 02  00 10  33 00  00"

- id: eco_mode_set_get
  label: "ECO MODE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  23 02  00 00  33 00  00"

- id: installation_set_get
  label: "INSTALLATION Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F4  D2 02  00 01  30 00  00"

- id: standby_mode_set_get
  label: "STANDBY MODE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 E5  D2 02  00 01  60 00  00"

- id: monitor_out_computer_in1_set_get
  label: "MONITOR OUT - COMPUTER IN1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 0D  F4 02  00 B0  20 00  00"

- id: monitor_out_video_set_get
  label: "MONITOR OUT - VIDEO Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 F1  F5 02  00 B1  20 00  00"

- id: monitor_out_hdmi1_set_get
  label: "MONITOR OUT - HDMI1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 49 F4 02 00 B3 20 00 00"

- id: monitor_out_hdmi2_set_get
  label: "MONITOR OUT - HDMI2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 A1 F6 02 00 BD 20 00 00"

- id: monitor_out_lan_set_get
  label: "MONITOR OUT - LAN Set Get"
  kind: query
  query_command: "BE EF 03 06 00 29 F6 02 00 BB 20 00 00"

- id: monitor_out_usb_type_a_set_get
  label: "MONITOR OUT- USB TYPE A Set Get"
  kind: query
  query_command: "BE EF 03 06 00 85 F4 02 00 B6 20 00 00"

- id: monitor_out_usb_type_b_set_get
  label: "MONITOR OUT - USB TYPE B Set Get"
  kind: query
  query_command: "BE EF 03 06 00 5D F7 02 00 BC 20 00 00"

- id: monitor_out_standby_set_get
  label: "MONITOR OUT - STANDBY Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 19  F7 02  00 BF  20 00  00"

- id: volume_computer_in1_set_get
  label: "VOLUME - COMPUTER IN1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CD  CC 02  00 60  20 00  00"

- id: volume_computer_in2_set_get
  label: "VOLUME - COMPUTER IN2 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 FD  CD 02  00 64  20 00  00"

- id: volume_video_set_get
  label: "VOLUME - VIDEO Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  CD 02  00 61  20 00  00"

- id: volume_hdmi1_set_get
  label: "VOLUME - HDMI1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 89 CC 02 00 63 20 00 00"

- id: volume_hdmi2_set_get
  label: "VOLUME - HDMI2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 61 CE 02 00 6D 20 00 00"

- id: volume_lan_set_get
  label: "VOLUME - LAN Set Get"
  kind: query
  query_command: "BE EF 03 06 00 E9 CE 02 00 6B 20 00 00"

- id: volume_usb_type_a_set_get
  label: "VOLUME - USB TYPE A Set Get"
  kind: query
  query_command: "BE EF 03 06 00 45 CC 02 00 66 20 00 00"

- id: volume_usb_type_b_set_get
  label: "VOLUME - USB TYPE B Set Get"
  kind: query
  query_command: "BE EF 03 06 00 9D CF 02 00 6C 20 00 00"

- id: volume_standby_set_get
  label: "VOLUME - STANDBY Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 D9  CF 02  00 6F  20 00  00"

- id: mute_set_get
  label: "MUTE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 75  D3 02  00 02  20 00  00"

- id: av_mute_set_get
  label: "AV MUTE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 CD  F0 02 00 A0 20 00 00"

- id: speaker_set_get
  label: "SPEAKER Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 5D  D5 02  00 1C  20 00  00"

- id: audio_source_computer_in1_set_get
  label: "AUDIO SOURCE - COMPUTER IN1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CD  DD 02  00 30  20 00  00"

- id: audio_source_computer_in2_set_get
  label: "AUDIO SOURCE - COMPUTER IN2 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 FD  DC 02  00 34  20 00  00"

- id: audio_source_lan_set_get
  label: "AUDIO SOURCE - LAN Set Get"
  kind: query
  query_command: "BE EF 03 06 00 E9 DF 02 00 3B 20 00 00"

- id: audio_source_usb_type_a_set_get
  label: "AUDIO SOURCE - USB TYPE A Set Get"
  kind: query
  query_command: "BE EF 03 06 00 45 DD 02 00 36 20 00 00"

- id: audio_source_usb_type_b_set_get
  label: "AUDIO SOURCE - USB TYPE B Set Get"
  kind: query
  query_command: "BE EF 03 06 00 9D DE 02 00 3C 20 00 00"

- id: audio_source_hdmi1_set_get
  label: "AUDIO SOURCE - HDMI1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 89 DD 02 00 33 20 00 00"

- id: audio_source_hdmi2_set_get
  label: "AUDIO SOURCE - HDMI2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 61 DF 02 00 3D 20 00 00"

- id: audio_source_video_set_get
  label: "AUDIO SOURCE - VIDEO Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 31  DC 02  00 31  20 00  00"

- id: audio_source_standby_set_get
  label: "AUDIO SOURCE - STANDBY Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 D9  DE 02  00 3F  20 00  00"

- id: mic_volume_get
  label: "MIC VOLUME Get"
  kind: query
  query_command: "BE EF 03 06 00 75 F1 02 00 A2 20 00 00"

- id: language_set_get
  label: "LANGUAGE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C4  D3 02  00 05  30 00  00"

- id: menu_position_h_get
  label: "MENU POSITION H Get"
  kind: query
  query_command: "BE  EF 03 06  00 04  D7 02  00 15  30 00  00"

- id: menu_position_v_get
  label: "MENU POSITION V Get"
  kind: query
  query_command: "BE  EF 03 06  00 40  D7 02  00 16  30 00  00"

- id: blank_set_get
  label: "BLANK Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  D3 02  00 00  30 00  00"

- id: blank_on_off_set_get
  label: "BLANK On/Off Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C8  D8 02  00 20  30 00  00"

- id: auto_blank_set_get
  label: "AUTO BLANK Set Get"
  kind: query
  query_command: "BE EF 03 06 00 A4 D1 02 00 0D 30 00 00"

- id: start_up_set_get
  label: "START UP Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 38  D2 02  00 04  30 00  00"

- id: my_screen_lock_set_get
  label: "MyScreen Lock Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  EF 02  00 C0  30 00  00"

- id: message_set_get
  label: "MESSAGE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 BC  D6 02  00 17  30 00  00"

- id: template_set_get
  label: "TEMPLATE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 70  D9 02  00 22  30 00  00"

- id: template_on_off_set_get
  label: "TEMPLATE On/ Off Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 8C  D8 02  00 23  30 00  00"

- id: c_c_display_set_get
  label: "C. C. - DISPLAY Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C9  62 02  00 00  37 00  00"

- id: c_c_mode_set_get
  label: "C. C. - MODE Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 35  63 02  00 01  37 00  00"

- id: c_c_channel_set_get
  label: "C. C. - CHANNEL Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 71  63 02  00 02  37 00  00"

- id: auto_search_set_get
  label: "AUTO SEARCH Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 85  D6 02  00 16  20 00  00"

- id: direct_power_on_set_get
  label: "DIRECT POWER ON Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  89 02  00 20  31 00  00"

- id: auto_power_off_set_get
  label: "AUTO POWER OFF Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 08  86 02  00 10  31 00  00"

- id: lamp_time_set_get
  label: "LAMP TIME Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C2  FF 02  00 90  10 00  00"

- id: filter_time_set_get
  label: "FILTER TIME Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 C2  F0 02  00 A0  10 00  00"

- id: my_button_1_set_get
  label: "MY BUTTON-1 Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 09  33 02  00 00  36 00  00"

- id: my_button_2_set_get
  label: "MY BUTTON-2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F5 32 02 00 01 36 00 00"

- id: magnify_position_h_set_get
  label: "Magnify Position H Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C8 D7 02 00 10 30 00 00"

- id: magnify_position_v_set_get
  label: "Magnify Position V Set Get"
  kind: query
  query_command: "BE EF 03 06 00 34 D6 02 00 11 30 00 00"

- id: remote_front_set_get
  label: "REMOTE FRONT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 CC 32 02 00 00 26 00 00"

- id: remote_top_set_get
  label: "REMOTE TOP Set Get"
  kind: query
  query_command: "BE EF 03 06 00 74 33 02 00 02 26 00 00"

- id: remote_freq_normal_set_get
  label: "REMOTE FREQ. NORMAL Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 CC  3D 02  00 30  26 00  00"

- id: remote_freq_high_set_get
  label: "REMOTE FREQ. HIGH Set Get"
  kind: query
  query_command: "BE  EF 03 06  00 30  3C 02  00 31  26 00  00"

- id: my_image_set_get
  label: "MY IMAGE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 09 C3 02 00 00 35 00 00"

- id: volume_all_set_get
  label: "VOLUME - ALL Set Get"
  kind: query
  query_command: "BE EF 03 06 00 CD C3 02 00 50 20 00 00"

- id: lan_sound_enable_set_get
  label: "LAN SOUND ENABLE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 89 F0 02 00 A3 20 00 00"

- id: usb_type_a_sound_enable_set_get
  label: "USB TYPE A SOUND ENABLE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 FD F1 02 00 A4 20 00 00"

- id: usb_type_b_sound_enable_set_get
  label: "USB TYPE B SOUND ENABLE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 01 F0 02 00 A5 20 00 00"

- id: iwb_mode_computer_in1_set_get
  label: "IWB MODE COMPUTER IN1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 0D AE 02 00 90 21 00 00"

- id: iwb_mode_computer_in2_set_get
  label: "IWB MODE COMPUTER IN2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 3D AF 02 00 94 21 00 00"

- id: iwb_mode_usb_type_a_set_get
  label: "IWB MODE USB TYPE A Set Get"
  kind: query
  query_command: "BE EF 03 06 00 85 AE 02 00 96 21 00 00"

- id: iwb_mode_hdmi1_set_get
  label: "IWB MODE HDMI1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 49 AE 02 00 93 21 00 00"

- id: iwb_mode_hdmi2_set_get
  label: "IWB MODE HDMI2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 A1 AC 02 00 9D 21 00 00"

- id: iwb_mode_video_set_get
  label: "IWB MODE VIDEO Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F1 AF 02 00 91 21 00 00"
```

## Variables
```yaml
# UNRESOLVED: no separate parameter surface documented beyond the
# SET/GET command table - variables collapsed into the command catalogue.
```

## Events
```yaml
# UNRESOLVED: source describes response codes (ACK/NAK/Error/Data/Auth
# Error/Projector busy) but no unsolicited device-pushed notifications.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains power-on sequencing cautions ("Turn off the
# projector and other devices ... before connecting") but no explicit
# interlocks, dangerous-operation confirmations, or safety interlocks.
```

## Notes
- RS-232C command frame: header `BE EF 03 06 00` + 2-byte CRC + 2-byte Action + 2-byte Type + 2-byte Setting (13 bytes total). Action bytes: `01 00` = SET, `02 00` = GET, `04 00` = INCREMENT, `05 00` = DECREMENT, `06 00` = EXECUTE.
- TCP #9715 wraps the 13-byte RS-232C frame with `02` header + `0D` data-length + 1-byte checksum + 1-byte connection ID. Connection ID is echoed back on replies.
- TCP #23 uses the bare 13-byte RS-232C frame (same as serial).
- Reply codes (all transports): `06` ACK, `15` NAK, `1C 00 00` Error, `1D xxxx` Data. TCP #9715 appends the connection ID; TCP #23 adds `1F 04 00` Auth Error; projector-busy reply `1F xxxx` on #9715.
- Wait ≥40 ms between successive commands. Commands ignored during warm-up. Test data emitted on power-on / lamp-on must be discarded.
- Auto-disconnect: TCP drops after 30 s of silence.
- LAN bridge: COMMUNICATION TYPE = NETWORK BRIDGE forwards RS-232C bytes between LAN and the CONTROL port. Configurable 4800/9600/19200/38400 baud, 8N1, NONE/ODD/EVEN parity, HALF/FULL duplex.
- PJLink also supported (Class 1): `POWR`, `INPT`, `AVMT`, `ERST?`, `LAMP?`, `INST?`, `NAME?`, `INF1?` (HITACHI), `INF2?` (CP-TW2503/CP-TW3003), `INFO?`, `CLSS?` (=1). PJLink password = web-browser-control password.
- SOURCE: User's Manual (detailed) Operating Guide – Technical, sections covering RS-232C Communication, Network Command Control, Network Bridge, and PJLink.
<!-- UNRESOLVED: per-model behavioral differences (CP-TW2503 vs CP-TW3003) not itemized in source; voltage/current draw not stated. -->

## Provenance

```yaml
source_domains:
  - hitachi.com
source_urls:
  - https://www.hitachi.com/content/dam/hitachi/au/en_au/product-support/ultra-interactive/CPTW2503_CPTW3003_Technical.pdf
  - https://www.hitachi.com/content/dam/hitachi/au/en_au/product-support/ultra-interactive/Hitachi-CP-TW2505.pdf
retrieved_at: 2026-06-25T08:18:40.161Z
last_checked_at: 2026-06-25T09:13:45.126Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T09:13:45.126Z
matched_actions: 659
action_count: 659
confidence: medium
summary: "deterministic presence proof: 659/659 payloads verbatim in source; stratified Sonnet sample corroborated (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "no separate parameter surface documented beyond the"
- "source describes response codes (ACK/NAK/Error/Data/Auth"
- "no multi-step sequences documented in source."
- "source contains power-on sequencing cautions (\"Turn off the"
- "per-model behavioral differences (CP-TW2503 vs CP-TW3003) not itemized in source; voltage/current draw not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
