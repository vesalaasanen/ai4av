---
spec_id: admin/sim2-ht280-rs232
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sim2 HT280 / HT280E / HT300E RS-232C Control Spec"
manufacturer: Sim2
model_family: HT280
aliases: []
compatible_with:
  manufacturers:
    - Sim2
  models:
    - HT280
    - HT280E
    - HT300E
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usermanual.wiki
source_urls:
  - https://usermanual.wiki/Document/HT300EHT280EControlSpec11.977828440.pdf
retrieved_at: 2026-06-14T18:39:48.941Z
last_checked_at: 2026-06-14T19:39:45.380Z
generated_at: 2026-06-14T19:39:45.380Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source"
  - "any error-clearing / fault-recovery sequence beyond the `15` return code is not documented"
  - "voltage / current / lamp-hour telemetry not in source"
  - "settable scalar parameters (brightness, contrast, color, tint, sharpness,"
  - "source documents return-code responses only (06/15); no unsolicited"
  - "source contains no safety warnings, interlocks, or power-on sequencing"
  - "firmware version range covered by this protocol not stated in source"
  - "CRC polynomial / algorithm for the 2-byte Packet Checksum not stated in source — implementers must reverse-engineer or obtain from Sim2 directly"
  - "max cable length / electrical limits not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-14T19:39:45.380Z
  matched_actions: 149
  action_count: 149
  confidence: medium
  summary: "All 149 spec actions match literal hex commands in source; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Sim2 HT280 / HT280E / HT300E RS-232C Control Spec

## Summary
RS-232C binary control protocol for the Sim2 HT280/HT280E/HT300E DLP projector line. Fixed 7-byte packet header (`BE EF`) followed by a 6-byte Event payload or 25-byte Operation payload; all bytes transmitted as raw hex. Packets acknowledged with return code `06` (OK) or `15` (error). Serial link runs at 19200 bps, 8N1, no flow control.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: any error-clearing / fault-recovery sequence beyond the `15` return code is not documented -->
<!-- UNRESOLVED: voltage / current / lamp-hour telemetry not in source -->

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

## Traits
```yaml
- powerable       # inferred from STAND BY keycode
- routable        # inferred from INPUT 3 signal-type operation codes
- queryable       # inferred: response-code path (06/15) implies queryable acknowledgement channel
- levelable       # inferred from INCREMENT/DECREMENT operation codes (brightness, contrast, color, tint, etc.)
```

