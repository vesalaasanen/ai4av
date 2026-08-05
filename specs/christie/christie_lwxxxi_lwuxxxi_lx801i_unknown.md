---
spec_id: admin/christie-lwxxxi-lwuxxxi-lx801i
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie LWxxxi / LWUxxxi / LX801i Control Spec"
manufacturer: Christie
model_family: "Christie LW751i-D"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "Christie LW751i-D"
    - "Christie LW651i-D"
    - "Christie LWU601i-D"
    - "Christie LWU701i-D"
    - "Christie LX801i-D"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - res.cloudinary.com
  - qed-productions.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000161-02-christie-tech-guid-lw650_ls700_lx750_lw720-.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Christie-Terra-External-Control-Protocol-XY-Switcher-API.pdf"
  - https://www.christiedigital.com/globalassets/resources/public/020-102271-04-christie-lit-tech-ref-gs-700-850-api.pdf
  - https://qed-productions.com/downloads/christie/serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000789-02-christie-lit-man-usr-d-series-tech-guid.pdf
retrieved_at: 2026-07-25T07:32:33.433Z
last_checked_at: 2026-08-05T08:16:06.547Z
generated_at: 2026-08-05T08:16:06.547Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - POWR
  - "POWR?"
  - INPT
  - "INPT?"
  - AVMT
  - "AVMT?"
  - "ERST?"
  - "LAMP?"
  - "INST?"
  - "NAME?"
  - "INF1?"
  - "INF2?"
  - "source document is the LX750 tech reference; LX801i has a dedicated protocol doc (020-102128-03) that was not retrieved — coverage gaps for LX801i-specific behaviour are possible."
  - "firmware version compatibility not stated in source."
  - "voltage / power / lamp wattage specs not in source (refined doc covers protocol only)."
  - "flow control not stated in source; pinout shows CTS wired but no RTS pin"
  - "source contains no interlock/confirmation procedures"
  - "no power-sequencing, lamp-shutdown, or thermal-interlock procedures"
  - "LX801i dedicated protocol doc (020-102128-03) not retrieved — may document LX801i-specific extensions."
  - "CRC algorithm not stated; per-row values are authoritative."
  - "exact D-Series model ↔ source-doc model mapping for ASPECT and LANGUAGE variant availability."
  - "baud rate for standalone (non-daisy-chain) RS-232C fixed at 19200 per source; daisy-chain allows 4800–38400."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:16:06.547Z
  matched_actions: 614
  action_count: 614
  confidence: medium
  summary: "All 614 spec hex frames appear verbatim in the source BE EF command table; transport values match the source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Christie LWxxxi / LWUxxxi / LX801i Control Spec

## Summary
Christie D-Series LCD projectors (LW751i-D, LW651i-D, LWU601i-D, LWU701i-D, LX801i-D) with dual control interfaces: RS-232C serial and TCP/IP network. This spec covers the binary BE EF framed protocol used over both transports, the daisy-chain extension, and the PJLink Class 1 overlay. The command catalogue (set/get/increment/decrement/execute across ~140 setting types) is enumerated in `## Actions` and `## Feedbacks`.

<!-- UNRESOLVED: source document is the LX750 tech reference; LX801i has a dedicated protocol doc (020-102128-03) that was not retrieved — coverage gaps for LX801i-specific behaviour are possible. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: voltage / power / lamp wattage specs not in source (refined doc covers protocol only). -->

## Transport

Device supports three concurrent control surfaces. RS-232C and TCP #23 share an identical binary frame; TCP #9715 wraps that frame with a length/checksum/connection-ID envelope; PJLink runs as a separate ASCII protocol (not enumerated here).

```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source; pinout shows CTS wired but no RTS pin
addressing:
  ports:
    - 23     # Network Control Port1 (binary BE EF frame, same as RS-232C)
    - 9715   # Network Control Port2 (length-prefixed envelope around BE EF frame)
auth:
  type: optional  # source documents MD5 challenge-response; default disabled on port 23, default enabled on port 9715
  notes: |
    When enabled, projector sends random 8 bytes; client MD5(random8 || password) and prepends 16-byte digest to first command of the session. Subsequent commands on same connection may omit digest. Auth password shared across both TCP ports; PJLink reuses the same password.
```

**RS-232C pinout (D-sub 9, female on projector):** pin 2 = RD, pin 3 = TD, pin 5 = GND, pin 8 = CTS. Pins 1, 4, 6, 9 no connection. Pin 7 blank in source.

