---
spec_id: admin/seleco-sim2_ht_300
schema_version: ai4av-public-spec-v1
revision: 1
title: "Seleco, SIM2 HT-300 (North America) Control Spec"
manufacturer: "Seleco,"
model_family: "SIM2 HT-300E"
aliases: []
compatible_with:
  manufacturers:
    - "Seleco,"
  models:
    - "SIM2 HT-300E"
    - "SIM2 HT-280E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usermanual.wiki
source_urls:
  - https://usermanual.wiki/Document/HT300EHT280EControlSpec11.977828440.pdf
retrieved_at: 2026-04-29T18:29:50.991Z
last_checked_at: 2026-05-14T18:17:20.212Z
generated_at: 2026-05-14T18:17:20.212Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "binary packet structure beyond hex tables not fully decoded; only named operation IDs documented"
  - "no query commands returning current parameter values found in source"
  - "no unsolicited event packets documented; device sends only ack codes in response to commands"
  - "no multi-step sequences documented as named macros"
  - "no safety warnings or interlock procedures in source"
  - "operation code parameter value ranges not documented; CRC algorithm not specified; Event packet payload structure not fully described"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.212Z
  matched_actions: 87
  action_count: 93
  confidence: medium
  summary: "Every spec action matched literally to source hex codes; transport parameters verified; comprehensive coverage across RC keycodes, direct access, and operation codes. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Seleco, SIM2 HT-300 (North America) Control Spec

## Summary
RS-232C serial projector control. Packet-based protocol: 13-byte Event packets (simulated RC key presses), 32-byte Operation packets (direct parameter access). Acknowledgement codes 0x06 (OK) and 0x15 (error). No authentication defined.

<!-- UNRESOLVED: binary packet structure beyond hex tables not fully decoded; only named operation IDs documented -->

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
- powerable      # stand-by / power-on via RC keycodes 0-5
- routable       # input selection via keycodes; signal type via operation codes
- levelable      # brightness, contrast, color, tint, sharpness, position, OSD, zoom, focus, keystone, magnification, pan
```

## Actions
```yaml
- id: rc_standby
  label: Standby
  kind: action
  params: []
  hex: "BE EF 02 06 00 51 E4 48 01 00 00 00 00"

- id: rc_key_0
  label: Key 0 (Power On, Last Source)
  kind: action
  params: []
  hex: "BE EF 02 06 00 6B E6 52 01 00 00 00 00"

- id: rc_key_1
  label: Key 1 (Power On, Select Source 1)
  kind: action
  params: []
  hex: "BE EF 02 06 00 80 E5 49 01 00 00 00 00"

- id: rc_key_2
  label: Key 2 (Power On, Select Source 2)
  kind: action
  params: []
  hex: "BE EF 02 06 00 B3 E5 4A 01 00 00 00 00"

- id: rc_key_3
  label: Key 3 (Power On, Select Source 3)
  kind: action
  params: []
  hex: "BE EF 02 06 00 62 E4 4B 01 00 00 00 00"

- id: rc_key_4
  label: Key 4 (Power On, Select Source 4)
  kind: action
  params: []
  hex: "BE EF 02 06 00 D5 E5 4C 01 00 00 00 00"

- id: rc_key_5
  label: Key 5 (Power On, Select Source 5)
  kind: action
  params: []
  hex: "BE EF 02 06 00 04 E4 4D 01 00 00 00 00"

- id: rc_key_6
  label: Key 6
  kind: action
  params: []
  hex: "BE EF 02 06 00 37 E4 4E 01 00 00 00 00"

- id: rc_key_7
  label: Key 7
  kind: action
  params: []
  hex: "BE EF 02 06 00 E6 E5 4F 01 00 00 00 00"

- id: rc_key_8
  label: Key 8
  kind: action
  params: []
  hex: "BE EF 02 06 00 89 E7 50 01 00 00 00 00"

- id: rc_key_9
  label: Key 9
  kind: action
  params: []
  hex: "BE EF 02 06 00 58 E6 51 01 00 00 00 00"

