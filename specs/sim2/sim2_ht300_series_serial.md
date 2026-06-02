---
spec_id: admin/sim2-ht300-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sim2 HT 300E / HT 280E Control Spec"
manufacturer: Sim2
model_family: "HT 300E"
aliases: []
compatible_with:
  manufacturers:
    - Sim2
  models:
    - "HT 300E"
    - "HT 280E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usermanual.wiki
source_urls:
  - https://usermanual.wiki/Document/HT300EHT280EControlSpec11.977828440.pdf
retrieved_at: 2026-05-22T18:33:43.511Z
last_checked_at: 2026-05-31T21:24:26.047Z
generated_at: 2026-05-31T21:24:26.047Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no query commands returning current state found in source"
  - "no query commands found in source. Device does not appear to support"
  - "no event packet documentation found in source. Event packet format"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "query/feedback commands — no mechanism described for reading current parameter values"
  - "event notifications — Event packet format exists but no specific events documented"
  - "firmware version compatibility not stated"
  - "gamma presets (01–12) meanings not described in source"
  - "color temperature presets (01–36) meanings not described in source"
verification:
  verdict: verified
  checked_at: 2026-05-31T21:24:26.047Z
  matched_actions: 149
  action_count: 149
  confidence: medium
  summary: "All 149 spec action hex codes match literal source sequences; transport parameters verified verbatim; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Sim2 HT 300E / HT 280E Control Spec

## Summary
RS-232C-controlled home theater projector. Two models covered: HT 300E and HT 280E. Control via packet-based protocol with 13-byte Event packets and 32-byte Operation packets. All commands acknowledged with return codes 0x06 (OK) or 0x15 (error). Serial config: 19200 bps, 8N1, no flow control.

<!-- UNRESOLVED: no query commands returning current state found in source -->

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
# inferred from power on/off commands and brightness/contrast increment/decrement
- powerable
- levelable
```

## Actions
```yaml
# Remote Control Keycodes - simulated keypresses
- id: standby
  label: Stand By
  kind: action
  params: []
  hex: "BE EF 02 06 00 51 E4 48 01 00 00 00 00"

- id: key_0
  label: "0 (Power On, Last Source)"
  kind: action
  params: []
  hex: "BE EF 02 06 00 6B E6 52 01 00 00 00 00"

- id: key_1
  label: "1 (Power On, Select Source 1)"
  kind: action
  params: []
  hex: "BE EF 02 06 00 80 E5 49 01 00 00 00 00"

- id: key_2
  label: "2 (Power On, Select Source 2)"
  kind: action
  params: []
  hex: "BE EF 02 06 00 B3 E5 4A 01 00 00 00 00"

- id: key_3
  label: "3 (Power On, Select Source 3)"
  kind: action
  params: []
  hex: "BE EF 02 06 00 62 E4 4B 01 00 00 00 00"

- id: key_4
  label: "4 (Power On, Select Source 4)"
  kind: action
  params: []
  hex: "BE EF 02 06 00 D5 E5 4C 01 00 00 00 00"

- id: key_5
  label: "5 (Power On, Select Source 5)"
  kind: action
  params: []
  hex: "BE EF 02 06 00 04 E4 4D 01 00 00 00 00"

- id: key_6
  label: "6"
  kind: action
  params: []
  hex: "BE EF 02 06 00 37 E4 4E 01 00 00 00 00"

- id: key_7
  label: "7"
  kind: action
  params: []
  hex: "BE EF 02 06 00 E6 E5 4F 01 00 00 00 00"

- id: key_8
  label: "8"
  kind: action
  params: []
  hex: "BE EF 02 06 00 89 E7 50 01 00 00 00 00"

- id: key_9
  label: "9"
  kind: action
  params: []
  hex: "BE EF 02 06 00 58 E6 51 01 00 00 00 00"

- id: key_esc
  label: ESC
  kind: action
  params: []
  hex: "BE EF 02 06 00 0D E6 54 01 00 00 00 00"

- id: key_cursor_up
  label: Cursor Up
  kind: action
  params: []
  hex: "BE EF 02 06 00 DC E7 55 01 00 00 00 00"

- id: key_cursor_left
  label: Cursor Left
  kind: action
  params: []
  hex: "BE EF 02 06 00 EF E7 56 01 00 00 00 00"

- id: key_cursor_right
  label: Cursor Right
  kind: action
  params: []
  hex: "BE EF 02 06 00 3E E6 57 01 00 00 00 00"

