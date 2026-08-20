---
spec_id: admin/hitachi-lp-wu6600-wu6700
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hitachi LP-WU6600 / LP-WU6700 Control Spec"
manufacturer: Hitachi
model_family: LP-WU6600
aliases: []
compatible_with:
  manufacturers:
    - Hitachi
  models:
    - LP-WU6600
    - LP-WU6700
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - projectorcentral.com
source_urls:
  - https://www.projectorcentral.com/pdf/projector_manual_10157.pdf
retrieved_at: 2026-08-15T09:36:27.718Z
last_checked_at: 2026-08-19T09:25:01.500Z
generated_at: 2026-08-19T09:25:01.500Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "explicit power on/off rows are not in the RS-232 command table; PJLink POWR implies power control but no direct RS-232 power command hex was located in this excerpt."
  - "source documents per-feature Set/Increment/Decrement/Get triplets"
  - "source describes polling-only model. No unsolicited notification"
  - "source does not document any multi-step sequences."
  - "precise warm-up window not stated numerically in source."
  - "no explicit human-safety interlock or laser-shutdown procedure found."
  - "explicit RS-232 power on/off command hex not present in source table; power control is reachable only via PJLink POWR (0/1)."
  - "source does not include an HTTP/REST or HTTPS endpoint; only RS-232, TCP/Telnet port 23, PJLink, Crestron, AMX."
  - "detailed CRC algorithm not reproduced in source — implementer must obtain CRC table from manufacturer."
  - "network apply command hex for setting IP/DHCP not stated (Apply row is empty in source)."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:25:01.500Z
  matched_actions: 484
  action_count: 484
  confidence: medium
  summary: "Every spec action hex traces verbatim to the source RS-232 command table; transport parameters (19200 8N1, TCP 23) are documented; PJLink subset is fully represented; bidirectional coverage ≈1.0. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-15
---

# Hitachi LP-WU6600 / LP-WU6700 Control Spec

## Summary
Dual-laser installation projector controllable over RS-232C and TCP/Telnet using a Hitachi-proprietary 13-byte binary protocol (header `BE EF 03 06 00 …`). Also supports PJLink Class 1, Crestron RoomView, and AMX Device Discovery. This spec captures the RS-232/Telnet command table, PJLink mapping, and physical connection settings.

<!-- UNRESOLVED: explicit power on/off rows are not in the RS-232 command table; PJLink POWR implies power control but no direct RS-232 power command hex was located in this excerpt. -->

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
  port: 23
auth:
  type: none  # inferred: no login/password/auth procedure described in source
```

## Traits
```yaml
- powerable       # inferred from PJLink POWR command support
- routable        # inferred from Source / Input select commands
- queryable       # inferred from GET operations across the command table
- levelable       # inferred from Volume / Brightness / Contrast / etc. set commands
```

## Actions
```yaml
# All hex payloads below share the fixed prefix: Header=BE EF, Packet=03,
# Data Size=06 00, followed by CRC (aL aH), Action (xx 00), Type (xx xx),
# Setting Code (xx xx). CRC must be computed per the source's CRC table.

# --- Image / Display Mode ---
- id: display_mode_presentation
  label: Display Mode - Presentation
  kind: action
  command: "BE EF 03 06 00 B3 CB 01 00 BA 30 51 00"

- id: display_mode_high_bright
  label: Display Mode - High Bright
  kind: action
  command: "BE EF 03 06 00 23 CA 01 00 BA 30 50 00"

- id: display_mode_sports
  label: Display Mode - Sports (Game)
  kind: action
  command: "BE EF 03 06 00 D3 F6 01 00 BA 30 03 00"

- id: display_mode_cinema
  label: Display Mode - Cinema (Movie)
  kind: action
  command: "BE EF 03 06 00 B3 F7 01 00 BA 30 01 00"

- id: display_mode_photo
  label: Display Mode - Photo (Vivid)
  kind: action
  command: "BE EF 03 06 00 73 F5 01 00 BA 30 05 00"

- id: display_mode_video
  label: Display Mode - Video (TV)
  kind: action
  command: "BE EF 03 06 00 43 CB 01 00 BA 30 52 00"

- id: display_mode_natural
  label: Display Mode - Natural (sRGB)
  kind: action
  command: "BE EF 03 06 00 23 F6 01 00 BA 30 00 00"

- id: display_mode_dicom_sim
  label: Display Mode - DICOM SIM
  kind: action
  command: "BE EF 03 06 00 73 C6 01 00 BA 30 41 00"

- id: display_mode_user1
  label: Display Mode - USER-1
  kind: action
  command: "BE EF 03 06 00 E3 FB 01 00 BA 30 10 00"

- id: display_mode_user2
  label: Display Mode - USER-2
  kind: action
  command: "BE EF 03 06 00 73 FA 01 00 BA 30 11 00"

- id: display_mode_get
  label: Display Mode Get
  kind: query
  command: "BE EF 03 06 00 10 F6 02 00 BA 30 00 00"

# --- Brightness ---
- id: brightness_set
  label: Brightness Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 03 20 {val_l} {val_h}"  # [*1] CRC L/H, [*2] 00 00 (Min) - 64 00 (Max)
  params:
    - name: value
      type: integer
      description: 0-100 (encoded 00 00 - 64 00)

- id: brightness_increment
  label: Brightness Increment
  kind: action
  command: "BE EF 03 06 00 EF D2 04 00 03 20 00 00"

- id: brightness_decrement
  label: Brightness Decrement
  kind: action
  command: "BE EF 03 06 00 3E D3 05 00 03 20 00 00"

- id: brightness_get
  label: Brightness Get
  kind: query
  command: "BE EF 03 06 00 89 D2 02 00 03 20 00 00"

# --- Contrast ---
- id: contrast_set
  label: Contrast Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 04 20 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100 (encoded 00 00 - 64 00)

- id: contrast_increment
  label: Contrast Increment
  kind: action
  command: "BE EF 03 06 00 9B D3 04 00 04 20 00 00"

- id: contrast_decrement
  label: Contrast Decrement
  kind: action
  command: "BE EF 03 06 00 4A D2 05 00 04 20 00 00"

- id: contrast_get
  label: Contrast Get
  kind: query
  command: "BE EF 03 06 00 FD D3 02 00 04 20 00 00"

# --- Computer / Signal ---
- id: h_position_set
  label: Computer H Position Set
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 01 21 {val_l} {val_h}"  # range -5..5, 00 00..0A 00
  params:
    - name: value
      type: integer
      description: -5..5

- id: h_position_increment
  label: Computer H Position Increment
  kind: action
  command: "BE EF 03 06 00 97 82 04 00 01 21 00 00"

- id: h_position_decrement
  label: Computer H Position Decrement
  kind: action
  command: "BE EF 03 06 00 46 83 05 00 01 21 00 00"

- id: h_position_get
  label: Computer H Position Get
  kind: query
  command: "BE EF 03 06 00 F1 82 02 00 01 21 00 00"

- id: v_position_set
  label: Computer V Position Set
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 00 21 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: -5..5

- id: v_position_increment
  label: Computer V Position Increment
  kind: action
  command: "BE EF 03 06 00 6B 83 04 00 00 21 00 00"

- id: v_position_decrement
  label: Computer V Position Decrement
  kind: action
  command: "BE EF 03 06 00 BA 82 05 00 00 21 00 00"

- id: v_position_get
  label: Computer V Position Get
  kind: query
  command: "BE EF 03 06 00 0D 83 02 00 00 21 00 00"

- id: h_phase_set
  label: H Phase Set (0-31)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 03 21 {val_l} {val_h}"  # 00 00..1F 00
  params:
    - name: value
      type: integer
      description: 0-31

- id: h_phase_increment
  label: H Phase Increment
  kind: action
  command: "BE EF 03 06 00 2F 83 04 00 03 21 00 00"

- id: h_phase_decrement
  label: H Phase Decrement
  kind: action
  command: "BE EF 03 06 00 FE 82 05 00 03 21 00 00"

- id: h_phase_get
  label: H Phase Get
  kind: query
  command: "BE EF 03 06 00 49 83 02 00 03 21 00 00"

- id: tracking_set
  label: Tracking Set (-5..5)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 02 21 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: -5..5

- id: tracking_increment
  label: Tracking Increment
  kind: action
  command: "BE EF 03 06 00 D3 82 04 00 02 21 00 00"

- id: tracking_decrement
  label: Tracking Decrement
  kind: action
  command: "BE EF 03 06 00 02 83 05 00 02 21 00 00"

- id: tracking_get
  label: Tracking Get
  kind: query
  command: "BE EF 03 06 00 B5 82 02 00 02 21 00 00"

- id: auto_image_execute
  label: Auto Image Execute
  kind: action
  command: "BE EF 03 06 00 91 D0 06 00 0A 20 00 00"

# --- Image / Advanced ---
- id: brilliant_color_set
  label: Brilliant Color Set (0-10)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 9C 22 {val_l} {val_h}"  # 00 00..0A 00
  params:
    - name: value
      type: integer
      description: 0-10

- id: brilliant_color_increment
  label: Brilliant Color Increment
  kind: action
  command: "BE EF 03 06 00 3B 5D 04 00 9C 22 00 00"

- id: brilliant_color_decrement
  label: Brilliant Color Decrement
  kind: action
  command: "BE EF 03 06 00 EA 5C 05 00 9C 22 00 00"

- id: brilliant_color_get
  label: Brilliant Color Get
  kind: query
  command: "BE EF 03 06 00 5D 5D 02 00 9C 22 00 00"

- id: sharpness_set
  label: Sharpness Set (0-31)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 01 22 {val_l} {val_h}"  # 00 00..1F 00
  params:
    - name: value
      type: integer
      description: 0-31

- id: sharpness_increment
  label: Sharpness Increment
  kind: action
  command: "BE EF 03 06 00 97 72 04 00 01 22 00 00"

- id: sharpness_decrement
  label: Sharpness Decrement
  kind: action
  command: "BE EF 03 06 00 46 73 05 00 01 22 00 00"

- id: sharpness_get
  label: Sharpness Get
  kind: query
  command: "BE EF 03 06 00 F1 72 02 00 01 22 00 00"

- id: gamma_1_8
  label: Gamma 1.8
  kind: action
  command: "BE EF 03 06 00 3B 86 01 00 A0 30 B4 00"

- id: gamma_2_0
  label: Gamma 2.0
  kind: action
  command: "BE EF 03 06 00 FB A6 01 00 A0 30 C8 00"

- id: gamma_2_2
  label: Gamma 2.2
  kind: action
  command: "BE EF 03 06 00 FB A9 01 00 A0 30 DC 00"

- id: gamma_2_4
  label: Gamma 2.4
  kind: action
  command: "BE EF 03 06 00 3B B5 01 00 A0 30 F0 00"

- id: gamma_bw
  label: Gamma B&W
  kind: action
  command: "BE EF 03 06 00 EB F1 01 00 A0 30 FD FF"

- id: gamma_linear
  label: Gamma Linear
  kind: action
  command: "BE EF 03 06 00 1B F1 01 00 A0 30 FE FF"