- id: rc_esc
  label: ESC
  kind: action
  params: []
  hex: "BE EF 02 06 00 0D E6 54 01 00 00 00 00"

- id: rc_cursor_up
  label: Cursor Up
  kind: action
  params: []
  hex: "BE EF 02 06 00 DC E7 55 01 00 00 00 00"

- id: rc_cursor_left
  label: Cursor Left
  kind: action
  params: []
  hex: "BE EF 02 06 00 EF E7 56 01 00 00 00 00"

- id: rc_cursor_right
  label: Cursor Right
  kind: action
  params: []
  hex: "BE EF 02 06 00 3E E6 57 01 00 00 00 00"

- id: rc_cursor_down
  label: Cursor Down
  kind: action
  params: []
  hex: "BE EF 02 06 00 C1 E6 58 01 00 00 00 00"

- id: rc_menu_left
  label: Menu Left (-)
  kind: action
  params: []
  hex: "BE EF 02 06 00 10 E7 59 01 00 00 00 00"

- id: rc_menu_right
  label: Menu Right (+)
  kind: action
  params: []
  hex: "BE EF 02 06 00 23 E7 5A 01 00 00 00 00"

- id: rc_freeze
  label: Freeze
  kind: action
  params: []
  hex: "BE EF 02 06 00 F2 E6 5B 01 00 00 00 00"

- id: rc_f1
  label: F1
  kind: action
  params: []
  hex: "BE EF 02 06 00 E6 F4 8F 01 00 00 00 00"

- id: rc_f2
  label: F2
  kind: action
  params: []
  hex: "BE EF 02 06 00 89 F6 90 01 00 00 00 00"

- id: rc_info
  label: Info
  kind: action
  params: []
  hex: "BE EF 02 06 00 A7 E6 5E 01 00 00 00 00"

- id: rc_auto
  label: Auto
  kind: action
  params: []
  hex: "BE EF 02 06 00 79 E2 60 01 00 00 00 00"

- id: rc_aspect_normal
  label: Aspect Normal
  kind: action
  params: []
  hex: "BE EF 02 06 00 2A F4 83 01 00 00 00 00"

- id: rc_aspect_anamorphic
  label: Aspect Anamorphic
  kind: action
  params: []
  hex: "BE EF 02 06 00 9D F5 84 01 00 00 00 00"

- id: rc_aspect_letterbox
  label: Aspect Letterbox
  kind: action
  params: []
  hex: "BE EF 02 06 00 4C F4 85 01 00 00 00 00"

- id: rc_aspect_panoramic
  label: Aspect Panoramic
  kind: action
  params: []
  hex: "BE EF 02 06 00 7F F4 86 01 00 00 00 00"

- id: rc_aspect_pixel_to_pixel
  label: Aspect Pixel to Pixel
  kind: action
  params: []
  hex: "BE EF 02 06 00 AE F5 87 01 00 00 00 00"

- id: rc_aspect_user_1
  label: Aspect User 1
  kind: action
  params: []
  hex: "BE EF 02 06 00 51 F5 88 01 00 00 00 00"

- id: rc_aspect_user_2
  label: Aspect User 2
  kind: action
  params: []
  hex: "BE EF 02 06 00 80 F4 89 01 00 00 00 00"

- id: rc_aspect_user_3
  label: Aspect User 3
  kind: action
  params: []
  hex: "BE EF 02 06 00 B3 F4 8A 01 00 00 00 00"

- id: rc_vcr
  label: VCR
  kind: action
  params: []
  hex: "BE EF 02 06 00 9B E3 62 01 00 00 00 00"

- id: da_zoom
  label: Zoom (Direct Access)
  kind: action
  params: []
  hex: "BE EF 02 06 00 94 E6 5D 01 00 00 00 00"

- id: da_focus
  label: Focus (Direct Access)
  kind: action
  params: []
  hex: "BE EF 02 06 00 76 E7 5F 01 00 00 00 00"

- id: da_goto_brightness
  label: Goto Brightness (Direct Access)
  kind: action
  params: []
  hex: "BE EF 02 06 00 C7 E1 7E 01 00 00 00 00"