- id: key_cursor_down
  label: Cursor Down
  kind: action
  params: []
  hex: "BE EF 02 06 00 C1 E6 58 01 00 00 00 00"

- id: key_menu_left
  label: Menu Left (-)
  kind: action
  params: []
  hex: "BE EF 02 06 00 10 E7 59 01 00 00 00 00"

- id: key_menu_right
  label: Menu Right (+)
  kind: action
  params: []
  hex: "BE EF 02 06 00 23 E7 5A 01 00 00 00 00"

- id: key_freeze
  label: Freeze
  kind: action
  params: []
  hex: "BE EF 02 06 00 F2 E6 5B 01 00 00 00 00"

- id: key_f1
  label: F1
  kind: action
  params: []
  hex: "BE EF 02 06 00 E6 F4 8F 01 00 00 00 00"

- id: key_f2
  label: F2
  kind: action
  params: []
  hex: "BE EF 02 06 00 89 F6 90 01 00 00 00 00"

- id: key_info
  label: Info
  kind: action
  params: []
  hex: "BE EF 02 06 00 A7 E6 5E 01 00 00 00 00"

- id: key_auto
  label: Auto
  kind: action
  params: []
  hex: "BE EF 02 06 00 79 E2 60 01 00 00 00 00"

- id: aspect_normal
  label: Aspect Normal
  kind: action
  params: []
  hex: "BE EF 02 06 00 2A F4 83 01 00 00 00 00"

- id: aspect_anamorphic
  label: Aspect Anamorphic
  kind: action
  params: []
  hex: "BE EF 02 06 00 9D F5 84 01 00 00 00 00"

- id: aspect_letterbox
  label: Aspect Letterbox
  kind: action
  params: []
  hex: "BE EF 02 06 00 4C F4 85 01 00 00 00 00"

- id: aspect_panoramic
  label: Aspect Panoramic
  kind: action
  params: []
  hex: "BE EF 02 06 00 7F F4 86 01 00 00 00 00"

- id: aspect_pixel_to_pixel
  label: Aspect Pixel to Pixel
  kind: action
  params: []
  hex: "BE EF 02 06 00 AE F5 87 01 00 00 00 00"

- id: aspect_user1
  label: Aspect User 1
  kind: action
  params: []
  hex: "BE EF 02 06 00 51 F5 88 01 00 00 00 00"

- id: aspect_user2
  label: Aspect User 2
  kind: action
  params: []
  hex: "BE EF 02 06 00 80 F4 89 01 00 00 00 00"

- id: aspect_user3
  label: Aspect User 3
  kind: action
  params: []
  hex: "BE EF 02 06 00 B3 F4 8A 01 00 00 00 00"

- id: key_vcr
  label: VCR
  kind: action
  params: []
  hex: "BE EF 02 06 00 9B E3 62 01 00 00 00 00"

# Direct Access Codes
- id: zoom
  label: Zoom
  kind: action
  params: []
  hex: "BE EF 02 06 00 94 E6 5D 01 00 00 00 00"

- id: focus
  label: Focus
  kind: action
  params: []
  hex: "BE EF 02 06 00 76 E7 5F 01 00 00 00 00"

- id: goto_brightness
  label: Goto Brightness
  kind: action
  params: []
  hex: "BE EF 02 06 00 C7 E1 7E 01 00 00 00 00"

- id: goto_contrast
  label: Goto Contrast
  kind: action
  params: []
  hex: "BE EF 02 06 00 16 E0 7F 01 00 00 00 00"

- id: goto_color
  label: Goto Color
  kind: action
  params: []
  hex: "BE EF 02 06 00 19 F4 80 01 00 00 00 00"

- id: goto_tint
  label: Goto Tint
  kind: action
  params: []
  hex: "BE EF 02 06 00 C8 F5 81 01 00 00 00 00"