## Actions
```yaml
# Every command-bearing row from the source is listed as a separate action.
# All payloads are 13-byte Event packets (Remote Control keycodes + Direct Access codes)
# or 32-byte Operation packets. Bytes transmitted little-endian per the source's
# "ls-byte first" note for the 0xBEEF header word.

# --- Remote Control Keycodes (13-byte Event packets) ---
- id: standby
  label: Stand By
  kind: action
  command: "BE EF 02 06 00 51 E4 48 01 00 00 00 00"
  params: []

- id: rc_key_0
  label: Remote Control Key 0 (Power-on, last source)
  kind: action
  command: "BE EF 02 06 00 6B E6 52 01 00 00 00 00"
  params: []
  notes: "From stand-by, switches the unit on and reselects the last memorised source."

- id: rc_key_1
  label: Remote Control Key 1 (Source 1, power-on)
  kind: action
  command: "BE EF 02 06 00 80 E5 49 01 00 00 00 00"
  params: []
  notes: "From stand-by, switches the unit on and selects Source 1."

- id: rc_key_2
  label: Remote Control Key 2 (Source 2, power-on)
  kind: action
  command: "BE EF 02 06 00 B3 E5 4A 01 00 00 00 00"
  params: []

- id: rc_key_3
  label: Remote Control Key 3 (Source 3, power-on)
  kind: action
  command: "BE EF 02 06 00 62 E4 4B 01 00 00 00 00"
  params: []

- id: rc_key_4
  label: Remote Control Key 4 (Source 4, power-on)
  kind: action
  command: "BE EF 02 06 00 D5 E5 4C 01 00 00 00 00"
  params: []

- id: rc_key_5
  label: Remote Control Key 5 (Source 5, power-on)
  kind: action
  command: "BE EF 02 06 00 04 E4 4D 01 00 00 00 00"
  params: []

- id: rc_key_6
  label: Remote Control Key 6
  kind: action
  command: "BE EF 02 06 00 37 E4 4E 01 00 00 00 00"
  params: []

- id: rc_key_7
  label: Remote Control Key 7
  kind: action
  command: "BE EF 02 06 00 E6 E5 4F 01 00 00 00 00"
  params: []

- id: rc_key_8
  label: Remote Control Key 8
  kind: action
  command: "BE EF 02 06 00 89 E7 50 01 00 00 00 00"
  params: []

- id: rc_key_9
  label: Remote Control Key 9
  kind: action
  command: "BE EF 02 06 00 58 E6 51 01 00 00 00 00"
  params: []

- id: esc
  label: ESC
  kind: action
  command: "BE EF 02 06 00 0D E6 54 01 00 00 00 00"
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  command: "BE EF 02 06 00 DC E7 55 01 00 00 00 00"
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  command: "BE EF 02 06 00 EF E7 56 01 00 00 00 00"
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  command: "BE EF 02 06 00 3E E6 57 01 00 00 00 00"
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  command: "BE EF 02 06 00 C1 E6 58 01 00 00 00 00"
  params: []

- id: menu_left
  label: Menu Left (-)
  kind: action
  command: "BE EF 02 06 00 10 E7 59 01 00 00 00 00"
  params: []

- id: menu_right
  label: Menu Right (+)
  kind: action
  command: "BE EF 02 06 00 23 E7 5A 01 00 00 00 00"
  params: []

- id: freeze
  label: Freeze
  kind: action
  command: "BE EF 02 06 00 F2 E6 5B 01 00 00 00 00"
  params: []

- id: f1
  label: F1
  kind: action
  command: "BE EF 02 06 00 E6 F4 8F 01 00 00 00 00"
  params: []

- id: f2
  label: F2
  kind: action
  command: "BE EF 02 06 00 89 F6 90 01 00 00 00 00"
  params: []

- id: info
  label: Info
  kind: action
  command: "BE EF 02 06 00 A7 E6 5E 01 00 00 00 00"
  params: []

- id: auto
  label: Auto
  kind: action
  command: "BE EF 02 06 00 79 E2 60 01 00 00 00 00"
  params: []

- id: aspect_normal
  label: Aspect Normal
  kind: action
  command: "BE EF 02 06 00 2A F4 83 01 00 00 00 00"
  params: []

- id: aspect_anamorphic
  label: Aspect Anamorphic
  kind: action
  command: "BE EF 02 06 00 9D F5 84 01 00 00 00 00"
  params: []

- id: aspect_letterbox
  label: Aspect Letterbox
  kind: action
  command: "BE EF 02 06 00 4C F4 85 01 00 00 00 00"
  params: []

- id: aspect_panoramic
  label: Aspect Panoramic
  kind: action
  command: "BE EF 02 06 00 7F F4 86 01 00 00 00 00"
  params: []

- id: aspect_pixel_to_pixel
  label: Aspect Pixel to Pixel
  kind: action
  command: "BE EF 02 06 00 AE F5 87 01 00 00 00 00"
  params: []

- id: aspect_user_1
  label: Aspect User 1
  kind: action
  command: "BE EF 02 06 00 51 F5 88 01 00 00 00 00"
  params: []

- id: aspect_user_2
  label: Aspect User 2
  kind: action
  command: "BE EF 02 06 00 80 F4 89 01 00 00 00 00"
  params: []

- id: aspect_user_3
  label: Aspect User 3
  kind: action
  command: "BE EF 02 06 00 B3 F4 8A 01 00 00 00 00"
  params: []

- id: vcr
  label: VCR
  kind: action
  command: "BE EF 02 06 00 9B E3 62 01 00 00 00 00"
  params: []

# --- Direct Access codes (13-byte Event packets) ---
- id: zoom
  label: Zoom (direct access)
  kind: action
  command: "BE EF 02 06 00 94 E6 5D 01 00 00 00 00"
  params: []

- id: focus
  label: Focus (direct access)
  kind: action
  command: "BE EF 02 06 00 76 E7 5F 01 00 00 00 00"
  params: []

- id: goto_brightness
  label: Goto Brightness
  kind: action
  command: "BE EF 02 06 00 C7 E1 7E 01 00 00 00 00"
  params: []

- id: goto_contrast
  label: Goto Contrast
  kind: action
  command: "BE EF 02 06 00 16 E0 7F 01 00 00 00 00"
  params: []

- id: goto_color
  label: Goto Color
  kind: action
  command: "BE EF 02 06 00 19 F4 80 01 00 00 00 00"
  params: []

- id: goto_tint
  label: Goto Tint
  kind: action
  command: "BE EF 02 06 00 C8 F5 81 01 00 00 00 00"
  params: []

# --- Operation Codes: BRIGHTNESS (32-byte Operation packets) ---
- id: brightness_increment
  label: Brightness Increment
  kind: action
  command: "BE EF 03 19 00 AB 7E 03 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: brightness_decrement
  label: Brightness Decrement
  kind: action
  command: "BE EF 03 19 00 C5 D4 04 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: CONTRAST ---
- id: contrast_increment
  label: Contrast Increment
  kind: action
  command: "BE EF 03 19 00 3E 23 03 01 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: contrast_decrement
  label: Contrast Decrement
  kind: action
  command: "BE EF 03 19 00 50 89 04 01 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: COLOR ---
- id: color_increment
  label: Color Increment
  kind: action
  command: "BE EF 03 19 00 C1 C7 03 02 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_decrement
  label: Color Decrement
  kind: action
  command: "BE EF 03 19 00 AF 6D 04 02 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: TINT ---
- id: tint_increment
  label: Tint Increment
  kind: action
  command: "BE EF 03 19 00 54 9A 03 03 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: tint_decrement
  label: Tint Decrement
  kind: action
  command: "BE EF 03 19 00 3A 30 04 03 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: SHARPNESS (Video) ---
- id: sharpness_video_increment
  label: Sharpness (Video) Increment
  kind: action
  command: "BE EF 03 19 00 7E 0C 03 04 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: sharpness_video_decrement
  label: Sharpness (Video) Decrement
  kind: action
  command: "BE EF 03 19 00 10 A6 04 04 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: SHARPNESS FILTER ---
- id: sharpness_filter_increment
  label: Sharpness Filter Increment
  kind: action
  command: "BE EF 03 19 00 D4 C4 03 09 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: sharpness_filter_decrement
  label: Sharpness Filter Decrement
  kind: action
  command: "BE EF 03 19 00 BA 6E 04 09 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: SHARPNESS MODE ---
- id: sharpness_mode_video
  label: Sharpness Mode Set Video
  kind: action
  command: "BE EF 03 19 00 7A 80 01 60 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: sharpness_mode_graphics
  label: Sharpness Mode Set Graphics
  kind: action
  command: "BE EF 03 19 00 EA 41 01 60 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: CINEMA MODE ---
- id: cinema_mode_off
  label: Cinema Mode Set Off
  kind: action
  command: "BE EF 03 19 00 33 43 01 07 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: cinema_mode_auto
  label: Cinema Mode Set Auto
  kind: action
  command: "BE EF 03 19 00 A3 82 01 07 08 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: VIDEO TYPE ---
- id: video_type_normal
  label: Video Type Set Normal
  kind: action
  command: "BE EF 03 19 00 A6 1E 01 06 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: video_type_vcr
  label: Video Type Set VCR
  kind: action
  command: "BE EF 03 19 00 36 DF 01 06 08 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: POSITION HORIZONTAL ---
- id: position_horizontal_increment
  label: Position Horizontal Increment
  kind: action
  command: "BE EF 03 19 00 55 BA 03 21 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: position_horizontal_decrement
  label: Position Horizontal Decrement
  kind: action
  command: "BE EF 03 19 00 3B 10 04 21 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: POSITION VERTICAL ---
- id: position_vertical_increment
  label: Position Vertical Increment
  kind: action
  command: "BE EF 03 19 00 AA 5E 03 22 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: position_vertical_decrement
  label: Position Vertical Decrement
  kind: action
  command: "BE EF 03 19 00 C4 F4 04 22 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: COLOR TEMPERATURE (preset selections 01..36) ---
- id: color_temperature_01
  label: Color Temperature 01
  kind: action
  command: "BE EF 03 19 00 D6 F4 01 C2 09 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_02
  label: Color Temperature 02
  kind: action
  command: "BE EF 03 19 00 46 35 01 C2 09 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_03
  label: Color Temperature 03
  kind: action
  command: "BE EF 03 19 00 B7 75 01 C2 09 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_04
  label: Color Temperature 04
  kind: action
  command: "BE EF 03 19 00 27 B4 01 C2 09 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_05
  label: Color Temperature 05
  kind: action
  command: "BE EF 03 19 00 15 F6 01 C2 09 00 00 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_06
  label: Color Temperature 06
  kind: action
  command: "BE EF 03 19 00 85 37 01 C2 09 00 00 00 00 00 00 05 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_07
  label: Color Temperature 07
  kind: action
  command: "BE EF 03 19 00 74 77 01 C2 09 00 00 00 00 00 00 06 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_08
  label: Color Temperature 08
  kind: action
  command: "BE EF 03 19 00 E4 B6 01 C2 09 00 00 00 00 00 00 07 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_09
  label: Color Temperature 09
  kind: action
  command: "BE EF 03 19 00 10 F3 01 C2 09 00 00 00 00 00 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_10
  label: Color Temperature 10
  kind: action
  command: "BE EF 03 19 00 80 32 01 C2 09 00 00 00 00 00 00 09 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_11
  label: Color Temperature 11
  kind: action
  command: "BE EF 03 19 00 71 72 01 C2 09 00 00 00 00 00 00 0A 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_12
  label: Color Temperature 12
  kind: action
  command: "BE EF 03 19 00 E1 B3 01 C2 09 00 00 00 00 00 00 0B 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_13
  label: Color Temperature 13
  kind: action
  command: "BE EF 03 19 00 D3 F1 01 C2 09 00 00 00 00 00 00 0C 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_14
  label: Color Temperature 14
  kind: action
  command: "BE EF 03 19 00 43 30 01 C2 09 00 00 00 00 00 00 0D 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_15
  label: Color Temperature 15
  kind: action
  command: "BE EF 03 19 00 B2 70 01 C2 09 00 00 00 00 00 00 0E 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_16
  label: Color Temperature 16
  kind: action
  command: "BE EF 03 19 00 22 B1 01 C2 09 00 00 00 00 00 00 0F 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_17
  label: Color Temperature 17
  kind: action
  command: "BE EF 03 19 00 1A F9 01 C2 09 00 00 00 00 00 00 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_18
  label: Color Temperature 18
  kind: action
  command: "BE EF 03 19 00 8A 38 01 C2 09 00 00 00 00 00 00 11 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_19
  label: Color Temperature 19
  kind: action
  command: "BE EF 03 19 00 7B 78 01 C2 09 00 00 00 00 00 00 12 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_20
  label: Color Temperature 20
  kind: action
  command: "BE EF 03 19 00 EB B9 01 C2 09 00 00 00 00 00 00 13 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_21
  label: Color Temperature 21
  kind: action
  command: "BE EF 03 19 00 D9 FB 01 C2 09 00 00 00 00 00 00 14 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_22
  label: Color Temperature 22
  kind: action
  command: "BE EF 03 19 00 49 3A 01 C2 09 00 00 00 00 00 00 15 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_23
  label: Color Temperature 23
  kind: action
  command: "BE EF 03 19 00 B8 7A 01 C2 09 00 00 00 00 00 00 16 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_24
  label: Color Temperature 24
  kind: action
  command: "BE EF 03 19 00 28 BB 01 C2 09 00 00 00 00 00 00 17 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_25
  label: Color Temperature 25
  kind: action
  command: "BE EF 03 19 00 DC FE 01 C2 09 00 00 00 00 00 00 18 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_26
  label: Color Temperature 26
  kind: action
  command: "BE EF 03 19 00 4C 3F 01 C2 09 00 00 00 00 00 00 19 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_27
  label: Color Temperature 27
  kind: action
  command: "BE EF 03 19 00 BD 7F 01 C2 09 00 00 00 00 00 00 1A 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_28
  label: Color Temperature 28
  kind: action
  command: "BE EF 03 19 00 2D BE 01 C2 09 00 00 00 00 00 00 1B 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_29
  label: Color Temperature 29
  kind: action
  command: "BE EF 03 19 00 1F FC 01 C2 09 00 00 00 00 00 00 1C 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_30
  label: Color Temperature 30
  kind: action
  command: "BE EF 03 19 00 8F 3D 01 C2 09 00 00 00 00 00 00 1D 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_31
  label: Color Temperature 31
  kind: action
  command: "BE EF 03 19 00 7E 7D 01 C2 09 00 00 00 00 00 00 1E 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_32
  label: Color Temperature 32
  kind: action
  command: "BE EF 03 19 00 EE BC 01 C2 09 00 00 00 00 00 00 1F 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_33
  label: Color Temperature 33
  kind: action
  command: "BE EF 03 19 00 0E ED 01 C2 09 00 00 00 00 00 00 20 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_34
  label: Color Temperature 34
  kind: action
  command: "BE EF 03 19 00 9E 2C 01 C2 09 00 00 00 00 00 00 21 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_35
  label: Color Temperature 35
  kind: action
  command: "BE EF 03 19 00 6F 6C 01 C2 09 00 00 00 00 00 00 22 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_temperature_36
  label: Color Temperature 36
  kind: action
  command: "BE EF 03 19 00 FF AD 01 C2 09 00 00 00 00 00 00 23 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: GAMMA (preset selections 01..12) ---
- id: gamma_01
  label: Gamma 01
  kind: action
  command: "BE EF 03 19 00 FA 59 01 27 08 00 00 00 00 00 00 06 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_02
  label: Gamma 02
  kind: action
  command: "BE EF 03 19 00 9E DD 01 27 08 00 00 00 00 00 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_03
  label: Gamma 03
  kind: action
  command: "BE EF 03 19 00 6A 98 01 27 08 00 00 00 00 00 00 07 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_04
  label: Gamma 04
  kind: action
  command: "BE EF 03 19 00 6F 9D 01 27 08 00 00 00 00 00 00 0B 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_05
  label: Gamma 05
  kind: action
  command: "BE EF 03 19 00 5D DF 01 27 08 00 00 00 00 00 00 0C 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_06
  label: Gamma 06
  kind: action
  command: "BE EF 03 19 00 CD 1E 01 27 08 00 00 00 00 00 00 0D 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_07
  label: Gamma 07
  kind: action
  command: "BE EF 03 19 00 3C 5E 01 27 08 00 00 00 00 00 00 0E 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_08
  label: Gamma 08
  kind: action
  command: "BE EF 03 19 00 AC 9F 01 27 08 00 00 00 00 00 00 0F 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_09
  label: Gamma 09
  kind: action
  command: "BE EF 03 19 00 94 D7 01 27 08 00 00 00 00 00 00 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_10
  label: Gamma 10
  kind: action
  command: "BE EF 03 19 00 04 16 01 27 08 00 00 00 00 00 00 11 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_11
  label: Gamma 11
  kind: action
  command: "BE EF 03 19 00 F5 56 01 27 08 00 00 00 00 00 00 12 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: gamma_12
  label: Gamma 12
  kind: action
  command: "BE EF 03 19 00 65 97 01 27 08 00 00 00 00 00 00 13 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: FREQUENCY / PHASE / Y/C DELAY ---
- id: frequency_increment
  label: Frequency Increment
  kind: action
  command: "BE EF 03 19 00 15 95 03 24 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: frequency_decrement
  label: Frequency Decrement
  kind: action
  command: "BE EF 03 19 00 7B 3F 04 24 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: phase_increment
  label: Phase Increment
  kind: action
  command: "BE EF 03 19 00 80 C8 03 25 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: phase_decrement
  label: Phase Decrement
  kind: action
  command: "BE EF 03 19 00 EE 62 04 25 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: yc_delay_increment
  label: Y/C Delay Increment
  kind: action
  command: "BE EF 03 19 00 7F 2C 03 26 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: yc_delay_decrement
  label: Y/C Delay Decrement
  kind: action
  command: "BE EF 03 19 00 11 86 04 26 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: MAGNIFICATION / PAN ---
- id: magnification_increment
  label: Magnification Increment
  kind: action
  command: "BE EF 03 19 00 FF 72 03 2C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: magnification_decrement
  label: Magnification Decrement
  kind: action
  command: "BE EF 03 19 00 91 D8 04 2C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: pan_horizontal_increment
  label: Pan Horizontal Increment
  kind: action
  command: "BE EF 03 19 00 6A 2F 03 2D 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: pan_horizontal_decrement
  label: Pan Horizontal Decrement
  kind: action
  command: "BE EF 03 19 00 04 85 04 2D 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: pan_vertical_increment
  label: Pan Vertical Increment
  kind: action
  command: "BE EF 03 19 00 95 CB 03 2E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: pan_vertical_decrement
  label: Pan Vertical Decrement
  kind: action
  command: "BE EF 03 19 00 FB 61 04 2E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: KEYSTONE ---
- id: keystone_vertical_increment
  label: Keystone Vertical Increment
  kind: action
  command: "BE EF 03 19 00 01 26 03 1C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: keystone_vertical_decrement
  label: Keystone Vertical Decrement
  kind: action
  command: "BE EF 03 19 00 6F 8C 04 1C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: keystone_horizontal_increment
  label: Keystone Horizontal Increment
  kind: action
  command: "BE EF 03 19 00 6B 9F 03 1E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: keystone_horizontal_decrement
  label: Keystone Horizontal Decrement
  kind: action
  command: "BE EF 03 19 00 05 35 04 1E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: LANGUAGE ---
- id: language_english
  label: Language Set English
  kind: action
  command: "BE EF 03 19 00 15 35 01 05 24 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: language_italiano
  label: Language Set Italiano
  kind: action
  command: "BE EF 03 19 00 85 F4 01 05 24 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: language_francais
  label: Language Set Français
  kind: action
  command: "BE EF 03 19 00 74 B4 01 05 24 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: language_deutsch
  label: Language Set Deutsch
  kind: action
  command: "BE EF 03 19 00 E4 75 01 05 24 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: language_espanol
  label: Language Set Español
  kind: action
  command: "BE EF 03 19 00 D6 37 01 05 24 00 00 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: language_portugues
  label: Language Set Portugues
  kind: action
  command: "BE EF 03 19 00 46 F6 01 05 24 00 00 00 00 00 00 05 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: OSD POSITION ---
- id: osd_position_horizontal_increment
  label: OSD Position Horizontal Increment
  kind: action
  command: "BE EF 03 19 00 82 88 03 61 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: osd_position_horizontal_decrement
  label: OSD Position Horizontal Decrement
  kind: action
  command: "BE EF 03 19 00 EC 22 04 61 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: osd_position_vertical_increment
  label: OSD Position Vertical Increment
  kind: action
  command: "BE EF 03 19 00 7D 6C 03 62 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: osd_position_vertical_decrement
  label: OSD Position Vertical Decrement
  kind: action
  command: "BE EF 03 19 00 13 C6 04 62 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: INPUT 3 (COMP. RGB) / SIGNAL TYPE ---
- id: input3_ycrcb_autosync
  label: Input 3 Signal Type Set YCrCb AutoSync
  kind: action
  command: "BE EF 03 19 00 92 04 01 82 08 00 00 00 00 00 00 14 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: input3_ycrcb_15khz
  label: Input 3 Signal Type Set YCrCb 15kHz
  kind: action
  command: "BE EF 03 19 00 5B 0C 01 82 08 00 00 00 00 00 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: input3_ycrcb_32khz
  label: Input 3 Signal Type Set YCrCb 32kHz
  kind: action
  command: "BE EF 03 19 00 51 06 01 82 08 00 00 00 00 00 00 10 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: input3_rgb_autosync
  label: Input 3 Signal Type Set RGB AutoSync
  kind: action
  command: "BE EF 03 19 00 97 01 01 82 08 00 00 00 00 00 00 18 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: input3_rgb_15khz
  label: Input 3 Signal Type Set RGB 15kHz
  kind: action
  command: "BE EF 03 19 00 5E 09 01 82 08 00 00 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: input3_rgb_32khz
  label: Input 3 Signal Type Set RGB 32kHz
  kind: action
  command: "BE EF 03 19 00 98 0E 01 82 08 00 00 00 00 00 00 0C 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# --- Operation Codes: MEMORY 1/2/3 (Recall + Save Current + Save Initial) ---
- id: memory_1_recall
  label: Memory 1 Recall
  kind: action
  command: "BE EF 03 19 00 85 EB 01 27 09 00 00 01 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: memory_1_save_current
  label: Memory 1 Save Current Settings
  kind: action
  command: "BE EF 03 19 00 54 D6 01 27 09 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: memory_1_save_initial
  label: Memory 1 Save Initial Settings
  kind: action
  command: "BE EF 03 19 00 45 9A 01 28 09 00 00 01 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: memory_2_recall
  label: Memory 2 Recall
  kind: action
  command: "BE EF 03 19 00 74 AB 01 27 09 00 00 01 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: memory_2_save_current
  label: Memory 2 Save Current Settings
  kind: action
  command: "BE EF 03 19 00 A5 96 01 27 09 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: memory_2_save_initial
  label: Memory 2 Save Initial Settings
  kind: action
  command: "BE EF 03 19 00 76 DE 01 28 09 00 00 02 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: memory_3_recall
  label: Memory 3 Recall
  kind: action
  command: "BE EF 03 19 00 E4 6A 01 27 09 00 00 01 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: memory_3_save_current
  label: Memory 3 Save Current Settings
  kind: action
  command: "BE EF 03 19 00 35 57 01 27 09 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: memory_3_save_initial
  label: Memory 3 Save Initial Settings
  kind: action
  command: "BE EF 03 19 00 A7 E3 01 28 09 00 00 03 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []
```

