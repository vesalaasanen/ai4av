---
spec_id: admin/christie-lw650
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie LW650 Control Spec"
manufacturer: Christie
model_family: LW650
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - LW650
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000161-02-christie-tech-guid-lw650_ls700_lx750_lw720-.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000158-01-christie-lw650-lx750-ls700-user-manual-concise.pdf
  - https://www.manualslib.com/manual/700008/Christie-Lw650.html
retrieved_at: 2026-06-02T21:05:26.594Z
last_checked_at: 2026-06-25T19:45:13.620Z
generated_at: 2026-06-25T19:45:13.620Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PJLink UDP port (standard 4352) not stated in source; only the manual protocol ports 23/9715 are documented."
  - "Daisy-chain physical layer (RS-485 vs RS-232) not stated; protocol header differs but cable type not specified."
  - "flow control not stated in source (pins 7/8 listed but no RTS/CTS/XON-XOFF setting documented)"
  - "unit (hours vs hundreds-of-hours) not stated in source; spec returns raw 16-bit halves."
  - "source does not document any unsolicited notifications / asynchronous event frames."
  - "source does not describe any pre-defined multi-step macro sequences on the projector."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "polynomial not documented in this source.)"
verification:
  verdict: verified
  checked_at: 2026-06-25T19:45:13.620Z
  matched_actions: 614
  action_count: 614
  confidence: medium
  summary: "deterministic presence proof: 614/614 payloads verbatim in source; stratified Sonnet sample corroborated (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Christie LW650 Control Spec

## Summary
Christie LW650 WXGA projector. RS-232C (D-sub 9, 19200 8N1) CONTROL port plus TCP/IP command control on ports 23 and 9715, with PJLink Class 1 support. The serial protocol uses 13-byte frames (7-byte header + 6-byte command data) carried identically over RS-232C and TCP#23. The same command table covers the LX750, LW720, and LS+700 per the PJLink INF2 response; footnoted commands apply only to specific models.

<!-- UNRESOLVED: PJLink UDP port (standard 4352) not stated in source; only the manual protocol ports 23/9715 are documented. -->
<!-- UNRESOLVED: Daisy-chain physical layer (RS-485 vs RS-232) not stated; protocol header differs but cable type not specified. -->

## Transport
```yaml
# The projector exposes the same 13-byte binary frame over three transports:
#   1. RS-232C CONTROL port (D-sub 9, 19200 8N1)
#   2. TCP #23 (same frame; ASCII-compatible)
#   3. TCP #9715 (wrapped: 02 0D <13B payload> <checksum> <connID 0..255>)
#   4. PJLink Class 1 (separate protocol, not part of the binary frame set)
protocols:
  - serial
  - tcp
addressing:
  tcp_ports:
    - 23
    - 9715
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source (pins 7/8 listed but no RTS/CTS/XON-XOFF setting documented)
auth:
  # Source describes auth as an optional per-port setting toggled via web UI.
  # RS-232C has no authentication.
  # TCP#23 default: Authentication Disabled.
  # TCP#9715 default: Authentication Enabled (MD5 challenge-response).
  # PJLink uses the same password as the web UI; if no web password is set, PJLink runs unauthenticated.
  type: optional
  tcp_23_default: disabled
  tcp_9715_default: enabled
  algorithm: md5  # challenge-response: 8-byte random nonce from projector, MD5(nonce + password) prefixed to command
  pjlink_uses_web_password: true
```