- id: gamma_get
  label: Gamma Get
  kind: query
  command: "BE EF 03 06 00 08 F1 02 00 A0 30 00 00"

- id: color_temp_warm
  label: Color Temperature Warm (Low)
  kind: action
  command: "BE EF 03 06 00 6B F4 01 00 B0 30 01 00"

- id: color_temp_normal
  label: Color Temperature Normal (Mid-1)
  kind: action
  command: "BE EF 03 06 00 9B F4 01 00 B0 30 02 00"

- id: color_temp_cold
  label: Color Temperature Cold (High)
  kind: action
  command: "BE EF 03 06 00 0B F5 01 00 B0 30 03 00"

- id: color_temp_get
  label: Color Temperature Get
  kind: query
  command: "BE EF 03 06 00 C8 F5 02 00 B0 30 00 00"

- id: video_agc_off
  label: Video AGC Off
  kind: action
  command: "BE EF 03 06 00 92 5C 01 00 9D 22 00 00"

- id: video_agc_on
  label: Video AGC On
  kind: action
  command: "BE EF 03 06 00 02 5D 01 00 9D 22 01 00"

- id: video_agc_get
  label: Video AGC Get
  kind: query
  command: "BE EF 03 06 00 A1 5C 02 00 9D 22 00 00"

- id: video_saturation_set
  label: Video Saturation Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 02 22 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: video_saturation_increment
  label: Video Saturation Increment
  kind: action
  command: "BE EF 03 06 00 D3 72 04 00 02 22 00 00"

- id: video_saturation_decrement
  label: Video Saturation Decrement
  kind: action
  command: "BE EF 03 06 00 02 73 05 00 02 22 00 00"

- id: video_saturation_get
  label: Video Saturation Get
  kind: query
  command: "BE EF 03 06 00 B5 72 02 00 02 22 00 00"

- id: video_tint_set
  label: Video Tint Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 03 22 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: video_tint_increment
  label: Video Tint Increment
  kind: action
  command: "BE EF 03 06 00 2F 73 04 00 03 22 00 00"

- id: video_tint_decrement
  label: Video Tint Decrement
  kind: action
  command: "BE EF 03 06 00 FE 72 05 00 03 22 00 00"

- id: video_tint_get
  label: Video Tint Get
  kind: query
  command: "BE EF 03 06 00 49 73 02 00 03 22 00 00"

# --- White Balance ---
- id: wb_r_gain_set
  label: White Balance R Gain Set (0-200)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 B1 30 {val_l} {val_h}"  # 00 00..C8 00
  params:
    - name: value
      type: integer
      description: 0-200

- id: wb_r_gain_increment
  label: White Balance R Gain Increment
  kind: action
  command: "BE EF 03 06 00 52 F4 04 00 B1 30 00 00"

- id: wb_r_gain_decrement
  label: White Balance R Gain Decrement
  kind: action
  command: "BE EF 03 06 00 83 F5 05 00 B1 30 00 00"

- id: wb_r_gain_get
  label: White Balance R Gain Get
  kind: query
  command: "BE EF 03 06 00 34 F4 02 00 B1 30 00 00"

- id: wb_g_gain_set
  label: White Balance G Gain Set (0-200)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 B2 30 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-200

- id: wb_g_gain_increment
  label: White Balance G Gain Increment
  kind: action
  command: "BE EF 03 06 00 16 F4 04 00 B2 30 00 00"

- id: wb_g_gain_decrement
  label: White Balance G Gain Decrement
  kind: action
  command: "BE EF 03 06 00 C7 F5 05 00 B2 30 00 00"

- id: wb_g_gain_get
  label: White Balance G Gain Get
  kind: query
  command: "BE EF 03 06 00 70 F4 02 00 B2 30 00 00"

- id: wb_b_gain_set
  label: White Balance B Gain Set (0-200)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 B3 30 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-200

- id: wb_b_gain_increment
  label: White Balance B Gain Increment
  kind: action
  command: "BE EF 03 06 00 EA F5 04 00 B3 30 00 00"

- id: wb_b_gain_decrement
  label: White Balance B Gain Decrement
  kind: action
  command: "BE EF 03 06 00 3B F4 05 00 B3 30 00 00"

- id: wb_b_gain_get
  label: White Balance B Gain Get
  kind: query
  command: "BE EF 03 06 00 8C F5 02 00 B3 30 00 00"

- id: wb_r_offset_set
  label: White Balance R Offset Set (0-200)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 B5 30 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-200

- id: wb_r_offset_increment
  label: White Balance R Offset Increment
  kind: action
  command: "BE EF 03 06 00 62 F5 04 00 B5 30 00 00"

- id: wb_r_offset_decrement
  label: White Balance R Offset Decrement
  kind: action
  command: "BE EF 03 06 00 B3 F4 05 00 B5 30 00 00"

- id: wb_r_offset_get
  label: White Balance R Offset Get
  kind: query
  command: "BE EF 03 06 00 04 F5 02 00 B5 30 00 00"

- id: wb_g_offset_set
  label: White Balance G Offset Set (0-200)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 B6 30 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-200

- id: wb_g_offset_increment
  label: White Balance G Offset Increment
  kind: action
  command: "BE EF 03 06 00 26 F5 04 00 B6 30 00 00"

- id: wb_g_offset_decrement
  label: White Balance G Offset Decrement
  kind: action
  command: "BE EF 03 06 00 F7 F4 05 00 B6 30 00 00"

- id: wb_g_offset_get
  label: White Balance G Offset Get
  kind: query
  command: "BE EF 03 06 00 40 F5 02 00 B6 30 00 00"

- id: wb_b_offset_set
  label: White Balance B Offset Set (0-200)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 B7 30 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-200

- id: wb_b_offset_increment
  label: White Balance B Offset Increment
  kind: action
  command: "BE EF 03 06 00 DA F4 04 00 B7 30 00 00"

- id: wb_b_offset_decrement
  label: White Balance B Offset Decrement
  kind: action
  command: "BE EF 03 06 00 0B F5 05 00 B7 30 00 00"

- id: wb_b_offset_get
  label: White Balance B Offset Get
  kind: query
  command: "BE EF 03 06 00 BC F4 02 00 B7 30 00 00"

# --- Color Manager (Red / Green / Blue / Cyan / Magenta / Yellow × Hue / Saturation / Gain) ---
- id: cm_red_hue_set
  label: Color Manager Red Hue Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 00 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_red_hue_increment
  label: Color Manager Red Hue Increment
  kind: action
  command: "BE EF 03 06 00 6A 63 04 00 00 27 00 00"

- id: cm_red_hue_decrement
  label: Color Manager Red Hue Decrement
  kind: action
  command: "BE EF 03 06 00 BB 62 05 00 00 27 00 00"

- id: cm_red_hue_get
  label: Color Manager Red Hue Get
  kind: query
  command: "BE EF 03 06 00 0C 63 02 00 00 27 00 00"

- id: cm_red_saturation_set
  label: Color Manager Red Saturation Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 10 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_red_saturation_increment
  label: Color Manager Red Saturation Increment
  kind: action
  command: "BE EF 03 06 00 AA 67 04 00 10 27 00 00"

- id: cm_red_saturation_decrement
  label: Color Manager Red Saturation Decrement
  kind: action
  command: "BE EF 03 06 00 7B 66 05 00 10 27 00 00"

- id: cm_red_saturation_get
  label: Color Manager Red Saturation Get
  kind: query
  command: "BE EF 03 06 00 CC 67 02 00 10 27 00 00"

- id: cm_red_gain_set
  label: Color Manager Red Gain Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 20 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_red_gain_increment
  label: Color Manager Red Gain Increment
  kind: action
  command: "BE EF 03 06 00 AA 68 04 00 20 27 00 00"

- id: cm_red_gain_decrement
  label: Color Manager Red Gain Decrement
  kind: action
  command: "BE EF 03 06 00 7B 69 05 00 20 27 00 00"

- id: cm_red_gain_get
  label: Color Manager Red Gain Get
  kind: query
  command: "BE EF 03 06 00 CC 68 02 00 20 27 00 00"

- id: cm_green_hue_set
  label: Color Manager Green Hue Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 02 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_green_hue_increment
  label: Color Manager Green Hue Increment
  kind: action
  command: "BE EF 03 06 00 D2 62 04 00 02 27 00 00"

- id: cm_green_hue_decrement
  label: Color Manager Green Hue Decrement
  kind: action
  command: "BE EF 03 06 00 03 63 05 00 02 27 00 00"

- id: cm_green_hue_get
  label: Color Manager Green Hue Get
  kind: query
  command: "BE EF 03 06 00 B4 62 02 00 02 27 00 00"

- id: cm_green_saturation_set
  label: Color Manager Green Saturation Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 12 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_green_saturation_increment
  label: Color Manager Green Saturation Increment
  kind: action
  command: "BE EF 03 06 00 12 66 04 00 12 27 00 00"

- id: cm_green_saturation_decrement
  label: Color Manager Green Saturation Decrement
  kind: action
  command: "BE EF 03 06 00 C3 67 05 00 12 27 00 00"

- id: cm_green_saturation_get
  label: Color Manager Green Saturation Get
  kind: query
  command: "BE EF 03 06 00 74 66 02 00 12 27 00 00"

- id: cm_green_gain_set
  label: Color Manager Green Gain Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 22 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_green_gain_increment
  label: Color Manager Green Gain Increment
  kind: action
  command: "BE EF 03 06 00 12 69 04 00 22 27 00 00"

- id: cm_green_gain_decrement
  label: Color Manager Green Gain Decrement
  kind: action
  command: "BE EF 03 06 00 C3 68 05 00 22 27 00 00"

- id: cm_green_gain_get
  label: Color Manager Green Gain Get
  kind: query
  command: "BE EF 03 06 00 74 69 02 00 22 27 00 00"

- id: cm_blue_hue_set
  label: Color Manager Blue Hue Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 04 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_blue_hue_increment
  label: Color Manager Blue Hue Increment
  kind: action
  command: "BE EF 03 06 00 5A 62 04 00 04 27 00 00"

- id: cm_blue_hue_decrement
  label: Color Manager Blue Hue Decrement
  kind: action
  command: "BE EF 03 06 00 8B 63 05 00 04 27 00 00"

- id: cm_blue_hue_get
  label: Color Manager Blue Hue Get
  kind: query
  command: "BE EF 03 06 00 3C 62 02 00 04 27 00 00"

- id: cm_blue_saturation_set
  label: Color Manager Blue Saturation Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 14 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_blue_saturation_increment
  label: Color Manager Blue Saturation Increment
  kind: action
  command: "BE EF 03 06 00 9A 66 04 00 14 27 00 00"

- id: cm_blue_saturation_decrement
  label: Color Manager Blue Saturation Decrement
  kind: action
  command: "BE EF 03 06 00 4B 67 05 00 14 27 00 00"

- id: cm_blue_saturation_get
  label: Color Manager Blue Saturation Get
  kind: query
  command: "BE EF 03 06 00 FC 66 02 00 14 27 00 00"