## Feedbacks
```yaml
- id: ack_ok
  type: enum
  values: [acknowledged]
  notes: "Single-byte return code 0x06 from the projector, meaning command received with no error."

- id: ack_error
  type: enum
  values: [error]
  notes: "Single-byte return code 0x15 from the projector, meaning command acknowledged but an error has occurred."
```

## Variables
```yaml
# UNRESOLVED: settable scalar parameters (brightness, contrast, color, tint, sharpness,
# frequency, phase, Y/C delay, magnification, pan, keystone, OSD position) are
# adjusted only via INCREMENT/DECREMENT operation codes in the source - no direct
# set-value query syntax is documented. No scalar Variables entries can be derived.
```

## Events
```yaml
# UNRESOLVED: source documents return-code responses only (06/15); no unsolicited
# event payloads from the device are described.
```

## Macros
```yaml
- id: power_on_select_source_3
  label: Power On from Standby and Select Source 3
  steps:
    - send: BEEF02060062E44B0100000000  # RC key 3 (Source 3 + power-on from standby)
  notes: "From stand-by the projector switches on and selects Source 3. After receiving the 0x06 return code, allow ≥40 ms before the next command (per source Warnings section)."

- id: menu_right_show_osd
  label: Open On-Screen Display (Menu Right)
  steps:
    - send: BEEF02060023E75A0100000000
  notes: "Triggers the OSD on screen. Acknowledge 0x06, then wait ≥40 ms."

- id: aspect_anamorphic
  label: Set Aspect Ratio to Anamorphic
  steps:
    - send: BEEF0206009DF5840100000000
  notes: "Acknowledged with 0x06. Wait ≥40 ms before next command."

- id: input3_ycrcb_15khz_with_key_assign
  label: Input 3 (Comp. RGB) YCrCb 15kHz + Source Key Assignment
  steps:
    - send: BEEF0319005B0C01820800000000000008000000000000000000000000000000
    - wait_ms: 40
    - send: BEEF02060062E44B0100000000  # RC key 3 - assigns Input 3 to key 3
  notes: "Per source Example 4. Wait for the 0x06 return code from the first packet, then an additional 40 ms, then send the source-assignment keycode."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing
# requirements - only timing/return-code handling guidance (40 ms between return code
# and next command; oversize/undersize packet handling). The 40 ms inter-command
# delay is the only operational constraint documented and is recorded under Notes.
```

