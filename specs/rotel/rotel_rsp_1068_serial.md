---
spec_id: admin/rotel-rsp-1068
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RSP-1068 Control Spec"
manufacturer: Rotel
model_family: RSP-1068
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RSP-1068
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1068%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-05-22T14:25:51.911Z
last_checked_at: 2026-06-10T01:28:50.903Z
generated_at: 2026-06-10T01:28:50.903Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated"
  - "no discrete parameter query commands identified in source"
  - "device sends unsolicited feedback on status changes per source,"
  - "no explicit multi-step macro sequences documented"
  - "response checksum calculation algorithm not documented"
  - "Zone 2 commands limited to power and volume; full source/routing for Zone 2 not documented in Type 16 table"
verification:
  verdict: verified
  checked_at: 2026-06-10T01:28:50.903Z
  matched_actions: 105
  action_count: 105
  confidence: medium
  summary: "All 105 action units matched source hex codes; granularity consistent across 6 tables (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Rotel RSP-1068 Control Spec

## Summary
Rotel RSP-1068 preamp/processor with RS-232C HEX protocol. Serial control at 19200 baud, 8N1, no handshaking. Device supports multi-zone power, volume, source selection, surround mode, and tone control. No auth required.

<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  parity: none
  data_bits: 8
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- levelable
- queryable
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x0A, 0xBE]

- id: power_off
  label: Power Off
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x4A, 0xFD, 0x01]

- id: power_on
  label: Power On
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x4B, 0xFF]

- id: volume_up
  label: Volume Up
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x0B, 0xBF]

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x0C, 0xC0]

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x1E, 0xD2]

- id: source_cd
  label: Source CD
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x02, 0xB6]

- id: source_tuner
  label: Source Tuner
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x03, 0xB7]

- id: source_tape
  label: Source Tape
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x04, 0xB8]

- id: source_video1
  label: Source Video 1
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x05, 0xB9]

- id: source_video2
  label: Source Video 2
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x06, 0xBA]

- id: source_video3
  label: Source Video 3
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x07, 0xBB]

- id: source_video4
  label: Source Video 4
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x08, 0xBC]

- id: source_video5
  label: Source Video 5
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x09, 0xBD]

- id: source_multi_input
  label: Source Multi Input
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x15, 0xC9]

- id: surround_stereo
  label: Stereo
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x11, 0xC5]

- id: surround_dolby3_stereo
  label: Dolby3 Stereo
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x12, 0xC6]

- id: surround_dolby_pro_logic
  label: Dolby Pro Logic
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x13, 0xC7]

- id: surround_dsp_music_toggle
  label: DSP Music Mode Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x14, 0xC8]

- id: treble_up
  label: Treble Up
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x0D, 0xC1]

- id: treble_down
  label: Treble Down
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x0E, 0xC2]

- id: bass_up
  label: Bass Up
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x0F, 0xC3]

- id: bass_down
  label: Bass Down
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x10, 0xC4]

- id: tone_control_select
  label: Tone Control Select
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x67, 0x1B]

- id: osd_menu
  label: OSD Menu
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x18, 0xCC]

- id: osd_enter
  label: Enter
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x19, 0xCD]

- id: osd_cursor_right
  label: Cursor Right
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x1A, 0xCE]

- id: osd_cursor_left
  label: Cursor Left
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x1B, 0xCF]

- id: osd_cursor_up
  label: Cursor Up
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x1C, 0xD0]

- id: osd_cursor_down
  label: Cursor Down
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x1D, 0xD1]

- id: volume_direct
  label: Volume Direct
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0x00 (min) to 0x60 (max)
  command_template: [0xFE, 0x03, 0xA1, 0x30, $level, $checksum]

- id: main_zone_power_toggle
  label: Main Zone Power Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x0A, 0xC2]

- id: main_zone_power_off
  label: Main Zone Power Off
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x4A, 0x02]

- id: main_zone_power_on
  label: Main Zone Power On
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x4B, 0x03]

- id: zone2_power_toggle
  label: Zone 2 Power Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x0A, 0xC4]