# Operation Codes - Increment/Decrement
- id: brightness_increment
  label: Brightness Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 AB 7E 03 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: brightness_decrement
  label: Brightness Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 C5 D4 04 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: contrast_increment
  label: Contrast Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 3E 23 03 01 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: contrast_decrement
  label: Contrast Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 50 89 04 01 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: color_increment
  label: Color Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 C1 C7 03 02 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: color_decrement
  label: Color Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 AF 6D 04 02 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: tint_increment
  label: Tint Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 54 9A 03 03 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: tint_decrement
  label: Tint Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 3A 30 04 03 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: sharpness_increment
  label: Sharpness (Video) Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 7E 0C 03 04 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: sharpness_decrement
  label: Sharpness (Video) Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 10 A6 04 04 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: sharpness_filter_increment
  label: Sharpness Filter Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 D4 C4 03 09 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: sharpness_filter_decrement
  label: Sharpness Filter Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 BA 6E 04 09 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: sharpness_mode_video
  label: Sharpness Mode Set Video
  kind: action
  params: []
  hex: "BE EF 03 19 00 7A 80 01 60 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: sharpness_mode_graphics
  label: Sharpness Mode Set Graphics
  kind: action
  params: []
  hex: "BE EF 03 19 00 EA 41 01 60 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: cinema_mode_off
  label: Cinema Mode Off
  kind: action
  params: []
  hex: "BE EF 03 19 00 33 43 01 07 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: cinema_mode_auto
  label: Cinema Mode Auto
  kind: action
  params: []
  hex: "BE EF 03 19 00 A3 82 01 07 08 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: video_type_normal
  label: Video Type Normal
  kind: action
  params: []
  hex: "BE EF 03 19 00 A6 1E 01 06 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: video_type_vcr
  label: Video Type VCR
  kind: action
  params: []
  hex: "BE EF 03 19 00 36 DF 01 06 08 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: position_horizontal_increment
  label: Position Horizontal Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 55 BA 03 21 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: position_horizontal_decrement
  label: Position Horizontal Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 3B 10 04 21 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: position_vertical_increment
  label: Position Vertical Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 AA 5E 03 22 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: position_vertical_decrement
  label: Position Vertical Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 C4 F4 04 22 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: frequency_increment
  label: Frequency Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 15 95 03 24 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: frequency_decrement
  label: Frequency Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 7B 3F 04 24 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: phase_increment
  label: Phase Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 80 C8 03 25 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: phase_decrement
  label: Phase Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 EE 62 04 25 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: yc_delay_increment
  label: Y/C Delay Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 7F 2C 03 26 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: yc_delay_decrement
  label: Y/C Delay Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 11 86 04 26 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: magnification_increment
  label: Magnification Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 FF 72 03 2C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: magnification_decrement
  label: Magnification Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 91 D8 04 2C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: pan_horizontal_increment
  label: Pan Horizontal Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 6A 2F 03 2D 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: pan_horizontal_decrement
  label: Pan Horizontal Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 04 85 04 2D 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: pan_vertical_increment
  label: Pan Vertical Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 95 CB 03 2E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: pan_vertical_decrement
  label: Pan Vertical Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 FB 61 04 2E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: keystone_vertical_increment
  label: Keystone Vertical Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 01 26 03 1C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: keystone_vertical_decrement
  label: Keystone Vertical Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 6F 8C 04 1C 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: keystone_horizontal_increment
  label: Keystone Horizontal Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 6B 9F 03 1E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: keystone_horizontal_decrement
  label: Keystone Horizontal Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 05 35 04 1E 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: language_english
  label: Language English
  kind: action
  params: []
  hex: "BE EF 03 19 00 15 35 01 05 24 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: language_italiano
  label: Language Italiano
  kind: action
  params: []
  hex: "BE EF 03 19 00 85 F4 01 05 24 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00"

- id: language_francais
  label: Language Francais
  kind: action
  params: []
  hex: "BE EF 03 19 00 74 B4 01 05 24 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00"

- id: language_deutsch
  label: Language Deutsch
  kind: action
  params: []
  hex: "BE EF 03 19 00 E4 75 01 05 24 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00"

- id: language_espanol
  label: Language Espanol
  kind: action
  params: []
  hex: "BE EF 03 19 00 D6 37 01 05 24 00 00 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00"

- id: language_portugues
  label: Language Portugues
  kind: action
  params: []
  hex: "BE EF 03 19 00 46 F6 01 05 24 00 00 00 00 00 00 05 00 00 00 00 00 00 00 00 00 00 00 00"