## Notes
- The packet header is 7 bytes: `BE EF` (sync word, ls-byte first), 1 byte Packet Type, 2 bytes Packet Payload Size, 2 bytes Packet Checksum (CRC). Event payload = 6 bytes (total packet 13 bytes). Operation payload = 25 bytes (total packet 32 bytes).
- All packets acknowledged with a single-byte return code: `0x06` = OK, `0x15` = error. The source states an Error Code is returned when the byte count is shorter than the protocol requires; excess bytes are silently ignored.
- Per source: "Allow a time interval of at least 40 ms between the Return Code and the following Command." Apply this delay between every command and the next.
- Remote control keys `0` and `1`-`5` are special: from stand-by they also power the unit on. `0` resumes the last memorised source; `1`-`5` switch to the corresponding source.
- The connector is a female DB-9 (D-SUB 9-pin). Only pins 2 (TD), 3 (RD) and 5 (GND) are used; the other pins are N/C. This is a DTE-style pinout (host transmits on pin 3, receives on pin 2, matches PC-style null-modem when connecting PC COM port directly with a straight-through or null-modem cable as appropriate for the controller).
- "Send Mode" and "Read Mode" of the terminal/serial-tool should be set to HEX, not ASCII.
- The HT280E / HT300E share this protocol (source explicitly states: "SIM2 HT 300E / HT 280E").
<!-- UNRESOLVED: firmware version range covered by this protocol not stated in source -->
<!-- UNRESOLVED: CRC polynomial / algorithm for the 2-byte Packet Checksum not stated in source — implementers must reverse-engineer or obtain from Sim2 directly -->
<!-- UNRESOLVED: max cable length / electrical limits not stated in source -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
source_urls:
  - https://usermanual.wiki/Document/HT300EHT280EControlSpec11.977828440.pdf
retrieved_at: 2026-06-14T18:39:48.941Z
last_checked_at: 2026-06-14T19:39:45.380Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T19:39:45.380Z
matched_actions: 149
action_count: 149
confidence: medium
summary: "All 149 spec actions match literal hex commands in source; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source"
- "any error-clearing / fault-recovery sequence beyond the `15` return code is not documented"
- "voltage / current / lamp-hour telemetry not in source"
- "settable scalar parameters (brightness, contrast, color, tint, sharpness,"
- "source documents return-code responses only (06/15); no unsolicited"
- "source contains no safety warnings, interlocks, or power-on sequencing"
- "firmware version range covered by this protocol not stated in source"
- "CRC polynomial / algorithm for the 2-byte Packet Checksum not stated in source — implementers must reverse-engineer or obtain from Sim2 directly"
- "max cable length / electrical limits not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