- id: zone2_power_off
  label: Zone 2 Power Off
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x4A, 0x04]

- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x4B, 0x05]

- id: zone2_volume_direct
  label: Zone 2 Volume Direct
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0x00 (min) to 0x60 (max)
  command_template: [0xFE, 0x03, 0xA1, 0x32, $level, $checksum]
- id: surround_dolby3_stereo_prologic_toggle
  label: Dolby3 Stereo/Pro Logic Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x53, 0x07]

- id: surround_dts_neo6_toggle
  label: dts Neo:6 Music/Cinema Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x54, 0x08]

- id: surround_music1
  label: Music 1
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x57, 0x0B]

- id: surround_music2
  label: Music 2
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x58, 0x0C]

- id: surround_music3
  label: Music 3
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x59, 0x0D]

- id: surround_music4
  label: Music 4
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x5A, 0x0E]

- id: surround_5ch_stereo
  label: 5 Channel Stereo
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x5B, 0x0F]

- id: surround_7ch_stereo
  label: 7 Channel Stereo
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x5C, 0x10]

- id: surround_dolby_plii_cinema
  label: Dolby PLII Cinema
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x5D, 0x11]

- id: surround_dolby_plii_music
  label: Dolby PLII Music
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x5E, 0x12]

- id: surround_dolby_plii_game
  label: Dolby PLII Game
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x74, 0x28]

- id: surround_dolby_pro_logic_b
  label: Dolby Pro Logic
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x5F, 0x13]

- id: surround_dts_neo6_music
  label: dts Neo:6 Music
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x60, 0x14]

- id: surround_dts_neo6_cinema
  label: dts Neo:6 Cinema
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x61, 0x15]

- id: surround_plii_panorama_toggle
  label: PLII Panorama Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x62, 0x16]

- id: surround_plii_dimension_up
  label: PLII Dimension Up
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x63, 0x17]

- id: surround_plii_dimension_down
  label: PLII Dimension Down
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x64, 0x18]

- id: surround_plii_center_width_up
  label: PLII Center Width Up
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x65, 0x19]

- id: surround_plii_center_width_down
  label: PLII Center Width Down
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x66, 0x1A]

- id: surround_dolby_digital_ex_toggle
  label: Dolby Digital EX Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x68, 0x1C]

- id: surround_next_mode
  label: Next Surround Mode
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x22, 0xD6]

- id: record_function_select
  label: Record Function Select
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x17, 0xCB]

- id: dynamic_range
  label: Dynamic Range
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x16, 0xCA]

- id: digital_input_select
  label: Digital Input Select
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x1F, 0xD3]

- id: zone2_main_toggle
  label: Zone 2/Main
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x23, 0xD7]

- id: temp_center_trim
  label: Temporary Center Trim
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x4C, 0x00]

- id: temp_subwoofer_trim
  label: Temporary Subwoofer Trim
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x4D, 0x01]

- id: temp_surround_trim
  label: Temporary Surround Trim
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x4E, 0x02]

- id: cinema_eq_toggle
  label: Cinema EQ Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x4F, 0x03]

- id: front_display_toggle
  label: Front Display On/Off
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0x52, 0x06]

- id: display_refresh
  label: Display Refresh
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x10, 0xFF, 0xB3]

- id: main_zone_volume_up
  label: Main Zone Volume Up
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x00, 0xB8]

- id: main_zone_volume_down
  label: Main Zone Volume Down
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x01, 0xB9]

- id: main_zone_mute_toggle
  label: Main Zone Mute Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x1E, 0xD6]

- id: main_zone_mute_on
  label: Main Zone Mute On
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x6C, 0x24]

- id: main_zone_mute_off
  label: Main Zone Mute Off
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x6D, 0x25]

- id: main_zone_source_cd
  label: Main Zone Source CD
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x02, 0xBA]

- id: main_zone_source_tuner
  label: Main Zone Source Tuner
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x03, 0xBB]

- id: main_zone_source_tape
  label: Main Zone Source Tape
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x04, 0xBC]

- id: main_zone_source_video1
  label: Main Zone Source Video 1
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x05, 0xBD]