- id: osd_position_horizontal_increment
  label: OSD Position Horizontal Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 82 88 03 61 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: osd_position_horizontal_decrement
  label: OSD Position Horizontal Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 EC 22 04 61 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: osd_position_vertical_increment
  label: OSD Position Vertical Increment
  kind: action
  params: []
  hex: "BE EF 03 19 00 7D 6C 03 62 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: osd_position_vertical_decrement
  label: OSD Position Vertical Decrement
  kind: action
  params: []
  hex: "BE EF 03 19 00 13 C6 04 62 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: input3_ycrcb_autosync
  label: Input 3 (Comp. RGB) Set YCrCb AutoSync
  kind: action
  params: []
  hex: "BE EF 03 19 00 92 04 01 82 08 00 00 00 00 00 00 14 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: input3_ycrcb_15khz
  label: Input 3 (Comp. RGB) Set YCrCb 15kHz
  kind: action
  params: []
  hex: "BE EF 03 19 00 5B 0C 01 82 08 00 00 00 00 00 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: input3_ycrcb_32khz
  label: Input 3 (Comp. RGB) Set YCrCb 32kHz
  kind: action
  params: []
  hex: "BE EF 03 19 00 51 06 01 82 08 00 00 00 00 00 00 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: input3_rgb_autosync
  label: Input 3 (Comp. RGB) Set RGB AutoSync
  kind: action
  params: []
  hex: "BE EF 03 19 00 97 01 01 82 08 00 00 00 00 00 00 18 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: input3_rgb_15khz
  label: Input 3 (Comp. RGB) Set RGB 15kHz
  kind: action
  params: []
  hex: "BE EF 03 19 00 5E 09 01 82 08 00 00 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: input3_rgb_32khz
  label: Input 3 (Comp. RGB) Set RGB 32kHz
  kind: action
  params: []
  hex: "BE EF 03 19 00 98 0E 01 82 08 00 00 00 00 00 00 0C 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: memory1_recall
  label: Memory 1 Recall
  kind: action
  params: []
  hex: "BE EF 03 19 00 85 EB 01 27 09 00 00 01 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: memory1_save_current
  label: Memory 1 Save Current Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 54 D6 01 27 09 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: memory1_save_initial
  label: Memory 1 Save Initial Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 45 9A 01 28 09 00 00 01 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: memory2_recall
  label: Memory 2 Recall
  kind: action
  params: []
  hex: "BE EF 03 19 00 74 AB 01 27 09 00 00 01 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: memory2_save_current
  label: Memory 2 Save Current Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 A5 96 01 27 09 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: memory2_save_initial
  label: Memory 2 Save Initial Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 76 DE 01 28 09 00 00 02 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: memory3_recall
  label: Memory 3 Recall
  kind: action
  params: []
  hex: "BE EF 03 19 00 E4 6A 01 27 09 00 00 01 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: memory3_save_current
  label: Memory 3 Save Current Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 35 57 01 27 09 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

- id: memory3_save_initial
  label: Memory 3 Save Initial Settings
  kind: action
  params: []
  hex: "BE EF 03 19 00 A7 E3 01 28 09 00 00 03 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

