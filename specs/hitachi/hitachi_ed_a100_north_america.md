---
spec_id: admin/hitachi-ed-a100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hitachi ED-A100 Control Spec"
manufacturer: Hitachi
model_family: "ED-A100 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Hitachi
  models:
    - "ED-A100 (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.maxellproav.com
source_urls:
  - https://support.maxellproav.com/wp-content/uploads/Support/OG/Hitachi_ED-A100_UM_Technical.pdf
retrieved_at: 2026-04-30T04:24:57.970Z
last_checked_at: 2026-06-02T17:22:32.242Z
generated_at: 2026-06-02T17:22:32.242Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated"
  - "no web/REST API command tables in source — only RS-232C and TCP command control"
  - "flow_control not explicitly stated; RTS/CTS pins present on connector"
  - "source lists TCP #23 and TCP #9715; no single default port"
  - "source does not document value ranges for increment/decrement parameters"
  - "source does not document unsolicited notifications from projector"
  - "source does not document multi-step command sequences"
  - "no explicit safety interlocks or confirmation requirements stated in source"
  - "no Set command for brightness/contrast/sharpness — only increment/decrement"
  - "flow control setting not explicitly stated (RTS/CTS hardware pins present)"
  - "warm-up duration not specified"
  - "value ranges for increment/decrement parameters not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:32.242Z
  matched_actions: 381
  action_count: 381
  confidence: medium
  summary: "All 381 spec commands matched verbatim hex sequences in source table; transport parameters (19200, 8N1, ports 23/9715, auth settings) confirmed in source. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Hitachi ED-A100 Control Spec

## Summary

Hitachi ED-A100 XGA LCD projector with RS-232C and TCP/IP (port 23, port 9715) binary control protocol. Commands use a fixed 13-byte frame (7-byte header with CRC + 6-byte command data) supporting set, get, increment, decrement, and execute operations across power, input routing, picture adjustment, audio, and system settings.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: no web/REST API command tables in source — only RS-232C and TCP command control -->

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
  flow_control: none  # UNRESOLVED: flow_control not explicitly stated; RTS/CTS pins present on connector
addressing:
  port: null  # UNRESOLVED: source lists TCP #23 and TCP #9715; no single default port
  ports:
    - 23
    - 9715