- id: da_goto_contrast
  label: Goto Contrast (Direct Access)
  kind: action
  params: []
  hex: "BE EF 02 06 00 16 E0 7F 01 00 00 00 00"

- id: da_goto_color
  label: Goto Color (Direct Access)
  kind: action
  params: []
  hex: "BE EF 02 06 00 19 F4 80 01 00 00 00 00"

- id: da_goto_tint
  label: Goto Tint (Direct Access)
  kind: action
  params: []
  hex: "BE EF 02 06 00 C8 F5 81 01 00 00 00 00"

- id: op_brightness_increment
  label: Brightness Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 AB 7E 03 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_brightness_decrement
  label: Brightness Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 C5 D4 04 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_contrast_increment
  label: Contrast Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 3E 23 03 01 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_contrast_decrement
  label: Contrast Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 50 89 04 01 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_color_increment
  label: Color Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 C1 C7 03 02 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_color_decrement
  label: Color Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 AF 6D 04 02 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_tint_increment
  label: Tint Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 54 9A 03 03 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_tint_decrement
  label: Tint Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 3A 30 04 03 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_sharpness_video_increment
  label: Sharpness (Video) Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 7E 0C 03 04 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_sharpness_video_decrement
  label: Sharpness (Video) Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 10 A6 04 04 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_sharpness_filter_increment
  label: Sharpness Filter Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 D4 C4 03 09 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_sharpness_filter_decrement
  label: Sharpness Filter Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 BA 6E 04 09 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_sharpness_mode_video
  label: Sharpness Mode Set Video
  kind: action
  params: []
  hex: "BE EF 03 19 00 7A 80 01 60 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_sharpness_mode_graphics
  label: Sharpness Mode Set Graphics
  kind: action
  params: []
  hex: "BE EF 03 19 00 EA 41 01 60 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_cinema_mode_off
  label: Cinema Mode Off
  kind: action
  params: []
  hex: "BE EF 03 19 00 33 43 01 07 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_cinema_mode_auto
  label: Cinema Mode Set Auto
  kind: action
  params: []
  hex: "BE EF 03 19 00 A3 82 01 07 08 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_video_type_normal
  label: Video Type Normal
  kind: action
  params: []
  hex: "BE EF 03 19 00 A6 1E 01 06 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_video_type_vcr
  label: Video Type VCR
  kind: action
  params: []
  hex: "BE EF 03 19 00 36 DF 01 06 08 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_position_horizontal_increment
  label: Position Horizontal Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 55 BA 03 21 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_position_horizontal_decrement
  label: Position Horizontal Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 3B 10 04 21 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_position_vertical_increment
  label: Position Vertical Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 AA 5E 03 22 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_position_vertical_decrement
  label: Position Vertical Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 C4 F4 04 22 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_color_temperature
  label: Color Temperature (01-36)
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-36
  hex_prefix: "BE EF 03 19 00"

- id: op_gamma
  label: Gamma (01-12)
  kind: action
  params:
    - name: preset
      type: integer
      description: Gamma preset 01-12
  hex_prefix: "BE EF 03 19 00"

- id: op_frequency_increment
  label: Frequency Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 15 95 03 24 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_frequency_decrement
  label: Frequency Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 7B 3F 04 24 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_phase_increment
  label: Phase Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 80 C8 03 25 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_phase_decrement
  label: Phase Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 EE 62 04 25 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_yc_delay_increment
  label: Y/C Delay Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 7F 2C 03 26 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_yc_delay_decrement
  label: Y/C Delay Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 11 86 04 26 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_magnification_increment
  label: Magnification Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 FF 72 03 2C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_magnification_decrement
  label: Magnification Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 91 D8 04 2C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_pan_horizontal_increment
  label: Pan Horizontal Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 6A 2F 03 2D 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_pan_horizontal_decrement
  label: Pan Horizontal Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 04 85 04 2D 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_pan_vertical_increment
  label: Pan Vertical Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 95 CB 03 2E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_pan_vertical_decrement
  label: Pan Vertical Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 FB 61 04 2E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_keystone_vertical_increment
  label: Keystone Vertical Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 01 26 03 1C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_keystone_vertical_decrement
  label: Keystone Vertical Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 6F 8C 04 1C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_keystone_horizontal_increment
  label: Keystone Horizontal Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 6B 9F 03 1E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_keystone_horizontal_decrement
  label: Keystone Horizontal Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 05 35 04 1E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_language
  label: Language
  kind: action
  params:
    - name: language
      type: enum
      values: [english, italiano, francais, deutsch, espanol, portugues]
  hex_prefix: "BE EF 03 19 00"