# Color Temperature (01-36)
- id: color_temp_01
  label: Color Temperature 01
  kind: action
  params: []
  hex: "BE EF 03 19 00 D6 F4 01 C2 09 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_02
  label: Color Temperature 02
  kind: action
  params: []
  hex: "BE EF 03 19 00 46 35 01 C2 09 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_03
  label: Color Temperature 03
  kind: action
  params: []
  hex: "BE EF 03 19 00 B7 75 01 C2 09 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_04
  label: Color Temperature 04
  kind: action
  params: []
  hex: "BE EF 03 19 00 27 B4 01 C2 09 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_05
  label: Color Temperature 05
  kind: action
  params: []
  hex: "BE EF 03 19 00 15 F6 01 C2 09 00 00 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_06
  label: Color Temperature 06
  kind: action
  params: []
  hex: "BE EF 03 19 00 85 37 01 C2 09 00 00 00 00 00 00 05 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_07
  label: Color Temperature 07
  kind: action
  params: []
  hex: "BE EF 03 19 00 74 77 01 C2 09 00 00 00 00 00 00 06 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_08
  label: Color Temperature 08
  kind: action
  params: []
  hex: "BE EF 03 19 00 E4 B6 01 C2 09 00 00 00 00 00 00 07 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_09
  label: Color Temperature 09
  kind: action
  params: []
  hex: "BE EF 03 19 00 10 F3 01 C2 09 00 00 00 00 00 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_10
  label: Color Temperature 10
  kind: action
  params: []
  hex: "BE EF 03 19 00 80 32 01 C2 09 00 00 00 00 00 00 09 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_11
  label: Color Temperature 11
  kind: action
  params: []
  hex: "BE EF 03 19 00 71 72 01 C2 09 00 00 00 00 00 00 0A 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_12
  label: Color Temperature 12
  kind: action
  params: []
  hex: "BE EF 03 19 00 E1 B3 01 C2 09 00 00 00 00 00 00 0B 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_13
  label: Color Temperature 13
  kind: action
  params: []
  hex: "BE EF 03 19 00 D3 F1 01 C2 09 00 00 00 00 00 00 0C 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_14
  label: Color Temperature 14
  kind: action
  params: []
  hex: "BE EF 03 19 00 43 30 01 C2 09 00 00 00 00 00 00 0D 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_15
  label: Color Temperature 15
  kind: action
  params: []
  hex: "BE EF 03 19 00 B2 70 01 C2 09 00 00 00 00 00 00 0E 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_16
  label: Color Temperature 16
  kind: action
  params: []
  hex: "BE EF 03 19 00 22 B1 01 C2 09 00 00 00 00 00 00 0F 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_17
  label: Color Temperature 17
  kind: action
  params: []
  hex: "BE EF 03 19 00 1A F9 01 C2 09 00 00 00 00 00 00 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_18
  label: Color Temperature 18
  kind: action
  params: []
  hex: "BE EF 03 19 00 8A 38 01 C2 09 00 00 00 00 00 00 11 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_19
  label: Color Temperature 19
  kind: action
  params: []
  hex: "BE EF 03 19 00 7B 78 01 C2 09 00 00 00 00 00 00 12 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_20
  label: Color Temperature 20
  kind: action
  params: []
  hex: "BE EF 03 19 00 EB B9 01 C2 09 00 00 00 00 00 00 13 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_21
  label: Color Temperature 21
  kind: action
  params: []
  hex: "BE EF 03 19 00 D9 FB 01 C2 09 00 00 00 00 00 00 14 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_22
  label: Color Temperature 22
  kind: action
  params: []
  hex: "BE EF 03 19 00 49 3A 01 C2 09 00 00 00 00 00 00 15 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_23
  label: Color Temperature 23
  kind: action
  params: []
  hex: "BE EF 03 19 00 B8 7A 01 C2 09 00 00 00 00 00 00 16 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_24
  label: Color Temperature 24
  kind: action
  params: []
  hex: "BE EF 03 19 00 28 BB 01 C2 09 00 00 00 00 00 00 17 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_25
  label: Color Temperature 25
  kind: action
  params: []
  hex: "BE EF 03 19 00 DC FE 01 C2 09 00 00 00 00 00 00 18 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_26
  label: Color Temperature 26
  kind: action
  params: []
  hex: "BE EF 03 19 00 4C 3F 01 C2 09 00 00 00 00 00 00 19 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_27
  label: Color Temperature 27
  kind: action
  params: []
  hex: "BE EF 03 19 00 BD 7F 01 C2 09 00 00 00 00 00 00 1A 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_28
  label: Color Temperature 28
  kind: action
  params: []
  hex: "BE EF 03 19 00 2D BE 01 C2 09 00 00 00 00 00 00 1B 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_29
  label: Color Temperature 29
  kind: action
  params: []
  hex: "BE EF 03 19 00 1F FC 01 C2 09 00 00 00 00 00 00 1C 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_30
  label: Color Temperature 30
  kind: action
  params: []
  hex: "BE EF 03 19 00 8F 3D 01 C2 09 00 00 00 00 00 00 1D 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_31
  label: Color Temperature 31
  kind: action
  params: []
  hex: "BE EF 03 19 00 7E 7D 01 C2 09 00 00 00 00 00 00 1E 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_32
  label: Color Temperature 32
  kind: action
  params: []
  hex: "BE EF 03 19 00 EE BC 01 C2 09 00 00 00 00 00 00 1F 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_33
  label: Color Temperature 33
  kind: action
  params: []
  hex: "BE EF 03 19 00 0E ED 01 C2 09 00 00 00 00 00 00 20 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_34
  label: Color Temperature 34
  kind: action
  params: []
  hex: "BE EF 03 19 00 9E 2C 01 C2 09 00 00 00 00 00 00 21 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_35
  label: Color Temperature 35
  kind: action
  params: []
  hex: "BE EF 03 19 00 6F 6C 01 C2 09 00 00 00 00 00 00 22 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: color_temp_36
  label: Color Temperature 36
  kind: action
  params: []
  hex: "BE EF 03 19 00 FF AD 01 C2 09 00 00 00 00 00 00 23 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