- id: cm_blue_gain_set
  label: Color Manager Blue Gain Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 24 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_blue_gain_increment
  label: Color Manager Blue Gain Increment
  kind: action
  command: "BE EF 03 06 00 9A 69 04 00 24 27 00 00"

- id: cm_blue_gain_decrement
  label: Color Manager Blue Gain Decrement
  kind: action
  command: "BE EF 03 06 00 4B 68 05 00 24 27 00 00"

- id: cm_blue_gain_get
  label: Color Manager Blue Gain Get
  kind: query
  command: "BE EF 03 06 00 FC 69 02 00 24 27 00 00"

- id: cm_cyan_hue_set
  label: Color Manager Cyan Hue Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 03 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_cyan_hue_increment
  label: Color Manager Cyan Hue Increment
  kind: action
  command: "BE EF 03 06 00 2E 63 04 00 03 27 00 00"

- id: cm_cyan_hue_decrement
  label: Color Manager Cyan Hue Decrement
  kind: action
  command: "BE EF 03 06 00 FF 62 05 00 03 27 00 00"

- id: cm_cyan_hue_get
  label: Color Manager Cyan Hue Get
  kind: query
  command: "BE EF 03 06 00 48 63 02 00 03 27 00 00"

- id: cm_cyan_saturation_set
  label: Color Manager Cyan Saturation Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 13 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_cyan_saturation_increment
  label: Color Manager Cyan Saturation Increment
  kind: action
  command: "BE EF 03 06 00 EE 67 04 00 13 27 00 00"

- id: cm_cyan_saturation_decrement
  label: Color Manager Cyan Saturation Decrement
  kind: action
  command: "BE EF 03 06 00 3F 66 05 00 13 27 00 00"

- id: cm_cyan_saturation_get
  label: Color Manager Cyan Saturation Get
  kind: query
  command: "BE EF 03 06 00 88 67 02 00 13 27 00 00"

- id: cm_cyan_gain_set
  label: Color Manager Cyan Gain Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 23 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_cyan_gain_increment
  label: Color Manager Cyan Gain Increment
  kind: action
  command: "BE EF 03 06 00 EE 68 04 00 23 27 00 00"

- id: cm_cyan_gain_decrement
  label: Color Manager Cyan Gain Decrement
  kind: action
  command: "BE EF 03 06 00 3F 69 05 00 23 27 00 00"

- id: cm_cyan_gain_get
  label: Color Manager Cyan Gain Get
  kind: query
  command: "BE EF 03 06 00 88 68 02 00 23 27 00 00"

- id: cm_magenta_hue_set
  label: Color Manager Magenta Hue Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 05 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_magenta_hue_increment
  label: Color Manager Magenta Hue Increment
  kind: action
  command: "BE EF 03 06 00 A6 63 04 00 05 27 00 00"

- id: cm_magenta_hue_decrement
  label: Color Manager Magenta Hue Decrement
  kind: action
  command: "BE EF 03 06 00 77 62 05 00 05 27 00 00"

- id: cm_magenta_hue_get
  label: Color Manager Magenta Hue Get
  kind: query
  command: "BE EF 03 06 00 C0 63 02 00 05 27 00 00"

- id: cm_magenta_saturation_set
  label: Color Manager Magenta Saturation Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 15 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_magenta_saturation_increment
  label: Color Manager Magenta Saturation Increment
  kind: action
  command: "BE EF 03 06 00 66 67 04 00 15 27 00 00"

- id: cm_magenta_saturation_decrement
  label: Color Manager Magenta Saturation Decrement
  kind: action
  command: "BE EF 03 06 00 B7 66 05 00 15 27 00 00"

- id: cm_magenta_saturation_get
  label: Color Manager Magenta Saturation Get
  kind: query
  command: "BE EF 03 06 00 00 67 02 00 15 27 00 00"

- id: cm_magenta_gain_set
  label: Color Manager Magenta Gain Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 25 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_magenta_gain_increment
  label: Color Manager Magenta Gain Increment
  kind: action
  command: "BE EF 03 06 00 66 68 04 00 25 27 00 00"

- id: cm_magenta_gain_decrement
  label: Color Manager Magenta Gain Decrement
  kind: action
  command: "BE EF 03 06 00 B7 69 05 00 25 27 00 00"

- id: cm_magenta_gain_get
  label: Color Manager Magenta Gain Get
  kind: query
  command: "BE EF 03 06 00 00 68 02 00 25 27 00 00"

- id: cm_yellow_hue_set
  label: Color Manager Yellow Hue Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 01 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_yellow_hue_increment
  label: Color Manager Yellow Hue Increment
  kind: action
  command: "BE EF 03 06 00 96 62 04 00 01 27 00 00"

- id: cm_yellow_hue_decrement
  label: Color Manager Yellow Hue Decrement
  kind: action
  command: "BE EF 03 06 00 47 63 05 00 01 27 00 00"

- id: cm_yellow_hue_get
  label: Color Manager Yellow Hue Get
  kind: query
  command: "BE EF 03 06 00 F0 62 02 00 01 27 00 00"

- id: cm_yellow_saturation_set
  label: Color Manager Yellow Saturation Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 11 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_yellow_saturation_increment
  label: Color Manager Yellow Saturation Increment
  kind: action
  command: "BE EF 03 06 00 56 66 04 00 11 27 00 00"

- id: cm_yellow_saturation_decrement
  label: Color Manager Yellow Saturation Decrement
  kind: action
  command: "BE EF 03 06 00 87 67 05 00 11 27 00 00"

- id: cm_yellow_saturation_get
  label: Color Manager Yellow Saturation Get
  kind: query
  command: "BE EF 03 06 00 30 66 02 00 11 27 00 00"

- id: cm_yellow_gain_set
  label: Color Manager Yellow Gain Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 21 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_yellow_gain_increment
  label: Color Manager Yellow Gain Increment
  kind: action
  command: "BE EF 03 06 00 56 69 04 00 21 27 00 00"

- id: cm_yellow_gain_decrement
  label: Color Manager Yellow Gain Decrement
  kind: action
  command: "BE EF 03 06 00 87 68 05 00 21 27 00 00"

- id: cm_yellow_gain_get
  label: Color Manager Yellow Gain Get
  kind: query
  command: "BE EF 03 06 00 30 69 02 00 21 27 00 00"

- id: cm_white_red_set
  label: Color Manager White Red Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 28 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_white_red_increment
  label: Color Manager White Red Increment
  kind: action
  command: "BE EF 03 06 00 CA 6A 04 00 28 27 00 00"

- id: cm_white_red_decrement
  label: Color Manager White Red Decrement
  kind: action
  command: "BE EF 03 06 00 1B 6B 05 00 28 27 00 00"

- id: cm_white_red_get
  label: Color Manager White Red Get
  kind: query
  command: "BE EF 03 06 00 AC 6A 02 00 28 27 00 00"

- id: cm_white_green_set
  label: Color Manager White Green Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 2A 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_white_green_increment
  label: Color Manager White Green Increment
  kind: action
  command: "BE EF 03 06 00 72 6B 04 00 2A 27 00 00"

- id: cm_white_green_decrement
  label: Color Manager White Green Decrement
  kind: action
  command: "BE EF 03 06 00 A3 6A 05 00 2A 27 00 00"

- id: cm_white_green_get
  label: Color Manager White Green Get
  kind: query
  command: "BE EF 03 06 00 14 6B 02 00 2A 27 00 00"