auth:
  type: configurable  # TCP#23 default: disabled; TCP#9715 default: enabled (MD5 challenge-response)
  method: md5_challenge_response  # TCP#9715: concatenate 8 random bytes + password, MD5 digest, prepend to command
  notes: >
    TCP#23 auth default "Disable". TCP#9715 auth default "Enable".
    Same password for both ports. Authentication data can be omitted for
    subsequent commands on the same connection (TCP#9715).
    TCP#9715 auto-disconnects after 30s idle.
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands
  - queryable    # get commands return state
  - routable     # input source selection
  - levelable    # volume, brightness, contrast, etc.
```

## Actions
```yaml
actions:
  # --- POWER ---
  - id: power_off
    label: Power Off
    kind: action
    command: "BE EF 03 06 00 2A D3 01 00 00 60 00 00"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: "BE EF 03 06 00 BA D2 01 00 00 60 01 00"
    params: []

  - id: power_get
    label: Power Status Query
    kind: query
    command: "BE EF 03 06 00 19 D3 02 00 00 60 00 00"
    params: []

  # --- INPUT SOURCE ---
  - id: input_computer1
    label: Input Source COMPUTER1
    kind: action
    command: "BE EF 03 06 00 FE D2 01 00 00 20 00 00"
    params: []

  - id: input_computer2
    label: Input Source COMPUTER2
    kind: action
    command: "BE EF 03 06 00 3E D0 01 00 00 20 04 00"
    params: []

  - id: input_component
    label: Input Source COMPONENT
    kind: action
    command: "BE EF 03 06 00 AE D1 01 00 00 20 05 00"
    params: []

  - id: input_svideo
    label: Input Source S-VIDEO
    kind: action
    command: "BE EF 03 06 00 9E D3 01 00 00 20 02 00"
    params: []

  - id: input_video
    label: Input Source VIDEO
    kind: action
    command: "BE EF 03 06 00 6E D3 01 00 00 20 01 00"
    params: []

  - id: input_source_get
    label: Input Source Query
    kind: query
    command: "BE EF 03 06 00 CD D2 02 00 00 20 00 00"
    params: []

  # --- ERROR STATUS ---
  - id: error_status_get
    label: Error Status Query
    kind: query
    command: "BE EF 03 06 00 D9 D8 02 00 20 60 00 00"
    params: []

  # --- BRIGHTNESS ---
  - id: brightness_get
    label: Brightness Query
    kind: query
    command: "BE EF 03 06 00 89 D2 02 00 03 20 00 00"
    params: []

  - id: brightness_increment
    label: Brightness Increment
    kind: action
    command: "BE EF 03 06 00 EF D2 04 00 03 20 00 00"
    params: []

  - id: brightness_decrement
    label: Brightness Decrement
    kind: action
    command: "BE EF 03 06 00 3E D3 05 00 03 20 00 00"
    params: []

  - id: brightness_reset
    label: Brightness Reset
    kind: action
    command: "BE EF 03 06 00 58 D3 06 00 00 70 00 00"
    params: []

  # --- CONTRAST ---
  - id: contrast_get
    label: Contrast Query
    kind: query
    command: "BE EF 03 06 00 FD D3 02 00 04 20 00 00"
    params: []

  - id: contrast_increment
    label: Contrast Increment
    kind: action
    command: "BE EF 03 06 00 9B D3 04 00 04 20 00 00"
    params: []

  - id: contrast_decrement
    label: Contrast Decrement
    kind: action
    command: "BE EF 03 06 00 4A D2 05 00 04 20 00 00"
    params: []

  - id: contrast_reset
    label: Contrast Reset
    kind: action
    command: "BE EF 03 06 00 A4 D2 06 00 01 70 00 00"
    params: []

  # --- PICTURE MODE ---
  - id: picture_mode_normal
    label: Picture Mode NORMAL
    kind: action
    command: "BE EF 03 06 00 23 F6 01 00 BA 30 00 00"
    params: []

  - id: picture_mode_cinema
    label: Picture Mode CINEMA
    kind: action
    command: "BE EF 03 06 00 B3 F7 01 00 BA 30 01 00"
    params: []

  - id: picture_mode_dynamic
    label: Picture Mode DYNAMIC
    kind: action
    command: "BE EF 03 06 00 E3 F4 01 00 BA 30 04 00"
    params: []

  - id: picture_mode_board_black
    label: Picture Mode BOARD (BLACK)
    kind: action
    command: "BE EF 03 06 00 E3 EF 01 00 BA 30 20 00"
    params: []

  - id: picture_mode_board_green
    label: Picture Mode BOARD (GREEN)
    kind: action
    command: "BE EF 03 06 00 73 EE 01 00 BA 30 21 00"
    params: []

  - id: picture_mode_whiteboard
    label: Picture Mode WHITEBOARD
    kind: action
    command: "BE EF 03 06 00 83 EE 01 00 BA 30 22 00"
    params: []

  - id: picture_mode_daytime
    label: Picture Mode DAYTIME
    kind: action
    command: "BE EF 03 06 00 E3 C7 01 00 BA 30 40 00"
    params: []

  - id: picture_mode_get
    label: Picture Mode Query
    kind: query
    command: "BE EF 03 06 00 10 F6 02 00 BA 30 00 00"
    params: []

  # --- GAMMA ---
  - id: gamma_1_default
    label: Gamma #1 DEFAULT
    kind: action
    command: "BE EF 03 06 00 07 E9 01 00 A1 30 20 00"
    params: []

  - id: gamma_1_custom
    label: Gamma #1 CUSTOM
    kind: action
    command: "BE EF 03 06 00 07 FD 01 00 A1 30 10 00"
    params: []

  - id: gamma_2_default
    label: Gamma #2 DEFAULT
    kind: action
    command: "BE EF 03 06 00 97 E8 01 00 A1 30 21 00"
    params: []

  - id: gamma_2_custom
    label: Gamma #2 CUSTOM
    kind: action
    command: "BE EF 03 06 00 97 FC 01 00 A1 30 11 00"
    params: []

  - id: gamma_3_default
    label: Gamma #3 DEFAULT
    kind: action
    command: "BE EF 03 06 00 67 E8 01 00 A1 30 22 00"
    params: []

  - id: gamma_3_custom
    label: Gamma #3 CUSTOM
    kind: action
    command: "BE EF 03 06 00 67 FC 01 00 A1 30 12 00"
    params: []

  - id: gamma_4_default
    label: Gamma #4 DEFAULT
    kind: action
    command: "BE EF 03 06 00 F7 E9 01 00 A1 30 23 00"
    params: []

  - id: gamma_4_custom
    label: Gamma #4 CUSTOM
    kind: action
    command: "BE EF 03 06 00 F7 FD 01 00 A1 30 13 00"
    params: []

  - id: gamma_5_default
    label: Gamma #5 DEFAULT
    kind: action
    command: "BE EF 03 06 00 C7 EB 01 00 A1 30 24 00"
    params: []

  - id: gamma_5_custom
    label: Gamma #5 CUSTOM
    kind: action
    command: "BE EF 03 06 00 C7 FF 01 00 A1 30 14 00"
    params: []

  - id: gamma_6_default
    label: Gamma #6 DEFAULT
    kind: action
    command: "BE EF 03 06 00 57 EA 01 00 A1 30 25 00"
    params: []

  - id: gamma_6_custom
    label: Gamma #6 CUSTOM
    kind: action
    command: "BE EF 03 06 00 57 FE 01 00 A1 30 15 00"
    params: []

  - id: gamma_get
    label: Gamma Query
    kind: query
    command: "BE EF 03 06 00 F4 F0 02 00 A1 30 00 00"
    params: []

  # --- USER GAMMA PATTERN ---
  - id: user_gamma_pattern_off
    label: User Gamma Pattern Off
    kind: action
    command: "BE EF 03 06 00 FB FA 01 00 80 30 00 00"
    params: []

  - id: user_gamma_pattern_9step
    label: User Gamma Pattern 9 Steps Grayscale
    kind: action
    command: "BE EF 03 06 00 6B FB 01 00 80 30 01 00"
    params: []

  - id: user_gamma_pattern_15step
    label: User Gamma Pattern 15 Steps Grayscale
    kind: action
    command: "BE EF 03 06 00 9B FB 01 00 80 30 02 00"
    params: []

  - id: user_gamma_pattern_ramp
    label: User Gamma Pattern Ramp
    kind: action
    command: "BE EF 03 06 00 0B FA 01 00 80 30 03 00"
    params: []

  - id: user_gamma_pattern_get
    label: User Gamma Pattern Query
    kind: query
    command: "BE EF 03 06 00 C8 FA 02 00 80 30 00 00"
    params: []

  # --- USER GAMMA POINTS 1-8 ---
  - id: user_gamma_point_1_get
    label: User Gamma Point 1 Query
    kind: query
    command: "BE EF 03 06 00 08 FE 02 00 90 30 00 00"
    params: []

  - id: user_gamma_point_1_increment
    label: User Gamma Point 1 Increment
    kind: action
    command: "BE EF 03 06 00 6E FE 04 00 90 30 00 00"
    params: []

  - id: user_gamma_point_1_decrement
    label: User Gamma Point 1 Decrement
    kind: action
    command: "BE EF 03 06 00 BF FF 05 00 90 30 00 00"
    params: []

  - id: user_gamma_point_2_get
    label: User Gamma Point 2 Query
    kind: query
    command: "BE EF 03 06 00 F4 FF 02 00 91 30 00 00"
    params: []

  - id: user_gamma_point_2_increment
    label: User Gamma Point 2 Increment
    kind: action
    command: "BE EF 03 06 00 92 FF 04 00 91 30 00 00"
    params: []

  - id: user_gamma_point_2_decrement
    label: User Gamma Point 2 Decrement
    kind: action
    command: "BE EF 03 06 00 43 FE 05 00 91 30 00 00"
    params: []

  - id: user_gamma_point_3_get
    label: User Gamma Point 3 Query
    kind: query
    command: "BE EF 03 06 00 B0 FF 02 00 92 30 00 00"
    params: []

  - id: user_gamma_point_3_increment
    label: User Gamma Point 3 Increment
    kind: action
    command: "BE EF 03 06 00 D6 FF 04 00 92 30 00 00"
    params: []

  - id: user_gamma_point_3_decrement
    label: User Gamma Point 3 Decrement
    kind: action
    command: "BE EF 03 06 00 07 FE 05 00 92 30 00 00"
    params: []

  - id: user_gamma_point_4_get
    label: User Gamma Point 4 Query
    kind: query
    command: "BE EF 03 06 00 4C FE 02 00 93 30 00 00"
    params: []

  - id: user_gamma_point_4_increment
    label: User Gamma Point 4 Increment
    kind: action
    command: "BE EF 03 06 00 2A FE 04 00 93 30 00 00"
    params: []

  - id: user_gamma_point_4_decrement
    label: User Gamma Point 4 Decrement
    kind: action
    command: "BE EF 03 06 00 FB FF 05 00 93 30 00 00"
    params: []

  - id: user_gamma_point_5_get
    label: User Gamma Point 5 Query
    kind: query
    command: "BE EF 03 06 00 38 FF 02 00 94 30 00 00"
    params: []

  - id: user_gamma_point_5_increment
    label: User Gamma Point 5 Increment
    kind: action
    command: "BE EF 03 06 00 5E FF 04 00 94 30 00 00"
    params: []

  - id: user_gamma_point_5_decrement
    label: User Gamma Point 5 Decrement
    kind: action
    command: "BE EF 03 06 00 8F FE 05 00 94 30 00 00"
    params: []

  - id: user_gamma_point_6_get
    label: User Gamma Point 6 Query
    kind: query
    command: "BE EF 03 06 00 C4 FE 02 00 95 30 00 00"
    params: []

  - id: user_gamma_point_6_increment
    label: User Gamma Point 6 Increment
    kind: action
    command: "BE EF 03 06 00 A2 FE 04 00 95 30 00 00"
    params: []

  - id: user_gamma_point_6_decrement
    label: User Gamma Point 6 Decrement
    kind: action
    command: "BE EF 03 06 00 73 FF 05 00 95 30 00 00"
    params: []

  - id: user_gamma_point_7_get
    label: User Gamma Point 7 Query
    kind: query
    command: "BE EF 03 06 00 80 FE 02 00 96 30 00 00"
    params: []

  - id: user_gamma_point_7_increment
    label: User Gamma Point 7 Increment
    kind: action
    command: "BE EF 03 06 00 E6 FE 04 00 96 30 00 00"
    params: []

  - id: user_gamma_point_7_decrement
    label: User Gamma Point 7 Decrement
    kind: action
    command: "BE EF 03 06 00 37 FF 05 00 96 30 00 00"
    params: []

  - id: user_gamma_point_8_get
    label: User Gamma Point 8 Query
    kind: query
    command: "BE EF 03 06 00 7C FF 02 00 97 30 00 00"
    params: []

  - id: user_gamma_point_8_increment
    label: User Gamma Point 8 Increment
    kind: action
    command: "BE EF 03 06 00 1A FF 04 00 97 30 00 00"
    params: []

  - id: user_gamma_point_8_decrement
    label: User Gamma Point 8 Decrement
    kind: action
    command: "BE EF 03 06 00 CB FE 05 00 97 30 00 00"
    params: []

  # --- COLOR TEMP ---
  - id: color_temp_high
    label: Color Temp HIGH
    kind: action
    command: "BE EF 03 06 00 0B F5 01 00 B0 30 03 00"
    params: []

  - id: color_temp_custom1_high
    label: Color Temp CUSTOM-1 (HIGH)
    kind: action
    command: "BE EF 03 06 00 CB F8 01 00 B0 30 13 00"
    params: []

  - id: color_temp_mid
    label: Color Temp MID
    kind: action
    command: "BE EF 03 06 00 9B F4 01 00 B0 30 02 00"
    params: []

  - id: color_temp_custom2_mid
    label: Color Temp CUSTOM-2 (MID)
    kind: action
    command: "BE EF 03 06 00 5B F9 01 00 B0 30 12 00"
    params: []

  - id: color_temp_low
    label: Color Temp LOW
    kind: action
    command: "BE EF 03 06 00 6B F4 01 00 B0 30 01 00"
    params: []

  - id: color_temp_custom3_low
    label: Color Temp CUSTOM-3 (LOW)
    kind: action
    command: "BE EF 03 06 00 AB F9 01 00 B0 30 11 00"
    params: []

  - id: color_temp_hibright1
    label: Color Temp Hi-BRIGHT-1
    kind: action
    command: "BE EF 03 06 00 3B F2 01 00 B0 30 08 00"
    params: []

  - id: color_temp_custom4_hibright1
    label: Color Temp CUSTOM-4 (Hi-BRIGHT-1)
    kind: action
    command: "BE EF 03 06 00 FB FF 01 00 B0 30 18 00"
    params: []

  - id: color_temp_hibright2
    label: Color Temp Hi-BRIGHT-2
    kind: action
    command: "BE EF 03 06 00 AB F3 01 00 B0 30 09 00"
    params: []

  - id: color_temp_custom5_hibright2
    label: Color Temp CUSTOM-5 (Hi-BRIGHT-2)
    kind: action
    command: "BE EF 03 06 00 6B FE 01 00 B0 30 19 00"
    params: []

  - id: color_temp_hibright3
    label: Color Temp Hi-BRIGHT-3
    kind: action
    command: "BE EF 03 06 00 5B F3 01 00 B0 30 0A 00"
    params: []

  - id: color_temp_custom6_hibright3
    label: Color Temp CUSTOM-6 (Hi-BRIGHT-3)
    kind: action
    command: "BE EF 03 06 00 9B FE 01 00 B0 30 1A 00"
    params: []

  - id: color_temp_get
    label: Color Temp Query
    kind: query
    command: "BE EF 03 06 00 C8 F5 02 00 B0 30 00 00"
    params: []

  # --- COLOR TEMP GAIN R/G/B ---
  - id: color_temp_gain_r_get
    label: Color Temp Gain R Query
    kind: query
    command: "BE EF 03 06 00 34 F4 02 00 B1 30 00 00"
    params: []

  - id: color_temp_gain_r_increment
    label: Color Temp Gain R Increment
    kind: action
    command: "BE EF 03 06 00 52 F4 04 00 B1 30 00 00"
    params: []

  - id: color_temp_gain_r_decrement
    label: Color Temp Gain R Decrement
    kind: action
    command: "BE EF 03 06 00 83 F5 05 00 B1 30 00 00"
    params: []

  - id: color_temp_gain_g_get
    label: Color Temp Gain G Query
    kind: query
    command: "BE EF 03 06 00 70 F4 02 00 B2 30 00 00"
    params: []

  - id: color_temp_gain_g_increment
    label: Color Temp Gain G Increment
    kind: action
    command: "BE EF 03 06 00 16 F4 04 00 B2 30 00 00"
    params: []

  - id: color_temp_gain_g_decrement
    label: Color Temp Gain G Decrement
    kind: action
    command: "BE EF 03 06 00 C7 F5 05 00 B2 30 00 00"
    params: []

  - id: color_temp_gain_b_get
    label: Color Temp Gain B Query
    kind: query
    command: "BE EF 03 06 00 8C F5 02 00 B3 30 00 00"
    params: []

  - id: color_temp_gain_b_increment
    label: Color Temp Gain B Increment
    kind: action
    command: "BE EF 03 06 00 EA F5 04 00 B3 30 00 00"
    params: []

  - id: color_temp_gain_b_decrement
    label: Color Temp Gain B Decrement
    kind: action
    command: "BE EF 03 06 00 3B F4 05 00 B3 30 00 00"
    params: []

  # --- COLOR TEMP OFFSET R/G/B ---
  - id: color_temp_offset_r_get
    label: Color Temp Offset R Query
    kind: query
    command: "BE EF 03 06 00 04 F5 02 00 B5 30 00 00"
    params: []

  - id: color_temp_offset_r_increment
    label: Color Temp Offset R Increment
    kind: action
    command: "BE EF 03 06 00 62 F5 04 00 B5 30 00 00"
    params: []

  - id: color_temp_offset_r_decrement
    label: Color Temp Offset R Decrement
    kind: action
    command: "BE EF 03 06 00 B3 F4 05 00 B5 30 00 00"
    params: []

  - id: color_temp_offset_g_get
    label: Color Temp Offset G Query
    kind: query
    command: "BE EF 03 06 00 40 F5 02 00 B6 30 00 00"
    params: []

  - id: color_temp_offset_g_increment
    label: Color Temp Offset G Increment
    kind: action
    command: "BE EF 03 06 00 26 F5 04 00 B6 30 00 00"
    params: []

  - id: color_temp_offset_g_decrement
    label: Color Temp Offset G Decrement
    kind: action
    command: "BE EF 03 06 00 F7 F4 05 00 B6 30 00 00"
    params: []

  - id: color_temp_offset_b_get
    label: Color Temp Offset B Query
    kind: query
    command: "BE EF 03 06 00 BC F4 02 00 B7 30 00 00"
    params: []

  - id: color_temp_offset_b_increment
    label: Color Temp Offset B Increment
    kind: action
    command: "BE EF 03 06 00 DA F4 04 00 B7 30 00 00"
    params: []

  - id: color_temp_offset_b_decrement
    label: Color Temp Offset B Decrement
    kind: action
    command: "BE EF 03 06 00 0B F5 05 00 B7 30 00 00"
    params: []

  # --- COLOR ---
  - id: color_get
    label: Color Query
    kind: query
    command: "BE EF 03 06 00 B5 72 02 00 02 22 00 00"
    params: []

  - id: color_increment
    label: Color Increment
    kind: action
    command: "BE EF 03 06 00 D3 72 04 00 02 22 00 00"
    params: []

  - id: color_decrement
    label: Color Decrement
    kind: action
    command: "BE EF 03 06 00 02 73 05 00 02 22 00 00"
    params: []

  - id: color_reset
    label: Color Reset
    kind: action
    command: "BE EF 03 06 00 80 D0 06 00 0A 70 00 00"
    params: []

  # --- TINT ---
  - id: tint_get
    label: Tint Query
    kind: query
    command: "BE EF 03 06 00 49 73 02 00 03 22 00 00"
    params: []

  - id: tint_increment
    label: Tint Increment
    kind: action
    command: "BE EF 03 06 00 2F 73 04 00 03 22 00 00"
    params: []

  - id: tint_decrement
    label: Tint Decrement
    kind: action
    command: "BE EF 03 06 00 FE 72 05 00 03 22 00 00"
    params: []

  - id: tint_reset
    label: Tint Reset
    kind: action
    command: "BE EF 03 06 00 7C D1 06 00 0B 70 00 00"
    params: []

  # --- SHARPNESS ---
  - id: sharpness_get
    label: Sharpness Query
    kind: query
    command: "BE EF 03 06 00 F1 72 02 00 01 22 00 00"
    params: []

  - id: sharpness_increment
    label: Sharpness Increment
    kind: action
    command: "BE EF 03 06 00 97 72 04 00 01 22 00 00"
    params: []

  - id: sharpness_decrement
    label: Sharpness Decrement
    kind: action
    command: "BE EF 03 06 00 46 73 05 00 01 22 00 00"
    params: []

  - id: sharpness_reset
    label: Sharpness Reset
    kind: action
    command: "BE EF 03 06 00 C4 D0 06 00 09 70 00 00"
    params: []

  # --- MY MEMORY ---
  - id: my_memory_load_1
    label: My Memory Load 1
    kind: action
    command: "BE EF 03 06 00 0E D7 01 00 14 20 00 00"
    params: []

  - id: my_memory_load_2
    label: My Memory Load 2
    kind: action
    command: "BE EF 03 06 00 9E D6 01 00 14 20 01 00"
    params: []

  - id: my_memory_load_3
    label: My Memory Load 3
    kind: action
    command: "BE EF 03 06 00 6E D6 01 00 14 20 02 00"
    params: []

  - id: my_memory_load_4
    label: My Memory Load 4
    kind: action
    command: "BE EF 03 06 00 FE D7 01 00 14 20 03 00"
    params: []

  - id: my_memory_save_1
    label: My Memory Save 1
    kind: action
    command: "BE EF 03 06 00 F2 D6 01 00 15 20 00 00"
    params: []

  - id: my_memory_save_2
    label: My Memory Save 2
    kind: action
    command: "BE EF 03 06 00 62 D7 01 00 15 20 01 00"
    params: []

  - id: my_memory_save_3
    label: My Memory Save 3
    kind: action
    command: "BE EF 03 06 00 92 D7 01 00 15 20 02 00"
    params: []

  - id: my_memory_save_4
    label: My Memory Save 4
    kind: action
    command: "BE EF 03 06 00 02 D6 01 00 15 20 03 00"
    params: []

  # --- PROGRESSIVE ---
  - id: progressive_off
    label: Progressive TURN OFF
    kind: action
    command: "BE EF 03 06 00 4A 72 01 00 07 22 00 00"
    params: []

  - id: progressive_tv
    label: Progressive TV
    kind: action
    command: "BE EF 03 06 00 DA 73 01 00 07 22 01 00"
    params: []

  - id: progressive_film
    label: Progressive FILM
    kind: action
    command: "BE EF 03 06 00 2A 73 01 00 07 22 02 00"
    params: []

  - id: progressive_get
    label: Progressive Query
    kind: query
    command: "BE EF 03 06 00 79 72 02 00 07 22 00 00"
    params: []

  # --- VIDEO NR ---
  - id: video_nr_low
    label: Video NR LOW
    kind: action
    command: "BE EF 03 06 00 26 72 01 00 06 22 01 00"
    params: []

  - id: video_nr_mid
    label: Video NR MID
    kind: action
    command: "BE EF 03 06 00 D6 72 01 00 06 22 02 00"
    params: []

  - id: video_nr_high
    label: Video NR HIGH
    kind: action
    command: "BE EF 03 06 00 46 73 01 00 06 22 03 00"
    params: []

  - id: video_nr_get
    label: Video NR Query
    kind: query
    command: "BE EF 03 06 00 85 73 02 00 06 22 00 00"
    params: []

  # --- ASPECT ---
  - id: aspect_4_3
    label: Aspect 4:3
    kind: action
    command: "BE EF 03 06 00 9E D0 01 00 08 20 00 00"
    params: []

  - id: aspect_16_9
    label: Aspect 16:9
    kind: action
    command: "BE EF 03 06 00 0E D1 01 00 08 20 01 00"
    params: []

  - id: aspect_14_9
    label: Aspect 14:9
    kind: action
    command: "BE EF 03 06 00 CE D6 01 00 08 20 09 00"
    params: []

  - id: aspect_normal
    label: Aspect NORMAL
    kind: action
    command: "BE EF 03 06 00 5E DD 01 00 08 20 10 00"
    params: []

  - id: aspect_get
    label: Aspect Query
    kind: query
    command: "BE EF 03 06 00 AD D0 02 00 08 20 00 00"
    params: []

  # --- OVER SCAN ---
  - id: overscan_get
    label: Over Scan Query
    kind: query
    command: "BE EF 03 06 00 91 70 02 00 09 22 00 00"
    params: []

  - id: overscan_increment
    label: Over Scan Increment
    kind: action
    command: "BE EF 03 06 00 F7 70 04 00 09 22 00 00"
    params: []

  - id: overscan_decrement
    label: Over Scan Decrement
    kind: action
    command: "BE EF 03 06 00 26 71 05 00 09 22 00 00"
    params: []

  - id: overscan_reset
    label: Over Scan Reset
    kind: action
    command: "BE EF 03 06 00 EC D9 06 00 27 70 00 00"
    params: []

  # --- V POSITION ---
  - id: v_position_get
    label: V Position Query
    kind: query
    command: "BE EF 03 06 00 0D 83 02 00 00 21 00 00"
    params: []

  - id: v_position_increment
    label: V Position Increment
    kind: action
    command: "BE EF 03 06 00 6B 83 04 00 00 21 00 00"
    params: []

  - id: v_position_decrement
    label: V Position Decrement
    kind: action
    command: "BE EF 03 06 00 BA 82 05 00 00 21 00 00"
    params: []

  - id: v_position_reset
    label: V Position Reset
    kind: action
    command: "BE EF 03 06 00 E0 D2 06 00 02 70 00 00"
    params: []

  # --- H POSITION ---
  - id: h_position_get
    label: H Position Query
    kind: query
    command: "BE EF 03 06 00 F1 82 02 00 01 21 00 00"
    params: []

  - id: h_position_increment
    label: H Position Increment
    kind: action
    command: "BE EF 03 06 00 97 82 04 00 01 21 00 00"
    params: []

  - id: h_position_decrement
    label: H Position Decrement
    kind: action
    command: "BE EF 03 06 00 46 83 05 00 01 21 00 00"
    params: []

  - id: h_position_reset
    label: H Position Reset
    kind: action
    command: "BE EF 03 06 00 1C D3 06 00 03 70 00 00"
    params: []

  # --- H PHASE ---
  - id: h_phase_get
    label: H Phase Query
    kind: query
    command: "BE EF 03 06 00 49 83 02 00 03 21 00 00"
    params: []

  - id: h_phase_increment
    label: H Phase Increment
    kind: action
    command: "BE EF 03 06 00 2F 83 04 00 03 21 00 00"
    params: []

  - id: h_phase_decrement
    label: H Phase Decrement
    kind: action
    command: "BE EF 03 06 00 FE 82 05 00 03 21 00 00"
    params: []

  # --- H SIZE ---
  - id: h_size_get
    label: H Size Query
    kind: query
    command: "BE EF 03 06 00 B5 82 02 00 02 21 00 00"
    params: []

  - id: h_size_increment
    label: H Size Increment
    kind: action
    command: "BE EF 03 06 00 D3 82 04 00 02 21 00 00"
    params: []

  - id: h_size_decrement
    label: H Size Decrement
    kind: action
    command: "BE EF 03 06 00 02 83 05 00 02 21 00 00"
    params: []

  - id: h_size_reset
    label: H Size Reset
    kind: action
    command: "BE EF 03 06 00 68 D2 06 00 04 70 00 00"
    params: []

  # --- AUTO ADJUST ---
  - id: auto_adjust
    label: Auto Adjust Execute
    kind: action
    command: "BE EF 03 06 00 91 D0 06 00 0A 20 00 00"
    params: []

  # --- COLOR SPACE ---
  - id: color_space_auto
    label: Color Space AUTO
    kind: action
    command: "BE EF 03 06 00 0E 72 01 00 04 22 00 00"
    params: []

  - id: color_space_rgb
    label: Color Space RGB
    kind: action
    command: "BE EF 03 06 00 9E 73 01 00 04 22 01 00"
    params: []

  - id: color_space_smpte240
    label: Color Space SMPTE240
    kind: action
    command: "BE EF 03 06 00 6E 73 01 00 04 22 02 00"
    params: []

  - id: color_space_rec709
    label: Color Space REC709
    kind: action
    command: "BE EF 03 06 00 FE 72 01 00 04 22 03 00"
    params: []

  - id: color_space_rec601
    label: Color Space REC601
    kind: action
    command: "BE EF 03 06 00 CE 70 01 00 04 22 04 00"
    params: []

  - id: color_space_get
    label: Color Space Query
    kind: query
    command: "BE EF 03 06 00 3D 72 02 00 04 22 00 00"
    params: []

  # --- COMPONENT INPUT TYPE ---
  - id: component_set_component
    label: Component Input COMPONENT
    kind: action
    command: "BE EF 03 06 00 4A D7 01 00 17 20 00 00"
    params: []

  - id: component_set_scart_rgb
    label: Component Input SCART RGB
    kind: action
    command: "BE EF 03 06 00 DA D6 01 00 17 20 01 00"
    params: []

  - id: component_get
    label: Component Input Query
    kind: query
    command: "BE EF 03 06 00 79 D7 02 00 17 20 00 00"
    params: []

  # --- C-VIDEO FORMAT ---
  - id: cvideo_format_auto
    label: C-Video Format AUTO
    kind: action
    command: "BE EF 03 06 00 A2 70 01 00 11 22 0A 00"
    params: []

  - id: cvideo_format_ntsc
    label: C-Video Format NTSC
    kind: action
    command: "BE EF 03 06 00 C2 74 01 00 11 22 04 00"
    params: []

  - id: cvideo_format_pal
    label: C-Video Format PAL
    kind: action
    command: "BE EF 03 06 00 52 75 01 00 11 22 05 00"
    params: []

  - id: cvideo_format_secam
    label: C-Video Format SECAM
    kind: action
    command: "BE EF 03 06 00 52 70 01 00 11 22 09 00"
    params: []

  - id: cvideo_format_ntsc443
    label: C-Video Format NTSC4.43
    kind: action
    command: "BE EF 03 06 00 62 77 01 00 11 22 02 00"
    params: []

  - id: cvideo_format_m_pal
    label: C-Video Format M-PAL
    kind: action
    command: "BE EF 03 06 00 C2 71 01 00 11 22 08 00"
    params: []

  - id: cvideo_format_n_pal
    label: C-Video Format N-PAL
    kind: action
    command: "BE EF 03 06 00 32 74 01 00 11 22 07 00"
    params: []

  - id: cvideo_format_get
    label: C-Video Format Query
    kind: query
    command: "BE EF 03 06 00 31 76 02 00 11 22 00 00"
    params: []

  # --- S-VIDEO FORMAT ---
  - id: svideo_format_auto
    label: S-Video Format AUTO
    kind: action
    command: "BE EF 03 06 00 E6 70 01 00 12 22 0A 00"
    params: []

  - id: svideo_format_ntsc
    label: S-Video Format NTSC
    kind: action
    command: "BE EF 03 06 00 86 74 01 00 12 22 04 00"
    params: []

  - id: svideo_format_pal
    label: S-Video Format PAL
    kind: action
    command: "BE EF 03 06 00 16 75 01 00 12 22 05 00"
    params: []

  - id: svideo_format_secam
    label: S-Video Format SECAM
    kind: action
    command: "BE EF 03 06 00 16 70 01 00 12 22 09 00"
    params: []

  - id: svideo_format_ntsc443
    label: S-Video Format NTSC4.43
    kind: action
    command: "BE EF 03 06 00 26 77 01 00 12 22 02 00"
    params: []

  - id: svideo_format_m_pal
    label: S-Video Format M-PAL
    kind: action
    command: "BE EF 03 06 00 86 71 01 00 12 22 08 00"
    params: []

  - id: svideo_format_n_pal
    label: S-Video Format N-PAL
    kind: action
    command: "BE EF 03 06 00 76 74 01 00 12 22 07 00"
    params: []

  - id: svideo_format_get
    label: S-Video Format Query
    kind: query
    command: "BE EF 03 06 00 75 76 02 00 12 22 00 00"
    params: []

  # --- FRAME LOCK ---
  - id: frame_lock_computer1_off
    label: Frame Lock COMPUTER1 TURN OFF
    kind: action
    command: "BE EF 03 06 00 3B C2 01 00 50 30 00 00"
    params: []

  - id: frame_lock_computer1_on
    label: Frame Lock COMPUTER1 TURN ON
    kind: action
    command: "BE EF 03 06 00 AB C3 01 00 50 30 01 00"
    params: []

  - id: frame_lock_computer1_get
    label: Frame Lock COMPUTER1 Query
    kind: query
    command: "BE EF 03 06 00 08 C2 02 00 50 30 00 00"
    params: []

  - id: frame_lock_computer2_off
    label: Frame Lock COMPUTER2 TURN OFF
    kind: action
    command: "BE EF 03 06 00 0B C3 01 00 54 30 00 00"
    params: []

  - id: frame_lock_computer2_on
    label: Frame Lock COMPUTER2 TURN ON
    kind: action
    command: "BE EF 03 06 00 9B C2 01 00 54 30 01 00"
    params: []

  - id: frame_lock_computer2_get
    label: Frame Lock COMPUTER2 Query
    kind: query
    command: "BE EF 03 06 00 38 C3 02 00 54 30 00 00"
    params: []

  # --- COMPUTER IN ---
  - id: computer_in1_sync_on_g_on
    label: Computer IN1 Sync on G ON
    kind: action
    command: "BE EF 03 06 00 CE D6 01 00 10 20 03 00"
    params: []

  - id: computer_in1_sync_on_g_off
    label: Computer IN1 Sync on G OFF
    kind: action
    command: "BE EF 03 06 00 5E D7 01 00 10 20 02 00"
    params: []

  - id: computer_in1_get
    label: Computer IN1 Query
    kind: query
    command: "BE EF 03 06 00 0D D6 02 00 10 20 00 00"
    params: []

  - id: computer_in2_sync_on_g_on
    label: Computer IN2 Sync on G ON
    kind: action
    command: "BE EF 03 06 00 32 D7 01 00 11 20 03 00"
    params: []

  - id: computer_in2_sync_on_g_off
    label: Computer IN2 Sync on G OFF
    kind: action
    command: "BE EF 03 06 00 A2 D6 01 00 11 20 02 00"
    params: []

  - id: computer_in2_get
    label: Computer IN2 Query
    kind: query
    command: "BE EF 03 06 00 F1 D7 02 00 11 20 00 00"
    params: []

  # --- D-ZOOM ---
  - id: d_zoom_get
    label: D-Zoom Query
    kind: query
    command: "BE EF 03 06 00 D0 D0 02 00 0A 30 00 00"
    params: []

  - id: d_zoom_increment
    label: D-Zoom Increment
    kind: action
    command: "BE EF 03 06 00 B6 D0 04 00 0A 30 00 00"
    params: []

  - id: d_zoom_decrement
    label: D-Zoom Decrement
    kind: action
    command: "BE EF 03 06 00 67 D1 05 00 0A 30 00 00"
    params: []

  - id: d_zoom_reset
    label: D-Zoom Reset
    kind: action
    command: "BE EF 03 06 00 98 C9 06 00 70 70 00 00"
    params: []

  # --- D-SHIFT V ---
  - id: d_shift_v_get
    label: D-Shift V Query
    kind: query
    command: "BE EF 03 06 00 2C D1 02 00 0B 30 00 00"
    params: []

  - id: d_shift_v_increment
    label: D-Shift V Increment
    kind: action
    command: "BE EF 03 06 00 4A D1 04 00 0B 30 00 00"
    params: []

  - id: d_shift_v_decrement
    label: D-Shift V Decrement
    kind: action
    command: "BE EF 03 06 00 9B D0 05 00 0B 30 00 00"
    params: []

  - id: d_shift_v_reset
    label: D-Shift V Reset
    kind: action
    command: "BE EF 03 06 00 A8 C8 06 00 74 70 00 00"
    params: []

  # --- D-SHIFT H ---
  - id: d_shift_h_get
    label: D-Shift H Query
    kind: query
    command: "BE EF 03 06 00 58 D0 02 00 0C 30 00 00"
    params: []

  - id: d_shift_h_increment
    label: D-Shift H Increment
    kind: action
    command: "BE EF 03 06 00 3E D0 04 00 0C 30 00 00"
    params: []

  - id: d_shift_h_decrement
    label: D-Shift H Decrement
    kind: action
    command: "BE EF 03 06 00 EF D1 05 00 0C 30 00 00"
    params: []

  - id: d_shift_h_reset
    label: D-Shift H Reset
    kind: action
    command: "BE EF 03 06 00 54 C9 06 00 75 70 00 00"
    params: []

  # --- KEYSTONE V ---
  - id: keystone_v_get
    label: Keystone V Query
    kind: query
    command: "BE EF 03 06 00 B9 D3 02 00 07 20 00 00"
    params: []

  - id: keystone_v_increment
    label: Keystone V Increment
    kind: action
    command: "BE EF 03 06 00 DF D3 04 00 07 20 00 00"
    params: []

  - id: keystone_v_decrement
    label: Keystone V Decrement
    kind: action
    command: "BE EF 03 06 00 0E D2 05 00 07 20 00 00"
    params: []

  - id: keystone_v_reset
    label: Keystone V Reset
    kind: action
    command: "BE EF 03 06 00 08 D0 06 00 0C 70 00 00"
    params: []

  # --- WHISPER ---
  - id: whisper_bright
    label: Whisper BRIGHT
    kind: action
    command: "BE EF 03 06 00 3B 23 01 00 00 33 00 00"
    params: []

  - id: whisper_normal
    label: Whisper NORMAL
    kind: action
    command: "BE EF 03 06 00 AB 22 01 00 00 33 01 00"
    params: []

  - id: whisper_get
    label: Whisper Query
    kind: query
    command: "BE EF 03 06 00 08 23 02 00 00 33 00 00"
    params: []

  # --- MIRROR ---
  - id: mirror_normal
    label: Mirror NORMAL
    kind: action
    command: "BE EF 03 06 00 C7 D2 01 00 01 30 00 00"
    params: []

  - id: mirror_h_invert
    label: Mirror H:INVERT
    kind: action
    command: "BE EF 03 06 00 57 D3 01 00 01 30 01 00"
    params: []

  - id: mirror_v_invert
    label: Mirror V:INVERT
    kind: action
    command: "BE EF 03 06 00 A7 D3 01 00 01 30 02 00"
    params: []

  - id: mirror_hv_invert
    label: Mirror H&V:INVERT
    kind: action
    command: "BE EF 03 06 00 37 D2 01 00 01 30 03 00"
    params: []

  - id: mirror_get
    label: Mirror Query
    kind: query
    command: "BE EF 03 06 00 F4 D2 02 00 01 30 00 00"
    params: []

  # --- VOLUME PER INPUT ---
  - id: volume_computer1_get
    label: Volume COMPUTER1 Query
    kind: query
    command: "BE EF 03 06 00 CD CC 02 00 60 20 00 00"
    params: []

  - id: volume_computer1_increment
    label: Volume COMPUTER1 Increment
    kind: action
    command: "BE EF 03 06 00 AB CC 04 00 60 20 00 00"
    params: []

  - id: volume_computer1_decrement
    label: Volume COMPUTER1 Decrement
    kind: action
    command: "BE EF 03 06 00 7A CD 05 00 60 20 00 00"
    params: []

  - id: volume_computer2_get
    label: Volume COMPUTER2 Query
    kind: query
    command: "BE EF 03 06 00 FD CD 02 00 64 20 00 00"
    params: []

  - id: volume_computer2_increment
    label: Volume COMPUTER2 Increment
    kind: action
    command: "BE EF 03 06 00 9B CD 04 00 64 20 00 00"
    params: []

  - id: volume_computer2_decrement
    label: Volume COMPUTER2 Decrement
    kind: action
    command: "BE EF 03 06 00 4A CC 05 00 64 20 00 00"
    params: []

  - id: volume_component_get
    label: Volume COMPONENT Query
    kind: query
    command: "BE EF 03 06 00 01 CC 02 00 65 20 00 00"
    params: []

  - id: volume_component_increment
    label: Volume COMPONENT Increment
    kind: action
    command: "BE EF 03 06 00 67 CC 04 00 65 20 00 00"
    params: []

  - id: volume_component_decrement
    label: Volume COMPONENT Decrement
    kind: action
    command: "BE EF 03 06 00 B6 CD 05 00 65 20 00 00"
    params: []

  - id: volume_svideo_get
    label: Volume S-VIDEO Query
    kind: query
    command: "BE EF 03 06 00 75 CD 02 00 62 20 00 00"
    params: []

  - id: volume_svideo_increment
    label: Volume S-VIDEO Increment
    kind: action
    command: "BE EF 03 06 00 13 CD 04 00 62 20 00 00"
    params: []

  - id: volume_svideo_decrement
    label: Volume S-VIDEO Decrement
    kind: action
    command: "BE EF 03 06 00 C2 CC 05 00 62 20 00 00"
    params: []

  - id: volume_video_get
    label: Volume VIDEO Query
    kind: query
    command: "BE EF 03 06 00 31 CD 02 00 61 20 00 00"
    params: []

  - id: volume_video_increment
    label: Volume VIDEO Increment
    kind: action
    command: "BE EF 03 06 00 57 CD 04 00 61 20 00 00"
    params: []

  - id: volume_video_decrement
    label: Volume VIDEO Decrement
    kind: action
    command: "BE EF 03 06 00 86 CC 05 00 61 20 00 00"
    params: []

  # --- MUTE ---
  - id: mute_off
    label: Mute TURN OFF
    kind: action
    command: "BE EF 03 06 00 46 D3 01 00 02 20 00 00"
    params: []

  - id: mute_on
    label: Mute TURN ON
    kind: action
    command: "BE EF 03 06 00 D6 D2 01 00 02 20 01 00"
    params: []

  - id: mute_get
    label: Mute Query
    kind: query
    command: "BE EF 03 06 00 75 D3 02 00 02 20 00 00"
    params: []

  # --- SPEAKER ---
  - id: speaker_on
    label: Speaker TURN ON
    kind: action
    command: "BE EF 03 06 00 FE D4 01 00 1C 20 01 00"
    params: []

  - id: speaker_off
    label: Speaker TURN OFF
    kind: action
    command: "BE EF 03 06 00 6E D5 01 00 1C 20 00 00"
    params: []

  - id: speaker_get
    label: Speaker Query
    kind: query
    command: "BE EF 03 06 00 5D D5 02 00 1C 20 00 00"
    params: []

  # --- AUDIO INPUT PER VIDEO INPUT ---
  - id: audio_computer1_audio1
    label: Audio COMPUTER1 AUDIO1
    kind: action
    command: "BE EF 03 06 00 6E DC 01 00 30 20 01 00"
    params: []

  - id: audio_computer1_audio2
    label: Audio COMPUTER1 AUDIO2
    kind: action
    command: "BE EF 03 06 00 9E DC 01 00 30 20 02 00"
    params: []

  - id: audio_computer1_audio3
    label: Audio COMPUTER1 AUDIO3
    kind: action
    command: "BE EF 03 06 00 0E DD 01 00 30 20 03 00"
    params: []

  - id: audio_computer1_off
    label: Audio COMPUTER1 Turn Off
    kind: action
    command: "BE EF 03 06 00 FE DD 01 00 30 20 00 00"
    params: []

  - id: audio_computer1_get
    label: Audio COMPUTER1 Query
    kind: query
    command: "BE EF 03 06 00 CD DD 02 00 30 20 00 00"
    params: []

  - id: audio_computer2_audio1
    label: Audio COMPUTER2 AUDIO1
    kind: action
    command: "BE EF 03 06 00 5E DD 01 00 34 20 01 00"
    params: []

  - id: audio_computer2_audio2
    label: Audio COMPUTER2 AUDIO2
    kind: action
    command: "BE EF 03 06 00 AE DD 01 00 34 20 02 00"
    params: []

  - id: audio_computer2_audio3
    label: Audio COMPUTER2 AUDIO3
    kind: action
    command: "BE EF 03 06 00 3E DC 01 00 34 20 03 00"
    params: []

  - id: audio_computer2_off
    label: Audio COMPUTER2 Turn Off
    kind: action
    command: "BE EF 03 06 00 CE DC 01 00 34 20 00 00"
    params: []

  - id: audio_computer2_get
    label: Audio COMPUTER2 Query
    kind: query
    command: "BE EF 03 06 00 FD DC 02 00 34 20 00 00"
    params: []

  - id: audio_component_audio1
    label: Audio COMPONENT AUDIO1
    kind: action
    command: "BE EF 03 06 00 A2 DC 01 00 35 20 01 00"
    params: []

  - id: audio_component_audio2
    label: Audio COMPONENT AUDIO2
    kind: action
    command: "BE EF 03 06 00 52 DC 01 00 35 20 02 00"
    params: []

  - id: audio_component_audio3
    label: Audio COMPONENT AUDIO3
    kind: action
    command: "BE EF 03 06 00 C2 DD 01 00 35 20 03 00"
    params: []

  - id: audio_component_off
    label: Audio COMPONENT Turn Off
    kind: action
    command: "BE EF 03 06 00 32 DD 01 00 35 20 00 00"
    params: []

  - id: audio_component_get
    label: Audio COMPONENT Query
    kind: query
    command: "BE EF 03 06 00 01 DD 02 00 35 20 00 00"
    params: []

  - id: audio_svideo_audio1
    label: Audio S-VIDEO AUDIO1
    kind: action
    command: "BE EF 03 06 00 D6 DD 01 00 32 20 01 00"
    params: []

  - id: audio_svideo_audio2
    label: Audio S-VIDEO AUDIO2
    kind: action
    command: "BE EF 03 06 00 26 DD 01 00 32 20 02 00"
    params: []

  - id: audio_svideo_audio3
    label: Audio S-VIDEO AUDIO3
    kind: action
    command: "BE EF 03 06 00 B6 DC 01 00 32 20 03 00"
    params: []

  - id: audio_svideo_off
    label: Audio S-VIDEO Turn Off
    kind: action
    command: "BE EF 03 06 00 46 DC 01 00 32 20 00 00"
    params: []

  - id: audio_svideo_get
    label: Audio S-VIDEO Query
    kind: query
    command: "BE EF 03 06 00 75 DC 02 00 32 20 00 00"
    params: []

  - id: audio_video_audio1
    label: Audio VIDEO AUDIO1
    kind: action
    command: "BE EF 03 06 00 92 DD 01 00 31 20 01 00"
    params: []

  - id: audio_video_audio2
    label: Audio VIDEO AUDIO2
    kind: action
    command: "BE EF 03 06 00 62 DD 01 00 31 20 02 00"
    params: []

  - id: audio_video_audio3
    label: Audio VIDEO AUDIO3
    kind: action
    command: "BE EF 03 06 00 F2 DC 01 00 31 20 03 00"
    params: []

  - id: audio_video_off
    label: Audio VIDEO Turn Off
    kind: action
    command: "BE EF 03 06 00 02 DC 01 00 31 20 00 00"
    params: []

  - id: audio_video_get
    label: Audio VIDEO Query
    kind: query
    command: "BE EF 03 06 00 31 DC 02 00 31 20 00 00"
    params: []

  # --- REMOTE RECEIVE ---
  - id: remote_receive_front_off
    label: Remote Receive FRONT Off
    kind: action
    command: "BE EF 03 06 00 FF 32 01 00 00 26 00 00"
    params: []

  - id: remote_receive_front_on
    label: Remote Receive FRONT On
    kind: action
    command: "BE EF 03 06 00 6F 33 01 00 00 26 01 00"
    params: []

  - id: remote_receive_front_get
    label: Remote Receive FRONT Query
    kind: query
    command: "BE EF 03 06 00 CC 32 02 00 00 26 00 00"
    params: []

  - id: remote_receive_top_off
    label: Remote Receive TOP Off
    kind: action
    command: "BE EF 03 06 00 47 33 01 00 02 26 00 00"
    params: []

  - id: remote_receive_top_on
    label: Remote Receive TOP On
    kind: action
    command: "BE EF 03 06 00 D7 32 01 00 02 26 01 00"
    params: []

  - id: remote_receive_top_get
    label: Remote Receive TOP Query
    kind: query
    command: "BE EF 03 06 00 74 33 02 00 02 26 00 00"
    params: []

  # --- REMOTE FREQ ---
  - id: remote_freq_normal_off
    label: Remote Freq NORMAL Off
    kind: action
    command: "BE EF 03 06 00 FF 3D 01 00 30 26 00 00"
    params: []

  - id: remote_freq_normal_on
    label: Remote Freq NORMAL On
    kind: action
    command: "BE EF 03 06 00 6F 3C 01 00 30 26 01 00"
    params: []

  - id: remote_freq_normal_get
    label: Remote Freq NORMAL Query
    kind: query
    command: "BE EF 03 06 00 CC 3D 02 00 30 26 00 00"
    params: []

  - id: remote_freq_high_off
    label: Remote Freq HIGH Off
    kind: action
    command: "BE EF 03 06 00 03 3C 01 00 31 26 00 00"
    params: []

  - id: remote_freq_high_on
    label: Remote Freq HIGH On
    kind: action
    command: "BE EF 03 06 00 93 3D 01 00 31 26 01 00"
    params: []

  - id: remote_freq_high_get
    label: Remote Freq HIGH Query
    kind: query
    command: "BE EF 03 06 00 30 3C 02 00 31 26 00 00"
    params: []

  # --- LANGUAGE ---
  - id: language_english
    label: Language ENGLISH
    kind: action
    command: "BE EF 03 06 00 F7 D3 01 00 05 30 00 00"
    params: []

  - id: language_francais
    label: Language FRANÇAIS
    kind: action
    command: "BE EF 03 06 00 67 D2 01 00 05 30 01 00"
    params: []

  - id: language_deutsch
    label: Language DEUTSCH
    kind: action
    command: "BE EF 03 06 00 97 D2 01 00 05 30 02 00"
    params: []

  - id: language_espanol
    label: Language ESPAÑOL
    kind: action
    command: "BE EF 03 06 00 07 D3 01 00 05 30 03 00"
    params: []

  - id: language_italiano
    label: Language ITALIANO
    kind: action
    command: "BE EF 03 06 00 37 D1 01 00 05 30 04 00"
    params: []

  - id: language_norsk
    label: Language NORSK
    kind: action
    command: "BE EF 03 06 00 A7 D0 01 00 05 30 05 00"
    params: []

  - id: language_nederlands
    label: Language NEDERLANDS
    kind: action
    command: "BE EF 03 06 00 57 D0 01 00 05 30 06 00"
    params: []

  - id: language_portugues
    label: Language PORTUGUÊS
    kind: action
    command: "BE EF 03 06 00 C7 D1 01 00 05 30 07 00"
    params: []

  - id: language_svenska
    label: Language SVENSKA
    kind: action
    command: "BE EF 03 06 00 C7 D4 01 00 05 30 0B 00"
    params: []

  - id: language_russian
    label: Language PУCCKИЙ
    kind: action
    command: "BE EF 03 06 00 F7 D6 01 00 05 30 0C 00"
    params: []

  - id: language_suomi
    label: Language SUOMI
    kind: action
    command: "BE EF 03 06 00 67 D7 01 00 05 30 0D 00"
    params: []

  - id: language_polski
    label: Language POLSKI
    kind: action
    command: "BE EF 03 06 00 97 D7 01 00 05 30 0E 00"
    params: []

  - id: language_turkce
    label: Language TÜRKÇE
    kind: action
    command: "BE EF 03 06 00 07 D6 01 00 05 30 0F 00"
    params: []

  - id: language_get
    label: Language Query
    kind: query
    command: "BE EF 03 06 00 C4 D3 02 00 05 30 00 00"
    params: []

  # --- MENU POSITION ---
  - id: menu_position_h_get
    label: Menu Position H Query
    kind: query
    command: "BE EF 03 06 00 04 D7 02 00 15 30 00 00"
    params: []

  - id: menu_position_h_increment
    label: Menu Position H Increment
    kind: action
    command: "BE EF 03 06 00 62 D7 04 00 15 30 00 00"
    params: []

  - id: menu_position_h_decrement
    label: Menu Position H Decrement
    kind: action
    command: "BE EF 03 06 00 B3 D6 05 00 15 30 00 00"
    params: []

  - id: menu_position_h_reset
    label: Menu Position H Reset
    kind: action
    command: "BE EF 03 06 00 DC C6 06 00 43 70 00 00"
    params: []

  - id: menu_position_v_get
    label: Menu Position V Query
    kind: query
    command: "BE EF 03 06 00 40 D7 02 00 16 30 00 00"
    params: []

  - id: menu_position_v_increment
    label: Menu Position V Increment
    kind: action
    command: "BE EF 03 06 00 26 D7 04 00 16 30 00 00"
    params: []

  - id: menu_position_v_decrement
    label: Menu Position V Decrement
    kind: action
    command: "BE EF 03 06 00 F7 D6 05 00 16 30 00 00"
    params: []

  - id: menu_position_v_reset
    label: Menu Position V Reset
    kind: action
    command: "BE EF 03 06 00 A8 C7 06 00 44 70 00 00"
    params: []

  # --- BLANK ---
  - id: blank_myscreen
    label: Blank MyScreen
    kind: action
    command: "BE EF 03 06 00 FB CA 01 00 00 30 20 00"
    params: []

  - id: blank_original
    label: Blank ORIGINAL
    kind: action
    command: "BE EF 03 06 00 FB E2 01 00 00 30 40 00"
    params: []

  - id: blank_blue
    label: Blank BLUE
    kind: action
    command: "BE EF 03 06 00 CB D3 01 00 00 30 03 00"
    params: []

  - id: blank_white
    label: Blank WHITE
    kind: action
    command: "BE EF 03 06 00 6B D0 01 00 00 30 05 00"
    params: []

  - id: blank_black
    label: Blank BLACK
    kind: action
    command: "BE EF 03 06 00 9B D0 01 00 00 30 06 00"
    params: []

  - id: blank_type_get
    label: Blank Type Query
    kind: query
    command: "BE EF 03 06 00 08 D3 02 00 00 30 00 00"
    params: []

  # --- BLANK ON/OFF ---
  - id: blank_off
    label: Blank TURN OFF
    kind: action
    command: "BE EF 03 06 00 FB D8 01 00 20 30 00 00"
    params: []

  - id: blank_on
    label: Blank TURN ON
    kind: action
    command: "BE EF 03 06 00 6B D9 01 00 20 30 01 00"
    params: []

  - id: blank_onoff_get
    label: Blank On/Off Query
    kind: query
    command: "BE EF 03 06 00 C8 D8 02 00 20 30 00 00"
    params: []

  # --- START UP ---
  - id: startup_myscreen
    label: Start Up MyScreen
    kind: action
    command: "BE EF 03 06 00 CB CB 01 00 04 30 20 00"
    params: []

  - id: startup_original
    label: Start Up ORIGINAL
    kind: action
    command: "BE EF 03 06 00 0B D2 01 00 04 30 00 00"
    params: []

  - id: startup_off
    label: Start Up TURN OFF
    kind: action
    command: "BE EF 03 06 00 9B D3 01 00 04 30 01 00"
    params: []

  - id: startup_get
    label: Start Up Query
    kind: query
    command: "BE EF 03 06 00 38 D2 02 00 04 30 00 00"
    params: []

  # --- MYSCREEN LOCK ---
  - id: myscreen_lock_off
    label: MyScreen Lock TURN OFF
    kind: action
    command: "BE EF 03 06 00 3B EF 01 00 C0 30 00 00"
    params: []

  - id: myscreen_lock_on
    label: MyScreen Lock TURN ON
    kind: action
    command: "BE EF 03 06 00 AB EE 01 00 C0 30 01 00"
    params: []

  - id: myscreen_lock_get
    label: MyScreen Lock Query
    kind: query
    command: "BE EF 03 06 00 08 EF 02 00 C0 30 00 00"
    params: []

  # --- MESSAGE ---
  - id: message_off
    label: Message TURN OFF
    kind: action
    command: "BE EF 03 06 00 8F D6 01 00 17 30 00 00"
    params: []

  - id: message_on
    label: Message TURN ON
    kind: action
    command: "BE EF 03 06 00 1F D7 01 00 17 30 01 00"
    params: []

  - id: message_get
    label: Message Query
    kind: query
    command: "BE EF 03 06 00 BC D6 02 00 17 30 00 00"
    params: []

  # --- AUTO SEARCH ---
  - id: auto_search_off
    label: Auto Search TURN OFF
    kind: action
    command: "BE EF 03 06 00 B6 D6 01 00 16 20 00 00"
    params: []

  - id: auto_search_on
    label: Auto Search TURN ON
    kind: action
    command: "BE EF 03 06 00 26 D7 01 00 16 20 01 00"
    params: []

  - id: auto_search_get
    label: Auto Search Query
    kind: query
    command: "BE EF 03 06 00 85 D6 02 00 16 20 00 00"
    params: []

  # --- AUTO ON ---
  - id: auto_on_off
    label: Auto On TURN OFF
    kind: action
    command: "BE EF 03 06 00 3B 89 01 00 20 31 00 00"
    params: []

  - id: auto_on_on
    label: Auto On TURN ON
    kind: action
    command: "BE EF 03 06 00 AB 88 01 00 20 31 01 00"
    params: []

  - id: auto_on_get
    label: Auto On Query
    kind: query
    command: "BE EF 03 06 00 08 89 02 00 20 31 00 00"
    params: []

  # --- AUTO OFF ---
  - id: auto_off_get
    label: Auto Off Query
    kind: query
    command: "BE EF 03 06 00 08 86 02 00 10 31 00 00"
    params: []

  - id: auto_off_increment
    label: Auto Off Increment
    kind: action
    command: "BE EF 03 06 00 6E 86 04 00 10 31 00 00"
    params: []

  - id: auto_off_decrement
    label: Auto Off Decrement
    kind: action
    command: "BE EF 03 06 00 BF 87 05 00 10 31 00 00"
    params: []

  # --- LAMP TIME ---
  - id: lamp_time_get
    label: Lamp Time Query
    kind: query
    command: "BE EF 03 06 00 C2 FF 02 00 90 10 00 00"
    params: []

  - id: lamp_time_reset
    label: Lamp Time Reset
    kind: action
    command: "BE EF 03 06 00 58 DC 06 00 30 70 00 00"
    params: []

  # --- FILTER TIME ---
  - id: filter_time_get
    label: Filter Time Query
    kind: query
    command: "BE EF 03 06 00 C2 F0 02 00 A0 10 00 00"
    params: []

  - id: filter_time_reset
    label: Filter Time Reset
    kind: action
    command: "BE EF 03 06 00 98 C6 06 00 40 70 00 00"
    params: []

  # --- MY BUTTON-1 ---
  - id: my_button_1_computer1
    label: My Button-1 COMPUTER1
    kind: action
    command: "BE EF 03 06 00 3A 33 01 00 00 36 00 00"
    params: []

  - id: my_button_1_computer2
    label: My Button-1 COMPUTER2
    kind: action
    command: "BE EF 03 06 00 FA 31 01 00 00 36 04 00"
    params: []

  - id: my_button_1_component
    label: My Button-1 COMPONENT
    kind: action
    command: "BE EF 03 06 00 6A 30 01 00 00 36 05 00"
    params: []

  - id: my_button_1_svideo
    label: My Button-1 S-VIDEO
    kind: action
    command: "BE EF 03 06 00 5A 32 01 00 00 36 02 00"
    params: []

  - id: my_button_1_video
    label: My Button-1 VIDEO
    kind: action
    command: "BE EF 03 06 00 AA 32 01 00 00 36 01 00"
    params: []

  - id: my_button_1_information
    label: My Button-1 INFORMATION
    kind: action
    command: "BE EF 03 06 00 FA 3E 01 00 00 36 10 00"
    params: []

  - id: my_button_1_my_memory
    label: My Button-1 MY MEMORY
    kind: action
    command: "BE EF 03 06 00 9A 3F 01 00 00 36 12 00"
    params: []

  - id: my_button_1_picture_mode
    label: My Button-1 PICTURE MODE
    kind: action
    command: "BE EF 03 06 00 0A 3E 01 00 00 36 13 00"
    params: []

  - id: my_button_1_filter_reset
    label: My Button-1 FILTER RESET
    kind: action
    command: "BE EF 03 06 00 3A 3C 01 00 00 36 14 00"
    params: []

  - id: my_button_1_e_shot
    label: My Button-1 e-SHOT
    kind: action
    command: "BE EF 03 06 00 5A 3D 01 00 00 36 16 00"
    params: []

  - id: my_button_1_volume_up
    label: My Button-1 VOLUME +
    kind: action
    command: "BE EF 03 06 00 CA 3C 01 00 00 36 17 00"
    params: []

  - id: my_button_1_volume_down
    label: My Button-1 VOLUME -
    kind: action
    command: "BE EF 03 06 00 3A 39 01 00 00 36 18 00"
    params: []

  - id: my_button_1_av_mute
    label: My Button-1 AV MUTE
    kind: action
    command: "BE EF 03 06 00 AA 38 01 00 00 36 19 00"
    params: []

  - id: my_button_1_get
    label: My Button-1 Query
    kind: query
    command: "BE EF 03 06 00 09 33 02 00 00 36 00 00"
    params: []

  # --- MY BUTTON-2 ---
  - id: my_button_2_computer1
    label: My Button-2 COMPUTER1
    kind: action
    command: "BE EF 03 06 00 C6 32 01 00 01 36 00 00"
    params: []

  - id: my_button_2_computer2
    label: My Button-2 COMPUTER2
    kind: action
    command: "BE EF 03 06 00 06 30 01 00 01 36 04 00"
    params: []

  - id: my_button_2_component
    label: My Button-2 COMPONENT
    kind: action
    command: "BE EF 03 06 00 96 31 01 00 01 36 05 00"
    params: []

  - id: my_button_2_svideo
    label: My Button-2 S-VIDEO
    kind: action
    command: "BE EF 03 06 00 A6 33 01 00 01 36 02 00"
    params: []

  - id: my_button_2_video
    label: My Button-2 VIDEO
    kind: action
    command: "BE EF 03 06 00 56 33 01 00 01 36 01 00"
    params: []

  - id: my_button_2_information
    label: My Button-2 INFORMATION
    kind: action
    command: "BE EF 03 06 00 06 3F 01 00 01 36 10 00"
    params: []

  - id: my_button_2_my_memory
    label: My Button-2 MY MEMORY
    kind: action
    command: "BE EF 03 06 00 66 3E 01 00 01 36 12 00"
    params: []

  - id: my_button_2_picture_mode
    label: My Button-2 PICTURE MODE
    kind: action
    command: "BE EF 03 06 00 F6 3F 01 00 01 36 13 00"
    params: []

  - id: my_button_2_filter_reset
    label: My Button-2 FILTER RESET
    kind: action
    command: "BE EF 03 06 00 C6 3D 01 00 01 36 14 00"
    params: []

  - id: my_button_2_e_shot
    label: My Button-2 e-SHOT
    kind: action
    command: "BE EF 03 06 00 A6 3C 01 00 01 36 16 00"
    params: []

  - id: my_button_2_volume_up
    label: My Button-2 VOLUME +
    kind: action
    command: "BE EF 03 06 00 36 3D 01 00 01 36 17 00"
    params: []

  - id: my_button_2_volume_down
    label: My Button-2 VOLUME -
    kind: action
    command: "BE EF 03 06 00 C6 38 01 00 01 36 18 00"
    params: []

  - id: my_button_2_av_mute
    label: My Button-2 AV MUTE
    kind: action
    command: "BE EF 03 06 00 56 39 01 00 01 36 19 00"
    params: []

  - id: my_button_2_get
    label: My Button-2 Query
    kind: query
    command: "BE EF 03 06 00 F5 32 02 00 01 36 00 00"
    params: []

  # --- MAGNIFY ---
  - id: magnify_get
    label: Magnify Query
    kind: query
    command: "BE EF 03 06 00 7C D2 02 00 07 30 00 00"
    params: []

  - id: magnify_increment
    label: Magnify Increment
    kind: action
    command: "BE EF 03 06 00 1A D2 04 00 07 30 00 00"
    params: []

  - id: magnify_decrement
    label: Magnify Decrement
    kind: action
    command: "BE EF 03 06 00 CB D3 05 00 07 30 00 00"
    params: []

  # --- FREEZE ---
  - id: freeze_normal
    label: Freeze NORMAL
    kind: action
    command: "BE EF 03 06 00 83 D2 01 00 02 30 00 00"
    params: []

  - id: freeze_on
    label: Freeze FREEZE
    kind: action
    command: "BE EF 03 06 00 13 D3 01 00 02 30 01 00"
    params: []

  - id: freeze_get
    label: Freeze Query
    kind: query
    command: "BE EF 03 06 00 B0 D2 02 00 02 30 00 00"
    params: []

  # --- e-SHOT ---
  - id: e_shot_off
    label: e-SHOT OFF
    kind: action
    command: "BE EF 03 06 00 3A C3 01 00 00 35 00 00"
    params: []

  - id: e_shot_image1
    label: e-SHOT IMAGE1
    kind: action
    command: "BE EF 03 06 00 AA C2 01 00 00 35 01 00"
    params: []

  - id: e_shot_image2
    label: e-SHOT IMAGE2
    kind: action
    command: "BE EF 03 06 00 5A C2 01 00 00 35 02 00"
    params: []

  - id: e_shot_image3
    label: e-SHOT IMAGE3
    kind: action
    command: "BE EF 03 06 00 CA C3 01 00 00 35 03 00"
    params: []

  - id: e_shot_image4
    label: e-SHOT IMAGE4
    kind: action
    command: "BE EF 03 06 00 FA C1 01 00 00 35 04 00"
    params: []

  - id: e_shot_get
    label: e-SHOT Query
    kind: query
    command: "BE EF 03 06 00 09 C3 02 00 00 35 00 00"
    params: []

  - id: e_shot_image1_delete
    label: e-SHOT IMAGE1 Delete
    kind: action
    command: "BE EF 03 06 00 71 C3 06 00 01 35 00 00"
    params: []

  - id: e_shot_image2_delete
    label: e-SHOT IMAGE2 Delete
    kind: action
    command: "BE EF 03 06 00 35 C3 06 00 02 35 00 00"
    params: []

  - id: e_shot_image3_delete
    label: e-SHOT IMAGE3 Delete
    kind: action
    command: "BE EF 03 06 00 C9 C2 06 00 03 35 00 00"
    params: []

  - id: e_shot_image4_delete
    label: e-SHOT IMAGE4 Delete
    kind: action
    command: "BE EF 03 06 00 BD C3 06 00 04 35 00 00"
    params: []

  # --- CLOSED CAPTION ---
  - id: closed_caption_display_off
    label: Closed Caption Display TURN OFF
    kind: action
    command: "BE EF 03 06 00 FA 62 01 00 00 37 00 00"
    params: []

  - id: closed_caption_display_on
    label: Closed Caption Display TURN ON
    kind: action
    command: "BE EF 03 06 00 6A 63 01 00 00 37 01 00"
    params: []

  - id: closed_caption_display_auto
    label: Closed Caption Display AUTO
    kind: action
    command: "BE EF 03 06 00 9A 63 01 00 00 37 02 00"
    params: []

  - id: closed_caption_display_get
    label: Closed Caption Display Query
    kind: query
    command: "BE EF 03 06 00 C9 62 02 00 00 37 00 00"
    params: []

  - id: closed_caption_mode_captions
    label: Closed Caption Mode CAPTIONS
    kind: action
    command: "BE EF 03 06 00 06 63 01 00 01 37 00 00"
    params: []

  - id: closed_caption_mode_text
    label: Closed Caption Mode TEXT
    kind: action
    command: "BE EF 03 06 00 96 62 01 00 01 37 01 00"
    params: []

  - id: closed_caption_mode_get
    label: Closed Caption Mode Query
    kind: query
    command: "BE EF 03 06 00 35 63 02 00 01 37 00 00"
    params: []

  - id: closed_caption_channel_1
    label: Closed Caption Channel 1
    kind: action
    command: "BE EF 03 06 00 D2 62 01 00 02 37 01 00"
    params: []

  - id: closed_caption_channel_2
    label: Closed Caption Channel 2
    kind: action
    command: "BE EF 03 06 00 22 62 01 00 02 37 02 00"
    params: []

  - id: closed_caption_channel_3
    label: Closed Caption Channel 3
    kind: action
    command: "BE EF 03 06 00 B2 63 01 00 02 37 03 00"
    params: []

  - id: closed_caption_channel_4
    label: Closed Caption Channel 4
    kind: action
    command: "BE EF 03 06 00 82 61 01 00 02 37 04 00"
    params: []

  - id: closed_caption_channel_get
    label: Closed Caption Channel Query
    kind: query
    command: "BE EF 03 06 00 71 63 02 00 02 37 00 00"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [off, on, cooldown]
    description: "Response to power_get: 00 00=Off, 01 00=On, 02 00=Cooldown"

  - id: error_status
    type: enum
    values:
      - normal
      - cover_error
      - fan_error
      - lamp_error
      - temp_error
      - air_flow_error
      - lamp_time_error
      - cold_error
      - filter_error
      - lens_door_error
    description: "Response to error_status_get. Values: 00 00=Normal, 01 00=Cover error, 02 00=Fan error, 03 00=Lamp error, 04 00=Temp error, 05 00=Air flow error, 06 00=Lamp time error, 07 00=Cold error, 08 00=Filter error, 0C 00=Lens door error"

  - id: input_source
    type: enum
    values: [computer1, computer2, component, svideo, video]

  - id: picture_mode
    type: enum
    values: [normal, cinema, dynamic, custom, board_black, board_green, whiteboard, daytime]

  - id: command_error
    type: enum
    values: [unknown_command, cannot_execute, auth_error]
    description: "Error replies: 15H=unknown command, 1CH+xxxxH=cannot execute, 1FH+0400H=auth error"
```

## Variables
```yaml
# UNRESOLVED: source does not document value ranges for increment/decrement parameters
# All adjustments use increment/decrement actions rather than absolute set values
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from projector
# Source notes projector outputs test data at power-on and lamp-ignite - should be ignored
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Source states: commands not accepted during warm-up.
  Minimum 40ms interval required between response and next command.
  Projector outputs test data at power-on and lamp-ignite - ignore this data.
  Turn off projector and computer before connecting/disconnecting RS-232C cable.
# UNRESOLVED: no explicit safety interlocks or confirmation requirements stated in source
```

## Notes

- Protocol uses fixed 13-byte frames: header `BE EF 03 06 00 CRC_low CRC_high` + command data (6 bytes).
- CRC is computed over command data only; each command row has a pre-computed CRC baked in.
- Action byte values: 01=Set, 02=Get, 04=Increment, 05=Decrement, 06=Execute (Reset).
- Get response format: `1DH` + data (2 bytes). Error responses: `15H` (unknown), `1CH + xxxxH` (cannot execute).
- TCP#9715 wraps commands with additional framing: `02` (header) + `0D` (data length) + [13 bytes command] + checksum + connection ID.
- TCP#9715 auto-disconnects after 30 seconds of inactivity.
- TCP#9715 authentication: MD5 challenge-response (concatenate random 8 bytes + password, MD5 digest, prepend to command).
- TCP#23 default auth: disabled. TCP#9715 default auth: enabled. Same password for both ports.
- RS-232C uses cross (null modem) cable. Connector: D-sub 9-pin with RTS/CTS pins.

<!-- UNRESOLVED: no Set command for brightness/contrast/sharpness — only increment/decrement -->
<!-- UNRESOLVED: flow control setting not explicitly stated (RTS/CTS hardware pins present) -->
<!-- UNRESOLVED: warm-up duration not specified -->
<!-- UNRESOLVED: value ranges for increment/decrement parameters not documented -->

## Provenance

```yaml
source_domains:
  - support.maxellproav.com
source_urls:
  - https://support.maxellproav.com/wp-content/uploads/Support/OG/Hitachi_ED-A100_UM_Technical.pdf
retrieved_at: 2026-04-30T04:24:57.970Z
last_checked_at: 2026-06-02T17:22:32.242Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:32.242Z
matched_actions: 381
action_count: 381
confidence: medium
summary: "All 381 spec commands matched verbatim hex sequences in source table; transport parameters (19200, 8N1, ports 23/9715, auth settings) confirmed in source. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated"
- "no web/REST API command tables in source — only RS-232C and TCP command control"
- "flow_control not explicitly stated; RTS/CTS pins present on connector"
- "source lists TCP #23 and TCP #9715; no single default port"
- "source does not document value ranges for increment/decrement parameters"
- "source does not document unsolicited notifications from projector"
- "source does not document multi-step command sequences"
- "no explicit safety interlocks or confirmation requirements stated in source"
- "no Set command for brightness/contrast/sharpness — only increment/decrement"
- "flow control setting not explicitly stated (RTS/CTS hardware pins present)"
- "warm-up duration not specified"
- "value ranges for increment/decrement parameters not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