# Gamma (01-12)
- id: gamma_01
  label: Gamma 01
  kind: action
  params: []
  hex: "BE EF 03 19 00 FA 59 01 27 08 00 00 00 00 00 00 06 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_02
  label: Gamma 02
  kind: action
  params: []
  hex: "BE EF 03 19 00 9E DD 01 27 08 00 00 00 00 00 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_03
  label: Gamma 03
  kind: action
  params: []
  hex: "BE EF 03 19 00 6A 98 01 27 08 00 00 00 00 00 00 07 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_04
  label: Gamma 04
  kind: action
  params: []
  hex: "BE EF 03 19 00 6F 9D 01 27 08 00 00 00 00 00 00 0B 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_05
  label: Gamma 05
  kind: action
  params: []
  hex: "BE EF 03 19 00 5D DF 01 27 08 00 00 00 00 00 00 0C 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_06
  label: Gamma 06
  kind: action
  params: []
  hex: "BE EF 03 19 00 CD 1E 01 27 08 00 00 00 00 00 00 0D 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_07
  label: Gamma 07
  kind: action
  params: []
  hex: "BE EF 03 19 00 3C 5E 01 27 08 00 00 00 00 00 00 0E 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_08
  label: Gamma 08
  kind: action
  params: []
  hex: "BE EF 03 19 00 AC 9F 01 27 08 00 00 00 00 00 00 0F 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_09
  label: Gamma 09
  kind: action
  params: []
  hex: "BE EF 03 19 00 94 D7 01 27 08 00 00 00 00 00 00 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_10
  label: Gamma 10
  kind: action
  params: []
  hex: "BE EF 03 19 00 04 16 01 27 08 00 00 00 00 00 00 11 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_11
  label: Gamma 11
  kind: action
  params: []
  hex: "BE EF 03 19 00 F5 56 01 27 08 00 00 00 00 00 00 12 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
- id: gamma_12
  label: Gamma 12
  kind: action
  params: []
  hex: "BE EF 03 19 00 65 97 01 27 08 00 00 00 00 00 00 13 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
```

## Feedbacks
```yaml
- id: ack_ok
  label: Acknowledged - No Error
  type: string
  values: ["06"]

- id: ack_error
  label: Acknowledged - Error
  type: string
  values: ["15"]
```

## Variables
```yaml
# UNRESOLVED: no query commands found in source. Device does not appear to support
# reading current parameter values via serial. All operations are send-only.
```

## Events
```yaml
# UNRESOLVED: no event packet documentation found in source. Event packet format
# is documented (6 bytes payload: Event 00 00 00 00) but no specific events are described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Packet structure:** All packets begin with magic bytes `BE EF` (little-endian 0xEFBE for alignment detection). Two packet types: Event (13 bytes total, used for simulated remote control keypresses) and Operation (32 bytes total, used for direct parameter adjustments). Every packet must be exactly the specified length — excess bytes are ignored, short packets trigger error code 0x15.

**Timing requirement:** Minimum 40 ms gap between the return code of one command and the start of the next command.

**Serial config:** 19200 bps, 8 data bits, no parity, 1 stop bit, no flow control. Send and read modes set to HEX.

**Input 3 signal selection note:** When setting Input 3 signal type (YCrCb or RGB, AutoSync or fixed frequency), follow the command with the keycode assigned to Input 3. Example given in source: set YCrCb 15kHz then send key "3" code.

<!-- UNRESOLVED: query/feedback commands — no mechanism described for reading current parameter values -->
<!-- UNRESOLVED: event notifications — Event packet format exists but no specific events documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: gamma presets (01–12) meanings not described in source -->
<!-- UNRESOLVED: color temperature presets (01–36) meanings not described in source -->

## Provenance

```yaml
source_domains:
  - usermanual.wiki
source_urls:
  - https://usermanual.wiki/Document/HT300EHT280EControlSpec11.977828440.pdf
retrieved_at: 2026-05-22T18:33:43.511Z
last_checked_at: 2026-05-31T21:24:26.047Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:24:26.047Z
matched_actions: 149
action_count: 149
confidence: medium
summary: "All 149 spec action hex codes match literal source sequences; transport parameters verified verbatim; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no query commands returning current state found in source"
- "no query commands found in source. Device does not appear to support"
- "no event packet documentation found in source. Event packet format"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "query/feedback commands — no mechanism described for reading current parameter values"
- "event notifications — Event packet format exists but no specific events documented"
- "firmware version compatibility not stated"
- "gamma presets (01–12) meanings not described in source"
- "color temperature presets (01–36) meanings not described in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