**Frame format (RS-232C and TCP #23):** 7-byte header `BE EF 03 06 00 CRC_low CRC_high` + 6-byte command data. Command data = Action (2 bytes, little-endian) + Type (2 bytes) + Setting Code (2 bytes). Action codes: `01`=SET, `02`=GET, `04`=INCREMENT, `05`=DECREMENT, `06`=EXECUTE. CRC bytes cover the 6-byte command data; the CRC polynomial/seed is not stated in the source — values are listed per-row in the command table and are merged into `## Actions` verbatim.

**TCP #9715 envelope:** `02 <len=0D> <13-byte BE EF command> <checksum> <connection_id>`. Checksum = low 8 bits such that header+data+checksum sums to zero. Connection ID is a client-chosen 0–255 echo value. Connection auto-breaks after 30 s of inactivity.

**Response codes (RS-232C and TCP #23):** `06H` ACK (success), `15H` NAK (unparseable — resend), `1CH`+error (cannot execute), `1DH`+data (GET reply), `1FH 0400H` (auth error, TCP only).

**Response codes (TCP #9715):** same as above with `xxH` connection ID appended; busy reply `1FH`+`xxxxH`+`xxH`.

**Daisy-chain (RS-232C multi-drop):** header uses `BE EF <Packet_Type> 06 <Group> <ID> <Checksum>`; Packet_Type `83H` control/status, `84H` count, `85H`/`86H` set/get Group+ID. Group 0/ID 0 = broadcast. Daisy-chain baud selectable 4800/9600/19200/38400, parity NONE/ODD/EVEN, 8 data bits, 1 start, 1 stop.

**Timing:** source mandates ≥40 ms gap between response and next command. Commands rejected during warm-up. Projector emits test data at power-on and lamp-strike — ignore.

## Traits
```yaml
traits:
  - powerable     # inferred: power on/off SET commands present
  - queryable     # inferred: GET action code documented + ~124 query feedbacks
  - levelable     # inferred: brightness/contrast/iris/keystone/etc. increment/decrement
  - routable      # inferred: input source select + monitor-out routing matrix
```

## Actions
```yaml
# All payloads are verbatim hex byte sequences from the source. Bytes use
# the source's "NNh" notation; {NAME} tokens are parameters substituted at
# send time. No bytes are reformatted from the source.

- id: power_set_off
  label: "Power Set OFF"
  kind: action
  command: "BE EF 03 06 00 2A D3 01 00 00 60 00 00"
  params: []

- id: power_set_on
  label: "Power Set ON"
  kind: action
  command: "BE EF 03 06 00 BA D2 01 00 00 60 01 00"
  params: []

- id: input_source_set_computer_in_1
  label: "Input Source Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 FE D2 01 00 00 20 00 00"
  params: []

- id: input_source_set_computer_in_2
  label: "Input Source Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 3E D0 01 00 00 20 04 00"
  params: []

- id: input_source_set_hdmi
  label: "Input Source Set HDMI"
  kind: action
  command: "BE EF 03 06 00 0E D2 01 00 00 20 03 00"
  params: []

- id: input_source_set_video_1
  label: "Input Source Set VIDEO 1"
  kind: action
  command: "BE EF 03 06 00 6E D3 01 00 00 20 01 00"
  params: []

- id: input_source_set_s_video
  label: "Input Source Set S-VIDEO"
  kind: action
  command: "BE EF 03 06 00 9E D3 01 00 00 20 02 00"
  params: []

- id: input_source_set_component
  label: "Input Source Set COMPONENT"
  kind: action
  command: "BE EF 03 06 00 AE D1 01 00 00 20 05 00"
  params: []

- id: input_source_set_bnc
  label: "Input Source Set BNC"
  kind: action
  command: "BE EF 03 06 00 CE D0 01 00 00 20 07 00"
  params: []

- id: input_source_set_dvi_d
  label: "Input Source Set DVI-D"
  kind: action
  command: "BE EF 03 06 00 AE D4 01 00 00 20 09 00"
  params: []

- id: input_source_set_video_2
  label: "Input Source Set VIDEO 2"
  kind: action
  command: "BE EF 03 06 00 5E D4 01 00 00 20 0A 00"
  params: []

- id: brightness_increment
  label: "BRIGHTNESS Increment"
  kind: action
  command: "BE EF 03 06 00 EF D2 04 00 03 20 00 00"
  params: []

- id: brightness_decrement
  label: "BRIGHTNESS Decrement"
  kind: action
  command: "BE EF 03 06 00 3E D3 05 00 03 20 00 00"
  params: []

- id: contrast_increment
  label: "CONTRAST Increment"
  kind: action
  command: "BE EF 03 06 00 9B D3 04 00 04 20 00 00"
  params: []

- id: contrast_decrement
  label: "CONTRAST Decrement"
  kind: action
  command: "BE EF 03 06 00 4A D2 05 00 04 20 00 00"
  params: []

- id: picture_mode_set_normal
  label: "PICTURE MODE Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 23 F6 01 00 BA 30 00 00"
  params: []

- id: picture_mode_set_cinema
  label: "PICTURE MODE Set CINEMA"
  kind: action
  command: "BE EF 03 06 00 B3 F7 01 00 BA 30 01 00"
  params: []

- id: picture_mode_set_dynamic
  label: "PICTURE MODE Set DYNAMIC"
  kind: action
  command: "BE EF 03 06 00 E3 F4 01 00 BA 30 04 00"
  params: []

- id: picture_mode_set_boardblack
  label: "PICTURE MODE Set BOARD(BLACK)"
  kind: action
  command: "BE EF 03 06 00 E3 EF 01 00 BA 30 20 00"
  params: []

- id: picture_mode_set_boardgreen
  label: "PICTURE MODE Set BOARD(GREEN)"
  kind: action
  command: "BE EF 03 06 00 73 EE 01 00 BA 30 21 00"
  params: []

- id: picture_mode_set_white_board
  label: "PICTURE MODE Set WHITE BOARD"
  kind: action
  command: "BE EF 03 06 00 83 EE 01 00 BA 30 22 00"
  params: []

- id: picture_mode_set_day_time
  label: "PICTURE MODE Set DAY TIME"
  kind: action
  command: "BE EF 03 06 00 E3 C7 01 00 BA 30 40 00"
  params: []

- id: picture_mode_set_custom
  label: "PICTURE MODE Set CUSTOM"
  kind: action
  command: "BE EF 03 06 00 E3 FB 01 00 BA 30 10 00"
  params: []

- id: gamma_set_1_default
  label: "GAMMA Set 1 DEFAULT"
  kind: action
  command: "BE EF 03 06 00 07 E9 01 00 A1 30 20 00"
  params: []

- id: gamma_set_2_default
  label: "GAMMA Set 2 DEFAULT"
  kind: action
  command: "BE EF 03 06 00 97 E8 01 00 A1 30 21 00"
  params: []

- id: gamma_set_3_default
  label: "GAMMA Set 3 DEFAULT"
  kind: action
  command: "BE EF 03 06 00 67 E8 01 00 A1 30 22 00"
  params: []

- id: gamma_set_4_default
  label: "GAMMA Set 4 DEFAULT"
  kind: action
  command: "BE EF 03 06 00 F7 E9 01 00 A1 30 23 00"
  params: []

- id: gamma_set_5_default
  label: "GAMMA Set 5 DEFAULT"
  kind: action
  command: "BE EF 03 06 00 C7 EB 01 00 A1 30 24 00"
  params: []

- id: gamma_set_6_default
  label: "GAMMA Set 6 DEFAULT"
  kind: action
  command: "BE EF 03 06 00 57 EA 01 00 A1 30 25 00"
  params: []

- id: gamma_set_1_custom
  label: "GAMMA Set 1 CUSTOM"
  kind: action
  command: "BE EF 03 06 00 07 FD 01 00 A1 30 10 00"
  params: []

- id: gamma_set_2_custom
  label: "GAMMA Set 2 CUSTOM"
  kind: action
  command: "BE EF 03 06 00 97 FC 01 00 A1 30 11 00"
  params: []

- id: gamma_set_3_custom
  label: "GAMMA Set 3 CUSTOM"
  kind: action
  command: "BE EF 03 06 00 67 FC 01 00 A1 30 12 00"
  params: []

- id: gamma_set_4_custom
  label: "GAMMA Set 4 CUSTOM"
  kind: action
  command: "BE EF 03 06 00 F7 FD 01 00 A1 30 13 00"
  params: []

- id: gamma_set_5_custom
  label: "GAMMA Set 5 CUSTOM"
  kind: action
  command: "BE EF 03 06 00 C7 FF 01 00 A1 30 14 00"
  params: []

- id: gamma_set_6_custom
  label: "GAMMA Set 6 CUSTOM"
  kind: action
  command: "BE EF 03 06 00 57 FE 01 00 A1 30 15 00"
  params: []

- id: user_gamma_pattern_set_off
  label: "User Gamma Pattern Set Off"
  kind: action
  command: "BE EF 03 06 00 FB FA 01 00 80 30 00 00"
  params: []

- id: user_gamma_pattern_set_9step_gray_scale
  label: "User Gamma Pattern Set 9step GrayScale"
  kind: action
  command: "BE EF 03 06 00 6B FB 01 00 80 30 01 00"
  params: []

- id: user_gamma_pattern_set_15step_gray_scale
  label: "User Gamma Pattern Set 15step GrayScale"
  kind: action
  command: "BE EF 03 06 00 9B FB 01 00 80 30 02 00"
  params: []

- id: user_gamma_pattern_set_ramp
  label: "User Gamma Pattern Set Ramp"
  kind: action
  command: "BE EF 03 06 00 0B FA 01 00 80 30 03 00"
  params: []

- id: user_gamma_point_1_set_increment
  label: "User Gamma Point 1 Set Increment"
  kind: action
  command: "BE EF 03 06 00 6E FE 04 00 90 30 00 00"
  params: []

- id: user_gamma_point_1_set_decrement
  label: "User Gamma Point 1 Set Decrement"
  kind: action
  command: "BE EF 03 06 00 BF FF 05 00 90 30 00 00"
  params: []

- id: user_gamma_point_2_set_increment
  label: "User Gamma Point 2 Set Increment"
  kind: action
  command: "BE EF 03 06 00 92 FF 04 00 91 30 00 00"
  params: []

- id: user_gamma_point_2_set_decrement
  label: "User Gamma Point 2 Set Decrement"
  kind: action
  command: "BE EF 03 06 00 43 FE 05 00 91 30 00 00"
  params: []

- id: user_gamma_point_3_set_increment
  label: "User Gamma Point 3 Set Increment"
  kind: action
  command: "BE EF 03 06 00 D6 FF 04 00 92 30 00 00"
  params: []

- id: user_gamma_point_3_set_decrement
  label: "User Gamma Point 3 Set Decrement"
  kind: action
  command: "BE EF 03 06 00 07 FE 05 00 92 30 00 00"
  params: []

- id: user_gamma_point_4_set_increment
  label: "User Gamma Point 4 Set Increment"
  kind: action
  command: "BE EF 03 06 00 2A FE 04 00 93 30 00 00"
  params: []

- id: user_gamma_point_4_set_decrement
  label: "User Gamma Point 4 Set Decrement"
  kind: action
  command: "BE EF 03 06 00 FB FF 05 00 93 30 00 00"
  params: []

- id: user_gamma_point_5_set_increment
  label: "User Gamma Point 5 Set Increment"
  kind: action
  command: "BE EF 03 06 00 5E FF 04 00 94 30 00 00"
  params: []

- id: user_gamma_point_5_set_decrement
  label: "User Gamma Point 5 Set Decrement"
  kind: action
  command: "BE EF 03 06 00 8F FE 05 00 94 30 00 00"
  params: []

- id: user_gamma_point_6_set_increment
  label: "User Gamma Point 6 Set Increment"
  kind: action
  command: "BE EF 03 06 00 A2 FE 04 00 95 30 00 00"
  params: []

- id: user_gamma_point_6_set_decrement
  label: "User Gamma Point 6 Set Decrement"
  kind: action
  command: "BE EF 03 06 00 73 FF 05 00 95 30 00 00"
  params: []

- id: user_gamma_point_7_set_increment
  label: "User Gamma Point 7 Set Increment"
  kind: action
  command: "BE EF 03 06 00 E6 FE 04 00 96 30 00 00"
  params: []

- id: user_gamma_point_7_set_decrement
  label: "User Gamma Point 7 Set Decrement"
  kind: action
  command: "BE EF 03 06 00 37 FF 05 00 96 30 00 00"
  params: []

- id: user_gamma_point_8_set_increment
  label: "User Gamma Point 8 Set Increment"
  kind: action
  command: "BE EF 03 06 00 1A FF 04 00 97 30 00 00"
  params: []

- id: user_gamma_point_8_set_decrement
  label: "User Gamma Point 8 Set Decrement"
  kind: action
  command: "BE EF 03 06 00 CB FE 05 00 97 30 00 00"
  params: []

- id: color_temp_set_1_high
  label: "COLOR TEMP Set 1 HIGH"
  kind: action
  command: "BE EF 03 06 00 0B F5 01 00 B0 30 03 00"
  params: []

- id: color_temp_set_2_mid
  label: "COLOR TEMP Set 2 MID"
  kind: action
  command: "BE EF 03 06 00 9B F4 01 00 B0 30 02 00"
  params: []

- id: color_temp_set_3_low
  label: "COLOR TEMP Set 3 LOW"
  kind: action
  command: "BE EF 03 06 00 6B F4 01 00 B0 30 01 00"
  params: []

- id: color_temp_set_4_hi_bright_1
  label: "COLOR TEMP Set 4 Hi-BRIGHT-1"
  kind: action
  command: "BE EF 03 06 00 3B F2 01 00 B0 30 08 00"
  params: []

- id: color_temp_set_5_hi_bright_2
  label: "COLOR TEMP Set 5 Hi-BRIGHT-2"
  kind: action
  command: "BE EF 03 06 00 AB F3 01 00 B0 30 09 00"
  params: []

- id: color_temp_set_6_hi_bright_3
  label: "COLOR TEMP Set 6 Hi-BRIGHT-3"
  kind: action
  command: "BE EF 03 06 00 5B F3 01 00 B0 30 0A 00"
  params: []

- id: color_temp_set_1_customhigh
  label: "COLOR TEMP Set 1 CUSTOM(HIGH)"
  kind: action
  command: "BE EF 03 06 00 CB F8 01 00 B0 30 13 00"
  params: []

- id: color_temp_set_2_custommid
  label: "COLOR TEMP Set 2 CUSTOM(MID)"
  kind: action
  command: "BE EF 03 06 00 5B F9 01 00 B0 30 12 00"
  params: []

- id: color_temp_set_3_customlow
  label: "COLOR TEMP Set 3 CUSTOM(LOW)"
  kind: action
  command: "BE EF 03 06 00 AB F9 01 00 B0 30 11 00"
  params: []

- id: color_temp_set_4_custom_hi_bright_1
  label: "COLOR TEMP Set 4 CUSTOM (Hi-BRIGHT-1)"
  kind: action
  command: "BE EF 03 06 00 FB FF 01 00 B0 30 18 00"
  params: []

- id: color_temp_set_5_custom_hi_bright_2
  label: "COLOR TEMP Set 5 CUSTOM (Hi-BRIGHT-2)"
  kind: action
  command: "BE EF 03 06 00 6B FE 01 00 B0 30 19 00"
  params: []

- id: color_temp_set_6_custom_hi_bright_3
  label: "COLOR TEMP Set 6 CUSTOM (Hi-BRIGHT-3)"
  kind: action
  command: "BE EF 03 06 00 9B FE 01 00 B0 30 1A 00"
  params: []

- id: color_temp_gain_r_set_increment
  label: "COLOR TEMP GAIN R Set Increment"
  kind: action
  command: "BE EF 03 06 00 52 F4 04 00 B1 30 00 00"
  params: []

- id: color_temp_gain_r_set_decrement
  label: "COLOR TEMP GAIN R Set Decrement"
  kind: action
  command: "BE EF 03 06 00 83 F5 05 00 B1 30 00 00"
  params: []

- id: color_temp_gain_g_set_increment
  label: "COLOR TEMP GAIN G Set Increment"
  kind: action
  command: "BE EF 03 06 00 16 F4 04 00 B2 30 00 00"
  params: []

- id: color_temp_gain_g_set_decrement
  label: "COLOR TEMP GAIN G Set Decrement"
  kind: action
  command: "BE EF 03 06 00 C7 F5 05 00 B2 30 00 00"
  params: []

- id: color_temp_gain_b_set_increment
  label: "COLOR TEMP GAIN B Set Increment"
  kind: action
  command: "BE EF 03 06 00 EA F5 04 00 B3 30 00 00"
  params: []

- id: color_temp_gain_b_set_decrement
  label: "COLOR TEMP GAIN B Set Decrement"
  kind: action
  command: "BE EF 03 06 00 3B F4 05 00 B3 30 00 00"
  params: []

- id: color_temp_offset_r_set_increment
  label: "COLOR TEMP OFFSET R Set Increment"
  kind: action
  command: "BE EF 03 06 00 62 F5 04 00 B5 30 00 00"
  params: []

- id: color_temp_offset_r_set_decrement
  label: "COLOR TEMP OFFSET R Set Decrement"
  kind: action
  command: "BE EF 03 06 00 B3 F4 05 00 B5 30 00 00"
  params: []

- id: color_temp_offset_g_set_increment
  label: "COLOR TEMP OFFSET G Set Increment"
  kind: action
  command: "BE EF 03 06 00 26 F5 04 00 B6 30 00 00"
  params: []

- id: color_temp_offset_g_set_decrement
  label: "COLOR TEMP OFFSET G Set Decrement"
  kind: action
  command: "BE EF 03 06 00 F7 F4 05 00 B6 30 00 00"
  params: []

- id: color_temp_offset_b_set_increment
  label: "COLOR TEMP OFFSET B Set Increment"
  kind: action
  command: "BE EF 03 06 00 DA F4 04 00 B7 30 00 00"
  params: []

- id: color_temp_offset_b_set_decrement
  label: "COLOR TEMP OFFSET B Set Decrement"
  kind: action
  command: "BE EF 03 06 00 0B F5 05 00 B7 30 00 00"
  params: []

- id: color_set_increment
  label: "COLOR Set Increment"
  kind: action
  command: "BE EF 03 06 00 D3 72 04 00 02 22 00 00"
  params: []

- id: color_set_decrement
  label: "COLOR Set Decrement"
  kind: action
  command: "BE EF 03 06 00 02 73 05 00 02 22 00 00"
  params: []

- id: color_reset_set_execute
  label: "COLOR Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 80 D0 06 00 0A 70 00 00"
  params: []

- id: tint_set_increment
  label: "TINT Set Increment"
  kind: action
  command: "BE EF 03 06 00 2F 73 04 00 03 22 00 00"
  params: []

- id: tint_set_decrement
  label: "TINT Set Decrement"
  kind: action
  command: "BE EF 03 06 00 FE 72 05 00 03 22 00 00"
  params: []

- id: tint_reset_set_execute
  label: "TINT Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 7C D1 06 00 0B 70 00 00"
  params: []

- id: sharpness_set_increment
  label: "SHARPNESS Set Increment"
  kind: action
  command: "BE EF 03 06 00 97 72 04 00 01 22 00 00"
  params: []

- id: sharpness_set_decrement
  label: "SHARPNESS Set Decrement"
  kind: action
  command: "BE EF 03 06 00 46 73 05 00 01 22 00 00"
  params: []

- id: sharpness_reset_set_execute
  label: "SHARPNESS Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 C4 D0 06 00 09 70 00 00"
  params: []

- id: active_iris_set_presentation
  label: "ACTIVE IRIS Set PRESENTATION"
  kind: action
  command: "BE EF 03 06 00 5B 2E 01 00 04 33 11 00"
  params: []

- id: active_iris_set_theater
  label: "ACTIVE IRIS Set THEATER"
  kind: action
  command: "BE EF 03 06 00 CB 2F 01 00 04 33 10 00"
  params: []

- id: active_iris_set_manual
  label: "ACTIVE IRIS Set MANUAL"
  kind: action
  command: "BE EF 03 06 00 CB 3B 01 00 04 33 20 00"
  params: []

- id: manual_iris_set_increment
  label: "MANUAL IRIS Set Increment"
  kind: action
  command: "BE EF 03 06 00 D6 22 04 00 02 33 00 00"
  params: []

- id: manual_iris_set_decrement
  label: "MANUAL IRIS Set Decrement"
  kind: action
  command: "BE EF 03 06 00 07 23 05 00 02 33 00 00"
  params: []

- id: my_memory_load_set_1
  label: "MY MEMORY Load Set 1"
  kind: action
  command: "BE EF 03 06 00 0E D7 01 00 14 20 00 00"
  params: []

- id: my_memory_load_set_2
  label: "MY MEMORY Load Set 2"
  kind: action
  command: "BE EF 03 06 00 9E D6 01 00 14 20 01 00"
  params: []

- id: my_memory_load_set_3
  label: "MY MEMORY Load Set 3"
  kind: action
  command: "BE EF 03 06 00 6E D6 01 00 14 20 02 00"
  params: []

- id: my_memory_load_set_4
  label: "MY MEMORY Load Set 4"
  kind: action
  command: "BE EF 03 06 00 FE D7 01 00 14 20 03 00"
  params: []

- id: my_memory_save_set_1
  label: "MY MEMORY Save Set 1"
  kind: action
  command: "BE EF 03 06 00 F2 D6 01 00 15 20 00 00"
  params: []

- id: my_memory_save_set_2
  label: "MY MEMORY Save Set 2"
  kind: action
  command: "BE EF 03 06 00 62 D7 01 00 15 20 01 00"
  params: []

- id: my_memory_save_set_3
  label: "MY MEMORY Save Set 3"
  kind: action
  command: "BE EF 03 06 00 92 D7 01 00 15 20 02 00"
  params: []

- id: my_memory_save_set_4
  label: "MY MEMORY Save Set 4"
  kind: action
  command: "BE EF 03 06 00 02 D6 01 00 15 20 03 00"
  params: []

- id: progressive_set_off
  label: "PROGRESSIVE Set OFF"
  kind: action
  command: "BE EF 03 06 00 4A 72 01 00 07 22 00 00"
  params: []

- id: progressive_set_tv
  label: "PROGRESSIVE Set TV"
  kind: action
  command: "BE EF 03 06 00 DA 73 01 00 07 22 01 00"
  params: []

- id: progressive_set_film
  label: "PROGRESSIVE Set FILM"
  kind: action
  command: "BE EF 03 06 00 2A 73 01 00 07 22 02 00"
  params: []

- id: 3_d_ycs_set_off
  label: "3D-YCS Set OFF"
  kind: action
  command: "BE EF 03 06 00 E6 70 01 00 0A 22 00 00"
  params: []

- id: 3_d_ycs_set_movie
  label: "3D-YCS Set MOVIE"
  kind: action
  command: "BE EF 03 06 00 76 71 01 00 0A 22 01 00"
  params: []

- id: 3_d_ycs_set_still_image
  label: "3D-YCS Set STILL IMAGE"
  kind: action
  command: "BE EF 03 06 00 86 71 01 00 0A 22 02 00"
  params: []

- id: video_nr_set_low
  label: "VIDEO NR Set LOW"
  kind: action
  command: "BE EF 03 06 00 26 72 01 00 06 22 01 00"
  params: []

- id: video_nr_set_mid
  label: "VIDEO NR Set MID"
  kind: action
  command: "BE EF 03 06 00 D6 72 01 00 06 22 02 00"
  params: []

- id: video_nr_set_high
  label: "VIDEO NR Set HIGH"
  kind: action
  command: "BE EF 03 06 00 46 73 01 00 06 22 03 00"
  params: []

- id: aspect_set_normal
  label: "ASPECT Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 5E DD 01 00 08 20 10 00"
  params: []

- id: aspect_set_4_3
  label: "ASPECT Set 4:3"
  kind: action
  command: "BE EF 03 06 00 9E D0 01 00 08 20 00 00"
  params: []

- id: aspect_set_16_9
  label: "ASPECT Set 16:9"
  kind: action
  command: "BE EF 03 06 00 0E D1 01 00 08 20 01 00"
  params: []

- id: aspect_set_16_10_*3
  label: "ASPECT Set 16:10 *3"
  kind: action
  command: "BE EF 03 06 00 3E D6 01 00 08 20 0A 00"
  params: []

- id: aspect_set_14_9
  label: "ASPECT Set 14:9"
  kind: action
  command: "BE EF 03 06 00 CE D6 01 00 08 20 09 00"
  params: []

- id: aspect_set_small_*1
  label: "ASPECT Set SMALL *1"
  kind: action
  command: "BE EF 03 06 00 FE D1 01 00 08 20 02 00"
  params: []

- id: aspect_set_native_*2
  label: "ASPECT Set NATIVE *2"
  kind: action
  command: "BE EF 03 06 00 5E D7 01 00 08 20 08 00"
  params: []

- id: aspect_set_full_*3
  label: "ASPECT Set FULL *3"
  kind: action
  command: "BE EF 03 06 00 5E C9 01 00 08 20 20 00"
  params: []

- id: over_scan_set_increment
  label: "OVER SCAN Set Increment"
  kind: action
  command: "BE EF 03 06 00 F7 70 04 00 09 22 00 00"
  params: []

- id: over_scan_set_decrement
  label: "OVER SCAN Set Decrement"
  kind: action
  command: "BE EF 03 06 00 26 71 05 00 09 22 00 00"
  params: []

- id: over_scan_reset_set_execute
  label: "OVER SCAN Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 EC D9 06 00 27 70 00 00"
  params: []

- id: v_position_set_increment
  label: "V POSITION Set Increment"
  kind: action
  command: "BE EF 03 06 00 6B 83 04 00 00 21 00 00"
  params: []

- id: v_position_set_decrement
  label: "V POSITION Set Decrement"
  kind: action
  command: "BE EF 03 06 00 BA 82 05 00 00 21 00 00"
  params: []

- id: v_position_reset_set_execute
  label: "V POSITION Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 E0 D2 06 00 02 70 00 00"
  params: []

- id: h_position_set_increment
  label: "H POSITION Set Increment"
  kind: action
  command: "BE EF 03 06 00 97 82 04 00 01 21 00 00"
  params: []

- id: h_position_set_decrement
  label: "H POSITION Set Decrement"
  kind: action
  command: "BE EF 03 06 00 46 83 05 00 01 21 00 00"
  params: []

- id: h_position_reset_set_execute
  label: "H POSITION Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 1C D3 06 00 03 70 00 00"
  params: []

- id: h_phase_set_increment
  label: "H PHASE Set Increment"
  kind: action
  command: "BE EF 03 06 00 2F 83 04 00 03 21 00 00"
  params: []

- id: h_phase_set_decrement
  label: "H PHASE Set Decrement"
  kind: action
  command: "BE EF 03 06 00 FE 82 05 00 03 21 00 00"
  params: []

- id: h_size_set_increment
  label: "H SIZE Set Increment"
  kind: action
  command: "BE EF 03 06 00 D3 82 04 00 02 21 00 00"
  params: []

- id: h_size_set_decrement
  label: "H SIZE Set Decrement"
  kind: action
  command: "BE EF 03 06 00 02 83 05 00 02 21 00 00"
  params: []

- id: h_size_reset_set_execute
  label: "H SIZE Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 68 D2 06 00 04 70 00 00"
  params: []

- id: auto_adjust_set_execute
  label: "AUTO ADJUST Set Execute"
  kind: action
  command: "BE EF 03 06 00 91 D0 06 00 0A 20 00 00"
  params: []

- id: color_space_set_auto
  label: "COLOR SPACE Set AUTO"
  kind: action
  command: "BE EF 03 06 00 0E 72 01 00 04 22 00 00"
  params: []

- id: color_space_set_rgb
  label: "COLOR SPACE Set RGB"
  kind: action
  command: "BE EF 03 06 00 9E 73 01 00 04 22 01 00"
  params: []

- id: color_space_set_smpte240
  label: "COLOR SPACE Set SMPTE240"
  kind: action
  command: "BE EF 03 06 00 6E 73 01 00 04 22 02 00"
  params: []

- id: color_space_set_rec709
  label: "COLOR SPACE Set REC709"
  kind: action
  command: "BE EF 03 06 00 FE 72 01 00 04 22 03 00"
  params: []

- id: color_space_set_rec601
  label: "COLOR SPACE Set REC601"
  kind: action
  command: "BE EF 03 06 00 CE 70 01 00 04 22 04 00"
  params: []

- id: component_set_component
  label: "COMPONENT Set COMPONENT"
  kind: action
  command: "BE EF 03 06 00 4A D7 01 00 17 20 00 00"
  params: []

- id: component_set_scart_rgb
  label: "COMPONENT Set SCART RGB"
  kind: action
  command: "BE EF 03 06 00 DA D6 01 00 17 20 01 00"
  params: []

- id: s_video_format_set_auto
  label: "S-VIDEO FORMAT Set AUTO"
  kind: action
  command: "BE EF 03 06 00 E6 70 01 00 12 22 0A 00"
  params: []

- id: s_video_format_set_ntsc
  label: "S-VIDEO FORMAT Set NTSC"
  kind: action
  command: "BE EF 03 06 00 86 74 01 00 12 22 04 00"
  params: []

- id: s_video_format_set_pal
  label: "S-VIDEO FORMAT Set PAL"
  kind: action
  command: "BE EF 03 06 00 16 75 01 00 12 22 05 00"
  params: []

- id: s_video_format_set_secam
  label: "S-VIDEO FORMAT Set SECAM"
  kind: action
  command: "BE EF 03 06 00 16 70 01 00 12 22 09 00"
  params: []

- id: s_video_format_set_ntsc4_43
  label: "S-VIDEO FORMAT Set NTSC4.43"
  kind: action
  command: "BE EF 03 06 00 26 77 01 00 12 22 02 00"
  params: []

- id: s_video_format_set_m_pal
  label: "S-VIDEO FORMAT Set M-PAL"
  kind: action
  command: "BE EF 03 06 00 86 71 01 00 12 22 08 00"
  params: []

- id: s_video_format_set_n_pal
  label: "S-VIDEO FORMAT Set N-PAL"
  kind: action
  command: "BE EF 03 06 00 76 74 01 00 12 22 07 00"
  params: []

- id: video_1_format_set_auto
  label: "VIDEO 1 FORMAT Set AUTO"
  kind: action
  command: "BE EF 03 06 00 A2 70 01 00 11 22 0A 00"
  params: []

- id: video_1_format_set_ntsc
  label: "VIDEO 1 FORMAT Set NTSC"
  kind: action
  command: "BE EF 03 06 00 C2 74 01 00 11 22 04 00"
  params: []

- id: video_1_format_set_pal
  label: "VIDEO 1 FORMAT Set PAL"
  kind: action
  command: "BE EF 03 06 00 52 75 01 00 11 22 05 00"
  params: []

- id: video_1_format_set_secam
  label: "VIDEO 1 FORMAT Set SECAM"
  kind: action
  command: "BE EF 03 06 00 52 70 01 00 11 22 09 00"
  params: []

- id: video_1_format_set_ntsc4_43
  label: "VIDEO 1 FORMAT Set NTSC4.43"
  kind: action
  command: "BE EF 03 06 00 62 77 01 00 11 22 02 00"
  params: []

- id: video_1_format_set_m_pal
  label: "VIDEO 1 FORMAT Set M-PAL"
  kind: action
  command: "BE EF 03 06 00 C2 71 01 00 11 22 08 00"
  params: []

- id: video_1_format_set_n_pal
  label: "VIDEO 1 FORMAT Set N-PAL"
  kind: action
  command: "BE EF 03 06 00 32 74 01 00 11 22 07 00"
  params: []

- id: video_2_format_set_auto
  label: "VIDEO 2 FORMAT Set AUTO"
  kind: action
  command: "BE EF 03 06 00 86 72 01 00 1A 22 0A 00"
  params: []

- id: video_2_format_set_ntsc
  label: "VIDEO 2 FORMAT Set NTSC"
  kind: action
  command: "BE EF 03 06 00 E6 76 01 00 1A 22 04 00"
  params: []

- id: video_2_format_set_pal
  label: "VIDEO 2 FORMAT Set PAL"
  kind: action
  command: "BE EF 03 06 00 76 77 01 00 1A 22 05 00"
  params: []

- id: video_2_format_set_secam
  label: "VIDEO 2 FORMAT Set SECAM"
  kind: action
  command: "BE EF 03 06 00 76 72 01 00 1A 22 09 00"
  params: []

- id: video_2_format_set_ntsc4_43
  label: "VIDEO 2 FORMAT Set NTSC4.43"
  kind: action
  command: "BE EF 03 06 00 46 75 01 00 1A 22 02 00"
  params: []

- id: video_2_format_set_m_pal
  label: "VIDEO 2 FORMAT Set M-PAL"
  kind: action
  command: "BE EF 03 06 00 E6 73 01 00 1A 22 08 00"
  params: []

- id: video_2_format_set_n_pal
  label: "VIDEO 2 FORMAT Set N-PAL"
  kind: action
  command: "BE EF 03 06 00 16 76 01 00 1A 22 07 00"
  params: []

- id: hdmi_format_set_auto
  label: "HDMI FORMAT Set AUTO"
  kind: action
  command: "BE EF 03 06 00 BA 77 01 00 13 22 00 00"
  params: []

- id: hdmi_format_set_video
  label: "HDMI FORMAT Set VIDEO"
  kind: action
  command: "BE EF 03 06 00 2A 76 01 00 13 22 01 00"
  params: []

- id: hdmi_format_set_computer
  label: "HDMI FORMAT Set COMPUTER"
  kind: action
  command: "BE EF 03 06 00 DA 76 01 00 13 22 02 00"
  params: []

- id: dvi_d_format_set_auto
  label: "DVI-D FORMAT Set AUTO"
  kind: action
  command: "BE EF 03 06 00 62 74 01 00 19 22 00 00"
  params: []

- id: dvi_d_format_set_video
  label: "DVI-D FORMAT Set VIDEO"
  kind: action
  command: "BE EF 03 06 00 F2 75 01 00 19 22 01 00"
  params: []

- id: dvi_d_format_set_computer
  label: "DVI-D FORMAT Set COMPUTER"
  kind: action
  command: "BE EF 03 06 00 02 75 01 00 19 22 02 00"
  params: []

- id: hdmi_range_set_auto
  label: "HDMI RANGE Set AUTO"
  kind: action
  command: "BE EF 03 06 00 86 D8 01 00 22 20 00 00"
  params: []

- id: hdmi_range_set_normal
  label: "HDMI RANGE Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 16 D9 01 00 22 20 01 00"
  params: []

- id: hdmi_range_set_enhanced
  label: "HDMI RANGE Set ENHANCED"
  kind: action
  command: "BE EF 03 06 00 E6 D9 01 00 22 20 02 00"
  params: []

- id: dvi_d_range_set_auto
  label: "DVI-D RANGE Set AUTO"
  kind: action
  command: "BE EF 03 06 00 FE D4 01 00 20 20 10 00"
  params: []

- id: dvi_d_range_set_normal
  label: "DVI-D RANGE Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 3E D9 01 00 20 20 00 00"
  params: []

- id: dvi_d_range_set_enhanced
  label: "DVI-D RANGE Set ENHANCED"
  kind: action
  command: "BE EF 03 06 00 AE D8 01 00 20 20 01 00"
  params: []

- id: computer_in_1_set_sync_on_g_off
  label: "COMPUTER IN 1 Set SYNC ON G OFF"
  kind: action
  command: "BE EF 03 06 00 5E D7 01 00 10 20 02 00"
  params: []

- id: computer_in_1_set_auto
  label: "COMPUTER IN 1 Set AUTO"
  kind: action
  command: "BE EF 03 06 00 CE D6 01 00 10 20 03 00"
  params: []

- id: computer_in_2_set_sync_on_g_off
  label: "COMPUTER IN 2 Set SYNC ON G OFF"
  kind: action
  command: "BE EF 03 06 00 A2 D6 01 00 11 20 02 00"
  params: []

- id: computer_in_2_set_auto
  label: "COMPUTER IN 2 Set AUTO"
  kind: action
  command: "BE EF 03 06 00 32 D7 01 00 11 20 03 00"
  params: []

- id: bnc_set_sync_on_g_off
  label: "BNC Set SYNC ON G OFF"
  kind: action
  command: "BE EF 03 06 00 86 D4 01 00 1A 20 02 00"
  params: []

- id: bnc_set_auto
  label: "BNC Set AUTO"
  kind: action
  command: "BE EF 03 06 00 16 D5 01 00 1A 20 03 00"
  params: []

- id: frame_lock_computer_in_1_set_off
  label: "FRAME LOCK - COMPUTER IN 1 Set OFF"
  kind: action
  command: "BE EF 03 06 00 3B C2 01 00 50 30 00 00"
  params: []

- id: frame_lock_computer_in_1_set_on
  label: "FRAME LOCK - COMPUTER IN 1 Set ON"
  kind: action
  command: "BE EF 03 06 00 AB C3 01 00 50 30 01 00"
  params: []

- id: frame_lock_computer_in_2_set_off
  label: "FRAME LOCK - COMPUTER IN 2 Set OFF"
  kind: action
  command: "BE EF 03 06 00 0B C3 01 00 54 30 00 00"
  params: []

- id: frame_lock_computer_in_2_set_on
  label: "FRAME LOCK - COMPUTER IN 2 Set ON"
  kind: action
  command: "BE EF 03 06 00 9B C2 01 00 54 30 00 00"
  params: []

- id: frame_lock_bnc_set_off
  label: "FRAME LOCK - BNC Set OFF"
  kind: action
  command: "BE EF 03 06 00 4F C3 01 00 57 30 00 00"
  params: []

- id: frame_lock_bnc_set_on
  label: "FRAME LOCK - BNC Set ON"
  kind: action
  command: "BE EF 03 06 00 DF C2 01 00 57 30 01 00"
  params: []

- id: frame_lock_hdmi_set_off
  label: "FRAME LOCK - HDMI Set OFF"
  kind: action
  command: "BE EF 03 06 00 7F C2 01 00 53 30 00 00"
  params: []

- id: frame_lock_hdmi_set_on
  label: "FRAME LOCK - HDMI Set ON"
  kind: action
  command: "BE EF 03 06 00 EF C3 01 00 53 30 01 00"
  params: []

- id: frame_lock_dvi_d_set_off
  label: "FRAME LOCK - DVI-D Set OFF"
  kind: action
  command: "BE EF 03 06 00 A7 C1 01 00 59 30 00 00"
  params: []

- id: frame_lock_dvi_d_set_on
  label: "FRAME LOCK - DVI-D Set ON"
  kind: action
  command: "BE EF 03 06 00 37 C0 01 00 59 30 01 00"
  params: []

- id: keystone_v_set_increment
  label: "KEYSTONE V Set Increment"
  kind: action
  command: "BE EF 03 06 00 DF D3 04 00 07 20 00 00"
  params: []

- id: keystone_v_set_decrement
  label: "KEYSTONE V Set Decrement"
  kind: action
  command: "BE EF 03 06 00 0E D2 05 00 07 20 00 00"
  params: []

- id: keystone_v_reset_set_execute
  label: "KEYSTONE V Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 08 D0 06 00 0C 70 00 00"
  params: []

- id: auto_keystone_v_execute_set_execute
  label: "AUTO KEYSTONE V EXECUTE Set Execute"
  kind: action
  command: "BE EF 03 06 00 E5 D1 06 00 0D 20 00 00"
  params: []

- id: auto_keystone_v_set_off
  label: "AUTO KEYSTONE V Set OFF"
  kind: action
  command: "BE EF 03 06 00 EA D1 01 00 0F 20 00 00"
  params: []

- id: auto_keystone_v_set_on
  label: "AUTO KEYSTONE V Set ON"
  kind: action
  command: "BE EF 03 06 00 7A D0 01 00 0F 20 01 00"
  params: []

- id: keystone_h_set_increment
  label: "KEYSTONE H Set Increment"
  kind: action
  command: "BE EF 03 06 00 8F D0 04 00 0B 20 00 00"
  params: []

- id: keystone_h_set_decrement
  label: "KEYSTONE H Set Decrement"
  kind: action
  command: "BE EF 03 06 00 5E D1 05 00 0B 20 00 00"
  params: []

- id: keystone_h_reset_set_execute
  label: "KEYSTONE H Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 98 D8 06 00 20 70 00 00"
  params: []

- id: eco_mode_set_normal
  label: "ECO MODE Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 3B 23 01 00 00 33 00 00"
  params: []

- id: eco_mode_set_eco
  label: "ECO MODE Set ECO"
  kind: action
  command: "BE EF 03 06 00 AB 22 01 00 00 33 01 00"
  params: []

- id: mirror_set_normal
  label: "MIRROR Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 C7 D2 01 00 01 30 00 00"
  params: []

- id: mirror_set_h_invert
  label: "MIRROR Set H:INVERT"
  kind: action
  command: "BE EF 03 06 00 57 D3 01 00 01 30 01 00"
  params: []

- id: mirror_set_v_invert
  label: "MIRROR Set V:INVERT"
  kind: action
  command: "BE EF 03 06 00 A7 D3 01 00 01 30 02 00"
  params: []

- id: mirror_set_h&v_invert
  label: "MIRROR Set H&V:INVERT"
  kind: action
  command: "BE EF 03 06 00 37 D2 01 00 01 30 03 00"
  params: []

- id: monitor_out_computer_in_1_set_computer_in_1
  label: "MONITOR OUT - COMPUTER IN 1 Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 3E F4 01 00 B0 20 00 00"
  params: []

- id: monitor_out_computer_in_1_set_computer_in_2
  label: "MONITOR OUT - COMPUTER IN 1 Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 FE F6 01 00 B0 20 04 00"
  params: []

- id: monitor_out_computer_in_1_set_bnc
  label: "MONITOR OUT - COMPUTER IN 1 Set BNC"
  kind: action
  command: "BE EF 03 06 00 0E F6 01 00 B0 20 07 00"
  params: []

- id: monitor_out_computer_in_1_set_off
  label: "MONITOR OUT - COMPUTER IN 1 Set OFF"
  kind: action
  command: "BE EF 03 06 00 CE B5 01 00 B0 20 FF 00"
  params: []

- id: monitor_out_computer_in_2_set_computer_in_1
  label: "MONITOR OUT - COMPUTER IN 2 Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 0E F5 01 00 B4 20 00 00"
  params: []

- id: monitor_out_computer_in_2_set_computer_in_2
  label: "MONITOR OUT - COMPUTER IN 2 Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 CE F7 01 00 B4 20 04 00"
  params: []

- id: monitor_out_computer_in_2_set_bnc
  label: "MONITOR OUT - COMPUTER IN 2 Set BNC"
  kind: action
  command: "BE EF 03 06 00 3E F7 01 00 B4 20 07 00"
  params: []

- id: monitor_out_computer_in_2_set_off
  label: "MONITOR OUT - COMPUTER IN 2 Set OFF"
  kind: action
  command: "BE EF 03 06 00 FE B4 01 00 B4 20 FF 00"
  params: []

- id: monitor_out_bnc_set_computer_in_1
  label: "MONITOR OUT - BNC Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 4A F5 01 00 B7 20 00 00"
  params: []

- id: monitor_out_bnc_set_computer_in_2
  label: "MONITOR OUT - BNC Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 8A F7 01 00 B7 20 04 00"
  params: []

- id: monitor_out_bnc_set_bnc
  label: "MONITOR OUT - BNC Set BNC"
  kind: action
  command: "BE EF 03 06 00 7A F7 01 00 B7 20 07 00"
  params: []

- id: monitor_out_bnc_set_off
  label: "MONITOR OUT - BNC Set OFF"
  kind: action
  command: "BE EF 03 06 00 BA B4 01 00 B7 20 FF 00"
  params: []

- id: monitor_out_hdmi_set_computer_in_1
  label: "MONITOR OUT - HDMI Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 7A F4 01 00 B3 20 00 00"
  params: []

- id: monitor_out_hdmi_set_computer_in_2
  label: "MONITOR OUT - HDMI Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 BA F6 01 00 B3 20 04 00"
  params: []

- id: monitor_out_hdmi_set_bnc
  label: "MONITOR OUT - HDMI Set BNC"
  kind: action
  command: "BE EF 03 06 00 4A F6 01 00 B3 20 07 00"
  params: []

- id: monitor_out_hdmi_set_off
  label: "MONITOR OUT - HDMI Set OFF"
  kind: action
  command: "BE EF 03 06 00 8A B5 01 00 B3 20 FF 00"
  params: []

- id: monitor_out_dvi_d_set_computer_in_1
  label: "MONITOR OUT - DVI-D Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 A2 F7 01 00 B9 20 00 00"
  params: []

- id: monitor_out_dvi_d_set_computer_in_2
  label: "MONITOR OUT - DVI-D Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 62 F5 01 00 B9 20 04 00"
  params: []

- id: monitor_out_dvi_d_set_bnc
  label: "MONITOR OUT - DVI-D Set BNC"
  kind: action
  command: "BE EF 03 06 00 92 F5 01 00 B9 20 07 00"
  params: []

- id: monitor_out_dvi_d_set_off
  label: "MONITOR OUT - DVI-D Set OFF"
  kind: action
  command: "BE EF 03 06 00 52 B6 01 00 B9 20 FF 00"
  params: []

- id: monitor_out_component_set_computer_in_1
  label: "MONITOR OUT - COMPONENT Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 F2 F4 01 00 B5 20 00 00"
  params: []

- id: monitor_out_component_set_computer_in_2
  label: "MONITOR OUT - COMPONENT Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 32 F6 01 00 B5 20 04 00"
  params: []

- id: monitor_out_component_set_bnc
  label: "MONITOR OUT - COMPONENT Set BNC"
  kind: action
  command: "BE EF 03 06 00 C2 F6 01 00 B5 20 07 00"
  params: []

- id: monitor_out_component_set_off
  label: "MONITOR OUT - COMPONENT Set OFF"
  kind: action
  command: "BE EF 03 06 00 02 B5 01 00 B5 20 FF 00"
  params: []

- id: monitor_out_s_video_set_computer_in_1
  label: "MONITOR OUT - S-VIDEO Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 86 F5 01 00 B2 20 00 00"
  params: []

- id: monitor_out_s_video_set_computer_in_2
  label: "MONITOR OUT - S-VIDEO Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 46 F7 01 00 B2 20 04 00"
  params: []

- id: monitor_out_s_video_set_bnc
  label: "MONITOR OUT - S-VIDEO Set BNC"
  kind: action
  command: "BE EF 03 06 00 B6 F7 01 00 B2 20 07 00"
  params: []

- id: monitor_out_s_video_set_off
  label: "MONITOR OUT - S-VIDEO Set OFF"
  kind: action
  command: "BE EF 03 06 00 76 B4 01 00 B2 20 FF 00"
  params: []

- id: monitor_out_video_1_set_computer_in_1
  label: "MONITOR OUT - VIDEO 1 Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 C2 F5 01 00 B1 20 00 00"
  params: []

- id: monitor_out_video_1_set_computer_in_2
  label: "MONITOR OUT - VIDEO 1 Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 02 F7 01 00 B1 20 04 00"
  params: []

- id: monitor_out_video_1_set_bnc
  label: "MONITOR OUT - VIDEO 1 Set BNC"
  kind: action
  command: "BE EF 03 06 00 F2 F7 01 00 B1 20 07 00"
  params: []

- id: monitor_out_video_1_set_off
  label: "MONITOR OUT - VIDEO 1 Set OFF"
  kind: action
  command: "BE EF 03 06 00 32 B4 01 00 B1 20 FF 00"
  params: []

- id: monitor_out_video_2_set_computer_in_1
  label: "MONITOR OUT - VIDEO 2 Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 E6 F7 01 00 BA 20 00 00"
  params: []

- id: monitor_out_video_2_set_computer_in_2
  label: "MONITOR OUT - VIDEO 2 Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 26 F5 01 00 BA 20 04 00"
  params: []

- id: monitor_out_video_2_set_bnc
  label: "MONITOR OUT - VIDEO 2 Set BNC"
  kind: action
  command: "BE EF 03 06 00 D6 F5 01 00 BA 20 07 00"
  params: []

- id: monitor_out_video_2_set_off
  label: "MONITOR OUT - VIDEO 2 Set OFF"
  kind: action
  command: "BE EF 03 06 00 16 B6 01 00 BA 20 FF 00"
  params: []

- id: monitor_out_standby_set_computer_in_1
  label: "MONITOR OUT - STANDBY Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 2A F7 01 00 BF 20 00 00"
  params: []

- id: monitor_out_standby_set_computer_in_2
  label: "MONITOR OUT - STANDBY Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 EA F5 01 00 BF 20 04 00"
  params: []

- id: monitor_out_standby_set_bnc
  label: "MONITOR OUT - STANDBY Set BNC"
  kind: action
  command: "BE EF 03 06 00 1A F5 01 00 BF 20 07 00"
  params: []

- id: monitor_out_standby_set_off
  label: "MONITOR OUT - STANDBY Set OFF"
  kind: action
  command: "BE EF 03 06 00 DA B6 01 00 BF 20 FF 00"
  params: []

- id: language_set_english
  label: "LANGUAGE Set ENGLISH"
  kind: action
  command: "BE EF 03 06 00 F7 D3 01 00 05 30 00 00"
  params: []

- id: language_set_français
  label: "LANGUAGE Set FRANÇAIS"
  kind: action
  command: "BE EF 03 06 00 67 D2 01 00 05 30 01 00"
  params: []

- id: language_set_deutsch
  label: "LANGUAGE Set DEUTSCH"
  kind: action
  command: "BE EF 03 06 00 97 D2 01 00 05 30 02 00"
  params: []

- id: language_set_español
  label: "LANGUAGE Set ESPAÑOL"
  kind: action
  command: "BE EF 03 06 00 07 D3 01 00 05 30 03 00"
  params: []

- id: language_set_italiano
  label: "LANGUAGE Set ITALIANO"
  kind: action
  command: "BE EF 03 06 00 37 D1 01 00 05 30 04 00"
  params: []

- id: language_set_norsk
  label: "LANGUAGE Set NORSK"
  kind: action
  command: "BE EF 03 06 00 A7 D0 01 00 05 30 05 00"
  params: []

- id: language_set_nederlands
  label: "LANGUAGE Set NEDERLANDS"
  kind: action
  command: "BE EF 03 06 00 57 D0 01 00 05 30 06 00"
  params: []

- id: language_set_português
  label: "LANGUAGE Set PORTUGUÊS"
  kind: action
  command: "BE EF 03 06 00 C7 D1 01 00 05 30 07 00"
  params: []

- id: language_set_日本語
  label: "LANGUAGE Set 日本語"
  kind: action
  command: "BE EF 03 06 00 37 D4 01 00 05 30 08 00"
  params: []

- id: language_set
  label: "LANGUAGE Set"
  kind: action
  command: "BE EF 03 06 00 A7 D5 01 00 05 30 09 00"
  params: []

- id: language_set_2
  label: "LANGUAGE Set"
  kind: action
  command: "BE EF 03 06 00 37 DE 01 00 05 30 10 00"
  params: []

- id: language_set_3
  label: "LANGUAGE Set"
  kind: action
  command: "BE EF 03 06 00 57 D5 01 00 05 30 0A 00"
  params: []

- id: language_set_svenska
  label: "LANGUAGE Set SVENSKA"
  kind: action
  command: "BE EF 03 06 00 C7 D4 01 00 05 30 0B 00"
  params: []

- id: language_set_pyccknn
  label: "LANGUAGE Set PYCCKNN"
  kind: action
  command: "BE EF 03 06 00 F7 D6 01 00 05 30 0C 00"
  params: []

- id: language_set_suomi
  label: "LANGUAGE Set SUOMI"
  kind: action
  command: "BE EF 03 06 00 67 D7 01 00 05 30 0D 00"
  params: []

- id: language_set_polski
  label: "LANGUAGE Set POLSKI"
  kind: action
  command: "BE EF 03 06 00 97 D7 01 00 05 30 0E 00"
  params: []

- id: language_set_türkçe
  label: "LANGUAGE Set TÜRKÇE"
  kind: action
  command: "BE EF 03 06 00 07 D6 01 00 05 30 0F 00"
  params: []

- id: language_set_dansk
  label: "LANGUAGE Set DANSK"
  kind: action
  command: "BE EF 03 06 00 A7 DF 01 00 05 30 11 00"
  params: []

- id: language_set_čeština
  label: "LANGUAGE Set ČEŠTINA"
  kind: action
  command: "BE EF 03 06 00 57 DF 01 00 05 30 12 00"
  params: []

- id: language_set_اﻟﻠﻐﺔ_اﻟﻌﺮﺑﻴﺔ
  label: "LANGUAGE Set اﻟﻠﻐﺔ اﻟﻌﺮﺑﻴﺔ"
  kind: action
  command: "BE EF 03 06 00 37 DB 01 00 05 30 1C 00"
  params: []

- id: language_set_ﻓﺎرﺳﻰ
  label: "LANGUAGE Set ﻓﺎرﺳﻰ"
  kind: action
  command: "BE EF 03 06 00 A7 DA 01 00 05 30 1D 00"
  params: []

- id: menu_position_v_set_increment
  label: "MENU POSITION V Set Increment"
  kind: action
  command: "BE EF 03 06 00 26 D7 04 00 16 30 00 00"
  params: []

- id: menu_position_v_set_decrement
  label: "MENU POSITION V Set Decrement"
  kind: action
  command: "BE EF 03 06 00 F7 D6 05 00 16 30 00 00"
  params: []

- id: menu_position_v_reset_set_execute
  label: "MENU POSITION V Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 A8 C7 06 00 44 70 00 00"
  params: []

- id: menu_position_h_set_increment
  label: "MENU POSITION H Set Increment"
  kind: action
  command: "BE EF 03 06 00 62 D7 04 00 15 30 00 00"
  params: []

- id: menu_position_h_set_decrement
  label: "MENU POSITION H Set Decrement"
  kind: action
  command: "BE EF 03 06 00 B3 D6 05 00 15 30 00 00"
  params: []

- id: menu_position_h_reset_set_execute
  label: "MENU POSITION H Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 DC C6 06 00 43 70 00 00"
  params: []

- id: blank_set_my_screen
  label: "BLANK Set MyScreen"
  kind: action
  command: "BE EF 03 06 00 FB CA 01 00 00 30 20 00"
  params: []

- id: blank_set_original
  label: "BLANK Set ORIGINAL"
  kind: action
  command: "BE EF 03 06 00 FB E2 01 00 00 30 40 00"
  params: []

- id: blank_set_blue
  label: "BLANK Set BLUE"
  kind: action
  command: "BE EF 03 06 00 CB D3 01 00 00 30 03 00"
  params: []

- id: blank_set_white
  label: "BLANK Set WHITE"
  kind: action
  command: "BE EF 03 06 00 6B D0 01 00 00 30 05 00"
  params: []

- id: blank_set_black
  label: "BLANK Set BLACK"
  kind: action
  command: "BE EF 03 06 00 9B D0 01 00 00 30 06 00"
  params: []

- id: blank_on_off_set_off
  label: "BLANK On/Off Set OFF"
  kind: action
  command: "BE EF 03 06 00 FB D8 01 00 20 30 00 00"
  params: []

- id: blank_on_off_set_on
  label: "BLANK On/Off Set ON"
  kind: action
  command: "BE EF 03 06 00 6B D9 01 00 20 30 01 00"
  params: []

- id: start_up_set_my_screen
  label: "START UP Set MyScreen"
  kind: action
  command: "BE EF 03 06 00 CB CB 01 00 04 30 20 00"
  params: []

- id: start_up_set_original
  label: "START UP Set ORIGINAL"
  kind: action
  command: "BE EF 03 06 00 0B D2 01 00 04 30 00 00"
  params: []

- id: start_up_set_off
  label: "START UP Set OFF"
  kind: action
  command: "BE EF 03 06 00 9B D3 01 00 04 30 01 00"
  params: []

- id: my_screen_lock_set_off
  label: "MyScreen LOCK Set OFF"
  kind: action
  command: "BE EF 03 06 00 3B EF 01 00 C0 30 00 00"
  params: []

- id: my_screen_lock_set_on
  label: "MyScreen LOCK Set ON"
  kind: action
  command: "BE EF 03 06 00 AB EE 01 00 C0 30 01 00"
  params: []

- id: message_set_off
  label: "MESSAGE Set OFF"
  kind: action
  command: "BE EF 03 06 00 8F D6 01 00 17 30 00 00"
  params: []

- id: message_set_on
  label: "MESSAGE Set ON"
  kind: action
  command: "BE EF 03 06 00 1F D7 01 00 17 30 01 00"
  params: []

- id: template_set_test_pattern
  label: "TEMPLATE Set TEST PATTERN"
  kind: action
  command: "BE EF 03 06 00 43 D9 01 00 22 30 00 00"
  params: []

- id: template_set_dot_line_1
  label: "TEMPLATE Set DOT-LINE 1"
  kind: action
  command: "BE EF 03 06 00 D3 D8 01 00 22 30 01 00"
  params: []

- id: template_set_dot_line_2
  label: "TEMPLATE Set DOT-LINE 2"
  kind: action
  command: "BE EF 03 06 00 23 D8 01 00 22 30 02 00"
  params: []

- id: template_set_dot_line_3
  label: "TEMPLATE Set DOT-LINE 3"
  kind: action
  command: "BE EF 03 06 00 B3 D9 01 00 22 30 03 00"
  params: []

- id: template_set_dot_line_4
  label: "TEMPLATE Set DOT-LINE 4"
  kind: action
  command: "BE EF 03 06 00 83 DB 01 00 22 30 04 00"
  params: []

- id: template_on_off_set_off
  label: "TEMPLATE On/Off Set OFF"
  kind: action
  command: "BE EF 03 06 00 BF D8 01 00 23 30 00 00"
  params: []

- id: template_on_off_set_on
  label: "TEMPLATE On/Off Set ON"
  kind: action
  command: "BE EF 03 06 00 2F D9 01 00 23 30 01 00"
  params: []

- id: closed_caption_display_set_off
  label: "CLOSED CAPTION DISPLAY Set OFF"
  kind: action
  command: "BE EF 03 06 00 FA 62 01 00 00 37 00 00"
  params: []

- id: closed_caption_display_set_on
  label: "CLOSED CAPTION DISPLAY Set ON"
  kind: action
  command: "BE EF 03 06 00 6A 63 01 00 00 37 01 00"
  params: []

- id: closed_caption_mode_set_captions
  label: "CLOSED CAPTION MODE Set CAPTIONS"
  kind: action
  command: "BE EF 03 06 00 06 63 01 00 01 37 00 00"
  params: []

- id: closed_caption_mode_set_text
  label: "CLOSED CAPTION MODE Set TEXT"
  kind: action
  command: "BE EF 03 06 00 96 62 01 00 01 37 01 00"
  params: []

- id: closed_caption_channel_set_1
  label: "CLOSED CAPTION CHANNEL Set 1"
  kind: action
  command: "BE EF 03 06 00 D2 62 01 00 02 37 01 00"
  params: []

- id: closed_caption_channel_set_2
  label: "CLOSED CAPTION CHANNEL Set 2"
  kind: action
  command: "BE EF 03 06 00 22 62 01 00 02 37 02 00"
  params: []

- id: closed_caption_channel_set_3
  label: "CLOSED CAPTION CHANNEL Set 3"
  kind: action
  command: "BE EF 03 06 00 B2 63 01 00 02 37 03 00"
  params: []

- id: closed_caption_channel_set_4
  label: "CLOSED CAPTION CHANNEL Set 4"
  kind: action
  command: "BE EF 03 06 00 82 61 01 00 02 37 04 00"
  params: []

- id: source_skip_computer_in_1_set_normal
  label: "SOURCE SKIP COMPUTER IN 1 Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 FE 78 01 00 20 22 00 00"
  params: []

- id: source_skip_computer_in_1_set_skip
  label: "SOURCE SKIP COMPUTER IN 1 Set SKIP"
  kind: action
  command: "BE EF 03 06 00 6E 79 01 00 20 22 01 00"
  params: []

- id: source_skip_computer_in_2_set_normal
  label: "SOURCE SKIP COMPUTER IN 2 Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 CE 79 01 00 24 22 00 00"
  params: []

- id: source_skip_computer_in_2_set_skip
  label: "SOURCE SKIP COMPUTER IN 2 Set SKIP"
  kind: action
  command: "BE EF 03 06 00 5E 78 01 00 24 22 01 00"
  params: []

- id: source_skip_bnc_set_normal
  label: "SOURCE SKIP BNC Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 8A 79 01 00 27 22 00 00"
  params: []

- id: source_skip_bnc_set_skip
  label: "SOURCE SKIP BNC Set SKIP"
  kind: action
  command: "BE EF 03 06 00 1A 78 01 00 27 22 01 00"
  params: []

- id: source_skip_hdmi_set_normal
  label: "SOURCE SKIP HDMI Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 BA 78 01 00 23 22 00 00"
  params: []

- id: source_skip_hdmi_set_skip
  label: "SOURCE SKIP HDMI Set SKIP"
  kind: action
  command: "BE EF 03 06 00 2A 79 01 00 23 22 01 00"
  params: []

- id: source_skip_dvi_d_set_normal
  label: "SOURCE SKIP DVI-D Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 62 7B 01 00 29 22 00 00"
  params: []

- id: source_skip_dvi_d_set_skip
  label: "SOURCE SKIP DVI-D Set SKIP"
  kind: action
  command: "BE EF 03 06 00 F2 7A 01 00 29 22 01 00"
  params: []

- id: source_skip_component_set_normal
  label: "SOURCE SKIP COMPONENT Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 32 78 01 00 25 22 00 00"
  params: []

- id: source_skip_component_set_skip
  label: "SOURCE SKIP COMPONENT Set SKIP"
  kind: action
  command: "BE EF 03 06 00 A2 79 01 00 25 22 01 00"
  params: []

- id: source_skip_s_video_set_normal
  label: "SOURCE SKIP S-VIDEO Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 46 79 01 00 22 22 00 00"
  params: []

- id: source_skip_s_video_set_skip
  label: "SOURCE SKIP S-VIDEO Set SKIP"
  kind: action
  command: "BE EF 03 06 00 D6 78 01 00 22 22 01 00"
  params: []

- id: source_skip_video_1_set_normal
  label: "SOURCE SKIP VIDEO 1 Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 02 79 01 00 21 22 00 00"
  params: []

- id: source_skip_video_1_set_skip
  label: "SOURCE SKIP VIDEO 1 Set SKIP"
  kind: action
  command: "BE EF 03 06 00 92 78 01 00 21 22 01 00"
  params: []

- id: source_skip_video_2_set_normal
  label: "SOURCE SKIP VIDEO 2 Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 26 7B 01 00 2A 22 00 00"
  params: []

- id: source_skip_video_2_set_skip
  label: "SOURCE SKIP VIDEO 2 Set SKIP"
  kind: action
  command: "BE EF 03 06 00 B6 7A 01 00 2A 22 01 00"
  params: []

- id: auto_search_set_off
  label: "AUTO SEARCH Set OFF"
  kind: action
  command: "BE EF 03 06 00 B6 D6 01 00 16 20 00 00"
  params: []

- id: auto_search_set_on
  label: "AUTO SEARCH Set ON"
  kind: action
  command: "BE EF 03 06 00 26 D7 01 00 16 20 01 00"
  params: []

- id: direct_on_set_off
  label: "DIRECT ON Set OFF"
  kind: action
  command: "BE EF 03 06 00 3B 89 01 00 20 31 00 00"
  params: []

- id: direct_on_set_on
  label: "DIRECT ON Set ON"
  kind: action
  command: "BE EF 03 06 00 AB 88 01 00 20 31 01 00"
  params: []

- id: auto_off_set_increment
  label: "AUTO OFF Set Increment"
  kind: action
  command: "BE EF 03 06 00 6E 86 04 00 10 31 00 00"
  params: []

- id: auto_off_set_decrement
  label: "AUTO OFF Set Decrement"
  kind: action
  command: "BE EF 03 06 00 BF 87 05 00 10 31 00 00"
  params: []

- id: shutter_timer_set_1h
  label: "SHUTTER TIMER Set 1h"
  kind: action
  command: "BE EF 03 06 00 27 92 01 00 06 24 01 00"
  params: []

- id: shutter_timer_set_3h
  label: "SHUTTER TIMER Set 3h"
  kind: action
  command: "BE EF 03 06 00 47 93 01 00 06 24 03 00"
  params: []

- id: shutter_timer_set_6h
  label: "SHUTTER TIMER Set 6h"
  kind: action
  command: "BE EF 03 06 00 17 90 01 00 06 24 06 00"
  params: []

- id: lamp_time_reset_set_execute
  label: "LAMP TIME Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 58 DC 06 00 30 70 00 00"
  params: []

- id: filter_time_reset_set_execute
  label: "FILTER TIME Reset Set Execute"
  kind: action
  command: "BE EF 03 06 00 98 C6 06 00 40 70 00 00"
  params: []

- id: my_button_1_set_computer_in_1
  label: "MY BUTTON-1 Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 3A 33 01 00 00 36 00 00"
  params: []

- id: my_button_1_set_computer_in_2
  label: "MY BUTTON-1 Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 FA 31 01 00 00 36 04 00"
  params: []

- id: my_button_1_set_bnc
  label: "MY BUTTON-1 Set BNC"
  kind: action
  command: "BE EF 03 06 00 0A 31 01 00 00 36 07 00"
  params: []

- id: my_button_1_set_hdmi
  label: "MY BUTTON-1 Set HDMI"
  kind: action
  command: "BE EF 03 06 00 CA 33 01 00 00 36 03 00"
  params: []

- id: my_button_1_set_dvi_d
  label: "MY BUTTON-1 Set DVI-D"
  kind: action
  command: "BE EF 03 06 00 6A 35 01 00 00 36 09 00"
  params: []

- id: my_button_1_set_component
  label: "MY BUTTON-1 Set COMPONENT"
  kind: action
  command: "BE EF 03 06 00 6A 30 01 00 00 36 05 00"
  params: []

- id: my_button_1_set_s_video
  label: "MY BUTTON-1 Set S-VIDEO"
  kind: action
  command: "BE EF 03 06 00 5A 32 01 00 00 36 02 00"
  params: []

- id: my_button_1_set_video_1
  label: "MY BUTTON-1 Set VIDEO 1"
  kind: action
  command: "BE EF 03 06 00 AA 32 01 00 00 36 01 00"
  params: []

- id: my_button_1_set_video_2
  label: "MY BUTTON-1 Set VIDEO 2"
  kind: action
  command: "BE EF 03 06 00 9A 35 01 00 00 36 0A 00"
  params: []

- id: my_button_1_set_information
  label: "MY BUTTON-1 Set INFORMATION"
  kind: action
  command: "BE EF 03 06 00 FA 3E 01 00 00 36 10 00"
  params: []

- id: my_button_1_set_auto_keystone_execute
  label: "MY BUTTON-1 Set AUTO KEYSTONE EXECUTE"
  kind: action
  command: "BE EF 03 06 00 6A 3F 01 00 00 36 11 00"
  params: []

- id: my_button_1_set_my_memory
  label: "MY BUTTON-1 Set MY MEMORY"
  kind: action
  command: "BE EF 03 06 00 9A 3F 01 00 00 36 12 00"
  params: []

- id: my_button_1_set_active_iris
  label: "MY BUTTON-1 Set ACTIVE IRIS"
  kind: action
  command: "BE EF 03 06 00 AA 3D 01 00 00 36 15 00"
  params: []

- id: my_button_1_set_picture_mode
  label: "MY BUTTON-1 Set PICTURE MODE"
  kind: action
  command: "BE EF 03 06 00 0A 3E 01 00 00 36 13 00"
  params: []

- id: my_button_1_set_filter_reset
  label: "MY BUTTON-1 Set FILTER RESET"
  kind: action
  command: "BE EF 03 06 00 3A 3C 01 00 00 36 14 00"
  params: []

- id: my_button_1_set_template
  label: "MY BUTTON-1 Set TEMPLATE"
  kind: action
  command: "BE EF 03 06 00 CA 39 01 00 00 36 1B 00"
  params: []

- id: my_button_1_set_pby_p_swap
  label: "MY BUTTON-1 Set PbyP SWAP"
  kind: action
  command: "BE EF 03 06 00 5A 38 01 00 00 36 1A 00"
  params: []

- id: my_button_1_set_lens_memory_1
  label: "MY BUTTON-1 Set LENS MEMORY-1"
  kind: action
  command: "BE EF 03 06 00 CA 27 01 00 00 36 33 00"
  params: []

- id: my_button_1_set_lens_memory_2
  label: "MY BUTTON-1 Set LENS MEMORY-2"
  kind: action
  command: "BE EF 03 06 00 FA 25 01 00 00 36 34 00"
  params: []

- id: my_button_1_set_lens_memory_3
  label: "MY BUTTON-1 Set LENS MEMORY-3"
  kind: action
  command: "BE EF 03 06 00 6A 24 01 00 00 36 35 00"
  params: []

- id: my_button_1_set_my_image
  label: "MY BUTTON-1 Set MY IMAGE"
  kind: action
  command: "BE EF 03 06 00 5A 3D 01 00 00 36 16 00"
  params: []

- id: my_button_2_set_computer_in_1
  label: "MY BUTTON-2 Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 C6 32 01 00 01 36 00 00"
  params: []

- id: my_button_2_set_computer_in_2
  label: "MY BUTTON-2 Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 06 30 01 00 01 36 04 00"
  params: []

- id: my_button_2_set_bnc
  label: "MY BUTTON-2 Set BNC"
  kind: action
  command: "BE EF 03 06 00 F6 30 01 00 01 36 07 00"
  params: []

- id: my_button_2_set_hdmi
  label: "MY BUTTON-2 Set HDMI"
  kind: action
  command: "BE EF 03 06 00 36 32 01 00 01 36 03 00"
  params: []

- id: my_button_2_set_dvi_d
  label: "MY BUTTON-2 Set DVI-D"
  kind: action
  command: "BE EF 03 06 00 96 34 01 00 01 36 09 00"
  params: []

- id: my_button_2_set_component
  label: "MY BUTTON-2 Set COMPONENT"
  kind: action
  command: "BE EF 03 06 00 96 31 01 00 01 36 05 00"
  params: []

- id: my_button_2_set_s_video
  label: "MY BUTTON-2 Set S-VIDEO"
  kind: action
  command: "BE EF 03 06 00 A6 33 01 00 01 36 02 00"
  params: []

- id: my_button_2_set_video_1
  label: "MY BUTTON-2 Set VIDEO 1"
  kind: action
  command: "BE EF 03 06 00 56 33 01 00 01 36 01 00"
  params: []

- id: my_button_2_set_video_2
  label: "MY BUTTON-2 Set VIDEO 2"
  kind: action
  command: "BE EF 03 06 00 66 34 01 00 01 36 0A 00"
  params: []

- id: my_button_2_set_information
  label: "MY BUTTON-2 Set INFORMATION"
  kind: action
  command: "BE EF 03 06 00 06 3F 01 00 01 36 10 00"
  params: []

- id: my_button_2_set_auto_keystone_execute
  label: "MY BUTTON-2 Set AUTO KEYSTONE EXECUTE"
  kind: action
  command: "BE EF 03 06 00 96 3E 01 00 01 36 11 00"
  params: []

- id: my_button_2_set_my_memory
  label: "MY BUTTON-2 Set MY MEMORY"
  kind: action
  command: "BE EF 03 06 00 66 3E 01 00 01 36 12 00"
  params: []

- id: my_button_2_set_active_iris
  label: "MY BUTTON-2 Set ACTIVE IRIS"
  kind: action
  command: "BE EF 03 06 00 56 3C 01 00 01 36 15 00"
  params: []

- id: my_button_2_set_picture_mode
  label: "MY BUTTON-2 Set PICTURE MODE"
  kind: action
  command: "BE EF 03 06 00 F6 3F 01 00 01 36 13 00"
  params: []

- id: my_button_2_set_filter_reset
  label: "MY BUTTON-2 Set FILTER RESET"
  kind: action
  command: "BE EF 03 06 00 C6 3D 01 00 01 36 14 00"
  params: []

- id: my_button_2_set_template
  label: "MY BUTTON-2 Set TEMPLATE"
  kind: action
  command: "BE EF 03 06 00 36 38 01 00 01 36 1B 00"
  params: []

- id: my_button_2_set_pby_p_swap
  label: "MY BUTTON-2 Set PbyP SWAP"
  kind: action
  command: "BE EF 03 06 00 A6 39 01 00 01 36 1A 00"
  params: []

- id: my_button_2_set_lens_memory_1
  label: "MY BUTTON-2 Set LENS MEMORY-1"
  kind: action
  command: "BE EF 03 06 00 36 26 01 00 01 36 33 00"
  params: []

- id: my_button_2_set_lens_memory_2
  label: "MY BUTTON-2 Set LENS MEMORY-2"
  kind: action
  command: "BE EF 03 06 00 06 24 01 00 01 36 34 00"
  params: []

- id: my_button_2_set_lens_memory_3
  label: "MY BUTTON-2 Set LENS MEMORY-3"
  kind: action
  command: "BE EF 03 06 00 96 25 01 00 01 36 35 00"
  params: []

- id: my_button_2_set_my_image
  label: "MY BUTTON-2 Set MY IMAGE"
  kind: action
  command: "BE EF 03 06 00 A6 3C 01 00 01 36 16 00"
  params: []

- id: my_button_3_set_computer_in_1
  label: "MY BUTTON-3 Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 82 32 01 00 02 36 00 00"
  params: []

- id: my_button_3_set_computer_in_2
  label: "MY BUTTON-3 Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 42 30 01 00 02 36 04 00"
  params: []

- id: my_button_3_set_bnc
  label: "MY BUTTON-3 Set BNC"
  kind: action
  command: "BE EF 03 06 00 B2 30 01 00 02 36 07 00"
  params: []

- id: my_button_3_set_hdmi
  label: "MY BUTTON-3 Set HDMI"
  kind: action
  command: "BE EF 03 06 00 72 32 01 00 02 36 03 00"
  params: []

- id: my_button_3_set_dvi_d
  label: "MY BUTTON-3 Set DVI-D"
  kind: action
  command: "BE EF 03 06 00 D2 34 01 00 02 36 09 00"
  params: []

- id: my_button_3_set_component
  label: "MY BUTTON-3 Set COMPONENT"
  kind: action
  command: "BE EF 03 06 00 D2 31 01 00 02 36 05 00"
  params: []

- id: my_button_3_set_s_video
  label: "MY BUTTON-3 Set S-VIDEO"
  kind: action
  command: "BE EF 03 06 00 E2 33 01 00 02 36 02 00"
  params: []

- id: my_button_3_set_video_1
  label: "MY BUTTON-3 Set VIDEO 1"
  kind: action
  command: "BE EF 03 06 00 12 33 01 00 02 36 01 00"
  params: []

- id: my_button_3_set_video_2
  label: "MY BUTTON-3 Set VIDEO 2"
  kind: action
  command: "BE EF 03 06 00 22 34 01 00 02 36 0A 00"
  params: []

- id: my_button_3_set_information
  label: "MY BUTTON-3 Set INFORMATION"
  kind: action
  command: "BE EF 03 06 00 42 3F 01 00 02 36 10 00"
  params: []

- id: my_button_3_set_auto_keystone_execute
  label: "MY BUTTON-3 Set AUTO KEYSTONE EXECUTE"
  kind: action
  command: "BE EF 03 06 00 D2 3E 01 00 02 36 11 00"
  params: []

- id: my_button_3_set_my_memory
  label: "MY BUTTON-3 Set MY MEMORY"
  kind: action
  command: "BE EF 03 06 00 22 3E 01 00 02 36 12 00"
  params: []

- id: my_button_3_set_active_iris
  label: "MY BUTTON-3 Set ACTIVE IRIS"
  kind: action
  command: "BE EF 03 06 00 12 3C 01 00 02 36 15 00"
  params: []

- id: my_button_3_set_picture_mode
  label: "MY BUTTON-3 Set PICTURE MODE"
  kind: action
  command: "BE EF 03 06 00 B2 3F 01 00 02 36 13 00"
  params: []

- id: my_button_3_set_filter_reset
  label: "MY BUTTON-3 Set FILTER RESET"
  kind: action
  command: "BE EF 03 06 00 82 3D 01 00 02 36 14 00"
  params: []

- id: my_button_3_set_template
  label: "MY BUTTON-3 Set TEMPLATE"
  kind: action
  command: "BE EF 03 06 00 72 38 01 00 02 36 1B 00"
  params: []

- id: my_button_3_set_pby_p_swap
  label: "MY BUTTON-3 Set PbyP SWAP"
  kind: action
  command: "BE EF 03 06 00 E2 39 01 00 02 36 1A 00"
  params: []

- id: my_button_3_set_lens_memory_1
  label: "MY BUTTON-3 Set LENS MEMORY-1"
  kind: action
  command: "BE EF 03 06 00 72 26 01 00 02 36 33 00"
  params: []

- id: my_button_3_set_lens_memory_2
  label: "MY BUTTON-3 Set LENS MEMORY-2"
  kind: action
  command: "BE EF 03 06 00 42 24 01 00 02 36 34 00"
  params: []

- id: my_button_3_set_lens_memory_3
  label: "MY BUTTON-3 Set LENS MEMORY-3"
  kind: action
  command: "BE EF 03 06 00 D2 25 01 00 02 36 35 00"
  params: []

- id: my_button_3_set_my_image
  label: "MY BUTTON-3 Set MY IMAGE"
  kind: action
  command: "BE EF 03 06 00 E2 3C 01 00 02 36 16 00"
  params: []

- id: my_button_4_set_computer_in_1
  label: "MY BUTTON-4 Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 7E 33 01 00 03 36 00 00"
  params: []

- id: my_button_4_set_computer_in_2
  label: "MY BUTTON-4 Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 BE 31 01 00 03 36 04 00"
  params: []

- id: my_button_4_set_bnc
  label: "MY BUTTON-4 Set BNC"
  kind: action
  command: "BE EF 03 06 00 4E 31 01 00 03 36 07 00"
  params: []

- id: my_button_4_set_hdmi
  label: "MY BUTTON-4 Set HDMI"
  kind: action
  command: "BE EF 03 06 00 8E 33 01 00 03 36 03 00"
  params: []

- id: my_button_4_set_dvi_d
  label: "MY BUTTON-4 Set DVI-D"
  kind: action
  command: "BE EF 03 06 00 2E 35 01 00 03 36 09 00"
  params: []

- id: my_button_4_set_component
  label: "MY BUTTON-4 Set COMPONENT"
  kind: action
  command: "BE EF 03 06 00 2E 30 01 00 03 36 05 00"
  params: []

- id: my_button_4_set_s_video
  label: "MY BUTTON-4 Set S-VIDEO"
  kind: action
  command: "BE EF 03 06 00 1E 32 01 00 03 36 02 00"
  params: []

- id: my_button_4_set_video_1
  label: "MY BUTTON-4 Set VIDEO 1"
  kind: action
  command: "BE EF 03 06 00 EE 32 01 00 03 36 01 00"
  params: []

- id: my_button_4_set_video_2
  label: "MY BUTTON-4 Set VIDEO 2"
  kind: action
  command: "BE EF 03 06 00 DE 35 01 00 03 36 0A 00"
  params: []

- id: my_button_4_set_information
  label: "MY BUTTON-4 Set INFORMATION"
  kind: action
  command: "BE EF 03 06 00 BE 3E 01 00 03 36 10 00"
  params: []

- id: my_button_4_set_auto_keystone_execute
  label: "MY BUTTON-4 Set AUTO KEYSTONE EXECUTE"
  kind: action
  command: "BE EF 03 06 00 2E 3F 01 00 03 36 11 00"
  params: []

- id: my_button_4_set_my_memory
  label: "MY BUTTON-4 Set MY MEMORY"
  kind: action
  command: "BE EF 03 06 00 DE 3F 01 00 03 36 12 00"
  params: []

- id: my_button_4_set_active_iris
  label: "MY BUTTON-4 Set ACTIVE IRIS"
  kind: action
  command: "BE EF 03 06 00 EE 3D 01 00 03 36 15 00"
  params: []

- id: my_button_4_set_picture_mode
  label: "MY BUTTON-4 Set PICTURE MODE"
  kind: action
  command: "BE EF 03 06 00 4E 3E 01 00 03 36 13 00"
  params: []

- id: my_button_4_set_filter_reset
  label: "MY BUTTON-4 Set FILTER RESET"
  kind: action
  command: "BE EF 03 06 00 7E 3C 01 00 03 36 14 00"
  params: []

- id: my_button_4_set_template
  label: "MY BUTTON-4 Set TEMPLATE"
  kind: action
  command: "BE EF 03 06 00 8E 39 01 00 03 36 1B 00"
  params: []

- id: my_button_4_set_pby_p_swap
  label: "MY BUTTON-4 Set PbyP SWAP"
  kind: action
  command: "BE EF 03 06 00 1E 38 01 00 03 36 1A 00"
  params: []

- id: my_button_4_set_lens_memory_1
  label: "MY BUTTON-4 Set LENS MEMORY-1"
  kind: action
  command: "BE EF 03 06 00 8E 27 01 00 03 36 33 00"
  params: []

- id: my_button_4_set_lens_memory_2
  label: "MY BUTTON-4 Set LENS MEMORY-2"
  kind: action
  command: "BE EF 03 06 00 BE 25 01 00 03 36 34 00"
  params: []

- id: my_button_4_set_lens_memory_3
  label: "MY BUTTON-4 Set LENS MEMORY-3"
  kind: action
  command: "BE EF 03 06 00 2E 24 01 00 03 36 35 00"
  params: []

- id: my_button_4_set_my_image
  label: "MY BUTTON-4 Set MY IMAGE"
  kind: action
  command: "BE EF 03 06 00 1E 3D 01 00 03 36 16 00"
  params: []

- id: my_source_set_computer_in_1
  label: "MY SOURCE Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 FA 38 01 00 20 36 00 00"
  params: []

- id: my_source_set_computer_in_2
  label: "MY SOURCE Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 3A 3A 01 00 20 36 04 00"
  params: []

- id: my_source_set_bnc
  label: "MY SOURCE Set BNC"
  kind: action
  command: "BE EF 03 06 00 CA 3A 01 00 20 36 07 00"
  params: []

- id: my_source_set_hdmi
  label: "MY SOURCE Set HDMI"
  kind: action
  command: "BE EF 03 06 00 0A 38 01 00 20 36 03 00"
  params: []

- id: my_source_set_dvi_d
  label: "MY SOURCE Set DVI-D"
  kind: action
  command: "BE EF 03 06 00 AA 3E 01 00 20 36 09 00"
  params: []

- id: my_source_set_component
  label: "MY SOURCE Set COMPONENT"
  kind: action
  command: "BE EF 03 06 00 AA 3B 01 00 20 36 05 00"
  params: []

- id: my_source_set_s_video
  label: "MY SOURCE Set S-VIDEO"
  kind: action
  command: "BE EF 03 06 00 9A 39 01 00 20 36 02 00"
  params: []

- id: my_source_set_video_1
  label: "MY SOURCE Set VIDEO 1"
  kind: action
  command: "BE EF 03 06 00 6A 39 01 00 20 36 01 00"
  params: []

- id: my_source_set_video_2
  label: "MY SOURCE Set VIDEO 2"
  kind: action
  command: "BE EF 03 06 00 5A 3E 01 00 20 36 0A 00"
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

- id: remote_front_set_off
  label: "REMOTE FRONT Set Off"
  kind: action
  command: "BE EF 03 06 00 FF 32 01 00 00 26 00 00"
  params: []

- id: remote_front_set_on
  label: "REMOTE FRONT Set On"
  kind: action
  command: "BE EF 03 06 00 6F 33 01 00 00 26 01 00"
  params: []

- id: remote_rear_set_off
  label: "REMOTE REAR Set Off"
  kind: action
  command: "BE EF 03 06 00 03 33 01 00 01 26 00 00"
  params: []

- id: remote_rear_set_on
  label: "REMOTE REAR Set On"
  kind: action
  command: "BE EF 03 06 00 93 32 01 00 01 26 01 00"
  params: []

- id: remote_top_set_off
  label: "REMOTE TOP Set Off"
  kind: action
  command: "BE EF 03 06 00 47 33 01 00 02 26 00 00"
  params: []

- id: remote_top_set_on
  label: "REMOTE TOP Set On"
  kind: action
  command: "BE EF 03 06 00 D7 32 01 00 02 26 01 00"
  params: []

- id: remote_id_set_all
  label: "REMOTE ID Set ALL"
  kind: action
  command: "BE EF 03 06 00 9F 30 01 00 08 26 00 00"
  params: []

- id: remote_id_set_1
  label: "REMOTE ID Set 1"
  kind: action
  command: "BE EF 03 06 00 0F 31 01 00 08 26 01 00"
  params: []

- id: remote_id_set_2
  label: "REMOTE ID Set 2"
  kind: action
  command: "BE EF 03 06 00 FF 31 01 00 08 26 02 00"
  params: []

- id: remote_id_set_3
  label: "REMOTE ID Set 3"
  kind: action
  command: "BE EF 03 06 00 6F 30 01 00 08 26 03 00"
  params: []

- id: remote_id_set_4
  label: "REMOTE ID Set 4"
  kind: action
  command: "BE EF 03 06 00 5F 32 01 00 08 26 04 00"
  params: []

- id: remote_frequency_normal_set_disable
  label: "REMOTE FREQUENCY NORMAL Set Disable"
  kind: action
  command: "BE EF 03 06 00 FF 3D 01 00 30 26 00 00"
  params: []

- id: remote_frequency_normal_set_enable
  label: "REMOTE FREQUENCY NORMAL Set Enable"
  kind: action
  command: "BE EF 03 06 00 6F 3C 01 00 30 26 01 00"
  params: []

- id: remote_frequency_high_set_disable
  label: "REMOTE FREQUENCY HIGH Set Disable"
  kind: action
  command: "BE EF 03 06 00 03 3C 01 00 31 26 00 00"
  params: []

- id: remote_frequency_high_set_enable
  label: "REMOTE FREQUENCY HIGH Set Enable"
  kind: action
  command: "BE EF 03 06 00 93 3D 01 00 31 26 01 00"
  params: []

- id: focus_set_increment
  label: "FOCUS Set Increment"
  kind: action
  command: "BE EF 03 06 00 6A 93 04 00 00 24 00 00"
  params: []

- id: focus_set_decrement
  label: "FOCUS Set Decrement"
  kind: action
  command: "BE EF 03 06 00 BB 92 05 00 00 24 00 00"
  params: []

- id: zoom_set_increment
  label: "ZOOM Set Increment"
  kind: action
  command: "BE EF 03 06 00 96 92 04 00 01 24 00 00"
  params: []

- id: zoom_set_decrement
  label: "ZOOM Set Decrement"
  kind: action
  command: "BE EF 03 06 00 47 93 05 00 01 24 00 00"
  params: []

- id: lens_shift_v_set_increment
  label: "LENS SHIFT -V Set Increment"
  kind: action
  command: "BE EF 03 06 00 D2 92 04 00 02 24 00 00"
  params: []

- id: lens_shift_v_set_decrement
  label: "LENS SHIFT -V Set Decrement"
  kind: action
  command: "BE EF 03 06 00 03 93 05 00 02 24 00 00"
  params: []

- id: lens_shift_h_set_increment
  label: "LENS SHIFT -H Set Increment"
  kind: action
  command: "BE EF 03 06 00 2E 93 04 00 03 24 00 00"
  params: []

- id: lens_shift_h_set_decrement
  label: "LENS SHIFT -H Set Decrement"
  kind: action
  command: "BE EF 03 06 00 FF 92 05 00 03 24 00 00"
  params: []

- id: lens_shift_centering_set_execute
  label: "LENS SHIFT CENTERING Set Execute"
  kind: action
  command: "BE EF 03 06 00 B8 93 06 00 04 24 00 00"
  params: []

- id: lens_memory_index_set_1
  label: "LENS MEMORY INDEX Set 1"
  kind: action
  command: "BE EF 03 06 00 4B 92 01 00 07 24 00 00"
  params: []

- id: lens_memory_index_set_2
  label: "LENS MEMORY INDEX Set 2"
  kind: action
  command: "BE EF 03 06 00 DB 93 01 00 07 24 01 00"
  params: []

- id: lens_memory_index_set_3
  label: "LENS MEMORY INDEX Set 3"
  kind: action
  command: "BE EF 03 06 00 2B 93 01 00 07 24 02 00"
  params: []

- id: lens_memory_load_set_execute
  label: "LENS MEMORY LOAD Set Execute"
  kind: action
  command: "BE EF 03 06 00 E8 90 06 00 08 24 00 00"
  params: []

- id: lens_memory_save_set_execute
  label: "LENS MEMORY SAVE Set Execute"
  kind: action
  command: "BE EF 03 06 00 14 91 06 00 09 24 00 00"
  params: []

- id: lens_memory_clear_set_execute
  label: "LENS MEMORY CLEAR Set Execute"
  kind: action
  command: "BE EF 03 06 00 50 91 06 00 0A 24 00 00"
  params: []

- id: magnify_set_increment
  label: "MAGNIFY Set Increment"
  kind: action
  command: "BE EF 03 06 00 1A D2 04 00 07 30 00 00"
  params: []

- id: magnify_set_decrement
  label: "MAGNIFY Set Decrement"
  kind: action
  command: "BE EF 03 06 00 CB D3 05 00 07 30 00 00"
  params: []

- id: freeze_set_normal
  label: "FREEZE Set NORMAL"
  kind: action
  command: "BE EF 03 06 00 83 D2 01 00 02 30 00 00"
  params: []

- id: freeze_set_freeze
  label: "FREEZE Set FREEZE"
  kind: action
  command: "BE EF 03 06 00 13 D3 01 00 02 30 01 00"
  params: []

- id: shutter_set_off
  label: "SHUTTER Set OFF"
  kind: action
  command: "BE EF 03 06 00 F3 93 01 00 05 24 00 00"
  params: []

- id: shutter_set_on
  label: "SHUTTER Set ON"
  kind: action
  command: "BE EF 03 06 00 63 92 01 00 05 24 01 00"
  params: []

- id: pby_p_set_off
  label: "PbyP Set OFF"
  kind: action
  command: "BE EF 03 06 00 3E 26 01 00 10 23 00 00"
  params: []

- id: pby_p_set_on
  label: "PbyP Set ON"
  kind: action
  command: "BE EF 03 06 00 AE 27 01 00 10 23 01 00"
  params: []

- id: pby_p_right_source_set_computer_in_1
  label: "PbyP RIGHT SOURCE Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 86 27 01 00 12 23 00 00"
  params: []

- id: pby_p_right_source_set_computer_in_2
  label: "PbyP RIGHT SOURCE Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 46 25 01 00 12 23 04 00"
  params: []

- id: pby_p_right_source_set_bnc
  label: "PbyP RIGHT SOURCE Set BNC"
  kind: action
  command: "BE EF 03 06 00 B6 25 01 00 12 23 07 00"
  params: []

- id: pby_p_right_source_set_hdmi
  label: "PbyP RIGHT SOURCE Set HDMI"
  kind: action
  command: "BE EF 03 06 00 76 27 01 00 12 23 03 00"
  params: []

- id: pby_p_right_source_set_dvi_d
  label: "PbyP RIGHT SOURCE Set DVI-D"
  kind: action
  command: "BE EF 03 06 00 D6 21 01 00 12 23 09 00"
  params: []

- id: pby_p_right_source_set_component
  label: "PbyP RIGHT SOURCE Set COMPONENT"
  kind: action
  command: "BE EF 03 06 00 D6 24 01 00 12 23 05 00"
  params: []

- id: pby_p_right_source_set_s_video
  label: "PbyP RIGHT SOURCE Set S-VIDEO"
  kind: action
  command: "BE EF 03 06 00 E6 26 01 00 12 23 02 00"
  params: []

- id: pby_p_right_source_set_video_1
  label: "PbyP RIGHT SOURCE Set VIDEO 1"
  kind: action
  command: "BE EF 03 06 00 16 26 01 00 12 23 01 00"
  params: []

- id: pby_p_right_source_set_video_2
  label: "PbyP RIGHT SOURCE Set VIDEO 2"
  kind: action
  command: "BE EF 03 06 00 26 21 01 00 12 23 0A 00"
  params: []

- id: pby_p_main_area_set_left
  label: "PbyP MAIN AREA Set LEFT"
  kind: action
  command: "BE EF 03 06 00 7A 26 01 00 13 23 00 00"
  params: []

- id: pby_p_main_area_set_right
  label: "PbyP MAIN AREA Set RIGHT"
  kind: action
  command: "BE EF 03 06 00 EA 27 01 00 13 23 01 00"
  params: []

- id: pby_p_left_source_set_computer_in_1
  label: "PbyP LEFT SOURCE Set COMPUTER IN 1"
  kind: action
  command: "BE EF 03 06 00 F2 26 01 00 15 23 00 00"
  params: []

- id: pby_p_left_source_set_computer_in_2
  label: "PbyP LEFT SOURCE Set COMPUTER IN 2"
  kind: action
  command: "BE EF 03 06 00 32 24 01 00 15 23 04 00"
  params: []

- id: pby_p_left_source_set_bnc
  label: "PbyP LEFT SOURCE Set BNC"
  kind: action
  command: "BE EF 03 06 00 C2 24 01 00 15 23 07 00"
  params: []

- id: pby_p_left_source_set_hdmi
  label: "PbyP LEFT SOURCE Set HDMI"
  kind: action
  command: "BE EF 03 06 00 02 26 01 00 15 23 03 00"
  params: []

- id: pby_p_left_source_set_dvi_d
  label: "PbyP LEFT SOURCE Set DVI-D"
  kind: action
  command: "BE EF 03 06 00 A2 20 01 00 15 23 09 00"
  params: []

- id: pby_p_left_source_set_component
  label: "PbyP LEFT SOURCE Set COMPONENT"
  kind: action
  command: "BE EF 03 06 00 A2 25 01 00 15 23 05 00"
  params: []

- id: pby_p_left_source_set_s_video
  label: "PbyP LEFT SOURCE Set S-VIDEO"
  kind: action
  command: "BE EF 03 06 00 92 27 01 00 15 23 02 00"
  params: []

- id: pby_p_left_source_set_video_1
  label: "PbyP LEFT SOURCE Set VIDEO 1"
  kind: action
  command: "BE EF 03 06 00 62 27 01 00 15 23 01 00"
  params: []

- id: pby_p_left_source_set_video_2
  label: "PbyP LEFT SOURCE Set VIDEO 2"
  kind: action
  command: "BE EF 03 06 00 52 20 01 00 15 23 0A 00"
  params: []

- id: pby_p_swap_set_execute
  label: "PbyP SWAP Set Execute"
  kind: action
  command: "BE EF 03 06 00 01 27 06 00 16 23 00 00"
  params: []
```

## Feedbacks
```yaml
- id: power_set_get
  label: "Power Set Get"
  kind: query
  query_command: "BE EF 03 06 00 19 D3 02 00 00 60 00 00"

- id: input_source_set_get
  label: "Input Source Set Get"
  kind: query
  query_command: "BE EF 03 06 00 CD D2 02 00 00 20 00 00"

- id: error_status_set_get
  label: "Error Status Set Get"
  kind: query
  query_command: "BE EF 03 06 00 D9 D8 02 00 20 60 00 00"

- id: brightness_get
  label: "BRIGHTNESS Get"
  kind: query
  query_command: "BE EF 03 06 00 89 D2 02 00 03 20 00 00"

- id: contrast_get
  label: "CONTRAST Get"
  kind: query
  query_command: "BE EF 03 06 00 FD D3 02 00 04 20 00 00"

- id: picture_mode_set_get
  label: "PICTURE MODE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 10 F6 02 00 BA 30 00 00"

- id: gamma_set_get
  label: "GAMMA Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F4 F0 02 00 A1 30 00 00"

- id: user_gamma_pattern_set_get
  label: "User Gamma Pattern Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C8 FA 02 00 80 30 00 00"

- id: user_gamma_point_1_set_get
  label: "User Gamma Point 1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 08 FE 02 00 90 30 00 00"

- id: user_gamma_point_2_set_get
  label: "User Gamma Point 2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F4 FF 02 00 91 30 00 00"

- id: user_gamma_point_3_set_get
  label: "User Gamma Point 3 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B0 FF 02 00 92 30 00 00"

- id: user_gamma_point_4_set_get
  label: "User Gamma Point 4 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 4C FE 02 00 93 30 00 00"

- id: user_gamma_point_5_set_get
  label: "User Gamma Point 5 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 38 FF 02 00 94 30 00 00"

- id: user_gamma_point_6_set_get
  label: "User Gamma Point 6 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C4 FE 02 00 95 30 00 00"

- id: user_gamma_point_7_set_get
  label: "User Gamma Point 7 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 80 FE 02 00 96 30 00 00"

- id: user_gamma_point_8_set_get
  label: "User Gamma Point 8 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 7C FF 02 00 97 30 00 00"

- id: color_temp_set_get
  label: "COLOR TEMP Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C8 F5 02 00 B0 30 00 00"

- id: color_temp_gain_r_set_get
  label: "COLOR TEMP GAIN R Set Get"
  kind: query
  query_command: "BE EF 03 06 00 34 F4 02 00 B1 30 00 00"

- id: color_temp_gain_g_set_get
  label: "COLOR TEMP GAIN G Set Get"
  kind: query
  query_command: "BE EF 03 06 00 70 F4 02 00 B2 30 00 00"

- id: color_temp_gain_b_set_get
  label: "COLOR TEMP GAIN B Set Get"
  kind: query
  query_command: "BE EF 03 06 00 8C F5 02 00 B3 30 00 00"

- id: color_temp_offset_r_set_get
  label: "COLOR TEMP OFFSET R Set Get"
  kind: query
  query_command: "BE EF 03 06 00 04 F5 02 00 B5 30 00 00"

- id: color_temp_offset_g_set_get
  label: "COLOR TEMP OFFSET G Set Get"
  kind: query
  query_command: "BE EF 03 06 00 40 F5 02 00 B6 30 00 00"

- id: color_temp_offset_b_set_get
  label: "COLOR TEMP OFFSET B Set Get"
  kind: query
  query_command: "BE EF 03 06 00 BC F4 02 00 B7 30 00 00"

- id: color_set_get
  label: "COLOR Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B5 72 02 00 02 22 00 00"

- id: tint_set_get
  label: "TINT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 49 73 02 00 03 22 00 00"

- id: sharpness_set_get
  label: "SHARPNESS Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F1 72 02 00 01 22 00 00"

- id: active_iris_set_get
  label: "ACTIVE IRIS Set Get"
  kind: query
  query_command: "BE EF 03 06 00 38 22 02 00 04 33 00 00"

- id: manual_iris_set_get
  label: "MANUAL IRIS Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B0 22 02 00 02 33 00 00"

- id: progressive_set_get
  label: "PROGRESSIVE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 79 72 02 00 07 22 00 00"

- id: 3_d_ycs_set_get
  label: "3D-YCS Set Get"
  kind: query
  query_command: "BE EF 03 06 00 D5 70 02 00 0A 22 00 00"

- id: video_nr_set_get
  label: "VIDEO NR Set Get"
  kind: query
  query_command: "BE EF 03 06 00 85 73 02 00 06 22 00 00"

- id: aspect_set_get
  label: "ASPECT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 AD D0 02 00 08 20 00 00"

- id: over_scan_set_get
  label: "OVER SCAN Set Get"
  kind: query
  query_command: "BE EF 03 06 00 91 70 02 00 09 22 00 00"

- id: v_position_set_get
  label: "V POSITION Set Get"
  kind: query
  query_command: "BE EF 03 06 00 0D 83 02 00 00 21 00 00"

- id: h_position_set_get
  label: "H POSITION Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F1 82 02 00 01 21 00 00"

- id: h_phase_set_get
  label: "H PHASE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 49 83 02 00 03 21 00 00"

- id: h_size_set_get
  label: "H SIZE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B5 82 02 00 02 21 00 00"

- id: color_space_set_get
  label: "COLOR SPACE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 3D 72 02 00 04 22 00 00"

- id: component_set_get
  label: "COMPONENT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 79 D7 02 00 17 20 00 00"

- id: s_video_format_set_get
  label: "S-VIDEO FORMAT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 75 76 02 00 12 22 00 00"

- id: video_1_format_set_get
  label: "VIDEO 1 FORMAT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 31 76 02 00 11 22 00 00"

- id: video_2_format_set_get
  label: "VIDEO 2 FORMAT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 15 74 02 00 1A 22 00 00"

- id: hdmi_format_set_get
  label: "HDMI FORMAT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 89 77 02 00 13 22 00 00"

- id: dvi_d_format_set_get
  label: "DVI-D FORMAT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 51 74 02 00 19 22 00 00"

- id: hdmi_range_set_get
  label: "HDMI RANGE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B5 D8 02 00 22 20 00 00"

- id: dvi_d_range_set_get
  label: "DVI-D RANGE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 0D D9 02 00 20 20 00 00"

- id: computer_in_1_set_get
  label: "COMPUTER IN 1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 0D D6 02 00 10 20 00 00"

- id: computer_in_2_set_get
  label: "COMPUTER IN 2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F1 D7 02 00 11 20 00 00"

- id: bnc_set_get
  label: "BNC Set Get"
  kind: query
  query_command: "BE EF 03 06 00 D5 D5 02 00 1A 20 00 00"

- id: frame_lock_computer_in_1_set_get
  label: "FRAME LOCK - COMPUTER IN 1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 08 C2 02 00 50 30 00 00"

- id: frame_lock_computer_in_2_set_get
  label: "FRAME LOCK - COMPUTER IN 2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 38 C3 02 00 54 30 00 00"

- id: frame_lock_bnc_set_get
  label: "FRAME LOCK - BNC Set Get"
  kind: query
  query_command: "BE EF 03 06 00 7C C3 02 00 57 30 00 00"

- id: frame_lock_hdmi_set_get
  label: "FRAME LOCK - HDMI Set Get"
  kind: query
  query_command: "BE EF 03 06 00 4C C2 02 00 53 30 00 00"

- id: frame_lock_dvi_d_set_get
  label: "FRAME LOCK - DVI-D Set Get"
  kind: query
  query_command: "BE EF 03 06 00 94 C1 02 00 59 30 00 00"

- id: keystone_v_set_get
  label: "KEYSTONE V Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B9 D3 02 00 07 20 00 00"

- id: auto_keystone_v_set_get
  label: "AUTO KEYSTONE V Set Get"
  kind: query
  query_command: "BE EF 03 06 00 D9 D1 02 00 0F 20 00 00"

- id: keystone_h_set_get
  label: "KEYSTONE H Set Get"
  kind: query
  query_command: "BE EF 03 06 00 E9 D0 02 00 0B 20 00 00"

- id: eco_mode_set_get
  label: "ECO MODE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 08 23 02 00 00 33 00 00"

- id: mirror_set_get
  label: "MIRROR Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F4 D2 02 00 01 30 00 00"

- id: monitor_out_computer_in_1_set_get
  label: "MONITOR OUT - COMPUTER IN 1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 0D F4 02 00 B0 20 00 00"

- id: monitor_out_computer_in_2_set_get
  label: "MONITOR OUT - COMPUTER IN 2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 3D F5 02 00 B4 20 00 00"

- id: monitor_out_bnc_set_get
  label: "MONITOR OUT - BNC Set Get"
  kind: query
  query_command: "BE EF 03 06 00 79 F5 02 00 B7 20 00 00"

- id: monitor_out_hdmi_set_get
  label: "MONITOR OUT - HDMI Set Get"
  kind: query
  query_command: "BE EF 03 06 00 49 F4 02 00 B3 20 00 00"

- id: monitor_out_dvi_d_set_get
  label: "MONITOR OUT - DVI-D Set Get"
  kind: query
  query_command: "BE EF 03 06 00 91 F7 02 00 B9 20 00 00"

- id: monitor_out_component_set_get
  label: "MONITOR OUT - COMPONENT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C1 F4 02 00 B5 20 00 00"

- id: monitor_out_s_video_set_get
  label: "MONITOR OUT - S-VIDEO Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B5 F5 02 00 B2 20 00 00"

- id: monitor_out_video_1_set_get
  label: "MONITOR OUT - VIDEO 1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F1 F5 02 00 B1 20 00 00"

- id: monitor_out_video_2_set_get
  label: "MONITOR OUT - VIDEO 2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 D5 F7 02 00 BA 20 00 00"

- id: monitor_out_standby_set_get
  label: "MONITOR OUT - STANDBY Set Get"
  kind: query
  query_command: "BE EF 03 06 00 19 F7 02 00 BF 20 00 00"

- id: language_set_get
  label: "LANGUAGE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C4 D3 02 00 05 30 00 00"

- id: menu_position_v_set_get
  label: "MENU POSITION V Set Get"
  kind: query
  query_command: "BE EF 03 06 00 40 D7 02 00 16 30 00 00"

- id: menu_position_h_set_get
  label: "MENU POSITION H Set Get"
  kind: query
  query_command: "BE EF 03 06 00 04 D7 02 00 15 30 00 00"

- id: blank_set_get
  label: "BLANK Set Get"
  kind: query
  query_command: "BE EF 03 06 00 08 D3 02 00 00 30 00 00"

- id: blank_on_off_set_get
  label: "BLANK On/Off Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C8 D8 02 00 20 30 00 00"

- id: start_up_set_get
  label: "START UP Set Get"
  kind: query
  query_command: "BE EF 03 06 00 38 D2 02 00 04 30 00 00"

- id: my_screen_lock_set_get
  label: "MyScreen LOCK Set Get"
  kind: query
  query_command: "BE EF 03 06 00 08 EF 02 00 C0 30 00 00"

- id: message_set_get
  label: "MESSAGE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 BC D6 02 00 17 30 00 00"

- id: template_set_get
  label: "TEMPLATE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 70 D9 02 00 22 30 00 00"

- id: template_on_off_set_get
  label: "TEMPLATE On/Off Set Get"
  kind: query
  query_command: "BE EF 03 06 00 8C D8 02 00 23 30 00 00"

- id: closed_caption_display_set_get
  label: "CLOSED CAPTION DISPLAY Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C9 62 02 00 00 37 00 00"

- id: closed_caption_mode_set_get
  label: "CLOSED CAPTION MODE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 35 63 02 00 01 37 00 00"

- id: closed_caption_channel_set_get
  label: "CLOSED CAPTION CHANNEL Set Get"
  kind: query
  query_command: "BE EF 03 06 00 71 63 02 00 02 37 00 00"

- id: source_skip_computer_in_1_set_get
  label: "SOURCE SKIP COMPUTER IN 1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 CD 78 02 00 20 22 00 00"

- id: source_skip_computer_in_2_set_get
  label: "SOURCE SKIP COMPUTER IN 2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 FD 79 02 00 24 22 00 00"

- id: source_skip_bnc_set_get
  label: "SOURCE SKIP BNC Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B9 79 02 00 27 22 00 00"

- id: source_skip_hdmi_set_get
  label: "SOURCE SKIP HDMI Set Get"
  kind: query
  query_command: "BE EF 03 06 00 89 78 02 00 23 22 00 00"

- id: source_skip_dvi_d_set_get
  label: "SOURCE SKIP DVI-D Set Get"
  kind: query
  query_command: "BE EF 03 06 00 51 7B 02 00 29 22 00 00"

- id: source_skip_component_set_get
  label: "SOURCE SKIP COMPONENT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 01 78 02 00 25 22 00 00"

- id: source_skip_s_video_set_get
  label: "SOURCE SKIP S-VIDEO Set Get"
  kind: query
  query_command: "BE EF 03 06 00 75 79 02 00 22 22 00 00"

- id: source_skip_video_1_set_get
  label: "SOURCE SKIP VIDEO 1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 31 79 02 00 21 22 00 00"

- id: source_skip_video_2_set_get
  label: "SOURCE SKIP VIDEO 2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 15 7B 02 00 2A 22 00 00"

- id: auto_search_set_get
  label: "AUTO SEARCH Set Get"
  kind: query
  query_command: "BE EF 03 06 00 85 D6 02 00 16 20 00 00"

- id: direct_on_set_get
  label: "DIRECT ON Set Get"
  kind: query
  query_command: "BE EF 03 06 00 08 89 02 00 20 31 00 00"

- id: auto_off_set_get
  label: "AUTO OFF Set Get"
  kind: query
  query_command: "BE EF 03 06 00 08 86 02 00 10 31 00 00"

- id: shutter_timer_set_get
  label: "SHUTTER TIMER Set Get"
  kind: query
  query_command: "BE EF 03 06 00 84 93 02 00 06 24 00 00"

- id: lamp_time_low_set_get
  label: "LAMP TIME LOW Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C2 FF 02 00 90 10 00 00"

- id: lamp_time_high_set_get
  label: "LAMP TIME HIGH Set Get"
  kind: query
  query_command: "BE EF 03 06 00 2A FD 02 00 9E 10 00 00"

- id: filter_time_low_set_get
  label: "FILTER TIME LOW Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C2 F0 02 00 A0 10 00 00"

- id: filter_time_high_set_get
  label: "FILTER TIME HIGH Set Get"
  kind: query
  query_command: "BE EF 03 06 00 D6 FC 02 00 9F 10 00 00"

- id: my_button_1_set_get
  label: "MY BUTTON-1 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 09 33 02 00 00 36 00 00"

- id: my_button_2_set_get
  label: "MY BUTTON-2 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 F5 32 02 00 01 36 00 00"

- id: my_button_3_set_get
  label: "MY BUTTON-3 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B1 32 02 00 02 36 00 00"

- id: my_button_4_set_get
  label: "MY BUTTON-4 Set Get"
  kind: query
  query_command: "BE EF 03 06 00 4D 33 02 00 03 36 00 00"

- id: my_source_set_get
  label: "MY SOURCE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C9 38 02 00 20 36 00 00"

- id: my_image_set_get
  label: "MY IMAGE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 09 C3 02 00 00 35 00 00"

- id: remote_front_set_get
  label: "REMOTE FRONT Set Get"
  kind: query
  query_command: "BE EF 03 06 00 CC 32 02 00 00 26 00 00"

- id: remote_rear_set_get
  label: "REMOTE REAR Set Get"
  kind: query
  query_command: "BE EF 03 06 00 30 33 02 00 01 26 00 00"

- id: remote_top_set_get
  label: "REMOTE TOP Set Get"
  kind: query
  query_command: "BE EF 03 06 00 74 33 02 00 02 26 00 00"

- id: remote_id_set_get
  label: "REMOTE ID Set Get"
  kind: query
  query_command: "BE EF 03 06 00 AC 30 02 00 08 26 00 00"

- id: remote_frequency_normal_set_get
  label: "REMOTE FREQUENCY NORMAL Set Get"
  kind: query
  query_command: "BE EF 03 06 00 CC 3D 02 00 30 26 00 00"

- id: remote_frequency_high_set_get
  label: "REMOTE FREQUENCY HIGH Set Get"
  kind: query
  query_command: "BE EF 03 06 00 30 3C 02 00 31 26 00 00"

- id: lens_memory_index_set_get
  label: "LENS MEMORY INDEX Set Get"
  kind: query
  query_command: "BE EF 03 06 00 78 92 02 00 07 24 00 00"

- id: lens_memory_focus_set_get
  label: "LENS MEMORY FOCUS Set Get"
  kind: query
  query_command: "BE EF 03 06 00 28 91 02 00 0B 24 00 00"

- id: lens_memory_zoom_set_get
  label: "LENS MEMORY ZOOM Set Get"
  kind: query
  query_command: "BE EF 03 06 00 5C 90 02 00 0C 24 00 00"

- id: lens_memory_lens_shift_v_set_get
  label: "LENS MEMORY LENS SHIFT -V Set Get"
  kind: query
  query_command: "BE EF 03 06 00 A0 91 02 00 0D 24 00 00"

- id: lens_memory_lens_shift_h_set_get
  label: "LENS MEMORY LENS SHIFT -H Set Get"
  kind: query
  query_command: "BE EF 03 06 00 E4 91 02 00 0E 24 00 00"

- id: lens_memory_lens_type_set_get
  label: "LENS MEMORY LENS TYPE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 18 90 02 00 0F 24 00 00"

- id: magnify_set_get
  label: "MAGNIFY Set Get"
  kind: query
  query_command: "BE EF 03 06 00 7C D2 02 00 07 30 00 00"

- id: freeze_set_get
  label: "FREEZE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B0 D2 02 00 02 30 00 00"

- id: shutter_set_get
  label: "SHUTTER Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C0 93 02 00 05 24 00 00"

- id: pby_p_set_get
  label: "PbyP Set Get"
  kind: query
  query_command: "BE EF 03 06 00 0D 26 02 00 10 23 00 00"

- id: pby_p_right_source_set_get
  label: "PbyP RIGHT SOURCE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 B5 27 02 00 12 23 00 00"

- id: pby_p_main_area_set_get
  label: "PbyP MAIN AREA Set Get"
  kind: query
  query_command: "BE EF 03 06 00 49 26 02 00 13 23 00 00"

- id: pby_p_left_source_set_get
  label: "PbyP LEFT SOURCE Set Get"
  kind: query
  query_command: "BE EF 03 06 00 C1 26 02 00 15 23 00 00"
```

## Variables
```yaml
# All settable parameters are represented as discrete SET actions in ## Actions
# (the source enumerates each enum value as its own command row rather than as
# a parameter range). No additional continuous variables to declare.
```

## Events
```yaml
# Source documents no unsolicited notifications. The projector emits test data
# on power-on and lamp-strike that the host must ignore, but these are not
# state events.
```

## Macros
```yaml
# Source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []  # UNRESOLVED: source contains no interlock/confirmation procedures
interlocks:
  - warm_up: "Commands are not accepted during warm-up. Projector returns no response."
  - test_data_ignore: "Projector emits test data on power-supply ON and on lamp-strike; host MUST ignore this data."
# UNRESOLVED: no power-sequencing, lamp-shutdown, or thermal-interlock procedures
# in the refined source. Full safety content (if any) lives in the user manual,
# not the protocol reference that was refined.
```

## Notes

- **Source scope:** refined document is the LX750/LW650/LW720/LS+700 tech-reference protocol section. The LWxxxi/LWUxxxi/LX801i D-Series family shares this protocol family per Christie's D-Series documentation bundle, but per-row command CRC bytes are computed from the command-data bytes via an undisclosed polynomial — they must be copied verbatim from the source table (already done by the deterministic merge), not recomputed.
- **Model-specific ASPECT variants:** `SMALL` is LX750/LS+700 only; `NATIVE` is LW650/LW720/LS+700 only; `16:10` and `FULL` are LW650/LW720 only. Mapping to the LW/LWU/LX801i D-Series models is not stated — treat as UNRESOLVED per-model availability.
- **PJLink:** Class 1 supported. INF2 model-name response returns `LX750`, `LW650/LW720`, or `LS+700` — these do NOT match the D-Series model names, confirming the source doc predates the D-Series relabel. PJLink password = Web Browser Control password (shared with TCP auth).
- **Error status GET:** returns a bitmap — `00`=normal, `01`=cover, `02`=fan, `03`=lamp, `04`=temp, `05`=airflow, `07`=cold, `08`=filter, `0F`=shutter, `10`=lens-shift.
- **Auth quirk:** port 23 defaults to auth disabled; port 9715 defaults to auth enabled. Shared password is blank by default. Enabling auth on either port enables it on both.

<!-- UNRESOLVED: LX801i dedicated protocol doc (020-102128-03) not retrieved — may document LX801i-specific extensions. -->
<!-- UNRESOLVED: CRC algorithm not stated; per-row values are authoritative. -->
<!-- UNRESOLVED: exact D-Series model ↔ source-doc model mapping for ASPECT and LANGUAGE variant availability. -->
<!-- UNRESOLVED: baud rate for standalone (non-daisy-chain) RS-232C fixed at 19200 per source; daisy-chain allows 4800–38400. -->
````

Spec emitted. Prose + transport + traits + safety + notes only. Actions/Feedbacks bodies left empty per pre-pass — merged separately with 490 actions + 124 feedbacks already authored.

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - res.cloudinary.com
  - qed-productions.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000161-02-christie-tech-guid-lw650_ls700_lx750_lw720-.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Christie-Terra-External-Control-Protocol-XY-Switcher-API.pdf"
  - https://www.christiedigital.com/globalassets/resources/public/020-102271-04-christie-lit-tech-ref-gs-700-850-api.pdf
  - https://qed-productions.com/downloads/christie/serial-communications.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000789-02-christie-lit-man-usr-d-series-tech-guid.pdf
retrieved_at: 2026-07-25T07:32:33.433Z
last_checked_at: 2026-08-05T08:16:06.547Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:16:06.547Z
matched_actions: 614
action_count: 614
confidence: medium
summary: "All 614 spec hex frames appear verbatim in the source BE EF command table; transport values match the source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- POWR
- "POWR?"
- INPT
- "INPT?"
- AVMT
- "AVMT?"
- "ERST?"
- "LAMP?"
- "INST?"
- "NAME?"
- "INF1?"
- "INF2?"
- "source document is the LX750 tech reference; LX801i has a dedicated protocol doc (020-102128-03) that was not retrieved — coverage gaps for LX801i-specific behaviour are possible."
- "firmware version compatibility not stated in source."
- "voltage / power / lamp wattage specs not in source (refined doc covers protocol only)."
- "flow control not stated in source; pinout shows CTS wired but no RTS pin"
- "source contains no interlock/confirmation procedures"
- "no power-sequencing, lamp-shutdown, or thermal-interlock procedures"
- "LX801i dedicated protocol doc (020-102128-03) not retrieved — may document LX801i-specific extensions."
- "CRC algorithm not stated; per-row values are authoritative."
- "exact D-Series model ↔ source-doc model mapping for ASPECT and LANGUAGE variant availability."
- "baud rate for standalone (non-daisy-chain) RS-232C fixed at 19200 per source; daisy-chain allows 4800–38400."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