**Frame format (RS-232C and TCP#23, all 13 bytes, hex):**
```
Header (7 bytes)  : BE EF 03 06 00 CRC_low CRC_high
Command data (6B) : Action(2) Type(2) Setting(2)
```
- Action: 0001=Set, 0002=Get, 0004=Increment, 0005=Decrement, 0006=Execute
- Type and Setting fields are source-specific; CRC is over the 6 command-data bytes
- Success reply: `06 xx` (xx = 1st byte of action, e.g. `06 01` for Set)
- Unrecognized command: `15 xx`
- Cannot execute: `1C xxxx`
- TCP#23 auth error: `1F 0400`
- TCP#9715 wraps each frame as: `02 0D <13B payload> <checksum> <connID>`; reply prefixes `06`,`15`,`1C`,`1D`,`1F` + 2 bytes data + `xx` (connID echoed)

**Interval requirement (source):** ≥40ms between response code and any next code. Commands are not accepted during warm-up. TCP#9715 auto-disconnects after 30s of idle.

## Traits
```yaml
- powerable       # Power ON/OFF/GET commands
- queryable       # GET (Action 02) returns state for nearly every setting
- levelable       # Brightness, Contrast, Color, Tint, Sharpness, User Gamma points, Color Temp gain/offset
- routable        # Input source selection, Monitor Out routing, PbyP source selection
```

## Actions
```yaml
# Every `command:` below is a complete 13-byte frame: 7-byte header + 6-byte command data,
# hex bytes verbatim from the source table. For RS-232C and TCP#23, send the 13 bytes as-is.
# For TCP#9715, wrap as: 02 0D <command> <checksum> <connID 0..255>.

# ─── Power ──────────────────────────────────────────────────────────────────
- id: power_off
  label: Power Off
  kind: action
  command: "BE EF 03 06 00 2A D3 01 00 00 60 00 00"
- id: power_on
  label: Power On
  kind: action
  command: "BE EF 03 06 00 BA D2 01 00 00 60 01 00"
- id: power_status_get
  label: Power Status (Get)
  kind: query
  command: "BE EF 03 06 00 19 D3 02 00 00 60 00 00"
  # Returns: 00 00=Off, 01 00=On, 02 00=Cool Down

# ─── Input Source ───────────────────────────────────────────────────────────
- id: input_computer_in_1
  label: Select Input COMPUTER IN 1
  kind: action
  command: "BE EF 03 06 00 FE D2 01 00 00 20 00 00"
- id: input_computer_in_2
  label: Select Input COMPUTER IN 2
  kind: action
  command: "BE EF 03 06 00 3E D0 01 00 00 20 04 00"
- id: input_hdmi
  label: Select Input HDMI
  kind: action
  command: "BE EF 03 06 00 0E D2 01 00 00 20 03 00"
- id: input_video_1
  label: Select Input VIDEO 1
  kind: action
  command: "BE EF 03 06 00 6E D3 01 00 00 20 01 00"
- id: input_s_video
  label: Select Input S-VIDEO
  kind: action
  command: "BE EF 03 06 00 9E D3 01 00 00 20 02 00"
- id: input_component
  label: Select Input COMPONENT
  kind: action
  command: "BE EF 03 06 00 AE D1 01 00 00 20 05 00"
- id: input_bnc
  label: Select Input BNC
  kind: action
  command: "BE EF 03 06 00 CE D0 01 00 00 20 07 00"
- id: input_dvi_d
  label: Select Input DVI-D
  kind: action
  command: "BE EF 03 06 00 AE D4 01 00 00 20 09 00"
- id: input_video_2
  label: Select Input VIDEO 2
  kind: action
  command: "BE EF 03 06 00 5E D4 01 00 00 20 0A 00"
- id: input_get
  label: Current Input Source (Get)
  kind: query
  command: "BE EF 03 06 00 CD D2 02 00 00 20 00 00"

# ─── Error Status ───────────────────────────────────────────────────────────
- id: error_status_get
  label: Error Status (Get)
  kind: query
  command: "BE EF 03 06 00 D9 D8 02 00 20 60 00 00"
  # Returns (2 bytes): 00 00=Normal, 01 00=Cover, 02 00=Fan, 03 00=Lamp,
  #   04 00=Temp, 05 00=Air flow, 07 00=Cold, 08 00=Filter,
  #   0F 00=Shutter, 10 00=Lens Shift

# ─── Brightness ─────────────────────────────────────────────────────────────
- id: brightness_get
  label: Brightness (Get)
  kind: query
  command: "BE EF 03 06 00 89 D2 02 00 03 20 00 00"
- id: brightness_increment
  label: Brightness Increment
  kind: action
  command: "BE EF 03 06 00 EF D2 04 00 03 20 00 00"
- id: brightness_decrement
  label: Brightness Decrement
  kind: action
  command: "BE EF 03 06 00 3E D3 05 00 03 20 00 00"

# ─── Contrast ───────────────────────────────────────────────────────────────
- id: contrast_get
  label: Contrast (Get)
  kind: query
  command: "BE EF 03 06 00 FD D3 02 00 04 20 00 00"
- id: contrast_increment
  label: Contrast Increment
  kind: action
  command: "BE EF 03 06 00 9B D3 04 00 04 20 00 00"
- id: contrast_decrement
  label: Contrast Decrement
  kind: action
  command: "BE EF 03 06 00 4A D2 05 00 04 20 00 00"

# ─── Picture Mode ───────────────────────────────────────────────────────────
- id: picture_mode_normal
  label: Picture Mode NORMAL
  kind: action
  command: "BE EF 03 06 00 23 F6 01 00 BA 30 00 00"
- id: picture_mode_cinema
  label: Picture Mode CINEMA
  kind: action
  command: "BE EF 03 06 00 B3 F7 01 00 BA 30 01 00"
- id: picture_mode_dynamic
  label: Picture Mode DYNAMIC
  kind: action
  command: "BE EF 03 06 00 E3 F4 01 00 BA 30 04 00"
- id: picture_mode_board_black
  label: Picture Mode BOARD(BLACK)
  kind: action
  command: "BE EF 03 06 00 E3 EF 01 00 BA 30 20 00"
- id: picture_mode_board_green
  label: Picture Mode BOARD(GREEN)
  kind: action
  command: "BE EF 03 06 00 73 EE 01 00 BA 30 21 00"
- id: picture_mode_white_board
  label: Picture Mode WHITE BOARD
  kind: action
  command: "BE EF 03 06 00 83 EE 01 00 BA 30 22 00"
- id: picture_mode_day_time
  label: Picture Mode DAY TIME
  kind: action
  command: "BE EF 03 06 00 E3 C7 01 00 BA 30 40 00"
- id: picture_mode_custom
  label: Picture Mode CUSTOM
  kind: action
  command: "BE EF 03 06 00 E3 FB 01 00 BA 30 10 00"
- id: picture_mode_get
  label: Picture Mode (Get)
  kind: query
  command: "BE EF 03 06 00 10 F6 02 00 BA 30 00 00"

# ─── Gamma (6 DEFAULT + 6 CUSTOM) ───────────────────────────────────────────
- id: gamma_1_default
  label: Gamma 1 DEFAULT
  kind: action
  command: "BE EF 03 06 00 07 E9 01 00 A1 30 20 00"
- id: gamma_2_default
  label: Gamma 2 DEFAULT
  kind: action
  command: "BE EF 03 06 00 97 E8 01 00 A1 30 21 00"
- id: gamma_3_default
  label: Gamma 3 DEFAULT
  kind: action
  command: "BE EF 03 06 00 67 E8 01 00 A1 30 22 00"
- id: gamma_4_default
  label: Gamma 4 DEFAULT
  kind: action
  command: "BE EF 03 06 00 F7 E9 01 00 A1 30 23 00"
- id: gamma_5_default
  label: Gamma 5 DEFAULT
  kind: action
  command: "BE EF 03 06 00 C7 EB 01 00 A1 30 24 00"
- id: gamma_6_default
  label: Gamma 6 DEFAULT
  kind: action
  command: "BE EF 03 06 00 57 EA 01 00 A1 30 25 00"
- id: gamma_1_custom
  label: Gamma 1 CUSTOM
  kind: action
  command: "BE EF 03 06 00 07 FD 01 00 A1 30 10 00"
- id: gamma_2_custom
  label: Gamma 2 CUSTOM
  kind: action
  command: "BE EF 03 06 00 97 FC 01 00 A1 30 11 00"
- id: gamma_3_custom
  label: Gamma 3 CUSTOM
  kind: action
  command: "BE EF 03 06 00 67 FC 01 00 A1 30 12 00"
- id: gamma_4_custom
  label: Gamma 4 CUSTOM
  kind: action
  command: "BE EF 03 06 00 F7 FD 01 00 A1 30 13 00"
- id: gamma_5_custom
  label: Gamma 5 CUSTOM
  kind: action
  command: "BE EF 03 06 00 C7 FF 01 00 A1 30 14 00"
- id: gamma_6_custom
  label: Gamma 6 CUSTOM
  kind: action
  command: "BE EF 03 06 00 57 FE 01 00 A1 30 15 00"
- id: gamma_get
  label: Gamma (Get)
  kind: query
  command: "BE EF 03 06 00 F4 F0 02 00 A1 30 00 00"

# ─── User Gamma Pattern ─────────────────────────────────────────────────────
- id: user_gamma_pattern_off
  label: User Gamma Pattern Off
  kind: action
  command: "BE EF 03 06 00 FB FA 01 00 80 30 00 00"
- id: user_gamma_pattern_9step
  label: User Gamma Pattern 9step GrayScale
  kind: action
  command: "BE EF 03 06 00 6B FB 01 00 80 30 01 00"
- id: user_gamma_pattern_15step
  label: User Gamma Pattern 15step GrayScale
  kind: action
  command: "BE EF 03 06 00 9B FB 01 00 80 30 02 00"
- id: user_gamma_pattern_ramp
  label: User Gamma Pattern Ramp
  kind: action
  command: "BE EF 03 06 00 0B FA 01 00 80 30 03 00"
- id: user_gamma_pattern_get
  label: User Gamma Pattern (Get)
  kind: query
  command: "BE EF 03 06 00 C8 FA 02 00 80 30 00 00"

# ─── User Gamma Points 1..8 (Get / Increment / Decrement each) ──────────────
- id: user_gamma_pt1_get
  label: User Gamma Point 1 (Get)
  kind: query
  command: "BE EF 03 06 00 08 FE 02 00 90 30 00 00"
- id: user_gamma_pt1_increment
  label: User Gamma Point 1 Increment
  kind: action
  command: "BE EF 03 06 00 6E FE 04 00 90 30 00 00"
- id: user_gamma_pt1_decrement
  label: User Gamma Point 1 Decrement
  kind: action
  command: "BE EF 03 06 00 BF FF 05 00 90 30 00 00"
- id: user_gamma_pt2_get
  label: User Gamma Point 2 (Get)
  kind: query
  command: "BE EF 03 06 00 F4 FF 02 00 91 30 00 00"
- id: user_gamma_pt2_increment
  label: User Gamma Point 2 Increment
  kind: action
  command: "BE EF 03 06 00 92 FF 04 00 91 30 00 00"
- id: user_gamma_pt2_decrement
  label: User Gamma Point 2 Decrement
  kind: action
  command: "BE EF 03 06 00 43 FE 05 00 91 30 00 00"
- id: user_gamma_pt3_get
  label: User Gamma Point 3 (Get)
  kind: query
  command: "BE EF 03 06 00 B0 FF 02 00 92 30 00 00"
- id: user_gamma_pt3_increment
  label: User Gamma Point 3 Increment
  kind: action
  command: "BE EF 03 06 00 D6 FF 04 00 92 30 00 00"
- id: user_gamma_pt3_decrement
  label: User Gamma Point 3 Decrement
  kind: action
  command: "BE EF 03 06 00 07 FE 05 00 92 30 00 00"
- id: user_gamma_pt4_get
  label: User Gamma Point 4 (Get)
  kind: query
  command: "BE EF 03 06 00 4C FE 02 00 93 30 00 00"
- id: user_gamma_pt4_increment
  label: User Gamma Point 4 Increment
  kind: action
  command: "BE EF 03 06 00 2A FE 04 00 93 30 00 00"
- id: user_gamma_pt4_decrement
  label: User Gamma Point 4 Decrement
  kind: action
  command: "BE EF 03 06 00 FB FF 05 00 93 30 00 00"
- id: user_gamma_pt5_get
  label: User Gamma Point 5 (Get)
  kind: query
  command: "BE EF 03 06 00 38 FF 02 00 94 30 00 00"
- id: user_gamma_pt5_increment
  label: User Gamma Point 5 Increment
  kind: action
  command: "BE EF 03 06 00 5E FF 04 00 94 30 00 00"
- id: user_gamma_pt5_decrement
  label: User Gamma Point 5 Decrement
  kind: action
  command: "BE EF 03 06 00 8F FE 05 00 94 30 00 00"
- id: user_gamma_pt6_get
  label: User Gamma Point 6 (Get)
  kind: query
  command: "BE EF 03 06 00 C4 FE 02 00 95 30 00 00"
- id: user_gamma_pt6_increment
  label: User Gamma Point 6 Increment
  kind: action
  command: "BE EF 03 06 00 A2 FE 04 00 95 30 00 00"
- id: user_gamma_pt6_decrement
  label: User Gamma Point 6 Decrement
  kind: action
  command: "BE EF 03 06 00 73 FF 05 00 95 30 00 00"
- id: user_gamma_pt7_get
  label: User Gamma Point 7 (Get)
  kind: query
  command: "BE EF 03 06 00 80 FE 02 00 96 30 00 00"
- id: user_gamma_pt7_increment
  label: User Gamma Point 7 Increment
  kind: action
  command: "BE EF 03 06 00 E6 FE 04 00 96 30 00 00"
- id: user_gamma_pt7_decrement
  label: User Gamma Point 7 Decrement
  kind: action
  command: "BE EF 03 06 00 37 FF 05 00 96 30 00 00"
- id: user_gamma_pt8_get
  label: User Gamma Point 8 (Get)
  kind: query
  command: "BE EF 03 06 00 7C FF 02 00 97 30 00 00"
- id: user_gamma_pt8_increment
  label: User Gamma Point 8 Increment
  kind: action
  command: "BE EF 03 06 00 1A FF 04 00 97 30 00 00"
- id: user_gamma_pt8_decrement
  label: User Gamma Point 8 Decrement
  kind: action
  command: "BE EF 03 06 00 CB FE 05 00 97 30 00 00"

# ─── Color Temp (3 standard + 3 Hi-BRIGHT + 6 CUSTOM) ───────────────────────
- id: color_temp_1_high
  label: Color Temp 1 HIGH
  kind: action
  command: "BE EF 03 06 00 0B F5 01 00 B0 30 03 00"
- id: color_temp_2_mid
  label: Color Temp 2 MID
  kind: action
  command: "BE EF 03 06 00 9B F4 01 00 B0 30 02 00"
- id: color_temp_3_low
  label: Color Temp 3 LOW
  kind: action
  command: "BE EF 03 06 00 6B F4 01 00 B0 30 01 00"
- id: color_temp_4_hi_bright_1
  label: Color Temp 4 Hi-BRIGHT-1
  kind: action
  command: "BE EF 03 06 00 3B F2 01 00 B0 30 08 00"
- id: color_temp_5_hi_bright_2
  label: Color Temp 5 Hi-BRIGHT-2
  kind: action
  command: "BE EF 03 06 00 AB F3 01 00 B0 30 09 00"
- id: color_temp_6_hi_bright_3
  label: Color Temp 6 Hi-BRIGHT-3
  kind: action
  command: "BE EF 03 06 00 5B F3 01 00 B0 30 0A 00"
- id: color_temp_1_custom_high
  label: Color Temp 1 CUSTOM(HIGH)
  kind: action
  command: "BE EF 03 06 00 CB F8 01 00 B0 30 13 00"
- id: color_temp_2_custom_mid
  label: Color Temp 2 CUSTOM(MID)
  kind: action
  command: "BE EF 03 06 00 5B F9 01 00 B0 30 12 00"
- id: color_temp_3_custom_low
  label: Color Temp 3 CUSTOM(LOW)
  kind: action
  command: "BE EF 03 06 00 AB F9 01 00 B0 30 11 00"
- id: color_temp_4_custom_hi_bright_1
  label: Color Temp 4 CUSTOM (Hi-BRIGHT-1)
  kind: action
  command: "BE EF 03 06 00 FB FF 01 00 B0 30 18 00"
- id: color_temp_5_custom_hi_bright_2
  label: Color Temp 5 CUSTOM (Hi-BRIGHT-2)
  kind: action
  command: "BE EF 03 06 00 6B FE 01 00 B0 30 19 00"
- id: color_temp_6_custom_hi_bright_3
  label: Color Temp 6 CUSTOM (Hi-BRIGHT-3)
  kind: action
  command: "BE EF 03 06 00 9B FE 01 00 B0 30 1A 00"
- id: color_temp_get
  label: Color Temp (Get)
  kind: query
  command: "BE EF 03 06 00 C8 F5 02 00 B0 30 00 00"

# ─── Color Temp Gain R / G / B (Get / Inc / Dec each) ───────────────────────
- id: color_temp_gain_r_get
  label: Color Temp Gain R (Get)
  kind: query
  command: "BE EF 03 06 00 34 F4 02 00 B1 30 00 00"
- id: color_temp_gain_r_increment
  label: Color Temp Gain R Increment
  kind: action
  command: "BE EF 03 06 00 52 F4 04 00 B1 30 00 00"
- id: color_temp_gain_r_decrement
  label: Color Temp Gain R Decrement
  kind: action
  command: "BE EF 03 06 00 83 F5 05 00 B1 30 00 00"
- id: color_temp_gain_g_get
  label: Color Temp Gain G (Get)
  kind: query
  command: "BE EF 03 06 00 70 F4 02 00 B2 30 00 00"
- id: color_temp_gain_g_increment
  label: Color Temp Gain G Increment
  kind: action
  command: "BE EF 03 06 00 16 F4 04 00 B2 30 00 00"
- id: color_temp_gain_g_decrement
  label: Color Temp Gain G Decrement
  kind: action
  command: "BE EF 03 06 00 C7 F5 05 00 B2 30 00 00"
- id: color_temp_gain_b_get
  label: Color Temp Gain B (Get)
  kind: query
  command: "BE EF 03 06 00 8C F5 02 00 B3 30 00 00"
- id: color_temp_gain_b_increment
  label: Color Temp Gain B Increment
  kind: action
  command: "BE EF 03 06 00 EA F5 04 00 B3 30 00 00"
- id: color_temp_gain_b_decrement
  label: Color Temp Gain B Decrement
  kind: action
  command: "BE EF 03 06 00 3B F4 05 00 B3 30 00 00"

# ─── Color Temp Offset R / G / B (Get / Inc / Dec each) ─────────────────────
- id: color_temp_offset_r_get
  label: Color Temp Offset R (Get)
  kind: query
  command: "BE EF 03 06 00 04 F5 02 00 B5 30 00 00"
- id: color_temp_offset_r_increment
  label: Color Temp Offset R Increment
  kind: action
  command: "BE EF 03 06 00 62 F5 04 00 B5 30 00 00"
- id: color_temp_offset_r_decrement
  label: Color Temp Offset R Decrement
  kind: action
  command: "BE EF 03 06 00 B3 F4 05 00 B5 30 00 00"
- id: color_temp_offset_g_get
  label: Color Temp Offset G (Get)
  kind: query
  command: "BE EF 03 06 00 40 F5 02 00 B6 30 00 00"
- id: color_temp_offset_g_increment
  label: Color Temp Offset G Increment
  kind: action
  command: "BE EF 03 06 00 26 F5 04 00 B6 30 00 00"
- id: color_temp_offset_g_decrement
  label: Color Temp Offset G Decrement
  kind: action
  command: "BE EF 03 06 00 F7 F4 05 00 B6 30 00 00"
- id: color_temp_offset_b_get
  label: Color Temp Offset B (Get)
  kind: query
  command: "BE EF 03 06 00 BC F4 02 00 B7 30 00 00"
- id: color_temp_offset_b_increment
  label: Color Temp Offset B Increment
  kind: action
  command: "BE EF 03 06 00 DA F4 04 00 B7 30 00 00"
- id: color_temp_offset_b_decrement
  label: Color Temp Offset B Decrement
  kind: action
  command: "BE EF 03 06 00 0B F5 05 00 B7 30 00 00"

# ─── Color / Tint / Sharpness (Get / Inc / Dec / Reset) ─────────────────────
- id: color_get
  label: Color (Get)
  kind: query
  command: "BE EF 03 06 00 B5 72 02 00 02 22 00 00"
- id: color_increment
  label: Color Increment
  kind: action
  command: "BE EF 03 06 00 D3 72 04 00 02 22 00 00"
- id: color_decrement
  label: Color Decrement
  kind: action
  command: "BE EF 03 06 00 02 73 05 00 02 22 00 00"
- id: color_reset
  label: Color Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 80 D0 06 00 0A 70 00 00"
- id: tint_get
  label: Tint (Get)
  kind: query
  command: "BE EF 03 06 00 49 73 02 00 03 22 00 00"
- id: tint_increment
  label: Tint Increment
  kind: action
  command: "BE EF 03 06 00 2F 73 04 00 03 22 00 00"
- id: tint_decrement
  label: Tint Decrement
  kind: action
  command: "BE EF 03 06 00 FE 72 05 00 03 22 00 00"
- id: tint_reset
  label: Tint Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 7C D1 06 00 0B 70 00 00"
- id: sharpness_get
  label: Sharpness (Get)
  kind: query
  command: "BE EF 03 06 00 F1 72 02 00 01 22 00 00"
- id: sharpness_increment
  label: Sharpness Increment
  kind: action
  command: "BE EF 03 06 00 97 72 04 00 01 22 00 00"
- id: sharpness_decrement
  label: Sharpness Decrement
  kind: action
  command: "BE EF 03 06 00 46 73 05 00 01 22 00 00"
- id: sharpness_reset
  label: Sharpness Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 C4 D0 06 00 09 70 00 00"

# ─── Active Iris / Manual Iris ──────────────────────────────────────────────
- id: active_iris_presentation
  label: Active Iris PRESENTATION
  kind: action
  command: "BE EF 03 06 00 5B 2E 01 00 04 33 11 00"
- id: active_iris_theater
  label: Active Iris THEATER
  kind: action
  command: "BE EF 03 06 00 CB 2F 01 00 04 33 10 00"
- id: active_iris_manual
  label: Active Iris MANUAL
  kind: action
  command: "BE EF 03 06 00 CB 3B 01 00 04 33 20 00"
- id: active_iris_get
  label: Active Iris (Get)
  kind: query
  command: "BE EF 03 06 00 38 22 02 00 04 33 00 00"
- id: manual_iris_get
  label: Manual Iris (Get)
  kind: query
  command: "BE EF 03 06 00 B0 22 02 00 02 33 00 00"
- id: manual_iris_increment
  label: Manual Iris Increment
  kind: action
  command: "BE EF 03 06 00 D6 22 04 00 02 33 00 00"
- id: manual_iris_decrement
  label: Manual Iris Decrement
  kind: action
  command: "BE EF 03 06 00 07 23 05 00 02 33 00 00"

# ─── My Memory Load 1..4 / Save 1..4 ────────────────────────────────────────
- id: my_memory_load_1
  label: My Memory Load 1
  kind: action
  command: "BE EF 03 06 00 0E D7 01 00 14 20 00 00"
- id: my_memory_load_2
  label: My Memory Load 2
  kind: action
  command: "BE EF 03 06 00 9E D6 01 00 14 20 01 00"
- id: my_memory_load_3
  label: My Memory Load 3
  kind: action
  command: "BE EF 03 06 00 6E D6 01 00 14 20 02 00"
- id: my_memory_load_4
  label: My Memory Load 4
  kind: action
  command: "BE EF 03 06 00 FE D7 01 00 14 20 03 00"
- id: my_memory_save_1
  label: My Memory Save 1
  kind: action
  command: "BE EF 03 06 00 F2 D6 01 00 15 20 00 00"
- id: my_memory_save_2
  label: My Memory Save 2
  kind: action
  command: "BE EF 03 06 00 62 D7 01 00 15 20 01 00"
- id: my_memory_save_3
  label: My Memory Save 3
  kind: action
  command: "BE EF 03 06 00 92 D7 01 00 15 20 02 00"
- id: my_memory_save_4
  label: My Memory Save 4
  kind: action
  command: "BE EF 03 06 00 02 D6 01 00 15 20 03 00"

# ─── Progressive / 3D-YCS / Video NR ────────────────────────────────────────
- id: progressive_off
  label: Progressive OFF
  kind: action
  command: "BE EF 03 06 00 4A 72 01 00 07 22 00 00"
- id: progressive_tv
  label: Progressive TV
  kind: action
  command: "BE EF 03 06 00 DA 73 01 00 07 22 01 00"
- id: progressive_film
  label: Progressive FILM
  kind: action
  command: "BE EF 03 06 00 2A 73 01 00 07 22 02 00"
- id: progressive_get
  label: Progressive (Get)
  kind: query
  command: "BE EF 03 06 00 79 72 02 00 07 22 00 00"
- id: d_ycs_off
  label: 3D-YCS OFF
  kind: action
  command: "BE EF 03 06 00 E6 70 01 00 0A 22 00 00"
- id: d_ycs_movie
  label: 3D-YCS MOVIE
  kind: action
  command: "BE EF 03 06 00 76 71 01 00 0A 22 01 00"
- id: d_ycs_still_image
  label: 3D-YCS STILL IMAGE
  kind: action
  command: "BE EF 03 06 00 86 71 01 00 0A 22 02 00"
- id: d_ycs_get
  label: 3D-YCS (Get)
  kind: query
  command: "BE EF 03 06 00 D5 70 02 00 0A 22 00 00"
- id: video_nr_low
  label: Video NR LOW
  kind: action
  command: "BE EF 03 06 00 26 72 01 00 06 22 01 00"
- id: video_nr_mid
  label: Video NR MID
  kind: action
  command: "BE EF 03 06 00 D6 72 01 00 06 22 02 00"
- id: video_nr_high
  label: Video NR HIGH
  kind: action
  command: "BE EF 03 06 00 46 73 01 00 06 22 03 00"
- id: video_nr_get
  label: Video NR (Get)
  kind: query
  command: "BE EF 03 06 00 85 73 02 00 06 22 00 00"

# ─── Aspect ─────────────────────────────────────────────────────────────────
# *1 SMALL: LX750, LS+700 only.   *2 NATIVE: LW650/LW720, LS+700 only.
# *3 16:10, FULL: LW650/LW720 only.
- id: aspect_normal
  label: Aspect NORMAL
  kind: action
  command: "BE EF 03 06 00 5E DD 01 00 08 20 10 00"
- id: aspect_4_3
  label: Aspect 4:3
  kind: action
  command: "BE EF 03 06 00 9E D0 01 00 08 20 00 00"
- id: aspect_16_9
  label: Aspect 16:9
  kind: action
  command: "BE EF 03 06 00 0E D1 01 00 08 20 01 00"
- id: aspect_16_10
  label: Aspect 16:10 (LW650/LW720 only)
  kind: action
  command: "BE EF 03 06 00 3E D6 01 00 08 20 0A 00"
- id: aspect_14_9
  label: Aspect 14:9
  kind: action
  command: "BE EF 03 06 00 CE D6 01 00 08 20 09 00"
- id: aspect_small
  label: Aspect SMALL (LX750, LS+700 only)
  kind: action
  command: "BE EF 03 06 00 FE D1 01 00 08 20 02 00"
- id: aspect_native
  label: Aspect NATIVE (LW650/LW720, LS+700 only)
  kind: action
  command: "BE EF 03 06 00 5E D7 01 00 08 20 08 00"
- id: aspect_full
  label: Aspect FULL (LW650/LW720 only)
  kind: action
  command: "BE EF 03 06 00 5E C9 01 00 08 20 20 00"
- id: aspect_get
  label: Aspect (Get)
  kind: query
  command: "BE EF 03 06 00 AD D0 02 00 08 20 00 00"

# ─── Over Scan / V Position / H Position / H Phase / H Size ─────────────────
- id: over_scan_get
  label: Over Scan (Get)
  kind: query
  command: "BE EF 03 06 00 91 70 02 00 09 22 00 00"
- id: over_scan_increment
  label: Over Scan Increment
  kind: action
  command: "BE EF 03 06 00 F7 70 04 00 09 22 00 00"
- id: over_scan_decrement
  label: Over Scan Decrement
  kind: action
  command: "BE EF 03 06 00 26 71 05 00 09 22 00 00"
- id: over_scan_reset
  label: Over Scan Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 EC D9 06 00 27 70 00 00"
- id: v_position_get
  label: V Position (Get)
  kind: query
  command: "BE EF 03 06 00 0D 83 02 00 00 21 00 00"
- id: v_position_increment
  label: V Position Increment
  kind: action
  command: "BE EF 03 06 00 6B 83 04 00 00 21 00 00"
- id: v_position_decrement
  label: V Position Decrement
  kind: action
  command: "BE EF 03 06 00 BA 82 05 00 00 21 00 00"
- id: v_position_reset
  label: V Position Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 E0 D2 06 00 02 70 00 00"
- id: h_position_get
  label: H Position (Get)
  kind: query
  command: "BE EF 03 06 00 F1 82 02 00 01 21 00 00"
- id: h_position_increment
  label: H Position Increment
  kind: action
  command: "BE EF 03 06 00 97 82 04 00 01 21 00 00"
- id: h_position_decrement
  label: H Position Decrement
  kind: action
  command: "BE EF 03 06 00 46 83 05 00 01 21 00 00"
- id: h_position_reset
  label: H Position Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 1C D3 06 00 03 70 00 00"
- id: h_phase_get
  label: H Phase (Get)
  kind: query
  command: "BE EF 03 06 00 49 83 02 00 03 21 00 00"
- id: h_phase_increment
  label: H Phase Increment
  kind: action
  command: "BE EF 03 06 00 2F 83 04 00 03 21 00 00"
- id: h_phase_decrement
  label: H Phase Decrement
  kind: action
  command: "BE EF 03 06 00 FE 82 05 00 03 21 00 00"
- id: h_size_get
  label: H Size (Get)
  kind: query
  command: "BE EF 03 06 00 B5 82 02 00 02 21 00 00"
- id: h_size_increment
  label: H Size Increment
  kind: action
  command: "BE EF 03 06 00 D3 82 04 00 02 21 00 00"
- id: h_size_decrement
  label: H Size Decrement
  kind: action
  command: "BE EF 03 06 00 02 83 05 00 02 21 00 00"
- id: h_size_reset
  label: H Size Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 68 D2 06 00 04 70 00 00"
- id: auto_adjust
  label: Auto Adjust (Execute)
  kind: action
  command: "BE EF 03 06 00 91 D0 06 00 0A 20 00 00"

# ─── Color Space / Component signal ─────────────────────────────────────────
- id: color_space_auto
  label: Color Space AUTO
  kind: action
  command: "BE EF 03 06 00 0E 72 01 00 04 22 00 00"
- id: color_space_rgb
  label: Color Space RGB
  kind: action
  command: "BE EF 03 06 00 9E 73 01 00 04 22 01 00"
- id: color_space_smpte240
  label: Color Space SMPTE240
  kind: action
  command: "BE EF 03 06 00 6E 73 01 00 04 22 02 00"
- id: color_space_rec709
  label: Color Space REC709
  kind: action
  command: "BE EF 03 06 00 FE 72 01 00 04 22 03 00"
- id: color_space_rec601
  label: Color Space REC601
  kind: action
  command: "BE EF 03 06 00 CE 70 01 00 04 22 04 00"
- id: color_space_get
  label: Color Space (Get)
  kind: query
  command: "BE EF 03 06 00 3D 72 02 00 04 22 00 00"
- id: component_component
  label: Component COMPONENT
  kind: action
  command: "BE EF 03 06 00 4A D7 01 00 17 20 00 00"
- id: component_scart_rgb
  label: Component SCART RGB
  kind: action
  command: "BE EF 03 06 00 DA D6 01 00 17 20 01 00"
- id: component_get
  label: Component (Get)
  kind: query
  command: "BE EF 03 06 00 79 D7 02 00 17 20 00 00"

# ─── S-Video / Video 1 / Video 2 / HDMI / DVI-D Format ─────────────────────
- id: s_video_format_auto
  label: S-Video Format AUTO
  kind: action
  command: "BE EF 03 06 00 E6 70 01 00 12 22 0A 00"
- id: s_video_format_ntsc
  label: S-Video Format NTSC
  kind: action
  command: "BE EF 03 06 00 86 74 01 00 12 22 04 00"
- id: s_video_format_pal
  label: S-Video Format PAL
  kind: action
  command: "BE EF 03 06 00 16 75 01 00 12 22 05 00"
- id: s_video_format_secam
  label: S-Video Format SECAM
  kind: action
  command: "BE EF 03 06 00 16 70 01 00 12 22 09 00"
- id: s_video_format_ntsc4_43
  label: S-Video Format NTSC4.43
  kind: action
  command: "BE EF 03 06 00 26 77 01 00 12 22 02 00"
- id: s_video_format_m_pal
  label: S-Video Format M-PAL
  kind: action
  command: "BE EF 03 06 00 86 71 01 00 12 22 08 00"
- id: s_video_format_n_pal
  label: S-Video Format N-PAL
  kind: action
  command: "BE EF 03 06 00 76 74 01 00 12 22 07 00"
- id: s_video_format_get
  label: S-Video Format (Get)
  kind: query
  command: "BE EF 03 06 00 75 76 02 00 12 22 00 00"
- id: video_1_format_auto
  label: Video 1 Format AUTO
  kind: action
  command: "BE EF 03 06 00 A2 70 01 00 11 22 0A 00"
- id: video_1_format_ntsc
  label: Video 1 Format NTSC
  kind: action
  command: "BE EF 03 06 00 C2 74 01 00 11 22 04 00"
- id: video_1_format_pal
  label: Video 1 Format PAL
  kind: action
  command: "BE EF 03 06 00 52 75 01 00 11 22 05 00"
- id: video_1_format_secam
  label: Video 1 Format SECAM
  kind: action
  command: "BE EF 03 06 00 52 70 01 00 11 22 09 00"
- id: video_1_format_ntsc4_43
  label: Video 1 Format NTSC4.43
  kind: action
  command: "BE EF 03 06 00 62 77 01 00 11 22 02 00"
- id: video_1_format_m_pal
  label: Video 1 Format M-PAL
  kind: action
  command: "BE EF 03 06 00 C2 71 01 00 11 22 08 00"
- id: video_1_format_n_pal
  label: Video 1 Format N-PAL
  kind: action
  command: "BE EF 03 06 00 32 74 01 00 11 22 07 00"
- id: video_1_format_get
  label: Video 1 Format (Get)
  kind: query
  command: "BE EF 03 06 00 31 76 02 00 11 22 00 00"
- id: video_2_format_auto
  label: Video 2 Format AUTO
  kind: action
  command: "BE EF 03 06 00 86 72 01 00 1A 22 0A 00"
- id: video_2_format_ntsc
  label: Video 2 Format NTSC
  kind: action
  command: "BE EF 03 06 00 E6 76 01 00 1A 22 04 00"
- id: video_2_format_pal
  label: Video 2 Format PAL
  kind: action
  command: "BE EF 03 06 00 76 77 01 00 1A 22 05 00"
- id: video_2_format_secam
  label: Video 2 Format SECAM
  kind: action
  command: "BE EF 03 06 00 76 72 01 00 1A 22 09 00"
- id: video_2_format_ntsc4_43
  label: Video 2 Format NTSC4.43
  kind: action
  command: "BE EF 03 06 00 46 75 01 00 1A 22 02 00"
- id: video_2_format_m_pal
  label: Video 2 Format M-PAL
  kind: action
  command: "BE EF 03 06 00 E6 73 01 00 1A 22 08 00"
- id: video_2_format_n_pal
  label: Video 2 Format N-PAL
  kind: action
  command: "BE EF 03 06 00 16 76 01 00 1A 22 07 00"
- id: video_2_format_get
  label: Video 2 Format (Get)
  kind: query
  command: "BE EF 03 06 00 15 74 02 00 1A 22 00 00"
- id: hdmi_format_auto
  label: HDMI Format AUTO
  kind: action
  command: "BE EF 03 06 00 BA 77 01 00 13 22 00 00"
- id: hdmi_format_video
  label: HDMI Format VIDEO
  kind: action
  command: "BE EF 03 06 00 2A 76 01 00 13 22 01 00"
- id: hdmi_format_computer
  label: HDMI Format COMPUTER
  kind: action
  command: "BE EF 03 06 00 DA 76 01 00 13 22 02 00"
- id: hdmi_format_get
  label: HDMI Format (Get)
  kind: query
  command: "BE EF 03 06 00 89 77 02 00 13 22 00 00"
- id: dvi_d_format_auto
  label: DVI-D Format AUTO
  kind: action
  command: "BE EF 03 06 00 62 74 01 00 19 22 00 00"
- id: dvi_d_format_video
  label: DVI-D Format VIDEO
  kind: action
  command: "BE EF 03 06 00 F2 75 01 00 19 22 01 00"
- id: dvi_d_format_computer
  label: DVI-D Format COMPUTER
  kind: action
  command: "BE EF 03 06 00 02 75 01 00 19 22 02 00"
- id: dvi_d_format_get
  label: DVI-D Format (Get)
  kind: query
  command: "BE EF 03 06 00 51 74 02 00 19 22 00 00"

# ─── HDMI / DVI-D Range ─────────────────────────────────────────────────────
- id: hdmi_range_auto
  label: HDMI Range AUTO
  kind: action
  command: "BE EF 03 06 00 86 D8 01 00 22 20 00 00"
- id: hdmi_range_normal
  label: HDMI Range NORMAL
  kind: action
  command: "BE EF 03 06 00 16 D9 01 00 22 20 01 00"
- id: hdmi_range_enhanced
  label: HDMI Range ENHANCED
  kind: action
  command: "BE EF 03 06 00 E6 D9 01 00 22 20 02 00"
- id: hdmi_range_get
  label: HDMI Range (Get)
  kind: query
  command: "BE EF 03 06 00 B5 D8 02 00 22 20 00 00"
- id: dvi_d_range_auto
  label: DVI-D Range AUTO
  kind: action
  command: "BE EF 03 06 00 FE D4 01 00 20 20 10 00"
- id: dvi_d_range_normal
  label: DVI-D Range NORMAL
  kind: action
  command: "BE EF 03 06 00 3E D9 01 00 20 20 00 00"
- id: dvi_d_range_enhanced
  label: DVI-D Range ENHANCED
  kind: action
  command: "BE EF 03 06 00 AE D8 01 00 20 20 01 00"
- id: dvi_d_range_get
  label: DVI-D Range (Get)
  kind: query
  command: "BE EF 03 06 00 0D D9 02 00 20 20 00 00"

# ─── COMPUTER IN 1/2 / BNC sync-on-G setting ───────────────────────────────
- id: computer_in_1_sync_off
  label: Computer In 1 SYNC ON G OFF
  kind: action
  command: "BE EF 03 06 00 5E D7 01 00 10 20 02 00"
- id: computer_in_1_auto
  label: Computer In 1 AUTO
  kind: action
  command: "BE EF 03 06 00 CE D6 01 00 10 20 03 00"
- id: computer_in_1_get
  label: Computer In 1 (Get)
  kind: query
  command: "BE EF 03 06 00 0D D6 02 00 10 20 00 00"
- id: computer_in_2_sync_off
  label: Computer In 2 SYNC ON G OFF
  kind: action
  command: "BE EF 03 06 00 A2 D6 01 00 11 20 02 00"
- id: computer_in_2_auto
  label: Computer In 2 AUTO
  kind: action
  command: "BE EF 03 06 00 32 D7 01 00 11 20 03 00"
- id: computer_in_2_get
  label: Computer In 2 (Get)
  kind: query
  command: "BE EF 03 06 00 F1 D7 02 00 11 20 00 00"
- id: bnc_sync_off
  label: BNC SYNC ON G OFF
  kind: action
  command: "BE EF 03 06 00 86 D4 01 00 1A 20 02 00"
- id: bnc_auto
  label: BNC AUTO
  kind: action
  command: "BE EF 03 06 00 16 D5 01 00 1A 20 03 00"
- id: bnc_get
  label: BNC (Get)
  kind: query
  command: "BE EF 03 06 00 D5 D5 02 00 1A 20 00 00"

# ─── Frame Lock per input (Computer In 1/2, BNC, HDMI, DVI-D) ───────────────
- id: frame_lock_computer_in_1_off
  label: Frame Lock Computer In 1 OFF
  kind: action
  command: "BE EF 03 06 00 3B C2 01 00 50 30 00 00"
- id: frame_lock_computer_in_1_on
  label: Frame Lock Computer In 1 ON
  kind: action
  command: "BE EF 03 06 00 AB C3 01 00 50 30 01 00"
- id: frame_lock_computer_in_1_get
  label: Frame Lock Computer In 1 (Get)
  kind: query
  command: "BE EF 03 06 00 08 C2 02 00 50 30 00 00"
- id: frame_lock_computer_in_2_off
  label: Frame Lock Computer In 2 OFF
  kind: action
  command: "BE EF 03 06 00 0B C3 01 00 54 30 00 00"
- id: frame_lock_computer_in_2_on
  label: Frame Lock Computer In 2 ON
  kind: action
  command: "BE EF 03 06 00 9B C2 01 00 54 30 00 00"
- id: frame_lock_computer_in_2_get
  label: Frame Lock Computer In 2 (Get)
  kind: query
  command: "BE EF 03 06 00 38 C3 02 00 54 30 00 00"
- id: frame_lock_bnc_off
  label: Frame Lock BNC OFF
  kind: action
  command: "BE EF 03 06 00 4F C3 01 00 57 30 00 00"
- id: frame_lock_bnc_on
  label: Frame Lock BNC ON
  kind: action
  command: "BE EF 03 06 00 DF C2 01 00 57 30 01 00"
- id: frame_lock_bnc_get
  label: Frame Lock BNC (Get)
  kind: query
  command: "BE EF 03 06 00 7C C3 02 00 57 30 00 00"
- id: frame_lock_hdmi_off
  label: Frame Lock HDMI OFF
  kind: action
  command: "BE EF 03 06 00 7F C2 01 00 53 30 00 00"
- id: frame_lock_hdmi_on
  label: Frame Lock HDMI ON
  kind: action
  command: "BE EF 03 06 00 EF C3 01 00 53 30 01 00"
- id: frame_lock_hdmi_get
  label: Frame Lock HDMI (Get)
  kind: query
  command: "BE EF 03 06 00 4C C2 02 00 53 30 00 00"
- id: frame_lock_dvi_d_off
  label: Frame Lock DVI-D OFF
  kind: action
  command: "BE EF 03 06 00 A7 C1 01 00 59 30 00 00"
- id: frame_lock_dvi_d_on
  label: Frame Lock DVI-D ON
  kind: action
  command: "BE EF 03 06 00 37 C0 01 00 59 30 01 00"
- id: frame_lock_dvi_d_get
  label: Frame Lock DVI-D (Get)
  kind: query
  command: "BE EF 03 06 00 94 C1 02 00 59 30 00 00"

# ─── Keystone V / H / Auto Keystone ─────────────────────────────────────────
- id: keystone_v_get
  label: Keystone V (Get)
  kind: query
  command: "BE EF 03 06 00 B9 D3 02 00 07 20 00 00"
- id: keystone_v_increment
  label: Keystone V Increment
  kind: action
  command: "BE EF 03 06 00 DF D3 04 00 07 20 00 00"
- id: keystone_v_decrement
  label: Keystone V Decrement
  kind: action
  command: "BE EF 03 06 00 0E D2 05 00 07 20 00 00"
- id: keystone_v_reset
  label: Keystone V Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 08 D0 06 00 0C 70 00 00"
- id: auto_keystone_v_execute
  label: Auto Keystone V Execute
  kind: action
  command: "BE EF 03 06 00 E5 D1 06 00 0D 20 00 00"
- id: auto_keystone_v_off
  label: Auto Keystone V OFF
  kind: action
  command: "BE EF 03 06 00 EA D1 01 00 0F 20 00 00"
- id: auto_keystone_v_on
  label: Auto Keystone V ON
  kind: action
  command: "BE EF 03 06 00 7A D0 01 00 0F 20 01 00"
- id: auto_keystone_v_get
  label: Auto Keystone V (Get)
  kind: query
  command: "BE EF 03 06 00 D9 D1 02 00 0F 20 00 00"
- id: keystone_h_get
  label: Keystone H (Get)
  kind: query
  command: "BE EF 03 06 00 E9 D0 02 00 0B 20 00 00"
- id: keystone_h_increment
  label: Keystone H Increment
  kind: action
  command: "BE EF 03 06 00 8F D0 04 00 0B 20 00 00"
- id: keystone_h_decrement
  label: Keystone H Decrement
  kind: action
  command: "BE EF 03 06 00 5E D1 05 00 0B 20 00 00"
- id: keystone_h_reset
  label: Keystone H Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 98 D8 06 00 20 70 00 00"

# ─── Eco Mode / Mirror ──────────────────────────────────────────────────────
- id: eco_mode_normal
  label: Eco Mode NORMAL
  kind: action
  command: "BE EF 03 06 00 3B 23 01 00 00 33 00 00"
- id: eco_mode_eco
  label: Eco Mode ECO
  kind: action
  command: "BE EF 03 06 00 AB 22 01 00 00 33 01 00"
- id: eco_mode_get
  label: Eco Mode (Get)
  kind: query
  command: "BE EF 03 06 00 08 23 02 00 00 33 00 00"
- id: mirror_normal
  label: Mirror NORMAL
  kind: action
  command: "BE EF 03 06 00 C7 D2 01 00 01 30 00 00"
- id: mirror_h_invert
  label: Mirror H:INVERT
  kind: action
  command: "BE EF 03 06 00 57 D3 01 00 01 30 01 00"
- id: mirror_v_invert
  label: Mirror V:INVERT
  kind: action
  command: "BE EF 03 06 00 A7 D3 01 00 01 30 02 00"
- id: mirror_hv_invert
  label: Mirror H&V:INVERT
  kind: action
  command: "BE EF 03 06 00 37 D2 01 00 01 30 03 00"
- id: mirror_get
  label: Mirror (Get)
  kind: query
  command: "BE EF 03 06 00 F4 D2 02 00 01 30 00 00"

# ─── Monitor Out ────────────────────────────────────────────────────────────
# For each active source the MONITOR OUT signal can be routed to Computer In 1, 2, BNC, or OFF.
# 9 source rows × 4 destinations + 1 get per source = 45 actions.
- id: monitor_out_computer_in_1_to_computer_in_1
  label: Monitor Out (Computer In 1) → Computer In 1
  kind: action
  command: "BE EF 03 06 00 3E F4 01 00 B0 20 00 00"
- id: monitor_out_computer_in_1_to_computer_in_2
  label: Monitor Out (Computer In 1) → Computer In 2
  kind: action
  command: "BE EF 03 06 00 FE F6 01 00 B0 20 04 00"
- id: monitor_out_computer_in_1_to_bnc
  label: Monitor Out (Computer In 1) → BNC
  kind: action
  command: "BE EF 03 06 00 0E F6 01 00 B0 20 07 00"
- id: monitor_out_computer_in_1_off
  label: Monitor Out (Computer In 1) → OFF
  kind: action
  command: "BE EF 03 06 00 CE B5 01 00 B0 20 FF 00"
- id: monitor_out_computer_in_1_get
  label: Monitor Out (Computer In 1) Get
  kind: query
  command: "BE EF 03 06 00 0D F4 02 00 B0 20 00 00"
- id: monitor_out_computer_in_2_to_computer_in_1
  label: Monitor Out (Computer In 2) → Computer In 1
  kind: action
  command: "BE EF 03 06 00 0E F5 01 00 B4 20 00 00"
- id: monitor_out_computer_in_2_to_computer_in_2
  label: Monitor Out (Computer In 2) → Computer In 2
  kind: action
  command: "BE EF 03 06 00 CE F7 01 00 B4 20 04 00"
- id: monitor_out_computer_in_2_to_bnc
  label: Monitor Out (Computer In 2) → BNC
  kind: action
  command: "BE EF 03 06 00 3E F7 01 00 B4 20 07 00"
- id: monitor_out_computer_in_2_off
  label: Monitor Out (Computer In 2) → OFF
  kind: action
  command: "BE EF 03 06 00 FE B4 01 00 B4 20 FF 00"
- id: monitor_out_computer_in_2_get
  label: Monitor Out (Computer In 2) Get
  kind: query
  command: "BE EF 03 06 00 3D F5 02 00 B4 20 00 00"
- id: monitor_out_bnc_to_computer_in_1
  label: Monitor Out (BNC) → Computer In 1
  kind: action
  command: "BE EF 03 06 00 4A F5 01 00 B7 20 00 00"
- id: monitor_out_bnc_to_computer_in_2
  label: Monitor Out (BNC) → Computer In 2
  kind: action
  command: "BE EF 03 06 00 8A F7 01 00 B7 20 04 00"
- id: monitor_out_bnc_to_bnc
  label: Monitor Out (BNC) → BNC
  kind: action
  command: "BE EF 03 06 00 7A F7 01 00 B7 20 07 00"
- id: monitor_out_bnc_off
  label: Monitor Out (BNC) → OFF
  kind: action
  command: "BE EF 03 06 00 BA B4 01 00 B7 20 FF 00"
- id: monitor_out_bnc_get
  label: Monitor Out (BNC) Get
  kind: query
  command: "BE EF 03 06 00 79 F5 02 00 B7 20 00 00"
- id: monitor_out_hdmi_to_computer_in_1
  label: Monitor Out (HDMI) → Computer In 1
  kind: action
  command: "BE EF 03 06 00 7A F4 01 00 B3 20 00 00"
- id: monitor_out_hdmi_to_computer_in_2
  label: Monitor Out (HDMI) → Computer In 2
  kind: action
  command: "BE EF 03 06 00 BA F6 01 00 B3 20 04 00"
- id: monitor_out_hdmi_to_bnc
  label: Monitor Out (HDMI) → BNC
  kind: action
  command: "BE EF 03 06 00 4A F6 01 00 B3 20 07 00"
- id: monitor_out_hdmi_off
  label: Monitor Out (HDMI) → OFF
  kind: action
  command: "BE EF 03 06 00 8A B5 01 00 B3 20 FF 00"
- id: monitor_out_hdmi_get
  label: Monitor Out (HDMI) Get
  kind: query
  command: "BE EF 03 06 00 49 F4 02 00 B3 20 00 00"
- id: monitor_out_dvi_d_to_computer_in_1
  label: Monitor Out (DVI-D) → Computer In 1
  kind: action
  command: "BE EF 03 06 00 A2 F7 01 00 B9 20 00 00"
- id: monitor_out_dvi_d_to_computer_in_2
  label: Monitor Out (DVI-D) → Computer In 2
  kind: action
  command: "BE EF 03 06 00 62 F5 01 00 B9 20 04 00"
- id: monitor_out_dvi_d_to_bnc
  label: Monitor Out (DVI-D) → BNC
  kind: action
  command: "BE EF 03 06 00 92 F5 01 00 B9 20 07 00"
- id: monitor_out_dvi_d_off
  label: Monitor Out (DVI-D) → OFF
  kind: action
  command: "BE EF 03 06 00 52 B6 01 00 B9 20 FF 00"
- id: monitor_out_dvi_d_get
  label: Monitor Out (DVI-D) Get
  kind: query
  command: "BE EF 03 06 00 91 F7 02 00 B9 20 00 00"
- id: monitor_out_component_to_computer_in_1
  label: Monitor Out (Component) → Computer In 1
  kind: action
  command: "BE EF 03 06 00 F2 F4 01 00 B5 20 00 00"
- id: monitor_out_component_to_computer_in_2
  label: Monitor Out (Component) → Computer In 2
  kind: action
  command: "BE EF 03 06 00 32 F6 01 00 B5 20 04 00"
- id: monitor_out_component_to_bnc
  label: Monitor Out (Component) → BNC
  kind: action
  command: "BE EF 03 06 00 C2 F6 01 00 B5 20 07 00"
- id: monitor_out_component_off
  label: Monitor Out (Component) → OFF
  kind: action
  command: "BE EF 03 06 00 02 B5 01 00 B5 20 FF 00"
- id: monitor_out_component_get
  label: Monitor Out (Component) Get
  kind: query
  command: "BE EF 03 06 00 C1 F4 02 00 B5 20 00 00"
- id: monitor_out_s_video_to_computer_in_1
  label: Monitor Out (S-Video) → Computer In 1
  kind: action
  command: "BE EF 03 06 00 86 F5 01 00 B2 20 00 00"
- id: monitor_out_s_video_to_computer_in_2
  label: Monitor Out (S-Video) → Computer In 2
  kind: action
  command: "BE EF 03 06 00 46 F7 01 00 B2 20 04 00"
- id: monitor_out_s_video_to_bnc
  label: Monitor Out (S-Video) → BNC
  kind: action
  command: "BE EF 03 06 00 B6 F7 01 00 B2 20 07 00"
- id: monitor_out_s_video_off
  label: Monitor Out (S-Video) → OFF
  kind: action
  command: "BE EF 03 06 00 76 B4 01 00 B2 20 FF 00"
- id: monitor_out_s_video_get
  label: Monitor Out (S-Video) Get
  kind: query
  command: "BE EF 03 06 00 B5 F5 02 00 B2 20 00 00"
- id: monitor_out_video_1_to_computer_in_1
  label: Monitor Out (Video 1) → Computer In 1
  kind: action
  command: "BE EF 03 06 00 C2 F5 01 00 B1 20 00 00"
- id: monitor_out_video_1_to_computer_in_2
  label: Monitor Out (Video 1) → Computer In 2
  kind: action
  command: "BE EF 03 06 00 02 F7 01 00 B1 20 04 00"
- id: monitor_out_video_1_to_bnc
  label: Monitor Out (Video 1) → BNC
  kind: action
  command: "BE EF 03 06 00 F2 F7 01 00 B1 20 07 00"
- id: monitor_out_video_1_off
  label: Monitor Out (Video 1) → OFF
  kind: action
  command: "BE EF 03 06 00 32 B4 01 00 B1 20 FF 00"
- id: monitor_out_video_1_get
  label: Monitor Out (Video 1) Get
  kind: query
  command: "BE EF 03 06 00 F1 F5 02 00 B1 20 00 00"
- id: monitor_out_video_2_to_computer_in_1
  label: Monitor Out (Video 2) → Computer In 1
  kind: action
  command: "BE EF 03 06 00 E6 F7 01 00 BA 20 00 00"
- id: monitor_out_video_2_to_computer_in_2
  label: Monitor Out (Video 2) → Computer In 2
  kind: action
  command: "BE EF 03 06 00 26 F5 01 00 BA 20 04 00"
- id: monitor_out_video_2_to_bnc
  label: Monitor Out (Video 2) → BNC
  kind: action
  command: "BE EF 03 06 00 D6 F5 01 00 BA 20 07 00"
- id: monitor_out_video_2_off
  label: Monitor Out (Video 2) → OFF
  kind: action
  command: "BE EF 03 06 00 16 B6 01 00 BA 20 FF 00"
- id: monitor_out_video_2_get
  label: Monitor Out (Video 2) Get
  kind: query
  command: "BE EF 03 06 00 D5 F7 02 00 BA 20 00 00"
- id: monitor_out_standby_to_computer_in_1
  label: Monitor Out (Standby) → Computer In 1
  kind: action
  command: "BE EF 03 06 00 2A F7 01 00 BF 20 00 00"
- id: monitor_out_standby_to_computer_in_2
  label: Monitor Out (Standby) → Computer In 2
  kind: action
  command: "BE EF 03 06 00 EA F5 01 00 BF 20 04 00"
- id: monitor_out_standby_to_bnc
  label: Monitor Out (Standby) → BNC
  kind: action
  command: "BE EF 03 06 00 1A F5 01 00 BF 20 07 00"
- id: monitor_out_standby_off
  label: Monitor Out (Standby) → OFF
  kind: action
  command: "BE EF 03 06 00 DA B6 01 00 BF 20 FF 00"
- id: monitor_out_standby_get
  label: Monitor Out (Standby) Get
  kind: query
  command: "BE EF 03 06 00 19 F7 02 00 BF 20 00 00"

# ─── Language (20 entries) ──────────────────────────────────────────────────
- id: language_english
  label: Language ENGLISH
  kind: action
  command: "BE EF 03 06 00 F7 D3 01 00 05 30 00 00"
- id: language_francais
  label: Language FRANÇAIS
  kind: action
  command: "BE EF 03 06 00 67 D2 01 00 05 30 01 00"
- id: language_deutsch
  label: Language DEUTSCH
  kind: action
  command: "BE EF 03 06 00 97 D2 01 00 05 30 02 00"
- id: language_espanol
  label: Language ESPAÑOL
  kind: action
  command: "BE EF 03 06 00 07 D3 01 00 05 30 03 00"
- id: language_italiano
  label: Language ITALIANO
  kind: action
  command: "BE EF 03 06 00 37 D1 01 00 05 30 04 00"
- id: language_norsk
  label: Language NORSK
  kind: action
  command: "BE EF 03 06 00 A7 D0 01 00 05 30 05 00"
- id: language_nederlands
  label: Language NEDERLANDS
  kind: action
  command: "BE EF 03 06 00 57 D0 01 00 05 30 06 00"
- id: language_portugues
  label: Language PORTUGUÊS
  kind: action
  command: "BE EF 03 06 00 C7 D1 01 00 05 30 07 00"
- id: language_japanese
  label: Language 日本語
  kind: action
  command: "BE EF 03 06 00 37 D4 01 00 05 30 08 00"
- id: language_9
  label: Language slot 09
  kind: action
  command: "BE EF 03 06 00 A7 D5 01 00 05 30 09 00"
- id: language_10
  label: Language slot 10
  kind: action
  command: "BE EF 03 06 00 37 DE 01 00 05 30 10 00"
- id: language_0a
  label: Language slot 0A
  kind: action
  command: "BE EF 03 06 00 57 D5 01 00 05 30 0A 00"
- id: language_svenska
  label: Language SVENSKA
  kind: action
  command: "BE EF 03 06 00 C7 D4 01 00 05 30 0B 00"
- id: language_russian
  label: Language PYCCKNN
  kind: action
  command: "BE EF 03 06 00 F7 D6 01 00 05 30 0C 00"
- id: language_suomi
  label: Language SUOMI
  kind: action
  command: "BE EF 03 06 00 67 D7 01 00 05 30 0D 00"
- id: language_polski
  label: Language POLSKI
  kind: action
  command: "BE EF 03 06 00 97 D7 01 00 05 30 0E 00"
- id: language_turkce
  label: Language TÜRKÇE
  kind: action
  command: "BE EF 03 06 00 07 D6 01 00 05 30 0F 00"
- id: language_dansk
  label: Language DANSK
  kind: action
  command: "BE EF 03 06 00 A7 DF 01 00 05 30 11 00"
- id: language_cestina
  label: Language ČEŠTINA
  kind: action
  command: "BE EF 03 06 00 57 DF 01 00 05 30 12 00"
- id: language_arabic
  label: Language اﻟﻠﻐﺔ اﻟﻌﺮﺑﻴﺔ
  kind: action
  command: "BE EF 03 06 00 37 DB 01 00 05 30 1C 00"
- id: language_farsi
  label: Language ﻓﺎرﺳﻰ
  kind: action
  command: "BE EF 03 06 00 A7 DA 01 00 05 30 1D 00"
- id: language_get
  label: Language (Get)
  kind: query
  command: "BE EF 03 06 00 C4 D3 02 00 05 30 00 00"

# ─── Menu Position V / H ────────────────────────────────────────────────────
- id: menu_position_v_get
  label: Menu Position V (Get)
  kind: query
  command: "BE EF 03 06 00 40 D7 02 00 16 30 00 00"
- id: menu_position_v_increment
  label: Menu Position V Increment
  kind: action
  command: "BE EF 03 06 00 26 D7 04 00 16 30 00 00"
- id: menu_position_v_decrement
  label: Menu Position V Decrement
  kind: action
  command: "BE EF 03 06 00 F7 D6 05 00 16 30 00 00"
- id: menu_position_v_reset
  label: Menu Position V Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 A8 C7 06 00 44 70 00 00"
- id: menu_position_h_get
  label: Menu Position H (Get)
  kind: query
  command: "BE EF 03 06 00 04 D7 02 00 15 30 00 00"
- id: menu_position_h_increment
  label: Menu Position H Increment
  kind: action
  command: "BE EF 03 06 00 62 D7 04 00 15 30 00 00"
- id: menu_position_h_decrement
  label: Menu Position H Decrement
  kind: action
  command: "BE EF 03 06 00 B3 D6 05 00 15 30 00 00"
- id: menu_position_h_reset
  label: Menu Position H Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 DC C6 06 00 43 70 00 00"

# ─── Blank / Start Up / MyScreen Lock / Message / Template ──────────────────
- id: blank_my_screen
  label: Blank MyScreen
  kind: action
  command: "BE EF 03 06 00 FB CA 01 00 00 30 20 00"
- id: blank_original
  label: Blank ORIGINAL
  kind: action
  command: "BE EF 03 06 00 FB E2 01 00 00 30 40 00"
- id: blank_blue
  label: Blank BLUE
  kind: action
  command: "BE EF 03 06 00 CB D3 01 00 00 30 03 00"
- id: blank_white
  label: Blank WHITE
  kind: action
  command: "BE EF 03 06 00 6B D0 01 00 00 30 05 00"
- id: blank_black
  label: Blank BLACK
  kind: action
  command: "BE EF 03 06 00 9B D0 01 00 00 30 06 00"
- id: blank_get
  label: Blank (Get)
  kind: query
  command: "BE EF 03 06 00 08 D3 02 00 00 30 00 00"
- id: blank_on_off_off
  label: Blank On/Off OFF
  kind: action
  command: "BE EF 03 06 00 FB D8 01 00 20 30 00 00"
- id: blank_on_off_on
  label: Blank On/Off ON
  kind: action
  command: "BE EF 03 06 00 6B D9 01 00 20 30 01 00"
- id: blank_on_off_get
  label: Blank On/Off (Get)
  kind: query
  command: "BE EF 03 06 00 C8 D8 02 00 20 30 00 00"
- id: start_up_my_screen
  label: Start Up MyScreen
  kind: action
  command: "BE EF 03 06 00 CB CB 01 00 04 30 20 00"
- id: start_up_original
  label: Start Up ORIGINAL
  kind: action
  command: "BE EF 03 06 00 0B D2 01 00 04 30 00 00"
- id: start_up_off
  label: Start Up OFF
  kind: action
  command: "BE EF 03 06 00 9B D3 01 00 04 30 01 00"
- id: start_up_get
  label: Start Up (Get)
  kind: query
  command: "BE EF 03 06 00 38 D2 02 00 04 30 00 00"
- id: my_screen_lock_off
  label: MyScreen Lock OFF
  kind: action
  command: "BE EF 03 06 00 3B EF 01 00 C0 30 00 00"
- id: my_screen_lock_on
  label: MyScreen Lock ON
  kind: action
  command: "BE EF 03 06 00 AB EE 01 00 C0 30 01 00"
- id: my_screen_lock_get
  label: MyScreen Lock (Get)
  kind: query
  command: "BE EF 03 06 00 08 EF 02 00 C0 30 00 00"
- id: message_off
  label: Message OFF
  kind: action
  command: "BE EF 03 06 00 8F D6 01 00 17 30 00 00"
- id: message_on
  label: Message ON
  kind: action
  command: "BE EF 03 06 00 1F D7 01 00 17 30 01 00"
- id: message_get
  label: Message (Get)
  kind: query
  command: "BE EF 03 06 00 BC D6 02 00 17 30 00 00"
- id: template_test_pattern
  label: Template TEST PATTERN
  kind: action
  command: "BE EF 03 06 00 43 D9 01 00 22 30 00 00"
- id: template_dot_line_1
  label: Template DOT-LINE 1
  kind: action
  command: "BE EF 03 06 00 D3 D8 01 00 22 30 01 00"
- id: template_dot_line_2
  label: Template DOT-LINE 2
  kind: action
  command: "BE EF 03 06 00 23 D8 01 00 22 30 02 00"
- id: template_dot_line_3
  label: Template DOT-LINE 3
  kind: action
  command: "BE EF 03 06 00 B3 D9 01 00 22 30 03 00"
- id: template_dot_line_4
  label: Template DOT-LINE 4
  kind: action
  command: "BE EF 03 06 00 83 DB 01 00 22 30 04 00"
- id: template_get
  label: Template (Get)
  kind: query
  command: "BE EF 03 06 00 70 D9 02 00 22 30 00 00"
- id: template_on_off_off
  label: Template On/Off OFF
  kind: action
  command: "BE EF 03 06 00 BF D8 01 00 23 30 00 00"
- id: template_on_off_on
  label: Template On/Off ON
  kind: action
  command: "BE EF 03 06 00 2F D9 01 00 23 30 01 00"
- id: template_on_off_get
  label: Template On/Off (Get)
  kind: query
  command: "BE EF 03 06 00 8C D8 02 00 23 30 00 00"

# ─── Closed Caption (Display, Mode, Channel) ────────────────────────────────
- id: closed_caption_display_off
  label: Closed Caption Display OFF
  kind: action
  command: "BE EF 03 06 00 FA 62 01 00 00 37 00 00"
- id: closed_caption_display_on
  label: Closed Caption Display ON
  kind: action
  command: "BE EF 03 06 00 6A 63 01 00 00 37 01 00"
- id: closed_caption_display_get
  label: Closed Caption Display (Get)
  kind: query
  command: "BE EF 03 06 00 C9 62 02 00 00 37 00 00"
- id: closed_caption_mode_captions
  label: Closed Caption Mode CAPTIONS
  kind: action
  command: "BE EF 03 06 00 06 63 01 00 01 37 00 00"
- id: closed_caption_mode_text
  label: Closed Caption Mode TEXT
  kind: action
  command: "BE EF 03 06 00 96 62 01 00 01 37 01 00"
- id: closed_caption_mode_get
  label: Closed Caption Mode (Get)
  kind: query
  command: "BE EF 03 06 00 35 63 02 00 01 37 00 00"
- id: closed_caption_channel_1
  label: Closed Caption Channel 1
  kind: action
  command: "BE EF 03 06 00 D2 62 01 00 02 37 01 00"
- id: closed_caption_channel_2
  label: Closed Caption Channel 2
  kind: action
  command: "BE EF 03 06 00 22 62 01 00 02 37 02 00"
- id: closed_caption_channel_3
  label: Closed Caption Channel 3
  kind: action
  command: "BE EF 03 06 00 B2 63 01 00 02 37 03 00"
- id: closed_caption_channel_4
  label: Closed Caption Channel 4
  kind: action
  command: "BE EF 03 06 00 82 61 01 00 02 37 04 00"
- id: closed_caption_channel_get
  label: Closed Caption Channel (Get)
  kind: query
  command: "BE EF 03 06 00 71 63 02 00 02 37 00 00"

# ─── Source Skip per input (9 inputs × 3 ops) ──────────────────────────────
- id: source_skip_computer_in_1_normal
  label: Source Skip Computer In 1 NORMAL
  kind: action
  command: "BE EF 03 06 00 FE 78 01 00 20 22 00 00"
- id: source_skip_computer_in_1_skip
  label: Source Skip Computer In 1 SKIP
  kind: action
  command: "BE EF 03 06 00 6E 79 01 00 20 22 01 00"
- id: source_skip_computer_in_1_get
  label: Source Skip Computer In 1 (Get)
  kind: query
  command: "BE EF 03 06 00 CD 78 02 00 20 22 00 00"
- id: source_skip_computer_in_2_normal
  label: Source Skip Computer In 2 NORMAL
  kind: action
  command: "BE EF 03 06 00 CE 79 01 00 24 22 00 00"
- id: source_skip_computer_in_2_skip
  label: Source Skip Computer In 2 SKIP
  kind: action
  command: "BE EF 03 06 00 5E 78 01 00 24 22 01 00"
- id: source_skip_computer_in_2_get
  label: Source Skip Computer In 2 (Get)
  kind: query
  command: "BE EF 03 06 00 FD 79 02 00 24 22 00 00"
- id: source_skip_bnc_normal
  label: Source Skip BNC NORMAL
  kind: action
  command: "BE EF 03 06 00 8A 79 01 00 27 22 00 00"
- id: source_skip_bnc_skip
  label: Source Skip BNC SKIP
  kind: action
  command: "BE EF 03 06 00 1A 78 01 00 27 22 01 00"
- id: source_skip_bnc_get
  label: Source Skip BNC (Get)
  kind: query
  command: "BE EF 03 06 00 B9 79 02 00 27 22 00 00"
- id: source_skip_hdmi_normal
  label: Source Skip HDMI NORMAL
  kind: action
  command: "BE EF 03 06 00 BA 78 01 00 23 22 00 00"
- id: source_skip_hdmi_skip
  label: Source Skip HDMI SKIP
  kind: action
  command: "BE EF 03 06 00 2A 79 01 00 23 22 01 00"
- id: source_skip_hdmi_get
  label: Source Skip HDMI (Get)
  kind: query
  command: "BE EF 03 06 00 89 78 02 00 23 22 00 00"
- id: source_skip_dvi_d_normal
  label: Source Skip DVI-D NORMAL
  kind: action
  command: "BE EF 03 06 00 62 7B 01 00 29 22 00 00"
- id: source_skip_dvi_d_skip
  label: Source Skip DVI-D SKIP
  kind: action
  command: "BE EF 03 06 00 F2 7A 01 00 29 22 01 00"
- id: source_skip_dvi_d_get
  label: Source Skip DVI-D (Get)
  kind: query
  command: "BE EF 03 06 00 51 7B 02 00 29 22 00 00"
- id: source_skip_component_normal
  label: Source Skip Component NORMAL
  kind: action
  command: "BE EF 03 06 00 32 78 01 00 25 22 00 00"
- id: source_skip_component_skip
  label: Source Skip Component SKIP
  kind: action
  command: "BE EF 03 06 00 A2 79 01 00 25 22 01 00"
- id: source_skip_component_get
  label: Source Skip Component (Get)
  kind: query
  command: "BE EF 03 06 00 01 78 02 00 25 22 00 00"
- id: source_skip_s_video_normal
  label: Source Skip S-Video NORMAL
  kind: action
  command: "BE EF 03 06 00 46 79 01 00 22 22 00 00"
- id: source_skip_s_video_skip
  label: Source Skip S-Video SKIP
  kind: action
  command: "BE EF 03 06 00 D6 78 01 00 22 22 01 00"
- id: source_skip_s_video_get
  label: Source Skip S-Video (Get)
  kind: query
  command: "BE EF 03 06 00 75 79 02 00 22 22 00 00"
- id: source_skip_video_1_normal
  label: Source Skip Video 1 NORMAL
  kind: action
  command: "BE EF 03 06 00 02 79 01 00 21 22 00 00"
- id: source_skip_video_1_skip
  label: Source Skip Video 1 SKIP
  kind: action
  command: "BE EF 03 06 00 92 78 01 00 21 22 01 00"
- id: source_skip_video_1_get
  label: Source Skip Video 1 (Get)
  kind: query
  command: "BE EF 03 06 00 31 79 02 00 21 22 00 00"
- id: source_skip_video_2_normal
  label: Source Skip Video 2 NORMAL
  kind: action
  command: "BE EF 03 06 00 26 7B 01 00 2A 22 00 00"
- id: source_skip_video_2_skip
  label: Source Skip Video 2 SKIP
  kind: action
  command: "BE EF 03 06 00 B6 7A 01 00 2A 22 01 00"
- id: source_skip_video_2_get
  label: Source Skip Video 2 (Get)
  kind: query
  command: "BE EF 03 06 00 15 7B 02 00 2A 22 00 00"

# ─── Auto Search / Direct On / Auto Off / Shutter Timer ─────────────────────
- id: auto_search_off
  label: Auto Search OFF
  kind: action
  command: "BE EF 03 06 00 B6 D6 01 00 16 20 00 00"
- id: auto_search_on
  label: Auto Search ON
  kind: action
  command: "BE EF 03 06 00 26 D7 01 00 16 20 01 00"
- id: auto_search_get
  label: Auto Search (Get)
  kind: query
  command: "BE EF 03 06 00 85 D6 02 00 16 20 00 00"
- id: direct_on_off
  label: Direct On OFF
  kind: action
  command: "BE EF 03 06 00 3B 89 01 00 20 31 00 00"
- id: direct_on_on
  label: Direct On ON
  kind: action
  command: "BE EF 03 06 00 AB 88 01 00 20 31 01 00"
- id: direct_on_get
  label: Direct On (Get)
  kind: query
  command: "BE EF 03 06 00 08 89 02 00 20 31 00 00"
- id: auto_off_get
  label: Auto Off (Get)
  kind: query
  command: "BE EF 03 06 00 08 86 02 00 10 31 00 00"
- id: auto_off_increment
  label: Auto Off Increment
  kind: action
  command: "BE EF 03 06 00 6E 86 04 00 10 31 00 00"
- id: auto_off_decrement
  label: Auto Off Decrement
  kind: action
  command: "BE EF 03 06 00 BF 87 05 00 10 31 00 00"
- id: shutter_timer_1h
  label: Shutter Timer 1h
  kind: action
  command: "BE EF 03 06 00 27 92 01 00 06 24 01 00"
- id: shutter_timer_3h
  label: Shutter Timer 3h
  kind: action
  command: "BE EF 03 06 00 47 93 01 00 06 24 03 00"
- id: shutter_timer_6h
  label: Shutter Timer 6h
  kind: action
  command: "BE EF 03 06 00 17 90 01 00 06 24 06 00"
- id: shutter_timer_get
  label: Shutter Timer (Get)
  kind: query
  command: "BE EF 03 06 00 84 93 02 00 06 24 00 00"

# ─── Lamp Time / Filter Time (Read + Reset) ─────────────────────────────────
- id: lamp_time_low_get
  label: Lamp Time LOW (Get)
  kind: query
  command: "BE EF 03 06 00 C2 FF 02 00 90 10 00 00"
- id: lamp_time_high_get
  label: Lamp Time HIGH (Get)
  kind: query
  command: "BE EF 03 06 00 2A FD 02 00 9E 10 00 00"
- id: lamp_time_reset
  label: Lamp Time Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 58 DC 06 00 30 70 00 00"
- id: filter_time_low_get
  label: Filter Time LOW (Get)
  kind: query
  command: "BE EF 03 06 00 C2 F0 02 00 A0 10 00 00"
- id: filter_time_high_get
  label: Filter Time HIGH (Get)
  kind: query
  command: "BE EF 03 06 00 D6 FC 02 00 9F 10 00 00"
- id: filter_time_reset
  label: Filter Time Reset (Execute)
  kind: action
  command: "BE EF 03 06 00 98 C6 06 00 40 70 00 00"

# ─── My Button 1..4 (each has 20 assignable functions + Get) ─────────────────
# My Button N uses Type byte NN in command data (00/01/02/03 for buttons 1/2/3/4).
- id: my_button_1_computer_in_1
  label: My Button 1 → COMPUTER IN 1
  kind: action
  command: "BE EF 03 06 00 3A 33 01 00 00 36 00 00"
- id: my_button_1_computer_in_2
  label: My Button 1 → COMPUTER IN 2
  kind: action
  command: "BE EF 03 06 00 FA 31 01 00 00 36 04 00"
- id: my_button_1_bnc
  label: My Button 1 → BNC
  kind: action
  command: "BE EF 03 06 00 0A 31 01 00 00 36 07 00"
- id: my_button_1_hdmi
  label: My Button 1 → HDMI
  kind: action
  command: "BE EF 03 06 00 CA 33 01 00 00 36 03 00"
- id: my_button_1_dvi_d
  label: My Button 1 → DVI-D
  kind: action
  command: "BE EF 03 06 00 6A 35 01 00 00 36 09 00"
- id: my_button_1_component
  label: My Button 1 → COMPONENT
  kind: action
  command: "BE EF 03 06 00 6A 30 01 00 00 36 05 00"
- id: my_button_1_s_video
  label: My Button 1 → S-VIDEO
  kind: action
  command: "BE EF 03 06 00 5A 32 01 00 00 36 02 00"
- id: my_button_1_video_1
  label: My Button 1 → VIDEO 1
  kind: action
  command: "BE EF 03 06 00 AA 32 01 00 00 36 01 00"
- id: my_button_1_video_2
  label: My Button 1 → VIDEO 2
  kind: action
  command: "BE EF 03 06 00 9A 35 01 00 00 36 0A 00"
- id: my_button_1_information
  label: My Button 1 → INFORMATION
  kind: action
  command: "BE EF 03 06 00 FA 3E 01 00 00 36 10 00"
- id: my_button_1_auto_keystone
  label: My Button 1 → AUTO KEYSTONE EXECUTE
  kind: action
  command: "BE EF 03 06 00 6A 3F 01 00 00 36 11 00"
- id: my_button_1_my_memory
  label: My Button 1 → MY MEMORY
  kind: action
  command: "BE EF 03 06 00 9A 3F 01 00 00 36 12 00"
- id: my_button_1_active_iris
  label: My Button 1 → ACTIVE IRIS
  kind: action
  command: "BE EF 03 06 00 AA 3D 01 00 00 36 15 00"
- id: my_button_1_picture_mode
  label: My Button 1 → PICTURE MODE
  kind: action
  command: "BE EF 03 06 00 0A 3E 01 00 00 36 13 00"
- id: my_button_1_filter_reset
  label: My Button 1 → FILTER RESET
  kind: action
  command: "BE EF 03 06 00 3A 3C 01 00 00 36 14 00"
- id: my_button_1_template
  label: My Button 1 → TEMPLATE
  kind: action
  command: "BE EF 03 06 00 CA 39 01 00 00 36 1B 00"
- id: my_button_1_pbyp_swap
  label: My Button 1 → PbyP SWAP
  kind: action
  command: "BE EF 03 06 00 5A 38 01 00 00 36 1A 00"
- id: my_button_1_lens_memory_1
  label: My Button 1 → LENS MEMORY-1
  kind: action
  command: "BE EF 03 06 00 CA 27 01 00 00 36 33 00"
- id: my_button_1_lens_memory_2
  label: My Button 1 → LENS MEMORY-2
  kind: action
  command: "BE EF 03 06 00 FA 25 01 00 00 36 34 00"
- id: my_button_1_lens_memory_3
  label: My Button 1 → LENS MEMORY-3
  kind: action
  command: "BE EF 03 06 00 6A 24 01 00 00 36 35 00"
- id: my_button_1_my_image
  label: My Button 1 → MY IMAGE
  kind: action
  command: "BE EF 03 06 00 5A 3D 01 00 00 36 16 00"
- id: my_button_1_get
  label: My Button 1 (Get)
  kind: query
  command: "BE EF 03 06 00 09 33 02 00 00 36 00 00"

# ─── My Button 2..4 ─────────────────────────────────────────────────────────
- id: my_button_2_computer_in_1
  label: My Button 2 → COMPUTER IN 1
  kind: action
  command: "BE EF 03 06 00 C6 32 01 00 01 36 00 00"
- id: my_button_2_computer_in_2
  label: My Button 2 → COMPUTER IN 2
  kind: action
  command: "BE EF 03 06 00 06 30 01 00 01 36 04 00"
- id: my_button_2_bnc
  label: My Button 2 → BNC
  kind: action
  command: "BE EF 03 06 00 F6 30 01 00 01 36 07 00"
- id: my_button_2_hdmi
  label: My Button 2 → HDMI
  kind: action
  command: "BE EF 03 06 00 36 32 01 00 01 36 03 00"
- id: my_button_2_dvi_d
  label: My Button 2 → DVI-D
  kind: action
  command: "BE EF 03 06 00 96 34 01 00 01 36 09 00"
- id: my_button_2_component
  label: My Button 2 → COMPONENT
  kind: action
  command: "BE EF 03 06 00 96 31 01 00 01 36 05 00"
- id: my_button_2_s_video
  label: My Button 2 → S-VIDEO
  kind: action
  command: "BE EF 03 06 00 A6 33 01 00 01 36 02 00"
- id: my_button_2_video_1
  label: My Button 2 → VIDEO 1
  kind: action
  command: "BE EF 03 06 00 56 33 01 00 01 36 01 00"
- id: my_button_2_video_2
  label: My Button 2 → VIDEO 2
  kind: action
  command: "BE EF 03 06 00 66 34 01 00 01 36 0A 00"
- id: my_button_2_information
  label: My Button 2 → INFORMATION
  kind: action
  command: "BE EF 03 06 00 06 3F 01 00 01 36 10 00"
- id: my_button_2_auto_keystone
  label: My Button 2 → AUTO KEYSTONE EXECUTE
  kind: action
  command: "BE EF 03 06 00 96 3E 01 00 01 36 11 00"
- id: my_button_2_my_memory
  label: My Button 2 → MY MEMORY
  kind: action
  command: "BE EF 03 06 00 66 3E 01 00 01 36 12 00"
- id: my_button_2_active_iris
  label: My Button 2 → ACTIVE IRIS
  kind: action
  command: "BE EF 03 06 00 56 3C 01 00 01 36 15 00"
- id: my_button_2_picture_mode
  label: My Button 2 → PICTURE MODE
  kind: action
  command: "BE EF 03 06 00 F6 3F 01 00 01 36 13 00"
- id: my_button_2_filter_reset
  label: My Button 2 → FILTER RESET
  kind: action
  command: "BE EF 03 06 00 C6 3D 01 00 01 36 14 00"
- id: my_button_2_template
  label: My Button 2 → TEMPLATE
  kind: action
  command: "BE EF 03 06 00 36 38 01 00 01 36 1B 00"
- id: my_button_2_pbyp_swap
  label: My Button 2 → PbyP SWAP
  kind: action
  command: "BE EF 03 06 00 A6 39 01 00 01 36 1A 00"
- id: my_button_2_lens_memory_1
  label: My Button 2 → LENS MEMORY-1
  kind: action
  command: "BE EF 03 06 00 36 26 01 00 01 36 33 00"
- id: my_button_2_lens_memory_2
  label: My Button 2 → LENS MEMORY-2
  kind: action
  command: "BE EF 03 06 00 06 24 01 00 01 36 34 00"
- id: my_button_2_lens_memory_3
  label: My Button 2 → LENS MEMORY-3
  kind: action
  command: "BE EF 03 06 00 96 25 01 00 01 36 35 00"
- id: my_button_2_my_image
  label: My Button 2 → MY IMAGE
  kind: action
  command: "BE EF 03 06 00 A6 3C 01 00 01 36 16 00"
- id: my_button_2_get
  label: My Button 2 (Get)
  kind: query
  command: "BE EF 03 06 00 F5 32 02 00 01 36 00 00"

- id: my_button_3_computer_in_1
  label: My Button 3 → COMPUTER IN 1
  kind: action
  command: "BE EF 03 06 00 82 32 01 00 02 36 00 00"
- id: my_button_3_computer_in_2
  label: My Button 3 → COMPUTER IN 2
  kind: action
  command: "BE EF 03 06 00 42 30 01 00 02 36 04 00"
- id: my_button_3_bnc
  label: My Button 3 → BNC
  kind: action
  command: "BE EF 03 06 00 B2 30 01 00 02 36 07 00"
- id: my_button_3_hdmi
  label: My Button 3 → HDMI
  kind: action
  command: "BE EF 03 06 00 72 32 01 00 02 36 03 00"
- id: my_button_3_dvi_d
  label: My Button 3 → DVI-D
  kind: action
  command: "BE EF 03 06 00 D2 34 01 00 02 36 09 00"
- id: my_button_3_component
  label: My Button 3 → COMPONENT
  kind: action
  command: "BE EF 03 06 00 D2 31 01 00 02 36 05 00"
- id: my_button_3_s_video
  label: My Button 3 → S-VIDEO
  kind: action
  command: "BE EF 03 06 00 E2 33 01 00 02 36 02 00"
- id: my_button_3_video_1
  label: My Button 3 → VIDEO 1
  kind: action
  command: "BE EF 03 06 00 12 33 01 00 02 36 01 00"
- id: my_button_3_video_2
  label: My Button 3 → VIDEO 2
  kind: action
  command: "BE EF 03 06 00 22 34 01 00 02 36 0A 00"
- id: my_button_3_information
  label: My Button 3 → INFORMATION
  kind: action
  command: "BE EF 03 06 00 42 3F 01 00 02 36 10 00"
- id: my_button_3_auto_keystone
  label: My Button 3 → AUTO KEYSTONE EXECUTE
  kind: action
  command: "BE EF 03 06 00 D2 3E 01 00 02 36 11 00"
- id: my_button_3_my_memory
  label: My Button 3 → MY MEMORY
  kind: action
  command: "BE EF 03 06 00 22 3E 01 00 02 36 12 00"
- id: my_button_3_active_iris
  label: My Button 3 → ACTIVE IRIS
  kind: action
  command: "BE EF 03 06 00 12 3C 01 00 02 36 15 00"
- id: my_button_3_picture_mode
  label: My Button 3 → PICTURE MODE
  kind: action
  command: "BE EF 03 06 00 B2 3F 01 00 02 36 13 00"
- id: my_button_3_filter_reset
  label: My Button 3 → FILTER RESET
  kind: action
  command: "BE EF 03 06 00 82 3D 01 00 02 36 14 00"
- id: my_button_3_template
  label: My Button 3 → TEMPLATE
  kind: action
  command: "BE EF 03 06 00 72 38 01 00 02 36 1B 00"
- id: my_button_3_pbyp_swap
  label: My Button 3 → PbyP SWAP
  kind: action
  command: "BE EF 03 06 00 E2 39 01 00 02 36 1A 00"
- id: my_button_3_lens_memory_1
  label: My Button 3 → LENS MEMORY-1
  kind: action
  command: "BE EF 03 06 00 72 26 01 00 02 36 33 00"
- id: my_button_3_lens_memory_2
  label: My Button 3 → LENS MEMORY-2
  kind: action
  command: "BE EF 03 06 00 42 24 01 00 02 36 34 00"
- id: my_button_3_lens_memory_3
  label: My Button 3 → LENS MEMORY-3
  kind: action
  command: "BE EF 03 06 00 D2 25 01 00 02 36 35 00"
- id: my_button_3_my_image
  label: My Button 3 → MY IMAGE
  kind: action
  command: "BE EF 03 06 00 E2 3C 01 00 02 36 16 00"
- id: my_button_3_get
  label: My Button 3 (Get)
  kind: query
  command: "BE EF 03 06 00 B1 32 02 00 02 36 00 00"

- id: my_button_4_computer_in_1
  label: My Button 4 → COMPUTER IN 1
  kind: action
  command: "BE EF 03 06 00 7E 33 01 00 03 36 00 00"
- id: my_button_4_computer_in_2
  label: My Button 4 → COMPUTER IN 2
  kind: action
  command: "BE EF 03 06 00 BE 31 01 00 03 36 04 00"
- id: my_button_4_bnc
  label: My Button 4 → BNC
  kind: action
  command: "BE EF 03 06 00 4E 31 01 00 03 36 07 00"
- id: my_button_4_hdmi
  label: My Button 4 → HDMI
  kind: action
  command: "BE EF 03 06 00 8E 33 01 00 03 36 03 00"
- id: my_button_4_dvi_d
  label: My Button 4 → DVI-D
  kind: action
  command: "BE EF 03 06 00 2E 35 01 00 03 36 09 00"
- id: my_button_4_component
  label: My Button 4 → COMPONENT
  kind: action
  command: "BE EF 03 06 00 2E 30 01 00 03 36 05 00"
- id: my_button_4_s_video
  label: My Button 4 → S-VIDEO
  kind: action
  command: "BE EF 03 06 00 1E 32 01 00 03 36 02 00"
- id: my_button_4_video_1
  label: My Button 4 → VIDEO 1
  kind: action
  command: "BE EF 03 06 00 EE 32 01 00 03 36 01 00"
- id: my_button_4_video_2
  label: My Button 4 → VIDEO 2
  kind: action
  command: "BE EF 03 06 00 DE 35 01 00 03 36 0A 00"
- id: my_button_4_information
  label: My Button 4 → INFORMATION
  kind: action
  command: "BE EF 03 06 00 BE 3E 01 00 03 36 10 00"
- id: my_button_4_auto_keystone
  label: My Button 4 → AUTO KEYSTONE EXECUTE
  kind: action
  command: "BE EF 03 06 00 2E 3F 01 00 03 36 11 00"
- id: my_button_4_my_memory
  label: My Button 4 → MY MEMORY
  kind: action
  command: "BE EF 03 06 00 DE 3F 01 00 03 36 12 00"
- id: my_button_4_active_iris
  label: My Button 4 → ACTIVE IRIS
  kind: action
  command: "BE EF 03 06 00 EE 3D 01 00 03 36 15 00"
- id: my_button_4_picture_mode
  label: My Button 4 → PICTURE MODE
  kind: action
  command: "BE EF 03 06 00 4E 3E 01 00 03 36 13 00"
- id: my_button_4_filter_reset
  label: My Button 4 → FILTER RESET
  kind: action
  command: "BE EF 03 06 00 7E 3C 01 00 03 36 14 00"
- id: my_button_4_template
  label: My Button 4 → TEMPLATE
  kind: action
  command: "BE EF 03 06 00 8E 39 01 00 03 36 1B 00"
- id: my_button_4_pbyp_swap
  label: My Button 4 → PbyP SWAP
  kind: action
  command: "BE EF 03 06 00 1E 38 01 00 03 36 1A 00"
- id: my_button_4_lens_memory_1
  label: My Button 4 → LENS MEMORY-1
  kind: action
  command: "BE EF 03 06 00 8E 27 01 00 03 36 33 00"
- id: my_button_4_lens_memory_2
  label: My Button 4 → LENS MEMORY-2
  kind: action
  command: "BE EF 03 06 00 BE 25 01 00 03 36 34 00"
- id: my_button_4_lens_memory_3
  label: My Button 4 → LENS MEMORY-3
  kind: action
  command: "BE EF 03 06 00 2E 24 01 00 03 36 35 00"
- id: my_button_4_my_image
  label: My Button 4 → MY IMAGE
  kind: action
  command: "BE EF 03 06 00 1E 3D 01 00 03 36 16 00"
- id: my_button_4_get
  label: My Button 4 (Get)
  kind: query
  command: "BE EF 03 06 00 4D 33 02 00 03 36 00 00"

# ─── My Source (default input per remote) ───────────────────────────────────
- id: my_source_computer_in_1
  label: My Source COMPUTER IN 1
  kind: action
  command: "BE EF 03 06 00 FA 38 01 00 20 36 00 00"
- id: my_source_computer_in_2
  label: My Source COMPUTER IN 2
  kind: action
  command: "BE EF 03 06 00 3A 3A 01 00 20 36 04 00"
- id: my_source_bnc
  label: My Source BNC
  kind: action
  command: "BE EF 03 06 00 CA 3A 01 00 20 36 07 00"
- id: my_source_hdmi
  label: My Source HDMI
  kind: action
  command: "BE EF 03 06 00 0A 38 01 00 20 36 03 00"
- id: my_source_dvi_d
  label: My Source DVI-D
  kind: action
  command: "BE EF 03 06 00 AA 3E 01 00 20 36 09 00"
- id: my_source_component
  label: My Source COMPONENT
  kind: action
  command: "BE EF 03 06 00 AA 3B 01 00 20 36 05 00"
- id: my_source_s_video
  label: My Source S-VIDEO
  kind: action
  command: "BE EF 03 06 00 9A 39 01 00 20 36 02 00"
- id: my_source_video_1
  label: My Source VIDEO 1
  kind: action
  command: "BE EF 03 06 00 6A 39 01 00 20 36 01 00"
- id: my_source_video_2
  label: My Source VIDEO 2
  kind: action
  command: "BE EF 03 06 00 5A 3E 01 00 20 36 0A 00"
- id: my_source_get
  label: My Source (Get)
  kind: query
  command: "BE EF 03 06 00 C9 38 02 00 20 36 00 00"

# ─── My Image (1..4 + delete per slot) ─────────────────────────────────────
- id: my_image_off
  label: My Image OFF
  kind: action
  command: "BE EF 03 06 00 3A C3 01 00 00 35 00 00"
- id: my_image_1
  label: My Image IMAGE-1
  kind: action
  command: "BE EF 03 06 00 AA C2 01 00 00 35 01 00"
- id: my_image_2
  label: My Image IMAGE-2
  kind: action
  command: "BE EF 03 06 00 5A C2 01 00 00 35 02 00"
- id: my_image_3
  label: My Image IMAGE-3
  kind: action
  command: "BE EF 03 06 00 CA C3 01 00 00 35 03 00"
- id: my_image_4
  label: My Image IMAGE-4
  kind: action
  command: "BE EF 03 06 00 FA C1 01 00 00 35 04 00"
- id: my_image_get
  label: My Image (Get)
  kind: query
  command: "BE EF 03 06 00 09 C3 02 00 00 35 00 00"
- id: my_image_1_delete
  label: My Image IMAGE-1 Delete (Execute)
  kind: action
  command: "BE EF 03 06 00 71 C3 06 00 01 35 00 00"
- id: my_image_2_delete
  label: My Image IMAGE-2 Delete (Execute)
  kind: action
  command: "BE EF 03 06 00 35 C3 06 00 02 35 00 00"
- id: my_image_3_delete
  label: My Image IMAGE-3 Delete (Execute)
  kind: action
  command: "BE EF 03 06 00 C9 C2 06 00 03 35 00 00"
- id: my_image_4_delete
  label: My Image IMAGE-4 Delete (Execute)
  kind: action
  command: "BE EF 03 06 00 BD C3 06 00 04 35 00 00"

# ─── Remote (Front / Rear / Top, ID, Frequency Normal / High) ──────────────
- id: remote_front_off
  label: Remote Front Off
  kind: action
  command: "BE EF 03 06 00 FF 32 01 00 00 26 00 00"
- id: remote_front_on
  label: Remote Front On
  kind: action
  command: "BE EF 03 06 00 6F 33 01 00 00 26 01 00"
- id: remote_front_get
  label: Remote Front (Get)
  kind: query
  command: "BE EF 03 06 00 CC 32 02 00 00 26 00 00"
- id: remote_rear_off
  label: Remote Rear Off
  kind: action
  command: "BE EF 03 06 00 03 33 01 00 01 26 00 00"
- id: remote_rear_on
  label: Remote Rear On
  kind: action
  command: "BE EF 03 06 00 93 32 01 00 01 26 01 00"
- id: remote_rear_get
  label: Remote Rear (Get)
  kind: query
  command: "BE EF 03 06 00 30 33 02 00 01 26 00 00"
- id: remote_top_off
  label: Remote Top Off
  kind: action
  command: "BE EF 03 06 00 47 33 01 00 02 26 00 00"
- id: remote_top_on
  label: Remote Top On
  kind: action
  command: "BE EF 03 06 00 D7 32 01 00 02 26 01 00"
- id: remote_top_get
  label: Remote Top (Get)
  kind: query
  command: "BE EF 03 06 00 74 33 02 00 02 26 00 00"
- id: remote_id_all
  label: Remote ID ALL
  kind: action
  command: "BE EF 03 06 00 9F 30 01 00 08 26 00 00"
- id: remote_id_1
  label: Remote ID 1
  kind: action
  command: "BE EF 03 06 00 0F 31 01 00 08 26 01 00"
- id: remote_id_2
  label: Remote ID 2
  kind: action
  command: "BE EF 03 06 00 FF 31 01 00 08 26 02 00"
- id: remote_id_3
  label: Remote ID 3
  kind: action
  command: "BE EF 03 06 00 6F 30 01 00 08 26 03 00"
- id: remote_id_4
  label: Remote ID 4
  kind: action
  command: "BE EF 03 06 00 5F 32 01 00 08 26 04 00"
- id: remote_id_get
  label: Remote ID (Get)
  kind: query
  command: "BE EF 03 06 00 AC 30 02 00 08 26 00 00"
- id: remote_freq_normal_disable
  label: Remote Frequency NORMAL Disable
  kind: action
  command: "BE EF 03 06 00 FF 3D 01 00 30 26 00 00"
- id: remote_freq_normal_enable
  label: Remote Frequency NORMAL Enable
  kind: action
  command: "BE EF 03 06 00 6F 3C 01 00 30 26 01 00"
- id: remote_freq_normal_get
  label: Remote Frequency NORMAL (Get)
  kind: query
  command: "BE EF 03 06 00 CC 3D 02 00 30 26 00 00"
- id: remote_freq_high_disable
  label: Remote Frequency HIGH Disable
  kind: action
  command: "BE EF 03 06 00 03 3C 01 00 31 26 00 00"
- id: remote_freq_high_enable
  label: Remote Frequency HIGH Enable
  kind: action
  command: "BE EF 03 06 00 93 3D 01 00 31 26 01 00"
- id: remote_freq_high_get
  label: Remote Frequency HIGH (Get)
  kind: query
  command: "BE EF 03 06 00 30 3C 02 00 31 26 00 00"

# ─── Lens: Focus / Zoom / Shift / Memory ────────────────────────────────────
- id: focus_increment
  label: Focus Increment
  kind: action
  command: "BE EF 03 06 00 6A 93 04 00 00 24 00 00"
- id: focus_decrement
  label: Focus Decrement
  kind: action
  command: "BE EF 03 06 00 BB 92 05 00 00 24 00 00"
- id: zoom_increment
  label: Zoom Increment
  kind: action
  command: "BE EF 03 06 00 96 92 04 00 01 24 00 00"
- id: zoom_decrement
  label: Zoom Decrement
  kind: action
  command: "BE EF 03 06 00 47 93 05 00 01 24 00 00"
- id: lens_shift_v_increment
  label: Lens Shift V Increment
  kind: action
  command: "BE EF 03 06 00 D2 92 04 00 02 24 00 00"
- id: lens_shift_v_decrement
  label: Lens Shift V Decrement
  kind: action
  command: "BE EF 03 06 00 03 93 05 00 02 24 00 00"
- id: lens_shift_h_increment
  label: Lens Shift H Increment
  kind: action
  command: "BE EF 03 06 00 2E 93 04 00 03 24 00 00"
- id: lens_shift_h_decrement
  label: Lens Shift H Decrement
  kind: action
  command: "BE EF 03 06 00 FF 92 05 00 03 24 00 00"
- id: lens_shift_centering
  label: Lens Shift Centering (Execute)
  kind: action
  command: "BE EF 03 06 00 B8 93 06 00 04 24 00 00"
- id: lens_memory_index_1
  label: Lens Memory Index 1
  kind: action
  command: "BE EF 03 06 00 4B 92 01 00 07 24 00 00"
- id: lens_memory_index_2
  label: Lens Memory Index 2
  kind: action
  command: "BE EF 03 06 00 DB 93 01 00 07 24 01 00"
- id: lens_memory_index_3
  label: Lens Memory Index 3
  kind: action
  command: "BE EF 03 06 00 2B 93 01 00 07 24 02 00"
- id: lens_memory_index_get
  label: Lens Memory Index (Get)
  kind: query
  command: "BE EF 03 06 00 78 92 02 00 07 24 00 00"
- id: lens_memory_load
  label: Lens Memory Load (Execute)
  kind: action
  command: "BE EF 03 06 00 E8 90 06 00 08 24 00 00"
- id: lens_memory_save
  label: Lens Memory Save (Execute)
  kind: action
  command: "BE EF 03 06 00 14 91 06 00 09 24 00 00"
- id: lens_memory_clear
  label: Lens Memory Clear (Execute)
  kind: action
  command: "BE EF 03 06 00 50 91 06 00 0A 24 00 00"
- id: lens_memory_focus_get
  label: Lens Memory Focus (Get)
  kind: query
  command: "BE EF 03 06 00 28 91 02 00 0B 24 00 00"
- id: lens_memory_zoom_get
  label: Lens Memory Zoom (Get)
  kind: query
  command: "BE EF 03 06 00 5C 90 02 00 0C 24 00 00"
- id: lens_memory_lens_shift_v_get
  label: Lens Memory Lens Shift V (Get)
  kind: query
  command: "BE EF 03 06 00 A0 91 02 00 0D 24 00 00"
- id: lens_memory_lens_shift_h_get
  label: Lens Memory Lens Shift H (Get)
  kind: query
  command: "BE EF 03 06 00 E4 91 02 00 0E 24 00 00"
- id: lens_memory_lens_type_get
  label: Lens Memory Lens Type (Get)
  kind: query
  command: "BE EF 03 06 00 18 90 02 00 0F 24 00 00"

# ─── Magnify / Freeze / Shutter ─────────────────────────────────────────────
- id: magnify_get
  label: Magnify (Get)
  kind: query
  command: "BE EF 03 06 00 7C D2 02 00 07 30 00 00"
- id: magnify_increment
  label: Magnify Increment
  kind: action
  command: "BE EF 03 06 00 1A D2 04 00 07 30 00 00"
- id: magnify_decrement
  label: Magnify Decrement
  kind: action
  command: "BE EF 03 06 00 CB D3 05 00 07 30 00 00"
- id: freeze_normal
  label: Freeze NORMAL
  kind: action
  command: "BE EF 03 06 00 83 D2 01 00 02 30 00 00"
- id: freeze_freeze
  label: Freeze FREEZE
  kind: action
  command: "BE EF 03 06 00 13 D3 01 00 02 30 01 00"
- id: freeze_get
  label: Freeze (Get)
  kind: query
  command: "BE EF 03 06 00 B0 D2 02 00 02 30 00 00"
- id: shutter_off
  label: Shutter OFF
  kind: action
  command: "BE EF 03 06 00 F3 93 01 00 05 24 00 00"
- id: shutter_on
  label: Shutter ON
  kind: action
  command: "BE EF 03 06 00 63 92 01 00 05 24 01 00"
- id: shutter_get
  label: Shutter (Get)
  kind: query
  command: "BE EF 03 06 00 C0 93 02 00 05 24 00 00"

# ─── PbyP (Picture-by-Picture) ──────────────────────────────────────────────
- id: pbyp_off
  label: PbyP OFF
  kind: action
  command: "BE EF 03 06 00 3E 26 01 00 10 23 00 00"
- id: pbyp_on
  label: PbyP ON
  kind: action
  command: "BE EF 03 06 00 AE 27 01 00 10 23 01 00"
- id: pbyp_get
  label: PbyP (Get)
  kind: query
  command: "BE EF 03 06 00 0D 26 02 00 10 23 00 00"
- id: pbyp_right_source_computer_in_1
  label: PbyP Right Source COMPUTER IN 1
  kind: action
  command: "BE EF 03 06 00 86 27 01 00 12 23 00 00"
- id: pbyp_right_source_computer_in_2
  label: PbyP Right Source COMPUTER IN 2
  kind: action
  command: "BE EF 03 06 00 46 25 01 00 12 23 04 00"
- id: pbyp_right_source_bnc
  label: PbyP Right Source BNC
  kind: action
  command: "BE EF 03 06 00 B6 25 01 00 12 23 07 00"
- id: pbyp_right_source_hdmi
  label: PbyP Right Source HDMI
  kind: action
  command: "BE EF 03 06 00 76 27 01 00 12 23 03 00"
- id: pbyp_right_source_dvi_d
  label: PbyP Right Source DVI-D
  kind: action
  command: "BE EF 03 06 00 D6 21 01 00 12 23 09 00"
- id: pbyp_right_source_component
  label: PbyP Right Source COMPONENT
  kind: action
  command: "BE EF 03 06 00 D6 24 01 00 12 23 05 00"
- id: pbyp_right_source_s_video
  label: PbyP Right Source S-VIDEO
  kind: action
  command: "BE EF 03 06 00 E6 26 01 00 12 23 02 00"
- id: pbyp_right_source_video_1
  label: PbyP Right Source VIDEO 1
  kind: action
  command: "BE EF 03 06 00 16 26 01 00 12 23 01 00"
- id: pbyp_right_source_video_2
  label: PbyP Right Source VIDEO 2
  kind: action
  command: "BE EF 03 06 00 26 21 01 00 12 23 0A 00"
- id: pbyp_right_source_get
  label: PbyP Right Source (Get)
  kind: query
  command: "BE EF 03 06 00 B5 27 02 00 12 23 00 00"
- id: pbyp_main_area_left
  label: PbyP Main Area LEFT
  kind: action
  command: "BE EF 03 06 00 7A 26 01 00 13 23 00 00"
- id: pbyp_main_area_right
  label: PbyP Main Area RIGHT
  kind: action
  command: "BE EF 03 06 00 EA 27 01 00 13 23 01 00"
- id: pbyp_main_area_get
  label: PbyP Main Area (Get)
  kind: query
  command: "BE EF 03 06 00 49 26 02 00 13 23 00 00"
- id: pbyp_left_source_computer_in_1
  label: PbyP Left Source COMPUTER IN 1
  kind: action
  command: "BE EF 03 06 00 F2 26 01 00 15 23 00 00"
- id: pbyp_left_source_computer_in_2
  label: PbyP Left Source COMPUTER IN 2
  kind: action
  command: "BE EF 03 06 00 32 24 01 00 15 23 04 00"
- id: pbyp_left_source_bnc
  label: PbyP Left Source BNC
  kind: action
  command: "BE EF 03 06 00 C2 24 01 00 15 23 07 00"
- id: pbyp_left_source_hdmi
  label: PbyP Left Source HDMI
  kind: action
  command: "BE EF 03 06 00 02 26 01 00 15 23 03 00"
- id: pbyp_left_source_dvi_d
  label: PbyP Left Source DVI-D
  kind: action
  command: "BE EF 03 06 00 A2 20 01 00 15 23 09 00"
- id: pbyp_left_source_component
  label: PbyP Left Source COMPONENT
  kind: action
  command: "BE EF 03 06 00 A2 25 01 00 15 23 05 00"
- id: pbyp_left_source_s_video
  label: PbyP Left Source S-VIDEO
  kind: action
  command: "BE EF 03 06 00 92 27 01 00 15 23 02 00"
- id: pbyp_left_source_video_1
  label: PbyP Left Source VIDEO 1
  kind: action
  command: "BE EF 03 06 00 62 27 01 00 15 23 01 00"
- id: pbyp_left_source_video_2
  label: PbyP Left Source VIDEO 2
  kind: action
  command: "BE EF 03 06 00 52 20 01 00 15 23 0A 00"
- id: pbyp_left_source_get
  label: PbyP Left Source (Get)
  kind: query
  command: "BE EF 03 06 00 C1 26 02 00 15 23 00 00"
- id: pbyp_swap
  label: PbyP Swap (Execute)
  kind: action
  command: "BE EF 03 06 00 01 27 06 00 16 23 00 00"
```

## Feedbacks
```yaml
# Replies for any GET command follow the form `1D <data 2 bytes>` per the source.
# One feedback per queryable setting. Values shown are 2-byte hex return values.
- id: power_state
  type: enum
  values:
    - {hex: "00 00", label: off}
    - {hex: "01 00", label: on}
    - {hex: "02 00", label: cool_down}
- id: error_state
  type: enum
  values:
    - {hex: "00 00", label: normal}
    - {hex: "01 00", label: cover_error}
    - {hex: "02 00", label: fan_error}
    - {hex: "03 00", label: lamp_error}
    - {hex: "04 00", label: temp_error}
    - {hex: "05 00", label: air_flow_error}
    - {hex: "07 00", label: cold_error}
    - {hex: "08 00", label: filter_error}
    - {hex: "0F 00", label: shutter_error}
    - {hex: "10 00", label: lens_shift_error}
- id: input_source
  type: enum
  values:
    - {hex: "00 00", label: computer_in_1}
    - {hex: "04 00", label: computer_in_2}
    - {hex: "03 00", label: hdmi}
    - {hex: "01 00", label: video_1}
    - {hex: "02 00", label: s_video}
    - {hex: "05 00", label: component}
    - {hex: "07 00", label: bnc}
    - {hex: "09 00", label: dvi_d}
    - {hex: "0A 00", label: video_2}
- id: rs232_ack
  type: enum
  values:
    - {hex: "06 00", label: success_unprefixed}
    - {hex: "06 01", label: success_set}
    - {hex: "06 02", label: success_get}
    - {hex: "06 04", label: success_increment}
    - {hex: "06 05", label: success_decrement}
    - {hex: "06 06", label: success_execute}
    - {hex: "15 xx", label: command_not_understood}
    - {hex: "1C xxxx", label: cannot_execute}
    - {hex: "1F 0400", label: tcp23_auth_error}
```

## Variables
```yaml
# Per-state numeric setters are already covered as actions (Set with setting-code param).
# The following are gettable counters that have no direct Set path.
- id: lamp_time
  type: integer
  description: Lamp usage hours. Read as two 16-bit halves; combine LOW + HIGH for full value.
  # UNRESOLVED: unit (hours vs hundreds-of-hours) not stated in source; spec returns raw 16-bit halves.
- id: filter_time
  type: integer
  description: Filter usage hours. Read as two 16-bit halves; combine LOW + HIGH for full value.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notifications / asynchronous event frames.
# RS-232C: only request/response transactions are described.
# TCP#9715: connection ID is echoed in replies, but no subscribe/notify primitives are listed.
# PJLink: standard PJLink Class 1 has no event channel beyond its own query/response.
```

## Macros
```yaml
# UNRESOLVED: source does not describe any pre-defined multi-step macro sequences on the projector.
# Daisy-chain Set/Increment/Decrement/Execute commands could be scripted externally but no built-in macros are documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
# The only safety-adjacent notes in source are operational (≥40ms interval, no commands during warm-up, ignore test data on power-on/lamp strike).
```

## Notes
- **Source scope:** the underlying protocol reference was issued under Christie part 020-000160-02 (Network Guide), which the PJLink `INF2 ?` response identifies as covering LX750 (XGA), LW650/LW720 (WXGA), and LS+700 (SXGA+). All command rows apply to LW650 except the per-model footnoted ones (Aspect 16:10 / NATIVE / FULL = LW650/LW720; SMALL = LX750/LS+700).
- **RS-232C connector:** D-sub 9 with only RD (pin 2), TD (pin 3), Ground (pin 5), CTS (pin 8) wired. Pins 1, 4, 6, 9 are unconnected. RX/TX crossover (null modem) required. Flow control beyond CTS not configured.
- **Boot test data:** projector outputs unknown test bytes on power-on and lamp strike; ignore them. Commands are rejected during warm-up.
- **CRC algorithm (RS-232C / TCP#23):** the 7-byte header's CRC_low / CRC_high is a CRC over the 6 command-data bytes. The source does not state the CRC polynomial; implementers must match against a known-good frame from a real projector. (UNRESOLVED: polynomial not documented in this source.)
- **TCP#9715 checksum:** the trailing 1-byte checksum is computed so that the lower 8 bits of the sum from header through checksum equal zero.
- **Daisy chain (RS-485/RS-232, source ambiguous):** alternate header layout with Packet_Type/Group/ID bytes. Five additional commands: control projector, get status, get connected-count, set/get group+ID. Not enumerated in this spec — covered separately if needed.
- **PJLink Class 1 commands:** the projector implements POWR, INPT, AVMT, ERST, LAMP, INST, NAME, INF1, INF2, INFO, CLSS with the standard PJLink codes listed in the source's PJLink table. PJLink input codes 11/12/13/21/22/23/24/31/32 map to COMPUTER IN 1/2, BNC, COMPONENT, S-VIDEO, VIDEO 1/2, HDMI, DVI-D respectively.
- **VOLUME command:** the protocol table contains NO volume/audio command. The LW650 is a presentation projector with no audio control surface in this command set.

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-000161-02-christie-tech-guid-lw650_ls700_lx750_lw720-.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000158-01-christie-lw650-lx750-ls700-user-manual-concise.pdf
  - https://www.manualslib.com/manual/700008/Christie-Lw650.html
retrieved_at: 2026-06-02T21:05:26.594Z
last_checked_at: 2026-06-25T19:45:13.620Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T19:45:13.620Z
matched_actions: 614
action_count: 614
confidence: medium
summary: "deterministic presence proof: 614/614 payloads verbatim in source; stratified Sonnet sample corroborated (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PJLink UDP port (standard 4352) not stated in source; only the manual protocol ports 23/9715 are documented."
- "Daisy-chain physical layer (RS-485 vs RS-232) not stated; protocol header differs but cable type not specified."
- "flow control not stated in source (pins 7/8 listed but no RTS/CTS/XON-XOFF setting documented)"
- "unit (hours vs hundreds-of-hours) not stated in source; spec returns raw 16-bit halves."
- "source does not document any unsolicited notifications / asynchronous event frames."
- "source does not describe any pre-defined multi-step macro sequences on the projector."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "polynomial not documented in this source.)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