- id: cm_white_blue_set
  label: Color Manager White Blue Set (0-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 2C 27 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-100

- id: cm_white_blue_increment
  label: Color Manager White Blue Increment
  kind: action
  command: "BE EF 03 06 00 FA 6B 04 00 2C 27 00 00"

- id: cm_white_blue_decrement
  label: Color Manager White Blue Decrement
  kind: action
  command: "BE EF 03 06 00 2B 6A 05 00 2C 27 00 00"

- id: cm_white_blue_get
  label: Color Manager White Blue Get
  kind: query
  command: "BE EF 03 06 00 9C 6B 02 00 2C 27 00 00"

# --- Settings 1: Source ---
- id: source_hdmi1
  label: Source HDMI 1
  kind: action
  command: "BE EF 03 06 00 0E D2 01 00 00 20 03 00"

- id: source_hdmi2_mhl
  label: Source HDMI 2 / MHL
  kind: action
  command: "BE EF 03 06 00 6E D6 01 00 00 20 0D 00"

- id: source_dvi
  label: Source DVI-D
  kind: action
  command: "BE EF 03 06 00 AE D4 01 00 00 20 09 00"

- id: source_vga
  label: Source VGA (Computer In 1)
  kind: action
  command: "BE EF 03 06 00 FE D2 01 00 00 20 00 00"

- id: source_bnc
  label: Source BNC (Computer In 2)
  kind: action
  command: "BE EF 03 06 00 3E D0 01 00 00 20 04 00"

- id: source_composite
  label: Source Composite Video
  kind: action
  command: "BE EF 03 06 00 6E D3 01 00 00 20 01 00"

- id: source_hdbaset
  label: Source HDBaseT
  kind: action
  command: "BE EF 03 06 00 AE DE 01 00 00 20 11 00"

- id: source_get
  label: Active Source Get
  kind: query
  command: "BE EF 03 06 00 CD D2 02 00 00 20 00 00"

# --- Projection (orientation) ---
- id: projection_front
  label: Projection Front Tabletop
  kind: action
  command: "BE EF 03 06 00 C7 D2 01 00 01 30 00 00"

- id: projection_rear
  label: Projection Rear Tabletop
  kind: action
  command: "BE EF 03 06 00 57 D3 01 00 01 30 01 00"

- id: projection_front_ceiling
  label: Projection Front Ceiling
  kind: action
  command: "BE EF 03 06 00 37 D2 01 00 01 30 03 00"

- id: projection_rear_ceiling
  label: Projection Rear Ceiling
  kind: action
  command: "BE EF 03 06 00 A7 D3 01 00 01 30 02 00"

- id: projection_get
  label: Projection Get
  kind: query
  command: "BE EF 03 06 00 F4 D2 02 00 01 30 00 00"

# --- Aspect Ratio ---
- id: aspect_fill
  label: Aspect Ratio Fill (16:10)
  kind: action
  command: "BE EF 03 06 00 3E D6 01 00 08 20 0A 00"

- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "BE EF 03 06 00 9E D0 01 00 08 20 00 00"

- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "BE EF 03 06 00 0E D1 01 00 08 20 01 00"

- id: aspect_letterbox
  label: Aspect Ratio Letter Box (Movie-1)
  kind: action
  command: "BE EF 03 06 00 3E D3 01 00 08 20 06 00"

- id: aspect_native
  label: Aspect Ratio Native
  kind: action
  command: "BE EF 03 06 00 5E D7 01 00 08 20 08 00"

- id: aspect_2_35_1
  label: Aspect Ratio 2.35:1
  kind: action
  command: "BE EF 03 06 00 0E D4 01 00 08 20 0D 00"

- id: aspect_get
  label: Aspect Ratio Get
  kind: query
  command: "BE EF 03 06 00 AD D0 02 00 08 20 00 00"

# --- Keystone H ---
- id: keystone_h_set
  label: Keystone H Set
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 0B 20 {val_l} {val_h}"  # 00 00..64 00
  params:
    - name: value
      type: integer
      description: H keystone -25..+25..-50..+50 (encoded 00 00..64 00)

- id: keystone_h_increment
  label: Keystone H Increment
  kind: action
  command: "BE EF 03 06 00 8F D0 04 00 0B 20 00 00"

- id: keystone_h_decrement
  label: Keystone H Decrement
  kind: action
  command: "BE EF 03 06 00 5E D1 05 00 0B 20 00 00"

- id: keystone_h_get
  label: Keystone H Get
  kind: query
  command: "BE EF 03 06 00 E9 D0 02 00 0B 20 00 00"

# --- Keystone V ---
- id: keystone_v_set
  label: Keystone V Set
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 07 20 {val_l} {val_h}"  # 00 00..78 00
  params:
    - name: value
      type: integer
      description: V keystone -30..+30..-60..+60 (encoded 00 00..78 00)

- id: keystone_v_increment
  label: Keystone V Increment
  kind: action
  command: "BE EF 03 06 00 DF D3 04 00 07 20 00 00"

- id: keystone_v_decrement
  label: Keystone V Decrement
  kind: action
  command: "BE EF 03 06 00 0E D2 05 00 07 20 00 00"

- id: keystone_v_get
  label: Keystone V Get
  kind: query
  command: "BE EF 03 06 00 B9 D3 02 00 07 20 00 00"

# --- Digital Zoom ---
- id: digital_zoom_set
  label: Digital Zoom Set (-10..10)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 94 22 {val_l} {val_h}"  # 5A 00..6E 00
  params:
    - name: value
      type: integer
      description: -10..10

- id: digital_zoom_increment
  label: Digital Zoom Increment
  kind: action
  command: "BE EF 03 06 00 5B 5F 04 00 94 22 00 00"

- id: digital_zoom_decrement
  label: Digital Zoom Decrement
  kind: action
  command: "BE EF 03 06 00 8A 5E 05 00 94 22 00 00"

- id: digital_zoom_get
  label: Digital Zoom Get
  kind: query
  command: "BE EF 03 06 00 3D 5F 02 00 94 22 00 00"

# --- Audio Volume ---
- id: volume_set
  label: Volume Set (0-20)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 02 00 01 20 {val_l} {val_h}"  # 00 00..14 00
  params:
    - name: value
      type: integer
      description: 0-20

- id: volume_increment
  label: Volume Increment
  kind: action
  command: "BE EF 03 06 00 57 D3 04 00 01 20 00 00"

- id: volume_decrement
  label: Volume Decrement
  kind: action
  command: "BE EF 03 06 00 86 D2 05 00 01 20 00 00"

- id: volume_get
  label: Volume Get
  kind: query
  command: "BE EF 03 06 00 31 D3 02 00 01 20 00 00"

# --- Audio Mute ---
- id: mute_off
  label: Audio Mute Off
  kind: action
  command: "BE EF 03 06 00 46 D3 01 00 02 20 00 00"

- id: mute_on
  label: Audio Mute On
  kind: action
  command: "BE EF 03 06 00 D6 D2 01 00 02 20 01 00"

- id: mute_get
  label: Audio Mute Get
  kind: query
  command: "BE EF 03 06 00 75 D3 02 00 02 20 00 00"

# --- Internal Speaker ---
- id: internal_speaker_off
  label: Internal Speaker Off
  kind: action
  command: "BE EF 03 06 00 6E D5 01 00 1C 20 00 00"

- id: internal_speaker_on
  label: Internal Speaker On
  kind: action
  command: "BE EF 03 06 00 FE D4 01 00 1C 20 01 00"

- id: internal_speaker_get
  label: Internal Speaker Get
  kind: query
  command: "BE EF 03 06 00 5D D5 02 00 1C 20 00 00"

# --- Language (Advanced 1) ---
- id: language_english
  label: Language English
  kind: action
  command: "BE EF 03 06 00 F7 D3 01 00 05 30 00 00"

- id: language_french
  label: Language French
  kind: action
  command: "BE EF 03 06 00 67 D2 01 00 05 30 01 00"

- id: language_german
  label: Language German
  kind: action
  command: "BE EF 03 06 00 97 D2 01 00 05 30 02 00"

- id: language_spanish
  label: Language Spanish
  kind: action
  command: "BE EF 03 06 00 07 D3 01 00 05 30 03 00"

- id: language_portuguese
  label: Language Portuguese
  kind: action
  command: "BE EF 03 06 00 C7 D1 01 00 05 30 07 00"

- id: language_chinese_simplified
  label: Language Chinese Simplified
  kind: action
  command: "BE EF 03 06 00 A7 D5 01 00 05 30 09 00"

- id: language_chinese_traditional
  label: Language Chinese Traditional
  kind: action
  command: "BE EF 03 06 00 37 DE 01 00 05 30 10 00"

- id: language_italian
  label: Language Italian
  kind: action
  command: "BE EF 03 06 00 37 D1 01 00 05 30 04 00"

- id: language_norwegian
  label: Language Norwegian
  kind: action
  command: "BE EF 03 06 00 A7 D0 01 00 05 30 05 00"

- id: language_swedish
  label: Language Swedish
  kind: action
  command: "BE EF 03 06 00 C7 D4 01 00 05 30 0B 00"

- id: language_dutch
  label: Language Dutch
  kind: action
  command: "BE EF 03 06 00 57 D0 01 00 05 30 06 00"

- id: language_russian
  label: Language Russian
  kind: action
  command: "BE EF 03 06 00 F7 D6 01 00 05 30 0C 00"

- id: language_polish
  label: Language Polish
  kind: action
  command: "BE EF 03 06 00 97 D7 01 00 05 30 0E 00"

- id: language_finnish
  label: Language Finnish
  kind: action
  command: "BE EF 03 06 00 67 D7 01 00 05 30 0D 00"

- id: language_greek
  label: Language Greek
  kind: action
  command: "BE EF 03 06 00 07 DC 01 00 05 30 17 00"

- id: language_korean
  label: Language Korean
  kind: action
  command: "BE EF 03 06 00 57 D5 01 00 05 30 0A 00"

- id: language_hungarian
  label: Language Hungarian
  kind: action
  command: "BE EF 03 06 00 C7 DE 01 00 05 30 13 00"

- id: language_czech
  label: Language Czech
  kind: action
  command: "BE EF 03 06 00 57 DF 01 00 05 30 12 00"

- id: language_arabic
  label: Language Arabic
  kind: action
  command: "BE EF 03 06 00 37 DB 01 00 05 30 1C 00"

- id: language_turkish
  label: Language Turkish
  kind: action
  command: "BE EF 03 06 00 07 D6 01 00 05 30 0F 00"

- id: language_vietnamese
  label: Language Vietnamese
  kind: action
  command: "BE EF 03 06 00 37 CA 01 00 05 30 20 00"

- id: language_japanese
  label: Language Japanese
  kind: action
  command: "BE EF 03 06 00 37 D4 01 00 05 30 08 00"

- id: language_thai
  label: Language Thai
  kind: action
  command: "BE EF 03 06 00 07 D9 01 00 05 30 1B 00"

- id: language_farsi
  label: Language Farsi
  kind: action
  command: "BE EF 03 06 00 A7 DA 01 00 05 30 1D 00"

- id: language_hebrew
  label: Language Hebrew
  kind: action
  command: "BE EF 03 06 00 A7 CB 01 00 05 30 21 00"

- id: language_danish
  label: Language Danish
  kind: action
  command: "BE EF 03 06 00 A7 DF 01 00 05 30 11 00"

- id: language_french_canadian
  label: Language French Canadian
  kind: action
  command: "BE EF 03 06 00 57 CB 01 00 05 30 22 00"

- id: language_get
  label: Language Get
  kind: query
  command: "BE EF 03 06 00 C4 D3 02 00 05 30 00 00"

# --- Security Lock ---
- id: security_lock_off
  label: Security Lock Off
  kind: action
  command: "BE EF 03 06 00 FA 37 01 00 10 36 00 00"

- id: security_lock_on
  label: Security Lock On
  kind: action
  command: "BE EF 03 06 00 6A 36 01 00 10 36 01 00"

- id: security_lock_get
  label: Security Lock Get
  kind: query
  command: "BE EF 03 06 00 C9 37 02 00 10 36 00 00"

# --- Blank Screen ---
- id: blank_black
  label: Blank Screen Black
  kind: action
  command: "BE EF 03 06 00 9B D0 01 00 00 30 06 00"

- id: blank_red
  label: Blank Screen Red
  kind: action
  command: "BE EF 03 06 00 3B D3 01 00 00 30 00 00"

- id: blank_green
  label: Blank Screen Green
  kind: action
  command: "BE EF 03 06 00 5B D2 01 00 00 30 02 00"

- id: blank_blue
  label: Blank Screen Blue
  kind: action
  command: "BE EF 03 06 00 CB D3 01 00 00 30 03 00"

- id: blank_white
  label: Blank Screen White
  kind: action
  command: "BE EF 03 06 00 6B D0 01 00 00 30 05 00"

- id: blank_get
  label: Blank Screen Get
  kind: query
  command: "BE EF 03 06 00 08 D3 02 00 00 30 00 00"

# --- Splash Logo ---
- id: splash_std
  label: Splash Logo Std (Logo)
  kind: action
  command: "BE EF 03 06 00 CB E3 01 00 04 30 40 00"

- id: splash_black
  label: Splash Logo Black
  kind: action
  command: "BE EF 03 06 00 AB D1 01 00 04 30 06 00"

- id: splash_blue
  label: Splash Logo Blue
  kind: action
  command: "BE EF 03 06 00 FB D2 01 00 04 30 03 00"

- id: splash_get
  label: Splash Logo Get
  kind: query
  command: "BE EF 03 06 00 38 D2 02 00 04 30 00 00"

# --- Closed Captioning ---
- id: closed_caption_off
  label: Closed Captioning Off
  kind: action
  command: "BE EF 03 06 00 FA 62 01 00 00 37 00 00"

- id: closed_caption_on
  label: Closed Captioning On
  kind: action
  command: "BE EF 03 06 00 6A 63 01 00 00 37 01 00"

- id: closed_caption_get
  label: Closed Captioning Get
  kind: query
  command: "BE EF 03 06 00 C9 62 02 00 00 37 00 00"

# --- Keypad Lock ---
- id: keypad_lock_off
  label: Keypad Lock Off
  kind: action
  command: "BE EF 03 06 00 03 96 01 00 11 24 00 00"

- id: keypad_lock_on
  label: Keypad Lock On
  kind: action
  command: "BE EF 03 06 00 93 97 01 00 11 24 01 00"

- id: keypad_lock_get
  label: Keypad Lock Get
  kind: query
  command: "BE EF 03 06 00 30 96 02 00 11 24 00 00"

# --- 3D ---
- id: threed_off
  label: 3D Off
  kind: action
  command: "BE EF 03 06 00 52 58 01 00 8D 22 00 00"

- id: threed_dlp_link
  label: 3D DLP-Link
  kind: action
  command: "BE EF 03 06 00 C2 59 01 00 8D 22 01 00"

- id: threed_ir
  label: 3D IR
  kind: action
  command: "BE EF 03 06 00 32 59 01 00 8D 22 02 00"

- id: threed_get
  label: 3D Get
  kind: query
  command: "BE EF 03 06 00 61 58 02 00 8D 22 00 00"

- id: threed_sync_invert_off
  label: 3D Sync Invert Off
  kind: action
  command: "BE EF 03 06 00 CE 5B 01 00 84 22 00 00"

- id: threed_sync_invert_on
  label: 3D Sync Invert On
  kind: action
  command: "BE EF 03 06 00 5E 5A 01 00 84 22 01 00"

- id: threed_sync_invert_get
  label: 3D Sync Invert Get
  kind: query
  command: "BE EF 03 06 00 FD 5B 02 00 84 22 00 00"

- id: threed_format_frame_sequential
  label: 3D Format Frame Sequential
  kind: action
  command: "BE EF 03 06 00 8A 5B 01 00 8B 22 05 00"

- id: threed_format_top_bottom
  label: 3D Format Top and Bottom
  kind: action
  command: "BE EF 03 06 00 2A 58 01 00 8B 22 03 00"

- id: threed_format_side_by_side
  label: 3D Format Side by Side
  kind: action
  command: "BE EF 03 06 00 BA 59 01 00 8B 22 02 00"

- id: threed_format_frame_packing
  label: 3D Format Frame Packing (HDMI only)
  kind: action
  command: "BE EF 03 06 00 1A 5A 01 00 8B 22 04 00"

- id: threed_format_get
  label: 3D Format Get
  kind: query
  command: "BE EF 03 06 00 E9 58 02 00 8B 22 00 00"

- id: threed_sync_delay_set
  label: 3D Sync Out Delay Set (0-359)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 85 22 {val_l} {val_h}"  # 00 00..67 01
  params:
    - name: value
      type: integer
      description: 0-359

- id: threed_sync_delay_increment
  label: 3D Sync Out Delay Increment
  kind: action
  command: "BE EF 03 06 00 67 5A 04 00 85 22 00 00"

- id: threed_sync_delay_decrement
  label: 3D Sync Out Delay Decrement
  kind: action
  command: "BE EF 03 06 00 B6 5B 05 00 85 22 00 00"

- id: threed_sync_delay_get
  label: 3D Sync Out Delay Get
  kind: query
  command: "BE EF 03 06 00 01 5A 02 00 85 22 00 00"

- id: threed_sync_input_internal
  label: 3D Sync Input Internal
  kind: action
  command: "BE EF 03 06 00 76 5A 01 00 86 22 00 00"

- id: threed_sync_input_external
  label: 3D Sync Input External
  kind: action
  command: "BE EF 03 06 00 E6 5B 01 00 86 22 01 00"

- id: threed_sync_input_get
  label: 3D Sync Input Get
  kind: query
  command: "BE EF 03 06 00 45 5A 02 00 86 22 00 00"

# --- Test Pattern (Advanced 2) ---
- id: test_pattern_off
  label: Test Pattern Off
  kind: action
  command: "BE EF 03 06 00 FB FA 01 00 80 30 00 00"

- id: test_pattern_rgb_ramp
  label: Test Pattern RGB Ramp
  kind: action
  command: "BE EF 03 06 00 5B E2 01 00 80 30 22 00"

- id: test_pattern_color_bar
  label: Test Pattern Color Bar
  kind: action
  command: "BE EF 03 06 00 AB F6 01 00 80 30 11 00"

- id: test_pattern_step_bar
  label: Test Pattern Step Bar
  kind: action
  command: "BE EF 03 06 00 CB F2 01 00 80 30 1F 00"

- id: test_pattern_checkerboard
  label: Test Pattern Checkerboard
  kind: action
  command: "BE EF 03 06 00 AB F3 01 00 80 30 1D 00"

- id: test_pattern_hatch
  label: Test Pattern Hatch (Grid)
  kind: action
  command: "BE EF 03 06 00 5B F6 01 00 80 30 12 00"

- id: test_pattern_horizontal_lines
  label: Test Pattern Horizontal Lines
  kind: action
  command: "BE EF 03 06 00 CB E3 01 00 80 30 23 00"

- id: test_pattern_vertical_lines
  label: Test Pattern Vertical Lines
  kind: action
  command: "BE EF 03 06 00 FB E1 01 00 80 30 24 00"

- id: test_pattern_diagonal_lines
  label: Test Pattern Diagonal Lines
  kind: action
  command: "BE EF 03 06 00 3B E3 01 00 80 30 20 00"

- id: test_pattern_horizontal_ramp
  label: Test Pattern Horizontal Ramp
  kind: action
  command: "BE EF 03 06 00 0B FA 01 00 80 30 03 00"

- id: test_pattern_vertical_ramp
  label: Test Pattern Vertical Ramp
  kind: action
  command: "BE EF 03 06 00 AB E2 01 00 80 30 21 00"

- id: test_pattern_white
  label: Test Pattern White
  kind: action
  command: "BE EF 03 06 00 0B F5 01 00 80 30 17 00"

- id: test_pattern_red
  label: Test Pattern Red
  kind: action
  command: "BE EF 03 06 00 FB F5 01 00 80 30 14 00"

- id: test_pattern_green
  label: Test Pattern Green
  kind: action
  command: "BE EF 03 06 00 6B F4 01 00 80 30 15 00"

- id: test_pattern_blue
  label: Test Pattern Blue
  kind: action
  command: "BE EF 03 06 00 9B F4 01 00 80 30 16 00"

- id: test_pattern_black
  label: Test Pattern Black
  kind: action
  command: "BE EF 03 06 00 FB F0 01 00 80 30 18 00"

- id: test_pattern_get
  label: Test Pattern Get
  kind: query
  command: "BE EF 03 06 00 C8 FA 02 00 80 30 00 00"

# --- H / V Image Shift ---
- id: h_image_shift_set
  label: H Image Shift Set (-50..50)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 10 30 {val_l} {val_h}"  # 00 00..64 00
  params:
    - name: value
      type: integer
      description: -50..50

- id: h_image_shift_increment
  label: H Image Shift Increment
  kind: action
  command: "BE EF 03 06 00 AE D7 04 00 10 30 00 00"

- id: h_image_shift_decrement
  label: H Image Shift Decrement
  kind: action
  command: "BE EF 03 06 00 7F D6 05 00 10 30 00 00"

- id: h_image_shift_get
  label: H Image Shift Get
  kind: query
  command: "BE EF 03 06 00 C8 D7 02 00 10 30 00 00"

- id: v_image_shift_set
  label: V Image Shift Set (-50..50)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 11 30 {val_l} {val_h}"  # 00 00..64 00
  params:
    - name: value
      type: integer
      description: -50..50

- id: v_image_shift_increment
  label: V Image Shift Increment
  kind: action
  command: "BE EF 03 06 00 52 D6 04 00 11 30 00 00"

- id: v_image_shift_decrement
  label: V Image Shift Decrement
  kind: action
  command: "BE EF 03 06 00 83 D7 05 00 11 30 00 00"

- id: v_image_shift_get
  label: V Image Shift Get
  kind: query
  command: "BE EF 03 06 00 34 D6 02 00 11 30 00 00"

# --- 4 Corner Geometry (TopLeft x/y, TopRight x/y, BottomLeft x/y, BottomRight x/y) ---
- id: corner_tl_x_set
  label: 4 Corner Top-Left X Set (0-60)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 21 21 {val_l} {val_h}"  # 00 00..3C 00
  params:
    - name: value
      type: integer
      description: 0-60

- id: corner_tl_x_increment
  label: 4 Corner Top-Left X Increment
  kind: action
  command: "BE EF 03 06 00 57 89 04 00 21 21 00 00"

- id: corner_tl_x_decrement
  label: 4 Corner Top-Left X Decrement
  kind: action
  command: "BE EF 03 06 00 86 88 05 00 21 21 00 00"

- id: corner_tl_x_get
  label: 4 Corner Top-Left X Get
  kind: query
  command: "BE EF 03 06 00 31 89 02 00 21 21 00 00"

- id: corner_tl_y_set
  label: 4 Corner Top-Left Y Set (0-60)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 22 21 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-60

- id: corner_tl_y_increment
  label: 4 Corner Top-Left Y Increment
  kind: action
  command: "BE EF 03 06 00 13 89 04 00 22 21 00 00"

- id: corner_tl_y_decrement
  label: 4 Corner Top-Left Y Decrement
  kind: action
  command: "BE EF 03 06 00 C2 88 05 00 22 21 00 00"

- id: corner_tl_y_get
  label: 4 Corner Top-Left Y Get
  kind: query
  command: "BE EF 03 06 00 75 89 02 00 22 21 00 00"

- id: corner_tr_x_set
  label: 4 Corner Top-Right X Set (0-60)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 23 21 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-60

- id: corner_tr_x_increment
  label: 4 Corner Top-Right X Increment
  kind: action
  command: "BE EF 03 06 00 EF 88 04 00 23 21 00 00"

- id: corner_tr_x_decrement
  label: 4 Corner Top-Right X Decrement
  kind: action
  command: "BE EF 03 06 00 3E 89 05 00 23 21 00 00"

- id: corner_tr_x_get
  label: 4 Corner Top-Right X Get
  kind: query
  command: "BE EF 03 06 00 89 88 02 00 23 21 00 00"

- id: corner_tr_y_set
  label: 4 Corner Top-Right Y Set (0-60)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 24 21 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-60

- id: corner_tr_y_increment
  label: 4 Corner Top-Right Y Increment
  kind: action
  command: "BE EF 03 06 00 9B 89 04 00 24 21 00 00"

- id: corner_tr_y_decrement
  label: 4 Corner Top-Right Y Decrement
  kind: action
  command: "BE EF 03 06 00 4A 88 05 00 24 21 00 00"

- id: corner_tr_y_get
  label: 4 Corner Top-Right Y Get
  kind: query
  command: "BE EF 03 06 00 FD 89 02 00 24 21 00 00"

- id: corner_bl_x_set
  label: 4 Corner Bottom-Left X Set (0-60)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 25 21 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-60

- id: corner_bl_x_increment
  label: 4 Corner Bottom-Left X Increment
  kind: action
  command: "BE EF 03 06 00 67 88 04 00 25 21 00 00"

- id: corner_bl_x_decrement
  label: 4 Corner Bottom-Left X Decrement
  kind: action
  command: "BE EF 03 06 00 B6 89 05 00 25 21 00 00"

- id: corner_bl_x_get
  label: 4 Corner Bottom-Left X Get
  kind: query
  command: "BE EF 03 06 00 01 88 02 00 25 21 00 00"

- id: corner_bl_y_set
  label: 4 Corner Bottom-Left Y Set (0-60)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 26 21 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-60

- id: corner_bl_y_increment
  label: 4 Corner Bottom-Left Y Increment
  kind: action
  command: "BE EF 03 06 00 23 88 04 00 26 21 00 00"

- id: corner_bl_y_decrement
  label: 4 Corner Bottom-Left Y Decrement
  kind: action
  command: "BE EF 03 06 00 F2 89 05 00 26 21 00 00"

- id: corner_bl_y_get
  label: 4 Corner Bottom-Left Y Get
  kind: query
  command: "BE EF 03 06 00 45 88 02 00 26 21 00 00"

- id: corner_br_x_set
  label: 4 Corner Bottom-Right X Set (0-60)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 27 21 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-60

- id: corner_br_x_increment
  label: 4 Corner Bottom-Right X Increment
  kind: action
  command: "BE EF 03 06 00 DF 89 04 00 27 21 00 00"

- id: corner_br_x_decrement
  label: 4 Corner Bottom-Right X Decrement
  kind: action
  command: "BE EF 03 06 00 0E 88 05 00 27 21 00 00"

- id: corner_br_x_get
  label: 4 Corner Bottom-Right X Get
  kind: query
  command: "BE EF 03 06 00 B9 89 02 00 27 21 00 00"

- id: corner_br_y_set
  label: 4 Corner Bottom-Right Y Set (0-60)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 28 21 {val_l} {val_h}"
  params:
    - name: value
      type: integer
      description: 0-60

- id: corner_br_y_increment
  label: 4 Corner Bottom-Right Y Increment
  kind: action
  command: "BE EF 03 06 00 CB 8A 04 00 28 21 00 00"

- id: corner_br_y_decrement
  label: 4 Corner Bottom-Right Y Decrement
  kind: action
  command: "BE EF 03 06 00 1A 8B 05 00 28 21 00 00"

- id: corner_br_y_get
  label: 4 Corner Bottom-Right Y Get
  kind: query
  command: "BE EF 03 06 00 AD 8A 02 00 28 21 00 00"

- id: corner_reset_execute
  label: 4 Corner Reset Execute
  kind: action
  command: "BE EF 03 06 00 F1 99 06 00 72 21 00 00"

# --- Settings 2 ---
- id: auto_source_off
  label: Auto Source Off
  kind: action
  command: "BE EF 03 06 00 B6 D6 01 00 16 20 00 00"

- id: auto_source_on
  label: Auto Source On
  kind: action
  command: "BE EF 03 06 00 26 D7 01 00 16 20 01 00"

- id: auto_source_get
  label: Auto Source Get
  kind: query
  command: "BE EF 03 06 00 85 D6 02 00 16 20 00 00"

- id: no_signal_power_off_set
  label: No Signal Power Off Set (0-180 min)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 10 31 {val_l} {val_h}"  # 00 00..B4 00
  params:
    - name: value
      type: integer
      description: 0-180 (minutes)

- id: no_signal_power_off_increment
  label: No Signal Power Off Increment
  kind: action
  command: "BE EF 03 06 00 6E 86 04 00 10 31 00 00"

- id: no_signal_power_off_decrement
  label: No Signal Power Off Decrement
  kind: action
  command: "BE EF 03 06 00 BF 87 05 00 10 31 00 00"

- id: no_signal_power_off_get
  label: No Signal Power Off Get
  kind: query
  command: "BE EF 03 06 00 08 86 02 00 10 31 00 00"

- id: auto_power_on_off
  label: Auto Power On Off
  kind: action
  command: "BE EF 03 06 00 3B 89 01 00 20 31 00 00"

- id: auto_power_on_on
  label: Auto Power On On
  kind: action
  command: "BE EF 03 06 00 AB 88 01 00 20 31 01 00"

- id: auto_power_on_get
  label: Auto Power On Get
  kind: query
  command: "BE EF 03 06 00 08 89 02 00 20 31 00 00"

- id: light_mode_normal
  label: Light Mode Normal
  kind: action
  command: "BE EF 03 06 00 3B 23 01 00 00 33 00 00"

- id: light_mode_eco
  label: Light Mode Eco-1
  kind: action
  command: "BE EF 03 06 00 AB 22 01 00 00 33 01 00"

- id: light_mode_eco_plus
  label: Light Mode Eco-2
  kind: action
  command: "BE EF 03 06 00 5B 22 01 00 00 33 02 00"

- id: light_mode_dimming
  label: Light Mode Dimming
  kind: action
  command: "BE EF 03 06 00 CB 23 01 00 00 33 03 00"

- id: light_mode_extreme_dimming
  label: Light Mode Extreme Dimming
  kind: action
  command: "BE EF 03 06 00 FB 21 01 00 00 33 04 00"

- id: light_mode_custom
  label: Light Mode Custom
  kind: action
  command: "BE EF 03 06 00 3B 37 01 00 00 33 30 00"

- id: light_mode_get
  label: Light Mode Get
  kind: query
  command: "BE EF 03 06 00 08 23 02 00 00 33 00 00"

- id: reset_all_execute
  label: Reset All Execute
  kind: action
  command: "BE EF 03 06 00 98 8D 06 00 30 71 00 00"

# --- Status / Information queries ---
- id: status_active_source
  label: Active Source Get
  kind: query
  command: "BE EF 03 06 00 CD D2 02 00 00 20 00 00"

- id: status_video_info_vert_res
  label: Video Information - Vertical Resolution Get
  kind: query
  command: "BE EF 03 06 00 7A 86 02 00 12 11 00 00"

- id: status_video_info_horiz_res
  label: Video Information - Horizontal Resolution Get
  kind: query
  command: "BE EF 03 06 00 7A 89 02 00 22 11 00 00"

- id: status_video_info_vert_freq
  label: Video Information - Vertical Frequency Get
  kind: query
  command: "BE EF 03 06 00 8A 83 02 00 06 11 00 00"

- id: status_light_hours_a
  label: Light Hours Get (A)
  kind: query
  command: "BE EF 03 06 00 2A FD 02 00 9E 10 00 00"

- id: status_light_hours_b
  label: Light Hours Get (B)
  kind: query
  command: "BE EF 03 06 00 C2 FF 02 00 90 10 00 00"

- id: status_software_version_a
  label: Software Version Get (A)
  kind: query
  command: "BE EF 03 06 00 52 D5 02 00 1C 10 00 00"

- id: status_software_version_b
  label: Software Version Get (B)
  kind: query
  command: "BE EF 03 06 00 AE D4 02 00 1D 10 00 00"

- id: status_remote_id
  label: Remote ID Get
  kind: query
  command: "BE EF 03 06 00 AC 30 02 00 08 26 00 00"

- id: status_serial_number_a
  label: Serial Number Get (A)
  kind: query
  command: "BE EF 03 06 00 C0 57 02 00 18 10 00 00"

- id: status_serial_number_b
  label: Serial Number Get (B)
  kind: query
  command: "BE EF 03 06 00 9E D5 02 00 19 10 00 00"

- id: status_air_filter_hour_a
  label: Air Filter Hour Get (A)
  kind: query
  command: "BE EF 03 06 00 D6 FC 02 00 9F 10 00 00"

- id: status_air_filter_hour_b
  label: Air Filter Hour Get (B)
  kind: query
  command: "BE EF 03 06 00 C2 F0 02 00 A0 10 00 00"

# --- Advanced 1 (Menu Position / Translucent / Low Power / Fan / Light Info / Projector ID / Remote ID / Network / HDBaseT-IR) ---
- id: menu_position_center
  label: Menu Position Center
  kind: action
  command: "BE EF 03 06 00 97 D7 01 00 1D 30 04 00"

- id: menu_position_down
  label: Menu Position Down
  kind: action
  command: "BE EF 03 06 00 97 D8 01 00 1D 30 10 00"

- id: menu_position_up
  label: Menu Position Up
  kind: action
  command: "BE EF 03 06 00 07 D9 01 00 1D 30 11 00"

- id: menu_position_left
  label: Menu Position Left
  kind: action
  command: "BE EF 03 06 00 F7 D9 01 00 1D 30 12 00"

- id: menu_position_right
  label: Menu Position Right
  kind: action
  command: "BE EF 03 06 00 67 D8 01 00 1D 30 13 00"

- id: menu_position_get
  label: Menu Position Get
  kind: query
  command: "BE EF 03 06 00 64 D5 02 00 1D 30 00 00"

- id: translucent_menu_0
  label: Translucent Menu 0%
  kind: action
  command: "BE EF 03 06 00 E6 5A 01 00 9A 22 00 00"

- id: translucent_menu_25
  label: Translucent Menu 25%
  kind: action
  command: "BE EF 03 06 00 76 56 01 00 9A 22 19 00"

- id: translucent_menu_50
  label: Translucent Menu 50%
  kind: action
  command: "BE EF 03 06 00 86 48 01 00 9A 22 32 00"

- id: translucent_menu_75
  label: Translucent Menu 75%
  kind: action
  command: "BE EF 03 06 00 16 6B 01 00 9A 22 4B 00"

- id: translucent_menu_100
  label: Translucent Menu 100%
  kind: action
  command: "BE EF 03 06 00 26 77 01 00 9A 22 64 00"

- id: translucent_menu_get
  label: Translucent Menu Get
  kind: query
  command: "BE EF 03 06 00 D5 5D 02 00 9A 22 00 00"

- id: low_power_mode_on
  label: Low Power Mode Saving (On)
  kind: action
  command: "BE EF 03 06 00 46 D3 01 00 01 60 01 00"

- id: low_power_mode_normal
  label: Low Power Mode Normal (On by LAN)
  kind: action
  command: "BE EF 03 06 00 D6 D2 01 00 01 60 00 00"

- id: low_power_mode_get
  label: Low Power Mode Get
  kind: query
  command: "BE EF 03 06 00 E5 D2 02 00 01 60 00 00"

- id: fan_speed_normal
  label: Fan Speed Normal
  kind: action
  command: "BE EF 03 06 00 E3 12 01 00 00 4C 00 00"

- id: fan_speed_high
  label: Fan Speed High
  kind: action
  command: "BE EF 03 06 00 73 13 01 00 00 4C 01 00"

- id: fan_speed_get
  label: Fan Speed Get
  kind: query
  command: "BE EF 03 06 00 D0 12 02 00 00 4C 00 00"

- id: light_info_normal_a
  label: Light Info Normal Get (A)
  kind: query
  command: "BE EF 03 06 00 31 54 02 00 B1 22 00 00"

- id: light_info_normal_b
  label: Light Info Normal Get (B)
  kind: query
  command: "BE EF 03 06 00 CD 55 02 00 B0 22 00 00"

- id: light_info_eco_a
  label: Light Info Eco Get (A)
  kind: query
  command: "BE EF 03 06 00 89 55 02 00 B3 22 00 00"

- id: light_info_eco_b
  label: Light Info Eco Get (B)
  kind: query
  command: "BE EF 03 06 00 75 54 02 00 B2 22 00 00"

- id: light_info_eco_plus_a
  label: Light Info Eco Plus Get (A)
  kind: query
  command: "BE EF 03 06 00 01 55 02 00 B5 22 00 00"

- id: light_info_eco_plus_b
  label: Light Info Eco Plus Get (B)
  kind: query
  command: "BE EF 03 06 00 FD 54 02 00 B4 22 00 00"

- id: light_info_dimming_a
  label: Light Info Dimming Get (A)
  kind: query
  command: "BE EF 03 06 00 B9 54 02 00 B7 22 00 00"

- id: light_info_dimming_b
  label: Light Info Dimming Get (B)
  kind: query
  command: "BE EF 03 06 00 45 55 02 00 B6 22 00 00"

- id: light_info_extreme_dimming_a
  label: Light Info Extreme Dimming Get (A)
  kind: query
  command: "BE EF 03 06 00 51 56 02 00 B9 22 00 00"

- id: light_info_extreme_dimming_b
  label: Light Info Extreme Dimming Get (B)
  kind: query
  command: "BE EF 03 06 00 AD 57 02 00 B8 22 00 00"

- id: light_info_custom_a
  label: Light Info Custom Get (A)
  kind: query
  command: "BE EF 03 06 00 E9 57 02 00 BB 22 00 00"

- id: light_info_custom_b
  label: Light Info Custom Get (B)
  kind: query
  command: "BE EF 03 06 00 15 56 02 00 BA 22 00 00"

- id: projector_id_set
  label: Projector ID Set (0-98)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 9B 22 {val_l} {val_h}"  # 00 00..62 00
  params:
    - name: value
      type: integer
      description: 0-98

- id: projector_id_increment
  label: Projector ID Increment
  kind: action
  command: "BE EF 03 06 00 4F 5C 04 00 9B 22 00 00"

- id: projector_id_decrement
  label: Projector ID Decrement
  kind: action
  command: "BE EF 03 06 00 9E 5D 05 00 9B 22 00 00"

- id: projector_id_get
  label: Projector ID Get
  kind: query
  command: "BE EF 03 06 00 29 5C 02 00 9B 22 00 00"

- id: remote_id_default
  label: Remote ID Default (All)
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

- id: remote_id_5
  label: Remote ID 5
  kind: action
  command: "BE EF 03 06 00 CF 33 01 00 08 26 05 00"

- id: remote_id_6
  label: Remote ID 6
  kind: action
  command: "BE EF 03 06 00 3F 33 01 00 08 26 06 00"

- id: remote_id_7
  label: Remote ID 7
  kind: action
  command: "BE EF 03 06 00 AF 32 01 00 08 26 07 00"

- id: remote_id_get
  label: Remote ID Get
  kind: query
  command: "BE EF 03 06 00 AC 30 02 00 08 26 00 00"

# --- Network state (Get only per source) ---
- id: network_state_connect
  label: Network State Connect Get
  kind: query
  command: "BE EF 03 06 00 B5 5F 02 00 92 22 00 00"

- id: dhcp_off
  label: DHCP Off Get
  kind: query
  command: "BE EF 03 06 00 0F 06 02 00 10 29 00 00"

- id: ip_address_octet1
  label: IP Address Octet 1 Get
  kind: query
  command: "BE EF 03 06 00 F3 07 02 00 11 29 00 00"

- id: ip_address_octet2
  label: IP Address Octet 2 Get
  kind: query
  command: "BE EF 03 06 00 B7 07 02 00 12 29 00 00"

- id: ip_address_octet3
  label: IP Address Octet 3 Get
  kind: query
  command: "BE EF 03 06 00 4B 06 02 00 13 29 00 00"

- id: ip_address_octet4
  label: IP Address Octet 4 Get
  kind: query
  command: "BE EF 03 06 00 3F 07 02 00 14 29 00 00"

- id: subnet_mask_octet1
  label: Subnet Mask Octet 1 Get
  kind: query
  command: "BE EF 03 06 00 C3 06 02 00 15 29 00 00"

- id: subnet_mask_octet2
  label: Subnet Mask Octet 2 Get
  kind: query
  command: "BE EF 03 06 00 87 06 02 00 16 29 00 00"

- id: subnet_mask_octet3
  label: Subnet Mask Octet 3 Get
  kind: query
  command: "BE EF 03 06 00 7B 07 02 00 17 29 00 00"

- id: subnet_mask_octet4
  label: Subnet Mask Octet 4 Get
  kind: query
  command: "BE EF 03 06 00 6F 04 02 00 18 29 00 00"

- id: gateway_octet1
  label: Gateway Octet 1 Get
  kind: query
  command: "BE EF 03 06 00 93 05 02 00 19 29 00 00"

- id: gateway_octet2
  label: Gateway Octet 2 Get
  kind: query
  command: "BE EF 03 06 00 D7 05 02 00 1A 29 00 00"

- id: gateway_octet3
  label: Gateway Octet 3 Get
  kind: query
  command: "BE EF 03 06 00 2B 04 02 00 1B 29 00 00"

- id: gateway_octet4
  label: Gateway Octet 4 Get
  kind: query
  command: "BE EF 03 06 00 5F 05 02 00 1C 29 00 00"

- id: dns_octet1
  label: DNS Octet 1 Get
  kind: query
  command: "BE EF 03 06 00 F3 08 02 00 21 29 00 00"

- id: dns_octet2
  label: DNS Octet 2 Get
  kind: query
  command: "BE EF 03 06 00 B7 08 02 00 22 29 00 00"

- id: dns_octet3
  label: DNS Octet 3 Get
  kind: query
  command: "BE EF 03 06 00 4B 09 02 00 23 29 00 00"

- id: dns_octet4
  label: DNS Octet 4 Get
  kind: query
  command: "BE EF 03 06 00 3F 08 02 00 24 29 00 00"

# --- HDBaseT / IR ---
- id: hdbaset_ir_off
  label: HDBaseT - IR/RS232 Off
  kind: action
  command: "BE EF 03 06 00 2A 5D 01 00 9F 22 00 00"

- id: hdbaset_ir_on
  label: HDBaseT - IR/RS232 On
  kind: action
  command: "BE EF 03 06 00 BA 5C 01 00 9F 22 01 00"

- id: hdbaset_ir_get
  label: HDBaseT - IR/RS232 Get
  kind: query
  command: "BE EF 03 06 00 19 5D 02 00 9F 22 00 00"

- id: front_ir_off
  label: Front IR Off
  kind: action
  command: "BE EF 03 06 00 FF 32 01 00 00 26 00 00"

- id: front_ir_on
  label: Front IR On
  kind: action
  command: "BE EF 03 06 00 6F 33 01 00 00 26 01 00"

- id: front_ir_get
  label: Front IR Get
  kind: query
  command: "BE EF 03 06 00 CC 32 02 00 00 26 00 00"

- id: rear_ir_off
  label: Rear IR Off
  kind: action
  command: "BE EF 03 06 00 03 33 01 00 01 26 00 00"

- id: rear_ir_on
  label: Rear IR On
  kind: action
  command: "BE EF 03 06 00 93 32 01 00 01 26 01 00"

- id: rear_ir_get
  label: Rear IR Get
  kind: query
  command: "BE EF 03 06 00 30 33 02 00 01 26 00 00"

# --- Advanced 2: Sleep Timer ---
- id: sleep_timer_set
  label: Sleep Timer Set (0-600, 5-min step)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 9E 22 {val_l} {val_h}"  # 00 00..58 02
  params:
    - name: value
      type: integer
      description: 0-600 minutes, 5-min step

- id: sleep_timer_increment
  label: Sleep Timer Increment
  kind: action
  command: "BE EF 03 06 00 83 5C 04 00 9E 22 00 00"

- id: sleep_timer_decrement
  label: Sleep Timer Decrement
  kind: action
  command: "BE EF 03 06 00 52 5D 05 00 9E 22 00 00"

- id: sleep_timer_get
  label: Sleep Timer Get
  kind: query
  command: "BE EF 03 06 00 E5 5C 02 00 9E 22 00 00"

# --- Source Filter (per source SKIP/NORMAL toggle) ---
- id: source_filter_hdmi1_skip
  label: Source Filter HDMI 1 Skip
  kind: action
  command: "BE EF 03 06 00 2A 79 01 00 23 22 01 00"

- id: source_filter_hdmi1_normal
  label: Source Filter HDMI 1 Normal
  kind: action
  command: "BE EF 03 06 00 BA 78 01 00 23 22 00 00"

- id: source_filter_hdmi1_get
  label: Source Filter HDMI 1 Get
  kind: query
  command: "BE EF 03 06 00 89 78 02 00 23 22 00 00"

- id: source_filter_hdmi2_skip
  label: Source Filter HDMI 2 / MHL Skip
  kind: action
  command: "BE EF 03 06 00 C2 7B 01 00 2D 22 01 00"

- id: source_filter_hdmi2_normal
  label: Source Filter HDMI 2 / MHL Normal
  kind: action
  command: "BE EF 03 06 00 52 7A 01 00 2D 22 00 00"

- id: source_filter_hdmi2_get
  label: Source Filter HDMI 2 / MHL Get
  kind: query
  command: "BE EF 03 06 00 61 7A 02 00 2D 22 00 00"

- id: source_filter_dvi_skip
  label: Source Filter DVI Skip
  kind: action
  command: "BE EF 03 06 00 F2 7A 01 00 29 22 01 00"

- id: source_filter_dvi_normal
  label: Source Filter DVI Normal
  kind: action
  command: "BE EF 03 06 00 62 7B 01 00 29 22 00 00"

- id: source_filter_dvi_get
  label: Source Filter DVI Get
  kind: query
  command: "BE EF 03 06 00 51 7B 02 00 29 22 00 00"

- id: source_filter_vga1_skip
  label: Source Filter VGA1 Skip
  kind: action
  command: "BE EF 03 06 00 6E 79 01 00 20 22 01 00"

- id: source_filter_vga1_normal
  label: Source Filter VGA1 Normal
  kind: action
  command: "BE EF 03 06 00 FE 78 01 00 20 22 00 00"

- id: source_filter_vga1_get
  label: Source Filter VGA1 Get
  kind: query
  command: "BE EF 03 06 00 CD 78 02 00 20 22 00 00"

- id: source_filter_bnc_skip
  label: Source Filter BNC Skip
  kind: action
  command: "BE EF 03 06 00 5E 78 01 00 24 22 01 00"

- id: source_filter_bnc_normal
  label: Source Filter BNC Normal
  kind: action
  command: "BE EF 03 06 00 CE 79 01 00 24 22 00 00"

- id: source_filter_bnc_get
  label: Source Filter BNC Get
  kind: query
  command: "BE EF 03 06 00 FD 79 02 00 24 22 00 00"

- id: source_filter_composite_skip
  label: Source Filter Composite Video Skip
  kind: action
  command: "BE EF 03 06 00 92 78 01 00 21 22 01 00"

- id: source_filter_composite_normal
  label: Source Filter Composite Video Normal
  kind: action
  command: "BE EF 03 06 00 02 79 01 00 21 22 00 00"

- id: source_filter_composite_get
  label: Source Filter Composite Video Get
  kind: query
  command: "BE EF 03 06 00 31 79 02 00 21 22 00 00"

- id: source_filter_hdbaset_skip
  label: Source Filter HDBaseT Skip
  kind: action
  command: "BE EF 03 06 00 26 EB 01 00 D6 20 01 00"

- id: source_filter_hdbaset_normal
  label: Source Filter HDBaseT Normal
  kind: action
  command: "BE EF 03 06 00 B6 EA 01 00 D6 20 00 00"

- id: source_filter_hdbaset_get
  label: Source Filter HDBaseT Get
  kind: query
  command: "BE EF 03 06 00 85 EA 02 00 D6 20 00 00"

- id: air_filter_timer_reset
  label: Air Filter Timer Reset Execute
  kind: action
  command: "BE EF 03 06 00 98 C6 06 00 40 70 00 00"

# --- Custom Light ---
- id: custom_light_set
  label: Custom Light Set (25-100)
  kind: action
  command: "BE EF 03 06 00 {crc_l} {crc_h} 01 00 07 33 {val_l} {val_h}"  # 19 00..64 00
  params:
    - name: value
      type: integer
      description: 25-100

- id: custom_light_increment
  label: Custom Light Increment
  kind: action
  command: "BE EF 03 06 00 1A 22 04 00 07 33 00 00"

- id: custom_light_decrement
  label: Custom Light Decrement
  kind: action
  command: "BE EF 03 06 00 CB 23 05 00 07 33 00 00"

- id: custom_light_get
  label: Custom Light Get
  kind: query
  command: "BE EF 03 06 00 7C 22 02 00 07 33 00 00"

# --- PJLink (Class 1 v1.00) commands ---
- id: pjlink_power_set
  label: PJLink Power Set
  kind: action
  command: "POWR {value}"  # 0 = Standby, 1 = Power On
  params:
    - name: value
      type: integer
      description: 0 = Standby, 1 = Power On

- id: pjlink_power_query
  label: PJLink Power Status Query
  kind: query
  command: "POWR ?"

- id: pjlink_input_set
  label: PJLink Input Source Set
  kind: action
  command: "INPT {value}"  # 11=COMP IN, 12=BNC, 23=Video, 31=HDMI1, 32=DVI-D, 33=HDMI2/MHL, 36=HDBaseT
  params:
    - name: value
      type: integer
      description: "11=COMPUTER IN, 12=BNC, 23=Video, 31=HDMI 1, 32=DVI-D, 33=HDMI 2/MHL, 36=HDBaseT"

- id: pjlink_input_query
  label: PJLink Input Source Query
  kind: query
  command: "INPT ?"

- id: pjlink_av_mute_set
  label: PJLink AV Mute Set
  kind: action
  command: "AVMT {value}"  # 30=Off, 31=On
  params:
    - name: value
      type: integer
      description: "30 = AV Mute off, 31 = AV Mute on"

- id: pjlink_av_mute_query
  label: PJLink AV Mute Query
  kind: query
  command: "AVMT ?"

- id: pjlink_error_status_query
  label: PJLink Error Status Query
  kind: query
  command: "ERST ?"

- id: pjlink_lamp_query
  label: PJLink Laser/Lamp Status Query
  kind: query
  command: "LAMP ?"

- id: pjlink_input_list_query
  label: PJLink Input Source List Query
  kind: query
  command: "INST ?"

- id: pjlink_name_query
  label: PJLink Projector Name Query
  kind: query
  command: "NAME ?"

- id: pjlink_manufacturer_query
  label: PJLink Manufacturer Name Query
  kind: query
  command: "INF1 ?"

- id: pjlink_model_query
  label: PJLink Model Name Query
  kind: query
  command: "INF2 ?"

- id: pjlink_class_query
  label: PJLink Class Information Query
  kind: query
  command: "CLSS ?"
```

## Feedbacks
```yaml
# RS-232/Telnet responses per source §"3. Response code / Error code"
- id: ack
  type: enum
  values: [06h]
  description: ACK reply - command accepted, setting changed.

- id: nak
  type: enum
  values: [15h]
  description: NAK reply - command not understood.

- id: error_reply
  type: enum
  values: ["1Ch 0000h"]
  description: Error reply - command cannot be executed; check sending code and projector state.

- id: data_reply
  type: enum
  values: ["1Dh xxxxh"]
  description: Data reply - GET response carrying 2 bytes of data.

- id: source_selection
  type: enum
  values: [03h, 0Dh, 09h, 00h, 04h, 01h, 11h]
  description: Active Source values from RS-232 table: HDMI 1=03 00, HDMI 2/MHL=0D 00, DVI-D=09 00, Computer in 1=00 00, Computer in 2 (BNC)=04 00, Video=01 00, HDBaseT=11 00.

- id: display_mode
  type: enum
  values: ["51 00 (Presentation)", "50 00 (High Bright)", "03 00 (Sports)", "01 00 (Cinema)", "05 00 (Photo)", "52 00 (Video)", "00 00 (Natural)", "41 00 (DICOM SIM)", "10 00 (USER-1)", "11 00 (USER-2)"]

- id: aspect_ratio
  type: enum
  values: ["0A 00 (16:10 Fill)", "00 00 (4:3)", "01 00 (16:9)", "06 00 (Letter Box)", "08 00 (Native)", "0D 00 (2.35:1)"]

- id: light_mode
  type: enum
  values: ["00 00 (Normal)", "01 00 (Eco-1)", "02 00 (Eco-2)", "03 00 (Dimming)", "04 00 (Extreme Dimming)", "30 00 (Custom)"]

- id: mute_state
  type: enum
  values: ["00 00 (Off)", "01 00 (On)"]

- id: projection_orientation
  type: enum
  values: ["00 00 (Front Tabletop)", "01 00 (Rear Tabletop)", "03 00 (Front Ceiling)", "02 00 (Rear Ceiling)"]

- id: pjlink_power_state
  type: enum
  values: ["0 (Standby)", "1 (Power On)", "2 (Cool Down)"]

- id: pjlink_av_mute_state
  type: enum
  values: ["30 (Off)", "31 (On)"]

- id: pjlink_error_status
  type: string
  description: "6-byte response from ERST ?. Byte 1=Fan (0..2), 2=Laser (0..2), 3=Temp (0..2), 4=Cover (0..2), 6=Other (0..2). 0=OK, 1=Warning, 2=Error."

- id: pjlink_lamp_status
  type: string
  description: "Two-number response from LAMP ?: 1st=Laser Hours (digits 1-5), 2nd=0=Lamp off / 1=Lamp on."

- id: pjlink_input_list
  type: enum
  values: ["11 12 23 31 32 33 36"]
  description: Source list returned by INST ?.

- id: pjlink_class
  type: enum
  values: ["1"]
  description: Class returned by CLSS ?.
```

## Variables
```yaml
# UNRESOLVED: source documents per-feature Set/Increment/Decrement/Get triplets
# rather than persistent variables. No separate variable table in source.
```

## Events
```yaml
# UNRESOLVED: source describes polling-only model. No unsolicited notification
# section present. Test data is sent to the line on power-on / lamp-on, but the
# source says "Ignore this data." (see §"3. Response code / Error code" notes)
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - reset_all_execute  # Factory reset (Source: "Reset All" Execute command)
  - air_filter_timer_reset
interlocks:
  # Source explicitly notes commands are not accepted during warm-up.
  # UNRESOLVED: precise warm-up window not stated numerically in source.
  - description: "Commands are not accepted during warm-up."
  - description: "Provide an interval of at least 40ms between the response code and any other code."
  - description: "When the data length is greater than indicated, the projector ignores excess bytes; when shorter, the projector returns error."
  - description: "When HDBaseT- IR/RS232/RJ45 enable, Low Power Mode will auto set to On by Lan; HDBaseT-IR/RS232/RJ45 control is disabled when the HDBaseT TX box signal is cutoff."
  - description: "12V Trigger offers 12V (+/- 1.5) of output for 350 mA monitor relay with short circuit protection."
# UNRESOLVED: no explicit human-safety interlock or laser-shutdown procedure found.
```

## Notes
- Frame format: every RS-232 command shares the prefix `BE EF 03 06 00` plus a 2-byte CRC (aL aH) that is not reproduced in the source table; implementers must compute the CRC per the manufacturer's table referenced as "RS-232 Communication command table". The source only lists computed CRC bytes for non-parameterized actions; parameterized Set values use placeholder `[*1] CRC (Low, High)` and `[*2] value`.
- Source clearly states RS-232 protocol: "19200bps, 8N1" (line 70) and TCP port 23 (line 168 / line 208).
- Source also describes HDBaseT path carrying RS-232 commands to the projector (line 23) — so the same binary protocol is reachable via HDBaseT RX when configured.
- PJLink Class 1 v1.00 mapping is documented separately (POWR/INPT/AVMT/ERST/LAMP/INST/NAME/INF1/INF2/CLSS). INF2 reports `LP-WU6600`.
- Crestron RoomView and AMX Device Discovery supported (Crestron control category lists IP Address / IP ID / Port / Projector Name / Location / Assigned To plus DHCP / IP / Subnet / Gateway / DNS / User & Admin Password fields).
- Source-formatting artefact: row 84-86 ("Increment / Decrement / Execute") carry a literal trailing "00 00" repeated in some printings; preserve the documented `Action` + `Type` + `00 00` setting code.

<!-- UNRESOLVED: explicit RS-232 power on/off command hex not present in source table; power control is reachable only via PJLink POWR (0/1). -->
<!-- UNRESOLVED: source does not include an HTTP/REST or HTTPS endpoint; only RS-232, TCP/Telnet port 23, PJLink, Crestron, AMX. -->
<!-- UNRESOLVED: detailed CRC algorithm not reproduced in source — implementer must obtain CRC table from manufacturer. -->
<!-- UNRESOLVED: network apply command hex for setting IP/DHCP not stated (Apply row is empty in source). -->

## Provenance

```yaml
source_domains:
  - projectorcentral.com
source_urls:
  - https://www.projectorcentral.com/pdf/projector_manual_10157.pdf
retrieved_at: 2026-08-15T09:36:27.718Z
last_checked_at: 2026-08-19T09:25:01.500Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:25:01.500Z
matched_actions: 484
action_count: 484
confidence: medium
summary: "Every spec action hex traces verbatim to the source RS-232 command table; transport parameters (19200 8N1, TCP 23) are documented; PJLink subset is fully represented; bidirectional coverage ≈1.0. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "explicit power on/off rows are not in the RS-232 command table; PJLink POWR implies power control but no direct RS-232 power command hex was located in this excerpt."
- "source documents per-feature Set/Increment/Decrement/Get triplets"
- "source describes polling-only model. No unsolicited notification"
- "source does not document any multi-step sequences."
- "precise warm-up window not stated numerically in source."
- "no explicit human-safety interlock or laser-shutdown procedure found."
- "explicit RS-232 power on/off command hex not present in source table; power control is reachable only via PJLink POWR (0/1)."
- "source does not include an HTTP/REST or HTTPS endpoint; only RS-232, TCP/Telnet port 23, PJLink, Crestron, AMX."
- "detailed CRC algorithm not reproduced in source — implementer must obtain CRC table from manufacturer."
- "network apply command hex for setting IP/DHCP not stated (Apply row is empty in source)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