- id: main_zone_source_video2
  label: Main Zone Source Video 2
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x06, 0xBE]

- id: main_zone_source_video3
  label: Main Zone Source Video 3
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x07, 0xBF]

- id: main_zone_source_video4
  label: Main Zone Source Video 4
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x08, 0xC0]

- id: main_zone_source_video5
  label: Main Zone Source Video 5
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x14, 0x09, 0xC1]

- id: record_source_cd
  label: Record Source CD
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x15, 0x02, 0xBB]

- id: record_source_tuner
  label: Record Source Tuner
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x15, 0x03, 0xBC]

- id: record_source_tape
  label: Record Source Tape
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x15, 0x04, 0xBD]

- id: record_source_video1
  label: Record Source Video 1
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x15, 0x05, 0xBE]

- id: record_source_video2
  label: Record Source Video 2
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x15, 0x06, 0xBF]

- id: record_source_video3
  label: Record Source Video 3
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x15, 0x07, 0xC0]

- id: record_source_video4
  label: Record Source Video 4
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x15, 0x08, 0xC1]

- id: record_source_video5
  label: Record Source Video 5
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x15, 0x09, 0xC2]

- id: record_follow_main_zone
  label: Record Follow Main Zone Source
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x15, 0x6B, 0x24]

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x00, 0xBA]

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x01, 0xBB]

- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x1E, 0xD8]

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x6C, 0x26]

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x6D, 0x27]

- id: zone2_source_cd
  label: Zone 2 Source CD
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x02, 0xBC]

- id: zone2_source_tuner
  label: Zone 2 Source Tuner
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x03, 0xBD]

- id: zone2_source_tape
  label: Zone 2 Source Tape
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x04, 0xBE]

- id: zone2_source_video1
  label: Zone 2 Source Video 1
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x05, 0xBF]

- id: zone2_source_video2
  label: Zone 2 Source Video 2
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x06, 0xC0]

- id: zone2_source_video3
  label: Zone 2 Source Video 3
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x07, 0xC1]

- id: zone2_source_video4
  label: Zone 2 Source Video 4
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x08, 0xC2]

- id: zone2_source_video5
  label: Zone 2 Source Video 5
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x09, 0xC3]

- id: zone2_follow_main_zone
  label: Zone 2 Follow Main Zone Source
  kind: action
  params: []
  command: [0xFE, 0x03, 0xA1, 0x16, 0x6B, 0x25]
```

## Feedbacks
```yaml
- id: display_state
  type: object
  description: Front panel display state returned as ASCII chars plus flag bytes
  fields:
    - name: chars
      type: string
      description: 42 ASCII chars representing front display text
    - name: flags
      type: object
      description: 5 flag bytes encoding icon states
    - name: display_on
      type: boolean
      description: Front display on/off state from Flag3 bits
```

## Variables
```yaml
# UNRESOLVED: no discrete parameter query commands identified in source
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited feedback on status changes per source,
# but specific event syntax not enumerated
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Meta encoding rule: byte FD must be escaped as FD 00; byte FE must be escaped as FD 01. No carriage returns or line feeds after commands. Command string format: Start(0xFE) + Count(0x03) + DeviceID(0xA1) + Type + Key + Checksum. Count byte covers ID, Type, Key only.
<!-- UNRESOLVED: response checksum calculation algorithm not documented -->
<!-- UNRESOLVED: Zone 2 commands limited to power and volume; full source/routing for Zone 2 not documented in Type 16 table -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1068%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-05-22T14:25:51.911Z
last_checked_at: 2026-06-10T01:28:50.903Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T01:28:50.903Z
matched_actions: 105
action_count: 105
confidence: medium
summary: "All 105 action units matched source hex codes; granularity consistent across 6 tables (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated"
- "no discrete parameter query commands identified in source"
- "device sends unsolicited feedback on status changes per source,"
- "no explicit multi-step macro sequences documented"
- "response checksum calculation algorithm not documented"
- "Zone 2 commands limited to power and volume; full source/routing for Zone 2 not documented in Type 16 table"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