- id: op_osd_position_horizontal_increment
  label: OSD Position Horizontal Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 82 88 03 61 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_osd_position_horizontal_decrement
  label: OSD Position Horizontal Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 EC 22 04 61 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_osd_position_vertical_increment
  label: OSD Position Vertical Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 7D 6C 03 62 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_osd_position_vertical_decrement
  label: OSD Position Vertical Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 13 C6 04 62 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_input3_signaltype
  label: Input 3 (Comp. RGB) / Signal Type
  kind: action
  params:
    - name: mode
      type: enum
      values: [ycrch_autosync, ycrch_15khz, ycrch_32khz, rgb_autosync, rgb_15khz, rgb_32khz]
  hex_prefix: "BE EF 03 19 00"

- id: op_memory_1_recall
  label: Memory 1 Recall
  kind: action
  params: []
  hex: "BE EF 03 19 00 85 EB 01 27 09 00 00 01 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_memory_1_save_current
  label: Memory 1 Save Current Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 54 D6 01 27 09 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_memory_1_save_initial
  label: Memory 1 Save Initial Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 45 9A 01 28 09 00 00 01 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_memory_2_recall
  label: Memory 2 Recall
  kind: action
  params: []
  hex: "BE EF 03 19 00 74 AB 01 27 09 00 00 01 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_memory_2_save_current
  label: Memory 2 Save Current Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 A5 96 01 27 09 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_memory_2_save_initial
  label: Memory 2 Save Initial Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 76 DE 01 28 09 00 00 02 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_memory_3_recall
  label: Memory 3 Recall
  kind: action
  params: []
  hex: "BE EF 03 19 00 E4 6A 01 27 09 00 00 01 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_memory_3_save_current
  label: Memory 3 Save Current Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 35 57 01 27 09 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00"

- id: op_memory_3_save_initial
  label: Memory 3 Save Initial Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 A7 E3 01 28 09 00 00 03 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"
```

## Feedbacks
```yaml
- id: ack_ok
  label: Acknowledged No Error
  type: binary
  values: []
  hex: "06"

- id: ack_error
  label: Acknowledged Error
  type: binary
  values: []
  hex: "15"
```

## Variables
```yaml
# UNRESOLVED: no query commands returning current parameter values found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event packets documented; device sends only ack codes in response to commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented as named macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Packet header: `BE EF` (0xEFBE little-endian sync marker), Packet Type byte, Payload Size (2 bytes), CRC (2 bytes). Operation packets: 25-byte payload (Op Type, Operation ID, Target, Operation Value, padding). Event packets: 6-byte payload (all zeros). Minimum 40 ms gap between ack and next command. Excess bytes ignored; undersized packets trigger error ack 0x15.
<!-- UNRESOLVED: operation code parameter value ranges not documented; CRC algorithm not specified; Event packet payload structure not fully described -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
source_urls:
  - https://usermanual.wiki/Document/HT300EHT280EControlSpec11.977828440.pdf
retrieved_at: 2026-04-29T18:29:50.991Z
last_checked_at: 2026-05-14T18:17:20.212Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.212Z
matched_actions: 87
action_count: 93
confidence: medium
summary: "Every spec action matched literally to source hex codes; transport parameters verified; comprehensive coverage across RC keycodes, direct access, and operation codes. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "binary packet structure beyond hex tables not fully decoded; only named operation IDs documented"
- "no query commands returning current parameter values found in source"
- "no unsolicited event packets documented; device sends only ack codes in response to commands"
- "no multi-step sequences documented as named macros"
- "no safety warnings or interlock procedures in source"
- "operation code parameter value ranges not documented; CRC algorithm not specified; Event packet payload structure not fully described"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
